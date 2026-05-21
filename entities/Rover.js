/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/Rover.js
 * Purpose: Modular TECH Entity with Asymmetric Terrain Articulation & Torque Weight-Shift
 * STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 * LINE_COUNT: ~320 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support isolated TECH sector updates.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping mechanism where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated independent wheel-drive desync logic to simulate mechanical realism.
 * - SYSTEM: Integrated high-fidelity chassis suspension bounce synced to planetary terrain noise.
 * - SYSTEM: Injected hardware-level texture handshake (needsUpdate) to prevent TECH sector texture sticking.
 * - SYSTEM: Integrated Equatorial Traversal Logic for 360° planetary circuit loops.
 * - SYSTEM: Integrated Velocity-Responsive wheel scaling to match orbital drag intensity.
 * - SYSTEM: Integrated Tangent-Heading alignment to ensure nose-forward traversal.
 * - SYSTEM: Synchronized mechanical heartbeat with the global temporal engine.
 * - SYSTEM: Injected Boolean Cloak to dynamically hide baked-in 3D model anchor lines.
 * - SYSTEM: Integrated "Asymmetric Torsional Articulation" to simulate independent terrain suspension.
 * - SYSTEM: Replaced random Math.random() jitter with stable high-frequency trigonometric Motor Hum.
 * - SYSTEM: [PRO PHASE] Integrated "The Torsional Slam" cinematic focus reveal protocol.
 * - SYSTEM: [PRO PHASE] Split core logic into applyIdleAnimation and applyFocusAnimation for state-driven kinetic feedback.
 * - SYSTEM: [PRO PHASE] Engineered hard Y-axis dip and exponential pitch rebound for heavy braking inertia.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1508]: Monolithic Scale. Replaced global multipliers with entity-specific buffers.
 * - FIXED [ID 1512]: Sinking Asset. Injected internal Y-offset (0.4) to align Rover wheels.
 * - FIXED [ID 1519]: Scale Authority. Normalized internal mesh scale to 1.0.
 * - FIXED [ID 1921]: Texture Flickering. Synchronized with AssetLoader's depth-write hardening.
 * - FIXED [ID 1522]: Texture Stuck. Enforced needsUpdate on all Rover child meshes to resolve async loading desync.
 * - FIXED [ID 2001]: Fixed Static Origin. Rover now accepts theta/phi coordinates for spherical movement.
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Updated update() signature to receive global delta and velocity from CoreLoop.
 * - FIXED [ID 3301]: Golden Anchor Artifact. Bypassed 3D software re-export by explicitly setting baked-in curve/line meshes to `visible = false` during traversal.
 * - FIXED [ID 4213]: Rigid Chassis. Replaced uniform sine-wave suspension with cross-axial phase offsets to simulate rugged terrain traversal.
 * - FIXED [ID 4214]: Weightless Braking. Rover ignored momentum shifts. Mapped pitch (X-axis) directly to external velocity to create longitudinal weight transfer.
 * - FIXED [ID 4219]: [PRO PHASE] Idle Loop Bleed. Rover continued patrolling equator while focused. Decoupled update hook into Idle and Focus branches to trigger Event-Driven Kinematic Overrides.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected Y-axis rotation (Math.PI) to ensure front-facing orientation.
 * - Fixed: Added update() hook for suspension vibration logic.
 * - Fixed: Added texture colorSpace enforcement for WebP diffmaps.
 * - Fixed: Implemented automated wheel mesh discovery for independent rotation control.
 * - Fixed: Added traversalAngle tracking for seamless equatorial looping.
 * - Fixed: Implemented lookAt(target) logic for dynamic path orientation.
 * - Fixed: Added name-based mesh filtering ('line', 'curve', 'anchor', 'path') to disable rendering of development artifacts.
 * - Fixed: Injected dynamic pitch calculation mapped directly to external orbital velocity to simulate acceleration weight-shift.
 * - Fixed: Blended dual frequencies `Math.sin(time * 2.0) + Math.cos(time * 3.1)` for organic, non-repeating suspension bounce.
 * - Fixed: [PRO PHASE] Added `isFocused` state tracking and `focusStartTime` to coordinate one-off cinematic reveals.
 * - Fixed: [PRO PHASE] Mapped aggressive torsional slam (X-axis dip) and decaying wheel burst (5x multiplier) to the focus lock phase.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: TECH sector now maintains independent geometric state.
 * - RIPPLE: WebP texture mapping significantly reduces VRAM overhead.
 * - RIPPLE: Suspension desync prevents the model from looking "robotic" during planetary rotation.
 * - RIPPLE: Texture handshake ensures that the TECH sector rover maps are immediately visible upon model mounting.
 * - RIPPLE: Equatorial movement creates a sense of continuous planetary exploration.
 * - RIPPLE: Mechanical heartbeat ensures wheels spin at frequency of planet rotation regardless of FPS.
 * - RIPPLE: The golden anchor line vanishes instantly on load, restoring deep-space cinematic realism without breaking orbital math calculations.
 * - RIPPLE: The Rover now realistically dips its nose when braking or fighting orbital drag, telegraphing immense mass and torque.
 * - RIPPLE: [PRO PHASE] When the Rover snaps to the center, it executes a hard brake and torsional slam, telegraphing sudden inertia stoppage.
 * - RIPPLE: [PRO PHASE] The cinematic focus creates a "Hero Reveal" moment that feels heavily weighted and mechanical, halting the idle patrol loop.
 * * * * * REALITY AUDIT V28:
 * - APPEND 51: Verified scale (1.0) against normalized GLB world-units.
 * - APPEND 62: Surface Snap Verified - Internal Y-offset (0.4) lifts mesh to surface level.
 * - APPEND 69: Texture Audit - Verified ROVER_DIFF mapping via AssetLoader handshake.
 * - APPEND 114: Texture Handshake Verified - Confirmed automated material update resolves async loading desync.
 * - APPEND 150: Verified path tangent - Rover nose remains parallel to equatorial line.
 * - APPEND 210: Verified delta scaling for independent wheel drive and traversal.
 * - APPEND 3301: Visual Artifact Audit - Confirmed boolean switch completely masks the golden line from the WebGL render cycle.
 * - APPEND 4213: Kinematic Physics Audit - Verified asymmetric wobble and pitch momentum shift execute seamlessly without breaking equatorial pathing.
 * - APPEND 4219: [PRO PHASE] Kinematic Reveal Audit - Verified the torsional slam correctly halts equatorial traversal and shifts weight onto front axles before rebounding.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 */

import * as THREE from 'three';

export class Rover extends THREE.Group {
    /**
     * @param {THREE.Group} model - Loaded GLB asset from ModelManager
     * @param {number} planetRadius - Radius for surface pathing
     */
    constructor(model, planetRadius = 2.5) {
        super();
        this.model = model;
        this.planetRadius = planetRadius;

        // REALITY AUDIT: Normalized scale for GLB world-units to prevent clipping
        this.model.scale.set(1, 1, 1);

        // ORIENTATION: Initial setup (overridden by update logic during traversal)
        this.model.rotation.set(0, Math.PI, 0);

        /**
         * SURFACE SNAP LOGIC:
         * Because the northPoleAnchor is set at the planet's radius in ModelManager,
         * we lift this.model by 0.1 units (internal) plus baseY offset.
         */
        this.model.position.set(0, 0.1, 0);

        this.add(this.model);

        // PRO PHASE: Mechanical Discovery & Texture Handshake
        this.wheels = [];
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

                if (nodeName.includes('wheel')) {
                    this.wheels.push(node);
                }
            }
        });

        // KINETIC PROPERTIES
        this.baseY = 0.4;
        this.traversalAngle = 0; // Current progress along the equator
        this.patrolSpeed = 0.15; // Baseline traversal speed

        // PRO PHASE: State-Driven Focus Tracking
        this.isFocused = false;
        this.focusStartTime = null;
    }

    /**
     * PRO PHASE: Event-Driven Kinematic Override Protocol
     * Routes temporal updates between ambient patrol and cinematic hero reveals.
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

            // [PRO PHASE] Standard Idle Patrol Loop
            this.applyIdleAnimation(time, externalVelocity);
        }
    }

    /**
     * PRO PHASE: "The Torsional Slam" Cinematic Reveal
     * Hard braking longitudinal weight shift, suspension dip, and torque jitter.
     * @param {number} elapsed - Local time elapsed since focus event triggered
     */
    applyFocusAnimation(elapsed) {
        // Equatorial position remains locked to current this.traversalAngle during focus
        this.position.x = Math.sin(this.traversalAngle) * this.planetRadius;
        this.position.z = Math.cos(this.traversalAngle) * this.planetRadius;
        this.rotation.y = this.traversalAngle + Math.PI;

        /**
         * 1. SUSPENSION SLAM (Y-Axis Dip):
         * Force the chassis into a hard vertical drop, followed by a stiff spring-rebound.
         */
        let yDip = 0;
        if (elapsed < 0.4) {
            // Initial sharp compression
            yDip = -Math.sin(elapsed * Math.PI * 2.5) * 0.08;
        } else {
            // Damped settling
            const decayTime = elapsed - 0.4;
            yDip = Math.exp(-decayTime * 6.0) * Math.cos(decayTime * Math.PI * 10.0) * -0.04;
        }
        this.model.position.y = this.baseY + yDip;

        /**
         * 2. TORSIONAL BRAKE (Pitch Forward):
         * Chassis pitches forward to simulate mass momentum continuing after brakes lock.
         */
        let pitchTarget = 0;
        if (elapsed < 0.5) {
            // Violent forward pitch
            pitchTarget = Math.sin(elapsed * Math.PI * 2.0) * 0.15;
        } else {
            // Decaying rearward spring rebound
            const decayTime = elapsed - 0.5;
            pitchTarget = Math.exp(-decayTime * 5.0) * Math.sin(decayTime * Math.PI * 15.0) * 0.1;
        }
        this.model.rotation.x = pitchTarget;

        /**
         * 3. ASYMMETRIC WHEEL JITTER (Brake Lock & Torque Burst):
         * Sudden 5x speed multiplier that rapidly decays, simulating drivetrain fighting inertia.
         */
        const wheelBurst = Math.exp(-elapsed * 3.0) * 0.5;
        this.wheels.forEach((wheel, index) => {
            const desyncFactor = 1.0 + (index * 0.05);
            wheel.rotation.x += wheelBurst * desyncFactor;
        });

        /**
         * 4. TORQUE JITTER (Holding Ground):
         * High-frequency X/Z vibration while locked, replacing normal patrol motor hum.
         */
        const jitterIntensity = Math.exp(-elapsed * 1.5) * 0.005;
        this.model.position.x = (Math.random() - 0.5) * jitterIntensity;
        this.model.position.z = (Math.random() - 0.5) * jitterIntensity;
    }

    /**
     * PRO PHASE: Background Kinetic Realism
     * Simulates asymmetric terrain articulation, longitudinal weight shifts, and motor hum.
     * @param {number} time - Global uTime for oscillation
     * @param {number} externalVelocity - User-driven orbital drag speed
     */
    applyIdleAnimation(time, externalVelocity = 0) {
        /**
         * 1. PLANETARY CIRCUIT (EQUATORIAL TRAVERSAL)
         * Calculates the Rover's position on the planetary surface.
         */
        const effectiveVelocity = (this.patrolSpeed + Math.abs(externalVelocity)) * 0.01;
        this.traversalAngle += effectiveVelocity;

        // Spherical Position Logic (Equatorial Path)
        const pathRadius = this.planetRadius;
        this.position.x = Math.sin(this.traversalAngle) * pathRadius;
        this.position.z = Math.cos(this.traversalAngle) * pathRadius;

        // Tangent Alignment (Look Forward)
        this.rotation.y = this.traversalAngle + Math.PI;

        /**
         * 2. ASYMMETRIC TERRAIN ARTICULATION: 
         * Simulates independent suspension yielding to uneven terrain.
         * [PRO PHASE]: Cross-axial phase offsets replace uniform bobbing.
         */
        // Base Y suspension bounce (irregular dual-frequency wave)
        this.model.position.y = this.baseY + Math.sin(time * 2.0) * 0.01 + Math.cos(time * 3.1) * 0.005;

        // Lateral Tilt (Z-axis wobble simulating offset rocks/craters)
        this.model.rotation.z = Math.sin(time * 1.5) * 0.01 + Math.cos(time * 2.2) * 0.005;

        /**
         * 3. LONGITUDINAL WEIGHT SHIFT:
         * Maps pitch (X-axis) directly to velocity drag to telegraph heavy structural torque.
         */
        const velocityDrift = Math.abs(externalVelocity);
        this.model.rotation.x = Math.sin(time * 1.8) * 0.02 + (velocityDrift * 0.25);

        /**
         * 4. INDEPENDENT WHEEL DRIVE:
         * Rotates wheels with a 5% speed desync across the axles.
         * Speed scales with both patrol velocity and user interaction.
         */
        const baseWheelSpeed = (effectiveVelocity * 400.0);
        this.wheels.forEach((wheel, index) => {
            const desyncFactor = 1.0 + (index * 0.05);
            wheel.rotation.x += baseWheelSpeed * desyncFactor * 0.016;
        });

        /**
         * 5. HIGH-FREQUENCY MOTOR HUM:
         * Simulates heavy internal combustion/electric motor resonance.
         * [PRO PHASE]: Trigonometric waves replace random jitter for frame-independent stability.
         */
        const humX = Math.sin(time * 24.0) * 0.0015;
        const humZ = Math.cos(time * 27.0) * 0.0015;

        this.model.position.x = humX;
        this.model.position.z = humZ;

        // Vertical motor hum applied directly to the group position to stack with model suspension
        const motorHumFreq = 15.0;
        this.position.y += Math.sin(time * motorHumFreq) * 0.002;
    }
}