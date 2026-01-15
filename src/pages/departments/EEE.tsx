
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, X } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';
import { usePublicDepartmentData, type Faculty, type Staff, type BoardOfStudiesMeetingMinute, type SyllabusDocument } from '../../hooks/usePublicDepartmentData';
import { ResearchCenter } from '@/components/ResearchCenter';
import { StudentAchievements } from '@/components/StudentAchievements';

// Interface for faculty data
interface FacultyMember {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  specialization?: string;
  experience_years?: number;
  email?: string;
  profile_url?: string;
  bio?: string;
  research_interests?: string;
  publications?: string;
  status: string;
}

interface NonTeachingStaff {
  id: number;
  name: string;
  designation: string;
}

interface BoardOfStudiesMember {
  id: number;
  member_name: string;
  designation: string;
  organization: string;
  role: string;
  year: string;
  contact_email?: string;
  image_url?: string;
}

interface Overview {
  hod_image_url: string;
  hod_name: string;
  hod_qualification: string;
  hod_email: string;
  description: string;
}

const EEEDepartment: React.FC = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  // Department Overview state
  const [overview, setOverview] = useState<Overview | null>(null);

  // BOS Meeting Minutes state
  const [bosMinutes, setBosMinutes] = useState<any[]>([]);
  const [bosMinutesLoading, setBosMinutesLoading] = useState(true);

  // Syllabus state
  const [syllabus, setSyllabus] = useState<any[]>([]);
  const [syllabusLoading, setSyllabusLoading] = useState(true);

  // Faculty Innovations state
  const [facultyInnovations, setFacultyInnovations] = useState<any[]>([]);
  const [facultyInnovationsLoading, setFacultyInnovationsLoading] = useState(true);

  // Technical Handbooks state
  const [technicalHandbooks, setTechnicalHandbooks] = useState<any[]>([]);
  const [technicalHandbooksLoading, setTechnicalHandbooksLoading] = useState(true);

  // Research Center data states
  const [researchVerticles, setResearchVerticles] = useState<any[]>([]);
  const [researchSupervisors, setResearchSupervisors] = useState<any[]>([]);
  const [journalPublications, setJournalPublications] = useState<any[]>([]);
  const [conferencePublications, setConferencePublications] = useState<any[]>([]);
  const [patents, setPatents] = useState<any[]>([]);
  const [bookPublications, setBookPublications] = useState<any[]>([]);
  const [careerAdvancements, setCareerAdvancements] = useState<any[]>([]);
  const [interactionOutsideWorld, setInteractionOutsideWorld] = useState<any[]>([]);
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);

  // Use the public department data hook
  const { data: departmentData, loading, error } = usePublicDepartmentData('eee');

  // Fetch Department Overview
  useEffect(() => {
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    fetch(`/api/eee/eee-department-overview${cacheBuster}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setOverview(Array.isArray(data) && data.length > 0 ? data[0] : data || null);
      })
      .catch(err => {
        console.error('Error fetching department overview:', err);
        setOverview(null);
      });
  }, []);

  // Fetch BOS Meeting Minutes
  useEffect(() => {
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    fetch(`/api/eee/eee-bos-minutes${cacheBuster}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setBosMinutes(Array.isArray(data) ? data : []);
        setBosMinutesLoading(false);
      })
      .catch(err => {
        console.error('Error fetching BOS minutes:', err);
        setBosMinutes([]);
        setBosMinutesLoading(false);
      });
  }, []);
useEffect(() => {
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    fetch(`/api/eee/eee-bos-members${cacheBuster}`)
      .then(res => res.json())
      .then(data => {
        setBosMinutes(Array.isArray(data) ? data : []);
        setBosMinutesLoading(false);
      })
      .catch(err => {
        console.error('Error fetching BOS minutes:', err);
        setBosMinutes([]);
        setBosMinutesLoading(false);
      });
  }, []);

  // Fetch Syllabus
  useEffect(() => {
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    fetch(`/api/eee/eee-syllabus${cacheBuster}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setSyllabus(Array.isArray(data) ? data : []);
        setSyllabusLoading(false);
      })
      .catch(err => {
        console.error('Error fetching syllabus:', err);
        setSyllabus([]);
        setSyllabusLoading(false);
      });
  }, []);

  // Fetch Faculty Innovations
  useEffect(() => {
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    fetch(`/api/eee/eee-faculty-innovations${cacheBuster}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setFacultyInnovations(Array.isArray(data) ? data : []);
        setFacultyInnovationsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching faculty innovations:', err);
        setFacultyInnovations([]);
        setFacultyInnovationsLoading(false);
      });
  }, []);

  // Fetch Technical Handbooks
  useEffect(() => {
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    fetch(`/api/eee/eee-technical-handbooks${cacheBuster}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setTechnicalHandbooks(Array.isArray(data) ? data : []);
        setTechnicalHandbooksLoading(false);
      })
      .catch(err => {
        console.error('Error fetching technical handbooks:', err);
        setTechnicalHandbooks([]);
        setTechnicalHandbooksLoading(false);
      });
  }, []);

  // Fetch Newsletters from eee_newsletters table
  const [newslettersLoading, setNewslettersLoading] = useState(false);
  const [eeeNewsletters, setEeeNewsletters] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setNewslettersLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const response = await fetch(`/api/eee/eee-newsletters${cacheBuster}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('📰 EEE Newsletters fetched:', data);
        setEeeNewsletters(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching EEE newsletters:', err);
        setEeeNewsletters([]);
      } finally {
        setNewslettersLoading(false);
      }
    };
    
    fetchNewsletters();
  }, []);

  // Fetch Product Development Gallery from eee_hackathons_gallery with category 'pd'
  const [pdGalleryLoading, setPdGalleryLoading] = useState(false);
  const [pdGalleryImages, setPdGalleryImages] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchPdGallery = async () => {
      try {
        setPdGalleryLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const response = await fetch(`/api/eee/eee-pd-gallery${cacheBuster}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('🎨 Product Development Gallery fetched:', data);
        setPdGalleryImages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching Product Development gallery:', err);
        setPdGalleryImages([]);
      } finally {
        setPdGalleryLoading(false);
      }
    };
    
    fetchPdGallery();
  }, []);

  // Fetch Green Initiatives Gallery from eee_hackathons_gallery with category 'Green Initiatives'
  const [greenInitGalleryLoading, setGreenInitGalleryLoading] = useState(false);
  const [greenInitGalleryImages, setGreenInitGalleryImages] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchGreenInitGallery = async () => {
      try {
        setGreenInitGalleryLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const response = await fetch(`/api/eee/eee-green-initiatives-gallery${cacheBuster}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('🌱 Green Initiatives Gallery fetched:', data);
        setGreenInitGalleryImages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching Green Initiatives gallery:', err);
        setGreenInitGalleryImages([]);
      } finally {
        setGreenInitGalleryLoading(false);
      }
    };
    
    fetchGreenInitGallery();
  }, []);

  // Fetch Technical Handbooks from eee_technical_handbooks with category 'Academic HandBooks'
  const [techHandbooksLoading, setTechHandbooksLoading] = useState(false);
  const [techHandbooks, setTechHandbooks] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchTechHandbooks = async () => {
      try {
        setTechHandbooksLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const response = await fetch(`/api/eee/eee-technical-handbooks${cacheBuster}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('📚 Technical Handbooks fetched:', data);
        setTechHandbooks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching technical handbooks:', err);
        setTechHandbooks([]);
      } finally {
        setTechHandbooksLoading(false);
      }
    };
    
    fetchTechHandbooks();
  }, []);

  // Fetch Green Initiative Gallery from eee_hackathons_gallery with category 'gi'
  const [giGalleryLoading, setGiGalleryLoading] = useState(false);
  const [giGalleryImages, setGiGalleryImages] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchGiGallery = async () => {
      try {
        setGiGalleryLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const response = await fetch(`/api/eee/eee-green-initiative-gallery${cacheBuster}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('🌿 Green Initiative Gallery (gi) fetched:', data);
        setGiGalleryImages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching Green Initiative gallery:', err);
        setGiGalleryImages([]);
      } finally {
        setGiGalleryLoading(false);
      }
    };
    
    fetchGiGallery();
  }, []);

  // Fetch Social Service Gallery from eee_hackathons_gallery with category 'ss'
  const [ssGalleryLoading, setSsGalleryLoading] = useState(false);
  const [ssGalleryImages, setSsGalleryImages] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchSsGallery = async () => {
      try {
        setSsGalleryLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const response = await fetch(`/api/eee/eee-ss-gallery${cacheBuster}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('🤝 Social Service Gallery (ss) fetched:', data);
        setSsGalleryImages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching Social Service gallery:', err);
        setSsGalleryImages([]);
      } finally {
        setSsGalleryLoading(false);
      }
    };
    
    fetchSsGallery();
  }, []);

  // Fetch Anniversary Gallery from eee_hackathons_gallery with category 'ac'
  const [acGalleryLoading, setAcGalleryLoading] = useState(false);
  const [acGalleryImages, setAcGalleryImages] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchAcGallery = async () => {
      try {
        setAcGalleryLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const response = await fetch(`/api/eee/eee-ac-gallery${cacheBuster}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('🎉 Anniversary Gallery (ac) fetched:', data);
        setAcGalleryImages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching Anniversary gallery:', err);
        setAcGalleryImages([]);
      } finally {
        setAcGalleryLoading(false);
      }
    };
    
    fetchAcGallery();
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [sidebarOpen]);

  // Extract data from the hook
  const faculty = departmentData?.faculty || [];
  const nonTeachingFaculty = departmentData?.nonTeachingStaff || [];
  const technicalStaff = departmentData?.technicalStaff || [];
  const boardOfStudiesMembers = departmentData?.boardOfStudies || [];
  const boardOfStudiesMeetingMinutes = departmentData?.boardOfStudiesMeetingMinutes || [];
  const laboratoryGallery = departmentData?.laboratoryGallery || [];
  const departmentLibrary = departmentData?.departmentLibrary || null;
  const facultyAchievementsData = departmentData?.facultyAchievementsData || [];
  const placementsData = departmentData?.placementsData || [];
  const technicalAssociationData = departmentData?.technicalAssociationData || [];
  const technicalAssociationGallery = departmentData?.technicalAssociationGallery || [];
  const researchCenters = departmentData?.researchCenters || [];
  const productDevelopment = departmentData?.productDevelopment || [];
  const departmentalActivities = departmentData?.departmentalActivities || [];
  const greenInitiatives = departmentData?.greenInitiatives || [];
  const technicalMagazines = departmentData?.technicalMagazines || [];
  const newslettersData = departmentData?.newsletters || [];
  const productDevelopmentGallery = departmentData?.productDevelopmentGallery || [];

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Laboratories', label: 'Laboratories', icon: <Microscope className="w-4 h-4" /> },
    { id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Faculty Innovations in T & L', label: 'Faculty Innovations in T & L', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Research Center', label: 'Research Center', icon: <Search className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Zap className="w-4 h-4" /> },
    { id: 'Technical Magazines, Handbooks and Course Materials', label: 'Technical Magazines, Handbooks and Course Materials', icon: <FileText className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Product Development', label: 'Product Development', icon: <Activity className="w-4 h-4" /> },
    { id: 'Departmental Activities', label: 'Departmental Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Green Initiative', label: 'Green Initiative', icon: <Shield className="w-4 h-4" /> },
    //{ id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Department of Electrical & Electronics Engineering was established in 1981 with an intake of 40 seats. Later the intake was increased to 60 seats. From 2008-09 onwards the intake was increased to 120 seats. From 2021-22 onwards the intake was increased to 180 seats.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The laboratories are equipped with modern equipment, devices and software relevant to courses. Students are encouraged to participate in several co-curricular and extracurricular activities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The EEE Department has MoUs with various industries and organizations to enhance practical exposure among students. Our students participate in industrial training programs during their vacations which helps them to get exposure to the industry scenario.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Department has been recognized as Research Centre by JNTUK, Kakinada in 2019.
            </p>

            {/* <h4 className="text-xl font-bold text-[#B22222] mb-4">Courses Offered</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 mb-4 border border-gray-200 rounded-lg">
                <thead className="text-xs bg-gray-50 uppercase text-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No</th>
                    <th scope="col" className="px-6 py-3 border-b border-gray-200">Name of the Course</th>
                    <th scope="col" className="px-6 py-3 border-b border-gray-200">Eligibility Criteria</th>
                    <th scope="col" className="px-6 py-3 border-b border-gray-200">Duration</th>
                    <th scope="col" className="px-6 py-3 border-b border-gray-200">Intake</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">B.Tech - Electrical & Electronics Engineering</td>
                    <td className="px-6 py-4">AP EAPCET</td>
                    <td className="px-6 py-4">4 Years</td>
                    <td className="px-6 py-4">180</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        );
      case 'Vision':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To produce quality engineers with the knowledge and skills in Electrical and Electronics Engineering to meet the challenges of the industry and society.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To impart quality technical education in EEE with state-of-art laboratories and committed faculty.</li>
              <li>To provide hands-on experience on modern tools and technologies.</li>
              <li>To inculcate professional ethics and leadership qualities.</li>
              <li>To establish industry-institute interaction to enhance the employability skills.</li>
              <li>To motivate towards higher education and research.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">After 3-5 years of graduation, the graduates will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Apply the knowledge of Electrical and Electronics Engineering to solve the real time problems in core and allied fields.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Work in multidisciplinary environment with professional ethics and good communication skills.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Pursue higher education and research in the fields of Electrical and Electronics Engineering.</p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-4">After the completion of B.Tech. in Electrical and Electronics Engineering, the graduates will be able to:</p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO1: Engineering Knowledge</h4>
                <p className="text-gray-700">Apply knowledge of mathematics, science, engineering fundamentals and Electrical and Electronics Engineering to the solution of complex engineering problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, research literature and analyze complex engineering problems reaching substantiated conclusions using principles of mathematics, natural sciences and engineering sciences.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Design/Development of Solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and design system components, processes to meet the specifications with consideration for public health, safety and environmental considerations.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO4: Conduct Investigations of Complex Problems</h4>
                <p className="text-gray-700">Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO5: Modern Tool Usage</h4>
                <p className="text-gray-700">Create, select and apply appropriate techniques, resources and modern engineering tools including prediction and modeling to complex engineering activities with an understanding of the limitations.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO6: The Engineer and Society</h4>
                <p className="text-gray-700">Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO7: Environment and Sustainability</h4>
                <p className="text-gray-700">Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO8: Ethics</h4>
                <p className="text-gray-700">Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO9: Individual and Team Work</h4>
                <p className="text-gray-700">Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO10: Communication</h4>
                <p className="text-gray-700">Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO11: Project Management and Finance</h4>
                <p className="text-gray-700">Demonstrate knowledge and understanding of the engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO12: Life-Long Learning</h4>
                <p className="text-gray-700">Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <p className="text-gray-700 mb-4">After the completion of B.Tech. in Electrical and Electronics Engineering, the graduates will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 1</h4>
                <p className="text-gray-700">Apply the knowledge of Power Systems, Power Electronics, and Control Systems to solve the problems related to Electrical and Electronics Engineering and to develop the prototypes.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 2</h4>
                <p className="text-gray-700">Use modern tools and computing techniques to analyze and design electrical systems.</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the Electrical and Electronics Engineering department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/eee/COs.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 items-center"
              >
                <Download className="w-4 h-4 mr-2" /> Download Course Outcomes
              </a>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Qualified, experienced and dedicated faculty</li>
              <li>Well-equipped laboratories with modern equipment</li>
              <li>Recognized Research Center by JNTUK, Kakinada</li>
              <li>Departmental library with more than 1500 volumes</li>
              <li>Active Technical Association (LEE - League of Electrical Engineers)</li>
              <li>MoUs with various industries and organizations</li>
              <li>Regular industrial visits for practical exposure</li>
              <li>Focus on hands-on training and project-based learning</li>
              <li>Regular guest lectures by industry experts</li>
              <li>Research focus in Power Systems, Power Electronics, and Control Systems</li>
              <li>500 KWp Solar Power Plant in the campus as a green initiative</li>
              <li>Product development initiatives like Solar Rider, Lee Eco Bike, etc.</li>
              <li>Regular conduct of national conferences and workshops</li>
              <li>Good placement record in core and IT companies</li>
            </ul>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
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
                              className={`w-full p-4 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white shadow-lg shadow-[#B22222]/50'
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gray-700/50'
                                  }`}>
                                  <span className="text-lg font-bold">{index + 1}</span>
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="font-semibold">{section === 'SalientFeatures' ? 'Salient Features' : section}</div>
                                  {isActive && <div className="text-xs text-white/70 mt-1">Currently viewing</div>}
                                </div>
                                {isActive && (
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Settings Button (Mobile Only) */}
              <button
                onClick={() => setSettingsPanelOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-[#B22222] to-[#8B0000] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="Open Department Navigation"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Tab Content */}
              <div className="mt-8">
                {renderDeptTabContent()}
              </div>
            </div>
          </div>
        );

      case 'Handbooks':
        // Group handbooks by academic year
        const handbookYears = Array.from(new Set(techHandbooks.map((item: any) => item.academic_year || 'Other')))
          .sort((a, b) => (b as string).localeCompare(a as string));
        
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Academic HandBooks</h2>
            
            {techHandbooksLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222] mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading handbooks...</p>
              </div>
            ) : techHandbooks.length > 0 ? (
              <div className="space-y-6">
                {handbookYears.map((year, yearIndex) => {
                  const yearHandbooks = techHandbooks.filter((item: any) => item.academic_year === year);
                  const semesters = Array.from(new Set(yearHandbooks.map((item: any) => item.semester || 'Other')))
                    .sort((a, b) => {
                      const aSem = parseInt(a as string) || 0;
                      const bSem = parseInt(b as string) || 0;
                      return aSem - bSem;
                    });
                  
                  return semesters.map((semester, semIndex) => {
                    const semesterHandbooks = yearHandbooks.filter((item: any) => item.semester === semester);
                    const isOpen = yearIndex === 0 && semIndex === 0;
                    
                    return (
                      <details key={`${year}-${semester}`} className="cst-dropdown" open={isOpen}>
                        <summary>Academic year {year}: {semester === 'I' || semester === '1' ? 'I-Sem' : 'II-Sem'} HandBooks</summary>
                        <div className="cst-dropdown-content">
                          <ul className="space-y-2 list-none">
                            {semesterHandbooks.map((item: any, idx: number) => (
                              <li key={item.id || idx}>
                                {item.title} - {item.regulation ? `${item.regulation} Regulation` : ''} {item.file_url ? (
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline transition-colors"
                                  >
                                    View
                                  </a>
                                ) : (
                                  <span className="text-gray-400">No file available</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    );
                  });
                })}
              </div>
            ) : (
              <div className="space-y-6">
                <details className="cst-dropdown" open>
                  <summary>Academic year 2023-24: I-Sem HandBooks</summary>
                  <div className="cst-dropdown-content">
                    <ul className="space-y-2 list-none">
                      <li>V-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/V%20SEM%20Handbook_V20%20Regulation_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline transition-colors">View</a></li>
                      <li>VII-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VII%20SEM%20Handbook_V20%20Regulation_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline transition-colors">View</a></li>
                    </ul>
                  </div>
                </details>
                <details className="cst-dropdown">
                  <summary>Academic year 2022-23: II-Sem Handbooks</summary>
                  <div className="cst-dropdown-content">
                    <ul className="space-y-2 list-none">
                      <li>IV-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/IV%20Sem%20V20%20Regulation%20Handbook_CSE.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline transition-colors">View</a></li>
                      <li>VI-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VI%20Sem%20V20%20Regulation%20Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline transition-colors">View</a></li>
                      <li>VIII-Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VIII%20Sem%20%20V20%20Regulation%20Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline transition-colors">View</a></li>
                    </ul>
                  </div>
                </details>
                <details className="cst-dropdown">
                  <summary>Academic year 2022-23: I-Sem Handbooks</summary>
                  <div className="cst-dropdown-content">
                    <ul className="space-y-2 list-none">
                      <li>III-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/III%20SEM%20V20%20Regulation%20HANDBOOK%20(CSE).pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline transition-colors">View</a></li>
                      <li>V-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/V%20SEM%20CSE%20%20V20%20Regulation%20Handbook%2022_23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline transition-colors">View</a></li>
                      <li>VII-Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VII%20SEM%20CSE%20V18%20Regulation%20Handbook%2022_23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline transition-colors">View</a></li>
                    </ul>
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      // The rest of the cases are already present below as part of the switch statement.

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Teaching Faculty</summary>
                <div className="cst-dropdown-content">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">Loading teaching faculty...</div>
                    </div>
                  ) : faculty && faculty.length > 0 ? (
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
                                {member.profile_url ? (
                                  <a
                                    href={member.profile_url}
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
                      <div className="text-gray-500">No teaching faculty data available.</div>
                    </div>
                  )}
                </div>
              </details>

              <details className="cst-dropdown">
                <summary>Non-Teaching Staff</summary>
                <div className="cst-dropdown-content">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">Loading non-teaching staff...</div>
                    </div>
                  ) : nonTeachingFaculty && nonTeachingFaculty.length > 0 ? (
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
                      <div className="text-gray-500">No non-teaching staff data available.</div>
                    </div>
                  )}
                </div>
              </details>

              
            </div>
          </div>
        );
     case 'Board of Studies': {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
      <div className="space-y-6">
        <details open className="cst-dropdown">
          <summary>Board of Studies Members</summary>
          <div className="cst-dropdown-content">
            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Loading board of studies members...</div>
              </div>
            ) : boardOfStudiesMembers && boardOfStudiesMembers.length > 0 ? (
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
                    {boardOfStudiesMembers.map((member, idx) => (
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
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500">No board of studies members data available.</div>
              </div>
            )}
          </div>
        </details>

        <details className="cst-dropdown">
          <summary>Board of Studies Meeting Minutes</summary>
          <div className="cst-dropdown-content">
            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Loading board of studies meeting minutes...</div>
              </div>
            ) : boardOfStudiesMeetingMinutes && boardOfStudiesMeetingMinutes.length > 0 ? (
              <div className="space-y-3">
                {boardOfStudiesMeetingMinutes.map((minute: any) => {
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
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500">No board of studies meeting minutes available.</div>
              </div>
            )}
          </div>
        </details>
      </div>
    </div>
  );
}

      case 'Laboratories':
        // Use gallery images if available, otherwise use fallback hardcoded labs
        const labs = laboratoryGallery.length > 0 
          ? laboratoryGallery.map((item: any) => ({
              id: item.id,
              name: item.title || 'Laboratory',
              img: item.gallery
            }))
          : [
              { name: "Computer Programming Lab", img: "https://srivasaviengg.ac.in/images/departments/eee/eee_CPLAB.jpg" },
              { name: "Control Systems Lab", img: "https://srivasaviengg.ac.in/images/departments/eee/eee_CS_LAB.jpg" },
              { name: "EMS Lab", img: "https://srivasaviengg.ac.in/images/departments/eee/eee_EMS_LAB.jpg" },
              { name: "ET & NT Lab", img: "https://srivasaviengg.ac.in/images/departments/eee/eee_ETNT_LAB.jpg" },
              { name: "EM Lab1", img: "https://srivasaviengg.ac.in/images/departments/eee/eee_EM1.jpg" },
              { name: "EM Lab2", img: "https://srivasaviengg.ac.in/images/departments/eee/eee_EM2.jpg" },
              { name: "Power Electronics Lab", img: "https://srivasaviengg.ac.in/images/departments/eee/eee_PELAB.jpg" },
              { name: "R & D Lab", img: "https://srivasaviengg.ac.in/images/departments/eee/eee_RD.jpg" },
            ];

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Laboratories</h2>

            <div className="mb-8 text-gray-700 leading-relaxed space-y-4">
              <p>
                Each lab is established with modern facilities. Each lab is equipped with demo experiments along with the university prescribed experiments. The motors and instruments etc., are opened and exhibited on tables in the laboratories for clear understanding of the students. In Electrical Measurements Lab, Power Electronics Lab and the Networks Lab each student operates on only one set-up independently. In the Power Electronics Lab and Networks Lab each set-up is customized and equipped with an oscilloscope, Ac and regulated Dc power supplies, digital panel meters and bread boards.
              </p>
              <p className="font-medium text-lg text-[#B22222]">
                The following Laboratories are available in the department:
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-500">Loading laboratories...</div>
              </div>
            ) : labs && labs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {labs.map((lab: any, index: number) => (
                  <div key={lab.id || index} className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={lab.img}
                        alt={lab.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                    </div>
                    <div className="p-4 text-center bg-gray-50 group-hover:bg-white transition-colors duration-300">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#B22222] transition-colors">
                        {lab.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500">No laboratories data available.</div>
              </div>
            )}
          </div>
        );

      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Library</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-500">Loading library information...</div>
              </div>
            ) : departmentLibrary ? (
              <>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                  <div className="md:w-1/2 flex justify-center">
                    {departmentLibrary.image_url ? (
                      <img 
                        src={departmentLibrary.image_url} 
                        alt="Department Library" 
                        className="w-full h-auto rounded-lg shadow-md object-cover max-h-96"
                        style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-96 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2 text-lg text-gray-700">
                    {departmentLibrary.description ? (
                      <p>{departmentLibrary.description}</p>
                    ) : (
                      <p>
                        Department Library offers a variety of books related to Electrical Engineering subjects. Reference books of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are issued to students and staff. Students can access the Library facility according to their convenience any time round-the-clock.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                    <h5 className="text-xl font-semibold text-center text-[#B22222] mb-2">No. of Titles</h5>
                    <p className="text-2xl text-red-600 font-bold text-center">{departmentLibrary.titles || 0}</p>
                  </div>
                  <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                    <h5 className="text-xl font-semibold text-center text-green-700 mb-2">No. of Volumes</h5>
                    <p className="text-2xl text-green-600 font-bold text-center">{departmentLibrary.volumes || 0}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-lg text-gray-700 border-t pt-6">
                  <p className="font-semibold">Faculty In-charge</p>
                  <p>{departmentLibrary.faculty_incharge || 'N/A'}</p>
                  {departmentLibrary.phone && <p>Phone: {departmentLibrary.phone}</p>}
                  {departmentLibrary.email && (
                    <p>
                      E-mail: <a href={`mailto:${departmentLibrary.email}`} className="text-blue-600 hover:underline">{departmentLibrary.email}</a>
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500">No library information available.</div>
              </div>
            )}
          </div>
        );

      case 'Faculty Achievements': {
        // Group achievements by category from database
        const categories = Array.from(new Set(facultyAchievementsData.map((a: any) => a.category)));
        const grouped = categories.map(cat => ({
          category: cat,
          items: facultyAchievementsData.filter((a: any) => a.category === cat)
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-500">Loading faculty achievements...</div>
              </div>
            ) : grouped.length > 0 ? (
              <div className="space-y-6">
                {grouped.map((group, index) => (
                  <details key={group.category} open={index === 0} className="cst-dropdown">
                    <summary>{group.category}</summary>
                    <div className="cst-dropdown-content">
                      {group.items.length > 0 ? (
                        <ul className="list-disc pl-6 my-2 space-y-2">
                          {group.items.map((item: any, idx: number) => (
                            <li key={item.id || idx}>
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
                        <div className="text-gray-600 text-sm mt-2">No entries available in this category.</div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500">No faculty achievements data available.</div>
              </div>
            )}
          </div>
        );
      }
      case 'Research Center':
        return <ResearchCenter department="eee" />;

      case 'Student Achievements':
        return <StudentAchievements department="eee" />;
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Faculty Innovations in Teaching & Learning</h2>

            {loading && <div className="text-center">Loading faculty innovations...</div>}
            {error && <div className="text-center text-red-600">Error loading faculty innovations: {error}</div>}

            {!loading && !error && (
              <div className="space-y-6">
                {facultyInnovations.length > 0 ? (
                  facultyInnovations.map((innovation: any) => (
                    <div key={innovation.id} className="border rounded-lg p-6 bg-gray-50">
                      <h3 className="text-xl font-semibold text-[#B22222] mb-3">{innovation.title}</h3>
                      <p className="text-gray-700 mb-3">{innovation.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span><strong>Faculty:</strong> {innovation.faculty_name}</span>
                        <span><strong>Implementation Date:</strong> {new Date(innovation.implementation_date).toLocaleDateString()}</span>
                        <span><strong>Impact:</strong> {innovation.impact_level}</span>
                      </div>
                      {innovation.resources && (
                        <div className="mt-3">
                          <strong>Resources Used:</strong> {innovation.resources}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-600">
                    <p>No faculty innovations data available at the moment.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
            <div className="space-y-6">
              {/* Student Achievements */}
              <details open className="cst-dropdown">
                <summary>Student Achievements</summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    <li>
                      List of Students Participated/got prizes in Technical -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/eee_studentsachievements.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">View</a>
                    </li>
                  </ul>
                </div>
              </details>

              {/* Placement, Higher Studies and Entrepreneurship */}
              <details className="cst-dropdown">
                <summary>Placement, Higher Studies and Entrepreneurship</summary>
                <div className="cst-dropdown-content">
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full border text-sm text-center mb-6 table-auto">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Item</th>
                          <th className="border px-2 py-1">CAY 2021-22</th>
                          <th className="border px-2 py-1">CAY 2020-21</th>
                          <th className="border px-2 py-1">CAY 2019-20</th>
                          <th className="border px-2 py-1">CAY 2018-19</th>
                          <th className="border px-2 py-1">CAY 2017-18</th>
                          <th className="border px-2 py-1">CAY 2016-17</th>
                          <th className="border px-2 py-1">CAY 2015-16</th>
                          <th className="border px-2 py-1">CAY 2014-15</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-2 py-1">Total No.of Final Year Students</td>
                          <td className="border px-2 py-1">118</td>
                          <td className="border px-2 py-1">121</td>
                          <td className="border px-2 py-1">114</td>
                          <td className="border px-2 py-1">118</td>
                          <td className="border px-2 py-1">99</td>
                          <td className="border px-2 py-1">107</td>
                          <td className="border px-2 py-1">109</td>
                          <td className="border px-2 py-1">132</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">No.of students placed in companies or Government Sector</td>
                          <td className="border px-2 py-1">94</td>
                          <td className="border px-2 py-1">58</td>
                          <td className="border px-2 py-1">35</td>
                          <td className="border px-2 py-1">55</td>
                          <td className="border px-2 py-1">31</td>
                          <td className="border px-2 py-1">32</td>
                          <td className="border px-2 py-1">56</td>
                          <td className="border px-2 py-1">64</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">No.of students admitted to higher studies with valid qualifying scores (GATE or equivalent State or National Level Tests, GRE, GMAT etc.)</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">4</td>
                          <td className="border px-2 py-1">3</td>
                          <td className="border px-2 py-1">3</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">8</td>
                          <td className="border px-2 py-1">3</td>
                          <td className="border px-2 py-1">8</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">No.of students turned entrepreneur in engineering/technology</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">1</td>
                          <td className="border px-2 py-1">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>

              {/* Internships/Certificates/Workshop */}
              <details className="cst-dropdown">
                <summary>Internships/Certificates/Workshop</summary>
                <div className="cst-dropdown-content">
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full border text-sm text-center mb-6 table-auto">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Academic Year</th>
                          <th className="border px-2 py-1" colSpan={3}>Certificates</th>
                          <th className="border px-2 py-1" colSpan={3}>Internships</th>
                          <th className="border px-2 py-1">Workshops</th>
                          <th className="border px-2 py-1">Co-Curricular Activities</th>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1"></td>
                          <td className="border px-2 py-1">NPTEL</td>
                          <td className="border px-2 py-1">Coursera</td>
                          <td className="border px-2 py-1">Others</td>
                          <td className="border px-2 py-1">Internshala</td>
                          <td className="border px-2 py-1">APSSDC</td>
                          <td className="border px-2 py-1">Others</td>
                          <td className="border px-2 py-1"></td>
                          <td className="border px-2 py-1"></td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-2 py-1">2021-2022</td>
                          <td className="border px-2 py-1">03</td>
                          <td className="border px-2 py-1">69</td>
                          <td className="border px-2 py-1">41</td>
                          <td className="border px-2 py-1">01</td>
                          <td className="border px-2 py-1">26</td>
                          <td className="border px-2 py-1">158</td>
                          <td className="border px-2 py-1">111</td>
                          <td className="border px-2 py-1">36</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">2020-2021</td>
                          <td className="border px-2 py-1">17</td>
                          <td className="border px-2 py-1">35</td>
                          <td className="border px-2 py-1">13</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">01</td>
                          <td className="border px-2 py-1">05</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">03</td>
                        </tr>
                        <tr>
                          <td className="border px-2 py-1">2019-2020</td>
                          <td className="border px-2 py-1">03</td>
                          <td className="border px-2 py-1">01</td>
                          <td className="border px-2 py-1">03</td>
                          <td className="border px-2 py-1">18</td>
                          <td className="border px-2 py-1">01</td>
                          <td className="border px-2 py-1">-</td>
                          <td className="border px-2 py-1">48</td>
                          <td className="border px-2 py-1">01</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
            
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222]"></div>
              </div>
            )}
            
            {/* Empty State */}
            {!loading && placementsData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No placement records available yet.</p>
              </div>
            )}
            
            {/* Placements List */}
            {!loading && placementsData.length > 0 && (
              <div className="space-y-6">
                {placementsData.map((placement, index) => (
                  <details 
                    key={placement.id} 
                    className="cst-dropdown"
                    open={index === 0}
                  >
                    <summary>{placement.title || `Placements - ${placement.batch}`}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        <li>
                          {placement.title || `Placements - ${placement.batch}`}
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
                        </li>
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        );
      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association - LEE</h2>
            <div className="text-gray-700 mb-6 space-y-4">
              <p className="text-justify leading-relaxed">
                LEE means "SIDE OF SOMETHING THAT IS SHELTERED FROM THE WIND" in a similar way LEE (LEAGUE OF ELECTRICAL ENGINEERS) is an Association that shelters the students from daily academics. Festival is a day to rejoice and is filled with lots of fun and excitement. Especially students feel blessed as they celebrate many festivals not only at their residence but also at college. There is an excitement all over in wearing new dresses and preparing a variety of programs. It is thrilling when there is sharing of love and happiness among the students. They come out of their daily rigmarole and rejuvenate themselves in the springs of LEE.
              </p>
            </div>

            <div className="space-y-4">
              {/* About LEE Association */}
              <details open className="cst-dropdown">
                <summary>About LEE Association</summary>
                <div className="cst-dropdown-content">
                  <div className="space-y-4 text-gray-700">
                    <p className="text-justify leading-relaxed">
                      On these days they offer to the faculty a great welcome and they even felicitate the faculty members. The importance of this function lies in celebrating it in a meaningful and purposeful way by spreading joy to one and all. LEE association was initiated by the students of 2nd batch, in 2005. From the day initiation till date Seven Anniversaries have been celebrated.
                    </p>
                    <p className="text-justify leading-relaxed">
                      This association is rising under the guidance of the chairman Dr.CH.RAMBABU Dean of Student Affairs, Dr. D Sudha Rani Head of the department (EEE). Every year this function is organised by the students of third year guided by the staff co-ordinator. All the wards from all years actively participate by extending their full support. In this function the Management gives a memento and cash prize to the students who stood as toppers in their respective classes. And also the students felicitate the faculty members as a token of gratitude and respect. The Association activities give wide scope and perpetual inspiration to the all round development of the students in EEE department.
                    </p>
                  </div>
                </div>
              </details>

              {/* Activities & Events */}
              {technicalAssociationData.length > 0 ? (
                <div className="space-y-4">
                  {technicalAssociationData.map((activity, index) => (
                    <details key={activity.id} className="cst-dropdown" open={index === 0}>
                      <summary>{activity.title}</summary>
                      <div className="cst-dropdown-content">
                        {activity.description && (
                          <p className="p-2 mb-3">{activity.description}</p>
                        )}
                        {activity.file_url && (
                          <p className="p-2">
                            {activity.title} -{' '}
                            <a 
                              href={activity.file_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[#B22222] hover:underline font-medium"
                            >
                              View More
                            </a>
                          </p>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              ) : (
                <details className="cst-dropdown">
                  <summary>Activities & Events</summary>
                  <div className="cst-dropdown-content">
                    <p className="p-2">
                      The details of the activities carried out by the society LEE-Technical Association in the last three academic years -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/eee_techassociation.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline font-medium">
                        View More
                      </a>
                    </p>
                  </div>
                </details>
              )}

              {/* Image Gallery */}
              <details className="cst-dropdown">
                <summary>Gallery</summary>
                <div className="cst-dropdown-content">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="text-gray-500">Loading gallery...</div>
                    </div>
                  ) : technicalAssociationGallery.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                      {technicalAssociationGallery.map((item: any, index: number) => (
                        <div key={item.id || index} className="space-y-2">
                          <img
                            src={item.gallery}
                            alt={item.title || `Technical Association Event ${index + 1}`}
                            className="w-full h-auto rounded-lg shadow object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <p className="text-center text-sm text-gray-600">
                            {item.title || `Technical Association Event ${index + 1}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No gallery images available.</p>
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      case 'Technical Magazines, Handbooks and Course Materials':
        const categories = Array.from(new Set(technicalHandbooks.map((item: any) => item.category || 'Other')));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Technical Activities and Handbooks</h2>
            {technicalHandbooksLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : technicalHandbooks.length > 0 ? (
              <div className="space-y-6">
                {categories.map((category, index) => (
                  <details key={category} open={index === 0} className="mb-4 cst-dropdown">
                    <summary>{category}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-none py-2 mb-0 space-y-2">
                        {technicalHandbooks
                          .filter((item: any) => (item.category || 'Other') === category)
                          .map((item: any, idx: number) => (
                            <li key={idx}>
                              {item.title} -{' '}
                              {item.file_url ? (
                                <a
                                  href={item.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-medium"
                                >
                                  View More
                                </a>
                              ) : (
                                <span className="text-gray-400">No file available</span>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No data available.</div>
            )}
          </div>
        );
      case 'Old Static Technical Content':
        return (
          <div>
            <details>
              <summary className="text-lg font-semibold text-[#B22222] cursor-pointer">Academic HandBooks</summary>
              <ul className="list-none py-2 mb-0">
                <li>
                  Academic Hand Books IV-II SEM -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_handbooks/IV-II%20SEM.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </ul>
            </details>
            <details>
              <summary className="text-lg font-semibold text-[#B22222] cursor-pointer">Course Materials</summary>
              <ul className="list-none py-2 mb-0 space-y-2">
                <li>
                  Course Materials -{' '}
                  <a href="https://drive.google.com/drive/folders/1gbRiaj5jsv87blD3Be5nAZdXPvNAQuZ6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </ul>
            </details>
          </div>
        );
      case 'Newsletters':
        // Use fetched eeeNewsletters data, fallback to departmentData
        const displayNewsletters = eeeNewsletters.length > 0 ? eeeNewsletters : newslettersData;
        console.log('📰 Newsletters Data:', displayNewsletters);
        console.log('📰 EEE Newsletters from hook:', eeeNewsletters);
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Newsletters</h2>
            
            {/* Loading State */}
            {(loading || newslettersLoading) && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222]"></div>
              </div>
            )}
            
            {/* Empty State */}
            {!loading && !newslettersLoading && displayNewsletters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No newsletters available.</p>
              </div>
            )}
            
            {/* Newsletters List */}
            {!loading && !newslettersLoading && displayNewsletters.length > 0 && (
              <div className="space-y-4">
                {displayNewsletters.map((item: any, index: number) => (
                  <details key={item.id || index} open={index === 0} className="cst-dropdown">
                    <summary>{item.title || `Newsletter ${index + 1}`}</summary>
                    <div className="cst-dropdown-content">
                      <p className="p-2">
                        {item.title || `Newsletter ${index + 1}`}
                        {item.file_url && (
                          <>
                            {' - '}
                            <a
                              href={item.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline font-medium"
                            >
                              View
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        );
      case 'Product Development':
        // Use fetched pdGalleryImages, fallback to departmentData
        const displayPdGallery = pdGalleryImages.length > 0 ? pdGalleryImages : productDevelopmentGallery;
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Product Development</h2>

            <div className="space-y-4">
              {/* Products List */}
              <details open className="cst-dropdown">
                <summary>Student Developed Products</summary>
                <div className="cst-dropdown-content">
                  <p className="mb-4 text-gray-700">The following are the list of products which were successfully developed by our students:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Solar Rider</li>
                    <li>Lee Eco Bike</li>
                    <li>Digital Notice Board</li>
                    <li>Solar Lift Irrigation System</li>
                    <li>Electric Wheel Chair</li>
                    <li>Multilevel Inverter</li>
                    <li>Drone</li>
                    <li>TriCycle with Solar Energy</li>
                    <li>Self-charging of Hybrid E-bicycle</li>
                  </ul>
                </div>
              </details>

              {/* Image Gallery */}
              <details className="cst-dropdown">
                <summary>Gallery</summary>
                <div className="cst-dropdown-content">
                  {(loading || pdGalleryLoading) ? (
                    <div className="flex justify-center py-8">
                      <div className="text-gray-500">Loading gallery...</div>
                    </div>
                  ) : displayPdGallery.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                      {displayPdGallery.map((item: any, index: number) => (
                        <div key={item.id || index} className="space-y-2">
                          <img
                            src={item.gallery || item.image_url}
                            alt={item.title || `Product ${index + 1}`}
                            className="w-full h-auto rounded-lg shadow object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <p className="text-center text-sm text-gray-600">
                            {item.title || `Product ${index + 1}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  )  : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No gallery images available.</p>
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      case 'Departmental Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Departmental Activities</h2>

            <div className="space-y-4">
              {/* Green Initiative */}
              <details open className="cst-dropdown">
                <summary>Green Initiative - Solar Power Plant</summary>
                <div className="cst-dropdown-content">
                  {giGalleryLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="text-gray-500">Loading Green Initiatives gallery...</div>
                    </div>
                  ) : giGalleryImages.length > 0 ? (
                    <div className="space-y-8">
                      {giGalleryImages.map((item: any, index: number) => (
                        <div key={item.id || index} className="text-center">
                          <h3 className="text-xl font-bold text-[#B22222] mb-4">{item.title || `Green Initiative ${index + 1}`}</h3>
                          {item.description && (
                            <p className="text-gray-700 mb-4">{item.description}</p>
                          )}
                          {/* Display single image or grid of images */}
                          {item.sub_images && Array.isArray(item.sub_images) && item.sub_images.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                              {item.sub_images.map((subImg: any, subIdx: number) => (
                                <div key={subIdx} className="space-y-2">
                                  <img
                                    src={subImg.gallery || subImg.image_url}
                                    alt={subImg.title || `${item.title} - Image ${subIdx + 1}`}
                                    className="w-full h-auto rounded-lg shadow object-cover"
                                    style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                  {subImg.title && (
                                    <p className="text-center text-sm text-gray-600">{subImg.title}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex justify-center mb-6">
                              <img
                                src={item.gallery || item.image_url}
                                alt={item.title || `Green Initiative ${index + 1}`}
                                className="rounded-lg shadow-md max-w-2xl w-full"
                                style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-[#B22222] mb-4">500KWp Solar Power Plant Installation</h3>
                        <p className="text-gray-700 mb-4">As a part of green initiative, college installed 500KWp solar plant in the campus.</p>
                        <div className="flex justify-center mb-6">
                          <img
                            src="https://srivasaviengg.ac.in/image/eee%20images/green_graph.jpg"
                            alt="Solar Power Generation Graph"
                            className="rounded-lg shadow-md max-w-2xl w-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <h3 className="text-xl font-bold text-[#B22222] mb-4">Inauguration of 200kWp Solar Power Plant - 11.11.2016</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <img
                              src="https://srivasaviengg.ac.in/image/eee%20images/solarplant_inag.jpg"
                              alt="Solar Plant Inauguration Ceremony"
                              className="w-full h-auto rounded-lg shadow object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <p className="text-center text-sm text-gray-600">Inauguration Ceremony</p>
                          </div>
                          <div className="space-y-2">
                            <img
                              src="https://srivasaviengg.ac.in/image/eee%20images/solarplant_inag1.jpg"
                              alt="Solar Power Plant Installation"
                              className="w-full h-auto rounded-lg shadow object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <p className="text-center text-sm text-gray-600">Solar Panel Installation</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </details>

              {/* Product Development */}
              <details className="cst-dropdown">
                <summary>Product Development by Students</summary>
                <div className="cst-dropdown-content">
                  <p className="mb-4 text-gray-700">The following are the list of products which were successfully developed by our students:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                    <li>Solar Rider</li>
                    <li>Lee Eco Bike</li>
                    <li>Digital Notice Board</li>
                    <li>Solar Lift Irrigation System</li>
                    <li>Electric Wheel Chair</li>
                    <li>Multilevel Inverter</li>
                    <li>Drone</li>
                    <li>TriCycle with Solar Energy</li>
                    <li>Self-charging of Hybrid E-bicycle</li>
                  </ul>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {pdGalleryLoading ? (
                      <div className="flex justify-center py-8 col-span-full">
                        <div className="text-gray-500">Loading gallery...</div>
                      </div>
                    ) : pdGalleryImages.length > 0 ? (
                      pdGalleryImages.map((item: any, index: number) => (
                        <div key={item.id || index} className="space-y-2">
                          <img
                            src={item.gallery || item.image_url}
                            alt={item.title || `Product ${index + 1}`}
                            className="w-full h-auto rounded-lg shadow object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          {item.title && (
                            <p className="text-center text-sm text-gray-600">{item.title}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="space-y-2">
                          <img
                            src="https://srivasaviengg.ac.in/images/departments/eee/eee_da1.jpg"
                            alt="Student Product 1"
                            className="w-full h-auto rounded-lg shadow object-cover"
                            style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <img
                            src="https://srivasaviengg.ac.in/images/departments/eee/eee_da2.jpg"
                            alt="Student Product 2"
                            className="w-full h-auto rounded-lg shadow object-cover"
                            style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <img
                            src="https://srivasaviengg.ac.in/images/departments/eee/eee_da3.jpg"
                            alt="Student Product 3"
                            className="w-full h-auto rounded-lg shadow object-cover"
                            style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <img
                            src="https://srivasaviengg.ac.in/images/departments/eee/eee_da4.jpg"
                            alt="Student Product 4"
                            className="w-full h-auto rounded-lg shadow object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <img
                            src="https://srivasaviengg.ac.in/images/departments/eee/eee_da5.jpeg"
                            alt="Student Product 5"
                            className="w-full h-auto rounded-lg shadow object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <img
                            src="https://srivasaviengg.ac.in/images/departments/eee/eee_da6.jpeg"
                            alt="Student Product 6"
                            className="w-full h-auto rounded-lg shadow object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Green Initiative':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Green Initiative</h2>
            
            {giGalleryLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222]"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <details className="cst-dropdown" open>
                  <summary>Solar Power Plant Installation</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-6">
                      {giGalleryImages.length > 0 ? (
                        // Display database images inside the dropdown
                        giGalleryImages.map((item: any, index: number) => (
                          <div key={item.id || index} className="text-center">
                            {item.description && (
                              <h3 className="text-xl font-semibold text-[#B22222] mb-4">
                                {item.description}
                              </h3>
                            )}
                            {/* Display single image or grid of images */}
                            {item.sub_images && Array.isArray(item.sub_images) && item.sub_images.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                                {item.sub_images.map((subImg: any, subIdx: number) => (
                                  <div key={subIdx} className="space-y-2">
                                    <img
                                      src={subImg}
                                      alt={`${item.title} - Image ${subIdx + 1}`}
                                      className="w-full h-auto rounded-lg shadow object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex justify-center mb-6">
                                <img
                                  src={item.gallery || item.image_url}
                                  alt={item.title || `Green Initiative ${index + 1}`}
                                  className="rounded-lg shadow-md max-w-2xl w-full"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        // Fallback to hardcoded content when no database data
                        <>
                          <div className="text-center">
                            <h3 className="text-xl font-semibold text-[#B22222] mb-4">
                              As a part of green initiative college installed 500KWp solar plant in the campus.
                            </h3>
                            <img
                              src="https://srivasaviengg.ac.in/image/eee%20images/green_graph.jpg"
                              alt="Solar Plant Graph"
                              className="rounded-lg shadow-md w-full max-w-2xl mx-auto"
                            />
                          </div>

                          <div className="text-center">
                            <h3 className="text-xl font-semibold text-[#B22222] mb-4">
                              Inauguration of 200kWp Solar Power Plant on 11.11.2016
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                              <img
                                src="https://srivasaviengg.ac.in/image/eee%20images/solarplant_inag.jpg"
                                alt="Solar Plant Inauguration"
                                className="w-full h-auto rounded-lg shadow object-cover"
                              />
                              <img
                                src="https://srivasaviengg.ac.in/image/eee%20images/solarplant_inag1.jpg"
                                alt="Solar Plant Inauguration Ceremony"
                                className="w-full h-auto rounded-lg shadow object-cover"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Social Service Activities</summary>
                <div className="cst-dropdown-content">
                  <p className="text-gray-700 mb-4">Continuous social service activities are carried out by the students under LEE Association, with the support of the Head of the Department and all the faculty members.</p>
                  {ssGalleryLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="text-gray-500">Loading gallery...</div>
                    </div>
                  ) : ssGalleryImages.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {ssGalleryImages.map((item: any, index: number) => (
                        <div key={item.id || index} className="space-y-2">
                          <img
                            src={item.gallery}
                            alt={item.title || `Social Service Activity ${index + 1}`}
                            className="w-full h-auto rounded-lg shadow object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          {item.title && (
                            <p className="text-center text-sm text-gray-600">{item.title}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      
                    </div>
                  )}
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>LEE 7th Anniversary Celebrations</summary>
                <div className="cst-dropdown-content">
                  <p className="text-gray-700 mb-6">LEE 7TH anniversary was organised by 2009-2013 batch students on 17th of February 2012. The chief guest for this anniversary is our honourable president SRIGRANDHI.SATYANARAYANA followed by the principal Dr.J.SRI HARI RAO & Chairman of LEE Mr.CH.RAMBABU. It was celebrated in the presence of all the faculty members and students of all years. Prizes are given to all of the winners of various events conducted, and also for the rank holders in previous semesters. Apart from this students give a rocking performance in cultural.</p>
                  {acGalleryLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="text-gray-500">Loading gallery...</div>
                    </div>
                  ) : acGalleryImages.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {acGalleryImages.map((item: any, index: number) => (
                        <div key={item.id || index} className="space-y-2">
                          <img
                            src={item.gallery}
                            alt={item.title || `LEE Anniversary ${index + 1}`}
                            className="w-full h-auto rounded-lg shadow object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          {item.title && (
                            <p className="text-center text-sm text-gray-600">{item.title}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );

      case 'Syllabus':
        // Group syllabus by type (B.Tech, M.Tech, etc.)
        const syllabusTypes = Array.from(new Set(syllabus.map((s: any) => s.type || 'Other')));

        // Function to format type names
        const formatType = (type: string) => {
          const typeMap: { [key: string]: string } = {
            'btech': 'B.Tech',
            'mtech': 'M.Tech',
            'other': 'Other'
          };
          return typeMap[type.toLowerCase()] || type;
        };

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            {syllabusLoading ? (
              <div className="text-center py-8 text-gray-500">Loading syllabus...</div>
            ) : Array.isArray(syllabus) && syllabus.length > 0 ? (
              <div className="space-y-6">
                {syllabusTypes.map((type, index) => (
                  <details key={type} open={index === 0} className="cst-dropdown">
                    <summary>{formatType(type)}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {syllabus
                          .filter((s: any) => (s.type || 'Other') === type)
                          .map((item: any, idx: number) => (
                            <li key={idx}>
                              {item.title}
                              {item.academic_year && <span className="text-gray-600"> ({item.academic_year})</span>}
                              {item.fileUrl && (
                                <>
                                  {' - '}
                                  <a
                                    href={item.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
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
            ) : (
              <div className="text-center py-8 text-gray-500">No syllabus data available.</div>
            )}
          </div>
        );

      case 'Faculty Innovations in T & L':
        // Group innovations by innovation_type
        const innovationTypes = Array.from(new Set(facultyInnovations.map((item: any) => item.innovation_type || 'Other')));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Innovations in Teaching & Learning</h2>
            {facultyInnovationsLoading ? (
              <div className="text-center py-8 text-gray-500">Loading faculty innovations...</div>
            ) : Array.isArray(facultyInnovations) && facultyInnovations.length > 0 ? (
              <div className="space-y-6">
                {innovationTypes.map((type, index) => (
                  <details key={type} open={index === 0} className="cst-dropdown">
                    <summary>{type}</summary>
                    <div className="cst-dropdown-content">
                      <div className="space-y-4">
                        {facultyInnovations
                          .filter((item: any) => (item.innovation_type || 'Other') === type)
                          .map((innovation: any, idx: number) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                              <h4 className="font-semibold text-lg text-gray-900 mb-2">{innovation.title}</h4>
                              {innovation.description && (
                                <p className="text-gray-700 mb-2">{innovation.description}</p>
                              )}
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                                {innovation.faculty_name && (
                                  <span><strong>Faculty:</strong> {innovation.faculty_name}</span>
                                )}
                                {innovation.implementation_date && (
                                  <span><strong>Date:</strong> {new Date(innovation.implementation_date).toLocaleDateString('en-GB')}</span>
                                )}
                              </div>
                              {innovation.impact_description && (
                                <p className="text-gray-600 text-sm mb-2"><strong>Impact:</strong> {innovation.impact_description}</p>
                              )}
                              {innovation.document_url && (
                                <a
                                  href={innovation.document_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block mt-2 text-[#B22222] hover:underline font-medium"
                                >
                                  View Document
                                </a>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No faculty innovations data available.</div>
            )}
          </div>
        );

      case 'Contact':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Contact Info</h2>

            {/* HOD Contact Card */}
            <div className="border-2 border-gray-200 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/5 flex justify-center">
                  <img
                    src="/eeehod.jpg"
                    alt="Dr. D. Sudha Rani"
                    className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div className="md:w-3/5 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Dr. D. Sudha Rani</h3>
                  <p className="text-lg text-gray-700 mb-4">Professor & Head of the Department</p>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <span className="font-semibold">Email:</span>{' '}
                      <a href="mailto:hod_eee@srivasaviengg.ac.in" className="text-[#B22222] hover:underline">
                        hod_eee@srivasaviengg.ac.in
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> 08818-284355 (O) - Ext. 376
                    </p>
                    <p>
                      <span className="font-semibold">Fax:</span> 08818-284322
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Department Office */}
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-semibold text-[#B22222] mb-4">Department Office</h3>
                <p className="text-gray-700 leading-relaxed">
                  Department of Electrical & Electronics Engineering<br />
                  Sri Vasavi Engineering College<br />
                  Pedatadepalli, Tadepalligudem - 534101<br />
                  West Godavari District, Andhra Pradesh, India
                </p>
              </div>

              {/* Key Faculty Contacts */}
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-semibold text-[#B22222] mb-4">Key Faculty Contacts</h3>
                <div className="space-y-4">
                  {faculty.length > 0 ? (
                    faculty.slice(0, 5).map((member, index) => (
                      <div key={member.id || index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-2">
                        <div>
                          <p className="font-medium text-gray-800">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.designation}</p>
                        </div>
                        {member.email && (
                          <div className="mt-2 sm:mt-0">
                            <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline text-sm">
                              {member.email}
                            </a>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Contact information will be updated soon.</p>
                  )}
                </div>
              </div>

              {/* Department Library Contact */}
              <div className="border rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-semibold text-[#B22222] mb-4">Department Library</h3>
                <div>
                  <p className="font-medium text-gray-800">Faculty Incharge</p>
                  <p className="text-gray-600">M T V L Ravi Kumar, Asst. Professor</p>
                  <p className="text-gray-600">Phone: 7893896567</p>
                  <p className="text-gray-600">
                    E-mail: <a href="mailto:ravi.mada@srivasaviengg.ac.in" className="text-blue-600 hover:underline">ravi.mada@srivasaviengg.ac.in</a>
                  </p>
                </div>
              </div>
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
      <DepartmentSidebar
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        title="EEE Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default EEEDepartment;
