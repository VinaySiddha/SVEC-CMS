import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const sidebarItems = [
            'Department Profile',
            'Faculty Profiles',
            'Board of Studies',
            'Syllabus',
            'Physical Facilities',
            'Department Library',
            'MoUs',
            'Faculty Development Programs',
            'Faculty Achievements',
            'Workshops',
            'Student Achievements',
            'Placements',
            'Merit Scholarship/Academic Toppers',
            'Technical Association',
            'Training Activities',
            'Newsletters',
            'Extra-Curricular Activities',
            'Hackathons',
            'e-Resources',
            'Handbooks',
            'Contact'
        ];

        res.status(200).json(sidebarItems);
    } catch (error) {
        console.error('Error fetching DS sidebar items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}