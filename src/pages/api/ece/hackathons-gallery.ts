import mysql from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    let query = 'SELECT *FROM ece_hackathons_gallery';
    const params: any[] = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC, id DESC';

    const [rows] = await connection.execute(query, params);
    res.status(200).json(
      Array.isArray(rows) ? rows : []
    );
  } catch (error) {
    console.error("Error fetching hackathons gallery:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: errorMessage,
      data: []
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
