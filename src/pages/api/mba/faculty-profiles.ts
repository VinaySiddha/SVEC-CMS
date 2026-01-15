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
        `SELECT id, name, qualification, designation, profileUrl as profile_url FROM mba_faculty
        ORDER BY 
            CASE 
                WHEN designation = 'Lecturer' THEN 4
                WHEN designation = 'Assistant Professor' THEN 3
                WHEN designation = 'Sr. Assistant Professor' THEN 2
                WHEN designation = 'Associate Professor' THEN 1
                WHEN designation = 'Professor' THEN 0
                ELSE 5
            END DESC`
    ) as any;

    // The URLs in database already have /uploads/mba/faculty/ prefix, so just return as-is
    await connection.end();
    res.status(200).json(rows);
}