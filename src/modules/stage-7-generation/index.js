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
    // 🔥 ОСТАННЯ ФРАЗА - повідомлення про затримку (показується коли всі попередні відтворились)
    const loadingStepsConfig = [
        { text: "✨ Аналізую Ядро твоєї Особистості...", pause: 1500 },
        { text: "❤️‍🔥 Розшифровую твої сценарії Кохання...", pause: 1500 },
        { text: "👑 Шукаю, де приховані твої Гроші...", pause: 1500 },
        { text: "🔮 Вивчаю твої Кармічні Уроки...", pause: 1500 },
        { text: "🌙 З'єднуюсь з енергією твого Місяця...", pause: 1500 },
        { text: "🪐 Перевіряю транзити Сатурна...", pause: 1500 },
        { text: "💫 Рахую аспекти Венери до твого Асценденту...", pause: 1500 },
        { text: "📜 Формую стародавній сувій твоєї долі...", pause: 1500 },
        { text: "🧘‍♀️ Майже готово, Всесвіт підбирає слова...", pause: 1500 },
        { text: "🦋 Твоя унікальність потребує детального аналізу...", pause: 1500 },
        { text: "✨ Додаю трохи зіркового пилу в твій звіт...", pause: 1500 },
        { text: "⚡️ Фіналізація космічного паспорта...", pause: 2000 },
        
        // 🔥 ОСТАННЯ ФРАЗА: Повідомлення про затримку (показується коли всі попередні відтворились)
        { 
            text: "🌞 З твоїм звітом все гаразд, просто сьогодні спалахи на сонці і треба трохи більше часу ніж зазвичай. Звіт вже летить тобі на пошту, і зараз відкриється тут.", 
            pause: 0,
            isDelayMessage: true 
        }
    ];

    let isReportReady = false;
    let apiResultData = null;
    const MAX_TIMEOUT_MS = 120000; // 2 хвилини максимальний таймаут

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
            
            // Для останньої фрази (про затримку) - залишаємо курсор, щоб показати що чекаємо
            if (step.isDelayMessage) {
                if (cursorEl) cursorEl.style.display = 'inline-block';
                // Трохи зменшуємо шрифт для довгого тексту
                if (textEl) {
                    textEl.style.fontSize = '0.95rem';
                    textEl.style.lineHeight = '1.6';
                }
            }
            
            // Пауза після фрази (теж переривається, якщо дані прийшли)
            // Для повідомлення про затримку пауза = 0, бо воно має "висити" на екрані
            const pauseStep = 100;
            let currentPause = 0;
            while (currentPause < step.pause) {
                if (isReportReady) return; // Вихід під час паузи
                await new Promise(r => setTimeout(r, pauseStep));
                currentPause += pauseStep;
            }
        }
        
        // Якщо анімація закінчилась, а звіт ще не готовий - продовжуємо показувати останнє повідомлення
        // (воно вже на екрані, просто чекаємо)
        while (!isReportReady) {
            await new Promise(r => setTimeout(r, 500)); // Перевіряємо кожні 500мс
        }
    };

    // Запускаємо анімацію, не чекаючи її (вона живе своїм життям)
    const animationPromise = runAnimation();

    // --- 3. API Запит (Паралельно) з таймаутом ---
    const apiCall = async () => {
        try {
            const data = await generateFullReport(userData, email);
            
            if (data && !data.error) {
                state.set('fullReport', data); 
                return { success: true, data };
            } else {
                console.error("Report Generation Failed:", data);
                // 🔥 НЕ показуємо помилку клієнту, просто продовжуємо чекати
                return { success: false, message: data?.message || "Unknown error" };
            }
        } catch (err) {
            console.error("API Network Error:", err);
            // 🔥 НЕ показуємо помилку клієнту, просто продовжуємо чекати
            return { success: false, message: err.message };
        }
    };

    // Створюємо Promise з таймаутом
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: false, timeout: true });
        }, MAX_TIMEOUT_MS);
    });

    // Чекаємо або результат API, або таймаут (який приходить першим)
    const result = await Promise.race([apiCall(), timeoutPromise]);

    // Якщо таймаут спрацював, але звіт ще не прийшов - продовжуємо чекати
    if (result.timeout && !result.success) {
        console.log("⏱️ Timeout reached (2 min), but continuing to wait for report...");
        
        // Продовжуємо чекати звіт (можливо він все одно прийде)
        // Але не показуємо помилку клієнту - повідомлення про "сонячні спалахи" вже на екрані
        try {
            // Пробуємо ще раз отримати звіт (можливо він вже готовий)
            const retryResult = await apiCall();
            if (retryResult.success) {
                apiResultData = retryResult;
                isReportReady = true;
            } else {
                // Якщо все ще немає - продовжуємо чекати
                // (звіт може прийти на пошту, або через webhook)
                // Не показуємо помилку клієнту
                console.log("⏳ Still waiting for report...");
                
                // Чекаємо ще трохи, а потім переходимо (можливо звіт вже на пошті)
                await new Promise(r => setTimeout(r, 10000)); // Чекаємо ще 10 сек
                
                // Переходимо на результат (можливо звіт вже на пошті)
                apiResultData = { success: true, fromEmail: true };
                isReportReady = true;
            }
        } catch (e) {
            console.error("Retry failed:", e);
            // Все одно переходимо (звіт може бути на пошті)
            apiResultData = { success: true, fromEmail: true };
            isReportReady = true;
        }
    } else {
        // Звіт прийшов вчасно
        apiResultData = result;
        isReportReady = true;
    }

    // --- 4. Перехід (завжди успішний, ніколи не показуємо помилку) ---
    // Невелика затримка (300мс), щоб око встигло зафіксувати зміну стану
    setTimeout(() => {
        router.navigateTo('premium-result');
    }, 300);
}