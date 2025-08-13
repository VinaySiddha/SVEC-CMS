
import React, { useState } from 'react';
import { Database, BookOpen, Award, ExternalLink, Menu, ChevronRight, FileText, Users, Briefcase, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const CSEDSDepartment: React.FC = () => {
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const faculty = [  
        { name: "Dr. G. Loshma", qualification: "Ph.D.", designation: "Head & Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Dr.G.Loshma.pdf" },
        { name: "Dr. E. Aswani Kumar", qualification: "Ph.D.", designation: "Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. E. Aswani Kumar.pdf" },
        { name: "Mrs. A. Leelavathi", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_A.%20Leelavathi.pdf" },
        { name: "Mr. R.L. Phani Kumar", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_R.L. Phani Kumar.pdf" },
        { name: "Mr. M. Subba Rao", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. M. Subba Rao.pdf" },
        { name: "Mr. P. V. V. Satyanarayana", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P. V. V Satya Narayana.pdf" },
        { name: "Mr. V. Rama Narayana", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. V. Rama Narayana.pdf" },
        { name: "Mrs. V. Radha", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mrs. V. Radha.pdf" },
        { name: "Mr. A. Rajesh", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_A.Rajesh.pdf" },
        { name: "Mr. D. Ayyappa", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. D. Ayyappa.pdf" },
        { name: "Mr. M. Yesu Sekharam", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_M. Y. SEKHARAM.pdf" },
        { name: "Mrs. K. Durga Saranya", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. K. Durga Saranya.pdf" },
        { name: "Mr. Shaik Moulali", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Sk. Moulali.pdf" },
        { name: "Mrs. P. Ujwala Sai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_P. Ujwala.pdf" },
        { name: "Mrs. M. Kiranmai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Ms. M. Kiranmai.pdf" },
        { name: "Mr. V. Thinakaran", qualification: "M.E.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr .V. Thinakaran.pdf" },
        { name: "Mr. P. Seshu Kumar", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P Seshu Kumar.pdf" },
        { name: "Mrs. G. Kalyani", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. G Kalyani.pdf" },
        { name: "Mrs. Pratyusha Ch.", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. Prathyusha Ch.pdf" },
        { name: "Mr. A. Reddy Chaitanya", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
        { name: "Dr. Jagadish Kumar K B", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. Jagadish Kumar KB.pdf" },
        { name: "Mr. Nishanth N S", qualification: "M.E.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr.Nisanth N S.pdf" },
        { name: "Mr. B. V. V. Bhargav", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Bhargav-BVV.pdf" },
        { name: "Mr. V. Jaya Rama Krishna", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. V. Jayaramakrishna.pdf" },
        { name: "Dr. M. Vishnuvardhan", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Dr. M Vishnuvardhan.pdf" },
        { name: "Mrs. Jane Rose", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
        { name: "Dr. J. Kondala Rao", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. K. Jyothi.pdf" },
        { name: "Mrs. Balaji Rohitha", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_DS_Mrs. B. Rohitha.pdf" },
        { name: "Mr. Jewaliddin Shaik", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
        { name: "Ms. Sneha Pradhan", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. P. Sneha.pdf" }
    ];

    const nonTeachingFaculty = [
        { name: "Mr. K. N. Suresh", designation: "System Admin" },
        { name: "Mr. Md. Arriff", designation: "Lab Assistant" },
        { name: "Mrs. D. Bhagya Lakshmi", designation: "Lab Technician" },
        { name: "Mrs. B. Yamini", designation: "Lab Technician" },
        { name: "Mr. K. V Srinivasa Rao", designation: "Hardware Technician" },
        { name: "Mr. G. Bhanu Prakash", designation: "Hardware Technician" },
        { name: "Mr. N. RajaseKhar", designation: "Junior Assistant" },
        { name: "Mr. Prasad", designation: "Attender" }
    ];

    const boardOfStudies = [
        { name: "Dr. G. Loshma", designation: "Professor & HOD", organization: "SVEC", position: "Chairperson" },
        { name: "Dr. L. Sumalatha", designation: "Professor, CSE", organization: "UCEK,JNTUK", position: "University Nominee" },
        { name: "Dr. R. B. V Subrahmanyam", designation: "Professor, CSE", organization: "NITW, TG", position: "Academic Expert" },
        { name: "Dr. K. Himabindu", designation: "Dean, Student Welfare", organization: "NIT-AP, AP", position: "Academic Expert" },
        { name: "Mr. Ch. Pavan Kumar", designation: "Delivery Partner/Solution Architect", organization: "TCS, Hyderabad", position: "Industry Expert" },
        { name: "Mr. N. Sattibabu", designation: "Lead Consultant", organization: "Infosys Limited, Hyderabad", position: "Alumni" }
    ];


  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                The Department of Computer Science and Engineering (Data Science) came into inception from 2024 onwards with an intake of 60 seats in B.Tech.
              </p>
              <p className="mb-4">
                Data Science is a multidisciplinary field that combines mathematics, statistics, and computer science to extract knowledge and insights from structured and unstructured data. Our department focuses on providing students with the necessary skills to analyze complex data sets, develop machine learning models, and make data-driven decisions.
              </p>
              <p className="mb-4">
                The department has well-qualified faculty members with expertise in various domains like Machine Learning, Artificial Intelligence, Big Data Analytics, Data Visualization, and Statistical Analysis.
              </p>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#B22222] shadow-md">
              <p className="text-gray-700 italic">
                "To evolve as a centre for academic and research excellence in the area of Data Science."
              </p>
            </div>
          </div>
        );
      case 'Mission':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  To utilize innovative learning methods for academic improvement.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  To encourage higher studies and research to meet the futuristic requirements of Data Science.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  To inculcate Ethics and Human values for developing students with good character.
                </p>
              </div>
            </div>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 1:</h4>
                <p className="text-gray-700">
                  Adapt to evolving technology.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 2:</h4>
                <p className="text-gray-700">
                  Provide optimal solutions to real time problems.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 3:</h4>
                <p className="text-gray-700">
                  Demonstrate his/her abilities to support service activities with due consideration for Professional and Ethical Values.
                </p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 1: Engineering knowledge</h4>
                <p className="text-gray-700">Apply the knowledge of Mathematics, Science, Engineering Fundamentals, and Concepts of Computer Science Engineering(DS) to the solution of complex Engineering problems.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of Mathematics, Natural Sciences, and Computer Science.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 3: Design/development of solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and design system components or processes that meet the specific needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental considerations.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 4: Conduct investigations of complex problems</h4>
                <p className="text-gray-700">Use research-based knowledge and research methods, including the design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 5: Modern tool usage</h4>
                <p className="text-gray-700">Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling, to complex Engineering activities with an understanding of the limitations.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PSO 1:</h4>
                <p className="text-gray-700">
                  Apply knowledge of data science concepts, tools, and technologies to solve real-world problems across various domains.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PSO 2:</h4>
                <p className="text-gray-700">
                  Design and implement data-driven solutions using machine learning algorithms, statistical analysis, and data visualization techniques.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PSO 3:</h4>
                <p className="text-gray-700">
                  Develop skills in emerging areas such as big data analytics, natural language processing, and deep learning to meet industry requirements.
                </p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              Each course in the CSE(DS) curriculum has specific Course Outcomes that align with the Program Outcomes and Program Specific Outcomes. These Course Outcomes are measurable and ensure that students acquire the intended knowledge and skills from each course.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">
                For detailed Course Outcomes of each subject, please refer to the course syllabi available in the Syllabus section.
              </p>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Curriculum designed in consultation with industry experts focusing on data science skills</li>
              <li>State-of-the-art computing facilities with high-performance computing resources</li>
              <li>Specialized labs for Big Data Analytics, Machine Learning, and Data Visualization</li>
              <li>Industry partnerships for internships and project opportunities</li>
              <li>Regular workshops and guest lectures by data science professionals</li>
              <li>Focus on hands-on learning through real-world projects</li>
              <li>Research opportunities in emerging data science domains</li>
              <li>Professional development through certification programs</li>
              <li>Career guidance and placement assistance in data science roles</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="py-6">
            <p className="text-center text-gray-500">Select a tab to view content</p>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>

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

            {/* HOD Information - Always show at the top of Department Profile */}
            {activeDeptTab === 'Department' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
                <div className="relative">
                  <img
                    src="/images/departments/cai/aihod.jpg"
                    alt="Dr. G. Loshma"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, CSE(DS)</p>
                    <p className="text-gray-600">Phone: 08818-284355 (O)-(Ext.-377)</p>
                    <p className="text-gray-600">Email: <a href="mailto:hod_ds@srivasaviengg.ac.in" className="text-primary hover:underline">hod_ds@srivasaviengg.ac.in</a></p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    "Welcome to the Department of Computer Science & Engineering (Data Science). The department came into inception from 2024 onwards with an intake of 60 seats in B.Tech. We focus on providing students with strong foundations in data science through our state-of-the-art facilities and experienced faculty."
                  </p>
                </div>
              </div>
            )}

            {/* Content Area that changes completely based on selected tab */}
            {renderDeptTabContent()}
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Our Faculty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faculty.map((member, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all group">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#B22222]"
                      data-ai-hint="professional portrait"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold text-[#B22222]">{member.name}</h3>
                      <p className="text-[#8B0000] font-medium">{member.position}</p>
                      <p className="text-sm text-gray-600 mt-1">{member.qualification}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">CSE - Data Science</h1>
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
        title="CSE-DS Department"
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

export default CSEDSDepartment;
