import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Disable caching for this route to ensure fresh department data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to safely execute queries without throwing
const safeQuery = async (sql: string, params: any[]) => {
  try {
    return await query(sql, params);
  } catch (error) {
    console.warn(`⚠️ Query failed: ${sql.substring(0, 50)}...`, error instanceof Error ? error.message : error);
    return [];
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  let dept: string = 'unknown';
  
  try {
    console.log('🚀 Starting department data fetch...');
    const resolvedParams = await params;
    dept = resolvedParams.dept;

    if (!dept) {
      console.error('❌ Department parameter is missing');
      return NextResponse.json(
        { error: 'Department parameter is required' },
        { status: 400 }
      );
    }
    
    console.log(`🏫 Fetching data for department: ${dept}`);

    // Fetch only approved data for public display
    console.log('📋 Starting database queries...');
    
    // Fetch faculty and staff data for public display
    // Build department-specific table names
    const deptPrefix = dept.toLowerCase().replace(/-/g, '_');
    const facultyTable = `${deptPrefix}_faculty`;
    const nonTeachingTable = `${deptPrefix}_non_teaching_faculty`;
    const technicalTable = `${deptPrefix}_technical_faculty`;
    const bosMembersTable = `${deptPrefix}_bos_members`;
    const bosMinutesTable = `${deptPrefix}_bos_minutes`;
    const hackathonsGalleryTable = `${deptPrefix}_hackathons_gallery`;
    const departmentLibraryTable = `${deptPrefix}_department_library`;
    const facultyAchievementsTable = `${deptPrefix}_faculty_achievements`;
    const placementsTable = `${deptPrefix}_placements`;
    const technicalAssociationTable = `${deptPrefix}_technical_association`;
    const newslettersTable = `${deptPrefix}_newsletters`;
    
    console.log(`📋 Table names for dept="${dept}" (prefix="${deptPrefix}"):`);
    console.log(`   newslettersTable: ${newslettersTable}`);
    console.log(`   hackathonsGalleryTable: ${hackathonsGalleryTable}`);
    
    // Return data from faculty and staff tables
    const results = await Promise.allSettled([
      // Faculty
      safeQuery(
        `SELECT * FROM ${facultyTable} ORDER BY date_of_joining ASC, id ASC`,
        []
      ),
      
      // Non-Teaching Staff
      safeQuery(
        `SELECT * FROM ${nonTeachingTable} ORDER BY id ASC`,
        []
      ),

      // Technical Staff/Faculty
      safeQuery(
        `SELECT * FROM ${technicalTable} ORDER BY id ASC`,
        []
      ),

      // Board of Studies Members
      safeQuery(
        `SELECT * FROM ${bosMembersTable} ORDER BY id ASC`,
        []
      ),

      // Board of Studies Meeting Minutes
      safeQuery(
        `SELECT * FROM ${bosMinutesTable} ORDER BY meeting_date DESC, id DESC`,
        []
      ),

      // Laboratories Gallery Images
      safeQuery(
        `SELECT * FROM ${hackathonsGalleryTable} WHERE category = 'laboratories' ORDER BY id DESC`,
        []
      ),

      // Department Library
      safeQuery(
        `SELECT * FROM ${departmentLibraryTable} LIMIT 1`,
        []
      ),

      // Faculty Achievements
      safeQuery(
        `SELECT * FROM ${facultyAchievementsTable} ORDER BY created_at DESC`,
        []
      ),

      // Placements
      safeQuery(
        `SELECT * FROM ${placementsTable} ORDER BY batch DESC`,
        []
      ),

      // Technical Association
      safeQuery(
        `SELECT * FROM ${technicalAssociationTable} ORDER BY id DESC`,
        []
      ),

      // Technical Association Gallery Images
      safeQuery(
        `SELECT * FROM ${hackathonsGalleryTable} WHERE category = 'technical association' ORDER BY id DESC`,
        []
      ),

      // Laboratories only
      safeQuery(
        'SELECT * FROM laboratories WHERE dept = ? AND status = "active" ORDER BY lab_name',
        [dept]
      ),

      // MOUs
      dept.toLowerCase() === 'cse-ai'
        ? safeQuery('SELECT id, mou_with as organization_name, from_date, to_date, status FROM cai_mous WHERE 1=1 ORDER BY created_at DESC', [])
        : safeQuery('SELECT id, organization_name, start_date as from_date, end_date as to_date, status FROM mous WHERE dept = ? ORDER BY start_date DESC', [dept]),
      
      // Workshops
      safeQuery(
        'SELECT * FROM workshops WHERE dept = ? ORDER BY date_from DESC',
        [dept]
      ),

      // Newsletters
      safeQuery(
        `SELECT * FROM ${newslettersTable} WHERE dept = ? ORDER BY year DESC, volume DESC, issue DESC`,
        [dept]
      ),

      // Product Development Gallery Images
      safeQuery(
        `SELECT * FROM ${hackathonsGalleryTable} WHERE category = 'pd' ORDER BY id DESC`,
        []
      )
    ]);

    // Extract data from results
    const getData = (index: number) => {
      const result = results[index];
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`⚠️ Query ${index} failed:`, result.reason);
        return [];
      }
    };

    const facultyData = getData(0);
    const nonTeachingData = getData(1);
    const technicalData = getData(2);
    const bosMembersData = getData(3);
    const bosMinutesData = getData(4);
    const laboratoryGalleryData = getData(5);
    const departmentLibraryData = getData(6);
    const facultyAchievementsData = getData(7);
    const placementsData = getData(8);
    const technicalAssociationData = getData(9);
    const technicalAssociationGalleryData = getData(10);
    const labsData = getData(11);
    const mouData = getData(12);
    const workshopsData = getData(13);
    let newslettersData = getData(14);
    const productDevelopmentGalleryData = getData(15);

    // Transform newsletters data - file_url is already in the table, no need to rename
    if (Array.isArray(newslettersData) && newslettersData.length > 0) {
      // Ensure file_url is properly named (in case some records use 'url')
      newslettersData = newslettersData.map((item: any) => ({
        ...item,
        file_url: item.file_url || item.url
      }));
    }

    console.log(`✅ All queries completed`);
    console.log(`👨‍🏫 Faculty: ${Array.isArray(facultyData) ? facultyData.length : 0} records`);
    console.log(`👥 Non-Teaching Staff: ${Array.isArray(nonTeachingData) ? nonTeachingData.length : 0} records`);
    console.log(`🔧 Technical Staff: ${Array.isArray(technicalData) ? technicalData.length : 0} records`);
    console.log(`📚 BOS Members: ${Array.isArray(bosMembersData) ? bosMembersData.length : 0} records`);
    console.log(`📋 BOS Minutes: ${Array.isArray(bosMinutesData) ? bosMinutesData.length : 0} records`);
    console.log(`🖼️ Laboratory Gallery: ${Array.isArray(laboratoryGalleryData) ? laboratoryGalleryData.length : 0} records`);
    console.log(`📚 Department Library: ${Array.isArray(departmentLibraryData) ? departmentLibraryData.length : 0} records`);
    console.log(`🏆 Faculty Achievements: ${Array.isArray(facultyAchievementsData) ? facultyAchievementsData.length : 0} records`);
    console.log(`💼 Placements: ${Array.isArray(placementsData) ? placementsData.length : 0} records`);
    console.log(`� Technical Association: ${Array.isArray(technicalAssociationData) ? technicalAssociationData.length : 0} records`);    console.log(`🖼️ Technical Association Gallery: ${Array.isArray(technicalAssociationGalleryData) ? technicalAssociationGalleryData.length : 0} records`);    console.log(`�🏛️ Labs: ${Array.isArray(labsData) ? labsData.length : 0} records`);
    console.log(`📋 MOUs: ${Array.isArray(mouData) ? mouData.length : 0} records`);
    console.log(`📚 Workshops: ${Array.isArray(workshopsData) ? workshopsData.length : 0} records`);
    console.log(`📰 Newsletters: ${Array.isArray(newslettersData) ? newslettersData.length : 0} records`);
    console.log(`🎨 Product Development Gallery: ${Array.isArray(productDevelopmentGalleryData) ? productDevelopmentGalleryData.length : 0} records`);

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
    console.error('💥 Error in department data fetch:', error);
    console.error(`🏫 Department: ${dept || 'unknown'}`);
    
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
