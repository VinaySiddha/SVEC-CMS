import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Disable caching for this route to ensure fresh department data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Department-specific table name mappings
const DEPARTMENT_TABLE_MAPPING: Record<string, Record<string, string>> = {
  'cse-ai': {
    'faculty': 'cai_faculty',
    'non_teaching_faculty': 'cai_non_teaching_faculty',
    'technical_faculty': 'cai_technical_faculty',
    'bos_members': 'cai_bos_members',
    'bos_minutes': 'cai_bos_minutes',
    'hackathons_gallery': 'cai_hackathons_gallery',
    'department_library': 'cai_department_library',
    'faculty_achievements': 'cai_faculty_achievements',
    'placements': 'cai_placements',
    'technical_association': 'cai_technical_association',
    'newsletters': 'cai_newsletters'
  }
};

// Helper to safely execute queries without throwing
const safeQuery = async (sql: string, params: any[]) => {
  try {
    return await query(sql, params);
  } catch (error) {
    return [];
  }
};

// Helper to get table name with department mapping
const getTableName = (dept: string, tableSuffix: string): string => {
  const deptLower = dept.toLowerCase();
  const mapping = DEPARTMENT_TABLE_MAPPING[deptLower];
  
  if (mapping && mapping[tableSuffix]) {
    return mapping[tableSuffix];
  }
  
  // Fallback to default naming convention
  const deptPrefix = deptLower.replace(/-/g, '_');
  return `${deptPrefix}_${tableSuffix}`;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  let dept: string = 'unknown';
  
  try {
    const resolvedParams = await params;
    dept = resolvedParams.dept;

    if (!dept) {
      return NextResponse.json(
        { error: 'Department parameter is required' },
        { status: 400 }
      );
    }
    

    // Fetch only approved data for public display
    
    // Execute queries sequentially to avoid overwhelming the connection pool
    // Batch 1: Core faculty and staff data
    const [facultyData, nonTeachingData, technicalData] = await Promise.all([
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'faculty')} ORDER BY date_of_joining ASC, id ASC`,
        []
      ),
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'non_teaching_faculty')} ORDER BY id ASC`,
        []
      ),
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'technical_faculty')} ORDER BY id ASC`,
        []
      )
    ]);

    // Batch 2: Board of Studies data
    const [bosMembersData, bosMinutesData] = await Promise.all([
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'bos_members')} ORDER BY id ASC`,
        []
      ),
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'bos_minutes')} ORDER BY meeting_date DESC, id DESC`,
        []
      )
    ]);

    // Batch 3: Achievement and learning data
    const [facultyAchievementsData, departmentLibraryData] = await Promise.all([
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'faculty_achievements')} ORDER BY created_at DESC`,
        []
      ),
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'department_library')} LIMIT 1`,
        []
      )
    ]);

    // Batch 4: Placements and technical association
    const [placementsData, technicalAssociationData] = await Promise.all([
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'placements')} ORDER BY batch DESC`,
        []
      ),
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'technical_association')} ORDER BY id DESC`,
        []
      )
    ]);

    // Batch 5: Gallery and media data
    const [laboratoryGalleryData, technicalAssociationGalleryData, productDevelopmentGalleryData] = await Promise.all([
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'hackathons_gallery')} WHERE category = 'laboratories' ORDER BY id DESC`,
        []
      ),
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'hackathons_gallery')} WHERE category = 'technical association' ORDER BY id DESC`,
        []
      ),
      safeQuery(
        `SELECT * FROM ${getTableName(dept, 'hackathons_gallery')} WHERE category = 'pd' ORDER BY id DESC`,
        []
      )
    ]);

    // Batch 6: Shared tables (labs, MOUs, workshops, newsletters)
    const [labsData, workshopsData] = await Promise.all([
      safeQuery(
        'SELECT * FROM laboratories WHERE dept = ? AND status = "active" ORDER BY lab_name',
        [dept]
      ),
      safeQuery(
        'SELECT * FROM workshops WHERE dept = ? ORDER BY date_from DESC',
        [dept]
      )
    ]);

    let newslettersData = await safeQuery(
      `SELECT * FROM ${getTableName(dept, 'newsletters')} WHERE dept = ? ORDER BY year DESC, volume DESC, issue DESC`,
      [dept]
    );

    // Batch 7: MOUs (with special handling for CSE-AI)
    const mouData = dept.toLowerCase() === 'cse-ai'
      ? await safeQuery('SELECT id, mou_with as organization_name, from_date, to_date, status FROM cai_mous WHERE 1=1 ORDER BY created_at DESC', [])
      : await safeQuery('SELECT id, organization_name, start_date as from_date, end_date as to_date, status FROM mous WHERE dept = ? ORDER BY start_date DESC', [dept]);


    // Transform newsletters data - file_url is already in the table, no need to rename
    if (Array.isArray(newslettersData) && newslettersData.length > 0) {
      // Ensure file_url is properly named (in case some records use 'url')
      newslettersData = newslettersData.map((item: any) => ({
        ...item,
        file_url: item.file_url || item.url
      }));
    }

    const response = NextResponse.json({
      success: true,
      department: dept,
      data: {
        faculty: facultyData,
        nonTeachingStaff: nonTeachingData,
        technicalStaff: technicalData,
        boardOfStudies: bosMembersData,
        boardOfStudiesMeetingMinutes: bosMinutesData,
        laboratoryGallery: laboratoryGalleryData,
        departmentLibrary: departmentLibraryData && departmentLibraryData.length > 0 ? departmentLibraryData[0] : null,
        facultyAchievements: facultyAchievementsData,
        placements: placementsData,
        technicalAssociation: technicalAssociationData,
        technicalAssociationGallery: technicalAssociationGalleryData,
        labs: labsData,
        mous: mouData,
        newsletters: newslettersData,
        productDevelopmentGallery: productDevelopmentGalleryData,
        workshops: workshopsData
      }
    });

    // Disable caching to ensure fresh data on every request
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;

  } catch (error) {
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch department data', 
        department: dept || 'unknown',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
