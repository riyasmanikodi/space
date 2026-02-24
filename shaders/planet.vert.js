/**
 * RIYAS_OS V28 - RIPPLE 2
 * File: /shaders/planet.vert
 * Purpose: GPU Vertex Displacement, Glitch Jitter, Moiré Fix, and Data Packing
 */

export const PlanetVertexShader = `
    // ==========================================
    // SAFE IMPROV & REALITY AUDIT: Uniforms
    // ==========================================
    uniform float uTime;
    uniform sampler2D uDisplacementMap;
    uniform float uDisplacementScale;
    
    // SAFE IMPROV: Glitch & Atmosphere Controls
    uniform float uGlitchIntensity;   // For CODE Black Hole
    uniform float uAtmosphereFactor;  // For VISION Fresnel Bulge

    // ==========================================
    // REALITY AUDIT: GPU Interpolation Lag Fix
    // Packing varying variables to keep the data pipe lean.
    // vPackedData.xy = uv, vPackedData.z = displacement amount
    // ==========================================
    varying vec4 vPackedData;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
        // Base setup
        vec3 newPosition = position;
        vec3 objectNormal = normalize(normal);

        // ==========================================
        // REALITY AUDIT: The "Moiré Pattern" Artifact Fix
        // Uses smoothstep to ensure mathematical continuity between 
        // ridges and valleys, eliminating "pixel-popping".
        // ==========================================
        vec4 texColor = texture2D(uDisplacementMap, uv);
        float rawDisplacement = texColor.r; // Red channel acts as height map
        
        // Smooth falloff to prevent harsh jagged edges on low-poly meshes
        float smoothDisplacement = smoothstep(0.0, 1.0, rawDisplacement);
        
        // Apply base displacement
        newPosition += objectNormal * (smoothDisplacement * uDisplacementScale);

        // ==========================================
        // SAFE IMPROV: Vertex-Based Jitter (The "Glitch" Effect)
        // Microscopic high-frequency vibration for the CODE sector.
        // ==========================================
        if (uGlitchIntensity > 0.0) {
            float jitter = sin(position.y * 50.0 + uTime * 10.0) * uGlitchIntensity;
            newPosition.x += jitter;
            newPosition.z += cos(position.x * 50.0 + uTime * 10.0) * uGlitchIntensity;
        }

        // ==========================================
        // SAFE IMPROV: Atmospheric "Bulge" (Vertex Squashing)
        // Subtly scales vertices outward based on atmosphere factor
        // to create a thicker, ethereal edge layer.
        // ==========================================
        newPosition += objectNormal * uAtmosphereFactor;

        // Compute standard matrices
        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // ==========================================
        // SAFE IMPROV: Normal-Based Lighting Pre-Calc
        // Passed to the fragment shader for lag-free "Cyan" tech glows.
        // ==========================================
        vNormal = normalize(normalMatrix * normal);
        vViewPosition = -mvPosition.xyz;

        // Pack UV and displacement data to save GPU bridge bandwidth
        vPackedData = vec4(uv.x, uv.y, smoothDisplacement, 0.0);
    }
`;