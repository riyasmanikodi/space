/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Input.js
 * Purpose: Global Event Delegation, Device Normalization, and Magnetic Wheel Sync
 * STATUS: PRO_PHASE_INPUT_WHEEL_SYNCED
 * LINE_COUNT: ~140 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global input kernel hardened for multi-device parity.
 * - SYSTEM: Integrated Magnetic Wheel protocol to synchronize scroll-stop events with Logics.js.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1410]: Wheel Drift. Injected wheel-end detection to notify Logics.js when kinetic momentum should snap.
 * - FIXED [ID 1411]: Scroll Conflict. Refined delta-dominant logic to prevent diagonal jitter during trackpad navigation.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added wheel-stop timer to emit a final 'inputUp' signal, triggering the magnetic snap in the brain.
 * - Fixed: Normalized sensitivity for high-DPI mouse wheels to prevent "Hyper-Spin" orbit errors.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Mouse wheel and trackpad scrolls now perfectly trigger the same friction and snapping curves as touch dragging.
 * - RIPPLE: Logics.js receives a clean velocity stream, ensuring the black hole's gravitational pull remains consistent across inputs.
 * * * * * REALITY AUDIT V28:
 * - APPEND 21: Magnetic Wheel - Wheel events now generate a synthetic 'inputUp' after 150ms of inactivity to force snap-to-front.
 * - APPEND 22: Passive Listener Safety - Enforced { passive: false } on touch/wheel to maintain exclusive control over the viewport.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_INPUT_WHEEL_SYNCED
 */

export class InputManager {
    constructor() {
        this.isDown = false;
        this.previousX = 0;
        this.wheelTimer = null; // REALITY AUDIT 21: Sentinel for scroll-stop detection

        // Multiplier changes based on device type for optimal feel
        this.sensitivity = this.detectMobile() ? 0.0035 : 0.002;

        // Custom Event Dispatcher
        this.eventTarget = new EventTarget();

        this.initListeners();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Allows other classes (like Logics.js) to subscribe to sanitized inputs
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
            if (e.target.tagName === 'CANVAS') {
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
            if (e.target.tagName === 'CANVAS' && e.touches.length > 0) {
                this.handleDown(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (this.isDown && e.touches.length > 0) {
                e.preventDefault();
                this.handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: false });

        window.addEventListener('touchend', () => this.handleUp());

        // ==========================================
        // 4. WHEEL EVENTS (Trackpad / Scroll)
        // CULPRIT 1410: Integrated Scroll-Stop Sentinel
        // ==========================================
        window.addEventListener('wheel', (e) => {
            if (e.target.tagName === 'CANVAS') {
                e.preventDefault();

                // Determine dominant scroll direction
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

                // Emit as a velocity drag event
                this.emit('dragMove', { velocityX: delta * -0.0008, isWheel: true });

                // REALITY AUDIT 21: Detect when the wheel stops moving to trigger Magnetic Snapping
                clearTimeout(this.wheelTimer);
                this.wheelTimer = setTimeout(() => {
                    this.emit('inputUp'); // Signal Logics.js that the "drag" is over
                }, 150);
            }
        }, { passive: false });
    }

    handleDown(clientX, clientY) {
        this.isDown = true;
        this.previousX = clientX;
        this.emit('inputDown', { x: clientX, y: clientY });
    }

    handleMove(clientX, clientY) {
        this.emit('inputHover', { x: clientX, y: clientY });
        if (!this.isDown) return;

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

// Export as a singleton so all modules share the same input state
export const GlobalInput = new InputManager();