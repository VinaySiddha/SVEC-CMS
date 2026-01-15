import React, { useState, useEffect } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';


// Type definitions for CST department data
interface Faculty {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  profileUrl: string;
  faculty_type: string;
  date_of_joining?: string;
}

// Designation priority mapping for sorting
const getDesignationPriority = (designation: string): number => {
  const designationLower = designation.toLowerCase().trim();

  // 1. Professor & HOD (highest priority)
  if (designationLower.includes('professor') && (designationLower.includes('head') || designationLower.includes('hod'))) return 1;
  if (designationLower.includes('hod') && designationLower.includes('professor')) return 1;
  if (designationLower.includes('professor & head')) return 1;
  if (designationLower.includes('professor & hod')) return 1;

  // 2. Professor
  if (designationLower === 'professor') return 2;

  // 3. Associate Professor / Assoc Professor
  if (designationLower.includes('associate') && designationLower.includes('professor')) return 3;
  if (designationLower.includes('assoc') && designationLower.includes('professor')) return 3;
  if (designationLower === 'associate professor') return 3;
  if (designationLower === 'assoc professor') return 3;
  if (designationLower === 'assoc. professor') return 3;

  // 4. Senior Assistant Professor / Sr. Asst. Professor
  if (designationLower.includes('sr') && designationLower.includes('asst') && designationLower.includes('professor')) return 4;
  if (designationLower.includes('sr') && designationLower.includes('assistant') && designationLower.includes('professor')) return 4;
  if (designationLower.includes('senior') && designationLower.includes('asst') && designationLower.includes('professor')) return 4;
  if (designationLower.includes('senior') && designationLower.includes('assistant') && designationLower.includes('professor')) return 4;

  // 5. Assistant Professor / Asst. Professor
  if (designationLower.includes('asst') && designationLower.includes('professor') && !designationLower.includes('sr') && !designationLower.includes('senior')) return 5;
  if (designationLower.includes('assistant') && designationLower.includes('professor') && !designationLower.includes('sr') && !designationLower.includes('senior')) return 5;
  if (designationLower === 'asst professor') return 5;
  if (designationLower === 'asst. professor') return 5;
  if (designationLower === 'assistant professor') return 5;

  // 6. Lecturer
  if (designationLower.includes('lecturer')) return 6;

  return 999; // Unknown designations go to end
};

// Sort faculty by designation priority (ascending) then by date_of_joining (ascending)
const sortFacultyByDesignationAndDOJ = (facultyList: Faculty[]): Faculty[] => {
  const sorted = [...facultyList].sort((a, b) => {
    const priorityA = getDesignationPriority(a.designation);
    const priorityB = getDesignationPriority(b.designation);

    // First sort by designation priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // If same designation, sort by date_of_joining (ascending - oldest first)
    const dateA = a.date_of_joining ? new Date(a.date_of_joining).getTime() : Infinity;
    const dateB = b.date_of_joining ? new Date(b.date_of_joining).getTime() : Infinity;

    return dateA - dateB;
  });

  // Debug logging
  console.log('🔍 Faculty Sorting Debug:');
  sorted.forEach((f, idx) => {
    const priority = getDesignationPriority(f.designation);
    console.log(`${idx + 1}. ${f.name} | ${f.designation} (Priority: ${priority}) | DOJ: ${f.date_of_joining}`);
  });

  return sorted;
};

interface StudentAchievement {
  id: number;
  title: string;
  category: string;
  fileUrl?: string;
  description?: string;
}

interface Syllabus {
  id: number;
  title: string;
  type: string;
  fileUrl: string;
}

interface EResource {
  id: number;
  regulation: string;
  semester: string;
  subject: string;
  ppt_url: string;
}

interface BOSMember {
  id: number;
  name: string;
  qualification?: string;
  designation: string;
  profile_url?: string;
  organization?: string;
  position_in_job?: string;
}

interface NonTeachingMember {
  id: number;
  name: string;
  designation: string;
  organization?: string;
  position_in_job: string;
}

interface BOSMinute {
  id: number;
  meeting_no: string;
  meeting_date: string;
  file_url: string;
}

interface DepartmentLibrary {
  image_url: string;
  description: string;
  titles: string;
  volumes: string;
  faculty_incharge: string;
  phone: string;
  email: string;
}

interface MOU {
  id: number;
  mou_with: string;
  from_date: string;
  to_date: string;
}

interface IndustryProgram {
  id: number;
  title: string;
  file_url: string;
}

interface PhysicalFacility {
  id: number;
  category: string;
  title?: string;
  description?: string;
  lab_details?: any[];
  file_url?: string;
}

interface Workshop {
  id: number;
  title: string;
  category: string;
  year: string;
  file_url?: string;
}

interface Overview {
  hod_image_url: string;
  hod_name: string;
  hod_qualification: string;
  hod_email: string;
  description: string;
}

const AIMlDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);
  const [editingMou, setEditingMou] = useState<MOU | null>(null);
  const [mouModalOpen, setMouModalOpen] = useState(false);

  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [technicalFaculty, setTechnicalFaculty] = useState<Faculty[]>([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = useState<NonTeachingMember[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>([]);
  const [syllabus, setSyllabus] = useState<Syllabus[]>([]);
  const [eresources, setEResources] = useState<EResource[]>([]);
  const [departmentLibrary, setDepartmentLibrary] = useState<DepartmentLibrary | null>(null);
  const [mous, setMous] = useState<MOU[]>([]);
  const [industryPrograms, setIndustryPrograms] = useState<IndustryProgram[]>([]);


  const [overview, setOverview] = useState<Overview | null>(null);

  const [physicalFacilities, setPhysicalFacilities] = useState<PhysicalFacility[]>([]);
  const [laboratories, setLaboratories] = useState<any[]>([]);
  const [facultyDevelopment, setFacultyDevelopment] = useState<any[]>([]);
  const [facultyAchievements, setFacultyAchievements] = useState<any[]>([]);
  const [meritScholarships, setMeritScholarships] = useState<any[]>([]);
  const [extraCurricular, setExtraCurricular] = useState<any[]>([]);
  const [technicalAssociation, setTechnicalAssociation] = useState<any[]>([]);
  const [sahayaEvents, setSahayaEvents] = useState<any[]>([]);
  const [scudActivities, setScudActivities] = useState<any[]>([]);
  const [extraCurricularGallery, setExtraCurricularGallery] = useState<any[]>([]);
  const [technicalAssociationGallery, setTechnicalAssociationGallery] = useState<any[]>([]);
  const [extracurricularActivitiesGallery, setExtracurricularActivitiesGallery] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [hackathonsGallery, setHackathonsGallery] = useState<any[]>([]);
  const [handbooks, setHandbooks] = useState<any[]>([]);
  const [placements, setPlacements] = useState<any[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [academicToppers, setAcademicToppers] = useState<any[]>([]);
  const [academicToppersGallery, setAcademicToppersGallery] = useState<any[]>([]);
  const [bosMembers, setBosMembers] = useState<BOSMember[]>([]);
  const [bosMinutes, setBosMinutes] = useState<BOSMinute[]>([]);


  useEffect(() => {
    // Make all API calls in parallel for AIML department tables - expanded to match CSEAI coverage
    const fetchData = async () => {
      try {
        const [
          overviewResponse,
          facultyResponse,
          syllabusResponse,
          physicalFacilitiesResponse,
          studentAchievementsResponse,
          workshopsResponse,
          placementsResponse,
          academicToppersResponse,
          mouResponse,
          bosResponse,
          bosMinutesResponse,
          facultyAchievementsResponse,
          eResourcesResponse,
          departmentLibraryResponse,
          facultyDevelopmentResponse,
          technicalFacultyResponse,
          nonTeachingStaffResponse,
          hackathonsResponse,
          hackathonsGalleryResponse,
          extraCurricularGalleryResponse,
          extraCurricularResponse,
          technicalAssociationResponse,
          technicalAssociationGalleryResponse,
          handbooksResponse,
          academicToppersGalleryResponse,
          publicDeptResponse
        ] = await Promise.allSettled([
          fetch('/api/aiml/aiml-department-overview').then(res => res.json()).catch(() => null),
          fetch('/api/aiml/aiml-faculty').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-syllabus').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-physical-facilities').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-student-achievements').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-workshops').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-placements').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-academictoppers').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-mous').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-bos-members').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-bos-minutes').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-faculty-achievements').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-eresources').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-department-library').then(res => res.json()).catch(() => null),
          fetch('/api/aiml/aiml-faculty-development').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-technical-faculty').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-non-teaching-staff').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-hackathons').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-hackathons-gallery').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-extra-curricular-gallery').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-extracurricular-activities').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-technical-association').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-technical-association-gallery').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-handbooks').then(res => res.json()).catch(() => []),
          fetch('/api/aiml/aiml-academic-toppers-gallery').then(res => res.json()).catch(() => []),
          fetch('/api/public/departments/aiml').then(res => res.json()).catch(() => ({ success: false, data: {} }))
        ]);

        // Set overview data
        if (overviewResponse.status === 'fulfilled' && overviewResponse.value) {
          setOverview(overviewResponse.value);
        }

        // Set faculty data
        if (facultyResponse.status === 'fulfilled' && facultyResponse.value) {
          setFaculty(sortFacultyByDesignationAndDOJ(Array.isArray(facultyResponse.value) ? facultyResponse.value : []));
        }

        // Set syllabus data
        if (syllabusResponse.status === 'fulfilled' && syllabusResponse.value) {
          setSyllabus(Array.isArray(syllabusResponse.value) ? syllabusResponse.value : []);
        }

        // Set physical facilities data
        if (physicalFacilitiesResponse.status === 'fulfilled' && physicalFacilitiesResponse.value) {
          setPhysicalFacilities(Array.isArray(physicalFacilitiesResponse.value) ? physicalFacilitiesResponse.value : []);
        }

        // Set student achievements data
        if (studentAchievementsResponse.status === 'fulfilled' && studentAchievementsResponse.value) {
          setStudentAchievements(Array.isArray(studentAchievementsResponse.value) ? studentAchievementsResponse.value : []);
        }

        // Set workshops data
        if (workshopsResponse.status === 'fulfilled' && workshopsResponse.value) {
          setWorkshops(Array.isArray(workshopsResponse.value) ? workshopsResponse.value : []);
        }

        // Set placements data
        if (placementsResponse.status === 'fulfilled' && placementsResponse.value) {
          setPlacements(Array.isArray(placementsResponse.value) ? placementsResponse.value : []);
        }

        // Set academic toppers data
        if (academicToppersResponse.status === 'fulfilled' && academicToppersResponse.value) {
          setAcademicToppers(Array.isArray(academicToppersResponse.value) ? academicToppersResponse.value : []);
        }

        // Set academic toppers gallery data
        if (academicToppersGalleryResponse.status === 'fulfilled' && academicToppersGalleryResponse.value) {
          console.log('📊 Academic Toppers Gallery Response:', academicToppersGalleryResponse.value);
          setAcademicToppersGallery(Array.isArray(academicToppersGalleryResponse.value) ? academicToppersGalleryResponse.value : []);
        }

        // Set MOU data
        if (mouResponse.status === 'fulfilled' && mouResponse.value) {
          setMous(Array.isArray(mouResponse.value) ? mouResponse.value : []);
        }

        // Set BOS data
        if (bosResponse.status === 'fulfilled' && bosResponse.value) {
          setBosMembers(Array.isArray(bosResponse.value) ? bosResponse.value : []);
        }

        // Set faculty achievements data
        if (facultyAchievementsResponse.status === 'fulfilled' && facultyAchievementsResponse.value) {
          setFacultyAchievements(Array.isArray(facultyAchievementsResponse.value) ? facultyAchievementsResponse.value : []);
        }

        // Set e-resources data
        if (eResourcesResponse.status === 'fulfilled' && eResourcesResponse.value) {
          setEResources(Array.isArray(eResourcesResponse.value) ? eResourcesResponse.value : []);
        }

        // Set department library data
        if (departmentLibraryResponse.status === 'fulfilled' && departmentLibraryResponse.value) {
          setDepartmentLibrary(departmentLibraryResponse.value);
        }

        // Set faculty development data
        if (facultyDevelopmentResponse.status === 'fulfilled' && facultyDevelopmentResponse.value) {
          setFacultyDevelopment(Array.isArray(facultyDevelopmentResponse.value) ? facultyDevelopmentResponse.value : []);
        }

        // Set technical faculty data
        if (technicalFacultyResponse.status === 'fulfilled' && technicalFacultyResponse.value) {
          const techFacultyData = Array.isArray(technicalFacultyResponse.value) ? technicalFacultyResponse.value : [];
          setTechnicalFaculty(techFacultyData.sort((a, b) => (a.id || 0) - (b.id || 0)));
        }

        // Set BOS minutes data
        if (bosMinutesResponse.status === 'fulfilled' && bosMinutesResponse.value) {
          setBosMinutes(Array.isArray(bosMinutesResponse.value) ? bosMinutesResponse.value : []);
        }

        // Set non-teaching staff data
        if (nonTeachingStaffResponse.status === 'fulfilled' && nonTeachingStaffResponse.value) {
          setNonTeachingFaculty(Array.isArray(nonTeachingStaffResponse.value) ? nonTeachingStaffResponse.value : []);
        }

        // Set hackathons data
        if (hackathonsResponse.status === 'fulfilled' && hackathonsResponse.value) {
          setHackathons(Array.isArray(hackathonsResponse.value) ? hackathonsResponse.value : []);
        }

        // Set hackathons gallery data
        if (hackathonsGalleryResponse.status === 'fulfilled' && hackathonsGalleryResponse.value) {
          setHackathonsGallery(Array.isArray(hackathonsGalleryResponse.value) ? hackathonsGalleryResponse.value : []);
        }

        // Set extra curricular data
        if (extraCurricularResponse.status === 'fulfilled' && extraCurricularResponse.value) {
          setExtraCurricular(Array.isArray(extraCurricularResponse.value) ? extraCurricularResponse.value : []);
        }

        // Set extracurricular activities gallery data
        if (extraCurricularGalleryResponse.status === 'fulfilled' && extraCurricularGalleryResponse.value) {
          setExtracurricularActivitiesGallery(Array.isArray(extraCurricularGalleryResponse.value) ? extraCurricularGalleryResponse.value : []);
        }

        // Set technical association data
        if (technicalAssociationResponse.status === 'fulfilled' && technicalAssociationResponse.value) {
          setTechnicalAssociation(Array.isArray(technicalAssociationResponse.value) ? technicalAssociationResponse.value : []);
        }

        // Set technical association gallery data
        if (technicalAssociationGalleryResponse.status === 'fulfilled' && technicalAssociationGalleryResponse.value) {
          setTechnicalAssociationGallery(Array.isArray(technicalAssociationGalleryResponse.value) ? technicalAssociationGalleryResponse.value : []);
        }

        // Set handbooks data
        if (handbooksResponse.status === 'fulfilled' && handbooksResponse.value) {
          setHandbooks(Array.isArray(handbooksResponse.value) ? handbooksResponse.value : []);
        }

        // Handle public department API data as fallback
        if (publicDeptResponse.status === 'fulfilled' && publicDeptResponse.value) {
          const publicData = publicDeptResponse.value?.data || {};
          console.log('🔍 AIML Public Department API data available:', Object.keys(publicData));
          // Use public data as fallback for any missing data if needed
        }

      } catch (error) {
        console.error('Error fetching AIML department data:', error);
      }
    };

    fetchData();
  }, []);

  // Memoize syllabus grouping to avoid recalculation on every render
  const syllabusGrouped = React.useMemo(() => {
    return syllabus.reduce((acc: any, item: any) => {
      const key = item.type || 'Other';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [syllabus]);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    //{ id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Academic Toppers', label: 'Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Cpu className="w-4 h-4" /> },
    // { id: 'e-Resources', label: 'e-Resources', icon: <Wifi className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    //{ id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    //{ id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const openPdfModal = (url: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setCurrentPdfUrl(url);
    setPdfLoading(true);
    setPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setPdfModalOpen(false);
    setCurrentPdfUrl('');
    setPdfLoading(false);
  };

  const handlePdfLoad = () => {
    setPdfLoading(false);
  };




  const renderDeptTabContent = () => {
    switch (activeDeptTab) {

      case 'Vision':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To evolve as a centre of academic and research excellence in the
              area of Artificial Intelligence and Machine Learning.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To utilize innovative learning methods for academic
                improvement.</li>
              <li>To encourage higher studies and research to meet the
                futuristic requirements of Artificial Intelligence and Machine Learning.</li>
              <li>To inculcate Ethics and
                Human values for developing students with good character.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">AI & ML Graduates of this programme will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Adapt to evolving technology.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Provide optimal soultions to real time problems.

                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Demonstrate his/her abilities to support service activities with due consideration for Professional and Ethical values.</p>
              </div>

            </div>

          </div>
        );
      case 'POs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes (POs)</h3>
            <div className="pl-5 space-y-3 text-gray-700 text-justify">
              <ol className="list-decimal pl-6">
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Engineering knowledge:</strong>
                  Apply the knowledge of Mathematics, Science, Engineering Fundamentals, and AI/ML concepts to solve complex problems. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Problem Analysis:</strong>
                  Identify, formulate, and analyze complex AI/ML problems using first principles of Mathematics, Statistics, and Machine Learning. [K4]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Design/development of solutions:</strong>
                  Design AI/ML solutions for complex problems considering societal, environmental, and ethical implications. [K5]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Conduct investigations of complex problems:</strong>
                  Use research-based knowledge and methods to conduct experiments, analyze data, and provide valid conclusions in AI/ML domain. [K5]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Modern tool usage:</strong>
                  Create, select, and apply appropriate AI/ML techniques, frameworks, and modern tools for complex engineering activities. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>The engineer and society:</strong>
                  Apply reasoning to assess societal, health, safety, legal, and cultural issues related to AI/ML applications. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Environment and sustainability:</strong>
                  Understand the impact of AI/ML solutions in environmental contexts and demonstrate knowledge of sustainable development. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Ethics:</strong>
                  Apply ethical principles and commit to professional ethics in AI/ML development and deployment. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Individual and team work:</strong>
                  Function effectively as an individual and team member in diverse and multidisciplinary AI/ML projects. [K6]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Communication:</strong>
                  Communicate effectively on complex AI/ML activities with technical and non-technical audiences. [K2]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Project management and finance:</strong>
                  Demonstrate knowledge of Engineering and Management principles in AI/ML project management. [K6]
                </li>
                <li>
                  <strong style={{ color: '#850209' }}>Life-long learning:</strong>
                  Recognize the need for continuous learning in the rapidly evolving AI/ML field. [K1]
                </li>
              </ol>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the AI & ML department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-800">Course Outcomes (V23 Regulation)</span>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 inline-block px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-300 view-button"
                  style={{ fontSize: '16px' }}
                >
                  View PDF
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Course Outcomes (V20 Regulation)</span>
                <a
                  href="public/uploads/aiml/COs_V20_AIML.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 inline-block px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-300 view-button"
                  style={{ fontSize: '16px' }}
                >
                  View PDF
                </a>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <p className="text-gray-700 mb-4">A graduate of the Artificial Intelligence and Machine Learning
              Programme will be able to:</p>
            <div className="pl-5 space-y-3 text-gray-700 text-justify">
              <ol className="list-decimal pl-6">
                <li style={{ marginBottom: '10px' }}>
                  <span className="font-semibold" style={{ color: '#850209' }}>PSO1:</span> Use Mathematical Abstractions and Algorithmic Design along with Open Source Programming tools to solve complexities involved in Programming. <span style={{ fontWeight: 'bold' }}>[K3]</span>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <span className="font-semibold" style={{ color: '#850209' }}>PSO2:</span> Use Professional Engineering practices and strategies for development and maintenance of software. <span style={{ fontWeight: 'bold' }}>[K3]</span>
                </li>
              </ol>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Salient Features</h3>
            <ul className="pl-5 space-y-3 text-gray-700">
              <li><strong className="text-[#850209]">➟</strong> All Class Rooms are ICT enabled.</li>
              <li><strong className="text-[#850209]">➟</strong> MoUs with NIT ANP , Eduskills , Hexaware , APSSDC , Alykas
                Innovations Pvt.Ltd, thingTronics Pvt Ltd,Bangalore and
                TCS-iON.</li>
              <li><strong className="text-[#850209]">➟</strong> College has MOU with TCS for conducting Online Competitive Exams for which our Department Resources are being utilized.</li>
              <li><strong className="text-[#850209]">➟</strong> Professional Society memberships in ISTE and IAENG.</li>
              <li><strong className="text-[#850209]">➟</strong> Good faculty retention.</li>
              <li><strong className="text-[#850209]">➟</strong> Well Equipped Laboratories.</li>
              <li><strong className="text-[#850209]">➟</strong> Sahaya, Social Service Unit, managed by the Students.</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed text-justify mb-6">
              Department of Artificial Intelligence and Machine Learning
              came into inception from 2021 onwards with an intake of 60
              seats in B.Tech. From 2022 onwards the intake was increased to
              120 seats. From 2025 onwards the intake was increased to 180 seats.
            </p>

            {/* Course Information Table */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-[#B22222] mb-4 text-center">Courses</h4>



              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-green-700 text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sl.No</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Name of the Course</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Eligibility Criteria</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Duration</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 text-center">1</td>
                      <td className="border border-gray-300 px-4 py-3">B.Tech-Artificial Intelligence and Machine Learning</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">AP EAPCET</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">4 Years</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">180</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-8">
              {/* Desktop Navigation Tabs */}
              <div className="hidden md:block relative mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {sections.map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveDeptTab(section)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeDeptTab === section
                        ? 'bg-[#B22222] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {section === 'SalientFeatures' ? 'Salient Features' : section}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Section Display */}
              <div className="md:hidden relative mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Current Section: <span className="text-[#B22222]">{activeDeptTab === 'SalientFeatures' ? 'Salient Features' : activeDeptTab}</span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Use the floating settings button to navigate between sections</p>
                </div>
              </div>

              {/* Department Overview (Dynamic) */}
              {activeDeptTab === 'Department' && (
                !overview ? (
                  <div className="text-center text-gray-600">Loading...</div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-fade-in">
                    <div className="md:w-1/3">
                      <img
                        src={overview.hod_image_url}
                        alt={overview.hod_name}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold text-[#B22222] mb-2">{overview.hod_name}</h3>
                      <p className="text-gray-700 mb-2">{overview.hod_qualification}</p>
                      <p className="text-gray-700 mb-2">
                        <a href={`mailto:${overview.hod_email}`} className="text-[#B22222] hover:underline">{overview.hod_email}</a>
                      </p>
                      <p className="text-gray-700 text-lg text-justify">{overview.description}</p>
                    </div>
                  </div>
                )
              )}

              {/* Game-Style Right Side Settings Panel */}
              {settingsPanelOpen && (
                <div className="fixed inset-0 z-50">
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
                    onClick={() => setSettingsPanelOpen(false)}
                  ></div>
                  {/* Settings Panel */}
                  <div className="fixed right-0 top-0 h-full w-full sm:w-80 md:w-96 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl transform transition-transform duration-500 ease-out">
                    {/* Panel Header */}
                    <div className="bg-gradient-to-r from-[#B22222] to-[#B22222] p-4 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-lg">Department Navigation</h3>
                            <p className="text-white/70 text-sm">Select a section to explore</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSettingsPanelOpen(false)}
                          className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* Panel Content */}
                    <div className="p-6 h-full overflow-y-auto">
                      <div className="space-y-3">
                        {sections.map((section, index) => {
                          const isActive = section === activeDeptTab;
                          return (
                            <button
                              key={section}
                              onClick={() => {
                                setActiveDeptTab(section);
                                setSettingsPanelOpen(false);
                              }}
                              className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${isActive
                                ? 'bg-gradient-to-r from-[#B22222] to-[#B22222] text-white shadow-lg scale-105'
                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isActive ? 'bg-white/20' : 'bg-gray-600'
                                  }`}>
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-semibold">
                                    {section === 'SalientFeatures' ? 'Salient Features' : section}
                                  </div>
                                  <div className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                                    {section === 'Department' && 'Overview & HOD Profile'}
                                    {section === 'Vision' && 'Department Vision Statement'}
                                    {section === 'Mission' && 'Department Mission Statement'}
                                    {section === 'PEOs' && 'Program Educational Objectives'}
                                    {section === 'POs' && 'Program Outcomes'}
                                    {section === 'PSOs' && 'Program Specific Outcomes'}
                                    {section === 'COs' && 'Course Outcomes'}
                                    {section === 'SalientFeatures' && 'Key Highlights & Features'}
                                  </div>
                                </div>
                                {isActive && (
                                  <div className="ml-auto">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {/* Panel Footer */}
                      <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                        <div className="text-center">
                          <div className="text-white/70 text-sm mb-2">Quick Navigation</div>
                          <div className="text-white/50 text-xs">
                            Click any section above to navigate instantly
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Settings Button - Mobile Only */}
              <button
                onClick={() => setSettingsPanelOpen(true)}
                className="md:hidden fixed right-3 bottom-6 z-40 w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#B22222] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                title="Department Navigation"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {/* Mobile Label */}
                <div className="absolute bottom-14 right-0 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Menu
                  <div className="absolute top-full right-2 w-0 h-0 border-t-4 border-t-gray-900 border-l-2 border-r-2 border-l-transparent border-r-transparent"></div>
                </div>
              </button>

              {/* Tab Content */}
              <div>
                {renderDeptTabContent()}
              </div>
            </div>
          </div>
        );

      case 'Student Achievements': {
        // Dynamically get all categories from DB, fallback to default order if empty
        const dbCategories = Array.from(new Set(studentAchievements.map(a => a.category)));
        const categories = dbCategories.length > 0
          ? dbCategories
          : [
            'Internships',
            'Conference Publications',
            'NPTEL/Other Certifications',
            'Global Certifications',
            'Community Service Project',
            'Student Research Projects'
          ];

        const grouped = categories.map(cat => ({
          category: cat,
          items: studentAchievements.filter(a => a.category === cat)
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
            <div className="space-y-6">
              {grouped.map((group, index) => (
                <details key={group.category} open={index === 0} className="cst-dropdown group">
                  <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                    <span>{group.category}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    {group.items.length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {group.items.map((item, idx) => (
                          <li key={idx}>
                            {item.title}
                            {(item.file_url || item.fileUrl) && (
                              <>
                                {' - '}
                                <a
                                  href={item.file_url || item.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-semibold"
                                >
                                  View
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      } ``
      case 'Workshops': {
        // Group workshops by category from aiml_workshops table, excluding Academic Toppers
        const dbCategories = Array.from(new Set(workshops.map(w => w.category).filter(cat => cat !== 'Academic Toppers')));
        const categories = dbCategories.length > 0
          ? dbCategories
          : ['SOC', 'Guest Lecturers/Seminars', 'Workshops'];

        const grouped = categories.map(cat => ({
          category: cat,
          items: workshops.filter(w => w.category === cat && w.category !== 'Academic Toppers')
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops</h2>
            <div className="space-y-6">
              {grouped.map((group, index) => (
                <details key={group.category} open={index === 0} className="cst-dropdown group">
                  <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                    <span>{group.category}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    {group.items.length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {group.items.map((item, idx) => (
                          <li key={idx}>
                            {item.title}
                            {item.file_url && (
                              <>
                                {' - '}
                                <a
                                  href={item.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      }

      case 'Syllabus': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            <div className="space-y-6">
              {syllabus && syllabus.length > 0 ? (
                <>
                  {/* B.Tech Syllabus */}
                  {syllabusGrouped.btech && syllabusGrouped.btech.length > 0 && (
                    <details className="cst-dropdown group" open>
                      <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                        <span>B.Tech Syllabus</span>

                      </summary>
                      <div className="cst-dropdown-content">
                        <ul className="list-disc pl-6 my-2">
                          {syllabusGrouped.btech.map((item: any) => (
                            <li key={item.id}>
                              {item.title} {item.academic_year || item.year} -{" "}
                              <a
                                href={item.fileUrl || item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  )}

                  {/* SOC Syllabus */}
                  {syllabusGrouped.soc && syllabusGrouped.soc.length > 0 && (
                    <details className="cst-dropdown group" open>
                      <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                        <span>SOC Syllabus</span>

                      </summary>
                      <div className="cst-dropdown-content">
                        <ul className="list-disc pl-6 my-2">
                          {syllabusGrouped.soc.map((item: any) => (
                            <li key={item.id}>
                              {item.title} {item.academic_year || item.year} -{" "}
                              <a
                                href={item.fileUrl || item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  )}

                  {/* Other syllabus types */}
                  {Object.entries(syllabusGrouped)
                    .filter(([category]) => category !== 'btech' && category !== 'soc')
                    .map(([category, items]: any) => (
                      <details key={category} className="cst-dropdown group">
                        <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                          <span>{category.toUpperCase()}</span>

                        </summary>
                        <div className="cst-dropdown-content">
                          <ul className="list-disc pl-6 my-2">
                            {items.map((item: any) => (
                              <li key={item.id}>
                                {item.title} ({item.academic_year || item.year}) -{" "}
                                <a
                                  href={item.fileUrl || item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    ))}
                </>
              ) : (
                <div className="text-center text-gray-600 py-8">
                  <p>Syllabus information will be available soon.</p>
                </div>
              )}
            </div>
          </div>
        );
        break;
      }

      case 'Faculty Profiles': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown group">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Teaching Faculty</span>

                </summary>
                <div className="cst-dropdown-content">
                  {faculty && faculty.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No.</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Name</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Qualification</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Designation</th>

                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Profile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faculty.map((member, index) => (
                            <tr key={member.id || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.qualification || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>

                              <td className="px-6 py-4">
                                <a href={member.profileUrl || `${member.profileUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-200 text-sm font-medium inline-block"
                                >
                                  View Profile
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">
                        {faculty ? 'No teaching faculty data available.' : 'Loading teaching faculty...'}
                      </div>
                    </div>
                  )}
                </div>
              </details>

              <details className="cst-dropdown">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Technical Staff</span>

                </summary>
                <div className="cst-dropdown-content">
                  {technicalFaculty && technicalFaculty.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No.</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Name</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Designation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {technicalFaculty.map((member, index) => (
                            <tr key={member.id || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">
                        {technicalFaculty ? 'No technical staff data available.' : 'Loading technical staff...'}
                      </div>
                    </div>
                  )}
                </div>
              </details>

              <details className="cst-dropdown">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Non-Teaching Staff</span>

                </summary>
                <div className="cst-dropdown-content">
                  {nonTeachingFaculty && nonTeachingFaculty.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No.</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Name</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Designation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nonTeachingFaculty.map((member, index) => (
                            <tr key={member.id || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">
                        {nonTeachingFaculty ? 'No non-teaching staff data available.' : 'Loading non-teaching staff...'}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
        break;
      }

      case 'e-Resources': {
        // Group by regulation
        const regulations = Array.from(new Set(eresources.map(e => e.regulation)));
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">e-Resources</h2>
              {/* ...static intro content... */}
              <h3 className="text-2xl font-semibold text-[#B22222] mb-6 text-center">Subjects</h3>
              {regulations.map((reg, index) => (
                <details key={reg} open={index === 0} className="cst-dropdown group">
                  <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                    <span>{reg}-Subjects</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-3 px-4 border-b text-left">S.No</th>
                            <th className="py-3 px-4 border-b text-left">Regulation</th>
                            <th className="py-3 px-4 border-b text-left">Sem</th>
                            <th className="py-3 px-4 border-b text-left">Subject</th>
                            <th className="py-3 px-4 border-b text-left">PPT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eresources.filter(e => e.regulation === reg).map((item, idx) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 border-b">{idx + 1}</td>
                              <td className="py-3 px-4 border-b">{item.regulation}</td>
                              <td className="py-3 px-4 border-b">{item.semester}</td>
                              <td className="py-3 px-4 border-b">{item.subject}</td>
                              <td className="py-3 px-4 border-b">
                                <a href={item.ppt_url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">Download</a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      }


      case 'Board of Studies': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown group">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Board of Studies Members</span>

                </summary>
                <div className="cst-dropdown-content">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">S.No</th>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">Name of the BOS Member</th>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">Designation</th>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">Organization</th>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">Position in JOB</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bosMembers.map((member, idx) => (
                          <tr key={member.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b border-gray-200">{idx + 1}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{member.name}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{member.designation || ''}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{member.organization || ''}</td>
                            <td className="py-3 px-4 border-b border-gray-200">{member.position_in_job}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>

              <details className="cst-dropdown group">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Board of Studies Meeting Minutes</span>

                </summary>
                <div className="cst-dropdown-content">
                  <div className="space-y-3">
                    {bosMinutes.map((minute) => {
                      // Remove time portion if present (e.g., '2025-11-12T18:30:00.000Z' => '2025-11-12')
                      const dateOnly = minute.meeting_date?.split('T')[0] || minute.meeting_date;
                      return (
                        <div key={minute.id} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border">
                          <span className="text-gray-700">
                            Minutes of {minute.meeting_no} meeting of the Board of Studies, dated {dateOnly}
                          </span>

                          {minute.file_url && minute.file_url.trim() !== '' ? (
                            <a
                              href={minute.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline hover:bg-gray-100 ml-4 px-3 py-1 rounded cursor-pointer bg-transparent border border-[#B22222] font-medium focus:outline-none transition-colors duration-200"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-gray-400 ml-4">No file available</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      }

      case 'Department Library': {
        if (!departmentLibrary) {
          return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center">Loading...</div>;
        }
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Library</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="md:w-1/2">
                <img
                  src={departmentLibrary.image_url}
                  alt="CSE Department Library"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-gray-700 text-lg text-justify">
                  {departmentLibrary.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                <h5 className="text-lg font-semibold text-center text-[#B22222] mb-2">No. of Titles</h5>
                <p className="text-2xl font-bold text-red-600 text-center">{departmentLibrary.titles}</p>
              </div>
              <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                <h5 className="text-lg font-semibold text-center text-green-700 mb-2">No. of Volumes</h5>
                <p className="text-2xl font-bold text-green-600 text-center">{departmentLibrary.volumes}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-[#B22222] mb-4">Faculty Incharge</h3>
              <ul className="text-center space-y-2 list-none">
                <li className="text-lg font-medium">{departmentLibrary.faculty_incharge}</li>
                <li className="text-lg">Phone: {departmentLibrary.phone}</li>
                <li className="text-lg">
                  E-mail: <a href={`mailto:${departmentLibrary.email}`} className="text-[#B22222] hover:underline">{departmentLibrary.email}</a>
                </li>
              </ul>
            </div>
          </div>
        );
      }


      case 'MoUs': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">MoUs</h2>
            <h3 className="text-xl font-semibold text-[#B22222] mb-4 text-center">A. MOUs with Industries</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">S.No</th>
                    <th className="py-3 px-4 border-b text-left">Organization Name</th>
                    <th className="py-3 px-4 border-b text-left">From</th>
                    <th className="py-3 px-4 border-b text-left">To</th>

                  </tr>
                </thead>
                <tbody>
                  {mous.length > 0 ? (
                    mous.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">{idx + 1}</td>
                        <td className="py-3 px-4 border-b">{item.mou_with}</td>
                        <td className="py-3 px-4 border-b">{item.from_date}</td>
                        <td className="py-3 px-4 border-b">{item.to_date}</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-3 px-4 border-b text-center text-gray-600">
                        No MOUs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>



            {/* MOU Edit Modal */}
            {mouModalOpen && editingMou && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold mb-4 text-[#B22222]">Edit MOU</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
                      <input
                        type="text"
                        placeholder="Enter organization name"
                        value={editingMou.mou_with}
                        onChange={(e) => setEditingMou(editingMou ? { ...editingMou, mou_with: e.target.value } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B22222]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Date *</label>
                      <input
                        type="date"
                        placeholder="dd-mm-yyyy"
                        value={editingMou.from_date}
                        onChange={(e) => setEditingMou({ ...editingMou, from_date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B22222]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To Date *</label>
                      <input
                        type="date"
                        placeholder="dd-mm-yyyy"
                        value={editingMou.to_date}
                        onChange={(e) => setEditingMou({ ...editingMou, to_date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B22222]"
                      />
                    </div>
                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setMouModalOpen(false);
                          setEditingMou(null);
                        }}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // Save changes (would need API endpoint)
                          setMouModalOpen(false);
                          setEditingMou(null);
                        }}
                        className="px-4 py-2 bg-[#B22222] text-white rounded-md hover:bg-[#A01E1E] font-medium"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }


      case 'Physical Facilities': {
        // Group by category
        const categories = Array.from(new Set(physicalFacilities.map(f => f.category)));
        const grouped = categories.map(cat => ({
          category: cat,
          items: physicalFacilities.filter(f => f.category === cat)
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>

            {/* Introduction Section */}
            <div className="mb-8 space-y-4">
              <p className="text-gray-700">
                The Department has well equipped labs with the latest Configuration. Total 9 Computer Labs for UG, PG and one research lab consisting a total of 674 systems. The various servers in the server room include Oracle 11g Database Server, Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation Server, A-Mail Server, ECAP Server.
              </p>
              <p className="text-gray-700">
                The college has high-speed internet connectivity throughout the campus through a leased line from BSNL with 200Mbps, 400Mbps from Jio, and 40 Mbps (Broadband).
              </p>
              <p className="text-gray-700 font-semibold">
                The following Laboratories are available in the department:
              </p>
            </div>

            <div className="space-y-6">
              {/* Always show Laboratories section with static data */}
              <details open className="cst-dropdown group">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Laboratories</span>

                </summary>
                <div className="cst-dropdown-content">
                  <div>
                    {/* Linus Torvalds Lab */}
                    <h3 className="text-2xl font-bold text-center mb-4 text-[#B22222]">Linus Torvalds Lab</h3>
                    <div className="overflow-x-auto mb-8">
                      <table className="min-w-full border border-gray-400">
                        <thead className="bg-gray-800 text-white">
                          <tr>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">S.No</th>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">Name of the Lab</th>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">Configuration</th>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">No. of Systems</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b border-gray-400">
                            <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">1</td>
                            <td className="py-3 px-4 border-r border-gray-400 font-medium">Linus Torvalds Lab</td>
                            <td className="py-3 px-4 border-r border-gray-400 text-sm">
                              <div><span style={{ color: '#1f4788' }}>Model : HP 280PRO G9 Micro Tower</span></div>
                              <div><span style={{ color: '#1f4788' }}>Processor : Intel core TM i3-10100 CPU@3.6-4 GHZ</span></div>
                              <div><span style={{ color: '#1f4788' }}>8.00 GB RAM, 256.00 GB SSD</span></div>
                              <div><span style={{ color: '#1f4788' }}>System type : x64 - based Processor</span></div>
                              <div><span style={{ color: '#1f4788' }}>Monitor: 19.5'' LED Monitor</span></div>
                              <div><span style={{ color: '#1f4788' }}>Keyboard: Multimedia Keyboard</span></div>
                              <div><span style={{ color: '#1f4788' }}>Mouse: Optical Mouse</span></div>
                            </td>
                            <td className="py-3 px-4 text-center font-medium">70</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">2</td>
                            <td className="py-3 px-4 border-r border-gray-400 font-medium"></td>
                            <td className="py-3 px-4 border-r border-gray-400 text-sm">
                              <div><span style={{ color: '#1f4788' }}>Model : ACER Vertion Desktop</span></div>
                              <div><span style={{ color: '#1f4788' }}>Processor : Intel® Core™ i5-7400 CPU @ 3.00 GHz</span></div>
                              <div><span style={{ color: '#1f4788' }}>4.00 GB RAM, 1.00 TB HDD</span></div>
                              <div><span style={{ color: '#1f4788' }}>System type : x64 - based Processor</span></div>
                              <div><span style={{ color: '#1f4788' }}>Monitor : 19.5" LED Monitor</span></div>
                              <div><span style={{ color: '#1f4788' }}>Keyboard : Multimedia Keyboard</span></div>
                              <div><span style={{ color: '#1f4788' }}>Mouse : Optical Mouse</span></div>
                            </td>
                            <td className="py-3 px-4 text-center font-medium">02</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Orange Lab */}
                    <h3 className="text-2xl font-bold text-center mb-4 text-[#B22222]">Orange Lab</h3>
                    <div className="overflow-x-auto mb-8">
                      <table className="min-w-full border border-gray-400">
                        <thead className="bg-gray-800 text-white">
                          <tr>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">S.No</th>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">Name of the Lab</th>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">Configuration</th>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">Usage</th>
                            <th className="py-2 px-4 border border-gray-400 text-left font-semibold">No. of Systems</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white">
                            <td className="py-3 px-4 border border-gray-400 text-center font-medium">1</td>
                            <td className="py-3 px-4 border border-gray-400 font-medium">Orange Lab</td>
                            <td className="py-3 px-4 border border-gray-400 text-sm">
                              <div><span style={{ color: '#1f4788' }}>Model: DELL OPTI PLEX 3070</span></div>
                              <div><span style={{ color: '#1f4788' }}>Processor: Intel Core i3, 9th Gen</span></div>
                              <div><span style={{ color: '#1f4788' }}>8.00 GB RAM, 1 TB Hard Disk</span></div>
                              <div><span style={{ color: '#1f4788' }}>System type: x64 - based Processor</span></div>
                              <div><span style={{ color: '#1f4788' }}>Monitor: 20.5" TFT Monitor</span></div>
                              <div><span style={{ color: '#1f4788' }}>Keyboard: Multimedia Keyboard</span></div>
                              <div><span style={{ color: '#1f4788' }}>Mouse: Optical Scroll Mouse</span></div>
                            </td>
                            <td className="py-3 px-4 border border-gray-400 text-center">Placements and Training</td>
                            <td className="py-3 px-4 border border-gray-400 text-center font-medium">72</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Laboratory Images Gallery */}
                    {(() => {
                      const labImages = hackathonsGallery && hackathonsGallery.filter(g => g.category && g.category.toLowerCase() === 'laboratory');
                      console.log('🔍 Laboratory Images Debug:', {
                        totalGallery: hackathonsGallery ? hackathonsGallery.length : 0,
                        allCategories: hackathonsGallery ? hackathonsGallery.map(g => g.category) : [],
                        labImagesCount: labImages ? labImages.length : 0,
                        labImagesData: labImages
                      });

                      return labImages && labImages.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-gray-300">
                          <h3 className="text-2xl font-bold text-center mb-6 text-[#B22222]">Laboratory Images</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {labImages.map((item, idx) => {
                              // Handle gallery as comma-separated string or array
                              const galleryImages = typeof item.gallery === 'string'
                                ? item.gallery.split(',').filter((url: string) => url.trim())
                                : Array.isArray(item.gallery) ? item.gallery : [];

                              return galleryImages.map((imageUrl: string, imgIdx: number) => (
                                <div key={`${idx}-${imgIdx}`} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                  <img
                                    src={imageUrl.trim()}
                                    alt={item.title || 'Laboratory'}
                                    className="w-full h-48 object-cover"
                                  />
                                  {item.title && imgIdx === 0 && (
                                    <div className="p-3 bg-white">
                                      <p className="text-sm font-medium text-gray-700">{item.title}</p>
                                    </div>
                                  )}
                                </div>
                              ));
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </details>

              {/* Other categories from database */}
              {grouped.filter(g => g.category && g.category.toLowerCase() !== 'laboratory').map((group, index) => (
                <details key={group.category} open={index === 0} className="cst-dropdown group">
                  <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                    <span>{group.category}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {group.items.map(item => (
                        <li key={item.id}>
                          {item.title}
                          {item.file_url && (
                            <>
                              {' - '}
                              <a
                                href={item.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View
                              </a>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      } case 'Faculty Development Programs': {
        // Group by category
        const categories = Array.from(new Set(facultyDevelopment.map(f => f.category)));
        const grouped = categories.map(cat => ({
          category: cat,
          items: facultyDevelopment.filter(f => f.category === cat)
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg" style={{ borderWidth: 2 }}>
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>
            <div className="space-y-6">
              {grouped.map((group, index) => (
                <details key={group.category} open={index === 0} className="cst-dropdown group">
                  <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                    <span>{group.category}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    {group.items.length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {group.items.map((item, idx) => (
                          <li key={item.id}>
                            {item.title}
                            {item.year && <> ({item.year})</>}
                            {(item.file_url || item.fileUrl) && (
                              <>
                                {' - '}
                                <a
                                  href={item.file_url || item.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-semibold"
                                >
                                  View
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      }
      case 'Faculty Achievements': {
        // Get unique categories from the data itself
        const uniqueCategories = Array.from(new Set(facultyAchievements.map(a => a.category))).sort();
        console.log('Faculty Achievements rendering - total items:', facultyAchievements.length, 'Categories found:', uniqueCategories);

        // Check if there's data
        if (!facultyAchievements || facultyAchievements.length === 0) {
          return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
              <div className="text-center py-8">
                <div className="text-gray-500">No faculty achievements data available currently.</div>
                <div className="text-sm text-gray-400 mt-2">Total achievements in state: {facultyAchievements ? facultyAchievements.length : 0}</div>
              </div>
            </div>
          );
        }

        // Group achievements by category
        const grouped = uniqueCategories.map(cat => ({
          category: cat,
          items: facultyAchievements.filter(a => a.category === cat)
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
            <div className="space-y-6">
              {grouped.map((group, index) => (
                <details key={group.category} open={index === 0} className="cst-dropdown group">
                  <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                    <span>{group.category}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    {group.items.length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {group.items.map((item, idx) => (
                          <li key={item.id}>
                            {item.title}
                            {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                            {(item.file_url || item.fileUrl) && (
                              <>
                                {' - '}
                                <a
                                  href={item.file_url || item.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-semibold"
                                >
                                  View
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      }
      case 'Academic Toppers': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic Toppers</h2>

            {academicToppers.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                <p>No merit scholarship data available at this time.</p>
              </div>
            ) : (
              <>
                {/* Academic Toppers Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">S.No</th>
                        <th className="py-3 px-4 border-b text-left">Academic Year</th>
                        <th className="py-3 px-4 border-b text-left">Particulars</th>
                        <th className="py-3 px-4 border-b text-left">No. of Students Benefited</th>
                        <th className="py-3 px-4 border-b text-left">Scholarship Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicToppers.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">{idx + 1}</td>
                          <td className="py-3 px-4 border-b">{item.academic_year}</td>
                          <td className="py-3 px-4 border-b">{item.particulars}</td>
                          <td className="py-3 px-4 border-b">{item.no_of_students_benefited}</td>
                          <td className="py-3 px-4 border-b">₹{item.scholarship_amount?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8">
                  <details open className="cst-dropdown">
                    <summary>Academic Toppers</summary>
                    <div className="cst-dropdown-content">
                      {(() => {
                        // Filter workshops with category 'Academic Toppers'
                        const academicToppersWorkshops = workshops && workshops.length > 0
                          ? workshops.filter((w: any) => w.category && w.category.toLowerCase() === 'academic toppers')
                          : [];

                        return academicToppersWorkshops && academicToppersWorkshops.length > 0 ? (
                          <div className="space-y-4">
                            {academicToppersWorkshops.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{item.title || item.name || `Academic Toppers ${item.date}`}</p>
                                  <p className="text-sm text-gray-600">{item.date || item.academic_year}</p>
                                </div>
                                {item.file_url && (
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors text-sm font-medium inline-block whitespace-nowrap"
                                  >
                                    View PDF
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-gray-600 py-8">
                            <p>No academic toppers data available at this time.</p>
                          </div>
                        );
                      })()}
                    </div>
                  </details>
                </div>
                {/* Academic Toppers Gallery Dropdowns (Year-wise) */}
                {academicToppersGallery.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-center mb-6 text-[#B22222]">Gallery</h3>
                    <div className="space-y-4">
                      {(() => {
                        // Group gallery items by academic year and combine all images
                        const groupedByYear: Record<string, string[]> = {};
                        academicToppersGallery.forEach((galleryItem) => {
                          const year = galleryItem.academic_year;
                          if (!groupedByYear[year]) {
                            groupedByYear[year] = [];
                          }
                          // Parse and add images from this gallery item
                          const images = galleryItem.gallery
                            ? galleryItem.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0)
                            : [];
                          groupedByYear[year].push(...images);
                        });

                        // Render one dropdown per academic year
                        return Object.entries(groupedByYear).map(([year, images], index) => (
                          <details key={year} className="cst-dropdown" open={index === 0}>
                            <summary>
                              Academic Toppers A.Y {year}
                            </summary>
                            <div className="cst-dropdown-content">
                              {images.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {images.map((img, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                      <img
                                        src={img}
                                        alt={`Academic Toppers ${year} Image ${i + 1}`}
                                        className="w-[450px] h-[340px] rounded-lg shadow-lg object-cover"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                          (e.target as HTMLImageElement).className = 'w-[450px] h-[340px] rounded-lg shadow-lg bg-gray-200';
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center text-gray-600 py-8">
                                  No images available for {year}
                                </div>
                              )}
                            </div>
                          </details>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* Academic Toppers PDF Dropdown */}

              </>
            )}
          </div>
        );
      }


      case 'Technical Association': {
        // Get all activity and gallery data
        const allActivities = technicalAssociation && technicalAssociation.length > 0 ? technicalAssociation : [];
        const hasAnyData = allActivities.length > 0 || technicalAssociationGallery.length > 0;

        // Check if there's any data
        if (!hasAnyData) {
          return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
              <div className="text-center py-8">
                <div className="text-gray-500">No technical association data available currently.</div>
              </div>
            </div>
          );
        }

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
            <div className="space-y-6">
              {/* Display all activities in collapsible format */}
              {allActivities.map((item, index) => (
                <details key={item.id || index} open={index === 0} className="group">
                  <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md list-none">
                    <span>{item.title || `Activity ${index + 1}`}</span>
                    <span className="group-open:rotate-180 transition-transform text-xl">▼</span>
                  </summary>
                  <div className="bg-gray-50 p-6 mt-2 rounded-lg border border-gray-200">
                    {/* Display title and year */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                      {item.year && <p className="text-sm text-gray-600 mt-1">Year: {item.year}</p>}
                    </div>

                    {/* Display description if available */}
                    {item.description && (
                      <p className="text-gray-700 mb-4">{item.description}</p>
                    )}

                    {/* Display file link if available */}
                    {(item.file_url || item.fileUrl) && (
                      <div className="mb-4">
                        <a
                          href={item.file_url || item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors text-sm font-medium"
                        >
                          View Details
                        </a>
                      </div>
                    )}

                    {/* Display gallery images if available */}
                    {item.gallery && Array.isArray(item.gallery) && item.gallery.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-700 mb-4">Gallery</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {item.gallery.map((img: any, i: number) => (
                            <div key={i} className="rounded-lg overflow-hidden shadow">
                              <img
                                src={img}
                                alt={`${item.title} Image ${i + 1}`}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Display activity details if available */}
                    {item.activity_details && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Activity Details</h4>
                        <p className="text-gray-600 text-sm">{item.activity_details}</p>
                      </div>
                    )}
                  </div>
                </details>
              ))}

              {/* EAPCET Rankers Dropdown */}
              {(() => {
                const eapcetRankers = technicalAssociation && technicalAssociation.length > 0
                  ? technicalAssociation.filter((item: any) => item.category === 'EAPCET Rankers')
                  : [];

                return (
                  <details className="cst-dropdown">
                    <summary>EAPCET Rankers</summary>
                    <div className="cst-dropdown-content">
                      {eapcetRankers.length > 0 ? (
                        <div className="space-y-4">
                          {eapcetRankers.map((item: any) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.title || item.name}</p>
                                {item.batch && <p className="text-sm text-gray-600">Batch: {item.batch}</p>}
                              </div>
                              {item.file_url && (
                                <a
                                  href={item.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors text-sm font-medium inline-block whitespace-nowrap"
                                >
                                  View Details
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-600 py-4">
                          No EAPCET Rankers data available at this time.
                        </div>
                      )}
                    </div>
                  </details>
                );
              })()}

              {/* Engineer's Day Dropdown */}
              {(() => {
                const engineersDay = technicalAssociation && technicalAssociation.length > 0
                  ? technicalAssociation.filter((item: any) => item.category === 'Engineers Day')
                  : [];

                return (
                  <details className="cst-dropdown">
                    <summary>Engineer's Day</summary>
                    <div className="cst-dropdown-content">
                      {engineersDay.length > 0 ? (
                        <div className="space-y-4">
                          {engineersDay.map((item: any) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.title || item.name}</p>
                                {item.batch && <p className="text-sm text-gray-600">Batch: {item.batch}</p>}
                              </div>
                              {item.file_url && (
                                <a
                                  href={item.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors text-sm font-medium inline-block whitespace-nowrap"
                                >
                                  View Details
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-600 py-4">
                          No Engineer's Day data available at this time.
                        </div>
                      )}
                    </div>
                  </details>
                );
              })()}

              {/* Display gallery by academic year if available */}
              {technicalAssociationGallery.length > 0 && (
                <>

                  {(() => {
                    // Group gallery items by academic year
                    const groupedByYear: Record<string, any[]> = {};
                    technicalAssociationGallery.forEach(item => {
                      const year = item.academic_year || 'No Year';
                      if (!groupedByYear[year]) {
                        groupedByYear[year] = [];
                      }
                      groupedByYear[year].push(item);
                    });

                    return Object.entries(groupedByYear).map(([year, items], index) => {
                      // Combine all images from all entries for this academic year
                      const allYearImages: string[] = [];
                      items.forEach(item => {
                        if (item.gallery) {
                          const images = Array.isArray(item.gallery)
                            ? item.gallery
                            : item.gallery
                              .split(',')
                              .map((url: string) => url.trim())
                              .filter((url: string) => url.length > 0);
                          allYearImages.push(...images);
                        }
                      });

                      return (
                        <details key={year} className="group">
                          <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md list-none">
                            <span>Gallery</span>
                            <span className="group-open:rotate-180 transition-transform text-xl">▼</span>
                          </summary>
                          <div className="bg-white p-8 mt-2 rounded-lg border border-gray-300">
                            {allYearImages.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {allYearImages.map((img, i) => (
                                  <div key={i} className="flex flex-col items-center">
                                    <img
                                      src={img}
                                      alt={`Technical Association ${year} Image ${i + 1}`}
                                      className="w-[450px] h-[340px] rounded-lg shadow-lg object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                        (e.target as HTMLImageElement).className = 'w-[450px] h-[340px] rounded-lg shadow-lg bg-gray-200';
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center text-gray-600 py-8">
                                No images available for {year}
                              </div>
                            )}
                          </div>
                        </details>
                      );
                    });
                  })()}
                </>
              )}
            </div>
          </div>
        );
      }
      case 'Newsletters': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Newsletters</h2>
            <div className="text-center text-gray-600 py-8">
              <p>Newsletter content will be available soon.</p>
            </div>
          </div>
        );
      }
      case 'Extra-Curricular Activities': {
        // Display all extra-curricular items if available, or filter by type if type field exists
        const activityItems = extraCurricular.length > 0
          ? extraCurricular.filter(a => !a.type || a.type === 'activity')
          : [];
        const sahaya = extraCurricular.length > 0
          ? extraCurricular.find(a => a.type === 'sahaya')
          : null;

        // Group extra-curricular gallery by academic year
        const groupedByYear: Record<string, any[]> = {};
        extraCurricularGallery.forEach(item => {
          if (!groupedByYear[item.academic_year]) {
            groupedByYear[item.academic_year] = [];
          }
          groupedByYear[item.academic_year].push(item);
        });

        // Check if there's any data
        if (extraCurricular.length === 0 && extraCurricularGallery.length === 0) {
          return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
              <div className="text-center py-8">
                <div className="text-gray-500">No extra-curricular activities data available currently.</div>
                <div className="text-sm text-gray-400 mt-2">Total activities in state: {extraCurricular.length}</div>
              </div>
            </div>
          );
        }

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
            <div className="space-y-6">
              {(() => {
                // Filter extraCurricular - show all activities or filter by category if present
                const extraCurricularItems = extraCurricular && extraCurricular.length > 0
                  ? extraCurricular.filter((item: any) => !item.category || item.category.toLowerCase() === 'extra curricular')
                  : [];

                return extraCurricularItems && extraCurricularItems.length > 0 ? (
                  <details open className="cst-dropdown">
                    <summary>Extra-Curricular Activities</summary>
                    <div className="cst-dropdown-content">
                      <div className="space-y-4">
                        {extraCurricularItems.map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.title || item.name}</p>
                              {item.batch && <p className="text-sm text-gray-600">Batch: {item.batch}</p>}
                            </div>
                            {item.file_url && (
                              <a
                                href={item.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors text-sm font-medium inline-block whitespace-nowrap"
                              >
                                View Details
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                ) : (
                  <details open className="cst-dropdown">
                    <summary>Extra-Curricular Activities</summary>
                    <div className="cst-dropdown-content">
                      <div className="text-center text-gray-600 py-4">
                        No extra-curricular activities available at this time.
                      </div>
                    </div>
                  </details>
                );
              })()}

              {sahaya && (
                <details className="cst-dropdown">
                  <summary>Sahaya</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold">Social Services</h3>
                        <p className="text-gray-700 text-justify">{sahaya.sahaya_desc}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Faculty Coordinator:</h4>
                        <p className="font-semibold" dangerouslySetInnerHTML={{ __html: sahaya.sahaya_faculty }} />
                      </div>
                      <div>
                        <h3 className="text-center text-xl font-semibold">LIST OF SAHAYA EVENTS CONDUCTED YEAR WISE</h3>
                        <ul className="my-2 list-none text-center space-y-2">
                          {sahaya.sahaya_events && sahaya.sahaya_events.map((ev: any, i: number) => (
                            <li key={i}>
                              {ev.year} -{' '}
                              <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">
                                For more details
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </details>
              )}

              {/* Maitri Social Services Dropdown */}
              <details className="cst-dropdown">
                <summary>Maitri</summary>
                <div className="cst-dropdown-content">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#B22222] mb-2">Social Services</h3>
                      <p className="text-gray-700 text-justify">
                        Maitri Association is a compassionate community where members, united by the spirit of 'Maitri' come together to
                        contribute funds for those in need. Through collective efforts, the club aims to make a positive impact on the
                        lives of individuals facing challenges, fostering a sense of solidarity and kindness within the group.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#B22222]">Faculty Coordinator:</h4>
                      <p className="font-semibold">
                        Mr. M Yesu Sekharam<br />
                        Assistant Professor
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Maitri Co-ordinators</h3>
                      {(() => {
                        // Filter extraCurricular with category 'Maitri Coordinators'
                        const maitriCoordinators = extraCurricular && extraCurricular.length > 0
                          ? extraCurricular.filter((item: any) => item.category && item.category.toLowerCase() === 'maitri coordinators')
                          : [];

                        console.log('🔍 Maitri Coordinators Debug:', {
                          totalActivities: extraCurricular.length,
                          maitriCoordinatorsCount: maitriCoordinators.length,
                          sampleItem: maitriCoordinators.length > 0 ? maitriCoordinators[0] : null
                        });

                        return maitriCoordinators && maitriCoordinators.length > 0 ? (
                          <ul className="my-2 list-none space-y-2">
                            {maitriCoordinators.map((item: any, idx: number) => (
                              <li key={idx}>
                                <span className="font-medium text-gray-900">
                                  {item.title || item.name}
                                  {item.category && ` (${item.category})`}
                                  {' - '}
                                </span>
                                {item.file_url && (
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
                                  >
                                    For more details
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="my-2 list-none space-y-2">
                            <li className="text-gray-600">No Maitri coordinators available at this time.</li>
                          </ul>
                        );
                      })()}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">List of Maitri Events Conducted Year-Wise</h3>
                      {(() => {
                        // Filter workshops with category 'Maitri Events'
                        const maitriEvents = workshops && workshops.length > 0
                          ? workshops.filter((w: any) => w.category && w.category.toLowerCase() === 'maitri events')
                          : [];

                        console.log('🔍 Maitri Events Debug:', {
                          totalWorkshops: workshops.length,
                          maitriEventsCount: maitriEvents.length,
                          sampleEvent: maitriEvents.length > 0 ? maitriEvents[0] : null
                        });

                        return maitriEvents && maitriEvents.length > 0 ? (
                          <ul className="my-2 list-none space-y-2">
                            {maitriEvents.map((item: any, idx: number) => (
                              <li key={idx}>
                                <span className="font-medium text-gray-900">
                                  {item.title || item.name}
                                  {(item.date || item.year || item.event_date) && ` (${item.date || item.year || item.event_date})`}
                                  {' - '}
                                </span>
                                {item.file_url && (
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
                                  >
                                    For more details
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="my-2 list-none space-y-2">
                            <li className="text-gray-600">No Maitri events available at this time.</li>
                          </ul>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </details>

              {/* Gallery Dropdown - Fetch from hackathons gallery with type 'extra-curricular activities' */}
              {(() => {
                // Get extra-curricular activities galleries from hackathons
                const extracurricularGallery = hackathonsGallery && hackathonsGallery.length > 0
                  ? hackathonsGallery.filter(item => item.type === 'extra-curricular activities' || item.category === 'extra-curricular activities')
                  : [];

                // Combine all images from all sources
                const allGalleryImages: string[] = [];

                // Add images from hackathons gallery
                extracurricularGallery.forEach(item => {
                  if (item.gallery) {
                    const images = Array.isArray(item.gallery)
                      ? item.gallery
                      : typeof item.gallery === 'string'
                        ? item.gallery
                          .split(',')
                          .map((url: string) => url.trim())
                          .filter((url: string) => url.length > 0)
                        : [];
                    allGalleryImages.push(...images);
                  }
                });

                // Add images from extra-curricular gallery
                if (extraCurricularGallery && extraCurricularGallery.length > 0) {
                  extraCurricularGallery.forEach((item: any) => {
                    if (item.gallery) {
                      const images = Array.isArray(item.gallery)
                        ? item.gallery
                        : typeof item.gallery === 'string'
                          ? item.gallery
                            .split(',')
                            .map((url: string) => url.trim())
                            .filter((url: string) => url.length > 0)
                          : [];
                      allGalleryImages.push(...images);
                    }
                  });
                }

                if (allGalleryImages.length === 0) {
                  return null;
                }

                return (
                  <details className="group">
                    <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md list-none">
                      <span>Gallery</span>
                      <span className="group-open:rotate-180 transition-transform text-xl">▼</span>
                    </summary>
                    <div className="bg-white p-8 mt-2 rounded-lg border border-gray-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {allGalleryImages.map((img, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <img
                              src={img}
                              alt={`Gallery Image ${i + 1}`}
                              className="w-[450px] h-[340px] rounded-lg shadow-lg object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                (e.target as HTMLImageElement).className = 'w-[450px] h-[340px] rounded-lg shadow-lg bg-gray-200';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                );
              })()}
            </div>
          </div>
        );
      }
      case 'Academic Toppers': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic Toppers</h2>

            {academicToppers.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                <p>No merit scholarship data available at this time.</p>
              </div>
            ) : (
              <>
                {/* Academic Toppers Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">S.No</th>
                        <th className="py-3 px-4 border-b text-left">Academic Year</th>
                        <th className="py-3 px-4 border-b text-left">Particulars</th>
                        <th className="py-3 px-4 border-b text-left">No. of Students Benefited</th>
                        <th className="py-3 px-4 border-b text-left">Scholarship Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicToppers.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">{idx + 1}</td>
                          <td className="py-3 px-4 border-b">{item.academic_year}</td>
                          <td className="py-3 px-4 border-b">{item.particulars}</td>
                          <td className="py-3 px-4 border-b">{item.students_benefited}</td>
                          <td className="py-3 px-4 border-b">₹{item.scholarship_amount?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8">
                  <details open className="cst-dropdown">
                    <summary>Academic Toppers</summary>
                    <div className="cst-dropdown-content">
                      {(() => {
                        // Filter workshops with category 'Academic Toppers'
                        const academicToppersWorkshops = workshops && workshops.length > 0
                          ? workshops.filter((w: any) => w.category && w.category.toLowerCase() === 'academic toppers')
                          : [];

                        return academicToppersWorkshops && academicToppersWorkshops.length > 0 ? (
                          <div className="space-y-4">
                            {academicToppersWorkshops.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{item.title || item.name || `Academic Toppers ${item.date}`}</p>
                                  <p className="text-sm text-gray-600">{item.date || item.academic_year}</p>
                                </div>
                                {item.file_url && (
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors text-sm font-medium inline-block whitespace-nowrap"
                                  >
                                    View PDF
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-gray-600 py-8">
                            <p>No academic toppers data available at this time.</p>
                          </div>
                        );
                      })()}
                    </div>
                  </details>
                </div>
                {/* Academic Toppers Gallery Dropdowns (Year-wise) */}
                {academicToppersGallery.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-center mb-6 text-[#B22222]">Gallery</h3>
                    <div className="space-y-4">
                      {(() => {
                        // Group gallery items by academic year and combine all images
                        const groupedByYear: Record<string, string[]> = {};
                        academicToppersGallery.forEach((galleryItem) => {
                          const year = galleryItem.academic_year;
                          if (!groupedByYear[year]) {
                            groupedByYear[year] = [];
                          }
                          // Parse and add images from this gallery item
                          const images = galleryItem.gallery
                            ? galleryItem.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0)
                            : [];
                          groupedByYear[year].push(...images);
                        });

                        // Render one dropdown per academic year
                        return Object.entries(groupedByYear).map(([year, images], index) => (
                          <details key={year} className="cst-dropdown" open={index === 0}>
                            <summary>
                              Academic Toppers A.Y {year}
                            </summary>
                            <div className="cst-dropdown-content">
                              {images.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {images.map((img, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                      <img
                                        src={img}
                                        alt={`Academic Toppers ${year} Image ${i + 1}`}
                                        className="w-[450px] h-[340px] rounded-lg shadow-lg object-cover"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                          (e.target as HTMLImageElement).className = 'w-[450px] h-[340px] rounded-lg shadow-lg bg-gray-200';
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center text-gray-600 py-8">
                                  No images available for {year}
                                </div>
                              )}
                            </div>
                          </details>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* Academic Toppers PDF Dropdown */}

              </>
            )}
          </div>
        );
        break;
      }

      case 'Hackathons': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Hackathons</h2>
            <div className="space-y-6">
              {/* Hackathons Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-[#B22222] text-white">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">Academic Year</th>
                      <th className="py-3 px-4 border-b text-left">For Brochure</th>
                      <th className="py-3 px-4 border-b text-left">For Winners List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hackathons.map(h => (
                      <tr key={h.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">{h.academic_year}</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href={h.brochure_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            Click Here
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href={h.winners_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            Click Here
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Hackathons Gallery Dropdown */}
              <div>
                <h3 className="text-2xl font-semibold text-center mb-6 text-[#B22222]">Gallery</h3>
                <div className="space-y-4">
                  {hackathonsGallery.length > 0 ? (
                    (() => {
                      // Group gallery items by academic year and combine all images
                      const groupedByYear: Record<string, string[]> = {};
                      hackathonsGallery.forEach((galleryItem) => {
                        const year = galleryItem.academic_year;
                        if (!groupedByYear[year]) {
                          groupedByYear[year] = [];
                        }
                        // Parse and add images from this gallery item
                        const images = galleryItem.gallery
                          ? galleryItem.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0)
                          : [];
                        groupedByYear[year].push(...images);
                      });

                      // Render one dropdown per academic year
                      return Object.entries(groupedByYear).map(([year, images], index) => (
                        <details key={year} className="cst-dropdown" open={index === 0}>
                          <summary>
                            Hackathon A.Y {year}
                          </summary>
                          <div className="cst-dropdown-content">
                            {images.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {images.map((img, i) => (
                                  <div key={i} className="flex flex-col items-center">
                                    <img
                                      src={img}
                                      alt={`Hackathon ${year} Image ${i + 1}`}
                                      className="w-[450px] h-[340px] rounded-lg shadow-lg object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                        (e.target as HTMLImageElement).className = 'w-[450px] h-[340px] rounded-lg shadow-lg bg-gray-200';
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center text-gray-600 py-8">
                                No images available for {year}
                              </div>
                            )}
                          </div>
                        </details>
                      ));
                    })()
                  ) : (
                    <div className="text-center text-gray-600 py-8">
                      No gallery data available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'Handbooks': {
        // Group handbooks by academic_year and semester
        const grouped: Record<string, Record<string, any[]>> = {};
        handbooks.forEach(h => {
          if (!grouped[h.academic_year]) grouped[h.academic_year] = {};
          if (!grouped[h.academic_year][h.semester]) grouped[h.academic_year][h.semester] = [];
          grouped[h.academic_year][h.semester].push(h);
        });

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic HandBooks</h2>
            <div className="space-y-6">
              {Object.entries(grouped).map(([year, semesters], i) =>
                Object.entries(semesters).map(([sem, items], j) => (
                  <details key={year + sem} open={i === 0 && j === 0} className="cst-dropdown">
                    <summary>Academic year {year}: {sem} HandBooks</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2">
                        {items.map(item => (
                          <li key={item.id}>
                            {item.title} -{' '}
                            <a
                              href={item.file_url || item.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline"
                            >
                              View
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))
              )}
            </div>
          </div>
        );
        break;
      }

      case 'Placements': {
        const placementsGallery = hackathonsGallery.filter(
          g => g.category === 'placements'
        );

        // Flatten gallery items - each item can have multiple comma-separated images
        const flattenedGalleryItems = placementsGallery.flatMap((item) => {
          if (item.gallery && typeof item.gallery === 'string') {
            // Split comma-separated gallery URLs
            return item.gallery.split(',').map((url: string) => ({
              ...item,
              gallery: url.trim(),
              image_url: url.trim()
            }));
          }
          return [item];
        });

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
            {placements && placements.length > 0 ? (
              <div className="space-y-6">
                {placements.map((item, index) => (
                  <details key={item.id || index} open={index === 0} className="cst-dropdown group">
                    <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                      <span>Placement Records {item.batch || item.year || 'Recent'}</span>

                    </summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        <li>
                          <span>{item.title || 'Placement Information'}</span>
                          {(item.fileUrl || item.file_url) && (
                            <>
                              {' - '}
                              <a
                                href={item.fileUrl || item.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline font-semibold"
                              >
                                View
                              </a>
                            </>
                          )}
                        </li>
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-8">
                <p>Placement information will be available soon.</p>
              </div>
            )}

            {/* Gallery Dropdown */}
            <div className="mt-8">
              <details open={true} className="cst-dropdown group border border-gray-300 rounded-lg bg-white">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Gallery</span>
                  <ChevronRight className="w-5 h-5 transition-transform" />
                </summary>
                <div className="bg-gray-50 p-4">
                  {flattenedGalleryItems && flattenedGalleryItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {flattenedGalleryItems.map((img, index) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
                          <div className="relative w-full h-48 bg-gray-100">
                            <img
                              src={img.gallery || img.image_url || img.url}
                              alt={img.title || `Placement Image ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                              onClick={() => {
                                const url = img.gallery || img.image_url || img.url;
                                if (url) window.open(url, '_blank');
                              }}
                              onError={(e: any) => {
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
                              }}
                            />
                          </div>
                          {img.title && (
                            <div className="p-3 bg-white">
                              <p className="text-sm font-medium text-gray-700 text-center truncate">{img.title}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No gallery images available</p>
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
        break;
      }

      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  };

  const renderContentWithTitle = () => {
    // Just return the content without adding another title, since it's already included in content sections
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px]">
        {renderContent()}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* PDF Modal */}
      {pdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">PDF Viewer</h3>
              <div className="flex items-center gap-2">
                {currentPdfUrl && (
                  <a
                    href={currentPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors"
                  >
                    Open in New Tab
                  </a>
                )}
                <button
                  onClick={closePdfModal}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="relative flex-1 h-full">
              {pdfLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 border-4 border-[#B22222] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Loading PDF...</span>
                  </div>
                </div>
              )}
              <iframe
                src={`${currentPdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full rounded-b-lg border-0"
                style={{ height: 'calc(90vh - 80px)', minHeight: '500px' }}
                onLoad={handlePdfLoad}
                title="PDF Viewer"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <DepartmentSidebar
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        title="AIML Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default AIMlDepartment;

