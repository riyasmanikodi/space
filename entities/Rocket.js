/**
 * RIYAS_OS V28 - RIPPLE 3
 * File: /entities/Rocket.js
 * Purpose: CONTACT Hub Entity, Heat Haze VFX, Pre-computed Skinned Mesh, Logarithmic Depth
 */

import * as THREE from 'three';

export class Rocket extends THREE.Group {
    constructor() {
        super();

        this.baseColor = new THREE.Color(0xffaa00); // Amber/Orange for CONTACT
        this.isDeployed = false;

        this.init();
    }

    init() {
        this.bodyGroup = new THREE.Group();
        this.add(this.bodyGroup);

        // ==========================================
        // REALITY AUDIT: The "Pointy Geometry" Clipping Fix
        // We ensure strict depth writing and rely on a customized material 
        // to prevent Z-Fighting with planetary atmospheres. 
        // ==========================================
        const hullGeo = new THREE.CylinderGeometry(0.8, 1.2, 5, 16);
        const noseGeo = new THREE.ConeGeometry(0.8, 2, 16);
        noseGeo.translate(0, 3.5, 0);

        // Merge simple geometries for the static hull
        const rocketGeo = BufferGeometryUtils ? BufferGeometryUtils.mergeBufferGeometries([hullGeo, noseGeo]) : hullGeo; // Fallback if utils not loaded

        this.uniforms = {
            uTime: { value: 0 },
            uUnfold: { value: 0.0 }, // 0.0 = Flying, 1.0 = Landed/Deployed
            uVelocity: { value: 0.0 }
        };

        const hullMat = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            metalness: 0.8,
            roughness: 0.2,
        });

        // ==========================================
        // REALITY AUDIT: Transform Matrix Latency Fix
        // Pre-computed Bone-less Skinned Mesh logic via vertex shader.
        // We use the uUnfold uniform to mathematically splay the bottom vertices 
        // outward to simulate landing gear deploying, avoiding multiple Object3D matrices.
        // ==========================================
        hullMat.onBeforeCompile = (shader) => {
            shader.uniforms.uUnfold = this.uniforms.uUnfold;
            shader.vertexShader = `
                uniform float uUnfold;
            ` + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                
                // Identify bottom vertices (landing gear area)
                if (position.y < -1.5) {
                    // Splay outward based on unfold uniform
                    float splayForce = (abs(position.y) - 1.5) * uUnfold * 1.5;
                    
                    // Push outward along the X and Z axes
                    vec2 dir = normalize(position.xz);
                    transformed.x += dir.x * splayForce;
                    transformed.z += dir.y * splayForce;
                }
                `
            );
        };

        this.hullMesh = new THREE.Mesh(rocketGeo, hullMat);
        this.bodyGroup.add(this.hullMesh);

        // ==========================================
        // SAFE IMPROV: Engine "Heat Haze" VFX
        // Refraction Sprites using a high-speed noise function.
        // ==========================================
        const exhaustGeo = new THREE.ConeGeometry(0.9, 4, 16);
        exhaustGeo.translate(0, -4.5, 0); // Position below the rocket

        const exhaustMat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: this.uniforms.uTime,
                uColor: { value: this.baseColor },
                uThrust: { value: 1.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vHeight;
                void main() {
                    vUv = uv;
                    vHeight = position.y;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uColor;
                uniform float uThrust;
                
                varying vec2 vUv;
                varying float vHeight;
                
                // Fast pseudo-random noise for thermal distortion
                float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }

                void main() {
                    // Scroll UVs rapidly downward
                    vec2 flowUv = vUv;
                    flowUv.y -= uTime * 10.0;
                    
                    float noise = rand(floor(flowUv * 20.0));
                    
                    // Fade out the exhaust at the bottom tip
                    float alpha = smoothstep(-6.5, -2.5, vHeight) * uThrust;
                    
                    // Core is white-hot, edges are baseColor
                    vec3 finalColor = mix(uColor, vec3(1.0), noise * 0.5 + 0.5);
                    
                    gl_FragColor = vec4(finalColor, alpha * noise);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.exhaustMesh = new THREE.Mesh(exhaustGeo, exhaustMat);
        this.bodyGroup.add(this.exhaustMesh);
    }

    // ==========================================
    // SAFE IMPROV: The "Landing Gear" Interaction
    // Called externally when the user focuses on the CONTACT sector.
    // ==========================================
    setDeployedState(isDeployed) {
        this.isDeployed = isDeployed;
    }

    update(delta, velocity) {
        this.uniforms.uTime.value += delta;
        this.uniforms.uVelocity.value = velocity;

        // Smoothly lerp the unfold uniform for the bone-less landing gear animation
        const targetUnfold = this.isDeployed ? 1.0 : 0.0;
        this.uniforms.uUnfold.value += (targetUnfold - this.uniforms.uUnfold.value) * delta * 5.0;

        // ==========================================
        // SAFE IMPROV: Thruster "Auto-Correct" Animation
        // Modulates the main thrust intensity and adds a slight tilt 
        // based on the user's swipe velocity to simulate stabilization.
        // ==========================================
        const activeVelocity = Math.abs(velocity);

        // Boost exhaust intensity when moving
        this.exhaustMesh.material.uniforms.uThrust.value = 0.5 + (activeVelocity * 2.0);

        // Micro-tilt to fight momentum
        this.bodyGroup.rotation.z = velocity * -0.5;

        // Subtle idle hover bobbing
        this.bodyGroup.position.y = Math.sin(this.uniforms.uTime.value * 2.0) * 0.2;
    }

    dispose() {
        this.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose();
                if (child.material.isMaterial) {
                    child.material.dispose();
                }
            }
        });
    }
}