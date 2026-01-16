import { query } from "@/lib/db";

/**
 * MOU interface
 */
export interface MOU {
  id: string;
  dept: string;
  organization_name: string;
  from_date: string;
  to_date: string;
  document_url: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get all MOUs - Backend server function
 */
export async function getAllMOUs({ 
  dept = null
}: { 
  dept?: string | null;
} = {}): Promise<MOU[]> {
  let sql = `
    SELECT id, dept, organization_name, from_date, to_date, document_url, created_at, updated_at
    FROM mous
    WHERE deleted_at IS NULL
  `;
  
  const params: any[] = [];
  
  if (dept) {
    sql += ` AND dept = ?`;
    params.push(dept);
  }
  
  sql += ` ORDER BY from_date DESC`;
  
  const mous = await query<any>(sql, params);
  
  return mous as MOU[];
}

/**
 * Get MOU by ID - Backend server function
 */
export async function getMOUById(id: string): Promise<MOU | null> {
  const [mou] = await query<any>(`
    SELECT id, dept, organization_name, from_date, to_date, document_url, created_at, updated_at
    FROM mous
    WHERE id = ? AND deleted_at IS NULL
  `, [id]);
  
  if (!mou) return null;
  
  return mou as MOU;
}

/**
 * Get MOUs by department - Backend server function
 */
export async function getMOUsByDepartment(dept: string): Promise<MOU[]> {
  const mous = await query<any>(`
    SELECT id, dept, organization_name, from_date, to_date, document_url, created_at, updated_at
    FROM mous
    WHERE dept = ? AND deleted_at IS NULL
    ORDER BY from_date DESC
  `, [dept]);
  
  return mous as MOU[];
}

/**
 * Get all MOUs - Client-side function that calls the API
 */
export async function getMOUs(departmentId?: string): Promise<MOU[]> {
  try {
    const url = departmentId 
      ? `/api/mous?dept=${encodeURIComponent(departmentId)}`
      : '/api/mous';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch MOUs');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get a MOU by ID - Client-side function that calls the API
 */
export async function getMOU(id: string): Promise<MOU> {
  try {
    const response = await fetch(`/api/mous/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch MOU details');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Format a date string to YYYY-MM-DD
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

/**
 * Format a date string to a more readable format (e.g., "Jan 1, 2023")
 */
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
