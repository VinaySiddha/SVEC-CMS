// Types and utilities for Organized Events

import { z } from 'zod';

// Schema for organized event data validation
export const organizedEventSchema = z.object({
  id: z.string().optional(),
  dept: z.string().min(1, "Department is required"),
  title: z.string().min(1, "Title is required"),
  organizer: z.string().min(1, "Organizer name is required"),
  date_from: z.string().min(1, "Start date is required"),
  date_to: z.string().min(1, "End date is required"),
  report_url: z.string().optional(),
});

// Type for organized event data
export type OrganizedEvent = z.infer<typeof organizedEventSchema>;

// Options for fetching organized events
export interface GetOrganizedEventsOptions {
  id?: string;
  departmentId?: string;
  limit?: number;
}

// Function to get organized events from the API
export async function getOrganizedEvents(options: GetOrganizedEventsOptions = {}): Promise<OrganizedEvent[]> {
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
      ? `/api/organized-events/${options.id}` 
      : `/api/organized-events${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch organized event data');
    }

    // If we requested a specific event by ID, the response will be a single object
    if (options.id) {
      const data = await response.json();
      return [data];
    }

    // Otherwise, the response will be an array
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch organized event data');
  }
}

// Function to get a single organized event by ID
export async function getOrganizedEventById(id: string): Promise<OrganizedEvent> {
  try {
    const events = await getOrganizedEvents({ id });
    return events[0];
  } catch (error: any) {
    throw new Error(error.message || `Failed to fetch organized event with ID ${id}`);
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
    return dateString; // Return the original string if parsing fails
  }
}
