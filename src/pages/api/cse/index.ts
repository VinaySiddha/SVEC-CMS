import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cstModules = {
      "CSE Department API Endpoints": {
        "Base URL": "/api/cse/",
        "Available Endpoints": [
          "cst-faculty",
          "cst-bos-members", 
          "cst-bos-minutes",
          "cst-department-library",
          "cst-department-overview",
          "cst-eresources",
          "cst-extra-curricular",
          "cst-faculty-achievements",
          "cst-faculty-development",
          "cst-gate",
          "cst-hackathons",
          "cst-handbooks",
          "cst-industry-programs",
          "cst-merit-scholarships",
          "cst-mous",
          "cst-newsletters",
          "cst-physical-facilities",
          "cst-placements",
          "cst-roll-of-honour",
          "cst-sahaya-events",
          "cst-scud-activities",
          "cst-student-achievements",
          "cst-syllabus",
          "cst-training-activities"
        ],
        "Total Modules": 24,
        "Database Tables": "All endpoints map to corresponding cst_* tables",
        "Methods Supported": "GET (Read operations)",
        "Documentation": "Each endpoint returns JSON data from respective CSE department tables"
      }
    };

    res.status(200).json(cstModules);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}