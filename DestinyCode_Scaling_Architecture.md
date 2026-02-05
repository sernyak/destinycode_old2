🚀 Технічна Специфікація: Destiny Code Scaling v2.0Архітектура: Smart Routing & Config-Driven UI1. Бізнес-КонтекстМета: Запуск 16+ унікальних рекламних кампаній (12 місяців + 4 болі) без дублювання коду.Вимога: Користувач заходить на destinycode.online/february, бачить унікальний заголовок, а технічно це той самий index.html.Стек: Vite + Vanilla JS + Firebase Hosting (Поточний стек). Без переходу на React/Next.js.2. Суть Архітектури (Smart Routing)Ми використовуємо Client-Side Routing поверх існуючого SPA.Firebase Rewrites: Всі запити (наприклад, /february, /love) сервер перенаправляє на єдиний index.html.JS Router: При старті main.js перевіряє URL.Config Loader: Якщо URL відповідає відомому варіанту (наприклад, february), завантажується відповідний config.js об'єкт.Dynamic Injection: Тексти, картинки та логіка промптів підміняються "на льоту" ще до того, як користувач побачить екран.3. Структура Файлів (Оновлена)Ми додаємо папку variants для зберігання налаштувань.src/
├── config.js              # Глобальні налаштування (API, ціни)
├── main.js                # Точка входу (оновлюється логіка старту)
├── utils/
│   └── router.js          # ОНОВЛЕНИЙ: Підтримка віртуальних шляхів
├── variants/              # 🔥 НОВА ПАПКА
│   ├── index.js           # Реєстр усіх варіантів
│   ├── months/
│   │   ├── february.js    # Конфіг для Лютого
│   │   ├── january.js
│   │   └── ...
│   └── pains/
│       ├── love.js        # Конфіг для "Кохання"
│       └── money.js
└── modules/               # Існуючі модулі (Welcome, Result...)
4. Реалізація КодуА. Конфігурація Варіанту (src/variants/months/february.js)Всі тексти, стилі та специфічні дані для ШІ живуть тут.export const februaryConfig = {
    id: 'february',
    type: 'month',
    
    // UI Override: Що бачить юзер
    ui: {
        heroTitle: "Народився у Лютому? ❄️",
        heroSubtitle: "Дізнайся, що приготували зірки для Стрільців та Козерогів у 2026 році.",
        buttonText: "Отримати прогноз для Лютого",
        // Можна навіть задавати дефолтну дату в календарі
        defaultDate: '1990-12-15' 
    },

    // AI Context: Що ми додаємо в промпт
    aiContext: {
        additionalPrompt: "Контекст користувача: Народжений у лютому. Згадай про перехід Сонця в знак Козерога та енергію зими.",
        focusAreas: ['career', 'discipline']
    },

    // Tracking: Мітки для аналітики
    tracking: {
        campaignName: 'horoscope_february_2026',
        customPixelEvent: 'ViewContent_February'
    }
};
B. Реєстр Варіантів (src/variants/index.js)import { februaryConfig } from './months/february.js';
// import { januaryConfig } ...

export const VARIANTS = {
    'february': februaryConfig,
    // 'january': januaryConfig,
    // 'find-love': loveConfig
};

export function getVariantByUrl() {
    // Отримуємо "february" з "/february"
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    return VARIANTS[path] || null;
}
C. Оновлений src/utils/router.js (Smart Routing Logic)import { VARIANTS, getVariantByUrl } from '../variants/index.js';
import { state } from './state.js';

class Router {
    constructor() {
        this.routes = {};
        this.currentVariant = null;
    }

    init(routesConfig) {
        this.routes = routesConfig.onRoute;
        
        // 1. Визначаємо варіант
        const variant = getVariantByUrl();
        
        if (variant) {
            console.log(`🚀 Active Variant: ${variant.id}`);
            this.currentVariant = variant;
            
            // Зберігаємо в State, щоб дані були доступні всюди (в payment, api services)
            state.set('currentVariant', variant);
            
            // 🔥 Трекінг PageView для конкретного варіанту
            this.trackVariantView(variant);
        } else {
            // Якщо це просто головна або невідомий шлях
            console.log("🌍 Default Generic Flow");
        }

        // 2. Обробка навігації (History API)
        window.addEventListener('popstate', () => this.handleLocation());
        this.handleLocation();
    }

    async handleLocation() {
        // Якщо ми на віртуальному шляху (напр. /february), 
        // для внутрішнього роутера це все одно Stage 1 (Welcome)
        
        const path = window.location.pathname;
        const variant = this.currentVariant;

        // Логіка: Якщо ми на корені варіанту -> показуємо Welcome Screen
        if (variant && (path === `/${variant.id}` || path === `/${variant.id}/`)) {
             await this.routes('/'); // Завантажуємо Welcome модуль
             return;
        }

        // Стандартна логіка для /loading, /result і т.д.
        await this.routes(path);
    }
    
    trackVariantView(variant) {
        if(window.fbq) {
            window.fbq('track', 'ViewContent', {
                content_name: variant.id,
                content_category: variant.type
            });
        }
    }
}

export const router = new Router();
D. Ін'єкція в src/modules/stage-1-welcome/index.jsЗамість хардкоду в HTML, ми підставляємо дані з конфіга.import html from './view.html?raw';
import { state } from '../../utils/state.js';

export function init(router) {
    const app = document.getElementById('app');
    app.innerHTML = html;

    // --- 🔥 DYNAMIC CONTENT INJECTION ---
    const variant = state.get('currentVariant');

    if (variant && variant.ui) {
        // Знаходимо елементи і замінюємо текст
        const titleEl = document.querySelector('h2'); 
        const subtitleEl = document.querySelector('p.text-lg');
        const btnEl = document.querySelector('#birth-form-btn .btn-text');
        
        if (titleEl && variant.ui.heroTitle) titleEl.innerHTML = variant.ui.heroTitle;
        if (subtitleEl && variant.ui.heroSubtitle) subtitleEl.innerHTML = variant.ui.heroSubtitle;
        if (btnEl && variant.ui.buttonText) btnEl.innerText = variant.ui.buttonText;

        // Встановлення дефолтної дати
        if (variant.ui.defaultDate) {
             const dateInput = document.getElementById('birth-date');
             // Логіка встановлення дати...
        }
    }
    // ... решта коду форми
}
5. Налаштування Firebase (firebase.json)Це критично важливо. Ми кажемо серверу: "Що б не ввів користувач, віддавай index.html, а JS розбереться".{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
6. Переваги цього підходуШвидкість впровадження: Розробник впорається за 2-3 дні. Не треба переписувати проект.Повний контроль: Маркетолог може просити змінити заголовок для "Лютого", і це робиться в одному файлі (february.js), не чіпаючи логіку ядра.Точний Трекінг: Facebook бачить реальні URL (destinycode.online/february), що дозволяє налаштувати ідеальні Custom Conversions.AI Персоналізація: api.service.js тепер може читати state.get('currentVariant') і додавати aiContext до запиту на бекенд. Це дасть більш точні гороскопи.7. План для Розробника (Checklist)[ ] Оновити firebase.json (додати rewrites).[ ] Створити папку src/variants та додати тестовий конфіг february.js.[ ] Модифікувати src/utils/router.js для перехоплення URL та завантаження конфігу.[ ] Оновити src/modules/stage-1-welcome/index.js для підстановки текстів із state.[ ] Оновити src/services/api.service.js — додавати контекст варіанту у запит до AI.[ ] Деплой на Staging та тест посилання /february.