import React, { useEffect, useState } from 'react';
import { Cog, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Book, Database, User } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';
interface Faculty {
  name: string;
  qualification: string;
  designation: string;
  profile_url: string;
  faculty_type: string;
  date_of_joining?: string;
}

// Designation priority mapping for sorting
// Priority: 1. Professor & Principal, 2. Professor & HOD, 3. Professor, 4. Associate Professor, 5. Sr. Assistant Professor, 6. Assistant Professor, 7. Lecturer
const getDesignationPriority = (designation: string): number => {
  const designationLower = designation.toLowerCase().trim();

  if (designationLower.includes('professor') && designationLower.includes('principal')) return 1;
  if (designationLower.includes('professor') && designationLower.includes('hod')) return 2;
  if (designationLower === 'professor') return 3;
  if (designationLower.includes('associate') && designationLower.includes('professor')) return 4;
  if (designationLower.includes('assoc') && designationLower.includes('professor')) return 4;
  if (designationLower.includes('sr') && designationLower.includes('asst') && designationLower.includes('professor')) return 5;
  if (designationLower.includes('sr') && designationLower.includes('assistant') && designationLower.includes('professor')) return 5;
  if (designationLower.includes('asst') && designationLower.includes('professor')) return 6;
  if (designationLower.includes('assistant') && designationLower.includes('professor')) return 6;
  if (designationLower.includes('lecturer')) return 7;

  return 999; // Unknown designations go to end
};

// Sort faculty by designation priority (ascending) then by date_of_joining (ascending)
const sortFacultyByDesignationAndDOJ = (facultyList: Faculty[]): Faculty[] => {
  return [...facultyList].sort((a, b) => {
    const priorityA = getDesignationPriority(a.designation);
    const priorityB = getDesignationPriority(b.designation);

    // First sort by designation priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // If same designation, sort by date_of_joining (ascending - oldest first)
    const dateA = a.date_of_joining ? new Date(a.date_of_joining).getTime() : Infinity;
    const dateB = b.date_of_joining ? new Date(b.date_of_joining).getTime() : Infinity;

    return dateA - dateB;
  });
};
interface BoardOfStudiesMember {
  name: string;
  designation: string;
  organization: string;
  position_in_job: string;
}

interface BosMinutes {
  meeting_title: string;
  meeting_no: string;
  meeting_date: string;
  file_url: string;
  academic_year: string;
}
interface Laboratories {
  lab_name: string;
  icon: string;
  video_title: string;
  video_url: string;
}
interface library {
  title: string;
  description: string[];
  image_url: string;
  resources: { icon: string; text: string }[];
  services: { icon: string; text: string }[];
  faculty_incharge: { name: string; designation: string; department: string };
}
interface Mous {
  type: string;
  data?: any;
  organization?: string;
  industry_type?: string;
  date_of_mou?: string;
  validity?: string;
  category?: string;
  activities?: Array<{ description: string; link?: string }>;
}
interface FacultyTLmethods {
  method: string;
  url: string;
}
interface FacultyAchievements {
  category: string;
  academic_year: string;
  description: string;
  url: string;
}
interface StudentAchievements {
  category: string;
  title: string;
  description: string;
  url: string;
}
interface Placements {
  batch: string;
  url: string;
}
interface Workshops {
  academic_year: string;
  description: string;
  url: string;
}
interface TechnicalAssociation {
  title: string;
  description: string;
}
interface ProjectResearch {
  category: string;
  description: string;
  url: string;
}
interface Newsletters {
  year: string;
  volume: string;
  issue: string;
  month: string;
  title: string;
  description: string;
  url: string;
}
interface Magazines {
  year: string;
  volume: string;
  issue: string;
  title: string;
  description: string;
  url: string;
}
interface Syllabus {
  id?: number;
  type: string;
  title: string;
  fileUrl: string;
}




const MechanicalDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [expandedIndustryProgram, setExpandedIndustryProgram] = useState<number | null>(null);

  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [technicalFaculty, setTechnicalFaculty] = useState<Faculty[]>([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = useState<Faculty[]>([]);
  const [boardOfStudies, setBoardOfStudies] = useState<BoardOfStudiesMember[]>([]);
  const [bosminutes, setBosMinutes] = useState<BosMinutes[]>([]);
  const [laboratories, setLaboratories] = useState<Laboratories[]>([]);
  const [library, setLibrary] = useState<library[]>([]);
  const [mous, setMous] = useState<Mous[]>([]);
  const [industryPrograms, setIndustryPrograms] = useState<any[]>([]);
  const [facultyTLmethods, setFacultyTLmethods] = useState<FacultyTLmethods[]>([]);
  const [facultyAchievements, setFacultyAchievements] = useState<FacultyAchievements[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievements[]>([]);
  const [placements, setPlacements] = useState<Placements[]>([]);
  const [workshops, setWorkshops] = useState<Workshops[]>([]);
  const [technicalAssociation, setTechnicalAssociation] = useState<TechnicalAssociation[]>([]);
  const [projectResearch, setProjectResearch] = useState<ProjectResearch[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletters[]>([]);
  const [magazines, setMagazines] = useState<Magazines[]>([]);
  const [syllabus, setSyllabus] = useState<Syllabus[]>([]);
  const [placementsGallery, setPlacementsGallery] = useState<any[]>([]);




  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Laboratories', label: 'Laboratories', icon: <Microscope className="w-4 h-4" /> },
    { id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty T&L methods', label: 'Faculty T&L methods', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Activity className="w-4 h-4" /> },
    { id: 'Project Research', label: 'Project Research', icon: <Search className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Magazines', label: 'Magazines', icon: <FileText className="w-4 h-4" /> }
  ];
  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];


  useEffect(() => {
    //1
    const timestamp = new Date().getTime();
    const cacheBuster = `?_t=${timestamp}`;
    
    fetch(`/api/mech/faculty${cacheBuster}`)
      .then(res => res.json())
      .then(data => {
        console.log('Faculty API Response:', data);
        if (Array.isArray(data)) {
          const teaching = data.filter((member: Faculty) => member.faculty_type === 'teaching');
          const nonTeaching = data.filter((member: Faculty) => member.faculty_type === 'non_teaching' || member.faculty_type === 'non-teaching');
          console.log('Teaching Faculty:', teaching);
          console.log('Non-Teaching Faculty:', nonTeaching);
          setNonTeachingFaculty(nonTeaching);
          setFaculty(sortFacultyByDesignationAndDOJ(teaching));
        }
      })
      .catch((error) => {
        console.error('Error fetching faculty:', error);
        setFaculty([]);
        setNonTeachingFaculty([]);
      })
    //1a
    fetch(`/api/mech/technical-faculty${cacheBuster}`)
      .then(res => res.json())
      .then(data => {
        console.log('Technical Faculty API Response:', data);
        setTechnicalFaculty(Array.isArray(data) ? sortFacultyByDesignationAndDOJ(data) : []);
      })
      .catch((error) => {
        console.error('Error fetching technical faculty:', error);
        setTechnicalFaculty([]);
      })
    //2
    fetch(`/api/mech/boardofstudies${cacheBuster}`)
      .then(res => res.json())
      .then(data => setBoardOfStudies(Array.isArray(data) ? data : []))
      .catch(() => setBoardOfStudies([]))
    fetch(`/api/mech/bos-meeting-minutes${cacheBuster}`)
      .then(res => res.json())
      .then(data => setBosMinutes(Array.isArray(data) ? data : []))
      .catch(() => setBosMinutes([]))
    //3
    fetch(`/api/mech/laboratories${cacheBuster}`)
      .then(res => res.json())
      .then(data => setLaboratories(data))
    //4
    fetch(`/api/mech/library${cacheBuster}`)
      .then(res => res.json())
      .then(data => setLibrary(data))
    //5
    fetch(`/api/mech/mous${cacheBuster}`)
      .then(res => res.json())
      .then(data => {
        console.log('Mous data from API:', data);
        // Ensure data is always an array
        if (Array.isArray(data)) {
          setMous(data);
        } else if (data && typeof data === 'object') {
          setMous([data]);
        } else {
          setMous([]);
        }
      })
      .catch(error => {
        console.error('Error fetching mous:', error);
        setMous([]);
      })
    //5a
    fetch(`/api/mech/industry-programs${cacheBuster}`)
      .then(res => res.json())
      .then(data => {
        console.log('Industry programs data from API:', data);
        if (Array.isArray(data)) {
          setIndustryPrograms(data);
        } else if (data && typeof data === 'object') {
          setIndustryPrograms([data]);
        } else {
          setIndustryPrograms([]);
        }
      })
      .catch(error => {
        console.error('Error fetching industry programs:', error);
        setIndustryPrograms([]);
      })
    //6
    fetch(`/api/mech/facultyTLmethods${cacheBuster}`)
      .then(res => res.json())
      .then(data => setFacultyTLmethods(data))
    //7
    fetch(`/api/mech/facultyachievements${cacheBuster}`)
      .then(res => res.json())
      .then(data => setFacultyAchievements(data))
    //8
    fetch(`/api/mech/studentachievements${cacheBuster}`)
      .then(res => res.json())
      .then(data => setStudentAchievements(data))
    //9
    fetch(`/api/mech/placements${cacheBuster}`)
      .then(res => res.json())
      .then(data => setPlacements(data))
    //10
    fetch(`/api/mech/workshops${cacheBuster}`)
      .then(res => res.json())
      .then(data => setWorkshops(data))
    //11
    fetch(`/api/mech/technicalassociation${cacheBuster}`)
      .then(res => res.json())
      .then(data => setTechnicalAssociation(data))
    //12
    fetch(`/api/mech/research${cacheBuster}`)
      .then(res => res.json())
      .then(data => setProjectResearch(data))
    //13
    fetch(`/api/mech/newsletters${cacheBuster}`)
      .then(res => res.json())
      .then(data => setNewsletters(data))
    //14
    fetch(`/api/mech/magazines${cacheBuster}`)
      .then(res => res.json())
      .then(data => setMagazines(data))
    //15
    fetch(`/api/mech/syllabus${cacheBuster}`)
      .then(res => res.json())
      .then(data => setSyllabus(Array.isArray(data) ? data : []))
      .catch(() => setSyllabus([]))
    //16
    fetch(`/api/mech/hackathons-gallery${cacheBuster}`)
      .then(res => res.json())
      .then(data => setPlacementsGallery(Array.isArray(data) ? data : []))
      .catch(() => setPlacementsGallery([]))
  }, [activeContent]);

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="mt-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The Department of Mechanical Engineering was established in 2010. Since its inception, the department has been progressing towards academic and research excellence. The department is enriched with experienced and qualified faculty and well-established lab facilities. The faculty members are striving towards imparting quality education by practicing innovative teaching and learning methods.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The department offers B.Tech in Mechanical Engineering and M.Tech in Thermal Engineering. The department has 6 Ph.D. qualified faculty and 2 faculty pursuing Ph.D. The department offers quality education through the dedicated team of faculty members having high academic standards and rich industry experience. The department has modern, state-of-the-art laboratories for providing quality education.
            </p>
          </div>
        );
      case 'Vision':
        return (
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">
              To evolve into a center of excellence in mechanical engineering education by imparting quality education and to produce competent engineers with professional ethics to meet the global challenges.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="mt-6">
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                To provide quality education through effective teaching-learning methods.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To establish strong industry-institute interaction to enhance the practical knowledge of the students.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To facilitate the students with required skills and knowledge to enhance their career opportunities.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To inculcate professional and ethical values among the students to serve the society.
              </li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4 italic">Graduates of Mechanical Engineering Program will be able to:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO1:</strong> Develop successful careers in mechanical engineering and allied industries.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO2:</strong> Pursue higher education and research to contribute to the development of the mechanical engineering field.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO3:</strong> Exhibit professional and ethical practices with effective communication skills.
              </li>
            </ul>
          </div>
        );
      case 'POs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-4 italic">Engineering Graduates will be able to:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li className="text-gray-700 leading-relaxed">
                <strong>PO1: Engineering knowledge:</strong> Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO2: Problem analysis:</strong> Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO3: Design/development of solutions:</strong> Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO4: Conduct investigations of complex problems:</strong> Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO5: Modern tool usage:</strong> Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO6: The engineer and society:</strong> Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO7: Environment and sustainability:</strong> Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO8: Ethics:</strong> Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO9: Individual and team work:</strong> Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO10: Communication:</strong> Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO11: Project management and finance:</strong> Demonstrate knowledge and understanding of the engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO12: Life-long learning:</strong> Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.
              </li>
            </ul>
          </div>
        );
      case 'PSOs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO1:</strong> Apply the fundamentals of mathematics, science and engineering to solve problems in the fields of design, thermal and manufacturing.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO2:</strong> Utilize modern engineering tools for analysis, design, development, and manufacturing to provide solutions for real-world mechanical engineering problems.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO3:</strong> Apply the gained knowledge to address the industrial and societal needs with professional ethics and social concerns.
              </li>
            </ul>
          </div>
        );
      case 'COs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              Course Outcomes (COs) describe what students are expected to know and be able to do at the end of a course. They help guide teaching, learning, and assessment to ensure students reach the intended learning objectives for each course.
            </p>
            <div className="mt-4">
              <p className="text-gray-700">
                For detailed Course Outcomes for each subject, please refer to the course curriculum documents available in the department.
              </p>
              <a
                href="https://srivasaviengg.ac.in/uploads/syllabus/V23_B.Tech.III&IV_Syllabus.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center text-blue-600 hover:underline"
              >
                <FileText className="h-4 w-4 mr-1" />
                View Syllabus with Course Outcomes
              </a>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                Well-qualified and dedicated faculty members with rich teaching and industry experience
              </li>
              <li className="text-gray-700 leading-relaxed">
                State-of-the-art laboratories with modern equipment and software
              </li>
              <li className="text-gray-700 leading-relaxed">
                Industry-institute interaction through industrial visits, internships, and guest lectures
              </li>
              <li className="text-gray-700 leading-relaxed">
                Active student association FAME (Fabulous Association of Mechanical Engineers)
              </li>
              <li className="text-gray-700 leading-relaxed">
                Research facilities for faculty and students to pursue innovative projects
              </li>
              <li className="text-gray-700 leading-relaxed">
                Regular workshops, seminars, and conferences for exposure to emerging technologies
              </li>
              <li className="text-gray-700 leading-relaxed">
                Emphasis on practical learning through hands-on training and project work
              </li>
              <li className="text-gray-700 leading-relaxed">
                Strong placement record with reputed companies
              </li>
              <li className="text-gray-700 leading-relaxed">
                Well-equipped departmental library with reference books and journals
              </li>
            </ul>
          </div>
        );
      default:
        return null;
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

              {/* Department Overview (HOD Profile - Only shown on Department tab) */}
              {activeDeptTab === 'Department' && (
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-fade-in">
                  <div className="md:w-1/3" style={{ minHeight: '300px' }}>
                    <img
                      src="/mechhod.jpg"
                      alt="Dr. M. V. Ramesh"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                      style={{ minHeight: '300px' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'block';
                        (e.target as HTMLImageElement).style.backgroundColor = '#f0f0f0';
                      }}
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold text-[#B22222] mb-2">Dr. M. V. Ramesh</h3>
                    <p className="text-gray-700 mb-2">Professor & Head of the Department</p>
                    <p className="text-gray-700 mb-2">Phone No: 08818-284355(O)-(Ext.-XXX)</p>
                    <p className="text-gray-700 mb-2">
                      <a href="mailto:hod_mech@srivasaviengg.ac.in" className="text-[#B22222] hover:underline">hod_mech@srivasaviengg.ac.in</a>
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

              {renderDeptTabContent()}
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            <div className="space-y-8">
              {/* Teaching Faculty Dropdown */}
              <div>
                <details open className="cst-dropdown">
                  <summary className="cursor-pointer font-semibold text-lg text-gray-800 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">Teaching Faculty</summary>
                  <div className="cst-dropdown-content mt-4">
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
                              <tr key={member.name || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
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
              </div>

              {/* Technical Staff Dropdown */}
              <div>
                <details className="cst-dropdown">
                  <summary className="cursor-pointer font-semibold text-lg text-gray-800 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">Technical Staff</summary>
                  <div className="cst-dropdown-content mt-4">
                    {technicalFaculty && technicalFaculty.length > 0 ? (
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
                            {technicalFaculty.map((member, index) => (
                              <tr key={member.name || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
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
                          {technicalFaculty ? 'No technical staff data available.' : 'Loading technical staff...'}
                        </div>
                      </div>
                    )}
                  </div>
                </details>
              </div>

              {/* Non-Teaching Staff Dropdown */}
              <div>
                <details className="cst-dropdown">
                  <summary className="cursor-pointer font-semibold text-lg text-gray-800 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">Non-Teaching Staff</summary>
                  <div className="cst-dropdown-content mt-4">
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
                              <tr key={member.name || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
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
                        {boardOfStudies.map((member, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
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

              <details className="cst-dropdown group">
                <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                  <span>Board of Studies Meeting Minutes</span>

                </summary>
                <div className="cst-dropdown-content">
                  <div className="space-y-3">
                    {bosminutes.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        <p>No BOS meeting minutes available.</p>
                      </div>
                    ) : (
                      bosminutes.map((minute: BosMinutes, idx: number) => {
                        // Remove time portion if present (e.g., '2025-11-12T18:30:00.000Z' => '2025-11-12')
                        const dateOnly = minute.meeting_date?.split('T')[0] || minute.meeting_date;
                        return (
                          <div key={idx} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border">
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
                      })
                    )}
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      }
      case 'Syllabus': {
        // Filter syllabus data by category
        const bTechSyllabus = syllabus.filter((item) => item.type === 'B.Tech Syllabus' || item.type?.toLowerCase() === 'b.tech syllabus') || [];
        const mTechSyllabus = syllabus.filter((item) => item.type === 'M.Tech Syllabus' || item.type?.toLowerCase() === 'm.tech syllabus') || [];
        const socSyllabus = syllabus.filter((item) => item.type?.toLowerCase() === 'soc') || [];

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            <div className="space-y-6">
              {/* B.Tech Section */}
              <details open className="cst-dropdown">
                <summary>B.Tech</summary>
                <div className="cst-dropdown-content">
                  {bTechSyllabus.length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {bTechSyllabus.map((item, index) => (
                        <li key={index}>
                          {item.title}
                          {item.fileUrl && (
                            <>
                              {' - '}
                              <a
                                href={item.fileUrl}
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
                    <p className="text-gray-500 text-sm">No B.Tech syllabus available.</p>
                  )}
                </div>
              </details>

              {/* M.Tech Section */}
              <details className="cst-dropdown">
                <summary>M.Tech</summary>
                <div className="cst-dropdown-content">
                  {mTechSyllabus.length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {mTechSyllabus.map((item, index) => (
                        <li key={index}>
                          {item.title}
                          {item.fileUrl && (
                            <>
                              {' - '}
                              <a
                                href={item.fileUrl}
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
                    <p className="text-gray-500 text-sm">No M.Tech syllabus available.</p>
                  )}
                </div>
              </details>

              {/* SOC Section */}
              <details className="cst-dropdown">
                <summary>SOC</summary>
                <div className="cst-dropdown-content">
                  {socSyllabus.length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {socSyllabus.map((item, index) => (
                        <li key={index}>
                          {item.title}
                          {item.fileUrl && (
                            <>
                              {' - '}
                              <a
                                href={item.fileUrl}
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
                    <p className="text-gray-500 text-sm">No SOC syllabus available.</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      }
      case 'Laboratories':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Laboratories</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Available Laboratories</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {laboratories.map((lab, index) => (
                  <li key={index} className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    {lab.icon === 'HardHat' && <HardHat className="h-5 w-5 mr-2 text-[#B22222]" />}
                    {lab.icon === 'Cog' && <Cog className="h-5 w-5 mr-2 text-[#B22222]" />}
                    {lab.icon === 'Microscope' && <Microscope className="h-5 w-5 mr-2 text-[#B22222]" />}
                    <span className="font-medium">{lab.lab_name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-6">Laboratory Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {laboratories.map((lab, index) => (
                  lab.video_url && (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                        <iframe
                          className="w-full h-full"
                          src={lab.video_url}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={lab.video_title}
                        ></iframe>
                      </div>
                      <h4 className="text-xl font-medium mt-3 text-center">{lab.video_title}</h4>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        );
      case 'Department Library': {
        // Safely parse library data if it's a JSON string
        const safeLibrary = library.map(lib => {
          const parsed = typeof lib === 'string' ? JSON.parse(lib) : lib;
          return {
            title: typeof parsed.title === 'string' ? parsed.title : 'Department Library',
            image_url: typeof parsed.image_url === 'string' ? parsed.image_url : '',
            description: Array.isArray(parsed.description) ? parsed.description : [String(parsed.description || '')],
            resources: Array.isArray(parsed.resources) ? parsed.resources : [],
            services: Array.isArray(parsed.services) ? parsed.services : [],
            faculty_incharge: parsed.faculty_incharge && typeof parsed.faculty_incharge === 'object'
              ? parsed.faculty_incharge
              : { name: 'N/A', designation: 'N/A', department: 'N/A' }
          };
        });

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">{safeLibrary.length > 0 ? safeLibrary[0].title : 'Department Library'}</h2>

            {safeLibrary.length > 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                  {/* Library Image */}
                  <div className="relative w-full" style={{ minHeight: '300px' }}>
                    <img
                      src={safeLibrary[0].image_url}
                      alt="Department Library"
                      className="w-full h-full rounded-lg shadow-md object-cover"
                      style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block', minHeight: '300px' }}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'block';
                        (e.target as HTMLImageElement).style.backgroundColor = '#f0f0f0';
                      }}
                    />
                  </div>

                  {/* Library Description */}
                  <div className="space-y-4">
                    {safeLibrary[0].description.map((paragraph: string, index: number) => (
                      <p key={index} className="text-gray-700 leading-relaxed text-justify">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Library Resources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-[#B22222] mb-4">Library Resources</h3>
                    <ul className="space-y-2">
                      {safeLibrary[0].resources.map((resource: any, index: number) => {
                        const resourceText = typeof resource.text === 'string' ? resource.text : (typeof resource.text === 'object' ? JSON.stringify(resource.text) : String(resource.text || ''));
                        const iconType = typeof resource.icon === 'string' ? resource.icon : '';
                        return (
                          <li key={index} className="flex items-center">
                            {iconType === 'Book' && <Book className="h-5 w-5 mr-2 text-[#B22222]" />}
                            {iconType === 'BookOpen' && <BookOpen className="h-5 w-5 mr-2 text-[#B22222]" />}
                            {iconType === 'Library' && <Library className="h-5 w-5 mr-2 text-[#B22222]" />}
                            {iconType === 'FileText' && <FileText className="h-5 w-5 mr-2 text-[#B22222]" />}
                            {iconType === 'Database' && <Database className="h-5 w-5 mr-2 text-[#B22222]" />}
                            <span>{resourceText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-[#B22222] mb-4">Library Services</h3>
                    <ul className="space-y-2">
                      {safeLibrary[0].services.map((service: any, index: number) => (
                        <li key={index} className="flex items-center">
                          {service.icon === 'Search' && <Search className="h-5 w-5 mr-2 text-[#B22222]" />}
                          {service.icon === 'Download' && <Download className="h-5 w-5 mr-2 text-[#B22222]" />}
                          {service.icon === 'Wifi' && <Wifi className="h-5 w-5 mr-2 text-[#B22222]" />}
                          {service.icon === 'TrendingUp' && <TrendingUp className="h-5 w-5 mr-2 text-[#B22222]" />}
                          {service.icon === 'Presentation' && <Presentation className="h-5 w-5 mr-2 text-[#B22222]" />}
                          <span>{service.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Faculty Incharge */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-[#B22222] mb-4 text-center">Faculty In-charge</h3>
                  <div className="bg-gray-50 p-6 rounded-lg shadow max-w-md mx-auto">
                    <div className="text-center">
                      <div className="mb-3">
                        <User className="h-16 w-16 mx-auto text-[#B22222]" />
                      </div>
                      <h4 className="text-lg font-semibold">{String(safeLibrary[0].faculty_incharge?.name || 'N/A')}</h4>
                      <p className="text-gray-600">{String(safeLibrary[0].faculty_incharge?.designation || 'N/A')}</p>
                      <p className="text-gray-600">{String(safeLibrary[0].faculty_incharge?.department || 'N/A')}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {safeLibrary.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading library information...</p>
              </div>
            )}
          </div>
        );
      }
      case 'MoUs': {
        // Ensure mous is an array and log for debugging
        const mousArray = Array.isArray(mous) ? mous : [];
        const industryProgramsArray = Array.isArray(industryPrograms) ? industryPrograms : [];

        console.log('=== MOUs DEBUG LOG ===');
        console.log('Total MOUs Data:', mousArray);
        console.log('Mous length:', mousArray.length);
        console.log('Industry Programs length:', industryProgramsArray.length);

        if (mousArray.length > 0) {
          console.log('First MoU item:', mousArray[0]);
          console.log('MoU item keys:', Object.keys(mousArray[0]));
        }

        // All items from mech_mous table are industry MOUs
        const industryMous = mousArray;

        // Activities from industry programs
        const activityMous = industryProgramsArray;

        console.log('Industry MOUs count:', industryMous.length);
        console.log('Activity programs count:', activityMous.length);

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">MoUs</h2>
            <h3 className="text-xl font-semibold text-[#B22222] mb-4 text-center">A. MOUs with Industries</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">S.No</th>
                    <th className="py-3 px-4 border-b text-left">Organization Name</th>
                    <th className="py-3 px-4 border-b text-left">Industry Type</th>
                    <th className="py-3 px-4 border-b text-left">Date of MoU</th>
                    <th className="py-3 px-4 border-b text-left">Validity</th>
                  </tr>
                </thead>
                <tbody>
                  {industryMous.map((item: Mous, idx: number) => {
                    console.log(`Rendering industry MoU row ${idx}:`, {
                      organization: item.organization,
                      industry_type: item.industry_type,
                      date_of_mou: item.date_of_mou,
                      validity: item.validity,
                      fullItem: item
                    });
                    return (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">{idx + 1}</td>
                        <td className="py-3 px-4 border-b">{item.organization || 'N/A'}</td>
                        <td className="py-3 px-4 border-b">{item.industry_type || 'N/A'}</td>
                        <td className="py-3 px-4 border-b">{item.date_of_mou || 'N/A'}</td>
                        <td className="py-3 px-4 border-b">{item.validity || 'N/A'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <h3 className="text-xl font-semibold text-[#B22222] mb-4">B. Interaction with the Industry</h3>
            <div className="space-y-3 max-w-4xl">
              {activityMous.length > 0 ? (
                activityMous.map((item: any, idx: number) => (
                  <div key={idx} className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedIndustryProgram(expandedIndustryProgram === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-left font-semibold text-gray-700">{item.category || 'Activity'}</span>
                      <ChevronRight
                        size={20}
                        className={`text-[#B22222] transition-transform ${expandedIndustryProgram === idx ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {expandedIndustryProgram === idx && (
                      <div className="px-6 py-4 border-t border-gray-200 bg-white">
                        <ul className="space-y-3">
                          {item.activities?.map((activity: any, actIndex: number) => (
                            <li key={actIndex} className="flex items-start">
                              <span className="mr-2 text-[#B22222]">•</span>
                              <div>
                                <span className="text-gray-700">{activity.description}</span>
                                {activity.link && (
                                  <a
                                    href={activity.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 inline-flex items-center gap-2 text-[#B22222] hover:underline font-medium"
                                  >
                                    <Download size={16} />
                                    View Document
                                  </a>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No industry programs data available</p>
              )}
            </div>
          </div>
        );
      }
      case 'Faculty T&L methods':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Teaching & Learning Methods</h2>

            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Faculty Innovation in Teaching and Learning</summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    {facultyTLmethods.map((item, index) => (
                      <li key={index}>
                        {item.method}
                        {item.url && (
                          <>
                            {' - '}
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline inline-flex items-center gap-1"
                            >
                              <Download size={16} />
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
          </div>

        );
      case 'Faculty Achievements': {
        // Get all categories from DB
        const categories = Array.from(new Set(facultyAchievements.map(a => a.category)));
        const grouped = categories.map(cat => ({
          category: cat,
          items: facultyAchievements.filter(a => a.category === cat)
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
            <div className="space-y-6">
              {grouped.map((group, index) => (
                <details key={group.category} open={index === 0} className="cst-dropdown">
                  <summary>{group.category}</summary>
                  <div className="cst-dropdown-content">
                    {group.items.length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {group.items.map((item, idx) => (
                          <li key={idx}>
                            {item.description}
                            {item.academic_year && <> <span className="text-gray-600">[{item.academic_year}]</span></>}
                            {item.url && (
                              <>
                                {' - '}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline inline-flex items-center gap-1"
                                >
                                  <Download size={16} />
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
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      }
      case 'Student Achievements': {
        // Get all categories from DB
        const categories = Array.from(new Set(studentAchievements.map(a => a.category)));
        const grouped = categories.map(cat => ({
          category: cat,
          items: studentAchievements.filter(a => a.category === cat)
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
            <div className="space-y-6">
              {grouped.map((group, index) => (
                <details key={group.category} open={index === 0} className="cst-dropdown">
                  <summary>{group.category}</summary>
                  <div className="cst-dropdown-content">
                    {group.items.length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {group.items.map((item, idx) => (
                          <li key={idx}>
                            {item.title}
                            {item.url && item.url.trim() !== '' && (
                              <>
                                {' - '}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline inline-flex items-center gap-1"
                                >
                                  <Download size={16} />
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
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      }
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Placements Details</summary>
                <div className="cst-dropdown-content">
                  {placements.length > 0 ? (
                    placements.map((placement, idx) => (
                      <div key={idx} className="mb-4">
                        <p className="font-medium">
                          Placements for Batch {placement.batch}
                          {placement.url && (
                            <>
                              {' - '}
                              <a
                                href={placement.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View More
                              </a>
                            </>
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-sm">No placement details available.</p>
                  )}
                </div>
              </details>

              {/* Gallery Section */}
              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {placementsGallery.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {placementsGallery.flatMap(item => {
                        if (item.gallery) {
                          const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                          return imageUrls.map((imageUrl: string, index: number) => ({
                            url: imageUrl,
                            year: item.academic_year,
                            key: `${item.id}-${index}`
                          }));
                        }
                        return [];
                      }).map((img: any) => (
                        <img
                          key={img.key}
                          src={img.url}
                          alt={`Placements ${img.year} Image`}
                          className="w-full rounded-lg shadow-md object-cover"
                          style={{ height: '300px', width: '400px', objectFit: 'cover', display: 'block' }}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );

      case 'Workshops':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops/SOC/Seminars</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Workshops & Seminars</summary>
                <div className="cst-dropdown-content">
                  {workshops.length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {workshops.map((workshop, index) => (
                        <li key={index}>
                          {workshop.description}
                          {workshop.url && (
                            <>
                              {' - '}
                              <a
                                href={workshop.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View More
                              </a>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm">No workshops available.</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );

      case 'Technical Association':
        return (
          <div className="mb-8 mt-12">
            <h2 className="text-2xl font-bold text-[#B22222] mb-6">Technical Association</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              {technicalAssociation.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{technicalAssociation[0].title} :</h3>
                  <p className="text-gray-700 mb-6">
                    {technicalAssociation[0].description}
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Various activities conducted by FAME are as follows:</h3>
                  <ul className="space-y-3 ml-6 list-disc">
                    {technicalAssociation.slice(1).map((activity, index) => (
                      <li key={index} className="text-gray-700">
                        {activity.description}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {technicalAssociation.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading technical association information...</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'Project Research':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Project Research & Development</h2>
            <div className="space-y-6">
              {/* Undergraduate Research Projects */}
              <details open className="cst-dropdown">
                <summary>Undergraduate Research Projects</summary>
                <div className="cst-dropdown-content">
                  {projectResearch.filter(project => project.category === 'Undergraduate').length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {projectResearch
                        .filter(project => project.category === 'Undergraduate')
                        .map((project, index) => (
                          <li key={index}>
                            {project.description}
                            {project.url && (
                              <>
                                {' - '}
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View More
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm">No undergraduate research projects available.</p>
                  )}
                </div>
              </details>

              {/* Postgraduate Research Projects */}
              <details className="cst-dropdown">
                <summary>Postgraduate Research Projects</summary>
                <div className="cst-dropdown-content">
                  {projectResearch.filter(project => project.category === 'Postgraduate').length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {projectResearch
                        .filter(project => project.category === 'Postgraduate')
                        .map((project, index) => (
                          <li key={index}>
                            {project.description}
                            {project.url && (
                              <>
                                {' - '}
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View More
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm">No postgraduate research projects available.</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );

      case 'Newsletters': {
        // Group newsletters by year
        const groupedNewsletters = newsletters.reduce((acc, newsletter) => {
          if (!acc[newsletter.year]) acc[newsletter.year] = [];
          acc[newsletter.year].push(newsletter);
          return acc;
        }, {} as Record<string, Newsletters[]>);

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Newsletters</h2>
            <div className="space-y-6">
              {Object.entries(groupedNewsletters)
                .sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
                .map(([year, items], index) => (
                  <details key={year} open={index === 0} className="cst-dropdown">
                    <summary>{year} Newsletters</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-none pl-0 my-2 space-y-2">
                        {items.map((newsletter, idx) => (
                          <li key={idx} className="p-2">
                            <span className="font-medium">{newsletter.title}</span>

                            {newsletter.url && (
                              <>
                                {' - '}
                                <a
                                  href={newsletter.url}
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
                    </div>
                  </details>
                ))}
            </div>
          </div>
        );
      }

      case 'Magazines': {
        // Group magazines by year
        const groupedMagazines = magazines.reduce((acc, mag) => {
          if (!acc[mag.year]) acc[mag.year] = [];
          acc[mag.year].push(mag);
          return acc;
        }, {} as Record<string, Magazines[]>);

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Magazines</h2>
            <div className="space-y-6">
              {Object.entries(groupedMagazines)
                .sort(([yearA], [yearB]) => yearB.localeCompare(yearA))
                .map(([year, items], index) => (
                  <details key={year} open={index === 0} className="cst-dropdown">
                    <summary>{year} Magazines</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-none pl-0 my-2 space-y-2">
                        {items.map((mag, idx) => (
                          <li key={idx} className="p-2">
                            <span className="font-medium">{mag.title}</span>

                            {mag.url && (
                              <>
                                {' - '}
                                <a
                                  href={mag.url}
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
                    </div>
                  </details>
                ))}
            </div>
          </div>
        );
      }

      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>

            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b-2 border-primary">Hackathons</h3>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  A 24-hour student hackathon is an event where students come together to collaborate, innovate, and create projects within a short time frame. These hackathons have gained immense popularity in recent years, and they hold significant importance for students for several reasons:
                </p>

                <ul className="space-y-4 text-gray-700 mb-8">
                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Hands-on learning:</span>
                    <span>Hackathons provide students with a unique opportunity to engage in hands-on learning. They encourage participants to apply their knowledge and skills to real-world problems and challenges. It allows students to go beyond theoretical knowledge and gain practical experience by working on a project from start to finish within a limited time.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Collaboration and teamwork:</span>
                    <span>Hackathons foster collaboration and teamwork among students. Participants usually form teams, bringing together individuals with diverse backgrounds and expertise. Working together, they learn to communicate effectively, leverage each other's strengths, and tackle complex problems collectively. The experience of collaborating with peers from different disciplines helps develop essential teamwork and interpersonal skills.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Innovation and creativity:</span>
                    <span>The time constraint of a 24-hour hackathon encourages participants to think innovatively and creatively. Students are often required to come up with novel solutions to problems or create something entirely new within a limited timeframe. This pressure fuels innovation and pushes participants to explore unconventional ideas, leading to the development of unique projects.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Networking and industry exposure:</span>
                    <span>Student hackathons often attract participants, mentors, and judges from various industries and organizations. This provides an excellent networking opportunity for students to connect with professionals, potential employers, and like-minded peers. Building connections during a hackathon can lead to future internships, job opportunities, or collaborations on other projects.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Skill development:</span>
                    <span>Hackathons offer a platform for students to enhance their existing skills and acquire new ones. During the event, participants may have to learn and use new technologies, programming languages, or tools to complete their projects. This process helps broaden their skillset, exposes them to different technologies, and allows them to experiment with cutting-edge tools and platforms.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Resume/portfolio enhancement:</span>
                    <span>Participating in hackathons adds value to a student's resume or portfolio. It demonstrates their passion for learning, problem-solving ability, teamwork skills, and ability to work under pressure. Employers and educational institutions often consider hackathon experience as a strong indicator of a student's practical skills and motivation.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Recognition and awards:</span>
                    <span>Many hackathons offer prizes, recognition, or opportunities for participants to showcase their projects to a wider audience. Winning or being recognized in a hackathon can boost a student's confidence, provide validation for their work, and open doors to further opportunities.</span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-8">
                  In conclusion, 24-hour student hackathons are important because they promote hands-on learning, foster collaboration, encourage innovation, provide networking opportunities, facilitate skill development, enhance resumes/portfolios, and offer recognition for participants. They serve as a platform for students to showcase their abilities, learn from their peers, and gain valuable experience in a short period.
                </p>
              </div>

              <div className="mb-10">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">Hackathons Conducted</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-[#B22222] text-white">
                      <tr>
                        <th className="py-3 px-4 text-left border-b">Academic Year</th>
                        <th className="py-3 px-4 text-left border-b">For Brochure</th>
                        <th className="py-3 px-4 text-left border-b">For Winners List</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">2022-23</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackoverflow%20banner_2022_23.png"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            View Brochure
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2022-23.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Winners
                          </a>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">2021-22</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/broacher_2021_22.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Brochure
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2021-22.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Winners
                          </a>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">2019-20</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Brouchure.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Brochure
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2019-20.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Winners
                          </a>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">2018-19</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/City%20Digi%20@Hack%202K18.jpg"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            View Brochure
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20winners_2018-19.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Winners
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-xl font-semibold text-gray-700 mb-6">Gallery - Hackathon 2022</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <img
                      src="/images/departments/me/Hackthon_2022_23 (1).jpg"
                      alt="Hackathon 2022-23 Photo 1"
                      className="w-full h-auto rounded-lg shadow-md"
                      style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      src="/images/departments/me/Hackthon 2021_22 (1).jpeg"
                      alt="Hackathon 2021-22 Photo 1"
                      className="w-full h-auto rounded-lg shadow-md"
                      style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="space-y-6">
                    <img
                      src="/images/departments/me/Hackthon 2021_22 (1).jpeg"
                      alt="Hackathon 2021-22 Photo 2"
                      className="w-full h-auto rounded-lg shadow-md"
                      style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      src="/images/departments/me/Hackthon_2022_23 (2) (1).jpg"
                      alt="Hackathon 2022-23 Photo 2"
                      className="w-full h-auto rounded-lg shadow-md"
                      style={{ width: '400px', height: '300px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
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
        title="Mechanical Engineering Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default MechanicalDepartment;
