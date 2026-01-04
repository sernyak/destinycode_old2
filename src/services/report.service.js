import { request } from './core.js';
import { calculateNatalChart } from './astro.service.js';
import { state } from '../utils/state.js';
import { API } from '../config.js';

// Локальний кеш для уникнення повторних запитів
let cachedReportData = null;

// === HTML GENERATOR ===
// Стилі інлайн для коректного відображення в Gmail/Outlook
function formatReportToHtml(sections) {
    if (!sections || !Array.isArray(sections)) return '';
    
    const S = {
        section: "margin-bottom: 35px; page-break-inside: avoid;",
        h2: "color: #cda45e; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(205, 164, 94, 0.3); padding-bottom: 10px;",
        p: "color: #e0e0e0; font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 15px; text-align: justify;",
        highlight: "color: #cda45e; font-weight: 600;"
    };

    return sections.map(section => `
        <div style="${S.section}">
            <h2 style="${S.h2}">${section.title}</h2>
            <div style="${S.p}">
                ${section.content.replace(/\*\*(.*?)\*\*/g, `<span style="${S.highlight}">$1</span>`)
                                 .replace(/\n/g, '<br>')}
            </div>
        </div>
    `).join('');
}

// === BUSINESS LOGIC ===

/**
 * Генерація повного звіту
 */
export async function generateFullReport(userData, forceRegenerate = false) {
    if (!forceRegenerate && cachedReportData) {
        return cachedReportData;
    }

    try {
        // 1. Астрологічні розрахунки
        const matrixData = calculateNatalChart(userData.date);
        
        // 2. Формування запиту до AI
        const fullPromptData = {
            userQuery: `Analyze full destiny matrix for date: ${userData.date}`,
            matrixData: matrixData,
            userName: userData.name
        };

        // 3. Запит до AI через Core
        const response = await request(API.endpoints.AI_ANALYSIS, { action: 'full_report', ...fullPromptData });
        const rawAnalysis = response.result;
        
        // 4. Обробка відповіді
        const sections = Array.isArray(rawAnalysis) ? rawAnalysis : [
            { title: "Загальна Характеристика", content: typeof rawAnalysis === 'string' ? rawAnalysis : JSON.stringify(rawAnalysis) }
        ];

        // 5. Верстка HTML
        const formattedHtml = formatReportToHtml(sections);
        
        const reportData = {
            html: formattedHtml,
            raw: sections,
            matrix: matrixData
        };

        // 6. Кешування
        cachedReportData = reportData;

        // 7. Фонова відправка Email (Fire-and-Forget)
        const email = userData.email;
        if (email && email.includes('@')) {
            request(API.endpoints.SEND_EMAIL, {
                userEmail: email,
                reportHtml: formattedHtml,
                reportTitle: "Твій Повний Аналіз",
                reportType: 'main',
                userData: { ...userData, matrix: matrixData }
            }).catch(e => console.error("[Report] Background email failed:", e));
        }

        return reportData;

    } catch (e) {
        console.error("[Report] Generation failed:", e);
        return { error: true, message: "Не вдалося згенерувати звіт." };
    }
}

/**
 * Генерація прогнозу (Upsell)
 */
export async function generateForecast(userData, email) {
    const savedPlanets = state.get('planets');
    const enrichedUserData = savedPlanets ? { ...userData, planets: savedPlanets } : userData;
    const query = `Користувач: Жінка. Дата: ${userData.date}. Місто: ${userData.city}`;

    try {
        const response = await request(API.endpoints.AI_ANALYSIS, { action: 'forecast', userQuery: query });
        const forecastHtml = response.result;
        
        if (email && email.includes('@')) {
            request(API.endpoints.SEND_EMAIL, { 
                userEmail: email, 
                reportHtml: forecastHtml, 
                reportType: 'upsell', 
                userData: enrichedUserData 
            }).catch(e => console.warn("[Forecast] Background email failed:", e));
        }
        return forecastHtml;
    } catch (e) { return null; }
}

/**
 * Прямий запит до AI (для сумісності)
 */
export async function requestAI(action, data) {
    const response = await request(API.endpoints.AI_ANALYSIS, { action, ...data });
    return response.result;
}