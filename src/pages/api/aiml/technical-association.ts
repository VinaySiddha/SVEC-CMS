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
    `SELECT title,description, document_url
       FROM ds_technical_association
      WHERE dept = ?`,
    [dept]
  );

  await connection.end();

  // 2. Group rows by title
  const grouped: Record<string, { text: string; url: string }[]> = {};
  (rows as any[]).forEach(row => {
    if (!grouped[row.title]) grouped[row.title] = [];
    grouped[row.title].push({
      text: `${row.description}`,
      url: row.document_url,
    });
  });

  // 3. Convert to desired array
  const output = Object.entries(grouped).map(([title, items]) => ({
    title,
    items,
  }));

  res.status(200).json(output);
}