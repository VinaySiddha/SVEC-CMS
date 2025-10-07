import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const faculty = await db.query('SELECT * FROM cse_faculty');
      res.status(200).json(faculty.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
