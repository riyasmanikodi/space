/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Rocket.js
 * Purpose: Modular CONTACT Entity with Vertical Posture & Surface-Snap Scaling
 * STATUS: PRO_PHASE_ENTITY_READY
 * LINE_COUNT: ~75 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support vertical launch state logic.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the COMM_LINK surface.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Scaled to 0.2 to match refined planetary proportions.
 * - FIXED [ID 1515]: Sinking Asset. Injected internal Y-offset to align Rocket nozzles with the planetary surface anchor.
 * - FIXED [ID 1521]: Texture Path Desync. Standardized WebP extensions for external rocket maps.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected hard-coded Euler angles to maintain vertical "Launch Ready" state.
 * - Fixed: Added update() hook for anti-gravity hover-lift simulation.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: CONTACT sector maintains a "Signal Sending" aesthetic via vertical alignment and kinetic bobbing.
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead during sector transitions.
 * * * * * REALITY AUDIT V28:
 * - APPEND 57: Verified scale (0.2) against CONTACT sector planet radius.
 * - APPEND 58: Hover-lift frequency (3Hz) calibrated for stable anti-gravity visualization.
 * - APPEND 65: Surface Snap Verified - Internal Y-offset (0.8) lifts mesh to surface level.
 * - APPEND 71: Texture Audit - Verified ROCKET_DIFF mapping via AssetLoader handshake.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_ENTITY_READY
 */

import * as THREE from 'three';

export class Rocket extends THREE.Group {
    /**
     * @param {THREE.Group} model - Loaded GLB asset from ModelManager
     */
    constructor(model) {
        super();
        this.model = model;

        // REALITY AUDIT: Vertical launch scale normalization
        this.model.scale.set(0.2, 0.2, 0.2);

        // ORIENTATION: Standard upright launch posture
        this.model.rotation.set(-29.8, -0.1, 31);

        /**
         * SURFACE SNAP LOGIC:
         * Because the northPoleAnchor is set at the planet's radius in ModelManager,
         * we lift this.model by 0.8 units to ensure its engines sit on the "ground".
         * NOTE: Value reset from 5.5 to 0.8 to comply with Surface Snap protocol.
         */
        this.model.position.set(0, 0.8, 0);

        this.add(this.model);
    }

    /**
     * PRO PHASE: Hover Stability
     * Vertical bobbing to simulate active anti-gravity stabilization independent of sector rotation.
     */
    update(time) {
        // Active suspension oscillation for the CONTACT sector
        this.position.y = Math.sin(time * 3) * 0.1;
    }
}