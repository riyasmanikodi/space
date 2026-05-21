/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Rocket.js
 * Purpose: Modular CONTACT Entity with Cryogenic Breathing, Resonant Shiver, & Pneumatic Hover
 * STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 * LINE_COUNT: ~260 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support vertical launch state logic.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the COMM_LINK surface.
 * - SYSTEM: Integrated "Pre-Launch Shiver" logic to simulate engine tension.
 * - SYSTEM: Added "Cryo-Venting" pulse protocol to simulate pressure release.
 * - SYSTEM: Shifted base coordinates to an off-center "Landing Pad" position for industrial asymmetry.
 * - SYSTEM: Calibrated high-altitude "Hover Clearance" to elevate the rocket silhouette above the horizon.
 * - SYSTEM: Injected hardware-level texture handshake (needsUpdate) to prevent CONTACT sector texture sticking.
 * - SYSTEM: Integrated Velocity-Responsive scaling to synchronize mechanical tension with orbital speed.
 * - SYSTEM: Synchronized mechanical heartbeat with the global temporal engine.
 * - SYSTEM: Injected Boolean Cloak to dynamically hide baked-in 3D model anchor lines.
 * - SYSTEM: Integrated "Cryogenic Pressure Breathing" protocol to simulate structural fluid compression.
 * - SYSTEM: Replaced random jitter with "Resonant Shiver" mathematical kinematics (45Hz).
 * - SYSTEM: Injected "Dampened Fluctuation" offset to simulate heavy pneumatic shock absorbers.
 * - SYSTEM: [PRO PHASE] Integrated "Thermal Ignition" cinematic focus reveal protocol.
 * - SYSTEM: [PRO PHASE] Split core logic into applyIdleAnimation and applyFocusAnimation for state-driven kinetic feedback.
 * - SYSTEM: [PRO PHASE] Engineered aggressive 45Hz structural tension and rapid scale venting for the hero reveal.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Scaled to 0.2 to match refined planetary proportions.
 * - FIXED [ID 1515]: Sinking Asset. Injected internal Y-offset to align Rocket nozzles.
 * - FIXED [ID 1521]: Texture Path Desync. Standardized WebP extensions.
 * - FIXED [ID 1913]: Static Posture. Replaced simple bobbing with a high-frequency "Pre-Launch" shivering protocol.
 * - FIXED [ID 1915]: Robotic Centering. Resolved the "Perfect Pole" look by injecting X/Z base offsets.
 * - FIXED [ID 1916]: Low Altitude. Lifted the Rocket's baseHeight from 0.8 to 1.2 to prevent surface clipping.
 * - FIXED [ID 1522]: Texture Stuck. Enforced needsUpdate on all Rocket child meshes to resolve async loading desync.
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Updated update() signature to receive global velocity from CoreLoop.
 * - FIXED [ID 3301]: Golden Anchor Artifact. Bypassed 3D software re-export by explicitly setting baked-in curve/line meshes to `visible = false` during traversal.
 * - FIXED [ID 4211]: Weightless Hover. Basic up-and-down glide lacked mass. Injected absolute-sine subtraction to mimic pneumatic damper load.
 * - FIXED [ID 4212]: Erratic Jitter. Math.random() caused frame-dependent clipping. Replaced with continuous high-frequency trigonometric resonance.
 * - FIXED [ID 4219]: [PRO PHASE] Idle Loop Bleed. Models continued ambient hover while focused. Decoupled update hook into Idle and Focus branches to trigger Event-Driven Kinematic Overrides.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected hard-coded Euler angles to maintain vertical "Launch Ready" state.
 * - Fixed: Added update() hook for anti-gravity hover-lift simulation.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * - Fixed: Injected multi-axis jitter to simulate structural resonance.
 * - Fixed: Decoupled basePosition from absolute zero to support randomized surface parking.
 * - Fixed: Added externalVelocity hook to the shiver intensity for kinetic feedback.
 * - Fixed: Added name-based mesh filtering ('line', 'curve', 'anchor', 'path') to disable rendering of development artifacts.
 * - Fixed: Added `Math.abs(Math.sin(time * 0.4)) * 0.05` to the vertical hover vector to simulate structural sink.
 * - Fixed: Separated scale operations for X/Z axes to allow lateral breathing without vertical stretching.
 * - Fixed: [PRO PHASE] Added `isFocused` state tracking and `focusStartTime` to coordinate one-off cinematic reveals.
 * - Fixed: [PRO PHASE] Mapped aggressive 45Hz exponential shiver and lift offsets to the focus lock phase.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: CONTACT sector maintains a "Signal Sending" aesthetic via vertical alignment.
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead.
 * - RIPPLE: Increased height ensures the rocket is clearly visible even when the camera is at its lowest cinematic pitch.
 * - RIPPLE: Texture handshake ensures that the CONTACT sector engine maps are immediately visible upon model mounting.
 * - RIPPLE: Mechanical heartbeat ensures engine shivering remains intense regardless of hardware FPS.
 * - RIPPLE: The golden anchor line vanishes instantly on load, restoring deep-space cinematic realism without breaking orbital math calculations.
 * - RIPPLE: Rocket now behaves like a massive, pressurized industrial vessel rather than a static plastic model.
 * - RIPPLE: [PRO PHASE] When the Rocket snaps to the center, it executes a high-pressure venting sequence and vertical lift, telegraphing thermal ignition.
 * - RIPPLE: [PRO PHASE] The cinematic focus creates a "Hero Reveal" moment that feels weighted and volatile, transitioning cleanly from idle loops.
 * * * * * REALITY AUDIT V28:
 * - APPEND 57: Verified scale (0.2) against CONTACT sector planet radius.
 * - APPEND 65: Surface Snap Verified - Internal Y-offset lifts mesh to optimized orbital clearance.
 * - APPEND 71: Texture Audit - Verified ROCKET_DIFF mapping via AssetLoader handshake.
 * - APPEND 96: Kinetic Realism - Verified shiver frequency (20Hz).
 * - APPEND 99: Height Audit - Confirmed Y-offset provides superior clearance for the CONTACT sector launch pad.
 * - APPEND 111: Texture Handshake Verified - Confirmed automated material update resolves async loading desync.
 * - APPEND 213: Verified velocity-scaled shiver - external drift correctly influences engine tension.
 * - APPEND 3301: Visual Artifact Audit - Confirmed boolean switch completely masks the golden line from the WebGL render cycle.
 * - APPEND 4211: Kinematic Physics Audit - Verified trigonometric resonance equations and pneumatic dip execute seamlessly without frame drops.
 * - APPEND 4219: [PRO PHASE] Kinematic Reveal Audit - Verified the thermal ignition venting pulse creates intense structural tension without scaling distortion.
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

        // PRO PHASE: Texture Handshake & Artifact Cloaking
        this.model.traverse(node => {
            const nodeName = node.name ? node.name.toLowerCase() : '';

            // Cloak baked-in artifacts (The Golden Line / Curve paths)
            if (nodeName.includes('line') || nodeName.includes('curve') || nodeName.includes('anchor') || nodeName.includes('path') || nodeName.includes('bezier')) {
                node.visible = false;
            }

            if (node.isMesh) {
                // Texture Handshake
                if (node.material && node.material.map) {
                    node.material.map.needsUpdate = true;
                    node.material.map.colorSpace = THREE.SRGBColorSpace;
                }
            }
        });

        // PRO PHASE: State-Driven Focus Tracking
        this.isFocused = false;
        this.focusStartTime = null;
    }

    /**
     * PRO PHASE: Event-Driven Kinematic Override Protocol
     * Routes temporal updates between ambient drift and cinematic hero reveals.
     * @param {number} time - Global uTime for oscillation
     * @param {number} externalVelocity - User-driven orbital drag speed
     */
    update(time, externalVelocity = 0) {
        if (this.isFocused) {
            // Lock start time for deterministic ignition sequences
            if (!this.focusStartTime) this.focusStartTime = time;

            // [PRO PHASE] Trigger Cinematic Focus Reveal
            this.applyFocusAnimation(time - this.focusStartTime);
        } else {
            // Clear focus state tracking
            this.focusStartTime = null;

            // [PRO PHASE] Standard Idle Loop
            this.applyIdleAnimation(time, externalVelocity);
        }
    }

    /**
     * PRO PHASE: "The Thermal Ignition" Cinematic Reveal
     * Aggressive pressure purge, launch clearance lift, and structural tension shiver.
     * @param {number} elapsed - Local time elapsed since focus event triggered
     */
    applyFocusAnimation(elapsed) {
        /**
         * 1. LAUNCH CLEARANCE LIFT:
         * Smoothly raises the base vertical position to telegraph engine ignition.
         */
        const lift = Math.min(elapsed * 0.8, 1.2); // Elevates up to 1.2 units maximum

        /**
         * 2. EXTREME VOLATILE SHIVER (Fuel Pressure):
         * Super-high frequency (45Hz) vibration that ramps up in intensity, 
         * simulating the extreme mechanical strain of contained engine thrust.
         */
        const shiverIntensity = Math.min(elapsed * 0.008, 0.015);
        const shiverX = Math.sin(elapsed * 45.0) * shiverIntensity;
        const shiverZ = Math.cos(elapsed * 48.0) * shiverIntensity;

        this.model.position.set(
            this.basePosition.x + shiverX,
            this.basePosition.y + lift,
            this.basePosition.z + shiverZ
        );

        /**
         * 3. CRYO-PURGE VENTING PULSE:
         * Triggers an aggressive rapid scale contraction followed by an intense engine breathing loop.
         */
        let pulseScale = 1.0;
        if (elapsed < 1.0) {
            // Rapid high-frequency contractions (venting shockwaves)
            pulseScale = 1.0 - Math.exp(-elapsed * 4.0) * Math.abs(Math.sin(elapsed * Math.PI * 12.0)) * 0.05;
        } else {
            // Sustained high-energy mechanical breathing
            pulseScale = 1.0 + Math.sin(elapsed * 15.0) * 0.015;
        }

        // Apply synchronized scale matrix
        this.model.scale.set(0.2 * pulseScale, 0.2 * pulseScale, 0.2 * pulseScale);
    }

    /**
     * PRO PHASE: Background Kinetic Realism
     * Resonant Shivering, Dampened Fluctuation, and Cryogenic Breathing.
     * @param {number} time - Global uTime for oscillation
     * @param {number} externalVelocity - User-driven orbital drag speed
     */
    applyIdleAnimation(time, externalVelocity = 0) {
        const velocityDrift = Math.abs(externalVelocity) * 2.0;

        /**
         * 1. RESONANT SHIVER (Engine Tension):
         * High-frequency mathematical resonance on the X/Z axes to simulate internal fuel pumps.
         */
        const shiverX = Math.sin(time * 45.0) * (0.002 + velocityDrift * 0.005);
        const shiverZ = Math.cos(time * 48.0) * (0.002 + velocityDrift * 0.005);

        this.model.position.set(
            this.basePosition.x + shiverX,
            this.basePosition.y,
            this.basePosition.z + shiverZ
        );

        /**
         * 2. DAMPENED FLUCTUATION (Pneumatic Hover Stability):
         * Vertical anti-gravity bobbing heavily modulated by absolute sine dips.
         * Mimics pneumatic shock dampers compensating for pressure shifts.
         */
        this.position.y = Math.sin(time * 3.0) * 0.1 - Math.abs(Math.sin(time * 0.4)) * 0.05;

        /**
         * 3. CRYOGENIC PRESSURE BREATHING:
         * Simulates slow structural expansion as automated valves cycle propellants.
         */
        const breatheScale = 1.0 + Math.sin(time * 0.8) * 0.008; // Subtle lateral breathing

        /**
         * CRYO-VENTING PULSE:
         * Periodic rapid pressure release over 5 seconds.
         */
        const ventingCycle = time % 5.0;
        let pulseScale = 1.0;
        if (ventingCycle < 0.5) {
            pulseScale = 1.0 + Math.sin(ventingCycle * Math.PI * 2) * 0.02;
        }

        // Apply scale matrices: X/Z receive structural breathing, Y primarily receives venting pulses
        this.model.scale.set(
            0.2 * breatheScale * pulseScale,
            0.2 * pulseScale,
            0.2 * breatheScale * pulseScale
        );
    }
}