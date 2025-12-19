import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';
import { showModal } from '../../utils/modal.js';
import { generateForecast } from '../../services/api.service.js';

export function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    // --- DOM Elements ---
    const fullReportContentEl = document.getElementById('full-report-content');
    const reportActionsContainer = document.getElementById('report-actions-container');
    
    // Upsell Modal Elements
    const lateUpsellModal = document.getElementById('late-upsell-modal');
    const closeLateUpsellBtn = document.getElementById('close-late-upsell');
    const lateUpsellBtn = document.getElementById('late-upsell-btn');

    // --- Data ---
    const reportData = state.get('fullReport');
    const userData = {
        date: state.get('date'),
        time: state.get('time'),
        city: state.get('city'),
        geo: state.get('geo')
    };
    // 🔥 Отримуємо статус оплати апселу з попередніх кроків
    const isUpsellPaid = state.get('hasPaidUpsell');
    const userEmail = state.get('email');

    // --- 1. RENDER REPORT LOGIC ---
    async function renderReport() {
        if (!reportData || !reportData.sections) {
            fullReportContentEl.innerHTML = `<p class="text-red-400 text-center">Помилка: Дані звіту відсутні. Спробуйте оновити сторінку.</p>`;
            return;
        }

        let formattedReportHTML = '';

        // A. Text Sections Generation
        for (const section of reportData.sections) {
            const formattedText = section.analysis_text
                .split('\n')
                .filter(line => line.trim().length > 0)
                .map(line => `<p>${line.trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`)
                .join('');

            const formattedAdvice = section.practical_advice
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\\n/g, '<br>');

            formattedReportHTML += `
                <div class="report-section mb-6">
                    <h2 style="font-size: 1.5rem; font-weight: 700; color: var(--accent-color); margin-top: 1.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
                        ${section.icon || '✨'} ${section.title}
                    </h2>
                    
                    <div class="report-content-text text-left leading-relaxed space-y-4" style="color: var(--secondary-text-color);">
                        ${formattedText}
                    </div>
                    
                    <div class="report-advice mt-4">
                        <strong style="color: var(--accent-color);">Практична Порада:</strong>
                        <p class="mt-2" style="color: var(--primary-text-color); opacity: 0.9;">${formattedAdvice}</p>
                    </div>
                </div>
            `;
        }

        // B. Astro Data Box Generation
        const astroHtml = await renderAstroBox(userData);
        
        // C. Combine
        const finalHTML = formattedReportHTML + astroHtml;

        // D. Inject
        fullReportContentEl.innerHTML = finalHTML;

        // E. Render Buttons
        renderButtons();
    }

    // --- 2. BUTTONS LOGIC (🔥 ЛОГІКА АПСЕЛУ ТУТ 🔥) ---
    function renderButtons() {
        reportActionsContainer.innerHTML = '';

        // 1. Download PDF Button (Завжди є)
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-secondary';
        downloadBtn.id = 'download-pdf-btn';
        downloadBtn.innerHTML = '<span class="btn-text">Завантажити PDF</span><span class="btn-spinner"></span>';
        downloadBtn.onclick = () => handleDownloadPDF(downloadBtn, fullReportContentEl.innerHTML);
        reportActionsContainer.appendChild(downloadBtn);

        // 2. Logic: Перевіряємо, чи купив юзер прогноз
        if (state.get('hasPaidUpsell')) {
            // ВАРІАНТ А: Вже купив -> Показуємо кнопку перезапуску (або нічого)
            const tryAgainBtn = document.createElement('button');
            tryAgainBtn.className = 'btn btn-secondary';
            tryAgainBtn.style.marginTop = '10px';
            tryAgainBtn.innerHTML = '<span class="btn-text">Спробувати ще (Почати знову)</span>';
            tryAgainBtn.onclick = () => {
                if (confirm("Ви впевнені? Це очистить поточний звіт.")) {
                    // 🔥 FIX RESTART LOGIC:
                    // 1. Clear State (sessionStorage)
                    state.clear();
                    
                    // 2. Clear URL params (remove ?payment=success if exists)
                    // This prevents src/main.js from auto-redirecting to success
                    const cleanUrl = window.location.pathname;
                    window.history.replaceState({}, document.title, cleanUrl);

                    // 3. Force reload to clean URL, which will land on Welcome
                    window.location.href = cleanUrl;
                }
            };
            reportActionsContainer.appendChild(tryAgainBtn);
        } else {
            // ВАРІАНТ Б: ЩЕ НЕ купив -> Показуємо кнопку Апселу (Фіолетову)
            const getForecastBtn = document.createElement('button');
            getForecastBtn.className = 'btn btn-violet';
            getForecastBtn.style.marginTop = '10px';
            getForecastBtn.innerHTML = '<span class="btn-text">Отримати прогноз на рік</span>';
            // При кліку відкриваємо модалку Late Upsell
            getForecastBtn.onclick = () => {
                lateUpsellModal.style.display = 'flex';
            };
            reportActionsContainer.appendChild(getForecastBtn);
        }
    }

    // --- 3. PDF HANDLER ---
    async function handleDownloadPDF(btnElement, htmlContent) {
        setButtonLoading(btnElement, true);
        const PDF_BACKEND_URL = 'https://createpdf-kpkshoor7q-ew.a.run.app';

        try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const astroBox = tempDiv.querySelector('.astro-data-box');
            if (astroBox) astroBox.remove();
            const cleanedHtml = tempDiv.innerHTML;

            const styles = Array.from(document.styleSheets)
                .map(sheet => {
                    try {
                        return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
                    } catch (e) { return ''; }
                }).join('\n');

            const response = await fetch(PDF_BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reportHtml: cleanedHtml,
                    reportStyles: styles,
                    userData: userData,
                    reportType: 'main'
                })
            });

            if (!response.ok) throw new Error("Backend error");

            const result = await response.json();

            if (result.success && result.pdfBase64) {
                const pdfBlob = base64ToBlob(result.pdfBase64, 'application/pdf');
                const url = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = result.filename || 'DestinyCode_Report.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                throw new Error("Invalid response");
            }
        } catch (error) {
            console.error(error);
            showModal("Помилка", `Не вдалося завантажити PDF. Спробуйте пізніше.`);
        } finally {
            setButtonLoading(btnElement, false);
        }
    }

    // --- 4. UPSELL MODAL HANDLERS (Обробка покупки на цьому кроці) ---
    closeLateUpsellBtn.addEventListener('click', () => {
        lateUpsellModal.style.display = 'none';
    });

    lateUpsellBtn.addEventListener('click', async () => {
        const btn = lateUpsellBtn;
        const originalText = btn.querySelector('.btn-text').innerText;
        
        btn.classList.add('loading');
        btn.disabled = true;
        btn.querySelector('.btn-text').innerText = "Обробка...";

        try {
            // Емуляція оплати
            await new Promise(r => setTimeout(r, 2000));
            
            // 🔥 Оновлюємо стан: тепер апсел оплачено
            state.set('hasPaidUpsell', true);
            
            // Запускаємо генерацію прогнозу на пошту
            if (userEmail) {
                generateForecast(userData, userEmail);
            }
            
            btn.classList.remove('loading');
            btn.querySelector('.btn-text').innerText = "Оплачено! ✅";
            
            setTimeout(() => {
                lateUpsellModal.style.display = 'none';
                // 🔥 Перемальовуємо кнопки: фіолетова зникне, з'явиться "Спробувати ще"
                renderButtons(); 
                showModal("Успіх!", "Прогноз оплачено і відправлено на пошту!");
            }, 1000);

        } catch (e) {
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.querySelector('.btn-text').innerText = originalText;
            showModal("Помилка", "Не вдалося провести оплату.");
        }
    });

    // --- Helpers ---
    function setButtonLoading(btn, isLoading) {
        if (isLoading) {
            btn.classList.add('loading');
            btn.disabled = true;
        } else {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    function base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            byteArrays.push(new Uint8Array(byteNumbers));
        }
        return new Blob(byteArrays, { type: mimeType });
    }

    // --- Init ---
    renderReport();
}