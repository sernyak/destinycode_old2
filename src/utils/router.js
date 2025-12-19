/**
 * router.js
 * Відповідає за перемикання між модулями (Stages)
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentStage = null;
        this.appContainer = document.getElementById('app');
    }

    /**
     * Реєстрація модуля
     * @param {string} path - назва шляху (напр. 'welcome')
     * @param {function} initFunction - функція init з модуля
     */
    register(path, initFunction) {
        this.routes[path] = initFunction;
    }

    /**
     * Перехід на інший екран
     * @param {string} path 
     * @param {object} params - дані, які треба передати на наступний екран
     */
    navigateTo(path, params = {}) {
        if (!this.routes[path]) {
            console.error(`Маршрут "${path}" не знайдено.`);
            // Fallback: якщо маршрут не знайдено, йдемо на welcome
            if (path !== 'welcome') {
                console.warn('Redirecting to welcome screen...');
                this.navigateTo('welcome');
            }
            return;
        }

        console.log(`Navigating to: ${path}`);
        
        // Очищення контейнера перед рендером
        if (this.appContainer) {
            this.appContainer.innerHTML = '';
            // Виклик функції ініціалізації модуля
            try {
                this.routes[path](this, params);
                this.currentStage = path;
                // Scroll to top on navigation
                window.scrollTo(0, 0);
            } catch (error) {
                console.error(`Error initializing stage "${path}":`, error);
                this.appContainer.innerHTML = `<div class="p-4 text-center text-red-500">Сталася помилка при завантаженні екрану. Будь ласка, оновіть сторінку.</div>`;
            }
        } else {
            console.error('CRITICAL: App container #app not found in DOM!');
        }
    }
}

export const router = new Router();