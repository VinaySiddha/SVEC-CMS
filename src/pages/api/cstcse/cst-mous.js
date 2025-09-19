import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  const [mous] = await connection.execute('SELECT * FROM cst_mous ORDER BY from_date DESC');
  const [industryPrograms] = await connection.execute('SELECT * FROM cst_industry_programs ORDER BY academic_year DESC');
  await connection.end();

  res.status(200).json({ mous, industryPrograms });
}