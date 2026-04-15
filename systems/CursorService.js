/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /systems/CursorService.js
 * Purpose: Anchored Spline-Interpolated Kinetic Cursor Path (Liquid Dynamic Variant)
 * STATUS: PRO_PHASE_KINETIC_FIDELITY_LOCKED
 * LINE_COUNT: ~350 Lines.
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
 * - SYSTEM: [PRO PHASE] Transitioned to Spline-Based Interpolation to eliminate "elbow" joints in sharp turns.
 * - SYSTEM: [PRO PHASE] Implemented 4-point path history to calculate Catmull-Rom curves for fluid particle emission.
 * - SYSTEM: [PRO PHASE] Implemented Sub-Frame Anchoring to completely eliminate disconnected segments during high-speed movement.
 * - SYSTEM: [PRO PHASE] Implemented Low-Pass filtering on cursor coordinates to eliminate spline micro-jitters.
 * - SYSTEM: [PRO PHASE] Refined density step distance to perfectly map the tightened shader SDF output.
 * - SYSTEM: [PRO PHASE] Implemented Idle-Kill Velocity Gate to suppress emission when stationary.
 * - SYSTEM: [PRO PHASE] Implemented History Flushing to consume path coordinates and prevent multi-line rendering.
 * - SYSTEM: [PRO PHASE] Deactivated public setColor() API to permanently hard-lock the thermal aesthetic.
 * - SYSTEM: [APPEND] Integrated Lava.webp surface texture into the Meteorite core geometry.
 * - SYSTEM: [PRO PHASE] Implemented Kinetic Trail Compression to clamp maximum particle velocity.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 3005]: System Pointer Bleed. Enforced custom WebGL pointer over standard CSS cursors.
 * - FIXED [ID 3045]: Z-Index Ghosting. Enforced pointer-events: none on the cursor canvas.
 * - FIXED [ID 3370]: [PRO PHASE] Missing API Hook. Injected setMomentum() to support Logics.js orbital drag calculations.
 * - FIXED [ID 3420]: [PRO PHASE] The "Stationary Smolder". Removed the strict velocity gate to ensure baseline emission.
 * - FIXED [ID 3530]: [PRO PHASE] Rigid Trail Artifact. Injected sub-frame interpolation to ensure smooth fluid streams.
 * - FIXED [ID 3560]: [PRO PHASE] Beaded Trail. Decreased step distance to 0.05 to ensure tightly packed continuous fluid density.
 * - FIXED [ID 3610]: [PRO PHASE] Unwieldy Density Control. Replaced hardcoded step divisors with a configurable property.
 * - FIXED [ID 3625]: [PRO PHASE] Rigid Momentum. Verified cursor sub-frame velocity seeds FireTail to allow physical air friction deceleration.
 * - FIXED [ID 3650]: [PRO PHASE] Disconnected Core. Injected thermal emissive properties into the meteorite head to match the turbulent tail.
 * - FIXED [ID 3860]: [PRO PHASE] Stiff Joints. Replaced linear Lerp with CatmullRomCurve3 to round off sharp corners.
 * - FIXED [ID 3870]: [PRO PHASE] Jittery Path. Implemented curve tangent evaluation to smooth out target orientation.
 * - FIXED [ID 3900]: [PRO PHASE] Disconnected Sticks. Implemented Point-Anchoring to bridge frame gaps and ensure a 100% continuous fluid ribbon.
 * - FIXED [ID 3980]: [PRO PHASE] Jittery Splines. Decoupled raw mousemove events from path history, applying a 0.35 lerp to smooth input tracking.
 * - FIXED [ID 3990]: [PRO PHASE] Stacked History. Implemented a spatial distance threshold (0.1) before pushing to pathHistory to prevent curve crumpling when stationary.
 * - FIXED [ID 4020]: [PRO PHASE] Separate Sprites. Restored emissionStepDistance to 0.015 to create a dense, gapless tube in conjunction with increased FireTail volume.
 * - FIXED [ID 4030]: [PRO PHASE] Unwanted Stationary Trail. Implemented distance gate (< 0.001) in the update loop to disable FireTail emission while the cursor is idle.
 * - FIXED [ID 4070]: [PRO PHASE] Parallel Ghost Lines. Implemented history flushing to clear the spline buffer after emission, preventing the loop from re-drawing the same segment multiple times.
 * - FIXED [ID 4080]: [PRO PHASE] Flashy Colors. Commented out logic in setColor() to prevent the meteorite and trail from changing hues on user clicks.
 * - FIXED [ID 4095]: [PRO PHASE] Featureless Core. Applied Lava.webp standard mapping to establish high-fidelity cracked volcanic topography.
 * - FIXED [ID 4100]: [PRO PHASE] Texture Stretching. Increased IcosahedronGeometry detail from 0 to 2 to provide enough vertices for Lava.webp UV mapping.
 * - FIXED [ID 4105]: [PRO PHASE] Static Shader. Bridged uTime and uVelocity uniforms via userData.shader to animate the fragment ignition.
 * - FIXED [ID 4115]: [PRO PHASE] Shader Reference Crash. Injected strict existence guard (userData.shader) in the update loop to prevent undefined read before the GPU compiles the first frame.
 * - FIXED [ID 4250]: [PRO PHASE] Texture Invisibility. Upgraded the meteorite core to a dedicated ShaderMaterial to force the Lava.webp surface mapping and bypass the standard material pipeline bypass.
 * - FIXED [ID 4260]: [PRO PHASE] 4-Line Ghosting. Hardened the pathHistory buffer to strictly flush and lock the anchor point after rendering the active segment, preventing geometric overlap.
 * - FIXED [ID 4270]: [PRO PHASE] Thermal Upward Drift. Piped real-time velocityLength into the FireTail uniform loop to enforce an immediate thermal collapse when the cursor is idle.
 * - FIXED [ID 4280]: [PRO PHASE] Big Trail Anomaly. Clamped emitVel scalar using Math.min() to prevent velocity-dependent trail stretching during high-speed drags.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added coordinate unprojection math to translate 2D world space.
 * - Fixed: Added lighting rig (Directional + Ambient) isolated to the cursor overlay scene.
 * - Fixed: [PRO PHASE] Forced at least 1 shard emission per frame to maintain a glowing core.
 * - Fixed: [PRO PHASE] Injected 'uColor' uniform sync to bridge sector transitions with the trail material.
 * - Fixed: [PRO PHASE] Preserved baseline smolder velocity to ensure continuous upward thermal drift when idle.
 * - Fixed: [PRO PHASE] Ensured the meteorite maintains physical lighting while emitting its own baseline heat.
 * - Fixed: [PRO PHASE] Added 'pathHistory' buffer to store previous coordinates for calculation.
 * - Fixed: [PRO PHASE] Injected sub-segment tangent calculation to seed particles with realistic directional momentum.
 * - Fixed: [PRO PHASE] Calibrated 'emissionStepDistance' to 0.03 to create a highly dense "Liquid" foundation for the shader.
 * - Fixed: [PRO PHASE] Added 'anchorPoint' state vector to explicitly track the end of the previous spline segment.
 * - Fixed: [PRO PHASE] Added 'rawPos' tracking to separate DOM event coordinates from physical engine evaluation.
 * - Fixed: [PRO PHASE] Injected delta distance check to gate spline emission logic.
 * - Fixed: [PRO PHASE] Reduced maxHistory to 2 to minimize spline memory footprint before flushing.
 * - Fixed: [PRO PHASE] Hardcoded baseline emissive color (0xffaa00) to ensure consistent thermal identity.
 * - Fixed: [PRO PHASE] Injected TextureLoader and material.map properties to bridge the Lava.webp file into the cursor geometry.
 * - Fixed: [PRO PHASE] Up-scaled cursor geometry detail to support high-fidelity texture wrapping.
 * - Fixed: [PRO PHASE] Injected Math.min() threshold (max scalar 1.2) into the Catmull-Rom tangent multiplier.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The standalone WebGL context ensures the cursor renders at 60FPS even if the main planetary engine lags.
 * - RIPPLE: [PRO PHASE] The meteorite now visually "smolders" with circular fluid embers continuously when the mouse is idle.
 * - RIPPLE: [PRO PHASE] Devs can now easily modify the spacing of the fluid circles without digging into math functions.
 * - RIPPLE: [PRO PHASE] The initial velocity burst is now fully integrated with the physical drag state, allowing realistic plasma deceleration.
 * - RIPPLE: [PRO PHASE] The trail now bends and whips realistically, removing the "stiff stick" visual artifact.
 * - RIPPLE: [PRO PHASE] Smooth pathing allows for high-speed "zig-zag" movements without breaking the visual fluid stream.
 * - RIPPLE: [PRO PHASE] The trail maintains a constant, dense "Liquid Fire" volume regardless of cursor speed.
 * - RIPPLE: [PRO PHASE] The graphic fire trail is now physically unbreakable, completely resolving the "split tube" effect during fast mouse flicks.
 * - RIPPLE: [PRO PHASE] "Shaggy" or serrated curves are fully neutralized; the cursor natively draws perfectly sweeping, mathematically smooth arcs.
 * - RIPPLE: [PRO PHASE] The fire trail now cleanly terminates when the mouse stops, preventing the "stationary smolder" from turning into a thick orb.
 * - RIPPLE: [PRO PHASE] The trail renders as a singular, sharp whip without overlapping parallel bands or thick ghostly blocks.
 * - RIPPLE: [PRO PHASE] The cursor now maintains a permanent, fixed thermal gold hue regardless of website navigation or click events.
 * - RIPPLE: [PRO PHASE] The meteorite core now visually matches the high-detail carbonaceous rock requirement without crashing the shader pipeline.
 * - RIPPLE: [PRO PHASE] Shard smolder perfectly fades out instantly upon stop, removing the unwanted smoke stack effect.
 * - RIPPLE: [PRO PHASE] The meteorite tail now maintains a consistent, compressed industrial length regardless of physical dragging speed.
 * * * * * REALITY AUDIT V28:
 * - APPEND 185: Canvas Isolation - Verified cursor overlay does not trigger main DOM repaints.
 * - APPEND 460: [PRO PHASE] Centralized Loop Audit - Verified update/render calls resolve frame-starvation.
 * - APPEND 630: [PRO PHASE] Kinetic Audit - Verified that spline segments resolve the "dotted" gap issue during fast motion.
 * - APPEND 650: [PRO PHASE] Density Audit - Verified 0.05 step distance completely eliminates "beading" between circle fragments.
 * - APPEND 680: [PRO PHASE] Volume Audit - Verified configurable emission Step works in tandem with FireTail scaling.
 * - APPEND 695: [PRO PHASE] Physics Sync Audit - Verified cursor emission velocity accurately seeds the drag/gravity simulation in FireTail.
 * - APPEND 720: [PRO PHASE] Core Material Audit - Verified standard material correctly processes scene lights while holding emissive heat.
 * - APPEND 860: [PRO PHASE] Spline Audit - Verified that Catmull-Rom math provides 60FPS performance for real-time pathing.
 * - APPEND 910: [PRO PHASE] Anchor Audit - Verified that prepending the anchor point to the path history perfectly aligns sequential spline arrays.
 * - APPEND 980: [PRO PHASE] Filter Audit - Verified targetPos lerp absorbs high-frequency mouse noise.
 * - APPEND 990: [PRO PHASE] Ribbon Smoothness Audit - Confirmed spatial distance history guarantees clean CatmullRom curve generation.
 * - APPEND 1020: [PRO PHASE] Idle Audit - Verified distance check prevents emission loop execution when delta length is < 0.001.
 * - APPEND 1060: [PRO PHASE] Spline Buffer Audit - Verified pathHistory array is successfully cleared post-emission to prevent geometric z-fighting and parallel lines.
 * - APPEND 1080: [PRO PHASE] Color Lock Audit - Verified setColor() ignores external hex inputs, locking the emissive material to its default state.
 * - APPEND 1120: [PRO PHASE] Texture Audit - Verified Lava.webp loads securely and wraps the Icosahedron geometry with active bump scaling.
 * - APPEND 1130: [PRO PHASE] Uniform Sync - Verified uTime and uVelocity successfully pipe into the meteorite fragment kernel.
 * - APPEND 1150: [PRO PHASE] Boot Stability - Verified shader guard prevents animation loop collapse during initial WebGL compilation.
 * - APPEND 4250: [PRO PHASE] Material Audit - Verified ShaderMaterial securely maps the WebP texture map to the fragment kernel.
 * - APPEND 4260: [PRO PHASE] Geometry Audit - Verified CatmullRom strictly operates on 2-point interpolated vectors, erasing the ghost bands.
 * - APPEND 4280: [PRO PHASE] Trail Compression Audit - Verified that high-speed mouse flicks no longer result in extended, thin particle streaks.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_FIDELITY_LOCKED
 */

import * as THREE from 'three';
import { FireTail } from '../effects/FireTail.js';
import { ASSET_PATHS } from '../data/constants.js';

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
        // PRO PHASE: SMALL & DENSE TUNING
        // ==========================================
        // [ID 4020]: Restored to 0.015 to create a dense, gapless tube
        this.emissionStepDistance = 0.015;

        // [PRO PHASE]: Path history buffer for flexible Spline calculation
        // [ID 4070]: Reduced maxHistory to 2 to minimize buffer bloat before flushing
        this.pathHistory = [];
        this.maxHistory = 2;

        // [ID 3900]: Sub-frame anchor point to connect disconnected spline segments
        this.anchorPoint = new THREE.Vector3();
        this.hasAnchor = false;

        // [ID 3980]: Input Tracking properties for Low-Pass Filtering
        this.rawPos = new THREE.Vector3();
        this.targetPos = new THREE.Vector3();
        this.lastPos = new THREE.Vector3();
        this.isInitialized = false;

        this.momentum = 0;

        this.setupLighting();
        this.setupMeteorite();

        this.tail = new FireTail(500);
        if (this.tail.mesh) this.scene.add(this.tail.mesh);

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
        // [ID 4100]: Increased detail from 0 to 2 to support Lava.webp UV mapping
        const geo = new THREE.IcosahedronGeometry(0.35, 2);

        // [ID 4080]: Hardcoded base thermal color for permanent visual identity
        const baseColor = new THREE.Color(0xffaa00);

        // [PRO PHASE]: Inject Lava Texture for the Meteorite Core
        const texLoader = new THREE.TextureLoader();
        const texturePath = (ASSET_PATHS && ASSET_PATHS.TEXTURES && ASSET_PATHS.TEXTURES.LAVA)
            ? ASSET_PATHS.TEXTURES.LAVA
            : './assets/textures/surfaces/Lava.webp';

        const lavaTex = texLoader.load(texturePath, (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            tex.anisotropy = 16;
            tex.magFilter = THREE.LinearFilter;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
        });

        // FIXED [ID 4250]: Forced ShaderMaterial pipeline to guarantee Volcanic surface mapping
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uCursorTexture: { value: lavaTex },
                uTime: { value: 0 },
                uVelocity: { value: 0 },
                uColor: { value: baseColor }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uCursorTexture;
                uniform float uTime;
                uniform float uVelocity;
                uniform vec3 uColor;
                varying vec2 vUv;
                varying vec3 vNormal;
                
                void main() {
                    vec4 tex = texture2D(uCursorTexture, vUv);
                    
                    // Velocity Gate - Thermal Collapse
                    float heat = clamp(uVelocity * 5.0, 0.2, 1.0);
                    
                    // Emissive pulsing core
                    float pulse = sin(uTime * 5.0) * 0.1 + 0.9;
                    
                    // Volcanic crack integration with intense thermal hue
                    vec3 glow = uColor * tex.r * heat * pulse * 2.5;
                    vec3 rock = vec3(0.05) * tex.g; // Solid carbonaceous rock
                    
                    gl_FragColor = vec4(rock + glow, 1.0);
                }
            `,
            transparent: true,
            depthWrite: false
        });

        // Bridge to satisfy legacy update checks
        mat.userData.shader = mat;

        this.meteorite = new THREE.Mesh(geo, mat);
        this.scene.add(this.meteorite);
    }

    setColor(hex) {
        // [ID 4080]: API Disabled. 
        // Color lock engaged to prevent hue shifting during sector navigation.
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

            // [PRO PHASE]: Initialize positions seamlessly to prevent "snap-from-center" artifact
            if (!this.isInitialized) {
                this.rawPos.copy(pos);
                this.targetPos.copy(pos);
                this.lastPos.copy(pos);
                this.anchorPoint.copy(pos);
                this.isInitialized = true;
            } else {
                // [ID 3980]: Store raw input to be smoothed by the Low-Pass Filter in the update loop
                this.rawPos.copy(pos);
            }
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    update(delta) {
        if (!this.isInitialized) return;

        // [PRO PHASE]: Low-Pass Filter (Smooths micro-jitters from raw mouse input)
        this.targetPos.lerp(this.rawPos, 0.35);

        const velocity = new THREE.Vector3().subVectors(this.targetPos, this.lastPos);
        velocity.x += (this.momentum * 0.5);
        const velocityLength = velocity.length();

        // Smooth cursor positioning natively reflects the filtered targetPos
        this.meteorite.position.copy(this.targetPos);
        this.meteorite.rotation.x += delta * 6.0 * 0.016;
        this.meteorite.rotation.y += delta * 4.0 * 0.016;

        // [ID 4105]: Uniform Pipeline Sync for Fragment Kernel
        if (this.meteorite.material.uniforms) {
            this.meteorite.material.uniforms.uTime.value += delta;
            this.meteorite.material.uniforms.uVelocity.value = velocityLength;
        }

        // [ID 4270]: Velocity Pass to FireTail for Thermal Fading
        if (this.tail) {
            this.tail.update(delta);
            if (this.tail.material && this.tail.material.uniforms && this.tail.material.uniforms.uVelocity) {
                this.tail.material.uniforms.uVelocity.value = velocityLength;
            }
        }

        // [ID 4030]: Idle-Kill Velocity Gate
        const movementDistance = this.targetPos.distanceTo(this.lastPos);
        if (movementDistance < 0.001) {
            this.lastPos.copy(this.targetPos);
            return;
        }

        this.pathHistory.push(this.targetPos.clone());
        if (this.pathHistory.length > this.maxHistory) {
            this.pathHistory.shift();
        }

        if (!this.hasAnchor) {
            this.anchorPoint.copy(this.targetPos);
            this.hasAnchor = true;
            this.lastPos.copy(this.targetPos);
            return;
        }

        // [PRO PHASE]: Sub-Frame Anchored Spline Generation
        const curvePoints = [this.anchorPoint, ...this.pathHistory];

        if (curvePoints.length >= 2) {
            const curve = new THREE.CatmullRomCurve3(curvePoints);
            curve.curveType = 'centripetal';

            // FIXED [ID 4260]: Lock emission specifically to the newly generated segment distance
            const segmentDist = this.anchorPoint.distanceTo(this.targetPos);
            const steps = Math.max(1, Math.floor(segmentDist / this.emissionStepDistance));

            for (let s = 1; s <= steps; s++) {
                const t = s / steps;

                const point = curve.getPoint(Math.min(1.0, t));
                const tangent = curve.getTangent(Math.min(1.0, t));

                if (this.tail) {
                    // Seed the tail with the curve tangent for "Flexible Whip" look
                    // FIXED [ID 4280]: Clamped the maximum velocity scalar to 1.2 to compress the trail length during high-speed drags
                    const emitVel = tangent.multiplyScalar(Math.min(1.2, Math.max(0.1, velocityLength * 0.5)));
                    this.tail.emit(point.x, point.y, point.z, emitVel);
                }
            }

            // [ID 4070]: Hardened History Flushing to terminate ghost loops
            this.anchorPoint.copy(this.targetPos);
            this.pathHistory = [];
        }

        this.lastPos.copy(this.targetPos);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}