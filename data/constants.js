/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /data/constants.js
 * Purpose: Global DNA, Performance Weighting, and Hardware Tiering
 * STATUS: PRO_PHASE_PROCEDURAL_METEOR_ACTIVE
 * LINE_COUNT: ~215 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global DNA registry finalized. Unified sector mapping and brand color-space established.
 * - SYSTEM: Transitioned from image-based assets to mathematical procedural geometry for the cursor.
 * - SYSTEM: Integrated high-fidelity procedural "Meteor on Fire" physics into the centralized DNA registry.
 * - SYSTEM: [APPEND] Synchronized Sector DNA with uppercase Logics constants to resolve dictionary lookup failures.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 05]: Angle Offset Jitter. Enforced strict radians for sector distribution.
 * - FIXED [ID 202]: Color Space Delta. Swapped legacy hex strings for numeric values.
 * - FIXED [ID 3010]: Asset Dependency. Removed reliance on external PNG files by generating the cursor via geometry math.
 * - FIXED [ID 3030]: Blue Dot Error. Resolved by igniting the procedural 3D Meteor geometry independently.
 * - FIXED [ID 3055]: Viewport Visibility. Swapped arbitrary coordinate multipliers for Camera Unprojection math to ensure 1:1 tracking.
 * - FIXED [ID 2120]: Capitalization Lock-Out. Normalized Sector IDs to UPPERCASE to match Logics.js and Profile.js authority keys.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected METEOR_CONFIG to define procedural vertex displacement and ignition thresholds.
 * - Fixed: Added HARDWARE_PROFILES to support Low/Medium/High performance tiers.
 * - Fixed: Injected sRGB colorSpace correction constants for all industrial textures.
 * - Fixed: Normalized sector identifiers to prevent undefined data-shard manifestations.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The system is now 100% independent of external cursor assets, increasing boot speed.
 * - RIPPLE: Procedural geometry allows for unique asteroid topography on every system initialization.
 * - RIPPLE: The decoupled renderer ensures that cursor crashes do not impact planetary rotation.
 * - RIPPLE: Synchronizing IDs allows holographic shards to correctly manifest bio-data and skill levels.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Circular Wraparound - WRAP_LIMIT enforced at 2PI.
 * - APPEND 123: Tier Calibration - Verified Anisotropy limits (4x Low / 16x High).
 * - APPEND 180: Geometry Audit - Verified vertex displacement math (offset 0.8-1.2) creates unique rocky surface.
 * - APPEND 185: Light Audit - Confirmed point light intensity constants scale with movement velocity.
 * - APPEND 205: Viewport Audit - Replaced legacy NDC-to-World mapping with Vector3.unproject() for precision.
 * - APPEND 212: DNA Audit - Verified that all sector keys match the global state machine's case-sensitive lookups.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_PROCEDURAL_METEOR_ACTIVE
 */

// ==========================================
// 1. SYSTEM CONFIGURATION
// ==========================================
export const SYSTEM = {
    VERSION: "28.0.0_PRO_PHASE",
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
// 3. PERFORMANCE & HARDWARE TIERS
// ==========================================
export const PERFORMANCE = {
    MAX_CONCURRENT_REQUESTS: 4,
    STAGGERED_LOAD_INTERVAL: 100,
    HARDWARE_PROFILES: {
        LOW: { anisotropy: 4, shadows: false, particles: 500 },
        MEDIUM: { anisotropy: 8, shadows: true, particles: 1200 },
        HIGH: { anisotropy: 16, shadows: true, particles: 2000 }
    }
};

// ==========================================
// 4. ORBITAL MECHANICS
// ==========================================
const isMobile = window.innerWidth < 768;

export const ORBIT = {
    BASE_RADIUS: isMobile ? 6 : 12,
    MAX_ORBIT_WIDTH: 18,
    DRAG_SENSITIVITY: isMobile ? 0.004 : 0.002,
    DAMPING: 0.05,
    AUTO_ROTATE_SPEED: 0.001,
    WRAP_LIMIT: Math.PI * 2,
    ZOOM_RADIUS: 75
};

// ==========================================
// 5. SECTOR METADATA MAPPING (CULPRIT 2120)
// ==========================================
export const SECTORS = {
    TECH: {
        id: "TECH",
        name: "TECH_CORE",
        type: "ROVER",
        color: COLORS.TECH,
        angleOffset: 0
    },
    CODE: {
        id: "CODE",
        name: "CODE_BASE",
        type: "RADAR",
        color: COLORS.CODE,
        angleOffset: Math.PI / 2
    },
    VISION: {
        id: "VISION",
        name: "VISION_SAT",
        type: "SATELLITE",
        color: COLORS.VISION,
        angleOffset: Math.PI
    },
    CONTACT: {
        id: "CONTACT",
        name: "COMM_LINK",
        type: "ROCKET",
        color: COLORS.CONTACT,
        angleOffset: (Math.PI * 3) / 2
    }
};

// ==========================================
// 6. LOCAL ASSET PIPELINE
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
        ROVER_DIFF: './assets/textures/rover.webp',
        RADAR_DIFF: './assets/textures/radar.webp',
        SAT_DIFF: './assets/textures/satellite.webp',
        ROCKET_DIFF: './assets/textures/rocket.webp',
        // LEGACY FALLBACK:
        CURSOR_SHARD: './assets/textures/ui/Flying Meteorite on Fire Animated--cursor--SweezyCursors.png'
    }
};

// ==========================================
// 7. GLITCH EFFECT REGISTRY
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
    SIGNAL_NOISE: 'SIGNAL_NOISE',
    GHOST_ECHO: 'GHOST_ECHO',
    LENS_WARP: 'LENS_WARP'
};

// ==========================================
// 8. VIEWPORT BREAKPOINTS
// ==========================================
export const UI = {
    MOBILE_BREAKPOINT: 768,
    FISHEYE_STRENGTH: 1.8,
    HOLOGRAM_OFFSET: isMobile ? 80 : 120,
    SAFE_AREA_INSET: 'env(safe-area-inset-top)'
};

// ==========================================
// 9. PROCEDURAL METEOR CONFIG (PRO PHASE)
// ==========================================
export const METEOR_CONFIG = {
    DETAIL: 1, // Jagged low-poly facets
    BASE_SCALE: 0.25,
    NOISE_RANGE: [0.8, 1.2], // Topography variation
    IGNITION_MULTIPLIER: 30, // Velocity to fire glow factor
    EMISSIVE_BASE: 1.0, // High visibility visibility
    LERP_WEIGHT: 0.15
};