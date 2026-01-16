
import React, { useState, useEffect } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';

// Type definitions for ect department data
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

  if (designationLower.includes('professor') && designationLower.includes('head')) return 1;
  if (designationLower === 'professor') return 2;
  if (designationLower.includes('associate professor')) return 3;
  if (designationLower.includes('sr') && designationLower.includes('asst')) return 4;
  if (designationLower.includes('sr') && designationLower.includes('assistant')) return 4;
  if (designationLower.includes('asst. professor')) return 5;
  if (designationLower.includes('assistant professor')) return 5;
  if (designationLower.includes('lecturer')) return 6;

  return 999; // Unknown designations go to end
};

// Sort faculty by designation priority (ascending) then by date_of_joining (ascending)
const sortFacultyByDesignationAndDOJ = (facultyList: Faculty[]): Faculty[] => {
  return [...facultyList].sort((a, b) => {
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
  subject?: string;
  type: string;
  fileUrl: string;
  file_url?: string;
}

interface EResource {
  id: number;
  regulation: string;
  semester: string;
  subject_name: string;
  file_url: string;
  display_order?: number;
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

const ECTDepartment: React.FC = () => {
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
  const [extraCurricular, setExtraCurricular] = useState<any[]>([]);
  const [sahayaEvents, setSahayaEvents] = useState<any[]>([]);
  const [ecActivities, setEcActivities] = useState<any[]>([]);
  const [scudActivities, setScudActivities] = useState<any[]>([]);
  const [technicalAssociation, setTechnicalAssociation] = useState<any[]>([]);
  const [extraCurricularGallery, setExtraCurricularGallery] = useState<any[]>([]);
  const [technicalAssociationGallery, setTechnicalAssociationGallery] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [hackathonsGallery, setHackathonsGallery] = useState<any[]>([]);
  const [trainingActivities, setTrainingActivities] = useState<any[]>([]);
  const [trainingActivitiesGallery, setTrainingActivitiesGallery] = useState<any[]>([]);
  const [extraCurricularGalleryData, setExtraCurricularGalleryData] = useState<any[]>([]);
  const [meritScholarshipsGalleryData, setMeritScholarshipsGalleryData] = useState<any[]>([]);
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
  const [labsGalleryData, setLabsGalleryData] = useState<any[]>([]);
  const [classroomsGalleryData, setClassroomsGalleryData] = useState<any[]>([]);


  useEffect(() => {
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    
    // Make all API calls in parallel using Promise.all()
    Promise.all([
      fetch(`/api/faculty?branchName=ECT${cacheBuster}`).then(res => {
        return res.json();
      }).catch(err => {  return []; }),
      fetch(`/api/ect/ect-student-achievements${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-syllabus${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-eresources${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-department-library${cacheBuster}`).then(res => res.json()).catch(() => null),
      fetch(`/api/ect/ect-mous${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-industry-programs${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-department-overview${cacheBuster}`).then(res => {
        return res.json();
      }).catch(err => {  return null; }),
      fetch(`/api/ect/ect-training-activities${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-bos-members${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-bos-minutes${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-handbooks${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-physical-facilities${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-faculty-development${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-faculty-achievements${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-merit-scholarships${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-extra-curricular${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-sahaya-events${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-scud-activities${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-technical-association${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-newsletters${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-hackathons${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-placements${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-workshops${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-gate${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-roll-of-honour${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-hackathons-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-technical-association-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-training-activities-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-extra-curricular-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-merit-scholarships-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-placements-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-workshops-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-faculty-development-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-gate-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-roll-of-honour-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-workshops-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-lecturers-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-labs-gallery${cacheBuster}`).then(res => res.json()).catch(() => []),
      fetch(`/api/ect/ect-classrooms-gallery${cacheBuster}`).then(res => res.json()).catch(() => [])


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
        facultyDevelopmentData,
        facultyAchievementsData,
        meritScholarshipsData,
        extraCurricularData,
        sahayaEventsData,
        scudActivitiesData,
        technicalAssociationData,
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
        placementsGalleryData,
        workshopsGalleryData,
        facultyDevelopmentGalleryData,
        gateGalleryDataFetch,
        rollOfHonourGalleryDataFetch,
        workshopsGalleryDataFetch,
        lecturersGalleryDataFetch,
        labsGalleryData,
        classroomsGalleryData
      ]) => {

        // Separate teaching, technical, and non-teaching faculty from the unified response
        // The API now includes faculty_type field: 'teaching', 'technical', or 'non_teaching'
        const teachingFaculty: Faculty[] = [];
        const technicalFacultySeparated: Faculty[] = [];
        const nonTeachingFaculty: NonTeachingMember[] = [];


        if (Array.isArray(facultyData)) {
          facultyData.forEach((f: any) => {
            // Map profileUrl to profile_url for consistency
            const facultyMember = {
              ...f,
              profile_url: f.profileUrl || f.profile_url,
              faculty_type: f.faculty_type || 'teaching'
            };

            if (f.faculty_type === 'technical') {
              technicalFacultySeparated.push(facultyMember);
            } else if (f.faculty_type === 'non_teaching') {
              nonTeachingFaculty.push(facultyMember);
            } else {
              // Default to teaching faculty if no type specified
              teachingFaculty.push(facultyMember);
            }
          });
        }


        // Set data with sorting
        setFaculty(sortFacultyByDesignationAndDOJ(teachingFaculty));
        setTechnicalFaculty(sortFacultyByDesignationAndDOJ(technicalFacultySeparated));
        setNonTeachingFaculty(nonTeachingFaculty);
        setStudentAchievements(Array.isArray(studentAchievementsData) ? studentAchievementsData : []);
        setSyllabus(Array.isArray(syllabusData) ? syllabusData : []);
        setEResources(Array.isArray(eresourcesData) ? eresourcesData : []);
        setDepartmentLibrary(departmentLibraryData && departmentLibraryData.length > 0 ? departmentLibraryData[0] : null);
        setMous(Array.isArray(mousData) ? mousData : []);
        setIndustryPrograms(Array.isArray(industryProgramsData) ? industryProgramsData : []);
        // Handle overview data - could be array or object
        if (Array.isArray(overviewData) && overviewData.length > 0) {
          setOverview(overviewData[0]);
        } else if (overviewData && typeof overviewData === 'object' && overviewData.hod_name) {
          setOverview(overviewData);
        } else {
          setOverview(null);
        }
        setTrainingActivities(Array.isArray(trainingActivitiesData) ? trainingActivitiesData : []);
        setTrainingActivitiesGallery(Array.isArray(trainingActivitiesGalleryData) ? trainingActivitiesGalleryData : []);
        setBosMembers(Array.isArray(bosMembersData) ? bosMembersData : []);
        setBosMinutes(Array.isArray(bosMinutesData) ? bosMinutesData : []);
        setHandbooks(Array.isArray(handbooksData) ? handbooksData : []);

        // Parse JSON fields in physical facilities data
        const parsedPhysicalFacilities = Array.isArray(physicalFacilitiesData)
          ? physicalFacilitiesData.map(item => ({
            ...item,
            lab_details: typeof item.lab_details === 'string' ? JSON.parse(item.lab_details || '[]') : item.lab_details || [],
            gallery: typeof item.gallery === 'string' ? JSON.parse(item.gallery || '[]') : item.gallery || []
          }))
          : [];
        setPhysicalFacilities(parsedPhysicalFacilities);

        setLaboratories([]);
        setFacultyDevelopment(Array.isArray(facultyDevelopmentData) ? facultyDevelopmentData : []);
        setFacultyAchievements(Array.isArray(facultyAchievementsData) ? facultyAchievementsData : []);
        setMeritScholarships(Array.isArray(meritScholarshipsData) ? meritScholarshipsData : []);
        setExtraCurricular(Array.isArray(extraCurricularData) ? extraCurricularData : []);
        setSahayaEvents(Array.isArray(sahayaEventsData) ? sahayaEventsData : []);
        // Filter EC Activities from sahaya events
        const ecActivitiesData = Array.isArray(sahayaEventsData)
          ? sahayaEventsData.filter(event => event.category === 'ecactivities')
          : [];
        setEcActivities(ecActivitiesData);
        setScudActivities(Array.isArray(scudActivitiesData) ? scudActivitiesData : []);
        setTechnicalAssociation(Array.isArray(technicalAssociationData) ? technicalAssociationData : []);
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
        setFacultyDevelopmentGalleryData(Array.isArray(facultyDevelopmentGalleryData) ? facultyDevelopmentGalleryData : []);
        setGateData(Array.isArray(gateDataFetch) ? gateDataFetch : []);
        setGateGalleryData(Array.isArray(gateGalleryDataFetch) ? gateGalleryDataFetch : []);
        setRollOfHonourData(Array.isArray(rollOfHonourDataFetch) ? rollOfHonourDataFetch : []);
        setRollOfHonourGalleryData(Array.isArray(rollOfHonourGalleryDataFetch) ? rollOfHonourGalleryDataFetch : []);
        setLabsGalleryData(Array.isArray(labsGalleryData) ? labsGalleryData : []);
        setClassroomsGalleryData(Array.isArray(classroomsGalleryData) ? classroomsGalleryData : []);

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
            <p className="text-gray-700 mb-4">	ect	Graduates of this programme will be able to :</p>
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
                  href="/uploads/CO/ect/Course Outcomes -V23 Regulation.pdf"
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
                  href="/uploads/CO/ect/Course Outcomes -V20 Regulation.pdf"
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
                  href="/uploads/CO/ect/Course Outcomes -V18 Regulation.pdf"
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
              ECT Department came into inception from 2019 onwards with an intake of 60 seats in B.Tech.
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
                      <td className="border border-gray-300 px-4 py-3">B.Tech-Electronics and Communication Technology</td>
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
                        {group.items.map((item, idx) => {
                          const resourceLink = item.fileUrl || (item as any).file_url;
                          return (
                            <li key={idx}>
                              {item.title}
                              {resourceLink && (
                                <>
                                  {' - '}
                                  <a
                                    href={resourceLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline inline-flex items-center gap-1"
                                  >
                                    <FileText className="w-4 h-4" />
                                    View
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
        const types = Array.from(new Set(syllabus.map(s => (s as any).type || (s as any).program || 'Other')));
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            <div className="space-y-6">
              {types.map((type, index) => (
                <details key={type} open={index === 0} className="cst-dropdown">
                  <summary>{type}</summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 my-2">
                      {syllabus.filter(s => ((s as any).type || (s as any).program || 'Other') === type).map((item, idx) => (
                        <li key={idx}>
                          {item.subject || item.title || (item as any).name || 'Syllabus Document'}
                          {(item.file_url || item.fileUrl || (item as any).url) && (
                            <>
                              {' '}
                              <a
                                href={item.file_url || item.fileUrl || (item as any).url}
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
                              <td className="py-3 px-4 border-b">{(item as any).subject}</td>
                              <td className="py-3 px-4 border-b">
                                <a href={(item as any).ppt_url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">Download</a>
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
            <div className="space-y-6">
              {grouped.length > 0 ? (
                grouped.filter(g => g.category !== 'Laboratories').map((group, index) => (
                  <details open key={`${group.category}-${index}`} className="cst-dropdown">
                    <summary>{group.category}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {group.items.map(item => (
                          <li key={item.id}>
                            {item.title}
                            {item.description && <span className="text-gray-600"> - {item.description}</span>}
                            {item.file_url && (
                              <>
                                {' '}
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
                ))
              ) : null}
              {/* Laboratories Section - Always Show */}
              <details  className="cst-dropdown">
                <summary>Laboratories</summary>
                <div className="cst-dropdown-content">
                  <div>
                    <h3 className="text-xl font-semibold text-[#B22222] mb-4">Major Equipment Available</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li className="text-gray-700">Xilinx University CPLD Boards, Spartan-3E FPGA Boards - <a href="#" className="text-[#B22222] hover:underline">View</a></li>
                      <li className="text-gray-700">Embedded System ATMEL ARM 9 Boards, HAWK Boards (ARM 9 & OMAP L138)</li>
                      <li className="text-gray-700">Analog & Digital Communication Kits</li>
                      <li className="text-gray-700">Digital Storage Oscilloscopes GDS 1102U</li>
                      <li className="text-gray-700">Microwave Benches (X-Band)</li>
                      <li className="text-gray-700">Optical Communication Trainer Kits</li>
                      <li className="text-gray-700">Texas Instrumentation DSP Starter Kits (DSK) TMS320C6713</li>
                      <li className="text-gray-700">MicroController Trainer and Development Boards</li>
                      <li className="text-gray-700">Universal IC Tester</li>
                      <li className="text-gray-700">Antenna Trainer Kit</li>
                      <li className="text-gray-700">RIGO Spectrum Analyzer With Tracking Generator</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[#B22222] mb-4">Major Software Available</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li className="text-gray-700">Mentor Graphics Higher Education Programme 1 (HEP 1) @ 75 User</li>
                      <li className="text-gray-700">MATLAB R2018b version with Different Tool Boxes @ 100 User</li>
                      <li className="text-gray-700">Labtek Spice Simulation Software @ Unlimited User</li>
                      <li className="text-gray-700">Code Composer Studio Software 3.0 @ Unlimited User</li>
                      <li className="text-gray-700">Xilinx System Edition Software 12.2i @ 25 User</li>
                      <li className="text-gray-700">HFSS Antenna tool @ 1 User research version and 5 Users Academic version</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[#B22222] mb-4">Laboratory Facilities</h3>
                    {grouped.length > 0 && grouped.find(g => g.category === 'Laboratories') && grouped.find(g => g.category === 'Laboratories')!.items.length > 0 ? (
                      grouped.find(g => g.category === 'Laboratories')!.items.map((item: any) => {
                        const hasValidLabDetails = Array.isArray(item.lab_details) &&
                          item.lab_details.length > 0 &&
                          typeof item.lab_details[0] === 'object';

                        return (
                          <div key={item.id} className="mb-8">
                            {hasValidLabDetails ? (
                              <div className="overflow-x-auto mb-6">
                                <table className="min-w-full bg-white border-2 border-[#B22222]">
                                  <thead className="bg-[#333333] text-white">
                                    <tr>
                                      <th className="py-3 px-4 border-b border-[#B22222] text-left font-bold">S.No</th>
                                      <th className="py-3 px-4 border-b border-[#B22222] text-left font-bold">Name of the Lab</th>
                                      <th className="py-3 px-4 border-b border-[#B22222] text-left font-bold">Configuration</th>
                                      <th className="py-3 px-4 border-b border-[#B22222] text-left font-bold">No. of Systems</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.lab_details.map((lab: any, idx: number) => (
                                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="py-3 px-4 border-b border-gray-300 font-medium text-center">{idx + 1}</td>
                                        <td className="py-3 px-4 border-b border-gray-300 font-medium whitespace-nowrap">{lab.name || 'Laboratory'}</td>
                                        <td className="py-3 px-4 border-b border-gray-300">
                                          <div className="space-y-0.5 text-sm">
                                            {lab.model && <div><span className="font-semibold">Model :</span> {lab.model}</div>}
                                            {lab.processor && <div><span className="font-semibold">Processor :</span> {lab.processor}</div>}
                                            {lab.ram && <div><span className="font-semibold">{lab.ram}</span></div>}
                                            {lab.storage && <div><span className="font-semibold">{lab.storage}</span></div>}
                                            {lab.system_type && <div><span className="font-semibold">System type :</span> {lab.system_type}</div>}
                                            {lab.monitor && <div><span className="font-semibold">Monitor :</span> {lab.monitor}</div>}
                                            {lab.keyboard && <div><span className="font-semibold">Keyboard :</span> {lab.keyboard}</div>}
                                            {lab.mouse && <div><span className="font-semibold">Mouse :</span> {lab.mouse}</div>}
                                            {!lab.model && lab.configuration && <div>{lab.configuration}</div>}
                                          </div>
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-300 text-center font-medium text-lg">{lab.systems || lab.no_of_systems || '02'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : null}

                            {item.file_url && (
                              <a
                                href={item.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline mt-3 inline-block"
                              >
                                View Document
                              </a>
                            )}
                          </div>
                        );
                      })
                    ) : null}

                    {/* Laboratory Facilities Images Gallery */}
                    <div className="mt-6">
                      
                      {labsGalleryData && labsGalleryData.length > 0 ? (
                        (() => {
                          // Collect all images from labs gallery
                          const allLabImages: string[] = [];
                          labsGalleryData.forEach(item => {
                            if (item.gallery) {
                              const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                              allLabImages.push(...imageUrls);
                            }
                          });

                          return allLabImages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {allLabImages.map((imageUrl: string, i: number) => (
                                <img
                                  key={i}
                                  src={imageUrl}
                                  alt={`Lab Facility Image ${i + 1}`}
                                  className="w-full rounded-lg shadow-md object-cover"
                                  style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             
                            </div>
                          );
                        })()
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </details>

              {/* Classrooms Section */}
              <details className="cst-dropdown">
                <summary>Classrooms Images</summary>
                <div className="cst-dropdown-content">
                  {classroomsGalleryData && classroomsGalleryData.length > 0 ? (
                    (() => {
                      // Collect all images from classrooms gallery
                      const allClassroomImages: string[] = [];
                      classroomsGalleryData.forEach(item => {
                        if (item.gallery) {
                          const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                          allClassroomImages.push(...imageUrls);
                        }
                      });

                      return allClassroomImages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {allClassroomImages.map((imageUrl: string, i: number) => (
                            <img
                              key={i}
                              src={imageUrl}
                              alt={`Classroom Image ${i + 1}`}
                              className="w-full rounded-lg shadow-md object-cover"
                              style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No classroom images available</p>
                      );
                    })()
                  ) : (
                    <p className="text-gray-500 text-center py-4">No classroom images available</p>
                  )}
                </div>
              </details>

              {/* Other Facilities */}
              
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
                    (() => {
                      // Collect all images from all entries
                      const allImages: string[] = [];
                      facultyDevelopmentGalleryData.forEach(item => {
                        if (item.gallery) {
                          const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                          allImages.push(...imageUrls);
                        }
                      });

                      return allImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6 mt-4">
                          {allImages.map((imageUrl: string, i: number) => (
                            <img
                              key={i}
                              src={imageUrl}
                              alt={`Faculty Development Image ${i + 1}`}
                              className="w-[400px] h-[300px] rounded-lg shadow-lg object-cover"
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
                        <p className="text-gray-500 text-center py-4">No gallery images available</p>
                      );
                    })()
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
              {/* Table Dropdown */}
              <details open className="cst-dropdown">
                <summary>Merit Scholarships / Academic Toppers</summary>
                <div className="cst-dropdown-content">
                  {meritScholarships.length > 0 ? (
                    <div className="overflow-x-auto">
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
                  ) : (
                    <p className="text-gray-600 text-center py-4">No merit scholarships data available.</p>
                  )}
                </div>
              </details>

              {/* Separate Gallery Dropdown */}
              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {meritScholarshipsGalleryData.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {meritScholarshipsGalleryData.flatMap(item => {
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
                          alt={`Merit Scholarship ${img.year} Image`}
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


      case 'Technical Association': {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
            <p className="text-gray-700 mb-6 text-justify">
              Department Association - Society of Computers for Ultimate Diligence (SCUD) was started in the year 2002.
              SCUD team conducts regularly technical fests, workshops, and guest lectures for the benefit of students.
            </p>

            <div className="space-y-4">
              {/* Technical Association Activities */}
              {technicalAssociation && technicalAssociation.length > 0 ? (
                technicalAssociation.map((activity) => (
                  <details key={activity.id} className="cst-dropdown group">
                    <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                      <span>{activity.title}</span>
                      <span className="group-open:rotate-180 transition-transform text-xl"></span>
                    </summary>
                    <div className="cst-dropdown-content p-6">
                      {activity.description && (
                        <div className="text-gray-800 mb-4">
                          <strong>Description:</strong> {activity.description}
                        </div>
                      )}
                      {activity.content && (
                        <div className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                          {activity.content}
                        </div>
                      )}
                      {activity.date_created && (
                        <div className="text-sm text-gray-600 mb-4">
                          <strong>Date:</strong> {new Date(activity.date_created).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      )}
                          {activity.image_url && (
                        <div className="my-4">
                          <img
                            src={activity.image_url}
                            alt={activity.title}
                            className="rounded-lg shadow-md w-full max-w-2xl"
                            style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                      <div className="flex gap-4 mt-4">
                        {activity.file_url && (
                          <a
                            href={activity.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#B22222] hover:bg-[#a01a1a] text-white rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            View Document
                          </a>
                        )}
                        {activity.link && (
                          <a
                            href={activity.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            External Link
                          </a>
                        )}
                      </div>
                    </div>
                  </details>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No technical association activities available.
                </div>
              )}

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
        // Group by category
        const extracurricularActivities = extraCurricular.filter((a: any) => a.category === 'Extracurricular Activities');
        const sportsMeet = extraCurricular.filter((a: any) => a.category === 'Departmental Sports Meet');
        const culturalMeet = extraCurricular.filter((a: any) => a.category === 'Departmental Cultural Meet');
        const industrialVisit = extraCurricular.filter((a: any) => a.category === 'Industrial Visit');
        const bloodDonation = extraCurricular.filter((a: any) => a.category === 'Blood Donation Camp');
        const yuvaActivities = extraCurricular.filter((a: any) => a.category === 'YUVA');

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
              {/* Extracurricular Activities */}
              {extracurricularActivities.length > 0 && (
                <details open className="cst-dropdown">
                  <summary>Extracurricular Activities</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-4">
                      {extracurricularActivities.map((activity: any) => (
                        <div key={activity.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                            {activity.description && <p className="text-sm text-gray-600 mt-1">{activity.description}</p>}
                            {activity.year && <span className="text-xs text-gray-500">Year: {activity.year}</span>}
                          </div>
                          {activity.url && (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline font-medium flex items-center gap-1 ml-4"
                            >
                              <FileText className="w-4 h-4" />
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* Departmental Sports Meet */}
              {sportsMeet.length > 0 && (
                <details className="cst-dropdown">
                  <summary>Departmental Sports Meet</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-4">
                      {sportsMeet.map((activity: any) => (
                        <div key={activity.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                            {activity.description && <p className="text-sm text-gray-600 mt-1">{activity.description}</p>}
                            {activity.year && <span className="text-xs text-gray-500">Year: {activity.year}</span>}
                          </div>
                          {activity.url && (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline font-medium flex items-center gap-1 ml-4"
                            >
                              <FileText className="w-4 h-4" />
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* Departmental Cultural Meet */}
              {culturalMeet.length > 0 && (
                <details className="cst-dropdown">
                  <summary>Departmental Cultural Meet</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-4">
                      {culturalMeet.map((activity: any) => (
                        <div key={activity.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                            {activity.description && <p className="text-sm text-gray-600 mt-1">{activity.description}</p>}
                            {activity.year && <span className="text-xs text-gray-500">Year: {activity.year}</span>}
                          </div>
                          {activity.url && (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline font-medium flex items-center gap-1 ml-4"
                            >
                              <FileText className="w-4 h-4" />
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* Industrial Visit */}
              {industrialVisit.length > 0 && (
                <details className="cst-dropdown">
                  <summary>Industrial Visit</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-4">
                      {industrialVisit.map((activity: any) => (
                        <div key={activity.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                            {activity.description && <p className="text-sm text-gray-600 mt-1">{activity.description}</p>}
                            {activity.year && <span className="text-xs text-gray-500">Year: {activity.year}</span>}
                          </div>
                          {activity.url && (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline font-medium flex items-center gap-1 ml-4"
                            >
                              <FileText className="w-4 h-4" />
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* Blood Donation Camp */}
              {bloodDonation.length > 0 && (
                <details className="cst-dropdown">
                  <summary>Blood Donation Camp</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-4">
                      {bloodDonation.map((activity: any) => (
                        <div key={activity.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                            {activity.description && <p className="text-sm text-gray-600 mt-1">{activity.description}</p>}
                            {activity.year && <span className="text-xs text-gray-500">Year: {activity.year}</span>}
                          </div>
                          {activity.url && (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline font-medium flex items-center gap-1 ml-4"
                            >
                              <FileText className="w-4 h-4" />
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* YUVA Activities */}
              {yuvaActivities.length > 0 && (
                <details className="cst-dropdown">
                  <summary>YUVA Activities</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-4">
                      {yuvaActivities.map((activity: any) => (
                        <div key={activity.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800">{activity.title}</h5>
                            {activity.description && <p className="text-sm text-gray-600 mt-1">{activity.description}</p>}
                            {activity.year && <span className="text-xs text-gray-500">Year: {activity.year}</span>}
                          </div>
                          {activity.url && (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline font-medium flex items-center gap-1 ml-4"
                            >
                              <FileText className="w-4 h-4" />
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}

              {/* Gallery Section */}
              <details className="cst-dropdown">
                <summary>Extra-Curricular Gallery</summary>
                <div className="cst-dropdown-content">
                  {Object.keys(groupedByYear).length > 0 ? (
                    <div className="text-center space-y-2">
                      {Object.keys(groupedByYear)
                        .sort((a, b) => Number(b) - Number(a))
                        .map((year: string) => {
                          const yearEvent = groupedByYear[year][0];
                          const pdfUrl = yearEvent?.url || yearEvent?.file_url || yearEvent?.pdf_url;
                          return (
                            <div key={year}>
                              {pdfUrl ? (
                                <a
                                  href={pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-medium text-lg cursor-pointer"
                                  title={`Open ${year} Gallery PDF`}
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
                      <p>No gallery items available at the moment.</p>
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

              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {hackathonsGallery.length > 0 ? (
                    (() => {
                      // Collect all images from all gallery entries
                      const allImages: string[] = [];
                      hackathonsGallery.forEach((galleryItem) => {
                        const images = galleryItem.gallery
                          ? galleryItem.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0)
                          : [];
                        allImages.push(...images);
                      });

                      return allImages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          {allImages.map((img, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <img
                                src={img}
                                alt={`Hackathon Image ${i + 1}`}
                                className="w-[400px] h-[300px] rounded-lg shadow-lg object-cover"
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
                          No gallery images available
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center text-gray-600 py-8">
                      No gallery data available
                    </div>
                  )}
                </div>
              </details>
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

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Placements Details</summary>
                <div className="cst-dropdown-content">
                  {placements.length > 0 ? (
                    placements.map((placement, idx) => (
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
                          style={{ height: '300px', width: '400px' }}
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
                <span className="group-open:rotate-180 transition-transform text-xl">▼</span>
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
                      <span className="group-open:rotate-180 transition-transform text-xl">▼</span>
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
                          <span className="group-open:rotate-180 transition-transform text-xl">▼</span>
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
        title="ECT Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default ECTDepartment;
