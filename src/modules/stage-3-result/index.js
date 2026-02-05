import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { feedbackService } from '../../services/feedback.service.js';

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

    // --- FEEDBACK SYSTEM (FREE) ---
    renderFeedbackSystem();

    function renderFeedbackSystem() {
        // Prevent double rendering if already exists
        if (document.querySelector('.feedback-controls')) return;

        const container = document.createElement('div');
        container.className = 'feedback-controls';
        // Remove top margin/border for cleaner look in this context if needed, 
        // but re-using consistent class is better. 
        // Maybe slight inline tweak for free report specific placement?
        // The default .feedback-controls has margin-top: 30px, border-top.
        // It should look good after the text.

        // 1. Like / Dislike Buttons
        const buttonsRow = document.createElement('div');
        buttonsRow.className = 'feedback-buttons';

        const btnLike = createFeedbackIcon('👍', 'like');
        const btnDislike = createFeedbackIcon('👎', 'dislike');

        buttonsRow.appendChild(btnDislike);
        buttonsRow.appendChild(btnLike);
        container.appendChild(buttonsRow);

        // Insert after free report text
        // freeReportTextEl is inside the card. upgradeButton is in the footer (different parent).
        // We want it immediately after the text, before the divider.
        if (freeReportTextEl && freeReportTextEl.parentNode) {
            freeReportTextEl.after(container);
        } else {
            console.warn("Feedback System: Could not find insertion point (freeReportTextEl)");
        }
    }

    function createFeedbackIcon(icon, type) {
        const btn = document.createElement('div');
        btn.className = 'btn-feedback-icon';
        btn.innerText = icon;

        btn.onclick = async () => {
            // Visual Toggle
            const parent = btn.parentElement;
            parent.querySelectorAll('.btn-feedback-icon').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Send Data (Source: free_report)
            await feedbackService.send({ type, value: type, source: 'free_report' });

            // Simple Toast
            showToast("Дякую! 💜");
        };

        return btn;
    }

    function showToast(message) {
        // Simple duplicate of toast logic to keep modules independent without hefty utils refactor
        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translate(-50%, -20px)';
        toast.style.background = 'linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)';
        toast.style.color = '#fff';
        toast.style.border = '1px solid rgba(205, 164, 94, 0.3)';
        toast.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px -3px rgba(205, 164, 94, 0.1)';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '99px';
        toast.style.fontWeight = 'bold';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.3s ease';
        toast.style.zIndex = '2000';

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, 0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 900);
    }
}