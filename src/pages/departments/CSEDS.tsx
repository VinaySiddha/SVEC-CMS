
import React, { useState } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

type Doc = { id: number; academic_year: string; title: string; file_url: string };
type Image = { id: number; image_url: string; alt_text: string };
type Gallery = { id: number; title: string; images: Image[] };
const CSTDepartment: React.FC = () => {
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [activeContent, setActiveContent] = useState('Department Profile');
      const [activeDeptTab, setActiveDeptTab] = useState('Department');
      const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
      const [faculty, setFaculty] = React.useState<any[]>([]);
      const [TechnicalFaculty, setTechnicalFaculty] = React.useState<any[]>([]);
      const [nonTeachingFaculty, setNonTeachingFaculty] = React.useState<any[]>([]);
        const [boardOfStudies, setBoardOfStudies] = useState<any[]>([]);
        const [loadingBOS, setLoadingBOS] = useState(true);
        const [bosError, setBOSError] = useState<string | null>(null);
        const [bosmeetings, setBosMeetings] = useState<any[]>([]);
        const [syllabus, setSyllabus] = React.useState<any[]>([]);
        const [mous, setMous] = React.useState<any[]>([]);
        const [fdp, setFdp] = React.useState<any[]>([]);
        const [data, setData] = React.useState<any[]>([]);
        const [workshopsdata,setWorkshops]=React.useState<
            { title: string; items: { text: string; url: string }[] }[]
          >([]);
        const [studentAchievements, setStudentAchievements] = React.useState<any[]>([]);
         const [placements, setPlacements] = React.useState<any[]>([]);
          const [academicToppers, setAcademicToppers] = React.useState<{
             dept?: string;
             batches?: any[];
             stats?: any[];
           }>({});
           const batches = academicToppers.batches ?? [];
           const stats   = academicToppers.stats ?? [];
          const [acdemictoppersgal,setAcademicToppersGal] = React.useState<{galleries: Gallery[]}>({galleries: []});
          const [technicalAssociation, setTechnicalAssociation] = React.useState<any[]>([]);
          const [extra, setExtra] = React.useState<{documents:any[]; clubs:any[]}>({documents:[], clubs:[]});
            const [hackathons, setHackathons] = React.useState<{documents: Doc[]; galleries: Gallery[]}>({documents: [], galleries: []});
            const [handbooks, setHandbooks] = React.useState<any[]>([]);
            React.useEffect(() => {
                fetch('/api/aiml/aiml-handbooks?dept=cseds')
                  .then(res => res.json())
                  .then(setHandbooks)
                  .catch(console.error);
              }, []);
            
            
              React.useEffect(() => {
                fetch('/api/aiml/aiml-hackathons?dept=cseds')
                  .then(res => res.json())
                  .then(setHackathons)
                  .catch(console.error);
              }, []);
            
            React.useEffect(() => {
              fetch('/api/aiml/aiml-extracurricular-activities?dept=cseds')
                .then(res => res.json())
                .then(data => setExtra(data))
                .catch(console.error);
            }, []);
          React.useEffect(() => {
              fetch('/api/aiml/technical-association?dept=cseds')
                .then(res => res.json())
                .then(setTechnicalAssociation)
                .catch(console.error);
            }, []);
          React.useEffect(() => {
              fetch('/api/aiml/academic-toppers-gallery?dept=cseds')
                .then(res => res.json())
                .then(setAcademicToppersGal)
                .catch(console.error);
            }, []);
        React.useEffect(() => {
                    fetch('/api/aiml/aiml-academic-toppers?dept=cseds')
                      .then((res) => res.json())
                      .then((data) => {
                        setAcademicToppers(data);
                      })
                  }, []);
        React.useEffect(() => {
                    fetch('/api/aiml/aiml-placements?dept=cseds')
                      .then((res) => res.json())
                      .then((data) => {
                        setPlacements(data);
                      })
                  }, []);
         React.useEffect(() => {
                    fetch('/api/aiml/student-achievements?dept=cseds')
                      .then((res) => res.json())
                      .then((data) => {
                        setStudentAchievements(data);
                      })
                  }, []);

        React.useEffect(() => {
                    fetch('/api/aiml/aiml-workshops?dept=cseds')
                      .then((res) => res.json())
                      .then((data) => {
                        setWorkshops(data);
                      })
                  }, []);
         React.useEffect(() => {
                    fetch('/api/aiml/faculty-achievements?dept=cseds')
                      .then((res) => res.json())
                      .then((data) => {
                        setData(data);
                      })
                  }, []);

        React.useEffect(() => {
                    fetch('/api/aiml/faculty-development-programs?dept=cseds')
                      .then((res) => res.json())
                      .then((data) => {
                        setFdp(data);
                      })
                  }, []);
        React.useEffect(() => {
              fetch('/api/aiml/aiml-mous?dept=cseds')
              .then((res) => res.json())
                      .then((data) => {
                        setMous(data);
                      })
                  }, []);
            
        React.useEffect(() => {
                    fetch("/api/aiml/aiml-syllabus?dept=cseds")
                      .then((res) => res.json())
                      .then((data) => {
                        setSyllabus(data);
                      })
                  }, []);

        React.useEffect(() => {
            fetch('/api/aiml/board-of-meeting-minutes?dept=cseds')
              .then(res => res.json())
              .then((data) => {
                //console.log(data)
                setBosMeetings(data); // directly set data, no type filter for now
              });
          }, []);
      
        React.useEffect(() => {
          setLoadingBOS(true);
          fetch("/api/aiml/aiml-board-of-studies?dept=cseds")
            .then(res => {
              if (!res.ok) throw new Error('Failed to fetch Board of Studies');
              return res.json();
            })
            .then(data => {
              setBoardOfStudies(data);
              setLoadingBOS(false);
            })
            .catch(err => {
              setBOSError(err.message);
              setLoadingBOS(false);
            });
        }, []);
      React.useEffect(() => {
            fetch('/api/aiml/aiml-faculty-profiles?dept=cseds')
              .then(res => res.json())
              .then((data) => {
                //console.log(data)
                setFaculty(data); // directly set data, no type filter for now
              });
          }, []);
        
          React.useEffect(() => {
            fetch("/api/aiml/aiml-technical-faculty?dept=cseds")
              .then((res) => res.json())
              .then((data) => {
                // console.log(data.technical)
                setTechnicalFaculty(data.technical || []);
              });
          }, []);
        
          React.useEffect(() => {
            fetch("/api/aiml/aiml-non-teaching-staff?dept=cseds")
              .then((res) => res.json())
              .then((data) => {
                //console.log(data)
                setNonTeachingFaculty(data.nonTeaching || []);
              });
          }, []);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Merit Scholarship/Academic Toppers', label: 'Merit Scholarship/Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Cpu className="w-4 h-4" /> },
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
                    <td className="px-6 py-4">B.Tech - CSE(Artificial Intelligence)</td>
                    <td className="px-6 py-4">AP EAPCET</td>
                    <td className="px-6 py-4">4 Years</td>
                    <td className="px-6 py-4">0</td>
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
              To evolve as a center of excellence in CSE-Data Science education, producing professionally competent and socially responsible technologists.
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
                <p className="text-gray-700">Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and CSE-Data Science principles.</p>
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
                <p className="text-gray-700">Apply knowledge of mathematics, science, engineering fundamentals, and CSE-Data Science principles to solve complex engineering problems.</p>
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
                <p className="text-gray-700">Apply knowledge of CSE-Data Science principles to design and develop efficient software solutions.</p>
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
              The course outcomes for all courses offered by the CSE-Data Science department are designed to align with program outcomes and educational objectives.
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
              The Department of CSE-Data Science was established in 2019. The department offers undergraduate program in CSE-Data Science with an intake of 60 students.
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
          <div id="student-achievements" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h3>
              {studentAchievements.map((section, idx) => (
          <div key={idx} className="mt-4">
            <details>
              <summary className="text-lg font-semibold">{section.title}</summary>
              <div className="nav-content">
                <ul className="list-disc ml-6 mt-4">
                  {section.items?.map((item: any, i: number) => (
                    <li key={i}>
                      {item.text}
                      {item.url && (
                        <>
                          {" – "}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline ml-2"
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
          </div>
        ))}
            </div>
          </div>
        );

      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
  <div className="container mx-auto">
    {syllabus.length === 0 ? (
      <div className="text-center text-gray-500">No syllabus data available.</div>
    ) : (
      // Group syllabus items by category to create collapsible sections
      Object.entries(
        syllabus.reduce((groups, item) => {
          const cat = item.category || "Others";
          if (!groups[cat]) groups[cat] = [];
          groups[cat].push(item);
          return groups;
        }, {} as Record<string, any[]>)
      ).map(([category, items]) => (
        <div className="section" key={category}>
          <details open={category.toLowerCase().includes("b.tech")}>
            <summary className="font-semibold text-lg">{category}</summary>
            <div className="nav-content p-3">
              <ul className="list-disc list-inside my-0">
                {(items as any[]).map((item, idx) => (
                  <li className="m-0 p-0" key={item.id}>
                    {item.title} –
                    <a
                      href={item.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-2"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      ))
    )}
            </div>
          </div>
        );

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
                            <a href={member.profile_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline transition-colors duration-200">View</a>
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


            case 'Board of Studies':
            return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
              <div className="overflow-x-auto">
                {loadingBOS ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : bosError ? (
                  <div className="text-center py-8 text-red-500">{bosError}</div>
                ) : (
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">S.No</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Designation</th>
                        <th scope="col" className="px-6 py-3">Organization</th>
                        <th scope="col" className="px-6 py-3">Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardOfStudies.map((member, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{member.member_name}</td>
                          <td className="px-6 py-4">{member.designation}</td>
                          <td className="px-6 py-4">{member.organization}</td>
                          <td className="px-6 py-4">{member.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            

            <div className="mt-4">
              <div className="flex flex-col justify-center items-center mb-5">
                <h4 className="text-xl font-semibold text-[#850209] mb-4">Board of Studies Meeting Minutes:</h4>
                <ul className="my-2 space-y-3 list-none">
                  {bosmeetings.map((item, idx) => (
                    <li key={idx} className="text-center">
                      {item.meeting_title} –{" "}
                      <a
                        href={item.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  ))}
                 </ul>
              </div>
            </div>
          </div>
          </div>
        );


        

      case 'MoUs':
        return (
          <div id="mous" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">MoUs</h2>
                <h3 className="text-xl font-semibold text-center mb-4">A. MOUs with Industries</h3>

                <div className="overflow-x-auto flex justify-center">
                  <table className="min-w-max bg-white border border-gray-200 table-auto text-sm text-left text-gray-500">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b">S.No</th>
                        <th className="py-3 px-4 border-b">Organization Name</th>
                        <th className="py-3 px-4 border-b">From</th>
                        <th className="py-3 px-4 border-b">To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mous.map((mou: any, index: number) => (
                        <tr key={mou.id ?? index}>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
          <div id="faculty-development-programs" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>

              <div className="section">
                <details open>
                  <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">FDP Attended</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
              {fdp.map((item, idx) => (
                <li key={item.id ?? idx}>
                  {item.title} ({item.year}) –
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
                </details>
              </div>
            </div>
          </div>
        );
      case 'Faculty Achievements':
        return (
         <div id="faculty-achievements" className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
          Faculty Achievements
        </h2>

        {data.map((section, idx) => (
          <div key={idx} className="mt-4">
            <details>
              <summary className="text-lg font-semibold">{section.title}</summary>
              <div className="nav-content">
                <ul className="list-disc ml-6 mt-4">
                  {section.items?.map((item: any, i: number) => (
                    <li key={i}>
                      {item.text} –
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
        );
        case 'Workshops':
        return (
          <div id="workshops" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
        Workshops/SOC/Seminars/Guest Lectures
      </h2>

      {workshopsdata.map(section => (
        <div key={section.title} className="section mt-6">
          <details open={section.title === 'Workshops'}>
            <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">
              {section.title}
            </summary>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  {item.text} –
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-2"
                  >
                    View More
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
          </div>
        );
      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Merit Scholarships and Academic Toppers</h2>

            <h3 className="text-xl font-semibold text-center mb-4">Merit Scholarships / Academic Toppers</h3>
            {/* ---------- Batch PDF Links ---------- */}
        <div className="mb-8">
          {batches.map((batch) => (
            <details
              key={batch.id}
              open
              className="border border-gray-300 rounded-lg mb-4"
            >
              <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                {batch.title || `Academic Toppers for the Batch ${batch.batch}`}
              </summary>
              <ul className="list-disc ml-6 mt-4">
                <li>
                  {batch.description ?? `Academic Toppers for the Batch ${batch.batch}`} –
                  <a
                    href={batch.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
              </ul>
            </details>
          ))}

          {/* ---------- Stats Table ---------- */}
          <div className="overflow-x-auto mt-8">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">S.NO.</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">ACADEMIC YEAR</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">PARTICULARS</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">NO. OF STUDENTS BENEFITED</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">SCHOLARSHIP AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-600">{idx + 1}</td>
                    <td className="py-3 px-4 text-gray-600">{row.academic_year}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{row.particulars}</td>
                    <td className="py-3 px-4 text-gray-600">{row.students_benefited}</td>
                    <td className="py-3 px-4 text-gray-600">{row.scholarship_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
            {/* ---------- Image Gallery ---------- */}

            <h2 className="text-2xl font-bold text-center mb-4 mt-8">Gallery</h2>
        {acdemictoppersgal.galleries.map(g => (
          <div key={g.id} className="container mx-auto mb-8">
            <div className="text-center text-xl font-semibold mb-2">{g.title}</div>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {g.images.map(img => (
                <div key={img.id} className="w-full md:w-1/3 flex justify-center">
                  <img src={img.image_url} alt={img.alt_text || 'Hackathon image'}
                       className="img-fluid m-3 rounded shadow" />
                </div>
              ))}
            </div>
          </div>
        ))}
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div id="extra-curricular-activities" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
          Extra-Curricular Activities
        </h2>

        {/* Documents */}
        <ul className="list-disc ml-6 mt-4">
          {extra.documents.map(doc => (
            <li key={doc.id}>
              {doc.title} ({doc.academic_year}) –
              <a
                href={doc.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-2"
              >
                View More
              </a>
            </li>
          ))}
        </ul>

        {/* Clubs */}
        {extra.clubs.map(club => (
          <div key={club.id} className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b-2 border-primary">
              {club.name}
            </h3>
            <div className="prose max-w-none">
              <h3 className="text-lg font-bold mb-2">{club.subtitle}</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {club.description}
              </p>
            </div>
          </div>
        ))}
      </div>
          </div>
        );

      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Technical Association</h2>
             {technicalAssociation.map((section, idx) => (
          <div key={idx} className="mt-4">
            <details>
              <summary className="text-lg font-semibold">{section.title}</summary>
              <div className="nav-content">
                <ul className="list-disc ml-6 mt-4">
                  {section.items?.map((item: any, i: number) => (
                    <li key={i}>
                      {item.text}
                      {item.url && (
                        <>
                          {" – "}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline ml-2"
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
          </div>
        ))}
          </div>
        );
      
      case 'Handbooks':
        return (
          <div id="handbooks" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
          Academic HandBooks
        </h2>

        <div className="space-y-6">
          {handbooks.map((group) => (
            <div key={group.group} className="space-y-4">
              {/* group.group is like "Academic Year 2023-24" */}
              {Array.from(
                new Set(group.items.map((i: any) => i.sem_type))
              ).map((sem) => (
                <details key={String(sem)} open>
                  <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                    {group.group}: {sem}
                  </summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    {group.items
                      .filter((i: any) => i.sem_type === sem)
                      .map((i: any, idx: number) => (
                        <li key={idx}>
                          {i.text} –
                          <a
                            href={i.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline ml-2"
                          >
                            View
                          </a>
                        </li>
                      ))}
                  </ul>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
          </div>
        );
      case 'Hackathons':
        return (
          <div id="hackathons" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Hackathons</h2>

        {/* Documents */}
        <div className="mb-6">
          <ul className="list-disc list-inside">
            {hackathons.documents.map(doc => (
              <li key={doc.id}>
                {doc.title} -
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                   className="text-primary hover:underline ml-2">
                  For more details
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Galleries */}
        <h2 className="text-2xl font-bold text-center mb-4 mt-8">Gallery</h2>
        {hackathons.galleries.map(g => (
          <div key={g.id} className="container mx-auto mb-8">
            <div className="text-center text-xl font-semibold mb-2">{g.title}</div>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {g.images.map(img => (
                <div key={img.id} className="w-full md:w-1/3 flex justify-center">
                  <img src={img.image_url} alt={img.alt_text || 'Hackathon image'}
                       className="img-fluid m-3 rounded shadow" />
                </div>
              ))}
            </div>
          </div>
        ))}
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
      case 'Placements':
        return (
          <div id="placements" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
              {placements.map((section, idx) => (
                <div key={idx} className="mt-4">
                  <details>
                    <summary className="text-lg font-semibold">{section.title}</summary>
                    <div className="nav-content">
                      <ul className="list-disc ml-6 mt-4">
                        {section.items?.map((item: any, i: number) => (
                          <li key={i}>
                            {item.text}
                            {item.url && (
                              <>
                                {" – "}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline ml-2"
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
                </div>
              ))}
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
            <h1 className="text-3xl md:text-4xl font-bold">CSE-Data Science</h1>
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

