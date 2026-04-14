/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /ui/Terminal.js
 * Purpose: Draggable Kraye Logs, BIOS Hardware Menu, ASCII Game Engine, and Instant Input Engagement
 * STATUS: PRO_PHASE_FOCUS_AUTHORITY_LOCKED
 * LINE_COUNT: ~505 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated Command Kernel handshake for real-time theme and physics overrides.
 * - SYSTEM: Visual DNA updated to support Industrial CRT flicker on the command input buffer.
 * - SYSTEM: [PRO PHASE KRAYE] Integrated Command History Buffer (Up/Down navigation) into the input kernel.
 * - SYSTEM: [PRO PHASE] HardwareManager injected to support BIOS-style radio button rendering.
 * - SYSTEM: [PRO PHASE] `kraye.game` command routing linked to the ASCII Defragmenter renderer.
 * - SYSTEM: [PRO PHASE] Implemented Game Lifecycle Manager for Visibility Handshaking.
 * - SYSTEM: [PRO PHASE] Integrated Instant Input Engagement protocol for zero-click CLI interaction.
 * - SYSTEM: [PRO PHASE] Enforced Kernel-Level Handshake for native font sizing via .mobile-kernel and .pc-kernel body classes.
 * - SYSTEM: [PRO PHASE] Integrated Terminal Window State (Maximize/Minimize) Authority.
 * - SYSTEM: [PRO PHASE] Wired GAME_STOP_REQUESTED to explicitly terminate game and purge DOM.
 * - SYSTEM: [PRO PHASE] Refined focus authority to prevent invisible keyboard ghosting on mobile.
 * - SYSTEM: [PRO PHASE] Hardened Terminal DOM presence to explicitly relinquish interaction authority when inactive.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 1410]: Input Focus Hijacking. Enforced focus isolation to prevent CLI typing from triggering accidental orbital drags.
 * - FIXED [ID 1415]: Terminal Persistence. Added explicit close listener and pointer-event overrides.
 * - FIXED [ID 6130]: [PRO PHASE KRAYE] Command Amnesia. Implemented history array and arrow-key traversal.
 * - FIXED [ID 8300]: [PRO PHASE] Focus Hijack. Clicking outside the terminal caused arrow keys to fail. Fixed via global click listener.
 * - FIXED [ID 8400]: [PRO PHASE] Manual Click Required. Opening the terminal required a manual click to focus the command line. Fixed via automated focus handshake in show().
 * - FIXED [ID 9205]: [PRO PHASE] Locked Fonts. Resolved desync between pending BIOS changes and physical page reloads by clearing pending keys and injecting native classes.
 * - FIXED [ID 9310]: [PRO PHASE] Window Constraints. Added maximize toggle to bypass fixed terminal bounds during Tetris execution.
 * - FIXED [ID 9350]: [PRO PHASE] Zombie DOM Nodes. Enhanced terminateGame() to physically remove #kraye-game-renderer from the layout.
 * - FIXED [ID 9370]: [PRO PHASE] Mobile Keyboard Ghosting. Removed inline pointer-events override that was hijacking screen touches while the terminal was invisible.
 * - FIXED [ID 9430]: [PRO PHASE] Focus Hijack. Restricted global click-to-focus logic to only trigger when the .visible class is active.
 * - FIXED [ID 9435]: [PRO PHASE] Kinetic Shift. Removed automated scrollIntoView behavior to prevent viewport jumping during tap sequences.
 * - FIXED [ID 9445]: [PRO PHASE] Interaction Bleed. Constrained the focus recovery handshake specifically to the #terminal-input-wrapper to prevent screen-wide invisible click capture on mobile.
 * - FIXED [ID 9485]: [PRO PHASE] Invisible Interaction Shield. Enforced strict pointer-event removal in hide() to ensure mobile taps reach the Hero Name viewport.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added support for character-by-character typewriter manifestations for system responses.
 * - Fixed: [PRO PHASE] Handled `ADMIN_ACCESS_GRANTED` event to auto-mount the Hardware Configuration menu.
 * - Fixed: [PRO PHASE] Mapped the backtick (`) to act as a hardware kill-switch for active game states.
 * - Fixed: [PRO PHASE] Appended focus recovery handshake in `init()` to automatically reclaim `document.activeElement`.
 * - Fixed: [PRO PHASE] Injected `this.input.focus()` into the visibility toggle to enable immediate typing on manifest.
 * - Fixed: [PRO PHASE] Radio buttons now explicitly poll localStorage directly to represent the hard-locked memory state.
 * - Fixed: [PRO PHASE] Injected double-click listener on terminal header for instant maximization.
 * - Fixed: [PRO PHASE] Halted drag physics when `.maximized` class is active.
 * - Fixed: [PRO PHASE] Subscribed to GAME_STOP_REQUESTED to handle external halt commands.
 * - Fixed: [PRO PHASE] Added `this.el.classList.contains('visible')` guard to the focus listener.
 * - Fixed: [PRO PHASE] Bound `inputWrapper.addEventListener('click')` instead of `this.el`.
 * - Fixed: [PRO PHASE] Explicitly toggled pointer-events in show() and hide() to reinforce CSS-level display overrides.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Terminal inputs now broadcast high-intensity GLOBAL_GLITCH events to simulate hardware "power draws".
 * - RIPPLE: [PRO PHASE] Selecting a hardware radio button physically commits the choice to `localStorage` and triggers a hard reboot.
 * - RIPPLE: [PRO PHASE] Clicking the terminal during an active game immediately restores keyboard input authority.
 * - RIPPLE: [PRO PHASE] Opening the terminal via hotkey or UI trigger now immediately grants keyboard control to the user without clicks.
 * - RIPPLE: [PRO PHASE] Committing a BIOS change immediately alters the body class, snapping native typography before the browser reloads.
 * - RIPPLE: [PRO PHASE] Double-clicking the header triggers full-screen OS takeover for immersive gaming.
 * - RIPPLE: [PRO PHASE] Stopping the game now cleanly frees up terminal scroll space and removes the canvas layer entirely.
 * - RIPPLE: [PRO PHASE] Virtual keyboard now only manifests when the terminal is visually active, unblocking hero identity interactions.
 * - RIPPLE: [PRO PHASE] Terminal window no longer intercepts touches on mobile devices when it is hidden or overlapping other interactive elements.
 * - RIPPLE: [PRO PHASE] Terminal completely vanishes from the interaction stack when closed, restoring 8-tap gateway access on mobile hardware.
 * * * * * REALITY AUDIT V28:
 * - APPEND 31: Layer Isolation - Input field promoted to a hardware-accelerated layer.
 * - APPEND 815: [PRO PHASE] Game Loop Sync - Verified `requestAnimationFrame` pulls data from `KrayeGame`.
 * - APPEND 840: [PRO PHASE] Focus Handshake - Verified that 100ms delay in show() accounts for CSS transition visibility latency.
 * - APPEND 920: BIOS State Integrity - Verified BIOS menu accurately reflects actual memory rather than transient system state.
 * - APPEND 9310: [PRO PHASE] Window State Audit - Verified `.maximized` class successfully escapes dragging physics and bounds constraints.
 * - APPEND 9350: [PRO PHASE] DOM Purge Audit - Verified terminateGame safely destroys the renderer container.
 * - APPEND 9430: [PRO PHASE] Focus Authority Audit - Verified click listener ignores inputs when visibility class is null.
 * - APPEND 9445: [PRO PHASE] Touch Bleed Audit - Verified that touches on `.terminal-content` or `.terminal-header` do not arbitrarily trigger the mobile keyboard.
 * - APPEND 9485: [PRO PHASE] Interaction Shield Audit - Confirmed terminal hide() perfectly unblocks underlying 3D and UI layers.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_FOCUS_AUTHORITY_LOCKED
 */

import { SystemEvents, EVENTS } from '../utils/events.js';
import { KrayeGame } from '../systems/KrayeGame.js';

export class Terminal {
    constructor(terminalId, headerId, contentId, inputId = null, hardwareManager = null) {
        this.el = document.getElementById(terminalId);
        this.header = document.getElementById(headerId);
        this.content = document.getElementById(contentId);
        this.input = inputId ? document.getElementById(inputId) : null;
        this.hardwareManager = hardwareManager;

        this.isDragging = false;
        this.pos = { x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 150 };
        this.vel = { x: 0, y: 0 };
        this.lastMouse = { x: 0, y: 0 };
        this.bounds = { w: 400, h: 300 };

        this.commandHistory = [];
        this.historyIndex = -1;

        this.gameInstance = null;
        this.gameRenderLoop = null;

        this.animationFrame = null;
        this.init();
    }

    init() {
        if (!this.el || !this.header) return;

        const isMobileProfile = this.hardwareManager && this.hardwareManager.getIsMobileHardware();

        if (isMobileProfile) {
            this.el.classList.add('force-mobile-view');
            this.pos = { x: 0, y: 0 };
            this.el.style.transform = `translate(0px, 0px)`;
        } else {
            this.el.classList.remove('force-mobile-view');
            this.el.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
        }

        // CULPRIT [ID 9370] FIXED: Removed this.el.style.pointerEvents = 'auto';
        this.content.style.willChange = 'scroll-position';
        this.el.style.willChange = 'transform';

        const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        if (isMobile) {
            this.el.style.backdropFilter = 'none';
            this.el.style.backgroundColor = 'rgba(5, 5, 10, 0.95)';
        }

        this.header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('terminal-close')) return;
            this.onDragStart(e);
        });
        this.header.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('terminal-close')) return;
            this.onDragStart(e);
        }, { passive: false });

        // [PRO PHASE] Window State Toggle (Maximize)
        this.header.addEventListener('dblclick', (e) => {
            if (e.target.classList.contains('terminal-close')) return;
            this.el.classList.toggle('maximized');
            this.el.classList.remove('minimized');

            SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { effectId: 'CHROMATIC_SPLIT', intensity: 0.8 });
            window.dispatchEvent(new Event('resize'));
        });

        window.addEventListener('mousemove', this.onDragMove.bind(this));
        window.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });

        window.addEventListener('mouseup', this.onDragEnd.bind(this));
        window.addEventListener('touchend', this.onDragEnd.bind(this));

        const closeBtn = this.header.querySelector('.terminal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleClose();
            });
        }

        if (this.input) {
            this.input.addEventListener('focus', () => SystemEvents.publish(EVENTS.UI_FOCUSED, true));
            this.input.addEventListener('blur', () => SystemEvents.publish(EVENTS.UI_FOCUSED, false));
            this.input.addEventListener('keydown', (e) => this.handleInput(e));
        }

        // [PRO PHASE FIX] Universal Focus Recovery Handshake - REFINED
        const inputWrapper = document.getElementById('terminal-input-wrapper');
        if (inputWrapper) {
            inputWrapper.addEventListener('click', (e) => {
                // CULPRIT [ID 9445] FIXED: Bound focus specifically to the input area to stop full-screen touch hijack
                if (this.el.classList.contains('visible') && this.input && document.activeElement !== this.input) {
                    this.input.focus();

                    if (this.gameInstance && this.gameInstance.state.isActive) {
                        this.printLine('KERNEL_INPUT_RESTORED.', '#00ff00');
                    }
                }
            });
        }

        SystemEvents.subscribe('ADMIN_ACCESS_GRANTED', () => {
            this.show();
            this.renderConfigMenu();
        });

        // [PRO PHASE] Game Lifecycle Handshake
        SystemEvents.subscribe('GAME_STOP_REQUESTED', () => {
            if (this.gameInstance) {
                this.terminateGame();
            }
        });

        this.updatePhysics();
    }

    onDragStart(e) {
        if (this.el.classList.contains('force-mobile-view') || this.el.classList.contains('maximized')) return;

        this.isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        this.lastMouse = { x: clientX, y: clientY };
        this.vel = { x: 0, y: 0 };

        document.body.style.userSelect = 'none';
        SystemEvents.publish(EVENTS.UI_FOCUSED, true);

        const canvas = document.getElementById('webgl-canvas');
        if (canvas) canvas.style.pointerEvents = 'none';
    }

    onDragMove(e) {
        if (!this.isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const dx = clientX - this.lastMouse.x;
        const dy = clientY - this.lastMouse.y;

        this.pos.x += dx;
        this.pos.y += dy;

        this.vel.x = dx * 0.5;
        this.vel.y = dy * 0.5;

        this.lastMouse = { x: clientX, y: clientY };
    }

    onDragEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;

        document.body.style.userSelect = 'auto';
        SystemEvents.publish(EVENTS.UI_FOCUSED, false);

        const canvas = document.getElementById('webgl-canvas');
        if (canvas) canvas.style.pointerEvents = 'auto';
    }

    updatePhysics() {
        if (!this.el.classList.contains('force-mobile-view') && !this.el.classList.contains('maximized')) {
            if (!this.isDragging) {
                this.vel.x *= 0.9;
                this.vel.y *= 0.9;

                this.pos.x += this.vel.x;
                this.pos.y += this.vel.y;

                const maxX = window.innerWidth - this.bounds.w;
                const maxY = window.innerHeight - this.bounds.h;

                if (this.pos.x <= 0) { this.pos.x = 0; this.vel.x *= -0.5; }
                if (this.pos.x >= maxX) { this.pos.x = maxX; this.vel.x *= -0.5; }
                if (this.pos.y <= 0) { this.pos.y = 0; this.vel.y *= -0.5; }
                if (this.pos.y >= maxY) { this.pos.y = maxY; this.vel.y *= -0.5; }
            }

            if (Math.abs(this.vel.x) > 0.1 || Math.abs(this.vel.y) > 0.1 || this.isDragging) {
                this.el.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
            }
        }

        this.animationFrame = requestAnimationFrame(this.updatePhysics.bind(this));
    }

    async printLine(text, color = null) {
        const line = document.createElement('div');
        if (color) line.style.color = color;
        this.content.appendChild(line);

        for (let i = 0; i < text.length; i++) {
            line.innerHTML += text[i];
            SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK');
            await new Promise(res => setTimeout(res, 10));
        }
        this.content.scrollTop = this.content.scrollHeight;
    }

    handleInput(e) {
        // [PRO PHASE] Immediate Game Interception Loop
        if (this.gameInstance && this.gameInstance.state.isActive && !this.gameInstance.state.isPaused) {
            e.stopPropagation();
            e.preventDefault();
            if (e.key === 'ArrowLeft') this.gameInstance.move(-1, 0);
            else if (e.key === 'ArrowRight') this.gameInstance.move(1, 0);
            else if (e.key === 'ArrowUp') this.gameInstance.rotate();
            else if (e.key === 'ArrowDown') this.gameInstance.move(0, 1);
            else if (e.key === ' ') this.gameInstance.hardDrop();
            else if (e.key === '`') this.terminateGame();
            return;
        }

        if (e.key === 'Enter') {
            const cmd = this.input.value.trim();
            if (cmd) {
                this.commandHistory.push(cmd);
                this.historyIndex = this.commandHistory.length;

                this.printLine(`> ${cmd}`, '#00f3ff');

                if (cmd.toLowerCase() === 'kraye.game') {
                    this.startGame();
                    this.input.value = '';
                    return;
                }

                SystemEvents.publish('TERMINAL_CMD_EXEC', cmd);
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            if (this.commandHistory.length > 0 && this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                this.input.value = '';
            }
            e.preventDefault();
        }
    }

    renderConfigMenu() {
        if (!this.hardwareManager) return;

        // [PRO PHASE] Explicitly poll localStorage to represent the hard-locked memory state
        const currentProfile = localStorage.getItem('hw_profile') || this.hardwareManager.systemState.profile;
        const currentTier = localStorage.getItem('hw_graphics_tier') || this.hardwareManager.systemState.graphicsTier;

        const menuHTML = `
            <div style="color: #ff007f; margin-bottom: 10px;">> BIOS_CONFIGURATION_UNLOCKED</div>
            
            <div style="color: #00f3ff; margin-bottom: 5px;">[HARDWARE_PROFILE]</div>
            <div class="radio-option" data-type="profile" data-val="auto">  (${currentProfile === 'auto' ? '●' : ' '}) AUTO_DETECT_LIQUID</div>
            <div class="radio-option" data-type="profile" data-val="mobile">(${currentProfile === 'mobile' ? '●' : ' '}) FORCE_MOBILE_KERNEL</div>
            <div class="radio-option" data-type="profile" data-val="pc">    (${currentProfile === 'pc' ? '●' : ' '}) FORCE_DESKTOP_WIDE</div>
            <br/>
            
            <div style="color: #00f3ff; margin-bottom: 5px;">[VRAM_ALLOCATION]</div>
            <div class="radio-option" data-type="tier" data-val="low">   (${currentTier === 'low' ? '●' : ' '}) LOW_TIER_SAFE_MODE</div>
            <div class="radio-option" data-type="tier" data-val="medium">(${currentTier === 'medium' ? '●' : ' '}) STANDARD_MEDIUM</div>
            <div class="radio-option" data-type="tier" data-val="high">  (${currentTier === 'high' ? '●' : ' '}) HIGH_PERFORMANCE</div>
            <div class="radio-option" data-type="tier" data-val="ultra"> (${currentTier === 'ultra' ? '●' : ' '}) ULTRA_FIDELITY</div>
            
            <div style="color: #ff0055; margin-top: 15px; cursor: pointer;" id="btn-bios-reboot">> COMMIT_AND_REBOOT</div>
            <br/>
        `;

        const menuDiv = document.createElement('div');
        menuDiv.innerHTML = menuHTML;
        this.content.appendChild(menuDiv);
        this.content.scrollTop = this.content.scrollHeight;

        const options = menuDiv.querySelectorAll('.radio-option');
        options.forEach(opt => {
            opt.style.cursor = 'pointer';
            opt.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-type');
                const val = e.target.getAttribute('data-val');

                const siblings = menuDiv.querySelectorAll(`.radio-option[data-type="${type}"]`);
                siblings.forEach(sib => sib.innerHTML = sib.innerHTML.replace('●', ' '));
                e.target.innerHTML = e.target.innerHTML.replace(' ', '●');

                if (type === 'profile') localStorage.setItem('hw_profile_pending', val);
                if (type === 'tier') localStorage.setItem('hw_graphics_tier_pending', val);
            });
        });

        const btnReboot = menuDiv.querySelector('#btn-bios-reboot');
        btnReboot.addEventListener('click', () => {
            this.printLine('APPLYING_HARDWARE_STENCIL...', '#ff007f');

            const pProfile = localStorage.getItem('hw_profile_pending');
            const pTier = localStorage.getItem('hw_graphics_tier_pending');

            if (pProfile) {
                // [PRO PHASE] Physically inject class for immediate native sizing transition before reload
                document.body.classList.remove('mobile-kernel', 'pc-kernel');
                if (pProfile === 'mobile' || pProfile === 'pc') {
                    document.body.classList.add(`${pProfile}-kernel`);
                }
                this.hardwareManager.forceProfile(pProfile);
                localStorage.removeItem('hw_profile_pending');
            }

            if (pTier) {
                this.hardwareManager.forceGraphicsTier(pTier);
                localStorage.removeItem('hw_graphics_tier_pending');
            }

            if (!pProfile && !pTier) {
                this.hardwareManager.triggerReboot();
            }
        });
    }

    startGame() {
        this.gameInstance = new KrayeGame(this);
        this.input.placeholder = "USE ARROW KEYS. BACKTICK (`) TO EXIT.";
        this.gameRenderLoop = requestAnimationFrame(this.renderGame.bind(this));
    }

    terminateGame() {
        if (this.gameInstance) {
            if (typeof this.gameInstance.stopGame === 'function') {
                this.gameInstance.stopGame();
            } else {
                this.gameInstance.state.isActive = false;
            }
            this.gameInstance = null;
        }
        cancelAnimationFrame(this.gameRenderLoop);
        this.input.placeholder = "Enter command...";

        // [PRO PHASE] Physically remove the game renderer from DOM
        const gameDiv = document.getElementById('kraye-game-renderer');
        if (gameDiv && gameDiv.parentNode) {
            gameDiv.parentNode.removeChild(gameDiv);
        }

        this.printLine('DEFRAG_ABORTED.', '#ff0000');
    }

    renderGame() {
        if (!this.gameInstance || !this.gameInstance.state.isActive || this.gameInstance.state.isPaused) return;

        const now = performance.now();
        this.gameInstance.tick(now);

        const state = this.gameInstance.getRenderState();
        let gridHTML = `<div style="font-family: 'Courier New', monospace; line-height: 1.1; color: #00ff00;">`;

        gridHTML += `<span style="color: #00f3ff;">SLA_UPTIME: ${state.sla}%</span> | LINES: ${state.lines}<br/>`;
        gridHTML += `+--------------------+<br/>`;

        for (let r = 0; r < state.grid.length; r++) {
            gridHTML += `|`;
            for (let c = 0; c < state.grid[r].length; c++) {
                const cell = state.grid[r][c];
                if (cell === 0) gridHTML += ` .`;
                else if (cell === 'GHOST') gridHTML += `<span style="color: #555;">[]</span>`;
                else gridHTML += `<span style="color: #ff007f; font-weight: bold;">[]</span>`;
            }
            gridHTML += `|<br/>`;
        }
        gridHTML += `+--------------------+<br/></div>`;

        let gameDiv = document.getElementById('kraye-game-renderer');
        if (!gameDiv) {
            gameDiv = document.createElement('div');
            gameDiv.id = 'kraye-game-renderer';
            this.content.appendChild(gameDiv);
        }

        gameDiv.innerHTML = gridHTML;
        this.content.scrollTop = this.content.scrollHeight;

        if (state.isGameOver) {
            this.terminateGame();
            this.printLine('KERNEL_PANIC. DEFRAGMENTATION FAILED.', '#ff003c');
            return;
        }

        this.gameRenderLoop = requestAnimationFrame(this.renderGame.bind(this));
    }

    handleClose() {
        if (this.gameInstance) {
            this.terminateGame();
        }
        SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { effectId: 'HEX_SHRED', intensity: 0.5 });
        SystemEvents.publish(EVENTS.TERMINAL_CLOSED || 'TERMINAL_CLOSED');
        SystemEvents.publish(EVENTS.UI_FOCUSED || 'UI_FOCUSED', false);
        this.hide();
    }

    show() {
        this.el.classList.add('visible');
        this.el.style.pointerEvents = 'auto'; // [PRO PHASE] Un-shield interaction

        // [PRO PHASE] Instant Input Engagement: 100ms delay to allow CSS transitions to initialize
        setTimeout(() => {
            if (this.input && this.el.classList.contains('visible')) {
                this.input.focus();
            }
        }, 100);

        // [PRO PHASE] Visibility Handshake: Resume game and restore focus
        if (this.gameInstance && this.gameInstance.state) {
            if (typeof this.gameInstance.resume === 'function') {
                this.gameInstance.resume();
            } else {
                this.gameInstance.state.isPaused = false;
            }

            this.gameRenderLoop = requestAnimationFrame(this.renderGame.bind(this));
            this.printLine('SYSTEM_RESUMED.', '#00ff00');
        }
    }

    hide() {
        this.el.classList.remove('visible');
        this.el.classList.remove('terminal-glitch-active');
        this.el.style.pointerEvents = 'none'; // [PRO PHASE] Absolute interaction shield

        // [PRO PHASE] Visibility Handshake: Pause game loop to prevent zombie execution
        if (this.gameInstance && this.gameInstance.state && this.gameInstance.state.isActive) {
            if (typeof this.gameInstance.pause === 'function') {
                this.gameInstance.pause();
            } else {
                this.gameInstance.state.isPaused = true;
            }
            cancelAnimationFrame(this.gameRenderLoop);
        }
    }
}