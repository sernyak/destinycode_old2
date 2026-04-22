import re

with open('scratch/sale_blocks.txt', 'r', encoding='utf-8') as f:
    blocks = f.read()

# Add the payment button inside premium-form-container
payment_btn_html = """
            <button id="bottom-pay-btn" type="button" class="btn btn-primary w-full h-14 relative overflow-hidden group shadow-2xl mt-4" style="background: linear-gradient(135deg, #cda45e 0%, #b38a4d 100%);">
                <div class="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <div class="flex items-center justify-center gap-2 relative z-10 w-full">
                    <span class="font-bold text-sm tracking-widest text-[#1a1a1a] uppercase" id="bottom-pay-btn-text">
                        ОТРИМАТИ РОЗШИФРОВКУ ЗА X ГРН
                    </span>
                    <svg class="w-5 h-5 text-[#1a1a1a] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                </div>
            </button>
"""
blocks = blocks.replace('</button>\n        </div>', f'</button>\n{payment_btn_html}        </div>')

with open('src/modules/stage-1-welcome/index.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# 1. Update submit button text and logic
# Find: const buttonHtml = ...
# Or just replace the text for "РОЗРАХУВАТИ НАТАЛЬНУ КАРТУ" ?
# Usually the text is `variant.ui?.continueButtonText || 'ОТРИМАТИ НАТАЛЬНУ КАРТУ'` or hardcoded.
# Let's find "ОТРИМАТИ НАТАЛЬНУ КАРТУ" in js_content

# 2. Inject `blocks`
insert_marker = "// Inject Sticky CTA"
if insert_marker in js_content:
    js_content = js_content.replace(insert_marker, f"{blocks}\n\n                    {insert_marker}")

with open('src/modules/stage-1-welcome/index.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
print("Blocks injected")
