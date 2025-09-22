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

        // Fetch extracurricular activities
        const [rows] = await connection.execute(
            `SELECT id, title, volume, issue, academic_year, publish_date, pdf_url as document_url, dept, status
             FROM cai_extracurricular_activities 
             WHERE dept = ? AND status = 'approved'
             ORDER BY academic_year DESC, volume DESC, issue DESC`,
            [dept]
        );

        await connection.end();

        // Group activities by academic year
        const groupedActivities = (rows as any[]).reduce((acc, activity) => {
            const year = activity.academic_year;
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(activity);
            return acc;
        }, {});

        // Format response similar to other APIs
        const activities = Object.entries(groupedActivities).map(([year, items]) => ({
            academic_year: year,
            items: items
        }));

        res.status(200).json({
            success: true,
            department: dept,
            data: activities,
            total: (rows as any[]).length
        });

    } catch (error) {
        console.error("Error fetching extracurricular activities:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch extracurricular activities"
        });
    }
}