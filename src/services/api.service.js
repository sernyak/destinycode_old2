import { calculateNatalChart } from './astro.service.js';
import { state } from '../utils/state.js';
import { API, SYSTEM } from '../config.js';

import { request } from './core.js';
import { Logger } from '../utils/logger.js';

// ======================================================
// GLOBAL CACHE 
// ======================================================
let backgroundGenerationPromise = null;
let cachedReportData = null;

// ======================================================
// 1. HELPERS
// ======================================================

export function warmUpBackend() {
    Logger.log("🔥 Warming up PDF backend...");
    if (API && API.PDF) {
        request(API.PDF, { warmup: true }).catch(() => { });
    }
}

function parseAIResponse(rawText) {
    if (!rawText) return null;

    try {
        return JSON.parse(rawText);
    } catch (e) { /* ignore */ }

    const marker = '```';
    const codeBlockRegex = new RegExp(marker + "(?:json)?\\s*([\\s\\S]*?)\\s*" + marker, "i");
    const markdownMatch = rawText.match(codeBlockRegex);

    if (markdownMatch && markdownMatch[1]) {
        try {
            return JSON.parse(markdownMatch[1]);
        } catch (e) { /* ignore */ }
    }

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

    console.error("❌ Fatal: Could not parse AI response. Raw content:", rawText);
    throw new Error("Invalid JSON format from AI");
}

function formatReportToHtml(sections) {
    if (!sections || !Array.isArray(sections)) return '';

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
        rawText = rawText.replace(/\\n/g, '\n');
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

async function requestAI(action, data) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SYSTEM.REQUEST_TIMEOUT_MS || 45000);

    try {
        if (!API || !API.PROXY) {
            throw new Error("Configuration Error: API.PROXY is missing. Please check src/config.js");
        }

        Logger.log(`📡 Sending request to: ${API.PROXY} [Action: ${action}]`);

        const result = await request(
            API.PROXY,
            {
                action,
                data,
                modelName: SYSTEM.MODEL_NAME
            },
            { signal: controller.signal }
        );

        clearTimeout(timeoutId);

        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            throw new Error("AI returned empty response (no text candidate)");
        }

        return rawText;

    } catch (error) {
        clearTimeout(timeoutId);
        console.error("AI Request Failed:", error);
        throw error;
    }
}

// ======================================================
// 2. CORE FUNCTIONS 
// ======================================================

export async function getFreeAnalysis(date) {
    warmUpBackend();
    try {
        let astroTechnicalData = `Дата народження: ${date}`;
        try {
            // Розраховуємо базові дані (без часу та міста, по дефолту на 12:00)
            const astroResult = await calculateNatalChart({ date });
            if (astroResult && astroResult.planets) {
                astroTechnicalData = `Дата: ${date}\n== Технічні Астрологічні Дані ==\n${astroResult.planets.join('\n')}`;
            }
        } catch (e) { console.warn("Free astro calc skipped", e); }

        const rawJsonText = await requestAI('free_analysis', { date, userQuery: astroTechnicalData });
        const parsedData = parseAIResponse(rawJsonText);
        return parsedData;

    } catch (e) {
        console.error("Free Analysis Error:", e);
        return {
            title: "Помилка З'єднання",
            psychological_analysis: `<p>На жаль, сервер не зміг обробити відповідь ШІ. Спробуйте ще раз.</p><p style="color:rgba(255,255,255,0.3); font-size:0.7em;">Details: ${e.message}</p>`
        };
    }
}

export async function startBackgroundGeneration(userData) {
    if (backgroundGenerationPromise) return backgroundGenerationPromise;
    Logger.log("🚀 Starting background generation (Secure)...");

    let astroTechnicalData = "";
    try {
        const astroResult = await calculateNatalChart(userData);
        if (astroResult && astroResult.planets) {
            astroTechnicalData = `== Технічні Астрологічні Дані ==\n${astroResult.planets.join('\n')}`;
            state.set('planets', astroResult.planets);

            // 🔥 ASPECTS: Додаємо таблицю аспектів до промпту
            if (astroResult.aspects && astroResult.aspects.length > 0) {
                astroTechnicalData += `\n\n== Аспекти Натальної Карти ==\n${astroResult.aspects.join('\n')}`;
                state.set('aspects', astroResult.aspects);
            }
        }
    } catch (e) { console.warn("Local calc skipped", e); }

    const userQuery = `Дата: ${userData.date}\nЧас: ${userData.time}\nМісто: ${userData.city}\n${astroTechnicalData}`;

    // 🔥 VARIANT CONTEXT INJECTION
    const variant = state.get('currentVariant');
    let finalQuery = userQuery;

    if (variant && variant.aiContext && variant.aiContext.additionalPrompt) {
        Logger.log("🧠 Injecting AI Context from Variant:", variant.id);
        finalQuery += `\n\n[ВАЖЛИВИЙ КОНТЕКСТ МАРКЕТИНГУ: ${variant.aiContext.additionalPrompt}]`;
    }

    const enrichedUserData = state.get('planets') ? { ...userData, planets: state.get('planets'), aspects: state.get('aspects') } : userData;

    backgroundGenerationPromise = requestAI('full_report', { userQuery: finalQuery })
        .then(rawJson => {
            const data = parseAIResponse(rawJson);
            cachedReportData = { data, enrichedUserData };
            Logger.log("✅ Background generation finished!");
            return data;
        })
        .catch(err => {
            backgroundGenerationPromise = null;
            throw err;
        });

    return backgroundGenerationPromise;
}

export async function generateFullReport(userData, email) {
    let reportData = null;
    let finalUserData = userData;

    try {
        if (cachedReportData) {
            reportData = cachedReportData.data;
            finalUserData = cachedReportData.enrichedUserData;
        }
        else if (backgroundGenerationPromise) {
            reportData = await backgroundGenerationPromise;
            finalUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;
        }
        else {
            reportData = await startBackgroundGeneration(userData);
            finalUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;
        }

        if (email && email.includes('@')) {
            Logger.log("📧 Preparing Main Report Email (Frontend Trigger)...");
            const formattedHtml = formatReportToHtml(reportData.sections);

            request(API.EMAIL, {
                userEmail: email,
                reportHtml: formattedHtml,
                reportTitle: "Твій Повний Аналіз",
                reportType: 'main',
                userData: finalUserData
            }).catch(e => console.error("Email Error:", e));
        }

        return reportData;

    } catch (e) {
        console.error("Generate Full Report Error:", e);
        return { error: true, message: "Не вдалося згенерувати звіт." };
    }
}

/**
 * 🔥 UPGRADED FORECAST GENERATOR (UI Only)
 * Функція тепер безпечна для виклику - вона НЕ відправляє пошту.
 * Повертає HTML, який можна показати на екрані (якщо потрібно), 
 * але за доставку відповідає Backend (Webhook).
 */
export async function generateForecast(userData, email) {
    const savedPlanets = state.get('planets');
    const query = `Користувач: Жінка. Дата: ${userData.date}. Місто: ${userData.city}`;

    try {
        Logger.log("🔮 Generating Forecast for UI preview...");

        const rawJson = await requestAI('forecast', { userQuery: query });
        const parsedData = parseAIResponse(rawJson);

        if (!parsedData || !parsedData.sections) {
            throw new Error("Invalid Forecast JSON");
        }

        const forecastHtml = formatReportToHtml(parsedData.sections);

        // 🔥 Email Logic REMOVED.
        Logger.log("✅ Forecast HTML generated. Email буде відправлено backend'ом.");

        return forecastHtml;

    } catch (e) {
        console.error("Generate Forecast Error:", e);
        return null;
    }
}