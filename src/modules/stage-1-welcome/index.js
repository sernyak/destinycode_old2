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
            if (variant.id === 'natal_chart' || variant.id === 'natal_chart2' || variant.id === 'natal-chart' || variant.id === 'natal_chart_original' || variant.id === 'natal_chart_price' || variant.id === 'natal_chart_offer' || variant.id === 'natal_chart_landoffer' || variant.id === 'natal_chart_sale' || variant.id === 'natal_chart_offer1uah') {
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
                        if (variant.id === 'natal_chart_offer' || variant.id === 'natal_chart_landoffer' || variant.id === 'natal_chart_sale' || variant.id === 'natal_chart_offer1uah') {
                            funnelContainer.scrollTop = 150; // Changed from 145
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
            'natal_chart_sale': { text: 'жінок вже отримали свою натальну карту', base: 15420, key: 'natal_chart_counter' },
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
        if (activeVariantId === 'natal_chart' || activeVariantId === 'natal_chart_original' || activeVariantId === 'original' || activeVariantId === 'natal_chart2' || activeVariantId === 'natal-chart' || activeVariantId === 'natal_chart_price' || activeVariantId === 'natal_chart_offer' || activeVariantId === 'natal_chart_landoffer' || activeVariantId === 'natal_chart_sale' || activeVariantId === 'natal_chart_offer1uah' || activeVariantId === 'default' || activeVariantId === '1uah') {
            if (disclaimerEl) disclaimerEl.style.display = 'none';
        }

        // 🌟 🔥 LANDING PAGE INJECTION 🔥 🌟
        if (variant && variant.isLandingPage && variant.landingSections) {
            const landingContainer = tempWrapper.querySelector('#landing-sections-container');
            if (landingContainer) {
                landingContainer.style.display = 'block';
                const sections = variant.landingSections;
                
                let landingHTML = '';

                // ===============================================================
                // SALE VARIANT: Custom block order per specification
                // ===============================================================
                if (variant.id === 'natal_chart_sale') {

                    // 1. Paradigm ("Що таке Натальна карта")
                    if (sections.paradigm) {
                        landingHTML += `
                            <div class="landing-section">
                                <h3 class="landing-title">${sections.paradigm.title}</h3>
                                <p class="landing-text-block">${sections.paradigm.text}</p>
                            </div>
                        `;
                    }

                    // 2. WhatItShows ("Що тобі покаже твоя Натальна карта")
                    if (sections.whatItShows) {
                        landingHTML += `
                            <div class="landing-section">
                                <h3 class="landing-title">${sections.whatItShows.title}</h3>
                                <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 24px;">
                                    ${sections.whatItShows.items.map(item => `
                                        <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px 16px; display: flex; gap: 16px; align-items: flex-start; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                                            <div style="font-size: 26px; line-height: 1; flex-shrink: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">${item.icon}</div>
                                            <div style="font-size: 15px; color: var(--secondary-text-color); line-height: 1.45; text-align: left;">
                                                <span class="text-white font-medium">${item.title}</span> — ${item.desc}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }

                    // 3. Science ("Чому Натальній карті можна вірити")
                    landingHTML += `
        <div id="offer-block-science" class="offer-landing-block" >
            <div class="offer-section-card" style="background: rgba(205, 164, 94, 0.03); border: 1px solid rgba(205, 164, 94, 0.15);">
                <h3 class="offer-section-title">Чому Натальній карті <span>можна вірити</span></h3>
                <div class="offer-section-body">
                    <p>Розшифровка Натальної карти від Destiny Code — це <strong>не гороскоп із журналу</strong>. Ми не ділимо 8 мільярдів людей на 12 груп. Це точний персональний розрахунок, і ось чому йому можна довіряти:</p>
                    <div class="offer-science-grid">
                        <div class="offer-science-item">
                            <span class="offer-science-num">01</span>
                            <div>
                                <strong>Фізика та Біоритми</strong>
                                <span>Місяць рухає мільярди тонн води у Світовому океані. Організм людини складається з води на 70-80%. Науково доведено, що у дні повні змінюється гормональний фон і якість сну. Космічні ритми — це реальна фізика, а не містика.</span>
                            </div>
                        </div>
                        <div class="offer-science-item">
                            <span class="offer-science-num">02</span>
                            <div>
                                <strong>Математична Точність</strong>
                                <span>Швейцарські Ефемериди (NASA JPL), сферична геометрія, система Плацидус. За 4 хвилини Земля зсувається на 1 градус — навіть близнюки з різницею у 10 хвилин мають різні долі. Кількість комбінацій перевищує число людей на планеті.</span>
                            </div>
                        </div>
                        <div class="offer-science-item">
                            <span class="offer-science-num">03</span>
                            <div>
                                <strong>Тисячолітня Статистика</strong>
                                <span>Кеплер, Галілей, Карл Юнг — тисячоліттями найкращі уми спостерігали за рухом планет і фіксували закономірності. Юнг називав астрологію "психологією давнини". Ми перетворили цю базу даних у точний алгоритм.</span>
                            </div>
                        </div>
                        <div class="offer-science-item">
                            <span class="offer-science-num">04</span>
                            <div>
                                <strong>Прогноз Погоди, а Не Вирок</strong>
                                <span>Натальна карта — це не вирок, а інструкція. Знаючи свої «налаштування», ти бачиш, де варто «підкласти соломки», а де впевнено тиснути на газ.</span>
                            </div>
                        </div>
                    </div>
                    <div class="offer-quote" style="margin-top: 16px;">
                        <span class="offer-quote-mark">🧭</span>
                        Натальна карта — це як GPS-навігатор. Ти сама тримаєш кермо і натискаєш на педалі. Але їхати вночі без фар — значить постійно ризикувати.
                    </div>
                </div>
            </div>
        </div>
                    `;

                    // 4. Pain ("Тобі потрібна Натальна карта якщо")
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

                    // 5. HowItWorks ("Як працює Розрахунок")
                    if (sections.howItWorks) {
                        landingHTML += `
                            <div class="landing-section" style="text-align: left;">
                                <h3 class="landing-title" style="text-align: center;">${sections.howItWorks.title}</h3>
                                <div class="landing-how-it-works-card">
                                    <p class="landing-text-block" style="text-align: left;">${sections.howItWorks.text}</p>
                                </div>
                            </div>
                        `;
                    }

                    // 6. Structure ("Структура твоєї Натальної карти")
                    landingHTML += `
        <div id="offer-block-transformation" class="offer-landing-block" >
            <div class="offer-section-card">
                <h3 class="offer-section-title">Структура твоєї <span>Натальної карти</span></h3>
                <div class="offer-section-body">
                    <p>Повна розшифровка Натальної Карти — це твоя <strong>інструкція до самої себе</strong>, яка покаже тобі:</p>
                    <div class="offer-feature-grid">
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">✨</span>
                            <div>
                                <strong>Свідоме і Підсвідоме: Твоє Ядро</strong>
                                <span>Твій справжній архетип та вирішення внутрішнього конфлікту, що саботує твої успіхи</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">❤️‍🔥</span>
                            <div>
                                <strong>Стосунки та Кохання</strong>
                                <span>Твій типаж ідеального партнера та як перестати притягувати «не тих» чоловіків</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">💰</span>
                            <div>
                                <strong>Гроші та Реалізація</strong>
                                <span>Де лежить твій фінансовий потенціал і як нарешті пробити "прозору стелю"</span>
                            </div>
                        </div>
                        <div class="offer-feature-item">
                            <span class="offer-feature-icon">🗝️</span>
                            <div>
                                <strong>Призначення та Кармічні Уроки</strong>
                                <span>Твоя справжня місія у цьому житті, таланти та унікальний шлях твоєї душі</span>
                            </div>
                        </div>
                    </div>
                    <div class="offer-feature-item" style="margin-top: 14px; background: rgba(205, 164, 94, 0.06); border-color: rgba(205, 164, 94, 0.15);">
                        <span class="offer-feature-icon">⚡️</span>
                        <div>
                            <strong>Блок Майбутнього (Огляд на 6 місяців)</strong>
                            <span>Головні події, вікна можливостей та ключові астрологічні транзити, які чекають на тебе</span>
                        </div>
                    </div>
                    <div class="offer-feature-item" style="margin-top: 10px; background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08);">
                        <span class="offer-feature-icon">📡</span>
                        <div>
                            <strong>Точні Координати Планет та Вузлів</strong>
                            <span>Карта з градусами і секундами для кожної планети та кармічних вузлів.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `;

                    // 7. Audience ("Для кого Розрахунок")
                    landingHTML += `
        <div id="offer-block-audience-s3" class="offer-landing-block" >
            <div class="offer-section-card">
                <h3 class="offer-section-title" id="s3-audience-title"></h3>
                <div class="offer-section-body">
                    <div class="landing-audience-grid">
                        <div class="landing-audience-card positive">
                            <h4 class="landing-audience-subtitle">✅ Для тих, хто:</h4>
                            <ul class="landing-audience-list" id="s3-audience-for-list"></ul>
                        </div>
                        <div class="landing-audience-card negative">
                            <h4 class="landing-audience-subtitle" id="s3-audience-not-subtitle">❌ Кому НЕ варто:</h4>
                            <ul class="landing-audience-list" id="s3-audience-not-list"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `;

                    // 8. Before/After ("Що зміниться після вивчення")
                    landingHTML += `
        <div id="offer-block-transformation-s3" class="offer-landing-block" >
            <div class="offer-section-card">
                <h3 class="offer-section-title" id="s3-transformation-title"></h3>
                <div class="offer-section-body">
                    <div class="landing-transformation-box">
                        <div class="landing-transformation-item before">
                            <div class="landing-transformation-badge">Раніше:</div>
                            <p id="s3-transformation-before"></p>
                        </div>
                        <div class="landing-transformation-arrow">⬇️</div>
                        <div class="landing-transformation-item after">
                            <div class="landing-transformation-badge">З Натальною картою:</div>
                            <p id="s3-transformation-after"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `;

                    // 9. Features ("Що ти можеш дізнатися про себе")
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

                    // 10. Delivery ("Як ти отримаєш свій звіт")
                    landingHTML += `
        <div id="offer-block-delivery" class="offer-landing-block" >
            <div class="offer-section-card">
                <h3 class="offer-section-title">Як ти отримаєш <span>свій звіт</span></h3>
                <div class="offer-section-body">
                    <div class="offer-delivery-list">
                        <div class="offer-delivery-item">
                            <span class="offer-delivery-icon">🌐</span>
                            <div>
                                <strong>На сайті</strong>
                                <span>Твій повний звіт буде доступний на екрані у зручному для читання вигляді</span>
                            </div>
                        </div>
                        <div class="offer-delivery-item">
                            <span class="offer-delivery-icon">📧</span>
                            <div>
                                <strong>На Email</strong>
                                <span>Повний текст + PDF-документ у зручному форматі</span>
                            </div>
                        </div>
                        <div class="offer-delivery-item">
                            <span class="offer-delivery-icon">💬</span>
                            <div>
                                <strong>У Telegram</strong>
                                <span>Бот надішле тобі повний розбір у чат</span>
                            </div>
                        </div>
                        <div class="offer-delivery-item">
                            <span class="offer-delivery-icon">🔗</span>
                            <div>
                                <strong>Персональне посилання</strong>
                                <span>Унікальний URL, за яким звіт доступний назавжди</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    `;

                    // 11. Mockup ("Приклад PDF-варіанту твоєї Карти")
                    landingHTML += `
        <div id="offer-preview-block" class="offer-mockup-section" >
            <h3 class="offer-section-title" id="mockup-title-heading" >Приклад <span>PDF-варіанту</span> твоєї Карти</h3>
            <div class="offer-mockup-image-wrapper" id="mockup-carousel-main-wrapper">
                <div id="mockup-carousel-scroll"></div>
            </div>
            <div id="destiny-dots-new" class="destiny-dots-container-new"></div>
            <p class="offer-mockup-caption" id="mockup-caption-text"></p>
        </div>
                    `;

                    // 12. Reviews ("Що кажуть ті, хто вже отримав повний Розрахунок")
                    landingHTML += `
        <div id="offer-block-reviews" class="offer-landing-block" >
            <div id="reviews-container" class="offer-section-card" style="padding: 24px 16px; border-top: none; background: transparent; border: none; box-shadow: none;">
                <h3 class="offer-section-title" style="margin-bottom: 24px;">Що кажуть ті, хто вже отримав повний <span>Розрахунок</span></h3>
                <div id="reviews-list" style="display: flex; flex-direction: column; gap: 14px;"></div>
            </div>
        </div>
                    `;

                    // 13. Guarantee ("Гарантія повернення коштів")
                    landingHTML += `
        <div id="offer-block-guarantee" class="offer-landing-block" >
            <div class="offer-guarantee-container">
                <div class="offer-guarantee-card">
                    <div class="offer-guarantee-badge">
                        <span class="guarantee-icon">🛡️</span>
                    </div>
                    <div class="offer-guarantee-content">
                        <h3 class="guarantee-title">100% Впевненість у якості</h3>
                        <p class="guarantee-text">Ми на 100% впевнені у глибині та точності нашої Розшифровки. Якщо протягом 24 годин ти вирішиш, що звіт тобі не підійшов — ми повернемо кошти без зайвих питань.</p>
                    </div>
                </div>
            </div>
        </div>
                    `;

                    // 14. FAQ ("Часті запитання")
                    landingHTML += `
        <div id="offer-block-faq" class="offer-landing-block" >
            <div class="offer-section-card" style="border-top: 1px solid rgba(255,255,255,0.1);">
                <h3 class="offer-section-title">Часті <span>запитання</span></h3>
                <div id="faq-list" class="offer-faq-list"></div>
            </div>
        </div>
                    `;

                    // 15. Form block ("Отримай повну розшифровку твоєї Натальної карти")
                    landingHTML += `
        <div id="premium-form-title-container" class="space-y-2 text-center" style="margin-top: 36px; scroll-margin-top: 10px;">
            <h2 class="text-2xl font-bold text-white tracking-tight">
                Отримай повну розшифровку своєї <span class="text-[#cda45e]">Натальної карти</span>
            </h2>
            <p class="text-sm" style="color: var(--secondary-text-color);">
                Введи час і місце народження - і отримай свій персональний звіт одразу після оплати
            </p>
        </div>

        <div id="premium-form-container" class="w-full space-y-5 mt-4" >

            <!-- Time Input -->
            <div>
                <label for="birth-time" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2"
                    style="color: var(--accent-color);">Час народження</label>

                <div
                    class="input-field h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                    <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2"
                        style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>

                    <span id="time-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обери
                        час</span>
                    <input type="time" id="birth-time" name="birth-time"
                        class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10">
                </div>

                <p id="time-error-message" class="error-text" >
                    Будь ласка, обери час народження.
                </p>
                <p style="color: rgba(255,255,255,0.4); font-size: 10px; text-align: center; margin-top: 8px; line-height: 1.3; font-weight: 300;">
                    Якщо не знаєш точного часу &mdash; не страшно, наші алгоритми адаптують розрахунок за датою та містом
                </p>
            </div>

            <!-- City Input -->
            <div>
                <label for="birth-city" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2"
                    style="color: var(--accent-color);">Місце народження</label>

                <input type="text" id="birth-city" name="birth-city" placeholder="Наприклад, Київ"
                    class="input-field text-center hover:border-[#cda45e] transition-colors w-full"
                    style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; background-color: var(--card-bg-color) !important; opacity: 1;">

                <style>
                    #birth-city {
                        color: #ffffff !important;
                        -webkit-text-fill-color: #ffffff !important;
                        caret-color: var(--accent-color);
                    }
                    #birth-city:-webkit-autofill,
                    #birth-city:-webkit-autofill:hover,
                    #birth-city:-webkit-autofill:focus,
                    #birth-city:-webkit-autofill:active {
                        -webkit-box-shadow: 0 0 0 30px var(--card-bg-color) inset !important;
                        -webkit-text-fill-color: #ffffff !important;
                        transition: background-color 5000s ease-in-out 0s;
                    }
                    #birth-city::placeholder {
                        color: var(--secondary-text-color);
                        opacity: 0.7;
                        transition: opacity 0.2s ease;
                        -webkit-text-fill-color: var(--secondary-text-color) !important;
                    }
                    #birth-city:focus::placeholder {
                        opacity: 0;
                        color: transparent;
                        -webkit-text-fill-color: transparent !important;
                    }
                </style>

                <p id="city-error-message" class="error-text" >Текст помилки...</p>
                <p id="city-info-message" class="info-text" ></p>
            </div>

            <!-- Validation Error Messages -->
            <div id="offer-validation-error" style="display: none;"
                class="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-red-500 text-sm text-center">
            </div>

            <div id="city-suggestions" class="suggestions-list" ></div>

            <!-- Skip Button -->
            <button type="button" id="skip-button" class="btn btn-skip opacity-80 text-xs mt-1 w-full" style="padding: 12px; height: auto;">
                Розрахунок без точного часу (точність 95%)
            </button>

            <!-- Urgency Timer -->
            <div id="offer-urgency-timer-bottom" style="text-align: center; margin-bottom: 12px; margin-top: 16px;">
                <span style="font-size: 11px; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; background: rgba(205,164,94,0.15); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(205,164,94,0.3); display: inline-block;">
                    Спеціальна ціна діє ще: <span id="offer-timer-display-bottom" style="color: var(--accent-color); font-weight: 700; margin-left: 2px;">15:00</span>
                </span>
            </div>

            <button id="bottom-pay-btn"
                class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden">
                <span class="btn-text flex items-center justify-center gap-2" id="bottom-pay-btn-text">
                    Отримати Розшифровку
                </span>
                <span class="btn-spinner"></span>
            </button>
            <!-- Trust text -->
            <div class="mt-2 flex items-center justify-center opacity-70">
                <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    🔒 Безпечна оплата через Monobank
                </span>
            </div>
        </div>
                    `;

                } else {
                // ===============================================================
                // ALL OTHER LANDING VARIANTS: Original block order
                // ===============================================================

                // --- 1. Paradigm Section (What is Natal Chart) ---
                if (sections.paradigm) {
                    landingHTML += `
                        <div class="landing-section">
                            <h3 class="landing-title">${sections.paradigm.title}</h3>
                            <p class="landing-text-block">${sections.paradigm.text}</p>
                        </div>
                    `;
                }

                // --- 1.5. What It Shows Section ---
                if (sections.whatItShows) {
                    landingHTML += `
                        <div class="landing-section">
                            <h3 class="landing-title">${sections.whatItShows.title}</h3>
                            <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 24px;">
                                ${sections.whatItShows.items.map(item => `
                                    <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px 16px; display: flex; gap: 16px; align-items: flex-start; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                                        <div style="font-size: 26px; line-height: 1; flex-shrink: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">${item.icon}</div>
                                        <div style="font-size: 15px; color: var(--secondary-text-color); line-height: 1.45; text-align: left;">
                                            <span class="text-white font-medium">${item.title}</span> — ${item.desc}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }

                // --- 2. Pain Section ---
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

                // --- 3. How It Works Section ---
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

                // --- 4. Paradox/Solution Section (GPS Navigator) ---
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

                // --- 5. Features Section (What you learn about yourself) ---
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

                // --- 6. Preview Block: Що ти отримаєш безкоштовно ---
                landingHTML += `
                    <div class="landing-section">
                        <h3 class="landing-title">Що ти отримаєш <span>безкоштовно</span></h3>
                        <div class="landing-preview-list">
                            <div class="landing-preview-item">
                                <div class="landing-preview-icon">✨</div>
                                <div class="landing-preview-content">
                                    <div class="landing-preview-title">Твій Зірковий Архетип</div>
                                    <div class="landing-preview-desc">Хто ти за своєю космічною природою</div>
                                </div>
                            </div>
                            <div class="landing-preview-item">
                                <div class="landing-preview-icon">⚡</div>
                                <div class="landing-preview-content">
                                    <div class="landing-preview-title">Прихований Внутрішній Конфлікт</div>
                                    <div class="landing-preview-desc">Що тебе стримує зсередини</div>
                                </div>
                            </div>
                            <div class="landing-preview-item">
                                <div class="landing-preview-icon">🗝️</div>
                                <div class="landing-preview-content">
                                    <div class="landing-preview-title">Твій Ключ до Змін</div>
                                    <div class="landing-preview-desc">Перший крок до трансформації</div>
                                </div>
                            </div>
                        </div>
                        <div class="landing-preview-timer">
                            <span>⏱️</span> Розрахунок займе менше хвилини
                        </div>
                    </div>
                `;

                // --- 7. Welcome Testimonials (Objection-busting reviews) ---
                if (sections.welcomeTestimonials && sections.welcomeTestimonials.length > 0) {
                    landingHTML += `
                        <div class="landing-section">
                            <h3 class="landing-title">Що кажуть ті, хто вже <span>спробував</span></h3>
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                ${sections.welcomeTestimonials.map(rev => `
                                    <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px;">
                                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                            <img src="${rev.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(205, 164, 94, 0.3);">
                                            <div>
                                                <div style="color: #fff; font-weight: 600; font-size: 0.95em;">${rev.name}</div>
                                                <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                                            </div>
                                        </div>
                                        <p style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">
                                            "${rev.text}"
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }

                }

                    // Inject Sticky CTA (hidden initially) and bottom form
                
                let finalBottomForm = '';
                let finalStickyCTA = '';
                
                if (variant.id === 'natal_chart_sale') {
                    // Sale variant already has bottom form integrated manually in extra blocks
                    finalStickyCTA = `
                        <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                            <div style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 440px;">
                                <button id="sticky-action-btn" class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden" onclick="
                                    const topInput = document.getElementById('birth-date');
                                    const fc = document.querySelector('.funnel-container');
                                    const mode = this.getAttribute('data-mode');
                                    
                                    if (mode === 'pay') {
                                        const payBtn = document.getElementById('bottom-pay-btn');
                                        if (payBtn) payBtn.click();
                                        return;
                                    }

                                    if (!topInput || !topInput.value) {
                                        if (fc) fc.scrollTo({top: 150, behavior: 'smooth'});
                                        const err = document.getElementById('error-message');
                                        if(err) {
                                            err.innerText = 'Спочатку обери дату народження';
                                            err.style.display = 'block';
                                        }
                                        if(window.haptics) window.haptics.trigger('error');
                                    } else {
                                        // Analytics Parity: Fire Lead when transitioning to Step 2
                                        if (!window._dcLeadFired && window.DC_Analytics?.pushFilteredEvent) {
                                            window._dcLeadFired = true;
                                            window.DC_Analytics.pushFilteredEvent('lead_confirmed', {
                                                event_id: 'ld_' + Date.now(),
                                                email: state.get('email') || ''
                                            });
                                        }
                                        const title = document.getElementById('premium-form-title-container');
                                        if (title) title.scrollIntoView({behavior: 'smooth', block: 'start'});
                                    }
                                ">
                                    <span class="btn-text" id="sticky-btn-content">
                                        <span class="flex flex-col items-center gap-0 w-full">
                                            <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Почати розрахунок Натальної карти</span>
                                            <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Персональна розшифровка • 100% гарантія</span>
                                        </span>
                                    </span>
                                </button>
                                <div id="sticky-trust-badge" style="text-align: center; margin-top: 6px; display: none;">
                                    <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px; color: rgba(255, 255, 255, 0.5); font-weight: 600;">🔒 Безпечна оплата через Monobank</span>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    const mainFormHTML = tempWrapper.querySelector('#birth-form').outerHTML
                        .replace('id="birth-form"', 'id="birth-form-bottom"')
                        .replace('id="birth-date"', 'id="birth-date-bottom"')
                        .replace('id="submit-btn"', 'id="submit-btn-bottom"')
                        .replace('id="error-message"', 'id="error-message-bottom"')
                        .replace('id="date-placeholder"', 'id="date-placeholder-bottom"');
                    
                    finalStickyCTA = `
                        <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                            <button id="sticky-action-btn" class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden" onclick="document.querySelector('.funnel-container').scrollTo({top: 150, behavior: 'smooth'})">
                                <span class="btn-text" id="sticky-btn-content">${variant?.ui?.buttonText?.toUpperCase() || 'ОТРИМАТИ НАТАЛЬНУ КАРТУ'}</span>
                            </button>
                        </div>
                    `;
                    
                    finalBottomForm = `
                        <div class="landing-bottom-form-wrapper" id="bottom-form-wrapper" style="scroll-margin-top: 20px;">
                            <h3 class="landing-title text-center text-xl mb-4 !mt-0">${variant?.ui?.bottomFormTitle || 'Готова змінити життя?'}</h3>
                            ${mainFormHTML}
                        </div>
                    `;
                }
                
                landingContainer.innerHTML = landingHTML + finalBottomForm + finalStickyCTA;

            }
        }

    } catch (err) {
        console.error("❌ Error preparing variant UI:", err);
    }

    // 🚀 INJECT FINALIZED HTML
    app.innerHTML = tempWrapper.innerHTML;

    // 🔥 Add subtle side chevrons dynamically after DOM insertion (for specific variants if needed)
    if (variant && variant.isLandingPage) {
        const formEl = document.getElementById('birth-form');
        if (formEl) {
            formEl.style.position = 'relative';
            const chevContainer = document.createElement('div');
            chevContainer.innerHTML = `
                <style>
                    @keyframes subtle-arrows {
                        0%, 100% { transform: translateY(0); opacity: 0.2; }
                        50% { transform: translateY(4px); opacity: 0.9; }
                    }
                    .site-chevron {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        pointer-events: none;
                        color: var(--accent-color);
                        top: 78px; /* Aligned with the submit button (down from top of form) */
                    }
                    .site-chevron.left { left: -14px; }
                    .site-chevron.right { right: -14px; }
                    @media (min-width: 400px) {
                        .site-chevron.left { left: -20px; }
                        .site-chevron.right { right: -20px; }
                    }
                    .site-chevron svg { width: 12px; height: 12px; opacity: 0.6; }
                    .site-chevron svg:nth-child(1) { animation: subtle-arrows 1.5s infinite 0s; }
                    .site-chevron svg:nth-child(2) { animation: subtle-arrows 1.5s infinite 0.2s; margin-top: -6px; }
                    .site-chevron svg:nth-child(3) { animation: subtle-arrows 1.5s infinite 0.4s; margin-top: -6px; }
                </style>
                <div class="site-chevron left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="site-chevron right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            `;
            formEl.appendChild(chevContainer);
        }
    }

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

            /* 🔥 OFFER LANDING BLOCKS STYLES                */
            /* ═══════════════════════════════════════════════ */

            .offer-landing-block {
                margin-top: 36px;
            }

            .offer-section-card {
                background: rgba(28, 28, 30, 0.5);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-top: 1px solid rgba(205, 164, 94, 0.2);
                border-radius: 16px;
                padding: 24px 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                position: relative;
                overflow: hidden;
            }

            .offer-section-icon {
                display: none; /* Removed for more premium look */
            }

            .offer-section-title {
                color: #fff;
                font-weight: 700;
                font-size: 1.25em;
                line-height: 1.4;
                text-align: center;
                margin-bottom: 20px;
                letter-spacing: 0.2px;
                text-transform: none;
            }

            .offer-section-title span {
                color: var(--accent-color);
            }

            .offer-section-body {
                color: var(--secondary-text-color);
                font-size: 0.95em;
                line-height: 1.7;
            }

            .offer-section-body p {
                margin-bottom: 12px;
            }

            .offer-section-body strong {
                color: var(--primary-text-color);
                font-weight: 600;
            }

            .offer-section-body em {
                color: var(--accent-color);
                font-style: italic;
            }

            /* Quote Block */
            .offer-quote {
                background: rgba(205, 164, 94, 0.08);
                border-left: 3px solid var(--accent-color);
                border-radius: 0 8px 8px 0;
                padding: 14px 16px;
                margin-top: 16px;
                font-size: 0.95em;
                color: var(--primary-text-color);
                font-style: italic;
                line-height: 1.6;
                display: flex;
                gap: 10px;
                align-items: flex-start;
            }

            .offer-quote-mark {
                font-size: 1.3em;
                flex-shrink: 0;
                font-style: normal;
            }

            /* Feature Grid (4 modules) */
            .offer-feature-grid {
                display: flex;
                flex-direction: column;
                gap: 14px;
                margin-top: 16px;
            }

            .offer-feature-item {
                display: flex;
                gap: 14px;
                align-items: flex-start;
                padding: 14px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 10px;
                transition: border-color 0.2s;
            }

            .offer-feature-item:hover {
                border-color: rgba(205, 164, 94, 0.3);
            }

            .offer-feature-icon {
                font-size: 1.5em;
                flex-shrink: 0;
                margin-top: 2px;
            }

            .offer-feature-item div {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .offer-feature-item strong {
                color: #fff;
                font-size: 0.95em;
            }

            .offer-feature-item span {
                color: var(--secondary-text-color);
                font-size: 0.85em;
                line-height: 1.5;
            }

            /* Delivery List (Grid) */
            .offer-delivery-list {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }

            .offer-delivery-item {
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: center;
                text-align: center;
                padding: 14px 10px;
                background: rgba(255, 255, 255, 0.04);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.08);
            }

            .offer-delivery-icon {
                font-size: 1.6em;
                margin-bottom: 2px;
            }

            .offer-delivery-item div {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .offer-delivery-item strong {
                color: #fff;
                font-size: 0.85em;
                line-height: 1.2;
            }

            .offer-delivery-item span {
                color: var(--secondary-text-color);
                font-size: 0.75em;
                line-height: 1.4;
            }

            /* Science Grid */
            .offer-science-grid {
                display: flex;
                flex-direction: column;
                gap: 16px;
                margin-top: 16px;
            }

            .offer-science-item {
                display: flex;
                gap: 14px;
                align-items: flex-start;
            }

            .offer-science-num {
                font-size: 1.5em;
                font-weight: 800;
                color: var(--accent-color);
                opacity: 0.4;
                flex-shrink: 0;
                min-width: 32px;
                text-align: center;
                line-height: 1;
                margin-top: 2px;
            }

            .offer-science-item div {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .offer-science-item strong {
                color: #fff;
                font-size: 0.95em;
            }

            .offer-science-item span {
                color: var(--secondary-text-color);
                font-size: 0.85em;
                line-height: 1.5;
            }

            /* Cosmic Imprint Preview */
            .offer-cosmic-preview {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-top: 16px;
            }

            .offer-cosmic-item {
                display: flex;
                gap: 10px;
                align-items: center;
                padding: 10px 12px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 10px;
                transition: border-color 0.2s, background 0.2s;
            }

            .offer-cosmic-item:hover {
                border-color: rgba(205, 164, 94, 0.2);
                background: rgba(205, 164, 94, 0.04);
            }

            .offer-cosmic-planet {
                font-size: 1.4em;
                flex-shrink: 0;
            }

            .offer-cosmic-item div {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .offer-cosmic-item strong {
                color: #fff;
                font-size: 0.85em;
            }

            .offer-cosmic-item span {
                color: var(--secondary-text-color);
                font-size: 0.75em;
                line-height: 1.4;
            }

            @media (max-width: 380px) {
                .offer-cosmic-preview {
                    grid-template-columns: 1fr;
                }
            }

            /* FAQ */
            .offer-faq-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .offer-faq-item {
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                overflow: hidden;
                transition: border-color 0.2s;
            }

            .offer-faq-item:hover {
                border-color: rgba(205, 164, 94, 0.2);
            }

            .offer-faq-question {
                padding: 14px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                color: var(--primary-text-color);
                font-weight: 600;
                font-size: 0.9em;
                transition: background 0.2s;
            }

            .offer-faq-question:hover {
                background: rgba(255, 255, 255, 0.03);
            }

            .offer-faq-arrow {
                font-size: 0.7em;
                opacity: 0.5;
                transition: transform 0.3s ease;
            }

            .offer-faq-item.faq-open .offer-faq-arrow {
                transform: rotate(180deg);
            }

            .offer-faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease-out;
            }

            .offer-faq-item.faq-open .offer-faq-answer {
                max-height: 300px;
            }

            .offer-faq-answer p {
                padding: 0 16px 16px;
                color: var(--secondary-text-color);
                font-size: 0.85em;
                line-height: 1.7;
                margin: 0;
            }

            /* Offer CTA Trust Line */
            .offer-trust-line {
                text-align: center;
                margin-top: 6px;
            }

            .offer-trust-line span {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 1.2px;
                color: rgba(255, 255, 255, 0.5);
                font-weight: 600;
            }

            /* Shake Animation for form validation error */
            @keyframes offer-shake {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-6px); }
                40% { transform: translateX(6px); }
                60% { transform: translateX(-4px); }
                80% { transform: translateX(4px); }
            }

            .offer-shake {
                animation: offer-shake 0.5s ease-in-out;
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
            
            @keyframes bounce-subtle {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(5px); }
                60% { transform: translateY(3px); }
            }
        
/* FAQ */
            .offer-faq-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .offer-faq-item {
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                overflow: hidden;
                transition: border-color 0.2s;
            }

            .offer-faq-item:hover {
                border-color: rgba(205, 164, 94, 0.2);
            }

            .offer-faq-question {
                padding: 14px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                color: var(--primary-text-color);
                font-weight: 600;
                font-size: 0.9em;
                transition: background 0.2s;
            }

            .offer-faq-question:hover {
                background: rgba(255, 255, 255, 0.03);
            }

            .offer-faq-arrow {
                font-size: 0.7em;
                opacity: 0.5;
                transition: transform 0.3s ease;
            }

            .offer-faq-item.faq-open .offer-faq-arrow {
                transform: rotate(180deg);
            }

            .offer-faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease-out;
            }

            .offer-faq-item.faq-open .offer-faq-answer {
                max-height: 300px;
            }

            .offer-faq-answer p {
                padding: 0 16px 16px;
                color: var(--secondary-text-color);
                font-size: 0.85em;
                line-height: 1.7;
                margin: 0;
            }

            
`;
        
            document.head.appendChild(style);
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

        // --- Listeners ---
        inputEl.addEventListener('input', updateDatePlaceholder);
        inputEl.addEventListener('change', updateDatePlaceholder);
        inputEl.addEventListener('blur', updateDatePlaceholder);

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
                
                if (variant.id === 'natal_chart_sale') {
                    setButtonLoading(submitBtn, false); // Cancel loading state
                    
                    // Analytics Parity: Fire Lead when transitioning to Step 2
                    if (!window._dcLeadFired && window.DC_Analytics?.pushFilteredEvent) {
                        window._dcLeadFired = true;
                        window.DC_Analytics.pushFilteredEvent('lead_confirmed', {
                            event_id: 'ld_' + Date.now(),
                            email: state.get('email') || ''
                        });
                    }
                    
                    const bottomFormTitle = document.getElementById('premium-form-title-container');
                    if (bottomFormTitle) {
                        bottomFormTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else {
                    router.navigateTo('loading');
                }

            }
        });
    }

    // ==========================================
    // LANDING INTERACTIVITY (FAQ, Carousel)
    // ==========================================
    
    // 1. FAQ Toggle
    const faqQuestions = document.querySelectorAll('.landing-faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.landing-faq-item');
            if (item) {
                item.classList.toggle('active');
            }
        });
    });

    // 2. Mockup Carousel Dots Sync
    const scrollContainer = document.getElementById('mockup-carousel-scroll');
    const dotsContainer = document.getElementById('destiny-dots-new');
    if (scrollContainer && dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.destiny-dot');
        scrollContainer.addEventListener('scroll', () => {
            const index = Math.round(scrollContainer.scrollLeft / scrollContainer.clientWidth);
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }, { passive: true });
    }

    // Initialize MAIN Form
    setupForm('birth-form', 'birth-date', 'error-message', 'date-placeholder');
    
    // Initialize BOTTOM Form (Landing Page)
    if (variant.id !== 'natal_chart_sale') {
        setupForm('birth-form-bottom', 'birth-date-bottom', 'error-message-bottom', 'date-placeholder-bottom');
    }

    // ============================================
    // DIRECT SALES CHECKOUT LOGIC (natal_chart_sale)
    // ============================================
    if (variant.id === 'natal_chart_sale') {
        // === MOCKUP CAROUSEL INITIALIZATION ===
        const mockupData = variant.marketing?.mockup || variant.landingSections?.mockup;
        if (mockupData && mockupData.images?.length > 0) {
            const scrollContainer = document.getElementById('mockup-carousel-scroll');
            const dotsContainer = document.getElementById('destiny-dots-new');
            const captionEl = document.getElementById('mockup-caption-text');

            if (scrollContainer) {
                scrollContainer.innerHTML = mockupData.images.map(src => `
                    <div class="carousel-slide">
                        <img src="${src}" class="offer-mockup-image" alt="PDF Preview">
                    </div>
                `).join('');
            }

            if (dotsContainer) {
                dotsContainer.innerHTML = mockupData.images.map((_, i) =>
                    `<div class="destiny-dot ${i === 0 ? 'active' : ''}"></div>`
                ).join('');

                // Sync dots on scroll
                setTimeout(() => {
                    const dots = dotsContainer.querySelectorAll('.destiny-dot');
                    if (scrollContainer && dots.length > 0) {
                        scrollContainer.addEventListener('scroll', () => {
                            const index = Math.round(scrollContainer.scrollLeft / scrollContainer.clientWidth);
                            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
                        }, { passive: true });
                    }
                }, 100);
            }

            if (captionEl && mockupData.caption) {
                captionEl.innerText = mockupData.caption;
            }
        }

        // === REVIEWS RENDERING ===
        const reviewsListEl = document.getElementById('reviews-list');
        const testimonialsData = variant.landingSections?.testimonials || [];
        if (reviewsListEl && testimonialsData.length > 0) {
            reviewsListEl.innerHTML = testimonialsData.map(rev => `
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 16px; text-align: left;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <img src="${rev.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(205, 164, 94, 0.3);">
                        <div>
                            <div style="color: #fff; font-weight: 600; font-size: 0.95em;">${rev.name}</div>
                            <div style="color: #FFD700; font-size: 0.85em; letter-spacing: 2px; margin-top: 2px;">★★★★★</div>
                        </div>
                    </div>
                    <p style="color: var(--secondary-text-color); font-size: 0.88em; margin: 0; line-height: 1.6; font-style: italic;">
                        "${rev.text}"
                    </p>
                </div>
            `).join('');
        }

        // === URGENCY TIMER ===
        const bottomTimerDisplay = document.getElementById('offer-timer-display-bottom');
        if (bottomTimerDisplay) {
            let timeRemaining = 15 * 60;
            const countdown = setInterval(() => {
                timeRemaining--;
                if (timeRemaining <= 0) {
                    clearInterval(countdown);
                    bottomTimerDisplay.innerText = '00:00';
                } else {
                    const mins = Math.floor(timeRemaining / 60);
                    const secs = timeRemaining % 60;
                    bottomTimerDisplay.innerText = mins + ':' + (secs < 10 ? '0' : '') + secs;
                }
            }, 1000);
        }

        // === FAQ ACCORDION (for hardcoded FAQ in Stage 1) ===
        const faqListEl = document.getElementById('faq-list');
        const faqData = variant.landingSections?.faq || [];
        if (faqListEl && faqData.length > 0) {
            faqListEl.innerHTML = faqData.map(item => `
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


        // === SET BUTTON PRICE TEXT (runtime, since hardcoded HTML can't use template literals) ===
        const price = variant.pricing?.display?.FULL_REPORT || 347;
        const oldPrice = variant.pricing?.display?.FULL_REPORT_OLD || 1499;
        
        const bottomPayBtnText = document.getElementById('bottom-pay-btn-text');
        if (bottomPayBtnText) {
            bottomPayBtnText.innerHTML = `
                <span class="flex flex-col items-center gap-0 w-full">
                    <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${price} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">${oldPrice} грн</span></span>
                    <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Одноразовий платіж • Довічний доступ</span>
                </span>
            `;
        }

        // === POPULATE AUDIENCE BLOCK ===
        const audienceData = variant.landingSections?.audience;
        if (audienceData) {
            const audienceTitle = document.getElementById('s3-audience-title');
            const forList = document.getElementById('s3-audience-for-list');
            const notList = document.getElementById('s3-audience-not-list');
            const notSubtitle = document.getElementById('s3-audience-not-subtitle');
            if (audienceTitle) audienceTitle.innerHTML = audienceData.title || '';
            if (notSubtitle && audienceData.negativeSubtitle) notSubtitle.textContent = audienceData.negativeSubtitle;
            if (forList && audienceData.for_who) forList.innerHTML = audienceData.for_who.map(i => `<li>${i}</li>`).join('');
            if (notList && audienceData.not_for_who) notList.innerHTML = audienceData.not_for_who.map(i => `<li>${i}</li>`).join('');
        }

        // === POPULATE TRANSFORMATION (Before/After) BLOCK ===
        const transformData = variant.landingSections?.transformation;
        if (transformData) {
            const transTitle = document.getElementById('s3-transformation-title');
            const transBefore = document.getElementById('s3-transformation-before');
            const transAfter = document.getElementById('s3-transformation-after');
            if (transTitle) transTitle.innerHTML = transformData.title || '';
            if (transBefore) transBefore.textContent = transformData.before || '';
            if (transAfter) transAfter.textContent = transformData.after || '';
        }


        const timeInput = document.getElementById('birth-time');
        const cityInput = document.getElementById('birth-city');
        const payBtn = document.getElementById('bottom-pay-btn');
        const skipBtn = document.getElementById('skip-button');
        const timePlaceholder = document.getElementById('time-placeholder');
        const cityError = document.getElementById('city-error-message');
        const cityInfo = document.getElementById('city-info-message');

        if (skipBtn) {
            skipBtn.style.display = 'inline-block';
            skipBtn.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            skipBtn.style.borderRadius = '30px';
            skipBtn.style.padding = '8px 16px';
            skipBtn.style.marginTop = '12px';
            skipBtn.style.fontSize = '12px';
            skipBtn.style.opacity = '0.9';
            skipBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            skipBtn.style.cursor = 'pointer';
        }
        
        // 1. Time Logic
        if (timeInput) {
            timeInput.addEventListener('change', (e) => {
                state.set('timeKnown', true);
                if (timePlaceholder) {
                    timePlaceholder.textContent = e.target.value;
                    timePlaceholder.style.color = '#ffffff';
                    timePlaceholder.style.fontSize = ''; // Reset to default
                }
                if (timeInput.parentElement) {
                    timeInput.parentElement.style.opacity = '1'; // Full visibility
                }
                document.getElementById('time-error-message').style.display = 'none';
                if (timeInput) timeInput.parentElement.classList.remove('input-error');
            });
        }

        /**
         * 🚀 UNIFIED CONVERSION HANDLER (AI Location Check + Paywall Redirect)
         * Handles both 'Pay' and 'Skip Time' buttons
         */
        async function handleFinalConversion(isTimeSkip = false) {
            const fc = document.querySelector('.funnel-container');
            const timeError = document.getElementById('time-error-message');
            const cityError = document.getElementById('city-error-message');
            const topDateInput = document.getElementById('birth-date');
            const targetBtn = isTimeSkip ? skipBtn : payBtn;

            if (!targetBtn) return;

            // 1. Validate Date from Top Form (ABSOLUTE PRIORITY for Scenario 'е')
            if (!topDateInput || !topDateInput.value) {
                const topError = document.getElementById('error-message');
                if (topError) {
                    topError.innerText = "Спочатку обери дату народження";
                    topError.style.display = 'block';
                }
                
                // Hide keyboard before scrolling on mobile
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                
                if (fc) {
                    setTimeout(() => {
                        fc.scrollTo({top: 150, behavior: 'smooth'});
                    }, 50);
                }
                if (typeof haptics !== 'undefined') haptics.trigger('error');
                return; 
            } else {
                state.set('date', topDateInput.value);
            }

            // 2. Handle Time if skipping
            if (isTimeSkip) {
                state.set('timeKnown', false);
                state.set('time', '12:00');
                if (timeInput) {
                    timeInput.value = '12:00';
                    if (timePlaceholder) {
                        timePlaceholder.textContent = 'Розрахунок без точного часу (точність 95%)';
                        timePlaceholder.style.color = '#aaaaaa';
                        timePlaceholder.style.fontSize = '11px';
                    }
                    timeInput.parentElement.style.opacity = '0.8';
                    timeInput.parentElement.classList.remove('input-error');
                    if (timeError) timeError.style.display = 'none';
                }
            }

            // 3. Validate Time and City simultaneously (Scenario 'д')
            let validationError = false;

            if (!isTimeSkip) {
                if (!timeInput || !timeInput.value) {
                    if (timeError) timeError.style.display = 'block';
                    if (timeInput) timeInput.parentElement.classList.add('input-error');
                    validationError = true;
                } else {
                    state.set('time', timeInput.value);
                    state.set('timeKnown', true);
                }
            }

            const cityVal = cityInput ? cityInput.value.trim() : '';
            if (!cityVal || cityVal.length < 2) {
                if (cityError) {
                    cityError.textContent = 'Будь ласка, введи місце народження.';
                    cityError.style.display = 'block';
                }
                if (cityInput) cityInput.classList.add('input-error');
                validationError = true;
            }

            if (validationError) {
                if (typeof haptics !== 'undefined') haptics.trigger('error');
                return;
            }

            // 5. 🤖 AI Location Check (getCoordinates)
            targetBtn.disabled = true;
            
            // 🔥 OPTIMIZATION: Immediate UI feedback for direct payment
            const btnTextSpan = targetBtn.querySelector('.btn-text');
            let originalText = '';
            const isDirectSale = variant && variant.id === 'natal_chart_sale';
            
            if (isDirectSale && btnTextSpan) {
                originalText = btnTextSpan.innerHTML;
                // Add inline spinner so text isn't hidden by .loading class CSS
                btnTextSpan.innerHTML = `
                    <span style="display: flex; align-items: center; gap: 8px; font-size: 1.125rem;">
                        З'єднуюсь з банком...
                        <div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
                    </span>
                `;
            } else {
                targetBtn.classList.add('loading');
            }

            try {
                // 🔥 OPTIMIZATION: Parallelize dynamic imports
                const [geoModule, paymentModule] = await Promise.all([
                    import('../../services/geo.service.js'),
                    (variant && variant.id === 'natal_chart_sale') ? import('../../services/payment.service.js') : Promise.resolve(null)
                ]);
                const { getCoordinates } = geoModule;
                
                const coords = await getCoordinates(cityVal);
                
                let infoText = null;
                
                if (coords && (coords.latitude || coords.lat)) {
                    const correctedName = coords.corrected_name || cityVal;
                    state.set('city', correctedName);
                    state.set('birth_lat', coords.latitude || coords.lat);
                    state.set('birth_lon', coords.longitude || coords.lon);
                    
                    if (cityInput) {
                        cityInput.value = correctedName;
                        if (cityVal.toLowerCase() !== correctedName.toLowerCase()) {
                            infoText = `Ми уточнили: ${correctedName} 😉`;
                        }
                    }
                    
                    const cityInfoMessage = document.getElementById('city-info-message');
                    if (infoText && cityInfoMessage) {
                        cityInfoMessage.innerText = infoText;
                        cityInfoMessage.style.display = 'block';
                    }
                    
                    // Final State Check
                    if (timeInput && timeInput.value && !isTimeSkip) state.set('time', timeInput.value);
                    
                    // 🔥 FIX: Assemble 'geo' and 'userData' objects required by paywall router guard & checkout
                    // natal_chart_sale skips stage-4-premium which normally does this
                    const geoData = {
                        latitude: coords.latitude || coords.lat,
                        longitude: coords.longitude || coords.lon,
                        timezone: coords.timezone || null
                    };
                    state.set('geo', geoData);

                    const fullUserData = {
                        date: state.get('date'),
                        time: state.get('time') || '12:00',
                        city: state.get('city'),
                        geo: geoData
                    };
                    state.set('userData', fullUserData);
                    
                    // (lead_confirmed event was moved to Step 1 -> Step 2 transition)
                    
                    setTimeout(async () => {
                        // 🔥 DIRECT PAYMENT INITIATION for specific variants (Skip Paywall)
                        if (variant && ['natal_chart_sale'].includes(variant.id)) {
                            try {
                                const { processPayment } = paymentModule;
                                const productName = variant.productName || "Natal Chart Full Report";
                                let returnQuery = 'source=landing_direct';
                                returnQuery += `&variant=${variant.id}`;
                                
                                try {
                                    localStorage.setItem('pendingVariantId', variant.id);
                                } catch (e) { /* noop */ }

                                // Analytics Parity: Fire trackBeginCheckout like stage-3 does
                                if (window.DC_Analytics?.trackBeginCheckout) {
                                    window.DC_Analytics.trackBeginCheckout(
                                        variant.pricing?.charge?.FULL_REPORT || 347, 
                                        productName
                                    );
                                }
                                
                                await processPayment(
                                    { name: productName, price: variant.pricing?.charge?.FULL_REPORT || 347 },
                                    { email: state.get('email') || "" },
                                    fullUserData,
                                    { returnQueryParams: returnQuery, variant: variant.id }
                                );
                                // Do not remove loading/disabled if redirecting
                            } catch (err) {
                                console.error("Direct payment error:", err);
                                if (isDirectSale && btnTextSpan && originalText) btnTextSpan.innerHTML = originalText;
                                targetBtn.classList.remove('loading');
                                targetBtn.disabled = false;
                            }
                            return; // Halt execution while redirecting
                        }

                        // Fallback for logic where variant doesn't skip paywall
                        router.navigateTo('paywall');
                    }, (infoText && variant?.id !== 'natal_chart_sale') ? 1200 : 0);
                    
                } else if (coords && coords.error === 'ambiguous') {
                    if (cityError) {
                        cityError.innerText = `Місто "${cityVal}" знайдено в кількох місцях. Будь ласка, уточни, додавши країну (наприклад: ${cityVal}, Україна).`;
                        cityError.style.display = 'block';
                    }
                    if (cityInput) cityInput.classList.add('input-error');
                    if (isDirectSale && btnTextSpan && originalText) btnTextSpan.innerHTML = originalText;
                    targetBtn.classList.remove('loading');
                    targetBtn.disabled = false;
                } else {
                    if (cityError) {
                        cityError.innerText = `Не можемо знайти місто "${cityVal}". Перевірте назву.`;
                        cityError.style.display = 'block';
                    }
                    if (cityInput) cityInput.classList.add('input-error');
                    if (isDirectSale && btnTextSpan && originalText) btnTextSpan.innerHTML = originalText;
                    targetBtn.classList.remove('loading');
                    targetBtn.disabled = false;
                }
            } catch(err) {
                console.error("Conversion Error:", err);
                
                // Fallback direct payment on network error if we have SOME city
                if (variant && ['natal_chart_sale'].includes(variant.id)) {
                    const btnTextSpan = targetBtn.querySelector('.btn-text');
                    let originalText = '';
                    if (btnTextSpan) {
                        originalText = btnTextSpan.innerHTML;
                        btnTextSpan.innerHTML = '<span class="text-lg">З\'єднуюсь з банком...</span>';
                    }
                    try {
                         const { processPayment } = await import('../../services/payment.service.js');
                         await processPayment(
                            { name: variant.productName || "Natal Chart Full Report", price: variant.pricing?.charge?.FULL_REPORT || 347 },
                            { email: state.get('email') || "" },
                            { date: state.get('date'), time: state.get('timeKnown') ? state.get('time') : '12:00', city: cityVal },
                            { returnQueryParams: `source=landing_direct&variant=${variant.id}`, variant: variant.id }
                         );
                    } catch (paymentErr) {
                         console.error("Fallback Direct payment error:", paymentErr);
                         if (btnTextSpan && originalText) btnTextSpan.innerHTML = originalText;
                         targetBtn.classList.remove('loading');
                         targetBtn.disabled = false;
                    }
                    return;
                }
                
                router.navigateTo('paywall');
            }
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleFinalConversion(true);
            });
        }

        // 2. City Logic (Basic, detailed validation on submit)
        if (cityInput) {
            cityInput.addEventListener('input', () => {
                if (cityError) cityError.style.display = 'none';
                if (cityInfo) cityInfo.style.display = 'none';
                cityInput.classList.remove('input-error');
            });
        }

        // 3. Payment Button Validation & Submit
        if (payBtn) {
            payBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleFinalConversion(false);
            });
        }
    }
    
    // ==========================================
    // STICKY CTA LOGIC (Dual-Phase: Calculate / Pay)
    // ==========================================
    const stickyCTA = document.getElementById('landing-sticky-cta');
    const stickyBtn = document.getElementById('sticky-action-btn');
    const stickyContent = document.getElementById('sticky-btn-content');
    const stickyBadge = document.getElementById('sticky-trust-badge');

    if (stickyCTA && stickyBtn) {
        const funnelContainer = document.querySelector('.funnel-container');
        
        funnelContainer.addEventListener('scroll', () => {
            const scrollTop = funnelContainer.scrollTop;
            
            // 1. Visibility Logic
            if (scrollTop > 500) {
                const bottomPayBtn = document.getElementById('bottom-pay-btn');
                if (bottomPayBtn) {
                    const rect = bottomPayBtn.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        stickyCTA.classList.remove('visible');
                    } else {
                        stickyCTA.classList.add('visible');
                    }
                } else {
                    const bottomFormWrapper = document.getElementById('bottom-form-wrapper');
                    if (bottomFormWrapper) {
                        const rect = bottomFormWrapper.getBoundingClientRect();
                        if (rect.top < window.innerHeight - 100) {
                            stickyCTA.classList.remove('visible');
                        } else {
                            stickyCTA.classList.add('visible');
                        }
                    } else {
                        stickyCTA.classList.add('visible');
                    }
                }

                // 2. Mode Switching Logic (for natal_chart_sale)
                if (variant && variant.id === 'natal_chart_sale') {
                    const premiumTitle = document.getElementById('premium-form-title-container');
                    if (premiumTitle) {
                        const rect = premiumTitle.getBoundingClientRect();
                        // Switch to PAY node when bottom form is near
                        if (rect.top < window.innerHeight) {
                            if (stickyBtn.getAttribute('data-mode') !== 'pay') {
                                stickyBtn.setAttribute('data-mode', 'pay');
                                if (stickyBadge) stickyBadge.style.display = 'block';
                                
                                if (stickyContent) {
                                    stickyContent.innerHTML = `
                                        <span class="flex flex-col items-center gap-0 w-full animate-fade-in">
                                            <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${variant.pricing?.display?.FULL_REPORT || 347} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">${variant.pricing?.display?.FULL_REPORT_OLD || 1499} грн</span></span>
                                            <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">одноразовий платіж • довічний доступ</span>
                                        </span>
                                    `;
                                }
                            }
                        } else {
                            // Switch back to CALCULATE node when scrolling up
                            if (stickyBtn.getAttribute('data-mode') === 'pay') {
                                stickyBtn.setAttribute('data-mode', 'calculate');
                                if (stickyBadge) stickyBadge.style.display = 'none';
                                
                                if (stickyContent) {
                                    stickyContent.innerHTML = `
                                        <span class="flex flex-col items-center gap-0 w-full animate-fade-in">
                                            <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Почати розрахунок Натальної карти</span>
                                            <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Персональна розшифровка • 100% гарантія</span>
                                        </span>
                                    `;
                                }
                            }
                        }
                    }
                }
            } else {
                stickyCTA.classList.remove('visible');
            }
        });
    }
}