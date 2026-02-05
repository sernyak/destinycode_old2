/**
 * 🌌 NATAL-CHART - Варіант для продажу базової послуги (з дефісом в URL)
 * Альтернативний лейаут: Заголовок -> Заклик -> Форма -> Список сфер
 */
export const natalChartHyphenConfig = {
    id: 'natal-chart',
    type: 'product',
    enabled: true,

    ui: {
        heroTitle: `ТВОЯ
<br>НАТАЛЬНА КАРТА
<br><span id="hero-subtitle-cta" class="relative text-base font-medium opacity-90 border border-white/20 rounded-lg px-3 py-1 inline-block mt-2 cursor-pointer hover:bg-white/5 transition-colors">інструкція до щасливого життя</span>`,

        // 1. Текст ПЕРЕД формою
        heroSubtitle: `Обери дату народження, щоб отримати повну розшифровку свого потенціалу та долі.`,

        // 2. Список ПІСЛЯ форми (новий параметр)
        heroFeatures: `<div class="mt-8 text-lg" style="color: var(--secondary-text-color);">
❤️ <span class="text-white">Кохання:</span> Твій ідеальний партнер та сценарії стосунків.
<hr class="my-2 w-1/5 mx-auto border-white/20">
💸 <span class="text-white">Фінанси:</span> Де сховані твої великі гроші та кар'єрний успіх.
<hr class="my-2 w-1/5 mx-auto border-white/20">
🔮 <span class="text-white">Призначення:</span> Твої кармічні задачі та істинний шлях душі.
<hr class="my-2 w-1/5 mx-auto border-white/20">
✨ <span class="text-white">Особистість:</span> Твої приховані таланти та суперсили.
</div>`
    },

    aiContext: {},

    tracking: {
        campaignName: 'natal_chart_hyphen',
        customPixelEvent: 'ViewContent_NatalChartHyphen'
    }
};
