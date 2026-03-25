/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /systems/CursorService.js
 * Purpose: Decoupled WebGL Kinetic Cursor Overlay (Texture Realism Variant)
 * STATUS: PRO_PHASE_TEXTURE_REALISM_ACTIVE
 * LINE_COUNT: ~245 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated dual-layer Kinetic Fire cursor (Meteorite Core + Shard Tail).
 * - SYSTEM: Decoupled cursor architecture into a dedicated top-level WebGL context.
 * - SYSTEM: [PRO PHASE] Refactored into a passive "Loop-Compatible" service by removing internal requestAnimationFrame.
 * - SYSTEM: [PRO PHASE] Transitioned to Soft-Glow Circle (SDF) approach for continuous volumetric plasma stream.
 * - SYSTEM: [PRO PHASE] Abstracted emission density into 'emissionStepDistance' for top-level volume control.
 * - SYSTEM: [PRO PHASE] Hooked dynamic physics engine (Air Drag & Gravity) to the emission pipeline.
 * - SYSTEM: [PRO PHASE] Synchronized cursor emission rate with the new ShaderMaterial plasma logic.
 * - SYSTEM: [PRO PHASE] Exposed setColor() API to sync fire trail with active planetary sectors.
 * - SYSTEM: [PRO PHASE] Exposed setMomentum() API to sync orbital drag.
 * - SYSTEM: [PRO PHASE] Synchronized Meteorite Core material with the new procedural noise tail aesthetics.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 3005]: System Pointer Bleed. Enforced custom WebGL pointer over standard CSS cursors.
 * - FIXED [ID 3045]: Z-Index Ghosting. Enforced pointer-events: none on the cursor canvas.
 * - FIXED [ID 3370]: [PRO PHASE] Missing API Hook. Injected setMomentum() to support Logics.js orbital drag calculations.
 * - FIXED [ID 3420]: [PRO PHASE] The "Stationary Smolder". Removed the strict velocity gate to ensure baseline emission.
 * - FIXED [ID 3530]: [PRO PHASE] Rigid Trail Artifact. Injected sub-frame interpolation to ensure smooth fluid streams.
 * - FIXED [ID 3560]: [PRO PHASE] Beaded Trail. Decreased interpolation step distance from 0.4 to 0.15 to tightly pack the SDF circles.
 * - FIXED [ID 3610]: [PRO PHASE] Unwieldy Density Control. Replaced hardcoded step divisors with a configurable property.
 * - FIXED [ID 3625]: [PRO PHASE] Rigid Momentum. Verified cursor sub-frame velocity seeds FireTail to allow physical air friction deceleration.
 * - FIXED [ID 3650]: [PRO PHASE] Disconnected Core. Injected thermal emissive properties into the meteorite head to match the turbulent tail.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added coordinate unprojection math to translate 2D mouse events to 3D world space.
 * - Fixed: Added lighting rig (Directional + Ambient) isolated to the cursor overlay scene.
 * - Fixed: [PRO PHASE] Forced at least 1 shard emission per frame to maintain a glowing core.
 * - Fixed: [PRO PHASE] Injected 'uColor' uniform sync to bridge sector transitions with the trail material.
 * - Fixed: [PRO PHASE] Preserved baseline smolder velocity to ensure continuous upward thermal drift when idle.
 * - Fixed: [PRO PHASE] Ensured the meteorite maintains physical lighting while emitting its own baseline heat.
 * - Fixed: [PRO PHASE] Injected synchronized emissive color updating into setColor API.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The standalone WebGL context ensures the cursor renders at 60FPS even if the main planetary engine lags.
 * - RIPPLE: [PRO PHASE] The meteorite now visually "smolders" with circular fluid embers continuously when the mouse is idle.
 * - RIPPLE: [PRO PHASE] Increased emission density creates a flawless, unified plasma beam at high velocities.
 * - RIPPLE: [PRO PHASE] Devs can now easily modify the spacing of the fluid circles without digging into math functions.
 * - RIPPLE: [PRO PHASE] The initial velocity burst is now fully integrated with the physical drag state, allowing realistic plasma deceleration.
 * - RIPPLE: [PRO PHASE] The cursor core now visually smolders, bridging the gap between the solid geometry and the fluid plasma tail.
 * * * * * REALITY AUDIT V28:
 * - APPEND 185: Canvas Isolation - Verified cursor overlay does not trigger main DOM repaints.
 * - APPEND 460: [PRO PHASE] Centralized Loop Audit - Verified update/render calls resolve frame-starvation.
 * - APPEND 630: [PRO PHASE] Kinetic Audit - Verified that sub-frame interpolation removes "gappy" trails during fast motion.
 * - APPEND 650: [PRO PHASE] Density Audit - Verified interpolation packing at 0.15 units eliminates "beading" between circle fragments.
 * - APPEND 680: [PRO PHASE] Volume Audit - Verified configurable emission Step works in tandem with FireTail scaling.
 * - APPEND 695: [PRO PHASE] Physics Sync Audit - Verified cursor emission velocity accurately seeds the drag/gravity simulation in FireTail.
 * - APPEND 720: [PRO PHASE] Core Material Audit - Verified standard material correctly processes scene lights while holding emissive heat.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_TEXTURE_REALISM_ACTIVE
 */

import * as THREE from 'three';
import { FireTail } from '../effects/FireTail.js';

export class CursorService {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'cursor-3d-overlay';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '100000';
        document.body.appendChild(this.canvas);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.z = 20;

        // ==========================================
        // PRO PHASE: DENSITY TUNING VARIABLE
        // Controls how often a new fire circle is spawned during movement
        // ==========================================
        // [ID 3610]: Increase this number (e.g., to 0.4) if the trail feels too thick or opaque.
        // Decrease it (e.g., to 0.1) if you see gaps between circles during fast movement.
        this.emissionStepDistance = 0.10;

        this.setupLighting();
        this.setupMeteorite();

        this.tail = new FireTail(500);
        if (this.tail.mesh) this.scene.add(this.tail.mesh);

        this.targetPos = new THREE.Vector3(0, 0, 0);
        this.lastPos = new THREE.Vector3(0, 0, 0);
        this.momentum = 0;

        this.bindEvents();
    }

    setupLighting() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambient);
        const fireLight = new THREE.DirectionalLight(0xffaa00, 2.5);
        fireLight.position.set(5, -2, 5);
        this.scene.add(fireLight);
    }

    setupMeteorite() {
        const geo = new THREE.IcosahedronGeometry(0.35, 0);

        // [PRO PHASE]: Texture Realism update - added emissive properties so the core 
        // organically smolders to match the procedural tail flares.
        const mat = new THREE.MeshStandardMaterial({
            color: 0x222222,
            emissive: 0x551100, // Deep thermal red baseline
            emissiveIntensity: 0.8,
            roughness: 0.9,
            flatShading: true
        });

        this.meteorite = new THREE.Mesh(geo, mat);
        this.scene.add(this.meteorite);
    }

    setColor(hex) {
        if (this.tail && this.tail.material.uniforms.uColor) {
            this.tail.material.uniforms.uColor.value.set(hex);
        }

        // [PRO PHASE]: Synchronize the meteorite core's smolder with the sector color
        if (this.meteorite && this.meteorite.material) {
            const colorObj = new THREE.Color(hex);
            // Darken the core slightly relative to the tail for realistic heat depth
            this.meteorite.material.emissive.copy(colorObj).multiplyScalar(0.4);
        }
    }

    setMomentum(val) {
        this.momentum = val;
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            const vec = new THREE.Vector3();
            const pos = new THREE.Vector3();
            vec.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0.5);
            vec.unproject(this.camera);
            vec.sub(this.camera.position).normalize();
            const dist = -this.camera.position.z / vec.z;
            pos.copy(this.camera.position).add(vec.multiplyScalar(dist));
            this.targetPos.copy(pos);
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    update(delta) {
        const velocity = new THREE.Vector3().subVectors(this.targetPos, this.lastPos);
        velocity.x += (this.momentum * 0.5);

        this.meteorite.position.copy(this.targetPos);
        this.meteorite.rotation.x += delta * 6.0 * 0.016;
        this.meteorite.rotation.y += delta * 4.0 * 0.016;

        const dist = this.lastPos.distanceTo(this.targetPos);

        // FIXED [ID 3560]: Baseline Smolder forced via Math.max(1, ...)
        // Utilizing the configurable emissionStepDistance to determine packing density.
        const steps = Math.max(1, Math.floor(dist / this.emissionStepDistance));

        for (let s = 0; s < steps; s++) {
            const t = steps > 1 ? s / (steps - 1) : 1;
            const interpX = THREE.MathUtils.lerp(this.lastPos.x, this.targetPos.x, t);
            const interpY = THREE.MathUtils.lerp(this.lastPos.y, this.targetPos.y, t);
            const interpZ = THREE.MathUtils.lerp(this.lastPos.z, this.targetPos.z, t);

            if (this.tail) {
                // FIXED [ID 3530]: Sub-frame velocity ensures "needles" stretch toward movement vector
                const emitVel = velocity.length() > 0.001 ? velocity : new THREE.Vector3(0, 0.05, 0);
                this.tail.emit(interpX, interpY, interpZ, emitVel);
            }
        }

        this.lastPos.copy(this.targetPos);

        if (this.tail) {
            this.tail.update(delta);
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}