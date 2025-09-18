import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT title, description, file_url, handbook_type, status 
            FROM ds_handbooks 
            WHERE status = 'active' 
            ORDER BY handbook_type, title
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS handbooks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}