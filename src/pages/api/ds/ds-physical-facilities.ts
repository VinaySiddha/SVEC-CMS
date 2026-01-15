import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { type, category } = req.query;
      let query = "SELECT id, category, title, description, file_url, gallery, lab_details FROM ds_physical_facilities WHERE dept = 'cse-ds'";
      const params: any[] = [];

      // Filter by type or category if provided
      if (type) {
        query += " AND category = ?";
        params.push(type);
      } else if (category) {
        query += " AND category = ?";
        params.push(category);
      }

      query += " ORDER BY id ASC";

      const rows: any = await executeQuery(query, params);

      console.log('🔍 DS Physical Facilities API Debug:', {
        query: query,
        params: params,
        rowsCount: rows ? rows.length : 0,
        firstRow: rows && rows.length > 0 ? rows[0] : null,
        allRows: rows
      });

      res.status(200).json(rows);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}