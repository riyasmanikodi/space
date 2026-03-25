/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /Logics.js
 * Purpose: Central System Brain, Hologram Projection, Typewriter Orchestration, Mobile Kinetics & Asset Mounting
 * STATUS: PRO_PHASE_GEOMETRIC_CURSOR_INTEGRATED
 * LINE_COUNT: ~830 Lines.
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
 * - SYSTEM: [APPEND] Synchronized Sector DNA with uppercase constants to resolve dictionary lookup failures.
 * - SYSTEM: [PRO PHASE] Restored environment starfield (stars.webp) and SkySphere geometry to maintain deep space background layer.
 * - SYSTEM: [PRO PHASE] Verified single-background layer architecture to eliminate overlapping procedural particle noise.
 * - SYSTEM: [PRO PHASE] Bootstrapped Geometric Shard Engine (CursorService) into OS runtime.
 * - SYSTEM: [PRO PHASE] Linked Universe Sector Color states to the CursorService for unified thermal glow.
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
 * - Fixed: [APPEND] Synchronized Logics.js dictionary keys with global uppercase data structure.
 * - Fixed: [PRO PHASE] Restored TextureLoader for `stars.webp` with SRGBColorSpace mapping.
 * - Fixed: [PRO PHASE] Hardened single-background architectural boundary.
 * - Fixed: [PRO PHASE] Injected global CSS override to suppress native DOM pointers, ensuring 1:1 kinetic tracking.
 * - Fixed: [PRO PHASE] Bound rotationVelocity to cursor setMomentum API (if available) to simulate orbital drag on the exhaust trail.
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
 * - RIPPLE: [APPEND] Correcting the module handshake allows the UniverseGroup and Lighting shards to finally project to the canvas.
 * - RIPPLE: [APPEND] The asynchronous syncHardware block guarantees Scene and Camera instances are fully resolved before injection, preventing the Viewport Static Lock.
 * - RIPPLE: [PRO PHASE] Awaiting syncHardware ensures CoreScene possesses the UniverseGroup before CoreLoop attempts to render it.
 * - RIPPLE: [APPEND] Resolving the constructor race condition and uppercase ID synchronization stabilizes boot and ensures holographic shards display correct data.
 * - RIPPLE: [PRO PHASE] The background features distant stars, the midground features black asteroids, and the foreground is completely clean of green grime.
 * - RIPPLE: [PRO PHASE] The entire OS is now navigable using the low-poly flaming meteorite.
 * - RIPPLE: [PRO PHASE] The meteorite fire trail dynamically shifts hue (Purple for CODE, Cyan for TECH) as the user explores the universe.
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
 * - APPEND 116: [APPEND] Ticker Migration - Verified that CoreLoop accurately receives Logics payload without local requestAnimationFrame conflicts.
 * - APPEND 120: [APPEND] Synchronization Safety - Verified module singletons resolve before renderer demands the context.
 * - APPEND 130: [PRO PHASE] Handshake Sync - Confirmed init() blocks mountAssets() until CoreScene and CoreCamera singletons are verified.
 * - APPEND 131: [PRO PHASE] Capitalization Sync - Verified uppercase usage across sector definitions to prevent data drops.
 * - APPEND 261: [PRO PHASE] Layer Audit - Verified `stars.webp` loads correctly onto the 400-radius SkySphere without interfering with bloom thresholds.
 * - APPEND 263: [PRO PHASE] Vacuum Optics Audit - Confirmed Logics orchestration strictly mounts SkySphere without redundant particle generation.
 * - APPEND 420: Cursor Handshake - Verified CursorService boots independently without blocking the main CoreScene render thread.
 * - APPEND 450: [PRO PHASE] Color Sync Audit - Verified CursorService.setColor cleanly parses hex integers from the planet sector data.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_GEOMETRIC_CURSOR_INTEGRATED
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

class LogicsEngine {
    constructor() {
        this.scene = new THREE.Scene();

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
        this.cursorService = null; // PRO PHASE: Cursor Reference

        // REALITY AUDIT 41: Initialize Industrial Terminal
        this.terminal = new Terminal('terminal-window', 'terminal-header', 'terminal-content', 'terminal-input');

        // SECTOR DATA
        this.sectors = [
            { id: 'TECH', label: 'CENTRAL_HUB', color: 0x00f3ff, angle: 0 },
            { id: 'VISION', label: 'CREATIVE_DESIGN', color: 0xff00ff, angle: Math.PI / 2 },
            { id: 'CODE', label: 'FULL_STACK_DEV', color: 0x8a2be2, angle: Math.PI },
            { id: 'CONTACT', label: 'SIGNAL_TRANSMISSION', color: 0xffaa00, angle: -Math.PI / 2 }
        ];

        this.planets = new Map();

        // DECOUPLED PIPELINE: Initialize ModelManager
        this.modelManager = new ModelManager(this);

        this.init();
    }

    async init() {
        // ==========================================
        // 1. PRO PHASE: NATURE SYNC (stars.webp)
        // RESTORED: Background star layer [ID 2658]
        // ==========================================
        const textureLoader = new THREE.TextureLoader();

        textureLoader.load('./assets/textures/environment/stars.webp', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;

            if (this.skySphere) {
                this.skySphere.material.map = texture;
                this.skySphere.material.needsUpdate = true;
            }
        });

        // Force the background to black so the FilmPass scanlines look cinematic
        this.scene.background = new THREE.Color(0x000000);

        // ==========================================
        // 2. ROTATING SKY SPHERE
        // ==========================================
        const skyGeo = new THREE.SphereGeometry(400, 64, 64);
        const skyMat = new THREE.MeshBasicMaterial({
            side: THREE.BackSide,
            fog: false
        });

        this.skySphere = new THREE.Mesh(skyGeo, skyMat);
        this.scene.add(this.skySphere);

        // World Setup
        this.universeGroup = new THREE.Group();
        this.scene.add(this.universeGroup);

        // LIGHTING & GOD OBJECTS INITIATED
        this.lighting = new Lighting(this.scene);

        this.blackHole = new BlackHole();
        this.scene.add(this.blackHole);

        this.debris = new DebrisField(this.universeGroup, 800);
        this.orbitRing = new OrbitRing(this.universeGroup);

        // SPAWN LOGIC: Universal Orbit Migration
        this.sectors.forEach(data => {
            const planet = new HeroPlanet(data);
            this.universeGroup.add(planet);
            this.planets.set(data.id, planet);
        });

        // ==========================================
        // PRO PHASE: GEOMETRIC CURSOR ENGINE
        // ==========================================
        document.body.style.cursor = 'none';
        const cursorStyle = document.createElement('style');
        cursorStyle.innerHTML = `* { cursor: none !important; }`;
        document.head.appendChild(cursorStyle);

        try {
            this.cursorService = new CursorService();
            console.log(":: GEOMETRIC_SHARD_ENGINE_ONLINE");
        } catch (error) {
            console.error(":: CURSOR_ENGINE_FAILURE", error);
        }

        // Bind Events & UI
        this.bindEvents();
        this.bindUI();

        // REALITY AUDIT: Explicitly await hardware synchronization before mounting assets
        await this.syncHardware();

        // Mount Assets (triggers render loop)
        this.mountAssets();
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

            if (sceneMod.CoreScene && typeof sceneMod.CoreScene.set === 'function') {
                sceneMod.CoreScene.set(this.scene);
            }
            if (cameraMod.CoreCamera && typeof cameraMod.CoreCamera.set === 'function') {
                cameraMod.CoreCamera.set(this.camera);
            }
        } catch (e) {
            console.error(":: HARDWARE_SYNC_FAILURE", e);
        }
    }

    async mountAssets() {
        const btnEnter = document.getElementById('btn-enter-system');

        // REALITY AUDIT 48: DELEGATE MOUNTING TO NEW MANAGER
        await this.modelManager.mountSectorModels();

        console.log(":: SYSTEM_ASSETS_MOUNTED (ModelManager Verified)");
        if (btnEnter) btnEnter.classList.remove('hidden');

        // Ignition for the central loop
        CoreLoop.start();

        // [APPEND] Inject Logics.update into the CoreLoop so the universe rotates and renders correctly
        CoreLoop.addUpdatable(this);
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

        window.addEventListener('resize', () => this.handleResize());
    }

    // ==========================================
    // REALITY AUDIT 34: EXTERNAL API HOOKS (Terminal Engine Handshake)
    // Allows the CLI to bypass physical inputs and directly manipulate the 3D Universe.
    // ==========================================
    executeSystemOverride(command, payload = null) {
        const cmdParts = command.toLowerCase().split(' ');
        const base = cmdParts[0];
        const arg = cmdParts[1];

        switch (base) {
            case 'velocity':
                this.isDragging = false;
                this.isSnapping = false;
                this.rotationVelocity += parseFloat(arg) || 0.1;
                return { success: true, message: `ROTATION_VELOCITY_ADJUSTED: ${this.rotationVelocity.toFixed(3)}` };
            case 'reboot':
                this.clearRealityFocus();
                this.rotationVelocity = 0.5;
                SystemLogicUtils.dispatchRandomGlitch(2.5);
                return { success: true, message: "SYSTEM_REBOOT_INITIATED..." };
            case 'scan':
                if (this.currentFocusedSector === 'CODE' || this.currentFocusedSector === 'VISION') {
                    SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK');
                    return { success: true, message: "ENCRYPTED_SHARD_FOUND: XJ-99 (secret_bio.pkg)" };
                }
                return { success: false, message: "ERROR: NO_SIGNALS_IN_CURRENT_SECTOR" };
            case 'goto':
                const sector = arg ? arg.toUpperCase() : null;
                if (this.planets.has(sector)) {
                    this.activeClickedSector = sector;
                    this.activateSector({ id: sector });
                    this.triggerRealityFocus({ id: sector });
                    return { success: true, message: `FOCUS_LOCKED_ON_SECTOR_${sector}` };
                }
                return { success: false, message: "ERROR: SECTOR_NOT_FOUND" };
            case 'help':
                return { success: true, message: "AVAIL_COMMANDS: velocity, reboot, scan, goto [sector], help" };
            default:
                return { success: false, message: `ERROR: COMMAND_NOT_RECOGNIZED: ${base}` };
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
        for (let i = 0; i < text.length; i++) {
            element.innerHTML += text[i];
            SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK');
            await new Promise(res => setTimeout(res, delay));
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
            title.innerText = `SECTOR // ${activeSector ? activeSector.id : 'TRANSIT'}`;
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

        this.lighting.update(time);
        if (this.blackHole) this.blackHole.update(normalizedDelta, this.camera.position, 'CODE');
        if (this.debris) this.debris.update(normalizedDelta, time);
        if (this.orbitRing) this.orbitRing.update(time);
        this.planets.forEach(p => p.update(time));
    }
}

export const CoreLogics = new LogicsEngine();