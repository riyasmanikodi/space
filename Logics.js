/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /Logics.js
 * Purpose: Central System Brain (Enhanced with Cinematic Transitions, Texture Loader, and Reality Audit)
 * REALITY AUDIT APPEND 2: Baton-Passing Sync, Interaction Lock Stabilization, and Math NaN Safeguards.
 * REALITY AUDIT APPEND 3: Visual Purge - Removed fallback geometry generation to clear "Grey Blocks" from viewport.
 * REALITY AUDIT APPEND 4: Zero-Cube Enforcement - Silenced AssetLoader errors to completely clear placeholder geometry.
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

        // REALITY AUDIT: Corrected loader and path for WebP support
        textureLoader.load('./assets/textures/environment/stars.webp', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;

            // Apply for metallic reflections on the planet surfaces
            this.scene.environment = texture;

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
        // REALITY AUDIT: mountAssets() logic refactored for "Zero-Cube" realism.
        this.mountAssets();
        this.bindEvents();
        this.bindUI();

        // Start Render Loop
        this.animate();
    }

    async mountAssets() {
        const btnEnter = document.getElementById('btn-enter-system');
        console.log(":: INITIATING_ZERO_CUBE_ASSET_MOUNT");

        // TECH SECTOR - ROVER
        const techPlanet = this.planets.get('TECH');
        if (techPlanet && techPlanet.northPoleAnchor) {
            try {
                const rover = await this.loader.loadAsset('ROVER', './assets/models/rover.glb', null, 0x00f3ff);
                rover.scale.set(0.5, 0.5, 0.5); // REALITY AUDIT: 50% Model Scaling
                techPlanet.northPoleAnchor.add(rover);
            } catch (e) {
                // REALITY AUDIT ZERO-CUBE ENFORCEMENT: Silent warning only. No fallback generation.
                console.warn(":: ROVER_MOUNT_FAILURE - MODEL SKIPPED (Realistic Void Maintained)");
            }
        }

        // VISION SECTOR - SATELLITE
        const visionPlanet = this.planets.get('VISION');
        if (visionPlanet && visionPlanet.northPoleAnchor) {
            try {
                const satellite = await this.loader.loadAsset('SATELLITE', './assets/models/satellite.glb', null, 0xff00ff);
                satellite.scale.set(0.5, 0.5, 0.5); // REALITY AUDIT: 50% Model Scaling
                visionPlanet.northPoleAnchor.add(satellite);
            } catch (e) {
                // REALITY AUDIT ZERO-CUBE ENFORCEMENT: Silent warning only. No fallback generation.
                console.warn(":: SATELLITE_MOUNT_FAILURE - MODEL SKIPPED (Realistic Void Maintained)");
            }
        }

        // CODE SECTOR - RADAR DISH
        const codePlanet = this.planets.get('CODE');
        if (codePlanet && codePlanet.northPoleAnchor) {
            try {
                const radar = await this.loader.loadAsset('RADAR', './assets/models/radar_dish.glb', null, 0x8a2be2);
                radar.scale.set(0.5, 0.5, 0.5); // REALITY AUDIT: 50% Model Scaling
                codePlanet.northPoleAnchor.add(radar);
            } catch (e) {
                // REALITY AUDIT ZERO-CUBE ENFORCEMENT: Silent warning only. No fallback generation.
                console.warn(":: RADAR_MOUNT_FAILURE - MODEL SKIPPED (Realistic Void Maintained)");
            }
        }

        // CONTACT SECTOR - ROCKET
        const contactPlanet = this.planets.get('CONTACT');
        if (contactPlanet && contactPlanet.northPoleAnchor) {
            try {
                const rocket = await this.loader.loadAsset('ROCKET', './assets/models/rocket.glb', null, 0xffaa00);
                rocket.scale.set(0.5, 0.5, 0.5); // REALITY AUDIT: 50% Model Scaling
                contactPlanet.northPoleAnchor.add(rocket);
            } catch (e) {
                // REALITY AUDIT ZERO-CUBE ENFORCEMENT: Silent warning only. No fallback generation.
                console.warn(":: ROCKET_MOUNT_FAILURE - MODEL SKIPPED (Realistic Void Maintained)");
            }
        }

        console.log(":: SYSTEM_ASSETS_MOUNTED (Zero-Cube Verified)");
        if (btnEnter) btnEnter.classList.remove('hidden');
    }

    // REALITY AUDIT: Removed mountFallback() entirely to prevent grey block generation.

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
                }, 1000);
            });
        }

        const btnClose = document.getElementById('terminal-close');
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                const terminal = document.getElementById('os-terminal');
                if (terminal) terminal.classList.add('hidden');

                // REALITY AUDIT: Release active lock when terminal is closed to resume idle proximity scanning
                this.activeClickedSector = null;
            });
        }
    }

    bindEvents() {
        GlobalInput.on('dragMove', (e) => {
            if (!this.systemActive) return;
            this.isDragging = true;
            this.isSnapping = false;

            // REALITY AUDIT: Break cinematic transition on manual drag to restore control
            this.realityState.isTransitioning = false;

            // REALITY AUDIT: Clear active clicked sector to allow proximity zoom again
            this.activeClickedSector = null;

            // Uses user's previously manually tuned rotation sensitivity
            this.rotationVelocity += e.detail.velocityX;

            const hint = document.getElementById('interaction-hint');
            if (hint) hint.style.opacity = '0';
        });

        GlobalInput.on('inputHover', (e) => {
            if (!this.systemActive) return;
            this.checkIntersection(e.detail.x, e.detail.y, false);
        });

        GlobalInput.on('inputDown', (e) => {
            if (!this.systemActive) return;

            const terminal = document.getElementById('os-terminal');
            if (terminal && !terminal.classList.contains('hidden')) {
                const rect = terminal.getBoundingClientRect();
                if (e.detail.x >= rect.left && e.detail.x <= rect.right &&
                    e.detail.y >= rect.top && e.detail.y <= rect.bottom) {
                    return;
                } else {
                    terminal.classList.add('hidden');
                    // REALITY AUDIT: Clear lock if clicking outside terminal
                    this.activeClickedSector = null;
                }
            }

            this.checkIntersection(e.detail.x, e.detail.y, true);
        });

        GlobalInput.on('inputUp', () => {
            this.isDragging = false;
        });

        // REALITY AUDIT: Window Resize Listener
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
                    this.triggerRealityFocus(hitObject.userData); // REALITY AUDIT: Cinematic Hook
                }
            }
        }
    }

    activateSector(data) {
        // REALITY AUDIT: Strict Data Sync (Prevents Terminal Data Mismatch)
        const strictData = this.planets.get(data.id).data;

        this.snapToAngle(-strictData.angle);

        const terminal = document.getElementById('os-terminal');
        if (terminal) terminal.classList.remove('hidden');

        const content = document.getElementById('terminal-content');
        if (content) {
            content.innerHTML = `
                <h2 style="color: #${strictData.color.toString(16)}">>>> SEC_${strictData.id}</h2>
                <p><strong>MODULE:</strong> ${strictData.label}</p>
                <hr style="border-color: #333; margin: 15px 0;">
                <p>> CONNECTING TO UPLINK...</p>
                <p>> RETRIEVING DATA...</p>
                <div style="margin-top: 20px;">
                    <button class="btn-primary" style="width:100%; font-size: 0.8rem;">EXECUTE PROTOCOL</button>
                </div>
            `;
        }
    }

    snapToAngle(targetAngle) {
        this.targetRotation = targetAngle;
        this.isSnapping = true;
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

    // ==========================================
    // REALITY AUDIT: CINEMATIC ENGINE
    // ==========================================

    triggerRealityFocus(data) {
        this.realityState.isTransitioning = true;
        // REALITY AUDIT: Use strict data to compute focus target securely
        const strictData = this.planets.get(data.id).data;
        const angle = -strictData.angle;

        // REALITY AUDIT: Adjust camera zoom radius to accommodate the new 3.0x scaling of the planets.
        // Pushing the camera back ensures the larger planet doesn't clip through the lens.
        const radius = 100;

        this.realityState.focusTarget = new THREE.Vector3(
            Math.sin(angle) * radius,
            15,
            Math.cos(angle) * radius
        );
    }

    processTransitions() {
        if (!this.realityState.isTransitioning || !this.realityState.focusTarget) return;

        // REALITY AUDIT: Smooth cinematic interpolation (Lerp transitions)
        this.camera.position.lerp(this.realityState.focusTarget, 0.05);
        this.camera.lookAt(0, 0, 0);

        // Check if transition is complete
        if (this.camera.position.distanceTo(this.realityState.focusTarget) < 0.1) {
            this.realityState.isTransitioning = false;
        }
    }

    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Update Camera
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        // Update Renderer Buffer
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

        if (!this.isBooting && this.camera.position.y > 21) {
            this.camera.position.y += (20 - this.camera.position.y) * 0.04;

            // CINEMATIC PULL-BACK
            this.camera.position.z += (140 - this.camera.position.z) * 0.04;
            this.camera.lookAt(0, 0, 0);
        }

        if (this.systemActive) {
            // 1. ROTATION LOGIC
            if (this.isDragging) {
                this.universeGroup.rotation.y += this.rotationVelocity;
                // Applies user's manually tuned heavy friction
                this.rotationVelocity *= 0.92;
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

            // 2. PARALLAX SKY SYNC
            if (this.skySphere) {
                this.skySphere.rotation.y = -(this.universeGroup.rotation.y * 0.1);
            }

            // ==========================================
            // 3. DYNAMIC PROXIMITY SCALING (The "Lens" Brain & Baton Passing)
            // REALITY AUDIT: Completely refactored to prioritize activeClickedSector over Z-depth.
            // ==========================================
            let activePlanet = null;
            let maxZ = -Infinity;

            // Turn off focus state for all planets first
            this.planets.forEach((planet) => {
                if (typeof planet.setFocusState === 'function') {
                    planet.setFocusState(false);
                }
            });

            // Pass 1: Check for explicitly clicked sector (Manual Override)
            // REALITY AUDIT: Added safeguard to ensure the locked sector still exists in the map
            if (this.activeClickedSector && this.planets.has(this.activeClickedSector)) {
                activePlanet = this.planets.get(this.activeClickedSector);
            }
            // Pass 2: Fallback to Z-depth proximity if no sector is clicked (Idle State)
            else {
                this.planets.forEach((planet) => {
                    const worldPos = new THREE.Vector3();
                    // REALITY AUDIT: Guard against undefined getWorldPosition returns
                    if (planet.getWorldPosition) {
                        planet.getWorldPosition(worldPos);
                        if (!isNaN(worldPos.z) && worldPos.z > maxZ) {
                            maxZ = worldPos.z;
                            activePlanet = planet;
                        }
                    }
                });
            }

            // Trigger zoom for active planet, sync UI, and sync Debris Repulsion loop-back
            if (activePlanet && typeof activePlanet.setFocusState === 'function') {
                activePlanet.setFocusState(true);

                // SYNC DEBRIS FOCUS
                const focusPos = new THREE.Vector3();
                activePlanet.getWorldPosition(focusPos);

                // REALITY AUDIT: Ensure debris only repels if valid coordinates exist
                if (!isNaN(focusPos.x) && !isNaN(focusPos.z) && this.debris) {
                    this.debris.setFocalPoint(focusPos);
                }

                if (this.currentFocusedSector !== activePlanet.data.id) {
                    this.currentFocusedSector = activePlanet.data.id;
                    this.updateUI(activePlanet.data);
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

            // REALITY AUDIT: Process Cinematic Transitions
            this.processTransitions();
        }

        this.lighting.update(time);

        if (this.blackHole) {
            this.blackHole.update(delta, this.camera.position, 'CODE');
        }

        if (this.debris) this.debris.update(delta, time);
        if (this.orbitRing) this.orbitRing.update(time);
        this.planets.forEach(p => p.update(time));

        // REALITY AUDIT: Performance Monitoring Hook
        if (CoreRenderer && typeof CoreRenderer.monitorPerformance === 'function') {
            CoreRenderer.monitorPerformance();
        }

        CoreRenderer.render(this.scene, this.camera);
    }
}

export const CoreLogics = new LogicsEngine();