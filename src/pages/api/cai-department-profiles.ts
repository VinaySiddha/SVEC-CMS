import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms',
        });

        const [rows] = await connection.execute(
            `SELECT meeting_number, meeting_date, document_url, id
       FROM bos_meeting_minutes
       WHERE dept = ? AND status = 'active'
       ORDER BY meeting_date DESC, meeting_number ASC`,
            [dept]
        );

        await connection.end();

        res.status(200).json({
            success: true,
            sections: rows,
        });
    } catch (error) {
        console.error('DB Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch department profile data',
            details: error,
        });
    }
}
