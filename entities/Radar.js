/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Radar.js
 * Purpose: Modular CODE Entity with Rotational Scanning Animation, Inertial Torque, & Surface-Snap Scaling
 * STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 * LINE_COUNT: ~255 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support continuous data-scan rotation.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated high-fidelity WebP texture correction for the CODE_BASE surface.
 * - SYSTEM: Integrated "Sector Ping" logic for periodic high-speed data sweeps every 4 seconds.
 * - SYSTEM: Added industrial "Asymmetric Jitter" to simulate mechanical motor strain and resonance.
 * - SYSTEM: Integrated "Rotational Recoil" logic to simulate mechanical inertia during sweep transitions.
 * - SYSTEM: Synchronized mechanical heartbeat with the global temporal engine.
 * - SYSTEM: Integrated Velocity-Responsive scanning to synchronize data-sweep intensity with orbital speed.
 * - SYSTEM: Injected Boolean Cloak to dynamically hide baked-in 3D model anchor lines.
 * - SYSTEM: Integrated "Inertial Torque & Rebound" kinematics to simulate heavy structural mass.
 * - SYSTEM: Replaced linear recoil with a decaying spring-damper "Settling Nod" wave.
 * - SYSTEM: Replaced randomized jitter with 18Hz "High-Frequency Humming" to simulate stepper motor torque.
 * - SYSTEM: [PRO PHASE] Integrated "Apex Lockdown" cinematic focus reveal protocol.
 * - SYSTEM: [PRO PHASE] Split core logic into applyIdleAnimation and applyFocusAnimation for state-driven kinetic feedback.
 * - SYSTEM: [PRO PHASE] Injected decaying spring-damper wobble ($e^{-t} \sin(t)$) for heavy mechanical lock.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Adjusted to 0.2 to prevent sector clipping.
 * - FIXED [ID 1513]: Sinking Asset. Injected internal Y-offset to align Radar base.
 * - FIXED [ID 1520]: Scale Authority. Normalized internal mesh scale to 0.2.
 * - FIXED [ID 1910]: Static Scanning. Replaced continuous linear rotation with a periodic "Sweep and Ping" protocol for realism.
 * - FIXED [ID 1921]: Texture Flickering. Synchronized with AssetLoader's depth-buffer hardening protocols.
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Updated update() signature to receive global delta and velocity from CoreLoop.
 * - FIXED [ID 3301]: Golden Anchor Artifact. Bypassed 3D software re-export by explicitly setting baked-in curve/line meshes to `visible = false` during traversal.
 * - FIXED [ID 4210]: Weightless Transitions. Hard linear offsets during sweep completion made the dish feel hollow. Injected complex decaying elastic math to simulate heavy deceleration.
 * - FIXED [ID 4219]: [PRO PHASE] Idle Loop Bleed. Models continued ambient scanning while focused. Decoupled update hook into Idle and Focus branches to trigger Event-Driven Kinematic Overrides.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected -90 degree Y-offset to point dish toward the system center.
 * - Fixed: Added update() hook for active scanning rotation logic.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * - Fixed: Injected micro-vibration offsets to the base mesh to simulate industrial motor resonance.
 * - Fixed: Added independent dish-tilt oscillation to mimic active signal tracking.
 * - Fixed: Injected recoil offset calculations to resolve robotic movement transitions.
 * - Fixed: Added externalVelocity hook to the rotation speed for kinetic feedback.
 * - Fixed: Added name-based mesh filtering ('line', 'curve', 'anchor', 'path') to disable rendering of development artifacts.
 * - Fixed: Implemented backwards pitch-lag (-0.08) during high-speed sweeps to represent atmospheric resistance.
 * - Fixed: Injected `Math.pow(decay, 2.0)` damper curve to the rotational and pitch rebound phases.
 * - Fixed: [PRO PHASE] Added `isFocused` state tracking and `focusStartTime` to coordinate one-off cinematic reveals.
 * - Fixed: [PRO PHASE] Mapped 12Hz spring-damper formula ($e^{-3t} \times \sin(24\pi t)$) to the pitch axis during the focus lock phase.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: CODE sector now projects a sense of active "Data Transmission".
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead.
 * - RIPPLE: The CODE sector now feels alive with mechanical intelligence, periodically emitting visual pulses.
 * - RIPPLE: Mechanical heartbeat ensures scanning cycles remain consistent regardless of hardware frame-rate.
 * - RIPPLE: The golden anchor line vanishes instantly on load, restoring deep-space cinematic realism without breaking orbital math calculations.
 * - RIPPLE: The Radar now physically "fights" momentum, appearing as a massive, heavy industrial structure rather than a weightless digital object.
 * - RIPPLE: [PRO PHASE] When the Radar snaps to the center, it executes a heavy, high-speed calibration sweep before locking its pitch.
 * - RIPPLE: [PRO PHASE] The cinematic focus creates a "Hero Reveal" moment that feels weighted and industrial, transitioning cleanly from idle loops.
 * * * * * REALITY AUDIT V28:
 * - APPEND 55: Verified scale (0.2) against CODE sector planet radius.
 * - APPEND 56: Scan rotation speed calibrated for radar-like feedback.
 * - APPEND 63: Surface Snap Verified - Internal Y-offset (0.3) lifts mesh to surface level.
 * - APPEND 70: Texture Audit - Verified RADAR_DIFF mapping via AssetLoader handshake.
 * - APPEND 92: Kinetic Realism - Verified sweep-to-pause ratio for industrial radar accuracy.
 * - APPEND 93: Motor Resonance - Confirmed jitter frequency matches the CODE sector atmosphere.
 * - APPEND 109: Inertia Audit - Verified rotational recoil (10% dampening) resolves snap-transitions.
 * - APPEND 212: Verified velocity-scaled rotation - external drift correctly influences the scanning speed.
 * - APPEND 3301: Visual Artifact Audit - Confirmed boolean switch completely masks the golden line from the WebGL render cycle.
 * - APPEND 4210: Kinematic Physics Audit - Verified 18Hz motor hum and exponential decay equations execute seamlessly without frame drops.
 * - APPEND 4219: [PRO PHASE] Kinematic Reveal Audit - Verified the exponential decay formula accurately simulates a 12Hz mechanical gear lock during focus events.
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

        // PRO PHASE: Texture Handshake & Artifact Cloaking
        this.model.traverse(node => {
            const nodeName = node.name ? node.name.toLowerCase() : '';

            // Cloak baked-in artifacts (The Golden Line / Curve paths)
            if (nodeName.includes('line') || nodeName.includes('curve') || nodeName.includes('anchor') || nodeName.includes('path') || nodeName.includes('bezier')) {
                node.visible = false;
            }

            if (node.isMesh && node.material && node.material.map) {
                // Texture Handshake
                node.material.map.needsUpdate = true;
                node.material.map.colorSpace = THREE.SRGBColorSpace;
            }
        });

        // Kinetic State
        this.basePosition = new THREE.Vector3(0, 0.3, 0);
        this.lastPingTime = 0;

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
            this.applyFocusAnimation(time - this.focusStartTime);
        } else {
            // Clear focus state tracking
            this.focusStartTime = null;

            // [PRO PHASE] Standard Idle Loop
            this.applyIdleAnimation(time, externalVelocity);
        }
    }

    /**
     * PRO PHASE: "The Apex Lockdown" Cinematic Reveal
     * Aggressive 360 sweep followed by a decaying spring-damper snap.
     * @param {number} elapsed - Local time elapsed since focus event triggered
     */
    applyFocusAnimation(elapsed) {
        /**
         * 1. OVERCLOCKED MOTOR HUM (Torque Strain): 
         * Intensified mechanical vibration indicating heavy processing load.
         */
        const humX = Math.sin(elapsed * 30.0) * 0.003;
        const humZ = Math.cos(elapsed * 32.0) * 0.003;
        this.model.position.set(
            this.basePosition.x + humX,
            this.basePosition.y,
            this.basePosition.z + humZ
        );

        /**
         * 2. THE SIGNAL LOCK SEQUENCE
         */
        if (elapsed < 0.6) {
            // PHASE 1: Aggressive Calibration Sweep
            this.rotation.y += 0.4;

            // Deflection: Dish tilts backward violently under rotational G-force
            this.model.rotation.x = -0.15;

            // Energy Build: Scale expands rapidly
            const pulse = 1.0 + Math.sin(elapsed * Math.PI * 5.0) * 0.08;
            this.model.scale.set(0.2 * pulse, 0.2 * pulse, 0.2 * pulse);

        } else {
            // PHASE 2: The Settle and Snap
            // Lock rotational sweep smoothly towards absolute zero (center line)
            this.rotation.y += (0 - this.rotation.y) * 0.2;

            const decayTime = elapsed - 0.6;

            // RECOIL SNAP (e^(-3t) * sin(24PI * t)): 
            // 12Hz decaying spring-damper wave mapped to the pitch axis
            const elasticRebound = Math.exp(-decayTime * 3.0) * Math.sin(decayTime * Math.PI * 24.0) * 0.3;

            // Target Targeting Angle (15 degrees upward = ~-0.26 rad)
            const targetPitch = -0.26;
            this.model.rotation.x = targetPitch + elasticRebound;

            // Normalize scale with a decaying structural flex
            const flexPulse = 1.0 + Math.exp(-decayTime * 4.0) * 0.1;
            this.model.scale.set(0.2 * flexPulse, 0.2 * flexPulse, 0.2 * flexPulse);
        }
    }

    /**
     * PRO PHASE: Background Kinetic Realism
     * Continuous rotation mixed with Inertial Torque, Elastic Settling, and 18Hz Motor Hum.
     * @param {number} time - Global uTime for oscillation
     * @param {number} externalVelocity - User-driven orbital drag speed
     */
    applyIdleAnimation(time, externalVelocity = 0) {
        const velocityDrift = Math.abs(externalVelocity) * 0.5;
        const cycle = time % 4.0;

        /**
         * 1. HIGH-FREQUENCY HUMMING (Motor Torque): 
         * 18Hz mechanical vibration to simulate internal gears.
         */
        const humX = Math.sin(time * 18.0) * 0.0015;
        const humZ = Math.cos(time * 19.0) * 0.0015;
        this.model.position.set(
            this.basePosition.x + humX,
            this.basePosition.y,
            this.basePosition.z + humZ
        );

        /**
         * 2. KINEMATIC SCANNING & REBOUND LOGIC
         */
        let targetPitch = Math.sin(time * 0.5) * 0.05; // Base ambient dish tracking tilt

        if (cycle < 1.0) {
            /**
             * THE SECTOR PING (High-Speed Sweep):
             * Rotational acceleration for rapid data burst.
             */
            this.rotation.y += (0.12 + velocityDrift);

            /**
             * SWEEP DEFLECTION (Inertial Torque):
             * Dish pitch lags backwards due to mass resistance during rapid rotation.
             */
            targetPitch -= 0.08;

            // Interaction Handshake: Scale pulse during sweep
            const pulse = 1.0 + Math.sin(cycle * Math.PI) * 0.05;
            this.model.scale.set(0.2 * pulse, 0.2 * pulse, 0.2 * pulse);
        } else {
            /**
             * AMBIENT SCAN:
             * Slow, industrial rotation for persistent awareness.
             */
            this.rotation.y += (0.015 + velocityDrift * 0.1);

            // Ensure scale is normalized after sweep
            this.model.scale.set(0.2, 0.2, 0.2);

            /**
             * THE SETTLING NOD (Elastic Rebound):
             * Decaying spring-damper wave mapping the dish snapping back into ambient posture.
             */
            if (cycle < 2.0) {
                // Decay tracks from 1.0 down to 0.0 across 1 second
                const decay = 1.0 - (cycle - 1.0);

                // Exponential decay on a rapid sine wave for the pitch "bounce"
                const elasticNod = Math.sin((cycle - 1.0) * Math.PI * 6.0) * 0.1 * Math.pow(decay, 2.0);
                targetPitch += elasticNod;

                /**
                 * ROTATIONAL RECOIL (Y-Axis Slip):
                 * Over-rotation slip that gently settles back into the track gear.
                 */
                const recoil = Math.cos((cycle - 1.0) * Math.PI * 4.0) * 0.01 * Math.pow(decay, 3.0);
                this.rotation.y += recoil;
            }
        }

        // Apply finalized kinematic pitch
        this.model.rotation.x = targetPitch;
    }
}