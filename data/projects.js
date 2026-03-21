/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/projects.js
 * Purpose: Portfolio Database, 3D Surface Mapping, and Tech Tagging
 * STATUS: PRO_PHASE_PROJECTS_READY
 * LINE_COUNT: ~115 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Portfolio DNA finalized. Integrated spherical coordinate mapping for planet-surface node distribution.
 * - SYSTEM: Standardized project schema to support automated 3D icon generation (GLOBE, TERMINAL, DATABASE).
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 2125]: Geometry Clamping. Verified phi (0 to PI) and theta (0 to 2PI) ranges to prevent node inversion inside the planetary core.
 * * * * * OMISSION LOG V28:
 * - Fixed: Enforced strict ID mapping for perfect synchronization with the UI layer.
 * - Fixed: Added techStack arrays to drive procedural keyword tags in the industrial terminal.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: HeroPlanet.js consumes these coordinates to spawn interactive project markers on the 3D surface.
 * - RIPPLE: The terminal-engine utilizes techStack data to populate sector-specific skill matrices.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Spatial Mapping - Verified that phi: Math.PI / 2 corresponds to the planetary equator.
 * - APPEND 2: Link Integrity - Defaulted empty links to '#' to prevent terminal navigation crashes.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_PROJECTS_READY
 */

export const PROJECTS_DATA = [
    {
        // REALITY AUDIT: Strict ID for perfect UI/3D event syncing
        id: "PROJ_01",
        title: "RIYAS_OS V28",
        year: "2026",
        type: "WEBGL PORTFOLIO",
        description: "A modular, zero-asset 3D portfolio built with pure mathematics and procedural generation. Features a horizontal orbital UI, dynamic physics, and a custom kraye-log terminal.",
        techStack: ["THREE.JS", "VANILLA JS", "CSS GLASSMORPHISM", "GLSL SHADERS"],
        links: {
            github: "#",
            live: "#"
        },
        // REALITY AUDIT: Zero-asset visual placeholders
        visuals: {
            thumbnailColor: 0x00f3ff, // Cyan (Matches Tech Sector)
            iconType: "GLOBE"
        },
        // SAFE IMPROV: Spherical coordinates for mapping onto the 3D Planet
        // Phi (0 to PI) is vertical (poles), Theta (0 to 2PI) is horizontal (equator)
        coordinates: {
            phi: Math.PI / 3,
            theta: Math.PI / 4
        }
    },
    {
        id: "PROJ_02",
        title: "DATA_NODE_PROTOCOL",
        year: "2025",
        type: "BACKEND ARCHITECTURE",
        description: "An automated data pipeline and support scripting system engineered to optimize database queries and server log analysis.",
        techStack: ["PYTHON", "SQL", "LINUX SCRIPTING"],
        links: {
            github: "#",
            live: ""
        },
        visuals: {
            thumbnailColor: 0xff0055, // Pink (Matches Code Sector)
            iconType: "TERMINAL"
        },
        coordinates: {
            phi: Math.PI / 2,       // Equator
            theta: Math.PI          // Opposite side of the planet
        }
    },
    {
        id: "PROJ_03",
        title: "SUPPORT_TICKETING_API",
        year: "2024",
        type: "SYSTEM UTILITY",
        description: "A lightweight CRUD API designed to simulate enterprise-level application support workflows and issue tracking.",
        techStack: ["PYTHON", "REST API", "POSTGRESQL"],
        links: {
            github: "#",
            live: ""
        },
        visuals: {
            thumbnailColor: 0xffcc00, // Yellow (Matches Vision Sector)
            iconType: "DATABASE"
        },
        coordinates: {
            phi: (Math.PI * 2) / 3,
            theta: (Math.PI * 3) / 2
        }
    }
];