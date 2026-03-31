import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';
import { warmUpBackend } from '../../services/api.service.js';
import { processPayment } from '../../services/payment.service.js';
import { DISPLAY_PRICES, PAYMENT_PRICES } from '../../config.js';
import { getPrices } from '../../utils/pricing.js';
import { haptics } from '../../utils/haptics.js';

export function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    // 🔥 Auto-scroll to top: заголовок завжди видно першим
    app.scrollTop = 0;
    window.scrollTo(0, 0);

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

        const oldPriceText = finalCheckoutButton.querySelector('.line-through');
        if (oldPriceText) {
            oldPriceText.innerText = `${currentPrices.display.FULL_REPORT_OLD || 799} грн`;
        }

        // 🔥 FIX: Select by font-bold, as whitespace-nowrap might be removed for mobile layout
        const popupBtnText = popupCheckoutBtn.querySelector('.font-bold');
        if (popupBtnText) {
            popupBtnText.innerText = `Розблокувати все за ${currentPrices.display.FULL_REPORT} грн`;
        }
    }
    updatePricesVisuals();

    // 🔥 VARIANT OVERRIDE: Paywall UI
    const currentVariant = state.get('currentVariant');
    if (currentVariant && currentVariant.ui && currentVariant.ui.paywall) {
        const ui = currentVariant.ui.paywall;

        // 1. Title
        const titleEl = document.querySelector('h2');
        if (titleEl && ui.title) titleEl.innerHTML = ui.title;

        // 2. Description
        const descEl = document.querySelector('p.text-sm.sm\\:text-base');
        if (descEl && ui.description) descEl.innerHTML = ui.description;

        // 3. Features List (Rich List)
        if (ui.features && Array.isArray(ui.features)) {
            const listContainer = document.querySelector('.space-y-3.pt-2');
            if (listContainer) {
                // Helper to escape quotes for inline JS
                const safeStr = (str) => str ? str.replace(/'/g, "\\'").replace(/"/g, '&quot;') : '';

                listContainer.innerHTML = ui.features.map(f => `
                    <div class="paywall-item" onclick="showPaywallPopup('${safeStr(f.popupTitle || f.title)}', '${safeStr(f.popupText || f.text)}')">
                        <span class="paywall-icon">${f.icon}</span>
                        <div>
                            <span class="block font-bold text-white text-[15px]">${f.title}</span>
                            <span class="text-xs text-gray-400">${f.text}</span>
                        </div>
                    </div>
                `).join('');
            }
        }

        // 4. Button Text
        if (ui.buttonText) {
            const btnTextSpan = finalCheckoutButton.querySelector('.btn-text span span.font-bold');
            if (btnTextSpan) {
                btnTextSpan.innerText = `${ui.buttonText} за ${currentPrices.display.FULL_REPORT} грн`;
            }

            const oldPriceText = finalCheckoutButton.querySelector('.line-through');
            if (oldPriceText) {
                oldPriceText.innerText = `${currentPrices.display.FULL_REPORT_OLD} грн`;
            }

            // Update popup button as well
            const popupBtnText = popupCheckoutBtn.querySelector('.font-bold');
            if (popupBtnText) {
                popupBtnText.innerText = `${ui.buttonText} за ${currentPrices.display.FULL_REPORT} грн`;
            }
        }
    }

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

    if (popupCloseBtn) popupCloseBtn.addEventListener('click', () => { haptics.trigger('light'); closePopup(); });
    if (popupCloseIcon) popupCloseIcon.addEventListener('click', () => { haptics.trigger('light'); closePopup(); }); // 🔥 NEW listener for X icon

    if (popupCheckoutBtn) {
        popupCheckoutBtn.addEventListener('click', () => {
            haptics.trigger('heavy');
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

                // 🔥 ADAPT TITLE FOR PARTNER MATCH
                const currentVariant = state.get('currentVariant'); // Get fresh state
                if (currentVariant && currentVariant.productType === 'partner') {
                    const titleEl = astroContainer.querySelector('.astro-data-title');
                    if (titleEl) titleEl.innerText = "Твій Астро-Код Кохання";
                }
            } else {
                astroContainer.style.display = 'none';
            }
        });
    }

    // DECRYPTION POPUP LOGIC (Клік по блоку з цифрами)
    const openDecryptionPopup = () => {
        const currentVariant = state.get('currentVariant');

        // 🔥 PARTNER MATCH POPUP CONTENT
        if (currentVariant && currentVariant.productType === 'partner') {
            const decryptionHtml = `
                <p class="mb-3">Ти бачиш <strong>точні координати</strong> Венеру, Марсу та 7-го дому (градуси та знаки).</p>
                
                <p class="mb-3 text-sm italic" style="color: #cda45e; border-left: 2px solid #cda45e; padding-left: 10px;">
                    "Це формула твого кохання. Вона показує, кого ти шукаєш і хто шукає тебе."
                </p>

                <ul class="text-sm space-y-2 mb-4">
                    <li><strong>Венера ♀:</strong> Твій стиль зваблення та те, що приносить тобі задоволення.</li>
                    <li><strong>Марс ♂:</strong> Типаж чоловіка, який викликає у тебе фізичний потяг.</li>
                    <li><strong>7-й Дім:</strong> Обставини знайомства та сценарій шлюбу.</li>
                </ul>

                <p class="mb-1">В <strong>Повному Портреті</strong> ми розшифруємо ці коди:</p>
                <p class="text-white text-sm">✅ Де саме відбудеться зустріч?<br>✅ Як впізнати "свого" чоловіка серед інших?</p>
            `;
            window.showPaywallPopup("🔑 Код Твого Кохання", decryptionHtml);
            return;
        }

        // DEFAULT (NATAL CHART) CONTENT
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
    if (astroContainer) astroContainer.addEventListener('click', () => {
        haptics.trigger('medium');
        openDecryptionPopup();
    });


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

            // 🔥 FIX: Збагачуємо userData розрахованими планетами
            // Ми ВИДАЛЯЄМО аспекти з цього запиту, щоб максимально прискорити Firestore Write (Critical for Apple Pay)
            const savedPlanets = state.get('planets');
            let enrichedUserData = savedPlanets
                ? { ...fullUserData, planets: savedPlanets }
                : { ...fullUserData }; // Ensure it's a clone

            // 🔥 INJECT CHILD GENDER IF NATAL_CHILD VARIANT
            const currentVariant = state.get('currentVariant');
            if (currentVariant && currentVariant.id === 'natal_child') {
                const childGender = localStorage.getItem('childGender');
                if (childGender) {
                    enrichedUserData.childGender = childGender;
                    console.log("👶 Injected childGender into payload:", childGender);
                }
            }

            if (savedPlanets) {
                console.log("🪐 Planets attached to payment payload:", savedPlanets.length, "bodies");
            } else {
                console.warn("⚠️ No pre-calculated planets found in state. Backend will use date only.");
            }

            console.log("📦 Preparing backup data for Safari:", enrichedUserData);

            // 🔥 Use Variant Product Name if available
            const productName = (currentVariant && currentVariant.productName)
                ? currentVariant.productName
                : "Natal Chart Full Report";
            const currentEmail = state.get('email') || "";

            // 🔥 BACKUP: Save Variant ID to LocalStorage (Survivability Layer 3)
            if (currentVariant && currentVariant.id) {
                try {
                    localStorage.setItem('pendingVariantId', currentVariant.id);
                    console.log("💾 Backup Variant ID to LocalStorage:", currentVariant.id);
                } catch (e) {
                    console.warn("LocalStorage backup failed", e);
                }
            }

            // 🔥 VARIANT RESTORATION FOR MONOBANK
            let returnQuery = 'source=paywall';
            if (currentVariant && currentVariant.id) {
                returnQuery += `&variant=${currentVariant.id}`;
            }

            await processPayment(
                { name: productName, price: currentPrices.charge.FULL_REPORT },
                { email: currentEmail },
                enrichedUserData, // 🔥 FIX: Тепер містить точні планети
                { returnQueryParams: returnQuery, variant: currentVariant?.id } // 🔥 PASS VARIANT TO SERVICE
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
        finalCheckoutButton.addEventListener('click', () => {
            haptics.trigger('heavy');
            handleCheckout(finalCheckoutButton);
        });
    }
}