"""
Verify that ALL blocks from Stage 3 view.html are present in Stage 1 index.js
for the natal_chart_sale variant AND that there are no duplicate blocks.
"""

with open("src/modules/stage-1-welcome/index.js", "r", encoding="utf-8") as f:
    s1 = f.read()

with open("src/modules/stage-3-result/view.html", "r", encoding="utf-8") as f:
    s3 = f.read()

# Stage 3 blocks order (from view.html):
s3_blocks = [
    ("BLOCK 1: COSMIC IMPRINT",     'offer-block-cosmic'),
    ("BLOCK 2: SCIENCE",            'offer-block-science'),
    ("BLOCK 3: COMPARISON",         'offer-comparison-block'),
    ("BLOCK 4: STRUCTURE",          'offer-block-transformation'),
    ("BLOCK 5: DELIVERY",           'offer-block-delivery'),
    ("BLOCK 6: MOCKUP",             'offer-preview-block'),
    ("BLOCK 7: AUDIENCE",           'offer-block-audience-s3'),
    ("BLOCK 8: BEFORE/AFTER",       'offer-block-transformation-s3'),
    ("BLOCK 9: REVIEWS COUNTER",    'offer-reviews-counter-block'),
    ("BLOCK 10: REVIEWS",           'offer-block-reviews'),
    ("BLOCK 11: GUARANTEE",         'offer-block-guarantee'),
    ("BLOCK 12: FAQ",               'offer-block-faq'),
]

# Landing sections from config (Stage 1 pre-sale blocks):
s1_landing_blocks = [
    ("paradigm",            'Що таке'),
    ("whatItShows",         'Що тобі покаже'),
    ("pain",                'потрібна'),
    ("solution",            'GPS-навігатор'),
    ("howItWorks",          'Як працює'),
    ("preview",             'Що ти отримаєш безкоштовно'),
    ("welcomeTestimonials", 'хто вже спробував'),
]

print("=" * 60)
print("STAGE 3 BLOCKS IN STAGE 1 (natal_chart_sale)")
print("=" * 60)

# Find the natal_chart_sale HTML block in s1
sale_start = s1.find("if (variant.id === 'natal_chart_sale') {\n                    landingHTML")
if sale_start == -1:
    # Try alternative
    sale_start = s1.find('offer-block-science')
    if sale_start == -1:
        print("ERROR: Cannot find natal_chart_sale block section")
    else:
        print(f"Found offer-block-science at position {sale_start}")

for name, block_id in s3_blocks:
    count_s1 = s1.count(f'id="{block_id}"')
    count_s3 = s3.count(f'id="{block_id}"')
    in_s3 = "✅" if count_s3 > 0 else "❌"
    in_s1 = "✅" if count_s1 > 0 else "❌"
    dup = " ⚠️ DUPLICATE!" if count_s1 > 1 else ""
    print(f"  {name:30s} S3:{in_s3}  S1:{in_s1} (count:{count_s1}){dup}")

print()
print("=" * 60)
print("STAGE 1 LANDING BLOCKS (pre-sale educational content)")
print("=" * 60)

for name, search_text in s1_landing_blocks:
    count = s1.count(search_text)
    present = "✅" if count > 0 else "❌"
    print(f"  {name:30s} {present} (mentions:{count})")

print()
print("=" * 60)
print("FORM & BUTTON CHECKS")
print("=" * 60)

checks = [
    ("Form title container",   'premium-form-title-container'),
    ("Time input",             'birth-time'),
    ("City input",             'birth-city'),
    ("Bottom pay button",      'bottom-pay-btn'),
    ("Urgency timer",          'offer-timer-display-bottom'),
    ("Sticky CTA",             'landing-sticky-cta'),
    ("Validation error (hidden)", 'offer-validation-error'),
    ("Skip button",            'skip-button'),
    ("Reviews list",           'reviews-list'),
    ("FAQ list",               'faq-list'),
]

for name, el_id in checks:
    count = s1.count(f'id="{el_id}"')
    present = "✅" if count > 0 else "❌"
    dup = " ⚠️ DUPLICATE!" if count > 1 else ""
    print(f"  {name:35s} {present} (count:{count}){dup}")

# Check for JS logic
print()
print("=" * 60)
print("JS LOGIC CHECKS")
print("=" * 60)

js_checks = [
    ("Reviews rendering JS",   "reviewsListEl"),
    ("Timer countdown JS",     "bottomTimerDisplay"),
    ("FAQ rendering JS",       "faqListEl"),
    ("Geo coordinates fetch",  "getCoordinates"),
    ("Bottom pay btn handler", "bottom-pay-btn"),
    ("Sticky CTA scroll logic","landing-sticky-cta"),
]

for name, search in js_checks:
    count = s1.count(search)
    present = "✅" if count > 0 else "❌"
    print(f"  {name:35s} {present} (mentions:{count})")

print()
print("=" * 60)
print("BLOCK ORDER VERIFICATION (position in file)")
print("=" * 60)

order_checks = [
    ("Hero form",              'birth-form'),
    ("Paradigm",               'Що таке'),
    ("WhatItShows",            'Що тобі покаже'),
    ("Pain",                   'потрібна Натальна карта якщо'),
    ("Solution",               'GPS-навігатор'),
    ("HowItWorks",             'Як працює'),
    ("Preview",                'Що ти отримаєш безкоштовно'),
    ("WelcomeTestimonials",    'хто вже спробував'),
    ("Science (Чому вірити)",  'offer-block-science'),
    ("Comparison Table",       'offer-comparison-block'),
    ("Structure",              'offer-block-transformation"'),
    ("Delivery",               'offer-block-delivery'),
    ("Mockup",                 'offer-preview-block'),
    ("Audience",               'offer-block-audience-s3'),
    ("Before/After",           'offer-block-transformation-s3'),
    ("Reviews Counter",        'offer-reviews-counter-block'),
    ("Reviews",                'offer-block-reviews'),
    ("Guarantee",              'offer-block-guarantee'),
    ("FAQ",                    'offer-block-faq'),
    ("Form Title",             'premium-form-title-container'),
    ("Bottom Pay Button",      'bottom-pay-btn'),
]

positions = []
for name, search in order_checks:
    pos = s1.find(search)
    positions.append((pos, name))
    
# Sort by position
positions.sort(key=lambda x: x[0])

prev_pos = -1
for pos, name in positions:
    order_ok = "✅" if pos > prev_pos else "❌ OUT OF ORDER!"
    print(f"  pos={pos:6d}  {name:30s} {order_ok}")
    prev_pos = pos

print("\n✅ Verification complete!")
