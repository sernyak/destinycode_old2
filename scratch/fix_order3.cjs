const fs = require('fs');

const indexPath = 'src/modules/stage-1-welcome/index.js';
let indexContent = fs.readFileSync(indexPath, 'utf8');

// 1. EXTRACT ALL NEEDED HTML BLOCKS FOR isDirectSale

// A snippet inside ds block
function extractBlock(startMarker, endMarker) {
    const startIdx = indexContent.indexOf(startMarker);
    const endIdx = indexContent.indexOf(endMarker, startIdx);
    if (startIdx === -1 || (endMarker && endIdx === -1)) return '';
    return indexContent.substring(startIdx, endMarker ? endIdx : undefined);
}

// Blocks to extract from isDirectSale
const dsStyles = extractBlock('<style>', '</style>') + '</style>\n                    `;\n';
const dsPain = extractBlock('// 2. Pain', '// 3. Paradigm');
const dsParadigm = extractBlock('// 3. Paradigm', '// 4. Solution');
const dsSolution = extractBlock('// 4. Solution', '// 5. Audience');
const dsAudience = extractBlock('// 5. Audience', '// 6. Transformation');
const dsTransformation = extractBlock('// 6. Transformation', '// 7. Structure');
const dsStructure = extractBlock('// 7. Structure', '// 8. Mockups');
const dsMockups = extractBlock('// 8. Mockups', '// 9. Delivery');
const dsDelivery = extractBlock('// 9. Delivery', '// 10. Science');
const dsScience = extractBlock('// 10. Science', '// 11. Detailed Reviews');
const dsReviews = extractBlock('// 11. Detailed Reviews', '// 12. Guarantee');
const dsGuarantee = extractBlock('// 12. Guarantee', '// 13. FAQ');
const dsFaq = extractBlock('// 13. FAQ', '}\n                } else {');

// Blocks to extract from else (original)
let dsWhatItShows = `
                    // --- 1.5. What It Shows Section ---
                    if (sections.whatItShows) {
                        landingHTML += \`
                            <div class="landing-section">
                                <h3 class="landing-title">\${sections.whatItShows.title}</h3>
                                <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 24px;">
                                    \${sections.whatItShows.items.map(item => \`
                                        <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 18px 16px; display: flex; gap: 16px; align-items: flex-start; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                                            <div style="font-size: 26px; line-height: 1; flex-shrink: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">\${item.icon}</div>
                                            <div style="font-size: 15px; color: var(--secondary-text-color); line-height: 1.45; text-align: left;">
                                                <span class="text-white font-medium">\${item.title}</span> — \${item.desc}
                                            </div>
                                        </div>
                                    \`).join('')}
                                </div>
                            </div>
                        \`;
                    }
`;

let dsHowItWorks = `
                    // --- 3. How It Works Section ---
                    if (sections.howItWorks) {
                        landingHTML += \`
                            <div class="landing-section">
                                <h3 class="landing-title">\${sections.howItWorks.title}</h3>
                                <div class="landing-how-it-works-card">
                                    <p class="landing-text-block">\${sections.howItWorks.text}</p>
                                </div>
                            </div>
                        \`;
                    }
`;

let dsFeatures = `
                    // --- 5. Features Section (What you learn about yourself) ---
                    if (sections.features) {
                        landingHTML += \`
                            <div class="landing-section">
                                <h3 class="landing-title">\${sections.features.title}</h3>
                                <div class="landing-features-grid">
                                    \${sections.features.items.map(item => \`
                                        <div class="landing-feature-card">
                                            <h4 class="landing-feature-title">\${item.title}</h4>
                                            <p class="landing-feature-desc">\${item.desc}</p>
                                        </div>
                                    \`).join('')}
                                </div>
                            </div>
                        \`;
                    }
`;


// Let's create the new combined isDirectSale body
const newDirectSaleStr = `                if (variant.isDirectSale) {
                    const mk = variant.marketing || {};
                    
                    landingHTML += \`
${dsStyles}

                    // 1. Counter is inserted by default logic outside of landingHTML, so it's already top.

${dsParadigm}
${dsWhatItShows}
${dsScience.replace('10.', '4.')}
${dsPain}
${dsHowItWorks}
${dsStructure.replace('7.', '7.')}
${dsAudience}
${dsTransformation}
${dsFeatures}
${dsDelivery.replace('9.', '11.')}
${dsMockups.replace('8.', '12.')}
${dsReviews.replace('11.', '13.')}
${dsGuarantee.replace('12.', '14.')}
${dsFaq.replace('13.', '15.')}
`;

// REPLACE the existing isDirectSale block
const blockStart = '                if (variant.isDirectSale) {';
const blockEnd = '                } else {\n                    // --- EXISTING ORIGINAL LANDING HTML LOGIC FOR OTHERS ---';
const startMarker = indexContent.indexOf(blockStart);
const endMarker = indexContent.indexOf(blockEnd);

if (startMarker !== -1 && endMarker !== -1) {
    indexContent = indexContent.substring(0, startMarker) + newDirectSaleStr + indexContent.substring(endMarker);
} else {
    console.error("Could not find blocks to replace!");
}


// FIX SCROLL BUG
indexContent = indexContent.replace(
    /const funnelContainer = document\.querySelector\('\.funnel-container'\);\s*if \(funnelContainer\) \{\s*funnelContainer\.scrollTo\(\{ top: bottomFormWrapper\.offsetTop - 20, behavior: 'smooth' \}\);\s*\}/g,
    `const premiumFormInputBox = document.getElementById('ds-premium-form');
                        if (premiumFormInputBox) {
                            premiumFormInputBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        } else {
                            const bottomFormWrapper = document.getElementById('bottom-form-wrapper');
                            if (bottomFormWrapper) bottomFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }`
);

fs.writeFileSync(indexPath, indexContent);
console.log("Reordered stage-1 blocks successfully!");
