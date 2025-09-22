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

        // Fetch hackathons data
        const [hackathons] = await connection.execute(
            `SELECT h.id, h.academic_year, h.title, h.description, h.brochure_url, 
                    h.winners_url, h.event_date, h.dept, h.status
             FROM cai_hackathons h
             WHERE h.dept = ? AND h.status = 'approved'
             ORDER BY h.academic_year DESC`,
            [dept]
        );

        // Fetch gallery images
        const [gallery] = await connection.execute(
            `SELECT hg.hackathon_id, hg.academic_year, hg.image_url, hg.alt_text, hg.caption
             FROM cai_hackathon_gallery hg
             WHERE hg.dept = ?
             ORDER BY hg.academic_year DESC`,
            [dept]
        );

        await connection.end();

        res.status(200).json({
            success: true,
            department: dept,
            hackathons: hackathons,
            gallery: gallery,
            total: (hackathons as any[]).length
        });

    } catch (error) {
        console.error("Error fetching hackathons:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch hackathons data" 
        });
    }
}