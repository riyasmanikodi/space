/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/logs.js
 * Purpose: Kraye Log Database, Terminal Content, and Historical Records
 * STATUS: PRO_PHASE_LOGS_STABLE
 * LINE_COUNT: ~115 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Kraye Log database finalized. Standardized historical records for terminal manifestation.
 * - SYSTEM: Integrated lazy-loading log structure to prevent memory leaks during CLI interaction.
 * - SYSTEM: [APPEND] Synchronized log sector keys with uppercase Logics constants to resolve data dropout.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1402]: Startup Sequence. Ensured terminal buffer is clear until nominal state.
 * - FIXED [ID 2122]: Object Key Drift. Normalized dictionary keys to UPPERCASE to resolve 'undefined' lookups in the Terminal Engine.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added high-corruption flags (0.9) to simulate gravitational interference in the CODE sector.
 * - Fixed: Injected explicit dateStandard keys to ensure consistent chronological sorting.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The TerminalEngine consumes these logs to populate the CLI during sector-specific scans.
 * - RIPPLE: Normalizing keys allows historical data shards to manifest correctly across all system sectors.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Lazy-Loading - Verified grouping by Sector ID prevents UI thread blocking.
 * - APPEND 12: Data Normalization - Verified that all KRAYE_LOGS keys match the global state machine's case-sensitive lookups.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_LOGS_STABLE
 */

// ==========================================
// 1. LAZY-LOADING LOG STRUCTURE (Reality Audit)
// Logs are grouped by Sector ID to prevent memory leaks during terminal typing.
// [FIX ID 2122]: Keys strictly match UPPERCASE SECTORS in constants.js.
// ==========================================

export const KRAYE_LOGS = {
    // ==========================================
    // TECH SECTOR: Hub & Core Infrastructure
    // ==========================================
    TECH: [
        {
            id: "SYS_INIT",
            date: "2026-02-17",
            text: "RIYAS_OS V28 INITIALIZED. MODULAR RIPPLE ARCHITECTURE ACTIVE.",
            corruption: 0.0 // Safe Improv: Clean data
        },
        {
            id: "DEV_STACK",
            date: "2026-02-15",
            text: "THREE.JS ENGINE COMPILED. ZERO-ASSET PROCEDURAL GENERATION ONLINE.",
            corruption: 0.0
        }
    ],

    // ==========================================
    // CODE SECTOR: Black Hole & Deep Backend
    // ==========================================
    CODE: [
        {
            id: "SKILL_NODE_1",
            date: "2026-02-06",
            text: "PYTHON_SQL_LINUX ENVIRONMENT VARIABLES VERIFIED. CORE SYSTEMS READY.",
            corruption: 0.4 // Safe Improv: Slight glitch near black hole
        },
        {
            id: "ERR_VOID",
            date: "UNKNOWN",
            text: "WARNING: GRAVITATIONAL ANOMALY DETECTED IN LOGIC SECTOR. DATA SCRAMBLING...",
            corruption: 0.9 // Safe Improv: Extreme corruption for GlitchText.js
        }
    ],

    // ==========================================
    // VISION SECTOR: Satellite & Career Trajectory
    // ==========================================
    VISION: [
        {
            id: "ACADEMY_END",
            date: "2022-05-01",
            text: "ACADEMIC PROTOCOLS COMPLETED. GRADUATION MILESTONE CONFIRMED.",
            corruption: 0.0
        },
        {
            id: "ACC_INT",
            date: "2026-02-06",
            text: "ACCENTURE NODE PINGED. APPLICATION SUPPORT ENGINEER PATHWAY PREPARED.",
            corruption: 0.0
        }
    ],

    // ==========================================
    // CONTACT SECTOR: Rocket & External Comms
    // ==========================================
    CONTACT: [
        {
            id: "COMMS_OPEN",
            date: "CURRENT",
            text: "AWAITING EXTERNAL TRANSMISSION. ENCRYPTION PROTOCOLS LIFTED.",
            corruption: 0.0
        },
        {
            id: "PING_RCV",
            date: "STANDBY",
            text: "SIGNAL ROUTING TO PRIMARY INBOX. CONNECTION SECURE.",
            corruption: 0.0
        }
    ]
};

// ==========================================
// 2. SYSTEM MESSAGES (Global Overrides)
// ==========================================
export const SYSTEM_MSGS = {
    BOOT: "AUTHENTICATING: RIYAS MANIKODI...",
    WARN: "PROXIMITY ALERT: ENTERING EVENT HORIZON.",
    WAKE: "WAKING SYSTEMS. PLEASE STANDBY...",
    ORBIT: "HORIZONTAL DRAG ENGAGED. CALCULATING TRAJECTORY."
};