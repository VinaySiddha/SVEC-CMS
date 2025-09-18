import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'mba' } = req.query as { dept?: string };

    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms',
        });

        const [rows] = await connection.execute(
            `SELECT id, category, title, description, file_url, file_type, academic_year, semester
       FROM department_eresources
       WHERE department = ? AND (is_active IS NULL OR is_active = TRUE)
       ORDER BY academic_year DESC, display_order ASC`,
            [dept]
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching MBA e-resources:', error);
        res.status(500).json({ error: 'Failed to fetch MBA e-resources' });
    }
}
