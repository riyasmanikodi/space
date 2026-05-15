/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/GeminiMemory.js
 * Purpose: Persistent Context Buffer and LocalStorage Shard Management
 * STATUS: PRO_PHASE_NEURAL_MEMORY_LOCKED
 * LINE_COUNT: ~75 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Initialized Neural Memory shard for persistent context tracking.
 * - SYSTEM: Integrated localStorage CRUD operations for Zero-Loss recovery.
 * - SYSTEM: Implemented Auto-Truncation to protect browser storage quotas.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 8101]: Memory Overflow. Implemented shift() logic to discard oldest context when history exceeds MAX_CYCLES.
 * - FIXED [ID 8102]: JSON Parse Errors. Hardened payload parsing with try-catch fallback blocks.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected getMemorySize() hook to drive the thermal UI glow.
 * - Fixed: Added clearMemory() protocol for manual cache purging.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Human-AI conversations survive hard page reloads and OS reboots.
 * - RIPPLE: Contextual awareness provides a continuous, intelligent interaction loop.
 * * * * * REALITY AUDIT V28:
 * - APPEND 910: Storage Audit - Verified kraye_neural_history key isolation.
 * - APPEND 911: Formatting Audit - Verified role/text dictionary structure matches Gemini API requirements.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_NEURAL_MEMORY_LOCKED
 */

const STORAGE_KEY = 'kraye_neural_history';
const MAX_CYCLES = 50; // Maximum interaction pairs to retain

class NeuralMemoryManager {
    constructor() {
        this.history = this._loadFromStorage();
    }

    _loadFromStorage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.warn(":: NEURAL_MEMORY_CORRUPTION_DETECTED. FORMATTING_SHARD.");
            return [];
        }
    }

    _saveToStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
        } catch (e) {
            console.error(":: STORAGE_QUOTA_EXCEEDED. UNABLE_TO_SAVE_CONTEXT.");
        }
    }

    addMessage(role, text) {
        this.history.push({
            role: role, // 'user' or 'model'
            parts: [{ text: text }],
            timestamp: Date.now()
        });

        // Auto-Truncation to prevent token overflow
        if (this.history.length > MAX_CYCLES * 2) {
            // Remove the oldest interaction pair
            this.history.splice(0, 2);
        }

        this._saveToStorage();
    }

    getFormattedContext(limit = 10) {
        // Returns the last N messages formatted strictly for the Gemini API history payload
        // Extracts exactly the properties the API expects to prevent validation errors
        const slice = this.history.slice(-limit);
        return slice.map(msg => ({
            role: msg.role,
            parts: msg.parts
        }));
    }

    clearMemory() {
        this.history = [];
        localStorage.removeItem(STORAGE_KEY);
        console.log(":: NEURAL_MEMORY_PURGED");
    }

    getMemorySize() {
        return this.history.length;
    }

    getLastMessage() {
        if (this.history.length === 0) return null;
        return this.history[this.history.length - 1];
    }
}

export const GeminiMemory = new NeuralMemoryManager();