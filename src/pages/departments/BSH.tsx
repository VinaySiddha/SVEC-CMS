
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
        const res = await fetch('/api/bsh-faculty');
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
        const res = await fetch('/api/non-teaching-bsh-faculty');
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
            <div className="nav-content mb-2">
              <details open>
                <summary className="font-semibold text-lg mb-2">Results Since 2001</summary>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    B.Tech 1st Year Results since 2001 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/bsh/I%20B.Tech%20Results.pdf"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Activities</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">National Mathematics Day</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  National Mathematics Day 2022 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/National%20Mathematics%20Day%20-%202022.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
                <li>
                  National Mathematics Day 2015 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/National%20Mathematics%20Day%20-%202015.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
                <li>
                  National Mathematics Day 2014 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/National%20Mathematics%20Day%20-%202014.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
                <li>
                  National Mathematics Day 2012 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/National%20Mathematics%20Day%20-%202012.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
              </ul>
            </details>
            <details>
              <summary className="font-semibold text-lg mb-2">Fly High Program</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Fly High Details -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/Fly High Details.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
              </ul>
            </details>
            <details>
              <summary className="font-semibold text-lg mb-2">World Environment Day</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  World Environment Day 2015 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/bsh/WORLD%20ENVIRONMENT%20DAY-%202015.pdf"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </li>
              </ul>
            </details>
          </div>
        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">Paper Publications</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    Paper Publications in Journals -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/bsh/Paper%20Publications.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Paper Publications in Conferences -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/bsh/Paper%20Publications%20in%20National%20and%20International%20Conferences.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">AP-SET-NET-GATE</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    AP-SET-NET-GATE -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/bsh/AP-SET-NET-GATE.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Book Publications</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    Book Publication Details -{' '}
                    <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Book%20Publication.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
            {/* Newly added blocks from user request */}
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Online Certifications</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    Online Certification Details -{' '}
                    <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Online%20Certifications.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Book Reviews</summary>
              <div>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>
                    Book Reviews Details -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/bsh/Book%20Reviews.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        );
      case 'Laboratories':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Laboratories</h2>
            <div className="mt-4 m-2">
              <details open>
                <summary className="font-semibold text-lg mb-2">English Communication Skills Lab</summary>
                <div>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    <li>
                      Technology Assisted Language Learning -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/bsh/TALL.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                    <li>
                      Task Based Language Learning -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/bsh/TBLL.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
            <div className="mt-4 m-2">
              <details>
                <summary className="font-semibold text-lg mb-2">Engineering Physics Lab</summary>
                <div>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    <li>
                      Sir.C.V. Raman Engineering Physics Lab -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/bsh/Engineering%20Physics%20Lab%20Write%20up.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
            <div className="mt-4 m-2">
              <details>
                <summary className="font-semibold text-lg mb-2">Engineering Chemistry Lab</summary>
                <div>
                  <ul className="list-disc ml-6 mt-4 space-y-2">
                    <li>
                      Acharya P.C.Ray Engineering Chemistry Lab -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/bsh/Chemistry%20LAB%20write%20up.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

          </div>
        );
      case 'Faculty Paper Presentations':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Paper Presentations</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">Faculty Paper Presentations</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Faculty Paper Presentations -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Faculty%20Paper%20%20Presentations.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
          </div>
        );
      case 'FDPs/Workshops Participated':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">FDPs/Workshops Participated</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">FDPs/Workshops Participated</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Faculty Development Programs Workshop -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Faculty%20Development%20Programs%20-%20Workshop.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
          </div>
        );
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="relative">
                <img
                  src="/bshhod.jpg"
                  alt="Sri N. Raja Sekhar"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Sri N. Raja Sekhar</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Head of the Department</p>
                  <p className="text-gray-600">Mobile No: 9885739808</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_bsh@srivasaviengg.ac.in" className="text-primary hover:underline">hod_bsh@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Basic Science and Humanities started at the inception of the college. The Department is fundamental to Engineering and devoted to fostering the basic principles and understanding of science to enhance the students’ basic knowledge of Engineering. Its objective is to provide value-based education for budding Scientists and Engineers. The Department offers various courses of study namely Mathematics, Physics, Chemistry, Environmental Studies, and English.
                </p>
              </div>
            </div>

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
            <details open>
              <summary className="font-semibold text-lg mb-2">English BOS Meetings</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Minutes of 8<sup>th</sup> meeting of the Board of Studies, dated 22.07.2024 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Minutes%20of%20the%20%208th%20meeting%20of%20BOS%20of%20Mathematics%20(2).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 6<sup>th</sup> meeting of the Board of Studies, dated 23.11.2021 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Minutes%20of%20the%206th%20Meeting%20of%20Board%20of%20Studies.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 5<sup>th</sup> meeting of the Board of Studies, dated 20.09.2021 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-5%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 4<sup>th</sup> meeting of the Board of Studies, dated 31.12.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-4%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 3<sup>rd</sup> meeting of the Board of Studies, dated 01.08.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-3%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 19.04.2019 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/BOS-2%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 02.06.2018 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/BOS-1%20English.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Joint BOS</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Joint BOS 1<sup>st</sup> B.Tech V23 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Agenda%20Notes%20of%208th%20Academic%20Council%20Sri%20Vasavi%20Engineering%20College.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Mathematics BOS Meetings</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Minutes of 8<sup>th</sup> meeting of the Board of Studies, dated 22.07.2024 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Minutes%20of%20the%20%208th%20meeting%20of%20BOS%20of%20Mathematics%20(2).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 7<sup>th</sup> meeting of the Board of Studies, dated 05.10.2023 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/7th BOS of Mathematics.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 6<sup>th</sup> meeting of the Board of Studies, dated 23.11.2021 -{' '}
                  <a href="https://https://srivasaviengg.ac.in/uploads/bsh/Minutes%20of%20the%206th%20Meeting%20of%20Board%20of%20Studies.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 5<sup>th</sup> meeting of the Board of Studies, dated 27.09.2021 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-%205%20Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 4<sup>th</sup> meeting of the Board of Studies, dated 31.12.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-4%20Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 3<sup>rd</sup> meeting of the Board of Studies, dated 01.08.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS-3%20Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 13.04.2019 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS%202-Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 12.06.2018 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/BOS%201%20Maths.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Chemistry BOS Meetings</summary>
              <ol className="list-decimal ml-6 mt-4 space-y-2">
                <li>
                  Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 28.12.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Physics%20BOS-II.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 02.06.2018 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Physics%20BOS-1.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ol>
            </details>
            <details className="mt-4">
              <summary className="font-semibold text-lg mb-2">Physics BOS Meetings</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 28.12.2020 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Chemistry%20BOS%20Meeting-2.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 02.06.2018 -{' '}
                  <a href="https://www.srivasaviengg.ac.in/uploads/bsh/Chemistry%20BOS%20Meeting-1.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
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
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
            <details open className="mb-4">
              <summary className="font-semibold text-lg mb-2">Student Achievements</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Certifications in British Council -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/British%20Council%20Certification%20-%20Sheet1%20(1).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Gets Higher Exam Qualified Student List -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Reliance%20Foundation%20Merit%20Scholarship%20(2022-2023).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
            <details>
              <summary className="font-semibold text-lg mb-2">Merit Scholarships</summary>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>
                  Reliance Foundation Merit Scholarships during the A.Y 2022-23 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/bsh/Reliance%20Foundation%20Merit%20Scholarship%20(2022-2023).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </details>
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
