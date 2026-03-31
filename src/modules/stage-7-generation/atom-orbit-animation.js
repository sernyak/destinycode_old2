/**
 * ⚛️ Atom Orbit Animation
 * 3 comets orbiting on different planes — like electrons around an atom nucleus.
 * Orbital planes are rotated by 0°, 60°, 120° in 2D, with perspective tilt for 3D depth.
 */
export function startAtomOrbitAnimation(container) {
    console.log('⚛️ [Atom Orbit] Starting 3-Comet Animation');

    // ── Configuration ──────────────────────────────────────────────
    const NUM_COMETS = 3;
    const TRAIL_LENGTH = 33;
    const SPEED = 0.022;
    const RADIUS_Y = 45;            // Vertical radius (flattened by perspective)
    const PERSPECTIVE_TILT = 18;     // Degrees of X-axis tilt for 3D feel

    // Orbital plane rotations (evenly spaced like atom orbits)
    const ORBIT_ROTATIONS = [0, Math.PI / 3, -Math.PI / 3]; // 0°, 60°, -60°

    // Phase offsets so comets are synchronized (0 degrees)
    const PHASE_OFFSETS = [0, 0, 0];

    // ── 3D Setup ─────────────────────────────────────────────────
    container.style.transformStyle = 'preserve-3d';
    container.style.transform = `perspective(800px) rotateX(${PERSPECTIVE_TILT}deg)`;

    // Counter-tilt the label text so it stays upright and readable
    const label = container.querySelector('.constellation-label');
    if (label) {
        label.style.transform = `rotateX(${-PERSPECTIVE_TILT}deg)`;
        label.style.transformStyle = 'preserve-3d';
        label.style.position = 'relative';
        label.style.zIndex = '50'; // Comets pass in front (z:100) and behind (z:1)
    }

    // ── Create DOM elements for each comet ────────────────────────
    const cometSets = [];

    for (let k = 0; k < NUM_COMETS; k++) {
        // Comet Head
        const head = document.createElement('div');
        head.className = 'comet-head';
        head.style.position = 'absolute';
        head.style.top = '0';
        head.style.left = '0';
        container.appendChild(head);

        // Trail Segments
        const trails = [];
        for (let i = 0; i < TRAIL_LENGTH; i++) {
            const seg = document.createElement('div');
            seg.className = 'trail-segment';
            seg.style.position = 'absolute';
            seg.style.top = '0';
            seg.style.left = '0';
            container.appendChild(seg);
            trails.push(seg);
        }

        cometSets.push({
            head,
            trails,
            positionHistory: [],
            angle: PHASE_OFFSETS[k],
            rotation: ORBIT_ROTATIONS[k],
        });
    }

    // ── Animation Loop ────────────────────────────────────────────
    let isActive = true;
    let animationFrameId;

    function animate() {
        if (!isActive) return;

        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        // Dynamic horizontal radius — adapts to container width
        const dynamicRadiusX = Math.max(80, Math.min((container.offsetWidth / 2) + 40, 160));

        for (const comet of cometSets) {
            comet.angle += SPEED;

            // ─ Parametric ellipse ─
            const cosT = Math.cos(comet.angle);
            const sinT = Math.sin(comet.angle);
            const baseX = dynamicRadiusX * cosT;
            const baseY = RADIUS_Y * sinT;

            // ─ Rotate orbit plane in 2D (screen plane) ─
            // Combined with the perspective tilt on the container,
            // this produces a convincing 3D atom orbital look.
            const cosR = Math.cos(comet.rotation);
            const sinR = Math.sin(comet.rotation);
            const xOffset = baseX * cosR - baseY * sinR;
            const yOffset = baseX * sinR + baseY * cosR;

            // ─ Depth simulation ─
            // sinT determines if the comet is "in front" or "behind" the center
            const depth = sinT;
            const scale = 1 + depth * 0.25;
            const zIndex = depth > 0 ? 100 : 1;

            // ─ Store position for trail ─
            comet.positionHistory.unshift({ x: xOffset, y: yOffset, scale, zIndex });
            if (comet.positionHistory.length > TRAIL_LENGTH) {
                comet.positionHistory.pop();
            }

            // ─ Apply: Head ─
            comet.head.style.transform = `translate3d(${centerX + xOffset}px, ${centerY + yOffset}px, 0) scale(${scale})`;
            comet.head.style.zIndex = zIndex;

            // ─ Apply: Trail ─
            for (let i = 0; i < comet.trails.length; i++) {
                const seg = comet.trails[i];
                const pos = comet.positionHistory[i];

                if (pos) {
                    const progress = i / TRAIL_LENGTH;
                    const trailScale = pos.scale * (1 - progress * 0.6);
                    const trailOpacity = 0.5 * (1 - progress);

                    seg.style.transform = `translate3d(${centerX + pos.x}px, ${centerY + pos.y}px, 0) scale(${trailScale})`;
                    seg.style.opacity = trailOpacity;
                    seg.style.zIndex = pos.zIndex - 1;
                    seg.style.display = 'block';
                } else {
                    seg.style.display = 'none';
                }
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // ── Cleanup Function ──────────────────────────────────────────
    return () => {
        console.log('⚛️ [Atom Orbit] Stopping Animation');
        isActive = false;
        cancelAnimationFrame(animationFrameId);
        cometSets.forEach(({ head, trails }) => {
            head.remove();
            trails.forEach(el => el.remove());
        });
        // Reset container transform
        container.style.transform = '';
        container.style.transformStyle = '';
    };
}
