/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /shaders/blackhole.frag.js
 * Purpose: Relativistic "Interstellar" Singularity (Lensing & Thermal Accretion)
 * IMPORTANT: Save this file exactly as "blackhole.frag.js" in the /shaders/ folder.
 */

export const BlackHoleFragmentShader = `
    uniform float uTime;
    uniform vec3 uColor; // Base Violet: 0x8a2be2
    varying vec2 vUv;

    // Helper for pseudo-random grain to simulate "High-Heat" plasma
    float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        vec2 uv = vUv - 0.5;
        float dist = length(uv);
        float safeDist = max(dist, 0.001);

        // 1. RELATIVISTIC DISTORTION (Lensing)
        // Stretches coordinates to simulate light bending around the mass
        // The 8.0 factor controls the "gravity well" depth
        float lensing = 1.0 / (safeDist * 8.0);
        float angle = atan(uv.y, uv.x) + lensing * 0.5;

        // 2. THE EVENT HORIZON (Absolute Zero)
        // Sharp black threshold at the core (0.12 radius)
        float horizon = smoothstep(0.12, 0.125, safeDist);

        // 3. PHYSICAL ACCRETION DISK (Wrap-around effect)
        // We use two layers of high-speed rotation to simulate plasma fluid dynamics
        float layer1 = sin(angle * 1.5 + uTime * 6.0 - lensing);
        float layer2 = sin(angle * 2.0 - uTime * 4.0 + lensing * 0.5);
        
        // Power function sharpens the sine waves into thin "streaks" of light
        float plasma = pow(max(layer1 * layer2, 0.0), 3.0);

        // 4. THERMAL GRADIENT (Interstellar Pattern)
        // Transitions from deep violet to white-hot at the inner rim
        // Matches the "White-Hot" inner ring reference you uploaded
        float rimGlow = 0.004 / abs(safeDist - 0.13);
        rimGlow = clamp(rimGlow, 0.0, 3.0);

        // Outer disk falloff
        float diskFalloff = smoothstep(0.48, 0.15, safeDist);

        // 5. COLOR COMPOSITION
        // Inner: White Hot | Middle: Cyan-White heat | Outer: Sector Violet
        vec3 innerRimColor = vec3(0.95, 0.9, 1.0) * rimGlow;
        vec3 diskColor = mix(uColor, vec3(0.5, 0.8, 1.0), plasma) * plasma * diskFalloff;
        
        // Combine layers and apply the black hole center cutout
        vec3 finalRGB = (innerRimColor + diskColor) * horizon;

        // ALPHA: Define the cloud density
        float alpha = clamp(diskFalloff * plasma + rimGlow, 0.0, 1.0);
        // Soften corners of the 80x80 plane to blend perfectly
        alpha *= smoothstep(0.5, 0.45, safeDist);

        gl_FragColor = vec4(finalRGB, alpha);
    }
`;