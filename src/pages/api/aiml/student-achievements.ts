import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dept } = req.query;
  if (!dept || typeof dept !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid dept parameter' });
  }

  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  // 1. Fetch flat rows
  const [rows] = await connection.execute(
    `SELECT category,description, proof_url
       FROM aiml_student_achievements
      WHERE dept = ?`,
    [dept]
  );

  await connection.end();

  // 2. Group rows by title
  const grouped: Record<string, { text: string; url: string }[]> = {};
  (rows as any[]).forEach(row => {
    if (!grouped[row.category]) grouped[row.category] = [];
    grouped[row.category].push({
      text: `${row.description}`,
      url: row.proof_url,
    });
  });

  // 3. Convert to desired array
  const output = Object.entries(grouped).map(([title, items]) => ({
    title,
    items,
  }));

  res.status(200).json(output);
}
