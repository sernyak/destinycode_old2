import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { getCoordinates } from '../../services/geo.service.js';

export function init(router) {
    const app = document.getElementById('app');
    
    // Ensure container class
    app.classList.add('funnel-container');
    
    app.innerHTML = html;

    // --- DOM Elements ---
    const birthTimeInput = document.getElementById('birth-time');
    const timePlaceholder = document.getElementById('time-placeholder');
    const birthTimeWrapper = birthTimeInput.closest('.input-field');
    const timeErrorMessage = document.getElementById('time-error-message');

    const birthCityInput = document.getElementById('birth-city');
    const cityErrorMessage = document.getElementById('city-error-message');
    const cityInfoMessage = document.getElementById('city-info-message');
    
    const continueToPaywallButton = document.getElementById('continue-to-paywall-button');
    const skipButton = document.getElementById('skip-button');

    // --- 1. Time Placeholder Logic ---
    function updateTimePlaceholder() {
        if (!birthTimeInput || !timePlaceholder) return;

        if (!birthTimeInput.value) {
            timePlaceholder.innerText = 'Обери час';
            timePlaceholder.style.color = 'var(--secondary-text-color)';
        } else {
            timePlaceholder.innerText = birthTimeInput.value;
            timePlaceholder.style.color = 'var(--primary-text-color)';
            
            // При виборі часу прибираємо помилки
            if (birthTimeWrapper) birthTimeWrapper.classList.remove('input-error');
            if (timeErrorMessage) timeErrorMessage.style.display = 'none';
        }
    }

    birthTimeInput.addEventListener('input', updateTimePlaceholder);
    birthTimeInput.addEventListener('change', updateTimePlaceholder);
    birthTimeInput.addEventListener('blur', updateTimePlaceholder);
    // Init
    updateTimePlaceholder();

    // --- 2. Input Error Cleaning ---
    birthCityInput.addEventListener('input', () => {
        cityErrorMessage.style.display = 'none';
        cityInfoMessage.style.display = 'none';
        birthCityInput.classList.remove('input-error');
    });

    // --- Helper: Loading State ---
    function setButtonLoading(button, isLoading) {
        if (!button) return; // Захист, якщо кнопка не знайдена

        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    // --- Helper: Handle City Errors (Shared) ---
    function handleCityError(type, cityName) {
        if (type === 'ambiguous') {
            // 🔥 UX UPDATE: Додано приклад формату уточнення
            cityErrorMessage.innerText = `Місто "${cityName}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну (наприклад: ${cityName}, Україна).`;
        } else {
            cityErrorMessage.innerText = `Не можемо знайти місто "${cityName}". Перевірте назву.`;
        }
        cityErrorMessage.style.display = 'block';
        birthCityInput.classList.add('input-error');
    }

    // --- 3. Main Validation Logic (STRICT FLOW) ---
    continueToPaywallButton.addEventListener('click', async () => {
        const time = birthTimeInput.value;
        let city = birthCityInput.value.trim();
        const originalUserCityInput = city;
        
        let hasBlockingErrors = false;

        // Reset UI Messages
        cityErrorMessage.style.display = 'none';
        timeErrorMessage.style.display = 'none';
        birthTimeWrapper.classList.remove('input-error');
        birthCityInput.classList.remove('input-error');

        // КРОК 1: Перевірка на порожнечу
        if (!city) {
            birthCityInput.classList.add('input-error');
            cityErrorMessage.innerText = "Будь ласка, введи місто народження.";
            cityErrorMessage.style.display = 'block';
            hasBlockingErrors = true;
        }

        if (!time) {
            birthTimeWrapper.classList.add('input-error');
            timeErrorMessage.style.display = 'block';
            hasBlockingErrors = true;
        }

        // Якщо міста немає - стоп (нема сенсу питати API)
        if (!city && hasBlockingErrors) {
            if (navigator.vibrate) navigator.vibrate(50);
            return; 
        }

        // КРОК 2: Geo API
        setButtonLoading(continueToPaywallButton, true);
        
        const coords = await getCoordinates(city);
        let infoText = null;

        if (coords && coords.latitude) {
            // Місто знайдено успішно
            if (coords.corrected_name) {
                birthCityInput.value = coords.corrected_name;
                city = coords.corrected_name;
                
                if (originalUserCityInput.toLowerCase() !== coords.corrected_name.toLowerCase()) {
                    infoText = `Ми уточнили: ${coords.corrected_name} 😉`;
                }
            }
            
            state.set('geo', {
                latitude: coords.latitude || coords.lat,
                longitude: coords.longitude || coords.lon,
                timezone: coords.timezone
            });
            state.set('city', coords.corrected_name);

        } else if (coords && coords.error === 'ambiguous') {
            handleCityError('ambiguous', city);
            hasBlockingErrors = true; 
        } else {
            handleCityError('not_found', city);
            hasBlockingErrors = true;
        }

        // Відображення інфо
        if (infoText) {
            cityInfoMessage.innerText = infoText;
            cityInfoMessage.style.display = 'block';
        } else {
             cityInfoMessage.style.display = 'none';
        }

        // Якщо є помилки, вимикаємо лоадер на кнопці
        if (hasBlockingErrors) {
            setButtonLoading(continueToPaywallButton, false);
            if (navigator.vibrate) navigator.vibrate(50);
            return;
        }

        // КРОК 4: Успіх
        // Лоадер не вимикаємо, переходимо далі
        state.set('time', time);
        
        // 🔥 COMMIT STEP: Збираємо всі дані в єдиний об'єкт 'userData'.
        const fullUserData = {
            date: state.get('date'),
            time: time,
            city: state.get('city'),
            geo: state.get('geo')
        };
        state.set('userData', fullUserData);

        setTimeout(() => {
            router.navigateTo('paywall');
        }, infoText ? 1200 : 0);
    });

    // --- 4. Skip Button Logic (Modified: Trigger Main Button Spinner) ---
    skipButton.addEventListener('click', async () => {
        let city = birthCityInput.value.trim();
        const originalUserCityInput = city;

        // Reset errors
        cityErrorMessage.style.display = 'none';
        timeErrorMessage.style.display = 'none';
        birthCityInput.classList.remove('input-error');
        birthTimeWrapper.classList.remove('input-error');

        // 🔥 VALIDATION: City is REQUIRED even for skip logic
        if (!city) {
            birthCityInput.classList.add('input-error');
            cityErrorMessage.innerText = "Будь ласка, введи місто, навіть якщо не знаєш часу.";
            cityErrorMessage.style.display = 'block';
            if (navigator.vibrate) navigator.vibrate(50);
            return;
        }

        // 🔥 TARGET CHANGE: Запускаємо лоадер на ГОЛОВНІЙ кнопці
        setButtonLoading(continueToPaywallButton, true); 
        // Додатково блокуємо кнопку пропуску, щоб не клікали двічі
        skipButton.disabled = true;

        const coords = await getCoordinates(city);
        let infoText = null;
        let hasError = false;

        if (coords && coords.latitude) {
            // Успіх Geo API
            if (coords.corrected_name) {
                birthCityInput.value = coords.corrected_name;
                city = coords.corrected_name;
                
                if (originalUserCityInput.toLowerCase() !== coords.corrected_name.toLowerCase()) {
                    infoText = `Ми уточнили: ${coords.corrected_name} 😉`;
                }
            }

            state.set('geo', {
                latitude: coords.latitude || coords.lat,
                longitude: coords.longitude || coords.lon,
                timezone: coords.timezone
            });
            state.set('city', coords.corrected_name);
            
            // 🔥 CLEAR TIME Explicitly
            state.set('time', ''); 

        } else if (coords && coords.error === 'ambiguous') {
            handleCityError('ambiguous', city);
            hasError = true;
        } else {
            handleCityError('not_found', city);
            hasError = true;
        }

        // Show info if corrected
        if (infoText) {
            cityInfoMessage.innerText = infoText;
            cityInfoMessage.style.display = 'block';
        }

        // Якщо помилка — знімаємо лоадер з головної кнопки і розблоковуємо скіп
        if (hasError) {
            setButtonLoading(continueToPaywallButton, false);
            skipButton.disabled = false;
            if (navigator.vibrate) navigator.vibrate(50);
            return;
        }

        // Якщо успіх — лоадер на головній кнопці залишається крутитися до переходу
        console.log("User skipped time, but city is valid.");

        // 🔥 COMMIT STEP (SKIP MODE): Формуємо об'єкт userData без часу
        const fullUserData = {
            date: state.get('date'),
            time: '', // Порожній час для скіпу
            city: state.get('city'),
            geo: state.get('geo')
        };
        state.set('userData', fullUserData);
        
        // Navigate
        setTimeout(() => {
            router.navigateTo('paywall');
        }, infoText ? 1200 : 0);
    });
}