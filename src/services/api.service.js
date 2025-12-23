import { calculateNatalChart } from './astro.service.js';
import { state } from '../utils/state.js';
// 🔥 IMPORT CONFIG
import { API, SYSTEM } from '../config.js';

// Глобальний кеш для оптимізації
let backgroundGenerationPromise = null;
let cachedReportData = null;

// ======================================================
// 1. HELPERS
// ======================================================

export function warmUpBackend() {
    console.log("🔥 Warming up PDF backend...");
    fetch(API.PDF, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ warmup: true })
    }).catch(() => {});
}

// Універсальна функція запиту до твого безпечного бекенду
async function requestAI(action, data) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SYSTEM.REQUEST_TIMEOUT_MS);
    
    try {
        // 🔥 ВИКОРИСТОВУЄМО API.PROXY З КОНФІГУ
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
            throw new Error(`Backend Error: ${response.status}`);
        }

        const result = await response.json();
        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (rawText) {
            const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
            return jsonMatch && jsonMatch[1] ? jsonMatch[1] : rawText;
        }
        return null;

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
        const rawJson = await requestAI('free_analysis', { date });
        return JSON.parse(rawJson);
    } catch (e) {
        console.error("Free Analysis Error:", e);
        return { title: "Error", psychological_analysis: "<p>На жаль, сталася помилка з'єднання.</p>" };
    }
}

export async function startBackgroundGeneration(userData) {
    if (backgroundGenerationPromise) return backgroundGenerationPromise;
    console.log("🚀 Starting background generation (Secure)...");
    
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

    const userQuery = `Дата: ${userData.date}\nЧас: ${userData.time}\nМісто: ${userData.city}\n${astroTechnicalData}`;

    backgroundGenerationPromise = requestAI('full_report', { userQuery })
        .then(rawJson => {
            const data = JSON.parse(rawJson);
            cachedReportData = { data, enrichedUserData }; 
            console.log("✅ Background generation finished!");
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
        } else if (backgroundGenerationPromise) {
            reportData = await backgroundGenerationPromise;
            finalUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;
        } else {
            reportData = await startBackgroundGeneration(userData);
            finalUserData = state.get('planets') ? { ...userData, planets: state.get('planets') } : userData;
        }

        if (email && email.includes('@')) {
            // 🔥 ВИКОРИСТОВУЄМО API.EMAIL
            fetch(API.EMAIL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: email,
                    reportHtml: JSON.stringify(reportData), 
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
        
        if (email && email.includes('@')) {
            // 🔥 ВИКОРИСТОВУЄМО API.EMAIL
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