import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { generateForecast } from '../../services/api.service.js';

export function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    // --- DOM Elements ---
    const emailForm = document.getElementById('email-form');
    const userEmailInput = document.getElementById('user-email');
    const mainReportBtn = document.getElementById('main-report-btn');
    
    const ltvUpsellBox = document.getElementById('ltv-upsell-box');
    const ltvUpsellBtn = document.getElementById('ltv-upsell-btn');

    // Modals
    const upsellEmailModal = document.getElementById('upsell-email-modal');
    const upsellEmailForm = document.getElementById('upsell-email-form');
    const upsellEmailInput = document.getElementById('upsell-email-input');

    // Restore email if exists
    if (state.get('email')) {
        userEmailInput.value = state.get('email');
    }

    // Helper to update Main Button Style
    function setMainButtonToPremium() {
        if (mainReportBtn) {
            mainReportBtn.classList.remove('btn-primary'); // Прибираємо чисто золотий
            mainReportBtn.classList.add('btn-gold-purple'); // Додаємо градієнт
            
            const btnText = mainReportBtn.querySelector('.btn-text');
            if (btnText) btnText.innerText = "Надіслати мені звіт + Прогноз";
        }
    }

    // --- 1. UPSELL LOGIC (Exact Monolith Behavior) ---
    ltvUpsellBtn.addEventListener('click', async () => {
        const btn = ltvUpsellBtn;
        const originalText = btn.querySelector('.btn-text').innerText;

        // UI Loading
        btn.classList.add('loading');
        btn.disabled = true;
        btn.querySelector('.btn-text').innerText = "Обробка платежу...";

        try {
            console.log("Upsell payment initiated...");
            // Simulate Payment Delay
            await new Promise(r => setTimeout(r, 2000));
            console.log("Upsell Payment successful.");

            // Update State
            state.set('hasPaidUpsell', true);

            // Update UI: Success State (Upsell Button)
            btn.classList.remove('loading');
            btn.querySelector('.btn-text').innerText = "Оплачено! ✅";
            btn.style.opacity = "0.7";
            
            // 🔥 UPDATE: Змінюємо головну кнопку (Текст + Колір)
            setMainButtonToPremium();

            // Hide the box after short delay (Monolith logic to clean UI)
            setTimeout(() => {
                ltvUpsellBox.style.display = 'none';
            }, 1500);

            // Handle Forecast Generation Logic immediately
            const currentEmail = userEmailInput.value;
            
            if (currentEmail && currentEmail.includes('@')) {
                // Email is typed -> Generate Forecast in background
                const userData = {
                    date: state.get('date'),
                    time: state.get('time'),
                    city: state.get('city'),
                    geo: state.get('geo')
                };
                generateForecast(userData, currentEmail);
                alert("Прогноз оплачено! Натисніть 'Надіслати мені звіт', щоб завершити.");
            } else {
                // Email missing -> Ask for it via Modal
                upsellEmailModal.style.display = 'flex';
            }

        } catch (error) {
            console.error("Upsell Error:", error);
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.querySelector('.btn-text').innerText = originalText;
            alert("Помилка оплати. Спробуйте ще раз.");
        }
    });

    // --- 2. MODAL LOGIC (Upsell Email) ---
    upsellEmailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEmail = upsellEmailInput.value;
        
        if (newEmail) {
            // Close Modal (ONLY HERE)
            upsellEmailModal.style.display = 'none';
            
            // Auto-fill main input
            userEmailInput.value = newEmail;
            
            // Update State
            state.set('email', newEmail);

            // Generate Forecast
            const userData = {
                date: state.get('date'),
                time: state.get('time'),
                city: state.get('city'),
                geo: state.get('geo')
            };
            generateForecast(userData, newEmail);

            // 🔥 UPDATE: Змінюємо головну кнопку і тут теж (про всяк випадок)
            setMainButtonToPremium();
        }
    });

    // --- 3. MAIN FORM SUBMIT (Go to Generation) ---
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userEmailInput.value;
        
        if (email) {
            state.set('email', email);
            // Navigate to Stage 7 (Generation Animation)
            router.navigateTo('generation');
        }
    });
}