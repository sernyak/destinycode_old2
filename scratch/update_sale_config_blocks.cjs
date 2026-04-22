const fs = require('fs');

const viewHtml = fs.readFileSync('src/modules/stage-3-result/view.html', 'utf8');

function extractBlock(startId, endPattern) {
    const startIndex = viewHtml.indexOf(`id="${startId}"`);
    if (startIndex === -1) return '';
    // Find the opening tag start basically
    const tagStart = viewHtml.lastIndexOf('<', startIndex);
    
    // Crude way: just find next DIV that contains END block or similar
    // I know the blocks are mostly enclosed in </div>\n\n</div>
    // Let's use cheat logic
    return viewHtml.substring(tagStart, viewHtml.indexOf(endPattern, startIndex) + endPattern.length);
}

// Just copy it directly by grep logic or manual slices
const lines = viewHtml.split('\n');

function getLinesBetween(startMarker, endMarker) {
    let start = -1;
    let end = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(startMarker)) start = i;
        if (start !== -1 && lines[i].includes(endMarker)) {
            end = i;
            break;
        }
    }
    if (start === -1 || end === -1) return '';
    return lines.slice(start, end + 1).join('\n');
}

const science = getLinesBetween('id="offer-block-science"', '<!-- BLOCK 3:');
const structure = getLinesBetween('id="offer-block-transformation"', '<!-- BLOCK 5:');
const delivery = getLinesBetween('id="offer-block-delivery"', '<!-- BLOCK 6:');
const reviews = getLinesBetween('id="offer-block-reviews"', '<!-- BLOCK 11:');
const guarantee = getLinesBetween('id="offer-block-guarantee"', '<!-- BLOCK 12:');
const premiumForm = getLinesBetween('id="premium-form-container"', '<!-- ══════');

// Modify premiumForm to replace "Skip Button" with "Payment Button"
// Wait! The payment button should be INJECTED here but it is not in the original form container.
// It was in the sticky footer. I will manually construct it.

let result = "\n\n// --- SALE CONTINUATION ---\n";
result += "landingHTML += `" + science + "`;\n";
result += "landingHTML += `" + structure + "`;\n";
result += "landingHTML += `" + delivery + "`;\n";
result += "landingHTML += `" + guarantee + "`;\n";

fs.writeFileSync('scratch/sale_blocks.txt', result);
console.log("Done");
