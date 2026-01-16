import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT * FROM civil_research_projects ORDER BY id DESC"
      );

      res.status(200).json(rows || []);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Internal server error', details: errorMessage });
  }
}
