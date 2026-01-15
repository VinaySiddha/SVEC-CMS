import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT *FROM ect_training_activities ORDER BY batch DESC"
      );

      // Normalize field names for UI consistency
      const normalized = (rows || []).map((r: any) => ({
        id: r.id,
        academic_year: r.academic_year,
        title: r.title,
        description: r.description,
        file_url: r.url, // Map 'url' to 'file_url' for consistency
        created_at: r.created_at
      }));

      res.status(200).json(normalized);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('ECT Training Activities API Error:', error);
    res.status(200).json([]);
  }
}
