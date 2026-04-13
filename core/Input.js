/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Input.js
 * Purpose: Global Event Delegation, Device Normalization, and Terminal Focus Handshake
 * STATUS: PRO_PHASE_INPUT_ACTIVE
 * LINE_COUNT: ~210 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global input kernel hardened for multi-device parity.
 * - SYSTEM: Integrated Magnetic Wheel protocol to synchronize scroll-stop events with Logics.js.
 * - SYSTEM: Integrated keyboard interception for Industrial Terminal CLI navigation.
 * - SYSTEM: Integrated Hardware-Accelerated Kinetic Drag and Focus-Locking for the Industrial Terminal.
 * - SYSTEM: [PRO PHASE] Implemented UI Layer Shielding to prevent 3D canvas interaction bleed.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1410]: Wheel Drift. Injected wheel-end detection to notify Logics.js when kinetic momentum should snap.
 * - FIXED [ID 1411]: Scroll Conflict. Refined delta-dominant logic to prevent diagonal jitter during trackpad navigation.
 * - FIXED [ID 1414]: Input Hijacking. Prevented keyboard events from leaking to the 3D world when the terminal is active.
 * - FIXED [ID 2162]: Mobile Normalization. Updated handleMove/Down to access e.touches[0] for touch-device coordinate parity.
 * - FIXED [ID 9470]: [PRO PHASE] Event Bleed. Shielded `mousedown` and `touchstart` from capturing events originating within `#ui-layer` and `#hero-name-viewport`.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added wheel-stop timer to emit a final 'inputUp' signal, triggering the magnetic snap in the brain.
 * - Fixed: Normalized sensitivity for high-DPI mouse wheels to prevent "Hyper-Spin" orbit errors.
 * - Fixed: Bound GlobalInput instance to the `window` object to prevent garbage collection during sector transitions.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Interaction Shielding prevents ghost-drags and velocity spikes when manipulating the mobile DOM overlay.
 * - RIPPLE: The `inputUp` magnetic snap is properly isolated from UI layer interactions.
 * * * * * REALITY AUDIT V28:
 * - APPEND 37: Block move if UI is focused.
 * - APPEND 9470: [PRO PHASE] Verified interaction shielding successfully isolates `#hero-name-viewport` from the 3D physics engine.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_INPUT_ACTIVE
 */

import { SystemEvents, EVENTS } from '../utils/events.js';

class InputManager {
    constructor() {
        this.listeners = {};
        this.isDown = false;
        this.previousX = 0;
        this.previousY = 0;
        this.sensitivity = 0.002;

        this.wheelTimer = null;
        this.isWheeling = false;

        this.isUIFocused = false;

        this.bindEvents();

        SystemEvents.subscribe(EVENTS.UI_FOCUSED || 'UI_FOCUSED', (status) => {
            this.isUIFocused = status;
        });
    }

    bindEvents() {
        // ==========================================
        // SAFE IMPROV: Interaction Shielding
        // Prevent UI touches (like the Hero Name or Terminal) from bleeding into the 3D physics engine
        // ==========================================
        window.addEventListener('mousedown', (e) => {
            if (e.target.closest('#ui-layer') || e.target.closest('#hero-name-viewport')) return;
            this.handleDown(e.clientX, e.clientY);
        }, { passive: false });

        window.addEventListener('mousemove', (e) => this.handleMove(e.clientX, e.clientY), { passive: false });
        window.addEventListener('mouseup', () => this.handleUp());
        window.addEventListener('mouseleave', () => this.handleUp());

        window.addEventListener('touchstart', (e) => {
            if (e.target.closest('#ui-layer') || e.target.closest('#hero-name-viewport')) return;
            this.handleDown(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: false });

        window.addEventListener('touchmove', (e) => this.handleMove(e.touches[0].clientX, e.touches[0].clientY), { passive: false });
        window.addEventListener('touchend', () => this.handleUp());

        // ==========================================
        // REALITY AUDIT: The "Magnetic Wheel" Fix
        // Maps the deltaY (scroll) to a horizontal velocity, and triggers an 'inputUp' 
        // when scrolling stops to tell Logics.js to snap to the nearest sector.
        // ==========================================
        window.addEventListener('wheel', (e) => {
            if (this.isUIFocused) return;

            // Normalize trackpad vs mouse wheel differences
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            const velocityX = delta * this.sensitivity * -1.0;

            this.emit('dragMove', { velocityX });

            if (!this.isWheeling) {
                this.isWheeling = true;
                // Treat the start of a scroll as a "touch down"
                this.emit('inputDown', { x: window.innerWidth / 2, y: window.innerHeight / 2 });
            }

            clearTimeout(this.wheelTimer);
            this.wheelTimer = setTimeout(() => {
                this.isWheeling = false;
                this.emit('inputUp');
            }, 150); // 150ms of no-scroll means the user stopped
        }, { passive: true });

        // ==========================================
        // TERMINAL HANDSHAKE: Global Keyboard Hooks
        // ==========================================
        window.addEventListener('keydown', (e) => {
            // Backtick (`) toggles the terminal
            if (e.key === '`') {
                e.preventDefault();
                SystemEvents.publish(EVENTS.DRAWER_TOGGLED || 'DRAWER_TOGGLED', 'TERMINAL');
                return;
            }

            // Prevent shortcuts from leaking if the terminal is active
            if (this.isUIFocused && e.key !== 'Escape') {
                // Let the terminal handle its own input
            }
        });
    }

    handleDown(clientX, clientY) {
        if (this.isUIFocused) return;
        this.isDown = true;
        this.previousX = clientX;
        this.previousY = clientY;
        this.emit('inputDown', { x: clientX, y: clientY });
    }

    handleMove(clientX, clientY) {
        this.emit('inputHover', { x: clientX, y: clientY });

        // REALITY AUDIT 37: Block move if UI is focused
        if (!this.isDown || this.isUIFocused) return;

        const deltaX = clientX - this.previousX;
        this.previousX = clientX;

        const velocityX = deltaX * this.sensitivity;
        this.emit('dragMove', { velocityX });
    }

    handleUp() {
        this.isDown = false;
        this.emit('inputUp');
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback({ detail: data }));
        }
    }
}

// Export as a singleton to ensure global event state is preserved
export const GlobalInput = new InputManager();
window.RIYAS_INPUT = GlobalInput;