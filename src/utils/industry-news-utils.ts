import { query } from "@/lib/db";

/**
 * Industry News interface
 */
export interface IndustryNews {
  id: string;
  dept: string;
  title: string;
  organization: string;
  date: string;
  description: string | null;
  document_url: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get all industry news - Backend server function
 */
export async function getAllIndustryNews({ 
  dept = null,
  limit = null,
  offset = 0
}: { 
  dept?: string | null;
  limit?: number | null;
  offset?: number;
} = {}): Promise<IndustryNews[]> {
  let sql = `
    SELECT id, dept, title, organization, date, description, document_url, created_at, updated_at
    FROM industry_news
    WHERE deleted_at IS NULL
  `;
  
  const params: any[] = [];
  
  if (dept) {
    sql += ` AND dept = ?`;
    params.push(dept);
  }
  
  sql += ` ORDER BY date DESC`;
  
  if (limit !== null) {
    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);
  }
  
  const news = await query<any>(sql, params);
  
  return news as IndustryNews[];
}

/**
 * Get industry news by ID - Backend server function
 */
export async function getIndustryNewsById(id: string): Promise<IndustryNews | null> {
  const [news] = await query<any>(`
    SELECT id, dept, title, organization, date, description, document_url, created_at, updated_at
    FROM industry_news
    WHERE id = ? AND deleted_at IS NULL
  `, [id]);
  
  if (!news) return null;
  
  return news as IndustryNews;
}

/**
 * Get industry news by department - Backend server function
 */
export async function getIndustryNewsByDepartment(dept: string, options: { 
  limit?: number | null;
  offset?: number;
} = {}): Promise<IndustryNews[]> {
  let sql = `
    SELECT id, dept, title, organization, date, description, document_url, created_at, updated_at
    FROM industry_news
    WHERE dept = ? AND deleted_at IS NULL
    ORDER BY date DESC
  `;
  
  const params: any[] = [dept];
  
  if (options.limit !== null && options.limit !== undefined) {
    sql += ` LIMIT ? OFFSET ?`;
    params.push(options.limit, options.offset || 0);
  }
  
  const news = await query<any>(sql, params);
  
  return news as IndustryNews[];
}

/**
 * Get latest industry news - Backend server function
 */
export async function getLatestIndustryNews(limit: number = 10): Promise<IndustryNews[]> {
  const news = await query<any>(`
    SELECT id, dept, title, organization, date, description, document_url, created_at, updated_at
    FROM industry_news
    WHERE deleted_at IS NULL
    ORDER BY date DESC
    LIMIT ?
  `, [limit]);
  
  return news as IndustryNews[];
}

/**
 * Get all industry news - Client-side function that calls the API
 */
export async function getIndustryNews(options: {
  departmentId?: string;
  limit?: number;
  page?: number;
} = {}): Promise<IndustryNews[]> {
  try {
    let url = '/api/industry-news';
    const params = new URLSearchParams();
    
    if (options.departmentId) {
      params.append('dept', options.departmentId);
    }
    
    if (options.limit) {
      params.append('limit', options.limit.toString());
    }
    
    if (options.page && options.limit) {
      const offset = (options.page - 1) * options.limit;
      params.append('offset', offset.toString());
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch industry news');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get industry news by ID - Client-side function that calls the API
 */
export async function getIndustryNewsItem(id: string): Promise<IndustryNews> {
  try {
    const response = await fetch(`/api/industry-news/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch industry news item');
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
