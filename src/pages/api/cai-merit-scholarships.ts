import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });

        const [scholarships] = await connection.execute(
            "SELECT * FROM cai_merit_scholarships WHERE dept = ? ORDER BY academic_year DESC",
            ['cseai']
        );

        const [images] = await connection.execute(
            "SELECT * FROM merit_images WHERE dept = ?",
            ['cseai']
        );

        await connection.end();

        res.status(200).json({
            scholarships,
            images
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch merit scholarship data', details: error });
    }
}