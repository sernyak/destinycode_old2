import { natalChartOfferConfig } from '../products/natal_chart_offer.js';

/**
 * 🎁 NATAL_CHART_OFFER (1 UAH PROMO) - Тестова версія
 * URL: /natal_chart_offer1uah
 * Продукт: Повна розшифровка натальної карти
 * ЦІНА: 1 ГРН (для тестів)
 * ВІДОБРАЖЕННЯ: 347 ГРН (як в оригіналі)
 * 
 * 🔥 Ця конфігурація НАСЛІДУЄ все від natalChartOfferConfig
 * Щоб бути її точною копією.
 */
export const natalChartOffer1UahConfig = {
    ...natalChartOfferConfig,
    id: 'natal_chart_offer1uah',
    skipMetaTracking: true, // Тестова версія, не шлемо івенти в Meta

    // 🔥 PRICE CONFIGURATION: 1 UAH
    pricing: {
        display: {
            FULL_REPORT: 347,      // Закликаємо до оригінальної ціни
            FULL_REPORT_OLD: 997,  // Закреслена ціна
            FORECAST_UPSELL: 199,  // Показуємо реальну ціну апселу
            FORECAST_UPSELL_OLD: 1499,
            FORECAST_OLD: 1499      // Стара ціна апселу
        },
        charge: {
            FULL_REPORT: 1,        // Фактичне списання 1 грн
            FORECAST_UPSELL: 1     // Апсел також 1 грн
        }
    },

    tracking: {
        campaignName: 'natal_chart_offer_1uah',
        customPixelEvent: 'ViewContent_NatalChartOffer_1UAH'
    }
};
