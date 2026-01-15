import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const tableName = 'ds-faculty-achievements'.replace('ds-', 'ds_').replace(/-/g, '_');
      const rows: any = await executeQuery(
        `SELECT * FROM ${tableName} ORDER BY id DESC`
      );
      res.status(200).json(rows);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
