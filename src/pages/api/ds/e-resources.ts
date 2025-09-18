import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT title, description, resource_url, resource_type, status 
            FROM ds_eresources 
            WHERE status = 'active' 
            ORDER BY resource_type, title
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS e-resources:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}