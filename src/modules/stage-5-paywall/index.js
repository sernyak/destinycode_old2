import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';
import { warmUpBackend, startBackgroundGeneration } from '../../services/api.service.js';
import { processPayment } from '../../services/payment.service.js';
// 🔥 IMPORT BOTH PRICE TYPES
import { DISPLAY_PRICES, PAYMENT_PRICES } from '../../config.js';

export function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    // --- DOM Elements ---
    const timerDisplay = document.getElementById('paywall-timer');
    const astroContainer = document.getElementById('paywall-astro-data');
    const finalCheckoutButton = document.getElementById('final-checkout-button');
    
    // Popup Elements
    const paywallPopup = document.getElementById('paywall-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const popupCheckoutBtn = document.getElementById('popup-checkout-btn');
    const popupCloseBtn = document.getElementById('popup-close-btn');

    // WARM UP BACKEND
    warmUpBackend();

    // 🔥 DYNAMIC PRICE VISUALIZATION (EYE CANDY)
    function updatePricesVisuals() {
        // Оновлюємо головну кнопку (знаходимо span з ціною)
        const mainBtnText = finalCheckoutButton.querySelector('.btn-text span span.font-bold');
        if (mainBtnText) {
            // Завжди показуємо повну ціну (149 грн)
            mainBtnText.innerText = `Розблокувати зараз за ${DISPLAY_PRICES.FULL_REPORT} грн`;
        }

        // Оновлюємо кнопку в попапі
        const popupBtnText = popupCheckoutBtn.querySelector('.whitespace-nowrap');
        if (popupBtnText) {
            popupBtnText.innerText = `Розблокувати зараз за ${DISPLAY_PRICES.FULL_REPORT} грн`;
        }
    }
    
    // Запускаємо оновлення візуалу
    updatePricesVisuals();

    // POPUP LOGIC
    window.showPaywallPopup = function(title, text) {
        if (paywallPopup && popupTitle && popupText) {
            popupTitle.innerText = title;
            popupText.innerText = text;
            paywallPopup.style.display = 'flex';
        }
    };

    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', () => {
            paywallPopup.style.display = 'none';
        });
    }
    if (popupCheckoutBtn) {
        popupCheckoutBtn.addEventListener('click', () => {
            paywallPopup.style.display = 'none';
            handleCheckout(finalCheckoutButton);
        });
    }
    if (paywallPopup) {
        paywallPopup.addEventListener('click', (e) => {
            if (e.target === paywallPopup) paywallPopup.style.display = 'none';
        });
    }

    // ASTRO TRUST BOX RENDER
    const userData = {
        date: state.get('date'),
        time: state.get('time'),
        city: state.get('city'),
        geo: state.get('geo')
    };

    if (astroContainer) {
        renderAstroBox(userData).then(htmlContent => {
            if (htmlContent) {
                astroContainer.innerHTML = htmlContent;
                astroContainer.style.display = 'block';
            } else {
                astroContainer.style.display = 'none';
            }
        });
    }

    // TIMER LOGIC
    if (window.paywallInterval) clearInterval(window.paywallInterval);
    
    let duration = 7 * 60; // 7 minutes

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

    // --- CHECKOUT LOGIC (ACTUAL CHARGE) ---
    async function handleCheckout(btn) {
        // UI Loading
        btn.classList.add('loading');
        btn.disabled = true;

        try {
            // 🔥 ВИКОРИСТОВУЄМО PAYMENT_PRICES (1 ГРН)
            await processPayment(
                { name: "Повний Астро-Портрет (Premium)", price: PAYMENT_PRICES.FULL_REPORT },
                { email: state.get('email') || "" } 
            );

            // Успіх
            console.log("Payment initiated.");
            state.set('isPaid', true);

            startBackgroundGeneration(userData); 

            clearInterval(window.paywallInterval);

            // Navigate
            const successUrl = new URL(window.location);
            successUrl.searchParams.set('payment', 'success');
            window.history.pushState({}, '', successUrl); 
            
            router.navigateTo('success');

        } catch (error) {
            console.error("Payment error:", error);
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    if (finalCheckoutButton) {
        finalCheckoutButton.addEventListener('click', () => handleCheckout(finalCheckoutButton));
    }
}