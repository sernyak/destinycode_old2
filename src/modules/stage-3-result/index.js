import html from './view.html?raw';
import { state } from '../../utils/state.js';

export function init(router) {
    const app = document.getElementById('app');
    
    // 🔥 Ensure container class
    app.classList.add('funnel-container');
    
    app.innerHTML = html;

    // --- DOM Elements ---
    const resultTitleEl = document.getElementById('result-title');
    const freeReportTitleEl = document.getElementById('free-report-title');
    const freeReportTextEl = document.getElementById('free-report-text');
    const upgradeButton = document.getElementById('upgrade-button');

    // --- Get Data ---
    const reportData = state.get('freeReport');

    // Fallback if no data (refresh protection)
    if (!reportData) {
        router.navigateTo('welcome');
        return;
    }

    // --- Formatting Logic (Exact from Monolith) ---
    // Handles **bold** to styled HTML and \n to <br>
    let formattedText = '';
    
    if (reportData.psychological_analysis) {
        formattedText = reportData.psychological_analysis
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--primary-text-color);">$1</strong>')
            .replace(/\\n/g, '<br>');
    } else {
        formattedText = '<p>Дані відсутні.</p>';
    }

    // --- Render ---
    resultTitleEl.innerText = "Аналіз твоєї особистості";
    freeReportTitleEl.innerHTML = reportData.title || 'Результат';
    freeReportTextEl.innerHTML = formattedText;

    // --- Event Listeners ---
    upgradeButton.addEventListener('click', () => {
        // 🔥 FIX: Змінено 'premium-data' на 'premium', щоб відповідати switch-case у main.js
        router.navigateTo('premium'); 
    });
}