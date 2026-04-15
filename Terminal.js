/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /ui/Terminal.js
 * Purpose: Draggable Kraye Logs, BIOS Hardware Menu, ASCII Game Engine, and Ergonomic Kraye-Boy Controller
 * STATUS: PRO_PHASE_RESOLUTION_SCALED
 * LINE_COUNT: ~605 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Integrated Command Kernel handshake for real-time theme and physics overrides.
 * - SYSTEM: Visual DNA updated to support Industrial CRT flicker on the command input buffer.
 * - SYSTEM: [PRO PHASE] HardwareManager injected to support BIOS-style radio button rendering.
 * - SYSTEM: [PRO PHASE] `kraye.game` command routing linked to the ASCII Defragmenter renderer.
 * - SYSTEM: [PRO PHASE] Implemented Game Lifecycle Manager for Visibility Handshaking.
 * - SYSTEM: [PRO PHASE] Integrated Instant Input Engagement protocol for zero-click CLI interaction.
 * - SYSTEM: [PRO PHASE] Enforced Kernel-Level Handshake for native font sizing via .mobile-kernel and .pc-kernel body classes.
 * - SYSTEM: [PRO PHASE] Integrated Terminal Window State (Maximize/Minimize) Authority.
 * - SYSTEM: [PRO PHASE] Isolated BIOS menu generation to prevent DOM duplication on multiple Trigger clicks.
 * - SYSTEM: [PRO PHASE] Integrated Industrial Command Cluster for mobile hardware gamepad emulation.
 * - SYSTEM: [PRO PHASE] Overhauled mobile inputs to "Kraye-Boy" split controller layout.
 * - SYSTEM: [PRO PHASE] Replaced standard game rendering with Gradient DNA block rendering.
 * - SYSTEM: [PRO PHASE] Injected Score Telemetry into the KrayeGame HUD bar.
 * - SYSTEM: [PRO PHASE] Synchronized standalone Kraye-Boy controller DOM reference for independent visibility toggling.
 * - SYSTEM: [PRO PHASE] Amplified visual matrix resolution (font-size/line-height) to match logical expansions on mobile hardware.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 9350]: [PRO PHASE] Zombie DOM Nodes. Enhanced terminateGame() to physically remove #kraye-game-renderer from the layout.
 * - FIXED [ID 9370]: [PRO PHASE] Mobile Keyboard Ghosting. Removed inline pointer-events override that was hijacking screen touches while the terminal was invisible.
 * - FIXED [ID 9485]: [PRO PHASE] Invisible Interaction Shield. Enforced strict pointer-event removal in hide() to ensure mobile taps reach the Hero Name viewport and Universal Trigger.
 * - FIXED [ID 9530]: [PRO PHASE] Menu Duplication. Implemented existence guard in `renderConfigMenu()` to abort if `#bios-config-menu` is already mounted.
 * - FIXED [ID 9550]: [PRO PHASE] Keyboard Collision. Added BIOS menu existence guard to prevent duplication on trigger toggle.
 * - FIXED [ID 9560]: [PRO PHASE] Mobile Controller Desync. Bound #krayeboy-controller visibility to the Tetris lifecycle.
 * - FIXED [ID 9585]: [PRO PHASE] Action Fragmentation. Mapped Action A/B and D-Pad triggers to dedicated gameInstance methods.
 * - FIXED [ID 9610]: [PRO PHASE] Monotone Deframgmenter. Swapped hardcoded `#ff007f` blocks for dynamic dynamic sector-based colors via `BLOCK_DNA` array in `renderGame()`.
 * - FIXED [ID 9630]: [PRO PHASE] Mobile HUD Clipping. Condensed text and appended state.score to the render string to restore telemetry visibility.
 * - FIXED [ID 9670]: [PRO PHASE] Zombie Controller. Added visibility toggles for `#krayeboy-controller` within `show()` and `hide()` to prevent floating buttons when terminal is dismissed.
 * - FIXED [ID 9698]: [PRO PHASE] Visual Squashing. Injected explicit font-size to scale ASCII matrix rendering for mobile readability.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added support for character-by-character typewriter manifestations for system responses.
 * - Fixed: [PRO PHASE] Radio buttons now explicitly poll localStorage directly to represent the hard-locked memory state.
 * - Fixed: [PRO PHASE] Injected double-click listener on terminal header for instant maximization.
 * - Fixed: [PRO PHASE] Injected `this.input.focus()` into the visibility toggle to enable immediate typing on manifest.
 * - Fixed: [PRO PHASE] Added ID `bios-config-menu` to the generated menu container.
 * - Fixed: [PRO PHASE] Injected `if (document.getElementById('bios-config-menu')) return;` at the top of `renderConfigMenu`.
 * - Fixed: [PRO PHASE] Injected `this.bindGameControls()` to map split Kraye-Boy wings to game logic.
 * - Fixed: [PRO PHASE] Injected dynamic color logic into `renderGame` loop using block grid data.
 * - Fixed: [PRO PHASE] Implemented text-shadow glowing effect to simulate phosphor display blocks in Tetris.
 * - Fixed: [PRO PHASE] Updated gridHTML string builder to consume state.score.
 * - Fixed: [PRO PHASE] Added Kraye-Boy visibility state management to terminal lifecycle methods.
 * - Fixed: [PRO PHASE] Added font-size: 1.5rem and synchronized line-height in gridHTML string builder.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: [PRO PHASE] Selecting a hardware radio button physically commits the choice to `localStorage` and triggers a hard reboot.
 * - RIPPLE: [PRO PHASE] Committing a BIOS change immediately alters the body class, snapping native typography before the browser reloads.
 * - RIPPLE: [PRO PHASE] Stopping the game now cleanly frees up terminal scroll space and removes the canvas layer entirely.
 * - RIPPLE: [PRO PHASE] Terminal completely vanishes from the interaction stack when closed, restoring Universal Trigger access.
 * - RIPPLE: [PRO PHASE] Repeatedly clicking the Universal Trigger or 8-Tap gateway no longer spams the terminal log with duplicated BIOS interfaces.
 * - RIPPLE: Mobile users can now navigate and rotate Tetris shards with ergonomic split-thumb precision.
 * - RIPPLE: The Tetris game blocks now accurately mirror the specific gradient sector colors found in the 3D world (Cyan, Magenta, Violet, Amber, Mint, Rose).
 * - RIPPLE: [PRO PHASE] Mobile users can now monitor their dynamic technical scoring in real-time.
 * - RIPPLE: [PRO PHASE] Hiding the terminal while a game is active now safely stows the mobile controller until the terminal is restored.
 * - RIPPLE: [PRO PHASE] The Tetris matrix now renders with larger, highly visible blocks on mobile screens, improving playability.
 * * * * * REALITY AUDIT V28:
 * - APPEND 9310: [PRO PHASE] Window State Audit - Verified `.maximized` class successfully escapes dragging physics and bounds constraints.
 * - APPEND 9350: [PRO PHASE] DOM Purge Audit - Verified terminateGame safely destroys the renderer container.
 * - APPEND 9485: [PRO PHASE] Interaction Shield Audit - Confirmed terminal hide() perfectly unblocks underlying 3D and UI layers.
 * - APPEND 9530: [PRO PHASE] Menu Isolation Audit - Verified `renderConfigMenu()` safely aborts if the menu ID already exists in the DOM.
 * - APPEND 9585: [PRO PHASE] Ergonomic Bind Audit - Verified that A/B buttons provide high-intensity drop/rotate actions.
 * - APPEND 9590: [PRO PHASE] Lifecycle Audit - Verified that stopping the game completely purges the Kraye-Boy HUD.
 * - APPEND 9610: [PRO PHASE] DNA Sync Audit - Confirmed the 6-color spectrum palette renders flawlessly in the terminal span elements.
 * - APPEND 9630: [PRO PHASE] Telemetry Sync Audit - Verified the terminal correctly unwraps the score from getRenderState.
 * - APPEND 9670: [PRO PHASE] Lifecycle Audit - Verified independent Kraye-Boy controller gracefully hides when terminal is closed via Universal Trigger.
 * - APPEND 9698: [PRO PHASE] Visual Scale Audit - Verified that inline CSS updates physically expand the ASCII rendering.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_RESOLUTION_SCALED
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

        this.bindGameControls();
        this.updatePhysics();
    }

    bindGameControls() {
        const krayeboy = document.getElementById('krayeboy-controller');
        if (!krayeboy) return;

        // [PRO PHASE FIX] Prevent native mobile browser behaviors on controller interaction
        krayeboy.addEventListener('touchstart', (e) => {
            if (e.target.closest('.dpad-btn, .action-btn')) {
                e.preventDefault();
            }
        }, { passive: false });

        krayeboy.addEventListener('pointerdown', (e) => {
            if (!this.gameInstance || !this.gameInstance.state.isActive) return;

            const btn = e.target.closest('.dpad-btn, .action-btn');
            const action = btn?.getAttribute('data-action');
            if (!action) return;

            e.preventDefault();
            e.stopPropagation();

            SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { effectId: 'SIGNAL_NOISE', intensity: 0.4 });

            if (action === 'left') this.gameInstance.move(-1, 0);
            else if (action === 'right') this.gameInstance.move(1, 0);
            else if (action === 'softdrop') this.gameInstance.move(0, 1);
            else if (action === 'rotate') this.gameInstance.rotate();
            else if (action === 'drop') {
                SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { effectId: 'CHROMATIC_SPLIT', intensity: 1.5 });
                this.gameInstance.hardDrop();
            }
        });
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
            else if (e.key === ' ') {
                SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { effectId: 'CHROMATIC_SPLIT', intensity: 1.5 });
                this.gameInstance.hardDrop();
            }
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

        // FIXED [ID 9530]: Prevent multiple BIOS menus from stacking on repeated trigger clicks
        if (document.getElementById('bios-config-menu')) return;

        // [PRO PHASE] Explicitly poll localStorage to represent the hard-locked memory state
        const currentProfile = localStorage.getItem('hw_profile') || this.hardwareManager.systemState.profile;
        const currentTier = localStorage.getItem('hw_graphics_tier') || this.hardwareManager.systemState.graphicsTier;

        const menuHTML = `
            <div id="bios-config-menu">
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
            </div>
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
        this.input.placeholder = "KRAYE-BOY ENGAGED. BACKTICK (`) TO EXIT.";

        // [PRO PHASE] Manifest the Kraye-Boy Ergonomic HUD
        const krayeboy = document.getElementById('krayeboy-controller');
        if (krayeboy) krayeboy.classList.remove('controls-hidden');

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

        const krayeboy = document.getElementById('krayeboy-controller');
        if (krayeboy) krayeboy.classList.add('controls-hidden');

        this.printLine('DEFRAG_ABORTED.', '#ff0000');
    }

    renderGame() {
        if (!this.gameInstance || !this.gameInstance.state.isActive || this.gameInstance.state.isPaused) return;

        const now = performance.now();
        this.gameInstance.tick(now);

        const state = this.gameInstance.getRenderState();

        // [PRO PHASE] Level-Based Overclock Implementation
        let level = Math.floor(state.lines / 10) + 1;
        let speedMultiplier = Math.min(2.5, 1.0 + (level * 0.15));

        let gridHTML = `<div style="font-family: 'Courier New', monospace; font-size: 1.5rem; line-height: 1.4; color: #00ff00;">`;

        // [PRO PHASE] Fixed Telemetry Omission & Viewport Cramping
        gridHTML += `<span style="color: #00f3ff; font-size: 1rem;">SLA: ${state.sla}% | L: ${state.lines} | S: ${state.score || 0} | OC: ${speedMultiplier.toFixed(1)}x</span><br/>`;
        gridHTML += `+--------------------+<br/>`;

        // [PRO PHASE] Sector-Synced Block DNA
        const BLOCK_DNA = {
            1: { color: '#00f3ff', glow: 'rgba(0, 243, 255, 0.8)' }, // I - Cyan (Tech)
            2: { color: '#ff00ff', glow: 'rgba(255, 0, 255, 0.8)' }, // J - Magenta (Vision)
            3: { color: '#ff00ff', glow: 'rgba(255, 0, 255, 0.8)' }, // L - Magenta (Vision)
            4: { color: '#ffaa00', glow: 'rgba(255, 170, 0, 0.8)' }, // O - Amber (Contact)
            5: { color: '#00ffcc', glow: 'rgba(0, 255, 204, 0.8)' }, // S - Mint (Success)
            6: { color: '#8a2be2', glow: 'rgba(138, 43, 226, 0.8)' }, // T - Violet (Logic)
            7: { color: '#ff3366', glow: 'rgba(255, 51, 102, 0.8)' }, // Z - Rose (Warning)
            'GHOST': { color: '#555555', glow: 'transparent' }
        };

        for (let r = 0; r < state.grid.length; r++) {
            gridHTML += `|`;
            for (let c = 0; c < state.grid[r].length; c++) {
                const cell = state.grid[r][c];

                if (cell === 0) {
                    gridHTML += ` .`;
                } else {
                    // Extract base type (handling active falling pieces which might be negative or offset)
                    let blockType = (cell === 'GHOST') ? 'GHOST' : Math.abs(cell) % 10;
                    if (blockType === 0) blockType = 1; // Fallback

                    const dna = BLOCK_DNA[blockType] || { color: '#ff007f', glow: 'rgba(255, 0, 127, 0.5)' };

                    gridHTML += `<span style="color: ${dna.color}; text-shadow: 0 0 5px ${dna.glow}; font-weight: bold;">[]</span>`;
                }
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
            this.printLine('FATAL_ERROR: MEMORY_SEGMENTATION_FAULT. KERNEL PANIC.', '#ff3366');
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

            // [PRO PHASE FIX] Restore detached controller visibility
            const krayeboy = document.getElementById('krayeboy-controller');
            if (krayeboy) krayeboy.classList.remove('controls-hidden');

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

            // [PRO PHASE FIX] Hide detached controller to prevent ghost UI
            const krayeboy = document.getElementById('krayeboy-controller');
            if (krayeboy) krayeboy.classList.add('controls-hidden');

            cancelAnimationFrame(this.gameRenderLoop);
        }
    }
}