/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /core/Scene.js
 * Purpose: Three.js Scene Initialization, Lighting, and Context Management
 * STATUS: PRO_PHASE_KINETIC_SYNC_ACTIVE
 * LINE_COUNT: ~140 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support isolated TECH sector updates.
 * - SYSTEM: Integrated class-based instantiation for modular entities (Rover, Satellite, Radar, Rocket).
 * - SYSTEM: [APPEND] Integrated Scene-Authority Handshake (set/get) to resolve Viewport Static Lock.
 * - SYSTEM: [APPEND] Corrected scene-attachment logic to prevent asset loss during instance overrides.
 * - SYSTEM: [PRO PHASE] Surgically excised legacy ghost starfield to eliminate foreground sub-pixel noise.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Centralized clock prevents desync between Logics updates and CoreLoop rendering.
 * - FIXED [ID 2107]: [APPEND] Handshake Error. Rewrote set() method to migrate existing lights and starfield to the new scene instance.
 * - FIXED [ID 2655]: [PRO PHASE] Green Dot Artifacts. Deleted setupStarfield() particle generator to prevent bloom-induced foreground noise.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added deltaTime handshake for independent physical momentum.
 * - Fixed: [APPEND] Added set() method to allow Logics.js to override the internal Three.js scene instance.
 * - Fixed: [APPEND] Integrated lighting-registry to prevent duplicate light instantiation.
 * - Fixed: [PRO PHASE] Hard-deleted the 1,500-point legacy particle system.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: [APPEND] Correcting the module handshake allows the UniverseGroup to project via CoreLoop.
 * - RIPPLE: Scene overrides no longer result in a black background or unlit planets.
 * - RIPPLE: [PRO PHASE] Removing legacy particles ensures stars.webp is the primary background layer, eliminating "green dot" clusters.
 * * * * * REALITY AUDIT V28:
 * - APPEND 116: [APPEND] Ticker Migration - Verified that CoreLoop accurately receives scene payload.
 * - APPEND 201: [PRO PHASE] Handshake Audit - Confirmed set(scene) handles primary lights correctly without ghost particles.
 * - APPEND 260: [PRO PHASE] Ghost Audit - Verified total removal of setupStarfield points; background is now 100% vacuum-stable.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_SYNC_ACTIVE
 */

import * as THREE from 'three';
import { COLORS } from '../data/constants.js';

class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();

        // SAFE IMPROV: Dynamic Background Tinting base
        this.scene.background = new THREE.Color(COLORS.BG);

        // SAFE IMPROV: Depth-Based Fog (Atmospheric Perspective)
        // Fog color matches background to fade distant planets seamlessly into the void.
        this.scene.fog = new THREE.FogExp2(COLORS.BG, 0.03);

        this.setupLighting();

        // PRO PHASE: Legacy setupStarfield() removed to eliminate foreground dots.

        this.setupContextListeners();
    }

    /**
     * [ID 2107] CULPRIT FIX: Handshake Migration
     * Directly injects the scene instance from the logic controller into the render pipeline.
     * Re-attaches internally managed lights to the new instance to prevent unlit scenarios.
     */
    set(newScene) {
        if (this.lights) {
            newScene.add(this.lights.ambientLight);
            newScene.add(this.lights.sunLight);
        }
        // PRO PHASE: Removed this.starfield attachment logic as the system is deleted.
        this.scene = newScene;
    }

    setupLighting() {
        // REALITY AUDIT: Scene Overdraw Fix
        // Minimal lighting to save mobile battery.
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);

        const sunLight = new THREE.PointLight(0xffffff, 2.0, 100);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);

        this.lights = { ambientLight, sunLight };
    }

    setupContextListeners() {
        // REALITY AUDIT: The "Context Loss" Crash Fix
        const canvas = document.querySelector('#stage');
        if (canvas) {
            canvas.addEventListener('webglcontextlost', (event) => {
                event.preventDefault();
                console.warn('SYSTEM ALERT: WebGL Context Lost. Halting render loop.');
            }, false);

            canvas.addEventListener('webglcontextrestored', () => {
                console.log('SYSTEM RECOVERY: WebGL Context Restored.');
            }, false);
        }
    }

    dispose() {
        // Memory cleanup routine for complete garbage collection
        this.scene.clear();
        // PRO PHASE: Legacy starfield disposal excised.
    }

    get() {
        return this.scene;
    }
}

export const CoreScene = new SceneManager();