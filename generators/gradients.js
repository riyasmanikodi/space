/**
 * RIYAS_OS V28 - RIPPLE 1
 * File: /generators/gradients.js
 * Purpose: Zero-asset procedural textures, radial auras, and cache system
 */

import * as THREE from 'three';

class ProceduralGradients {
    constructor() {
        // ==========================================
        // SAFE IMPROV: Dynamic Cache System
        // Stores generated textures in memory. If two planets use the same 
        // "Cyber Pink", the system reuses the texture, saving CPU time.
        // ==========================================
        this.textureVault = {};

        // ==========================================
        // REALITY AUDIT: Offscreen Canvas Overhead Fix
        // Uses a single, reusable offscreen canvas. We paint, convert to a 
        // Three.js texture, and clear. Keeps the DOM perfectly clean.
        // ==========================================
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    }

    // ==========================================
    // REALITY AUDIT: "Power of Two" Texture Bug Fix
    // WebGL performs 10x faster when textures are powers of two.
    // This helper snaps any requested size (e.g., 300) to the nearest Po2 (e.g., 256 or 512).
    // ==========================================
    nearestPowerOfTwo(value) {
        return Math.pow(2, Math.round(Math.log(value) / Math.log(2)));
    }

    // ==========================================
    // SAFE IMPROV: Procedural Dithering (Anti-Banding)
    // Adds a microscopic layer of mathematical noise over the gradient.
    // This prevents ugly color banding and creates a high-end filmic look.
    // ==========================================
    applyDithering(width, height) {
        const imageData = this.ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            // Generate subtle noise between -4 and 4
            const noise = (Math.random() - 0.5) * 8;
            data[i] = Math.min(255, Math.max(0, data[i] + noise));     // R
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // G
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // B
        }
        this.ctx.putImageData(imageData, 0, 0);
    }

    // ==========================================
    // SAFE IMPROV: Linear-to-Radial "Aura" Mapping
    // Generates luminous centers that fade into transparency for glows/black holes.
    // ==========================================
    generateRadialAura(colorHex, requestedSize = 256) {
        const cacheKey = `aura_${colorHex}_${requestedSize}`;
        if (this.textureVault[cacheKey]) {
            return this.textureVault[cacheKey];
        }

        const size = this.nearestPowerOfTwo(requestedSize);
        this.canvas.width = size;
        this.canvas.height = size;

        const center = size / 2;
        const gradient = this.ctx.createRadialGradient(center, center, 0, center, center, center);

        // Convert hex to rgb for alpha manipulation
        const c = new THREE.Color(colorHex);
        const r = Math.floor(c.r * 255);
        const g = Math.floor(c.g * 255);
        const b = Math.floor(c.b * 255);

        // Core is pure white/hot, middle is the target color, edge is transparent
        gradient.addColorStop(0, `rgba(255, 255, 255, 1)`);
        gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, 0.8)`);
        gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, 0.2)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, size, size);

        this.applyDithering(size, size);

        // Convert canvas to Three.js texture
        const texture = new THREE.CanvasTexture(this.canvas);
        texture.needsUpdate = true;

        // Store in vault and return
        this.textureVault[cacheKey] = texture;

        // Clear canvas for next use
        this.ctx.clearRect(0, 0, size, size);

        return texture;
    }
}

export const Gradients = new ProceduralGradients();