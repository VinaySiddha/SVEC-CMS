import type { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const rows: any = await executeQuery(
                "SELECT * FROM ect_hackathons ORDER BY academic_year DESC"
            );
            
            // Gallery is now a VARCHAR field (comma-separated URLs)
            const hackathons = (rows as any[]).map(row => ({
                ...row,
                gallery: row.gallery || '' // Keep as string, no JSON parsing needed
            }));
            
            res.status(200).json(hackathons);
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('ECT Hackathons API Error:', error);
        res.status(500).json({ error: 'Failed to fetch ECT hackathons data', details: error });
    }
}
