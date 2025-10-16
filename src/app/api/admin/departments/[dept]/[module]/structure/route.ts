import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { validateSession, getUserById } from '@/lib/auth/auth';
import { RowDataPacket } from 'mysql2';

// Department modules mapping
const DEPARTMENT_MODULES: Record<string, Record<string, string>> = {
  'cse-ai': {
    'board-of-studies': 'cai_board_of_studies',
    'contact': 'cai_contact',
    'department-info': 'cai_department_info',
    'department-library': 'cai_department_library',
    'eresources': 'cai_eresources',
    'extracurricular-activities': 'cai_extracurricular_activities',
    'extra-curricular': 'cai_extra_curricular',
    'faculty-achievements': 'cai_faculty_achievements',
    'faculty-development-programs': 'cai_faculty_development_programs',
    'faculty': 'cai_faculty',
    'hackathons': 'cai_hackathons',
    'hackathon-gallery': 'cai_hackathon_gallery',
    'handbooks': 'cai_handbooks',
    'merit-scholarships': 'cai_merit_scholarships',
    'newsletters': 'cai_newsletters',
    'physical-facilities': 'cai_physical_facilities',
    'placement-batches': 'cai_placement_batches',
    'placement-gallery': 'cai_placement_gallery',
    'scud-activities': 'cai_scud_activities',
    'scud-gallery': 'cai_scud_gallery',
    'staff': 'cai_staff',
    'student-achievements': 'cai_student_achievements',
    'technical-association': 'cai_technical_association',
    'training-activities': 'cai_training_activities',
    'training-gallery': 'cai_training_gallery',
    'workshops': 'cai_workshops'
  },
  'ece': {
    'board-of-studies': 'ece_board_of_studies',
    'clubs': 'ece_clubs',
    'extracurricular-activities': 'ece_extracurricular_activities',
    'faculty-achievements': 'ece_faculty_achievements',
    'faculty-data': 'ece_faculty_data',
    'faculty-innovations': 'ece_faculty_innovations',
    'fdp': 'ece_fdp',
    'handbooks': 'ece_handbooks',
    'mous': 'ece_mous',
    'newsletters': 'ece_newletters',
    'ntfaculty': 'ece_nonteaching_faculty',
    'physical-facilities': 'ece_physical_facilities',
    'placements': 'ece_placements',
    'scholarships-toppers': 'ece_scholarships_toppers',
    'syllabus': 'ece_syllabus',
    'teaching-faculty': 'ece_teaching_faculty',
    'technical-association': 'ece_technicalAssociation_trainingActivities',
    'workshops': 'ece_worshops_gl'
  },
  'civil': {
    'board-of-studies': 'bos_civil_meeting_minutes',
    'consultancy': 'civil_consultancy',
    'extra-curricular': 'civil_extra_curricular_activities',
    'newsletters': 'civil_newsletters',
    'physical-facilities': 'civil_physical_facilities',
    'student-achievements': 'civil_student_achievements',
    'syllabus': 'civil_syllabus',
    'technical-association': 'civil_technical_association',
    'workshops': 'civil_workshops'
  },
  'mech': {
    'faculty': 'mech_faculty',
    'faculty-achievements': 'mech_facultyachievements',
    'faculty-methods': 'mech_facultyTLmethods',
    'laboratories': 'mech_laboratories',
    'library': 'mech_library',
    'magazines': 'mech_magazines',
    'mous': 'mech_mous',
    'newsletters': 'mech_newsletters',
    'placements': 'mech_placements',
    'project-research': 'mech_project_research',
    'student-achievements': 'mech_studentachievements',
    'syllabus': 'mech_syllabus',
    'technical-association': 'mech_technicalassociation',
    'workshops': 'mech_workshops'
  },
  'cse': {
    'department-library': 'cse_department_library',
    'eresources': 'cse_eresources',
    'faculty-achievements': 'cse_faculty_achievements',
    'student-achievements': 'cse_student_achievements',
    'syllabus': 'cse_syllabus'
  },
  'cst': {
    'bos-members': 'cst_bos_members',
    'bos-minutes': 'cst_bos_minutes',
    'department-library': 'cst_department_library',
    'department-overview': 'cst_department_overview',
    'eresources': 'cst_eresources',
    'extra-curricular': 'cst_extra_curricular',
    'faculty': 'cst_faculty',
    'faculty-achievements': 'cst_faculty_achievements',
    'faculty-development': 'cst_faculty_development',
    'hackathons': 'cst_hackathons',
    'handbooks': 'cst_handbooks',
    'industry-programs': 'cst_industry_programs',
    'merit-scholarships': 'cst_merit_scholarships',
    'mous': 'cst_mous',
    'newsletters': 'cst_newsletters',
    'non-teaching-faculty': 'cst_non_teaching_faculty',
    'physical-facilities': 'cst_physical_facilities',
    'placements': 'cst_placements',
    'sahaya-events': 'cst_sahaya_events',
    'scud-activities': 'cst_scud_activities',
    'student-achievements': 'cst_student_achievements',
    'syllabus': 'cst_syllabus',
    'technical-faculty': 'cst_technical_faculty',
    'training-activities': 'cst_training_activities'
  },
  'eee': {
    'syllabus': 'EEE_Syllabus'
  },
  'mba': {
    'faculty': 'faculty_profiles'
  },
  'bsh': {
    'activities': 'bsh_activities',
    'board-of-studies': 'bsh_board_of_studies',
    'department-documents': 'bsh_department_documents',
    'department-profile': 'bsh_department_profile',
    'faculty': 'bsh_faculty',
    'faculty-achievements': 'bsh_faculty_achievements',
    'faculty-paper-presentations': 'bsh_faculty_paper_presentations',
    'laboratories': 'bsh_laboratories',
    'results': 'bsh_results',
    'student-achievements': 'bsh_student_achievements',
    'non-teaching-faculty': 'non_teaching_bsh_faculty'
  },
  'ect': {
    'clubs': 'ect_clubs',
    'extracurricular-activities': 'ect_extracurricular_activities',
    'faculty': 'ect_faculty',
    'faculty-innovations': 'ect_facultyinnovations',
    'faculty-achievements': 'ect_faculty_achievements',
    'fdp': 'ect_fdp',
    'handbooks': 'ect_handbooks',
    'mous': 'ect_mous',
    'newsletters': 'ect_newsletters',
    'physical-facilities': 'ect_physical_facilities',
    'placements': 'ect_placements',
    'scholarships-toppers': 'ect_scholarships_toppers',
    'syllabus': 'ect_syllabus',
    'technical-association': 'ect_technical_association',
    'training-activities': 'ect_training_activities',
    'workshop': 'ect_workshop_gl'
  },
  'aiml': {
    'classrooms': 'aiml_classrooms',
    'class-time-tables': 'aiml_class_time_tables',
    'laboratories': 'aiml_laboratories',
    'other-laboratories': 'aiml_other_laboratories',
    'seminar-halls': 'aiml_seminar_halls',
    'student-achievements': 'aiml_student_achievements'
  },
  'cse-ds': {
    'board-of-studies': 'ds_board_of_studies',
    'bos-meeting-minutes': 'ds_bos_meeting_minutes',
    'contact': 'ds_contact',
    'department-library': 'ds_department_library',
    'department-profile': 'ds_department_profile',
    'eresources': 'ds_eresources',
    'extracurricular': 'ds_extracurricular',
    'faculty': 'ds_faculty',
    'faculty-achievements': 'ds_faculty_achievements',
    'faculty-development': 'ds_faculty_development',
    'hackathons': 'ds_hackathons',
    'handbooks': 'ds_handbooks',
    'merit-scholarships': 'ds_merit_scholarships',
    'mous': 'ds_mous',
    'newsletters': 'ds_newsletters',
    'non-teaching-staff': 'ds_non_teaching_staff',
    'physical-facilities': 'ds_physical_facilities',
    'placements': 'ds_placements',
    'student-achievements': 'ds_student_achievements',
    'syllabus': 'ds_syllabus',
    'technical-association': 'ds_technical_association',
    'training-activities': 'ds_training_activities',
    'workshops': 'ds_workshops'
  }
};

// Verify user authentication
async function verifyAuth(request: NextRequest) {
  const sessionId = request.headers.get('x-session-id');

  // console.log(sessionId);
  
  if (!sessionId) {
    return { error: 'Unauthorized - No session ID provided', status: 401 };
  }

  const userId = validateSession(sessionId);

  // console.log('Verified user ID:', userId);
  
  if (!userId) {
    return { error: 'Invalid session', status: 401 };
  }

  const user = await getUserById(userId);

  // console.log('Authenticated user:', user);

  if (!user) {
    return { error: 'User not found', status: 401 };
  }

  return { user };
}

// GET - Fetch table structure for dynamic form generation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;

    // Verify access
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name
    const tableName = DEPARTMENT_MODULES[dept]?.[module];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    // Get table structure
    const columns = await query<RowDataPacket[]>(
      `SHOW COLUMNS FROM \`${tableName}\``
    );

    return NextResponse.json({
      success: true,
      fields: columns,
      tableName
    });

  } catch (error) {
    console.error('Structure fetch error:', error);
    
    // If table doesn't exist, return default structure
    if (error instanceof Error && error.message.includes("doesn't exist")) {
      return NextResponse.json({
        success: true,
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