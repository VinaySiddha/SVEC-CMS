import React, { useState, useEffect } from 'react';
import { Building, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';
import { LogoLoader } from '@/components/ui/LogoLoader';
import { useTabLoader } from '@/hooks/useTabLoader';

const CivilDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  
  // Use the tab loader hook for department profile tabs
  const {
    activeTab: activeDeptTab,
    isTabLoading: isDeptTabLoading,
    pendingTab: pendingDeptTab,
    switchTab: switchDeptTab,
    getTabButtonProps,
    getContentProps,
    getLoaderProps
  } = useTabLoader('Department', { loaderDuration: 120 });
  
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
    fetch("/api/civil-extra-curricular?dept=civil")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // 👀 check this in browser console
        setExtraCurricularActivities(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  const [researchDevelopment, setResearchDevelopment] = useState<any>({});
  const [researchProjects, setResearchProjects] = useState<any>({});
  const [consultancyActivities, setConsultancyActivities] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/civil-consultancy?department=Civil")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // 👀 check this in browser console
        setConsultancyActivities(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  console.log(consultancyActivities);
  const [departmentContact, setDepartmentContact] = useState<any[]>([]);
  const [Syllabus, setSyllabus] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/civil-syllabus?department=Civil")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // 👀 check this in browser console
        setSyllabus(data.undefined);
      })
      .catch((err) => console.error("Fetch error:", err));
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
  //const [newsletters, setNewsletters] = useState<any[]>([]);
  const [workshops, setWorkshops] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/civil-newsletters?department=civil")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // 👀 check this in browser console
        setNewsletters(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  useEffect(() => {
    fetch("/api/civil-workshops?dept=civil")
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // 👀 check this in browser console
        setWorkshops(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  useEffect(() => {
    fetch('/api/civil-bos?dept=civil')
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
      .catch(err => console.error("Failed to fetch BOS:", err));
  }, []);
  useEffect(() => {
    fetch('/api/civil-student-achievements?dept=civil')
      .then((res) => res.json())
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch student achievements:', err);
        setLoading(false);
      });
  }, []);

  const [placements, setPlacements] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/civil-placements?dept=civil')
      .then(res => res.json())
      .then(data => {
        // API direct array return chestundi
        setPlacements(data);
      })
      .catch(err => console.error('Failed to fetch placements:', err));
  }, []);




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
      { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
    ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const faculty = [
    { name: "Dr.G.Radhakrishnan", qualification: "ME,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_G%20RADHAKRISHNAN%20PROFILE.pdf" },
    { name: "Mr. V.L.D Prasad Reddy", qualification: "M.E.", designation: "Assistant Professor & ACE", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_V%20L%20D%20Prasad%20Reddy.pdf" },
    { name: "Mr. J.Vijaya Chandra", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_VIJAYA%20CHANDRA%20PROFILE.pdf" },
    { name: "Mr. B.HemaSundar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_B%20HEMASUNDAR.pdf" },
    { name: "Mr. M.Prem Kumar Raju", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_M%20PREM%20KUMAR%20RAJU%20PROFILE.pdf" },
    { name: "Mr. K.Gowtham Kumar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Gowtham%20Kumar.pdf" },
    { name: "Mr. E Hanuman Sai Gupta", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CE_E%20Hanuman%20Sai%20Gupta.pdf" },
    { name: "Ms. B.Rohitha", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_ROHITHA%20PROFILE.pdf" },
    { name: "Ms. Ch.Sumaja", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_CH%20Sumaja.pdf" },
    { name: "Mr. K.J.Ganapathi", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Kaigala%20J%20Ganapathi.pdf" }
  ];

  const nonTeachingFaculty = [
    { name: "Mr. A.N.V.Ravi Kumar", designation: "Lab Technician" },
    { name: "Mr. P.V.S.Krishna Prasad", designation: "Lab Technician" },
    { name: "Mr. M.Abraham Lincoln", designation: "Lab Technician" },
    { name: "Mr. M.Sasi Kumar", designation: "Lab Technician" },
    { name: "Mr. T.V.V.Satyanarayana", designation: "DEO" },
    { name: "Ms. B.M.G.A.Bhargav", designation: "Attender" }
  ];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div>
            {/* Department Overview Section */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                The Department of Civil Engineering was established in the
                year 2011 with a vision to strive towards quality education,
                research and consultancy. Civil Engineering is one of the
                oldest and broadest engineering discipline which has been an
                aspect of life, since the beginning of human civilization.
                Efforts have been made to provide high quality technical
                education to students with a view to make them successful
                professionals. In order to attain the pre-defined objectives,
                focus has been made on Outcome Based Education, which
                facilitates the students to analyze problems, design and
                develop solutions and usage of modern tools, by making
                him/herself as an ethical Engineer with best of the kind
                leadership traits. Department is offering B.Tech (Civil) with
                an intake of 60 and M. Tech (Structural Engg.) with 18
                students. Department comprises well qualified and proficient
                faculty to direct the students in reaching their goals.
              </p>

              <h4 className="text-xl font-bold text-[#B22222] mb-4">Courses Offered</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 mb-4">
                  <thead className="text-xs bg-gray-50 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">S.No</th>
                      <th scope="col" className="px-6 py-3">Name of the Course</th>
                      <th scope="col" className="px-6 py-3">Eligibility Criteria</th>
                      <th scope="col" className="px-6 py-3">Duration</th>
                      <th scope="col" className="px-6 py-3">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">B.Tech-Civil Engineering</td>
                      <td className="px-6 py-4">AP EAPCET</td>
                      <td className="px-6 py-4">4 Years</td>
                      <td className="px-6 py-4">60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be a Department that strives towards quality
              education,research and consultancy in Civil Engineering.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <b>M1:</b>To provide broad and high quality education to its
              students for a successful professional career.<br />
              <b>M2:</b>To serve the construction industry through
              dissemination of knowledge and technical service to rural
              community and professionals.<br />
              <b>M3:</b>To include ethics and human values, effective
              communication and leadership qualities among students to meet
              the challenge of the society.<br />
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and civil engineering principles.</li>
              <li>Analyze real-life problems and design socially responsible and environmentally sustainable civil engineering solutions.</li>
              <li>Adapt to evolving technologies through continuous learning.</li>
              <li>Lead a successful career as a team member or as a team leader with strong professional ethics and communication skills.</li>
            </ul>
          </div>
        );
      case 'POs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Engineering Knowledge:</strong> Apply knowledge of mathematics, science, engineering fundamentals, and civil engineering principles to solve complex engineering problems.</li>
              <li><strong>Problem Analysis:</strong> Identify, formulate, research literature, and analyze complex engineering problems to arrive at substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences.</li>
              <li><strong>Design/Development of Solutions:</strong> Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.</li>
              <li><strong>Modern Tool Usage:</strong> Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools for complex engineering activities with an understanding of the limitations.</li>
            </ul>
          </div>
        );
      case 'PSOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Apply standard practices and strategies in construction management using modern surveying tools to deliver quality infrastructure.</li>
              <li>Apply the fundamentals of civil engineering to solve engineering problems in interdisciplinary domains.</li>
              <li>Develop sustainable solutions for real-world problems in structural engineering, geotechnical engineering, transportation engineering, and water resources engineering.</li>
            </ul>
          </div>
        );
      case 'COs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 leading-relaxed">
              The course outcomes are defined for each course and are aligned with the Program Outcomes and Program Specific Outcomes. The course outcomes are assessed through direct and indirect assessment tools.
            </p>
            <p className="mt-4 text-gray-700">
              <a href="https://srivasaviengg.ac.in/uploads/civil/COs.pdf" className="text-[#B22222] hover:underline">Download Course Outcomes Document</a>
            </p>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
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
      case 'Department Library':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Library</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Image on the left */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/images/departments/ce/cse-lib.jpg"
                  alt="Department Library"
                  className="rounded-lg shadow-lg mb-4 max-h-96 object-contain"
                />
              </div>
              {/* Paragraph content on the right */}
              <div className="md:w-1/2">
                <p className="text-lg">
                  Department Library offers a variety of books related to Civil Engineering. Reference books of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are issued to students and staff. Students can access the Library facility according to their convenience any time round-the-clock.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white rounded-lg shadow border">
                    <div className="bg-[#850209] text-white rounded-t-lg py-2">
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
              </div>
            </div>
            {/* Faculty Incharge Details */}
            <div className="flex flex-col items-center mt-8">
              <h3 className="text-xl font-bold text-center">Faculty Incharge</h3>
              <p className="mt-4 text-lg">Mr. M.Prem Kumar Raju, Asst. Professor</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              The Department of Civil Engineering was established in 2011. The department offers undergraduate program in Civil Engineering with an intake of 60 students.
            </p>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Placements
            </h2>

            <div className="space-y-8">
              <details open>
                <summary className="font-semibold text-lg mb-2">Placements</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    {placements.length > 0 ? (
                      placements.map((p: any) => (
                        <li key={p.id}>
                          Placements for Batch {p.batch} -{' '}
                          <a
                            href={p.file_url}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View More
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
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Student Achievements
            </h2>
            <div className="space-y-8">
              {Object.keys(achievements).length > 0 ? (
                Object.entries(achievements).map(([category, items]) => (
                  <details key={category} open>
                    <summary className="font-semibold text-lg mb-2">{category}</summary>
                    <div className="ml-4">
                      <ul className="list-disc ml-6 space-y-2">
                        {items.map((item) => (
                          <li key={item.id}>
                            {item.title} ({item.academic_year}){' '}
                            <a
                              href={item.proof_document_url}
                              className="text-primary hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View More
                            </a>
                            {item.description && (
                              <p className="text-gray-600 text-sm">{item.description}</p>
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
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Achievements</h2>
            <div className="space-y-8">
              <details open>
                <summary className="font-semibold text-lg mb-2">Conferences</summary>
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
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">International Conferences</summary>
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
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">International Journals</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Patents</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Awards</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Memberships</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">NPTEL</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Faculty Outreach</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Funded Projects,FDP's</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
            </div>
          </div>
        );
      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">LIBRARY</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Image on the left */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/images/departments/ce/cse-lib.jpg"
                  alt="Faculty Incharge"
                  className="rounded-lg shadow-lg mb-4 max-h-96 object-contain"
                  style={{ height: '100%' }}
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
                <div className="bg-[#850209] text-white rounded-t-lg py-2">
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
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">R&amp;D</h2>
            <div className="space-y-6">
              {/* Dynamic R&D Activities */}
              {Object.keys(researchDevelopment).length > 0 ? (
                Object.entries(researchDevelopment).map(([activityType, activities]: [string, any]) => (
                  <div key={activityType}>
                    <h3 className="text-xl font-semibold text-[#850209] mb-4">{activityType}</h3>
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
                  <p>Science and Engineering Research Board, Department of Science &amp; Technology, Government of India, New Delhi Sponsored A Two Day National Workshop on "Nano Applications in Civil Engineering" on 12th &amp; 13th April, 2017</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in relative">
            {/* Logo Loader Overlay */}
            {getLoaderProps().isVisible && (
              <div {...getLoaderProps()}>
                <LogoLoader 
                  size="md"
                  showText={true}
                  text="Loading section..."
                  duration={1.0}
                />
              </div>
            )}
            
            {/* Desktop Navigation Tabs */}
            <div className="hidden md:block relative mb-8">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {sections.map((section) => {
                  const buttonProps = getTabButtonProps(section);
                  const isPending = pendingDeptTab === section;
                  return (
                    <button
                      key={section}
                      {...buttonProps}
                      onClick={() => switchDeptTab(section)}
                      className={`px-4 py-2 rounded-lg font-medium relative ${activeDeptTab === section
                        ? 'bg-[#B22222] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${isDeptTabLoading && !isPending ? 'opacity-50 cursor-not-allowed' : ''} ${isPending ? 'bg-[#B22222]/80 text-white' : ''}`}
                      style={{
                        transition: 'all 0.1s ease-out',
                        transform: 'translateZ(0)'
                      }}
                    >
                      {section === 'SalientFeatures' ? 'Salient Features' : section}
                      {/* Small loader for pending section */}
                      {isPending && (
                        <div className="absolute -top-1 -right-1 w-3 h-3">
                          <LogoLoader size="sm" showText={false} duration={0.8} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Row 2: Mission, PEOs, POs */}
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => switchDeptTab('Mission')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Mission'
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Mission
                </button>
                <button
                  onClick={() => switchDeptTab('PEOs')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PEOs'
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  PEOs
                </button>
                <button
                  onClick={() => switchDeptTab('POs')}
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
                  onClick={() => switchDeptTab('PSOs')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PSOs'
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  PSOs
                </button>
                <button
                  onClick={() => switchDeptTab('COs')}
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
                  onClick={() => switchDeptTab('SalientFeatures')}
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
                              switchDeptTab(section);
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
            <div 
              {...getContentProps()}
              className={`mt-6 ${getContentProps().className}`}
            >
              {renderDeptTabContent()}
            </div>
          </div>
        );


      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Members</h2>
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">S.No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Qualification</th>
                    <th className="px-4 py-2">Designation</th>
                    <th className="px-4 py-2">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty.map((member, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{member.name}</td>
                      <td className="px-4 py-2">{member.qualification}</td>
                      <td className="px-4 py-2">{member.designation}</td>
                      <td className="px-4 py-2">
                        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className="text-3xl font-bold text-[#B22222] mt-12 mb-6 text-center">Non-Teaching Staff</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">S.No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {nonTeachingFaculty.map((member, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{member.name}</td>
                      <td className="px-4 py-2">{member.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Board of Studies':
        return (
          <div className="tab4 mt-4">
            <details open className="border rounded-lg p-4">
              <summary
                className="px-4 py-3 cursor-pointer text-lg font-semibold text-white"
                style={{ backgroundColor: 'rgba(136,25,25,1)' }}
              >
                Board of Studies
              </summary>

              <div className="mt-4 overflow-x-auto">
                {studentBOS.length > 0 ? (
                  <table className="w-full text-sm text-left border-collapse border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-2 border border-gray-300">S.No</th>
                        <th className="px-4 py-2 border border-gray-300">Member Name</th>
                        <th className="px-4 py-2 border border-gray-300">Designation</th>
                        <th className="px-4 py-2 border border-gray-300">Organization</th>
                        <th className="px-4 py-2 border border-gray-300">Role</th>
                        <th className="px-4 py-2 border border-gray-300">Joined On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentBOS.map((member, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-2 border border-gray-300">{idx + 1}</td>
                          <td className="px-4 py-2 border border-gray-300 font-semibold">
                            {member.member_name}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">{member.designation}</td>
                          <td className="px-4 py-2 border border-gray-300">{member.organization}</td>
                          <td className="px-4 py-2 border border-gray-300">{member.role}</td>
                          <td className="px-4 py-2 border border-gray-300">
                            {new Date(member.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 italic">No Board of Studies members found.</p>
                )}
              </div>
            </details>
          </div>
        );

      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>
            <div className="tab4 mt-4">
              <details open className="border rounded-lg p-4">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>Class Timetables</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Master Timetable_A.Y for Sem-VIII 2022-23 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20VIII%20SEM(V18)%20TIMETABLE%20%20W.E.F%20-%2026.12.2022.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Master Timetable_A.Y for Sem-VI 2022-23 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20VI%20SEM(V20)%20TIMETABLE%20%20W.E.F%20-%2027.02.2023.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Master Timetable_A.Y for Sem-II 2021-22 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20IV%20SEM(V20)%20TIMETABLE%20%20W.E.F%2027.02.2023.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </details>
            </div>

            <div className="tab4 mt-4">
              <details className="border rounded-lg p-4">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>Class Rooms</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Class Rooms with ICT Enabled Facilities -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/CE_Classrooms.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </details>
            </div>
            <div className="tab4 mt-4">
              <details open className="border rounded-lg p-4">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>Class Laboratories</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Strength of Materials Lab</li>
                  <li>CAD & GSI Lab</li>
                  <li>Concrete Technology Lab</li>
                  <li>Engineering Geology Lab</li>
                  <li>Surveying Lab</li>
                  <li>Fluid Mechanics and Hydraulic Machinery Lab</li>
                  <li>Water and Waste Water Engineering Lab</li>
                  <li>Advanced Structural Engineering Lab</li>
                  <li>Geotechnical Engineering Lab</li>
                  <li>Transportation Engineering Lab</li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <img src="/images/departments/ce/civil_adslab.jpg" alt="Strength of Materials Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Strength of Materials Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_cadlab.jpg" alt="CAD & GIS Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">CAD & GIS Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_ctlab.jpg" alt="Concrete Technology Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Concrete Technology Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_gtlab.jpg" alt="Engineering Geology Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Engineering Geology Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_sllab.jpg" alt="Surveying Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Surveying Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_fmlab.jpg" alt="Fluid Mechanics & Hydraulic Machinery Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Fluid Mechanics & Hydraulic Machinery Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_waterlab.jpg" alt="Waste Water Engineering Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Waste Water Engineering Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_adslab.jpg" alt="Advanced Structural Engineering Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Advanced Structural Engineering Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_geolab.jpg" alt="Geotechnical Engineering Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Geotechnical Engineering Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_telab.jpg" alt="Transportation Engineering Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Transportation Engineering Lab</h4>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case "Workshops":
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Workshops
            </h2>

            <div className="tab4 mt-4">
              <details open className="border rounded-lg p-4">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>Class Tim</summary>
                <div className="ml-4">
                  <ol className="list-decimal ml-6 space-y-2">
                    {workshops.map((item) => (
                      <li key={item.id}>
                        {item.name} -{" "}
                        <a
                          href={item.url}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View More
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            </div>
          </div>
        );

      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Technical Association</h2>
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
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Newsletters
            </h2>
            <div className="space-y-6">
              {Array.isArray(newsletters) && newsletters.length > 0 ? (
                newsletters.map((item, index) => (
                  <details key={item.id} open={index === 0}>
                    <summary className="font-semibold text-lg mb-2">
                      Newsletter Issue {item.issue}
                    </summary>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        Newsletter Issue {item.issue} –{" "}
                        <a
                          href={item.url}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View More
                        </a>
                      </li>
                    </ul>
                  </details>
                ))
              ) : (
                <p>No newsletters available</p>
              )}
            </div>

            <h2 className="text-3xl font-bold text-[#850209] mt-12 mb-6 text-center">
              Technical Magazines
            </h2>
            <div className="space-y-6">
              <details open>
                <summary className="font-semibold text-lg mb-2">
                  Technical Magazine
                </summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Technical Magazine –{" "}
                    <a
                      href="#"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Extra-Curricular Activities
            </h2>
            <div className="space-y-6">
              <ul className="list-disc ml-6 space-y-4 text-center">
                <li>
                  Extracurricular activities during the Year 2018-19 -{' '}
                  <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/Extra_curricular_activities.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                </li>
                <li>
                  Extracurricular activities during the Year 2017-18 -{' '}
                  <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/ENGINEERS%20DAY(2017-2018).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                </li>
              </ul>
            </div>
          </div>
        );
        case 'Consultancy':
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Consultancy</h2>
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
                    className="inline-block mt-2 text-[#850209] hover:underline"
                  >
                    View Document
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Fallback static content if API fails
          <ul className="list-disc ml-6 space-y-4">
            <li>
              Consultancy Details for the Academic year 2022-2023 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202022-2023.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2021-2022 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202021-2022.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2020-2021 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202020-2021.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2019-2020 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202019-2020.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2018-2019 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202018-2019.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2017-2018 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202017-2018.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2016-2017 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202016-2017.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2015-2016 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202015-2016.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2014-2015 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202014-2015.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
            <li>
              Consultancy Details for the Academic year 2013-2014 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202013-2014.pdf"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );

      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Syllabus
            </h2>
            <div className="space-y-8">
              {Array.isArray(Syllabus) && Syllabus.length > 0 ? (
                Syllabus.map((item, index) => (
                  <details key={index} open>
                    <summary className="font-semibold text-lg mb-2">{item.program}</summary>
                    <div className="ml-4">
                      <ul className="list-disc ml-6 space-y-2">
                        <li>
                          <a
                            href={item.url}
                            className="text-primary hover:underline"
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


  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Civil Engineering</h1>
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
        title="Civil Department"
        buttonLabel="Department Menu"
      >
        {/* Main Content */}
        <div className="py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </FixedSidebar>
    </div>
  );
};

export default CivilDepartment;
