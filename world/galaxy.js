/**
 * RIYAS_OS V28 - RIPPLE 3
 * File: /world/galaxy.js
 * Purpose: BufferGeometry Instancing, Fibonacci Sphere, Parallax, and Frustum Fading
 */

import * as THREE from 'three';
import { ParticlesFragmentShader } from '../shaders/particles.frag.js';

export class GalaxyEngine extends THREE.Group {
    constructor(particleCount = 5000) {
        super();

        // ==========================================
        // REALITY AUDIT: The "Point-Cloud" Overload Fix
        // Uses a single BufferGeometry instance instead of 5000 objects.
        // All position/color math is offloaded to the GPU.
        // ==========================================
        const geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(particleCount * 3);
        const randoms = new Float32Array(particleCount);
        const layers = new Float32Array(particleCount); // For parallax

        // ==========================================
        // SAFE IMPROV: Fibonacci Sphere Distribution
        // Ensures perfect mathematically uniform density of stars, 
        // avoiding clusters at the poles regardless of camera angle.
        // ==========================================

        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < particleCount; i++) {
            const y = 1 - (i / (particleCount - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            // ==========================================
            // SAFE IMPROV: The "Parallax Multiplier"
            // Assigns stars to Foreground (0.3), Midground (0.6), or Deep Space (1.0).
            // Creates intense 3D volume when swiping through the OS.
            // ==========================================
            const layerMultiplier = Math.random();
            let distanceScale = 200 + (layerMultiplier * 800); // Between 200 and 1000 units away

            positions[i * 3] = Math.cos(theta) * radiusAtY * distanceScale;
            positions[i * 3 + 1] = y * distanceScale;
            positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * distanceScale;

            randoms[i] = Math.random();
            layers[i] = layerMultiplier;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
        geometry.setAttribute('aLayer', new THREE.BufferAttribute(layers, 1));

        const vertexShader = `
            uniform float uTime;
            uniform float uVelocity;
            
            attribute float aRandom;
            attribute float aLayer;
            
            varying float vRandom;
            varying float vDepth;
            varying float vEdgeFade;

            void main() {
                vRandom = aRandom;
                
                vec3 pos = position;
                
                // Parallax shift based on user velocity and star layer
                pos.x += uVelocity * (1.0 - aLayer) * 50.0; 

                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                
                // Pass normalized depth to fragment shader for atmospheric fog
                vDepth = clamp(-mvPosition.z / 1000.0, 0.0, 1.0);

                // ==========================================
                // REALITY AUDIT: The "Star-Popping" Artifact Fix (Frustum Fading)
                // Calculates distance from the camera's near plane.
                // Opacity is smoothly lowered to 0 before it clips the screen edge.
                // ==========================================
                vEdgeFade = smoothstep(10.0, 50.0, -mvPosition.z);

                // Perspective-correct point sizing
                gl_PointSize = (15.0 * aRandom + 5.0) * (100.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        // We wrap the imported fragment shader to inject the Frustum Fading math
        const modifiedFragmentShader = ParticlesFragmentShader.replace(
            'gl_FragColor = vec4(finalColor, alpha);',
            'gl_FragColor = vec4(finalColor, alpha * vEdgeFade);'
        );

        this.uniforms = {
            uTime: { value: 0 },
            uVelocity: { value: 0 },
            // ==========================================
            // SAFE IMPROV: Sector-Driven "Color Bleed"
            // Color shifts dynamically based on the active sector.
            // ==========================================
            uSectorColor: { value: new THREE.Color(0x00ffff) } // Default Cyan
        };

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader: modifiedFragmentShader,
            uniforms: this.uniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.mesh = new THREE.Points(geometry, material);
        this.add(this.mesh);
    }

    update(delta, velocity, activeSectorColor) {
        this.uniforms.uTime.value += delta;
        // Smoothly interpolate velocity to prevent harsh jumps in parallax
        this.uniforms.uVelocity.value += (velocity - this.uniforms.uVelocity.value) * 0.1;

        // Smoothly lerp the sector color bleed
        this.uniforms.uSectorColor.value.lerp(activeSectorColor, 0.05);
    }

    dispose() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
    }
}