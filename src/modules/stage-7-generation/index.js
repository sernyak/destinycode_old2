import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { typeWriter } from '../../utils/animations.js';
import { generateFullReport, generateForecast } from '../../services/api.service.js';

export async function init(router) {
    const app = document.getElementById('app');
    
    // Ensure container
    app.classList.add('funnel-container');
    
    app.innerHTML = html;

    const textEl = document.getElementById('report-loading-text');
    const cursorEl = document.getElementById('report-cursor');

    // Отримуємо дані для запиту
    const userData = {
        date: state.get('date'),
        time: state.get('time'),
        city: state.get('city'),
        geo: state.get('geo')
    };
    const email = state.get('email');

    // 1. Якщо юзер купив Upsell, але ми не згенерували його раніше (рідкісний кейс) - запускаємо
    if (state.get('hasPaidUpsell')) {
        // Forecast генерується фоново, не чекаємо його
        generateForecast(userData, email);
    }

    // 2. Анімація (Точна копія з моноліту)
    const animationPromise = (async () => {
        const typeSpeedMs = 70;
        const loadingStepsConfig = [
            { text: "✨ Аналізую Ядро твоєї Особистості", pause: 1000 },
            { text: "❤️‍🔥 Розшифровую твої сценарії Кохання", pause: 1000 },
            { text: "👑 Шукаю, де приховані твої Гроші", pause: 1000 },
            { text: "🔮 Вивчаю твої Кармічні Уроки", pause: 1000 },
            { text: "⚡️ Завантажую твій персональний звіт", pause: 0 }
        ];

        for (let i = 0; i < loadingStepsConfig.length; i++) {
            const step = loadingStepsConfig[i];
            const isLastStep = (i === loadingStepsConfig.length - 1);
            // Використовуємо нашу утиліту typeWriter
            await typeWriter(textEl, cursorEl, step.text, typeSpeedMs, step.pause, isLastStep);
        }
    })();

    // 3. API Запит (Generate Full Report)
    const apiPromise = generateFullReport(userData, email)
        .then(data => {
            if (data && !data.error) {
                state.set('fullReport', data); // Зберігаємо звіт
                return true;
            } else {
                console.error("Report Generation Failed:", data);
                return false;
            }
        })
        .catch(err => {
            console.error("API Error:", err);
            return false;
        });

    // 4. Синхронізація (Чекаємо обох)
    await Promise.all([animationPromise, apiPromise]);

    // 5. Перехід
    router.navigateTo('premium-result');
}