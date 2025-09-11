import { NextRequest, NextResponse } from 'next/server';
import { AuthUser } from '@/lib/auth';
import * as deptRules from '@/lib/deptRules';

/**
 * Response Types
 */
export type ValidationResponse = {
  isValid: boolean;
  response?: NextResponse;
};

/**
 * Validate access to a module for a department
 * @param module The module being accessed
 * @param user The authenticated user
 * @returns Validation result and error response if invalid
 */
export function validateModuleAccess(module: string, user: AuthUser | null): ValidationResponse {
  // No user = no access
  if (!user) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    };
  }

  // Admin users have access to all modules
  if (user.role === 'admin') {
    return { isValid: true };
  }
  
  // No department = no department-specific access
  if (!user.department) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Access forbidden - no department assigned' },
        { status: 403 }
      )
    };
  }
  
  // Check if module is available for the department
  if (!deptRules.isModuleAvailable(user.department, module)) {
    return {
      isValid: false,
      response: NextResponse.json(
        { 
          error: 'Module not available for this department',
          department: user.department,
          module: module
        },
        { status: 422 }
      )
    };
  }
  
  return { isValid: true };
}

/**
 * Validate syllabus type for a department
 * @param syllabusType The syllabus type being used
 * @param user The authenticated user
 * @returns Validation result and error response if invalid
 */
export function validateSyllabusType(syllabusType: string, user: AuthUser | null): ValidationResponse {
  // No user = no access
  if (!user) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    };
  }

  // Admin users can use any syllabus type
  if (user.role === 'admin') {
    return { isValid: true };
  }
  
  // No department = no department-specific validation
  if (!user.department) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Access forbidden - no department assigned' },
        { status: 403 }
      )
    };
  }
  
  // Check if syllabus type is valid for the department
  if (!deptRules.isValidSyllabusType(user.department, syllabusType)) {
    return {
      isValid: false,
      response: NextResponse.json(
        { 
          error: 'Syllabus type not available for this department',
          department: user.department,
          validTypes: deptRules.getSyllabusTypes(user.department),
          providedType: syllabusType
        },
        { status: 422 }
      )
    };
  }
  
  return { isValid: true };
}

/**
 * Validate research program type for a department
 * @param programType The research program type being used
 * @param user The authenticated user
 * @returns Validation result and error response if invalid
 */
export function validateResearchProgram(programType: string, user: AuthUser | null): ValidationResponse {
  // No user = no access
  if (!user) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    };
  }

  // Admin users can use any program type
  if (user.role === 'admin') {
    return { isValid: true };
  }
  
  // No department = no department-specific validation
  if (!user.department) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Access forbidden - no department assigned' },
        { status: 403 }
      )
    };
  }
  
  // Check if research program is valid for the department
  if (!deptRules.isValidResearchProgram(user.department, programType)) {
    return {
      isValid: false,
      response: NextResponse.json(
        { 
          error: 'Research program type not available for this department',
          department: user.department,
          validTypes: deptRules.getStudentResearchPrograms(user.department),
          providedType: programType
        },
        { status: 422 }
      )
    };
  }
  
  return { isValid: true };
}
