import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT * FROM ect_physical_facilities ORDER BY category ASC, id DESC"
      );

      // Return rows or empty array if no data
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.status(200).json(Array.isArray(rows) ? rows : []);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('ECT Physical Facilities API Error:', error);
    // Return empty array instead of error to prevent UI crashes
    res.status(200).json([]);
  }
}
