/**
 * RIYAS_OS V28 - RIPPLE 3
 * File: /entities/TransmissionDish.js
 * Purpose: VISION Sensor Array, Elastic Tracking, Screen-Space Wireframes, and Glow-on-Transmit
 */

import * as THREE from 'three';

export class TransmissionDish extends THREE.Group {
    constructor() {
        super();

        this.baseColor = new THREE.Color(0xff1493); // Deep Pink/Magenta for VISION
        this.targetQuat = new THREE.Quaternion();

        this.init();
    }

    init() {
        // A parabolic dish shape using a cut-off sphere
        const radius = 4;
        const geometry = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4);

        this.uniforms = {
            uTime: { value: 0 },
            uColor: { value: this.baseColor },
            uTransmitGlow: { value: 0.0 }
        };

        // ==========================================
        // REALITY AUDIT: The "Moire" Grid Flicker Fix (Screen-Space Wireframes)
        // Uses fwidth() in the fragment shader to draw exactly 1-pixel-wide lines
        // regardless of depth, preventing shimmering on the curved dish surface.
        // ==========================================

        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uColor;
                uniform float uTransmitGlow;
                
                varying vec2 vUv;
                
                void main() {
                    // Screen-Space Wireframe logic
                    vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
                    float line = min(grid.x, grid.y);
                    float wireframe = 1.0 - min(line, 1.0);
                    
                    // ==========================================
                    // SAFE IMPROV: Parabolic Interference Pattern
                    // Concentric ripples radiating from the pole of the dish.
                    // ==========================================
                    float dist = length(vUv - vec2(0.5, 0.0));
                    float ripple = sin(dist * 30.0 - uTime * 5.0) * 0.5 + 0.5;
                    
                    vec3 baseGlow = uColor * wireframe * (0.2 + ripple * 0.8);
                    
                    // ==========================================
                    // SAFE IMPROV: Glow-on-Data-Transmit
                    // High-energy white burst added when the user triggers a scan.
                    // ==========================================
                    vec3 transmitColor = vec3(1.0) * uTransmitGlow;
                    
                    gl_FragColor = vec4(baseGlow + transmitColor, wireframe * 0.8 + uTransmitGlow);
                }
            `,
            transparent: true,
            side: THREE.FrontSide, // Front-faces only to prevent visual mess
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.dishMesh = new THREE.Mesh(geometry, material);
        this.dishMesh.rotation.x = -Math.PI / 2; // Point forward along Z
        this.add(this.dishMesh);

        // ==========================================
        // REALITY AUDIT: Back-Face Clutter Fix
        // A solid, dark inner shell prevents seeing through to the back of 
        // the wireframe, giving the dish physical presence and depth.
        // ==========================================
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x050011,
            side: THREE.BackSide,
            depthWrite: true // Occludes objects behind the dish
        });
        this.innerDish = new THREE.Mesh(geometry, innerMat);
        this.innerDish.rotation.x = -Math.PI / 2;
        this.innerDish.scale.set(0.99, 0.99, 0.99); // Micro-scale to prevent Z-fighting
        this.add(this.innerDish);

        // Central Transmitter Antenna
        const pinGeo = new THREE.CylinderGeometry(0.05, 0.05, 3, 8);
        pinGeo.translate(0, 1.5, 0);
        const pinMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.pin = new THREE.Mesh(pinGeo, pinMat);
        this.pin.rotation.x = Math.PI / 2;
        this.add(this.pin);
    }

    // Triggered externally by Logics.js on click/focus
    triggerTransmission() {
        this.uniforms.uTransmitGlow.value = 1.0;
    }

    update(delta, globalTime, targetPosition) {
        this.uniforms.uTime.value += delta;

        // Smoothly decay the transmission flash over 0.5 seconds
        if (this.uniforms.uTransmitGlow.value > 0) {
            this.uniforms.uTransmitGlow.value = Math.max(0, this.uniforms.uTransmitGlow.value - delta * 2.0);
        }

        // ==========================================
        // SAFE IMPROV: The "Target Tracking" Lag (Elastic Tracking)
        // Uses a dummy object to calculate the absolute "lookAt" rotation, 
        // then slerps the real dish towards it to simulate mechanical mass.
        // ==========================================
        const dummy = new THREE.Object3D();
        dummy.position.copy(this.position);

        if (targetPosition) {
            dummy.lookAt(targetPosition);
        } else {
            // Idle sweeping pattern
            dummy.rotation.x = Math.sin(globalTime * 0.5) * 0.2;
            dummy.rotation.y = Math.cos(globalTime * 0.3) * 0.2;
        }

        this.targetQuat.copy(dummy.quaternion);

        // Slerp factor of 5.0 creates a heavy, responsive but delayed mechanical feel
        this.quaternion.slerp(this.targetQuat, 5.0 * delta);
    }

    dispose() {
        this.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
    }
}