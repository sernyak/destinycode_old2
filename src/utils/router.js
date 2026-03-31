/**
 * router.js
 * Відповідає за перемикання між модулями (Stages)
 */
import { StarryBackground } from './StarryBackground.js';
import { VARIANTS, getVariantByUrl } from '../variants/index.js';
import { state } from './state.js';
import { Logger } from './logger.js';

class Router {
    constructor() {
        this.onRoute = null; // Callback функція з main.js
        this.currentVariant = null;
    }

    /**
     * 🔥 FIX: Додано метод init, який викликається в main.js
     * @param {Object} config - конфігурація { onRoute: async (path) => { ... } }
     */
    init(config) {
        if (!config || typeof config.onRoute !== 'function') {
            Logger.error('Router init failed: config.onRoute is missing');
            return;
        }

        this.onRoute = config.onRoute;

        // 1. Detect Variant based on URL
        const variant = getVariantByUrl();
        if (variant) {
            Logger.log(`🚀 Active Variant: ${variant.id}`);
            this.currentVariant = variant;

            // Store globally so other modules (API, UI) can access it
            state.set('currentVariant', variant);

            // Track View
            this.trackVariantView(variant);
        }

        // Слухаємо зміни історії браузера (кнопки назад/вперед)
        window.addEventListener('popstate', () => {
            // 🔥 FIX: Відновлюємо космічний фон при навігації назад/вперед
            StarryBackground.ensureRunning();
            this.handleLocation();
        });

        // Обробляємо початкову URL при завантаженні сторінки
        this.handleLocation();
    }

    /**
     * Визначає поточний шлях і викликає обробник
     */
    async handleLocation() {
        let path = window.location.pathname;

        // 🔥 SMART ROUTING LOGIC
        // If we are on a variant URL (e.g. /december), treat it as Stage 1 (Welcome)
        // effectively mapping "/december" -> "/" for internal routing
        if (this.currentVariant && (path === `/${this.currentVariant.id}` || path === `/${this.currentVariant.id}/`)) {
            Logger.log(`🔀 Rendering Variant Root as Welcome Screen`);
            path = '/';
        } else if (!this.currentVariant) {
            // Reset variant-specific styles if we are on global path
            document.body.style.backgroundColor = '';
        }

        if (this.onRoute) {
            await this.onRoute(path);
        }
    }

    /**
     * Метод для навігації (змінює URL і викликає обробку)
     * @param {string} path - новий шлях (може містити query parameters)
     */
    navigate(path) {
        window.history.pushState({}, "", path);
        this.handleLocation();
        window.scrollTo(0, 0); // Прокрутка наверх при переході
    }

    /**
     * Аліас для модулів. Додає слеш, якщо його забули.
     * @param {string} path - шлях (напр. 'loading' або '/loading')
     */
    navigateTo(path) {
        const fullPath = path.startsWith('/') ? path : `/${path}`;
        this.navigate(fullPath);
    }

    trackVariantView(variant) {
        if (window.fbq) {
            const trafficType = state.get('traffic_type');
            const skipTracking = variant?.skipMetaTracking || ['1uah', 'man1uah'].includes(variant?.id);
            
            if (trafficType !== 'paid' || skipTracking) {
                Logger.log(`🍃 [Analytics] Skip fbq ViewContent for Organic/Test traffic: ${variant.id}`);
                return;
            }

            Logger.log("📊 Tracking Variant View:", variant.id);
            window.fbq('track', 'ViewContent', {
                content_name: variant.id,
                content_category: variant.type
            });
        }
    }
}

export const router = new Router();