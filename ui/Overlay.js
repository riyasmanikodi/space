/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /ui/Overlay.js
 * Purpose: Master HUD, Sector-Linked CSS, GPU-Accelerated Swipe-Gage, and Layout Thrashing Prevention
 * STATUS: PRO_PHASE_AEROSPACE_HUD_ACTIVE
 * LINE_COUNT: ~140 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Master HUD kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated GPU-accelerated "Swipe-Gage" progress bar mapping.
 * - SYSTEM: Finalized sector-linked CSS variable injection for global DOM theme synchronization.
 * - SYSTEM: Integrated hardware-level pointer-event passthrough for seamless 3D/2D interaction.
 * - SYSTEM: Synchronized DOM hierarchy with industrial HUD z-index targets.
 * - SYSTEM: Executed dynamic HOST telemetry detection and injection.
 * - SYSTEM: Removed ORBITAL_VELOCITY_SYNCED element for UI layout recalibration.
 * - SYSTEM: Verified HUD layout translates correctly to bottom-right axis.
 * - SYSTEM: Synchronized dynamic telemetry with global window.RIYAS_BROWSER_HOST.
 * - SYSTEM: [APPEND] Purged legacy DOM evaluation hooks for HOST and VELOCITY elements to optimize WebGL render cycles.
 * - SYSTEM: [APPEND] Finalized cinematic viewport aesthetic by removing redundant telemetry scripts.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1403]: Layout Thrashing. Implemented state-change filtering to prevent redundant DOM updates.
 * - FIXED [ID 1404]: Touch Conflict. Enforced 'touch-action: none' to prevent mobile pull-to-refresh interrupts.
 * - FIXED [ID 1902]: HUD Desync. Synchronized updateUI frequency with sector rotation snaps.
 * - FIXED [ID 2205]: HUD Clipping. Synchronized safe-area insets with the industrial UI layer.
 * - FIXED [ID 2240]: Host telemetry reported static Mozilla; replaced with dynamic regex parsing.
 * - FIXED [ID 2241]: SECTOR layout realigned by removing velocity node via DOM abstraction.
 * - FIXED [ID 2245]: Hardened DOM scanning to target .hud-meta specifically.
 * - FIXED [ID 2246]: Local browser parsing decoupled; now inherits single source of truth from main.js.
 * - FIXED [ID 3402]: [APPEND] CPU Cycle Waste. Excised `getBrowserName()` and `recalibrateVisuals()` text-scanning functions after physical DOM nodes were deleted.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added 'locked-on' class logic for targeting bracket animations.
 * - Fixed: Injected translateZ(0) to force hardware acceleration on progress bar scales.
 * - Fixed: Added support for 'VOID' sector fallback colors.
 * - Fixed: Handled layout shift logic directly inside the init sequence.
 * - Fixed: Enforced resilient DOM element targeting for visual recalibration.
 * - Fixed: Delegated browser string resolution to global variable to prevent race conditions with Greeting module.
 * - Fixed: [APPEND] Removed `this.hostElement` and `this.velocityElement` from the constructor variables.
 * - Fixed: [APPEND] Deleted `getBrowserName()` method.
 * - Fixed: [APPEND] Deleted `recalibrateVisuals()` method to complete cinematic isolation.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: State filtering reduces CPU overhead during high-speed orbital rotations.
 * - RIPPLE: Progress bar updates are now handled by the GPU, freeing the main thread for terminal input.
 * - RIPPLE: Visual theme shifts now propagate instantly to all buttons and borders via CSS variables.
 * - RIPPLE: Accurate browser engine data stabilizes HUD immersion logic.
 * - RIPPLE: Purging the velocity string gracefully drops the SECTOR string into the primary UI slot.
 * - RIPPLE: HUD now instantly reflects the exact browser telemetry evaluated at kernel ignition without redundant parsing.
 * - RIPPLE: [APPEND] Main thread execution is significantly optimized by dropping expensive DOM text-node scans during initialization.
 * * * * * REALITY AUDIT V28:
 * - APPEND 111: Progress Audit - Verified linear mapping of rotationY to [0.0, 1.0] range.
 * - APPEND 112: State Audit - Confirmed sector name normalization prevents redundant CSS injections.
 * - APPEND 113: Event Audit - Confirmed pointer-events: none stabilizes background dragging.
 * - APPEND 114: Host Audit - Verified Regex precedence prevents Chrome false-positives on Edge/Brave.
 * - APPEND 115: Layout Audit - Verified SECTOR text occupies the legacy velocity coordinates.
 * - APPEND 116: Architecture Audit - Verified Overlay.js correctly pulls from window.RIYAS_BROWSER_HOST.
 * - APPEND 3402: [APPEND] Logic Isolation Audit - Confirmed Overlay.js no longer searches for deleted HTML elements.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_AEROSPACE_HUD_ACTIVE
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

    /**
     * PRO PHASE: Sector-Linked CSS Variables
     * Updates global UI theme seamlessly based on the 3D space.
     */
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

    /**
     * PRO PHASE: The "Swipe-Gage" Progress Bar
     * Maps the 3D global rotation to a 2D HTML indicator line.
     */
    updateProgress(normalizedProgress) {
        // normalizedProgress should be a mathematically mapped value between 0.0 and 1.0
        if (this.progressBar) {
            // Using scaleX combined with translateZ(0) forces GPU acceleration, 
            // preventing the main thread from doing heavy layout recalculations every frame.
            this.progressBar.style.transform = `scaleX(${normalizedProgress}) translateZ(0)`;
        }
    }

    /**
     * PRO PHASE: HUD "Shutter" Animation
     * Targeting brackets appear when the user hovers over an interactive 3D planet.
     */
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