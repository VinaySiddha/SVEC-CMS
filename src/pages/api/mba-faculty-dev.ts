import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'mba' } = req.query as { dept?: string };

    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms',
        });

        const [rows] = await connection.execute(
            `SELECT title,file_url
       FROM faculty_development_programs
       WHERE dept = ?`,
            [dept]
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching MBA faculty development programs:', error);
        res.status(500).json({ error: 'Failed to fetch MBA faculty development programs' });
    }
}
