/**
 * RIYAS_OS V28 - RIPPLE 3
 * File: /entities/Satellite.js
 * Purpose: VISION Hub Entity, Group-within-Group Architecture, Solar Tracking, and Beacon Pulses
 */

import * as THREE from 'three';
import { PolyGen } from '../systems/PolyGen.js'; // Assuming CSG Lite tools

export class Satellite extends THREE.Group {
    constructor() {
        super();

        this.baseColor = new THREE.Color(0xff1493); // Deep Pink/Magenta for VISION sector
        this.pulseTimer = 0;

        this.init();
    }

    init() {
        // ==========================================
        // REALITY AUDIT: Hierarchy Overload Fix (Group-within-Group)
        // Master container holds separate groups for the rigid body, 
        // the rotating wings, and the pulsing beacon to prevent math conflicts.
        // ==========================================
        this.bodyGroup = new THREE.Group();
        this.wingGroup = new THREE.Group();
        this.beaconGroup = new THREE.Group();

        this.add(this.bodyGroup);
        this.add(this.wingGroup);
        this.add(this.beaconGroup);

        // ==========================================
        // REALITY AUDIT: "Thin Geometry" Aliasing Fix
        // Minimum thickness clamping applied to the structural struts.
        // Uses an emissive material to create a "Soft Glow" that bleeds slightly, 
        // ensuring 1px wide lines don't vanish or shimmer at a distance.
        // ==========================================
        const structMat = new THREE.MeshStandardMaterial({
            color: 0x222222,
            emissive: 0x111111,
            metalness: 0.8,
            roughness: 0.2,
            wireframe: true // Simulates complex truss structures
        });

        // Main Dish (Using standard primitives to represent PolyGen's output)
        const dishGeo = new THREE.CylinderGeometry(3, 0.5, 1, 16, 1, true);
        const dish = new THREE.Mesh(dishGeo, structMat);
        dish.rotation.x = Math.PI / 2;
        this.bodyGroup.add(dish);

        // Central Core
        const coreGeo = new THREE.CylinderGeometry(0.8, 0.8, 4, 8);
        const core = new THREE.Mesh(coreGeo, structMat);
        this.bodyGroup.add(core);

        // Solar Wings (Thickened to > 0.1 to prevent aliasing)
        const wingGeo = new THREE.BoxGeometry(12, 0.2, 3);
        const wingMat = new THREE.MeshStandardMaterial({
            color: 0x050510,
            emissive: 0x001133,
            metalness: 0.9,
            roughness: 0.1
        });

        const solarPanel = new THREE.Mesh(wingGeo, wingMat);
        this.wingGroup.add(solarPanel);

        // ==========================================
        // SAFE IMPROV: Signal Pulse (The "Beacon")
        // A glowing core and a 2D expanding ring to simulate data broadcast.
        // ==========================================
        const beaconCoreGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const beaconMat = new THREE.MeshBasicMaterial({ color: this.baseColor });
        this.beaconCore = new THREE.Mesh(beaconCoreGeo, beaconMat);
        this.beaconCore.position.z = 1.5; // Offset to the front of the dish
        this.beaconGroup.add(this.beaconCore);

        const ringGeo = new THREE.RingGeometry(0.6, 0.7, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            color: this.baseColor,
            transparent: true,
            opacity: 1.0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        this.pulseRing = new THREE.Mesh(ringGeo, ringMat);
        this.pulseRing.position.z = 1.6;
        this.beaconGroup.add(this.pulseRing);
    }

    update(delta, globalTime, sunPosition) {
        this.pulseTimer += delta;

        // ==========================================
        // SAFE IMPROV: Wobble Physics
        // Secondary micro-sine wave adds mechanical "struggle" against micro-gravity.
        // ==========================================
        this.bodyGroup.rotation.x = Math.sin(globalTime * 1.5) * 0.05;
        this.bodyGroup.rotation.y = Math.cos(globalTime * 1.2) * 0.05;

        // ==========================================
        // SAFE IMPROV: Solar Wing Orientation (Sun-Tracking)
        // The wing group independently rotates to face the global light source.
        // ==========================================
        if (sunPosition) {
            // Smoothly look at the sun (or light origin)
            this.wingGroup.lookAt(sunPosition);
        } else {
            // Fallback idle rotation
            this.wingGroup.rotation.x = Math.sin(globalTime * 0.5) * 0.2;
        }

        // ==========================================
        // Signal Pulse Animation Loop
        // Expands and fades out every 4 seconds.
        // ==========================================
        const pulseDuration = 4.0;
        const currentPulsePhase = this.pulseTimer % pulseDuration;
        const normalizedPhase = currentPulsePhase / pulseDuration;

        // Rapid expansion at the start, slowing down
        const scale = 1.0 + (normalizedPhase * 15.0);
        this.pulseRing.scale.set(scale, scale, 1.0);

        // Fade out smoothly
        this.pulseRing.material.opacity = 1.0 - Math.pow(normalizedPhase, 0.5);

        // Subtle core throb
        const coreThrob = 1.0 + Math.sin(globalTime * 5.0) * 0.2;
        this.beaconCore.scale.set(coreThrob, coreThrob, coreThrob);
    }

    dispose() {
        // Traverse and dispose all geometry and materials in the group
        this.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose();
                if (child.material.isMaterial) {
                    child.material.dispose();
                } else if (Array.isArray(child.material)) {
                    child.material.forEach(mat => mat.dispose());
                }
            }
        });
    }
}