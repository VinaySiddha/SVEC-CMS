import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Using connection pool
        
        // Fetch hackathons from cai_hackathons table
        const rows: any = await executeQuery(
            "SELECT * FROM cai_hackathons ORDER BY id DESC"
        );
        
        // Process gallery field - convert comma-separated string to array
        const hackathons = (rows as any[]).map(h => ({
            ...h,
            gallery: h.gallery ? h.gallery.split(',').map((url: string) => url.trim()).filter(Boolean) : []
        }));
        
        res.status(200).json(hackathons);
    } catch (error) {
        console.error('CAI Hackathons API Error:', error);
        res.status(500).json({ error: 'Failed to fetch CAI hackathons data', details: error });
    }
}
