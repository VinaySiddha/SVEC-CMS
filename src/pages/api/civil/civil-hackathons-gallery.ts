import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch all gallery items for civil department
    const query = `SELECT id, dept, category, academic_year, gallery, title FROM civil_hackathons_gallery 
                   WHERE dept = 'civil'
                   ORDER BY id DESC`;
    
    const rows = await executeQuery(query);
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch civil hackathons gallery' });
  }
}
