import mysql from "mysql2/promise";
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept } = req.query; // dynamically get department

    try {
        const connection = await mysql.createConnection({
            host: "62.72.31.209",
            user: "cmsuser",
            password: "V@savi@2001",
            database: "svec_cms",
        });

        const [rows] = await connection.execute(
            "SELECT * FROM syllabus WHERE dept = ? ORDER BY category, year DESC",
            [dept]   // safely bind dept
        );

        await connection.end();

        res.status(200).json(rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch syllabus data" });
    }
}
