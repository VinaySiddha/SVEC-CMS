import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms',
        });

        const [rows] = await connection.execute(
            "SELECT id, section_name, title, content FROM department_profile_sections WHERE dept = ? ORDER BY id ASC",
            ['cseai']
        );

        await connection.end();

        res.status(200).json({
            success: true,
            sections: rows,
        });
    } catch (error) {
        console.error('DB Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch department profile data',
            details: error,
        });
    }
}
