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

        // Fetch e-resources data
        const [rows] = await connection.execute(
            `SELECT id, regulation, semester, subject_name, file_url, file_type, 
                    academic_year, dept, status
             FROM cai_eresources
             WHERE dept = ? AND status = 'approved'
             ORDER BY regulation DESC, 
                      CASE semester 
                        WHEN 'I' THEN 1 
                        WHEN 'I/II' THEN 1.5
                        WHEN 'II' THEN 2 
                        WHEN 'III' THEN 3 
                        WHEN 'IV' THEN 4 
                        WHEN 'V' THEN 5 
                        WHEN 'VI' THEN 6 
                        ELSE 99 
                      END,
                      subject_name`,
            [dept]
        );

        await connection.end();

        // Group by regulation
        const groupedByRegulation = (rows as any[]).reduce((acc, resource) => {
            const regulation = resource.regulation;
            if (!acc[regulation]) {
                acc[regulation] = [];
            }
            acc[regulation].push({
                id: resource.id,
                semester: resource.semester,
                title: resource.subject_name,
                file_url: resource.file_url,
                file_type: resource.file_type,
                academic_year: resource.academic_year
            });
            return acc;
        }, {});

        // Format response similar to other APIs
        const data = Object.entries(groupedByRegulation).map(([regulation, items]) => ({
            category: regulation,
            items: items
        }));

        res.status(200).json({
            success: true,
            department: dept,
            data: data,
            total: (rows as any[]).length
        });

    } catch (error) {
        console.error("Error fetching e-resources:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch e-resources data"
        });
    }
}