/**
 * RIYAS_OS V28 - RIPPLE 4
 * File: /ui/Overlay.js
 * Purpose: Master HUD, Sector-Linked CSS, GPU-Accelerated Swipe-Gage, and Layout Thrashing Prevention
 */

export class Overlay {
    constructor() {
        // DOM Elements
        this.container = document.getElementById('os-hud-container');
        this.sectorTitle = document.getElementById('hud-sector-title');
        this.progressBar = document.getElementById('hud-progress-fill');
        this.targetingBox = document.getElementById('hud-targeting-box');

        // State Tracking (DOM-to-Canvas Sync Lag Fix)
        this.currentSector = null;
        this.isHovering = false;

        // Sector Color Mapping
        this.sectorColors = {
            'TECH': '#00ffff',     // Cyan
            'CODE': '#8a2be2',     // Deep Violet
            'VISION': '#ff1493',   // Deep Pink
            'CONTACT': '#ffaa00',  // Amber
            'VOID': '#ffffff'      // Default Empty Space
        };

        this.init();
    }

    init() {
        // ==========================================
        // REALITY AUDIT: Touch-Event Conflict Fix
        // Prevent mobile pull-to-refresh and accidental swipe conflicts.
        // Z-Index ensures the canvas gets drag events, but UI buttons remain clickable.
        // ==========================================
        if (this.container) {
            this.container.style.touchAction = 'none';
            // Let drags pass through to the WebGL canvas
            this.container.style.pointerEvents = 'none';

            // Note in HTML/CSS: Interactive children (like a menu button) 
            // must explicitly have 'pointer-events: auto' set in their CSS.
        }
    }

    // ==========================================
    // SAFE IMPROV: Sector-Linked CSS Variables
    // Updates global UI theme seamlessly based on the 3D space.
    // ==========================================
    updateSector(sectorName) {
        // ==========================================
        // REALITY AUDIT: DOM-to-Canvas Sync Lag Fix (State-Change Filter)
        // Prevent layout thrashing by only modifying the DOM if the state actually changed.
        // ==========================================
        if (this.currentSector === sectorName) return;
        this.currentSector = sectorName;

        const targetColor = this.sectorColors[sectorName] || this.sectorColors['VOID'];

        // Update Global CSS Variable for buttons, borders, and text glows across the entire DOM
        document.documentElement.style.setProperty('--active-accent', targetColor);

        if (this.sectorTitle) {
            this.sectorTitle.innerText = `SECTOR // ${sectorName}`;

            // Trigger a quick CSS glitch/flash animation on text change
            this.sectorTitle.classList.remove('glitch-anim');
            void this.sectorTitle.offsetWidth; // Force a browser reflow
            this.sectorTitle.classList.add('glitch-anim');
        }
    }

    // ==========================================
    // SAFE IMPROV: The "Swipe-Gage" Progress Bar
    // Maps the 3D global rotation to a 2D HTML indicator line.
    // ==========================================
    updateProgress(normalizedProgress) {
        // normalizedProgress should be a mathematically mapped value between 0.0 and 1.0
        if (this.progressBar) {
            // Using scaleX combined with translateZ(0) forces GPU acceleration, 
            // preventing the main thread from doing heavy layout recalculations every frame.
            this.progressBar.style.transform = `scaleX(${normalizedProgress}) translateZ(0)`;
        }
    }

    // ==========================================
    // SAFE IMPROV: HUD "Shutter" Animation
    // Targeting brackets appear when the user hovers over an interactive 3D planet.
    // ==========================================
    setHoverState(isHovering) {
        // State filter
        if (this.isHovering === isHovering) return;
        this.isHovering = isHovering;

        if (this.targetingBox) {
            if (isHovering) {
                // CSS class scales the brackets inward [   ] -> [ ]
                this.targetingBox.classList.add('locked-on');
                this.targetingBox.style.opacity = '1';
                // Note: Trigger a subtle 'target acquired' sound via AudioEngine here
            } else {
                this.targetingBox.classList.remove('locked-on');
                this.targetingBox.style.opacity = '0';
            }
        }
    }
}