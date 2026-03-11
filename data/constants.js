/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/constants.js
 * Purpose: Global DNA, Liquid Scaling, Physics Rules, and Glitch Registry
 * STATUS: PRO_PHASE_CONSTANTS_HOLOGRAM_ACTIVE
 * LINE_COUNT: ~145 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global DNA registry finalized. Unified sector mapping and brand color-space established. [cite: 38]
 * - SYSTEM: Glitch DNA pool integrated into the master registry for weighted interaction response. [cite: 39]
 * - SYSTEM: Integrated Holographic UI offsets and explicit camera zoom radius constants. [cite: 40]
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 05]: Angle Offset Jitter. Enforced strict radians for sector distribution. [cite: 9]
 * - FIXED [ID 202]: Color Space Delta. Swapped legacy hex strings for numeric values. [cite: 10]
 * - FIXED [ID 901]: Monotonous Glitching. Injected isolated effect IDs to support weighted randomization across sectors. [cite: 10, 11]
 * - FIXED [ID 1403]: Magic Numbers. Abstracted hardcoded zoom vectors and UI padding into global constants. [cite: 11, 12]
 * * * * * OMISSION LOG V28:
 * - Fixed: Bridged SECTORS object to HeroEffects engine for brand-synced text-glow logic. [cite: 77]
 * - Fixed: Injected WRAP_LIMIT logic to neutralize WebGL floating-point jitter. [cite: 78]
 * - Fixed: Added GLITCH registry to centralize interaction-driven anomaly IDs for the Ripple Impact system. [cite: 79]
 * - Fixed: Added ZOOM_RADIUS and HOLOGRAM_OFFSET to coordinate 3D and 2D spatial alignment. [cite: 80]
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: All procedural world shards depend on these physics weights for kinetic fluidity. [cite: 145]
 * - RIPPLE: utils/logics.js consumes GLITCH constants to calculate weighted probabilities based on active sector gravity. [cite: 146]
 * - RIPPLE: Logics.js consumes ZOOM_RADIUS to ensure the camera never clips through the planet meshes. [cite: 147]
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Circular Wraparound - WRAP_LIMIT enforced at 2PI to prevent coordinate snapping. [cite: 109]
 * - APPEND 2: Liquid Scaling - Adaptive BASE_RADIUS for mobile fisheye optimization. [cite: 110]
 * - APPEND 3: Contextual Weighting - Anomaly IDs defined to support sector-specific probability matrices. [cite: 111]
 * - APPEND 4: Frustum Safety - Camera lock distance standardized to prevent near-plane clipping during hologram projection. [cite: 112]
 */

// ==========================================
// 1. SYSTEM CONFIGURATION
// ==========================================
export const SYSTEM = {
    VERSION: "28.0.0_MODULAR",
    AUTHOR: "RIYAS MANIKODI",
    DEBUG_MODE: true
};

// ==========================================
// 2. CYBERPUNK COLOR PALETTE (CULPRIT 202)
// Numeric values required for THREE.Color() processing
// ==========================================
export const COLORS = {
    TECH: 0x00f3ff,     // Cyan Hub
    CODE: 0xff0055,     // Pink Black Hole
    VISION: 0xffcc00,   // Yellow Satellite
    CONTACT: 0x0aff0a,  // Matrix Green Rocket
    BG: 0x050508,       // Deep Space Void
    UI_GLASS: "rgba(10, 15, 25, 0.7)"
};

// ==========================================
// 3. ORBITAL MECHANICS & REALITY AUDIT
// ==========================================
const isMobile = window.innerWidth < 768;

export const ORBIT = {
    // REALITY AUDIT 2: Adaptive BASE_RADIUS for mobile fisheye optimization
    BASE_RADIUS: isMobile ? 6 : 12,

    // Reality Audit: Prevent ultra-wide monitors from breaking the composition
    MAX_ORBIT_WIDTH: 18,

    // Physics Weight (Normalized to 60fps) (RIPPLE EFFECT)
    DRAG_SENSITIVITY: 0.002,
    DAMPING: 0.05,
    AUTO_ROTATE_SPEED: 0.001,

    // REALITY AUDIT 1 & OMISSION 78: Reset math at 2PI to prevent coordinate snapping
    WRAP_LIMIT: Math.PI * 2,

    // REALITY AUDIT 4 & RIPPLE 147: Camera lock distance to prevent near-plane clipping
    ZOOM_RADIUS: 75
};

// ==========================================
// 4. SECTOR METADATA MAPPING (CULPRIT 05)
// Maps directly to the sketch. angleOffset DETERMINES strictly defined radians.
// ==========================================
export const SECTORS = {
    TECH: {
        id: "tech",
        name: "TECH_CORE",
        type: "HUB",
        color: COLORS.TECH,
        angleOffset: 0 // Center/Front
    },
    CODE: {
        id: "code",
        name: "CODE_BASE",
        type: "BLACK_HOLE",
        color: COLORS.CODE,
        angleOffset: Math.PI / 2 // 90 degrees (Left)
    },
    VISION: {
        id: "vision",
        name: "VISION_SAT",
        type: "SATELLITE",
        color: COLORS.VISION,
        angleOffset: Math.PI // 180 degrees (Back)
    },
    CONTACT: {
        id: "contact",
        name: "COMM_LINK",
        type: "ROCKET",
        color: COLORS.CONTACT,
        angleOffset: (Math.PI * 3) / 2 // 270 degrees (Right)
    }
};

// ==========================================
// 5. GLITCH EFFECT REGISTRY (OMISSION 79 / CULPRIT 901)
// Standardized IDs for weighted randomization across sectors
// ==========================================
export const GLITCH = {
    HEX_SHRED: 'HEX_SHRED',
    BINARY_FLICKER: 'BINARY_FLICKER',
    CHROMATIC_SPLIT: 'CHROMATIC_SPLIT',
    VERTEX_JITTER: 'VERTEX_JITTER',
    RELATIVISTIC_LENSING: 'RELATIVISTIC_LENSING', // Sector CODE bias
    ASCII_SCRAMBLE: 'ASCII_SCRAMBLE',
    SHADOW_BANDING: 'SHADOW_BANDING',
    HAPTIC_SQUASH: 'HAPTIC_SQUASH',
    REPULSION_PULSE: 'REPULSION_PULSE',
    FRUSTUM_FADING: 'FRUSTUM_FADING'
};

// ==========================================
// 6. VIEWPORT BREAKPOINTS & HOLOGRAM DATA (OMISSION 80)
// ==========================================
export const UI = {
    MOBILE_BREAKPOINT: 768,
    FISHEYE_STRENGTH: 1.8, // REALITY AUDIT 2: Camera distortion multiplier

    // OMISSION 80: Distance the shards float away from the center anchor
    HOLOGRAM_OFFSET: 120
};