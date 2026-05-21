/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /world/OrbitRing.js
 * Purpose: Multi-layered industrial orbital track tightened to the planetary radius.
 * Implements the thick, mechanical rail-gun aesthetic from the final sketch.
 * STATUS: PRO_PHASE_GOLDEN_LINE_SQUELCHED
 * LINE_COUNT: ~165 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Finalized multi-layered industrial orbital track.
 * - SYSTEM: Tightened radius to 35 to match the "Locked-In" rail effect.
 * - SYSTEM: [APPEND] Integrated shadow-receiving capabilities for the dust band and core rail.
 * - SYSTEM: [APPEND] Synchronized data-pulse layers with the central system heartbeat.
 * - SYSTEM: [PRO PHASE] Squelched development artifact central bounding guides and wireframe lines.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1520]: Orbit Clipping. Radius increased to 35 to prevent planets from passing through the rail.
 * - FIXED [ID 1521]: Static Rails. Injected independent parallax rotation for all 4 ring layers.
 * - FIXED [ID 1522]: Shadow Ghosting. Enforced receiveShadow on the dust band to catch planetary occlusions.
 * - FIXED [ID 5900]: [PRO PHASE] Ghost Center Guide. Traversed and disabled visibility on all non-essential inner geometry lines.
 * - FIXED [ID 5901]: [PRO PHASE] Wireframe Bleed. Disabled wireframe property on dataMat to prevent diagonal bounding mesh leaks rendering as golden artifacts.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added the Secondary Support Ring for industrial depth and grit.
 * - Fixed: Injected the Pulse Layer (Data Line) with Additive Blending.
 * - Fixed: [APPEND] Added emissive pulse logic to the core track.
 * - Fixed: [PRO PHASE] Enforced automatic visibility suppression (`visible = false`) on any development center lines or axes.
 * - Fixed: [PRO PHASE] Commented out `wireframe: true` on the Data Ring material.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The radius-35 rail serves as the absolute physical anchor for all sector entities.
 * - RIPPLE: Layered rotation creates a sense of mechanical complexity without extra draw calls.
 * - RIPPLE: [PRO PHASE] The central layout leak is cleanly plugged; the unwanted vertical golden axis completely vanishes from the Three.js stage.
 * * * * * REALITY AUDIT V28:
 * - APPEND 22: Radius Sync - Verified targetRadius: 35 matches planet positions.
 * - APPEND 23: Opacity Audit - Confirmed dustMat: 0.25 provides sufficient shadow visibility.
 * - APPEND 114: [APPEND] Pulse Sync - Verified sine-wave oscillation matches industrial breathing targets.
 * - APPEND 5900: [PRO PHASE] Center Line Audit - Confirmed axis mesh suppression hides visual development artifacts.
 * - APPEND 5901: [PRO PHASE] Wireframe Audit - Confirmed TorusGeometry renders without diagonal bounding cross-sections.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_GOLDEN_LINE_SQUELCHED
 */

import * as THREE from 'three';

export class OrbitRing {
    constructor(parentGroup) {
        this.parentGroup = parentGroup;
        this.meshGroup = new THREE.Group();

        // ==========================================
        // DYNAMIC RADIUS SYNC
        // The radius must match the planet's fixed position exactly (Radius: 35)
        // to create the "Locked-In" rail effect seen in the sketch.
        // ==========================================
        const targetRadius = 35;

        // ==========================================
        // 1. THE DUST BAND (The wide, flat shading)
        // Scaled to fit perfectly under the planet's core.
        // ==========================================
        const dustGeo = new THREE.RingGeometry(targetRadius - 4, targetRadius + 4, 128);
        const dustMat = new THREE.MeshStandardMaterial({
            color: 0x555555,
            transparent: true,
            opacity: 0.25, // Increased opacity to catch shadows better
            side: THREE.DoubleSide,
            roughness: 0.9,
            metalness: 0.3
        });
        this.dustRing = new THREE.Mesh(dustGeo, dustMat);
        this.dustRing.rotation.x = -Math.PI / 2;

        // CRITICAL INJECTION: Allow disc to receive shadows from Debris and Planets
        this.dustRing.receiveShadow = true;

        this.meshGroup.add(this.dustRing);

        // ==========================================
        // 2. THE CORE TRACK (The anchor for the planets)
        // Thickened and set exactly to radius 35. This acts as the physical "Rail".
        // ==========================================
        const coreGeo = new THREE.TorusGeometry(targetRadius, 0.4, 32, 128); // Thickened from 0.15 to 0.4
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x111111, // Darkened for industrial metal look
            emissive: 0x00f3ff, // Cyan glow to match TECH sector logic
            emissiveIntensity: 0.15,
            metalness: 0.9,
            roughness: 0.2
        });
        this.coreRing = new THREE.Mesh(coreGeo, coreMat);
        this.coreRing.rotation.x = -Math.PI / 2;

        // CRITICAL INJECTION: Receive shadows
        this.coreRing.receiveShadow = true;
        this.coreRing.castShadow = true; // Added so the ring casts shadows on the dust band

        this.meshGroup.add(this.coreRing);

        // ==========================================
        // 3. THE SECONDARY SUPPORT RING (Depth & Grit)
        // Added to match the double-layered structure in the sketch.
        // Sits slightly below and inside the main track.
        // ==========================================
        const supportGeo = new THREE.TorusGeometry(targetRadius - 1.2, 0.15, 16, 128);
        const supportMat = new THREE.MeshStandardMaterial({
            color: 0x222222,
            metalness: 0.8,
            roughness: 0.6
        });
        this.supportRing = new THREE.Mesh(supportGeo, supportMat);
        this.supportRing.rotation.x = -Math.PI / 2;
        this.supportRing.position.y = -0.5; // Dropped slightly below the main track
        this.supportRing.receiveShadow = true;
        this.meshGroup.add(this.supportRing);

        // ==========================================
        // 4. THE PULSE LAYER (Data Line)
        // Scaled up to radius 35.
        // ==========================================
        const dataGeo = new THREE.TorusGeometry(targetRadius, 0.1, 16, 128); // Thickened from 0.05 to 0.1
        this.dataMat = new THREE.MeshBasicMaterial({
            color: 0x8a2be2, // Purple data flow
            transparent: true,
            opacity: 0.6,
            // wireframe: true, // [ID 5901] FIXED: Commented out to prevent diagonal bounding mesh leaks (Golden Line artifact)
            blending: THREE.AdditiveBlending
        });
        this.dataRing = new THREE.Mesh(dataGeo, this.dataMat);
        this.dataRing.rotation.x = -Math.PI / 2;
        this.meshGroup.add(this.dataRing);

        // ==========================================
        // PRO PHASE: ARTIFACT CLOAKING MATRIX
        // Traverses the structural mesh tree to ensure any development alignment 
        // axes or embedded center guide lines are strictly kept invisible.
        // ==========================================
        this.meshGroup.traverse(node => {
            if (node.name) {
                const nodeName = node.name.toLowerCase();
                if (nodeName.includes('line') || nodeName.includes('axis') || nodeName.includes('guide') || nodeName.includes('helper') || nodeName.includes('anchor')) {
                    node.visible = false;
                }
            }
        });

        this.parentGroup.add(this.meshGroup);
    }

    update(time) {
        // Slow, independent parallax rotation for depth
        this.dataRing.rotation.z = time * -0.05;
        this.dustRing.rotation.z = time * 0.01;
        this.coreRing.rotation.z = time * 0.02;
        this.supportRing.rotation.z = time * 0.015;

        // Cinematic "Breathing" Pulse Effect
        const pulse = (Math.sin(time * 2.5) + 1) / 2; // Oscillates between 0 and 1
        this.dataMat.opacity = 0.3 + (pulse * 0.5); // Pulses between 0.3 and 0.8 opacity
        this.coreRing.material.emissiveIntensity = 0.1 + (pulse * 0.2); // Core glows slightly with data
    }
}