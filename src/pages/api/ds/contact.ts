import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT contact_type, name, designation, email, phone, address, status 
            FROM ds_contact 
            WHERE status = 'active' 
            ORDER BY contact_type, name
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS contact information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}