import './styles/main.css';
import { router } from './utils/router.js';
import { state } from './utils/state.js';
import { initGlobalModal } from './utils/modal.js';
import { verifyPaymentStatus } from './services/payment.service.js';

// Імпорт модулів
import { init as initWelcome } from './modules/stage-1-welcome/index.js';
import { init as initLoading } from './modules/stage-2-loading/index.js';
import { init as initResult } from './modules/stage-3-result/index.js';
import { init as initPremiumData } from './modules/stage-4-premium/index.js';
import { init as initPaywall } from './modules/stage-5-paywall/index.js';
import { init as initSuccess } from './modules/stage-6-success/index.js';
import { init as initGeneration } from './modules/stage-7-generation/index.js';
import { init as initPremiumResult } from './modules/stage-8-premium-result/index.js';

// Реєстрація маршрутів
router.register('welcome', initWelcome);
router.register('loading', initLoading);
router.register('result', initResult);
router.register('premium-data', initPremiumData);
router.register('paywall', initPaywall);
router.register('success', initSuccess);
router.register('generation', initGeneration);
router.register('premium-result', initPremiumResult);

document.addEventListener('DOMContentLoaded', async () => {
    initGlobalModal();

    // --- Session Restoration Logic (Browser Storage) ---
    const savedData = sessionStorage.getItem('destinyUser');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            // Відновлюємо ключові поля
            ['date', 'time', 'city', 'geo', 'email', 'planets', 'hasPaidUpsell', 'isPaid'].forEach(key => {
                if (parsed[key]) state.set(key, parsed[key]);
            });
            console.log('Session restored successfully from Storage');
        } catch (e) {
            console.error('Failed to restore session:', e);
        }
    }

    // --- URL PARAMETERS CHECK (Payment Return) ---
    const urlParams = new URLSearchParams(window.location.search);
    const verifyOrderRef = urlParams.get('verify_order'); 
    const upsellSource = urlParams.get('upsell_source');
    
    // СЦЕНАРІЙ 1: ПЕРЕВІРКА ПЛАТЕЖУ ЧЕРЕЗ API (Повернення з банку)
    if (verifyOrderRef) {
        console.log(`🔍 Verifying order via API: ${verifyOrderRef}`);

        try {
            const result = await verifyPaymentStatus(verifyOrderRef);
            console.log("Verification Result:", result);
            
            if (result.status === 'success') {
                console.log("✅ Payment Verified via API!");
                
                // 🔥 ФІКС ВІДНОВЛЕННЯ СЕСІЇ (SESSION RESTORE FROM DB)
                // Якщо користувача перекинуло в новий браузер (напр. з Instagram в Safari),
                // sessionStorage буде пустим. Ми беремо бекап даних з відповіді сервера.
                if (result.data && result.data.userData) {
                    console.log("🔄 Restoring lost session from Database...");
                    const restoredData = result.data.userData;
                    
                    // Відновлюємо всі поля (date, time, city, geo, planets...)
                    Object.keys(restoredData).forEach(key => {
                        if (restoredData[key]) {
                            state.set(key, restoredData[key]);
                        }
                    });
                }

                handleSuccessPayment(upsellSource);

            } else if (result.status === 'pending') {
                // 🔥 Також відновлюємо сесію для pending станів, щоб не втратити дані
                if (result.data && result.data.userData) {
                    console.log("🔄 Restoring session for pending order...");
                    const restoredData = result.data.userData;
                    Object.keys(restoredData).forEach(key => {
                        if (restoredData[key]) state.set(key, restoredData[key]);
                    });
                }

                // 🔥 UX FIX: Тихо пускаємо користувача ("Оптимістичний UI")
                console.log("⏳ Payment Pending. Proceeding optimistically.");
                handleSuccessPayment(upsellSource);

            } else {
                console.warn("❌ Payment Verification Failed:", result);
                handleFailedPayment(result.reason || "Транзакцію відхилено банком");
            }
        } catch (e) {
            console.error("Verification Connection Error", e);
            // Якщо зв'язок втрачено, але сесія жива - пробуємо пустити
            if (state.get('isPaid')) {
                router.navigateTo('success');
            } else {
                // Якщо сесії немає (новий браузер) - показуємо загальне повідомлення
                alert("Не вдалося перевірити статус платежу. Якщо кошти списано — вони повернуться автоматично протягом 10 хв.");
                router.navigateTo('paywall');
            }
        }
        return; 
    } 

    // СЦЕНАРІЙ 2: СТАНДАРТНИЙ ВХІД (Smart Routing)
    // 🔥 ВІДНОВЛЕНО: Логіка перенаправлення на правильний етап
    
    // 1. Якщо куплено апсел (максимальний рівень) -> Фінальний результат
    if (state.get('hasPaidUpsell')) {
        router.navigateTo('premium-result');
        return;
    }

    // 2. Якщо куплено основний продукт -> Успіх / Генерація
    if (state.get('isPaid')) {
        // Якщо юзер оновив сторінку на success, краще показати success, щоб він міг піти далі
        router.navigateTo('success');
        return;
    }

    // 3. Якщо є введені дані (дата народження) -> Результат (безкоштовний)
    // Це дозволяє не вводити дані заново при F5
    if (state.get('date')) {
        router.navigateTo('result');
        return;
    }

    // 4. Якщо нічого немає -> Welcome
    router.navigateTo('welcome');
});

// --- HELPER FUNCTIONS ---

function handleSuccessPayment(upsellSource) {
    // Чистимо URL від параметрів
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    if (upsellSource === 'stage8' || state.get('isPendingUpsellStage8')) {
        state.set('hasPaidUpsell', true);
        state.set('isPendingUpsellStage8', false); 
        router.navigateTo('premium-result');
    } 
    else {
        // Основна покупка
        state.set('isPaid', true);
        
        if (upsellSource === 'stage6') {
            const newUrl = `${window.location.pathname}?payment=success&upsell_source=stage6`;
            window.history.replaceState({}, document.title, newUrl);
        }

        router.navigateTo('success');
    }
}

function handleFailedPayment(reason) {
    window.history.replaceState({}, document.title, window.location.pathname);
    
    let readableReason = "Невідома помилка";
    try {
        if (reason) {
            readableReason = decodeURIComponent(reason).replace(/\+/g, ' ');
        }
    } catch (e) {
        readableReason = reason;
    }

    setTimeout(() => {
        // 🔥 UPDATE MESSAGE: Заспокоюємо користувача про повернення коштів
        alert(`⚠️ Оплата не пройшла або сталася помилка.\n\nБанк: "${readableReason}"\n\nЯкщо кошти було списано помилково, система автоматично поверне їх протягом 5-10 хвилин.`);
    }, 300);

    // 🔥 FIX: РОЗУМНИЙ РЕДІРЕКТ
    // Якщо юзерка вже купила основний продукт ('isPaid'), але впала на Апселі -> повертаємо на Success (Stage 6)
    if (state.get('isPaid')) {
        console.log("Redirecting back to Success (User has main product)");
        router.navigateTo('success');
    } else {
        // Якщо це була перша покупка і вона не пройшла -> повертаємо на Paywall (Stage 5)
        console.log("Redirecting back to Paywall (Main product not paid)");
        router.navigateTo('paywall');
    }
}