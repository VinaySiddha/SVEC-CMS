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
            `SELECT * FROM mba_workshops ORDER BY created_at DESC`
        );

        await connection.end();

        // Group by category
        const grouped: Record<string, any[]> = {};
        (rows as any[]).forEach((r) => {
            const cat = r.category || 'Workshops';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(r);
        });

        res.status(200).json(grouped);
    } catch (error) {
        console.error('Error fetching MBA workshops:', error);
        res.status(500).json({ error: 'Failed to fetch MBA workshops' });
    }
}
