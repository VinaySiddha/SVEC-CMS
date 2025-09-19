import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT batch_year, company_name, student_name, package_offered, document_url, status 
            FROM ds_placements 
            WHERE status = 'active' 
            ORDER BY batch_year DESC, company_name
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS placements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}