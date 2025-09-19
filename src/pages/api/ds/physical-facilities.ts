import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT category, title, description, document_url, status 
            FROM ds_physical_facilities 
            WHERE status = 'active' 
            ORDER BY category, title
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS physical facilities:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}