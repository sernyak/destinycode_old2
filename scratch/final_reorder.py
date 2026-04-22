#!/usr/bin/env python3
"""
FINAL REWRITE: Reorders ALL blocks for natal_chart_sale
according to the user's exact specification.

Target order:
1.  Counter "15420 жінок..." (already at top, no change needed)
2.  Що таке Натальна карта (paradigm)
3.  Що тобі покаже (whatItShows)
4.  Чому Натальній карті можна вірити (science - S3 block)
5.  Тобі потрібна Натальна карта якщо (pain)
6.  Як працює Розрахунок (howItWorks)
7.  Структура твоєї Натальної карти (structure - S3 block)
8.  Для кого Розрахунок (audience - S3 block, filled via JS)
9.  Що зміниться (before/after - S3 block, filled via JS)
10. Що ти можеш дізнатися про себе (features)
11. Як ти отримаєш свій звіт (delivery - S3 block)
12. Приклад PDF (mockup - S3 block)
13. Відгуки (reviews - S3 block, filled via JS)
14. Гарантія (guarantee - S3 block)
15. FAQ (FAQ - S3 block, filled via JS)
16. Form block (title + time/city + button + timer)

REMOVED blocks:
- Solution (GPS навігатор)
- Preview (Що ти отримаєш безкоштовно)
- WelcomeTestimonials
- Comparison Table
- Reviews Counter (separate block)
"""

with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

text = ''.join(lines)

# ============================================================
# STEP 1: Find boundaries
# ============================================================

# General landing sections: from "// --- 1. Paradigm" to end of welcomeTestimonials block
general_start_marker = "                // --- 1. Paradigm Section (What is Natal Chart) ---"
general_start = text.find(general_start_marker)
assert general_start != -1, "Cannot find general sections start"

# Find end of welcomeTestimonials (the closing of its if block)
# It's the `}` after the welcomeTestimonials template literal closes with ``;`
welcome_end_marker = "                // --- SALE VARIANT"
# Actually, looking at lines 341-345:
# Line 341: `                }`  (closes welcomeTestimonials if)
# Line 342: empty
# Line 343: empty
# Line 345: `                if (variant.id === 'natal_chart_sale') {`

# Let me find the sale block start precisely
sale_block_start_marker = "                if (variant.id === 'natal_chart_sale') {\n                    landingHTML += `\\n"
sale_block_start = text.find(sale_block_start_marker)
if sale_block_start == -1:
    # Try alternative
    sale_block_start_marker = "                if (variant.id === 'natal_chart_sale') {"
    sale_block_start = text.find(sale_block_start_marker)
assert sale_block_start != -1, f"Cannot find sale block start"

# Find the closing `}}` of the sale block (line ~711: `                }`)
# After the form template literal ends with ``;`, then `}` closes the if block
sale_block_end_marker = "                    // Inject Sticky CTA"
sale_block_end = text.find(sale_block_end_marker)
if sale_block_end == -1:
    sale_block_end_marker = "                     // Inject Sticky CTA"
    sale_block_end = text.find(sale_block_end_marker)    
if sale_block_end == -1:
    # Try to find it differently
    sale_block_end_marker = "// Inject Sticky CTA (hidden initially) and bottom form"
    sale_block_end = text.find(sale_block_end_marker)

assert sale_block_end != -1, "Cannot find sale block end"

# Walk back to find the `}` that closes the sale if block
# and include it in the replacement
sale_if_close_end = sale_block_end  # We need to cut just before "// Inject Sticky CTA"

# Also need the general sections content to end just before the sale block start
general_sections_end = sale_block_start

# ============================================================
# STEP 2: Extract required pieces
# ============================================================

# We need to extract each hardcoded S3 block from the current text
def extract_html_block(text, block_id, next_comment):
    """Extract a hardcoded HTML block from the sale section"""
    start = text.find(f'<div id="{block_id}"')
    if start == -1:
        return None
    # Find the end - either next comment or next block
    end = text.find(next_comment, start)
    if end == -1:
        end = start + 2000  # fallback
    return text[start:end].rstrip()

# Extract from CURRENT content (between sale_block_start and sale_if_close_end)
sale_section = text[sale_block_start:sale_if_close_end]

# ============================================================
# STEP 3: Build the new content
# ============================================================

# The new structure wraps general sections for non-sale variants,
# then has a complete custom block for sale variant

new_content = '''                // ===============================================================
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
                            <div class="landing-section">
                                <h3 class="landing-title">${sections.howItWorks.title}</h3>
                                <div class="landing-how-it-works-card">
                                    <p class="landing-text-block">${sections.howItWorks.text}</p>
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
        <div id="premium-form-title-container" class="space-y-2 text-center" style="margin-top: 36px;">
            <h2 class="text-2xl font-bold text-white tracking-tight">
                Отримай повну розшифровку твоєї <span class="text-[#cda45e]">Натальної карти</span>
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
                Розрахувати без точного часу (точність 95%)
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
'''

# ============================================================
# STEP 4: Splice it all together
# ============================================================

# The new file structure:
# [everything before general_start]
# [new sale-specific block with all blocks in correct order]
# [else branch wrapping general sections for other variants]
# [general sections code (paradigm through welcomeTestimonials)]
# [closing else bracket]
# [everything from sticky CTA onwards]

# First, get the general sections code (without the sale block)
general_sections_code = text[general_start:sale_block_start].rstrip()

# Get everything after the sale block (starting from "// Inject Sticky CTA")
after_sale = text[sale_if_close_end:]

# Build the new file
new_text = text[:general_start]
new_text += new_content
new_text += "\n"
new_text += general_sections_code
new_text += "\n\n                }\n\n"  # close the else block
new_text += after_sale

# ============================================================
# STEP 5: Write
# ============================================================

with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
    f.write(new_text)

print("✅ Rewrite complete!")
print("Blocks now in exact user-specified order:")
print("  1.  Paradigm")
print("  2.  WhatItShows")
print("  3.  Science (Чому вірити)")
print("  4.  Pain")
print("  5.  HowItWorks")
print("  6.  Structure")
print("  7.  Audience")
print("  8.  Before/After")
print("  9.  Features")
print("  10. Delivery")
print("  11. Mockup")
print("  12. Reviews")
print("  13. Guarantee")
print("  14. FAQ")
print("  15. Form + Timer + Button")
print()
print("REMOVED: Solution, Preview, WelcomeTestimonials, Comparison Table, Reviews Counter")
