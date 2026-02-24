/**
 * RIYAS_OS V28 - RIPPLE 0
 * File: /utils/events.js
 * Purpose: Central Event Bus for UI/3D communication
 */

// ==========================================
// 1. SAFE IMPROV: DEDICATED EVENT CHANNELS
// Pre-defining constants prevents typos that could break 
// the communication between the 3D Engine and HTML Interface.
// ==========================================
export const EVENTS = {
    SECTOR_CHANGE: 'SECTOR_CHANGE',
    PROJECT_OPENED: 'PROJECT_OPENED',
    SYSTEM_WARNING: 'SYSTEM_WARNING',
    UI_FOCUSED: 'UI_FOCUSED',
    DRAWER_TOGGLED: 'DRAWER_TOGGLED',
    TERMINAL_CLOSED: 'TERMINAL_CLOSED'
};

class EventBus {
    constructor() {
        this.listeners = {};
    }

    // ==========================================
    // 2. SAFE IMPROV: PUB/SUB ARCHITECTURE
    // Allows the 3D canvas to "publish" a click event that the 
    // HTML slide-up drawer can "subscribe" to.
    // ==========================================
    subscribe(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);

        // ==========================================
        // 3. REALITY AUDIT: PHANTOM LISTENER FIX
        // Returns a strict unsubscribe method. When a floating terminal 
        // is closed, it calls this to detach its listeners, preventing 
        // memory leaks and keeping browser bloat at absolute zero.
        // ==========================================
        return () => this.unsubscribe(event, callback);
    }

    unsubscribe(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    publish(event, data = null) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => callback(data));
    }
}

// Export a single instance to act as the global central nervous system
export const SystemEvents = new EventBus();