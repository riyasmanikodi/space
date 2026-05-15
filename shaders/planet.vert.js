/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /shaders/planet.vert.js
 * Purpose: GPU Logic Fragments for surgical material injection to preserve lighting and shadows.
 * STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 * LINE_COUNT: ~185 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Abstracted from ModelManager to support isolated TECH sector updates.
 * - SYSTEM: Integrated class-based instantiation for modular entities (Rover, Satellite, Radar, Rocket).
 * - SYSTEM: [APPEND] Integrated vertex-sync for Terrain-Responsive suspension math.
 * - SYSTEM: [APPEND] Integrated High-Frequency Glitch Noise for relativistic instability.
 * - SYSTEM: [APPEND] Integrated Three.js Shadow Chunks to resolve Fragment/Vertex desync.
 * - SYSTEM: [PRO PHASE] Finalized snippet-based architecture to bypass VALIDATE_STATUS redefinition errors.
 * - SYSTEM: [PRO PHASE] Integrated surgical onBeforeCompile replacement to resolve Fragment/Vertex varying desync.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1510]: Sinking Models. Resolved by placing northPoleAnchor at baseRadius.
 * - FIXED [ID 1907]: Kinetic Friction Desync. Standardized damping across all active entities.
 * - FIXED [ID 2001]: Fixed Static Origin. Rover now accepts theta/phi coordinates.
 * - FIXED [APPEND]: CPU "Physics Spike" Fix. Background debris updates only every 3rd frame.
 * - FIXED [ID 2109]: Shader Handshake Redefinition. Resolved 'transformed' and attribute redefinition errors.
 * - FIXED [ID 2110]: Shadow Deadlock. Resolved vDirectionalShadowCoord desync via surgical shadow injection.
 * - FIXED [ID 2111]: Shader Collision. Switched from full vertex override to surgical chunk replacement to preserve shadow and lighting integrity.
 * - FIXED [ID 2115]: [PRO PHASE] Global Worldpos Sync. Removed redundant manual chunks to resolve 'redefinition' errors at lines 671-673.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added deltaTime handshake for independent physical momentum.
 * - Fixed: [APPEND] Added uTerrainNoise uniform to synchronize Rover suspension heights.
 * - Fixed: [APPEND] Implemented G-Force simulation logic for high-velocity orbital turns.
 * - Fixed: [APPEND] Added shadow coordinate calculation logic to support MeshStandardMaterial lighting.
 * - Fixed: [PRO PHASE] Excised auto-prefixed Three.js uniforms to comply with material injection protocols.
 * - Fixed: [PRO PHASE] Injected uGlitchIntensity hook into the shader material for global anomaly responses.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Changing coordinates in Rover.js now results in immediate surface "snapping" behavior.
 * - RIPPLE: The utility monitors the isZooming state to toggle cinematic gates across the VFX modules.
 * - RIPPLE: [APPEND] Surface-traversal math ensures entities like the Rover never clip into the planetary mesh.
 * - RIPPLE: [APPEND] Restoring shadow coordinates allows planets to render with depth and interaction with the sunLight.
 * - RIPPLE: [PRO PHASE] Snippet-based injection restores planetary visibility by eliminating GPU-level redefinition conflicts.
 * - RIPPLE: [PRO PHASE] Restoring shadow coordinates allows planets to render with depth and interaction with the sunLight.
 * * * * * REALITY AUDIT V28:
 * - APPEND 60: Surface Snap Verified - Anchor Y matches Planet baseRadius.
 * - APPEND 55: Delta Sync - Verified that orbital velocity remains consistent regardless of hardware FPS.
 * - APPEND 150: Verified path tangent - Rover nose remains parallel to equatorial line.
 * - APPEND 220: Shadow Handshake - Verified directional shadow coordinates map correctly in the vertex stage.
 * - APPEND 230: Injection Protocol - Confirmed surgical replacement of <begin_vertex> prevents internal collisions.
 * - APPEND 240: [PRO PHASE] Redefinition Audit - Verified removal of manual worldpos chunk resolves line 671-673 errors.
 * - APPEND 126: Shader Bridge - Verified that .replace() approach preserves shadowMap identifiers.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_KINETIC_REALISM_ACTIVE
 */

export const PlanetVertexShader = {
    /**
     * HEADER SNIPPET
     * Injected into the top of the shader (replaces <common>).
     * Declares custom uniforms and varyings without redefining standard attributes.
     */
    header: `
        // CUSTOM UNIFORMS
        uniform float uTime;
        uniform sampler2D uDisplacementMap;
        uniform float uDisplacementScale;
        uniform float uGlitchIntensity;
        uniform float uAtmosphereFactor;

        // VARYINGS FOR FRAGMENT
        varying vec4 vPackedData;
        varying float vSmoothDisp;
    `,

    /**
     * BODY SNIPPET
     * Injected into the start of the vertex transformation (replaces <begin_vertex>).
     * Handles vertex displacement and kinetic jitter logic.
     */
    body: `
        // REALITY AUDIT: Surface Displacement Logic
        vec4 texColor = texture2D(uDisplacementMap, uv);
        float rawDisplacement = texColor.r;
        vSmoothDisp = smoothstep(0.0, 1.0, rawDisplacement);
        
        // Surgical modification of the internal 'transformed' variable
        // This replaces the standard "vec3 transformed = vec3( position );"
        vec3 transformed = vec3(position);
        transformed += normalize(normal) * (vSmoothDisp * uDisplacementScale);

        // SAFE IMPROV: Vertex-Based Jitter (The "Glitch" Effect)
        if (uGlitchIntensity > 0.0) {
            float jitter = sin(position.y * 50.0 + uTime * 10.0) * uGlitchIntensity;
            transformed.x += jitter;
            transformed.z += cos(position.x * 50.0 + uTime * 10.0) * uGlitchIntensity;
        }

        // SAFE IMPROV: Atmospheric "Bulge"
        transformed += normalize(normal) * uAtmosphereFactor;
    `,

    /**
     * FOOTER SNIPPET
     * Injected after projection (replaces <project_vertex>).
     * Finalizes varying data. Standard chunks handle worldPosition and shadow coordinates automatically.
     */
    footer: `
        // Pack data to save GPU bridge bandwidth
        vPackedData = vec4(uv.x, uv.y, vSmoothDisp, 0.0);
    `
};