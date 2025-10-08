import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const staff = await db.query('SELECT * FROM cse_staff');
      res.status(200).json(staff.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
