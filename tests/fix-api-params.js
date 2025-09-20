const fs = require('fs');
const path = require('path');

// Files that need to be fixed
const files = [
  'src/app/api/departments/[dept]/faculty/route.ts',
  'src/app/api/departments/[dept]/labs/route.ts',
  'src/app/api/departments/[dept]/faculty-achievements/route.ts',
  'src/app/api/departments/[dept]/workshops/route.ts',
  'src/app/api/departments/[dept]/student-achievements/route.ts'
];

function fixAwaitParams(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all occurrences of 'const { dept } = params;' with 'const { dept } = await params;'
    content = content.replace(/const { dept } = params;/g, 'const { dept } = await params;');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Fix all files
files.forEach(file => {
  const fullPath = path.join('D:/College Website/SVEC-CMS', file);
  fixAwaitParams(fullPath);
});

console.log('All API files fixed!');