import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { dept } = req.query;
  const connection = await mysql.createConnection({
     host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
  });

  try {
    const [rows] = await connection.execute(
      'SELECT academic_year, semester, title, file_url FROM cst_handbooks WHERE dept = ? ORDER BY academic_year DESC, semester DESC',
      [dept]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}