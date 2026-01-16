import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      try {
        const rows: any = await executeQuery(
          "SELECT * FROM eee_newsletters ORDER BY year DESC, volume DESC, issue DESC"
        );
        res.status(200).json(rows || []);
      } catch (err) {
        res.status(200).json([]);
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(200).json([]);
  }
}
