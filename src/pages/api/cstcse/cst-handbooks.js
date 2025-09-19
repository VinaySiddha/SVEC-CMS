import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });
  const [handbooks] = await connection.execute('SELECT * FROM cst_handbooks WHERE dept = ?', ['cst']);
  await connection.end();
  res.status(200).json({ handbooks });
}