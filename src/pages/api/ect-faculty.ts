import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set cache control headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    if (req.method === 'GET') {
      // Fetch all ECT faculty
      const [rows] = await connection.execute(
        `SELECT 
          id, 
          name, 
          qualification, 
          designation, 
          profile_url as profileUrl,
          faculty_type,
          date_of_joining,
          created_at,
          updated_at
        FROM ect_faculty 
        ORDER BY 
          CASE
            WHEN LOWER(TRIM(designation)) LIKE '%professor%head%' THEN 1
            WHEN LOWER(TRIM(designation)) = 'professor' THEN 2
            WHEN LOWER(TRIM(designation)) LIKE '%associate professor%' THEN 3
            WHEN LOWER(TRIM(designation)) LIKE '%sr%asst%' OR LOWER(TRIM(designation)) LIKE '%sr%assistant%' THEN 4
            WHEN LOWER(TRIM(designation)) LIKE '%asst%professor%' OR LOWER(TRIM(designation)) LIKE '%assistant professor%' THEN 5
            WHEN LOWER(TRIM(designation)) LIKE '%lecturer%' THEN 6
            ELSE 999
          END ASC,
          date_of_joining ASC`
      );

      return res.status(200).json(rows);
    } 
    
    else if (req.method === 'POST') {
      // Add new faculty member
      const { name, qualification, designation, profile_url, faculty_type, date_of_joining } = req.body;

      if (!name || !designation) {
        return res.status(400).json({ error: 'Name and designation are required' });
      }

      const [result]: any = await connection.execute(
        `INSERT INTO ect_faculty (name, qualification, designation, profile_url, faculty_type, date_of_joining) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          name,
          qualification || null,
          designation,
          profile_url || null,
          faculty_type || 'teaching',
          date_of_joining || null
        ]
      );

      return res.status(201).json({
        message: 'Faculty member added successfully',
        id: result.insertId
      });
    } 
    
    else if (req.method === 'PUT') {
      // Update faculty member
      const { id } = req.query;
      const { name, qualification, designation, profile_url, faculty_type, date_of_joining } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Faculty ID is required' });
      }

      if (!name || !designation) {
        return res.status(400).json({ error: 'Name and designation are required' });
      }

      await connection.execute(
        `UPDATE ect_faculty 
         SET name = ?, 
             qualification = ?, 
             designation = ?, 
             profile_url = ?, 
             faculty_type = ?,
             date_of_joining = ?,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [
          name,
          qualification || null,
          designation,
          profile_url || null,
          faculty_type || 'teaching',
          date_of_joining || null,
          id
        ]
      );

      return res.status(200).json({ message: 'Faculty member updated successfully' });
    } 
    
    else if (req.method === 'DELETE') {
      // Delete faculty member
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Faculty ID is required' });
      }

      await connection.execute('DELETE FROM ect_faculty WHERE id = ?', [id]);

      return res.status(200).json({ message: 'Faculty member deleted successfully' });
    } 
    
    else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('ECT Faculty API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
