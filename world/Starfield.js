/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /world/Starfield.js
 * Purpose: GPU-Optimized Parallax Galaxy with UI-Tinted Nebulae
 */

import * as THREE from 'three';

export class Starfield {
    constructor(scene, count = 12000) {
        this.scene = scene;

        // REALITY AUDIT: Use BufferGeometry for a single draw call
        this.geometry = new THREE.BufferGeometry();

        // Flat arrays are required for WebGL memory management
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const colorWhite = new THREE.Color(0xffffff);
        const colorCyan = new THREE.Color(0x00ffff);   // Matches TECH sector
        const colorPurple = new THREE.Color(0x8a2be2); // Matches CODE sector

        for (let i = 0; i < count; i++) {
            // Spherical distribution pushing stars far into the background
            const r = 800 + Math.random() * 1200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            // SAFE IMPROVISATION: Tint 15% of the stars to match the UI theme
            const colorChance = Math.random();
            let selectedColor = colorWhite;

            if (colorChance > 0.92) {
                selectedColor = colorCyan;
            } else if (colorChance > 0.85) {
                selectedColor = colorPurple;
            }

            // Darken the stars slightly based on distance to simulate depth
            const depthDimming = 1.0 - (r - 800) / 1200;

            colors[i * 3] = selectedColor.r * depthDimming;
            colors[i * 3 + 1] = selectedColor.g * depthDimming;
            colors[i * 3 + 2] = selectedColor.b * depthDimming;

            // Randomize sizes for texture variation
            sizes[i] = Math.random() * 2.0;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Use PointsMaterial to render the buffer arrays
        this.material = new THREE.PointsMaterial({
            size: 1.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.points = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.points);
    }

    /**
     * Parallax Drift: Called by the main Logics.js update loop
     */
    update(delta, time) {
        // Subtle, constant drift to make the universe feel alive
        this.points.rotation.y = time * 0.005;
        this.points.rotation.x = Math.sin(time * 0.05) * 0.02;
    }
}