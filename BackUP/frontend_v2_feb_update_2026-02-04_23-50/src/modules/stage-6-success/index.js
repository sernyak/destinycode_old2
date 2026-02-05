import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { startBackgroundGeneration } from '../../services/api.service.js';
import { processPayment, checkPaymentStatus } from '../../services/payment.service.js';
import { getPrices } from '../../utils/pricing.js';
import { showModal } from '../../utils/modal.js';

export async function init(router) {
    const app = document.getElementById('app');

    app.classList.add('funnel-container');
    app.innerHTML = html;

    const urlParams = new URLSearchParams(window.location.search);
    const orderRef = urlParams.get('orderRef');
    const upsellSource = urlParams.get('upsell_source');

    // --- ЛОГІКА ВІДНОВЛЕННЯ СЕСІЇ ТА ВАЛІДАЦІЇ ОПЛАТИ ---
    if (orderRef) {
        console.log("💳 Validating payment & restoring session:", orderRef);

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

                // 🔥 GTM E-COMMERCE: PURCHASE EVENT
                // Ми перевіряємо, чи ми вже відправляли цю подію для цієї сесії, щоб уникнути дублів при оновленні сторінки
                if (!state.get('purchaseTracked')) {
                    if (window.DC_Analytics) {
                        const { charge: currentCharges } = getPrices();
                        window.DC_Analytics.trackPurchase(
                            currentCharges.FULL_REPORT,
                            statusData.invoiceId || orderRef,
                            "Natal Chart Full Report"
                        );
                    }
                    state.set('purchaseTracked', true);
                }

                if (statusData.userData) {
                    state.set('userData', statusData.userData);
                    if (statusData.userData.date) state.set('date', statusData.userData.date);
                    if (statusData.userData.time) state.set('time', statusData.userData.time);
                    if (statusData.userData.city) state.set('city', statusData.userData.city);
                    if (statusData.userData.geo) state.set('geo', statusData.userData.geo);
                }

                if (statusData.userEmail) {
                    state.set('email', statusData.userEmail);
                }

                overlay.remove();

                if (!upsellSource) {
                    const userDataForGen = state.get('userData') || {
                        date: state.get('date'), time: state.get('time'), city: state.get('city')
                    };
                    startBackgroundGeneration(userDataForGen).catch(e => console.warn("Bg gen error", e));
                }

            } else {
                alert(`Оплата не підтверджена. Статус: ${statusData.status}`);
                overlay.remove();
                router.navigate('/paywall');
                return;
            }
        } catch (e) {
            console.error(e);
            overlay.remove();
            alert("Помилка перевірки статусу.");
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

    if (userEmailInput) {
        userEmailInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (val) state.set('email', val);
        });
    }

    function updateUpsellPriceVisuals() {
        const currentPrices = getPrices();
        if (ltvUpsellBox) {
            const priceStrong = ltvUpsellBox.querySelector('p span strong');
            if (priceStrong) priceStrong.innerText = `${currentPrices.display.FORECAST_UPSELL} грн.`;
            const btnText = ltvUpsellBtn.querySelector('.btn-text');
            if (btnText) btnText.innerHTML = `Так, додати Прогноз всього за ${currentPrices.display.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; margin-left: 4px;">${currentPrices.display.FORECAST_OLD} грн.</span>`;
        }
    }
    updateUpsellPriceVisuals();

    /**
     * 🔥 Активація Преміум UI (Final State)
     */
    function activatePremiumUI() {
        if (ltvUpsellBox) ltvUpsellBox.style.display = 'none';

        if (mainReportBtn) {
            mainReportBtn.classList.remove('btn-primary');
            mainReportBtn.classList.add('btn-gold-purple');
            const btnText = mainReportBtn.querySelector('.btn-text');
            if (btnText) btnText.innerText = "Надіслати мені Звіт + Прогноз";
        }

        if (state.get('email') && userEmailInput) {
            userEmailInput.value = state.get('email');
        }
    }

    // --- ЛОГІКА ОБРОБКИ UPSELL (ПОВЕРНЕННЯ ПІСЛЯ ОПЛАТИ) ---
    const isUpsellSuccess = (state.get('isPendingUpsell') || !!upsellSource);

    if (isUpsellSuccess) {
        state.set('hasPaidUpsell', true);
        state.set('isPendingUpsell', false);

        // 🔥 GTM E-COMMERCE: UPSELL PURCHASE
        if (!state.get('upsellPurchaseTracked')) {
            if (window.DC_Analytics) {
                const { charge: currentCharges } = getPrices();
                window.DC_Analytics.trackPurchase(
                    currentCharges.FORECAST_UPSELL,
                    `upsell_${Date.now()}`,
                    "Forecast 2026 Upsell"
                );
            }
            state.set('upsellPurchaseTracked', true);
        }

        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);

        const savedEmail = state.get('email');

        if (savedEmail) {
            activatePremiumUI();
            showModal(
                "✨ Дякуємо за покупку!",
                `Твій <strong>Прогноз на 2026 рік</strong> генерується прямо зараз і буде відправлений на <strong>${savedEmail}</strong><br><br> Натискай <strong>Надіслати мені Звіт + Прогноз</strong> на наступній сторінці`
            );

        } else {
            if (upsellSuccessModal) upsellSuccessModal.style.display = 'flex';
        }
    }

    if (state.get('hasPaidUpsell')) {
        activatePremiumUI();
    }

    if (state.get('email')) {
        userEmailInput.value = state.get('email');
    }

    // --- КНОПКА UPSELL (Ініціалізація оплати) ---
    if (ltvUpsellBtn) {
        ltvUpsellBtn.addEventListener('click', async () => {
            const btn = ltvUpsellBtn;
            const originalHtml = btn.querySelector('.btn-text').innerHTML;
            btn.classList.add('loading');
            btn.disabled = true;
            btn.querySelector('.btn-text').innerText = "Перехід до оплати...";

            try {
                const currentEmail = userEmailInput.value ? userEmailInput.value.trim() : "";
                state.set('isPendingUpsell', true);
                if (currentEmail) state.set('email', currentEmail);

                // 🔥 GTM: Трекаємо клік (вже є в main.js global tracker, але тут явний інтент)

                const fullUserData = state.get('userData');
                const { charge: currentCharges } = getPrices();

                await processPayment(
                    { name: "Астро-Прогноз на 2026", price: currentCharges.FORECAST_UPSELL },
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
    }

    // --- ОБРОБКА МОДАЛКИ (СЦЕНАРІЙ 1.2) ---
    if (upsellSuccessForm) {
        upsellSuccessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newEmail = upsellSuccessEmailInput.value;

            if (newEmail) {
                state.set('email', newEmail);
                userEmailInput.value = newEmail;

                upsellSuccessModal.style.display = 'none';
                activatePremiumUI();

                showModal(
                    "✨ Дякуємо за покупку!",
                    `Твій <strong>Прогноз на 2026 рік</strong> генерується і буде відправлений на <strong>${newEmail}</strong> протягом 1-2 хвилин.<br><br>📧 Перевір папку <strong>'Вхідні'</strong> та <strong>'Спам'</strong>.`
                );
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