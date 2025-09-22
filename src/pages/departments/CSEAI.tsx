
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
  const [newslettersLoading, setNewslettersLoading] = useState(true);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [hackathonGallery, setHackathonGallery] = useState<any[]>([]);
  type TrainingActivity = {
    academic_year: string;
    title: string;
    pdf_url: string;
  };

  type tGalleryImage = {
    image_url: string;
    alt_text: string;
  };


  const [tactivities, tsetActivities] = useState<TrainingActivity[]>([]);
  const [tgallery, tsetGallery] = useState<tGalleryImage[]>([]);

  useEffect(() => {
    axios.get('/api/cai-training-activities')
      .then(res => {
        tsetActivities(res.data.activities);
        tsetGallery(res.data.gallery);
      })
      .catch(err => console.error('Failed to fetch training data:', err));
  }, [])

  console.log("A", tactivities);
  const [activities, setActivities] = useState([]);
  type GalleryImage = {
    event_name: string;
    image_url: string;
    alt_text: string;
  };

  const [gallery, setGallery] = useState<GalleryImage[]>([]);

  useEffect(() => {
    axios.get('/api/cai-technical-ass')
      .then(res => {
        setActivities(res.data.activities);
        setGallery(res.data.gallery);
      })
      .catch(err => console.error('Failed to fetch SCUD data:', err));
  }, []);

  console.log("gallery", gallery);
  // Group gallery images by event name
  const groupedGallery = gallery.reduce((acc: Record<string, GalleryImage[]>, img) => {
    if (!acc[img.event_name]) acc[img.event_name] = [];
    acc[img.event_name].push(img);
    return acc;
  }, {});


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
  const [trainingActivities, setTrainingActivities] = useState<any>({});
  const [physicalFacilities, setPhysicalFacilities] = useState<any>(null);
  const [scholarships, setScholarships] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/api/cai-merit-scholarships')
      .then(res => {
        setScholarships(res.data.scholarships);
        setImages(res.data.images);
      })
      .catch(err => console.error('API fetch failed:', err));
  }, []);

  useEffect(() => {
    fetch("/api/civil_physical_facilities")
      .then((res) => res.json())
      .then((data) => setPhysicalFacilities(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
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

  // Fetch newsletters
  useEffect(() => {
    setNewslettersLoading(true);
    axios.get('/api/cai-newsletters?dept=cseai')
      .then(res => {
        setNewsletters(res.data.newsletters || []);
        setNewslettersLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch newsletters:', err);
        setNewslettersLoading(false);
      });
  }, []);
  console.log(newsletters);
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
    fetch('/api/cai-eresources?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEresources(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch e-resources:', err));
  }, []);




  // Fetch extra-curricular activities
  useEffect(() => {
    fetch('/api/cai-extra-curricular?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setExtraCurricularActivities(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch extra-curricular activities:', err));
  }, []);

  // Fetch hackathons
  useEffect(() => {
    fetch('/api/cai-hackathons?dept=cseai')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHackathons(data.hackathons);
          setHackathonGallery(data.gallery);
        }
      })
      .catch(err => console.error('Failed to fetch hackathons:', err));
  }, []);




  // Fetch physical facilities
  useEffect(() => {
    fetch('/api/cai-physical-facilities?dept=cseai')
      .then(res => res.json())
      .then(data => {
        setPhysicalFacilities(data);
      })
      .catch(err => console.error('Failed to fetch physical facilities:', err));
  }, []);
  console.log("p", physicalFacilities);



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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-6">
              <div className="relative">
                <img
                  src="/aihod.jpg"
                  alt="Dr. G. Loshma"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Head of Department, CSE-AI</p>
                  <p className="text-gray-600">Ph.D in Computer Science, M.Tech CSE</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_cst@srivasaviengg.ac.in" className="text-primary hover:underline">hod_cst@srivasaviengg.ac.in</a></p>
                </div>
              </div>
            </div>
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
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
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

              {/* Dynamic E-Resources Tables from API */}
              {eresources.length > 0 ? (
                eresources.map((regulationGroup: any, index: number) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">
                      {regulationGroup.category} Subjects
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-3 px-4 border-b text-left">S.No</th>
                            <th className="py-3 px-4 border-b text-left">Regulation</th>
                            <th className="py-3 px-4 border-b text-left">Semester</th>
                            <th className="py-3 px-4 border-b text-left">Subject</th>
                            <th className="py-3 px-4 border-b text-left">Material</th>
                          </tr>
                        </thead>
                        <tbody>
                          {regulationGroup.items.map((item: any, itemIndex: number) => (
                            <tr key={item.id || itemIndex} className="hover:bg-gray-50">
                              <td className="py-3 px-4 border-b">{itemIndex + 1}</td>
                              <td className="py-3 px-4 border-b font-medium">{regulationGroup.category}</td>
                              <td className="py-3 px-4 border-b text-center">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                                  {item.semester}
                                </span>
                              </td>
                              <td className="py-3 px-4 border-b">
                                <div className="font-medium text-gray-900">{item.title}</div>
                                {item.academic_year && (
                                  <div className="text-xs text-gray-500 mt-1">Batch: {item.academic_year}</div>
                                )}
                              </td>
                              <td className="py-3 px-4 border-b">
                                <a
                                  href={item.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-1 bg-[#850209] text-white text-sm font-medium rounded-md hover:bg-[#6b0106] transition-colors"
                                >
                                  Download
                                  {item.file_type && (
                                    <span className="ml-1 text-xs">({item.file_type})</span>
                                  )}
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p>No e-resources available at the moment.</p>
                </div>
              )}
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
          </div >
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


          </div>
        );

      case "Physical Facilities":
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Physical Facilities
            </h2>

            <div className="space-y-8">
              {physicalFacilities?.facilities ? (
                Object.entries(physicalFacilities.facilities).map(([category, items], catIndex) => {
                  const facilities = items as any[];

                  return (
                    <div key={catIndex} className="space-y-4">
                      <h3 className="text-2xl font-semibold text-[#850209] capitalize">
                        {category.replace(/([A-Z])/g, " $1")} {/* camelCase → readable */}
                      </h3>

                      {facilities.length > 0 ? (
                        facilities.map((item, index) => (
                          <details
                            key={index}
                            className="border rounded-lg p-4"
                            open={index === 0}
                          >
                            <summary className="text-lg font-semibold cursor-pointer">
                              {item.name}
                            </summary>


                            {item.proof_url || item.description?.includes("http") ? (
                              <a
                                href={item.proof_url || item.description}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#850209] hover:underline block mt-2"
                              >
                                View Document
                              </a>
                            ) : null}
                          </details>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">No data available</p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">No data available</p>
              )}
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
        return (<div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in"> <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center"> Merit Scholarships and Academic Toppers </h2> <h3 className="text-xl font-semibold text-center mb-4"> Merit Scholarships / Academic Toppers </h3> <div className="overflow-x-auto mb-8"> <table className="min-w-full bg-white border border-gray-200"> <thead className="bg-gray-100"> <tr> <th className="py-3 px-4 border-b text-left">S.No</th> <th className="py-3 px-4 border-b text-left">Academic Year</th> <th className="py-3 px-4 border-b text-left">Particulars</th> <th className="py-3 px-4 border-b text-left">No. of Students Benefited</th> <th className="py-3 px-4 border-b text-left">Scholarship Amount</th> </tr> </thead> <tbody> {scholarships.map((row, index) => (<tr key={row.id} className="hover:bg-gray-50"> <td className="py-3 px-4 border-b">{index + 1}</td> <td className="py-3 px-4 border-b">{row.academic_year}</td> <td className="py-3 px-4 border-b">{row.particulars}</td> <td className="py-3 px-4 border-b">{row.students_benefited}</td> <td className="py-3 px-4 border-b">{row.scholarship_amount}</td> </tr>))} </tbody> </table> </div> <h3 className="text-xl font-semibold text-center mb-4">Image Gallery</h3> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {images.map((img) => (<img key={img.id} src={img.image_url} alt={img.alt_text} className="w-full h-auto rounded-lg shadow object-cover" />))} </div> </div>);
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Extra-Curricular Activities</h2>

            <div className="space-y-6">
              {/* Dynamic Extra-Curricular Activities from API */}
              {extraCurricularActivities.length > 0 ? (
                extraCurricularActivities.map((yearGroup: any, index: number) => (
                  <details key={index} className="border rounded-lg p-4" open={index === 0}>
                    <summary className="text-lg font-semibold cursor-pointer">
                      Extra-Curricular Activities - {yearGroup.academic_year}
                    </summary>
                    <div className="mt-4 space-y-3">
                      {yearGroup.items.map((activity: any, actIndex: number) => (
                        <div key={actIndex} className="border-l-4 border-[#850209] pl-4 py-2">
                          <h4 className="font-medium text-gray-900 mb-1">{activity.title}</h4>
                          {activity.publish_date && (
                            <p className="text-sm text-gray-600 mb-2">
                              Date: {new Date(activity.publish_date).toLocaleDateString('en-GB')}
                            </p>
                          )}
                          <a
                            href={activity.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#850209] hover:underline text-sm font-medium"
                          >
                            View Details →
                          </a>
                        </div>
                      ))}
                    </div>
                  </details>
                ))
              ) : (
                // Fallback static content if API fails
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
              )}

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
              {activities.map((activity) => (
                <details key={activity.academic_year} className="border rounded-lg p-4" open>
                  <summary className="text-lg font-semibold cursor-pointer">
                    {activity.title}
                  </summary>
                  <ul className="list-disc pl-6 my-2">
                    <li>
                      {activity.title} –{' '}
                      <a
                        href={activity.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline"
                      >
                        View More
                      </a>
                    </li>
                  </ul>
                </details>
              ))}

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="space-y-10 mt-4">
                  {Object.entries(groupedGallery).map(([eventName, images]) => (
                    <div key={eventName}>
                      <h3 className="text-xl font-semibold text-center mb-4">{eventName}</h3>
                      <div className={`grid grid-cols-1 sm:grid-cols-2 ${images.length >= 4 ? 'md:grid-cols-4' : images.length === 3 ? 'md:grid-cols-3' : ''} gap-6`}>
                        {images.map((img, index) => (
                          <img
                            key={index}
                            src={img.image_url}
                            alt={img.alt_text}
                            className="w-full h-auto rounded-lg shadow object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Newsletters</h2>
            {newslettersLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#850209]"></div>
                <p className="mt-2 text-gray-600">Loading newsletters...</p>
              </div>
            ) : newsletters.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <Rss className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p>No newsletters available at the moment.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-[#850209] text-white">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">S.No</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Volume</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Issue</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Year</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Publish Date</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletters.map((newsletter: any, index: number) => (
                      <tr key={newsletter.id} className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 text-center font-medium">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <div className="font-medium text-gray-900">{newsletter.title}</div>
                          {newsletter.description && (
                            <div className="text-sm text-gray-600 mt-1">{newsletter.description}</div>
                          )}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                            Vol. {newsletter.volume || 'N/A'}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                            Issue {newsletter.issue || 'N/A'}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                            {newsletter.academic_year || 'N/A'}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-600">
                          {newsletter.publish_date ? new Date(newsletter.publish_date).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          <a
                            href={newsletter.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 bg-[#850209] text-white text-sm font-medium rounded-md hover:bg-[#6b0106] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View PDF
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Extra-Curricular Activities</h2>

            <div className="space-y-6">
              {/* Dynamic Extra-Curricular Activities from API */}
              {extraCurricularActivities.length > 0 ? (
                extraCurricularActivities.map((yearGroup: any, index: number) => (
                  <details key={index} className="border rounded-lg p-4" open={index === 0}>
                    <summary className="text-lg font-semibold cursor-pointer">
                      Extra-Curricular Activities - {yearGroup.academic_year}
                    </summary>
                    <div className="mt-4 space-y-3">
                      {yearGroup.items.map((activity: any, actIndex: number) => (
                        <div key={actIndex} className="border-l-4 border-[#850209] pl-4 py-2">
                          <h4 className="font-medium text-gray-900 mb-1">{activity.title}</h4>
                          {activity.publish_date && (
                            <p className="text-sm text-gray-600 mb-2">
                              Date: {new Date(activity.publish_date).toLocaleDateString('en-GB')}
                            </p>
                          )}
                          <a
                            href={activity.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#850209] hover:underline text-sm font-medium"
                          >
                            View Details →
                          </a>
                        </div>
                      ))}
                    </div>
                  </details>
                ))
              ) : (
                // Fallback static content if API fails
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
              )}

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

              {/* Dynamic Hackathons Table from API */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-[#850209] text-white">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">Academic Year</th>
                      <th className="py-3 px-4 border-b text-left">Event Title</th>
                      <th className="py-3 px-4 border-b text-left">For Brochure</th>
                      <th className="py-3 px-4 border-b text-left">For Winners List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hackathons.length > 0 ? (
                      hackathons.map((hackathon: any, index: number) => (
                        <tr key={hackathon.id || index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b font-medium">{hackathon.academic_year}</td>
                          <td className="py-3 px-4 border-b">
                            <div>
                              <div className="font-medium text-gray-900">{hackathon.title}</div>
                              {hackathon.description && (
                                <div className="text-sm text-gray-600 mt-1">{hackathon.description}</div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b">
                            {hackathon.brochure_url ? (
                              <a
                                href={hackathon.brochure_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#850209] hover:underline font-medium"
                              >
                                Click Here
                              </a>
                            ) : (
                              <span className="text-gray-400">Not Available</span>
                            )}
                          </td>
                          <td className="py-3 px-4 border-b">
                            {hackathon.winners_url ? (
                              <a
                                href={hackathon.winners_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#850209] hover:underline font-medium"
                              >
                                Click Here
                              </a>
                            ) : (
                              <span className="text-gray-400">Not Available</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500">
                          No hackathons data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Dynamic Gallery from API */}
              <div>
                <h3 className="text-2xl font-semibold text-center mb-4">Gallery</h3>
                {hackathonGallery.length > 0 ? (
                  // Group gallery images by academic year
                  (() => {
                    const groupedGallery = hackathons.reduce((acc: any, hackathon: any) => {
                      const year = hackathon.academic_year;
                      const hackathonImages = hackathonGallery.filter((img: any) => img.academic_year === year);
                      if (hackathonImages.length > 0) {
                        acc[year] = { hackathon, images: hackathonImages };
                      }
                      return acc;
                    }, {});

                    return Object.entries(groupedGallery).map(([year, data]: [string, any]) => (
                      <div key={year} className="mb-8">
                        <div className="text-center text-lg font-medium mb-4">
                          {data.hackathon.title} ({year})
                        </div>
                        <div className={`grid grid-cols-1 ${data.images.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
                          {data.images.map((img: any, index: number) => (
                            <div key={index} className="space-y-2">
                              <img
                                src={img.image_url}
                                alt={img.alt_text}
                                className="w-full h-auto rounded-lg shadow object-cover"
                              />
                              {img.caption && (
                                <p className="text-sm text-gray-600 text-center italic">{img.caption}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No gallery images available
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'Training Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Training Activities</h2>

            <div className="space-y-6">
              {tactivities.map((tactivity) => (
                <details key={tactivity.academic_year} className="border rounded-lg p-4" open>
                  <summary className="text-lg font-semibold cursor-pointer">
                    {tactivity.title}
                  </summary>
                  <ul className="list-disc pl-6 my-2">
                    <li>

                      <a
                        href={tactivity.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline"
                      >
                        View More
                      </a>
                    </li>
                  </ul>
                </details>
              ))}

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  {tgallery.map((img, index) => (
                    <img
                      key={index}
                      src={img.image_url}
                      alt={img.alt_text}
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                  ))}
                </div>
              </details>
            </div>
          </div>
        );

      case "Handbooks": {
        // Group by academic_year (or any property you want)
        const grouped = (handbooks || []).reduce((acc: Record<string, any[]>, hb: any) => {
          const key = hb.academic_year || "Others";
          if (!acc[key]) acc[key] = [];
          acc[key].push(hb);
          return acc;
        }, {});

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
        title="CST Department"
        buttonLabel="Department Menu"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CSTDepartment;

