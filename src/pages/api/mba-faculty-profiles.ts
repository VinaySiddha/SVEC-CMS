import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'mba' } = req.query;

    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    const [rows] = await connection.execute(
        'SELECT name, qualification, designation, profile_url, dept, status, created_at FROM faculty_profiles WHERE dept = ?',
        [dept]
    );

    await connection.end();
    res.status(200).json(rows);
}