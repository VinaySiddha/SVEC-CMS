import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      console.log('🔍 Fetching CAI MOUs...');
      const rows: any = await executeQuery(
        "SELECT * FROM cai_mous ORDER BY from_date DESC"
      );

      console.log('✅ CAI MOUs fetched successfully. Records:', rows.length);
      console.log('📊 Sample MOU data:', rows.length > 0 ? rows[0] : 'No data');
      res.status(200).json(rows);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}