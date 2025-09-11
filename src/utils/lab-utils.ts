import { query } from "@/lib/db";

/**
 * Configuration interface
 */
export interface Configuration {
  system: string;
  quantity: number;
  details?: string;
}

/**
 * Lab interface
 */
export interface Lab {
  id: string;
  dept: string;
  lab_name: string;
  configurations: Configuration[];
  usage: string | null;
  image_url: string[];
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

/**
 * Get all labs - Backend server function
 */
export async function getAllLabs({ 
  dept = null, 
  status = 'active'
}: { 
  dept?: string | null; 
  status?: string | null;
} = {}): Promise<Lab[]> {
  let sql = `
    SELECT id, dept, lab_name, configurations, usage, image_url, status, created_at, updated_at
    FROM labs
    WHERE deleted_at IS NULL
  `;
  
  const params: any[] = [];
  
  if (dept) {
    sql += ` AND dept = ?`;
    params.push(dept);
  }
  
  if (status) {
    sql += ` AND status = ?`;
    params.push(status);
  }
  
  sql += ` ORDER BY created_at DESC`;
  
  const labs = await query<any>(sql, params);
  
  // Parse JSON for configurations and convert image_url to array
  return labs.map(lab => ({
    ...lab,
    configurations: JSON.parse(lab.configurations || '[]'),
    image_url: lab.image_url ? lab.image_url.split(',') : []
  }));
}

/**
 * Get lab by ID - Backend server function
 */
export async function getLabById(id: string): Promise<Lab | null> {
  const [lab] = await query<any>(`
    SELECT id, dept, lab_name, configurations, usage, image_url, status, created_at, updated_at
    FROM labs
    WHERE id = ? AND deleted_at IS NULL
  `, [id]);
  
  if (!lab) return null;
  
  // Parse JSON for configurations and convert image_url to array
  return {
    ...lab,
    configurations: JSON.parse(lab.configurations || '[]'),
    image_url: lab.image_url ? lab.image_url.split(',') : []
  };
}

/**
 * Get labs by department - Backend server function
 */
export async function getLabsByDepartment(dept: string, options: { 
  status?: string | null;
} = {}): Promise<Lab[]> {
  let sql = `
    SELECT id, dept, lab_name, configurations, usage, image_url, status, created_at, updated_at
    FROM labs
    WHERE dept = ? AND deleted_at IS NULL
  `;
  
  const params: any[] = [dept];
  
  if (options.status) {
    sql += ` AND status = ?`;
    params.push(options.status);
  }
  
  sql += ` ORDER BY created_at DESC`;
  
  const labs = await query<any>(sql, params);
  
  // Parse JSON for configurations and convert image_url to array
  return labs.map(lab => ({
    ...lab,
    configurations: JSON.parse(lab.configurations || '[]'),
    image_url: lab.image_url ? lab.image_url.split(',') : []
  }));
}

/**
 * Get all labs - Client-side function that calls the API
 */
export async function getLabs(departmentId?: string): Promise<Lab[]> {
  try {
    const url = departmentId 
      ? `/api/labs?dept=${encodeURIComponent(departmentId)}`
      : '/api/labs';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch labs');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching labs:', error);
    throw error;
  }
}

/**
 * Get a lab by ID - Client-side function that calls the API
 */
export async function getLab(id: string): Promise<Lab> {
  try {
    const response = await fetch(`/api/labs/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch lab details');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching lab ${id}:`, error);
    throw error;
  }
}
