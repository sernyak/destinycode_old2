const fs = require('fs');

// 1. UPDATE src/variants/products/natal_chart_sale.js
const salePath = 'src/variants/products/natal_chart_sale.js';
const landofferPath = 'src/variants/products/natal_chart_landoffer.js';

let saleContent = fs.readFileSync(salePath, 'utf8');
const landofferContent = fs.readFileSync(landofferPath, 'utf8');

// Extract testimonials from landoffer
const testMatch = landofferContent.match(/testimonials:\s*\[([\s\S]*?)\],\s*welcomeTestimonials:/);
const welcomeTestMatch = landofferContent.match(/welcomeTestimonials:\s*\[([\s\S]*?)\],\s*faq:/);
const faqMatch = landofferContent.match(/faq:\s*\[([\s\S]*?)\]\s*\},/);

const combinedTestimonials = `[\n${testMatch[1]},\n${welcomeTestMatch[1]}\n        ]`;
const extractedFaq = `[\n${faqMatch[1]}\n        ]`;

// Add pricing block if not exists, right before tracking or after aiContext
saleContent = saleContent.replace(/testimonials:\s*\[[\s\S]*?\](?:,\s*welcomeTestimonials:\s*\[[\s\S]*?\])?,\s*faq:\s*\[[\s\S]*?\]/, 
    `testimonials: ${combinedTestimonials},\n        faq: ${extractedFaq}`);

// Add pricing block before aiContext or tracking
if (!saleContent.includes('pricing:')) {
    saleContent = saleContent.replace(/ui:\s*\{/, `pricing: { charge: { FULL_REPORT: 100 } },\n\n    ui: {`);
} else {
    saleContent = saleContent.replace(/charge:\s*\{[\s\S]*?\}/, `charge: {\n            FULL_REPORT: 100,\n            FORECAST_UPSELL: 199\n        }`);
}

fs.writeFileSync(salePath, saleContent);
console.log("Updated natal_chart_sale.js with new testimonials, FAQ, and test pricing.");

// 2. UPDATE src/modules/stage-1-welcome/index.js
const indexPath = 'src/modules/stage-1-welcome/index.js';
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Remove Counter Duplicate
const counterStart = '// 1. Counter (Social Proof)';
const counterEnd = '// 2. Pain';
const idxStart = indexContent.indexOf(counterStart);
const idxEnd = indexContent.indexOf(counterEnd);
if (idxStart !== -1 && idxEnd !== -1) {
    indexContent = indexContent.slice(0, idxStart) + indexContent.slice(idxEnd);
    console.log("Removed duplicate counter block.");
}

// Fix FAQ border
indexContent = indexContent.replace(
    /(\/\/ 13\. FAQ[\s\S]*?)<div class="offer-section-card" style="border-top: 1px solid rgba\(255,255,255,0\.1\);">/,
    `$1<div class="offer-section-card" style="border-top: none;">`
);


// 3. Fix Bottom Form styling
indexContent = indexContent.replace(
    '<div class="landing-bottom-form-wrapper" id="bottom-form-wrapper" style="scroll-margin-top: 20px;">',
    '<div id="bottom-form-wrapper" style="scroll-margin-top: 20px; position: relative;" class="z-10">'
);

// 4. Update smooth scrolling logic
indexContent = indexContent.replace(
    /bottomFormWrapper\.scrollIntoView\(\{ behavior: 'smooth', block: 'start' \}\);/g,
    `const funnelContainer = document.querySelector('.funnel-container');
                        if (funnelContainer) {
                            funnelContainer.scrollTo({ top: bottomFormWrapper.offsetTop - 20, behavior: 'smooth' });
                        }`
);

fs.writeFileSync(indexPath, indexContent);
console.log("Updated stage-1-welcome/index.js (FAQ border, bottom form styling, duplicate counter, smooth scroll).");

