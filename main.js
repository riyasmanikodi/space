/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /main.js
 * Purpose: System Ignition
 */

// 1. IMPORT THE ENGINE
// FIXED: Added the missing '/' to correctly target the Logics.js file in your root directory.
import { CoreLogics } from '/Logics.js';

// 2. LOG SUCCESS
window.addEventListener('DOMContentLoaded', () => {
    console.log(":: RIYAS_OS_V28_BOOT_SEQUENCE_COMPLETE");
    console.log(":: CORE_LOGICS_ACTIVE");

    // Debug Hook: Allows you to type 'RIYAS_SYSTEM' in your browser console to inspect the engine
    window.RIYAS_SYSTEM = CoreLogics;
});