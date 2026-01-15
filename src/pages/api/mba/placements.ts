import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = 'mba' } = req.query as { dept?: string };
    let connection: mysql.Connection | null = null;

    try {
        connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });

        // Use placement reports table for yearly reports
        const [rows] = await connection.execute(
            `SELECT id, title, batch, file_url
             FROM mba_placements
             ORDER BY batch DESC`
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching MBA placements:', error);
        res.status(500).json({ error: 'Failed to fetch MBA placements' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}