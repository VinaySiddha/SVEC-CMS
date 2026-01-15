import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT * FROM cse_placements ORDER BY id DESC"
      );

      // Ensure each placement has a dept field so frontend filtering works
      const normalized = (rows || []).map((r: any) => ({
        ...r,
        dept: r.dept || 'cse'
      }));

      res.status(200).json(normalized);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('CSE Placements API Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
