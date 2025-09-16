import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// GET /api/extra-curricular?dept=cai
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { dept } = req.query;

  if (!dept || typeof dept !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or invalid dept query parameter' });
  }

  let connection;
  try {
    // Create a one-time connection (no pool)
    connection = await mysql.createConnection({
      host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    // Fetch activity documents
    const [docs] = await connection.execute(
      `SELECT id, academic_year, title, pdf_url, description
         FROM extra_curricular_docs
        WHERE dept = ?
        ORDER BY academic_year DESC`,
      [dept]
    );

    // Fetch clubs/associations
    const [clubs] = await connection.execute(
      `SELECT id, name, subtitle, description
         FROM extra_curricular_clubs
        WHERE dept = ?
        ORDER BY name ASC`,
      [dept]
    );

    res.status(200).json({
      dept,
      documents: docs,
      clubs: clubs,
    });
  } catch (err: any) {
    console.error('Extra-curricular API error:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) await connection.end();
  }
}
