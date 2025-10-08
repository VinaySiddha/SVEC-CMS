import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const library = await db.query('SELECT * FROM cse_department_library');
      res.status(200).json(library.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
