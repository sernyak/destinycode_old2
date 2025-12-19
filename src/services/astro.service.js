import { initAstroLib } from '../utils/astro-lib-loader.js';

/**
 * Розраховує позиції планет та будує SVG карту
 * @param {object} userData { date, time, geo: { latitude, longitude, timezone } }
 * @returns {Promise<object>} { planets: [], chartSvg: string }
 */
export async function calculateNatalChart(userData) {
    if (!await initAstroLib()) {
        throw new Error("Astro Library not loaded");
    }

    const { Origin, Horoscope, Renderer } = window.CircularNatalHoroscope;

    // 1. Парсинг дати
    const dateParts = userData.date.split('-'); // YYYY-MM-DD
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JS months 0-11
    const day = parseInt(dateParts[2]);

    let hour = 12, minute = 0;
    if (userData.time) {
        const timeParts = userData.time.split(':');
        hour = parseInt(timeParts[0]);
        minute = parseInt(timeParts[1]);
    }

    // 🔥 FIX: Правильне зчитування полів (latitude/longitude замість lat/lon)
    // + перевірка на валідність, інакше Fallback на Київ
    let lat = 50.45;
    let lon = 30.52;
    let tz = "Europe/Kyiv";

    if (userData.geo) {
        // Перевіряємо обидва варіанти назв полів
        const pLat = parseFloat(userData.geo.latitude || userData.geo.lat);
        const pLon = parseFloat(userData.geo.longitude || userData.geo.lon);
        
        if (!isNaN(pLat) && !isNaN(pLon)) {
            lat = pLat;
            lon = pLon;
            tz = userData.geo.timezone || tz;
        }
    }

    let planetsList = [];
    let chartSvg = null;
    let horoscope = null;

    try {
        // 2. Створення гороскопу
        const origin = new Origin({
            year, month, date: day, hour, minute,
            latitude: lat, longitude: lon, timezone: tz
        });

        horoscope = new Horoscope({
            origin,
            houseSystem: "placidus",
            zodiac: "tropical"
        });

        // 3. Формування списку планет для AI
        const bodies = horoscope.CelestialBodies;
        const keys = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'ascendant', 'midheaven', 'northnode'];

        keys.forEach(key => {
            let body = bodies[key];
            if (!body && key === 'ascendant') body = horoscope.Ascendant;
            if (!body && key === 'midheaven') body = horoscope.Midheaven;

            if (body) {
                const sign = body.Sign.label;
                const degree = Math.floor(body.ChartPosition.Ecliptic.DecimalDegrees % 30);
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                planetsList.push(`${label}: ${sign} ${degree}°`);
            }
        });
    } catch (e) {
        console.error("Horoscope Calculation Failed:", e);
        // Не кидаємо помилку далі, щоб хоча б текстовий звіт згенерувався (AI додумає)
        return { planets: [], chartSvg: null, houseSystem: "Error" };
    }

    // 4. Генерація SVG (Gold Theme)
    try {
        if (horoscope) {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.left = '-9999px';
            div.style.visibility = 'hidden'; 
            document.body.appendChild(div);
            
            const renderer = new Renderer(horoscope);
            renderer.render(div);
            
            // Фарбуємо в золото
            const svg = div.querySelector('svg');
            if (svg) {
                svg.style.backgroundColor = 'transparent';
                svg.querySelectorAll('line, circle, path').forEach(el => {
                    const stroke = el.getAttribute('stroke');
                    if (!stroke || stroke === '#000000' || stroke === '#000') {
                        el.setAttribute('stroke', '#cda45e');
                    }
                    const fill = el.getAttribute('fill');
                    if (fill === '#000000' || fill === '#000') {
                        el.setAttribute('fill', '#cda45e');
                    }
                });
                svg.querySelectorAll('text').forEach(t => {
                    t.style.fill = '#cda45e';
                    t.setAttribute('fill', '#cda45e');
                    t.style.fontFamily = "'Montserrat', sans-serif";
                });
                chartSvg = div.innerHTML;
            }
            document.body.removeChild(div);
        }
    } catch (e) {
        console.warn("SVG Render Error:", e);
    }

    return {
        planets: planetsList,
        chartSvg: chartSvg,
        houseSystem: "Placidus"
    };
}