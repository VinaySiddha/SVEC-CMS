import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';
import { useDepartmentData } from '../../hooks/useDepartmentData';


type Doc = { id: number; academic_year: string; title: string; file_url: string };
type Image = { id: number; image_url: string; alt_text: string };
type Gallery = { id: number; title: string; images: Image[] };
const AIMLDepartment: React.FC = () => {
  const [faculty, setFaculty] = React.useState<any[]>([]);
    const [TechnicalFaculty, setTechnicalFaculty] = React.useState<any[]>([]);
    const [nonTeachingFaculty, setNonTeachingFaculty] = React.useState<any[]>([]);
    const [syllabus, setSyllabus] = React.useState<any[]>([]);
    const [mous, setMous] = React.useState<any[]>([]);
    const [fdp, setFdp] = React.useState<any[]>([]);
    const [data, setData] = React.useState<any[]>([]);
    const [workshopsdata,setWorkshops]=React.useState<
    { title: string; items: { text: string; url: string }[] }[]
  >([])
  const [studentAchievements, setStudentAchievements] = React.useState<any[]>([]);
  const [placements, setPlacements] = React.useState<any[]>([]);
  const [academicToppers, setAcademicToppers] = React.useState<{
    dept?: string;
    batches?: any[];
    stats?: any[];
  }>({});
  const batches = academicToppers.batches ?? [];
  const stats   = academicToppers.stats ?? [];
  const [extra, setExtra] = React.useState<{documents:any[]; clubs:any[]}>({documents:[], clubs:[]});
  const [hackathons, setHackathons] = React.useState<{documents: Doc[]; galleries: Gallery[]}>({documents: [], galleries: []});
  const [handbooks, setHandbooks] = React.useState<any[]>([]);
  const [acdemictoppersgal,setAcademicToppersGal] = React.useState<{galleries: Gallery[]}>({galleries: []});
            React.useEffect(() => {
                fetch('/api/aiml/academic-toppers-gallery?dept=aiml')
                  .then(res => res.json())
                  .then(setAcademicToppersGal)
                  .catch(console.error);
              }, []);

  React.useEffect(() => {
    fetch('/api/aiml/aiml-handbooks?dept=aiml')
      .then(res => res.json())
      .then(setHandbooks)
      .catch(console.error);
  }, []);


  React.useEffect(() => {
    fetch('/api/aiml/aiml-hackathons?dept=aiml')
      .then(res => res.json())
      .then(setHackathons)
      .catch(console.error);
  }, []);

React.useEffect(() => {
  fetch('/api/aiml/aiml-extracurricular-activities?dept=aiml')
    .then(res => res.json())
    .then(data => setExtra(data))
    .catch(console.error);
}, []);

  React.useEffect(() => {
            fetch('/api/aiml/aiml-academic-toppers?dept=aiml')
              .then((res) => res.json())
              .then((data) => {
                setAcademicToppers(data);
              })
          }, []);

  React.useEffect(() => {
            fetch('/api/aiml/aiml-placements?dept=aiml')
              .then((res) => res.json())
              .then((data) => {
                setPlacements(data);
              })
          }, []);


  React.useEffect(() => {
            fetch('/api/aiml/student-achievements?dept=aiml')
              .then((res) => res.json())
              .then((data) => {
                setStudentAchievements(data);
              })
          }, []);

    React.useEffect(() => {
            fetch('/api/aiml/faculty-development-programs?dept=aiml')
              .then((res) => res.json())
              .then((data) => {
                setFdp(data);
              })
          }, []);
    React.useEffect(() => {
            fetch('/api/aiml/aiml-workshops?dept=aiml')
              .then((res) => res.json())
              .then((data) => {
                setWorkshops(data);
              })
          }, []);
    
    React.useEffect(() => {
            fetch('/api/aiml/faculty-achievements?dept=aiml')
              .then((res) => res.json())
              .then((data) => {
                setData(data);
              })
          }, []);

    React.useEffect(() => {
            fetch("/api/aiml/aiml-syllabus?dept=aiml")
              .then((res) => res.json())
              .then((data) => {
                setSyllabus(data);
              })
          }, []);
    
    React.useEffect(() => {
      fetch('/api/aiml/aiml-mous?dept=aiml')
      .then((res) => res.json())
              .then((data) => {
                setMous(data);
              })
          }, []);
    
  
    React.useEffect(() => {
      fetch('/api/aiml/aiml-faculty-profiles?dept=aiml')
        .then(res => res.json())
        .then((data) => {
          //console.log(data)
          setFaculty(data); // directly set data, no type filter for now
        });
    }, []);
  
    React.useEffect(() => {
      fetch("/api/aiml/aiml-technical-faculty?dept=aiml")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.technical)
          setTechnicalFaculty(data.technical || []);
        });
    }, []);
  
    React.useEffect(() => {
      fetch("/api/aiml/aiml-non-teaching-staff?dept=aiml")
        .then((res) => res.json())
        .then((data) => {
          //console.log(data)
          setNonTeachingFaculty(data.nonTeaching || []);
        });
    }, []);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  
  // Fetch department data from database
  const { data: departmentData, loading, error } = useDepartmentData('AIML');

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
    { id: 'Academic Toppers', label: 'Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Brain className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Brain className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];
  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="mt-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Department of Computer Science and Artificial Intelligence came into inception from 2021 onwards with an intake of 60 seats in B.Tech. From 2022 onwards the intake was increased to 120 seats. From 2025 onwards the intake was increased to 180 seats.
            </p>

          </div>
        );
      case 'Vision':
        return (
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">
              To evolve as a center of academic excellence and advanced research in the field of Artificial Intelligence and Machine Learning by developing competent professionals with ethical values to meet the technological challenges.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="mt-6">
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                To impart quality education through innovative teaching-learning methods in Artificial Intelligence and Machine Learning.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To establish Center of Excellence through collaboration with industries to bridge the gap between academia and industry.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To provide opportunities for students to acquire problem solving skills through projects and internships.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To inculcate entrepreneurial skills, ethical values, and leadership qualities among students to make them responsible citizens.
              </li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4 italic">Graduates of Artificial Intelligence and Machine Learning Program will be able to:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO1:</strong> Excel in professional career and/or higher education by acquiring knowledge in Artificial Intelligence, Machine Learning and related areas.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO2:</strong> Analyze real-world problems and design innovative solutions using Artificial Intelligence, Machine Learning and allied technologies.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO3:</strong> Function effectively as individuals and as team members with professional ethics and social responsibility.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO4:</strong> Engage in continuous learning through research, training and professional development.
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
                <strong>PSO1:</strong> Apply the concepts of Artificial Intelligence, Machine Learning, Deep Learning and Data Science to solve real-world problems.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO2:</strong> Design and develop intelligent systems and applications using modern tools and technologies in the field of Artificial Intelligence and Machine Learning.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO3:</strong> Apply the principles of Artificial Intelligence and Machine Learning to address industrial and societal challenges.
              </li>
            </ul>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the Computer Science & Engineering (Artificial Intelligence & Machine Learning) department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/aiml/COs.pdf"
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
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                Well-qualified faculty with expertise in AI, ML, and Data Science
              </li>
              <li className="text-gray-700 leading-relaxed">
                State-of-the-art laboratories with advanced computing facilities
              </li>
              <li className="text-gray-700 leading-relaxed">
                Industry collaborations through MoUs with leading tech companies
              </li>
              <li className="text-gray-700 leading-relaxed">
                Regular workshops, hackathons, and technical symposiums
              </li>
              <li className="text-gray-700 leading-relaxed">
                Access to specialized software and tools for AI/ML development
              </li>
              <li className="text-gray-700 leading-relaxed">
                Extensive industry internship opportunities
              </li>
              <li className="text-gray-700 leading-relaxed">
                Research projects in cutting-edge areas of AI and ML
              </li>
              <li className="text-gray-700 leading-relaxed">
                Strong placement record with tech giants and startups
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const [boardOfStudies, setBoardOfStudies] = useState<any[]>([]);
  const [loadingBOS, setLoadingBOS] = useState(true);
  const [bosError, setBOSError] = useState<string | null>(null);

  React.useEffect(() => {
    setLoadingBOS(true);
    fetch("/api/aiml/aiml-board-of-studies?dept=aiml")
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

  const labs = [
    { name: "James Gosling Lab", image: "/images/departments/cai/James Gosling Lab.jpg" },
    { name: "EF Codd Lab", image: "/images/departments/cai/E F Codd LAb.jpg" },
    { name: "Linus Torvalds Lab", image: "/images/departments/cai/Linus Torvalds Lab.jpg" },
    { name: "Yellow Lab", image: "/images/departments/cai/Yellow Lab.jpg" },
    { name: "Pink Lab", image: "/images/departments/cai/Pink Lab.jpg" },
    { name: "Orange Lab", image: "/images/departments/cai/Orange Lab.jpg" },
    { name: "Green Lab", image: "/images/departments/cai/Green Lab.jpg" },
    { name: "Brown Lab", image: "/images/departments/cai/Brown Lab.jpg" },
    { name: "PG CP Lab", image: "/images/departments/cai/pgcplab.jpg" },
    { name: "R&D Lab", image: "/images/departments/cai/Sartaj Sahni Lab.jpg" },
  ];

  const renderContent = () => {
    switch (activeContent) {
      case 'Academic Toppers':
        return (
          <div id="academic-toppers" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
          Academic Toppers
        </h2>

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
       </div>
          </div>
        );
      case 'Technical Association':
        return (
          <div id="technical-association" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
              <div className="mb-8">
                <ul className="list-disc ml-6 mt-4">
                  <li>
                    MoUs with NIT ANP, Eduskills, Hexaware, APSSDC, Alykas Innovations Pvt.Ltd, thingTronics Pvt Ltd, Bangalore and TCS-iON.
                  </li>
                  <li>
                    College has MOU with TCS for conducting Online Competitive Exams for which our Department Resources are being utilized.
                  </li>
                  <li>
                    Professional Society memberships in ISTE and IAENG
                  </li>
                  <li>Good faculty retention</li>
                  <li>Well Equipped Laboratories</li>
                  <li>Maitri, Social Service Unit, managed by the Students.</li>
                </ul>
              </div>
            </div>
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

      case 'Department Profile':
        return (
          <div id="department-profile" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
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
                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of the Department</p>
                    <p className="text-gray-600">Mobile No: 7672082130</p>
                    <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-442)</p>
                    <p className="text-gray-600">Email: <a href="mailto:hod_aim@srivasaviengg.ac.in" className="text-primary hover:underline">hod_aim@srivasaviengg.ac.in</a></p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Department of Computer Science and Artificial Intelligence came into inception from 2021 onwards with an intake of 60 seats in B.Tech. From 2022 onwards the intake was increased to 120 seats. From 2025 onwards the intake was increased to 180 seats.
                  </p>
                </div>
              </div>

              {/* Department Profile Tab Navigation */}
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
          </div>
        );
      case 'Faculty Profiles':
        return (
          <div id="faculty-profiles" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Teaching Faculty</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">S.No.</th>
                      <th scope="col" className="px-6 py-3">Name</th>
                      <th scope="col" className="px-6 py-3">Qualification</th>
                      <th scope="col" className="px-6 py-3">Designation</th>
                      <th scope="col" className="px-6 py-3">Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculty.map((member, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
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
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Non-Teaching Profiles</h2>
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
                    {nonTeachingFaculty && nonTeachingFaculty.length > 0 ? (
                      nonTeachingFaculty.map((member, index) => (
                        <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                          <td className="px-6 py-4">{member.designation}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                          No non-teaching staff data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Board of Studies':
        return (
          <div id="board-of-studies" className="space-y-8 animate-fade-in">
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
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h4 className="text-2xl font-bold text-[#B22222] mb-4 text-center">Board of Studies Meeting Minutes</h4>
              <ul className="list-disc list-inside space-y-2 text-center">
                <li>Minutes of 4<sup>th</sup> meeting of the Board of Studies, dated 02.08.2024 <a href="#" className="text-primary hover:underline ml-2">View</a></li>
                <li>Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 25.07.2022 <a href="#" className="text-primary hover:underline ml-2">View</a></li>
                <li>Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 31.12.2021 <a href="#" className="text-primary hover:underline ml-2">View</a></li>
              </ul>
            </div>
          </div>
        );
      case 'Physical Facilities':
        return (
          <div id="physical-facilities" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>

              <div className="space-y-4">
                <details open className="border border-gray-300 rounded-lg mb-4">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Class Rooms
                  </summary>
                  <div className="p-4">
                    <h5 className="font-medium text-lg mb-2">Class Rooms</h5>
                    <div className="mb-2">
                      <span>Class Rooms with ICT Enabled Facilities</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </div>

                    <h5 className="font-medium text-lg mt-4 mb-2">Class Time Tables</h5>
                    <div className="mb-2">
                      <span>Master Timetable_A.Y for Sem-II 2022-23</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/aiml/AI%20_ML_Master%20Time%20Table_2022-23_%20II%20SEM%20_AIML.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </div>
                    <div className="mb-2">
                      <span>Master Timetable_A.Y for Sem-I 2022-23</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/aiml/AIM_Master%20Time%20Table_A.Y%202022-23_%20I%20SEM.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </div>
                  </div>
                </details>

                <details className="border border-gray-300 rounded-lg mb-4">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Seminar Halls
                  </summary>
                  <div className="p-4">
                    <div className="mb-2">
                      <span>Seminar halls with ICT Enabled Facilities</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </div>
                  </div>
                </details>

                <details className="border border-gray-300 rounded-lg mb-4">
                  <summary className="bg-gray-100 p-4 cursor-pointer text-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
                    Laboratories
                  </summary>
                  <div className="p-4">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The Department has well equipped labs with the latest
                      Configuration. Total 9 Computer Labs for UG, PG and one
                      research lab consisting a total of 674 systems. The various
                      servers in the server room include Oracle 11g Database Server,
                      Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab
                      Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation
                      Server, A-Mail Server, ECAP Server.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The college has high-speed internet connectivity throughout
                      the campus through a leased line from BSNL with 200Mbps,
                      400Mbps from Jio, and 40 Mbps (Broadband).
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      The following Laboratories are available in the department:
                    </p>

                    <div className="my-6">
                      <h3 className="text-xl font-semibold text-center mb-4">Linus Torvalds Lab</h3>
                      <div className="overflow-x-auto mb-6">
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
                                Model : HP 280PRO G9 Micro Tower<br />
                                Processor : Intel core TM i3-10100 CPU@3.64 GHZ<br />
                                8.00 GB RAM, 256.00 GB SSD<br />
                                System type : x64 – based Processor<br />
                                Monitor: 19.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse<br />
                              </td>
                              <td className="py-3 px-4 border-b">70</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model : ACER Vertion Desktop<br />
                                Processor : Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type : x64 – based Processor<br />
                                Monitor : 19.5" LED Monitor<br />
                                Keyboard : Multimedia Keyboard<br />
                                Mouse : Optical Mouse<br />
                              </td>
                              <td className="py-3 px-4 border-b">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold text-center mb-4">Orange Lab</h3>
                      <div className="overflow-x-auto mb-6">
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
                                Monitor: 20.5" TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                        <div className="text-center">
                          <img
                            src="/images/departments/cai/Linus Torvalds Lab.jpg"
                            alt="Linus Torvalds Lab"
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                            style={{ aspectRatio: '16/9' }}
                          />
                          <h4 className="text-lg font-semibold text-green-600 mt-3">
                            Linus Torvalds Lab
                          </h4>
                        </div>

                        <div className="text-center">
                          <img
                            src="/images/departments/cai/Orange Lab.jpg"
                            alt="Orange Lab"
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                            style={{ aspectRatio: '16/9' }}
                          />
                          <h4 className="text-lg font-semibold text-green-600 mt-3">
                            Orange Lab
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Other Laboratories</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {labs.map((lab, index) => (
                          lab.name !== "Linus Torvalds Lab" && lab.name !== "Orange Lab" && (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                              <img src={lab.image} alt={lab.name} className="w-full h-48 object-cover rounded-md mb-4" />
                              <h4 className="font-bold text-lg text-gray-800">{lab.name}</h4>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        );
      case 'Syllabus':
        return (
          <div id="syllabus" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
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
      case 'Contact':
        return (
          <div id="contact" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Contact Information</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of the Department</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                  <p className="text-gray-600">Fax No: 08818-284322</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_aim@srivasaviengg.ac.in" className="text-primary hover:underline">hod_aim@srivasaviengg.ac.in</a></p>
                </div>
              </div>
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
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} will be updated soon.</h3></div>;
    }
  };

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Artificial Intelligence & Machine Learning</h1>
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
        title="AI & ML Department"
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

export default AIMLDepartment;

function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
