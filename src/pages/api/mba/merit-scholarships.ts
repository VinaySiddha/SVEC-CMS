import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms',
        });

        const [rows] = await connection.execute(
            `SELECT * FROM mba_merit_scholarships 
       WHERE dept = 'mba' 
       ORDER BY academic_year DESC, id DESC`
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching MBA merit scholarships:', error);
        res.status(500).json({ error: 'Failed to fetch MBA merit scholarships' });
    }
}