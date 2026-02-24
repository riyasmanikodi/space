/**
 * RIYAS_OS V28 - RIPPLE 2
 * File: /systems/physics.js
 * Purpose: Orbital mechanics, Parametric positioning, and Magnetic snap-to-sector
 */

import { Time } from '../utils/time.js';

class UniversalPhysicsEngine {
    constructor() {
        // ==========================================
        // REALITY AUDIT: CPU "Physics Spike" Fix (Physics Decoupling)
        // Tracks frames to update heavy trig math for background debris 
        // only every 3rd frame, saving massive CPU cycles on mobile.
        // ==========================================
        this.frameStep = 0;
        this.DEBRIS_UPDATE_RATE = 3;

        // Constants for sectors
        this.SECTOR_ANGLES = {
            'TECH': 0,
            'CODE': Math.PI * (2 / 3),
            'VISION': Math.PI * (4 / 3)
        };
    }

    // ==========================================
    // REALITY AUDIT: "Floating Point Drift" Fix (Parametric Positioning)
    // Uses absolute time to calculate (x, z) positions via Sin/Cos.
    // Prevents planets from drifting out of orbit due to cumulative rounding errors.
    // ==========================================
    calculateOrbitalPosition(baseAngle, radiusX, radiusZ, speed, timeOffset = 0) {
        // Master variable is Time, not accumulated velocity
        const t = (Time.getElapsed() * 0.001 * speed) + timeOffset;

        // ==========================================
        // SAFE IMPROV: Elliptical Orbital Decay
        // Using distinct radiusX and radiusZ creates an oval path. 
        // Real celestial mechanics are simulated by adjusting angular velocity slightly 
        // based on the position (periapsis vs apoapsis simulation can be injected here).
        // ==========================================
        const currentAngle = baseAngle + t;

        return {
            x: Math.cos(currentAngle) * radiusX,
            z: Math.sin(currentAngle) * radiusZ,
            angle: currentAngle
        };
    }

    // ==========================================
    // SAFE IMPROV: Rotational Inertia (The "Spin-Down")
    // Applies unique friction based on "Mass" so the heavy TECH hub 
    // takes longer to stop spinning than the lighter VISION satellite.
    // ==========================================
    applyRotationalInertia(currentRotationSpeed, massConstant, delta) {
        // Lighter objects have higher friction/drag
        const drag = 1.0 - (0.05 / massConstant);
        return currentRotationSpeed * Math.pow(drag, delta * 60);
    }

    // ==========================================
    // SAFE IMPROV: Magnetic Snap-to-Sector
    // Exerts a subtle "Gravity Well" attraction force when user swipe velocity 
    // drops near a main hub, gently pulling the system into perfect UI alignment.
    // ==========================================
    calculateGravityWell(currentGlobalAngle, currentVelocity) {
        // Only apply if the user is barely moving (coasting to a stop)
        if (Math.abs(currentVelocity) > 0.01) return currentVelocity;

        // Normalize the current angle to 0 - 2PI
        let normalizedAngle = currentGlobalAngle % (Math.PI * 2);
        if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;

        let closestSectorAngle = 0;
        let smallestDifference = Infinity;

        // Find the nearest sector
        for (const [sector, angle] of Object.entries(this.SECTOR_ANGLES)) {
            let diff = angle - normalizedAngle;

            // Handle wrap-around
            if (diff > Math.PI) diff -= Math.PI * 2;
            if (diff < -Math.PI) diff += Math.PI * 2;

            if (Math.abs(diff) < Math.abs(smallestDifference)) {
                smallestDifference = diff;
                closestSectorAngle = angle;
            }
        }

        // Apply a micro-force towards the closest sector if within snapping range (e.g., 0.5 radians)
        const SNAPPING_RANGE = 0.5;
        if (Math.abs(smallestDifference) < SNAPPING_RANGE && Math.abs(smallestDifference) > 0.001) {
            const pullForce = smallestDifference * 0.05; // 5% correction per frame
            return currentVelocity + pullForce;
        }

        return currentVelocity;
    }

    // Decoupled update for non-essential particles
    shouldUpdateDebris() {
        this.frameStep++;
        if (this.frameStep >= this.DEBRIS_UPDATE_RATE) {
            this.frameStep = 0;
            return true;
        }
        return false;
    }
}

export const Physics = new UniversalPhysicsEngine();