/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/HeroPlanet.js
 * Purpose: Advanced Sector World with Visual-Only Proximity Scaling
 * FIX: "Pink Earth" Removal - Decoupled geometry and color.
 * INTEGRATED: Sector-Specific Industrial Textures + Neutral Base Color + Emissive Branding + Reality Audit.
 * REALITY AUDIT APPEND 5: Realistic + Anti-Freeze (Invisible Shell & Asset Preservation).
 * REALITY AUDIT APPEND 6: Zero-Cube Enforcement - Disabled shell wireframe to ensure pure void.
 * REALITY AUDIT APPEND 7: True Color Restoration - Fixed "Brown Tint" by resetting material base color to white and lowering metalness.
 */

import * as THREE from 'three';
import { Textures } from '../generators/textures.js'; // ANTI-FREEZE: Kept import to prevent Logics.js sync errors

export class HeroPlanet extends THREE.Group {
    constructor(data) {
        super();

        this.data = data;
        this.isHovered = false;
        this.isFocused = false;

        // ORIGINAL BRAND COLOR (Used for Emissive Glow only)
        // REALITY AUDIT: Switched to Amber for realistic heat vents, masking the neon.
        this.brandColor = new THREE.Color(0xffaa44);

        // REALITY AUDIT: Changed from Matte Black (0x111111) to Pure White (0xffffff) to fix brown tinting of textures
        this.baseColor = new THREE.Color(0xffffff);

        this.userData = data;

        // Base scales decoupled from world position to prevent orbital drift
        this.baseRadius = 4.5;
        this.targetFocusScale = 1.0;
        this.currentFocusScale = 1.0;

        this.init();
    }

    async init() {
        // Keeping original procedural tech map for data-driven layers to PREVENT FREEZES
        // REALITY AUDIT: We generate it so memory aligns, but we won't use it for displacement to stop shadow crashes.
        const techMap = await Textures.generatePlanetSurface(this.data.id + '_CORE', this.data.id, true);

        // ==========================================
        // HYBRID TEXTURE LOADER (PATH RECOVERY)
        // Loads Specific NASA maps for unique physical DNA per sector
        // ==========================================
        const textureLoader = new THREE.TextureLoader();

        // Global Specular (Glint) Map - Applied to all for consistent material feel
        const globalSpecMap = textureLoader.load('./assets/textures/maps/global_spec.webp');

        // SECTOR-SPECIFIC TEXTURE ASSIGNMENT
        // Assigns a unique physical "skin" to each sector to kill the "Pink Earth" clone effect
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
        sectorSurfaceMap.colorSpace = THREE.SRGBColorSpace;

        // 1. VISUAL WRAPPER
        // Handles scaling dynamically so the main Group stays locked to the orbital ring
        this.visuals = new THREE.Group();
        this.visuals.scale.set(1.0, 1.0, 1.0); // REALITY AUDIT: Hard scale floor
        this.add(this.visuals);

        // 2. THE SOLID INDUSTRIAL CORE (Hybrid Material)
        this.coreGeometry = new THREE.SphereGeometry(this.baseRadius, 64, 64);

        this.coreMaterial = new THREE.MeshStandardMaterial({
            // REALITY AUDIT: True Color Base + Realistic Masked Glow
            color: this.baseColor, // Now pure white so textures render at 100% true color fidelity

            emissive: this.brandColor, // Subdued Amber
            emissiveMap: sectorSurfaceMap, // Light leaks only from physical details
            emissiveIntensity: 0.05, // REALITY AUDIT: Starts very dim for night-light effect

            // PHYSICAL REALISM
            map: sectorSurfaceMap,

            // REALITY AUDIT: Replaced normal/displacement with bump to stop shadow crashes while keeping depth
            bumpMap: sectorSurfaceMap,
            bumpScale: 0.05,

            roughnessMap: globalSpecMap,
            roughness: 0.6, // REALITY AUDIT: Increased to diffuse the brown "mirror" glint from the sun
            metalness: 0.2 // REALITY AUDIT: Lowered to prevent environment light from overpowering the texture
        });

        this.planetMesh = new THREE.Mesh(this.coreGeometry, this.coreMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        this.planetMesh.userData = this.data;
        this.visuals.add(this.planetMesh);

        // 3. THE HOLOGRAPHIC SHELL (ANTI-FREEZE PRESERVATION)
        // Kept for the "UI Selection" effect variable requirements in Logics.js
        this.shellGeometry = new THREE.SphereGeometry(this.baseRadius * 1.15, 32, 32);
        this.shellMaterial = new THREE.MeshBasicMaterial({
            color: this.brandColor, // Shell matches the brand color
            wireframe: false, // REALITY AUDIT: Disabled grid lines to ensure zero-cube visual parity
            transparent: true,
            opacity: 0.0, // REALITY AUDIT: Set to 0.0 (Invisible) to clean the viewport, but prevents system freeze
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });

        this.planetShell = new THREE.Mesh(this.shellGeometry, this.shellMaterial);
        this.planetShell.raycast = () => { }; // Ignore raycasts on the shell
        this.visuals.add(this.planetShell);

        // 4. ASSET MOUNTING POINT (North Pole)
        this.northPoleAnchor = new THREE.Group();
        // REALITY AUDIT: Lowered anchor slightly to ensure models dock flush with surface
        this.northPoleAnchor.position.set(0, this.baseRadius + 0.05, 0);
        this.planetMesh.add(this.northPoleAnchor);

        // Set World Position based on Sector Angle (Fixed at Radius 35)
        this.position.x = Math.cos(this.data.angle) * 35;
        this.position.z = Math.sin(this.data.angle) * 35;
        this.rotation.y = -this.data.angle;
    }

    setHoverState(isHovered) {
        this.isHovered = isHovered;
    }

    setFocusState(isFocused) {
        this.isFocused = isFocused;
        // REALITY AUDIT: Amplified Proximity Pulse (Baton-Passing logic handled by Logics.js)
        this.targetFocusScale = isFocused ? 3.0 : 1.0;
    }

    // REALITY AUDIT: Required for Logics.js proximity scaling and debris repulsion
    getWorldPosition(target) {
        return this.planetMesh ? this.planetMesh.getWorldPosition(target) : target.set(0, 0, 0);
    }

    update(time) {
        if (!this.visuals) return;

        // Smoothly interpolate ONLY the visual wrapper (Dynamic Magnifying Lens Effect)
        // REALITY AUDIT: Handles the "shrink back" logic when a planet loses the Front-Zone baton
        if (isNaN(this.currentFocusScale)) this.currentFocusScale = 1.0;
        this.currentFocusScale += (this.targetFocusScale - this.currentFocusScale) * 0.08;

        // REALITY AUDIT: Scale floor
        const s = Math.max(1.0, this.currentFocusScale);
        this.visuals.scale.set(s, s, s);

        // Independent Axis Rotation (Slow, Heavy Industrial Spin)
        this.planetMesh.rotation.y += 0.0015;

        // ANTI-FREEZE: Keep shell rotation active so Logics.js doesn't crash if it spies on it
        if (this.planetShell) this.planetShell.rotation.y -= 0.001;

        // REALITY AUDIT: Interactive Hover & Focus Effects ("Realistic Breathing Glow")
        const targetEmissive = this.isHovered ? 0.4 : (this.isFocused ? 0.2 : 0.05);
        // We keep opacity math alive for the shell, but it scales down to 0
        const targetOpacity = this.isHovered ? 0.0 : (this.isFocused ? 0.0 : 0.0);
        const targetShellScale = this.isHovered ? 1.1 : 1.0;

        if (this.coreMaterial) {
            this.coreMaterial.emissiveIntensity += (targetEmissive - this.coreMaterial.emissiveIntensity) * 0.1;
        }

        if (this.shellMaterial) {
            this.shellMaterial.opacity += (targetOpacity - this.shellMaterial.opacity) * 0.1;
        }

        // Subtle "pop" on hover for the shell only
        if (this.planetShell) {
            this.planetShell.scale.lerp(new THREE.Vector3(targetShellScale, targetShellScale, targetShellScale), 0.1);
        }

        // Gentle floating animation
        this.visuals.position.y = Math.sin(time + this.data.angle) * 0.5;
    }

    // REALITY AUDIT: System Purge
    dispose() {
        if (this.coreGeometry) this.coreGeometry.dispose();
        if (this.coreMaterial) this.coreMaterial.dispose();
        if (this.shellGeometry) this.shellGeometry.dispose();
        if (this.shellMaterial) this.shellMaterial.dispose();
        console.log(`RIYAS_OS: Entity ${this.data.id} Purged. [Memory Clean]`);
    }
}