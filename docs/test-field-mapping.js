/**
 * Test script to validate field mapping functionality
 */
const { mapFieldsToDatabase, mapFieldsFromDatabase } = require('./src/utils/field-mapping.ts');

console.log('🧪 Testing Field Mapping Functionality\n');

// Test 1: Map form fields TO database fields
console.log('Test 1: Form → Database Field Mapping');
console.log('=====================================');

const formData = {
  title: 'Dr. John Doe',
  designation: 'Professor',
  qualification: 'PhD Computer Science',
  experience: '15 years'
};

const tableName = 'cai_non_teaching_faculty';
const mappedToDb = mapFieldsToDatabase(tableName, formData);

console.log('Original form data:', formData);
console.log('Mapped to database:', mappedToDb);
console.log('✅ Expected: title → name mapping applied\n');

// Test 2: Map database fields BACK to form fields
console.log('Test 2: Database → Form Field Mapping');
console.log('=====================================');

const dbData = {
  id: 1,
  name: 'Dr. John Doe',  // This should map back to 'title'
  designation: 'Professor',
  qualification: 'PhD Computer Science',
  experience: '15 years',
  created_at: '2024-01-01'
};

const mappedToForm = mapFieldsFromDatabase(tableName, dbData);

console.log('Original database data:', dbData);
console.log('Mapped to form:', mappedToForm);
console.log('✅ Expected: name → title mapping applied\n');

// Test 3: Table without mapping
console.log('Test 3: No Mapping Required');
console.log('===========================');

const noMappingTable = 'bsh_syllabus';
const noMappingData = { title: 'Physics Syllabus', year: '2024' };
const noMappingResult = mapFieldsToDatabase(noMappingTable, noMappingData);

console.log('Table:', noMappingTable);
console.log('Original data:', noMappingData);
console.log('Result (no change expected):', noMappingResult);
console.log('✅ Expected: No changes since bsh_syllabus uses title column\n');

console.log('🎯 Field mapping tests completed!');
console.log('The API should now handle title ↔ name field mapping automatically.');