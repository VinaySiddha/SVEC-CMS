/**
 * Field mapping utilities for handling inconsistencies between
 * form field names and database column names
 */

// Mapping for common field name translations
const FIELD_MAPPINGS: Record<string, Record<string, string>> = {
  // For tables that use 'name' instead of 'title'
  'cai_non_teaching_faculty': {
    'title': 'name'
  },
  'cai_faculty': {
    'title': 'name'
  },
  'cai_technical_faculty': {
    'title': 'name'
  },
  'cai_faculty_development_programs': {
    'category': 'type'
  },
  'ece_faculty': {
    'title': 'name'
  },
  'ece_nonteaching_faculty': {
    'title': 'name'
  },
  'ece_teaching_faculty': {
    'title': 'name'
  },
  'mech_faculty': {
    'title': 'name'
  },
  'cst_faculty': {
    'title': 'name'
  },
  'civil_faculty': {
    'title': 'name'
  },
  'civil_technical_faculty': {
    'title': 'name'
  },
  'civil_non_teaching_faculty': {
    'title': 'name'
  },
  'civil_workshops': {
    'name': 'title',
    'url': 'file_url'
  },
  'eee_faculty': {
    'title': 'name',
    'profile_url': 'profile_url'
  },
  'eee_non_teaching_faculty': {
    'title': 'name'
  },
  'eee_technical_faculty': {
    'title': 'name'
  },
  'eee_bos_members': {
    'title': 'name'
  },
  'eee_bos_minutes': {
    'title': 'name'
  },
  'eee_hackathons_gallery': {
    'title': 'name',
    'gallery': 'gallery'
  },
  'mba_faculty': {
    'title': 'name',
    'profile_url': 'profileUrl'
  },
  'mba_non_teaching_faculty': {
    'title': 'name'
  },
  'mba_technical_faculty': {
    'title': 'name'
  },
  'mba_academictoppers': {
    'file_url': 'gallery'
  },
  'mba_teaching_faculty': {
    'title': 'name'
  },
  'ect_faculty': {
    'title': 'name'
  },
  'ect_technical_faculty': {
    'title': 'name'
  },
  'ect_non_teaching_faculty': {
    'title': 'name'
  },
  'ect_scud_activities': {
    'academic_year': 'year'
  },
  'ect_faculty_achievements': {
    'category': 'type'
  },
  'ece_faculty_achievements': {
    // ECE table uses correct column names - no mapping needed
    // Keeping this entry to ensure no default mapping is applied
  },
  // ECE Student Achievements Tables - Map form field names to database column names
  'ece_awards': {},
  'ece_csp': {},
  'ece_gate': {
    'toefl': 'TOEFL',
    'gre': 'GRE',
    'ielts': 'IELTS',
    'duolingo': 'DULINGO',
    'pte': 'PTE'
  },
  'ece_gre': {
    'course': 'Course',
    'toefl': 'TOEFL',
    'gre': 'GRE',
    'ielts': 'IELTS',
    'duolingo': 'DULINGO',
    'pte': 'PTE'
  },
  'ece_icet': {
    'toefl': 'TOEFL',
    'gre': 'GRE',
    'ielts': 'IELTS',
    'duolingo': 'DULINGO',
    'pte': 'PTE'
  },
  'ece_nptel': {},
  'ece_projects': {},
  'ece_publications': {},
  'ece_roll_of_honour': {},
  'ece_research_projects': {},
  'ece_workshops_internships': {},
  'ece_faculty_achievements': {
    // ECE table uses correct column names - no mapping needed
    // Keeping this entry to ensure no default mapping is applied
  },
  // ECE Faculty Achievements Tables - Map form field names to database column names
  'ece_faculty_roll_of_honour': {},
  'ece_faculty_workshops_internships': {},
  'ece_faculty_publications': {},
  'ece_faculty_icet': {},
  'ece_faculty_gre': {},
  'ece_faculty_gate': {},
  'ece_faculty_awards_achievements': {},
  'ece_faculty_placement': {},
  'ece_faculty_higher_studies': {},
  'ece_faculty_competitive_examinations': {},
  'ece_faculty_course_certifications': {},
  'ece_faculty_internship': {},
  'ece_faculty_workshops_soc': {},
  'ece_faculty_crt': {},
  'ece_faculty_projects': {},
  'ece_faculty_csp': {},
  'ece_faculty_research_projects': {},
  'ece_faculty_nptel': {},
  'ece_faculty_achievements_pdf': {},
  'ece_faculty_achievements_placement': {},
  'ece_faculty_achievements_internships': {},
  'aiml_faculty': {
    'title': 'name'
  },
  'aiml_technical_faculty': {
    'title': 'name'
  },
  'ds_faculty': {
    'title': 'name'
  },
  'ds_non_teaching_faculty': {
    'title': 'name'
  },
  'ds_technical_faculty': {
    'title': 'name'
  },
  // Department Overview tables - do not require field mapping as column names match form field names
  // Board of Studies table - maps form 'name' to database 'member_name'
  'board_of_studies': {
    'name': 'member_name'
  },
  'board_of_studies_minutes': {
    'title': 'meeting_no'
  },
  // ECE syllabus - maps form 'fileUrl' to database 'url'
  'ece_syllabus': {
    'fileUrl': 'url'
  }
};

/**
 * Maps form field names to database column names for a specific table
 * @param tableName - The database table name
 * @param formData - The form data object with original field names
 * @returns Mapped data object with correct database column names
 */
export function mapFieldsToDatabase(tableName: string, formData: Record<string, any>): Record<string, any> {
  const mapping = FIELD_MAPPINGS[tableName];

  if (!mapping) {
    // No mapping needed for this table
    return formData;
  }

  const mappedData: Record<string, any> = {};

  for (const [formField, value] of Object.entries(formData)) {
    // Use mapped field name if exists, otherwise use original field name
    const dbField = mapping[formField] || formField;
    mappedData[dbField] = value;
  }

  return mappedData;
}

/**
 * Maps database column names back to form field names for a specific table
 * @param tableName - The database table name
 * @param dbData - The database record with original column names
 * @returns Mapped data object with form field names
 */
export function mapFieldsFromDatabase(tableName: string, dbData: Record<string, any>): Record<string, any> {
  const mapping = FIELD_MAPPINGS[tableName];

  if (!mapping) {
    // No mapping needed for this table
    return dbData;
  }

  const mappedData: Record<string, any> = { ...dbData };

  // Create reverse mapping
  const reverseMapping: Record<string, string> = {};
  for (const [formField, dbField] of Object.entries(mapping)) {
    reverseMapping[dbField] = formField;
  }

  // Apply reverse mapping
  for (const [dbField, value] of Object.entries(dbData)) {
    const formField = reverseMapping[dbField];
    if (formField) {
      mappedData[formField] = value;
      // Remove the original db field if it was mapped
      if (formField !== dbField) {
        delete mappedData[dbField];
      }
    }
  }

  return mappedData;
}

/**
 * Checks if a table needs field mapping
 * @param tableName - The database table name
 * @returns True if the table has field mappings defined
 */
export function hasFieldMapping(tableName: string): boolean {
  return tableName in FIELD_MAPPINGS;
}

/**
 * Gets the database field name for a form field
 * @param tableName - The database table name
 * @param formFieldName - The form field name
 * @returns The corresponding database field name, or the original name if no mapping exists
 */
export function getDbFieldName(tableName: string, formFieldName: string): string {
  const mapping = FIELD_MAPPINGS[tableName];
  return mapping?.[formFieldName] || formFieldName;
}

/**
 * Gets the form field name for a database field
 * @param tableName - The database table name
 * @param dbFieldName - The database field name
 * @returns The corresponding form field name, or the original name if no mapping exists
 */
export function getFormFieldName(tableName: string, dbFieldName: string): string {
  const mapping = FIELD_MAPPINGS[tableName];

  if (!mapping) {
    return dbFieldName;
  }

  // Find the form field that maps to this db field
  for (const [formField, dbField] of Object.entries(mapping)) {
    if (dbField === dbFieldName) {
      return formField;
    }
  }

  return dbFieldName;
}