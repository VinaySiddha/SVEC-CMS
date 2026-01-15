import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT * FROM cse_mous ORDER BY from_date DESC"
      );

      // Normalize fields so consumers can rely on `mou_with` and `status` keys
      const normalized = (rows || []).map((r: any) => ({
        ...r,
        // some tables use `organization_name` or `organization`; expose `mou_with` for UI
        mou_with: r.mou_with || r.organization_name || r.organization || r.title || null,
        // status may not exist on older cse_mous table — default to null/empty
        status: r.status ?? null
      }));

      res.status(200).json(normalized);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('CSE MOUs API Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
