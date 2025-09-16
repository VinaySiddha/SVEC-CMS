import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'cseai' } = req.query;

    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    // Technical Staff
    const [technicalRows] = await connection.execute(
        'SELECT name, designation, status, created_at FROM technical_staff WHERE dept = ?',
        [dept]
    );

    await connection.end();

    res.status(200).json({
        technical: technicalRows
    });
}
