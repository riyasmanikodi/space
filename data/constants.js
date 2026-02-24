/**
 * RIYAS_OS V28 - RIPPLE 0
 * File: /data/constants.js
 * Purpose: Global DNA, Liquid Scaling, and Physics Rules
 */

// ==========================================
// 1. SYSTEM CONFIGURATION
// ==========================================
export const SYSTEM = {
    VERSION: "28.0.0_MODULAR",
    AUTHOR: "RIYAS MANIKODI",
    DEBUG_MODE: true // Set to false for production
};

// ==========================================
// 2. CYBERPUNK COLOR PALETTE (Safe Improv)
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

    // Physics Weight
    DRAG_SENSITIVITY: 0.002,
    DAMPING: 0.05,
    AUTO_ROTATE_SPEED: 0.001,

    // Reality Audit: Reset math at 360 degrees to prevent WebGL jitter
    WRAP_LIMIT: Math.PI * 2
};

// ==========================================
// 4. SECTOR METADATA MAPPING
// ==========================================
// This maps directly to the sketch. `angleOffset` determines their starting position on the ring.
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
// 5. VIEWPORT BREAKPOINTS
// ==========================================
export const UI = {
    MOBILE_BREAKPOINT: 768,
    FISHEYE_STRENGTH: 1.8 // Camera distortion multiplier for mobile
};