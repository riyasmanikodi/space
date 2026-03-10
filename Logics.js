/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /Logics.js
 * Purpose: Central System Brain, Hologram Projection & Viewport Centering
 * * * * KRAYE LOG V28:
 * - SYSTEM: Holographic Projection Engine active. Replaced static glass terminal with 3D-tracked data shards.
 * - SYSTEM: Viewport Centering fixed. Camera now targets a true center-front vector instead of chasing rotating meshes.
 * * * * CULPRIT LOG V28:
 * - FIXED [ID 1401]: Right-Side Zoom Offset. Removed competing camera rotation logic. The camera now lerps straight to (0, 5, 75) while the universe snaps the planet to the front.
 * - FIXED [ID 1402]: Viewport Blocking. Purged #os-terminal DOM manipulation in favor of the new Hologram Projection matrix.
 * - FIXED [ID 1404]: Shattered Handshake. Injected the Hologram Builder into activateSector to dynamically construct DOM shards from profile.js data.
 * * * * OMISSION LOG V28:
 * - Fixed: Added projectHologram() to the animation loop to constantly map the 3D active planet to 2D UI space.
 * - Fixed: Imported SystemEvents to broadcast TOGGLE_HOLOGRAM events for the Ripple Impact system.
 * - Fixed: Integrated SystemLogicUtils.setZooming() to lock out manual drag momentum during cinematic focus.
 * * * * RIPPLE EFFECT V28:
 * - RIPPLE: activeClickedSector now locks the camera directly center, allowing the new holographic shards to orbit the planet cleanly.
 * - RIPPLE: Clicking empty space now explicitly clears the reality focus, dismisses holograms, and unlocks rotation.
 * * * * REALITY AUDIT V28:
 * - APPEND 7: 2D-to-3D Projection - Added Vector3.project(camera) to translate WebGL space into CSS absolute positioning for the HUD.
 * - APPEND 8: Center-Focus Lock - Camera explicitly zeroes out its X-axis during transitions to guarantee perfect planetary alignment.
 * - APPEND 11: Kinetic Mud - Applied 0.5 heavy friction to manual drags when a planet is focused to keep it within the holographic viewport.
 * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_LOGICS_HOLOGRAM_ACTIVE
 * - LINE_COUNT: ~490 Lines.
 */

import * as THREE from 'three';

import { GlobalInput } from './core/Input.js';
import { CoreRenderer } from './core/Renderer.js';
import { Lighting } from './world/Lighting.js';
import { DebrisField } from './world/DebrisField.js';
import { OrbitRing } from './world/OrbitRing.js';
import { HeroPlanet } from './entities/HeroPlanet.js';
import { BlackHole } from './entities/BlackHole.js';
import { AssetLoader } from './loaders/AssetLoader.js';

import { HeroEffects } from './effects/HeroEffects.js';

// REALITY AUDIT: Import the state machine, dispatcher, and event bus
import { Logics as SystemLogicUtils } from './utils/logics.js';
import { SystemEvents } from './utils/events.js';

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
        this.activeClickedSector = null; // REALITY AUDIT: Explicit ID lock to prevent zoom stealing

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
        this.loader = new AssetLoader();
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        // Layer Managers
        this.heroEffects = null;

        // SECTOR DATA
        this.sectors = [
            { id: 'TECH', label: 'CENTRAL_HUB', color: 0x00f3ff, angle: 0 },
            { id: 'VISION', label: 'CREATIVE_DESIGN', color: 0xff00ff, angle: Math.PI / 2 },
            { id: 'CODE', label: 'FULL_STACK_DEV', color: 0x8a2be2, angle: Math.PI },
            { id: 'CONTACT', label: 'SIGNAL_TRANSMISSION', color: 0xffaa00, angle: -Math.PI / 2 }
        ];

        this.planets = new Map();

        this.init();
    }

    init() {
        // ==========================================
        // 1. PRO PHASE: NATURE SYNC (stars.webp)
        // ==========================================
        const textureLoader = new THREE.TextureLoader();

        textureLoader.load('./assets/textures/environment/stars.webp', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;

            // REALITY AUDIT: The "Earth Structure" Ghost Fix
            // Intentionally left commented out to kill mirror reflections.
            // this.scene.environment = texture;

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
            colorSpace: THREE.SRGBColorSpace,
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

        // Mount Assets & Bind UI
        this.mountAssets();
        this.bindEvents();
        this.bindUI();

        // Start Render Loop
        this.animate();
    }

    async mountAssets() {
        const btnEnter = document.getElementById('btn-enter-system');
        console.log(":: INITIATING_ZERO_CUBE_ASSET_MOUNT");

        const loadModel = async (sectorId, assetId, path, scale, color) => {
            const planet = this.planets.get(sectorId);
            if (planet && planet.northPoleAnchor) {
                try {
                    const model = await this.loader.loadAsset(assetId, path, null, color);
                    model.scale.set(scale, scale, scale);
                    planet.northPoleAnchor.add(model);
                } catch (e) {
                    console.warn(`:: ${assetId}_MOUNT_FAILURE - MODEL SKIPPED`);
                }
            }
        };

        await Promise.all([
            loadModel('TECH', 'ROVER', './assets/models/rover.glb', 0.5, 0x00f3ff),
            loadModel('VISION', 'SATELLITE', './assets/models/satellite.glb', 0.5, 0xff00ff),
            loadModel('CODE', 'RADAR', './assets/models/radar_dish.glb', 0.5, 0x8a2be2),
            loadModel('CONTACT', 'ROCKET', './assets/models/rocket.glb', 0.5, 0xffaa00)
        ]);

        console.log(":: SYSTEM_ASSETS_MOUNTED (Zero-Cube Verified)");
        if (btnEnter) btnEnter.classList.remove('hidden');
    }

    bindUI() {
        const btnEnter = document.getElementById('btn-enter-system');
        if (btnEnter) {
            btnEnter.addEventListener('click', () => {
                const bootScreen = document.getElementById('boot-screen');
                if (bootScreen) bootScreen.style.opacity = '0';

                setTimeout(() => {
                    if (bootScreen) bootScreen.style.display = 'none';
                    this.isBooting = false;
                    this.systemActive = true;

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
            // REALITY AUDIT: Lock momentum if we are perfectly zoomed to prevent orbit drift
            if (SystemLogicUtils.getState().isZooming) return;

            this.isDragging = true;
            this.isSnapping = false;

            this.realityState.isTransitioning = false;

            // Clear lock and dismiss holograms on deep drag
            if (Math.abs(e.detail.velocityX) > 0.02) {
                this.clearRealityFocus();
            }

            this.rotationVelocity += e.detail.velocityX;

            // SAFE IMPROV: Trigger subtle glitch on high-speed drag
            if (Math.abs(e.detail.velocityX) > 0.05) {
                SystemLogicUtils.dispatchRandomGlitch(0.5);
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

        window.addEventListener('resize', () => this.handleResize());
    }

    checkIntersection(clientX, clientY, isClick) {
        this.pointer.x = (clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, this.camera);

        const planetMeshes = Array.from(this.planets.values()).map(p => p.planetMesh);
        const intersects = this.raycaster.intersectObjects(planetMeshes, false);

        this.planets.forEach(p => p.setHoverState(false));
        document.body.style.cursor = 'crosshair';

        if (intersects.length > 0) {
            const hitObject = intersects[0].object;
            const parentPlanet = this.planets.get(hitObject.userData.id);

            if (parentPlanet) {
                parentPlanet.setHoverState(true);
                document.body.style.cursor = 'pointer';

                if (isClick) {
                    // REALITY AUDIT: Lock the interaction state to the clicked planet
                    this.activeClickedSector = hitObject.userData.id;
                    this.activateSector(hitObject.userData);
                    this.triggerRealityFocus(hitObject.userData);
                }
            }
        } else if (isClick && this.activeClickedSector) {
            // SAFE IMPROV: Clicking empty space clears the focus and hides holograms
            this.clearRealityFocus();
        }
    }

    activateSector(data) {
        const strictData = this.planets.get(data.id).data;

        // Snap the universe to bring this planet to the front
        this.snapToAngle(-strictData.angle);

        // ==========================================
        // REALITY AUDIT: Hologram DOM Builder [ID 1404]
        // Constructs the HTML dynamically based on the active sector DNA
        // ==========================================
        const holoData = SystemLogicUtils.getHologramData();
        const holoContainer = document.getElementById('hologram-viewport');

        if (holoContainer) {
            let skillHtml = '';
            holoData.skills.data.forEach(skill => {
                skillHtml += `<li><span class="label">${skill.name}</span><span class="value">${(skill.level * 100).toFixed(0)}%</span></li>`;
            });

            holoContainer.innerHTML = `
                <div class="holo-shard shard-top-left delay-1" style="--shard-color: #${strictData.color.toString(16)}">
                    <div class="shard-title">${holoData.identity.title}</div>
                    <div class="shard-body">
                        <p><strong>ID:</strong> ${holoData.identity.name}</p>
                        <p><strong>STATUS:</strong> ${holoData.identity.status}</p>
                    </div>
                </div>
                <div class="holo-shard shard-top-right delay-2" style="--shard-color: #${strictData.color.toString(16)}">
                    <div class="shard-title">${holoData.diagnostics.title}</div>
                    <div class="shard-body">
                        <p><strong>MODULE:</strong> ${holoData.diagnostics.label}</p>
                        <p><strong>TYPE:</strong> ${holoData.diagnostics.type}</p>
                        <hr style="border-color: rgba(255,255,255,0.2); margin: 10px 0;">
                        <p>${holoData.diagnostics.bio}</p>
                    </div>
                </div>
                <div class="holo-shard shard-bottom-left delay-3" style="--shard-color: #${strictData.color.toString(16)}">
                    <div class="shard-title">${holoData.skills.title}</div>
                    <div class="shard-body">
                        <ul class="shard-list">
                            ${skillHtml}
                        </ul>
                        <button class="btn-primary" onclick="window.dispatchEvent(new CustomEvent('EXECUTE_PROTOCOL'))">EXECUTE PROTOCOL</button>
                    </div>
                </div>
            `;
        }

        // REALITY AUDIT: Broadcast Hologram Ignition
        SystemEvents.publish('TOGGLE_HOLOGRAM', {
            sectorId: strictData.id,
            active: true
        });
    }

    // ==========================================
    // REALITY AUDIT: CINEMATIC ENGINE & VIEWPORT CENTERING
    // ==========================================

    triggerRealityFocus(data) {
        this.realityState.isTransitioning = true;

        // CULPRIT FIX: Removed angular camera offset. 
        // Since `snapToAngle` rotates the universe to put the active planet at Angle 0,
        // the camera simply needs to zoom straight ahead to be perfectly centered.
        this.realityState.focusTarget = new THREE.Vector3(0, 5, 75);

        // Lock physics state to prevent drifting
        if (typeof SystemLogicUtils.setZooming === 'function') {
            SystemLogicUtils.setZooming(true);
        }
    }

    clearRealityFocus() {
        this.activeClickedSector = null;
        this.realityState.isTransitioning = true;

        // Return camera to idle orbital view
        this.realityState.focusTarget = new THREE.Vector3(0, 20, 140);

        // Unlock physics state
        if (typeof SystemLogicUtils.setZooming === 'function') {
            SystemLogicUtils.setZooming(false);
        }

        SystemEvents.publish('TOGGLE_HOLOGRAM', { active: false });

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

        // Smooth cinematic interpolation
        this.camera.position.lerp(this.realityState.focusTarget, 0.05);

        // Explicit Center-Focus Lock to prevent tracking lag
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

    // ==========================================
    // REALITY AUDIT: 2D-TO-3D PROJECTION
    // ==========================================
    projectHologram() {
        if (!this.activeClickedSector || !this.systemActive) return;

        const activePlanet = this.planets.get(this.activeClickedSector);
        if (!activePlanet) return;

        // Get absolute world position of the mesh
        const pos = new THREE.Vector3();
        activePlanet.getWorldPosition(pos);

        // Translate WebGL vector into 2D Screen Space
        pos.project(this.camera);

        const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
        const y = (pos.y * -0.5 + 0.5) * window.innerHeight;

        const holo = document.getElementById('hologram-viewport');
        if (holo) {
            holo.classList.remove('hidden');
            // Apply projection matrix to the DOM wrapper. 
            // Scale pulls back slightly while zooming to give a parallax effect.
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

        if (CoreRenderer && typeof CoreRenderer.handleResize === 'function') {
            CoreRenderer.handleResize(width, height);
        }
    }

    dispose() {
        this.realityState.isTransitioning = false;
        this.planets.forEach(p => { if (p.dispose) p.dispose(); });
        if (this.debris && this.debris.dispose) this.debris.dispose();
        if (this.lighting && this.lighting.dispose) this.lighting.dispose();
        console.log("RIYAS_OS: Logic Core Shut Down.");
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        const time = performance.now() * 0.001;
        const delta = 0.016;

        if (!this.isBooting && this.camera.position.y > 21 && !this.realityState.focusTarget) {
            this.camera.position.y += (20 - this.camera.position.y) * 0.04;
            this.camera.position.z += (140 - this.camera.position.z) * 0.04;
            this.camera.lookAt(0, 0, 0);
        }

        if (this.systemActive) {
            if (this.isDragging) {
                this.universeGroup.rotation.y += this.rotationVelocity;
                // REALITY AUDIT: Kinetic Mud - apply heavy friction if focused
                this.rotationVelocity *= (this.activeClickedSector ? 0.50 : 0.92);
            } else if (this.isSnapping) {
                let current = this.universeGroup.rotation.y;
                let target = this.targetRotation;

                while (target - current > Math.PI) target -= Math.PI * 2;
                while (target - current < -Math.PI) target += Math.PI * 2;

                this.universeGroup.rotation.y += (target - current) * 0.1;
                if (Math.abs(target - current) < 0.001) this.isSnapping = false;
            } else {
                this.rotationVelocity *= 0.30;
                this.universeGroup.rotation.y += this.rotationVelocity;

                if (Math.abs(this.rotationVelocity) < 0.001 && Math.abs(this.rotationVelocity) > 0) {
                    const snap = Math.round(this.universeGroup.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
                    this.snapToAngle(snap);
                }
            }

            if (this.skySphere) {
                this.skySphere.rotation.y = -(this.universeGroup.rotation.y * 0.1);
            }

            let activePlanet = null;
            let maxZ = -Infinity;

            this.planets.forEach((planet) => {
                if (typeof planet.setFocusState === 'function') {
                    planet.setFocusState(false);
                }
            });

            // REALITY AUDIT: Disable proximity scan if click-locked
            if (this.activeClickedSector && this.planets.has(this.activeClickedSector)) {
                activePlanet = this.planets.get(this.activeClickedSector);
            } else {
                this.planets.forEach((planet) => {
                    const worldPos = new THREE.Vector3();
                    if (planet.getWorldPosition) {
                        planet.getWorldPosition(worldPos);
                        if (!isNaN(worldPos.z) && worldPos.z > maxZ) {
                            maxZ = worldPos.z;
                            activePlanet = planet;
                        }
                    }
                });
            }

            if (activePlanet && typeof activePlanet.setFocusState === 'function') {
                activePlanet.setFocusState(true);

                const focusPos = new THREE.Vector3();
                activePlanet.getWorldPosition(focusPos);

                if (!isNaN(focusPos.x) && !isNaN(focusPos.z) && this.debris) {
                    this.debris.setFocalPoint(focusPos);
                }

                if (this.currentFocusedSector !== activePlanet.data.id) {
                    this.currentFocusedSector = activePlanet.data.id;
                    this.updateUI(activePlanet.data);

                    SystemLogicUtils.dispatchRandomGlitch(0.8);

                    if (this.heroEffects) {
                        this.heroEffects.updateSectorColor(activePlanet.data.id);
                    }
                }
            } else if (this.debris) {
                this.debris.setFocalPoint(null);
            }

            const coordEl = document.getElementById('coordinates');
            if (coordEl) {
                let deg = (this.universeGroup.rotation.y * (180 / Math.PI)) % 360;
                if (deg < 0) deg += 360;
                coordEl.innerText = `AXIS: ${deg.toFixed(1)}° Y: 00.00`;
            }

            // Sync Hologram DOM Element to Planet Mesh
            this.projectHologram();

            // Process Cinematic Transitions
            this.processTransitions();
        }

        this.lighting.update(time);

        if (this.blackHole) {
            this.blackHole.update(delta, this.camera.position, 'CODE');
        }

        if (this.debris) this.debris.update(delta, time);
        if (this.orbitRing) this.orbitRing.update(time);
        this.planets.forEach(p => p.update(time));

        if (CoreRenderer && typeof CoreRenderer.monitorPerformance === 'function') {
            CoreRenderer.monitorPerformance();
        }

        CoreRenderer.render(this.scene, this.camera);
    }
}

export const CoreLogics = new LogicsEngine();