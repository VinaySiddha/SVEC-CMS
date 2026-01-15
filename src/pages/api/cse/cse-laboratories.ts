import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch laboratories from hackathons_gallery table where category = 'labs'
    const query = `SELECT id, gallery as label FROM cse_hackathons_gallery 
                   WHERE category = 'labs' 
                   ORDER BY created_at DESC`;
    
    const rows = await executeQuery(query);
    
    // Transform the data to match select options format
    const options = (rows as any[]).map((row: any) => ({
      value: row.id.toString(),
      label: row.label || 'Untitled'
    }));
    
    res.status(200).json(options);
  } catch (error) {
    console.error('Error fetching laboratories:', error);
    res.status(500).json({ error: 'Failed to fetch laboratories' });
  }
}
