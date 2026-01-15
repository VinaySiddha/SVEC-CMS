import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch placement gallery items from civil_hackathons_gallery
    const query = `SELECT id, dept, category, academic_year, gallery, title 
                   FROM civil_hackathons_gallery 
                   WHERE dept = 'civil' AND LOWER(category) = 'placements'
                   ORDER BY academic_year DESC, id DESC`;
    
    const rows = await executeQuery(query);
    
    console.log('🔍 Civil Placements Gallery Debug:', {
      query: query,
      rowsCount: rows ? rows.length : 0,
      firstRow: rows && rows.length > 0 ? rows[0] : null
    });
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching civil placements gallery:', error);
    res.status(500).json({ error: 'Failed to fetch civil placements gallery' });
  }
}
