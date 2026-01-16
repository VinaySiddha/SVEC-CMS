import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      try {
        // Try to fetch with category filter first
        const rows: any = await executeQuery(
          "SELECT * FROM eee_technical_handbooks WHERE category = 'Academic HandBooks' ORDER BY academic_year DESC, semester DESC"
        );
        res.status(200).json(rows || []);
      } catch (err) {
        try {
          // Fallback: try without category filter
          const rows: any = await executeQuery(
            "SELECT * FROM eee_technical_handbooks ORDER BY id DESC"
          );
          res.status(200).json(rows || []);
        } catch (err2) {
          // Return empty array if table doesn't exist
          res.status(200).json([]);
        }
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    // Return empty array instead of error for non-critical data
    res.status(200).json([]);
  }
}
