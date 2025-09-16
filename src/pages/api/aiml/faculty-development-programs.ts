import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// This API supports any department via the ?dept= query parameter (e.g., ?dept=aiml, ?dept=cseai)
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

    // Table: faculty_development_programs, columns: id, dept, title, year, file_url
    const [rows] = await connection.execute(
        'SELECT id, dept, title, year, file_url FROM faculty_development_programs WHERE dept = ?',
        [dept]
    );

    await connection.end();
    res.status(200).json(rows);
}
