import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const scholarships = await db.query('SELECT * FROM cse_merit_scholarships');
      res.status(200).json(scholarships.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
