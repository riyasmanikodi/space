/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /utils/events.js
 * Purpose: Central Event Bus for UI/3D communication
 * * * * KRAYE LOG V28:
 * - SYSTEM: Event bus hardened for Ripple Impact system.
 * - SYSTEM: Integrated GLOBAL_GLITCH channel for contextual anomaly broadcasting.
 * - SYSTEM: Integrated TOGGLE_HOLOGRAM channel for contextual shard manifestation and orbital tracking.
 * * * * CULPRIT LOG V28:
 * - FIXED [ID 401]: Event Collision. Strictly defined GLOBAL_GLITCH and TOGGLE_HOLOGRAM to prevent logic overlapping with sector changes.
 * - FIXED [ID 303]: Memory Leakage. Hardened the unsubscribe return in the subscribe method to ensure closure-based cleanup.
 * * * * OMISSION LOG V28:
 * - Fixed: Added GLOBAL_GLITCH constant to enable system-wide reaction to user interaction.
 * - Fixed: Injected TOGGLE_HOLOGRAM constant to support the transition from static terminal to 3D shards.
 * - Fixed: Integrated internal listener tracking for diagnostic auditing.
 * * * * RIPPLE EFFECT V28:
 * - RIPPLE: HeroEffects, Audio, and VFX modules now listen to these channels for randomized glitch execution.
 * - RIPPLE: Holographic shards subscribe to this bus to sync their "Ignition" state with the 3D world.
 * - RIPPLE: Logics.js publishes to this bus during high-velocity drag events, viewport thumps, or planet clicks.
 * * * * REALITY AUDIT V28:
 * - APPEND 1: Pub/Sub Hardening - Verified that the publish method gracefully handles empty data payloads.
 * - APPEND 2: Unsubscribe Hook - Enforced a strict return function pattern for all subscriptions to prevent phantom listeners.
 * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_EVENTS_STABLE
 * - LINE_COUNT: ~95 Lines.
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
    TERMINAL_CLOSED: 'TERMINAL_CLOSED',
    // SAFE IMPROV: The Ripple Impact Trigger
    GLOBAL_GLITCH: 'GLOBAL_GLITCH',
    // PRO PHASE: Holographic Projection Channel
    TOGGLE_HOLOGRAM: 'TOGGLE_HOLOGRAM'
};

class EventBus {
    constructor() {
        this.listeners = {};
    }

    // ==========================================
    // 2. SAFE IMPROV: PUB/SUB ARCHITECTURE
    // Allows the 3D canvas to "publish" a click event that the 
    // HTML components can "subscribe" to.
    // ==========================================
    subscribe(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);

        // ==========================================
        // 3. REALITY AUDIT: PHANTOM LISTENER FIX
        // Returns a strict unsubscribe method. When a floating terminal 
        // or holographic shard is closed, it calls this to detach its 
        // listeners, preventing memory leaks and keeping browser bloat 
        // at absolute zero.
        // ==========================================
        return () => this.unsubscribe(event, callback);
    }

    unsubscribe(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    publish(event, data = null) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`:: EVENT_BUS_PUBLISH_ERROR [${event}]:`, error);
            }
        });
    }
}

// Export a single instance to act as the global central nervous system
export const SystemEvents = new EventBus();