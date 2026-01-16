import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    const [rows] = await connection.execute('SELECT id, meeting_no, meeting_date, file_url FROM mech_bos_minutes ORDER BY meeting_date DESC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
