import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('🏥 Health check started...');
    
    // Test basic database connection
    await query('SELECT 1 as connection_test', []);
    
    // Test key tables exist
    const tableChecks = await Promise.all([
      query("SELECT COUNT(*) as count FROM information_schema.tables WHERE table_name = 'faculty_profiles'", []),
      query("SELECT COUNT(*) as count FROM information_schema.tables WHERE table_name = 'EEE_Syllabus'", []),
      query("SELECT COUNT(*) as count FROM information_schema.tables WHERE table_name = 'syllabus_documents'", []),
      query("SELECT COUNT(*) as count FROM information_schema.tables WHERE table_name = 'laboratories'", [])
    ]);
    
    // Test EEE specific data
    const eesSyllabusTest = await query('SELECT COUNT(*) as count FROM EEE_Syllabus WHERE status = ?', ['active']) as any[];
    const facultyTest = await query('SELECT COUNT(*) as count FROM faculty_profiles WHERE dept = ?', ['EEE']) as any[];
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`✅ Health check completed in ${duration}ms`);
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      database: {
        connection: 'ok',
        tables: {
          faculty_profiles: (tableChecks[0] as any[])[0]?.count > 0 ? 'exists' : 'missing',
          EEE_Syllabus: (tableChecks[1] as any[])[0]?.count > 0 ? 'exists' : 'missing',
          syllabus_documents: (tableChecks[2] as any[])[0]?.count > 0 ? 'exists' : 'missing',
          laboratories: (tableChecks[3] as any[])[0]?.count > 0 ? 'exists' : 'missing'
        }
      },
      data_samples: {
        eee_syllabus_count: eesSyllabusTest[0]?.count || 0,
        eee_faculty_count: facultyTest[0]?.count || 0
      }
    });
    
  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.error('💀 Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
      database: {
        connection: 'failed'
      }
    }, { status: 503 });
  }
}