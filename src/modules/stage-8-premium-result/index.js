import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';
import { processPayment } from '../../services/payment.service.js';
import { API, DISPLAY_PRICES, PAYMENT_PRICES } from '../../config.js';

export function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    const fullReportContentEl = document.getElementById('full-report-content');
    const reportActionsContainer = document.getElementById('report-actions-container');
    
    const lateUpsellModal = document.getElementById('late-upsell-modal');
    const closeLateUpsellBtn = document.getElementById('close-late-upsell');
    const lateUpsellBtn = document.getElementById('late-upsell-btn');

    const reportData = state.get('fullReport');
    // Відновлюємо дані планет для PDF (важливо!)
    const userData = {
        date: state.get('date'), 
        time: state.get('time'), 
        city: state.get('city'), 
        geo: state.get('geo'),
        planets: state.get('planets') || [] 
    };
    const userEmail = state.get('email');

    // --- Helper: Generate HTML String for Report ---
    // Ця функція використовується і для рендеру на екрані, і для генерації PDF
    function generateReportHtml(sections) {
        if (!sections) return '';
        return sections.map(section => {
            const formattedText = section.analysis_text.split('\n').map(l => `<p>${l}</p>`).join('');
            return `
                <div class="report-section mb-6">
                    <h2 style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700;">${section.icon} ${section.title}</h2>
                    <div class="report-content-text text-left">${formattedText}</div>
                    <div class="report-advice mt-4"><strong>Порада:</strong><p>${section.practical_advice}</p></div>
                </div>`;
        }).join('');
    }

    // --- Render Logic ---
    async function renderReport() {
        if (!reportData || !reportData.sections) {
            fullReportContentEl.innerHTML = `<div class="text-center p-6"><p class="text-red-400">Дані звіту відсутні.</p></div>`;
            return;
        }

        // 1. Генеруємо HTML тексту звіту
        const reportContentHtml = generateReportHtml(reportData.sections);
        
        // 2. Отримуємо HTML астро-блоку (планети)
        const astroHtml = await renderAstroBox(userData);
        
        // 3. Вставляємо все в DOM
        fullReportContentEl.innerHTML = reportContentHtml + astroHtml;
        
        renderButtons();
    }

    function renderButtons() {
        reportActionsContainer.innerHTML = '';

        // 1. Download PDF Button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn btn-secondary';
        downloadBtn.innerHTML = '<span class="btn-text">Завантажити PDF</span><span class="btn-spinner"></span>';
        
        // 🔥 FIX: Прив'язуємо правильний обробник
        downloadBtn.onclick = () => handleDownloadPDF(downloadBtn);
        
        reportActionsContainer.appendChild(downloadBtn);

        // 2. Upsell / Restart Button Logic
        if (state.get('hasPaidUpsell')) {
            const tryAgainBtn = document.createElement('button');
            tryAgainBtn.className = 'btn btn-secondary';
            tryAgainBtn.style.marginTop = '10px';
            tryAgainBtn.innerText = 'Почати заново';
            tryAgainBtn.onclick = () => { 
                if(confirm("Очистити дані?")) { 
                    state.clear(); 
                    window.location.href = window.location.pathname; 
                } 
            };
            reportActionsContainer.appendChild(tryAgainBtn);
        } else {
            const getForecastBtn = document.createElement('button');
            getForecastBtn.className = 'btn btn-violet';
            getForecastBtn.style.marginTop = '10px';
            getForecastBtn.innerHTML = `<span class="btn-text">Отримати прогноз на рік за ${DISPLAY_PRICES.FORECAST_UPSELL} грн</span>`;
            getForecastBtn.onclick = () => {
                if(lateUpsellBtn) lateUpsellBtn.querySelector('.btn-text').innerText = `Так, додати прогноз за ${DISPLAY_PRICES.FORECAST_UPSELL} грн.`;
                lateUpsellModal.style.display = 'flex';
            };
            reportActionsContainer.appendChild(getForecastBtn);
        }
    }

    // --- 🔥 REAL PDF DOWNLOAD LOGIC ---
    async function handleDownloadPDF(btn) {
        if (!reportData) return;

        btn.classList.add('loading');
        btn.disabled = true;

        try {
            // 1. Генеруємо HTML рядок для PDF (виправляємо баг з JSON)
            const htmlContent = generateReportHtml(reportData.sections);

            const payload = {
                reportHtml: htmlContent, // Тепер це валідний HTML, а не JSON
                reportType: 'main',
                userData: userData
            };

            const response = await fetch(API.PDF, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Server error");

            const result = await response.json();
            
            if (result.success && result.pdfBase64) {
                // Convert Base64 -> Blob -> Download
                const byteCharacters = atob(result.pdfBase64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "application/pdf" });

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = result.filename || "DestinyCode_Report.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("Не вдалося сформувати PDF. Спробуйте пізніше.");
            }

        } catch (error) {
            console.error("PDF Download Error:", error);
            alert("Помилка завантаження. Перевірте з'єднання.");
        } finally {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // --- Late Upsell Logic ---
    closeLateUpsellBtn.addEventListener('click', () => lateUpsellModal.style.display = 'none');

    lateUpsellBtn.addEventListener('click', async () => {
        const btn = lateUpsellBtn;
        btn.classList.add('loading');
        btn.disabled = true;
        
        try {
            await processPayment(
                { name: "Астро-Прогноз на 2026 (Late Upsell)", price: PAYMENT_PRICES.FORECAST_UPSELL }, 
                { email: userEmail },
                { returnQueryParams: 'upsell_source=stage8' } 
            );
        } catch (e) {
            btn.classList.remove('loading');
            btn.disabled = false;
            // Помилку обробляє payment service, тут просто скидаємо стан
        }
    });

    renderReport();
}