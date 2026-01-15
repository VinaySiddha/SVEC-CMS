#!/usr/bin/env node

// Quick test to verify faculty-research module is properly configured
const moduleFields = require('../src/config/module-fields.ts');

console.log('Testing Faculty Research Module Configuration...\n');

// Check if EEE department exists
if (!moduleFields.MODULES_FIELD_CONFIG || !moduleFields.MODULES_FIELD_CONFIG.eee) {
  console.error('❌ EEE department configuration not found');
  process.exit(1);
}

const eeeModules = moduleFields.MODULES_FIELD_CONFIG.eee;
console.log(`✓ EEE department found with ${Object.keys(eeeModules).length} modules`);

// Check if faculty-research exists
if (!eeeModules['faculty-research']) {
  console.error('❌ faculty-research module not found in EEE configuration');
  console.log('\nAvailable EEE modules:');
  Object.keys(eeeModules).forEach((mod, i) => console.log(`  ${i + 1}. ${mod}`));
  process.exit(1);
}

const facultyResearch = eeeModules['faculty-research'];
console.log('✓ faculty-research module found');

// Verify required properties
const requiredProps = ['tableName', 'displayField', 'fields'];
requiredProps.forEach(prop => {
  if (!facultyResearch[prop]) {
    console.error(`❌ Missing required property: ${prop}`);
    process.exit(1);
  }
  console.log(`✓ ${prop}: ${Array.isArray(facultyResearch[prop]) ? `${facultyResearch[prop].length} items` : facultyResearch[prop]}`);
});

// Check key fields
const requiredFields = ['research_type', 'title', 'description'];
const fieldNames = facultyResearch.fields.map(f => f.name);
requiredFields.forEach(fieldName => {
  if (!fieldNames.includes(fieldName)) {
    console.error(`❌ Missing field: ${fieldName}`);
    process.exit(1);
  }
  console.log(`✓ Field: ${fieldName}`);
});

console.log('\n✅ All checks passed! Faculty Research module is properly configured.');
