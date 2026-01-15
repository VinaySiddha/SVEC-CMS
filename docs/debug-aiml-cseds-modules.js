// AIML & CSE-DS Admin Dashboard Debug Helper
// Add this to browser console to check module availability

console.log('🔍 AIML & CSE-DS Department Module Debug');

// Expected API module mappings
const AIML_MODULES = {
  'bos-members': 'aiml_bos_members',
  'bos-minutes': 'aiml_bos_minutes',
  'department-library': 'aiml_department_library',
  'department-overview': 'aiml_department_overview',
  'eresources': 'aiml_eresources',
  'extra-curricular': 'aiml_extra_curricular',
  'faculty': 'aiml_faculty',
  'faculty-achievements': 'aiml_faculty_achievements',
  'faculty-development': 'aiml_faculty_development',
  'hackathons': 'aiml_hackathons',
  'hackathons-gallery': 'aiml_hackathons_gallery',
  'handbooks': 'aiml_handbooks',
  'merit-scholarships': 'aiml_merit_scholarships',
  'mous': 'aiml_mous',
  'physical-facilities': 'aiml_physical_facilities',
  'placements': 'aiml_placements',
  'student-achievements': 'aiml_student_achievements',
  'syllabus': 'aiml_syllabus',
  'technical-faculty': 'aiml_technical_faculty',
  'workshops': 'aiml_workshops',
  'technical-association': 'aiml_technical_association',
  'staff': 'aiml_staff',
  'academic-toppers': 'aiml_academictoppers'
};

const CSE_DS_MODULES = {
  'bos-members': 'ds_bos_members',
  'bos-minutes': 'ds_bos_minutes',
  'department-library': 'ds_department_library',
  'department-overview': 'ds_department_overview',
  'eresources': 'ds_eresources',
  'extra-curricular': 'ds_extra_curricular',
  'faculty': 'ds_faculty',
  'faculty-achievements': 'ds_faculty_achievements',
  'faculty-development': 'ds_faculty_development',
  'hackathons': 'ds_hackathons',
  'handbooks': 'ds_handbooks',
  'industry-programs': 'ds_industry_programs',
  'merit-scholarships': 'ds_merit_scholarships',
  'mous': 'ds_mous',
  'newsletters': 'ds_newsletters',
  'non-teaching-faculty': 'ds_non_teaching_faculty',
  'physical-facilities': 'ds_physical_facilities',
  'placements': 'ds_placements',
  'sahaya-events': 'ds_sahaya_events',
  'scud-activities': 'ds_scud_activities',
  'student-achievements': 'ds_student_achievements',
  'syllabus': 'ds_syllabus',
  'technical-faculty': 'ds_technical_faculty',
  'training-activities': 'ds_training_activities'
};

// Module-fields.ts configured modules (what we just added)
const MODULE_FIELDS_AIML = [
  'syllabus',
  'student-achievements', 
  'faculty-achievements',
  'faculty-development',
  'mous',
  'physical-facilities'
];

const MODULE_FIELDS_CSE_DS = [
  'syllabus',
  'student-achievements',
  'faculty-achievements', 
  'faculty-development',
  'mous',
  'physical-facilities'
];

console.log('✅ AIML API Modules Available:', Object.keys(AIML_MODULES));
console.log('✅ CSE-DS API Modules Available:', Object.keys(CSE_DS_MODULES));
console.log('🔧 AIML Module-Fields Configured:', MODULE_FIELDS_AIML);
console.log('🔧 CSE-DS Module-Fields Configured:', MODULE_FIELDS_CSE_DS);

// Check for mismatches
const aimlMismatches = MODULE_FIELDS_AIML.filter(module => !AIML_MODULES[module]);
const cseDsMismatches = MODULE_FIELDS_CSE_DS.filter(module => !CSE_DS_MODULES[module]);

if (aimlMismatches.length > 0) {
  console.error('❌ AIML Module-Fields Missing from API:', aimlMismatches);
} else {
  console.log('✅ AIML All module-fields modules exist in API');
}

if (cseDsMismatches.length > 0) {
  console.error('❌ CSE-DS Module-Fields Missing from API:', cseDsMismatches);
} else {
  console.log('✅ CSE-DS All module-fields modules exist in API');
}

// Test URLs that should work
console.log('\n🎯 Test These URLs in Browser Network Tab:');
console.log('AIML:');
MODULE_FIELDS_AIML.forEach(module => {
  console.log(`  GET /api/admin/departments/aiml/${module}`);
});

console.log('\nCSE-DS:');
MODULE_FIELDS_CSE_DS.forEach(module => {
  console.log(`  GET /api/admin/departments/cse-ds/${module}`);
});

console.log('\n⚠️ Debug Instructions:');
console.log('1. Open Browser Dev Tools (F12)');
console.log('2. Go to Network tab');
console.log('3. Try to access AIML or CSE-DS admin dashboard');
console.log('4. Look for failed 404 requests');
console.log('5. Check if the URL matches the expected format above');
console.log('6. Report the exact failing URL');

export {}