import { executeQuery } from '@/lib/dbPool';

export default async function handler(req, res) {
  try {
    const rows = await executeQuery('SELECT club,event,description,url FROM ece_clubs ORDER BY id');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching clubs data:", error);
    res.status(500).json({ error: error.message });
  }
}
