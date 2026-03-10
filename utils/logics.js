/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /utils/logics.js
 * Purpose: Master State Machine, Physics Tracking, and Hologram Data Dispatcher
 * * * * KRAYE LOG V28:
 * - SYSTEM: Holographic Shard state management online.
 * - SYSTEM: Integrated isZooming lock to prevent orbital drift during cinematic focus.
 * * * * CULPRIT LOG V28:
 * - FIXED [ID 501]: Randomization Bias. Implemented a weighted matrix for sector-appropriate anomalies.
 * - FIXED [ID 1401]: Rotation Conflict. Enforced isZooming lock to stop manual drag from interfering with cinematic centering.
 * * * * OMISSION LOG V28:
 * - Fixed: Added dispatchRandomGlitch() to broadcast interaction events to the system bus.
 * - Fixed: Integrated getHologramData() to feed contextual shards to the UI layer from profile.js.
 * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Logics.js (Root) monitors the isZooming state to toggle cinematic camera lerps and interaction gates.
 * - RIPPLE: SystemEvents.publish(EVENTS.GLOBAL_GLITCH) now includes contextual intensity for haptic scaling.
 * * * * REALITY AUDIT V28:
 * - APPEND 3: Probability Matrix - Weighted distributions enforced for TECH, CODE, and VISION sectors.
 * - APPEND 5: State Synchronization - getHologramData ensures skill and bio shards match the active planet identity.
 * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_LOGICS_HOLOGRAM_READY
 * - LINE_COUNT: ~185 Lines.
 */

import { SECTORS, ORBIT } from '../data/constants.js';
import { SystemEvents, EVENTS } from './events.js';
import { PROFILE } from '../data/profile.js';

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
            isUIFocused: false,         // Is the user touching a terminal/menu?
            isZooming: false            // Cinematic lock for Hologram View
        };

        this.listeners = []; // Holds functions that want to know when state changes

        // REGISTRY: The 10 Core Glitch Effects
        this.glitchPool = [
            'HEX_SHRED', 'BINARY_FLICKER', 'CHROMATIC_SPLIT',
            'VERTEX_JITTER', 'RELATIVISTIC_LENSING', 'ASCII_SCRAMBLE',
            'SHADOW_BANDING', 'HAPTIC_SQUASH', 'REPULSION_PULSE', 'FRUSTUM_FADING'
        ];
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

    setZooming(status) {
        this.state.isZooming = status;
        // Kill velocity if we enter zoom mode
        if (status) this.state.velocity = 0;
    }

    setDragging(status) {
        // REALITY AUDIT: Prevent drag if touching UI or if Camera is locked in Zoom
        if ((this.state.isUIFocused || this.state.isZooming) && status === true) return;
        this.state.isDragging = status;
    }

    addVelocity(delta) {
        // CULPRIT FIX: Locked during cinematic focus
        if (this.state.isUIFocused || this.state.isZooming) return;
        this.state.velocity += delta * ORBIT.DRAG_SENSITIVITY;
    }

    /**
     * SAFE IMPROV: Contextual Glitch Dispatcher
     * Picks a random effect based on the current sector's physics.
     */
    dispatchRandomGlitch(intensity = 1.0) {
        const sectorId = this.state.activeSector.id.toUpperCase();
        let effectId = 'HEX_SHRED'; // Default anomaly

        // REALITY AUDIT: Weighted Probability Matrix
        const rand = Math.random();

        if (sectorId === 'CODE') {
            // High Gravity / Chaos Bias
            if (rand > 0.6) effectId = 'RELATIVISTIC_LENSING';
            else if (rand > 0.3) effectId = 'VERTEX_JITTER';
            else effectId = 'CHROMATIC_SPLIT';
        } else if (sectorId === 'TECH') {
            // Data / Precision Bias
            if (rand > 0.7) effectId = 'BINARY_FLICKER';
            else if (rand > 0.4) effectId = 'ASCII_SCRAMBLE';
            else effectId = 'HAPTIC_SQUASH';
        } else {
            // General / Vision Bias
            if (rand > 0.5) effectId = 'HEX_SHRED';
            else effectId = 'FRUSTUM_FADING';
        }

        // Broadcast to all listening shards (HeroEffects, Audio, VFX)
        SystemEvents.publish(EVENTS.GLOBAL_GLITCH, {
            effectId,
            intensity,
            sectorId
        });
    }

    /**
     * REALITY AUDIT: Hologram Shard Constructor
     * Extracts quantized data bursts based on the active planet.
     */
    getHologramData() {
        const sector = this.state.activeSector.id.toLowerCase();

        return {
            identity: {
                title: "IDENTITY_CORE",
                name: PROFILE.name,
                status: "OS_V28 // ACTIVE"
            },
            diagnostics: {
                title: "SECTOR_DIAGNOSTICS",
                label: this.state.activeSector.name,
                type: this.state.activeSector.type,
                bio: PROFILE.bio[Math.floor(Math.random() * PROFILE.bio.length)]
            },
            skills: {
                title: "QUANTIZED_SKILLS",
                data: PROFILE.skills[sector] || []
            }
        };
    }

    // ==========================================
    // 3. MOMENTUM & PHYSICS UPDATE (Safe Improv)
    // ==========================================
    update() {
        if (!this.state.isDragging && !this.state.isZooming) {
            // Apply friction/damping to coast to a stop
            this.state.velocity *= (1 - ORBIT.DAMPING);

            // Magnetic Snap: If moving very slowly, snap to nearest sector
            if (Math.abs(this.state.velocity) < 0.0005 && Math.abs(this.state.velocity) > 0) {
                this.state.velocity = 0;
                this.snapToNearestSector();
            }
        }

        // Apply velocity to rotation (Blocked if Zooming)
        if (!this.state.isZooming) {
            this.state.rotationAngle += this.state.velocity;
        }

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

        // Force rotation to the exact offset
        this.state.rotationAngle = closestSector.angleOffset;

        if (this.state.activeSector.id !== closestSector.id) {
            this.state.activeSector = closestSector;
            this.notifyListeners();
        }
    }

    checkActiveSector() {
        // Primarily handled by snapToNearestSector() for phase stability
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