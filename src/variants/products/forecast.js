/**
 * 🔮 FORECAST - Самостійний продукт "Персональний Прогноз на Рік"
 * URL: /forecast
 * Продукт: Стратегічний астрологічний прогноз на 12 місяців (9 секцій)
 */
export const forecastConfig = {
    id: 'forecast',
    type: 'product',
    enabled: true,
    skipMetaTracking: true,
    productType: 'forecast', // Ключ для вибору промптів на API
    productName: 'Forecast Year Full Report', // Назва для платіжної системи та емейлів

    ui: {
        heroTitle: `
            <span style="display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent-color); margin-bottom: 12px; line-height: 1.4; opacity: 0.8; white-space: nowrap;">АСТРОЛОГІЧНИЙ ПРОГНОЗ НА РІК</span>
            Отримай свій персональний прогноз на наступні<br>12 місяців
            <span style="display: block; font-size: 12px; font-weight: 400; color: var(--secondary-text-color); margin-top: 10px; opacity: 0.7; letter-spacing: 0.3px;">Розрахунок на основі персональної Натальної карти</span>
        `,

        buttonText: 'Отримати Прогноз негайно',
        buttonDisclaimer: "Персональний розрахунок на основі Натальної карти за точними Ефемеридами",

        // Текст ПЕРЕД формою — вертикальний список переваг
        heroSubtitle: `
            <span style="display: block; margin-bottom: 15px; font-weight: 500; font-size: 1.1em; color: var(--secondary-text-color);">Введи дату народження та отримай стратегічний план на наступні 12 місяців</span>
            <div style="text-align: left; display: inline-block; margin: 0 auto; line-height: 1.6; font-size: 1em; color: var(--primary-text-color);">
                <div style="margin-bottom: 8px;">🦁 <span style="font-weight: 600;">Код Твого Року</span></div>
                <div style="margin-bottom: 8px;">🪐 <span style="font-weight: 600;">Головний Виклик</span></div>
                <div style="margin-bottom: 8px;">🚀 <span style="font-weight: 600;">Зона Успіху</span></div>
                <div style="margin-bottom: 8px;">❤️ <span style="font-weight: 600;">Любов та Люди Року</span></div>
                <div>👑 <span style="font-weight: 600;">Місяць Сили та Сезонна Стратегія</span></div>
            </div>
        `,

        // Іконка: Компас часу ⏳
        heroIcon: `
            <svg class="w-16 h-16 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: var(--accent-color);">
                <circle cx="32" cy="32" r="2.5" fill="currentColor" />
                <path d="M52 32C52 43.0457 43.0457 52 32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32Z" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.3" />
                <path d="M46.8564 32C46.8564 39.098 40.098 44.8564 32 44.8564C23.902 44.8564 17.1436 39.098 17.1436 32C17.1436 24.902 23.902 19.1436 32 19.1436C40.098 19.1436 46.8564 24.902 46.8564 32Z" stroke="currentColor" stroke-width="2.5" />
            </svg>
        `,

        // --- 🎭 CUSTOM LOADING STEPS ---
        loading: {
            steps: [
                { text: "✨ Визначаю положення Сатурна та Юпітера...", pause: 3000 },
                { text: "🪐 Аналізую транзити вищих планет...", pause: 1500 },
                { text: "🔮 Сканую Кармічні Вузли (Раху та Кету)...", pause: 1500 },
                { text: "🐍 Обчислюю вплив Ліліт на наступні 12 місяців...", pause: 1500 },
                { text: "⚡️ Шукаю вікна можливостей та зони ризику...", pause: 1500 },
                { text: "❤️ Аналізую транзити Венери для сфери кохання...", pause: 1500 },
                { text: "💎 Визначаю фінансові перспективи року...", pause: 1500 },
                { text: "🧬 Розраховую енергетичні цикли твого тіла...", pause: 1500 },
                { text: "👑 Визначаю твій Місяць Сили...", pause: 1500 },
                { text: "🦁 Формую Код Твого Року...", pause: 1500 },
                { text: "📜 Складаю Стратегічну Карту на 12 місяців...", pause: 2000 },
                {
                    text: "🌟 Твій прогноз майже готовий. Зірки вишиковуються в особливий порядок саме для тебе. Зачекай ще мить — це того варте.",
                    pause: 0,
                    isDelayMessage: true
                }
            ]
        },

        // --- 📊 CUSTOM RESULTS PAGE ---
        results: {
            title: "Попередній аналіз майбутнього",
            marketingHook: `Це лише <span style="color: var(--accent-color); font-weight: bold;">поверхневий огляд</span> того, що тебе чекає...<br><span style="color: var(--secondary-text-color); font-size: 0.95rem;">Отримай повну стратегічну карту на 12 місяців:</span>`,
            features: [
                { icon: "🦁", text: "<strong>Код Року</strong> (Архетип, Тотем, Слоган)" },
                { icon: "🪐", text: "<strong>Головний Виклик</strong> (Де твій екзамен?)" },
                { icon: "🚀", text: "<strong>Зона Успіху</strong> (Де діяти сміливо?)" },
                { icon: "❤️", text: "<strong>Люди Року</strong> (Союзник vs Токсичний)" },
                { icon: "👑", text: "<strong>Місяць Сили</strong> (Коли діяти?)" }
            ],
            buttonText: "Відкрити повний Прогноз"
        },

        // --- 💎 CUSTOM PREMIUM PAGE ---
        premium: {
            title: "Отримати повний Прогноз на рік",
            subtitle: "Введи точний час свого народження для максимальної точності прогнозу:",
            features: [
                { icon: "🦁", text: "<strong>Код Року</strong> (Архетип, Тотем, Слоган)" },
                { icon: "🪐", text: "<strong>Головний Виклик</strong> (Сатурн)" },
                { icon: "🚀", text: "<strong>Зона Успіху</strong> (Юпітер)" },
                { icon: "❤️", text: "<strong>Любов та Люди Року</strong>" },
                { icon: "💎", text: "<strong>Імперія та Ресурси</strong> (Фінанси)" },
                { icon: "🧬", text: "<strong>Біохакінг та Енергія</strong>" },
                { icon: "🦋", text: "<strong>Метаморфоза</strong> (Плутон/Уран)" },
                { icon: "🐍", text: "<strong>Тінь Року</strong> (Ліліт)" },
                { icon: "👑", text: "<strong>Місяць Сили та Сезони</strong>" }
            ],
            buttonText: "Розкрити всі деталі"
        },

        // --- 🔒 CUSTOM PAYWALL PAGE ---
        paywall: {
            title: "Твій Стратегічний Прогноз готовий",
            description: "Ми проаналізували транзити Сатурна, Юпітера та Ліліт. <br><strong class=\"text-white\">Розблокуй повну навігаційну карту</strong>, щоб знати, коли діяти, а коли чекати.",
            features: [
                {
                    icon: "🦁",
                    title: "Код Твого Року",
                    text: "Архетип, Тотем і Слоган — твій особистий маніфест на рік.",
                    popupTitle: "Код Року",
                    popupText: "Ти отримаєш унікальну метафору свого року: Архетип (хто ти цього року), Тотем (твій символ сили) та Слоган (головна фраза-мотиватор). Це твій компас для прийняття рішень."
                },
                {
                    icon: "🪐",
                    title: "Виклик та Зона Успіху",
                    text: "Де твій головний екзамен (Сатурн) і де попутний вітер (Юпітер).",
                    popupTitle: "Сатурн + Юпітер",
                    popupText: "Сатурн покаже, в якій сфері тобі доведеться пройти випробування та побудувати фундамент. Юпітер — де тобі пощастить і де варто діяти масштабно та сміливо."
                },
                {
                    icon: "❤️",
                    title: "Любов та Люди Року",
                    text: "Хто твій Союзник, а хто Токсичний Типаж цього року?",
                    popupTitle: "Люди Року",
                    popupText: "Ми визначимо, яких людей тобі варто шукати як партнерів та менторів, і від яких типажів триматися подалі. Плюс аналіз романтичних перспектив року."
                },
                {
                    icon: "🧬",
                    title: "Біохакінг та Енергія",
                    text: "Коли будуть спади енергії? Який спорт тобі підходить?",
                    popupTitle: "Здоров'я та Ресурс",
                    popupText: "Ти дізнаєшся свої енергетичні цикли на рік: коли заряджатися, а коли відпочивати. Ми підберемо оптимальний вид фізичної активності та дамо пораду, як не вигоріти."
                },
                {
                    icon: "👑",
                    title: "Місяць Сили та 4 Сезони",
                    text: "Твій найкращий місяць і стратегія на кожен сезон.",
                    popupTitle: "Grand Strategy",
                    popupText: "Ми визначимо ОДИН найпотужніший місяць року та дамо чіткий навігатор по 4 сезонах: Зима, Весна, Літо, Осінь. Плюс 'Техніка Безпеки': коли точно НЕ ризикувати (ретрогради, затемнення)."
                }
            ],
            buttonText: "Отримати повний Прогноз"
        },

        // --- ✅ CUSTOM SUCCESS PAGE ---
        success: {
            description: "Твій стратегічний прогноз готовий до відправки. Вкажи email на який надіслати:",
            buttonText: "Надіслати мені Прогноз"
        },

        // --- ⏳ CUSTOM GENERATION SCREEN ---
        generation: {
            steps: [
                { text: "✨ Визначаю положення Сатурна та Юпітера...", pause: 1500 },
                { text: "🪐 Аналізую транзити вищих планет...", pause: 1500 },
                { text: "🔮 Сканую Кармічні Вузли...", pause: 1500 },
                { text: "🐍 Обчислюю вплив Ліліт...", pause: 1500 },
                { text: "⚡️ Шукаю вікна можливостей та зони ризику...", pause: 1500 },
                { text: "❤️ Аналізую транзити Венери...", pause: 1500 },
                { text: "💎 Визначаю фінансові перспективи...", pause: 1500 },
                { text: "🧬 Розраховую енергетичні цикли...", pause: 1500 },
                { text: "👑 Визначаю твій Місяць Сили...", pause: 1500 },
                { text: "🦁 Формую Код Твого Року...", pause: 1500 },
                { text: "📜 Фіналізація Стратегічної Карти...", pause: 2000 },
                {
                    text: "🌟 З твоїм прогнозом все гаразд, зірки вибудовуються у потрібний порядок. Звіт вже летить тобі на пошту, і зараз відкриється тут.",
                    pause: 0,
                    isDelayMessage: true
                }
            ]
        }
    },

    // 🔥 PRICE: 347 UAH
    pricing: {
        display: {
            FULL_REPORT: 347,
            FULL_REPORT_OLD: 997, // Закреслена ціна
            // Upsell: Partner Match
            FORECAST_UPSELL: 199,
            FORECAST_OLD: 572
        },
        charge: {
            FULL_REPORT: 347,
            FORECAST_UPSELL: 199
        }
    },

    aiContext: {
        productType: 'forecast'
    },

    tracking: {
        campaignName: 'forecast_year',
        customPixelEvent: 'ViewContent_Forecast'
    }
};
