import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  const [faculty] = await connection.execute('SELECT * FROM cst_faculty order by Qualification DESC');
  const [technical] = await connection.execute('SELECT * FROM cst_technical_faculty');
  const [nonTeaching] = await connection.execute('SELECT * FROM cst_non_teaching_faculty');

  await connection.end();

  res.status(200).json({
    faculty,
    technical,
    nonTeaching,
  });
}