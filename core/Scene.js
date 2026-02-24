/**
 * RIYAS_OS V28 - RIPPLE 1
 * File: /core/Scene.js
 * Purpose: Three.js Scene Initialization, Lighting, and Context Management
 */

import * as THREE from 'three';
import { COLORS } from '../data/constants.js';

class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();

        // SAFE IMPROV: Dynamic Background Tinting base
        this.scene.background = new THREE.Color(COLORS.BG);

        // SAFE IMPROV: Depth-Based Fog (Atmospheric Perspective)
        // Fog color matches background to fade distant planets seamlessly into the void.
        this.scene.fog = new THREE.FogExp2(COLORS.BG, 0.03);

        this.setupLighting();
        this.setupStarfield();
        this.setupContextListeners();
    }

    setupLighting() {
        // REALITY AUDIT: Scene Overdraw Fix
        // Minimal lighting to save mobile battery: One ambient, one strong point light 
        // at the center of the orbit for high-contrast shadows on planets.
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);

        const sunLight = new THREE.PointLight(0xffffff, 2.0, 100);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);

        this.lights = { ambientLight, sunLight };
    }

    setupStarfield() {
        // SAFE IMPROV: Ambient Starfield Injection
        // Generates a lightweight static particle system for the deep space background.
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.8
        });

        const starsVertices = [];
        for (let i = 0; i < 1500; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        this.starfield = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(this.starfield);
    }

    setupContextListeners() {
        // REALITY AUDIT: The "Context Loss" Crash Fix
        // Protects against GPU sleep, mobile lock screens, or heavy tab switching.
        const canvas = document.querySelector('#stage');
        if (canvas) {
            canvas.addEventListener('webglcontextlost', (event) => {
                event.preventDefault();
                console.warn('SYSTEM ALERT: WebGL Context Lost. Halting render loop.');
            }, false);

            canvas.addEventListener('webglcontextrestored', () => {
                console.log('SYSTEM RECOVERY: WebGL Context Restored.');
            }, false);
        }
    }

    dispose() {
        // Memory cleanup routine for complete garbage collection
        this.scene.clear();
        if (this.starfield) {
            this.starfield.geometry.dispose();
            this.starfield.material.dispose();
        }
    }

    get() {
        return this.scene;
    }
}

export const CoreScene = new SceneManager();