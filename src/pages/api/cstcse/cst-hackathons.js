import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    const [rows] = await connection.execute(
      'SELECT * FROM cst_hackathons WHERE dept="cst" ORDER BY academic_year DESC'
    );
    // No need to parse gallery if it's already an array
    await connection.end();
    res.status(200).json({ hackathons: rows });
  } catch (error) {
    if (connection) await connection.end();
    res.status(500).json({ error: error.message });
  }
}