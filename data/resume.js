/**
 * RIYAS_OS V28 - RIPPLE 0
 * File: /data/resume.js
 * Purpose: Chronological Timeline, Work History, and Academic Milestones
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
        displayDate: "JAN 2023 - DEC 2025",
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

    return details[id] || ["DATA_NOT_FOUND"];
};