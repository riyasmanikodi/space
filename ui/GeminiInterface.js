/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /ui/GeminiInterface.js
 * Purpose: Self-Bootstrapping UI, Neural Trigger, and Cognitive Shard Manifestation
 * STATUS: PRO_PHASE_NEURAL_UI_LOCKED
 * LINE_COUNT: ~275 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Initialized Self-Bootstrapping Neural Interface.
 * - SYSTEM: Integrated zero-modification DOM and CSS injection pipeline.
 * - SYSTEM: Partitioned Neural Shard UI strictly away from the Developer Terminal.
 * - SYSTEM: [PRO PHASE] Wired GeminiFormatter to the cognitive output buffer.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 8301]: Z-Index Occlusion. Enforced z-index: 10001 for the Neural Shard to sit above planetary geometry but below the manual Terminal.
 * - FIXED [ID 8302]: Event Bubbling. Isolated keydown events inside the Neural Input to prevent triggering global OS shortcuts.
 * - FIXED [ID 8305]: Scroll Lock. Implemented auto-scroll-to-bottom for the conversation buffer during Typewriter materialization.
 * - FIXED [ID 8603]: Formatter Bypass. Imported GeminiFormatter and routed AI responses through the process() pipeline to convert Markdown/LaTeX to industrial HTML.
 * * * * * OMISSION LOG V28:
 * - Fixed: Injected CSS variables for the Ultraviolet/Amber 'Neural Spectrum'.
 * - Fixed: Added 'NEURAL_QUERY_STARTED' and 'COMPLETED' subscriptions to control UI loading states (glow pulses).
 * - Fixed: Added close button logic to safely collapse the Cognitive Shard.
 * - Fixed: Swapped msgDiv.innerText for msgDiv.innerHTML exclusively for formatted AI payloads.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: AI integration requires zero edits to index.html or style.css, adhering to the Module-Addition-Only protocol.
 * - RIPPLE: The background universe dynamically slows its rotation when the Neural Shard is active.
 * - RIPPLE: The Gemini Trigger button pulses with intense Ultraviolet energy when waiting for an API response.
 * - RIPPLE: AI responses now strictly adhere to the industrial UI aesthetic, properly rendering code blocks, lists, and math arrays.
 * * * * * REALITY AUDIT V28:
 * - APPEND 930: DOM Purity - Verified injection does not overwrite existing UI layer children.
 * - APPEND 931: State Isolation - Verified opening the Neural Shard does not force the Terminal to close, supporting parallel operation.
 * - APPEND 961: Formatter Pipeline Audit - Verified XSS sanitization occurs inside GeminiFormatter before innerHTML injection.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_NEURAL_UI_LOCKED
 */

import { SystemEvents } from '../utils/events.js';
import { GeminiIntelligence } from '../systems/GeminiIntelligence.js';
import { GeminiFormatter } from '../utils/GeminiFormatter.js';

class NeuralInterfaceManager {
    constructor() {
        this.isInitialized = false;
        this.isOpen = false;
        this.outputBuffer = null;
        this.inputField = null;
    }

    /**
     * Executes the Shadow Injection Strategy.
     * Call this from main.js to bootstrap the entire Gemini Flash UI.
     */
    init(apiKey = null) {
        if (this.isInitialized) return;

        this._injectCSS();
        this._injectDOM();
        this._bindEvents();

        if (apiKey) {
            GeminiIntelligence.initialize(apiKey);
        }

        this.isInitialized = true;
        console.log(":: NEURAL_INTERFACE_BOOTSTRAPPED // COGNITIVE_UI_ACTIVE");
    }

    _injectCSS() {
        const style = document.createElement('style');
        style.id = 'gemini-neural-styles';
        style.innerHTML = `
            :root {
                --neural-core: #8a2be2;
                --neural-pulse: #ffaa00;
                --neural-glow: rgba(138, 43, 226, 0.6);
            }

            /* NEURAL TRIGGER (Bottom Left) */
            #gemini-trigger {
                position: absolute;
                bottom: 40px;
                left: 40px;
                width: 60px;
                height: 60px;
                z-index: 10002;
                cursor: pointer;
                pointer-events: auto;
                transition: transform 0.3s cubic-bezier(0.1, 0.7, 0.1, 1), filter 0.3s ease;
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
            }

            .neural-frame {
                position: relative;
                width: 100%;
                height: 100%;
                background: rgba(10, 5, 20, 0.7);
                border: 2px solid var(--neural-core);
                clip-path: polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                transition: background 0.3s ease;
                backdrop-filter: blur(8px);
            }

            .neural-glyph {
                position: relative;
                z-index: 3;
                font-family: var(--font-mono);
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--neural-pulse);
                text-shadow: 0 0 8px var(--neural-pulse);
            }

            .neural-processing .neural-frame {
                animation: neural-shiver 0.2s infinite alternate;
                border-color: var(--neural-pulse);
            }

            /* COGNITIVE SHARD (The Chat UI) */
            #neural-shard-container {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.95);
                width: 700px;
                max-width: 90vw;
                height: 500px;
                max-height: 80vh;
                background: linear-gradient(135deg, rgba(15, 5, 25, 0.9) 0%, rgba(5, 0, 10, 0.95) 100%);
                border: 1px solid var(--neural-core);
                border-top: 4px solid var(--neural-core);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), inset 0 0 30px rgba(138, 43, 226, 0.15);
                z-index: 10001;
                display: flex;
                flex-direction: column;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.1, 0.7, 0.1, 1);
                backdrop-filter: blur(15px);
            }

            #neural-shard-container.visible {
                opacity: 1;
                pointer-events: auto;
                transform: translate(-50%, -50%) scale(1);
            }

            .neural-header {
                padding: 12px 20px;
                background: rgba(138, 43, 226, 0.1);
                border-bottom: 1px solid var(--neural-core);
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: var(--neural-core);
                font-weight: bold;
                letter-spacing: 2px;
                font-size: 0.85rem;
            }

            .neural-close {
                cursor: pointer;
                color: #ff0055;
                font-size: 1.2rem;
            }

            .neural-output {
                flex-grow: 1;
                padding: 20px;
                overflow-y: auto;
                color: #e0f8ff;
                font-size: 0.9rem;
                line-height: 1.6;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .neural-msg {
                padding: 10px 15px;
                border-left: 2px solid transparent;
                background: rgba(255, 255, 255, 0.02);
            }

            .neural-msg.human {
                border-left-color: var(--accent-tech, #00f3ff);
                align-self: flex-start;
                width: 80%;
            }

            .neural-msg.ai {
                border-left-color: var(--neural-pulse);
                background: rgba(138, 43, 226, 0.05);
                align-self: flex-end;
                width: 90%;
            }

            .neural-input-wrap {
                display: flex;
                padding: 15px 20px;
                border-top: 1px solid rgba(138, 43, 226, 0.3);
                background: rgba(0, 0, 0, 0.5);
            }

            #neural-input {
                flex-grow: 1;
                background: transparent;
                border: none;
                color: var(--neural-pulse);
                font-family: var(--font-mono);
                font-size: 1rem;
                outline: none;
            }

            @keyframes neural-shiver {
                0% { box-shadow: 0 0 10px var(--neural-glow); transform: translate(0, 0); }
                100% { box-shadow: 0 0 25px var(--neural-pulse); transform: translate(-1px, 1px); }
            }

            @media (max-width: 768px) {
                #gemini-trigger { bottom: 120px; left: 20px; width: 50px; height: 50px; }
                #neural-shard-container { width: 100vw; height: 100%; top: 0; left: 0; transform: none !important; border: none; }
                #neural-shard-container.visible { transform: none !important; }
            }
        `;
        document.head.appendChild(style);
    }

    _injectDOM() {
        const uiLayer = document.getElementById('ui-layer');
        if (!uiLayer) return;

        const triggerHTML = `
            <div id="gemini-trigger" class="gemini-trigger">
                <div class="neural-frame">
                    <div class="neural-glyph">⚡</div>
                </div>
            </div>
        `;
        uiLayer.insertAdjacentHTML('beforeend', triggerHTML);

        const shardHTML = `
            <div id="neural-shard-container">
                <div class="neural-header">
                    <span>COGNITIVE_CORE // GEMINI_FLASH_3.1</span>
                    <span id="neural-close" class="neural-close">×</span>
                </div>
                <div id="neural-output" class="neural-output">
                    <div class="neural-msg ai">SYSTEM_ONLINE. NEURAL_UPLINK_ESTABLISHED.</div>
                </div>
                <div class="neural-input-wrap">
                    <span style="color:var(--neural-core); margin-right:10px;">[QUERY]></span>
                    <input type="text" id="neural-input" autocomplete="off" spellcheck="false" placeholder="Awaiting Input...">
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', shardHTML);

        this.outputBuffer = document.getElementById('neural-output');
        this.inputField = document.getElementById('neural-input');
    }

    _bindEvents() {
        const trigger = document.getElementById('gemini-trigger');
        const closeBtn = document.getElementById('neural-close');

        if (trigger) {
            trigger.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleShard();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggleShard(false));
        }

        if (this.inputField) {
            this.inputField.addEventListener('keydown', (e) => {
                e.stopPropagation(); // Prevent terminal shortcuts from firing
                if (e.key === 'Enter') {
                    const text = this.inputField.value.trim();
                    if (text !== '') {
                        this._handleUserInput(text);
                        this.inputField.value = '';
                    }
                }
            });
        }

        SystemEvents.subscribe('NEURAL_QUERY_STARTED', () => {
            if (trigger) trigger.classList.add('neural-processing');
        });

        SystemEvents.subscribe('NEURAL_QUERY_COMPLETED', () => {
            if (trigger) trigger.classList.remove('neural-processing');
        });

        SystemEvents.subscribe('NEURAL_RESPONSE_RECEIVED', (payload) => {
            this._renderMessage('ai', payload.text, payload.status === 'error');
        });
    }

    toggleShard(forceState = null) {
        const shard = document.getElementById('neural-shard-container');
        if (!shard) return;

        this.isOpen = forceState !== null ? forceState : !this.isOpen;

        if (this.isOpen) {
            shard.classList.add('visible');
            if (this.inputField) this.inputField.focus();
            SystemEvents.publish('NEURAL_UPLINK_OPENED');
        } else {
            shard.classList.remove('visible');
            SystemEvents.publish('NEURAL_UPLINK_CLOSED');
        }
    }

    _handleUserInput(text) {
        this._renderMessage('human', text);

        if (!GeminiIntelligence.isKernelActive()) {
            this._renderMessage('ai', '[SYS_ERR]: API_KEY_MISSING. INITIALIZE KERNEL FIRST.', true);
            return;
        }

        GeminiIntelligence.processQuery(text);
    }

    _renderMessage(role, text, isError = false) {
        if (!this.outputBuffer) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `neural-msg ${role}`;

        if (isError) {
            msgDiv.style.color = '#ff0055';
            msgDiv.style.borderLeftColor = '#ff0055';
            msgDiv.innerText = text;
        } else if (role === 'ai') {
            // Push text through the Neural Formatter to parse Markdown/LaTeX
            msgDiv.innerHTML = GeminiFormatter.process(text);
        } else {
            // Human input remains strictly text to prevent injection
            msgDiv.innerText = text;
        }

        this.outputBuffer.appendChild(msgDiv);
        this.outputBuffer.scrollTop = this.outputBuffer.scrollHeight;

        // Trigger generic OS tick sound for materialization
        SystemEvents.publish('TYPEWRITER_TICK', { sectorId: 'VISION' });
    }
}

export const GeminiInterface = new NeuralInterfaceManager();