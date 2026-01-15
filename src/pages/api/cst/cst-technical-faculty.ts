import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch teaching faculty
      const teaching = (await executeQuery(
        "SELECT * FROM cst_technical_faculty ORDER BY id ASC"
      )) as any[];

      // Fetch technical faculty (separate table)
      let technical: any[] = [];
      try {
        technical = (await executeQuery(
          "SELECT id, name, designation, 'technical' as faculty_type FROM cst_technical_faculty ORDER BY id ASC"
        )) as any[];
      } catch (e) {
        technical = [];
      }

      // Fetch non-teaching faculty (separate table)
      let nonTeaching: any[] = [];
      try {
        nonTeaching = (await executeQuery(
          "SELECT id, name, designation, 'non_teaching' as faculty_type FROM cst_non_teaching_faculty ORDER BY id ASC"
        )) as any[];
      } catch (e) {
        nonTeaching = [];
      }

      // Normalize teaching entries to include faculty_type 'teaching'
      const teachingNormalized = (teaching || []).map((r: any) => ({
        ...r,
        faculty_type: r.faculty_type || 'teaching'
      }));

      const normalized = [
        ...teachingNormalized,
        ...technical,
        ...nonTeaching
      ];

      res.status(200).json(normalized);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('CST Faculty API Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
