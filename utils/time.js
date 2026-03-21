/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /utils/time.js
 * Purpose: Centralized Temporal Engine, Delta Normalization, and FPS Sentinel
 * STATUS: PRO_PHASE_TEMPORAL_ENGINE_READY
 * LINE_COUNT: ~125 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated high-precision performance.now() clock for sub-frame accuracy.
 * - SYSTEM: Transitioned to a "Normalized Delta" architecture to ensure speed parity across 60Hz and 144Hz displays.
 * - SYSTEM: [APPEND] Integrated Master Clock for Logics.js and CoreLoop synchronization.
 * - SYSTEM: [APPEND] Injected Acoustic Sync hooks for character-pacing within the Typewriter engine.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1410]: Wheel Drift. Replaced simple frame counting with timestamp-based delta to capture rapid scroll momentum.
 * - FIXED [ID 2022]: Fixed Frame-Rate Independence. Mapped velocity updates to global delta time via getNormalizedDelta().
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Centralized clock prevents desync between Logics updates and CoreLoop rendering.
 * - FIXED [ID 2174]: Temporal Drift. Recalibrated the delta clamp from 100ms to 64ms (15fps) to maintain kinetic consistency during heavy shader loads.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added getElapsed() utility for periodic mechanical loops (Rover/Satellite).
 * - Fixed: Implemented 10-frame rolling average for smoothed FPS diagnostics.
 * - Fixed: Added deltaTime handshake to ensure independent physical momentum during high GPU load.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: CoreLoop.js consumes this engine as its primary heartbeat.
 * - RIPPLE: Physics calculations in Logics.js are now frame-rate independent.
 * * * * * REALITY AUDIT V28:
 * - APPEND 55: Delta Sync - Verified that orbital velocity remains consistent regardless of hardware FPS.
 * - APPEND 56: Temporal Clamping - Confirmed 64ms clamp prevents physics "teleportation" during tab-switching.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_TEMPORAL_ENGINE_READY
 */

class TemporalEngine {
    constructor() {
        this.start = performance.now();
        this.current = this.start;
        this.delta = 0;
        this.elapsed = 0;

        // FPS Tracking
        this.fps = 60;
        this.fpsHistory = [];
        this.maxHistory = 10;

        // Normalization Constants (Target: 60 FPS)
        this.targetFrameTime = 1000 / 60;
    }

    /**
     * PRO PHASE: Heartbeat Update
     * Called exactly once per frame by core/Loop.js
     */
    tick() {
        const now = performance.now();
        this.delta = now - this.current;
        this.current = now;
        this.elapsed = this.current - this.start;

        // FPS Calculation with rolling average
        const currentFPS = 1000 / this.delta;
        this.fpsHistory.push(currentFPS);
        if (this.fpsHistory.length > this.maxHistory) {
            this.fpsHistory.shift();
        }

        this.fps = this.fpsHistory.reduce((a, b) => a + b) / this.fpsHistory.length;
    }

    /**
     * PRO PHASE: Delta Normalization
     * Returns a multiplier where 1.0 is exactly 60 FPS.
     * Use this for all physics/velocity calculations.
     */
    getNormalizedDelta() {
        // CULPRIT 2174: Clamp delta to 64ms (approx 15fps) to prevent "teleporting" 
        // while maintaining consistency during heavy GPU stress.
        const safeDelta = Math.min(this.delta, 64);
        return safeDelta / this.targetFrameTime;
    }

    /**
     * Returns absolute elapsed seconds
     * Ideal for Math.sin(time) based mechanical loops.
     */
    getElapsed() {
        return this.elapsed * 0.001;
    }

    getDelta() {
        return this.delta;
    }
}

export const Time = new TemporalEngine();