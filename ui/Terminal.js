/**
 * RIYAS_OS V28 - RIPPLE 4
 * File: /ui/Terminal.js
 * Purpose: Draggable Kraye Logs, Physics-Based Dragging, Glitch Transitions, and Performance Isolation
 */

export class Terminal {
    constructor(terminalId, headerId, contentId) {
        this.el = document.getElementById(terminalId);
        this.header = document.getElementById(headerId);
        this.content = document.getElementById(contentId);

        // Physics & Drag State
        this.isDragging = false;
        this.pos = { x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 150 }; // Initial center
        this.vel = { x: 0, y: 0 };
        this.lastMouse = { x: 0, y: 0 };
        this.bounds = { w: 400, h: 300 }; // Default terminal size

        this.animationFrame = null;
        this.init();
    }

    init() {
        if (!this.el || !this.header) return;

        // Apply initial position
        this.el.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;

        // ==========================================
        // REALITY AUDIT: Scroll-Jank in Long Content Fix (Layer Isolation)
        // Move the scrollable container to its own hardware-accelerated layer.
        // Disable expensive backdrop-filter on mobile by detecting touch capabilities.
        // ==========================================
        this.content.style.willChange = 'scroll-position';
        this.el.style.willChange = 'transform';

        const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        if (isMobile) {
            this.el.style.backdropFilter = 'none';
            this.el.style.backgroundColor = 'rgba(5, 5, 10, 0.95)'; // Solid fallback
        }

        // Event Listeners for Dragging
        this.header.addEventListener('mousedown', this.onDragStart.bind(this));
        this.header.addEventListener('touchstart', this.onDragStart.bind(this), { passive: false });

        window.addEventListener('mousemove', this.onDragMove.bind(this));
        window.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });

        window.addEventListener('mouseup', this.onDragEnd.bind(this));
        window.addEventListener('touchend', this.onDragEnd.bind(this));

        // Start Physics Loop
        this.updatePhysics();
    }

    // ==========================================
    // REALITY AUDIT: The "Pointer Event" Trap Fix
    // Lock the 3D canvas and document selection when dragging starts
    // to prevent browser confusion and accidental 3D camera rotation.
    // ==========================================
    onDragStart(e) {
        this.isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        this.lastMouse = { x: clientX, y: clientY };
        this.vel = { x: 0, y: 0 }; // Reset velocity on grab

        document.body.style.userSelect = 'none';
        const canvas = document.getElementById('webgl-canvas');
        if (canvas) canvas.style.pointerEvents = 'none';
    }

    onDragMove(e) {
        if (!this.isDragging) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // Calculate delta for velocity
        const dx = clientX - this.lastMouse.x;
        const dy = clientY - this.lastMouse.y;

        this.pos.x += dx;
        this.pos.y += dy;

        // Update velocity for when the user releases
        this.vel.x = dx * 0.5;
        this.vel.y = dy * 0.5;

        this.lastMouse = { x: clientX, y: clientY };
    }

    onDragEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;

        // Release the global interaction locks
        document.body.style.userSelect = 'auto';
        const canvas = document.getElementById('webgl-canvas');
        if (canvas) canvas.style.pointerEvents = 'auto';
    }

    // ==========================================
    // SAFE IMPROV: Physics-Based Dragging
    // Applies friction and edge-bouncing using requestAnimationFrame.
    // ==========================================
    updatePhysics() {
        if (!this.isDragging) {
            // Apply friction
            this.vel.x *= 0.9;
            this.vel.y *= 0.9;

            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            // Screen Edge Bouncing
            const maxX = window.innerWidth - this.bounds.w;
            const maxY = window.innerHeight - this.bounds.h;

            if (this.pos.x <= 0) { this.pos.x = 0; this.vel.x *= -0.5; }
            if (this.pos.x >= maxX) { this.pos.x = maxX; this.vel.x *= -0.5; }
            if (this.pos.y <= 0) { this.pos.y = 0; this.vel.y *= -0.5; }
            if (this.pos.y >= maxY) { this.pos.y = maxY; this.vel.y *= -0.5; }
        }

        // Apply transform via hardware acceleration
        if (Math.abs(this.vel.x) > 0.1 || Math.abs(this.vel.y) > 0.1 || this.isDragging) {
            this.el.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
        }

        this.animationFrame = requestAnimationFrame(this.updatePhysics.bind(this));
    }

    // ==========================================
    // SAFE IMPROV: Contextual Background Tint & "Kraye Log" Glitch Transition
    // Scrambles the window momentarily when new data is loaded.
    // ==========================================
    async loadData(htmlContent, sectorColorHex) {
        this.show();

        // Apply Contextual Tint to the terminal border/header
        this.el.style.boxShadow = `0 0 15px ${sectorColorHex}44, inset 0 0 10px ${sectorColorHex}22`;
        this.header.style.borderBottom = `1px solid ${sectorColorHex}`;

        // Trigger CSS Glitch Class
        this.el.classList.add('terminal-glitch-active');

        // Brief ASCII scramble effect before showing real content
        this.content.innerHTML = `<span style="color:${sectorColorHex};">> DECRYPTING_DATASTREAM...</span><br/>` +
            this.generateGarbageText(100);

        // Artificial delay for mechanical feel (150ms)
        await new Promise(resolve => setTimeout(resolve, 150));

        this.content.innerHTML = htmlContent;
        this.el.classList.remove('terminal-glitch-active');
    }

    generateGarbageText(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `<span class="ascii-scramble">${result}</span>`;
    }

    show() {
        this.el.classList.add('visible');
    }

    hide() {
        this.el.classList.remove('visible');
        this.el.classList.remove('terminal-glitch-active');
    }
}