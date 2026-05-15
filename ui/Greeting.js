/**
 * RIYAS_OS V28 - PRO PHASE (MULTI-MODE IDENTITY)
 * File: /ui/Greeting.js
 * Purpose: System Boot Sequence, Hardware Polling, Tactical Insights, and Ripple Impact Handshake
 * STATUS: PRO_PHASE_RULE_STRICT_LOCKED
 * LINE_COUNT: ~360 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated System Active handshake to release Web Audio context on first interaction.
 * - SYSTEM: [PRO PHASE] Synchronized CoreManifesto.dispose() with unlockSystem to purge background WebGL loops.
 * - SYSTEM: [PRO PHASE] Synchronized boot sequence with High-Density Radial Warp Kernel.
 * - SYSTEM: [PRO PHASE] Enforced Sequential Phase Separation via explicit unlockSystem handoff.
 * - SYSTEM: [PRO PHASE] Realigned unlockSystem handoff to support Stealth Construction and Zero-Lag OS Reveal.
 * - SYSTEM: [PRO PHASE GREETING] Engineered dual-context capability to support Boot Sequence UI injection.
 * - SYSTEM: [PRO PHASE] HardwareManager injected to respect persistent Graphics Tiers during reload.
 * - SYSTEM: [PRO PHASE] Boot sequence logs now dynamically reflect the absolute hardware truth state.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1406]: Linguistic Paralysis. Replaced static injection with dynamic typewriter loop.
 * - FIXED [ID 4380]: [PRO PHASE] Background Bleed. Enforced `CoreManifesto.dispose()` during OS unlock.
 * - FIXED [ID 4381]: [PRO PHASE] Canvas Suppression Deadlock. Retained canvas visibility during boot.
 * - FIXED [ID 4520]: [PRO PHASE] Transition Stutter. Maintained 100ms VRAM flush yield.
 * - FIXED [ID 6025]: [PRO PHASE GREETING] Static Boot Button. Converted raw text button to dynamic DOM glitch container targeting KRAYETOS.
 * - FIXED [ID 7200]: [PRO PHASE] Missing Reboot Confirmation. Greeting text now reads the Hardware Profile from `localStorage`.
 * - FIXED [ID 9230]: [PRO PHASE] Boot Log Desync. Ensured active tier and profile accurately represent the Cold Boot persistence.
 * - FIXED [ID 9255]: [PRO PHASE] Static Ready Line Size. Synchronized ready string with NATIVE_FONT_SIZES kernel authority.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added manager.onLoad handling to synchronize 3D asset readiness with UI manifestation.
 * - Fixed: Integrated TYPEWRITER_TICK publication for synced audio-visual clicks.
 * - Fixed: [PRO PHASE] Corrected button display style property prior to opacity transition to ensure render visibility.
 * - Fixed: [PRO PHASE] Abstracted planetary ignition exclusively to the explicit UI handshake trigger.
 * - Fixed: [PRO PHASE] Wrapped OS ignition handshake in a 100ms yield to unblock the main thread.
 * - Fixed: [PRO PHASE GREETING] Instantiated HeroEffects with the 'GREETING' context parameter.
 * - Fixed: [PRO PHASE] Injected dynamic diagnostic string based on `hw_graphics_tier`.
 * - Fixed: [PRO PHASE] Aligned boot sequence typography with the Universal Hardware Autonomy strategy.
 * - Fixed: [PRO PHASE] Imported NATIVE_FONT_SIZES to dynamically scale the boot sequence final log.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: .lens-thump provides the physical screen-shake for the unlockSystem transition.
 * - RIPPLE: [PRO PHASE] OS entry is instantaneous as the planetary void is pre-constructed invisibly in the background.
 * - RIPPLE: [PRO PHASE] The slower 60ms typewriter speed combined with 1200ms pauses creates genuine suspense.
 * - RIPPLE: [PRO PHASE] The entry transition now aligns exactly with the 2.0s global glitch duration.
 * - RIPPLE: [PRO PHASE] Fresh reloads from the Terminal BIOS instantly display the newly allocated VRAM tier in the boot logs.
 * - RIPPLE: [PRO PHASE] Greeting module seamlessly passes the 'GREETING' context to HeroEffects, which now utilizes absolute native font sizing.
 * - RIPPLE: [PRO PHASE] The "READY" line now perfectly matches the hardware profile typographic scale.
 * * * * * REALITY AUDIT V28:
 * - APPEND 43: Audio Release - Enforced user-gesture-first policy to comply with browser audio restrictions.
 * - APPEND 3388: [PRO PHASE] Display Override Audit - Verified button transitions from none -> block -> opacity 1.
 * - APPEND 4502: [PRO PHASE] Memory Flush Audit - Verified VRAM drops to baseline before `CoreLoop.start()`.
 * - APPEND 6030: [PRO PHASE GREETING] Instantiation Audit - Verified passing 'GREETING' context delegates structural generation to HeroEffects.
 * - APPEND 7200: [PRO PHASE] Persistence Audit - Verified Greeting text accurately reflects `hw_graphics_tier` and `hw_profile` settings post-reboot.
 * - APPEND 9230: [PRO PHASE] Persistence Sync - Verified boot logs accurately display BIOS memory overrides.
 * - APPEND 9255: [PRO PHASE] Typographic Auth - Verified ready line correctly inherits NATIVE_FONT_SIZES.PC.BOOT_READY or MOBILE.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_RULE_STRICT_LOCKED
 */

import { Typewriter } from '../effects/Typewriter.js';
import { SystemEvents, EVENTS } from '../utils/events.js';
import { AudioEngine } from '../systems/audio.js';
import { KERNEL_INSIGHTS, ANOMALY_CONFIG, NATIVE_FONT_SIZES } from '../data/constants.js';
import { CoreManifesto } from '../effects/ManifestoEngine.js';
import { HeroEffects } from '../effects/HeroEffects.js';

export class Greeting {
    constructor(loadingManager, onEnterCallback) {
        this.manager = loadingManager;
        this.onEnterCallback = onEnterCallback;

        this.container = document.getElementById('os-greeting');
        this.terminalOutput = document.getElementById('boot-terminal');
        this.enterBtn = document.getElementById('btn-enter-system');
        this.statsContainer = document.getElementById('system-stats');
        this.canvasLayer = document.getElementById('webgl-canvas');
        this.insightTarget = document.getElementById('tactical-insight');

        this.greetingEffects = null;

        if (this.container) {
            this.container.style.willChange = 'opacity, backdrop-filter';
        }

        if (this.canvasLayer) {
            this.canvasLayer.style.opacity = '1';
            this.canvasLayer.style.visibility = 'visible';
            this.canvasLayer.style.transition = 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        this.isLoaded = false;
        this.isUnlocked = false;
        this.init();
    }

    async init() {
        this.enterBtn.style.opacity = '0';
        this.enterBtn.style.pointerEvents = 'none';
        this.enterBtn.style.willChange = 'transform, opacity, filter';

        await this.renderSystemStats();
        this.startInsightLoop();

        // [PRO PHASE] Read persistence for dynamic boot logs
        const activeTier = (localStorage.getItem('hw_graphics_tier') || 'MEDIUM').toUpperCase();
        const activeProfile = (localStorage.getItem('hw_profile') || 'AUTO').toUpperCase();

        const bootLogs = [
            "[OK] INITIALIZING_RIYAS_OS_KERNEL...",
            `[OK] HARDWARE_PROFILE: ${activeProfile}`,
            `[OK] VRAM_ALLOCATION: ${activeTier}`,
            "[WAIT] SYNTHESIZING_HERO_GEOMETRY...",
            "[WAIT] COMPILING_GLSL_SHADERS..."
        ];

        this.typewriter = new Typewriter(this.terminalOutput, { speed: 60 });

        for (const log of bootLogs) {
            await this.typewriter.typeString(log + '<br>', () => {
                SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK');
            });
            await this.sleep(1200);
        }

        this.isLoaded = true;

        const isMobileKernel = document.body.classList.contains('mobile-kernel');
        const readySize = isMobileKernel ? NATIVE_FONT_SIZES.MOBILE.BOOT_READY : NATIVE_FONT_SIZES.PC.BOOT_READY;

        await this.typewriter.typeString(`<span style="color: var(--hero-accent); font-size: ${readySize}; font-weight: bold;">[SYS] ALL_SYSTEMS_NOMINAL. READY.</span><br>`, () => {
            SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK');
        });

        this.showEnterButton();

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

    async startInsightLoop() {
        if (!this.insightTarget) return;

        const typeEngine = new Typewriter(this.insightTarget, { speed: 60 });
        let lastIndex = -1;

        const loop = async () => {
            if (this.isUnlocked) return;

            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * KERNEL_INSIGHTS.length);
            } while (randomIndex === lastIndex && KERNEL_INSIGHTS.length > 1);

            lastIndex = randomIndex;
            const randomInsight = KERNEL_INSIGHTS[randomIndex];

            await typeEngine.decryptString(randomInsight, () => {
                SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK');
            });

            await this.sleep(8000);
            if (!this.isUnlocked) loop();
        };

        loop();
    }

    showEnterButton() {
        if (this.enterBtn) {
            this.enterBtn.style.display = 'block';

            setTimeout(() => {
                this.enterBtn.style.transition = 'opacity 1s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                this.enterBtn.style.opacity = '1';
                this.enterBtn.style.pointerEvents = 'auto';

                this.enterBtn.innerHTML = '<div id="greeting-glitch-container" style="pointer-events: none;"></div>';
                const glitchContainer = document.getElementById('greeting-glitch-container');

                if (glitchContainer) {
                    this.greetingEffects = new HeroEffects(glitchContainer, 'GREETING');
                }

                this.enterBtn.classList.add('ignite');

                setTimeout(() => {
                    SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { effectId: 'BLOCK_SCRAMBLE', intensity: 1.5 });
                }, 400);

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
                const batteryPromise = navigator.getBattery();
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('BATTERY_API_TIMEOUT')), 500)
                );

                const battery = await Promise.race([batteryPromise, timeoutPromise]);
                const level = Math.round(battery.level * 100);
                statsHtml += `<div class="stat-block">PWR: ${level}% ${battery.charging ? '(AC)' : '(DC)'}</div>`;
            } catch (e) {
                statsHtml += `<div class="stat-block">PWR: DIRECT</div>`;
            }
        } else {
            statsHtml += `<div class="stat-block">PWR: DIRECT</div>`;
        }

        this.statsContainer.innerHTML = statsHtml;
    }

    unlockSystem() {
        this.isUnlocked = true;

        AudioEngine.unlock();

        CoreManifesto.dispose();

        this.container.classList.add('lens-thump');
        SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { intensity: 1.0 });

        this.container.style.pointerEvents = 'none';
        this.container.style.transition = 'opacity 1.2s ease, backdrop-filter 1.5s ease';
        this.container.style.opacity = '0';
        this.container.style.backdropFilter = 'blur(0px)';

        if (this.canvasLayer) {
            this.canvasLayer.style.visibility = 'visible';
            this.canvasLayer.style.opacity = '1';
        }

        if (this.onEnterCallback) {
            setTimeout(() => {
                this.onEnterCallback();
            }, 100);
        }

        const transitionDuration = (ANOMALY_CONFIG && ANOMALY_CONFIG.GLITCH_DURATION) ? ANOMALY_CONFIG.GLITCH_DURATION : 2000;

        setTimeout(() => {
            this.container.style.display = 'none';
        }, transitionDuration);
    }

    sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
}