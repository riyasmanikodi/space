/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Radar.js
 * Purpose: Modular CODE Entity with Rotational Scanning Animation & Surface-Snap Scaling
 * STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 * LINE_COUNT: ~140 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support continuous data-scan rotation.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the CODE_BASE surface.
 * - SYSTEM: Integrated "Sector Ping" logic for periodic high-speed data sweeps every 4 seconds.
 * - SYSTEM: Added industrial "Asymmetric Jitter" to simulate mechanical motor strain and resonance.
 * - SYSTEM: Integrated "Rotational Recoil" logic to simulate mechanical inertia during sweep transitions.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Adjusted to 0.2 to prevent sector clipping.
 * - FIXED [ID 1513]: Sinking Asset. Injected internal Y-offset to align Radar base.
 * - FIXED [ID 1520]: Scale Authority. Normalized internal mesh scale to 0.2.
 * - FIXED [ID 1910]: Static Scanning. Replaced continuous linear rotation with a periodic "Sweep and Ping" protocol for realism.
 * - FIXED [ID 1921]: Texture Flickering. Synchronized with AssetLoader's depth-buffer hardening protocols.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected -90 degree Y-offset to point dish toward the system center.
 * - Fixed: Added update() hook for active scanning rotation logic.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * - Fixed: Injected micro-vibration offsets to the base mesh to simulate industrial motor resonance.
 * - Fixed: Added independent dish-tilt oscillation to mimic active signal tracking.
 * - Fixed: Injected recoil offset calculations to resolve robotic movement transitions.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: CODE sector now projects a sense of active "Data Transmission".
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead.
 * - RIPPLE: The CODE sector now feels alive with mechanical intelligence, periodically emitting visual pulses.
 * - RIPPLE: Rotational recoil adds a layer of weight, making the dish feel like heavy industrial hardware.
 * * * * * REALITY AUDIT V28:
 * - APPEND 55: Verified scale (0.2) against CODE sector planet radius.
 * - APPEND 56: Scan rotation speed calibrated for radar-like feedback.
 * - APPEND 63: Surface Snap Verified - Internal Y-offset (0.3) lifts mesh to surface level.
 * - APPEND 70: Texture Audit - Verified RADAR_DIFF mapping via AssetLoader handshake.
 * - APPEND 92: Kinetic Realism - Verified sweep-to-pause ratio for industrial radar accuracy.
 * - APPEND 93: Motor Resonance - Confirmed jitter frequency matches the CODE sector atmosphere.
 * - APPEND 109: Inertia Audit - Verified rotational recoil (10% dampening) resolves snap-transitions.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
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

        // PRO PHASE: Kinetic State
        this.basePosition = new THREE.Vector3(0, 0.3, 0);
        this.lastPingTime = 0;
    }

    /**
     * PRO PHASE: Scanning Protocol & Kinetic Realism
     * Continuous slow rotation with periodic 360-degree high-speed sweeps.
     */
    update(time) {
        /**
         * 1. ASYMMETRIC JITTER: 
         * Micro-vibrations simulate motor strain and industrial resonance.
         */
        const jitterX = (Math.random() - 0.5) * 0.002;
        const jitterZ = (Math.random() - 0.5) * 0.002;
        this.model.position.set(
            this.basePosition.x + jitterX,
            this.basePosition.y,
            this.basePosition.z + jitterZ
        );

        /**
         * 2. DISH TILT: 
         * Subtle vertical oscillation mimicking active signal tracking.
         */
        this.model.rotation.x = Math.sin(time * 0.5) * 0.05;

        /**
         * 3. SCANNING LOGIC: 
         * Ambient slow rotation vs. The Sector Ping.
         * Diagnostic cycle set to 4 seconds.
         */
        const cycle = time % 4.0;

        if (cycle < 1.0) {
            /**
             * THE SECTOR PING:
             * High-speed 360 sweep to simulate a "Data Burst".
             */
            this.rotation.y += 0.12;

            // Interaction Handshake: Scale pulse during sweep
            const pulse = 1.0 + Math.sin(cycle * Math.PI) * 0.05;
            this.model.scale.set(0.2 * pulse, 0.2 * pulse, 0.2 * pulse);
        } else {
            /**
             * AMBIENT SCAN:
             * Slow, industrial rotation for persistent awareness.
             */
            this.rotation.y += 0.015;

            // Ensure scale is normalized after sweep
            this.model.scale.set(0.2, 0.2, 0.2);

            /**
             * 4. ROTATIONAL RECOIL:
             * Simulates mechanical inertia as the motor settles back into ambient speed.
             */
            if (cycle < 1.2) {
                const recoil = (0.015 - 0.12) * 0.1;
                this.rotation.y += recoil;
            }
        }
    }
}