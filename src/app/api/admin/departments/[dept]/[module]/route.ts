import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth/auth';
import { RowDataPacket, OkPacket } from 'mysql2';
import { deleteRecordFiles, deleteReplacedFiles } from '@/utils/file-management';
import { mapFieldsToDatabase, mapFieldsFromDatabase } from '@/utils/field-mapping';
import { triggerDepartmentRefresh } from '@/utils/refreshTriggers';
import { MODULES_FIELD_CONFIG } from '@/config/module-fields';

// Disable caching for this entire route to ensure fresh data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Department modules mapping
const DEPARTMENT_MODULES: Record<string, Record<string, string>> = {
  'cse-ai': {
    'academic-toppers': 'cai_academictoppers',
    'activity-coordinators': 'cai_activity_coordinators',
    'activity-events': 'cai_activity_events',
    'activity-gallery': 'cai_activity_gallery',
    'bos-members': 'cai_bos_members',
    'bos-minutes': 'cai_bos_minutes',
    'department-library': 'cai_department_library',
    'department-overview': 'cai_department_overview',
    'eresources': 'cai_eresources',
    'extra-curricular': 'cai_extracurricular_activities',
    'faculty': 'cai_faculty',
    'faculty-achievements': 'cai_faculty_achievements',
    'faculty-development': 'cai_faculty_development',
    'hackathons': 'cai_hackathons',
    'hackathons-gallery': 'cai_hackathons_gallery',
    'handbooks': 'cai_handbooks',
    'merit-scholarships': 'cai_merit_scholarships',
    'mous': 'cai_mous',
    'newsletters': 'cai_newsletters',
    'non-teaching-faculty': 'cai_non_teaching_faculty',
    'physical-facilities': 'cai_physical_facilities',
    'placements': 'cai_placements',
    'student-achievements': 'cai_student_achievements',
    'syllabus': 'cai_syllabus',
    'technical-association': 'cai_technical_association',
    'technical-faculty': 'cai_technical_faculty',
    'workshops': 'cai_workshops'
  },
  'ece': {
    'academic-toppers': 'ece_scholarships_toppers',
    'merit-scholarships': 'ece_scholarships_toppers',
    'bos-members': 'ece_bos_members',
    'bos-minutes': 'ece_bos_minutes',
    'clubs': 'ece_clubs',
    'department-library': 'ece_department_library',
    'department-overview': 'ece_department_overview',
    'eresources': 'ece_eresources',
    'extra-curricular': 'ece_extracurricular_activities',
    'faculty': 'ece_faculty',
    'faculty-achievements': 'ece_faculty_achievements',
    'faculty-development': 'ece_fdp',
    'faculty-innovations': 'ece_faculty_innovations',
    'hackathons': 'ece_hackathons',
    'hackathons-gallery': 'ece_hackathons_gallery',
    'handbooks': 'ece_handbooks',
    'mous': 'ece_mous',
    'newsletters': 'ece_newletters',
    'non-teaching-faculty': 'ece_non_teaching_faculty',
    'physical-facilities': 'ece_physical_facilities',
    'placements': 'ece_placements',
    'student-achievements': 'ece_student_achievements',
    'syllabus': 'ece_syllabus',
    'technical-association': 'ece_technicalAssociation_trainingActivities',
    'technical-faculty': 'ece_technical_faculty',
    'workshops': 'ece_worshops_gl'
  },
  'civil': {
    'bos-minutes': 'civil_bos_minutes',
    'bos-members': 'civil_bos_members',
    'consultancy': 'civil_consultancy',
    'industry-programs': 'civil_industry_programs',
    'department-overview': 'civil_department_overview',
    'department-library': 'civil_department_library',
    'extra-curricular': 'civil_extracurricular_activities',
    'extra-curricular-gallery': 'civil_extra_curricular_gallery',
    'faculty': 'civil_faculty',

    'faculty-achievements': 'civil_faculty_achievements',
    'faculty-development': 'civil_faculty_development',
    'faculty-development-gallery': 'civil_faculty_development_gallery',
    'gate': 'civil_gate_results',
    'gate-gallery': 'civil_gate_gallery',
    'hackathons': 'civil_hackathons',
    'hackathons-gallery': 'civil_hackathons_gallery',
    'handbooks': 'civil_handbooks',
    'laboratories': 'civil_laboratories',
    'merit-scholarships': 'civil_merit_scholarships',
    'merit-scholarships-gallery': 'civil_merit_scholarships_gallery',
    'mous': 'civil_mous',
    'newsletters': 'civil_newsletters',
    'non-teaching-faculty': 'civil_non_teaching_faculty',
    'physical-facilities': 'civil_physical_facilities',
    'placements': 'civil_placements',
    'placements-gallery': 'civil_placements_gallery',
    'roll-of-honour': 'civil_roll_of_honour',
    'research-projects': 'civil_research_projects',
    'student-achievements': 'civil_student_achievements',
    'syllabus': 'civil_syllabus',
    'technical-faculty': 'civil_technical_faculty',
    'technical-association': 'civil_technical_association',
    'technical-association-gallery': 'civil_technical_association_gallery',
    'training-activities': 'civil_training_activities',
    'training-activities-gallery': 'civil_training_activities_gallery',
    'workshops': 'civil_workshops',
    'workshops-gallery': 'civil_workshops_gallery'
  },
  'mech': {
    'bos-members': 'mech_bos_members',
    'bos-minutes': 'mech_bos_minutes',
    'faculty': 'mech_faculty',
    'faculty-achievements': 'mech_facultyachievements',
    'faculty-methods': 'mech_facultyTLmethods',
    'hackathons-gallery': 'mech_hackathons_gallery',
    'industry-programs': 'mech_industry_programs',
    'laboratories': 'mech_laboratories',
    'library': 'mech_library',
    'magazines': 'mech_magazines',
    'mous': 'mech_mous',
    'newsletters': 'mech_newsletters',
    'non-faculty': 'mech_non_teaching_faculty',
    'placements': 'mech_placements',
    'project-research': 'mech_project_research',
    'student-achievements': 'mech_studentachievements',
    'syllabus': 'mech_syllabus',
    'technical-association': 'mech_technicalassociation',
    'technical-faculty': 'mech_technical_faculty',
    'workshops': 'mech_workshops',
  },

  'cse': {
    'bos-members': 'cse_bos_members',
    'bos-minutes': 'cse_bos_minutes',
    'department-library': 'cse_department_library',
    'department-overview': 'cse_department_overview',
    'eresources': 'cse_eresources',
    'extra-curricular': 'cse_extra_curricular',
    'faculty': 'cse_faculty',
    'faculty-achievements': 'cse_faculty_achievements',
    'faculty-development': 'cse_faculty_development',
    'gate': 'cse_gate',
    'hackathons': 'cse_hackathons',
    'hackathons-gallery': 'cse_hackathons_gallery',
    'handbooks': 'cse_handbooks',
    'industry-programs': 'cse_industry_programs',
    'merit-scholarships': 'cse_merit_scholarships',
    'mous': 'cse_mous',
    'newsletters': 'cse_newsletters',
    'non-teaching-faculty': 'cse_non_teaching_faculty',
    'physical-facilities': 'cse_physical_facilities',
    'placements': 'cse_placements',
    'placements-gallery': 'cse_hackathons_gallery',
    'roll-of-honour': 'cse_roll_of_honour',
    'sahaya-events': 'cse_sahaya_events',
    'scud-activities': 'cse_scud_activities',
    'student-achievements': 'cse_student_achievements',
    'syllabus': 'cse_syllabus',
    'technical-association': 'cse_technical_association',
    'technical-faculty': 'cse_technical_faculty',
    'training-activities': 'cse_training_activities',
    'workshops': 'cse_workshops',
    'training-activities-gallery': 'cse_hackathons_gallery',
    'extra-curricular-gallery': 'cse_hackathons_gallery',
    'faculty-development-gallery': 'cse_hackathons_gallery',
    'workshops-gallery': 'cse_hackathons_gallery',
    'eapcet-toppers': 'cse_eapcet_toppers',
  },
  'eee': {
    'academic-toppers': 'eee_academictoppers',
    'activity-coordinators': 'eee_activity_coordintors',
    'activity-events': 'eee_activity_events',
    'department-library': 'eee_department_library',
    'activity-gallery': 'eee_activity_gallery',
    'bos-members': 'eee_bos_members',
    'bos-minutes': 'eee_bos_minutes',
    'department-overview': 'eee_department_overview',
    'eapcet-toppers': 'eee_eapcet_toppers',
    'eresources': 'eee_eresources',
    'extra-curricular': 'eee_extracurricular_activities',
    'faculty': 'eee_faculty',
    'faculty-achievements': 'eee_faculty_achievements',
    'faculty-development': 'eee_faculty_development',
    'fdp': 'eee_faculty_development',
    'gate': 'eee_gate',
    'hackathons': 'eee_hackathons',
    'hackathons-gallery': 'eee_hackathons_gallery',
    'industry-programs': 'eee_industry_programs',
    'merit-scholarships': 'eee_merit_scholarships',
    'mous': 'eee_mous',
    'newsletters': 'eee_newsletters',
    'non-teaching-faculty': 'eee_non_teaching_faculty',
    'physical-facilities': 'eee_physical_facilities',
    'placements': 'eee_placements',
    'roll-of-honour': 'eee_roll_of_honour',
    'sahaya-events': 'eee_sahaya_events',
    'student-achievements': 'eee_student_achievements',
    'syllabus': 'eee_syllabus',
    'technical-association': 'eee_technical_association',
    'technical-faculty': 'eee_technical_faculty',
    'workshops': 'eee_workshops',
    'handbooks': 'eee_handbooks',
    'technical-handbooks': 'eee_technical_handbooks',
    'faculty-innovations': 'eee_faculty_innovations',
    'research-center': 'eee_research_verticles'
  },
  'ds': {
    'academic-toppers': 'ds_academictoppers',
    'bos-members': 'ds_bos_members',
    'bos-minutes': 'ds_bos_minutes',
    'department-overview': 'ds_department_overview',
    'eresources': 'ds_eresources',
    'extra-curricular': 'ds_extracurricular_activities',
    'faculty': 'ds_faculty',
    'faculty-achievements': 'ds_faculty_achievements',
    'faculty-development': 'ds_faculty_development',
    'hackathons': 'ds_hackathons',
    'hackathons-gallery': 'ds_hackathons_gallery',
    'handbooks': 'ds_handbooks',
    'merit-scholarships': 'ds_merit_scholarships',
    'mous': 'ds_mous',
    'newsletters': 'ds_newsletters',
    'non-teaching-faculty': 'ds_non_teaching_staff',
    'physical-facilities': 'ds_physical_facilities',
    'placements': 'ds_placements',
    'scud-activities': 'ds_scud_activities',
    'student-achievements': 'ds_student_achievements',
    'syllabus': 'ds_syllabus',
    'technical-association': 'ds_technical_association',
    'technical-faculty': 'ds_technical_faculty',
    'training-activities': 'ds_training_activities',
    'workshops': 'ds_workshops'
  },
  
  'bsh': {
    'activities': 'bsh_activities',
    'board-of-studies': 'bsh_board_of_studies',
    'department-documents': 'bsh_department_documents',
    'department-profile': 'bsh_department_profile',
    'faculty': 'bsh_faculty',
    'faculty-achievements': 'bsh_faculty_achievements',
    'faculty-paper-presentations': 'bsh_faculty_paper_presentations',
    'fdps': 'bsh_fdps',
    'laboratories': 'bsh_laboratories',
    'photogallery': 'bsh_photogallery',
    'results': 'bsh_results',
    'student-achievements': 'bsh_student_achievements',
    'syllabus': 'bsh_syllabus',
    'non-teaching-faculty': 'non_teaching_bsh_faculty'
  },
  'ect': {
    'academic-toppers': 'ect_scholarships_toppers',
    'bos-members': 'ect_bos_members',
    'bos-minutes': 'ect_bos_minutes',
    'workshops': 'ect_workshops',
    'department-library': 'ect_department_library',
    'industry-programs': 'ect_industry_programs',
    'department-overview': 'ect_department_overview',
    'eresources': 'ect_eresources',
    'extra-curricular': 'ect_extracurricular_activities',
    'faculty': 'ect_faculty',
    'faculty-achievements': 'ect_faculty_achievements',
    'faculty-development': 'ect_faculty_development',
    'hackathons': 'ect_hackathons',
    'hackathons-gallery': 'ect_hackathons_gallery',
    'handbooks': 'ect_handbooks',
    'technical-association': 'ect_technical_association',
    'merit-scholarships': 'ect_merit_scholarships',
    'mous': 'ect_mous',
    'newsletters': 'ect_newsletters',
    'non-teaching-faculty': 'ect_non_teaching_faculty',
    'physical-facilities': 'ect_physical_facilities',
    'placements': 'ect_placements',
    'sahaya-events': 'ect_sahaya_events',
    'scud-activities': 'ect_scud_activities',
    'student-achievements': 'ect_student_achievements',
    'gate': 'ect_gate',
    'roll-of-honour': 'ect_roll_of_honour',
    'syllabus': 'ect_syllabus',
    'technical-faculty': 'ect_technical_faculty',
    'training-activities': 'ect_training_activities'
  },
  'aiml': {
    'academic-toppers': 'aiml_academictoppers',
    'activity-coordinators': 'aiml_activity_coordinators',
    'activity-events': 'aiml_activity_events',
    'activity-gallery': 'aiml_activity_gallery',
    'bos-members': 'aiml_bos_members',
    'bos-minutes': 'aiml_bos_minutes',
    'department-library': 'aiml_department_library',
    'department-overview': 'aiml_department_overview',
    'eresources': 'aiml_eresources',
    'extra-curricular': 'aiml_extracurricular_activities',
    'faculty': 'aiml_faculty',
    'faculty-achievements': 'aiml_faculty_achievements',
    'faculty-development': 'aiml_faculty_development',
    'hackathons': 'aiml_hackathons',
    'hackathons-gallery': 'aiml_hackathons_gallery',
    'handbooks': 'aiml_handbooks',
    'merit-scholarships': 'aiml_merit_scholarships',
    'mous': 'aiml_mous',
    'physical-facilities': 'aiml_physical_facilities',
    'placements': 'aiml_placements',
    'staff': 'aiml_staff',
    'student-achievements': 'aiml_student_achievements',
    'syllabus': 'aiml_syllabus',
    'technical-association': 'aiml_technical_association',
    'technical-faculty': 'aiml_technical_faculty',
    'workshops': 'aiml_workshops'
  },
  'cse-ds': {
    'academic-toppers': 'ds_academictoppers',
    'activity-coordinators': 'ds_activity_coordinators',
    'activity-events': 'ds_activity_events',
    'activity-gallery': 'ds_activity_gallery',
    'bos-members': 'ds_bos_members',
    'bos-minutes': 'ds_bos_minutes',
    'department-library': 'ds_department_library',
    'department-overview': 'ds_department_overview',
    'eresources': 'ds_eresources',
    'extra-curricular': 'ds_extra_curricular',
    'faculty': 'ds_faculty',
    'faculty-achievements': 'ds_faculty_achievements',
    'faculty-development': 'ds_faculty_development',
    'hackathons': 'ds_hackathons',
    'hackathons-gallery': 'ds_hackathons_gallery',
    'handbooks': 'ds_handbooks',
    'industry-programs': 'ds_industry_programs',
    'merit-scholarships': 'ds_merit_scholarships',
    'mous': 'ds_mous',
    'newsletters': 'ds_newsletters',
    'non-teaching-faculty': 'ds_non_teaching_faculty',
    'physical-facilities': 'ds_physical_facilities',
    'placements': 'ds_placements',
    'sahaya-events': 'ds_sahaya_events',
    'scud-activities': 'ds_scud_activities',
    'student-achievements': 'ds_student_achievements',
    'syllabus': 'ds_syllabus',
    'technical-faculty': 'ds_technical_faculty',
    'technical-association': 'ds_technical_association',
    'training-activities': 'ds_training_activities',
    'workshops': 'ds_workshops'
  },
  'cst': {
    'bos-members': 'cst_bos_members',
    'bos-minutes': 'cst_bos_minutes',
    'department-library': 'cst_department_library',
    'department-overview': 'cst_department_overview',
    'eapcet-toppers': 'cst_eapcet_toppers',
    'eresources': 'cst_eresources',
    'extra-curricular': 'cst_extra_curricular',
    'faculty': 'cst_faculty',
    'faculty-achievements': 'cst_faculty_achievements',
    'faculty-development': 'cst_faculty_development',
    'gate': 'cst_gate',
    'hackathons': 'cst_hackathons',
    'hackathons-gallery': 'cst_hackathons_gallery',
    'handbooks': 'cst_handbooks',
    'industry-programs': 'cst_industry_programs',
    'merit-scholarships': 'cst_merit_scholarships',
    'mous': 'cst_mous',
    'newsletters': 'cst_newsletters',
    'non-teaching-faculty': 'cst_non_teaching_faculty',
    'physical-facilities': 'cst_physical_facilities',
    'placements': 'cst_placements',
    'placements-gallery': 'cst_hackathons_gallery',
    'roll-of-honour': 'cst_roll_of_honour',
    'sahaya-events': 'cst_sahaya_events',
    'scud-activities': 'cst_scud_activities',
    'student-achievements': 'cst_student_achievements',
    'syllabus': 'cst_syllabus',
    'technical-association': 'cst_technical_association',
    'technical-faculty': 'cst_technical_faculty',
    'training-activities': 'cst_training_activities',
    'workshops': 'cst_workshops',
    'training-activities-gallery': 'cst_hackathons_gallery',
    'extra-curricular-gallery': 'cst_hackathons_gallery',
    'faculty-development-gallery': 'cst_hackathons_gallery',
    'workshops-gallery': 'cst_hackathons_gallery'
  },
  'mba': {
    'academic-toppers': 'mba_academictoppers',
    'board-of-studies': 'mba_bos_members',
    'bos-members': 'mba_bos_members',
    'bos-minutes': 'mba_bos_minutes',
    'department-library': 'mba_department_library',
    'department-overview': 'mba_department_overview',
    'eresources': 'mba_eresources',
    'extra-curricular': 'mba_extra_curricular',
    'faculty': 'mba_faculty',
    'faculty-profiles': 'mba_faculty',
    'faculty-achievements': 'mba_faculty_achievements',
    'faculty-development': 'mba_faculty_development_programs',
    'hackathons': 'mba_hackathons',
    'hackathons-gallery': 'mba_hackathons_gallery',
    'handbooks': 'mba_handbooks',
    'industrial-visits': 'mba_industrial_visits',
    'industry-programs': 'mba_industry_programs',
    'merit-scholarships': 'mba_merit_scholarships',
    'mous': 'mba_mous',
    'newsletters': 'mba_newsletters',
    'non-teaching-staff': 'mba_non_teaching_faculty',
    'physical-facilities': 'mba_physical_facilities',
    'placements': 'mba_placements',
    'sahaya-events': 'mba_sahaya_events',
    'scud-activities': 'mba_scud_activities',
    'student-achievements': 'mba_student_achievements',
    'syllabus': 'mba_syllabus',
    'technical-association': 'mba_technical_association',
    'technical-faculty': 'mba_technical_faculty',
    'training-activities': 'mba_training_activities',
    'workshops': 'mba_workshops'
  }
};

// Verify user authentication and department access
async function verifyDepartmentAccess(request: NextRequest, department: string) {
  const authHeader = request.headers.get('Authorization');
  console.log('[verifyDepartmentAccess] Auth Header present:', !!authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[verifyDepartmentAccess] ❌ Auth header missing or invalid format');
    return { error: 'Unauthorized', status: 401 };
  }

  const token = authHeader.substring(7);
  console.log('[verifyDepartmentAccess] Token extracted, length:', token.length);
  console.log('[verifyDepartmentAccess] Token preview:', token.substring(0, 50) + '...');

  const user = verifyToken(token);

  if (!user) {
    console.log('[verifyDepartmentAccess] ❌ Token verification FAILED');
    return { error: 'Invalid token', status: 401 };
  }

  console.log('[verifyDepartmentAccess] ✅ Token valid. User:', { id: user.id, username: user.username, role: user.role, department: user.department });

  // Super admin can access all departments
  if (user.role === 'super_admin') {
    console.log('[verifyDepartmentAccess] ✅ Access granted: super_admin role');
    return { user };
  }

  // Allow any authenticated user access (remove department restriction)
  if (user.role === 'admin' || user.role === 'dept') {
    console.log('[verifyDepartmentAccess] ✅ Access granted: admin/dept role');
    return { user };
  }

  console.log('[verifyDepartmentAccess] ❌ Access denied: insufficient permissions for role', user.role);
  return { error: 'Insufficient permissions', status: 403 };
}

// GET - Fetch records from a department module
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    console.log(`[GET] Fetching module data - Department: ${dept}, Module: ${module}`);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 1000); // Cap at 1000
    const search = searchParams.get('search') || '';
    const selectedTable = searchParams.get('table'); // For multi-table modules

    console.log(`[GET] Query params - Page: ${page}, Limit: ${limit}, Search: ${search}, Table: ${selectedTable}`);

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name - for multi-table modules, use selectedTable if provided
    let tableName = DEPARTMENT_MODULES[dept]?.[module];

    // Override table name if this is a multi-table module and a table is specified
    if (module === 'research-center' && selectedTable) {
      tableName = selectedTable;
      console.log(`[GET] Multi-table module (research-center): Using selected table ${selectedTable}`);
    } else if (module === 'student-achievements' && selectedTable) {
      // For student-achievements, get the actual table name from the config
      const moduleConfig = MODULES_FIELD_CONFIG[dept]?.[module];
      if ((moduleConfig as any)?.tables?.[selectedTable]) {
        tableName = (moduleConfig as any).tables[selectedTable].tableName;
        console.log(`[GET] Multi-table module (student-achievements): Using table ${tableName} for key ${selectedTable}`);
      }
    }

    console.log(`[GET] Resolved table name: ${tableName}`);

    if (!tableName) {
      console.log(`[GET] Invalid department or module - ${dept}/${module}`);
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    const offset = (page - 1) * limit;

    // Build search condition with optimized query
    let searchCondition = '';
    let queryParams: any[] = [];

    if (search) {
      // Simple text search on commonly searchable fields instead of querying table structure
      const searchFields = ['title', 'name', 'description', 'subject', 'author', 'company'];
      const availableFields: string[] = [];

      // Quick check for which fields exist (cached approach)
      try {
        const sampleRow = await query<RowDataPacket[]>(
          `SELECT * FROM ${tableName} LIMIT 1`
        );

        if (sampleRow.length > 0) {
          const existingFields = Object.keys(sampleRow[0]);
          availableFields.push(...searchFields.filter(field => existingFields.includes(field)));
        }
      } catch (err) {
        console.warn('Could not determine searchable fields:', err);
      }

      if (availableFields.length > 0) {
        searchCondition = ` WHERE ${availableFields.map(field => `${field} LIKE ?`).join(' OR ')}`;
        queryParams = availableFields.map(() => `%${search}%`);
      }
    }

    console.log(`[GET] Executing optimized queries on table: ${tableName}`);

    // Determine sort order based on module type
    let sortClause = 'ORDER BY id ASC'; // default

    // Dynamically check for sort columns
    let availableSortColumns: string[] = [];
    try {
      const sampleRow = await query<RowDataPacket[]>(
        `SELECT * FROM ${tableName} LIMIT 1`
      );
      if (sampleRow.length > 0) {
        availableSortColumns = Object.keys(sampleRow[0]);
      }
    } catch (err) {
      console.warn('Could not determine available columns for sorting:', err);
    }

    if (module === 'bos-minutes' && availableSortColumns.includes('meeting_date')) {
      sortClause = 'ORDER BY meeting_date DESC, id DESC';
    } else if ((module === 'newsletters' || module === 'faculty-development' || module === 'workshops') && availableSortColumns.includes('created_at')) {
      sortClause = 'ORDER BY created_at DESC, id DESC';
    } else if (dept === 'cse-ai' && availableSortColumns.includes('academic_year')) {
      // CSE-AI tables with academic_year should sort by year DESC
      sortClause = 'ORDER BY academic_year DESC, id DESC';
    } else if (dept === 'cse-ai' && availableSortColumns.includes('year')) {
      // CSE-AI tables with year column should sort by year DESC
      sortClause = 'ORDER BY year DESC, id DESC';
    }

    // Use Promise.all for parallel execution
    const [countResult, records] = await Promise.all([
      // Count query
      query<RowDataPacket[]>(`SELECT COUNT(*) as total FROM ${tableName}${searchCondition}`, queryParams),
      // Data query with optimized LIMIT/OFFSET
      query<RowDataPacket[]>(
        `SELECT * FROM ${tableName}${searchCondition} ${sortClause} LIMIT ${limit} OFFSET ${offset}`,
        queryParams
      )
    ]);

    const total = (countResult[0] as any).total;
    console.log(`[GET] Retrieved ${records.length} records out of ${total} total`);

    // Map database fields back to form fields for frontend
    const mappedRecords = records.map(record => mapFieldsFromDatabase(tableName, record));

    const response = NextResponse.json({
      success: true,
      data: {
        records: mappedRecords,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

    // Explicitly disable caching for GET responses
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;

  } catch (error) {
    console.error('GET error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error details:', { errorMessage, errorStack });
    return NextResponse.json({
      error: 'Internal server error',
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 });
  }
}

// POST - Create new record in department module
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    const body = await request.json();

    console.log(`[POST] Creating record - Department: ${dept}, Module: ${module}`);

    // Get table parameter for multi-table modules
    const { searchParams } = new URL(request.url);
    const selectedTable = searchParams.get('table');
    console.log(`[POST] Selected table parameter: ${selectedTable}`);

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name - for multi-table modules, use selectedTable if provided
    let tableName = DEPARTMENT_MODULES[dept]?.[module];

    // Override table name if this is a multi-table module and a table is specified
    if (module === 'research-center' && selectedTable) {
      tableName = selectedTable;
      console.log(`[POST] Multi-table module (research-center): Using selected table ${selectedTable}`);
    } else if (module === 'student-achievements' && selectedTable) {
      // For student-achievements, get the actual table name from the config
      const moduleConfig = MODULES_FIELD_CONFIG[dept]?.[module];
      if ((moduleConfig as any)?.tables?.[selectedTable]) {
        tableName = (moduleConfig as any).tables[selectedTable].tableName;
        console.log(`[POST] Multi-table module (student-achievements): Using table ${tableName} for key ${selectedTable}`);
      }
    }

    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    // Remove system fields
    delete body.id;
    delete body.created_at;
    delete body.updated_at;

    // Filter out empty values
    const filteredBody: Record<string, any> = {};
    for (const [key, value] of Object.entries(body)) {
      if (value !== '' && value !== null && value !== undefined) {
        filteredBody[key] = value;
      }
    }

    if (Object.keys(filteredBody).length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    // Map form fields to database fields
    const mappedBody = mapFieldsToDatabase(tableName, filteredBody);
    console.log(`[POST] Field mapping for ${tableName}:`, { original: filteredBody, mapped: mappedBody });

    // Auto-add dept field if table requires it (but not for syllabus module)
    // Check if table structure includes dept field by testing with a sample query
    if (module !== 'syllabus') {
      try {
        const sampleRow = await query<RowDataPacket[]>(`SELECT * FROM ${tableName} LIMIT 1`);
        if (sampleRow.length === 0) {
          // Empty table - check table structure
          const columns = await query<RowDataPacket[]>(`SHOW COLUMNS FROM ${tableName}`);
          const deptColumn = columns.find((col: any) => col.Field === 'dept');
          if (deptColumn && !mappedBody.dept) {
            mappedBody.dept = dept;
            console.log(`[POST] Auto-added dept field: ${dept}`);
          }
        } else {
          // Non-empty table - check if first row has dept field
          if (sampleRow[0].hasOwnProperty('dept') && !mappedBody.dept) {
            mappedBody.dept = dept;
            console.log(`[POST] Auto-added dept field: ${dept}`);
          }
        }
      } catch (err) {
        console.warn(`[POST] Could not check dept field for ${tableName}:`, err);
        // Fallback: try adding dept field for known department tables
        if (!mappedBody.dept && (tableName.includes('_') && (
          tableName.startsWith('cai_') ||
          tableName.startsWith('ece_') ||
          tableName.startsWith('cst_') ||
          tableName.startsWith('eee_') ||
          tableName.startsWith('mba_') ||
          tableName.startsWith('bsh_') ||
          tableName.startsWith('civil_') ||
          tableName.startsWith('mech_') ||
          tableName.startsWith('ect_') ||
          tableName.startsWith('aiml_') ||
          tableName.startsWith('ds_')
        ))) {
          mappedBody.dept = dept;
          console.log(`[POST] Fallback: Auto-added dept field: ${dept}`);
        }
      }
    }

    // Check for JSON columns and convert string values to proper JSON format
    // Also filter out any fields that are not real columns in this table.
    try {
      const tableColumns = await query<RowDataPacket[]>(`SHOW COLUMNS FROM ${tableName}`);
      const validColumns = new Set(tableColumns.map((c: any) => (c as any).Field));
      const validColumnsList = Array.from(validColumns);

      console.log(`[POST] Valid columns for ${tableName}:`, validColumnsList);
      console.log(`[POST] Data before column validation:`, mappedBody);

      for (const col of tableColumns) {
        const columnName = (col as any).Field;
        const columnType = ((col as any).Type as string).toLowerCase();

        // If column is JSON type and the value is a string (file URL), wrap it in JSON array
        if (columnType.includes('json') && mappedBody[columnName]) {
          const value = mappedBody[columnName];
          if (typeof value === 'string' && value.trim() !== '' && !value.startsWith('[') && !value.startsWith('{')) {
            // Convert string URL to JSON array format
            mappedBody[columnName] = JSON.stringify([value]);
            console.log(`[POST] Converted ${columnName} to JSON array:`, mappedBody[columnName]);
          }
        }
      }

      const keysBeforeFilter = Object.keys(mappedBody);
      for (const key of keysBeforeFilter) {
        if (!validColumns.has(key)) {
          console.warn(`[POST] Dropping unknown column '${key}' for table ${tableName}`);
          delete mappedBody[key];
        }
      }
      console.log(`[POST] Data after column validation:`, mappedBody);
    } catch (err) {
      console.warn(`[POST] Could not validate columns for ${tableName}:`, err);
    }

    if (Object.keys(mappedBody).length === 0) {
      return NextResponse.json({ 
        error: 'No valid columns provided',
        details: `The data sent could not be matched to any database columns. Table: ${tableName}`,
        received: body,
        mapped: Object.keys(mappedBody)
      }, { status: 400 });
    }

    // Auto-populate 'type' field if missing and the table has a 'type' column
    if (!mappedBody.type && tableName.includes('_faculty_achievements')) {
      // For faculty achievements tables, default type to 'general' or 'publication'
      mappedBody.type = 'general';
      console.log(`[POST] Auto-added type field: ${mappedBody.type}`);
    }

    // Auto-generate title field for research-center tables if not provided
    if (module === 'research-center' && !mappedBody.title) {
      // For Research Verticles
      if (mappedBody.faculty_name && mappedBody.category) {
        mappedBody.title = `${mappedBody.category} - ${mappedBody.faculty_name}`;
        console.log(`[POST] Auto-generated title for research verticles: ${mappedBody.title}`);
      }
      // For Research Supervisor
      else if (mappedBody.name && mappedBody.scholar_name) {
        mappedBody.title = `${mappedBody.name} - ${mappedBody.scholar_name}`;
        console.log(`[POST] Auto-generated title for research supervisor: ${mappedBody.title}`);
      }
      // For Journal Publications
      else if (mappedBody.year && selectedTable === 'eee_journal_publications') {
        mappedBody.title = `Journal Publications Details ${mappedBody.year}`;
        console.log(`[POST] Auto-generated title for journal publications: ${mappedBody.title}`);
      }
      // For Conference Publications
      else if (mappedBody.faculty_name && mappedBody.paper_title) {
        const paperPreview = mappedBody.paper_title.substring(0, 50);
        mappedBody.title = `${mappedBody.faculty_name} - ${paperPreview}${mappedBody.paper_title.length > 50 ? '...' : ''}`;
        console.log(`[POST] Auto-generated title for conference publications: ${mappedBody.title}`);
      }
      // For Patents
      else if (mappedBody.patent_title && mappedBody.inventors) {
        const titlePreview = mappedBody.patent_title.substring(0, 50);
        mappedBody.title = `${mappedBody.inventors.split(/[,&]/)[0].trim()} - ${titlePreview}${mappedBody.patent_title.length > 50 ? '...' : ''}`;
        console.log(`[POST] Auto-generated title for patents: ${mappedBody.title}`);
      }
      // For Book Publications
      else if (mappedBody.faculty_name && mappedBody.book_title) {
        const bookPreview = mappedBody.book_title.substring(0, 50);
        mappedBody.title = `${mappedBody.faculty_name} - ${bookPreview}${mappedBody.book_title.length > 50 ? '...' : ''}`;
        console.log(`[POST] Auto-generated title for book publications: ${mappedBody.title}`);
      }
      // For Career Advancements
      else if (mappedBody.faculty_name && mappedBody.pursuing_degree) {
        mappedBody.title = `${mappedBody.faculty_name} - ${mappedBody.pursuing_degree}`;
        console.log(`[POST] Auto-generated title for career advancements: ${mappedBody.title}`);
      }
      // For Interaction with outside world
      else if (mappedBody.faculty_name && mappedBody.journal_details) {
        const journalPreview = mappedBody.journal_details.substring(0, 50);
        mappedBody.title = `${mappedBody.faculty_name} - ${journalPreview}${mappedBody.journal_details.length > 50 ? '...' : ''}`;
        console.log(`[POST] Auto-generated title for interaction outside world: ${mappedBody.title}`);
      }
      else if (mappedBody.faculty_name) {
        mappedBody.title = mappedBody.faculty_name;
        console.log(`[POST] Auto-generated title from faculty_name: ${mappedBody.title}`);
      } else if (mappedBody.name) {
        mappedBody.title = mappedBody.name;
        console.log(`[POST] Auto-generated title from name: ${mappedBody.title}`);
      }
    }

    // Build insert query
    const columns = Object.keys(mappedBody);
    const values = Object.values(mappedBody);
    const placeholders = columns.map(() => '?').join(', ');

    const insertQuery = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    const result = await query<OkPacket>(insertQuery, values);

    // Fetch the created record
    const newRecord = await query<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [(result as any).insertId]
    );

    // Map database fields back to form fields for frontend
    const mappedRecord = mapFieldsFromDatabase(tableName, newRecord[0]);

    // Trigger auto-refresh in department view pages
    triggerDepartmentRefresh(dept, module);

    return NextResponse.json({
      success: true,
      data: mappedRecord,
      message: 'Record created successfully'
    });

  } catch (error) {
    console.error('POST error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error details:', { errorMessage, errorStack });
    return NextResponse.json({
      error: 'Internal server error',
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 });
  }
}

// PUT - Update existing record in department module
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const selectedTable = searchParams.get('table'); // For multi-table modules

    console.log(`[PUT] Updating record - Department: ${dept}, Module: ${module}, Table: ${selectedTable}`);

    if (!idParam) {
      return NextResponse.json({ error: 'Record ID is required' }, { status: 400 });
    }

    // Convert ID to number
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid record ID format' }, { status: 400 });
    }

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name - for multi-table modules, use selectedTable if provided
    let tableName = DEPARTMENT_MODULES[dept]?.[module];

    // Override table name if this is a multi-table module and a table is specified
    if (module === 'research-center' && selectedTable) {
      tableName = selectedTable;
      console.log(`[PUT] Multi-table module (research-center): Using selected table ${selectedTable}`);
    } else if (module === 'student-achievements' && selectedTable) {
      // For student-achievements, get the actual table name from the config
      const moduleConfig = MODULES_FIELD_CONFIG[dept]?.[module];
      if ((moduleConfig as any)?.tables?.[selectedTable]) {
        tableName = (moduleConfig as any).tables[selectedTable].tableName;
        console.log(`[PUT] Multi-table module (student-achievements): Using table ${tableName} for key ${selectedTable}`);
      }
    }

    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    // Remove system fields
    delete body.id;
    delete body.created_at;
    delete body.updated_at;

    // Filter out empty values
    const filteredBody: Record<string, any> = {};
    for (const [key, value] of Object.entries(body)) {
      if (value !== '' && value !== null && value !== undefined) {
        filteredBody[key] = value;
      }
    }

    if (Object.keys(filteredBody).length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    // Get existing record for file comparison
    const existingRecord = await query<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const oldRecordData = existingRecord[0];

    // Map form fields to database fields
    const mappedBody = mapFieldsToDatabase(tableName, filteredBody);
    console.log(`[PUT] Field mapping for ${tableName}:`, { original: filteredBody, mapped: mappedBody });

    // Check for JSON columns and convert string values to proper JSON format
    // Also filter out any fields that are not real columns in this table.
    try {
      const tableColumns = await query<RowDataPacket[]>(`SHOW COLUMNS FROM ${tableName}`);
      const validColumns = new Set(tableColumns.map((c: any) => (c as any).Field));

      for (const col of tableColumns) {
        const columnName = (col as any).Field;
        const columnType = ((col as any).Type as string).toLowerCase();

        // If column is JSON type and the value is a string (file URL), wrap it in JSON array
        if (columnType.includes('json') && mappedBody[columnName]) {
          const value = mappedBody[columnName];
          if (typeof value === 'string' && value.trim() !== '' && !value.startsWith('[') && !value.startsWith('{')) {
            // Convert string URL to JSON array format
            mappedBody[columnName] = JSON.stringify([value]);
            console.log(`[PUT] Converted ${columnName} to JSON array:`, mappedBody[columnName]);
          }
        }
      }

      for (const key of Object.keys(mappedBody)) {
        if (!validColumns.has(key)) {
          console.warn(`[PUT] Dropping unknown column '${key}' for table ${tableName}`);
          delete mappedBody[key];
        }
      }
    } catch (err) {
      console.warn(`[PUT] Could not validate columns for ${tableName}:`, err);
    }

    if (Object.keys(mappedBody).length === 0) {
      return NextResponse.json({ 
        error: 'No valid columns provided',
        details: `The data sent could not be matched to any database columns for update. Table: ${tableName}`,
        received: body,
        mapped: Object.keys(mappedBody)
      }, { status: 400 });
    }

    // Delete replaced files before updating
    try {
      await deleteReplacedFiles(oldRecordData, mappedBody);
      console.log(`🔄 Successfully cleaned up replaced files for ${dept}/${module} record ID: ${id}`);
    } catch (fileError) {
      console.error(`⚠️ Error cleaning up replaced files for ${dept}/${module} record ID: ${id}`, fileError);
      // Continue with database update even if file cleanup fails
    }    // Build update query
    const columns = Object.keys(mappedBody);
    const values = Object.values(mappedBody);
    const setClause = columns.map(col => `${col} = ?`).join(', ');

    const updateQuery = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
    await query(updateQuery, [...values, id]);

    // Fetch the updated record
    const updatedRecord = await query<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    if (updatedRecord.length === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    // Map database fields back to form fields for frontend
    const mappedRecord = mapFieldsFromDatabase(tableName, updatedRecord[0]);

    // Trigger auto-refresh in department view pages
    triggerDepartmentRefresh(dept, module);

    return NextResponse.json({
      success: true,
      data: mappedRecord,
      message: 'Record updated successfully'
    });

  } catch (error) {
    console.error('PUT error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error details:', { errorMessage, errorStack });
    return NextResponse.json({
      error: 'Internal server error',
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 });
  }
}

// DELETE - Delete record from department module
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const selectedTable = searchParams.get('table'); // For multi-table modules

    console.log(`[DELETE] Deleting record - Department: ${dept}, Module: ${module}, Table: ${selectedTable}`);

    if (!idParam) {
      return NextResponse.json({ error: 'Record ID is required' }, { status: 400 });
    }

    // Convert ID to number
    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid record ID format' }, { status: 400 });
    }

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name - for multi-table modules, use selectedTable if provided
    let tableName = DEPARTMENT_MODULES[dept]?.[module];

    // Override table name if this is a multi-table module and a table is specified
    if (module === 'research-center' && selectedTable) {
      tableName = selectedTable;
      console.log(`[DELETE] Multi-table module (research-center): Using selected table ${selectedTable}`);
    } else if (module === 'student-achievements' && selectedTable) {
      // For student-achievements, get the actual table name from the config
      const moduleConfig = MODULES_FIELD_CONFIG[dept]?.[module];
      if ((moduleConfig as any)?.tables?.[selectedTable]) {
        tableName = (moduleConfig as any).tables[selectedTable].tableName;
        console.log(`[DELETE] Multi-table module (student-achievements): Using table ${tableName} for key ${selectedTable}`);
      }
    }

    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    // Check if record exists and get current data
    const existingRecord = await query<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const recordData = existingRecord[0];

    // Delete the record from database first (fast operation)
    await query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);

    // Trigger auto-refresh in department view pages
    triggerDepartmentRefresh(dept, module);

    // Return success immediately, then clean up files asynchronously
    const response = NextResponse.json({
      success: true,
      message: 'Record deleted successfully'
    });

    // Cleanup files in the background (don't await this)
    setImmediate(async () => {
      try {
        await deleteRecordFiles(recordData);
        console.log(`🗑️ Successfully cleaned up files for ${dept}/${module} record ID: ${id}`);
      } catch (fileError) {
        console.error(`⚠️ Error cleaning up files for ${dept}/${module} record ID: ${id}`, fileError);
        // File cleanup failure doesn't affect the user - record is already deleted
      }
    });

    return response;

  } catch (error) {
    console.error('DELETE error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error details:', { errorMessage, errorStack });
    return NextResponse.json({
      error: 'Internal server error',
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 });
  }
}