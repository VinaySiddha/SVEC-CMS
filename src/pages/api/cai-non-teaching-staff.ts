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

    try {
        const [nonTeachingRows] = await connection.execute(
            'SELECT name, designation, status, created_at FROM non_teaching_staff WHERE dept = ?',
            [dept]   // ✅ dynamic instead of hardcoded
        );

        res.status(200).json({ nonTeaching: nonTeachingRows });
    } catch (error: any) {
        res.status(500).json({ error: 'Database query failed', details: error.message });
    } finally {
        await connection.end();
    }
}
