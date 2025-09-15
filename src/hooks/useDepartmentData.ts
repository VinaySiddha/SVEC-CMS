import { useState, useEffect } from 'react';

interface Faculty {
  id: number;
  name: string;
  email?: string;
  qualification: string;
  designation: string;
  specialization?: string;
  experience_years?: number;
  profile_url?: string;
  bio?: string;
  research_interests?: string;
  publications?: string;
  status?: string;
  dept: string;
}

interface Achievement {
  id: number;
  title: string;
  description?: string;
  approved?: number;
  type?: string;
  dept: string;
}

interface StudentAchievement {
  id: number;
  title: string;
  name: string;
  roll_number?: string;
  program?: string;
  cgpa?: string;
  batch?: string;
  type?: string;
  description?: string;
  dept: string;
}

interface Lab {
  id: number;
  lab_name: string;
  configurations?: string;
  labs_usage?: string;
  image_url?: string;
  status?: string;
  dept: string;
}

interface Workshop {
  id: number;
  title: string;
  date_from: string;
  date_to?: string;
  description?: string;
  report_url?: string;
  gallery?: string;
  dept: string;
}

interface Staff {
  id: number;
  name: string;
  designation: string;
  email?: string;
  phone?: string;
  employee_id?: string;
  status?: string;
  dept: string;
}

interface FacultyInnovation {
  id: number;
  title: string;
  description?: string;
  faculty_name: string;
  innovation_type?: string;
  implementation_date?: string;
  impact_description?: string;
  document_url?: string;
  image_url?: string;
  dept: string;
  status?: string;
}

interface ResearchCenter {
  id: number;
  center_name: string;
  description?: string;
  established_year?: number;
  recognition_body?: string;
  head_of_center?: string;
  research_areas?: string;
  facilities?: string;
  achievements?: string;
  contact_email?: string;
  contact_phone?: string;
  website_url?: string;
  image_url?: string;
  dept: string;
  status?: string;
}

interface ProductDevelopment {
  id: number;
  product_name: string;
  description?: string;
  development_team?: string;
  development_period?: string;
  technology_used?: string;
  application_area?: string;
  current_status?: string;
  funding_source?: string;
  funding_amount?: number;
  patent_status?: string;
  document_url?: string;
  image_url?: string;
  dept: string;
  status?: string;
}

interface DepartmentalActivity {
  id: number;
  activity_name: string;
  description?: string;
  activity_type?: string;
  date_from?: string;
  date_to?: string;
  venue?: string;
  organizer?: string;
  coordinator?: string;
  participants_count?: number;
  target_audience?: string;
  outcomes?: string;
  budget?: number;
  sponsors?: string;
  document_url?: string;
  image_url?: string;
  dept: string;
  status?: string;
}

interface GreenInitiative {
  id: number;
  initiative_name: string;
  description?: string;
  initiative_type?: string;
  start_date?: string;
  end_date?: string;
  coordinator?: string;
  participants?: string;
  impact_metrics?: string;
  environmental_benefit?: string;
  cost_savings?: number;
  recognition_received?: string;
  future_plans?: string;
  document_url?: string;
  image_url?: string;
  dept: string;
  status?: string;
}

interface TechnicalMagazine {
  id: number;
  magazine_name: string;
  description?: string;
  magazine_type?: string;
  volume_number?: string;
  issue_number?: string;
  publication_date?: string;
  editor_in_chief?: string;
  editorial_team?: string;
  contributors?: string;
  topics_covered?: string;
  target_audience?: string;
  pages_count?: number;
  print_copies?: number;
  digital_copies?: number;
  download_url?: string;
  cover_image_url?: string;
  dept: string;
  status?: string;
}

interface DepartmentData {
  departmentInfo?: any;
  faculty: Faculty[];
  laboratories: Lab[];
  facultyAchievements: Achievement[];
  studentAchievements: StudentAchievement[];
  workshops: Workshop[];
  placements?: any[];
  syllabusDocuments?: any[];
  mous?: any[];
  classrooms?: any[];
  seminarHalls?: any[];
  fdpAttended?: any[];
  fdpConducted?: any[];
  boardOfStudiesMembers?: any[];
  boardOfStudiesMeetingMinutes?: any[];
  technicalStaff: Staff[];
  nonTeachingStaff: Staff[];
  facultyInnovations?: FacultyInnovation[];
  researchCenters?: ResearchCenter[];
  productDevelopment?: ProductDevelopment[];
  departmentalActivities?: DepartmentalActivity[];
  greenInitiatives?: GreenInitiative[];
  technicalMagazines?: TechnicalMagazine[];
  technicalAssociations?: any[];
  newsletters?: any[];
  extracurriculars?: any[];
  handbooks?: any[];
}

export function useDepartmentData(dept: string) {
  const [data, setData] = useState<DepartmentData>({
    faculty: [],
    laboratories: [],
    facultyAchievements: [],
    studentAchievements: [],
    workshops: [],
    technicalStaff: [],
    nonTeachingStaff: [],
    syllabusDocuments: [],
    mous: [],
    classrooms: [],
    seminarHalls: [],
    fdpAttended: [],
    fdpConducted: [],
    boardOfStudiesMembers: [],
    boardOfStudiesMeetingMinutes: [],
    facultyInnovations: [],
    researchCenters: [],
    productDevelopment: [],
    departmentalActivities: [],
    greenInitiatives: [],
    technicalMagazines: [],
    technicalAssociations: [],
    newsletters: [],
    extracurriculars: [],
    handbooks: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/departments/${encodeURIComponent(dept)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch department data: ${response.status}`);
        }

        const result = await response.json();
        
        if (isMounted) {
          setData({
            faculty: result.faculty || [],
            laboratories: result.laboratories || [],
            facultyAchievements: result.facultyAchievements || [],
            studentAchievements: result.studentAchievements || [],
            workshops: result.workshops || [],
            technicalStaff: result.technicalStaff || [],
            nonTeachingStaff: result.nonTeachingStaff || [],
            syllabusDocuments: result.syllabusDocuments || [],
            mous: result.mous || [],
            classrooms: result.classrooms || [],
            seminarHalls: result.seminarHalls || [],
            fdpAttended: result.fdpAttended || [],
            fdpConducted: result.fdpConducted || [],
            boardOfStudiesMembers: result.boardOfStudiesMembers || [],
            boardOfStudiesMeetingMinutes: result.boardOfStudiesMeetingMinutes || [],
            facultyInnovations: result.facultyInnovations || [],
            researchCenters: result.researchCenters || [],
            productDevelopment: result.productDevelopment || [],
            departmentalActivities: result.departmentalActivities || [],
            greenInitiatives: result.greenInitiatives || [],
            technicalMagazines: result.technicalMagazines || [],
            technicalAssociations: result.technicalAssociations || [],
            newsletters: result.newsletters || [],
            extracurriculars: result.extracurriculars || [],
            handbooks: result.handbooks || []
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          console.error('Error fetching department data:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (dept) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [dept]);

  return { data, loading, error };
}
