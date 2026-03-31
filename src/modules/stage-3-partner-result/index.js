/**
 * STAGE 3 - PARTNER RESULT (Combined Free Result + Time/City)
 * 🔥 Комбінований модуль для Partner Match (/man)
 * Об'єднує Stage 3 і Stage 4 в один екран для вищої конверсії.
 */

import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { getCoordinates } from '../../services/geo.service.js';
import { feedbackService } from '../../services/feedback.service.js';

export function init(router) {
    const app = document.getElementById('app');
    app.classList.add('funnel-container');
    app.innerHTML = html;

    // --- DOM Elements: Result Section ---
    const resultTitleEl = document.getElementById('result-title');
    const freeReportTitleEl = document.getElementById('free-report-title');
    const freeReportTextEl = document.getElementById('free-report-text');

    // --- DOM Elements: Form Section ---
    const birthTimeInput = document.getElementById('birth-time');
    const timePlaceholder = document.getElementById('time-placeholder');
    const birthTimeWrapper = birthTimeInput.closest('.input-field');
    const timeErrorMessage = document.getElementById('time-error-message');

    const birthCityInput = document.getElementById('birth-city');
    const cityErrorMessage = document.getElementById('city-error-message');
    const cityInfoMessage = document.getElementById('city-info-message');

    const continueButton = document.getElementById('continue-button');
    const skipButton = document.getElementById('skip-button');
    const premiumFormContainer = document.getElementById('premium-form-container');

    // ========================================================================
    // SECTION 1: RENDER FREE RESULT (copied from stage-3-result)
    // ========================================================================

    const reportData = state.get('freeReport');

    if (!reportData) {
        router.navigateTo('welcome');
        return;
    }

    // Helper to format Markdown-like bold and newlines
    const formatStr = (str) => {
        if (!str) return '';
        return str
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff; font-weight: 400;">$1</strong>')
            .replace(/\\n/g, '<br>');
    };

    let formattedText = '';

    // Partner Match Logic (New JSON Structure)
    if (reportData.superpower || reportData.blind_spot || reportData.teaser_hook) {
        let sections = [];

        if (reportData.superpower) {
            sections.push(`
                <div style="
                    background-color: var(--card-bg-color);
                    border: 1px solid var(--border-color);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 16px;
                ">
                    <h4 style="
                        color: var(--accent-color);
                        font-weight: 700;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        font-size: 0.85em;
                        letter-spacing: 1.5px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        ✨ ${reportData.superpower.title || 'Твоя Суперсила'}
                    </h4>
                    <p style="color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;">
                        ${formatStr(reportData.superpower.text)}
                    </p>
                </div>
            `);
        }

        if (reportData.blind_spot) {
            sections.push(`
                <div style="
                    background-color: var(--card-bg-color);
                    border: 1px solid var(--border-color);
                    border-left: 3px solid var(--accent-color);
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 16px;
                ">
                    <h4 style="
                        color: var(--accent-color);
                        font-weight: 700;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        font-size: 0.85em;
                        letter-spacing: 1.5px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        🔮 ${reportData.blind_spot.title || 'Сліпа Зона'}
                    </h4>
                    <p style="color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;">
                        ${formatStr(reportData.blind_spot.text)}
                    </p>
                </div>
            `);
        }

        // Note: teaser_hook is NOT rendered here because user will fill Time/City form below
        formattedText = sections.join('');

    }

    // Render result
    resultTitleEl.innerText = "Твоя Любовна Карта";

    // Restore Main Title (e.g. "💖 Твій Любовний Сценарій...")
    if (reportData.title) {
        let titleHtml = '';
        const separatorIndex = reportData.title.indexOf(':');

        if (separatorIndex !== -1) {
            // Split into Label and Value
            const labelPart = reportData.title.substring(0, separatorIndex + 1).trim(); // "💖 Твій Любовний Сценарій:"
            const valuePart = reportData.title.substring(separatorIndex + 1).trim();   // "Фатальна Королева..."

            titleHtml = `
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="
                        color: var(--secondary-text-color);
                        font-size: 0.85em;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        margin-bottom: 8px;
                        opacity: 0.8;
                    ">${labelPart}</div>
                    <h3 style="
                        color: var(--accent-color);
                        font-size: 1.15em;
                        font-weight: 700;
                        line-height: 1.3;
                    ">${valuePart}</h3>
                </div>
            `;
        } else {
            // Fallback for simple title
            titleHtml = `
                <h3 style="
                    text-align: center;
                    color: var(--accent-color);
                    font-size: 1.1em;
                    font-weight: 700;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                ">${reportData.title}</h3>
            `;
        }

        freeReportTitleEl.innerHTML = titleHtml;
        freeReportTitleEl.style.display = 'block';
        // Reset inline styles
        freeReportTitleEl.style.textAlign = '';
        freeReportTitleEl.style.color = '';
        freeReportTitleEl.style.textTransform = '';
        freeReportTitleEl.style.letterSpacing = '';
        freeReportTitleEl.style.fontSize = '';
        freeReportTitleEl.style.marginBottom = '';

    } else {
        freeReportTitleEl.style.display = 'none';
    }

    if (reportData.content_blocks) {
        // 🔥 NATAL CHART FORMAT (New structured format)
        const cardHeaders = [
            { emoji: "✨", title: "Твій Зірковий Архетип" },
            { emoji: "⚡️", title: "Прихований Внутрішній Конфлікт" },
            { emoji: "🗝️", title: "Твій Ключ до Змін" }
        ];
        
        const cards = [
            { ...cardHeaders[0], content: formatStr(reportData.content_blocks.archetype || "") },
            { ...cardHeaders[1], content: formatStr(reportData.content_blocks.conflict || "") },
            { ...cardHeaders[2], content: formatStr(reportData.content_blocks.solution || "") }
        ];

        // Format to Accordion directly
        formattedText = cards.map((card, index) => {
            const isFirst = index === 0;
            const isLast = index === cards.length - 1;

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

            return `
                ${isFirst ? arrowAnimStyle : ''}
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
                        <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                    </div>
                    <div class="accordion-content" style="${isFirst ? 'max-height: 1000px;' : 'max-height: 0;'} overflow: hidden; transition: max-height 0.4s ease-out;">
                        <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                            ${card.content}
                            ${!isLast ? `
                                <button class="next-section-btn" data-target="${index + 1}" style="
                                    display: block; width: 100%; margin-top: 20px; padding: 12px;
                                    background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
                                    border-radius: 8px; color: var(--primary-text-color); font-size: 0.9em; cursor: pointer;
                                ">
                                    Читати далі <span class="animate-bounce-small">👇</span>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

    } else if (reportData.psychological_analysis) {
        // 🔥 NEW PARSER: Defined Sections Only
        // We look for specific headers to split the content, ignoring other bold text.

        const rawHtml = reportData.psychological_analysis;
        const sectionHeaders = [
            '💍 Твій любовний парадокс',
            '💍 Хто він',
            '💍 Хто він насправді',
            '⚡️ Хто він',
            '⚡️ Його Енергія',
            '💔 Твоя Фатальна Помилка',
            '📍 Передчуття Зустрічі',
            '🔑 Твій Ключ до Щастя',
            '📋 Чек-лист',
            '📋 Чек-лист: чи підходить він тобі',
            '📋 Чек-лист: чи підходить він тобі?'
        ];

        // Create a regex to split by these headers
        // We use capturing group () to keep the delimiter in the result array
        // The regex will look like: /(💍 Хто він насправді|🔋 Його Енергія|...)/i
        const splitRegex = new RegExp(`(${sectionHeaders.join('|')})`, 'i');

        // Split text. The result array will look like: 
        // ["Intro text...", "💍 Хто він насправді", "Description...", "🔋 Його Енергія", "Desc..."]
        const splitParts = rawHtml.split(splitRegex);

        let sections = [];
        let currentHeader = null;

        splitParts.forEach(part => {
            const cleanPart = part.trim();
            if (!cleanPart) return;

            // Check if this part is one of our known headers
            // We use simple includes check or find in array logic because regex might be case-insensitive
            const matchingHeader = sectionHeaders.find(h => cleanPart.toLowerCase().includes(h.toLowerCase()));

            if (matchingHeader) {
                // It's a header, start a new section context
                currentHeader = matchingHeader;
            } else if (currentHeader) {
                // It's content for the current header
                // Extract emoji from header for styling
                // Extract emoji from header for styling
                const emoji = currentHeader.split(' ')[0] || '✨';
                let titleText = currentHeader.substring(emoji.length).trim();

                // Normalize "Who is he" headers to "Your Love Paradox" visually (Paradox Section)
                if (titleText.includes('Хто він') && emoji === '💍') {
                    titleText = 'Твій любовний парадокс';
                }

                // Normalize "His Energy" to "Who is he" visually (Energy Section)
                if (titleText.includes('Його Енергія')) {
                    titleText = 'Хто він';
                }

                if (titleText.includes('Ключ до Щастя')) {
                    titleText = 'Твоя інструкція до щастя';
                }

                if (titleText.includes('Чек-лист')) {
                    titleText = 'Чек-лист "Нормального мужика"';
                }

                // Cleanup bold tags if they were part of the split (e.g. <b>💍 Header</b>)
                // The split might have left <b> or </b> or : around
                let content = cleanPart;

                // Remove leading/trailing formatting artifacts often left by split
                content = content
                    .replace(/^[:\s]+/, '')
                    .replace(/^<\/b>\s*/i, '')
                    .replace(/^\s*<br\s*\/?>/i, '')
                    .trim();

                sections.push({
                    emoji,
                    title: titleText,
                    content: content
                });

                currentHeader = null; // Reset to wait for next header
            } else {
                // Text appearing before any header (Intro)
                // We can add it as a simple paragraph if needed, or ignore if empty/junk
                if (sections.length === 0 && cleanPart.length > 10) {
                    // Only add if substantial content
                    // formattedText += `<p class="mb-4 opacity-80">${formatStr(cleanPart)}</p>`;
                    // Actually, let's just prepend it to the final output or ignore. 
                    // Usually the AI starts immediately with headers based on prompt.
                }
            }
        });

        // Interactive Word Formatter
        const makeInteractive = (text) => {
            if (!text) return '';
            text = text.replace(/(повному\s+)?(звіті|звіт|описі|опис)(?![^<]*>)/gi, (match, prefix, word) => {
                let displayWord = word;
                const lower = word.toLowerCase();
                if (lower === 'звіт') displayWord = 'ОПИС';
                if (lower === 'звіті') displayWord = 'ОПИСІ';
                if (lower === 'опис') displayWord = 'ОПИС';
                if (lower === 'описі') displayWord = 'ОПИСІ';
                const span = `<span class="interactive-cta" style="color: var(--accent-color); font-weight: 800; text-transform: uppercase; cursor: pointer; text-decoration: underline; text-underline-offset: 3px;">${displayWord}</span>`;
                return prefix ? prefix + span : span;
            });
            text = text.replace(/("?Дізнатися всі подробиці"?)/gi, (match) => {
                return `<span class="interactive-cta" style="color: var(--accent-color); font-weight: 400; cursor: pointer; border: 1px solid var(--accent-color); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${match.replace(/"/g, '')}</span>`;
            });
            return text;
        };

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
                .cta-click-area {
                    transition: transform 0.2s, opacity 0.2s;
                }
                .cta-click-area:active {
                    transform: scale(0.98);
                    opacity: 0.8;
                }
            </style>
        `;

        if (sections.length > 0) {
            // Now generate HTML for sections (Partner Match style)
            const accordionHtml = sections.map((section, index) => {
                const isFirst = index === 0;
                const isLast = index === sections.length - 1;

                // Strip <b> tags (from backend HTML) but keep <strong> (from formatStr Markdown conversion)
                let content = section.content.replace(/<\/?b>/gi, '');

                const mixPhrase = "Саме цей мікс";
                if (content.includes(mixPhrase)) {
                    const parts = content.split(mixPhrase);
                    if (parts.length > 1) {
                        const endOfSentenceIndex = parts[1].indexOf('.');
                        if (endOfSentenceIndex !== -1) {
                            const before = parts[0] + mixPhrase + parts[1].substring(0, endOfSentenceIndex + 1);
                            const after = parts[1].substring(endOfSentenceIndex + 1);
                            const newSentence = ' Щоб отримати повний ОПИС - введи час та місце свого народження нижче і тисни на кнопку "Дізнатися всі подробиці".';
                            content = before + newSentence + after;
                        }
                    }
                }

                if (isLast) {
                    content = content.replace(/^чи підходить він тобі\??/i, '<br><span style="color: var(--accent-color); font-size: 1.05em; font-weight: 600; display: block; margin-bottom: 8px;">Чи підходить він тобі?</span>');
                    content += '<br><br>Щоб отримати повний опис свого <span class="interactive-cta" style="color: var(--accent-color); font-weight: 400; cursor: pointer;">ІДЕАЛЬНОГО ПАРТНЕРА</span> — введи час та місце свого народження нижче і тисни на кнопку Дізнатися всі подробиці.';
                }

                const regularContent = formatStr(makeInteractive(content));

                const ctaHtml = isLast ? `
                    ${arrowAnimStyle}
                    <div class="cta-block" style="margin-top: 24px; background: rgba(205, 164, 94, 0.08); padding: 24px 20px; border-radius: 12px; border: 1px solid rgba(205, 164, 94, 0.2); text-align: center;">
                        <div style="margin-bottom: 20px;">
                            <span style="background-color: rgba(20, 20, 22, 0.8); color: var(--secondary-text-color); padding: 4px 12px; border-radius: 20px; font-size: 0.75em; text-transform: uppercase; letter-spacing: 1px; border: 1px solid var(--border-color); backdrop-filter: blur(4px);">АЛЕ ЦЕ ЩЕ НЕ ВСЕ</span>
                        </div>
                        <p style="margin-bottom: 8px; font-size: 1.05em; line-height: 1.5; color: var(--primary-text-color); text-align: center;">
                            Це лише <span style="color: var(--accent-color); font-weight: 700;">8%</span> інформації про твої стосунки та кохання...
                        </p>
                        <div style="display: inline-block; text-align: left; margin-bottom: 24px; width: 100%;">
                            <p style="margin-bottom: 14px; font-size: 0.9em; color: var(--secondary-text-color); text-align: center; font-style: italic; font-weight: 400;">
                                Дізнайся все про свого майбутнього обранця:
                            </p>
                            <ul style="list-style: none; padding: 0; margin: 0 auto; color: var(--secondary-text-color); font-size: 0.95em; line-height: 1.8; max-width: 280px;">
                                <li style="display: flex; align-items: center; margin-bottom: 6px;"><span style="margin-right: 10px; font-size: 1.2em;">🎭</span> <strong style="color: var(--primary-text-color);">Психологічний Портрет</strong></li>
                                <li style="display: flex; align-items: center; margin-bottom: 6px;"><span style="margin-right: 10px; font-size: 1.2em;">🔗</span> <strong style="color: var(--primary-text-color);">Кармічна Сумісність</strong></li>
                                <li style="display: flex; align-items: center; margin-bottom: 6px;"><span style="margin-right: 10px; font-size: 1.2em;">📍</span> <strong style="color: var(--primary-text-color);">Ймовірні обставини зустрічі</strong></li>
                                <li style="display: flex; align-items: center; margin-bottom: 6px;"><span style="margin-right: 10px; font-size: 1.2em;">💄</span> <strong style="color: var(--primary-text-color);">Секрети Зваблення</strong></li>
                                <li style="display: flex; align-items: center;"><span style="margin-right: 10px; font-size: 1.2em;">💞</span> <strong style="color: var(--primary-text-color);">Побудова стосунків</strong></li>
                            </ul>
                        </div>
                        <div class="interactive-cta cta-click-area" style="cursor: pointer; padding: 10px; border-radius: 8px; border: 1px solid transparent; margin: 0 -10px;">
                            <p style="margin: 0; font-weight: 700; color: var(--accent-color); font-size: 0.95em; text-align: center; white-space: nowrap;">
                                <span class="animate-bounce-small">⬇️</span> Введи час та місце народження
                            </p>
                        </div>
                    </div>
                ` : '';

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
                                <span style="font-size: 1.2em;">${section.emoji}</span> ${section.title}
                            </h4>
                            <span class="accordion-icon" style="color: var(--secondary-text-color); font-size: 0.8em;">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div style="padding: 0 20px 20px 20px; color: var(--secondary-text-color); line-height: 1.7; font-size: 0.95em;" class="accordion-text-content">
                                ${regularContent}
                                ${ctaHtml}
                                ${!isLast ? `
                                    <button class="next-section-btn" data-target="${index + 1}">
                                        Читати далі 👇
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            formattedText = accordionHtml;
        } else {
            // Fallback for standard Natal Chart which has no specific partner headers
            // We just render the rawHtml safely
            formattedText = formatStr(makeInteractive(rawHtml));
        }

    } else {
        formattedText = '<p>Дані відсутні.</p>';
    }

    freeReportTextEl.innerHTML = formattedText;

    // 🔥 ACCORDION LOGIC HANDLERS
    const headers = freeReportTextEl.querySelectorAll('.accordion-header');
    const items = freeReportTextEl.querySelectorAll('.accordion-item');
    const nextButtons = freeReportTextEl.querySelectorAll('.next-section-btn'); // Restore button logic

    function toggleSection(index, keepOthersOpen = false) {
        items.forEach((item, i) => {
            if (i === index) {
                if (item.classList.contains('accordion-open')) {
                    // Always allow toggling (closing) the current item
                    item.classList.remove('accordion-open');
                } else {
                    item.classList.add('accordion-open');
                    setTimeout(() => {
                        const header = item.querySelector('.accordion-header');
                        if (header) {
                            header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 300);
                }
            } else {
                if (!keepOthersOpen) {
                    item.classList.remove('accordion-open');
                }
            }
        });
    }

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const index = parseInt(header.getAttribute('data-index'));
            // Use 'true' to keep others open, same as "Read Next" button
            // This prevents layout jumps when opening sections manually
            toggleSection(index, true);
        });
    });

    // Restore button functionality
    nextButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetIndex = parseInt(btn.getAttribute('data-target'));
            if (targetIndex < items.length) {
                toggleSection(targetIndex, true);
            }
        });
    });

    // Variant UI override for title
    const currentVariant = state.get('currentVariant');
    if (currentVariant?.ui?.results?.title) {
        resultTitleEl.innerText = currentVariant.ui.results.title;
    }

    // ========================================================================
    // SECTION 2: TIME & CITY FORM LOGIC (copied from stage-4-premium)
    // ========================================================================

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

    birthTimeInput.addEventListener('input', updateTimePlaceholder);
    birthTimeInput.addEventListener('change', updateTimePlaceholder);
    birthTimeInput.addEventListener('blur', updateTimePlaceholder);
    updateTimePlaceholder();

    // --- Input Error Cleaning ---
    birthCityInput.addEventListener('input', () => {
        cityErrorMessage.style.display = 'none';
        cityInfoMessage.style.display = 'none';
        birthCityInput.classList.remove('input-error');
    });

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
        if (type === 'ambiguous') {
            cityErrorMessage.innerText = `Місто "${cityName}" знайдено в кількох місцях. Уточни, додавши країну (напр: ${cityName}, Україна).`;
        } else {
            cityErrorMessage.innerText = `Не можемо знайти місто "${cityName}". Перевір назву.`;
        }
        cityErrorMessage.style.display = 'block';
        birthCityInput.classList.add('input-error');
    }

    // ========================================================================
    // SECTION 3: MAIN BUTTON HANDLER (Continue with Time + City)
    // ========================================================================

    continueButton.addEventListener('click', async () => {
        const time = birthTimeInput.value;
        let city = birthCityInput.value.trim();
        const originalUserCityInput = city;

        let hasBlockingErrors = false;

        // Reset UI Messages
        cityErrorMessage.style.display = 'none';
        timeErrorMessage.style.display = 'none';
        if (birthTimeWrapper) birthTimeWrapper.classList.remove('input-error');
        birthCityInput.classList.remove('input-error');

        // Validation: Empty fields
        if (!city) {
            birthCityInput.classList.add('input-error');
            cityErrorMessage.innerText = "Будь ласка, введи місто народження.";
            cityErrorMessage.style.display = 'block';
            hasBlockingErrors = true;
        }

        if (!time) {
            if (birthTimeWrapper) birthTimeWrapper.classList.add('input-error');
            timeErrorMessage.style.display = 'block';
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
        setButtonLoading(continueButton, true);

        const coords = await getCoordinates(city);
        let infoText = null;

        if (coords && coords.latitude) {
            if (coords.corrected_name) {
                birthCityInput.value = coords.corrected_name;
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

        if (infoText) {
            cityInfoMessage.innerText = infoText;
            cityInfoMessage.style.display = 'block';
        } else {
            cityInfoMessage.style.display = 'none';
        }

        if (hasBlockingErrors) {
            setButtonLoading(continueButton, false);
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

        setTimeout(() => {
            router.navigateTo('paywall');
        }, infoText ? 1200 : 0);
    });

    // ========================================================================
    // SECTION 4: SKIP BUTTON HANDLER (City only, no time)
    // ========================================================================

    skipButton.addEventListener('click', async () => {
        let city = birthCityInput.value.trim();
        const originalUserCityInput = city;

        // Reset errors
        cityErrorMessage.style.display = 'none';
        timeErrorMessage.style.display = 'none';
        birthCityInput.classList.remove('input-error');
        if (birthTimeWrapper) birthTimeWrapper.classList.remove('input-error');

        // Validation: City is REQUIRED even for skip
        if (!city) {
            birthCityInput.classList.add('input-error');
            cityErrorMessage.innerText = "Будь ласка, введи місто, навіть якщо не знаєш часу.";
            cityErrorMessage.style.display = 'block';
            if (navigator.vibrate) navigator.vibrate(50);
            return;
        }

        setButtonLoading(continueButton, true);
        skipButton.disabled = true;

        const coords = await getCoordinates(city);
        let infoText = null;
        let hasError = false;

        if (coords && coords.latitude) {
            if (coords.corrected_name) {
                birthCityInput.value = coords.corrected_name;
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

        if (infoText) {
            cityInfoMessage.innerText = infoText;
            cityInfoMessage.style.display = 'block';
        }

        if (hasError) {
            setButtonLoading(continueButton, false);
            skipButton.disabled = false;
            if (navigator.vibrate) navigator.vibrate(50);
            return;
        }

        const fullUserData = {
            date: state.get('date'),
            time: '',
            city: state.get('city'),
            geo: state.get('geo')
        };
        state.set('userData', fullUserData);

        setTimeout(() => {
            router.navigateTo('paywall');
        }, infoText ? 1200 : 0);
    });

    // ========================================================================
    // SECTION 5: FEEDBACK SYSTEM (optional, like in stage-3-result)
    // ========================================================================

    renderFeedbackSystem();

    function renderFeedbackSystem() {
        if (document.querySelector('.feedback-controls')) return;

        const container = document.createElement('div');
        container.className = 'feedback-controls';
        container.style.marginTop = '15px';
        container.style.marginBottom = '0';
        container.style.borderTop = 'none';
        container.style.paddingTop = '0';

        const buttonsRow = document.createElement('div');
        buttonsRow.className = 'feedback-buttons';

        const btnLike = createFeedbackIcon('👍', 'like');
        const btnDislike = createFeedbackIcon('👎', 'dislike');

        buttonsRow.appendChild(btnDislike);
        buttonsRow.appendChild(btnLike);
        container.appendChild(buttonsRow);

        // Insert feedback AFTER the entire accordion (outside of accordion blocks)
        if (freeReportTextEl && freeReportTextEl.parentNode) {
            freeReportTextEl.after(container);
        }
    }

    function createFeedbackIcon(icon, type) {
        const btn = document.createElement('div');
        btn.className = 'btn-feedback-icon';
        btn.innerText = icon;

        btn.onclick = async () => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.btn-feedback-icon').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            await feedbackService.send({ type, value: type, source: 'partner_free_report' });
            showToast("Дякую! 💜");
        };

        return btn;
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translate(-50%, -20px)';
        toast.style.background = 'linear-gradient(135deg, #0f1115 0%, #1a1c23 100%)';
        toast.style.color = '#fff';
        toast.style.border = '1px solid rgba(205, 164, 94, 0.3)';
        toast.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.8)';
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
