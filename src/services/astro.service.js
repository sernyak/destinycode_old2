import { initAstroLib } from '../utils/astro-lib-loader.js';

/**
 * Розраховує позиції планет, вузли, аспекти та будує SVG карту
 * @param {object} userData { date, time, geo: { latitude, longitude, timezone } }
 * @returns {Promise<object>} { planets: [], aspects: [], chartSvg: string, houseSystem: string }
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

    let lat = 50.45;
    let lon = 30.52;
    let tz = "Europe/Kyiv";

    if (userData.geo) {
        const pLat = parseFloat(userData.geo.latitude || userData.geo.lat);
        const pLon = parseFloat(userData.geo.longitude || userData.geo.lon);

        if (!isNaN(pLat) && !isNaN(pLon)) {
            lat = pLat;
            lon = pLon;
            tz = userData.geo.timezone || tz;
        }
    }

    let planetsList = [];
    let aspectsList = [];
    let chartSvg = null;
    let horoscope = null;

    // --- Helper: Convert Decimal Degrees to DMS (Deg Min Sec) ---
    function toDMS(decimalDegrees) {
        const d = Math.floor(decimalDegrees);
        const minFloat = (decimalDegrees - d) * 60;
        const m = Math.floor(minFloat);
        const s = Math.round((minFloat - m) * 60);
        return `${d}° ${m}' ${s}"`;
    }

    try {
        // 2. Створення гороскопу з конфігурацією аспектів
        const origin = new Origin({
            year, month, date: day, hour, minute,
            latitude: lat, longitude: lon, timezone: tz
        });

        horoscope = new Horoscope({
            origin,
            houseSystem: "placidus",
            zodiac: "tropical",
            aspectPoints: ['bodies', 'points', 'angles'],
            aspectWithPoints: ['bodies', 'points', 'angles'],
            aspectTypes: ['major', 'minor'],
            customOrbs: {}
        });

        // 3. Формування списку планет (РОЗШИРЕНИЙ СПИСОК + ВУЗЛИ + РЕТРОГРАДНІСТЬ)
        const bodies = horoscope.CelestialBodies;
        const points = horoscope.CelestialPoints;

        // 🔥 Розширений список: планети + вузли
        const planetKeys = [
            'sun', 'moon', 'mercury', 'venus', 'mars',
            'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'
        ];

        const pointKeys = ['northnode', 'southnode', 'lilith', 'chiron'];
        const angleKeys = ['ascendant', 'midheaven'];

        // Обробка планет (з ретроградністю)
        planetKeys.forEach(key => {
            const body = bodies[key];
            if (body) {
                const sign = body.Sign.label.toUpperCase();
                const decimalPos = body.ChartPosition.Ecliptic.DecimalDegrees % 30;
                const dms = toDMS(decimalPos);
                const label = key.toUpperCase();

                // 🔥 РЕТРОГРАДНІСТЬ: перевіряємо швидкість планети
                let retrograde = '';
                if (body.Speed && body.Speed.DecimalDegrees < 0) {
                    retrograde = ' (R)'; // ℞ marker
                }

                planetsList.push(`${label}: ${sign} ${dms}${retrograde}`);
            }
        });

        // Обробка точок (вузли, Лілит, Хірон) - без ретроградності
        pointKeys.forEach(key => {
            const point = points ? points[key] : null;
            if (point) {
                const sign = point.Sign?.label?.toUpperCase() || 'UNKNOWN';
                const decimalPos = (point.ChartPosition?.Ecliptic?.DecimalDegrees || 0) % 30;
                const dms = toDMS(decimalPos);

                // Красиві імена для вузлів
                let label = key.toUpperCase();
                if (key === 'northnode') label = 'NORTH NODE (Rahu)';
                if (key === 'southnode') label = 'SOUTH NODE (Ketu)';
                if (key === 'lilith') label = 'LILITH (Black Moon)';
                if (key === 'chiron') label = 'CHIRON';

                planetsList.push(`${label}: ${sign} ${dms}`);
            }
        });

        // Обробка кутів (Асцендент, Середина Неба)
        angleKeys.forEach(key => {
            let angle = null;
            if (key === 'ascendant') angle = horoscope.Ascendant;
            if (key === 'midheaven') angle = horoscope.Midheaven;

            if (angle) {
                const sign = angle.Sign.label.toUpperCase();
                const decimalPos = angle.ChartPosition.Ecliptic.DecimalDegrees % 30;
                const dms = toDMS(decimalPos);
                const label = key.toUpperCase();
                planetsList.push(`${label}: ${sign} ${dms}`);
            }
        });

        // 4. 🔥 АСПЕКТИ: Формування таблиці аспектів
        if (horoscope.Aspects && horoscope.Aspects.all) {
            horoscope.Aspects.all.forEach(aspect => {
                const p1 = aspect.point1?.label || aspect.point1?.key || 'Unknown';
                const p2 = aspect.point2?.label || aspect.point2?.key || 'Unknown';
                const type = aspect.name || aspect.type || 'Aspect';
                const orb = aspect.orb !== undefined ? aspect.orb.toFixed(1) : '?';

                aspectsList.push(`${p1} ${type} ${p2} (orb ${orb}°)`);
            });
        }

        // Debug
        console.log("Calculated Planets (DMS + Retrograde):", planetsList);
        console.log("Calculated Aspects:", aspectsList);

    } catch (e) {
        console.error("Horoscope Calculation Failed:", e);
        return { planets: [], aspects: [], chartSvg: null, houseSystem: "Error" };
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
        aspects: aspectsList,
        chartSvg: chartSvg,
        houseSystem: "Placidus"
    };
}