/**
 * RIYAS_OS V28 - RIPPLE 3
 * File: /entities/Rover.js
 * Purpose: Surface-Snapping Physics, Scanner Spotlight, Slerp Smoothing, and Math-Based Height
 */

import * as THREE from 'three';

export class Rover extends THREE.Group {
    constructor(planetRadius, displacementScale) {
        super();

        this.planetRadius = planetRadius;
        this.displacementScale = displacementScale;
        this.roverBaseColor = new THREE.Color(0xeeeeee);
        this.accentColor = new THREE.Color(0x00ffff); // TECH Cyan

        this.currentPhi = Math.PI / 2;
        this.currentTheta = 0;

        this.init();
    }

    init() {
        // Rover Body
        this.chassis = new THREE.Group();
        this.add(this.chassis);

        const bodyGeo = new THREE.BoxGeometry(0.8, 0.4, 1.2);
        const bodyMat = new THREE.MeshStandardMaterial({
            color: this.roverBaseColor,
            metalness: 0.8,
            roughness: 0.2
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.4;
        this.chassis.add(body);

        // Wheels
        const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });

        this.wheels = [];
        const wheelPositions = [
            [-0.5, 0.25, 0.4], [0.5, 0.25, 0.4],
            [-0.5, 0.25, -0.4], [0.5, 0.25, -0.4]
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeo, wheelMat);
            wheel.position.set(...pos);
            this.chassis.add(wheel);
            this.wheels.push(wheel);
        });

        // ==========================================
        // SAFE IMPROV: The "Scanner" Spotlight
        // A volumetric cone to illuminate the procedural circuitry in the valleys.
        // ==========================================
        const scannerGeo = new THREE.ConeGeometry(1.5, 4, 16, 1, true);
        scannerGeo.translate(0, -2, 0);
        scannerGeo.rotateX(Math.PI / 2);

        const scannerMat = new THREE.MeshBasicMaterial({
            color: this.accentColor,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        this.scannerBeam = new THREE.Mesh(scannerGeo, scannerMat);
        this.scannerBeam.position.set(0, 0.6, 0.6);
        this.chassis.add(this.scannerBeam);

        // ==========================================
        // SAFE IMPROV: Wheel-Spin & Dust Trail (Digital Dust)
        // Emits cyan pixelated squares as the rover traverses the terrain.
        // ==========================================
        this.particleCount = 50;
        const dustGeo = new THREE.BufferGeometry();
        this.dustPositions = new Float32Array(this.particleCount * 3);
        this.dustAges = new Float32Array(this.particleCount);

        dustGeo.setAttribute('position', new THREE.BufferAttribute(this.dustPositions, 3));
        dustGeo.setAttribute('aAge', new THREE.BufferAttribute(this.dustAges, 1));

        const dustMat = new THREE.PointsMaterial({
            color: this.accentColor,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            depthWrite: false
        });

        this.dustTrail = new THREE.Points(dustGeo, dustMat);
        this.add(this.dustTrail);
        this.dustIndex = 0;
    }

    // ==========================================
    // REALITY AUDIT: Performance Cost of Continuous Raycasting Fix
    // Math-Based Height Lookup: Simulates the GPU displacement map logic 
    // on the CPU to find terrain height without expensive physics raycasts.
    // ==========================================
    getSimulatedTerrainHeight(phi, theta, time) {
        // Fast JS approximation of the vertex shader noise
        const noise = Math.sin(phi * 10.0 + time) * Math.cos(theta * 10.0 + time);
        const smoothNoise = Math.max(0, noise); // smoothstep approximation
        return this.planetRadius + (smoothNoise * this.displacementScale);
    }

    update(delta, globalTime, planetOrbitSpeed) {
        // Move the rover across the spherical surface
        const moveSpeed = 0.5 * delta;
        this.currentTheta += moveSpeed;

        // Gentle wander logic for phi
        this.currentPhi += Math.sin(globalTime * 0.5) * moveSpeed * 0.5;

        // Calculate surface position
        const radiusAtPos = this.getSimulatedTerrainHeight(this.currentPhi, this.currentTheta, globalTime);

        // Spherical to Cartesian conversion
        const targetX = radiusAtPos * Math.sin(this.currentPhi) * Math.cos(this.currentTheta);
        const targetY = radiusAtPos * Math.cos(this.currentPhi);
        const targetZ = radiusAtPos * Math.sin(this.currentPhi) * Math.sin(this.currentTheta);

        const targetPos = new THREE.Vector3(targetX, targetY, targetZ);
        this.position.copy(targetPos);

        // Calculate Surface Normal for orientation
        const normal = targetPos.clone().normalize();

        // Determine forward direction (tangent to the sphere along theta)
        const forward = new THREE.Vector3(
            -Math.sin(this.currentTheta),
            0,
            Math.cos(this.currentTheta)
        ).normalize();

        // Calculate the right vector, then recalculate orthogonal forward
        const right = new THREE.Vector3().crossVectors(normal, forward).normalize();
        const orthogonalForward = new THREE.Vector3().crossVectors(right, normal).normalize();

        // Create target rotation matrix
        const targetMatrix = new THREE.Matrix4().makeBasis(right, normal, orthogonalForward);
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(targetMatrix);

        // ==========================================
        // REALITY AUDIT: The "Jittery" Surface Transition Fix
        // Quaternion Slerp Smoothing: The Rover's orientation "chases" the 
        // surface normal with a 0.1 interpolation factor, creating a smooth, 
        // weighted suspension feel rather than snapping instantly.
        // ==========================================

        this.quaternion.slerp(targetQuat, 0.1);

        // Animate Wheels
        const wheelSpin = moveSpeed * 10.0;
        this.wheels.forEach(wheel => {
            wheel.rotation.x -= wheelSpin;
        });

        // Animate Scanner Beam
        this.scannerBeam.material.opacity = 0.15 + Math.sin(globalTime * 8.0) * 0.05;

        // Update Dust Particles
        this.dustAges[this.dustIndex] = 1.0;

        // Place new particle slightly behind the rover, localized to the rover's rotation
        const localOffset = new THREE.Vector3(0, 0, -0.6);
        localOffset.applyQuaternion(this.quaternion);
        const emitPos = this.position.clone().add(localOffset);

        this.dustPositions[this.dustIndex * 3] = emitPos.x;
        this.dustPositions[this.dustIndex * 3 + 1] = emitPos.y;
        this.dustPositions[this.dustIndex * 3 + 2] = emitPos.z;

        this.dustIndex = (this.dustIndex + 1) % this.particleCount;

        for (let i = 0; i < this.particleCount; i++) {
            if (this.dustAges[i] > 0) {
                this.dustAges[i] -= delta * 1.5; // Fade out
                // Drift particles slightly outward
                this.dustPositions[i * 3] *= 1.001;
                this.dustPositions[i * 3 + 1] *= 1.001;
                this.dustPositions[i * 3 + 2] *= 1.001;
            }
        }

        this.dustTrail.geometry.attributes.position.needsUpdate = true;
        this.dustTrail.geometry.attributes.aAge.needsUpdate = true;
    }

    dispose() {
        this.traverse((child) => {
            if (child.isMesh || child.isPoints) {
                child.geometry.dispose();
                if (child.material.isMaterial) {
                    child.material.dispose();
                }
            }
        });
    }
}