#!/usr/bin/env node

// Proper endpoint fixer that actually uses the pool correctly
const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/api/cai-staff.ts',
  'src/pages/api/cai-handbooks.ts',
  'src/pages/api/cai-workshops.ts',
  'src/pages/api/cai-academictoppers.ts',
  'src/pages/api/cai-bos-members.ts',
  'src/pages/api/cai-bos-minutes.ts',
  'src/pages/api/cai-hackathons.ts',
  'src/pages/api/cai-placements.ts',
];

function fixFile(filePath) {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes("await executeQuery")) {
      return `✓ ${filePath} - Already using executeQuery`;
    }

    // Replace all [rows] = await connection.execute with const rows = await executeQuery
    content = content.replace(
      /const \[rows\]: any = await connection\.execute\(/g,
      'const rows: any = await executeQuery('
    );

    content = content.replace(
      /\[rows\] = await connection\.execute\(/g,
      'const rows: any = await executeQuery('
    );

    content = content.replace(
      /const \[rows\] = await connection\.execute\(/g,
      'const rows: any = await executeQuery('
    );

    content = content.replace(
      /\[rows\]: any = await connection\.execute\(/g,
      'const rows: any = await executeQuery('
    );

    // Clean up any remaining connection. references in GET requests
    content = content.replace(
      /const \[.*?\] = await connection\.execute\(/g,
      'const rows: any = await executeQuery('
    );

    fs.writeFileSync(fullPath, content, 'utf8');
    return `✅ ${filePath} - Updated to use executeQuery`;
  } catch (error) {
    return `❌ ${filePath} - ${error.message}`;
  }
}

console.log('\n🔧 Fixing API endpoints to properly use connection pool...\n');
filesToUpdate.forEach(file => {
  console.log(fixFile(file));
});
console.log('\n✨ Optimization complete!\n');

process.exit(0);
