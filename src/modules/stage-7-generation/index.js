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

    // 1. Upsell Background Check
    if (state.get('hasPaidUpsell')) {
        generateForecast(userData, email).catch(e => console.warn("Forecast bg error:", e));
    }

    let isReportReady = false;

    // 2. Виклик API (який тепер просто "підхопить" результат з кешу)
    const apiPromise = generateFullReport(userData, email)
        .then(data => {
            if (data && !data.error) {
                state.set('fullReport', data);
                isReportReady = true; 
                return { success: true };
            } else {
                return { success: false, message: data.message, type: data.type };
            }
        })
        .catch(err => {
            console.error("API Network Error:", err);
            return { success: false, message: "Проблема з мережею" };
        });

    // 3. Анімація
    const typeSpeedMs = 50; 
    const mainSteps = [
        { text: "✨ Аналізую Ядро твоєї Особистості", pause: 1000 },
        { text: "❤️‍🔥 Розшифровую твої сценарії Кохання", pause: 1000 },
        { text: "👑 Шукаю, де приховані твої Гроші", pause: 1000 },
        { text: "🔮 Вивчаю твої Кармічні Уроки", pause: 1000 },
        { text: "⚡️ Формую структуру твого звіту", pause: 500 }
    ];

    for (const step of mainSteps) {
        // 🔥 ОПТИМІЗАЦІЯ: Якщо звіт готовий, ми перериваємо анімацію раніше,
        // АЛЕ: Для ефекту "вау" краще дати хоча б основним крокам пройти (4-5 сек),
        // щоб юзер відчув цінність.
        // Якщо хочеш МИТТЄВО, розкоментуй рядок нижче:
        // if (isReportReady) break; 
        
        await typeWriter(textEl, cursorEl, step.text, typeSpeedMs, step.pause, false);
    }

    // 4. Чекання (Тільки якщо реально треба чекати)
    if (!isReportReady) {
        const waitingMessages = [
            "✍️ Дописую розділ про майбутнє...",
            "🎨 Оформлюю твої таблиці...",
            "✨ Додаю останні штрихи...",
            "🚀 Майже готово..."
        ];
        
        let msgIndex = 0;
        while (!isReportReady) {
            await typeWriter(textEl, cursorEl, waitingMessages[msgIndex], typeSpeedMs, 0, false);
            for (let i = 0; i < 20; i++) { 
                if (isReportReady) break;
                await new Promise(r => setTimeout(r, 100));
            }
            msgIndex = (msgIndex + 1) % waitingMessages.length;
        }
    }

    // 5. Фінал
    await typeWriter(textEl, cursorEl, "✅ Звіт готовий!", 30, 500, true);

    const apiResult = await apiPromise;

    if (apiResult.success) {
        router.navigateTo('premium-result');
    } else {
        // Error handling stays same
        let errorMsg = "З'єднання перервано";
        if (apiResult.type === 'timeout') {
            errorMsg = "Сервер прогрівається. Спробуйте ще раз.";
        } else if (apiResult.message) {
            errorMsg = apiResult.message;
        }

        textEl.innerHTML = `<span style="color: #ef4444; font-size: 0.9em;">⚠️ ${errorMsg}</span>`;
        if (cursorEl) cursorEl.style.display = 'none';
        
        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn btn-primary mt-4';
        retryBtn.innerText = 'Натисніть для повтору ↻';
        retryBtn.onclick = () => router.navigateTo('generation');
        document.getElementById('report-typing-container').appendChild(retryBtn);
    }
}