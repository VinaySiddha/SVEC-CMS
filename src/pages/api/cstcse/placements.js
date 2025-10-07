import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const placements = await db.query('SELECT * FROM cse_placements');
      res.status(200).json(placements.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
