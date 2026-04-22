import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { feedbackService } from '../../services/feedback.service.js';
import { getCoordinates } from '../../services/geo.service.js';
import { processPayment } from '../../services/payment.service.js';
import { getPrices } from '../../utils/pricing.js';
import { warmUpBackend } from '../../services/api.service.js';
import { haptics } from '../../utils/haptics.js';
import { renderAstroBox } from '../../utils/astro-renderer.js';

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

    // --- Form Elements for natal_chart_price ---
    const marketingDivider = document.getElementById('marketing-divider');
    const marketingHookBlock = document.getElementById('marketing-hook-block');
    const premiumFormTitleContainer = document.getElementById('premium-form-title-container');
    const premiumFormContainer = document.getElementById('premium-form-container');

    const birthTimeInput = document.getElementById('birth-time');
    const timePlaceholder = document.getElementById('time-placeholder');
    const birthTimeWrapper = birthTimeInput ? birthTimeInput.closest('.input-field') : null;
    const timeErrorMessage = document.getElementById('time-error-message');

    const birthCityInput = document.getElementById('birth-city');
    const cityErrorMessage = document.getElementById('city-error-message');
    const cityInfoMessage = document.getElementById('city-info-message');

    const skipButton = document.getElementById('skip-button');

    // --- Get Data ---
    const reportData = state.get('freeReport');

    // Fallback if no data (refresh protection)
    if (!reportData) {
        router.navigateTo('welcome');
        return;
    }

    // --- Formatting Logic (Exact from Monolith) ---
    // Handles **bold** to styled HTML and \n to <br>
    // --- Formatting Logic ---
    let formattedText = '';

    // Helper to format Markdown-like bold and newlines
    // 🔥 UPDATED: Unlimited White Regular Highlights (No Limit)
    const formatStr = (str) => {
        if (!str) return '';

        // Replace ALL bold markers with White Regular span (Normal weight per user request)
        return str
            .replace(/\*\*(.*?)\*\*/g, '<span style="color: var(--primary-text-color); font-weight: normal;">$1</span>')
            .replace(/\\n/g, '<br>');
    };

    // 0. Extract Variant and Archetype early for logic use
    const currentVariant = state.get('currentVariant');
    let archetype = 'твого архетипу';
    const marketing = currentVariant?.marketing;
    
    if (marketing) {
        const titleText = reportData?.title || '';
        const archetypeBlockText = reportData?.content_blocks?.archetype || '';
        
        // 1. FIRST PRIORITY: Extract full AI name from the text block (e.g. "**Зіркова Стратегиня Душі**")
        if (archetypeBlockText) {
            // Find all bold instances
            const allBoldsMatch = [...archetypeBlockText.matchAll(/\*\*(.*?)\*\*/g)];
            const allBolds = allBoldsMatch.map(m => m[1]);

            // Try to find the explicit keyword match (now handles 'ти \u2014', 'ти є', etc.)
            const explicitMatchRegex = /(?:ти(?:\sє)?\s*[-–—]?\s*|(?:архетип|роль|суті|енергетикою)\s*[-–—:]?\s*)\*\*(.*?)\*\*/i;
            const explicitMatch = archetypeBlockText.match(explicitMatchRegex);

            if (explicitMatch && explicitMatch[1]) {
                archetype = explicitMatch[1].trim().replace(/[.,!]$/, '');
            } else if (allBolds.length > 0) {
                // Фолбек: шукаємо перше жирне виділення, яке починається з великої літери (іменник/архетип)
                // Це виключить випадково виділені прикметники на кшталт "агресивним" або "вразливою".
                const capitalizedBold = allBolds.find(b => {
                    const clean = b.trim();
                    return clean.length >= 2 && !clean.match(/^\d/) && clean[0] === clean[0].toUpperCase();
                });
                
                if (capitalizedBold) {
                    archetype = capitalizedBold.trim().replace(/[.,!]$/, '');
                } else {
                    // Якщо з великої літери немає, беремо перше-ліпше (крім дат/попереджень)
                    const firstSafe = allBolds.find(b => !b.match(/^\d/) && !b.match(/важливо|увага|знак/i));
                    if (firstSafe) {
                        archetype = firstSafe.trim().replace(/[.,!]$/, '');
                    }
                }
            }
        }

        // 2. SECOND PRIORITY: Try to extract from the report title
        if (archetype === 'твого архетипу' && titleText) {
            const match = titleText.match(/(?:Архетип|Архетип:\s*|:\s*)([^<\n,]+)$/i);
            if (match && match[1]) archetype = match[1].trim();
        }

        // 3. THIRD PRIORITY: explicit field from backend (fallback, as it might just be the Zodiac sign)
        if (archetype === 'твого архетипу' && reportData?.archetype && typeof reportData.archetype === 'string') {
            archetype = reportData.archetype;
        }
    }

    // 1. Partner Match Logic (New JSON Structure) - KEEP AS IS if compatible, otherwise wrap in accordion too?
    // The user asked for "Main Version" (Natal Chart) which usually goes into "else if (reportData.psychological_analysis)" block below.
    // But if Partner data is present, we might want to respect that structure.
    // However, the user request specifically mentioned "Free report for main version... contains multiple paragraphs".
    // I will focus on the `else` block or generic handling.

    if (reportData.forecast_preview || reportData.theme_year) {
        // 🔮 FORECAST PREVIEW (Free Report) — ACCORDION FORMAT
        console.log("Rendering Forecast Preview (Accordion)...");

        // Theme Year header
        let themeYearHtml = '';
        if (reportData.theme_year) {
            themeYearHtml = `<div class="mb-4" style="text-align: center; padding: 12px 0;">
                <span style="color: var(--accent-color); font-size: 0.75em; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Архетип Року</span>
                <h3 style="color: #fff; font-size: 1.3em; font-weight: 700; margin-top: 4px;">🦁 ${reportData.theme_year}</h3>
            </div>`;
        }

        // Parse forecast_preview into 3 accordion sections
        const forecastCardHeaders = [
            { emoji: "🌪", title: "Вітер Змін" },
            { emoji: "⚓️", title: "Прихована Пастка" },
            { emoji: "🎫", title: "Золотий Квиток" }
        ];

        let forecastCards = [];
        if (reportData.forecast_preview) {
            const rawPreview = reportData.forecast_preview;

            // Robust split: divide by double <br> into chunks
            const chunks = rawPreview
                .split(/<br\s*\/?>\s*<br\s*\/?>/gi)
                .map(c => c.replace(/^<br\s*\/?>|<br\s*\/?>$/gi, '').trim())
                .filter(c => c.length > 10);

            // Group chunks into 3 sections by keyword matching
            const sectionKeywords = ['Вітер Змін', 'Прихована Пастка', 'Золотий Квиток'];
            const sectionContents = [[], [], []];
            let currentSection = -1;

            for (const chunk of chunks) {
                const plainText = chunk.replace(/<[^>]*>/g, '');
                const foundIdx = sectionKeywords.findIndex(kw => plainText.includes(kw));

                if (foundIdx !== -1) {
                    currentSection = foundIdx;
                    // Short header-only chunk — skip, we use own headers
                    if (plainText.replace(/[:\s]/g, '').length < 40) continue;
                    // Inline header+content — strip header tags
                    const cleaned = chunk
                        .replace(/<(?:span[^>]*|b)>[^<]*(?:Вітер Змін|Прихована Пастка|Золотий Квиток)[^<]*<\/(?:span|b)>/gi, '')
                        .replace(/^[:\s]+/g, '')
                        .trim();
                    if (cleaned) sectionContents[currentSection].push(cleaned);
                    continue;
                }

                if (currentSection >= 0) {
                    sectionContents[currentSection].push(chunk);
                } else {
                    sectionContents[0].push(chunk);
                }
            }

            forecastCards = forecastCardHeaders.map((header, index) => ({
                ...header,
                content: formatStr(sectionContents[index].join('<br><br>'))
            }));
        }

        // If parsing failed, fallback to single card
        if (forecastCards.length === 0 || forecastCards.every(c => !c.content)) {
            forecastCards = [{
                emoji: "🔮", title: "Попередній Прогноз",
                content: formatStr(reportData.forecast_preview || '')
            }];
        }

        // Arrow animation style
        const arrowAnimStyle = `
            <style>
                @keyframes bounce-small {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(3px); }
                }
                .animate-bounce-small {
                    animation: bounce-small 2s infinite;
                    display: inline-block;
                }
            </style>
        `;

        formattedText = themeYearHtml + arrowAnimStyle + forecastCards.map((card, index) => {
            const isFirst = index === 0;
            const isLast = index === forecastCards.length - 1;

            return `
                <div class="accordion-item ${isFirst ? 'accordion-open' : ''}" style="
                    background-color: rgba(28, 28, 30, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
                ">
                    <div class="accordion-header" style="
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                    " data-index="${index}">
                        <h4 style="
                            color: var(--accent-color);
                            font-weight: 700;
                            text-transform: uppercase;
                            font-size: 0.85em;
                            letter-spacing: 1.5px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin: 0;
                        ">
                            <span style="font-size: 1.2em;">${card.emoji}</span> ${card.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em; transition: transform 0.3s ease;">▼</span>
                    </div>

                    <div class="accordion-content" style="
                        max-height: ${isFirst ? '1000px' : '0'};
                        overflow: hidden;
                        transition: max-height 0.4s ease-out;
                    ">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${card.content}
                            
                            ${!isLast ? `
                                <button class="next-section-btn" data-target="${index + 1}" style="
                                    display: block;
                                    width: 100%;
                                    margin-top: 20px;
                                    padding: 12px;
                                    background: rgba(255, 255, 255, 0.05);
                                    border: 1px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 8px;
                                    color: var(--primary-text-color);
                                    font-size: 0.9em;
                                    cursor: pointer;
                                    transition: all 0.2s;
                                ">
                                    Читати далі <span class="animate-bounce-small">👇</span>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

    } else if (reportData.superpower || reportData.blind_spot || reportData.teaser_hook) {
        // ... (Existing Partner Logic - Leaving untouched to not break Partner if reused here)
        console.log("Rendering Partner Match Data...");
        let sections = [];
        if (reportData.superpower) sections.push(`<div class="mb-4"><h4 style="color: var(--accent-color); font-weight: 700; margin-bottom: 5px;">${reportData.superpower.title || 'Твоя Суперсила'}</h4><p>${formatStr(reportData.superpower.text)}</p></div>`);
        if (reportData.blind_spot) sections.push(`<div class="mb-4"><h4 style="color: var(--accent-color); font-weight: 700; margin-bottom: 5px;">${reportData.blind_spot.title || 'Сліпа Зона'}</h4><p>${formatStr(reportData.blind_spot.text)}</p></div>`);
        if (reportData.teaser_hook) sections.push(`<div class="mt-5 p-4 rounded-lg" style="background: rgba(205, 164, 94, 0.1);"><h4 style="color: #fff; font-weight: 700;">${reportData.teaser_hook.title || 'Ключ до щастя'} 🗝️</h4><p>${formatStr(reportData.teaser_hook.text)}</p></div>`);
        formattedText = sections.join('');

    } else if (reportData.psychological_analysis || reportData.content_blocks) {
        // 🔥 ORIGINAL MAIN VERSION LOGIC

        // Define Fixed Headers for the 3 Cards (UPDATED per User Request)
        const cardHeaders = [
            { emoji: "✨", title: "Твій Зірковий Архетип" },
            { emoji: "⚡️", title: "Прихований Внутрішній Конфлікт" },
            { emoji: "🗝️", title: "Твій Ключ до Змін" }
        ];

        let cards = [];

        // 1. Try New Structured Data (Priority)
        if (reportData.content_blocks) {
            let archContent = formatStr(reportData.content_blocks.archetype || "");
            
            // 🔥 SPECIFIC BOLDING: Only bold the archetype name in the first block, make it white and bold
            if (archetype && archetype !== 'твого архетипу') {
                const escapedArch = archetype.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                
                // Спочатку шукаємо, чи воно знаходиться всередині існуючого <span style="... font-weight: normal..."> (який поставив formatStr)
                const archRegexSpan = new RegExp(`(<span[^>]*font-weight:\\s*normal;?[^>]*>)(${escapedArch})(<\\/span>)`, 'gi');
                if (archContent.match(archRegexSpan)) {
                    archContent = archContent.replace(archRegexSpan, '<span style="color: var(--primary-text-color); font-weight: 700;">$2</span>');
                } else {
                    // Якщо ні, просто шукаємо слово і загортаємо
                    const archRegexStrict = new RegExp(`(${escapedArch})`, 'gi');
                    archContent = archContent.replace(archRegexStrict, '<span style="color: var(--primary-text-color); font-weight: 700;">$1</span>');
                }
            }

            cards = [
                { ...cardHeaders[0], content: archContent },
                { ...cardHeaders[1], content: formatStr(reportData.content_blocks.conflict || "") },
                { ...cardHeaders[2], content: formatStr(reportData.content_blocks.solution || "") }
            ];
        }
        // 2. Fallback to Legacy Parsing (Text Splitting)
        else {
            const rawText = reportData.psychological_analysis || "";

            // Split by double newlines or double breaks
            const paragraphs = rawText
                .split(/(?:\\n\\n|\n\n|<br\s*\/?>\s*<br\s*\/?>)/gi)
                .map(p => p.trim())
                .filter(p => p.length > 20); // Filter out empty or too short residuals

            // Map paragraphs to cards (HANDLE MISMATCHES GRACEFULLY)
            cards = cardHeaders.map((header, index) => {
                let content = "";

                if (paragraphs.length >= 3) {
                    // Exact match or more -> 1:1 mapping (last one takes rest)
                    if (index < 2) {
                        content = paragraphs[index];
                    } else {
                        content = paragraphs.slice(index).join('<br><br>');
                    }
                } else if (paragraphs.length === 2) {
                    // 2 paragraphs -> 1:1, 2:2, 3:Marketing Only
                    if (index === 0) content = paragraphs[0];
                    if (index === 1) content = paragraphs[1];
                    if (index === 2) content = "Це лише початок твоєї історії... Справжня глибина розкриється у повному звіті.";
                } else {
                    // 1 paragraph or text wall -> Put all in first, others generic
                    if (index === 0) content = rawText;
                    if (index === 1) content = "Ця частина твого характеру часто залишається в тіні, але саме вона дає тобі перевагу в критичні моменти.";
                    if (index === 2) content = "Твоя карта містить ще багато таємниць, які ми готові розкрити.";
                }

                return { ...header, content: formatStr(content) };
            });
        }

        // CTA Style (for arrows)
        const arrowAnimStyle = `
            <style>
                @keyframes bounce-small {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(3px); }
                }
                .animate-bounce-small {
                    animation: bounce-small 2s infinite;
                    display: inline-block;
                }
            </style>
        `;

        // Render HTML
        formattedText = arrowAnimStyle + cards.map((card, index) => {
            const isFirst = index === 0;
            const isLast = index === 2;

            return `
                <div class="accordion-item ${isFirst ? 'accordion-open' : ''}" style="
                    background-color: rgba(28, 28, 30, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    margin-bottom: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
                ">
                    <!-- Header -->
                    <div class="accordion-header" style="
                        padding: 16px 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        cursor: pointer;
                    " data-index="${index}">
                        <h4 style="
                            color: var(--accent-color);
                            font-weight: 700;
                            text-transform: uppercase;
                            font-size: 0.85em;
                            letter-spacing: 1.5px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            margin: 0;
                        ">
                            <span style="font-size: 1.2em;">${card.emoji}</span> ${card.title}
                        </h4>
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em; transition: transform 0.3s ease;">▼</span>
                    </div>

                    <!-- Content -->
                    <div class="accordion-content" style="
                        max-height: ${isFirst ? '1000px' : '0'};
                        overflow: hidden;
                        transition: max-height 0.4s ease-out;
                    ">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${card.content}
                            
                            ${!isLast ? `
                                <button class="next-section-btn" data-target="${index + 1}" style="
                                    display: block;
                                    width: 100%;
                                    margin-top: 20px;
                                    padding: 12px;
                                    background: rgba(255, 255, 255, 0.05);
                                    border: 1px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 8px;
                                    color: var(--primary-text-color);
                                    font-size: 0.9em;
                                    cursor: pointer;
                                    transition: all 0.2s;
                                ">
                                    Читати далі <span class="animate-bounce-small">👇</span>
                                </button>
                            ` : `
                                <div id="last-accordion-item-extras">
                                    <!-- Marketing / Feedback injected here -->
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        formattedText = '<p>Дані відсутні.</p>';
    }

    // --- Render ---
    // 🔥 GRAMMAR FIX: Construct Title on Frontend
    let finalTitle = reportData.title || 'Результат';
    if (reportData.archetype_she && reportData.archetype_he) {
        finalTitle = `💖 Твій Любовний Сценарій: ${reportData.archetype_she} та ${reportData.archetype_he}`;
    }

    resultTitleEl.innerText = "Аналіз твоєї особистості";
    freeReportTitleEl.innerHTML = finalTitle;
    freeReportTextEl.innerHTML = formattedText;

    // 🔥 INITIALIZE ACCORDION LISTENERS
    // 🔥 INITIALIZE ACCORDION LISTENERS
    // 🔥 INITIALIZE ACCORDION LISTENERS
    attachAccordionListeners(freeReportTextEl);

    // 🔥 MOVE FOOTER & MARKETING CONTENT TO LAST ITEM - REMOVED per user request (layout change)
    // Elements stay in their original position in view.html (below the accordion)

    // 🔥 VARIANT OVERRIDE: Results UI
    // (currentVariant already defined above)
    if (currentVariant && currentVariant.ui && currentVariant.ui.results) {
        const ui = currentVariant.ui.results;

        // 1. Title
        if (ui.title) resultTitleEl.innerText = ui.title;

        // 2. Marketing Hook Text (Paragraph)
        if (ui.marketingHook) {
            const hookParagraph = document.querySelector('#marketing-hook-block p');
            if (hookParagraph) hookParagraph.innerHTML = ui.marketingHook;
        }

        // 3. Features List
        if (ui.features && Array.isArray(ui.features)) {
            const featuresList = document.querySelector('#marketing-hook-block ul');
            if (featuresList) {
                featuresList.innerHTML = ui.features.map(f => `
                    <li class="flex items-center"><span class="mr-2 text-xl">${f.icon}</span> ${f.text}</li>
                `).join('');
            }
        }

        // 4. Button Text (Preserving Arrows)
        if (ui.buttonText) {
            const btnTextSpan = upgradeButton.querySelector('.btn-text');
            if (btnTextSpan) {
                btnTextSpan.innerHTML = `
                    ${ui.buttonText}
                    <span class="font-bold tracking-widest flex gap-[1px]">
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                    </span>
                `;
            }
        }
    }

    // 🔥 Variant: natal_chart_price / natal_chart_offer Form Logic
    const isNatalChartPrice = ['natal_chart_price', 'natal_chart_offer', 'natal_chart_offer1uah', 'natal_chart_landoffer', 'natal_chart_sale'].includes(currentVariant?.id);
    const isNatalChartOffer = ['natal_chart_offer', 'natal_chart_offer1uah', 'natal_chart_landoffer', 'natal_chart_sale'].includes(currentVariant?.id);

    if (isNatalChartPrice) {
        // Toggle UI
        if (marketingDivider) marketingDivider.style.display = 'none';
        if (marketingHookBlock) marketingHookBlock.style.display = 'none';
        if (premiumFormTitleContainer) premiumFormTitleContainer.style.display = 'block';
        if (premiumFormContainer) premiumFormContainer.style.display = 'block';

        // 🔥 OFFER VARIANT: Override button, title, trust text, and show landing blocks
        if (isNatalChartOffer) {
            const currentPrices = getPrices();
            warmUpBackend(); // Pre-warm backend for faster payment init

            // Title override
            if (resultTitleEl) resultTitleEl.innerText = 'Твій Персональний Розбір';

            // Form title override removed to allow HTML default (Отримай повну розшифровку своєї Натальної карти)

            // Button text with pricing
            const btnTextSpan = upgradeButton.querySelector('.btn-text');
            if (btnTextSpan) {
                btnTextSpan.innerHTML = `
                    <span class="flex flex-col items-center gap-0 w-full">
                        <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${currentPrices.display.FULL_REPORT} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">${currentPrices.display.FULL_REPORT_OLD} грн</span></span>
                        <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Одноразовий платіж • Довічний доступ</span>
                    </span>
                `;
            }

            // Trust text override
            const footerTrust = document.getElementById('footer-trust-text');
            if (footerTrust) {
                footerTrust.innerHTML = `<span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">🔒 Безпечна оплата через Monobank</span>`;
            }

            // Show all landing page blocks
            const offerBlocks = document.querySelectorAll('.offer-landing-block');
            offerBlocks.forEach(block => block.style.display = 'block');

            // Show divider before form
            const offerDivider = document.getElementById('offer-form-divider');
            if (offerDivider) offerDivider.style.display = 'block';

            // Show and start urgency timer
            const offerUrgencyTimer = document.getElementById('offer-urgency-timer');
            if (offerUrgencyTimer) {
                // Timer starts hidden; will be revealed by IntersectionObserver below
                let timeLeft = 15 * 60; // 15 minutes
                const timerDisplay = document.getElementById('offer-timer-display');
                if (timerDisplay && !window._offerTimerStarted) {
                    window._offerTimerStarted = true;
                    setInterval(() => {
                        timeLeft--;
                        if (timeLeft < 0) timeLeft = 0;
                        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
                        const s = (timeLeft % 60).toString().padStart(2, '0');
                        timerDisplay.textContent = `${m}:${s}`;
                    }, 1000);
                }
            }

            // 🔥 HIDE CHECKOUT BLOCK UNTIL SCROLL TO DIVIDER
            // Hide the entire sticky footer container (black background + timer + button + trust text)
            const stickyFooter = document.querySelector('.sticky-paywall-footer');
            if (stickyFooter) {
                stickyFooter.style.opacity = '0';
                stickyFooter.style.transform = 'translateY(100%)';
                stickyFooter.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                stickyFooter.style.pointerEvents = 'none';
            }

            // Observe the form divider — when it enters viewport, reveal checkout
            const formDivider = document.getElementById('offer-form-divider');
            if (formDivider && stickyFooter && 'IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Show timer
                            if (offerUrgencyTimer) {
                                offerUrgencyTimer.style.display = 'block';
                            }
                            // Reveal the entire sticky footer with animation
                            stickyFooter.style.opacity = '1';
                            stickyFooter.style.transform = 'translateY(0)';
                            stickyFooter.style.pointerEvents = 'auto';
                            observer.disconnect(); // Only trigger once
                        }
                    });
                }, { threshold: 0.3 });
                observer.observe(formDivider);
            } else {
                // Fallback: just show everything
                if (offerUrgencyTimer) offerUrgencyTimer.style.display = 'block';
                if (stickyFooter) {
                    stickyFooter.style.opacity = '1';
                    stickyFooter.style.transform = 'translateY(0)';
                    stickyFooter.style.pointerEvents = 'auto';
                }
            }

            // Render Cosmic Imprint for offer variant
            const astroContainer = document.getElementById('offer-astro-data-container');
            if (astroContainer) {
                const userData = state.get('userData') || {
                    date: state.get('date'),
                    time: state.get('time'),
                    city: state.get('city'),
                    geo: state.get('geo')
                };
                renderAstroBox(userData).then(htmlContent => {
                    if (htmlContent) {
                        astroContainer.innerHTML = htmlContent;
                    }
                });
            }

            // (Archetype logic moved up)

            // 🔥 INJECT TRIGGER INTO LAST ACCORDION ITEM
            // Add Hook and "But this is just the beginning..." block to the last accordion
            setTimeout(() => {
                const lastExtras = document.getElementById('last-accordion-item-extras');
                if (lastExtras) {
                    let hookHtml = '';
                    if (marketing && marketing.hook && marketing.hook.template) {
                        hookHtml = `<p style="color: var(--primary-text-color); font-size: 0.95em; line-height: 1.6; margin-bottom: 12px;">${marketing.hook.template.replace(/{archetype}/g, `<span style="color: var(--primary-text-color); font-weight: 700;">${archetype}</span>`)}</p>`;
                    }

                    lastExtras.innerHTML = `
                        <div style="margin-top: 20px; padding: 18px 16px; background: rgba(205, 164, 94, 0.08); border: 1px solid rgba(205, 164, 94, 0.2); border-radius: 12px;">
                            ${hookHtml}
                            <p style="color: var(--secondary-text-color); font-size: 0.88em; line-height: 1.6; margin: 0;">
                                Важливо знати власні «природні налаштування», щоб використовувати свої сильні сторони на повну і знати свої слабкі сторони, щоб двічі не наступати на ті самі граблі.<br>
                                Відповіді на всі твої запитання вже закладені у твоїй Натальній карті.
                            </p>
                        </div>
                    `;
                    // Update accordion max-height ONLY if it is currently open
                    const lastAccordionContent = lastExtras.closest('.accordion-content');
                    if (lastAccordionContent) {
                        const accordionItem = lastAccordionContent.closest('.accordion-item');
                        if (accordionItem && accordionItem.classList.contains('accordion-open')) {
                            // Give extra room for the new text
                            lastAccordionContent.style.maxHeight = (parseInt(lastAccordionContent.style.maxHeight || 0) + 350) + 'px';
                        }
                    }
                }
            }, 100);

            // 🔥 PROFESSIONAL: Dynamic Marketing Features (Table, Mockup)
            // Pulls content from currentVariant.marketing for full scalability
            if (marketing) {
                const prices = getPrices();
                const discountPct = Math.round(((prices.display.FULL_REPORT_OLD - prices.display.FULL_REPORT) / prices.display.FULL_REPORT_OLD) * 100);

                // 2. Comparison Table (Data-Driven)
                const comparisonBlock = document.getElementById('offer-comparison-block');
                const comparisonContent = document.getElementById('comparison-table-content');
                
                if (marketing.comparison && comparisonBlock && comparisonContent) {
                    const { title, headers, rows } = marketing.comparison;
                    
                    const titleEl = document.getElementById('comparison-table-title');
                    if (titleEl && title) titleEl.innerHTML = title;

                    const rowsHtml = rows.map(row => {
                        const renderIcon = (val) => {
                            if (val === 'check') return '<span class="offer-comparison-icon check">✅</span>';
                            if (val === 'cross') return '<span class="offer-comparison-icon cross">❌</span>';
                            if (val === 'discount' || (typeof val === 'string' && val.startsWith('discount:'))) {
                                const customPct = val.includes(':') ? val.split(':')[1] : discountPct;
                                return `
                                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
                                        <span class="offer-comparison-icon bonus" style="margin: 0; line-height: 1;">🎁</span>
                                        <div class="bonus-tag" style="margin-top: 0;">ЗНИЖКА ${customPct}%</div>
                                    </div>
                                `;
                            }
                            if (val === 'bonus') return `
                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;">
                                    <span class="offer-comparison-icon bonus" style="margin: 0; line-height: 1;">🎁</span>
                                    <div class="bonus-tag" style="margin-top: 0;">БЕЗКОШТОВНО</div>
                                </div>
                            `;
                            return val;
                        };

                        return `
                            <tr>
                                <td>${row.label}</td>
                                <td>${renderIcon(row.free)}</td>
                                <td class="highlight-col">${renderIcon(row.premium)}</td>
                            </tr>
                        `;
                    }).join('');

                    comparisonContent.innerHTML = `
                        <table class="offer-comparison-table shadow-xl">
                            <thead>
                                <tr>
                                    <th>${headers[0] || 'Функція'}</th>
                                    <th style="opacity: 0.6;">${headers[1] || 'Free'}</th>
                                    <th class="highlight-col premium-header">${headers[2] || 'Premium'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rowsHtml}
                            </tbody>
                        </table>
                    `;
                    comparisonBlock.style.display = 'block';
                }

                // 3.4. Mockup Preview Carousel
                const previewBlock = document.getElementById('offer-preview-block');
                if (previewBlock && marketing.mockup) {
                    const titleHeading = document.getElementById('mockup-title-heading');
                    if (titleHeading) {
                        titleHeading.innerText = marketing.mockup.title;
                        titleHeading.style.display = 'block';
                    }

                    const scrollContainer = document.getElementById('mockup-carousel-scroll');
                    const dotsContainer = document.getElementById('destiny-dots-new');
                    
                    if (scrollContainer && marketing.mockup.images?.length > 0) {
                        // Inject images
                        scrollContainer.innerHTML = marketing.mockup.images.map(src => `
                            <div class="carousel-slide">
                                <img src="${src}" class="offer-mockup-image" alt="PDF Preview">
                            </div>
                        `).join('');
                        
                        // Inject dots
                        if (dotsContainer) {
                            dotsContainer.innerHTML = marketing.mockup.images.map((_, i) => 
                                `<div class="destiny-dot ${i === 0 ? 'active' : ''}"></div>`
                            ).join('');
                        }
                        
                        // Scroll event for active dot
                        setTimeout(() => {
                            const dots = dotsContainer ? dotsContainer.querySelectorAll('.destiny-dot') : [];
                            if (scrollContainer && dots.length > 0) {
                                scrollContainer.addEventListener('scroll', () => {
                                    const index = Math.round(scrollContainer.scrollLeft / scrollContainer.clientWidth);
                                    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
                                }, { passive: true });
                            }
                        }, 100);
                    }

                    const captionEl = document.getElementById('mockup-caption-text');
                    if (captionEl && marketing.mockup.caption) {
                        captionEl.innerText = marketing.mockup.caption;
                    }
                    previewBlock.style.display = 'block';
                }

                // 3.5. Transformation Block (Before/After) — from landingSections
                const sections = currentVariant.landingSections;
                if (sections?.transformation) {
                    const transBlock = document.getElementById('offer-block-transformation-s3');
                    const transTitle = document.getElementById('s3-transformation-title');
                    const transBefore = document.getElementById('s3-transformation-before');
                    const transAfter = document.getElementById('s3-transformation-after');
                    
                    if (transBlock && transTitle && transBefore && transAfter) {
                        transTitle.innerHTML = sections.transformation.title;
                        transBefore.textContent = sections.transformation.before;
                        transAfter.textContent = sections.transformation.after;
                        transBlock.style.display = 'block';
                    }
                }

                // 3.6. Audience Block (For Whom / Not For Whom) — from landingSections
                if (sections?.audience) {
                    const audBlock = document.getElementById('offer-block-audience-s3');
                    const audTitle = document.getElementById('s3-audience-title');
                    const audForList = document.getElementById('s3-audience-for-list');
                    const audNotList = document.getElementById('s3-audience-not-list');
                    const audNotSubtitle = document.getElementById('s3-audience-not-subtitle');
                    
                    if (audBlock && audTitle && audForList && audNotList) {
                        audTitle.innerHTML = sections.audience.title;
                        audForList.innerHTML = sections.audience.for_who.map(item => `<li>${item}</li>`).join('');
                        audNotList.innerHTML = sections.audience.not_for_who.map(item => `<li>${item}</li>`).join('');
                        if (audNotSubtitle && sections.audience.negativeSubtitle) {
                            audNotSubtitle.textContent = sections.audience.negativeSubtitle;
                        }
                        audBlock.style.display = 'block';
                    }
                }

                // 4. Dynamic Reviews (Combined 1st + 3rd screen)
                const reviewsList = document.getElementById('reviews-list');
                const testimonials = currentVariant.landingSections?.testimonials || [];
                
                if (reviewsList && testimonials.length > 0) {
                    reviewsList.innerHTML = testimonials.map(rev => `
                        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <img src="${rev.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(205, 164, 94, 0.3);">
                                <div>
                                    <div style="color: #fff; font-weight: 600; font-size: 0.95em;">${rev.name}</div>
                                    <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                                </div>
                            </div>
                            <p class="review-text" style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">
                                "${rev.text}"
                            </p>
                        </div>
                    `).join('');
                }

                // 4.5 Dynamic Trust Counter Sync (Matches Stage 1)
                const s3CounterEl = document.getElementById('s3-live-women-counter');
                if (s3CounterEl) {
                    const counterKeys = {
                        'forecast': 'forecast_counter',
                        'natal_child': 'natal_child_counter',
                        'man': 'man_women_counter',
                        'man1uah': 'man_women_counter',
                        'natal_chart_landoffer': 'natal_chart_counter',
                        'natal_chart_sale': 'natal_chart_counter'
                    };
                    const lsKey = counterKeys[currentVariant.id] || 'natal_chart_counter';
                    
                    const renderS3Count = (c, animate) => {
                        const formattedCount = c.toLocaleString('uk-UA').replace(/\u00a0/g, ' ');
                        if (s3CounterEl.innerText !== formattedCount) {
                            s3CounterEl.innerText = formattedCount;
                            if (animate) {
                                s3CounterEl.style.transform = 'scale(1.15)';
                                s3CounterEl.style.transition = 'transform 0.2s ease';
                                setTimeout(() => {
                                    s3CounterEl.style.transform = 'scale(1)';
                                }, 250);
                            }
                        }
                    };

                    let count = parseInt(localStorage.getItem(lsKey)) || 15420;
                    renderS3Count(count, false);

                    const scheduleNextS3Increment = () => {
                        const delay = Math.random() * 4000 + 4000;
                        setTimeout(() => {
                            // Increment logic matches Stage 1 for parity
                            const increment = Math.floor(Math.random() * 3) + 1;
                            count = (parseInt(localStorage.getItem(lsKey)) || count) + increment;
                            
                            localStorage.setItem(lsKey, count);
                            renderS3Count(count, true);
                            scheduleNextS3Increment();
                        }, delay);
                    };

                    scheduleNextS3Increment();

                    // Still poll occasionally in case of cross-tab sync, but less frequently
                    window.addEventListener('storage', (e) => {
                        if (e.key === lsKey) {
                            count = parseInt(e.newValue) || count;
                            renderS3Count(count, true);
                        }
                    });
                }

                // 5. Dynamic FAQ
                const faqList = document.getElementById('faq-list');
                const faqData = currentVariant.landingSections?.faq || [];
                
                if (faqList && faqData.length > 0) {
                    faqList.innerHTML = faqData.map((item, idx) => `
                        <div class="offer-faq-item">
                            <div class="offer-faq-question" onclick="this.parentElement.classList.toggle('faq-open')">
                                <span>${item.q}</span>
                                <span class="offer-faq-arrow">▼</span>
                            </div>
                            <div class="offer-faq-answer">
                                <p>${item.a}</p>
                            </div>
                        </div>
                    `).join('');
                }
            }
        } else {
            // Standard natal_chart_price button text
            const btnTextSpan = upgradeButton.querySelector('.btn-text');
            if (btnTextSpan) {
                btnTextSpan.innerHTML = `
                    Дізнатися всі подробиці
                    <span class="font-bold tracking-widest flex gap-[1px]">
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                        <span class="runway-arrow">&gt;</span>
                    </span>
                `;
            }
        }

        // --- Time Placeholder Logic ---
        function updateTimePlaceholder() {
            if (!birthTimeInput || !timePlaceholder) return;

            if (!birthTimeInput.value) {
                timePlaceholder.innerText = 'Обери час';
                timePlaceholder.style.color = 'var(--secondary-text-color)';
            } else {
                timePlaceholder.innerText = birthTimeInput.value;
                timePlaceholder.style.color = 'var(--primary-text-color)';

                if (birthTimeWrapper) birthTimeWrapper.classList.remove('input-error');
                if (timeErrorMessage) timeErrorMessage.style.display = 'none';
            }
        }
        if (birthTimeInput) {
            birthTimeInput.addEventListener('input', updateTimePlaceholder);
            birthTimeInput.addEventListener('change', updateTimePlaceholder);
            birthTimeInput.addEventListener('blur', updateTimePlaceholder);
            updateTimePlaceholder();
        }

        // --- Input Error Cleaning ---
        if (birthCityInput) {
            birthCityInput.addEventListener('input', () => {
                if (cityErrorMessage) cityErrorMessage.style.display = 'none';
                if (cityInfoMessage) cityInfoMessage.style.display = 'none';
                birthCityInput.classList.remove('input-error');
            });
        }
    }

    // --- Helper: Loading State ---
    function setButtonLoading(button, isLoading) {
        if (!button) return;
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    // --- Helper: Handle City Errors ---
    function handleCityError(type, cityName) {
        if (!cityErrorMessage || !birthCityInput) return;
        if (type === 'ambiguous') {
            cityErrorMessage.innerText = `Місто "${cityName}" знайдено в кількох місцях. Уточни, додавши країну (напр: ${cityName}, Україна).`;
        } else {
            cityErrorMessage.innerText = `Не можемо знайти місто "${cityName}". Перевір назву.`;
        }
        cityErrorMessage.style.display = 'block';
        birthCityInput.classList.add('input-error');
    }

    // --- Event Listeners ---
    upgradeButton.addEventListener('click', async () => {
        if (isNatalChartPrice) {
            const time = birthTimeInput ? birthTimeInput.value : '';
            let city = birthCityInput ? birthCityInput.value.trim() : '';
            const originalUserCityInput = city;

            let hasBlockingErrors = false;

            // Reset UI Messages
            if (cityErrorMessage) cityErrorMessage.style.display = 'none';
            if (timeErrorMessage) timeErrorMessage.style.display = 'none';
            if (birthTimeWrapper) birthTimeWrapper.classList.remove('input-error');
            if (birthCityInput) birthCityInput.classList.remove('input-error');

            // Validation: Empty fields
            if (!city) {
                if (birthCityInput) birthCityInput.classList.add('input-error');
                if (cityErrorMessage) {
                    cityErrorMessage.innerText = "Будь ласка, введи місто народження.";
                    cityErrorMessage.style.display = 'block';
                }
                hasBlockingErrors = true;
            }

            if (!time) {
                if (birthTimeWrapper) birthTimeWrapper.classList.add('input-error');
                if (timeErrorMessage) timeErrorMessage.style.display = 'block';
                hasBlockingErrors = true;
            }

            if (hasBlockingErrors) {
                if (premiumFormContainer) {
                    premiumFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                if (navigator.vibrate) navigator.vibrate(50);
                return;
            }

            // Geo API
            setButtonLoading(upgradeButton, true);

            const coords = await getCoordinates(city);
            let infoText = null;

            if (coords && coords.latitude) {
                if (coords.corrected_name) {
                    if (birthCityInput) birthCityInput.value = coords.corrected_name;
                    city = coords.corrected_name;

                    if (originalUserCityInput.toLowerCase() !== coords.corrected_name.toLowerCase()) {
                        infoText = `Ми уточнили: ${coords.corrected_name} 😉`;
                    }
                }

                state.set('geo', {
                    latitude: coords.latitude || coords.lat,
                    longitude: coords.longitude || coords.lon,
                    timezone: coords.timezone
                });
                state.set('city', coords.corrected_name);

            } else if (coords && coords.error === 'ambiguous') {
                handleCityError('ambiguous', city);
                hasBlockingErrors = true;
            } else {
                handleCityError('not_found', city);
                hasBlockingErrors = true;
            }

            if (infoText && cityInfoMessage) {
                cityInfoMessage.innerText = infoText;
                cityInfoMessage.style.display = 'block';
            } else if (cityInfoMessage) {
                cityInfoMessage.style.display = 'none';
            }

            if (hasBlockingErrors) {
                setButtonLoading(upgradeButton, false);
                if (navigator.vibrate) navigator.vibrate(50);
                return;
            }

            // Success
            state.set('time', time);

            const fullUserData = {
                date: state.get('date'),
                time: time,
                city: state.get('city'),
                geo: state.get('geo')
            };
            state.set('userData', fullUserData);

            // 🔥 OFFER VARIANT: Direct Payment (bypass /paywall)
            if (isNatalChartOffer) {
                const doPayment = async () => {
                    try {
                        const currentPrices = getPrices();

                        // 🔥 ANALYTICS: Fire trackBeginCheckout ONCE, only after valid form
                        if (window.DC_Analytics?.trackBeginCheckout) {
                            window.DC_Analytics.trackBeginCheckout(
                                currentPrices.charge.FULL_REPORT,
                                'Natal Chart Full Report'
                            );
                        }

                        const savedPlanets = state.get('planets');
                        let enrichedUserData = savedPlanets
                            ? { ...fullUserData, planets: savedPlanets }
                            : { ...fullUserData };

                        const productName = currentVariant?.productName || 'Natal Chart Full Report';
                        const currentEmail = state.get('email') || '';

                        // Backup variant to localStorage
                        try {
                            localStorage.setItem('pendingVariantId', currentVariant.id);
                        } catch (e) { /* noop */ }

                        let returnQuery = 'source=offer';
                        if (currentVariant?.id) returnQuery += `&variant=${currentVariant.id}`;

                        await processPayment(
                            { name: productName, price: currentPrices.charge.FULL_REPORT },
                            { email: currentEmail },
                            enrichedUserData,
                            { returnQueryParams: returnQuery, variant: currentVariant?.id }
                        );
                    } catch (error) {
                        console.error('❌ Offer Payment Error:', error);
                        setButtonLoading(upgradeButton, false);
                    }
                };

                if (infoText) {
                    setTimeout(doPayment, 1200);
                } else {
                    doPayment();
                }
                return; // Don't navigate to paywall
            }

            setTimeout(() => {
                router.navigateTo('paywall');
            }, infoText ? 1200 : 0);

        } else {
            // Standard Natal Chart: Go to premium data screen
            router.navigateTo('premium');
        }
    });

    if (skipButton) {
        skipButton.addEventListener('click', async () => {
            if (!isNatalChartPrice) return;
            
            let city = birthCityInput ? birthCityInput.value.trim() : '';
            const originalUserCityInput = city;

            // Reset errors
            if (cityErrorMessage) cityErrorMessage.style.display = 'none';
            if (timeErrorMessage) timeErrorMessage.style.display = 'none';
            if (birthCityInput) birthCityInput.classList.remove('input-error');
            if (birthTimeWrapper) birthTimeWrapper.classList.remove('input-error');

            // Validation: City is REQUIRED even for skip
            if (!city) {
                if (birthCityInput) birthCityInput.classList.add('input-error');
                if (cityErrorMessage) {
                    cityErrorMessage.innerText = "Будь ласка, введи місто, навіть якщо не знаєш часу.";
                    cityErrorMessage.style.display = 'block';
                }
                if (navigator.vibrate) navigator.vibrate(50);
                return;
            }

            setButtonLoading(upgradeButton, true);
            skipButton.disabled = true;

            const coords = await getCoordinates(city);
            let infoText = null;
            let hasError = false;

            if (coords && coords.latitude) {
                if (coords.corrected_name) {
                    if (birthCityInput) birthCityInput.value = coords.corrected_name;
                    city = coords.corrected_name;

                    if (originalUserCityInput.toLowerCase() !== coords.corrected_name.toLowerCase()) {
                        infoText = `Ми уточнили: ${coords.corrected_name} 😉`;
                    }
                }

                state.set('geo', {
                    latitude: coords.latitude || coords.lat,
                    longitude: coords.longitude || coords.lon,
                    timezone: coords.timezone
                });
                state.set('city', coords.corrected_name);
                state.set('time', '');

            } else if (coords && coords.error === 'ambiguous') {
                handleCityError('ambiguous', city);
                hasError = true;
            } else {
                handleCityError('not_found', city);
                hasError = true;
            }

            if (infoText && cityInfoMessage) {
                cityInfoMessage.innerText = infoText;
                cityInfoMessage.style.display = 'block';
            }

            if (hasError) {
                setButtonLoading(upgradeButton, false);
                skipButton.disabled = false;
                if (navigator.vibrate) navigator.vibrate(50);
                return;
            }

            // Success
            const fullUserData = {
                date: state.get('date'),
                time: '',
                city: state.get('city'),
                geo: state.get('geo')
            };
            state.set('userData', fullUserData);

            // 🔥 OFFER VARIANT: Direct Payment (skip button flow)
            if (isNatalChartOffer) {
                const doPayment = async () => {
                    try {
                        const currentPrices = getPrices();

                        if (window.DC_Analytics?.trackBeginCheckout) {
                            window.DC_Analytics.trackBeginCheckout(
                                currentPrices.charge.FULL_REPORT,
                                'Natal Chart Full Report'
                            );
                        }

                        const savedPlanets = state.get('planets');
                        let enrichedUserData = savedPlanets
                            ? { ...fullUserData, planets: savedPlanets }
                            : { ...fullUserData };

                        const productName = currentVariant?.productName || 'Natal Chart Full Report';
                        const currentEmail = state.get('email') || '';

                        try {
                            localStorage.setItem('pendingVariantId', currentVariant.id);
                        } catch (e) { /* noop */ }

                        let returnQuery = 'source=offer';
                        if (currentVariant?.id) returnQuery += `&variant=${currentVariant.id}`;

                        await processPayment(
                            { name: productName, price: currentPrices.charge.FULL_REPORT },
                            { email: currentEmail },
                            enrichedUserData,
                            { returnQueryParams: returnQuery, variant: currentVariant?.id }
                        );
                    } catch (error) {
                        console.error('❌ Offer Skip Payment Error:', error);
                        setButtonLoading(upgradeButton, false);
                        skipButton.disabled = false;
                    }
                };

                if (infoText) {
                    setTimeout(doPayment, 1200);
                } else {
                    doPayment();
                }
                return;
            }

            setTimeout(() => {
                router.navigateTo('paywall');
            }, infoText ? 1200 : 0);
        });
    }

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

    /**
     * 🔥 ACCORDION AND INTERACTIVITY LOGIC
     */
    function attachAccordionListeners(containerEl) {
        const headers = containerEl.querySelectorAll('.accordion-header');
        const items = containerEl.querySelectorAll('.accordion-item');
        const nextButtons = containerEl.querySelectorAll('.next-section-btn');

        function toggleSection(index, keepOthersOpen = false) {
            items.forEach((item, i) => {
                const content = item.querySelector('.accordion-content');
                const icon = item.querySelector('.accordion-icon');

                if (i === index) {
                    if (item.classList.contains('accordion-open')) {
                        // Close
                        item.classList.remove('accordion-open');
                        if (content) content.style.maxHeight = null;
                        if (icon) icon.style.transform = 'rotate(0deg)';
                    } else {
                        // Open
                        item.classList.add('accordion-open');
                        if (content) {
                            content.style.maxHeight = content.scrollHeight + 300 + "px"; // +300 for extra injected content
                        }
                        if (icon) icon.style.transform = 'rotate(180deg)';
                    }

                    setTimeout(() => {
                        const header = item.querySelector('.accordion-header');
                        if (header) {
                            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 300);
                } else {
                    if (!keepOthersOpen) {
                        item.classList.remove('accordion-open');
                        if (content) content.style.maxHeight = null;
                        if (icon) icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        }

        headers.forEach(header => {
            header.addEventListener('click', () => {
                const index = parseInt(header.getAttribute('data-index'));
                toggleSection(index, true); // True = allow multiple open? Or strictly like partner? Partner uses true.
            });
        });

        nextButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetIndex = parseInt(btn.getAttribute('data-target'));
                if (targetIndex < items.length) {
                    toggleSection(targetIndex, true);
                }
            });
        });
    }
}