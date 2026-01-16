import type { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '@/lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const query = `SELECT * FROM eee_hackathons_gallery WHERE category = 'gi' ORDER BY id DESC`;
    const data = await executeQuery(query);
    
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json([]);
  }
}
