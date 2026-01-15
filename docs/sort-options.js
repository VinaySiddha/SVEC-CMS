#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/config/module-fields.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find all options arrays and sort them
// Regex pattern to match: options: [ ... ]
const optionsPattern = /options:\s*\[\s*\n([\s\S]*?)\s*\]/g;

let replacementCount = 0;

content = content.replace(optionsPattern, (match) => {
  // Extract the array content
  const arrayContent = match.match(/\[\s*([\s\S]*?)\s*\]/)[1];
  
  // Parse each option entry
  const entries = arrayContent.split('\n').filter(line => line.trim().includes('value:'));
  
  if (entries.length === 0) return match;
  
  // Parse into objects
  const options = [];
  for (let i = 0; i < entries.length; i++) {
    const line = entries[i].trim();
    const nextLine = i + 1 < entries.length ? entries[i + 1].trim() : '';
    
    // Try to extract value and label from current and next line
    const valueMatch = line.match(/value:\s*['"`](.*?)['"`]/);
    const labelMatch = nextLine.match(/label:\s*['"`](.*?)['"`]/) || line.match(/label:\s*['"`](.*?)['"`]/);
    
    if (valueMatch && labelMatch) {
      options.push({
        value: valueMatch[1],
        label: labelMatch[1],
        original: line
      });
    }
  }
  
  if (options.length === 0) return match;
  
  // Sort by label (case-insensitive)
  options.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
  
  // Reconstruct the options array
  const indentation = match.match(/options:\s*\[\s*\n\s*/)[0].match(/\n(\s*)/)[1];
  const sortedOptionsStr = options
    .map(opt => `${indentation}{ value: '${opt.value}', label: '${opt.label}' }`)
    .join(',\n');
  
  replacementCount++;
  return `options: [\n${sortedOptionsStr}\n${indentation.slice(0, -2)}]`;
});

// Write the sorted content back
fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ Sorting complete! ${replacementCount} options arrays sorted.`);
