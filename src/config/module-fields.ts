/**
 * ================================================================================================
 * MODULE FIELD CONFIGURATION - ORGANIZED BY DEPARTMENT
 * ================================================================================================
 * 
 * This file defines the form fields and their metadata for each department module
 * Used by the admin dashboard for dynamic form rendering
 * 
 * Department Structure:
 * - CSE-AI: Computer Science & AI (Table Prefix: cai_*)
 * - CST: Computer Science & Technology (Table Prefix: cst_*)  
 * - ECE: Electronics & Communication Engineering (Table Prefix: ece_*)
 * - Civil: Civil Engineering (Table Prefix: civil_*)
 * - BSH: Basic Sciences & Humanities (Table Prefix: bsh_*)
 * - MBA: Business Administration (Table Prefix: mba_*)
 * - AIML: AI & Machine Learning (Table Prefix: aiml_*)
 * - CSE-DS: Computer Science & Data Science (Table Prefix: ds_*)
 * 
 * ================================================================================================
 */

export type FieldType = 'text' | 'email' | 'number' | 'date' | 'textarea' | 'select' | 'file' | 'checkbox';
export type FieldSize = 'full' | 'half' | 'third';

export interface ModuleField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  size?: FieldSize; // For grid layout
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  options?: Array<{ value: string; label: string }>; // For select fields
  accept?: string; // For file fields (e.g., ".pdf,.doc,.docx")
  description?: string; // Help text below field
  rows?: number; // For textarea
  hidden?: boolean; // Hide from form but include in submission
}

export interface ModuleFieldConfig {
  tableName?: string;
  displayField?: string; // Field to show in list view
  fields?: ModuleField[];
  searchableFields?: string[]; // Fields to search by
  sortableFields?: string[]; // Fields that can be sorted
  editableFields?: string[]; // Fields that can be edited (exclude id, created_at, etc)
  // Multi-table support
  displayName?: string; // For multi-table modules
  autoGenerateTitle?: boolean; // For multi-table modules
  isMultiTable?: boolean; // Flag indicating this is a multi-table module
  tables?: Record<string, any>; // For multi-table modules with nested tables
  tableOptions?: Array<{ value: string; label: string }>; // For research-center type modules
  tableConfigs?: Record<string, any>; // For research-center type modules
}

/**
 * Workshops Module Field Configuration
 * Table: cai_workshops
 * Fields: id, category, year, title, file_url, created_at
 */
export const workshopsFieldConfig: ModuleFieldConfig = {
  tableName: 'cai_workshops',
  displayField: 'title',
  fields: [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Select the workshop category',
      options: [

        { value: 'Academic Toppers', label: 'Academic Toppers' },
        { value: 'SOC', label: 'SOC' },
        { value: 'Guest Lecturers/Seminars', label: 'Guest Lecturers/Seminars' },
        { value: 'Workshops', label: 'Workshops' }
      ]
    },
    {
      name: 'title',
      label: 'Workshop Title',
      type: 'text',
      placeholder: 'e.g., Machine Learning Fundamentals',
      required: true,
      size: 'full',
      description: 'Enter the title of the workshop'
    },

    {
      name: 'file_url',
      label: 'Workshop Document/Brochure',
      type: 'file',
      required: false,
      size: 'full',
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
    }
  ],
  searchableFields: ['title', 'category',],
  sortableFields: ['title', 'category', 'created_at'],
  editableFields: ['title', 'category', 'file_url']
};

/**
 * Complete module field configurations for all departments
 * Structure: { dept: { module: config } }
 */
export const MODULES_FIELD_CONFIG: Record<string, Record<string, ModuleFieldConfig>> = {

  // ================================================================================================
  // CSE-AI DEPARTMENT (Computer Science & AI)
  // Table Prefix: cai_*
  // 
  // Modules (alphabetical order):
  // • academic-toppers, bos-members, bos-minutes, department-overview, eresources
  // • extra-curricular, faculty, faculty-achievements, faculty-development, hackathons
  // • hackathons-gallery, merit-scholarships, mous, newsletters, non-teaching-faculty
  // • placements, student-achievements, syllabus, technical-association, technical-faculty, workshops
  // ================================================================================================
  'cse-ai': {
    'workshops': workshopsFieldConfig,
    'faculty': {
      tableName: 'cai_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Computer Science',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profileUrl',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile photo or image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'qualification', 'designation', 'date_of_joining', 'profileUrl']
    },
    'technical-faculty': {
      tableName: 'cai_technical_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when technical faculty member joined'
        }

      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'technical-association': {
      tableName: 'cai_technical_association',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the category',
          options: [
            { value: 'eapcet', label: 'EAPCET Rankers' },
            { value: 'engday', label: 'Engineer\'s Day' },
          ]
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Workshop Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Fundamentals',
          required: true,
          size: 'full',
          description: 'Enter the title of the workshop'
        },

        {
          name: 'file_url',
          label: 'Workshop Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category', 'academic_year'],
      sortableFields: ['title', 'category', 'academic_year', 'created_at'],
      editableFields: ['title', 'category', 'academic_year', 'file_url']
    },

    'non-teaching-faculty': {
      tableName: 'cai_non_teaching_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'academic-toppers': {
      tableName: 'cai_academictoppers',
      displayField: 'particulars',
      fields: [
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the batch year'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year in YYYY-YY format'
        },
        {
          name: 'particulars',
          label: 'Particulars/Details',
          type: 'text',
          placeholder: 'e.g., Academic Toppers',
          required: true,
          size: 'full',
          description: 'Enter details about the achievement'
        },
        {
          name: 'no_of_students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students who benefited'
        },
        {
          name: 'scholarship_amount',
          label: 'Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 99500',
          required: false,
          size: 'half',
          description: 'Total scholarship amount in rupees'
        },
        {
          name: 'file_url',
          label: 'Certificate/Document Upload',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['batch', 'particulars', 'academic_year'],
      sortableFields: ['batch', 'academic_year', 'no_of_students_benefited', 'created_at'],
      editableFields: ['batch', 'academic_year', 'particulars', 'no_of_students_benefited', 'scholarship_amount', 'file_url']
    },
    'faculty-achievements': {
      tableName: 'cai_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' }
          ]
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'physical-facilities': {
      tableName: 'cai_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },

    'faculty-development': {
      tableName: 'cai_faculty_development_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },
            { value: 'Gallery', label: 'Gallery' }
          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },

    'placements': {
      tableName: 'cai_placements',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter title',
          required: false,
          size: 'full',
          description: 'Enter the placement title or description'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/cseai/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    'hackathons-gallery': {
      tableName: 'cai_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'academic toppers', label: 'Academic Toppers' },
            { value: 'technical association', label: 'Technical Association' },
            { value: 'extracurricular activities', label: 'Extracurricular Activities' },
            { value: 'laboratories', label: 'Laboratories' },
            { value: 'placements', label: 'Placements' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Title/Caption',
          type: 'text',
          placeholder: 'e.g., Company Visit or Event Name',
          required: false,
          size: 'half',
          description: 'Optional title or caption for the image'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year', 'title'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'title', 'gallery']
    },
    'bos-members': {
      tableName: 'cai_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'cai_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },
    'eresources': {
      tableName: 'cai_eresources',
      displayField: 'subject_name',
      fields: [
        {
          name: 'regulation',
          label: 'Regulation',
          type: 'text',
          placeholder: 'e.g., R18, R20',
          required: true,
          size: 'half'
        },
        {
          name: 'semester',
          label: 'Semester',
          type: 'text',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'subject_name',
          label: 'Subject Name',
          type: 'text',
          placeholder: 'e.g., Data Structures',
          required: true,
          size: 'full'
        },
        {
          name: 'file_type',
          label: 'File Type',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'PPT', label: 'PowerPoint (PPT)' },
            { value: 'PDF', label: 'PDF' },
            { value: 'DOCX', label: 'Document (DOCX)' },
            { value: 'XLS', label: 'Spreadsheet (XLS)' },
            { value: 'Video', label: 'Video' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half'
        },
        {
          name: 'file_url',
          label: 'Resource File',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.ppt,.pptx,.docx,.xls,.xlsx,.mp4,.mov'
        }
      ],
      searchableFields: ['subject_name', 'regulation', 'semester'],
      sortableFields: ['subject_name', 'regulation', 'semester', 'academic_year'],
      editableFields: ['regulation', 'semester', 'subject_name', 'file_type', 'academic_year', 'file_url']
    },
    'hackathons': {
      tableName: 'cai_hackathons',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Hackathon Title',
          type: 'text',
          placeholder: 'e.g., Annual Hackathon 2024',
          required: true,
          size: 'full'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter hackathon details and objectives',
          required: false,
          size: 'full',
          rows: 4
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'approved', label: 'Approved' },
            { value: 'pending', label: 'Pending' },
            { value: 'draft', label: 'Draft' }
          ]
        },
        {
          name: 'brochure_url',
          label: 'Brochure',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.jpg,.jpeg,.png'
        },
        {
          name: 'winners_url',
          label: 'Winners Details',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'event_date', 'status', 'created_at'],
      editableFields: ['title', 'academic_year', 'event_date', 'description', 'status', 'brochure_url', 'winners_url']
    },
    'newsletters': {
      tableName: 'cai_newsletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },
        {
          name: 'publish_date',
          label: 'Publish Date',
          type: 'date',
          required: true,
          size: 'half'
        },
        {
          name: 'pdf_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year', 'publish_date'],
      editableFields: ['title', 'volume', 'issue', 'year', 'publish_date', 'pdf_url']
    },
    'merit-scholarships': {
      tableName: 'cai_merit_scholarships',
      displayField: 'particulars',
      fields: [
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half'
        },
        {
          name: 'particulars',
          label: 'Details',
          type: 'text',
          placeholder: 'e.g., Merit Scholarship Details',
          required: false,
          size: 'full'
        },
        {
          name: 'students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 50',
          required: false,
          size: 'half'
        },
        {
          name: 'scholarship_amount',
          label: 'Total Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 500000',
          required: false,
          size: 'half'
        }
      ],
      searchableFields: ['particulars', 'academic_year'],
      sortableFields: ['academic_year', 'scholarship_amount', 'students_benefited'],
      editableFields: ['academic_year', 'particulars', 'students_benefited', 'scholarship_amount']
    },
    'mous': {
      tableName: 'cai_mous',
      displayField: 'mou_with',
      fields: [
        {
          name: 'mou_with',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full'
        },
        {
          name: 'from_date',
          label: 'MOU Start Date',
          type: 'text',
          placeholder: 'e.g., 2024-01-15 or 01-01-2024',
          required: true,
          size: 'half'
        },
        {
          name: 'to_date',
          label: 'MOU End Date',
          type: 'text',
          placeholder: 'e.g., 2026-01-14 or 31-12-2026',
          required: true,
          size: 'half'
        },
        {
          name: 'status',
          label: 'MOU Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'Till Date', label: 'Till Date' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Terminated', label: 'Terminated' },

          ]
        }
      ],
      searchableFields: ['mou_with', 'status'],
      sortableFields: ['mou_with', 'from_date', 'to_date', 'status', 'created_at'],
      editableFields: ['mou_with', 'from_date', 'to_date', 'status']
    },
    'syllabus': {
      tableName: 'cai_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'Syllabus', value: 'syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },

    'student-achievements': {
      tableName: 'cai_student_achievements',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'Internships', label: 'Internships' },
            { value: 'Conference Publications', label: 'Conference Publications' },
            { value: 'NPTEL/Other Certifications', label: 'NPTEL/Other Certifications' },
            { value: 'Global Certifications', label: 'Global Certifications' },
            { value: 'Community Service Project', label: 'Community Service Project' },
            { value: 'Student Research Projects', label: 'Student Research Projects' }
          ]
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half',
          description: 'Academic year'
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'file_url',
          label: 'Certificate/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'extra-curricular': {
      tableName: 'cai_extracurricular_activities',

      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the workshop category',
          options: [
            { value: 'Extra Curricular', label: 'Extra Curricular' },
            { value: 'Maitri Coordinators', label: 'Maitri Coordinators' },
            { value: 'Maitri Events', label: 'Maitri Events' },

          ]
        },
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Activity Title',
          type: 'text',
          placeholder: 'e.g., Sports Day, Cultural Fest',
          required: true,
          size: 'full',
          description: 'Enter the title of the activity'
        },

        {
          name: 'file_url',
          label: 'Activity Document/Photo',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload activity document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'department-overview': {
      tableName: 'cai_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',

          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    }
  },

  // ================================================================================================
  'cst': {


    'faculty': {
      tableName: 'cst_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },

        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Computer Science',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profileUrl',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile photo or image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'qualification', 'designation', 'date_of_joining', 'profileUrl']
    },
    'workshops': {
      tableName: 'cst_workshops',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the workshop category',
          options: [

            { value: 'Guest Lecturers/Seminars', label: 'Guest Lecturers/Seminars' },
            { value: 'Workshops/SOC', label: 'Workshops/SOC' }
          ]
        },
        {
          name: 'title',
          label: 'Workshop Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Fundamentals',
          required: true,
          size: 'full',
          description: 'Enter the title of the workshop'
        },

        {
          name: 'file_url',
          label: 'Workshop Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category',],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'physical-facilities': {
      tableName: 'cst_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'technical-faculty': {
      tableName: 'cst_technical_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer, System Admin, Programmer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        }
      ],
      searchableFields: ['name', 'designation'],
      sortableFields: ['name', 'designation', 'id'],
      editableFields: ['name', 'designation']
    },
    'technical-association': {
      tableName: 'cst_technical_association',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., Technical Event or Activity',
          required: true,
          size: 'full',
          description: 'Enter the title of the technical association event or activity'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Brief description of the event',
          required: false,
          size: 'full',
          description: 'Enter a brief description'
        },
        {
          name: 'content',
          label: 'Detailed Content',
          type: 'textarea',
          placeholder: 'Detailed information about the event',
          required: false,
          size: 'full',
          description: 'Enter detailed content if needed'
        },
        {
          name: 'date_created',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Select the event date'
        },
        {
          name: 'image_url',
          label: 'Event Image',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.jpg,.jpeg,.png',
          description: 'Upload event image (JPG or PNG)'
        },
        {
          name: 'file_url',
          label: 'Document',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx',
          description: 'Upload event document or brochure (PDF or DOC)'
        },
        {
          name: 'link',
          label: 'External Link',
          type: 'text',
          placeholder: 'https://example.com',
          required: false,
          size: 'half',
          description: 'External link related to the event (optional)'
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ],
          description: 'Event status'
        }
      ],
      searchableFields: ['title', 'description', 'status'],
      sortableFields: ['title', 'date_created', 'status', 'created_at'],
      editableFields: ['title', 'description', 'content', 'date_created', 'image_url', 'file_url', 'link', 'status']
    },
    'non-teaching-faculty': {
      tableName: 'cst_non_teaching_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['name', 'designation'],
      sortableFields: ['name', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['name', 'designation', 'date_of_joining']
    },
    'academic-toppers': {
      tableName: 'cst_academictoppers',
      displayField: 'particulars',
      fields: [
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the batch year'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year in YYYY-YY format'
        },
        {
          name: 'particulars',
          label: 'Particulars/Details',
          type: 'text',
          placeholder: 'e.g., Academic Toppers',
          required: true,
          size: 'full',
          description: 'Enter details about the achievement'
        },
        {
          name: 'no_of_students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students who benefited'
        },
        {
          name: 'scholarship_amount',
          label: 'Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 99500',
          required: false,
          size: 'half',
          description: 'Total scholarship amount in rupees'
        },
        {
          name: 'file_url',
          label: 'Certificate/Document Upload',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['batch', 'particulars', 'academic_year'],
      sortableFields: ['batch', 'academic_year', 'no_of_students_benefited', 'created_at'],
      editableFields: ['batch', 'academic_year', 'particulars', 'no_of_students_benefited', 'scholarship_amount', 'file_url']
    },
    'faculty-achievements': {
      tableName: 'cst_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' },
            { value: 'Awards', label: 'Awards' }
          ]
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'faculty-development': {
      tableName: 'cst_faculty_development_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },

          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'placements': {
      tableName: 'cst_placements',
      displayField: 'batch',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/cseai/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    'hackathons-gallery': {
      tableName: 'cst_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'eapcet', label: 'EAPCET Toppers' },
            { value: 'toppers', label: 'Academic Toppers' },
            { value: 'technical', label: 'Technical Association' },
            { value: 'activities', label: 'Extracurricular Activities' },
            { value: 'labs', label: 'Laboratories' },
            { value: 'placements', label: 'Placements' },
            { value: 'training', label: 'Training Activities' },
            { value: 'gate', label: 'GATE' },
            { value: 'honour', label: 'Roll of Honour' },
            { value: 'workshops', label: 'Workshops' },
            { value: 'lectures', label: 'Guest Lecturers' },
            { value: 'faculty', label: 'Faculty Development Programs' },



          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'gallery']
    },

    'bos-members': {
      tableName: 'cst_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'cst_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },

    'eresources': {
      tableName: 'cst_eresources',
      displayField: 'subject_name',
      fields: [
        {
          name: 'regulation',
          label: 'Regulation',
          type: 'text',
          placeholder: 'e.g., R18, R20',
          required: true,
          size: 'half'
        },
        {
          name: 'semester',
          label: 'Semester',
          type: 'text',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'subject_name',
          label: 'Subject Name',
          type: 'text',
          placeholder: 'e.g., Data Structures',
          required: true,
          size: 'full'
        },
        {
          name: 'file_type',
          label: 'File Type',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'PPT', label: 'PowerPoint (PPT)' },
            { value: 'PDF', label: 'PDF' },
            { value: 'DOCX', label: 'Document (DOCX)' },
            { value: 'XLS', label: 'Spreadsheet (XLS)' },
            { value: 'Video', label: 'Video' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half'
        },
        {
          name: 'file_url',
          label: 'Resource File',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.ppt,.pptx,.docx,.xls,.xlsx,.mp4,.mov'
        }
      ],
      searchableFields: ['subject_name', 'regulation', 'semester'],
      sortableFields: ['subject_name', 'regulation', 'semester', 'academic_year'],
      editableFields: ['regulation', 'semester', 'subject_name', 'file_type', 'academic_year', 'file_url']
    },
    'hackathons': {
      tableName: 'cst_hackathons',
      displayField: 'title',
      fields: [

        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half'
        },



        {
          name: 'brochure_url',
          label: 'Brochure',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.jpg,.jpeg,.png'
        },
        {
          name: 'winners_url',
          label: 'Winners Details',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'created_at'],
      editableFields: ['title', 'academic_year', 'brochure_url', 'winners_url']
    },
    'newsletters': {
      tableName: 'cst_newsletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },

        {
          name: 'file_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year'],
      editableFields: ['title', 'volume', 'issue', 'year', 'file_url']
    },
    'merit-scholarships': {
      tableName: 'cst_merit_scholarships',
      displayField: 'particulars',
      fields: [
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half'
        },
        {
          name: 'particulars',
          label: 'Details',
          type: 'text',
          placeholder: 'e.g., Merit Scholarship Details',
          required: false,
          size: 'full'
        },
        {
          name: 'students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 50',
          required: false,
          size: 'half'
        },
        {
          name: 'scholarship_amount',
          label: 'Total Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 500000',
          required: false,
          size: 'half'
        }
      ],
      searchableFields: ['particulars', 'academic_year'],
      sortableFields: ['academic_year', 'scholarship_amount', 'students_benefited'],
      editableFields: ['academic_year', 'particulars', 'students_benefited', 'scholarship_amount']
    },
    'eapcet-toppers': {
      tableName: 'cst_eapcet_toppers',
      displayField: 'name_of_student',
      fields: [
        {
          name: 'year',
          label: 'Year',
          type: 'number',
          placeholder: 'e.g., 2025',
          required: true,
          size: 'half',
          description: 'Enter the year of EAPCET exam'
        },
        {
          name: 'particulars',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'EAPCET Toppers', label: 'EAPCET Toppers' }
          ],
          description: 'Select the category (EAPCET Toppers)'
        },
        {
          name: 'name_of_student',
          label: 'Name of Student',
          type: 'text',
          placeholder: 'e.g., Y. Lohitha',
          required: true,
          size: 'full',
          description: 'Enter the full name of the EAPCET topper',
          validation: {
            min: 3,
            max: 255,
            pattern: '^[a-zA-Z\\s.\\-]+$',
            message: 'Name should contain only alphabetic characters, spaces, dots, and hyphens'
          }
        },
        {
          name: 'student_rank',
          label: 'EAPCET Rank',
          type: 'number',
          placeholder: 'e.g., 24402',
          required: true,
          size: 'half',
          description: 'Enter the EAPCET rank obtained by the student'
        }
      ],
      searchableFields: ['name_of_student', 'year', 'student_rank'],
      sortableFields: ['year', 'student_rank', 'name_of_student', 'created_at'],
      editableFields: ['year', 'particulars', 'name_of_student', 'student_rank']
    },
    'mous': {
      tableName: 'cst_mous',
      displayField: 'organization_name',
      fields: [
        {
          name: 'organization_name',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full',
          description: 'Enter the name of the organization or institute'
        },
        {
          name: 'from_date',
          label: 'MOU Start Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the MOU start date'
        },
        {
          name: 'to_date',
          label: 'MOU End Date',
          type: 'text',
          placeholder: 'e.g., Till Date or 2026-12-31',
          required: true,
          size: 'half',
          description: 'Enter end date or "Till Date" if ongoing'
        },
        {
          name: 'document_url',
          label: 'MOU Document',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload the MOU document or agreement (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['organization_name', 'to_date'],
      sortableFields: ['organization_name', 'from_date', 'to_date', 'created_at'],
      editableFields: ['organization_name', 'from_date', 'to_date', 'document_url']
    },
    'industry-programs': {
      tableName: 'cst_industry_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Industry Interaction Session, Corporate Training',
          required: true,
          size: 'full',
          description: 'Enter the title of the industry program or interaction'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },

        {
          name: 'file_url',
          label: 'Program Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program details, brochure, or related document (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year'],
      editableFields: ['title', 'academic_year', 'file_url']
    },
    'syllabus': {
      tableName: 'cst_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'Syllabus', value: 'syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },

    'student-achievements': {
      tableName: 'cst_student_achievements',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'Internships', label: 'Internships' },
            { value: 'Journals', label: 'Journals' },
            { value: 'Conference Publications', label: 'Conference Publications' },
            { value: 'NPTEL/Other Certifications', label: 'NPTEL/Other Certifications' },
            { value: 'Global Certifications', label: 'Global Certifications' },
            { value: 'Community Service Project', label: 'Community Service Project' },
            { value: 'Student Research Projects', label: 'Student Research Projects' },
            { value: 'Awards', label: 'Awards' },
            { value: 'GIF', label: 'GIF' }
          ]
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half',
          description: 'Academic year'
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'file_url',
          label: 'Certificate/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'extra-curricular': {
      tableName: 'cst_extra_curricular',
      displayField: 'title',
      fields: [
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Academic year of the activity'
        },
        {
          name: 'type',
          label: 'Activity Type',
          type: 'text',
          placeholder: 'e.g., Cultural, Sports, Technical',
          required: false,
          size: 'half',
          description: 'Type of extra-curricular activity'
        },
        {
          name: 'title',
          label: 'Activity Title',
          type: 'text',
          placeholder: 'e.g., Annual Sports Day, Tech Fest',
          required: true,
          size: 'full',
          description: 'Title of the extra-curricular activity'
        },
        {
          name: 'file_url',
          label: 'Activity Document/Certificate URL',
          type: 'text',
          placeholder: 'Enter file URL',
          required: false,
          size: 'full',
          description: 'URL to activity document or certificate'
        }
      ],
      searchableFields: ['title', 'type', 'year'],
      sortableFields: ['title', 'year', 'type', 'created_at'],
      editableFields: ['year', 'type', 'title', 'file_url']
    },
    'activity-coordinators': {
      tableName: 'cst_activity_coordinators',
      displayField: 'name',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'name',
          label: 'Coordinator Name',
          type: 'text',
          placeholder: 'e.g., Mr. M Yesu Sekharam',
          required: true,
          size: 'full',
          description: 'Name of the coordinator'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Assistant Professor',
          required: false,
          size: 'half',
          description: 'Job designation'
        },
        {
          name: 'role',
          label: 'Role Type',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'faculty_coordinator', label: 'Faculty Coordinator' },
            { value: 'student_coordinator', label: 'Student Coordinator' },
            { value: 'co_coordinator', label: 'Co-Coordinator' }
          ],
          description: 'Coordinator role type'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., name@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in frontend'
        }
      ],
      searchableFields: ['name', 'designation', 'role'],
      sortableFields: ['name', 'role', 'order_seq', 'created_at'],
      editableFields: ['name', 'designation', 'role', 'email', 'phone', 'order_seq']
    },
    'activity-events': {
      tableName: 'cst_activity_events',
      displayField: 'event_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: true,
          size: 'half',
          description: 'Year the event was conducted'
        },
        {
          name: 'event_title',
          label: 'Event Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event 2023',
          required: true,
          size: 'full',
          description: 'Title or name of the event'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Date the event was conducted'
        },
        {
          name: 'description',
          label: 'Event Description',
          type: 'textarea',
          placeholder: 'Enter event details and outcomes',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of the event'
        },
        {
          name: 'file_url',
          label: 'Event Document/Report',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event report, certificate, or document'
        },
        {
          name: 'image_url',
          label: 'Event Photo',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload event photo/image'
        }
      ],
      searchableFields: ['event_title', 'academic_year'],
      sortableFields: ['event_title', 'event_date', 'academic_year', 'created_at'],
      editableFields: ['academic_year', 'event_title', 'event_date', 'description', 'file_url', 'image_url']
    },
    'activity-gallery': {
      tableName: 'cst_activity_gallery',
      displayField: 'image_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Year of the activity'
        },
        {
          name: 'image_url',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload image for gallery (JPG, PNG, GIF, or WebP)'
        },
        {
          name: 'image_title',
          label: 'Image Caption/Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event Group Photo',
          required: false,
          size: 'full',
          description: 'Caption or title for the image'
        },
        {
          name: 'description',
          label: 'Image Description',
          type: 'textarea',
          placeholder: 'Enter description of the image',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Detailed description of what the image shows'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in gallery'
        }
      ],
      searchableFields: ['image_title', 'academic_year'],
      sortableFields: ['image_title', 'academic_year', 'order_seq', 'created_at'],
      editableFields: ['academic_year', 'image_url', 'image_title', 'description', 'order_seq']
    },
    'department-overview': {
      tableName: 'cst_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',

          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    },
    'gate': {
      tableName: 'cst_gate',
      displayField: 'name',
      fields: [
        {
          name: 'rollno',
          label: 'Roll Number',
          type: 'text',

          required: true,
          size: 'half',
          description: 'Student roll number'
        },
        {
          name: 'name',
          label: 'Student Name',
          type: 'text',

          required: true,
          size: 'half',
          description: 'Full name of the student'
        },
        {
          name: 'score',
          label: 'GATE Score',
          type: 'number',
          placeholder: 'Enter score',
          required: true,
          size: 'half',
          description: 'GATE exam score'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Academic year'
        }
      ],
      searchableFields: ['name', 'roll_no'],
      sortableFields: ['name', 'score', 'year', 'created_at'],
      editableFields: ['name', 'score', 'year']
    },
    'roll-of-honour': {
      tableName: 'cst_roll_of_honour',
      displayField: 'name',
      fields: [
        {
          name: 'rollno',
          label: 'Roll Number',
          type: 'text',
          placeholder: 'e.g., CST2021001',
          required: true,
          size: 'half',
          description: 'Student roll number'
        },
        {
          name: 'name',
          label: 'Student Name',
          type: 'text',
          placeholder: 'Enter full name',
          required: true,
          size: 'half',
          description: 'Full name of the student'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Batch/Year'
        },
        {
          name: 'cgpa',
          label: 'CGPA',
          type: 'text',
          placeholder: 'e.g., 9.5',
          required: true,
          size: 'half',
          description: 'Cumulative Grade Point Average'
        }
      ],
      searchableFields: ['name', 'rollno', 'batch'],
      sortableFields: ['name', 'cgpa', 'batch', 'created_at'],
      editableFields: ['name', 'batch', 'cgpa']
    },
    'sahaya-events': {
      tableName: 'cst_sahaya_events',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., Sahaya Events',
          required: true,
          size: 'full',
          description: 'Enter the title for the Sahaya event section',
          validation: {
            max: 1000,
            message: 'Title must not exceed 1000 characters'
          }
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Enter the year of the event'
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the category for this event',
          options: [
            { value: 'ecactivities', label: 'EC Activities' },
            { value: 'sahaya', label: 'Sahaya' }
          ]
        },
        {
          name: 'file_url',
          label: 'Event Document/PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event document, certificate, or related file (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'year', 'category'],
      sortableFields: ['title', 'year', 'category', 'created_at'],
      editableFields: ['title', 'year', 'category', 'file_url']
    }
  },

  // ================================================================================================
  // EEE DEPARTMENT (Electrical & Electronics Engineering)
  // Table Prefix: eee_*
  // 
  // Modules (alphabetical order):
  // • academic-toppers, activity-coordinators, activity-events, activity-gallery, bos-members
  // • bos-minutes, department-overview, eapcet-toppers, eresources, extra-curricular, faculty
  // • faculty-achievements, faculty-development, gate, hackathons, hackathons-gallery, industry-programs
  // • merit-scholarships, mous, newsletters, non-teaching-faculty, physical-facilities, placements
  // • roll-of-honour, sahaya-events, student-achievements, syllabus, technical-association, technical-faculty, workshops
  // ================================================================================================
  'eee': {

'department-library': {
      tableName: 'eee_department_library',
      displayField: 'titles',
      fields: [
        {
          name: 'titles',
          label: 'Number of Titles',
          type: 'text',
          placeholder: 'e.g., 1500',
          required: true,
          size: 'half',
          description: 'Total number of unique titles in library'
        },
        {
          name: 'volumes',
          label: 'Number of Volumes',
          type: 'text',
          placeholder: 'e.g., 2000',
          required: true,
          size: 'half',
          description: 'Total number of volumes in library'
        },
        {
          name: 'faculty_incharge',
          label: 'Faculty In-charge',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Name of faculty member responsible for library'
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., library@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter library information and resources',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of library facilities and resources'
        },
        {
          name: 'image_url',
          label: 'Library Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload library image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['faculty_incharge', 'titles'],
      sortableFields: ['titles', 'volumes', 'created_at'],
      editableFields: ['titles', 'volumes', 'faculty_incharge', 'phone', 'email', 'description', 'image_url']
    },
    'faculty': {
      tableName: 'eee_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },

        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Computer Science',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profile_url',
          label: 'Profile Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload profile photo or image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'qualification', 'designation', 'date_of_joining', 'profile_url']
    },
    'workshops': {
      tableName: 'eee_workshops',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the workshop category',
          options: [

            { value: 'Guest Lecturers/Seminars', label: 'Guest Lecturers/Seminars' },
            { value: 'Workshops/SOC', label: 'Workshops/SOC' }
          ]
        },
        {
          name: 'title',
          label: 'Workshop Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Fundamentals',
          required: true,
          size: 'full',
          description: 'Enter the title of the workshop'
        },

        {
          name: 'file_url',
          label: 'Workshop Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category',],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'physical-facilities': {
      tableName: 'eee_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'technical-faculty': {
      tableName: 'eee_technical_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when technical faculty member joined'
        }

      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'technical-association': {
      tableName: 'eee_technical_association',
      displayField: 'batch',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/cseai/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    'technical-handbooks': {
      tableName: 'eee_technical_handbooks',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the category',
          options: [
            { value: 'Technical Magazines', label: 'Technical Magazines' },
            { value: 'Academic HandBooks', label: 'Academic HandBooks' },
            { value: 'Course Materials', label: 'Course Materials' }
          ]
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., ELECTRIFY Volume 1 Issue 2 August 2022',
          required: true,
          size: 'full',
          description: 'Enter the title of the document'
        },
        {
          name: 'file_url',
          label: 'File/Document or Link',
          type: 'text',
          placeholder: 'Upload file or paste URL (e.g., https://drive.google.com/...)',
          required: false,
          size: 'full',
          description: 'Upload a document file OR paste a link (Google Drive, website, etc.). For Course Materials, you can paste Google Drive links.'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['category', 'title', 'file_url']
    },
    'non-teaching-faculty': {
      tableName: 'eee_non_teaching_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['name', 'designation'],
      sortableFields: ['name', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['name', 'designation', 'date_of_joining']
    },
    'academic-toppers': {
      tableName: 'eee_academictoppers',
      displayField: 'particulars',
      fields: [
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the batch year'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year in YYYY-YY format'
        },
        {
          name: 'particulars',
          label: 'Particulars/Details',
          type: 'text',
          placeholder: 'e.g., Academic Toppers',
          required: true,
          size: 'full',
          description: 'Enter details about the achievement'
        },
        {
          name: 'no_of_students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students who benefited'
        },
        {
          name: 'scholarship_amount',
          label: 'Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 99500',
          required: false,
          size: 'half',
          description: 'Total scholarship amount in rupees'
        },
        {
          name: 'file_url',
          label: 'Certificate/Document Upload',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['batch', 'particulars', 'academic_year'],
      sortableFields: ['batch', 'academic_year', 'no_of_students_benefited', 'created_at'],
      editableFields: ['batch', 'academic_year', 'particulars', 'no_of_students_benefited', 'scholarship_amount', 'file_url']
    },
    'faculty-achievements': {
      tableName: 'eee_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'FDP Attended', label: 'FDPs Attended' },
            { value: 'FDP Conducted', label: 'FDPs Conducted' },
            { value: 'NPTEL', label: 'NPTEL' },
            
          ]
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'fdps': {
      tableName: 'eee_faculty_development',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },

          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'fdp': {
      tableName: 'eee_faculty_development',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },

          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'placements': {
      tableName: 'eee_placements',
      displayField: 'batch',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/cseai/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    'hackathons-gallery': {
      tableName: 'eee_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'academic toppers', label: 'Academic Toppers' },
            { value: 'technical association', label: 'Technical Association' },
            { value: 'extracurricular activities', label: 'Extracurricular Activities' },
            { value: 'laboratories', label: 'Laboratories' },
            { value: 'placements', label: 'Placements' },
            { value: 'pd', label: 'Product Development' },
            { value: 'gi', label: 'Green Initiatives' },
            { value: 'ss', label: 'Social Service Activities' },
            { value: 'ac', label: 'Anniversary Celebrations' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Title/Caption',
          type: 'text',
          placeholder: 'e.g., Company Visit or Event Name',
          required: false,
          size: 'half',
          description: 'Optional title or caption for the image'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year', 'title'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'title', 'gallery']
    },

    'bos-members': {
      tableName: 'eee_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'eee_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },

    'eresources': {
      tableName: 'eee_eresources',
      displayField: 'subject_name',
      fields: [
        {
          name: 'regulation',
          label: 'Regulation',
          type: 'text',
          placeholder: 'e.g., R18, R20',
          required: true,
          size: 'half'
        },
        {
          name: 'semester',
          label: 'Semester',
          type: 'text',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'subject_name',
          label: 'Subject Name',
          type: 'text',
          placeholder: 'e.g., Data Structures',
          required: true,
          size: 'full'
        },
        {
          name: 'file_type',
          label: 'File Type',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'PPT', label: 'PowerPoint (PPT)' },
            { value: 'PDF', label: 'PDF' },
            { value: 'DOCX', label: 'Document (DOCX)' },
            { value: 'XLS', label: 'Spreadsheet (XLS)' },
            { value: 'Video', label: 'Video' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half'
        },
        {
          name: 'file_url',
          label: 'Resource File',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.ppt,.pptx,.docx,.xls,.xlsx,.mp4,.mov'
        }
      ],
      searchableFields: ['subject_name', 'regulation', 'semester'],
      sortableFields: ['subject_name', 'regulation', 'semester', 'academic_year'],
      editableFields: ['regulation', 'semester', 'subject_name', 'file_type', 'academic_year', 'file_url']
    },
    'hackathons': {
      tableName: 'eee_hackathons',
      displayField: 'title',
      fields: [

        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half'
        },



        {
          name: 'brochure_url',
          label: 'Brochure',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.jpg,.jpeg,.png'
        },
        {
          name: 'winners_url',
          label: 'Winners Details',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'created_at'],
      editableFields: ['title', 'academic_year', 'brochure_url', 'winners_url']
    },
    'newsletters': {
      tableName: 'eee_newsletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },

        {
          name: 'file_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year'],
      editableFields: ['title', 'volume', 'issue', 'year', 'file_url']
    },
    'merit-scholarships': {
      tableName: 'eee_merit_scholarships',
      displayField: 'particulars',
      fields: [
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half'
        },
        {
          name: 'particulars',
          label: 'Details',
          type: 'text',
          placeholder: 'e.g., Merit Scholarship Details',
          required: false,
          size: 'full'
        },
        {
          name: 'students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 50',
          required: false,
          size: 'half'
        },
        {
          name: 'scholarship_amount',
          label: 'Total Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 500000',
          required: false,
          size: 'half'
        }
      ],
      searchableFields: ['particulars', 'academic_year'],
      sortableFields: ['academic_year', 'scholarship_amount', 'students_benefited'],
      editableFields: ['academic_year', 'particulars', 'students_benefited', 'scholarship_amount']
    },
    'eapcet-toppers': {
      tableName: 'eee_eapcet_toppers',
      displayField: 'name_of_student',
      fields: [
        {
          name: 'year',
          label: 'Year',
          type: 'number',
          placeholder: 'e.g., 2025',
          required: true,
          size: 'half',
          description: 'Enter the year of EAPCET exam'
        },
        {
          name: 'particulars',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'EAPCET Toppers', label: 'EAPCET Toppers' }
          ],
          description: 'Select the category (EAPCET Toppers)'
        },
        {
          name: 'name_of_student',
          label: 'Name of Student',
          type: 'text',
          placeholder: 'e.g., Y. Lohitha',
          required: true,
          size: 'full',
          description: 'Enter the full name of the EAPCET topper',
          validation: {
            min: 3,
            max: 255,
            pattern: '^[a-zA-Z\\s.\\-]+$',
            message: 'Name should contain only alphabetic characters, spaces, dots, and hyphens'
          }
        },
        {
          name: 'student_rank',
          label: 'EAPCET Rank',
          type: 'number',
          placeholder: 'e.g., 24402',
          required: true,
          size: 'half',
          description: 'Enter the EAPCET rank obtained by the student'
        }
      ],
      searchableFields: ['name_of_student', 'year', 'student_rank'],
      sortableFields: ['year', 'student_rank', 'name_of_student', 'created_at'],
      editableFields: ['year', 'particulars', 'name_of_student', 'student_rank']
    },
    'mous': {
      tableName: 'eee_mous',
      displayField: 'mou_with',
      fields: [
        {
          name: 'mou_with',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full'
        },
        {
          name: 'from_date',
          label: 'MOU Start Date',
          type: 'text',
          placeholder: 'e.g., 2024-01-15 or 01-01-2024',
          required: true,
          size: 'half'
        },
        {
          name: 'to_date',
          label: 'MOU End Date',
          type: 'text',
          placeholder: 'e.g., 2026-01-14 or 31-12-2026',
          required: true,
          size: 'half'
        },
        {
          name: 'status',
          label: 'MOU Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'Till Date', label: 'Till Date' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Terminated', label: 'Terminated' },

          ]
        },
        {
          name: 'file_url',
          label: 'MOU Document',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload the MOU document or agreement (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['mou_with', 'status'],
      sortableFields: ['mou_with', 'from_date', 'to_date', 'status', 'created_at'],
      editableFields: ['mou_with', 'from_date', 'to_date', 'status', 'file_url']
    },
    'industry-programs': {
      tableName: 'eee_industry_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Industry Interaction Session, Corporate Training',
          required: true,
          size: 'full',
          description: 'Enter the title of the industry program or interaction'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },

        {
          name: 'file_url',
          label: 'Program Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program details, brochure, or related document (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year'],
      editableFields: ['title', 'academic_year', 'file_url']
    },
    'syllabus': {
      tableName: 'eee_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'M.Tech', value: 'mtech' },
            { label: 'B.Tech', value: 'btech' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },

    'student-achievements': {
      displayName: 'Student Achievements',
      autoGenerateTitle: true,
      isMultiTable: true,
      tables: {
        'roll-of-honour': {
          tableName: 'eee_roll_of_honour',
          displayField: 'student_name',
          sectionTitle: 'Roll Of Honour',
          fields: [
            {
              name: 'batch',
              label: 'Batch',
              type: 'text',
              placeholder: 'e.g., 2021-25',
              required: true,
              size: 'half',
              description: 'Student batch year'
            },
            {
              name: 'regd_no',
              label: 'Regd No.',
              type: 'text',
              placeholder: 'e.g., 21A81A0262',
              required: true,
              size: 'half',
              description: 'Student registration number'
            },
            {
              name: 'student_name',
              label: 'Name of the Student',
              type: 'text',
              placeholder: 'Enter student name',
              required: true,
              size: 'half',
              description: 'Full name of the student'
            },
            {
              name: 'percentage',
              label: 'Percentage',
              type: 'number',
              placeholder: 'e.g., 87.34',
              required: true,
              size: 'half',
              description: 'Academic percentage/CGPA',
              step: '0.01'
            }
          ],
          searchableFields: ['student_name', 'regd_no', 'batch'],
          sortableFields: ['batch', 'percentage', 'student_name', 'created_at'],
          editableFields: ['batch', 'regd_no', 'student_name', 'percentage']
        },
        'placement': {
          tableName: 'eee_placement',
          displayField: 'academic_year',
          sectionTitle: 'Placement',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'total_final_year_students',
              label: 'Total No.of Final Year Students',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_placed',
              label: 'No.of students placed in companies or Government Sector',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_higher_studies',
              label: 'No.of students admitted to higher studies with valid qualifying scores',
              type: 'number',
              required: true,
              size: 'half',
              description: 'GATE or equivalent State or National Level Tests, GRE, GMAT etc.'
            },
            {
              name: 'students_entrepreneur',
              label: 'No.of students turned entrepreneur in engineering/technology',
              type: 'number',
              required: true,
              size: 'half'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total_final_year_students', 'created_at'],
          editableFields: ['academic_year', 'total_final_year_students', 'students_placed', 'students_higher_studies', 'students_entrepreneur']
        },
        'higher-studies': {
          tableName: 'eee_higher_studies',
          displayField: 'academic_year',
          sectionTitle: 'Higher Studies',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'total_final_year_students',
              label: 'Total No.of Final Year Students',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_higher_studies',
              label: 'No.of students admitted to higher studies with valid qualifying scores',
              type: 'number',
              required: true,
              size: 'half',
              description: 'GATE or equivalent State or National Level Tests, GRE, GMAT etc.'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total_final_year_students', 'created_at'],
          editableFields: ['academic_year', 'total_final_year_students', 'students_higher_studies']
        },
        'competitive-examinations': {
          tableName: 'eee_competitive_examinations',
          displayField: 'year',
          sectionTitle: 'Competitive Examinations',
          fields: [
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2018-19, 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'net',
              label: 'NET',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'slet',
              label: 'SLET',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'gmat',
              label: 'GMAT',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'cat',
              label: 'CAT',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'gre',
              label: 'GRE',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'jam',
              label: 'JAM',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'ielts',
              label: 'IELTS',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'toefl',
              label: 'TOEFL',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'civil_services',
              label: 'Civil Services',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'state_govt_exams',
              label: 'State Government examinations (APPGECET)',
              type: 'number',
              required: true,
              size: 'half',
              default: 0
            },
            {
              name: 'other_exams',
              label: 'Other examinations conducted by State/Central Govt (Specify)',
              type: 'number',
              required: true,
              size: 'half',
              default: 0
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: true,
              size: 'half',
              description: 'Total of all exams'
            }
          ],
          searchableFields: ['year'],
          sortableFields: ['year', 'total', 'created_at'],
          editableFields: ['year', 'net', 'slet', 'gmat', 'cat', 'gre', 'jam', 'ielts', 'toefl', 'civil_services', 'state_govt_exams', 'other_exams', 'total']
        },
        
        'course-certifications': {
          tableName: 'eee_course_certifications',
          displayField: 'academic_year',
          sectionTitle: 'Course Certifications',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'nptel',
              label: 'NPTEL',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'coursera',
              label: 'Coursera',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'others',
              label: 'Others',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: true,
              size: 'half',
              description: 'Total certifications'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total', 'created_at'],
          editableFields: ['academic_year', 'nptel', 'coursera', 'others', 'total']
        },
        'internship': {
          tableName: 'eee_internship',
          displayField: 'academic_year',
          sectionTitle: 'Internship',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'internshala',
              label: 'Internshala',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'apssdc',
              label: 'APSSDC',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'others',
              label: 'Others',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: true,
              size: 'half',
              description: 'Total internships'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total', 'created_at'],
          editableFields: ['academic_year', 'internshala', 'apssdc', 'others', 'total']
        },
        'workshops-soc': {
          tableName: 'eee_workshops_soc',
          displayField: 'workshop_name',
          sectionTitle: 'Workshops/SOC',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2023-24',
              required: true,
              size: 'half',
              description: 'Used for grouping workshops'
            },
            {
              name: 'workshop_name',
              label: 'Workshops/SOC attended/conducted',
              type: 'text',
              placeholder: 'e.g., Modelling of Power Electronic Converters',
              required: true,
              size: 'full'
            },
            {
              name: 'association_college',
              label: 'In association/college attended',
              type: 'text',
              placeholder: 'e.g., NIT Andhra Pradesh',
              required: true,
              size: 'full'
            },
            {
              name: 'start_date',
              label: 'Start Date',
              type: 'date',
              required: true,
              size: 'half'
            },
            {
              name: 'end_date',
              label: 'End Date',
              type: 'date',
              required: true,
              size: 'half'
            },
            {
              name: 'no_of_students',
              label: 'No. of Students',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'duration',
              label: 'Weeks/Days',
              type: 'text',
              placeholder: 'e.g., 3 Days, 2 Weeks',
              required: true,
              size: 'third'
            },
            {
              name: 'year_sem',
              label: 'Year/Sem',
              type: 'text',
              placeholder: 'e.g., VI, IV, III',
              required: true,
              size: 'third'
            }
          ],
          searchableFields: ['workshop_name', 'association_college', 'academic_year', 'year_sem'],
          sortableFields: ['academic_year', 'start_date', 'workshop_name', 'created_at'],
          editableFields: ['academic_year', 'workshop_name', 'association_college', 'start_date', 'end_date', 'no_of_students', 'duration', 'year_sem']
        },
        'crt': {
          tableName: 'eee_crt',
          displayField: 'training_activity',
          sectionTitle: 'CRT',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'half'
            },
            {
              name: 'training_activity',
              label: 'Name of the Training Activity',
              type: 'text',
              placeholder: 'e.g., CRT Training program',
              required: true,
              size: 'full'
            },
            {
              name: 'no_of_students',
              label: 'No of students attended',
              type: 'number',
              placeholder: 'e.g., 70',
              required: true,
              size: 'third'
            },
            {
              name: 'duration',
              label: 'Duration',
              type: 'text',
              placeholder: 'e.g., 12-09-2018 to 17-11-2018',
              required: true,
              size: 'third'
            },
            {
              name: 'resource_person',
              label: 'Resource Person',
              type: 'text',
              placeholder: 'e.g., New leaf technology',
              required: true,
              size: 'third'
            },
            {
              name: 'target_audience',
              label: 'Target Audience',
              type: 'text',
              placeholder: 'e.g., Third year EEE students',
              required: true,
              size: 'full'
            }
          ],
          searchableFields: ['training_activity', 'resource_person', 'target_audience', 'academic_year'],
          sortableFields: ['academic_year', 'training_activity', 'no_of_students', 'created_at'],
          editableFields: ['academic_year', 'training_activity', 'no_of_students', 'duration', 'resource_person', 'target_audience']
        },
        'projects': {
          tableName: 'eee_projects',
          displayField: 'academic_year',
          sectionTitle: 'Projects',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'half'
            },
            {
              name: 'file_url',
              label: 'PDF File',
              type: 'file',
              required: true,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'file_url']
        },
        'csp': {
          tableName: 'eee_csp',
          displayField: 'academic_year',
          sectionTitle: 'CSP',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year/Batch',
              type: 'text',
              placeholder: 'e.g., 2021-25',
              required: true,
              size: 'half'
            },
            {
              name: 'file_url',
              label: 'PDF File',
              type: 'file',
              required: true,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'file_url']
        },
        'student-achievements-pdf': {
          tableName: 'eee_student_achievements_pdf',
          displayField: 'pdf_title',
          sectionTitle: 'Student List PDF',
          fields: [
            {
              name: 'pdf_title',
              label: 'PDF Title',
              type: 'text',
              placeholder: 'e.g., List of Students Participated/got prizes in Technical',
              required: true,
              size: 'full'
            },
            {
              name: 'file_url',
              label: 'PDF File',
              type: 'file',
              required: true,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['pdf_title'],
          sortableFields: ['pdf_title', 'created_at'],
          editableFields: ['pdf_title', 'file_url']
        },
        'student-achievements-placement': {
          tableName: 'eee_student_achievements_placement',
          displayField: 'academic_year',
          sectionTitle: 'Placement, Higher Studies and Entrepreneurship',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'half'
            },
            {
              name: 'total_final_year_students',
              label: 'Total No.of Final Year Students',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_placed',
              label: 'No.of students placed in companies or Government Sector',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_higher_studies',
              label: 'No.of students admitted to higher studies with valid qualifying scores',
              type: 'number',
              required: true,
              size: 'half',
              description: 'GATE or equivalent State or National Level Tests, GRE, GMAT etc.'
            },
            {
              name: 'students_entrepreneur',
              label: 'No.of students turned entrepreneur in engineering/technology',
              type: 'number',
              required: true,
              size: 'half'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total_final_year_students', 'created_at'],
          editableFields: ['academic_year', 'total_final_year_students', 'students_placed', 'students_higher_studies', 'students_entrepreneur']
        },
        'student-achievements-internships': {
          tableName: 'eee_student_achievements_internships',
          displayField: 'academic_year',
          sectionTitle: 'Internships/Certificates/Workshop',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2024-2025',
              required: true,
              size: 'full'
            },
            {
              name: 'certificates_nptel',
              label: 'Certificates - NPTEL',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'certificates_coursera',
              label: 'Certificates - Coursera',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'certificates_others',
              label: 'Certificates - Others',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'internships_internshala',
              label: 'Internships - Internshala',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'internships_apssdc',
              label: 'Internships - APSSDC',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'internships_others',
              label: 'Internships - Others',
              type: 'number',
              required: true,
              size: 'third',
              default: 0
            },
            {
              name: 'workshops',
              label: 'Workshops',
              type: 'number',
              required: true,
              size: 'half',
              default: 0
            },
            {
              name: 'cocurricular_activities',
              label: 'Co-Curricular Activities',
              type: 'number',
              required: true,
              size: 'half',
              default: 0
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'certificates_nptel', 'certificates_coursera', 'certificates_others', 'internships_internshala', 'internships_apssdc', 'internships_others', 'workshops', 'cocurricular_activities']
        }
      }
    },
    'extra-curricular': {
      tableName: 'eee_extracurricular_activities',
      displayField: 'activity_name',
      fields: [
        {
          name: 'activity_name',
          label: 'Activity Name',
          type: 'text',
          placeholder: 'e.g., Maitri Association, Tech Club',
          required: true,
          size: 'full',
          description: 'Name of the extra-curricular activity/association'
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Type of activity',
          options: [
            { value: 'social_service', label: 'Social Service' },
            { value: 'cultural', label: 'Cultural' },
            { value: 'sports', label: 'Sports' },
            { value: 'technical', label: 'Technical' },
            { value: 'professional', label: 'Professional Society' },
            { value: 'community', label: 'Community Service' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Academic year of the activity'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter detailed description of the activity',
          required: true,
          size: 'full',
          rows: 6,
          description: 'Detailed information about the activity'
        },
        {
          name: 'faculty_coordinator_name',
          label: 'Faculty Coordinator Name',
          type: 'text',
          placeholder: 'e.g., Mr. M Yesu Sekharam',
          required: false,
          size: 'full',
          description: 'Name of the primary faculty coordinator'
        },
        {
          name: 'faculty_coordinator_designation',
          label: 'Coordinator Designation',
          type: 'text',
          placeholder: 'e.g., Assistant Professor',
          required: false,
          size: 'half',
          description: 'Designation of the coordinator'
        },
        {
          name: 'image_url',
          label: 'Activity Cover Image',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Cover image for the activity'
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'archived', label: 'Archived' }
          ],
          description: 'Activity status'
        }
      ],
      searchableFields: ['activity_name', 'category', 'faculty_coordinator_name'],
      sortableFields: ['activity_name', 'category', 'academic_year', 'created_at'],
      editableFields: [
        'activity_name',
        'category',
        'academic_year',
        'description',
        'faculty_coordinator_name',
        'faculty_coordinator_designation',
        'image_url',
        'status'
      ]
    },
    'activity-coordinators': {
      tableName: 'eee_activity_coordinators',
      displayField: 'name',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'name',
          label: 'Coordinator Name',
          type: 'text',
          placeholder: 'e.g., Mr. M Yesu Sekharam',
          required: true,
          size: 'full',
          description: 'Name of the coordinator'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Assistant Professor',
          required: false,
          size: 'half',
          description: 'Job designation'
        },
        {
          name: 'role',
          label: 'Role Type',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'faculty_coordinator', label: 'Faculty Coordinator' },
            { value: 'student_coordinator', label: 'Student Coordinator' },
            { value: 'co_coordinator', label: 'Co-Coordinator' }
          ],
          description: 'Coordinator role type'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., name@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in frontend'
        }
      ],
      searchableFields: ['name', 'designation', 'role'],
      sortableFields: ['name', 'role', 'order_seq', 'created_at'],
      editableFields: ['name', 'designation', 'role', 'email', 'phone', 'order_seq']
    },
    'activity-events': {
      tableName: 'eee_activity_events',
      displayField: 'event_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: true,
          size: 'half',
          description: 'Year the event was conducted'
        },
        {
          name: 'event_title',
          label: 'Event Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event 2023',
          required: true,
          size: 'full',
          description: 'Title or name of the event'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Date the event was conducted'
        },
        {
          name: 'description',
          label: 'Event Description',
          type: 'textarea',
          placeholder: 'Enter event details and outcomes',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of the event'
        },
        {
          name: 'file_url',
          label: 'Event Document/Report',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event report, certificate, or document'
        },
        {
          name: 'image_url',
          label: 'Event Photo',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload event photo/image'
        }
      ],
      searchableFields: ['event_title', 'academic_year'],
      sortableFields: ['event_title', 'event_date', 'academic_year', 'created_at'],
      editableFields: ['academic_year', 'event_title', 'event_date', 'description', 'file_url', 'image_url']
    },
    'activity-gallery': {
      tableName: 'eee_activity_gallery',
      displayField: 'image_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Year of the activity'
        },
        {
          name: 'image_url',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload image for gallery (JPG, PNG, GIF, or WebP)'
        },
        {
          name: 'image_title',
          label: 'Image Caption/Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event Group Photo',
          required: false,
          size: 'full',
          description: 'Caption or title for the image'
        },
        {
          name: 'description',
          label: 'Image Description',
          type: 'textarea',
          placeholder: 'Enter description of the image',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Detailed description of what the image shows'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in gallery'
        }
      ],
      searchableFields: ['image_title', 'academic_year'],
      sortableFields: ['image_title', 'academic_year', 'order_seq', 'created_at'],
      editableFields: ['academic_year', 'image_url', 'image_title', 'description', 'order_seq']
    },
    'department-overview': {
      tableName: 'eee_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',

          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    },
    'gate': {
      tableName: 'eee_gate',
      displayField: 'name',
      fields: [
        {
          name: 'rollno',
          label: 'Roll Number',
          type: 'text',

          required: true,
          size: 'half',
          description: 'Student roll number'
        },
        {
          name: 'name',
          label: 'Student Name',
          type: 'text',

          required: true,
          size: 'half',
          description: 'Full name of the student'
        },
        {
          name: 'score',
          label: 'GATE Score',
          type: 'number',
          placeholder: 'Enter score',
          required: true,
          size: 'half',
          description: 'GATE exam score'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Academic year'
        }
      ],
      searchableFields: ['name', 'roll_no'],
      sortableFields: ['name', 'score', 'year', 'created_at'],
      editableFields: ['name', 'score', 'year']
    },
    'roll-of-honour': {
      tableName: 'eee_roll_of_honour',
      displayField: 'name',
      fields: [
        {
          name: 'rollno',
          label: 'Roll Number',
          type: 'text',
          placeholder: 'e.g., CST2021001',
          required: true,
          size: 'half',
          description: 'Student roll number'
        },
        {
          name: 'name',
          label: 'Student Name',
          type: 'text',
          placeholder: 'Enter full name',
          required: true,
          size: 'half',
          description: 'Full name of the student'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Batch/Year'
        },
        {
          name: 'cgpa',
          label: 'CGPA',
          type: 'text',
          placeholder: 'e.g., 9.5',
          required: true,
          size: 'half',
          description: 'Cumulative Grade Point Average'
        }
      ],
      searchableFields: ['name', 'rollno', 'batch'],
      sortableFields: ['name', 'cgpa', 'batch', 'created_at'],
      editableFields: ['name', 'batch', 'cgpa']
    },
    'sahaya-events': {
      tableName: 'eee_sahaya_events',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., Sahaya Events',
          required: true,
          size: 'full',
          description: 'Enter the title for the Sahaya event section',
          validation: {
            max: 1000,
            message: 'Title must not exceed 1000 characters'
          }
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Enter the year of the event'
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the category for this event',
          options: [
            { value: 'ecactivities', label: 'EC Activities' },
            { value: 'sahaya', label: 'Sahaya' }
          ]
        },
        {
          name: 'file_url',
          label: 'Event Document/PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event document, certificate, or related file (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'year', 'category'],
      sortableFields: ['title', 'year', 'category', 'created_at'],
      editableFields: ['title', 'year', 'category', 'file_url']
    },

    'research-center': {
      tableName: 'eee_research_verticles', // Default table
      displayField: 'title',
      tableOptions: [
        { value: 'eee_research_verticles', label: 'Research Verticles' },
        { value: 'eee_research_supervisor', label: 'Research Supervisor' },
        { value: 'eee_journal_publications', label: 'Journal Publications' },
        { value: 'eee_conference_publications', label: 'Conference Publications' },
        { value: 'eee_patents', label: 'Patents' },
        { value: 'eee_book_publications', label: 'Book Publications' },
        { value: 'eee_career_advancements', label: 'Career Advancements' },
        { value: 'eee_interaction_outside_world', label: 'Interaction with Outside World' }
      ],
      tableConfigs: {
        'eee_research_verticles': {
          fields: [
            {
              name: 'category',
              label: 'Research Category',
              type: 'select',
              required: true,
              size: 'half',
              options: [
                { value: 'Power Systems', label: 'Power Systems' },
                { value: 'Power Electronics', label: 'Power Electronics' },
                { value: 'Electrical Vehicles', label: 'Electrical Vehicles' }
              ],
              description: 'Select the research vertical category'
            },
            {
              name: 'faculty_name',
              label: 'Faculty Name',
              type: 'text',
              required: true,
              size: 'full',
              placeholder: 'e.g., Dr.Ch.Rambabu',
              description: 'Enter the full name of the faculty member'
            },
            {
              name: 'order_number',
              label: 'Display Order',
              type: 'number',
              required: false,
              size: 'half',
              placeholder: 'e.g., 1, 2, 3...',
              description: 'Order in which faculty appears in the list (within category)'
            }
          ],
          searchableFields: ['category', 'faculty_name'],
          sortableFields: ['category', 'faculty_name', 'order_number', 'created_at'],
          editableFields: ['category', 'faculty_name', 'order_number']
        },
        'eee_research_supervisor': {
          fields: [
            {
              name: 'name',
              label: 'Name of Supervisor',
              type: 'text',
              required: true,
              size: 'full',
              placeholder: 'e.g., Dr. Ch. Rambabu',
              description: 'Enter the supervisor\'s full name'
            },
            {
              name: 'scholar_name',
              label: 'Name of Scholar',
              type: 'text',
              required: true,
              size: 'full',
              placeholder: 'e.g., K. Rajendra',
              description: 'Enter the scholar\'s name'
            },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              required: true,
              size: 'half',
              options: [
                { value: 'On Going', label: 'On Going' },
                { value: 'Completed', label: 'Completed' }
              ],
              description: 'Select the current status of research'
            },
            {
              name: 'file_url',
              label: 'Proof/Document',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
              description: 'Upload proof document or certificate'
            }
          ],
          searchableFields: ['name', 'scholar_name', 'status'],
          sortableFields: ['name', 'scholar_name', 'status', 'created_at'],
          editableFields: ['name', 'scholar_name', 'status', 'file_url']
        },
        'eee_journal_publications': {
          fields: [
            {
              name: 'year',
              label: 'Academic Year',
              type: 'text',
              required: true,
              size: 'half',
              placeholder: 'e.g., 2024-2025',
              description: 'Enter the academic year'
            },
            {
              name: 'file_url',
              label: 'Journal Publications Document',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf,.doc,.docx',
              description: 'Upload journal publications document'
            }
          ],
          searchableFields: ['year'],
          sortableFields: ['year', 'created_at'],
          editableFields: ['year', 'file_url']
        },
        'eee_conference_publications': {
          fields: [
            { name: 'faculty_name', label: 'Name of the Faculty', type: 'text', required: true, size: 'full', placeholder: 'e.g., Dr. Dhana Prasad' },
            { name: 'paper_title', label: 'Title of the Paper', type: 'textarea', required: true, size: 'full', placeholder: 'Enter the complete title of the paper' },
            { name: 'proceedings_title', label: 'Title of the proceedings of the conference', type: 'textarea', required: true, size: 'full', placeholder: 'e.g., International Conference on Smart Grid and Electrical Vehicles' },
            { name: 'isbn_issn', label: 'ISBN/ISSN number of the proceeding', type: 'text', required: false, size: 'half', placeholder: 'e.g., 978-1-5386-1234-5' },
            { name: 'year', label: 'Academic Year', type: 'text', required: true, size: 'half', placeholder: 'e.g., 2024-25' },
            { name: 'file_url', label: 'Upload File', type: 'file', required: false, size: 'full', accept: '.pdf' }
          ],
          searchableFields: ['faculty_name', 'paper_title', 'proceedings_title', 'year'],
          sortableFields: ['faculty_name', 'year', 'created_at'],
          editableFields: ['faculty_name', 'paper_title', 'proceedings_title', 'isbn_issn', 'year', 'file_url']
        },
        'eee_patents': {
          fields: [
            { name: 'patent_title', label: 'Patent Title', type: 'textarea', required: true, size: 'full', placeholder: 'e.g., Multilevel Inverter(MLI) circuit for DC-AC Power Conversion' },
            { name: 'inventors', label: 'Name of the Inventor(s)', type: 'text', required: true, size: 'full', placeholder: 'e.g., Dr. Anilkumar Chappa or Multiple inventors separated by &' },
            { name: 'patent_number', label: 'Patent No.', type: 'text', required: true, size: 'half', placeholder: 'e.g., 202241061706' },
            { name: 'publication_date', label: 'Date of the Publication', type: 'date', required: true, size: 'half' },
            {
              name: 'status', label: 'Status', type: 'select', required: true, size: 'half', options: [
                { value: 'Published', label: 'Published' },
                { value: 'Granted', label: 'Granted' }
              ]
            }
          ],
          searchableFields: ['patent_title', 'inventors', 'patent_number', 'status'],
          sortableFields: ['publication_date', 'patent_number', 'status', 'created_at'],
          editableFields: ['patent_title', 'inventors', 'patent_number', 'publication_date', 'status']
        },
        'eee_book_publications': {
          fields: [
            { name: 'faculty_name', label: 'Name of the Faculty', type: 'text', required: true, size: 'full', placeholder: 'e.g., Mr. U. Chandra Rao' },
            { name: 'book_title', label: 'Title of the book published', type: 'textarea', required: true, size: 'full', placeholder: 'e.g., ANFIS and SCLEIC Based Battery Charging Controllers for PHEV' },
            { name: 'year', label: 'Year of publication', type: 'text', required: true, size: 'half', placeholder: 'e.g., 2021' },
            { name: 'isbn', label: 'ISBN/ISSN number of the proceeding', type: 'text', required: false, size: 'half', placeholder: 'e.g., 978-93-90846-55-9' },
            { name: 'publisher', label: 'Name of the publisher', type: 'text', required: true, size: 'full', placeholder: 'e.g., AkiNik, LAMBERT ACADEMIC PUBLISHING' }
          ],
          searchableFields: ['faculty_name', 'book_title', 'publisher', 'year'],
          sortableFields: ['faculty_name', 'year', 'created_at'],
          editableFields: ['faculty_name', 'book_title', 'year', 'isbn', 'publisher']
        },
        'eee_career_advancements': {
          fields: [
            { name: 'faculty_name', label: 'Name of the Faculty', type: 'text', required: true, size: 'full', placeholder: 'e.g., Mr. U. Chandra Rao' },
            { name: 'enrolled_institute', label: 'Enrolled Institute', type: 'text', required: true, size: 'full', placeholder: 'e.g., J.N.T.U. Kakinada, National Institute of Technology, Tadepalligudem' },
            { name: 'joining_date', label: 'Date of the joining', type: 'date', required: true, size: 'half' },
            { name: 'pursuing_degree', label: 'Pursuing Degree', type: 'text', required: true, size: 'half', placeholder: 'e.g., Ph.D' }
          ],
          searchableFields: ['faculty_name', 'enrolled_institute', 'pursuing_degree'],
          sortableFields: ['faculty_name', 'joining_date', 'created_at'],
          editableFields: ['faculty_name', 'enrolled_institute', 'joining_date', 'pursuing_degree']
        },
        'eee_interaction_outside_world': {
          fields: [
            { name: 'faculty_name', label: 'Name of the Faculty', type: 'text', required: true, size: 'full', placeholder: 'e.g., Dr. Anilkumar Chappa' },
            { name: 'journal_details', label: 'Details of the Journals', type: 'textarea', required: true, size: 'full', placeholder: 'e.g., IEEE Transcactions on Industrial Electronics' }
          ],
          searchableFields: ['faculty_name', 'journal_details'],
          sortableFields: ['faculty_name', 'created_at'],
          editableFields: ['faculty_name', 'journal_details']
        }
      },
      fields: [], // Will be dynamically set based on selected table
      searchableFields: ['title'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['title']
    }
  },

  // ================================================================================================
  // ECE DEPARTMENT (Electronics & Communication Engineering)
  // Table Prefix: ece_*
  // 
  // Modules (alphabetical order):
  // • academic-toppers, bos-members, bos-minutes, department-library, department-overview
  // • eresources, extra-curricular, faculty, faculty-achievements, faculty-development
  // • hackathons, hackathons-gallery, handbooks, mous, newsletters
  // • non-teaching-faculty, physical-facilities, placements, student-achievements, syllabus
  // • technical-association, technical-faculty, workshops
  // ================================================================================================
  'ece': {
    'workshops': {
      tableName: 'ece_worshops_gl',
      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the workshop category',
          options: [
            { value: 'workshop_soc', label: 'Workshops/SOC' },
            { value: 'guest_lecture', label: 'Guest Lectures/Seminars' },
            { value: 'academic_topper', label: 'Academic Toppers' }
          ]
        },
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Workshop Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Fundamentals',
          required: true,
          size: 'full',
          description: 'Enter the title of the workshop'
        },
        {
          name: 'url',
          label: 'Workshop Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'type', 'year'],
      sortableFields: ['title', 'type', 'year', 'created_at'],
      editableFields: ['title', 'type', 'year', 'url']
    },
    'faculty': {
      tableName: 'ece_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Electronics & Communication',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profileUrl',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile PDF'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'qualification', 'designation', 'date_of_joining', 'profileUrl']
    },
    'technical-faculty': {
      tableName: 'ece_technical_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when technical faculty member joined'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'technical-association': {
      tableName: 'ece_technicalAssociation_trainingActivities',
      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the activity type',
          options: [
            { value: 'training_activity', label: 'Training Activity' },
            { value: 'technical_association_event', label: 'Technical Association Event' },
            { value: 'gallery_2k19', label: 'Gallery 2K19' },
            { value: 'gallery_2k18', label: 'Gallery 2K18' }
          ]
        },
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: false,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Workshop',
          required: true,
          size: 'full',
          description: 'Enter the title or description'
        },
        {
          name: 'url',
          label: 'Document/Image URL',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'type', 'year'],
      sortableFields: ['title', 'type', 'year', 'created_at'],
      editableFields: ['type', 'year', 'title', 'url']
    },
    'non-teaching-faculty': {
      tableName: 'ece_non_teaching_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'academic-toppers': {
      tableName: 'ece_scholarships_toppers',
      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the record type',
          options: [
            { value: 'merit_scholarship', label: 'Merit Scholarship' },
            { value: 'cash_award', label: 'Cash Award' }
          ]
        },
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter title',
          required: false,
          size: 'full',
          description: 'Title (for merit scholarships)'
        },
        {
          name: 'based_on',
          label: 'Based On',
          type: 'text',
          placeholder: 'e.g., EAMCET Rank',
          required: false,
          size: 'half',
          description: 'Based on criteria (for cash awards)'
        },
        {
          name: 'students',
          label: 'Number of Students',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students benefited'
        },
        {
          name: 'amount',
          label: 'Amount',
          type: 'text',
          placeholder: 'e.g., ₹99,500',
          required: false,
          size: 'half',
          description: 'Scholarship/award amount'
        },
        {
          name: 'url',
          label: 'Document URL',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'year', 'type'],
      sortableFields: ['year', 'type', 'students', 'created_at'],
      editableFields: ['type', 'year', 'title', 'based_on', 'students', 'amount', 'url']
    },
    'merit-scholarships': {
      tableName: 'ece_scholarships_toppers',
      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          placeholder: 'Select type',
          required: true,
          size: 'half',
          description: 'Select the record type',
          options: [
            { value: 'merit_scholarship', label: 'Merit Scholarship' },
            { value: 'cash_award', label: 'Cash Award' }
          ]
        },
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter title',
          required: false,
          size: 'full',
          description: 'Title (for merit scholarships)'
        },
        {
          name: 'based_on',
          label: 'Based On',
          type: 'text',
          placeholder: 'e.g., EAMCET Rank',
          required: false,
          size: 'half',
          description: 'Based on criteria (for cash awards)'
        },
        {
          name: 'students',
          label: 'Number of Students',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students benefited'
        },
        {
          name: 'amount',
          label: 'Amount',
          type: 'text',
          placeholder: 'e.g., ₹99,500',
          required: false,
          size: 'half',
          description: 'Scholarship/award amount'
        },
        {
          name: 'url',
          label: 'Document URL',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'year', 'type'],
      sortableFields: ['year', 'type', 'students', 'created_at'],
      editableFields: ['type', 'year', 'title', 'based_on', 'students', 'amount', 'url']
    },
    
    'faculty-achievements': {
      displayName: 'Faculty Achievements',
      autoGenerateTitle: true,
      isMultiTable: true,
      tables: {
        'roll-of-honour': {
          tableName: 'ece_faculty_roll_of_honour',
          displayField: 'faculty_name',
          sectionTitle: 'Faculty Recognition & Honour',
          fields: [
            {
              name: 'faculty_name',
              label: 'Faculty Name',
              type: 'text',
              placeholder: 'e.g., Dr. John Smith',
              required: true,
              size: 'half',
              description: 'Faculty member name'
            },
            {
              name: 'designation',
              label: 'Designation',
              type: 'text',
              placeholder: 'e.g., Professor, Associate Professor',
              required: false,
              size: 'half',
              description: 'Faculty designation'
            },
            {
              name: 'department',
              label: 'Department',
              type: 'text',
              placeholder: 'e.g., ECE, CSE',
              required: false,
              size: 'half',
              description: 'Department name'
            },
            {
              name: 'achievement_details',
              label: 'Achievement Details',
              type: 'textarea',
              placeholder: 'Enter achievement details',
              required: false,
              size: 'full',
              rows: 3,
              description: 'Details of the recognition or honour'
            },
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2024',
              required: false,
              size: 'half',
              description: 'Year of the achievement'
            }
          ],
          searchableFields: ['faculty_name', 'designation', 'year'],
          sortableFields: ['faculty_name', 'designation', 'year', 'created_at'],
          editableFields: ['faculty_name', 'designation', 'department', 'achievement_details', 'year']
        },
        'workshops-conducted': {
          tableName: 'ece_faculty_workshops_internships',
          displayField: 'title',
          sectionTitle: 'Workshops/Internships Conducted',
          fields: [
            {
              name: 'program',
              label: 'Program Type',
              type: 'select',
              required: true,
              size: 'half',
              options: [
                { label: 'Workshops', value: 'workshops' },
                { label: 'Seminars', value: 'seminars' },
                { label: 'Internship Programs', value: 'internships' },
                { label: 'Training', value: 'training' }
              ],
              description: 'Select the program type'
            },
            {
              name: 'title',
              label: 'Program Title',
              type: 'text',
              placeholder: 'e.g., Advanced Digital Signal Processing Workshop',
              required: true,
              size: 'full',
              description: 'Enter the title of the workshop/program',
              validation: {
                min: 5,
                max: 200,
                pattern: '^[a-zA-Z0-9\\s\\-.,()]+$',
                message: 'Title must be 5-200 characters with alphanumeric characters and basic punctuation'
              }
            },
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2025',
              required: false,
              size: 'half',
              description: 'Enter the year'
            },
            {
              name: 'url',
              label: 'Program Document/Certificate',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
              description: 'Upload the document or certificate (PDF, DOC, or Image files)'
            }
          ],
          searchableFields: ['title', 'program', 'year'],
          sortableFields: ['title', 'program', 'year', 'created_at'],
          editableFields: ['program', 'title', 'year', 'url']
        },
        'publications': {
          tableName: 'ece_faculty_publications',
          displayField: 'title',
          sectionTitle: 'Publications',
          fields: [
            {
              name: 'title',
              label: 'Publication Title',
              type: 'text',
              placeholder: 'e.g., Advanced VLSI Design Methodologies',
              required: true,
              size: 'full',
              description: 'Enter the publication title',
              validation: {
                min: 5,
                max: 500,
                pattern: '^[a-zA-Z0-9\\s\\-.,()]+$',
                message: 'Title must be 5-500 characters with alphanumeric characters and basic punctuation'
              }
            },
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2024',
              required: false,
              size: 'half',
              description: 'Publication year'
            },
            {
              name: 'url',
              label: 'Publication Document/Link',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
              description: 'Upload publication document or PDF (PDF, DOC, or Image files)'
            }
          ],
          searchableFields: ['title', 'year'],
          sortableFields: ['title', 'year', 'created_at'],
          editableFields: ['title', 'year', 'url']
        },
        'icet': {
          tableName: 'ece_faculty_icet',
          displayField: 'faculty_name',
          sectionTitle: 'Higher Education Qualifications - ICET',
          fields: [
            {
              name: 'faculty_name',
              label: 'Faculty Name',
              type: 'text',
              placeholder: 'e.g., Dr. John Smith',
              required: true,
              size: 'half',
              description: 'Faculty member name'
            },
            {
              name: 'exam',
              label: 'Exam',
              type: 'text',
              placeholder: 'e.g., ICET, PGCET',
              required: true,
              size: 'half',
              description: 'Name of the exam'
            },
            {
              name: 'education',
              label: 'Higher Education Program',
              type: 'text',
              placeholder: 'e.g., M.Tech, PhD',
              required: true,
              size: 'half',
              description: 'Higher Education Program',
              step: '0.01'
            },
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2024',
              required: false,
              size: 'half',
              description: 'Year of qualification'
            }
          ],
          searchableFields: ['faculty_name', 'education', 'exam'],
          sortableFields: ['faculty_name', 'education', 'exam', 'year', 'created_at'],
          editableFields: ['faculty_name', 'exam', 'education', 'year']
        },
        'gre': {
          tableName: 'ece_faculty_gre',
          displayField: 'faculty_name',
          sectionTitle: 'Higher Studies Qualifications - GRE/TOEFL',
          fields: [
            {
              name: 'faculty_name',
              label: 'Faculty Name',
              type: 'text',
              placeholder: 'e.g., Dr. John Smith',
              required: true,
              size: 'half',
              description: 'Faculty member name'
            },
            {
              name: 'course',
              label: 'Course',
              type: 'text',
              placeholder: 'e.g., MS, PhD',
              required: false,
              size: 'half',
              description: 'Course opted'
            },
            {
              name: 'toefl',
              label: 'TOEFL',
              type: 'number',
              placeholder: 'e.g., 95',
              required: false,
              size: 'half',
              description: 'TOEFL score',
              step: '1'
            },
            {
              name: 'gre',
              label: 'GRE',
              type: 'number',
              placeholder: 'e.g., 315',
              required: false,
              size: 'half',
              description: 'GRE score',
              step: '1'
            },
            {
              name: 'ielts',
              label: 'IELTS',
              type: 'number',
              placeholder: 'e.g., 7.5',
              required: false,
              size: 'half',
              description: 'IELTS score',
              step: '0.5'
            },
            {
              name: 'duolingo',
              label: 'Duolingo',
              type: 'number',
              placeholder: 'e.g., 110',
              required: false,
              size: 'half',
              description: 'Duolingo English Test score',
              step: '1'
            },
            {
              name: 'pte',
              label: 'PTE',
              type: 'number',
              placeholder: 'e.g., 65',
              required: false,
              size: 'half',
              description: 'PTE score',
              step: '1'
            },
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2024',
              required: false,
              size: 'half',
              description: 'Year of qualification'
            }
          ],
          searchableFields: ['faculty_name', 'course', 'year'],
          sortableFields: ['faculty_name', 'course', 'toefl', 'gre', 'ielts', 'duolingo', 'pte', 'year', 'created_at'],
          editableFields: ['faculty_name', 'course', 'toefl', 'gre', 'ielts', 'duolingo', 'pte', 'year']
        },
        'gate': {
          tableName: 'ece_faculty_gate',
          displayField: 'faculty_name',
          sectionTitle: 'GATE Qualifications',
          fields: [
            {
              name: 'faculty_name',
              label: 'Faculty Name',
              type: 'text',
              placeholder: 'e.g., Dr. John Smith',
              required: true,
              size: 'half',
              description: 'Faculty member name'
            },
            {
              name: 'score',
              label: 'GATE Score',
              type: 'number',
              placeholder: 'e.g., 87.34',
              required: true,
              size: 'half',
              description: 'GATE score/rank',
              step: '0.01'
            },
            {
              name: 'year',
              label: 'Year',
              type: 'number',
              placeholder: 'e.g., 2023',
              required: true,
              size: 'half',
              description: 'Year of GATE exam',
              step: '1'
            }
          ],
          searchableFields: ['faculty_name', 'year'],
          sortableFields: ['faculty_name', 'score', 'year', 'created_at'],
          editableFields: ['faculty_name', 'score', 'year']
        },
        'awards': {
          tableName: 'ece_faculty_awards_achievements',
          displayField: 'faculty_name',
          sectionTitle: 'Awards & Recognition',
          fields: [
            {
              name: 'faculty_name',
              label: 'Faculty Name',
              type: 'text',
              placeholder: 'e.g., Dr. John Smith',
              required: true,
              size: 'half',
              description: 'Faculty member name'
            },
            {
              name: 'name_of_the_award',
              label: 'Award Name',
              type: 'text',
              placeholder: 'e.g., Best Teacher Award, IEEE Recognition',
              required: true,
              size: 'full',
              description: 'Name of the award or recognition'
            },
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2024',
              required: false,
              size: 'half',
              description: 'Year of the award'
            }
          ],
          searchableFields: ['faculty_name', 'name_of_the_award', 'year'],
          sortableFields: ['faculty_name', 'name_of_the_award', 'year', 'created_at'],
          editableFields: ['faculty_name', 'name_of_the_award', 'year']
        },
        'projects': {
          tableName: 'ece_faculty_placement',
          displayField: 'academic_year',
          sectionTitle: 'Research & Development Projects',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'total_projects',
              label: 'Total Research Projects',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'completed_projects',
              label: 'Completed Projects',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'ongoing_projects',
              label: 'Ongoing Projects',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'student_collaborators',
              label: 'Student Collaborators',
              type: 'number',
              required: false,
              size: 'half'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total_projects', 'created_at'],
          editableFields: ['academic_year', 'total_projects', 'completed_projects', 'ongoing_projects', 'student_collaborators']
        },
        'supervision': {
          tableName: 'ece_faculty_higher_studies',
          displayField: 'academic_year',
          sectionTitle: 'Student Supervision & Mentoring',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'phd_students_supervised',
              label: 'PhD Students Supervised',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'mtech_students_supervised',
              label: 'M.Tech Students Supervised',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'research_scholars',
              label: 'Research Scholars/Associates',
              type: 'number',
              required: false,
              size: 'third'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'phd_students_supervised', 'created_at'],
          editableFields: ['academic_year', 'phd_students_supervised', 'mtech_students_supervised', 'research_scholars']
        },
        'competitive-exams': {
          tableName: 'ece_faculty_competitive_examinations',
          displayField: 'year',
          sectionTitle: 'Faculty Competitive Examinations',
          fields: [
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2023-24',
              required: true,
              size: 'full'
            },
            {
              name: 'net',
              label: 'NET',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'slet',
              label: 'SLET',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'gmat',
              label: 'GMAT',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'cat',
              label: 'CAT',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'gre',
              label: 'GRE',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'jam',
              label: 'JAM',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'ielts',
              label: 'IELTS',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'toefl',
              label: 'TOEFL',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'civil_services',
              label: 'Civil Services',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'state_govt_exams',
              label: 'State Govt Exams',
              type: 'number',
              required: false,
              size: 'half'
            },
            {
              name: 'other_exams',
              label: 'Other Govt Exams',
              type: 'number',
              required: false,
              size: 'half'
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: false,
              size: 'half',
              description: 'Total of all exams'
            }
          ],
          searchableFields: ['year'],
          sortableFields: ['year', 'total', 'created_at'],
          editableFields: ['year', 'net', 'slet', 'gmat', 'cat', 'gre', 'jam', 'ielts', 'toefl', 'civil_services', 'state_govt_exams', 'other_exams', 'total']
        },
        'certifications': {
          tableName: 'ece_faculty_course_certifications',
          displayField: 'academic_year',
          sectionTitle: 'Online Certifications',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'nptel',
              label: 'NPTEL',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'coursera',
              label: 'Coursera',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'others',
              label: 'Others',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: false,
              size: 'half',
              description: 'Total certifications'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total', 'created_at'],
          editableFields: ['academic_year', 'nptel', 'coursera', 'others', 'total']
        },
        'mentorship': {
          tableName: 'ece_faculty_internship',
          displayField: 'academic_year',
          sectionTitle: 'Mentorship & Internship Supervision',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'internshala',
              label: 'Internshala Mentored',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'apssdc',
              label: 'APSSDC Mentored',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'others',
              label: 'Others Mentored',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: false,
              size: 'half',
              description: 'Total mentorships'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total', 'created_at'],
          editableFields: ['academic_year', 'internshala', 'apssdc', 'others', 'total']
        },
        'workshops-conducted': {
          tableName: 'ece_faculty_workshops_soc',
          displayField: 'workshop_name',
          sectionTitle: 'Workshops/Seminars Conducted',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'half',
              description: 'Used for grouping workshops'
            },
            {
              name: 'workshop_name',
              label: 'Workshop/Seminar Title',
              type: 'text',
              placeholder: 'e.g., Digital Signal Processing Workshop',
              required: true,
              size: 'full'
            },
            {
              name: 'association_college',
              label: 'In association/college',
              type: 'text',
              placeholder: 'e.g., NIT Andhra Pradesh',
              required: true,
              size: 'full'
            },
            {
              name: 'start_date',
              label: 'Start Date',
              type: 'date',
              required: true,
              size: 'half'
            },
            {
              name: 'end_date',
              label: 'End Date',
              type: 'date',
              required: true,
              size: 'half'
            },
            {
              name: 'no_of_students',
              label: 'No. of Participants',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'duration',
              label: 'Duration',
              type: 'text',
              placeholder: 'e.g., 3 Days, 2 Weeks',
              required: false,
              size: 'third'
            },
            {
              name: 'year_sem',
              label: 'Targeted Year/Semester',
              type: 'text',
              placeholder: 'e.g., VI, IV, III',
              required: false,
              size: 'third'
            }
          ],
          searchableFields: ['workshop_name', 'association_college', 'academic_year'],
          sortableFields: ['academic_year', 'start_date', 'workshop_name', 'created_at'],
          editableFields: ['academic_year', 'workshop_name', 'association_college', 'start_date', 'end_date', 'no_of_students', 'duration', 'year_sem']
        },
        'research-training': {
          tableName: 'ece_faculty_crt',
          displayField: 'training_activity',
          sectionTitle: 'Research & Training Activities',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'half'
            },
            {
              name: 'training_activity',
              label: 'Training Activity Name',
              type: 'text',
              placeholder: 'e.g., Research Training Program',
              required: true,
              size: 'full'
            },
            {
              name: 'no_of_students',
              label: 'No. of Students',
              type: 'number',
              placeholder: 'e.g., 50',
              required: false,
              size: 'third'
            },
            {
              name: 'duration',
              label: 'Duration',
              type: 'text',
              placeholder: 'e.g., 12-09-2024 to 17-11-2024',
              required: false,
              size: 'third'
            },
            {
              name: 'resource_person',
              label: 'Resource Person/Organization',
              type: 'text',
              placeholder: 'e.g., Industry Partner, External Expert',
              required: false,
              size: 'third'
            },
            {
              name: 'target_audience',
              label: 'Target Audience',
              type: 'text',
              placeholder: 'e.g., First year students, Research scholars',
              required: false,
              size: 'full'
            }
          ],
          searchableFields: ['training_activity', 'resource_person', 'academic_year'],
          sortableFields: ['academic_year', 'training_activity', 'no_of_students', 'created_at'],
          editableFields: ['academic_year', 'training_activity', 'no_of_students', 'duration', 'resource_person', 'target_audience']
        },
        'funded-projects': {
          tableName: 'ece_faculty_projects',
          displayField: 'academic_year',
          sectionTitle: 'Funded Research Projects',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year/Batch',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'file_url',
              label: 'Project Details PDF',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'file_url']
        },
        'collaborative-programs': {
          tableName: 'ece_faculty_csp',
          displayField: 'academic_year',
          sectionTitle: 'Collaborative Study Programs',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year/Batch',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'file_url',
              label: 'Program Details PDF',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'file_url']
        },
        'research-collaborations': {
          tableName: 'ece_faculty_research_projects',
          displayField: 'title',
          sectionTitle: 'Research Collaborations & Publications',
          fields: [
            {
              name: 'type',
              label: 'Type',
              type: 'select',
              required: true,
              size: 'full',
              options: [
                { label: 'National Project', value: 'national' },
                { label: 'International Project', value: 'international' }
              ],
              description: 'Select the research type'
            },
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2024',
              required: true,
              size: 'half',
              description: 'Year of the research',
              validation: {
                min: 1,
                max: 100,
                pattern: '^[a-zA-Z0-9\\s\\-.,()]+$',
                message: 'Year must be valid with alphanumeric characters'
              }
            },
            {
              name: 'title',
              label: 'Research Title',
              type: 'text',
              placeholder: 'e.g., AI-based Signal Processing',
              required: true,
              size: 'full',
              description: 'Enter the title of the research',
              validation: {
                min: 5,
                max: 500,
                pattern: '^[a-zA-Z0-9\\s\\-.,()]+$',
                message: 'Title must be 5-500 characters with alphanumeric characters and basic punctuation'
              }
            },
            {
              name: 'fileUrl',
              label: 'Research Document/Publication PDF',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf,.doc,.docx',
              description: 'Upload the research document or publication (PDF, DOC, or DOCX format)'
            }
          ],
          searchableFields: ['title', 'type', 'year'],
          sortableFields: ['title', 'type', 'year', 'created_at'],
          editableFields: ['type', 'title', 'year', 'fileUrl']
        },
        'online-learning': {
          tableName: 'ece_faculty_nptel',
          displayField: 'academic_year',
          sectionTitle: 'Online Learning Courses (NPTEL/MOOCs)',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year/Batch',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'file_url',
              label: 'Course Details PDF',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'file_url']
        },
        'achievements-pdf': {
          tableName: 'ece_faculty_achievements_pdf',
          displayField: 'pdf_title',
          sectionTitle: 'Faculty Achievements List PDF',
          fields: [
            {
              name: 'pdf_title',
              label: 'Document Title',
              type: 'text',
              placeholder: 'e.g., Faculty Research Achievements 2024',
              required: true,
              size: 'full'
            },
            {
              name: 'file_url',
              label: 'PDF File',
              type: 'file',
              required: false,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['pdf_title'],
          sortableFields: ['pdf_title', 'created_at'],
          editableFields: ['pdf_title', 'file_url']
        },
        'research-impact': {
          tableName: 'ece_faculty_achievements_placement',
          displayField: 'academic_year',
          sectionTitle: 'Research Impact & Student Outcomes',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'total_final_year_students',
              label: 'Total Final Year Students Mentored',
              type: 'number',
              required: false,
              size: 'half'
            },
            {
              name: 'students_placed',
              label: 'Students Placed in Industry',
              type: 'number',
              required: false,
              size: 'half'
            },
            {
              name: 'students_higher_studies',
              label: 'Students Pursuing Higher Studies',
              type: 'number',
              required: false,
              size: 'half',
              description: 'GATE/GRE/GMAT qualified'
            },
            {
              name: 'students_entrepreneur',
              label: 'Student Entrepreneurs',
              type: 'number',
              required: false,
              size: 'half'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total_final_year_students', 'created_at'],
          editableFields: ['academic_year', 'total_final_year_students', 'students_placed', 'students_higher_studies', 'students_entrepreneur']
        },
        'mentoring-achievements': {
          tableName: 'ece_faculty_achievements_internships',
          displayField: 'academic_year',
          sectionTitle: 'Mentoring & Internship Achievements',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'full'
            },
            {
              name: 'certificates_nptel',
              label: 'Students with NPTEL Certificates',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'certificates_coursera',
              label: 'Students with Coursera Certificates',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'certificates_others',
              label: 'Students with Other Certificates',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'internships_internshala',
              label: 'Internships via Internshala',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'internships_apssdc',
              label: 'Internships via APSSDC',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'internships_others',
              label: 'Internships via Others',
              type: 'number',
              required: false,
              size: 'third'
            },
            {
              name: 'workshops',
              label: 'Workshops Conducted',
              type: 'number',
              required: false,
              size: 'half'
            },
            {
              name: 'cocurricular_activities',
              label: 'Co-Curricular Activities Led',
              type: 'number',
              required: false,
              size: 'half'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'certificates_nptel', 'certificates_coursera', 'certificates_others', 'internships_internshala', 'internships_apssdc', 'internships_others', 'workshops', 'cocurricular_activities']
        }
      }
    },
    
    'faculty-awards': {
      displayName: 'Faculty Awards',
      tableName: 'ece_faculty_awards',
      displayField: 'title',
      fields: [
            {
              name: 'title',
              label: 'Description of the Award',
              type: 'text',
              placeholder: 'e.g., Description of the Award',
              required: true,
              size: 'full',
              description: 'Write a brief description of the award received'
            },
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2024',
              required: true,
              size: 'half',
              description: 'Year of the conference'
            },
            
          ],
          searchableFields: ['faculty_name', 'title', 'year'],
          sortableFields: ['year', 'title', 'created_at'],
          editableFields: ['title', 'year']
    },
    
    'physical-facilities': {
      tableName: 'ece_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g.,2026',
          required: true,
          size: 'full',
          description: ''
        },
        
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'faculty-development': {
      tableName: 'ece_fdp',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' }
          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'placements': {
      tableName: 'ece_placements',
      displayField: 'year',
      fields: [
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'Enter academic year (e.g., 2023-2024)',
          required: true,
          size: 'full',
          description: 'Enter the academic year for placements'
        },
        {
          name: 'url',
          label: 'File URL',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'Upload placement document (PDF, DOC, DOCX, XLS, XLSX, or Image files)'
        }
      ],
      searchableFields: ['year'],
      sortableFields: ['year', 'created_at'],
      editableFields: ['year', 'url']
    },
    'hackathons-gallery': {
      tableName: 'ect_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'classrooms', label: 'Classrooms' },
            { value: 'laboratories', label: 'laboratories' },
            { value: 'toppers', label: 'Academic Toppers' },
            { value: 'technical', label: 'Technical Association' },
            { value: 'activities', label: 'Extracurricular Activities' },
            { value: 'labs', label: 'Laboratories' },
            { value: 'placements', label: 'Placements' },
            { value: 'training', label: 'Training Activities' },
            { value: 'gate', label: 'GATE' },
            { value: 'honour', label: 'Roll of Honour' },
            { value: 'workshops', label: 'Workshops' },
            { value: 'lectures', label: 'Guest Lecturers' },
            { value: 'faculty', label: 'Faculty Development Programs' },


          ]
        },
         {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'gallery']
    },
    'bos-members': {
      tableName: 'ece_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'ece_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },
    'eresources': {
      tableName: 'ece_eresources',
      displayField: 'subject_name',
      fields: [
        {
          name: 'regulation',
          label: 'Regulation',
          type: 'text',
          placeholder: 'e.g., R18, R20, v23',
          required: true,
          size: 'half',
          description: 'Enter the regulation code'
        },
        {
          name: 'semester',
          label: 'Semester',
          type: 'text',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half',
          description: 'Enter the semester number'
        },
        {
          name: 'subject_name',
          label: 'Subject Name',
          type: 'text',
          placeholder: 'e.g., Digital Signal Processing',
          required: true,
          size: 'full',
          description: 'Enter the subject name'
        },
        {
          name: 'display_order',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: false,
          size: 'half',
          description: 'Enter display order (optional)'
        },
        {
          name: 'file_url',
          label: 'Resource File',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.ppt,.pptx,.docx,.xls,.xlsx,.mp4,.mov',
          description: 'Upload the e-resource file'
        }
      ],
      searchableFields: ['subject_name', 'regulation', 'semester'],
      sortableFields: ['subject_name', 'regulation', 'semester', 'display_order', 'created_at'],
      editableFields: ['regulation', 'semester', 'subject_name', 'display_order', 'file_url']
    },
    
    'hackathons': {
      tableName: 'ece_hackathons',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Hackathon Title',
          type: 'text',
          placeholder: 'e.g., Annual Hackathon 2024',
          required: true,
          size: 'full',
          description: 'Enter the title of the hackathon event'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'full',
          description: 'Enter the academic year'
        },
        {
          name: 'brochure_url',
          label: 'Brochure',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.jpg,.jpeg,.png',
          description: 'Upload hackathon brochure (PDF or Image)'
        },
        {
          name: 'winners_url',
          label: 'Winners Details',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx',
          description: 'Upload winners list or details document'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'created_at'],
      editableFields: ['title', 'academic_year', 'brochure_url', 'winners_url']
    },
    'newsletters': {
      tableName: 'ece_newletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },
        {
          name: 'publish_date',
          label: 'Publish Date',
          type: 'date',
          required: true,
          size: 'half'
        },
        {
          name: 'pdf_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year', 'publish_date'],
      editableFields: ['title', 'volume', 'issue', 'year', 'publish_date', 'pdf_url']
    },
    'mous': {
      tableName: 'ece_mous',
      displayField: 'organization',
      fields: [
        {
          name: 'organization',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full',
          description: 'Enter the name of the organization or institute'
        },
        {
          name: 'date',
          label: 'MOU Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the MOU date'
        },
        
        {
          name: 'status',
          label: 'MOU Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'On going', label: 'On going' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Terminated', label: 'Terminated' }
          ],
          description: 'Select the MOU status'
        },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'MOU', label: 'MOU' },
            { value: 'MOA', label: 'MOA' },
            { value: 'Agreement', label: 'Agreement' }
          ],
          description: 'Select the document type'
        },
        {
          name: 'purpose',
          label: 'Purpose',
          type: 'textarea',
          placeholder: 'Enter the purpose or objectives of the MOU',
          required: false,
          size: 'full',
          description: 'Describe the purpose of this MOU'
        },
        {
          name: 'document_url',
          label: 'MOU Document',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the MOU document (PDF or DOC)'
        }
      ],
      searchableFields: ['organization', 'status', 'type'],
      sortableFields: ['organization', 'date', 'status', 'type', 'created_at'],
      editableFields: ['organization', 'date', 'status', 'type', 'purpose', 'document_url']
    },
    'syllabus': {
      tableName: 'ece_syllabus',
      displayField: 'title',
      fields: [
        {
          name: 'program',
          label: 'Program',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { label: 'B.Tech', value: 'B.Tech' },
            { label: 'M.Tech', value: 'M.Tech' }
          ],
          description: 'Select the program (B.Tech or M.Tech)'
        },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'Syllabus', value: 'syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
        },
        {
          name: 'title',
          label: 'Syllabus Title',
          type: 'text',
          placeholder: 'e.g., B.Tech ECE - II Year Syllabus',
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
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: false,
          size: 'half',
          description: 'Enter the academic year (optional)'
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
      searchableFields: ['title', 'program', 'academic_year'],
      sortableFields: ['title', 'program', 'created_at'],
      editableFields: ['program', 'type', 'title', 'academic_year', 'fileUrl']
    },
    'student-achievements': {
      displayName: 'Student Achievements',
      autoGenerateTitle: true,
      isMultiTable: true,
      tables: {
        'roll-of-honour': {
          tableName: 'ece_roll_of_honour',
          displayField: 'student_name',
          sectionTitle: 'Roll Of Honour',
          fields: [
            {
              name: 'batch',
              label: 'Batch',
              type: 'text',
              placeholder: 'e.g., 2021-25',
              required: true,
              size: 'half',
              description: 'Student batch year'
            },
            {
              name: 'regd_no',
              label: 'Regd No.',
              type: 'text',
              placeholder: 'e.g., 21A81A0262',
              required: true,
              size: 'half',
              description: 'Student registration number'
            },
            {
              name: 'student_name',
              label: 'Name of the Student',
              type: 'text',
              placeholder: 'Enter student name',
              required: true,
              size: 'half',
              description: 'Full name of the student'
            },
            {
              name: 'percentage',
              label: 'Percentage',
              type: 'number',
              placeholder: 'e.g., 87.34',
              required: true,
              size: 'half',
              description: 'Academic percentage/CGPA',
              step: '0.01'
            }
          ],
          searchableFields: ['student_name', 'regd_no', 'batch'],
          sortableFields: ['batch', 'percentage', 'student_name', 'created_at'],
          editableFields: ['batch', 'regd_no', 'student_name', 'percentage']
        },
        'internships': {
      tableName: 'ece_workshops_internships',
      displayField: 'title',
      fields: [
        {
          name: 'program',
          label: 'Program',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { label: 'Webinars', value: 'webinars' },
            { label: 'Seminars', value: 'seminars' },
            { label: 'Workshops', value: 'workshops' },
            { label: 'Internships', value: 'internships' },

          ],
          description: 'Select the program (B.Tech or M.Tech)'
        },
        
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., B.Tech ECE - II Year Syllabus',
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
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g.,2025',
          required: false,
          size: 'half',
          description: 'Enter the year'
        },
        {
          name: 'url',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],
      searchableFields: ['title', 'program', 'academic_year'],
      sortableFields: ['title', 'program', 'created_at'],
      editableFields: ['program', 'type', 'title', 'academic_year', 'fileUrl']
    },
    'publications': {
      tableName: 'ece_publications',
      displayField: 'title',
      fields: [
       
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., B.Tech ECE - II Year Syllabus',
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
          name: 'url',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],
      searchableFields: ['title', 'year'],
      sortableFields: ['title', 'year', 'created_at'],
      editableFields: ['title', 'year', 'fileUrl']
    },
        'icet': {
          tableName: 'ece_icet',
          displayField: 'student_name',
          sectionTitle: 'icet',
          fields: [
            {
              name: 'batch',
              label: 'Batch',
              type: 'text',
              placeholder: 'e.g., 2021-25',
              required: true,
              size: 'half',
              description: 'Student batch year'
            },
            {
              name: 'regd_no',
              label: 'Regd No.',
              type: 'text',
              placeholder: 'e.g., 21A81A0262',
              required: true,
              size: 'half',
              description: 'Student registration number'
            },
            {
              name: 'student_name',
              label: 'Name of the Student',
              type: 'text',
              placeholder: 'Enter student name',
              required: true,
              size: 'half',
              description: 'Full name of the student'
            },
            {
              name: 'exam',
              label: 'Exam',
              type: 'text',
              placeholder: 'e.g., ICET, PGCET',
              required: true,
              size: 'half',
              description: 'Name of the exam',
              step: '0.01'
            },
             {
              name: 'education',
              label: 'Education',
              type: 'text',
              placeholder: 'e.g., M.Tech.,MBA',
              required: true,
              size: 'half',
              description: 'Higher Education Program',
              step: '0.01'
            }
          ],
          searchableFields: ['student_name', 'education','exam', 'batch'],
          sortableFields: ['batch', 'education', 'exam','student_name', 'created_at'],
          editableFields: ['batch', 'regd_no', 'exam','student_name', 'education']
        },
        'gre': {
  tableName: 'ece_gre',
  displayField: 'student_name',
  sectionTitle: 'Higher Studies',

  fields: [
    {
      name: 'batch',
      label: 'Batch',
      type: 'text',
      placeholder: 'e.g., 2021-25',
      required: true,
      size: 'half',
      description: 'Student batch year'
    },
    {
      name: 'regd_no',
      label: 'Regd No.',
      type: 'text',
      placeholder: 'e.g., 21A81A0262',
      required: true,
      size: 'half',
      description: 'Student registration number'
    },
    {
      name: 'student_name',
      label: 'Student Name',
      type: 'text',
      placeholder: 'Enter full name',
      required: true,
      size: 'half',
      description: 'Full name of the student'
    },
    {
      name: 'course',
      label: 'Course',
      type: 'text',
      placeholder: 'e.g., MS, M.Tech',
      required: false,
      size: 'half',
      description: 'Course opted by the student'
    },
    {
      name: 'toefl',
      label: 'TOEFL',
      type: 'number',
      placeholder: 'e.g., 95',
      required: false,
      size: 'half',
      description: 'TOEFL score',
      step: '1'
    },
    {
      name: 'gre',
      label: 'GRE',
      type: 'number',
      placeholder: 'e.g., 315',
      required: false,
      size: 'half',
      description: 'GRE score',
      step: '1'
    },
    {
      name: 'ielts',
      label: 'IELTS',
      type: 'number',
      placeholder: 'e.g., 7.5',
      required: false,
      size: 'half',
      description: 'IELTS score',
      step: '0.5'
    },
    {
      name: 'duolingo',
      label: 'Duolingo',
      type: 'number',
      placeholder: 'e.g., 110',
      required: false,
      size: 'half',
      description: 'Duolingo English Test score',
      step: '1'
    },
    {
      name: 'pte',
      label: 'PTE',
      type: 'number',
      placeholder: 'e.g., 65',
      required: false,
      size: 'half',
      description: 'PTE score',
      step: '1'
    }
  ],

  searchableFields: [
    'student_name',
    'regd_no',
    'batch',
    'course'
  ],

  sortableFields: [
    'batch',
    'student_name',
    'toefl',
    'gre',
    'ielts',
    'duolingo',
    'pte',
    'created_at'
  ],

  editableFields: [
    'batch',
    'regd_no',
    'student_name',
    'course',
    'toefl',
    'gre',
    'ielts',
    'duolingo',
    'pte'
  ]
},

        'gate': {
          tableName: 'ece_gate',
          displayField: 'student_name',
          sectionTitle: 'gate',
          fields: [
            {
              name: 'batch',
              label: 'Batch',
              type: 'text',
              placeholder: 'e.g., 2021-25',
              required: true,
              size: 'half',
              description: 'Student batch year'
            },
            {
              name: 'regd_no',
              label: 'Regd No.',
              type: 'text',
              placeholder: 'e.g., 21A81A0262',
              required: true,
              size: 'half',
              description: 'Student registration number'
            },
            {
              name: 'student_name',
              label: 'Name of the Student',
              type: 'text',
              placeholder: 'Enter student name',
              required: true,
              size: 'half',
              description: 'Full name of the student'
            },
            {
              name: 'score',
              label: 'Score',
              type: 'number',
              placeholder: 'e.g., 87.34',
              required: true,
              size: 'half',
              description: 'Academic score',
              step: '0.01'
            },
            {
              name: 'year',
              label: 'Year',
              type: 'number',
              placeholder: 'e.g., 2023',
              required: true,
              size: 'half',
              description: 'Year',
              step: '1'
            }
          ],
          searchableFields: ['student_name', 'regd_no', 'batch','year'],
          sortableFields: ['batch', 'score', 'student_name', 'created_at','year'],
          editableFields: ['batch', 'regd_no', 'student_name', 'score', 'year']
        },
         'awards': {
          tableName: 'ece_awards',
          displayField: 'student_name',
          sectionTitle: 'Awards',
          fields: [
            {
              name: 'batch',
              label: 'Batch',
              type: 'text',
              placeholder: 'e.g., 2021-25',
              required: true,
              size: 'half',
              description: 'Student batch year'
            },
            {
              name: 'regd_no',
              label: 'Regd No.',
              type: 'text',
              placeholder: 'e.g., 21A81A0262',
              required: true,
              size: 'half',
              description: 'Student registration number'
            },
            {
              name: 'student_name',
              label: 'Name of the Student',
              type: 'text',
              placeholder: 'Enter student name',
              required: true,
              size: 'half',
              description: 'Full name of the student'
            },
             {
              name: 'name_of_the_award',
              label: 'Name of the Award',
              type: 'text',
              placeholder: 'Enter award name',
              required: true,
              size: 'half',
              description: 'Full name of the student'
            },
          ],
          searchableFields: ['student_name', 'regd_no', 'batch'],
          sortableFields: ['batch', 'name_of_the_award', 'student_name', 'created_at'],
          editableFields: ['batch', 'regd_no', 'student_name', 'name_of_the_award']
        },
        'placement': {
          tableName: 'ece_placement',
          displayField: 'academic_year',
          sectionTitle: 'Placement',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'total_final_year_students',
              label: 'Total No.of Final Year Students',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_placed',
              label: 'No.of students placed in companies or Government Sector',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_higher_studies',
              label: 'No.of students admitted to higher studies with valid qualifying scores',
              type: 'number',
              required: true,
              size: 'half',
              description: 'GATE or equivalent State or National Level Tests, GRE, GMAT etc.'
            },
            {
              name: 'students_entrepreneur',
              label: 'No.of students turned entrepreneur in engineering/technology',
              type: 'number',
              required: true,
              size: 'half'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total_final_year_students', 'created_at'],
          editableFields: ['academic_year', 'total_final_year_students', 'students_placed', 'students_higher_studies', 'students_entrepreneur']
        },
        'higher-studies': {
          tableName: 'ece_higher_studies',
          displayField: 'academic_year',
          sectionTitle: 'Higher Studies',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'total_final_year_students',
              label: 'Total No.of Final Year Students',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_higher_studies',
              label: 'No.of students admitted to higher studies with valid qualifying scores',
              type: 'number',
              required: true,
              size: 'half',
              description: 'GATE or equivalent State or National Level Tests, GRE, GMAT etc.'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total_final_year_students', 'created_at'],
          editableFields: ['academic_year', 'total_final_year_students', 'students_higher_studies']
        },
        'competitive-examinations': {
          tableName: 'ece_competitive_examinations',
          displayField: 'year',
          sectionTitle: 'Competitive Examinations',
          fields: [
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              placeholder: 'e.g., 2018-19, 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'net',
              label: 'NET',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'slet',
              label: 'SLET',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'gmat',
              label: 'GMAT',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'cat',
              label: 'CAT',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'gre',
              label: 'GRE',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'jam',
              label: 'JAM',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'ielts',
              label: 'IELTS',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'toefl',
              label: 'TOEFL',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'civil_services',
              label: 'Civil Services',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'state_govt_exams',
              label: 'State Government examinations (APPGECET)',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'other_exams',
              label: 'Other examinations conducted by State/Central Govt (Specify)',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: true,
              size: 'half',
              description: 'Total of all exams'
            }
          ],
          searchableFields: ['year'],
          sortableFields: ['year', 'total', 'created_at'],
          editableFields: ['year', 'net', 'slet', 'gmat', 'cat', 'gre', 'jam', 'ielts', 'toefl', 'civil_services', 'state_govt_exams', 'other_exams', 'total']
        },
        'course-certifications': {
          tableName: 'ece_course_certifications',
          displayField: 'academic_year',
          sectionTitle: 'Course Certifications',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'nptel',
              label: 'NPTEL',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'coursera',
              label: 'Coursera',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'others',
              label: 'Others',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: true,
              size: 'half',
              description: 'Total certifications'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total', 'created_at'],
          editableFields: ['academic_year', 'nptel', 'coursera', 'others', 'total']
        },
        'internship': {
          tableName: 'ece_internship',
          displayField: 'academic_year',
          sectionTitle: 'Internship',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'full'
            },
            {
              name: 'internshala',
              label: 'Internshala',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'apssdc',
              label: 'APSSDC',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'others',
              label: 'Others',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'total',
              label: 'Total',
              type: 'number',
              required: true,
              size: 'half',
              description: 'Total internships'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total', 'created_at'],
          editableFields: ['academic_year', 'internshala', 'apssdc', 'others', 'total']
        },
        'workshops-soc': {
          tableName: 'ece_workshops_soc',
          displayField: 'workshop_name',
          sectionTitle: 'Workshops/SOC',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2023-24',
              required: true,
              size: 'half',
              description: 'Used for grouping workshops'
            },
            {
              name: 'workshop_name',
              label: 'Workshops/SOC attended/conducted',
              type: 'text',
              placeholder: 'e.g., Digital Signal Processing Workshop',
              required: true,
              size: 'full'
            },
            {
              name: 'association_college',
              label: 'In association/college attended',
              type: 'text',
              placeholder: 'e.g., NIT Andhra Pradesh',
              required: true,
              size: 'full'
            },
            {
              name: 'start_date',
              label: 'Start Date',
              type: 'date',
              required: true,
              size: 'half'
            },
            {
              name: 'end_date',
              label: 'End Date',
              type: 'date',
              required: true,
              size: 'half'
            },
            {
              name: 'no_of_students',
              label: 'No. of Students',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'duration',
              label: 'Weeks/Days',
              type: 'text',
              placeholder: 'e.g., 3 Days, 2 Weeks',
              required: true,
              size: 'third'
            },
            {
              name: 'year_sem',
              label: 'Year/Sem',
              type: 'text',
              placeholder: 'e.g., VI, IV, III',
              required: true,
              size: 'third'
            }
          ],
          searchableFields: ['workshop_name', 'association_college', 'academic_year', 'year_sem'],
          sortableFields: ['academic_year', 'start_date', 'workshop_name', 'created_at'],
          editableFields: ['academic_year', 'workshop_name', 'association_college', 'start_date', 'end_date', 'no_of_students', 'duration', 'year_sem']
        },
        'crt': {
          tableName: 'ece_crt',
          displayField: 'training_activity',
          sectionTitle: 'CRT',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'half'
            },
            {
              name: 'training_activity',
              label: 'Name of the Training Activity',
              type: 'text',
              placeholder: 'e.g., CRT Training program',
              required: true,
              size: 'full'
            },
            {
              name: 'no_of_students',
              label: 'No of students attended',
              type: 'number',
              placeholder: 'e.g., 70',
              required: true,
              size: 'third'
            },
            {
              name: 'duration',
              label: 'Duration',
              type: 'text',
              placeholder: 'e.g., 12-09-2018 to 17-11-2018',
              required: true,
              size: 'third'
            },
            {
              name: 'resource_person',
              label: 'Resource Person',
              type: 'text',
              placeholder: 'e.g., New leaf technology',
              required: true,
              size: 'third'
            },
            {
              name: 'target_audience',
              label: 'Target Audience',
              type: 'text',
              placeholder: 'e.g., First year ECE students',
              required: true,
              size: 'full'
            }
          ],
          searchableFields: ['training_activity', 'resource_person', 'target_audience', 'academic_year'],
          sortableFields: ['academic_year', 'training_activity', 'no_of_students', 'created_at'],
          editableFields: ['academic_year', 'training_activity', 'no_of_students', 'duration', 'resource_person', 'target_audience']
        },
        'projects': {
          tableName: 'ece_projects',
          displayField: 'academic_year',
          sectionTitle: 'Projects',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2022-23',
              required: true,
              size: 'half'
            },
            {
              name: 'file_url',
              label: 'PDF File',
              type: 'file',
              required: true,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'file_url']
        },
        'csp': {
          tableName: 'ece_csp',
          displayField: 'academic_year',
          sectionTitle: 'CSP',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year/Batch',
              type: 'text',
              placeholder: 'e.g., 2021-25',
              required: true,
              size: 'half'
            },
            {
              name: 'file_url',
              label: 'PDF File',
              type: 'file',
              required: true,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'file_url']
        },
        'research-projects': {
          tableName: 'ece_research_projects',
          displayField: 'title',
          fields: [
            {
              name: 'type',
              label: 'Type',
              type: 'select',
              required: true,
              size: 'full',
              options: [
                { label: 'B.Tech', value: 'btech' },
                { label: 'M.Tech', value: 'mtech' }
              ],
              description: 'Select whether this document is B.Tech or M.Tech'
            },
            {
              name: 'year',
              label: 'Syllabus Year',
              type: 'text',
              placeholder: 'e.g., 2023',
              required: true,
              size: 'full',
              description: 'Enter the   year of the document',
              validation: {
                min: 5,
                max: 200,
                pattern: '^[a-zA-Z0-9\\s\\-.,()]+$',
                message: 'Title must be 5-200 characters with alphanumeric characters and basic punctuation'
              }
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
              name: 'fileUrl',
              label: 'Syllabus PDF Document',
              type: 'file',
              required: true,
              size: 'full',
              accept: '.pdf,.doc,.docx',
              description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
            }
          ],
          searchableFields: ['title', 'type','year'],
          sortableFields: ['title', 'created_at','year'],
          editableFields: ['type', 'title', 'fileUrl','year']
        },
        'nptel': {
          tableName: 'ece_nptel',
          displayField: 'academic_year',
          sectionTitle: 'NPTEL',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year/Batch',
              type: 'text',
              placeholder: 'e.g., 2021-25',
              required: true,
              size: 'half'
            },
            {
              name: 'file_url',
              label: 'PDF File',
              type: 'file',
              required: true,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'file_url']
        },
        'student-achievements-pdf': {
          tableName: 'ece_student_achievements_pdf',
          displayField: 'pdf_title',
          sectionTitle: 'Student List PDF',
          fields: [
            {
              name: 'pdf_title',
              label: 'PDF Title',
              type: 'text',
              placeholder: 'e.g., List of Students Participated/got prizes in Technical',
              required: true,
              size: 'full'
            },
            {
              name: 'file_url',
              label: 'PDF File',
              type: 'file',
              required: true,
              size: 'full',
              accept: '.pdf'
            }
          ],
          searchableFields: ['pdf_title'],
          sortableFields: ['pdf_title', 'created_at'],
          editableFields: ['pdf_title', 'file_url']
        },
        'student-achievements-placement': {
          tableName: 'ece_student_achievements_placement',
          displayField: 'academic_year',
          sectionTitle: 'Placement, Higher Studies and Entrepreneurship',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year (CAY)',
              type: 'text',
              placeholder: 'e.g., 2024-25',
              required: true,
              size: 'half'
            },
            {
              name: 'total_final_year_students',
              label: 'Total No.of Final Year Students',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_placed',
              label: 'No.of students placed in companies or Government Sector',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'students_higher_studies',
              label: 'No.of students admitted to higher studies with valid qualifying scores',
              type: 'number',
              required: true,
              size: 'half',
              description: 'GATE or equivalent State or National Level Tests, GRE, GMAT etc.'
            },
            {
              name: 'students_entrepreneur',
              label: 'No.of students turned entrepreneur in engineering/technology',
              type: 'number',
              required: true,
              size: 'half'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'total_final_year_students', 'created_at'],
          editableFields: ['academic_year', 'total_final_year_students', 'students_placed', 'students_higher_studies', 'students_entrepreneur']
        },
        'student-achievements-internships': {
          tableName: 'ece_student_achievements_internships',
          displayField: 'academic_year',
          sectionTitle: 'Internships/Certificates/Workshop',
          fields: [
            {
              name: 'academic_year',
              label: 'Academic Year',
              type: 'text',
              placeholder: 'e.g., 2024-2025',
              required: true,
              size: 'full'
            },
            {
              name: 'certificates_nptel',
              label: 'Certificates - NPTEL',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'certificates_coursera',
              label: 'Certificates - Coursera',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'certificates_others',
              label: 'Certificates - Others',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'internships_internshala',
              label: 'Internships - Internshala',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'internships_apssdc',
              label: 'Internships - APSSDC',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'internships_others',
              label: 'Internships - Others',
              type: 'number',
              required: true,
              size: 'third'
            },
            {
              name: 'workshops',
              label: 'Workshops',
              type: 'number',
              required: true,
              size: 'half'
            },
            {
              name: 'cocurricular_activities',
              label: 'Co-Curricular Activities',
              type: 'number',
              required: true,
              size: 'half'
            }
          ],
          searchableFields: ['academic_year'],
          sortableFields: ['academic_year', 'created_at'],
          editableFields: ['academic_year', 'certificates_nptel', 'certificates_coursera', 'certificates_others', 'internships_internshala', 'internships_apssdc', 'internships_others', 'workshops', 'cocurricular_activities']
        }
      }
    },
    'extra-curricular': {
      tableName: 'ece_extracurricular_activities',
      displayField: 'label',
      fields: [
        {
          name: 'type',
          label: 'Category/Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the category',
          options: [
            { value: 'Extra Curricular', label: 'Extra Curricular' },
            { value: 'Maitri Coordinators', label: 'Maitri Coordinators' },
            { value: 'Maitri Events', label: 'Maitri Events' }
          ]
        },
        {
          name: 'label',
          label: 'Activity Title',
          type: 'text',
          placeholder: 'e.g., Cultural Event',
          required: true,
          size: 'full',
          description: 'Enter the title of the activity'
        },
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: false,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'url',
          label: 'Activity Document/Photo',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload activity document or photo (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['label', 'type', 'year'],
      sortableFields: ['label', 'type', 'year', 'created_at'],
      editableFields: ['type', 'label', 'year', 'url']
    },
    'department-overview': {
      tableName: 'ece_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',
          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',
          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    },
    'handbooks': {
      tableName: 'ece_handbooks',
      displayField: 'title',
      fields: [
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Handbook Title',
          type: 'text',
          placeholder: 'e.g., Academic Handbook',
          required: true,
          size: 'full',
          description: 'Enter the handbook title'
        },
        {
          name: 'url',
          label: 'Handbook File (PDF)',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the handbook file (PDF, DOC, DOCX)'
        }
      ],
      searchableFields: ['title', 'year'],
      sortableFields: ['title', 'year', 'created_at'],
      editableFields: ['year', 'title', 'url']
    },
    
    'faculty-innovations': {
      tableName: 'ece_faculty_innovations',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'text',
          placeholder: 'e.g., Teaching Methods',
          required: true,
          size: 'half',
          description: 'Enter the innovation category'
        },
        {
          name: 'title',
          label: 'Innovation Title',
          type: 'text',
          placeholder: 'e.g., E-Content Material',
          required: true,
          size: 'full',
          description: 'Enter the title of the innovation'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter description',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Brief description of the innovation'
        },
        {
          name: 'items',
          label: 'Items (JSON)',
          type: 'textarea',
          placeholder: 'Enter JSON array of items',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Enter items as JSON array, e.g., ["Item 1", "Item 2"]'
        },
        {
          name: 'links',
          label: 'Links (JSON)',
          type: 'textarea',
          placeholder: 'Enter JSON array of links',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Enter links as JSON array, e.g., [{"name": "Link 1", "url": "http://..."}]'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['category', 'title', 'description', 'items', 'links']
    },
    'department-library': {
      tableName: 'ece_department_library',
      displayField: 'titles',
      fields: [
        {
          name: 'titles',
          label: 'Number of Titles',
          type: 'text',
          placeholder: 'e.g., 1500',
          required: true,
          size: 'half',
          description: 'Total number of unique titles in library'
        },
        {
          name: 'volumes',
          label: 'Number of Volumes',
          type: 'text',
          placeholder: 'e.g., 2000',
          required: true,
          size: 'half',
          description: 'Total number of volumes in library'
        },
        {
          name: 'faculty_incharge',
          label: 'Faculty In-charge',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Name of faculty member responsible for library'
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., library@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter library information and resources',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of library facilities and resources'
        },
        {
          name: 'image_url',
          label: 'Library Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload library image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['faculty_incharge', 'titles'],
      sortableFields: ['titles', 'volumes', 'created_at'],
      editableFields: ['titles', 'volumes', 'faculty_incharge', 'phone', 'email', 'description', 'image_url']
    },
    'clubs': {
      tableName: 'ece_clubs',
      displayField: 'event',
      fields: [
        {
          name: 'club',
          label: 'Club Name',
          type: 'text',
          placeholder: 'e.g., SPACE CLUB_AICTE-SPICES',
          required: true,
          size: 'full',
          description: 'Enter the club or association name'
        },
        {
          name: 'event',
          label: 'Event Name',
          type: 'text',
          placeholder: 'e.g., One Week Hands on Workshop on IoT',
          required: true,
          size: 'full',
          description: 'Enter the event title or name'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter event description',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Brief description of the club event'
        },
        {
          name: 'url',
          label: 'Event Document/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event document or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['club', 'event'],
      sortableFields: ['club', 'event', 'created_at'],
      editableFields: ['club', 'event', 'description', 'url']
    }
  },

  // ================================================================================================
  // CIVIL DEPARTMENT (Civil Engineering)
  // Table Prefix: civil_*
  //
  // Modules (alphabetical order):
  // • board-of-studies, consultancy, extra-curricular-activities, newsletters
  // • physical-facilities, syllabus, technical-association, workshops
  // ================================================================================================
  'civil':
  {
    'technical-faculty': {
      tableName: 'civil_technical_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when technical faculty member joined'
        }

      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'non-teaching-faculty': {
      tableName: 'civil_non_teaching_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'faculty-achievements': {
      tableName: 'civil_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Awards', label: 'Awards' },
            { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' }
          ]
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'faculty-development': {
      tableName: 'civil_faculty_development',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Program Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program category',
          options: [
            { value: 'FDP Attended', label: 'FDP Attended' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },
            { value: 'FDP Conducted', label: 'FDP Conducted' }
          ]
        },
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['category', 'title', 'year', 'file_url']
    },
    'faculty': {
      tableName: 'civil_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Civil Engineering',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Associate Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profile_url',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile document (PDF only)'
        }
      ],
      searchableFields: ['name', 'designation'],
      sortableFields: ['name', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['name', 'qualification', 'designation', 'date_of_joining', 'profile_url']
    },
    'hackathons-gallery': {
      tableName: 'civil_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'eapcet', label: 'EAPCET Toppers' },
            { value: 'toppers', label: 'Academic Toppers' },
            { value: 'technical', label: 'Technical Association' },
            { value: 'activities', label: 'Extracurricular Activities' },
            { value: 'labs', label: 'Laboratories' },
            { value: 'placements', label: 'Placements' },
            { value: 'training', label: 'Training Activities' },
            { value: 'gate', label: 'GATE' },
            { value: 'honour', label: 'Roll of Honour' },
            { value: 'workshops', label: 'Workshops' },
            { value: 'lectures', label: 'Guest Lecturers' },
            { value: 'faculty', label: 'Faculty Development Programs' },



          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'gallery']
    },
    'department-library': {
      tableName: 'civil_department_library',
      displayField: 'titles',
      fields: [
        {
          name: 'titles',
          label: 'Number of Titles',
          type: 'text',
          placeholder: 'e.g., 1500',
          required: true,
          size: 'half',
          description: 'Total number of unique titles in library'
        },
        {
          name: 'volumes',
          label: 'Number of Volumes',
          type: 'text',
          placeholder: 'e.g., 2000',
          required: true,
          size: 'half',
          description: 'Total number of volumes in library'
        },
        {
          name: 'faculty_incharge',
          label: 'Faculty In-charge',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Name of faculty member responsible for library'
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., library@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter library information and resources',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of library facilities and resources'
        },
        {
          name: 'image_url',
          label: 'Library Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload library image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['faculty_incharge', 'titles'],
      sortableFields: ['titles', 'volumes', 'created_at'],
      editableFields: ['titles', 'volumes', 'faculty_incharge', 'phone', 'email', 'description', 'image_url']
    },
    'placements': {
      tableName: 'civil_placements',
      displayField: 'batch',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/cseai/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    'research-projects': {
      tableName: 'civil_research_projects',
      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'B.Tech', label: 'B.Tech' },
            { value: 'M.Tech', label: 'M.Tech' },
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Academic year'
        },
        {
          name: 'title',
          label: 'Project Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'fileUrl',
          label: 'Project Document',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'type', 'academic_year'],
      sortableFields: ['title', 'type', 'academic_year', 'created_at'],
      editableFields: ['type', 'academic_year', 'title', 'fileUrl']
    },
    'student-achievements': {
      tableName: 'civil_student_achievements',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'Internships', label: 'Internships' },
            { value: 'Research Projects', label: 'Research Projects' },
            { value: 'Community Service Project', label: 'Community Service Project' },
            { value: 'Awards', label: 'Awards' },
            { value: 'NPTEL/Other Certifications', label: 'NPTEL/Other Certifications' },
            { value: 'HEI', label: 'HEI' },
            { value: 'Roll of honour', label: 'Roll of honour' },
            { value: 'Other Programmes', label: 'Other Programmes' }
          ]
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half',
          description: 'Academic year'
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'file_url',
          label: 'Certificate/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'mous': {
      tableName: 'civil_mous',
      displayField: 'mou_with',
      fields: [
        {
          name: 'mou_with',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full'
        },
        {
          name: 'from_date',
          label: 'MOU Start Date',
          type: 'text',
          placeholder: 'e.g., 2024-01-15 or 01-01-2024',
          required: true,
          size: 'half'
        },
        {
          name: 'to_date',
          label: 'MOU End Date',
          type: 'text',
          placeholder: 'e.g., 2026-01-14 or 31-12-2026',
          required: true,
          size: 'half'
        },
        {
          name: 'status',
          label: 'MOU Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'Till Date', label: 'Till Date' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Terminated', label: 'Terminated' },

          ]
        },
        {
          name: 'file_url',
          label: 'MOU Document',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload the MOU document or agreement (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['mou_with', 'status'],
      sortableFields: ['mou_with', 'from_date', 'to_date', 'status', 'created_at'],
      editableFields: ['mou_with', 'from_date', 'to_date', 'status', 'file_url']
    },
    'industry-programs': {
      tableName: 'civil_industry_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Industry Interaction Session, Corporate Training',
          required: true,
          size: 'full',
          description: 'Enter the title of the industry program or interaction'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },

        {
          name: 'file_url',
          label: 'Program Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program details, brochure, or related document (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year'],
      editableFields: ['title', 'academic_year', 'file_url']
    },
    'syllabus': {
      tableName: 'civil_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'B.Tech Syllabus', value: 'B.Tech Syllabus' },
            { label: 'M.Tech Syllabus', value: 'M.Tech Syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'file_url',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'file_url']
    },
    'bos-members': {
      tableName: 'civil_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'civil_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },
    'consultancy': {
      tableName: 'civil_consultancy',
      displayField: 'name',
      fields: [
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          required: true,
          placeholder: 'e.g., 2023-2024',
          size: 'half'
        },
        {
          name: 'name',
          label: 'Consultancy Title',
          type: 'text',
          required: true,
          placeholder: 'e.g., Consultancy Details',
          size: 'full'
        },
        {
          name: 'url',
          label: 'Document URL',
          type: 'file',
          required: false,
          accept: '.pdf,.doc,.docx',
          size: 'full',
          description: 'Upload consultancy document'
        }
      ],
      searchableFields: ['name', 'year'],
      editableFields: ['year', 'name', 'url']
    },
    'extra-curricular': {
      tableName: 'civil_extracurricular_activities',

      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Category',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'Extra Curricular Activities', label: 'Extra Curricular Activities' },

          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: false,
          size: 'half',
          description: 'Academic year'
        },
        {
          name: 'title',
          label: 'Activity Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'file_url',
          label: 'Document/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'type', 'academic_year'],
      sortableFields: ['title', 'type', 'academic_year', 'created_at'],
      editableFields: ['title', 'type', 'academic_year', 'file_url']
    },
    'newsletters': {
      tableName: 'civil_newsletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },

        {
          name: 'file_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year'],
      editableFields: ['title', 'volume', 'issue', 'year', 'file_url']
    },

    'physical-facilities': {
      tableName: 'cst_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },

    'technical-association': {
      tableName: 'civil_technical_association',
      displayField: 'description',
      fields: [
        {
          name: 'department',
          label: 'Department',
          type: 'text',
          required: true,
          placeholder: 'e.g., Civil',
          size: 'half'
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' }
          ]
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          placeholder: 'Description of technical association activities',
          size: 'full',
          rows: 4
        },
        {
          name: 'committee',
          label: 'Committee Members',
          type: 'textarea',
          required: false,
          placeholder: 'Enter committee member names (one per line, will be stored as JSON array)',
          size: 'full',
          rows: 4,
          description: 'Enter each member name on a new line'
        },
        {
          name: 'images',
          label: 'Association Images',
          type: 'textarea',
          required: false,
          placeholder: 'Enter image URLs (one per line, will be stored as JSON array)',
          size: 'full',
          rows: 3,
          description: 'Enter image paths or URLs, one per line'
        }
      ],
      searchableFields: ['description', 'department'],
      sortableFields: ['department', 'status', 'created_at'],
      editableFields: ['department', 'status', 'description', 'committee', 'images']
    },
    'workshops': {
      tableName: 'civil_workshops',
      displayField: 'name',
      fields: [
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          required: true,
          placeholder: 'e.g., 2023-2024',
          size: 'half'
        },
        {
          name: 'name',
          label: 'Workshop Title',
          type: 'text',
          required: true,
          placeholder: 'e.g., Workshops organized during Academic Year',
          size: 'full'
        },
        {
          name: 'url',
          label: 'Workshop Document',
          type: 'file',
          required: false,
          accept: '.pdf,.doc,.docx',
          size: 'full',
          description: 'Upload workshop details document'
        }
      ],
      searchableFields: ['name', 'year'],
      editableFields: ['year', 'name', 'url']
    }
  },

  // ================================================================================================
  // MECH DEPARTMENT (Mechanical Engineering)
  // Table Prefix: mech_*
  //
  // Modules (alphabetical order):
  // • bos-members, bos-minutes, faculty, faculty-achievements, faculty-methods
  // • laboratories, library, magazines, mous, newsletters
  // • placements, project-research, student-achievements, syllabus, technical-association, workshops
  // ================================================================================================
  'mech':
  {

    'industry-programs': {
      tableName: 'mech_industry_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Industry Interaction Session, Corporate Training',
          required: true,
          size: 'full',
          description: 'Enter the title of the industry program or interaction'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },

        {
          name: 'file_url',
          label: 'Program Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program details, brochure, or related document (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year'],
      editableFields: ['title', 'academic_year', 'file_url']
    },
    'hackathons-gallery': {
      tableName: 'mech_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'academic toppers', label: 'Academic Toppers' },
            { value: 'technical association', label: 'Technical Association' },
            { value: 'extracurricular activities', label: 'Extracurricular Activities' },
            { value: 'laboratory', label: 'Laboratory' },
            { value: 'placements', label: 'Placements' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'gallery']
    },
    'bos-members': {
      tableName: 'mech_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'syllabus': {
      tableName: 'mech_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'B.Tech Syllabus', value: 'B.Tech Syllabus' },
            { label: 'M.Tech Syllabus', value: 'M.Tech Syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },
    'bos-minutes': {
      tableName: 'mech_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },
    'faculty': {
      tableName: 'mech_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Mechanical Engineering',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Associate Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profileUrl',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile document or image (PDF or Image files)'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'qualification', 'designation', 'date_of_joining', 'profileUrl']
    },
    'faculty-achievements': {
      tableName: 'mech_facultyachievements',
      displayField: 'description',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Faculty Publications', label: 'Faculty Publications' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'description',
          label: 'Achievement Description',
          type: 'textarea',
          placeholder: 'e.g., Faculty Publication during the Academic Year 2023-2024',
          required: true,
          size: 'full',
          rows: 3,
          description: 'Enter the description of the achievement or publication'
        },
        {
          name: 'url',
          label: 'Supporting Document/URL',
          type: 'text',
          required: false,
          size: 'full',
          placeholder: 'Enter URL or file path',
          description: 'Enter document URL or upload path'
        }
      ],
      searchableFields: ['description', 'category', 'academic_year'],
      sortableFields: ['description', 'category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'description', 'url']
    },
    'faculty-methods': {
      tableName: 'mech_facultyTLmethods',
      displayField: 'method',
      fields: [
        {
          name: 'method',
          label: 'Teaching & Learning Method',
          type: 'text',
          placeholder: 'e.g., Presentations using PPT, Technical videos for Demonstration',
          required: true,
          size: 'full',
          description: 'Enter the teaching and learning method'
        },
        {
          name: 'url',
          label: 'Method Document/Presentation URL',
          type: 'text',
          placeholder: 'e.g., https://srivasaviengg.ac.in/uploads/mech/...',
          required: false,
          size: 'full',
          description: 'Enter URL to method documentation or presentation'
        }
      ],
      searchableFields: ['method'],
      sortableFields: ['method', 'created_at'],
      editableFields: ['method', 'url']
    },
    'placements': {
      tableName: 'mech_placements',
      displayField: 'batch',
      fields: [
        {
          name: 'batch',
          label: 'Batch Year',
          type: 'text',
          placeholder: 'e.g., 2019-23, 2020-24',
          required: true,
          size: 'full',
          description: 'Enter the batch year (e.g., 2019-23)'
        },
        {
          name: 'url',
          label: 'Placements File URL',
          type: 'text',
          required: true,
          size: 'full',
          placeholder: 'e.g., https://srivasaviengg.ac.in/uploads/mech/placements_2023-24.pdf',
          description: 'Enter the URL path for the placement document'
        }
      ],
      searchableFields: ['batch'],
      sortableFields: ['batch', 'created_at'],
      editableFields: ['batch', 'url']
    },
    'library': {
      tableName: 'mech_library',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Library Title',
          type: 'text',
          placeholder: 'e.g., Department Library',
          required: true,
          size: 'full',
          description: 'Enter library title or name'
        },
        {
          name: 'description',
          label: 'Library Description',
          type: 'textarea',
          placeholder: 'Enter library description paragraphs (one per line, will be stored as JSON array)',
          required: false,
          size: 'full',
          rows: 5,
          description: 'Enter each description paragraph on a new line'
        },
        {
          name: 'resources',
          label: 'Library Resources',
          type: 'textarea',
          placeholder: 'Enter resources in format: icon|text (one per line)\nExample: Book|Total Books: 1,500+',
          required: false,
          size: 'full',
          rows: 5,
          description: 'Enter each resource on a new line in format: icon|text'
        },
        {
          name: 'services',
          label: 'Library Services',
          type: 'textarea',
          placeholder: 'Enter services in format: icon|text (one per line)\nExample: Search|Reference & Research Support',
          required: false,
          size: 'full',
          rows: 5,
          description: 'Enter each service on a new line in format: icon|text'
        },
        {
          name: 'faculty_incharge',
          label: 'Faculty In-charge Details',
          type: 'textarea',
          placeholder: 'Enter in format: name|designation|department\nExample: Mr. K. Sri Rama Murthy|Sr. Assistant Professor|Department of Mechanical Engineering',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Enter faculty details separated by | (pipe)'
        },
        {
          name: 'image_url',
          label: 'Library Image URL',
          type: 'text',
          placeholder: 'e.g., https://example.com/library.jpg',
          required: false,
          size: 'full',
          description: 'Enter library image URL'
        }
      ],
      searchableFields: ['title'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['title', 'description', 'resources', 'services', 'faculty_incharge', 'image_url']
    },
    'non-teaching-faculty': {
      tableName: 'mech_non_teaching_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['name', 'designation'],
      sortableFields: ['name', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['name', 'designation', 'date_of_joining']
    }
  },

  // ================================================================================================
  // BSH DEPARTMENT (Basic Sciences & Humanities)
  // Table Prefix: bsh_*
  //
  // Modules (alphabetical order):
  // • fdps, photogallery, syllabus
  // ================================================================================================
  'bsh': {
    'department-overview': {
      tableName: 'bsh_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',
          placeholder: 'e.g., hod@example.com',
          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Science',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    },
    'syllabus': {
      tableName: 'bsh_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'Syllabus', value: 'syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
        },
        {
          name: 'title',
          label: 'Syllabus Title',
          type: 'text',

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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },
    'photogallery': {
      tableName: 'bsh_photogallery',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Photo/Event Title',
          type: 'text',
          placeholder: 'e.g., Annual Science Exhibition 2024',
          required: true,
          size: 'full',
          description: 'Enter the title of the photo or event'
        },
        {
          name: 'url',
          label: 'Photo/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload photo/image (JPG, PNG, GIF, WebP format)'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025 or 2024',
          required: false,
          size: 'full',
          description: 'Enter the year of the photo/event'
        }
      ],
      searchableFields: ['title', 'year'],
      sortableFields: ['title', 'year'],
      editableFields: ['title', 'url', 'year']
    },
    'fdps': {
      tableName: 'bsh_fdps',
      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'FDPs Organized', value: 'fdp_organized' },
            { label: 'Guest Lectures Organized', value: 'guest_lectures_organized' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
        },
        {
          name: 'title',
          label: 'FDP/Program Title',
          type: 'text',
          placeholder: 'e.g., Advanced Teaching Methodologies Workshop',
          required: true,
          size: 'full',
          description: 'Enter the title of the FDP, workshop, or guest lecture'
        },
        {
          name: 'url',
          label: 'Program Document/Link',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.txt',
          description: 'Upload program document or details (PDF, DOC, DOCX, TXT format)'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025 or 2024',
          required: false,
          size: 'full',
          description: 'Enter the year or academic year'
        }
      ],
      searchableFields: ['title', 'year'],
      sortableFields: ['title', 'year'],
      editableFields: ['title', 'url', 'year']
    },
    'faculty-innovations': {
      tableName: 'eee_faculty_innovations',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Innovation Title',
          type: 'text',
          placeholder: 'e.g., Smart Grid Technology Implementation',
          required: true,
          size: 'full',
          description: 'Enter the title of the teaching and learning innovation'
        },
        {
          name: 'innovation_type',
          label: 'Innovation Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of innovation',
          options: [
            { value: 'Teaching', label: 'Teaching' },
            { value: 'Learning', label: 'Learning' },
            { value: 'Research', label: 'Research' }
          ]
        },
        {
          name: 'faculty_name',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'half',
          description: 'Name of the faculty member implementing this innovation'
        },
        {
          name: 'description',
          label: 'Innovation Description',
          type: 'textarea',
          placeholder: 'Describe the innovation, methodology, and outcomes',
          required: true,
          size: 'full',
          rows: 5,
          description: 'Detailed description of the innovation and its implementation approach'
        },
        {
          name: 'impact_description',
          label: 'Impact Description',
          type: 'textarea',
          placeholder: 'Describe the benefits and learning outcomes',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Impact on student learning and engagement'
        },
        {
          name: 'implementation_date',
          label: 'Implementation Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Date when the innovation was first implemented'
        },
        {
          name: 'document_url',
          label: 'Document',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx',
          description: 'Upload supporting document (PDF, DOC, DOCX)'
        },
        {
          name: 'image_url',
          label: 'Image/Photo',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.jpg,.jpeg,.png',
          description: 'Upload image or photograph (JPG, PNG)'
        }
      ],
      searchableFields: ['title', 'faculty_name', 'innovation_type', 'description'],
      sortableFields: ['title', 'faculty_name', 'innovation_type', 'implementation_date', 'created_at'],
      editableFields: ['title', 'innovation_type', 'faculty_name', 'description', 'impact_description', 'implementation_date', 'document_url', 'image_url']
    }
  },

  // ================================================================================================
  // MBA DEPARTMENT (Business Administration)
  // Table Prefix: mba_*
  //
  // Modules (alphabetical order):
  // • (modules to be added)
  // ================================================================================================
  'mba': {
    'workshops': {
      tableName: 'mba_workshops',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the workshop category',
          options: [
            { value: 'SOC', label: 'SOC' },
            { value: 'Guest Lecturers/Seminars', label: 'Guest Lecturers/Seminars' },
            { value: 'Workshops', label: 'Workshops' },
            { value: 'EAC Activities', label: 'EAC Activities' }
          ]
        },
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-2024',
          required: false,
          size: 'half',
          description: 'Enter academic year'
        },
        {
          name: 'title',
          label: 'Workshop Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Fundamentals',
          required: true,
          size: 'full',
          description: 'Enter the title of the workshop'
        },
        {
          name: 'file_url',
          label: 'Workshop Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'faculty': {
      tableName: 'mba_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Business Administration, MBA',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Associate Professor, Assistant Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profile_url',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload faculty profile PDF document'
        }
      ],
      searchableFields: ['name', 'designation', 'qualification'],
      sortableFields: ['name', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['name', 'qualification', 'designation', 'date_of_joining', 'profile_url']
    },
    
    'non-teaching-staff': {
      tableName: 'mba_non_teaching_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Attender, Office Assistant, Lab Assistant',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        }
      ],
      searchableFields: ['name', 'designation'],
      sortableFields: ['name', 'designation', 'id'],
      editableFields: ['name', 'designation']
    },
    'board-of-studies': {
      tableName: 'mba_board_of_studies',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Board of Studies Title',
          type: 'text',
          placeholder: 'e.g., Board Meeting Minutes',
          required: true,
          size: 'full',
          description: 'Enter the title or topic'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: false,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'content',
          label: 'Content/Description',
          type: 'textarea',
          placeholder: 'Enter detailed content or description',
          required: false,
          size: 'full',
          description: 'Enter the board of studies content',
          rows: 5
        },
        {
          name: 'description',
          label: 'Summary',
          type: 'textarea',
          placeholder: 'Enter a brief summary',
          required: false,
          size: 'full',
          description: 'Enter a brief summary of the content',
          rows: 3
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'meeting_date', 'created_at'],
      editableFields: ['title', 'academic_year', 'meeting_date', 'content', 'description']
    },
    'technical-faculty': {
      tableName: 'mba_technical_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when technical faculty member joined'
        }

      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'technical-association': {
      tableName: 'mba_technical_association',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'description',
          label: 'description',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'document_url',
          label: 'document url',
          type: 'file',

          required: true,
          size: 'full',
          description: 'Enter job designation'
        },

      ],
      searchableFields: ['title', 'description'],
      sortableFields: ['title', 'description', 'document_url', 'created_at'],
      editableFields: ['title', 'desscription', 'document_url']
    },
    'non-teaching-faculty': {
      tableName: 'mba_non_teaching_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'academic-toppers': {
      tableName: 'mba_academictoppers',
      displayField: 'particulars',
      fields: [
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the batch year'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year in YYYY-YY format'
        },
        {
          name: 'particulars',
          label: 'Particulars/Details',
          type: 'text',
          placeholder: 'e.g., Academic Toppers',
          required: true,
          size: 'full',
          description: 'Enter details about the achievement'
        },
        {
          name: 'no_of_students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students who benefited'
        },
        {
          name: 'scholarship_amount',
          label: 'Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 99500',
          required: false,
          size: 'half',
          description: 'Total scholarship amount in rupees'
        },
        {
          name: 'file_url',
          label: 'Certificate/Document Upload',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['batch', 'particulars', 'academic_year'],
      sortableFields: ['batch', 'academic_year', 'no_of_students_benefited', 'created_at'],
      editableFields: ['batch', 'academic_year', 'particulars', 'no_of_students_benefited', 'scholarship_amount', 'file_url']
    },
    'faculty-development': {
      tableName: 'mbs_faculty_development_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },
          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'faculty-achievements': {
      tableName: 'mba_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' }
          ]
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year of achievement'
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'placements': {
      tableName: 'mba_placements',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter title',
          required: false,
          size: 'full',
          description: 'Enter the placement title or description'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/mba/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    'hackathons-gallery': {
      tableName: 'mba_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'academic toppers', label: 'Academic Toppers' },
            { value: 'technical association', label: 'Technical Association' },
            { value: 'extracurricular activities', label: 'Extracurricular Activities' },
            { value: 'laboratory', label: 'Laboratory' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'gallery']
    },
    'bos-members': {
      tableName: 'mba_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'mba_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },
    'hackathons': {
      tableName: 'mba_hackathons',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Hackathon Title',
          type: 'text',
          placeholder: 'e.g., Annual Hackathon 2024',
          required: true,
          size: 'full'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter hackathon details and objectives',
          required: false,
          size: 'full',
          rows: 4
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'approved', label: 'Approved' },
            { value: 'pending', label: 'Pending' },
            { value: 'draft', label: 'Draft' }
          ]
        },
        {
          name: 'brochure_url',
          label: 'Brochure',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.jpg,.jpeg,.png'
        },
        {
          name: 'winners_url',
          label: 'Winners Details',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'event_date', 'status', 'created_at'],
      editableFields: ['title', 'academic_year', 'event_date', 'description', 'status', 'brochure_url', 'winners_url']
    },
    'merit-scholarships': {
      tableName: 'mba_merit_scholarships',
      displayField: 'particulars',
      fields: [
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half'
        },
        {
          name: 'particulars',
          label: 'Details',
          type: 'text',
          placeholder: 'e.g., Merit Scholarship Details',
          required: false,
          size: 'full'
        },
        {
          name: 'students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 50',
          required: false,
          size: 'half'
        },
        {
          name: 'scholarship_amount',
          label: 'Total Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 500000',
          required: false,
          size: 'half'
        }
      ],
      searchableFields: ['particulars', 'academic_year'],
      sortableFields: ['academic_year', 'scholarship_amount', 'students_benefited'],
      editableFields: ['academic_year', 'particulars', 'students_benefited', 'scholarship_amount']
    },
    'mous': {
      tableName: 'mba_mous',
      displayField: 'mou_with',
      fields: [
        {
          name: 'mou_with',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full'
        },
        {
          name: 'from_date',
          label: 'MOU Start Date',
          type: 'text',
          placeholder: 'e.g., 2024-01-15 or 01-01-2024',
          required: true,
          size: 'half'
        },
        {
          name: 'to_date',
          label: 'MOU End Date',
          type: 'text',
          placeholder: 'e.g., 2026-01-14 or 31-12-2026',
          required: true,
          size: 'half'
        },
        {
          name: 'status',
          label: 'MOU Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'Till Date', label: 'Till Date' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Terminated', label: 'Terminated' },

          ]
        }
      ],
      searchableFields: ['mou_with', 'status'],
      sortableFields: ['mou_with', 'from_date', 'to_date', 'status', 'created_at'],
      editableFields: ['mou_with', 'from_date', 'to_date', 'status']
    },
    'syllabus': {
      tableName: 'mba_syllabus',
      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'Syllabus', value: 'syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],
      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },
    'student-achievements': {
      tableName: 'mba_student_achievements',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'Internships', label: 'Internships' },
            { value: 'Journals', label: 'Journals' },
            { value: 'Conference Publications', label: 'Conference Publications' },
            { value: 'NPTEL/Other Certifications', label: 'NPTEL/Other Certifications' },
            { value: 'Global Certifications', label: 'Global Certifications' },
            { value: 'Community Service Project', label: 'Community Service Project' },
            { value: 'Student Research Projects', label: 'Student Research Projects' },
            { value: 'Industrial Visit', label: 'Industrial Visit' },
            { value: 'Awards', label: 'Awards' },
            { value: 'GIF', label: 'GIF' }
          ]
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half',
          description: 'Academic year'
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'file_url',
          label: 'Certificate/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'extra-curricular': {
      tableName: 'mba_industrial_visits',
      displayField: 'companies_visited',
      fields: [
        {
          name: 'sno',
          label: 'Serial Number',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'third',
          description: 'Sequential number for display'
        },
        {
          name: 'date_of_visit',
          label: 'Date of Visit',
          type: 'date',
          required: true,
          size: 'third',
          description: 'Date when the industrial visit occurred'
        },
        {
          name: 'batch',
          label: 'Batch/Year',
          type: 'text',
          placeholder: 'e.g., 2022-24, 2021-23',
          required: true,
          size: 'third',
          description: 'Academic batch or year (YYYY-YY format)'
        },
        {
          name: 'companies_visited',
          label: 'Companies Visited',
          type: 'textarea',
          placeholder: 'e.g., ABC Industries, XYZ Corporation',
          required: true,
          size: 'full',
          rows: 3,
          description: 'Names of companies visited (one per line or comma-separated)'
        },
        {
          name: 'place_of_company',
          label: 'Location/Place',
          type: 'textarea',
          placeholder: 'e.g., Hyderabad, Bangalore',
          required: true,
          size: 'full',
          rows: 2,
          description: 'Geographic location or city of the companies'
        },
        {
          name: 'coordinating_faculty',
          label: 'Coordinating Faculty',
          type: 'textarea',
          placeholder: 'e.g., Dr. John Smith, Ms. Jane Doe',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Names of faculty members coordinating the visit (one per line or comma-separated)'
        },
        {
          name: 'total_students',
          label: 'Total Students Participated',
          type: 'number',
          placeholder: 'e.g., 45',
          required: false,
          size: 'third',
          description: 'Number of students who participated'
        },
        {
          name: 'visit_details',
          label: 'Visit Details',
          type: 'textarea',
          placeholder: 'Describe the purpose and highlights of the visit',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Additional details about the industrial visit'
        }
      ],
      searchableFields: ['companies_visited', 'batch', 'place_of_company'],
      sortableFields: ['date_of_visit', 'batch', 'sno', 'created_at'],
      editableFields: ['sno', 'date_of_visit', 'batch', 'companies_visited', 'place_of_company', 'coordinating_faculty', 'total_students', 'visit_details']
    },
    'activity-coordinators': {
      tableName: 'mba_activity_coordinators',
      displayField: 'name',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'name',
          label: 'Coordinator Name',
          type: 'text',
          placeholder: 'e.g., Mr. M Yesu Sekharam',
          required: true,
          size: 'full',
          description: 'Name of the coordinator'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Assistant Professor',
          required: false,
          size: 'half',
          description: 'Job designation'
        },
        {
          name: 'role',
          label: 'Role Type',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'faculty_coordinator', label: 'Faculty Coordinator' },
            { value: 'student_coordinator', label: 'Student Coordinator' },
            { value: 'co_coordinator', label: 'Co-Coordinator' }
          ],
          description: 'Coordinator role type'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., name@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in frontend'
        }
      ],
      searchableFields: ['name', 'designation', 'role'],
      sortableFields: ['name', 'role', 'order_seq', 'created_at'],
      editableFields: ['name', 'designation', 'role', 'email', 'phone', 'order_seq']
    },
    'activity-events': {
      tableName: 'mba_activity_events',
      displayField: 'event_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: true,
          size: 'half',
          description: 'Year the event was conducted'
        },
        {
          name: 'event_title',
          label: 'Event Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event 2023',
          required: true,
          size: 'full',
          description: 'Title or name of the event'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Date the event was conducted'
        },
        {
          name: 'description',
          label: 'Event Description',
          type: 'textarea',
          placeholder: 'Enter event details and outcomes',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of the event'
        },
        {
          name: 'file_url',
          label: 'Event Document/Report',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event report, certificate, or document'
        },
        {
          name: 'image_url',
          label: 'Event Photo',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload event photo/image'
        }
      ],
      searchableFields: ['event_title', 'academic_year'],
      sortableFields: ['event_title', 'event_date', 'academic_year', 'created_at'],
      editableFields: ['academic_year', 'event_title', 'event_date', 'description', 'file_url', 'image_url']
    },
    'activity-gallery': {
      tableName: 'mba_activity_gallery',
      displayField: 'image_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Year of the activity'
        },
        {
          name: 'image_url',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload image for gallery (JPG, PNG, GIF, or WebP)'
        },
        {
          name: 'image_title',
          label: 'Image Caption/Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event Group Photo',
          required: false,
          size: 'full',
          description: 'Caption or title for the image'
        },
        {
          name: 'description',
          label: 'Image Description',
          type: 'textarea',
          placeholder: 'Enter description of the image',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Detailed description of what the image shows'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in gallery'
        }
      ],
      searchableFields: ['image_title', 'academic_year'],
      sortableFields: ['image_title', 'academic_year', 'order_seq', 'created_at'],
      editableFields: ['academic_year', 'image_url', 'image_title', 'description', 'order_seq']
    },
    'department-overview': {
      tableName: 'mba_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',
          placeholder: 'e.g., hod@example.com',
          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Management',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    },
    'handbooks': {
      tableName: 'mba_handbooks',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Handbook Title',
          type: 'text',
          placeholder: 'e.g., Academic Handbook 2024-25',
          required: true,
          size: 'full',
          description: 'Enter the handbook title'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'semester',
          label: 'Semester',
          type: 'text',
          placeholder: 'e.g., I, II, III, IV',
          required: false,
          size: 'half',
          description: 'Enter semester (if applicable)'
        },
        {
          name: 'file_url',
          label: 'Handbook File (PDF)',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf',
          description: 'Upload the handbook PDF file (PDF format required)'
        }
      ],
      searchableFields: ['title', 'academic_year', 'semester'],
      sortableFields: ['title', 'academic_year', 'created_at'],
      editableFields: ['title', 'academic_year', 'semester', 'file_url']
    },
    'newsletters': {
      tableName: 'mba_newsletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },
        {
          name: 'file_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year'],
      editableFields: ['title', 'volume', 'issue', 'year', 'file_url']
    },
    'department-library': {
      tableName: 'mba_department_library',
      displayField: 'titles',
      fields: [
        {
          name: 'titles',
          label: 'Number of Titles',
          type: 'text',
          placeholder: 'e.g., 1500',
          required: true,
          size: 'half',
          description: 'Total number of unique titles in library'
        },
        {
          name: 'volumes',
          label: 'Number of Volumes',
          type: 'text',
          placeholder: 'e.g., 2000',
          required: true,
          size: 'half',
          description: 'Total number of volumes in library'
        },
        {
          name: 'faculty_incharge',
          label: 'Faculty In-charge',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Name of faculty member responsible for library'
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., library@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter library information and resources',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of library facilities and resources'
        },
        {
          name: 'image_url',
          label: 'Library Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload library image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['faculty_incharge', 'titles'],
      sortableFields: ['titles', 'volumes', 'created_at'],
      editableFields: ['titles', 'volumes', 'faculty_incharge', 'phone', 'email', 'description', 'image_url']
    },
    'industrial-visits': {
      tableName: 'mba_industrial_visits',
      displayField: 'companies_visited',
      fields: [

        {
          name: 'date_of_visit',
          label: 'Date of Visit',
          type: 'date',
          required: true,
          size: 'third',
          description: 'Date when the industrial visit occurred'
        },
        {
          name: 'batch',
          label: 'Batch/Year',
          type: 'text',
          placeholder: 'e.g., 2022-24, 2021-23',
          required: true,
          size: 'third',
          description: 'Academic batch or year (YYYY-YY format)'
        },
        {
          name: 'companies_visited',
          label: 'Companies Visited',
          type: 'textarea',
          placeholder: 'e.g., ABC Industries, XYZ Corporation',
          required: true,
          size: 'full',
          rows: 3,
          description: 'Names of companies visited (one per line or comma-separated)'
        },
        {
          name: 'place_of_company',
          label: 'Location/Place',
          type: 'textarea',
          placeholder: 'e.g., Hyderabad, Bangalore',
          required: true,
          size: 'full',
          rows: 2,
          description: 'Geographic location or city of the companies'
        },

      ],
      searchableFields: ['companies_visited', 'batch', 'place_of_company'],
      sortableFields: ['date_of_visit', 'batch', 'created_at'],
      editableFields: ['date_of_visit', 'batch', 'companies_visited', 'place_of_company']
    },
    'faculty-profiles': {
      tableName: 'mba_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Business Administration, MBA',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Associate Professor, Assistant Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profile_url',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload faculty profile PDF document'
        }
      ],
      searchableFields: ['name', 'designation', 'qualification'],
      sortableFields: ['name', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['name', 'qualification', 'designation', 'date_of_joining', 'profile_url']
    }
  },

  // ================================================================================================
  // AIML DEPARTMENT (AI & Machine Learning)
  // Table Prefix: aiml_*
  // Note: Contains all CSE-AI modules with aiml_* table prefixes
  //
  // Modules (alphabetical order):
  // • academic-toppers, bos-members, bos-minutes, department-overview, eresources
  // • extra-curricular, faculty, faculty-achievements, faculty-development, hackathons
  // • hackathons-gallery, merit-scholarships, mous, newsletters, non-teaching-faculty
  // • placements, student-achievements, syllabus, technical-association, technical-faculty, workshops
  // ================================================================================================
  'aiml': {
    'workshops': workshopsFieldConfig,
    'syllabus': {
      tableName: 'aiml_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'Syllabus', value: 'syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },
    'faculty': {
      tableName: 'aiml_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Computer Science',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profileUrl',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile photo or image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'qualification', 'designation', 'date_of_joining', 'profileUrl']
    },
    'technical-faculty': {
      tableName: 'aiml_technical_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when technical faculty member joined'
        }

      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'technical-association': {
      tableName: 'aiml_technical_association',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the category',
          options: [
            { value: 'EAPCET Rankers', label: 'EAPCET Rankers' },
            { value: 'Engineers Day', label: 'Engineers Day' },
          ]
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., EAPCET Rankers List 2024',
          required: true,
          size: 'full',
          description: 'Enter the title'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half',
          description: 'Enter the year'
        },
        {
          name: 'file_url',
          label: 'Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'non-teaching-faculty': {
      tableName: 'aiml_non_teaching_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'academic-toppers': {
      tableName: 'aiml_academictoppers',
      displayField: 'particulars',
      fields: [
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the batch year'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year in YYYY-YY format'
        },
        {
          name: 'particulars',
          label: 'Particulars/Details',
          type: 'text',
          placeholder: 'e.g., Academic Toppers',
          required: true,
          size: 'full',
          description: 'Enter details about the achievement'
        },
        {
          name: 'no_of_students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students who benefited'
        },
        {
          name: 'scholarship_amount',
          label: 'Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 99500',
          required: false,
          size: 'half',
          description: 'Total scholarship amount in rupees'
        },
        {
          name: 'file_url',
          label: 'Certificate/Document Upload',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['batch', 'particulars', 'academic_year'],
      sortableFields: ['batch', 'academic_year', 'no_of_students_benefited', 'created_at'],
      editableFields: ['batch', 'academic_year', 'particulars', 'no_of_students_benefited', 'scholarship_amount', 'file_url']
    },
    'faculty-achievements': {
      tableName: 'aiml_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' }
          ]
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'faculty-development': {
      tableName: 'aiml_faculty_development_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Attended', label: 'Attended' },
            { value: 'Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },
            { value: 'Gallery', label: 'Gallery' }
          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'physical-facilities': {
      tableName: 'aiml_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },

        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'placements': {
      tableName: 'aiml_placements',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter title',
          required: false,
          size: 'full',
          description: 'Enter the placement title or description'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/cseai/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    'hackathons-gallery': {
      tableName: 'aiml_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'academic toppers', label: 'Academic Toppers' },
            { value: 'technical association', label: 'Technical Association' },
            { value: 'extracurricular activities', label: 'Extracurricular Activities' },
            { value: 'laboratory', label: 'Laboratory' },
            { value: 'placements', label: 'Placements' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Title/Caption',
          type: 'text',
          placeholder: 'e.g., Company Visit or Event Name',
          required: false,
          size: 'half',
          description: 'Optional title or caption for the image'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year', 'title'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'title', 'gallery']
    },
    'bos-members': {
      tableName: 'cai_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'aiml_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },
    'eresources': {
      tableName: 'aiml_eresources',
      displayField: 'subject_name',
      fields: [
        {
          name: 'regulation',
          label: 'Regulation',
          type: 'text',
          placeholder: 'e.g., R18, R20',
          required: true,
          size: 'half'
        },
        {
          name: 'semester',
          label: 'Semester',
          type: 'text',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'subject_name',
          label: 'Subject Name',
          type: 'text',
          placeholder: 'e.g., Data Structures',
          required: true,
          size: 'full'
        },
        {
          name: 'file_type',
          label: 'File Type',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'PPT', label: 'PowerPoint (PPT)' },
            { value: 'PDF', label: 'PDF' },
            { value: 'DOCX', label: 'Document (DOCX)' },
            { value: 'XLS', label: 'Spreadsheet (XLS)' },
            { value: 'Video', label: 'Video' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half'
        },
        {
          name: 'file_url',
          label: 'Resource File',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.ppt,.pptx,.docx,.xls,.xlsx,.mp4,.mov'
        }
      ],
      searchableFields: ['subject_name', 'regulation', 'semester'],
      sortableFields: ['subject_name', 'regulation', 'semester', 'academic_year'],
      editableFields: ['regulation', 'semester', 'subject_name', 'file_type', 'academic_year', 'file_url']
    },
    'hackathons': {
      tableName: 'aiml_hackathons',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Hackathon Title',
          type: 'text',
          placeholder: 'e.g., Annual Hackathon 2024',
          required: true,
          size: 'full'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter hackathon details and objectives',
          required: false,
          size: 'full',
          rows: 4
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'approved', label: 'Approved' },
            { value: 'pending', label: 'Pending' },
            { value: 'draft', label: 'Draft' }
          ]
        },
        {
          name: 'brochure_url',
          label: 'Brochure',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.jpg,.jpeg,.png'
        },
        {
          name: 'winners_url',
          label: 'Winners Details',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'event_date', 'status', 'created_at'],
      editableFields: ['title', 'academic_year', 'event_date', 'description', 'status', 'brochure_url', 'winners_url']
    },
    'newsletters': {
      tableName: 'aiml_newsletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },
        {
          name: 'publish_date',
          label: 'Publish Date',
          type: 'date',
          required: true,
          size: 'half'
        },
        {
          name: 'pdf_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year', 'publish_date'],
      editableFields: ['title', 'volume', 'issue', 'year', 'publish_date', 'pdf_url']
    },
    'merit-scholarships': {
      tableName: 'aiml_merit_scholarships',
      displayField: 'particulars',
      fields: [
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half'
        },
        {
          name: 'particulars',
          label: 'Details',
          type: 'text',
          placeholder: 'e.g., Merit Scholarship Details',
          required: false,
          size: 'full'
        },
        {
          name: 'students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 50',
          required: false,
          size: 'half'
        },
        {
          name: 'scholarship_amount',
          label: 'Total Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 500000',
          required: false,
          size: 'half'
        }
      ],
      searchableFields: ['particulars', 'academic_year'],
      sortableFields: ['academic_year', 'scholarship_amount', 'students_benefited'],
      editableFields: ['academic_year', 'particulars', 'students_benefited', 'scholarship_amount']
    },
    'mous': {
      tableName: 'aiml_mous',
      displayField: 'mou_with',
      fields: [
        {
          name: 'mou_with',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full'
        },
        {
          name: 'from_date',
          label: 'MOU Start Date',
          type: 'text',
          placeholder: 'e.g., 2024-01-15 or 01-01-2024',
          required: true,
          size: 'half'
        },
        {
          name: 'to_date',
          label: 'MOU End Date',
          type: 'text',
          placeholder: 'e.g., 2026-01-14 or 31-12-2026',
          required: true,
          size: 'half'
        },
        {
          name: 'status',
          label: 'MOU Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'Till Date', label: 'Till Date' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Terminated', label: 'Terminated' },

          ]
        }
      ],
      searchableFields: ['mou_with', 'status'],
      sortableFields: ['mou_with', 'from_date', 'to_date', 'status', 'created_at'],
      editableFields: ['mou_with', 'from_date', 'to_date', 'status']
    },


    'student-achievements': {
      tableName: 'aiml_student_achievements',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'text',
          required: false,
          size: 'half'
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'file_url',
          label: 'Certificate/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'description', 'file_url']
    },
    'extra-curricular': {
      tableName: 'aiml_extracurricular_activities',

      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the workshop category',
          options: [
            { value: 'Extra Curricular', label: 'Extra Curricular' },
            { value: 'Maitri Coordinators', label: 'Maitri Coordinators' },
            { value: 'Maitri Events', label: 'Maitri Events' },

          ]
        },
        {
          name: 'title',
          label: 'Workshop Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Fundamentals',
          required: true,
          size: 'full',
          description: 'Enter the title of the workshop'
        },

        {
          name: 'file_url',
          label: 'Workshop Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category',],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'department-overview': {
      tableName: 'aiml_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',
          placeholder: 'e.g., hod@example.com',
          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in AI/ML',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    }
  },

  // ================================================================================================
  // CSE-DS DEPARTMENT (Computer Science & Data Science)  
  // Table Prefix: ds_*
  // Modules: student-achievements, faculty-achievements, faculty-development, placements, mous, 
  //          physical-facilities, bos-minutes, hackathons, hackathons-gallery, handbooks, 
  //          syllabus, workshops, technical-association, non-teaching-faculty, academic-toppers
  //
  // Modules (alphabetical order):
  // • academic-toppers, bos-minutes, faculty-achievements, faculty-development, hackathons
  // • hackathons-gallery, handbooks, mous, non-teaching-faculty, physical-facilities
  // • placements, student-achievements, syllabus, technical-association, workshops
  // ================================================================================================
  'cse-ds': {
    'workshops': workshopsFieldConfig,
    'faculty': {
      tableName: 'ds_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Computer Science',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profileUrl',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile photo or image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'qualification', 'designation', 'date_of_joining', 'profileUrl']
    },
    'technical-faculty': {
      tableName: 'ds_technical_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when technical faculty member joined'
        }

      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'technical-association': {
      tableName: 'ds_technical_association',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'description',
          label: 'description',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'document_url',
          label: 'document url',
          type: 'file',

          required: true,
          size: 'full',
          description: 'Enter job designation'
        },

      ],
      searchableFields: ['title', 'description'],
      sortableFields: ['title', 'description', 'document_url', 'created_at'],
      editableFields: ['title', 'desscription', 'document_url']
    },
    'non-teaching-faculty': {
      tableName: 'ds_non_teaching_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when staff member joined'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'designation', 'date_of_joining']
    },
    'academic-toppers': {
      tableName: 'ds_academictoppers',
      displayField: 'particulars',
      fields: [
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the batch year'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year in YYYY-YY format'
        },
        {
          name: 'particulars',
          label: 'Particulars/Details',
          type: 'text',
          placeholder: 'e.g., Academic Toppers',
          required: true,
          size: 'full',
          description: 'Enter details about the achievement'
        },
        {
          name: 'no_of_students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students who benefited'
        },
        {
          name: 'scholarship_amount',
          label: 'Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 99500',
          required: false,
          size: 'half',
          description: 'Total scholarship amount in rupees'
        },
        {
          name: 'file_url',
          label: 'Certificate/Document Upload',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['batch', 'particulars', 'academic_year'],
      sortableFields: ['batch', 'academic_year', 'no_of_students_benefited', 'created_at'],
      editableFields: ['batch', 'academic_year', 'particulars', 'no_of_students_benefited', 'scholarship_amount', 'file_url']
    },
    'faculty-achievements': {
      tableName: 'ds_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' }
          ]
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'faculty-development': {
      tableName: 'ds_faculty_development_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },
            { value: 'Gallery', label: 'Gallery' }
          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'physical-facilities': {
      tableName: 'ds_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'placements': {
      tableName: 'ds_placements',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter title',
          required: false,
          size: 'full',
          description: 'Enter the placement title or description'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/cseai/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    'hackathons-gallery': {
      tableName: 'ds_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'academic toppers', label: 'Academic Toppers' },
            { value: 'technical association', label: 'Technical Association' },
            { value: 'extracurricular activities', label: 'Extracurricular Activities' },
            { value: 'laboratories', label: 'Laboratories' },
            { value: 'placements', label: 'Placements' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Title/Caption',
          type: 'text',
          placeholder: 'e.g., Company Visit or Event Name',
          required: false,
          size: 'half',
          description: 'Optional title or caption for the image'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year', 'title'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'title', 'gallery']
    },
    'bos-members': {
      tableName: 'ds_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'ds_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },
    'eresources': {
      tableName: 'ds_eresources',
      displayField: 'subject_name',
      fields: [
        {
          name: 'regulation',
          label: 'Regulation',
          type: 'text',
          placeholder: 'e.g., R18, R20',
          required: true,
          size: 'half'
        },
        {
          name: 'semester',
          label: 'Semester',
          type: 'text',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'subject_name',
          label: 'Subject Name',
          type: 'text',
          placeholder: 'e.g., Data Structures',
          required: true,
          size: 'full'
        },
        {
          name: 'file_type',
          label: 'File Type',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'PPT', label: 'PowerPoint (PPT)' },
            { value: 'PDF', label: 'PDF' },
            { value: 'DOCX', label: 'Document (DOCX)' },
            { value: 'XLS', label: 'Spreadsheet (XLS)' },
            { value: 'Video', label: 'Video' },
            { value: 'Other', label: 'Other' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half'
        },
        {
          name: 'file_url',
          label: 'Resource File',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.ppt,.pptx,.docx,.xls,.xlsx,.mp4,.mov'
        }
      ],
      searchableFields: ['subject_name', 'regulation', 'semester'],
      sortableFields: ['subject_name', 'regulation', 'semester', 'academic_year'],
      editableFields: ['regulation', 'semester', 'subject_name', 'file_type', 'academic_year', 'file_url']
    },
    'hackathons': {
      tableName: 'ds_hackathons',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Hackathon Title',
          type: 'text',
          placeholder: 'e.g., Annual Hackathon 2024',
          required: true,
          size: 'full'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter hackathon details and objectives',
          required: false,
          size: 'full',
          rows: 4
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'approved', label: 'Approved' },
            { value: 'pending', label: 'Pending' },
            { value: 'draft', label: 'Draft' }
          ]
        },
        {
          name: 'brochure_url',
          label: 'Brochure',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.jpg,.jpeg,.png'
        },
        {
          name: 'winners_url',
          label: 'Winners Details',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'event_date', 'status', 'created_at'],
      editableFields: ['title', 'academic_year', 'event_date', 'description', 'status', 'brochure_url', 'winners_url']
    },
    'newsletters': {
      tableName: 'ds_newsletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },
        {
          name: 'publish_date',
          label: 'Publish Date',
          type: 'date',
          required: true,
          size: 'half'
        },
        {
          name: 'pdf_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year', 'publish_date'],
      editableFields: ['title', 'volume', 'issue', 'year', 'publish_date', 'pdf_url']
    },
    'merit-scholarships': {
      tableName: 'ds_merit_scholarships',
      displayField: 'particulars',
      fields: [
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half'
        },
        {
          name: 'particulars',
          label: 'Details',
          type: 'text',
          placeholder: 'e.g., Merit Scholarship Details',
          required: false,
          size: 'full'
        },
        {
          name: 'students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 50',
          required: false,
          size: 'half'
        },
        {
          name: 'scholarship_amount',
          label: 'Total Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 500000',
          required: false,
          size: 'half'
        }
      ],
      searchableFields: ['particulars', 'academic_year'],
      sortableFields: ['academic_year', 'scholarship_amount', 'students_benefited'],
      editableFields: ['academic_year', 'particulars', 'students_benefited', 'scholarship_amount']
    },
    'mous': {
      tableName: 'ds_mous',
      displayField: 'mou_with',
      fields: [
        {
          name: 'mou_with',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full'
        },
        {
          name: 'from_date',
          label: 'MOU Start Date',
          type: 'text',
          placeholder: 'e.g., 2024-01-15 or 01-01-2024',
          required: true,
          size: 'half'
        },
        {
          name: 'to_date',
          label: 'MOU End Date',
          type: 'text',
          placeholder: 'e.g., 2026-01-14 or 31-12-2026',
          required: true,
          size: 'half'
        },
        {
          name: 'status',
          label: 'MOU Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'Till Date', label: 'Till Date' },
            { value: 'Expired', label: 'Expired' },
            { value: 'Terminated', label: 'Terminated' },

          ]
        }
      ],
      searchableFields: ['mou_with', 'status'],
      sortableFields: ['mou_with', 'from_date', 'to_date', 'status', 'created_at'],
      editableFields: ['mou_with', 'from_date', 'to_date', 'status']
    },
    'syllabus': {
      tableName: 'ds_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'Syllabus', value: 'syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },

    'student-achievements': {
      tableName: 'ds_student_achievements',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'text',
          required: false,
          size: 'half'
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'file_url',
          label: 'Certificate/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'description', 'file_url']
    },
    'extra-curricular': {
      tableName: 'ds_extracurricular_activities',
      displayField: 'activity_name',
      fields: [
        {
          name: 'activity_name',
          label: 'Activity Name',
          type: 'text',
          placeholder: 'e.g., Maitri Association, Tech Club',
          required: true,
          size: 'full',
          description: 'Name of the extra-curricular activity/association'
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Type of activity',
          options: [
            { value: 'social_service', label: 'Social Service' },
            { value: 'cultural', label: 'Cultural' },
            { value: 'sports', label: 'Sports' },
            { value: 'technical', label: 'Technical' },
            { value: 'professional', label: 'Professional Society' },
            { value: 'community', label: 'Community Service' }
          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Academic year of the activity'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter detailed description of the activity',
          required: true,
          size: 'full',
          rows: 6,
          description: 'Detailed information about the activity'
        },
        {
          name: 'faculty_coordinator_name',
          label: 'Faculty Coordinator Name',
          type: 'text',
          placeholder: 'e.g., Mr. M Yesu Sekharam',
          required: false,
          size: 'full',
          description: 'Name of the primary faculty coordinator'
        },
        {
          name: 'faculty_coordinator_designation',
          label: 'Coordinator Designation',
          type: 'text',
          placeholder: 'e.g., Assistant Professor',
          required: false,
          size: 'half',
          description: 'Designation of the coordinator'
        },
        {
          name: 'image_url',
          label: 'Activity Cover Image',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Cover image for the activity'
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'archived', label: 'Archived' }
          ],
          description: 'Activity status'
        }
      ],
      searchableFields: ['activity_name', 'category', 'faculty_coordinator_name'],
      sortableFields: ['activity_name', 'category', 'academic_year', 'created_at'],
      editableFields: [
        'activity_name',
        'category',
        'academic_year',
        'description',
        'faculty_coordinator_name',
        'faculty_coordinator_designation',
        'image_url',
        'status'
      ]
    },
    'activity-coordinators': {
      tableName: 'ds_activity_coordinators',
      displayField: 'name',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'name',
          label: 'Coordinator Name',
          type: 'text',
          placeholder: 'e.g., Mr. M Yesu Sekharam',
          required: true,
          size: 'full',
          description: 'Name of the coordinator'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Assistant Professor',
          required: false,
          size: 'half',
          description: 'Job designation'
        },
        {
          name: 'role',
          label: 'Role Type',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'faculty_coordinator', label: 'Faculty Coordinator' },
            { value: 'student_coordinator', label: 'Student Coordinator' },
            { value: 'co_coordinator', label: 'Co-Coordinator' }
          ],
          description: 'Coordinator role type'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., name@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in frontend'
        }
      ],
      searchableFields: ['name', 'designation', 'role'],
      sortableFields: ['name', 'role', 'order_seq', 'created_at'],
      editableFields: ['name', 'designation', 'role', 'email', 'phone', 'order_seq']
    },
    'activity-events': {
      tableName: 'ds_activity_events',
      displayField: 'event_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: true,
          size: 'half',
          description: 'Year the event was conducted'
        },
        {
          name: 'event_title',
          label: 'Event Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event 2023',
          required: true,
          size: 'full',
          description: 'Title or name of the event'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Date the event was conducted'
        },
        {
          name: 'description',
          label: 'Event Description',
          type: 'textarea',
          placeholder: 'Enter event details and outcomes',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of the event'
        },
        {
          name: 'file_url',
          label: 'Event Document/Report',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event report, certificate, or document'
        },
        {
          name: 'image_url',
          label: 'Event Photo',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload event photo/image'
        }
      ],
      searchableFields: ['event_title', 'academic_year'],
      sortableFields: ['event_title', 'event_date', 'academic_year', 'created_at'],
      editableFields: ['academic_year', 'event_title', 'event_date', 'description', 'file_url', 'image_url']
    },
    'activity-gallery': {
      tableName: 'ds_activity_gallery',
      displayField: 'image_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Year of the activity'
        },
        {
          name: 'image_url',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload image for gallery (JPG, PNG, GIF, or WebP)'
        },
        {
          name: 'image_title',
          label: 'Image Caption/Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event Group Photo',
          required: false,
          size: 'full',
          description: 'Caption or title for the image'
        },
        {
          name: 'description',
          label: 'Image Description',
          type: 'textarea',
          placeholder: 'Enter description of the image',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Detailed description of what the image shows'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in gallery'
        }
      ],
      searchableFields: ['image_title', 'academic_year'],
      sortableFields: ['image_title', 'academic_year', 'order_seq', 'created_at'],
      editableFields: ['academic_year', 'image_url', 'image_title', 'description', 'order_seq']
    },
    'department-overview': {
      tableName: 'ds_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',
          placeholder: 'e.g., hod@example.com',
          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Data Science',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    }
  },
  // ================================================================================================
  'cse': {
    'eapcet-toppers': {
      tableName: 'cse_eapcet_toppers',
      displayField: 'name_of_student',
      fields: [
        {
          name: 'year',
          label: 'Year',
          type: 'number',
          placeholder: 'e.g., 2025',
          required: true,
          size: 'half',
          description: 'Enter the year of EAPCET exam'
        },
        {
          name: 'particulars',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'EAPCET Toppers', label: 'EAPCET Toppers' }
          ],
          description: 'Select the category (EAPCET Toppers)'
        },
        {
          name: 'name_of_student',
          label: 'Name of Student',
          type: 'text',
          placeholder: 'e.g., Y. Lohitha',
          required: true,
          size: 'full',
          description: 'Enter the full name of the EAPCET topper',
          validation: {
            min: 3,
            max: 255,
            pattern: '^[a-zA-Z\\s.\\-]+$',
            message: 'Name should contain only alphabetic characters, spaces, dots, and hyphens'
          }
        },
        {
          name: 'student_rank',
          label: 'EAPCET Rank',
          type: 'number',
          placeholder: 'e.g., 24402',
          required: true,
          size: 'half',
          description: 'Enter the EAPCET rank obtained by the student'
        }
      ],
      searchableFields: ['name_of_student', 'year', 'student_rank'],
      sortableFields: ['year', 'student_rank', 'name_of_student', 'created_at'],
      editableFields: ['year', 'particulars', 'name_of_student', 'student_rank']
    },
    'physical-facilities': {
      tableName: 'cse_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },

        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'hackathons-gallery': {
      tableName: 'cse_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'eapcet', label: 'EAPCET Toppers' },
            { value: 'toppers', label: 'Academic Toppers' },
            { value: 'technical', label: 'Technical Association' },
            { value: 'activities', label: 'Extracurricular Activities' },
            { value: 'labs', label: 'Laboratories' },
            { value: 'placements', label: 'Placements' },
            { value: 'training', label: 'Training Activities' },
            { value: 'gate', label: 'GATE' },
            { value: 'honour', label: 'Roll of Honour' },
            { value: 'workshops', label: 'Workshops' },
            { value: 'lectures', label: 'Guest Lecturers' },
            { value: 'faculty', label: 'Faculty Development Programs' },



          ]
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'gallery']
    },
    'faculty': {
      tableName: 'cse_faculty',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },
        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Computer Science',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profileUrl',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile PDF (PDF only)'
        }
      ],
      searchableFields: ['name', 'designation'],
      sortableFields: ['name', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['name', 'qualification', 'designation', 'date_of_joining', 'profileUrl']
    },
    'faculty-development': {
      tableName: 'cse_faculty_development_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },
          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'workshops': {
      tableName: 'cse_workshops',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the workshop category',
          options: [

            { value: 'Guest Lecturers/Seminars', label: 'Guest Lecturers/Seminars' },
            { value: 'Workshops/SOC', label: 'Workshops/SOC' }
          ]
        },
        {
          name: 'title',
          label: 'Workshop Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Fundamentals',
          required: true,
          size: 'full',
          description: 'Enter the title of the workshop'
        },

        {
          name: 'file_url',
          label: 'Workshop Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category',],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'faculty-achievements': {
      tableName: 'cse_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Awards', label: 'Awards' },
            { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' }
          ]
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'syllabus': {

      tableName: 'cse_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'B.Tech Syllabus', value: 'B.Tech Syllabus' },
            { label: 'M.Tech Syllabus', value: 'M.Tech Syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },
    'academic-toppers': {

      tableName: 'cse_academic_toppers',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'Merit Scholarships', value: 'Merit Scholarships' },
            { label: 'Academic Toppers', value: 'Academic Toppers' },

          ],
          description: 'Select whether this document is Merit Scholarships or Academic Toppers'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },
    'department-overview': {
      tableName: 'cse_department_overview',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., Department Overview',
          required: true,
          size: 'full',
          description: 'Enter the title for this overview section',
          validation: {
            max: 1000,
            message: 'Title must not exceed 1000 characters'
          }
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter detailed description...',
          required: true,
          size: 'full',
          rows: 6,
          description: 'Provide a comprehensive description for this section',
          validation: {
            max: 5000,
            message: 'Description must not exceed 5000 characters'
          }
        },
        {
          name: 'file_url',
          label: 'Related Document/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload related document, image, or brochure (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'description'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['title', 'description', 'file_url']
    },
    'sahaya-events': {
      tableName: 'cse_sahaya_events',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., Sahaya Events',
          required: true,
          size: 'full',
          description: 'Enter the title for the Sahaya event section',
          validation: {
            max: 1000,
            message: 'Title must not exceed 1000 characters'
          }
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Enter the year of the event'
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the category for this event',
          options: [
            { value: 'ecactivities', label: 'EC Activities' },
            { value: 'sahaya', label: 'Sahaya' }
          ]
        },
        {
          name: 'file_url',
          label: 'Event Document/PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event document, certificate, or related file (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'year', 'category'],
      sortableFields: ['title', 'year', 'category', 'created_at'],
      editableFields: ['title', 'year', 'category', 'file_url']
    }
  },

  // ================================================================================================
  // ECT DEPARTMENT (Electronics & Communication Technology)
  // Table Prefix: ect_*
  // ================================================================================================
  'ect': {


    'faculty': {
      tableName: 'ect_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Faculty Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full',
          description: 'Enter faculty member full name'
        },

        {
          name: 'qualification',
          label: 'Qualification',
          type: 'text',
          placeholder: 'e.g., Ph.D. in Computer Science',
          required: false,
          size: 'full',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },
        {
          name: 'date_of_joining',
          label: 'Date of Joining',
          type: 'date',
          required: false,
          size: 'full',
          description: 'Select the date when faculty member joined'
        },
        {
          name: 'profileUrl',
          label: 'Profile PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload profile photo or image (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'date_of_joining', 'created_at'],
      editableFields: ['title', 'qualification', 'designation', 'date_of_joining', 'profileUrl']
    },
    'workshops': {
      tableName: 'ect_workshops',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the workshop category',
          options: [

            { value: 'Guest Lecturers/Seminars', label: 'Guest Lecturers/Seminars' },
            { value: 'Workshops/SOC', label: 'Workshops/SOC' }
          ]
        },
        {
          name: 'title',
          label: 'Workshop Title',
          type: 'text',
          placeholder: 'e.g., Machine Learning Fundamentals',
          required: true,
          size: 'full',
          description: 'Enter the title of the workshop'
        },

        {
          name: 'file_url',
          label: 'Workshop Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload workshop document, brochure, or image (PDF, DOC, or Image files)'
        }
      ],
      searchableFields: ['title', 'category',],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'technical-faculty': {
      tableName: 'ect_technical_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Technical Faculty Name',
          type: 'text',
          placeholder: 'e.g., Mr. John Doe',
          required: true,
          size: 'full',
          description: 'Enter technical faculty member full name'
        },

        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Lab Technician, Technical Officer',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        },

      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'created_at'],
      editableFields: ['title', 'designation']
    },
    'technical-association': {
      tableName: 'ect_technical_association',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter activity title',
          required: true,
          size: 'full',
          description: 'Enter the title of the technical association activity'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter brief description',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Enter a brief description'
        },
        {
          name: 'content',
          label: 'Content',
          type: 'textarea',
          placeholder: 'Enter detailed content',
          required: false,
          size: 'full',
          rows: 5,
          description: 'Enter detailed content about the activity'
        },
        {
          name: 'image_url',
          label: 'Image',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload an image (JPG, PNG, GIF, WebP)'
        },
        {
          name: 'file_url',
          label: 'Document/PDF',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx',
          description: 'Upload a document (PDF, DOC, DOCX)'
        },
        {
          name: 'link',
          label: 'External Link',
          type: 'text',
          placeholder: 'https://example.com',
          required: false,
          size: 'full',
          description: 'Enter an external link URL'
        },
        {
          name: 'date_created',
          label: 'Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Select the date of the activity'
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: false,
          size: 'half',
          description: 'Select the status',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'archived', label: 'Archived' }
          ]
        }
      ],
      searchableFields: ['title', 'description'],
      sortableFields: ['title', 'date_created', 'created_at'],
      editableFields: ['title', 'description', 'content', 'image_url', 'file_url', 'link', 'date_created', 'status']
    },
    'non-teaching-faculty': {
      tableName: 'ect_non_teaching_faculty',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Staff Name',
          type: 'text',
          placeholder: 'e.g., Mr. Rajesh Kumar',
          required: true,
          size: 'full',
          description: 'Enter non-teaching staff member full name'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Office Assistant, Administrative Staff',
          required: true,
          size: 'full',
          description: 'Enter job designation'
        }
      ],
      searchableFields: ['title', 'designation'],
      sortableFields: ['title', 'designation', 'created_at'],
      editableFields: ['title', 'designation']
    },
    'academic-toppers': {
      tableName: 'ect_scholarships_toppers',
      displayField: 'title',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the record type',
          options: [
            { value: 'merit_scholarship', label: 'Merit Scholarship' },
            { value: 'cash_award', label: 'Cash Award' }
          ]
        },
        {
          name: 'year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter title',
          required: false,
          size: 'full',
          description: 'Title (for merit scholarships)'
        },
        {
          name: 'based_on',
          label: 'Based On',
          type: 'text',
          placeholder: 'e.g., EAMCET Rank',
          required: false,
          size: 'half',
          description: 'Based on criteria (for cash awards)'
        },
        {
          name: 'students',
          label: 'Number of Students',
          type: 'number',
          placeholder: 'e.g., 17',
          required: false,
          size: 'half',
          description: 'Number of students benefited'
        },
        {
          name: 'amount',
          label: 'Amount',
          type: 'text',
          placeholder: 'e.g., ₹99,500',
          required: false,
          size: 'half',
          description: 'Scholarship/award amount'
        },
        {
          name: 'url',
          label: 'Document URL',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload certificate, document, or image (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'year', 'type'],
      sortableFields: ['year', 'type', 'students', 'created_at'],
      editableFields: ['type', 'year', 'title', 'based_on', 'students', 'amount', 'url']
    },
    'faculty-achievements': {
      tableName: 'ect_faculty_achievements',
      displayField: 'title',

      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the type of achievement',
          options: [
            { value: 'Journal Publications', label: 'Journal Publications' },
            { value: 'Conferences', label: 'Conferences' },
            { value: 'Book Publications', label: 'Book Publications' },
            { value: 'Certifications', label: 'Certifications' },
            { value: 'Patents', label: 'Patents' },
            { value: 'Research Supervisors', label: 'Research Supervisors' },
            { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' },
            { value: 'Awards', label: 'Awards' },
              { value: 'Faculty Promotions/Incentives', label: 'Faculty Promotions/Incentives' }
          ]
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
          required: true,
          size: 'full',
          description: 'Enter the title of the achievement, publication, or certification'
        },
        {
          name: 'file_url',
          label: 'Supporting Document',
          type: 'file',
          placeholder: 'Upload certificate, publication, or related document',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'type', 'created_at'],
      editableFields: ['title', 'type', 'file_url']
    },
    'faculty-development': {
      tableName: 'ect_faculty_development',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'FDP Attended', label: 'Attended' },
            { value: 'FDP Conducted', label: 'Conducted' },
            { value: 'Workshops/Training', label: 'Workshops/Training' },

          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024 or 2024-25',
          required: false,
          size: 'half',
          description: 'Enter the year or academic year'
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'placements': {
      tableName: 'ect_placements',
      displayField: 'batch',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'Enter batch',
          required: true,
          size: 'full',
          description: 'Enter the batch year for this placement'
        },
        {
          name: 'file_url',
          label: 'File Url',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx',
          description: 'File Upload Guidelines\n• Maximum size: 1MB - Files larger than 1MB will be rejected\n• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX\n• Files will be stored in: /uploads/cseai/placements/'
        }
      ],
      searchableFields: ['title', 'batch'],
      sortableFields: ['title', 'batch', 'created_at'],
      editableFields: ['title', 'batch', 'file_url']
    },
    
    'hackathons-gallery': {
      tableName: 'ect_hackathons_gallery',
      displayField: 'category',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'full',
          description: 'Select the gallery category',
          options: [
            { value: 'hackathon', label: 'Hackathon' },
            { value: 'classrooms', label: 'Classrooms' },
            { value: 'laboratories', label: 'Classrooms' },
            { value: 'toppers', label: 'Academic Toppers' },
            { value: 'technical', label: 'Technical Association' },
            { value: 'activities', label: 'Extracurricular Activities' },
            { value: 'labs', label: 'Laboratories' },
            { value: 'placements', label: 'Placements' },
            { value: 'training', label: 'Training Activities' },
            { value: 'gate', label: 'GATE' },
            { value: 'honour', label: 'Roll of Honour' },
            { value: 'workshops', label: 'Workshops' },
            { value: 'lectures', label: 'Guest Lecturers' },
            { value: 'faculty', label: 'Faculty Development Programs' },


          ]
        },
         {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-2025',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'gallery',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'half',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload a single image for the gallery (JPG, PNG, GIF, or WebP)'
        }
      ],
      searchableFields: ['category', 'academic_year'],
      sortableFields: ['category', 'academic_year', 'created_at'],
      editableFields: ['category', 'academic_year', 'gallery']
    },
    
    'bos-members': {
      tableName: 'ect_bos_members',
      displayField: 'name',
      fields: [
        {
          name: 'name',
          label: 'Member Name',
          type: 'text',
          placeholder: 'e.g., Dr. John Smith',
          required: true,
          size: 'full'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Professor, Industry Expert',
          required: false,
          size: 'half'
        },
        {
          name: 'organization',
          label: 'Organization',
          type: 'text',
          placeholder: 'e.g., XYZ University, ABC Corporation',
          required: false,
          size: 'half'
        },
        {
          name: 'position_in_job',
          label: 'Position',
          type: 'text',
          placeholder: 'e.g., Head of Department, Director',
          required: false,
          size: 'full'
        }
      ],
      searchableFields: ['name', 'designation', 'organization'],
      sortableFields: ['name', 'designation', 'organization', 'created_at'],
      editableFields: ['name', 'designation', 'organization', 'position_in_job']
    },
    'bos-minutes': {
      tableName: 'ect_bos_minutes',
      displayField: 'meeting_no',
      fields: [
        {
          name: 'meeting_no',
          label: 'Meeting Number',
          type: 'text',
          placeholder: 'e.g., 1st, 2nd, 3rd',
          required: true,
          size: 'half',
          description: 'Enter the meeting number'
        },
        {
          name: 'meeting_date',
          label: 'Meeting Date',
          type: 'date',
          required: true,
          size: 'half',
          description: 'Select the meeting date'
        },
        {
          name: 'file_url',
          label: 'Meeting Minutes File',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload meeting minutes document (PDF, DOC, or DOCX format)'
        }
      ],
      searchableFields: ['meeting_no', 'meeting_date'],
      sortableFields: ['meeting_date', 'meeting_no', 'created_at'],
      editableFields: ['meeting_no', 'meeting_date', 'file_url']
    },

    'eresources': {
      tableName: 'ect_eresources',
      displayField: 'subject_name',
      fields: [
        {
          name: 'regulation',
          label: 'Regulation',
          type: 'text',
          placeholder: 'e.g., R18, R20',
          required: true,
          size: 'half'
        },
        {
          name: 'semester',
          label: 'Semester',
          type: 'text',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'subject_name',
          label: 'Subject Name',
          type: 'text',
          placeholder: 'e.g., Data Structures',
          required: true,
          size: 'full'
        },
        {
          name: 'display_order',
          label: 'Display Order',
          type: 'number',
          placeholder: 'Enter display order',
          required: false,
          size: 'half'
        },
        {
          name: 'file_url',
          label: 'Resource File',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.ppt,.pptx,.docx,.xls,.xlsx,.mp4,.mov'
        }
      ],
      searchableFields: ['subject_name', 'regulation', 'semester'],
      sortableFields: ['subject_name', 'regulation', 'semester', 'display_order'],
      editableFields: ['regulation', 'semester', 'subject_name', 'display_order', 'file_url']
    },
    'hackathons': {
      tableName: 'ect_hackathons',
      displayField: 'title',
      fields: [

        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half'
        },



        {
          name: 'brochure_url',
          label: 'Brochure',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.jpg,.jpeg,.png'
        },
        {
          name: 'winners_url',
          label: 'Winners Details',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'created_at'],
      editableFields: ['title', 'academic_year', 'brochure_url', 'winners_url']
    },
    'newsletters': {
      tableName: 'ect_newsletters',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          placeholder: 'e.g., Monthly Newsletter',
          required: true,
          size: 'full'
        },
        {
          name: 'volume',
          label: 'Volume',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half'
        },
        {
          name: 'issue',
          label: 'Issue',
          type: 'number',
          placeholder: 'e.g., 1, 2, 3',
          required: true,
          size: 'half'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half'
        },

        {
          name: 'file_url',
          label: 'Newsletter PDF',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf'
        }
      ],
      searchableFields: ['title', 'year', 'volume'],
      sortableFields: ['title', 'volume', 'issue', 'year'],
      editableFields: ['title', 'volume', 'issue', 'year', 'file_url']
    },
    'merit-scholarships': {
      tableName: 'ect_merit_scholarships',
      displayField: 'particulars',
      fields: [
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half'
        },
        {
          name: 'particulars',
          label: 'Details',
          type: 'text',
          placeholder: 'e.g., Merit Scholarship Details',
          required: false,
          size: 'full'
        },
        {
          name: 'students_benefited',
          label: 'Number of Students Benefited',
          type: 'number',
          placeholder: 'e.g., 50',
          required: false,
          size: 'half'
        },
        {
          name: 'scholarship_amount',
          label: 'Total Scholarship Amount (₹)',
          type: 'number',
          placeholder: 'e.g., 500000',
          required: false,
          size: 'half'
        }
      ],
      searchableFields: ['particulars', 'academic_year'],
      sortableFields: ['academic_year', 'scholarship_amount', 'students_benefited'],
      editableFields: ['academic_year', 'particulars', 'students_benefited', 'scholarship_amount']
    },
    'mous': {
      tableName: 'ect_mous',
      displayField: 'organization_name',
      fields: [
        {
          name: 'organization_name',
          label: 'Organization/Institute',
          type: 'text',
          placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
          required: true,
          size: 'full'
        },
        {
          name: 'from_date',
          label: 'MOU Start Date',
          type: 'text',
          placeholder: 'e.g., 2024-01-15 or 01-01-2024',
          required: true,
          size: 'half'
        },
        {
          name: 'to_date',
          label: 'MOU End Date',
          type: 'text',
          placeholder: 'e.g., 2026-01-14 or 31-12-2026',
          required: true,
          size: 'half'
        },
        {
          name: 'document_url',
          label: 'MOU Document',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload the MOU document or agreement (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['organization_name'],
      sortableFields: ['organization_name', 'from_date', 'to_date', 'created_at'],
      editableFields: ['organization_name', 'from_date', 'to_date', 'document_url']
    },
    'industry-programs': {
      tableName: 'ect_industry_programs',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Industry Interaction Session, Corporate Training',
          required: true,
          size: 'full',
          description: 'Enter the title of the industry program or interaction'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },

        {
          name: 'file_url',
          label: 'Program Document/Brochure',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program details, brochure, or related document (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year'],
      editableFields: ['title', 'academic_year', 'file_url']
    },
    'syllabus': {
      tableName: 'ect_syllabus',
      displayField: 'title',

      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',              // dropdown
          required: true,
          size: 'full',
          options: [
            { label: 'SOC', value: 'soc' },
            { label: 'Syllabus', value: 'syllabus' }
          ],
          description: 'Select whether this document is SOC or Syllabus'
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
          name: 'fileUrl',
          label: 'Syllabus PDF Document',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
        }
      ],

      searchableFields: ['title', 'type'],
      sortableFields: ['title', 'created_at'],
      editableFields: ['type', 'title', 'fileUrl']
    },

    'student-achievements': {
      tableName: 'ect_student_achievements',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: false,
          size: 'half',
          options: [
            { value: 'Publications', label: 'Publications' },
            { value: 'Awards', label: 'Awards' },
            { value: 'Workshops/Internships', label: 'Workshops/Internships' },
            { value: 'Roll of Honour', label: 'Roll of Honour' },
            { value: 'GATE/GRE', label: 'GATE/GRE' },
            { value: 'NPTEL/Other Certifications', label: 'NPTEL/Other Certifications' },
            { value: 'Community Service Project', label: 'Community Service Project' },
            { value: 'Student Research Projects', label: 'Student Research Projects' }
          ]
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: false,
          size: 'half',
          description: 'Academic year'
        },
        {
          name: 'title',
          label: 'Achievement Title',
          type: 'text',
          required: true,
          size: 'full'
        },
        {
          name: 'file_url',
          label: 'Certificate/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.jpg,.jpeg,.png'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['title', 'category', 'year', 'file_url']
    },
    'extra-curricular': {
      tableName: 'ect_extracurricular_activities',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Type of activity',
          options: [
            { value: 'Extracurricular Activities', label: 'Extracurricular Activities' },
            { value: 'Departmental Sports Meet', label: 'Departmental Sports Meet' },
            { value: 'Departmental Cultural Meet', label: 'Departmental Cultural Meet' },
            { value: 'Industrial Visit', label: 'Industrial Visit' },
            { value: 'Blood Donation Camp', label: 'Blood Donation Camp' },
            { value: 'YUVA', label: 'YUVA' }
          ]
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., 2022-23 Activities',
          required: true,
          size: 'full'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter detailed description',
          required: true,
          size: 'full',
          rows: 4
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2022-23',
          required: false,
          size: 'half'
        },
        {
          name: 'url',
          label: 'Document/Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.pdf,.doc,.docx'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['category', 'title', 'description', 'year', 'url']
    },
    'activity-coordinators': {
      tableName: 'ect_activity_coordinators',
      displayField: 'name',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'name',
          label: 'Coordinator Name',
          type: 'text',
          placeholder: 'e.g., Mr. M Yesu Sekharam',
          required: true,
          size: 'full',
          description: 'Name of the coordinator'
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'text',
          placeholder: 'e.g., Assistant Professor',
          required: false,
          size: 'half',
          description: 'Job designation'
        },
        {
          name: 'role',
          label: 'Role Type',
          type: 'select',
          required: true,
          size: 'half',
          options: [
            { value: 'faculty_coordinator', label: 'Faculty Coordinator' },
            { value: 'student_coordinator', label: 'Student Coordinator' },
            { value: 'co_coordinator', label: 'Co-Coordinator' }
          ],
          description: 'Coordinator role type'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., name@example.com',
          required: false,
          size: 'half',
          description: 'Contact email address'
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          placeholder: 'e.g., +91 9876543210',
          required: false,
          size: 'half',
          description: 'Contact phone number'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in frontend'
        }
      ],
      searchableFields: ['name', 'designation', 'role'],
      sortableFields: ['name', 'role', 'order_seq', 'created_at'],
      editableFields: ['name', 'designation', 'role', 'email', 'phone', 'order_seq']
    },
    'activity-events': {
      tableName: 'ect_activity_events',
      displayField: 'event_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: true,
          size: 'half',
          description: 'Year the event was conducted'
        },
        {
          name: 'event_title',
          label: 'Event Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event 2023',
          required: true,
          size: 'full',
          description: 'Title or name of the event'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Date the event was conducted'
        },
        {
          name: 'description',
          label: 'Event Description',
          type: 'textarea',
          placeholder: 'Enter event details and outcomes',
          required: false,
          size: 'full',
          rows: 4,
          description: 'Detailed description of the event'
        },
        {
          name: 'file_url',
          label: 'Event Document/Report',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event report, certificate, or document'
        },
        {
          name: 'image_url',
          label: 'Event Photo',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload event photo/image'
        }
      ],
      searchableFields: ['event_title', 'academic_year'],
      sortableFields: ['event_title', 'event_date', 'academic_year', 'created_at'],
      editableFields: ['academic_year', 'event_title', 'event_date', 'description', 'file_url', 'image_url']
    },
    'activity-gallery': {
      tableName: 'ect_activity_gallery',
      displayField: 'image_title',
      fields: [
        {
          name: 'activity_id',
          label: 'Activity ID',
          type: 'number',
          placeholder: 'e.g., 1',
          required: true,
          size: 'half',
          hidden: true,
          description: 'Internal: Activity reference ID'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Year of the activity'
        },
        {
          name: 'image_url',
          label: 'Gallery Image',
          type: 'file',
          required: true,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload image for gallery (JPG, PNG, GIF, or WebP)'
        },
        {
          name: 'image_title',
          label: 'Image Caption/Title',
          type: 'text',
          placeholder: 'e.g., Maitri Event Group Photo',
          required: false,
          size: 'full',
          description: 'Caption or title for the image'
        },
        {
          name: 'description',
          label: 'Image Description',
          type: 'textarea',
          placeholder: 'Enter description of the image',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Detailed description of what the image shows'
        },
        {
          name: 'order_seq',
          label: 'Display Order',
          type: 'number',
          placeholder: 'e.g., 1',
          required: false,
          size: 'half',
          description: 'Order of display in gallery'
        }
      ],
      searchableFields: ['image_title', 'academic_year'],
      sortableFields: ['image_title', 'academic_year', 'order_seq', 'created_at'],
      editableFields: ['academic_year', 'image_url', 'image_title', 'description', 'order_seq']
    },
    'department-overview': {
      tableName: 'ect_department_overview',
      displayField: 'hod_name',
      fields: [
        {
          name: 'hod_name',
          label: 'HOD Name',
          type: 'text',

          required: true,
          size: 'full',
          description: 'Enter the full name of the Head of Department'
        },
        {
          name: 'hod_email',
          label: 'HOD Email',
          type: 'email',

          required: false,
          size: 'half',
          description: 'Enter HOD email address'
        },
        {
          name: 'hod_qualification',
          label: 'HOD Qualification',
          type: 'text',
          required: false,
          size: 'half',
          description: 'Enter highest educational qualification'
        },
        {
          name: 'hod_image_url',
          label: 'HOD Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png,.gif,.webp',
          description: 'Upload HOD profile image (JPG, PNG, GIF, or WebP format)'
        },
        {
          name: 'description',
          label: 'Department Description',
          type: 'textarea',
          placeholder: 'Enter department description and overview',
          required: false,
          size: 'full',
          rows: 6,
          description: 'Detailed description of the department'
        }
      ],
      searchableFields: ['hod_name', 'hod_email'],
      sortableFields: ['hod_name', 'created_at'],
      editableFields: ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
    },
    'gate': {
      tableName: 'ect_gate',
      displayField: 'name',
      fields: [
        {
          name: 'rollno',
          label: 'Roll Number',
          type: 'text',

          required: true,
          size: 'half',
          description: 'Student roll number'
        },
        {
          name: 'name',
          label: 'Student Name',
          type: 'text',

          required: true,
          size: 'half',
          description: 'Full name of the student'
        },
        {
          name: 'score',
          label: 'GATE Score',
          type: 'number',
          placeholder: 'Enter score',
          required: true,
          size: 'half',
          description: 'GATE exam score'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Academic year'
        }
      ],
      searchableFields: ['name', 'roll_no'],
      sortableFields: ['name', 'score', 'year', 'created_at'],
      editableFields: ['name', 'score', 'year']
    },
    'roll-of-honour': {
      tableName: 'ect_roll_of_honour',
      displayField: 'name',
      fields: [
        {
          name: 'rollno',
          label: 'Roll Number',
          type: 'text',
          placeholder: 'e.g., CST2021001',
          required: true,
          size: 'half',
          description: 'Student roll number'
        },
        {
          name: 'name',
          label: 'Student Name',
          type: 'text',
          placeholder: 'Enter full name',
          required: true,
          size: 'half',
          description: 'Full name of the student'
        },
        {
          name: 'batch',
          label: 'Batch',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Batch/Year'
        },
        {
          name: 'cgpa',
          label: 'CGPA',
          type: 'text',
          placeholder: 'e.g., 9.5',
          required: true,
          size: 'half',
          description: 'Cumulative Grade Point Average'
        }
      ],
      searchableFields: ['name', 'rollno', 'batch'],
      sortableFields: ['name', 'cgpa', 'batch', 'created_at'],
      editableFields: ['name', 'batch', 'cgpa']
    },
    'sahaya-events': {
      tableName: 'ect_sahaya_events',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'e.g., Sahaya Events',
          required: true,
          size: 'full',
          description: 'Enter the title for the Sahaya event section',
          validation: {
            max: 1000,
            message: 'Title must not exceed 1000 characters'
          }
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g., 2024',
          required: true,
          size: 'half',
          description: 'Enter the year of the event'
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the category for this event',
          options: [
            { value: 'ecactivities', label: 'EC Activities' },
            { value: 'sahaya', label: 'Sahaya' }
          ]
        },
        {
          name: 'file_url',
          label: 'Event Document/PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload event document, certificate, or related file (PDF, DOC, DOCX, or Image files)'
        }
      ],
      searchableFields: ['title', 'year', 'category'],
      sortableFields: ['title', 'year', 'category', 'created_at'],
      editableFields: ['title', 'year', 'category', 'file_url']
    },
    'department-library': {
      tableName: 'ect_department_library',
      displayField: 'description',
      fields: [
        {
          name: 'titles',
          label: 'Number of Titles',
          type: 'number',
          placeholder: 'e.g., 150',
          required: true,
          size: 'half',
          description: 'Enter total number of book titles'
        },
        {
          name: 'volumes',
          label: 'Number of Volumes',
          type: 'number',
          placeholder: 'e.g., 500',
          required: false,
          size: 'half',
          description: 'Enter total number of volumes'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Brief description of library resources',
          required: false,
          size: 'full',
          rows: 3,
          description: 'Enter library description'
        },
        {
          name: 'faculty_incharge',
          label: 'Faculty In-charge',
          type: 'text',
          placeholder: 'e.g., Dr. Kumar',
          required: false,
          size: 'half',
          description: 'Enter faculty in-charge name'
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          placeholder: 'e.g., 9876543210',
          required: false,
          size: 'half',
          description: 'Enter contact phone number'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'e.g., library@svec.edu.in',
          required: false,
          size: 'half',
          description: 'Enter contact email'
        },
        {
          name: 'image_url',
          label: 'Library Image',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.jpg,.jpeg,.png',
          description: 'Upload library image'
        }
      ],
      searchableFields: ['description', 'faculty_incharge'],
      sortableFields: ['titles', 'volumes', 'faculty_incharge', 'created_at'],
      editableFields: ['titles', 'volumes', 'description', 'faculty_incharge', 'phone', 'email', 'image_url']
    },
    'handbooks': {
      tableName: 'ect_handbooks',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Handbook Title',
          type: 'text',
          placeholder: 'e.g., Student Handbook 2024',
          required: true,
          size: 'full',
          description: 'Enter handbook title'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: false,
          size: 'half',
          description: 'Enter academic year'
        },
        {
          name: 'file_url',
          label: 'Handbook PDF',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf',
          description: 'Upload handbook PDF file'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'created_at'],
      editableFields: ['title', 'academic_year', 'file_url']
    },
    'physical-facilities': {
      tableName: 'ect_physical_facilities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Program Title',
          type: 'text',
          placeholder: 'e.g., Teaching with Technology Workshop',
          required: true,
          size: 'full',
          description: 'Enter the faculty development program title'
        },
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          placeholder: 'e.g.,2026',
          required: true,
          size: 'full',
          description: ''
        },
        
        {
          name: 'category',
          label: 'Program Type',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the program type',
          options: [
            { value: 'Laboratories', label: 'Laboratories' },
            { value: 'Class Rooms', label: 'Class Rooms' },
            { value: 'Timetables', label: 'Timetables' },
            { value: 'Seminar Halls', label: 'Seminar Halls' }
          ]
        },
        {
          name: 'file_url',
          label: 'Program Document/Certificate',
          type: 'file',
          placeholder: 'Upload program details or certificate',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload program document, certificate, or image (PDF, DOC, DOCX, or Image files max 1MB)'
        }
      ],
      searchableFields: ['title', 'category'],
      sortableFields: ['title', 'category', 'created_at'],
      editableFields: ['title', 'category', 'file_url']
    },
    'scud-activities': {
      tableName: 'ect_scud_activities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Activity Title',
          type: 'text',
          placeholder: 'e.g., SCUD Tech Talk',
          required: true,
          size: 'full',
          description: 'Enter SCUD activity title'
        },
        {
          name: 'academic_year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2024-25',
          required: true,
          size: 'half',
          description: 'Enter year or academic year'
        },
        {
          name: 'file_url',
          label: 'Activity Document',
          type: 'file',
          required: false,
          size: 'half',
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          description: 'Upload activity document or image'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'created_at'],
      editableFields: ['title', 'academic_year', 'file_url']
    },
    'training-activities': {
      tableName: 'ect_training_activities',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Training Title',
          type: 'text',
          placeholder: 'e.g., Python Programming Training',
          required: true,
          size: 'full',
          description: 'Enter training activity title'
        },
        {
          name: 'trainer',
          label: 'Trainer/Resource Person',
          type: 'text',
          placeholder: 'e.g., Dr. Kumar',
          required: false,
          size: 'half',
          description: 'Enter trainer name'
        },
        {
          name: 'file_url',
          label: 'Training Document',
          type: 'file',
          required: false,
          size: 'full',
          accept: '.pdf,.doc,.docx',
          description: 'Upload training document or certificate'
        }
      ],
      searchableFields: ['title', 'trainer'],
      sortableFields: ['title', 'trainer', 'created_at'],
      editableFields: ['title', 'trainer', 'file_url']
    }
  },
  'ds': {
    'hackathons': {
      tableName: 'ds_hackathons',
      displayField: 'title',
      fields: [
        {
          name: 'title',
          label: 'Hackathon Title',
          type: 'text',
          placeholder: 'e.g., HACK-AI 2024',
          required: true,
          size: 'full',
          description: 'Enter the hackathon title'
        },
        {
          name: 'academic_year',
          label: 'Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: true,
          size: 'half',
          description: 'Enter the academic year'
        },
        {
          name: 'event_date',
          label: 'Event Date',
          type: 'date',
          required: false,
          size: 'half',
          description: 'Select the event date'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Enter hackathon description',
          required: false,
          size: 'full',
          description: 'Provide details about the hackathon'
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: false,
          size: 'half',
          description: 'Select the hackathon status',
          options: [
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'ongoing', label: 'Ongoing' },
            { value: 'completed', label: 'Completed' }
          ]
        },
        {
          name: 'brochure_url',
          label: 'Brochure URL',
          type: 'text',
          placeholder: 'Enter Google Drive or external URL',
          required: false,
          size: 'full',
          description: 'Provide brochure URL (Google Drive link)'
        },
        {
          name: 'winners_url',
          label: 'Winners List URL',
          type: 'text',
          placeholder: 'Enter Google Drive or external URL',
          required: false,
          size: 'full',
          description: 'Provide winners list URL (Google Drive link)'
        }
      ],
      searchableFields: ['title', 'academic_year'],
      sortableFields: ['title', 'academic_year', 'event_date', 'created_at'],
      editableFields: ['title', 'academic_year', 'event_date', 'description', 'status', 'brochure_url', 'winners_url']
    },
    'extra-curricular': {
      tableName: 'ds_extracurricular_activities',
      displayField: 'title',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          size: 'half',
          description: 'Select the activity category',
          options: [
            { value: 'Extra Curricular', label: 'Extra Curricular' },
            { value: 'Maitri Coordinators', label: 'Maitri Coordinators' },
            { value: 'Maitri Events', label: 'Maitri Events' },
            { value: 'Workshops', label: 'Workshops' },
            { value: 'SOC', label: 'SOC' },
            { value: 'Guest Lecturers/Seminars', label: 'Guest Lecturers/Seminars' },
            { value: 'Academic Toppers', label: 'Academic Toppers' }
          ]
        },
        {
          name: 'year',
          label: 'Year/Academic Year',
          type: 'text',
          placeholder: 'e.g., 2023-24',
          required: false,
          size: 'half',
          description: 'Enter year or academic year'
        },
        {
          name: 'title',
          label: 'Activity Title',
          type: 'text',
          placeholder: 'e.g., Cultural Fest 2024',
          required: true,
          size: 'full',
          description: 'Enter the title of the activity'
        },
        {
          name: 'file_url',
          label: 'Activity Document/Image',
          type: 'text',
          placeholder: 'Enter Google Drive URL or file path',
          required: false,
          size: 'full',
          description: 'Provide document URL or image path'
        }
      ],
      searchableFields: ['title', 'category', 'year'],
      sortableFields: ['title', 'category', 'year', 'created_at'],
      editableFields: ['category', 'year', 'title', 'file_url']
    }
  }
};

// ================================================================================================
// UTILITY FUNCTIONS
// ================================================================================================

/**
 * Get field configuration for a specific module
 */
export function getModuleFieldConfig(
  dept: string,
  module: string,
  selectedTable?: string
): ModuleFieldConfig | null {
  const baseConfig = MODULES_FIELD_CONFIG[dept]?.[module];

  if (!baseConfig) return null;

  // Check if this is a multi-table module (new format with 'tables')
  // Handle both explicit isMultiTable flag and implicit tables structure
  if ((baseConfig as any).tables) {
    const multiTableConfig = baseConfig as any;

    // If no table selected, return null (caller should handle table selection)
    if (!selectedTable) {
      return null;
    }

    // Get the specific table configuration
    const tableConfig = multiTableConfig.tables[selectedTable];

    if (tableConfig) {
      // Return a merged configuration with the table-specific fields
      return {
        tableName: tableConfig.tableName,
        displayField: tableConfig.displayField,
        fields: tableConfig.fields,
        searchableFields: tableConfig.searchableFields || [],
        sortableFields: tableConfig.sortableFields || [],
        editableFields: tableConfig.editableFields || []
      };
    }
  }

  // Check if this is a multi-table module (old format with 'tableConfigs')
  if ((baseConfig as any).isMultiTable && (baseConfig as any).tableConfigs) {
    const multiTableConfig = baseConfig as any;
    const tableKey = selectedTable || multiTableConfig.tableName;

    // Get the specific table configuration
    const tableConfig = multiTableConfig.tableConfigs[tableKey];

    if (tableConfig) {
      // Return a merged configuration with the table-specific fields
      return {
        tableName: tableKey,
        displayField: baseConfig.displayField,
        fields: tableConfig.fields,
        searchableFields: tableConfig.searchableFields || baseConfig.searchableFields || [],
        sortableFields: tableConfig.sortableFields || baseConfig.sortableFields || [],
        editableFields: tableConfig.editableFields || baseConfig.editableFields || []
      };
    }
  }

  return baseConfig;
}

/**
 * Get a specific field from module configuration
 */
export function getModuleField(
  dept: string,
  module: string,
  fieldName: string
): ModuleField | null {
  const config = getModuleFieldConfig(dept, module);
  if (!config || !config.fields) return null;
  return config.fields.find(f => f.name === fieldName) || null;
}

/**
 * Get all editable fields for a module
 */
export function getEditableFields(dept: string, module: string): string[] {
  const config = getModuleFieldConfig(dept, module);
  return config?.editableFields || [];
}

/**
 * Get searchable fields for a module
 */
export function getSearchableFields(dept: string, module: string): string[] {
  const config = getModuleFieldConfig(dept, module);
  return config?.searchableFields || ['title', 'name', 'description'];
}
