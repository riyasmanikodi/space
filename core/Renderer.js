/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Renderer.js
 * Purpose: Cinematic WebGL Engine, Physical Shadows, and HDR Tone Mapping
 */

import * as THREE from 'three';

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
        this.renderer.toneMappingExposure = 1.2;

        // ==========================================
        // 1. INJECTION: Cinematic Shadow Mapping
        // Enabling hardware shadows to interact with the new Lighting.js
        // PCFSoftShadowMap ensures the shadows cast by the debris and machinery
        // (Rover, Satellite) onto the planets are soft and realistic.
        // ==========================================
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.setupResizeListener();
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        }, false);
    }

    render(scene, camera) {
        this.renderer.render(scene, camera);
    }

    get() {
        return this.renderer;
    }
}

// Export as a singleton
export const CoreRenderer = new RendererEngine();