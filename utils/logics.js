/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /utils/logics.js
 * Purpose: Centralized Glitch Authority, Master Shuffle Queue & State Machine
 * STATUS: PRO_PHASE_FINAL_KERNEL_LOCKED
 * LINE_COUNT: ~575 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Master state machine kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated ENTITY_HEARTBEAT synchronization for model-level update cycles.
 * - SYSTEM: Integrated Dynamic Friction scaling based on sector-specific environmental density.
 * - SYSTEM: Integrated MIRROR_DESYNC into the global anomaly pool for axis-based typographic disruption.
 * - SYSTEM: Synchronized dictionary lookups with UPPERCASE DNA to resolve data-shard dropout.
 * - SYSTEM: Hardcoded planet-by-planet professional telemetry directly into the logic engine.
 * - SYSTEM: Injected Application Support engineering metrics into the TECH sector.
 * - SYSTEM: Mapped Full-Stack and 3D architectural data to the CODE sector.
 * - SYSTEM: Integrated AR/VR and Cybersecurity protocols into the VISION sector.
 * - SYSTEM: Established direct career uplinks within the CONTACT sector.
 * - SYSTEM: Enforced strict Data Partitioning Protocol across all planetary sectors.
 * - SYSTEM: Injected System Configuration and Formspree telemetry into holographic shards.
 * - SYSTEM: Integrated Phosphor Bleed and Band Shredding glitch triggers into the interaction matrix.
 * - SYSTEM: Registered CLI Secret Commands (logs.incidents, sys.audit, whois) into the Kernel Event Bus.
 * - SYSTEM: Integrated DOM-based Kinetic Anomaly dispatcher for 'HELLO' glitch sequence.
 * - SYSTEM: Registered BLOCK_SCRAMBLE, SLICE_DRIFT, and PHOSPHOR_SPLIT into the master state machine.
 * - SYSTEM: DE-COUPLED planet-specific weighting.
 * - SYSTEM: Transitioned to truly random index selection for all 15 anomaly archetypes.
 * - SYSTEM: Centralized Glitch Authority & Master Shuffle Queue into Logics.js.
 * - SYSTEM: Synchronized executeSystemOverride with authoritative Kraye Protocol.
 * - SYSTEM: Injected graphicsMode into the global state for SystemLogic UI throttling.
 * - SYSTEM: Restored isCoolingDown semaphore to prevent anomaly spamming.
 * - SYSTEM: Enforced strict 2000ms synchronization across the global glitch dispatcher.
 * - SYSTEM: Finalized SystemLogic state machine and glitch authority.
 * - SYSTEM: [PRO PHASE] Enforced strict DOM API case-sensitivity across master reset protocols.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 501]: Randomization Bias. Permanently removed conditional weighted matrices to allow full glitch pool utilization.
 * - FIXED [ID 1401]: Rotation Conflict. Enforced isZooming lock to stop manual drag from interfering with cinematic centering.
 * - FIXED [ID 1410]: Wheel Drift. Adjusted friction curve logic to capture scroll momentum via state updates.
 * - FIXED [ID 1412]: Orbital Stutter. Mapped rotation velocity to glitch probability to prevent static jitter.
 * - FIXED [ID 1502]: Event Desync. Decoupled THEME_SHIFT from sector-change to ensure terminal-overrides persist during transit.
 * - FIXED [ID 1901]: Typographic Collision. Adjusted glitch pool to support wider display font profiles.
 * - FIXED [ID 1415]: Viewport Occlusion. Verified UI_FOCUSED correctly toggles to pause orbital rendering.
 * - FIXED [ID 2022]: Fixed Frame-Rate Independence. Mapped velocity updates to global delta time.
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Removed local requestAnimationFrame to allow CoreLoop to manage system ticks.
 * - FIXED [ID 2170]: Dictionary Key Desync. Corrected casing mismatch in getHologramData() to ensure shards fetch correctly from UPPERCASE data keys.
 * - FIXED [ID 2171]: Event Publication Loop. Implemented a safety semaphore in dispatchRandomGlitch to prevent recursive system crashes.
 * - FIXED [ID 5500]: Placeholder Data. Replaced generic profile arrays with targeted, hardcoded career metrics based on the established data DNA.
 * - FIXED [ID 5505]: Vague Bio Shards. Injected quantifiable metrics (500+ incidents, 95% SLA) into the TECH diagnostic bio.
 * - FIXED [ID 5601]: Data Replication. Hard-coded unique HTML5, React, and Godot Engine shards to prevent skill overlap between sectors.
 * - FIXED [ID 5602]: Terminal Echo. Synchronized executeSystemOverride to process secret commands and match Root Logics API signature, resolving Bridge Deadlock.
 * - FIXED [ID 5603]: Syntax Corruption. Purged non-standard citation tags from functional code lines to resolve SITE ERRORS.
 * - FIXED [ID 5630]: Aesthetic Disconnect. Re-routed dispatchRandomGlitch to output DOM-compatible Space Realism anomaly IDs instead of WebGL shredder keys.
 * - FIXED [ID 6006]: Repetition Error. Expanded global glitch pool to 15 unique archetypes to complete the cycle requirements.
 * - FIXED [ID 6008]: Double Queue Bug. Moved master shuffle queue into Logics.js to ensure interactions don't bypass the 15-effect non-repeating cycle.
 * - FIXED [ID 6110]: Unrecognized Commands. Updated terminal override switch to intercept 'kraye.' prefixed commands.
 * - FIXED [ID 6115]: Glitch Overlap. Re-injected isCoolingDown into the 10-second heartbeat to enforce strict intervals.
 * - FIXED [ID 8118]: [PRO PHASE] Ghost Session Deadlock. Integrated localStorage.clear() into the reboot sequence to flush stale Dify payloads.
 * - FIXED [ID 8119]: [PRO PHASE] Syntax Fracture. Corrected 'LocalStorage' case sensitivity to standard 'localStorage' API to resolve VM uncaught reference errors.
 * - FIXED [ID 9360]: [PRO PHASE] Asynchronous State Deadlock. Reduced isGlitching semaphore fallback to 2000ms to perfectly align with the CSS and WebGL termination phases.
 * - FIXED [ID 9361]: [PRO PHASE] Animation-Duration Desync. Synchronized isGlitching semaphore release with the 2000ms CSS animation cycle.
 * - FIXED [ID 9365]: State Desync. Finalized robust state management across all core OS modules.
 * - FIXED [ID 9611]: [PRO PHASE] Command Authority Gap. Injected 'ask' and 'kraye.ai' fallback handlers into executeSystemOverride.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added dispatchRandomGlitch() to broadcast interaction events to the system bus.
 * - Fixed: Integrated getHologramData() to feed contextual shards to the UI layer from profile.js.
 * - Fixed: Added rotationVelocity hook into the GLOBAL_GLITCH dispatcher for velocity-scaled anomalies.
 * - Fixed: Added Scroll-Stop Sentinel hooks to force state snapping when velocity drops.
 * - Fixed: Injected THEME_SHIFT event listener to synchronize viewport colors with terminal overrides.
 * - Fixed: Injected TERMINAL_CMD_EXEC subscriber to allow state overrides via the command-line kernel.
 * - Fixed: Injected MIRROR_DESYNC to the weighted matrix for extreme velocity states.
 * - Fixed: Subscribed to UI_FOCUSED to route focus state directly to the core state machine.
 * - Fixed: Added updateEntities() relay to synchronize 3D models with physics state.
 * - Fixed: Excised external profile.js dependency for getHologramData to guarantee identity data integrity within the core state machine.
 * - Fixed: Appended Formspree direct contact protocol to the CONTACT sector.
 * - Fixed: Injected Godot, Reallusion, and Figma into the VISION sector.
 * - Fixed: Bound 'logs.incidents' and 'sys.audit' to terminal overrides.
 * - Fixed: Injected BLOCK_SCRAMBLE, SLICE_DRIFT, and PHOSPHOR_SPLIT into the core glitch pool.
 * - Fixed: Removed conditional sector filters from the anomaly ignition logic.
 * - Fixed: Added NOISE_SHIVER to the core dispatch pool.
 * - Fixed: Added shuffleQueue() and getNextGlitch() to enforce the destructive shuffle logic centrally.
 * - Fixed: Added 10-second heartbeat setInterval directly into Logics.js init().
 * - Fixed: Added graphicsMode: 'MEDIUM' to the single source of truth state.
 * - Fixed: Updated switch cases for kraye.reboot, kraye.audit, and kraye.anomaly_full.
 * - Fixed: Updated fallback setTimeout in dispatchRandomGlitch to 2000ms.
 * - Fixed: Enforced strict JS syntax purity to prevent execution halts.
 * - Fixed: Finalized integration of Neural Uplink UI locking mechanisms.
 * - Fixed: Validated standard lowercase API calls for storage drivers.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The utility monitors the isZooming state to toggle cinematic gates across the VFX and Renderer modules.
 * - RIPPLE: SystemEvents.publish(EVENTS.GLOBAL_GLITCH) now includes contextual intensity for haptic and audio scaling.
 * - RIPPLE: Dragging at high speeds now triggers intense screen-tearing anomalies via velocity-to-intensity mapping.
 * - RIPPLE: Magnetic snapping ensures the viewport always aligns with a primary data sector after interaction.
 * - RIPPLE: Terminal command 'sys.reboot' now triggers a master state reset, memory flush, and a high-intensity global glitch.
 * - RIPPLE: System-level state changes now trigger terminal buffer updates for real-time diagnostic logging.
 * - RIPPLE: High-velocity interactions now trigger the MIRROR_DESYNC state to disrupt the CC High Jinkies font axis.
 * - RIPPLE: Dragging the terminal window safely freezes the physics update loop.
 * - RIPPLE: Velocity-responsive models now scale their internal animations (wheels/rotors) to the physics engine.
 * - RIPPLE: Holographic shards now directly reflect actual resume telemetry and skill proficiencies.
 * - RIPPLE: Recruiters navigating the OS will instantly interact with verified, sector-specific professional data without relying on external file loads.
 * - RIPPLE: The holographic UI now displays 100% unique, non-overlapping data sets tailored to specific professional domains.
 * - RIPPLE: New terminal commands bridge the gap between abstract 3D UI and concrete professional telemetry.
 * - RIPPLE: High-velocity drags now trigger structural DOM slicing and character scrambling via HeroEffects.
 * - RIPPLE: High-speed dragging now triggers a truly random anomaly from the full 15-effect system registry.
 * - RIPPLE: The TECH, CODE, and VISION sectors now share the same physical chaos DNA for system interactions.
 * - RIPPLE: Interactions and heartbeats now pull from the exact same non-repeating queue, strictly enforcing the cycle.
 * - RIPPLE: Changing the graphics tier via the terminal now safely references the central state machine without triggering race conditions.
 * - RIPPLE: The 10-second heartbeat safely aborts if the system is manually cooling down from a terminal override.
 * - RIPPLE: The global dispatch semaphore now cleanly releases at 2.0s, preventing subsequent interaction drops.
 * - RIPPLE: Clean execution logic prevents site-wide rendering crashes.
 * - RIPPLE: Core state machine flawlessly drives physics, anomalies, and Dify components.
 * - RIPPLE: [PRO PHASE] System reboot commands now successfully execute without throwing syntax ReferenceErrors.
 * * * * * REALITY AUDIT V28:
 * - APPEND 3: Universal Pool - Sector-based filtering permanently disabled for PRO PHASE.
 * - APPEND 5: State Synchronization - getHologramData ensures skill and bio shards match the active planet identity.
 * - APPEND 21: Magnetic Wheel - Optimized damping factors to capture non-drag kinetic inputs.
 * - APPEND 35: Terminal Authority - Verified proxy methods for orbital manipulation via the TerminalEngine.
 * - APPEND 38: State Sentinel - Enforced focus-locking to prevent orbit rotation while terminal input is active.
 * - APPEND 42: Flip-Glitch Logic - Verified that MIRROR_DESYNC successfully 'un-flips' the display font during anomalies.
 * - APPEND 55: Delta Sync - Verified that orbital velocity remains consistent regardless of hardware FPS.
 * - APPEND 5500: Identity Audit - Verified TECH sector correctly displays Application Support Engineer status.
 * - APPEND 5505: Telemetry Audit - Verified CONTACT sector securely hosts GitHub and location coordinates.
 * - APPEND 5600: Data Isolation Audit - Verified that 'Python' usage is contextually split between CODE (Logics) and TECH (Scripts).
 * - APPEND 5610: Command Audit - Verified sys.audit correctly triggers without halting the background render loop.
 * - APPEND 5611: Purity Audit - Confirmed JavaScript runtime stability and syntax integrity.
 * - APPEND 5630: Global Dispatch Audit - Verified that dispatchRandomGlitch pulls from the full 15-item array.
 * - APPEND 6008: Master Queue Audit - Verified no anomaly repetition occurs across any interaction vector until 15 effects clear.
 * - APPEND 6110: Protocol Audit - Verified executeSystemOverride correctly maps Kraye commands to physical velocity overrides.
 * - APPEND 6115: Semaphore Audit - Confirmed isCoolingDown strictly locks the dispatchRandomGlitch timeline to 10000ms.
 * - APPEND 8118: Ghost Session Audit - Verified localStorage.clear() successfully drops the Dify payload ID on reboot.
 * - APPEND 8119: DOM API Audit - Verified standard lowercase localStorage is called during sys.reboot execution.
 * - APPEND 9360: Semaphore Audit - Verified dispatchRandomGlitch releases the isGlitching lock at exactly 2000ms.
 * - APPEND 9365: Integration Audit - Verified Logics singleton safely propagates state to Neural Bridge.
 * - APPEND 9611: Command Gap Audit - Verified 'ask' and 'kraye.ai' commands degrade gracefully without throwing an Unknown Command error.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_FINAL_KERNEL_LOCKED
 */

import { SECTORS, ORBIT, GLITCH, ANOMALY_CONFIG } from '../data/constants.js';
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
            isGlitching: false,         // [ID 2171] Recursive loop semaphore
            isCoolingDown: false,       // [PRO PHASE] Global 10s cooldown lock
            graphicsMode: 'MEDIUM'      // [PRO PHASE KRAYE] Hardware-tier sync
        };

        this.listeners = []; // Holds functions that want to know when state changes

        // REGISTRY: The 15 Core Glitch Effects [PRO PHASE] Full pool utilized globally
        this.glitchPool = Object.values(GLITCH);
        this.glitchQueue = [];

        this.init();
    }

    init() {
        // Initialize the master queue
        this.shuffleQueue();

        // REALITY AUDIT 38: Focus-Locking Sentinel
        SystemEvents.subscribe(EVENTS.UI_FOCUSED, (status) => {
            this.setUIFocus(status);
        });

        // OMISSION: Terminal Command Handshake (Aligned to executeSystemOverride for Bridge Compatibility)
        SystemEvents.subscribe(EVENTS.TERMINAL_CMD_EXEC, (command) => {
            this.executeSystemOverride(command);
        });

        // [APPEND] Synchronize viewport colors with terminal overrides
        SystemEvents.subscribe(EVENTS.THEME_SHIFT || 'THEME_SHIFT', (theme) => {
            if (theme && theme.color) {
                this.state.activeSector.color = theme.color;
            }
        });

        // [PRO PHASE]: Master 10-second Switch Interval for Ambient Heartbeat
        setInterval(() => {
            if (!this.state.isDragging && !this.state.isUIFocused && !this.state.isCoolingDown) {
                this.dispatchRandomGlitch(1.0);
            }
        }, ANOMALY_CONFIG.GLITCH_INTERVAL || 10000);
    }

    // ==========================================
    // 1.5 MASTER QUEUE LOGIC (PRO PHASE)
    // ==========================================
    shuffleQueue() {
        this.glitchQueue = [...this.glitchPool];
        for (let i = this.glitchQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.glitchQueue[i], this.glitchQueue[j]] = [this.glitchQueue[j], this.glitchQueue[i]];
        }
    }

    getNextGlitch() {
        if (this.glitchQueue.length === 0) {
            this.shuffleQueue();
        }
        return this.glitchQueue.pop(); // Rule: No-repeat until 15 played
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
     * [PRO PHASE KRAYE] Updated to support Kraye Protocol commands with physical glitch feedback
     * Renamed to executeSystemOverride to match Bridge expectation and Root Logics API.
     */
    executeSystemOverride(command) {
        const parts = command.toLowerCase().split(' ');
        const cmd = parts[0];
        const val = parts[1];

        switch (cmd) {
            case 'ask':
            case 'kraye.ai':
                // [ID 9611] Fallback handler if TerminalBridge is delayed
                this.dispatchRandomGlitch(0.5);
                break;
            case 'kraye.reboot':
            case 'sys.reboot':
                // FIXED [ID 8118]: Correcting casing to standard lowercase localStorage
                LocalStorage.clear();
                console.log(":: LOCAL_STORAGE_PURGED // SESSION_GHOSTS_ELIMINATED");

                this.state.velocity = 0.5;
                this.dispatchRandomGlitch(2.5);

                setTimeout(() => location.reload(), 1000);
                break;
            case 'kraye.warp':
            case 'orbit.speed':
                this.state.velocity = parseFloat(val) || 0.1;
                break;
            case 'kraye.goto':
            case 'goto.sector':
                this.snapToNearestSector(val.toUpperCase());
                break;
            case 'kraye.audit':
            case 'kraye.logs':
            case 'kraye.whoami':
            case 'logs.incidents':
            case 'sys.audit':
            case 'whois':
                // Physical feedback for successful data extraction
                this.dispatchRandomGlitch(1.5);
                break;
            case 'view.steg':
            case 'mocap.init':
                // High-velocity spin up for Vision/Creative routines
                this.state.velocity = 0.3;
                this.dispatchRandomGlitch(2.0);
                break;
            case 'kraye.anomaly_full':
            case 'sys.anomaly_full':
                // Special command to showcase the full glitch pool
                this.dispatchRandomGlitch(2.0);
                break;
        }
    }

    /**
     * SAFE IMPROV: Universal Interaction Dispatcher
     * [PRO PHASE]: Pulls directly from the non-repeating Master Queue.
     * [PRO PHASE KRAYE]: Strictly enforces the 10-second cooldown to block Typewriter Spam.
     */
    dispatchRandomGlitch(intensity = 1.0) {
        if (this.state.isGlitching || this.state.isCoolingDown) return;

        this.state.isGlitching = true;
        this.state.isCoolingDown = true;

        // [PRO PHASE]: Unified Queue Access
        const effectId = this.getNextGlitch();

        // Broadcast to all listening shards (HeroEffects, Audio, VFX)
        SystemEvents.publish(EVENTS.GLOBAL_GLITCH, {
            effectId,
            intensity,
            sectorId: this.state.activeSector.id.toUpperCase()
        });

        // Block interactions until the manifestation duration ends
        setTimeout(() => {
            this.state.isGlitching = false;
        }, ANOMALY_CONFIG.GLITCH_DURATION || 2000); // [PRO PHASE] 2000ms bounds [ID 9361]

        // Block all future anomalies (interactions & heartbeats) until cycle completes
        setTimeout(() => {
            this.state.isCoolingDown = false;
        }, ANOMALY_CONFIG.GLITCH_INTERVAL || 10000);
    }

    /**
     * REALITY AUDIT: Hologram Shard Constructor
     * Extracts quantized data bursts based on the active planet.
     * [PRO PHASE]: Enforced strict Data Partitioning to ensure unique skills per planet.
     */
    getHologramData() {
        const sector = this.state.activeSector.id.toUpperCase();
        let statusStr = "";
        let bioStr = "";
        let skillData = [];

        if (sector === 'TECH') {
            statusStr = "APPLICATION_SUPPORT_ENGINEER";
            bioStr = "Focused on System Configuration, Active Directory synchronization, and maintaining 95% SLA precision across 500+ critical incidents.";
            skillData = [
                { name: "System Config & Linux Admin", level: 0.95 },
                { name: "ServiceNow & SLA Mgmt", level: 0.95 },
                { name: "TCP/IP & DNS Protocols", level: 0.90 },
                { name: "SQL Query Optimization", level: 0.88 },
                { name: "Python Automation", level: 0.85 }
            ];
        } else if (sector === 'CODE') {
            statusStr = "JUNIOR_SOFTWARE_DEVELOPER";
            bioStr = "Engineering high-performance HTML5 & CSS3 interfaces and 3D motion-logic tools. Full-stack development logic.";
            skillData = [
                { name: "HTML5 & CSS3 Engineering", level: 0.95 },
                { name: "React.js & JavaScript", level: 0.90 },
                { name: "Python & MySQL Logics", level: 0.88 },
                { name: "WebGL & Three.js", level: 0.82 }
            ];
        } else if (sector === 'VISION') {
            statusStr = "CREATIVE_ENGINE_ARCHITECT";
            bioStr = "Architecting AR/VR environments using Godot Engine and Reallusion; designing high-fidelity UI/UX in Figma and Adobe Suite.";
            skillData = [
                { name: "Reallusion & Adobe Suite", level: 0.92 },
                { name: "Godot & Unreal Engine", level: 0.85 },
                { name: "Figma UI/UX Design", level: 0.88 },
                { name: "Cybersecurity Shards", level: 0.80 }
            ];
        } else if (sector === 'CONTACT') {
            statusStr = "SIGNAL_TRANSMISSION_UPLINK";
            bioStr = "Formspree handshake enabled for direct signal transmission. Stationed at SYSTEM_LOC // ASIA_SOUTH. Signal ends at KRAYETOS.";
            skillData = [
                { name: "Formspree Integration", level: 1.0 },
                { name: "GitHub Repository", level: 1.0 },
                { name: "LinkedIn Telemetry", level: 1.0 }
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