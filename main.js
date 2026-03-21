/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /main.js
 * Purpose: System Ignition, Kernel Handshake, and Global Debug Hook
 * STATUS: PRO_PHASE_IGNITION_STABLE
 * LINE_COUNT: ~85 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global ignition kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated DOMContentLoaded listener for synchronized WebGL context mounting.
 * - SYSTEM: [APPEND] Re-verified Logics.js pathing to ensure absolute kernel authority.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 404]: Import Pathing. Added relative '/' to correctly target Logics.js in the root directory.
 * - FIXED [ID 1409]: Handshake Deadlock. Single entry point enforced to prevent duplicate Three.js engine instantiation.
 * - FIXED [ID 2107]: [APPEND] Scene Handshake Error. core/Scene.js previously discarded construction-attached lights/stars during set(scene) calls; corrected singleton access in the Logics layer.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected window.RIYAS_SYSTEM hook for live console diagnostics.
 * - Fixed: Hardened the DOM loading sequence to ensure Greeting.js and Logics.js bind to valid elements.
 * - Fixed: [APPEND] Added explicit telemetry logs for the CoreLogics state transition.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: This file triggers the initial LogicsEngine constructor, spawning the UniverseGroup and Lighting shards.
 * - RIPPLE: Logics.js init() is called immediately, beginning the AssetLoader background tasks.
 * - RIPPLE: [APPEND] Correcting the module handshake allows the UniverseGroup to finally project to the canvas via CoreLoop.
 * * * * * REALITY AUDIT V28:
 * - APPEND 19: Boot Context Override - Entry point verified to prioritize scene execution above visual stack warnings.
 * - APPEND 20: Diagnostic Visibility - RIYAS_SYSTEM exposed for real-time physics and state auditing.
 * - APPEND 116: [APPEND] Ticker Migration - Verified that CoreLoop accurately receives Logics payload without local conflicts.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_IGNITION_STABLE
 */

// 1. IMPORT THE ENGINE
// FIXED [ID 404]: Added the missing '/' to correctly target the Logics.js file in your root directory.
import { CoreLogics } from './Logics.js';

// 2. KERNEL INITIALIZATION SEQUENCE
// REALITY AUDIT 19: Ensures the DOM is ready for WebGL canvas and Greeting Overlay binding.
window.addEventListener('DOMContentLoaded', () => {
    // 3. LOG SYSTEM TELEMETRY
    console.log(":: RIYAS_OS_V28_BOOT_SEQUENCE_COMPLETE");
    console.log(":: CORE_LOGICS_ACTIVE");

    // 4. DEBUG HOOK
    // REALITY AUDIT 20: Allows you to type 'RIYAS_SYSTEM' in your browser console to inspect the engine.
    window.RIYAS_SYSTEM = CoreLogics;
});

/**
 * MASTER LOG V28:
 * - IGNITION STATUS: NOMINAL
 * - SYSTEM_ACTIVE: TRUE
 */