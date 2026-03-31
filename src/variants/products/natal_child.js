/**
 * 👶 NATAL_CHILD - Варіант для розрахунку натальної карти для дитини
 * Цільова аудиторія: Мами з дітьми до 16 років.
 */
export const natalChildConfig = {
    id: 'natal_child',
    type: 'product',
    enabled: true,

    ui: {
        heroTitle: `<span style="display: block; font-size: 0.6em; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 5px;">ПЕРСОНАЛЬНА НАТАЛЬНА КАРТА</span>
ТВОЄЇ ДИТИНИ
<div style="font-size: 9px; opacity: 1; margin-top: -15px; margin-bottom: -4px; font-weight: 300; letter-spacing: 0.3px; color: var(--accent-color);">Персональний астрологічний розрахунок для твоєї дитини</div>
<span id="hero-subtitle-cta" class="relative text-base font-medium opacity-90 border border-white/20 rounded-lg px-3 py-1 inline-block cursor-pointer hover:bg-white/5 transition-colors" style="margin-bottom: -10px;">Твій ключ до розуміння власної дитини.</span>`,

        // 1. Текст ПЕРЕД формою - Змінено під ЦА "мами" та додано перемикач статі
        heroSubtitle: `
<div class="mb-4 text-[15px] leading-relaxed text-white/90">
    Дізнайся сильні сторони, таланти та особливості характеру своєї дитини.<br><br>
    Отримай чітку інструкцію як допомогти побудувати успішне щасливе життя та гармонійні, довірливі стосунки між вами.
</div>

<!-- Apple-style Boy/Girl Toggle -->
<div class="child-gender-toggle-container mb-4 flex justify-center w-full">
    <div class="bg-white/10 p-1 flex relative rounded-full w-full max-w-[240px] shadow-inner select-none cursor-pointer">
        <div id="gender-slider" class="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[var(--button-gradient-start)] to-[var(--button-gradient-end)] rounded-full transition-transform duration-300 ease-out shadow-md"></div>
        <div id="gender-boy" class="relative flex-1 text-center py-2 text-sm font-medium z-10 transition-colors duration-300 text-white cursor-pointer">
            <span class="mr-1">👦</span> Хлопчик
        </div>
        <div id="gender-girl" class="relative flex-1 text-center py-2 text-sm font-medium z-10 transition-colors duration-300 text-white/60 cursor-pointer">
            <span class="mr-1">👧</span> Дівчинка
        </div>
    </div>
</div>
        `,

        // 2. Список ПІСЛЯ форми - Змінено під ЦА "мами"
        heroFeatures: `<div class="mt-2 text-lg" style="color: var(--secondary-text-color);">
👶 <span class="text-white">Особистість:</span> Характер, таланти та приховані здібності.
<hr class="my-2 w-1/5 mx-auto border-white/20">
🤝 <span class="text-white">Взаємодія:</span> Як побудувати довіру та авторитет.
<hr class="my-2 w-1/5 mx-auto border-white/20">
🎓 <span class="text-white">Навчання:</span> Як підтримати інтерес до знань та розвитку.
<hr class="my-2 w-1/5 mx-auto border-white/20">
🛡️ <span class="text-white">Емоції:</span> Як допомогти впоратися зі страхами та кризами.
</div>`,

        loading: {
            steps: [
                { text: "✨ Аналізую Ядро Особистості твоєї дитини...", pause: 1500 },
                { text: "❤️‍🔥 З'ясовую, як побудувати з дитиною довірливі стосунки...", pause: 1500 },
                { text: "👑 Шукаю приховані таланти та здібності...", pause: 1500 },
                { text: "🌙 Розшифровую кармічні завдання душі дитини...", pause: 1500 },
                { text: "🪐 Перевіряю сценарії розвитку подій...", pause: 1500 },
                { text: "📜 Формую стародавній сувій дитячої натальної карти...", pause: 1500 },
                { text: "🧘‍♀️ Майже готово, Всесвіт підбирає слова...", pause: 1500 },
                { text: "🦋 Твоя дитина унікальна, це потребує детального аналізу...", pause: 1500 },
                { text: "✨ Додаю трохи зіркового пилу в звіт...", pause: 1500 },
                { text: "⚡️ Фіналізація космічного паспорта...", pause: 2000 },
                {
                    text: "🌞 Зі звітом все гаразд, просто сьогодні спалахи на сонці. Звіт вже летить на пошту, і зараз відкриється тут.",
                    pause: 0,
                    isDelayMessage: true
                }
            ]
        },

        results: {
            title: "Аналіз особистості твоєї дитини",
            marketingHook: "Це лише <span style=\"color: var(--accent-color); font-weight: bold;\">8%</span> аналізу натальної карти твоєї дитини.<br><span style=\"color: var(--secondary-text-color); font-size: 0.95rem;\">Дізнайся більш детально про всі сфери життя малюка:</span>",
            features: [
                { icon: '🎭', text: 'Характер та таланти' },
                { icon: '❤️‍🔥', text: 'Взаєморозуміння та довіра' },
                { icon: '🎓', text: 'Навчання та розвиток' },
                { icon: '🛡️', text: 'Емоції та кармічні уроки' }
            ],
            buttonText: "Отримати повний аналіз дитини"
        },

        premium: {
            title: "Отримай повний аналіз",
            subtitle: "Введи точні дані народження дитини для повного розрахунку всіх сфер її життя:",
            features: [
                { icon: '🎭', text: '<strong>Ядро Особистості</strong> (Характер)' },
                { icon: '❤️‍🔥', text: '<strong>Правила Стосунків</strong> (Довіра)' },
                { icon: '🎓', text: '<strong>Таланти</strong> (Навчання)' },
                { icon: '🔮', text: '<strong>Кармічні Уроки</strong> (Призначення)' },
                { icon: '⚡️', text: '<strong>Емоції та Кризи</strong> (Підтримка)' }
            ],
            buttonText: "Отримати детальний аналіз"
        },

        paywall: {
            title: "Детальна натальна карта твоєї дитини готова",
            description: "Ми проаналізували рух планет в момент народження дитини.<br><strong class=\"text-white\">Розблокуй</strong> повну натальну карту для кращого розуміння та гармонійного виховання (5+ сторінок).",
            buttonText: "Розблокувати дитячу карту",
            features: [
                {
                    icon: '🎭', title: 'Ядро Особистості', text: 'Як дитину бачать інші і яка вона насправді.',
                    popupTitle: 'Ядро Особистості', popupText: 'Дізнайся істинний характер, сильні сторони та приховані таланти своєї дитини.'
                },
                {
                    icon: '❤️‍🔥', title: 'Довіра та Стосунки', text: 'Як побудувати гармонійні взаємини без сварок.',
                    popupTitle: 'Довіра та Стосунки', popupText: 'Практичні поради щодо спілкування, покарань та заохочень, які підходять саме твоїй дитині.'
                },
                {
                    icon: '🎓', title: 'Навчання та Таланти', text: 'Як розкрити потенціал та зацікавити до знань.',
                    popupTitle: 'Навчання та Таланти', popupText: 'Які гуртки підійдуть дитині найкраще? Як вмотивувати її вчитися з цікавістю?'
                },
                {
                    icon: '🔮', title: 'Кармічні Уроки', text: 'Для чого душа твоєї дитини прийшла в цей світ.',
                    popupTitle: 'Кармічні Уроки', popupText: 'Який кармічний багаж принесла з собою дитина і як їй допомогти реалізувати своє призначення.'
                },
                {
                    icon: '🛡️', title: 'Емоції та Кризи', text: 'Як дитина переживає страхи та труднощі.',
                    popupTitle: 'Емоції та Кризи', popupText: 'Як правильно підтримати дитину в складні моменти і стати для неї найкращим другом.'
                }
            ]
        },

        success: {
            buttonText: "Надіслати натальну карту",
            description: "Персональний звіт для твоєї дитини готовий до відправки. Вкажи email на який надіслати:"
        },

        generation: {
            steps: [
                { text: "✨ Аналізую Ядро Особистості дитини...", pause: 1500 },
                { text: "❤️‍🔥 З'ясовую, як побудувати гармонійні стосунки...", pause: 1500 },
                { text: "👑 Шукаю приховані таланти дитини...", pause: 1500 },
                { text: "🔮 Вивчаю Кармічні Уроки та емоції...", pause: 1500 },
                { text: "🌙 З'єднуюсь з дитячою енергією Місяця...", pause: 1500 },
                { text: "📜 Формую детальний звіт для батьків...", pause: 1500 },
                { text: "🧘‍♀️ Майже готово, Всесвіт підбирає слова...", pause: 1500 },
                { text: "✨ Додаю трохи зіркового пилу в дитячий звіт...", pause: 1500 },
                { text: "⚡️ Фіналізація космічного паспорта...", pause: 2000 },
                {
                    text: "🌞 Зі звітом все гаразд, просто сьогодні спалахи на сонці. Звіт вже летить на пошту, і зараз відкриється тут.",
                    pause: 0,
                    isDelayMessage: true
                }
            ]
        }
    },

    aiContext: {},

    tracking: {
        campaignName: 'natal_child_main',
        customPixelEvent: 'ViewContent_NatalChild'
    }
};
