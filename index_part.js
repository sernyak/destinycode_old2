
                // 🔥 CUSTOM LANDING HTML FOR DIRECT SALE 🔥
                if (variant.isDirectSale) {
                    const mk = variant.marketing || {};
                    
                    landingHTML += `
                    <style>
                        /* --- DIRECT SALE STYLES INJECTED FROM STAGE 3 --- */
                        .offer-landing-block { margin-top: 36px; }
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
                        .ds-section-title {
                            color: #fff;
                            font-weight: 700;
                            font-size: 1.25em;
                            line-height: 1.4;
                            text-align: center;
                            margin-bottom: 20px;
                            letter-spacing: 0.2px;
                            text-transform: none;
                        }
                        .ds-section-title span { color: var(--accent-color); }
                        .ds-section-body {
                            color: var(--secondary-text-color);
                            font-size: 0.95em;
                            line-height: 1.7;
                        }
                        .ds-section-body p { margin-bottom: 12px; }
                        .ds-section-body strong { color: var(--primary-text-color); font-weight: 600; }
                        .ds-quote {
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
                        .ds-science-grid { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
                        .ds-science-item { display: flex; gap: 14px; align-items: flex-start; }
                        .ds-science-num {
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
                        .ds-science-item div { display: flex; flex-direction: column; gap: 4px; }
                        .ds-science-item strong { color: #fff; font-size: 0.95em; }
                        .ds-science-item span { color: var(--secondary-text-color); font-size: 0.85em; }
                        .ds-feature-grid { display: flex; flex-direction: column; gap: 14px; margin-top: 16px; }
                        .ds-feature-item {
                            display: flex; gap: 14px; align-items: flex-start; padding: 14px;
                            background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06);
                            border-radius: 10px;
                        }
                        .ds-feature-icon { font-size: 1.5em; flex-shrink: 0; margin-top: 2px; }
                        .ds-feature-item div { display: flex; flex-direction: column; gap: 4px; }
                        .ds-feature-item strong { color: #fff; font-size: 0.95em; }
                        .ds-feature-item span { color: var(--secondary-text-color); font-size: 0.85em; line-height: 1.5; }
                        .ds-delivery-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                        .ds-delivery-item {
                            display: flex; flex-direction: column; gap: 8px; align-items: center; text-align: center;
                            padding: 14px 10px; background: rgba(255, 255, 255, 0.04); border-radius: 12px;
                            border: 1px solid rgba(255, 255, 255, 0.08);
                        }
                        .ds-delivery-icon { font-size: 1.6em; margin-bottom: 2px; }
                        .ds-delivery-item div { display: flex; flex-direction: column; gap: 4px; }
                        .ds-delivery-item strong { color: #fff; font-size: 0.85em; line-height: 1.2; }
                        .ds-delivery-item span { color: var(--secondary-text-color); font-size: 0.75em; line-height: 1.4; }
                        
                        /* Audience & Transformation Styles */
                        .landing-audience-grid { display: flex; flex-direction: column; gap: 16px; margin-top: 16px;}
                        .landing-audience-card { padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); }
                        .landing-audience-card.positive { border-left: 3px solid #10b981; }
                        .landing-audience-card.negative { border-left: 3px solid #ef4444; }
                        .landing-audience-subtitle { color: #fff; font-size: 0.95em; font-weight: 600; margin-bottom: 12px; }
                        .landing-audience-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
                        .landing-audience-list li { position: relative; padding-left: 20px; font-size: 0.85em; color: var(--secondary-text-color); line-height: 1.5; }
                        .landing-audience-list li::before { content: "•"; position: absolute; left: 0; top: 0; color: var(--accent-color); font-size: 1.2em; line-height: 1.2; }
                        .landing-transformation-box { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
                        .landing-transformation-item { padding: 16px; border-radius: 12px; position: relative; }
                        .landing-transformation-item.before { background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.1); }
                        .landing-transformation-item.after { background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.1); }
                        .landing-transformation-badge { font-size: 0.75em; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 8px; }
                        .landing-transformation-item.before .landing-transformation-badge { color: #ef4444; }
                        .landing-transformation-item.after .landing-transformation-badge { color: #10b981; }
                        .landing-transformation-item p { font-size: 0.9em; line-height: 1.6; color: var(--primary-text-color); margin: 0; font-style: italic;}
                        .landing-transformation-arrow { display: flex; justify-content: center; align-items: center; font-size: 24px; filter: grayscale(1); opacity: 0.6; padding: 4px 0; }
                        
                        /* Guarantee & FAQ Styles */
                        .offer-guarantee-card { display: flex; align-items: center; gap: 16px; padding: 20px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 16px; }
                        .offer-guarantee-badge { width: 56px; height: 56px; border-radius: 50%; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                        .guarantee-icon { font-size: 24px; }
                        .offer-guarantee-content h3 { color: #10b981; font-weight: 700; font-size: 1.1em; margin-bottom: 6px; }
                        .offer-guarantee-content p { color: var(--secondary-text-color); font-size: 0.85em; line-height: 1.5; margin: 0; }
                        .offer-faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); padding: 16px 0; }
                        .offer-faq-question { display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 0.95em; font-weight: 600; cursor: pointer; user-select: none; }
                        .offer-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
                        .offer-faq-answer p { color: var(--secondary-text-color); font-size: 0.85em; line-height: 1.6; margin-top: 12px; margin-bottom: 0; }
                        .offer-faq-arrow { font-size: 0.7em; transition: transform 0.3s ease; color: var(--accent-color); }
                        .faq-open .offer-faq-answer { max-height: 300px; }
                        .faq-open .offer-faq-arrow { transform: rotate(180deg); }
                        
                        /* Carousel Specific Additions */
                        .ds-mockup-section { margin-top: 36px; padding: 0; }
                        .ds-mockup-image-wrapper { width: 100%; border: 1px solid rgba(205, 164, 94, 0.2); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.3); background: rgba(0,0,0,0.2); }
                        .ds-carousel-scroll { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; width: 100%; scroll-behavior: smooth; }
                        .ds-carousel-scroll::-webkit-scrollbar { display: none; }
                        .ds-carousel-item { flex: 0 0 100%; width: 100%; scroll-snap-align: center; }
                        .ds-carousel-item img { width: 100%; height: auto; display: block; }
                        .ds-dots-container { display: flex; justify-content: center; gap: 8px; margin-top: 16px; margin-bottom: 16px; }
                        .ds-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2); transition: all 0.3s ease; cursor: pointer; }
                        .ds-dot.active { background: var(--accent-color); transform: scale(1.2); }
                        .ds-mockup-caption { text-align: center; font-size: 0.85em; color: var(--secondary-text-color); padding: 0 16px; line-height: 1.5; font-style: italic;}
                    </style>
                    `;

                    // 2. Pain
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

                    // 3. Paradigm
                    if (sections.paradigm) {
                        landingHTML += `
                            <div class="landing-section">
                                <h3 class="landing-title">${sections.paradigm.title}</h3>
                                <p class="landing-text-block">${sections.paradigm.text}</p>
                            </div>
                        `;
                    }

                    // 4. Solution
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

                    // 5. Audience (For who / Not for who)
                    if (sections.audience) {
                        landingHTML += `
                            <div class="offer-landing-block">
                                <div class="offer-section-card">
                                    <h3 class="ds-section-title">${sections.audience.title}</h3>
                                    <div class="ds-section-body">
                                        <div class="landing-audience-grid">
                                            <div class="landing-audience-card positive">
                                                <h4 class="landing-audience-subtitle">✅ Для тих, хто:</h4>
                                                <ul class="landing-audience-list">
                                                    ${(sections.audience.for_who || []).map(i => `<li>${i}</li>`).join('')}
                                                </ul>
                                            </div>
                                            <div class="landing-audience-card negative">
                                                <h4 class="landing-audience-subtitle">${sections.audience.negativeSubtitle || '❌ Кому НЕ варто:'}</h4>
                                                <ul class="landing-audience-list">
                                                    ${(sections.audience.not_for_who || []).map(i => `<li>${i}</li>`).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }

                    // 6. Transformation (Before / After)
                    if (sections.transformation) {
                        landingHTML += `
                            <div class="offer-landing-block">
                                <div class="offer-section-card">
                                    <h3 class="ds-section-title">${sections.transformation.title}</h3>
                                    <div class="ds-section-body">
                                        <div class="landing-transformation-box">
                                            <div class="landing-transformation-item before">
                                                <div class="landing-transformation-badge">Раніше:</div>
                                                <p>${sections.transformation.before}</p>
                                            </div>
                                            <div class="landing-transformation-arrow">⬇️</div>
                                            <div class="landing-transformation-item after">
                                                <div class="landing-transformation-badge">З Натальною картою:</div>
                                                <p>${sections.transformation.after}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }

                    // 7. Structure / Feature Grid (Replaces stage-3 comparison block for better mobile UX)
                    landingHTML += `
                        <div class="offer-landing-block">
                            <div class="offer-section-card">
                                <h3 class="ds-section-title">Структура твоєї <span>Натальної карти</span></h3>
                                <div class="ds-section-body">
                                    <p>Повна розшифровка Натальної Карти — це твоя <strong>інструкція до самої себе</strong>, яка покаже тобі:</p>
                                    <div class="ds-feature-grid">
                                        <div class="ds-feature-item">
                                            <span class="ds-feature-icon">✨</span>
                                            <div>
                                                <strong>Свідоме і Підсвідоме: Твоє Ядро</strong>
                                                <span>Твій справжній архетип та вирішення внутрішнього конфлікту, що саботує твої успіхи</span>
                                            </div>
                                        </div>
                                        <div class="ds-feature-item">
                                            <span class="ds-feature-icon">❤️‍🔥</span>
                                            <div>
                                                <strong>Стосунки та Кохання</strong>
                                                <span>Твій типаж ідеального партнера та як перестати притягувати «не тих» чоловіків</span>
                                            </div>
                                        </div>
                                        <div class="ds-feature-item">
                                            <span class="ds-feature-icon">💰</span>
                                            <div>
                                                <strong>Гроші та Реалізація</strong>
                                                <span>Де лежить твій фінансовий потенціал і як нарешті пробити "прозору стелю"</span>
                                            </div>
                                        </div>
                                        <div class="ds-feature-item">
                                            <span class="ds-feature-icon">🗝️</span>
                                            <div>
                                                <strong>Призначення та Кармічні Уроки</strong>
                                                <span>Твоя справжня місія у цьому житті, таланти та унікальний шлях твоєї душі</span>
                                            </div>
                                        </div>
                                        <div class="ds-feature-item" style="background: rgba(205, 164, 94, 0.06); border-color: rgba(205, 164, 94, 0.15);">
                                            <span class="ds-feature-icon">⚡️</span>
                                            <div>
                                                <strong>Блок Майбутнього (Огляд на 6 місяців)</strong>
                                                <span>Головні події, вікна можливостей та ключові астрологічні транзити, які чекають на тебе</span>
                                            </div>
                                        </div>
                                        <div class="ds-feature-item" style="background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08);">
                                            <span class="ds-feature-icon">📡</span>
                                            <div>
                                                <strong>Точні Координати Планет та Вузлів</strong>
                                                <span>Карта з градусами і секундами для кожної планети та кармічних вузлів.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // 8. Mockups (PDF Carousel)
                    if (mk.mockup && mk.mockup.images) {
                        landingHTML += `
                            <div class="ds-mockup-section">
                                <h3 class="ds-section-title">${mk.mockup.title}</h3>
                                <div class="ds-mockup-image-wrapper">
                                    <div class="ds-carousel-scroll" id="ds-mockup-scroll">
                                        ${mk.mockup.images.map(src => `<div class="ds-carousel-item"><img src="${src}" loading="lazy" alt="Preview"></div>`).join('')}
                                    </div>
                                </div>
                                <div class="ds-dots-container" id="ds-mockup-dots">
                                    ${mk.mockup.images.map((_, i) => `<div class="ds-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}
                                </div>
                                <p class="ds-mockup-caption">${mk.mockup.caption}</p>
                            </div>
                        `;
                    }

                    // 9. Delivery Format
                    landingHTML += `
                        <div class="offer-landing-block">
                            <div class="offer-section-card">
                                <h3 class="ds-section-title">Як ти отримаєш <span>свій звіт</span></h3>
                                <div class="ds-section-body">
                                    <div class="ds-delivery-list">
                                        <div class="ds-delivery-item">
                                            <span class="ds-delivery-icon">🌐</span>
                                            <div><strong>На сайті</strong><span>Твій повний звіт буде доступний на екрані</span></div>
                                        </div>
                                        <div class="ds-delivery-item">
                                            <span class="ds-delivery-icon">📧</span>
                                            <div><strong>На Email</strong><span>Повний текст + PDF-документ у зручному форматі</span></div>
                                        </div>
                                        <div class="ds-delivery-item">
                                            <span class="ds-delivery-icon">💬</span>
                                            <div><strong>У Telegram</strong><span>Бот надішле тобі повний розбір у чат</span></div>
                                        </div>
                                        <div class="ds-delivery-item">
                                            <span class="ds-delivery-icon">🔗</span>
                                            <div><strong>Персональне посилання</strong><span>Унікальний URL, за яким звіт доступний назавжди</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // 10. Science (4 Pillars)
                    landingHTML += `
                        <div class="offer-landing-block">
                            <div class="offer-section-card" style="background: rgba(205, 164, 94, 0.03); border: 1px solid rgba(205, 164, 94, 0.15);">
                                <h3 class="ds-section-title">Чому Натальній карті <span>можна вірити</span></h3>
                                <div class="ds-section-body">
                                    <p>Розшифровка Натальної карти від Destiny Code — це <strong>не гороскоп із журналу</strong>. Ми не ділимо 8 мільярдів людей на 12 груп. Це точний персональний розрахунок, і ось чому йому можна довіряти:</p>
                                    <div class="ds-science-grid">
                                        <div class="ds-science-item"><span class="ds-science-num">01</span><div><strong>Фізика та Біоритми</strong><span>Місяць рухає мільярди тонн води у Світовому океані. Організм людини складається з води на 70-80%. Науково доведено, що у дні повні змінюється гормональний фон і якість сну.</span></div></div>
                                        <div class="ds-science-item"><span class="ds-science-num">02</span><div><strong>Математична Точність</strong><span>Швейцарські Ефемериди (NASA JPL). За 4 хвилини Земля зсувається на 1 градус — навіть близнюки з різницею у 10 хвилин мають різні долі.</span></div></div>
                                        <div class="ds-science-item"><span class="ds-science-num">03</span><div><strong>Тисячолітня Статистика</strong><span>Кеплер, Галілей, Карл Юнг — тисячоліттями найкращі уми спостерігали за рухом планет і фіксували закономірності. Юнг називав астрологію "психологією давнини".</span></div></div>
                                        <div class="ds-science-item"><span class="ds-science-num">04</span><div><strong>Прогноз Погоди, а Не Вирок</strong><span>Натальна карта — це не вирок, а інструкція. Знаючи свої «налаштування», ти бачиш, де варто «підкласти соломки», а де впевнено тиснути на газ.</span></div></div>
                                    </div>
                                    <div class="ds-quote">
                                        <span class="ds-quote-mark">🧭</span>
                                        Натальна карта — це як GPS-навігатор. Ти сама тримаєш кермо і натискаєш на педалі. Але їхати вночі без фар — значить постійно ризикувати.
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    // 11. Detailed Reviews
                    if (sections.testimonials) {
                        landingHTML += `
                            <div class="offer-landing-block">
                                <div class="offer-section-card" style="padding: 24px 16px; border-top: none; background: transparent; border: none; box-shadow: none;">
                                    <h3 class="ds-section-title" style="margin-bottom: 24px;">Що кажуть ті, хто вже отримав повний <span>Розрахунок</span></h3>
                                    <div style="display: flex; flex-direction: column; gap: 14px;">
                                        ${sections.testimonials.map(rev => `
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
                            </div>
                        `;
                    }

                    // 12. Guarantee
                    landingHTML += `
                        <div class="offer-landing-block">
                            <div class="offer-guarantee-card">
                                <div class="offer-guarantee-badge"><span class="guarantee-icon">🛡️</span></div>
                                <div class="offer-guarantee-content">
                                    <h3>100% Впевненість у якості</h3>
                                    <p>Ми на 100% впевнені у глибині та точності нашої Розшифровки. Якщо протягом 24 годин ти вирішиш, що звіт тобі не підійшов — ми повернемо кошти без зайвих питань.</p>
                                </div>
                            </div>
                        </div>
                    `;

                    // 13. FAQ
                    if (sections.faq) {
                        landingHTML += `
                            <div class="offer-landing-block">
                                <div class="offer-section-card" style="border-top: none;">
                                    <h3 class="ds-section-title">Часті <span>запитання</span></h3>
                                    <div class="ds-faq-list">
                                        ${sections.faq.map(item => `
                                            <div class="offer-faq-item">
                                                <div class="offer-faq-question">
                                                    <span>${item.q}</span>
                                                    <span class="offer-faq-arrow">▼</span>
                                                </div>
                                                <div class="offer-faq-answer">
                                                    <p>${item.a}</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                } else {
                    // --- EXISTING ORIGINAL LANDING HTML LOGIC FOR OTHERS ---


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

                // --- 6. Preview Block: Що ти отримаєш безкоштовно (NOT for Direct Sale) ---
                if (!variant.isDirectSale) {
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
                }

                }

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

                // 🔥 DIRECT SALE: Inject premium form (time + city + payment) at bottom
                if (variant.isDirectSale) {
                    const currentPrices = getPrices();
                    warmUpBackend();
                    
                    const premiumBottomForm = `
                        <div id="bottom-form-wrapper" style="scroll-margin-top: 20px; position: relative;" class="z-10">
                            <div class="relative py-5">
                                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div class="w-full border-t border-gray-700"></div>
                                </div>
                                <div class="relative flex justify-center">
                                    <span class="px-3 text-sm text-center" style="background-color: var(--bg-color); color: var(--accent-color); font-weight: 600; letter-spacing: 0.5px; line-height: 1.4;">УТОЧНИ ДАНІ</span>
                                </div>
                            </div>

                            <div class="space-y-2 text-center mb-4">
                                <h2 class="text-2xl font-bold text-white tracking-tight">
                                    Отримай повну розшифровку твоєї <span class="text-[#cda45e]">Натальної карти</span>
                                </h2>
                                <p class="text-sm" style="color: var(--secondary-text-color);">
                                    Введи час і місце народження — і отримай свій персональний звіт одразу після оплати
                                </p>
                            </div>

                            <div id="ds-premium-form" class="w-full space-y-5 mt-4">
                                <div>
                                    <label for="ds-birth-time" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2" style="color: var(--accent-color);">Час народження</label>
                                    <div class="input-field h-14 flex items-center justify-center relative hover:border-[#cda45e] transition-colors">
                                        <svg class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2" style="color: var(--secondary-text-color);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span id="ds-time-placeholder" style="color: var(--secondary-text-color); pointer-events: none;">Обери час</span>
                                        <input type="time" id="ds-birth-time" name="ds-birth-time" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10">
                                    </div>
                                    <p id="ds-time-error" class="error-text" style="display: none;">Будь ласка, обери час народження.</p>
                                    <p style="color: rgba(255,255,255,0.4); font-size: 10px; text-align: center; margin-top: 8px; line-height: 1.3; font-weight: 300;">Якщо не знаєш точного часу — не страшно, наші алгоритми адаптують розрахунок за датою та містом</p>
                                </div>

                                <div>
                                    <label for="ds-birth-city" class="block text-xs uppercase tracking-widest font-semibold text-left ml-1 mb-2" style="color: var(--accent-color);">Місце народження</label>
                                    <input type="text" id="ds-birth-city" name="ds-birth-city" placeholder="Наприклад, Київ" class="input-field text-center hover:border-[#cda45e] transition-colors w-full" style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; background-color: var(--card-bg-color) !important; opacity: 1;">
                                    <p id="ds-city-error" class="error-text" style="display: none;">Текст помилки...</p>
                                    <p id="ds-city-info" class="info-text" style="display: none;"></p>
                                </div>

                                <div id="ds-validation-error" style="display: none;" class="bg-red-500/10 border border-red-500/20 rounded-md p-3 text-red-500 text-sm text-center"></div>

                                <button type="button" id="ds-pay-button" class="btn btn-primary w-full !text-lg h-14">
                                    <span class="btn-text">
                                        <span class="flex flex-col items-center gap-0 w-full">
                                            <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${currentPrices.display.FULL_REPORT} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">${currentPrices.display.FULL_REPORT_OLD} грн</span></span>
                                            <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Одноразовий платіж &bull; Довічний доступ</span>
                                        </span>
                                    </span>
                                    <span class="btn-spinner"></span>
                                </button>

                                <button type="button" id="ds-skip-button" class="btn btn-skip opacity-80 text-xs mt-1 w-full" style="padding: 12px; height: auto;">
                                    Розрахувати без точного часу (точність 95%)
                                </button>

                                <div class="text-center mt-2">
                                    <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">&#128274; Безпечна оплата через Monobank</span>
                                </div>
                            </div>
                        </div>
                    `;

                    const stickyCTA = `
                        <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                            <button class="btn btn-primary shadow-2xl" id="ds-sticky-cta-btn">
                                <span class="btn-text">
                                    <span class="flex flex-col items-center gap-0 w-full">
                                        <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${currentPrices.display.FULL_REPORT} грн.</span>
                                        <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-0.5">Одноразовий платіж &bull; Довічний доступ</span>
                                    </span>
                                </span>
                            </button>
                        </div>
                    `;

                    landingContainer.innerHTML = landingHTML + premiumBottomForm + stickyCTA;
                } else {
                    // --- ORIGINAL LANDING LOGIC (non-direct-sale) ---
                    const mainFormHTML = tempWrapper.querySelector('#birth-form').outerHTML
                        .replace('id="birth-form"', 'id="birth-form-bottom"')
                        .replace('id="birth-date"', 'id="birth-date-bottom"')
                        .replace('id="submit-btn"', 'id="submit-btn-bottom"')
                        .replace('id="error-message"', 'id="error-message-bottom"')
                        .replace('id="date-placeholder"', 'id="date-placeholder-bottom"');
                    
                    const stickyCTA = `
                        <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                            <button class="btn btn-primary shadow-2xl" onclick="document.querySelector('.funnel-container').scrollTo({top: 129, behavior: 'smooth'})">
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
