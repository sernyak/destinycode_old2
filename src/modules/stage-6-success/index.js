import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { generateForecast } from '../../services/api.service.js';
import { processPayment, checkPaymentStatus } from '../../services/payment.service.js'; 
import { DISPLAY_PRICES, PAYMENT_PRICES } from '../../config.js';

export async function init(router) {
    const app = document.getElementById('app');
    
    app.classList.add('funnel-container');
    app.innerHTML = html;

    const urlParams = new URLSearchParams(window.location.search);
    const orderRef = urlParams.get('orderRef');
    const upsellSource = urlParams.get('upsell_source');

    // --- ЛОГІКА "НЕВИДИМОГО КПП" (Перевірка оплати + ВІДНОВЛЕННЯ СЕСІЇ) ---
    if (orderRef) {
        console.log("💳 Validating incoming payment:", orderRef);
        
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-black/60 z-50 flex items-center justify-center fixed top-0 left-0 w-full h-full';
        overlay.style.zIndex = '9999';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);

        try {
            const statusData = await checkPaymentStatus({ 
                invoiceId: state.get('pendingInvoiceId'),
                orderRef: orderRef 
            });

            if (statusData.status === 'approved' || statusData.status === 'success') {
                console.log("✅ Payment Validated!");
                
                state.set('isPaid', true);
                state.set('currentInvoiceId', statusData.invoiceId);
                
                // 🔥 SESSION RECOVERY LOGIC (CROSS-BROWSER FIX) 🔥
                if (statusData.userData) {
                    console.log("🔄 Restoring session from cloud backup...", statusData.userData);
                    state.set('userData', statusData.userData);
                    
                    // Відновлюємо окремі поля для сумісності
                    if (statusData.userData.date) state.set('date', statusData.userData.date);
                    if (statusData.userData.time) state.set('time', statusData.userData.time);
                    if (statusData.userData.city) state.set('city', statusData.userData.city);
                    if (statusData.userData.geo) state.set('geo', statusData.userData.geo);

                } else if (statusData.userEmail && !state.get('userData')?.email) {
                    // Fallback (краще ніж нічого)
                    console.warn("⚠️ Full session recovery failed, partial email restore.");
                    state.set('email', statusData.userEmail);
                }

                // Чистимо URL
                const newUrl = window.location.pathname; 
                window.history.replaceState({}, document.title, newUrl);
                overlay.remove();
                
            } else {
                alert(`Оплата не підтверджена. Статус: ${statusData.status}`);
                overlay.remove();
                router.navigate('/paywall');
                return;
            }
        } catch (e) {
            console.error(e);
            overlay.remove();
            alert("Помилка перевірки статусу. Будь ласка, зверніться в підтримку.");
        }
    }

    // ==========================================
    // UI ELEMENTS & LOGIC
    // ==========================================

    const emailForm = document.getElementById('email-form');
    const userEmailInput = document.getElementById('user-email');
    const mainReportBtn = document.getElementById('main-report-btn');
    const ltvUpsellBox = document.getElementById('ltv-upsell-box');
    const ltvUpsellBtn = document.getElementById('ltv-upsell-btn');
    const upsellSuccessModal = document.getElementById('upsell-success-modal');
    const upsellSuccessForm = document.getElementById('upsell-success-form');
    const upsellSuccessEmailInput = document.getElementById('upsell-success-email');

    function updateUpsellPriceVisuals() {
        if (ltvUpsellBox) {
            const priceStrong = ltvUpsellBox.querySelector('p span strong');
            if (priceStrong) priceStrong.innerText = `${DISPLAY_PRICES.FORECAST_UPSELL} грн.`;
            const btnText = ltvUpsellBtn.querySelector('.btn-text');
            if (btnText) btnText.innerHTML = `Так, додати прогноз за ${DISPLAY_PRICES.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; margin-left: 4px;">${DISPLAY_PRICES.FORECAST_OLD} грн.</span>`;
        }
    }
    updateUpsellPriceVisuals();

    function activatePremiumUI() {
        if (ltvUpsellBox) ltvUpsellBox.style.display = 'none';
        if (mainReportBtn) {
            mainReportBtn.classList.remove('btn-primary');
            mainReportBtn.classList.add('btn-gold-purple');
            const btnText = mainReportBtn.querySelector('.btn-text');
            if (btnText) btnText.innerText = "Надіслати мені Звіт + Прогноз";
        }
    }

    const isUpsellSuccess = (state.get('isPendingUpsell') || upsellSource === 'stage6'); 
    
    if (isUpsellSuccess) {
        state.set('hasPaidUpsell', true);
        state.set('isPendingUpsell', false);
        if (ltvUpsellBox) ltvUpsellBox.style.display = 'none';
        
        const savedEmail = state.get('email');
        if (savedEmail) {
            activatePremiumUI();
            const userData = state.get('userData'); 
            if (userData) {
                generateForecast(userData, savedEmail);
                setTimeout(() => alert("Прогноз успішно додано!"), 500);
            }
        } else {
            if (upsellSuccessModal) upsellSuccessModal.style.display = 'flex';
        }
    }

    if (state.get('hasPaidUpsell')) activatePremiumUI();
    if (state.get('email')) userEmailInput.value = state.get('email');

    // UPSELL CLICK
    ltvUpsellBtn.addEventListener('click', async () => {
        const btn = ltvUpsellBtn;
        const originalHtml = btn.querySelector('.btn-text').innerHTML;
        btn.classList.add('loading');
        btn.disabled = true;
        btn.querySelector('.btn-text').innerText = "Перехід до оплати...";

        try {
            const currentEmail = userEmailInput.value || ""; 
            state.set('isPendingUpsell', true);
            if (currentEmail) state.set('email', currentEmail);
            
            // 🔥 Передаємо userData і для апселу
            const fullUserData = state.get('userData');

            await processPayment(
                { name: "Астро-Прогноз на 2026 (Upsell)", price: PAYMENT_PRICES.FORECAST_UPSELL }, 
                { email: currentEmail },
                fullUserData, 
                { returnQueryParams: 'upsell_source=stage6' }
            );
        } catch (error) {
            console.error("Upsell Error:", error);
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.querySelector('.btn-text').innerHTML = originalHtml;
            state.set('isPendingUpsell', false);
        }
    });

    if (upsellSuccessForm) {
        upsellSuccessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newEmail = upsellSuccessEmailInput.value;
            if (newEmail) {
                state.set('email', newEmail);
                userEmailInput.value = newEmail;
                upsellSuccessModal.style.display = 'none';
                activatePremiumUI();
                const userData = state.get('userData');
                if (userData) generateForecast(userData, newEmail);
            }
        });
    }

    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userEmailInput.value;
        if (email) {
            state.set('email', email);
            router.navigateTo('generation');
        }
    });
}