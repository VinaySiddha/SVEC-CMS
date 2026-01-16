import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth/auth';
import { RowDataPacket } from 'mysql2';
import { getModuleFieldConfig, MODULES_FIELD_CONFIG } from '@/config/module-fields';

// Disable caching for this entire route to ensure fresh structure on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Department modules mapping - Updated for Civil BOS minutes
const DEPARTMENT_MODULES: Record<string, Record<string, string>> = {
  'cse-ai': {
    'bos-members': 'cai_bos_members',
    'bos-minutes': 'cai_bos_minutes',
    'activity-coordinators': 'cai_activity_coordinators',
    'activity-events': 'cai_activity_events',
    'activity-gallery': 'cai_activity_gallery',
    'department-library': 'cai_department_library',
    'department-overview': 'cai_department_overview',
    'eresources': 'cai_eresources',
    'extra-curricular': 'cai_extra_curricular',
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
    'technical-association': 'cai_extra_curricular',
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
    'activity-coordinators': 'eee_activity_coordinators',
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
    'handbooks': 'eee_handbooks',
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
    'technical-handbooks': 'eee_technical_handbooks',
    'faculty-innovations': 'eee_faculty_innovations',
    'research-center': 'eee_research_verticles'
  },
  'mba': {
    'activity-coordinators': 'mba_activity_coordinators',
    'activity-events': 'mba_activity_events',
    'activity-gallery': 'mba_activity_gallery',
    'bos-members': 'mba_bos_members',
    'board-of-studies': 'mba_board_of_studies',
    'bos-minutes': 'mba_bos_minutes',
    'department-library': 'mba_department_library',
    'department-overview': 'mba_department_overview',
    'extra-curricular': 'mba_extracurricular_activities',
    'faculty': 'mba_faculty',
    'faculty-profiles': 'mba_faculty',
    'faculty-achievements': 'mba_faculty_achievements',
    'faculty-development': 'mba_faculty_development_programs',
    'hackathons': 'mba_hackathons',
    'handbooks': 'mba_handbooks',
    'industry-programs': 'mba_industry_programs',
    'merit-scholarships': 'mba_merit_scholarships',
    'mous': 'mba_mous',
    'newsletters': 'mba_newsletters',
    'non-teaching-faculty': 'mba_non_teaching_faculty',
    'physical-facilities': 'mba_physical_facilities',
    'placements': 'mba_placements',
    'sahaya-events': 'mba_sahaya_events',
    'scud-activities': 'mba_scud_activities',
    'student-achievements': 'mba_student_achievements',
    'syllabus': 'mba_syllabus',
    'technical-faculty': 'mba_technical_faculty',
    'training-activities': 'mba_training_activities',
    'workshops': 'mba_workshops'
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
    'extra-curricular': 'aiml_extra_curricular',
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
    'non-teaching-faculty': 'cst_non_teaching_faculty',
    'gate': 'cst_gate',
    'hackathons': 'cst_hackathons',
    'hackathons-gallery': 'cst_hackathons_gallery',
    'handbooks': 'cst_handbooks',
    'industry-programs': 'cst_industry_programs',
    'merit-scholarships': 'cst_merit_scholarships',
    'mous': 'cst_mous',
    'newsletters': 'cst_newsletters',
    'physical-facilities': 'cst_physical_facilities',
    'placements': 'cst_placements',
    'roll-of-honour': 'cst_roll_of_honour',
    'sahaya-events': 'cst_sahaya_events',
    'scud-activities': 'cst_scud_activities',
    'student-achievements': 'cst_student_achievements',
    'syllabus': 'cst_syllabus',
    'technical-association': 'cst_technical_association',
    'technical-faculty': 'cst_technical_faculty',
    'training-activities': 'cst_training_activities',
    'workshops': 'cst_workshops'
  },
  
};

// Verify user authentication
async function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }

  const token = authHeader.substring(7);
  const user = verifyToken(token);

  if (!user) {
    return { error: 'Invalid token', status: 401 };
  }

  return { user };
}

// GET - Fetch table structure and field configuration for dynamic form generation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    const { searchParams } = new URL(request.url);
    const selectedTable = searchParams.get('table');
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    const moduleConfig = MODULES_FIELD_CONFIG[dept]?.[module];
    const isMultiTable = (moduleConfig as any)?.isMultiTable;
    if (isMultiTable && !selectedTable) {
      // Return the list of available tables
      const tables = (moduleConfig as any).tables || {};
      const response = NextResponse.json({
        success: true,
        isMultiTable: true,
        tables: Object.keys(tables).map(key => ({
          key,
          tableName: tables[key].tableName,
          sectionTitle: tables[key].sectionTitle,
          displayField: tables[key].displayField
        }))
      });
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      return response;
    }

    // Get table name
    let tableName = DEPARTMENT_MODULES[dept]?.[module];

    // For multi-table modules, table name comes from the specific table config
    if (isMultiTable && selectedTable) {
      // Check for new format (tables)
      const tables = (moduleConfig as any).tables || {};
      if (tables[selectedTable]?.tableName) {
        tableName = tables[selectedTable].tableName;
      } else {
        // Check for old format (tableConfigs) - the selectedTable IS the table name
        const tableConfigs = (moduleConfig as any).tableConfigs || {};
        if (tableConfigs[selectedTable]) {
          tableName = selectedTable; // For old format, the key IS the table name
        }
      }
    }
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department, module, or table' }, { status: 404 });
    }
    const fieldConfig = getModuleFieldConfig(dept, module, selectedTable || undefined);

    if (fieldConfig) {
      // Return configured field structure
      const response = NextResponse.json({
        success: true,
        source: 'config',
        dept,
        module,
        isMultiTable,
        selectedTable,
        tableName: fieldConfig.tableName,
        displayField: fieldConfig.displayField,
        fields: fieldConfig.fields,
        searchableFields: fieldConfig.searchableFields || [],
        sortableFields: fieldConfig.sortableFields || [],
        editableFields: fieldConfig.editableFields || []
      });
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      return response;
    }
    const columns = await query<RowDataPacket[]>(
      `SHOW COLUMNS FROM \`${tableName}\``
    );

    const response = NextResponse.json({
      success: true,
      source: 'database',
      fields: columns,
      tableName
    });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes("doesn't exist")) {
      return NextResponse.json({
        success: true,
        source: 'default',
        fields: [
          { Field: 'title', Type: 'varchar(255)', Null: 'YES', Key: '', Default: null, Extra: '' },
          { Field: 'description', Type: 'text', Null: 'YES', Key: '', Default: null, Extra: '' },
          { Field: 'content', Type: 'text', Null: 'YES', Key: '', Default: null, Extra: '' }
        ],
        tableName: 'default'
      });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}