import React, { useState, useEffect } from 'react';
import { Book, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

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
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
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
        const res = await fetch('/api/bsh/bsh-faculty');
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
        const res = await fetch('/api/bsh/non-teaching-bsh-faculty');
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
        const res = await fetch('/api/bsh/board-of-studies');
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
        const res = await fetch('/api/bsh/department-documents');
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

  // Department Profile data state (dynamic)
  const [deptProfile, setDeptProfile] = useState<any>(null);
  const [loadingDeptProfile, setLoadingDeptProfile] = useState(true);
  const [deptProfileError, setDeptProfileError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/bsh/department-profile');
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
        const res = await fetch('/api/bsh/bsh_results');
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
        const res = await fetch('/api/bsh/bsh_activities');
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
        const res = await fetch('/api/bsh/bsh_faculty_achievements');
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
        const res = await fetch('/api/bsh/bsh_laboratories');
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
        const res = await fetch('/api/bsh/bsh_faculty_paper_presentations');
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
        const res = await fetch('/api/bsh/bsh_student_achievements');
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

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-6">
              <div className="relative">
                <img
                  src="/bsh_hod.jpeg"
                  alt="Mr. N. Rajasekhar"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Mr. N. Rajasekhar</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Associate Professor & Head of Department, BSH</p>
                  <p className="text-gray-600">M.Sc., M.Phil in Mathematics</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_bsh@srivasaviengg.ac.in" className="text-primary hover:underline">hod_bsh@srivasaviengg.ac.in</a></p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-3 text-justify">
              The Department of Basic Sciences & Humanities (BSH) was established in 2001 to provide strong foundation in Mathematics, Physics, Chemistry, and English for all engineering students. The department plays a crucial role in building the fundamental knowledge required for engineering education.
            </p>
            <p className="text-gray-700 mb-3 text-justify">
              Our experienced faculty members are dedicated to providing quality education and fostering analytical thinking among students. The department has well-equipped laboratories for Physics and Chemistry practicals.
            </p>
          </div>
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
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes (POs)</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO1: Mathematical Knowledge</h4>
                <p className="text-gray-700">Apply mathematical concepts and methods to solve engineering problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Scientific Principles</h4>
                <p className="text-gray-700">Understand and apply basic principles of physics and chemistry in engineering contexts.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Communication Skills</h4>
                <p className="text-gray-700">Communicate effectively in written and oral forms in professional settings.</p>
              </div>
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
                href="https://srivasaviengg.ac.in/uploads/bsh/COs.pdf"
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
                <details open>
                  <summary className="font-semibold text-lg mb-2">Results Since 2001</summary>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
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
              Object.entries(groupedActivities).map(([section, acts]) => (
                <details key={section} open>
                  <summary className="font-semibold text-lg mb-2">{section}</summary>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    {acts.map((act) => (
                      <li key={act.id}>
                        {act.title} {act.year ? `(${act.year})` : ''} -{' '}
                        <a href={act.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                      </li>
                    ))}
                  </ul>
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
              Object.entries(groupedAchievements).map(([section, achs]) => (
                <details key={section} open className="mt-4">
                  <summary className="font-semibold text-lg mb-2">{section}</summary>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    {achs.map((ach) => (
                      <li key={ach.id}>
                        {ach.title} -{' '}
                        <a href={ach.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                      </li>
                    ))}
                  </ul>
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
              Object.entries(groupedLabs).map(([lab_name, items]) => (
                <div className="mt-4 m-2" key={lab_name}>
                  <details open>
                    <summary className="font-semibold text-lg mb-2">{lab_name}</summary>
                    <div>
                      <ul className="list-disc ml-6 mt-4 space-y-2">
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
              <details open>
                <summary className="font-semibold text-lg mb-2">Faculty Paper Presentations</summary>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  {paperPresentations.map((item) => (
                    <li key={item.id}>
                      {item.title} {item.year ? `(${item.year})` : ''} -{' '}
                      <a href={item.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  ))}
                </ul>
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
        <details open>
          <summary className="font-semibold text-lg mb-2">FDPs/Workshops Participated</summary>
          <ul className="list-disc ml-6 mt-4 space-y-2">
            {fdpDocs.map((doc, idx) => (
              <li key={doc.id}>
                {doc.title} -{' '}
                <a href={doc.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
            {loadingDeptProfile ? (
              <div>Loading...</div>
            ) : deptProfileError ? (
              <div className="text-red-600">Error: {deptProfileError}</div>
            ) : deptProfile ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="relative">
                    <img
                      src={deptProfile.hod_image_url}
                      alt={deptProfile.hod_name}
                      className="w-full h-80 object-cover rounded-lg shadow-md"
                      data-ai-hint="male professor"
                    />
                  </div>
                  <div className="lg:col-span-2 space-y-4">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-[#B22222] mb-2">{deptProfile.hod_name}</h3>
                      <p className="text-lg text-[#8B0000] font-medium mb-2">{deptProfile.hod_designation}</p>
                      <p className="text-gray-600">Mobile No: {deptProfile.hod_mobile}</p>
                      <p className="text-gray-600">Phone No: {deptProfile.hod_phone}</p>
                      <p className="text-gray-600">
                        Email: <a href={`mailto:${deptProfile.hod_email}`} className="text-primary hover:underline">{deptProfile.hod_email}</a>
                      </p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{deptProfile.hod_message}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-700 mb-3 text-justify">{deptProfile.department_overview}</p>
                </div>
              </>
            ) : null}
            {/* Desktop Navigation Tabs */}
            <div className="hidden md:block relative mb-8 mt-8">
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
            <div className="md:hidden relative mb-8 mt-8">
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
            <div className="mt-6">
              {renderDeptTabContent()}
            </div>
          </div>
        );

      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">FDPs Organized</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Applications of Mathematics in Engineering -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/FDP%20Organized.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  The Role of Physics in Engineering Technology -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/write%20up%20on%20FDP%20by%20Physics%20Section%20(1).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Guest Lectures Organised</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Guest Lecture on Applications of Mathematics in Real Life -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Guest%20Lecture%20on%20Applications%20of%20Mathematics%20in%20Real%20Life.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
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
                {Object.entries(bosData).map(([section, items]) => (
                  <details key={section} open className="mt-4">
                    <summary className="font-semibold text-lg mb-2">
                      {section === 'english' && 'English BOS Meetings'}
                      {section === 'joint' && 'Joint BOS'}
                      {section === 'mathematics' && 'Mathematics BOS Meetings'}
                      {section === 'chemistry' && 'Chemistry BOS Meetings'}
                      {section === 'physics' && 'Physics BOS Meetings'}
                      {/* Add more as needed */}
                    </summary>
                    <ul className="list-disc ml-6 mt-4 space-y-2">
                      {items.map((item, idx) => (
                        <li key={item.id}>
                          {item.title}
                          {item.date ? `, dated ${item.date}` : ''} -{' '}
                          <a href={item.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                        </li>
                      ))}
                    </ul>
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
            {loadingFaculty ? (
              <div>Loading faculty data...</div>
            ) : facultyError ? (
              <div className="text-red-600">Error: {facultyError}</div>
            ) : (
              Object.entries(facultyData).map(([department, members]) => {
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
            <h2 className="text-3xl font-bold text-[#B22222] mt-12 mb-6 text-center">Non-Teaching Staff</h2>
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
              Object.entries(groupedStudentAchievements).map(([section, achs]) => (
                <details key={section} open className="mb-4">
                  <summary className="font-semibold text-lg mb-2">{section}</summary>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    {achs.map((ach) => (
                      <li key={ach.id}>
                        {ach.title} {ach.year ? `(${ach.year})` : ''} -{' '}
                        <a href={ach.url} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))
            )}
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
            <h1 className="text-3xl md:text-4xl font-bold">Basic Science & Humanities</h1>
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
        title="BSH Department"
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


export default BSHDepartment;
