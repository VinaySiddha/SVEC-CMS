import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth/auth';
import { RowDataPacket } from 'mysql2';
import { extractFilePathFromUrl } from '@/utils/file-management';
import fs from 'fs/promises';

// Department modules mapping - same as parent route
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
    'extra-curricular': 'cai_extra_curricular',
    'faculty': 'cai_faculty',
    'faculty-achievements': 'cai_faculty_achievements',
    'faculty-development': 'cai_faculty_development_programs',
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
  'mba': {
    'activity-coordinators': 'mba_activity_coordinators',
    'activity-events': 'mba_activity_events',
    'activity-gallery': 'mba_activity_gallery',
    'bos-members': 'mba_bos_members',
    'bos-minutes': 'mba_bos_minutes',
    'department-library': 'mba_department_library',
    'department-overview': 'mba_department_overview',
    'extra-curricular': 'mba_extracurricular_activities',
    'faculty': 'mba_faculty',
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
  'cse-ds': {
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
    'training-activities': 'ds_training_activities'
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
  'ece': {
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
    'newsletters': 'ece_newsletters',
    'non-teaching-faculty': 'ece_non_teaching_faculty',
    'physical-facilities': 'ece_physical_facilities',
    'placements': 'ece_placements',
    'student-achievements': 'ece_student_achievements',
    'syllabus': 'ece_syllabus',
    'technical-association': 'ece_technicalAssociation_trainingActivities',
    'technical-faculty': 'ece_technical_faculty',
    'workshops': 'ece_worshops_gl'
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
    'faculty-development': 'eee_faculty_development_programs',
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
    'fdp': 'eee_faculty_development',
    'technical-handbooks': 'eee_technical_handbooks',
    'faculty-innovations': 'eee_faculty_innovations',
    'research-center': 'eee_research_verticles'
  },

  'civil': {
    'bos-minutes': 'civil_bos_minutes',
    'bos-members': 'civil_bos_members',
    'consultancy': 'civil_consultancy',
    'industry-programs': 'civil_industry_programs',
    'technical-faculty':'civil_technical_faculty',
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
    'technical-association': 'civil_technical_association',
    'technical-association-gallery': 'civil_technical_association_gallery',
    'training-activities': 'civil_training_activities',
    'training-activities-gallery': 'civil_training_activities_gallery',
    'workshops': 'civil_workshops',
    'workshops-gallery': 'civil_workshops_gallery'
  },
  'ect': {
    'bos-members': 'ect_bos_members',
    'bos-minutes': 'ect_bos_minutes',
    'department-library': 'ect_department_library',
    'department-overview': 'ect_department_overview',
    'eresources': 'ect_eresources',
    'extra-curricular': 'ect_extracurricular_activities',
    'faculty': 'ect_faculty',
    'faculty-achievements': 'ect_faculty_achievements',
    'faculty-development': 'ect_faculty_development',
    'non-teaching-faculty': 'ect_non_teaching_faculty',
    'gate': 'ect_gate',
    'hackathons': 'ect_hackathons',
    'hackathons-gallery': 'ect_hackathons_gallery',
    'handbooks': 'ect_handbooks',
    'industry-programs': 'ect_industry_programs',
    'merit-scholarships': 'ect_merit_scholarships',
    'mou-documents': 'ect_mou_documents',
    'mous': 'ect_mous',
    'newsletters': 'ect_newsletters',
    'physical-facilities': 'ect_physical_facilities',
    'placements': 'ect_placements',
    'roll-of-honour': 'ect_roll_of_honour',
    'sahaya-events': 'ect_sahaya_events',
    'scud-activities': 'ect_scud_activities',
    'student-achievements': 'ect_student_achievements',
    'syllabus': 'ect_syllabus',
    'technical-association': 'ect_technical_association',
    'technical-faculty': 'ect_technical_faculty',
    'training-activities': 'ect_training_activities',
    'workshops': 'ect_workshops'
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
};

// Verify user authentication and department access
async function verifyDepartmentAccess(request: NextRequest, department: string) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }

  const token = authHeader.substring(7);
  const user = verifyToken(token);

  if (!user) {
    return { error: 'Invalid token', status: 401 };
  }

  // Super admin can access all departments
  if (user.role === 'super_admin') {
    return { user };
  }

  // Allow any authenticated admin/dept user access
  if (user.role === 'admin' || user.role === 'dept') {
    return { user };
  }

  return { error: 'Insufficient permissions', status: 403 };
}

// DELETE - Delete a specific file from a record (using query params)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  return await handleFileDelete(request, params, 'query');
}

// POST - Delete a specific file from a record (using body params)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  return await handleFileDelete(request, params, 'body');
}

// Common file deletion handler
async function handleFileDelete(
  request: NextRequest,
  params: Promise<{ dept: string; module: string }>,
  paramSource: 'query' | 'body'
) {
  try {
    const { dept, module } = await params;

    let id: string | null = null;
    let field: string | null = null;
    let fileUrl: string | null = null;

    if (paramSource === 'query') {
      // DELETE method - get params from query string
      const { searchParams } = new URL(request.url);
      id = searchParams.get('id');
      field = searchParams.get('field');
    } else {
      // POST method - get params from body
      const body = await request.json();
      id = body.id;
      field = body.field;
      fileUrl = body.fileUrl; // Direct file URL deletion
    }


    if (!id && !fileUrl) {
      return NextResponse.json({ error: 'Record ID or file URL is required' }, { status: 400 });
    }

    if (!field && !fileUrl) {
      return NextResponse.json({ error: 'Field name or file URL is required' }, { status: 400 });
    }

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name
    const tableName = DEPARTMENT_MODULES[dept]?.[module];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    let recordData: any = null;
    let targetFileUrl = fileUrl;

    // If we have an ID and field, get the file URL from the database
    if (id && field && !fileUrl) {
      // Get the current record to access the file URL
      const existingRecord = await query<RowDataPacket[]>(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id]
      );

      if (existingRecord.length === 0) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }

      recordData = existingRecord[0];
      targetFileUrl = recordData[field];

      if (!targetFileUrl) {
        return NextResponse.json({ error: 'No file found in specified field' }, { status: 400 });
      }
    }


    // Delete the physical file
    try {
      // Only attempt extraction if we have a file URL
      if (targetFileUrl) {
        // Extract file path from URL using the utility function
        const filePath = extractFilePathFromUrl(targetFileUrl);


        if (filePath) {
          // Check if file exists before attempting deletion
          try {
            await fs.access(filePath);

            await fs.unlink(filePath);
          } catch (fileError) {
            // Continue with database update even if physical file deletion fails
          }
        } else {
        }
      } else {
      }
    } catch (error) {
    }

    // Update the database to remove the file URL (only if we have ID and field)
    let updatedRecord = null;
    if (id && field) {
      // For hackathons-gallery, delete the entire record since it's a single-image module
      if (module === 'hackathons-gallery') {
        await query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
      } else {
        // For other modules, just set the field to NULL
        const updateQuery = `UPDATE ${tableName} SET ${field} = NULL WHERE id = ?`;
        await query(updateQuery, [id]);

        // Fetch the updated record
        const updatedRecords = await query<RowDataPacket[]>(
          `SELECT * FROM ${tableName} WHERE id = ?`,
          [id]
        );
        updatedRecord = updatedRecords[0];
      }
    } else if (id && !field) {
      // If we have ID but no field and it's hackathons-gallery, delete the entire record
      if (module === 'hackathons-gallery') {
        await query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
      }
    } else {
    }


    return NextResponse.json({
      success: true,
      data: updatedRecord,
      message: 'File deleted successfully'
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      error: 'Internal server error',
      details: errorMessage
    }, { status: 500 });
  }
}