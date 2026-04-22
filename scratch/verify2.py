with open('src/modules/stage-1-welcome/index.js', 'r', encoding='utf-8') as f:
    s1 = f.read()

checks = [
    ('Hero form',                 'id="birth-form"'),
    ('1.Paradigm',               'sections.paradigm.title'),
    ('1.5.WhatItShows',          'sections.whatItShows.title'),
    ('2.Pain',                   'sections.pain.title'),
    ('3.HowItWorks',             'sections.howItWorks.title'),
    ('4.Solution',               'sections.solution.title'),
    ('5.Features',               'sections.features.title'),
    ('6.Preview',                'Що ти отримаєш безкоштовно'),
    ('7.WelcomeTestimonials',    'sections.welcomeTestimonials'),
    ('S3-2.Science',             'offer-block-science'),
    ('S3-3.Comparison',          'offer-comparison-block'),
    ('S3-4.Structure',           'offer-block-transformation"'),
    ('S3-5.Delivery',            'offer-block-delivery'),
    ('S3-6.Mockup',              'offer-preview-block'),
    ('S3-7.Audience',            'offer-block-audience-s3'),
    ('S3-8.BeforeAfter',         'offer-block-transformation-s3'),
    ('S3-9.ReviewsCounter',      'offer-reviews-counter-block'),
    ('S3-10.Reviews',            'offer-block-reviews'),
    ('S3-11.Guarantee',          'offer-block-guarantee'),
    ('S3-12.FAQ',                'offer-block-faq'),
    ('FormTitle',                'premium-form-title-container'),
    ('Timer',                    'offer-timer-display-bottom'),
    ('PayButton',                'bottom-pay-btn'),
]

prev = -1
all_ok = True
for name, search in checks:
    pos = s1.find(search)
    ok = '✅' if pos > prev else '❌'
    if pos <= prev:
        all_ok = False
    print(f'  {ok} {name:30s} pos={pos}')
    if pos > prev:
        prev = pos

sticky_count = s1.count('id="landing-sticky-cta"')
print(f'\nSticky CTA count: {sticky_count}', '⚠️ DUPLICATE' if sticky_count > 1 else '✅')

if all_ok:
    print('\n✅ ALL BLOCKS PRESENT AND IN CORRECT ORDER')
else:
    print('\n❌ SOME BLOCKS ARE MISSING OR OUT OF ORDER')
