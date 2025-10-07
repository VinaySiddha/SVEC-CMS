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

  try {

    const [galleries] = await connection.execute(
      `SELECT g.id, g.title,
              JSON_ARRAYAGG(JSON_OBJECT('id', i.id, 'image_url', i.image_url, 'alt_text', i.alt_text)) AS images
         FROM academic_toppers_galleries g
    LEFT JOIN academic_toppers_gallery_images i ON g.id = i.gallery_id
        WHERE g.dept = ?
     GROUP BY g.id, g.title
     ORDER BY g.id ASC`,
      [dept]
    );

    await connection.end();

    res.status(200).json({
      dept,
      galleries: (galleries as any[]).map(g => ({
        id: g.id,
        title: g.title,
        images: g.images  // ✅ No parsing required
      }))
    });
  } catch (err) {
    await connection.end();
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}