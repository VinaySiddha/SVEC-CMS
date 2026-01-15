import { executeQuery } from '@/lib/dbPool';

export default async function handler(req, res) {
  try {
    const rows = await executeQuery('SELECT type,label,year,url FROM ece_extracurricular_activities ORDER BY id');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching extracurricular activities data:", error);
    res.status(500).json({ error: error.message });
  }
}
