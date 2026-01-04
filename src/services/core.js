import { API_BASE } from '../config.js';

/**
 * CORE HTTP CLIENT (Smart Adapter)
 * Єдина точка виходу для всіх запитів.
 * * 🔥 FIX: Тепер вміє розрізняти відносні шляхи (для AI) 
 * і абсолютні URL (для Payments/Functions v2).
 */
export async function request(endpoint, data = {}) {
    try {
        let url;

        // 🔥 SMART CHECK: Якщо це повний URL (починається з http), не додаємо API_BASE
        if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
            url = endpoint;
        } else {
            // Інакше клеїмо базу (для старих ендпоінтів)
            const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
            url = `${API_BASE}/${cleanEndpoint}`;
        }
        
        // Логування для відладки (можна буде прибрати)
        console.log(`[API Request] -> ${url}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errText = await response.text();
            // Кидаємо помилку з текстом від сервера, щоб бачити деталі в консолі
            throw new Error(errText || `API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`[API Core Error] ${endpoint}:`, error);
        throw error;
    }
}