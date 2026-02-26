/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Renderer.js
 * Purpose: Cinematic WebGL Engine, Physical Shadows, HDR Tone Mapping, and Reality Audit Post-Processing
 * FIX: Reality Audit Append - Contrast Finalization, Bloom Recalibration for NASA Textures.
 * REALITY AUDIT APPEND 2: Exposure Calibration - Finalized tone mapping to prevent blowout on recovered physical geometry.
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

class RendererEngine {
    constructor() {
        const canvas = document.querySelector('#stage');
        const pixelRatio = window.devicePixelRatio || 1;

        // Base renderer setup for high performance
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: pixelRatio < 2,
            powerPreference: "high-performance",
            alpha: false
        });

        this.renderer.setPixelRatio(Math.min(pixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Keep vibrant neon colors matching the blueprint
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // HDR Tone Mapping for glowing procedural materials
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        // REALITY AUDIT APPEND 2: Locked exposure to 1.0 to balance the intense 8.5 God-Source sun on recovered NASA textures
        this.renderer.toneMappingExposure = 1.0;

        // ==========================================
        // 1. INJECTION: Cinematic Shadow Mapping
        // Enabling hardware shadows to interact with the new Lighting.js
        // PCFSoftShadowMap ensures the shadows cast by the debris and machinery
        // (Rover, Satellite) onto the planets are soft and realistic.
        // ==========================================
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // ==========================================
        // REALITY AUDIT: Post-Processing & Performance State
        // ==========================================
        this.composer = null;
        this.renderPass = null;
        this.bloomPass = null;
        this.filmPass = null;
        this.chromaticPass = null;
        this.isInitialized = false;

        this.performanceState = {
            fpsDropFrames: 0,
            isThrottled: false,
            lastTime: performance.now(),
            frames: 0
        };

        this.setupResizeListener();
    }

    initPostProcessing(scene, camera) {
        this.composer = new EffectComposer(this.renderer);

        this.renderPass = new RenderPass(scene, camera);
        this.composer.addPass(this.renderPass);

        // REALITY AUDIT: Bloom Recalibration
        // Lowered intensity and raised threshold so only true light sources (Rim lights, Emissive glow) bloom.
        // Prevents the new high-res NASA bump maps from washing out into a glowing blur.
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.8,  // Intensity: Lowered from 1.2
            0.5,  // Radius: Slightly softened
            0.6   // Threshold: Raised from 0.21 to isolate neon/rim lights
        );
        this.composer.addPass(this.bloomPass);

        // REALITY AUDIT: Contrast Fix - Finalized FilmPass settings.
        // Increased scanline/noise intensity to ensure the industrial terminal aesthetic pops against the dark stars.webp background.
        this.filmPass = new FilmPass(0.25, 0.20, 648, false);
        this.composer.addPass(this.filmPass);

        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);

        const ChromaticAberrationShader = {
            uniforms: {
                "tDiffuse": { value: null },
                "uAmount": { value: 0.002 },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform float uAmount;
                varying vec2 vUv;
                void main() {
                    vec2 dist = vUv - 0.5;
                    float aberration = length(dist) * uAmount;
                    float r = texture2D(tDiffuse, vUv + (dist * aberration)).r;
                    float g = texture2D(tDiffuse, vUv).g;
                    float b = texture2D(tDiffuse, vUv - (dist * aberration)).b;
                    gl_FragColor = vec4(r, g, b, 1.0);
                }
            `
        };
        this.chromaticPass = new ShaderPass(ChromaticAberrationShader);
        this.composer.addPass(this.chromaticPass);

        this.isInitialized = true;
    }

    // REALITY AUDIT: Hardware performance tracking & adaptive throttling
    monitorPerformance() {
        if (!this.renderer || !this.bloomPass || !this.chromaticPass) return;

        const now = performance.now();
        this.performanceState.frames++;

        if (now >= this.performanceState.lastTime + 1000) {
            const fps = (this.performanceState.frames * 1000) / (now - this.performanceState.lastTime);

            if (fps < 45) {
                this.performanceState.fpsDropFrames++;
                if (this.performanceState.fpsDropFrames > 2 && !this.performanceState.isThrottled) {
                    this.bloomPass.enabled = false;
                    this.chromaticPass.enabled = false;
                    this.renderer.setPixelRatio(1);
                    this.performanceState.isThrottled = true;
                    console.warn("RIYAS_OS [Reality Audit]: FPS dropped. Throttling visual stack.");
                }
            } else if (fps >= 55 && this.performanceState.isThrottled) {
                this.performanceState.fpsDropFrames = 0;
                this.bloomPass.enabled = true;
                this.chromaticPass.enabled = true;
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
                this.performanceState.isThrottled = false;
                console.log("RIYAS_OS [Reality Audit]: Performance stabilized. Visual stack restored.");
            } else {
                this.performanceState.fpsDropFrames = Math.max(0, this.performanceState.fpsDropFrames - 1);
            }

            this.performanceState.lastTime = now;
            this.performanceState.frames = 0;
        }
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

            // REALITY AUDIT: Resize Post-Processing Buffers
            if (this.composer) {
                this.composer.setSize(width, height);
            }
            if (this.bloomPass) {
                this.bloomPass.resolution.set(width, height);
            }
        }, false);
    }

    // REALITY AUDIT: External Handle Resize hook for Logics.js synchronization
    handleResize(width, height) {
        if (!this.renderer) return;
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        if (this.composer) {
            this.composer.setSize(width, height);
        }
        if (this.bloomPass) {
            this.bloomPass.resolution.set(width, height);
        }
    }

    render(scene, camera) {
        if (!this.isInitialized) {
            this.initPostProcessing(scene, camera);
        }

        if (this.renderPass) {
            this.renderPass.scene = scene;
            this.renderPass.camera = camera;
        }

        // REALITY AUDIT: Route rendering through EffectComposer
        this.composer.render();
    }

    dispose() {
        if (this.bloomPass) this.bloomPass.dispose();
        if (this.filmPass) this.filmPass.dispose();
        if (this.chromaticPass) this.chromaticPass.material.dispose();
        if (this.composer) {
            this.composer.renderTarget1.dispose();
            this.composer.renderTarget2.dispose();
        }
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.forceContextLoss();
        }
        console.log("RIYAS_OS: Renderer Purged. [Memory Clean]");
    }

    get() {
        return this.renderer;
    }
}

// Export as a singleton
export const CoreRenderer = new RendererEngine();