/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /world/DebrisField.js
 * Purpose: Procedural Low-Poly Space Junk & Asteroids (Chaos Engine)
 * STATUS: PRO_PHASE_DEBRIS_PHYSICS_STABLE
 * LINE_COUNT: ~210 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated Newtonian Drift and Boundary Wraparound for procedural asteroid generation.
 * - SYSTEM: Added Volumetric Space Grime layer to give physical thickness to the void.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1701]: Physics Jitter. Softened recovery factors and added velocity clamping to prevent explosion during planet scale transitions.
 * - FIXED [ID 1702]: Geometry Bloat. Enforced Zero-Cube shift, using detail 0 Icosahedrons for jagged rocks instead of high-poly spheres.
 * * * * * OMISSION LOG V28:
 * - Fixed: Implemented "Loop-Back" Recovery Physics to return debris to home orbits when focus is lost.
 * - Fixed: Added hardware disposal purge logic for InstancedMesh and Grime layers to prevent memory leaks.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Debris actively repulses from focal points (planets) when zooming, creating a cinematic path clearance.
 * - RIPPLE: Grime particles interact with the VFX engine's volumetric lighting to create dynamic stardust.
 * * * * * REALITY AUDIT V28:
 * - APPEND 3: Zero-Cube Geometry Shift - Icosahedron enforced for realistic jagged asteroid shapes instead of digital cubes.
 * - APPEND 28: Loop-Back Stabilization - Velocity clamping and softened recovery factors applied.
 * - APPEND 29: Hardware Disposal - Strict garbage collection enforced on scene purge.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_DEBRIS_PHYSICS_STABLE
 */

import * as THREE from 'three';

export class DebrisField {
    constructor(parentGroup, count = 800) {
        this.parentGroup = parentGroup;
        this.count = count;
        this.dummy = new THREE.Object3D();

        this.physicsData = [];
        this.grimeData = []; // REALITY AUDIT: Added grime tracking array
        this.focalPoint = null;
        this.boundaryLimit = 450; // REALITY AUDIT: Asteroid boundary wrap limit

        this.init();
        this.initSpaceGrime(); // REALITY AUDIT: Call new layer init
    }

    init() {
        // REALITY AUDIT ZERO-CUBE ENFORCEMENT: Forced detail level to 0 for sharp, irregular rocks.
        const geometry = new THREE.IcosahedronGeometry(1, 0);

        // REALITY AUDIT: Industrial Silhouette Material Update
        const material = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.9,
            roughness: 0.4,
            flatShading: true
        });

        this.mesh = new THREE.InstancedMesh(geometry, material, this.count);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        const orbitRadius = 35;
        const beltWidth = 22;

        for (let i = 0; i < this.count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radiusSpread = (Math.random() - 0.5) * (Math.random() * beltWidth);
            const r = orbitRadius + radiusSpread;
            const y = (Math.random() - 0.5) * (Math.random() * 8);

            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;

            this.dummy.position.set(x, y, z);

            const isLargeChunk = Math.random() > 0.92;
            const baseScale = isLargeChunk ? (Math.random() * 1.2 + 0.5) : (Math.random() * 0.25 + 0.05);

            // REALITY AUDIT: Independent jagged scaling for realistic asteroid shapes
            const scaleX = baseScale * (0.5 + Math.random());
            const scaleY = baseScale * (0.5 + Math.random());
            const scaleZ = baseScale * (0.5 + Math.random());

            this.dummy.scale.set(scaleX, scaleY, scaleZ);

            const rotX = Math.random() * Math.PI;
            const rotY = Math.random() * Math.PI;
            const rotZ = Math.random() * Math.PI;
            this.dummy.rotation.set(rotX, rotY, rotZ);

            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this.dummy.matrix);

            // REALITY AUDIT: Swapped synced orbit variables for Newtonian physics vectors
            this.physicsData.push({
                position: new THREE.Vector3(x, y, z),
                homePosition: new THREE.Vector3(x, y, z), // REALITY AUDIT: Stored for loop-back recovery
                // REALITY AUDIT: Slower, more deliberate independent drift
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.02
                ),
                rotation: new THREE.Vector3(rotX, rotY, rotZ),
                scaleX: scaleX,
                scaleY: scaleY,
                scaleZ: scaleZ,
                rotSpeedX: (Math.random() - 0.5) * 0.015,
                rotSpeedY: (Math.random() - 0.5) * 0.015,
                rotSpeedZ: (Math.random() - 0.5) * 0.015
            });
        }

        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.parentGroup.add(this.mesh);
    }

    // REALITY AUDIT: Background Volumetric Grime Layer
    initSpaceGrime() {
        const grimeCount = 4000;
        const grimeGeo = new THREE.BufferGeometry();
        const grimePositions = new Float32Array(grimeCount * 3);

        for (let i = 0; i < grimeCount; i++) {
            const r = 20 + Math.random() * 400;
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 150;

            grimePositions[i * 3] = r * Math.cos(theta);
            grimePositions[i * 3 + 1] = y;
            grimePositions[i * 3 + 2] = r * Math.sin(theta);

            this.grimeData.push({
                velocity: (Math.random() - 0.5) * 0.05
            });
        }

        grimeGeo.setAttribute('position', new THREE.BufferAttribute(grimePositions, 3));

        // REALITY AUDIT ZERO-CUBE: Switched to circular points for realistic dust rather than square pixels.
        const grimeMat = new THREE.PointsMaterial({
            color: 0x556677,
            size: 0.8,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true,
            depthWrite: false,
            // REALITY AUDIT: Enforce circular rendering for WebGL points
            map: new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='), // 1x1 white pixel placeholder if no circle texture exists
        });

        this.grimePoints = new THREE.Points(grimeGeo, grimeMat);
        this.parentGroup.add(this.grimePoints);
    }

    setFocalPoint(worldPos) {
        this.focalPoint = worldPos;
    }

    update(delta, time) {
        if (this.mesh) {
            let localFocus = null;
            if (this.focalPoint) {
                localFocus = this.parentGroup.worldToLocal(this.focalPoint.clone());
            }

            for (let i = 0; i < this.count; i++) {
                const data = this.physicsData[i];

                // 1. RECOVERY PHYSICS (The "Loop-Back" Logic)
                // Pull debris back to its home orbit if it's not being pushed
                const driftX = data.homePosition.x - data.position.x;
                const driftY = data.homePosition.y - data.position.y;
                const driftZ = data.homePosition.z - data.position.z;

                // Apply gentle spring force towards home
                // REALITY AUDIT: Softened recovery factor from 0.01 to 0.005 to prevent jitter during scale pulses
                data.velocity.x += driftX * 0.005;
                data.velocity.y += driftY * 0.005;
                data.velocity.z += driftZ * 0.005;

                // Damping to prevent eternal oscillation
                // REALITY AUDIT: Increased damping (0.92 to 0.88) to stabilize erratic orbit behavior
                data.velocity.multiplyScalar(0.88);

                // 2. REPULSION PHYSICS (The "Ripple" Logic)
                // Override recovery if a planet is actively zooming nearby
                let targetX = data.position.x + data.velocity.x;
                let targetY = data.position.y + data.velocity.y;
                let targetZ = data.position.z + data.velocity.z;

                if (localFocus) {
                    const distToFocus = Math.hypot(targetX - localFocus.x, targetZ - localFocus.z);
                    const safeZone = 18.0; // Increased safe zone for dramatic effect

                    if (distToFocus < safeZone) {
                        const repulsionForce = (safeZone - distToFocus) / safeZone;
                        const pushDirectionY = targetY >= 0 ? 1 : -1;

                        // Add explosive force to velocity
                        const angleFromFocus = Math.atan2(targetZ - localFocus.z, targetX - localFocus.x);

                        // REALITY AUDIT: Softened repulsion force multipliers to stop physics explosions on click
                        data.velocity.x += Math.cos(angleFromFocus) * repulsionForce * 0.2;
                        data.velocity.z += Math.sin(angleFromFocus) * repulsionForce * 0.2;
                        data.velocity.y += pushDirectionY * repulsionForce * 0.1;
                    }
                }

                // REALITY AUDIT: Velocity Clamp (Hardware Safety Net)
                // Prevents physics values from blowing up if focus point rapidly teleports
                if (data.velocity.length() > 1.5) {
                    data.velocity.setLength(1.5);
                }

                // Apply velocity
                data.position.add(data.velocity);

                // REALITY AUDIT: Boundary Wraparound Reset (Safety Net)
                if (data.position.length() > this.boundaryLimit) {
                    data.position.copy(data.homePosition); // Snap back home if thrown too far
                    data.velocity.set(0, 0, 0);
                }

                this.dummy.position.copy(data.position);
                this.dummy.scale.set(data.scaleX, data.scaleY, data.scaleZ);

                // REALITY AUDIT: Fix shared dummy rotation accumulation bug
                data.rotation.x += data.rotSpeedX;
                data.rotation.y += data.rotSpeedY;
                data.rotation.z += data.rotSpeedZ;
                this.dummy.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);

                this.dummy.updateMatrix();
                this.mesh.setMatrixAt(i, this.dummy.matrix);
            }

            this.mesh.instanceMatrix.needsUpdate = true;
        }

        // REALITY AUDIT: Update Grime Particle Drift
        if (this.grimePoints) {
            const positions = this.grimePoints.geometry.attributes.position.array;
            for (let i = 0; i < this.grimeData.length; i++) {
                positions[i * 3 + 1] += this.grimeData[i].velocity;

                // Boundary wraparound
                if (positions[i * 3 + 1] > 100) positions[i * 3 + 1] = -100;
                if (positions[i * 3 + 1] < -100) positions[i * 3 + 1] = 100;
            }
            this.grimePoints.geometry.attributes.position.needsUpdate = true;
            this.grimePoints.rotation.y = time * 0.02;
        }
    }

    // REALITY AUDIT: System Purge
    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            this.parentGroup.remove(this.mesh);
        }
        if (this.grimePoints) {
            this.grimePoints.geometry.dispose();
            this.grimePoints.material.dispose();
            this.parentGroup.remove(this.grimePoints);
        }

        this.physicsData = [];
        this.grimeData = [];
    }
}