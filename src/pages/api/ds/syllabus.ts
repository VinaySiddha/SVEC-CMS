import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT year, semester, title, file_url, status 
            FROM ds_syllabus 
            WHERE status = 'active' 
            ORDER BY year, semester
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS syllabus:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}