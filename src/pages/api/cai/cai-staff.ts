import type { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Using connection pool

  try {
    if (req.method === 'GET') {
      const startTime = Date.now();

      const rows: any = await executeQuery(`
        SELECT id, name, designation 
        FROM cai_teaching_faculty
        ORDER BY id DESC 
        LIMIT 50
      `);
      

      res.status(200).json(rows);
      
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: 'Method not allowed' });
    }
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching CAI staff data',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  } 
}
