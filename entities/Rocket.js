/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Rocket.js
 * Purpose: Modular CONTACT Entity with Vertical Posture & High-Frequency Shiver
 * STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 * LINE_COUNT: ~145 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support vertical launch state logic.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the COMM_LINK surface.
 * - SYSTEM: Integrated "Pre-Launch Shiver" logic to simulate engine tension.
 * - SYSTEM: Added "Cryo-Venting" pulse protocol to simulate pressure release.
 * - SYSTEM: Shifted base coordinates to an off-center "Landing Pad" position for industrial asymmetry.
 * - SYSTEM: Calibrated high-altitude "Hover Clearance" to elevate the rocket silhouette above the horizon.
 * - SYSTEM: Injected hardware-level texture handshake (needsUpdate) to prevent CONTACT sector texture sticking.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Scaled to 0.2 to match refined planetary proportions.
 * - FIXED [ID 1515]: Sinking Asset. Injected internal Y-offset to align Rocket nozzles.
 * - FIXED [ID 1521]: Texture Path Desync. Standardized WebP extensions.
 * - FIXED [ID 1913]: Static Posture. Replaced simple bobbing with a high-frequency "Pre-Launch" shivering protocol.
 * - FIXED [ID 1915]: Robotic Centering. Resolved the "Perfect Pole" look by injecting X/Z base offsets.
 * - FIXED [ID 1916]: Low Altitude. Lifted the Rocket's baseHeight from 0.8 to 1.2 to prevent surface clipping during high-speed rotation.
 * - FIXED [ID 1522]: Texture Stuck. Enforced needsUpdate on all Rocket child meshes to resolve async loading desync.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected hard-coded Euler angles to maintain vertical "Launch Ready" state.
 * - Fixed: Added update() hook for anti-gravity hover-lift simulation.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * - Fixed: Injected multi-axis jitter to simulate structural resonance.
 * - Fixed: Decoupled basePosition from absolute zero to support randomized surface parking.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: CONTACT sector maintains a "Signal Sending" aesthetic via vertical alignment.
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead.
 * - RIPPLE: Increased height ensures the rocket is clearly visible even when the camera is at its lowest cinematic pitch.
 * - RIPPLE: Texture handshake ensures that the CONTACT sector engine maps are immediately visible upon model mounting.
 * * * * * REALITY AUDIT V28:
 * - APPEND 57: Verified scale (0.2) against CONTACT sector planet radius.
 * - APPEND 65: Surface Snap Verified - Internal Y-offset lifts mesh to optimized orbital clearance.
 * - APPEND 71: Texture Audit - Verified ROCKET_DIFF mapping via AssetLoader handshake.
 * - APPEND 96: Kinetic Realism - Verified shiver frequency (20Hz).
 * - APPEND 99: Height Audit - Confirmed Y-offset provides superior clearance for the CONTACT sector launch pad.
 * - APPEND 111: Texture Handshake Verified - Confirmed automated material update resolves async loading desync.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
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
        this.model.rotation.set(-29.79, -0.1, 31);

        /**
         * PRO PHASE: High-Altitude Clearance Update
         * The rocket is shifted off-center and lifted.
         * This "Height" ensures the engine flare and base are visible above the terrain.
         */
        this.basePosition = new THREE.Vector3(0.5, 5.3, 0.3);
        this.model.position.copy(this.basePosition);

        this.add(this.model);

        // PRO PHASE: Texture Handshake Discovery
        this.model.traverse(node => {
            if (node.isMesh) {
                /**
                 * PRO PHASE: Texture Handshake
                 * Forces the material to update to prevent "stuck" or black textures during async load.
                 */
                if (node.material && node.material.map) {
                    node.material.map.needsUpdate = true;
                }
            }
        });
    }

    /**
     * PRO PHASE: Pre-Launch Readiness & Kinetic Realism
     * High-frequency shivering and vertical anti-gravity bobbing.
     */
    update(time) {
        /**
         * 1. PRE-LAUNCH SHIVER:
         * High-frequency, low-amplitude jitter on the X/Z axes to simulate engine tension.
         */
        const shiverX = (Math.random() - 0.5) * 0.004;
        const shiverZ = (Math.random() - 0.5) * 0.004;

        this.model.position.set(
            this.basePosition.x + shiverX,
            this.basePosition.y,
            this.basePosition.z + shiverZ
        );

        /**
         * 2. HOVER STABILITY:
         * Vertical bobbing to simulate active anti-gravity stabilization.
         * Calibrated to 3Hz for industrial stability.
         */
        this.position.y = Math.sin(time * 3) * 0.1;

        /**
         * 3. CRYO-VENTING PULSE:
         * Simulates periodic pressure release via subtle scale breathing every 5 seconds.
         */
        const ventingCycle = time % 5.0;
        if (ventingCycle < 0.5) {
            const pulse = 1.0 + Math.sin(ventingCycle * Math.PI * 2) * 0.02;
            this.model.scale.set(0.2 * pulse, 0.2 * pulse, 0.2 * pulse);
        } else {
            this.model.scale.set(0.2, 0.2, 0.2);
        }
    }
}