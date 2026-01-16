
import React, { useState,useEffect } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
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
  organization_name: string;
  from_date: string;
  to_date: string;
  document_url?: string;
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

const CSTDepartment: React.FC = () => {
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


const [overview, setOverview] = useState<Overview | null>(null);

const [physicalFacilities, setPhysicalFacilities] = useState<PhysicalFacility[]>([]);
const [laboratories, setLaboratories] = useState<any[]>([]);
const [facultyDevelopment, setFacultyDevelopment] = useState<any[]>([]);
const [facultyAchievements, setFacultyAchievements] = useState<any[]>([]);
const [meritScholarships, setMeritScholarships] = useState<any[]>([]);
const [extraCurricular, setExtraCurricular] = useState<any[]>([]);
const [sahayaEvents, setSahayaEvents] = useState<any[]>([]);
const [scudActivities, setScudActivities] = useState<any[]>([]);
const [extraCurricularGallery, setExtraCurricularGallery] = useState<any[]>([]);
const [technicalAssociationGallery, setTechnicalAssociationGallery] = useState<any[]>([]);
const [newsletters, setNewsletters] = useState<any[]>([]);
const [hackathons, setHackathons] = useState<any[]>([]);
const [hackathonsGallery, setHackathonsGallery] = useState<any[]>([]);
const [trainingActivities, setTrainingActivities] = useState<any[]>([]);
const [handbooks, setHandbooks] = useState<any[]>([]);
const [placements, setPlacements] = useState<any[]>([]);
const[bosMembers,setBosMembers]=useState<BOSMember[]>([]);
const[bosMinutes,setBosMinutes]=useState<BOSMinute[]>([]);


   useEffect(() => {
    // Make all API calls in parallel using Promise.all()
    Promise.all([
      fetch('/api/public/departments/cst').then(res => res.json()).catch(() => ({})),
      fetch('/api/cai-hackathons-gallery').then(res => res.json()).catch(() => []),
      fetch('/api/cai-technical-association-gallery').then(res => res.json()).catch(() => []),
      fetch('/api/cai-extra-curricular-gallery').then(res => res.json()).catch(() => [])
    ])
    .then(([cstData, hackathonsGalleryData, technicalAssociationGalleryData, extraCurricularGalleryData]) => {
      const data = cstData.data || cstData;
      
      // Debug faculty data specifically
      
      setFaculty(data.faculty || []);
      setTechnicalFaculty(data.technicalStaff || []);
      setNonTeachingFaculty(data.nonTeachingStaff || []);
      setStudentAchievements(data.studentAchievements || []);
      setSyllabus(data.syllabusDocuments || []);
      setEResources(data.eresources || []);
      setDepartmentLibrary(data.departmentLibrary);
      setMous(data.mous || []);
      setIndustryPrograms(data.industryPrograms || []);
      setOverview(data.overview);
      setTrainingActivities(data.trainingActivities || []);
      setBosMembers(data.boardOfStudies || []);
      setBosMinutes(data.boardOfStudiesMeetingMinutes || []);
      setHandbooks(data.handbooks || []);
      setPhysicalFacilities(data.physicalFacilities || []);
      setLaboratories(data.labs || []);
      setFacultyDevelopment(data.facultyDevelopment || []);
      setFacultyAchievements(data.facultyAchievements || []);
      setMeritScholarships(data.meritScholarships || []);
      setExtraCurricular(data.extraCurricular || []);
      setSahayaEvents(data.sahayaEvents || []);
      setScudActivities(data.scudActivities || []);
      setNewsletters(data.newsletters || []);
      setHackathons(data.hackathons || []);
      setPlacements(data.placements || []);
      
      // Set gallery data
      setHackathonsGallery(Array.isArray(hackathonsGalleryData) ? hackathonsGalleryData : []);
      
      setTechnicalAssociationGallery(Array.isArray(technicalAssociationGalleryData) ? technicalAssociationGalleryData : []);
      
      setExtraCurricularGallery(Array.isArray(extraCurricularGalleryData) ? extraCurricularGalleryData : []);

      // Store all data in cache
      const cacheData = {
        faculty: data.faculty || [],
        technicalFaculty: data.technicalStaff || [],
        nonTeachingFaculty: data.nonTeachingStaff || [],
        studentAchievements: data.studentAchievements || [],
        syllabus: data.syllabusDocuments || [],
        eresources: data.eresources || [],
        departmentLibrary: data.departmentLibrary,
        mous: data.mous || [],
        industryPrograms: data.industryPrograms || [],
        overview: data.overview,
        trainingActivities: data.trainingActivities || [],
        bosMembers: data.boardOfStudies || [],
        bosMinutes: data.boardOfStudiesMeetingMinutes || [],
        handbooks: data.handbooks || [],
        physicalFacilities: data.physicalFacilities || [],
        laboratories: data.labs || [],
        facultyDevelopment: data.facultyDevelopment || [],
        facultyAchievements: data.facultyAchievements || [],
        meritScholarships: data.meritScholarships || [],
        extraCurricular: data.extraCurricular || [],
        sahayaEvents: data.sahayaEvents || [],
        scudActivities: data.scudActivities || [],
        newsletters: data.newsletters || [],
        hackathons: data.hackathons || [],
        placements: data.placements || [],
        hackathonsGallery: Array.isArray(hackathonsGalleryData) ? hackathonsGalleryData : [],
        technicalAssociationGallery: Array.isArray(technicalAssociationGalleryData) ? technicalAssociationGalleryData : [],
        extraCurricularGallery: Array.isArray(extraCurricularGalleryData) ? extraCurricularGalleryData : [],
      };
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
                            View More
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
                    {item.title}
                    {' '}
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B22222] hover:underline"
                    >
                     - View
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
                                  href={member.profile_url || `${member.profileUrl}`}
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
                <td className="py-3 px-4 border-b">{item.organization_name}</td>
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
        {grouped.map((group, index) => (
          <details key={group.category} open={index === 0} className="cst-dropdown">
            <summary>{group.category}</summary>
            <div className="cst-dropdown-content">
            {group.category === 'Laboratories' ? (
              <div>
                {group.items.map(item => (
                  <div key={item.id} className="mb-8">
                    {item.description && <p className="text-gray-700 mb-2">{item.description}</p>}
                    {item.lab_details && item.lab_details.length > 0 && item.lab_details.map((lab, i) => (
                      <div key={i} className="mb-6">
                        <h3 className="text-xl font-semibold my-2">{lab.name}</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="py-3 px-4 border-b text-left">Configuration</th>
                                {lab.usage && <th className="py-3 px-4 border-b text-left">Usage</th>}
                                {lab.location && <th className="py-3 px-4 border-b text-left">Location</th>}
                                <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-3 px-4 border-b">{lab.configuration}</td>
                                {lab.usage && <td className="py-3 px-4 border-b">{lab.usage}</td>}
                                {lab.location && <td className="py-3 px-4 border-b">{lab.location}</td>}
                                <td className="py-3 px-4 border-b">{lab.systems}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
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
            )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}      case 'Faculty Development Programs': {
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
      <h3 className="text-xl font-semibold text-center mb-4">Merit Scholarships / Academic Toppers</h3>
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
              alt={`Merit Scholarship Image ${i + 1}`}
              className="w-full h-auto rounded-lg shadow object-cover"
            />
          ))
        }
      </div>
    </div>
  );
}

    
       case 'Technical Association': {
  // Group technical association gallery by academic year
  const groupedByYear: Record<string, any[]> = {};
  technicalAssociationGallery.forEach(item => {
    if (!groupedByYear[item.academic_year]) {
      groupedByYear[item.academic_year] = [];
    }
    groupedByYear[item.academic_year].push(item);
  });

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
      <p className="text-gray-700 mb-6 text-justify">
        Department Association - Society of Computers for Ultimate Diligence (SCUD) was started in the year 2002.
        SCUD team conducts regularly technical fests, workshops, and guest lectures for the benefit of students.
      </p>
      <div className="space-y-4">
        {Object.entries(groupedByYear).map(([year, items], index) => {
          // Combine all images from entries with the same academic year
          const allYearImages: string[] = [];
          items.forEach(item => {
            if (item.gallery_image_url) {
              const imageUrls = item.gallery_image_url.split(',').map((url: string) => url.trim());
              allYearImages.push(...imageUrls);
            }
          });

          return (
            <details key={year} open={index === 0} className="cst-dropdown">
              <summary>{year} Gallery</summary>
              <div className="cst-dropdown-content">
                {allYearImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {allYearImages.map((imageUrl: string, i: number) => (
                      <img
                        key={i}
                        src={imageUrl}
                        alt={`Technical Association ${year} Image ${i + 1}`}
                        className="w-full h-60 rounded-lg shadow-md object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No images available</p>
                )}
              </div>
            </details>
          );
        })}
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
                {items.map(item => (
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
            <ul className="my-2 list-none text-center space-y-2">
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
        </details>

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
                    {sahaya.sahaya_events.map((ev, i) => (
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

        {Object.keys(groupedByYear).length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-center mb-6 text-[#B22222]">Activities Gallery</h3>
            <div className="space-y-4">
              {Object.entries(groupedByYear).map(([year, items], index) => {
                // Combine all images from entries with the same academic year
                const allYearImages: string[] = [];
                items.forEach(item => {
                  if (item.gallery) {
                    const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                    allYearImages.push(...imageUrls);
                  }
                });

                return (
                  <details key={year} className="cst-dropdown" open={index === 0}>
                    <summary>Extra-Curricular A.Y {year}</summary>
                    <div className="cst-dropdown-content">
                      {allYearImages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {allYearImages.map((imageUrl: string, i: number) => (
                            <div key={i} className="flex flex-col items-center">
                              <img
                                src={imageUrl}
                                alt={`Extra-Curricular ${year} Image ${i + 1}`}
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
                );
              })}
            </div>
          </div>
        )}
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
                    {activity.gallery && Array.isArray(activity.gallery) && activity.gallery.map((img, i) => (
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
  // Filter for CST department
  const cstPlacements = placements.filter(p => p.dept === 'cst');
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
      <div className="space-y-6">
        {cstPlacements.map((placement, idx) => (
          <details key={placement.id} open={idx === 0} className="cst-dropdown">
            <summary>{placement.title || `Placements for Batch ${placement.batch}`}</summary>
            <div className="cst-dropdown-content">
              <ul className="list-none my-2 text-center">
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
                    {placement.gallery && Array.isArray(placement.gallery) && placement.gallery.map((img, i) => (
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
      </div>
    </div>
  );
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
        title="Computer Science & Technology Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default CSTDepartment;
