/**
 * geo.service.js
 * Сервіс для отримання координат (SECURE BACKEND VERSION)
 */

// 🔥 IMPORT CONFIG
import { API, SYSTEM } from '../config.js';

// URL з конфігу
const PROXY_URL = API.PROXY;
const MODEL_NAME = SYSTEM.MODEL_NAME;

async function getSecureCoordinates(cityName) {
    try {
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                action: 'geo',           
                data: { query: cityName }, 
                modelName: MODEL_NAME 
            })
        });

        if (response.ok) {
            const result = await response.json();
            const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (rawText) {
                const cleanedJsonText = rawText.replace(/```json\n?([\s\S]*?)\n?```/g, '$1').trim();
                return JSON.parse(cleanedJsonText);
            }
        }
        
        console.warn("Geo API Error Status:", response.status);
        return { error: "network_failure" };

    } catch (error) {
        console.error("Geo API Network Error:", error);
        return { error: "network_failure" };
    }
}

export async function getCoordinates(cityName) {
    const coords = await getSecureCoordinates(cityName);

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
        return { error: coords.error };
    }

    return { error: "parse_error" };
}