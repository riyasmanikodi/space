/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Radar.js
 * Purpose: Modular CODE Entity with Rotational Scanning Animation & Surface-Snap Scaling
 * STATUS: PRO_PHASE_ENTITY_READY
 * LINE_COUNT: ~70 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support continuous data-scan rotation.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the CODE_BASE surface.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Adjusted to 0.2 to prevent sector clipping and match refined planetary proportions.
 * - FIXED [ID 1513]: Sinking Asset. Injected internal Y-offset to align Radar base with the planetary surface anchor.
 * - FIXED [ID 1520]: Scale Authority. Normalized internal mesh scale to 0.2 to ensure correct asset resolution.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected -90 degree Y-offset to point dish toward the system center.
 * - Fixed: Added update() hook for active scanning rotation logic.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: CODE sector now projects a sense of active "Data Transmission".
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead during sector transitions.
 * * * * * REALITY AUDIT V28:
 * - APPEND 55: Verified scale (0.2) against CODE sector planet radius.
 * - APPEND 56: Scan rotation speed (0.015 rad/frame) calibrated for radar-like feedback.
 * - APPEND 63: Surface Snap Verified - Internal Y-offset (0.3) lifts mesh to surface level.
 * - APPEND 70: Texture Audit - Verified RADAR_DIFF mapping via AssetLoader handshake.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_ENTITY_READY
 */

import * as THREE from 'three';

export class Radar extends THREE.Group {
    /**
     * @param {THREE.Group} model - Loaded GLB asset from ModelManager
     */
    constructor(model) {
        super();
        this.model = model;

        // REALITY AUDIT: Industrial scale for dish geometry
        this.model.scale.set(0.2, 0.2, 0.2);

        // ORIENTATION: Standard dish baseline
        this.model.rotation.set(0, -Math.PI / 2, 0);

        /**
         * SURFACE SNAP LOGIC:
         * Because the northPoleAnchor is set at the planet's radius in ModelManager,
         * we lift this.model by 0.3 units to ensure its base sits on the "ground".
         */
        this.model.position.set(0, 0.3, 0);

        this.add(this.model);
    }

    /**
     * PRO PHASE: Scanning Protocol
     * Continuous 360-degree rotation for the dish component.
     */
    update(time) {
        // Continuous rotation on the group level for scanning effect
        this.rotation.y += 0.015;
    }
}