/**
 * geo.service.js
 * Сервіс для отримання координат міста через AI.
 * ПОВНИЙ ПОРТ ЛОГІКИ З МОНОЛІТУ (Original System Prompt)
 */

const PROXY_URL = 'https://getaiprediction-kpkshoor7q-ew.a.run.app';
const MODEL_NAME = 'gemini-2.5-flash';

// 🔥 EXACT MONOLITH PROMPT (Crucial for typos correction)
const GEO_SYSTEM_PROMPT = `
    Ти — високоточний географічний API. Твоя єдина мета — повернути JSON-об'єкт, що містить географічні координати (lat, lon), часовий пояс (timezone) та **виправлену назву міста (corrected_name)**.
    ПРАВИЛА:
    1. Відповідь має бути ЛИШЕ в форматі JSON. Жодних пояснень.
    2. Часовий пояс має бути у форматі IANA (наприклад, Europe/Kyiv).
    3. КРИТИЧНЕ ПРАВИЛО (АВТОВИПРАВЛЕННЯ): Вхідні дані (назва міста) можуть бути будь-якою мовою (українська, англійська, російська) та містити одруки (напр., "Ужгрод", "Львіф", "Harkiv", "Киев"). Ти *повинен* докласти максимум зусиль, щоб розпізнати та **автоматично виправити** ці одруки.
    4. **Краще автоматично виправити одрук, ніж повернути помилку "not_found".** 5. Поле "corrected_name" **завжди** має містити фінальну, коректну назву міста, яку ти знайшов (напр., "Ужгород").
    6. Якщо місто неможливо знайти (напр., 'asdfg') -> {"error": "not_found"}
    7. Якщо місто неоднозначне (напр., 'Париж' без країни) -> {"error": "ambiguous"}

    Приклад (Успіх з виправленням): {"lat": 48.6208, "lon": 22.2879, "timezone": "Europe/Uzhhorod", "corrected_name": "Ужгород"}
    Приклад (Успіх без виправлення): {"lat": 50.4501, "lon": 30.5234, "timezone": "Europe/Kyiv", "corrected_name": "Київ"}
    Приклад (Помилка): {"error": "not_found"}
`;

async function callGeminiAPI(systemPrompt, userQuery) {
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    try {
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload, modelName: MODEL_NAME })
        });

        if (response.ok) {
            const result = await response.json();
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                return candidate.content.parts[0].text;
            }
        }
        console.warn("Geo API Warning:", response.status);
        return null;
    } catch (error) {
        console.error("Geo API Network Error:", error);
        return null;
    }
}

export async function getCoordinates(cityName) {
    const userQuery = `Місто: ${cityName}`;
    
    try {
        const rawJsonText = await callGeminiAPI(GEO_SYSTEM_PROMPT, userQuery);
        
        if (!rawJsonText) return { error: "network_failure" };

        // Clean JSON (remove markdown fences if present)
        const cleanedJsonText = rawJsonText.replace(/```json\n?([\s\S]*?)\n?```/g, '$1').trim();
        const coords = JSON.parse(cleanedJsonText);

        // Validation logic from Monolith
        if (coords && typeof coords.lat === 'number' && typeof coords.lon === 'number') {
            console.log(`Geocoding success for ${cityName}:`, coords);
            return {
                latitude: coords.lat,
                longitude: coords.lon,
                timezone: coords.timezone,
                corrected_name: coords.corrected_name,
                error: null
            };
        }

        if (coords && coords.error) {
            console.warn(`Geocoding failed for ${cityName}:`, coords.error);
            return { error: coords.error };
        }

        return { error: "parse_error" };

    } catch (error) {
        console.error(`Geocoding failed for ${cityName}:`, error);
        return { error: "network_failure" };
    }
}