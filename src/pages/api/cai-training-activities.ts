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
            "SELECT academic_year, title, pdf_url FROM cai_training_activities WHERE dept = ? ORDER BY academic_year DESC",
            ['cseai']
        );

        const [gallery] = await connection.execute(
            "SELECT image_url, alt_text FROM cai_training_gallery WHERE dept = ?",
            ['cseai']
        );

        await connection.end();

        res.status(200).json({
            activities,
            gallery
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch training activity data', details: error });
    }
}