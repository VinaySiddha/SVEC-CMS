import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'mba' } = req.query;

    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms',
        });

        const [rows] = await connection.execute(
            `SELECT member_name, designation, organization, role, dept, status, created_at 
       FROM board_of_studies 
       WHERE dept = ?`,
            [dept]
        );

        await connection.end();

        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        console.error('Error fetching Board of Studies:', error);
        res.status(500).json({ error: 'Failed to fetch Board of Studies data' });
    }
}
