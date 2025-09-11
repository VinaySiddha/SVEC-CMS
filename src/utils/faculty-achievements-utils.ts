// Types and utilities for Faculty Achievements

import { z } from 'zod';

// Valid achievement types
export const ACHIEVEMENT_TYPES = [
  'Research Supervisors',
  'Awards',
  'Patents',
  'Publications',
  'Grants',
  'Other'
] as const;

// Type for achievement types
export type AchievementType = typeof ACHIEVEMENT_TYPES[number];

// Schema for faculty achievement data validation
export const facultyAchievementSchema = z.object({
  id: z.string().optional(),
  dept: z.string().min(1, "Department is required"),
  type: z.enum(ACHIEVEMENT_TYPES, {
    errorMap: () => ({ message: "Please select a valid achievement type" })
  }),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  proof_url: z.string().optional(),
  approved: z.boolean().optional().default(false),
});

// Type for faculty achievement data
export type FacultyAchievement = z.infer<typeof facultyAchievementSchema>;

// Options for fetching faculty achievements
export interface GetFacultyAchievementsOptions {
  id?: string;
  departmentId?: string;
  type?: (typeof ACHIEVEMENT_TYPES)[number];
  approved?: boolean;
  limit?: number;
}

// Function to get faculty achievements from the API
export async function getFacultyAchievements(options: GetFacultyAchievementsOptions = {}): Promise<FacultyAchievement[]> {
  try {
    // Build query string from options
    const queryParams = new URLSearchParams();
    if (options.departmentId) {
      queryParams.append('dept', options.departmentId);
    }
    if (options.type) {
      queryParams.append('type', options.type);
    }
    if (options.approved !== undefined) {
      queryParams.append('approved', options.approved.toString());
    }
    if (options.limit) {
      queryParams.append('limit', options.limit.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = options.id 
      ? `/api/faculty-achievements/${options.id}` 
      : `/api/faculty-achievements${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch faculty achievements');
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
    console.error('Error fetching faculty achievements:', error);
    throw new Error(error.message || 'Failed to fetch faculty achievements');
  }
}

// Function to get a single faculty achievement by ID
export async function getFacultyAchievementById(id: string): Promise<FacultyAchievement> {
  try {
    const achievements = await getFacultyAchievements({ id });
    return achievements[0];
  } catch (error: any) {
    console.error(`Error fetching faculty achievement with ID ${id}:`, error);
    throw new Error(error.message || `Failed to fetch faculty achievement with ID ${id}`);
  }
}

// Get achievement by types for a specific department
export async function getAchievementsByType(departmentId: string): Promise<Record<string, FacultyAchievement[]>> {
  try {
    const allAchievements = await getFacultyAchievements({ 
      departmentId, 
      approved: true 
    });
    
    // Group by type
    const grouped: Record<string, FacultyAchievement[]> = {};
    
    // Initialize with all types for consistent structure
    ACHIEVEMENT_TYPES.forEach(type => {
      grouped[type] = [];
    });
    
    // Fill in the achievements
    allAchievements.forEach(achievement => {
      if (!grouped[achievement.type]) {
        grouped[achievement.type] = [];
      }
      grouped[achievement.type].push(achievement);
    });
    
    return grouped;
  } catch (error) {
    console.error('Error grouping achievements by type:', error);
    throw error;
  }
}
