import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'civil' } = req.query as { dept?: string };

    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms',
        });

        const [rows] = await connection.execute(
            `SELECT id, academic_year, title, file_url, description
       FROM department_eresources
       WHERE department = ? AND (is_active IS NULL OR is_active = TRUE)
       ORDER BY academic_year DESC, title ASC`,
            [dept]
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Civil e-resources' });
    }
}
