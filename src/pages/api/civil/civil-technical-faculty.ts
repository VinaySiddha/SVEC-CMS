import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      console.log('Fetching from civil_technical_faculty table');
      const technicalFaculty = (await executeQuery(
        "SELECT * FROM civil_technical_faculty ORDER BY id ASC"
      )) as any[];
      
      console.log('Technical faculty data retrieved:', technicalFaculty?.length || 0, 'records');
      res.status(200).json(technicalFaculty || []);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Civil Technical Faculty API Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
