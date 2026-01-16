import { NextRequest, NextResponse } from 'next/server';

// Simple test route to debug the modules issue
export async function GET() {
  try {
    
    // Simple department config for testing
    const testConfig = {
      'cse-ai': {
        name: 'Computer Science & AI',
        modules: ['faculty', 'staff', 'handbooks']
      },
      'ece': {
        name: 'Electronics & Communication',
        modules: ['faculty', 'staff', 'handbooks']
      }
    };

    const departments = Object.entries(testConfig).map(([code, config]) => ({
      code,
      name: config.name,
      totalRecords: 0,
      modules: config.modules.map(module => ({
        name: module,
        count: 0,
        tableName: `${code}_${module}`
      })),
      moduleCount: config.modules.length
    }));

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalDepartments: departments.length,
          totalModules: departments.reduce((sum, dept) => sum + dept.moduleCount, 0),
          totalRecords: 0,
          activeDepartments: 0
        },
        departments
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch test data' },
      { status: 500 }
    );
  }
}