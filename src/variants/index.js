import { februaryConfig } from './months/february.js';
import { oneUahConfig } from './promos/1uah.js';
import { devConfig } from './system/dev.js';
import { zodiakConfig } from './system/zodiak.js';
import { natalChartConfig } from './products/natal_chart.js';
import { natalChartHyphenConfig } from './products/natal-chart.js';
import { forecastConfig } from './products/forecast.js';

/**
 * 🌍 VARIANT REGISTRY
 * Maps URL paths (without slashes) to specific config objects.
 */
export const VARIANTS = {
    'february': februaryConfig,

    // Promos
    '1uah': oneUahConfig,

    // Products
    'natal_chart': natalChartHyphenConfig, // Swapped
    'natal-chart': natalChartConfig,       // Swapped
    'forecast': forecastConfig,

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
