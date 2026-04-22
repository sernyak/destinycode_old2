with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# Let's find the sticky CTA logic for natal_chart_sale I injected in fix_sale_variant_html.py

target_code = "const f = document.getElementById('premium-form-container');"
idx = text.find(target_code)

if idx != -1:
    patched_code = """
                                const topInput = document.getElementById('birth-date');
                                const f = document.getElementById('premium-form-container');
                                const topForm = document.getElementById('birth-form');
                                
                                if (!topInput || !topInput.value) {
                                    if (topForm) topForm.scrollIntoView({behavior: 'smooth', block: 'center'});
                                    else document.querySelector('.funnel-container').scrollTo({top: 0, behavior: 'smooth'});
                                } else {
                                    if (f) f.scrollIntoView({behavior: 'smooth', block: 'center'});
                                }
"""
    # Replace the next 3 lines with patched code
    end_idx = text.find('">', idx)
    new_text = text[:idx] + patched_code + text[end_idx:]
    
    with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
        f.write(new_text)
    print("Sticky CTA fixed")
else:
    print("Not found")
