const fs = require('fs');
const path = require('path');

// Files to update based on the scan results
const filesToUpdate = [
  path.join(__dirname, '..', 'src', 'pages', 'Academics.tsx'),
  path.join(__dirname, '..', 'src', 'pages', 'Contact.tsx'),
  path.join(__dirname, '..', 'src', 'pages', 'Departments.tsx'),
  path.join(__dirname, '..', 'src', 'pages', 'Examinations.tsx'),
  path.join(__dirname, '..', 'src', 'pages', 'FAQs.tsx'),
  path.join(__dirname, '..', 'src', 'pages', 'Infrastructure.tsx'),
  path.join(__dirname, '..', 'src', 'pages', 'Library.tsx'),
  path.join(__dirname, '..', 'src', 'pages', 'Placements.tsx'),
  path.join(__dirname, '..', 'src', 'components', 'FixedSidebar.tsx'),
  path.join(__dirname, '..', 'src', 'components', 'Loader.tsx')
];

// Color patterns to replace
const colorPatternsToReplace = [
  { pattern: /#8B0000/g, replacement: '#B22222' },
  { pattern: /#DC143C/g, replacement: '#B22222' },
  { pattern: /#850209/g, replacement: '#B22222' },
  { pattern: /#7f1d1d/g, replacement: '#B22222' },
  { pattern: /#CD5C5C/g, replacement: '#B22222' },
  { pattern: /#B30000/g, replacement: '#B22222' },
  { pattern: /#FF0000/g, replacement: '#B22222' },
  { pattern: /#800000/g, replacement: '#B22222' }
];

console.log('Starting to update remaining files with inconsistent color codes...');

// Process each file
filesToUpdate.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${filePath}`);
    return;
  }

  // Read file content
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;
  
  // Replace all color patterns
  colorPatternsToReplace.forEach(({ pattern, replacement }) => {
    const beforeReplace = content;
    content = content.replace(pattern, replacement);
    
    // Count replacements
    const matchesCount = (beforeReplace.match(pattern) || []).length;
    replacements += matchesCount;
  });
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content);
  
  console.log(`✅ Updated ${path.basename(filePath)}: ${replacements} color code replacements made`);
});

console.log('\nColor code standardization completed successfully!');