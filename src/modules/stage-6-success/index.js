import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { generateForecast } from '../../services/api.service.js';
import { processPayment } from '../../services/payment.service.js';
import { DISPLAY_PRICES, PAYMENT_PRICES } from '../../config.js';

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

    // 🔥 NEW MODAL ELEMENTS
    const upsellSuccessModal = document.getElementById('upsell-success-modal');
    const upsellSuccessForm = document.getElementById('upsell-success-form');
    const upsellSuccessEmailInput = document.getElementById('upsell-success-email');

    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    // 🔥 FIX: Читаємо джерело апселу з URL (надійніше ніж sessionStorage)
    const urlUpsellSource = urlParams.get('upsell_source');

    // --- Helper: Dynamic Upsell Price ---
    function updateUpsellPriceVisuals() {
        if (ltvUpsellBox) {
            const priceStrong = ltvUpsellBox.querySelector('p span strong');
            if (priceStrong) {
                priceStrong.innerText = `${DISPLAY_PRICES.FORECAST_UPSELL} грн.`;
            }
            const btnText = ltvUpsellBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.innerHTML = `Так, додати прогноз за ${DISPLAY_PRICES.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">${DISPLAY_PRICES.FORECAST_OLD} грн.</span>`;
            }
        }
    }
    updateUpsellPriceVisuals();

    // --- Helper: Активувати інтерфейс "Все куплено" ---
    function activatePremiumUI() {
        // 1. Ховаємо блок апселу (бо вже куплено)
        if (ltvUpsellBox) {
            ltvUpsellBox.style.display = 'none';
        }

        // 2. Змінюємо головну кнопку на "Звіт + Прогноз"
        if (mainReportBtn) {
            mainReportBtn.classList.remove('btn-primary');
            mainReportBtn.classList.add('btn-gold-purple');
            
            const btnText = mainReportBtn.querySelector('.btn-text');
            if (btnText) btnText.innerText = "Надіслати мені Звіт + Прогноз";
        }
    }

    // --- 🔥 ЛОГІКА ПОВЕРНЕННЯ З ОПЛАТИ (UPSELL RETURN) ---
    // Тепер працює, якщо:
    // 1. АБО є прапорець в сесії (старий метод)
    // 2. АБО в URL є upsell_source=stage6 (новий надійний метод)
    const isUpsellReturn = (state.get('isPendingUpsell') || urlUpsellSource === 'stage6') && paymentStatus === 'success';
    
    if (isUpsellReturn) {
        console.log("🔄 Returned from Upsell Payment (Stage 6)");
        
        // Фіксуємо факт оплати
        state.set('hasPaidUpsell', true);
        state.set('isPendingUpsell', false);
        
        // Очищаємо URL від параметрів, щоб при рефреші не спрацьовувало знову
        // Але обережно, щоб не збити користувача
        // window.history.replaceState({}, document.title, window.location.pathname);

        const savedEmail = state.get('email'); // Перевіряємо, чи є вже email

        // Ховаємо блок апселу відразу
        if (ltvUpsellBox) ltvUpsellBox.style.display = 'none';

        if (savedEmail) {
            // ✅ СЦЕНАРІЙ 1: Email вже був введений
            console.log("Scenario 1: Email exists, generating forecast...");
            activatePremiumUI();
            
            // Запускаємо генерацію фоном
            const userData = {
                date: state.get('date'),
                time: state.get('time'),
                city: state.get('city'),
                geo: state.get('geo')
            };
            generateForecast(userData, savedEmail);
            
            setTimeout(() => alert("Оплата успішна! Прогноз додано до вашого замовлення."), 500);

        } else {
            // ❌ СЦЕНАРІЙ 2: Email НЕМАЄ (втрачено сесію або не вводили) -> Показуємо модалку
            console.log("Scenario 2: No email, showing modal...");
            
            if (upsellSuccessModal) {
                upsellSuccessModal.style.display = 'flex';
            }
        }
    }

    // --- ЛОГІКА ВІДНОВЛЕННЯ СТАНУ ---
    if (state.get('hasPaidUpsell')) {
        activatePremiumUI();
    }
    if (state.get('email')) {
        userEmailInput.value = state.get('email');
    }

    // --- КЛІК НА КНОПКУ АПСЕЛУ (Старт оплати) ---
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

            // 🔥 FIX: Додаємо upsell_source=stage6 в URL повернення
            await processPayment(
                { name: "Астро-Прогноз на 2026 (Upsell)", price: PAYMENT_PRICES.FORECAST_UPSELL }, 
                { email: currentEmail },
                { returnQueryParams: 'upsell_source=stage6' } // <--- CRITICAL FIX
            );

        } catch (error) {
            console.error("Upsell Error:", error);
            btn.classList.remove('loading');
            btn.disabled = false;
            btn.querySelector('.btn-text').innerHTML = originalHtml;
            state.set('isPendingUpsell', false);
        }
    });

    // --- ОБРОБКА НОВОЇ МОДАЛКИ ---
    if (upsellSuccessForm) {
        upsellSuccessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newEmail = upsellSuccessEmailInput.value;
            
            if (newEmail) {
                state.set('email', newEmail);
                userEmailInput.value = newEmail;
                upsellSuccessModal.style.display = 'none';
                activatePremiumUI();

                const userData = {
                    date: state.get('date'),
                    time: state.get('time'),
                    city: state.get('city'),
                    geo: state.get('geo')
                };
                generateForecast(userData, newEmail);
            }
        });
    }

    // --- ГОЛОВНА ФОРМА ---
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = userEmailInput.value;
        if (email) {
            state.set('email', email);
            router.navigateTo('generation');
        }
    });
}