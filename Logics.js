/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /Logics.js
 * Purpose: Central System Brain, Hologram Projection, Typewriter Orchestration, Mobile Kinetics & Asset Mounting
 * STATUS: PRO_PHASE_LOGICS_STABLE_INTERACTIVE
 * LINE_COUNT: ~680 Lines.
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
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_LOGICS_STABLE_INTERACTIVE
 */

import * as THREE from 'three'; /* */

import { GlobalInput } from './core/Input.js'; /* */
import { CoreRenderer } from './core/Renderer.js'; /* */
import { Lighting } from './world/Lighting.js'; /* */
import { DebrisField } from './world/DebrisField.js'; /* */
import { OrbitRing } from './world/OrbitRing.js'; /* */
import { HeroPlanet } from './entities/HeroPlanet.js'; /* */
import { BlackHole } from './entities/BlackHole.js'; /* */
import { ModelManager } from './loaders/ModelManager.js'; /* */

import { HeroEffects } from './effects/HeroEffects.js'; /* */
import { AudioEngine } from './systems/audio.js'; /* */
import { Terminal } from './ui/Terminal.js'; /* */

// REALITY AUDIT: Import the state machine, dispatcher, and event bus
import { Logics as SystemLogicUtils } from './utils/logics.js'; /* */
import { SystemEvents, EVENTS } from './utils/events.js'; /* */

class LogicsEngine {
    constructor() {
        this.scene = new THREE.Scene(); /* */

        // CAMERA: Starts high up for the "Boot Drop" animation
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); /* */
        this.camera.position.set(0, 150, 150); /* */
        this.camera.lookAt(0, 0, 0); /* */

        // System States
        this.isBooting = true; /* */
        this.systemActive = false; /* */
        this.currentFocusedSector = null; /* */
        this.activeClickedSector = null; /* */

        // Physics State
        this.rotationVelocity = 0; /* */
        this.targetRotation = 0; /* */
        this.isDragging = false; /* */
        this.isSnapping = false; /* */

        // REALITY AUDIT: Cinematic State Registry
        this.realityState = {
            isTransitioning: false, /* */
            focusTarget: null, /* */
            lastAuditTime: 0 /* */
        };

        // Managers
        this.raycaster = new THREE.Raycaster(); /* */
        this.pointer = new THREE.Vector2(); /* */

        // Layer Managers
        this.heroEffects = null; /* */

        // REALITY AUDIT 41: Initialize Industrial Terminal
        this.terminal = new Terminal('terminal-window', 'terminal-header', 'terminal-content', 'terminal-input'); /* */

        // SECTOR DATA
        this.sectors = [
            { id: 'TECH', label: 'CENTRAL_HUB', color: 0x00f3ff, angle: 0 }, /* */
            { id: 'VISION', label: 'CREATIVE_DESIGN', color: 0xff00ff, angle: Math.PI / 2 }, /* */
            { id: 'CODE', label: 'FULL_STACK_DEV', color: 0x8a2be2, angle: Math.PI }, /* */
            { id: 'CONTACT', label: 'SIGNAL_TRANSMISSION', color: 0xffaa00, angle: -Math.PI / 2 } /* */
        ];

        this.planets = new Map(); /* */

        // DECOUPLED PIPELINE: Initialize ModelManager
        this.modelManager = new ModelManager(this); /* */

        this.init(); /* */
    }

    init() {
        // ==========================================
        // 1. PRO PHASE: NATURE SYNC (stars.webp)
        // ==========================================
        const textureLoader = new THREE.TextureLoader(); /* */

        textureLoader.load('./assets/textures/environment/stars.webp', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping; /* */
            texture.colorSpace = THREE.SRGBColorSpace; /* */

            // REALITY AUDIT: The "Earth Structure" Ghost Fix
            // Intentionally left commented out to kill mirror reflections.
            // this.scene.environment = texture;

            if (this.skySphere) {
                this.skySphere.material.map = texture; /* */
                this.skySphere.material.needsUpdate = true; /* */
            }
        }); /* */

        // Force the background to black so the FilmPass scanlines look cinematic
        this.scene.background = new THREE.Color(0x000000); /* */

        // ==========================================
        // 2. ROTATING SKY SPHERE
        // ==========================================
        const skyGeo = new THREE.SphereGeometry(400, 64, 64); /* */
        const skyMat = new THREE.MeshBasicMaterial({
            side: THREE.BackSide, /* */
            fog: false /* */
        });

        this.skySphere = new THREE.Mesh(skyGeo, skyMat); /* */
        this.scene.add(this.skySphere); /* */

        // World Setup
        this.universeGroup = new THREE.Group(); /* */
        this.scene.add(this.universeGroup); /* */

        // LIGHTING & GOD OBJECTS INITIATED
        this.lighting = new Lighting(this.scene); /* */

        this.blackHole = new BlackHole(); /* */
        this.scene.add(this.blackHole); /* */

        this.debris = new DebrisField(this.universeGroup, 800); /* */
        this.orbitRing = new OrbitRing(this.universeGroup); /* */

        // SPAWN LOGIC: Universal Orbit Migration
        this.sectors.forEach(data => {
            const planet = new HeroPlanet(data); /* */
            this.universeGroup.add(planet); /* */
            this.planets.set(data.id, planet); /* */
        }); /* */

        // Mount Assets & Bind UI
        this.mountAssets(); /* */
        this.bindEvents(); /* */
        this.bindUI(); /* */

        // Start Render Loop
        this.animate(); /* */
    }

    async mountAssets() {
        const btnEnter = document.getElementById('btn-enter-system'); /* */

        // REALITY AUDIT 48: DELEGATE MOUNTING TO NEW MANAGER
        await this.modelManager.mountSectorModels(); /* */

        console.log(":: SYSTEM_ASSETS_MOUNTED (ModelManager Verified)"); /* */
        if (btnEnter) btnEnter.classList.remove('hidden'); /* */
    }

    bindUI() {
        const btnEnter = document.getElementById('btn-enter-system'); /* */
        if (btnEnter) {
            btnEnter.addEventListener('click', () => {
                // ==========================================
                // REALITY AUDIT: Acoustic Handshake [ID 1407]
                // ==========================================
                if (AudioEngine && typeof AudioEngine.unlock === 'function') {
                    AudioEngine.unlock(); /* */
                }

                // CULPRIT 1409 / OMISSION 84: Forced WebGL Initialization Handshake
                // By overriding the DOM synchronously, we prevent the render cycle from blocking interaction.
                const bootScreen = document.getElementById('os-greeting'); /* */
                if (bootScreen) {
                    bootScreen.style.opacity = '0'; /* */
                    bootScreen.style.pointerEvents = 'none'; /* */
                }

                const canvasLayer = document.getElementById('webgl-canvas'); /* */
                if (canvasLayer) {
                    canvasLayer.style.visibility = 'visible'; /* */
                    canvasLayer.style.opacity = '1'; /* */
                }

                this.isBooting = false; /* */
                this.systemActive = true; /* */

                setTimeout(() => {
                    if (bootScreen) bootScreen.style.display = 'none'; /* */

                    // ==========================================
                    // REALITY AUDIT: Boot-Phase Isolation (Hero Name)
                    // ==========================================
                    const heroContainer = document.getElementById('hero-name-viewport'); /* */
                    if (heroContainer) {
                        this.heroEffects = new HeroEffects(heroContainer); /* */
                        SystemLogicUtils.dispatchRandomGlitch(1.5); /* */
                    }
                }, 1000); /* */
            }); /* */
        }
    }

    bindEvents() {
        GlobalInput.on('dragMove', (e) => {
            if (!this.systemActive) return; /* */

            // REALITY AUDIT: Mobile "Swipe to Dismiss" Escape Hatch [ID 1408]
            if (this.activeClickedSector && e.detail.velocityY > 0.05) {
                this.clearRealityFocus(); /* */
                return; /* */
            }

            // REALITY AUDIT 42: Lock momentum if we are perfectly zoomed or Terminal UI is focused to prevent orbit drift
            if (SystemLogicUtils.getState().isZooming || SystemLogicUtils.getState().isUIFocused) return; /* */

            this.isDragging = true; /* */
            this.isSnapping = false; /* */

            this.realityState.isTransitioning = false; /* */

            // Clear lock and dismiss holograms on deep horizontal drag
            if (Math.abs(e.detail.velocityX) > 0.02) {
                this.clearRealityFocus(); /* */
            }

            this.rotationVelocity += e.detail.velocityX; /* */

            // SAFE IMPROV: Trigger velocity-scaled glitch on high-speed drag
            if (Math.abs(e.detail.velocityX) > 0.05) {
                // REALITY AUDIT 32: Velocity-Scaled Anomalies
                const dragIntensity = Math.min(2.5, Math.abs(e.detail.velocityX) * 15); /* */
                SystemLogicUtils.dispatchRandomGlitch(dragIntensity); /* */
            }

            const hint = document.getElementById('interaction-hint'); /* */
            if (hint) hint.style.opacity = '0'; /* */
        });

        GlobalInput.on('inputHover', (e) => {
            if (!this.systemActive) return; /* */
            this.checkIntersection(e.detail.x, e.detail.y, false); /* */
        });

        GlobalInput.on('inputDown', (e) => {
            if (!this.systemActive) return; /* */

            // REALITY AUDIT: The Ripple Impact Trigger
            SystemLogicUtils.dispatchRandomGlitch(1.0); /* */

            // REALITY AUDIT: Prevent clicks from hitting the 3D world if targeting Holograms
            const holo = document.getElementById('hologram-viewport'); /* */
            if (holo && !holo.classList.contains('hidden')) {
                const rect = holo.getBoundingClientRect(); /* */
                if (e.detail.x >= rect.left && e.detail.x <= rect.right &&
                    e.detail.y >= rect.top && e.detail.y <= rect.bottom) {
                    return; // Let the click pass to the HTML shard
                }
            }

            this.checkIntersection(e.detail.x, e.detail.y, true); /* */
        });

        GlobalInput.on('inputUp', () => {
            this.isDragging = false; /* */
        });

        // REALITY AUDIT 41: Terminal Toggle Subscription
        SystemEvents.subscribe(EVENTS.DRAWER_TOGGLED, (type) => {
            if (type === 'TERMINAL' && this.terminal) {
                const isVisible = this.terminal.el.classList.contains('visible'); /* */
                if (!isVisible) this.terminal.show(); /* */
                else this.terminal.hide(); /* */
            }
        });

        // Terminal Command Handshake
        SystemEvents.subscribe(EVENTS.TERMINAL_CMD_EXEC || 'TERMINAL_CMD_EXEC', (cmd) => {
            const result = this.executeSystemOverride(cmd); /* */
            if (result && result.message) this.terminal.printLine(result.message, result.success ? '#00ff00' : '#ff0000'); /* */
        });

        window.addEventListener('resize', () => this.handleResize()); /* */
    }

    // ==========================================
    // REALITY AUDIT 34: EXTERNAL API HOOKS (Terminal Engine Handshake)
    // Allows the CLI to bypass physical inputs and directly manipulate the 3D Universe.
    // ==========================================
    executeSystemOverride(command, payload = null) {
        const cmdParts = command.toLowerCase().split(' '); /* */
        const base = cmdParts[0]; /* */
        const arg = cmdParts[1]; /* */

        switch (base) {
            case 'velocity':
                this.isDragging = false; /* */
                this.isSnapping = false; /* */
                this.rotationVelocity += parseFloat(arg) || 0.1; /* */
                return { success: true, message: `ROTATION_VELOCITY_ADJUSTED: ${this.rotationVelocity.toFixed(3)}` }; /* */
            case 'reboot':
                this.clearRealityFocus(); /* */
                this.rotationVelocity = 0.5; /* */
                SystemLogicUtils.dispatchRandomGlitch(2.5); /* */
                return { success: true, message: "SYSTEM_REBOOT_INITIATED..." }; /* */
            case 'scan':
                if (this.currentFocusedSector === 'CODE' || this.currentFocusedSector === 'VISION') {
                    SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK'); /* */
                    return { success: true, message: "ENCRYPTED_SHARD_FOUND: XJ-99 (secret_bio.pkg)" }; /* */
                }
                return { success: false, message: "ERROR: NO_SIGNALS_IN_CURRENT_SECTOR" }; /* */
            case 'goto':
                const sector = arg ? arg.toUpperCase() : null; /* */
                if (this.planets.has(sector)) {
                    this.activeClickedSector = sector; /* */
                    this.activateSector({ id: sector }); /* */
                    this.triggerRealityFocus({ id: sector }); /* */
                    return { success: true, message: `FOCUS_LOCKED_ON_SECTOR_${sector}` }; /* */
                }
                return { success: false, message: "ERROR: SECTOR_NOT_FOUND" }; /* */
            case 'help':
                return { success: true, message: "AVAIL_COMMANDS: velocity, reboot, scan, goto [sector], help" }; /* */
            default:
                return { success: false, message: `ERROR: COMMAND_NOT_RECOGNIZED: ${base}` }; /* */
        }
    }

    checkIntersection(clientX, clientY, isClick) {
        this.pointer.x = (clientX / window.innerWidth) * 2 - 1; /* */
        this.pointer.y = -(clientY / window.innerHeight) * 2 + 1; /* */

        this.raycaster.setFromCamera(this.pointer, this.camera); /* */

        // Hardened Logic: Filter out any undefined or uninitialized planet meshes
        const planetMeshes = Array.from(this.planets.values())
            .map(p => p.planetMesh)
            .filter(mesh => mesh !== undefined && mesh !== null); /* */

        if (planetMeshes.length === 0) return; // Exit if no models are ready

        const intersects = this.raycaster.intersectObjects(planetMeshes, false); /* */

        this.planets.forEach(p => p.setHoverState(false)); /* */
        document.body.style.cursor = 'crosshair'; /* */

        if (intersects.length > 0) {
            const hitObject = intersects[0].object; /* */
            const parentPlanet = this.planets.get(hitObject.userData.id); /* */

            if (parentPlanet) {
                parentPlanet.setHoverState(true); /* */
                document.body.style.cursor = 'pointer'; /* */

                if (isClick) {
                    this.activeClickedSector = hitObject.userData.id; /* */
                    this.activateSector(hitObject.userData); /* */
                    this.triggerRealityFocus(hitObject.userData); /* */
                }
            }
        } else if (isClick && this.activeClickedSector) {
            this.clearRealityFocus(); /* */
        }
    }

    async runTypewriter(element, text, delay = 20) {
        element.innerHTML = ''; /* */
        for (let i = 0; i < text.length; i++) {
            element.innerHTML += text[i]; /* */
            SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK'); /* */
            await new Promise(res => setTimeout(res, delay)); /* */
        }
    }

    activateSector(data) {
        const strictData = this.planets.get(data.id).data; /* */
        this.snapToAngle(-strictData.angle); /* */

        const holoData = SystemLogicUtils.getHologramData(); /* */
        const holoContainer = document.getElementById('hologram-viewport'); /* */

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
            `; /* */

            setTimeout(() => {
                const idEl = document.getElementById('type-id-body'); /* */
                const diagEl = document.getElementById('type-diag-body'); /* */
                const skillEl = document.getElementById('type-skill-body'); /* */

                if (idEl) this.runTypewriter(idEl, `ID: ${holoData.identity.name}\nSTATUS: ${holoData.identity.status}`); /* */
                if (diagEl) setTimeout(() => this.runTypewriter(diagEl, `MODULE: ${holoData.diagnostics.label}\nTYPE: ${holoData.diagnostics.type}\n---\n${holoData.diagnostics.bio}`), 400); /* */
                if (skillEl) {
                    let skillStr = holoData.skills.data.map(s => `> ${s.name}: ${(s.level * 100).toFixed(0)}%`).join('\n'); /* */
                    setTimeout(() => this.runTypewriter(skillEl, skillStr), 800); /* */
                }
            }, 600); /* */
        }

        SystemEvents.publish(EVENTS.TOGGLE_HOLOGRAM || 'TOGGLE_HOLOGRAM', {
            sectorId: strictData.id, /* */
            active: true /* */
        }); /* */
    }

    triggerRealityFocus(data) {
        this.realityState.isTransitioning = true; /* */
        this.realityState.focusTarget = new THREE.Vector3(0, 5, 75); /* */
        if (typeof SystemLogicUtils.setZooming === 'function') {
            SystemLogicUtils.setZooming(true); /* */
        }
    }

    clearRealityFocus() {
        this.activeClickedSector = null; /* */
        this.realityState.isTransitioning = true; /* */
        this.realityState.focusTarget = new THREE.Vector3(0, 20, 140); /* */
        if (typeof SystemLogicUtils.setZooming === 'function') {
            SystemLogicUtils.setZooming(false); /* */
        }

        SystemEvents.publish(EVENTS.TOGGLE_HOLOGRAM || 'TOGGLE_HOLOGRAM', { active: false }); /* */

        const holo = document.getElementById('hologram-viewport'); /* */
        if (holo) {
            holo.classList.add('hidden'); /* */
            setTimeout(() => { if (holo.classList.contains('hidden')) holo.innerHTML = ''; }, 600); /* */
        }
    }

    snapToAngle(targetAngle) {
        this.targetRotation = targetAngle; /* */
        this.isSnapping = true; /* */
    }

    processTransitions() {
        if (!this.realityState.isTransitioning || !this.realityState.focusTarget) return; /* */
        this.camera.position.lerp(this.realityState.focusTarget, 0.05); /* */

        if (this.activeClickedSector) {
            const activePlanet = this.planets.get(this.activeClickedSector); /* */
            if (activePlanet) {
                const pPos = new THREE.Vector3(); /* */
                activePlanet.getWorldPosition(pPos); /* */
                this.camera.lookAt(pPos); /* */
            } else {
                this.camera.lookAt(0, 0, 0); /* */
            }
        } else {
            this.camera.lookAt(0, 0, 0); /* */
        }

        if (this.camera.position.distanceTo(this.realityState.focusTarget) < 0.1) {
            this.realityState.isTransitioning = false; /* */
        }
    }

    projectHologram() {
        if (!this.activeClickedSector || !this.systemActive) return; /* */
        const activePlanet = this.planets.get(this.activeClickedSector); /* */
        if (!activePlanet) return; /* */

        const pos = new THREE.Vector3(); /* */
        activePlanet.getWorldPosition(pos); /* */
        pos.project(this.camera); /* */

        const x = (pos.x * 0.5 + 0.5) * window.innerWidth; /* */
        const y = (pos.y * -0.5 + 0.5) * window.innerHeight; /* */

        const holo = document.getElementById('hologram-viewport'); /* */
        if (holo) {
            holo.classList.remove('hidden'); /* */
            const scale = this.realityState.isTransitioning ? 0.9 : 1.0; /* */
            holo.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`; /* */
        }
    }

    updateUI(activeSector) {
        const title = document.getElementById('hud-sector-title'); /* */
        const fill = document.getElementById('hud-progress-fill'); /* */

        if (title) {
            title.innerText = `SECTOR // ${activeSector ? activeSector.id : 'TRANSIT'}`; /* */
            title.style.color = activeSector ? '#' + activeSector.color.toString(16) : '#ffffff'; /* */
            title.style.textShadow = activeSector ? `0 0 15px #${activeSector.color.toString(16)}` : 'none'; /* */
        }

        if (fill && activeSector) {
            fill.style.backgroundColor = '#' + activeSector.color.toString(16); /* */
            fill.style.boxShadow = `0 0 12px #${activeSector.color.toString(16)}`; /* */
        }
    }

    handleResize() {
        const width = window.innerWidth; /* */
        const height = window.innerHeight; /* */
        this.camera.aspect = width / height; /* */
        this.camera.updateProjectionMatrix(); /* */
        if (CoreRenderer && typeof CoreRenderer.handleResize === 'function') CoreRenderer.handleResize(width, height); /* */
    }

    dispose() {
        this.realityState.isTransitioning = false; /* */
        this.planets.forEach(p => { if (p.dispose) p.dispose(); }); /* */
        if (this.debris && this.debris.dispose) this.debris.dispose(); /* */
        if (this.lighting && this.lighting.dispose) this.lighting.dispose(); /* */
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this)); /* */
        const time = performance.now() * 0.001; /* */
        const delta = 0.016; /* */

        if (!this.isBooting && this.camera.position.y > 21 && !this.realityState.focusTarget) {
            this.camera.position.y += (20 - this.camera.position.y) * 0.04; /* */
            this.camera.position.z += (140 - this.camera.position.z) * 0.04; /* */
            this.camera.lookAt(0, 0, 0); /* */
        }

        if (this.systemActive) {
            if (this.isDragging) {
                this.universeGroup.rotation.y += this.rotationVelocity; /* */
                this.rotationVelocity *= (this.activeClickedSector ? 0.50 : 0.92); /* */
            } else if (this.isSnapping) {
                let current = this.universeGroup.rotation.y; /* */
                let target = this.targetRotation; /* */
                while (target - current > Math.PI) target -= Math.PI * 2; /* */
                while (target - current < -Math.PI) target += Math.PI * 2; /* */
                this.universeGroup.rotation.y += (target - current) * 0.1; /* */
                if (Math.abs(target - current) < 0.001) this.isSnapping = false; /* */
            } else {
                this.rotationVelocity *= 0.90; /* */
                this.universeGroup.rotation.y += this.rotationVelocity; /* */
                if (Math.abs(this.rotationVelocity) < 0.0015 && Math.abs(this.rotationVelocity) > 0) {
                    this.rotationVelocity = 0; /* */
                    const snap = Math.round(this.universeGroup.rotation.y / (Math.PI / 2)) * (Math.PI / 2); /* */
                    this.snapToAngle(snap); /* */
                }
            }

            if (this.skySphere) this.skySphere.rotation.y = -(this.universeGroup.rotation.y * 0.1); /* */

            let activePlanet = null; /* */
            let maxZ = -Infinity; /* */
            this.planets.forEach((planet) => { if (typeof planet.setFocusState === 'function') planet.setFocusState(false); }); /* */

            if (this.activeClickedSector && this.planets.has(this.activeClickedSector)) {
                activePlanet = this.planets.get(this.activeClickedSector); /* */
            } else {
                this.planets.forEach((planet) => {
                    const worldPos = new THREE.Vector3(); /* */
                    if (planet.getWorldPosition) {
                        planet.getWorldPosition(worldPos); /* */
                        if (!isNaN(worldPos.z) && worldPos.z > maxZ) { maxZ = worldPos.z; activePlanet = planet; } /* */
                    }
                });
            }

            if (activePlanet && typeof activePlanet.setFocusState === 'function') {
                activePlanet.setFocusState(true); /* */
                const focusPos = new THREE.Vector3(); /* */
                activePlanet.getWorldPosition(focusPos); /* */
                if (!isNaN(focusPos.x) && !isNaN(focusPos.z) && this.debris) this.debris.setFocalPoint(focusPos); /* */
                if (this.currentFocusedSector !== activePlanet.data.id) {
                    this.currentFocusedSector = activePlanet.data.id; /* */
                    this.updateUI(activePlanet.data); /* */
                    SystemLogicUtils.dispatchRandomGlitch(0.8); /* */
                    if (this.heroEffects) this.heroEffects.updateSectorColor(activePlanet.data.id); /* */
                }
            } else if (this.debris) this.debris.setFocalPoint(null); /* */

            const coordEl = document.getElementById('coordinates'); /* */
            if (coordEl) {
                let deg = (this.universeGroup.rotation.y * (180 / Math.PI)) % 360; /* */
                if (deg < 0) deg += 360; /* */
                coordEl.innerText = `AXIS: ${deg.toFixed(1)}° Y: 00.00`; /* */
            }

            this.projectHologram(); /* */
            this.processTransitions(); /* */
        }

        this.lighting.update(time); /* */
        if (this.blackHole) this.blackHole.update(delta, this.camera.position, 'CODE'); /* */
        if (this.debris) this.debris.update(delta, time); /* */
        if (this.orbitRing) this.orbitRing.update(time); /* */
        this.planets.forEach(p => p.update(time)); /* */
        if (CoreRenderer && typeof CoreRenderer.monitorPerformance === 'function') CoreRenderer.monitorPerformance(); /* */
        CoreRenderer.render(this.scene, this.camera); /* */
    }
}

export const CoreLogics = new LogicsEngine(); /* */