import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add caching headers for faster responses
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');

  try {
    if (req.method === 'GET') {
      const startTime = Date.now();

      const rows: any = await executeQuery(`
        SELECT * 
        FROM aiml_technical_association 
        ORDER BY category ASC, id DESC
      `);
      
      const endTime = Date.now();

      return res.status(200).json(Array.isArray(rows) ? rows : []);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    return res.status(500).json({ 
      error: 'Failed to fetch technical association data',
      details: error.message 
    });
  }
}
