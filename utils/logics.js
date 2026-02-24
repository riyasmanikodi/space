/**
 * RIYAS_OS V28 - RIPPLE 0 / 1
 * File: /utils/logics.js
 * Purpose: Master State Machine, Physics Tracking, and Sector Snapping
 */

import { SECTORS, ORBIT } from '../data/constants.js';

class SystemLogic {
    constructor() {
        // ==========================================
        // 1. SINGLE SOURCE OF TRUTH (Reality Audit)
        // ==========================================
        this.state = {
            activeSector: SECTORS.TECH, // Start at the Hub
            rotationAngle: 0,           // Current 3D wheel position
            velocity: 0,                // Spin speed
            isDragging: false,          // Is the user currently swiping?
            isUIFocused: false          // Is the user touching a terminal/menu?
        };

        this.listeners = []; // Holds functions that want to know when state changes
    }

    // ==========================================
    // 2. STATE GETTERS & SETTERS
    // ==========================================
    getState() {
        return this.state;
    }

    setUIFocus(status) {
        this.state.isUIFocused = status;
    }

    setDragging(status) {
        // Prevent drag if touching UI
        if (this.state.isUIFocused && status === true) return;
        this.state.isDragging = status;
    }

    addVelocity(delta) {
        if (this.state.isUIFocused) return;
        this.state.velocity += delta * ORBIT.DRAG_SENSITIVITY;
    }

    // ==========================================
    // 3. MOMENTUM & PHYSICS UPDATE (Safe Improv)
    // Called every frame by Loop.js
    // ==========================================
    update() {
        if (!this.state.isDragging) {
            // Apply friction/damping to coast to a stop
            this.state.velocity *= (1 - ORBIT.DAMPING);

            // Magnetic Snap: If moving very slowly, snap to nearest sector
            if (Math.abs(this.state.velocity) < 0.0005 && Math.abs(this.state.velocity) > 0) {
                this.state.velocity = 0;
                this.snapToNearestSector();
            }
        }

        // Apply velocity to rotation
        this.state.rotationAngle += this.state.velocity;

        // Wrap logic (Reality Audit: prevents WebGL jitter)
        if (this.state.rotationAngle >= ORBIT.WRAP_LIMIT) {
            this.state.rotationAngle -= ORBIT.WRAP_LIMIT;
        } else if (this.state.rotationAngle < 0) {
            this.state.rotationAngle += ORBIT.WRAP_LIMIT;
        }

        // Determine which sector is currently in focus based on angle
        this.checkActiveSector();
    }

    // ==========================================
    // 4. SECTOR SNAP LOGIC
    // ==========================================
    snapToNearestSector() {
        let closestSector = SECTORS.TECH;
        let minDistance = Math.PI * 2;

        for (const key in SECTORS) {
            const sector = SECTORS[key];
            // Calculate shortest distance on a circle
            let dist = Math.abs(this.state.rotationAngle - sector.angleOffset);
            if (dist > Math.PI) dist = (Math.PI * 2) - dist;

            if (dist < minDistance) {
                minDistance = dist;
                closestSector = sector;
            }
        }

        // Force rotation to the exact offset (Optional: can be animated with Tween.js later)
        this.state.rotationAngle = closestSector.angleOffset;

        if (this.state.activeSector.id !== closestSector.id) {
            this.state.activeSector = closestSector;
            this.notifyListeners();
        }
    }

    checkActiveSector() {
        const previousSector = this.state.activeSector;
        // Logic to update active sector dynamically while spinning can go here
        // For now, snapping handles the primary sector change
    }

    // ==========================================
    // 5. EVENT SUBSCRIPTION
    // ==========================================
    subscribe(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.state.activeSector));
    }
}

// Export a single, frozen instance so all files share the exact same state
export const Logics = new SystemLogic();