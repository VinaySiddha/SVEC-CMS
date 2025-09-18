import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT student_name, achievement_type, title, description, document_url, achievement_date, status 
            FROM ds_student_achievements 
            WHERE status = 'active' 
            ORDER BY achievement_date DESC
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS student achievements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}