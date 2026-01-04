import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { typeWriter } from '../../utils/animations.js';
import { getFreeAnalysis, warmUpBackend } from '../../services/api.service.js'; 

export async function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    // 🚀 START WARP SPEED
    document.body.classList.add('warp-mode');

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

    // 2. Анімація (Оптимізована: обривається, якщо API готовий)
    const loadingSteps = [
        { text: "З'єднуюсь з ефемеридами NASA...", pause: 1000 },
        { text: "Аналізую положення планет...", pause: 1200 },
        { text: "Зчитую твій енергетичний код...", pause: 1200 },
        { text: "Розшифровую кармічні вузли...", pause: 1500 },
        { text: "Будую твою натальну карту...", pause: 1500 },
        { text: "Приготуйся дізнатись, наскільки ти чудова 😈", pause: 2000, final: true }
    ];

    const animationPromise = (async () => {
        for (let i = 0; i < loadingSteps.length; i++) {
            // 🔥 КЛЮЧОВА ЗМІНА: Перевірка ПЕРЕД кроком
            // Якщо дані вже є, ми не починаємо новий крок, а виходимо з циклу.
            if (isApiReady) {
                console.log("🚀 API Ready! Skipping remaining animation steps.");
                break;
            }

            const step = loadingSteps[i];

            // Перевірка існування елементів перед запуском анімації
            if (loadingTextEl && loadingCursorEl) {
                // Якщо API відповість ПІД ЧАС друку цього тексту,
                // ми все одно дочекаємось завершення рядка (щоб не було візуального "глюку" з обірваним словом),
                // але паузу після тексту робимо мінімальною.
                const dynamicPause = isApiReady ? 300 : step.pause;
                
                await typeWriter(loadingTextEl, loadingCursorEl, step.text, 50, dynamicPause, step.final);
            }
            
            // 🔥 КЛЮЧОВА ЗМІНА: Перевірка ПІСЛЯ кроку (подвійний контроль)
            if (isApiReady) {
                console.log("🚀 API Ready! Animation loop stopped.");
                break;
            }
        }
        
        if (loadingCursorEl) loadingCursorEl.style.display = 'none';
    })();

    // 3. Синхронізація
    // Promise.all завершиться миттєво, коли animationPromise зробить break
    await Promise.all([animationPromise, apiPromise]);

    // 🚀 STOP WARP SPEED
    document.body.classList.remove('warp-mode');

    // 4. Перехід
    router.navigateTo('result'); 
}