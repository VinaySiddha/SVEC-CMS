/**
 * Test script to verify file URL field detection
 * Run this to test: node test-file-detection.mjs
 */

// Simulating the isFileUrlField function
const FILE_URL_PATTERNS = [
  'file_url',
  'document_url', 
  'pdf_url',
  'image_url',
  'attachment_url',
  'report_url',
  'certificate_url',
  'photo_url',
  'upload_url',
  'link_url'
];

function isFileUrlField(fieldName) {
  const lowerFieldName = fieldName.toLowerCase();
  return FILE_URL_PATTERNS.some(pattern => {
    // Check exact match or if field name includes the pattern
    return lowerFieldName === pattern || lowerFieldName.includes(pattern);
  });
}

// Test cases
const testCases = [
  { field: 'file_url', expected: true },
  { field: 'FILE_URL', expected: true },
  { field: 'fileUrl', expected: true },
  { field: 'document_url', expected: true },
  { field: 'pdf_url', expected: true },
  { field: 'meeting_no', expected: false },
  { field: 'name', expected: false },
  { field: 'image_url', expected: true },
  { field: 'profileUrl', expected: false }, // This should be true if we want to catch profile_url variations
];

console.log('Testing isFileUrlField function:');
console.log('================================');

testCases.forEach(({ field, expected }) => {
  const result = isFileUrlField(field);
  const status = result === expected ? '✅' : '❌';
  console.log(`${status} ${field}: ${result} (expected: ${expected})`);
});

console.log('\nTest record structure:');
const testRecord = {
  id: 1,
  meeting_no: 'BOS-001',
  meeting_date: '2025-11-15',
  file_url: '/uploads/cst/bos-minutes/minutes.pdf'
};

console.log('Record:', testRecord);
console.log('File fields detected:');
Object.entries(testRecord).forEach(([fieldName, fieldValue]) => {
  if (isFileUrlField(fieldName) && fieldValue) {
    console.log(`  ✅ ${fieldName}: ${fieldValue}`);
  }
});
