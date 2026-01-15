import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      console.log('Fetching research projects data...');
      const rows: any = await executeQuery(
        "SELECT * FROM civil_research_projects ORDER BY id DESC"
      );

      console.log('Research projects rows retrieved:', rows?.length || 0, rows);
      res.status(200).json(rows || []);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Research Projects API Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Internal server error', details: errorMessage });
  }
}
