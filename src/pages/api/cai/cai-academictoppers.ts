import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Using connection pool
        const rows: any = await executeQuery(
            "SELECT * FROM cai_merit_scholarships WHERE dept IN ('cseai', 'cse-ai', 'CSE-AI') ORDER BY academic_year DESC, id DESC"
        );
res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch merit scholarships data', details: error });
    }
}

