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
      ORDER BY academic_year DESC, created_at DESC
      LIMIT 100
    `;
    
    const results = await executeQuery(query);
    console.log('All gallery data:', results);
    
    // Filter for honour category or return all if honour doesn't exist
    const honourData = results.filter((item: any) => item.category === 'honour');
    const dataToReturn = honourData.length > 0 ? honourData : results;
    
    res.status(200).json(dataToReturn);
  } catch (error) {
    console.error('Error fetching CSE Roll of Honour gallery:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
