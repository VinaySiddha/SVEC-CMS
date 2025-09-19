import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT name, qualification, designation, profile_url, email, phone, is_hod, status 
            FROM ds_faculty 
            WHERE status = 'active' 
            ORDER BY is_hod DESC, designation, name
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS faculty:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}