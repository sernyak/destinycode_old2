import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { typeWriter } from '../../utils/animations.js';
import { getFreeAnalysis, warmUpBackend } from '../../services/api.service.js'; 

export async function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    const loadingTextEl = document.getElementById('loading-text');
    const loadingCursorEl = document.getElementById('loading-cursor');
    const date = state.get('date');

    // 🔥 WARM UP STRATEGY:
    warmUpBackend();

    let isApiReady = false;

    // 1. Запит до API (Паралельно)
    const apiPromise = getFreeAnalysis(date)
        .then(data => {
            state.set('freeReport', data);
            isApiReady = true; // Маркер готовності
            return data;
        })
        .catch(err => {
            console.error("API Error:", err);
            return {
                error: true,
                title: "❌ Помилка Аналізу",
                psychological_analysis: `<p>На жаль, сталася помилка під час обробки відповіді від ШІ.</p>`
            };
        });

    // 2. Анімація (Розширена та виправлена)
    const loadingSteps = [
        { text: "З'єднуюсь з ефемеридами NASA...", pause: 1000 },
        { text: "Аналізую положення планет...", pause: 1200 },
        { text: "Зчитую твій енергетичний код...", pause: 1200 },
        { text: "Розшифровую кармічні вузли...", pause: 1500 },
        { text: "Будую твою натальну карту...", pause: 1500 },
        { text: "Приготуйся дізнатись, наскільки ти ахуєнна 😈", pause: 2000, final: true }
    ];

    const animationPromise = (async () => {
        for (let i = 0; i < loadingSteps.length; i++) {
            const step = loadingSteps[i];
            
            // Логіка прискорення, якщо API вже відповів
            let currentPause = step.pause;
            if (isApiReady && !step.final) {
                currentPause = 600; 
            }

            // Перевірка існування елементів перед запуском анімації
            if (loadingTextEl && loadingCursorEl) {
                await typeWriter(loadingTextEl, loadingCursorEl, step.text, 50, currentPause, step.final);
            }
            
            // Додаткове очікування на останньому кроці, якщо API ще думає
            if (step.final && !isApiReady) {
               // Можна додати логіку очікування, але зазвичай цього часу вистачає
            }
        }
        
        if (loadingCursorEl) loadingCursorEl.style.display = 'none';
    })();

    // 3. Синхронізація
    await Promise.all([animationPromise, apiPromise]);

    // 4. Перехід
    router.navigateTo('result'); 
}