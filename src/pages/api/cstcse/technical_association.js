import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const association = await db.query('SELECT * FROM cse_technical_association');
      res.status(200).json(association.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
