export function startOrbitAnimation(container, centerElement) {
    console.log('🌌 [Orbit] Starting 3D Comet Animation');

    // 1. Setup DOM Elements
    // We append directly to container to ensure same 3D context and coordinate system without intermediate layers
    // (trailLayer removed to fix separation issue)

    const cometHead = document.createElement('div');
    cometHead.className = 'comet-head';
    // 🔥 FIX: Ensure absolute positioning relative to container
    cometHead.style.position = 'absolute';
    cometHead.style.top = '0';
    cometHead.style.left = '0';
    container.appendChild(cometHead);

    // 2. Configuration (tuned to match the "wide" orbit around text)
    const settings = {
        radiusX: 160,  // Wider to embrace text + icon
        radiusY: 45,   // Flatter for 3D effect
        centerX: container.offsetWidth / 2,
        centerY: container.offsetHeight / 2,
        speed: 0.025,
        trailLength: 30,
        tilt: 0.2 // Tilt factor for Y axis
    };

    // 3. Trail System
    const trailElements = [];
    const positionHistory = [];

    for (let i = 0; i < settings.trailLength; i++) {
        const el = document.createElement('div');
        el.className = 'trail-segment';
        // 🔥 FIX: Ensure absolute positioning relative to container
        el.style.position = 'absolute';
        el.style.top = '0';
        el.style.left = '0';
        container.appendChild(el);
        trailElements.push(el);
    }

    // 4. Animation State
    let angle = 0;
    let animationFrameId;
    let isActive = true;

    // 5. The Loop
    function animate() {
        if (!isActive) return;

        // Update settings dynamically
        // 1. Center of the container
        settings.centerX = container.offsetWidth / 2;
        settings.centerY = container.offsetHeight / 2;

        // 2. Dynamic Radius: Hug the text content
        // Text width varies, so we adapt radiusX.
        // Base width is half container width + padding (e.g. 40px)
        const dynamicRadiusX = (container.offsetWidth / 2) + 40;
        settings.radiusX = Math.max(80, Math.min(dynamicRadiusX, 160)); // Clamp between 80px and 160px

        // --- 3D TILT LOGIC ---
        // Tilt the orbital plane
        const tiltAngle = 20;
        container.style.transform = `perspective(1000px) rotateX(${tiltAngle}deg)`;
        container.style.transformStyle = 'preserve-3d';

        // Counter-tilt the text label so it stands up
        const label = container.querySelector('.constellation-label') || container.querySelector('.constellation-label-partner');
        if (label) {
            label.style.transform = `rotateX(${-tiltAngle}deg)`;
            label.style.transformStyle = 'preserve-3d';
        }

        angle += settings.speed;

        // Parametric Equation for Ellipse
        const cosVal = Math.cos(angle);
        const sinVal = Math.sin(angle);

        // 3D Projection
        // X stays mostly flat, Y gets squashed by tilt
        const xOffset = cosVal * settings.radiusX;
        const yOffset = sinVal * 45; // Fixed vertical radius for loop shape

        // Scale based on "depth" (sinVal > 0 is front, sinVal < 0 is back)
        // sinVal = 1 (front) -> scale 1.2
        // sinVal = -1 (back) -> scale 0.8
        const scale = 1 + (sinVal * 0.25);

        // Z-Index Logic
        // Center content usually has z-index ~1-5. 
        // We need comet to be > 10 when front, and < 50 when back.
        // Revised: front = 100, back = 1. Text will be 50.
        const zIndex = sinVal > 0 ? 100 : 1;

        // Store History
        positionHistory.unshift({ x: xOffset, y: yOffset, scale, zIndex });
        if (positionHistory.length > settings.trailLength) {
            positionHistory.pop();
        }

        // Apply to Head
        // We use translate3d for GPU acceleration
        // Added slight rotation to head to follow path? Not strictly necessary for a dot.
        cometHead.style.transform = `translate3d(${settings.centerX + xOffset}px, ${settings.centerY + yOffset}px, 0) scale(${scale})`;
        cometHead.style.zIndex = zIndex;

        // Apply to Trail
        for (let i = 0; i < trailElements.length; i++) {
            const segment = trailElements[i];
            const pos = positionHistory[i];

            if (pos) {
                // Fade out and shrink segments further back in history
                const progress = i / settings.trailLength; // 0 to 1
                const trailScale = pos.scale * (1 - (progress * 0.6));
                const trailOpacity = 0.6 * (1 - progress);

                segment.style.transform = `translate3d(${settings.centerX + pos.x}px, ${settings.centerY + pos.y}px, 0) scale(${trailScale})`;
                segment.style.opacity = trailOpacity;

                // Trail must always be behind the head and successive segments
                segment.style.zIndex = pos.zIndex - 1;
                segment.style.display = 'block';
            } else {
                segment.style.display = 'none';
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // 6. Return Cleanup Function
    return () => {
        console.log('🌌 [Orbit] Stopping Animation');
        isActive = false;
        cancelAnimationFrame(animationFrameId);
        cometHead.remove();
        trailElements.forEach(el => el.remove());
    };
}
