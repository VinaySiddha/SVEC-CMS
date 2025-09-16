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

  const [rows] = await connection.execute(
  `SELECT academic_year, sem_type, title, description, document_url
     FROM handbooks
    WHERE dept = ? AND status = 'published'`,
  [dept]
);

await connection.end();

// Assert rows as an array of objects
const grouped = (rows as any[]).reduce((acc: any, row: any) => {
  const groupKey = `Academic Year ${row.academic_year}`;
  if (!acc[groupKey]) {
    acc[groupKey] = [];
  }
  acc[groupKey].push({
    text: row.title,
    url: row.document_url,
    sem_type: row.sem_type,
  });
  return acc;
}, {});

// Convert grouped data to an array format for the API response
const output = Object.entries(grouped).map(([group, items]) => ({
  group,
  items,
}));

res.status(200).json(output);
}
