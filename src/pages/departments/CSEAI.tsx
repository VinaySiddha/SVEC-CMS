
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const CSTDepartment: React.FC = () => {
  // API-driven state
  const [faculty, setFaculty] = React.useState<any[]>([]);
  const [TechnicalFaculty, setTechnicalFaculty] = React.useState<any[]>([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = React.useState<any[]>([]);
  const [handbooks, setHandbooks] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [mous, setMous] = useState([]);

  // Dynamic content state
  const [dynamicSidebarItems, setDynamicSidebarItems] = useState<any[]>([]);
  const [placementBatches, setPlacementBatches] = useState<any[]>([]);
  const [placementGallery, setPlacementGallery] = useState<any>({});
  const [eresources, setEresources] = useState<any[]>([]);

  // Additional dynamic content state
  const [departmentInfo, setDepartmentInfo] = useState<any[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<any[]>([]);
  const [facultyDevelopmentPrograms, setFacultyDevelopmentPrograms] = useState<any>({});
  const [facultyAchievements, setFacultyAchievements] = useState<any>({});
  const [workshops, setWorkshops] = useState<any>({});
  const [meritScholarships, setMeritScholarships] = useState<any[]>([]);
  const [extraCurricularActivities, setExtraCurricularActivities] = useState<any[]>([]);
  const [technicalAssociationActivities, setTechnicalAssociationActivities] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [trainingActivities, setTrainingActivities] = useState<any>({});
  const [physicalFacilities, setPhysicalFacilities] = useState<any>({});
  const [departmentLibrary, setDepartmentLibrary] = useState<any[]>([]);
  const [boardOfStudies, setBoardOfStudies] = useState<any[]>([]);
  const [departmentContact, setDepartmentContact] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/cai-handbooks')
      .then(res => {
        const data = res.data;
        setHandbooks(data);
        const groupedData: { [key: string]: any[] } = {};
        data.forEach((entry: any) => {
          const key = `Academic year ${entry.academic_year}: ${entry.semester}`;
          if (!groupedData[key]) groupedData[key] = [];
          groupedData[key].push(entry);
        });
        setGrouped(groupedData);
      })
      .catch(err => {
        console.error('Failed to fetch handbooks:', err);
      });
  }, []);

  useEffect(() => {
    fetch('/api/mous') // backend API URL
      .then((res) => res.json())
      .then((data) => setMous(data))
      .catch((err) => console.error("Error fetching MOUs:", err));
  }, []);

  React.useEffect(() => {
    fetch('/api/cai-faculty-profiles?dept=cseai')
      .then(res => res.json())
      .then((data) => {
        setFaculty(data); // directly set data, no type filter for now
      });
  }, []);


  React.useEffect(() => {
    fetch("/api/cai-technical-faculty?dept=cseai")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.technical)
        setTechnicalFaculty(data.technical || []);
      });
  }, []);

  React.useEffect(() => {
    fetch("/api/cai-non-teaching-staff?dept=cseai")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setNonTeachingFaculty(data.nonTeaching || []);
      });
  }, []);

  // Fetch dynamic sidebar items
  useEffect(() => {
    fetch('/api/cseai/sidebar-items?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDynamicSidebarItems(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch sidebar items:', err));
  }, []);

  // Fetch placement batches
  useEffect(() => {
    fetch('/api/cseai/placement-batches?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPlacementBatches(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch placement batches:', err));
  }, []);

  // Fetch placement gallery
  useEffect(() => {
    fetch('/api/cseai/placement-gallery?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPlacementGallery(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch placement gallery:', err));
  }, []);

  // Fetch e-resources
  useEffect(() => {
    fetch('/api/cseai/eresources?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEresources(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch e-resources:', err));
  }, []);

  // Fetch department info sections
  useEffect(() => {
    fetch('/api/cseai/department-info?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDepartmentInfo(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch department info:', err));
  }, []);

  // Fetch student achievements
  useEffect(() => {
    fetch('/api/cseai/student-achievements?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStudentAchievements(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch student achievements:', err));
  }, []);

  // Fetch faculty development programs
  useEffect(() => {
    fetch('/api/cseai/faculty-development-programs?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFacultyDevelopmentPrograms(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch faculty development programs:', err));
  }, []);

  // Fetch faculty achievements
  useEffect(() => {
    fetch('/api/cseai/faculty-achievements?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFacultyAchievements(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch faculty achievements:', err));
  }, []);

  // Fetch workshops
  useEffect(() => {
    fetch('/api/cseai/workshops?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWorkshops(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch workshops:', err));
  }, []);

  // Fetch merit scholarships
  useEffect(() => {
    fetch('/api/cseai/merit-scholarships?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMeritScholarships(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch merit scholarships:', err));
  }, []);

  // Fetch extra-curricular activities
  useEffect(() => {
    fetch('/api/cseai/extra-curricular?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setExtraCurricularActivities(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch extra-curricular activities:', err));
  }, []);

  // Fetch technical association activities
  useEffect(() => {
    fetch('/api/cseai/technical-association?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTechnicalAssociationActivities(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch technical association activities:', err));
  }, []);

  // Fetch newsletters
  useEffect(() => {
    fetch('/api/cseai/newsletters?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNewsletters(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch newsletters:', err));
  }, []);

  // Fetch hackathons
  useEffect(() => {
    fetch('/api/cseai/hackathons?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHackathons(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch hackathons:', err));
  }, []);

  // Fetch training activities
  useEffect(() => {
    fetch('/api/cseai/training-activities?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTrainingActivities(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch training activities:', err));
  }, []);

  // Fetch physical facilities
  useEffect(() => {
    fetch('/api/cseai/physical-facilities?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPhysicalFacilities(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch physical facilities:', err));
  }, []);

  // Fetch department library
  useEffect(() => {
    fetch('/api/cseai/department-library?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDepartmentLibrary(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch department library:', err));
  }, []);

  // Fetch board of studies
  useEffect(() => {
    fetch('/api/cseai/board-of-studies?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBoardOfStudies(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch board of studies:', err));
  }, []);

  // Fetch department contact
  useEffect(() => {
    fetch('/api/cseai/contact?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDepartmentContact(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch department contact:', err));
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

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
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'Activity': return <Activity {...iconProps} />;
      case 'Rss': return <Rss {...iconProps} />;
      case 'Wifi': return <Wifi {...iconProps} />;
      case 'FileText': return <FileText {...iconProps} />;
      case 'Phone': return <Phone {...iconProps} />;
      default: return <Building {...iconProps} />;
    }
  };

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
      { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
    ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 mb-3">
              Department of Computer Science and Artificial Intelligence came into inception from 2021 onwards with an intake of 60 seats in B.Tech. From 2022 onwards the intake was increased to 120 seats. From 2025 onwards the intake was increased to 180 seats.
            </p>

            <h4 className="text-xl font-bold text-[#850209] mb-4">Courses Offered</h4>
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
                    <td className="px-6 py-4">B.Tech - CSE (Artificial Intelligence)</td>
                    <td className="px-6 py-4">AP EAPCET</td>
                    <td className="px-6 py-4">4 Years</td>
                    <td className="px-6 py-4">60</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To evolve as a center of excellence in CSE-Artificial Intelligence education, producing professionally competent and socially responsible technologists.
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
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and CSE-Artificial Intelligence principles.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Analyze real-life problems and design socially responsible and environmentally sustainable technology-based solutions.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Adapt to evolving technologies through continuous learning and professional development.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 4</h4>
                <p className="text-gray-700">Lead a successful career as a team member or leader with strong professional ethics and communication skills.</p>
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
                <p className="text-gray-700">Apply knowledge of mathematics, science, engineering fundamentals, and CSE-Artificial Intelligence principles to solve complex engineering problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, research literature, and analyze complex engineering problems using principles of mathematics, natural sciences, and engineering sciences.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Design/Development of Solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and system components that meet specified needs with appropriate consideration for public health, safety, and environmental concerns.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO4: Modern Tool Usage</h4>
                <p className="text-gray-700">Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools for complex engineering activities.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO5: The Engineer and Society</h4>
                <p className="text-gray-700">Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal and cultural issues relevant to professional engineering practice.</p>
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
                <p className="text-gray-700">Apply knowledge of CSE-Artificial Intelligence principles to design and develop efficient software solutions.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 2</h4>
                <p className="text-gray-700">Demonstrate proficiency in emerging technologies and adapt to technological changes in the computing field.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 3</h4>
                <p className="text-gray-700">Work effectively in multidisciplinary teams and communicate technical concepts clearly to diverse audiences.</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the CSE-Artificial Intelligence department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/cst/COs.pdf"
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
              <li>Modern curriculum designed to meet industry requirements</li>
              <li>Well-equipped computer laboratories with latest software</li>
              <li>Experienced faculty with industry and research background</li>
              <li>Strong emphasis on practical learning and project-based education</li>
              <li>Regular industry interactions and guest lectures</li>
              <li>Focus on emerging technologies and innovation</li>
              <li>Active student clubs and technical societies</li>
              <li>Excellent placement record with top companies</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              The Department of CSE-Artificial Intelligence was established in 2019. The department offers undergraduate program in CSE-Artificial Intelligence with an intake of 60 students.
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
              <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Department Profile</h2>

              {/* HOD Section */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">Head of Department</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center">
                    <div className="relative">
                      <img
                        src="/aihod.jpg"
                        alt="Dr. G. Loshma"
                        className="w-48 h-48 object-cover rounded-xl shadow-md"
                        style={{ aspectRatio: '1/1' }}
                      />
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Dr. G. Loshma</h4>
                    <p className="text-gray-600 mb-4">Head of Department, CSE-AI</p>
                    <p className="text-gray-700 leading-relaxed mb-2">Ph.D in Computer Science, M.Tech CSE</p>
                    <p className="text-gray-700 leading-relaxed">
                      Email: <a href="mailto:hod_aim@srivasaviengg.ac.in" className="text-[#B22222] hover:underline">hod_aim@srivasaviengg.ac.in</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Department Profile Navigation - Grid Layout */}
              <div className="mb-8 mt-12">
                {/* Row 1: Department, Vision */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={() => setActiveDeptTab('Department')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Department'
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Department
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('Vision')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Vision'
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Vision
                  </button>
                </div>

                {/* Row 2: Mission, PEOs, POs */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={() => setActiveDeptTab('Mission')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Mission'
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('PEOs')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PEOs'
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    PEOs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('POs')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'POs'
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    POs
                  </button>
                </div>

                {/* Row 3: PSOs, COs */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={() => setActiveDeptTab('PSOs')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PSOs'
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    PSOs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('COs')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'COs'
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    COs
                  </button>
                </div>

                {/* Row 4: Salient Features (centered) */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setActiveDeptTab('SalientFeatures')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'SalientFeatures'
                      ? 'bg-[#B22222] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Salient Features
                  </button>
                </div>
              </div>

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
                    <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] p-4 border-b border-gray-700">
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
                                ? 'bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white shadow-lg scale-105'
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
                className="md:hidden fixed right-3 bottom-6 z-40 w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
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
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Student Achievements</h2>
            <div className="space-y-6">
              {/* Dynamic Student Achievements */}
              {studentAchievements.length > 0 ? (
                studentAchievements.map((category: any, categoryIndex: number) => (
                  <div key={categoryIndex}>
                    <h3 className="text-xl font-semibold text-[#850209] mb-4">
                      {category.category} - {category.academic_year}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((achievement: any, itemIndex: number) => (
                        <div key={itemIndex} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                          {achievement.description && (
                            <p className="text-gray-700 mb-2">{achievement.description}</p>
                          )}
                          {achievement.student_name && (
                            <p className="text-sm text-gray-600">
                              <strong>Student:</strong> {achievement.student_name}
                              {achievement.student_roll_no && ` (${achievement.student_roll_no})`}
                            </p>
                          )}
                          {achievement.document_url && (
                            <a
                              href={achievement.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-[#850209] hover:underline"
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
                  <p>Student achievements will be displayed here once data is available.</p>
                </div>
              )}
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Internships</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    Internships during the Academic Year 2024-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST_Internships during the 2024-25(prints).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Internships during the Academic Year 2023-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/Internships during the 2023-24.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Internships during the Academic Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/Internships during the 2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Internships during the Academic Year 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/Internships during the 2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Conference Publications</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    Student Journal Publications during the Academic Year 2023-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST_Student_Journal publications 2023-24.docx.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Conferences during the Academic Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST -conferences (22-23).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Roll of Honour</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Awards</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">GATE</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">GIF</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">NPTEL/Other Certifications</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    NPTEL &amp; Other Certifications during the Academic Year 2024-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/NPTEL & other certifications_CST_2024-25.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    NPTEL &amp; Other Certifications during the Academic Year 2023-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/cst  nptel 2023-24.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    NPTEL &amp; Other Certifications during the Academic Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST_Nptel during & other certifications2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    NPTEL Certified Student List Jan–Apr 2019 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/NPTEL Certified Student List Jan_Apr_2019.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Community Service Project</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Student Research Projects</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>
            </div>
          </div>
        );

      case 'Syllabus': {
        function RenderSyllabus() {
          const [syllabus, setSyllabus] = React.useState<any[]>([]);
          const [loading, setLoading] = React.useState(true);

          React.useEffect(() => {
            fetch("/api/syllabus?dept=cseai")
              .then((res) => res.json())
              .then((data) => {
                setSyllabus(Array.isArray(data) ? data : []);
                setLoading(false);
              })
              .catch(() => setLoading(false));
          }, []);

          if (loading) {
            return (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Syllabus</h2>
                <div className="text-center text-gray-600">Loading syllabus...</div>
              </div>
            );
          }

          // group by category
          const grouped = syllabus.reduce((acc: any, item: any) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
          }, {});

          return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Syllabus</h2>
              <div className="space-y-6">
                {Object.entries(grouped).map(([category, items]: any) => (
                  <details key={category} className="border rounded-lg p-4" open>
                    <summary className="text-lg font-semibold cursor-pointer">
                      {category}
                    </summary>
                    <ul className="list-disc pl-6 my-2">
                      {items.map((item: any) => (
                        <li key={item.id}>
                          {item.title} ({item.year}) -{" "}
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#850209] hover:underline"
                          >
                            View
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          );
        }

        return <RenderSyllabus />;
      }

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Teaching Faculty</h2>
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
                        <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                          <td className="px-6 py-4">{member.qualification}</td>
                          <td className="px-6 py-4">{member.designation}</td>
                          <td className="px-6 py-4">
                            <a
                              href={member.profileUrl}
                              target="_self"
                              className="font-medium text-blue-600 hover:underline transition-colors duration-200"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Staff</h2>
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
                      {TechnicalFaculty.map((member, index) => (
                        <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                          <td className="px-6 py-4">{member.designation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Non-Teaching Staff</h2>
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
                        <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                          <td className="px-6 py-4">{member.designation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'e-Resources':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
                e-Resources
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Innovations by the Faculty in Teaching and Learning. Activities of
                the department towards improvement in teaching-learning are
                indicated in the office records as well as on the college website.
                They are open for reproduction, further improvement, and review.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Some of the methods adopted by the faculty members in Teaching &
                Learning are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Presentations using PPT, wherever necessary.</li>
                <li>Technical videos for demonstration of certain concepts.</li>
                <li>
                  Usage of Software's like Rational Rose, R Software to
                  demonstrate the concepts practically.
                </li>
                <li>
                  Use of E-Learning Resources like NPTEL lectures, Online
                  journals, and Online lectures like QEEE & MOOCS for effective
                  learning.
                </li>
                <li>
                  Providing Question bank with short answer questions and quiz
                  questions.
                </li>
                <li>Student paper and poster presentations.</li>
                <li>Student seminars.</li>
                <li>
                  Conducting peer group learning to encourage the slow learners.
                </li>
                <li>
                  Student participation in skill tests and technical events.
                </li>
                <li>
                  To incorporate real-time problem-solving skills, we are using
                  online tools like EBOX, EDYST etc.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-[#850209] mb-4">(i) Innovations in Teaching and Learning</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Project Based Learning</li>
                <li>Z TO A Approach</li>
                <li>NPTEL Web and Video Courses</li>
                <li>PPTs</li>
                <li>Question Banks</li>
                <li>Mind Map</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#850209] mb-4">(ii) Tools used in Teaching and Learning</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>LMS</li>
                <li>Conduira</li>
                <li>PEARSON MePro</li>
                <li>EBox</li>
                <li>Edyst</li>
              </ul>

              <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">V20- Subjects</h3>
              <div className="overflow-x-auto mb-8">
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
                    {/* Dynamic e-resources content */}
                    {eresources.length > 0 ? (
                      eresources.map((category, categoryIndex) => (
                        category.items.map((item: any, itemIndex: number) => (
                          <tr key={`${categoryIndex}-${itemIndex}`} className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">{itemIndex + 1}</td>
                            <td className="py-3 px-4 border-b">{item.academic_year}</td>
                            <td className="py-3 px-4 border-b">{item.semester}</td>
                            <td className="py-3 px-4 border-b">{item.title}</td>
                            <td className="py-3 px-4 border-b">
                              <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                            </td>
                          </tr>
                        ))
                      )).flat()
                    ) : (
                      // Fallback static content if API fails
                      <>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">1</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">I</td>
                          <td className="py-3 px-4 border-b">Problem Solving through C-Programming</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/PCPS-V20.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">2</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">III</td>
                          <td className="py-3 px-4 border-b">Data Structures</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DS_V20.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">3</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">III</td>
                          <td className="py-3 px-4 border-b">Computer Organization and Architecture</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/COA_notes_V20.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">4</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">III</td>
                          <td className="py-3 px-4 border-b">OOP's through C++</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/OOPS.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">5</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">III</td>
                          <td className="py-3 px-4 border-b">Managerial Economics and Financial Analysis</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/MEFA.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">6</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">III</td>
                          <td className="py-3 px-4 border-b">Mathematical Foundation Of Computer Science</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/MFCS V20 material.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">7</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">IV</td>
                          <td className="py-3 px-4 border-b">Design Analysis of Algorithms</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DAA Material.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">8</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">IV</td>
                          <td className="py-3 px-4 border-b">Java Programming</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/Java V20 all units content.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">9</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">IV</td>
                          <td className="py-3 px-4 border-b">Software Engineering</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/SE NOTES.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">10</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">IV</td>
                          <td className="py-3 px-4 border-b">Statistical Visualization using R Lab</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/SVR LAB.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">11</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">V</td>
                          <td className="py-3 px-4 border-b">Artificial Intelligence</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/AI.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">12</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">V</td>
                          <td className="py-3 px-4 border-b">Data Mining</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DATA MINING.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">13</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">V</td>
                          <td className="py-3 px-4 border-b">Web Technologies</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/Web_Technologies.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b">14</td>
                          <td className="py-3 px-4 border-b">V20</td>
                          <td className="py-3 px-4 border-b">VI</td>
                          <td className="py-3 px-4 border-b">Unified Modeling Language Lab</td>
                          <td className="py-3 px-4 border-b">
                            <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/UML LAB.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">V18- Subjects</h3>
              <div className="overflow-x-auto mb-8">
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
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">1</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">I/II</td>
                      <td className="py-3 px-4 border-b">Programming in C for Problem Solving</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/cprogrammingppts.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">III</td>
                      <td className="py-3 px-4 border-b">Object Oriented Programming for Problem Solving</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/ADSPPTS.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">4</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">III</td>
                      <td className="py-3 px-4 border-b">Digital Electronics</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/DE_Cse_II_Sem.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">5</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">III</td>
                      <td className="py-3 px-4 border-b">Data Mining</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/III_Sem_DM MATERIAL.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">6</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">IV</td>
                      <td className="py-3 px-4 border-b">Computer Organization</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/Computer Organization.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">7</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">IV</td>
                      <td className="py-3 px-4 border-b">Software Engineering</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/SEPPTs.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">8</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">IV</td>
                      <td className="py-3 px-4 border-b">Python Programming</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">9</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">IV</td>
                      <td className="py-3 px-4 border-b">Java Programming</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/Java Materials.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">10</td>
                      <td className="py-3 px-4 border-b">V18</td>
                      <td className="py-3 px-4 border-b">IV</td>
                      <td className="py-3 px-4 border-b">Formal Languages and Automata Theory</td>
                      <td className="py-3 px-4 border-b">
                        <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/FLATPPTS.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            );

            case 'Board of Studies':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
                  Board of Studies
                </h2>

                {/* Dynamic Board of Studies */}
                {boardOfStudies.length > 0 ? (
                  <div className="space-y-4">
                    {boardOfStudies.map((meeting: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2">{meeting.meeting_title}</h3>
                        {meeting.meeting_date && (
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Date:</strong> {new Date(meeting.meeting_date).toLocaleDateString('en-GB')}
                          </p>
                        )}
                        {meeting.meeting_number && (
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Meeting Number:</strong> {meeting.meeting_number}
                          </p>
                        )}
                        {meeting.description && (
                          <p className="text-gray-700 mb-3">{meeting.description}</p>
                        )}
                        {meeting.document_url && (
                          <a
                            href={meeting.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-[#850209] hover:underline"
                          >
                            View Minutes
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback static content if API fails
                  <div className="text-center text-gray-600 mb-6">
                    <p>Board of Studies meetings will be displayed here once data is available.</p>
                  </div>
                )}
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
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-200">1</td>
                        <td className="py-3 px-4 border-b border-gray-200">Dr. D Jaya Kumari</td>
                        <td className="py-3 px-4 border-b border-gray-200">Professor & HOD</td>
                        <td className="py-3 px-4 border-b border-gray-200">Dept of CSE, SVEC</td>
                        <td className="py-3 px-4 border-b border-gray-200">Chairperson</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-200">2</td>
                        <td className="py-3 px-4 border-b border-gray-200">Dr. A Krishna Mohan</td>
                        <td className="py-3 px-4 border-b border-gray-200">Professor of CSE</td>
                        <td className="py-3 px-4 border-b border-gray-200">JNTUK, Kakinada</td>
                        <td className="py-3 px-4 border-b border-gray-200">University Nominee</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-200">3</td>
                        <td className="py-3 px-4 border-b border-gray-200">Dr. R.B.V Subramaanyam</td>
                        <td className="py-3 px-4 border-b border-gray-200">Professor of CSE</td>
                        <td className="py-3 px-4 border-b border-gray-200">NITW</td>
                        <td className="py-3 px-4 border-b border-gray-200">Academic Expert</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-200">4</td>
                        <td className="py-3 px-4 border-b border-gray-200">Dr. S Pallam Setty</td>
                        <td className="py-3 px-4 border-b border-gray-200">Professor of CSE</td>
                        <td className="py-3 px-4 border-b border-gray-200">Andhra University</td>
                        <td className="py-3 px-4 border-b border-gray-200">Academic Expert</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-200">5</td>
                        <td className="py-3 px-4 border-b border-gray-200">Mr. SrinivasaRaju Vuppalapati</td>
                        <td className="py-3 px-4 border-b border-gray-200">Senior Consultant</td>
                        <td className="py-3 px-4 border-b border-gray-200">MSR IT Services LLP</td>
                        <td className="py-3 px-4 border-b border-gray-200">Industry Expert</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-200">6</td>
                        <td className="py-3 px-4 border-b border-gray-200">Mr. Eedala Rambabu</td>
                        <td className="py-3 px-4 border-b border-gray-200">Member of Technical Staff2</td>
                        <td className="py-3 px-4 border-b border-gray-200">Amadeus, Bangalore</td>
                        <td className="py-3 px-4 border-b border-gray-200">Alumni CSE Dept</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b border-gray-200">7</td>
                        <td className="py-3 px-4 border-b border-gray-200" colSpan={2}>
                          All the Faculty Members in the CSE Dept.
                        </td>
                        <td className="py-3 px-4 border-b border-gray-200" colSpan={2}>Members in BOS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-col justify-center items-center mb-5">
                <h4 className="text-xl font-semibold text-[#850209] mb-4">Board of Studies Meeting Minutes:</h4>
                <ul className="my-2 space-y-3 list-none">
                  <li className="text-center">
                    Minutes of 8<sup>th</sup> meeting of the Board of Studies, dated 19.07.2025 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/Minutes of 8th meeting of the Board of Studies, dates 19.07.2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                  <li className="text-center">
                    Minutes of 7<sup>th</sup> meeting of the Board of Studies, dated 18.07.2024 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cst/Minutes of 7th BOS Meeting_18.07.2024.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                  <li className="text-center">
                    Minutes of 6<sup>th</sup> meeting of the Board of Studies, dated 25.07.2022 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%206th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2025.07.2022.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                  <li className="text-center">
                    Minutes of 5<sup>th</sup> meeting of the Board of Studies, dated 02.09.2021 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%205th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2002.09.2021.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                  <li className="text-center">
                    Minutes of 4<sup>th</sup> meeting of the Board of Studies, dated 29.12.2020 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%204th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2029.12.2020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                  <li className="text-center">
                    Minutes of 3<sup>rd</sup> meeting of the Board of Studies, dated 31.05.2020 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%203rd%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2031.05.2020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                  <li className="text-center">
                    Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 20.04.2019 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%202nd%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2020.04.2019.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                  <li className="text-center">
                    Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 02.06.2018 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%201st%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%20%2002.06.2018.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Department Library
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              {/* Image on the left */}
              <div className="md:w-1/2">
                <img
                  src="https://srivasaviengg.ac.in/images/departments/cse/cse-lib.jpg"
                  alt="CSE Department Library"
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
              {/* Paragraph content on the right */}
              <div className="md:w-1/2">
                <p className="text-gray-700 text-lg text-justify">
                  Department Library offers a variety of books related to Computer Science and Basic Science subjects. Reference books
                  of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are
                  issued to students and staff. Students can access the Library facility according to their convenience any time
                  round-the-clock.
                </p>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                <h5 className="text-lg font-semibold text-center text-[#850209] mb-2">No. of Titles</h5>
                <p className="text-2xl font-bold text-red-600 text-center">455</p>
              </div>
              <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                <h5 className="text-lg font-semibold text-center text-green-700 mb-2">No. of Volumes</h5>
                <p className="text-2xl font-bold text-green-600 text-center">684</p>
              </div>
            </div>

            {/* Faculty Incharge Details */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-[#850209] mb-4">Faculty Incharge</h3>
              <ul className="text-center space-y-2 list-none">
                <li className="text-lg font-medium">Mrs. A. Naga Jyothi, Asst. Professor</li>
                <li className="text-lg">Phone: 08818-284355</li>
                <li className="text-lg">
                  E-mail: <a href="mailto:nagajyothi.cse@srivasaviengg.ac.in" className="text-[#850209] hover:underline">nagajyothi.cse@srivasaviengg.ac.in</a>
                </li>
              </ul>
            </div>
          </div>
        );



      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              MoUs
            </h2>

            <h3 className="text-xl font-semibold text-[#850209] mb-4 text-center">
              A. MOUs with Industries
            </h3>
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
                  {mous.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No MOUs found
                      </td>
                    </tr>
                  ) : (
                    mous.map((mou: any, index: number) => (
                      <tr key={mou.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">{index + 1}</td>
                        <td className="py-3 px-4 border-b">{mou.organization_name}</td>
                        <td className="py-3 px-4 border-b">
                          {new Date(mou.start_date).toLocaleDateString("en-GB")}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {mou.end_date
                            ? new Date(mou.end_date).toLocaleDateString("en-GB")
                            : "Till Date"}
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            className="text-[#850209] hover:underline"
                            href={mou.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-[#850209] mb-4">
              B. Interaction with the Industry
            </h3>
            <div className="flex justify-center mb-6">
              <ul className="space-y-4 list-none max-w-3xl">
                <li className="py-2">
                  Various Programs organized during Academic Year 2024-25 -
                  <a
                    href="https://www.srivasaviengg.ac.in/uploads/csemous/Industry data ( 2024-2025).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2023-24 -
                  <a
                    href="https://www.srivasaviengg.ac.in/uploads/csemous/Industry%20data%20%202023-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2022-23 -
                  <a
                    href="https://www.srivasaviengg.ac.in/uploads/csemous/Industry%20data%20%202022-23.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2021-22 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2021-2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2020-21 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2020-2021.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Physical Facilities</h2>

            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Class Rooms</summary>
                <div className="mt-3 space-y-3">
                  <div>
                    <h5 className="text-md font-semibold mb-2">Class Rooms</h5>
                    <ul className="list-disc pl-6 my-2">
                      <li>
                        Class Rooms with ICT Enabled Facilities -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-md font-semibold mb-2">Class Time Tables</h5>
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      <li>
                        Master Timetable A.Y for Sem-I 2025-26 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2025-26_ III, V, VII SEM _CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-II 2024-25 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Time%20Table_2024-25_%20II%20SEM%20_CST%20(1).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2024-25 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Timetable_A.Y%20for%20Sem-I%202024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-II 2023-24 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Time%20Table_2023-24_%20II%20SEM%20_CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2023-24 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2022-23_ III, V, VII SEM _CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2022-23 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2022-23_ III, V, VII SEM _CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-II 2023-24 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/uploads/cst/CST_Master Time Table_2022-23_ II SEM _CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2022-23 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/CST_Master Time Table_A.Y. 2022-23_ I SEM.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-II 2021-22 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table _CST_II SEM_A.Y 2021-22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2021-22 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table _CST_I SEM_A.Y 2021-22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Seminar Halls</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    Seminar halls with ICT Enabled Facilities -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Laboratories</summary>
                <div className="space-y-4">
                  <p className="mt-3 text-gray-700">
                    The Department has well equipped labs with the latest Configuration. Total 9 Computer Labs for UG, PG and one research lab consisting a total of 674 systems. The various servers in the server room include Oracle 11g Database Server, Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation Server, A-Mail Server, ECAP Server, LMS Server.
                  </p>
                  <p className="text-gray-700">
                    The college has high speed internet connectivity throughout the campus through a leased line from BSNL with 1Gbps, 500Mbps from Blueifi.
                  </p>
                  <p className="text-gray-700">The following Laboratories are available in the department:</p>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold my-2">James Gosling Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b" rowSpan={3}>James Gosling Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: HP Pro Tower 280 G9<br />
                                Processor: Intel® Core™ i5-13500 CPU @ 2.50 GHz<br />
                                16.00GB RAM, 500GB SSD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 21.5” LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model: ASUS VIVO AIO V222 GAR_V333GA<br />
                                Processor: Intel® Pentium® Silver J5040<br />
                                8.00 GB RAM, 256.00 GB SSD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 21.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">EF Codd Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b" rowSpan={2}>EF Codd Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: HP Pro Tower 280 G9<br />
                                Processor: Intel® Core™ i5-12400 CPU @ 2.50 GHz<br />
                                16.00 GB RAM, 500.00 GB SSD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 19.5” LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">68</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model: Dell Optiplex 3020<br />
                                Processor: Intel® Core™ i3-9100 CPU @ 3.60 GHz<br />
                                8.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">06</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Linus Torvalds Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b" rowSpan={2}>Linus Torvalds Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: HP Pro Tower 280 G9<br />
                                Processor: Intel core TM i3-10100 CPU @ 3.64 GHz<br />
                                8.00 GB RAM, 500.00 GB SSD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 19.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">PGCP Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b" rowSpan={2}>PGCP Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: Acer Vertion Desktop System<br />
                                Processor: Intel® Core™ i3-8100 CPU @ 2.65 GHz<br />
                                8.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 21.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">71</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model: Acer Vertion Desktop System<br />
                                Processor: Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 19.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">R&D Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b" rowSpan={2}>R&amp;D Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: Acer Vertion Desktop System<br />
                                Processor: Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 17.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">03</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model: Dell 7D49KQR<br />
                                Processor: Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64-based processor<br />
                                Monitor: 21.5” LED Monitor<br />
                                Keyboard: Multimedia keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">07</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Yellow Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">Usage</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b">Yellow Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Pink Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">Usage</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b">Pink Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Orange Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">Usage</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b">Orange Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Green Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">Usage</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b">Green Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Brown Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">Usage</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b">Brown Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">PG CP Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Configuration</th>
                              <th className="py-3 px-4 border-b text-left">Usage</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b">PG CP Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: Acer Vertion I3 Desktop System<br />
                                Processor: Intel Core i3 -8100, 8th Gen<br />
                                8 GB DDR4 RAM, 1 TB Hard Disk Drive<br />
                                Monitor: 21.5” LED Monitor<br />
                                Keyboard: USB Keyboard<br />
                                Mouse: USB Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">AJWT, OOPS through C++ Lab</td>
                              <td className="py-3 px-4 border-b">70</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">R&amp;D Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Location</th>
                              <th className="py-3 px-4 border-b text-left">Usage</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b">R&amp;D Lab</td>
                              <td className="py-3 px-4 border-b">B-Block, First Floor</td>
                              <td className="py-3 px-4 border-b">To Carryout Research Activities by Students and Faculty Members</td>
                              <td className="py-3 px-4 border-b">30</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg" style={{ borderWidth: 2 }}>
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Development Programs</h2>

            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">FDP Attended</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    FDPs attended by the Faculty 2024-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST%20FDP's%20A.Y%202024-2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    FDPs attended by the Faculty 2023-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST%20FDPs%20in%20A.Y%202023-2024.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    FDPs attended by the Faculty 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202021-2022_CST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">FDP Conducted</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    FDPs conducted by the Department to the Faculty -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20faculty.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">FDPs/ Workshops/ Training Programmes Conducted</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    FDPs conducted by the Department to the Faculty -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20facultys.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-09-13-16.jpg" alt="Image 1" className="w-full h-auto rounded-lg shadow" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-09-13.jpg" alt="Image 2" className="w-full h-auto rounded-lg shadow" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-10-01-17.jpg" alt="Image 3" className="w-full h-auto rounded-lg shadow" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/FDP-2022100117.jpg" alt="Image 4" className="w-full h-auto rounded-lg shadow" />
                </div>
              </details>
            </div>
          </div>
        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Achievements</h2>

            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Journal Publications</summary>
                <ul className="list-disc pl-6 my-2"></ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Conferences</summary>
                <ul className="list-disc pl-6 my-2"></ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Book Publications</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Certifications</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    Certifications done by the faculty during the A.Y. 2024-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST%20Certifications%20A.Y%202024-2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      For more Details
                    </a>
                  </li>
                  <li>
                    Certifications done by the faculty during the A.Y. 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/Certifications%202021-2022_CST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      For more Details
                    </a>
                  </li>
                  <li>
                    Certifications done by the faculty during the A.Y. 2020-21 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/certifications%202020-2021_CST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      For more Details
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Patents</summary>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Research Supervisors</summary>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Faculty Out-Reach</summary>
              </details>
            </div>
          </div>
        );
      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Merit Scholarships and Academic Toppers</h2>

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
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">2023-24</td>
                    <td className="py-3 px-4 border-b">Academic Toppers</td>
                    <td className="py-3 px-4 border-b">21</td>
                    <td className="py-3 px-4 border-b">30750</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">2022-23</td>
                    <td className="py-3 px-4 border-b">Academic Toppers</td>
                    <td className="py-3 px-4 border-b">7</td>
                    <td className="py-3 px-4 border-b">7500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">3</td>
                    <td className="py-3 px-4 border-b">2021-22</td>
                    <td className="py-3 px-4 border-b">Academic Toppers</td>
                    <td className="py-3 px-4 border-b">15</td>
                    <td className="py-3 px-4 border-b">16250</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-center mb-4">Image Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <img
                src="https://srivasaviengg.ac.in/uploads/cst/20231014_123258PM_ByGPSMapCamera.jpg"
                alt="Merit Scholarship Event 1"
                className="w-full h-auto rounded-lg shadow object-cover"
              />
              <img
                src="https://srivasaviengg.ac.in/uploads/cst/20231014_123634pm_ByGPSMapCamera.jpg"
                alt="Merit Scholarship Event 2"
                className="w-full h-auto rounded-lg shadow object-cover"
              />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat1.jpeg" alt="Merit Scholarships 1" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat2.jpeg" alt="Merit Scholarships 2" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat3.jpeg" alt="Merit Scholarships 3" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat4.jpeg" alt="Merit Scholarships 4" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat5.jpeg" alt="Merit Scholarships 5" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat6.jpeg" alt="Merit Scholarships 6" className="w-full h-auto rounded-lg shadow object-cover" />
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Extra-Curricular Activities</h2>

            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Extra-Curricular Activities</summary>
                <ul className="my-2 list-none text-center space-y-2">
                  <li>
                    Extracurricular activities during the Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202021-2022.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202019-2020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202018-2019.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2017-18 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202017-2018.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Sahaya</summary>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Social Services</h3>
                    <p className="text-gray-700 text-justify">
                      We come across many heart-rending incidents and pathetic conditions of people in the society every day.
                      We may not be in a position to give an immediate reaction though we want to. But the Computer Science
                      and Technology Students of Sri Vasavi Engineering College extended their hands to help the needy. These
                      helping activities are going on under the name of "SAHAYA" with the slogan 'The Helping Hands,' which
                      aptly suits its purpose.
                    </p>
                    <p className="text-gray-700 text-justify">
                      SAHAYA is not a one-man army; rather, it is the brainchild of '07 batch students and is being carried
                      on by the subsequent batch students, which sounds the real meaning of teamwork. SAHAYA, from its first day,
                      was engaged in performing its activities. It was started with the event "CHEYUTHA" in the memory of SVEC
                      Academic Director LATE Dr. B. Janardhan Reddy at ZP High school, Pedatadepalli by providing the fee for
                      needy students and their necessities for study like compass boxes, books, etc., and thereafter, the journey
                      of helping the needy continued uninterruptedly till date.
                    </p>
                    <p className="text-gray-700 text-justify">
                      Students may have many thoughts in mind, but the seeds of thought have sprouted to grow with great confidence
                      by the magnanimous support of the Management. The Management of Sri Vasavi Engineering College always infuses
                      confidence in the students by extending their heartfelt cooperation. "SAHAYA" is aptly serving its motto and
                      contributing its little part to society. A drop may be small, but many drops together form an ocean. So, one
                      hand may seem weak, but joining the hands together makes many changes to step into a brighter world.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold">Faculty Coordinator:</h4>
                    <p className="font-semibold">Mr. P. Ramamohan Rao<br />Assistant Professor</p>
                  </div>

                  <div>
                    <h3 className="text-center text-xl font-semibold">LIST OF SAHAYA EVENTS CONDUCTED YEAR WISE</h3>
                    <ul className="my-2 list-none text-center space-y-2">
                      <li>
                        2022-2023 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2021-2022 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2020-2021 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2019-2020 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2018-2019 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2017-2018 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2017-18.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2016-2017 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2016-17.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2015-2016 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2015-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2014-2015 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2014-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2013-2014 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2013-14.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2012-2013 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2012-13.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/ec.jpeg" alt="Extra-Curricular Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/ec1.jpg" alt="Extra-Curricular Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/ec2.jpeg" alt="Extra-Curricular Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/e3.jpeg" alt="Extra-Curricular Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/e4.jpg" alt="Extra-Curricular Image 5" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/e5.jpg" alt="Extra-Curricular Image 6" className="w-full h-auto rounded-lg shadow object-cover" />
                </div>
              </details>
            </div>
          </div>
        );

      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Technical Association</h2>
            <p className="text-gray-700 mb-6 text-justify">
              Department Association - Society of Computers for Ultimate Diligence (SCUD) was started in the year 2002.
              SCUD team conducts regularly technical fests, workshops, and guest lectures for the benefit of students.
            </p>

            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">SCUD Activities during the year 2022-23</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    SCUD Activities during the year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/SCUD%20summary_22-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">SCUD Activities during the year 2021-22</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    SCUD Activities during the year 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/SCUD%20summary_%2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="space-y-10 mt-4">
                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">TECHFEST 2K23</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/t.jpeg" alt="TECHFEST 2K23 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/t1.jpeg" alt="TECHFEST 2K23 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">HACKOVERFLOW 2K23</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/t.jpeg" alt="HACKOVERFLOW 2K23 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/t1.jpeg" alt="HACKOVERFLOW 2K23 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">FRESHER'S 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/f.jpeg" alt="Freshers 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/f1.jpeg" alt="Freshers 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/f2.jpeg" alt="Freshers 2K22 Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/f3.jpeg" alt="Freshers 2K22 Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">ENGINEER'S DAY 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/ed.jpeg" alt="Engineer's Day 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/ed1.jpeg" alt="Engineer's Day 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">FAREWELL 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_1.jpeg" alt="Farewell 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_2.jpeg" alt="Farewell 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_3.jpeg" alt="Farewell 2K22 Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_4.jpeg" alt="Farewell 2K22 Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_5.jpeg" alt="Farewell 2K22 Image 5" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_6.jpeg" alt="Farewell 2K22 Image 6" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">HACKOVERFLOW 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/h.jpeg" alt="Hackoverflow 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/h1.jpeg" alt="Hackoverflow 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">SCUD VERVE 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/scud1.jpeg" alt="SCUD VERVE 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/scud2.jpeg" alt="SCUD VERVE 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/scud3.jpeg" alt="SCUD VERVE 2K22 Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/scud4.jpeg" alt="SCUD VERVE 2K22 Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Newsletters</h2>
            <div className="space-y-4">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 12 Issue 4 2022</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 12 Issue 4 2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue%204%202022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 12 Issue 3 2022</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 12 Issue 3 2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue3%202022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 12 Issue 2 2021</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 12 Issue 2 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue2%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 12 Issue 1 2021</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 12 Issue 1 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue1%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 11 Issue 4 2021</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 11 Issue 4 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue4%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 11 Issue 3 2021</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 11 Issue 3 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue3%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 11 Issue 2 2020</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 11 Issue 2 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue2%202020.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 11 Issue 1 2020</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 11 Issue 1 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue1%202020.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 10 Issue 4 2020</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 10 Issue 4 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_4_%202020.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 10 Issue 3 2020</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 10 Issue 3 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_3_%202019.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 10 Issue 2 2019</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 10 Issue 2 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_2_%202019.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 10 Issue 1 2019</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 10 Issue 1 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010%20_Issue_1_%202019.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 9 Issue 4 2019</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 9 Issue 4 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/vol%209%20issue%204.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 9 Issue 3 2019</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 9 Issue 3 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/vol%209%20issue%203.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 9 Issue 2 2018</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 9 Issue 2 2018 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/vol%209%20issue%202.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 9 Issue 1 2018</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 9 Issue 1 2018 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/vol%209%20issue%201.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 8 Issue 4(b) 2018</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 8 Issue 4(b) 2018 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/vol%208%20issue%204(b).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 8 Issue 4(a) 2018</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 8 Issue 4(a) 2018 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/vol%208%20issue%204(a).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 8 Issue 3 2017</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 8 Issue 3 2017 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/oct-17(1).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 8 Issue 2 2017</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 8 Issue 2 2017 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/july-2017.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 8 Issue 1 2017</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 8 Issue 1 2017 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/april.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 7 Issue 4 2017</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 7 Issue 4 2017 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Jan-17.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 7 Issue 3 2016</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 7 Issue 3 2016 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/oct-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 7 Issue 2 2016</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 7 Issue 2 2016 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Jul-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 7 Issue 1 2016</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 7 Issue 1 2016 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Apr-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 6 Issue 4 2016</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 6 Issue 4 2016 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/csenl_Jan-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 6 Issue 3 2015</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 6 Issue 3 2015 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/csenl_Oct-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 6 Issue 2 2015</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 6 Issue 2 2015 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/csenl_Jul-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 6 Issue 1 2015</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 6 Issue 1 2015 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/csenl_Apr-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 5 Issue 4 2015</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 5 Issue 4 2015 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/acsenl_Jan-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 5 Issue 3 2014</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 5 Issue 3 2014 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/acsenl_Oct-14.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 5 Issue 2 2014</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 5 Issue 2 2014 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/acsenl_Jul-14.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 5 Issue 1 2014</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 5 Issue 1 2014 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/acsenl_Apr14.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Extra-Curricular Activities</h2>

            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Extra-Curricular Activities</summary>
                <ul className="my-2 list-none text-center space-y-2">
                  <li>
                    Extracurricular activities during the Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202021-2022.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202019-2020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202018-2019.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2017-18 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202017-2018.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Sahaya</summary>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Social Services</h3>
                    <p className="text-gray-700 text-justify">
                      We come across many heart-rending incidents and pathetic conditions of people in the society every day.
                      We may not be in a position to give an immediate reaction though we want to. But the Computer Science
                      and Technology Students of Sri Vasavi Engineering College extended their hands to help the needy. These
                      helping activities are going on under the name of "SAHAYA" with the slogan 'The Helping Hands,' which
                      aptly suits its purpose.
                    </p>
                    <p className="text-gray-700 text-justify">
                      SAHAYA is not a one-man army; rather, it is the brainchild of '07 batch students and is being carried
                      on by the subsequent batch students, which sounds the real meaning of teamwork. SAHAYA, from its first day,
                      was engaged in performing its activities. It was started with the event "CHEYUTHA" in the memory of SVEC
                      Academic Director LATE Dr. B. Janardhan Reddy at ZP High school, Pedatadepalli by providing the fee for
                      needy students and their necessities for study like compass boxes, books, etc., and thereafter, the journey
                      of helping the needy continued uninterruptedly till date.
                    </p>
                    <p className="text-gray-700 text-justify">
                      Students may have many thoughts in mind, but the seeds of thought have sprouted to grow with great confidence
                      by the magnanimous support of the Management. The Management of Sri Vasavi Engineering College always infuses
                      confidence in the students by extending their heartfelt cooperation. "SAHAYA" is aptly serving its motto and
                      contributing its little part to society. A drop may be small, but many drops together form an ocean. So, one
                      hand may seem weak, but joining the hands together makes many changes to step into a brighter world.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold">Faculty Coordinator:</h4>
                    <p className="font-semibold">Mr. P. Ramamohan Rao<br />Assistant Professor</p>
                  </div>

                  <div>
                    <h3 className="text-center text-xl font-semibold">LIST OF SAHAYA EVENTS CONDUCTED YEAR WISE</h3>
                    <ul className="my-2 list-none text-center space-y-2">
                      <li>
                        2022-2023 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2021-2022 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2020-2021 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2019-2020 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2018-2019 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2017-2018 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2017-18.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2016-2017 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2016-17.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2015-2016 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2015-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2014-2015 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2014-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2013-2014 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2013-14.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2012-2013 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2012-13.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  <img src="/images/departments/cst/ec.jpeg" alt="Extra-Curricular Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/ec1.jpg" alt="Extra-Curricular Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/ec2.jpeg" alt="Extra-Curricular Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/e3.jpeg" alt="Extra-Curricular Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/e4.jpg" alt="Extra-Curricular Image 5" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/e5.jpg" alt="Extra-Curricular Image 6" className="w-full h-auto rounded-lg shadow object-cover" />
                </div>
              </details>
            </div>
          </div>
        );
      case 'Hackathons':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Hackathons</h2>
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed">
                  A 24-hour student hackathon is an event where students come together to collaborate, innovate, and
                  create projects within a short time frame. These hackathons have gained immense popularity in recent years,
                  and they hold significant importance for students for several reasons:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
                  <li>
                    <span className="font-medium">Hands-on learning:</span> Hackathons provide students a unique opportunity to engage in hands-on learning by
                    applying knowledge and skills to real-world problems and challenges.
                  </li>
                  <li>
                    <span className="font-medium">Collaboration and teamwork:</span> Teams form with diverse backgrounds, enabling effective communication and
                    leveraging strengths to tackle complex problems collectively.
                  </li>
                  <li>
                    <span className="font-medium">Innovation and creativity:</span> Time constraints encourage novel solutions and exploration of unconventional ideas,
                    leading to unique projects.
                  </li>
                  <li>
                    <span className="font-medium">Networking and industry exposure:</span> Participants, mentors, and judges from industry provide excellent networking
                    opportunities that can lead to internships, jobs, or collaborations.
                  </li>
                  <li>
                    <span className="font-medium">Skill development:</span> Students learn new technologies, languages, and tools to complete their projects and broaden
                    their skillsets.
                  </li>
                  <li>
                    <span className="font-medium">Resume/portfolio enhancement:</span> Demonstrates passion, problem-solving, teamwork, and ability to work under pressure.
                  </li>
                  <li>
                    <span className="font-medium">Recognition and awards:</span> Many hackathons offer prizes and recognition, boosting confidence and opening doors to further
                    opportunities.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  In conclusion, student hackathons promote hands-on learning, collaboration, innovation, networking, skill development,
                  resume enhancement, and recognition. They serve as a platform for students to showcase abilities, learn from peers,
                  and gain valuable experience in a short period.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-[#850209] text-white">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">Academic Year</th>
                      <th className="py-3 px-4 border-b text-left">For Brochure</th>
                      <th className="py-3 px-4 border-b text-left">For Winners List</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2022-23</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackoverflow%20banner_2022_23.png"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2022-23.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2021-22</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/broacher_2021_22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2021-22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2019-20</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Brouchure.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2019-20.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2018-19</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/City%20Digi%20@Hack%202K18.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20winners_2018-19.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-center mb-2">Gallery</h3>
                <div className="text-center text-lg font-medium mb-4">Hackathon 2022</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cst/Hackthon_2022_23%20(1).jpg"
                      alt="Hackathon 2022 Image 1"
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cst/Hackthon%202021_22%20(1).jpeg"
                      alt="Hackathon 2021-22 Image 1"
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cst/Hackthon%202021_22%20(1).jpeg"
                      alt="Hackathon 2021-22 Image 2"
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cst/Hackthon_2022_23%20(2)%20(1).jpg"
                      alt="Hackathon 2022 Image 2"
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Training Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Training Activities</h2>

            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Training Activities during the Academic Year 2022-2023</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    Training Activities during the Academic Year 2022-2023 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/tt_2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Training Activities during the Academic Year 2021-2022</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    Training Activities during the Academic Year 2021-2022 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/tt_2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/g.jpg" alt="Training Activity Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/g1.jpg" alt="Training Activity Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/g2.jpg" alt="Training Activity Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/g3.jpg" alt="Training Activity Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                </div>
              </details>
            </div>
          </div>
        );
      case "Handbooks": {
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Academic HandBooks
            </h2>

            <div className="space-y-6">
              {Object.entries(grouped).map(([groupTitle, entries]: [string, any], idx: number) => (
                <details key={idx} className="border rounded-lg p-4" open>
                  <summary className="text-lg font-semibold cursor-pointer">
                    {groupTitle}
                  </summary>

                  <ul className="list-disc pl-6 my-2">
                    {(entries as any[]).map((hb: any) => (
                      <li key={hb.id}>
                        {hb.title} –{" "}
                        <a
                          href={hb.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        );
      }

      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Placements</h2>
            <div className="space-y-6">
              {/* Dynamic Placement Batches */}
              {placementBatches.length > 0 ? (
                placementBatches.map((batch, index) => (
                  <details key={batch.id || index} className={index === 0 ? "border rounded-lg p-4" : "border rounded-lg p-4"} open={index === 0}>
                    <summary className="text-lg font-semibold cursor-pointer">{batch.batch_name}</summary>
                    <ul className="list-none my-2 text-center">
                      <li className="font-medium">
                        {batch.document_title || batch.batch_name} -{' '}
                        <a
                          href={batch.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </details>
                ))
              ) : (
                // Fallback static content if API fails
                <>
                  <details open className="border rounded-lg p-4">
                    <summary className="text-lg font-semibold cursor-pointer">Placements for Batch 2021-25</summary>
                    <ul className="list-none my-2 text-center">
                      <li className="font-medium">
                        Placements for Batch 2021-25 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/2024-25 CST PLACEMENTSS.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </details>

                  <details className="border rounded-lg p-4">
                    <summary className="text-lg font-semibold cursor-pointer">Placements for Batch 2020-24</summary>
                    <ul className="list-none my-2 text-center">
                      <li className="font-medium">
                        Placements for Batch 2020-24 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/2020-24 CST PLACEMENTS DATA -23.7.2023.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </details>

                  <details className="border rounded-lg p-4">
                    <summary className="text-lg font-semibold cursor-pointer">Placements for Batch 2019-23</summary>
                    <ul className="list-none my-2 text-center">
                      <li className="font-medium">
                        Placements for Batch 2019-23 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/2019-23 CST PLACEMENTS DATA.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </details>
                </>
              )}

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="space-y-6 mt-4">
                  {/* Dynamic Placement Gallery */}
                  {Object.keys(placementGallery).length > 0 ? (
                    Object.entries(placementGallery).map(([batchName, items]) => (
                      <div key={batchName}>
                        <h3 className="text-xl font-semibold text-center text-[#850209] mb-4">{batchName}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {(items as any[]).map((item, index) => (
                            <div key={index}>
                              <img
                                src={item.image_url}
                                alt={item.alt_text || `Placement ${batchName}`}
                                className="w-full h-auto rounded-lg shadow object-cover"
                                style={{ aspectRatio: '16/9' }}
                              />
                              {item.student_name && (
                                <div className="text-center my-3 text-green-600">
                                  {item.student_roll_no && <><strong>Roll No:</strong> {item.student_roll_no}<br /></>}
                                  {item.student_name && <><strong>Name:</strong> {item.student_name}<br /></>}
                                  {item.company_name && <><strong>Company:</strong> {item.company_name}<br /></>}
                                  {item.package_amount && <><strong>Package:</strong> {item.package_amount} LPA</>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    // Fallback static content if API fails
                    <>
                      <div>
                        <h3 className="text-xl font-semibold text-center text-[#850209] mb-4">2021-24</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <img
                            src="https://srivasaviengg.ac.in/images/placement/WhatsApp%20Image%202025-07-16%20at%2011.02.08%20AM.jpeg"
                            alt="Placements 2021-24"
                            className="w-full h-auto rounded-lg shadow object-cover"
                            style={{ aspectRatio: '16/9' }}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-center text-[#850209] mb-4">2019-23</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <img
                              src="https://srivasaviengg.ac.in/uploads/cst/pilla.jpeg"
                              alt="IBM 12 LPA - P. Jahnavi Sri Naidu"
                              className="w-full h-auto rounded-lg shadow object-cover"
                              style={{ aspectRatio: '16/9' }}
                            />
                            <div className="text-center my-3 text-green-600">
                              Roll No: 19A81A0650<br />
                              Name: P. Jahnavi Sri Naidu<br />
                              Company: IBM<br />
                              Package: 12 LPA
                            </div>
                          </div>
                          <div>
                            <img
                              src="https://srivasaviengg.ac.in/images/departments/cst/cst placement.jpg"
                              alt="CST Placement - IBM"
                              className="w-full h-auto rounded-lg shadow object-cover"
                            />
                            <div className="text-center my-3 text-green-600">
                              <strong>Roll No:</strong> 19A81A0650<br />
                              <strong>Name:</strong> P. Jahnavi Sri Naidu<br />
                              <strong>Company:</strong> IBM<br />
                              <strong>Package:</strong> 12 LPA
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">CSE-Artificial Intelligence</h1>
          </div>
        </div>
      </section>

      {/* Fixed Sidebar Component */}
      <FixedSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        title="CSE-AI Department"
        buttonLabel="Department Menu"
      >
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </FixedSidebar>
    </div>
  );
};

export default CSTDepartment;

