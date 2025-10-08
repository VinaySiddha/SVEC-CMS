import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const activities = await db.query('SELECT * FROM cse_extra_curricular');
      res.status(200).json(activities.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
