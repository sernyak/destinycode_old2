/**
 * 📅 ЛЮТИЙ - Варіант для лютневої кампанії
 */
export const februaryConfig = {
    id: 'february',
    type: 'month',
    enabled: true, // false = чорновик

    ui: {
        // heroTitle: "Твій Лютневий Прогноз",
        // heroSubtitle: "Дізнайся, що приготували зірки на лютий",
        // buttonText: "Розрахувати",
        // backgroundColor: ""
    },

    aiContext: {
        // additionalPrompt: "Зверни увагу на любовні теми, бо лютий — місяць Дня Закоханих."
    },

    tracking: {
        campaignName: 'horoscope_february_2026',
        customPixelEvent: 'ViewContent_February'
    }
};
