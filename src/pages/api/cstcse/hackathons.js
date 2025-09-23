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
    const [rows] = await connection.execute(
      'SELECT id, academic_year, brochure_url, winners_url, gallery FROM cst_hackathons WHERE dept = ? ORDER BY academic_year DESC',
      [dept]
    );
    // Parse gallery JSON for each row
    const hackathons = rows.map(row => ({
      ...row,
      gallery: row.gallery ? JSON.parse(row.gallery) : []
    }));
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}