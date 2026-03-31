/**
 * 🌌 NATAL_CHART2 - Варіант для продажу базової послуги з новими текстами (A/B Test)
 * Альтернативний лейаут: Заголовок -> Заклик -> Форма -> Список сфер
 */
export const natalChart2Config = {
    id: 'natal_chart2',
    type: 'product',
    enabled: true,

    ui: {
        heroTitle: `<span style="display: block; font-size: 0.6em; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 5px;">ТВОЯ ПЕРСОНАЛЬНА</span>
НАТАЛЬНА КАРТА
<div style="font-size: 9px; opacity: 1; margin-top: -15px; margin-bottom: -4px; font-weight: 300; letter-spacing: 0.3px; color: var(--accent-color);">Персональний розрахунок натальної карти за точними Ефемеридами</div>
<span id="hero-subtitle-cta" class="relative text-base font-medium opacity-90 border border-white/20 rounded-lg px-3 py-1 inline-block cursor-pointer hover:bg-white/5 transition-colors" style="margin-bottom: -10px;">Дбайлива інструкція до самої себе</span>`,

        // 1. Текст ПЕРЕД формою
        heroSubtitle: `Втомилась від невизначеності та проблем?<br>Знайди свої приховані ресурси та точки опори у собі та власному характері.<br>Дізнайся більше про себе та поточний період свого життя за допомогою Персональної Натальної карти.<br>Отримай детальний аналіз основних сфер свого життя: <span class="text-white font-medium">стосунки, фінанси, кар'єра та самореалізація.</span>`,

        // 2. Список ПІСЛЯ форми
        heroFeatures: `<div class="mt-2 text-lg" style="color: var(--secondary-text-color);">
❤️ <span class="text-white">Кохання:</span> Твій ідеальний партнер та сценарії стосунків.
<hr class="my-2 w-1/5 mx-auto border-white/20">
💸 <span class="text-white">Фінанси:</span> Сфери які найкраще підходять саме тобі для заробітку та кар'єрного успіху
<hr class="my-2 w-1/5 mx-auto border-white/20">
✨ <span class="text-white">Особистість:</span> Твої приховані ресурси і сильні сторони на які можеш спертися
<hr class="my-2 w-1/5 mx-auto border-white/20">
🔮 <span class="text-white">Призначення:</span> Твої кармічні задачі та життєві уроки
</div>`
    },

    aiContext: {},

    tracking: {
        campaignName: 'natal_chart2',
        customPixelEvent: 'ViewContent_NatalChart'
    }
};
