import html from './view.html?raw';
import { state } from '../../utils/state.js';
import { haptics } from '../../utils/haptics.js';
import { initAstroLib } from '../../utils/astro-lib-loader.js';
// 🔥 StarryBackground тепер ініціалізується глобально в main.js


export function init(router) {
    const app = document.getElementById('app');

    // 🔥 Ensure the wrapper matches monolith flex layout if not already set
    app.classList.add('funnel-container')

    // 🛑 ANTI-FLASH: Create a temporary wrapper to modify HTML *before* injecting into DOM
    const tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = html;

    let variant = null;
    try {
        variant = state.get('currentVariant');
        if (variant && variant.ui) {
            console.log("🎨 Applying Variant UI Overrides (Pre-render):", variant.id);

            // Selectors on tempWrapper
            const titleEl = tempWrapper.querySelector('h2');
            const subtitleEl = tempWrapper.querySelector('p.text-lg');
            const btnTextEl = tempWrapper.querySelector('#birth-form button .btn-text');
            const iconContainer = tempWrapper.querySelector('#landing-step > div:first-child > div:first-child');
            const disclaimerEl = tempWrapper.querySelector('#calculation-disclaimer');

            // 🌟 HERO ICON OVERRIDE
            if (iconContainer && variant.ui.heroIcon) {
                iconContainer.innerHTML = variant.ui.heroIcon;
            }

            // 🧑‍🤝‍🧑 /man VARIANT: Title at top, icon pushed above viewport
            if (variant.id === 'man' || variant.id === 'man1uah') {
                // 1. Move content to top instead of vertical center
                const mainWrapper = tempWrapper.querySelector('#landing-step > div:first-child');
                if (mainWrapper) {
                    mainWrapper.style.justifyContent = 'flex-start';
                    // Optional: Visual breathing room at layout top
                    // However, we will SCROLL past this to show the Title first.
                    mainWrapper.style.paddingTop = '60px';
                }
                // 2. Icon stays in DOM, no negative margin.
            }

            // 🌌 /natal_chart VARIANT: Content at top, logo near top edge
            if (variant.id === 'natal_chart' || variant.id === 'natal_chart2' || variant.id === 'natal-chart' || variant.id === 'natal_chart_original' || variant.id === 'natal_chart_price' || variant.id === 'natal_chart_offer' || variant.id === 'natal_chart_landoffer' || variant.id === 'natal_chart_offer1uah') {
                const mainWrapper = tempWrapper.querySelector('#landing-step > div:first-child');
                if (mainWrapper) {
                    mainWrapper.style.justifyContent = 'flex-start';
                    mainWrapper.style.paddingBottom = '10px';
                    // Reduce gap between child elements (default space-y-8 = 32px)
                    mainWrapper.style.gap = '12px';
                }

                // Auto-scroll funnel-container on load to push logo near top edge
                requestAnimationFrame(() => {
                    const funnelContainer = document.querySelector('.funnel-container');
                    if (funnelContainer) {
                        if (variant.id === 'natal_chart_offer' || variant.id === 'natal_chart_landoffer' || variant.id === 'natal_chart_offer1uah') {
                            funnelContainer.scrollTop = 129; // 99 + 30
                        } else {
                            funnelContainer.scrollTop = (variant.id === 'natal_chart2') ? 145 : 99;
                        }
                    }
                });
            }



            // ✏️ HERO TITLE & PRE-TITLE
            if (titleEl && variant.ui.heroTitle) {
                titleEl.innerHTML = variant.ui.heroTitle;

                if (variant.id !== 'february' && variant.id !== 'man' && variant.id !== 'man1uah' && variant.id !== 'natal_chart' && variant.id !== 'natal_chart_original' && variant.id !== 'original' && variant.id !== 'natal_chart2' && variant.id !== 'natal-chart' && variant.id !== 'forecast') {
                    titleEl.classList.remove('font-bold');
                    titleEl.classList.add('font-semibold');
                    titleEl.style.fontFamily = "'Inter', sans-serif";
                }

                if (variant.ui.heroPreTitle) {
                    const preTitle = document.createElement('p');
                    preTitle.className = 'text-base font-semibold mb-3';
                    preTitle.style.cssText = 'color: #cda45e; letter-spacing: 0.5px;';
                    preTitle.innerHTML = variant.ui.heroPreTitle;
                    if (titleEl.parentNode) {
                        titleEl.parentNode.insertBefore(preTitle, titleEl);
                    }
                }
            }

            // ✏️ SUBTITLE
            if (subtitleEl && variant.ui.heroSubtitle) {
                subtitleEl.innerHTML = variant.ui.heroSubtitle;
            }

            // ✏️ BUTTON TEXT
            if (btnTextEl && variant.ui.buttonText) {
                btnTextEl.innerText = variant.ui.buttonText;
            }

            // ✏️ DISCLAIMER
            if (disclaimerEl && variant.ui.buttonDisclaimer) {
                disclaimerEl.innerText = variant.ui.buttonDisclaimer;
                disclaimerEl.style.maxWidth = '100%';
                disclaimerEl.style.margin = '4px auto 0';
                disclaimerEl.style.whiteSpace = 'nowrap';
                disclaimerEl.style.fontSize = '8.5px';
                disclaimerEl.style.letterSpacing = '-0.2px';
                disclaimerEl.style.overflow = 'hidden';
                disclaimerEl.style.textOverflow = 'ellipsis';
            }

            // ➕ HERO FEATURES
            if (variant.ui.heroFeatures) {
                const birthForm = tempWrapper.querySelector('#birth-form');
                if (birthForm && birthForm.parentNode) {
                    const featuresContainer = document.createElement('div');
                    featuresContainer.className = 'hero-features-wrapper';
                    featuresContainer.innerHTML = variant.ui.heroFeatures;
                    birthForm.parentNode.insertBefore(featuresContainer, birthForm.nextSibling);
                }
            }

            // 📊 VARIANT TRACKING (Fires immediately on load if configured)
            if (variant.tracking?.customPixelEvent && window.DC_Analytics?.pushFilteredEvent) {
                window.DC_Analytics.pushFilteredEvent(variant.tracking.customPixelEvent, {
                    event_id: 'vc_' + Date.now(),
                    variant_id: variant.id,
                    page_path: window.location.pathname
                });
            }

        } // End of if (variant && variant.ui)

        // 🔢 LIVE COUNTER (For various variants + Default)
        // Moved OUTSIDE because the default page has no variant, but still needs a counter!
        const counterConfig = {
            'default': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'man': { text: 'жінок вже отримали інструкцію', base: 12367, key: 'man_women_counter' },
            'man1uah': { text: 'жінок вже отримали інструкцію', base: 12367, key: 'man_women_counter' },
            'natal_chart': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'natal_chart_original': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'original': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'natal_chart2': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'natal_chart_price': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'natal_chart_offer': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'natal_chart_landoffer': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'natal_chart_offer1uah': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'forecast': { text: 'жінок вже отримали свій прогноз на рік', base: 8934, key: 'forecast_counter' },
            '1uah': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
            'natal_child': { text: 'жінок вже отримали натальну карту дитини', base: 6712, key: 'natal_child_counter' }
        };

        const activeVariantId = variant ? variant.id : 'default';
        if (counterConfig[activeVariantId]) {
            const conf = counterConfig[activeVariantId];
            const birthFormEl = tempWrapper.querySelector('#birth-form');
            if (birthFormEl) {
                const counterContainer = document.createElement('div');
                counterContainer.className = 'mt-4 mb-2 text-center w-full flex justify-center';
                counterContainer.innerHTML = `
                    <div style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); max-width: 95vw;">
                        <span style="font-size: 14px; flex-shrink: 0;">🔥</span>
                        <span style="font-size: 13px; color: var(--secondary-text-color); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            <strong id="live-women-counter" style="color: var(--accent-color); font-size: 14px; transition: transform 0.2s ease, color 0.2s ease; display: inline-block;">${conf.base.toLocaleString('uk-UA').replace(/\u00a0/g, ' ')}</strong> ${conf.text}
                        </span>
                    </div>
                `;
                // Insert after hero features or form 
                const featuresEl = tempWrapper.querySelector('.hero-features-wrapper');
                const insertAfterEl = featuresEl || birthFormEl;
                insertAfterEl.parentNode.insertBefore(counterContainer, insertAfterEl.nextSibling);
            }
        }

        // 🔥 HIDE DISCLAIMER for specific variants (and default page)
        const disclaimerEl = tempWrapper.querySelector('#calculation-disclaimer');
        if (activeVariantId === 'natal_chart' || activeVariantId === 'natal_chart_original' || activeVariantId === 'original' || activeVariantId === 'natal_chart2' || activeVariantId === 'natal-chart' || activeVariantId === 'natal_chart_price' || activeVariantId === 'natal_chart_offer' || activeVariantId === 'natal_chart_landoffer' || activeVariantId === 'natal_chart_offer1uah' || activeVariantId === 'default' || activeVariantId === '1uah') {
            if (disclaimerEl) disclaimerEl.style.display = 'none';
        }

        // 🌟 🔥 LANDING PAGE INJECTION 🔥 🌟
        if (variant && variant.isLandingPage && variant.landingSections) {
            const landingContainer = tempWrapper.querySelector('#landing-sections-container');
            if (landingContainer) {
                landingContainer.style.display = 'block';
                const sections = variant.landingSections;
                let landingHTML = '';
                
                // --- Pain Section ---
                if (sections.pain) {
                    landingHTML += `
                        <div class="landing-section">
                            <h3 class="landing-title">${sections.pain.title}</h3>
                            <div class="landing-pain-list">
                                ${sections.pain.items.map(item => `<div class="landing-pain-item">${item}</div>`).join('')}
                            </div>
                        </div>
                    `;
                }

                // --- Paradigm Section ---
                if (sections.paradigm) {
                    landingHTML += `
                        <div class="landing-section">
                            <h3 class="landing-title">${sections.paradigm.title}</h3>
                            <p class="landing-text-block">${sections.paradigm.text}</p>
                        </div>
                    `;
                }
                
                // --- Solution Section ---
                if (sections.solution) {
                    landingHTML += `
                        <div class="landing-section">
                            <h3 class="landing-title">${sections.solution.title}</h3>
                            <p class="landing-subtitle">${sections.solution.subtitle}</p>
                            <div class="landing-solution-list">
                                ${sections.solution.items.map(item => `
                                    <div class="landing-solution-item">
                                        <div class="landing-solution-icon">${item.icon}</div>
                                        <div class="landing-solution-text">${item.text}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
                
                // --- How It Works Section ---
                if (sections.howItWorks) {
                    landingHTML += `
                        <div class="landing-section">
                            <h3 class="landing-title">${sections.howItWorks.title}</h3>
                            <div class="landing-how-it-works-card">
                                <p class="landing-text-block">${sections.howItWorks.text}</p>
                            </div>
                        </div>
                    `;
                }

                // --- Features Section ---
                if (sections.features) {
                    landingHTML += `
                        <div class="landing-section">
                            <h3 class="landing-title">${sections.features.title}</h3>
                            <div class="landing-features-grid">
                                ${sections.features.items.map(item => `
                                    <div class="landing-feature-card">
                                        <h4 class="landing-feature-title">${item.title}</h4>
                                        <p class="landing-feature-desc">${item.desc}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
                
                // --- Transformation, Audience, Testimonials and FAQ blocks have been moved exclusively to Stage 3 (Result) ---
                // This keeps the landing page focused and reduces friction before the micro-conversion.

                // Inject Sticky CTA (hidden initially) and bottom form
                const mainFormHTML = tempWrapper.querySelector('#birth-form').outerHTML
                    .replace('id="birth-form"', 'id="birth-form-bottom"')
                    .replace('id="birth-date"', 'id="birth-date-bottom"')
                    .replace('id="submit-btn"', 'id="submit-btn-bottom"')
                    .replace('id="error-message"', 'id="error-message-bottom"')
                    .replace('id="date-placeholder"', 'id="date-placeholder-bottom"');
                
                const stickyCTA = `
                    <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                        <button class="btn btn-primary shadow-2xl" onclick="document.querySelector('.funnel-container').scrollTo({top: 0, behavior: 'smooth'})">
                            <span class="btn-text">${variant?.ui?.buttonText?.toUpperCase() || 'ОТРИМАТИ НАТАЛЬНУ КАРТУ'}</span>
                        </button>
                    </div>
                `;
                
                const bottomForm = `
                    <div class="landing-bottom-form-wrapper" id="bottom-form-wrapper" style="scroll-margin-top: 20px;">
                        <h3 class="landing-title text-center text-xl mb-4 !mt-0">${variant?.ui?.bottomFormTitle || 'Готова змінити життя?'}</h3>
                        ${mainFormHTML}
                    </div>
                `;
                
                landingContainer.innerHTML = landingHTML + bottomForm + stickyCTA;
            }
        }

    } catch (err) {
        console.error("❌ Error preparing variant UI:", err);
    }

    // 🚀 INJECT FINALIZED HTML
    app.innerHTML = tempWrapper.innerHTML;

    // --- 🔥 POST-RENDER LOGIC (Listeners & Global Styles) ---

    // 🧑‍🤝‍🧑 /man VARIANT: Auto-scroll to Header
    if (variant && (variant.id === 'man' || variant.id === 'man1uah' || variant.id === 'forecast')) {
        setTimeout(() => {
            const titleEl = document.querySelector('#landing-step h2');
            const container = document.querySelector('.funnel-container');

            if (titleEl && container) {
                // Calculate offset to scroll title to top (with a bit of padding)
                // We want title to have some visual breathing room, but push it higher to fit the bottom form.
                const titleTop = titleEl.offsetTop;
                const offset = -25; // Negative offset pushes the content higher up the screen

                container.scrollTo({
                    top: titleTop - offset,
                    behavior: 'auto'
                });
            }
        }, 100); // Small delay to ensure layout stability
    }

    try {
        // 🔢 POST-RENDER COUNTER LOGIC (Works for both variants and default)
        const counterConfig = {
            'default': { key: 'natal_chart_counter', base: 15420 },
            'man': { key: 'man_women_counter', base: 12367 },
            'man1uah': { key: 'man_women_counter', base: 12367 },
            'natal_chart': { key: 'natal_chart_counter', base: 15420 },
            'natal_chart_original': { key: 'natal_chart_counter', base: 15420 },
            'original': { key: 'natal_chart_counter', base: 15420 },
            'natal_chart2': { key: 'natal_chart_counter', base: 15420 },
            'natal_chart_price': { key: 'natal_chart_counter', base: 15420 },
            'natal_chart_offer': { key: 'natal_chart_counter', base: 15420 },
            'natal_chart_offer1uah': { key: 'natal_chart_counter', base: 15420 },
            'forecast': { key: 'forecast_counter', base: 8934 },
            '1uah': { key: 'natal_chart_counter', base: 15420 },
            'natal_child': { key: 'natal_child_counter', base: 6712 }
        };

        const activeVariantId = variant ? variant.id : 'default';

        if (counterConfig[activeVariantId]) {
            const conf = counterConfig[activeVariantId];
            const counterEl = document.getElementById('live-women-counter');
            if (counterEl) {
                let count = parseInt(localStorage.getItem(conf.key)) || conf.base;

                const renderCount = (c, animate) => {
                    // Format number with space as thousands separator
                    counterEl.innerText = c.toLocaleString('uk-UA').replace(/\u00a0/g, ' ');
                    if (animate) {
                        counterEl.style.transform = 'scale(1.2)';
                        counterEl.style.color = '#fff';
                        setTimeout(() => {
                            counterEl.style.transform = 'scale(1)';
                            counterEl.style.color = 'var(--accent-color)';
                        }, 250);
                    }
                };

                renderCount(count, false);

                const scheduleNextIncrement = () => {
                    const delay = Math.random() * 4000 + 4000;
                    setTimeout(() => {
                        count += Math.floor(Math.random() * 3) + 1;
                        localStorage.setItem(conf.key, count);
                        renderCount(count, true);
                        scheduleNextIncrement();
                    }, delay);
                };

                scheduleNextIncrement();
            }
        }

        if (variant && variant.ui) {

        }
    } catch (err) {
        console.error("❌ Error attaching post-render variant logic:", err);
    }

    // 🔥 GLOBAL ANIMATION STYLES (Always Injected)
    if (!document.getElementById('global-anim-styles')) {
        const style = document.createElement('style');
        style.id = 'global-anim-styles';
        style.innerHTML = `
            @keyframes gentle-shake {
                0%, 100% { transform: translateX(0); box-shadow: 0 0 0 0 rgba(205, 164, 94, 0); }
                25% { transform: translateX(-5px) rotate(-1deg); }
                75% { transform: translateX(5px) rotate(1deg); box-shadow: 0 0 20px 0 rgba(205, 164, 94, 0.5); }
            }

            /* 🌬️ "Mystic Breath" for Subtitle (used only if element exists) */
            @keyframes mystic-breath {
                0%, 100% { 
                    transform: scale(1); 
                    box-shadow: 0 0 0 rgba(255,255,255,0);
                    border-color: rgba(255,255,255,0.2);
                }
                50% { 
                    transform: scale(0.98); /* Squeeze inward */
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); /* Very subtle glow */
                    border-color: rgba(255,255,255,0.5);
                }
            }
            #hero-subtitle-cta {
                animation: mystic-breath 6s ease-in-out infinite;
            }

            /* ✨ "Star Shine" for Date Input Field ONLY (Stage 1) */
            /* Excludes time input on Stage 4 */
            #landing-step .input-field {
                position: relative;
                overflow: hidden;
            }
            #landing-step .input-field::after {
                content: "";
                position: absolute;
                top: 0;
                left: -50px;
                width: 17px;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.8),
                    transparent
                );
                transform: skewX(-25deg);
                animation: shine-anim 11s infinite;
                animation-delay: 3s;
                pointer-events: none;
                z-index: 5; 
            }
            
            /* ✨ "Star Shine" Restored (Scoped to .shine-effect) */
            .shine-effect {
                position: relative;
                overflow: hidden;
            }
            .shine-effect::after {
                content: "";
                position: absolute;
                top: 0;
                left: -50px;
                width: 17px;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.8),
                    transparent
                );
                transform: skewX(-25deg);
                animation: shine-anim 11s infinite;
                animation-delay: 3s;
                pointer-events: none;
                z-index: 5; 
            }
            
            @keyframes shine-anim {
                0% { left: -50px; }
                45% { left: 150%; } 
                100% { left: 150%; }
            }
        `;
        document.head.appendChild(style);
    }

    // --- DOM Elements (Modals) ---
    const infoModal = document.getElementById('info-modal');
    const legalModal = document.getElementById('legal-modal');

    // Triggers
    const openInfoBtn = document.getElementById('open-info-modal-btn');
    const closeInfoIcon = document.getElementById('close-info-modal-icon');
    const closeInfoBtn = document.getElementById('close-info-modal-btn');

    const closeLegalIcon = document.getElementById('close-legal-modal-icon');
    const closeLegalBtn = document.getElementById('close-legal-modal-btn');
    const legalModalBody = document.getElementById('legal-modal-body');

    const legalLinks = document.querySelectorAll('.legal-link[data-legal-type]');

    // ==========================================
    // MODAL LOGIC (Smart Copy-Paste)
    // ==========================================

    function openInfoModal() {
        if (infoModal) infoModal.style.display = 'flex';
    }

    function closeInfoModal() {
        if (infoModal) infoModal.style.display = 'none';
    }

    function openLegalModal(type) {
        const content = document.getElementById('legal-content-' + type);
        if (content && legalModal && legalModalBody) {
            legalModalBody.innerHTML = content.innerHTML;
            legalModal.style.display = 'flex';
        }
    }

    function closeLegalModal() {
        if (legalModal) legalModal.style.display = 'none';
    }

    // Attach Listeners
    if (openInfoBtn) openInfoBtn.addEventListener('click', () => { haptics.trigger('light'); openInfoModal(); });
    if (closeInfoIcon) closeInfoIcon.addEventListener('click', () => { haptics.trigger('light'); closeInfoModal(); });
    if (closeInfoBtn) closeInfoBtn.addEventListener('click', () => { haptics.trigger('light'); closeInfoModal(); });

    if (closeLegalIcon) closeLegalIcon.addEventListener('click', () => { haptics.trigger('light'); closeLegalModal(); });
    if (closeLegalBtn) closeLegalBtn.addEventListener('click', () => { haptics.trigger('light'); closeLegalModal(); });

    // Close on overlay click
    if (infoModal) {
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) closeInfoModal();
        });
    }
    if (legalModal) {
        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) closeLegalModal();
        });
    }

    // Legal Links Transition Logic (Info -> Legal)
    legalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const type = e.target.getAttribute('data-legal-type');
            closeInfoModal();
            setTimeout(() => {
                openLegalModal(type);
            }, 50); // Slight delay for smoother transition
        });
    });

    // ==========================================
    // FORM LOGIC (Modified for smooth UX)
    // ==========================================
    
    function setupForm(formId, inputId, errorId, placeholderId) {
        const formEl = document.getElementById(formId);
        const inputEl = document.getElementById(inputId);
        const errorEl = document.getElementById(errorId);
        const placeholderEl = document.getElementById(placeholderId);
        
        if (!formEl || !inputEl) return;
        
        const submitBtn = formEl.querySelector('button[type="submit"]');

        // 🔥 Existing logic for validation styling can go here if needed

        // 🆕 Animate Button on Date Selection (Done / Blur)
        inputEl.addEventListener('blur', (e) => {
            if (e.target.value && submitBtn) {
                submitBtn.style.animation = 'none';
                requestAnimationFrame(() => {
                    submitBtn.style.animation = 'gentle-shake 0.5s ease-in-out 2';
                });
                setTimeout(() => {
                    submitBtn.style.animation = '';
                }, 1000);
            }
        });

        // --- 1. Logic: Date Placeholder ---
        function updateDatePlaceholder() {
            const val = inputEl.value;
            if (!val) {
                if (placeholderEl) {
                    placeholderEl.innerText = 'Обрати дату народження';
                    placeholderEl.style.color = 'var(--secondary-text-color)';
                }
            } else {
                const parts = val.split('-');
                if (parts.length === 3) {
                    const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
                    if (placeholderEl) {
                        placeholderEl.innerText = formattedDate;
                        placeholderEl.style.color = 'var(--primary-text-color)';
                    }
                    if (errorEl) errorEl.style.display = 'none';
                    
                    // Sync the other form if it exists
                    const otherInputId = inputId === 'birth-date' ? 'birth-date-bottom' : 'birth-date';
                    const otherInput = document.getElementById(otherInputId);
                    if (otherInput && otherInput.value !== val) {
                        otherInput.value = val;
                        // Trigger 'change' smoothly so the other placeholder updates without loop
                        otherInput.dispatchEvent(new Event('change', { 'bubbles': true }));
                    }
                }
            }
        }

        // --- 2. Logic: Default Date Focus (Silent Set) ---
        function setDefaultDateOnFirstFocus() {
            if (inputEl.value === '') {
                inputEl.value = '1995-01-01';
            }
        }

        // --- Listeners ---
        inputEl.addEventListener('input', updateDatePlaceholder);
        inputEl.addEventListener('change', updateDatePlaceholder);
        inputEl.addEventListener('blur', updateDatePlaceholder);

        inputEl.addEventListener('focus', setDefaultDateOnFirstFocus);
        inputEl.addEventListener('click', setDefaultDateOnFirstFocus);
        inputEl.addEventListener('touchstart', setDefaultDateOnFirstFocus);

        updateDatePlaceholder();

        // --- 3. Logic: Form Submit ---
        formEl.addEventListener('submit', async function (e) {
            e.preventDefault();
            haptics.trigger('heavy');
            const selectedDate = inputEl.value;

            if (selectedDate === '') {
                haptics.trigger('error');
                if (errorEl) {
                    errorEl.innerText = "Будь ласка, обери дату народження.";
                    errorEl.style.display = 'block';
                }
            } else {
                if (errorEl) errorEl.style.display = 'none';

                state.set('date', selectedDate);

                function setButtonLoading(button, isLoading) {
                    if (button) {
                        if (isLoading) {
                            button.classList.add('loading');
                            button.disabled = true;
                        } else {
                            button.classList.remove('loading');
                            button.disabled = false;
                        }
                    }
                }

                setButtonLoading(submitBtn, true);
                initAstroLib();
                router.navigateTo('loading');
            }
        });
    }

    // Initialize MAIN Form
    setupForm('birth-form', 'birth-date', 'error-message', 'date-placeholder');
    
    // Initialize BOTTOM Form (Landing Page)
    setupForm('birth-form-bottom', 'birth-date-bottom', 'error-message-bottom', 'date-placeholder-bottom');
    
    // ==========================================
    // STICKY CTA LOGIC
    // ==========================================
    const stickyCTA = document.getElementById('landing-sticky-cta');
    if (stickyCTA) {
        const funnelContainer = document.querySelector('.funnel-container');
        funnelContainer.addEventListener('scroll', () => {
            // Show after scrolling 500px or pass the hero section
            if (funnelContainer.scrollTop > 500) {
                // Determine if we are at the bottom form
                const bottomFormWrapper = document.getElementById('bottom-form-wrapper');
                if (bottomFormWrapper) {
                    // Hide sticky CTA if bottom form is fully visible
                    const rect = bottomFormWrapper.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 100) {
                        stickyCTA.classList.remove('visible');
                    } else {
                        stickyCTA.classList.add('visible');
                    }
                } else {
                    stickyCTA.classList.add('visible');
                }
            } else {
                stickyCTA.classList.remove('visible');
            }
        });
    }
}