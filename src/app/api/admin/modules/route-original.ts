import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || '62.72.31.209',
  user: process.env.DB_USER || 'cmsuser',
  password: process.env.DB_PASSWORD || 'V@savi@2001',
  database: process.env.DB_NAME || 'svec_cms',
};

// Department configuration with module counts
const departmentConfig = {
  cai: {
    name: 'Computer Science & AI',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'faculty-development-programs', 'innovations', 'achievements',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  ece: {
    name: 'Electronics & Communication',
    modules: [
      'faculty', 'staff', 'faculty', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities', 'clubs',
      'extracurricular-activities', 'mous', 'scholarships-toppers',
      'syllabus', 'faculty-achievements', 'faculty-innovations',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'hackathons', 'merit-scholarships',
      'placement-batches', 'placement-gallery', 'sidebar-items',
      'student-achievements', 'training-activities'
    ]
  },
  civil: {
    name: 'Civil Engineering',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'extracurricular-activities', 'syllabus',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  mech: {
    name: 'Mechanical Engineering',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  eee: {
    name: 'Electrical & Electronics',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  cse: {
    name: 'Computer Science & Engineering',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  it: {
    name: 'Information Technology',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  aids: {
    name: 'AI & Data Science',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  csbs: {
    name: 'Computer Science & Business Systems',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  iot: {
    name: 'Internet of Things',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  mba: {
    name: 'Master of Business Administration',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'newsletters',
      'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  },
  mca: {
    name: 'Master of Computer Applications',
    modules: [
      'faculty', 'staff', 'handbooks', 'board-of-studies',
      'placements', 'fdp', 'consultancy', 'technical-association',
      'newsletters', 'workshops', 'physical-facilities',
      'contact', 'department-info', 'department-library', 'eresources',
      'extra-curricular', 'faculty-achievements', 'hackathons',
      'merit-scholarships', 'placement-batches', 'placement-gallery',
      'sidebar-items', 'student-achievements', 'training-activities'
    ]
  }
};

async function getModuleCount(tableName: string): Promise<number> {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`SELECT COUNT(*) as count FROM ${tableName}`);
    await connection.end();
    return (rows as any)[0]?.count || 0;
  } catch (error) {
    console.error(`Error counting ${tableName}:`, error);
    return 0;
  }
}

export async function GET() {
  try {
    // Validate departmentConfig exists
    if (!departmentConfig || Object.keys(departmentConfig).length === 0) {
      throw new Error('Department configuration is not available');
    }

    // Get statistics for each department
    const departmentStats = await Promise.all(
      Object.entries(departmentConfig).map(async ([deptCode, config]) => {
        // Validate config exists and has modules
        if (!config || !config.modules || !Array.isArray(config.modules)) {
          console.error(`Invalid config for department ${deptCode}:`, config);
          return {
            code: deptCode,
            name: config?.name || deptCode.toUpperCase(),
            totalRecords: 0,
            modules: [],
            moduleCount: 0
          };
        }

        const moduleStats = await Promise.all(
          config.modules.map(async (module) => {
            const tableName = `${deptCode}_${module}`;
            const count = await getModuleCount(tableName);
            return {
              name: module,
              count,
              tableName
            };
          })
        );

        const totalRecords = moduleStats.reduce((sum, mod) => sum + mod.count, 0);

        return {
          code: deptCode,
          name: config.name,
          totalRecords,
          modules: moduleStats,
          moduleCount: config.modules.length
        };
      })
    );

    // Calculate overall statistics
    const totalDepartments = departmentStats.length;
    const totalModules = departmentStats.reduce((sum, dept) => sum + dept.moduleCount, 0);
    const totalRecords = departmentStats.reduce((sum, dept) => sum + dept.totalRecords, 0);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalDepartments,
          totalModules,
          totalRecords,
          activeDepartments: departmentStats.filter(d => d.totalRecords > 0).length
        },
        departments: departmentStats
      }
    });

  } catch (error) {
    console.error('Error fetching admin modules:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin data' },
      { status: 500 }
    );
  }
}
