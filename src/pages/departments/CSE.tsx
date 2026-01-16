
import React, { useState, useEffect } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';

// Type definitions for CSE department data
interface Faculty {
  id: number;
  name: string;
  title?: string;
  qualification: string;
  designation: string;
  profile_url: string;
  profileUrl?: string;
  faculty_type: string;
  date_of_joining?: string;
}

// Designation priority mapping for sorting
const getDesignationPriority = (designation: string): number => {
  const designationLower = designation.toLowerCase().trim();

  if (designationLower.includes('professor') && designationLower.includes('hod')) return 1;
  if (designationLower === 'professor') return 2;
  if (designationLower.includes('associate professor')) return 3;
  if (designationLower.includes('sr') && designationLower.includes('asst')) return 4;
  if (designationLower.includes('sr') && designationLower.includes('assistant')) return 4;
  if (designationLower.includes('asst. professor')) return 5;
  if (designationLower.includes('assistant professor')) return 5;
  if (designationLower.includes('lecturer')) return 6;

  return 999; // Unknown designations go to end
};

// Sort faculty by designation priority first, then by date of joining (ascending)
const sortFacultyByJoiningAndDesignation = <T extends { date_of_joining?: string; designation?: string }>(faculty: T[]): T[] => {
  return [...faculty].sort((a, b) => {
    // First, sort by designation priority
    const priorityA = getDesignationPriority(a.designation || '');
    const priorityB = getDesignationPriority(b.designation || '');
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB; // Ascending priority order
    }
    
    // If designation priority is the same, sort by date of joining (ascending)
    const dateA = new Date(a.date_of_joining || '9999-12-31').getTime();
    const dateB = new Date(b.date_of_joining || '9999-12-31').getTime();
    
    return dateA - dateB;
  });
};

// Simple ascending id sort helper (used for faculty display order)
const sortByIdAsc = <T extends { id?: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => (a?.id ?? 0) - (b?.id ?? 0));

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
  subject?: string;
  type: string;
  fileUrl: string;
  file_url?: string;
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
  title?: string;
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
  organization_name: string;
  from_date: string;
  to_date: string;
  signed_date?: string;
  duration?: string;
  document_url?: string;
  file_url?: string;
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

interface Overview {
  hod_image_url: string;
  hod_name: string;
  hod_qualification: string;
  hod_email: string;
  description: string;
}

const CSEDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);
  const [expandedIndustryProgram, setExpandedIndustryProgram] = useState<number | null>(null);

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
  const [eapcetToppers, setEapcetToppers] = useState<any[]>([]);
  const [extraCurricular, setExtraCurricular] = useState<any[]>([]);
  const [sahayaEvents, setSahayaEvents] = useState<any[]>([]);
  const [ecActivities, setEcActivities] = useState<any[]>([]);
  const [scudActivities, setScudActivities] = useState<any[]>([]);
  const [extraCurricularGallery, setExtraCurricularGallery] = useState<any[]>([]);
  const [technicalAssociationGallery, setTechnicalAssociationGallery] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [hackathonsGallery, setHackathonsGallery] = useState<any[]>([]);
  const [trainingActivities, setTrainingActivities] = useState<any[]>([]);
  const [trainingActivitiesGallery, setTrainingActivitiesGallery] = useState<any[]>([]);
  const [extraCurricularGalleryData, setExtraCurricularGalleryData] = useState<any[]>([]);
  const [meritScholarshipsGalleryData, setMeritScholarshipsGalleryData] = useState<any[]>([]);
  const [eapcetToppersGalleryData, setEapcetToppersGalleryData] = useState<any[]>([]);
  const [placementsGalleryData, setPlacementsGalleryData] = useState<any[]>([]);
  const [workshopsGalleryData, setWorkshopsGalleryData] = useState<any[]>([]);
  const [facultyDevelopmentGalleryData, setFacultyDevelopmentGalleryData] = useState<any[]>([]);
  const [handbooks, setHandbooks] = useState<any[]>([]);
  const [placements, setPlacements] = useState<any[]>([]);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [workshopsGallery, setWorkshopsGallery] = useState<any[]>([]);
  const [bosMembers, setBosMembers] = useState<BOSMember[]>([]);
  const [bosMinutes, setBosMinutes] = useState<BOSMinute[]>([]);
  const [gateData, setGateData] = useState<any[]>([]);
  const [gateGalleryData, setGateGalleryData] = useState<any[]>([]);
  const [rollOfHonourData, setRollOfHonourData] = useState<any[]>([]);
  const [rollOfHonourGalleryData, setRollOfHonourGalleryData] = useState<any[]>([]);
  const [lecturersGalleryData, setLecturersGalleryData] = useState<any[]>([]);


  useEffect(() => {
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    
    // Make all API calls in parallel using Promise.all()
    Promise.all([
      fetch(`/api/cse/cse-faculty${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-student-achievements${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-syllabus${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-eresources${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-department-library${cacheBuster}`).then(res => res.json()).catch(() => null),
      fetch(`/api/cse/cse-mous${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-industry-programs${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-department-overview${cacheBuster}`).then(res => res.json()).catch(() => null),
      fetch(`/api/cse/cse-training-activities${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-bos-members${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-bos-minutes${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-handbooks${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-physical-facilities${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-laboratories${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-faculty-development${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-faculty-achievements${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-merit-scholarships${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-eapcet-toppers${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-extra-curricular${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-sahaya-events${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-scud-activities${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-newsletters${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-hackathons${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-placements${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-workshops${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-gate${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-roll-of-honour${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-hackathons-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-technical-association-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-training-activities-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-extra-curricular-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-merit-scholarships-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-eapcet-toppers-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-placements-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-workshops-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-faculty-development-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-gate-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-roll-of-honour-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-workshops-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/cse/cse-lecturers-gallery${cacheBuster}`).then(res => res.json()).catch(() => [])


    ])
      .then(([
        facultyData,
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
        laboratoriesData,
        facultyDevelopmentData,
        facultyAchievementsData,
        meritScholarshipsData,
        eapcetToppersData,
        extraCurricularData,
        sahayaEventsData,
        scudActivitiesData,
        newslettersData,
        hackathonsData,
        placementsData,
        workshopsData,
        gateDataFetch,
        rollOfHonourDataFetch,
        hackathonsGalleryData,
        technicalAssociationGalleryData,
        trainingActivitiesGalleryData,
        extraCurricularGalleryData,
        meritScholarshipsGalleryData,
        eapcetToppersGalleryData,
        placementsGalleryData,
        workshopsGalleryData,
        facultyDevelopmentGalleryData,
        gateGalleryDataFetch,
        rollOfHonourGalleryDataFetch,
        workshopsGalleryDataFetch,
        lecturersGalleryDataFetch
      ]) => {

        // Separate teaching, technical, and non-teaching faculty from the unified response
        // The API now includes faculty_type field: 'teaching', 'technical', or 'non_teaching'
        const teachingFaculty: Faculty[] = [];
        const technicalFacultySeparated: Faculty[] = [];
        const nonTeachingFaculty: NonTeachingMember[] = [];

        if (Array.isArray(facultyData)) {
          facultyData.forEach((f: any) => {
            if (f.faculty_type === 'technical') {
              technicalFacultySeparated.push(f);
            } else if (f.faculty_type === 'non_teaching') {
              nonTeachingFaculty.push(f);
            } else {
              teachingFaculty.push(f);
            }
          });
        }

        // Set data sorted by date of joining (ascending) and then by designation priority
        setFaculty(sortFacultyByJoiningAndDesignation(teachingFaculty));
        setTechnicalFaculty(sortFacultyByJoiningAndDesignation(technicalFacultySeparated));
        setNonTeachingFaculty(sortFacultyByJoiningAndDesignation(nonTeachingFaculty));
        setStudentAchievements(Array.isArray(studentAchievementsData) ? studentAchievementsData : []);
        setSyllabus(Array.isArray(syllabusData) ? syllabusData : []);
        setEResources(Array.isArray(eresourcesData) ? eresourcesData : []);
        setDepartmentLibrary(departmentLibraryData && departmentLibraryData.length > 0 ? departmentLibraryData[0] : null);
        setMous(Array.isArray(mousData) ? mousData : []);
        setIndustryPrograms(Array.isArray(industryProgramsData) ? industryProgramsData : []);
        setOverview(overviewData && overviewData.length > 0 ? overviewData[0] : null);
        setTrainingActivities(Array.isArray(trainingActivitiesData) ? trainingActivitiesData : []);
        setTrainingActivitiesGallery(Array.isArray(trainingActivitiesGalleryData) ? trainingActivitiesGalleryData : []);
        setBosMembers(Array.isArray(bosMembersData) ? bosMembersData : []);
        setBosMinutes(Array.isArray(bosMinutesData) ? bosMinutesData : []);
        setHandbooks(Array.isArray(handbooksData) ? handbooksData : []);
        
        // Merge laboratories data into physicalFacilities
        const mergedFacilities = [
          ...(Array.isArray(physicalFacilitiesData) ? physicalFacilitiesData : []),
          ...(Array.isArray(laboratoriesData) ? laboratoriesData : [])
        ];
        setPhysicalFacilities(mergedFacilities);
        setLaboratories(Array.isArray(laboratoriesData) ? laboratoriesData : []);
        setFacultyDevelopment(Array.isArray(facultyDevelopmentData) ? facultyDevelopmentData : []);
        setFacultyAchievements(Array.isArray(facultyAchievementsData) ? facultyAchievementsData : []);
        setMeritScholarships(Array.isArray(meritScholarshipsData) ? meritScholarshipsData : []);
        setEapcetToppers(Array.isArray(eapcetToppersData) ? eapcetToppersData : []);
        setExtraCurricular(Array.isArray(extraCurricularData) ? extraCurricularData : []);
        setSahayaEvents(Array.isArray(sahayaEventsData) ? sahayaEventsData : []);
        // Filter EC Activities from sahaya events
        const ecActivitiesData = Array.isArray(sahayaEventsData)
          ? sahayaEventsData.filter(event => event.category === 'ecactivities')
          : [];
        setEcActivities(ecActivitiesData);
        setScudActivities(Array.isArray(scudActivitiesData) ? scudActivitiesData : []);
        setExtraCurricularGallery(Array.isArray(extraCurricularGalleryData) ? extraCurricularGalleryData : []);
        setTechnicalAssociationGallery(Array.isArray(technicalAssociationGalleryData) ? technicalAssociationGalleryData : []);
        setNewsletters(Array.isArray(newslettersData) ? newslettersData : []);
        setHackathons(Array.isArray(hackathonsData) ? hackathonsData : []);
        setHackathonsGallery(Array.isArray(hackathonsGalleryData) ? hackathonsGalleryData : []);
        setPlacements(Array.isArray(placementsData) ? placementsData : []);
        setPlacementsGalleryData(Array.isArray(placementsGalleryData) ? placementsGalleryData : []);
        setWorkshops(Array.isArray(workshopsData) ? workshopsData : []);
        setWorkshopsGalleryData(Array.isArray(workshopsGalleryData) ? workshopsGalleryData : []);
        setWorkshopsGallery(Array.isArray(workshopsGalleryDataFetch) ? workshopsGalleryDataFetch : []);
        setLecturersGalleryData(Array.isArray(lecturersGalleryDataFetch) ? lecturersGalleryDataFetch : []);
        setMeritScholarshipsGalleryData(Array.isArray(meritScholarshipsGalleryData) ? meritScholarshipsGalleryData : []);
        setEapcetToppersGalleryData(Array.isArray(eapcetToppersGalleryData) ? eapcetToppersGalleryData : []);
        setFacultyDevelopmentGalleryData(Array.isArray(facultyDevelopmentGalleryData) ? facultyDevelopmentGalleryData : []);
        setGateData(Array.isArray(gateDataFetch) ? gateDataFetch : []);
        setGateGalleryData(Array.isArray(gateGalleryDataFetch) ? gateGalleryDataFetch : []);
        setRollOfHonourData(Array.isArray(rollOfHonourDataFetch) ? rollOfHonourDataFetch : []);
        setRollOfHonourGalleryData(Array.isArray(rollOfHonourGalleryDataFetch) ? rollOfHonourGalleryDataFetch : []);

        // Store all data in cache for compatibility
        const facultyArray = Array.isArray(facultyData) ? facultyData : [];
        const cacheData = {
          faculty: facultyArray,
          technicalFaculty: facultyArray.filter((f: any) => f.faculty_type === 'technical'),
          nonTeachingFaculty: facultyArray.filter((f: any) => f.faculty_type === 'non_teaching'),
          studentAchievements: studentAchievementsData || [],
          syllabus: syllabusData || [],
          eresources: eresourcesData || [],
          departmentLibrary: departmentLibraryData && departmentLibraryData.length > 0 ? departmentLibraryData[0] : null,
          mous: mousData || [],
          industryPrograms: industryProgramsData || [],
          overview: overviewData && overviewData.length > 0 ? overviewData[0] : null,
          trainingActivities: trainingActivitiesData || [],
          bosMembers: bosMembersData || [],
          bosMinutes: bosMinutesData || [],
          handbooks: handbooksData || [],
          physicalFacilities: physicalFacilitiesData || [],
          laboratories: [],
          facultyDevelopment: facultyDevelopmentData || [],
          facultyAchievements: facultyAchievementsData || [],
          meritScholarships: meritScholarshipsData || [],
          extraCurricular: extraCurricularData || [],
          sahayaEvents: sahayaEventsData || [],
          scudActivities: scudActivitiesData || [],
          newsletters: newslettersData || [],
          hackathons: hackathonsData || [],
          placements: placementsData || [],
          workshops: workshopsData || [],
          hackathonsGallery: hackathonsGalleryData || [],
          technicalAssociationGallery: technicalAssociationGalleryData || [],
          extraCurricularGallery: extraCurricularGalleryData || [],
          trainingActivitiesGallery: trainingActivitiesGalleryData || [],
          meritScholarshipsGallery: meritScholarshipsGalleryData || [],
          placementsGallery: placementsGalleryData || [],
          workshopsGallery: workshopsGalleryData || [],
          facultyDevelopmentGallery: facultyDevelopmentGalleryData || [],
        };
      })
      .catch((error) => {
      });
  }, []);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Merit Scholarship/Academic Toppers', label: 'Merit Scholarship/Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Cpu className="w-4 h-4" /> },
    { id: 'e-Resources', label: 'e-Resources', icon: <Wifi className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },

  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  // Utility function to get description based on designation
  const getDesignationDescription = (designation: string): string => {
    const designationLower = designation.toLowerCase().trim();

    const descriptions: { [key: string]: string } = {
      'professor': 'A senior academic rank responsible for advanced research, teaching graduate and undergraduate courses, mentoring doctoral students, and providing academic leadership.',
      'associate professor': 'An experienced faculty member with significant research contributions, teaching expertise, and administrative responsibilities within the department.',
      'assistant professor': 'An entry-level tenure-track position focusing on teaching, research development, and service to the academic community.',
      'lecturer': 'A faculty member primarily focused on undergraduate teaching and curriculum delivery with excellent pedagogical skills.',
      'senior lecturer': 'An experienced educator with advanced teaching qualifications and expertise in curriculum design and student mentorship.',
      'principal lecturer': 'A senior teaching position with leadership responsibilities in curriculum development and educational innovation.',
      'adjunct professor': 'A part-time faculty member bringing industry experience and specialized expertise to enhance practical learning.',
      'visiting professor': 'A distinguished academic or industry professional temporarily contributing specialized knowledge and research expertise.',
      'emeritus professor': 'A retired senior faculty member who has made significant contributions and continues to provide guidance and wisdom.',
      'clinical professor': 'A faculty member with extensive industry experience who bridges academic theory with practical application.',
      'research professor': 'A faculty position focused primarily on conducting advanced research and supervising research students.',
      'teaching professor': 'A faculty member dedicated to excellence in teaching and educational leadership with focus on student learning outcomes.',
      'head of department': 'The administrative leader responsible for department strategy, faculty management, and academic program oversight.',
      'hod': 'The administrative leader responsible for department strategy, faculty management, and academic program oversight.',
      'dean': 'Senior academic administrator overseeing multiple departments and ensuring institutional academic excellence.',
      'director': 'Executive leader responsible for strategic planning and overall institutional or departmental management.',
      'chairperson': 'An academic leader responsible for departmental coordination and decision-making processes.',
      'coordinator': 'Faculty member responsible for specific program coordination, ensuring smooth operation and quality delivery.',
      'lab instructor': 'Specialized educator focused on hands-on laboratory instruction and practical skill development.',
      'lab assistant': 'Support staff member assisting in laboratory operations and student practical learning activities.',
      'technical assistant': 'Skilled professional providing technical support for laboratory equipment and experimental procedures.',
      'senior technical assistant': 'Experienced technical professional with advanced skills in laboratory management and equipment maintenance.',
      'technician': 'Skilled technical support staff maintaining laboratory equipment and assisting in practical demonstrations.',
      'senior technician': 'Experienced technical professional responsible for advanced laboratory operations and equipment management.',
      'lab technician': 'Technical support specialist ensuring proper functioning of laboratory equipment and safety protocols.',
      'research assistant': 'Graduate student or professional supporting faculty research projects and data collection activities.',
      'teaching assistant': 'Graduate student supporting faculty in teaching activities, grading, and student mentorship.',
      'guest lecturer': 'Industry expert or visiting academic providing specialized knowledge through targeted lectures and workshops.',
      'industry expert': 'Professional from industry sharing real-world experience and current industry trends with students.',
      'consultant': 'External expert providing specialized knowledge and guidance on specific subjects or projects.',
      'mentor': 'Experienced professional providing guidance and support for student career development and academic growth.'
    };

    // Try exact match first
    if (descriptions[designationLower]) {
      return descriptions[designationLower];
    }

    // Try partial matches for common variations
    if (designationLower.includes('professor')) {
      if (designationLower.includes('assistant')) return descriptions['assistant professor'];
      if (designationLower.includes('associate')) return descriptions['associate professor'];
      if (designationLower.includes('adjunct')) return descriptions['adjunct professor'];
      if (designationLower.includes('visiting')) return descriptions['visiting professor'];
      if (designationLower.includes('emeritus')) return descriptions['emeritus professor'];
      if (designationLower.includes('clinical')) return descriptions['clinical professor'];
      if (designationLower.includes('research')) return descriptions['research professor'];
      if (designationLower.includes('teaching')) return descriptions['teaching professor'];
      return descriptions['professor'];
    }

    if (designationLower.includes('lecturer')) {
      if (designationLower.includes('senior')) return descriptions['senior lecturer'];
      if (designationLower.includes('principal')) return descriptions['principal lecturer'];
      return descriptions['lecturer'];
    }

    if (designationLower.includes('head') || designationLower.includes('hod')) {
      return descriptions['head of department'];
    }

    if (designationLower.includes('technician')) {
      if (designationLower.includes('senior')) return descriptions['senior technician'];
      if (designationLower.includes('lab')) return descriptions['lab technician'];
      return descriptions['technician'];
    }

    if (designationLower.includes('assistant')) {
      if (designationLower.includes('technical')) return descriptions['technical assistant'];
      if (designationLower.includes('research')) return descriptions['research assistant'];
      if (designationLower.includes('teaching')) return descriptions['teaching assistant'];
      if (designationLower.includes('lab')) return descriptions['lab assistant'];
    }

    if (designationLower.includes('instructor')) {
      if (designationLower.includes('lab')) return descriptions['lab instructor'];
    }

    // Default description for unknown designations
    return `Academic or administrative position contributing to the department's educational mission and institutional excellence.`;
  };

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
              To evolve as a centre of academic and research excellence in the area of Computer Science and Engineering.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To utilize innovative learning methods for academic improvement.</li>
              <li>To encourage higher studies and research to meet the futuristic requirements of Computer Science and Engineering.</li>
              <li>To inculcate Ethics and Human values for developing students with good character.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">CSE	Graduates of this programme will be able to :</p>
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
                  <strong style={{ color: '#850209' }}>1. Engineering knowledge:</strong>
                  Apply the knowledge of Mathematics, Science, Engineering Fundamentals, and Concepts of Computer Science Engineering to the solution of complex Engineering problems. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>2. Problem Analysis:</strong>
                  Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of Mathematics, Natural Sciences, and Computer Science. [K4]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>3. Design/development of solutions:</strong>
                  Design solutions for complex engineering problems and design system components or processes that meet the specific needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental considerations. [K5]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>4. Conduct investigations of complex problems:</strong>
                  Use research-based knowledge and research methods, including the design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions. [K5]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>5. Modern tool usage:</strong>
                  Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling, to complex Engineering activities with an understanding of the limitations. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>6. The engineer and society:</strong>
                  Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues and the consequent responsibilities relevant to professional Engineering practice. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>7. Environment and sustainability:</strong>
                  Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate knowledge of, and the need for sustainable development. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>8. Ethics:</strong>
                  Apply ethical principles and commit to professional ethics and responsibilities and norms of Engineering practice. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>9. Individual and team work:</strong>
                  Function effectively as an individual and as a member or leader in diverse teams and in multidisciplinary settings. [K6]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>10. Communication:</strong>
                  Communicate effectively on complex Engineering activities with the Engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions. [K2]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>11. Project management and finance:</strong>
                  Demonstrate knowledge and understanding of Engineering and Management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments. [K6]
                </li>
                <li>
                  <strong style={{ color: '#850209' }}>12. Life-long learning:</strong>
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
                  href="/uploads/CO/cse/Course Outcomes -V23 Regulation.pdf"
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
                  href="/uploads/CO/cse/Course Outcomes -V20 Regulation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 inline-block px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-300 view-button"
                  style={{ fontSize: '16px' }}
                >
                  View PDF
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Course Outcomes (V18 Regulation)</span>
                <a
                  href="/uploads/CO/cse/Course Outcomes -V18 Regulation.pdf"
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
            <p className="text-gray-700 leading-relaxed text-justify">
              CSE Department came into inception from 2001 onwards with an intake of 60 seats in B.Tech. From 2006 onwards the intake was increased to 120 seats. From 2013 onwards the intake was increased to 180 seats. From 2015 onwards intake was increased to 240 seats. From 2024 onwards intake was increased to 300 seats.
              CSE Department is offering M.Tech (CS) program from 2020 onwards with a present intake of 12 seats.
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
                      <td className="border border-gray-300 px-4 py-3">B.Tech-Computer Science and Engineering</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">AP EAPCET</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">4 Years</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">300</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-3">M.Tech-Computer Science</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">GATE / PGCET</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">2 Years</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">12</td>
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
            'Awards',
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
                        {group.items.map((item, idx) => (
                          <li key={idx}>
                            {item.title}
                            {item.fileUrl && (
                              <>
                                {' - '}
                                <a
                                  href={item.fileUrl}
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

              {/* Roll of Honour Dropdown */}
              <details className="cst-dropdown">
                <summary>Roll of Honour</summary>
                <div className="cst-dropdown-content">
                  {rollOfHonourData.length > 0 ? (
                    <>
                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-[#B22222] to-[#8B1515] text-white">
                            <tr>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No.</th>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">Roll Number</th>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">Name</th>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">Batch</th>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">CGPA</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rollOfHonourData.map((item, idx) => (
                              <tr key={idx} className={`border-b border-gray-200 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-red-50' : 'bg-white'} hover:bg-red-100`}>
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{item.rollno}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.batch}</td>
                                <td className="px-6 py-4">{item.cgpa}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Gallery Images */}
                      {rollOfHonourGalleryData.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] mb-4">Gallery</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {rollOfHonourGalleryData.flatMap(item => {
                              if (item.gallery) {
                                const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                                return imageUrls.map((imageUrl: string, index: number) => ({
                                  url: imageUrl,
                                  year: item.academic_year,
                                  key: `${item.id}-${index}`
                                }));
                              }
                              return [];
                            }).map((img: any) => (
                              <img
                                key={img.key}
                                src={img.url}
                                alt={`Roll of Honour ${img.year} Image`}
                                className="w-full rounded-lg shadow-md object-cover"
                                style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
                  )}
                </div>
              </details>

              {/* GATE Dropdown */}
              <details className="cst-dropdown">
                <summary>GATE</summary>
                <div className="cst-dropdown-content">
                  {gateData.length > 0 ? (
                    <>
                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-[#B22222] to-[#8B1515] text-white">
                            <tr>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No.</th>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">Roll Number</th>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">Name</th>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">Score</th>
                              <th scope="col" className="px-6 py-3 border-b border-gray-200">Year</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gateData.map((item, idx) => (
                              <tr key={idx} className={`border-b border-gray-200 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-red-50' : 'bg-white'} hover:bg-red-100`}>
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{item.rollno}</td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.score}</td>
                                <td className="px-6 py-4">{item.year}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Gallery Images */}
                      {gateGalleryData.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-[#B22222] mb-4">Gallery</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {gateGalleryData.flatMap(item => {
                              if (item.gallery) {
                                const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                                return imageUrls.map((imageUrl: string, index: number) => ({
                                  url: imageUrl,
                                  year: item.academic_year,
                                  key: `${item.id}-${index}`
                                }));
                              }
                              return [];
                            }).map((img: any) => (
                              <img
                                key={img.key}
                                src={img.url}
                                alt={`GATE ${img.year} Image`}
                                className="w-full rounded-lg shadow-md object-cover"
                                style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      } ``
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
                              <td className="px-6 py-4 font-medium text-gray-900">{member.title || member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.qualification || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                            
                              {/* Role description column removed */}
                              <td className="px-6 py-4">
                                {(member.profile_url || member.profileUrl) ? (
                                  <a
                                    href={member.profile_url || member.profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-200 text-sm font-medium inline-block"
                                  >
                                    View Profile
                                  </a>
                                ) : (
                                  <span className="text-gray-400 text-sm">No Profile</span>
                                )}
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
                              <td className="px-6 py-4 font-medium text-gray-900">{member.title || member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                              {/* Role description removed */}
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
                              <td className="px-6 py-4 font-medium text-gray-900">{member.title || member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                              {/* Role description removed */}
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
                      // Convert date to dd-mm-yyyy format
                      const formatDate = (dateStr: string) => {
                        const dateOnly = dateStr?.split('T')[0];
                        if (!dateOnly) return dateStr;
                        const [year, month, day] = dateOnly.split('-');
                        return `${day}-${month}-${year}`;
                      };
                      const formattedDate = formatDate(minute.meeting_date);
                      return (
                        <div key={minute.id} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border">
                          <span className="text-gray-700">
                            Minutes of {minute.meeting_no} meeting of the Board of Studies, dated {formattedDate}
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
                  style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                  decoding="async"
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
                      <td className="py-3 px-4 border-b">{item.organization_name}</td>
                      <td className="py-3 px-4 border-b">{item.signed_date || item.from_date}</td>
                      <td className="py-3 px-4 border-b">{item.duration || item.to_date || 'N/A'}</td>
                      <td className="py-3 px-4 border-b">
                        {(item.document_url || item.file_url) ? (
                          <a
                            className="text-[#B22222] hover:underline"
                            href={item.document_url || item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >View</a>
                        ) : (
                          <span className="text-gray-400">No document</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="text-xl font-semibold text-[#B22222] mb-4">B. Interaction with the Industry</h3>
            <div className="space-y-3 max-w-4xl">
              {industryPrograms.length > 0 ? (
                industryPrograms.map((item) => (
                  <div key={item.id} className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedIndustryProgram(expandedIndustryProgram === item.id ? null : item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-left font-semibold text-gray-700">{item.title}</span>
                      <ChevronRight
                        size={20}
                        className={`text-[#B22222] transition-transform ${expandedIndustryProgram === item.id ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {expandedIndustryProgram === item.id && (
                      <div className="px-6 py-4 border-t border-gray-200 bg-white">
                        <a
                          href={item.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#B22222] hover:underline font-medium"
                        >
                          <Download size={16} />
                          View Document
                        </a>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No industry programs data available</p>
              )}
            </div>
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
                  <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }} className="space-y-8">
                    
                    {/* JG Lab */}
                    <div>
                      <h3 className="text-2xl font-bold text-center mb-4 text-[#B22222]">JG Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-400 border-collapse" style={{ maxWidth: 'max-content' }}>
                          <thead className="bg-gray-800 text-white">
                            <tr>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">S.No</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '90px' }}>Name of the Lab</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '300px' }}>Configuration</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b border-gray-400">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">1</td>
                              <td className="py-3 px-4 border-r border-gray-400 font-medium" rowSpan={2}>James Gosling Lab</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : Hp Pro Tower 280 G9</div>
                                <div>Processor : Intel® Core™ i5-13500 CPU @ 2.50 GHz</div>
                                <div>16.00GB RAM, 500GB SSD</div>
                                <div>System type : x64 – based Processor</div>
                                <div>Monitor : 21.5" LED Monitor</div>
                                <div>Keyboard : Multimedia Keyboard</div>
                                <div>Mouse : Optical Scroll Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">72</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">2</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : ASUS VIVO AIO V222 GAR_V333GA</div>
                                <div>Processor : Intel® Pentium®Silver J5040</div>
                                <div>8.00 GB RAM, 256.00 GB SSD</div>
                                <div>System type : x64 – based Processor</div>
                                <div>Monitor : 21.5" TFT Monitor</div>
                                <div>Keyboard : Multimedia Keyboard</div>
                                <div>Mouse : Optical Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* EF Codd Lab */}
                    <div>
                      <h3 className="text-2xl font-bold text-center mb-4 text-[#B22222]">EF Codd Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-400 border-collapse" style={{ maxWidth: 'max-content' }}>
                          <thead className="bg-gray-800 text-white">
                            <tr>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">S.No</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '90px' }}>Name of the Lab</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '300px' }}>Configuration</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b border-gray-400">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">1</td>
                              <td className="py-3 px-4 border-r border-gray-400 font-medium" rowSpan={2}>EF Codd Lab</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : HP Pro Tower 280 G9</div>
                                <div>Processor : Intel® Core™ i5-12400 CPU @ 2.50 GHz</div>
                                <div>16.00 GB RAM, 500.00 GB SSD</div>
                                <div>System type : x64 – based Processor</div>
                                <div>Monitor : 19.5" LED Monitor</div>
                                <div>Keyboard : Multimedia Keyboard</div>
                                <div>Mouse : Optical Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">68</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">2</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : Dell Optiplex 3020</div>
                                <div>Processor : Intel® Core™ i3-9100 CPU @ 3.60 GHz</div>
                                <div>8.00 GB RAM, 1.00 TB HDD</div>
                                <div>System type : x64 – based Processor</div>
                                <div>Monitor : 20.5" LED Monitor</div>
                                <div>Keyboard : Multimedia Keyboard</div>
                                <div>Mouse : Optical Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">06</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Linus Torvalds Lab */}
                    <div>
                      <h3 className="text-2xl font-bold text-center mb-4 text-[#B22222]">Linus Torvalds Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-400 border-collapse" style={{ maxWidth: 'max-content' }}>
                          <thead className="bg-gray-800 text-white">
                            <tr>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">S.No</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '90px' }}>Name of the Lab</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '300px' }}>Configuration</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">1</td>
                              <td className="py-3 px-4 border-r border-gray-400 font-medium" rowSpan={1}>Linus Torvalds Lab</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : HP Pro Tower 280 G9</div>
                                <div>Processor : Intel core TM i3-10100 CPU@3.64 GHZ</div>
                                <div>8.00 GB RAM, 500.00 GB SSD</div>
                                <div>System type : x64 – based Processor</div>
                                <div>Monitor: 19.5" LED Monitor</div>
                                <div>Keyboard: Multimedia Keyboard</div>
                                <div>Mouse: Optical Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* PGCP Lab */}
                    <div>
                      <h3 className="text-2xl font-bold text-center mb-4 text-[#B22222]">PGCP Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-400 border-collapse" style={{ maxWidth: 'max-content' }}>
                          <thead className="bg-gray-800 text-white">
                            <tr>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">S.No</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '90px' }}>Name of the Lab</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '300px' }}>Configuration</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b border-gray-400">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">1</td>
                              <td className="py-3 px-4 border-r border-gray-400 font-medium" rowSpan={2}>PGCP Lab</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : Acer Vertion Desktop System</div>
                                <div>Processor :Intel® Core™ 2 i3-8100 CPU @ 2.65 GHZ</div>
                                <div>8.00 GB RAM, 1.00 TB HDD</div>
                                <div>System type : x64 – based Processor</div>
                                <div>Monitor : 21.5" LED Monitor</div>
                                <div>Keyboard : Multimedia Keyboard</div>
                                <div>Mouse : Optical Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">71</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">2</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : Acer Vertion Desktop System</div>
                                <div>Processor :Intel® Core™ i5-7400 CPU @ 3.00 GHz</div>
                                <div>4.00 GB RAM, 1.00 TB HDD</div>
                                <div>System type : x64 – based Processor</div>
                                <div>Monitor : 19.5" LED Monitor</div>
                                <div>Keyboard : Multimedia Keyboard</div>
                                <div>Mouse : Optical Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* R&D Lab */}
                    <div>
                      <h3 className="text-2xl font-bold text-center mb-4 text-[#B22222]">R&D Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-400 border-collapse" style={{ maxWidth: 'max-content' }}>
                          <thead className="bg-gray-800 text-white">
                            <tr>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">S.No</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '90px' }}>Name of the Lab</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold" style={{ minWidth: '300px' }}>Configuration</th>
                              <th className="py-2 px-4 border border-gray-400 text-left font-semibold">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b border-gray-400">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">1</td>
                              <td className="py-3 px-4 border-r border-gray-400 font-medium" rowSpan={2}>R&D Lab</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : Acer Vertion Desktop System</div>
                                <div>Processor :Intel® Core™ i5-7400 CPU @ 3.00 GHz</div>
                                <div>4.00 GB RAM, 1.00 TB HDD</div>
                                <div>System type : x64 – based Processor</div>
                                <div>Monitor : 17.5" LED Monitor</div>
                                <div>Keyboard : Multimedia Keyboard</div>
                                <div>Mouse : Optical Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">03</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="py-3 px-4 border-r border-gray-400 text-center font-medium">2</td>
                              <td className="py-3 px-4 border-r border-gray-400 text-sm">
                                <div>Model : Dell 7D49KQR</div>
                                <div>Processor : Intel® Core™ 2 i5-7400 CPU @ 3.00 GHZ</div>
                                <div>4.00 GB RAM, 1.00 TB HDD</div>
                                <div>System type : x64-based processor</div>
                                <div>Monitor : 21.5" LED Monitor</div>
                                <div>Keyboard : Multimedia keyboard</div>
                                <div>Mouse : Optical Mouse</div>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">07</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    

                    {/* Research Lab */}
                    
                  </div>

                  {/* Laboratory Images Gallery */}
                  {(() => {
                    const labImages = physicalFacilities.filter(f => f.category && (f.category.toLowerCase() === 'laboratories' || f.category.toLowerCase() === 'labs'));
                    return labImages && labImages.length > 0 ? (
                      <div className="mt-8 pt-8 border-t border-gray-300">
                        <h3 className="text-2xl font-bold text-center mb-6 text-[#B22222]">Laboratory Images</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                          {labImages.map((item, idx) => {
                            // Handle image/gallery as comma-separated string or array
                            const images = typeof item.file_url === 'string' && item.file_url.includes(',')
                              ? item.file_url.split(',').filter((url: string) => url.trim())
                              : item.file_url ? [item.file_url] : [];
                            
                            return images.map((imageUrl: string, imgIdx: number) => (
                              <div key={`${idx}-${imgIdx}`} className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                <img
                                  src={imageUrl.trim()}
                                  alt={item.title || `Laboratory ${imgIdx + 1}`}
                                  className="w-full h-48 object-cover"
                                  style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3EImage not found%3C/text%3E%3C/svg%3E';
                                  }}
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
                    ) : null;
                  })()}
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

        // Group faculty development gallery by academic year
        const groupedByYear: Record<string, any[]> = {};
        facultyDevelopmentGalleryData.forEach(item => {
          if (!groupedByYear[item.academic_year]) {
            groupedByYear[item.academic_year] = [];
          }
          groupedByYear[item.academic_year].push(item);
        });

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg" style={{ borderWidth: 2 }}>
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>
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
                    ) : null}
                  </div>
                </details>
              ))}

              {/* Gallery Section */} 
              <details className="cst-dropdown">
                <summary>Gallery</summary>
                <div className="cst-dropdown-content">
                  {facultyDevelopmentGalleryData && facultyDevelopmentGalleryData.length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(
                        facultyDevelopmentGalleryData.reduce((acc: Record<string, any[]>, item: any) => {
                          if (!acc[item.academic_year]) {
                            acc[item.academic_year] = [];
                          }
                          acc[item.academic_year].push(item);
                          return acc;
                        }, {})
                      ).sort(([yearA], [yearB]) => yearB.localeCompare(yearA)).map(([year, items], index) => {
                        // Combine all images from entries with the same academic year
                        const allYearImages: string[] = [];
                        items.forEach(item => {
                          if (item.gallery) {
                            const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                            allYearImages.push(...imageUrls);
                          }
                        });

                        return (
                          <details key={year} open={index === 0} className="cst-dropdown ml-4">
                            <summary className="font-semibold text-[#B22222]">{year} Gallery</summary>
                            <div className="cst-dropdown-content">
                              {allYearImages.length > 0 ? (
                                <div className="grid grid-cols-2 gap-6 mt-4">
                                  {allYearImages.map((imageUrl: string, i: number) => (
                                    <img
                                      key={i}
                                      src={imageUrl}
                                      alt={`Faculty Development ${year} Image ${i + 1}`}
                                      className="w-full rounded-lg shadow-md object-cover"
                                      style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                                      loading="lazy"
                                      decoding="async"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-center py-4">No images available for {year}</p>
                              )}
                            </div>
                          </details>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No gallery images available yet</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      }
      case 'Faculty Achievements': {
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
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Merit Scholarships and Academic Toppers</h2>
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
                        {meritScholarshipsGalleryData
                          .flatMap(item => {
                            if (item.gallery) {
                              const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                              return imageUrls;
                            }
                            return [];
                          })
                          .map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Academic Toppers Image ${i + 1}`}
                              className="w-full h-auto rounded-lg shadow object-cover"
                              style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ))}
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
                        const eapcetImages = eapcetToppersGalleryData
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
                                  style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
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
        // Group SCUD activities by academic year
        const grouped: Record<string, any[]> = {};
        scudActivities.forEach(activity => {
          if (!grouped[activity.academic_year]) {
            grouped[activity.academic_year] = [];
          }
          grouped[activity.academic_year].push(activity);
        });

        // Sort years in descending order
        const sortedYears = Object.keys(grouped).sort().reverse();

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
            <p className="text-gray-700 mb-6 text-justify">
              Department Association - Society of Computers for Ultimate Diligence (SCUD) was started in the year 2002.
              SCUD team conducts regularly technical fests, workshops, and guest lectures for the benefit of students.
            </p>

            <div className="space-y-4">
              {/* SCUD Activities by Year */}
              {sortedYears.map((year, idx) => (
                <details key={year} open={idx === 0} className="cst-dropdown group">
                  <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                    <span>SCUD Activities</span>
                    <span className="group-open:rotate-180 transition-transform text-xl"></span>
                  </summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 my-4 space-y-2">
                      {grouped[year].map((activity) => (
                        <li key={activity.id}>
                          <span className="text-gray-800">{activity.title}</span>
                          {activity.file_url && (
                            <>
                              {' - '}
                              <a
                                href={activity.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline font-medium"
                              >
                                View More
                              </a>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}

              {/* Gallery Section */}
              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {technicalAssociationGallery.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {technicalAssociationGallery.flatMap(item => {
                        if (item.gallery) {
                          const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                          return imageUrls.map((imageUrl: string, index: number) => ({
                            url: imageUrl,
                            year: item.academic_year,
                            key: `${item.id}-${index}`
                          }));
                        }
                        return [];
                      }).map((img: any) => (
                        <img
                          key={img.key}
                          src={img.url}
                          alt={`Technical Association ${img.year} Image`}
                          className="w-full rounded-lg shadow-md object-cover"
                          style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                  )}
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
              {Object.entries(grouped).sort(([yearA], [yearB]) => yearB.localeCompare(yearA)).map(([year, items]: [string, any], index) => (
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
        const activityItems = extraCurricular.filter(a => a.type === 'activity');
        const sahaya = extraCurricular.find(a => a.type === 'sahaya');

        // Group extra-curricular gallery by academic year
        const groupedByYear: Record<string, any[]> = {};
        extraCurricularGallery.forEach(item => {
          if (!groupedByYear[item.academic_year]) {
            groupedByYear[item.academic_year] = [];
          }
          groupedByYear[item.academic_year].push(item);
        });

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Extra-Curricular Activities</summary>
                <div className="cst-dropdown-content">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#B22222] mb-3">Social Services</h3>
                      <p className="text-gray-700 text-justify mb-3">
                        We come across many heart-rending incidents and pathetic conditions of people in the society every day. We may not be in a position to give an immediate reaction though we want to. But the Computer Science and Technology Students of Sri Vasavi Engineering College extended their hands to help the needy. These helping activities are going on under the name of "SAHAYA" with the slogan 'The Helping Hands,' which aptly suits its purpose.
                      </p>
                      <p className="text-gray-700 text-justify mb-3">
                        SAHAYA is not a one-man army; rather, it is the brainchild of '07 batch students and is being carried on by the subsequent batch students, which sounds the real meaning of teamwork. SAHAYA, from its first day, was engaged in performing its activities. It was started with the event "CHEYUTHA" in the memory of SVEC Academic Director LATE Dr. B. Janardhan Reddy at ZP High school, Pedatadepalli by providing the fee for needy students and their necessities for study like compass boxes, books, etc., and thereafter, the journey of helping the needy continued uninterruptedly till date.
                      </p>
                      <p className="text-gray-700 text-justify mb-3">
                        Students may have many thoughts in mind, but the seeds of thought have sprouted to grow with great confidence by the magnanimous support of the Management. The Management of Sri Vasavi Engineering College always infuses confidence in the students by extending their heartfelt cooperation. "SAHAYA" is aptly serving its motto and contributing its little part to society. A drop may be small, but many drops together form an ocean. So, one hand may seem weak, but joining the hands together makes many changes to step into a brighter world.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#B22222] mb-2">Faculty Coordinator:</h4>
                      <p className="font-semibold text-gray-800">
                        Mr. P. Ramamohan Rao<br />
                        Assistant Professor
                      </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-lg font-bold text-[#B22222] mb-3">EC Activities</h4>
                      {ecActivities && ecActivities.length > 0 ? (
                        <div className="space-y-2">
                          {ecActivities.map((event: any, index: number) => {
                            const pdfUrl = event.url || event.file_url || event.pdf_url;
                            return (
                              <div key={event.id || index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div>
                                  <h5 className="font-semibold text-gray-800">{event.title || `EC Activity ${event.year}`}</h5>
                                  {event.year && <span className="text-sm text-gray-600">Year: {event.year}</span>}
                                </div>
                                {pdfUrl ? (
                                  <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium flex items-center gap-1"
                                  >
                                    <FileText className="w-4 h-4" />
                                    View Document
                                  </a>
                                ) : (
                                  <span className="text-gray-500 text-sm">No document available</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-600 text-center py-4">No EC Activities available at the moment.</p>
                      )}

                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="text-lg font-bold text-[#B22222] mb-3">Other Activities</h4>
                        <ul className="list-none space-y-2">
                          {activityItems.map(item => (
                            <li key={item.id}>
                              {item.title} -{' '}
                              <a
                                href={item.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View More
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </details>

              {/* Sahaya Events Links */}
              <details className="cst-dropdown">
                <summary>Sahaya Events</summary>
                <div className="cst-dropdown-content">
                  {sahayaEvents && sahayaEvents.length > 0 ? (
                    <div className="text-center space-y-2">
                      {Array.from(new Set(sahayaEvents.map((item: any) => String(item.year))))
                        .sort((a, b) => Number(b) - Number(a))
                        .map((year: string) => {
                          const yearEvent = sahayaEvents.find((item: any) => String(item.year) === year);
                          const pdfUrl = yearEvent?.url || yearEvent?.file_url || yearEvent?.pdf_url;
                          return (
                            <div key={year}>
                              {pdfUrl ? (
                                <a
                                  href={pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-medium text-lg cursor-pointer"
                                  title={`Open ${year} Sahaya events PDF`}
                                >
                                  {year}
                                </a>
                              ) : (
                                <span className="text-gray-600 font-medium text-lg" title="PDF not available">
                                  {year}
                                </span>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="text-gray-600 text-center py-4">
                      {sahaya && sahaya.sahaya_events ? (
                        <div className="space-y-2">
                          {sahaya.sahaya_events.map((ev: any, i: number) => (
                            <div key={i}>
                              {ev.url ? (
                                <a
                                  href={ev.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-medium text-lg cursor-pointer"
                                  title={`Open ${ev.year} Sahaya events PDF`}
                                >
                                  {ev.year}
                                </a>
                              ) : (
                                <span className="text-gray-600 font-medium text-lg" title="PDF not available">
                                  {ev.year}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        "No Sahaya events available currently."
                      )}
                    </div>
                  )}
                </div>
              </details>

              {/* Always show Image Gallery dropdown */}
              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {Object.keys(groupedByYear).length > 0 ? (
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      {Object.entries(groupedByYear).flatMap(([year, items]) => {
                        // Combine all images from entries with the same academic year
                        const allYearImages: string[] = [];
                        items.forEach(item => {
                          if (item.gallery) {
                            const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                            allYearImages.push(...imageUrls);
                          }
                        });
                        return allYearImages.map((imageUrl: string, i: number) => (
                          <img
                            key={`${year}-${i}`}
                            src={imageUrl}
                            alt={`Extra-Curricular ${year} Image ${i + 1}`}
                            className="w-full rounded-lg shadow-md object-cover"
                            style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ));
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-gray-600 py-8">
                      No gallery images available currently.
                    </div>
                  )}
                </div>
              </details>
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
                <p className="text-gray-700 leading-relaxed text-justify">
                  A 24-hour student hackathon is an event where students come together to collaborate, innovate, and
                  create projects within a short time frame. These hackathons have gained immense popularity in recent years,
                  and they hold significant importance for students for several reasons:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3 text-justify">
                  <li><span className="font-medium">Hands-on learning:</span> Hackathons provide students a unique opportunity to engage in hands-on learning by applying knowledge and skills to real-world problems and challenges.</li>
                  <li><span className="font-medium">Collaboration and teamwork:</span> Teams form with diverse backgrounds, enabling effective communication and leveraging strengths to tackle complex problems collectively.</li>
                  <li><span className="font-medium">Innovation and creativity:</span> Time constraints encourage novel solutions and exploration of unconventional ideas, leading to unique projects.</li>
                  <li><span className="font-medium">Networking and industry exposure:</span> Participants, mentors, and judges from industry provide excellent networking opportunities that can lead to internships, jobs, or collaborations.</li>
                  <li><span className="font-medium">Skill development:</span> Students learn new technologies, languages, and tools to complete their projects and broaden their skillsets.</li>
                  <li><span className="font-medium">Resume/portfolio enhancement:</span> Demonstrates passion, problem-solving, teamwork, and ability to work under pressure.</li>
                  <li><span className="font-medium">Recognition and awards:</span> Many hackathons offer prizes and recognition, boosting confidence and opening doors to further opportunities.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3 text-justify">
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
                            Gallery
                          </summary>
                          <div className="cst-dropdown-content">

                            Hackathon A.Y {year}
                            {images.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {images.map((img, i) => (
                                  <div key={i} className="flex flex-col items-center">
                                    <img
                                      src={img}
                                      alt={`Hackathon ${year} Image ${i + 1}`}
                                      className="w-[400px] h-[300px] rounded-lg shadow-lg object-cover"
                                      style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                                      loading="lazy"
                                      decoding="async"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                        (e.target as HTMLImageElement).className = 'w-[400px] h-[300px] rounded-lg shadow-lg bg-gray-200';
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

      case 'Training Activities': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Training Activities</h2>

            <div className="space-y-6">
              {/* Training Activities List */}
              <details open className="cst-dropdown">
                <summary>Training Activities</summary>
                <div className="cst-dropdown-content">
                  {trainingActivities && trainingActivities.length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {trainingActivities.map((activity, idx) => (
                        <li key={activity.id || idx}>
                          {activity.title}
                          {activity.file_url && (
                            <>
                              {' - '}
                              <a
                                href={activity.file_url}
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
                    <div className="text-gray-600 text-sm mt-2">No training activities available currently.</div>
                  )}
                </div>
              </details>

              {/* Gallery Section */}
              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {trainingActivitiesGallery.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {trainingActivitiesGallery.flatMap(item => {
                        if (item.gallery) {
                          const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                          return imageUrls.map((imageUrl: string, index: number) => ({
                            url: imageUrl,
                            year: item.academic_year,
                            key: `${item.id}-${index}`
                          }));
                        }
                        return [];
                      }).map((img: any) => (
                        <img
                          key={img.key}
                          src={img.url}
                          alt={`Training Activities ${img.year} Image`}
                          className="w-full rounded-lg shadow-md object-cover"
                          style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      }
      case 'Handbooks': {
        // Group handbooks by academic_year
        const grouped: Record<string, any[]> = {};
        handbooks.forEach(h => {
          if (!grouped[h.academic_year]) grouped[h.academic_year] = [];
          grouped[h.academic_year].push(h);
        });

        // Sort years in descending order
        const sortedYears = Object.keys(grouped).sort().reverse();

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic HandBooks</h2>
            <div className="space-y-4">
              {sortedYears.map((year, idx) => (
                <details key={year} open={idx === 0} className="cst-dropdown">
                  <summary>Academic year {year}</summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {grouped[year].map((item, itemIdx) => (
                        <li key={item.id}>

                          {item.title || 'Handbooks'}
                          {(item.file_url || item.fileUrl) && (
                            <>
                              {' - '}
                              <a
                                href={item.file_url || item.fileUrl}
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
      case 'Placements': {
        // Filter for cse department
        const csePlacements = placements.filter((p: any) => p.dept === 'cse');

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Placements Details</summary>
                <div className="cst-dropdown-content">
                  {csePlacements.length > 0 ? (
                    csePlacements.map((placement, idx) => (
                      <div key={placement.id} className="mb-4">
                        <p className="font-medium">
                          {placement.title || `Placements for Batch ${placement.batch}`}
                          {placement.file_url && (
                            <>
                              {' - '}
                              <a
                                href={placement.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View More
                              </a>
                            </>
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-sm">No placement details available.</p>
                  )}
                </div>
              </details>

              {/* Gallery Section */}
              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {placementsGalleryData.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {placementsGalleryData.flatMap(item => {
                        if (item.gallery) {
                          const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                          return imageUrls.map((imageUrl: string, index: number) => ({
                            url: imageUrl,
                            year: item.academic_year,
                            key: `${item.id}-${index}`
                          }));
                        }
                        return [];
                      }).map((img: any) => (
                        <img
                          key={img.key}
                          src={img.url}
                          alt={`Placements ${img.year} Image`}
                          className="w-full rounded-lg shadow-md object-cover"
                          style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      }
      case 'Workshops': {
        // Separate workshops by category
        const regularWorkshops = workshops.filter((w: any) => !w.category || w.category.toLowerCase() !== 'guest lecturers/seminars');
        const guestLecturers = workshops.filter((w: any) => w.category && w.category.toLowerCase() === 'guest lecturers/seminars');

        // Group workshops by academic year for each category
        const groupByYear = (items: any[]) => {
          return items.reduce((acc: any, item: any) => {
            const year = item.academic_year || 'Current Year';
            if (!acc[year]) {
              acc[year] = [];
            }
            acc[year].push(item);
            return acc;
          }, {});
        };

        const regularWorkshopsByYear = groupByYear(regularWorkshops);
        const guestLecturersByYear = groupByYear(guestLecturers);

        const sortedYears = Array.from(new Set([
          ...Object.keys(regularWorkshopsByYear),
          ...Object.keys(guestLecturersByYear)
        ])).sort().reverse();

        // Group workshops gallery by academic year
        const groupedWorkshopGalleryByYear: Record<string, any[]> = {};
        workshopsGalleryData.forEach(item => {
          if (!groupedWorkshopGalleryByYear[item.academic_year]) {
            groupedWorkshopGalleryByYear[item.academic_year] = [];
          }
          groupedWorkshopGalleryByYear[item.academic_year].push(item);
        });

        // Group lecturers gallery by academic year
        const groupedLecturersGalleryByYear: Record<string, any[]> = {};
        lecturersGalleryData.forEach(item => {
          if (!groupedLecturersGalleryByYear[item.academic_year]) {
            groupedLecturersGalleryByYear[item.academic_year] = [];
          }
          groupedLecturersGalleryByYear[item.academic_year].push(item);
        });

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops</h2>

            {/* Workshops Gallery Dropdown */}
            <details className="cst-dropdown group">
              <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                <span>Gallery</span>
                <span className="group-open:rotate-180 transition-transform text-xl"></span>
              </summary>
              <div className="cst-dropdown-content">
                {workshopsGalleryData.length > 0 ? (
                  (() => {
                    // Separate images by category
                    const workshopsImages = workshopsGalleryData
                      .filter((item: any) => item.category === 'workshops')
                      .flatMap((item: any) =>
                        item.gallery ? item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0) : []
                      );

                    const lecturesImages = workshopsGalleryData
                      .filter((item: any) => item.category === 'lectures')
                      .flatMap((item: any) =>
                        item.gallery ? item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0) : []
                      );

                    return (
                      <div className="p-6 space-y-6">
                        {/* Workshops Images */}
                        {workshopsImages.length > 0 && (
                          <div>
                            <h4 className="font-bold text-lg text-[#B22222] mb-4">Workshops</h4>
                            <div className="grid grid-cols-2 gap-4">
                              {workshopsImages.map((imageUrl: string, i: number) => (
                                <img
                                  key={`workshop-${i}`}
                                  src={imageUrl}
                                  alt={`Workshop Image ${i + 1}`}
                                  className="w-full rounded-lg shadow-md object-cover"
                                  style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Guest Lecturers Images */}
                        {lecturesImages.length > 0 && (
                          <div>
                            <h4 className="font-bold text-lg text-[#B22222] mb-4">Guest Lecturers/Seminars</h4>
                            <div className="grid grid-cols-2 gap-4">
                              {lecturesImages.map((imageUrl: string, i: number) => (
                                <img
                                  key={`lecture-${i}`}
                                  src={imageUrl}
                                  alt={`Guest Lecturer Image ${i + 1}`}
                                  className="w-full rounded-lg shadow-md object-cover"
                                  style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {workshopsImages.length === 0 && lecturesImages.length === 0 && (
                          <div className="text-center text-gray-600">No gallery images available yet</div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div className="p-6 text-center text-gray-600">No gallery images available yet</div>
                )}
              </div>
            </details>

            <div className="space-y-4">
              {/* Workshops by Year */}
              {sortedYears.map((year, idx) => {
                const yearWorkshops = regularWorkshopsByYear[year] || [];
                const yearGallery = groupedWorkshopGalleryByYear[year] || [];
                const galleryImages = yearGallery.flatMap((item: any) =>
                  item.gallery ? item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0) : []
                );

                return yearWorkshops.length > 0 ? (
                  <details key={`workshops-${year}`} open={idx === 0} className="cst-dropdown group">
                    <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                      <span>Workshops</span>
                      <span className="group-open:rotate-180 transition-transform text-xl"></span>
                    </summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-4 space-y-2">
                        {yearWorkshops.map((workshop: any) => (
                          <li key={workshop.id}>
                            <span className="text-gray-800">{workshop.title}</span>
                            {workshop.file_url && (
                              <>
                                {' - '}
                                <a
                                  href={workshop.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-medium"
                                >
                                  View More
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>

                      {/* Gallery Section */}
                      {galleryImages.length > 0 && (
                        <div className="border-t-2 border-[#B22222] mt-4 pt-4 px-0">
                          <h4 className="font-bold text-lg text-[#B22222] mb-4 px-6">Photo Gallery</h4>
                          <div className="grid grid-cols-2 gap-4 px-6 pb-6">
                            {galleryImages.map((imageUrl: string, i: number) => (
                              <img
                                key={i}
                                src={imageUrl}
                                alt={`Workshop ${year} Image ${i + 1}`}
                                className="w-full rounded-lg shadow-md object-cover"
                                style={{ height: '300px', width: '400px' }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </details>
                ) : null;
              })}

              {/* Guest Lecturers/Seminars by Year */}
              {Object.keys(guestLecturersByYear).length > 0 && (
                <>
                  <div className="border-t-2 border-gray-200 my-6"></div>
                  {sortedYears.map((year, idx) => {
                    const yearLecturers = guestLecturersByYear[year];
                    if (!yearLecturers) return null;

                    return (
                      <details key={`lecturers-${year}`} open={idx === 0} className="cst-dropdown group">
                        <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                          <span>Guest Lecturers/Seminars</span>
                          <span className="group-open:rotate-180 transition-transform text-xl"></span>
                        </summary>
                        <div className="cst-dropdown-content">
                          <ul className="list-disc pl-6 my-4 space-y-2">
                            {yearLecturers.map((lecturer: any) => (
                              <li key={lecturer.id}>
                                <span className="text-gray-800">{lecturer.title}</span>
                                {lecturer.file_url && (
                                  <>
                                    {' - '}
                                    <a
                                      href={lecturer.file_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#B22222] hover:underline font-medium"
                                    >
                                      View More
                                    </a>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>

                          {/* Gallery Section */}
                          {groupedLecturersGalleryByYear[year] && (
                            (() => {
                              const lecturerGalleryImages = groupedLecturersGalleryByYear[year].flatMap(item =>
                                item.gallery ? item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0) : []
                              );
                              return lecturerGalleryImages.length > 0 ? (
                                <div className="border-t-2 border-[#B22222] mt-4 pt-4 px-0">
                                  <h4 className="font-bold text-lg text-[#B22222] mb-4 px-6">Photo Gallery</h4>
                                  <div className="grid grid-cols-2 gap-4 px-6 pb-6">
                                    {lecturerGalleryImages.map((imageUrl: string, i: number) => (
                                      <img
                                        key={i}
                                        src={imageUrl}
                                        alt={`Guest Lecturer ${year} Image ${i + 1}`}
                                        className="w-full rounded-lg shadow-md object-cover"
                                        style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              ) : null;
                            })()
                          )}
                        </div>
                      </details>
                    );
                  })}
                </>
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
        title="CSE Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default CSEDepartment;
