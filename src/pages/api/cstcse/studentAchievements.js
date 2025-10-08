import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { dept = 'CSE' } = req.query;
  const connection = await mysql.createConnection({
 host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
  });

  try {
    // If you want to filter by department, add a dept column to your table and filter here
    const [rows] = await connection.execute(
      'SELECT id, category, title, description, fileUrl, academic_year FROM cse_student_achievements ORDER BY display_order ASC'
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}