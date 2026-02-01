/**
 * ❄️ DECEMBER CAMPAIGN CONFIG
 * Initally identical to the main site.
 * Used for tracking traffic source without changing content.
 */
export const decemberConfig = {
    id: 'december',
    type: 'month',

    // UI Override: Empty means "use default"
    ui: {
        // heroTitle: "...", 
        // heroSubtitle: "...",
        // buttonText: "...",
        // backgroundColor: "#1a1c2c" // <--- Додай це, якщо хочеш інший колір фону
    },

    // AI Context: Empty means "use default"
    aiContext: {},

    // Pricing Override: 🔥 Додай це, якщо хочеш змінити ціну ТІЛЬКИ для цього варіанту
    // pricing: {
    //     display: { FULL_REPORT: 99, FULL_REPORT_OLD: 500 }, // Ціни на екрані
    //     charge: { FULL_REPORT: 99 }                      // Реальна сума до оплати
    // },

    // Tracking & Analytics (ЗБЕРІГАЄМО ТІЛЬКИ ТРЕКІНГ)
    tracking: {
        campaignName: 'horoscope_december_2026',
        customPixelEvent: 'ViewContent_December'
    }
};
