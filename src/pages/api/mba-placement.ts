import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'mba' } = req.query as { dept?: string };

    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });

        // Use generic placement_batches table and map fields to expected shape
        const [rows] = await connection.execute(
            `SELECT academic_year, document_url AS report_url 
       FROM placement_batches 
       WHERE department = ? AND is_active = TRUE
       ORDER BY display_order ASC, academic_year DESC`,
            [dept]
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching MBA placements:', error);
        res.status(500).json({ error: 'Failed to fetch MBA placements' });
    }
}