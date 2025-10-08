const fs = require('fs');
const path = require('path');

// Target directory where department files are located
const departmentsDir = path.join(__dirname, '..', 'src', 'pages', 'departments');

// Color to replace
const colorPatterns = [
  /#850209/g,  // Old red color
  /#7f1d1d/g,  // Dark red color
  /#8B0000/g,  // Dark red color
  /#CD5C5C/g,  // Indian red
  /#B30000/g   // Another red variant
];

// New color
const targetColor = '#B22222';

// Get all .tsx files in the departments directory
const files = fs.readdirSync(departmentsDir)
  .filter(file => file.endsWith('.tsx'));

console.log(`Found ${files.length} department files to process`);

// Process each file
files.forEach(file => {
  const filePath = path.join(departmentsDir, file);
  
  // Read file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Count original occurrences of different color codes
  let totalReplacements = 0;
  
  // Replace all color patterns
  colorPatterns.forEach(pattern => {
    // Count occurrences before replacement
    const matches = (content.match(pattern) || []).length;
    totalReplacements += matches;
    
    // Replace the color
    content = content.replace(pattern, targetColor);
  });
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content);
  
  console.log(`Processed ${file}: ${totalReplacements} color replacements made`);
});

console.log('Color update completed successfully!');