import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const facilities = await db.query('SELECT * FROM cse_physical_facilities');
      res.status(200).json(facilities.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
