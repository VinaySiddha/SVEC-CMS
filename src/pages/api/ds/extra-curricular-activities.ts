import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT title, description, document_url, event_date, status 
            FROM ds_extracurricular 
            WHERE status = 'active' 
            ORDER BY event_date DESC
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS extra-curricular activities:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}