import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const syllabus = await db.query('SELECT * FROM cse_syllabus');
      res.status(200).json(syllabus.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
