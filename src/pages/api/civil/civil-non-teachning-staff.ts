import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      console.log('Fetching from civil_non_teaching_faculty table');
      const nonTeachingStaff = (await executeQuery(
        "SELECT * FROM civil_non_teaching_faculty ORDER BY id ASC"
      )) as any[];
      
      console.log('Non-teaching staff data retrieved:', nonTeachingStaff?.length || 0, 'records');
      res.status(200).json(nonTeachingStaff || []);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Civil Non-Teaching Staff API Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
