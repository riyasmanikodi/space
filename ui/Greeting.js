/**
 * RIYAS_OS V28 - RIPPLE 4
 * File: /ui/Greeting.js
 * Purpose: System Boot Sequence, Canvas Masking, Hardware Polling, and Deadlock Bypass
 */

import { Typewriter } from '../effects/Typewriter.js';

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

        if (this.canvasLayer) {
            this.canvasLayer.style.opacity = '0';
            this.canvasLayer.style.visibility = 'hidden';
            this.canvasLayer.style.transition = 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        this.isLoaded = false;
        this.init();
    }

    async init() {
        // Hide button initially
        this.enterBtn.style.opacity = '0';
        this.enterBtn.style.pointerEvents = 'none';

        await this.renderSystemStats();

        const bootLogs = [
            "[OK] INITIALIZING_RIYAS_OS_KERNEL...",
            "[OK] MOUNTING_PROCEDURAL_VFS...",
            "[OK] CALIBRATING_PHYSICS_ENGINE...",
            "[WAIT] SYNTHESIZING_HERO_GEOMETRY...",
            "[WAIT] COMPILING_GLSL_SHADERS..."
        ];

        this.typewriter = new Typewriter(this.terminalOutput, { speed: 40 });

        for (const log of bootLogs) {
            await this.typewriter.typeString(log + '<br>');
            await this.sleep(300);
        }

        // ==========================================
        // CRITICAL FIX: The Deadlock Bypass
        // Since we aren't downloading heavy 3D assets, we force the 
        // system to "Ready" status immediately after the logs finish.
        // ==========================================
        this.isLoaded = true;
        this.typewriter.typeString('<span style="color: #00ffff;">[SYS] ALL_SYSTEMS_NOMINAL. READY.</span><br>');
        this.showEnterButton();

        // Still keep the manager listener as a secondary backup
        this.manager.onLoad = () => {
            if (!this.isLoaded) {
                this.isLoaded = true;
                this.showEnterButton();
            }
        };

        this.enterBtn.addEventListener('click', () => this.unlockSystem());
    }

    showEnterButton() {
        this.enterBtn.style.transition = 'opacity 1s ease';
        this.enterBtn.style.opacity = '1';
        this.enterBtn.style.pointerEvents = 'auto';
        this.enterBtn.innerText = "ACCESS RIYAS_OS";
    }

    async renderSystemStats() {
        let statsHtml = `<div class="stat-block">HOST: ${navigator.userAgent.split(' ')[0]}</div>`;

        if (navigator.connection) {
            statsHtml += `<div class="stat-block">UPLINK: ${navigator.connection.effectiveType || 'UNKNOWN'}</div>`;
        }

        if (navigator.getBattery) {
            try {
                const battery = await navigator.getBattery();
                const level = Math.round(battery.level * 100);
                statsHtml += `<div class="stat-block">PWR: ${level}% ${battery.charging ? '(AC)' : '(DC)'}</div>`;
            } catch (e) {
                statsHtml += `<div class="stat-block">PWR: DIRECT</div>`;
            }
        }

        this.statsContainer.innerHTML = statsHtml;
    }

    unlockSystem() {
        if (this.onEnterCallback) this.onEnterCallback();

        this.container.style.pointerEvents = 'none';
        this.container.style.transition = 'opacity 1.2s ease, backdrop-filter 1.5s ease';
        this.container.style.opacity = '0';
        this.container.style.backdropFilter = 'blur(0px)';

        if (this.canvasLayer) {
            this.canvasLayer.style.visibility = 'visible';
            this.canvasLayer.style.opacity = '1';
        }

        setTimeout(() => {
            this.container.style.display = 'none';
        }, 1500);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}