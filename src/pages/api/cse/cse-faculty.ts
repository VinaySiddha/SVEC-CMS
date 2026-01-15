import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch teaching faculty
      const teaching = (await executeQuery(
        "SELECT *, 'teaching' as faculty_type FROM cse_faculty ORDER BY id ASC"
      )) as any[];

      // Fetch technical faculty (separate table)
      let technical: any[] = [];
      try {
        technical = (await executeQuery(
          "SELECT *, 'technical' as faculty_type FROM cse_technical_faculty ORDER BY id ASC"
        )) as any[];
      } catch (e) {
        technical = [];
      }

      // Fetch non-teaching faculty (separate table)
      let nonTeaching: any[] = [];
      try {
        nonTeaching = (await executeQuery(
          "SELECT *, 'non_teaching' as faculty_type FROM cse_non_teaching_faculty ORDER BY id ASC"
        )) as any[];
      } catch (e) {
        nonTeaching = [];
      }

      // Combine all lists
      const combined = [
        ...teaching,
        ...technical,
        ...nonTeaching
      ];

      res.status(200).json(combined);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('CSE Faculty API Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
