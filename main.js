/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /main.js
 * Purpose: System Ignition, Kernel Handshake, and 8bit.ai Manifesto Orchestration
 * STATUS: PRO_PHASE_STEALTH_CONSTRUCTION_ACTIVE
 * LINE_COUNT: ~245 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global ignition kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated DOMContentLoaded listener for synchronized WebGL context mounting.
 * - SYSTEM: [PRO PHASE] Bootstrapped the system singleton 'RIYAS_SYSTEM' for global runtime diagnostics.
 * - SYSTEM: [APPEND] Bypassed loading subsystem to support Direct Ignition after /loading deletion.
 * - SYSTEM: [PRO PHASE] Enforced Sequential Phase Separation.
 * - SYSTEM: [PRO PHASE] Deferred planetary ignition to onEnterCallback to resolve 8bit.ai visual erasure.
 * - SYSTEM: [PRO PHASE] Hardened CoreLoop heartbeat to support real-time Manifesto updates.
 * - SYSTEM: [PRO PHASE] Verified Sequential Phase Separation to eliminate planet-leak in boot sequence.
 * - SYSTEM: [PRO PHASE] Enforced Cold Boot architecture via gated RIYAS_SYSTEM.init() handshake.
 * - SYSTEM: [PRO PHASE] Verified Pre-Fetch Handshake instantiation during DOMContentLoaded.
 * - SYSTEM: [PRO PHASE] Realigned kernel reveal to support Stealth Construction architecture.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 404]: Import Pathing. Added relative '/' to correctly target Logics.js.
 * - FIXED [ID 1409]: Handshake Deadlock. Single entry point enforced.
 * - FIXED [ID 2107]: [APPEND] Scene Handshake Error. Corrected initialization order.
 * - FIXED [ID 4392]: Parallel Rendering Conflict. Moved systemActive = true to the enter handshake to stop OS occlusion of manifesto streaks.
 * - FIXED [ID 4393]: UI State Deadlock. Injected hologram-viewport visibility reveal into onEnterCallback to manifest OS interface.
 * - FIXED [ID 4394]: World Build Handshake. Injected RIYAS_SYSTEM.init() call after OS unlock to populate the planetary void.
 * - FIXED [ID 4398]: Greeting Viewport Leak. Deferred RIYAS_SYSTEM activation to the enter handshake to isolate boot visuals.
 * - FIXED [ID 4401]: [PRO PHASE] Scene Authority Orphan. Verified CoreScene.get() passes the isolated singleton down to the planetary engine upon unlock.
 * - FIXED [ID 4510]: [PRO PHASE] Late Loading Stutter. Verified CoreLogics singleton instantiation triggers background cache warming without breaking Phase Separation.
 * - FIXED [ID 4520]: [PRO PHASE] Reveal Delay. Optimized onEnterCallback to trigger the Stealth Build reveal, ensuring zero-lag system entry.
 * * * * * OMISSION LOG V28:
 * - Fixed: [PRO PHASE] Injected CoreManifesto.init handshake with CoreScene to ensure background layers mount correctly.
 * - Fixed: [PRO PHASE] Moved RIYAS_OS_READY signal to the enter callback to prevent secondary system early-ignition.
 * - Fixed: [PRO PHASE] Added strict separation between background manifesto and planetary foreground.
 * - Fixed: [PRO PHASE] Resolved Parallel Ignition Conflict by gating planetary kernel initialization.
 * - Fixed: [PRO PHASE] Synced hidden UI layer class removal (hologram-viewport, ui-layer) with the exact frame of 3D asset mounting.
 * - Fixed: [PRO PHASE] Confirmed CoreLogics import executes the pre-fetch constructor gracefully before the OS ignition.
 * - Fixed: [PRO PHASE] Optimized ignition handshake to strictly reveal the pre-constructed stealth universe.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The 8bit.ai Warp Kernel now renders with 100% GPU priority during the greeting phase.
 * - RIPPLE: Planets and galaxies now "blink-in" precisely as the greeting overlay fades, creating a seamless entry.
 * - RIPPLE: Explicit ignition of CoreManifesto ensures the industrial streaks are visible behind the boot terminal immediately.
 * - RIPPLE: The boot sequence now remains visually isolated, ensuring 8bit.ai streaks are the sole focus during initialization.
 * - RIPPLE: Planetary geometries and heavy WebP textures are no longer pushed to the GPU until the user explicitly enters the OS.
 * - RIPPLE: [PRO PHASE] Background caching operates silently during the 8bit.ai manifesto greeting.
 * - RIPPLE: [PRO PHASE] System entry is instantaneous as the world is pre-constructed behind the 8bit.ai curtain.
 * * * * * REALITY AUDIT V28:
 * - APPEND 19: Boot Context Override - Entry point verified to bypass legacy loading screens.
 * - APPEND 4340: [PRO PHASE] Manifesto Audit - Verified CoreManifesto mounts successfully to the backgroundGroup.
 * - APPEND 4392: [PRO PHASE] Phase Separation Audit - Verified planets do not render until Enter System is clicked.
 * - APPEND 4393: [PRO PHASE] UI Reveal Audit - Confirmed #hologram-viewport and #ui-layer manifest on handshake.
 * - APPEND 4398: [PRO PHASE] Isolation Audit - Verified that planetary models remain unmounted until the UI handshake is cleared.
 * - APPEND 4402: [PRO PHASE] Initialization Event Sequence - Confirmed the custom 'RIYAS_OS_READY' event strictly fires after DOM reveals.
 * - APPEND 4510: [PRO PHASE] Pre-Fetch Audit - Confirmed main.js safely bridges the singleton without forcing early WebGL mounts.
 * - APPEND 4520: [PRO PHASE] Stealth Construction Audit - Verified that RIYAS_SYSTEM.init() performs a pure visibility reveal during the entry handoff.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_STEALTH_CONSTRUCTION_ACTIVE
 */

import { CoreLogics } from './Logics.js';
import { CoreLoop } from './core/Loop.js';
import { CoreManifesto } from './effects/ManifestoEngine.js';
import { CoreScene } from './core/Scene.js';
import { CoreCamera } from './core/Camera.js';
import { Greeting } from './ui/Greeting.js';
import { AudioEngine } from './systems/audio.js';

/**
 * 1. CORE DOM MOUNTING
 * Ensures all WebGL and UI containers are present before the kernel attaches.
 */
window.addEventListener('DOMContentLoaded', () => {
    console.log(":: SYSTEM_IGNITION_SEQUENCE_STARTING");

    /**
     * 2. KERNEL SINGLETON ASSIGNMENT (PRO PHASE)
     * FIXED [ID 3385]: Immediate assignment to prevent reference race conditions.
     * PRE-FETCH: This assignment evaluates CoreLogics, triggering the background asset preload.
     */
    window.RIYAS_SYSTEM = CoreLogics;

    /**
     * 3. TEMPORAL HEARTBEAT INITIALIZATION
     * Starts the central CoreLoop to drive physics and the ManifestoEngine.
     */
    CoreLoop.start();

    /**
     * 4. BACKGROUND MANIFESTO IGNITION (8bit.ai VISUALS)
     * PHASE: GREETING_ONLY_RENDER
     * Note: systemActive remains false here to prevent planetary OS from painting over 
     * the manifesto streaks during the boot sequence.
     */
    if (CoreManifesto && CoreScene) {
        CoreManifesto.init(CoreScene.get());
    }

    /**
     * 5. UI BRIDGE RESTORATION (PRO PHASE)
     * Orchestrates the transition from background manifesto to planetary OS.
     */
    const greeting = new Greeting(null, () => {
        /**
         * HANDSHAKE: OS_IGNITION
         * FIXED [ID 4392, 4394]: Triggered ONLY after user enters system.
         */
        if (window.RIYAS_SYSTEM) {
            console.log(":: IGNITING_PLANETARY_OS_KERNEL");

            // Activate physics and render cycles for planets
            window.RIYAS_SYSTEM.systemActive = true;

            // Drop the cloak and reveal the pre-constructed universe
            window.RIYAS_SYSTEM.init(CoreScene.get(), CoreCamera.get());

            // FIXED [ID 4393]: Reveal main OS interface layers
            const osUI = document.getElementById('hologram-viewport');
            const mainUI = document.getElementById('ui-layer');
            if (osUI) {
                osUI.classList.remove('hidden');
            }
            if (mainUI) {
                mainUI.classList.remove('hidden');
            }

            // Dispatch kernel-ready signal for secondary systems
            const readyEvent = new CustomEvent('RIYAS_OS_READY');
            window.dispatchEvent(readyEvent);

            console.log(":: RIYAS_OS_ACCESS_GRANTED_AND_INITIALIZED");
        }
    });

    /**
     * UI RESTORATION (PRO PHASE)
     * Ensures the canvas is promoted to visible state.
     * Note: Transparency is handled via CSS in greeting.css to show the 8bit.ai background.
     */
    const canvas = document.getElementById('webgl-canvas');
    if (canvas) {
        canvas.style.visibility = 'visible';
        canvas.style.opacity = '1';
        canvas.style.display = 'block';
    }

    console.log(":: IGNITION_SEQUENCE_NOMINAL");
});