// pages/api/mba-faculty-achivements.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const connection = await mysql.createConnection({
            host: "62.72.31.209",
            user: "cmsuser",
            password: "V@savi@2001",
            database: "svec_cms",
        });

        // get type from query if provided
        const { type } = req.query;

        let query = "SELECT * FROM mba_faculty_achievements";
        let values: any[] = [];

        if (type) {
            query += " WHERE achievement_type = ?";
            values.push(type);
        }

        query += " ORDER BY year DESC";

        const [rows] = await connection.execute(query, values);

        await connection.end();

        res.status(200).json(rows);
    } catch (error: any) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Failed to fetch faculty achievements" });
    }
}
