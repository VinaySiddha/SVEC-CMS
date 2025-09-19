import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { section } = req.query;

    try {
        let result;
        
        if (section) {
            // Get specific section
            result = await query(`
                SELECT section_name, title, content, is_list, status 
                FROM ds_department_profile 
                WHERE section_name = ? AND status = 'active'
            `, [section]);
        } else {
            // Get all sections
            result = await query(`
                SELECT section_name, title, content, is_list, status 
                FROM ds_department_profile 
                WHERE status = 'active' 
                ORDER BY 
                    CASE section_name 
                        WHEN 'Department' THEN 1 
                        WHEN 'Vision' THEN 2 
                        WHEN 'Mission' THEN 3 
                        WHEN 'PEOs' THEN 4 
                        WHEN 'POs' THEN 5 
                        WHEN 'PSOs' THEN 6 
                        WHEN 'COs' THEN 7 
                        WHEN 'SalientFeatures' THEN 8 
                        ELSE 9 
                    END
            `);
        }

        // Process the content to handle list items
        const processedResult = result.map((item: any) => ({
            ...item,
            content: item.is_list ? item.content.split('|') : item.content
        }));

        res.status(200).json(section ? processedResult[0] || null : processedResult);
    } catch (error) {
        console.error('Error fetching DS department profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}