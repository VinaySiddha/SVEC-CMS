import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept } = req.query;
    if (!dept || typeof dept !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid dept parameter' });
    }

    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    // Technical Staff
    // Fetch Technical Staff members for the specified department
    const [technicalRows] = await connection.execute(
        'SELECT name, designation, status, created_at FROM technical_staff WHERE dept = ?',
        [dept]
    );

    await connection.end();

    res.status(200).json({
        technical: technicalRows
    });
}
