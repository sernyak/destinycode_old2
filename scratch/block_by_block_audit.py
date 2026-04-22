#!/usr/bin/env python3
"""
BLOCK-BY-BLOCK AUDIT: Порівнює кожен блок natal_chart_sale з його "донором".

Донори:
- Блоки 1-9 (paradigm, whatItShows, etc.) → Stage 1 landing engine (спільний код)
- Блоки S3-2..S3-12 (science, delivery, etc.) → Stage 3 view.html
"""
import re
import difflib

def normalize(text):
    """Remove whitespace differences for comparison"""
    return re.sub(r'\s+', ' ', text.strip())

def extract_block(content, start_marker, end_marker=None, end_offset=None):
    """Extract HTML block between markers"""
    idx = content.find(start_marker)
    if idx == -1:
        return None, -1
    if end_marker:
        end = content.find(end_marker, idx + len(start_marker))
        if end == -1:
            return content[idx:idx+500], idx
        return content[idx:end], idx
    elif end_offset:
        return content[idx:idx+end_offset], idx
    return content[idx:idx+200], idx

# Load files
with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    s1 = f.read()

with open("src/modules/stage-3-result/view.html", "r", encoding="utf-8") as f:
    s3 = f.read()

with open("src/variants/products/natal_chart_sale.js", "r", encoding="utf-8") as f:
    sale_config = f.read()

with open("src/variants/products/natal_chart_landoffer.js", "r", encoding="utf-8") as f:
    donor_config = f.read()

print("=" * 70)
print("BLOCK-BY-BLOCK AUDIT: natal_chart_sale vs donor")
print("=" * 70)

# ============================================
# PART 1: Config comparison (sale vs landoffer)
# ============================================
print("\n📋 PART 1: CONFIG DATA COMPARISON")
print("-" * 50)

config_sections = [
    "paradigm",
    "whatItShows", 
    "pain",
    "solution",
    "howItWorks",
    "audience",
    "features",
    "transformation",
    "testimonials",
    "welcomeTestimonials",
    "faq",
]

for section in config_sections:
    in_sale = section in sale_config
    in_donor = section in donor_config
    match = "✅" if (in_sale and in_donor) else "❌"
    print(f"  {match} {section:30s} sale:{in_sale}  donor:{in_donor}")

# ============================================
# PART 2: Stage 3 HTML blocks comparison
# ============================================
print(f"\n📋 PART 2: STAGE 3 HTML BLOCKS IN STAGE 1")
print("-" * 50)

s3_blocks = [
    {
        "name": "BLOCK 2: Science (Чому можна вірити)",
        "id": "offer-block-science",
        "start": '<div id="offer-block-science"',
        "end_search": "<!-- BLOCK 3:",
    },
    {
        "name": "BLOCK 3: Comparison Table",
        "id": "offer-comparison-block",
        "start": '<div id="offer-comparison-block"',
        "end_search": "<!-- BLOCK 4:",
    },
    {
        "name": "BLOCK 4: Structure (Transformation)",
        "id": "offer-block-transformation",
        "start": '<div id="offer-block-transformation"',
        "end_search": "<!-- BLOCK 5:",
    },
    {
        "name": "BLOCK 5: Delivery",
        "id": "offer-block-delivery",
        "start": '<div id="offer-block-delivery"',
        "end_search": "<!-- BLOCK 6:",
    },
    {
        "name": "BLOCK 6: Mockup Preview",
        "id": "offer-preview-block",
        "start": '<div id="offer-preview-block"',
        "end_search": "<!-- BLOCK 7:",
    },
    {
        "name": "BLOCK 7: Audience (For Whom)",
        "id": "offer-block-audience-s3",
        "start": '<div id="offer-block-audience-s3"',
        "end_search": "<!-- BLOCK 8:",
    },
    {
        "name": "BLOCK 8: Before/After",
        "id": "offer-block-transformation-s3",
        "start": '<div id="offer-block-transformation-s3"',
        "end_search": "<!-- BLOCK 9:",
    },
    {
        "name": "BLOCK 9: Reviews Counter",
        "id": "offer-reviews-counter-block",
        "start": '<div id="offer-reviews-counter-block"',
        "end_search": "<!-- BLOCK 10:",
    },
    {
        "name": "BLOCK 10: Reviews",
        "id": "offer-block-reviews",
        "start": '<div id="offer-block-reviews"',
        "end_search": "<!-- BLOCK 11:",
    },
    {
        "name": "BLOCK 11: Guarantee",
        "id": "offer-block-guarantee",
        "start": '<div id="offer-block-guarantee"',
        "end_search": "<!-- BLOCK 12:",
    },
    {
        "name": "BLOCK 12: FAQ",
        "id": "offer-block-faq",
        "start": '<div id="offer-block-faq"',
        "end_search": "<!-- END:",
    },
]

for block in s3_blocks:
    block_id = block["id"]
    name = block["name"]
    
    # Extract from Stage 3
    s3_start = s3.find(block["start"])
    s3_end = s3.find(block["end_search"], s3_start) if s3_start != -1 else -1
    
    # Extract from Stage 1
    s1_start = s1.find(block["start"])
    # For S1, find the next block or closing tag
    if s1_start != -1:
        # Find next BLOCK comment or next major div
        next_block_markers = ["<!-- BLOCK", "</div>\n        </div>"]
        s1_end = len(s1)
        for marker in ["<!-- BLOCK", "<!-- Urgency", "<div id=\"premium-form"]:
            pos = s1.find(marker, s1_start + 50)
            if pos != -1 and pos < s1_end:
                s1_end = pos
    
    if s3_start == -1:
        print(f"\n  ❌ {name}")
        print(f"     NOT FOUND in Stage 3 view.html")
        continue
    
    if s1_start == -1:
        print(f"\n  ❌ {name}")
        print(f"     NOT FOUND in Stage 1 index.js")
        continue
    
    # Extract the HTML
    s3_html = s3[s3_start:s3_end].strip() if s3_end != -1 else s3[s3_start:s3_start+500]
    s1_html = s1[s1_start:s1_end].strip()
    
    # Normalize for comparison
    s3_norm = normalize(s3_html)
    s1_norm = normalize(s1_html)
    
    # Check key attributes
    # S3 blocks have style="display: none;" which S1 blocks should NOT have
    s1_has_display_none = 'display: none' in s1_html[:200]
    s3_has_display_none = 'display: none' in s3_html[:200]
    
    # Compare structure (ignoring display:none difference)
    s3_cleaned = s3_norm.replace('style="display: none;"', '').replace("style=\"display: none;\"", "")
    s1_cleaned = s1_norm.replace('style="display: none;"', '').replace("style=\"display: none;\"", "")
    
    # Simple similarity ratio
    ratio = difflib.SequenceMatcher(None, s3_cleaned[:500], s1_cleaned[:500]).ratio()
    
    if ratio > 0.95:
        status = "✅ IDENTICAL"
    elif ratio > 0.8:
        status = "⚠️ SIMILAR (minor diffs)"
    elif ratio > 0.5:
        status = "⚠️ PARTIAL MATCH"
    else:
        status = "❌ DIFFERENT"
    
    print(f"\n  {status}")
    print(f"     {name}")
    print(f"     S3 display:none={s3_has_display_none}  S1 display:none={s1_has_display_none}", end="")
    if s1_has_display_none:
        print("  ⚠️ BLOCK WILL BE HIDDEN!")
    else:
        print("  ✅ Block visible")
    print(f"     Similarity: {ratio:.0%}")
    
    if ratio < 0.95:
        # Show first difference
        s3_lines = s3_cleaned[:300].split()
        s1_lines = s1_cleaned[:300].split()
        diffs = list(difflib.unified_diff(s3_lines[:20], s1_lines[:20], lineterm='', n=0))
        if diffs:
            print(f"     First diff:")
            for d in diffs[:5]:
                print(f"       {d[:80]}")

# ============================================
# PART 3: Form & Button comparison
# ============================================
print(f"\n📋 PART 3: FORM TITLE & BUTTON CHECK")
print("-" * 50)

# Form title in S3
s3_form_title_start = s3.find('id="premium-form-title-container"')
if s3_form_title_start != -1:
    s3_form_title_block = s3[s3_form_title_start:s3_form_title_start+500]
else:
    s3_form_title_block = "NOT FOUND"

s1_form_title_start = s1.find('id="premium-form-title-container"')
if s1_form_title_start != -1:
    s1_form_title_block = s1[s1_form_title_start:s1_form_title_start+500]
else:
    s1_form_title_block = "NOT FOUND"

print("\n  S3 Form Title:")
# Extract just the title text
s3_title_match = re.search(r'<h2[^>]*>(.*?)</h2>', s3_form_title_block, re.DOTALL)
if s3_title_match:
    print(f"     {normalize(s3_title_match.group(1))[:100]}")
    
print("  S1 Form Title:")
s1_title_match = re.search(r'<h2[^>]*>(.*?)</h2>', s1_form_title_block, re.DOTALL)
if s1_title_match:
    print(f"     {normalize(s1_title_match.group(1))[:100]}")

# Compare
if s3_title_match and s1_title_match:
    if normalize(s3_title_match.group(1)) == normalize(s1_title_match.group(1)):
        print("  ✅ Form titles MATCH")
    else:
        print("  ⚠️ Form titles DIFFER")

# S3 subtitle
s3_sub_match = re.search(r'<p class="text-sm"[^>]*>(.*?)</p>', s3_form_title_block, re.DOTALL)
s1_sub_match = re.search(r'<p class="text-sm"[^>]*>(.*?)</p>', s1_form_title_block, re.DOTALL)
if s3_sub_match and s1_sub_match:
    s3_sub = normalize(s3_sub_match.group(1))
    s1_sub = normalize(s1_sub_match.group(1))
    if s3_sub == s1_sub:
        print("  ✅ Form subtitles MATCH")
    else:
        print(f"  ⚠️ Form subtitles DIFFER:")
        print(f"     S3: {s3_sub[:80]}")
        print(f"     S1: {s1_sub[:80]}")

# Button check
print(f"\n  Bottom Button:")
s3_btn = s3.find('id="upgrade-button"')
s1_btn = s1.find('id="bottom-pay-btn"')
print(f"     S3 has upgrade-button: {'✅' if s3_btn != -1 else '❌'}")
print(f"     S1 has bottom-pay-btn: {'✅' if s1_btn != -1 else '❌'}")

# Check button class
s1_btn_html = s1[s1_btn:s1_btn+300] if s1_btn != -1 else ""
has_pulse_glow = "btn-pulse-glow" in s1_btn_html
has_pricing = "FULL_REPORT" in s1_btn_html or "347" in s1_btn_html
print(f"     Has btn-pulse-glow animation: {'✅' if has_pulse_glow else '❌'}")
print(f"     Has pricing info: {'✅' if has_pricing else '❌'}")

# Timer check
print(f"\n  Timer:")
s3_timer = 'offer-urgency-timer' in s3
s1_timer = 'offer-urgency-timer' in s1 or 'offer-timer-display-bottom' in s1
print(f"     S3 has timer: {'✅' if s3_timer else '❌'}")
print(f"     S1 has timer: {'✅' if s1_timer else '❌'}")

# Sticky CTA check
print(f"\n  Sticky CTA:")
s1_sticky = s1.find('id="landing-sticky-cta"')
if s1_sticky != -1:
    sticky_html = s1[s1_sticky:s1_sticky+500]
    has_pricing_sticky = "FULL_REPORT" in sticky_html or "347" in sticky_html
    has_pulse_sticky = "btn-pulse-glow" in sticky_html
    print(f"     Present: ✅")
    print(f"     Has pricing: {'✅' if has_pricing_sticky else '❌'}")
    print(f"     Has pulse animation: {'✅' if has_pulse_sticky else '❌'}")
else:
    print(f"     ❌ NOT FOUND")

# ============================================
# PART 4: CSS verification
# ============================================
print(f"\n📋 PART 4: CSS CLASSES VERIFICATION")
print("-" * 50)

critical_css_classes = [
    "offer-landing-block",
    "offer-section-card",
    "offer-section-title",
    "offer-section-body",
    "offer-science-grid",
    "offer-science-item",
    "offer-science-num",
    "offer-feature-grid",
    "offer-feature-item",
    "offer-feature-icon",
    "offer-delivery-list",
    "offer-delivery-item",
    "offer-delivery-icon",
    "offer-guarantee-container",
    "offer-guarantee-card",
    "offer-faq-list",
    "offer-faq-item",
    "offer-faq-question",
    "offer-faq-arrow",
    "offer-faq-answer",
    "offer-comparison-table",
    "offer-mockup-image",
    "offer-quote",
    "landing-transformation-box",
    "landing-transformation-item",
    "landing-transformation-badge",
    "landing-audience-grid",
    "landing-audience-card",
    "landing-audience-list",
]

# Check if CSS is defined in S3 view.html (inside <style> block)
s3_style_start = s3.find("/* 🔥 OFFER LANDING BLOCKS STYLES")
s3_style_end = s3.find("</style>", s3_style_start) if s3_style_start != -1 else -1
s3_css = s3[s3_style_start:s3_style_end] if s3_style_start != -1 and s3_style_end != -1 else ""

# Check if CSS is injected in S1
s1_style_start = s1.find("style.innerHTML = `")
s1_style_end = s1.find("`;", s1_style_start) if s1_style_start != -1 else -1
s1_css = s1[s1_style_start:s1_style_end] if s1_style_start != -1 and s1_style_end != -1 else ""

missing_css = []
for cls in critical_css_classes:
    in_s3_css = cls in s3_css
    in_s1_css = cls in s1_css
    in_s1_html = cls in s1  # might be in HTML but styled by S3 CSS
    
    if in_s1_html and not in_s1_css and in_s3_css:
        missing_css.append(cls)
        print(f"  ❌ .{cls} - Used in HTML but CSS NOT injected in S1")
    elif in_s1_html and in_s1_css:
        print(f"  ✅ .{cls}")
    elif not in_s1_html:
        pass  # Not used, skip

if missing_css:
    print(f"\n  ⚠️ {len(missing_css)} CSS classes are MISSING from S1 injection!")
    print(f"     These blocks will render WITHOUT proper styling.")
else:
    print(f"\n  ✅ All critical CSS classes are present in S1")

print("\n" + "=" * 70)
print("AUDIT COMPLETE")
print("=" * 70)
