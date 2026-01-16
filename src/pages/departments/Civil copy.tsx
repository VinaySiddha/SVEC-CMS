import React, { useState, useEffect } from 'react';
import { Building, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Library, Link as LinkIcon } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';
import { LogoLoader } from '@/components/ui/LogoLoader';
import { useOptimizedTabLoader } from '@/hooks/useOptimizedTabLoader';

// Designation priority mapping for sorting
const getDesignationPriority = (designation: string): number => {
  const designationLower = designation.toLowerCase().trim();

  if (designationLower.includes('professor') && (designationLower.includes('head') || designationLower.includes('hod'))) return 1;
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
const sortFacultyByDesignationAndDOJ = <T extends { designation?: string; date_of_joining?: string }>(facultyList: T[]): T[] => {
  return [...facultyList].sort((a, b) => {
    // First, sort by designation priority
    const priorityA = getDesignationPriority(a.designation || '');
    const priorityB = getDesignationPriority(b.designation || '');
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    // If designation priority is the same, sort by date of joining (ascending)
    const dateA = a.date_of_joining ? new Date(a.date_of_joining).getTime() : Infinity;
    const dateB = b.date_of_joining ? new Date(b.date_of_joining).getTime() : Infinity;
    
    return dateA - dateB;
  });
};

const CivilDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  // Use the optimized tab loader hook for instant switching
  const {
    activeTab: activeDeptTab,
    isTransitioning,
    switchTab: switchDeptTab,
    getTabButtonProps,
    getContentProps,
    getLoaderProps
  } = useOptimizedTabLoader('Department', { animationDuration: 150 });

  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  // Dynamic content state
  const [dynamicSidebarItems, setDynamicSidebarItems] = useState<any[]>([]);
  const [departmentInfo, setDepartmentInfo] = useState<any[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<any[]>([]);
  const [facultyAchievements, setFacultyAchievements] = useState<any>({});
  const [physicalFacilities, setPhysicalFacilities] = useState<any>({});
  const [departmentLibrary, setDepartmentLibrary] = useState<any[]>([]);
  const [placementBatches, setPlacementBatches] = useState<any[]>([]);
  const [technicalAssociationActivities, setTechnicalAssociationActivities] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [extraCurricularActivities, setExtraCurricularActivities] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/civil/extra-curricular?dept=Civil")
      .then((res) => res.json())
      .then((data) => {
        setExtraCurricularActivities(data);
      })
      .catch((err) => {
        console.error('Error fetching extra curricular activities:', err);
      });
  }, []);
  const [researchDevelopment, setResearchDevelopment] = useState<any>({});
  const [researchProjects, setResearchProjects] = useState<any>({});
  const [consultancyActivities, setConsultancyActivities] = useState<any[]>([]);
  useEffect(() => {
    // Use the existing working API pattern
    fetch("/api/civil/consultancy?department=civil")
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`API error: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        setConsultancyActivities(data || []);
      })
      .catch((err) => {
        setConsultancyActivities([]);
      });
  }, []);
  const [departmentContact, setDepartmentContact] = useState<any[]>([]);
  const [Syllabus, setSyllabus] = useState<any[]>([]);
  
  // Physical Facilities state variables
  const [classTimetables, setClassTimetables] = useState<any[]>([]);
  const [classRooms, setClassRooms] = useState<any[]>([]);
  const [laboratories, setLaboratories] = useState<any[]>([]);

  // Fetch Class Timetables
  useEffect(() => {
    fetch("/api/civil/physical-facilities?category=Class Timetable")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setClassTimetables(data || []);
      })
      .catch((err) => {
        setClassTimetables([]);
      });
  }, []);

  // Fetch Class Rooms
  useEffect(() => {
    fetch("/api/civil/physical-facilities?category=Class Room")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setClassRooms(data || []);
      })
      .catch((err) => {
        setClassRooms([]);
      });
  }, []);

  // Fetch Laboratories
  useEffect(() => {
    fetch("/api/civil/physical-facilities?category=Laboratory")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setLaboratories(data || []);
      })
      .catch((err) => {
        setLaboratories([]);
      });
  }, []);

  useEffect(() => {
    fetch("/api/civil/syllabus?department=civil")
      .then((res) => res.json())
      .then((data) => {
        setSyllabus(data.undefined);
      })
      .catch((err) => {
        console.error('Error fetching syllabus:', err);
      });
  }, []);
  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const iconProps = { className: "w-4 h-4" };
    switch (iconName) {
      case 'Building': return <Building {...iconProps} />;
      case 'Users': return <Users {...iconProps} />;
      case 'Award': return <Award {...iconProps} />;
      case 'BookOpen': return <BookOpen {...iconProps} />;
      case 'HardHat': return <HardHat {...iconProps} />;
      case 'Library': return <Library {...iconProps} />;
      case 'Handshake': return <Handshake {...iconProps} />;
      case 'TrendingUp': return <TrendingUp {...iconProps} />;
      case 'Trophy': return <Trophy {...iconProps} />;
      case 'Presentation': return <Presentation {...iconProps} />;
      case 'Briefcase': return <Briefcase {...iconProps} />;
      case 'Activity': return <Activity {...iconProps} />;
      case 'Rss': return <Rss {...iconProps} />;
      case 'Search': return <Search {...iconProps} />;
      case 'Phone': return <Phone {...iconProps} />;
      default: return <Building {...iconProps} />;
    }
  };
  const [achievements, setAchievements] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [studentBOS, setStudentBOS] = useState<any[]>([]);
  const [bosMembers, setBosMembers] = useState<any[]>([]);
  const [bosMinutes, setBosMinutes] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [technicalFaculty, setTechnicalFaculty] = useState<any[]>([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = useState<any[]>([]);
  //const [newsletters, setNewsletters] = useState<any[]>([]);
  const [workshops, setWorkshops] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/civil/newsletters?department=civil")
      .then((res) => res.json())
      .then((data) => {
        setNewsletters(data);
      })
      .catch((err) => {
        console.error('Error fetching newsletters:', err);
      });
  }, []);
  useEffect(() => {
    fetch("/api/civil/workshops")
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setWorkshops(data);
        } else {
          setWorkshops([]);
        }
      })
      .catch((err) => {
        setWorkshops([]);
      });
  }, []);
  useEffect(() => {
    fetch('/api/civil/bos?dept=civil')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStudentBOS(data);
        } else if (data.success && Array.isArray(data.data)) {
          setStudentBOS(data.data);
        } else {
          setStudentBOS([]); // fallback
        }
      })
      .catch(err => {
        console.error('Error fetching student BOS:', err);
        setStudentBOS([]);
      });
  }, []);
  
  useEffect(() => {
    fetch('/api/civil/bos-members?dept=civil')
      .then(res => {
        if (!res.ok) {
          setBosMembers([]);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data === null) return;
        if (Array.isArray(data)) {
          setBosMembers(data);
        } else if (data.success && Array.isArray(data.data)) {
          setBosMembers(data.data);
        } else {
          setBosMembers([]); // fallback
        }
      })
      .catch(err => {
        setBosMembers([]);
      });
  }, []);
  
  useEffect(() => {
    fetch('/api/civil/bos-minutes?dept=civil')
      .then(res => {
        if (!res.ok) {
          setBosMinutes([]);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data === null) return;
        if (Array.isArray(data)) {
          setBosMinutes(data);
        } else if (data.success && Array.isArray(data.data)) {
          setBosMinutes(data.data);
        } else {
          setBosMinutes([]); // fallback
        }
      })
      .catch(err => {
        setBosMinutes([]);
      });
  }, []);
  
  useEffect(() => {
    fetch('/api/civil-faculty')
      .then(res => {
        if (!res.ok) {
          setFaculty([]);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data === null) return;
        if (Array.isArray(data)) {
          setFaculty(data);
        } else if (data.success && Array.isArray(data.data)) {
          setFaculty(data.data);
        } else {
          setFaculty([]); // fallback
        }
      })
      .catch(err => {
        setFaculty([]);
      });
  }, []);
  
  useEffect(() => {
    fetch('/api/civil-technical-faculty')
      .then(res => {
        if (!res.ok) {
          setTechnicalFaculty([]);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data === null) return;
        if (Array.isArray(data)) {
          setTechnicalFaculty(data);
        } else if (data.success && Array.isArray(data.data)) {
          setTechnicalFaculty(data.data);
        } else {
          setTechnicalFaculty([]); // fallback
        }
      })
      .catch(err => {
        setTechnicalFaculty([]);
      });
  }, []);
  
  useEffect(() => {
    fetch('/api/civil-non-technical-staff')
      .then(res => {
        if (!res.ok) {
          setNonTeachingFaculty([]);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data === null) return;
        if (Array.isArray(data)) {
          setNonTeachingFaculty(data);
        } else if (data.success && Array.isArray(data.data)) {
          setNonTeachingFaculty(data.data);
        } else {
          setNonTeachingFaculty([]); // fallback
        }
      })
      .catch(err => {
        setNonTeachingFaculty([]);
      });
  }, []);
  useEffect(() => {
    fetch('/api/civil/student-achievements')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object' && !data.error) {
          setAchievements(data);
        } else {
          setAchievements({});
        }
        setLoading(false);
      })
      .catch((err) => {
        setAchievements({});
        setLoading(false);
      });
  }, []);

  const [placements, setPlacements] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/civil/placements?dept=civil')
      .then(res => res.json())
      .then(data => {
        // API direct array return chestundi
        setPlacements(data);
      })
      .catch(err => {
        console.error('Error fetching placements:', err);
      });
  }, []);



interface NonTeachingMember {
  id: number;
  name: string;
  designation: string;
  organization?: string;
  position_in_job: string;
}
  // Create sidebar items from dynamic data
  const sidebarItems = dynamicSidebarItems.length > 0
    ? dynamicSidebarItems.map(item => ({
      id: item.item_id,
      label: item.label,
      icon: getIconComponent(item.icon_name)
    }))
    : [
      { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
      { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
      { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
      { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
      { id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
      { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
      { id: 'R&D', label: 'R&D', icon: <Search className="w-4 h-4" /> },
      { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
      { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
      { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
      { id: 'Technical Association', label: 'Technical Association', icon: <Activity className="w-4 h-4" /> },
      { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
      { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
      { id: 'Research Projects', label: 'Research Projects', icon: <Search className="w-4 h-4" /> },
      { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'Consultancy', label: 'Consultancy', icon: <Handshake className="w-4 h-4" /> },
      //{ id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
    ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Vision':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To be a Department that strives towards quality education, research and consultancy in Civil Engineering.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To provide broad and high quality education to its students for a successful professional career.</li>
              <li>To serve the construction industry through dissemination of knowledge and technical service to rural community and professionals.</li>
              <li>To include ethics and human values, effective communication and leadership qualities among students to meet the challenge of the society.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and civil engineering principles.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Analyze real-life problems and design socially responsible and environmentally sustainable civil engineering solutions.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Adapt to evolving technologies through continuous learning.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 4</h4>
                <p className="text-gray-700">Lead a successful career as a team member or as a team leader with strong professional ethics and communication skills.</p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes (POs)</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO1: Engineering Knowledge</h4>
                <p className="text-gray-700">Apply knowledge of mathematics, science, engineering fundamentals, and civil engineering principles to solve complex engineering problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, research literature, and analyze complex engineering problems to arrive at substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Design/Development of Solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO4: Modern Tool Usage</h4>
                <p className="text-gray-700">Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools for complex engineering activities with an understanding of the limitations.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 1</h4>
                <p className="text-gray-700">Apply standard practices and strategies in construction management using modern surveying tools to deliver quality infrastructure.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 2</h4>
                <p className="text-gray-700">Apply the fundamentals of civil engineering to solve engineering problems in interdisciplinary domains.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 3</h4>
                <p className="text-gray-700">Develop sustainable solutions for real-world problems in structural engineering, geotechnical engineering, transportation engineering, and water resources engineering.</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes are defined for each course and are aligned with the Program Outcomes and Program Specific Outcomes. The course outcomes are assessed through direct and indirect assessment tools.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/COs.pdf"
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
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Experienced and dedicated faculty members with specializations in various domains</li>
              <li>State-of-the-art laboratories with modern equipment and tools</li>
              <li>Strong industry-institute interaction through consultancy services</li>
              <li>Research culture fostering innovation and intellectual growth</li>
              <li>Active student technical association (IEI Students Chapter)</li>
              <li>Regular workshops, field visits, and training programs</li>
              <li>Focus on practical learning through field visits and site experiences</li>
              <li>Consultancy services in material testing and structural design</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              The Department of Civil Engineering was established in the year 2001 with a vision to strive towards quality education, research and consultancy. Civil Engineering is one of the oldest and broadest engineering discipline which has been an aspect of life, since the beginning of human civilization. Efforts have been made to provide high quality technical education to students with a view to make them successful professionals.
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
                      <td className="border border-gray-300 px-4 py-3">B.Tech-Civil Engineering</td>
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
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Placements
            </h2>

            <div className="space-y-4">
              <details open className="cst-dropdown">
                <summary>Placements</summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    {placements.length > 0 ? (
                      placements.map((p: any) => (
                        <li key={p.id}>
                          Placements for Batch {p.batch} -{' '}
                          <a
                            href={p.file_url}
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Details
                          </a>
                        </li>
                      ))
                    ) : (
                      <li>No placement data available</li>
                    )}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );

      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Student Achievements
            </h2>
            <div className="space-y-4">
              {Object.keys(achievements).length > 0 ? (
                Object.entries(achievements).map(([category, items]) => (
                  <details key={category} open className="cst-dropdown">
                    <summary>{category}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {Array.isArray(items) && items.map((item) => (
                          <li key={item.id}>
                            {item.title} ({item.academic_year}){' '}
                            <a
                              href={item.proof_document_url}
                              className="text-[#B22222] hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Details
                            </a>
                            {item.description && (
                              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))
              ) : (
                <p className="text-gray-500 italic">No student achievements available.</p>
              )}
            </div>
          </div>
        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Conferences</summary>
                <div className="cst-dropdown-content">
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left border mb-4 table-auto">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2">SNo</th>
                          <th className="px-4 py-2">Name of the Faculty</th>
                          <th className="px-4 py-2">Title of the Paper</th>
                          <th className="px-4 py-2">Name of the Conference</th>
                          <th className="px-4 py-2">Venue</th>
                          <th className="px-4 py-2">Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">Simplified model of existing intercity public transportation</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                        <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">L.Vyshnavi Sai</td><td className="px-4 py-2">Simplified model of existing intercity public transportation</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                        <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">Silty soil stabilization using bituminous emulsion</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                        <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">Stabilization of black cotton soil using jindal global road stabilizer</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                        <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">Integrated landuse transportation over view</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                        <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">A study of speed breakers and vehicle operating cost</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                        <tr><td className="px-4 py-2">7</td><td className="px-4 py-2">T.Yeswanth Sai</td><td className="px-4 py-2">Retempering of concrete structures</td><td className="px-4 py-2">ICBCCE(TROI)</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">6-DEC-2015</td></tr>
                        <tr><td className="px-4 py-2">8</td><td className="px-4 py-2">S.Sriram pradeep</td><td className="px-4 py-2">Mechanical properties of coconut shell concrete using quarry dust</td><td className="px-4 py-2">Internationsl Of Earth Sciences And Engineering</td><td className="px-4 py-2">Tamil Nadu</td><td className="px-4 py-2">24-MAR-2015</td></tr>
                        <tr><td className="px-4 py-2">9</td><td className="px-4 py-2">G.Radha krishnan</td><td className="px-4 py-2">Model Study on cyclic loading responses of lexible Pavement System laid on Expansive Subgrade</td><td className="px-4 py-2">IIT Madras</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">2016</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>International Conferences</summary>
                <div className="cst-dropdown-content">
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left border mb-4 table-auto">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2">SNo</th>
                          <th className="px-4 py-2">Name of the Faculty</th>
                          <th className="px-4 py-2">Title of the Paper</th>
                          <th className="px-4 py-2">Name of the Conference</th>
                          <th className="px-4 py-2">Venue</th>
                          <th className="px-4 py-2">Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">M.Sambasivarao</td><td className="px-4 py-2">Retempering of concrete structures</td><td className="px-4 py-2">ICBCCE(TROI)</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">6-DEC-2015</td></tr>
                        <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">T.Yeswanthi</td><td className="px-4 py-2">Retempering of concrete structures</td><td className="px-4 py-2">ICBCCE(TROI)</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">6-DEC-2015</td></tr>
                        <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">A.Venkata Krishna</td><td className="px-4 py-2">An Experiment Analysis Of Using Melt Processed Plastic Pellet In Porous Concrete By Partially replacing Fine Aggregates</td><td className="px-4 py-2">ICBCCE</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">22-01-2017</td></tr>
                        <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">A.Venkata Krishna</td><td className="px-4 py-2">A Methodical Literature Review on Nano Applications in Civil Engineering</td><td className="px-4 py-2">ICNM</td><td className="px-4 py-2">Kerala</td><td className="px-4 py-2">10-02-1017</td></tr>
                        <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">Dr.V.V.V.Prabhakara Rao</td><td className="px-4 py-2">A Methodical Literature Review on Nano Applications in Civil Engineering</td><td className="px-4 py-2">ICNM</td><td className="px-4 py-2">Kerala</td><td className="px-4 py-2">10-02-1017</td></tr>
                        <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">M.Sambasiva Rao</td><td className="px-4 py-2">A Methodical Literature Review on Nano Applications in Civil Engineering</td><td className="px-4 py-2">ICNM</td><td className="px-4 py-2">Kerala</td><td className="px-4 py-2">10-02-1017</td></tr>
                        <tr><td className="px-4 py-2">7</td><td className="px-4 py-2">K.Chandrika</td><td className="px-4 py-2">An Experimental Analysis on usage potential of lateritic soils as part/Full Replacement for fine aggregates in Concrete</td><td className="px-4 py-2">ICBCCE</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">22-01-2017</td></tr>
                        <tr><td className="px-4 py-2">8</td><td className="px-4 py-2">T.Yeswanthi Sai</td><td className="px-4 py-2">An Experimental Analysis Of Using Melt Processed Plastic Pellets In Porous Concrete By Partially Replacing Fine Aggregates</td><td className="px-4 py-2">ICBCCE</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">22-01-2017</td></tr>
                        <tr><td className="px-4 py-2">9</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">An Experimental Analysis on usage potential of lateritic soils as part/Full Replacement for fine aggregates in Concrete</td><td className="px-4 py-2">IIT Madras</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">22-01-2017</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>International Journals</summary>
                <div className="cst-dropdown-content">
                  <div className="text-gray-500 italic p-4">No data available.</div>
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>Patents</summary>
                <div className="cst-dropdown-content">
                  <div className="text-gray-500 italic p-4">No data available.</div>
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>Awards</summary>
                <div className="cst-dropdown-content">
                  <div className="text-gray-500 italic p-4">No data available.</div>
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>Memberships</summary>
                <div className="cst-dropdown-content">
                  <div className="text-gray-500 italic p-4">No data available.</div>
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>NPTEL</summary>
                <div className="cst-dropdown-content">
                  <div className="text-gray-500 italic p-4">No data available.</div>
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>Faculty Outreach</summary>
                <div className="cst-dropdown-content">
                  <div className="text-gray-500 italic p-4">No data available.</div>
                </div>
              </details>
              <details className="cst-dropdown">
                <summary>Funded Projects, FDP's</summary>
                <div className="cst-dropdown-content">
                  <div className="text-gray-500 italic p-4">No data available.</div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">LIBRARY</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Image on the left */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/images/departments/ce/cse-lib.jpg"
                  alt="Faculty Incharge"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
              {/* Paragraph content on the right */}
              <div className="md:w-1/2">
                <p className="text-lg font-sans">
                  Department Library offers a variety of books related to Civil Engineering. Reference books of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are issued to students and staff. Students can access the Library facility according to their convenience any time round-the-clock.
                </p>
              </div>
            </div>
            {/* Table below the image and paragraph content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow border">
                <div className="bg-[#B22222] text-white rounded-t-lg py-2">
                  <h5 className="mb-0 text-center text-lg font-semibold">No. of Titles</h5>
                </div>
                <div className="py-4">
                  <p className="text-red-600 font-bold text-center text-xl">244</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow border">
                <div className="bg-green-600 text-white rounded-t-lg py-2">
                  <h5 className="mb-0 text-center text-lg font-semibold">No. of Volumes</h5>
                </div>
                <div className="py-4">
                  <p className="text-green-600 font-bold text-center text-xl">352</p>
                </div>
              </div>
            </div>
            {/* Faculty Incharge Details */}
            <div className="flex flex-col items-center mt-8">
              <h3 className="text-xl font-bold text-center">Faculty Incharge</h3>
              <p className="mt-4 text-lg">Mr. M.Prem Kumar Raju, Asst. Professor</p>
            </div>
          </div>
        );
      case 'R&D':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">R&amp;D</h2>
            <div className="space-y-6">
              {/* Dynamic R&D Activities */}
              {Object.keys(researchDevelopment).length > 0 ? (
                Object.entries(researchDevelopment).map(([activityType, activities]: [string, any]) => (
                  <div key={activityType}>
                    <h3 className="text-xl font-semibold text-[#B22222] mb-4">{activityType}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activities.map((activity: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-semibold text-lg mb-2">{activity.activity_title}</h4>
                          {activity.description && (
                            <p className="text-gray-700 mb-2">{activity.description}</p>
                          )}
                          {activity.faculty_name && (
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Faculty:</strong> {activity.faculty_name}
                            </p>
                          )}
                          {activity.funding_agency && (
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Funding Agency:</strong> {activity.funding_agency}
                            </p>
                          )}
                          {activity.funding_amount && (
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Amount:</strong> ₹{activity.funding_amount.toLocaleString()}
                            </p>
                          )}
                          {activity.status && (
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${activity.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                              activity.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                              {activity.status}
                            </span>
                          )}
                          {activity.document_url && (
                            <a
                              href={activity.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-[#B22222] hover:underline"
                            >
                              View Document
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Fallback static content if API fails
                <div className="text-center text-gray-600">
                  <p>Science and Engineering Research Board, Department of Science &amp; Technology, Government of India, New Delhi Sponsored A Two Day National Workshop on "Nano Applications in Civil Engineering" on 12th &amp; 13th April, 2017</p>
                </div>
              )}
            </div>
          </div>
        );
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
                      onClick={() => switchDeptTab(section)}
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

              {/* Department Overview with HOD Profile */}
              {activeDeptTab === 'Department' && (
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-fade-in">
                  <div className="md:w-1/3">
                    <img
                      src="/Civilhod.png"
                      alt="Dr. G. Radhakrishnan"
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold text-[#B22222] mb-2">Dr. G. Radhakrishnan</h3>
                    <p className="text-gray-700 mb-2">Professor & Head of the Department</p>
                    <p className="text-gray-700 mb-2">Qualification: M.E., Ph.D</p>
                    <p className="text-gray-700 mb-2">
                      <a href="mailto:hod_civil@srivasaviengg.ac.in" className="text-[#B22222] hover:underline">hod_civil@srivasaviengg.ac.in</a>
                    </p>
                  </div>
                </div>
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
                                switchDeptTab(section);
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

      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>
            <div className="space-y-4">
              <details open className="cst-dropdown">
                <summary>Class Timetables</summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    {classTimetables.length > 0 ? (
                      classTimetables.map((item: any, index: number) => (
                        <li key={item.id || index}>
                          {item.title || item.name} -{' '}
                          <a 
                            href={item.url || item.link} 
                            className="text-[#B22222] hover:underline" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View Details
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic">No class timetables available.</li>
                    )}
                  </ul>
                </div>
              </details>

              <details className="cst-dropdown">
                <summary>Class Rooms</summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    {classRooms.length > 0 ? (
                      classRooms.map((item: any, index: number) => (
                        <li key={item.id || index}>
                          {item.title || item.name} -{' '}
                          <a 
                            href={item.url || item.link} 
                            className="text-[#B22222] hover:underline" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View Details
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic">No class rooms data available.</li>
                    )}
                  </ul>
                </div>
              </details>

              <details open className="cst-dropdown">
                <summary>Class Laboratories</summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    {laboratories.length > 0 ? (
                      laboratories.map((item: any, index: number) => (
                        <li key={item.id || index}>{item.title || item.name}</li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic">No laboratories data available.</li>
                    )}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case "Workshops":
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Workshops
            </h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Workshops & Training Programs</summary>
                <div className="cst-dropdown-content">
                  {Array.isArray(workshops) && workshops.length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {workshops.map((item) => (
                        <li key={item.id}>
                          <span className="font-medium">{item.name}</span>
                          {item.year && <span className="text-gray-600"> ({item.year})</span>}
                          {item.category && <span className="text-gray-500 text-sm"> - {item.category}</span>}
                          {item.url && (
                            <>
                              {' - '}
                              <a
                                href={item.url}
                                className="text-[#B22222] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Details
                              </a>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic py-4">No workshops available.</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );

      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
            <div className="space-y-8">
              <p className="text-lg mb-4">
                In this institution, INSTITUTION OF ENGINEERING (INDIA) students' chapter was opened in Civil Engineering Department in the year 2017 with 117 student members. It is promoting co-operation amongst students and faculty for advancement and dissemination of knowledge in the field of Civil Engineering. The IE students' chapter committee constitutes the following members:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border mb-4 table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 w-1/3">Designation</th>
                      <th className="px-4 py-2">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">Members</td>
                      <td className="px-4 py-2">
                        1. K.J.Ganapathi<br />
                        2. N.G.Lokesh<br />
                        3. T.Teja<br />
                        4. Y.Harika
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
                <img
                  src="/images/departments/ce/civil_ie_img2.jpg"
                  alt="IEI Event 1"
                  className="rounded-lg shadow-lg mb-4 max-w-xs object-contain"
                  style={{ height: '100%' }}
                />
                <img
                  src="/images/departments/ce/civil_ie_img3.jpg"
                  alt="IEI Event 2"
                  className="rounded-lg shadow-lg mb-4 max-w-xs object-contain"
                  style={{ height: '100%' }}
                />
              </div>
            </div>
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Newsletters
            </h2>
            <div className="space-y-6">
              {Array.isArray(newsletters) && newsletters.length > 0 ? (
                newsletters.map((item, index) => (
                  <details key={item.id} open={index === 0} className="cst-dropdown">
                    <summary>
                      Newsletter Issue {item.issue}
                    </summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        <li>
                          Newsletter Issue {item.issue} –{" "}
                          <a
                            href={item.url}
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Details
                          </a>
                        </li>
                      </ul>
                    </div>
                  </details>
                ))
              ) : (
                <p>No newsletters available</p>
              )}
            </div>

            <h2 className="text-3xl font-bold text-[#B22222] mt-12 mb-6 text-center">
              Technical Magazines
            </h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>
                  Technical Magazine
                </summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    <li>
                      Technical Magazine –{" "}
                      <a
                        href="#"
                        className="text-[#B22222] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Extra-Curricular Activities
            </h2>
            <div className="space-y-4">
              <details open className="cst-dropdown">
                <summary>
                  Extracurricular Activities - 2018-19
                </summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    <li>
                      <a
                        href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/Extra_curricular_activities.pdf"
                        className="text-[#B22222] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="cst-dropdown">
                <summary>
                  Extracurricular Activities - 2017-18
                </summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    <li>
                      <a
                        href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/ENGINEERS%20DAY(2017-2018).pdf"
                        className="text-[#B22222] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Consultancy':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Consultancy</h2>
            <div className="space-y-6">
              {/* Dynamic Consultancy Activities */}
              {consultancyActivities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {consultancyActivities.map((consultancy: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-lg mb-2">{consultancy.project_title}</h4>
                      {consultancy.description && (
                        <p className="text-gray-700 mb-2">{consultancy.description}</p>
                      )}
                      {consultancy.client_name && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Client:</strong> {consultancy.client_name}
                        </p>
                      )}
                      {consultancy.faculty_involved && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Faculty Involved:</strong> {consultancy.faculty_involved}
                        </p>
                      )}
                      {consultancy.project_value && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Project Value:</strong> ₹{consultancy.project_value.toLocaleString()}
                        </p>
                      )}
                      {consultancy.project_type && (
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                          {consultancy.project_type}
                        </span>
                      )}
                      {consultancy.document_url && (
                        <a
                          href={consultancy.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-[#B22222] hover:underline"
                        >
                          View Document
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // Fallback static content if API fails
                <div>
                  <details open className="cst-dropdown">
                    <summary>Consultancy Details for the Academic Year</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202022-2023.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2022-2023
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202021-2022.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2021-2022
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202020-2021.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2020-2021
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202019-2020.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2019-2020
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202018-2019.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2018-2019
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202017-2018.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2017-2018
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202016-2017.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2016-2017
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202015-2016.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2015-2016
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202014-2015.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2014-2015
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202013-2014.pdf"
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consultancy Details 2013-2014
                          </a>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        );

      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Syllabus
            </h2>
            <div className="space-y-4">
              {Array.isArray(Syllabus) && Syllabus.length > 0 ? (
                Syllabus.map((item, index) => (
                  <details key={index} open className="cst-dropdown">
                    <summary>{item.program}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        <li>
                          <a
                            href={item.url}
                            className="text-[#B22222] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Syllabus
                          </a>
                        </li>
                      </ul>
                    </div>
                  </details>
                ))
              ) : (
                <p className="text-center text-gray-600">No syllabus available</p>
              )}
            </div>
          </div>
        );

      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
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
      <DepartmentSidebar
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        title="Civil Engineering Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default CivilDepartment;
