with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# Append the FAQ logic to the JS injection block I made earlier
js_target = "const reviewsList = document.getElementById('reviews-list');"

faq_js = """
                    // Render FAQ if available
                    const faqList = document.getElementById('faq-list');
                    if (faqList && variant.landingSections && variant.landingSections.faq) {
                        faqList.innerHTML = variant.landingSections.faq.map((item, idx) => `
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
                    } else if (faqList && variant.faq) {
                        // fallback to top level faq
                        faqList.innerHTML = variant.faq.map((item, idx) => `
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
"""

if js_target in text:
    text = text.replace(js_target, faq_js + "\n                    " + js_target)
    with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
        f.write(text)
    print("FAQ JS added.")
else:
    print("Could not find JS target for FAQ injection.")
