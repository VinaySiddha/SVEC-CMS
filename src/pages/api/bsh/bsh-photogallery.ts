import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });
    const [rows] = await connection.execute(
      'SELECT id, title, event_type, imageUrl, date, description, ordering FROM bsh_photogallery ORDER BY date DESC, ordering, id'
    );
    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error('API /api/bsh/bsh-photogallery error:', error);
    res.status(500).json({ message: 'Database error', error: (error as Error).message });
  }
}
