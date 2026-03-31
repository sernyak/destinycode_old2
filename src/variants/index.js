import { februaryConfig } from './months/february.js';
import { oneUahConfig } from './promos/1uah.js';
import { devConfig } from './system/dev.js';
import { zodiakConfig } from './system/zodiak.js';
import { natalChartConfig } from './products/natal_chart.js';
import { natalChartOriginalConfig } from './products/natal_chart_original.js';
import { originalConfig } from './products/original.js';
import { natalChildConfig } from './products/natal_child.js';
import { natalChart2Config } from './products/natal_chart2.js';
import { natalChartHyphenConfig } from './products/natal-chart.js';
import { forecastConfig } from './products/forecast.js';
import { partnerConfig } from './products/man.js';
import { natalChartPriceConfig } from './products/natal_chart_price.js';
import { natalChartOfferConfig } from './products/natal_chart_offer.js';
import { natalChartOffer1UahConfig } from './promos/natal_chart_offer_1uah.js';
import { partnerPromo1UahConfig } from './promos/man1uah.js';
import { natalChartLandofferConfig } from './products/natal_chart_landoffer.js';

/**
 * 🌍 VARIANT REGISTRY
 * Maps URL paths (without slashes) to specific config objects.
 */
export const VARIANTS = {
    'february': februaryConfig,

    // Promos
    '1uah': oneUahConfig,
    'man1uah': partnerPromo1UahConfig, // 🔥 New 1 UAH Partner Variant
    'natal_chart_offer1uah': natalChartOffer1UahConfig, // 🎁 Test 1 UAH Natal Offer

    // Products
    'natal_chart': natalChartConfig,
    'natal_chart_original': natalChartOriginalConfig,
    'original': originalConfig, // 🌅 Копія первісного варіанту
    'natal_child': natalChildConfig, // 👶 Natal Chart for Child
    'natal_chart2': natalChart2Config,
    'natal-chart': natalChartHyphenConfig,
    'forecast': forecastConfig,
    'man': partnerConfig, // 🧑‍🤝‍🧑 Partner Match
    'natal_chart_price': natalChartPriceConfig, // 🌌 Natal Chart with combined result+form
    'natal_chart_offer': natalChartOfferConfig, // 🎁 Exact copy of natal_chart_price
    'natal_chart_landoffer': natalChartLandofferConfig, // 🎁 Landoffer logic based on natal_chart_offer

    // System / Development
    'dev': devConfig, // 🔥 DISABLED by default (draft)
    'zodiak': zodiakConfig, // 🌟 Test variant for constellation animation
};

/**
 * Returns the variant configuration based on the current URL path.
 * Only returns ACTIVE variants (enabled !== false).
 * Example URLs:
 * - /december -> returns decemberConfig (if enabled)
 * - /         -> returns null
 * - /unknown  -> returns undefined (or null logic handled by caller)
 */
export function getVariantByUrl() {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const variant = VARIANTS[path];

    // 🔥 Only return variant if it exists AND is enabled (default: true)
    if (variant && variant.enabled !== false) {
        return variant;
    }

    // Log if it's a draft
    if (variant && variant.enabled === false) {
        console.log(`📝 Variant "${path}" is a DRAFT (disabled)`);
    }

    return null;
}
