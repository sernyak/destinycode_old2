import { API_BASE } from '../config.js';

/**
 * CORE HTTP CLIENT (Smart Adapter v2)
 * Єдина точка виходу для всіх запитів.
 * Вміє працювати з відносними та абсолютними URL.
 * 🔥 UPDATE: Додано підтримку `options` для AbortController (таймаути).
 */
export async function request(endpoint, data = {}, options = {}) {
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
        
        // Логування для відладки (можна розкоментувати при потребі)
        // console.log(`[API Request] -> ${url}`);

        const fetchOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data),
            ...options // 🔥 Прокидаємо додаткові опції (наприклад, signal)
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errText = await response.text();
            // Кидаємо помилку з текстом від сервера, щоб бачити деталі в консолі
            throw new Error(errText || `API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        // Не логуємо помилку AbortError як "API Core Error", бо це штатна ситуація при таймауті
        if (error.name !== 'AbortError') {
            console.error(`[API Core Error] ${endpoint}:`, error);
        }
        throw error;
    }
}