const fs = require('fs');

const filePath = 'src/config/module-fields.ts';
const content = fs.readFileSync(filePath, 'utf-8');

// Find positions
const eceStart = content.indexOf("  'ece': {");
const civilStart = content.indexOf("  },\n  // ================================================================================================\n  // CIVIL DEPARTMENT", eceStart);

const ectStart = content.indexOf("  'ect': {");
const ectEnd = content.lastIndexOf('};');

console.log(`ECE starts at: ${eceStart}`);
console.log(`CIVIL starts at: ${civilStart}`);
console.log(`ECT starts at: ${ectStart}`);
console.log(`ECT ends at: ${ectEnd}`);

// Extract ECT section
let ectSection = content.substring(ectStart, ectEnd + 2);

// Replace 'ect' with 'ece' and ect_ with ece_
ectSection = ectSection.replace("'ect':", "'ece':");
ectSection = ectSection.replaceAll('ect_', 'ece_');

// Build new content
const newContent = content.substring(0, eceStart) + 
                   ectSection +
                   content.substring(civilStart);

// Write back
fs.writeFileSync(filePath, newContent);
console.log('✓ ECE section successfully copied from ECT with ece_ table names');
