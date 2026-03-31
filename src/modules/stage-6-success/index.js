import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { startBackgroundGeneration } from '../../services/api.service.js';
import { processPayment, checkPaymentStatus } from '../../services/payment.service.js';
import { getPrices } from '../../utils/pricing.js';
import { VARIANTS } from '../../variants/index.js';
import { showModal } from '../../utils/modal.js';

export async function init(router) {
    const app = document.getElementById('app');

    app.classList.add('funnel-container');
    app.innerHTML = html;

    const urlParams = new URLSearchParams(window.location.search);
    const orderRef = urlParams.get('orderRef');
    const upsellSource = urlParams.get('upsell_source');
    const variantId = urlParams.get('variant');

    // 🔥 RESTORE VARIANT CONTEXT (FIX FOR MONOBANK REDIRECT)
    if (variantId && VARIANTS[variantId]) {
        console.log("🔄 Restoring Variant Session:", variantId);
        state.set('currentVariant', VARIANTS[variantId]);
    }

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

            // 🔥 COMPREHENSIVE VARIANT RESTORATION (3 LAYERS)
            // Layer 1: URL Param (handled at init)

            if (statusData.status === 'approved' || statusData.status === 'success') {
                console.log("✅ Payment Validated!");

                // Layer 2: Backend Persistence
                if (statusData.variant && VARIANTS[statusData.variant]) {
                    console.log("🔄 Restoring Variant from Backend:", statusData.variant);
                    state.set('currentVariant', VARIANTS[statusData.variant]);
                }

                // Layer 2.1: Traffic Source Restoration (🛰️ Fix for missing Meta Conversions)
                if (statusData.trafficSource) {
                    console.log("🛰️ Restoring Traffic Source from Backend:", statusData.trafficSource);
                    state.set('traffic_type', statusData.trafficSource);
                }

                // Layer 3: LocalStorage Fallback (Safari ITP / Cross-browser)
                if (!state.get('currentVariant')) {
                    const localVariant = localStorage.getItem('pendingVariantId');
                    if (localVariant && VARIANTS[localVariant]) {
                        console.log("🔄 Restoring Variant from LocalStorage:", localVariant);
                        state.set('currentVariant', VARIANTS[localVariant]);
                    }
                }
                // Cleanup
                localStorage.removeItem('pendingVariantId');

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

                    // 🔥 INJECT CHILD GENDER IF NATAL_CHILD VARIANT
                    const currentVariant = state.get('currentVariant');
                    if (currentVariant && currentVariant.id === 'natal_child') {
                        const childGender = localStorage.getItem('childGender');
                        if (childGender) {
                            userDataForGen.childGender = childGender;
                            console.log("👶 Injected childGender into background generation payload:", childGender);
                        }
                    }

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
        const variant = state.get('currentVariant');
        const productType = variant?.productType || variant?.aiContext?.productType;
        const isForecast = productType === 'forecast';

        if (ltvUpsellBox) {
            if (isForecast) {
                // 🔥 FORECAST VARIANT: Upsell → Partner Match
                const titleEl = ltvUpsellBox.querySelector('h3');
                if (titleEl) titleEl.innerText = 'Додай до свого замовлення';

                const descEl = ltvUpsellBox.querySelector('p');
                if (descEl) descEl.innerHTML = `
                    Хочеш дізнатися, який <strong>Ідеальний Партнер</strong> тобі підходить за твоєю натальною картою? Психологічний портрет, місце зустрічі та секрети зваблення.<br>
                    <span style="color: var(--primary-text-color);">Лише зараз: <strong>${currentPrices.display.FORECAST_UPSELL} грн.</strong> замість <span style="text-decoration: line-through; opacity: 0.7;">${currentPrices.display.FORECAST_OLD} грн</span></span>
                `;

                const btnText = ltvUpsellBtn?.querySelector('.btn-text');
                if (btnText) btnText.innerHTML = `Так, додати Портрет Партнера за ${currentPrices.display.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; font-weight: normal; margin-left: 4px;">${currentPrices.display.FORECAST_OLD} грн.</span>`;

                // Update modal text
                const modalText = upsellSuccessModal?.querySelector('p strong');
                if (modalText) modalText.innerText = '"Портрет Ідеального Партнера"';
            } else {
                // Default: Forecast Upsell
                const priceStrong = ltvUpsellBox.querySelector('p span strong');
                if (priceStrong) priceStrong.innerText = `${currentPrices.display.FORECAST_UPSELL} грн.`;
                const btnText = ltvUpsellBtn?.querySelector('.btn-text');
                if (btnText) btnText.innerHTML = `Так, додати Прогноз всього за ${currentPrices.display.FORECAST_UPSELL} грн. <span style="text-decoration: line-through; opacity: 0.7; margin-left: 4px;">${currentPrices.display.FORECAST_OLD} грн.</span>`;
            }
        }
    }
    updateUpsellPriceVisuals();

    /**
     * 🔥 Активація Преміум UI (Final State)
     */
    function activatePremiumUI() {
        if (ltvUpsellBox) ltvUpsellBox.style.display = 'none';

        const variant = state.get('currentVariant');
        const productType = variant?.productType || variant?.aiContext?.productType;
        const isForecast = productType === 'forecast';

        if (mainReportBtn) {
            mainReportBtn.classList.remove('btn-primary');
            mainReportBtn.classList.add('btn-gold-purple');
            const btnText = mainReportBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.innerText = isForecast
                    ? "Надіслати мені Прогноз + Партнер"
                    : "Надіслати мені Звіт + Прогноз";
            }
        }

        if (state.get('email') && userEmailInput) {
            userEmailInput.value = state.get('email');
        }
    }

    // 🔥 VARIANT OVERRIDE: Button Text
    const currentVariant = state.get('currentVariant');
    if (currentVariant && currentVariant.ui && currentVariant.ui.success) {
        if (mainReportBtn && currentVariant.ui.success.buttonText) {
            const btnText = mainReportBtn.querySelector('.btn-text');
            // Only change if NOT premium (premium has its own text)
            // But usually success page starts with normal state.
            if (btnText && !state.get('hasPaidUpsell')) {
                btnText.innerText = currentVariant.ui.success.buttonText;
            }
        }
        // Override description text
        if (currentVariant.ui.success.description) {
            const descriptionEl = document.querySelector('#email-capture-box > p');
            if (descriptionEl) {
                descriptionEl.innerHTML = currentVariant.ui.success.description;
            }
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
                const variant = state.get('currentVariant');
                const productType = variant?.productType || variant?.aiContext?.productType;
                const isForecast = productType === 'forecast';
                window.DC_Analytics.trackPurchase(
                    currentCharges.FORECAST_UPSELL,
                    `upsell_${Date.now()}`,
                    isForecast ? "Partner Match Upsell" : "Forecast Year Upsell"
                );
            }
            state.set('upsellPurchaseTracked', true);
        }

        // 🔥 Якщо це допродаж ЗІ ЗВІТУ (8 екран) -> миттєво повертаємо юзера назад
        if (upsellSource === 'stage8') {
            console.log("🔙 Redirecting back to premium-result after successful Late Upsell...");
            // Робимо невелику затримку для збереження стейту і перезавантажуємо екран 8
            setTimeout(() => {
                router.navigate('/premium-result?upsell_source=stage8');
            }, 100);
            return; // ‼️ Припиняємо виконання 6-го екрану, щоб не показувати модалок
        }

        // 🔥 Для стандартного апселу з 6-го екрану продовжуємо логіку:
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);

        const savedEmail = state.get('email');

        if (savedEmail) {
            activatePremiumUI();
            const variant = state.get('currentVariant');
            const productType = variant?.productType || variant?.aiContext?.productType;
            const isForecast = productType === 'forecast';
            const upsellProductName = isForecast ? 'Портрет Партнера' : 'Прогноз на рік';
            showModal(
                "✨ Дякую за покупку!",
                `Твій Прогноз генерується і буде автоматично відправлений на <strong>${savedEmail}</strong><br><br> Натискай <strong>Надіслати мені Звіт</strong> на наступній сторінці`
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
                const variant = state.get('currentVariant');
                const productType = variant?.productType || variant?.aiContext?.productType;
                const isForecast = productType === 'forecast';
                const upsellName = isForecast ? 'Астро-Портрет Партнера' : 'Астро-Прогноз на рік';

                await processPayment(
                    { name: upsellName, price: currentCharges.FORECAST_UPSELL },
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
                    "✨ Дякую за покупку!",
                    `Твій Прогноз генерується і буде автоматично відправлений на <strong>${newEmail}</strong><br><br>📧 Перевір папку <strong>'Вхідні'</strong> та <strong>'Спам'</strong>.`
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