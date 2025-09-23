import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
     host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    const [rows] = await connection.execute(
      `SELECT id, regulation, semester, subject, ppt_url, display_order
       FROM cse_eresources
       ORDER BY regulation DESC, display_order ASC`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}