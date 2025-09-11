// Types and utilities for Faculty Development Programs

import { z } from 'zod';

// Schema for FDP data validation
export const fdpSchema = z.object({
  id: z.string().optional(),
  dept: z.string().min(1, "Department is required"),
  title: z.string().min(1, "Title is required"),
  faculty_name: z.string().min(1, "Faculty name is required"),
  organizer: z.string().min(1, "Organizer name is required"),
  date_from: z.string().min(1, "Start date is required"),
  date_to: z.string().min(1, "End date is required"),
  certificate_url: z.string().optional(),
});

// Type for FDP data
export type FacultyDevelopmentProgram = z.infer<typeof fdpSchema>;

// Options for fetching FDPs
export interface GetFDPOptions {
  id?: string;
  departmentId?: string;
  facultyId?: string;
  limit?: number;
}

// Function to get FDPs from the API
export async function getFDPs(options: GetFDPOptions = {}): Promise<FacultyDevelopmentProgram[]> {
  try {
    // Build query string from options
    const queryParams = new URLSearchParams();
    if (options.departmentId) {
      queryParams.append('dept', options.departmentId);
    }
    if (options.facultyId) {
      queryParams.append('faculty', options.facultyId);
    }
    if (options.limit) {
      queryParams.append('limit', options.limit.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = options.id 
      ? `/api/fdp/${options.id}` 
      : `/api/fdp${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch FDP data');
    }

    // If we requested a specific FDP by ID, the response will be a single object
    if (options.id) {
      const data = await response.json();
      return [data];
    }

    // Otherwise, the response will be an array
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching FDP data:', error);
    throw new Error(error.message || 'Failed to fetch FDP data');
  }
}

// Function to get a single FDP by ID
export async function getFDPById(id: string): Promise<FacultyDevelopmentProgram> {
  try {
    const fdps = await getFDPs({ id });
    return fdps[0];
  } catch (error: any) {
    console.error(`Error fetching FDP with ID ${id}:`, error);
    throw new Error(error.message || `Failed to fetch FDP with ID ${id}`);
  }
}

// Function to format dates for display
export function formatDateForDisplay(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return the original string if parsing fails
  }
}
