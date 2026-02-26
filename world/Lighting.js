/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /world/Lighting.js
 * Purpose: Cinematic Space Lighting (God-Source Sun, Frontal Dim Fill, Rim, and Void Calibration)
 * FIX: Reality Audit Append - Injected Low-Illumination Frontal Fill Light to enhance NASA textures without washing out shadows.
 * UPDATE: Pro Phase Calibration - Added Frontal Fill, Recalibrated Shadows for Bump Maps, and Locked Void Fog.
 * REALITY AUDIT APPEND 2: Scale Collapse Recovery - Stabilized intensity thresholds for restored geometry.
 */

import * as THREE from 'three';

export class Lighting {
    constructor(scene) {
        this.scene = scene;

        // ==========================================
        // 0. ATMOSPHERIC HAZE (Virtual Space Depth)
        // Adds density to the vacuum, making distant objects and debris fade into the void.
        // This stops the environment from looking like a flat 2D photograph.
        // REALITY AUDIT: Deepened fog color to match the dark void aesthetic.
        // ==========================================
        this.scene.fog = new THREE.FogExp2(0x000000, 0.0025);

        // 1. THE DEEP VOID (Ambient Light)
        // Drastically darkened to force high contrast
        // REALITY AUDIT: Lowered intensity to allow emissive materials to "breathe" better.
        this.ambientLight = new THREE.AmbientLight(0x0a0a1a, 0.05);
        this.scene.add(this.ambientLight);

        // 2. GALACTIC BOUNCE (Hemisphere Light)
        // CRITICAL: Prevents high-metalness PBR assets (Rover, Satellite) from rendering pitch black
        // Simulates starlight hitting the top (blue-ish) and deep space absorbing the bottom (black)
        // REALITY AUDIT: Adjusted intensity to balance with the new ACESFilmicToneMapping.
        this.hemiLight = new THREE.HemisphereLight(0x1a1a3a, 0x000000, 0.4);
        this.scene.add(this.hemiLight);

        // ==========================================
        // 3. FRONT-FACING FILL (The Texture Flashlight)
        // REALITY AUDIT: Dimmed illumination (Intensity: 0.8) to reveal 0.5x model details 
        // without killing the industrial side-shadows.
        // ==========================================
        this.frontLight = new THREE.DirectionalLight(0xddeeff, 0.8);
        this.frontLight.position.set(0, 0, 100);
        this.frontLight.castShadow = false; // Prevents "double shadow" artifacts
        this.scene.add(this.frontLight);

        // 4. THE SUN (Directional Key Light)
        // Positioned on the RIGHT to match the Master Sketch.
        // REALITY AUDIT: Increased intensity to push physical shadows on NASA-derived planetary textures.
        this.sunLight = new THREE.DirectionalLight(0xffffee, 8.5);
        this.sunLight.position.set(150, 20, 50);

        this.sunLight.castShadow = true;

        this.sunLight.shadow.mapSize.width = 4096;
        this.sunLight.shadow.mapSize.height = 4096;

        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 500;

        // Expanded frustum to cover the new larger orbit (Radius 35)
        const d = 80;
        this.sunLight.shadow.camera.left = -d;
        this.sunLight.shadow.camera.right = d;
        this.sunLight.shadow.camera.top = d;
        this.sunLight.shadow.camera.bottom = -d;

        // TIGHTENED SHADOWS for procedural low-poly geometry
        // REALITY AUDIT: Fine-tuned bias to eliminate shadow clipping on highly textured craters.
        // Increased normalBias to 0.08 to prevent acne on bump-mapped surfaces.
        this.sunLight.shadow.bias = -0.0001;
        this.sunLight.shadow.normalBias = 0.08;
        this.sunLight.shadow.radius = 2; // Sharper shadow edges for the "Ray Traced" industrial look

        this.scene.add(this.sunLight);

        // 5. THE BLACK HOLE (Rim Light)
        // Positioned on the LEFT to carve out silhouettes.
        this.rimLight = new THREE.PointLight(0x8a2be2, 5.0, 400);
        this.rimLight.position.set(-120, 0, -40);
        this.rimLight.castShadow = false;
        this.scene.add(this.rimLight);
    }

    update(time) {
        // REALITY AUDIT: Smoother oscillation for cinematic breathing effect
        // Sync: Intensity pulses with the universe's rhythmic drift
        this.sunLight.intensity = 8.5 + Math.sin(time * 1.5) * 0.4;
        this.rimLight.intensity = 5.0 + Math.cos(time * 1.2) * 0.6;
        // Front light remains stable to ensure constant UI/Texture legibility
    }

    // REALITY AUDIT: Memory cleanup hook
    dispose() {
        if (this.ambientLight) this.scene.remove(this.ambientLight);
        if (this.hemiLight) this.scene.remove(this.hemiLight);
        if (this.frontLight) {
            this.frontLight.dispose();
            this.scene.remove(this.frontLight);
        }
        if (this.sunLight) {
            this.sunLight.dispose();
            this.scene.remove(this.sunLight);
        }
        if (this.rimLight) {
            this.rimLight.dispose();
            this.scene.remove(this.rimLight);
        }
    }
}