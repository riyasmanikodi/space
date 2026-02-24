/**
 * RIYAS_OS V28 - RIPPLE 2
 * File: /systems/audio.js
 * Purpose: Procedural Web Audio API synthesizer, Binaural Spatialization, and Voice Limiting
 */

class AudioSynthesizer {
    constructor() {
        // Core Web Audio API Context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        // ==========================================
        // SAFE IMPROV: Dynamic Low-Pass Sector Shifting
        // A global filter that muffles sound near the BLACK HOLE 
        // and opens up for crystalline clicks near the TECH hub.
        // ==========================================
        this.globalFilter = this.ctx.createBiquadFilter();
        this.globalFilter.type = 'lowpass';
        this.globalFilter.frequency.value = 20000; // Open by default
        this.globalFilter.connect(this.ctx.destination);

        // ==========================================
        // SAFE IMPROV: Binaural Spatialization
        // Pans the deep space hum and UI clicks based on camera/planet positions.
        // ==========================================
        this.panner = this.ctx.createStereoPanner();
        this.panner.connect(this.globalFilter);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.5;
        this.masterGain.connect(this.panner);

        this.unlocked = false;

        // ==========================================
        // REALITY AUDIT: Oscillator Overload (Voice Limiter)
        // Keeps a strict limit on concurrent sounds to prevent CPU crackle 
        // and audio clipping on lower-end devices.
        // ==========================================
        this.activeVoices = [];
        this.MAX_VOICES = 3;

        this.bgmOscillator = null;
    }

    // ==========================================
    // REALITY AUDIT: The "Autoplay Policy" Silence Fix
    // Browsers block audio until interaction. This method is called on the 
    // first "Waking Systems" click to seamlessly resume the AudioContext.
    // ==========================================
    unlock() {
        if (this.unlocked) return;

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        // Play a silent buffer to officially unlock iOS/Safari audio
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);

        this.unlocked = true;
        this.startSystemHum();
    }

    // ==========================================
    // SAFE IMPROV: Synthesis Hook-ups
    // Generates UI clicks, risers, and drops using pure math frequencies.
    // ==========================================
    playTone(startFreq, endFreq, duration = 0.1, type = 'sine') {
        if (!this.unlocked) return;

        // Enforce Voice Limit
        if (this.activeVoices.length >= this.MAX_VOICES) {
            const oldestVoice = this.activeVoices.shift();
            oldestVoice.stop();
            oldestVoice.disconnect();
        }

        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = type;

        // Pitch envelope
        osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + duration);

        // Amplitude envelope (prevent clicking)
        gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);

        this.activeVoices.push(osc);

        // Cleanup
        osc.onended = () => {
            this.activeVoices = this.activeVoices.filter(v => v !== osc);
            gainNode.disconnect();
        };
    }

    startSystemHum() {
        if (this.bgmOscillator) return;

        this.bgmOscillator = this.ctx.createOscillator();
        const bgmGain = this.ctx.createGain();

        this.bgmOscillator.type = 'triangle';
        this.bgmOscillator.frequency.value = 55; // Low atmospheric drone

        bgmGain.gain.value = 0.05;

        this.bgmOscillator.connect(bgmGain);
        bgmGain.connect(this.masterGain);

        this.bgmOscillator.start();
    }

    updateAtmosphere(sectorType, panValue) {
        if (!this.unlocked) return;

        // Shift pan based on horizontal orbit
        this.panner.pan.setTargetAtTime(panValue, this.ctx.currentTime, 0.1);

        // Shift filter based on sector
        const targetFreq = sectorType === 'CODE' ? 800 : 20000;
        this.globalFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.5);
    }
}

export const AudioEngine = new AudioSynthesizer();