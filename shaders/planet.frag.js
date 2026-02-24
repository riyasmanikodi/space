/**
 * RIYAS_OS V28 - RIPPLE 2
 * File: /shaders/planet.frag
 * Purpose: Procedural Painting, Circuitry Overlay, Fresnel Glows, and GPU Blending
 */

export const PlanetFragmentShader = `
    // ==========================================
    // SAFE IMPROV & REALITY AUDIT: Uniforms
    // ==========================================
    uniform float uTime;
    
    // SAFE IMPROV: Dynamic Sector Tinting
    // Smoothly transitions from Tech Cyan to Vision Pink without hard reloads.
    uniform vec3 uSectorColor; 

    // Packed data from vertex shader (x,y = uv, z = displacement)
    varying vec4 vPackedData;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    // ==========================================
    // REALITY AUDIT: "Shadow Banding" Artifact Fix
    // Internal dithering function adds microscopic high-frequency noise 
    // to break up stepped gradients on mobile GPUs with limited bit-depth.
    // ==========================================
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        vec2 uv = vPackedData.xy;
        float displacement = vPackedData.z;
        
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // ==========================================
        // SAFE IMPROV: Fresnel "Edge Glow"
        // Calculates the angle between the camera and the planet's surface.
        // Creates a neon rim that makes 3D objects "pop" against pitch black.
        // ==========================================
        float fresnelTerm = dot(normal, viewDir);
        fresnelTerm = clamp(1.0 - fresnelTerm, 0.0, 1.0);
        float fresnelGlow = pow(fresnelTerm, 3.0); // Exponent controls rim thickness

        // ==========================================
        // SAFE IMPROV: Procedural "Circuitry" Overlay
        // Uses math instead of textures to draw pulsing digital lines.
        // 
        // REALITY AUDIT: Branching Performance Hit Fix
        // Uses step() and pure math instead of if/else logic, ensuring 
        // the GPU processes every pixel simultaneously at maximum speed.
        // ==========================================
        
        // Create an anti-aliased grid
        vec2 gridUv = uv * 30.0;
        // fwidth provides hardware-level derivative for crisp lines at any distance
        vec2 gridLines = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
        float lineIntensity = 1.0 - min(min(gridLines.x, gridLines.y), 1.0);
        
        // Animate a pulsing wave across the grid using uTime
        float pulse = step(0.8, sin(uv.y * 40.0 - uTime * 3.0));
        
        // Circuits only appear on raised displaced areas
        float activeCircuitry = lineIntensity * pulse * smoothstep(0.2, 0.8, displacement);

        // ==========================================
        // MATHEMATICAL BLENDING (No if/else logic)
        // ==========================================
        
        // Base dark core of the planet
        vec3 baseColor = uSectorColor * 0.15; 
        
        // Glowing tech lines and edge rims
        vec3 circuitColor = uSectorColor * activeCircuitry * 2.5; 
        vec3 rimColor = uSectorColor * fresnelGlow * 1.8;

        // Composite final pixel
        vec3 finalColor = baseColor + circuitColor + rimColor;

        // Apply Internal Dithering to prevent color banding in dark space
        float dither = (random(gl_FragCoord.xy) - 0.5) * (4.0 / 255.0);
        finalColor += dither;

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;