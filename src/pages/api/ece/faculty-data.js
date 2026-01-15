import { executeQuery } from '@/lib/dbPool';

export default async function handler(req, res) {
  try {
    const rows = await executeQuery('SELECT name, qualification, designation, profileUrl as profile_url, date_of_joining FROM ece_faculty ORDER BY id');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching ECE faculty:', error);
    res.status(500).json({ error: error.message });
  }
}