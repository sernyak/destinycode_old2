/**
 * astro-renderer.js
 * Генерує HTML-блок довіри ("Космічний відбиток") на основі даних користувача.
 * ПОВНИЙ ПОРТ ЛОГІКИ З МОНОЛІТУ (generateAstroDataHTML + applyGoldThemeToSVG).
 */

import { initAstroLib } from './astro-lib-loader.js';

export async function renderAstroBox(userData, variant = null) {
    // 1. Переконуємось, що бібліотека є
    await initAstroLib();

    if (!window.CircularNatalHoroscope) {
        return `
            <div class="astro-data-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.1);">
                <p class="text-xs text-yellow-400 text-center pulse-text">
                    ⏳ Завантаження астро-даних...<br>
                    (Спробуйте зачекати кілька секунд)
                </p>
            </div>
        `;
    }

    const { Origin, Horoscope, Renderer } = window.CircularNatalHoroscope;

    // Default Geo logic from Monolith
    let calculationGeo = userData.geo;
    if (!calculationGeo) {
        calculationGeo = {
            latitude: 50.45,
            longitude: 30.52,
            timezone: "Europe/Kyiv"
        };
    }

    if (!userData.date) return "";

    try {
        // Parsing logic from Monolith
        const dateParts = userData.date.split('-'); // YYYY-MM-DD
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const dateNum = parseInt(dateParts[2]);

        let hour = 12, minute = 0;
        if (userData.time) {
            const timeParts = userData.time.split(':');
            hour = parseInt(timeParts[0]);
            minute = parseInt(timeParts[1]);
        }

        const origin = new Origin({
            year: year,
            month: month,
            date: dateNum,
            hour: hour,
            minute: minute,
            latitude: parseFloat(calculationGeo.latitude),
            longitude: parseFloat(calculationGeo.longitude),
            timezone: calculationGeo.timezone
        });

        const horoscope = new Horoscope({
            origin: origin,
            houseSystem: "placidus",
            zodiac: "tropical"
        });

        const bodies = horoscope.CelestialBodies;

        // --- Helper Function: getFormattedPosForScreen (Exact from Monolith) ---
        function getFormattedPosForScreen(bodyName, label) {
            let body = bodies[bodyName];
            if (!body && bodyName === 'ascendant') body = horoscope.Ascendant;
            if (!body && bodyName === 'midheaven') body = horoscope.Midheaven;

            if (body) {
                const sign = body.Sign.label;
                const fullDegree = body.ChartPosition.Ecliptic.DecimalDegrees % 30;
                const degree = Math.floor(fullDegree);
                const minutesRaw = (fullDegree - degree) * 60;
                const minutes = Math.floor(minutesRaw);
                const seconds = Math.round((minutesRaw - minutes) * 60);

                return `
                    <div class="astro-data-item">
                        <div class="astro-label-row">
                            <span class="astro-planet-name">${label}:</span>
                             <span class="astro-sign-name">${sign}</span>
                        </div>
                        <div class="astro-coords-row">${degree}° ${minutes}' ${seconds}"</div>
                    </div>
                `;
            }
            return `<div class="astro-data-item"><strong>${label}:</strong> n/a</div>`;
        }

        const displayList = [];
        displayList.push(getFormattedPosForScreen('sun', 'Сонце'));
        displayList.push(getFormattedPosForScreen('mercury', 'Меркурій'));
        displayList.push(getFormattedPosForScreen('venus', 'Венера'));
        displayList.push(getFormattedPosForScreen('mars', 'Марс'));
        displayList.push(getFormattedPosForScreen('jupiter', 'Юпітер'));
        displayList.push(getFormattedPosForScreen('saturn', 'Сатурн'));


        // --- Chart Render Logic (Exact from Monolith applyGoldThemeToSVG) ---
        let chartPreviewHtml = '';

        // Create invisible div for rendering
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = '-9999px';
        div.style.width = '600px'; // Monolith uses 600px width for hidden div
        div.style.height = '600px';
        document.body.appendChild(div);

        try {
            const renderer = new Renderer(horoscope);
            renderer.render(div);

            // 🔥 APPLY GOLD THEME (Exact Logic)
            const svg = div.querySelector('svg');
            if (svg) {
                svg.style.backgroundColor = 'transparent';

                const lines = svg.querySelectorAll('line, circle, path');
                lines.forEach(line => {
                    const stroke = line.getAttribute('stroke');
                    if (!stroke || stroke === '#000000' || stroke === '#000' || stroke === 'black') {
                        line.setAttribute('stroke', '#cda45e');
                        line.setAttribute('stroke-width', '1.5');
                    }
                });

                const texts = svg.querySelectorAll('text');
                texts.forEach(text => {
                    text.setAttribute('fill', '#cda45e');
                    text.style.fill = '#cda45e';
                    text.style.fontFamily = "'Montserrat', sans-serif";
                    text.style.fontWeight = '500';
                });

                chartPreviewHtml = `
                    <div class="astro-chart-preview">
                        ${div.innerHTML}
                    </div>
                `;
            }
        } catch (e) { console.warn("Chart Render Error:", e); }

        // Clean up
        document.body.removeChild(div);

        // --- Final HTML Return (Exact Structure) ---
        return `
            <div class="astro-data-box">
                <div class="astro-data-title">${variant && variant.productType === 'partner' ? 'Твій Астро-Код Кохання' : 'Твій Космічний Відбиток'}</div>
                ${chartPreviewHtml} 
                <div class="astro-data-grid">
                    ${displayList.join('')}
                </div>
            </div>
        `;

    } catch (e) {
        console.error("Fingerprint render error:", e);
        return `<div class="astro-data-box"><p class="text-xs text-red-400 text-center">Помилка розрахунку: ${e.message}</p></div>`;
    }
}