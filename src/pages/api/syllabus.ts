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

        let query, params;
        
        if (dept === 'mba') {
            // Use mba_syllabus table for MBA department
            query = "SELECT course_name as title, academic_year as year, file_url as pdf_url, syllabus_type as category FROM mba_syllabus WHERE status = 'active' ORDER BY academic_year DESC, course_name";
            params = [];
        } else {
            // Use generic syllabus table for other departments
            query = "SELECT * FROM syllabus WHERE dept = ? ORDER BY category, year DESC";
            params = [dept];
        }

        const [rows] = await connection.execute(query, params);

        await connection.end();

        res.status(200).json(rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch syllabus data" });
    }
}
