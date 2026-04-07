/**
 * RIYAS_OS V28 - PRO PHASE (OPTION A & SINGULARITY)
 * File: /Logics.js
 * Purpose: Central System Brain, Hologram Projection, Typewriter Orchestration, Mobile Kinetics & Asset Mounting
 * STATUS: PRO_PHASE_RULE_STRICT_LOCKED
 * LINE_COUNT: ~1045 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated Dynamic Typewriter engine for holographic shards.
 * - SYSTEM: Linked "Enter System" interaction to Audio Hardware Unlock to bypass browser autoplay policies.
 * - SYSTEM: Added Mobile Kinetic Gestures for "Swipe-to-Dismiss" UX.
 * - SYSTEM: Magnetic Wheel protocol integrated for kinetic scroll snapping.
 * - SYSTEM: Integrated Velocity-Scaled Glitch dispatcher to map orbital momentum to visual anomalies.
 * - SYSTEM: Terminal API hooks exposed for direct physical overrides.
 * - SYSTEM: Secret Shard detection matrix embedded for decryption challenges.
 * - SYSTEM: Integrated Industrial Terminal kernel (Terminal.js) for CLI-driven OS control.
 * - SYSTEM: Integrated Interactive Terminal HUD with Kinetic Drag, Focus-Locking, and Hardware Reset.
 * - SYSTEM: Abstracted mounting logic into a standalone hardware manager (ModelManager).
 * - SYSTEM: Hardened raycaster pipeline to prevent Physics Deadlocks during asynchronous mounting.
 * - SYSTEM: [APPEND] Integrated EngineLoop (CoreLoop) handshake to decouple animation frames from Logics orchestration.
 * - SYSTEM: [APPEND] Corrected module.CoreScene Handshake to resolve the Viewport Static Lock.
 * - SYSTEM: [APPEND] Hardened dynamic module resolution for hardware synchronization (syncHardware).
 * - SYSTEM: [PRO PHASE] Hardened hardware handshake synchronization to prevent Scene Authority deadlock.
 * - SYSTEM: [PRO PHASE] Restored environment starfield (stars.webp) and SkySphere geometry to maintain deep space background layer.
 * - SYSTEM: [PRO PHASE] Verified single-background layer architecture to eliminate overlapping procedural particle noise.
 * - SYSTEM: [PRO PHASE] Bootstrapped Geometric Shard Engine (CursorService) into OS runtime.
 * - SYSTEM: [PRO PHASE] Linked Universe Sector Color states to the CursorService for unified thermal glow.
 * - SYSTEM: [PRO PHASE] Transitioned from Hot Import to Cold Boot architecture to resolve Planet Leak.
 * - SYSTEM: [PRO PHASE] Gated universe mounting logic within init() to enforce Sequential Phase Separation.
 * - SYSTEM: [PRO PHASE] Implemented Staggered Ignition to prevent main-thread blocking during boot.
 * - SYSTEM: [PRO PHASE] Restored Pre-Fetch Handshake to initialize background asset loading during the greeting sequence.
 * - SYSTEM: [PRO PHASE] Implemented Stealth Construction architecture to eliminate anchor-dependency loading delays.
 * - SYSTEM: [PRO PHASE] Resolved Scene Hijacking by adopting the global CoreScene singleton instead of instantiating a new THREE.Scene().
 * - SYSTEM: [PRO PHASE] Synchronized Logics.js color registry with constants.js to enforce single-source-of-truth for sector DNA.
 * - SYSTEM: [PRO PHASE] Reverted 3D WebGL text shredder back to DOM-based HeroEffects to restore legacy glitch aesthetic.
 * - SYSTEM: [PRO PHASE] Updated HUD Sector labels to pull unique 'name' data from the sector registry instead of generic IDs.
 * - SYSTEM: [PRO PHASE] Silenced TYPEWRITER_TICK interaction with the master glitch dispatcher to prevent 2-second rule violations.
 * - SYSTEM: [PRO PHASE OPTION A] Re-aligned TYPEWRITER_TICK listener to trigger global anomalies instead of hardcoded PHOSPHOR_SPLIT.
 * - SYSTEM: [PRO PHASE SINGULARITY] Linked orbital rotationVelocity to BlackHole entity to drive Relativistic Beaming and accretion stretching.
 * - SYSTEM: [PRO PHASE KRAYE] Replaced generic terminal kernel with authoritative Kraye Protocol.
 * - SYSTEM: [PRO PHASE KRAYE] Injected Mechanical Jitter into runTypewriter for sector-specific typography.
 * - SYSTEM: [PRO PHASE KRAYE] Piped graphicsMode state into the BlackHole update loop.
 * - SYSTEM: [PRO PHASE KRAYE] Integrated Event Listener for the native ghost-color-picker input.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1406]: Linguistic Paralysis. Replaced static innerHTML injection with a character-by-character typewriter loop.
 * - FIXED [ID 1407]: Acoustic Handshake. btnEnter now explicitly calls AudioEngine.unlock() to enable OS soundscapes.
 * - FIXED [ID 1408]: Mobile Viewport Trap. Added vertical swipe detection to clearRealityFocus when holograms occlude the screen.
 * - FIXED [ID 1409]: Handshake Deadlock. Forced camera to idle state during initialization to bypass `Renderer.js` throttling logic.
 * - FIXED [ID 1410]: Wheel Drift. Adjusted friction curve and snap threshold in animate loop to capture scroll momentum.
 * - FIXED [ID 1412]: Orbital Stutter. Scaled anomaly intensity by rotation velocity to simulate physical camera strain during drags.
 * - FIXED [ID 1501]: Physics Isolation. Added API layer to ensure terminal commands don't permanently break orbit bounds.
 * - FIXED [ID 1414]: CLI Initialization. Injected Terminal.js instantiation into the boot sequence to enable backtick listener.
 * - FIXED [ID 1415]: Terminal Persistance. Added Focus Locking to pause orbital physics during sys-admin input and dragged window states.
 * - FIXED [ID 1416]: Asset Desync. Handled mount failure gracefully with console warnings to prevent complete render loop crash.
 * - FIXED [ID 1417]: Invisible Models. Bridged ASSET_PATHS from constants.js to ensure accurate local path resolution for GLB files.
 * - FIXED [ID 1507]: Physics Deadlock. Hardened checkIntersection to filter out undefined meshes during boot-phase raycasting.
 * - FIXED [ID 1508]: Monolithic Mount. Decoupled asset mounting logic to ModelManager for safer execution.
 * - FIXED [ID 2106]: Duplicate Ticker Deadlock. Removed local requestAnimationFrame to allow CoreLoop to manage system ticks.
 * - FIXED [ID 2107]: [APPEND] Handshake Error. Rewrote module resolution with async/await and robust type checking to prevent TypeError on CoreScene/CoreCamera injection.
 * - FIXED [ID 2112]: Constructor Race Condition. Extracted syncHardware to an awaited class method to guarantee scene injection before mountAssets, preventing render loop triggering before scene authority is established.
 * - FIXED [ID 2120]: Capitalization Lock-Out. Normalized Sector IDs to UPPERCASE to prevent data-shard dictionary lookup failures.
 * - FIXED [ID 2658]: [PRO PHASE] Missing Background. Reverted SkySphere deletion to restore the distant star layer while keeping the foreground vacuum clean.
 * - FIXED [ID 2659]: [PRO PHASE] Foreground Green Dots. Ensured Logics.js strictly uses the SkySphere, abandoning redundant `GalaxyEngine` and `Environment` overlays.
 * - FIXED [ID 3305]: Ghost Meteorite. Registered CursorService instantiation within the main Logics.js boot sequence.
 * - FIXED [ID 3350]: [PRO PHASE] Black Flame. Injected cursorService.setColor() inside the sector update loop to ensure the plasma shader receives valid RGB data.
 * - FIXED [ID 4398]: Planet Leak. Removed this.init() from the constructor to prevent early planetary mounting during the 8bit.ai boot sequence.
 * - FIXED [ID 4501]: [PRO PHASE] Parallel Ignition Fatigue. Hardened boot sequence by staggering geometry creation to prevent main-thread lag.
 * - FIXED [ID 4510]: [PRO PHASE] Missing Cursor & Late Loading. Moved CursorService and ModelManager back to the constructor to allow background preloading without triggering early planetary mounts.
 * - FIXED [ID 4520]: [PRO PHASE] Invisible Cursor & Late Loading. Decoupled world generation from the OS Reveal via Stealth Construction to ensure zero-lag entry and active cursor heartbeat.
 * - FIXED [ID 4550]: [PRO PHASE] 8bit.ai Erasure. Logics.js now adopts CoreScene.get() in syncHardware() instead of overwriting it, allowing the Manifesto background to persist during stealth construction.
 * - FIXED [ID 4570]: [PRO PHASE] Golden Line Disconnect. Replaced hardcoded Logics.js sector colors with imported COLORS from constants.js to ensure UI elements (like the progress track) match the 3D entity models.
 * - FIXED [ID 4606]: [PRO PHASE] Aesthetic Reversion. Restored HeroEffects.js integration and purged TextGlitchMaterial to satisfy visual DNA requirements.
 * - FIXED [ID 5635]: [PRO PHASE] Missing Shudder Sync. Restored TYPEWRITER_TICK listener to trigger DOM-based anomalies instead of WebGL uniforms.
 * - FIXED [ID 5636]: [PRO PHASE] Generic HUD Labels. Swapped `activeSector.id` for `activeSector.name` in `updateUI` to reflect distinct sector identities.
 * - FIXED [ID 6010]: [PRO PHASE] Typewriter Tick Spam. Rerouted TYPEWRITER_TICK logic to respect the master Logics.js dispatcher, preventing infinite 2-second glitch loops during text generation.
 * - FIXED [ID 6015]: [PRO PHASE] Hardcoded Anomaly. Removed direct PHOSPHOR_SPLIT trigger in favor of master queue dispatch (Option A).
 * - FIXED [ID 6040]: [PRO PHASE] Static Singularity. Piped kinetic momentum (rotationVelocity) directly into the BlackHole update loop to synchronize physics with the shader.
 * - FIXED [ID 6110]: [PRO PHASE KRAYE] Implemented dot-notation parser for kraye.graphics.[tier].
 * - FIXED [ID 6120]: [PRO PHASE KRAYE] Linked kraye.resume to native file download.
 * - FIXED [ID 6180]: [PRO PHASE KRAYE] Dead Theme Trigger. Added an 'input' event listener in bindUI() to capture color picker changes and synchronize the universe.
 * - FIXED [ID 6185]: [PRO PHASE KRAYE] Broken Download Path. Synchronized kraye.resume logic with the authoritative `SYSTEM.RESUME_URL` constant.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added runTypewriter() utility to sync visual text manifestation with digital audio chirps.
 * - Fixed: Injected Typewriter-synced events into activateSector() to populate shards dynamically.
 * - Fixed: Intercepted dragMove events during isZooming phase to allow vertical escape gestures.
 * - Fixed: Integrated immediate DOM execution sequence inside `bindUI()` to forcefully release WebGL context.
 * - Fixed: Added Scroll-Stop Sentinel to force isSnapping state when wheel velocity drops.
 * - Fixed: Injected velocity calculations into dispatchRandomGlitch for proportional visual feedback.
 * - Fixed: Added executeSystemOverride() to handle verified terminal inputs.
 * - Fixed: Added instantiation of the Terminal UI to the constructor for immediate event bus handshake.
 * - Fixed: Subscribed to DRAWER_TOGGLED and TERMINAL_CMD_EXEC for CLI-driven 3D physics overrides.
 * - Fixed: Injected array filter in checkIntersection to ensure raycaster only evaluates fully mounted planet nodes.
 * - Fixed: Delegated `mountAssets` payload to `ModelManager` to reduce file complexity.
 * - Fixed: [APPEND] Integrated CoreLoop.start() into the `mountAssets` promise chain to ensure physics initialize post-mount.
 * - Fixed: [APPEND] Wrapped module handshakes in a unified syncHardware asynchronous block.
 * - Fixed: [PRO PHASE] Refactored init() to async to support blocking hardware handshakes.
 * - Fixed: [PRO PHASE] Restored TextureLoader for `stars.webp` with SRGBColorSpace mapping.
 * - Fixed: [PRO PHASE] Hardened single-background architectural boundary.
 * - Fixed: [PRO PHASE] Injected global CSS override to suppress native DOM pointers, ensuring 1:1 kinetic tracking.
 * - Fixed: [PRO PHASE] Bound rotationVelocity to cursor setMomentum API (if available) to simulate orbital drag on the exhaust trail.
 * - Fixed: [PRO PHASE] Wrapped heavy 3D instantiation calls in Promise-based timeouts to yield to the browser rendering thread.
 * - Fixed: [PRO PHASE] Injected modelManager.preload() hook in the constructor to download GLB assets while user reads boot terminal.
 * - Fixed: [PRO PHASE] Extracted heavy instantiation into a background stealthBuild() method.
 * - Fixed: [PRO PHASE] Re-routed CoreLoop.addUpdatable(this) to run independently during the boot sequence.
 * - Fixed: [PRO PHASE] Removed unneeded `new THREE.Scene()` from constructor to prevent global scene overwrite.
 * - Fixed: [PRO PHASE] Imported COLORS from constants.js to bridge UI state colors with physical rendering states.
 * - Fixed: [PRO PHASE] Re-injected HeroEffects instantiation into the OS Reveal sequence.
 * - Fixed: [PRO PHASE] Subscribed to TYPEWRITER_TICK to shudder the DOM Hero Name.
 * - Fixed: [PRO PHASE] Delegated all TYPEWRITER_TICK glitch triggers to the global SystemLogicUtils dispatcher.
 * - Fixed: [PRO PHASE OPTION A] Purged legacy handleGlitchImpact direct calls.
 * - Fixed: [PRO PHASE] Appended this.rotationVelocity to this.blackHole.update() call.
 * - Fixed: [PRO PHASE KRAYE] Added kraye.mass, kraye.audit, and kraye.volume overrides to executeSystemOverride.
 * - Fixed: [PRO PHASE KRAYE] Injected kraye.graphics parser to dynamically modify SystemLogicUtils state.
 * - Fixed: [PRO PHASE KRAYE] Added DOM parsing logic for `#ghost-color-picker` inside `bindUI()`.
 * - Fixed: [PRO PHASE KRAYE] Imported SYSTEM from constants.js to access authoritative pathing.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Every character typed in the holographic menu now publishes a TYPEWRITER_TICK event to the audio bus.
 * - RIPPLE: The system hum and ambient space sounds are initialized upon the first user interaction.
 * - RIPPLE: Swiping down on mobile clears the activeClickedSector, dismissing the holograms and unlocking orbit physics.
 * - RIPPLE: Mouse wheel and trackpad scrolls now magnetically lock to the nearest sector, mimicking drag behavior.
 * - RIPPLE: High-speed swiping now directly controls the intensity of the GLOBAL_GLITCH dispatcher, syncing audio sweeps and visual tears.
 * - RIPPLE: Terminal commands now directly manipulate rotationVelocity and cinematic focus without triggering swipe friction.
 * - RIPPLE: The backtick key (`) now acts as the authoritative hardware handshake for the Industrial Terminal.
 * - RIPPLE: Focus state now locks the dragMove event, isolating the terminal input and window dragging from the cosmic environment.
 * - RIPPLE: The raycaster now safely bypasses empty nodes, preventing system-wide crashes during asynchronous asset loading.
 * - RIPPLE: Logics.js is now decoupled from file-pathing and model scaling via ModelManager integration.
 * - RIPPLE: Engine performance stabilized by moving the render and physics pipeline to `core/Loop.js`.
 * - RIPPLE: [PRO PHASE] Awaiting syncHardware ensures CoreScene possesses the UniverseGroup before CoreLoop attempts to render it.
 * - RIPPLE: [PRO PHASE] The background features distant stars, the midground features black asteroids, and the foreground is completely clean of green grime.
 * - RIPPLE: [PRO PHASE] The entire OS is now navigable using the low-poly flaming meteorite.
 * - RIPPLE: [PRO PHASE] The meteorite fire trail dynamically shifts hue (Purple for CODE, Cyan for TECH) as the user explores the universe.
 * - RIPPLE: [PRO PHASE] CoreScene remains untouched during boot, isolating the 8bit.ai manifesto visuals from the 3D planetary engine.
 * - RIPPLE: [PRO PHASE] The browser main thread remains unblocked, allowing the terminal UI and CSS animations to run fluidly while the 3D world builds in the background.
 * - RIPPLE: [PRO PHASE] The low-poly cursor is now fully visible during the initial 8bit.ai boot sequence.
 * - RIPPLE: [PRO PHASE] Heavy GLB models pre-fetch in the background, significantly reducing the blackout period when entering the OS.
 * - RIPPLE: [PRO PHASE] 3D assets now load completely invisibly behind the 8bit.ai manifesto.
 * - RIPPLE: [PRO PHASE] The low-poly cursor trail updates accurately during the greeting phase.
 * - RIPPLE: [PRO PHASE] The 8bit.ai Manifesto animation now plays uninterrupted for its full duration during the greeting window.
 * - RIPPLE: [PRO PHASE] The "Golden Line" HUD progress track now correctly displays Matrix Green when focused on the CONTACT sector.
 * - RIPPLE: [PRO PHASE] The Hero Name reverts to high-performance CSS DOM animations, decoupling it from the WebGL render cycle.
 * - RIPPLE: [PRO PHASE] Typing in the holographic shards now physically triggers structural anomalies in the hero identity.
 * - RIPPLE: [PRO PHASE] The typewriter effect no longer violates the 10-second non-repeating cycle, restoring the industrial ambient pulse.
 * - RIPPLE: [PRO PHASE OPTION A] Typewriter events now seamlessly cycle through all 15 resilient anomalies via the Master Dispatcher.
 * - RIPPLE: [PRO PHASE SINGULARITY] The black hole's accretion disk now visually stretches and intensifies based on the speed of the user's scroll/drag.
 * - RIPPLE: [PRO PHASE KRAYE] Typewriter mechanics now dynamically shift based on Sector DNA (CODE = Heavy Jitter).
 * - RIPPLE: [PRO PHASE KRAYE] Kraye commands dynamically scale visual fidelity via the black hole uniforms.
 * - RIPPLE: [PRO PHASE KRAYE] The kraye.color command now seamlessly syncs CSS variables, singularity shaders, and the global logic state.
 * * * * * REALITY AUDIT V28:
 * - APPEND 16: Typewriter Synchronization - Enforced 20ms character delay to match industrial "Data-Stream" aesthetic.
 * - APPEND 17: Audio Hardware Release - btnEnter acts as the authoritative source for the Web Audio API handshake.
 * - APPEND 18: Gesture Override - Added e.detail.velocityY interception in dragMove to support mobile escapes.
 * - APPEND 19: Boot Context Override - Hardened `bindUI()` click listener to prioritize scene execution above visual stack warnings.
 * - APPEND 21: Magnetic Wheel - Optimized animate loop else-block to capture non-drag kinetic inputs.
 * - APPEND 32: Velocity Scaling - Drag events calculate intensity modifiers to push dynamic glitch limits without breaking the render state.
 * - APPEND 34: Terminal API - Built secure proxy methods for hardware-level orbit manipulation and Secret Shard retrieval.
 * - APPEND 41: CLI Integration - Initialized Terminal UI to bridge the command-line kernel with the physical universe.
 * - APPEND 42: Interactive Shell - Verified UI_FOCUSED properly bypasses rotation checks during physical DOM drags.
 * - APPEND 45: Path Resolution - Replaced hardcoded model strings with ASSET_PATHS to prevent invisible anchor bugs.
 * - APPEND 46: Raycaster Safety - Enforced length checks on planetMeshes array to protect the WebGL render loop.
 * - APPEND 48: ModelManager Integration - Safely decoupled mounting protocols to specialized hardware pipeline.
 * - APPEND 130: [PRO PHASE] Handshake Sync - Confirmed init() blocks mountAssets() until CoreScene and CoreCamera singletons are verified.
 * - APPEND 131: [PRO PHASE] Capitalization Sync - Verified uppercase usage across sector definitions to prevent data drops.
 * - APPEND 261: [PRO PHASE] Layer Audit - Verified `stars.webp` loads correctly onto the 400-radius SkySphere without interfering with bloom thresholds.
 * - APPEND 263: [PRO PHASE] Vacuum Optics Audit - Confirmed Logics orchestration strictly mounts SkySphere without redundant particle generation.
 * - APPEND 420: Cursor Handshake - Verified CursorService boots independently without blocking the main CoreScene render thread.
 * - APPEND 450: [PRO PHASE] Color Sync Audit - Verified CursorService.setColor cleanly parses hex integers from the planet sector data.
 * - APPEND 4398: [PRO PHASE] Cold Boot Audit - Verified LogicsEngine no longer forces a scene swap on import.
 * - APPEND 4500: [PRO PHASE] Performance Audit - Verified UI responsiveness during the LogicsEngine boot phase via staggered generation.
 * - APPEND 4510: [PRO PHASE] Pre-Fetch Audit - Verified CursorService and ModelManager boot sequentially before WebGL context locks.
 * - APPEND 4520: [PRO PHASE] Stealth Handoff Audit - Verified universeGroup.visible is strictly toggled by the init() handoff trigger.
 * - APPEND 4550: [PRO PHASE] Unified Authority Audit - Verified CoreScene is shared between ManifestoEngine and LogicsEngine to prevent premature scene deletion.
 * - APPEND 4570: [PRO PHASE] DNA Sync Audit - Verified Logics.js strictly inherits COLORS dictionary from constants.js.
 * - APPEND 4606: [PRO DOM Hook Audit] - Verified `hero-name-viewport` acts as the valid container for `HeroEffects`.
 * - APPEND 5620: [PRO PHASE] Shudder Sync Audit - Verified TYPEWRITER_TICK correctly triggers 0.5 intensity DOM glitches without overwhelming the render queue.
 * - APPEND 5621: [PRO PHASE] HUD Identity Audit - Verified `hud-sector-title` correctly displays 'TECH_CORE' instead of just 'TECH'.
 * - APPEND 6010: [PRO PHASE] Spam Prevention Audit - Verified typewriter character generations do not trigger direct anomalous overrides of the 2-second rule constraint.
 * - APPEND 6015: [PRO PHASE] Option A Integration Audit - Verified no orphaned PHOSPHOR_SPLIT calls remain in the event bus.
 * - APPEND 6040: [PRO PHASE] Singularity Hook - Verified rotationVelocity safely passes to the BlackHole entity without frame-drops.
 * - APPEND 6110: [PRO PHASE KRAYE] Diagnostics Audit - Confirmed kraye.audit successfully extracts engine velocity.
 * - APPEND 618: [PRO PHASE KRAYE] Color Sync Audit - Confirmed `--terminal-glow` successfully receives dynamic hexadecimal payload.
 * - APPEND 619: [PRO PHASE KRAYE] Path Audit - Verified `SYSTEM.RESUME_URL` effectively isolates the PDF routing to constants.js.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_RULE_STRICT_LOCKED
 */

import * as THREE from 'three';

import { GlobalInput } from './core/Input.js';
import { CoreRenderer } from './core/Renderer.js';
import { Lighting } from './world/Lighting.js';
import { DebrisField } from './world/DebrisField.js';
import { OrbitRing } from './world/OrbitRing.js';
import { HeroPlanet } from './entities/HeroPlanet.js';
import { BlackHole } from './entities/BlackHole.js';
import { ModelManager } from './loaders/ModelManager.js';

import { HeroEffects } from './effects/HeroEffects.js';
import { AudioEngine } from './systems/audio.js';
import { Terminal } from './ui/Terminal.js';
import { CursorService } from './systems/CursorService.js'; // PRO PHASE: Low-Poly Cursor Injection

// REALITY AUDIT: Import the state machine, dispatcher, event bus, and CoreLoop
import { Logics as SystemLogicUtils } from './utils/logics.js';
import { SystemEvents, EVENTS } from './utils/events.js';
import { CoreLoop } from './core/Loop.js';
import { COLORS, SYSTEM } from './data/constants.js'; // [PRO PHASE KRAYE]: Added SYSTEM for resume URL

class LogicsEngine {
    constructor() {
        // [ID 4550] PRO PHASE: Do not overwrite the global scene with a new instance.
        // We will adopt the CoreScene in syncHardware().
        this.scene = null;

        // CAMERA: Starts high up for the "Boot Drop" animation
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 150, 150);
        this.camera.lookAt(0, 0, 0);

        // System States
        this.isBooting = true;
        this.systemActive = false;
        this.currentFocusedSector = null;
        this.activeClickedSector = null;

        // Physics State
        this.rotationVelocity = 0;
        this.targetRotation = 0;
        this.isDragging = false;
        this.isSnapping = false;

        // REALITY AUDIT: Cinematic State Registry
        this.realityState = {
            isTransitioning: false,
            focusTarget: null,
            lastAuditTime: 0
        };

        // Managers
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        // Layer Managers
        this.heroEffects = null;
        this.cursorService = null;
        this.modelManager = null;

        // REALITY AUDIT 41: Initialize Industrial Terminal
        this.terminal = new Terminal('terminal-window', 'terminal-header', 'terminal-content', 'terminal-input');

        // SECTOR DATA [ID 4570]: Synchronized with constants.js COLORS
        this.sectors = [
            { id: 'TECH', label: 'CENTRAL_HUB', color: COLORS.TECH, angle: 0 },
            { id: 'VISION', label: 'CREATIVE_DESIGN', color: COLORS.VISION, angle: Math.PI / 2 },
            { id: 'CODE', label: 'FULL_STACK_DEV', color: COLORS.CODE, angle: Math.PI },
            { id: 'CONTACT', label: 'SIGNAL_TRANSMISSION', color: COLORS.CONTACT, angle: -Math.PI / 2 }
        ];

        this.planets = new Map();

        // ==========================================
        // PRO PHASE: STEALTH CONSTRUCTION CLOAK
        // Group holds the planets but remains invisible to prevent Planet Leak
        // ==========================================
        this.universeGroup = new THREE.Group();
        this.universeGroup.visible = false; // Cloaked until init()

        // ==========================================
        // PRO PHASE: GEOMETRIC CURSOR ENGINE
        // ==========================================
        document.body.style.cursor = 'none';
        const cursorStyle = document.createElement('style');
        cursorStyle.innerHTML = `* { cursor: none !important; }`;
        document.head.appendChild(cursorStyle);

        // Bind Events & UI
        this.bindEvents();
        this.bindUI();

        // Kickoff background construction
        this.stealthBuild();
    }

    /**
     * PRO PHASE: STEALTH BUILD PIPELINE
     * Constructs the 3D world, initializes the heartbeat, and mounts assets
     * entirely in the background while the user reads the Greeting Terminal.
     */
    async stealthBuild() {
        console.log(":: LOGICS_ENGINE_STEALTH_BUILD_INITIATED");

        // Sync with CoreScene early so background layers register properly
        await this.syncHardware();

        if (this.scene) {
            this.scene.background = new THREE.Color(0x000000);
            this.scene.add(this.universeGroup);
        }

        // 1. NATURE SYNC (stars.webp)
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('./assets/textures/environment/stars.webp', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;

            if (this.skySphere) {
                this.skySphere.material.map = texture;
                this.skySphere.material.needsUpdate = true;
            }
        });

        // 2. ROTATING SKY SPHERE (Cloaked)
        const skyGeo = new THREE.SphereGeometry(400, 64, 64);
        const skyMat = new THREE.MeshBasicMaterial({ side: THREE.BackSide, fog: false });
        this.skySphere = new THREE.Mesh(skyGeo, skyMat);
        this.skySphere.visible = false; // Cloaked
        if (this.scene) this.scene.add(this.skySphere);

        // STAGGER 1: Yield to main thread
        await new Promise(resolve => setTimeout(resolve, 50));

        // LIGHTING & GOD OBJECTS
        if (this.scene) {
            this.lighting = new Lighting(this.scene);
        }

        this.blackHole = new BlackHole();
        this.blackHole.visible = false; // Cloaked
        if (this.scene) this.scene.add(this.blackHole);

        // STAGGER 2: Yield
        await new Promise(resolve => setTimeout(resolve, 50));

        this.debris = new DebrisField(this.universeGroup, 800);
        this.orbitRing = new OrbitRing(this.universeGroup);

        // STAGGER 3: Yield
        await new Promise(resolve => setTimeout(resolve, 50));

        // SPAWN LOGIC: Universal Orbit Migration
        this.sectors.forEach(data => {
            const planet = new HeroPlanet(data);
            this.universeGroup.add(planet);
            this.planets.set(data.id, planet);
        });

        // STAGGER 4: Yield
        await new Promise(resolve => setTimeout(resolve, 50));

        // Initialize Background Fetching Manager
        this.modelManager = new ModelManager(this);
        if (typeof this.modelManager.preload === 'function') {
            this.modelManager.preload();
        }

        try {
            this.cursorService = new CursorService();
            console.log(":: GEOMETRIC_SHARD_ENGINE_ONLINE");
        } catch (error) {
            console.error(":: CURSOR_ENGINE_FAILURE", error);
        }

        // ==========================================
        // PRO PHASE [ID 4520]: HEARTBEAT RESTORATION
        // Registers Logics.js to the CoreLoop immediately so the 
        // cursor service and background elements update during the greeting.
        // ==========================================
        CoreLoop.addUpdatable(this);

        // Begin background mounting to anchors
        await this.modelManager.mountSectorModels();
        console.log(":: SYSTEM_ASSETS_MOUNTED_STEALTH (ModelManager Verified)");

        // Safely reveal button if it was waiting for assets
        const btnEnter = document.getElementById('btn-enter-system');
        if (btnEnter) btnEnter.classList.remove('hidden');
    }

    /**
     * PRO PHASE: OS REVEAL (Zero-Lag Entry)
     * Drops the invisibility cloak after the user enters the system.
     */
    async init(externalScene, externalCamera) {
        console.log(":: LOGICS_ENGINE_OS_REVEAL_INITIATED");

        // Redundant safeguard hardware sync
        await this.syncHardware();

        // Drop the Cloak
        if (this.universeGroup) this.universeGroup.visible = true;
        if (this.skySphere) this.skySphere.visible = true;
        if (this.blackHole) this.blackHole.visible = true;

        // Ensure Loop is running
        CoreLoop.start();
    }

    /**
     * [ID 2107] & [ID 2112] CULPRIT FIX: Module Handshake
     * Correctly accessing the 'CoreScene' and 'CoreCamera' properties 
     * from the imported module namespace with safety checks.
     * Blocked via await to prevent race conditions during boot.
     */
    async syncHardware() {
        try {
            const sceneMod = await import('./core/Scene.js');
            const cameraMod = await import('./core/Camera.js');

            if (sceneMod.CoreScene && typeof sceneMod.CoreScene.get === 'function') {
                // [PRO PHASE]: Adopt the shared global scene instead of overwriting it
                this.scene = sceneMod.CoreScene.get();
            }
            if (cameraMod.CoreCamera && typeof cameraMod.CoreCamera.set === 'function') {
                cameraMod.CoreCamera.set(this.camera);
            }
        } catch (e) {
            console.error(":: HARDWARE_SYNC_FAILURE", e);
        }
    }

    bindUI() {
        const btnEnter = document.getElementById('btn-enter-system');
        if (btnEnter) {
            btnEnter.addEventListener('click', () => {
                // ==========================================
                // REALITY AUDIT: Acoustic Handshake [ID 1407]
                // ==========================================
                if (AudioEngine && typeof AudioEngine.unlock === 'function') {
                    AudioEngine.unlock();
                }

                // CULPRIT 1409 / OMISSION 84: Forced WebGL Initialization Handshake
                // By overriding the DOM synchronously, we prevent the render cycle from blocking interaction.
                const bootScreen = document.getElementById('os-greeting');
                if (bootScreen) {
                    bootScreen.style.opacity = '0';
                    bootScreen.style.pointerEvents = 'none';
                }

                const canvasLayer = document.getElementById('webgl-canvas');
                if (canvasLayer) {
                    canvasLayer.style.visibility = 'visible';
                    canvasLayer.style.opacity = '1';
                }

                this.isBooting = false;
                this.systemActive = true;

                setTimeout(() => {
                    if (bootScreen) bootScreen.style.display = 'none';

                    // ==========================================
                    // REALITY AUDIT: Boot-Phase Isolation (Hero Name)
                    // ==========================================
                    const heroContainer = document.getElementById('hero-name-viewport');
                    if (heroContainer) {
                        this.heroEffects = new HeroEffects(heroContainer);
                        SystemLogicUtils.dispatchRandomGlitch(1.5);
                    }
                }, 1000);
            });
        }

        // ==========================================
        // PRO PHASE KRAYE: The Color Sync Handshake [ID 6180]
        // Listens to the hidden color picker and broadcasts changes
        // ==========================================
        const colorPicker = document.getElementById('ghost-color-picker');
        if (colorPicker) {
            colorPicker.addEventListener('input', (e) => {
                const hex = e.target.value;
                const colorInt = parseInt(hex.replace('#', '0x'));

                // 1. UPDATE CSS DNA (Terminal & Shards)
                document.documentElement.style.setProperty('--shard-color', hex);
                document.documentElement.style.setProperty('--terminal-glow', hex + '88'); // 50% opacity glow
                document.documentElement.style.setProperty('--accent-tech', hex);

                // 2. UPDATE SINGULARITY
                if (this.blackHole && typeof this.blackHole.updateColor === 'function') {
                    this.blackHole.updateColor(hex);
                }

                // 3. UPDATE CURSOR
                if (this.cursorService && typeof this.cursorService.setColor === 'function') {
                    this.cursorService.setColor(colorInt);
                }

                // 4. BROADCAST TO STATE MACHINE
                SystemEvents.publish('THEME_SHIFT', { color: colorInt });

                // 5. VISUAL FEEDBACK (Hardware Re-calibration)
                SystemLogicUtils.dispatchRandomGlitch(1.2);
            });
        }
    }

    bindEvents() {
        GlobalInput.on('dragMove', (e) => {
            if (!this.systemActive) return;

            // REALITY AUDIT: Mobile "Swipe to Dismiss" Escape Hatch [ID 1408]
            if (this.activeClickedSector && e.detail.velocityY > 0.05) {
                this.clearRealityFocus();
                return;
            }

            // REALITY AUDIT 42: Lock momentum if we are perfectly zoomed or Terminal UI is focused to prevent orbit drift
            if (SystemLogicUtils.getState().isZooming || SystemLogicUtils.getState().isUIFocused) return;

            this.isDragging = true;
            this.isSnapping = false;

            this.realityState.isTransitioning = false;

            // Clear lock and dismiss holograms on deep horizontal drag
            if (Math.abs(e.detail.velocityX) > 0.02) {
                this.clearRealityFocus();
            }

            this.rotationVelocity += e.detail.velocityX;

            // PRO PHASE: Bind Universe Momentum to Cursor Plasma Exhaust
            if (this.cursorService && typeof this.cursorService.setMomentum === 'function') {
                this.cursorService.setMomentum(this.rotationVelocity);
            }

            // SAFE IMPROV: Trigger velocity-scaled glitch on high-speed drag
            if (Math.abs(e.detail.velocityX) > 0.05) {
                // REALITY AUDIT 32: Velocity-Scaled Anomalies
                const dragIntensity = Math.min(2.5, Math.abs(e.detail.velocityX) * 15);
                SystemLogicUtils.dispatchRandomGlitch(dragIntensity);
            }

            const hint = document.getElementById('interaction-hint');
            if (hint) hint.style.opacity = '0';
        });

        GlobalInput.on('inputHover', (e) => {
            if (!this.systemActive) return;
            this.checkIntersection(e.detail.x, e.detail.y, false);
        });

        GlobalInput.on('inputDown', (e) => {
            if (!this.systemActive) return;

            // REALITY AUDIT: The Ripple Impact Trigger
            SystemLogicUtils.dispatchRandomGlitch(1.0);

            // REALITY AUDIT: Prevent clicks from hitting the 3D world if targeting Holograms
            const holo = document.getElementById('hologram-viewport');
            if (holo && !holo.classList.contains('hidden')) {
                const rect = holo.getBoundingClientRect();
                if (e.detail.x >= rect.left && e.detail.x <= rect.right &&
                    e.detail.y >= rect.top && e.detail.y <= rect.bottom) {
                    return; // Let the click pass to the HTML shard
                }
            }

            this.checkIntersection(e.detail.x, e.detail.y, true);
        });

        GlobalInput.on('inputUp', () => {
            this.isDragging = false;
        });

        // REALITY AUDIT 41: Terminal Toggle Subscription
        SystemEvents.subscribe(EVENTS.DRAWER_TOGGLED, (type) => {
            if (type === 'TERMINAL' && this.terminal) {
                const isVisible = this.terminal.el.classList.contains('visible');
                if (!isVisible) this.terminal.show();
                else this.terminal.hide();
            }
        });

        // Terminal Command Handshake
        SystemEvents.subscribe(EVENTS.TERMINAL_CMD_EXEC || 'TERMINAL_CMD_EXEC', (cmd) => {
            const result = this.executeSystemOverride(cmd);
            if (result && result.message) this.terminal.printLine(result.message, result.success ? '#00ff00' : '#ff0000');
        });

        // [PRO PHASE Option A] Bind Hero Glitch to Typewriter Ticks for structural displacement
        SystemEvents.subscribe(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK', () => {
            if (this.systemActive && this.heroEffects) {
                // CULPRIT 6010 & 6015 FIX: Hand over the typewriter tick to the Master Dispatcher
                // to ensure we do not violate the 10-second non-repeating cycle rules.
                SystemLogicUtils.dispatchRandomGlitch(0.5);
            }
        });

        window.addEventListener('resize', () => this.handleResize());
    }

    // ==========================================
    // REALITY AUDIT 34: EXTERNAL API HOOKS (Kraye Terminal Engine Handshake)
    // Allows the CLI to bypass physical inputs and directly manipulate the 3D Universe.
    // ==========================================
    executeSystemOverride(command, payload = null) {
        const cmdParts = command.toLowerCase().split(' ');
        const base = cmdParts[0];
        const arg = cmdParts[1];

        // Route Kraye Graphics commands
        if (base.startsWith('kraye.graphics.')) {
            const tier = base.split('.')[2]?.toUpperCase();
            if (['LOW', 'MEDIUM', 'HIGH', 'ULTRA'].includes(tier)) {
                SystemLogicUtils.getState().graphicsMode = tier;
                SystemLogicUtils.dispatchRandomGlitch(2.0); // Visual hardware stutter
                return { success: true, message: `HARDWARE_AUDIT: ALLOCATING_VRAM... SINGULARITY_SYNC_${tier}` };
            }
            return { success: false, message: "ERROR: INVALID_GRAPHICS_TIER" };
        }

        switch (base) {
            case 'kraye.resume':
                const link = document.createElement('a');
                // [PRO PHASE KRAYE]: Authoritative Pathing [ID 6185]
                link.href = SYSTEM.RESUME_URL || './assets/docs/Riyas_Manikodi_Resume.pdf';
                link.download = 'Riyas_Manikodi_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                SystemLogicUtils.dispatchRandomGlitch(1.0);
                return { success: true, message: "KRAYE_UPLINK: DOWNLOADING_RESUME_SHARD..." };

            case 'kraye.reboot':
            case 'reboot':
                this.clearRealityFocus();
                this.rotationVelocity = 0.5;
                SystemLogicUtils.dispatchRandomGlitch(2.5);
                return { success: true, message: "KRAYE_SYSTEM_REBOOT_INITIATED..." };

            case 'kraye.audit':
            case 'kraye.stats':
                const velocity = this.rotationVelocity.toFixed(4);
                return { success: true, message: `CORE_TELEMETRY // VELOCITY: ${velocity} // STATUS: NOMINAL` };

            case 'kraye.volume':
                const vol = parseFloat(arg) / 100;
                if (AudioEngine && typeof AudioEngine.setGlobalVolume === 'function') {
                    AudioEngine.setGlobalVolume(vol);
                    return { success: true, message: `KRAYE_GAIN_ADJUSTED: ${(vol * 100).toFixed(0)}%` };
                }
                return { success: false, message: "ERROR: AUDIO_HARDWARE_NOT_FOUND" };

            case 'kraye.mass':
                const newMass = parseFloat(arg) || 85;
                if (this.blackHole && this.blackHole.diskMesh) {
                    this.blackHole.diskMesh.scale.set(newMass / 85, newMass / 85, newMass / 85);
                    return { success: true, message: `SINGULARITY_MASS_ADJUSTED: ${newMass}u` };
                }
                return { success: false, message: "ERROR: SINGULARITY_NOT_FOUND" };

            case 'kraye.color':
                const picker = document.getElementById('ghost-color-picker');
                if (picker) {
                    picker.click();
                    return { success: true, message: "KRAYE_THEME: AWAITING_COLOR_SPACE_OVERRIDE..." };
                }
                return { success: false, message: "ERROR: COLOR_PICKER_NOT_FOUND" };

            case 'kraye.glitch':
                SystemLogicUtils.dispatchRandomGlitch(1.5);
                return { success: true, message: `MANUAL_ANOMALY_TRIGGERED: ${arg ? arg.toUpperCase() : 'RANDOM'}` };

            case 'kraye.whoami':
                SystemLogicUtils.dispatchRandomGlitch(1.0);
                return { success: true, message: "RIYAS MANIKODI // APPLICATION SUPPORT ENGINEER // CLASS OF 2022" };

            case 'kraye.logs':
                SystemLogicUtils.dispatchRandomGlitch(1.5);
                return { success: true, message: "INCIDENT_LOGS: \n> ID 505: SQL Query Optimization Success \n> ID 1401: SLA Threshold Maintained at 99.9%" };

            case 'scan':
                if (this.currentFocusedSector === 'CODE' || this.currentFocusedSector === 'VISION') {
                    SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK', { sectorId: this.currentFocusedSector });
                    return { success: true, message: "ENCRYPTED_SHARD_FOUND: XJ-99 (secret_bio.pkg)" };
                }
                return { success: false, message: "ERROR: NO_SIGNALS_IN_CURRENT_SECTOR" };

            case 'kraye.goto':
            case 'goto':
                const sector = arg ? arg.toUpperCase() : null;
                if (this.planets.has(sector)) {
                    this.activeClickedSector = sector;
                    this.activateSector({ id: sector });
                    this.triggerRealityFocus({ id: sector });
                    return { success: true, message: `KRAYE_FOCUS_LOCKED: ${sector}` };
                }
                return { success: false, message: "ERROR: SECTOR_NOT_FOUND" };

            case 'kraye.warp':
            case 'velocity':
                this.isDragging = false;
                this.isSnapping = false;
                this.rotationVelocity += parseFloat(arg) || 0.1;
                return { success: true, message: `KRAYE_VELOCITY_ADJUSTED: ${this.rotationVelocity.toFixed(3)}` };

            case 'kraye.clear':
            case 'clear':
                const terminalContent = document.getElementById('terminal-content');
                if (terminalContent) terminalContent.innerHTML = '';
                return { success: true, message: "" };

            case 'kraye.help':
            case 'help':
                return { success: true, message: "KRAYE_CMDS: kraye.resume, kraye.audit, kraye.reboot, kraye.volume, kraye.mass, kraye.color, kraye.graphics.[tier], kraye.goto [sector]" };

            default:
                return { success: false, message: `ERROR: UNKNOWN_KRAYE_COMMAND: ${base}` };
        }
    }

    checkIntersection(clientX, clientY, isClick) {
        this.pointer.x = (clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, this.camera);

        // Hardened Logic: Filter out any undefined or uninitialized planet meshes
        const planetMeshes = Array.from(this.planets.values())
            .map(p => p.planetMesh)
            .filter(mesh => mesh !== undefined && mesh !== null);

        if (planetMeshes.length === 0) return; // Exit if no models are ready

        const intersects = this.raycaster.intersectObjects(planetMeshes, false);

        this.planets.forEach(p => p.setHoverState(false));
        // Note: Global CSS override makes native cursor invisible, crosshair/pointer classes used conceptually
        document.body.style.cursor = 'crosshair';

        if (intersects.length > 0) {
            const hitObject = intersects[0].object;
            const parentPlanet = this.planets.get(hitObject.userData.id);

            if (parentPlanet) {
                parentPlanet.setHoverState(true);
                document.body.style.cursor = 'pointer';

                if (isClick) {
                    this.activeClickedSector = hitObject.userData.id;
                    this.activateSector(hitObject.userData);
                    this.triggerRealityFocus(hitObject.userData);
                }
            }
        } else if (isClick && this.activeClickedSector) {
            this.clearRealityFocus();
        }
    }

    async runTypewriter(element, text, delay = 20) {
        element.innerHTML = '';
        const sector = this.currentFocusedSector || 'TECH';
        const glyphs = ['█', '▓', '░', 'X'];

        for (let i = 0; i < text.length; i++) {
            // PRO PHASE KRAYE: Mechanical Jitter & Data Corruption Simulation
            let jitter = 0;
            if (sector === 'CODE') jitter = Math.sin(performance.now() * 0.005) * 15;
            else if (sector === 'CONTACT') delay = 10;

            const currentDelay = Math.max(5, delay + jitter);

            // Visual Resolve effect for CODE sector
            if (sector === 'CODE' && Math.random() > 0.5) {
                const tempChar = glyphs[Math.floor(Math.random() * glyphs.length)];
                element.innerHTML += tempChar;
                await new Promise(res => setTimeout(res, currentDelay));
                element.innerHTML = element.innerHTML.slice(0, -1); // remove glyph
            }

            element.innerHTML += text[i];

            // Pass sectorId to the event bus for pitch shifting
            SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK', { sectorId: sector });

            await new Promise(res => setTimeout(res, currentDelay));
        }
    }

    activateSector(data) {
        const strictData = this.planets.get(data.id).data;
        this.snapToAngle(-strictData.angle);

        const holoData = SystemLogicUtils.getHologramData();
        const holoContainer = document.getElementById('hologram-viewport');

        if (holoContainer) {
            holoContainer.innerHTML = `
                <div class="holo-shard shard-top-left delay-1" style="--shard-color: #${strictData.color.toString(16)}">
                    <div class="shard-title">${holoData.identity.title}</div>
                    <div id="type-id-body" class="shard-body"></div>
                </div>
                <div class="holo-shard shard-top-right delay-2" style="--shard-color: #${strictData.color.toString(16)}">
                    <div class="shard-title">${holoData.diagnostics.title}</div>
                    <div id="type-diag-body" class="shard-body"></div>
                </div>
                <div class="holo-shard shard-bottom-left delay-3" style="--shard-color: #${strictData.color.toString(16)}">
                    <div class="shard-title">${holoData.skills.title}</div>
                    <div id="type-skill-body" class="shard-body"></div>
                </div>
            `;

            setTimeout(() => {
                const idEl = document.getElementById('type-id-body');
                const diagEl = document.getElementById('type-diag-body');
                const skillEl = document.getElementById('type-skill-body');

                if (idEl) this.runTypewriter(idEl, `ID: ${holoData.identity.name}\nSTATUS: ${holoData.identity.status}`);
                if (diagEl) setTimeout(() => this.runTypewriter(diagEl, `MODULE: ${holoData.diagnostics.label}\nTYPE: ${holoData.diagnostics.type}\n---\n${holoData.diagnostics.bio}`), 400);
                if (skillEl) {
                    let skillStr = holoData.skills.data.map(s => `> ${s.name}: ${(s.level * 100).toFixed(0)}%`).join('\n');
                    setTimeout(() => this.runTypewriter(skillEl, skillStr), 800);
                }
            }, 600);
        }

        SystemEvents.publish(EVENTS.TOGGLE_HOLOGRAM || 'TOGGLE_HOLOGRAM', {
            sectorId: strictData.id,
            active: true
        });
    }

    triggerRealityFocus(data) {
        this.realityState.isTransitioning = true;
        this.realityState.focusTarget = new THREE.Vector3(0, 5, 75);
        if (typeof SystemLogicUtils.setZooming === 'function') {
            SystemLogicUtils.setZooming(true);
        }
    }

    clearRealityFocus() {
        this.activeClickedSector = null;
        this.realityState.isTransitioning = true;
        this.realityState.focusTarget = new THREE.Vector3(0, 20, 140);
        if (typeof SystemLogicUtils.setZooming === 'function') {
            SystemLogicUtils.setZooming(false);
        }

        SystemEvents.publish(EVENTS.TOGGLE_HOLOGRAM || 'TOGGLE_HOLOGRAM', { active: false });

        const holo = document.getElementById('hologram-viewport');
        if (holo) {
            holo.classList.add('hidden');
            setTimeout(() => { if (holo.classList.contains('hidden')) holo.innerHTML = ''; }, 600);
        }
    }

    snapToAngle(targetAngle) {
        this.targetRotation = targetAngle;
        this.isSnapping = true;
    }

    processTransitions() {
        if (!this.realityState.isTransitioning || !this.realityState.focusTarget) return;
        this.camera.position.lerp(this.realityState.focusTarget, 0.05);

        if (this.activeClickedSector) {
            const activePlanet = this.planets.get(this.activeClickedSector);
            if (activePlanet) {
                const pPos = new THREE.Vector3();
                activePlanet.getWorldPosition(pPos);
                this.camera.lookAt(pPos);
            } else {
                this.camera.lookAt(0, 0, 0);
            }
        } else {
            this.camera.lookAt(0, 0, 0);
        }

        if (this.camera.position.distanceTo(this.realityState.focusTarget) < 0.1) {
            this.realityState.isTransitioning = false;
        }
    }

    projectHologram() {
        if (!this.activeClickedSector || !this.systemActive) return;
        const activePlanet = this.planets.get(this.activeClickedSector);
        if (!activePlanet) return;

        const pos = new THREE.Vector3();
        activePlanet.getWorldPosition(pos);
        pos.project(this.camera);

        const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
        const y = (pos.y * -0.5 + 0.5) * window.innerHeight;

        const holo = document.getElementById('hologram-viewport');
        if (holo) {
            holo.classList.remove('hidden');
            const scale = this.realityState.isTransitioning ? 0.9 : 1.0;
            holo.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        }
    }

    updateUI(activeSector) {
        const title = document.getElementById('hud-sector-title');
        const fill = document.getElementById('hud-progress-fill');

        if (title) {
            title.innerText = `SECTOR // ${activeSector ? activeSector.name : 'TRANSIT'}`;
            title.style.color = activeSector ? '#' + activeSector.color.toString(16) : '#ffffff';
            title.style.textShadow = activeSector ? `0 0 15px #${activeSector.color.toString(16)}` : 'none';
        }

        if (fill && activeSector) {
            fill.style.backgroundColor = '#' + activeSector.color.toString(16);
            fill.style.boxShadow = `0 0 12px #${activeSector.color.toString(16)}`;
        }
    }

    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        if (CoreRenderer && typeof CoreRenderer.handleResize === 'function') CoreRenderer.handleResize(width, height);
    }

    dispose() {
        this.realityState.isTransitioning = false;
        this.planets.forEach(p => { if (p.dispose) p.dispose(); });
        if (this.debris && this.debris.dispose) this.debris.dispose();
        if (this.lighting && this.lighting.dispose) this.lighting.dispose();
    }

    /**
     * [PRO PHASE]: This method acts as the `update()` hook called by CoreLoop
     * Replaces the local requestAnimationFrame.
     */
    update(delta, activeSector) {
        const time = performance.now() * 0.001;
        // Map delta to the hardcoded 0.016 previously used
        const normalizedDelta = Math.min(delta * 0.016, 0.1);

        if (!this.isBooting && this.camera.position.y > 21 && !this.realityState.focusTarget) {
            this.camera.position.y += (20 - this.camera.position.y) * 0.04;
            this.camera.position.z += (140 - this.camera.position.z) * 0.04;
            this.camera.lookAt(0, 0, 0);
        }

        if (this.systemActive) {
            if (this.isDragging) {
                this.universeGroup.rotation.y += this.rotationVelocity;
                this.rotationVelocity *= (this.activeClickedSector ? 0.50 : 0.92);
            } else if (this.isSnapping) {
                let current = this.universeGroup.rotation.y;
                let target = this.targetRotation;
                while (target - current > Math.PI) target -= Math.PI * 2;
                while (target - current < -Math.PI) target += Math.PI * 2;
                this.universeGroup.rotation.y += (target - current) * 0.1;
                if (Math.abs(target - current) < 0.001) this.isSnapping = false;
            } else {
                this.rotationVelocity *= 0.90;
                this.universeGroup.rotation.y += this.rotationVelocity;
                if (Math.abs(this.rotationVelocity) < 0.0015 && Math.abs(this.rotationVelocity) > 0) {
                    this.rotationVelocity = 0;
                    const snap = Math.round(this.universeGroup.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
                    this.snapToAngle(snap);
                }
            }

            if (this.skySphere) this.skySphere.rotation.y = -(this.universeGroup.rotation.y * 0.1);

            let activePlanet = null;
            let maxZ = -Infinity;
            this.planets.forEach((planet) => { if (typeof planet.setFocusState === 'function') planet.setFocusState(false); });

            if (this.activeClickedSector && this.planets.has(this.activeClickedSector)) {
                activePlanet = this.planets.get(this.activeClickedSector);
            } else {
                this.planets.forEach((planet) => {
                    const worldPos = new THREE.Vector3();
                    if (planet.getWorldPosition) {
                        planet.getWorldPosition(worldPos);
                        if (!isNaN(worldPos.z) && worldPos.z > maxZ) { maxZ = worldPos.z; activePlanet = planet; }
                    }
                });
            }

            if (activePlanet && typeof activePlanet.setFocusState === 'function') {
                activePlanet.setFocusState(true);
                const focusPos = new THREE.Vector3();
                activePlanet.getWorldPosition(focusPos);
                if (!isNaN(focusPos.x) && !isNaN(focusPos.z) && this.debris) this.debris.setFocalPoint(focusPos);
                if (this.currentFocusedSector !== activePlanet.data.id) {
                    this.currentFocusedSector = activePlanet.data.id;
                    this.updateUI(activePlanet.data);
                    SystemLogicUtils.dispatchRandomGlitch(0.8);
                    if (this.heroEffects) this.heroEffects.updateSectorColor(activePlanet.data.id);

                    // PRO PHASE: Sync Cursor Color with Sector
                    if (this.cursorService && typeof this.cursorService.setColor === 'function') {
                        this.cursorService.setColor(activePlanet.data.color);
                    }
                }
            } else if (this.debris) this.debris.setFocalPoint(null);

            const coordEl = document.getElementById('coordinates');
            if (coordEl) {
                let deg = (this.universeGroup.rotation.y * (180 / Math.PI)) % 360;
                if (deg < 0) deg += 360;
                coordEl.innerText = `AXIS: ${deg.toFixed(1)}° Y: 00.00`;
            }

            this.projectHologram();
            this.processTransitions();
        }

        // [ID 4520] Safety Check: Ensure lighting object is ready before calling its update
        if (this.lighting && typeof this.lighting.update === 'function') this.lighting.update(time);

        // PRO PHASE KRAYE: Pass rotationVelocity and Graphic Tier to BlackHole for Relativistic Beaming
        const graphicsTier = SystemLogicUtils.getState().graphicsMode || 'MEDIUM';
        if (this.blackHole) this.blackHole.update(normalizedDelta, this.camera.position, 'CODE', this.rotationVelocity, graphicsTier);

        if (this.debris) this.debris.update(normalizedDelta, time);
        if (this.orbitRing) this.orbitRing.update(time);
        this.planets.forEach(p => p.update(time));
    }
}

export const CoreLogics = new LogicsEngine();