import { useState, useEffect } from 'react';

export interface Faculty {
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

export interface Achievement {
  id: number;
  title: string;
  description?: string;
  approved?: number;
  type?: string;
  dept: string;
}

export interface StudentAchievement {
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

export interface Lab {
  id: number;
  lab_name: string;
  configurations?: string;
  labs_usage?: string;
  image_url?: string;
  status?: string;
  dept: string;
}

export interface SyllabusDocument {
  id: number;
  title: string;
  description?: string;
  document_url: string;
  type: string;
  academic_year: string;
  semester?: string;
  regulation?: string;
  dept: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Workshop {
  id: number;
  title: string;
  date_from: string;
  date_to?: string;
  description?: string;
  report_url?: string;
  gallery?: string;
  dept: string;
}

export interface Staff {
  id: number;
  name: string;
  designation: string;
  email?: string;
  phone?: string;
  employee_id?: string;
  status?: string;
  dept: string;
}

export interface FacultyInnovation {
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

export interface ResearchCenter {
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

export interface BoardOfStudiesMeetingMinute {
  id: number;
  meeting_no: string;
  meeting_date: string;
  file_url: string;
  description?: string;
  dept?: string;
}

export interface DepartmentLibrary {
  id: number;
  titles: number;
  volumes: number;
  faculty_incharge: string;
  phone?: string;
  email?: string;
  description?: string;
  image_url?: string;
  dept?: string;
}

export interface FacultyAchievement {
  id: number;
  category: string;
  title: string;
  file_url?: string;
  dept?: string;
  created_at?: string;
}

export interface Placement {
  id: number;
  title: string;
  batch: string;
  file_url?: string;
  dept?: string;
  created_at?: string;
}

export interface TechnicalAssociation {
  id: number;
  title: string;
  batch?: string;
  description?: string;
  file_url?: string;
  dept?: string;
  created_at?: string;
}

export interface Newsletter {
  id: number;
  title: string;
  volume?: string;
  issue?: string;
  publication_date?: string;
  file_url?: string;
  dept?: string;
  created_at?: string;
}

interface PublicDepartmentData {
  faculty: Faculty[];
  labs: Lab[];
  facultyAchievements: Achievement[];
  studentAchievements: StudentAchievement[];
  workshops: Workshop[];
  technicalStaff: Staff[];
  nonTeachingStaff: Staff[];
  placements?: Placement[];
  hackathons?: any[];
  boardOfStudies?: any[];
  boardOfStudiesMeetingMinutes?: BoardOfStudiesMeetingMinute[];
  laboratoryGallery?: any[];
  departmentLibrary?: DepartmentLibrary | null;
  facultyAchievementsData?: FacultyAchievement[];
  placementsData?: Placement[];
  technicalAssociationData?: TechnicalAssociation[];
  technicalAssociationGallery?: any[];
  facultyInnovations?: FacultyInnovation[];
  researchCenters?: ResearchCenter[];
  productDevelopment?: any[];
  departmentalActivities?: any[];
  greenInitiatives?: any[];
  technicalMagazines?: any[];
  syllabusDocuments?: SyllabusDocument[];
  newsletters?: Newsletter[];
  productDevelopmentGallery?: any[];
  facultyDevelopment?: any[];
}

export function usePublicDepartmentData(dept: string) {
  const [data, setData] = useState<PublicDepartmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/public/departments/${encodeURIComponent(dept)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch department data: ${response.status}`);
        }

        const result = await response.json();
        
        if (isMounted) {
          // The public API returns data in a nested structure
          const publicData = result.data || {};
          
          setData({
            faculty: publicData.faculty || [],
            labs: publicData.labs || [],
            facultyAchievements: publicData.facultyAchievements || [],
            studentAchievements: publicData.studentAchievements || [],
            workshops: publicData.workshops || [],
            technicalStaff: publicData.technicalStaff || [],
            nonTeachingStaff: publicData.nonTeachingStaff || [],
            placements: publicData.placements || [],
            hackathons: publicData.hackathons || [],
            boardOfStudies: publicData.boardOfStudies || [],
            boardOfStudiesMeetingMinutes: publicData.boardOfStudiesMeetingMinutes || [],
            laboratoryGallery: publicData.laboratoryGallery || [],
            departmentLibrary: publicData.departmentLibrary || null,
            facultyAchievementsData: publicData.facultyAchievements || [],
            placementsData: publicData.placements || [],
            technicalAssociationData: publicData.technicalAssociation || [],
            technicalAssociationGallery: publicData.technicalAssociationGallery || [],
            facultyInnovations: publicData.facultyInnovations || [],
            researchCenters: publicData.researchCenters || [],
            productDevelopment: publicData.productDevelopment || [],
            departmentalActivities: publicData.departmentalActivities || [],
            greenInitiatives: publicData.greenInitiatives || [],
            technicalMagazines: publicData.technicalMagazines || [],
            syllabusDocuments: publicData.syllabusDocuments || [],
            newsletters: publicData.newsletters || [],
            productDevelopmentGallery: publicData.productDevelopmentGallery || [],
            facultyDevelopment: publicData.facultyDevelopment || []
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          console.error('Error fetching public department data:', err);
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