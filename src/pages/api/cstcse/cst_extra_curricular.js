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
      'SELECT * FROM cst_extra_curricular WHERE dept="cst"'
    );

    rows.forEach(r => {
      try {
        r.gallery = Array.isArray(r.gallery)
          ? r.gallery
          : r.gallery
          ? JSON.parse(r.gallery)
          : [];
      } catch {
        r.gallery = [];
      }
      try {
        r.sahaya_events = Array.isArray(r.sahaya_events)
          ? r.sahaya_events
          : r.sahaya_events
          ? JSON.parse(r.sahaya_events)
          : [];
      } catch {
        r.sahaya_events = [];
      }
    });

    await connection.end();
    res.status(200).json({ activities: rows });
  } catch (error) {
    if (connection) await connection.end();
    res.status(500).json({ error: error.message });
  }
}