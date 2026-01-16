import { executeQuery } from '@/lib/dbPool';

export default async function handler(req, res) {
  try {
    const rows = await executeQuery('SELECT type,year,title,url FROM ece_fdp ORDER BY year DESC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
