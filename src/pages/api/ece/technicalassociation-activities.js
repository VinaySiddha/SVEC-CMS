import { executeQuery } from '@/lib/dbPool';

export default async function handler(req, res) {
  try {
    const rows = await executeQuery('SELECT type,year,title,url FROM ece_technicalAssociation_trainingActivities ORDER BY id');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching technical association activities data:", error);
    res.status(500).json({ error: error.message });
  }
}
