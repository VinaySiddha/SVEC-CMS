/**
 * Database utility functions for form data management
 * Based on the SVEC-CMS schema.sql file
 */

import { query, execute } from '@/lib/db';

// Generic types for common database operations
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface FilterOptions {
  dept?: string;
  status?: 'pending' | 'approved' | 'rejected';
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Department Info Operations
export interface DepartmentInfo {
  id: number;
  dept: string;
  dept_full_name: string;
  hod_name: string;
  hod_image?: string;
  vision?: string;
  mission?: string;
  about?: string;
  contact_email?: string;
  contact_phone?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export async function getDepartmentInfo(filters: FilterOptions = {}, pagination: PaginationOptions = {}) {
  const { dept, status = 'approved' } = filters;
  const { page = 1, limit = 10, sortBy = 'dept_full_name', sortOrder = 'ASC' } = pagination;
  
  let sql = `
    SELECT * FROM department_info 
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

  sql += ` ORDER BY ${sortBy} ${sortOrder}`;
  
  if (limit > 0) {
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);
  }

  return await query<DepartmentInfo>(sql, params);
}

// Laboratory Operations
export interface Laboratory {
  id: number;
  dept: string;
  lab_name: string;
  lab_code?: string;
  configurations?: any;
  usage?: string;
  capacity?: number;
  softwares?: string;
  equipments?: string;
  image_url?: string;
  location?: string;
  incharge?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export async function getLaboratories(filters: FilterOptions = {}, pagination: PaginationOptions = {}) {
  const { dept, status = 'approved', search } = filters;
  const { page = 1, limit = 10, sortBy = 'lab_name', sortOrder = 'ASC' } = pagination;
  
  let sql = `
    SELECT * FROM laboratories 
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

  if (search) {
    sql += ` AND (lab_name LIKE ? OR lab_code LIKE ? OR usage LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY ${sortBy} ${sortOrder}`;
  
  if (limit > 0) {
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);
  }

  return await query<Laboratory>(sql, params);
}

// Faculty Achievement Operations
export interface FacultyAchievement {
  id: number;
  dept: string;
  faculty_name: string;
  achievement_type: string;
  title: string;
  description?: string;
  achievement_date?: string;
  issuing_authority?: string;
  document_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export async function getFacultyAchievements(filters: FilterOptions = {}, pagination: PaginationOptions = {}) {
  const { dept, status = 'approved', search } = filters;
  const { page = 1, limit = 10, sortBy = 'achievement_date', sortOrder = 'DESC' } = pagination;
  
  let sql = `
    SELECT * FROM faculty_achievements 
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

  if (search) {
    sql += ` AND (faculty_name LIKE ? OR title LIKE ? OR achievement_type LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY ${sortBy} ${sortOrder}`;
  
  if (limit > 0) {
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);
  }

  return await query<FacultyAchievement>(sql, params);
}

// Student Achievement Operations
export interface StudentAchievement {
  id: number;
  dept: string;
  student_name: string;
  roll_number: string;
  achievement_type: string;
  title: string;
  description?: string;
  achievement_date?: string;
  issuing_authority?: string;
  academic_year?: string;
  image_url?: string;
  document_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export async function getStudentAchievements(filters: FilterOptions = {}, pagination: PaginationOptions = {}) {
  const { dept, status = 'approved', search } = filters;
  const { page = 1, limit = 10, sortBy = 'achievement_date', sortOrder = 'DESC' } = pagination;
  
  let sql = `
    SELECT * FROM student_achievements 
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

  if (search) {
    sql += ` AND (student_name LIKE ? OR roll_number LIKE ? OR title LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY ${sortBy} ${sortOrder}`;
  
  if (limit > 0) {
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);
  }

  return await query<StudentAchievement>(sql, params);
}

// Placement Operations
export interface Placement {
  id: number;
  dept: string;
  student_name: string;
  roll_number: string;
  company_name: string;
  position: string;
  package?: number;
  placement_date?: string;
  placement_type: 'on-campus' | 'off-campus' | 'internship';
  academic_year: string;
  batch: string;
  image_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export async function getPlacements(filters: FilterOptions = {}, pagination: PaginationOptions = {}) {
  const { dept, status = 'approved', search } = filters;
  const { page = 1, limit = 10, sortBy = 'placement_date', sortOrder = 'DESC' } = pagination;
  
  let sql = `
    SELECT * FROM placements 
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

  if (search) {
    sql += ` AND (student_name LIKE ? OR roll_number LIKE ? OR company_name LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY ${sortBy} ${sortOrder}`;
  
  if (limit > 0) {
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);
  }

  return await query<Placement>(sql, params);
}

// Workshop Operations
export interface Workshop {
  id: number;
  dept: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  venue?: string;
  resource_person?: string;
  coordinator?: string;
  participants_count?: number;
  participants_type?: string;
  image_url?: string;
  document_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export async function getWorkshops(filters: FilterOptions = {}, pagination: PaginationOptions = {}) {
  const { dept, status = 'approved', search, dateFrom, dateTo } = filters;
  const { page = 1, limit = 10, sortBy = 'start_date', sortOrder = 'DESC' } = pagination;
  
  let sql = `
    SELECT * FROM workshops 
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

  if (search) {
    sql += ` AND (title LIKE ? OR resource_person LIKE ? OR coordinator LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (dateFrom) {
    sql += ` AND start_date >= ?`;
    params.push(dateFrom);
  }

  if (dateTo) {
    sql += ` AND end_date <= ?`;
    params.push(dateTo);
  }

  sql += ` ORDER BY ${sortBy} ${sortOrder}`;
  
  if (limit > 0) {
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);
  }

  return await query<Workshop>(sql, params);
}

// Generic soft delete function
export async function softDelete(table: string, id: number) {
  return await execute(`
    UPDATE ${table} 
    SET deleted_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `, [id]);
}

// Generic status update function
export async function updateStatus(table: string, id: number, status: 'pending' | 'approved' | 'rejected') {
  return await execute(`
    UPDATE ${table} 
    SET status = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `, [status, id]);
}

// Get count of records for pagination
export async function getRecordCount(table: string, filters: FilterOptions = {}) {
  const { dept, status } = filters;
  
  let sql = `SELECT COUNT(*) as count FROM ${table} WHERE deleted_at IS NULL`;
  const params: any[] = [];

  if (dept) {
    sql += ` AND dept = ?`;
    params.push(dept);
  }

  if (status) {
    sql += ` AND status = ?`;
    params.push(status);
  }

  const result = await query<{ count: number }>(sql, params);
  return result[0]?.count || 0;
}

// Department statistics
export async function getDepartmentStatistics(dept?: string) {
  const deptFilter = dept ? 'AND dept = ?' : '';
  const deptParam = dept ? [dept] : [];

  const [
    facultyCount,
    labCount,
    placementCount,
    achievementCount,
    workshopCount
  ] = await Promise.all([
    query(`SELECT COUNT(*) as count FROM faculty_profiles WHERE deleted_at IS NULL ${deptFilter}`, deptParam),
    query(`SELECT COUNT(*) as count FROM laboratories WHERE deleted_at IS NULL ${deptFilter}`, deptParam),
    query(`SELECT COUNT(*) as count FROM placements WHERE deleted_at IS NULL ${deptFilter}`, deptParam),
    query(`SELECT COUNT(*) as count FROM faculty_achievements WHERE deleted_at IS NULL ${deptFilter}`, deptParam),
    query(`SELECT COUNT(*) as count FROM workshops WHERE deleted_at IS NULL ${deptFilter}`, deptParam),
  ]);

  return {
    faculty: (facultyCount[0] as any)?.count || 0,
    laboratories: (labCount[0] as any)?.count || 0,
    placements: (placementCount[0] as any)?.count || 0,
    achievements: (achievementCount[0] as any)?.count || 0,
    workshops: (workshopCount[0] as any)?.count || 0,
  };
}
