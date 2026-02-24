/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Input.js
 * Purpose: Global Event Delegation, Device Normalization, and Input Throttling
 */

// ==========================================
// 1. INJECTION: Event Bus Architecture
// Instead of directly calling methods on Logics.js (which causes tight coupling
// and race conditions), we dispatch custom events that Logics.js will listen for.
// ==========================================
export class InputManager {
    constructor() {
        this.isDown = false;
        this.previousX = 0;

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
        // We attach to window to catch fast drags that leave the canvas area

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
        // Using { passive: false } to prevent browser scrolling while dragging the 3D world
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
        // Maps vertical scrolling to horizontal world rotation
        // ==========================================
        window.addEventListener('wheel', (e) => {
            if (e.target.tagName === 'CANVAS') {
                e.preventDefault();
                // Determine dominant scroll direction
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                // Emit as a velocity drag event
                this.emit('dragMove', { velocityX: delta * -0.001 });
            }
        }, { passive: false });
    }

    handleDown(clientX, clientY) {
        this.isDown = true;
        this.previousX = clientX;

        // Emit down event with exact coordinates for Raycasting (Click detection)
        this.emit('inputDown', { x: clientX, y: clientY });
    }

    handleMove(clientX, clientY) {
        // Always emit hover coordinates for UI updates, even if not dragging
        this.emit('inputHover', { x: clientX, y: clientY });

        if (!this.isDown) return;

        // Calculate drag delta
        const deltaX = clientX - this.previousX;
        this.previousX = clientX;

        // Apply device-specific sensitivity and emit the calculated velocity
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