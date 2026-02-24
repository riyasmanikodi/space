/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /world/Lighting.js
 * Purpose: Cinematic High-Contrast Space Lighting (Sun, Void, Rim, Galactic Bounce, Shadows, and Volumetric Fog)
 * FIX: Injected FogExp2 for atmospheric depth and tightened shadow bias for procedural low-poly shards.
 */

import * as THREE from 'three';

export class Lighting {
    constructor(scene) {
        this.scene = scene;

        // ==========================================
        // 0. ATMOSPHERIC HAZE (Virtual Space Depth)
        // Adds density to the vacuum, making distant objects and debris fade into the void.
        // This stops the environment from looking like a flat 2D photograph.
        // ==========================================
        this.scene.fog = new THREE.FogExp2(0x050508, 0.0025);

        // 1. THE DEEP VOID (Ambient Light)
        // Drastically darkened to force high contrast
        this.ambientLight = new THREE.AmbientLight(0x0a0a1a, 0.15);
        this.scene.add(this.ambientLight);

        // 2. GALACTIC BOUNCE (Hemisphere Light)
        // CRITICAL: Prevents high-metalness PBR assets (Rover, Satellite) from rendering pitch black
        // Simulates starlight hitting the top (blue-ish) and deep space absorbing the bottom (black)
        this.hemiLight = new THREE.HemisphereLight(0x1a1a3a, 0x000000, 0.6);
        this.scene.add(this.hemiLight);

        // 3. THE SUN (Directional Key Light)
        // Positioned on the RIGHT to match the Master Sketch.
        this.sunLight = new THREE.DirectionalLight(0xffffee, 6.5);
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
        this.sunLight.shadow.bias = -0.0005; // Pushed slightly to handle jagged geometry
        this.sunLight.shadow.normalBias = 0.02; // Prevents "acne" on flat-shaded metallic shards
        this.sunLight.shadow.radius = 2; // Sharper shadow edges for the "Ray Traced" industrial look

        this.scene.add(this.sunLight);

        // 4. THE BLACK HOLE (Rim Light)
        // Positioned on the LEFT to carve out silhouettes.
        this.rimLight = new THREE.PointLight(0x8a2be2, 5.0, 400);
        this.rimLight.position.set(-120, 0, -40);
        this.rimLight.castShadow = false;
        this.scene.add(this.rimLight);
    }

    update(time) {
        this.sunLight.intensity = 6.5 + Math.sin(time * 2.0) * 0.5;
        this.rimLight.intensity = 5.0 + Math.cos(time * 1.5) * 0.8;
    }
}