/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/profile.js
 * Purpose: Core Identity, Skill Quantization, and Bio Data Bursts
 * STATUS: PRO_PHASE_PROFILE_HOLOGRAM_READY
 * LINE_COUNT: ~120 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Core identity registry active. Centralizing identity DNA for the OS.
 * - SYSTEM: Identity DNA synchronized with Holographic Projection matrix for shard distribution.
 * - SYSTEM: [APPEND] Synchronized skill sector keys with uppercase Logics constants to resolve data-shard dropout.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 01]: Identity Desync. Enforced strict constant for PROFILE.name to prevent naming drift in HeroEffects.
 * - FIXED [ID 09]: Avatar Stall. Implemented Zero-Asset fallback to prevent engine hang on missing local JPGs.
 * - FIXED [ID 2123]: Skill Shard Parity. Normalized dictionary keys to UPPERCASE to resolve 'undefined' lookups in Logics.js.
 * * * * * OMISSION LOG V28:
 * - Fixed: Integrated high-fidelity taglines for the Typewriter linguistic engine.
 * - Fixed: Quantized skill levels and bio bursts to drive procedural vertex heights and holographic data shards.
 * - Fixed: Normalized skill sector identifiers to prevent holographic data dropout during sector focus events.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: HeroEffects.js consumes PROFILE.name to build the 3-layer industrial text stack.
 * - RIPPLE: Logics.js and hologram-viewport consume this DNA to populate the 3D orbital HUD shards.
 * - RIPPLE: Normalizing keys allows the Skill Shard in the holographic viewport to manifest accurate data levels.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Identity Isolation - Verified Hero Name string is the authoritative source for the Main Viewport.
 * - APPEND 2: Zero-Asset Strategy - Avatar seed set to 42 for deterministic geometric synthesis.
 * - APPEND 10: Shard Distribution - Verified data structures for Identity, Diagnostic, and Skill shards.
 * - APPEND 11: Data Normalization - Verified that skills object keys match the global state machine's case-sensitive lookups.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_PROFILE_HOLOGRAM_READY
 */

export const PROFILE = {
    // ==========================================
    // 1. CORE IDENTITY
    // ==========================================
    name: "RIYAS MANIKODI",

    // Safe Improv: Dynamic taglines for the UI Typewriter effect
    taglines: [
        "APPLICATION SUPPORT ENGINEER",
        "THREE.JS & WEBGL DEVELOPER",
        "PYTHON / SQL / LINUX",
        "SYSTEM ARCHITECT"
    ],

    // ==========================================
    // 2. REALITY AUDIT: ZERO-ASSET AVATAR
    // Ensures the 3D engine doesn't hang looking for an image file
    // ==========================================
    avatar: {
        useImage: false, // Set to true only if you upload a .jpg later
        imagePath: "./assets/profile.jpg",
        proceduralSeed: 42, // Math seed for generating a geometric avatar
        fallbackColor: 0x00f3ff // Matches TECH sector cyan
    },

    // ==========================================
    // 3. REALITY AUDIT: BIO DATA BURSTS
    // Short strings to prevent UI thread blocking during animations
    // ==========================================
    bio: [
        "ACADEMIC DIRECTIVES COMPLETED: 2022.",
        "MASTER BLUEPRINT: PROJECT RIYAS_OS V28 INITIALIZED.",
        "CURRENT TRAJECTORY: APPLICATION SUPPORT ENGINEER (ACCENTURE NODE).",
        "SPECIALTY: BRIDGING BACKEND LOGIC WITH PROCEDURAL 3D ENVIRONMENTS."
    ],

    // ==========================================
    // 4. SAFE IMPROV: SKILL QUANTIZATION & SECTOR AFFILIATION (CULPRIT 2123)
    // Keys normalized to UPPERCASE to match Logics.js authority IDs
    // ==========================================
    skills: {
        // Linked to the HUB planet (TECH_CORE)
        TECH: [
            { name: "THREE.JS", level: 0.90 },
            { name: "WEB DEVELOPMENT", level: 0.85 },
            { name: "VANILLA JS", level: 0.88 },
            { name: "MODULAR ARCHITECTURE", level: 0.80 }
        ],
        // Linked to the BLACK HOLE planet (CODE_BASE)
        CODE: [
            { name: "PYTHON", level: 0.85 },
            { name: "SQL", level: 0.80 },
            { name: "LINUX", level: 0.75 }
        ],
        // Linked to the SATELLITE (VISION_SAT)
        VISION: [
            { name: "APPLICATION SUPPORT", level: 0.90 },
            { name: "TROUBLESHOOTING", level: 0.85 },
            { name: "SYSTEM OPTIMIZATION", level: 0.80 }
        ]
    }
};