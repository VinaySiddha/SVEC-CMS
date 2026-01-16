import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });
    const [rows] = await connection.execute(
      'SELECT id, hod_name, hod_image_url, hod_designation, hod_mobile, hod_phone, hod_email, hod_message, department_overview FROM bsh_department_profile LIMIT 1'
    );
    await connection.end();
    if (Array.isArray(rows) && rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Database error', error: (error as Error).message });
  }
}