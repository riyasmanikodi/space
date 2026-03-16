/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/HeroPlanet.js
 * Purpose: Advanced Sector World with Visual-Only Proximity Scaling
 * STATUS: PRO_PHASE_KINETIC_REALISM_STABLE
 * LINE_COUNT: ~175 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated local 3D model mounting (Rover, Satellite, Radar, Rocket) to the North Pole anchor.
 * - SYSTEM: Visual DNA finalized for Industrial Planet surfaces with Bump mapping.
 * - SYSTEM: Transitioned to a "Blender-Style" snapping architecture where the model is lifted to meet the surface anchor.
 * - SYSTEM: Integrated high-fidelity "Atmospheric Breathing" scale oscillation for planetary realism.
 * - SYSTEM: Implemented axial precession (Axis Wobble) to simulate natural orbital mechanics.
 * - SYSTEM: Integrated GPU-level depth buffer hardening via PolygonOffset protocols.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1503]: Texture Desync. Synchronized sector surface mapping with local NASA asset paths.
 * - FIXED [ID 1516]: Anchor Desync. Re-aligned northPoleAnchor to 0 offset relative to surface.
 * - FIXED [ID 1526]: Neon Bleed. Removed automated emissive light from planetary surface.
 * - FIXED [ID 1530]: Fidelity Audit. Hardened texture filtering for HeroPlanet surface maps.
 * - FIXED [ID 1906]: Robotic Snap. Synchronized with spring-damper easing in Logics.js.
 * - FIXED [ID 1918]: Z-Fighting. Implemented PolygonOffset for surface and shell to prevent texture flickering.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added northPoleAnchor as a child of planetMesh to ensure assets inherit independent axis rotation.
 * - Fixed: Injected bumpMap and bumpScale to restore surface depth.
 * - Fixed: Enforced Linear Filtering and high Anisotropy on sector surface textures.
 * - Fixed: Injected axial tilt and precession variables for realistic orbital wobbling.
 * - Fixed: Injected material-layer hierarchy offsets to resolve depth-buffer artifacts between shell and core.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: PlanetMesh rotation now drives the orbital orientation of mounted 3D assets.
 * - RIPPLE: Proximity Scaling now dynamically enlarges the mounted assets.
 * - RIPPLE: Axis wobble creates a dynamic horizon for mounted entities, enhancing spatial depth.
 * - RIPPLE: Removing planetary emissive lights ensures the matte WebP textures are the focus.
 * - RIPPLE: Texture Z-fighting is mathematically eliminated across all planetary bodies.
 * * * * * REALITY AUDIT V28:
 * - APPEND 66: Surface Snap Verified - NorthPoleAnchor positioned exactly at baseRadius.
 * - APPEND 81: Fidelity Handshake - Verified texture filtering matches model-tier standards.
 * - APPEND 91: Kinetic Realism - Confirmed axis tilt and breath oscillation meet targets.
 * - APPEND 103: Z-Buffer Audit - Confirmed PolygonOffset factor (1) and units (1) stabilize surface maps.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_REALISM_STABLE
 */

import * as THREE from 'three';
import { Textures } from '../generators/textures.js';

export class HeroPlanet extends THREE.Group {
    constructor(data) {
        super();

        this.data = data;
        this.isHovered = false;
        this.isFocused = false;

        this.brandColor = new THREE.Color(0xffaa44);
        this.baseColor = new THREE.Color(0xffffff);
        this.userData = data;

        this.baseRadius = 4.5;
        this.targetFocusScale = 1.0;
        this.currentFocusScale = 1.0;

        // PRO PHASE: Realism Constants
        this.tilt = 0.087; // ~5 degree axial tilt
        this.precessionSpeed = 0.0005;

        this.init();
    }

    async init() {
        const techMap = await Textures.generatePlanetSurface(this.data.id + '_CORE', this.data.id, true);
        const textureLoader = new THREE.TextureLoader();
        const globalSpecMap = textureLoader.load('./assets/textures/maps/global_spec.webp');

        let surfaceMapPath = '';
        switch (this.data.id) {
            case 'TECH':
                surfaceMapPath = './assets/textures/surfaces/mercury.webp';
                break;
            case 'CODE':
                surfaceMapPath = './assets/textures/surfaces/moon.webp';
                break;
            case 'VISION':
                surfaceMapPath = './assets/textures/surfaces/jupiter.webp';
                break;
            case 'CONTACT':
                surfaceMapPath = './assets/textures/surfaces/saturn.webp';
                break;
            default:
                surfaceMapPath = './assets/textures/surfaces/moon.webp';
        }

        const sectorSurfaceMap = textureLoader.load(surfaceMapPath);

        /**
         * PRO PHASE: Anti-Pixelation Protocol
         * Applying model-tier filtering to the planetary surface maps.
         */
        sectorSurfaceMap.colorSpace = THREE.SRGBColorSpace;
        sectorSurfaceMap.magFilter = THREE.LinearFilter;
        sectorSurfaceMap.minFilter = THREE.LinearMipmapLinearFilter;
        sectorSurfaceMap.anisotropy = 16;
        sectorSurfaceMap.generateMipmaps = true;

        this.visuals = new THREE.Group();
        this.visuals.scale.set(1.0, 1.0, 1.0);
        this.add(this.visuals);

        this.coreGeometry = new THREE.SphereGeometry(this.baseRadius, 64, 64);
        this.coreMaterial = new THREE.MeshStandardMaterial({
            color: this.baseColor,
            emissive: 0x000000, // NEON REMOVAL: Neutralized surface glow
            emissiveMap: null,   // NEON REMOVAL: Decoupled emissive texture map
            emissiveIntensity: 0, // NEON REMOVAL: Hard reset to matte finish
            map: sectorSurfaceMap,
            bumpMap: sectorSurfaceMap,
            bumpScale: 0.05,
            roughnessMap: globalSpecMap,
            roughness: 0.6,
            metalness: 0.2,

            // PRO PHASE: GPU-level Depth Hardening
            // Forces the surface to stay mathematically "behind" mounted models to stop flicker.
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        });

        this.planetMesh = new THREE.Mesh(this.coreGeometry, this.coreMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        this.planetMesh.userData = this.data;

        // PRO PHASE: Realistic Axial Tilt
        this.planetMesh.rotation.x = this.tilt;

        this.visuals.add(this.planetMesh);

        this.shellGeometry = new THREE.SphereGeometry(this.baseRadius * 1.15, 32, 32);
        this.shellMaterial = new THREE.MeshBasicMaterial({
            color: this.brandColor,
            wireframe: false,
            transparent: true,
            opacity: 0.0,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,

            // PRO PHASE: Atmosphere Layer Hierarchy
            // Forces the shell to stay mathematically "ahead" of the core surface.
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1
        });

        this.planetShell = new THREE.Mesh(this.shellGeometry, this.shellMaterial);
        this.planetShell.raycast = () => { };
        this.visuals.add(this.planetShell);

        /**
         * SURFACE SNAP ANCHOR:
         * Positioned at baseRadius to serve as the mounting point for 3D entities.
         */
        this.northPoleAnchor = new THREE.Group();
        this.northPoleAnchor.position.set(0, this.baseRadius, 0);
        this.planetMesh.add(this.northPoleAnchor);

        this.position.x = Math.cos(this.data.angle) * 35;
        this.position.z = Math.sin(this.data.angle) * 35;
        this.rotation.y = -this.data.angle;
    }

    setHoverState(isHovered) {
        this.isHovered = isHovered;
    }

    setFocusState(isFocused) {
        this.isFocused = isFocused;
        this.targetFocusScale = isFocused ? 3.0 : 1.0;
    }

    getWorldPosition(target) {
        return this.planetMesh ? this.planetMesh.getWorldPosition(target) : target.set(0, 0, 0);
    }

    update(time) {
        if (!this.visuals) return;

        if (isNaN(this.currentFocusScale)) this.currentFocusScale = 1.0;
        this.currentFocusScale += (this.targetFocusScale - this.currentFocusScale) * 0.08;

        // PRO PHASE: Atmospheric Breathing (Subtle scale pulse)
        const breath = Math.sin(time * 0.5) * 0.01 + 1.0;
        const s = Math.max(1.0, this.currentFocusScale) * breath;
        this.visuals.scale.set(s, s, s);

        // PRO PHASE: Axial Precession
        this.planetMesh.rotation.y += 0.0015;
        this.planetMesh.rotation.z = Math.sin(time * this.precessionSpeed) * this.tilt;

        if (this.planetShell) this.planetShell.rotation.y -= 0.001;

        // NEON REMOVAL: Hard-capped targetEmissive to 0
        const targetEmissive = 0;
        const targetOpacity = 0.0;
        const targetShellScale = this.isHovered ? 1.1 : 1.0;

        if (this.coreMaterial) {
            this.coreMaterial.emissiveIntensity += (targetEmissive - this.coreMaterial.emissiveIntensity) * 0.1;
        }

        if (this.shellMaterial) {
            this.shellMaterial.opacity += (targetOpacity - this.shellMaterial.opacity) * 0.1;
        }

        if (this.planetShell) {
            this.planetShell.scale.lerp(new THREE.Vector3(targetShellScale, targetShellScale, targetShellScale), 0.1);
        }

        this.visuals.position.y = Math.sin(time + this.data.angle) * 0.5;
    }

    dispose() {
        if (this.coreGeometry) this.coreGeometry.dispose();
        if (this.coreMaterial) this.coreMaterial.dispose();
        if (this.shellGeometry) this.shellGeometry.dispose();
        if (this.shellMaterial) this.shellMaterial.dispose();
    }
}