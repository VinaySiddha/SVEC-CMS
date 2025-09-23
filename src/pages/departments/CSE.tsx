import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

// Interfaces for typed data
interface Faculty {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  profile_url?: string;
}

interface Staff {
  id: number;
  name: string;
  designation: string;
}

interface Achievement {
  id: number;
  title: string;
  description?: string;
  date?: string;
  category?: string;
}

interface Placement {
  id: number;
  student_name: string;
  company_name: string;
  package?: number;
  academic_year: string;
}

interface Hackathon {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  level?: string;
  position?: string;
  participants_count?: number;
  winners?: any;
}

interface DepartmentData {
  faculty: Faculty[];
  technicalStaff: Staff[];
  nonTeachingStaff: Staff[];
  studentAchievements: Achievement[];
  facultyAchievements: Achievement[];
  placements: Placement[];
  hackathons: Hackathon[];
}


const CSEDepartment: React.FC = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [departmentData, setDepartmentData] = useState<DepartmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    { id: 'Technical Association', label: 'Technical Association', icon: <Activity className="w-4 h-4" /> },
    { id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Cpu className="w-4 h-4" /> },
    { id: 'e-Resources', label: 'e-Resources', icon: <Wifi className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const [achievements, setStudentAchievements] = useState([]);

   const [handbooks, setHandbooks] = useState([]);
  // Removed duplicate declaration of hackathonsData
  const [hackathonsData, setHackathonsData] = useState([]);

    const [eresources, setEresources] = useState([]);
    
  // Fetch department data
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/public/departments/cse');
        
        if (!response.ok) {
          throw new Error('Failed to fetch department data');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setDepartmentData(result.data);
        } else {
          throw new Error('Failed to load department data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching department data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch('/api/cstcse/handbooks?dept=CSE')
      .then(res => res.json())
      .then(data => setHandbooks(data));``
fetch('/api/cstcse/eresources')
      .then(res => res.json())
      .then(data => setEresources(data));

       fetch('/api/cstcse/studentAchievements?dept=CSE')
      .then(res => res.json())
      .then(data => setStudentAchievements(data));

    fetchDepartmentData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Use database data or fallback to empty arrays
  const faculty = departmentData?.faculty || [];
  const nonTeachingFaculty = departmentData?.nonTeachingStaff || [];
  const TechnicalFaculty = departmentData?.technicalStaff || [];
  const placementsData = departmentData?.placements || [];
  // Remove this line to avoid redeclaration:
  // const hackathonsData = departmentData?.hackathons || [];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 mb-3 text-justify">
              CSE Department came into inception from 2001 onwards with an
              intake of 60 seats in B.Tech. From 2006 onwards the intake was
              increased to 120 seats. From 2013 onwards the intake was
              increased to 180 seats. From 2015 onwards intake was increased
              to 240 seats. From 2024 onwards intake was increased to 300
              seats.
            </p>
            <p className="text-gray-700 mb-3 text-justify">
              CSE Department is offering M.Tech (CS) program from 2020
              onwards with a present intake of 12 seats.
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
                    <td className="px-6 py-4">B.Tech - Computer Science and Engineering</td>
                    <td className="px-6 py-4">AP EAPCET</td>
                    <td className="px-6 py-4">4 Years</td>
                    <td className="px-6 py-4">300</td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">2</td>
                    <td className="px-6 py-4">M.Tech - Computer Science</td>
                    <td className="px-6 py-4">GATE/PGECET</td>
                    <td className="px-6 py-4">2 Years</td>
                    <td className="px-6 py-4">12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To evolve into a center of excellence in Computer Science & Engineering education and research, producing professionally competent and socially responsible engineers.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To impart quality education through effective teaching-learning processes.</li>
              <li>To provide excellent infrastructure and environment conducive for research.</li>
              <li>To enhance industry-institute interaction to make students industry-ready.</li>
              <li>To develop entrepreneurship skills and ethical values among students.</li>
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
                <p className="text-gray-700">Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and computer science & engineering principles.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Analyze real-life problems and design socially responsible and environmentally sustainable computer-based solutions.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Adapt to evolving technologies through continuous learning.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 4</h4>
                <p className="text-gray-700">Lead a successful career as a team member or as a team leader with strong professional ethics and communication skills.</p>
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
                <h4 className="text-md font-semibold text-blue-800">PO1: Engineering Knowledge</h4>
                <p className="text-gray-700">Apply knowledge of mathematics, science, engineering fundamentals, and computer science & engineering principles to solve complex engineering problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, research literature, and analyze complex engineering problems to arrive at substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Design/Development of Solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO4: Modern Tool Usage</h4>
                <p className="text-gray-700">Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools for complex engineering activities with an understanding of the limitations.</p>
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
                <p className="text-gray-700">Apply standard practices and strategies in software development using open-ended programming environments to deliver quality software solutions.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 2</h4>
                <p className="text-gray-700">Apply the fundamentals of computer science & engineering to solve engineering problems in interdisciplinary domains.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 3</h4>
                <p className="text-gray-700">Develop applications using emerging technologies to provide innovative solutions for real-world problems.</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the Computer Science & Engineering department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/cse/COs.pdf"
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
              <li>Experienced and dedicated faculty members with specializations in various domains</li>
              <li>State-of-the-art computing facilities with high-speed internet connectivity</li>
              <li>Strong industry-institute interaction through internships, projects, and expert lectures</li>
              <li>Research culture fostering innovation and intellectual growth</li>
              <li>Active student chapters and technical clubs</li>
              <li>Regular workshops, seminars, and training programs on emerging technologies</li>
              <li>Excellent placement record in reputed companies</li>
            </ul>
          </div>
        );


    }
  };

  const renderContent = () => {
    console.log("Current activeContent:", activeContent);
    switch (activeContent) {
   case 'Student Achievements':
return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Student Achievements</h2>
      <div className="space-y-4">
        {achievements.length > 0 ? (
          achievements.map((item) => (
            <details key={item.id} className="border rounded-lg p-4">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                {item.category}: {item.title}
              </summary>
              <div className="nav-content mt-4">
                {item.description && <p className="mb-2">{item.description}</p>}
                {item.fileUrl && (
                  <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">
                    View More
                  </a>
                )}
                {item.academic_year && (
                  <p className="text-sm text-gray-500 mt-2">Academic Year: {item.academic_year}</p>
                )}
              </div>
            </details>
          ))
        ) : (
          <p>No student achievements found.</p>
        )}
      </div>
    </div>
  );

// ...existing code...
case 'Hackathons':{
  <div>

  <h3 className="text-2xl font-semibold text-[#7f1d1d] mb-4 text-center">Hackathons Conducted</h3>
  <div className="flex justify-center mb-8">
    <div className="overflow-x-auto w-full">
      {hackathonsData.length > 0 ? (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">S.NO.</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">Academic Year</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">Brochure</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">Winners</th>
            </tr>
          </thead>
          <tbody>
            {hackathonsData.map((hackathon, index) => (
              <tr key={hackathon.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b font-medium">{hackathon.academic_year}</td>
                <td className="py-3 px-4 border-b">
                  {hackathon.brochure_url ? (
                    <a href={hackathon.brochure_url} target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View Brochure</a>
                  ) : 'N/A'}
                </td>
                <td className="py-3 px-4 border-b">
                  {hackathon.winners_url ? (
                    <a href={hackathon.winners_url} target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View Winners</a>
                  ) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No hackathons data available at the moment.</p>
        </div>
      )}
    </div>
  </div>
  </div>

  {/* Gallery Section */}
  <div className="mt-12">
    <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">Gallery</h3>
    {hackathonsData.map(hackathon => (
      <div key={hackathon.id} className="mb-8">
        <h4 className="text-xl font-medium text-center mb-6">Hackathon {hackathon.academic_year}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hackathon.gallery.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`Hackathon ${hackathon.academic_year} Image ${idx + 1}`}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              style={{ aspectRatio: "16/9" }}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
// ...existing code...
  }

case 'e-Resources':{
// Group by regulation
const eresourcesGrouped = eresources.reduce((acc, item) => {
  acc[item.regulation] = acc[item.regulation] || [];
  acc[item.regulation].push(item);
  return acc;
}, {});

return (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
    <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">e-Resources</h2>
    {/* ...static intro text... */}
    {Object.entries(eresourcesGrouped).map(([regulation, items]) => (
      <div key={regulation} className="mb-8">
        <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">{regulation}- Subjects</h3>
        <div className="overflow-x-auto mb-8">
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
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{idx + 1}</td>
                  <td className="py-3 px-4 border-b">{item.regulation}</td>
                  <td className="py-3 px-4 border-b">{item.semester}</td>
                  <td className="py-3 px-4 border-b">{item.subject}</td>
                  <td className="py-3 px-4 border-b">
                    {item.ppt_url ? (
                      <a href={item.ppt_url} target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    ) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ))}
  </div>
);
}

case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
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
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>

            {/* HOD Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">Head of Department</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src="/cse_hod1.jpeg"
                      alt="Dr. D. Jaya Kumari"
                      className="w-48 h-48 object-cover rounded-xl shadow-md"
                      style={{ aspectRatio: '1/1' }}
                    />
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Dr. D. Jaya Kumari</h4>
                  <p className="text-gray-600 mb-4">Professor & Head of Department, CSE</p>
                  <p className="text-gray-700 leading-relaxed mb-2">Ph.D in Computer Science, M.Tech CSE</p>
                  <p className="text-gray-700 leading-relaxed">
                    Email: <a href="mailto:hod_cse@srivasaviengg.ac.in" className="text-[#B22222] hover:underline">hod_cse@srivasaviengg.ac.in</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Department Profile Navigation - Grid Layout */}
            <div className="mb-8 mt-12">
              {/* Row 1: Department, Vision */}
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => setActiveDeptTab('Department')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Department'
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Department
                </button>
                <button
                  onClick={() => setActiveDeptTab('Vision')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Vision'
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Vision
                </button>
              </div>

              {/* Row 2: Mission, PEOs, POs */}
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => setActiveDeptTab('Mission')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Mission'
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Mission
                </button>
                <button
                  onClick={() => setActiveDeptTab('PEOs')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PEOs'
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  PEOs
                </button>
                <button
                  onClick={() => setActiveDeptTab('POs')}
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
                  onClick={() => setActiveDeptTab('PSOs')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PSOs'
                    ? 'bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  PSOs
                </button>
                <button
                  onClick={() => setActiveDeptTab('COs')}
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
                  onClick={() => setActiveDeptTab('SalientFeatures')}
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
              className="fixed right-3 bottom-6 z-40 w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
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

      case 'Faculty Profiles':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
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
                          {member.profile_url ? (
                            <a href={member.profile_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View</a>
                          ) : (
                            <span className="text-gray-400">Not Available</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Staff</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">S.No.</th>
                      <th scope="col" className="px-6 py-3">Name</th>
                      <th scope="col" className="px-6 py-3">Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TechnicalFaculty.map((member, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4">{member.designation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Non-Teaching Staff</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">S.No.</th>
                      <th scope="col" className="px-6 py-3">Name</th>
                      <th scope="col" className="px-6 py-3">Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonTeachingFaculty.map((member, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
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
        );


      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-4 bg-gray-100 p-3 rounded-lg">FDPs Attended</h3>
                <ul className="space-y-3 pl-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2024-25
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_FDPs%20in%20A.Y%202024-2025.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2023-24
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202023-2024.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2022-23
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202022-2023.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2021-22
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202021-2022.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2020-21
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPS%20Attended%20by%20the%20faculty%202020-21.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2019-20
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPS%20Attended%20by%20the%20faculty%202019-20.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2018-19
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse%202018-2019%20fdp's.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2017-18
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/fdp-2017-2018.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2016-17
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/fdp-2016-2017.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2015-16
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/fdp-2015-2016.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended by the Faculty 2014-15
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/fdp-2014-2015.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 bg-gray-100 p-3 rounded-lg">FDPs/ Workshops/ Training Programmes Conducted</h3>
                <ul className="space-y-3 pl-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs conducted by the Department to the Faculty
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20facultys.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 bg-gray-100 p-3 rounded-lg">Gallery</h3>
                <div className="container mx-auto">
                  <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="http://srivasaviengg.ac.in/images/departments/cse/fdp_25_26.jpg" alt="FDP 2024-25" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '4/3' }} />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="http://srivasaviengg.ac.in/images/departments/cse/FDP-2022-09-13-16.jpg" alt="FDP 2022-09-13-16" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '4/3' }} />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="http://srivasaviengg.ac.in/images/departments/cse/FDP-2022-09-13.jpg" alt="FDP 2022-09-13" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '4/3' }} />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="http://srivasaviengg.ac.in/images/departments/cse/FDP-2022-10-01-17.jpg" alt="FDP 2022-10-01-17" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '4/3' }} />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="http://srivasaviengg.ac.in/images/departments/cse/FDP-2022100117.jpg" alt="FDP 2022100117" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '4/3' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Faculty Achievements
            </h2>
            <div className="mt-4">
              <details open>
                <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">Journal Publications</summary>
                <div className="p-4">
                  <ul className="space-y-3 list-none">
                    <li className="text-center">
                      Faculty Publication Details 2024-2025 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Journal publications 2024-25.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2023-2024 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Faculty%20Publications%202023-24.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2022-2023 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Faculty%20Publications%202022-23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2021-2022 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Faculty%20Publications%202021-22.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2020-2021 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Faculty%20Publications%202020-21.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2019-2020 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Faculty%20Publications%202019-20.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2018-2019 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/2018-19-pub.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2017-2018 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/2017-18-pub.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2016-2017 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/2016-17-pub.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2015-2016 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/2015-16-pub.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2014-2015 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/2014-15.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2013-2014 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/2013-14.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Publication Details 2012-2013 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/2012-13.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mt-4">
              <details>
                <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">Conferences</summary>
                <div className="p-4">
                  <ul className="space-y-3 list-none">
                    <li className="text-center">
                      Faculty Conferences Details 2024-2025 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Conferences 2024-25.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2023-2024 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/cse_faculty_conferences_2023_24.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2022-2023 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2022_23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2021-2022 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2021_22.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2020-2021 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2020_21.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2019-2020 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2019_20.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2018-2019 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2018_19.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2016-2017 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2016_17.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2015-2016 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2015_16.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Faculty Conferences Details 2014-2015 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2014_15.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mt-4">
              <details>
                <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">Book Publications</summary>
                <div className="p-4">
                  <ul className="space-y-3 list-none">
                    <li className="text-center">
                      Book Published by Faculty during the A.Y 2024-2025 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Books & chapters_ 2024-25.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Book Published by Faculty during the A.Y 2023-2024 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Books & chapters_ 2023-24.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Book Published by Faculty during the A.Y 2022-2023 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Books & chapters_ 2022-23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Book Published by Faculty during the A.Y 2020-2021 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Books & chapters_ 2020-21.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Book Published by Faculty during the A.Y 2019-2020 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_faculty_conferences_2019_20.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Book Published by Faculty during the A.Y 2018-2019 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Books & chapters_ 2018-19.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mt-4">
              <details>
                <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">Certifications</summary>
                <div className="p-4">
                  <ul className="space-y-3 list-none">
                    <li className="text-center">
                      Certifications done by the faculty during the A.Y. 2024-25 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Certifications in A.Y 2024-2025.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Certifications done by the faculty during the A.Y. 2023-24 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Certifications%202023-2024%20by%20Faculty.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Certifications done by the faculty during the A.Y. 2022-23 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Certifications%20done%20by%20the%20faculty%20during%20the%20A.Y%202022-23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Certifications done by the faculty during the A.Y. 2021-22 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Certifications%20done%20by%20the%20faculty%20during%20the%20A.Y%202021-22.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Certifications done by the faculty during the A.Y. 2020-21 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/certifications%202020-2021_CSE.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Certifications done by the faculty during the A.Y. 2019-20 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Certifications%20done%20by%20the%20faculty%20during%20the%20A.Y.%202019-20.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Certifications done by the faculty during the A.Y. 2018-19 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Certifications%20done%20by%20the%20faculty%20during%20the%20A.Y.%20%202018-19.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mt-4">
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>Patents</summary>
                <div className="p-4">
                  <ul className="space-y-3 list-none">
                    <li className="text-center">
                      Patents Published by Faculty during the A.Y 2024-2025 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Patents  Details-2024-25.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Patents Published by Faculty during the A.Y 2023-2024 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Patents%20summary%202023-24.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Patents Published by Faculty during the A.Y 2022-2023 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Patents 2022-23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Patents Published by Faculty during the A.Y 2021-2022 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Patents%20summary%202021-22.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Patents Published by Faculty during the A.Y 2020-2021 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Patents%20summary%202020-21.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Patents Published by Faculty during the A.Y 2019-2020 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Patents%20summary%202019-20.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mt-4">
              <details>
                <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">Research Supervisors</summary>
                <div className="p-4">
                  <ul className="space-y-3 list-none">
                    <li className="text-center">
                      Research Supervisors -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_Details%20of%20Research%20guides.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mt-4">
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>Awards</summary>
                <div className="p-4">
                  <ul className="space-y-3 list-none">
                    <li className="text-center">
                      Faculty Awards -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Faculty Achievements.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mt-4">
              <details>
                <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">Faculty Out-Reach</summary>
                <div className="p-4">
                  <ul className="space-y-3 list-none">
                    <li className="text-center">
                      BOS Members Details -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse-csp/BOS%20Members.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Conference Chair Details -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse-csp/Conference%20Chairs.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                    <li className="text-center">
                      Resource/FDP delivered -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse-csp/Faculty%20Guest%20Lectures.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            {/* Dynamic Faculty Achievements from Database */}
            {departmentData?.facultyAchievements && departmentData.facultyAchievements.length > 0 && (
              <div className="mt-4">
                <details>
                  <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">
                    Recent Faculty Achievements (Database)
                  </summary>
                  <div className="p-4">
                    <div className="grid gap-4">
                      {departmentData.facultyAchievements.map((achievement, index) => (
                        <div key={achievement.id} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                          {achievement.description && (
                            <p className="text-gray-600 mt-2">{achievement.description}</p>
                          )}
                          {achievement.date && (
                            <p className="text-sm text-gray-500 mt-2">
                              Date: {new Date(achievement.date).toLocaleDateString('en-IN')}
                            </p>
                          )}
                          {achievement.category && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                              {achievement.category}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            )}
          </div>
        );


      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg" style={{ borderWidth: 2, marginTop: 80 }}>
            <h2 className="text-3xl font-bold text-[#850209] mb-6" style={{ marginTop: 20 }}>
              Board of Studies
            </h2>
            <div className="nav-content">
              <div className="flex justify-center items-center mb-8">
                <div className="overflow-x-auto w-full">
                  <table className="min-w-full bg-white border border-gray-200 table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">S.No</th>
                        <th className="py-3 px-4 border-b text-left">Name of the BOS Member</th>
                        <th className="py-3 px-4 border-b text-left">Designation</th>
                        <th className="py-3 px-4 border-b text-left">Organization</th>
                        <th className="py-3 px-4 border-b text-left">Position in JOB</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 border-b">1</td>
                        <td className="py-3 px-4 border-b">Dr. D Jaya Kumari</td>
                        <td className="py-3 px-4 border-b">Professor & HOD</td>
                        <td className="py-3 px-4 border-b">Dept of CSE, SVEC</td>
                        <td className="py-3 px-4 border-b">Chairperson</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">2</td>
                        <td className="py-3 px-4 border-b">Dr. A Krishna Mohan</td>
                        <td className="py-3 px-4 border-b">Professor of CSE</td>
                        <td className="py-3 px-4 border-b">JNTUK, Kakinada</td>
                        <td className="py-3 px-4 border-b">University Nominee</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">3</td>
                        <td className="py-3 px-4 border-b">Dr. R.B.V Subramaanyam</td>
                        <td className="py-3 px-4 border-b">Professor of CSE</td>
                        <td className="py-3 px-4 border-b">NITW</td>
                        <td className="py-3 px-4 border-b">Academic Expert</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">4</td>
                        <td className="py-3 px-4 border-b">Dr. S Pallam Setty</td>
                        <td className="py-3 px-4 border-b">Professor of CSE</td>
                        <td className="py-3 px-4 border-b">Andhra University</td>
                        <td className="py-3 px-4 border-b">Academic Expert</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">5</td>
                        <td className="py-3 px-4 border-b">Mr. SrinivasaRaju Vuppalapati</td>
                        <td className="py-3 px-4 border-b">Senior Consultant</td>
                        <td className="py-3 px-4 border-b">MSR IT Services LLP</td>
                        <td className="py-3 px-4 border-b">Industry Expert</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">6</td>
                        <td className="py-3 px-4 border-b">Mr. Eedala Rambabu</td>
                        <td className="py-3 px-4 border-b">Member of Technical Staff2</td>
                        <td className="py-3 px-4 border-b">Amadeus, Bangalore</td>
                        <td className="py-3 px-4 border-b">Alumni CSE Dept</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 border-b">7</td>
                        <td className="py-3 px-4 border-b" colSpan={2}>
                          All the Faculty Members in the CSE Dept.
                        </td>
                        <td className="py-3 px-4 border-b" colSpan={2}>Members in BOS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
          </div>
        );
      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Syllabus
            </h2>
            <div className="container">
              <div className="section mb-6">
                <details open>
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                    B.Tech (CSE & CST)
                  </summary>
                  <div className="nav-content pl-4 pt-3">
                    <ul className="my-2 space-y-3 list-none">
                      <li className="fdp-item">
                        B.Tech V23 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/V23%20Syllabus%20Book_CSE%20&%20CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        B.Tech V20 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/syllabus/B.Tech(CSE)%20and%20B.Tech(CST)-%20V20%20Regulation%20Syllabus.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        B.Tech V18 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/syllabus/B.Tech(CSE)%20and%20B.Tech(CST)-%20V18%20Regulation%20Syllabus.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        B.Tech R16 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/syllabus/cse-syllabus.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        B.Tech R13 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/syllabus/CSE-btech.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>

              <div className="section mb-6">
                <details>
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                    M.Tech (CSE)
                  </summary>
                  <div className="nav-content pl-4 pt-3">
                    <ul className="my-2 space-y-3 list-none">
                      <li className="fdp-item">
                        M.Tech V21 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/syllabus/pg/M.Tech(CS)%20V21%20Regulation%20Syllabus.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        M.Tech V18 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/syllabus/M.Tech(CSE)%20-%20V18%20Syllabus.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        M.Tech R16 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/syllabus/Computer%20Science%20&%20Engineering.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        M.Tech R13 Syllabus -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/syllabus/Computer%20Science%20&%20Engineering.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>

              <div className="section mb-6">
                <details>
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                    SOC Syllabus
                  </summary>
                  <div className="nav-content pl-4 pt-3">
                    <ul className="my-2 space-y-3 list-none">
                      <li className="fdp-item">
                        SOC Syllabus during the Academic Year 2024-25 -
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_guest%20lectures/SOC_CSE_2024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        SOC Syllabus during the Academic Year 2023-24 -
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/syllabus/SOC_CSE_2023-24.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        SOC Syllabus during the Academic Year 2022-23 -
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/syllabus/SOC_CSE_2022-23.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                      <li className="fdp-item">
                        SOC Syllabus during the Academic Year 2021-22 -
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/syllabus/SOC_CSE_2021-22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        );

      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Physical Facilities
            </h2>
            <div className="container">
              <details className="mb-6" open>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Class Rooms and Seminar Halls
                </summary>
                <div>
                  <ul className="my-4 space-y-3 list-none">
                    <h5 className="text-xl font-medium mb-3">Class Rooms</h5>
                    <li className="ml-2">
                      Class Rooms with ICT Enabled Facilities -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>

                    <h5 className="text-xl font-medium mt-6 mb-3">Class Time Tables</h5>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-I 2025-26 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Master Time Table_2025-26_ III, V, VII SEM _CSE.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-II 2024-25 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Master Time Table_2024-25_ IV, IV Sem.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-I 2024-25 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Master Timetable_A.Y for Sem-I 2024-25.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-II 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Master Time Table_2023-24_ IV, IV Sem.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-I 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Master Time Table_2023-24_ III, V, VII SEM _CSE.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-II 2022-23 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Master Time Table_A.Y 2022-23_ II SEM.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-I 2022-23 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Master Time Table_A.Y 2022-23_ I SEM.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-II 2021-22 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Master Time Table_2021-22_ II SEM.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                    <li className="ml-2">
                      Master Timetable A.Y for Sem-I 2021-22 -
                      <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Master Timetable_A.Y 2021-22.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="container">
              <details className="mb-6">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>Seminar Halls</summary>
                <div className="mt-4">
                  <ul className="my-2 space-y-3 list-none">
                    <li className="ml-2">
                      Seminar halls with ICT Enabled Facilities -
                      <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2">
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="container">
              <details className="mb-6">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Laboratories
                </summary>
                <div className="mt-4">
                  <p className="text-gray-700 mb-4">
                    The Department has well equipped labs with the latest Configuration. Total 9 Computer Labs for UG, PG and one research
                    lab consisting a total of 674 systems. The various servers in the server room include Oracle 11g Database Server, Intranet
                    Server (TOMCAT), NPTEL Video/Web Server, MAT Lab Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation Server, A-Mail
                    Server, ECAP Server, LMS Server.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The college has high speed internet connectivity throughout the campus through a leased line from BSNL with 1Gbps, 500Mbps from Blueifi.
                  </p>
                  <p className="text-gray-700 mb-5">The following Laboratories are available in the department:</p>

                  <div className="container">
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-semibold mb-4">JG Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "90px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border" rowSpan={3}>James Gosling Lab</td>
                              <td className="py-2 px-4 border">
                                Model : Hp Pro Tower 280 G9<br />
                                Processor : Intel® Core™ i5-13500 CPU @ 2.50 GHz<br />
                                16.00GB RAM, 500GB SSD<br />
                                System type : x64 – based Processor<br />
                                Monitor : 21.5" LED Monitor<br />
                                Keyboard : Multimedia Keyboard<br />
                                Mouse : Optical Scroll Mouse
                              </td>
                              <td className="py-2 px-4 border">72</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border">2</td>
                              <td className="py-2 px-4 border">
                                Model : ASUS VIVO AIO V222 GAR_V333GA<br />
                                Processor : Intel® Pentium®Silver J5040<br />
                                8.00 GB RAM, 256.00 GB SSD<br />
                                System type : x64 – based Processor<br />
                                Monitor : 21.5" TFT Monitor<br />
                                Keyboard : Multimedia Keyboard<br />
                                Mouse : Optical Mouse<br />
                              </td>
                              <td className="py-2 px-4 border">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">EF Codd Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "90px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border" rowSpan={2}>EF Codd Lab</td>
                              <td className="py-2 px-4 border">
                                Model : HP Pro Tower 280 G9<br />
                                Processor : Intel® Core™ i5-12400 CPU @ 2.50 GHz<br />
                                16.00 GB RAM, 500.00 GB SSD<br />
                                System type : x64 – based Processor<br />
                                Monitor : 19.5" LED Monitor<br />
                                Keyboard : Multimedia Keyboard<br />
                                Mouse : Optical Mouse<br />
                              </td>
                              <td className="py-2 px-4 border">68</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border">2</td>
                              <td className="py-2 px-4 border">
                                Model : Dell Optiplex 3020<br />
                                Processor : Intel® Core™ i3-9100 CPU @ 3.60 GHz<br />
                                8.00 GB RAM, 1.00 TB HDD<br />
                                System type : x64 – based Processor<br />
                                Monitor : 20.5" LED Monitor<br />
                                Keyboard : Multimedia Keyboard<br />
                                Mouse : Optical Mouse<br />
                              </td>
                              <td className="py-2 px-4 border">06</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">Linus Torvalds Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "90px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border" rowSpan={2}>Linus Torvalds Lab</td>
                              <td className="py-2 px-4 border">
                                Model : HP Pro Tower 280 G9 <br />
                                Processor : Intel core TM i3-10100 CPU@3.64 GHZ<br />
                                8.00 GB RAM, 500.00 GB SSD<br />
                                System type : x64 – based Processor<br />
                                Monitor: 19.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse<br />
                              </td>
                              <td className="py-2 px-4 border">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">PGCP Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "90px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border" rowSpan={2}>PGCP Lab</td>
                              <td className="py-2 px-4 border">
                                Model : Acer Vertion Desktop System<br />
                                Processor :Intel® Core™ 2 i3-8100 CPU @ 2.65 GHZ<br />
                                8.00 GB RAM, 1.00 TB HDD<br />
                                System type : x64 – based Processor<br />
                                Monitor : 21.5" LED Monitor<br />
                                Keyboard : Multimedia Keyboard<br />
                                Mouse : Optical Mouse
                              </td>
                              <td className="py-2 px-4 border">71</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border">2</td>
                              <td className="py-2 px-4 border">
                                Model : Acer Vertion Desktop System<br />
                                Processor :Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type : x64 – based Processor<br />
                                Monitor : 19.5" LED Monitor<br />
                                Keyboard : Multimedia Keyboard<br />
                                Mouse : Optical Mouse<br />
                              </td>
                              <td className="py-2 px-4 border">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">R&D Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "90px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border" rowSpan={2}>R&D Lab</td>
                              <td className="py-2 px-4 border">
                                Model : Acer Vertion Desktop System<br />
                                Processor :Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type : x64 – based Processor<br />
                                Monitor : 17.5" LED Monitor<br />
                                Keyboard : Multimedia Keyboard<br />
                                Mouse : Optical Mouse<br />
                              </td>
                              <td className="py-2 px-4 border">03</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-4 border">2</td>
                              <td className="py-2 px-4 border">
                                Model : Dell 7D49KQR<br />
                                Processor : Intel® Core™ 2 i5-7400 CPU @ 3.00 GHZ<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type : x64-based processor<br />
                                Monitor : 21.5" LED Monitor<br />
                                Keyboard : Multimedia keyboard<br />
                                Mouse : Optical Mouse<br />
                              </td>
                              <td className="py-2 px-4 border">07</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">Yellow Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "120px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">Usage</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border">Yellow Lab</td>
                              <td className="py-2 px-4 border">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5" TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-2 px-4 border">Placements and Training</td>
                              <td className="py-2 px-4 border">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">Pink Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "120px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">Usage</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border">Pink Lab</td>
                              <td className="py-2 px-4 border">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5" TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-2 px-4 border">Placements and Training</td>
                              <td className="py-2 px-4 border">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">Orange Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "120px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">Usage</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border">Orange Lab</td>
                              <td className="py-2 px-4 border">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5" TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-2 px-4 border">Placements and Training</td>
                              <td className="py-2 px-4 border">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">Green Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "120px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">Usage</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border">Green Lab</td>
                              <td className="py-2 px-4 border">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5" TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-2 px-4 border">Placements and Training</td>
                              <td className="py-2 px-4 border">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">Brown Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "120px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">Usage</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border">Brown Lab</td>
                              <td className="py-2 px-4 border">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5" TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-2 px-4 border">Placements and Training</td>
                              <td className="py-2 px-4 border">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">PG CP Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "90px" }}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{ minWidth: "300px" }}>Configuration</th>
                              <th className="py-2 px-4 border text-left">Usage</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border">PG CP Lab</td>
                              <td className="py-2 px-4 border">
                                Model: Acer Vertion I3 Desktop System<br />
                                Processor: Intel Core i3 -8100, 8th Gen<br />
                                8 GB DDR4 RAM, 1 TB Hard Disk Drive<br />
                                Monitor: 21.5" LED Monitor<br />
                                Keyboard: USB Keyboard<br />
                                Mouse: USB Optical Mouse
                              </td>
                              <td className="py-2 px-4 border">
                                AJWT, OOPS through <br />
                                C++ Lab
                              </td>
                              <td className="py-2 px-4 border">70</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-xl font-semibold mb-4">R&D Lab</h3>
                      <div className="overflow-x-auto w-full mb-8">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-2 px-4 border text-left">S.No</th>
                              <th className="py-2 px-4 border text-left">Name of the Lab</th>
                              <th className="py-2 px-4 border text-left">Location</th>
                              <th className="py-2 px-4 border text-left">Usage</th>
                              <th className="py-2 px-4 border text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 px-4 border">1</td>
                              <td className="py-2 px-4 border">R&D Lab</td>
                              <td className="py-2 px-4 border">B-Block, First Floor</td>
                              <td className="py-2 px-4 border">
                                To Carryout Research Activities by Students<br />
                                and Faculty Members
                              </td>
                              <td className="py-2 px-4 border">30</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-center mb-6">Lab Facilities Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/James Gosling Lab.jpg" alt="JG Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">James Gosling Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/E F Codd LAb.jpg" alt="EF Codd Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">EF Codd Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Linus Torvalds Lab.jpg" alt="Linus Torvalds Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Linus Torvalds Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/pgcplab.jpg" alt="PG CP Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">PG CP Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Sartaj Sahni Lab.jpg" alt="R & D Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">R & D Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Yellow Lab.jpg" alt="Yellow Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Yellow Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Pink Lab.jpg" alt="Pink Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Pink Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Orange Lab.jpg" alt="Orange Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Orange Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Green Lab.jpg" alt="Green Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Green Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Brown Lab.jpg" alt="Brown Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: "16/9" }} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Brown Lab</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );

      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              MoUs
            </h2>

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
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">Roland Institute of Technology,Berhampur</td>
                    <td className="py-3 px-4 border-b">10-05-2025</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Mou Roland Principal sir sign.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">Pennant Technologies Pvt Ltd</td>
                    <td className="py-3 px-4 border-b">06-11-2024</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/MOU with Pennant Technologies Pvt Ltd.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">3</td>
                    <td className="py-3 px-4 border-b">Blumin Software & Training Consultancy LLP</td>
                    <td className="py-3 px-4 border-b">18-06-2024</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Blumin MOU.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">4</td>
                    <td className="py-3 px-4 border-b">Zscaler Academic Alliance Program</td>
                    <td className="py-3 px-4 border-b">08-12-2023</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/ZScalar_MOU.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">5</td>
                    <td className="py-3 px-4 border-b">New Leaf Learning Solutions</td>
                    <td className="py-3 px-4 border-b">01-10-2023</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/SVEC- New Leaf 1-10-2023.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">6</td>
                    <td className="py-3 px-4 border-b">NIT AP</td>
                    <td className="py-3 px-4 border-b">31-12-2022</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/1 NITAP_MOU with activities.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">7</td>
                    <td className="py-3 px-4 border-b">Alteryx SparkED Partner</td>
                    <td className="py-3 px-4 border-b">30-12-2022</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/578_Alteryx SparkEd Partner_Sri Vasavi Engineering College.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">8</td>
                    <td className="py-3 px-4 border-b">Juniper Networks</td>
                    <td className="py-3 px-4 border-b">30-11-2022</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Juniper MOU.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">9</td>
                    <td className="py-3 px-4 border-b">Celonis Academic Alliance</td>
                    <td className="py-3 px-4 border-b">11-11-2022</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Celonis.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">10</td>
                    <td className="py-3 px-4 border-b">Palo Alto Networks Cyber Security Academy</td>
                    <td className="py-3 px-4 border-b">08-11-2022</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Paaloalto.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">11</td>
                    <td className="py-3 px-4 border-b">Blue Prism Academia Program</td>
                    <td className="py-3 px-4 border-b">01-11-2022</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Sri Vasavi Engineering College.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">12</td>
                    <td className="py-3 px-4 border-b">Eduskills</td>
                    <td className="py-3 px-4 border-b">31-10-2022</td>
                    <td className="py-3 px-4 border-b">Till Date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Eduskills MOU with PICS.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">13</td>
                    <td className="py-3 px-4 border-b">Hexaware</td>
                    <td className="py-3 px-4 border-b">25-04-2020</td>
                    <td className="py-3 px-4 border-b">Till date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Hexaware MOU_PICS.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">14</td>
                    <td className="py-3 px-4 border-b">APSSDC</td>
                    <td className="py-3 px-4 border-b">29-03-2019</td>
                    <td className="py-3 px-4 border-b">Till date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/1 APSSDC MOU.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">15</td>
                    <td className="py-3 px-4 border-b">Alykas Innovations Pvt.Ltd</td>
                    <td className="py-3 px-4 border-b">30-01-2018</td>
                    <td className="py-3 px-4 border-b">Till date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/Alykas.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">16</td>
                    <td className="py-3 px-4 border-b">TCS iON</td>
                    <td className="py-3 px-4 border-b">25-04-2012</td>
                    <td className="py-3 px-4 border-b">Till date</td>
                    <td className="py-3 px-4 border-b">
                      <a
                        className="text-[#850209] hover:underline"
                        href="https://srivasaviengg.ac.in/uploads/csemous/6 TCS-ion MOU.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-[#850209] mb-4">B. Interaction with the Industry</h3>
            <div className="flex justify-center mb-6">
              <ul className="space-y-4 list-none max-w-3xl">
                <li className="py-2">
                  Various Programs organized during Academic Year 2024-25 -
                  <a
                    href="https://www.srivasaviengg.ac.in/uploads/csemous/Industry data ( 2024-2025).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2023-24 -
                  <a
                    href="https://www.srivasaviengg.ac.in/uploads/csemous/Industry%20data%20%202023-24.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2022-23 -
                  <a
                    href="https://www.srivasaviengg.ac.in/uploads/csemous/Industry%20data%20%202022-23.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2021-22 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2021-2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2020-21 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2020-2021.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2019-20 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2019-2020.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2018-19 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2018-2019.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2017-18 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2017-2018.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2016-17 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2016-2017.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2015-16 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2015-2016.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View
                  </a>
                </li>
                <li className="py-2">
                  Various Programs organized during Academic Year 2014-15 -
                  <a
                    href="https://srivasaviengg.ac.in/uploads/csemous/csemous_2014-2015.pdf"
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
        );

      case 'Hackathons':
        console.log("Rendering Hackathons section from main switch");
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Hackathons
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A 24-hour student hackathon is an event where students come
              together to collaborate, innovate, and create projects within a
              short time frame. These hackathons have gained immense popularity
              in recent years, and they hold significant importance for students
              for several reasons:
            </p>
            <ul className="my-4 space-y-3 list-disc list-inside">
              <li className="text-gray-700">
                <span className="font-medium">Hands-on learning:</span> Hackathons provide students with a unique
                opportunity to engage in hands-on learning. They encourage
                participants to apply their knowledge and skills to real-world
                problems and challenges. It allows students to go beyond
                theoretical knowledge and gain practical experience by working
                on a project from start to finish within a limited time.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Collaboration and teamwork:</span> Hackathons foster collaboration and
                teamwork among students. Participants usually form teams,
                bringing together individuals with diverse backgrounds and
                expertise. Working together, they learn to communicate
                effectively, leverage each other's strengths, and tackle complex
                problems collectively. The experience of collaborating with
                peers from different disciplines helps develop essential
                teamwork and interpersonal skills.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Innovation and creativity:</span> The time constraint of a 24-hour
                hackathon encourages participants to think innovatively and
                creatively. Students are often required to come up with novel
                solutions to problems or create something entirely new within a
                limited timeframe. This pressure fuels innovation and pushes
                participants to explore unconventional ideas, leading to the
                development of unique projects.
              </li>
            </ul>

            {/* Hackathons Conducted Table */}
            <h3 className="text-2xl font-semibold text-[#850209] mb-4 text-center">Hackathons Conducted</h3>
            <div className="flex justify-center mb-8">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-[#850209] text-white">
                    <tr>
                      <th className="py-3 px-4 border-b">Academic Year</th>
                      <th className="py-3 px-4 border-b">For Brochure</th>
                      <th className="py-3 px-4 border-b">For Winners List</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2024-25</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/cse_extra_activities/PHOTO-2024-03-15-09-56-53.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/cse_extra_activities/HackOverflow%202K24Winners%20List-CSE%20DEPT-16.03.2024.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2023-24</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/cse_extra_activities/unnamed.png"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners%20List.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Workshops':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h3
              className="text-center text-3xl font-bold mb-6"
              style={{ color: '#850209' }}
            >
              Workshops/SOC/Seminars/<br />Guest Lectures
            </h3>
            <div className="pt-3">
              <details open>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Workshops/SOC</summary>
                <div className="px-3">
                  <ol className="list-decimal mt-5 ml-5 space-y-2">
                    <li>
                      Workshops/SOC organized during the Academic Year 2023-24 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/cse_guest%20lectures/Workshop%20Data_CSE_2023-24.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops/SOC organized during the Academic Year 2022-23 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2022-23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops/SOC organized during the Academic Year 2021-22 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2021-22.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2020-21 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2020-21.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2019-20 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2019-20.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2018-19 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2018-19.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2017-18 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2017-18.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2016-17 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2016-17.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2015-16 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2015-16.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2014-15 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2014-15.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2012-13 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/ws-2012-13.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                  </ol>
                </div>
              </details>
            </div>

            <div className="mt-4">
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Guest Lecturers/Seminars</summary>
                <div className="px-3">
                  <ol className="list-decimal mt-5 ml-5 space-y-2">
                    <li>
                      Guest Lectures Organized during the Academic Year 2024-25 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/cse_guest%20lectures/Guest Lectures Data_CSE_2024-25.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2023-24 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/cse_guest%20lectures/Guest%20Lectures%20Data_CSE_2023-24.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2022-23 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gll-2022-23.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2021-22 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gll-2021-22.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2019-20 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gll-2019-20.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2018-19 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gll-2018-19.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2017-18 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gll-2017-18.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2016-17 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gl-2016-17.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2015-16 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gl-2015-16.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2014-15 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gl-2014-15.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2013-14 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gl-2013-14.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2012-13 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/cse_guest%20lectures/gl-2012-13.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >View More</a>
                    </li>
                  </ol>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mt-6 mb-4">Guest Lectures/Seminars Gallery pics</h3>

                  <div className="container mx-auto">
                    <div className="flex flex-wrap justify-center items-center">
                      <div className="w-full lg:w-5/12 m-3">
                        <img
                          src="http://srivasaviengg.ac.in/images/departments/cse/GL-PIC 1.jpg"
                          alt="Guest Lecture Image 1"
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          style={{ aspectRatio: "16/9" }}
                        />
                      </div>
                      <div className="w-full lg:w-5/12 m-3">
                        <img
                          src="http://srivasaviengg.ac.in/images/departments/cse/GL-PIC 2.jpg"
                          alt="Guest Lecture Image 2"
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          style={{ aspectRatio: "16/9" }}
                        />
                      </div>
                      <div className="w-full lg:w-5/12 m-3">
                        <img
                          src="http://srivasaviengg.ac.in/images/departments/cse/GL-PIC 3.jpg"
                          alt="Guest Lecture Image 3"
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          style={{ aspectRatio: "16/9" }}
                        />
                      </div>
                      <div className="w-full lg:w-5/12 m-3">
                        <img
                          src="http://srivasaviengg.ac.in/images/departments/cse/GL-PIC 4.jpg"
                          alt="Guest Lecture Image 4"
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          style={{ aspectRatio: "16/9" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );

      case 'Training Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h3
              className="text-center text-3xl font-bold mb-6"
              style={{ color: '#850209' }}
            >
              Training Activities
            </h3>

            <div className="pt-3">
              <details open>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Training Activities during the Academic Year 2023-2024
                </summary>
                <ul className="my-2 ml-5">
                  <li>
                    Training Activities during the Academic Year 2023-2024 -
                    <a
                      href="https://www.srivasaviengg.ac.in/uploads/cse_placements/tt_2023-24.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </li>
                </ul>
              </details>
              <br />
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Training Activities during the Academic Year 2022-2023
                </summary>
                <ul className="my-2 ml-5">
                  <li>
                    Training Activities during the Academic Year 2022-2023 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/tt_2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </li>
                </ul>
              </details>
              <br />
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Training Activities during the Academic Year 2021-2022
                </summary>
                <ul className="my-2 ml-5">
                  <li>
                    Training Activities during the Academic Year 2021-2022 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/tt_2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </li>
                </ul>
              </details>
              <br />
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Training Activities during the Academic Year 2020-2021
                </summary>
                <ul className="my-2 ml-5">
                  <li>
                    Training Activities during the Academic Year 2020-2021 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/tt_2020-21.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </li>
                </ul>
              </details>
              <br />
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Training Activities during the Academic Year 2019-2020
                </summary>
                <ul className="my-2 ml-5">
                  <li>
                    Training Activities during the Academic Year 2019-2020 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/tt_2019-20.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </li>
                </ul>
              </details>
              <br />
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Training Activities during the Academic Year 2018-2019
                </summary>
                <ul className="my-2 ml-5">
                  <li>
                    Training Activities during the Academic Year 2018-2019 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/tt_2018-19.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </li>
                </ul>
              </details>
            </div>

            <div className="mt-8 border-t-2 pt-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Gallery</h3>
              <div className="container mx-auto">
                <div className="flex flex-wrap justify-center items-center">
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/g.jpg"
                      alt="Training Activity Image 1"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/g1.jpg"
                      alt="Training Activity Image 2"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/g2.jpg"
                      alt="Training Activity Image 3"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/g3.jpg"
                      alt="Training Activity Image 4"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      style={{ aspectRatio: "16/9" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h3
              className="text-center text-3xl font-bold mb-6"
              style={{ color: '#850209' }}
            >
              Placements
            </h3>

            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2021-25
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2021-25 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/2024-25 CSE PLACEMENTSS.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2020-24
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2020-24 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/2020-24 CSE PLACEMENTS.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2019-23
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2019-23 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/2019-23%20CSE%20PLACEMENTS%20DATA.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2018-22
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2018-22 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/2018-22%20CSE%20PLACEMENTS%20DATA.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2017-21
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2017-21 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/2017-21%20Batch%20CSE%20PLACEMENTS.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2016-20
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2016-20 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/2016-20%20Batch%20%20CSE%20PLACEMENTS.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2015-19
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2015-19 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/cse_2018-19.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2014-18
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2014-18 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/cse_2017-18.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Placements for Batch 2013-17
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2013-17 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/cse_2016-17.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>    Placements for Batch 2012-16
                </summary>
                <div className="ml-5 my-3">
                  <p>
                    Placements for Batch 2012-16 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/cse_2015-16.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>

              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>    Placements for Batch 2011-15
                </summary>
                <div className="ml-5 my-5">
                  <p>
                    Placements for Batch 2011-15 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_placements/cse_2014-15.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View More</a>
                  </p>
                </div>
              </details>
            </div>

            <div className="mt-8 border-t-2 pt-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Gallery</h3>
              <div>
                <h4 className="text-center text-primary mt-6 text-xl font-semibold">2021-24</h4>
                <div className="container mx-auto">
                  <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/placement/WhatsApp Image 2025-07-16 at 11.02.00 AM (1).jpeg"
                        alt="Placement Image"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/placement/WhatsApp Image 2025-07-16 at 11.02.00 AM.jpeg"
                        alt="Placement Image"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/placement/WhatsApp Image 2025-07-16 at 11.01.59 AM (1).jpeg"
                        alt="Placement Image"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/placement/WhatsApp Image 2025-07-16 at 11.01.58 AM.jpeg"
                        alt="Placement Image"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/placement/WhatsApp Image 2025-07-16 at 11.01.57 AM.jpeg"
                        alt="Placement Image"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/placement/WhatsApp Image 2025-07-16 at 11.02.02 AM.jpeg"
                        alt="Placement Image"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/placement/WhatsApp Image 2025-07-16 at 11.02.03 AM.jpeg"
                        alt="Placement Image"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/placement/WhatsApp Image 2025-07-16 at 11.02.04 AM.jpeg"
                        alt="Placement Image"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-center text-primary mt-10 text-xl font-semibold">2018-22</h4>
                <div className="container mx-auto">
                  <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/departments/cse/place9.jpeg"
                        alt="Student Placement"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <h4 className="text-center my-3 text-green-600 font-medium">
                        Roll No: 18A81A05K9c <br />
                        Name: K. Dhana Lakshmi<br />
                        Company: Amazon<br />
                        Package: 44LPA
                      </h4>
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/departments/cse/place.jpeg"
                        alt="Student Placement"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <h4 className="text-center my-3 text-green-600 font-medium">
                        Roll No: 18A81A05C8 <br />
                        Name: B. Sowmya <br />
                        Company: Wells Fargo <br />
                        Package: 20LPA
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-center text-primary mt-10 text-xl font-semibold">2017-21</h4>
                <div className="container mx-auto">
                  <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/departments/cse/place1.jpg"
                        alt="Student Placement"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <h4 className="text-center my-3 text-green-600 font-medium">
                        Roll No: 17A81A05G7 <br />
                        Name: Y.S.G.S.S Bhavani <br />
                        Company: SERVICE NOW <br />
                        Package: 25.22LPA
                      </h4>
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/departments/cse/place2.jpg"
                        alt="Student Placement"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <h4 className="text-center my-3 text-green-600 font-medium">
                        Roll No: 16A81A05N5 <br />
                        Name: N. Sri Lalitha <br />
                        Company: VMWARE <br />
                        Package: 20LPA
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-center text-primary mt-10 text-xl font-semibold">2016-20</h4>
                <div className="container mx-auto">
                  <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/departments/cse/place3.png"
                        alt="Student Placement"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <h4 className="text-center my-3 text-green-600 font-medium">
                        Roll No: 16A81A0588 <br />
                        Name: G. Navya <br />
                        Company: SERVICE NOW <br />
                        Package: 26LPA
                      </h4>
                    </div>
                    <div className="w-full lg:w-5/12 m-3">
                      <img
                        src="http://srivasaviengg.ac.in/images/departments/cse/place6.jpeg"
                        alt="Student Placement"
                        className="w-full h-auto rounded-lg shadow-md"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <h4 className="text-center my-3 text-green-600 font-medium">
                        Roll No: 16A81A05N5 <br />
                        Name: V. Maha Lakshmi <br />
                        Company: AMAZON <br />
                        Package: 17LPA
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Placements from Database */}
              {placementsData.length > 0 && (
                <div className="mt-8">
                  <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                    <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                      Recent Placements (Database)
                    </summary>
                    <div className="overflow-x-auto mt-4">
                      <table className="min-w-full bg-white border-collapse">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">S.No</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">Student Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">Company</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">Package (LPA)</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50">Academic Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {placementsData.map((placement, index) => (
                            <tr key={placement.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 border-b">{index + 1}</td>
                              <td className="py-3 px-4 border-b font-medium">{placement.student_name}</td>
                              <td className="py-3 px-4 border-b">{placement.company_name}</td>
                              <td className="py-3 px-4 border-b">
                                {placement.package ? `${placement.package} LPA` : 'Not disclosed'}
                              </td>
                              <td className="py-3 px-4 border-b">{placement.academic_year}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        );

      // ...existing code...
case 'Handbooks':
 

  // Group by academic_year and semester
  const grouped = handbooks.reduce((acc, hb) => {
    const key = `${hb.academic_year}: ${hb.semester} Sem Handbooks`;
    acc[key] = acc[key] || [];
    acc[key].push(hb);
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
        Academic HandBooks
      </h2>
      <div className="space-y-4">
        {Object.entries(grouped).map(([group, items]) => (
          <details key={group} className="bg-white border rounded-lg overflow-hidden">
            <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
              {group}
            </summary>
            <div className="px-4 py-3">
              <ul className="list-disc pl-6 space-y-2">
                {items.map((hb, idx) => (
                  <li key={idx}>
                    {hb.title} -
                    <a
                      href={hb.file_url}
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
          </details>
        ))}
      </div>
    </div>
  );
// ...existing code...


      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6" style={{ color: '#850209' }}>
              Technical Association
            </h2>
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Department Association - Society of Computers for Ultimate
                Diligence (SCUD) was started in the year 2002. SCUD team conducts
                regularly technical fests, workshops, and guest lectures for the
                benefit of students.
              </p>

              <h3 className="text-2xl font-semibold text-[#850209] mb-4">Faculty Co-Ordinators</h3>
              <div className="mb-6 text-center">
                <p className="text-lg mb-2">1. Mrs. N. Hiranmayee, Sr. Assistant Professor</p>
                <p className="text-lg">2. Mr. P. Ramamohan Rao, Assistant Professor</p>
              </div>

              <div className="space-y-2">
                <details open className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2024-25
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2024-25 -
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/Department Association Events Summary2024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2023-24
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2023-24 -
                        <a
                          href="https://www.srivasaviengg.ac.in/uploads/SCUD%20summary_23-24.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2022-23
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2022-23 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/uploadsSCUD%20summary_22-23.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2021-22
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2021-22 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/SCUD%20summary_%2021-22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2019-20
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2019-20 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/SCUD%20Activities%20during%20the%20year%202019-20.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2018-19
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2018-19 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/SCUD2018-2019.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2017-18
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2017-18 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/SCUD2017-2018.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2016-17
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2016-17 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/SCUD2016-2017.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2015-16
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2015-16 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/SCUD2015-2016.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2014-15
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2014-15 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/SCUD2014-2015.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                    SCUD Activities during 2013-14
                  </summary>
                  <div className="px-4 py-3">
                    <ul className="list-disc pl-6">
                      <li className="mb-2">
                        SCUD Activities during the year 2013-14 -
                        <a
                          href="http://srivasaviengg.ac.in/uploads/SCUD2013-2014.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline ml-2"
                        >View More</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="mt-12 border-t-2 pt-8">
              <h3 className="text-2xl font-semibold text-center mb-8 text-[#850209]">Technical Association Gallery</h3>

              <div className="mb-12">
                <h4 className="text-xl font-medium text-center mb-6 text-primary">TECHFEST 2K23</h4>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="w-full md:w-5/12 rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/t.jpeg"
                      alt="TECHFEST 2K23 Image 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/t1.jpeg"
                      alt="TECHFEST 2K23 Image 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-xl font-medium text-center mb-6 text-primary">HACKOVERFLOW 2K23</h4>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="w-full md:w-5/12 rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/t.jpeg"
                      alt="HACKOVERFLOW 2K23 Image 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/t1.jpeg"
                      alt="HACKOVERFLOW 2K23 Image 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-xl font-medium text-center mb-6 text-primary">FRESHER'S 2K22</h4>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/f.jpeg"
                      alt="FRESHER'S 2K22 Image 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/f1.jpeg"
                      alt="FRESHER'S 2K22 Image 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/f2.jpeg"
                      alt="FRESHER'S 2K22 Image 3"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/f3.jpeg"
                      alt="FRESHER'S 2K22 Image 4"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-xl font-medium text-center mb-6 text-primary">ENGINEER'S DAY 2K22</h4>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="w-full md:w-5/12 rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/ed.jpeg"
                      alt="ENGINEER'S DAY 2K22 Image 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/ed1.jpeg"
                      alt="ENGINEER'S DAY 2K22 Image 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-xl font-medium text-center mb-6 text-primary">FAREWELL 2K22</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/farewell_2k22_1.jpeg"
                      alt="FAREWELL 2K22 Image 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/farewell_2k22_2.jpeg"
                      alt="FAREWELL 2K22 Image 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/farewell_2k22_3.jpeg"
                      alt="FAREWELL 2K22 Image 3"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/farewell_2k22_4.jpeg"
                      alt="FAREWELL 2K22 Image 4"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/farewell_2k22_5.jpeg"
                      alt="FAREWELL 2K22 Image 5"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/farewell_2k22_6.jpeg"
                      alt="FAREWELL 2K22 Image 6"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-xl font-medium text-center mb-6 text-primary">HACKOVERFLOW 2K22</h4>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="w-full md:w-5/12 rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/h.jpeg"
                      alt="HACKOVERFLOW 2K22 Image 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/h1.jpeg"
                      alt="HACKOVERFLOW 2K22 Image 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-medium text-center mb-6 text-primary">SCUD VERVE 2K22</h4>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/scud1.jpeg"
                      alt="SCUD VERVE 2K22 Image 1"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/scud2.jpeg"
                      alt="SCUD VERVE 2K22 Image 2"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/scud3.jpeg"
                      alt="SCUD VERVE 2K22 Image 3"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="w-full md:w-5/12 lg:w-3/12 rounded-lg overflow-hidden shadow-md mb-6">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/scud4.jpeg"
                      alt="SCUD VERVE 2K22 Image 4"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Newsletters
            </h2>
            <div className="space-y-6">
              <details open className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 14 Issue 2 2023
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 14 Issue 2 2023 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Newsletter Volume1 4_Issue_2_2023.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 14 Issue 1 2023
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 14 Issue 1 2023 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Newsletter Volume1 4_Issue_1_2023.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 13 Issue 3 2023
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 13 Issue 3 2023 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Newsletter%20Volume%2013%20Issue%203%202022.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 13 Issue 2 2022
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 13 Issue 2 2022 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Newsletter%20Volume%2013%20Issue%202%202022.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 13 Issue 1 2022
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 13 Issue 1 2022 -
                      <a
                        href="https://www.srivasaviengg.ac.in/uploads/Newsletter%20Volume%2013%20Issue%201%202022.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 12 Issue 4 2022
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 12 Issue 4 2022 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue%204%202022.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 12 Issue 3 2022
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 12 Issue 3 2022 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue3%202022.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 12 Issue 2 2021
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 12 Issue 2 2021 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue2%202021.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 12 Issue 1 2021
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 12 Issue 1 2021 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue1%202021.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 11 Issue 4 2021
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 11 Issue 4 2021 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue4%202021.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 11 Issue 3 2021
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 11 Issue 3 2021 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue3%202021.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 11 Issue 2 2020
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 11 Issue 2 2020 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue2%202020.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 11 Issue 1 2020
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 11 Issue 1 2020 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue1%202020.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 10 Issue 4 2020
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 10 Issue 4 2020 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_4_%202020.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 10 Issue 3 2020
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 10 Issue 3 2020 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_3_%202019.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 10 Issue 2 2019
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 10 Issue 2 2019 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_2_%202019.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 10 Issue 1 2019
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 10 Issue 1 2019 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010%20_Issue_1_%202019.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 9 Issue 4 2019
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 9 Issue 4 2019 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/vol%209%20issue%204.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 9 Issue 3 2019
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 9 Issue 3 2019 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/vol%209%20issue%203.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 9 Issue 2 2018
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 9 Issue 2 2018 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/vol%209%20issue%202.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 9 Issue 1 2018
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 9 Issue 1 2018 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/vol%209%20issue%201.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 8 Issue 4(b) 2018
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 8 Issue 4(b) 2018 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/vol%208%20issue%204(b).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 8 Issue 4(a) 2018
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 8 Issue 4(a) 2018 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/vol%208%20issue%204(a).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 8 Issue 3 2017
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 8 Issue 3 2017 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/oct-17(1).pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 8 Issue 2 2017
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 8 Issue 2 2017 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/july-2017.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 8 Issue 1 2017
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 8 Issue 1 2017 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/april.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 7 Issue 4 2017
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 7 Issue 4 2017 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/Jan-17.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 7 Issue 3 2016
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 7 Issue 3 2016 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/oct-16.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary>Newsletter Volume 7 Issue 2 2016</summary>
                <li className="p-3">
                  Newsletter Volume 7 Issue 2 2016 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/Jul-16.pdf"
                    target="_blank"
// ...existing code...
                  >View</a
                  >
                </li>
              </details>
              <details>
                <summary>Newsletter Volume 7 Issue 1 2016</summary>
                <li className="p-3">
                  Newsletter Volume 7 Issue 1 2016 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/Apr-16.pdf"
                    target="_blank"
                    id="pdfDOWNLOADER11"
                  >View</a
                  >
                </li>
              </details>
              <details>
                <summary>Newsletter Volume 6 Issue 4 2016</summary>
                <li className="p-3">
                  Newsletter Volume 6 Issue 4 2016 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/csenl_Jan-16.pdf"
                    target="_blank"
                    id="pdfDOWNLOADER11"
                  >View</a
                  >
                </li>
              </details>
              <details>
                <summary>Newsletter Volume 6 Issue 3 2015</summary>
                <li className="p-3">
                  Newsletter Volume 6 Issue 3 2015 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/csenl_Oct-15.pdf"
                    target="_blank"
                    id="pdfDOWNLOADER11"
                  >View</a
                  >
                </li>
              </details>
              <details>
                <summary>Newsletter Volume 6 Issue 2 2015</summary>
                <li className="p-3">
                  Newsletter Volume 6 Issue 2 2015 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/csenl_Jul-15.pdf"
                    target="_blank"
                    id="pdfDOWNLOADER11"
                  >View</a
                  >
                </li>
              </details>
              <details>
                <summary>Newsletter Volume 6 Issue 1 2015</summary>
                <li className="p-3">
                  Newsletter Volume 6 Issue 1 2015 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/csenl_Apr-15.pdf"
                    target="_blank"
                    id="pdfDOWNLOADER11"
                  >View</a
                  >
                </li>
              </details>
              <details>
                <summary>Newsletter Volume 5 Issue 4 2015</summary>
                <li className="p-3">
                  Newsletter Volume 5 Issue 4 2015 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/acsenl_Jan-15.pdf"
                    target="_blank"
                    id="pdfDOWNLOADER11"
                  >View</a
                  >
                </li>
              </details>
              <details>
                <summary>Newsletter Volume 5 Issue 3 2014</summary>
                <li className="p-3">
                  Newsletter Volume 5 Issue 3 2014 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/acsenl_Oct-14.pdf"
                    target="_blank"
                    id="pdfDOWNLOADER11"
                  >View</a
                  >
                </li>
              </details>
              <details>
                <summary>Newsletter Volume 5 Issue 2 2014</summary>
                <li className="p-3">
                  Newsletter Volume 5 Issue 2 2014 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/acsenl_Jul-14.pdf"
                    target="_blank"
                    id="pdfDOWNLOADER11"
                  >View</a
                  >
                </li>
              </details>
              <details className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 text-lg font-semibold text-[#850209]">
                  Newsletter Volume 5 Issue 1 2014
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="p-3">
                      Newsletter Volume 5 Issue 1 2014 -
                      <a
                        href="http://srivasaviengg.ac.in/uploads/acsenl_Apr14.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );

      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Extra-Curricular Activities
            </h2>

            {/* Links to yearly activities */}
            <div className="mb-8">
              <ul className="space-y-4 list-none">
                <li className="text-center">
                  Extracurricular activities during the Year 2023-24 -
                  <a
                    href="https://www.srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202023-24%20-%20CSE.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View More
                  </a>
                </li>
                <li className="text-center">
                  Extracurricular activities during the Year 2022-23 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202022-23.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View More
                  </a>
                </li>
                <li className="text-center">
                  Extracurricular activities during the Year 2021-22 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202021-2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View More
                  </a>
                </li>
                <li className="text-center">
                  Extracurricular activities during the Year 2019-20 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202019-2020.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View More
                  </a>
                </li>
                <li className="text-center">
                  Extracurricular activities during the Year 2018-19 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202018-2019.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View More
                  </a>
                </li>
                <li className="text-center">
                  Extracurricular activities during the Year 2017-18 -
                  <a
                    href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202017-2018.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] hover:underline ml-2"
                  >
                    View More
                  </a>
                </li>
              </ul>
            </div>

            {/* Sahaya Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-[#850209] mb-4 text-center">Sahaya</h3>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-[#850209] mb-4">Social Services</h4>
                <p className="text-gray-700 mb-4 text-justify">
                  We come across many heart-rending incidents and pathetic conditions of people in the society every day. We may not be
                  in a position to give an immediate reaction though we want to. But the Computer Science and Engineering Students of Sri
                  Vasavi Engineering College extended their hands to help the needy. These helping activities are going on under the name of
                  "SAHAYA" with the slogan 'The Helping Hands,' which aptly suits its purpose.
                </p>
                <p className="text-gray-700 mb-4 text-justify">
                  SAHAYA is not a one-man army; rather, it is the brainchild of '07 batch students and is being carried on by the subsequent
                  batch students, which sounds the real meaning of teamwork. SAHAYA, from its first day, was engaged in performing its
                  activities. It was started with the event "CHEYUTHA" in the memory of SVEC Academic Director LATE Dr. B. Janardhan Reddy
                  at ZP High school, Pedatadepalli by providing the fee for needy students and their necessities for study like compass
                  boxes, books, etc., and thereafter, the journey of helping the needy continued uninterruptedly till date.
                </p>
                <p className="text-gray-700 mb-4 text-justify">
                  Students may have many thoughts in mind, but the seeds of thought have sprouted to grow with great confidence by the
                  magnanimous support of the Management. The Management of Sri Vasavi Engineering College always infuses confidence in the
                  students by extending their heartfelt cooperation. "SAHAYA" is aptly serving its motto and contributing its little part to
                  society. A drop may be small, but many drops together form an ocean. So, one hand may seem weak, but joining the hands
                  together makes many changes to step into a brighter world.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-[#850209] mb-2">Faculty Coordinator:</h4>
                <p className="font-semibold">
                  Mr. P. Ramamohan Rao<br />
                  Assistant Professor
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-[#850209] mb-4 text-center">LIST OF SAHAYA EVENTS CONDUCTED YEAR WISE</h4>
                <ul className="space-y-3 text-center list-none">
                  <li>
                    2023-2024 -
                    <a
                      href="https://www.srivasaviengg.ac.in/uploads/Sahaya_2023-24.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2022-2023 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/Sahaya_2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2021-2022 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/Sahaya_2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2020-2021 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/Sahaya_2020-21.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2019-2020 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/Sahaya_2019-20.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2018-2019 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/Sahaya_2018-19.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2017-2018 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/sahaya2017-18.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2016-2017 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/sahaya2016-17.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2015-2016 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/sahaya2015-16.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2014-2015 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/sahaya2014-15.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2013-2014 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/sahaya2013-14.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                  <li>
                    2012-2013 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/sahaya2012-13.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >
                      For more details
                    </a>
                  </li>
                </ul>
              </div>

              {/* Gallery Section */}
              <div className="mt-12 border-t pt-8">
                <h4 className="text-xl font-semibold text-[#850209] mb-6 text-center">Gallery</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg shadow-md overflow-hidden">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/ec.jpeg"
                      alt="Extracurricular Activity"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg shadow-md overflow-hidden">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/ec1.jpg"
                      alt="Extracurricular Activity"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg shadow-md overflow-hidden">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/ec2.jpeg"
                      alt="Extracurricular Activity"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg shadow-md overflow-hidden">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/e3.jpeg"
                      alt="Extracurricular Activity"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg shadow-md overflow-hidden">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/e4.jpg"
                      alt="Extracurricular Activity"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg shadow-md overflow-hidden">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/e5.jpg"
                      alt="Extracurricular Activity"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h3
              className="text-center text-3xl font-bold mb-6"
              style={{ color: '#850209' }}
            >
              Merit Scholarships and Academic Toppers
            </h3>

            <h4 className="text-center text-xl font-semibold mt-8 mb-4">Merit Scholarships</h4>
            <div className="pt-3">
              <details open>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Merit Scholarships during the A.Y 2018-19
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Merit Scholarships during the A.Y 2018-19 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Merit%20Scholarships-2018.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Merit Scholarships during the A.Y 2017-18
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Merit Scholarships during the A.Y 2017-18 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Merit%20Scholarships-2017.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{ backgroundColor: 'rgba(136,25,25,1)' }}>
                  Merit Scholarships during the A.Y 2016-17
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Merit Scholarships during the A.Y 2016-17 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Merit%20Scholarships-2016.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Merit Scholarships during the A.Y 2015-16
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Merit Scholarships during the A.Y 2015-16 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Merit%20Scholarships-2015.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Merit Scholarships during the A.Y 2014-15
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Merit Scholarships during the A.Y 2014-15 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Merit%20Scholarships-2014.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Merit Scholarships during the A.Y 2013-14
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Merit Scholarships during the A.Y 2013-14 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Merit%20Scholarships-2013.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>
            </div>

            <h4 className="text-center text-xl font-semibold mt-10 mb-4">Academic Toppers</h4>
            <div className="pt-3">
              <details open>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Academic Toppers during the A.Y 2024-25
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Academic Toppers during the A.Y 2024-25 -
                    <a
                      href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Merit%20Scholarships-2018.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Academic Toppers during the A.Y 2023-24
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Academic Toppers during the A.Y 2023-24 -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/2023-24_CSE.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Academic Toppers during the A.Y 2022-23
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Academic Toppers during the A.Y 2022-23 -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/2022-23_CSE.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Academic Toppers during the A.Y 2020-21 & 2021-22
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Academic Toppers during the A.Y 2020-21 & 2021-22 -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/2021-2022%20&%202020-2021_CSE.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Academic Toppers during the A.Y 2019-20
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Academic Toppers during the A.Y 2019-20 -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/2019-2020_CSE.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Academic Toppers during the A.Y 2018-19
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Academic Toppers during the A.Y 2018-19 -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/2018-2019_CSE.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>

              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">
                  Academic Toppers during the A.Y 2017-18
                </summary>
                <div className="ml-5 my-2">
                  <p>
                    Academic Toppers during the A.Y 2017-18 -
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/2017-2018_CSE.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline ml-2"
                    >View</a>
                  </p>
                </div>
              </details>
            </div>

            <div className="mt-10 border-t-2 pt-6">
              <h4 className="text-xl font-semibold mb-6 text-center">Academic Toppers Overview</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">S.No</th>
                      <th className="py-3 px-4 border-b text-left">Academic Year</th>
                      <th className="py-3 px-4 border-b text-left">Particulars</th>
                      <th className="py-3 px-4 border-b text-left">No. of Students Benefited</th>
                      <th className="py-3 px-4 border-b text-left">Scholarship Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">1</td>
                      <td className="py-3 px-4 border-b">2024-25</td>
                      <td className="py-3 px-4 border-b">Academic Toppers</td>
                      <td className="py-3 px-4 border-b">85</td>
                      <td className="py-3 px-4 border-b">92500</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2</td>
                      <td className="py-3 px-4 border-b">2023-24</td>
                      <td className="py-3 px-4 border-b">Academic Toppers</td>
                      <td className="py-3 px-4 border-b">73</td>
                      <td className="py-3 px-4 border-b">118000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">3</td>
                      <td className="py-3 px-4 border-b">2022-23</td>
                      <td className="py-3 px-4 border-b">Academic Toppers</td>
                      <td className="py-3 px-4 border-b">24</td>
                      <td className="py-3 px-4 border-b">26000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b" rowSpan={2}>4</td>
                      <td className="py-3 px-4 border-b">2021-22</td>
                      <td className="py-3 px-4 border-b" rowSpan={2}>Academic Toppers</td>
                      <td className="py-3 px-4 border-b" rowSpan={2}>124</td>
                      <td className="py-3 px-4 border-b" rowSpan={2}>133750</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2020-21</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">5</td>
                      <td className="py-3 px-4 border-b">2019-20</td>
                      <td className="py-3 px-4 border-b">Academic Toppers</td>
                      <td className="py-3 px-4 border-b">95</td>
                      <td className="py-3 px-4 border-b">100250</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">6</td>
                      <td className="py-3 px-4 border-b">2018-19</td>
                      <td className="py-3 px-4 border-b">Academic Toppers</td>
                      <td className="py-3 px-4 border-b">53</td>
                      <td className="py-3 px-4 border-b">51250</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b" rowSpan={2}>7</td>
                      <td className="py-3 px-4 border-b" rowSpan={2}>2017-18</td>
                      <td className="py-3 px-4 border-b">Academic Toppers</td>
                      <td className="py-3 px-4 border-b">91</td>
                      <td className="py-3 px-4 border-b">67500</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">Merit Scholarship</td>
                      <td className="py-3 px-4 border-b">66</td>
                      <td className="py-3 px-4 border-b">995000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b" rowSpan={2}>8</td>
                      <td className="py-3 px-4 border-b" rowSpan={2}>2016-17</td>
                      <td className="py-3 px-4 border-b">Academic Toppers</td>
                      <td className="py-3 px-4 border-b">74</td>
                      <td className="py-3 px-4 border-b">61250</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">Merit Scholarship</td>
                      <td className="py-3 px-4 border-b">56</td>
                      <td className="py-3 px-4 border-b">845000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b" rowSpan={2}>9</td>
                      <td className="py-3 px-4 border-b" rowSpan={2}>2015-16</td>
                      <td className="py-3 px-4 border-b">Academic Toppers</td>
                      <td className="py-3 px-4 border-b">68</td>
                      <td className="py-3 px-4 border-b">51250</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">Merit Scholarship</td>
                      <td className="py-3 px-4 border-b">45</td>
                      <td className="py-3 px-4 border-b">665000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10 pt-6">
              <h4 className="text-xl font-semibold mb-6 text-center">Image Gallery</h4>
              <div className="container mx-auto">
                <div className="flex flex-wrap justify-center items-center">
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/academic_toppers_2k121.jpeg"
                      alt="Academic Toppers"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/academic_toppers_2k122.jpeg"
                      alt="Academic Toppers"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/academic_toppers_2k191.jpg"
                      alt="Academic Toppers"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/academic_toppers_2k192.jpeg"
                      alt="Academic Toppers"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/academic_toppers_2k194.jpeg"
                      alt="Academic Toppers"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/academic_toppers_2k195.jpeg"
                      alt="Academic Toppers"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/academic_toppers_2k193.jpeg"
                      alt="Academic Toppers"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cse/farewell_2018_2.jpg"
                      alt="Academic Toppers"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Computer Science & Engineering</h1>
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
        title="CSE Department"
        buttonLabel="Department Menu"
      >
        {/* Main Content */}
        <div className="py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#850209] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading department data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-red-500 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-red-600 font-medium mb-2">Error Loading Data</p>
                <p className="text-gray-600">{error}</p>
                <button 
                  onClick={() => {
                    // Reset error state and reload data
                    setError(null);
                    setLoading(true);
                    router.refresh();
                  }} 
                  className="mt-4 px-4 py-2 bg-[#850209] text-white rounded hover:bg-[#660000] transition-colors"
                >
                  Reload Page
                </button>
              </div>
            </div>
          ) : (
            renderContent()
          )}
          </div>
        </div>
      </FixedSidebar>
    </div>
  );
};

export default CSEDepartment;
