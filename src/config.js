/**
 * ⚙️ GLOBAL CONFIGURATION (v2.0 Monobank Architecture)
 * Тут живуть усі налаштування, ціни та адреси.
 * Жодних хардкодів у логіці.
 */

// === 1. ENVIRONMENT & NETWORK ===

// Перемикач Режимів: 
// false = Тестові ціни (1 грн)
// true  = Реальні ціни
export const IS_PRODUCTION = true; // 🔥 ПЕРЕКЛЮЧЕНО НА ПРОДУКЦІЮ

// Головна адреса твого Бекенду (Cloud Functions)
// ✅ Ми залишаємо це для сумісності з core.js, хоча для Gen 2 це лише дефолт
export const API_BASE = "https://europe-west1-destinycode-982fa.cloudfunctions.net";


/**
 * 🚨 КОНФІГУРАЦІЯ URL (Cloud Functions v2)
 * Реальні адреси твого бекенду (Gen 2).
 * Оскільки ти використовуєш Gen 2, кожна функція має свою унікальну адресу.
 */
const URLS = {
    // AI & Core (Europe West 1) - run.app domains
    AI: "https://getaiprediction-kpkshoor7q-ew.a.run.app",
    PDF: "https://createpdf-kpkshoor7q-ew.a.run.app",
    EMAIL: "https://sendreportemail-kpkshoor7q-ew.a.run.app",

    // Payments (Europe West 1) - Correct Gen 2 URLs
    // 🔥 FIX: Оновлено на run.app адреси для стабільної роботи
    PAYMENT_INIT: "https://initiatepayment-kpkshoor7q-ew.a.run.app",
    PAYMENT_CHECK: "https://checkpaymentstatus-kpkshoor7q-ew.a.run.app",

    // 🔥 Report Sync (Frontend → Firestore, для Telegram Bot)
    UPDATE_REPORT: "https://europe-west1-destinycode-982fa.cloudfunctions.net/updateReportData"
};


// === 2. API ENDPOINTS MAP ===
// Словник назв функцій. Core.js використовує ці ключі для побудови запитів.
// Назви (значення справа) повинні точно співпадати з exports у functions/index.js
export const API = {
    // 🔥 Прямі посилання для api.service.js (використовують конкретні URL)
    PROXY: URLS.AI,
    PDF: URLS.PDF,
    EMAIL: URLS.EMAIL,

    endpoints: {
        // AI & Core
        AI_ANALYSIS: "getAIPrediction", // Залишаємо відносний шлях, core.js додасть API_BASE (Europe)
        PDF_GEN: "createPDF",
        SEND_EMAIL: "sendReportEmail",

        // 🔥 ДЛЯ ПЛАТЕЖІВ ВИКОРИСТОВУЄМО ПОВНІ URL
        // Core.js має бути навчений розуміти це (див. нижче)
        PAYMENT_INIT: URLS.PAYMENT_INIT,
        PAYMENT_CHECK: URLS.PAYMENT_CHECK,
        UPDATE_REPORT: URLS.UPDATE_REPORT,

        // Auto-Refunds (Optional trigger)
        REFUND_TRIGGER: "processRefunds"
    }
};


// === 3. PRICING STRATEGY ===

// Ціни для відображення на UI (закреслені старі ціни)
export const DISPLAY_PRICES = {
    FULL_REPORT: 347,      // Актуальна ціна на кнопці
    FULL_REPORT_OLD: 1499,  // Закреслена ціна

    FORECAST_UPSELL: 199,   // Актуальна ціна апселу
    FORECAST_UPSELL_OLD: 1499,
    FORECAST_OLD: 1499
};

// Реальні суми до списання (залежно від режиму)
const REAL_CHARGES = {
    FULL_REPORT: 347,
    FORECAST_UPSELL: 199
};

const TEST_CHARGES = {
    FULL_REPORT: 1,      // 1 грн для тестів
    FORECAST_UPSELL: 1
};

// Експортуємо фінальний прайс залежно від прапора IS_PRODUCTION
export const PAYMENT_PRICES = IS_PRODUCTION ? REAL_CHARGES : TEST_CHARGES;


// === 4. SYSTEM SETTINGS ===
export const SYSTEM = {
    // 🔥 FIX: Використовуємо запитану версію моделі
    MODEL_NAME: 'gemini-2.5-flash',
    VERSION: '2.0.4-price-math-fix', // Bump version
    // 🔥 CRITICAL UPDATE: Збільшено таймаут до 120 секунд (2 хвилини)
    // Це дасть ШІ достатньо часу подумати над великим звітом.
    REQUEST_TIMEOUT_MS: 120000
};