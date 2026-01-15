import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    const [rows] = await connection.execute('SELECT id,category,title,file_url FROM ece_faculty_achievements ORDER BY created_at DESC');
    res.status(200).json(Array.isArray(rows) ? rows : []);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  } catch (error) {
    console.error("Error fetching faculty achievements data:", error);
    // Return empty array on error instead of 500
    res.status(200).json([]);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
