/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /world/DebrisField.js
 * Purpose: Procedural Low-Poly Space Junk & Asteroids (Chaos Engine)
 * FIX: Replaced "Disco Light" flickering with Newtonian Slow-Drift physics.
 * Adjusted geometry scaling to create industrial shards and deep-space silhouettes.
 */

import * as THREE from 'three';

export class DebrisField {
    constructor(parentGroup, count = 800) { // Reduced count for "Hero Chunk" presence over "Sand"
        this.parentGroup = parentGroup;
        this.count = count;
        this.dummy = new THREE.Object3D();

        // Physics and position cache for the animation loop
        this.physicsData = [];
        this.focalPoint = null;

        this.init();
    }

    init() {
        // 1. CHAOS ENGINE: PROCEDURAL GEOMETRY
        // Base low-poly structure. We will stretch this dynamically per-instance.
        const geometry = new THREE.IcosahedronGeometry(1, 0);

        // 2. INDUSTRIAL VIRTUAL MATERIAL (Anti-Disco Setup)
        // Darkened base color, increased roughness. 
        // This ensures the shard is a black silhouette UNLESS it perfectly catches a major light source.
        const material = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a, // Very dark matte grey/black
            metalness: 0.8,  // High metalness for industrial glint
            roughness: 0.5,  // Increased roughness diffuses the light to prevent stroboscopic flickering
            flatShading: true
        });

        // 3. HIGH-PERFORMANCE INSTANCING
        this.mesh = new THREE.InstancedMesh(geometry, material, this.count);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        const orbitRadius = 35;
        const beltWidth = 22;

        for (let i = 0; i < this.count; i++) {
            // A. STOCHASTIC DISTRIBUTION
            const angle = Math.random() * Math.PI * 2;

            // Clustering near the track, tapering off
            const radiusSpread = (Math.random() - 0.5) * (Math.random() * beltWidth);
            const r = orbitRadius + radiusSpread;

            const y = (Math.random() - 0.5) * (Math.random() * 8);

            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;

            this.dummy.position.set(x, y, z);

            // B. CHAOS SCALING (Procedural Shapes)
            // Instead of uniform scaling, we distort X, Y, and Z independently 
            // to turn a perfect Icosahedron into jagged, random space shards.
            const isLargeChunk = Math.random() > 0.92;
            const baseScale = isLargeChunk ? (Math.random() * 1.2 + 0.5) : (Math.random() * 0.25 + 0.05);

            const scaleX = baseScale * (0.5 + Math.random());
            const scaleY = baseScale * (0.5 + Math.random());
            const scaleZ = baseScale * (0.5 + Math.random());

            this.dummy.scale.set(scaleX, scaleY, scaleZ);

            // C. INITIAL ORIENTATION
            this.dummy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this.dummy.matrix);

            // D. NEWTONIAN PHYSICS (Zero-G Drift)
            // Speeds reduced by 95% to eliminate the "Disco Light" rapid spinning.
            // Shards now tumble slowly with heavy mass.
            this.physicsData.push({
                baseAngle: angle,
                radius: r,
                baseY: y,
                scaleX: scaleX,
                scaleY: scaleY,
                scaleZ: scaleZ,
                rotSpeedX: (Math.random() - 0.5) * 0.0015,
                rotSpeedY: (Math.random() - 0.5) * 0.0015,
                rotSpeedZ: (Math.random() - 0.5) * 0.0015,
                orbitSpeed: (Math.random() - 0.5) * 0.0005
            });
        }

        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.parentGroup.add(this.mesh);
    }

    setFocalPoint(worldPos) {
        this.focalPoint = worldPos;
    }

    update(delta, time) {
        if (!this.mesh) return;

        let localFocus = null;
        if (this.focalPoint) {
            localFocus = this.parentGroup.worldToLocal(this.focalPoint.clone());
        }

        for (let i = 0; i < this.count; i++) {
            const data = this.physicsData[i];

            // 1. SLOW ORBITAL DRIFT
            data.baseAngle += data.orbitSpeed;

            let targetX = Math.cos(data.baseAngle) * data.radius;
            let targetZ = Math.sin(data.baseAngle) * data.radius;

            // Removed the high-frequency sine wave breathing to keep trajectories realistic
            let targetY = data.baseY + Math.sin(time * 0.2 + data.baseAngle) * 0.2;

            // 2. PROXIMITY REPULSION (Workspace Clearing)
            if (localFocus) {
                const distToFocus = Math.hypot(targetX - localFocus.x, targetZ - localFocus.z);
                const safeZone = 14.0; // Pushed out slightly wider to accommodate larger chunks

                if (distToFocus < safeZone) {
                    const repulsionForce = (safeZone - distToFocus) / safeZone;

                    const pushDirectionY = data.baseY >= 0 ? 1 : -1;
                    targetY += pushDirectionY * repulsionForce * 8.0;

                    const angleFromFocus = Math.atan2(targetZ - localFocus.z, targetX - localFocus.x);
                    targetX += Math.cos(angleFromFocus) * repulsionForce * 5.0;
                    targetZ += Math.sin(angleFromFocus) * repulsionForce * 5.0;
                }
            }

            // 3. APPLY TRANSFORMATIONS
            this.dummy.position.set(targetX, targetY, targetZ);
            this.dummy.scale.set(data.scaleX, data.scaleY, data.scaleZ);

            this.dummy.rotation.x += data.rotSpeedX;
            this.dummy.rotation.y += data.rotSpeedY;
            this.dummy.rotation.z += data.rotSpeedZ;

            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this.dummy.matrix);
        }

        this.mesh.instanceMatrix.needsUpdate = true;
    }
}