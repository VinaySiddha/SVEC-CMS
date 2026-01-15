import type { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Using connection pool

  try {
    if (req.method === 'GET') {
      console.log('Fetching CAI non-teaching staff...');
      const startTime = Date.now();

      const rows: any = await executeQuery(`
        SELECT id, name, designation 
        FROM cai_teaching_faculty
        ORDER BY id DESC 
        LIMIT 50
      `);
      
      console.log('CAI staff query time:', Date.now() - startTime, 'ms');
      console.log('CAI staff records found:', (rows as any[]).length);

      res.status(200).json(rows);
      
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ message: 'Method not allowed' });
    }
    
  } catch (error) {
    console.error('Error fetching CAI staff:', error);
    res.status(500).json({ 
      message: 'Error fetching CAI staff data',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  } 
}
