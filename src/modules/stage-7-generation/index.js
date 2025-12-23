import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { typeWriter } from '../../utils/animations.js';
import { generateFullReport, generateForecast } from '../../services/api.service.js';

export async function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    const textEl = document.getElementById('report-loading-text');
    const cursorEl = document.getElementById('report-cursor');

    const userData = {
        date: state.get('date'),
        time: state.get('time'),
        city: state.get('city'),
        geo: state.get('geo')
    };
    const email = state.get('email');

    // 1. Upsell Background Check (Прогноз вже генерується, якщо був куплений)
    if (state.get('hasPaidUpsell')) {
        generateForecast(userData, email).catch(e => console.warn("Forecast bg error:", e));
    }

    // --- Фрази для анімації (Астро-стиль) ---
    const loadingStepsConfig = [
        // Основні етапи (швидкі)
        { text: "✨ Аналізую Ядро твоєї Особистості...", pause: 1200 },
        { text: "❤️‍🔥 Розшифровую твої сценарії Кохання...", pause: 1200 },
        { text: "👑 Шукаю, де приховані твої Гроші...", pause: 1200 },
        { text: "🔮 Вивчаю твої Кармічні Уроки...", pause: 1200 },
        
        // Додаткові фрази (якщо затягується)
        { text: "🌙 З'єднуюсь з енергією твого Місяця...", pause: 1500 },
        { text: "🪐 Перевіряю транзити Сатурна (він любить точність)...", pause: 1500 },
        { text: "💫 Рахую аспекти Венери до твого Асценденту...", pause: 1500 },
        { text: "📜 Формую стародавній сувій твоєї долі...", pause: 1500 },
        { text: "🧘‍♀️ Майже готово, Всесвіт підбирає слова...", pause: 1500 },
        { text: "🦋 Твоя унікальність потребує детального аналізу...", pause: 1500 },
        { text: "✨ Додаю трохи зіркового пилу в твій звіт...", pause: 1500 },
        { text: "⚡️ Фіналізація космічного паспорта...", pause: 2000 }
    ];

    let isReportReady = false;
    let apiResultData = null;

    // --- 2. Логіка Анімації (Розумна черга) ---
    const runAnimation = async () => {
        const typeSpeedMs = 50;

        for (let i = 0; i < loadingStepsConfig.length; i++) {
            // 🔥 КЛЮЧОВИЙ МОМЕНТ: Перевірка перед кожним кроком
            if (isReportReady) {
                console.log("🚀 Report is ready! Skipping animation.");
                return; // Миттєвий вихід з анімації
            }

            const step = loadingStepsConfig[i];
            
            // Запускаємо друк. Якщо під час друку прийдуть дані - ми це перевіримо після завершення рядка.
            await typeWriter(textEl, cursorEl, step.text, typeSpeedMs, 0, false);
            
            // Пауза після фрази (теж переривається, якщо дані прийшли)
            const pauseStep = 100;
            let currentPause = 0;
            while (currentPause < step.pause) {
                if (isReportReady) return; // Вихід під час паузи
                await new Promise(r => setTimeout(r, pauseStep));
                currentPause += pauseStep;
            }
        }
    };

    // Запускаємо анімацію, не чекаючи її (вона живе своїм життям)
    const animationPromise = runAnimation();

    // --- 3. API Запит (Паралельно) ---
    try {
        const data = await generateFullReport(userData, email);
        
        // Як тільки дані прийшли:
        isReportReady = true; // 1. Ставимо прапорець (зупиняє анімацію)
        
        if (data && !data.error) {
            state.set('fullReport', data); 
            apiResultData = { success: true };
        } else {
            console.error("Report Generation Failed:", data);
            apiResultData = { success: false, message: data.message, type: data.type };
        }
    } catch (err) {
        isReportReady = true;
        console.error("API Network Error:", err);
        apiResultData = { success: false, message: "Проблема з мережею" };
    }

    // --- 4. Перехід ---
    if (apiResultData && apiResultData.success) {
        // Невелика затримка (300мс), щоб око встигло зафіксувати зміну стану, якщо анімація обірвалась різко
        setTimeout(() => {
            router.navigateTo('premium-result');
        }, 300);
    } else {
        // Обробка помилок
        let errorMsg = "З'єднання перервано";
        if (apiResultData?.type === 'timeout') {
            errorMsg = "Сервер прогрівається. Спробуйте ще раз.";
        } else if (apiResultData?.message) {
            errorMsg = apiResultData.message;
        }

        textEl.innerHTML = `<span style="color: #ef4444; font-size: 0.9em;">⚠️ ${errorMsg}</span>`;
        if (cursorEl) cursorEl.style.display = 'none';
        
        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn btn-primary mt-4';
        retryBtn.innerText = 'Натисніть для повтору ↻';
        retryBtn.style.maxWidth = '240px';
        retryBtn.style.margin = '20px auto';
        retryBtn.onclick = () => router.navigateTo('generation');
        
        const container = document.getElementById('report-typing-container');
        // Очищаємо контейнер від старих кнопок, якщо є
        const oldBtn = container.querySelector('button');
        if (oldBtn) oldBtn.remove();
        
        container.appendChild(retryBtn);
    }
}