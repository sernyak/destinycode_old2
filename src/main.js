/**
 * DESTINY CODE MAIN ENTRY POINT (v2.0 Monobank - Direct Success Mode)
 * Логіка перевірки оплати перенесена в stage-6-success для безшовного UX.
 */

import './styles/main.css'; 

import { state } from './utils/state.js';
import { router } from './utils/router.js';
import { warmUpBackend } from './services/api.service.js';

// MODULES
import { init as initWelcome } from './modules/stage-1-welcome/index.js';
import { init as initLoading } from './modules/stage-2-loading/index.js';
import { init as initResult } from './modules/stage-3-result/index.js';
import { init as initPremiumData } from './modules/stage-4-premium/index.js';
import { init as initPaywall } from './modules/stage-5-paywall/index.js';
import { init as initSuccess } from './modules/stage-6-success/index.js';
import { init as initGeneration } from './modules/stage-7-generation/index.js';
import { init as initPremiumResult } from './modules/stage-8-premium-result/index.js';

/**
 * 🚀 APP BOOTSTRAP
 */
async function bootstrap() {
    console.log("DC_ v2.0 Starting (Direct Success Mode)...");

    // Ініціалізація роутера
    router.init({
        onRoute: async (route) => {
            console.log(`Route: ${route}`);
            
            // Перевірка на наявність 'orderRef' в URL
            // Це наш "квиток" для входу на сторінку успіху після редіректу з банку
            const params = new URLSearchParams(window.location.search);
            const hasOrderRef = params.has('orderRef');

            // --- STAGE MAPPING ---
            switch (route) {
                case '/':
                    initWelcome(router);
                    break;
                case '/loading':
                    initLoading(router);
                    break;
                case '/result':
                    initResult(router);
                    break;
                case '/premium':
                    initPremiumData(router);
                    break;
                case '/paywall':
                    if (!state.get('userData')) { router.navigate('/'); return; }
                    initPaywall(router);
                    break;
                
                // 🔥 SUCCESS ROUTE (SMART LOGIC)
                case '/success':
                    // Ми пускаємо сюди, якщо:
                    // 1. Користувач вже має 'isPaid' = true (купив раніше і ходить по сайту)
                    // 2. АБО користувач прийшов з банку (має orderRef в URL)
                    //    В такому випадку stage-6 сам перевірить валідність orderRef.
                    if (state.get('isPaid') || hasOrderRef) {
                        initSuccess(router);
                    } else {
                        // Якщо немає ні оплати, ні чека — це "заєць", кидаємо на оплату
                        router.navigate('/paywall'); 
                    }
                    break;

                case '/generation':
                    if (!state.get('isPaid')) { router.navigate('/paywall'); return; }
                    initGeneration(router);
                    break;
                case '/report': 
                case '/premium-result':
                    if (!state.get('isPaid')) { router.navigate('/paywall'); return; }
                    warmUpBackend();
                    initPremiumResult(router);
                    break;
                default:
                    // Будь-який невідомий маршрут веде на старт
                    initWelcome(router);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', bootstrap);