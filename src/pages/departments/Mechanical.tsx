
import StandardDepartmentProfile from '../../components/StandardDepartmentProfile';

import React, { useEffect, useState } from 'react';
import { Cog, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Book, Database, User } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';
interface Faculty {
  name: string;
  qualification: string;
  designation: string;
  profile_url: string;
  faculty_type: string;
}
interface BoardOfStudiesMember {
  member_name: string;
  designation: string;
  organization: string;
  role: string;
}

interface BosMinutes {
  meeting_title: string;
  meeting_number: string;
  meeting_date: string;
  document_url: string;
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
  data: any;
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
  program: string;
  version: string;
  name: string;
  url: string;
}




const MechanicalDepartment: React.FC = () => {
  const hodInfo = {
    name: "Dr. M.v.Ramesh",
    designation: "Head of Department, Mechanical Engineering",
    education: "Ph.D, M.Tech, B.Tech",
    email: "hod.mechanical@svec.ac.in",
    imageUrl: "/mechhod.jpg"
  };

  const departmentContent = {
    Department: (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#B22222] mb-4">Department of Mechanical Engineering</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Department of Mechanical Engineering at SVEC is dedicated to providing comprehensive education in mechanical engineering fundamentals while embracing modern technologies and innovative practices. Our department focuses on thermal systems, manufacturing, design, robotics, and sustainable engineering solutions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We prepare students to excel in diverse fields of mechanical engineering, from traditional manufacturing to cutting-edge areas like automation, renewable energy systems, and advanced materials engineering.
          </p>
        </div>
      </div>
    ),
    Vision: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Vision</h3>
        <p className="text-gray-700 leading-relaxed">
          To be a premier department in Mechanical Engineering education and research, fostering innovation in mechanical systems, manufacturing technologies, and sustainable engineering, and developing skilled engineers who can contribute to industrial advancement and societal development.
        </p>
      </div>
    ),
    Mission: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Mission</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>To provide quality education in Mechanical Engineering with emphasis on emerging technologies and innovation</li>
          <li>To promote research and development in mechanical systems, manufacturing, and sustainable technologies</li>
          <li>To develop professionals with strong technical competencies, design thinking, and ethical values</li>
          <li>To foster industry-academia partnerships for practical learning and technology transfer</li>
          <li>To contribute to society through technological innovations and sustainable engineering solutions</li>
        </ul>
      </div>
    ),
    PEOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PEO1:</h4>
            <p className="text-gray-700">Graduates will be successful in their professional careers in mechanical engineering and related fields, demonstrating technical competence and leadership in design, manufacturing, and systems engineering.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO2:</h4>
            <p className="text-gray-700">Graduates will engage in lifelong learning to adapt to emerging technologies and contribute to research, innovation, and development in mechanical engineering.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PEO3:</h4>
            <p className="text-gray-700">Graduates will demonstrate professional ethics, environmental consciousness, and effective communication and teamwork skills in their engineering practice.</p>
          </div>
        </div>
      </div>
    ),
    POs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p><strong>PO1:</strong> Engineering Knowledge</p>
            <p><strong>PO2:</strong> Problem Analysis</p>
            <p><strong>PO3:</strong> Design/Development of Solutions</p>
            <p><strong>PO4:</strong> Conduct Investigation</p>
            <p><strong>PO5:</strong> Modern Tool Usage</p>
            <p><strong>PO6:</strong> Engineer and Society</p>
          </div>
          <div className="space-y-2">
            <p><strong>PO7:</strong> Environment and Sustainability</p>
            <p><strong>PO8:</strong> Ethics</p>
            <p><strong>PO9:</strong> Individual and Team Work</p>
            <p><strong>PO10:</strong> Communication</p>
            <p><strong>PO11:</strong> Project Management</p>
            <p><strong>PO12:</strong> Life-long Learning</p>
          </div>
        </div>
      </div>
    ),
    PSOs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">PSO1: Design & Manufacturing</h4>
            <p className="text-gray-700">Apply knowledge of mechanical engineering to design, analyze, and manufacture mechanical systems and components using modern tools and techniques.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO2: Thermal & Energy Systems</h4>
            <p className="text-gray-700">Design and optimize thermal systems, energy conversion devices, and sustainable energy solutions for various applications.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">PSO3: Innovation & Technology</h4>
            <p className="text-gray-700">Integrate emerging technologies like automation, robotics, and advanced materials to develop innovative mechanical engineering solutions.</p>
          </div>
        </div>
      </div>
    ),
    COs: (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
        <p className="text-gray-700 mb-4">Upon completion of the program, students will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Core Mechanical Skills</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Understand fundamental principles of mechanical engineering</li>
              <li>Analyze and design mechanical systems and components</li>
              <li>Apply thermodynamics and heat transfer principles</li>
              <li>Implement manufacturing processes and quality control</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Advanced Applications</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Design automation and control systems</li>
              <li>Apply CAD/CAM and simulation tools</li>
              <li>Develop renewable energy and sustainable systems</li>
              <li>Utilize modern materials and manufacturing technologies</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    "Salient Features": (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#B22222] mb-4">Salient Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Academic Excellence</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Comprehensive curriculum covering all areas of mechanical engineering</li>
              <li>Industry-relevant projects in design, manufacturing, and thermal systems</li>
              <li>Research opportunities in emerging areas like robotics and automation</li>
              <li>Regular workshops on latest tools and manufacturing technologies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Infrastructure</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art manufacturing and thermal engineering laboratories</li>
              <li>Advanced CAD/CAM facilities and simulation software</li>
              <li>Modern testing and measurement equipment</li>
              <li>Robotics and automation laboratory setups</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Industry Connect</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Strong partnerships with manufacturing and automotive companies</li>
              <li>Internship opportunities in leading industrial organizations</li>
              <li>Guest lectures by industry experts and engineers</li>
              <li>Collaborative projects with manufacturing industries</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Student Development</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Professional societies and student chapters (ASME, SAE)</li>
              <li>Design competitions and innovation challenges</li>
              <li>Technical symposiums and project exhibitions</li>
              <li>Professional development and certification programs</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return <StandardDepartmentProfile hodInfo={hodInfo} departmentContent={departmentContent} />;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = useState<Faculty[]>([]);
  const [boardOfStudies, setBoardOfStudies] = useState<BoardOfStudiesMember[]>([]);
  const [bosminutes, setBosMinutes] = useState<BosMinutes[]>([]);
  const [laboratories, setLaboratories] = useState<Laboratories[]>([]);
  const [library, setLibrary] = useState<library[]>([]);
  const [mous, setMous] = useState<Mous[]>([]);
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




  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
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
    { id: 'Magazines', label: 'Magazines', icon: <FileText className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];
  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];


  useEffect(() => {
      //1
      fetch('/api/mech/faculty')
        .then(res => res.json())
        .then(data => {
          setFaculty(data);
          const teaching = data.filter((member: Faculty) => member.faculty_type === 'teaching');
          const nonTeaching = data.filter((member: Faculty) => member.faculty_type === 'non-teaching');
          setNonTeachingFaculty(nonTeaching);
          setFaculty(teaching);
        })
        //2
      fetch('/api/mech/boardofstudies')
        .then(res => res.json())
        .then(data => setBoardOfStudies(data))
      fetch('/api/ece/bos-meeting-minutes')
        .then(res => res.json())
        .then(data => setBosMinutes(data))
      //3
      fetch('/api/mech/laboratories')
        .then(res => res.json())
        .then(data => setLaboratories(data))
      //4
      fetch('/api/mech/library')
        .then(res => res.json())
        .then(data => setLibrary(data))
      //5
      fetch('/api/mech/mous')
        .then(res => res.json())
        .then(data => setMous(data))
      //6
      fetch('/api/mech/facultyTLmethods')
        .then(res => res.json())
        .then(data => setFacultyTLmethods(data))
      //7
      fetch('/api/mech/facultyachievements')
        .then(res => res.json())
        .then(data => setFacultyAchievements(data))
      //8
      fetch('/api/mech/studentachievements')
        .then(res => res.json())
        .then(data => setStudentAchievements(data))
      //9
      fetch('/api/mech/placements')
        .then(res => res.json())
        .then(data => setPlacements(data))
      //10
      fetch('/api/mech/workshops')
        .then(res => res.json())
        .then(data => setWorkshops(data))
      //11
      fetch('/api/mech/technicalassociation')
        .then(res => res.json())
        .then(data => setTechnicalAssociation(data))
      //12
      fetch('/api/mech/research')
        .then(res => res.json())
        .then(data => setProjectResearch(data))
      //13
      fetch('/api/mech/newsletters')
        .then(res => res.json())
        .then(data => setNewsletters(data))
      //14
      fetch('/api/mech/magazines')
        .then(res => res.json())
        .then(data => setMagazines(data))
      //15
      fetch('/api/mech/syllabus')
        .then(res => res.json())
        .then(data => setSyllabus(data))
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
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="relative">
                <img
                  src="/mechhod.jpg"
                  alt="Dr. M. V. Ramesh"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. M. V. Ramesh</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, Mechanical</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_mech@srivasaviengg.ac.in" className="text-primary hover:underline">hod_mech@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Mechanical Engineering was established in 2010. Since its inception, the department has been progressing towards academic and research excellence. The department is enriched with experienced and qualified faculty and well-established lab facilities. The faculty members are striving towards imparting quality education by practicing innovative teaching and learning methods.
                </p>
              </div>
            </div>

            {/* Department Profile Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-[#B22222] mb-6">Department Profile</h3>

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

              <div className="mt-4">
                {renderDeptTabContent()}
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            <div className="overflow-x-auto mb-10">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 capitalize border-b-2 border-primary pb-2">Teaching Faculty</h3>
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
                        <a href={member.profile_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 capitalize border-b-2 border-primary pb-2">Non-Teaching Staff</h3>
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
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">S.No</th>
                    <th className="px-4 py-2">Name of the BOS Member</th>
                    <th className="px-4 py-2">Designation</th>
                    <th className="px-4 py-2">Organization</th>
                    <th className="px-4 py-2">Position in JOB</th>
                  </tr>
                </thead>
                <tbody>
                  {boardOfStudies.map((member, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{member.member_name}</td>
                      <td className="px-4 py-2">{member.designation}</td>
                      <td className="px-4 py-2">{member.organization}</td>
                      <td className="px-4 py-2">{member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Board of Studies Meeting Minutes</h3>
              <ul className="space-y-3 pl-4">
                {bosminutes.map((minute, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <div>
                      {minute.meeting_title}
                      <a
                        href={minute.document_url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
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
      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">{library.length > 0 ? library[0].title : 'Department Library'}</h2>

            {library.length > 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                  {/* Library Image */}
                  <div className="relative">
                    <img
                      src={library[0].image_url}
                      alt="Department Library"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>

                  {/* Library Description */}
                  <div className="space-y-4">
                    {library[0].description.map((paragraph, index) => (
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
                      {library[0].resources.map((resource, index) => (
                        <li key={index} className="flex items-center">
                          {resource.icon === 'Book' && <Book className="h-5 w-5 mr-2 text-[#B22222]" />}
                          {resource.icon === 'BookOpen' && <BookOpen className="h-5 w-5 mr-2 text-[#B22222]" />}
                          {resource.icon === 'Library' && <Library className="h-5 w-5 mr-2 text-[#B22222]" />}
                          {resource.icon === 'FileText' && <FileText className="h-5 w-5 mr-2 text-[#B22222]" />}
                          {resource.icon === 'Database' && <Database className="h-5 w-5 mr-2 text-[#B22222]" />}
                          <span>{resource.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-[#B22222] mb-4">Library Services</h3>
                    <ul className="space-y-2">
                      {library[0].services.map((service, index) => (
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
                      <h4 className="text-lg font-semibold">{library[0].faculty_incharge.name}</h4>
                      <p className="text-gray-600">{library[0].faculty_incharge.designation}</p>
                      <p className="text-gray-600">{library[0].faculty_incharge.department}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {library.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading library information...</p>
              </div>
            )}
          </div>
        );
      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Memorandums of Understanding (MoUs)</h2>

            {/* MoUs with Industries */}
            {mous.filter((item: Mous) => item.type === 'industry').length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-6 text-center">MoUs with Industries</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3">S.No</th>
                        <th className="px-4 py-3">Organization</th>
                        <th className="px-4 py-3">Industry Type</th>
                        <th className="px-4 py-3">Date of MoU</th>
                        <th className="px-4 py-3">Validity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mous.filter((item: Mous) => item.type === 'industry').map((item: Mous, index: number) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3 font-medium">{item.data.organization}</td>
                          <td className="px-4 py-3">{item.data.industry_type}</td>
                          <td className="px-4 py-3">{item.data.date_of_mou}</td>
                          <td className="px-4 py-3">{item.data.validity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Activities Under MoUs */}
            {mous.filter((item: Mous) => item.type === 'activity').length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-6">Activities Under MoUs</h3>
                <div className="space-y-6">
                  {mous.filter((item: Mous) => item.type === 'activity').map((item: Mous, index: number) => {
                    const getIcon = (category: string) => {
                      switch (category.toLowerCase()) {
                        case 'nitap collaboration':
                          return <Handshake className="h-6 w-6 mr-2 text-[#B22222]" />;
                        case 'eduskills foundation programs':
                          return <Trophy className="h-6 w-6 mr-2 text-[#B22222]" />;
                        case 'apssdc initiatives':
                          return <Activity className="h-6 w-6 mr-2 text-[#B22222]" />;
                        case 'industry internships & training':
                          return <Briefcase className="h-6 w-6 mr-2 text-[#B22222]" />;
                        default:
                          return <Activity className="h-6 w-6 mr-2 text-[#B22222]" />;
                      }
                    };

                    return (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg shadow">
                        <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                          {getIcon(item.data.category)}
                          {item.data.category}
                        </h4>
                        <ul className="space-y-3 ml-8">
                          {item.data.activities.map((activity: any, actIndex: number) => (
                            <li key={actIndex} className="flex items-start">
                              <span className="mr-2">•</span>
                              <div>
                                {activity.description}
                                {activity.link && (
                                  <a
                                    href={activity.link}
                                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                                  >
                                    <FileText className="h-4 w-4 mr-1" />
                                    View Details
                                  </a>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Benefits of MoUs */}
            {mous.filter((item: Mous) => item.type === 'benefit').length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-6 text-center">Benefits of MoUs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mous.filter((item: Mous) => item.type === 'benefit').map((item: Mous, index: number) => {
                    const getIcon = (iconName: string) => {
                      switch (iconName) {
                        case 'Briefcase':
                          return <Briefcase className="h-10 w-10 mx-auto text-[#B22222]" />;
                        case 'Scroll':
                          return <Scroll className="h-10 w-10 mx-auto text-[#B22222]" />;
                        case 'Building':
                          return <Building className="h-10 w-10 mx-auto text-[#B22222]" />;
                        case 'Users':
                          return <Users className="h-10 w-10 mx-auto text-[#B22222]" />;
                        case 'Shield':
                          return <Shield className="h-10 w-10 mx-auto text-[#B22222]" />;
                        case 'Rss':
                          return <Rss className="h-10 w-10 mx-auto text-[#B22222]" />;
                        default:
                          return <Shield className="h-10 w-10 mx-auto text-[#B22222]" />;
                      }
                    };

                    return (
                      <div key={index} className="bg-gray-50 p-5 rounded-lg shadow text-center">
                        <div className="mb-3">
                          {getIcon(item.data.icon)}
                        </div>
                        <h4 className="text-lg font-semibold mb-2">{item.data.title}</h4>
                        <p className="text-gray-700">{item.data.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {mous.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading MoUs information...</p>
              </div>
            )}
          </div>
        );
      case 'Syllabus':
        // Group syllabus data by program
        const groupedSyllabus = syllabus.reduce((acc, item) => {
          if (!acc[item.program]) {
            acc[item.program] = [];
          }
          acc[item.program].push(item);
          return acc;
        }, {} as Record<string, Syllabus[]>);

        // Sort B.Tech syllabus by version (V23, V20, V18)
        if (groupedSyllabus['B.Tech']) {
          groupedSyllabus['B.Tech'].sort((a, b) => {
            const versionOrder = { 'V23': 3, 'V20': 2, 'V18': 1 };
            return (versionOrder[b.version as keyof typeof versionOrder] || 0) - (versionOrder[a.version as keyof typeof versionOrder] || 0);
          });
        }

        // Sort M.Tech syllabus by version (V21, V18)
        if (groupedSyllabus['M.Tech']) {
          groupedSyllabus['M.Tech'].sort((a, b) => {
            const versionOrder = { 'V21': 2, 'V18': 1 };
            return (versionOrder[b.version as keyof typeof versionOrder] || 0) - (versionOrder[a.version as keyof typeof versionOrder] || 0);
          });
        }

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            <div className="container mt-5">
              <div className="space-y-8">
                {/* B.Tech (MECH) Section */}
                {groupedSyllabus['B.Tech'] && groupedSyllabus['B.Tech'].length > 0 && (
                  <div>
                    <details open className="border border-gray-300 rounded-lg">
                      <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                        B.Tech (MECH)
                      </summary>
                      <div className="p-4">
                        <ul className="space-y-4 list-disc list-inside ml-4">
                          {groupedSyllabus['B.Tech'].map((item, index) => (
                            <li key={index} className="flex items-center">
                              <span>{item.name}</span>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                              >
                                <FileText className="h-5 w-5 mr-1" />
                                View
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  </div>
                )}

                {/* M.TECH(MECH) Section */}
                {groupedSyllabus['M.Tech'] && groupedSyllabus['M.Tech'].length > 0 && (
                  <div>
                    <details className="border border-gray-300 rounded-lg">
                      <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                        M.TECH (MECH)
                      </summary>
                      <div className="p-4">
                        <ul className="space-y-4 list-disc list-inside ml-4">
                          {groupedSyllabus['M.Tech'].map((item, index) => (
                            <li key={index} className="flex items-center">
                              <span>{item.name}</span>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                              >
                                <FileText className="h-5 w-5 mr-1" />
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
            </div>
          </div>
        );
      case 'Faculty T&L methods':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Teaching & Learning Methods</h2>

            <div className="mb-8">
              <details open className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Faculty Innovation in Teaching and Learning
                </summary>
                <div className="p-4">
                  <ul className="space-y-4 list-disc list-inside ml-4">
                    {facultyTLmethods.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-1">{item.method}</span>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                          >
                            <FileText className="h-5 w-5 mr-1" />
                            View
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>

        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>

            <div className="mb-8">
              <details open className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Faculty Publications
                </summary>
                <div className="p-4">
                  <ul className="space-y-4">
                    {facultyAchievements.filter(item => item.category === 'Faculty Publications').map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mt-1">{item.description}</span>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-5 w-5 mr-1" />
                          For more Details
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Conferences & Workshops
                </summary>
                <div className="p-4">
                  <ul className="space-y-4">
                    {facultyAchievements
                      .filter(item => item.category === 'Conferences & Workshops')
                      .sort((a, b) => {
                        const yearA = parseInt(a.academic_year.split('-')[0]);
                        const yearB = parseInt(b.academic_year.split('-')[0]);
                        return yearB - yearA;
                      })
                      .map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mt-1">{item.description}</span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                          >
                            <FileText className="h-5 w-5 mr-1" />
                            View
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Student Achievements': {
        // Group student achievements by category
        const groupedAchievements = studentAchievements.reduce((acc, achievement) => {
          if (!acc[achievement.category]) {
            acc[achievement.category] = [];
          }
          acc[achievement.category].push(achievement);
          return acc;
        }, {} as Record<string, StudentAchievements[]>);

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>

            {/* Internships */}
            {(groupedAchievements['Internships'] || []).length > 0 && (
              <div className="mb-8">
                <details open className="border border-gray-300 rounded-lg">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Internships
                  </summary>
                  <div className="p-4">
                    <ul className="space-y-4 list-disc list-inside ml-4">
                      {groupedAchievements['Internships'].map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mt-1">{achievement.title}</span>
                          {achievement.url && achievement.url.trim() !== '' && (
                            <a
                              href={achievement.url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                            >
                              <FileText className="h-5 w-5 mr-1" />
                              View More
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}

            {/* NPTEL/Other Certifications */}
            {(groupedAchievements['NPTEL/Other Certifications'] || []).length > 0 && (
              <div className="mb-8">
                <details className="border border-gray-300 rounded-lg">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                    NPTEL/Other Certifications
                  </summary>
                  <div className="p-4">
                    <ul className="space-y-4 list-disc list-inside ml-4">
                      {groupedAchievements['NPTEL/Other Certifications'].map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mt-1">{achievement.title}</span>
                          {achievement.url && achievement.url.trim() !== '' && (
                            <a
                              href={achievement.url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                            >
                              <FileText className="h-5 w-5 mr-1" />
                              View More
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}

            {/* Achievements/Participations in Co-curricular/Extra-Curricular Activities */}
            {((groupedAchievements['Co-curricular/Extra-Curricular Activities'] || []).length > 0 ||
              (groupedAchievements['Notable Individual Achievements'] || []).length > 0 ||
              (groupedAchievements['Students Participations'] || []).length > 0) && (
              <div className="mb-8">
                <details className="border border-gray-300 rounded-lg">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Achievements/Participations in Co-curricular/Extra-Curricular Activities
                  </summary>
                  <div className="p-4">
                    {/* Extracurricular activities */}
                    {(groupedAchievements['Co-curricular/Extra-Curricular Activities'] || []).length > 0 && (
                      <ul className="space-y-4 list-disc list-inside ml-4">
                        {groupedAchievements['Co-curricular/Extra-Curricular Activities'].map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mt-1">{achievement.title}</span>
                            {achievement.url && achievement.url.trim() !== '' && (
                              <a
                                href={achievement.url}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                              >
                                <FileText className="h-5 w-5 mr-1" />
                                View More
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Notable Individual Achievements */}
                    {(groupedAchievements['Notable Individual Achievements'] || []).length > 0 && (
                      <div className="mt-6 border-t border-gray-200 pt-4">
                        <h4 className="font-medium text-lg mb-3">Notable Individual Achievements</h4>
                        <ul className="space-y-2 text-gray-700">
                          {groupedAchievements['Notable Individual Achievements'].map((achievement, index) => (
                            <li key={index}>{achievement.title}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Students Participations */}
                    {(groupedAchievements['Students Participations'] || []).length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-lg mb-2">Students Participations</h4>
                        <div className="flex items-start">
                          <span className="mt-1">{groupedAchievements['Students Participations'][0].title}</span>
                          {groupedAchievements['Students Participations'][0].url && groupedAchievements['Students Participations'][0].url.trim() !== '' && (
                            <a
                              href={groupedAchievements['Students Participations'][0].url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                            >
                              <FileText className="h-5 w-5 mr-1" />
                              View
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            )}

            {/* UIF */}
            {(groupedAchievements['UIF'] || []).length > 0 && (
              <div className="mb-8">
                <details className="border border-gray-300 rounded-lg">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                    UIF
                  </summary>
                  <div className="p-4">
                    <ul className="space-y-4 list-disc list-inside ml-4">
                      {groupedAchievements['UIF'].map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mt-1">{achievement.title}</span>
                          {achievement.url && achievement.url.trim() !== '' && (
                            <a
                              href={achievement.url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                            >
                              <FileText className="h-5 w-5 mr-1" />
                              View More
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}

            {/* Community Service Project */}
            {(groupedAchievements['Community Service Project'] || []).length > 0 && (
              <div className="mb-8">
                <details className="border border-gray-300 rounded-lg">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Community Service Project
                  </summary>
                  <div className="p-4">
                    <ul className="space-y-4 list-disc list-inside ml-4">
                      {groupedAchievements['Community Service Project'].map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mt-1">{achievement.title}</span>
                          {achievement.url && achievement.url.trim() !== '' && (
                            <a
                              href={achievement.url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                            >
                              <FileText className="h-5 w-5 mr-1" />
                              View More
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}

            {/* Projects */}
            {(groupedAchievements['Projects'] || []).length > 0 && (
              <div className="mb-8">
                <details className="border border-gray-300 rounded-lg">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Projects
                  </summary>
                  <div className="p-4">
                    <ul className="space-y-4 list-disc list-inside ml-4">
                      {groupedAchievements['Projects'].map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mt-1">{achievement.title}</span>
                          {achievement.url && achievement.url.trim() !== '' && (
                            <a
                              href={achievement.url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                            >
                              <FileText className="h-5 w-5 mr-1" />
                              View More
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      }
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>

            {placements.map((placement, index) => (
              <div key={placement.batch} className="mb-8">
                <details open={index === 0} className="border border-gray-300 rounded-lg">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Placements for Batch {placement.batch}
                  </summary>
                  <div className="p-4">
                    <div className="flex items-start ml-4">
                      <span className="mt-1">Placements for Batch {placement.batch}</span>
                      <a
                        href={placement.url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </div>
                  </div>
                </details>
              </div>
            ))}

            <div className="mt-12 border-t border-gray-200 pt-6">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-6 text-center">Gallery</h3>
              <div className="container mx-auto">
                <div className="flex flex-col items-center">
                  <h4 className="text-xl font-semibold mb-6">2024-2025</h4>
                  <div className="max-w-2xl mb-8">
                    <img
                      src="/images/departments/me/PlacementBroucher.jpeg"
                      alt="Placement Brochure"
                      className="w-full rounded-lg shadow-lg"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Workshops':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops/SOC/Seminars</h2>

            <div className="mb-8">
              <ol className="space-y-4 list-decimal pl-5">
                {workshops.map((workshop, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mt-1">{workshop.description}</span>
                    <a
                      href={workshop.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View More
                    </a>
                  </li>
                ))}
              </ol>
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
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Project Research & Development</h2>

            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b-2 border-primary">Research Projects Archive</h3>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#B22222]" />
                    Undergraduate Research Projects
                  </h4>
                  <ul className="space-y-3 ml-2">
                    {projectResearch
                      .filter(project => project.category === 'Undergraduate')
                      .map((project, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2">•</span>
                          <div>
                            {project.description}
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View More
                            </a>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#B22222]" />
                    Postgraduate Research Projects
                  </h4>
                  <ul className="space-y-3 ml-2">
                    {projectResearch
                      .filter(project => project.category === 'Postgraduate')
                      .map((project, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2">•</span>
                          <div>
                            {project.description}
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View More
                            </a>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        );

      case 'Newsletters':
        // Group newsletters by year and sort years descending
        const groupedNewsletters = newsletters.reduce((acc, newsletter) => {
          const year = Number(newsletter.year);
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(newsletter);
          return acc;
        }, {} as Record<number, Newsletters[]>);

        // Sort years in descending order
        const sortedYears = Object.keys(groupedNewsletters)
          .map(Number)
          .sort((a, b) => b - a);

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Newsletters</h2>

            <div className="mx-auto max-w-4xl">
              <p className="text-gray-700 mb-6 text-center">
                Our department regularly publishes newsletters to keep students, faculty, and alumni updated on departmental activities, achievements, and developments.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="space-y-4">
                  {sortedYears.map((year, yearIndex) => {
                    // Handle 2014-2015 combined display
                    const has2014 = groupedNewsletters[2014] !== undefined;
                    const has2015 = groupedNewsletters[2015] !== undefined;
                    const displayYear = (year === 2014 || year === 2015) && has2014 && has2015
                      ? '2014-2015'
                      : year.toString();

                    // Skip duplicate rendering for 2015 if 2014-2015 is already shown
                    if (year === 2015 && has2014 && has2015) {
                      return null;
                    }

                    // Get newsletters for this year (combine 2014 and 2015 if both exist)
                    const yearNewsletters = displayYear === '2014-2015'
                      ? [...(groupedNewsletters[2014] || []), ...(groupedNewsletters[2015] || [])].sort((a, b) => {
                          const volumeDiff = Number(a.volume) - Number(b.volume);
                          return volumeDiff !== 0 ? volumeDiff : Number(a.issue) - Number(b.issue);
                        })
                      : groupedNewsletters[year];

                    return (
                      <div key={year} className={yearIndex < sortedYears.length - 1 ? "border-b pb-2" : ""}>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{displayYear}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {yearNewsletters?.map((newsletter, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                              <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                {newsletter.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">{newsletter.description}</p>
                              <a
                                href={newsletter.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center text-blue-600 hover:underline"
                              >
                                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                View Newsletter
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 italic">
                  For archived newsletters or additional information, please contact the department office.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Magazines':
        // Group magazines by year
        const groupedMagazines = magazines.reduce((acc, mag) => {
          if (!acc[mag.year]) acc[mag.year] = [];
          acc[mag.year].push(mag);
          return acc;
        }, {} as Record<string, Magazines[]>);

        // Define year order to maintain same display order
        const yearOrder = ['2019-2020', '2018-2019', '2016-2017', 'Earlier Issues'];

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Magazines</h2>

            <div className="mx-auto max-w-4xl">
              <p className="text-gray-700 mb-6 text-center">
                Mechazine is our department's biannual magazine that showcases student achievements, technical articles, and the latest developments in mechanical engineering.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {yearOrder.map(year => {
                    const yearMagazines = groupedMagazines[year] || [];

                    if (year === 'Earlier Issues') {
                      // Special handling for Earlier Issues - group by volume
                      const volume3 = yearMagazines.filter(m => m.volume === '3');
                      const volume2 = yearMagazines.filter(m => m.volume === '2');

                      return (
                        <div key={year} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">{year}</h3>
                          <ul className="space-y-4">
                            {/* Volume 3 */}
                            <li>
                              <div className="flex items-start">
                                <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-gray-800">Mechazine Volume 3 Issues</p>
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    {volume3.map(issue => (
                                      <a
                                        key={`${issue.year}-${issue.volume}-${issue.issue}`}
                                        href={issue.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:underline text-sm"
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        Issue {issue.issue}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </li>
                            {/* Volume 2 */}
                            <li>
                              <div className="flex items-start">
                                <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-gray-800">Mechazine Volume 2 Issues</p>
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    {volume2.map(issue => (
                                      <a
                                        key={`${issue.year}-${issue.volume}-${issue.issue}`}
                                        href={issue.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:underline text-sm"
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        Issue {issue.issue}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      );
                    } else {
                      // Regular years - sort by volume desc, then issue desc
                      const sortedMagazines = yearMagazines.sort((a, b) => {
                        if (a.volume !== b.volume) return parseInt(b.volume) - parseInt(a.volume);
                        return parseInt(b.issue) - parseInt(a.issue);
                      });

                      return (
                        <div key={year} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">{year}</h3>
                          <ul className="space-y-4">
                            {sortedMagazines.map(mag => (
                              <li key={`${mag.year}-${mag.volume}-${mag.issue}`}>
                                <div className="flex items-start">
                                  <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                                  <div>
                                    <p className="font-medium text-gray-800">{mag.title}</p>
                                    <p className="text-sm text-gray-600 mb-2">{mag.description}</p>
                                    <a
                                      href={mag.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center text-blue-600 hover:underline"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                      View Magazine
                                    </a>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 italic">
                  Mechazine is a biannual publication featuring technical articles, student achievements, department events, and industry insights. Students and faculty are encouraged to contribute articles for upcoming issues.
                </p>
              </div>
            </div>
          </div>
        );

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
                    />
                    <img
                      src="/images/departments/me/Hackthon 2021_22 (1).jpeg"
                      alt="Hackathon 2021-22 Photo 1"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="space-y-6">
                    <img
                      src="/images/departments/me/Hackthon 2021_22 (1).jpeg"
                      alt="Hackathon 2021-22 Photo 2"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <img
                      src="/images/departments/me/Hackthon_2022_23 (2) (1).jpg"
                      alt="Hackathon 2022-23 Photo 2"
                      className="w-full h-auto rounded-lg shadow-md"
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

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Mechanical Engineering</h1>
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
        title="Mechanical Department"
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
export default MechanicalDepartment;