import { initAstroLib } from '../utils/astro-lib-loader.js';

/**
 * Розраховує позиції планет, вузли, аспекти, доми та будує SVG карту
 * @param {object} userData { date, time, geo: { latitude, longitude, timezone } }
 * @returns {Promise<object>} { planets: [], aspects: [], houses: [], moonPhase: string, chartSvg: string, houseSystem: string }
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
    let housesList = [];   // 🔥 NEW: Куспіди домів
    let configurationsList = []; // 🔥 NEW: Планетарні конфігурації (Стеліуми)
    let moonPhase = '';     // 🔥 NEW: Фаза Місяця
    let chartSvg = null;
    let horoscope = null;

    // 🔥 NEW: Достоїнства планет (Dignities)
    const dignities = {
        SUN: { domicile: ['LEO'], detriment: ['AQUARIUS'], exaltation: ['ARIES'], fall: ['LIBRA'] },
        MOON: { domicile: ['CANCER'], detriment: ['CAPRICORN'], exaltation: ['TAURUS'], fall: ['SCORPIO'] },
        MERCURY: { domicile: ['GEMINI', 'VIRGO'], detriment: ['SAGITTARIUS', 'PISCES'], exaltation: ['VIRGO'], fall: ['PISCES'] },
        VENUS: { domicile: ['TAURUS', 'LIBRA'], detriment: ['SCORPIO', 'ARIES'], exaltation: ['PISCES'], fall: ['VIRGO'] },
        MARS: { domicile: ['ARIES', 'SCORPIO'], detriment: ['LIBRA', 'TAURUS'], exaltation: ['CAPRICORN'], fall: ['CANCER'] },
        JUPITER: { domicile: ['SAGITTARIUS', 'PISCES'], detriment: ['GEMINI', 'VIRGO'], exaltation: ['CANCER'], fall: ['CAPRICORN'] },
        SATURN: { domicile: ['CAPRICORN', 'AQUARIUS'], detriment: ['CANCER', 'LEO'], exaltation: ['LIBRA'], fall: ['ARIES'] },
        URANUS: { domicile: ['AQUARIUS'], detriment: ['LEO'], exaltation: ['SCORPIO'], fall: ['TAURUS'] },
        NEPTUNE: { domicile: ['PISCES'], detriment: ['VIRGO'], exaltation: ['CANCER'], fall: ['CAPRICORN'] },
        PLUTO: { domicile: ['SCORPIO'], detriment: ['TAURUS'], exaltation: ['ARIES'], fall: ['LIBRA'] }
    };

    function getDignity(planet, sign) {
        const d = dignities[planet.toUpperCase()];
        if (!d) return '';
        if (d.domicile.includes(sign.toUpperCase())) return ' [Domicile/Обитель]';
        if (d.detriment.includes(sign.toUpperCase())) return ' [Detriment/Вигнання]';
        if (d.exaltation.includes(sign.toUpperCase())) return ' [Exaltation/Екзальтація]';
        if (d.fall.includes(sign.toUpperCase())) return ' [Fall/Падіння]';
        return '';
    }

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

        const signCounts = {};
        const houseCounts = {};

        // Обробка планет (з ретроградністю + ДІМ + ДОСТОЇНСТВА)
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

                // 🔥 NEW: Дім, в якому стоїть планета
                const houseNum = body.House ? body.House.id : null;
                const houseTag = houseNum ? ` [House ${houseNum}]` : '';

                // 🔥 NEW: Достоїнство планети
                const dignityTag = getDignity(label, sign);

                planetsList.push(`${label}: ${sign} ${dms}${retrograde}${houseTag}${dignityTag}`);

                // Рахуємо для стеліумів
                signCounts[sign] = (signCounts[sign] || 0) + 1;
                if (houseNum) houseCounts[houseNum] = (houseCounts[houseNum] || 0) + 1;
            }
        });

        // 🔥 NEW: Визначення Стеліумів (3+ планет в одному знаку або домі)
        for (const [sign, count] of Object.entries(signCounts)) {
            if (count >= 3) configurationsList.push(`Stellium in ${sign} (${count} planets)`);
        }
        for (const [house, count] of Object.entries(houseCounts)) {
            if (count >= 3) configurationsList.push(`Stellium in House ${house} (${count} planets)`);
        }

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

        // Додаємо конфігурації
        if (configurationsList.length > 0) {
            console.log("Calculated Configurations:", configurationsList);
        }

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
        console.log("Calculated Planets (DMS + Retrograde + Houses):", planetsList);
        console.log("Calculated Aspects:", aspectsList);

        // 5. 🔥 NEW: ДОМИ — Куспіди 12 домів
        if (horoscope.Houses && horoscope.Houses.length > 0) {
            horoscope.Houses.forEach((house, index) => {
                const houseNum = index + 1;
                const sign = house.Sign?.label?.toUpperCase() || 'UNKNOWN';
                const decimalPos = (house.ChartPosition?.StartPosition?.Ecliptic?.DecimalDegrees || 0) % 30;
                const dms = toDMS(decimalPos);
                housesList.push(`House ${houseNum}: ${sign} ${dms}`);
            });
            console.log("Calculated House Cusps:", housesList);
        }

        // 6. 🔥 NEW: ФАЗА МІСЯЦЯ при народженні
        const sunBody = bodies['sun'];
        const moonBody = bodies['moon'];
        if (sunBody && moonBody) {
            const sunDeg = sunBody.ChartPosition.Ecliptic.DecimalDegrees;
            const moonDeg = moonBody.ChartPosition.Ecliptic.DecimalDegrees;
            let diff = (moonDeg - sunDeg + 360) % 360;

            if (diff < 45) moonPhase = 'New Moon (Новий Місяць)';
            else if (diff < 90) moonPhase = 'Waxing Crescent (Зростаючий Серп)';
            else if (diff < 135) moonPhase = 'First Quarter (Перша Чверть)';
            else if (diff < 180) moonPhase = 'Waxing Gibbous (Зростаючий Опуклий)';
            else if (diff < 225) moonPhase = 'Full Moon (Повний Місяць)';
            else if (diff < 270) moonPhase = 'Waning Gibbous (Спадаючий Опуклий)';
            else if (diff < 315) moonPhase = 'Last Quarter (Остання Чверть)';
            else moonPhase = 'Waning Crescent (Спадаючий Серп)';

            console.log("Moon Phase at Birth:", moonPhase);
        }

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
        houses: housesList,     // 🔥 NEW: Куспіди домів
        configurations: configurationsList, // 🔥 NEW: Конфігурації
        moonPhase: moonPhase,   // 🔥 NEW: Фаза Місяця
        chartSvg: chartSvg,
        houseSystem: "Placidus"
    };
}