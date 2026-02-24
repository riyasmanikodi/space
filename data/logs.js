/**
 * RIYAS_OS V28 - RIPPLE 0
 * File: /data/logs.js
 * Purpose: Kraye Log Database, Terminal Content, and Historical Records
 */

// ==========================================
// 1. LAZY-LOADING LOG STRUCTURE (Reality Audit)
// Logs are grouped by Sector ID to prevent memory leaks during terminal typing.
// Keys strictly match SECTORS in constants.js.
// ==========================================

export const KRAYE_LOGS = {
    // ==========================================
    // TECH SECTOR: Hub & Core Infrastructure
    // ==========================================
    tech: [
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
    code: [
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
    vision: [
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
    contact: [
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