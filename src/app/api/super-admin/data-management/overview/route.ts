import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify super admin access
    const token = request.cookies.get('super-admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get all departments
    const departments = [
      'cse', 'cseai', 'cseds', 'aiml', 'cst', 
      'ece', 'ect', 'eee', 'civil', 'mech', 
      'mba', 'bsh'
    ];

    const departmentNames = {
      'cse': 'Computer Science and Engineering',
      'cseai': 'CSE (Artificial Intelligence)', 
      'cseds': 'CSE (Data Science)',
      'aiml': 'Artificial Intelligence and Machine Learning',
      'cst': 'Computer Science and Technology',
      'ece': 'Electronics and Communication Engineering',
      'ect': 'Electronics and Communication Technology',
      'eee': 'Electrical and Electronics Engineering', 
      'civil': 'Civil Engineering',
      'mech': 'Mechanical Engineering',
      'mba': 'Master of Business Administration',
      'bsh': 'Basic Sciences and Humanities'
    };

    // Fetch data statistics for each department
    const departmentData = await Promise.all(
      departments.map(async (dept) => {
        try {
          // Get faculty profiles count
          const facultyProfiles = await query(
            'SELECT COUNT(*) as count FROM faculty_profiles WHERE department = ?',
            [dept]
          );

          // Get student achievements count
          const studentAchievements = await query(
            'SELECT COUNT(*) as count FROM student_achievements WHERE department = ?',
            [dept]
          );

          // Get faculty achievements count
          const facultyAchievements = await query(
            'SELECT COUNT(*) as count FROM faculty_achievements WHERE department = ?',
            [dept]
          );

          // Get placements count
          const placements = await query(
            'SELECT COUNT(*) as count FROM placements WHERE department = ?',
            [dept]
          );

          // Get workshops count
          const workshops = await query(
            'SELECT COUNT(*) as count FROM workshops WHERE department = ?',
            [dept]
          );

          // Get organized events count
          const organizedEvents = await query(
            'SELECT COUNT(*) as count FROM organized_events WHERE department = ?',
            [dept]
          );

          // Get labs count
          const labs = await query(
            'SELECT COUNT(*) as count FROM labs WHERE department = ?',
            [dept]
          );

          // Get FDP count
          const fdp = await query(
            'SELECT COUNT(*) as count FROM fdp WHERE department = ?',
            [dept]
          );

          // Get industry news count
          const industryNews = await query(
            'SELECT COUNT(*) as count FROM industry_news WHERE department = ?',
            [dept]
          );

          // Get last updated timestamp (latest across all tables)
          const lastUpdated = await query(`
            SELECT MAX(updated_at) as last_update FROM (
              SELECT COALESCE(updated_at, created_at) as updated_at FROM faculty_profiles WHERE department = ?
              UNION ALL
              SELECT COALESCE(updated_at, created_at) as updated_at FROM student_achievements WHERE department = ?
              UNION ALL
              SELECT COALESCE(updated_at, created_at) as updated_at FROM faculty_achievements WHERE department = ?
              UNION ALL
              SELECT COALESCE(updated_at, created_at) as updated_at FROM placements WHERE department = ?
              UNION ALL
              SELECT COALESCE(updated_at, created_at) as updated_at FROM workshops WHERE department = ?
              UNION ALL
              SELECT COALESCE(updated_at, created_at) as updated_at FROM organized_events WHERE department = ?
              UNION ALL
              SELECT COALESCE(updated_at, created_at) as updated_at FROM labs WHERE department = ?
              UNION ALL
              SELECT COALESCE(updated_at, created_at) as updated_at FROM fdp WHERE department = ?
              UNION ALL
              SELECT COALESCE(updated_at, created_at) as updated_at FROM industry_news WHERE department = ?
            ) as all_updates
          `, [dept, dept, dept, dept, dept, dept, dept, dept, dept]);

          const stats = {
            faculty_profiles: (facultyProfiles[0] as any)?.count || 0,
            student_achievements: (studentAchievements[0] as any)?.count || 0,
            faculty_achievements: (facultyAchievements[0] as any)?.count || 0,
            placements: (placements[0] as any)?.count || 0,
            workshops: (workshops[0] as any)?.count || 0,
            organized_events: (organizedEvents[0] as any)?.count || 0,
            labs: (labs[0] as any)?.count || 0,
            fdp: (fdp[0] as any)?.count || 0,
            industry_news: (industryNews[0] as any)?.count || 0,
            total_records: 0
          };

          // Calculate total records
          stats.total_records = Object.values(stats).reduce((sum: number, count: number) => sum + count, 0) - stats.total_records;

          return {
            department: dept,
            department_name: departmentNames[dept as keyof typeof departmentNames],
            stats,
            last_updated: (lastUpdated[0] as any)?.last_update || new Date().toISOString()
          };

        } catch (error) {
          console.error(`Error fetching data for department ${dept}:`, error);
          return {
            department: dept,
            department_name: departmentNames[dept as keyof typeof departmentNames],
            stats: {
              faculty_profiles: 0,
              student_achievements: 0,
              faculty_achievements: 0,
              placements: 0,
              workshops: 0,
              organized_events: 0,
              labs: 0,
              fdp: 0,
              industry_news: 0,
              total_records: 0
            },
            last_updated: new Date().toISOString()
          };
        }
      })
    );

    // Calculate global statistics
    const globalStats = departmentData.reduce((totals, dept) => {
      Object.keys(dept.stats).forEach(key => {
        if (key !== 'total_records') {
          totals[key] = (totals[key] || 0) + dept.stats[key as keyof typeof dept.stats];
        }
      });
      return totals;
    }, {} as Record<string, number>);

    return NextResponse.json({
      departments: departmentData,
      global_stats: globalStats,
      total_departments: departments.length
    });

  } catch (error) {
    console.error('Error fetching data overview:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}