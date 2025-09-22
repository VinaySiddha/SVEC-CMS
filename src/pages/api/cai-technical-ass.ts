import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });

        const [activities] = await connection.execute(
            "SELECT academic_year, title, pdf_url FROM cai_scud_activities WHERE dept = ? ORDER BY academic_year DESC",
            ['cseai']
        );

        const [gallery] = await connection.execute(
            "SELECT event_name, image_url, alt_text FROM cai_scud_gallery WHERE dept = ? ORDER BY event_name",
            ['cseai']
        );

        await connection.end();

        res.status(200).json({
            activities,
            gallery
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch SCUD data', details: error });
    }
}