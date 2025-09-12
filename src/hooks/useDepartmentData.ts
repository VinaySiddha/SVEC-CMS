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

interface DepartmentData {
  faculty: Faculty[];
  labs: Lab[];
  facultyAchievements: Achievement[];
  studentAchievements: StudentAchievement[];
  workshops: Workshop[];
  technicalStaff: Staff[];
  nonTeachingStaff: Staff[];
}

export function useDepartmentData(dept: string) {
  const [data, setData] = useState<DepartmentData>({
    faculty: [],
    labs: [],
    facultyAchievements: [],
    studentAchievements: [],
    workshops: [],
    technicalStaff: [],
    nonTeachingStaff: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dept) {
      fetchDepartmentData();
    }
  }, [dept]);

  const fetchDepartmentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/public/departments/${dept}`);
      
      if (response.ok) {
        const result = await response.json();
        setData(result.data || {
          faculty: [],
          labs: [],
          facultyAchievements: [],
          studentAchievements: [],
          workshops: []
        });
      } else {
        setError('Failed to fetch department data');
        console.error('Failed to fetch department data');
      }
    } catch (error) {
      setError('Error fetching department data');
      console.error('Error fetching department data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchDepartmentData };
}
