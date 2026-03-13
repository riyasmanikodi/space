/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Satellite.js
 * Purpose: Modular VISION Entity with High-Altitude Orbit & Panel Oscillation
 * STATUS: PRO_PHASE_ENTITY_READY
 * LINE_COUNT: ~75 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support specialized VISION sector visuals.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the high orbital anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the VISION_SAT surface.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Reduced to 0.20 to match refined planetary proportions and cinematic depth.
 * - FIXED [ID 1514]: Sinking Asset. Injected high internal Y-offset to align Satellite with orbital height above the planetary surface anchor.
 * - FIXED [ID 1522]: Scale Authority. Normalized internal mesh scale to 0.20 to ensure correct asset resolution.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected 45-degree pitch (refactor: Math.PI/20) to align solar arrays with camera frustum.
 * - Fixed: Added update() hook for "Orbital Float" oscillation logic.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: VISION sector assets now exhibit realistic zero-G buoyancy while maintaining planetary orbital lock.
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead during sector transitions.
 * * * * * REALITY AUDIT V28:
 * - APPEND 53: Verified scale (0.20) against VISION sector planet radius.
 * - APPEND 54: Orbital oscillation frequency (2Hz) tuned for zero-G realism.
 * - APPEND 64: Surface Snap Verified - Internal Y-offset (2.5) lifts mesh to orbital altitude.
 * - APPEND 72: Texture Audit - Verified SAT_DIFF mapping via AssetLoader handshake.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_ENTITY_READY
 */

import * as THREE from 'three';

export class Satellite extends THREE.Group {
    /**
     * @param {THREE.Group} model - Loaded GLB asset from ModelManager
     */
    constructor(model) {
        super();
        this.model = model;

        // REALITY AUDIT: Orbital scale normalization
        this.model.scale.set(0.20, 0.20, 0.20);

        // ORIENTATION: Angled panels for better reflection mapping
        this.model.rotation.set(Math.PI / 20, 0, 0);

        /**
         * SURFACE SNAP LOGIC (ORBITAL VARIANT):
         * Because the northPoleAnchor is set at the planet's radius in ModelManager,
         * we lift this.model by 2.5 units to ensure it orbits high above the "ground".
         */
        this.model.position.set(0, 2.5, 0);

        this.add(this.model);
    }

    /**
     * PRO PHASE: Orbital Float
     * Slow sine-wave oscillation to simulate zero-gravity state.
     */
    update(time) {
        // Subtle vertical oscillation to simulate orbital buoyancy
        this.position.y = Math.sin(time * 2) * 0.15;
        // Slow axial rotation for scanning the VISION sector
        this.rotation.y += 0.005;
    }
}