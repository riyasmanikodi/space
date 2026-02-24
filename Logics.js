/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /Logics.js
 * Purpose: Central System Brain (Enhanced with Dynamic Proximity Scaling, Auto-Focus, and Debris Repulsion)
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

        // Physics State
        this.rotationVelocity = 0;
        this.targetRotation = 0;
        this.isDragging = false;
        this.isSnapping = false;

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
        // World Setup
        this.universeGroup = new THREE.Group();
        this.scene.add(this.universeGroup);

        // LIGHTING & GOD OBJECTS INITIATED
        this.lighting = new Lighting(this.scene);

        this.blackHole = new BlackHole();
        this.scene.add(this.blackHole);

        this.debris = new DebrisField(this.universeGroup, 800); // Synced with new debris count
        this.orbitRing = new OrbitRing(this.universeGroup);

        // SPAWN LOGIC: Universal Orbit Migration
        this.sectors.forEach(data => {
            // Instantiate planet. Dynamic scaling is now handled internally by HeroPlanet.js
            const planet = new HeroPlanet(data);

            this.universeGroup.add(planet);

            // Force map population
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
        console.log(":: INITIATING_ASSET_MOUNT");

        // TECH SECTOR - ROVER
        const techPlanet = this.planets.get('TECH');
        if (techPlanet && techPlanet.northPoleAnchor) {
            try {
                const rover = await this.loader.loadAsset('ROVER', './assets/models/rover.glb', null, 0x00f3ff);
                techPlanet.northPoleAnchor.add(rover);
            } catch (e) {
                console.warn(":: ROVER_MOUNT_FAILURE - USING FALLBACK", e);
                this.mountFallback(techPlanet);
            }
        }

        // VISION SECTOR - SATELLITE
        const visionPlanet = this.planets.get('VISION');
        if (visionPlanet && visionPlanet.northPoleAnchor) {
            try {
                const satellite = await this.loader.loadAsset('SATELLITE', './assets/models/satellite.glb', null, 0xff00ff);
                visionPlanet.northPoleAnchor.add(satellite);
            } catch (e) {
                console.warn(":: SATELLITE_MOUNT_FAILURE", e);
            }
        }

        // CODE SECTOR - RADAR DISH
        const codePlanet = this.planets.get('CODE');
        if (codePlanet && codePlanet.northPoleAnchor) {
            try {
                const radar = await this.loader.loadAsset('RADAR', './assets/models/radar_dish.glb', null, 0x8a2be2);
                codePlanet.northPoleAnchor.add(radar);
            } catch (e) {
                console.warn(":: RADAR_MOUNT_FAILURE", e);
            }
        }

        // CONTACT SECTOR - ROCKET
        const contactPlanet = this.planets.get('CONTACT');
        if (contactPlanet && contactPlanet.northPoleAnchor) {
            try {
                const rocket = await this.loader.loadAsset('ROCKET', './assets/models/rocket.glb', null, 0xffaa00);
                contactPlanet.northPoleAnchor.add(rocket);
            } catch (e) {
                console.warn(":: ROCKET_MOUNT_FAILURE", e);
            }
        }

        console.log(":: SYSTEM_ASSETS_MOUNTED");
        if (btnEnter) btnEnter.classList.remove('hidden');
    }

    mountFallback(planet) {
        const fallbackGeo = new THREE.BoxGeometry(2, 2, 2);
        const fallbackMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, wireframe: true });
        const fallbackMesh = new THREE.Mesh(fallbackGeo, fallbackMat);
        planet.northPoleAnchor.add(fallbackMesh);
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
                }, 1000);
            });
        }

        const btnClose = document.getElementById('terminal-close');
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                const terminal = document.getElementById('os-terminal');
                if (terminal) terminal.classList.add('hidden');
            });
        }
    }

    bindEvents() {
        GlobalInput.on('dragMove', (e) => {
            if (!this.systemActive) return;
            this.isDragging = true;
            this.isSnapping = false;
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
                }
            }

            this.checkIntersection(e.detail.x, e.detail.y, true);
        });

        GlobalInput.on('inputUp', () => {
            this.isDragging = false;
        });
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
                    this.activateSector(hitObject.userData);
                }
            }
        }
    }

    activateSector(data) {
        this.snapToAngle(-data.angle);

        const terminal = document.getElementById('os-terminal');
        if (terminal) terminal.classList.remove('hidden');

        const content = document.getElementById('terminal-content');
        if (content) {
            content.innerHTML = `
                <h2 style="color: #${data.color.toString(16)}">>>> SEC_${data.id}</h2>
                <p><strong>MODULE:</strong> ${data.label}</p>
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

            // ==========================================
            // 2. DYNAMIC PROXIMITY SCALING (The "Lens" Brain)
            // Calculates the physically closest planet to the camera
            // ==========================================
            let closestPlanet = null;
            let maxZ = -Infinity;

            this.planets.forEach((planet) => {
                const worldPos = new THREE.Vector3();
                planet.getWorldPosition(worldPos);

                if (worldPos.z > maxZ) {
                    maxZ = worldPos.z;
                    closestPlanet = planet;
                }

                // Reset focus state initially
                if (typeof planet.setFocusState === 'function') {
                    planet.setFocusState(false);
                }
            });

            // Trigger zoom for front-runner, sync UI, and sync Debris Repulsion
            if (closestPlanet && typeof closestPlanet.setFocusState === 'function') {
                closestPlanet.setFocusState(true);

                // SYNC DEBRIS FOCUS (The "Debris Push" Brain)
                const focusPos = new THREE.Vector3();
                closestPlanet.getWorldPosition(focusPos);
                this.debris.setFocalPoint(focusPos);

                // Ensure UI only updates when the focal point changes
                if (this.currentFocusedSector !== closestPlanet.data.id) {
                    this.currentFocusedSector = closestPlanet.data.id;
                    this.updateUI(closestPlanet.data);
                }
            } else {
                this.debris.setFocalPoint(null);
            }

            const coordEl = document.getElementById('coordinates');
            if (coordEl) {
                let deg = (this.universeGroup.rotation.y * (180 / Math.PI)) % 360;
                if (deg < 0) deg += 360;
                coordEl.innerText = `AXIS: ${deg.toFixed(1)}° Y: 00.00`;
            }
        }

        this.lighting.update(time);

        if (this.blackHole) {
            this.blackHole.update(delta, this.camera.position, 'CODE');
        }

        // Pass delta and time to the synchronized debris field
        this.debris.update(delta, time);
        this.orbitRing.update(time);

        // Update all planets
        this.planets.forEach(p => p.update(time));

        CoreRenderer.render(this.scene, this.camera);
    }
}

export const CoreLogics = new LogicsEngine();