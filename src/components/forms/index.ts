// Form Components Export Index
// This file exports all the data management forms for easy importing

// Department Management Forms
export { DepartmentInfoForm } from './DepartmentInfoForm';

// Infrastructure Forms
export { LaboratoryForm } from './LaboratoryForm';

// Academic Forms
export { FacultyProfileForm } from './FacultyProfileForm';
export { FacultyAchievementForm } from './FacultyAchievementForm';
export { WorkshopForm } from './WorkshopForm';

// Student Forms
export { StudentAchievementForm } from './StudentAchievementForm';
export { PlacementForm } from './PlacementForm';

// Library and Resources Forms
export { LibraryResourceForm } from './LibraryResourceForm';
export { HandbookForm } from './HandbookForm';
export { GalleryImageForm } from './GalleryImageForm';

// Form Types and Interfaces
export interface BaseFormProps {
  dept?: string;
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

// Form Categories
export const FORM_CATEGORIES = {
  DEPARTMENT: 'department',
  INFRASTRUCTURE: 'infrastructure', 
  ACADEMIC: 'academic',
  STUDENT: 'student',
  LIBRARY: 'library',
  GALLERY: 'gallery'
} as const;

// Available Forms Configuration
export const AVAILABLE_FORMS = [
  {
    id: 'department-info',
    name: 'Department Information',
    category: FORM_CATEGORIES.DEPARTMENT,
    component: 'DepartmentInfoForm',
    description: 'Manage department details, HOD information, and contact details',
    icon: '🏢',
    fields: ['dept', 'dept_full_name', 'hod_name', 'vision', 'mission', 'about']
  },
  {
    id: 'laboratories',
    name: 'Laboratories',
    category: FORM_CATEGORIES.INFRASTRUCTURE,
    component: 'LaboratoryForm',
    description: 'Manage lab information, equipment, and software details',
    icon: '🔬',
    fields: ['lab_name', 'lab_code', 'capacity', 'usage', 'softwares', 'equipments']
  },
  {
    id: 'faculty-profiles',
    name: 'Faculty Profiles',
    category: FORM_CATEGORIES.ACADEMIC,
    component: 'FacultyProfileForm',
    description: 'Manage faculty profiles, qualifications, and research interests',
    icon: '👨‍🏫',
    fields: ['name', 'designation', 'qualification', 'experience', 'specializations']
  },
  {
    id: 'faculty-achievements',
    name: 'Faculty Achievements',
    category: FORM_CATEGORIES.ACADEMIC,
    component: 'FacultyAchievementForm',
    description: 'Track faculty awards, certifications, and recognitions',
    icon: '🏆',
    fields: ['faculty_name', 'achievement_type', 'title', 'description']
  },
  {
    id: 'workshops',
    name: 'Workshops',
    category: FORM_CATEGORIES.ACADEMIC,
    component: 'WorkshopForm',
    description: 'Manage workshop details, schedules, and participants',
    icon: '📚',
    fields: ['title', 'start_date', 'end_date', 'venue', 'resource_person']
  },
  {
    id: 'student-achievements',
    name: 'Student Achievements',
    category: FORM_CATEGORIES.STUDENT,
    component: 'StudentAchievementForm',
    description: 'Track student awards, competitions, and accomplishments',
    icon: '🎓',
    fields: ['student_name', 'roll_number', 'achievement_type', 'title']
  },
  {
    id: 'placements',
    name: 'Placements',
    category: FORM_CATEGORIES.STUDENT,
    component: 'PlacementForm',
    description: 'Manage student placement records and company details',
    icon: '💼',
    fields: ['student_name', 'roll_number', 'company_name', 'position', 'package']
  },
  {
    id: 'library-resources',
    name: 'Library Resources',
    category: FORM_CATEGORIES.LIBRARY,
    component: 'LibraryResourceForm',
    description: 'Manage library books, journals, and digital resources',
    icon: '📖',
    fields: ['title', 'author', 'publisher', 'resource_type']
  },
  {
    id: 'handbooks',
    name: 'Handbooks',
    category: FORM_CATEGORIES.LIBRARY,
    component: 'HandbookForm',
    description: 'Manage department handbooks and documentation',
    icon: '📋',
    fields: ['title', 'description', 'academic_year', 'editor']
  },
  {
    id: 'gallery-images',
    name: 'Gallery Images',
    category: FORM_CATEGORIES.GALLERY,
    component: 'GalleryImageForm',
    description: 'Manage department gallery images and events',
    icon: '🖼️',
    fields: ['title', 'caption', 'event_name', 'event_date']
  }
] as const;

// Helper function to get forms by category
export function getFormsByCategory(category: string) {
  return AVAILABLE_FORMS.filter(form => form.category === category);
}

// Helper function to get form configuration by ID
export function getFormConfig(formId: string) {
  return AVAILABLE_FORMS.find(form => form.id === formId);
}
