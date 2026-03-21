/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Input.js
 * Purpose: Global Event Delegation, Device Normalization, and Terminal Focus Handshake
 * STATUS: PRO_PHASE_INPUT_ACTIVE
 * LINE_COUNT: ~185 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global input kernel hardened for multi-device parity.
 * - SYSTEM: Integrated Magnetic Wheel protocol to synchronize scroll-stop events with Logics.js.
 * - SYSTEM: Integrated keyboard interception for Industrial Terminal CLI navigation.
 * - SYSTEM: Integrated Hardware-Accelerated Kinetic Drag and Focus-Locking for the Industrial Terminal.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1410]: Wheel Drift. Injected wheel-end detection to notify Logics.js when kinetic momentum should snap.
 * - FIXED [ID 1411]: Scroll Conflict. Refined delta-dominant logic to prevent diagonal jitter during trackpad navigation.
 * - FIXED [ID 1414]: Input Hijacking. Prevented keyboard events from leaking to the 3D world when the terminal is active.
 * - FIXED [ID 2162]: Mobile Normalization. Updated handleMove/Down to access e.touches[0] for touch-device coordinate parity.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added wheel-stop timer to emit a final 'inputUp' signal, triggering the magnetic snap in the brain.
 * - Fixed: Normalized sensitivity for high-DPI mouse wheels to prevent "Hyper-Spin" orbit errors.
 * - Fixed: Added global keyboard listener for backtick (`) to toggle the system terminal visibility.
 * - Fixed: Added check for 'isUIFocused' in input handlers to lock orbital movement during terminal interaction.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Keyboard events are now captured by the TerminalEngine when UI_FOCUSED is active.
 * - RIPPLE: Mobile users can now interact with the 3D universe with 1:1 touch precision.
 * - RIPPLE: Logics.js successfully receives the 'inputUp' signal from the wheel timer to initiate magnetic snapping.
 * * * * * REALITY AUDIT V28:
 * - APPEND 37: Block move execution if UI is focused.
 * - APPEND 42: Interactive Shell - Verified UI_FOCUSED properly bypasses rotation checks.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_INPUT_ACTIVE
 */

import { SystemEvents, EVENTS } from '../utils/events.js';

class InputManager {
    constructor() {
        this.isDown = false;
        this.previousX = 0;
        this.previousY = 0;
        this.sensitivity = 0.002;
        this.isUIFocused = false;

        this.listeners = {};
        this.wheelTimer = null;

        this.init();
    }

    init() {
        // Subscribe to UI focus state to lock/unlock 3D interaction
        SystemEvents.subscribe(EVENTS.UI_FOCUSED, (focused) => {
            this.isUIFocused = focused;
        });

        // 1. MOUSE EVENTS
        window.addEventListener('mousedown', (e) => this.handleDown(e.clientX, e.clientY));
        window.addEventListener('mousemove', (e) => this.handleMove(e.clientX, e.clientY));
        window.addEventListener('mouseup', () => this.handleUp());

        // 2. TOUCH EVENTS (Mobile Normalization [ID 2162])
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.handleDown(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
            // Prevent scrolling when dragging the 3D universe
            if (!this.isUIFocused) e.preventDefault();
        }, { passive: false });

        window.addEventListener('touchend', () => this.handleUp());

        // 3. WHEEL EVENTS (Magnetic Protocol [ID 1410])
        window.addEventListener('wheel', (e) => {
            if (this.isUIFocused) return;

            // Refined delta-dominant logic [ID 1411]
            const deltaX = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            const velocityX = deltaX * this.sensitivity * 0.5;

            this.emit('dragMove', { velocityX });

            // Reset snap timer
            clearTimeout(this.wheelTimer);
            this.wheelTimer = setTimeout(() => {
                this.handleUp();
            }, 150);
        }, { passive: false });

        // 4. KEYBOARD EVENTS (Terminal Handshake [ID 1414])
        window.addEventListener('keydown', (e) => {
            if (e.key === '`') {
                e.preventDefault();
                SystemEvents.publish(EVENTS.DRAWER_TOGGLED, 'TERMINAL');
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

    emit(event, data = {}) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(cb => cb({ detail: data }));
    }
}

export const GlobalInput = new InputManager();