import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });
        
        const [rows] = await connection.execute(
            "SELECT * FROM cst_hackathons ORDER BY academic_year DESC"
        );
        
        // Gallery is now a VARCHAR field (comma-separated URLs)
        const hackathons = (rows as any[]).map(row => ({
            ...row,
            gallery: row.gallery || '' // Keep as string, no JSON parsing needed
        }));
        
        await connection.end();
        res.status(200).json(hackathons);
    } catch (error) {
        console.error('CST Hackathons API Error:', error);
        res.status(500).json({ error: 'Failed to fetch CST hackathons data', details: error });
    }
}