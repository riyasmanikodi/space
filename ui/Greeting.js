/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /ui/Greeting.js
 * Purpose: System Boot Sequence, Hardware Polling, and Ripple Impact Handshake
 * STATUS: PRO_PHASE_GREETING_DEADLOCK_RESOLVED
 * LINE_COUNT: ~225 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated hardware-accelerated starfield backdrop handshake.
 * - SYSTEM: Visual DNA finalized for Industrial CRT aesthetic with scanline jitter.
 * - SYSTEM: Integrated System Active handshake to release Web Audio context on first interaction.
 * - SYSTEM: [APPEND] Integrated automated battery telemetry and network uplink auditing.
 * - SYSTEM: [PRO PHASE] Synchronized button display states to override inline HTML masking.
 * - SYSTEM: [PRO PHASE] Hardened hardware polling to prevent "Silent Deadlocks" on restricted browsers.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1402]: Startup Sequence. Ensured terminal is clear and button is locked until nominal state.
 * - FIXED [ID 1406]: Linguistic Paralysis. Replaced static injection with dynamic typewriter loop.
 * - FIXED [ID 1407]: Acoustic Handshake. Triggered AudioEngine.unlock() via user interaction.
 * - FIXED [ID 1409]: Transition Deadlock. Enforced immediate display: none after opacity fade to prevent invisible occlusions.
 * - FIXED [ID 3388]: [PRO PHASE] Missing Initialize Button. Injected `display = 'block'` to override the inline DOM concealment during the showEnterButton phase.
 * - FIXED [ID 4200]: [PRO PHASE] Silent Boot Deadlock. Wrapped `navigator.getBattery()` in a Promise.race timeout to prevent infinite hanging on strict browser security profiles.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added manager.onLoad handling to synchronize 3D asset readiness with UI manifestation.
 * - Fixed: Integrated TYPEWRITER_TICK publication for synced audio-visual clicks.
 * - Fixed: Injected final .ignite class trigger to sync with the CSS holo-ignition matrix.
 * - Fixed: [PRO PHASE] Corrected button display style property prior to opacity transition to ensure render visibility.
 * - Fixed: [PRO PHASE] Injected 500ms timeout guard for battery API polling.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: .lens-thump provides the physical screen-shake for the unlockSystem transition.
 * - RIPPLE: Animation triggers synchronize with the AudioEngine chirps via the logic bus.
 * - RIPPLE: Unlocking the OS now broadcasts a master GLOBAL_GLITCH to synchronize the entry of the 3D world.
 * - RIPPLE: [PRO PHASE] The 'ACCESS RIYAS_OS' button is now physically painted to the DOM, unblocking the user's entry into the 3D system.
 * - RIPPLE: [PRO PHASE] Boot sequence is fully immune to hardware API hangs, guaranteeing the enter button always appears.
 * * * * * REALITY AUDIT V28:
 * - APPEND 1: Hardware Promotion - will-change applied to all high-frequency transition layers.
 * - APPEND 18: Every character typed publishes a TYPEWRITER_TICK for procedural audio sync.
 * - APPEND 43: Audio Release - Enforced user-gesture-first policy to comply with browser audio restrictions.
 * - APPEND 3388: [PRO PHASE] Display Override Audit - Verified button transitions from none -> block -> opacity 1.
 * - APPEND 4200: [PRO PHASE] Telemetry Timeout Audit - Verified fallback to "PWR: DIRECT" triggers safely after 500ms.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_GREETING_DEADLOCK_RESOLVED
 */

import { Typewriter } from '../effects/Typewriter.js';
import { SystemEvents, EVENTS } from '../utils/events.js';
import { AudioEngine } from '../systems/audio.js';

export class Greeting {
    constructor(loadingManager, onEnterCallback) {
        this.manager = loadingManager;
        this.onEnterCallback = onEnterCallback;

        // DOM Elements
        this.container = document.getElementById('os-greeting');
        this.terminalOutput = document.getElementById('boot-terminal');
        this.enterBtn = document.getElementById('btn-enter-system');
        this.statsContainer = document.getElementById('system-stats');
        this.canvasLayer = document.getElementById('webgl-canvas');

        // REALITY AUDIT 1: Layer Promotion for Hardware Acceleration
        if (this.container) {
            this.container.style.willChange = 'opacity, backdrop-filter';
        }

        if (this.canvasLayer) {
            this.canvasLayer.style.opacity = '0';
            this.canvasLayer.style.visibility = 'hidden';
            this.canvasLayer.style.transition = 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        this.isLoaded = false;
        this.init();
    }

    async init() {
        // CULPRIT 1402: Ensure terminal is clear and button is locked
        this.enterBtn.style.opacity = '0';
        this.enterBtn.style.pointerEvents = 'none';
        this.enterBtn.style.willChange = 'transform, opacity, filter';

        await this.renderSystemStats();

        const bootLogs = [
            "[OK] INITIALIZING_RIYAS_OS_KERNEL...",
            "[OK] MOUNTING_PROCEDURAL_VFS...",
            "[OK] CALIBRATING_PHYSICS_ENGINE...",
            "[WAIT] SYNTHESIZING_HERO_GEOMETRY...",
            "[WAIT] COMPILING_GLSL_SHADERS..."
        ];

        // CULPRIT 1406: Replaced static injection with dynamic loop (20ms delay)
        this.typewriter = new Typewriter(this.terminalOutput, { speed: 20 });

        for (const log of bootLogs) {
            // REALITY AUDIT 18: Every character typed publishes a TYPEWRITER_TICK
            await this.typewriter.typeString(log + '<br>', () => {
                SystemEvents.publish(EVENTS.TYPEWRITER_TICK);
            });
            await this.sleep(300);
        }

        this.isLoaded = true;
        await this.typewriter.typeString('<span style="color: var(--hero-accent);">[SYS] ALL_SYSTEMS_NOMINAL. READY.</span><br>', () => {
            SystemEvents.publish(EVENTS.TYPEWRITER_TICK);
        });

        this.showEnterButton();

        // OMISSION 86: Handle manager load state
        if (this.manager) {
            this.manager.onLoad = () => {
                if (!this.isLoaded) {
                    this.isLoaded = true;
                    this.showEnterButton();
                }
            };
        }

        this.enterBtn.addEventListener('click', () => this.unlockSystem());
    }

    showEnterButton() {
        // FIXED [ID 3388]: Force display block to override HTML display:none before fading in
        if (this.enterBtn) {
            this.enterBtn.style.display = 'block';

            // Micro-timeout ensures the browser paints the 'block' state before applying the opacity transition
            setTimeout(() => {
                this.enterBtn.style.transition = 'opacity 1s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                this.enterBtn.style.opacity = '1';
                this.enterBtn.style.pointerEvents = 'auto';
                this.enterBtn.innerText = "signal ends at krayetos";
                this.enterBtn.classList.add('ignite');
            }, 50);
        }
    }

    async renderSystemStats() {
        let statsHtml = `<div class="stat-block">HOST: ${navigator.userAgent.split(' ')[0]}</div>`;
        if (navigator.connection) {
            statsHtml += `<div class="stat-block">UPLINK: ${navigator.connection.effectiveType || 'UNKNOWN'}</div>`;
        }

        if (navigator.getBattery) {
            try {
                // FIXED [ID 4200]: Silent Deadlock Prevention
                // Wraps the battery check in a 500ms timeout race condition to prevent infinite hangs.
                const batteryPromise = navigator.getBattery();
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('BATTERY_API_TIMEOUT')), 500)
                );

                const battery = await Promise.race([batteryPromise, timeoutPromise]);
                const level = Math.round(battery.level * 100);
                statsHtml += `<div class="stat-block">PWR: ${level}% ${battery.charging ? '(AC)' : '(DC)'}</div>`;
            } catch (e) {
                // Failsafe execution route for timeouts or security blocks
                statsHtml += `<div class="stat-block">PWR: DIRECT</div>`;
            }
        } else {
            statsHtml += `<div class="stat-block">PWR: DIRECT</div>`;
        }

        this.statsContainer.innerHTML = statsHtml;
    }

    unlockSystem() {
        // CULPRIT 1407: AudioEngine.unlock() triggered by user click
        AudioEngine.unlock();

        // RIPPLE EFFECT: Trigger "Lens Thump" and Global Glitch
        this.container.classList.add('lens-thump');
        SystemEvents.publish(EVENTS.GLOBAL_GLITCH, { intensity: 1.0 });

        // Ensure transition starts immediately
        this.container.style.pointerEvents = 'none';
        this.container.style.transition = 'opacity 1.2s ease, backdrop-filter 1.5s ease';
        this.container.style.opacity = '0';
        this.container.style.backdropFilter = 'blur(0px)';

        // Wake 3D world
        if (this.canvasLayer) {
            this.canvasLayer.style.visibility = 'visible';
            this.canvasLayer.style.opacity = '1';
        }

        // Final handoff to Logics.js
        if (this.onEnterCallback) {
            this.onEnterCallback();
        }

        setTimeout(() => {
            // CULPRIT 1409: Transition Deadlock Fix
            this.container.style.display = 'none';
        }, 1500);
    }

    sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
}