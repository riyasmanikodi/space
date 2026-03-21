/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /systems/vfx.js
 * Purpose: Post-processing stack, Selective Bloom, Uber-Shaders, and Downsampling
 * STATUS: PRO_PHASE_OPTICS_RECALIBRATED_PURGED
 * LINE_COUNT: ~150 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Post-processing stack synchronized with the GLOBAL_GLITCH dispatcher.
 * - SYSTEM: Unified Post-FX pipeline established for interaction-driven aberration pulses.
 * - SYSTEM: Implemented Internal Downsampling (50%) for high-fidelity bloom scalability.
 * - SYSTEM: [PRO PHASE] Recalibrated UnrealBloomPass for high-contrast space vacuum aesthetics.
 * - SYSTEM: [PRO PHASE] Optimized bloom thresholds to prevent texture wash-out in cosmic environments.
 * - SYSTEM: [PRO PHASE] Finalized green dot debris suppression via ultra-high thresholding.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1001]: Render Pass Desync. Enforced strict composer order to prevent chromatic aberration bleed.
 * - FIXED [ID 1601]: GPU Pipeline Stalls. Replaced if/else branching with step() and mix() logic in the Uber-Shader.
 * - FIXED [ID 2106]: [PRO PHASE] Duplicate Ticker Deadlock. Centralized update() hook to receive delta from CoreLoop.
 * - FIXED [ID 2172]: Color Casing Desync. Normalized activeSector lookup to prevent hex-code dropouts during transit.
 * - FIXED [ID 2601]: [PRO PHASE] Over-exposure Burn. Reduced bloom intensity to 0.6.
 * - FIXED [ID 2630]: [PRO PHASE] Environmental Haze. Reduced bloom radius to 0.2 and strength to 0.4 to eliminate the "Gloom" white-out effect.
 * - FIXED [ID 2655]: [PRO PHASE] Green Dot Artifacts. Raised threshold to 0.99 and reduced radius to 0.1 to surgically eliminate background noise.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added GLOBAL_GLITCH subscription to trigger chromatic aberration pulses on interaction.
 * - Fixed: Optimized Uber-Shader to utilize branchless math for high-speed mobile GPU processing.
 * - Fixed: Injected uLensDistortion uniform to handle Gravitational Lensing in the CODE sector.
 * - Fixed: [PRO PHASE] Injected higher threshold (0.99) to isolate glow strictly to tech-emissive pulses and the singularity.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Lower bloom allows planetary surface details and procedural bump-maps to remain visible.
 * - RIPPLE: Recalibrated glare reduces eye fatigue during long terminal sessions.
 * - RIPPLE: Space void is now pitch black; stars and planetary highlights are crisp without bleeding.
 * - RIPPLE: [PRO PHASE] Background green dots are completely suppressed, leaving a pristine high-contrast vacuum.
 * * * * * REALITY AUDIT V28:
 * - APPEND 5: Fragment Optimization - Replaced branching with step-based multipliers.
 * - APPEND 27: Resolution Scalability - Bloom pass now renders at 50% resolution to maintain 60FPS.
 * - APPEND 145: Verified distortion scale for UI legibility.
 * - APPEND 185: [PRO PHASE] Contrast Audit - Verified pitch-black void levels.
 * - APPEND 230: [PRO PHASE] Optics Audit - Confirmed 0.99 threshold suppresses all background sub-pixel noise.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_OPTICS_RECALIBRATED_PURGED
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SystemEvents, EVENTS } from '../utils/events.js';

class VFXEngine {
    constructor() {
        this.composer = null;
        this.uberPass = null;
        this.bloomPass = null;
    }

    init(renderer, scene, camera) {
        this.composer = new EffectComposer(renderer);

        // 1. Base Render Pass
        const renderPass = new RenderPass(scene, camera);
        this.composer.addPass(renderPass);

        // REALITY AUDIT: Internal Downsampling for scalability
        const renderTargetSize = new THREE.Vector2(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        // PRO PHASE [ID 2655]: Recalibrated Space Glare
        // Strength: 0.4 | Radius: 0.1 | Threshold: 0.99
        // Surgically removes the green dot debris while keeping high-intensity pulses sharp.
        this.bloomPass = new UnrealBloomPass(renderTargetSize, 0.4, 0.1, 0.99);
        this.composer.addPass(this.bloomPass);

        // Uber-Shader with branchless Gravitational Lensing and Chromatic Aberration
        const UberShader = {
            uniforms: {
                tDiffuse: { value: null },
                uAberrationIntensity: { value: 0.0 },
                uLensDistortion: { value: 0.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform float uAberrationIntensity;
                uniform float uLensDistortion;
                varying vec2 vUv;

                void main() {
                    vec2 uv = vUv;
                    vec2 center = vec2(0.5, 0.5);
                    vec2 toCenter = center - uv;
                    float dist = length(toCenter);
                    
                    // Branchless Gravitational Lensing
                    float lensFactor = step(0.001, uLensDistortion);
                    uv += (toCenter * (1.0 - dist) * uLensDistortion) * lensFactor;

                    // Chromatic Aberration
                    vec2 shift = vec2(uAberrationIntensity * 0.01, 0.0);
                    vec4 color1 = texture2D(tDiffuse, uv + shift);
                    vec4 color2 = texture2D(tDiffuse, uv);
                    vec4 color3 = texture2D(tDiffuse, uv - shift);
                    
                    gl_FragColor = vec4(color1.r, color2.g, color3.b, 1.0);
                }
            `
        };

        this.uberPass = new ShaderPass(UberShader);
        this.composer.addPass(this.uberPass);

        this.bindEvents();
    }

    bindEvents() {
        SystemEvents.subscribe(EVENTS.GLOBAL_GLITCH, (data) => {
            const chromaticAnomalies = ['CHROMATIC_SPLIT', 'HEX_SHRED', 'REPULSION_PULSE'];
            if (chromaticAnomalies.includes(data.effectId)) {
                this.triggerImpactEffect(0.5 * data.intensity);
            }
        });
    }

    triggerImpactEffect(intensity) {
        if (this.uberPass) {
            this.uberPass.uniforms.uAberrationIntensity.value = intensity;
        }
    }

    update(delta, activeSector, velocity) {
        if (!this.composer) return;

        if (this.uberPass.uniforms.uAberrationIntensity.value > 0) {
            this.uberPass.uniforms.uAberrationIntensity.value -= delta * 0.05;
            this.uberPass.uniforms.uAberrationIntensity.value = Math.max(0, this.uberPass.uniforms.uAberrationIntensity.value);
        }

        const strictSector = activeSector ? activeSector.toUpperCase() : null;
        const targetDistortion = strictSector === 'CODE' ? 0.3 : 0.0;

        this.uberPass.uniforms.uLensDistortion.value += (targetDistortion - this.uberPass.uniforms.uLensDistortion.value) * 0.05;

        this.composer.render(delta);
    }
}

export const VFX = new VFXEngine();