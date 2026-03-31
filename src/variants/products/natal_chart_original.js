/**
 * 🌌 NATAL_CHART - Варіант для продажу базової послуги (через /natal_chart)
 * Альтернативний лейаут: Заголовок -> Заклик -> Форма -> Список сфер
 */
export const natalChartOriginalConfig = {
    id: 'natal_chart_original',
    type: 'product',
    enabled: true,

    ui: {
        heroTitle: `<span style="display: block; font-size: 0.6em; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 5px;">ТВОЯ</span>
НАТАЛЬНА КАРТА
<div style="font-size: 9px; opacity: 1; margin-top: -15px; margin-bottom: -4px; font-weight: 300; letter-spacing: 0.3px; color: var(--accent-color);">Персональний розрахунок натальної карти за точними Ефемеридами</div>
<span id="hero-subtitle-cta" class="relative font-medium opacity-90 border border-white/20 rounded-md px-2 py-1 inline-block cursor-pointer hover:bg-white/5 transition-colors" style="margin-bottom: -10px; white-space: nowrap; font-size: clamp(9px, 3.2vw, 16px); line-height: 1.2;">Інструкція по вирішенню проблем для щасливого життя</span>`,

        // 1. Текст ПЕРЕД формою
        heroSubtitle: `Обери дату народження щоб отримати повну розшифровку своїх сильних сторін та прихованих талантів у основних сферах життя: <span class="text-white font-medium">кохання, фінанси, кар'єра та самореалізація</span>.`,

        // 2. Список ПІСЛЯ форми
        heroFeatures: `<div class="mt-2 text-lg" style="color: var(--secondary-text-color);">
❤️ <span class="text-white">Кохання:</span> Твій ідеальний партнер та сценарії стосунків.
<hr class="my-2 w-1/5 mx-auto border-white/20">
💸 <span class="text-white">Фінанси:</span> Де сховані твої великі гроші та кар'єрний успіх.
<hr class="my-2 w-1/5 mx-auto border-white/20">
✨ <span class="text-white">Особистість:</span> Твої приховані таланти та суперсили.
<hr class="my-2 w-1/5 mx-auto border-white/20">
🔮 <span class="text-white">Призначення:</span> Твої кармічні задачі та істинний шлях душі.
</div>`
    },

    aiContext: {},

    tracking: {
        campaignName: 'natal_chart_main',
        customPixelEvent: 'ViewContent_NatalChart'
    }
};
