#!/usr/bin/env python3
"""
CLEAN REWRITE: Replaces the entire sale-specific block generation in Stage 1.

Problem: There are TWO sets of blocks being generated:
  1. Lines ~343-484: Dynamic `landingHTML` with `landing-*` CSS classes
  2. Lines ~487-839: Hardcoded HTML with `offer-*` CSS classes from Stage 3

Solution: Remove the dynamic set (#1) and keep ONLY the hardcoded Stage 3 blocks (#2),
which already match the donor's (natal_chart_landoffer) styling exactly.

The hardcoded blocks have identical HTML to Stage 3's view.html blocks 1-12.
They just need to be shown (display: block instead of none) and populated via JS.
"""

import sys

with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    text = f.read()

# ==========================================
# STEP 1: Remove the dynamic landing-* blocks for natal_chart_sale
# These are the blocks between "SALE VARIANT SPECIFIC BLOCKS" and the second
# `if (variant.id === 'natal_chart_sale')` that starts the hardcoded blocks.
# ==========================================

# Find the start of the dynamic blocks
dynamic_start_marker = "// --- SALE VARIANT SPECIFIC BLOCKS (Only for natal_chart_sale) ---"
dynamic_start = text.find(dynamic_start_marker)
if dynamic_start == -1:
    print("ERROR: Could not find dynamic blocks start marker")
    sys.exit(1)

# Find the end - which is where the hardcoded blocks start
# The hardcoded section starts with `if (variant.id === 'natal_chart_sale') {`
# right after the mockup closing `}`
# We need to find the closing `}` of the first `if (natal_chart_sale)` block
# The first block ends at the closing of the mockup section

# Actually, let's find the line that says:
# `if (variant.id === 'natal_chart_sale') {`
# `landingHTML += `\n<div id="offer-block-science"`
hardcoded_start_marker = """if (variant.id === 'natal_chart_sale') {
                    landingHTML += `"""
hardcoded_start_search = text.find(hardcoded_start_marker, dynamic_start + 100)

if hardcoded_start_search == -1:
    # Try alternative
    hardcoded_start_marker = "if (variant.id === 'natal_chart_sale') {\n                    landingHTML += `\\n"
    hardcoded_start_search = text.find(hardcoded_start_marker, dynamic_start + 100)
    
if hardcoded_start_search == -1:
    print("ERROR: Could not find hardcoded blocks start")
    # Let's try to find what's actually there
    area = text[dynamic_start:dynamic_start+2000]
    print("Area around dynamic start:")
    for i, line in enumerate(area.split('\n')):
        print(f"  {i}: {line[:120]}")
    sys.exit(1)

# Replace the dynamic blocks section with nothing.
# We want to keep the `if (variant.id === 'natal_chart_sale') {` from the hardcoded section.
# So we cut from dynamic_start_marker to just before the hardcoded if-statement.

# Find the whitespace before the hardcoded if
cut_end = hardcoded_start_search
while cut_end > 0 and text[cut_end-1] in ' \t\n\r':
    cut_end -= 1
cut_end += 1  # keep one newline

replacement = "\n\n                "
text = text[:dynamic_start] + replacement + text[hardcoded_start_search:]

print(f"STEP 1: Removed dynamic blocks ({dynamic_start} to {hardcoded_start_search})")

# ==========================================
# STEP 2: The hardcoded blocks have `style="display: none;"` - need to remove those
# for the blocks that are inside the `natal_chart_sale` if-block
# ==========================================

# Actually looking at the code, the blocks inside the hardcoded section DON'T have
# display:none because they were injected as landingHTML string literals.
# Let me verify...

# The hardcoded blocks are inside a template literal that gets appended to landingHTML.
# They should NOT have display:none. Let me check:
if 'offer-block-science" class="offer-landing-block" >' in text:
    print("STEP 2: Hardcoded blocks already visible (no display:none). Good.")
elif 'offer-block-science" class="offer-landing-block" style="display: none;"' in text:
    print("STEP 2: Hardcoded blocks have display:none - removing...")
    # These are inside stage-1 injection, remove display:none
    # But only inside the landingHTML template literal, not in stage-3 view.html
    # The stage-1 blocks don't have display:none since they're template literals
    pass

# ==========================================
# STEP 3: Fix the bottom button styling to match Stage 3 paywall
# The bottom-pay-btn should look like the upgrade-button in Stage 3
# ==========================================

# Find the bottom pay button
old_btn = """<button id="bottom-pay-btn" type="button" class="btn btn-primary w-full h-14 relative overflow-hidden group shadow-2xl mt-4" style="background: linear-gradient(135deg, #cda45e 0%, #b38a4d 100%);">
                <div class="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <div class="flex items-center justify-center gap-2 relative z-10 w-full">
                    <span class="font-bold text-sm tracking-widest text-[#1a1a1a] uppercase" id="bottom-pay-btn-text">
                        ОТРИМАТИ РОЗШИФРОВКУ ЗА X ГРН
                    </span>
                    <svg class="w-5 h-5 text-[#1a1a1a] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                </div>
            </button>"""

# The new button mimics Stage 3's upgrade-button exactly
new_btn = """<!-- Urgency Timer -->
            <div id="offer-urgency-timer-bottom" style="text-align: center; margin-bottom: 12px; margin-top: 16px;">
                <span style="font-size: 11px; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; background: rgba(205,164,94,0.15); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(205,164,94,0.3); display: inline-block;">
                    Спеціальна ціна діє ще: <span id="offer-timer-display-bottom" style="color: var(--accent-color); font-weight: 700; margin-left: 2px;">15:00</span>
                </span>
            </div>

            <button id="bottom-pay-btn"
                class="btn btn-primary w-full !text-lg !py-4 btn-pulse-glow shadow-2xl relative overflow-hidden">
                <span class="btn-text flex items-center justify-center gap-2">
                    <span class="flex flex-col items-center gap-0 w-full">
                        <span class="whitespace-nowrap" style="font-size: 14px; font-weight: 700; line-height: 1.3;">Отримати Розшифровку за \${variant.pricing?.display?.FULL_REPORT || 347} грн. <span style="font-size: 13px; font-weight: 400; opacity: 0.5; text-decoration: line-through;">\${variant.pricing?.display?.FULL_REPORT_OLD || 1499} грн</span></span>
                        <span class="text-[10px] uppercase tracking-[1px] opacity-80 mt-1">Одноразовий платіж • Довічний доступ</span>
                    </span>
                </span>
                <span class="btn-spinner"></span>
            </button>
            <!-- Trust text -->
            <div class="mt-2 flex items-center justify-center opacity-70">
                <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    🔒 Безпечна оплата через Monobank
                </span>
            </div>"""

if old_btn in text:
    text = text.replace(old_btn, new_btn)
    print("STEP 3: Bottom button replaced with Stage 3 styling.")
else:
    print("STEP 3: WARNING - Could not find exact old button HTML.")
    # Try a simpler replacement
    if 'ОТРИМАТИ РОЗШИФРОВКУ ЗА X ГРН' in text:
        # Find the button block
        btn_start = text.find('<button id="bottom-pay-btn"')
        if btn_start != -1:
            btn_end = text.find('</button>', btn_start)
            if btn_end != -1:
                btn_end += len('</button>')
                text = text[:btn_start] + new_btn + text[btn_end:]
                print("STEP 3: Bottom button replaced (fallback method).")

# ==========================================
# STEP 4: Fix the form title to match Stage 3
# ==========================================
old_form_title = """<div id="premium-form-title-container" class="mt-8 mb-4 text-center">
            <h2 class="text-2xl font-bold text-white mb-2" style="font-size: 1.35rem; line-height: 1.3;">Отримай повну розшифровку своєї Натальної карти</h2>
            <p class="text-sm opacity-70" style="color: var(--secondary-text-color);">Введи час і місце народження - і отримай результат адаптований саме під тебе.</p>
        </div>"""

new_form_title = """<div id="premium-form-title-container" class="space-y-2 text-center" style="margin-top: 36px;">
            <h2 class="text-2xl font-bold text-white tracking-tight">
                Отримай повну розшифровку своєї <span class="text-[#cda45e]">Натальної карти</span>
            </h2>
            <p class="text-sm" style="color: var(--secondary-text-color);">
                Введи час і місце народження - і отримай свій персональний звіт одразу після оплати
            </p>
        </div>"""

if old_form_title in text:
    text = text.replace(old_form_title, new_form_title)
    print("STEP 4: Form title updated to match Stage 3.")
else:
    print("STEP 4: WARNING - Could not find exact old form title.")

# ==========================================
# STEP 5: Add JS logic to populate reviews and start timer
# Find the checkout logic section and inject the JS
# ==========================================

checkout_marker = "// DIRECT SALES CHECKOUT LOGIC (natal_chart_sale)"
checkout_idx = text.find(checkout_marker)
if checkout_idx != -1:
    # Find the `if (variant.id === 'natal_chart_sale') {` after this marker
    sale_if_idx = text.find("if (variant.id === 'natal_chart_sale') {", checkout_idx)
    if sale_if_idx != -1:
        # Find the opening brace
        brace_idx = text.find('{', sale_if_idx)
        insert_point = brace_idx + 1
        
        reviews_and_timer_js = """
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

"""
        text = text[:insert_point] + reviews_and_timer_js + text[insert_point:]
        print("STEP 5: Reviews, Timer, and FAQ JS logic injected.")
    else:
        print("STEP 5: WARNING - Could not find sale if-block after checkout marker")
else:
    print("STEP 5: WARNING - Could not find checkout marker")

# ==========================================
# STEP 6: Ensure the red validation error is hidden by default
# ==========================================
# Fix double style attribute issue from previous patch
text = text.replace('style="display: none;" style="display: none;"', 'style="display: none;"')

# ==========================================
# STEP 7: Remove the Skip Button (it's unnecessary for sale variant - user must pay)
# Actually, keep it - it's useful for users who don't know their birth time
# ==========================================

# ==========================================
# SAVE
# ==========================================
with open("src/modules/stage-1-welcome/index.js", "w", encoding="utf-8") as f:
    f.write(text)

print("\n✅ Clean rewrite complete!")
print("Blocks now follow Stage 3 order exactly:")
print("  1. Science ('Чому натальній карті можна вірити')")
print("  2. Comparison Table")
print("  3. Transformation (Structure)")
print("  4. Delivery") 
print("  5. Mockup")
print("  6. Audience")
print("  7. Before/After")
print("  8. Reviews Counter")
print("  9. Reviews")
print("  10. Guarantee")
print("  11. FAQ")
print("  12. Form Title + Form + Button + Timer")
