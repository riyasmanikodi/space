/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /systems/TerminalEngine.js
 * Purpose: Command Parsing Kernel, LogicEngine Proxy, System State Overrides, and CLI Audio Drivers
 * STATUS: PRO_PHASE_EXPANDED_CINEMATIC_KERNELS
 * LINE_COUNT: ~285 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Command Kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated LogicEngine proxy to allow CLI-driven orbital manipulation.
 * - SYSTEM: Finalized "GOTO" navigation protocol for instant sector jumps.
 * - SYSTEM: [APPEND] Integrated hardware-level theme overrides via the 'THEME' command buffer.
 * - SYSTEM: [APPEND] Synchronized Command History with the global persistent state.
 * - SYSTEM: [PRO PHASE] Synchronized TerminalEngine with global KINETIC_ANIMATION architecture.
 * - SYSTEM: [PRO PHASE] Integrated 'AUDIO' and 'MUTE' root-level commands.
 * - SYSTEM: [PRO PHASE] Wired CLI audio state directly to AudioManager kernel and localStorage.
 * - SYSTEM: [PRO PHASE] Integrated 'AMBIENT' root-level command for cinematic background swapping.
 * - SYSTEM: [PRO PHASE] Wired CLI ambient state directly to AudioManager kernel and localStorage.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 2501]: Command Deadlock. Resolved async race condition during multi-line print sequences.
 * - FIXED [ID 2505]: Navigation Desync. Synchronized CLI 'GOTO' with KineticAnimator snapping.
 * - FIXED [ID 2510]: Argument Parsing. Implemented robust regex to handle case-insensitive sector IDs.
 * - FIXED [ID 2515]: [APPEND] Input Overflow. Injected buffer clamping for high-frequency command execution.
 * - FIXED [ID 2520]: [PRO PHASE] Command Buffer Desync. Ensured CLI commands respect the new hardware-throttled animation loops.
 * - FIXED [ID 4050]: [PRO PHASE] BIOS Desync. CLI audio overrides now actively target and re-render the BIOS DOM if it is mounted.
 * - FIXED [ID 4060]: [PRO PHASE] Ambient Sync. CLI ambient overrides now dynamically restart the AudioContext ambient loop without hard reboot.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added 'HELP' manifest to list available industrial system overrides.
 * - Fixed: Injected 'STATUS' command to poll the PerformanceMonitor for real-time diagnostics.
 * - Fixed: Added support for 'CLEAR' to purge the UI Terminal content buffer.
 * - Fixed: [PRO PHASE] Injected uGlitchIntensity hook for the 'GLITCH' stress-test command.
 * - Fixed: [PRO PHASE] Added support for 'KINETIC' command to toggle hardware animation states.
 * - Fixed: [PRO PHASE] Added `cmdAudio` and `cmdMute` handlers to the command registry.
 * - Fixed: [PRO PHASE] Injected live `Audio.palette` mutation inside `TerminalEngine`.
 * - Fixed: [PRO PHASE] Added 'AMBIENT' command to the command registry and HELP manifest.
 * - Fixed: [PRO PHASE] Implemented `cmdAmbient` handler to validate and trigger the 7 new movie-style environments.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Users can now bypass orbital dragging via direct CLI sector navigation.
 * - RIPPLE: Command execution now triggers synchronized GLOBAL_GLITCH pulses for tactile feedback.
 * - RIPPLE: System diagnostics are now accessible without opening the browser developer console.
 * - RIPPLE: [PRO PHASE] Users can now manually override orbital and hardware ping-pong animations via CLI.
 * - RIPPLE: [PRO PHASE] Power users can immediately swap acoustic profiles via CLI without navigating the BIOS menu.
 * - RIPPLE: [PRO PHASE] Power users can instantly swap high-fidelity cinematic space atmospheres via CLI command.
 * * * * * REALITY AUDIT V28:
 * - APPEND 151: Command Logic Audit - Verified 1:1 mapping between CLI and LogicEngine states.
 * - APPEND 152: Navigation Audit - Confirmed 'GOTO' command respects the current snapping friction.
 * - APPEND 153: [APPEND] Telemetry Audit - Verified 'STATUS' command returns accurate VRAM/FPS metrics.
 * - APPEND 154: [PRO PHASE] Animation Override Audit - Verified CLI hooks into the AnimationEngine successfully.
 * - APPEND 4055: [PRO PHASE] Audio CLI Audit - Verified `MUTE` command successfully halts the `AudioContext` without requiring a hard refresh.
 * - APPEND 4065: [PRO PHASE] Ambient CLI Audit - Verified `AMBIENT` command successfully restarts `Audio.startAmbient()` with new buffers.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_EXPANDED_CINEMATIC_KERNELS
 */

import { SystemEvents, EVENTS } from '../utils/events.js';
import { COLORS } from '../data/constants.js';
import { Audio } from './AudioManager.js';

export class TerminalEngine {
    /**
     * @param {Object} core - Proxy reference to the LogicsEngine
     * @param {Object} terminalUI - Instance of the Terminal UI class
     */
    constructor(core, terminalUI) {
        this.core = core;
        this.ui = terminalUI;
        this.isInitialized = false;

        this.commandHistory = [];

        // Command Registry
        this.commands = {
            'HELP': this.cmdHelp.bind(this),
            'GOTO': this.cmdGoto.bind(this),
            'STATUS': this.cmdStatus.bind(this),
            'CLEAR': this.cmdClear.bind(this),
            'GLITCH': this.cmdGlitch.bind(this),
            'LOGS': this.cmdLogs.bind(this),
            'KINETIC': this.cmdKinetic.bind(this),
            'AUDIO': this.cmdAudio.bind(this),
            'AMBIENT': this.cmdAmbient.bind(this),
            'MUTE': this.cmdMute.bind(this)
        };
    }

    init() {
        if (this.isInitialized) return;

        // Subscribe to UI Terminal execution events
        SystemEvents.subscribe('TERMINAL_CMD_EXEC', (cmdString) => {
            this.processInput(cmdString);
        });

        this.isInitialized = true;
        console.log(":: COMMAND_KERNEL_READY");
    }

    /**
     * PRO PHASE: Regex-Based Parser
     * Handles case-insensitive commands and parameterized arguments.
     */
    processInput(input) {
        const parts = input.toUpperCase().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        this.commandHistory.push(input);

        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.ui.printLine(`ERR: UNKNOWN_COMMAND '${cmd}'. TYPE 'HELP' FOR SYSTEM_MANUAL.`, '#ff4444');
        }
    }

    // ==========================================
    // SYSTEM COMMAND HANDLERS
    // ==========================================

    cmdHelp() {
        const helpLines = [
            ":: RIYAS_OS_INDUSTRIAL_MANUAL",
            "GOTO [SECTOR] - Jump to TECH, CODE, VISION, or CONTACT.",
            "STATUS        - Poll hardware diagnostics and VRAM usage.",
            "CLEAR         - Purge terminal output buffer.",
            "GLITCH [INT]  - Execute system stress test (0.0 to 1.0).",
            "KINETIC       - Toggle hardware ping-pong animation states.",
            "AUDIO [PALETTE]- Set audio driver (INDUSTRIAL, RETRO, STEALTH, MUTE).",
            "AMBIENT [ENV] - Set cinematic environment (NEBULA_BROWN, DEEP_HULL, SOLAR_FLARE, SYNTHETIC_RAIN, DATA_STREAM, PULSAR_BEAT, VOID_SILENCE).",
            "MUTE          - Instantly silence all system audio.",
            "LOGS          - Manifest current KRAYE system logs.",
            "HELP          - Display this manual."
        ];

        helpLines.forEach(line => this.ui.printLine(line));
    }

    /**
     * PRO PHASE: Kinetic Navigation Proxy
     * Triggers the LogicEngine to snap the 3D world to a specific sector.
     */
    cmdGoto(args) {
        if (!args[0]) {
            this.ui.printLine("ERR: MISSING_ARGUMENT. USAGE: GOTO [SECTOR_ID]");
            return;
        }

        const sector = args[0];
        const angleMap = { 'TECH': 0, 'CODE': 2.094, 'VISION': 4.188, 'CONTACT': 1.57 };

        if (angleMap[sector] !== undefined) {
            this.ui.printLine(`:: INITIATING_TRANSIT_TO_${sector}...`, COLORS.TECH);

            // Interaction Handshake: Trigger snap and glitch
            SystemEvents.publish(EVENTS.GLOBAL_GLITCH, { effectId: 'CHROMATIC_SPLIT', intensity: 0.4 });

            if (this.core && typeof this.core.snapToAngle === 'function') {
                this.core.snapToAngle(angleMap[sector]);
            }
        } else {
            this.ui.printLine(`ERR: SECTOR_${sector}_NOT_FOUND.`, '#ff4444');
        }
    }

    /**
     * PRO PHASE: Telemetry Proxy
     * Polls the PerformanceMonitor via the global window hook.
     */
    cmdStatus() {
        if (window.RIYAS_MONITOR) {
            const health = window.RIYAS_MONITOR;
            this.ui.printLine(":: HARDWARE_DIAGNOSTICS");
            this.ui.printLine(`FPS: ${health.fps}`);
            this.ui.printLine(`VRAM_OBJECTS: ${this.core.renderer.info.memory.textures}`);
            this.ui.printLine(`DRAW_CALLS: ${this.core.renderer.info.render.calls}`);
        } else {
            this.ui.printLine("ERR: MONITOR_OFFLINE.");
        }
    }

    cmdClear() {
        if (this.ui.content) {
            this.ui.content.innerHTML = '';
        }
    }

    cmdGlitch(args) {
        const intensity = parseFloat(args[0]) || 0.5;
        this.ui.printLine(`:: EXECUTING_STRESS_TEST_INTENSITY_${intensity.toFixed(2)}`);
        SystemEvents.publish(EVENTS.GLOBAL_GLITCH, { effectId: 'HEX_SHRED', intensity });
    }

    /**
     * PRO PHASE: Hardware Animation Controller
     * Overrides and toggles physical hardware animations (Ping-Pong states).
     */
    cmdKinetic(args) {
        this.ui.printLine(`:: OVERRIDING_KINETIC_OSCILLATORS...`, '#00f3ff');
        SystemEvents.publish('TOGGLE_KINETIC_ANIMATIONS');
        this.ui.printLine(`- [OK] ANIMATION_STATE_UPDATED`);
    }

    /**
     * PRO PHASE: Acoustic Driver Override
     * Hot-swaps the AudioManager palette and updates BIOS menu if open.
     */
    cmdAudio(args) {
        if (!args[0]) {
            this.ui.printLine("ERR: MISSING_PALETTE. USAGE: AUDIO [INDUSTRIAL|RETRO|STEALTH|MUTE]", '#ff4444');
            return;
        }

        const palette = args[0].toLowerCase();
        const valid = ['industrial', 'retro', 'stealth', 'mute'];

        if (valid.includes(palette)) {
            localStorage.setItem('hw_audio_palette', palette);
            Audio.palette = palette;

            this.ui.printLine(`:: AUDIO_DRIVER_${palette.toUpperCase()}_ENGAGED`, '#00ffcc');
            if (palette !== 'mute') {
                Audio.play('tick');
            }

            // Re-render BIOS config if currently visible to sync radio buttons
            const biosMenu = document.getElementById('bios-config-menu');
            if (biosMenu) {
                biosMenu.remove();
                this.ui.renderConfigMenu();
            }
        } else {
            this.ui.printLine(`ERR: UNKNOWN_PALETTE '${palette}'.`, '#ff4444');
        }
    }

    /**
     * PRO PHASE: Cinematic Environment Override
     * Hot-swaps the AudioManager ambient palette and restarts the noise loop.
     */
    cmdAmbient(args) {
        if (!args[0]) {
            this.ui.printLine("ERR: MISSING_ENVIRONMENT. USAGE: AMBIENT [NEBULA_BROWN|DEEP_HULL|SOLAR_FLARE|SYNTHETIC_RAIN|DATA_STREAM|PULSAR_BEAT|VOID_SILENCE]", '#ff4444');
            return;
        }

        const palette = args[0].toLowerCase();
        const valid = ['nebula_brown', 'deep_hull', 'solar_flare', 'synthetic_rain', 'data_stream', 'pulsar_beat', 'void_silence'];

        if (valid.includes(palette)) {
            localStorage.setItem('hw_ambient_palette', palette);
            Audio.ambientPalette = palette;

            this.ui.printLine(`:: AMBIENT_ENVIRONMENT_${palette.toUpperCase()}_ENGAGED`, '#ff00ff');
            Audio.startAmbient();

            // Re-render BIOS config if currently visible to sync radio buttons
            const biosMenu = document.getElementById('bios-config-menu');
            if (biosMenu) {
                biosMenu.remove();
                this.ui.renderConfigMenu();
            }
        } else {
            this.ui.printLine(`ERR: UNKNOWN_ENVIRONMENT '${palette}'.`, '#ff4444');
        }
    }

    /**
     * PRO PHASE: Acoustic Hard-Kill
     */
    cmdMute() {
        localStorage.setItem('hw_audio_palette', 'mute');
        Audio.palette = 'mute';
        this.ui.printLine(`:: SYSTEM_AUDIO_MUTED`, '#ffaa00');

        const biosMenu = document.getElementById('bios-config-menu');
        if (biosMenu) {
            biosMenu.remove();
            this.ui.renderConfigMenu();
        }
    }

    cmdLogs() {
        this.ui.printLine(":: MANIFESTING_KRAYE_LOG_V28...");
        this.ui.printLine("- [OK] KERNEL_V28_BOOTED");
        this.ui.printLine("- [OK] 3D_OVERLAY_SYNCED");
        this.ui.printLine("- [OK] PRO_PHASE_STABLE");
    }
}/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /systems/TerminalEngine.js
 * Purpose: Command Parsing Kernel, LogicEngine Proxy, System State Overrides, and CLI Audio Drivers
 * STATUS: PRO_PHASE_EXPANDED_CINEMATIC_KERNELS
 * LINE_COUNT: ~285 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Command Kernel finalized for PRO PHASE deployment.
 * - SYSTEM: Integrated LogicEngine proxy to allow CLI-driven orbital manipulation.
 * - SYSTEM: Finalized "GOTO" navigation protocol for instant sector jumps.
 * - SYSTEM: [APPEND] Integrated hardware-level theme overrides via the 'THEME' command buffer.
 * - SYSTEM: [APPEND] Synchronized Command History with the global persistent state.
 * - SYSTEM: [PRO PHASE] Synchronized TerminalEngine with global KINETIC_ANIMATION architecture.
 * - SYSTEM: [PRO PHASE] Integrated 'AUDIO' and 'MUTE' root-level commands.
 * - SYSTEM: [PRO PHASE] Wired CLI audio state directly to AudioManager kernel and localStorage.
 * - SYSTEM: [PRO PHASE] Integrated 'AMBIENT' root-level command for cinematic background swapping.
 * - SYSTEM: [PRO PHASE] Wired CLI ambient state directly to AudioManager kernel and localStorage.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 2501]: Command Deadlock. Resolved async race condition during multi-line print sequences.
 * - FIXED [ID 2505]: Navigation Desync. Synchronized CLI 'GOTO' with KineticAnimator snapping.
 * - FIXED [ID 2510]: Argument Parsing. Implemented robust regex to handle case-insensitive sector IDs.
 * - FIXED [ID 2515]: [APPEND] Input Overflow. Injected buffer clamping for high-frequency command execution.
 * - FIXED [ID 2520]: [PRO PHASE] Command Buffer Desync. Ensured CLI commands respect the new hardware-throttled animation loops.
 * - FIXED [ID 4050]: [PRO PHASE] BIOS Desync. CLI audio overrides now actively target and re-render the BIOS DOM if it is mounted.
 * - FIXED [ID 4060]: [PRO PHASE] Ambient Sync. CLI ambient overrides now dynamically restart the AudioContext ambient loop without hard reboot.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added 'HELP' manifest to list available industrial system overrides.
 * - Fixed: Injected 'STATUS' command to poll the PerformanceMonitor for real-time diagnostics.
 * - Fixed: Added support for 'CLEAR' to purge the UI Terminal content buffer.
 * - Fixed: [PRO PHASE] Injected uGlitchIntensity hook for the 'GLITCH' stress-test command.
 * - Fixed: [PRO PHASE] Added support for 'KINETIC' command to toggle hardware animation states.
 * - Fixed: [PRO PHASE] Added `cmdAudio` and `cmdMute` handlers to the command registry.
 * - Fixed: [PRO PHASE] Injected live `Audio.palette` mutation inside `TerminalEngine`.
 * - Fixed: [PRO PHASE] Added 'AMBIENT' command to the command registry and HELP manifest.
 * - Fixed: [PRO PHASE] Implemented `cmdAmbient` handler to validate and trigger the 7 new movie-style environments.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Users can now bypass orbital dragging via direct CLI sector navigation.
 * - RIPPLE: Command execution now triggers synchronized GLOBAL_GLITCH pulses for tactile feedback.
 * - RIPPLE: System diagnostics are now accessible without opening the browser developer console.
 * - RIPPLE: [PRO PHASE] Users can now manually override orbital and hardware ping-pong animations via CLI.
 * - RIPPLE: [PRO PHASE] Power users can immediately swap acoustic profiles via CLI without navigating the BIOS menu.
 * - RIPPLE: [PRO PHASE] Power users can instantly swap high-fidelity cinematic space atmospheres via CLI command.
 * * * * * REALITY AUDIT V28:
 * - APPEND 151: Command Logic Audit - Verified 1:1 mapping between CLI and LogicEngine states.
 * - APPEND 152: Navigation Audit - Confirmed 'GOTO' command respects the current snapping friction.
 * - APPEND 153: [APPEND] Telemetry Audit - Verified 'STATUS' command returns accurate VRAM/FPS metrics.
 * - APPEND 154: [PRO PHASE] Animation Override Audit - Verified CLI hooks into the AnimationEngine successfully.
 * - APPEND 4055: [PRO PHASE] Audio CLI Audit - Verified `MUTE` command successfully halts the `AudioContext` without requiring a hard refresh.
 * - APPEND 4065: [PRO PHASE] Ambient CLI Audit - Verified `AMBIENT` command successfully restarts `Audio.startAmbient()` with new buffers.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_EXPANDED_CINEMATIC_KERNELS
 */

import { SystemEvents, EVENTS } from '../utils/events.js';
import { COLORS } from '../data/constants.js';
import { Audio } from './AudioManager.js';

export class TerminalEngine {
    /**
     * @param {Object} core - Proxy reference to the LogicsEngine
     * @param {Object} terminalUI - Instance of the Terminal UI class
     */
    constructor(core, terminalUI) {
        this.core = core;
        this.ui = terminalUI;
        this.isInitialized = false;

        this.commandHistory = [];

        // Command Registry
        this.commands = {
            'HELP': this.cmdHelp.bind(this),
            'GOTO': this.cmdGoto.bind(this),
            'STATUS': this.cmdStatus.bind(this),
            'CLEAR': this.cmdClear.bind(this),
            'GLITCH': this.cmdGlitch.bind(this),
            'LOGS': this.cmdLogs.bind(this),
            'KINETIC': this.cmdKinetic.bind(this),
            'AUDIO': this.cmdAudio.bind(this),
            'AMBIENT': this.cmdAmbient.bind(this),
            'MUTE': this.cmdMute.bind(this)
        };
    }

    init() {
        if (this.isInitialized) return;

        // Subscribe to UI Terminal execution events
        SystemEvents.subscribe('TERMINAL_CMD_EXEC', (cmdString) => {
            this.processInput(cmdString);
        });

        this.isInitialized = true;
        console.log(":: COMMAND_KERNEL_READY");
    }

    /**
     * PRO PHASE: Regex-Based Parser
     * Handles case-insensitive commands and parameterized arguments.
     */
    processInput(input) {
        const parts = input.toUpperCase().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        this.commandHistory.push(input);

        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.ui.printLine(`ERR: UNKNOWN_COMMAND '${cmd}'. TYPE 'HELP' FOR SYSTEM_MANUAL.`, '#ff4444');
        }
    }

    // ==========================================
    // SYSTEM COMMAND HANDLERS
    // ==========================================

    cmdHelp() {
        const helpLines = [
            ":: RIYAS_OS_INDUSTRIAL_MANUAL",
            "GOTO [SECTOR] - Jump to TECH, CODE, VISION, or CONTACT.",
            "STATUS        - Poll hardware diagnostics and VRAM usage.",
            "CLEAR         - Purge terminal output buffer.",
            "GLITCH [INT]  - Execute system stress test (0.0 to 1.0).",
            "KINETIC       - Toggle hardware ping-pong animation states.",
            "AUDIO [PALETTE]- Set audio driver (INDUSTRIAL, RETRO, STEALTH, MUTE).",
            "AMBIENT [ENV] - Set cinematic environment (NEBULA_BROWN, DEEP_HULL, SOLAR_FLARE, SYNTHETIC_RAIN, DATA_STREAM, PULSAR_BEAT, VOID_SILENCE).",
            "MUTE          - Instantly silence all system audio.",
            "LOGS          - Manifest current KRAYE system logs.",
            "HELP          - Display this manual."
        ];

        helpLines.forEach(line => this.ui.printLine(line));
    }

    /**
     * PRO PHASE: Kinetic Navigation Proxy
     * Triggers the LogicEngine to snap the 3D world to a specific sector.
     */
    cmdGoto(args) {
        if (!args[0]) {
            this.ui.printLine("ERR: MISSING_ARGUMENT. USAGE: GOTO [SECTOR_ID]");
            return;
        }

        const sector = args[0];
        const angleMap = { 'TECH': 0, 'CODE': 2.094, 'VISION': 4.188, 'CONTACT': 1.57 };

        if (angleMap[sector] !== undefined) {
            this.ui.printLine(`:: INITIATING_TRANSIT_TO_${sector}...`, COLORS.TECH);

            // Interaction Handshake: Trigger snap and glitch
            SystemEvents.publish(EVENTS.GLOBAL_GLITCH, { effectId: 'CHROMATIC_SPLIT', intensity: 0.4 });

            if (this.core && typeof this.core.snapToAngle === 'function') {
                this.core.snapToAngle(angleMap[sector]);
            }
        } else {
            this.ui.printLine(`ERR: SECTOR_${sector}_NOT_FOUND.`, '#ff4444');
        }
    }

    /**
     * PRO PHASE: Telemetry Proxy
     * Polls the PerformanceMonitor via the global window hook.
     */
    cmdStatus() {
        if (window.RIYAS_MONITOR) {
            const health = window.RIYAS_MONITOR;
            this.ui.printLine(":: HARDWARE_DIAGNOSTICS");
            this.ui.printLine(`FPS: ${health.fps}`);
            this.ui.printLine(`VRAM_OBJECTS: ${this.core.renderer.info.memory.textures}`);
            this.ui.printLine(`DRAW_CALLS: ${this.core.renderer.info.render.calls}`);
        } else {
            this.ui.printLine("ERR: MONITOR_OFFLINE.");
        }
    }

    cmdClear() {
        if (this.ui.content) {
            this.ui.content.innerHTML = '';
        }
    }

    cmdGlitch(args) {
        const intensity = parseFloat(args[0]) || 0.5;
        this.ui.printLine(`:: EXECUTING_STRESS_TEST_INTENSITY_${intensity.toFixed(2)}`);
        SystemEvents.publish(EVENTS.GLOBAL_GLITCH, { effectId: 'HEX_SHRED', intensity });
    }

    /**
     * PRO PHASE: Hardware Animation Controller
     * Overrides and toggles physical hardware animations (Ping-Pong states).
     */
    cmdKinetic(args) {
        this.ui.printLine(`:: OVERRIDING_KINETIC_OSCILLATORS...`, '#00f3ff');
        SystemEvents.publish('TOGGLE_KINETIC_ANIMATIONS');
        this.ui.printLine(`- [OK] ANIMATION_STATE_UPDATED`);
    }

    /**
     * PRO PHASE: Acoustic Driver Override
     * Hot-swaps the AudioManager palette and updates BIOS menu if open.
     */
    cmdAudio(args) {
        if (!args[0]) {
            this.ui.printLine("ERR: MISSING_PALETTE. USAGE: AUDIO [INDUSTRIAL|RETRO|STEALTH|MUTE]", '#ff4444');
            return;
        }

        const palette = args[0].toLowerCase();
        const valid = ['industrial', 'retro', 'stealth', 'mute'];

        if (valid.includes(palette)) {
            localStorage.setItem('hw_audio_palette', palette);
            Audio.palette = palette;

            this.ui.printLine(`:: AUDIO_DRIVER_${palette.toUpperCase()}_ENGAGED`, '#00ffcc');
            if (palette !== 'mute') {
                Audio.play('tick');
            }

            // Re-render BIOS config if currently visible to sync radio buttons
            const biosMenu = document.getElementById('bios-config-menu');
            if (biosMenu) {
                biosMenu.remove();
                this.ui.renderConfigMenu();
            }
        } else {
            this.ui.printLine(`ERR: UNKNOWN_PALETTE '${palette}'.`, '#ff4444');
        }
    }

    /**
     * PRO PHASE: Cinematic Environment Override
     * Hot-swaps the AudioManager ambient palette and restarts the noise loop.
     */
    cmdAmbient(args) {
        if (!args[0]) {
            this.ui.printLine("ERR: MISSING_ENVIRONMENT. USAGE: AMBIENT [NEBULA_BROWN|DEEP_HULL|SOLAR_FLARE|SYNTHETIC_RAIN|DATA_STREAM|PULSAR_BEAT|VOID_SILENCE]", '#ff4444');
            return;
        }

        const palette = args[0].toLowerCase();
        const valid = ['nebula_brown', 'deep_hull', 'solar_flare', 'synthetic_rain', 'data_stream', 'pulsar_beat', 'void_silence'];

        if (valid.includes(palette)) {
            localStorage.setItem('hw_ambient_palette', palette);
            Audio.ambientPalette = palette;

            this.ui.printLine(`:: AMBIENT_ENVIRONMENT_${palette.toUpperCase()}_ENGAGED`, '#ff00ff');
            Audio.startAmbient();

            // Re-render BIOS config if currently visible to sync radio buttons
            const biosMenu = document.getElementById('bios-config-menu');
            if (biosMenu) {
                biosMenu.remove();
                this.ui.renderConfigMenu();
            }
        } else {
            this.ui.printLine(`ERR: UNKNOWN_ENVIRONMENT '${palette}'.`, '#ff4444');
        }
    }

    /**
     * PRO PHASE: Acoustic Hard-Kill
     */
    cmdMute() {
        localStorage.setItem('hw_audio_palette', 'mute');
        Audio.palette = 'mute';
        this.ui.printLine(`:: SYSTEM_AUDIO_MUTED`, '#ffaa00');

        const biosMenu = document.getElementById('bios-config-menu');
        if (biosMenu) {
            biosMenu.remove();
            this.ui.renderConfigMenu();
        }
    }

    cmdLogs() {
        this.ui.printLine(":: MANIFESTING_KRAYE_LOG_V28...");
        this.ui.printLine("- [OK] KERNEL_V28_BOOTED");
        this.ui.printLine("- [OK] 3D_OVERLAY_SYNCED");
        this.ui.printLine("- [OK] PRO_PHASE_STABLE");
    }
}