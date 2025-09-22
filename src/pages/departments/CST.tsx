
import React, { useState,useEffect } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const CSTDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const [faculty, setFaculty] = useState([]);
  const [technicalFaculty, setTechnicalFaculty] = useState([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = useState([]);
  const [studentAchievements, setStudentAchievements] = useState([]);
const [syllabus, setSyllabus] = useState([]);
const [eresources, setEResources] = useState([]);
const [departmentLibrary, setDepartmentLibrary] = useState(null);
const [mous, setMous] = useState([]);
const [industryPrograms,setIndustryPrograms]=useState([]);


const [overview, setOverview] = useState(null);

const [physicalFacilities, setPhysicalFacilities] = useState([]);
const [laboratories, setLaboratories] = useState([]);
const [facultyDevelopment, setFacultyDevelopment] = useState([]);
const [facultyAchievements, setFacultyAchievements] = useState([]);
const [meritScholarships, setMeritScholarships] = useState([]);
const [extraCurricular, setExtraCurricular] = useState([]);
const [sahayaEvents, setSahayaEvents] = useState([]);
const [scudActivities, setScudActivities] = useState([]);
const [newsletters, setNewsletters] = useState([]);
const [hackathons, setHackathons] = useState([]);
const [trainingActivities, setTrainingActivities] = useState([]);
const [handbooks, setHandbooks] = useState([]);
const [placements, setPlacements] = useState([]);
const[bosMembers,setBosMembers]=useState([]);
const[bosMinutes,setBosMinutes]=useState([]);


   useEffect(() => {
    fetch('/api/cstcse/cst-faculty')
      .then(res => res.json())
      .then(data => {
        setFaculty(data.faculty);
        setTechnicalFaculty(data.technical);
        setNonTeachingFaculty(data.nonTeaching);
      });
       fetch('/api/cstcse/cst-overview')
    .then(res => res.json())
    .then(data => setOverview(data.overview));

fetch('/api/cstcse/cst-training-activites')
  .then(res => res.json())
  .then(data => {
    setTrainingActivities(data.activities || []);
  });
 fetch('/api/cstcse/cst-board-of-studies')
    .then(res => res.json())
    .then(data => {
      setBosMembers(data.members || []);
      setBosMinutes(data.minutes || []);
    });
fetch('/api/cstcse/cst-handbooks')
  .then(res => res.json())
  .then(data => {
    setHandbooks(data.handbooks || []);
  });

    fetch('/api/cstcse/cst-student-achievement')
      .then(res => res.json())
      .then(data => {

        setStudentAchievements(data.achievements || []);
      });
       fetch('/api/cstcse/cst-syllabus')
    .then(res => res.json())
    .then(data => {
      setSyllabus(data.syllabus || []);
    });

  fetch('/api/cstcse/cst-eresources')
    .then(res => res.json())
    .then(data => {
      setEResources(data.eresources || []);
    });
     fetch('/api/cstcse/cst-department-library')
    .then(res => res.json())
    .then(data => {
      setDepartmentLibrary(data.library);
    });

fetch('/api/cstcse/cst-mous')
    .then(res => res.json())
    .then(data => {
      setMous(data.mous || []);
      setIndustryPrograms(data.industryPrograms || []);
    });



 

  fetch('/api/cstcse/cst-physical-facilities')
    .then(res => res.json())
    .then(data => setPhysicalFacilities(data.facilities || []));

  fetch('/api/cstcse/cst-faculty-develop')
    .then(res => res.json())
    .then(data => setFacultyDevelopment(data.fdp || []));

  fetch('/api/cstcse/cst-faculty-achievements')
    .then(res => res.json())
    .then(data => setFacultyAchievements(data.achievements || []));

  fetch('/api/cstcse/cst-merit-scholarships')
    .then(res => res.json())
    .then(data => setMeritScholarships(data.scholarships || []));

  fetch('/api/cstcse/cst-scud-activities')
    .then(res => res.json())
    .then(data => setScudActivities(data.scudActivities || []));

  fetch('/api/cstcse/cst_extra_curricular')
    .then(res => res.json())
    .then(data => setExtraCurricular(data.activities || []));


  fetch('/api/cstcse/cst-newsletter')
    .then(res => res.json())
    .then(data => setNewsletters(data.newsletters || []));

  fetch('/api/cstcse/cst-hackathons')
    .then(res => res.json())
    .then(data => setHackathons(data.hackathons || []));

  fetch('/api/cstcse/cst-training-activites')
    .then(res => res.json())
    .then(data => setTrainingActivities(data.activities || []));

  fetch('/api/cstcse/cst-handbooks')
    .then(res => res.json())
    .then(data => setHandbooks(data.handbooks || []));

  fetch('/api/cstcse/cst-placements')
    .then(res => res.json())
    .then(data => setPlacements(data.placements || []));






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
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];




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
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and computer science & technology principles.</p>
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
                <p className="text-gray-700">Apply knowledge of mathematics, science, engineering fundamentals, and computer science & technology principles to solve complex engineering problems.</p>
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
                <p className="text-gray-700">Apply knowledge of computer science & technology principles to design and develop efficient software solutions.</p>
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
              The course outcomes for all courses offered by the Computer Science & Technology department are designed to align with program outcomes and educational objectives.
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
                <h3 className="text-xl font-bold text-[#850209] mb-2">{overview.hod_name}</h3>
                <p className="text-gray-700 mb-2">{overview.hod_qualification}</p>
                <p className="text-gray-700 mb-2">
                  <a href={`mailto:${overview.hod_email}`} className="text-[#850209] hover:underline">{overview.hod_email}</a>
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
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Student Achievements</h2>
      <div className="space-y-6">
        {grouped.map(group => (
          <details key={group.category} open={group.items.length > 0} className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">{group.category}</summary>
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
                          className="text-[#850209] hover:underline"
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
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Syllabus</h2>
      <div className="space-y-6">
        {types.map(type => (
          <details key={type} open className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">{type}</summary>
            <ul className="list-disc pl-6 my-2">
              {syllabus.filter(s => s.type === type).map((item, idx) => (
                <li key={idx}>
                  {item.title}
                  {' '}
                  <a
                    href={item.fileUrl}
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
                      {technicalFaculty.map((member, index) => (
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

case 'e-Resources': {
  // Group by regulation
  const regulations = Array.from(new Set(eresources.map(e => e.regulation)));
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">e-Resources</h2>
        {/* ...static intro content... */}
        <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">Subjects</h3>
        {regulations.map(reg => (
          <div key={reg} className="mb-8">
            <h4 className="text-xl font-bold text-[#850209] mb-4 text-center">{reg}-Subjects</h4>
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
                        <a href={item.ppt_url} target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


   case 'Board of Studies': {
  return (
    <div>
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Board of Studies</h2>
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
      </div>
      <div className="mt-4">
        <div className="flex flex-col justify-center items-center mb-5">
          <h4 className="text-xl font-semibold text-[#850209] mb-4">Board of Studies Meeting Minutes:</h4>
          <ul className="my-2 space-y-3 list-none">
            {bosMinutes.map((minute) => (
              <li key={minute.id} className="text-center">
                Minutes of {minute.meeting_no} meeting of the Board of Studies, dated {minute.meeting_date} -
                <a
                  href={minute.file_url}
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
  );
}

      case 'Department Library': {
  if (!departmentLibrary) {
    return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center">Loading...</div>;
  }
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Department Library</h2>
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
          <h5 className="text-lg font-semibold text-center text-[#850209] mb-2">No. of Titles</h5>
          <p className="text-2xl font-bold text-red-600 text-center">{departmentLibrary.titles}</p>
        </div>
        <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
          <h5 className="text-lg font-semibold text-center text-green-700 mb-2">No. of Volumes</h5>
          <p className="text-2xl font-bold text-green-600 text-center">{departmentLibrary.volumes}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-[#850209] mb-4">Faculty Incharge</h3>
        <ul className="text-center space-y-2 list-none">
          <li className="text-lg font-medium">{departmentLibrary.faculty_incharge}</li>
          <li className="text-lg">Phone: {departmentLibrary.phone}</li>
          <li className="text-lg">
            E-mail: <a href={`mailto:${departmentLibrary.email}`} className="text-[#850209] hover:underline">{departmentLibrary.email}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
        

case 'MoUs': {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">MoUs</h2>
      <h3 className="text-xl font-semibold text-[#850209] mb-4 text-center">A. MOUs with Industries</h3>
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
                    className="text-[#850209] hover:underline"
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
      <h3 className="text-xl font-semibold text-[#850209] mb-4">B. Interaction with the Industry</h3>
      <div className="flex justify-center mb-6">
        <ul className="space-y-4 list-none max-w-3xl">
          {industryPrograms.map((item) => (
            <li key={item.id} className="py-2">
              {item.title} -{' '}
              <a
                href={item.file_url}
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
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Physical Facilities</h2>
      <div className="space-y-6">
        {grouped.map(group => (
          <details key={group.category} open={group.items.length > 0} className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">{group.category}</summary>
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
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
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
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Development Programs</h2>
      <div className="space-y-6">
        {grouped.map(group => (
          <details key={group.category} open={group.items.length > 0} className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">{group.category}</summary>
            {group.category === 'Gallery' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {group.items.flatMap(item => item.gallery || []).map((img, i) => (
                  <img key={i} src={img} alt={`FDP Gallery ${i + 1}`} className="w-full h-auto rounded-lg shadow" />
                ))}
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
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
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
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Achievements</h2>
      <div className="space-y-6">
        {grouped.map(group => (
          <details key={group.category} open={group.items.length > 0} className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">{group.category}</summary>
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
                          className="text-[#850209] hover:underline"
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
          </details>
        ))}
      </div>
    </div>
  );
}
     case 'Merit Scholarship/Academic Toppers': {
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
        {meritScholarships.flatMap(item => item.gallery || []).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Merit Scholarship Image ${i + 1}`}
            className="w-full h-auto rounded-lg shadow object-cover"
          />
        ))}
      </div>
    </div>
  );
}

    
       case 'Technical Association': {
  // Separate activities and gallery events
  const activityItems = scudActivities.filter(a => a.file_url);
  const galleryEvents = scudActivities.filter(a => a.gallery && a.gallery.length > 0);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Technical Association</h2>
      <p className="text-gray-700 mb-6 text-justify">
        Department Association - Society of Computers for Ultimate Diligence (SCUD) was started in the year 2002.
        SCUD team conducts regularly technical fests, workshops, and guest lectures for the benefit of students.
      </p>
      <div className="space-y-6">
        {activityItems.map(item => (
          <details key={item.id} className="border rounded-lg p-4" open>
            <summary className="text-lg font-semibold cursor-pointer">{item.title}</summary>
            <ul className="list-disc pl-6 my-2">
              <li>
                {item.title} -{' '}
                <a
                  href={item.file_url}
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

        {galleryEvents.length > 0 && (
          <details className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
            <div className="space-y-10 mt-4">
              {galleryEvents.map(event => (
                <div key={event.id}>
                  <h3 className="text-xl font-semibold text-center mb-4">{event.title}</h3>
                  <div className={`grid grid-cols-1 ${event.gallery.length > 2 ? 'md:grid-cols-3' : 'sm:grid-cols-2'} gap-6`}>
                    {event.gallery.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${event.title} Image ${i + 1}`}
                        className="w-full h-auto rounded-lg shadow object-cover"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}
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
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Newsletters</h2>
      <div className="space-y-4">
        {Object.entries(grouped).map(([year, items]) => (
          <details key={year} className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">{year} Newsletters</summary>
            <ul className="list-none pl-0 my-2">
              {items.map(item => (
                <li key={item.id} className="p-2">
                  {item.title} -{' '}
                  <a
                    href={item.file_url}
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
     case 'Extra-Curricular Activities': {
  const activityItems = extraCurricular.filter(a => a.type === 'activity');
  const sahaya = extraCurricular.find(a => a.type === 'sahaya');

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Extra-Curricular Activities</h2>
      <div className="space-y-6">
        <details open className="border rounded-lg p-4">
          <summary className="text-lg font-semibold cursor-pointer">Extra-Curricular Activities</summary>
          <ul className="my-2 list-none text-center space-y-2">
            {activityItems.map(item => (
              <li key={item.id}>
                {item.title} -{' '}
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#850209] hover:underline"
                >
                  View More
                </a>
              </li>
            ))}
          </ul>
        </details>

        {sahaya && (
          <details className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">Sahaya</summary>
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
                      <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">
                        For more details
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        )}

        {sahaya && sahaya.gallery && sahaya.gallery.length > 0 && (
          <details className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {sahaya.gallery.map((img, i) => (
                <img key={i} src={img} alt={`Extra-Curricular Image ${i + 1}`} className="w-full h-auto rounded-lg shadow object-cover" />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
 case 'Hackathons': {
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
            <thead className="bg-[#850209] text-white">
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
                      className="text-[#850209] hover:underline"
                    >
                      Click Here
                    </a>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <a
                      href={h.winners_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
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
          <h3 className="text-2xl font-semibold text-center mb-2">Gallery</h3>
          {hackathons.map(h => (
            h.gallery && h.gallery.length > 0 && (
              <div key={h.id} className="mb-8">
                <div className="text-center text-lg font-medium mb-4">{h.academic_year} Gallery</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {h.gallery.map((img, i) => (
  <img
    key={i}
    src={img}
    alt={`Hackathon ${h.academic_year} Image ${i + 1}`}
    className="w-full h-auto rounded-lg shadow object-cover"
  />
))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

     case 'Training Activities':
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Training Activities</h2>
      <div className="space-y-6">
        {trainingActivities.map((activity, idx) => (
          <details key={activity.id} open={idx === 0} className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">{activity.title}</summary>
            <ul className="list-disc pl-6 my-2">
              <li>
                {activity.title} -{' '}
                <a
                  href={activity.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#850209] hover:underline"
                >
                  View More
                </a>
              </li>
            </ul>
            {activity.gallery && activity.gallery.length > 0 && (
              <details open className="border rounded-lg p-4 mt-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  {activity.gallery.map((img, i) => (
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
          </details>
        ))}
      </div>
    </div>
  );
      case 'Handbooks': {
  // Group handbooks by academic_year and semester
  const grouped = {};
  handbooks.forEach(h => {
    if (!grouped[h.academic_year]) grouped[h.academic_year] = {};
    if (!grouped[h.academic_year][h.semester]) grouped[h.academic_year][h.semester] = [];
    grouped[h.academic_year][h.semester].push(h);
  });

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Academic HandBooks</h2>
      <div className="space-y-6">
        {Object.entries(grouped).map(([year, semesters], i) =>
          Object.entries(semesters).map(([sem, items], j) => (
            <details key={year + sem} open={i === 0 && j === 0} className="border rounded-lg p-4">
              <summary className="text-lg font-semibold cursor-pointer">
                Academic year {year}: {sem} HandBooks
              </summary>
              <ul className="list-disc pl-6 my-2">
                {items.map(item => (
                  <li key={item.id}>
                    {item.title} -{' '}
                    <a
                      href={item.file_url}
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
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Placements</h2>
      <div className="space-y-6">
        {cstPlacements.map((placement, idx) => (
          <details key={placement.id} open={idx === 0} className="border rounded-lg p-4">
            <summary className="text-lg font-semibold cursor-pointer">{placement.title || `Placements for Batch ${placement.batch}`}</summary>
            <ul className="list-none my-2 text-center">
              <li className="font-medium">
                {placement.title || `Placements for Batch ${placement.batch}`} -{' '}
                <a
                  href={placement.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#850209] hover:underline"
                >
                  View More
                </a>
              </li>
            </ul>
            {placement.gallery && placement.gallery.length > 0 && (
              <div className="space-y-6 mt-4">
                <h3 className="text-xl font-semibold text-center text-[#850209] mb-4">{placement.batch} Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {placement.gallery.map((img, i) => (
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
          </details>
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
            <h1 className="text-3xl md:text-4xl font-bold">Computer Science & Technology</h1>
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

