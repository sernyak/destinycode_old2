import './styles/main.css';
import { router } from './utils/router.js';
import { state } from './utils/state.js';
import { initGlobalModal } from './utils/modal.js';

// Імпорт модулів
import { init as initWelcome } from './modules/stage-1-welcome/index.js';
import { init as initLoading } from './modules/stage-2-loading/index.js';
import { init as initResult } from './modules/stage-3-result/index.js';
import { init as initPremiumData } from './modules/stage-4-premium/index.js';
import { init as initPaywall } from './modules/stage-5-paywall/index.js';
// Видалено зайвий імпорт initProcessing, щоб відповідати моноліту
import { init as initSuccess } from './modules/stage-6-success/index.js';
import { init as initGeneration } from './modules/stage-7-generation/index.js';
import { init as initPremiumResult } from './modules/stage-8-premium-result/index.js';

// Реєстрація маршрутів
router.register('welcome', initWelcome);
router.register('loading', initLoading);
router.register('result', initResult);
router.register('premium-data', initPremiumData);
router.register('paywall', initPaywall);
// Видалено реєстрацію 'processing'
router.register('success', initSuccess);
router.register('generation', initGeneration);
router.register('premium-result', initPremiumResult);

document.addEventListener('DOMContentLoaded', () => {
    // Init Modals
    initGlobalModal();

    // --- Payment Recovery Logic ---
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    
    // Відновлення даних
    const savedData = sessionStorage.getItem('destinyUser');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            state.set('date', parsed.date);
            state.set('time', parsed.time);
            state.set('city', parsed.city);
            state.set('geo', parsed.geo);
            console.log('Session restored');
        } catch (e) {
            console.error('Failed to restore session:', e);
        }
    }

    if (paymentStatus === 'success') {
        window.history.replaceState({}, document.title, window.location.pathname);
        // Прямий редірект на Success, як у моноліті (без проміжного екрану)
        router.navigateTo('success');
    } else {
        router.navigateTo('welcome');
    }
});