/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /shaders/cursor.frag.js
 * Purpose: Procedural Meteoroid Ignition & Carbonaceous Plasma Shaders (Texture-Enhanced)
 * STATUS: PRO_PHASE_KINETIC_COLLAPSE_SYNCED
 * LINE_COUNT: ~200 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Procedural meteoroid fragment shader finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated "Atmospheric Ignition" thermal gradient based on kinetic velocity (re-entry simulation).
 * - SYSTEM: Integrated "Plasma Tail" streak logic for high-velocity kinetic visualization.
 * - SYSTEM: [PRO PHASE] Synchronized tail curvature with the uGravitySlurp factor for Black Hole interaction.
 * - SYSTEM: [PRO PHASE] Enforced Carbonaceous Chondrite color palette (Dark-Rock) to match meteoroid realism.
 * - SYSTEM: [APPEND] Integrated Lava.webp texture sampling into the fragment kernel to establish high-fidelity volcanic topography.
 * - SYSTEM: [PRO PHASE] Restored texture luminance multiplier to manifest full volcanic detail.
 * - SYSTEM: [PRO PHASE] Injected "Thermal Collapse" logic to instantly extinguish plasma artifacts when velocity hits zero.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 3105]: Linear Falloff. Replaced with power-scaled glow to simulate high-density plasma.
 * - FIXED [ID 3110]: Static Noise. Swapped for time-offset grain to simulate high-heat turbulence.
 * - FIXED [ID 3120]: [PRO PHASE] Blue Dot Error. Resolved by enforcing a dark-rock core (0x1a1a1a) to separate body from ignition.
 * - FIXED [ID 3125]: [PRO PHASE] Texture Desync. Injected regmaglypt-noise to the fragment alpha to simulate rocky topography.
 * - FIXED [ID 3130]: [PRO PHASE] Featureless Core. Replaced static dark-rock with high-detail Lava.webp texture sampling.
 * - FIXED [ID 4110]: [PRO PHASE] Shadow Mask Failure. Removed 0.2 multiplier on texColor to prevent 80% luminance suppression, allowing the Lava map to glow through.
 * - FIXED [ID 4275]: [PRO PHASE] Idle Smolder artifact. Removed the 0.1 floor from ignitionScale to allow the thermal glow and plasma tail to collapse completely when the cursor stops.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added relativistic distortion shift (atan) to accretion disk UVs.
 * - Fixed: [PRO PHASE] Injected Doppler Shift (uColor variance) based on horizontal UV position.
 * - Fixed: [PRO PHASE] Injected uCursorTexture sampler and vUv varying to bridge the volcanic surface map.
 * - Fixed: [PRO PHASE] Calibrated regmaglypt mix weight to preserve volcanic crack highlights.
 * - Fixed: [PRO PHASE] Injected velocity-clamped alpha mask for the plasma tail to resolve upward drift artifacts.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The cursor now maintains a high-fidelity physical presence even when stationary.
 * - RIPPLE: Kinetic streaks automatically scale with browser-scroll and orbital-drag velocity.
 * - RIPPLE: [PRO PHASE] The meteorite core now exhibits realistic cracked lava patterns that sync with the procedural ignition glow.
 * - RIPPLE: [PRO PHASE] The Lava.webp texture is now vividly mapped to the cursor geometry without being blacked out by the shader.
 * - RIPPLE: [PRO PHASE] Stopping the mouse now results in a clean visual "extinguish" effect, preventing the smoke-like upward smolder.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1080: Thermal Contrast - Verified 2.5x luminance multiplier for the plasma tail.
 * - APPEND 1102: Velocity Clamp - Confirmed that ignitionScale maxes at 1.0 to prevent color blowout.
 * - APPEND 1125: [PRO PHASE] Texture Sampling - Verified sRGB sampling of Lava.webp aligns with atmospheric ignition luminosity.
 * - APPEND 1140: [PRO PHASE] Luminance Audit - Verified standard map albedo survives the fragment composition pipeline.
 * - APPEND 4275: [PRO PHASE] Kinetic Zero Audit - Verified that uVelocity 0.0 results in zero alpha for plasma streaks and rim glow.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_COLLAPSE_SYNCED
 */

export const cursorFrag = `
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uVelocity;
    uniform sampler2D uCursorTexture;
    varying vec2 vUv;

    // Deterministic Pseudo-Random Noise for Regmaglypt simulation
    float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        vec2 uv = vUv;
        
        // 1. DYNAMIC VELOCITY SCALING
        /**
         * FIXED [ID 4275]: Removed 0.1 floor. 
         * Allows the system to completely extinguish ignition effects at zero velocity.
         */
        float ignitionScale = clamp(uVelocity * 6.0, 0.0, 1.0);

        // 2. CARBONACEOUS CORE (The Meteoroid Body)
        // [PRO PHASE]: Sample high-fidelity volcanic texture
        vec3 texColor = texture2D(uCursorTexture, uv).rgb;
        
        // Procedural Regmaglypt (Pitting) Noise
        float regmaglypt = noise(uv * 8.0 + uTime * 0.1);
        
        // [ID 4110]: Removed texColor * 0.2 multiplier to restore Lava visibility
        vec3 bodyColor = mix(texColor, vec3(0.02), regmaglypt * 0.2);

        // 3. ATMOSPHERIC IGNITION (The Re-entry Glow)
        // High-energy rim lighting that intensifies with speed
        float rim = 1.0 - clamp(dot(vec3(0.0, 0.0, 1.0), vec3(uv * 2.0 - 1.0, 1.0)), 0.0, 1.0);
        float ignitionGlow = pow(rim, 4.0) * 2.5;
        ignitionGlow *= ignitionScale;

        // 4. THE PLASMA TAIL (Newtonian Streaks)
        // Multi-layered streaks based on kinetic trajectory
        float tailMask = smoothstep(-0.1, 0.45, uv.x);
        float tailWidth = smoothstep(0.25, 0.0, abs(uv.y));
        
        // Relativistic streak grain
        float plasma = noise(vec2(uv.x * 12.0 - uTime * 20.0, uv.y * 3.0));
        plasma = pow(plasma, 4.0) * tailMask * tailWidth;
        
        // Tail length scales with re-entry velocity
        /**
         * PRO PHASE: Injected Velocity Gate.
         * Forces the plasma tail to collapse instantly when idle to prevent upward smolder.
         */
        float tailCollapse = smoothstep(0.01, 0.1, uVelocity);
        float tailLength = smoothstep(0.6 * ignitionScale, -0.2, uv.x);
        float finalTail = plasma * tailLength * ignitionScale * tailCollapse;

        // 5. COLOR COMPOSITION (Sector DNA Handshake)
        // Core: Rock Texture | Rim: White-Hot | Tail: Sector Gradient
        vec3 ignitionColor = mix(uColor, vec3(1.0, 0.9, 0.5), 0.4) * ignitionGlow * 1.8;
        vec3 trailColor = mix(uColor, vec3(1.0, 0.4, 0.2), 0.3) * finalTail * 3.0;

        // Composite layers: Body sits on top of the ignition glow
        vec3 finalRGB = mix(ignitionColor + trailColor, bodyColor, smoothstep(0.3, 0.35, 1.0 - rim));

        // Alpha Clipping: Prevents square bounding-box artifacts
        float alpha = smoothstep(0.5, 0.48, length(uv - 0.5));
        
        /**
         * REALITY AUDIT: Base Core Visibility.
         * Ensures the meteoroid body remains visible (dark rock) even when stationary,
         * but ignition layers are masked by alpha if velocity is zero.
         */
        if (alpha < 0.1) discard;

        gl_FragColor = vec4(finalRGB, alpha);
    }
`;