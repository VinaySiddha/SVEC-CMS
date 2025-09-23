const fs = require('fs');
const path = require('path');

// This script will scan all .tsx and .ts files for any color codes that are not #B22222
// and report them for manual review

// Target directories to search
const searchDirs = [
  path.join(__dirname, '..', 'src', 'pages'),
  path.join(__dirname, '..', 'src', 'components'),
  path.join(__dirname, '..', 'src', 'app')
];

// The target color we want to use
const targetColor = '#B22222';

// Other known color codes that might need review
const colorPatternsToFind = [
  /#850209/g,
  /#7f1d1d/g,
  /#8B0000/g,
  /#CD5C5C/g,
  /#B30000/g,
  /#FF0000/g,
  /#DC143C/g,
  /#800000/g
];

// Helper function to find all files in a directory recursively
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Find all relevant files
let allFiles = [];
searchDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = findFiles(dir);
    allFiles = [...allFiles, ...files];
  }
});

console.log(`Found ${allFiles.length} files to scan for color codes`);

// Track files with remaining color codes
const filesWithColorCodes = {};

// Process each file
allFiles.forEach(filePath => {
  // Read file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for color patterns
  let foundColors = false;
  let matches = [];
  
  colorPatternsToFind.forEach(pattern => {
    const colorMatches = content.match(pattern);
    if (colorMatches && colorMatches.length > 0) {
      foundColors = true;
      matches.push(`${colorMatches[0]}: ${colorMatches.length} occurrences`);
    }
  });
  
  if (foundColors) {
    filesWithColorCodes[filePath] = matches;
  }
});

// Report findings
console.log('\n===== Color Code Scan Results =====');

if (Object.keys(filesWithColorCodes).length === 0) {
  console.log('✅ No non-standard color codes found! All files use the standard color.');
} else {
  console.log(`⚠️ Found ${Object.keys(filesWithColorCodes).length} files with non-standard color codes:`);
  
  for (const [file, colors] of Object.entries(filesWithColorCodes)) {
    console.log(`\n📄 ${file.replace(__dirname + '/../', '')}`);
    console.log(`   Colors found: ${colors.join(', ')}`);
  }
  
  console.log('\nRecommendation: Review these files and update the colors to use #B22222.');
}