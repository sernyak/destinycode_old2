/**
 * Starry Background Component (Scroll Parallax Added)
 * Features:
 * 1. Background: DEEP BLACK.
 * 2. Nebula Dust: Top 10% (Fixed Parallax).
 * 3. Radius: Massive (Min 200px).
 * 4. Colors: Deep Dark Gold.
 * 5. Star Count: High Density.
 * 6. Gyroscope: Relative Math + iOS Fix.
 * 7. 🔥 NEW: SCROLL PARALLAX (Depth effect on scroll).
 * 8. 🔥 NEW: Self-healing after external navigation (Monobank).
 */

export class StarryBackground {
    constructor() {
        // Singleton check
        if (document.getElementById('starry-background')) return;

        this.container = document.createElement('div');
        this.container.id = 'starry-background';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            background: linear-gradient(to bottom, #050508 0%, #0a0a10 100%);
            pointer-events: none;
        `;

        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 1; 
        `;
        this.ctx = this.canvas.getContext('2d', { alpha: false });

        this.container.appendChild(this.canvas);
        document.body.prepend(this.container);

        this.stars = [];
        this.dustNodes = [];
        this.shootingStars = [];

        this.isMobile = window.innerWidth < 768;

        // Calibration for Gyroscope
        this.initialGamma = null;
        this.initialBeta = null;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;

        this.lastShootingStar = 0;
        this.shootingStarInterval = 5000 + Math.random() * 5000;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Desktop Mouse
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Mobile Gyroscope
        window.addEventListener('deviceorientation', (e) => this.onDeviceMove(e));

        // 🔥 FIX: bfcache restoration (повернення з Monobank через кнопку "Назад")
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                console.log('🌌 StarryBackground: Restoring from bfcache...');
                StarryBackground.ensureRunning();
            }
        });

        // 🔥 FIX: Пауза анімації при неактивній вкладці (економія батареї)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.active = false;
            } else {
                StarryBackground.ensureRunning();
            }
        });

        // 🔥 FIX: Відновлення при фокусі на вікно (fallback для випадків коли bfcache не спрацював)
        window.addEventListener('focus', () => {
            StarryBackground.ensureRunning();
        });

        // iOS Fix: Request permission on first interaction
        if (this.isMobile && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const permissionHandler = () => {
                DeviceOrientationEvent.requestPermission()
                    .then(response => {
                        if (response === 'granted') {
                            window.addEventListener('deviceorientation', (e) => this.onDeviceMove(e));
                        }
                    })
                    .catch(console.error)
                    .finally(() => {
                        window.removeEventListener('click', permissionHandler);
                        window.removeEventListener('touchstart', permissionHandler);
                    });
            };
            window.addEventListener('click', permissionHandler);
            window.addEventListener('touchstart', permissionHandler);
        }

        this.createSystem();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.isMobile = this.width < 768;
        this.createSystem();
    }

    createSystem() {
        this.active = true;
        this.stars = [];
        this.dustNodes = [];
        this.shootingStars = [];

        // --- MILKY WAY DUST ---
        const dustCount = this.isMobile ? 5 : 8;
        const yLimit = this.height * 0.10;
        const minRadius = 200;
        const varRadius = 200;

        for (let i = 0; i < dustCount; i++) {
            this.dustNodes.push({
                x: Math.random() * this.width,
                y: Math.random() * yLimit,
                radius: (Math.random() * varRadius) + minRadius,
                colorPhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.2 + Math.random() * 0.2,
                vx: (Math.random() - 0.5) * 0.05,
                vy: (Math.random() - 0.5) * 0.05
            });
        }

        // --- STARS ---
        const mwYLimit = this.height * 0.20;
        const mwStarCount = this.isMobile ? 240 : 600;
        for (let i = 0; i < mwStarCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * mwYLimit,
                size: Math.random() * 0.6 + 0.1,
                baseOpacity: Math.random() * 0.4 + 0.1,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01,
                parallax: 0.02,
                isMilkyWay: true
            });
        }

        const starDensity = this.isMobile ? 3500 : 3000;
        const starCount = Math.floor(((this.width * this.height) / starDensity) * 1.2);

        for (let i = 0; i < starCount; i++) {
            let y = Math.random() < 0.6
                ? Math.random() * (this.height * 0.5)
                : Math.random() * this.height;

            this.stars.push({
                x: Math.random() * this.width,
                y: y,
                size: Math.random() * (this.isMobile ? 1.2 : 1.8),
                baseOpacity: Math.random() * 0.7 + 0.3,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.03 + 0.01,
                parallax: Math.random() * 0.08 + 0.04,
                isMilkyWay: false
            });
        }
    }

    spawnShootingStar() {
        const fromLeft = Math.random() > 0.5;
        const startX = fromLeft
            ? Math.random() * this.width * 0.2
            : this.width * 0.8 + Math.random() * this.width * 0.2;
        const startY = Math.random() * (this.height * 0.3);

        const angle = fromLeft
            ? (Math.PI / 6 + Math.random() * Math.PI / 6)
            : (Math.PI - Math.PI / 6 - Math.random() * Math.PI / 6);

        this.shootingStars.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * (10 + Math.random() * 5),
            vy: Math.sin(angle) * (10 + Math.random() * 5),
            length: 60 + Math.random() * 90,
            opacity: 1,
            life: 1
        });
    }

    onMouseMove(e) {
        if (this.isMobile) return;
        this.targetX = (e.clientX / this.width) - 0.5;
        this.targetY = (e.clientY / this.height) - 0.5;
    }

    onDeviceMove(e) {
        if (e.beta === null || e.gamma === null) return;

        if (this.initialBeta === null) {
            this.initialBeta = e.beta;
            this.initialGamma = e.gamma;
            return;
        }

        let diffX = e.gamma - this.initialGamma;
        let diffY = e.beta - this.initialBeta;

        const maxAngle = 30;
        diffX = Math.min(Math.max(diffX, -maxAngle), maxAngle);
        diffY = Math.min(Math.max(diffY, -maxAngle), maxAngle);

        this.targetX = (diffX / maxAngle) * 0.5;
        this.targetY = (diffY / maxAngle) * 0.5;
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    animate() {
        if (!this.active) return;

        const now = Date.now();
        const time = now * 0.001;

        if (now - this.lastShootingStar > this.shootingStarInterval) {
            this.spawnShootingStar();
            this.lastShootingStar = now;
            this.shootingStarInterval = 4000 + Math.random() * 6000;
        }

        // --- CALCULATE OFFSETS ---
        const smoothFactor = this.isMobile ? 0.08 : 0.02;
        this.mouseX += (this.targetX - this.mouseX) * smoothFactor;
        this.mouseY += (this.targetY - this.mouseY) * smoothFactor;

        // 1. Mouse/Gyro Parallax
        const parallaxStrength = this.isMobile ? 1200 : 600;
        const gyroOffsetX = this.mouseX * parallaxStrength;
        const gyroOffsetY = this.mouseY * parallaxStrength;

        // 2. 🔥 NEW: Scroll Parallax with Safari Fix Support
        // Отримуємо поточну позицію скролу (з контейнера або вікна)
        const scrollContainer = document.querySelector('.funnel-container');
        const scrollY = scrollContainer ? scrollContainer.scrollTop : (window.scrollY || 0);

        // Background
        const bgGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        bgGradient.addColorStop(0, '#080504');
        bgGradient.addColorStop(1, '#050508');

        this.ctx.fillStyle = bgGradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // --- NEBULA DUST ---
        const GOLD = { r: 131, g: 105, b: 60 };
        const PURPLE = { r: 100, g: 50, b: 160 };

        this.ctx.globalCompositeOperation = 'lighter';

        this.dustNodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            const cycle = Math.sin(time * node.pulseSpeed + node.colorPhase);
            const mix = (cycle + 1) / 2;

            const r = Math.floor(this.lerp(GOLD.r, PURPLE.r, mix));
            const g = Math.floor(this.lerp(GOLD.g, PURPLE.g, mix));
            const b = Math.floor(this.lerp(GOLD.b, PURPLE.b, mix));

            const alpha = 0.05 + (Math.sin(time * 0.5 + node.colorPhase) + 1) * 0.02;

            const colorString = `rgba(${r}, ${g}, ${b}, ${alpha})`;

            // 🔥 Dust Scroll Logic:
            // Туманність рухається ДУЖЕ повільно при скролі (0.2), створюючи глибину
            const dustScrollY = scrollY * 0.2;

            const dustParallaxX = gyroOffsetX * 0.15;
            const dustParallaxY = gyroOffsetY * 0.15;

            // Комбінуємо координати: Позиція - Гіроскоп - Скрол
            const finalX = node.x - dustParallaxX;
            const finalY = node.y - dustParallaxY - dustScrollY;

            const grad = this.ctx.createRadialGradient(
                finalX, finalY, 0,
                finalX, finalY, node.radius
            );

            grad.addColorStop(0, colorString);
            grad.addColorStop(1, 'transparent');

            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(finalX, finalY, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalCompositeOperation = 'source-over';

        // --- STARS ---
        this.ctx.fillStyle = "#FFFFFF";
        this.stars.forEach(star => {
            const twinkle = 0.7 + 0.3 * Math.sin(time * (star.speed * 50) + star.phase);

            // 🔥 Star Scroll Logic:
            // Зірки рухаються швидше за туманність, але повільніше за контент
            // Чим більший parallax у зірки, тим сильніше вона реагує на скрол
            const starScrollY = scrollY * (star.parallax * 3); // Множник 3 для помітності

            let x = star.x - gyroOffsetX * star.parallax;
            let y = star.y - gyroOffsetY * star.parallax - starScrollY;

            // WRAP LOGIC (Безкінечність)
            // Використовуємо modulo для створення ефекту безкінечного поля при скролі
            // Додаємо wrapPadding щоб не було різких зникнень
            const wrapPadding = 50;
            const totalHeight = this.height + wrapPadding * 2;

            // Зациклення по Y з урахуванням скролу
            // Якщо зірка пішла вгору за екран -> вона з'являється знизу
            while (y < -wrapPadding) y += totalHeight;
            while (y > this.height + wrapPadding) y -= totalHeight;

            // Зациклення по X (для гіроскопа)
            if (x < -wrapPadding) x += (this.width + wrapPadding * 2);
            if (x > this.width + wrapPadding) x -= (this.width + wrapPadding * 2);

            this.ctx.globalAlpha = star.baseOpacity * twinkle;
            this.ctx.beginPath();
            this.ctx.arc(x, y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // --- SHOOTING STARS ---
        this.ctx.globalAlpha = 1;
        this.shootingStars = this.shootingStars.filter(star => {
            star.x += star.vx;
            star.y += star.vy;
            star.life -= 0.015;
            star.opacity = star.life;

            if (star.life <= 0 || star.x > this.width + 100 || star.y > this.height + 100) {
                return false;
            }

            const tailX = star.x - (star.vx / Math.hypot(star.vx, star.vy)) * star.length;
            const tailY = star.y - (star.vy / Math.hypot(star.vx, star.vy)) * star.length;

            const gradient = this.ctx.createLinearGradient(tailX, tailY, star.x, star.y);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 1.5;
            this.ctx.lineCap = 'round';
            this.ctx.beginPath();
            this.ctx.moveTo(tailX, tailY);
            this.ctx.lineTo(star.x, star.y);
            this.ctx.stroke();

            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
            this.ctx.fill();

            return true;
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.active = false;
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }

    /**
     * 🔥 STATIC METHOD: Гарантує що анімація працює.
     * Викликається при поверненні з зовнішніх сторінок (Monobank).
     */
    static ensureRunning() {
        const instance = window.starryBgInstance;
        if (instance) {
            // 🔥 FIX: Завжди перезапускаємо, бо при bfcache active може бути true
            // але requestAnimationFrame loop вже зупинився
            console.log('🌌 StarryBackground: Ensuring animation is running...');
            instance.active = true;
            // Перезапускаємо loop (якщо вже працює, це безпечно)
            requestAnimationFrame(() => instance.animate());
        }
    }
}