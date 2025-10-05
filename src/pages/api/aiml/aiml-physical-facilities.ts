import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dept } = req.query;
  if (!dept || typeof dept !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid dept parameter' });
  }

  // adjust credentials or use process.env
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  try {
    const [classrooms] = await connection.execute(
      `SELECT id, title, document_url
         FROM aiml_classrooms
        WHERE dept = ?
        ORDER BY id ASC`,
      [dept]
    );

    const [timeTables] = await connection.execute(
      `SELECT id, title, document_url
         FROM aiml_class_time_tables
        WHERE dept = ?
        ORDER BY id ASC`,
      [dept]
    );

    const [seminarHalls] = await connection.execute(
      `SELECT id, title, document_url
         FROM aiml_seminar_halls
        WHERE dept = ?
        ORDER BY id ASC`,
      [dept]
    );

    const [labs] = await connection.execute(
      `SELECT id, name, configuration, usage_info, num_systems, image_url
         FROM aiml_laboratories
        WHERE dept = ?
        ORDER BY id ASC`,
      [dept]
    );

    const [otherLabs] = await connection.execute(
      `SELECT id, name, image_url
         FROM aiml_other_laboratories
        WHERE dept = ?
        ORDER BY id ASC`,
      [dept]
    );

    await connection.end();

    res.status(200).json({
      dept,
      classrooms,
      timeTables,
      seminarHalls,
      labs,
      otherLabs,
    });
  } catch (err) {
    await connection.end();
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}
