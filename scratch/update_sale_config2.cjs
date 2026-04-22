const fs = require('fs');

const salePath = 'src/variants/products/natal_chart_sale.js';
const landofferPath = 'src/variants/products/natal_chart_landoffer.js';

let saleContent = fs.readFileSync(salePath, 'utf8');
const landofferContent = fs.readFileSync(landofferPath, 'utf8');

// Extract features and whatItShows from landoffer
const featuresMatch = landofferContent.match(/features:\s*\{([\s\S]*?\]\s*)\}/);

if (featuresMatch && !saleContent.includes('features: {')) {
    saleContent = saleContent.replace(/landingSections:\s*\{/, `landingSections: {\n        features: {\n            ${featuresMatch[1]}\n        },`);
}

fs.writeFileSync(salePath, saleContent);
console.log("Updated config");
