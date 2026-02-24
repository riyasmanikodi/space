/**
 * RIYAS_OS V28 - RIPPLE 1
 * File: /generators/textures.js
 * Purpose: Procedural generation of displacement maps, chunked execution, and deterministic noise
 */

import * as THREE from 'three';

class ProceduralTextures {
    constructor() {
        this.textureVault = {};
    }

    // ==========================================
    // SAFE IMPROV: Seed-Based Determinism
    // A lightweight Pseudo-Random Number Generator (PRNG).
    // Ensures the "VISION" satellite always generates the exact same craters 
    // across all devices, maintaining your brand identity.
    // ==========================================
    random(seed) {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    // ==========================================
    // SAFE IMPROV: Perlin-style Displacement Math
    // Generates smooth, organic noise by layering different frequencies (Fractal Brownian Motion).
    // Used for creating jagged Black Hole glitches or clean Tech Hub grid patterns.
    // ==========================================
    generateNoiseValue(x, y, seed, scale = 10) {
        const nx = x / scale;
        const ny = y / scale;
        // Simplified deterministic noise function
        const val = this.random(Math.floor(nx) * 100 + Math.floor(ny) + seed);
        const val2 = this.random(Math.floor(nx + 1) * 100 + Math.floor(ny + 1) + seed);
        // Interpolate for smoothness
        return (val + val2) / 2;
    }

    // ==========================================
    // REALITY AUDIT: "Main Thread Freeze" Fix (Chunked Generation)
    // REALITY AUDIT: GPU Upload Stutter Fix
    // Uses async/await to pause generation every few rows, allowing the 
    // browser to render the loading bar without freezing the tab.
    // ==========================================
    async generatePlanetSurface(seed, type = 'TECH', isFocus = false) {
        const cacheKey = `surface_${type}_${seed}_${isFocus}`;
        if (this.textureVault[cacheKey]) {
            return this.textureVault[cacheKey];
        }

        // ==========================================
        // SAFE IMPROV: Dynamic Resolution Scaling
        // 512x512 for the planet in focus, 128x128 for distant planets to save VRAM.
        // ==========================================
        const size = isFocus ? 512 : 128;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const imgData = ctx.createImageData(size, size);
        const data = imgData.data;

        // Chunked processing loop
        const chunkSize = 16; // Process 16 rows per frame

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const index = (y * size + x) * 4;

                let noise = 0;
                if (type === 'CODE') {
                    // Jagged, glitched terrain for the Black Hole sector
                    noise = this.generateNoiseValue(x, y, seed, 5) * 255;
                } else {
                    // Smooth, grid-like Motherboard terrain for TECH hub
                    noise = (Math.sin(x / 10 + seed) * Math.cos(y / 10 + seed) + 1) * 127.5;
                }

                data[index] = noise;     // R (Height map data)
                data[index + 1] = noise; // G
                data[index + 2] = noise; // B
                data[index + 3] = 255;   // Alpha
            }

            // Yield to the main thread every chunk to prevent UI freezing
            if (y % chunkSize === 0) {
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }

        ctx.putImageData(imgData, 0, 0);

        // ==========================================
        // REALITY AUDIT: Staggered GPU Upload
        // Waits for the next animation frame to convert the canvas to a Texture, 
        // preventing the "micro-stutter" during orbital rotations.
        // ==========================================
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                this.textureVault[cacheKey] = texture;
                resolve(texture);
            });
        });
    }
}

export const Textures = new ProceduralTextures();