import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { dept = "cseai" } = req.query as { dept?: string };

    try {
        const connection = await mysql.createConnection({
            host: "62.72.31.209",
            user: "cmsuser",
            password: "V@savi@2001",
            database: "svec_cms",
        });

        // All facilities fetch
        const [rows] = await connection.execute(
            `SELECT id, department, category, name, description
       FROM civil_physical_facilities
       WHERE department = ?`,
            [dept]
        );

        await connection.end();

        // Grouping data
        const facilities = {
            classTimetables: (rows as any[]).filter((r) => r.category === "Class Timetable"),
            classRooms: (rows as any[]).filter(
                (r) => r.category === "Physical Facilities" && r.name.toLowerCase().includes("class room")
            ),
            laboratories: (rows as any[]).filter(
                (r) => r.category === "Physical Facilities" && r.name.toLowerCase().includes("laboratory")
            ),
            seminarHalls: (rows as any[]).filter(
                (r) => r.category === "Physical Facilities" && r.name.toLowerCase().includes("seminar")
            ),
            library: (rows as any[]).filter(
                (r) => r.category === "Physical Facilities" && r.name.toLowerCase().includes("library")
            ),
        };

        res.status(200).json({
            department: dept,
            facilities,
        });
    } catch (error) {
        console.error("Error fetching physical facilities:", error);
        res.status(500).json({ error: "Failed to fetch facilities" });
    }
}
