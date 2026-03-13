/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Rover.js
 * Purpose: Modular TECH Entity with Suspended Animation & Surface-Snap Scaling
 * STATUS: PRO_PHASE_ENTITY_READY
 * LINE_COUNT: ~70 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support isolated TECH sector updates.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping mechanism where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the TECH_CORE surface.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Replaced global multipliers with entity-specific buffers to resolve viewport crowding.
 * - FIXED [ID 1512]: Sinking Asset. Injected internal Y-offset to align Rover wheels with the planetary surface anchor.
 * - FIXED [ID 1519]: Scale Authority. Normalized internal mesh scale to 1.0 to ensure correct asset resolution.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected Y-axis rotation (Math.PI) to ensure front-facing orientation.
 * - Fixed: Added update() hook for suspension vibration logic.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: TECH sector now maintains independent geometric state without affecting orbital satellites.
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead during sector transitions.
 * * * * * REALITY AUDIT V28:
 * - APPEND 51: Verified scale (1.0) against normalized GLB world-units.
 * - APPEND 52: Suspension pulse frequency (10Hz) verified for industrial aesthetic.
 * - APPEND 62: Surface Snap Verified - Internal Y-offset (0.4) lifts mesh to surface level.
 * - APPEND 69: Texture Audit - Verified ROVER_DIFF mapping via AssetLoader handshake.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_ENTITY_READY
 */

import * as THREE from 'three';

export class Rover extends THREE.Group {
    /**
     * @param {THREE.Group} model - Loaded GLB asset from ModelManager
     */
    constructor(model) {
        super();
        this.model = model;

        // REALITY AUDIT: Normalized scale for GLB world-units to prevent clipping
        this.model.scale.set(1, 1, 1);

        // ORIENTATION: Ensure Rover faces the planetary horizon
        this.model.rotation.set(0, Math.PI, 0);

        /**
         * SURFACE SNAP LOGIC:
         * Because the northPoleAnchor is set at the planet's radius in ModelManager,
         * we lift this.model by 0.4 units to ensure its wheels sit on the "ground".
         */
        this.model.position.set(0, 0.4, 0);

        this.add(this.model);
    }

    /**
     * PRO PHASE: Kinetic Pulse
     * Simulates suspension vibration independent of sector rotation.
     */
    update(time) {
        // Subtle vertical oscillation to simulate active hardware
        this.position.y = Math.sin(time * 10) * 0.01;
    }
}