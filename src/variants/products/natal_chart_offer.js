/**
 * 🌌 NATAL_CHART_OFFER - Варіант для продажу натальної карти з комбінованим екраном результат+форма
 * URL: /natal_chart_offer (Копія /natal_chart_price)
 * Структура: Як у /man — поля часу та міста з'являються одразу під безкоштовним звітом
 */
export const natalChartOfferConfig = {
    id: 'natal_chart_offer',
    type: 'product',
    enabled: true,

    ui: {
        heroTitle: `<span style="display: block; font-size: 0.6em; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-color); margin-bottom: 5px;">ТВОЯ</span>
НАТАЛЬНА КАРТА
<div style="font-size: 9px; opacity: 1; margin-top: -15px; margin-bottom: -4px; font-weight: 300; letter-spacing: 0.3px; color: var(--accent-color);">Персональний розрахунок натальної карти за точними Ефемеридами</div>
<span id="hero-subtitle-cta" class="relative font-medium opacity-90 border border-white/20 rounded-md px-2 py-1 inline-block cursor-pointer hover:bg-white/5 transition-colors" style="margin-bottom: -10px; white-space: nowrap; font-size: clamp(9px, 3.2vw, 16px); line-height: 1.2;">Інструкція по вирішенню проблем для щасливого життя</span>`,

        // 1. Текст ПЕРЕД формою
        heroSubtitle: `<span style="display: block; color: var(--accent-color); font-weight: 400; font-size: 1.1em; margin-bottom: 8px;">Отримай розшифровку своєї Натальної карти онлайн за декілька хвилин</span>Обери дату народження та дізнайся свої сильні сторони та приховані таланти у основних сферах життя: <span class="text-white font-medium">кохання, фінанси, карʼєра та самореалізація</span>.`,

        // 2. Список ПІСЛЯ форми
        heroFeatures: `<div class="mt-1 text-left" style="color: var(--secondary-text-color); font-size: 15px; line-height: 1.5; font-weight: 400;">
<div style="margin-bottom: 12px; padding-left: 24px; position: relative;">
    <span style="position: absolute; left: 0; top: 0;">✨</span>
    <span class="text-white font-medium">Дізнайся свій астрологічний архетип</span> — і перестань грати чужу роль. Стань головною героїнею свого життя.
</div>
<div style="margin-bottom: 12px; padding-left: 24px; position: relative;">
    <span style="position: absolute; left: 0; top: 0;">🎭</span>
    <span class="text-white font-medium">Перестань відчувати себе 'невидимкою'</span> і зрозумій, яка ти насправді дивовижна!
</div>
<div style="margin-bottom: 12px; padding-left: 24px; position: relative;">
    <span style="position: absolute; left: 0; top: 0;">🧲</span>
    <span class="text-white font-medium">Розкрий свій секрет привабливості:</span> дізнайся, яка твоя природна магнетичність і чому ти створена притягувати погляди!
</div>
<div style="padding-left: 24px; position: relative;">
    <span style="position: absolute; left: 0; top: 0;">🔓</span>
    <span class="text-white font-medium">Знайди вирішення свого прихованого внутрішнього конфлікту</span> який заважає тобі отримати те, чого ти насправді достойна!
</div>
</div>`
    },

    aiContext: {},

    tracking: {
        campaignName: 'natal_chart_offer',
        customPixelEvent: 'ViewContent_NatalChartOffer'
    }
};
