// Types and utilities for Workshops

import { z } from 'zod';

// Schema for workshop data validation
export const workshopSchema = z.object({
  id: z.string().optional(),
  dept: z.string().min(1, "Department is required"),
  title: z.string().min(1, "Title is required"),
  date_from: z.string().min(1, "Start date is required"),
  date_to: z.string().min(1, "End date is required"),
  description: z.string().min(1, "Description is required"),
  report_url: z.string().optional(),
  gallery: z.array(z.string()).optional().default([]),
});

// Type for workshop data
export type Workshop = z.infer<typeof workshopSchema>;

// Options for fetching workshops
export interface GetWorkshopsOptions {
  id?: string;
  departmentId?: string;
  limit?: number;
}

// Function to get workshops from the API
export async function getWorkshops(options: GetWorkshopsOptions = {}): Promise<Workshop[]> {
  try {
    // Build query string from options
    const queryParams = new URLSearchParams();
    if (options.departmentId) {
      queryParams.append('dept', options.departmentId);
    }
    if (options.limit) {
      queryParams.append('limit', options.limit.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = options.id 
      ? `/api/workshops/${options.id}` 
      : `/api/workshops${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch workshop data');
    }

    // If we requested a specific workshop by ID, the response will be a single object
    if (options.id) {
      const data = await response.json();
      return [data];
    }

    // Otherwise, the response will be an array
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching workshop data:', error);
    throw new Error(error.message || 'Failed to fetch workshop data');
  }
}

// Function to get a single workshop by ID
export async function getWorkshopById(id: string): Promise<Workshop> {
  try {
    const workshops = await getWorkshops({ id });
    return workshops[0];
  } catch (error: any) {
    console.error(`Error fetching workshop with ID ${id}:`, error);
    throw new Error(error.message || `Failed to fetch workshop with ID ${id}`);
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
