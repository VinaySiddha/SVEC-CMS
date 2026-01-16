import { executeQuery } from '@/lib/dbPool';

export default async function handler(req, res) {
  try {
    const rows = await executeQuery('SELECT id, meeting_no, meeting_date, file_url FROM ece_bos_minutes ORDER BY meeting_date DESC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
