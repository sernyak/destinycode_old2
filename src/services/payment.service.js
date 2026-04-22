import { request } from './core.js';
import { API } from '../config.js';

import { state } from '../utils/state.js';
import { Logger } from '../utils/logger.js';

/**
 * 🚀 PROCESS PAYMENT (Monobank)
 * @param {Object} product - { name, price }
 * @param {Object} user - { email, name (optional) }
 * @param {Object} userData - 🔥 { date, time, city, geo } ДЛЯ ПОРЯТУНКУ СЕСІЇ В SAFARI
 * @param {Object} options - { returnQueryParams } (optional)
 */
export async function processPayment(product, user, userData, options = {}) {
    Logger.log(`💳 Starting Payment: ${product.name} (${product.price} UAH)`);

    try {
        // 🔥 SAFEGUARD: Force amount to be a clean number (prevent 'invalid amount' error)
        const cleanAmount = Number(product.price);
        if (isNaN(cleanAmount)) {
            console.error("❌ Invalid price detected:", product.price);
            throw new Error(`Payment error: Invalid price (${product.price})`);
        }

        // 🔥 CAPI Tracking Data: Збираємо рекламні куки та контекст браузера
        function getCookie(name) {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
        }
        
        const trackingData = {
            fbp: getCookie('_fbp'),
            fbc: getCookie('_fbc'),
            userAgent: navigator.userAgent
        };

        const payload = {
            amount: cleanAmount,
            productName: product.name,
            userEmail: user.email,
            userName: user.name || "Client",

            // 🔥 CLOUD BACKUP: Відправляємо дані на бекенд для відновлення сесії
            userData: userData,
            variant: options.variant || null, // 🔥 SAVE VARIANT TO BACKEND
            trafficSource: state.get('traffic_type'), // 🔥 Критерій Ads vs Bio
            
            // 🔥 CAPI Payload
            trackingData: trackingData,

            origin: window.location.origin,
            returnQueryParams: options.returnQueryParams || ""
        };

        const response = await request(API.endpoints.PAYMENT_INIT, payload);

        if (response && response.pageUrl) {
            state.set('pendingInvoiceId', response.invoiceId);

            // 🔥 FIX: Deep Link Mode (Hidden Link Click Technique)
            // Використовуємо цей метод, щоб Safari/Chrome коректно відкривали застосунок Монобанку
            // та ініціалізували Apple Pay без блокувань.

            if (options.paymentWindow) {
                // Використовуємо вже відкрите вікно (напр., через window.open) щоб оминути блокувальник попапів
                options.paymentWindow.location.href = response.pageUrl;
            } else {
                const link = document.createElement('a');
                link.href = response.pageUrl;
                link.target = '_top';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 100);
            }

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
    Logger.log("🔍 Checking status for:", params);
    try {
        const response = await request(API.endpoints.PAYMENT_CHECK, params);
        // console.log("🔍 Status Response:", response); // Можна розкоментувати для дебагу
        return response;
    } catch (error) {
        console.error("Status Check Failed:", error);
        return { status: 'error', message: error.message };
    }
}