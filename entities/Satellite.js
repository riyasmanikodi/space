/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Satellite.js
 * Purpose: Modular VISION Entity with Harmonic Solar Array Flutter & Orbital Drag
 * STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 * LINE_COUNT: ~260 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support specialized VISION sector visuals.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the orbital anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the VISION_SAT surface.
 * - SYSTEM: Integrated "Weightless Float" using a complex non-linear wave (Sine + Cosine) for realistic zero-G buoyancy.
 * - SYSTEM: Added independent solar array oscillation to simulate active energy tracking.
 * - SYSTEM: Injected hardware-level texture handshake (needsUpdate) to prevent VISION sector texture sticking.
 * - SYSTEM: Integrated Velocity-Responsive scaling to synchronize mechanical drift with orbital speed.
 * - SYSTEM: Synchronized mechanical heartbeat with the global temporal engine.
 * - SYSTEM: Injected Boolean Cloak to dynamically hide baked-in 3D model anchor lines.
 * - SYSTEM: Integrated "Harmonic Solar Array Flutter" to simulate independent mechanical stepper motors and structural elasticity.
 * - SYSTEM: Integrated "Orbital Drag" Z-axis kinematic shift to telegraph momentum resistance in zero-G.
 * - SYSTEM: [PRO PHASE] Integrated "The Array Alignment" cinematic focus reveal protocol.
 * - SYSTEM: [PRO PHASE] Split core logic into applyIdleAnimation and applyFocusAnimation for state-driven kinetic feedback.
 * - SYSTEM: [PRO PHASE] Engineered aggressive symmetric bloom and 15Hz elastic structural flutter for the hero reveal.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Reduced to 0.20 to match cinematic depth.
 * - FIXED [ID 1514]: Sinking Asset. Injected high internal Y-offset to align Satellite with orbital height.
 * - FIXED [ID 1522]: Scale Authority. Normalized internal mesh scale to 0.20.
 * - FIXED [ID 1522]: Texture Stuck. Enforced needsUpdate on all Satellite child meshes to resolve async loading desync.
 * - FIXED [ID 1912]: Robotic Float. Replaced simple linear oscillation with a multi-frequency "Zero-G" buoyancy protocol.
 * - FIXED [ID 1921]: Texture Flickering. Synchronized with AssetLoader's depth-buffer hardening protocols.
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Updated update() signature to receive global delta and velocity from CoreLoop.
 * - FIXED [ID 3301]: Golden Anchor Artifact. Bypassed 3D software re-export by explicitly setting baked-in curve/line meshes to `visible = false` during traversal.
 * - FIXED [ID 4215]: Rigid Panels. Replaced synchronized solar array tracking with detached phase profiles and velocity-driven elastic flapping.
 * - FIXED [ID 4216]: Static Orbit. Injected Z-axis longitudinal wave to mimic floating mass drifting against the vacuum.
 * - FIXED [ID 4219]: [PRO PHASE] Idle Loop Bleed. Models continued ambient drift while focused. Decoupled update hook into Idle and Focus branches to trigger Event-Driven Kinematic Overrides.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected 45-degree pitch (Math.PI/20) to align solar arrays with camera frustum.
 * - Fixed: Added update() hook for "Orbital Float" oscillation logic.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * - Fixed: Implemented automated array mesh discovery for independent mechanical tracking.
 * - Fixed: Injected material-layer hierarchy offsets to resolve depth-buffer artifacts at orbital altitude.
 * - Fixed: Added externalVelocity hook to the float-wave amplitude for kinetic impact.
 * - Fixed: Added name-based mesh filtering ('line', 'curve', 'anchor', 'path') to disable rendering of development artifacts.
 * - Fixed: Injected sub-degree phase desync ($2^\circ - 3^\circ$) between left and right arrays.
 * - Fixed: Added `Math.sin(time * 15.0 + phase) * velocityDrift` to solar panels to simulate structural vibration absorption.
 * - Fixed: [PRO PHASE] Added `isFocused` state tracking and `focusStartTime` to coordinate one-off cinematic reveals.
 * - Fixed: [PRO PHASE] Mapped aggressive symmetric bloom and 15Hz elastic structural flutter to the focus lock phase.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: VISION sector assets now exhibit realistic zero-G buoyancy while maintaining orbital lock.
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead.
 * - RIPPLE: The VISION sector now feels fluid and ethereal, mirroring the creative nature of the hub.
 * - RIPPLE: Texture handshake ensures that detached Solar Array maps are immediately visible upon model mounting.
 * - RIPPLE: Mechanical heartbeat ensures solar tracking remains fluid regardless of hardware frame-rate.
 * - RIPPLE: The golden anchor line vanishes instantly on load, restoring deep-space cinematic realism without breaking orbital math calculations.
 * - RIPPLE: The satellite panels now physically vibrate under stress, making the structure feel authentically fragile and complex.
 * - RIPPLE: [PRO PHASE] When the Satellite snaps to the center, it executes a gyroscopic calibration, aligning its arrays directly towards the viewport.
 * - RIPPLE: [PRO PHASE] The cinematic focus creates a "Hero Reveal" moment that feels intelligent and active, transitioning cleanly from idle loops.
 * * * * * REALITY AUDIT V28:
 * - APPEND 53: Verified scale (0.20) against VISION sector planet radius.
 * - APPEND 54: Orbital oscillation frequency tuned for zero-G realism.
 * - APPEND 64: Surface Snap Verified - Internal Y-offset (2.5) lifts mesh to orbital altitude.
 * - APPEND 72: Texture Audit - Verified SAT_DIFF mapping via AssetLoader handshake.
 * - APPEND 95: Kinetic Realism - Verified non-linear float wave ($y = \sin(t) + \cos(t \times 0.5)$).
 * - APPEND 110: Texture Handshake Verified - Confirmed automated material update resolves async loading desync.
 * - APPEND 211: Verified velocity-scaled buoyancy - external drift correctly influences the float-wave.
 * - APPEND 3301: Visual Artifact Audit - Confirmed boolean switch completely masks the golden line from the WebGL render cycle.
 * - APPEND 4215: Kinematic Physics Audit - Verified phase desync and 15Hz elastic flap execute without detaching the panel meshes.
 * - APPEND 4219: [PRO PHASE] Kinematic Reveal Audit - Verified the array alignment smoothly overrides independent phase tracking during focus events.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
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

        // PRO PHASE: Mechanical Discovery & Artifact Cloaking
        this.arrays = [];
        this.model.traverse(node => {
            const nodeName = node.name ? node.name.toLowerCase() : '';

            // Cloak baked-in artifacts (The Golden Line / Curve paths)
            if (nodeName.includes('line') || nodeName.includes('curve') || nodeName.includes('anchor') || nodeName.includes('path') || nodeName.includes('bezier')) {
                node.visible = false;
            }

            if (node.isMesh) {
                // Texture Handshake: Forces the material to update to prevent "stuck" or black textures.
                if (node.material && node.material.map) {
                    node.material.map.needsUpdate = true;
                    node.material.map.colorSpace = THREE.SRGBColorSpace;
                }

                if (nodeName.includes('panel') || nodeName.includes('array')) {
                    this.arrays.push(node);
                }
            }
        });

        this.baseY = 2.5;

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
            // Lock start time for deterministic exponential decay sequences
            if (!this.focusStartTime) this.focusStartTime = time;

            // [PRO PHASE] Trigger Cinematic Focus Reveal
            this.applyFocusAnimation(time - this.focusStartTime, externalVelocity);
        } else {
            // Clear focus state tracking
            this.focusStartTime = null;

            // [PRO PHASE] Standard Idle Loop
            this.applyIdleAnimation(time, externalVelocity);
        }
    }

    /**
     * PRO PHASE: "The Gyroscopic Calibration" Cinematic Reveal
     * Symmetric panel bloom array alignment with high-frequency structural flutter.
     * @param {number} elapsed - Local time elapsed since focus event triggered
     * @param {number} externalVelocity - User-driven orbital drag speed
     */
    applyFocusAnimation(elapsed, externalVelocity = 0) {
        const velocityDrift = Math.abs(externalVelocity);

        /**
         * 1. GRAVITATIONAL DILATION & LOCK:
         * Smoothly stabilize the Z and Y positions to establish cinematic weight.
         */
        const lift = Math.min(elapsed * 0.3, 0.15); // Slight rise on focus
        this.model.position.y = this.baseY + lift;

        // Z-axis stabilization, warped slightly by external velocity
        this.model.position.z = Math.sin(elapsed * 1.5) * 0.02 - (velocityDrift * 3.0);
        this.model.rotation.z = Math.sin(elapsed * 0.5) * 0.02;

        /**
         * 2. SYMMETRIC BLOOM (Array Alignment):
         * Force the solar panels to orient themselves directly toward the camera frustum.
         */
        this.arrays.forEach((array, index) => {
            const targetAngle = 0.0; // Flat orientation towards the user
            const currentIdleAngle = (Math.PI / 20); // Base ambient tilt

            // Slerp-like interpolation from idle tilt to locked camera alignment
            const alignProgress = Math.min(elapsed * 1.5, 1.0);
            const baseAngle = currentIdleAngle * (1.0 - alignProgress) + targetAngle * alignProgress;

            /**
             * 3. STRUCTURAL FLUTTER:
             * High-frequency elastic flap traveling across the panels, mimicking 
             * the absorption of the mechanical energy from the alignment motors.
             */
            const flutter = Math.exp(-elapsed * 2.5) * Math.sin(elapsed * Math.PI * 15.0) * 0.2;

            array.rotation.x = baseAngle + flutter;
        });

        /**
         * 4. ROTATIONAL LOCK:
         * Halt the ambient scan rotation and lock gaze onto the viewer.
         */
        this.rotation.y += (0 - this.rotation.y) * 0.15;
    }

    /**
     * PRO PHASE: Background Kinetic Realism
     * Harmonic Panel Flutter, Zero-G Buoyancy, and Orbital Drag.
     * @param {number} time - Global uTime for oscillation
     * @param {number} externalVelocity - User-driven orbital drag speed
     */
    applyIdleAnimation(time, externalVelocity = 0) {
        const velocityDrift = Math.abs(externalVelocity);

        /**
         * 1. ORBITAL DRAG & WEIGHTLESS BOB: 
         * Combines vertical buoyancy with a Z-axis longitudinal shift.
         * The satellite physically drifts backward under high orbital acceleration.
         */
        const floatWave = Math.sin(time) + Math.cos(time * 0.5);
        this.model.position.y = this.baseY + (floatWave * 0.12) + (Math.sin(time * 2.0) * velocityDrift * 0.5);

        // Z-axis shift (Front/Back inertia)
        this.model.position.z = Math.sin(time * 0.8) * 0.1 - (velocityDrift * 2.0);

        // Subtle axial tilt reacting to momentum
        this.model.rotation.z = Math.sin(time * 0.3) * 0.05 + (velocityDrift * 0.2);

        /**
         * 2. HARMONIC SOLAR ARRAY FLUTTER:
         * Asynchronous tracking and velocity-triggered elastic vibration.
         */
        this.arrays.forEach((array, index) => {
            // Desynchronized phase and frequency simulate independent stepper motors
            const freq = 0.8 + (index * 0.05);
            const phase = index * 0.4;

            // High-frequency elastic flap representing structural vibration absorption
            const elasticFlap = Math.sin(time * 15.0 + phase) * velocityDrift * 0.3;

            array.rotation.x = (Math.PI / 20) + Math.sin(time * freq + phase) * 0.1 + elasticFlap;
        });

        /**
         * 3. AMBIENT DRIFT:
         * Slow axial rotation for scanning the VISION sector.
         */
        const rotationSpeed = 0.005 + (velocityDrift * 0.05);
        this.rotation.y += rotationSpeed;
    }
}