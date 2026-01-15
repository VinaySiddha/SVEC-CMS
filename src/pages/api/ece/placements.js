import { executeQuery } from '@/lib/dbPool';

export default async function handler(req, res) {
  try {
    const rows = await executeQuery('SELECT year,url FROM ece_placements ORDER BY year DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching placements data:", error);
    res.status(500).json({ error: error.message });
  }
}
