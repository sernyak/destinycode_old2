import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';
import { processPayment } from '../../services/payment.service.js';
import { API, DISPLAY_PRICES, PAYMENT_PRICES } from '../../config.js';
import { getPrices } from '../../utils/pricing.js';
import { generateFullReport, fetchReportById } from '../../services/api.service.js';

import { showModal } from '../../utils/modal.js';
import { Logger } from '../../utils/logger.js';
import { feedbackService } from '../../services/feedback.service.js';

/**
 * Stage 8: Premium Result (v3.6.1 Full Version)
 * Всі 400+ рядків коду збережено. 
 * Єдина зміна: late-upsell-btn замінено на ltv-upsell-btn для GTM.
 * UPDATE: Added Feedback System.
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
    const currentVariant = state.get('currentVariant'); // 🔥 Get variant for adaptation

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
     * 🔥 ГЕНЕРАТОР HTML ЗВІТУ (ACCORDION)
     */
    function generateReportHtml(sections) {
        if (!sections) return '';
        return sections.map((section, index) => {
            const isFirst = index === 0;
            const isLast = index === sections.length - 1;

            let rawText = section.analysis_text || "";
            rawText = rawText.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff; font-weight: 400;">$1</strong>');

            let formattedText = rawText.includes('<ul') || rawText.includes('<ol') || rawText.includes('<br')
                ? rawText.replace(/\n/g, '<br>')
                : rawText.split('\n').map(l => `<p>${l}</p>`).join('');

            const adviceHtml = section.practical_advice ? `
                <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
                    <strong style="display: block; color: #cda45e; margin-bottom: 6px; text-transform: uppercase; font-size: 0.75em; letter-spacing: 1px;">⚡️ Порада зірок:</strong>
                    <p style="font-style: italic; font-size: 0.9em; color: var(--secondary-text-color); margin: 0;">${section.practical_advice}</p>
                </div>
            ` : '';

            const nextBtnHtml = !isLast ? `
                <button class="next-section-btn" data-target="${index + 1}" style="
                    display: block;
                    margin: 20px auto 0;
                    padding: 10px 24px;
                    background: transparent;
                    border: 1px solid rgba(205, 164, 94, 0.3);
                    border-radius: 20px;
                    color: var(--accent-color);
                    font-size: 0.85em;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">Читати далі 👇</button>
            ` : '';

            return `
                <div class="accordion-item ${isFirst ? 'accordion-open' : ''}" style="
                    background-color: rgba(28, 28, 30, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    margin-bottom: 12px;
                    overflow: visible;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
                ">
                    <!-- Header -->
                    <div class="accordion-header" style="
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                    " data-index="${index}">
                        <h4 style="
                            color: var(--accent-color);
                            font-weight: 700;
                            text-transform: uppercase;
                            font-size: 0.85em;
                            letter-spacing: 1.5px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin: 0;
                        ">
                            <span style="font-size: 1.2em;">${section.icon}</span> ${section.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                    </div>

                    <!-- Content -->
                    <div class="accordion-content">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content report-content-text">
                            ${formattedText}
                            ${adviceHtml}
                            ${nextBtnHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * 🔥 ACCORDION TOGGLE LOGIC
     */
    function attachAccordionListeners(containerEl) {
        const headers = containerEl.querySelectorAll('.accordion-header');
        const items = containerEl.querySelectorAll('.accordion-item');
        const nextButtons = containerEl.querySelectorAll('.next-section-btn');

        function toggleSection(index, keepOthersOpen = false) {
            items.forEach((item, i) => {
                if (i === index) {
                    if (item.classList.contains('accordion-open')) {
                        item.classList.remove('accordion-open');
                        const content = item.querySelector('.accordion-content');
                        if (content) content.style.maxHeight = null;
                    } else {
                        item.classList.add('accordion-open');
                        const content = item.querySelector('.accordion-content');
                        if (content) {
                            // 1. Set precise height for smooth animation
                            content.style.maxHeight = content.scrollHeight + 100 + "px";

                            // 2. Release to CSS (8000px) after transition for resize safety
                            setTimeout(() => {
                                if (item.classList.contains('accordion-open')) {
                                    content.style.maxHeight = null;
                                }
                            }, 820); // > 0.8s CSS transition
                        }
                        setTimeout(() => {
                            const header = item.querySelector('.accordion-header');
                            if (header) {
                                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }, 300);
                    }
                } else {
                    if (!keepOthersOpen) {
                        item.classList.remove('accordion-open');
                    }
                }
            });
        }

        headers.forEach(header => {
            header.addEventListener('click', () => {
                const index = parseInt(header.getAttribute('data-index'));
                toggleSection(index, true);
            });
        });

        nextButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetIndex = parseInt(btn.getAttribute('data-target'));
                if (targetIndex < items.length) {
                    toggleSection(targetIndex, true);
                }
            });
        });
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
                // 🔥 PARTNER VARIANT: Adapted popup
                if (currentVariant && currentVariant.productType === 'partner') {
                    const partnerDecryptionHtml = `
                        <p class="mb-3">Ти бачиш <strong>точні координати</strong> Венери, Марсу та 7-го дому — формулу твого кохання.</p>
                        
                        <p class="mb-3 text-sm italic" style="color: #cda45e; border-left: 2px solid #cda45e; padding-left: 10px;">
                            "Ці координати — унікальна карта твоїх бажань і потреб у стосунках."
                        </p>

                        <ul class="text-sm space-y-2 mb-4">
                            <li><strong>Венера ♀:</strong> Як ти кохаєш і що приносить тобі задоволення.</li>
                            <li><strong>Марс ♂:</strong> Типаж чоловіка, який запалює твій вогонь.</li>
                            <li><strong>7-й Дім (DSC):</strong> Обставини зустрічі та сценарій партнерства.</li>
                        </ul>

                        <p class="mb-1">У <strong>цьому звіті</strong> ми розшифрували все:</p>
                        <p class="text-white text-sm">✅ Де і коли ти зустрінеш свого партнера?<br>✅ Що притягне його саме до тебе?</p>
                    `;
                    showModal("🔑 Розшифровка Коду Кохання", partnerDecryptionHtml);
                    return;
                }

                // DEFAULT: Main version popup
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
            // ... (keep existing backup logic) ...
            if (backup) {
                try {
                    reportData = JSON.parse(backup);
                    state.set('fullReport', reportData);
                } catch (e) { console.warn("Backup parse fail", e); }
            }
        }

        if (reportData && reportData.sections) {
            // 🔥 PROFESSIONAL: Dynamic Bonus Injection
            // Pulls bonuses from currentVariant.marketing.bonuses for full scalability
            const bonuses = currentVariant?.marketing?.bonuses;

            if (bonuses && Array.isArray(bonuses)) {
                bonuses.forEach(bonus => {
                    const hasBonus = reportData.sections.some(s => s.id === bonus.id || s.title.includes(bonus.title.replace('🎁 ', '')));
                    if (!hasBonus) {
                        reportData.sections.push({
                            id: bonus.id,
                            title: bonus.title,
                            icon: bonus.icon,
                            analysis_text: bonus.text,
                            practical_advice: bonus.advice
                        });
                    }
                });
            }

            localStorage.setItem(REPORT_BACKUP_KEY, JSON.stringify(reportData));
            const reportContentHtml = generateReportHtml(reportData.sections);
            const astroHtml = await renderAstroBox(userData, currentVariant);
            fullReportContentEl.innerHTML = reportContentHtml + astroHtml;
            attachAccordionListeners(fullReportContentEl);
            attachAstroBoxListener();
            renderButtons();
            return;
        }

        console.warn("⚠️ Report data missing. Fetching from API...");
        fullReportContentEl.innerHTML = `
            <div class="text-center py-12 space-y-4">
                <div class="spinner mx-auto" style="width: 3rem; height: 3rem;"></div>
                <p class="text-gray-400 animate-pulse text-sm">Завантаження вашого звіту...</p>
            </div>
        `;

        try {
            const reportId = urlParams.get('id');
            let recoveredData;

            if (reportId) {
                // Якщо маємо унікальне посилання, завантажуємо з бекенду
                recoveredData = await fetchReportById(reportId);
            } else {
                // Інакше стандартне відновлення (email + userData)
                recoveredData = await generateFullReport(userData, userEmail);
            }

            // Перевірка формату від getReportById
            if (recoveredData && !recoveredData.error && recoveredData.status === 'ready' && recoveredData.reportData && recoveredData.reportData.sections) {
                state.set('fullReport', recoveredData.reportData);
                localStorage.setItem(REPORT_BACKUP_KEY, JSON.stringify(recoveredData.reportData));

                const reportContentHtml = generateReportHtml(recoveredData.reportData.sections);
                // Для унікального лінка беремо дані з бази, бо в локалстореджі може їх не бути
                const finalUserData = recoveredData.userData || userData;
                const finalVariant = recoveredData.variant || currentVariant;
                
                const astroHtml = await renderAstroBox(finalUserData, finalVariant);
                fullReportContentEl.innerHTML = reportContentHtml + astroHtml;
                attachAccordionListeners(fullReportContentEl);
                attachAstroBoxListener();
                renderButtons();
            } 
            // Перевірка старого формату (generateFullReport)
            else if (recoveredData && !recoveredData.error && recoveredData.sections) {
                state.set('fullReport', recoveredData);
                localStorage.setItem(REPORT_BACKUP_KEY, JSON.stringify(recoveredData));

                const reportContentHtml = generateReportHtml(recoveredData.sections);
                const astroHtml = await renderAstroBox(userData, currentVariant);
                fullReportContentEl.innerHTML = reportContentHtml + astroHtml;
                attachAccordionListeners(fullReportContentEl);
                attachAstroBoxListener();
                renderButtons();
            } 
            else if (recoveredData && recoveredData.status === 'processing') {
                throw new Error("Report is processing");
            } else {
                throw new Error("Invalid recovery data");
            }
        } catch (e) {
            // 🔥 FALLBACK: Якщо API повернуло помилку, але ми знаємо, що процес був запущений
            console.error("Recovery failed:", e);

            // Замість червоної помилки показуємо статус "Надіслано на пошту"
            // Це набагато кращий UX, оскільки бекенд міг відправити лист, але не встиг повернути JSON
            fullReportContentEl.innerHTML = `
                <div class="text-center p-8 rounded-xl border border-gray-700 bg-gray-800/50">
                    <div class="text-5xl mb-4">📨</div>
                    <h3 class="text-xl font-bold text-[#cda45e] mb-2">Звіт вже у дорозі!</h3>
                    <p class="text-gray-300 mb-4">
                        Через велике навантаження генерація займає трохи більше часу. 
                        Твій Прогноз генерується і буде автоматично відправлений на <strong>${userEmail}</strong>.
                    </p>
                    ${state.get('planets') ? await renderAstroBox(userData, currentVariant) : ''}
                </div>
            `;

            // Кнопки все одно рендеримо (там є Feedback і Upsell)
            renderButtons();
        }
    }

    function renderButtons() {
        reportActionsContainer.innerHTML = '';

        // --- DESCRIPTOR BLOCK ---
        const descriptorBox = document.createElement('div');
        descriptorBox.className = 'mb-6 p-4 rounded-xl border border-[rgba(205,164,94,0.3)] bg-[rgba(20,20,22,0.6)] text-center text-sm leading-relaxed';
        descriptorBox.innerHTML = `
            <p class="text-white font-bold mb-2 text-base">Як зберегти цей звіт?</p>
            <p class="text-[#cda45e] mb-2">✅ Копія звіту (текст + PDF) вже відправлена на твою пошту.</p>
            <p class="text-gray-300">Нижче ти можеш відправити текст звіту собі в Telegram, завантажити PDF або <strong>скопіювати персональне посилання</strong> на цю сторінку (рекомендуємо зберегти його).</p>
        `;
        reportActionsContainer.appendChild(descriptorBox);

        // --- BUTTONS WRAPPER ---
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.className = 'flex flex-col gap-3 w-full';
        
        const invoiceId = state.get('currentInvoiceId') || new URLSearchParams(window.location.search).get('id');

        // --- TELEGRAM BUTTON ---
        if (invoiceId) {
            const tgBtn = document.createElement('a');
            tgBtn.href = `https://t.me/DestinyCodeReportsBot?start=${invoiceId}`;
            tgBtn.target = '_blank';
            tgBtn.rel = 'noopener noreferrer';
            tgBtn.className = 'btn btn-secondary';
            tgBtn.style.cssText = `
                display: flex; align-items: center; justify-content: center; gap: 8px;
                background: linear-gradient(135deg, #2AABEE, #229ED9);
                color: #fff; text-decoration: none; border: none;
            `;
            tgBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span class="btn-text">Надіслати Звіт в Telegram</span>
            `;
            buttonsWrapper.appendChild(tgBtn);
        }

        // --- COPY LINK BUTTON ---
        if (invoiceId) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'btn btn-secondary';
            copyBtn.style.cssText = `
                display: flex; align-items: center; justify-content: center; gap: 8px;
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2);
                color: #fff;
            `;
            copyBtn.innerHTML = `
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span class="btn-text">Скопіювати посилання</span>
            `;
            copyBtn.onclick = () => {
                const reportUrl = `${window.location.origin}/report?id=${invoiceId}`;
                navigator.clipboard.writeText(reportUrl).then(() => {
                    const originalHtml = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<span class="btn-text text-green-400 font-bold">✅ Скопійовано!</span>';
                    showToast("Посилання збережено в буфер обміну");
                    setTimeout(() => copyBtn.innerHTML = originalHtml, 2500);
                }).catch(err => {
                    console.error("Copy failed", err);
                    showToast("Не вдалося скопіювати посилання");
                });
            };
            buttonsWrapper.appendChild(copyBtn);
        }

        // --- PDF BUTTON ---
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-secondary';
        downloadBtn.innerHTML = '<span class="btn-text">Завантажити PDF (Звіт)</span><span class="btn-spinner"></span>';
        downloadBtn.onclick = () => handleDownloadPDF(downloadBtn);
        buttonsWrapper.appendChild(downloadBtn);



        reportActionsContainer.appendChild(buttonsWrapper);

        // --- FEEDBACK SYSTEM INTEGRATION ---
        renderFeedbackSystem();
        // ------------------------------------

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
                        ${currentVariant?.productType === 'forecast' ? 'Портрет Партнера відправлено на пошту' : 'Твій Прогноз на рік відправлено на пошту'}
                    </span>
                </div>
            `;

            reportActionsContainer.appendChild(successContainer);

        } else {
            const isForecastVariant = currentVariant?.productType === 'forecast';
            const upsellLabel = isForecastVariant ? 'Портрет Ідеального Партнера' : 'Прогноз на рік';

            const getForecastBtn = document.createElement('button');
            getForecastBtn.className = 'btn btn-violet';
            getForecastBtn.style.marginTop = '10px';

            // 🔥 UPDATE: Кнопка з дворядковим текстом
            getForecastBtn.innerHTML = `
                <span class="btn-text flex flex-col items-center justify-center leading-tight">
                    <span class="text-[16px] font-bold">Отримати ${upsellLabel} за ${currentPrices.display.FORECAST_UPSELL} грн.</span>
                    <span class="text-[10px] opacity-80 font-normal mt-1 lowercase">буде відправлено на пошту</span>
                </span>
            `;

            getForecastBtn.onclick = () => {
                const btnLabel = isForecastVariant ? `Так, отримати Портрет Партнера за ${currentPrices.display.FORECAST_UPSELL} грн.` : `Так, отримати Прогноз за ${currentPrices.display.FORECAST_UPSELL} грн.`;
                if (ltvUpsellBtn) ltvUpsellBtn.querySelector('.btn-text').innerText = btnLabel;
                lateUpsellModal.style.display = 'flex';
            };
            reportActionsContainer.appendChild(getForecastBtn);
        }

        // --- ALWAYS SHOW RESTART BUTTON ---
        const restartBtn = document.createElement('button');
        restartBtn.className = 'btn btn-skip';
        restartBtn.style.marginTop = '20px';
        restartBtn.innerText = 'Розрахувати ще одну натальну карту';
        restartBtn.onclick = () => {
            if (confirm("Очистити дані та почати новий розрахунок?")) {
                state.clear();
                localStorage.removeItem(REPORT_BACKUP_KEY);
                window.location.href = "/";
            }
        };
        reportActionsContainer.appendChild(restartBtn);
    }

    /**
     * 🔥 CLEAN HTML GENERATOR FOR PDF (No UI elements)
     * Matches backend fulfillment.service.js logic
     */
    function generateCleanReportHtml(sections) {
        if (!sections || !Array.isArray(sections)) return '';
        return sections.map((section, index) => {
            // 🔥 Page Break Logic: First section flows, subsequent force new page
            const pageBreakStyle = index === 0 ? '' : 'page-break-before: always;';

            return `
            <div class="report-section" style="margin-bottom: 35px; ${pageBreakStyle}">
                <h2 style="color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px; page-break-before: avoid;">
                    <span style="margin-right: 8px;">${section.icon || '✨'}</span> ${section.title}
                </h2>
                <div class="report-content-text" style="font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #e0e0e0; margin-bottom: 12px; text-align: justify;">
                    ${(section.analysis_text || "").replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff;">$1</strong>')}
                </div>
                ${section.practical_advice ? `
                <div class="report-advice" style="background-color: #161b22; border: 1px solid rgba(205, 164, 94, 0.2); border-left: 4px solid #cda45e; padding: 20px; margin-top: 20px; border-radius: 0 8px 8px 0;">
                    <span style="color: #cda45e; display: block; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700;">⚡️ KOSMIC KEY:</span>
                    <p style="margin: 0; color: #cccccc; font-style: italic; font-size: 13px;">${section.practical_advice}</p>
                </div>` : ''}
            </div>`;
        }).join('');
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
            // 🔥 USE CLEAN GENERATOR
            const htmlContent = generateCleanReportHtml(currentData.sections);

            const safeUserData = { ...userData };
            if (!safeUserData.planets || safeUserData.planets.length === 0) {
                const storedPlanets = state.get('planets');
                if (storedPlanets && storedPlanets.length > 0) {
                    safeUserData.planets = storedPlanets;
                }
            }

            // 🔥 FIX: Визначаємо правильний тип звіту на основі варіанту
            let reportType = 'main';
            if (currentVariant?.productType === 'forecast') {
                reportType = 'upsell';
            } else if (currentVariant?.productType === 'partner') {
                reportType = 'partner';
            }

            const payload = {
                reportHtml: htmlContent,
                reportType: reportType,
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
                const isForecastVariant = currentVariant?.productType === 'forecast';
                const paymentName = isForecastVariant ? 'Астро-Портрет Партнера (Promo)' : 'Астро-Прогноз на рік (Promo)';
                await processPayment(
                    { name: paymentName, price: currentPrices.charge.FORECAST_UPSELL },
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

    // ============================================================
    // 💬 FEEDBACK SYSTEM LOGIC
    // ============================================================
    function renderFeedbackSystem() {
        // Prevent double rendering
        if (reportActionsContainer.querySelector('.feedback-controls')) return;

        const container = document.createElement('div');
        container.className = 'feedback-controls';

        // 1. Like / Dislike Buttons
        const buttonsRow = document.createElement('div');
        buttonsRow.className = 'feedback-buttons';

        const btnLike = createFeedbackIcon('👍', 'like');
        const btnDislike = createFeedbackIcon('👎', 'dislike');

        buttonsRow.appendChild(btnDislike);
        buttonsRow.appendChild(btnLike);
        container.appendChild(buttonsRow);

        // --- NEW: Universal Review Button (Below icons) ---
        const reviewBtn = document.createElement('button');
        reviewBtn.className = 'btn w-full';
        reviewBtn.style.cssText = `
            display: flex; align-items: center; justify-content: center; gap: 8px;
            background: rgba(205, 164, 94, 0.1);
            border: 1px solid rgba(205, 164, 94, 0.3);
            color: #cda45e; font-size: 0.85em; padding: 12px; border-radius: 12px;
            font-weight: 600; cursor: pointer; margin-top: 15px; margin-bottom: 10px;
        `;
        reviewBtn.innerHTML = `<span>✨ Залишити відгук</span>`;
        reviewBtn.onclick = () => openFeedbackModal('premium_review_button');
        container.appendChild(reviewBtn);

        // 2. Conditional "Write Feedback" Link (Upsell Only)
        if (state.get('hasPaidUpsell')) {
            const feedbackLink = document.createElement('button');
            feedbackLink.className = 'btn-feedback-text';
            feedbackLink.innerText = 'Написати відгук розробникам';
            feedbackLink.onclick = openFeedbackModal;
            container.appendChild(feedbackLink);
        }

        reportActionsContainer.appendChild(container);
    }

    function createFeedbackIcon(icon, type) {
        const btn = document.createElement('div');
        btn.className = 'btn-feedback-icon';
        btn.innerText = icon;

        btn.onclick = async () => {
            // Visual Toggle
            const parent = btn.parentElement;
            parent.querySelectorAll('.btn-feedback-icon').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Send Data
            await feedbackService.send({ type, value: type, source: 'premium_report' });

            // Simple Toast
            showToast("Дякую 💜");

            // 🔥 AUTO-OPEN MODAL ON DISLIKE
            if (type === 'dislike') {
                setTimeout(openFeedbackModal, 500); // Small delay for better UX
            }
        };

        return btn;
    }

    function openFeedbackModal(forcedSource = null) {
        const overlay = document.createElement('div');
        overlay.className = 'feedback-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'feedback-modal';

        const title = document.createElement('h3');
        title.innerText = "Ваш відгук допоможе нам стати кращими";
        title.style.color = "#cda45e";
        title.style.marginBottom = "8px";

        const textarea = document.createElement('textarea');
        textarea.className = 'feedback-textarea';
        textarea.placeholder = "Що нам варто покращити?";

        const sendBtn = document.createElement('button');
        sendBtn.className = 'btn btn-violet';
        sendBtn.innerText = 'Надіслати';

        // Close on click outside
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                if (document.body.contains(overlay)) document.body.removeChild(overlay);
            }
        };

        sendBtn.onclick = async () => {
            if (!textarea.value.trim()) return;

            sendBtn.innerText = 'Відправка...';
            sendBtn.disabled = true;

            try {
                // Check upsell status for context, or default to premium_feedback
                const context = forcedSource || (state.get('hasPaidUpsell') ? 'premium_upsell' : 'premium_feedback');
                await feedbackService.send({ type: 'text', value: textarea.value, source: context });
            } catch (e) {
                console.error("Feedback send error", e);
            } finally {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
                showModal("Повідомлення відправлено", "Ми дуже цінуємо ваш час та увагу. Дякуємо! 🙏");
            }
        };

        modal.appendChild(title);
        modal.appendChild(textarea);
        modal.appendChild(sendBtn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translate(-50%, -20px)';
        toast.style.background = 'linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)';
        toast.style.color = '#fff';
        toast.style.border = '1px solid rgba(205, 164, 94, 0.3)';
        toast.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px -3px rgba(205, 164, 94, 0.1)';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '99px';
        toast.style.fontWeight = 'bold';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.3s ease';
        toast.style.zIndex = '2000';

        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, 0)';
        });

        // Remove after 0.9s
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 900);
    }
}