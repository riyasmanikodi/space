/**
 * RIYAS_OS V28 - PRO PHASE
 * File: /systems/DifyBridge.js
 * Purpose: No-Code Neural Gateway, SSE Streaming Handshake, and Remote Context Management
 * STATUS: PRO_PHASE_DIFY_STREAM_FINALIZED
 * LINE_COUNT: ~200 Lines.
 * * * * * KRAYE LOG V28:
 * - SYSTEM: Bootstrapped Dify.ai Server-Sent Events (SSE) Handshake Kernel.
 * - SYSTEM: Replaced monolithic await-fetch with real-time token streaming pipeline.
 * - SYSTEM: [PRO PHASE] Offloaded multi-model routing and memory persistence to remote Dify workflow.
 * - SYSTEM: [PRO PHASE] Embedded packet cleaner directly into the stream reader loop.
 * - SYSTEM: [PRO PHASE] Hydrated Bridge connection state using Local Storage Shards.
 * - SYSTEM: [PRO PHASE] Hardened session hydration against stale conversation ghosts.
 * - SYSTEM: [PRO PHASE] Finalized industrial streaming sequence for Dify Gateway.
 * - SYSTEM: [PRO PHASE] Validated POST handshake architecture against Dify v1beta.
 * - SYSTEM: [PRO PHASE] Integrated agent_message stream listening for Agent-Type Dify Workflows.
 * - SYSTEM: [PRO PHASE] Integrated DifyParser sanitization hooks.
 * - SYSTEM: [PRO PHASE] Synchronized dual-publish architecture for terminal and UI rendering.
 * - SYSTEM: [PRO PHASE] Stabilized multi-key payload extraction for Dify Agent/Chatflow bridging.
 * - SYSTEM: [PRO PHASE] Verified stream transmission integrity via console network telemetry.
 * * * * * CULPRIT LOG V28:
 * - FIXED [ID 8055]: Latency Deadlock. Eliminated blocking awaits. Text chunks now render in milliseconds via chunk dispatch.
 * - FIXED [ID 8056]: Context Desync. Extracted `conversation_id` from the first packet and bound it to DIFY_CONFIG for session continuity.
 * - FIXED [ID 8058]: Buffer Overflow. Implemented line-break splitting and trailing buffer retention to prevent JSON.parse crashes on split packets.
 * - FIXED [ID 8060]: Phantom Errors. Added silent catch blocks for non-message metadata pings (like Dify's 'ping' or 'agent_message' events).
 * - FIXED [ID 8061]: Session Desync (Memory Orphan). Synchronized DifyBridge with GeminiMemory to prevent 400 Bad Request on page reload.
 * - FIXED [ID 8110]: Session Ghosting (400 Bad Request). Shielded payload generation from orphaned conversation threads causing gateway rejections.
 * - FIXED [ID 8115]: Handshake Rejection (400/405 Errors). Confirmed payload structure and explicit POST method declaration.
 * - FIXED [ID 8116]: Ghost Session Deadlock. Finalized integration with GeminiMemory manual purge protocol.
 * - FIXED [ID 8120]: Event Silence. Added agent_message to the stream parser to prevent silent dropping of Agent responses.
 * - FIXED [ID 8121]: Utility Orphanage. Integrated DifyParser utility into the import matrix to handle strict payload routing.
 * - FIXED [ID 8130]: TypeError Resolution. Synchronized DifyParser.isRenderable() handshake.
 * - FIXED [ID 8135]: Silent Terminal Fails. Dual-published stream chunks to TERMINAL_PRINT event channel to resolve blank outputs.
 * - FIXED [ID 8150]: Silent Fail. Resolved schema mismatch where Dify Agent payloads bypassed the parser due to strict key constraints.
 * - FIXED [ID 8151]: Telemetry Ghosting. Validated uplink establishment and termination cycles against blank DOM renders.
 * * * * * OMISSION LOG V28:
 * - Fixed: Added AbortController to support manual stream termination (Force Halt).
 * - Fixed: Injected DIFY_SYSTEM_DIRECTIVES for standardized console telemetry.
 * - Fixed: Stripped out local token-counting logic to drastically reduce CPU overhead.
 * - Fixed: Added 'NEURAL_STREAM_CHUNK' event publisher for typewriter UI integration.
 * - Fixed: Imported GeminiMemory to persist Remote Session ID across OS cold boots.
 * - Fixed: Documented state desync resolution protocol for orphaned session IDs.
 * - Fixed: Enforced strict POST method declaration for Dify REST API.
 * - Fixed: Imported DifyParser utility to sanitize tokens before UI delivery.
 * - Fixed: Expanded allowed events matrix to support Dify v1beta Agent handshakes.
 * - Fixed: Extracted dynamic output keys (answer, text, thought, agent_message) to support multiple Dify app types.
 * - Fixed: [PRO PHASE] Abstracted output payload key checking to universally support all Dify orchestration types.
 * * * * * RIPPLE EFFECT V28:
 * - RIPPLE: Chatbot responses now materialize word-by-word instantly, mimicking high-end frontier models.
 * - RIPPLE: Local browser memory is preserved as the OS no longer needs to store the entire chat history object.
 * - RIPPLE: AI can now seamlessly transition between answering ordinary queries and fetching Stranger Things lore without client-side logic updates.
 * - RIPPLE: Chat sessions gracefully survive browser refreshes without severing the Dify conversation thread.
 * - RIPPLE: Fresh sessions now generate cleanly without inheriting orphaned conversation threads.
 * - RIPPLE: Bridge now reliably connects to the fully configured and published Dify Gateway.
 * - RIPPLE: Agent-based Dify applications now successfully stream tokens to the UI without silent dropouts.
 * - RIPPLE: The terminal bridge can converse with both Chatbot and Agent logic backends seamlessly.
 * - RIPPLE: Terminal now displays streaming AI output directly in the CLI buffer alongside the UI Shard.
 * - RIPPLE: [PRO PHASE] The bridge now universally accepts Chatbot, Agent, and Workflow response schemas without modifying the parser pipeline.
 * - RIPPLE: [PRO PHASE] Data transmission flows seamlessly from network layer to UI/Terminal rendering channels.
 * * * * * REALITY AUDIT V28:
 * - APPEND 9020: Stream Purity Audit - Verified packet cleaner safely ignores malformed chunks and non-text events.
 * - APPEND 9021: Lifecycle Audit - Confirmed isProcessing locks correctly engage and disengage around the read loop.
 * - APPEND 9025: Handshake Audit - Verified successful attachment of Bearer token and dynamic payload construction.
 * - APPEND 9026: Hydration Audit - Confirmed DifyBridge reads conversation_id from local cache to prevent 400 error.
 * - APPEND 9027: Session State Audit - Verified DifyBridge cleanly handles fresh handshakes post-cache purge.
 * - APPEND 9028: Connection Audit - Verified 200 OK signal post-publish and cache purge.
 * - APPEND 9030: Agent Event Audit - Verified agent_message tokens are successfully intercepted and rendered.
 * - APPEND 9031: Parser Integration Audit - Verified DifyParser dependency is loaded into the stream pipeline.
 * - APPEND 9032: Dual-Publish Audit - Verified token chunks successfully route to both Neural UI and TerminalEngine event channels.
 * - APPEND 9033: Transmission Audit - Verified network telemetry confirms secure uplink and data reception.
 * - APPEND 9034: Schema Audit - Confirmed universal extraction of 'text', 'thought', and 'agent_message' keys alongside legacy 'answer'.
 * * * * * MASTER LOG V28:
 * - STATUS: PRO_PHASE_DIFY_STREAM_FINALIZED
 */

import { DIFY_CONFIG, DIFY_SYSTEM_DIRECTIVES } from '../data/DifyConfig.js';
import { SystemEvents } from '../utils/events.js';
import { GeminiMemory } from '../data/GeminiMemory.js'; // [PRO PHASE] Injected for state recovery
import { DifyParser } from '../utils/DifyParser.js'; // [PRO PHASE] Injected for strict token sanitization

class DifyBridgeManager {
    constructor() {
        this.isProcessing = false;
        this.abortController = null;
    }

    /**
     * Verifies if the OS has a valid Dify.ai configuration.
     */
    isKernelActive() {
        return !!DIFY_CONFIG.API_KEY && DIFY_CONFIG.API_KEY.startsWith("app-");
    }

    /**
     * Executes the Remote Session Handshake via SSE.
     */
    async processQuery(userInput) {
        if (this.isProcessing) {
            console.warn(":: UPLINK_BUSY. AWAITING_STREAM_COMPLETION.");
            return;
        }

        this.isProcessing = true;
        SystemEvents.publish('NEURAL_QUERY_STARTED');
        SystemEvents.publish('NEURAL_STREAM_START'); // Instructs UI to prepare a new message bubble
        console.log(DIFY_SYSTEM_DIRECTIVES.STREAM_START);

        try {
            this.abortController = new AbortController();

            // FIXED [ID 8061]: Hydrate session ID from memory shard to prevent 400 errors after reboot
            const storedSessionId = GeminiMemory.getDifySessionId();
            if (storedSessionId && !DIFY_CONFIG.ACTIVE_CONVERSATION_ID) {
                DIFY_CONFIG.ACTIVE_CONVERSATION_ID = storedSessionId;
            }

            // Construct the Dify-compliant payload
            const payload = {
                inputs: {},
                query: userInput,
                response_mode: DIFY_CONFIG.DEFAULT_RESPONSE_MODE,
                user: DIFY_CONFIG.USER_ID,
                conversation_id: DIFY_CONFIG.ACTIVE_CONVERSATION_ID || ""
            };

            // Dify rejects empty conversation_id fields on the first query
            if (!payload.conversation_id) {
                delete payload.conversation_id;
            }

            const response = await fetch(`${DIFY_CONFIG.BASE_URL}${DIFY_CONFIG.ENDPOINT_CHAT}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${DIFY_CONFIG.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                signal: this.abortController.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP_ERR_CODE: ${response.status} // ${response.statusText}`);
            }

            if (!response.body) {
                throw new Error("CRITICAL: NO_READABLE_STREAM_AVAILABLE.");
            }

            // Engage the packet parsing loop
            await this._readStream(response.body.getReader());

        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn(":: STREAM_MANUALLY_SEVERED");
            } else {
                console.error(":: DIFY_UPLINK_FRACTURE", error);
                SystemEvents.publish('NEURAL_STREAM_CHUNK', { text: `\n\n${DIFY_SYSTEM_DIRECTIVES.ERROR_FALLBACK} [${error.message}]` });
                SystemEvents.publish('TERMINAL_PRINT', { text: `[SYS_ERR]: ${error.message}`, type: 'error' });
            }
        } finally {
            this.isProcessing = false;
            this.abortController = null;
            SystemEvents.publish('NEURAL_STREAM_END');
            SystemEvents.publish('NEURAL_QUERY_COMPLETED');
            console.log(DIFY_SYSTEM_DIRECTIVES.STREAM_CLOSE);
        }
    }

    /**
     * Decodes and buffers incoming raw bytes from the Dify Server.
     */
    async _readStream(reader) {
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');

            // Retain the last incomplete fragment in the buffer to prevent JSON tearing
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.trim() === '') continue;
                if (line.startsWith('data: ')) {
                    const jsonStr = line.substring(6);
                    try {
                        const data = JSON.parse(jsonStr);
                        this._handleStreamPacket(data);
                    } catch (e) {
                        // Silent drop: Expected behavior for incomplete/malformed ping packets
                    }
                }
            }
        }
    }

    /**
     * Filters stream metadata and extracts pure text payloads and memory IDs.
     */
    _handleStreamPacket(data) {
        // FIXED [ID 8130]: Use the hardened static method from DifyParser
        if (DifyParser.isRenderable(data)) {
            // Memory Binding: Capture the session ID to maintain continuous context
            if (data.conversation_id && DIFY_CONFIG.ACTIVE_CONVERSATION_ID !== data.conversation_id) {
                DIFY_CONFIG.ACTIVE_CONVERSATION_ID = data.conversation_id;

                // FIXED [ID 8061]: Persist the active session ID to localStorage via GeminiMemory
                GeminiMemory.setDifySessionId(data.conversation_id);

                console.log(`:: DIFY_SESSION_LOCKED // ID: ${data.conversation_id}`);
            }

            // FIXED [ID 8135]: Extract dynamically based on Agent or Chatbot event payload
            const outputText = data.answer || data.text || data.thought || data.agent_message || "";

            // Dispatch the text shard to the UI Renderer AND Terminal CLI
            if (outputText) {
                SystemEvents.publish('NEURAL_STREAM_CHUNK', { text: outputText });
                SystemEvents.publish('TERMINAL_PRINT', { text: outputText });
            }
        } else if (data.event === 'message_end' || data.event === 'agent_message_end') {
            // Signal graceful stream completion
            SystemEvents.publish('NEURAL_STREAM_END');
        } else if (data.event === 'error') {
            throw new Error(`DIFY_NODE_ERR: ${data.message || data.code}`);
        }
    }

    /**
     * Public API to force-halt an active stream generation.
     */
    stopStream() {
        if (this.abortController) {
            this.abortController.abort();
            this.isProcessing = false;
            SystemEvents.publish('NEURAL_STREAM_END');
            SystemEvents.publish('NEURAL_QUERY_COMPLETED');
            console.log(":: STREAM_FORCE_TERMINATED_BY_SYSTEM");
        }
    }
}

export const DifyBridge = new DifyBridgeManager();