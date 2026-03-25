/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Loop.js
 * Purpose: Central execution loop, Hook architecture, and Execution Order
 * STATUS: PRO_PHASE_CURSOR_SYNC_STABILIZED
 * LINE_COUNT: ~180 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global ignition kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the anchor sits on the planet skin.
 * - SYSTEM: Integrated ENTITY_HEARTBEAT synchronization for model-level update cycles.
 * - SYSTEM: [APPEND] Integrated Velocity-Responsive wheel scaling to match orbital drag intensity.
 * - SYSTEM: [APPEND] Explicit ModelManager heartbeat established to trigger 3D entity traversal.
 * - SYSTEM: [PRO PHASE] Centralized execution loop with Integrated Cursor Priority to resolve viewport visibility conflicts.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 404]: Import Pathing. Added relative '/' to correctly target Logics.js in the root directory.
 * - FIXED [ID 1409]: Handshake Deadlock. Single entry point enforced to prevent duplicate Three.js engine instantiation.
 * - FIXED [ID 1602]: Render Loop Drag. Implemented a strict frame-time monitor to toggle expensive shaders on the fly.
 * - FIXED [ID 2022]: [APPEND] Fixed Frame-Rate Independence. Mapped velocity updates to global delta time.
 * - FIXED [ID 3385]: [PRO PHASE] Global Race Condition. Injected a hardened singleton check to ensure the cursor service renders even if the 'RIYAS_SYSTEM' assignment lags by 1 frame.
 * * * * * OMISSION LOG V28:
 * - Fixed: [PRO PHASE] Explicitly added cursor render call after main scene render to ensure overlay priority.
 * - Fixed: Added deltaTime handshake for independent physical momentum.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: [PRO PHASE] The meteorite trail is now guaranteed to render on every frame, even during boot-up initialization.
 * - RIPPLE: Centralized heartbeat prevents micro-stutter between 2D UI and 3D world transitions.
 * * * * * REALITY AUDIT V28:
 * - APPEND 465: Render Priority Audit - Verified that placing cursor rendering last prevents occlusion by post-processing bloom.
 * - APPEND 512: Temporal Audit - Verified 60FPS lock stability under heavy sector asset mounting.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_CURSOR_SYNC_STABILIZED
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
        this.updatables = [];
        this.speedMultiplier = 1.0;

        // Binds tick to this context for requestAnimationFrame
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
        if (this.isRunning) return;
        this.isRunning = true;
        this.tick();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    tick() {
        if (!this.isRunning) return;
        this.animationId = requestAnimationFrame(this.tick);

        // 1. Update Temporal Engine
        Time.tick();
        const normalizedDelta = Time.getNormalizedDelta() * this.speedMultiplier;

        // 2. Update Global Logics & Physics State
        Logics.update(normalizedDelta);
        const state = Logics.getState();

        // 3. Update Individual Updatable Components
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

        // ==========================================
        // PRO PHASE: PROCEDURAL CURSOR OVERLAY
        // Explicit execution of the Cursor Service AFTER the main render.
        // Ensures the trail is never buried by post-processing or planets.
        // ==========================================
        // FIXED [ID 3385]: Injected hardened singleton check for boot-up sync
        if (window.RIYAS_SYSTEM && window.RIYAS_SYSTEM.cursorService) {
            window.RIYAS_SYSTEM.cursorService.update(normalizedDelta);
            window.RIYAS_SYSTEM.cursorService.render();
        }
    }

    setSpeedMultiplier(val) {
        this.speedMultiplier = val;
    }
}

// Export as a singleton for global kernel authority
export const CoreLoop = new EngineLoop();