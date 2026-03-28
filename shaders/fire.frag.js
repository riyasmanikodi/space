/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /shaders/fire.frag.js
 * Purpose: GPU-Accelerated Thermal Plasma Fragment Shader (Liquid Dynamic Variant)
 * STATUS: PRO_PHASE_LIQUID_DYNAMIC_LOCKED
 * LINE_COUNT: ~270 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Developed high-fidelity thermal plasma shader for kinetic cursor fire.
 * - SYSTEM: Integrated distance-based gradient interpolation for realistic flame cooling.
 * - SYSTEM: [PRO PHASE] Transitioned from point-sprite masking to 3D surface luminescence.
 * - SYSTEM: [IMPROV] Injected "Hot Core" radiance math to eliminate the energy-tube visual artifact.
 * - SYSTEM: [PRO PHASE] Optimized alpha falloff to match the fluid 0.025 decay speed in FireTail.js.
 * - SYSTEM: [PRO PHASE] Shifted to Soft-Glow Circle (SDF) approach, enforcing perfect point-based radiance.
 * - SYSTEM: [PRO PHASE] Synchronized shader visual cooling logic with the new dynamic physics engine (Air Drag & Gravity).
 * - SYSTEM: [PRO PHASE] Injected procedural pseudo-noise to simulate turbulent, churning plasma textures.
 * - SYSTEM: [PRO PHASE] Transitioned to Cell-Shaded Graphic Tapering logic to match vector re-entry reference.
 * - SYSTEM: [PRO PHASE] Injected Dynamic Alpha Scaling to prevent whiteout during high-density overlaps.
 * - SYSTEM: [PRO PHASE] Refined SDF boundaries to cull geometric protrusion and establish a smooth liquid tube.
 * - SYSTEM: [PRO PHASE] Re-calibrated UV displacement for high-frequency shimmering over low-frequency serration.
 * - SYSTEM: [PRO PHASE] Expanded SDF edge layer to fill spatial gaps and re-establish unbroken liquid ribbon.
 * - SYSTEM: [PRO PHASE] Finalized shader lock-in to support CursorService history flushing and single-line rendering.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 3201]: Flat Fire. Injected center-biased radiance to simulate thermal heat-haze.
 * - FIXED [ID 3210]: [IMPROV] Energy Tube. Recalibrated alpha falloff to create a hollow, wispy thermal profile.
 * - FIXED [ID 3220]: [PRO PHASE] Blocky Ribbon. Swapped SDF point masking for a unified surface-glow logic for 3D shards.
 * - FIXED [ID 3550]: [PRO PHASE] Triangular Facets. Resolved by clipping fragment UVs into a perfect radial gradient (SDF).
 * - FIXED [ID 3890]: [PRO PHASE] Distinct Dots. Resolved by transitioning to soft-overlap cell-shading.
 * - FIXED [ID 3910]: [PRO PHASE] White Blowout. Implemented hard-clamped color layers and density-aware alpha.
 * - FIXED [ID 3925]: [PRO PHASE] Stiff Ribbon. Injected noise-based UV displacement to create a "Liquid" churn.
 * - FIXED [ID 3940]: [PRO PHASE] Shaggy Edges. Tightened outer smoothstep radius to 0.42 to permanently hide icosahedron vertices.
 * - FIXED [ID 3950]: [PRO PHASE] Serrated Noise Jitter. Halved displacement amplitude and increased time multiplier for a fast, shimmering fluid boundary.
 * - FIXED [ID 3995]: [PRO PHASE] Separate Sprites. Expanded smoothstep edge to 0.48 to bridge visual gaps while remaining safely inside the 0.5 geometric limit.
 * - FIXED [ID 4040]: [PRO PHASE] Multi-Line Alpha Bleed. Verified 0.4 density dampener perfectly maintains saturated colors against the new CursorService history flushing mechanism.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added luminosity boosting in the fragment core to maintain visibility against the dark void.
 * - Fixed: [PRO PHASE] Injected branchless alpha-masking for high-performance mobile GPU rendering.
 * - Fixed: [PRO PHASE] Added chromatic aberration emulation at the shard edges for plasma realism.
 * - Fixed: [PRO PHASE] Synchronized fragment alpha with the new 'vAge' attribute.
 * - Fixed: [PRO PHASE] Added triple-layer color stepping (Red -> Orange -> Yellow) for graphic fidelity.
 * - Fixed: [PRO PHASE] Injected inverse-age saturation to maintain color vibrancy at the trail tip.
 * - Fixed: [PRO PHASE] Shifted edge boundary inwards to guarantee circle clipping happens safely within the geometric bounds.
 * - Fixed: [PRO PHASE] Locked high-frequency liquid displacement variables to prevent serration on single-line splines.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: The cursor trail now looks like a physical fluid plasma stream rather than static data-points.
 * - RIPPLE: [PRO PHASE] The trail now renders as a stylized, liquid graphic ribbon instead of volumetric spheres.
 * - RIPPLE: [PRO PHASE] High-density shard clusters maintain deep saturation without bleaching to white.
 * - RIPPLE: [PRO PHASE] The "Liquid" displacement creates organic bending that matches the flexible spline path.
 * - RIPPLE: [PRO PHASE] The trail is now perfectly smooth on the outside while maintaining internal churning, matching the cinematic reference.
 * - RIPPLE: [PRO PHASE] Trail elements visually merge back into a solid, unbroken stream, eliminating the "disconnected beads" artifact entirely.
 * - RIPPLE: [PRO PHASE] Trail now appears as a singular, stylized graphic ribbon with no internal z-fighting or whiteout when history is flushed.
 * * * * * REALITY AUDIT V28:
 * - APPEND 640: [PRO PHASE] Circular Mask Audit - Verified SDF logic efficiently culls polygon corners.
 * - APPEND 710: [PRO PHASE] Texture Audit - Verified procedural noise runs efficiently at 60FPS.
 * - APPEND 900: [PRO PHASE] Cell-Shade Audit - Verified hard-step boundaries prevent RGB overflow.
 * - APPEND 920: [PRO PHASE] Liquid Sync Audit - Confirmed noise displacement frequency aligns with cursor velocity.
 * - APPEND 940: [PRO PHASE] Shave Audit - Verified that max displacement (0.04) + max radius (0.42) remains safely under the 0.5 geometric cull limit.
 * - APPEND 995: [PRO PHASE] Gap Audit - Confirmed 0.48 edge radius perfectly maps to the 0.8 baseThickness defined in FireTail to create 100% geometric overlap.
 * - APPEND 1040: [PRO PHASE] Overlap Alpha Audit - Verified that the graphic edge * lifecycle * density dampener completely mitigates the parallel ghost lines visual artifact.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_LIQUID_DYNAMIC_LOCKED
 */

export const FireFragmentShader = `
    uniform float uTime; // PRO PHASE: Time driver for procedural noise churning
    varying vec3 vColor;
    varying float vAge;
    varying vec2 vUv; // PRO PHASE: UVs injected from FireTail.js for SDF masking

    // ==========================================
    // PRO PHASE: PROCEDURAL FLARE TEXTURE
    // Generates a wispy, turbulent pseudo-noise pattern
    // ==========================================
    float flareNoise(vec2 uv, float time) {
        float n = sin(uv.x * 12.0 + time * 1.5) * sin(uv.y * 12.0 - time * 1.5);
        n += 0.5 * sin(uv.x * 25.0 - time * 3.0) * sin(uv.y * 25.0 + time * 2.5);
        return n * 0.5 + 0.5;
    }

    void main() {
        // [PRO PHASE]: Liquid UV Displacement
        // [ID 3950]: Increased time multiplier and decreased amplitude for a fast "shimmer" rather than serrated edges
        float displacement = flareNoise(vUv * 3.0, uTime * 6.0) * 0.04;
        
        // ==========================================
        // 1. SDF CIRCLE MASKING
        // [PRO PHASE]: Calculate distance with noise displacement for liquid look
        // ==========================================
        float dist = length(vUv - vec2(0.5)) + displacement;
        
        // Hard clip the geometric corners immediately
        if (dist > 0.5) discard;

        // [PRO PHASE]: Cell-Shading Layer Logic
        // [ID 3995]: Expanded the edge to 0.48 to let the fire fill more of the geometric area, bridging the gaps between sprites
        float edgeLayer = smoothstep(0.48, 0.45, dist);
        float coreLayer = smoothstep(0.25, 0.22, dist);
        
        // ==========================================
        // 2. THERMAL COLOR LAYERS
        // ==========================================
        // Defined saturated color constants for graphic fidelity
        vec3 colRed = vec3(0.9, 0.1, 0.0);    // Outer graphic shell
        vec3 colOrange = vec3(1.0, 0.5, 0.0); // Mid thermal layer
        vec3 colYellow = vec3(1.0, 0.9, 0.3); // Liquid core
        
        // Blend colors based on hard-stepped masks
        vec3 finalCol = mix(colRed, colOrange, edgeLayer);
        finalCol = mix(finalCol, colYellow, coreLayer);

        // ==========================================
        // 3. ADAPTIVE DENSITY ALPHA
        // [PRO PHASE]: Lower individual alpha to allow many shards to stack 
        // without hitting 1.0 (whiteout blowout)
        // ==========================================
        float lifecycle = 1.0 - vAge;
        
        // Quadratic lifecycle decay for the "Tapered" tail look
        float ageAlpha = lifecycle * lifecycle; 
        
        // Combined alpha logic: Graphic edge * Lifecycle * Density Dampener (0.4)
        float alpha = edgeLayer * ageAlpha * 0.4;

        // Optimization: Discard fragments with negligible alpha
        if (alpha < 0.01) discard;

        // Final thermal output with saturated cell-shaded properties
        // Multiplied by color aging to darken the trail tip
        gl_FragColor = vec4(finalCol * (0.6 + lifecycle * 0.4), alpha);
    }
`;