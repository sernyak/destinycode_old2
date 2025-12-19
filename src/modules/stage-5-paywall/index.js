import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';

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

    // --- 1. POPUP LOGIC (Global Helper Hack) ---
    // Оскільки в HTML прописано onclick="showPaywallPopup(...)", 
    // ми мусимо зробити цю функцію доступною глобально.
    window.showPaywallPopup = function(title, text) {
        if (paywallPopup && popupTitle && popupText) {
            popupTitle.innerText = title;
            popupText.innerText = text;
            paywallPopup.style.display = 'flex';
        }
    };

    // Listeners for Popup Internal Buttons
    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', () => {
            paywallPopup.style.display = 'none';
        });
    }
    if (popupCheckoutBtn) {
        popupCheckoutBtn.addEventListener('click', () => {
            paywallPopup.style.display = 'none';
            handleCheckout(finalCheckoutButton); // Reuse main checkout logic
        });
    }
    // Close on overlay click
    paywallPopup.addEventListener('click', (e) => {
        if (e.target === paywallPopup) paywallPopup.style.display = 'none';
    });

    // --- 2. ASTRO TRUST BOX RENDER ---
    const userData = {
        date: state.get('date'),
        time: state.get('time'),
        city: state.get('city'),
        geo: state.get('geo')
    };

    renderAstroBox(userData).then(htmlContent => {
        if (htmlContent) {
            astroContainer.innerHTML = htmlContent;
            astroContainer.style.display = 'block';
        } else {
            astroContainer.style.display = 'none';
        }
    });

    // --- 3. TIMER LOGIC (Exact Monolith Logic) ---
    if (window.paywallInterval) clearInterval(window.paywallInterval);
    
    let duration = 7 * 60; // 7 minutes

    function updateTimer() {
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

    // --- 4. CHECKOUT LOGIC (Simulated) ---
    async function handleCheckout(btn) {
        // Loading State
        btn.classList.add('loading');
        btn.disabled = true;

        // Save data to session storage (simulating monolith logic)
        try {
            sessionStorage.setItem('destinyCodeData', JSON.stringify(userData));
        } catch (e) {
            console.error("Storage error:", e);
        }

        console.log("Simulating payment processing...");
        
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        console.log("Payment simulation successful.");

        // Clear timer
        clearInterval(window.paywallInterval);

        // Navigate to Success
        // В реальності тут був би редірект на Stripe/Fondy.
        // Ми емулюємо повернення з payment=success
        const successUrl = new URL(window.location);
        successUrl.searchParams.set('payment', 'success');
        window.history.pushState({}, '', successUrl); // update URL for realism
        
        router.navigateTo('success');
    }

    finalCheckoutButton.addEventListener('click', () => handleCheckout(finalCheckoutButton));
}