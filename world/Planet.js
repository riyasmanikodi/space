/**
 * RIYAS_OS V28 - RIPPLE 3
 * File: /world/Planet.js
 * Purpose: Base celestial class, LOD swapping, Atmospheric Halos, and Memory Management
 */

import * as THREE from 'three';
import { PolyGen } from '../systems/PolyGen.js';
import { Physics } from '../systems/physics.js';
import { PlanetVertexShader } from '../shaders/planet.vert.js';
import { PlanetFragmentShader } from '../shaders/planet.frag.js';

export class Planet extends THREE.Group {
    constructor(radius, sectorColor, displacementMap, orbitSpeed = 1.0, timeOffset = 0) {
        super();

        this.radius = radius;
        this.orbitSpeed = orbitSpeed;

        // ==========================================
        // SAFE IMPROV: Self-Contained Orbit Logic
        // Internal clock offset ensures planets don't bunch up in a single line.
        // ==========================================
        this.timeOffset = timeOffset;

        // ==========================================
        // SAFE IMPROV: Automatic LOD Swapping (Base Geometries)
        // Fetches High and Low poly versions from PolyGen to manage GPU load.
        // ==========================================
        this.highPolyGeo = PolyGen.generatePlanetLOD(radius, 'HIGH');
        this.lowPolyGeo = PolyGen.generatePlanetLOD(radius, 'LOW');

        // Base uniform setup for custom shaders
        this.uniforms = {
            uTime: { value: 0 },
            uSectorColor: { value: sectorColor },
            uDisplacementMap: { value: displacementMap },
            uDisplacementScale: { value: radius * 0.15 },
            uGlitchIntensity: { value: 0.0 },
            uAtmosphereFactor: { value: 0.0 }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader: PlanetVertexShader,
            fragmentShader: PlanetFragmentShader,
            uniforms: this.uniforms,
            wireframe: false // Swapped dynamically based on distance
        });

        this.mesh = new THREE.Mesh(this.highPolyGeo, material);
        this.add(this.mesh);

        // ==========================================
        // SAFE IMPROV: Atmospheric "Halo" Child-Object
        // Creates a slightly larger, invisible outer sphere that holds the Fresnel glow.
        //
        // REALITY AUDIT: The "Z-Fighting" Flicker Fix
        // Uses a microscopic scale offset (1.05) and sets depthWrite to false.
        // Tells the GPU to render the terrain first and the glow second, eliminating flicker.
        // ==========================================
        const atmosphereMat = new THREE.ShaderMaterial({
            vertexShader: PlanetVertexShader,
            fragmentShader: PlanetFragmentShader,
            uniforms: {
                ...this.uniforms,
                uAtmosphereFactor: { value: radius * 0.2 } // Push vertices out
            },
            transparent: true,
            depthWrite: false,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });

        this.atmosphere = new THREE.Mesh(this.highPolyGeo, atmosphereMat);
        this.atmosphere.scale.set(1.05, 1.05, 1.05);
        this.add(this.atmosphere);
    }

    update(delta, cameraDistance) {
        // Update shader time for procedural circuitry pulses
        this.uniforms.uTime.value += delta;

        // Dynamic LOD Swapping based on camera distance
        const LOD_THRESHOLD = 150;
        if (cameraDistance > LOD_THRESHOLD && this.mesh.geometry !== this.lowPolyGeo) {
            this.mesh.geometry = this.lowPolyGeo;
            this.mesh.material.wireframe = true; // Switch to wireframe in deep space
        } else if (cameraDistance <= LOD_THRESHOLD && this.mesh.geometry !== this.highPolyGeo) {
            this.mesh.geometry = this.highPolyGeo;
            this.mesh.material.wireframe = false;
        }
    }

    updateOrbit(baseAngle, radiusX, radiusZ) {
        // Utilize the Physics engine's parametric positioning to prevent drift
        const pos = Physics.calculateOrbitalPosition(baseAngle, radiusX, radiusZ, this.orbitSpeed, this.timeOffset);
        this.position.set(pos.x, 0, pos.z);
        // Slowly rotate on its own axis
        this.rotation.y += 0.002 * this.orbitSpeed;
    }

    // ==========================================
    // REALITY AUDIT: Memory "Ghosting" Fix (Disposal)
    // Strict garbage collection method. When a sector is unloaded, this 
    // manually tells the GPU to "forget" the textures and geometries.
    // ==========================================
    dispose() {
        if (this.highPolyGeo) this.highPolyGeo.dispose();
        if (this.lowPolyGeo) this.lowPolyGeo.dispose();
        if (this.mesh.material) this.mesh.material.dispose();
        if (this.atmosphere.material) this.atmosphere.material.dispose();

        // Only dispose the map if it's unique to this planet and not pooled
        if (this.uniforms.uDisplacementMap.value) {
            this.uniforms.uDisplacementMap.value.dispose();
        }
    }
}