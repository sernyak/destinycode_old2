import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';
import { processPayment } from '../../services/payment.service.js';
import { API, DISPLAY_PRICES, PAYMENT_PRICES } from '../../config.js';
import { getPrices } from '../../utils/pricing.js';
import { generateFullReport } from '../../services/api.service.js';

import { showModal } from '../../utils/modal.js';
import { Logger } from '../../utils/logger.js';

/**
 * Stage 8: Premium Result (v3.6.1 Full Version)
 * Всі 400+ рядків коду збережено. 
 * Єдина зміна: late-upsell-btn замінено на ltv-upsell-btn для GTM.
 */
export function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    const currentPrices = getPrices(); // 🔥 Отримуємо актуальні ціни

    const fullReportContentEl = document.getElementById('full-report-content');
    const reportActionsContainer = document.getElementById('report-actions-container');

    // 🔥 FIX: ОЧИЩЕННЯ ЗОВНІШНЬОГО КОНТЕЙНЕРА
    if (fullReportContentEl) {
        fullReportContentEl.style.backgroundColor = 'transparent';
        fullReportContentEl.style.border = 'none';
        fullReportContentEl.style.padding = '0';
        fullReportContentEl.className = 'w-full';
    }

    // Модальне вікно Upsell
    const lateUpsellModal = document.getElementById('late-upsell-modal');
    const closeLateUpsellBtn = document.getElementById('close-late-upsell');

    // 🔥 ОНОВЛЕНО: id ltv-upsell-btn для синхронізації з main.js
    const ltvUpsellBtn = document.getElementById('ltv-upsell-btn');

    // Модальне вікно успішної покупки
    const upsellPurchasedModal = document.getElementById('upsell-purchased-modal');
    const closePurchasedModalBtn = document.getElementById('close-purchased-modal-btn');

    const userData = state.get('userData') || {
        date: state.get('date'),
        time: state.get('time'),
        city: state.get('city'),
        geo: state.get('geo'),
        planets: state.get('planets') || []
    };
    const userEmail = state.get('email');

    // 🔥 CONSTANT FOR BACKUP STORAGE
    const REPORT_BACKUP_KEY = 'dc_full_report_backup_v2';

    // ============================================================
    // 🚀 ЛОГІКА "ЗАЛІЗНОГО КЕШУ" ТА ВІДНОВЛЕННЯ СЕСІЇ
    // ============================================================

    const urlParams = new URLSearchParams(window.location.search);
    const isUpsellReturn = urlParams.get('upsell_source') === 'stage8';

    if (isUpsellReturn) {
        Logger.log("💎 Detected return from Late Upsell payment. Restoring state...");
        state.set('hasPaidUpsell', true);

        try {
            const backup = localStorage.getItem(REPORT_BACKUP_KEY);
            if (backup) {
                const parsedBackup = JSON.parse(backup);
                if (parsedBackup && parsedBackup.sections) {
                    Logger.log("⚡️ Instant Report Restore from LocalStorage success!");
                    state.set('fullReport', parsedBackup);
                }
            }
        } catch (e) {
            console.error("Backup restore error:", e);
        }

        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);

        setTimeout(() => {
            if (reportActionsContainer) {
                reportActionsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }

    // Modal Listeners
    if (closeLateUpsellBtn) {
        closeLateUpsellBtn.addEventListener('click', () => lateUpsellModal.style.display = 'none');
    }
    if (closePurchasedModalBtn) {
        closePurchasedModalBtn.addEventListener('click', () => {
            if (upsellPurchasedModal) upsellPurchasedModal.style.display = 'none';
            renderButtons();
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === lateUpsellModal) lateUpsellModal.style.display = 'none';
        if (e.target === upsellPurchasedModal && upsellPurchasedModal) upsellPurchasedModal.style.display = 'none';
    });

    /**
     * 🔥 ГЕНЕРАТОР HTML ЗВІТУ
     */
    function generateReportHtml(sections) {
        if (!sections) return '';
        return sections.map(section => {
            let rawText = section.analysis_text || "";
            rawText = rawText.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff;">$1</strong>');

            const formattedText = rawText.split('\n').map(l => `<p>${l}</p>`).join('');

            return `
                <div class="report-section mb-8 p-6 rounded-2xl relative overflow-hidden" 
                     style="background-color: var(--card-bg-color); border: 1px solid var(--border-color); box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                    
                    <h2 class="mb-4 flex items-center gap-3" style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700;">
                        <span>${section.icon}</span> ${section.title}
                    </h2>
                    
                    <div class="report-content-text text-left leading-relaxed text-gray-300 space-y-3">
                        ${formattedText}
                    </div>
                    
                    <div class="report-advice mt-6 pt-4 border-t border-gray-700/50">
                        <strong class="block text-[#cda45e] mb-2 uppercase text-xs tracking-wider">⚡️ Порада зірок:</strong>
                        <p class="italic text-sm text-gray-400">${section.practical_advice}</p>
                    </div>
                </div>`;
        }).join('');
    }

    /**
     * 🔥 Helper: Attach click listener to Astro Box for Description Popup
     */
    function attachAstroBoxListener() {
        const astroBox = fullReportContentEl.querySelector('.astro-data-box');
        if (astroBox) {
            astroBox.style.cursor = 'pointer';
            astroBox.title = "Натисніть, щоб прочитати розшифровку";

            // Add simple hover effect via JS since CSS might be local to other modules
            astroBox.onmouseenter = () => { astroBox.style.borderColor = 'rgba(205, 164, 94, 0.6)'; };
            astroBox.onmouseleave = () => { astroBox.style.borderColor = 'rgba(205, 164, 94, 0.3)'; };

            astroBox.addEventListener('click', () => {
                const decryptionHtml = `
                    <p class="mb-3">Ти бачиш <strong>точні координати</strong> планет в момент твого народження (градуси, хвилини, секунди).</p>
                    
                    <p class="mb-3 text-sm italic" style="color: #cda45e; border-left: 2px solid #cda45e; padding-left: 10px;">
                        "Це не просто математика. Це унікальний генетичний код твоєї душі."
                    </p>

                    <ul class="text-sm space-y-2 mb-4">
                        <li><strong>Градус:</strong> Визначає зрілість планети (наприклад, Сонце в 29° — це "кармічний фінал", мудрість).</li>
                        <li><strong>Знак:</strong> "Одяг", який носить планета (твій стиль поведінки).</li>
                        <li><strong>Дім:</strong> Сфера життя, де ця енергія працює найсильніше (гроші, кохання, кар'єра).</li>
                    </ul>

                    <p class="mb-1">В <strong>цьому звіті</strong> ми переклали ці складні цифри на зрозумілу мову:</p>
                    <p class="text-white text-sm">✅ Як ці градуси впливають на твій дохід?<br>✅ Чому Венера в цьому положенні притягує саме таких чоловіків?</p>
                `;

                showModal("📡 Розшифровка Космічного Коду", decryptionHtml);
            });
        }
    }

    // --- 🔥 SMART RENDER LOGIC ---
    async function renderReport() {
        let reportData = state.get('fullReport');

        if (!reportData || !reportData.sections) {
            const backup = localStorage.getItem(REPORT_BACKUP_KEY);
            if (backup) {
                try {
                    reportData = JSON.parse(backup);
                    state.set('fullReport', reportData);
                } catch (e) { console.warn("Backup parse fail", e); }
            }
        }

        if (reportData && reportData.sections) {
            localStorage.setItem(REPORT_BACKUP_KEY, JSON.stringify(reportData));

            const reportContentHtml = generateReportHtml(reportData.sections);
            const astroHtml = await renderAstroBox(userData);

            fullReportContentEl.innerHTML = reportContentHtml + astroHtml;

            // 🔥 ATTACH LISTENER AFTER RENDER
            attachAstroBoxListener();

            renderButtons();
            return;
        }

        console.warn("⚠️ Report data missing. Fetching from API...");
        fullReportContentEl.innerHTML = `
            <div class="text-center py-12 space-y-4">
                <div class="spinner mx-auto" style="width: 3rem; height: 3rem;"></div>
                <p class="text-gray-400 animate-pulse text-sm">Відновлення вашого звіту...</p>
            </div>
        `;

        try {
            const recoveredData = await generateFullReport(userData, userEmail);
            if (recoveredData && !recoveredData.error && recoveredData.sections) {
                state.set('fullReport', recoveredData);
                localStorage.setItem(REPORT_BACKUP_KEY, JSON.stringify(recoveredData));

                const reportContentHtml = generateReportHtml(recoveredData.sections);
                const astroHtml = await renderAstroBox(userData);
                fullReportContentEl.innerHTML = reportContentHtml + astroHtml;

                // 🔥 ATTACH LISTENER AFTER RENDER
                attachAstroBoxListener();

                renderButtons();
            } else {
                throw new Error("Invalid recovery data");
            }
        } catch (e) {
            fullReportContentEl.innerHTML = `<div class="text-center p-6"><p class="text-red-400">Не вдалося завантажити звіт. Будь ласка, оновіть сторінку.</p></div>`;
        }
    }

    function renderButtons() {
        reportActionsContainer.innerHTML = '';

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-secondary';
        downloadBtn.innerHTML = '<span class="btn-text">Завантажити PDF (Звіт)</span><span class="btn-spinner"></span>';
        downloadBtn.onclick = () => handleDownloadPDF(downloadBtn);
        reportActionsContainer.appendChild(downloadBtn);

        if (state.get('hasPaidUpsell')) {
            const successContainer = document.createElement('div');
            successContainer.className = 'mt-4 mb-2 p-4 rounded-lg border text-center animate-fadeIn';
            successContainer.style.backgroundColor = 'rgba(20, 83, 45, 0.2)';
            successContainer.style.borderColor = 'rgba(34, 197, 94, 0.3)';

            successContainer.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm font-bold text-green-400 tracking-wide">
                        Твій Прогноз на 2026 рік відправлено на пошту
                    </span>
                </div>
            `;

            reportActionsContainer.appendChild(successContainer);

            const tryAgainBtn = document.createElement('button');
            tryAgainBtn.className = 'btn btn-skip';
            tryAgainBtn.style.marginTop = '15px';
            tryAgainBtn.innerText = 'Почати заново (Нова карта)';
            tryAgainBtn.onclick = () => {
                if (confirm("Очистити дані та почати новий розрахунок?")) {
                    state.clear();
                    localStorage.removeItem(REPORT_BACKUP_KEY);
                    window.location.href = "/";
                }
            };
            reportActionsContainer.appendChild(tryAgainBtn);

        } else {
            const getForecastBtn = document.createElement('button');
            getForecastBtn.className = 'btn btn-violet';
            getForecastBtn.style.marginTop = '10px';

            // 🔥 UPDATE: Кнопка з дворядковим текстом
            getForecastBtn.innerHTML = `
                <span class="btn-text flex flex-col items-center justify-center leading-tight">
                    <span class="text-[16px] font-bold">Отримати Прогноз на рік за ${currentPrices.display.FORECAST_UPSELL} грн.</span>
                    <span class="text-[10px] opacity-80 font-normal mt-1 lowercase">буде відправлено на пошту</span>
                </span>
            `;

            getForecastBtn.onclick = () => {
                if (ltvUpsellBtn) ltvUpsellBtn.querySelector('.btn-text').innerText = `Так, отримати Прогноз за ${currentPrices.display.FORECAST_UPSELL} грн.`;
                lateUpsellModal.style.display = 'flex';
            };
            reportActionsContainer.appendChild(getForecastBtn);
        }
    }

    async function handleDownloadPDF(btn) {
        const currentData = state.get('fullReport');
        if (!currentData) return;

        const pdfWindow = window.open('', '_blank');

        if (pdfWindow) {
            pdfWindow.document.write(`
                <html>
                    <head>
                        <title>Destiny Code PDF</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { background-color: #0f1115; color: #cda45e; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; margin: 0; text-align: center; padding: 20px; box-sizing: border-box; }
                            .loader { border: 3px solid rgba(205, 164, 94, 0.3); border-top: 3px solid #cda45e; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 20px; }
                            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                            p { margin: 0; line-height: 1.5; }
                            .main-text { font-size: 14px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold; margin-bottom: 20px; color: #fff; }
                            .sub-text { font-size: 11px; opacity: 0.6; max-width: 280px; margin: 0 auto; color: #cda45e; }
                        </style>
                    </head>
                    <body>
                        <div id="loader-box">
                            <div class="loader"></div>
                            <p class="main-text">Завантажуємо PDF...</p>
                            <p class="sub-text">Повний текстовий опис та розшифровка<br>знаходяться на попередній сторінці (вкладці).</p>
                        </div>
                    </body>
                </html>
            `);
        } else {
            alert("Будь ласка, дозвольте спливаючі вікна для завантаження файлу.");
            return;
        }

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            const htmlContent = generateReportHtml(currentData.sections);

            const safeUserData = { ...userData };
            if (!safeUserData.planets || safeUserData.planets.length === 0) {
                const storedPlanets = state.get('planets');
                if (storedPlanets && storedPlanets.length > 0) {
                    safeUserData.planets = storedPlanets;
                }
            }

            const payload = {
                reportHtml: htmlContent,
                reportType: 'main',
                userData: safeUserData
            };

            const response = await fetch(API.PDF, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Server error");
            const result = await response.json();

            if (result.success && result.pdfBase64) {
                const byteCharacters = atob(result.pdfBase64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "application/pdf" });

                const fileURL = window.URL.createObjectURL(blob);

                if (pdfWindow) {
                    pdfWindow.location.href = fileURL;
                } else {
                    const link = document.createElement('a');
                    link.href = fileURL;
                    link.download = 'DestinyCode_Report.pdf';
                    document.body.appendChild(link);
                    link.click();
                    setTimeout(() => document.body.removeChild(link), 100);
                }

                setTimeout(() => window.URL.revokeObjectURL(fileURL), 60000);

            } else {
                if (pdfWindow) pdfWindow.close();
                alert("Не вдалося сформувати PDF. Спробуйте пізніше.");
            }

        } catch (error) {
            if (pdfWindow) pdfWindow.close();
            console.error("PDF Download Error:", error);
            alert("Помилка завантаження. Перевірте з'єднання.");
        } finally {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // 🔥 СЛУХАЧ КЛІКУ: ОНОВЛЕНО ID ltv-upsell-btn
    if (ltvUpsellBtn) {
        ltvUpsellBtn.addEventListener('click', async () => {
            const btn = ltvUpsellBtn;
            btn.classList.add('loading');
            btn.disabled = true;

            const currentReport = state.get('fullReport');
            if (currentReport) {
                Logger.log("💾 Backing up report to LocalStorage before payment redirect...");
                localStorage.setItem(REPORT_BACKUP_KEY, JSON.stringify(currentReport));
            }

            try {
                await processPayment(
                    { name: "Астро-Прогноз на 2026 (Promo)", price: currentPrices.charge.FORECAST_UPSELL },
                    { email: userEmail },
                    userData,
                    { returnQueryParams: 'upsell_source=stage8' }
                );
            } catch (e) {
                console.error("Late Upsell Error:", e);
                btn.classList.remove('loading');
                btn.disabled = false;
            }
        });
    }

    renderReport();
}