/**
 * CSEAI SYLLABUS MODULE - DYNAMIC FIELDS CONFIGURATION
 * 
 * Add this configuration to: /src/config/module-fields.ts
 * Replace the existing syllabus configuration (lines 801-856)
 * 
 * Database Table: cai_syllabus
 * Columns: id, type, title, fileUrl, academic_year
 */

export const syllabusFieldConfig: ModuleFieldConfig = {
  tableName: 'cai_syllabus',
  displayField: 'title',
  fields: [
    {
      name: 'type',
      label: 'Regulation Type',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Select the SVEC regulation/curriculum version',
      options: [
        { value: 'R18', label: 'R18 (2018)' },
        { value: 'R20', label: 'R20 (2020)' },
        { value: 'R23', label: 'R23 (2023)' },
        { value: 'V20', label: 'V20 (2020)' }
      ]
    },
    {
      name: 'title',
      label: 'Syllabus Title',
      type: 'text',
      placeholder: 'e.g., B.Tech CSE-AI - II Year Syllabus',
      required: true,
      size: 'full',
      description: 'Enter the title or name of the syllabus document',
      validation: {
        min: 5,
        max: 200,
        pattern: '^[a-zA-Z0-9\\s\\-.,()]+$',
        message: 'Title must be 5-200 characters with alphanumeric characters and basic punctuation'
      }
    },
    {
      name: 'academic_year',
      label: 'Academic Year',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Select the academic year this syllabus applies to',
      options: [
        { value: '2023-24', label: '2023-24' },
        { value: '2024-25', label: '2024-25' },
        { value: '2025-26', label: '2025-26' },
        { value: '2026-27', label: '2026-27' }
      ]
    },
    {
      name: 'fileUrl',
      label: 'Syllabus PDF Document',
      type: 'file',
      required: true,
      size: 'full',
      accept: '.pdf,.doc,.docx',
      description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
    }
  ],
  searchableFields: ['title', 'type', 'academic_year'],
  sortableFields: ['title', 'type', 'academic_year', 'created_at'],
  editableFields: ['type', 'title', 'academic_year', 'fileUrl']
};

/**
 * INTEGRATION POINT IN MODULES_FIELD_CONFIG
 * 
 * Find the 'cse-ai' section and update the 'syllabus' key:
 * 
 * export const MODULES_FIELD_CONFIG: Record<string, Record<string, ModuleFieldConfig>> = {
 *   'cse-ai': {
 *     'workshops': workshopsFieldConfig,
 *     'faculty': { ... },
 *     'syllabus': syllabusFieldConfig,  // ← USE THIS CONFIG
 *     'student-achievements': { ... },
 *     ...
 *   },
 *   ...
 * };
 */