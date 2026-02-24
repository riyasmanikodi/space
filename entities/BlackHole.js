/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/BlackHole.js
 * Purpose: Cinematic Procedural Singularity (Restored Complexity: Event Horizon, Gravitational Lens, Physical Accretion)
 */

import * as THREE from 'three';
import { BlackHoleFragmentShader } from '../shaders/blackhole.frag.js';

export class BlackHole extends THREE.Group {
    constructor() {
        super();

        this.baseColor = new THREE.Color(0x8a2be2); // Deep Violet for CODE sector
        this.pulseTime = 0;

        // SPATIAL ANCHOR: Lock it to the far left background of the Void
        this.position.set(-120, 0, -60);

        this.init();
    }

    init() {
        // ==========================================
        // 1. THE EVENT HORIZON (Absolute Void)
        // A pure black 3D sphere that occludes all light and geometry behind it.
        // ==========================================
        const coreGeo = new THREE.SphereGeometry(4.5, 64, 64);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.coreSphere = new THREE.Mesh(coreGeo, coreMat);
        this.add(this.coreSphere);

        // ==========================================
        // 2. THE GRAVITATIONAL LENS (Relativity Distortion)
        // Uses an inverted MeshPhysicalMaterial to refract and bend the starfield/debris
        // around the black hole, creating the iconic "Interstellar" spacetime bending effect.
        // ==========================================
        const lensGeo = new THREE.SphereGeometry(6.5, 64, 64);
        const lensMat = new THREE.MeshPhysicalMaterial({
            transmission: 1.0,  // Glass-like transparency
            opacity: 1.0,
            ior: 2.8,           // Extremely high Index of Refraction for intense light bending
            roughness: 0.0,
            metalness: 0.1,
            transparent: true,
            side: THREE.BackSide  // Render on the inside to invert the distortion
        });
        this.lensSphere = new THREE.Mesh(lensGeo, lensMat);
        this.add(this.lensSphere);

        // ==========================================
        // 3. PROCEDURAL ACCRETION DISK (Shader + 3D Tilt)
        // Shifted from flat billboarding to a physically tilted 3D plane
        // to give industrial depth and match the horizontal orbit plane.
        // ==========================================
        const diskGeo = new THREE.PlaneGeometry(80, 80);
        this.uniforms = {
            uTime: { value: 0 },
            uColor: { value: this.baseColor }
        };

        const diskMat = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: BlackHoleFragmentShader,
            uniforms: this.uniforms,
            transparent: true,
            depthWrite: false, // Prevents Z-fighting with Debris/Stars
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });

        this.diskMesh = new THREE.Mesh(diskGeo, diskMat);

        // Tilt the disk heavily to match the "Horizontal Orbit" perspective from the sketch
        this.diskBaseRotationX = Math.PI / 1.7;
        this.diskBaseRotationY = Math.PI / 8;

        this.diskMesh.rotation.x = this.diskBaseRotationX;
        this.diskMesh.rotation.y = this.diskBaseRotationY;
        this.add(this.diskMesh);

        // ==========================================
        // 4. PHOTON RING (High-Heat Inner Glow)
        // A physical Torus geometry right at the edge of the void to 
        // create the blinding white-hot rim light seen in the sketch.
        // ==========================================
        const ringGeo = new THREE.TorusGeometry(5.2, 0.2, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xeeb8ff,
            emissiveIntensity: 5.0,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });
        this.photonRing = new THREE.Mesh(ringGeo, ringMat);

        // Match the accretion disk tilt
        this.photonRing.rotation.x = this.diskBaseRotationX;
        this.photonRing.rotation.y = this.diskBaseRotationY;
        this.add(this.photonRing);
    }

    update(delta, cameraPosition) {
        this.visible = true;

        if (delta) {
            this.uniforms.uTime.value += delta;
            this.pulseTime += delta;
        }

        // Smooth breathing animation for the gravitational lens
        const pulse = Math.sin(this.pulseTime * 1.5) * 0.15;
        this.lensSphere.scale.set(1.0 + pulse, 1.0 + pulse, 1.0 + pulse);

        // Spin the accretion disk and photon ring physically on their local Z axis
        this.diskMesh.rotation.z -= delta * 0.6;
        this.photonRing.rotation.z -= delta * 0.6;

        // Subtle structural wobble to simulate an active singularity
        const wobbleX = Math.sin(this.pulseTime * 0.5) * 0.04;
        const wobbleY = Math.cos(this.pulseTime * 0.7) * 0.04;

        this.diskMesh.rotation.x = this.diskBaseRotationX + wobbleX;
        this.diskMesh.rotation.y = this.diskBaseRotationY + wobbleY;

        this.photonRing.rotation.x = this.diskBaseRotationX + wobbleX;
        this.photonRing.rotation.y = this.diskBaseRotationY + wobbleY;
    }

    dispose() {
        if (this.coreSphere) {
            this.coreSphere.geometry.dispose();
            this.coreSphere.material.dispose();
        }
        if (this.lensSphere) {
            this.lensSphere.geometry.dispose();
            this.lensSphere.material.dispose();
        }
        if (this.diskMesh) {
            this.diskMesh.geometry.dispose();
            this.diskMesh.material.dispose();
        }
        if (this.photonRing) {
            this.photonRing.geometry.dispose();
            this.photonRing.material.dispose();
        }
    }
}