import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { typeWriter } from '../../utils/animations.js';
import { generateFullReport, generateForecast } from '../../services/api.service.js';
import { startAtomOrbitAnimation } from './atom-orbit-animation.js';
import { request } from '../../services/core.js';
import { API } from '../../config.js';

export async function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    const textEl = document.getElementById('report-loading-text');
    const cursorEl = document.getElementById('report-cursor');

    const variantInfo = state.get('currentVariant') || {};
    
    // 🔥 Якщо це прогноз (як головний продукт або апсел), змінюємо заголовок
    if (variantInfo.productType === 'forecast' || variantInfo.id === 'forecast') {
        const mainTitle = document.getElementById('generation-main-title');
        if (mainTitle) {
            mainTitle.innerText = 'ГЕНЕРАЦІЯ ПРОГНОЗУ';
            mainTitle.style.textTransform = 'uppercase';
        }
    }

    // ☄️ 3D Comet Orbit around "Підготовка звіту!" heading
    let stopOrbit = null;
    const orbitTarget = document.getElementById('generation-orbit-target');
    if (orbitTarget) {
        stopOrbit = startAtomOrbitAnimation(orbitTarget);
    }

    // 🚀 START WARP SPEED
    document.body.classList.add('warp-mode');

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
    let loadingStepsConfig = [
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

    // 🔥 VARIANT OVERRIDE: Generation Steps
    const currentVariant = state.get('currentVariant');
    if (currentVariant && currentVariant.ui && currentVariant.ui.generation && currentVariant.ui.generation.steps) {
        loadingStepsConfig = currentVariant.ui.generation.steps;
    }

    let isReportReady = false;
    let apiResultData = null;
    const MAX_TIMEOUT_MS = 600000; // 🔥 10 хвилин (збільшено для покриття довгих генерацій)

    // --- 2. Логіка Анімації (Розумна черга) ---
    const runAnimation = async () => {
        const typeSpeedMs = 50;

        for (let i = 0; i < loadingStepsConfig.length; i++) {
            // 🔥 Check if report is ready BEFORE typing
            if (isReportReady && apiResultData && apiResultData.success) {
                console.log("🚀 Report is ready! Skipping remaining animation.");
                return;
            }

            const step = loadingStepsConfig[i];

            // Запускаємо друк
            await typeWriter(textEl, cursorEl, step.text, typeSpeedMs, 0, false);

            // Для останньої фрази (про затримку)
            if (step.isDelayMessage) {
                if (cursorEl) cursorEl.style.display = 'inline-block';
                if (textEl) {
                    textEl.style.fontSize = '0.95rem';
                    textEl.style.lineHeight = '1.6';
                }
            }

            // Пауза після фрази
            const pauseStep = 100;
            let currentPause = 0;
            // Delay message should stay indefinately until report is ready
            const targetPause = step.isDelayMessage ? 999999 : step.pause;

            while (currentPause < targetPause) {
                if (isReportReady && apiResultData && apiResultData.success) return;
                await new Promise(r => setTimeout(r, pauseStep));
                currentPause += pauseStep;
            }
        }
    };

    // --- 3. API Запит (З повторами при помилці) ---
    const runApiParams = async () => {
        let attempts = 0;
        const startTime = Date.now();

        while (Date.now() - startTime < MAX_TIMEOUT_MS) {
            attempts++;
            try {
                console.log(`🚀 Starting API Request (Attempt ${attempts})...`);
                const data = await generateFullReport(userData, email);
                console.log("✅ API Request Finished:", data);

                if (data && !data.error) {
                    state.set('fullReport', data);
                    apiResultData = { success: true, data };
                    isReportReady = true;

                    // 🔥 SYNC: Оновлюємо Firestore точним звітом (для Telegram Bot)
                    const invoiceId = state.get('pendingInvoiceId');
                    if (invoiceId && data.sections) {
                        const variant = state.get('currentVariant');
                        const productType = variant?.productType || variant?.aiContext?.productType;
                        const reportType = productType === 'partner' ? 'partner' : productType === 'forecast' ? 'upsell' : 'main';

                        request(API.endpoints.UPDATE_REPORT, {
                            invoiceId,
                            sections: data.sections,
                            reportType
                        }).then(() => {
                            console.log("✅ Report synced to Firestore for Telegram");
                        }).catch(e => {
                            console.warn("⚠️ Report sync failed (non-critical):", e.message);
                        });
                    }

                    return; // Success!
                } else {
                    console.warn("⚠️ Report Generation Failed (Logic). Retrying...", data);
                    // Error logic: wait a bit and retry
                    await new Promise(r => setTimeout(r, 3000)); // 3 sec delay
                }
            } catch (err) {
                console.error("API Network Error:", err);
                await new Promise(r => setTimeout(r, 3000));
            }
        }

        console.error("❌ Max timeout reached. API failed.");
    };

    // Run both
    const animationPromise = runAnimation();
    const apiPromise = runApiParams();

    // Check every 500ms if report is ready or timeout reached
    // We rely on runApiParams loop to stop eventually
    // But we need to wait for either completion or timeout

    // Actually, simply waiting for apiPromise is enough because it has internal timeout loop
    await apiPromise;

    if (!isReportReady) {
        console.warn("⚠️ API took too long or failed silently. Proceeding to result anyway (check email fallback).");
        // Force proceed (User will likely see 'Restoring...' in Stage 8, but this is 10 mins later)
        apiResultData = { success: true, fromEmail: true };
        isReportReady = true;
    }

    // --- 4. Перехід (завжди успішний, ніколи не показуємо помилку) ---
    // 🚀 STOP WARP SPEED & Orbit
    document.body.classList.remove('warp-mode');
    if (stopOrbit) stopOrbit();

    // Невелика затримка (300мс), щоб око встигло зафіксувати зміну стану
    setTimeout(() => {
        router.navigateTo('premium-result');
    }, 300);
}