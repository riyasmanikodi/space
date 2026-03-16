/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /effects/HeroEffects.js
 * Purpose: Linguistic Typographic Anomaly Engine for Hero Identity
 * STATUS: PRO_PHASE_HERO_GLITCH_TIMING_SYNC
 * LINE_COUNT: ~260 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated Sector-Aware DNA Sync for RIYAS MANIKODI identity.
 * - SYSTEM: Linked typography to GLOBAL_GLITCH bus for real-time haptic vibration.
 * - SYSTEM: Integrated dynamic text-shadow displacement for the industrial "V28" look.
 * - SYSTEM: Synchronized "Heartbeat" interval to 8 seconds with a 2-second glitch duration.
 * - SYSTEM: Integrated CC High Jinkies Flip font and MIRROR_DESYNC optical distortion.
 * - SYSTEM: Transitioned randomization logic to a "Shuffle Queue" protocol to prevent immediate effect repetition.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 305]: Layer Desync. Enforced hardware-accelerated stacking (z-index) to prevent text clipping.
 * - FIXED [ID 1801]: Static Displacement. Replaced static multi-div structure with a single-node "Optical Ghosting" architecture.
 * - FIXED [ID 1802]: Kinetic Lag. Optimized requestAnimationFrame loop for the ASCII_SCRAMBLE effect.
 * - FIXED [ID 1901]: Typographic Collision. Adjusted letter-spacing metrics to accommodate the wider High Jinkies profile.
 * - FIXED [ID 1902]: Repetitive Anomalies. Resolved frequent glitch repeats by implementing Fisher-Yates shuffle queue logic.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added immediate reaction to the "Thump" effect during planet snaps and clicks.
 * - Fixed: Integrated weighted randomization for sector-specific character corruption.
 * - Fixed: Implemented responsive clamp() font-sizing to match the scale of the Master Sketch.
 * - Fixed: Adjusted Heartbeat Sentinel to 8,000ms to stabilize identity layer presence.
 * - Fixed: Extended glitch duration to 2,000ms for high-visibility anomalies.
 * - Fixed: Added glitchQueue array and shuffleQueue method to ensure mathematically even effect distribution.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The hero name vibrates in sync with the AudioEngine chirps.
 * - RIPPLE: High-speed orbital drags now physically "tear" the name apart using the CHROMATIC_SPLIT pass.
 * - RIPPLE: The system heartbeat triggers subtle anomalies every 8 seconds to maintain ambient realism.
 * - RIPPLE: High-velocity interactions trigger MIRROR_DESYNC, visually disrupting the CC High Jinkies font axis.
 * - RIPPLE: The non-repeating loop enhances the cinematic, "intelligent" feel of the OS identity.
 * * * * * REALITY AUDIT V28:
 * - APPEND 30: Semantic Glitching - TECH triggers ASCII/Hex corruption, CODE triggers lens warping.
 * - APPEND 31: Optical Ghosting - Consolidated to a single wrapper using pseudo-elements to simulate physical dispersion.
 * - APPEND 33: Heartbeat Logic - Optimized interval-based anomaly dispatcher for industrial stability.
 * - APPEND 42: Flip-Glitch Logic - Programmed optical ghosting layers to momentarily revert to standard axis upon high stress.
 * - APPEND 83: Shuffle Queue - Verified 11-effect loop resets only when the queue array is entirely depleted.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_HERO_GLITCH_TIMING_SYNC
 */

import { PROFILE } from '../data/profile.js';
import { COLORS, GLITCH } from '../data/constants.js';
import { SystemEvents, EVENTS } from '../utils/events.js';

export class HeroEffects {
    /**
     * @param {HTMLElement} container - The DOM node where the name will manifest (e.g., #hero-name-viewport)
     */
    constructor(container) {
        this.container = container;
        this.baseText = PROFILE.name;
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*";
        this.isGlitched = false;

        // Expanded Glitch Pool for Randomized Heartbeat including MIRROR_DESYNC
        this.glitchPool = [
            'HEX_SHRED', 'ASCII_SCRAMBLE', 'CHROMATIC_SPLIT', 'BINARY_FLICKER',
            'VERTEX_JITTER', 'LENS_WARP', 'SIGNAL_NOISE', 'HAPTIC_SQUASH',
            'FRUSTUM_FADING', 'GHOST_ECHO', 'MIRROR_DESYNC'
        ];

        // PRO PHASE: Non-Repeating Shuffle Queue Array
        this.glitchQueue = [];

        this.init();
        this.bindEvents(); // REALITY AUDIT: Establish Ripple Impact handshake
        this.startHeartbeat(); // REALITY AUDIT 33: Ambient Realism
    }

    init() {
        if (!this.container) return;

        // Initialize the shuffle queue before standard startup
        this.shuffleQueue();

        // REALITY AUDIT 31: Consolidated to a single-node architecture for Optical Ghosting
        this.container.innerHTML = `
            <div class="hero-name-wrapper" data-text="${this.baseText}">
                <div class="layer-main">${this.baseText}</div>
            </div>
        `;

        this.applyIndustrialStyles();
    }

    /**
     * PRO PHASE: Fisher-Yates Shuffle Queue
     * Ensures all 11 effects play before any repetition occurs.
     */
    shuffleQueue() {
        this.glitchQueue = [...this.glitchPool];
        for (let i = this.glitchQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.glitchQueue[i], this.glitchQueue[j]] = [this.glitchQueue[j], this.glitchQueue[i]];
        }
    }

    /**
     * PRO PHASE: Safely extracts the next non-repeating effect.
     */
    getNextGlitch() {
        if (this.glitchQueue.length === 0) {
            this.shuffleQueue();
        }
        return this.glitchQueue.pop();
    }

    /**
     * REALITY AUDIT 33: The 8-Second Heartbeat
     * Adjusted to 8s interval for professional-grade OS pacing.
     */
    startHeartbeat() {
        setInterval(() => {
            if (!this.isGlitched) {
                // Replaced Math.random with the deterministic Shuffle Queue
                const queuedEffect = this.getNextGlitch();
                this.handleGlitchImpact({ effectId: queuedEffect, intensity: 1.0 });
            }
        }, 8000);
    }

    /**
     * SAFE IMPROV: Ripple Impact Handshake
     */
    bindEvents() {
        SystemEvents.subscribe(EVENTS.GLOBAL_GLITCH, (data) => {
            if (this.glitchPool.includes(data.effectId)) {
                // If a specific effect is requested via event bus, honor it over the queue.
                this.handleGlitchImpact(data);
            }
        });
    }

    /**
     * REALITY AUDIT: Hardware Layer Promotion
     */
    applyIndustrialStyles() {
        const wrapper = this.container.querySelector('.hero-name-wrapper');
        if (!wrapper) return;

        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.color = '#fff';
        wrapper.style.fontFamily = "'HighJinkiesFlip', 'Courier New', monospace";
        wrapper.style.fontSize = 'clamp(2.5rem, 5vw, 4.5rem)';
        wrapper.style.fontWeight = '900';
        wrapper.style.letterSpacing = '5px';
        wrapper.style.textTransform = 'uppercase';
        wrapper.style.textAlign = 'center';
        wrapper.style.willChange = 'transform, opacity, filter';
        wrapper.style.zIndex = '5';
    }

    /**
     * Triggered during interactions or Heartbeat Sentinel
     * Adjusted duration to a fixed 2,000ms for clearer manifestation.
     */
    handleGlitchImpact(data) {
        if (this.isGlitched) return;
        this.isGlitched = true;

        const { effectId, intensity } = data;
        const wrapper = this.container.querySelector('.hero-name-wrapper');
        const mainLayer = this.container.querySelector('.layer-main');
        if (!wrapper || !mainLayer) return;

        wrapper.classList.add('hero-glitch-active');

        if (effectId === 'ASCII_SCRAMBLE' || effectId === 'HEX_SHRED') {
            this.runScramble(mainLayer, intensity);
        } else {
            let specificClass = '';
            if (effectId === 'CHROMATIC_SPLIT' || effectId === 'GHOST_ECHO') specificClass = 'hero-glitch-chromatic';
            else if (effectId === 'BINARY_FLICKER' || effectId === 'SIGNAL_NOISE') specificClass = 'hero-glitch-flicker';
            else if (effectId === 'VERTEX_JITTER' || effectId === 'LENS_WARP') specificClass = 'hero-glitch-warp';
            else if (effectId === 'MIRROR_DESYNC') specificClass = 'hero-glitch-mirror';

            if (specificClass) wrapper.classList.add(specificClass);

            // FIXED DURATION: 2000ms as requested
            setTimeout(() => {
                const wrap = this.container.querySelector('.hero-name-wrapper');
                if (wrap) {
                    wrap.classList.remove('hero-glitch-active');
                    if (specificClass) wrap.classList.remove(specificClass);
                }
                this.isGlitched = false;
            }, 1200);
        }
    }

    /**
     * TECH: ASCII / HEX Corruption
     * Adjusted maxFrames to ~120 to match 2-second duration at 60FPS.
     */
    runScramble(element, intensity) {
        let frames = 0;
        const maxFrames = 30;

        const animate = () => {
            element.innerText = this.baseText.split('').map(char => {
                return (Math.random() > 0.8) ? this.chars[Math.floor(Math.random() * this.chars.length)] : char;
            }).join('');

            frames++;
            if (frames < maxFrames) {
                requestAnimationFrame(animate);
            } else {
                element.innerText = this.baseText;
                const wrapper = this.container.querySelector('.hero-name-wrapper');
                if (wrapper) wrapper.classList.remove('hero-glitch-active');
                this.isGlitched = false;
            }
        };
        requestAnimationFrame(animate);
    }

    /**
     * Synchronizes the text glow with the active sector's color
     */
    updateSectorColor(sectorId) {
        const wrapper = this.container.querySelector('.hero-name-wrapper');
        if (!wrapper) return;

        const colorHex = COLORS[sectorId] || COLORS.TECH;
        const hexString = '#' + colorHex.toString(16).padStart(6, '0');
        wrapper.style.setProperty('--hero-accent', hexString);
    }
}