import { calculateNatalChart } from './astro.service.js';
import { state } from '../utils/state.js';
import { API, SYSTEM } from '../config.js';

// Глобальний кеш для оптимізації
let backgroundGenerationPromise = null;
let cachedReportData = null;

// ======================================================
// 1. HELPERS (Допоміжні функції)
// ======================================================

export function warmUpBackend() {
    console.log("🔥 Warming up PDF backend...");
    // Безпечна перевірка наявності ендпоінту
    if (API && API.PDF) {
        fetch(API.PDF, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ warmup: true })
        }).catch(() => {});
    }
}

/**
 * 🔥 SURGICAL JSON PARSER (Sanitization Pattern)
 * Ця функція реалізує патерн "Defensive Programming".
 * Вона гарантує, що ми отримаємо JSON, навіть якщо AI додасть markdown або вступний текст.
 */
function parseAIResponse(rawText) {
    if (!rawText) return null;
    
    // 1. Спроба: Ідеальний JSON (Happy Path)
    try {
        return JSON.parse(rawText);
    } catch (e) { /* ignore, йдемо далі */ }

    // 2. Спроба: Markdown JSON
    // Ми розбиваємо рядок бектіків, щоб не ламати Markdown у редакторі коду
    const marker = '```'; 
    // Шукаємо текст між ```json ... ``` або просто ``` ... ```
    const codeBlockRegex = new RegExp(marker + "(?:json)?\\s*([\\s\\S]*?)\\s*" + marker, "i");
    const markdownMatch = rawText.match(codeBlockRegex);
    
    if (markdownMatch && markdownMatch[1]) {
        try {
            return JSON.parse(markdownMatch[1]);
        } catch (e) { /* ignore */ }
    }

    // 3. Спроба: "Хірургія" - пошук першої '{' і останньої '}'
    // Це рятує, якщо AI забув поставити бектіки, але написав JSON всередині звичайного тексту
    const firstBrace = rawText.indexOf('{');
    const lastBrace = rawText.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const potentialJson = rawText.substring(firstBrace, lastBrace + 1);
        try {
            return JSON.parse(potentialJson);
        } catch (e) {
            console.error("❌ JSON Extraction Failed (Brace Method):", e);
        }
    }

    // Якщо жоден метод не спрацював — це справжня помилка генерації
    console.error("❌ Fatal: Could not parse AI response. Raw content:", rawText);
    throw new Error("Invalid JSON format from AI");
}

/**
 * 🔥 MASTER HTML GENERATOR (Для Emails та PDF)
 * Створює HTML з inline-стилями для максимальної сумісності з поштовими клієнтами (Gmail, Outlook).
 */
function formatReportToHtml(sections) {
    if (!sections || !Array.isArray(sections)) return '';
    
    // Стилі для листів (Inline)
    const S = {
        section: "margin-bottom: 35px; page-break-inside: avoid;",
        h2: "color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px;",
        p: "font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #e0e0e0; margin-bottom: 12px; text-align: justify;",
        strong: "color: #ffffff; font-weight: 600;", 
        adviceBox: "background-color: #161b22; border: 1px solid rgba(205, 164, 94, 0.2); border-left: 4px solid #cda45e; padding: 20px; margin-top: 20px; border-radius: 0 8px 8px 0;",
        adviceHeader: "color: #cda45e; display: block; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; font-weight: 700; font-family: 'Montserrat', sans-serif;",
        adviceText: "margin: 0; color: #cccccc; font-style: italic; font-family: 'Montserrat', sans-serif; font-size: 13px; line-height: 1.6;"
    };

    return sections.map(section => {
        let rawText = section.analysis_text || "";
        // Заміна \n на <br> не потрібна, бо ми розбиваємо на окремі <p>
        rawText = rawText.replace(/\\n/g, '\n');
        // Обробка жирного шрифту (**text** -> <strong>text</strong>)
        rawText = rawText.replace(/\*\*(.*?)\*\*/g, `<strong style="${S.strong}">$1</strong>`);

        const formattedText = rawText
            .split('\n')
            .filter(line => line.trim() !== '') 
            .map(line => `<p style="${S.p}">${line}</p>`)
            .join('');

        return `
            <div class="report-section" style="${S.section}">
                <h2 style="${S.h2}">
                    <span style="margin-right: 8px;">${section.icon}</span> ${section.title}
                </h2>
                <div class="report-content-text">${formattedText}</div>
                <div class="report-advice" style="${S.adviceBox}">
                    <span style="${S.adviceHeader}">⚡️ KOSMIC KEY:</span>
                    <p style="${S.adviceText}">${section.practical_advice}</p>
                </div>
            </div>`;
    }).join('');
}

// Універсальна функція запиту до бекенду (через проксі)
async function requestAI(action, data) {
    const controller = new AbortController();
    // Таймаут із конфіга або 45 сек за замовчуванням
    const timeoutId = setTimeout(() => controller.abort(), SYSTEM.REQUEST_TIMEOUT_MS || 45000);
    
    try {
        // Захист: перевіряємо чи є URL проксі в конфігу
        if (!API || !API.PROXY) {
            throw new Error("Configuration Error: API.PROXY is missing. Please check src/config.js");
        }

        console.log(`📡 Sending request to: ${API.PROXY} [Action: ${action}]`);

        const response = await fetch(API.PROXY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                action,
                data,
                modelName: SYSTEM.MODEL_NAME 
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Backend Error (${response.status}): ${errText}`);
        }

        const result = await response.json();
        // Google Gemini повертає текст у цій структурі
        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!rawText) {
            throw new Error("AI returned empty response (no text candidate)");
        }

        return rawText;

    } catch (error) {
        clearTimeout(timeoutId);
        console.error("AI Request Failed:", error);
        throw error; // Прокидаємо помилку далі, щоб UI її обробив
    }
}

// ======================================================
// 2. CORE FUNCTIONS (Основні функції)
// ======================================================

export async function getFreeAnalysis(date) {
    warmUpBackend();
    try {
        // Отримуємо "сирий" текст від AI
        const rawJsonText = await requestAI('free_analysis', { date });
        
        // 🔥 ВИКОРИСТОВУЄМО НОВИЙ ПАРСЕР
        const parsedData = parseAIResponse(rawJsonText); 
        
        return parsedData;

    } catch (e) {
        console.error("Free Analysis Error:", e);
        // Повертаємо об'єкт помилки у форматі, який очікує модуль UI (view.html)
        return { 
            title: "Помилка З'єднання", 
            psychological_analysis: `<p>На жаль, сервер не зміг обробити відповідь ШІ. Спробуйте ще раз.</p><p style="color:rgba(255,255,255,0.3); font-size:0.7em;">Details: ${e.message}</p>` 
        };
    }
}

export async function startBackgroundGeneration(userData) {
    if (backgroundGenerationPromise) return backgroundGenerationPromise;
    console.log("🚀 Starting background generation (Secure)...");
    
    // Формуємо технічні дані планет (якщо порахували локально)
    let astroTechnicalData = "";
    try {
        const astroResult = await calculateNatalChart(userData);
        if (astroResult && astroResult.planets) {
            astroTechnicalData = `== Технічні Астрологічні Дані ==\n${astroResult.planets.join('\n')}`;
            state.set('planets', astroResult.planets);
        }
    } catch (e) { console.warn("Local calc skipped", e); }

    const userQuery = `Дата: ${userData.date}\nЧас: ${userData.time}\nМісто: ${userData.city}\n${astroTechnicalData}`;
    
    // Зберігаємо збагачені дані для використання у звіті (разом з планетами)
    const enrichedUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;

    // Запускаємо проміс (він живе у фоні)
    backgroundGenerationPromise = requestAI('full_report', { userQuery })
        .then(rawJson => {
            // 🔥 ПАРСИМО ВІДПОВІДЬ (ПОВНИЙ ЗВІТ)
            const data = parseAIResponse(rawJson); 
            
            cachedReportData = { data, enrichedUserData }; 
            console.log("✅ Background generation finished!");
            return data;
        })
        .catch(err => {
            backgroundGenerationPromise = null; // Скидаємо, щоб можна було спробувати знову при помилці
            throw err;
        });

    return backgroundGenerationPromise;
}

export async function generateFullReport(userData, email) {
    let reportData = null;
    let finalUserData = userData;

    try {
        // Стратегія кешування:
        // 1. Вже є готовий результат
        if (cachedReportData) {
            reportData = cachedReportData.data;
            finalUserData = cachedReportData.enrichedUserData;
        } 
        // 2. Процес вже йде у фоні - чекаємо його
        else if (backgroundGenerationPromise) {
            reportData = await backgroundGenerationPromise;
            finalUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;
        } 
        // 3. Запускаємо з нуля
        else {
            reportData = await startBackgroundGeneration(userData);
            finalUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;
        }

        // Якщо є email - відправляємо лист (Fire-and-forget)
        if (email && email.includes('@')) {
            console.log("📧 Preparing Premium Email...");
            const formattedHtml = formatReportToHtml(reportData.sections);

            fetch(API.EMAIL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: email,
                    reportHtml: formattedHtml,
                    reportTitle: "Твій Повний Аналіз",
                    reportType: 'main',
                    userData: finalUserData
                })
            }).catch(e => console.error("Email Error:", e));
        }

        return reportData;

    } catch (e) {
        console.error("Generate Full Report Error:", e);
        return { error: true, message: "Не вдалося згенерувати звіт." };
    }
}

export async function generateForecast(userData, email) {
    const savedPlanets = state.get('planets');
    const enrichedUserData = savedPlanets ? { ...userData, planets: savedPlanets } : userData;
    const query = `Користувач: Жінка. Дата: ${userData.date}. Місто: ${userData.city}`;

    try {
        const forecastHtml = await requestAI('forecast', { userQuery: query });
        
        // УВАГА: Прогноз ми просимо у форматі HTML, тому parseAIResponse тут НЕ ВИКОРИСТОВУЄТЬСЯ.
        // Це коректно.
        
        if (email && email.includes('@')) {
            fetch(API.EMAIL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userEmail: email, 
                    reportHtml: forecastHtml, 
                    reportType: 'upsell', 
                    userData: enrichedUserData 
                })
            }).catch(e => console.warn("Forecast email error:", e));
        }
        return forecastHtml;
    } catch (e) { return null; }
}