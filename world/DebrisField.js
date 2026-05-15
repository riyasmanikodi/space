/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /world/DebrisField.js
 * Purpose: Procedural Low-Poly Space Junk & Asteroids (Chaos Engine)
 * STATUS: PRO_PHASE_DEBRIS_PHYSICS_STABLE_PURGED
 * LINE_COUNT: ~155 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated Newtonian Drift and Boundary Wraparound for procedural asteroid generation.
 * - SYSTEM: [PRO PHASE] Surgically excised Space Grime instantiation to completely eliminate foreground green dot artifacts.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1701]: Physics Jitter. Softened recovery factors and added velocity clamping to prevent explosion during planet scale transitions.
 * - FIXED [ID 1702]: Geometry Bloat. Enforced Zero-Cube shift, using detail 0 Icosahedrons for jagged rocks instead of high-poly spheres.
 * - FIXED [ID 2657]: [PRO PHASE] Foreground Green Dots. Completely deleted initSpaceGrime() and its update loop to clear the vacuum of glowing dust particles.
 * * * * * OMISSION LOG V28:
 * - Fixed: Implemented "Loop-Back" Recovery Physics to return debris to home orbits when focus is lost.
 * - Fixed: Added hardware disposal purge logic for InstancedMesh.
 * - Fixed: [PRO PHASE] Hard-deleted all background/foreground particle rendering to maintain a pristine high-contrast vacuum.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Debris actively repulses from focal points (planets) when zooming, creating a cinematic path clearance.
 * - RIPPLE: [PRO PHASE] The void is now completely free of foreground green dot artifacts, isolating visual noise strictly to intentional UI and black asteroid silhouettes.
 * * * * * REALITY AUDIT V28:
 * - APPEND 3: Zero-Cube Geometry Shift - Icosahedron enforced for realistic jagged asteroid shapes.
 * - APPEND 28: Loop-Back Stabilization - Velocity clamping and softened recovery factors applied.
 * - APPEND 260: [PRO PHASE] Grime Audit - Verified the primary black debris field (Asteroids) remains fully functional after total grime deletion.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_DEBRIS_PHYSICS_STABLE_PURGED
 */

import * as THREE from 'three';

export class DebrisField {
    constructor(parentGroup, count = 800) {
        this.parentGroup = parentGroup;
        this.count = count;
        this.dummy = new THREE.Object3D();

        this.physicsData = [];
        this.focalPoint = null;
        this.boundaryLimit = 450;

        this.init();
    }

    init() {
        const geometry = new THREE.IcosahedronGeometry(1, 0);

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

            this.physicsData.push({
                position: new THREE.Vector3(x, y, z),
                homePosition: new THREE.Vector3(x, y, z),
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

                const driftX = data.homePosition.x - data.position.x;
                const driftY = data.homePosition.y - data.position.y;
                const driftZ = data.homePosition.z - data.position.z;

                data.velocity.x += driftX * 0.005;
                data.velocity.y += driftY * 0.005;
                data.velocity.z += driftZ * 0.005;

                data.velocity.multiplyScalar(0.88);

                let targetX = data.position.x + data.velocity.x;
                let targetY = data.position.y + data.velocity.y;
                let targetZ = data.position.z + data.velocity.z;

                if (localFocus) {
                    const distToFocus = Math.hypot(targetX - localFocus.x, targetZ - localFocus.z);
                    const safeZone = 18.0;

                    if (distToFocus < safeZone) {
                        const repulsionForce = (safeZone - distToFocus) / safeZone;
                        const pushDirectionY = targetY >= 0 ? 1 : -1;

                        const angleFromFocus = Math.atan2(targetZ - localFocus.z, targetX - localFocus.x);

                        data.velocity.x += Math.cos(angleFromFocus) * repulsionForce * 0.2;
                        data.velocity.z += Math.sin(angleFromFocus) * repulsionForce * 0.2;
                        data.velocity.y += pushDirectionY * repulsionForce * 0.1;
                    }
                }

                if (data.velocity.length() > 1.5) {
                    data.velocity.setLength(1.5);
                }

                data.position.add(data.velocity);

                if (data.position.length() > this.boundaryLimit) {
                    data.position.copy(data.homePosition);
                    data.velocity.set(0, 0, 0);
                }

                this.dummy.position.copy(data.position);
                this.dummy.scale.set(data.scaleX, data.scaleY, data.scaleZ);

                data.rotation.x += data.rotSpeedX;
                data.rotation.y += data.rotSpeedY;
                data.rotation.z += data.rotSpeedZ;
                this.dummy.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z);

                this.dummy.updateMatrix();
                this.mesh.setMatrixAt(i, this.dummy.matrix);
            }

            this.mesh.instanceMatrix.needsUpdate = true;
        }
    }

    dispose() {
        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            this.parentGroup.remove(this.mesh);
        }

        this.physicsData = [];
    }
}