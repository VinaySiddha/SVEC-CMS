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
            `SELECT id, activity_name, activity_type, event_date, venue, description, document_url
       FROM extra_curricular_activities
       WHERE department = ? AND (is_active IS NULL OR is_active = TRUE)
       ORDER BY event_date DESC, display_order ASC`,
            [dept]
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching MBA extra-curricular activities:', error);
        res.status(500).json({ error: 'Failed to fetch MBA extra-curricular activities' });
    }
}
