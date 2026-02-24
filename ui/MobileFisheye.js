/**
 * RIYAS_OS V28 - RIPPLE 4
 * File: /ui/MobileFisheye.js
 * Purpose: Adaptive Mobile FOV, Dynamic Horizon, Gyro Parallax, and Safe-Area Injection
 */

import * as THREE from 'three';

export class MobileFisheye {
    constructor(camera) {
        this.camera = camera;

        // Base settings
        this.baseFov = 75;
        this.maxFov = 95; // Capped to prevent edge-smearing
        this.targetFov = this.baseFov;

        this.isMobile = window.innerWidth <= 768;

        // Gyroscope tracking
        this.gyro = { x: 0, y: 0 };
        this.targetGyro = { x: 0, y: 0 };

        this.init();
    }

    init() {
        // ==========================================
        // REALITY AUDIT: The "Notch" and "Home Bar" Conflict Fix
        // Injects iOS/Android safe area insets directly into the root CSS variables.
        // UI elements (like SlideDrawer) will read these to prevent buttons 
        // from being trapped under native browser hardware features.
        // ==========================================

        this.injectSafeAreaVariables();

        window.addEventListener('resize', this.onResize.bind(this));
        this.onResize(); // Trigger initial layout

        // ==========================================
        // SAFE IMPROV: Gyroscope-Linked Parallax
        // Listens to hardware tilt. Only activates on mobile devices.
        // ==========================================
        if (window.DeviceOrientationEvent && this.isMobile) {
            // Some modern browsers require explicit permission for this
            window.addEventListener('deviceorientation', this.onDeviceOrientation.bind(this));
        }
    }

    injectSafeAreaVariables() {
        const root = document.documentElement;
        // Fallbacks are provided in CSS, but this ensures JS-level awareness if needed
        root.style.setProperty('--sat', 'env(safe-area-inset-top)');
        root.style.setProperty('--sab', 'env(safe-area-inset-bottom)');
        root.style.setProperty('--sal', 'env(safe-area-inset-left)');
        root.style.setProperty('--sar', 'env(safe-area-inset-right)');
    }

    onResize() {
        this.isMobile = window.innerWidth <= 768;

        // ==========================================
        // SAFE IMPROV: The "Dynamic Horizon" Shift
        // On mobile portrait, the camera's Y offset is shifted upward.
        // This anchors planets in the top 60% of the screen, leaving the 
        // bottom area completely free for the user's thumb to swipe unhindered.
        // ==========================================
        if (this.isMobile) {
            this.camera.setViewOffset(
                window.innerWidth,
                window.innerHeight,
                0,
                window.innerHeight * 0.15, // Shift the rendering center down (moves objects up)
                window.innerWidth,
                window.innerHeight
            );
        } else {
            this.camera.clearViewOffset();
        }

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    onDeviceOrientation(event) {
        if (!event.beta || !event.gamma) return;

        // Normalize gyroscope values (beta: front/back tilt, gamma: left/right tilt)
        // Clamp to a reasonable range (-45 to 45 degrees)
        let x = Math.max(-45, Math.min(45, event.beta - 45)); // Assuming 45deg is default holding angle
        let y = Math.max(-45, Math.min(45, event.gamma));

        // Convert to normalized -1.0 to 1.0 range
        this.targetGyro.x = x / 45.0;
        this.targetGyro.y = y / 45.0;
    }

    update(delta, swipeVelocity) {
        // ==========================================
        // SAFE IMPROV: Touch-Velocity Scaling
        // Expands the FOV when the user swipes fast, creating a "tunnel vision" 
        // or hyperspace effect during navigation.
        // ==========================================
        const speed = Math.abs(swipeVelocity);

        // Map velocity (0.0 to ~2.0) to FOV expansion
        const fovExpansion = Math.min(speed * 15.0, this.maxFov - this.baseFov);
        this.targetFov = this.baseFov + fovExpansion;

        // ==========================================
        // REALITY AUDIT: Capped FOV Interpolation Fix
        // Smoothly lerp the FOV to prevent jarring snaps and strictly cap it 
        // to prevent extreme edge-smearing distortions.
        // ==========================================
        this.camera.fov += (this.targetFov - this.camera.fov) * delta * 5.0;
        this.camera.updateProjectionMatrix();

        // Smoothly interpolate gyroscope data for parallax effect
        if (this.isMobile) {
            this.gyro.x += (this.targetGyro.x - this.gyro.x) * delta * 3.0;
            this.gyro.y += (this.targetGyro.y - this.gyro.y) * delta * 3.0;

            // Apply slight positional offset to camera based on tilt
            // Note: This relies on the main Logics.js retaining the camera's base orbit position
            this.camera.position.y += this.gyro.x * 2.0 * delta;
            this.camera.position.x += this.gyro.y * 2.0 * delta;
        }
    }
}