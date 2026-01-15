import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch hackathon gallery from cst_hackathons_gallery table where category = 'hackathon'
    const query = `SELECT id, category, academic_year, gallery, created_at 
                   FROM cst_hackathons_gallery 
                   WHERE category = 'hackathon' 
                   ORDER BY academic_year DESC, created_at DESC`;
    
    const rows = await executeQuery(query);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching hackathons gallery:', error);
    res.status(500).json({ error: 'Failed to fetch hackathons gallery' });
  }
}