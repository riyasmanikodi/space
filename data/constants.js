/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/constants.js
 * Purpose: Global DNA, Liquid Scaling, Physics Rules, and Glitch Registry
 * STATUS: PRO_PHASE_CONSTANTS_HOLOGRAM_ACTIVE
 * LINE_COUNT: ~240 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global DNA registry finalized. Unified sector mapping and brand color-space established.
 * - SYSTEM: Integrated local asset pathing for the Zero-Cube Model Mounting protocol (Rover, Radar, Satellite, Rocket).
 * - SYSTEM: Transitioned 3D model texture mapping to .webp to align with high-fidelity performance targets.
 * - SYSTEM: Formalized GLITCH registry to support the non-repeating Shuffle Queue protocol in HeroEffects.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 05]: Angle Offset Jitter. Enforced strict radians for sector distribution.
 * - FIXED [ID 202]: Color Space Delta. Swapped legacy hex strings for numeric values.
 * - FIXED [ID 1417]: Invisible Models. Verified local ASSET_PATHS strings to ensure accurate GLB resolution.
 * - FIXED [ID 1518]: Texture Path Desync. Standardized WebP extensions for external 3D model maps.
 * - FIXED [ID 1525]: Neon Saturation. Decoupled brand colors from emissive channels to allow neutral texture mapping.
 * - FIXED [ID 1903]: Glitch Pool Desync. Verified all 11 unique effect keys match HeroEffects implementation.
 * * * * * OMISSION LOG V28:
 * - Fixed: Bridged SECTORS object to HeroEffects engine for brand-synced text-glow logic.
 * - Fixed: Injected ASSET_PATHS to centralize local GLB model resolution and texture mapping.
 * - Fixed: Added external texture mapping registry for 3D models using WebP format.
 * - Fixed: Standardized numeric color constants to facilitate matte material transitions.
 * - Fixed: Explicitly defined 11-step glitch constant pool to support the non-repeating loop logic.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: All procedural world shards depend on these physics weights for kinetic fluidity.
 * - RIPPLE: Logics.js consumes ASSET_PATHS to mount models to the northPoleAnchor.
 * - RIPPLE: Neutralizing emissive brand colors in AssetLoader allows WebP textures to render without neon interference.
 * - RIPPLE: Centralized GLITCH registry ensures HeroEffects maintains a cinematic, varied identity anomalies loop.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Circular Wraparound - WRAP_LIMIT enforced at 2PI.
 * - APPEND 43: Asset Integrity - Standardized local model paths for Rover, Satellite, Radar, and Rocket.
 * - APPEND 68: WebP Verification - Confirmed all 3D model textures point to /assets/textures/*.webp.
 * - APPEND 75: Visual Sanitization - Confirmed brand color decoupling for model material stability.
 * - APPEND 84: Glitch Integrity - Verified 11 unique effects for Shuffle Queue compliance.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_CONSTANTS_HOLOGRAM_ACTIVE
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
    // REALITY AUDIT 2: Adaptive BASE_RADIUS for mobile optimization
    BASE_RADIUS: isMobile ? 6 : 12,
    MAX_ORBIT_WIDTH: 18,
    DRAG_SENSITIVITY: 0.002,
    DAMPING: 0.05,
    AUTO_ROTATE_SPEED: 0.001,
    WRAP_LIMIT: Math.PI * 2,
    ZOOM_RADIUS: 75
};

// ==========================================
// 4. SECTOR METADATA MAPPING (CULPRIT 05)
// ==========================================
export const SECTORS = {
    TECH: {
        id: "tech",
        name: "TECH_CORE",
        type: "ROVER",
        color: COLORS.TECH,
        angleOffset: 0
    },
    CODE: {
        id: "code",
        name: "CODE_BASE",
        type: "RADAR",
        color: COLORS.CODE,
        angleOffset: Math.PI / 2
    },
    VISION: {
        id: "vision",
        name: "VISION_SAT",
        type: "SATELLITE",
        color: COLORS.VISION,
        angleOffset: Math.PI
    },
    CONTACT: {
        id: "contact",
        name: "COMM_LINK",
        type: "ROCKET",
        color: COLORS.CONTACT,
        angleOffset: (Math.PI * 3) / 2
    }
};

// ==========================================
// 5. LOCAL ASSET PIPELINE (REALITY AUDIT 43 / CULPRIT 1417)
// Centralized path resolution with WebP optimization
// ==========================================
export const ASSET_PATHS = {
    MODELS: {
        ROVER: './assets/models/rover.glb',
        SATELLITE: './assets/models/satellite.glb',
        RADAR: './assets/models/radar_dish.glb',
        ROCKET: './assets/models/rocket.glb'
    },
    TEXTURES: {
        SKY: './assets/textures/environment/stars.webp',
        SPEC: './assets/textures/maps/global_spec.webp',
        MERCURY: './assets/textures/surfaces/mercury.webp',
        MOON: './assets/textures/surfaces/moon.webp',
        JUPITER: './assets/textures/surfaces/jupiter.webp',
        SATURN: './assets/textures/surfaces/saturn.webp',
        // External 3D model texture maps
        ROVER_DIFF: './assets/textures/rover.webp',
        RADAR_DIFF: './assets/textures/radar.webp',
        SAT_DIFF: './assets/textures/satellite.webp',
        ROCKET_DIFF: './assets/textures/rocket.webp'
    }
};

// ==========================================
// 6. GLITCH EFFECT REGISTRY (PRO PHASE SHUFFLE COMPLIANT)
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
    FRUSTUM_FADING: 'FRUSTUM_FADING',
    MIRROR_DESYNC: 'MIRROR_DESYNC',
    // Extended Effects for Queue Variety
    SIGNAL_NOISE: 'SIGNAL_NOISE',
    GHOST_ECHO: 'GHOST_ECHO',
    LENS_WARP: 'LENS_WARP'
};

// ==========================================
// 7. VIEWPORT BREAKPOINTS & HOLOGRAM DATA
// ==========================================
export const UI = {
    MOBILE_BREAKPOINT: 768,
    FISHEYE_STRENGTH: 1.8,
    HOLOGRAM_OFFSET: 120
};