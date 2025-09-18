import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const result = await query(`
            SELECT name, designation, organization, position, status 
            FROM ds_board_of_studies 
            WHERE status = 'active' 
            ORDER BY 
                CASE position 
                    WHEN 'Chairperson' THEN 1 
                    WHEN 'University Nominee' THEN 2 
                    WHEN 'Academic Expert' THEN 3 
                    WHEN 'Industry Expert' THEN 4 
                    WHEN 'Alumni' THEN 5 
                    ELSE 6 
                END, name
        `);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching DS board of studies:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}