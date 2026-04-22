/**
 * 💰 1UAH - Тестовий варіант для внутрішнього тестування
 * 
 * 🔥 ОСОБЛИВІСТЬ:
 * - Ціни на екрані (display) синхронізуються з головною сторінкою автоматично.
 * - Лише фактична сума списання (charge) = 1 грн.
 */
export const oneUahConfig = {
    id: '1uah',
    type: 'internal_test',
    enabled: true,
    skipMetaTracking: true,

    ui: {},       // Ідентичний головній
    aiContext: {}, // Ідентичний головній

    // 🔥 Відображаємо стандартні ціни, але списуємо 1 грн
    pricing: {
        display: {
            FULL_REPORT: 347,
            FULL_REPORT_OLD: 1499,
            FORECAST_UPSELL: 199,
            FORECAST_UPSELL_OLD: 1499,
            FORECAST_OLD: 1499
        },
        charge: {
            FULL_REPORT: 1,
            FORECAST_UPSELL: 1
        }
    },

    tracking: {
        campaignName: 'internal_test_1uah',
        customPixelEvent: 'ViewContent_InternalTest'
    }
};
