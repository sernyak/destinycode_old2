with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# Find the start of the injected payload
start_marker = "landingHTML += `\\n<div id=\"offer-block-science\" class=\"offer-landing-block\" >"
start_idx = text.find(start_marker)

# Find the end of my injected template array
end_marker = "        `;"
end_idx = text.find(end_marker, start_idx) + len(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Cannot find markers")
    exit(1)

injected_blocks = text[start_idx:end_idx]

# Replace injected_blocks with wrapped version
wrapped_blocks = f"""
                if (variant.id === 'natal_chart_sale') {{
                    {injected_blocks}
                }}
"""

text = text[:start_idx] + wrapped_blocks + text[end_idx:]

# Now modify the stickyCTA and bottomForm logic:
# `const bottomForm = ` to `landingContainer.innerHTML`
logic_start = text.find("const mainFormHTML = tempWrapper.querySelector('#birth-form').outerHTML")
logic_end = text.find("landingContainer.innerHTML = landingHTML + bottomForm + stickyCTA;") + len("landingContainer.innerHTML = landingHTML + bottomForm + stickyCTA;")

if logic_start != -1 and logic_end != -1:
    new_logic = """
                let finalBottomForm = '';
                let finalStickyCTA = '';
                
                if (variant.id === 'natal_chart_sale') {
                    // Sale variant already has bottom form integrated manually in extra blocks
                    finalStickyCTA = `
                        <div class="landing-sticky-cta-container" id="landing-sticky-cta">
                            <button class="btn btn-primary shadow-2xl" onclick="
                                const f = document.getElementById('premium-form-container');
                                if (f) f.scrollIntoView({behavior: 'smooth', block: 'center'});
                                else document.querySelector('.funnel-container').scrollTo({top: 0, behavior: 'smooth'});
                            ">
                                <span class="btn-text" id="sticky-btn-text">ОТРИМАТИ РОЗШИФРОВКУ ЗА ${variant.price || 347} ГРН</span>
                            </button>
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
                            <button class="btn btn-primary shadow-2xl" onclick="document.querySelector('.funnel-container').scrollTo({top: 129, behavior: 'smooth'})">
                                <span class="btn-text">${variant?.ui?.buttonText?.toUpperCase() || 'ОТРИМАТИ НАТАЛЬНУ КАРТУ'}</span>
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
"""
    text = text[:logic_start] + new_logic + text[logic_end:]

with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Logic fixed!")
