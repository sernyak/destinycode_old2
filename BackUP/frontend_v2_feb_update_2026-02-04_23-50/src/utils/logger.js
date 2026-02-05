import { IS_PRODUCTION } from '../config.js';

/**
 * 🛠️ LOGGER UTILITY
 * Handles console output based on environment.
 * Suppresses standard logs in production, but keeps errors and warnings potentially.
 * Usage: Logger.log('Message', data);
 */
export const Logger = {
    log: (...args) => {
        if (!IS_PRODUCTION) {
            console.log(...args);
        }
    },

    warn: (...args) => {
        // Warnings might be useful even in prod, but let's safely wrap them
        // or suppress if we want total silence. 
        // For now, let's allow them but maybe filter specific ones if needed.
        if (!IS_PRODUCTION) {
            console.warn(...args);
        }
    },

    error: (...args) => {
        // Errors should arguably always be visible or reported to a service (e.g. Sentry)
        // For now, we print them to console even in prod so developers can debug issues on live users if needed.
        console.error(...args);
    },

    // Explicit debug channel that is ALWAYS off in prod
    debug: (...args) => {
        if (!IS_PRODUCTION) {
            console.debug(...args);
        }
    }
};
