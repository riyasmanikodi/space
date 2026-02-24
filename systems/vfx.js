/**
 * RIYAS_OS V28 - RIPPLE 2
 * File: /systems/vfx.js
 * Purpose: Post-processing stack, Selective Bloom, Uber-Shaders, and Downsampling
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

class VFXEngine {
    constructor() {
        this.composer = null;
        this.uberPass = null;
        this.bloomPass = null;
    }

    init(renderer, scene, camera) {
        this.composer = new EffectComposer(renderer);

        // 1. Base Render Pass
        const renderPass = new RenderPass(scene, camera);
        this.composer.addPass(renderPass);

        // ==========================================
        // REALITY AUDIT: "Resolution Scalability" Fix (Internal Downsampling)
        // Render the heavy bloom calculation at 50% resolution to save 75% 
        // of GPU power, maintaining 60fps on mobile without losing the soft glow.
        // ==========================================
        const renderTargetSize = new THREE.Vector2(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        // ==========================================
        // SAFE IMPROV: Selective Bloom (The "Neon" Pass)
        // High threshold ensures only emissive objects (like Tech rings) 
        // bleed light, keeping the dark space background crisp.
        // ==========================================
        this.bloomPass = new UnrealBloomPass(renderTargetSize, 1.5, 0.4, 0.85);
        this.composer.addPass(this.bloomPass);

        // ==========================================
        // REALITY AUDIT: The "Draw Call" Pileup Fix (Uber-Shader)
        // Combines Chromatic Aberration and Gravitational Lensing into a single 
        // custom shader pass to prevent the GPU from re-painting the screen multiple times.
        // ==========================================
        const UberShader = {
            uniforms: {
                tDiffuse: { value: null },
                uAberrationIntensity: { value: 0.0 }, // Controlled by UI impacts
                uLensDistortion: { value: 0.0 }       // Controlled by Black Hole proximity
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform float uAberrationIntensity;
                uniform float uLensDistortion;
                varying vec2 vUv;

                void main() {
                    vec2 uv = vUv;

                    // SAFE IMPROV: Gravitational Lensing (Black Hole Distortion)
                    if (uLensDistortion > 0.0) {
                        vec2 center = vec2(0.5, 0.5);
                        vec2 toCenter = center - uv;
                        float dist = length(toCenter);
                        // Bend UVs towards center if near Black Hole
                        uv += toCenter * (1.0 - dist) * uLensDistortion;
                    }

                    // SAFE IMPROV: Chromatic Aberration "Impacts"
                    vec2 shift = vec2(uAberrationIntensity * 0.01, 0.0);
                    vec4 color1 = texture2D(tDiffuse, uv + shift); // Red shift
                    vec4 color2 = texture2D(tDiffuse, uv);         // Green neutral
                    vec4 color3 = texture2D(tDiffuse, uv - shift); // Blue shift
                    
                    gl_FragColor = vec4(color1.r, color2.g, color3.b, 1.0);
                }
            `
        };

        this.uberPass = new ShaderPass(UberShader);
        this.composer.addPass(this.uberPass);
    }

    // Called by the Animation/Logic engine during user interactions
    triggerImpactEffect(intensity) {
        if (this.uberPass) {
            this.uberPass.uniforms.uAberrationIntensity.value = intensity;
        }
    }

    update(delta, activeSector, velocity) {
        if (!this.composer) return;

        // Smoothly fade out the chromatic aberration over time
        if (this.uberPass.uniforms.uAberrationIntensity.value > 0) {
            this.uberPass.uniforms.uAberrationIntensity.value -= delta * 0.05;
            this.uberPass.uniforms.uAberrationIntensity.value = Math.max(0, this.uberPass.uniforms.uAberrationIntensity.value);
        }

        // Apply gravitational lensing if in CODE (Black Hole) sector
        const targetDistortion = activeSector === 'CODE' ? 0.3 : 0.0;
        this.uberPass.uniforms.uLensDistortion.value += (targetDistortion - this.uberPass.uniforms.uLensDistortion.value) * 0.05;

        // The main render call goes through the Composer now, not the raw Renderer
        this.composer.render(delta);
    }
}

export const VFX = new VFXEngine();