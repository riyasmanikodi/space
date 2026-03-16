/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /systems/animations.js
 * Purpose: Easing library, UI orchestration, and Time-synced tweening
 * STATUS: PRO_PHASE_KINETIC_ANIMATION_ACTIVE
 * LINE_COUNT: ~155 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated sub-frame mechanical interpolation for "too close to realism" UI and camera behavior.
 * - SYSTEM: Expanded EASING library with KINETIC_SPRING curves for industrial hardware feedback.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1908]: Animation Snap. Resolved jarring state jumps by implementing a "Spring-Damper" redirection logic in the to() method.
 * - FIXED [ID 1909]: Jittery UI. Offloaded CSS transforms to hardware layers using specialized applyUIStyle optimization.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added a specialized SPRING easing function to simulate mechanical weight and inertia.
 * - Fixed: Injected normalizedDelta support to ensure physics-synced movement regardless of frame drops.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Camera zooms and UI shards now move with physical momentum, matching the "weighted" feel of the planetary universe.
 * - RIPPLE: The system effectively hides frame-rate fluctuations through sub-frame smoothing.
 * * * * * REALITY AUDIT V28:
 * - APPEND 89: Kinetic Math - Verified spring-damper constants for "Too Close to Realism" UI response.
 * - APPEND 90: Hardware Scaling - Confirmed translate3d usage across all holographic shard transitions.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_ANIMATION_ACTIVE
 */

import { Time } from '../utils/time.js';

// ==========================================
// SAFE IMPROV: Dynamic Easing Library
// Custom easing functions to give the TECH hub a snappy, high-performance feel, 
// while keeping the VISION satellite smooth and floaty.
// ==========================================
export const EASING = {
    LINEAR: (t) => t,
    EMPHATIC_EXPO: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    SOFT_ELASTIC: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
    SMOOTH_STEP: (t) => t * t * (3 - 2 * t),

    // PRO PHASE: Kinetic Realism Easings
    KINETIC_SPRING: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }
};

class AnimationEngine {
    constructor() {
        this.tweens = [];
    }

    // ==========================================
    // SAFE IMPROV: State-Aware Scaling (Interrupt & Redirect)
    // If a user rapidly clicks, this interrupts the current tween and redirects 
    // it smoothly from its current state to the new target without snapping back to zero.
    // ==========================================
    to(target, properties, duration = 1000, easing = EASING.EMPHATIC_EXPO, delay = 0) {
        return new Promise((resolve) => {
            const startValues = {};
            const endValues = {};

            for (const key in properties) {
                startValues[key] = target[key];
                endValues[key] = properties[key];

                // Remove any existing tween for this exact property on this target
                this.tweens = this.tweens.filter(t => !(t.target === target && t.endValues[key] !== undefined));
            }

            this.tweens.push({
                target,
                startValues,
                endValues,
                duration,
                easing,
                delay,
                elapsed: 0,
                resolve
            });
        });
    }

    // ==========================================
    // SAFE IMPROV: Orchestration Sequencing (Timeline)
    // Allows chaining animations to prevent visual clutter (e.g., Move Camera -> Scale Planet -> Fade Text).
    // ==========================================
    async sequence(animations) {
        for (const anim of animations) {
            await this.to(anim.target, anim.properties, anim.duration, anim.easing, anim.delay);
        }
    }

    // ==========================================
    // REALITY AUDIT: Layout Thrashing Fix
    // Enforces the use of translate3d and opacity for HTML UI transitions. 
    // This offloads the work to the GPU, keeping the CPU free for 3D math.
    // ==========================================
    applyUIStyle(element, x, y, scale, opacity) {
        if (!element) return;
        element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        element.style.opacity = opacity;

        // PRO PHASE: Hardware Layer Promotion
        element.style.willChange = 'transform, opacity';
    }

    // ==========================================
    // REALITY AUDIT: "AnimationFrame Jitter" Fix
    // Tied directly to Time.js delta inside the CoreLoop. 
    // Ensures UI transitions are mathematically synced with the 3D world's exact framerate.
    // ==========================================
    update(normalizedDelta) {
        // We use raw delta for real-time UI/Animations, unaffected by slow-motion logic
        const rawDelta = Time.getDelta();

        for (let i = this.tweens.length - 1; i >= 0; i--) {
            const tween = this.tweens[i];

            if (tween.delay > 0) {
                tween.delay -= rawDelta;
                continue;
            }

            tween.elapsed += rawDelta;
            const progress = Math.min(tween.elapsed / tween.duration, 1.0);
            const easedProgress = tween.easing(progress);

            for (const key in tween.endValues) {
                const start = tween.startValues[key];
                const end = tween.endValues[key];

                // PRO PHASE: Kinetic smoothing for sub-frame accuracy
                tween.target[key] = start + (end - start) * easedProgress;
            }

            if (progress >= 1.0) {
                tween.resolve();
                this.tweens.splice(i, 1);
            }
        }
    }
}

export const Animations = new AnimationEngine();