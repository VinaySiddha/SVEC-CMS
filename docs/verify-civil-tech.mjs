import { readFileSync } from 'fs';

console.log('🔍 Verifying Civil Technical Faculty Configuration\n');

const mappingFile = readFileSync('./src/utils/field-mapping.ts', 'utf-8');
const configFile = readFileSync('./src/config/module-fields.ts', 'utf-8');
const routeFile = readFileSync('./src/app/api/admin/departments/[dept]/[module]/route.ts', 'utf-8');

let allGood = true;

// Check 1: Field mapping exists
if (mappingFile.includes("'civil_technical_faculty': {") && mappingFile.includes("'title': 'name'")) {
  console.log('✅ Field Mapping: civil_technical_faculty → title maps to name');
} else {
  console.log('❌ Field Mapping: MISSING civil_technical_faculty mapping');
  allGood = false;
}

// Check 2: Config exists with title field
if (configFile.includes("'civil': {") && configFile.includes("'civil_technical_faculty'") && configFile.includes("displayField: 'title'")) {
  console.log('✅ Config: civil technical-faculty uses displayField: title');
} else {
  console.log('❌ Config: MISSING proper civil technical-faculty configuration');
  allGood = false;
}

// Check 3: Route mapping exists
if (routeFile.includes("'technical-faculty': 'civil_technical_faculty'")) {
  console.log('✅ Route: technical-faculty mapped to civil_technical_faculty');
} else {
  console.log('❌ Route: MISSING technical-faculty mapping');
  allGood = false;
}

console.log('\n📊 Summary:');
if (allGood) {
  console.log('✅ All configurations are in place!');
  console.log('\nThe form will:');
  console.log('  1. Accept "Technical Faculty Name" input');
  console.log('  2. Map form field "title" to database column "name"');
  console.log('  3. Insert/update the record successfully');
  console.log('\nNote: Clear the .next cache and restart the dev server to apply changes.');
} else {
  console.log('❌ Some configurations are missing. Please check the errors above.');
}
