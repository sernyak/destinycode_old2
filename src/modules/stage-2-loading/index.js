import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { typeWriter } from '../../utils/animations.js';
import { getFreeAnalysis } from '../../services/api.service.js';

export async function init(router) {
    const app = document.getElementById('app');
    
    // 🔥 Ensure container class (just in case)
    app.classList.add('funnel-container');
    
    app.innerHTML = html;

    const loadingTextEl = document.getElementById('loading-text');
    const loadingCursorEl = document.getElementById('loading-cursor');
    const date = state.get('date');

    // 1. Анімація (Точна копія текстів та таймінгів з моноліту)
    const animationPromise = (async () => {
        const loadingSteps = [
            'Аналізую положення планет',
            'Будую твою натальну карту',
            'Приготуйся дізнатись, наскільки ти ахуєнна 😈'
        ];
        
        // speed: 70ms, pause: 500ms
        await typeWriter(loadingTextEl, loadingCursorEl, loadingSteps[0], 70, 500);
        // speed: 70ms, pause: 500ms
        await typeWriter(loadingTextEl, loadingCursorEl, loadingSteps[1], 70, 500);
        // speed: 70ms, pause: 1500ms, keepCursor: true
        await typeWriter(loadingTextEl, loadingCursorEl, loadingSteps[2], 70, 1500, true);
        
        // Hide cursor manually after full finish (logic from monolith flow)
        if (loadingCursorEl) loadingCursorEl.style.display = 'none';
    })();

    // 2. Запит до API
    // Ми викликаємо його паралельно з анімацією
    const apiPromise = getFreeAnalysis(date)
        .then(data => {
            state.set('freeReport', data);
            return data;
        })
        .catch(err => {
            console.error("API Error:", err);
            // Fallback object mimics monolith error handling visual
            return {
                error: true,
                title: "❌ Помилка Аналізу",
                psychological_analysis: `<p>На жаль, сталася помилка під час обробки відповіді від ШІ. Це могло статися через перенавантаження.</p>`
            };
        });

    // 3. Синхронізація: Чекаємо обидва проміси
    await Promise.all([animationPromise, apiPromise]);

    // 4. Перехід
    router.navigateTo('result'); 
}