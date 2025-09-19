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
      'SELECT * FROM cst_physical_facilities WHERE dept="cst" ORDER BY category, id ASC'
    );

    rows.forEach(r => {
      if (typeof r.gallery === 'string' && r.gallery.trim() !== '') {
        try { r.gallery = JSON.parse(r.gallery); } catch { r.gallery = []; }
      } else if (!Array.isArray(r.gallery)) { r.gallery = []; }
      if (typeof r.lab_details === 'string' && r.lab_details.trim() !== '') {
        try { r.lab_details = JSON.parse(r.lab_details); } catch { r.lab_details = []; }
      } else if (!Array.isArray(r.lab_details)) { r.lab_details = []; }
    });

    await connection.end();
    res.status(200).json({ facilities: rows });
  } catch (error) {
    if (connection) await connection.end();
    res.status(500).json({ error: error.message });
  }
}