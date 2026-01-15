/**
 * ================================================================================================
 * CST GATE MODULE - DYNAMIC FIELDS CONFIGURATION
 * ================================================================================================
 * 
 * Module: GATE (Graduate Aptitude Test for Engineering)
 * Table: cst_gate
 * Purpose: Manage GATE exam scores, rankings, and student performance data
 * 
 * Fields: 13 total (12 data + 1 auto id)
 * Key Metrics: Score (0-1000), Rank, Percentile, Qualification Status
 * 
 * ================================================================================================
 */

export const cstGateFieldConfig = {
  tableName: 'cst_gate',
  displayField: 'student_name',
  fields: [
    {
      name: 'roll_no',
      label: 'Roll Number',
      type: 'text',
      placeholder: 'e.g., 20A81CS001',
      required: true,
      size: 'half',
      description: 'Student roll number (unique identifier)',
      validation: {
        pattern: '^[0-9A-Za-z]+$',
        message: 'Roll number should contain only alphanumeric characters'
      }
    },
    {
      name: 'student_name',
      label: 'Student Name',
      type: 'text',
      placeholder: 'e.g., John Smith',
      required: true,
      size: 'full',
      description: 'Full name of the student'
    },
    {
      name: 'batch',
      label: 'Batch Year',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Admission batch/year',
      options: [
        { value: '2024', label: '2024' },
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' },
        { value: '2020', label: '2020' },
        { value: '2019', label: '2019' },
        { value: '2018', label: '2018' }
      ]
    },
    {
      name: 'specialization',
      label: 'Specialization',
      type: 'select',
      required: false,
      size: 'half',
      description: 'Engineering specialization',
      options: [
        { value: 'computer_science', label: 'Computer Science' },
        { value: 'electronics', label: 'Electronics & Communication' },
        { value: 'mechanical', label: 'Mechanical Engineering' },
        { value: 'civil', label: 'Civil Engineering' },
        { value: 'electrical', label: 'Electrical Engineering' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'gate_score',
      label: 'GATE Score',
      type: 'number',
      placeholder: 'e.g., 680',
      required: true,
      size: 'half',
      description: 'GATE exam score out of 1000',
      validation: {
        min: 0,
        max: 1000,
        message: 'Score must be between 0 and 1000'
      }
    },
    {
      name: 'gate_rank',
      label: 'GATE Rank',
      type: 'number',
      placeholder: 'e.g., 1234',
      required: false,
      size: 'half',
      description: 'All India GATE rank',
      validation: {
        min: 1,
        message: 'Rank must be a positive number'
      }
    },
    {
      name: 'gate_percentile',
      label: 'GATE Percentile',
      type: 'number',
      placeholder: 'e.g., 95.5',
      required: false,
      size: 'half',
      description: 'GATE percentile score',
      validation: {
        min: 0,
        max: 100,
        message: 'Percentile must be between 0 and 100'
      }
    },
    {
      name: 'exam_date',
      label: 'Exam Date',
      type: 'date',
      required: false,
      size: 'half',
      description: 'Date when GATE exam was conducted'
    },
    {
      name: 'stream',
      label: 'GATE Stream',
      type: 'select',
      required: false,
      size: 'half',
      description: 'GATE paper selected',
      options: [
        { value: 'CS', label: 'Computer Science & IT' },
        { value: 'EC', label: 'Electronics & Communication' },
        { value: 'EE', label: 'Electrical Engineering' },
        { value: 'ME', label: 'Mechanical Engineering' },
        { value: 'CE', label: 'Civil Engineering' },
        { value: 'IN', label: 'Instrumentation Engineering' },
        { value: 'BT', label: 'Biotechnology' },
        { value: 'CH', label: 'Chemical Engineering' },
        { value: 'PH', label: 'Physics' },
        { value: 'MA', label: 'Mathematics' },
        { value: 'XE', label: 'Engineering Sciences' },
        { value: 'XH', label: 'Humanities & Social Sciences' }
      ]
    },
    {
      name: 'qualified',
      label: 'Qualified',
      type: 'select',
      required: false,
      size: 'half',
      description: 'GATE qualification status',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'awaiting', label: 'Awaiting Results' }
      ]
    },
    {
      name: 'score_card_url',
      label: 'GATE Score Card',
      type: 'file',
      required: false,
      size: 'full',
      accept: '.pdf,.jpg,.jpeg,.png',
      description: 'Upload GATE score card (PDF or image file)'
    },
    {
      name: 'document_url',
      label: 'Additional Documents',
      type: 'file',
      required: false,
      size: 'full',
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      description: 'Upload any additional supporting documents (certificates, letters, etc.)'
    },
    {
      name: 'remarks',
      label: 'Remarks/Comments',
      type: 'textarea',
      required: false,
      size: 'full',
      rows: 4,
      placeholder: 'e.g., Qualified GATE 2024 with rank 1234. Currently pursuing Masters...',
      description: 'Any additional notes or remarks about the GATE performance'
    }
  ],
  searchableFields: ['student_name', 'roll_no', 'batch', 'specialization', 'stream'],
  sortableFields: ['student_name', 'gate_score', 'gate_rank', 'gate_percentile', 'batch', 'exam_date', 'created_at'],
  editableFields: ['batch', 'specialization', 'gate_score', 'gate_rank', 'gate_percentile', 'exam_date', 'stream', 'qualified', 'score_card_url', 'document_url', 'remarks']
};

/**
 * Integration Instructions:
 * 
 * 1. In /src/config/module-fields.ts, locate the CST configuration section around line 1301
 * 
 * 2. Add the following import at the top of the file:
 *    export const cstGateFieldConfig = { ... }  // Add this entire config object
 * 
 * 3. Add the gate module to the CST department configuration:
 *    'cst': {
 *      ...existing modules...
 *      'gate': cstGateFieldConfig,  // Add this line
 *      ...
 *    }
 * 
 * 4. In /src/app/api/admin/departments/[dept]/[module]/route.ts:
 *    Add mapping for GATE module:
 *    case 'gate':
 *      tableName = 'cst_gate';
 *      dept = 'cst';
 *      break;
 * 
 * 5. In /src/app/api/admin/departments/[dept]/[module]/structure/route.ts:
 *    Add mapping for GATE module:
 *    case 'gate':
 *      tableName = 'cst_gate';
 *      break;
 * 
 * 6. In /src/app/departments/cst/dashboard/page.tsx:
 *    Add GATE to the modules list:
 *    {
 *      id: 'gate',
 *      name: 'GATE',
 *      icon: 'TestTube2',
 *      description: 'GATE exam scores and performance tracking'
 *    }
 */
