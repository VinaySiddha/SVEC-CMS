
import React, { useState,useEffect } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Users, Briefcase, FileText, Activity, Rss, TrendingUp, Presentation, Trophy, Handshake, Building, Library, Download } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';

// Type definitions for CST department data
interface Faculty {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  profile_url: string;
  faculty_type: string;
}

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
  document_url?: string;
}

interface IndustryProgram {
  id: number;
  title: string;
  file_url: string;
}

interface Consultancy {
  id: number;
  name: string;
  year: string;
  url: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

interface Workshop {
  id: number;
  title: string;
  category: string;
  file_url?: string;
  description?: string;
}

interface PhysicalFacility {
  id: number;
  category: string;
  title?: string;
  description?: string;
  lab_details?: any[];
  file_url?: string;
}

interface Overview {
  hod_image_url: string;
  hod_name: string;
  hod_qualification: string;
  hod_email: string;
  description: string;
}

const CivilDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);

  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [technicalFaculty, setTechnicalFaculty] = useState<Faculty[]>([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = useState<NonTeachingMember[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>([]);
const [syllabus, setSyllabus] = useState<Syllabus[]>([]);
const [eresources, setEResources] = useState<EResource[]>([]);
const [departmentLibrary, setDepartmentLibrary] = useState<DepartmentLibrary | null>(null);
const [mous, setMous] = useState<MOU[]>([]);
const [industryPrograms,setIndustryPrograms]=useState<IndustryProgram[]>([]);
const [workshops, setWorkshops] = useState<Workshop[]>([]);
const [lectureGallery, setLectureGallery] = useState<any[]>([]);
const [trainingGalleryFromHackathons, setTrainingGalleryFromHackathons] = useState<any[]>([]);


const [overview, setOverview] = useState<Overview | null>(null);

const [physicalFacilities, setPhysicalFacilities] = useState<PhysicalFacility[]>([]);
const [laboratories, setLaboratories] = useState<any[]>([]);
const [classrooms, setClassrooms] = useState<any[]>([]);
const [timetables, setTimetables] = useState<any[]>([]);
const [seminarHalls, setSeminarHalls] = useState<any[]>([]);
const [facultyDevelopment, setFacultyDevelopment] = useState<any[]>([]);
const [selectedFacultyDevelopment, setSelectedFacultyDevelopment] = useState<any>(null);
const [facultyAchievements, setFacultyAchievements] = useState<any[]>([]);
const [meritScholarships, setMeritScholarships] = useState<any[]>([]);
const [eapcetToppers, setEapcetToppers] = useState<any[]>([]);
const [extraCurricular, setExtraCurricular] = useState<any[]>([]);
const [sahayaEvents, setSahayaEvents] = useState<any[]>([]);
const [scudActivities, setScudActivities] = useState<any[]>([]);
const [extraCurricularGallery, setExtraCurricularGallery] = useState<any[]>([]);
const [technicalAssociationGallery, setTechnicalAssociationGallery] = useState<any[]>([]);
const [newsletters, setNewsletters] = useState<any[]>([]);
const [hackathons, setHackathons] = useState<any[]>([]);
const [hackathonsGallery, setHackathonsGallery] = useState<any[]>([]);
const [eapcetToppersGallery, setEapcetToppersGallery] = useState<any[]>([]);
const [trainingActivitiesGallery, setTrainingActivitiesGallery] = useState<any[]>([]);
const [trainingActivities, setTrainingActivities] = useState<any[]>([]);
const [handbooks, setHandbooks] = useState<any[]>([]);
const [placements, setPlacements] = useState<any[]>([]);
const [placementsGalleryData, setPlacementsGalleryData] = useState<any[]>([]);
const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
const[bosMembers,setBosMembers]=useState<BOSMember[]>([]);
const[bosMinutes,setBosMinutes]=useState<BOSMinute[]>([]);
const [consultancy, setConsultancy] = useState<Consultancy[]>([]);
const [researchProjects, setResearchProjects] = useState<any[]>([]);

  // Sort by ID in descending order (latest first)
  const sortByIdDesc = <T extends { id?: number }>(items: T[]): T[] =>
    [...items].sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));

  // Ensure lists show in ascending id order for consistent display
  const sortByIdAsc = <T extends { id?: number }>(items: T[]): T[] =>
    [...items].sort((a, b) => (a?.id ?? 0) - (b?.id ?? 0));

  const normalizeArray = <T extends { id?: number }>(data: unknown): T[] =>
    Array.isArray(data) ? sortByIdDesc(data as T[]) : [];

  // Sort placements so latest pass-out/batch appears first
  const sortPlacementsByBatchDesc = <T extends { batch?: string; id?: number }>(items: T[]): T[] => {
    const getEndYear = (batch?: string) => {
      if (!batch) return 0;
      const parts = batch.split(/[^0-9]+/).filter(Boolean);
      const last = parts[parts.length - 1];
      const year = last ? parseInt(last, 10) : 0;
      // Normalize 2-digit years by mapping 00-99 to 2000-2099 for ordering
      if (year < 100) return 2000 + year;
      return year;
    };

    return [...items].sort((a, b) => {
      const yearA = getEndYear((a as any).batch);
      const yearB = getEndYear((b as any).batch);
      if (yearA !== yearB) return yearB - yearA;
      return (b?.id ?? 0) - (a?.id ?? 0); // fallback: latest id first
    });
  };


   useEffect(() => {
    // Make all API calls in parallel using Promise.all()
    Promise.all([
      fetch('/api/civil/civil-faculty').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-non-teachning-staff').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-student-achievements').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-syllabus').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-eresources').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-department-library').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-mous').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-industry-programs').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-department-overview').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-training-activities').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-bos-members').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-bos-minutes').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-handbooks').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-physical-facilities').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-faculty-development').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-faculty-achievements').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-eapcet-toppers').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-extracurricular-activities').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-newsletters').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-hackathons').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-placements').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-workshops').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-hackathons-gallery').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-extra-curricular-gallery').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-training-activities-gallery').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-consultancy').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-placements-gallery').then(res => res.json()).catch(() => []),
      fetch('/api/civil/civil-research-projects').then(res => res.json()).catch(() => []),
      
    ])
    .then(([
      facultyData,
      nonTeachingStaffData,
      studentAchievementsData,
      syllabusData,
      eresourcesData,
      departmentLibraryData,
      mousData,
      industryProgramsData,
      overviewData,
      trainingActivitiesData,
      bosMembersData,
      bosMinutesData,
      handbooksData,
      physicalFacilitiesData,
      facultyDevelopmentData,
      facultyAchievementsData,
      eapcetToppersData,
      extraCurricularData,
      newslettersData,
      hackathonsData,
      placementsData,
      workshopsData,
      hackathonsGalleryData,
      extraCurricularGalleryData,
      trainingActivitiesGalleryData,
      consultancyData,
      placementsGalleryData,
      researchProjectsData,
    ]) => {
      // Separate faculty by type
      const teachingFaculty: Faculty[] = [];
      const technicalFacultySeparated: Faculty[] = [];
      const nonTeachingFacultySeparated: NonTeachingMember[] = [];

      if (Array.isArray(facultyData)) {
        facultyData.forEach((f: any) => {
          const facultyMember = {
            ...f,
            profile_url: f.profileUrl || f.profile_url,
            faculty_type: f.faculty_type || 'teaching',
          };

          if (f.faculty_type === 'technical') {
            technicalFacultySeparated.push(facultyMember);
          } else if (f.faculty_type === 'non_teaching') {
            nonTeachingFacultySeparated.push(facultyMember);
          } else {
            teachingFaculty.push(facultyMember);
          }
        });
      }

        setFaculty(sortByIdDesc(teachingFaculty));
        setTechnicalFaculty(sortByIdDesc(technicalFacultySeparated));
        setNonTeachingFaculty(sortByIdDesc(nonTeachingFacultySeparated));
        setStudentAchievements(normalizeArray<StudentAchievement>(studentAchievementsData));
        setSyllabus(normalizeArray<Syllabus>(syllabusData));
        setEResources(normalizeArray<EResource>(eresourcesData));
        setDepartmentLibrary(Array.isArray(departmentLibraryData) && departmentLibraryData.length > 0 ? departmentLibraryData[0] : null);
        setMous(normalizeArray<MOU>(mousData));
        setIndustryPrograms(normalizeArray<IndustryProgram>(industryProgramsData));
        setOverview(Array.isArray(overviewData) ? overviewData[0] : overviewData || null);
        setTrainingActivities(normalizeArray<any>(trainingActivitiesData));
        setBosMembers(normalizeArray<BOSMember>(bosMembersData));
        setBosMinutes(normalizeArray<BOSMinute>(bosMinutesData));
        setHandbooks(normalizeArray<any>(handbooksData));
        setPhysicalFacilities(normalizeArray<PhysicalFacility>(physicalFacilitiesData));
        
        // Filter physical facilities data by category
        const allPhysicalFacilities = normalizeArray<any>(physicalFacilitiesData);
        console.log('Physical Facilities Data:', allPhysicalFacilities);
        console.log('Hackathons Gallery Data:', hackathonsGalleryData);
        
        const labsData = normalizeArray<any>(hackathonsGalleryData).filter((item: any) => item.category === 'labs');
        const classroomsData = allPhysicalFacilities.filter((item: any) => item.category === 'Class Rooms' || item.category === 'Class Room');
        const timetablesData = allPhysicalFacilities.filter((item: any) => item.category === 'Timetables' || item.category === 'Class Timetable');
        const seminarHallsData = allPhysicalFacilities.filter((item: any) => item.category === 'Seminar Halls');
        
        console.log('Laboratories filtered:', labsData);
        console.log('Classrooms filtered:', classroomsData);
        console.log('Timetables filtered:', timetablesData);
        console.log('Seminar Halls filtered:', seminarHallsData);
        
        setLaboratories(labsData);
        setClassrooms(classroomsData);
        setTimetables(timetablesData);
        setSeminarHalls(seminarHallsData);
        
        setFacultyDevelopment(normalizeArray<any>(facultyDevelopmentData));
        setFacultyAchievements(normalizeArray<any>(facultyAchievementsData));
        setMeritScholarships([]); // Merit scholarships data not available from API
        
        // Handle EAPCET Toppers - ensure it's an array
        console.log('Raw EAPCET Toppers Data:', eapcetToppersData);
        console.log('Type:', typeof eapcetToppersData);
        console.log('Is Array:', Array.isArray(eapcetToppersData));
        
        let eapcetArray = [];
        if (Array.isArray(eapcetToppersData)) {
          eapcetArray = eapcetToppersData;
        } else if (eapcetToppersData && typeof eapcetToppersData === 'object') {
          // Check if it has a data property (common API response pattern)
          if (eapcetToppersData.data && Array.isArray(eapcetToppersData.data)) {
            eapcetArray = eapcetToppersData.data;
          } else if (Object.keys(eapcetToppersData).length > 0) {
            // Convert object to array
            eapcetArray = Object.values(eapcetToppersData);
          }
        }
        
        console.log('EAPCET Array after conversion:', eapcetArray);
        console.log('EAPCET Array length:', eapcetArray.length);
        
        // Don't normalize yet - set the array directly to see raw data
        setEapcetToppers(sortByIdDesc(eapcetArray));
        
        setExtraCurricular(normalizeArray<any>(extraCurricularData));
        setSahayaEvents(normalizeArray<any>(sahayaEvents));
        setScudActivities(normalizeArray<any>(scudActivities));
        setNewsletters(normalizeArray<any>(newslettersData));
        setHackathons(normalizeArray<any>(hackathonsData));
        setPlacements(sortPlacementsByBatchDesc(normalizeArray<any>(placementsData)));
        setWorkshops(normalizeArray<Workshop>(workshopsData));
        
        setHackathonsGallery(normalizeArray<any>(hackathonsGalleryData));
        
        // Filter hackathons gallery for technical association images
        const technicalGalleryData = normalizeArray<any>(hackathonsGalleryData).filter((item: any) => item.category === 'technical');
        setTechnicalAssociationGallery(technicalGalleryData);
     
        setExtraCurricularGallery(normalizeArray<any>(extraCurricularGalleryData));
        setTrainingActivitiesGallery(normalizeArray<any>(trainingActivitiesGalleryData));
        console.log('Placements Gallery Data from API:', placementsGalleryData);
        setPlacementsGalleryData(normalizeArray<any>(placementsGalleryData));
        setConsultancy(normalizeArray<Consultancy>(consultancyData));
        setResearchProjects(normalizeArray<any>(researchProjectsData));
    })
    .catch(() => {
      // Error handling
    });
  }, []);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
     { id: 'faculty-achievements', label: 'Faculty Achievements', icon: <Briefcase className="w-4 h-4" /> },
  //  { id: 'Merit Scholarship/Academic Toppers', label: 'Academic/EAPCET Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Cpu className="w-4 h-4" /> },
//    { id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    //{ id: 'Hackathons', label: 'Hackathons', icon: <Cpu className="w-4 h-4" /> },
    //{ id: 'e-Resources', label: 'e-Resources', icon: <Wifi className="w-4 h-4" /> },
    //{ id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Research Projects', label: 'Research Projects', icon: <FileText className="w-4 h-4" /> },
    { id: 'Consultancy', label: 'Consultancy', icon: <FileText className="w-4 h-4" /> },
    
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
              To evolve as a center of excellence in Computer Science & Technology education, producing professionally competent and socially responsible technologists.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To impart quality education through effective teaching-learning processes with emphasis on emerging technologies.</li>
              <li>To provide excellent infrastructure and environment conducive for research and innovation.</li>
              <li>To enhance industry-institute interaction to make students technology-ready.</li>
              <li>To develop leadership skills and ethical values among students.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">	CST	Graduates of this programme will be able to :</p>
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
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>1. Engineering knowledge:</strong>
                    Apply the knowledge of Mathematics, Science, Engineering Fundamentals, and Concepts of Computer Science Engineering to the solution of complex Engineering problems. [K3]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>2. Problem Analysis:</strong>
                    Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of Mathematics, Natural Sciences, and Computer Science. [K4]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>3. Design/development of solutions:</strong>
                    Design solutions for complex engineering problems and design system components or processes that meet the specific needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental considerations. [K5]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>4. Conduct investigations of complex problems:</strong>
                    Use research-based knowledge and research methods, including the design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions. [K5]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>5. Modern tool usage:</strong>
                    Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling, to complex Engineering activities with an understanding of the limitations. [K3]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>6. The engineer and society:</strong>
                    Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues and the consequent responsibilities relevant to professional Engineering practice. [K3]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>7. Environment and sustainability:</strong>
                    Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate knowledge of, and the need for sustainable development. [K3]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>8. Ethics:</strong>
                    Apply ethical principles and commit to professional ethics and responsibilities and norms of Engineering practice. [K3]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>9. Individual and team work:</strong>
                    Function effectively as an individual and as a member or leader in diverse teams and in multidisciplinary settings. [K6]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>10. Communication:</strong>
                    Communicate effectively on complex Engineering activities with the Engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions. [K2]
                  </li>
                  <li style={{marginBottom: '10px'}}>
                    <strong style={{color: '#850209'}}>11. Project management and finance:</strong>
                    Demonstrate knowledge and understanding of Engineering and Management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments. [K6]
                  </li>
                  <li>
                    <strong style={{color: '#850209'}}>12. Life-long learning:</strong>
                    Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change. [K1]
                  </li>
                </ol>
              </div>
            </div>
          );
      case 'PSOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <p className="text-gray-700 mb-4">Graduate of the Computer Science and Technology Programme will be able to:</p>
            <div className="pl-5 space-y-3 text-gray-700 text-justify">
              <ol className="list-decimal pl-6">
                <li style={{marginBottom: '10px'}}>
                  <span className="font-semibold" style={{color: '#850209'}}>PSO1:</span> Use Mathematical Abstractions and Algorithmic Design along with Open Source Programming tools to solve complexities involved in Programming. <span style={{fontWeight: 'bold'}}>[K3]</span>
                </li>
                <li style={{marginBottom: '10px'}}>
                  <span className="font-semibold" style={{color: '#850209'}}>PSO2:</span> Use Professional Engineering practices and strategies for development and maintenance of software. <span style={{fontWeight: 'bold'}}>[K3]</span>
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
              The course outcomes for all courses offered by the Computer Science & Technology department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-800">Course Outcomes (V23 Regulation)</span>
                <a
                  href="https://srivasaviengg.ac.in/uploads/cst/Course%20Outcomes%20-V23%20Regulation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 inline-block px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-300 view-button"
                  style={{fontSize: '16px'}}
                >
                  View PDF
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Course Outcomes (V20 Regulation)</span>
                <a
                  href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Course%20Outcomes%20-V20%20Regulation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 inline-block px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-300 view-button"
                  style={{fontSize: '16px'}}
                >
                  View PDF
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Course Outcomes (V18 Regulation)</span>
                <a
                  href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Course%20Outcomes%20-V18%20Regulation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 inline-block px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-300 view-button"
                  style={{fontSize: '16px'}}
                >
                  View PDF
                </a>
              </div>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Salient Features</h3>
            <ul className="pl-5 space-y-3 text-gray-700">
              <li><strong className="text-[#850209]">➟</strong> All Class Rooms are ICT enabled.</li>
              <li><strong className="text-[#850209]">➟</strong> MoUs with NIT ANP, Eduskills, Hexaware, APSSDC, Alykas Innovations Pvt.Ltd, thingTronics Pvt Ltd, Bangalore and TCS-iON.</li>
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
            <p className="text-gray-700 leading-relaxed">
              The Department of Computer Science & Technology was established in 2019. The department offers undergraduate program in Computer Science & Technology with an intake of 60 students.
            </p>
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
                      <td className="border border-gray-300 px-4 py-3">B.Tech-Computer Science and Technology</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">AP EAPCET</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">4 Years</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">60</td>
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
        'Roll of Honour',
        'Awards',
        'GATE',
        'GIF',
        'NPTEL/Other Certifications',
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
          <details key={group.category} open={index === 0} className="cst-dropdown">
            <summary>{group.category}</summary>
            <div className="cst-dropdown-content">
              {group.items.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {group.items.map((item, idx) => {
                    const fileLink = item.fileUrl || (item as any).file_url;
                    return (
                      <li key={idx}>
                        {item.title}
                        {fileLink && (
                          <>
                            {' - '}
                            <a
                              href={fileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline"
                            >
                              View More
                            </a>
                          </>
                        )}
                      </li>
                    );
                  })}
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
}``
    case 'Syllabus': {
        // Group syllabus by type
        const types = Array.from(new Set(syllabus.map(s => s.type)));
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            <div className="space-y-6">
              {types.map((type, index) => (
                <details key={type} open={index === 0} className="cst-dropdown">
                  <summary>{type}</summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 my-2">
                      {syllabus.filter(s => s.type === type).map((item, idx) => (
                        <li key={idx}>
                          {item.subject || item.title}
                          {(item.file_url || item.fileUrl) && (
                            <>
                              {' '}
                              <a
                                href={item.file_url || item.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                - View
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
      }

    case 'Research Projects': {
      // Group by type (B.Tech, M.Tech, etc.) from the civil_research_projects table
      const types = Array.from(new Set(researchProjects.map(p => p.type).filter(Boolean)));
      const grouped = types.map(type => ({
        type: type,
        items: researchProjects.filter(p => p.type === type)
      }));

      return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
          <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Research Projects</h2>
          <div className="space-y-6">
            {grouped.map((group, index) => (
              <details key={group.type} open={index === 0} className="cst-dropdown">
                <summary>{group.type}</summary>
                <div className="cst-dropdown-content">
                  {group.items.length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {group.items.map((item, idx) => {
                        const fileLink = item.file_url || (item as any).fileUrl;
                        return (
                          <li key={idx}>
                            {item.title}
                            {item.category && ` - ${item.category}`}
                            {item.year && ` (${item.year})`}
                            {fileLink && (
                              <>
                                {' - '}
                                <a
                                  href={fileLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View More
                                </a>
                              </>
                            )}
                          </li>
                        );
                      })}
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

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Teaching Faculty</summary>
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
                                <a 
                                  href={member.profile_url || `${member.profile_url}`}
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
                <summary>Technical Staff</summary>
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
                <summary>Non-Teaching Staff</summary>
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
          <details key={reg} open={index === 0} className="cst-dropdown">
            <summary>{reg}-Subjects</summary>
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
        <details open className="cst-dropdown">
          <summary>Board of Studies Members</summary>
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

        <details className="cst-dropdown">
          <summary>Board of Studies Meeting Minutes</summary>
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
              <th className="py-3 px-4 border-b text-left">Document</th>
            </tr>
          </thead>
          <tbody>
            {mous.map((item, idx) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{idx + 1}</td>
                <td className="py-3 px-4 border-b">{item.mou_with}</td>
                <td className="py-3 px-4 border-b">{item.from_date}</td>
                <td className="py-3 px-4 border-b">{item.to_date}</td>
                <td className="py-3 px-4 border-b">
                  <a
                    className="text-[#B22222] hover:underline"
                    href={item.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-xl font-semibold text-[#B22222] mb-4">B. Interaction with the Industry</h3>
      <div className="flex justify-center mb-6">
        <ul className="space-y-4 list-none max-w-3xl">
          {industryPrograms.map((item) => (
            <li key={item.id} className="py-2">
              {item.title} -{' '}
              <a
                href={item.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B22222] hover:underline ml-2"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
     
case 'Consultancy': {
  // Group consultancy by year
  const groupedByYear: Record<string, any[]> = {};
  consultancy.forEach(item => {
    const year = item.year || 'Unknown Year';
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(item);
  });

  const years = Object.keys(groupedByYear).sort().reverse();

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Consultancy Details</h2>
      
      {consultancy && consultancy.length > 0 ? (
        <div className="space-y-4">
          {years.map((year, idx) => (
            <details key={year} open={idx === 0} className="cst-dropdown">
              <summary className="text-left">{year}</summary>
              <div className="cst-dropdown-content">
                <ul className="list-none space-y-3">
                  {groupedByYear[year].map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded transition border-b border-gray-100">
                      <span className="text-gray-800 font-medium">{item.name}</span>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B22222] hover:underline font-medium text-sm whitespace-nowrap ml-4"
                        >
                          View More
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No consultancy details available at this time.</p>
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
           

            <div className="space-y-6">
              {/* Laboratory Images Gallery from civil_hackathons_gallery */}
              <details open className="cst-dropdown group">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Laboratories</span>
                </summary>
                <div className="cst-dropdown-content">
                  <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }} className="space-y-6">
                    {laboratories && laboratories.length > 0 ? (
                      <div className="mt-8 pt-8">
                        <h3 className="text-2xl font-bold text-center mb-6 text-[#B22222]">Laboratory Images</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                          {laboratories.map((lab, idx) => (
                            <div key={lab.id || idx} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                              <img
                                src={lab.gallery}
                                alt={lab.title || `Laboratory ${idx + 1}`}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3EImage not found%3C/text%3E%3C/svg%3E';
                                }}
                              />
                              {lab.title && (
                                <div className="p-3 bg-white">
                                  <p className="text-sm font-medium text-gray-700">{lab.title}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center py-4">No laboratory images available.</p>
                    )}
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
      } 

      case 'Faculty Development Programs': {
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
          <details key={group.category} open={index === 0} className="cst-dropdown">
            <summary>{group.category}</summary>
            <div className="cst-dropdown-content">
            {group.category === 'Gallery' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {group.items
                  .filter(item => item.gallery && Array.isArray(item.gallery) && item.gallery.length > 0)
                  .flatMap(item => item.gallery || [])
                  .map((img, i) => (
                    <img key={i} src={img} alt={`FDP Gallery ${i + 1}`} className="w-full h-auto rounded-lg shadow" />
                  ))
                }
              </div>
            ) : (
              <ul className="list-disc pl-6 my-2 space-y-2">
                {group.items.map((item, idx) => (
                  <li key={item.id}>
                    {item.title}
                    {item.year && <> ({item.year})</>}
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
            )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
     case 'faculty-achievements': {
  // Get all categories from DB
  const categories = Array.from(new Set(facultyAchievements.map(a => a.category)));
  const grouped = categories.map(cat => ({
    category: cat,
    items: facultyAchievements.filter(a => a.category === cat)
  }));

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
      <div className="space-y-6">
        {grouped.map((group, index) => (
          <details key={group.category} open={index === 0} className="cst-dropdown">
            <summary>{group.category}</summary>
            <div className="cst-dropdown-content">
            {group.items.length > 0 ? (
              <ul className="list-disc pl-6 my-2 space-y-2">
                {group.items.map((item, idx) => (
                  <li key={item.id}>
                    {item.title}
                    {item.author && <> <span className="text-gray-600">({item.author})</span></>}
                    {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
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
     case 'Merit Scholarship/Academic Toppers': {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic Toppers and EAPCET Toppers</h2>
      
      <div className="space-y-6">
        {/* Academic Toppers Dropdown */}
        <details open className="cst-dropdown group">
          <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
            <span>Academic Toppers</span>
          </summary>
          <div className="cst-dropdown-content">
            {meritScholarships && meritScholarships.length > 0 ? (
              <>
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
                      {meritScholarships.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">{idx + 1}</td>
                          <td className="py-3 px-4 border-b">{item.academic_year}</td>
                          <td className="py-3 px-4 border-b">{item.particulars}</td>
                          <td className="py-3 px-4 border-b">{item.students_benefited}</td>
                          <td className="py-3 px-4 border-b">{item.scholarship_amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Image Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {meritScholarships
                    .filter(item => item.gallery && Array.isArray(item.gallery) && item.gallery.length > 0)
                    .flatMap(item => item.gallery || [])
                    .map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Academic Toppers Image ${i + 1}`}
                        className="w-full h-auto rounded-lg shadow object-cover"
                      />
                    ))
                  }
                </div>
              </>
            ) : (
              <p className="text-gray-700 text-center py-4">No Academic Toppers data available.</p>
            )}
          </div>
        </details>

        {/* EAPCET Toppers Dropdown */}
        <details open className="cst-dropdown group">
          <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
            <span>EAPCET Toppers</span>
          </summary>
          <div className="cst-dropdown-content">
            {eapcetToppers && eapcetToppers.length > 0 ? (
              <>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">S.No</th>
                        <th className="py-3 px-4 border-b text-left">Year</th>
                        <th className="py-3 px-4 border-b text-left">Student Name</th>
                        <th className="py-3 px-4 border-b text-left">EAPCET Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eapcetToppers.map((item, idx) => (
                        <tr key={item.id || `eapcet-${idx}`} className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">{idx + 1}</td>
                          <td className="py-3 px-4 border-b">{item.year}</td>
                          <td className="py-3 px-4 border-b">{item.name_of_student}</td>
                          <td className="py-3 px-4 border-b">{item.student_rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {(() => {
                  // Get EAPCET images from dedicated gallery
                  const eapcetImages = eapcetToppersGallery
                    .flatMap(item => {
                      if (item.gallery) {
                        return item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                      }
                      return [];
                    });

                  return eapcetImages.length > 0 ? (
                    <>
                      <h3 className="text-xl font-semibold text-center mb-4">Image Gallery</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {eapcetImages.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`EAPCET Toppers Image ${i + 1}`}
                            className="w-full h-auto rounded-lg shadow object-cover"
                          />
                        ))}
                      </div>
                    </>
                  ) : null;
                })()}
              </>
            ) : (
              <p className="text-gray-700 text-center py-4">No EAPCET Toppers data available.</p>
            )}
          </div>
        </details>
      </div>
    </div>
  );
}

    
       case 'Technical Association': {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
      
      <div className="space-y-4">
        {/* SCUD Activities Dropdown */}
        

        {/* IE India Dropdown */}
        <details open className="cst-dropdown">
          <summary>Institution of Engineering (India) - IE India</summary>
          <div className="cst-dropdown-content">
            <div className="space-y-6">
<p className="text-gray-700 mb-6 text-justify">
        In this institition INSTITUTION OF ENGINEERING (INDIA) students'
                chapter was opened in Civil Engineering Department in the year
                2017 with 117 student members. It is promoting co-operatiob
                amongst students and faculty for advancement and idsseminatiob
                of knowledge in the feild of Civil Engineering. The IE students'
                chapter commitee constitutes the folling members
      </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="py-3 px-4 border-b text-left font-semibold">Designation</th>
                      <th className="py-3 px-4 border-b text-left font-semibold">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="py-3 px-4">Members</td>
                      <td className="py-3 px-4">
                        <ol className="list-decimal list-inside space-y-1">
                          <li>K.J.Ganapathi</li>
                          <li>N.G.Lokesh</li>
                          <li>T.Teja</li>
                          <li>Y.Harika</li>
                        </ol>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </details>

        {/* Gallery Dropdown */}
        <details className="cst-dropdown">
          <summary>Gallery</summary>
          <div className="cst-dropdown-content">
            {(() => {
              // Use technicalAssociationGallery which is already filtered for 'technical' category
              const technicalImages = technicalAssociationGallery.flatMap(item => {
                if (item.gallery) {
                  // Handle if gallery is already an array
                  if (Array.isArray(item.gallery)) {
                    return item.gallery.filter((url: string) => url && url.trim().length > 0);
                  }
                  // Handle if gallery is a string
                  if (typeof item.gallery === 'string') {
                    return item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                  }
                }
                return [];
              });

              return technicalImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  {technicalImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Technical Association Image ${i + 1}`}
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No gallery images available</p>
              );
            })()}
          </div>
        </details>
      </div>
    </div>
  );
}
     case 'Newsletters': {
  // Group newsletters by year for better UX
  const grouped = newsletters.reduce((acc, n) => {
    if (!acc[n.year]) acc[n.year] = [];
    acc[n.year].push(n);
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Newsletters</h2>
      <div className="space-y-4">
        {Object.entries(grouped).map(([year, items], index) => (
          <details key={year} open={index === 0} className="cst-dropdown">
            <summary>{year} Newsletters</summary>
            <div className="cst-dropdown-content">
              <ul className="list-none pl-0 my-2">
                {(items as any[]).map((item: any) => (
                  <li key={item.id} className="p-2">
                    {item.title} -{' '}
                    <a
                      href={item.file_url}
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
      </div>
    </div>
  );
}
     case 'Extra-Curricular Activities': {
      // Group by type from extraCurricular data
      const types = Array.from(new Set(extraCurricular.map(e => e.type).filter(Boolean)));
      const grouped = types.map(type => ({
        type: type,
        items: extraCurricular.filter(e => e.type === type)
      }));

      return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
          <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
          <div className="space-y-6">
            {grouped.map((group, index) => (
              <details key={group.type} open={index === 0} className="cst-dropdown">
                <summary>{group.type}</summary>
                <div className="cst-dropdown-content">
                  {group.items.length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {group.items.map((item, idx) => {
                        const fileLink = item.file_url || (item as any).fileUrl;
                        return (
                          <li key={idx}>
                            {item.title}
                            {item.year && ` (${item.year})`}
                            {fileLink && (
                              <>
                                {' - '}
                                <a
                                  href={fileLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View More
                                </a>
                              </>
                            )}
                          </li>
                        );
                      })}
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
 case 'Hackathons': {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Hackathons</h2>
      <div className="space-y-6">
        <div>
          <p className="text-gray-700 leading-relaxed">
            A 24-hour student hackathon is an event where students come together to collaborate, innovate, and
            create projects within a short time frame. These hackathons have gained immense popularity in recent years,
            and they hold significant importance for students for several reasons:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
            <li><span className="font-medium">Hands-on learning:</span> Hackathons provide students a unique opportunity to engage in hands-on learning by applying knowledge and skills to real-world problems and challenges.</li>
            <li><span className="font-medium">Collaboration and teamwork:</span> Teams form with diverse backgrounds, enabling effective communication and leveraging strengths to tackle complex problems collectively.</li>
            <li><span className="font-medium">Innovation and creativity:</span> Time constraints encourage novel solutions and exploration of unconventional ideas, leading to unique projects.</li>
            <li><span className="font-medium">Networking and industry exposure:</span> Participants, mentors, and judges from industry provide excellent networking opportunities that can lead to internships, jobs, or collaborations.</li>
            <li><span className="font-medium">Skill development:</span> Students learn new technologies, languages, and tools to complete their projects and broaden their skillsets.</li>
            <li><span className="font-medium">Resume/portfolio enhancement:</span> Demonstrates passion, problem-solving, teamwork, and ability to work under pressure.</li>
            <li><span className="font-medium">Recognition and awards:</span> Many hackathons offer prizes and recognition, boosting confidence and opening doors to further opportunities.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            In conclusion, student hackathons promote hands-on learning, collaboration, innovation, networking, skill development,
            resume enhancement, and recognition. They serve as a platform for students to showcase abilities, learn from peers,
            and gain valuable experience in a short period.
          </p>
        </div>

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
                                className="w-[350px] h-[240px] rounded-lg shadow-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                  (e.target as HTMLImageElement).className = 'w-[350px] h-[240px] rounded-lg shadow-lg bg-gray-200';
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

     case 'Training Activities':
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Training Activities</h2>
      <div className="space-y-6">
        {/* Gallery Dropdown */}
        
        
        {/* Regular Training Activities */}
        {trainingActivities.map((activity, idx) => (
          <details key={activity.id} open={idx === 0} className="cst-dropdown">
            <summary>{activity.title}</summary>
            <div className="cst-dropdown-content">
              <ul className="list-disc pl-6 my-2">
                <li>
                  {activity.title} -{' '}
                  <a
                    href={activity.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B22222] hover:underline"
                  >
                    View More
                  </a>
                </li>
              </ul>
              {activity.gallery && Array.isArray(activity.gallery) && activity.gallery.length > 0 && (
                <details open className="border rounded-lg p-4 mt-4">
                  <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {activity.gallery && Array.isArray(activity.gallery) && activity.gallery.map((img: any, i: number) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Training Activity Image ${i + 1}`}
                        className="w-full h-auto rounded-lg shadow object-cover"
                      />
                    ))}
                  </div>
                </details>
              )}
            </div>
            
          </details>
          
        ))}
        <details className="cst-dropdown">
          <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
            <span>Gallery</span>
          </summary>
          <div className="cst-dropdown-content">
            {trainingActivitiesGallery && trainingActivitiesGallery.length > 0 ? (
              (() => {
                // Collect all images from all gallery items
                const allImages: string[] = [];
                trainingActivitiesGallery.forEach((galleryItem) => {
                  // Parse and add images from this gallery item
                  if (galleryItem.gallery) {
                    const images = galleryItem.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                    allImages.push(...images);
                  }
                });

                // Display all images in a single grid
                return allImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allImages.map((img, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <img
                          src={img}
                          alt={`Training Activity Image ${i + 1}`}
                          className="w-full h-48 rounded-lg shadow-lg object-cover"
                          onError={(e) => {
                            console.log('Training image load error:', img);
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-600 py-8">
                    No images available
                  </div>
                );
              })()
            ) : (
              <p className="text-gray-700 text-center py-4">No training gallery images available.</p>
            )}
          </div>
        </details>
      </div>
      
    </div>
    
  );
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
                        href={item.file_url}
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
}
    case 'Placements':
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
      <div className="space-y-6">
        {placements.map((placement, idx) => (
          <details key={placement.id} open={idx === 0} className="cst-dropdown">
            <summary className="text-left">{placement.title || `Placements for Batch ${placement.batch}`}</summary>
            <div className="cst-dropdown-content">
              <ul className="list-none my-2 text-left">
                <li className="font-medium">
                  {placement.title || `Placements for Batch ${placement.batch}`} -{' '}
                  <a
                    href={placement.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B22222] hover:underline"
                  >
                    View More
                  </a>
                </li>
              </ul>
              {placement.gallery && Array.isArray(placement.gallery) && placement.gallery.length > 0 && (
                <div className="space-y-6 mt-4">
                  <h3 className="text-xl font-semibold text-center text-[#B22222] mb-4">{placement.batch} Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {placement.gallery && Array.isArray(placement.gallery) && placement.gallery.map((img: any, i: number) => (
                      <div key={i}>
                        <img
                          src={img.url}
                          alt={img.caption || `Placement ${i + 1}`}
                          className="w-full h-auto rounded-lg shadow object-cover"
                          style={{ aspectRatio: '16/9' }}
                        />
                        {img.roll_no && (
                          <div className="text-center my-3 text-green-600">
                            <strong>Roll No:</strong> {img.roll_no}<br />
                            <strong>Name:</strong> {img.name}<br />
                            <strong>Company:</strong> {img.company}<br />
                            <strong>Package:</strong> {img.package}
                          </div>
                        )}
                        {img.caption && !img.roll_no && (
                          <div className="text-center my-3 text-green-600">{img.caption}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </details>
        ))}

        {/* Gallery Dropdown */}
        <details className="cst-dropdown">
          <summary>Gallery</summary>
          <div className="cst-dropdown-content">
            {(() => {
              // Debug: Check what data we have in the UI
              console.log('Placement Items in UI:', placementsGalleryData);
              
              // Use placementsGalleryData which is already filtered by the API
              const placementItems = placementsGalleryData;

              // Group by academic_year
              const groupedByYear: Record<string, string[]> = {};
              placementItems.forEach(item => {
                const year = item.academic_year || 'Unknown';
                if (!groupedByYear[year]) {
                  groupedByYear[year] = [];
                }

                // Extract images from gallery field
                if (item.gallery) {
                  if (Array.isArray(item.gallery)) {
                    groupedByYear[year].push(...item.gallery.filter((url: string) => url && url.trim().length > 0));
                  } else if (typeof item.gallery === 'string') {
                    const images = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                    groupedByYear[year].push(...images);
                  }
                }
              });

              const years = Object.keys(groupedByYear).sort().reverse();

              return years.length > 0 ? (
                <div className="space-y-6">
                  {years.map((year) => (
                    <div key={year}>
                      <h3 className="text-xl font-semibold text-center mb-4 text-[#B22222]">{year}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {groupedByYear[year].map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Placement ${year} Image ${i + 1}`}
                            className="w-full h-auto rounded-lg shadow object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No gallery images available</p>
              );
            })()}
          </div>
        </details>
      </div>
    </div>
  );

case 'Workshops': {
  // Group workshops by category to create dropdowns
  const groupedWorkshops: Record<string, Workshop[]> = {};
  workshops.forEach(workshop => {
    if (!groupedWorkshops[workshop.category]) {
      groupedWorkshops[workshop.category] = [];
    }
    groupedWorkshops[workshop.category].push(workshop);
  });

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops</h2>
      <div className="space-y-6">
        {/* Guest Lecturers/Seminars Section with Gallery */}
        {lectureGallery.length > 0 && (
          <details className="cst-dropdown" open>
            <summary className="text-left">GUEST LECTURERS/SEMINARS</summary>
            <div className="cst-dropdown-content">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {lectureGallery.map((img, i) => (
                  <div key={img.id || i} className="relative group">
                    <img
                      src={img.image_url}
                      alt={img.caption || `Guest Lecture ${i + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow hover:shadow-lg transition-shadow"
                    />
                    {img.caption && (
                      <div className="mt-2 text-center text-sm text-gray-600">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </details>
        )}
        
        {/* Regular Workshop Categories */}
        {Object.entries(groupedWorkshops).map(([category, workshopList], idx) => (
          <details key={category} open={idx === 0} className="cst-dropdown">
            <summary className="text-left capitalize">
              {category.replace(/_/g, ' ').toUpperCase()}
            </summary>
            <div className="cst-dropdown-content">
              <ul className="list-disc pl-6 my-2">
                {workshopList.map((workshop) => (
                  <li key={workshop.id} className="mb-2">
                    <div className="font-medium">{workshop.title}</div>
                    {workshop.description && (
                      <p className="text-gray-600 text-sm mt-1">{workshop.description}</p>
                    )}
                    {workshop.file_url && (
                      <a
                        href={workshop.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B22222] hover:underline text-sm inline-flex items-center gap-1 mt-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Details
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
        
        {workshops.length === 0 && lectureGallery.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            <Presentation className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p>No workshops data available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

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
              <h3 className="text-lg font-semibold text-gray-900">Board of Studies Meeting Minutes</h3>
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
                title="Board of Studies Meeting Minutes PDF"
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
        title="Civil Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default CivilDepartment;
