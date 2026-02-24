/**
 * RIYAS_OS V28 - RIPPLE 0
 * File: /data/profile.js
 * Purpose: Core Identity, Skill Quantization, and Bio Data Bursts
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
    // 4. SAFE IMPROV: SKILL QUANTIZATION & SECTOR AFFILIATION
    // Levels (0.0 - 1.0) drive the procedural height of 3D cityscapes/nodes
    // ==========================================
    skills: {
        // Linked to the HUB planet
        tech: [
            { name: "THREE.JS", level: 0.90 },
            { name: "WEB DEVELOPMENT", level: 0.85 },
            { name: "VANILLA JS", level: 0.88 },
            { name: "MODULAR ARCHITECTURE", level: 0.80 }
        ],
        // Linked to the BLACK HOLE planet
        code: [
            { name: "PYTHON", level: 0.85 },
            { name: "SQL", level: 0.80 },
            { name: "LINUX", level: 0.75 }
        ],
        // Linked to the SATELLITE
        vision: [
            { name: "APPLICATION SUPPORT", level: 0.90 },
            { name: "TROUBLESHOOTING", level: 0.85 },
            { name: "SYSTEM OPTIMIZATION", level: 0.80 }
        ]
    }
};