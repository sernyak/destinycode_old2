
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, '../src/utils/constellation-data.js');
let content = fs.readFileSync(dataPath, 'utf8');

console.log("Original Leo start:", content.match(/leo:[\s\S]*?stars: \[\s*\[([\d.]+)/)?.[1]);

// Use a more robust regex approach
// We will replace the entire file content by reconstructing it or careful replacement
// But regex replace on the whole content is safest if matches are unique.

const newContent = content.replace(
    /(\w+):\s*\{[\s\S]*?stars:\s*\[([\s\S]*?)\]/g,
    (fullMatch, key, starsBlock) => {
        if (key === 'virgo') {
            return fullMatch; // Skip Virgo
        }

        console.log(`Flipping ${key}...`);

        // Match individual star arrays [x, y, s]
        // Note: handles newlines and spaces
        const newStarsBlock = starsBlock.replace(
            /\[\s*([\d.]+),\s*([\d.]+),\s*(\d)\s*\]/g,
            (starMatch, x, y, size) => {
                const oldX = parseFloat(x);
                const newX = (180 - oldX).toFixed(1);
                return `[${newX}, ${y}, ${size}]`;
            }
        );

        // Replace the inner block
        return fullMatch.replace(starsBlock, newStarsBlock);
    }
);

if (content === newContent) {
    console.error("Error: No changes were generated!");
} else {
    fs.writeFileSync(dataPath, newContent, 'utf8');
    console.log("File successfully updated.");

    // Verify
    const verifyContent = fs.readFileSync(dataPath, 'utf8');
    console.log("New Leo start:", verifyContent.match(/leo:[\s\S]*?stars: \[\s*\[([\d.]+)/)?.[1]);
}
