/**
 * RIYAS_OS V28 - RIPPLE 1
 * File: /core/Camera.js
 * Purpose: Camera Rig, Mobile Fisheye Logic, and Elastic Momentum
 */

import * as THREE from 'three';
import { Time } from '../utils/time.js';

class CameraRig {
    constructor() {
        // ==========================================
        // REALITY AUDIT: The "Z-Fighting" Flicker Fix
        // Set strict near (0.1) and far (1000) clipping planes to optimize 
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
            1000
        );

        // Default position slightly above and pulled back
        this.basePosition = new THREE.Vector3(0, 5, 25);
        this.camera.position.copy(this.basePosition);
        this.camera.lookAt(0, 0, 0);

        // Elastic Rig variables
        this.targetTilt = 0;
        this.currentTilt = 0;

        this.setupResizeListener();
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

            this.camera.aspect = width / height;

            // Adjust FOV dynamically based on device width
            this.baseFOV = width < 768 ? 75 : 45;
            this.camera.fov = this.baseFOV;

            this.camera.updateProjectionMatrix();
        }, false);
    }

    update(velocity = 0) {
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