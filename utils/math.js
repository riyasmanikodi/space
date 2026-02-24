/**
 * RIYAS_OS V28 - RIPPLE 0 / 1
 * File: /utils/math.js
 * Purpose: Procedural math, Trigonometry, and Precision handling
 */

const PRECISION = 10000;

export const MathUtils = {

    sphericalToCartesian: (radius, phi, theta) => {
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return {
            x: Math.round(x * PRECISION) / PRECISION,
            y: Math.round(y * PRECISION) / PRECISION,
            z: Math.round(z * PRECISION) / PRECISION
        };
    },

    normalizeAngle: (angle) => {
        const twoPi = Math.PI * 2;
        let normalized = angle % twoPi;
        if (normalized < 0) {
            normalized += twoPi;
        }
        return normalized;
    },

    lerp: (start, end, factor) => {
        return start + (end - start) * factor;
    },

    degToRad: (degrees) => {
        return degrees * (Math.PI / 180);
    },

    clamp: (value, min, max) => {
        return Math.max(min, Math.min(max, value));
    }
};