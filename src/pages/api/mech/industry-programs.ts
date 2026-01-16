import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT id, academic_year, title, file_url FROM mech_industry_programs ORDER BY academic_year DESC"
      );


      // Format data for frontend display
      const formatted = (rows || []).map((r: any) => ({
        id: r.id,
        type: 'activity', // Mark as activity type for filtering
        category: r.title,
        academic_year: r.academic_year,
        file_url: r.file_url,
        activities: r.file_url ? [
          {
            description: `${r.title} (Academic Year: ${r.academic_year})`,
            link: r.file_url
          }
        ] : []
      }));

      res.status(200).json(formatted);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
