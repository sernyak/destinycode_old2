import re

with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Override the CTA text for natal_chart_sale
target_sticky_cta = 'ОТРИМАТИ РОЗШИФРОВКУ ЗА ${variant.price || 347} ГРН'

replacement_cta = """
                    <span class="flex flex-col items-center gap-0 w-full">
                        <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за ${variant.pricing?.display?.FULL_REPORT || 347} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">${variant.pricing?.display?.FULL_REPORT_OLD || 1499} грн</span></span>
                        <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Одноразовий платіж • Довічний доступ</span>
                    </span>
"""

text = text.replace(target_sticky_cta, replacement_cta)

target_bottom_pay_btn = 'ОТРИМАТИ Розшифровку ЗА ${variant.price || 347} ГРН'
text = text.replace(target_bottom_pay_btn, replacement_cta)

# 2. Fix the FAQ block conditionally to render exactly like stage-3-result
# Locate the FAQ generator:
faq_generator_target = """
                    // FAQ Accordion
                    if (sections.faq) {
                        const faqHTML = sections.faq.map(item => `
                            <div class="landing-faq-item">
                                <div class="landing-faq-question">${item.q}</div>
                                <div class="landing-faq-answer">${item.a}</div>
                            </div>
                        `).join('');
                        landingHTML += `
                            <div class="landing-section">
                                <h3 class="landing-title">Часті питання</h3>
                                <div class="landing-faq-accordion">${faqHTML}</div>
                            </div>
                        `;
                    }
"""

faq_replacement = """
                    // FAQ Accordion
                    if (sections.faq) {
                        if (variant.id === 'natal_chart_sale' || variant.isLandingPage === true) {
                            // If it's a rich landing page donor variant
                            const faqHTML = sections.faq.map((item, idx) => `
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
                            landingHTML += `
                                <div id="offer-block-faq" class="offer-landing-block">
                                    <div class="offer-section-card" style="border-top: 1px solid rgba(255,255,255,0.1);">
                                        <h3 class="offer-section-title">Часті <span>запитання</span></h3>
                                        <div id="faq-list" class="offer-faq-list">
                                            ${faqHTML}
                                        </div>
                                    </div>
                                </div>
                            `;
                        } else {
                            // Default rendering
                            const faqHTML = sections.faq.map(item => `
                                <div class="landing-faq-item">
                                    <div class="landing-faq-question">${item.q}</div>
                                    <div class="landing-faq-answer">${item.a}</div>
                                </div>
                            `).join('');
                            landingHTML += `
                                <div class="landing-section">
                                    <h3 class="landing-title">Часті питання</h3>
                                    <div class="landing-faq-accordion">${faqHTML}</div>
                                </div>
                            `;
                        }
                    }
"""

text = text.replace(faq_generator_target.strip(), faq_replacement.strip())

with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Applied final donor visual fixes to index.js")
