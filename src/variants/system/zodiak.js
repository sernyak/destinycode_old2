/**
 * 🌟 ZODIAK - Тестовий варіант для анімації сузір'їв
 * Включає анімацію сузір'я на екрані завантаження
 */
export const zodiakConfig = {
    id: 'zodiak',
    type: 'system',
    enabled: true,

    // UI: Не визначено — буде використовувати дефолтні тексти головного варіанту
    ui: {},

    // 🔥 Special Flag для loading модуля
    features: {
        constellationAnimation: true
    },

    aiContext: {},

    tracking: {
        campaignName: 'zodiak_test',
        customPixelEvent: 'ViewContent_Zodiak'
    }
};
