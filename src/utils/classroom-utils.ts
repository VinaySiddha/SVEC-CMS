import { query } from "@/lib/db";

/**
 * Classroom interface
 */
export interface Classroom {
  id: number;
  dept: string;
  type: 'seminar' | 'timetable';
  description: string;
  document_url: string | null;
  seating_capacity: number | null;
  projector: boolean;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
  updated_at: string;
  created_by?: number;
  updated_by?: number;
}

/**
 * Get all classrooms
 */
export async function getAllClassrooms({ 
  type = null, 
  dept = null, 
  status = 'active'
}: { 
  type?: string | null;
  dept?: string | null; 
  status?: string | null;
}): Promise<Classroom[]> {
  let sql = `
    SELECT id, dept, type, description, document_url, seating_capacity, projector, status, created_at, updated_at
    FROM classrooms
    WHERE deleted_at IS NULL
  `;
  
  const params: any[] = [];
  
  if (type) {
    sql += ` AND type = ?`;
    params.push(type);
  }
  
  if (dept) {
    sql += ` AND dept = ?`;
    params.push(dept);
  }
  
  if (status) {
    sql += ` AND status = ?`;
    params.push(status);
  }
  
  sql += ` ORDER BY created_at DESC`;
  
  return await query<Classroom>(sql, params);
}

/**
 * Get classroom by ID
 */
export async function getClassroomById(id: number | string): Promise<Classroom | null> {
  const [classroom] = await query<Classroom>(`
    SELECT id, dept, type, description, document_url, seating_capacity, projector, status, created_at, updated_at
    FROM classrooms
    WHERE id = ? AND deleted_at IS NULL
  `, [id]);
  
  return classroom || null;
}

/**
 * Get classrooms by department
 */
export async function getClassroomsByDepartment(dept: string, options: { 
  type?: string | null; 
  status?: string | null;
} = {}): Promise<Classroom[]> {
  let sql = `
    SELECT id, dept, type, description, document_url, seating_capacity, projector, status, created_at, updated_at
    FROM classrooms
    WHERE dept = ? AND deleted_at IS NULL
  `;
  
  const params: any[] = [dept];
  
  if (options.type) {
    sql += ` AND type = ?`;
    params.push(options.type);
  }
  
  if (options.status) {
    sql += ` AND status = ?`;
    params.push(options.status);
  }
  
  sql += ` ORDER BY created_at DESC`;
  
  return await query<Classroom>(sql, params);
}

/**
 * Get classrooms by type
 */
export async function getClassroomsByType(type: string, options: {
  dept?: string | null;
  status?: string | null;
} = {}): Promise<Classroom[]> {
  let sql = `
    SELECT id, dept, type, description, document_url, seating_capacity, projector, status, created_at, updated_at
    FROM classrooms
    WHERE type = ? AND deleted_at IS NULL
  `;
  
  const params: any[] = [type];
  
  if (options.dept) {
    sql += ` AND dept = ?`;
    params.push(options.dept);
  }
  
  if (options.status) {
    sql += ` AND status = ?`;
    params.push(options.status);
  }
  
  sql += ` ORDER BY created_at DESC`;
  
  return await query<Classroom>(sql, params);
}
