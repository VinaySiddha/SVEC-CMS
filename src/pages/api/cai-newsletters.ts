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

        const [newsletters] = await connection.execute(
            `SELECT 
         id,
         title,
         volume,
         issue,
         academic_year,
         publish_date,
         document_url 
       FROM newsletters 
       WHERE dept = ? AND status = 'approved' 
       ORDER BY publish_date DESC`,
            ['cseai']
        );

        await connection.end();

        res.status(200).json({ newsletters });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch newsletters', details: error });
    }
}