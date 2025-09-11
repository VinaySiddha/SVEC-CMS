/**
 * Utility functions for syllabus document operations
 */

import { DEPARTMENTS } from '@/lib/deptRules';

/**
 * Syllabus document types
 */
export type SyllabusType = 'btech' | 'mtech' | 'soc' | 'mba' | 'syllabus';

/**
 * Department-specific syllabus type restrictions
 */
const DEPARTMENT_SYLLABUS_TYPES: Record<string, SyllabusType[]> = {
  // Default types for most departments
  default: ['btech', 'mtech', 'syllabus'],
  
  // MBA department only has 'syllabus' type
  [DEPARTMENTS.MBA]: ['syllabus'],
  
  // Some departments might have special types
  [DEPARTMENTS.CSE]: ['btech', 'mtech', 'soc', 'syllabus'],
  [DEPARTMENTS.ECE]: ['btech', 'mtech', 'syllabus'],
  [DEPARTMENTS.CSE_AI]: ['btech', 'mtech', 'soc', 'syllabus'],
  [DEPARTMENTS.CSE_DS]: ['btech', 'mtech', 'soc', 'syllabus'],
  
  // Add more department-specific configurations as needed
};

/**
 * Get available syllabus types for a specific department
 * 
 * @param dept Department code
 * @returns Array of syllabus types available for the department
 */
export function getSyllabusTypes(dept: string): SyllabusType[] {
  // Return department-specific types or fall back to default types
  return DEPARTMENT_SYLLABUS_TYPES[dept] || DEPARTMENT_SYLLABUS_TYPES.default;
}

/**
 * Validate if a syllabus type is allowed for a department
 * 
 * @param dept Department code
 * @param type Syllabus type to check
 * @returns Boolean indicating if the type is allowed
 */
export function isValidSyllabusType(dept: string, type: string): boolean {
  const allowedTypes = getSyllabusTypes(dept);
  return allowedTypes.includes(type as SyllabusType);
}

/**
 * Get readable name for syllabus type
 * 
 * @param type Syllabus type code
 * @returns Human-readable name for the syllabus type
 */
export function getSyllabusTypeName(type: SyllabusType): string {
  const typeNames: Record<SyllabusType, string> = {
    btech: 'B.Tech',
    mtech: 'M.Tech',
    soc: 'School of Computing',
    mba: 'MBA',
    syllabus: 'Syllabus'
  };
  
  return typeNames[type] || type;
}

/**
 * Get all syllabus types with readable names
 * 
 * @returns Array of all syllabus types with code and name
 */
export function getAllSyllabusTypeOptions(): { value: SyllabusType; label: string }[] {
  return [
    { value: 'btech', label: 'B.Tech' },
    { value: 'mtech', label: 'M.Tech' },
    { value: 'soc', label: 'School of Computing' },
    { value: 'mba', label: 'MBA' },
    { value: 'syllabus', label: 'Syllabus' }
  ];
}
