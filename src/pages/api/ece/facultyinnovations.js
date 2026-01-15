import { executeQuery } from '@/lib/dbPool';

export default async function handler(req, res) {
  try {
    const rows = await executeQuery('SELECT category,title,description,items,links FROM ece_faculty_innovations ORDER BY id');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching faculty innovations data:", error);
    res.status(500).json({ error: error.message });
  }
}
