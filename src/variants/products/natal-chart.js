/**
 * 🌌 NATAL-CHART - Варіант для продажу базової послуги (через /natal-chart)
 * Унікальний лендінг з акцентном на натальну карту та долю.
 */
export const natalChartHyphenConfig = {
    id: 'natal-chart',
    type: 'product',
    enabled: true,

    ui: {
        heroTitle: `НАТАЛЬНА КАРТА
<br><span class="text-xl font-bold opacity-90">твоя інструкція до щасливого життя</span>`,
        heroSubtitle: `Обери дату народження, щоб отримати повну розшифровку свого потенціалу та долі.
<br><br>
❤️ <span class="text-white">Кохання:</span> Твій ідеальний партнер та сценарії стосунків.
<hr class="my-2 w-1/5 mx-auto border-white/20">
💸 <span class="text-white">Фінанси:</span> Де сховані твої великі гроші та кар'єрний успіх.
<hr class="my-2 w-1/5 mx-auto border-white/20">
🔮 <span class="text-white">Призначення:</span> Твої кармічні задачі та істинний шлях душі.
<hr class="my-2 w-1/5 mx-auto border-white/20">
✨ <span class="text-white">Особистість:</span> Твої приховані таланти та суперсили.`
    },

    aiContext: {},

    tracking: {
        campaignName: 'natal_chart_hyphen',
        customPixelEvent: 'ViewContent_NatalChartHyphen'
    }
};
