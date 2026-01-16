import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Disable caching for this API endpoint
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { branchName } = req.query;

  if (!branchName) {
    return res.status(400).json({ error: 'Branch name is required' });
  }

  const dept = (branchName as string).toLowerCase();
  
  
  try {
    let sql = '';
    let params: any[] = [];

    // Common sorting logic based on designation priority
    // Priority:
    // 1. HOD / Head
    // 2. Professor (including Dean, etc., but excluding Associate/Assistant)
    // 3. Associate Professor
    // 4. Sr. Assistant Professor
    // 5. Assistant Professor
    // 6. Lecturer
    const orderByClause = `
      ORDER BY 
        CASE 
          WHEN LOWER(designation) LIKE '%head%' OR LOWER(designation) LIKE '%hod%' THEN 1
          WHEN LOWER(designation) LIKE '%professor%' 
               AND LOWER(designation) NOT LIKE '%associate%' 
               AND LOWER(designation) NOT LIKE '%assistant%' 
               AND LOWER(designation) NOT LIKE '%asst%' THEN 2
          WHEN LOWER(designation) LIKE '%associate%' OR LOWER(designation) LIKE '%assoc%' THEN 3
          WHEN LOWER(designation) LIKE '%sr%asst%' OR LOWER(designation) LIKE '%sr%assistant%' THEN 4
          WHEN LOWER(designation) LIKE '%asst%' OR LOWER(designation) LIKE '%assistant%' THEN 5
          WHEN LOWER(designation) LIKE '%lecturer%' THEN 6
          ELSE 999
        END,
        id ASC
    `;

    // Determine the correct table name based on department
    // Different departments use different table naming conventions
    let tableName = '';
    
    if (dept === 'ece') {
      tableName = 'ece_teaching_faculty';
      sql = `SELECT id, name, designation, qualification, profile_url, NULL as dept FROM ${tableName} ${orderByClause}`;
    } else if (dept === 'mech') {
      // MECH uses mech_faculty with profile_url column
      tableName = 'mech_faculty';
      sql = `SELECT id, name, designation, qualification, profile_url, NULL as dept FROM ${tableName} ${orderByClause}`;
    } else if (dept === 'cse' || dept === 'cst' || dept === 'aiml' || dept === 'ds' || dept === 'bsh' || dept === 'eee') {
      // These departments use dept_faculty format with profileUrl column
      tableName = `${dept}_faculty`;
      sql = `SELECT id, name, designation, qualification, profileUrl as profile_url, NULL as dept FROM ${tableName} ${orderByClause}`;
    } else if (dept === 'mba' || dept === 'cai') {
      // MBA and CAI use dept_faculty format with profileUrl column
      tableName = `${dept}_faculty`;
      sql = `SELECT id, name, designation, qualification, profileUrl as profile_url, NULL as dept FROM ${tableName} ${orderByClause}`;
    } else if (dept === 'ect') {
      // ECT uses ect_faculty with profileUrl column
      tableName = 'ect_faculty';
      sql = `SELECT id, name, designation, qualification, profileUrl as profile_url, NULL as dept FROM ${tableName} ${orderByClause}`;
    } else {
      // Default fallback to faculty_profiles table for other departments (MECH, CIVIL, etc.)
      sql = `
        SELECT * FROM faculty_profiles 
        WHERE dept = ? AND (status = "approved" OR status IS NULL)
        ${orderByClause}
      `;
      params = [dept];
    } 

    const results = await query(sql, params);
    
    
    // If no results found, return empty array instead of error
    if (!results || results.length === 0) {
      return res.status(200).json([]);
    }
    
    res.status(200).json(results);
  } catch (error: any) {
    
    // If table doesn't exist, try faculty_profiles as fallback
    if (error?.code === 'ER_NO_SUCH_TABLE' || error?.message?.includes('doesn\'t exist')) {
      try {
        const fallbackSql = `
          SELECT * FROM faculty_profiles 
          WHERE dept = ? AND (status = "approved" OR status IS NULL)
          ORDER BY id ASC
        `;
        const fallbackResults = await query(fallbackSql, [dept]);
        return res.status(200).json(fallbackResults || []);
      } catch (fallbackError) {
        return res.status(200).json([]);
      }
    }
    
    // For any other error, return empty array to prevent frontend errors
    res.status(200).json([]);
  }
}
