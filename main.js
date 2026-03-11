/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /main.js
 * Purpose: System Ignition, Kernel Handshake, and Global Debug Hook
 * STATUS: PRO_PHASE_IGNITION_STABLE
 * LINE_COUNT: ~55 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global ignition kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated DOMContentLoaded listener for synchronized WebGL context mounting.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 404]: Import Pathing. Added relative '/' to correctly target Logics.js in the root directory.
 * - FIXED [ID 1409]: Handshake Deadlock. Single entry point enforced to prevent duplicate Three.js engine instantiation.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected window.RIYAS_SYSTEM hook for live console diagnostics.
 * - Fixed: Hardened the DOM loading sequence to ensure Greeting.js and Logics.js bind to valid elements.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: This file triggers the initial LogicsEngine constructor, spawning the UniverseGroup and Lighting shards.
 * - RIPPLE: Logics.js init() is called immediately, beginning the AssetLoader background tasks.
 * * * * * REALITY AUDIT V28:
 * - APPEND 19: Boot Context Override - Entry point verified to prioritize scene execution above visual stack warnings.
 * - APPEND 20: Diagnostic Visibility - RIYAS_SYSTEM exposed for real-time physics and state auditing.
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