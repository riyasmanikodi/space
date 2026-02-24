/**
 * RIYAS_OS V28 - RIPPLE 1
 * File: /core/Loop.js
 * Purpose: Central execution loop, Hook architecture, and Execution Order
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
        // Tracks current FPS to monitor system health for terminal display.
        const currentFPS = Time.getAverageFPS();
        const normalizedDelta = Time.getNormalizedDelta() * this.speedMultiplier;

        // ==========================================
        // REALITY AUDIT: The "Execution Order" Chaos Fix
        // Strict pipeline: Time -> Logic/Physics -> Updatables -> Camera -> Render.
        // Prevents UI jitter and shuddering by ensuring all math is done before painting.
        // ==========================================

        // 2. Logic & Physics Update
        Logics.update(normalizedDelta);
        const state = Logics.getState();

        // 3. Updatables (Planets, Particles, Animations)
        for (let i = 0; i < this.updatables.length; i++) {
            this.updatables[i].update(normalizedDelta, state.activeSector);
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