import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  const [eresources] = await connection.execute('SELECT * FROM cst_eresources ORDER BY regulation, semester, display_order');
  await connection.end();

  res.status(200).json({ eresources });
}