import { DISPLAY_PRICES, PAYMENT_PRICES } from '../config.js';
import { state } from './state.js';

/**
 * 🏷️ SMART PRICING HELPER
 * Returns prices considering active variant overrides.
 */
export function getPrices() {
    const variant = state.get('currentVariant');

    // Default prices from global config
    let display = { ...DISPLAY_PRICES };
    let charge = { ...PAYMENT_PRICES };

    // Apply variant overrides if they exist
    if (variant && variant.pricing) {
        if (variant.pricing.display) {
            display = { ...display, ...variant.pricing.display };
        }
        if (variant.pricing.charge) {
            charge = { ...charge, ...variant.pricing.charge };
        }
    }

    return { display, charge };
}
