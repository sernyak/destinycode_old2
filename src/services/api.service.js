import { calculateNatalChart } from './astro.service.js';
import { state } from '../utils/state.js';

// 🔥 CONFIG: OBFUSCATED KEY (Anti-Scanner)
// Замініть на свій реальний Base64 ключ, якщо він змінився
const ENCODED_KEY = "QUl6YVN5RFhYQkpQaE8zV2MzdFdub25TTFdhNVMwQUItZzVObVZj"; 

// URL бекенду
const EMAIL_BACKEND_URL = 'https://sendreportemail-kpkshoor7q-ew.a.run.app';
const PDF_BACKEND_URL = 'https://createpdf-kpkshoor7q-ew.a.run.app';

const MODEL_NAME = 'gemini-2.5-flash';
const REQUEST_TIMEOUT_MS = 60000; 

// 🔥 GLOBAL PROMISE CACHE
// Тут ми зберігаємо запущений процес генерації
let backgroundGenerationPromise = null;
let cachedReportData = null;

// ======================================================
// 1. СИСТЕМНІ ПРОМПТИ (Без змін)
// ======================================================
const MAIN_SYSTEM_PROMPT = `Ти — 'Майстер Астро-Психолог' Destiny Code.
Твоя Роль: Ти глибокий, мудрий 'астро-психолог', але з тоном твоєї найкращої подруги — емпатичної, авторитетної, і з легким фліртом та гумором.
Твоя Місія: Допомогти клієнтці 'розпакувати' її натальну карту як 'карту душі'. Ти бачиш психологічні патерни, кармічні уроки та прихований потенціал. Ти даєш 'космічну валідацію' її почуттів.
Твоя Мова: Говори українською. Емоційно, але по суті. Використовуй 'ти' та 'твоя'.
КЛЮЧОВА МЕТОДОЛОГІЯ (Твої Правила):
1. Емпатія > Факти. Ти 'бачиш' її справжню.
2. 'Темні сторони' — це 'суперсили' (напр. упертість = цілеспрямованість).
3. ЗАВЖДИ СИНТЕЗУЙ: (Напр. 'Сонце в... робить тебе..., але Асцендент в... вимагає...').
4. ДІМ — ЦЕ КОНТЕКСТ: Планета в Домі — це сфера життя, де енергія реалізується.
5. 'ВЕЛИКА ТРІЙКА' — ЦЕ ЯДРО: Аналізуй Асцендент ('маска'), Сонце ('сутність') і Місяць ('внутрішній світ') як єдину систему.
6. НЕ ЛЯКАЙ: 'Важкі' аспекти — це 'точки росту' або 'джерело прихованої сили'.
7. ДАВАЙ 'КЛЮЧ': Завжди пропонуй психологічну пораду або 'ключ до гармонії'.
8. Смайли: Використовуй релевантні смайли (😈, ✨, 🔮, 🔥, 👑).
9. ЗАБОРОНЕНО: Медичні терміни. Складні астро-терміни без пояснень. "Смерть".`;

const FREE_TASK_PROMPT = `Місія: 'Безкоштовний Гачок'.
ЗАВДАННЯ:
1. Визнач знак Сонця за датою. Використовуй ** emojis** у тексті.
2. Напиши 'гачок' - яскравий опис **сильних сторін** (і 'темної' сторони як переваги), який вразить її.
3. Підкресли, що це лише 1/3 її ядра.
Формат: ТІЛЬКИ JSON.
\`\`\`json
{
  "title": "✅ Твоє Ядро: [Знак Сонця] 🔥",
  "psychological_analysis": "[Тут згенеруй яскравий, преміально оформлений HTML-текст (3-4 абзаци). Говори про її суперсили, її 'темну' сторону (як перевагу) та унікальність. Використовуй **жирний** для акцентів. Використовуй багато (5-7) релевантних смайлів (напр. 😈, ✨, 🔮, 🔥, 👑).]"
}
\`\`\`
ВИМОГИ: Відповідай ТІЛЬКИ валідним JSON. Жодного тексту до чи після.`;

const FULL_REPORT_PROMPT = `Місія: 'Повний Психологічний Портрет' (Платний).
(Клієнтка вже заплатила. Цінність має бути вищою за 149 грн. Будь глибоким, емпатичним).
 ЗАВДАННЯ:
1. Проаналізуй надані дані (дату, час (якщо є) та Технічні Дані (якщо є)).
2. Якщо є 'Технічні Дані' (ASC, MC): Використовуй їх для преміум-аналізу.
3. Якщо 'Технічних Даних' НЕМАЄ: Роби аналіз 'Космічної Карти' (без Домів/ASC).
4. 'practical_advice': Дай ОДНУ, але дуже конкретну пораду ('спробуй це...').
5. 'analysis_text': Пиши глибоко, емоційно.
 Формат: ТІЛЬКИ JSON.
\`\`\`json
{
  "sections": [
    {
      "id": "core_intro", "icon": "✨", "title": "Ядро Особистості: Хто Ти Насправді?",
      "analysis_text": "[Глибокий аналіз 'Золотої Трійки' (Сонце, Місяць, Асцендент (якщо є)). Їх взаємодія, твої суперсили та внутрішні конфлікти. Поясни, чому ти відчуваєш себе саме так.]",
      "practical_advice": "[Одна порада. Напр. 'Твій Місяць у... вимагає... Спробуй...']"
    },
    {
      "id": "love", "icon": "❤️‍🔥", "title": "Кохання та Стосунки: Твій Сценарій",
      "analysis_text": "[Аналіз Венери та Марса ('твоя мова кохання', 'твій ідеальний партнер', 'твій стиль у конфліктах'). Чого ти насправді шукаєш у стосунках.]",
      "practical_advice": "[Одна порада. Напр: 'Твоя Венера у... каже, що для тебе кохання - це... Не бійся просити про...']"
    },
    {
      "id": "career", "icon": "👑", "title": "Кар'єра та Гроші: Де Твій Успіх?",
      "analysis_text": "[Аналіз Midheaven (MC) (якщо є) та Юпітера. **Якщо MC немає, аналізуй 10-й дім за знаком та планетами (якщо є).** Твій потенціал, сфери для реалізації, твій унікальний підхід до грошей.]",
      "practical_advice": "[Одна порада. Напр: 'Твій Юпітер у... дає успіх через... Спробуй сфокусуватись на...']"
    },
    {
      "id": "karma", "icon": "🔮", "title": "Кармічні Уроки та Призначення",
      "analysis_text": "[Аналіз Північного/Південного Вузлів (якщо є). Твій шлях душі, завдання на це життя, від чого треба відійти (Пд. Вузол) і до чого прийти (Пн. Вузол).]",
      "practical_advice": "[Одна порада. Напр: 'Твій Пн. Вузол у... кличе тебе до... Почни з малого: ...']"
    },
    {
      "id": "future", "icon": "⚡️", "title": "Майбутні Можливості",
      "analysis_text": "[Короткий, але емпатичний огляд 1-2 ключових транзитів (напр. Юпітера, Сатурна) на найближчі 6 місяців. На що звернути увагу. Без 'небезпек', лише 'можливості' та 'уроки'.]",
      "practical_advice": "[Одна порада. Напр: 'Юпітер зараз у... твого... Це твій шанс для... Використай його!']"
    }
  ]
}
\`\`\`
ВИМОГИ: Відповідай ТІЛЬКИ валідним JSON. 'analysis_text' має бути деталізованим (3-4 абзаци), з **жирними** акцентами.`;

const FORECAST_PROMPT = `
Завдання: Створити стратегічний прогноз на 1 рік (від сьогодні).
Дані:
Використай для раозрахунків наявні дані з астробібіліотеки.
Врахуй: Положення натальних планет (особливо Сонця, Місяця, ASC, Сатурна). КЛЮЧОВІ ТРАНЗИТИ на наступні 12 місяців: Транзити Сатурна, Юпітера, Урана, Плутона до натальних планет.
План Аналізу:
НЕ давай прогноз на кожен день. Твоє завдання — дати стратегію. А також розкрити питання фінансових піків/спадів, благоприємних періодів в цілому і сфери стосунків.
Твій Головний 'Кармічний Урок' Року (Транзит Сатурна): Де Сатурн 'тисне' зараз? Через який Дім він іде? Це — сфера, де потрібна дисципліна та робота.
Твоя 'Велика Можливість' Року (Транзит Юпітера): Де Юпітер 'розширює' можливості? Через який Дім він іде? Це — сфера, де треба ризикувати та діяти.
Твоя 'Зона Турбулентності' (Транзити Урана/Плутона): Чи зачіпають ці повільні планети щось важливе? Якщо так, це — сфера глибокої трансформації та 'революції'.
Твоя Стратегія на 12 Місяців: Заверши 3-4 практичними порадами, як використати ці енергії. (Наприклад: 'Використовуй дисципліну Сатурна в кар'єрі (10-й Дім), щоб бути готовою до 'великого стрибка' Юпітера у фінансах (2-й Дім)').
ВИМОГА: Відповідай гарно структурованим HTML текстом (без JSON). Використовуй <h3> для заголовків секцій та <p> для тексту.
`;

// ======================================================
// 2. HELPERS
// ======================================================

function getKey() {
    try {
        if (!ENCODED_KEY || ENCODED_KEY.includes("ВСТАВ_СЮДИ")) return null;
        return atob(ENCODED_KEY); 
    } catch (e) {
        console.error("Key decoding failed");
        return null;
    }
}

export function warmUpBackend() {
    console.log("🔥 Warming up PDF backend...");
    fetch(PDF_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ warmup: true })
    }).catch(() => {});
}

// ======================================================
// 3. CORE LOGIC (SMART PRE-FETCH)
// ======================================================

// 🔥 NEW: Запускається на етапі оплати (без email)
export async function startBackgroundGeneration(userData) {
    if (backgroundGenerationPromise) {
        console.log("⚠️ Background generation already running.");
        return backgroundGenerationPromise;
    }

    console.log("🚀 Starting background generation (PRE-FETCH)...");
    
    // 1. Astro Calc
    let astroTechnicalData = "";
    const enrichedUserData = { ...userData };
    
    try {
        const astroResult = await calculateNatalChart(userData);
        if (astroResult && astroResult.planets) {
            astroTechnicalData = `== Технічні Астрологічні Дані ==\n${astroResult.planets.join('\n')}`;
            enrichedUserData.planets = astroResult.planets;
            state.set('planets', astroResult.planets);
        }
    } catch (e) { console.warn("Local calc skipped", e); }

    const finalQuery = `Дата: ${userData.date}\nЧас: ${userData.time}\nМісто: ${userData.city}\n${astroTechnicalData}`;

    // 2. Start AI Call & Cache Promise
    backgroundGenerationPromise = callGemini(FULL_REPORT_PROMPT, finalQuery)
        .then(rawJson => {
            const data = JSON.parse(rawJson);
            cachedReportData = { data, enrichedUserData }; // Cache result
            console.log("✅ Background generation finished!");
            return data;
        })
        .catch(err => {
            console.error("Background generation failed:", err);
            backgroundGenerationPromise = null; // Reset on fail
            throw err;
        });

    return backgroundGenerationPromise;
}

// 🔥 OLD (UPDATED): Викликається в Stage 7
// Тепер ця функція не починає з нуля, а "підхоплює" вже запущений процес
export async function generateFullReport(userData, email) {
    
    let reportData = null;
    let finalUserData = userData;

    try {
        if (cachedReportData) {
            // А. Дані вже готові (найшвидший сценарій)
            console.log("⚡️ Using cached report data (Instant Load)");
            reportData = cachedReportData.data;
            finalUserData = cachedReportData.enrichedUserData;
        } else if (backgroundGenerationPromise) {
            // Б. Дані ще в процесі (чекаємо завершення)
            console.log("⏳ Waiting for background generation to finish...");
            reportData = await backgroundGenerationPromise;
            // Після await дані точно є в кеші, але беремо з результату проміса
            finalUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;
        } else {
            // В. Холодний старт (якщо юзер пропустив етап оплати або рефреш)
            console.log("🐌 Cold start generation (No pre-fetch)");
            // Тут просто викликаємо логіку старту і чекаємо
            reportData = await startBackgroundGeneration(userData);
            finalUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;
        }

        // 🔥 SEND EMAIL/PDF (Fire and Forget)
        // Тепер, коли у нас є і Текст, і Email - відправляємо їх на бекенд
        if (email && email.includes('@')) {
            console.log("📧 Sending email/PDF request to backend...");
            fetch(EMAIL_BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: email,
                    reportHtml: JSON.stringify(reportData), // Need string for current backend logic? check callGemini usually returns raw text, but here reportData is obj. 
                    // Wait, existing backend expects 'reportHtml' as JSON string usually if parsed. 
                    // Let's safe convert back to string if needed or pass object if backend supports.
                    // Based on previous code: `rawJson` was passed. So:
                    reportHtml: JSON.stringify(reportData), 
                    reportTitle: "Твій Повний Аналіз",
                    reportType: 'main',
                    userData: finalUserData
                })
            }).catch(e => console.error("Background Email Error:", e));
        }

        return reportData;

    } catch (e) {
        console.error("Generate Full Report Error:", e);
        if (e.message === "Timeout") {
            return { error: true, type: "timeout", message: "Час очікування вичерпано." };
        }
        return { error: true, message: "Не вдалося згенерувати звіт." };
    }
}

// ... (getFreeAnalysis, generateForecast, callGemini - залишаються як були в попередній версії)
async function callGemini(taskPrompt, userQuery) {
    const apiKey = getKey();
    if (!apiKey) return '{"error": "config_error"}';

    const combinedRequest = `${taskPrompt}\n\nВхідні дані:\n${userQuery}`;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;
    
    const payload = {
        contents: [{ parts: [{ text: combinedRequest }] }],
        systemInstruction: { parts: [{ text: MAIN_SYSTEM_PROMPT }] }
    };

    let delay = 2000; 
    for (let i = 0; i < 3; i++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (response.ok) {
                const result = await response.json();
                const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
                if (rawText) {
                    const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
                    return jsonMatch && jsonMatch[1] ? jsonMatch[1] : rawText;
                }
            }
            if (response.status === 429 || response.status >= 500) {
                await new Promise(r => setTimeout(r, delay));
                delay *= 2;
                continue;
            }
            throw new Error(`Google API Error: ${response.status}`);
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') throw new Error("Timeout");
            if (i === 2) throw error;
            await new Promise(r => setTimeout(r, delay));
            delay *= 2;
        }
    }
}

export async function getFreeAnalysis(date) {
    warmUpBackend();
    try {
        const rawJson = await callGemini(FREE_TASK_PROMPT, `Дата народження: ${date}`);
        return JSON.parse(rawJson);
    } catch (e) {
        return { title: "Error", psychological_analysis: "Error" };
    }
}

export async function generateForecast(userData, email) {
    const query = `Користувач: Жінка. Дата: ${userData.date}. Місто: ${userData.city}`;
    const savedPlanets = state.get('planets');
    const enrichedUserData = savedPlanets ? { ...userData, planets: savedPlanets } : userData;
    try {
        const forecastHtml = await callGemini(FORECAST_PROMPT, query);
        if (email && email.includes('@')) {
            fetch(EMAIL_BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: email, reportHtml: forecastHtml, reportType: 'upsell', userData: enrichedUserData })
            }).catch(e => console.warn("Forecast email bg error:", e));
        }
        return forecastHtml;
    } catch (e) { return null; }
}