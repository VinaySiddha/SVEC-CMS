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

    const [members] = await connection.execute(
      'SELECT * FROM cst_bos_members WHERE dept="cst" ORDER BY id ASC'
    );
    const [minutes] = await connection.execute(
      'SELECT * FROM cst_bos_minutes WHERE dept="cst" ORDER BY meeting_date DESC'
    );

    await connection.end();
    res.status(200).json({ members, minutes });
  } catch (error) {
    if (connection) await connection.end();
    res.status(500).json({ error: error.message });
  }
}