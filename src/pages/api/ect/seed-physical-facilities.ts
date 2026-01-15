import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

const physicalFacilitiesData = [
  // Class Rooms & Class Time Tables
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Rooms',
    title: 'Class Rooms with ICT Enabled Facilities',
    description: 'Class Rooms with ICT Enabled Facilities',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/Class%20Rooms%20Photos.pdf',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Time Tables',
    title: 'ECE Master Timetable A.Y for II Sem 2022-23',
    description: 'ECE Master Timetable A.Y for II Sem 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%202nd%20SEM%20%20MasterTime%20Tables.pdf',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Electronics Lab',
    title: 'Electronics Lab',
    description: 'Modern electronics laboratory with advanced equipment',
    url: null,
    additional_data: JSON.stringify({
      labs: [
        {
          name: 'Electronics Lab - I',
          model: 'Standard Equipment',
          processor: 'Intel Core i5',
          ram: '8 GB',
          storage: '256 GB SSD',
          systems: 25
        },
        {
          name: 'Electronics Lab - II',
          model: 'Advanced Equipment',
          processor: 'Intel Core i7',
          ram: '16 GB',
          storage: '512 GB SSD',
          systems: 20
        }
      ]
    })
  },
  {
    category: 'Laboratories',
    subcategory: 'Digital Lab',
    title: 'Digital Electronics Lab',
    description: 'Digital electronics laboratory for circuit design and testing',
    url: null,
    additional_data: JSON.stringify({
      labs: [
        {
          name: 'Digital Lab',
          model: 'Professional Setup',
          processor: 'Intel Core i9',
          ram: '32 GB',
          storage: '1 TB SSD',
          systems: 30
        }
      ]
    })
  },
  {
    category: 'Library',
    subcategory: 'Resources',
    title: 'Department Library',
    description: 'Well-equipped library with digital resources',
    url: 'https://example.com/library',
    additional_data: JSON.stringify({
      books: 5000,
      journals: 50
    })
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.seed !== 'true') {
      return res.status(400).json({ error: 'Seed parameter required' });
    }

    // Clear existing data
    await executeQuery('DELETE FROM ect_physical_facilities');

    // Insert new data
    let successCount = 0;
    for (const item of physicalFacilitiesData) {
      try {
        await executeQuery(
          `INSERT INTO ect_physical_facilities (category, subcategory, title, description, url, additional_data) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [item.category, item.subcategory, item.title, item.description, item.url, item.additional_data]
        );
        successCount++;
      } catch (error) {
        console.error('Error inserting:', item.title, error);
      }
    }

    // Verify
    const rows: any = await executeQuery('SELECT COUNT(*) as count FROM ect_physical_facilities');

    res.status(200).json({
      message: 'Seed data inserted successfully',
      inserted: successCount,
      total: rows[0]?.count || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    res.status(500).json({
      error: error.message,
      hint: 'Check database connection'
    });
  }
}
