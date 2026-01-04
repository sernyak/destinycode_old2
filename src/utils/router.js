/**
 * router.js
 * Відповідає за перемикання між модулями (Stages)
 */

class Router {
    constructor() {
        this.onRoute = null; // Callback функція з main.js
    }

    /**
     * 🔥 FIX: Додано метод init, який викликається в main.js
     * @param {Object} config - конфігурація { onRoute: async (path) => { ... } }
     */
    init(config) {
        if (!config || typeof config.onRoute !== 'function') {
            console.error('Router init failed: config.onRoute is missing');
            return;
        }

        this.onRoute = config.onRoute;
        
        // Слухаємо зміни історії браузера (кнопки назад/вперед)
        window.addEventListener('popstate', () => this.handleLocation());
        
        // Обробляємо початкову URL при завантаженні сторінки
        this.handleLocation();
    }

    /**
     * Визначає поточний шлях і викликає обробник
     */
    async handleLocation() {
        const path = window.location.pathname;
        if (this.onRoute) {
            await this.onRoute(path);
        }
    }

    /**
     * Метод для навігації (змінює URL і викликає обробку)
     * @param {string} path - новий шлях
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
}

export const router = new Router();