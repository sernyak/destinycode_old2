/**
 * astro-lib-loader.js
 * 🔥 BULLETPROOF ASTRO LOADER (Singleton Pattern)
 * Виправлено проблему "Race Condition" при подвійному виклику.
 */

let loadingPromise = null; // Змінна для зберігання активного процесу завантаження

export function initAstroLib() {
    // 1. ШВИДКА ПЕРЕВІРКА: Якщо бібліотека вже в пам'яті — повертаємо миттєво
    if (window.CircularNatalHoroscope) {
        return Promise.resolve(true);
    }

    // 2. ЗАХИСТ ВІД ДУБЛЮВАННЯ: Якщо завантаження ВЖЕ йде — повертаємо той самий проміс
    if (loadingPromise) {
        console.log("⏳ Astro Library load request joined existing queue...");
        return loadingPromise;
    }

    // 3. СТАРТ НОВОГО ЗАВАНТАЖЕННЯ
    console.log("🚀 Starting Astro Library sequence...");
    
    loadingPromise = new Promise((resolve) => {
        // Підготовка shim для CommonJS (якщо ще немає)
        if (!window.module) window.module = { exports: {} };
        window.exports = window.module.exports;

        // Пріоритети завантаження
        // Для GitHub Pages використовуємо "./" (відносно index.html)
        const astroSources = [
            "https://unpkg.com/circular-natal-horoscope-js@1.1.0/dist/index.js",      // 1. Unpkg
            "https://cdn.jsdelivr.net/npm/circular-natal-horoscope-js@1.1.0/dist/index.js", // 2. JsDelivr
            "./js/astro-lib.js"                                                        // 3. Local Fallback
        ];

        function loadScript(index) {
            if (index >= astroSources.length) {
                console.error("❌ CRITICAL: Всі джерела бібліотеки (включно з локальним) недоступні.");
                resolve(false);
                loadingPromise = null; // Скидаємо, щоб можна було спробувати ще раз
                return;
            }

            const src = astroSources[index];
            const script = document.createElement('script');
            script.src = src;
            script.async = true;

            script.onload = () => {
                // Перевірка успішного експорту
                if (window.module && window.module.exports && window.module.exports.Horoscope) {
                    window.CircularNatalHoroscope = window.module.exports;
                    console.log(`✅ Astro Library Loaded Successfully from ${src}`);
                    resolve(true);
                } else if (window.CircularNatalHoroscope) {
                    console.log(`✅ Astro Library Loaded (Global) from ${src}`);
                    resolve(true);
                } else {
                    console.warn(`⚠️ Script loaded from ${src}, but exports missing.`);
                    loadScript(index + 1);
                }
            };

            script.onerror = () => {
                console.warn(`⚠️ Failed to load from ${src}. Switching to backup source...`);
                loadScript(index + 1);
            };

            document.head.appendChild(script);
        }

        // Запуск ланцюжка
        loadScript(0);
    });

    return loadingPromise;
}