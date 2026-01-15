import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      console.log('Fetching from civil_faculty table');
      const faculty = (await executeQuery(
        "SELECT * FROM civil_faculty ORDER BY id ASC"
      )) as any[];
      
      console.log('Faculty data retrieved:', faculty?.length || 0, 'records');
      res.status(200).json(faculty || []);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Civil Faculty API Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
