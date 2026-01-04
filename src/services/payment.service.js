import { request } from './core.js';
import { API } from '../config.js';
import { state } from '../utils/state.js';

/**
 * 🚀 PROCESS PAYMENT (Monobank)
 * @param {Object} product - { name, price }
 * @param {Object} user - { email, name (optional) }
 * @param {Object} userData - 🔥 { date, time, city, geo } ДЛЯ ПОРЯТУНКУ СЕСІЇ В SAFARI
 * @param {Object} options - { returnQueryParams } (optional)
 */
export async function processPayment(product, user, userData, options = {}) {
    console.log(`💳 Starting Payment: ${product.name} (${product.price} UAH)`);

    try {
        const payload = {
            amount: product.price,
            productName: product.name,
            userEmail: user.email,
            userName: user.name || "Client",
            
            // 🔥 CLOUD BACKUP: Відправляємо дані на бекенд
            userData: userData,

            origin: window.location.origin, 
            returnQueryParams: options.returnQueryParams || ""
        };

        console.log("💳 Payment Payload:", payload);

        const response = await request(API.endpoints.PAYMENT_INIT, payload);

        console.log("💳 Payment Init Response:", response);

        if (response && response.pageUrl) {
            state.set('pendingInvoiceId', response.invoiceId);
            
            // 🔥 FIX: Використовуємо assign для більш стабільного переходу
            window.location.assign(response.pageUrl);
            
        } else {
            console.error("❌ Invalid Payment Response:", response);
            throw new Error("Invalid response from payment provider (no pageUrl)");
        }

    } catch (error) {
        console.error("❌ Payment Init Failed Details:", error);
        
        let userMsg = "Помилка ініціалізації оплати.";
        if (error.message && error.message.includes("400")) userMsg += " Невірні дані.";
        if (error.message && error.message.includes("500")) userMsg += " Сервер тимчасово недоступний.";
        
        alert(`${userMsg}\nСпробуйте ще раз.`);
        throw error;
    }
}

export async function checkPaymentStatus(params) {
    console.log("🔍 Checking status for:", params);
    try {
        const response = await request(API.endpoints.PAYMENT_CHECK, params);
        console.log("🔍 Status Response:", response);
        return response; 
    } catch (error) {
        console.error("Status Check Failed:", error);
        return { status: 'error', message: error.message };
    }
}