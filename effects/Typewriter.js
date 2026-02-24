/**
 * RIYAS_OS V28 - RIPPLE 4
 * File: /effects/Typewriter.js
 * Purpose: Linguistic Engine, Hiccup Pacing, Binary Flicker, DOM Optimization, and Session Cancellation
 */

export class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.baseSpeed = options.speed || 30;
        this.audioHook = options.audioHook || null;

        // ==========================================
        // REALITY AUDIT: Memory Leakage Fix (Cancellation Token)
        // Tracks the active typing session. If a user closes a terminal 
        // or clicks a new project, the session increments, instantly killing 
        // the old loop and preventing "Zombie Timers" from running in the background.
        // ==========================================
        this.currentSession = 0;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRandomChar() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    async typeString(htmlString) {
        this.currentSession++;
        const sessionId = this.currentSession;

        this.element.innerHTML = '';

        // Split string into HTML tags and raw text to prevent typing out "<span>" literally
        const parts = htmlString.split(/(<[^>]+>)/g);
        let displayBuffer = '';

        for (let i = 0; i < parts.length; i++) {
            if (this.currentSession !== sessionId) return;

            const part = parts[i];

            if (part.startsWith('<')) {
                // It's an HTML tag; append it instantly to the buffer
                displayBuffer += part;
                this.applyToDOM(displayBuffer);
            } else {
                // It's raw text; type it out character by character
                for (let j = 0; j < part.length; j++) {
                    if (this.currentSession !== sessionId) return;

                    const char = part[j];

                    // ==========================================
                    // SAFE IMPROV: The "Binary Flicker" Start
                    // Simulates decryption by flashing random ASCII characters 
                    // for 2 frames before locking in the actual letter.
                    // ==========================================
                    if (char !== ' ' && char !== '\n') {
                        for (let f = 0; f < 2; f++) {
                            this.applyToDOM(displayBuffer + this.getRandomChar());
                            await this.sleep(16); // ~1 monitor frame at 60fps
                            if (this.currentSession !== sessionId) return;
                        }
                    }

                    // Lock the actual character into the buffer
                    displayBuffer += char;
                    this.applyToDOM(displayBuffer);

                    // ==========================================
                    // SAFE IMPROV: Synchronized "Chirp" Audio Hook
                    // Emits a high-frequency blip per character.
                    // ==========================================
                    if (this.audioHook && char !== ' ' && char !== '\n') {
                        this.audioHook(char);
                    }

                    // ==========================================
                    // SAFE IMPROV: Dynamic "Hiccup" Pacing
                    // Non-linear typing speed mimics the uneven latency of a data stream.
                    // ==========================================
                    let delay = this.baseSpeed;
                    if (char === '.' || char === '?' || char === '!') {
                        delay += 300; // Long pause at sentence ends
                    } else if (char === ',') {
                        delay += 150; // Short pause at commas
                    } else {
                        // Micro-stutters for standard characters
                        delay += (Math.random() * 20 - 10);
                    }

                    await this.sleep(delay);
                }
            }
        }
    }

    // ==========================================
    // REALITY AUDIT: The "DOM Thrashing" Overflow Fix
    // Uses requestAnimationFrame to batch DOM updates. The browser only 
    // repaints the innerHTML when the screen is actually ready to draw a new frame, 
    // ensuring the WebGL canvas behind the UI stays locked at 60fps.
    // ==========================================
    applyToDOM(htmlContent) {
        requestAnimationFrame(() => {
            // Adds the classic blinking block cursor at the end of the active string
            this.element.innerHTML = htmlContent + '<span class="typewriter-cursor">_</span>';
        });
    }
}