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
            'SELECT name, designation FROM mba_non_teaching_faculty order by id'
        );

        await connection.end();
        res.status(200).json({ nonTeaching: rows });
    } catch (error) {
        console.error('Error fetching MBA non-teaching staff:', error);
        res.status(500).json({ error: 'Failed to fetch MBA non-teaching staff' });
    }
}
