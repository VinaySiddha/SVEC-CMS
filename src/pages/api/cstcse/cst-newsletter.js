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
      'SELECT * FROM cst_newsletters WHERE dept="cst" ORDER BY year DESC, volume DESC, issue DESC'
    );

    await connection.end();
    res.status(200).json({ newsletters: rows });
  } catch (error) {
    if (connection) await connection.end();
    res.status(500).json({ error: error.message });
  }
}