import { executeQuery } from '@/lib/dbPool';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const query = `SELECT * FROM eee_hackathons_gallery WHERE category = 'ac' ORDER BY id DESC`;
    const data = await executeQuery(query);
    
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching anniversary gallery:', error);
    res.status(200).json([]);
  }
}
