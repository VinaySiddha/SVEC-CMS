import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const mous = await db.query('SELECT * FROM cse_mous');
      res.status(200).json(mous.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
