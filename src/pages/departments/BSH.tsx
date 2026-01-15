
import React, { useState, useEffect } from 'react';
import { Book, BookOpen, Award, Users, FileText, Activity, Phone, Microscope, Download, Presentation, Trophy, Building, Link as LinkIcon } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';

const BSHDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'FDPs/Guest Lectures Organized', label: 'FDPs/Guest Lectures Organized', icon: <Presentation className="w-4 h-4" /> },
    { id: 'FDPs/Workshops Participated', label: 'FDPs/Workshops Participated', icon: <Activity className="w-4 h-4" /> },
    { id: 'Faculty Paper Presentations', label: 'Faculty Paper Presentations', icon: <FileText className="w-4 h-4" /> },
    { id: 'Laboratories', label: 'Laboratories', icon: <Microscope className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Department Achievements', label: 'Department Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Activities', label: 'Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Results', label: 'Results', icon: <Award className="w-4 h-4" /> },
    //{ id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];


  // Faculty state for DB data
  type Faculty = {
    id: number;
    name: string;
    department: string;
    qualification: string;
    designation: string;
    profileUrl: string;
  };
  const [facultyData, setFacultyData] = useState<{ [department: string]: Faculty[] }>({});
  const [loadingFaculty, setLoadingFaculty] = useState(true);
  const [facultyError, setFacultyError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh-faculty${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch faculty data');
        const data: Faculty[] = await res.json();
        // Group by department (chemistry, physics, etc)
        const grouped: { [department: string]: Faculty[] } = {};
        data.forEach(fac => {
          if (!grouped[fac.department]) grouped[fac.department] = [];
          grouped[fac.department].push(fac);
        });
        setFacultyData(grouped);
      } catch (err: any) {
        setFacultyError(err.message || 'Unknown error');
      } finally {
        setLoadingFaculty(false);
      }
    };
    fetchFaculty();
  }, []);

  // Non-teaching faculty state
  type NonTeachingFaculty = {
    id: number;
    name: string;
    designation: string;
  };
  const [nonTeachingFaculty, setNonTeachingFaculty] = useState<NonTeachingFaculty[]>([]);
  const [loadingNonTeaching, setLoadingNonTeaching] = useState(true);
  const [nonTeachingError, setNonTeachingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNonTeaching = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/non-teaching-bsh-faculty${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch non-teaching faculty');
        const data: NonTeachingFaculty[] = await res.json();
        setNonTeachingFaculty(data);
      } catch (err: any) {
        setNonTeachingError(err.message || 'Unknown error');
      } finally {
        setLoadingNonTeaching(false);
      }
    };
    fetchNonTeaching();
  }, []);

  // Board of Studies data state
  const [bosData, setBosData] = useState<{ [section: string]: any[] }>({});
  const [loadingBos, setLoadingBos] = useState(true);
  const [bosError, setBosError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBos = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/board-of-studies${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch Board of Studies data');
        const data = await res.json();
        // Group by section
        const grouped: { [section: string]: any[] } = {};
        data.forEach((item: any) => {
          if (!grouped[item.section]) grouped[item.section] = [];
          grouped[item.section].push(item);
        });
        setBosData(grouped);
      } catch (err: any) {
        setBosError(err.message || 'Unknown error');
      } finally {
        setLoadingBos(false);
      }
    };
    fetchBos();
  }, []);

  // FDPs/Workshops data state
  const [fdpDocs, setFdpDocs] = useState<any[]>([]);
  const [loadingFdp, setLoadingFdp] = useState(true);
  const [fdpError, setFdpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFdp = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/department-documents${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch FDPs/Workshops');
        const data = await res.json();
        setFdpDocs(data.filter((doc: any) => doc.section === 'fdp_workshops'));
      } catch (err: any) {
        setFdpError(err.message || 'Unknown error');
      } finally {
        setLoadingFdp(false);
      }
    };
    fetchFdp();
  }, []);

  // FDPs/Guest Lectures Organized data state (from bsh_fdps table)
  const [fdpsOrganized, setFdpsOrganized] = useState<any[]>([]);
  const [loadingFdpsOrganized, setLoadingFdpsOrganized] = useState(true);
  const [fdpsOrganizedError, setFdpsOrganizedError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFdpsOrganized = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh-fdps${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch FDPs/Guest Lectures Organized');
        const data = await res.json();
        setFdpsOrganized(data);
      } catch (err: any) {
        setFdpsOrganizedError(err.message || 'Unknown error');
      } finally {
        setLoadingFdpsOrganized(false);
      }
    };
    fetchFdpsOrganized();
  }, []);

  // Department Profile data state (dynamic)
  const [deptProfile, setDeptProfile] = useState<any>(null);
  const [loadingDeptProfile, setLoadingDeptProfile] = useState(true);
  const [deptProfileError, setDeptProfileError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/department-profile${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch department profile');
        const data = await res.json();
        setDeptProfile(data);
      } catch (err: any) {
        setDeptProfileError(err.message || 'Unknown error');
      } finally {
        setLoadingDeptProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // Results state (dynamic)
  const [results, setResults] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [resultsError, setResultsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh_results${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch results');
        const data = await res.json();
        setResults(data);
      } catch (err: any) {
        setResultsError(err.message || 'Unknown error');
      } finally {
        setLoadingResults(false);
      }
    };
    fetchResults();
  }, []);

  // Activities state (dynamic)
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh_activities${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch activities');
        const data = await res.json();
        setActivities(data);
      } catch (err: any) {
        setActivitiesError(err.message || 'Unknown error');
      } finally {
        setLoadingActivities(false);
      }
    };
    fetchActivities();
  }, []);

  // Faculty Achievements state (dynamic)
  const [facultyAchievements, setFacultyAchievements] = useState<any[]>([]);
  const [loadingFacultyAchievements, setLoadingFacultyAchievements] = useState(true);
  const [facultyAchievementsError, setFacultyAchievementsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh_faculty_achievements${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch faculty achievements');
        const data = await res.json();
        setFacultyAchievements(data);
      } catch (err: any) {
        setFacultyAchievementsError(err.message || 'Unknown error');
      } finally {
        setLoadingFacultyAchievements(false);
      }
    };
    fetchAchievements();
  }, []);

  // Laboratories state (dynamic)
  const [labs, setLabs] = useState<any[]>([]);
  const [loadingLabs, setLoadingLabs] = useState(true);
  const [labsError, setLabsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh_laboratories${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch laboratories');
        const data = await res.json();
        setLabs(data);
      } catch (err: any) {
        setLabsError(err.message || 'Unknown error');
      } finally {
        setLoadingLabs(false);
      }
    };
    fetchLabs();
  }, []);

  // Faculty Paper Presentations state (dynamic)
  const [paperPresentations, setPaperPresentations] = useState<any[]>([]);
  const [loadingPaperPresentations, setLoadingPaperPresentations] = useState(true);
  const [paperPresentationsError, setPaperPresentationsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh_faculty_paper_presentations${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch paper presentations');
        const data = await res.json();
        setPaperPresentations(data);
      } catch (err: any) {
        setPaperPresentationsError(err.message || 'Unknown error');
      } finally {
        setLoadingPaperPresentations(false);
      }
    };
    fetchPapers();
  }, []);

  // Student Achievements state (dynamic)
  const [studentAchievements, setStudentAchievements] = useState<any[]>([]);
  const [loadingStudentAchievements, setLoadingStudentAchievements] = useState(true);
  const [studentAchievementsError, setStudentAchievementsError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh_student_achievements${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch student achievements');
        const data = await res.json();
        setStudentAchievements(data);
      } catch (err: any) {
        setStudentAchievementsError(err.message || 'Unknown error');
      } finally {
        setLoadingStudentAchievements(false);
      }
    };
    fetchAchievements();
  }, []);

  // Syllabus state (dynamic)
  const [syllabus, setSyllabus] = useState<any[]>([]);
  const [loadingSyllabus, setLoadingSyllabus] = useState(true);
  const [syllabusError, setSyllabusError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const res = await fetch(`/api/bsh/bsh-syllabus${cacheBuster}`);
        if (!res.ok) throw new Error('Failed to fetch syllabus');
        const data = await res.json();
        setSyllabus(data);
      } catch (err: any) {
        setSyllabusError(err.message || 'Unknown error');
      } finally {
        setLoadingSyllabus(false);
      }
    };
    fetchSyllabus();
  }, []);

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        if (!deptProfile) {
          return loadingDeptProfile ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : deptProfileError ? (
            <div className="text-red-600">Error: {deptProfileError}</div>
          ) : null;
        }
        return (
          <></>
          // <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
          //   <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
          //   <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-fade-in">
          //     <div className="md:w-1/3">
          //       <img
          //         src={deptProfile.hod_image_url}
          //         alt={deptProfile.hod_name}
          //         className="w-full h-auto object-cover rounded-lg shadow-md"
          //       />
          //     </div>
          //     <div className="md:w-2/3">
          //       <h3 className="text-xl font-bold text-[#B22222] mb-2">{deptProfile.hod_name}</h3>
          //       <p className="text-gray-700 mb-2">{deptProfile.hod_qualification}</p>
          //       <p className="text-gray-700 mb-2">
          //         <a href={`mailto:${deptProfile.hod_email}`} className="text-[#B22222] hover:underline">{deptProfile.hod_email}</a>
          //       </p>
          //       <p className="text-gray-700 text-lg text-justify">{deptProfile.hod_message}</p>
          //     </div>
          //   </div>
          //   {/* <p className="text-gray-700 mb-3 text-justify">{deptProfile.department_overview}</p> */}
          // </div>
        );
      case 'Vision':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To provide excellent foundation in basic sciences and humanities to create competent engineers with strong analytical and communication skills.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To impart quality education in basic sciences and humanities.</li>
              <li>To develop analytical and problem-solving skills among students.</li>
              <li>To enhance communication skills and personality development.</li>
              <li>To provide strong foundation for advanced engineering concepts.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Apply mathematical and scientific principles to solve engineering problems.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Communicate effectively in professional and academic environments.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Demonstrate ethical values and social responsibility in their profession.</p>
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
                  <strong style={{ color: '#850209' }}>Engineering knowledge:</strong>
                  Apply the knowledge of Mathematics, Science, Engineering Fundamentals, and Concepts of Computer Science Engineering to the solution of complex Engineering problems. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Problem Analysis:</strong>
                  Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of Mathematics, Natural Sciences, and Computer Science. [K4]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Design/development of solutions:</strong>
                  Design solutions for complex engineering problems and design system components or processes that meet the specific needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental considerations. [K5]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Conduct investigations of complex problems:</strong>
                  Use research-based knowledge and research methods, including the design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions. [K5]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Modern tool usage:</strong>
                  Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling, to complex Engineering activities with an understanding of the limitations. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>The engineer and society:</strong>
                  Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues and the consequent responsibilities relevant to professional Engineering practice. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Environment and sustainability:</strong>
                  Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate knowledge of, and the need for sustainable development. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Ethics:</strong>
                  Apply ethical principles and commit to professional ethics and responsibilities and norms of Engineering practice. [K3]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Individual and team work:</strong>
                  Function effectively as an individual and as a member or leader in diverse teams and in multidisciplinary settings. [K6]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Communication:</strong>
                  Communicate effectively on complex Engineering activities with the Engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions. [K2]
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#850209' }}>Project management and finance:</strong>
                  Demonstrate knowledge and understanding of Engineering and Management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments. [K6]
                </li>
                <li>
                  <strong style={{ color: '#850209' }}>Life-long learning:</strong>
                  Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change. [K1]
                </li>
              </ol>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 1</h4>
                <p className="text-gray-700">Apply mathematical tools and techniques to model and solve engineering problems.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 2</h4>
                <p className="text-gray-700">Demonstrate proficiency in scientific experimentation and analysis.</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the Basic Sciences & Humanities department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="/uploads/bsh/COs.pdf"
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
              <li>Experienced faculty with strong academic background</li>
              <li>Well-equipped Physics and Chemistry laboratories</li>
              <li>Focus on building strong foundation in basic sciences</li>
              <li>Regular faculty development programs and workshops</li>
              <li>Emphasis on communication skills development</li>
              <li>Active participation in research and publications</li>
              <li>Student-centric teaching methodologies</li>
            </ul>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Results':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Results</h2>
            {loadingResults ? (
              <div>Loading...</div>
            ) : resultsError ? (
              <div className="text-red-600">Error: {resultsError}</div>
            ) : (
              <div className="nav-content mb-2">
                <details open className="cst-dropdown">
                  <summary className="flex justify-between items-center">
                    <span>Results Since 2001</span>
                  </summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 space-y-2">
                      {results.map((result) => (
                        <li key={result.id}>
                          {result.title} -{' '}
                          <a
                            href={result.url}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      case 'Activities':
        // Group activities by section
        const groupedActivities: { [section: string]: any[] } = {};
        activities.forEach((act) => {
          if (!groupedActivities[act.section]) groupedActivities[act.section] = [];
          groupedActivities[act.section].push(act);
        });
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Activities</h2>
            {loadingActivities ? (
              <div>Loading...</div>
            ) : activitiesError ? (
              <div className="text-red-600">Error: {activitiesError}</div>
            ) : (
              Object.entries(groupedActivities).map(([section, acts], index) => (
                <details key={section} {...(index === 0 ? { open: true } : {})} className="cst-dropdown">
                  <summary className="flex justify-between items-center">
                    <span>{section}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 space-y-2">
                      {acts.map((act) => (
                        <li key={act.id}>
                          {act.title} {act.year ? `(${act.year})` : ''} -{' '}
                          <a href={act.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))
            )}
          </div>
        );
      case 'Faculty Achievements':
        // Group faculty achievements by section
        const groupedAchievements: { [section: string]: any[] } = {};
        facultyAchievements.forEach((ach) => {
          if (!groupedAchievements[ach.section]) groupedAchievements[ach.section] = [];
          groupedAchievements[ach.section].push(ach);
        });
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
            {loadingFacultyAchievements ? (
              <div>Loading...</div>
            ) : facultyAchievementsError ? (
              <div className="text-red-600">Error: {facultyAchievementsError}</div>
            ) : (
              Object.entries(groupedAchievements).map(([section, achs], index) => (
                <details key={section} {...(index === 0 ? { open: true } : {})} className="cst-dropdown">
                  <summary className="flex justify-between items-center">
                    <span>{section}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 space-y-2">
                      {achs.map((ach) => (
                        <li key={ach.id}>
                          {ach.title} -{' '}
                          <a href={ach.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))
            )}
          </div>
        );
      case 'Laboratories':
        // Group labs by lab_name
        const groupedLabs: { [lab_name: string]: any[] } = {};
        labs.forEach((lab) => {
          if (!groupedLabs[lab.lab_name]) groupedLabs[lab.lab_name] = [];
          groupedLabs[lab.lab_name].push(lab);
        });
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Laboratories</h2>
            {loadingLabs ? (
              <div>Loading...</div>
            ) : labsError ? (
              <div className="text-red-600">Error: {labsError}</div>
            ) : (
              Object.entries(groupedLabs).map(([lab_name, items], index) => (
                <div className="mt-4 m-2" key={lab_name}>
                  <details {...(index === 0 ? { open: true } : {})} className="cst-dropdown">
                    <summary className="flex justify-between items-center">
                      <span>{lab_name}</span>

                    </summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 space-y-2">
                        {items.map((item) => (
                          <li key={item.id}>
                            {item.description} -{' '}
                            <a href={item.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              ))
            )}
          </div>
        );
      case 'Faculty Paper Presentations':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Paper Presentations</h2>
            {loadingPaperPresentations ? (
              <div>Loading...</div>
            ) : paperPresentationsError ? (
              <div className="text-red-600">Error: {paperPresentationsError}</div>
            ) : (
              <details open className="cst-dropdown">
                <summary className="flex justify-between items-center">
                  <span>Faculty Paper Presentations</span>

                </summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 space-y-2">
                    {paperPresentations.map((item) => (
                      <li key={item.id}>
                        {item.title} {item.year ? `(${item.year})` : ''} -{' '}
                        <a href={item.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            )}
          </div>
        );

      case 'FDPs/Workshops Participated':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">FDPs/Workshops Participated</h2>
            {loadingFdp ? (
              <div>Loading...</div>
            ) : fdpError ? (
              <div className="text-red-600">Error: {fdpError}</div>
            ) : (
              <details open className="cst-dropdown">
                <summary className="flex justify-between items-center">
                  <span>FDPs/Workshops Participated</span>

                </summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 space-y-2">
                    {fdpDocs.map((doc, idx) => (
                      <li key={doc.id}>
                        {doc.title} -{' '}
                        <a href={doc.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            )}
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
                !deptProfile ? (
                  loadingDeptProfile ? (
                    <div className="text-center text-gray-600">Loading...</div>
                  ) : deptProfileError ? (
                    <div className="text-red-600">Error: {deptProfileError}</div>
                  ) : null
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-fade-in">
                    <div className="md:w-1/3">
                      <img
                        src={deptProfile.hod_image_url}
                        alt={deptProfile.hod_name}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold text-[#B22222] mb-2">{deptProfile.hod_name}</h3>
                      <p className="text-gray-700 mb-2">{deptProfile.hod_qualification}</p>
                      <p className="text-gray-700 mb-2">
                        <a href={`mailto:${deptProfile.hod_email}`} className="text-[#B22222] hover:underline">{deptProfile.hod_email}</a>
                      </p>
                      <p className="text-gray-700 text-lg text-justify">{deptProfile.hod_message}</p>
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

      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>
            {loadingFdpsOrganized ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : fdpsOrganizedError ? (
              <div className="text-red-600">Error: {fdpsOrganizedError}</div>
            ) : (
              <details open className="mt-4">
                <summary className="bg-[#B22222] text-white font-semibold text-lg p-4 rounded-lg cursor-pointer hover:bg-[#8B1A1A] transition-colors duration-300">FDPs and Guest Lectures Organized</summary>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  {fdpsOrganized.length > 0 ? (
                    fdpsOrganized.map((fdp) => (
                      <li key={fdp.id}>
                        {fdp.title} {fdp.year ? `(${fdp.year})` : ''} -{' '}
                        <a href={fdp.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600">No FDPs/Guest Lectures data available</li>
                  )}
                </ul>
              </details>
            )}
          </div>
        );

      case 'FDPs/Guest Lectures Organized':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">FDPs/Guest Lectures Organized</h2>
            {loadingFdpsOrganized ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : fdpsOrganizedError ? (
              <div className="text-red-600">Error: {fdpsOrganizedError}</div>
            ) : (
              <div className="space-y-4">
                {/* FDPs Organized Dropdown */}
                <details className="cst-dropdown">
                  <summary className="flex justify-between items-center">
                    <span>FDPs Organized</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    {fdpsOrganized.filter((fdp) => fdp.type === 'fdp_organized').length > 0 ? (
                      <ul className="list-disc pl-6 space-y-2">
                        {fdpsOrganized
                          .filter((fdp) => fdp.type === 'fdp_organized')
                          .map((fdp) => (
                            <li key={fdp.id} className="text-gray-800">
                              {fdp.title} {fdp.year ? `(${fdp.year})` : ''}{' '}
                              {fdp.url ? (
                                <>
                                  {' - '}
                                  <a href={fdp.url} className="text-[#B22222] hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                                    View
                                  </a>
                                </>
                              ) : (
                                ''
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No FDPs organized available</p>
                    )}
                  </div>
                </details>

                {/* Guest Lectures Organized Dropdown */}
                <details className="cst-dropdown">
                  <summary className="flex justify-between items-center">
                    <span>Guest Lectures Organized</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    {fdpsOrganized.filter((fdp) => fdp.type === 'guest_lectures_organized').length > 0 ? (
                      <ul className="list-disc pl-6 space-y-2">
                        {fdpsOrganized
                          .filter((fdp) => fdp.type === 'guest_lectures_organized')
                          .map((fdp) => (
                            <li key={fdp.id} className="text-gray-800">
                              {fdp.title} {fdp.year ? `(${fdp.year})` : ''}{' '}
                              {fdp.url ? (
                                <>
                                  {' - '}
                                  <a href={fdp.url} className="text-[#B22222] hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                                    View
                                  </a>
                                </>
                              ) : (
                                ''
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No guest lectures organized available</p>
                    )}
                  </div>
                </details>
              </div>
            )}
          </div>
        );

      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            {loadingBos ? (
              <div>Loading...</div>
            ) : bosError ? (
              <div className="text-red-600">Error: {bosError}</div>
            ) : (
              <>
                {Object.entries(bosData).map(([section, items], index) => (
                  <details key={section} {...(index === 0 ? { open: true } : {})} className="cst-dropdown">
                    <summary className="flex justify-between items-center">
                      <span>
                        {section === 'english' && 'English BOS Meetings'}
                        {section === 'joint' && 'Joint BOS'}
                        {section === 'mathematics' && 'Mathematics BOS Meetings'}
                        {section === 'chemistry' && 'Chemistry BOS Meetings'}
                        {section === 'physics' && 'Physics BOS Meetings'}
                        {/* Add more as needed */}
                      </span>

                    </summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc space-y-2">
                        {items.map((item, idx) => (
                          <li key={item.id}>
                            {item.title}
                            {item.date ? `, dated ${item.date}` : ''} -{' '}
                            <a href={item.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </>
            )}
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>

            {/* Teaching Faculty Dropdown */}
            <details open className="cst-dropdown">
              <summary className="flex justify-between items-center">
                <span>Teaching Faculty</span>

              </summary>
              <div className="cst-dropdown-content">
                {loadingFaculty ? (
                  <div>Loading faculty data...</div>
                ) : facultyError ? (
                  <div className="text-red-600">Error: {facultyError}</div>
                ) : (
                  Object.entries(facultyData)
                    .sort(([deptA], [deptB]) => {
                      // Define subject priority: Mathematics → Chemistry → Physics → English → Others
                      const getPriority = (dept: string) => {
                        const d = dept.toLowerCase();
                        if (d === 'mathematics') return 1;
                        if (d === 'chemistry') return 2;
                        if (d === 'physics') return 3;
                        if (d === 'english') return 4;
                        return 5; // Others (library, physical education, etc.)
                      };
                      return getPriority(deptA) - getPriority(deptB);
                    })
                    .map(([department, members]) => {
                      let displayName = '';
                      switch (department.toLowerCase()) {
                        case 'chemistry':
                          displayName = 'Chemistry Teaching Faculty';
                          break;
                        case 'physics':
                          displayName = 'Physics Teaching Faculty';
                          break;
                        case 'mathematics':
                          displayName = 'Mathematics Teaching Faculty';
                          break;
                        case 'english':
                          displayName = 'English Teaching Faculty';
                          break;
                        case 'library':
                          displayName = 'Library Faculty';
                          break;
                        case 'physicaleducation':
                        case 'physical_education':
                          displayName = 'Physical Education Faculty';
                          break;
                        default:
                          displayName = department.charAt(0).toUpperCase() + department.slice(1);
                      }
                      return (
                        <div key={department} className="mb-10">
                          <h3 className="text-2xl font-semibold text-gray-700 mb-4 capitalize border-b-2 border-primary pb-2">{displayName}</h3>
                          <div className="overflow-x-auto">
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
                                {members.map((member, index) => (
                                  <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2 font-medium">{member.name}</td>
                                    <td className="px-4 py-2">{member.qualification}</td>
                                    <td className="px-4 py-2">{member.designation}</td>
                                    <td className="px-4 py-2">
                                      {member.profileUrl ? (
                                        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a>
                                      ) : (
                                        <span className="text-gray-400">N/A</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </details>

            {/* Non-Teaching Faculty Dropdown */}
            <details className="cst-dropdown">
              <summary className="flex justify-between items-center">
                <span>Non-Teaching Staff</span>

              </summary>
              <div className="cst-dropdown-content">
                {loadingNonTeaching ? (
                  <div>Loading non-teaching faculty...</div>
                ) : nonTeachingError ? (
                  <div className="text-red-600">Error: {nonTeachingError}</div>
                ) : (
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
                          <tr key={member.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2 font-medium">{member.name}</td>
                            <td className="px-4 py-2">{member.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </details>
          </div>
        );
      case 'Student Achievements':
        // Group student achievements by section
        const groupedStudentAchievements: { [section: string]: any[] } = {};
        studentAchievements.forEach((ach) => {
          if (!groupedStudentAchievements[ach.section]) groupedStudentAchievements[ach.section] = [];
          groupedStudentAchievements[ach.section].push(ach);
        });
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
            {loadingStudentAchievements ? (
              <div>Loading...</div>
            ) : studentAchievementsError ? (
              <div className="text-red-600">Error: {studentAchievementsError}</div>
            ) : (
              Object.entries(groupedStudentAchievements).map(([section, achs], index) => (
                <details key={section} {...(index === 0 ? { open: true } : {})} className="cst-dropdown">
                  <summary className="flex justify-between items-center">
                    <span>{section}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc ml-6 mt-4 space-y-2">
                      {achs.map((ach) => (
                        <li key={ach.id}>
                          {ach.title} {ach.year ? `(${ach.year})` : ''} -{' '}
                          <a href={ach.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))
            )}
          </div>
        );
      case 'Department Achievements':
        // Group department achievements by section
        const groupedDeptAchievements: { [section: string]: any[] } = {};
        facultyAchievements.forEach((ach) => {
          if (!groupedDeptAchievements[ach.section]) groupedDeptAchievements[ach.section] = [];
          groupedDeptAchievements[ach.section].push(ach);
        });
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Achievements</h2>
            {loadingFacultyAchievements ? (
              <div>Loading...</div>
            ) : facultyAchievementsError ? (
              <div className="text-red-600">Error: {facultyAchievementsError}</div>
            ) : (
              Object.entries(groupedDeptAchievements).map(([section, achs], index) => (
                <details key={section} {...(index === 0 ? { open: true } : {})} className="cst-dropdown">
                  <summary className="flex justify-between items-center">
                    <span>{section}</span>

                  </summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc ml-6 mt-4 space-y-2">
                      {achs.map((ach) => (
                        <li key={ach.id}>
                          {ach.title} {ach.year ? `(${ach.year})` : ''} -{' '}
                          <a href={ach.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))
            )}
          </div>
        );
      case 'Syllabus':
        // Group syllabus by academic year
        const groupedSyllabus: { [year: string]: any[] } = {};
        syllabus.forEach((doc) => {
          const year = doc.academic_year || 'General';
          if (!groupedSyllabus[year]) groupedSyllabus[year] = [];
          groupedSyllabus[year].push(doc);
        });
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            {loadingSyllabus ? (
              <div>Loading...</div>
            ) : syllabusError ? (
              <div className="text-red-600">Error: {syllabusError}</div>
            ) : Object.keys(groupedSyllabus).length === 0 ? (
              <div className="text-gray-600 text-center py-8">No syllabus documents available</div>
            ) : (
              Object.entries(groupedSyllabus)
                .sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
                .map(([year, docs], index) => (
                  <details key={year} {...(index === 0 ? { open: true } : {})} className="mt-6">
                    <summary className="bg-[#B22222] text-white font-semibold text-lg p-4 rounded-lg cursor-pointer hover:bg-[#8B1A1A] transition-colors duration-300">
                      Academic Year {year}
                    </summary>
                    <div className="mt-4 pl-6 pr-4 pb-4">
                      <ul className="list-disc space-y-2">
                        {docs
                          .sort((a, b) => (b.title || '').localeCompare(a.title || ''))
                          .map((doc, idx) => (
                            <li key={doc.id || idx}>
                              <span className="font-medium">{doc.type || 'Course'}</span> - {doc.title} {' '}
                              <a
                                href={doc.fileUrl}
                                className="text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Syllabus
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </details>
                ))
            )}
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
        title="Basic Sciences & Humanities Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};


export default BSHDepartment;