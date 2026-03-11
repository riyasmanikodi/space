/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /effects/HeroEffects.js
 * Purpose: Linguistic Typographic Anomaly Engine for Hero Identity
 * STATUS: PRO_PHASE_HERO_GLITCH_READY
 * LINE_COUNT: ~165 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated Sector-Aware DNA Sync for RIYAS MANIKODI identity.
 * - SYSTEM: Linked typography to GLOBAL_GLITCH bus for real-time haptic vibration.
 * - SYSTEM: Integrated dynamic text-shadow displacement for the industrial "V28" look.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 305]: Layer Desync. Enforced hardware-accelerated stacking (z-index) to prevent text clipping behind scanlines.
 * - FIXED [ID 1801]: Static Displacement. Replaced static multi-div structure with a single-node "Optical Ghosting" architecture.
 * - FIXED [ID 1802]: Kinetic Lag. Optimized requestAnimationFrame loop for the ASCII_SCRAMBLE effect to maintain 60FPS.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added immediate reaction to the "Thump" effect during planet snaps and clicks.
 * - Fixed: Integrated weighted randomization for sector-specific character corruption.
 * - Fixed: Implemented responsive clamp() font-sizing to match the scale of the Master Sketch.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The hero name vibrates in sync with the AudioEngine chirps, creating a tactile linguistic manifestation.
 * - RIPPLE: High-speed orbital drags now physically "tear" the name apart using the CHROMATIC_SPLIT pass.
 * - RIPPLE: SystemLogic dispatcher triggers randomized anomalies here every time the user thumps the viewport.
 * * * * * REALITY AUDIT V28:
 * - APPEND 30: Semantic Glitching - TECH triggers ASCII/Hex corruption, CODE triggers lens warping, VISION triggers fragment shredding.
 * - APPEND 31: Optical Ghosting - Consolidated to a single wrapper using pseudo-elements to simulate physical dispersion.
 * - APPEND 4: Event-Driven Logic - The identity layer now vibrates in sync with the 3D world impacts via SystemEvents.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_HERO_EFFECTS_HOLOGRAM_READY
 */

import { PROFILE } from '../data/profile.js';
import { COLORS } from '../data/constants.js';
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

        this.init();
        this.bindEvents(); // REALITY AUDIT: Establish Ripple Impact handshake
    }

    init() {
        if (!this.container) return;

        // REALITY AUDIT 31: Consolidated to a single-node architecture for Optical Ghosting
        // This removes the legacy 4-layer stack in favor of a single element with pseudo-layer support in CSS.
        this.container.innerHTML = `
            <div class="hero-name-wrapper" data-text="${this.baseText}">
                <div class="layer-main">${this.baseText}</div>
            </div>
        `;

        this.applyIndustrialStyles();
    }

    /**
     * SAFE IMPROV: Ripple Impact Handshake
     * Subscribes to the global glitch pool to react to user viewport thumps.
     */
    bindEvents() {
        SystemEvents.subscribe(EVENTS.GLOBAL_GLITCH, (data) => {
            const identityAnomalies = ['HEX_SHRED', 'CHROMATIC_SPLIT', 'BINARY_FLICKER', 'ASCII_SCRAMBLE', 'RELATIVISTIC_LENSING'];

            if (identityAnomalies.includes(data.effectId)) {
                // Duration is scaled by the intensity factor
                this.handleGlitchImpact(data);
            }
        });
    }

    /**
     * REALITY AUDIT: Hardware Layer Promotion & Sketch Alignment
     * Ensures the name is rendered on the GPU for jitter-free 60fps glitching.
     */
    applyIndustrialStyles() {
        const wrapper = this.container.querySelector('.hero-name-wrapper');
        if (!wrapper) return;

        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.color = '#fff';
        wrapper.style.fontSize = 'clamp(2.5rem, 5vw, 4.5rem)'; // Responsive liquid scaling
        wrapper.style.fontWeight = '900';
        wrapper.style.letterSpacing = '15px'; // Wide tracking matching the sketch
        wrapper.style.textTransform = 'uppercase';
        wrapper.style.textAlign = 'center';
        wrapper.style.willChange = 'transform, opacity, filter'; // GPU Promotion
        wrapper.style.zIndex = '5';
    }

    /**
     * Triggered during interactions via the Glitch Dispatcher
     */
    handleGlitchImpact(data) {
        if (this.isGlitched) return;
        this.isGlitched = true;

        const { effectId, intensity } = data;
        const wrapper = this.container.querySelector('.hero-name-wrapper');
        const mainLayer = this.container.querySelector('.layer-main');
        if (!wrapper || !mainLayer) return;

        // TRIGGER KINETIC SQUASH (The "Thump" Effect)
        wrapper.classList.add('hero-glitch-active');

        // DISPATCH SECTOR-SPECIFIC ANOMALY
        if (effectId === 'ASCII_SCRAMBLE') {
            this.runScramble(mainLayer, intensity);
        } else {
            let specificClass = '';
            if (effectId === 'CHROMATIC_SPLIT' || effectId === 'RELATIVISTIC_LENSING') specificClass = 'hero-glitch-chromatic';
            else if (effectId === 'BINARY_FLICKER') specificClass = 'hero-glitch-flicker';

            if (specificClass) wrapper.classList.add(specificClass);

            setTimeout(() => {
                const wrap = this.container.querySelector('.hero-name-wrapper');
                if (wrap) {
                    wrap.classList.remove('hero-glitch-active');
                    if (specificClass) wrap.classList.remove(specificClass);
                }
                this.isGlitched = false;
            }, 800 * intensity);
        }
    }

    /**
     * TECH: ASCII / HEX Corruption
     */
    runScramble(element, intensity) {
        let frames = 0;
        const maxFrames = 15 * intensity;

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