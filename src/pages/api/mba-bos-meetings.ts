import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'mba' } = req.query as { dept?: string };

    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });

        const [rows] = await connection.execute(
            `SELECT meeting_number, meeting_date, document_url, id
       FROM board_of_studies
       WHERE dept = ? AND is_active = TRUE
       ORDER BY meeting_date DESC, display_order ASC`,
            [dept]
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching MBA BOS meetings:', error);
        res.status(500).json({ error: 'Failed to fetch MBA BOS meetings' });
    }
}
