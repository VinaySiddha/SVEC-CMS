import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms',
    });

    if (req.method === 'GET') {
      // Fetch industrial visits, sorted by date descending
      const [rows] = await connection.execute(
        `SELECT * FROM mba_industrial_visits ORDER BY date_of_visit DESC, sno ASC`
      );

      await connection.end();
      res.status(200).json(Array.isArray(rows) ? rows : []);
    } else {
      await connection.end();
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching MBA industrial visits:', error);
    res.status(500).json({ 
      error: 'Failed to fetch industrial visits data',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
