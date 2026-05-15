/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/resume.js
 * Purpose: Chronological Timeline, Work History, and Academic Milestones
 * STATUS: PRO_PHASE_RESUME_STABLE
 * LINE_COUNT: ~125 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Chronological DNA finalized. Standardized career milestones for the VISION Satellite orbital track.
 * - SYSTEM: Integrated lazy-loading detail shards to prevent UI thread blocking during high-velocity transitions.
 * - SYSTEM: [APPEND] Synchronized timeline categories with industrial sector identifiers.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1405]: Detail Dropout. Added fallback for corrupt data shards in the detail fetcher.
 * - FIXED [ID 2125]: Temporal Vectoring. Corrected start/end year logic to support 3D node distribution.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added explicit company [SIMULATED] tags for non-active career nodes.
 * - Fixed: Injected dateStandard keys to ensure consistent sorting across the OS timeline.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The VISION Satellite now consumes TIMELINE_DATA to procedurally place interactive history nodes on its ring.
 * - RIPPLE: Detail fetching is isolated to user interaction, maintaining 60FPS during orbital camera pans.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Date Parity - Verified all displayDate strings match dateStandard timestamps.
 * - APPEND 2: Detail Logic - Confirmed that GET_RESUME_DETAILS returns a clean array even for missing IDs.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_RESUME_STABLE
 */

// ==========================================
// 1. SHALLOW TIMELINE DATA (Instant Load)
// Used by the 3D engine to generate nodes on the VISION Satellite ring.
// ==========================================
export const TIMELINE_DATA = [
    {
        id: "EXP_03",
        role: "APPLICATION SUPPORT ENGINEER",
        company: "ACCENTURE",
        category: "SUPPORT",

        // SAFE IMPROV: Timeline Vectoring for 3D placement
        startYear: 2026,
        endYear: 2026,

        // REALITY AUDIT: Bulletproof date formatting
        dateStandard: "2026-02-06",
        displayDate: "FEB 2026 - PRESENT",

        // SAFE IMPROV: Metric-Driven triggers for VFX
        metrics: ["100% System Readiness", "L1/L2 Incident Resolution"]
    },
    {
        id: "EXP_02",
        role: "SYSTEM INTEGRATION & SCRIPTING",
        company: "TECH_NODE [SIMULATED]",
        category: "DEVELOPMENT",
        startYear: 2023,
        endYear: 2025,
        dateStandard: "2023-01-15",
        displayDate: "2023 - 2025",
        metrics: ["99.9% System Uptime", "Automated SQL Pipelines"]
    },
    {
        id: "EXP_01",
        role: "ACADEMIC PROTOCOLS",
        company: "UNIVERSITY",
        category: "ACADEMIC",
        startYear: 2018,
        endYear: 2022,
        dateStandard: "2022-05-01",
        displayDate: "GRADUATED 2022",
        metrics: ["Degree Acquired", "Core Fundamentals Mastered"]
    }
];

// ==========================================
// 2. DEEP DETAILS (Lazy Loaded)
// Only fetched by the UI when a user clicks "Inspect" to prevent frame drops.
// ==========================================
export const GET_RESUME_DETAILS = (id) => {
    const details = {
        "EXP_03": [
            "Preparing for enterprise-level application support workflows.",
            "Utilizing Python, SQL, and Linux for backend troubleshooting and log analysis.",
            "Ensuring seamless communication between development nodes and end-users."
        ],
        "EXP_02": [
            "Engineered lightweight data pipelines to bridge backend logic.",
            "Monitored server health and deployed patch updates via Linux terminals.",
            "Reduced ticket resolution time by standardizing error logs."
        ],
        "EXP_01": [
            "Completed comprehensive academic directives.",
            "Specialized in algorithmic logic, database management, and system architecture."
        ]
    };

    /**
     * CULPRIT FIX [ID 1405]: Detail Dropout
     * Returns a safe fallback message if the requested ID does not exist in the shard.
     */
    return details[id] || ["DATA_SHARD_CORRUPT: NO_DETAILS_FOUND"];
};