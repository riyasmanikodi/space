/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /entities/HeroPlanet.js
 * Purpose: Advanced Sector World with Visual-Only Proximity Scaling
 * FIX: "Pink Earth" Removal - Decoupled geometry and color.
 * INTEGRATED: Sector-Specific Industrial Textures + Neutral Base Color + Emissive Branding.
 */

import * as THREE from 'three';
import { Textures } from '../generators/textures.js';

export class HeroPlanet extends THREE.Group {
    constructor(data) {
        super();

        this.data = data;
        this.isHovered = false;
        this.isFocused = false;

        // ORIGINAL BRAND COLOR (Used for Emissive Glow only)
        this.brandColor = new THREE.Color(data.color);

        // INDUSTRIAL BASE COLOR (Dark Slate/Charcoal for Physical Reality)
        this.baseColor = new THREE.Color(0x2a2a2a);

        this.userData = data;

        // Base scales decoupled from world position to prevent orbital drift
        this.baseRadius = 4.5;
        this.targetFocusScale = 1.0;
        this.currentFocusScale = 1.0;

        this.init();
    }

    async init() {
        // Keeping original procedural tech map for data-driven layers (The "Digital" overlay)
        const techMap = await Textures.generatePlanetSurface(this.data.id + '_CORE', this.data.id, true);

        // ==========================================
        // HYBRID TEXTURE LOADER
        // Loads Specific NASA maps for unique physical DNA per sector
        // ==========================================
        const textureLoader = new THREE.TextureLoader();

        // Global Specular (Glint) Map - Applied to all for consistent material feel
        const globalSpecMap = textureLoader.load('/assets/textures/maps/global_spec.webp');

        // SECTOR-SPECIFIC TEXTURE ASSIGNMENT
        // Assigns a unique physical "skin" to each sector to kill the "Pink Earth" clone effect
        let surfaceMapPath = '';
        switch (this.data.id) {
            case 'TECH':
                // Mercury: High crater density, industrial mining look
                surfaceMapPath = '/assets/textures/surfaces/mercury.webp';
                break;
            case 'CODE':
                // Moon: Sharp, jagged ridges, logic-focused
                surfaceMapPath = '/assets/textures/surfaces/moon.webp';
                break;
            case 'VISION':
                // Jupiter: Swirling atmospheric flow for creativity
                surfaceMapPath = '/assets/textures/surfaces/jupiter.webp';
                break;
            case 'CONTACT':
                // Saturn: Complex signal bands
                surfaceMapPath = '/assets/textures/surfaces/saturn.webp';
                break;
            default:
                surfaceMapPath = '/assets/textures/surfaces/moon.webp';
        }

        const sectorSurfaceMap = textureLoader.load(surfaceMapPath);

        // 1. VISUAL WRAPPER
        // Handles scaling dynamically so the main Group stays locked to the orbital ring
        this.visuals = new THREE.Group();
        this.add(this.visuals);

        // 2. THE SOLID INDUSTRIAL CORE (Hybrid Material)
        this.coreGeometry = new THREE.SphereGeometry(this.baseRadius, 64, 64);

        this.coreMaterial = new THREE.MeshStandardMaterial({
            // COLOR LOGIC: Dark Base + Colored Glow
            color: this.baseColor, // Dark Grey (Realism)

            emissive: this.brandColor, // The Sector Color (Neon Identity)
            emissiveIntensity: 0.35, // Low enough to see shadows, high enough to glow
            emissiveMap: techMap, // Only glow through the procedural "Tech" grid lines

            // PHYSICAL REALISM
            map: sectorSurfaceMap, // The visual texture (Moon, Jupiter, etc.)

            // We use the surface map as the Normal Map to give physical depth to the texture's patterns
            // This ensures Jupiter has "gas ridges" and Moon has "craters" physically
            normalMap: sectorSurfaceMap,
            normalScale: new THREE.Vector2(0.8, 0.8),

            roughnessMap: globalSpecMap,
            roughness: 0.7, // Matte rock finish
            metalness: 0.4, // Slight industrial metallic sheen

            // PROCEDURAL DISPLACEMENT (The "Data" Layer)
            displacementMap: techMap,
            displacementScale: 0.15 // Physical height for the tech grid
        });

        // Ensure textures handle colors correctly
        if (this.coreMaterial.map) this.coreMaterial.map.colorSpace = THREE.SRGBColorSpace;

        this.planetMesh = new THREE.Mesh(this.coreGeometry, this.coreMaterial);
        this.planetMesh.castShadow = true;
        this.planetMesh.receiveShadow = true;
        this.planetMesh.userData = this.data;
        this.visuals.add(this.planetMesh);

        // 3. THE HOLOGRAPHIC SHELL
        // Kept for the "UI Selection" effect
        this.shellGeometry = new THREE.SphereGeometry(this.baseRadius * 1.15, 32, 32);
        this.shellMaterial = new THREE.MeshBasicMaterial({
            color: this.brandColor, // Shell matches the brand color
            wireframe: true,
            transparent: true,
            opacity: 0.05, // Very faint until hovered
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });

        this.planetShell = new THREE.Mesh(this.shellGeometry, this.shellMaterial);
        this.planetShell.raycast = () => { }; // Ignore raycasts on the shell
        this.visuals.add(this.planetShell);

        // 4. ASSET MOUNTING POINT (North Pole)
        this.northPoleAnchor = new THREE.Group();
        this.northPoleAnchor.position.set(0, this.baseRadius, 0);
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
        this.targetFocusScale = isFocused ? 3.0 : 1.0;
    }

    update(time) {
        if (!this.visuals) return;

        // Smoothly interpolate ONLY the visual wrapper (Dynamic Magnifying Lens Effect)
        this.currentFocusScale += (this.targetFocusScale - this.currentFocusScale) * 0.08;
        this.visuals.scale.set(this.currentFocusScale, this.currentFocusScale, this.currentFocusScale);

        // Independent Axis Rotation (Slow, Heavy Industrial Spin)
        this.planetMesh.rotation.y += 0.0015;
        this.planetShell.rotation.y -= 0.001;

        // Interactive Hover & Focus Effects
        const targetEmissive = this.isHovered ? 0.8 : (this.isFocused ? 0.5 : 0.35);
        const targetOpacity = this.isHovered ? 0.25 : (this.isFocused ? 0.15 : 0.05);
        const targetShellScale = this.isHovered ? 1.1 : 1.0;

        this.coreMaterial.emissiveIntensity += (targetEmissive - this.coreMaterial.emissiveIntensity) * 0.1;
        this.shellMaterial.opacity += (targetOpacity - this.shellMaterial.opacity) * 0.1;

        // Subtle "pop" on hover for the shell only
        this.planetShell.scale.lerp(new THREE.Vector3(targetShellScale, targetShellScale, targetShellScale), 0.1);

        // Gentle floating animation
        this.visuals.position.y = Math.sin(time + this.data.angle) * 0.5;
    }

    dispose() {
        if (this.coreGeometry) this.coreGeometry.dispose();
        if (this.coreMaterial) this.coreMaterial.dispose();
        if (this.shellGeometry) this.shellGeometry.dispose();
        if (this.shellMaterial) this.shellMaterial.dispose();
    }
}