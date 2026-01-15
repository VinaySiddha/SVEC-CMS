import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const ectModules = {
      "ECT Department API Endpoints": {
        "Base URL": "/api/ect/",
        "Available Endpoints": [
          "ect-faculty",
          "ect-bos-members", 
          "ect-bos-minutes",
          "ect-department-library",
          "ect-department-overview",
          "ect-eresources",
          "ect-extra-curricular",
          "ect-faculty-achievements",
          "ect-faculty-development",
          "ect-gate",
          "ect-hackathons",
          "ect-handbooks",
          "ect-industry-programs",
          "ect-merit-scholarships",
          "ect-mous",
          "ect-newsletters",
          "ect-physical-facilities",
          "ect-placements",
          "ect-roll-of-honour",
          "ect-sahaya-events",
          "ect-scud-activities",
          "ect-student-achievements",
          "ect-syllabus",
          "ect-training-activities",
          "ect-workshops"
        ],
        "Total Modules": 25,
        "Database Tables": "All endpoints map to corresponding ect_* tables",
        "Methods Supported": "GET (Read operations)",
        "Documentation": "Each endpoint returns JSON data from respective ECT department tables"
      }
    };

    res.status(200).json(ectModules);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
