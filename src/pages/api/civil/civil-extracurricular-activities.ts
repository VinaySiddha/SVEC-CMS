import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      console.log('Fetching extra-curricular activities data...');
      const rows: any = await executeQuery(
        "SELECT * FROM civil_extracurricular_activities ORDER BY id DESC"
      );

      console.log('Extra-curricular activities rows retrieved:', rows?.length || 0, rows);
      res.status(200).json(rows || []);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Extra-Curricular Activities API Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Internal server error', details: errorMessage });
  }
}
