import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cstModules = {
      "CST Department API Endpoints": {
        "Base URL": "/api/cst/",
        "Available Endpoints": [
          "cst-faculty",
          "cst-technical-faculty",
          "cst-non-teaching-faculty",
          "cst-bos-members", 
          "cst-bos-minutes",
          "cst-department-library",
          "cst-department-overview",
          "cst-eresources",
          "cst-extra-curricular",
          "cst-extra-curricular-gallery",
          "cst-faculty-achievements",
          "cst-faculty-development",
          "cst-faculty-development-gallery",
          "cst-gate",
          "cst-gate-gallery",
          "cst-hackathons",
          "cst-hackathons-gallery",
          "cst-handbooks",
          "cst-industry-programs",
          "cst-laboratories",
          "cst-lecturers-gallery",
          "cst-merit-scholarships",
          "cst-merit-scholarships-gallery",
          "cst-mous",
          "cst-newsletters",
          "cst-physical-facilities",
          "cst-placements",
          "cst-placements-gallery",
          "cst-roll-of-honour",
          "cst-roll-of-honour-gallery",
          "cst-sahaya-events",
          "cst-scud-activities",
          "cst-student-achievements",
          "cst-syllabus",
          "cst-technical-association-gallery",
          "cst-training-activities",
          "cst-training-activities-gallery",
          "cst-workshops",
          "cst-workshops-gallery"
        ],
        "Total Modules": 39,
        "Database Tables": "All endpoints map to corresponding cst_* tables",
        "Methods Supported": "GET (Read operations)",
        "Documentation": "Each endpoint returns JSON data from respective CST department tables",
        "Status": "Active"
      }
    };

    res.status(200).json(cstModules);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
