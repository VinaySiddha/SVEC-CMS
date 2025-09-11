/**
 * Department Rules - Module Access and Data Validation
 * 
 * This module defines what features and data types are available to each department
 * and provides validation functions to enforce these rules server-side.
 */

// Department constants
export const DEPARTMENTS = {
  // Core Engineering Departments
  CSE: 'cse',
  ECE: 'ece',
  EEE: 'eee',
  CIVIL: 'civil',
  MECH: 'mech',
  
  // Special Engineering Programs
  CSE_AI: 'cse-ai',
  CSE_DS: 'cse-ds',
  CST: 'cst',
  AIML: 'aiml',
  ECT: 'ect',
  
  // Other Departments
  MBA: 'mba',
  BSH: 'bsh',
};

// Module types available across departments
export const MODULE_TYPES = {
  // Core modules
  ANNOUNCEMENTS: 'announcements',
  FACULTY: 'faculty',
  EVENTS: 'events',
  ACHIEVEMENTS: 'achievements',
  GALLERY: 'gallery',
  
  // Academic modules
  SYLLABUS_DOCUMENTS: 'syllabus_documents',
  STUDENT_PROJECTS: 'student_projects',
  RESEARCH_PROJECTS: 'research_projects',
  STUDENT_RESEARCH: 'student_research',
  BOARD_OF_STUDIES: 'board_of_studies',
  
  // Special modules
  PUBLICATIONS: 'publications',
  WORKSHOPS: 'workshops',
  INTERNSHIPS: 'internships',
  PLACEMENTS: 'placements',
  DEPARTMENT: 'department', // General department module
};

// Syllabus document types
export const SYLLABUS_TYPES = {
  BTECH: 'btech',
  MTECH: 'mtech',
  SOC: 'soc',       // Soft Skills / Open Course
  SYLLABUS: 'syllabus',
};

// Student research program types
export const RESEARCH_PROGRAM_TYPES = {
  PROJECT: 'project',
  PAPER: 'paper',
  INNOVATION: 'innovation',
  PROTOTYPE: 'prototype',
  PATENT: 'patent',
};

/**
 * Get available module types for a specific department
 * 
 * @param dept The department code (e.g., 'cse', 'ece', 'mba')
 * @returns Array of module keys available to the department
 */
export function getAvailableModules(dept: string): string[] {
  // Normalize department code
  const deptCode = dept.toLowerCase();
  
  // Base modules available to all departments
  const baseModules = [
    MODULE_TYPES.ANNOUNCEMENTS,
    MODULE_TYPES.FACULTY,
    MODULE_TYPES.EVENTS,
    MODULE_TYPES.ACHIEVEMENTS,
    MODULE_TYPES.GALLERY,
    MODULE_TYPES.SYLLABUS_DOCUMENTS,
  ];
  
  // MBA and BSH departments have limited modules
  if (deptCode === DEPARTMENTS.MBA || deptCode === DEPARTMENTS.BSH) {
    return baseModules;
  }
  
  // All engineering departments get these additional modules
  return [
    ...baseModules,
    MODULE_TYPES.STUDENT_PROJECTS,
    MODULE_TYPES.RESEARCH_PROJECTS,
    MODULE_TYPES.STUDENT_RESEARCH,
    MODULE_TYPES.PUBLICATIONS,
    MODULE_TYPES.WORKSHOPS,
    MODULE_TYPES.INTERNSHIPS,
    MODULE_TYPES.PLACEMENTS,
  ];
}

/**
 * Get available syllabus types for a specific department
 * 
 * @param dept The department code (e.g., 'cse', 'ece', 'mba')
 * @returns Array of syllabus type keys available to the department
 */
export function getSyllabusTypes(dept: string): string[] {
  // Normalize department code
  const deptCode = dept.toLowerCase();
  
  // MBA and BSH only have 'syllabus' type
  if (deptCode === DEPARTMENTS.MBA || deptCode === DEPARTMENTS.BSH) {
    return [SYLLABUS_TYPES.SYLLABUS];
  }
  
  // Core engineering departments have all types
  if ([
    DEPARTMENTS.CSE,
    DEPARTMENTS.ECE,
    DEPARTMENTS.EEE,
    DEPARTMENTS.CIVIL,
    DEPARTMENTS.MECH
  ].includes(deptCode)) {
    return [
      SYLLABUS_TYPES.BTECH,
      SYLLABUS_TYPES.MTECH,
      SYLLABUS_TYPES.SOC
    ];
  }
  
  // Newer specialized engineering departments have subset
  if ([
    DEPARTMENTS.CSE_AI,
    DEPARTMENTS.CSE_DS,
    DEPARTMENTS.CST,
    DEPARTMENTS.AIML,
    DEPARTMENTS.ECT
  ].includes(deptCode)) {
    return [
      SYLLABUS_TYPES.BTECH,
      SYLLABUS_TYPES.SOC
    ];
  }
  
  // Default case - base types
  return [
    SYLLABUS_TYPES.BTECH,
    SYLLABUS_TYPES.SOC
  ];
}

/**
 * Get available student research program types for a specific department
 * 
 * @param dept The department code (e.g., 'cse', 'ece', 'mba')
 * @returns Array of research program type keys available to the department
 */
export function getStudentResearchPrograms(dept: string): string[] {
  // Normalize department code
  const deptCode = dept.toLowerCase();
  
  // MBA and BSH don't have student research programs
  if (deptCode === DEPARTMENTS.MBA || deptCode === DEPARTMENTS.BSH) {
    return [];
  }
  
  // All engineering departments have all research program types
  return Object.values(RESEARCH_PROGRAM_TYPES);
}

/**
 * Validate if a module is available for a department
 * 
 * @param dept The department code
 * @param module The module key to validate
 * @returns Boolean indicating if the module is valid for the department
 */
export function isModuleAvailable(dept: string, module: string): boolean {
  const availableModules = getAvailableModules(dept);
  return availableModules.includes(module);
}

/**
 * Validate if a syllabus type is available for a department
 * 
 * @param dept The department code
 * @param syllabusType The syllabus type to validate
 * @returns Boolean indicating if the syllabus type is valid for the department
 */
export function isValidSyllabusType(dept: string, syllabusType: string): boolean {
  const validTypes = getSyllabusTypes(dept);
  return validTypes.includes(syllabusType);
}

/**
 * Validate if a research program type is available for a department
 * 
 * @param dept The department code
 * @param programType The research program type to validate
 * @returns Boolean indicating if the research program type is valid for the department
 */
export function isValidResearchProgram(dept: string, programType: string): boolean {
  const validTypes = getStudentResearchPrograms(dept);
  return validTypes.includes(programType);
}
