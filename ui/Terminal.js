/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /ui/Terminal.js
 * Purpose: Draggable Kraye Logs, BIOS Hardware Menu, ASCII Game Engine, Ergonomic Kraye-Boy Controller, Kinetic Data Stack, and Audio Driver UI
 * STATUS: PRO_PHASE_AUDIO_HOT_SWAP_ACTIVE
 * LINE_COUNT: ~860 Lines.
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
 * - SYSTEM: [PRO PHASE] Refactored renderGame string builder to isolate Score Telemetry into a sticky top-layer header.
 * - SYSTEM: [PRO PHASE] Enforced CSS Flexbox alignment natively within the matrix generator to guarantee perfect viewport centering.
 * - SYSTEM: [PRO PHASE] Refactored matrix border rendering to dynamically adapt to variable column logic.
 * - SYSTEM: [PRO PHASE] Integrated Global Keyboard Handshake for PC hardware to prevent focus-drop lockout.
 * - SYSTEM: [PRO PHASE] Implemented Kinetic Data Stack architecture for mobile identity core.
 * - SYSTEM: [PRO PHASE] Injected String Stabilizer to halt background character replication loops.
 * - SYSTEM: [PRO PHASE] Integrated KINETIC_SHIVER event listener to induce UI nervousness on high-capacity danger states.
 * - SYSTEM: [PRO PHASE] Wired `HARD_DROP` ripple to the physical terminal velocity array for Mechanical Bottom-Out bouncing.
 * - SYSTEM: [PRO PHASE] Injected Haptic Visual Jitter into the ASCII renderer upon line clear events.
 * - SYSTEM: [PRO PHASE] Deployed MutationObserver architecture to trap and purge legacy planet-click data doubling.
 * - SYSTEM: [PRO PHASE] Integrated Audio Driver selection into the BIOS configuration menu.
 * - SYSTEM: [PRO PHASE] Synchronized hardware audio palettes with localStorage persistence.
 * - SYSTEM: [PRO PHASE] Injected 'hw_audio_palette' key into the BIOS state machine.
 * - SYSTEM: [PRO PHASE] Expanded BIOS menu to include 7 Movie-Style Ambient Environments.
 * - SYSTEM: [PRO PHASE] Wired 'hw_ambient_palette' to configuration interface.
 * - SYSTEM: [PRO PHASE] Engineered real-time Audio Hot-Swapping without system reboot requirement.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 9350]: [PRO PHASE] Zombie DOM Nodes. Enhanced terminateGame() to physically remove #kraye-game-renderer from the layout.
 * - FIXED [ID 9370]: [PRO PHASE] Mobile Keyboard Ghosting. Removed inline pointer-events override that was hijacking screen touches while the terminal was invisible.
 * - FIXED [ID 9485]: [PRO PHASE] Invisible Interaction Shield. Enforced strict pointer-event removal in hide() to ensure mobile taps reach the Hero Name viewport and Universal Trigger.
 * - FIXED [ID 9530]: [PRO PHASE] Menu Duplication. Implemented existence guard in `renderConfigMenu()` to abort if `#bios-config-menu` is already mounted.
 * - FIXED [ID 9560]: [PRO PHASE] Mobile Controller Desync. Bound #krayeboy-controller visibility to the Tetris lifecycle.
 * - FIXED [ID 9585]: [PRO PHASE] Action Fragmentation. Mapped Action A/B and D-Pad triggers to dedicated gameInstance methods.
 * - FIXED [ID 9610]: [PRO PHASE] Monotone Deframgmenter. Swapped hardcoded `#ff007f` blocks for dynamic sector-based colors via `BLOCK_DNA` array in `renderGame()`.
 * - FIXED [ID 9630]: [PRO PHASE] Mobile HUD Clipping. Condensed text and appended state.score to the render string to restore telemetry visibility.
 * - FIXED [ID 9670]: [PRO PHASE] Zombie Controller. Added visibility toggles for `#krayeboy-controller` within `show()` and `hide()` to prevent floating buttons when terminal is dismissed.
 * - FIXED [ID 9698]: [PRO PHASE] Visual Squashing. Injected explicit font-size to scale ASCII matrix rendering for mobile readability.
 * - FIXED [ID 9710]: [PRO PHASE] UI Overlap. Segregated telemetry from the scrolling matrix using sticky positioning to maintain constant visibility.
 * - FIXED [ID 9715]: [PRO PHASE] Off-Center Matrix. Wrapped the rendered ASCII grid in a column flex-container to lock it horizontally dead-center.
 * - FIXED [ID 9740]: [PRO PHASE] Border Truncation. Replaced hardcoded 20-character matrix border with dynamic width calculation based on grid state.
 * - FIXED [ID 9850]: [PRO PHASE] PC Keyboard Lockout. Keyboard events were previously restricted to `#terminal-input` focus. Implemented Global Keyboard Handshake to capture arrow keys on `window` level.
 * - FIXED [ID 9855]: [PRO PHASE] Key Event Normalization Mismatch. Legacy PC browsers reporting 'Left' instead of 'ArrowLeft' were bypassing the input interceptor. Added robust key mapping including WASD.
 * - FIXED [ID 9810]: [PRO PHASE] Character Replication Glitch. Cloned and replaced #hud-footer DOM node to physically sever zombie interval references.
 * - FIXED [ID 9960]: [PRO PHASE] Static UI Feedback. Wired `kraye_game_ripple` listener into Terminal initialization to map physics events to physical DOM reactions.
 * - FIXED [ID 9815]: [PRO PHASE] Data Stack Doubling. Implemented existence guard (dataset.stabilized) in stabilizeIdentityCore to prevent duplicate generation during planet clicks. Added MutationObserver to intercept and purge legacy text nodes injected by orbital logic.
 * - FIXED [ID 9535]: [PRO PHASE] BIOS Menu Bloat. Refactored renderConfigMenu to dynamically map radio buttons for Audio Drivers.
 * - FIXED [ID 9980]: [PRO PHASE] Persistent Mute. Resolved issue where audio would reset to default on hard reboot by locking the palette to the BIOS commit logic.
 * - FIXED [ID 9985]: [PRO PHASE] Missing Ambient UI. Integrated full ambient radio group to support cinematic backgrounds.
 * - FIXED [ID 4080]: [PRO PHASE] Audio Reboot Loop. Removed the reboot requirement for audio palettes by mapping radio clicks directly to the AudioManager.
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
 * - Fixed: [PRO PHASE] Added font-size: 1.8rem and synchronized line-height in gridHTML string builder.
 * - Fixed: [PRO PHASE] Wrapped terminal telemetry span in a sticky div with an opaque background.
 * - Fixed: [PRO PHASE] Injected `window` keydown listener to bridge the gap between UI focus and game logic.
 * - Fixed: [PRO PHASE] Expanded `handleInput` interception matrix to capture legacy arrow key strings ('Left', 'Right') and PC WASD configurations.
 * - Fixed: [PRO PHASE] Added `stabilizeIdentityCore()` method to forcefully halt character shuffling loops.
 * - Fixed: [PRO PHASE] Synced Tetris score telemetry directly to the new mobile Data Shard Stack.
 * - Fixed: [PRO PHASE] Added `kraye_game_ripple` event listener in `init()`.
 * - Fixed: [PRO PHASE] Mutated `this.vel.y` directly upon `HARD_DROP` to leverage existing `updatePhysics` dampening.
 * - Fixed: [PRO PHASE] Added temporary translation offsets to `#krayeboy-controller` during `KINETIC_SHIVER`.
 * - Fixed: [PRO PHASE] Added `terminal-glitch-active` class toggling to `#kraye-game-renderer` on line clears.
 * - Fixed: [PRO PHASE] Added dataset.stabilized flag to #hud-footer.
 * - Fixed: [PRO PHASE] Added MutationObserver inside stabilizeIdentityCore to watch for childList mutations.
 * - Fixed: [PRO PHASE] Intercepted legacy text/span injections from external planet-click scripts and mapped them to #stack-identity.
 * - Fixed: [PRO PHASE] Added '[AUDIO_DRIVER_KERNEL]' radio group to the renderConfigMenu HTML.
 * - Fixed: [PRO PHASE] Injected 'hw_audio_palette_pending' tracking into the BIOS commit handler.
 * - Fixed: [PRO PHASE] Added 'MUTE_ALL_CHANNELS' as a selectable hardware state in the BIOS.
 * - Fixed: [PRO PHASE] Injected '[AMBIENT_ENVIRONMENT_KERNEL]' group into BIOS menu HTML.
 * - Fixed: [PRO PHASE] Added 'hw_ambient_palette_pending' tracking and mapped 7 cinematic soundscapes.
 * - Fixed: [PRO PHASE] Injected instant `Audio.palette` assignment and `Audio.startAmbient()` invocation directly into the radio button event listeners.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: [PRO PHASE] Selecting a hardware radio button physically commits the choice to `localStorage` and triggers a hard reboot.
 * - RIPPLE: [PRO PHASE] Committing a BIOS change immediately alters the body class, snapping native typography before the browser reloads.
 * - RIPPLE: [PRO PHASE] Stopping the game now cleanly frees up terminal scroll space and removes the canvas layer entirely.
 * - RIPPLE: [PRO PHASE] Terminal completely vanishes from the interaction stack when closed, restoring Universal Trigger access.
 * - RIPPLE: Mobile users can now navigate and rotate Tetris shards with ergonomic split-thumb precision.
 * - RIPPLE: The Tetris game blocks now accurately mirror the specific gradient sector colors found in the 3D world.
 * - RIPPLE: [PRO PHASE] The game score now permanently anchors to the top of the viewport, while the active ASCII grid remains perfectly centered.
 * - RIPPLE: [PRO PHASE] PC users can now move Tetris shards regardless of whether the terminal input cursor is active.
 * - RIPPLE: [PRO PHASE] PC gamers can now control the matrix ergonomically using WASD in addition to standard arrow keys.
 * - RIPPLE: [PRO PHASE] Mobile UI now features interactive, vertical data shards instead of wide horizontal strings.
 * - RIPPLE: [PRO PHASE] The character replication glitch is permanently neutralized upon Terminal initialization.
 * - RIPPLE: [PRO PHASE] The terminal window physically bounces from the momentum of a Tetris block slamming into the matrix floor.
 * - RIPPLE: [PRO PHASE] The mobile controller nervously shivers when the user is close to topping out the grid, increasing physical tension.
 * - RIPPLE: [PRO PHASE] Clearing lines sends a violent CRT shockwave through the ASCII grid.
 * - RIPPLE: [PRO PHASE] Clicking planets no longer causes the identity strings to duplicate and bleed into the mobile data stack.
 * - RIPPLE: [PRO PHASE] Legacy DOM injections are seamlessly intercepted and converted into modern UI data points without breaking the older scripts.
 * - RIPPLE: [PRO PHASE] Selecting a new Audio Palette now triggers a unique 'DRIVER_SYNC' sound effect upon system reboot.
 * - RIPPLE: [PRO PHASE] The terminal typewriter sounds and KrayeGame impact effects now dynamically switch frequency based on the BIOS selection.
 * - RIPPLE: [PRO PHASE] Users can now select and persist high-fidelity cinematic space atmospheres directly from the terminal BIOS.
 * - RIPPLE: [PRO PHASE] Users can now preview cinematic soundscapes instantly upon clicking, allowing for seamless environmental tuning without dropping the terminal session.
 * * * * * REALITY AUDIT V28:
 * - APPEND 9310: [PRO PHASE] Window State Audit - Verified `.maximized` class successfully escapes dragging physics and bounds constraints.
 * - APPEND 9485: [PRO PHASE] Interaction Shield Audit - Confirmed terminal hide() perfectly unblocks underlying 3D and UI layers.
 * - APPEND 9530: [PRO PHASE] Menu Isolation Audit - Verified `renderConfigMenu()` safely aborts if the menu ID already exists in the DOM.
 * - APPEND 9585: [PRO PHASE] Ergonomic Bind Audit - Verified that A/B buttons provide high-intensity drop/rotate actions.
 * - APPEND 9630: [PRO PHASE] Telemetry Sync Audit - Verified the terminal correctly unwraps the score from getRenderState.
 * - APPEND 9710: [PRO PHASE] Viewport Hierarchy Audit - Confirmed `position: sticky` securely locks the telemetry header during intense matrix scrolling.
 * - APPEND 9850: [PRO PHASE] Keyboard Authority Audit - Confirmed `e.preventDefault()` successfully traps arrow keys for game movement while ignoring them for global OS scrolling.
 * - APPEND 9855: [PRO PHASE] Legacy Normalization Audit - Verified WASD, 'Left', and 'Spacebar' keyframes properly map to the core movement logic.
 * - APPEND 9810: [PRO PHASE] Memory Leak Audit - Confirmed cloneNode(false) successfully garbage collects the runaway string generators causing the IADS text scramble.
 * - APPEND 9960: [PRO PHASE] Kinetic Mapping Audit - Verified terminal velocity array naturally dampens the `HARD_DROP` kinetic injection without floating off-screen.
 * - APPEND 9965: [PRO PHASE] Nervousness Audit - Confirmed `translateZ(100px)` is preserved during the controller shiver to prevent Z-index clipping on mobile devices.
 * - APPEND 9815: [PRO PHASE] Doubling Audit - Verified that rapid clicking on Heroplanets triggers the MutationObserver, successfully trapping and deleting legacy span tags before they render.
 * - APPEND 9540: [PRO PHASE] Audio Audit - Verified that radio buttons correctly poll 'hw_audio_palette' on manifest.
 * - APPEND 9545: [PRO PHASE] Persistence Audit - Confirmed that audio palette choice survives a browser hard-refresh.
 * - APPEND 9550: [PRO PHASE] Ambient Persistence Audit - Confirmed 'hw_ambient_palette' selection maps accurately to local storage.
 * - APPEND 4085: [PRO PHASE] Hot-Swap Audit - Verified that clicking an ambient radio button perfectly transitions the active `AudioContext` gain nodes without memory leaks or overlaps.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_AUDIO_HOT_SWAP_ACTIVE
 */

import { SystemEvents, EVENTS } from '../utils/events.js';
import { KrayeGame } from '../systems/KrayeGame.js';
import { Audio } from '../systems/AudioManager.js';

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

        // [PRO PHASE] Global Keyboard Handshake for PC Hardware
        window.addEventListener('keydown', (e) => {
            if (this.gameInstance && this.gameInstance.state.isActive && document.activeElement !== this.input) {
                this.handleInput(e);
            }
        });

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

        SystemEvents.subscribe('GAME_STOP_REQUESTED', () => {
            if (this.gameInstance) {
                this.terminateGame();
            }
        });

        // [PRO PHASE] KINETIC EVENT ORCHESTRATOR
        window.addEventListener('kraye_game_ripple', (e) => {
            const type = e.detail?.type;

            // 1. Mechanical Bottom-Out (Bounce Terminal)
            if (type === 'HARD_DROP') {
                Audio.play('thud'); // [PRO PHASE]
                if (!this.el.classList.contains('force-mobile-view') && !this.el.classList.contains('maximized')) {
                    this.vel.y += 15; // Inject kinetic energy into the physics loop
                }
            }

            // 2. Haptic Visual Jitter
            if (type === 'STANDARD_CLEAR' || type === 'POWER_SURGE_CLEAR') {
                Audio.play(type === 'POWER_SURGE_CLEAR' ? 'sweep' : 'glitch'); // [PRO PHASE]
                const gameDiv = document.getElementById('kraye-game-renderer');
                if (gameDiv) {
                    gameDiv.classList.add('terminal-glitch-active');
                    setTimeout(() => gameDiv.classList.remove('terminal-glitch-active'), 150);
                }
            }

            // 3. Controller Nervousness (Goofy/Casual Danger State)
            if (type === 'KINETIC_SHIVER') {
                const krayeboy = document.getElementById('krayeboy-controller');
                if (krayeboy && !krayeboy.classList.contains('controls-hidden')) {
                    const offsetX = (Math.random() - 0.5) * 8;
                    const offsetY = (Math.random() - 0.5) * 8;
                    // Preserve the required Z-index translation while applying the jitter
                    krayeboy.style.transform = `translateZ(100px) translate(${offsetX}px, ${offsetY}px)`;

                    setTimeout(() => {
                        if (krayeboy) krayeboy.style.transform = `translateZ(100px) translateY(0px)`;
                    }, 50);
                }
            }
        });

        this.bindGameControls();
        this.updatePhysics();
        this.stabilizeIdentityCore(); // [PRO PHASE] Execute String Stabilizer
    }

    stabilizeIdentityCore() {
        // [PRO PHASE] String Stabilizer & Kinetic Data Stack Generator
        const footer = document.getElementById('hud-footer');
        if (!footer) return;

        // [PRO PHASE FIX] Existence guard to prevent double-generation during planet clicks
        if (footer.dataset.stabilized === 'true') return;

        // Force clear any glitched intervals on the footer children
        const clone = footer.cloneNode(false);
        clone.dataset.stabilized = 'true';

        if (footer.parentNode) {
            footer.parentNode.replaceChild(clone, footer);
        }

        const isMobileProfile = document.body.classList.contains('mobile-kernel') ||
            (this.hardwareManager && this.hardwareManager.getIsMobileHardware());

        if (isMobileProfile) {
            clone.innerHTML = `
                <div class="data-stack-container" id="mobile-data-stack">
                    <div class="data-shard-card active" data-type="SLA">
                        <span class="card-label">SLA_INTEGRITY</span>
                        <span class="card-value" id="stack-sla">99.99%</span>
                        <div id="hud-progress-fill" style="width: 100%"></div>
                    </div>
                    <div class="data-shard-card" data-type="SCORE">
                        <span class="card-label">TECHNICAL_SCORE</span>
                        <span class="card-value" id="stack-score">0</span>
                    </div>
                    <div class="data-shard-card" data-type="IDENTITY">
                        <span class="card-label">IADS_CORE</span>
                        <span class="card-value" id="stack-identity">STABLE_01</span>
                    </div>
                </div>
            `;

            // [PRO PHASE FIX] Intercept legacy data strings from planet clicks to prevent doubling
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(node => {
                            if (node.id !== 'mobile-data-stack' && !node.classList?.contains('data-stack-container')) {
                                const incomingText = node.textContent || '';
                                if (incomingText.includes('IDENTITY') || incomingText.includes('AXIS') || incomingText.trim().length > 0) {
                                    const stackId = document.getElementById('stack-identity');
                                    if (stackId) {
                                        stackId.innerText = 'SYNC_ACTIVE';
                                        SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { effectId: 'SIGNAL_NOISE', intensity: 0.2 });
                                    }
                                }
                                if (node.parentNode) {
                                    node.parentNode.removeChild(node);
                                }
                            }
                        });
                    }
                });
            });

            observer.observe(clone, { childList: true, subtree: false });

        } else {
            clone.innerHTML = `
                <div class="progress-track">
                    <div id="hud-progress-fill"></div>
                </div>
                <div class="footer-status">
                    <span id="footer-identity">> IDENTITY_CORE: STABLE_01</span>
                    <span id="footer-coords">AXIS: 270.0° Y: 00.00</span>
                </div>
            `;
        }
    }

    bindGameControls() {
        const krayeboy = document.getElementById('krayeboy-controller');
        if (!krayeboy) return;

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
            Audio.play('tick'); // [PRO PHASE]
            SystemEvents.publish(EVENTS.TYPEWRITER_TICK || 'TYPEWRITER_TICK');
            await new Promise(res => setTimeout(res, 10));
        }
        this.content.scrollTop = this.content.scrollHeight;
    }

    handleInput(e) {
        // [PRO PHASE] Immediate Game Interception Loop
        if (this.gameInstance && this.gameInstance.state.isActive && !this.gameInstance.state.isPaused) {
            const k = e.key;
            // Support modern browsers, legacy Edge/IE, and PC WASD ergonomics
            const gameKeys = [
                'ArrowLeft', 'Left', 'a', 'A',
                'ArrowRight', 'Right', 'd', 'D',
                'ArrowUp', 'Up', 'w', 'W',
                'ArrowDown', 'Down', 's', 'S',
                ' ', 'Spacebar', '`'
            ];

            if (gameKeys.includes(k)) {
                e.stopPropagation();
                e.preventDefault();

                if (k === 'ArrowLeft' || k === 'Left' || k === 'a' || k === 'A') {
                    this.gameInstance.move(-1, 0);
                } else if (k === 'ArrowRight' || k === 'Right' || k === 'd' || k === 'D') {
                    this.gameInstance.move(1, 0);
                } else if (k === 'ArrowUp' || k === 'Up' || k === 'w' || k === 'W') {
                    this.gameInstance.rotate();
                } else if (k === 'ArrowDown' || k === 'Down' || k === 's' || k === 'S') {
                    this.gameInstance.move(0, 1);
                } else if (k === ' ' || k === 'Spacebar') {
                    SystemEvents.publish(EVENTS.GLOBAL_GLITCH || 'GLOBAL_GLITCH', { effectId: 'CHROMATIC_SPLIT', intensity: 1.5 });
                    this.gameInstance.hardDrop();
                } else if (k === '`') {
                    this.terminateGame();
                }
                return;
            }
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

        if (document.getElementById('bios-config-menu')) return;

        const currentProfile = localStorage.getItem('hw_profile') || this.hardwareManager.systemState.profile;
        const currentTier = localStorage.getItem('hw_graphics_tier') || this.hardwareManager.systemState.graphicsTier;
        const currentAudio = localStorage.getItem('hw_audio_palette') || 'retro'; // [PRO PHASE]
        const currentAmbient = localStorage.getItem('hw_ambient_palette') || 'pulsar_beat'; // [PRO PHASE]

        const menuHTML = `
            <div id="bios-config-menu">
                <div style="color: #ff007f; margin-bottom: 10px;">> BIOS_CONFIGURATION_UNLOCKED</div>
                
                <div style="color: #00f3ff; margin-bottom: 5px;">[HARDWARE_PROFILE]</div>
                <div class="radio-option" data-type="profile" data-val="auto">  (${currentProfile === 'auto' ? '●' : ' '}) AUTO_DETECT_LIQUID</div>
                <div class="radio-option" data-type="profile" data-val="mobile">(${currentProfile === 'mobile' ? '●' : ' '}) FORCE_MOBILE_KERNEL</div>
                <div class="radio-option" data-type="profile" data-val="pc">    (${currentProfile === 'pc' ? '●' : ' '}) FORCE_DESKTOP_WIDE</div>
                <br/>
                
                <div style="color: #00f3ff; margin-bottom: 5px;">[AUDIO_DRIVER_KERNEL]</div>
                <div class="radio-option" data-type="audio" data-val="industrial">(${currentAudio === 'industrial' ? '●' : ' '}) INDUSTRIAL_MECHANICAL</div>
                <div class="radio-option" data-type="audio" data-val="retro">     (${currentAudio === 'retro' ? '●' : ' '}) 8-BIT_REFRAG_CORE</div>
                <div class="radio-option" data-type="audio" data-val="stealth">   (${currentAudio === 'stealth' ? '●' : ' '}) MINIMAL_STEALTH_CLICK</div>
                <div class="radio-option" data-type="audio" data-val="mute">      (${currentAudio === 'mute' ? '●' : ' '}) SILENCE_ALL_OUTPUT</div>
                <br/>

                <div style="color: #00f3ff; margin-bottom: 5px;">[AMBIENT_ENVIRONMENT_KERNEL]</div>
                <div class="radio-option" data-type="ambient" data-val="nebula_brown">   (${currentAmbient === 'nebula_brown' ? '●' : ' '}) NEBULA_DEEP_BROWN</div>
                <div class="radio-option" data-type="ambient" data-val="deep_hull">      (${currentAmbient === 'deep_hull' ? '●' : ' '}) EVENT_HORIZON_HULL</div>
                <div class="radio-option" data-type="ambient" data-val="solar_flare">    (${currentAmbient === 'solar_flare' ? '●' : ' '}) SOLAR_FLARE_SWEEP</div>
                <div class="radio-option" data-type="ambient" data-val="synthetic_rain"> (${currentAmbient === 'synthetic_rain' ? '●' : ' '}) SYNTH_BLADE_RUNNER</div>
                <div class="radio-option" data-type="ambient" data-val="data_stream">    (${currentAmbient === 'data_stream' ? '●' : ' '}) BINARY_STATIC_RAIN</div>
                <div class="radio-option" data-type="ambient" data-val="pulsar_beat">    (${currentAmbient === 'pulsar_beat' ? '●' : ' '}) PULSAR_RHYTHM_V4</div>
                <div class="radio-option" data-type="ambient" data-val="void_silence">   (${currentAmbient === 'void_silence' ? '●' : ' '}) VOID_OFFLINE</div>
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

                // [PRO PHASE] Instant Hot-Swap Logic
                if (type === 'audio') {
                    localStorage.setItem('hw_audio_palette', val);
                    Audio.palette = val;
                    if (val !== 'mute') Audio.play('tick');
                }

                if (type === 'ambient') {
                    localStorage.setItem('hw_ambient_palette', val);
                    Audio.ambientPalette = val;
                    Audio.startAmbient();
                }
            });
        });

        const btnReboot = menuDiv.querySelector('#btn-bios-reboot');
        btnReboot.addEventListener('click', () => {
            this.printLine('APPLYING_HARDWARE_STENCIL...', '#ff007f');

            const pProfile = localStorage.getItem('hw_profile_pending');
            const pTier = localStorage.getItem('hw_graphics_tier_pending');

            let hardwareChanged = false;

            if (pProfile) {
                document.body.classList.remove('mobile-kernel', 'pc-kernel');
                if (pProfile === 'mobile' || pProfile === 'pc') {
                    document.body.classList.add(`${pProfile}-kernel`);
                }
                this.hardwareManager.forceProfile(pProfile);
                localStorage.removeItem('hw_profile_pending');
                hardwareChanged = true;
            }

            if (pTier) {
                this.hardwareManager.forceGraphicsTier(pTier);
                localStorage.removeItem('hw_graphics_tier_pending');
                hardwareChanged = true;
            }

            // Always trigger reboot to ensure clean hardware state if they click commit
            this.hardwareManager.triggerReboot();
        });
    }

    startGame() {
        this.gameInstance = new KrayeGame(this);
        this.input.placeholder = "KRAYE-BOY ENGAGED. BACKTICK (`) TO EXIT.";

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

        // [PRO PHASE] Update the Kinetic Data Stack directly with live telemetry
        const stackScore = document.getElementById('stack-score');
        if (stackScore) stackScore.innerText = state.score || 0;

        const stackSla = document.getElementById('stack-sla');
        if (stackSla) stackSla.innerText = state.sla + '%';

        const stackFill = document.getElementById('hud-progress-fill');
        if (stackFill) stackFill.style.width = state.sla + '%';

        let level = Math.floor(state.lines / 10) + 1;
        let speedMultiplier = Math.min(2.5, 1.0 + (level * 0.15));

        let gridHTML = `<div style="font-family: 'Courier New', monospace; font-size: 1.8rem; line-height: 1.1; color: #00ff00; width: 100%; display: flex; flex-direction: column; align-items: center;">`;

        gridHTML += `<div style="position: sticky; top: 0; background: var(--sys-terminal, rgba(10, 15, 20, 0.95)); z-index: 100; width: 100%; text-align: center; padding: 10px 0; border-bottom: 1px solid rgba(0, 243, 255, 0.3); margin-bottom: 15px; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);">`;
        gridHTML += `<span style="color: #00f3ff; font-size: 1rem; font-weight: bold; letter-spacing: 1px; text-shadow: 0 0 5px rgba(0, 243, 255, 0.5);">SLA: ${state.sla}% | L: ${state.lines} | S: ${state.score || 0} | OC: ${speedMultiplier.toFixed(1)}x</span>`;
        gridHTML += `</div>`;

        const colCount = state.grid.length > 0 ? state.grid[0].length : 10;
        const matrixBorder = '+' + '-'.repeat(colCount * 2) + '+<br/>';

        gridHTML += `<div>`;
        gridHTML += matrixBorder;

        const BLOCK_DNA = {
            1: { color: '#00f3ff', glow: 'rgba(0, 243, 255, 0.8)' },
            2: { color: '#ff00ff', glow: 'rgba(255, 0, 255, 0.8)' },
            3: { color: '#ff00ff', glow: 'rgba(255, 0, 255, 0.8)' },
            4: { color: '#ffaa00', glow: 'rgba(255, 170, 0, 0.8)' },
            5: { color: '#00ffcc', glow: 'rgba(0, 255, 204, 0.8)' },
            6: { color: '#8a2be2', glow: 'rgba(138, 43, 226, 0.8)' },
            7: { color: '#ff3366', glow: 'rgba(255, 51, 102, 0.8)' },
            'GHOST': { color: '#555555', glow: 'transparent' }
        };

        for (let r = 0; r < state.grid.length; r++) {
            gridHTML += `|`;
            for (let c = 0; c < state.grid[r].length; c++) {
                const cell = state.grid[r][c];

                if (cell === 0) {
                    gridHTML += ` .`;
                } else {
                    let blockType = (cell === 'GHOST') ? 'GHOST' : Math.abs(cell) % 10;
                    if (blockType === 0) blockType = 1;

                    const dna = BLOCK_DNA[blockType] || { color: '#ff007f', glow: 'rgba(255, 0, 127, 0.5)' };

                    gridHTML += `<span style="color: ${dna.color}; text-shadow: 0 0 5px ${dna.glow}; font-weight: bold;">[]</span>`;
                }
            }
            gridHTML += `|<br/>`;
        }
        gridHTML += matrixBorder + `</div></div>`;

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
        this.el.style.pointerEvents = 'auto';

        setTimeout(() => {
            if (this.input && this.el.classList.contains('visible')) {
                this.input.focus();
            }
        }, 100);

        if (this.gameInstance && this.gameInstance.state) {
            if (typeof this.gameInstance.resume === 'function') {
                this.gameInstance.resume();
            } else {
                this.gameInstance.state.isPaused = false;
            }

            const krayeboy = document.getElementById('krayeboy-controller');
            if (krayeboy) krayeboy.classList.remove('controls-hidden');

            this.gameRenderLoop = requestAnimationFrame(this.renderGame.bind(this));
            this.printLine('SYSTEM_RESUMED.', '#00ff00');
        }
    }

    hide() {
        this.el.classList.remove('visible');
        this.el.classList.remove('terminal-glitch-active');
        this.el.style.pointerEvents = 'none';

        if (this.gameInstance && this.gameInstance.state && this.gameInstance.state.isActive) {
            if (typeof this.gameInstance.pause === 'function') {
                this.gameInstance.pause();
            } else {
                this.gameInstance.state.isPaused = true;
            }

            const krayeboy = document.getElementById('krayeboy-controller');
            if (krayeboy) krayeboy.classList.add('controls-hidden');

            cancelAnimationFrame(this.gameRenderLoop);
        }
    }
}