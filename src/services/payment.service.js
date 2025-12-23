import { API } from '../config.js';

const CLIENT_CONFIG = {
    merchantDomainName: "destinycode.online",
    currency: "UAH",
    SIGNATURE_URL: API.SIGNATURE,
    WAYFORPAY_URL: "https://secure.wayforpay.com/pay",
    WEBHOOK_URL: API.WEBHOOK,
    // 🔥 PROXY RETURN: Це наша "подушка безпеки" на бекенді
    PROXY_RETURN_URL: API.PAYMENT_RETURN 
};

/**
 * Отримує підпис від сервера І одночасно зберігає чернетку замовлення в БД
 * @param {object} orderData - Дані для WayForPay (сума, назва)
 * @param {object} extraData - 🔥 Дані для збереження в базі (User Data, Email)
 */
async function fetchSignatureFromServer(orderData, extraData = {}) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); 
        
        // 🔥 SECURITY UPGRADE: Ми відправляємо не тільки дані для підпису,
        // але й дані користувача (userData, email) для збереження в Firestore.
        // Це гарантує, що у нас є "зліпок" замовлення ДО того, як клієнт піде в банк.
        const payload = {
            merchantDomainName: CLIENT_CONFIG.merchantDomainName,
            currency: CLIENT_CONFIG.currency,
            ...orderData,
            // Додаткові дані для збереження в базі (не впливають на підпис WFP)
            backupData: extraData 
        };

        const response = await fetch(CLIENT_CONFIG.SIGNATURE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server Error ${response.status}: ${errorText}`);
        }
        return await response.json();
    } catch (e) {
        if (e.name === 'AbortError') throw new Error("Backend Connection Timeout.");
        throw e;
    }
}

function submitFormToWayForPay(data) {
    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', CLIENT_CONFIG.WAYFORPAY_URL);
    form.setAttribute('accept-charset', 'utf-8');
    form.setAttribute('target', '_self'); 
    form.style.display = 'none';

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (Array.isArray(data[key])) {
                data[key].forEach(val => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', key + '[]'); // Дужки для масивів обов'язкові
                    input.setAttribute('value', val);
                    form.appendChild(input);
                });
            } else {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', data[key]);
                form.appendChild(input);
            }
        }
    }
    document.body.appendChild(form);
    console.log("🚀 Redirecting to WayForPay (PRG Mode)...");
    setTimeout(() => { form.submit(); }, 100);
}

export async function processPayment(product, user, options = {}) {
    console.log("🚀 Starting payment process (Secure DB Mode)...");

    try {
        const orderDate = Math.floor(Date.now() / 1000);
        // Генеруємо унікальний реф.
        const orderReference = `ORD_${Date.now().toString().slice(-8)}_${Math.floor(Math.random() * 999)}`;

        // 1. Формуємо Цільову URL (Куди юзер має потрапити в кінці)
        const targetUrl = new URL(window.location.href);
        targetUrl.searchParams.set('verify_order', orderReference);
        
        // Додаємо мітки (upsell_source тощо)
        if (options.returnQueryParams) {
            const params = new URLSearchParams(options.returnQueryParams);
            for (const [key, value] of params) {
                targetUrl.searchParams.set(key, value);
            }
        }
        
        const finalTarget = targetUrl.toString();

        // 2. Формуємо URL Проксі (Куди банк відправить юзера спочатку)
        // Ми передаємо finalTarget як параметр, щоб бекенд знав, куди редіректити
        const proxyReturnUrl = `${CLIENT_CONFIG.PROXY_RETURN_URL}?target=${encodeURIComponent(finalTarget)}`;

        console.log("📍 Final Target:", finalTarget);

        const rawData = {
            orderReference,
            orderDate,
            amount: String(product.price),
            productName: [product.name],
            productPrice: [String(product.price)],
            productCount: ["1"]
        };

        // 🔥 CRITICAL: Передаємо всі дані для бекапу ( userData + email )
        // Це саме те, чого не було в "старому" коді.
        // Ми збираємо дані з об'єкта `state`, який передається через аргумент `user`.
        // Або якщо `user` це просто об'єкт з email, ми можемо додати userData окремо,
        // але зазвичай `user` тут містить те, що нам треба.
        
        // ВАЖЛИВО: Оскільки в `stage-5-paywall` ми передаємо `{ email: ... }`,
        // нам треба отримати `userData` з глобального стейту, якщо його немає в аргументах.
        // Але тут ми покладаємось на те, що `userData` передається при виклику,
        // або ми можемо імпортувати state тут. 
        // ДЛЯ НАДІЙНОСТІ: Імпортуємо state прямо тут, щоб взяти дані.
        
        const { state } = await import('../utils/state.js'); // Динамічний імпорт для уникнення циклічних залежностей
        
        const userDataFromState = {
            date: state.get('date'),
            time: state.get('time'),
            city: state.get('city'),
            geo: state.get('geo')
        };

        const backupData = {
            email: user.email || "", // Може бути пустим, якщо юзер не ввів
            userData: userDataFromState, // 🔥 Завжди беремо актуальні дані з сесії
            productName: product.name,
            status: "created" // Початковий статус
        };

        // Відправляємо все на сервер (отримуємо підпис + зберігаємо в БД)
        const serverAuth = await fetchSignatureFromServer(rawData, backupData);
        if (!serverAuth.signature) throw new Error("Сервер не повернув підпис!");

        const formData = {
            merchantAccount: serverAuth.merchantAccount,
            merchantAuthType: "SimpleSignature",
            merchantDomainName: CLIENT_CONFIG.merchantDomainName,
            merchantSignature: serverAuth.signature,
            orderReference: orderReference,
            orderDate: orderDate,
            amount: rawData.amount,
            currency: CLIENT_CONFIG.currency,
            productName: rawData.productName,
            productPrice: rawData.productPrice,
            productCount: rawData.productCount,
            clientFirstName: "Destiny User",
            clientLastName: "Client",
            clientEmail: user.email || "", // WayForPay збереже це в логах транзакції
            language: "UA",
            returnUrl: proxyReturnUrl, // 🔥 Відправляємо на БЕКЕНД
            serviceUrl: CLIENT_CONFIG.WEBHOOK_URL
        };

        submitFormToWayForPay(formData);
        
        return new Promise(() => {});

    } catch (error) {
        console.error("🚨 Payment Process Error:", error);
        throw error;
    }
}

export async function verifyPaymentStatus(orderReference) {
    try {
        const response = await fetch(API.VERIFY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderReference })
        });
        if (!response.ok) throw new Error(`Verification HTTP Error: ${response.status}`);
        return await response.json();
    } catch (e) {
        console.error("Verification failed", e);
        return { status: 'error', reason: e.message };
    }
}