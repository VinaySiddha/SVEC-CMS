import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/placements - Get placement data for public display
export async function GET(request: NextRequest) {
  try {
    // Return static data for now since database tables need to be created
    return NextResponse.json({
      success: true,
      data: {
        statistics: [
          {
            id: 1,
            academic_year: '2024-25',
            department_code: 'CSE',
            department_name: 'Computer Science Engineering',
            total_students: 120,
            students_placed: 108,
            placement_percentage: 90.0,
            highest_package: 45.0,
            average_package: 8.5,
            companies_visited: 25
          },
          {
            id: 2,
            academic_year: '2024-25',
            department_code: 'ECE',
            department_name: 'Electronics & Communication Engineering',
            total_students: 100,
            students_placed: 85,
            placement_percentage: 85.0,
            highest_package: 35.0,
            average_package: 7.2,
            companies_visited: 20
          },
          {
            id: 3,
            academic_year: '2024-25',
            department_code: 'ME',
            department_name: 'Mechanical Engineering',
            total_students: 80,
            students_placed: 65,
            placement_percentage: 81.25,
            highest_package: 25.0,
            average_package: 6.8,
            companies_visited: 15
          },
          {
            id: 4,
            academic_year: '2024-25',
            department_code: 'EEE',
            department_name: 'Electrical & Electronics Engineering',
            total_students: 90,
            students_placed: 75,
            placement_percentage: 83.33,
            highest_package: 30.0,
            average_package: 7.0,
            companies_visited: 18
          },
          {
            id: 5,
            academic_year: '2024-25',
            department_code: 'CE',
            department_name: 'Civil Engineering',
            total_students: 70,
            students_placed: 55,
            placement_percentage: 78.57,
            highest_package: 20.0,
            average_package: 6.5,
            companies_visited: 12
          }
        ],
        companies: [
          {
            id: 1,
            name: 'TCS',
            logo_url: '/images/companies/tcs.png',
            industry: 'IT Services',
            company_type: 'MNC'
          },
          {
            id: 2,
            name: 'Infosys',
            logo_url: '/images/companies/infosys.png',
            industry: 'IT Services',
            company_type: 'MNC'
          },
          {
            id: 3,
            name: 'Wipro',
            logo_url: '/images/companies/wipro.png',
            industry: 'IT Services',
            company_type: 'MNC'
          },
          {
            id: 4,
            name: 'Cognizant',
            logo_url: '/images/companies/cognizant.png',
            industry: 'IT Services',
            company_type: 'MNC'
          },
          {
            id: 5,
            name: 'Microsoft',
            logo_url: '/images/companies/microsoft.png',
            industry: 'Technology',
            company_type: 'MNC'
          },
          {
            id: 6,
            name: 'Amazon',
            logo_url: '/images/companies/amazon.png',
            industry: 'Technology',
            company_type: 'MNC'
          }
        ],
        team: [
          {
            id: 1,
            name: 'Dr. Rajesh Kumar',
            designation: 'Professor & Head',
            department: 'Computer Science',
            role: 'Head',
            email: 'rajesh.kumar@srivasaviengg.ac.in',
            phone: '+91 9876543210',
            bio: 'Head of Placement Cell with 15+ years of experience in industry relations and student career development.',
            photo_url: '../images/placement/placement-head.jpeg'
          },
          {
            id: 2,
            name: 'Mrs. Priya Sharma',
            designation: 'Associate Professor',
            department: 'Electronics & Communication',
            role: 'Coordinator',
            email: 'priya.sharma@srivasaviengg.ac.in',
            phone: '+91 9876543211',
            bio: 'Placement coordinator specializing in core engineering companies and technical skill development.',
            photo_url: '../images/placement/coordinator1.jpg'
          },
          {
            id: 3,
            name: 'Mr. Suresh Reddy',
            designation: 'Assistant Professor',
            department: 'Mechanical Engineering',
            role: 'Coordinator',
            email: 'suresh.reddy@srivasaviengg.ac.in',
            phone: '+91 9876543212',
            bio: 'Industry liaison for mechanical and automobile sectors with extensive corporate network.',
            photo_url: '../images/placement/coordinator2.jpg'
          },
          {
            id: 4,
            name: 'Ms. Kavitha Reddy',
            designation: 'Assistant Professor',
            department: 'Computer Science',
            role: 'Assistant',
            email: 'kavitha.reddy@srivasaviengg.ac.in',
            phone: '+91 9876543213',
            bio: 'Technical skills trainer and career counselor for IT and software companies.',
            photo_url: '../images/placement/assistant1.jpg'
          }
        ]
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch placement data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}