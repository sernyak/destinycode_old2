/**
 * DESTINY CODE MAIN ENTRY POINT (v4.2.3 - FINAL PRODUCTION)
 * - FIX: Повна ліквідація дублювання подій Purchase.
 * - FIX: Advanced Matching (Email у кожній події DataLayer).
 * - FIX: Коректні Event ID для дедублікації (CAPI).
 * - KEEP: Verified Lead, Verified Premium Data, Multi-button popups.
 */

import './styles/main.css';
import { state } from './utils/state.js';
import { router } from './utils/router.js';
import { haptics } from './utils/haptics.js';
import { warmUpBackend } from './services/api.service.js';

import { StarryBackground } from './utils/StarryBackground.js';
import { Logger } from './utils/logger.js';

// --- ІМПОРТ МОДУЛІВ ---
import { init as initWelcome } from './modules/stage-1-welcome/index.js';
import { init as initLoading } from './modules/stage-2-loading/index.js';
import { init as initResult } from './modules/stage-3-result/index.js';
import { init as initPremiumData } from './modules/stage-4-premium/index.js';
import { init as initPaywall } from './modules/stage-5-paywall/index.js';
import { init as initSuccess } from './modules/stage-6-success/index.js';
import { init as initGeneration } from './modules/stage-7-generation/index.js';
import { init as initPremiumResult } from './modules/stage-8-premium-result/index.js';

/**
 * 📊 Virtual Pageviews (з підтримкою Advanced Matching)
 */
function trackPageView(route) {
    if (window.dataLayer) {
        const pageViewId = 'pv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        window.dataLayer.push({
            event: 'virtual_pageview',
            page_path: route,
            page_title: document.title,
            event_id: pageViewId,
            email: state.get('email') || '' // Передаємо для Meta matching
        });
    }
}

/**
 * 🖱️ Global Click Tracking (Interaction & Benefits)
 */
function setupGlobalClickTracking() {
    document.addEventListener('click', (event) => {
        const target = event.target.closest('button, a, .paywall-item, .interactive-astro-box');

        if (target && window.dataLayer) {
            const elementId = target.id || target.getAttribute('name') || 'no-id';
            const clickId = 'clk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

            let gtmEventName = 'interaction_click';

            // 1. Спеціальні кліки для GTM тригерів
            if (elementId === 'upgrade-button') gtmEventName = 'click_upgrade_3scrn';

            // 2. Відстеження блоків переваг на пейволлі
            if (target.classList.contains('paywall-item')) {
                const benefitTitle = target.querySelector('.font-bold')?.innerText || 'Unknown';
                const benefitMap = {
                    'Ядро Особистості': 'personality',
                    'Код Твого Кохання': 'love',
                    'Грошовий Потік': 'money',
                    'Кармічні Уроки та Призначення': 'karma',
                    'Твої Майбутні Можливості': 'future'
                };
                const benefitKey = benefitMap[benefitTitle] || 'other';
                gtmEventName = `click_paywall_benefit_${benefitKey}`;
            }
            // Клік по "Космічному відбитку"
            else if (target.classList.contains('interactive-astro-box') || elementId === 'paywall-astro-data') {
                gtmEventName = 'click_paywall_benefit_astro_imprint';
            }

            window.dataLayer.push({
                event: gtmEventName,
                event_id: clickId,
                element_id: elementId,
                email: state.get('email') || '', // Для розширеного співпадіння
                page_path: window.location.pathname
            });

            // eCommerce Logic: Begin Checkout (Основний звіт)
            if (elementId === 'final-checkout-button' || elementId === 'popup-checkout-btn') {
                window.DC_Analytics.trackBeginCheckout(149, 'Natal Chart Full Report');
            }

            // eCommerce Logic: Begin Checkout (Апсел)
            if (elementId === 'ltv-upsell-btn') {
                const isFromReport = window.location.pathname.includes('report') || window.location.pathname.includes('premium-result');
                const source = isFromReport ? 'Report' : 'Success';

                window.DC_Analytics.trackBeginCheckout(97, `Forecast Upsell (${source})`);
                state.set('last_checkout_value', 97);
                state.set('upsell_origin', source);
            }
        }
    }, true);

    // 🔊 GLOBAL HAPTICS for all Buttons/Links
    document.addEventListener('click', (e) => {
        // Find if user clicked a button or link (bubble up)
        const interactable = e.target.closest('button, a, .btn, .clickable, input[type="radio"], input[type="checkbox"]');

        if (interactable) {
            // Check if it's "disabled"
            if (interactable.disabled || interactable.classList.contains('disabled')) {
                haptics.trigger('error'); // Buzz if disabled
            } else {
                // Determine intensity based on class or type
                if (interactable.classList.contains('btn-primary') || interactable.classList.contains('btn-action')) {
                    // Heavy haptic is already triggered manually in specific modules for submitting.
                    // We avoid double trigger here by checking manual handling or just doing light "feedback"
                    // Strategy: If it has specific logic, we might double trigger.
                    // Let's use a "debounced" approach or just trigger 'medium' unless it's a known heavy button.

                    // Simple heuristic: If it sends data (submit), modules usually handle it. 
                    // But for generic navigation buttons, we want feedback.

                    // Let's try: trigger 'medium' for all buttons globally.
                    // If a specific handler triggers 'heavy' or 'success' immediately after, 
                    // the haptic engine (sound/vibrate) usually overlaps or overrides acceptable.

                    haptics.trigger('medium');
                } else {
                    haptics.trigger('light');
                }
            }
        }
    }, true);
}

/**
 * 💰 ANALYTICS API (Deduplication & Granular Tracking)
 */
window.DC_Analytics = {
    generateEventId: (prefix = 'evt') => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,

    trackBeginCheckout: (value, itemName) => {
        const eventId = window.DC_Analytics.generateEventId('bc');

        // Визначаємо кастомне ім'я для бічної панелі GTM
        let gtmEvent = 'begin_checkout_main';
        if (itemName.includes('(Success)')) gtmEvent = 'begin_checkout_upsell_success';
        if (itemName.includes('(Report)')) gtmEvent = 'begin_checkout_upsell_report';

        window.dataLayer.push({
            event: gtmEvent,
            event_id: eventId,
            item_name: itemName,
            email: state.get('email') || '',
            ecommerce: {
                currency: 'UAH',
                value: value,
                items: [{ item_name: itemName, price: value, quantity: 1 }]
            }
        });
        Logger.log(`🚀 [Analytics] ${gtmEvent.toUpperCase()}: ${itemName}`);
    },

    trackPurchase: (value, transactionId, itemName) => {
        // Розділяємо імена для візуальної зручності в GTM Preview Sidebar
        let gtmPurchaseEvent = 'purchase_main';
        if (itemName.includes('(Success)')) gtmPurchaseEvent = 'purchase_upsell_success';
        if (itemName.includes('(Report)')) gtmPurchaseEvent = 'purchase_upsell_report';

        window.dataLayer.push({
            event: 'purchase',
            event_custom_name: gtmPurchaseEvent,
            event_id: transactionId,
            email: state.get('email') || '',
            ecommerce: {
                transaction_id: transactionId,
                value: value,
                currency: 'UAH',
                items: [{ item_name: itemName, price: value, quantity: 1 }]
            }
        });
        Logger.log(`💰💰💰 [Analytics] ${gtmPurchaseEvent.toUpperCase()}: ${itemName}`);
    }
};

/**
 * 🚀 BOOTSTRAP
 */
async function bootstrap() {
    // 🔥 GLOBAL: Ініціалізуємо космічний фон глобально, незалежно від роуту
    if (!window.starryBgInstance) {
        window.starryBgInstance = new StarryBackground();
    }

    // 🔊 Global Audio Unlock (Touch/Click)
    const unlockHaptics = () => {
        haptics.init();
        document.body.removeEventListener('click', unlockHaptics);
        document.body.removeEventListener('touchstart', unlockHaptics);
    };
    document.body.addEventListener('click', unlockHaptics);
    document.body.addEventListener('touchstart', unlockHaptics);

    setupGlobalClickTracking();
    router.init({
        onRoute: async (route) => {
            trackPageView(route);
            const params = new URLSearchParams(window.location.search);

            switch (route) {
                case '/': initWelcome(router); break;

                case '/loading':
                    // Verified Lead (S1 -> Loading)
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: 'lead_confirmed',
                            event_id: 'ld_' + Date.now(),
                            email: state.get('email') || ''
                        });
                    }
                    initLoading(router);
                    break;

                case '/result': initResult(router); break;
                case '/premium': initPremiumData(router); break;

                case '/paywall':
                    if (!state.get('userData')) return router.navigate('/');

                    // Verified Premium Data (S4 -> Paywall)
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: 'premium_data_confirmed',
                            event_id: 'pdc_' + Date.now(),
                            email: state.get('email') || ''
                        });
                    }
                    initPaywall(router);
                    break;

                case '/success':
                    // 🔥 CLEAN PURCHASE LOGIC:
                    // Ми більше не запускаємо trackPurchase тут.
                    // Модуль initSuccess сам перевірить оплату через бекенд 
                    // і вистрілить подією purchase ОДИН РАЗ.
                    initSuccess(router);
                    break;

                case '/generation': if (!state.get('isPaid')) return router.navigate('/paywall'); initGeneration(router); break;

                case '/report':
                case '/premium-result':
                    if (!state.get('isPaid')) return router.navigate('/paywall');
                    warmUpBackend();
                    initPremiumResult(router);
                    break;

                default: initWelcome(router);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', bootstrap);