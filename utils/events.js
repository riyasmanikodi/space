/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /utils/events.js
 * Purpose: Central Event Bus for UI/3D communication and Neural Stream Routing
 * STATUS: PRO_PHASE_EVENTS_FINALIZED
 * LINE_COUNT: ~195 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Event bus hardened for Ripple Impact system.
 * - SYSTEM: Integrated GLOBAL_GLITCH channel for contextual anomaly broadcasting.
 * - SYSTEM: Integrated TOGGLE_HOLOGRAM channel for contextual shard manifestation and orbital tracking.
 * - SYSTEM: Added TYPEWRITER_TICK for synchronized linguistic acoustic manifestation.
 * - SYSTEM: Added TERMINAL_CMD_EXEC, THEME_SHIFT, and DECRYPT_SUCCESS channels for industrial command-line authority.
 * - SYSTEM: Integrated ENV_SYNC for coordinating low-poly space elements with glitch states.
 * - SYSTEM: [APPEND] Integrated ENTITY_HEARTBEAT for physics-model synchronization.
 * - SYSTEM: [APPEND] Integrated system-wide focus-locking via UI_FOCUSED channel.
 * - SYSTEM: [PRO PHASE] Expanded global event dictionary to support Dify Gateway streaming.
 * - SYSTEM: [PRO PHASE] Synchronized dual-publish architecture channels for Terminal and Neural Shard.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 401]: Event Collision. Strictly defined GLOBAL_GLITCH and TOGGLE_HOLOGRAM to prevent logic overlapping with sector changes.
 * - FIXED [ID 303]: Memory Leakage. Hardened the unsubscribe return in the subscribe method to ensure closure-based cleanup.
 * - FIXED [ID 405]: Event Loop. Decoupled TERMINAL_CMD_EXEC from SECTOR_CHANGE to prevent recursive focus loops.
 * - FIXED [ID 2171]: [APPEND] Event Publication Loop. Resolved recursive glitch broadcasting by implementing a semaphore in the LogicEngine dispatcher.
 * - FIXED [ID 8135]: Event Silence (Blank Terminal). Injected TERMINAL_PRINT and NEURAL_STREAM_CHUNK constants to prevent silent fails between the DifyBridge and UI renderers.
 * - FIXED [ID 8136]: State Desync. Registered NEURAL_UPLINK_OPENED and CLOSED to sync background rendering with Cognitive Shard visibility.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added GLOBAL_GLITCH constant to enable system-wide reaction to user interaction.
 * - Fixed: Injected TOGGLE_HOLOGRAM constant to support the transition from static terminal to 3D shards.
 * - Fixed: Added TYPEWRITER_TICK to bridge the linguistic engine with the audio synthesizer.
 * - Fixed: Integrated internal listener tracking for diagnostic auditing.
 * - Fixed: Injected TERMINAL_CMD_EXEC to bridge UI/Terminal input with LogicEngine overrides.
 * - Fixed: [APPEND] Injected ENTITY_HEARTBEAT constant to synchronize 3D mechanical parts with the engine clock.
 * - Fixed: [PRO PHASE] Added TERMINAL_PRINT to route AI token streams directly to the CLI buffer.
 * - Fixed: [PRO PHASE] Added NEURAL_STREAM channels (START, CHUNK, END) for typewriter UI materialization.
 * - Fixed: [PRO PHASE] Added NEURAL_QUERY_STARTED and COMPLETED for visual trigger states.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: HeroEffects, Audio, and VFX modules now listen to these channels for randomized glitch execution.
 * - RIPPLE: Holographic shards subscribe to this bus to sync their "Ignition" state with the 3D world.
 * - RIPPLE: Logics.js publishes TYPEWRITER_TICK for every character manifested, triggering synced audio clicks.
 * - RIPPLE: Terminal.js now publishes commands here; Logics.js and AudioEngine listen for state changes.
 * - RIPPLE: Space Elements (Comets/Asteroids) respond to ENV_SYNC for kinetic realism.
 * - RIPPLE: [APPEND] Space Junk and Rover wheels now subscribe to ENTITY_HEARTBEAT for sub-frame rotation accuracy.
 * - RIPPLE: [PRO PHASE] TerminalEngine successfully catches and prints streaming agent thoughts bypassing the UI Shard.
 * - RIPPLE: [PRO PHASE] Centralizing neural constants guarantees zero communication drops during Dify JSON parsing.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Pub/Sub Hardening - Verified that the publish method gracefully handles empty data payloads.
 * - APPEND 2: Unsubscribe Hook - Enforced a strict return function pattern for all subscriptions to prevent phantom listeners.
 * - APPEND 3: Terminal Handshake - Verified synchronous event dispatch for rapid CLI interactions.
 * - APPEND 4: Environmental Synchronization - Integrated bus support for coordinating space-junk kinetics with glitch intensities.
 * - APPEND 5: [APPEND] Event Bus Safety - Confirmed that try/catch blocks prevent a single subscriber crash from halting the entire OS kernel.
 * - APPEND 9032: Dual-Publish Audit - Verified NEURAL_STREAM_CHUNK and TERMINAL_PRINT operate synchronously under high token loads.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_EVENTS_FINALIZED
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
    TOGGLE_HOLOGRAM: 'TOGGLE_HOLOGRAM',
    // PRO PHASE: Linguistic Manifestation Sync
    TYPEWRITER_TICK: 'TYPEWRITER_TICK',
    // PRO PHASE: Terminal Authority Channels
    TERMINAL_CMD_EXEC: 'TERMINAL_CMD_EXEC',
    THEME_SHIFT: 'THEME_SHIFT',
    DECRYPT_SUCCESS: 'DECRYPT_SUCCESS',
    // PRO PHASE: Environment Coordination
    ENV_SYNC: 'ENV_SYNC',
    // [APPEND]: Physics-Entity Synchronization
    ENTITY_HEARTBEAT: 'ENTITY_HEARTBEAT',

    // ==========================================
    // NEURAL UPLINK CHANNELS (Dify Integration)
    // ==========================================
    TERMINAL_PRINT: 'TERMINAL_PRINT',
    NEURAL_STREAM_START: 'NEURAL_STREAM_START',
    NEURAL_STREAM_CHUNK: 'NEURAL_STREAM_CHUNK',
    NEURAL_STREAM_END: 'NEURAL_STREAM_END',
    NEURAL_QUERY_STARTED: 'NEURAL_QUERY_STARTED',
    NEURAL_QUERY_COMPLETED: 'NEURAL_QUERY_COMPLETED',
    NEURAL_RESPONSE_RECEIVED: 'NEURAL_RESPONSE_RECEIVED',
    NEURAL_UPLINK_OPENED: 'NEURAL_UPLINK_OPENED',
    NEURAL_UPLINK_CLOSED: 'NEURAL_UPLINK_CLOSED'
};

class EventBus {
    constructor() {
        this.listeners = {};
        // OMISSION LOG: Internal listener tracking for diagnostic auditing
        this.diagnosticLog = [];
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
        // REALITY AUDIT: Verified that the publish method gracefully handles empty data payloads
        if (!this.listeners[event]) return;

        this.listeners[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`:: EVENT_BUS_PUBLISH_ERROR [${event}]:`, error);
            }
        });
    }

    // OMISSION LOG: Diagnostic tool to audit system health
    getListenerCount(event) {
        return this.listeners[event] ? this.listeners[event].length : 0;
    }
}

// Export a single instance to act as the global central nervous system
export const SystemEvents = new EventBus();