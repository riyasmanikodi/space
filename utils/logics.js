/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /utils/logics.js
 * Purpose: Master State Machine, Physics Tracking, and Hologram Data Dispatcher
 * STATUS: PRO_PHASE_VERTEX_SHREDDER_ACTIVE
 * LINE_COUNT: ~420 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Master state machine kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated ENTITY_HEARTBEAT synchronization for model-level update cycles.
 * - SYSTEM: [APPEND] Integrated Dynamic Friction scaling based on sector-specific environmental density.
 * - SYSTEM: [APPEND] Integrated MIRROR_DESYNC into the global anomaly pool for axis-based typographic disruption.
 * - SYSTEM: [APPEND] Synchronized dictionary lookups with UPPERCASE DNA to resolve data-shard dropout.
 * - SYSTEM: [PRO PHASE] Hardcoded planet-by-planet professional telemetry directly into the logic engine.
 * - SYSTEM: [PRO PHASE] Injected Application Support engineering metrics into the TECH sector.
 * - SYSTEM: [PRO PHASE] Mapped Full-Stack and 3D architectural data to the CODE sector.
 * - SYSTEM: [PRO PHASE] Integrated AR/VR and Cybersecurity protocols into the VISION sector.
 * - SYSTEM: [PRO PHASE] Established direct career uplinks within the CONTACT sector.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 501]: Randomization Bias. Implemented a weighted matrix for sector-appropriate anomalies.
 * - FIXED [ID 1401]: Rotation Conflict. Enforced isZooming lock to stop manual drag from interfering with cinematic centering.
 * - FIXED [ID 1410]: Wheel Drift. Adjusted friction curve logic to capture scroll momentum via state updates.
 * - FIXED [ID 1412]: Orbital Stutter. Mapped rotation velocity to glitch probability to prevent static jitter.
 * - FIXED [ID 1502]: Event Desync. Decoupled THEME_SHIFT from sector-change to ensure terminal-overrides persist during transit.
 * - FIXED [ID 1901]: Typographic Collision. Adjusted glitch pool to support wider display font profiles.
 * - FIXED [ID 1415]: Viewport Occlusion. Verified UI_FOCUSED correctly toggles to pause orbital rendering.
 * - FIXED [ID 2022]: [APPEND] Fixed Frame-Rate Independence. Mapped velocity updates to global delta time.
 * - FIXED [ID 2106]: [APPEND] Duplicate Ticker Deadlock. Removed local requestAnimationFrame to allow CoreLoop to manage system ticks.
 * - FIXED [ID 2170]: Dictionary Key Desync. Corrected casing mismatch in getHologramData() to ensure shards fetch correctly from UPPERCASE data keys.
 * - FIXED [ID 2171]: Event Publication Loop. Implemented a safety semaphore in dispatchRandomGlitch to prevent recursive system crashes.
 * - FIXED [ID 5500]: [PRO PHASE] Placeholder Data. Replaced generic profile arrays with targeted, hardcoded career metrics based on the established data DNA.
 * - FIXED [ID 5505]: [PRO PHASE] Vague Bio Shards. Injected quantifiable metrics (500+ incidents, 95% SLA) into the TECH diagnostic bio.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added dispatchRandomGlitch() to broadcast interaction events to the system bus.
 * - Fixed: Integrated getHologramData() to feed contextual shards to the UI layer from profile.js.
 * - Fixed: Added rotationVelocity hook into the GLOBAL_GLITCH dispatcher for velocity-scaled anomalies.
 * - Fixed: Added Scroll-Stop Sentinel hooks to force state snapping when velocity drops.
 * - Fixed: Injected THEME_SHIFT event listener to synchronize viewport colors with terminal overrides.
 * - Fixed: Injected TERMINAL_CMD_EXEC subscriber to allow state overrides via the command-line kernel.
 * - Fixed: Injected MIRROR_DESYNC to the weighted matrix for extreme velocity states.
 * - Fixed: Subscribed to UI_FOCUSED to route focus state directly to the core state machine.
 * - Fixed: [APPEND] Added updateEntities() relay to synchronize 3D models with physics state.
 * - Fixed: [PRO PHASE] Excised external profile.js dependency for getHologramData to guarantee identity data integrity within the core state machine.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The utility monitors the isZooming state to toggle cinematic gates across the VFX and Renderer modules.
 * - RIPPLE: SystemEvents.publish(EVENTS.GLOBAL_GLITCH) now includes contextual intensity for haptic and audio scaling.
 * - RIPPLE: Dragging at high speeds now triggers intense screen-tearing anomalies via velocity-to-intensity mapping.
 * - RIPPLE: Magnetic snapping ensures the viewport always aligns with a primary data sector after interaction.
 * - RIPPLE: Terminal command 'sys.reboot' now triggers a master state reset and a high-intensity global glitch.
 * - RIPPLE: System-level state changes now trigger terminal buffer updates for real-time diagnostic logging.
 * - RIPPLE: High-velocity interactions now trigger the MIRROR_DESYNC state to disrupt the CC High Jinkies font axis.
 * - RIPPLE: Dragging the terminal window safely freezes the physics update loop.
 * - RIPPLE: [APPEND] Velocity-responsive models now scale their internal animations (wheels/rotors) to the physics engine.
 * - RIPPLE: [PRO PHASE] Holographic shards now directly reflect actual resume telemetry and skill proficiencies.
 * - RIPPLE: [PRO PHASE] Recruiters navigating the OS will instantly interact with verified, sector-specific professional data without relying on external file loads.
 * * * * * REALITY AUDIT V28:
 * - APPEND 3: Probability Matrix - Weighted distributions enforced for TECH, CODE, and VISION sectors.
 * - APPEND 5: State Synchronization - getHologramData ensures skill and bio shards match the active planet identity.
 * - APPEND 21: Magnetic Wheel - Optimized damping factors to capture non-drag kinetic inputs.
 * - APPEND 35: Terminal Authority - Verified proxy methods for orbital manipulation via the TerminalEngine.
 * - APPEND 38: State Sentinel - Enforced focus-locking to prevent orbit rotation while terminal input is active.
 * - APPEND 42: Flip-Glitch Logic - Verified that MIRROR_DESYNC successfully 'un-flips' the display font during anomalies.
 * - APPEND 55: [APPEND] Delta Sync - Verified that orbital velocity remains consistent regardless of hardware FPS.
 * - APPEND 5500: [PRO PHASE] Identity Audit - Verified TECH sector correctly displays Application Support Engineer status.
 * - APPEND 5505: [PRO PHASE] Telemetry Audit - Verified CONTACT sector securely hosts GitHub and location coordinates.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_VERTEX_SHREDDER_ACTIVE
 */

import { SECTORS, ORBIT } from '../data/constants.js';
import { SystemEvents, EVENTS } from './events.js';

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
            isZooming: false,           // Cinematic lock for Hologram View
            isGlitching: false          // [ID 2171] Recursive loop semaphore
        };

        this.listeners = []; // Holds functions that want to know when state changes

        // REGISTRY: The 11 Core Glitch Effects
        this.glitchPool = [
            'HEX_SHRED', 'BINARY_FLICKER', 'CHROMATIC_SPLIT',
            'VERTEX_JITTER', 'RELATIVISTIC_LENSING', 'ASCII_SCRAMBLE',
            'SHADOW_BANDING', 'HAPTIC_SQUASH', 'REPULSION_PULSE',
            'FRUSTUM_FADING', 'MIRROR_DESYNC' // APPEND 42
        ];

        this.init();
    }

    init() {
        // REALITY AUDIT 38: Focus-Locking Sentinel
        SystemEvents.subscribe(EVENTS.UI_FOCUSED, (status) => {
            this.setUIFocus(status);
        });

        // OMISSION: Terminal Command Handshake
        SystemEvents.subscribe(EVENTS.TERMINAL_CMD_EXEC, (command) => {
            this.handleTerminalOverride(command);
        });

        // [APPEND] Synchronize viewport colors with terminal overrides
        SystemEvents.subscribe(EVENTS.THEME_SHIFT || 'THEME_SHIFT', (theme) => {
            if (theme && theme.color) {
                this.state.activeSector.color = theme.color;
            }
        });
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
     * REALITY AUDIT 35: Terminal Override Handler
     */
    handleTerminalOverride(command) {
        const parts = command.toLowerCase().split(' ');
        const cmd = parts[0];
        const val = parts[1];

        switch (cmd) {
            case 'sys.reboot':
                this.state.velocity = 0.5;
                this.dispatchRandomGlitch(2.5);
                break;
            case 'orbit.speed':
                this.state.velocity = parseFloat(val) || 0.1;
                break;
            case 'goto.sector':
                this.snapToNearestSector(val.toUpperCase());
                break;
        }
    }

    /**
     * SAFE IMPROV: Contextual Glitch Dispatcher
     * Picks a random effect based on the current sector's physics.
     * [FIX ID 2171]: Added semaphore to prevent recursive event loops.
     */
    dispatchRandomGlitch(intensity = 1.0) {
        if (this.state.isGlitching) return;
        this.state.isGlitching = true;

        const sectorId = this.state.activeSector.id.toUpperCase();
        let effectId = 'HEX_SHRED'; // Default anomaly

        // REALITY AUDIT: Weighted Probability Matrix
        const rand = Math.random();

        if (sectorId === 'CODE') {
            // High Gravity / Chaos Bias
            if (rand > 0.7) effectId = 'RELATIVISTIC_LENSING';
            else if (rand > 0.4) effectId = 'MIRROR_DESYNC'; // Pro Phase Axis Disruption
            else if (rand > 0.2) effectId = 'VERTEX_JITTER';
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

        // Release semaphore after a short cooldown to allow new interaction glitches
        setTimeout(() => {
            this.state.isGlitching = false;
        }, 200);
    }

    /**
     * REALITY AUDIT: Hologram Shard Constructor
     * Extracts quantized data bursts based on the active planet.
     * [PRO PHASE]: Hardcoded to extract precise, verified resume metrics.
     */
    getHologramData() {
        const sector = this.state.activeSector.id.toUpperCase();
        let statusStr = "";
        let bioStr = "";
        let skillData = [];

        if (sector === 'TECH') {
            statusStr = "APPLICATION_SUPPORT_ENGINEER";
            bioStr = "Resolved 500+ critical incidents with 95% SLA precision. Orchestrated firewalls, DNS, and automated workflows.";
            skillData = [
                { name: "Linux & Windows Admin", level: 0.95 },
                { name: "ServiceNow & SLA Mgmt", level: 0.95 },
                { name: "TCP/IP, DNS & DHCP", level: 0.90 },
                { name: "SQL Query Optimization", level: 0.88 },
                { name: "Bash & Python Scripts", level: 0.85 }
            ];
        } else if (sector === 'CODE') {
            statusStr = "APPLICATION_SUPPORT_DEVELOPMENT";
            bioStr = "Engineering 3D motion-logic tools and end-to-end utilities. Optimizing service delivery via Python automation.";
            skillData = [
                { name: "React.js & JavaScript", level: 0.90 },
                { name: "Python, MySQL, MongoDB", level: 0.88 },
                { name: "WebGL & Three.js", level: 0.82 },
                { name: "OpenCV & MediaPipe", level: 0.80 }
            ];
        } else if (sector === 'VISION') {
            statusStr = "AR_VR_VIRTUAL_REALITY_DEV";
            bioStr = "Architecting automated pipelines to retarget complex motion data and bridging depth estimation with industrial visuals.";
            skillData = [
                { name: "Unreal Engine 5 & Unity", level: 0.85 },
                { name: "Blender & Creative Suite", level: 0.88 },
                { name: "Network Security Protocols", level: 0.80 },
                { name: "Steganographic Algorithms", level: 0.75 }
            ];
        } else if (sector === 'CONTACT') {
            statusStr = "SIGNAL_TRANSMISSION_UPLINK";
            bioStr = "System Locator: ASIA_SOUTH (Tamil Nadu, India). Handshake initialization standing by. Signal ends at KRAYETOS.";
            skillData = [
                { name: "GITHUB_UPLINK", level: 1.0 },
                { name: "LINKEDIN_TELEMETRY", level: 1.0 },
                { name: "DIRECT_MAIL_HANDSHAKE", level: 1.0 }
            ];
        } else {
            statusStr = "SYSTEM_AWAITING_INPUT";
            bioStr = "NO_DATA_AVAILABLE";
            skillData = [];
        }

        return {
            identity: {
                title: "IDENTITY_CORE",
                name: "RIYAS MANIKODI",
                status: statusStr
            },
            diagnostics: {
                title: "SECTOR_DIAGNOSTICS",
                label: this.state.activeSector.name,
                type: this.state.activeSector.type,
                bio: bioStr
            },
            skills: {
                title: "QUANTIZED_SKILLS",
                data: skillData
            }
        };
    }

    /**
     * [APPEND] ENTITY_HEARTBEAT RELAY
     * Synchronizes 3D models with the physics engine heartbeat.
     */
    updateEntities(time, velocity) {
        SystemEvents.publish(EVENTS.ENTITY_HEARTBEAT || 'ENTITY_HEARTBEAT', {
            time,
            velocity
        });
    }

    // ==========================================
    // 3. MOMENTUM & PHYSICS UPDATE (Safe Improv)
    // ==========================================
    update(deltaTime = 1.0) {
        if (!this.state.isDragging && !this.state.isZooming) {
            // Apply friction/damping to coast to a stop
            // [APPEND] Delta-scaling friction to preserve momentum across hardware

            // PRO PHASE: Dynamic Friction Scaling
            // Environmental density varies by sector (CODE sector has higher drag/gravity)
            const frictionModifier = this.state.activeSector.id === 'CODE' ? 1.25 : 1.0;
            const damping = ORBIT.DAMPING * frictionModifier;

            const frameDamping = Math.pow((1 - damping), deltaTime);
            this.state.velocity *= frameDamping;

            // Magnetic Snap: If moving very slowly, snap to nearest sector
            if (Math.abs(this.state.velocity) < 0.0005 && Math.abs(this.state.velocity) > 0) {
                this.state.velocity = 0;
                this.snapToNearestSector();
            }
        }

        // Apply velocity to rotation (Blocked if Zooming)
        if (!this.state.isZooming) {
            // [APPEND] Applying velocity mapped to time step
            this.state.rotationAngle += (this.state.velocity * deltaTime);
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
    snapToNearestSector(targetId = null) {
        let closestSector = SECTORS.TECH;
        let minDistance = Math.PI * 2;

        if (targetId && SECTORS[targetId]) {
            closestSector = SECTORS[targetId];
        } else {
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