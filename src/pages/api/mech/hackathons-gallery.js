import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    // First, try to fetch with exact category match, then fallback to all records
    const [rows] = await connection.execute(
      'SELECT id, category, academic_year, gallery, created_at FROM mech_hackathons_gallery ORDER BY created_at DESC'
    );
    
    // Filter for Placements category if it exists, otherwise return all
    const placementsData = rows.filter((row) => 
      row.category && row.category.toLowerCase().includes('placements')
    );
    
    res.status(200).json(placementsData.length > 0 ? placementsData : rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
