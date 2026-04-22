const fs = require('fs');
const path = '/Users/oleksandrserniak/Documents/DestinyCode/destiny-code-v2/src/variants/products/natal_chart_sale.js';
const landofferPath = '/Users/oleksandrserniak/Documents/DestinyCode/destiny-code-v2/src/variants/products/natal_chart_landoffer.js';

let saleContent = fs.readFileSync(path, 'utf8');
const landofferContent = fs.readFileSync(landofferPath, 'utf8');

// Use regex to carefully extract the entire landingSections block from landoffer
// We match from "landingSections: {" up to "aiContext" 
const landofferSectionsMatch = landofferContent.match(/landingSections:\s*\{[\s\S]*?\},\s*aiContext:/);

if (landofferSectionsMatch) {
    const landofferSectionsBlock = landofferSectionsMatch[0].replace(/,\s*aiContext:$/, '');
    
    // Now replace the landingSections block in saleContent
    // Since sale doesn't have aiContext right after, we replace until 'tracking:' or similar
    saleContent = saleContent.replace(/landingSections:\s*\{[\s\S]*?\},\s*tracking:/, landofferSectionsBlock + ',\n\n    tracking:');
    
    fs.writeFileSync(path, saleContent, 'utf8');
    console.log('Successfully updated natal_chart_sale.js landingSections!');
} else {
    console.log('Could not find landingSections in landoffer.');
}
