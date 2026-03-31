/**
 * 🧑‍🤝‍🧑 PARTNER MATCH - Варіант для продажу аналізу ідеального партнера
 * URL: /man
 * Продукт: Астрологічний портрет ідеального чоловіка/партнера
 */
export const partnerConfig = {
    id: 'man',
    type: 'product',
    enabled: true,
    productType: 'partner', // Ключ для вибору промптів на API
    productName: 'Partner Match Full Report', // Назва для платіжної системи та емейлів

    ui: {
        heroTitle: `
            <span style="display: block; font-size: 0.6em; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 5px;">Знайди свого</span>
            <span style="display: block; white-space: nowrap; font-size: clamp(18px, 6.5vw, 32px); letter-spacing: -0.5px;">ІДЕАЛЬНОГО ПАРТНЕРА</span>
            <span id="hero-subtitle-cta" class="relative text-sm font-medium opacity-90 border border-white/20 rounded-lg px-3 py-0.5 inline-block mt-2 cursor-pointer hover:bg-white/5 transition-colors" style="text-transform: none; letter-spacing: 0;">Отримай інструкцію до свого кохання</span>
        `,

        buttonText: 'Отримати інструкцію',
        buttonDisclaimer: "Персональний розрахунок на основі Натальної карти за точними Ефемеридами",

        // Текст ПЕРЕД формою — вертикальний список
        heroSubtitle: `
            <span style="display: block; margin-bottom: 15px; font-weight: 500; font-size: 1.1em; color: var(--secondary-text-color);">
                <span style="display: block; margin-bottom: 12px; color: var(--primary-text-color); font-weight: 600; font-size: 1.05em; line-height: 1.4;">
                    Дізнайся, чому ти притягуєш "не тих чоловіків" — і як зламати цей сценарій назавжди
                </span>
                Введи дату свого народження і отримай детальну інструкцію для пошуку свого ідеального партнера, який підходить саме тобі
                <span style="display: block; font-size: 11px; color: var(--accent-color); opacity: 0.9; margin-top: 2px; line-height: 1.25; font-weight: 400; letter-spacing: -0.2px;">
                    розрахунок на основі твоєї натальної карти за даними народження
                </span>
            </span>
        `,

        // Текст ПІСЛЯ форми (булети)
        heroFeatures: `
            <div style="text-align: left; display: inline-block; margin: 20px auto 0; line-height: 1.6; font-size: 1em; color: var(--primary-text-color);">
                <div style="margin-bottom: 8px;">🎭 <span style="font-weight: 600;">Його психологічний портрет</span></div>
                <div style="margin-bottom: 8px;">🔗 <span style="font-weight: 600;">Чому йому потрібна саме ти</span></div>
                <div style="margin-bottom: 8px;">📍 <span style="font-weight: 600;">Ймовірні обставини зустрічі</span></div>
                <div style="margin-bottom: 8px;">💄 <span style="font-weight: 600;">Секрети зваблення саме Його</span></div>
                <div>💞 <span style="font-weight: 600;">Побудова гармонійних стосунків</span></div>
            </div>
        `,

        // Іконка: Венера ♀ та Марс ♂
        heroIcon: `
            <svg viewBox="0 0 80 64" class="w-20 h-16 mx-auto" style="color: var(--accent-color);">
                <!-- Венера ♀ (ліворуч) -->
                <g transform="translate(10, 6)">
                    <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.9"/>
                    <line x1="14" y1="25" x2="14" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
                    <line x1="7" y1="33" x2="21" y2="33" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
                </g>
                <!-- Марс ♂ (праворуч) -->
                <g transform="translate(42, 8)">
                    <circle cx="14" cy="18" r="11" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.9"/>
                    <line x1="22" y1="10" x2="30" y2="2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
                    <line x1="24" y1="2" x2="30" y2="2" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
                    <line x1="30" y1="2" x2="30" y2="8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
                </g>
            </svg>
        `,

        // --- 🎭 CUSTOM LOADING STEPS ---
        loading: {
            steps: [
                { text: "✨ Аналізую твій 7-й дім (Дім Стосунків)...", pause: 3000 },
                { text: "❤️‍🔥 Сканую положення Венери та Марса...", pause: 1500 },
                { text: "⚡️ Розраховую аспекти пристрасті та сумісності...", pause: 1500 },
                { text: "🗝 Визначаю ключ до серця твого ідеального партнера...", pause: 1500 },
                { text: "📍 Шукаю місце та обставини вашої зустрічі...", pause: 1500 },
                { text: "⏳ Обчислюю найкращі дати для знайомства...", pause: 1500 },
                { text: "📜 Складаю психологічний портрет твого майбутнього чоловіка...", pause: 1500 },
                { text: "🧘‍♀️ Майже готово, Всесвіт розкриває твої таємниці кохання...", pause: 1500 },
                { text: "🦋 Твоя доля вже поруч, залишилось зовсім трохи...", pause: 1500 },
                { text: "✨ Додаю магію зірок у твій звіт...", pause: 1500 },
                { text: "💍 Фіналізую Астро-Портрет тового Ідеального Партнера...", pause: 2000 },
                {
                    text: "🌹 З твоїм звітом все гаразд, просто Всесвіт перевіряє ще одну деталь про твого суженого. Будь ласка, зачекай ще трохи. Опис відкриється за декілька секунд.",
                    pause: 0,
                    isDelayMessage: true
                }
            ]
        },

        // --- 📊 CUSTOM RESULTS PAGE ---
        results: {
            title: "Твоя любовна інструкція",
            marketingHook: `Це лише <span style="color: var(--accent-color); font-weight: bold;">8%</span> інформації про твої стосунки та кохання...<br><span style="color: var(--secondary-text-color); font-size: 0.95rem;">Дізнайся все про свого майбутнього обранця:</span>`,
            features: [
                { icon: "🎭", text: "<strong>Психологічний Портрет</strong> (Який він?)" },
                { icon: "📍", text: "<strong>Місце Зустрічі</strong> (Де його шукати?)" },
                { icon: "⏳", text: "<strong>Час Зустрічі</strong> (Коли це станеться?)" },
                { icon: "🔗", text: "<strong>Кармічна Сумісність</strong> (Для чого ви?)" },
                { icon: "💄", text: "<strong>Секрети Зваблення</strong> (Як закохати?)" }
            ],
            buttonText: "Відкрити портрет партнера"
        },

        // --- 💎 CUSTOM PREMIUM PAGE ---
        premium: {
            title: "Отримати повний Опис ідеального партнера",
            subtitle: "Введи точний час свого народження для розрахунку обставин вашої зустрічі:",
            features: [
                { icon: "🎭", text: "<strong>Психологічний Портрет</strong> (Який він?)" },
                { icon: "📍", text: "<strong>Місце Зустрічі</strong> (Де його шукати?)" },
                { icon: "⏳", text: "<strong>Час Зустрічі</strong> (Коли це станеться?)" },
                { icon: "🔗", text: "<strong>Кармічна Сумісність</strong> (Для чого ви?)" },
                { icon: "💄", text: "<strong>Секрети Зваблення</strong> (Як закохати?)" }
            ],
            buttonText: "Розкрити всі деталі"
        },

        // --- 🔒 CUSTOM PAYWALL PAGE ---
        paywall: {
            title: "Портрет твого Ідеального Партнера готовий",
            description: "Ми проаналізували твій 7-й дім, Марс та Венеру. <br><strong class=\"text-white\">Дізнайся, чому ти притягуєш \"не тих чоловіків\"</strong> — і як зламати цей сценарій назавжди.",
            features: [
                {
                    icon: "🎭",
                    title: "Хто він насправді?",
                    text: "Повний психологічний портрет. Його характер, професія, 'темні' сторони.",
                    popupTitle: "Психологічний Портрет",
                    popupText: "Ти дізнаєшся не просто 'знак зодіаку', а детальний опис його особистості. Як він поводиться в конфліктах? Як проявляє любов? Які жінки його приваблюють?"
                },
                {
                    icon: "📍",
                    title: "Ймовірне місце зустрічі",
                    text: "Конкретні місця та обставини зустрічі з твоїм майбутнім чоловіком.",
                    popupTitle: "Місце Зустрічі",
                    popupText: "Астрологія (Управитель 7-го дому) вказує на конкретні декорації вашої зустрічі. Чи це робота? Подорож? Чи, можливо, інтернет? Ми дамо 3 найімовірніші сценарії."
                },
                {
                    icon: "⏳",
                    title: "Терміни та Знаки",
                    text: "Коли чекати змін у особистому житті? Періоди удачі.",
                    popupTitle: "Час та Знаки Долі",
                    popupText: "Ми проаналізуємо транзити планет на найближчий рік і підсвітимо періоди, коли ймовірність зустрічі найвища. Ти також отримаєш 'знаки', які підкажуть, що ВІН поруч."
                },
                {
                    icon: "❤️‍🔥",
                    title: "Секс та Сумісність",
                    text: "Що його збуджує і яка жінка йому потрібна в ліжку.",
                    popupTitle: "Сексуальна Сумісність",
                    popupText: "Розбір його Марса та Венери. Ти дізнаєшся про його приховані фантазії та потреби, про які він може ніколи не сказати вголос."
                },
                {
                    icon: "🔑",
                    title: "Ключ до його серця",
                    text: "Стратегія зваблення. Як стати для нього єдиною.",
                    popupTitle: "Стратегія Завоювання",
                    popupText: "Як поводитись на першому побаченні? Чого він боїться? Що шукає в дружині? Це твоя інструкція до його серця."
                }
            ],
            buttonText: "Отримати його портрет"
        },
        // --- ✅ CUSTOM SUCCESS PAGE ---
        success: {
            description: "Портрет твого ідеального партнера готовий до відправки. Вкажи email на який надіслати:",
            buttonText: "Надіслати мені його портрет"
        },

        // --- ⏳ CUSTOM GENERATION SCREEN ---
        generation: {
            steps: [
                { text: "✨ Аналізую твій 7-й дім (Дім Стосунків)...", pause: 1500 },
                { text: "❤️‍🔥 Сканую положення Венери та Марса...", pause: 1500 },
                { text: "⚡️ Розраховую аспекти пристрасті та сумісності...", pause: 1500 },
                { text: "🗝 Визначаю ключ до серця твого ідеального партнера...", pause: 1500 },
                { text: "📍 Шукаю місце та обставини вашої зустрічі...", pause: 1500 },
                { text: "⏳ Обчислюю найкращі дати для знайомства...", pause: 1500 },
                { text: "📜 Складаю психологічний портрет твого майбутнього чоловіка...", pause: 1500 },
                { text: "🧘‍♀️ Майже готово, Всесвіт розкриває таємниці кохання...", pause: 1500 },
                { text: "🦋 Твоя доля вже поруч, залишилось зовсім трохи...", pause: 1500 },
                { text: "✨ Додаю магію зірок у твій звіт...", pause: 1500 },
                { text: "💍 Фіналізація Астро-Портрета Ідеального Партнера...", pause: 2000 },
                {
                    text: "🌹 З твоїм звітом все гаразд, просто Всесвіт перевіряє ще одну деталь про твого суженого. Звіт вже летить тобі на пошту, і зараз відкриється тут.",
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
            FULL_REPORT_OLD: 997 // Закреслена ціна
        },
        charge: {
            FULL_REPORT: 347
        }
    },

    aiContext: {
        productType: 'partner'
    },

    tracking: {
        campaignName: 'partner_match'
        // customPixelEvent removed per user request (Standard Analytics Only)
    }
};
