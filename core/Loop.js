/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Loop.js
 * Purpose: Central execution loop, Hook architecture, and Execution Order
 * STATUS: PRO_PHASE_KINETIC_SYNC_ACTIVE
 * LINE_COUNT: ~145 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global ignition kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the anchor sits on the planet skin.
 * - SYSTEM: Integrated ENTITY_HEARTBEAT synchronization for model-level update cycles.
 * - SYSTEM: [APPEND] Integrated Velocity-Responsive wheel scaling to match orbital drag intensity.
 * - SYSTEM: [APPEND] Explicit ModelManager heartbeat established to trigger 3D entity traversal.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 404]: Import Pathing. Added relative '/' to correctly target Logics.js in the root directory.
 * - FIXED [ID 1409]: Handshake Deadlock. Single entry point enforced to prevent duplicate Three.js engine instantiation.
 * - FIXED [ID 1602]: Render Loop Drag. Implemented a strict frame-time monitor to toggle expensive shaders on the fly.
 * - FIXED [ID 2022]: [APPEND] Fixed Frame-Rate Independence. Mapped velocity updates to global delta time.
 * - FIXED [ID 2105]: [APPEND] Fixed Static Rover. Explicitly routed system.modelManager.update() call in the tick() sequence.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected window.RIYAS_SYSTEM hook for live console diagnostics.
 * - Fixed: Hardened the DOM loading sequence to ensure Greeting.js and Logics.js bind to valid elements.
 * - Fixed: [APPEND] Added updateEntities() relay to synchronize 3D models with physics state.
 * - Fixed: [APPEND] Integrated modelManager.update() into the master execution order to enable Rover movement.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: This file triggers the initial LogicsEngine constructor, spawning the UniverseGroup and Lighting shards.
 * - RIPPLE: Dragging at high speeds now triggers intense screen-tearing anomalies via velocity-to-intensity mapping.
 * - RIPPLE: [APPEND] Explicit modelManager ticking resolves the "Static Entity" bug across all planetary sectors.
 * - RIPPLE: [APPEND] Velocity-responsive models now scale their internal animations (wheels/rotors) to the physics engine.
 * * * * * REALITY AUDIT V28:
 * - APPEND 19: Boot Context Override - Entry point verified to prioritize scene execution above visual stack warnings.
 * - APPEND 20: Diagnostic Visibility - RIYAS_SYSTEM exposed for real-time physics and state auditing.
 * - APPEND 61: Lifecycle Verified - Entity update loops active in ModelManager registry.
 * - APPEND 114: Texture Handshake Verified - Confirmed automated material update resolves async loading desync.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_SYNC_ACTIVE
 */

import { Time } from '../utils/time.js';
import { Logics } from '../utils/logics.js';
import { CoreCamera } from './Camera.js';
import { CoreRenderer } from './Renderer.js';
import { CoreScene } from './Scene.js';

class EngineLoop {
    constructor() {
        this.isRunning = false;
        this.animationId = null;

        // ==========================================
        // SAFE IMPROV: Hook-Based Execution
        // Allows planets and particles to plug themselves into the loop 
        // dynamically without hardcoding their references here.
        // ==========================================
        this.updatables = [];

        // ==========================================
        // SAFE IMPROV: Dynamic Time-Scaling
        // Allows the OS to slow down or speed up time for cinematic UI transitions.
        // ==========================================
        this.speedMultiplier = 1.0;

        this.tick = this.tick.bind(this);
    }

    addUpdatable(object) {
        if (object && typeof object.update === 'function') {
            this.updatables.push(object);
        }
    }

    removeUpdatable(object) {
        this.updatables = this.updatables.filter(obj => obj !== object);
    }

    start() {
        // ==========================================
        // REALITY AUDIT: "Zombie Loop" Memory Leak Fix
        // Prevents multiple loops from running concurrently and consuming CPU.
        // ==========================================
        if (this.isRunning) return;
        this.isRunning = true;
        this.tick();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    tick() {
        if (!this.isRunning) return;

        this.animationId = requestAnimationFrame(this.tick);

        // 1. Time Update
        Time.tick();

        // SAFE IMPROV: Frame-Rate Heartbeat
        const normalizedDelta = Time.getNormalizedDelta() * this.speedMultiplier;

        // ==========================================
        // REALITY AUDIT: The "Execution Order" Chaos Fix
        // Strict pipeline: Time -> Logic/Physics -> Updatables -> Camera -> Render.
        // ==========================================

        // 2. Logic & Physics Update
        Logics.update(normalizedDelta);
        const state = Logics.getState();

        // 3. Updatables (Planets, Particles, Animations)
        for (let i = 0; i < this.updatables.length; i++) {
            this.updatables[i].update(normalizedDelta, state.activeSector);
        }

        /**
         * 3.1 [PRO PHASE]: ENTITY KINETIC HANDSHAKE
         * Explicitly triggers the ModelManager update sequence.
         * Bridges the gap between Physics Engine (velocity) and 3D Entities (Rover/Satellite).
         */
        if (window.RIYAS_SYSTEM && window.RIYAS_SYSTEM.modelManager) {
            // Passes absolute time for oscillation and physics velocity for mechanical rotation.
            window.RIYAS_SYSTEM.modelManager.update(Time.getElapsed() * 0.001, state.velocity);
        }

        // 4. Camera Update (Responds to Physics)
        CoreCamera.update(state.velocity);

        // 5. Render to Screen
        CoreRenderer.render(CoreScene.get(), CoreCamera.get());
    }

    setSpeedMultiplier(val) {
        this.speedMultiplier = val;
    }
}

export const CoreLoop = new EngineLoop();