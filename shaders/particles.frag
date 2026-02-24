/**
 * RIYAS_OS V28 - RIPPLE 2
 * File: /shaders/particles.frag
 * Purpose: Soft Circular Masking, Alpha Clipping, Sector-Driven Colors, and Breathing Math
 */

export const ParticlesFragmentShader = `
    // ==========================================
    // SAFE IMPROV & REALITY AUDIT: Uniforms & Varyings
    // ==========================================
    uniform float uTime;
    uniform vec3 uSectorColor; // Dynamically matches TECH, CODE, or VISION

    // Passed from a corresponding Vertex Shader
    varying float vRandom;     // Unique seed per particle for offset timing
    varying float vDepth;      // Z-depth for perspective color shifting

    void main() {
        // ==========================================
        // SAFE IMPROV: Circular Masking (The "Soft Star" Look)
        // gl_PointCoord provides UV coordinates within the square particle.
        // We calculate the distance from the center (0.5, 0.5) to draw a circle.
        // ==========================================
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);

        // ==========================================
        // REALITY AUDIT: The "Pixel Overdraw" Burn Fix (Alpha Clipping)
        // Hard threshold logic. If the pixel is outside the circle radius (0.5),
        // we completely discard it. This prevents the GPU from calculating 
        // heavy transparency math for overlapping invisible corners.
        // ==========================================
        if (dist > 0.5) {
            discard; 
        }

        // Create a soft glowing edge inside the valid circle
        float alpha = smoothstep(0.5, 0.2, dist);

        // ==========================================
        // REALITY AUDIT: The "Flicker" Headache Fix (Low-Frequency Sine)
        // Uses vRandom to offset the phase of the sine wave so particles 
        // "breathe" asynchronously at a calm, low frequency, preventing eye strain.
        // ==========================================
        float breathe = (sin(uTime * 1.5 + vRandom * 6.2831) * 0.5 + 0.5);
        // Keep a baseline brightness of 30% so they never completely vanish
        float pulseIntensity = breathe * 0.7 + 0.3;

        // ==========================================
        // SAFE IMPROV: Sector-Driven Chromatic Shifting
        // Particles shift towards the current uSectorColor. 
        // We also use vDepth to slightly desaturate distant particles, 
        // creating atmospheric perspective (fog effect in space).
        // ==========================================
        vec3 baseWhite = vec3(0.8, 0.8, 0.9);
        
        // Blend between white stardust and the neon sector color based on depth
        vec3 finalColor = mix(uSectorColor, baseWhite, vDepth);
        
        // Apply breathing pulse
        finalColor *= pulseIntensity;

        gl_FragColor = vec4(finalColor, alpha);
    }
`;