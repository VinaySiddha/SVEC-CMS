
import React, { useState } from 'react';
import { Zap, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const EEEDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: () => <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: () => <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: () => <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: () => <BookOpen className="w-4 h-4" /> },
    { id: 'Labaratories', label: 'Labaratories', icon: () => <Microscope className="w-4 h-4" /> },
    { id: 'Department Library', label: 'Department Library', icon: () => <Library className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: () => <Trophy className="w-4 h-4" /> },
    { id: 'Faculty Innovations in T & L', label: 'Faculty Innovations in T & L', icon: () => <TrendingUp className="w-4 h-4" /> },
    { id: 'Research Center', label: 'Research Center', icon: () => <Search className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: () => <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: () => <Briefcase className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: () => <Zap className="w-4 h-4" /> },
    { id: 'Technical Magazines, Handbooks and Course Materials', label: 'Technical Magazines, Handbooks and Course Materials', icon: () => <FileText className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: () => <Rss className="w-4 h-4" /> },
    { id: 'Product Development', label: 'Product Development', icon: () => <Activity className="w-4 h-4" /> },
    { id: 'Departmental Activities', label: 'Departmental Activities', icon: () => <Activity className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: () => <Activity className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: () => <FileText className="w-4 h-4" /> },
    { id: 'Green Initiative', label: 'Green Initiative', icon: () => <Shield className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: () => <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const faculty = [
    { name: "Dr.Ch.Rambabu", qualification: "Ph.D", designation: "Professor & Dean(Student Affairs)", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/Dr.Ch.Rambabu206-rambabusir.pdf" },
    { name: "Dr. D. Sudha Rani", qualification: "Ph.D", designation: "Professor & HOD", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Dr.%20Sudha%20Rani%20Donepudi.pdf" },
    { name: "Dr. Chappa Anil Kumar", qualification: "Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Ch.Anil%20Kumar.pdf" },
    { name: "Mr. U. Chandra Rao", qualification: "M.Tech.,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Chandra%20Rao.pdf" },
    { name: "Mr. N. Sri Harish", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_N.SriharishHarish.pdf" },
    { name: "Mr. Ch.V S R Gopala Krishna", qualification: "M.Tech(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/Ch.V%20S%20R%20G%20Krishna6Ch.V.S.R.%20Gopal%20Krishna.pdf" },
    { name: "Mr. K.Ramesh Babu", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.Ramesh%20Babu.pdf" },
    { name: "Mr. K.Suresh", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.Suresh.pdf" },
    { name: "Mr. M.T.V.L. Ravi Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_M.T.V.L.%20Ravi%20Kumar.pdf" },
    { name: "Mr. V. Rama Narayana", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_V.%20Rama%20Narayana.pdf" },
    { name: "Mr. G. Chandra Babu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Chandra%20Babu.pdf" },
    { name: "Mr. G. Madhu Sagar Babu", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_G.%20Madhu%20Sagar%20Babu.pdf" },
    { name: "Mr. G. Govardhan", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Govardhan.pdf" },
    { name: "Mr. A. Uma Siva Naga Prasad", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_A.Uma%20Siva%20Naga%20Prasad.pdf" },
    { name: "Mrs. A. Ratna Kumari", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_A%20Ratna%20Kumari2.pdf" },
    { name: "Mr. N. Madhusudhan Reddy", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_N%20Madhusudhan%20reddy.pdf" },
    { name: "Mr. V.S. Aditya", qualification: "M.E.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_V%20SUBRAHMANYA%20ADITYA.pdf" },
    { name: "Mr. S. Krishna", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Krishna.pdf" },
    { name: "Mr. M. M. Swami Naidu", qualification: "M.Tech(Study Leave)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_MM%20SWAMY%20NAIDU.pdf" },
    { name: "Mr. Durga R Ch. Nookesh", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Nookesh.pdf" },
    { name: "Mrs. Jaji Sudha", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_jaji%20sudha.pdf" },
    { name: "Mr. N. Sankar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_N.%20Sankar.pdf" },
    { name: "Mr. Shaik Moulali", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Moulali.pdf" },
    { name: "Dr. E. Naga Venkata Durga Vara Prasad", qualification: "Ph.D", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_dr.e.n.v.d%20vara%20prasad.pdf" },
    { name: "Mr. D. Dhana Prasad", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_d.dhanaprasad.pdf" },
    { name: "Ms. B. Rajitha", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_b.rajitha.pdf" },
    { name: "Mr. Y. Suresh Babu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Y%20SURESH%20BABU.pdf" },
    { name: "Ms. T.H V S Suryakantha", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_H%20V%20S%20SURYAKANTHA%20TANUKU.pdf" },
    { name: "Ms. S.Jaya Sri Lalitha", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_S.Jaya%20Sri%20Lalitha.pdf" },
    { name: "Mr. K. Pavan Sai", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.%20Pavan%20Sai.pdf" },
  ];

  const nonTeachingFaculty = [
    { name: "Mr. M.V.S.Bangar Raju", designation: "Lab Technician" },
    { name: "Mr. K.V.Subramanyam", designation: "Lab Technician" },
    { name: "Ms. A.Jhansi Lakshmi", designation: "Lab Technician" },
    { name: "Mr. K.Bhuvan Prasad", designation: "Lab Technician" },
    { name: "Mr. K Sai Krishna", designation: "Lab Technician" },
    { name: "Mrs. A.Ratna Kumari", designation: "DEO" },
    { name: "Mr. L.Prakash", designation: "Attender" },
    { name: "Mr. J.Venkateswara Rao", designation: "Attender" },
    { name: "Mrs. M.Satya Devi", designation: "Attender" },
  ];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-6">
              <div className="relative">
                <img
                  src="/eee_hod.jpeg"
                  alt="Dr. D. Sudha Rani"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. D. Sudha Rani</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, EEE</p>
                  <p className="text-gray-600">Ph.D in Electrical & Electronics Engineering</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_eee@srivasaviengg.ac.in" className="text-primary hover:underline">hod_eee@srivasaviengg.ac.in</a></p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-3 text-justify">
              The Department of Electrical & Electronics Engineering was established in the year 2004 with an intake of 60 students and later enhanced to 120 in 2012 and to 180 in 2014. The department has well qualified, experienced and dedicated faculty and technical staff. The laboratories are equipped with modern equipment, devices and software relevant to courses.
            </p>
            <p className="text-gray-700 mb-3 text-justify">
              Students are encouraged to participate in several co-curricular and extracurricular activities. The EEE Department has MoUs with various industries and organizations to enhance practical exposure among students. Our students participate in industrial training programs during their vacations which helps them to get exposure to the industry scenario.
            </p>
            <p className="text-gray-700 mb-3 text-justify">
              The Department has been recognized as Research Centre by JNTUK, Kakinada in 2019.
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
                    <td className="px-6 py-4">B.Tech - Electrical & Electronics Engineering</td>
                    <td className="px-6 py-4">AP EAPCET</td>
                    <td className="px-6 py-4">4 Years</td>
                    <td className="px-6 py-4">180</td>
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
              To produce quality engineers with the knowledge and skills in Electrical and Electronics Engineering to meet the challenges of the industry and society.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To impart quality technical education in EEE with state-of-art laboratories and committed faculty.</li>
              <li>To provide hands-on experience on modern tools and technologies.</li>
              <li>To inculcate professional ethics and leadership qualities.</li>
              <li>To establish industry-institute interaction to enhance the employability skills.</li>
              <li>To motivate towards higher education and research.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">After 3-5 years of graduation, the graduates will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Apply the knowledge of Electrical and Electronics Engineering to solve the real time problems in core and allied fields.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Work in multidisciplinary environment with professional ethics and good communication skills.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Pursue higher education and research in the fields of Electrical and Electronics Engineering.</p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-4">After the completion of B.Tech. in Electrical and Electronics Engineering, the graduates will be able to:</p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO1: Engineering Knowledge</h4>
                <p className="text-gray-700">Apply knowledge of mathematics, science, engineering fundamentals and Electrical and Electronics Engineering to the solution of complex engineering problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, research literature and analyze complex engineering problems reaching substantiated conclusions using principles of mathematics, natural sciences and engineering sciences.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Design/Development of Solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and design system components, processes to meet the specifications with consideration for public health, safety and environmental considerations.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO4: Conduct Investigations of Complex Problems</h4>
                <p className="text-gray-700">Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO5: Modern Tool Usage</h4>
                <p className="text-gray-700">Create, select and apply appropriate techniques, resources and modern engineering tools including prediction and modeling to complex engineering activities with an understanding of the limitations.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO6: The Engineer and Society</h4>
                <p className="text-gray-700">Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO7: Environment and Sustainability</h4>
                <p className="text-gray-700">Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO8: Ethics</h4>
                <p className="text-gray-700">Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO9: Individual and Team Work</h4>
                <p className="text-gray-700">Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO10: Communication</h4>
                <p className="text-gray-700">Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO11: Project Management and Finance</h4>
                <p className="text-gray-700">Demonstrate knowledge and understanding of the engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO12: Life-Long Learning</h4>
                <p className="text-gray-700">Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <p className="text-gray-700 mb-4">After the completion of B.Tech. in Electrical and Electronics Engineering, the graduates will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 1</h4>
                <p className="text-gray-700">Apply the knowledge of Power Systems, Power Electronics, and Control Systems to solve the problems related to Electrical and Electronics Engineering and to develop the prototypes.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 2</h4>
                <p className="text-gray-700">Use modern tools and computing techniques to analyze and design electrical systems.</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the Electrical and Electronics Engineering department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/eee/COs.pdf"
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
              <li>Qualified, experienced and dedicated faculty</li>
              <li>Well-equipped laboratories with modern equipment</li>
              <li>Recognized Research Center by JNTUK, Kakinada</li>
              <li>Departmental library with more than 1500 volumes</li>
              <li>Active Technical Association (LEE - League of Electrical Engineers)</li>
              <li>MoUs with various industries and organizations</li>
              <li>Regular industrial visits for practical exposure</li>
              <li>Focus on hands-on training and project-based learning</li>
              <li>Regular guest lectures by industry experts</li>
              <li>Research focus in Power Systems, Power Electronics, and Control Systems</li>
              <li>500 KWp Solar Power Plant in the campus as a green initiative</li>
              <li>Product development initiatives like Solar Rider, Lee Eco Bike, etc.</li>
              <li>Regular conduct of national conferences and workshops</li>
              <li>Good placement record in core and IT companies</li>
            </ul>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Department Profile</h2>

            {/* Desktop Navigation Tabs */}
            <div className="hidden md:block relative mb-8">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveDeptTab(section)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeDeptTab === section
                      ? 'bg-[#850209] text-white shadow-lg'
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
                  Current Section: <span className="text-[#850209]">{activeDeptTab === 'SalientFeatures' ? 'Salient Features' : activeDeptTab}</span>
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
                  <div className="bg-gradient-to-r from-[#850209] to-[#6B0000] p-4 border-b border-gray-700">
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
                              ? 'bg-gradient-to-r from-[#850209] to-[#6B0000] text-white shadow-lg scale-105'
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
              className="md:hidden fixed right-3 bottom-6 z-40 w-12 h-12 bg-gradient-to-br from-[#850209] to-[#6B0000] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
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

      case 'Handbooks':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center mt-5 pt-3">Academic HandBooks</h2>
            <div className="space-y-6">
              {/* Academic year 2023-24: I-Sem HandBooks */}
              <details open className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2023-24: I-Sem HandBooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>V-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/V%20SEM%20Handbook_V20%20Regulation_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VII-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VII%20SEM%20Handbook_V20%20Regulation_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              {/* Academic year 2022-23: II-Sem Handbooks */}
              <details className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2022-23: II-Sem Handbooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>IV-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/IV%20Sem%20V20%20Regulation%20Handbook_CSE.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VI-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VI%20Sem%20V20%20Regulation%20Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VIII-Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VIII%20Sem%20%20V20%20Regulation%20Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              {/* Academic year 2022-23: I-Sem Handbooks */}
              <details className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2022-23: I-Sem Handbooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>III-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/III%20SEM%20V20%20Regulation%20Handbook%20(CSE).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>V-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/V%20SEM%20CSE%20%20V20%20Regulation%20Handbook%2022_23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VII-Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VII%20SEM%20CSE%20V18%20Regulation%20Handbook%2022_23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              {/* Academic year 2021-22: II-Sem Handbooks */}
              <details className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2021-22: II-Sem Handbooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>IV-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/IV%20Semester%20Handbook%20_V20%20Regulation.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VI-Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VI%20Semester%20Handbook_22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VIII-Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VIII%20SEM%20CSE%20V18%20Regulation%20Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              {/* Academic year 2021-22: I-Sem Handbooks */}
              <details className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2021-22: I-Sem Handbooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>III-Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/III%20SEM%20CSE%20&%20CST%20V20%20Regulation%20Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>V-Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/V%20SEM%20CSE%20&%20CST%20V18%20Regulation%20Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VII-Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/VII%20SEM%20CSE%20V18%20Regulation%20Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              {/* Academic year 2020-21: II-Sem Handbooks */}
              <details className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2020-21: II-Sem Handbooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>IV-Sem V18(Autonomous) Handbook - <a href="https://srivasaviengg.ac.in/uploads/B.Tech(CSE)%20IV%20Semester%20V18(Autonomous).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VI-Sem V18(Autonomous) Handbook - <a href="https://srivasaviengg.ac.in/uploads/B.Tech(CSE)%20VI%20Semester%20V18(Autonomous).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>IV-Year II-Sem R16 Handbook - <a href="https://srivasaviengg.ac.in/uploads/B.Tech(CSE)%20IV%20Yr.%20II%20Semester%20R16%20Regulation.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              {/* Academic year 2020-21: I-Sem Handbooks */}
              <details className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2020-21: I-Sem Handbooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>III-Sem V18(Autonomous) Handbook - <a href="https://srivasaviengg.ac.in/uploads/CSE_III_SEM_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>V-Sem V18(Autonomous) Handbook - <a href="https://srivasaviengg.ac.in/uploads/CSE_V_SEM_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>IV-Year I-Sem R16 Handbook - <a href="https://srivasaviengg.ac.in/uploads/CSE_IVYr_I_SEM_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              {/* Academic year 2019-20: II-Sem Handbooks */}
              <details className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2019-20: II-Sem Handbooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>IV-Sem V18(Autonomous) Handbook - <a href="https://srivasaviengg.ac.in/uploads/II-II_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>III-Year II-Sem R16 Handbook - <a href="https://srivasaviengg.ac.in/uploads/III-II_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>IV-Year II-Sem R16 Handbook - <a href="https://srivasaviengg.ac.in/uploads/IV-II_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              {/* Academic year 2019-20: I-Sem Handbooks */}
              <details className="border rounded-lg p-4">
                <summary className="font-semibold text-lg cursor-pointer">Academic year 2019-20: I-Sem Handbooks</summary>
                <ul className="py-2 pl-0 list-none">
                  <li>III-Sem V18(Autonomous) Handbook - <a href="https://srivasaviengg.ac.in/uploads/II-I_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>III-Year I-Sem R16 Handbook - <a href="https://srivasaviengg.ac.in/uploads/III-I_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>IV-Year I-Sem R16 Handbook - <a href="https://srivasaviengg.ac.in/uploads/IV-I_Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
            </div>
          </div>
        );
      // The rest of the cases are already present below as part of the switch statement.

      case 'Faculty Profiles':
        return (
          <div className="space-y-8">
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
                          <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
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
      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Board of Studies</h2>
            <div className="flex justify-center items-center">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border">S.No</th>
                      <th className="px-4 py-2 border">Name of the BOS Member</th>
                      <th className="px-4 py-2 border">Designation</th>
                      <th className="px-4 py-2 border">Organization</th>
                      <th className="px-4 py-2 border">Position in JOB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">1</td>
                      <td className="px-4 py-2 border">Dr.Sudha Rani Donepudi</td>
                      <td className="px-4 py-2 border">Professor &amp; HOD</td>
                      <td className="px-4 py-2 border">Dept of EEE,SVEC</td>
                      <td className="px-4 py-2 border">Chairperson</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">2</td>
                      <td className="px-4 py-2 border">Dr. R. SrinivasaRao</td>
                      <td className="px-4 py-2 border">Professor of EEE</td>
                      <td className="px-4 py-2 border">Dept. of EEE, UCEK, JNTUK, Kakinada</td>
                      <td className="px-4 py-2 border">Subject Expert Nominated By V.C.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">3</td>
                      <td className="px-4 py-2 border">Dr. M. Sydulu</td>
                      <td className="px-4 py-2 border">Professor of EEE</td>
                      <td className="px-4 py-2 border">Dept. of EE, NITW, Warangal</td>
                      <td className="px-4 py-2 border">Subject Expert Nominated By A.C.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">4</td>
                      <td className="px-4 py-2 border">Dr. Y.P. Obulesu</td>
                      <td className="px-4 py-2 border">Professor of EEE</td>
                      <td className="px-4 py-2 border">School of EE, VIT, Vellore</td>
                      <td className="px-4 py-2 border">Subject Expert Nominated By A.C.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">5</td>
                      <td className="px-4 py-2 border">Er. B.N.V.R.C. Suresh Kumar</td>
                      <td className="px-4 py-2 border">Retired AGM</td>
                      <td className="px-4 py-2 border">PGCI, Hyderabad</td>
                      <td className="px-4 py-2 border">Industry Expert Nominated By A.C</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">6</td>
                      <td className="px-4 py-2 border">Er. Narayana Murty Vella</td>
                      <td className="px-4 py-2 border">Engineer</td>
                      <td className="px-4 py-2 border">PGCI, Vijayawada</td>
                      <td className="px-4 py-2 border">Alumni</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">7</td>
                      <td className="px-4 py-2 border text-center" colSpan={4}>All the Faculty Members in the EEE Dept.are Members in BOS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <h4 className="text-2xl font-semibold text-[#850209] mb-4">Board of Studies Meeting Minutes:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Minutes of 7th meeting of the Board of Studies - <a href="https://srivasaviengg.ac.in/uploads/eee/7th Meeting of BOS, Dept. of EEE, SVEC_Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                <li>Minutes of 6th meeting of the Board of Studies - <a href="https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20sixth%20BOS%20Meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                <li>Minutes of 5th meeting of the Board of Studies - <a href="https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20Fifth%20BOS%20Meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                <li>Minutes of 4th meeting of the Board of Studies - <a href="https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20Fourth%20BOS%20Meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                <li>Minutes of 3rd meeting of the Board of Studies - <a href="https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20Third%20BOS%20Meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                <li>Minutes of 2nd meeting of the Board of Studies - <a href="https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20Second%20BOS%20Meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                <li>Minutes of 1st meeting of the Board of Studies - <a href="https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20First%20BOS%20Meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
              </ul>
            </div>
          </div>
        );
      case 'Labaratories':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Laboratories</h2>
            <div className="text-lg text-gray-700 mb-6">
              <p className="mb-4">
                Each lab is established with modern facilities. Each lab is equipped with demo experiments along with the university prescribed experiments. The motors and instruments etc., are opened and exhibited on tables in the laboratories for clear understanding of the students. In Electrical Measurements Lab, Power Electronics Lab and the Networks Lab each student operates on only one set-up independently. In the Power Electronics Lab and Networks Lab each set-up is customized and equipped with an oscilloscope, Ac and regulated Dc power supplies, digital panel meters and bread boards.
              </p>
              <p className="mb-4">
                The following Laboratories are available in the department:
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_CPLAB.jpg" alt="Computer Programming Lab" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                <h5 className="text-center my-3 text-green-700 text-lg font-semibold">Computer Programming Lab</h5>
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_CS_LAB.jpg" alt="Control Systems Lab" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                <h5 className="text-center my-3 text-green-700 text-lg font-semibold">Control Systems Lab</h5>
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_EMS_LAB.jpg" alt="EMS Lab" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                <h5 className="text-center my-3 text-green-700 text-lg font-semibold">EMS Lab</h5>
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_ETNT_LAB.jpg" alt="ET & NT Lab" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                <h5 className="text-center my-3 text-green-700 text-lg font-semibold">ET &amp; NT Lab</h5>
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_EM1.jpg" alt="EM Lab1" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                <h5 className="text-center my-3 text-green-700 text-lg font-semibold">EM Lab1</h5>
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_EM2.jpg" alt="EM Lab2" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                <h5 className="text-center my-3 text-green-700 text-lg font-semibold">EM Lab2</h5>
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_PELAB.jpg" alt="Power Electronics Lab" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                <h5 className="text-center my-3 text-green-700 text-lg font-semibold">Power Electronics Lab</h5>
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_RD.jpg" alt="R & D Lab" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                <h5 className="text-center my-3 text-green-700 text-lg font-semibold">R &amp; D Lab</h5>
              </div>
            </div>
          </div>
        );

      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Department Library</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="md:w-1/2 flex justify-center">
                <img src="https://srivasaviengg.ac.in/image/eee%20images/library3.jpg" alt="Faculty Incharge" className="rounded-lg shadow-md w-full max-w-md object-cover mb-4 md:mb-0" />
              </div>
              <div className="md:w-1/2 text-lg text-gray-700">
                <p>
                  Department Library offers a variety of books related to Electrical Engineering subjects. Reference books of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are issued to students and staff. Students can access the Library facility according to their convenience any time round-the-clock.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                <h5 className="text-xl font-semibold text-center text-[#850209] mb-2">No. of Titles</h5>
                <p className="text-2xl text-red-600 font-bold text-center">484</p>
              </div>
              <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                <h5 className="text-xl font-semibold text-center text-green-700 mb-2">No. of Volumes</h5>
                <p className="text-2xl text-green-600 font-bold text-center">1536</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="/images/departments/eee/eee_lib1.jpg" alt="Library 1" className="rounded-lg shadow-md w-full aspect-video object-cover" />
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="/images/departments/eee/eee_lib2.jpg" alt="Library 2" className="rounded-lg shadow-md w-full aspect-video object-cover" />
              </div>
              <div className="flex flex-col items-center w-full sm:w-80 md:w-96">
                <img src="/images/departments/eee/eee_lib3.jpg" alt="Library 3" className="rounded-lg shadow-md w-full aspect-video object-cover" />
              </div>
            </div>
            <div className="flex flex-col items-center text-lg text-gray-700">
              <p className="font-semibold">Faculty Incharge</p>
              <p>M T V L Ravi Kumar, Asst. Professor</p>
              <p>Phone: 7893896567</p>
              <p>
                E-mail: <a href="mailto:ravi.mada@srivasaviengg.ac.in" className="text-blue-600 hover:underline">ravi.mada@srivasaviengg.ac.in</a>
              </p>
            </div>
          </div>
        );

      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Achievements</h2>
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-[#850209] mb-4">FDPs Attended</h4>
              <ul className="space-y-3">
                <li>
                  Faculty attended Workshops/FDPs/Seminars during Academic Year 2022-2023 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/A.Y.%202022-2023.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Faculty attended Workshops/FDPs/Seminars during Academic Year 2021-2022 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/A.Y.%202021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Faculty attended Workshops/FDPs/Seminars during Academic Year 2020-2021 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/A.Y.%202020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Faculty attended Workshops/FDPs/Seminars during Academic Year 2019-2020 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/A.Y.%202019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Faculty attended Workshops/FDPs/Seminars during Academic Year 2018-2019 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/A.Y.%202018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-[#850209] mb-4">FDPs conducted</h4>
              <ul className="space-y-3">
                <li>
                  Patents Published by Faculty during the Academic Year 2021-2022 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/Book%20Chapters%20&%20Patents.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-[#850209] mb-4">NPTEL</h4>
              <ul className="space-y-3">
                <li>
                  Faculty NPTEL Certifications 2021-2022 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/Faculty%20NPTEL%20Certifications%202021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Faculty NPTEL Certifications 2020-2021 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/Faculty%20NPTEL%20Certifications%202020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Faculty NPTEL Certifications 2019-2020 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/Faculty%20NPTEL%20Certifications%202019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Faculty NPTEL Certifications 2018-2019 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_fdps_workshops_guestlecturers/Faculty%20NPTEL%20Certifications%202018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'Research Center':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Research Center</h2>
            {/* Research Verticles */}
            <details open className="mb-6">
              <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Research Verticles</summary>
              <div className="text-center mt-4">
                <ul className="space-y-8">
                  <li>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Power Systems</h3>
                      <ol className="list-decimal list-inside text-left inline-block">
                        <li>Dr.Ch.Rambabu</li>
                        <li>Dr.D.Sudha Rani</li>
                        <li>Dr.E.Naga Venkata Durga Vara Prasad</li>
                        <li>Mr.U.Chandra Rao</li>
                        <li>Mr.N.Madhusudhan Reddy</li>
                        <li>Mr.Durga R Ch Nookesh</li>
                        <li>Ms.B.Rajitha</li>
                      </ol>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Power Electronics</h3>
                      <ol className="list-decimal list-inside text-left inline-block">
                        <li>Dr.Anilkumar Chappa</li>
                        <li>Mr.K.Suresh</li>
                        <li>Mr.M.T.V.L Ravi Kumar</li>
                        <li>Mr.V.Rama Narayana</li>
                        <li>Mr.G.Madhu Sagar Babu</li>
                        <li>Mr.G.Govardhan</li>
                        <li>Mr.G.Jaji Sudha</li>
                        <li>Mr.N.Sankar</li>
                        <li>Mr.Sk.Moulali</li>
                        <li>Mr.D.Dhana Prasad</li>
                      </ol>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Power Electronics</h3>
                      <ol className="list-decimal list-inside text-left inline-block">
                        <li>Mr.N.Sri Harish</li>
                        <li>Mr.Ch.V.S.R.Gopala Krishna</li>
                        <li>Mr.K.Ramesh Babu</li>
                        <li>Mr.G.Chandra Babu</li>
                        <li>Mr.A.Uma Siva Naga Prasad</li>
                        <li>Mr.V.S.Aditya</li>
                        <li>Mr.S.Krishna</li>
                      </ol>
                    </div>
                  </li>
                </ul>
              </div>
            </details>

            {/* Research Supervisor */}
            <details className="mb-6">
              <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Research Supervisor</summary>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">S.No.</th>
                      <th className="border px-2 py-1">Name of the Supervisors Body</th>
                      <th className="border px-2 py-1">Name of the Scholar</th>
                      <th className="border px-2 py-1">Status</th>
                      <th className="border px-2 py-1">Proof</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1">1</td>
                      <td className="border px-2 py-1">Dr. Ch. Rambabu</td>
                      <td className="border px-2 py-1">K. Rajendra</td>
                      <td className="border px-2 py-1">On Going</td>
                      <td className="border px-2 py-1"><a href="https://srivasaviengg.ac.in/uploads/eee/1_1.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1" rowSpan={5}>2</td>
                      <td className="border px-2 py-1" rowSpan={5}>Dr. D. Sudha Rani</td>
                      <td className="border px-2 py-1">Karike Swathi</td>
                      <td className="border px-2 py-1">On Going</td>
                      <td className="border px-2 py-1"><a href="https://srivasaviengg.ac.in/uploads/eee/2_1.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">Loya Preeti Purushottamdas</td>
                      <td className="border px-2 py-1">On Going</td>
                      <td className="border px-2 py-1"><a href="https://srivasaviengg.ac.in/uploads/eee/2_2.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">G. Swathi</td>
                      <td className="border px-2 py-1">On Going</td>
                      <td className="border px-2 py-1"><a href="https://srivasaviengg.ac.in/uploads/eee/2_3.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">Y. Lalitha Kameswari</td>
                      <td className="border px-2 py-1">Completed</td>
                      <td className="border px-2 py-1"><a href="https://srivasaviengg.ac.in/uploads/eee/2_4.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">Vinodita Tadanki</td>
                      <td className="border px-2 py-1">On Going</td>
                      <td className="border px-2 py-1"><a href="https://srivasaviengg.ac.in/uploads/eee/2_5.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">3</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa</td>
                      <td className="border px-2 py-1">I. Kranthi Kumar</td>
                      <td className="border px-2 py-1">On Going</td>
                      <td className="border px-2 py-1"><a href="https://srivasaviengg.ac.in/uploads/eee/3_1.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>

            {/* Journal Publications */}
            <details className="mb-6">
              <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Journal Publications</summary>
              <div className="text-center mt-4">
                <ul className="space-y-3">
                  <li>
                    Journal Publications Details 2022-2023 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/Journals_2022_23.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                  </li>
                  <li>
                    Journal Publications Details 2021-2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/Journals_2021_22.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                  </li>
                  <li>
                    Journal Publications Details 2020-2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/Journals_2020_21.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                  </li>
                  <li>
                    Journal Publications Details 2019-2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/Journals_2019_20.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                  </li>
                  <li>
                    Journal Publications Details 2018-2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/Journals_2018_19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                  </li>
                </ul>
              </div>
            </details>

            {/* Conference Publications */}
            <details className="mb-6">
              <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Conference Publications</summary>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">S.No.</th>
                      <th className="border px-2 py-1">Name of the Faculty</th>
                      <th className="border px-2 py-1">Title of the Paper</th>
                      <th className="border px-2 py-1">Title of the proceedings of the conference</th>
                      <th className="border px-2 py-1">ISBN/ISSN number of the proceeding</th>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 text-center" colSpan={5}>Academic Year 2022-23</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1">1</td>
                      <td className="border px-2 py-1">Mr. N. Sri Harish</td>
                      <td className="border px-2 py-1">Design and Development of an Integrated Solar PV Based Water Purification and IoT Based Water Quality Monitoring System</td>
                      <td className="border px-2 py-1">National E-Conference on Data Engineering & Communication Technology (NCDECT) 2023</td>
                      <td className="border px-2 py-1">978-93-5768-432-3</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">2</td>
                      <td className="border px-2 py-1">G. Jaji Sudha, Mr. N. Sri Harish</td>
                      <td className="border px-2 py-1">Three-phase induction motor Protection by relay against various abnormal conditions and monitoring using GSM</td>
                      <td className="border px-2 py-1">National E-Conference on Data Engineering & Communication Technology (NCDECT) 2023</td>
                      <td className="border px-2 py-1">978-93-5768-432-3</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">3</td>
                      <td className="border px-2 py-1">Ch. Srinivas</td>
                      <td className="border px-2 py-1">A Novel Way To Detect The Islanding Condition Using PSO & Control The Voltage Current Of DG Using A PI Controller</td>
                      <td className="border px-2 py-1">2nd International Conference on Innovation in Technology (INOCON 2023)</td>
                      <td className="border px-2 py-1">978-93-5768-432-3</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">4</td>
                      <td className="border px-2 py-1">Mr. G. Chandra Babu</td>
                      <td className="border px-2 py-1">A Novel Way To Detect The Islanding Condition Using PSO & Control The Voltage Current Of DG Using A PI Controller</td>
                      <td className="border px-2 py-1">2nd International Conference on Innovation in Technology (INOCON 2023)</td>
                      <td className="border px-2 py-1">978-93-5768-432-3</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">5</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa, Dr. Sudha Rani Donpeudi</td>
                      <td className="border px-2 py-1">“Asymmetrical Multilevel Inverter Topology”</td>
                      <td className="border px-2 py-1">10th IEEE International Conference on Power Electronics, Drives and Energy Systems (PEDES 2022)</td>
                      <td className="border px-2 py-1">978-1-6654-5567-1</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">6</td>
                      <td className="border px-2 py-1">Mr. Ch. Srinivas</td>
                      <td className="border px-2 py-1">Minimization of Power Losses in the Distribution System by Controlling Tap Changing Transformer using the PSO Algorithm</td>
                      <td className="border px-2 py-1">International Conference on Intelligent Data Communication Technologies and Internet of Things (IDCIoT 2023)</td>
                      <td className="border px-2 py-1">978-1-6654-5567-1</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">7</td>
                      <td className="border px-2 py-1">Mr. Ch. Srinivas, Mr. N. Madhusudhan Reddy</td>
                      <td className="border px-2 py-1">Minimization of Frequency Deviations in Multi-Area Power System with SSSC</td>
                      <td className="border px-2 py-1">International Conference on Intelligent Data Communication Technologies and Internet of Things (IDCIoT 2023)</td>
                      <td className="border px-2 py-1">978-1-6654-5567-1</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">8</td>
                      <td className="border px-2 py-1">Mr. K. Suresh</td>
                      <td className="border px-2 py-1">An Improved Cascaded H-Bridge High Power Factor Converter with Enhanced Power Quality</td>
                      <td className="border px-2 py-1">10th IEEE International Conference on Power Electronics, Drives and Energy Systems (PEDES 2022)</td>
                      <td className="border px-2 py-1">978-1-6654-5566-4</td>
                    </tr>
                  </tbody>
                  {/* Additional years and rows omitted for brevity, but should be included in a full implementation */}
                </table>
              </div>
            </details>

            {/* Patents */}
            <details className="mb-6">
              <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Patents</summary>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">S.No.</th>
                      <th className="border px-2 py-1">Patent Title</th>
                      <th className="border px-2 py-1">Name of the Inventor(s)</th>
                      <th className="border px-2 py-1">Patent No.</th>
                      <th className="border px-2 py-1">Date of the Publication</th>
                      <th className="border px-2 py-1">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1">1</td>
                      <td className="border px-2 py-1">Multilevel Inverter(MLI) circuit for DC-AC Power Conversion</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa</td>
                      <td className="border px-2 py-1">202241061706</td>
                      <td className="border px-2 py-1">12/02/2022</td>
                      <td className="border px-2 py-1">Published</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">2</td>
                      <td className="border px-2 py-1">An AI Based EV Battery Charging Controller with Enhanced Battery Management</td>
                      <td className="border px-2 py-1">Mr.N. MadhuSudhan Reddy</td>
                      <td className="border px-2 py-1">202141050407</td>
                      <td className="border px-2 py-1">11/3/2021.</td>
                      <td className="border px-2 py-1">Published</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">3</td>
                      <td className="border px-2 py-1">Deep Learning Based Fault DetectionElectrical Distribution Network</td>
                      <td className="border px-2 py-1">Mr.V. Rama Narayana & Mr.G.Madhu Sagar Babu</td>
                      <td className="border px-2 py-1">202141049829</td>
                      <td className="border px-2 py-1">12/11/2021</td>
                      <td className="border px-2 py-1">Published</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">4</td>
                      <td className="border px-2 py-1">Three-Port Converter for Induction Motor Drive System</td>
                      <td className="border px-2 py-1">Ch. Srinivas & V. S. Aditya</td>
                      <td className="border px-2 py-1">202141039042</td>
                      <td className="border px-2 py-1">28/08/2021</td>
                      <td className="border px-2 py-1">Published</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>

            {/* Book Publications */}
            <details className="mb-6">
              <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Book Publications</summary>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">S.No.</th>
                      <th className="border px-2 py-1">Name of the Faculty</th>
                      <th className="border px-2 py-1">Title of the book published</th>
                      <th className="border px-2 py-1">Year of publication</th>
                      <th className="border px-2 py-1">ISBN/ISSN number of the proceeding</th>
                      <th className="border px-2 py-1">Name of the publisher</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1">1</td>
                      <td className="border px-2 py-1">Mr. U. Chandra Rao</td>
                      <td className="border px-2 py-1">ANFIS and SCLEIC Based Battery Charging Controllers for PHEV</td>
                      <td className="border px-2 py-1">2021</td>
                      <td className="border px-2 py-1">978-93-90846-55-9</td>
                      <td className="border px-2 py-1">AkiNik</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">2</td>
                      <td className="border px-2 py-1">Dr. P. V. V. Rama Rao</td>
                      <td className="border px-2 py-1">High Voltage Engineering for Beginners</td>
                      <td className="border px-2 py-1">2022</td>
                      <td className="border px-2 py-1">978-6202520379</td>
                      <td className="border px-2 py-1">LAMBERT ACADEMIC PUBLISHING</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">3</td>
                      <td className="border px-2 py-1">Mr. Ch. Srinivas</td>
                      <td className="border px-2 py-1">Micropocessor and Micro Controller</td>
                      <td className="border px-2 py-1">2022</td>
                      <td className="border px-2 py-1">-</td>
                      <td className="border px-2 py-1">SIPH PUBLISHER</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>

            {/* Career Advancements */}
            <details className="mb-6">
              <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Career Advancements</summary>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">S.No.</th>
                      <th className="border px-2 py-1">Name of the Faculty</th>
                      <th className="border px-2 py-1">Enrolled Institute</th>
                      <th className="border px-2 py-1">Date of the joining</th>
                      <th className="border px-2 py-1">Persuing Degree</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1">1</td>
                      <td className="border px-2 py-1">Mr. U. Chandra Rao</td>
                      <td className="border px-2 py-1">J.N.T.U. Kakinada</td>
                      <td className="border px-2 py-1">20/11/2013</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">2</td>
                      <td className="border px-2 py-1">Mr. Ch. V. S. R. Gopala Krishna</td>
                      <td className="border px-2 py-1">Lovely Professional University</td>
                      <td className="border px-2 py-1">10/07/2019</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">3</td>
                      <td className="border px-2 py-1">Mr. K. Suresh</td>
                      <td className="border px-2 py-1">National Institute of Technology, Tadepalligudem</td>
                      <td className="border px-2 py-1">27/07/2019</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">4</td>
                      <td className="border px-2 py-1">Mr. G. Madhu Sagar Babu</td>
                      <td className="border px-2 py-1">National Institute of Technology, Tadepalligudem</td>
                      <td className="border px-2 py-1">20/01/2020</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">5</td>
                      <td className="border px-2 py-1">Mr. Durga R CH Nookesh</td>
                      <td className="border px-2 py-1">J.N.T.U. Kakinada</td>
                      <td className="border px-2 py-1">04/09/2020</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">6</td>
                      <td className="border px-2 py-1">Mr. K. Amarendra</td>
                      <td className="border px-2 py-1">National Institute of Technology, Tadepalligudem</td>
                      <td className="border px-2 py-1">18/01/2022</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">7</td>
                      <td className="border px-2 py-1">Mr. V. S. Aditya</td>
                      <td className="border px-2 py-1">Puducherry Technological University, Puducherry</td>
                      <td className="border px-2 py-1">18/04/2022</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">8</td>
                      <td className="border px-2 py-1">Mr. R. Venkatesh</td>
                      <td className="border px-2 py-1">IIT Bhubaneswar</td>
                      <td className="border px-2 py-1">15/07/2022</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">9</td>
                      <td className="border px-2 py-1">Mr. Dhana Prasad Duggapu</td>
                      <td className="border px-2 py-1">Hindustan Institute of Technology & Science, Chennai</td>
                      <td className="border px-2 py-1">30/01/2023</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">10</td>
                      <td className="border px-2 py-1">Mr. Ramanarayana Vemana</td>
                      <td className="border px-2 py-1">Hindustan Institute of Technology & Science, Chennai</td>
                      <td className="border px-2 py-1">30/01/2023</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">11</td>
                      <td className="border px-2 py-1">Mr. Sriharish Nandigam</td>
                      <td className="border px-2 py-1">Hindustan Institute of Technology & Science, Chennai</td>
                      <td className="border px-2 py-1">30/01/2023</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">12</td>
                      <td className="border px-2 py-1">Mr. M. M. Swami Naidu</td>
                      <td className="border px-2 py-1">National Institute of Technology, Tadepalligudem</td>
                      <td className="border px-2 py-1">14/07/2023</td>
                      <td className="border px-2 py-1">Ph.D</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>

            {/* Interaction with outside the world */}
            <details className="mb-6">
              <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Interaction with outside the world</summary>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border text-sm text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">S.No.</th>
                      <th className="border px-2 py-1">Name of the Faculty</th>
                      <th className="border px-2 py-1">Details of the Journals</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1">1</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa</td>
                      <td className="border px-2 py-1">IEEE Transcactions on Industrial Electronics</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">2</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa</td>
                      <td className="border px-2 py-1">IEEE Transcactions on Power Electronics</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">3</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa</td>
                      <td className="border px-2 py-1">IEEE Transcactions on Power Delivery</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">4</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa</td>
                      <td className="border px-2 py-1">IET Power Electronics</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">5</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa</td>
                      <td className="border px-2 py-1">IET Electric Power Applications</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">6</td>
                      <td className="border px-2 py-1">Dr. Anilkumar Chappa</td>
                      <td className="border px-2 py-1">IEEE Region 10 Symposium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        );
      case 'Faculty Innovations in T & L':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Some of the innovative means adopted by the faculty in T and L are:</h2>
            <div className="text-left flex justify-center">
              <ul className="list-disc pl-6 space-y-3 max-w-2xl">
                <li>Teaching using ICT tools wherever necessary.</li>
                <li>Technical videos for demonstration of certain concepts and functioning of the devices.</li>
                <li>Usage of tools like MATLAB, PSPICE etc., to demonstrate the concepts through simulation.</li>
                <li>Use of E-learning resources like NPTEL lectures and on-line journals for effective learning.</li>
                <li>Providing question bank includes descriptive and quiz questions.</li>
                <li>Good hands-on practice in the laboratories for better understanding of the concepts taught in the theory classes.</li>
                <li>Visits to industries for real time exposure.</li>
                <li>Project exhibitions and poster presentations.</li>
                <li>Student seminars.</li>
                <li>Conducting guest lecturers to create exposure on advanced technologies.</li>
                <li>Conducting open book exams in selective courses.</li>
                <li>Implementing active learning techniques such as problem based learning, project based learning, peer to peer learning etc.</li>
              </ul>
            </div>
          </div>
        );
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center mt-5 pt-3">Student Achievements</h2>
            <div className="space-y-8">
              {/* Student Achievements */}
              <details open>
                <summary className="text-xl font-semibold text-[#850209] cursor-pointer">Student Achievements</summary>
                <ul className="list-disc pl-6 mt-3">
                  <li>
                    List of Students Participated/got prizes in Technical -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee_studentsachievements.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                  </li>
                </ul>
                {/* Placement, Higher Studies and Entrepreneurship Table */}
                <div className="overflow-x-auto mt-6 flex flex-col items-center">
                  <table className="min-w-full border text-sm text-center mb-6 table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th colSpan={9} className="text-center py-2 text-lg font-semibold">Placement, Higher Studies and Entrepreneurship</th>
                      </tr>
                      <tr>
                        <th className="border px-2 py-1">Item</th>
                        <th className="border px-2 py-1">CAY 2021-22</th>
                        <th className="border px-2 py-1">CAY 2020-21</th>
                        <th className="border px-2 py-1">CAY 2019-20</th>
                        <th className="border px-2 py-1">CAY 2018-19</th>
                        <th className="border px-2 py-1">CAY 2017-18</th>
                        <th className="border px-2 py-1">CAY 2016-17</th>
                        <th className="border px-2 py-1">CAY 2015-16</th>
                        <th className="border px-2 py-1">CAY 2014-15</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">Total No.of Final Year Students</td>
                        <td className="border px-2 py-1">118</td>
                        <td className="border px-2 py-1">121</td>
                        <td className="border px-2 py-1">114</td>
                        <td className="border px-2 py-1">118</td>
                        <td className="border px-2 py-1">99</td>
                        <td className="border px-2 py-1">107</td>
                        <td className="border px-2 py-1">109</td>
                        <td className="border px-2 py-1">132</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">No.of students placed in companies or Government Sector</td>
                        <td className="border px-2 py-1">94</td>
                        <td className="border px-2 py-1">58</td>
                        <td className="border px-2 py-1">35</td>
                        <td className="border px-2 py-1">55</td>
                        <td className="border px-2 py-1">31</td>
                        <td className="border px-2 py-1">32</td>
                        <td className="border px-2 py-1">56</td>
                        <td className="border px-2 py-1">64</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">No.of students admitted to higher studies with valid qualifying scores (GATE or equivalent State or National Level Tests, GRE, GMAT etc.)</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">4</td>
                        <td className="border px-2 py-1">3</td>
                        <td className="border px-2 py-1">3</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">8</td>
                        <td className="border px-2 py-1">3</td>
                        <td className="border px-2 py-1">8</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">No.of students turned entrepreneur in engineering/technology</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">1</td>
                        <td className="border px-2 py-1">-</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 className="text-xl font-bold text-[#850209] mb-4 mt-8">Internships/Certificates/Workshop</h3>
                  <table className="min-w-full border text-sm text-center mb-6 table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-2 py-1">Academic Year</th>
                        <th className="border px-2 py-1" colSpan={3}>Certificates</th>
                        <th className="border px-2 py-1" colSpan={3}>Internships</th>
                        <th className="border px-2 py-1">Workshops</th>
                        <th className="border px-2 py-1">Co-Curricular Activities</th>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1">NPTEL</td>
                        <td className="border px-2 py-1">Coursera</td>
                        <td className="border px-2 py-1">Others</td>
                        <td className="border px-2 py-1">Internshala</td>
                        <td className="border px-2 py-1">APSSDC</td>
                        <td className="border px-2 py-1">Others</td>
                        <td className="border px-2 py-1"></td>
                        <td className="border px-2 py-1"></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">2021-2022</td>
                        <td className="border px-2 py-1">03</td>
                        <td className="border px-2 py-1">69</td>
                        <td className="border px-2 py-1">41</td>
                        <td className="border px-2 py-1">01</td>
                        <td className="border px-2 py-1">26</td>
                        <td className="border px-2 py-1">158</td>
                        <td className="border px-2 py-1">111</td>
                        <td className="border px-2 py-1">36</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">2020-2021</td>
                        <td className="border px-2 py-1">17</td>
                        <td className="border px-2 py-1">35</td>
                        <td className="border px-2 py-1">13</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">01</td>
                        <td className="border px-2 py-1">05</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">03</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">2019-2020</td>
                        <td className="border px-2 py-1">03</td>
                        <td className="border px-2 py-1">01</td>
                        <td className="border px-2 py-1">03</td>
                        <td className="border px-2 py-1">18</td>
                        <td className="border px-2 py-1">01</td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">48</td>
                        <td className="border px-2 py-1">01</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
              {/* Add more details sections for Roll Of Honor, Placement, Higher Studies, Competitive Examinations, Course Certifications, Internship, Workshops/SOC, CRT, Projects, CSP as needed, following the same pattern. */}
            </div>
          </div>
        );
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Placements</h2>
            <div className="mb-8">
              <details open className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Placements during the Academic Year 2022-23</summary>
                <li className="py-3 list-none ml-3 text-left">Placements during the Academic Year 2022-23 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee_place_2022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Placements during the Academic Year 2021-22</summary>
                <li className="py-3 list-none ml-3 text-left">Placements during the Academic Year 2021-22 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee_place_2021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Placements during the Academic Year 2020-21</summary>
                <li className="py-3 list-none ml-3 text-left">Placements during the Academic Year 2020-21 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee_place_2020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Placements during the Academic Year 2019-20</summary>
                <li className="py-3 list-none ml-3 text-left">Placements during the Academic Year 2019-20 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee_place_2019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Placements during the Academic Year 2018-19</summary>
                <li className="py-3 list-none ml-3 text-left">Placements during the Academic Year 2018-19 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee_place_2018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Placements during the Academic Year 2017-18</summary>
                <li className="py-3 list-none ml-3 text-left">Placements during the Academic Year 2017-18 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee_place_2017-18.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Placements during the Years 2013, 2014, 2015, 2016, 2017</summary>
                <li className="py-3 list-none ml-3 text-left">Placements during the Years 2013, 2014, 2015, 2016, 2017 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee_place_2013-17.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              </details>
            </div>
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-[#850209] mb-6 text-center">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1 flex flex-col items-center">
                  <h3 className="text-primary text-xl font-semibold mb-2">2018-22</h3>
                  <img src="https://srivasaviengg.ac.in/images/departments/eee/eeeAT1822.jpeg" alt="Image 1" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                  <h5 className="text-center my-3 text-green-700">Roll No: 19A85A0221 <br />Name: J. Mahesh Srinu</h5>
                  <img src="https://srivasaviengg.ac.in/images/departments/eee/eeeAT1822_2.jpeg" alt="Image 2" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover mt-4" />
                  <h5 className="text-center my-3 text-green-700">Roll No: 19A85A0209 <br />Name: D. Preethi</h5>
                </div>
                <div className="col-span-1 flex flex-col items-center">
                  <h3 className="text-primary text-xl font-semibold mb-2">2017-21</h3>
                  <img src="https://srivasaviengg.ac.in/images/departments/eee/eeeAT1721.jpeg" alt="Image 3" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                  <h5 className="text-center my-3 text-green-700">Roll No: 17A81A0234 <br />Name: V. Sri Naga Vijaya Lakshmi</h5>
                  <h3 className="text-primary text-xl font-semibold mb-2 mt-8">2016-20</h3>
                  <img src="https://srivasaviengg.ac.in/images/departments/eee/eeeAT1620.jpeg" alt="Image 5" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                  <h5 className="text-center my-3 text-green-700">Roll No: 16A81A0219 <br />Name: K. Ganga Prasanna</h5>
                  <h3 className="text-primary text-xl font-semibold mb-2 mt-8">2015-19</h3>
                  <img src="https://srivasaviengg.ac.in/images/departments/eee/eeeAT1519.jpeg" alt="Image 6" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                  <h5 className="text-center my-3 text-green-700">Roll No: 15A81A0226 <br />Name: N. Rishitha Anasuya Devi</h5>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Technical Association</h2>
            <div className="text-lg text-gray-700 space-y-4 mb-8">
              <p>
                LEE means "SIDE OF SOMETHING THAT IS SHELTERED FROM THE WIND" in a similar way LEE (LEAGUE OF ELECTRICAL ENGINEERS) is an Association that shelters the students from daily academics. Festival is a day to rejoice and is filled with lots of fun and excitement. Especially students feel blessed as they celebrate many festivals not only at their residence but also at college. There is an excitement all over in wearing new dresses and preparing a variety of programs. It is thrilling when there is sharing of love and happiness among the students. They come out of their daily rigmarole and rejuvenate themselves in the springs of LEE.
              </p>
              <p>
                On these days they offer to the faculty a great welcome and they even felicitate the faculty members. The importance of this function lies in celebrating it in a meaningful and purposeful way by spreading joy to one and all. LEE association was initiated by the students of 2nd batch, in 2005. From the day initiation till date Seven Anniversaries have been celebrated. This association is rising under the guidance of the chairman Dr.CH.RAMBABU Dean of Student Affairs, Dr. D Sudha Rani Head of the department (EEE). Every year this function is organised by the students of third year guided by the staff co-ordinator. All the wards from all years actively participate by extending their full support. In this function the Management gives a memento and cash prize to the students who stood as toppers in their respective classes. And also the students felicitate the faculty members as a token of gratitude and respect. The Association activities give wide scope and perpetual inspiration to the all round development of the students in EEE department.
              </p>
              <p>
                The details of the activities carried out by the society LEE-Technical Association in the last three academic years -{' '}
                <a href="https://srivasaviengg.ac.in/uploads/eee_techassociation.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
              </p>
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_lee_project1.jpg" alt="LEE Project 1" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                </div>
                <div className="flex flex-col items-center">
                  <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_lee_project2.jpg" alt="LEE Project 2" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'Technical Magazines, Handbooks and Course Materials':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Technical Activities and Handbooks</h2>
            <div className="space-y-6">
              <details open className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Technical Magazines</summary>
                <ul className="list-none py-2 mb-0 space-y-2">
                  <li>
                    ELECTRIFY Volume 1 Issue 2 August 2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/ELECTRIFY%20Volume%201%20Issue%202%20August%202022.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                  </li>
                  <li>
                    ELECTRIFY Volume 1 Issue 1 December 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/ELECTRIFY%20Volume%201%20Issue%201%20December%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                  </li>
                </ul>
              </details>
              <details className="mb-4">
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Academic HandBooks</summary>
                <ul className="list-none py-2 mb-0 space-y-2">
                  <li>
                    Academic Hand Books II-II SEM -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/eee_handbooks/II-II%20SEM.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                  </li>
                  <li>
                    Academic Hand Books III-II SEM -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/eee_handbooks/III-II%20SEM.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                  </li>
                  <li>
                    Academic Hand Books IV-II SEM -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/eee/eee_handbooks/IV-II%20SEM.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Course Materials</summary>
                <ul className="list-none py-2 mb-0 space-y-2">
                  <li>
                    Course Materials -{' '}
                    <a href="https://drive.google.com/drive/folders/1gbRiaj5jsv87blD3Be5nAZdXPvNAQuZ6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Newsletters</h2>
            <div className="space-y-4">
              <details open>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">News Letter Volume10 Issue1 2022</summary>
                <li className="py-2 text-left list-none">News Letter Volume10 Issue1 2022 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/eee_VOL-10_ISSUE-1.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">News Letter Volume9 Issue1 2018</summary>
                <li className="py-2 text-left list-none">News Letter Volume9 Issue1 2018 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/eee_VOL-9_ISSUE-1.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">News Letter Volume8 Issue1 2018</summary>
                <li className="py-2 text-left list-none">News Letter Volume8 Issue1 2018 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/eee_VOL-8_ISSUE-1.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">News Letter Volume8 Issue2 2017</summary>
                <li className="py-2 text-left list-none">News Letter Volume8 Issue2 2017 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/eee_VOL-8_ISSUE-2.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">News Letter Volume7 Issue1 2016</summary>
                <li className="py-2 text-left list-none">News Letter Volume7 Issue1 2016 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/eee_VOL-7_ISSUE-1.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">News Letter Volume7 Issue2 2016</summary>
                <li className="py-2 text-left list-none">News Letter Volume7 Issue2 2016 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/eee_VOL-7_ISSUE-2.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">News Letter Volume6 Issue1 2015</summary>
                <li className="py-2 text-left list-none">News Letter Volume6 Issue1 2015 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/VOLUME-6_ISSUE-1.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">News Letter Volume6 Issue2 2015</summary>
                <li className="py-2 text-left list-none">News Letter Volume6 Issue2 2015 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/eee/eee_newsletters/VOLUME-6_ISSUE-2.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </details>
            </div>
          </div>
        );
      case 'Product Development':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Product Development</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">The following are the list of products which were successfully developed by our students.</h3>
              <ul className="list-disc pl-8 space-y-2 text-lg">
                <li>Solar Rider</li>
                <li>Lee Eco Bike</li>
                <li>Digital Notice Board</li>
                <li>Solar Lift Irrigation System</li>
                <li>Electric Wheel Chair</li>
                <li>Multilevel Inverter</li>
                <li>Drone</li>
                <li>TriCycle with Solar Energy</li>
                <li>Self-charging of Hybrid E-bicycle</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <img src="https://srivasaviengg.ac.in/image/eee%20images/prod_devp1.jpg" alt="Product 1" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
              </div>
              <div className="flex flex-col items-center">
                <img src="https://srivasaviengg.ac.in/image/eee%20images/prod_devp2.jpg" alt="Product 2" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
              </div>
              <div className="flex flex-col items-center">
                <img src="https://srivasaviengg.ac.in/image/eee%20images/prod_devp3.jpg" alt="Product 3" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
              </div>
              <div className="flex flex-col items-center">
                <img src="https://srivasaviengg.ac.in/image/eee%20images/prod_devp4.jpg" alt="Product 4" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
              </div>
            </div>
          </div>
        );
      case 'Departmental Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Departmental Activities</h2>
            <div className="space-y-8">
              <details open>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Green Initiative</summary>
                <div className="mb-5">
                  <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center mb-8">
                      <h3 className="text-2xl font-bold text-[#850209] mb-4 text-center">As a part of green initiative college installed 500KWp solar plant in the campus.</h3>
                      <div className="w-full flex justify-center mb-4">
                        <img src="https://srivasaviengg.ac.in/image/eee%20images/green_graph.jpg" alt="Image 1" className="rounded-lg shadow-md w-full max-w-lg aspect-video object-cover" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#850209] mb-4 text-center">Inauguration of 200kWp Solar Power Plant on 11.11.2016.</h3>
                      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <img src="https://srivasaviengg.ac.in/image/eee%20images/solarplant_inag.jpg" alt="Image 2" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                        <img src="https://srivasaviengg.ac.in/image/eee%20images/solarplant_inag1.jpg" alt="Image 3" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Product Development</summary>
                <div className="mb-5">
                  <p className="mb-4">The following are the list of products which were successfully developed by our students.</p>
                  <ul className="list-disc pl-8 space-y-2 text-lg mb-6">
                    <li>Solar Rider</li>
                    <li>Lee Eco Bike</li>
                    <li>Digital Notice Board</li>
                    <li>Solar Lift Irrigation System</li>
                    <li>Electric Wheel Chair</li>
                    <li>Multilevel Inverter</li>
                    <li>Drone</li>
                    <li>TriCycle with Solar Energy</li>
                    <li>Self-charging of Hybrid E-bicycle</li>
                  </ul>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_da1.jpg" alt="Product 1" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_da2.jpg" alt="Product 2" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_da3.jpg" alt="Product 3" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_da4.jpg" alt="Product 4" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_da5.jpeg" alt="Product 5" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_da6.jpeg" alt="Product 6" className="rounded-lg shadow-md w-full aspect-video object-cover" />
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Green Initiative':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Departmental Activities</h2>
            <div className="space-y-8">
              <details open>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Green Initiative</summary>
                <div className="mb-5">
                  <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center mb-8">
                      <h3 className="text-2xl font-bold text-[#850209] mb-4 text-center">As a part of green initiative college installed 500KWp solar plant in the campus.</h3>
                      <div className="w-full flex justify-center mb-4">
                        <img src="https://srivasaviengg.ac.in/image/eee%20images/green_graph.jpg" alt="Image 1" className="rounded-lg shadow-md w-full max-w-lg aspect-video object-cover" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#850209] mb-4 text-center">Inauguration of 200kWp Solar Power Plant on 11.11.2016.</h3>
                      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <img src="https://srivasaviengg.ac.in/image/eee%20images/solarplant_inag.jpg" alt="Image 2" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                        <img src="https://srivasaviengg.ac.in/image/eee%20images/solarplant_inag1.jpg" alt="Image 3" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </details>

            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Extra Curricular Activities</h2>
            <div className="space-y-8">
              <details open>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">Social Service Activities</summary>
                <ul className="py-2 pl-0">
                  <li className="m-3 text-center list-none">Continuous social service activities are carried out by the students under LEE Association, with the support of the Head of the Department and all the faculty members.</li>
                </ul>
                <div className="mb-5 px-5">
                  <div className="flex flex-col items-center justify-center">
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_ssa1.jpg" alt="Social Service Activity" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                    <p className="text-center font-semibold mt-2">Our 3rd Year B.Tech Students at Orphan Home</p>
                  </div>
                </div>
              </details>
              <details>
                <summary className="text-lg font-semibold text-[#850209] cursor-pointer">LEE 7th Anniversary Celebrations</summary>
                <div className="mb-5 p-5">
                  <p>LEE 7TH anniversary was organised by 2009-2013 batch students on 17th of February 2012. The chief guest for this anniversary is our honourable president SRIGRANDHI.SATYANARAYANA followed by the principal Dr.J.SRI HARI RAO & Chairman of LEE Mr.CH.RAMBABU. It was celebrated in the presence of all the faculty members and students of all years. Prizes are given to all of the winners of various events conducted, and also for the rank holders in previous semesters. Apart from this students give a rocking performance in cultural.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_le1.jpg" alt="LEE 7th Anniversary 1" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_le2.jpg" alt="LEE 7th Anniversary 2" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_le3.jpg" alt="LEE 7th Anniversary 3" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                    <img src="https://srivasaviengg.ac.in/images/departments/eee/eee_le4.jpg" alt="LEE 7th Anniversary 4" className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover" />
                  </div>
                </div>
              </details>
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
            <h1 className="text-3xl md:text-4xl font-bold">Electrical & Electronics Engineering</h1>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-full flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-4">
                <span className="font-bold">Department Menu</span>
                <Menu className="w-6 h-6" />
              </button>
              <nav className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                <h3 className="text-xl font-bold text-primary mb-4 hidden lg:block">Department Menu</h3>
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 text-sm ${activeContent === item.id ? 'bg-primary text-white font-semibold shadow-md' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                          setActiveContent(item.id);
                          setSidebarOpen(false);
                        }}
                      >
                        {typeof item.icon === 'function' ? item.icon() : <ChevronRight className="w-4 h-4" />}
                        <span className="ml-2">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EEEDepartment;
