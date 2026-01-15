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
            `SELECT 
                meeting_no AS meeting_number,
                meeting_date,
                file_url AS document_url,
                id
             FROM mba_bos_minutes
            
             ORDER BY meeting_date DESC`
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching MBA BOS meetings:', error);
        res.status(500).json({ error: 'Failed to fetch MBA BOS meetings' });
    }
}
