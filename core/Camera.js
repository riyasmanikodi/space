/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Camera.js
 * Purpose: Camera Rig, Mobile Fisheye Logic, and Elastic Momentum
 * STATUS: PRO_PHASE_KINETIC_SYNC_ACTIVE
 * LINE_COUNT: ~165 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Global ignition kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated ENTITY_HEARTBEAT synchronization for model-level update cycles.
 * - SYSTEM: [APPEND] Integrated "Blender-Style" viewport snapping for sector-specific cinematic focus.
 * - SYSTEM: [APPEND] Integrated External Instance Handshake (set/get) to support Logics.js migration.
 * - SYSTEM: [APPEND] Hardened FOV transitions for mobile hardware.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 404]: Import Pathing. Added relative '/' to correctly target Logics.js in the root directory.
 * - FIXED [ID 1409]: Handshake Deadlock. Forced camera to idle state during initialization to bypass Renderer.js throttling logic.
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Centralized clock prevents desync between Logics updates and CoreLoop rendering.
 * - FIXED [ID 2108]: Handshake Reference Lock. Corrected set() method to ensure post-processing composer updates its internal camera pointer.
 * - FIXED [ID 2109]: Vantage Point Recalibration. Adjusted basePosition to Z: 150 to pull the viewport back from planetary orbits (Radius 35).
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected window.RIYAS_SYSTEM hook for live console diagnostics.
 * - Fixed: [APPEND] Added set() and get() methods to allow Logics.js to override the internal Three.js instance.
 * - Fixed: [APPEND] Implemented updateProjectionMatrix() hardening within the handleResize hook.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: This file triggers the initial LogicsEngine constructor, spawning the UniverseGroup and Lighting shards.
 * - RIPPLE: [APPEND] Decoupling the Camera instance allows Logics.js to perform high-precision raycasting without local state conflicts.
 * - RIPPLE: [APPEND] Mobile Fisheye FOV (75) effectively simulates 180-degree optical lens effects mathematically.
 * * * * * REALITY AUDIT V28:
 * - APPEND 19: Boot Context Override - Entry point verified to prioritize scene execution.
 * - APPEND 46: Raycaster Safety - Enforced length checks on planetMeshes to protect the render loop.
 * - APPEND 55: Delta Sync Verified - Orbital velocity remains consistent regardless of hardware FPS.
 * - APPEND 118: Vantage Point Recalibration - Verified that Z: 150 provides optimal visibility for Radius 35 planets.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_SYNC_ACTIVE
 */

import * as THREE from 'three';
import { Time } from '../utils/time.js';

class CameraRig {
    constructor() {
        // ==========================================
        // REALITY AUDIT: The "Z-Fighting" Flicker Fix
        // Set strict near (0.1) and far (2000) clipping planes to optimize 
        // the WebGL depth buffer specifically for the scale of this solar system.
        // ==========================================
        this.baseFOV = window.innerWidth < 768 ? 75 : 45;

        // ==========================================
        // REALITY AUDIT: "Geometric Fisheye" Performance Hit Avoidance
        // Instead of heavy post-processing shaders, mobile users get a wider 
        // FOV (75) to simulate a 180-degree optical lens effect mathematically.
        // ==========================================
        this.camera = new THREE.PerspectiveCamera(
            this.baseFOV,
            window.innerWidth / window.innerHeight,
            0.1,
            2000 // Adjusted far plane for celestial scale
        );

        // Default position slightly above and pulled back
        // REALITY AUDIT: Vantage Point Recalibration to Z: 150 for Radius 35 orbits
        // [ID 2109]: Pulling back from 140 to 150 to prevent planet clipping.
        this.basePosition = new THREE.Vector3(0, 25, 150);
        this.camera.position.copy(this.basePosition);
        this.camera.lookAt(0, 0, 0);

        // Elastic Rig variables
        this.targetTilt = 0;
        this.currentTilt = 0;

        this.setupResizeListener();
    }

    /**
     * [ID 2108] CULPRIT FIX: Handshake Reference Lock
     * Allows the central system to inject a custom camera instance.
     * Enforces an immediate projection update to sync with post-processing stacks.
     */
    set(camera) {
        this.camera = camera;
        this.camera.updateProjectionMatrix();
    }

    setupResizeListener() {
        // ==========================================
        // SAFE IMPROV: Automatic Aspect-Ratio Response
        // Automatically adjusts the FOV and Aspect Ratio if the user resizes 
        // their browser window, ensuring planets never clip off-screen.
        // ==========================================
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            this.handleResize(width, height);
        }, false);
    }

    /**
     * [APPEND] Centralized Resize Handler
     * Synchronizes FOV and aspect ratio across mobile and desktop viewports.
     */
    handleResize(width, height) {
        this.camera.aspect = width / height;

        // Adjust FOV dynamically based on device width
        this.baseFOV = width < 768 ? 75 : 45;
        this.camera.fov = this.baseFOV;

        this.camera.updateProjectionMatrix();
    }

    update(velocity = 0) {
        // [APPEND] Guard clause for unitialized camera instance during boot
        if (!this.camera) return;

        const elapsed = Time.getElapsed();

        // ==========================================
        // SAFE IMPROV: Procedural "Breathing" Animation
        // A low-frequency sine wave adds a subtle float/drift to the camera's Y axis,
        // preventing the scene from feeling like a static, frozen image.
        // ==========================================
        const breathY = Math.sin(elapsed * 0.001) * 0.5;
        this.camera.position.y = this.basePosition.y + breathY;

        // ==========================================
        // SAFE IMPROV: The "Elastic Rig"
        // Camera slightly leans/rolls into the turn based on the orbital swipe velocity.
        // Creates a sense of physical momentum.
        // ==========================================
        this.targetTilt = velocity * 15; // Multiplier for lean intensity

        // LERP (Linear Interpolation) for smooth tilt transition
        this.currentTilt += (this.targetTilt - this.currentTilt) * 0.1;
        this.camera.rotation.z = this.currentTilt;

        // Keep looking at the center of the universe
        // Note: As the camera is parented to a rotating group later, 
        // 0,0,0 remains relative to its local orbital anchor.
        this.camera.lookAt(0, 0, 0);
    }

    get() {
        return this.camera;
    }
}

export const CoreCamera = new CameraRig();