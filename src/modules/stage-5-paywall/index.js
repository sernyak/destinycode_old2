import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';
import { warmUpBackend } from '../../services/api.service.js';
import { processPayment } from '../../services/payment.service.js';
import { DISPLAY_PRICES, PAYMENT_PRICES } from '../../config.js';
import { getPrices } from '../../utils/pricing.js';

export function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    const currentPrices = getPrices(); // 🔥 Отримуємо актуальні ціни

    const timerDisplay = document.getElementById('paywall-timer');
    const astroContainer = document.getElementById('paywall-astro-data');
    const staticPlaceholder = document.querySelector('.static-placeholder');
    // const clickHint = document.getElementById('astro-click-hint'); // 🔥 REMOVED

    const finalCheckoutButton = document.getElementById('final-checkout-button');

    // Popup Elements
    const paywallPopup = document.getElementById('paywall-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const popupCheckoutBtn = document.getElementById('popup-checkout-btn');
    const popupCloseBtn = document.getElementById('popup-close-btn');
    const popupCloseIcon = document.getElementById('popup-close-icon'); // 🔥 NEW

    warmUpBackend();

    function updatePricesVisuals() {
        const mainBtnText = finalCheckoutButton.querySelector('.btn-text span span.font-bold');
        if (mainBtnText) {
            mainBtnText.innerText = `Розблокувати все за ${currentPrices.display.FULL_REPORT} грн`;
        }
        const popupBtnText = popupCheckoutBtn.querySelector('.whitespace-nowrap');
        if (popupBtnText) {
            popupBtnText.innerText = `Розблокувати все за ${currentPrices.display.FULL_REPORT} грн`;
        }
    }
    updatePricesVisuals();

    // POPUP LOGIC
    window.showPaywallPopup = function (title, messageHtml) {
        if (paywallPopup && popupTitle && popupText) {
            popupTitle.innerText = title;
            popupText.innerHTML = messageHtml;
            paywallPopup.style.display = 'flex';
        }
    };

    const closePopup = () => {
        if (paywallPopup) paywallPopup.style.display = 'none';
    };

    if (popupCloseBtn) popupCloseBtn.addEventListener('click', closePopup);
    if (popupCloseIcon) popupCloseIcon.addEventListener('click', closePopup); // 🔥 NEW listener for X icon

    if (popupCheckoutBtn) {
        popupCheckoutBtn.addEventListener('click', () => {
            closePopup();
            handleCheckout(finalCheckoutButton);
        });
    }
    if (paywallPopup) {
        paywallPopup.addEventListener('click', (e) => {
            if (e.target === paywallPopup) closePopup();
        });
    }

    // ASTRO TRUST BOX RENDER
    const userData = state.get('userData') || {
        date: state.get('date'),
        time: state.get('time'),
        city: state.get('city'),
        geo: state.get('geo')
    };

    if (astroContainer) {
        renderAstroBox(userData).then(htmlContent => {
            if (htmlContent) {
                // Ховаємо плейсхолдер
                if (staticPlaceholder) staticPlaceholder.style.display = 'none';

                astroContainer.innerHTML = htmlContent;
                astroContainer.style.display = 'block';

                // Note: Підказка прибрана, анімація заголовку працює через CSS
            } else {
                astroContainer.style.display = 'none';
            }
        });
    }

    // DECRYPTION POPUP LOGIC (Клік по блоку з цифрами)
    const openDecryptionPopup = () => {
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

            <p class="mb-1">В <strong>Повному Звіті</strong> ми переклали ці складні цифри на зрозумілу мову:</p>
            <p class="text-white text-sm">✅ Як ці градуси впливають на твій дохід?<br>✅ Чому Венера в цьому положенні притягує саме таких чоловіків?</p>
        `;

        window.showPaywallPopup("📡 Розшифровка Космічного Коду", decryptionHtml);
    };

    // Додаємо слухача тільки на контейнер
    if (astroContainer) astroContainer.addEventListener('click', openDecryptionPopup);


    // TIMER LOGIC
    if (window.paywallInterval) clearInterval(window.paywallInterval);
    let duration = 7 * 60;

    function updateTimer() {
        if (!timerDisplay) return;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (--duration < 0) {
            duration = 0;
            clearInterval(window.paywallInterval);
        }
    }
    updateTimer();
    window.paywallInterval = setInterval(updateTimer, 1000);

    // --- CHECKOUT LOGIC ---
    async function handleCheckout(btn) {
        btn.classList.add('loading');
        btn.disabled = true;

        const btnTextSpan = btn.querySelector('.btn-text');
        if (btnTextSpan) {
            btn.dataset.originalText = btnTextSpan.innerHTML;
            btnTextSpan.innerHTML = '<span class="text-lg">З\'єднуюсь з банком...</span>';
        }

        try {
            // 🔥 GET FULL USER DATA FOR BACKUP
            // Перевіряємо, чи є повний об'єкт. Якщо ні - збираємо вручну.
            const fullUserData = state.get('userData') || {
                date: state.get('date'),
                time: state.get('time'),
                city: state.get('city'),
                geo: state.get('geo')
            };

            console.log("📦 Preparing backup data for Safari:", fullUserData);

            await processPayment(
                { name: "Повний Астро-Портрет (Premium)", price: currentPrices.charge.FULL_REPORT },
                { email: state.get('email') || "" },
                fullUserData // 🔥 ВІДПРАВЛЯЄМО ДАНІ
            );

        } catch (error) {
            console.error("Payment error:", error);
            btn.classList.remove('loading');
            btn.disabled = false;
            if (btnTextSpan && btn.dataset.originalText) {
                btnTextSpan.innerHTML = btn.dataset.originalText;
            }
        }
    }

    if (finalCheckoutButton) {
        finalCheckoutButton.addEventListener('click', () => handleCheckout(finalCheckoutButton));
    }
}