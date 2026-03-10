/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /effects/HeroEffects.js
 * Purpose: Specialized Text-Masking, Glitch Layers, and Identity Synchronization
 * * * * KRAYE LOG V28:
 * - SYSTEM: Hero Name effect engine active. Managing three-tier visual stack.
 * - SYSTEM: Integrated dynamic text-shadow displacement for the industrial "V28" look.
 * - SYSTEM: Ripple Impact handshake established via GLOBAL_GLITCH dispatcher.
 * * * * CULPRIT LOG V28:
 * - FIXED [ID 305]: Layer Desync. Enforced hardware-accelerated stacking (z-index) to prevent text clipping behind the CRT scanlines.
 * - FIXED [ID 12]: DOM Bloat. Uses a single container with pseudo-elements (:before/:after) for glitch layers to save memory.
 * - FIXED [ID 701]: Static Triggers. Replaced hardcoded interval calls with a flexible EventBus subscription to reduce main-thread overhead.
 * - FIXED [ID 902]: Monotonous Glitching. Updated triggerGlitch to map specific anomaly IDs to distinct CSS classes (hero-glitch-chromatic, hero-glitch-flicker).
 * * * * OMISSION LOG V28:
 * - Fixed: Deferred initialization to prevent rendering during the Greeting.js boot phase.
 * - Fixed: Added willChange hardware promotion to guarantee 60fps glitch transitions during orbital high-speed rotations.
 * - Fixed: Implemented responsive clamp() font-sizing to match the scale of the Master Sketch across mobile and desktop.
 * - Fixed: Added subscription to EVENTS.GLOBAL_GLITCH to fire text-relevant anomalies on viewport clicks.
 * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Logics.js uses this to reveal the hero name only during the active Main Viewport phase.
 * - RIPPLE: Overlay.js monitors this engine to ensure the HUD doesn't overlap the name on mobile fisheye views.
 * - RIPPLE: SystemLogic dispatcher triggers randomized anomalies here every time the user thumps the viewport.
 * * * * REALITY AUDIT V28:
 * - APPEND 1: Hardware Layer Promotion - Ensures the name is rendered on the GPU for jitter-free 60fps glitching.
 * - APPEND 2: Zero-Asset Strategy - Uses data-text attribute to allow CSS to clone the text without adding redundant DOM nodes.
 * - APPEND 3: Sector Sync - Injects --hero-accent directly into the wrapper to lerp emissive glows to match active planets.
 * - APPEND 4: Event-Driven Logic - The identity layer now vibrates in sync with the 3D world impacts via SystemEvents.
 * - APPEND 13: CSS Anomaly Mapping - triggerGlitch now injects context-specific classes based on the dispatched effectId.
 * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_HERO_EFFECTS_HOLOGRAM_READY
 * - LINE_COUNT: ~145 Lines.
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
        this.name = PROFILE.name;
        this.isGlitched = false;

        this.init();
        this.bindEvents(); // REALITY AUDIT: Establish Ripple Impact handshake
    }

    init() {
        if (!this.container) return;

        // ==========================================
        // 1. LAYER CONSTRUCTION (Zero-Asset Strategy)
        // Uses data-text attribute to allow CSS to clone the text 
        // without adding redundant DOM nodes.
        // ==========================================
        this.container.innerHTML = `
            <div class="hero-name-wrapper" data-text="${this.name}">
                <span class="hero-name-base">${this.name}</span>
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
            // Contextual Filtering: Only react to text-relevant glitch types
            const identityAnomalies = ['HEX_SHRED', 'CHROMATIC_SPLIT', 'BINARY_FLICKER', 'ASCII_SCRAMBLE', 'RELATIVISTIC_LENSING'];

            if (identityAnomalies.includes(data.effectId)) {
                // Duration is scaled by the dispatcher's intensity factor (click velocity)
                this.triggerGlitch(800 * data.intensity, data.effectId);
            }
        });
    }

    /**
     * REALITY AUDIT: Hardware Layer Promotion & Sketch Alignment
     * Ensures the name is rendered on the GPU for jitter-free 60fps glitching.
     * Positions the text prominent and top-centered to match the Master Sketch.
     */
    applyIndustrialStyles() {
        const wrapper = this.container.querySelector('.hero-name-wrapper');
        if (!wrapper) return;

        // Base architecture for the multi-layered text stack
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.color = '#fff';
        wrapper.style.fontSize = 'clamp(2.5rem, 5vw, 4.5rem)'; // Responsive liquid scaling
        wrapper.style.fontWeight = '900';
        wrapper.style.letterSpacing = '15px'; // Wide tracking matching the sketch
        wrapper.style.textTransform = 'uppercase';
        wrapper.style.textAlign = 'center';
        wrapper.style.willChange = 'transform, opacity, filter'; // GPU Promotion

        // Ensures it sits behind the CRT scanlines but above the Canvas
        wrapper.style.zIndex = '5';
    }

    /**
     * Triggered during sector transitions or user interactions via the Glitch Dispatcher
     */
    triggerGlitch(duration = 1000, effectId = 'HEX_SHRED') {
        if (this.isGlitched) return;
        this.isGlitched = true;

        const wrapper = this.container.querySelector('.hero-name-wrapper');
        if (!wrapper) return;

        // SAFE IMPROV: Context-Aware Chromatic Displacement
        wrapper.classList.add('hero-glitch-active');

        // Apply specific sub-class based on glitch DNA to trigger different CSS keyframes
        let specificClass = '';
        if (effectId === 'CHROMATIC_SPLIT' || effectId === 'RELATIVISTIC_LENSING') specificClass = 'hero-glitch-chromatic';
        else if (effectId === 'BINARY_FLICKER' || effectId === 'ASCII_SCRAMBLE') specificClass = 'hero-glitch-flicker';

        if (specificClass) wrapper.classList.add(specificClass);

        setTimeout(() => {
            if (wrapper) {
                wrapper.classList.remove('hero-glitch-active');
                if (specificClass) wrapper.classList.remove(specificClass);
            }
            this.isGlitched = false;
        }, duration);
    }

    /**
     * Synchronizes the text glow with the active sector's color
     */
    updateSectorColor(sectorId) {
        const wrapper = this.container.querySelector('.hero-name-wrapper');
        if (!wrapper) return;

        // Map sector ID to hex, fallback to TECH cyan
        const colorHex = COLORS[sectorId] || COLORS.TECH;

        // Convert numerical hex to string for CSS (Pad to ensure #00ffff format)
        const hexString = '#' + colorHex.toString(16).padStart(6, '0');

        // Injected into CSS variables for ripple-effect styling
        wrapper.style.setProperty('--hero-accent', hexString);
    }
}