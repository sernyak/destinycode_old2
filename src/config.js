/**
 * ⚙️ GLOBAL CONFIGURATION
 */

export const IS_PRODUCTION = false; 

export const DISPLAY_PRICES = {
    FULL_REPORT: 149,
    FULL_REPORT_OLD: 799,
    FORECAST_UPSELL: 247,
    FORECAST_OLD: 1399
};

const REAL_CHARGES = {
    FULL_REPORT: 149,
    FORECAST_UPSELL: 247
};

const TEST_CHARGES = {
    FULL_REPORT: 1,      
    FORECAST_UPSELL: 1   
};

export const PAYMENT_PRICES = IS_PRODUCTION ? REAL_CHARGES : TEST_CHARGES;

const BACKEND_BASE_URL = 'https://europe-west1-destinycode-982fa.cloudfunctions.net';

export const API = {
    PROXY: `${BACKEND_BASE_URL}/getAIPrediction`,
    EMAIL: `${BACKEND_BASE_URL}/sendReportEmail`,
    PDF: `${BACKEND_BASE_URL}/createPDF`,
    SIGNATURE: `${BACKEND_BASE_URL}/getPaymentSignature`,
    
    WEBHOOK: `${BACKEND_BASE_URL}/handlePaymentWebhook`,
    VERIFY: `${BACKEND_BASE_URL}/verifyPaymentStatus`,
    
    // 🔥 ЦЕЙ ЕНДПОІНТ ОБОВ'ЯЗКОВИЙ ДЛЯ PRG PATTERN
    PAYMENT_RETURN: `${BACKEND_BASE_URL}/handlePaymentReturn` 
};

export const SYSTEM = {
    MODEL_NAME: 'gemini-2.5-flash',
    REQUEST_TIMEOUT_MS: 60000
};