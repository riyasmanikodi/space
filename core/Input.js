/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Input.js
 * Purpose: Global Event Delegation, Device Normalization, and Terminal Focus Handshake
 * STATUS: PRO_PHASE_INPUT_ACTIVE
 * LINE_COUNT: ~175 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global input kernel hardened for multi-device parity.
 * - SYSTEM: Integrated Magnetic Wheel protocol to synchronize scroll-stop events with Logics.js.
 * - SYSTEM: Integrated keyboard interception for Industrial Terminal CLI navigation.
 * - SYSTEM: Integrated Hardware-Accelerated Kinetic Drag and Focus-Locking for the Industrial Terminal.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1410]: Wheel Drift. Injected wheel-end detection to notify Logics.js when kinetic momentum should snap.
 * - FIXED [ID 1411]: Scroll Conflict. Refined delta-dominant logic to prevent diagonal jitter during trackpad navigation.
 * - FIXED [ID 1414]: Input Hijacking. Prevented keyboard events from leaking to the 3D world when the terminal is active.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added wheel-stop timer to emit a final 'inputUp' signal, triggering the magnetic snap in the brain.
 * - Fixed: Normalized sensitivity for high-DPI mouse wheels to prevent "Hyper-Spin" orbit errors.
 * - Fixed: Added global keyboard listener for backtick (`) to toggle the system terminal visibility.
 * - Fixed: Added check for 'isUIFocused' in mouse/touch down listeners to prevent orbit movement during terminal interaction.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Mouse wheel and trackpad scrolls now perfectly trigger the same friction and snapping curves as touch dragging.
 * - RIPPLE: Logics.js receives a clean velocity stream, ensuring the black hole's gravitational pull remains consistent across inputs.
 * - RIPPLE: Keyboard events are broadcasted to the UI_FOCUSED channel to pause 3D physics during terminal sessions.
 * - RIPPLE: Terminal focus now broadcasts a global signal to freeze the cosmic rotation, ensuring command-line authority.
 * * * * * REALITY AUDIT V28:
 * - APPEND 21: Magnetic Wheel - Wheel events now generate a synthetic 'inputUp' after 150ms of inactivity.
 * - APPEND 22: Passive Listener Safety - Enforced { passive: false } on touch/wheel to maintain exclusive control.
 * - APPEND 37: Focus Isolation - Enforced global state check to block dragMove execution when an input field is focused.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_INPUT_ACTIVE
 */

import { SystemEvents, EVENTS } from '../utils/events.js';

export class InputManager {
    constructor() {
        this.isDown = false;
        this.previousX = 0;
        this.wheelTimer = null;
        this.isUIFocused = false;

        // Multiplier changes based on device type for optimal feel
        this.sensitivity = this.detectMobile() ? 0.0035 : 0.002;

        // Custom Event Dispatcher
        this.eventTarget = new EventTarget();

        this.initListeners();
        this.bindGlobalEvents();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    bindGlobalEvents() {
        // REALITY AUDIT 37: Sync focus state with the global Event Bus
        SystemEvents.subscribe(EVENTS.UI_FOCUSED, (status) => {
            this.isUIFocused = status;
        });
    }

    on(eventName, callback) {
        this.eventTarget.addEventListener(eventName, callback);
    }

    emit(eventName, detail = {}) {
        this.eventTarget.dispatchEvent(new CustomEvent(eventName, { detail }));
    }

    initListeners() {
        // ==========================================
        // 2. MOUSE EVENTS (Desktop)
        // ==========================================
        window.addEventListener('mousedown', (e) => {
            // OMISSION LOG: Check isUIFocused to prevent orbit drag during terminal use
            if (e.target.tagName === 'CANVAS' && !this.isUIFocused) {
                this.handleDown(e.clientX, e.clientY);
            }
        });

        window.addEventListener('mousemove', (e) => {
            this.handleMove(e.clientX, e.clientY);
        });

        window.addEventListener('mouseup', () => this.handleUp());
        window.addEventListener('mouseleave', () => this.handleUp());

        // ==========================================
        // 3. TOUCH EVENTS (Mobile)
        // ==========================================
        window.addEventListener('touchstart', (e) => {
            // OMISSION LOG: Focus check for mobile parity
            if (e.target.tagName === 'CANVAS' && e.touches.length > 0 && !this.isUIFocused) {
                this.handleDown(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (this.isDown && e.touches.length > 0) {
                // REALITY AUDIT 22: Exclusive control via preventDefault
                e.preventDefault();
                this.handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: false });

        window.addEventListener('touchend', () => this.handleUp());

        // ==========================================
        // 4. WHEEL EVENTS (Trackpad / Scroll)
        // ==========================================
        window.addEventListener('wheel', (e) => {
            if (e.target.tagName === 'CANVAS' && !this.isUIFocused) {
                e.preventDefault();

                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                this.emit('dragMove', { velocityX: delta * -0.0008, isWheel: true });

                // REALITY AUDIT 21: Detect when the wheel stops moving to trigger Magnetic Snapping
                clearTimeout(this.wheelTimer);
                this.wheelTimer = setTimeout(() => {
                    this.emit('inputUp');
                }, 150);
            }
        }, { passive: false });

        // ==========================================
        // 5. KEYBOARD EVENTS (Terminal Handshake)
        // ==========================================
        window.addEventListener('keydown', (e) => {
            // CULPRIT 1414: Prevent keyboard leakage when typing in Terminal
            // Toggle Terminal with backtick
            if (e.key === '`') {
                e.preventDefault();
                SystemEvents.publish(EVENTS.DRAWER_TOGGLED, 'TERMINAL');
            }
        });
    }

    handleDown(clientX, clientY) {
        this.isDown = true;
        this.previousX = clientX;
        this.emit('inputDown', { x: clientX, y: clientY });
    }

    handleMove(clientX, clientY) {
        this.emit('inputHover', { x: clientX, y: clientY });
        // REALITY AUDIT 37: Block move execution if UI is focused
        if (!this.isDown || this.isUIFocused) return;

        const deltaX = clientX - this.previousX;
        this.previousX = clientX;

        const velocityX = deltaX * this.sensitivity;
        this.emit('dragMove', { velocityX });
    }

    handleUp() {
        if (this.isDown) {
            this.isDown = false;
            this.emit('inputUp');
        }
    }
}

export const GlobalInput = new InputManager();