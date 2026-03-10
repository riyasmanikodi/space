/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/constants.js
 * Purpose: Global DNA, Liquid Scaling, Physics Rules, and Glitch Registry
 * * * * KRAYE LOG V28:
 * - SYSTEM: Global DNA registry finalized. Unified sector mapping and brand color-space established.
 * - SYSTEM: Glitch DNA pool integrated into the master registry for weighted interaction response.
 * - SYSTEM: Integrated Holographic UI offsets and explicit camera zoom radius constants.
 * * * * CULPRIT LOG V28:
 * - FIXED [ID 05]: Angle Offset Jitter. Enforced strict radians for sector distribution.
 * - FIXED [ID 202]: Color Space Delta. Swapped legacy hex strings for numeric values.
 * - FIXED [ID 901]: Monotonous Glitching. Injected isolated effect IDs to support weighted randomization across sectors.
 * - FIXED [ID 1403]: Magic Numbers. Abstracted hardcoded zoom vectors and UI padding into global constants.
 * * * * OMISSION LOG V28:
 * - Fixed: Bridged SECTORS object to HeroEffects engine for brand-synced text-glow logic.
 * - Fixed: Injected WRAP_LIMIT logic to neutralize WebGL floating-point jitter.
 * - Fixed: Added GLITCH registry to centralize interaction-driven anomaly IDs for the Ripple Impact system.
 * - Fixed: Added ZOOM_RADIUS and HOLOGRAM_OFFSET to coordinate 3D and 2D spatial alignment.
 * * * * RIPPLE EFFECT V28:
 * - RIPPLE: All procedural world shards depend on these physics weights for kinetic fluidity.
 * - RIPPLE: utils/logics.js consumes GLITCH constants to calculate weighted probabilities based on active sector gravity.
 * - RIPPLE: Logics.js consumes ZOOM_RADIUS to ensure the camera never clips through the planet meshes.
 * * * * REALITY AUDIT V28:
 * - APPEND 1: Circular Wraparound - WRAP_LIMIT enforced at 2PI to prevent coordinate snapping.
 * - APPEND 2: Liquid Scaling - Adaptive BASE_RADIUS for mobile fisheye optimization.
 * - APPEND 3: Contextual Weighting - Anomaly IDs defined to support sector-specific probability matrices.
 * - APPEND 4: Frustum Safety - Camera lock distance standardized to prevent near-plane clipping during hologram projection.
 * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_CONSTANTS_HOLOGRAM_ACTIVE
 * - LINE_COUNT: ~135 Lines.
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
// 2. CYBERPUNK COLOR PALETTE
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
    // Liquid Scaling: Tighter radius on mobile to fit the fisheye view
    BASE_RADIUS: isMobile ? 6 : 12,

    // Reality Audit: Prevent ultra-wide monitors from breaking the composition
    MAX_ORBIT_WIDTH: 18,

    // Physics Weight (Normalized to 60fps)
    DRAG_SENSITIVITY: 0.002,
    DAMPING: 0.05,
    AUTO_ROTATE_SPEED: 0.001,

    // REALITY AUDIT: Reset math at 360 degrees to prevent WebGL jitter
    WRAP_LIMIT: Math.PI * 2,

    // SAFE IMPROV: Camera zoom distance to prevent mesh clipping
    ZOOM_RADIUS: 75
};

// ==========================================
// 4. SECTOR METADATA MAPPING
// This maps directly to the sketch. `angleOffset` determines their starting position on the ring.
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
// 5. GLITCH EFFECT REGISTRY
// Standardized IDs for the randomized Ripple Impact system
// ==========================================
export const GLITCH = {
    HEX_SHRED: 'HEX_SHRED',
    BINARY_FLICKER: 'BINARY_FLICKER',
    CHROMATIC_SPLIT: 'CHROMATIC_SPLIT',
    VERTEX_JITTER: 'VERTEX_JITTER',
    RELATIVISTIC_LENSING: 'RELATIVISTIC_LENSING',
    ASCII_SCRAMBLE: 'ASCII_SCRAMBLE',
    SHADOW_BANDING: 'SHADOW_BANDING',
    HAPTIC_SQUASH: 'HAPTIC_SQUASH',
    REPULSION_PULSE: 'REPULSION_PULSE',
    FRUSTUM_FADING: 'FRUSTUM_FADING'
};

// ==========================================
// 6. VIEWPORT BREAKPOINTS & HOLOGRAM DATA
// ==========================================
export const UI = {
    MOBILE_BREAKPOINT: 768,
    FISHEYE_STRENGTH: 1.8, // Camera distortion multiplier for mobile fisheye view

    // SAFE IMPROV: Distance the shards float away from the center anchor
    HOLOGRAM_OFFSET: 120
};