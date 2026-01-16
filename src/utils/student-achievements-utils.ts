// Types and utilities for Student Achievements

import { z } from 'zod';

// Enum for achievement types
export const AchievementTypes = [
  'Internship',
  'Certifications',
  'Student Research Projects',
  'Competitions',
  'Sports',
  'Other'
] as const;

// Enum for programs
export const ProgramTypes = ['btech', 'mtech', 'na'] as const;

// Schema for student achievement data validation
export const studentAchievementSchema = z.object({
  id: z.string().optional(),
  dept: z.string().min(1, "Department is required"),
  type: z.enum(AchievementTypes, { 
    errorMap: () => ({ message: "Please select a valid achievement type" }) 
  }),
  title: z.string().min(1, "Title is required"),
  name: z.string().min(1, "Student name is required"),
  roll_number: z.string().min(1, "Roll number is required"),
  program: z.enum(ProgramTypes).default('na'),
  cgpa: z.number().min(0).max(10).optional(),
  score: z.string().optional(),
  guide_name: z.string().optional(),
  batch: z.string().optional(),
  proof_url: z.string().optional(),
});

// Type for student achievement data
export type StudentAchievement = z.infer<typeof studentAchievementSchema>;

// Options for fetching student achievements
export interface GetStudentAchievementsOptions {
  id?: string;
  departmentId?: string;
  type?: typeof AchievementTypes[number];
  program?: typeof ProgramTypes[number];
  limit?: number;
}

// Function to get student achievements from the API
export async function getStudentAchievements(options: GetStudentAchievementsOptions = {}): Promise<StudentAchievement[]> {
  try {
    // Build query string from options
    const queryParams = new URLSearchParams();
    if (options.departmentId) {
      queryParams.append('dept', options.departmentId);
    }
    if (options.type) {
      queryParams.append('type', options.type);
    }
    if (options.program) {
      queryParams.append('program', options.program);
    }
    if (options.limit) {
      queryParams.append('limit', options.limit.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = options.id 
      ? `/api/student-achievements/${options.id}` 
      : `/api/student-achievements${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch student achievement data');
    }

    // If we requested a specific achievement by ID, the response will be a single object
    if (options.id) {
      const data = await response.json();
      return [data];
    }

    // Otherwise, the response will be an array
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch student achievement data');
  }
}

// Function to get a single student achievement by ID
export async function getStudentAchievementById(id: string): Promise<StudentAchievement> {
  try {
    const achievements = await getStudentAchievements({ id });
    return achievements[0];
  } catch (error: any) {
    throw new Error(error.message || `Failed to fetch student achievement with ID ${id}`);
  }
}

// Helper function to determine which fields should be displayed based on achievement type
export function getRequiredFieldsByType(type: typeof AchievementTypes[number]) {
  const baseFields = {
    program: false,
    cgpa: false,
    score: false,
    guide_name: false,
    batch: false,
  };

  switch (type) {
    case 'Student Research Projects':
      return { ...baseFields, program: true, guide_name: true };
    case 'Competitions':
      return { ...baseFields, score: true };
    case 'Sports':
      return { ...baseFields, program: true };
    case 'Certifications':
      return { ...baseFields, score: true };
    case 'Other':
      return { ...baseFields, batch: true, cgpa: true };
    default:
      return baseFields;
  }
}
