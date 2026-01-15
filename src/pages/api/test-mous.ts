import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Test query for MOUs data
      const result = await query(
        'SELECT id, mou_with as organization_name, from_date, to_date, status FROM cai_mous ORDER BY created_at DESC'
      );

      console.log('MOUs Query Result:', result);

      res.status(200).json({
        success: true,
        count: Array.isArray(result) ? result.length : 0,
        data: result
      });
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
