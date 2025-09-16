import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// API: /api/mous?dept=aiml
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dept } = req.query;
  if (!dept || typeof dept !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid dept parameter' });
  }

  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms',
    });

    const [rows] = await connection.execute(
      'SELECT id, dept, organization_name,start_date, end_date FROM mous WHERE dept = ?',
      [dept]
    );

    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch MoUs data' });
  }
}
