const fs = require('fs');
const path = require('path');

console.log('\n========================================');
console.log('RSAC Module - Code Validation Report');
console.log('========================================\n');

const filesToCheck = [
  {
    path: 'src/app/exam-section/rsac/page.tsx',
    shouldContain: [
      'const fetchItems = async () => {',
      'posted_date || item.postedDate',
      'interface RSACItem {',
      'date: string;',
      'posted_date?: string;',
      'postedDate?: string;'
    ]
  },
  {
    path: 'src/app/api/exam-section/rsac/route.ts',
    shouldContain: [
      'ORDER BY date DESC',
      'deleted_at IS NULL',
      'transformedItems'
    ]
  }
];

let allValid = true;

filesToCheck.forEach(file => {
  const filePath = path.join(__dirname, '..', file.path);
  
  console.log(`📄 Checking: ${file.path}`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}\n`);
    allValid = false;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  let fileValid = true;
  file.shouldContain.forEach(text => {
    if (!content.includes(text)) {
      console.log(`  ❌ Missing: "${text}"`);
      fileValid = false;
      allValid = false;
    }
  });
  
  if (fileValid) {
    console.log(`  ✅ All checks passed`);
  }
  console.log();
});

console.log('========================================');
if (allValid) {
  console.log('✅ All validations PASSED!');
  console.log('\nThe RSAC module is ready for testing.');
  console.log('\nNext steps:');
  console.log('1. Start the dev server: npm run dev');
  console.log('2. Navigate to: http://localhost:3000/exam-section/rsac');
  console.log('3. Test CRUD operations');
} else {
  console.log('❌ Some validations FAILED!');
  console.log('Please check the file contents.');
}
console.log('========================================\n');
