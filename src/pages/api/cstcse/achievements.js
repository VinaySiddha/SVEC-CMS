import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const achievements = await db.query('SELECT * FROM cse_achievements');
      res.status(200).json(achievements.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
