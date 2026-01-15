import type { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const query = `
      SELECT id, category, academic_year, gallery, created_at 
      FROM cse_hackathons_gallery 
      WHERE category = 'faculty' 
      ORDER BY academic_year DESC, created_at DESC
    `;
    
    const results = await executeQuery(query);
    
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching CSE faculty development gallery:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}