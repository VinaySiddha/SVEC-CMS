import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// API for fetching board of studies members for any department via ?dept= query parameter
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

    // Adjust the table/column names as per your schema
    const [rows] = await connection.execute(
        'SELECT member_name, designation, organization,role FROM board_of_studies WHERE dept = ?',
        [dept]
    );

    await connection.end();
    res.status(200).json(rows);
}
