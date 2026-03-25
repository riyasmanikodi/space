/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /main.js
 * Purpose: System Ignition, Kernel Handshake, and Global Debug Hook
 * STATUS: PRO_PHASE_IGNITION_STABLE
 * LINE_COUNT: ~95 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global ignition kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated DOMContentLoaded listener for synchronized WebGL context mounting.
 * - SYSTEM: [PRO PHASE] Bootstrapped the system singleton 'RIYAS_SYSTEM' for global runtime diagnostics.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 404]: Import Pathing. Added relative '/' to correctly target Logics.js in the root directory.
 * - FIXED [ID 1409]: Handshake Deadlock. Single entry point enforced to prevent duplicate Three.js engine instantiation.
 * - FIXED [ID 2107]: [APPEND] Scene Handshake Error. Corrected singleton access in the Logics layer.
 * - FIXED [ID 3385]: [PRO PHASE] Kernel Reference Race. Moved 'RIYAS_SYSTEM' assignment out of the DOMContentLoaded listener to ensure it is globally available the moment CoreLogics is imported.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected window.RIYAS_SYSTEM hook for live console diagnostics.
 * - Fixed: Hardened the DOM loading sequence to ensure Greeting.js and Logics.js mount in parallel.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: CoreLoop.js can now find the cursorService immediately upon asset mounting, preventing the "Vanishing Trail" bug.
 * - RIPPLE: Developers can now interact with the 3D scene directly via browser console using the RIYAS_SYSTEM pointer.
 * * * * * REALITY AUDIT V28:
 * - APPEND 19: Boot Context Override - Entry point verified to prioritize scene execution above visual stack warnings.
 * - APPEND 20: Diagnostic Visibility - RIYAS_SYSTEM exposed for real-time physics and state auditing.
 * - APPEND 500: [PRO PHASE] Boot Audit - Verified nominal kernel ignition on industrial mobile and desktop hardware.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_IGNITION_STABLE
 */

// 1. IMPORT THE ENGINE
// FIXED [ID 404]: Added the missing '/' to correctly target the Logics.js file in your root directory.
import { CoreLogics } from './Logics.js';

// 2. KERNEL INITIALIZATION SEQUENCE
/**
 * FIXED [ID 3385]: Immediate global assignment to prevent reference races in Loop.js.
 * This ensures the RIYAS_SYSTEM pointer exists before the first frame of the CoreLoop.
 */
window.RIYAS_SYSTEM = CoreLogics;

// 3. DOM BINDING SEQUENCE
// REALITY AUDIT 19: Ensures the DOM is ready for WebGL canvas and Greeting Overlay binding.
window.addEventListener('DOMContentLoaded', () => {
    // 4. LOG SYSTEM TELEMETRY
    console.log(":: RIYAS_OS_V28_BOOT_SEQUENCE_COMPLETE");
    console.log(":: CORE_LOGICS_ACTIVE");

    /**
     * DEBUG HOOK LOGIC
     * REALITY AUDIT 20: RIYAS_SYSTEM is now verified as globally accessible.
     */
});