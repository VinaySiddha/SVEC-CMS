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
            `SELECT id, category, title, description, academic_year, proof_document_url
       FROM student_achievements
       WHERE department = ? AND (status IS NULL OR status = 'Active')
       ORDER BY academic_year DESC, category ASC, id DESC`,
            [dept]
        );

        await connection.end();

        const grouped: Record<string, any[]> = {};
        (rows as any[]).forEach((r) => {
            if (!grouped[r.category]) grouped[r.category] = [];
            grouped[r.category].push(r);
        });

        res.status(200).json(grouped);
    } catch (error) {
        console.error('Error fetching Civil student achievements:', error);
        res.status(500).json({ error: 'Failed to fetch Civil student achievements' });
    }
}
