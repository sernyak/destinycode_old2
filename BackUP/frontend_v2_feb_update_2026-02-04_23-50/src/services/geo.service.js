/**
 * geo.service.js
 * Сервіс для отримання координат (SECURE BACKEND VERSION)
 * 🔥 REFACTOR: Переведено на використання core.js request()
 */

// 🔥 IMPORT CONFIG
import { API, SYSTEM } from '../config.js';
import { request } from './core.js'; // Імпортуємо core

// URL з конфігу
const PROXY_URL = API.PROXY;
const MODEL_NAME = SYSTEM.MODEL_NAME;

async function getSecureCoordinates(cityName) {
    try {
        // 🔥 Використовуємо універсальний request()
        // Core.js сам обробить response.ok і response.json()
        const result = await request(PROXY_URL, { 
            action: 'geo',           
            data: { query: cityName }, 
            modelName: MODEL_NAME 
        });

        // Core.js вже повернув JSON, тому result - це готовий об'єкт відповіді
        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (rawText) {
            // Очищення JSON від markdown, якщо він там є
            const cleanedJsonText = rawText.replace(/```json\n?([\s\S]*?)\n?```/g, '$1').trim();
            return JSON.parse(cleanedJsonText);
        }
        
        return { error: "parse_error" };

    } catch (error) {
        console.error("Geo API Network Error:", error);
        return { error: "network_failure" };
    }
}

export async function getCoordinates(cityName) {
    const coords = await getSecureCoordinates(cityName);

    if (coords && (typeof coords.lat === 'number' || typeof coords.latitude === 'number')) {
        console.log(`Geocoding success for ${cityName}:`, coords);
        return {
            latitude: coords.latitude || coords.lat,
            longitude: coords.longitude || coords.lon,
            timezone: coords.timezone,
            corrected_name: coords.corrected_name,
            error: null
        };
    }

    if (coords && coords.error) {
        return { error: coords.error };
    }

    return { error: "parse_error" };
}