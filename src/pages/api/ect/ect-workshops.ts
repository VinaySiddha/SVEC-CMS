import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT * FROM ect_workshops ORDER BY id DESC"
      );

      // Normalize fields for UI consistency
      const normalized = (rows || []).map((r: any) => ({
        ...r,
        title: r.title || r.name || 'Workshop',
        file_url: r.file_url || r.url || r.document_url,
        academic_year: r.academic_year || r.year || 'Current Year',
        category: r.category || null
      }));

      res.status(200).json(normalized);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
