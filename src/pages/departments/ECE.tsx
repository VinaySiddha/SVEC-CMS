
import React, { useState } from 'react';
import { Radio, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon, Settings } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const ECEDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Clubs', label: 'Clubs', icon: <Activity className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops/SOC/Guest Lecturers', label: 'Workshops/SOC/Guest Lecturers', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Merit Scholarship/Academic Toppers', label: 'Merit Scholarship/Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Settings className="w-4 h-4" /> },
    { id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <FileText className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Faculty Innovations in Teaching & Learning', label: 'Faculty Innovations in Teaching & Learning', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const faculty = [
    { name: "Dr.E.Kusuma Kumari", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ece_Dr.%20E.%20Kusuma%20Kumari.pdf" },
    { name: "Dr.M.Thamari", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_M.Thamarai.pdf" },
    { name: "Dr.M.Koteswara Rao", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20M.Koteswara%20Rao.pdf" },
    { name: "Dr.Purnima K.Sharma", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20Purnima.pdf" },
    { name: "Mr.K.N.H Srinivas", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.K.N.H%20Srinivas.pdf" },
    { name: "Mr.Tota Sreenivas", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20Thota.%20Srinivas.pdf" },
    { name: "Mr.G.Shankara Bhaskara Rao", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20Shankar%20Bhaskar%20Rao.pdf" },
    { name: "Dr.T.D.N.S.S.Sarveswararao", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.T.D.N.S.S.RAO.pdf" },
    { name: "Dr.T.V.N.L.Aswini", qualification: "M.Tech;,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.T.N.L.Ashwini.pdf" },
    { name: "Mrs.Y.Sujatha", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.Y.Sujatha.pdf" },
    { name: "Mr.D.R.Sandeep", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.D.R%20Sandeep.pdf" },
    { name: "Mr.T.Sreenivasu", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.T.Sreenivasu.pdf" },
    { name: "Mr.M.Subba Rao", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.Subba%20Rao.pdf" },
    { name: "Mr.P.Gopala Reddy", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.P.Gopal%20Reddy.pdf" },
    { name: "Mr.P.V.V.Satyanarayana", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.P.V.V%20Satyanarayana.pdf" },
    { name: "Mr.R.Ramprasad", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20R.%20RAMPRASAD%20.pdff" },
    { name: "Mr.G.V.Subrahmanyam", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.G.V.Subrahmanyam.pdf" },
    { name: "Mr.J.Rajendra", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.J.Rajendra.pdf" },
    { name: "Dr. S.V.V.Satyanarayana", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.S.V.V%20Satyanarayana.pdf" },
    { name: "Mrs.V.Radha", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.V.Radha.pdf" },
    { name: "Mr.R.L.R Lokesh Babu", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.R.L.R%20Lokesh%20Babu.pdf" },
    { name: "Mr.M.Vinod Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.M.Vinod%20Kumar.pdf" },
    { name: "Mr.S.Kamesh", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.S.Kamesh.pdf" },
    { name: "Mr.M.Venkata Suman", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.Venkata%20Suman.pdf" },
    { name: "Ms.K.Durga Saranya", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.K.Durga%20Saranya.pdf" },
    { name: "Mr.B.Murali Krishna", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.B.Murali%20Krishna.pdf" },
    { name: "Ms.V.Anil Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20V.%20Anil%20Kumar.pdf" },
    { name: "Mr.D.Venkanna Babu", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20D.%20Venkanna%20Babu.pdf" },
    { name: "Mr.B.Ashok Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20B.%20Ashok%20Kumar.pdf" },
    { name: "Ms.L.Bharani", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20L.%20Bharani.pdf" },
    { name: "Mr.M.pitchaiah", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.%20Pitchaiah.pdf" },
    { name: "Dr. V Jaya Prakash", qualification: "M.Tech.,Ph.D", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.i%20V.%20Jaya%20Prakash.pdf" },
    { name: "Ms.V.V.Naga Lakshmi", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20V.%20V.%20Nagalakshmi.pdf" },
    { name: "Ms.P.Harshini", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20P.%20Harshini.pdf" },
    { name: "Mrs. K. Indira Priya Darshini", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20K.%20INDIRA%20PRIYADARSHINI.pdf" },
  ];

  const nonTeachingFaculty = [
    { name: "Mr.M.V.V.Satyanarayana", designation: "Lab Tech." },
    { name: "Mr.Sk.Mastan Vali(Shabbir)", designation: "Lab Tech." },
    { name: "Mr.Y.Narasimha Rao", designation: "Lab Tech." },
    { name: "Mr.G.Jani Babu", designation: "Lab Tech." },
    { name: "Mr.M.Naga Kavya", designation: "Lab Tech." },
    { name: "Mr.P.Naresh", designation: "Lab Tech." },
    { name: "Mr.G.S.C.V.Padmakar", designation: "D.E.O" },
    { name: "Ms.G.Kalyani Durga", designation: "D.E.O" },
    { name: "Mr.M.Sai Naveen Kumar", designation: "Attender" },
    { name: "Mr.B.Srinivisa Rao", designation: "Attender" },
    { name: "Mr.L.Phani Pallavi", designation: "Attender" },
  ];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div>
            {/* Head of Department's Message */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="relative">
                  <img
                    src="/ecehod.jpg"
                    alt="Dr. E. Kusuma Kumari"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. E. Kusuma Kumari</h3>
                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, ECE</p>
                    <p className="text-gray-600">Ph.D, M.Tech</p>
                    <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                    <p className="text-gray-600">Fax No: 08818-284322</p>
                    <p className="text-gray-600">Email: <a href="mailto:hod_ece@srivasaviengg.ac.in" className="text-primary hover:underline">hod_ece@srivasaviengg.ac.in</a></p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to the Department of Electronics and Communication Engineering at Sri Vasavi Engineering College. Our department is committed to providing high-quality education in electronics and communication engineering, fostering innovation, and preparing our students for successful careers in the rapidly evolving technology sector.
                    <br /><br />
                    Our state-of-the-art laboratories and dedicated faculty members ensure that our students receive both theoretical knowledge and practical experience. We focus on:
                    <br />
                    • Industry-relevant curriculum with regular updates<br />
                    • Hands-on training with modern equipment and software<br />
                    • Research opportunities and innovative projects<br />
                    • Industry collaborations and internships<br />
                    • Professional development through workshops and seminars<br />
                    <br />
                    Our department takes pride in our achievements, including:
                    <br />
                    • Successful placement records<br />
                    • Research publications in prestigious journals<br />
                    • Faculty with extensive industry and academic experience<br />
                    • Strong industry connections<br />
                    • Active student technical associations
                    <br /><br />
                    We invite you to explore the opportunities our department offers and join us in shaping the future of electronics and communication technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Department Overview Section */}
            <div className="border-t pt-10 mt-10">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Department of Electronics and Communication Engineering was established in the year 2001 with an initial intake of 60 students. Over the years, it has grown significantly with a current intake of 120 students. The department has well-equipped laboratories, qualified faculty, and modern facilities.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Department offers a B.Tech program in Electronics and Communication Engineering, providing students with comprehensive knowledge in the fields of communication systems, signal processing, VLSI design, embedded systems, and more.
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
                      <td className="px-6 py-4">B.Tech-Electronics and Communication Engineering</td>
                      <td className="px-6 py-4">AP EAPCET</td>
                      <td className="px-6 py-4">4 Years</td>
                      <td className="px-6 py-4">120</td>
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
              To evolve into a center of excellence in Electronics and Communication Engineering education and research, producing professionally competent and socially responsible engineers.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To impart quality education through effective teaching-learning processes.</li>
              <li>To provide excellent infrastructure and environment conducive for research.</li>
              <li>To enhance industry-institute interaction to make students industry-ready.</li>
              <li>To develop entrepreneurship skills and ethical values among students.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and electronics & communication engineering principles.</li>
              <li>Analyze real-life problems and design socially responsible and environmentally sustainable electronics-based solutions.</li>
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
              <li><strong>Engineering Knowledge:</strong> Apply knowledge of mathematics, science, engineering fundamentals, and electronics & communication engineering principles to solve complex engineering problems.</li>
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
              <li>Apply the knowledge of electronics devices and circuits for the design of systems in the field of communications.</li>
              <li>Apply engineering techniques to design, analyze and implement signal processing systems.</li>
              <li>Develop applications using embedded systems and VLSI technology for real-world problems.</li>
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
              <a href="https://srivasaviengg.ac.in/uploads/ece/COs.pdf" className="text-[#B22222] hover:underline">Download Course Outcomes Document</a>
            </p>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Experienced and dedicated faculty members with specializations in various domains</li>
              <li>State-of-the-art laboratories with modern equipment</li>
              <li>Strong industry-institute interaction through internships, projects, and expert lectures</li>
              <li>Research culture fostering innovation and intellectual growth</li>
              <li>Active student chapters and technical clubs</li>
              <li>Regular workshops, seminars, and training programs on emerging technologies</li>
              <li>Excellent placement record in reputed companies</li>
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

            {/* Content Area that changes completely based on selected tab */}
            {renderDeptTabContent()}
          </div>
        );

      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Physical Facilities</h2>
            <div className="space-y-8">
              {/* Class Rooms & Time Tables */}
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Class Rooms &amp; Class Time Tables</summary>
                <div className="p-4 space-y-6">
                  <div>
                    <h5 className="font-semibold mb-2">Class Rooms</h5>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Class Rooms with ICT Enabled Facilities -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/Class%20Rooms%20Photos.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Class Time Tables</h5>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>ECE Master Timetable_A.Y for Sem-II 2022-23 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%202nd%20SEM%20%20MasterTime%20Tables.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>ECE Master Timetable_A.Y for Sem-I 2022-23 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%201st%20SEM%20%20MasterTime%20Tables.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>ECE Master Timetable_A.Y for Sem-II 2021-22 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2021-22%202nd%20SEM%20%20Master%20Time%20Tables.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>ECE Master Timetable_A.Y for Sem-I 2021-22 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2021-22%201st%20SEM%20%20Master%20Time%20Tables.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>B.Tech IV Semester Time Table 2020-21 wef(21-03-2022) -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/IV%20Semester%20Time%20Table%202020-21wef%2021-03-2022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>B.Tech VII Semester Timetable_A.Y for Sem-I 2021-22 wef(04-10-2021) -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/VII%20Semester%20Time%20Table%202020-21wef%2004-10-2021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
              {/* Laboratories */}
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Laboratories</summary>
                <div className="p-4 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Major Equipment Available</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Xilinx University CPLD Boards, Spartan-3E FPGA Boards - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Embedded System ATMEL ARM 9 Boards, HAWK Boards (ARM 9 &amp; OMAP L138) - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Analog &amp; Digital Communication Kits - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Digital Storage Oscilloscopes GDS 1102U - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Microwave Benches (X-Band) - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Optical Communication Trainer Kits - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Texas Instrumentation DSP Starter Kits (DSK) TMS320C6713 - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>MicroController Trainer and Development Boards - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Universal IC Tester - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Antenna Trainer Kit - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>RIGO Spectrum Analyzer With Tracking Generator - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Major Software Available</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Mentor Graphic's Higher Education Programme 1 (HEP 1) @ 75 User - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>MATLAB R2018b version with Different Tool Boxes @ 100 User - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Labtek Spice Simulation Software @ Unlimited User - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Code Composer Studio Software 3.0 @ Unlimited User - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>Xilinx System Edition Software 12.2i @ 25 User - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                      <li>HFSS Antenna tool @ 1 User research version and 5 Users Academic version - <a href="#" className="text-[#850209] font-semibold hover:underline">View</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Laboratory Facilities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        "https://srivasaviengg.ac.in/image/ece%20images/Electronic%20devices%20and%20Circuits%20Lab%204.JPG",
                        "https://srivasaviengg.ac.in/image/ece%20images/Electronic%20devices%20and%20Circuits%20Lab%205.JPG",
                        "https://srivasaviengg.ac.in/image/ece%20images/Digita-Communications-Lab-1.gif",
                        "https://srivasaviengg.ac.in/image/ece%20images/Digita-Communications-Lab--.gif",
                        "https://srivasaviengg.ac.in/image/ece%20images/Microprocessor-and-interfac3.jpg",
                        "https://srivasaviengg.ac.in/image/ece%20images/Microprocessor-and-interfac4.jpg",
                        "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm.gif",
                        "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm7.gif",
                        "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm6.gif",
                        "https://srivasaviengg.ac.in/image/ece%20images/ECAD-Lab-3.gif",
                        "https://srivasaviengg.ac.in/image/ece%20images/IOT%20LAB.jpg",
                        "https://srivasaviengg.ac.in/image/ece%20images/ECAD-Lab-4.gif",
                        "https://srivasaviengg.ac.in/image/ece%20images/Isaac%20Asimov%20Space%20Centre.jpg",
                        "https://srivasaviengg.ac.in/image/ece%20images/SPLab.jpg"
                      ].map((src, idx) => (
                        <img key={idx} src={src} alt={`Lab Image ${idx + 1}`} className="rounded-lg shadow-md w-full h-auto object-cover" />
                      ))}
                    </div>
                  </div>
                </div>
              </details>
              {/* Department Library */}
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Department Library</summary>
                <div className="p-4 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                    <img src="https://srivasaviengg.ac.in/image/ecelibrary/Deprtmnt%20Lib.JPG" alt="Library 1" className="rounded-lg shadow-md w-full h-auto object-cover" />
                    <img src="https://srivasaviengg.ac.in/image/ecelibrary/Deprtmnt%20Lib1.JPG" alt="Library 2" className="rounded-lg shadow-md w-full h-auto object-cover" />
                  </div>
                  <h5 className="text-center font-semibold">The department runs an exclusive department Library to the benefit of Faculty as well as students.</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm mt-4">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2">S.No.</th>
                          <th className="px-4 py-2">Academic Year</th>
                          <th className="px-4 py-2">No. of Titles</th>
                          <th className="px-4 py-2">No. of Volumes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">2018-2019</td><td className="px-4 py-2">454</td><td className="px-4 py-2">594</td></tr>
                        <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">2017-2018</td><td className="px-4 py-2">454</td><td className="px-4 py-2">594</td></tr>
                        <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">2016-2017</td><td className="px-4 py-2">437</td><td className="px-4 py-2">585</td></tr>
                        <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">2015-2016</td><td className="px-4 py-2">329</td><td className="px-4 py-2">532</td></tr>
                        <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">2014-2015</td><td className="px-4 py-2">248</td><td className="px-4 py-2">532</td></tr>
                        <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">2013-2014</td><td className="px-4 py-2">203</td><td className="px-4 py-2">498</td></tr>
                        <tr><td className="px-4 py-2">7</td><td className="px-4 py-2">2012-2013</td><td className="px-4 py-2">167</td><td className="px-4 py-2">477</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center mt-4">
                    <h2 className="text-lg font-semibold">Faculty Incharge</h2>
                    <p><b>Phone:</b> 9010146496</p>
                    <p><b>Email:</b> hyma_369@yahoo.co.in</p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Syllabus</h2>
            <div className="container mx-auto">
              <div className="space-y-6">
                <details className="border rounded-lg">
                  <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">B.Tech (ECE &amp; ECT)</summary>
                  <div className="p-4">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>B.Tech - V23 Syllabus -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/syllabus/ECE B.Tech- V23 Syllabus.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>B.Tech - V20 Syllabus -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/syllabus/B.%20Tech%20ECE%20-Autonomous%20(V%2020%20-%20Reg)%20syllabus.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>B.Tech - V18 Syllabus -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/syllabus/B.%20Tech%20ECE%20-Autonomous%20(V18-%20Reg)%20Syllabus.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                    </ul>
                  </div>
                </details>
                <details className="border rounded-lg">
                  <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">M.TECH</summary>
                  <div className="p-4">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>M.Tech - V21 Syllabus -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/syllabus/M.%20Tech%20(ES%20&%20VLSI)-V21%20Reg.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>M.Tech - V18 Syllabus -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/syllabus/Electronics%20&%20Communication%20Engineeringv18.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                    </ul>
                  </div>
                </details>
                <details className="border rounded-lg">
                  <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">SOC Syllabus</summary>
                  <div className="p-4">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>SOC Syllabus during the Academic Year 2023-24 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>SOC Syllabus during the Academic Year 2022-23 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                      <li>SOC Syllabus during the Academic Year 2021-22 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View</a>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        );
      case 'Faculty Innovations in Teaching & Learning':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Innovations in Teaching & Learning</h2>
            <div className="space-y-4">
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">Faculty Innovations in Teaching & Learning</summary>
                <div className="p-4">
                  <h3 className="text-xl text-center text-[#850209] font-semibold mb-2">e-Resources</h3>
                  <p>
                    Activities of the department towards improvement in teaching-learning are indicated in the office records as well as on college website. They are open for reproduction or for further improvement or for review or critique..
                  </p>
                  <p className="mt-2">
                    <b>Some of the methods adopted by the faculty members in Teaching &amp; Learning are:</b>
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Making use of Power Point Presentation, wherever necessary</li>
                    <li>Technical Videos for demonstration of certain concepts or functioning of the devices.</li>
                    <li>Usage of Tools like MATLAB, Mentor Graphics etc, to demonstrate concepts, through simulation.</li>
                    <li>Use of E-Learning Resources like NPTEL lectures, on-line journals and on-line lectures like QEEE &amp; MOOCS for effective learning.</li>
                    <li>Providing Question bank with short answer questions and quiz questions.</li>
                    <li>Hands-on practice in the laboratories for better understanding of the concepts taught in the theory classes.</li>
                    <li>Visits to nearby industries for exposure.</li>
                    <li>Project exhibitions and poster presentations.</li>
                    <li>Student seminars.</li>
                    <li>
                      <span>Z to A Teaching Learning Method</span>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">e-Learning</summary>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    E-learning -{' '}
                    <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                  <li>
                    NPTEL videos -{' '}
                    <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">PPT's</summary>
                <div className="p-4">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Antennas and Wave Propagation - <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Biomedical Engineering - <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Antennas and Wave Propagation - <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital Communications- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital IC Applications- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital Image Processing- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital Signal Processing- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Micro Processors &amp; Micro Controllers- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Optical Communications- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Radar Systems- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Radar Systems- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Satellite Communications- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>VLSI- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                  </ul>
                </div>
              </details>
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">Technical Videos</summary>
                <div className="p-4">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Fourier Transform- <a href="https://www.youtube.com/watch?v=r18Gi8lSkfM" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Circuits and electronics - <a href="https://www.youtube.com/watch?v=AfQxyVuLeCs&list=PL9F74AFA03AA06A11" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Signals and Systems - <a href="https://www.youtube.com/watch?v=KJnAy6hzetw&list=PLLNp7XoiSLQYygYw8Mzt763zZCQdzCZcd" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>DigitalSignal processing <a href="https://www.youtube.com/watch?v=rkvEM5Y3N60&list=PL8157CA8884571BA2" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Electronic circuits <a href="https://www.youtube.com/watch?v=yQDfVJzEymI&list=PL7qUW0KPfsIIOPOKL84wK_Qj9N7gvJX6v" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital communications <a href="https://www.youtube.com/watch?v=KXFF8m4uGDc&list=PL2AD004D035C24F21" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                  </ul>
                </div>
              </details>
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">Question Banks</summary>
                <div className="p-4">
                  <h3 className="text-xl text-center text-[#850209] font-semibold mb-2">R16</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>EDC- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/EDC.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Signals and Systems - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/Signals%20and%20Systems.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                  </ul>
                  <h3 className="text-xl text-center text-[#850209] font-semibold mt-4 mb-2">R13</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>BME- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/BME.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital Communication - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/Digital%20Communication.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>DSD &amp; Digital IC Applications- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/DSD&DICA.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Linear Ic Applications- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/LICA%20Unitwise%20QB%20OBE%202016-17%2005-02-2018.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Low Power IC Design - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/LPICD.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Microprocessor &amp; Microcontrollers - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/MPMC.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Random Variables &amp; Stochastic Processes - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/RVSP.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Randar Systems - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/RS.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>STLD- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/STLD.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>VLSI DESIGN - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/VLSI.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Handbooks':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Academic HandBooks</h2>
            <div className="space-y-6">
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Academic year 2020-21</summary>
                <ul className="pt-3 list-disc pl-6 space-y-2">
                  <li>
                    III-Sem 2020-21 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/ece_Academic%20Handbook%20III%20Sem%202020-21.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV B.Tech I-sem 2020-21 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/ece_Academic%20Handbook%20IV%20B.Tech%20I%20Sem%202020-21.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Academic year 2019-20</summary>
                <ul className="pt-3 list-disc pl-6 space-y-2">
                  <li>
                    II-B.Tech II-Sem V18(Autonomous) 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20II%20Sem%20(%20Autonomous)%20%20Hand%20book%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    III-B.Tech II-Sem R16 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20II%20Sem%20Hand%20book%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV-B.Tech II-Sem R16 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20II%20Sem%20Hand%20Book%20%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    II-B.Tech I-Sem V18(Autonomous) 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20I%20Sem%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    III-B.Tech I-Sem R16 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20I%20Sem%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV-B.Tech I-Sem R16 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20I%20Sem%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Academic year 2018-19</summary>
                <ul className="pt-3 list-disc pl-6 space-y-2">
                  <li>
                    II-B.Tech II-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20II%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    III-B.Tech II-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20II%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV-B.Tech II-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20II%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>
                    II-B.Tech I-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20Ist%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    III-B.Tech I-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20Ist%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV-B.Tech I-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20Ist%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
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
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Extra-Curricular Activities</h2>
            {/* Extracurricular Activities List */}
            <div className="mb-8">
              <ul className="list-disc pl-6 space-y-2 text-center">
                {[{
                  year: '2022-23',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202022-23.pdf'
                }, {
                  year: '2021-22',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202021-22.pdf'
                }, {
                  year: '2019-20',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities19-20.pdf'
                }, {
                  year: '2018-19',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities18-19.pdf'
                }, {
                  year: '2017-18',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities17-18.pdf'
                }, {
                  year: '2016-17',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities16-17.pdf'
                }, {
                  year: '2015-16',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities15-16.pdf'
                }].map((item, idx) => (
                  <li key={idx} className="activity-item">
                    Extracurricular activities during the Year {item.year} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] font-semibold hover:underline"
                    >
                      View More
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Departmental Sports Meet */}
            <h2 className="text-2xl font-bold mb-4 text-center">Departmental Sports Meet-2k17</h2>
            <div className="mb-8">
              <ul className="list-disc pl-6 space-y-2 text-center">
                {[{
                  label: 'Prize Distribution to Kabaddi winners and runners',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Prize%20Distribution%20to%20Kabaddi%20winners%20and%20runners.pdf'
                }, {
                  label: 'Prize Distribution to Cricket winners and runners',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Prize%20Distribution%20to%20Cricket%20winners%20and%20runners.pdf'
                }].map((item, idx) => (
                  <li key={idx} className="activity-item">
                    {item.label} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] font-semibold hover:underline"
                    >
                      View More
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Departmental Cultural Meet */}
            <h2 className="text-2xl font-bold mb-4 text-center">
              Departmental Cultural Meet-2k17 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Departmental%20Cultural%20Meet2k17.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#850209] font-semibold hover:underline"
              >
                View More
              </a>
            </h2>
            {/* Industrial Visit */}
            <h2 className="text-2xl font-bold mb-4 text-center">Industrial Visit</h2>
            <div className="mb-8">
              <ul className="list-disc pl-6 space-y-2 text-center">
                {[{
                  label: 'Industrial Visit On 13th & 14th Dec 18 to RADAR Weather station and PrasaraBharathi Vizag',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/industrial%20visit_19.pdf'
                }, {
                  label: 'Industrial Visit On 18th & 20th Nov 18 to SrihariKota',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Industrial%20Visit%20RADAR%20photos.pdf'
                }, {
                  label: 'Industrial Visit On 6th & 7th Oct 17 to RADAR Weather station and PrasaraBharathi Vizag',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202021-22.pdf'
                }, {
                  label: 'Industrial Visit On 2nd & 3rd Sep 16 to Steel Plant Vizag',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/industrial%20visit.pdf'
                }].map((item, idx) => (
                  <li key={idx} className="activity-item">
                    {item.label} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] font-semibold hover:underline"
                    >
                      View More
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Blood Donation Camp */}
            <h2 className="text-2xl font-bold mb-4 text-center">
              Blood Donation Camp -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Blood%20Donation%20Camp3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#850209] font-semibold hover:underline"
              >
                View More
              </a>
            </h2>
            {/* YUVA Section */}
            <h2 className="text-2xl font-bold mb-4 text-center">YUVA</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-2">Social Services</h3>
              <p className="mb-2">
                There are many people who like to donate things to the poor and needy because they are blessed with every comfort and know that others are struggling,. It is everyone's courtesy to help poor children who are less fortunate, though. If you are helping someone in their need, then you are doing the right thing by providing them with the essentials. In this world it is a fact that whatever seed you sow, that's the sort of fruit you'll get.So, if we are ready to help people then we'll also get someone to help in our hour of need. Things change with the passage of time, bringing new situations to everyone's lives.
              </p>
              <p className="mb-4">
                With this motto the Department of ECE of Sri Vasavi Engineering College has started in <b>"YUVA"</b> Program with the caption of <b>"The Society Needs You"</b> on the occasion of Engineer's Day in 2016-17.. Under this program students are involving voluntarily and identify the poor and needy people and help them. This program will be carried out once in a semester continuously. In this regard the College Management has encouraged the students by extending their heartful support.
              </p>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold mb-2">LIST OF YUVA EVENTS CONDUCTED YEAR WISE</h3>
              <ul className="list-disc pl-6 space-y-2">
                {[{
                  label: '2018-2019 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva_2019.pdf'
                }, {
                  label: '2017-2018 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva_2018.pdf'
                }, {
                  label: '2017-2018 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva.pdf'
                }, {
                  label: '2016-2017 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva%20-2016-17-2nd%20Sem.pdf'
                }, {
                  label: '2016-2017 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/ece_Social%20Service%20Activities.pdf'
                }].map((item, idx) => (
                  <li key={idx}>
                    {item.label} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] font-semibold hover:underline"
                    >
                      For more details
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Newsletters</h2>
            <div className="space-y-4">
              {[{
                title: 'News Letter Volume10 Issue1 2023-24',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_Sep-Nov_2023.pdf'
              }, {
                title: 'News Letter Volume10 Issue2 2023-24',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_June-Aug_2023(original).pdf'
              }, {
                title: 'News Letter Volume9 Issue2 2022-23',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%209%20ISSUE2%20f.pdf'
              }, {
                title: 'News Letter Volume9 Issue1 2022-23',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_June-Aug_2023(original).pdf'
              }, {
                title: 'Newsletter Volume 8 Issue 2 2021-22',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%208%20ISSUE2%20.pdf'
              }, {
                title: 'Newsletter Volume 8 Issue 1 2021-22',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%208%20ISSUE%201.pdf'
              }, {
                title: 'Newsletter Volume 7 Issue 2 2020-21',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%207%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 7 Issue 1 2020-21',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%207%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 6 Issue 3 2019-20',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 6 Issue 2 2019-20',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 6 Issue 1 2019-20',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 5 Issue 3 2018-19',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 5 Issue 2 2018-19',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 5 Issue 1 2018-19',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 4 Issue 4 2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%204.pdf'
              }, {
                title: 'Newsletter Volume 4 Issue 3 2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 4 Issue 2 2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 4 Issue 1 2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 3 Issue 1 2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 3 Issue 2 2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 3 Issue 3 2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 3 Issue 4 2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%204.pdf'
              }, {
                title: 'Newsletter Volume 2 Issue 1 2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20Letter%202015-16%20Vol%202%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 2 Issue 2 2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20letter%202015-16%20Vol%202%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 2 Issue 3 2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20letter%202015-16%20Vol%202%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 2 Issue 4 2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ece_Newsletter%202015-16%20Vol%202%20Issue%204.pdf'
              }].map((item, idx) => (
                <details key={idx} className="border rounded-lg">
                  <summary className="text-lg font-semibold cursor-pointer px-4 py-2">{item.title}</summary>
                  <div className="text-center p-3">
                    {item.title} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] text-lg font-semibold hover:underline"
                    >
                      View
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      case 'Training Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Training Activities</h2>
            <div className="space-y-6">
              <details className="border rounded-lg">
                <summary className="text-lg font-semibold cursor-pointer px-4 py-2">List of Training Activities conducted in 2022-23</summary>
                <div className="text-center p-3">
                  List of Training Activities conducted in 2022-23 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/ece/training%20Activities%20in%202022-23.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] text-lg font-semibold hover:underline"
                  >
                    View
                  </a>
                </div>
              </details>
              <details className="border rounded-lg">
                <summary className="text-lg font-semibold cursor-pointer px-4 py-2">List of Training Activities conducted in 2021-22</summary>
                <div className="text-center p-3">
                  List of Training Activities conducted in 2021-22 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/ece/Traning%20Activities%20during%20A.Y.2021-2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] text-lg font-semibold hover:underline"
                  >
                    View
                  </a>
                </div>
              </details>
              <details className="border rounded-lg">
                <summary className="text-lg font-semibold cursor-pointer px-4 py-2">List of Training Activities conducted in 2020-21</summary>
                <div className="text-center p-3">
                  List of Training Activities conducted in 2020-21 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/ece/Traning%20Activities%20during%20A.Y.%202020-2021%20update.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] text-lg font-semibold hover:underline"
                  >
                    View
                  </a>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Technical Association</h2>
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Celebrations Under Veda</summary>
                <p className="py-2">
                  Victorious Electronics with Dynamic Aspirants is the departmental student association. The main intention of VEDA is to provide effective communication among the students of ECE department and share their ideas and improve their technical skills. The Department also conducts various Activities under the banner of IETE Student Chapter.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Engineer's Day Celebrations 2K22 - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%204%20details%20Merged%20PDF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Tech Veda 2K22 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Techveda2k22.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Tech Veda 2K19 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Tech%20Veda_2k19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Engineers Day celebrations 2K18 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Engineers%20Day%20celebrations.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Tech Veda 2K17 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/b.Tech%20Veda%202K17.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>TechEuphoria 2K19 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/TECHEUPHORIA%202K19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>TechEuphoria 2K18 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/TECHEUPHORIA%202K18.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                </ul>
              </details>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-center">Images</h3>
              {/* TECKVEDA-2K19 Gallery */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-center mb-4">TECKVEDA-2K19</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { src: "tech_veda%20poster.jpg", alt: "Image 1" },
                    { src: "tech_veda1.jpg", alt: "Image 2" },
                    { src: "tech_veda2.jpg", alt: "Image 2" },
                    { src: "tech_veda3.jpg", alt: "Image 2" },
                    { src: "tech_veda4.jpg", alt: "Image 2" },
                    { src: "tech_veda%20pick&speak1.jpg", alt: "Image 2" },
                    { src: "tech_veda%20pick&speak2.jpg", alt: "Image 2" },
                    { src: "tech_veda%20tech1.jpg", alt: "Image 2" },
                    { src: "tech_veda%20tech2.jpg", alt: "Image 2" },
                    { src: "tech_veda%20proexpo1.jpg", alt: "Image 2" },
                    { src: "tech_veda%20proexpo2.jpg", alt: "Image 2" },
                    { src: "tech_veda%20proexpo3.jpg", alt: "Image 2" },
                    { src: "tech_veda%20proexpo4.jpg", alt: "Image 2" },
                    { src: "tech_veda%20paperpren1.jpg", alt: "Image 2" },
                    { src: "tech_veda%20paperpren2.jpg", alt: "Image 2" },
                  ].map((img, idx) => (
                    <img
                      key={idx}
                      src={`https://srivasaviengg.ac.in/uploads/ece_meritscholarships/${img.src}`}
                      alt={img.alt}
                      className="rounded-lg shadow-md w-full h-auto object-cover"
                    />
                  ))}
                </div>
              </div>
              {/* TECKVEDA-2K18 Gallery */}
              <div>
                <h4 className="text-xl font-bold text-center mb-4">TECKVEDA-2K18</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { src: "techf%20(1).jpg", alt: "Image 1" },
                    { src: "techf%20(2).jpg", alt: "Image 2" },
                    { src: "techf%20(3).jpg", alt: "Image 2" },
                    { src: "techf%20(4).jpg", alt: "Image 2" },
                    { src: "techf_1.jpg", alt: "Image 2" },
                    { src: "techf_4.jpg", alt: "Image 2" },
                    { src: "tecassoc%20(17).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(18).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(19).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(20).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(21).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(22).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(23).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(4).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(5).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(6).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(7).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(8).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(9).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(10).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(11).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(14).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(15).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(16).jpg", alt: "Image 2" },
                  ].map((img, idx) => (
                    <img
                      key={idx}
                      src={`https://srivasaviengg.ac.in/uploads/ece_meritscholarships/${img.src}`}
                      alt={img.alt}
                      className="rounded-lg shadow-md w-full h-auto object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Merit Scholarships and Academic Toppers</h2>
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Merit Scholarships Year Wise</summary>
                <p className="py-2">The college management is very much interested to encourage the students by giving merit scholarships and incentives to the best EAMCET Rankers and semester wise class topper. With this every year some students are receiving the scholarships and get benefitted and motivated. The details are listed below:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Merit Scholarships-2019 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2019.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2018 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20181.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>M.Tech Merit Scholarships-2017 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/M.Tech%20Merit%20Scholarships-20171.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2017 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20171.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2016 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20161.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2015 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20151.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2014 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2014.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2013 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2013.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                </ul>
              </details>
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Cash Award's and Scholarship's given by College Management</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Academic Year</th>
                        <th className="py-2 px-4 border-b">Based on</th>
                        <th className="py-2 px-4 border-b">No. of Students Benefited</th>
                        <th className="py-2 px-4 border-b">Scholarship Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="py-2 px-4 border-b">1</td><td className="py-2 px-4 border-b">2022-23</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">121</td><td className="py-2 px-4 border-b">1,32,000</td></tr>
                      <tr><td className="py-2 px-4 border-b">2</td><td className="py-2 px-4 border-b">2021-22</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">18</td><td className="py-2 px-4 border-b">13,000</td></tr>
                      <tr><td className="py-2 px-4 border-b">3</td><td className="py-2 px-4 border-b">2020-21</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">36</td><td className="py-2 px-4 border-b">32,500</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>4</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2019-20</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">52</td><td className="py-2 px-4 border-b">48,500</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">49</td><td className="py-2 px-4 border-b">7,95,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>5</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2018-19</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">34</td><td className="py-2 px-4 border-b">68,000</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">63</td><td className="py-2 px-4 border-b">7,15,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>6</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2017-18</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">50</td><td className="py-2 px-4 border-b">36,500</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">63</td><td className="py-2 px-4 border-b">9,25,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>7</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2016-17</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">65</td><td className="py-2 px-4 border-b">48,750</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">8</td><td className="py-2 px-4 border-b">1,45,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>8</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2015-16</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">62</td><td className="py-2 px-4 border-b">46,000</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">36</td><td className="py-2 px-4 border-b">5,30,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>9</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2014-15</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">37</td><td className="py-2 px-4 border-b">27,500</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">8</td><td className="py-2 px-4 border-b">1,40,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center mt-8">Image Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                1, 2, 3, 6, 5, 7, 8, 9, 9, 10, 11, 12, 13, 14
              ].map((num, idx) => (
                <img
                  key={idx}
                  src={`https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Merit_Scholars${num}.jpg`}
                  alt={`Merit Scholar ${num}`}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              ))}
            </div>
          </div>
        );
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            {/* ...Student Achievements JSX as above... */}
          </div>
        );
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Placements</h2>
            <div className="space-y-4">
              {[{
                year: '2022-23',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECT_Placements_2022-23.pdf'
              }, {
                year: '2021-22',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2021-22.pdf'
              }, {
                year: '2020-21',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2020-21.pdf'
              }, {
                year: '2019-20',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2019-20.pdf'
              }, {
                year: '2018-19',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2018-19.pdf'
              }, {
                year: '2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2017-18.pdf'
              }, {
                year: '2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2016-17.pdf'
              }, {
                year: '2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2015-16.pdf'
              }, {
                year: '2014-15',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2014-15.pdf'
              }].map((placement, idx) => (
                <details key={placement.year} className="border rounded-lg">
                  <summary className="text-lg font-semibold cursor-pointer px-4 py-2">Placements during the Academic Year {placement.year}</summary>
                  <div className="text-center p-3">
                    Placements during the Academic Year {placement.year} -{' '}
                    <a
                      href={placement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] text-lg font-semibold hover:underline"
                    >
                      View
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      // ...existing cases...
    }

    switch (activeContent) {
      case 'Workshops/SOC/Guest Lecturers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Workshops/SOC/Seminars/Guest Lectures</h2>
            {/* Workshops/SOC */}
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Workshops/SOC</summary>
                <div className="mt-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Workshops/SOC organized during the Academic Year 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20conducted%20in%20%202022-23%20(1).pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops/SOC organized during the Academic Year 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20conducted%20in%202021-22%20(1).pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20Conducted%20in%20_2019-20.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2018-19 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20Conducted%20in%202018-19.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2017-18 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202017-18.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2016-17 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202016-17.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2015-16 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202015-16.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2014-15 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202014-15.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2012-13 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202012-13.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2011-12 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202011-12.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>APSSDC- Workshop on web development using DJANGO- <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/APSSDC-%20Workshop%20on%20web%20development%20using%20DJANGO.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>APSSDC -Web designing using react JS- <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/APSSDC%20-Web%20designing%20using%20react%20JS.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Two Day -Workshop on Design and Analysis of Antenna using CST microwave studio software tool - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20-Workshop%20on%20Design%20and%20Analysis%20of%20Antenna%20using%20CST%20microwave%20studio%20software%20tool.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>One week SOC on Basic Digital Circuit Design with VHDL and QuestaSim Tool SEC-C- - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20-Workshop%20on%20Design%20and%20Analysis%20of%20Antenna%20using%20CST%20microwave%20studio%20software%20tool.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Three-day Hands-on workshop Embedded System Design - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Three-day%20Hands-on%20workshop%20Embedded%20System%20Design.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>One week workshop on Arduino with scratch - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/One%20week%20workshop%20on%20Arduino%20with%20scratch.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>One-week Skill Oriented program on sensor interfacing and cloud computing - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/One-week%20Skill%20Oriented%20program%20on%20sensor%20interfacing%20and%20cloud%20computing%20(1).pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshop on "SCILAB- Applications in Engineering & Technology", in association with Andhra Pradesh State Skill Development Corporation (APSSDC) under IETE Students Forum (ISF), 21st to 23rd Dec-2017 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/SCI_LAB_Workshop_2017.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshop on "Design and Simulation of Antennas & Microwave Devices using HFSS" , 6th & 7th Dec-2017 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/HFSS_Workshop_2017.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshop on Arduino-Device Interfacing Conducted on 22nd & 23rd February 2017 for II B. Tech ECE Students Under IETE Student Forum (ISF) - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Workshop%20on%20Arduino%20Device%20Interfacing%20for%20IInd%20Years.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshop on ROBOTICS and IOT Conducted on 6th & 7th February 2017 for III B. Tech ECE Students Under IETE Student Forum (ISF) - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Workshop%20on%20IOT%20&%20Robotics%20for%20%20III%20rd%20Years.pdf" className="text-blue-600 hover:underline">View More</a></li>
                  </ol>
                </div>
                <div className="text-center mt-8">
                  <h3 className="text-2xl font-semibold mb-4">Workshops/SOC Gallery PICS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      "guestlecture_img1.jpg",
                      "guestlecture_img2.jpg",
                      "guestlecture_img3.jpg",
                      "guestlecture_img4.jpg",
                      "fdp_1.jpg",
                      "fdp_2.jpg",
                      "fdp_3.jpg",
                      "fdp_4.jpg",
                      "IOEA_1.jpg",
                      "IOEA_2.jpg",
                      "IOEA_3.jpg",
                      "IOEA_4.jpg"
                    ].map((img, idx) => (
                      <img key={idx} src={`https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/${img}`} alt={`Gallery ${idx + 1}`} className="rounded-lg shadow-md w-full h-auto object-cover" />
                    ))}
                  </div>
                </div>
              </details>
            </div>
            {/* Guest Lectures */}
            <div className="mb-8">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Guest Lectures</summary>
                <div className="mt-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Guest Lectures Organized during the Academic Year 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest%20Lectures%20conducted%20%20in%202021-22.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2019-20.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest%20Lectures%20Conducted_2018-19.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2018-19 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2017-18.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2017-18 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2016-17.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2016-17 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2015-16.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2015-16 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2014-15.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2014-15 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2012-13.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2013-14 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2011-12.pdf" className="text-blue-600 hover:underline">View More</a></li>
                  </ol>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Achievements</h2>
            {/* Journal Publications */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Journal Publications</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Faculty Publication Details 2022-2023 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-Journals-2022-2023.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2021-2022 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_Journals%20%20%202021-22.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2020-2021 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Journals%20%202020-21.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2019-2020 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Journals%20%202019-20.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2018-2019 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2018-2019.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2017-2018 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2017-2018.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2016-2017 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2016-2017.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2015-2016 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2015-2016.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2014-2015 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2014-2015.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2013-2014 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2013-2014.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication in National / International Journals - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Faculty%20Publications%20in%20National_%20International%20Journals.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Publications in International Conferences */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Publications in International Conferences</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Faculty Conferences Details 2022-2023 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-%20Conferences%20-2022-2023.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2021-2022 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-%20Conferences%202021-2022.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2020-2021 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece_conference%20index%202020-21.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2019-2020 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece_conference%20index%202019-20.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2018-2019 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE_2018.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2017-2018 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE_2017.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2016-2017 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_internationalconference_latest.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2013-2016 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publications in National/International Conferences - <a target="_blank" href="#" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Book Publications */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Book Publications</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Name of the Faculty</th>
                        <th className="py-2 px-4 border-b">Title of the Book</th>
                        <th className="py-2 px-4 border-b">Publisher</th>
                        <th className="py-2 px-4 border-b">Year Of Publication</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">1</td>
                        <td className="py-2 px-4 border-b">Purnima K Sharma , E. Kusuma Kumari</td>
                        <td className="py-2 px-4 border-b">Dual Strip Flag Microstrip Patch Antenna For Millimeter Wave Applications.</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI:</td>
                        <td className="py-2 px-4 border-b">2022</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">2</td>
                        <td className="py-2 px-4 border-b">T V N L Aswini</td>
                        <td className="py-2 px-4 border-b">Narrow Band Spectrum Sensing of Cognitive Radio for Wireless Services.</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI: 10.1007/978-981-15-9647-6_80</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">3</td>
                        <td className="py-2 px-4 border-b">S. Murugan,E. Kusuma Kumari</td>
                        <td className="py-2 px-4 border-b">Microstrip line feed Rectangular Split Ring Resonator Antenna for Millimeter Wave Applications</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI: 10.1007/978-981-16-3246-4_37</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">4</td>
                        <td className="py-2 px-4 border-b">E. Kusuma Kumari, M. Vinod Kumar, Purnima K. Sharma, S. Murugan</td>
                        <td className="py-2 px-4 border-b">Double-Sided Split Ring Resonator-Based Probe Feed Patch Antenna with Enhanced Bandwidth for 5G and Ku Band Applications</td>
                        <td className="py-2 px-4 border-b">SPRINGER Print ISBN: 978-981-16-1088-2 Electronic ISBN: 978-981-16-1089-9</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">5</td>
                        <td className="py-2 px-4 border-b">E. Kusuma Kumari, Purnima K. Sharma, S. Murugan, and D. Rama Devi</td>
                        <td className="py-2 px-4 border-b">Compact Multiband CPW Feed Microstrip Fractal Antenna for X, Ku Band satellite Applications</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI: 10.1007/978-981-16-3246-4_74</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">6</td>
                        <td className="py-2 px-4 border-b">Dr. E. Kusuma Kumari, Dr. Purnima K. Sharma, Dr. S. Murugan, Mr. M. Vinod Kumar</td>
                        <td className="py-2 px-4 border-b">Book Chapter : Double sided Split Ring Resonator based Probe feed patch Antenna for 5G and Ku band Applications</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI 978-981-16-1089-9_37, ©2021</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">7</td>
                        <td className="py-2 px-4 border-b">Dr. Purnima K. Sharma (Co-Author)</td>
                        <td className="py-2 px-4 border-b">"Signal Loss Calculation at 900 MHz & 2.4 GHz in WBAN"</td>
                        <td className="py-2 px-4 border-b">LAMBERT Academic Publishing</td>
                        <td className="py-2 px-4 border-b">2018</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">8</td>
                        <td className="py-2 px-4 border-b">Dr. Purnima K. Sharma (Co-Author)</td>
                        <td className="py-2 px-4 border-b">"Development of Field Propagation Model for Urban Area"</td>
                        <td className="py-2 px-4 border-b">Anchor Academic Publication, Hamburg Germany in 2017, ISBN-13: 978-3-96067-626-3.</td>
                        <td className="py-2 px-4 border-b">2017</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">9</td>
                        <td className="py-2 px-4 border-b">Dr. Dinesh Sharma</td>
                        <td className="py-2 px-4 border-b">"Development of Field Propagation Model for Urban Area"</td>
                        <td className="py-2 px-4 border-b">Anchor Academic Publication, Hamburg Germany in 2017, ISBN-13: 978-3-96067-626-3.</td>
                        <td className="py-2 px-4 border-b">2017</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">10</td>
                        <td className="py-2 px-4 border-b">Dinesh Sharma, Purnima K Sharma & R.K.Singh</td>
                        <td className="py-2 px-4 border-b">"QoS in Fixed Wireless Access Networks"</td>
                        <td className="py-2 px-4 border-b">LA ISBN-10: 365995490X, ISBN-13: 978-3659954900.P, Germany</td>
                        <td className="py-2 px-4 border-b">2016</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
            {/* Certifications */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Certifications</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>NPTEL Certified Faculty List 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Faculty%20Certification%20courses%20in%20%202022-2023.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_21-22.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List 2020-21 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_20-21.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_19-20.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List Jan-Apr-2020 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_NPTEL_19-20.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List Jul-Oct-2019 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jul-Oct-2019.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List Jan-Apr-2019 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jan-Apr-2019.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List Jun-Oct-2018 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jun-Oct-2018.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Patents */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Patents</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Patents Published by Faculty - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/List%20of%20Patents%20published%20by%20Faculty.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Awards */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Awards</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Dr.Purnima K Sharma, has received the "State Best Teacher Award" on 5th September 2023 from APSCHE, Govt.of Andhra Pradesh.</li>
                  <li>Dr.E. Kusuma Kumari, Dr. Purnima K Sharma, Dr. S Murugan received the best session award for 3rd International conference on communication and computational technologies ICCCT-2021 during 27th and 28th February,2021 organized by Rajasthan Technical University.</li>
                  <li>Smt. KNVS Vijaya Lakshmi received best paper award from International conference on Wireless Data Networks 2021 during 26th & 27th February ,2021 entitled " RT – Gate: Concept of Micro level Polarization in QCA</li>
                  <li>Dr. E. Kusuma Kumari has received Best Academician Award in Feb 1, 2019 by CSERD.</li>
                  <li>Dr. M. Thamarai, Professor of ECE Department has received Senior Researcher award by GECL</li>
                  <li>Dr. Purnima K. Sharma, Assoc. Prof of ECE Department has received Young Researcher by GECL</li>
                  <li>Dr Purnima K. Sharma, Assoc. Prof of ECE Department has received Young women award in March 03, 2018 by Venus International Foundation.</li>
                  <li>Dr. M. Thamarai, Professor of ECE Department "Best Academician award" received from Combined Society for Educational Research and Development, Dehradun, Dated on 10.03.2018.</li>
                  <li>Dr. E. Kusuma Kumari has received Best paper award for presenting the paper on " Wideband High Gain Circularly polarized planar Antenna array for L Band Radar" , 2017 IEEE International Conference on Computational Intelligence and Computing Research, Tamilnadu college of engineering, Coimbatore.</li>
                  <li>Dr. E. Kusuma Kumari has received Best teacher award for 2011-2012 academic Year in Gayatri Institute of Engineering And Technology.</li>
                  <li>Dr. E. Kusuma Kumari has received Best teacher award for 2001-2002 academic Year in Sri YVS & BRM Polytechnic college.</li>
                </ul>
              </details>
            </div>
            {/* Memberships */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Memberships</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Name of the Faculty</th>
                        <th className="py-2 px-4 border-b">Number Of Faculty Posses the membership</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">1</td>
                        <td className="py-2 px-4 border-b">IEEE <br />Institute of Electrical & Electronics Engineers</td>
                        <td className="py-2 px-4 border-b">3</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">2</td>
                        <td className="py-2 px-4 border-b">ISTE <br />Indian Society For Technical Education</td>
                        <td className="py-2 px-4 border-b">20</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">3</td>
                        <td className="py-2 px-4 border-b">IETE <br />Institution of Electronics and Telecommunication Engineers</td>
                        <td className="py-2 px-4 border-b">7</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">4</td>
                        <td className="py-2 px-4 border-b">ISRD <br />International Society for Research and Development.</td>
                        <td className="py-2 px-4 border-b">4</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">5</td>
                        <td className="py-2 px-4 border-b">IAENG <br />International Association of Engineers</td>
                        <td className="py-2 px-4 border-b">5</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">6</td>
                        <td className="py-2 px-4 border-b">IRED <br />Institute of Research Engineers and Doctors</td>
                        <td className="py-2 px-4 border-b">4</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">7</td>
                        <td className="py-2 px-4 border-b">ISC <br />Indian Science Congress</td>
                        <td className="py-2 px-4 border-b">1</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">8</td>
                        <td className="py-2 px-4 border-b">SEMIC <br />Semantic Interoperability Community</td>
                        <td className="py-2 px-4 border-b">1</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">9</td>
                        <td className="py-2 px-4 border-b">GRDS <br />Global Research & Development Services</td>
                        <td className="py-2 px-4 border-b">2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
            {/* Faculty Out-Reach */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Faculty Out-Reach</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Faculty Out Reach - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Faculty%20Out%20Reach.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Faculty Promotions/Incentives */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Faculty Promotions/Incentives</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Academic Year</th>
                        <th className="py-2 px-4 border-b">Number Of Faculty</th>
                        <th className="py-2 px-4 border-b">Promotion</th>
                        <th className="py-2 px-4 border-b">Received Incentives for SCI/SCOPUS Paper, Book Chapter, Publications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">1</td>
                        <td className="py-2 px-4 border-b">2022-2023</td>
                        <td className="py-2 px-4 border-b">Dr. T.V.N.L. Aswini</td>
                        <td className="py-2 px-4 border-b">Associate Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">2</td>
                        <td className="py-2 px-4 border-b">2022-2023</td>
                        <td className="py-2 px-4 border-b">Sri P. Gopala Reddy</td>
                        <td className="py-2 px-4 border-b">Sr.Assistant Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">3</td>
                        <td className="py-2 px-4 border-b">2022-2023</td>
                        <td className="py-2 px-4 border-b">Sri B.Murali Krishna</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.15,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">4</td>
                        <td className="py-2 px-4 border-b">2022-2023</td>
                        <td className="py-2 px-4 border-b">Dr.M. Thamarai</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.15,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">5</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.M.Satish Kumar</td>
                        <td className="py-2 px-4 border-b">Associate Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">6</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Sri G. V. Subrahmanyam</td>
                        <td className="py-2 px-4 border-b">Deputy Controller of Exams (DCE)</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">7</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.E.Kusuma Kumari</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.5,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">8</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.P.Ashok Kumar</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.7,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">9</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">DrPurnima K Sharma</td>
                        <td className="py-2 px-4 border-b">Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">10</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.P.Ashok Kumar</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.7,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">11</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.S.V.V Satyanarayana</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.4,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">12</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.T.V.N.L. Aswini</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.5,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">13</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.TDNSS Sarveswara Rao</td>
                        <td className="py-2 px-4 border-b">Associate Professor</td>
                        <td className="py-2 px-4 border-b">Rs.5,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">14</td>
                        <td className="py-2 px-4 border-b">2020-21</td>
                        <td className="py-2 px-4 border-b">Dr.M.Koteswara Rao</td>
                        <td className="py-2 px-4 border-b">Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">15</td>
                        <td className="py-2 px-4 border-b">2020-21</td>
                        <td className="py-2 px-4 border-b">Dr.S.V.V.Satyanarayana</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.7,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">16</td>
                        <td className="py-2 px-4 border-b">2018-19</td>
                        <td className="py-2 px-4 border-b">Dr.S.V.V.Satyanarayana</td>
                        <td className="py-2 px-4 border-b">Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">17</td>
                        <td className="py-2 px-4 border-b">2018-19</td>
                        <td className="py-2 px-4 border-b">Sri M.Sathish Kumar</td>
                        <td className="py-2 px-4 border-b">Sr. Assistant Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">18</td>
                        <td className="py-2 px-4 border-b">2018-19</td>
                        <td className="py-2 px-4 border-b">Sri T.Sreenivasu</td>
                        <td className="py-2 px-4 border-b">Sr. Assistant Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">19</td>
                        <td className="py-2 px-4 border-b">2018-19</td>
                        <td className="py-2 px-4 border-b">Sri D.R.Sandeep</td>
                        <td className="py-2 px-4 border-b">Sr. Assistant Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
            {/* Gallery */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 10, 14, 12, 13, 15, 16, 20].map((num) => (
                  <img key={num} src={`https://srivasaviengg.ac.in/uploads/facul_achievements/${num}.jpg`} alt={`Image ${num}`} className="rounded-lg shadow-md w-full h-auto object-cover" />
                ))}
              </div>
            </div>
          </div>
        );
      // ...existing cases...
      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Development Programs</h2>
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">FDP Attended</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li className="fdp-item">FDPs attended by the Faculty 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_22-23.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_21-22.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2020-21 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_faculty_certificatons_20-21.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_19-20.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2018-19 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2018-19%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2017-18 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2017-18%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2016-17 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2016-17%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2015-16 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2015-16%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2014-15 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2014-15FDP%20Attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2013-14 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2013-2014%20FDP%20Attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2012-13 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2012-13%20FDP%20Attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2011-12 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2011-12%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
            <div>
              <details>
                <summary className="text-xl font-semibold cursor-pointer">FDPs/ Workshops/ Training Programmes Conducted</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li className="fdp-item">Two Day FDP on Open source software tools for online teaching - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20FDP%20on%20Open%20source%20software%20tools%20for%20online%20teaching.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>Three Day FDP on Software tools for Research publications and patent filing - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/three%20Day%20FDP%20on%20Software%20tools%20for%20Research%20publications%20and%20patent%20filing.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>A Three Day National Level Online FDP on Research Trends in Signal Processing, Antennae, VLSI and IoT - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/A%20Three%20Day%20National%20Level%20Online%20FDP%20on%20Research%20Trends%20in%20Signal%20Processing,%20Antennae,%20VLSI%20and%20IoT.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>Two Day FEP on Antenna &amp; wireless Communications - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/two%20%20Day%20FEP%20on%20Antenna%20&%20wireless%20Communications.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>Five Day FDP on IoT and Applications - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Faculty%20Enablement%20Program%20%20on%20Signal%20and%20Image%20processing.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>Faculty Enablement Program on Signal and Image processing - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Faculty%20Enablement%20Program%20%20on%20Signal%20and%20Image%20processing.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP on Research Challenges and Opportunities post COVID19 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/FDP%20on%20Research%20Challenges%20and%20Opportunities%20post%20COVID19.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-ATAL sponsored FDP on RF Energy harvesting Antenna Design for wirless body area network - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-ATAL%20sponsored%20FDP%20on%20RF%20Energy%20harvesting%20Antenna%20Design%20for%20wirless%20body%20area%20networks.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-1 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20Phase-1.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-2 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20%20Phase-2.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-3 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-%20on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20%20Phase%20-3.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-4 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP%20on%20Research%20area%20in%20Bio%20medical%20singal%20processing%20phase-4.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP's Conducted by the Faculty during the A.Y 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202022-23.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP's Conducted by the Faculty during the A.Y 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202021-22.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP's Conducted by the Faculty during the A.Y 2020-21 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202020-21.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP's Conducted by the Faculty during the A.Y 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202019-20.pdf" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">MoUs</h2>
            <h3 className="text-2xl font-semibold text-center mb-4">A. MOUs with Industries</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">S.No</th>
                    <th className="py-2 px-4 border-b">Organization Name</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Purpose</th>
                    <th className="py-2 px-4 border-b">Document</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">1</td>
                    <td className="py-2 px-4 border-b">Tessolve Semiconductor Test Engineering Lab for STE-SDC Course- Bangalore</td>
                    <td className="py-2 px-4 border-b">04-12-2023</td>
                    <td className="py-2 px-4 border-b">On going</td>
                    <td className="py-2 px-4 border-b">1. To Support Skill Oriented Training in the field of Semiconductor Test and Measurement for ECE /EEE UG Students<br />2. To offer Skill Development Certification Course on Semi Conductor Test Engineering<br />3. To Provide Placement Assistance</td>
                    <td className="py-2 px-4 border-b"><a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">2</td>
                    <td className="py-2 px-4 border-b">NIT Andhra Pradesh</td>
                    <td className="py-2 px-4 border-b">09-02-2023</td>
                    <td className="py-2 px-4 border-b">On going</td>
                    <td className="py-2 px-4 border-b">1.Supports research activities, proposal writing<br />2.Colloborative research work<br />3.Faculty exchange<br />4.Conducting expert lectures and workshops for students</td>
                    <td className="py-2 px-4 border-b"><a href="https://srivasaviengg.ac.in/uploads/ece/2.%20NIT%20AP%20MOU.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">3</td>
                    <td className="py-2 px-4 border-b">Edu Skills</td>
                    <td className="py-2 px-4 border-b">22-11-2022</td>
                    <td className="py-2 px-4 border-b">On going</td>
                    <td className="py-2 px-4 border-b">To provide training for faculty and students on Advanced technologies</td>
                    <td className="py-2 px-4 border-b"><a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">4</td>
                    <td className="py-2 px-4 border-b">Electro-Pro E-waste Management</td>
                    <td className="py-2 px-4 border-b">08-06-2022</td>
                    <td className="py-2 px-4 border-b">On going</td>
                    <td className="py-2 px-4 border-b">1.Electro pro supports students of SVEC in designing and development of products from E-Waste.<br />2.Also provides training on robotics and Embedded systems for students.</td>
                    <td className="py-2 px-4 border-b"><a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">5</td>
                    <td className="py-2 px-4 border-b">EFY-Certified Electronics Skill development center</td>
                    <td className="py-2 px-4 border-b">13-6-2019</td>
                    <td className="py-2 px-4 border-b">Completed</td>
                    <td className="py-2 px-4 border-b">1.EFY provided 50 subscription of Electronics for you magazine for one year.<br />2.EFY provided DIY Kits, self learning Kits, development boards, electronic components for the students to do projects.<br />3.EFY provided access to 10 students for monthly EFY webinars on different topics</td>
                    <td className="py-2 px-4 border-b"><a href="https://srivasaviengg.ac.in/uploads/ece/5.%20EFy%20MOU.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-2xl font-semibold mb-4">B. Interaction with the Industry</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Making MOU with Electro-Pro e-Waste Management, Visakapatnam to establish Electro Pro e-Waste in Campus -{' '}
                <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Electro%20Pro%20Management.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
              </li>
              <li>
                Making MOU with Thing tronics company, Banglore to establish IOT lab in Campus -{' '}
                <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
              </li>
            </ul>
          </div>
        );
      // ...existing cases...
    }
    switch (activeContent) {
      // ...existing cases...
      case 'Clubs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">SPACE CLUB_AICTE-SPICES</h2>
            <div className="mb-10">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">SPACE CLUB_AICTE-SPICES</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li className="fdp-item">Space Club: - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/SPICES%20Information.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 1: One Week Hands on Workshop on IoT Use Cases &amp; Development <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/One%20Week%20Hands%20on%20Workshop%20on%20IoT%20Use%20Cases%20&%20Development.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 2: 8th International YOGA DAY celebrations - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%202%20details%20-merged%20PDF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 3: One Week Handson Workshop on IoT &amp; its Applications - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event-3%20Merged%20PDF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 4: Engineer's Day Celebrations 2K22 - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%204%20details%20Merged%20PDF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 5: IOT Hackathon Program 2K23 - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/IoT2HACK-2K23.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 6: under AICTE- SPICES - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Event%20-5%20under%20AICTE-%20SPICES.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 7: One week Boot Camp Program on “Sensor Interfacing and Cloud Computing” - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/EVENT-7%20%20Bootcamp%20program%20on%20Sensor%20Interfacing%20&%20Cloud%20Computing.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 8: SOC Program on VHDL &amp; Digital Questa Sim - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Event-8%20%20SOC%20Program%20on%20VHDL%20&%20Digital%20Questa%20Sim.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">E- Waste Management Refurbishing club</h2>
            <div>
              <details>
                <summary className="text-xl font-semibold cursor-pointer">E- Waste Management Refurbishing club</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li className="fdp-item">E-Waste Refurbishing Club - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/E-Waste%20Refurbishing%20Club.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
          </div>
        );

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
                          <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View</a>
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
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">S.No</th>
                    <th className="px-4 py-3">Name of the BOS Member</th>
                    <th className="px-4 py-3">Designation</th>
                    <th className="px-4 py-3">Organization</th>
                    <th className="px-4 py-3">Position in JOB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">Dr.E. Kusuma Kumari</td>
                    <td className="px-4 py-3">Professor & HOD</td>
                    <td className="px-4 py-3">Dept of ECE, SVEC</td>
                    <td className="px-4 py-3">Chairperson</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">Dr.B.T Krishna</td>
                    <td className="px-4 py-3">Professor of ECE</td>
                    <td className="px-4 py-3">University College Of Engineering, JNTUK, Kakinada</td>
                    <td className="px-4 py-3">University Nominee</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">Prof.NVSN.Sarma</td>
                    <td className="px-4 py-3">Director</td>
                    <td className="px-4 py-3">IIIT, Trichy Tamilnadu</td>
                    <td className="px-4 py-3">Academic Expert</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">4</td>
                    <td className="px-4 py-3">Dr.M.Venu Gopala Rao</td>
                    <td className="px-4 py-3">Professor of CSE</td>
                    <td className="px-4 py-3">Andhra University</td>
                    <td className="px-4 py-3">Academic Expert</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">5</td>
                    <td className="px-4 py-3">Dr.M.Chakravarthy</td>
                    <td className="px-4 py-3">Scientist-'G'</td>
                    <td className="px-4 py-3">Additional Director, Directorate of Antenna Technologies, DLRL, Hyderabad</td>
                    <td className="px-4 py-3">Industry Nominee</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">6</td>
                    <td className="px-4 py-3">Sri.S.Siva Kumar</td>
                    <td className="px-4 py-3">Sr.Engineer</td>
                    <td className="px-4 py-3">Qualcomm Bhagmani tech Park, Bangalore</td>
                    <td className="px-4 py-3">Alumni Member</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3">7</td>
                    <td className="px-4 py-3 text-center" colSpan={4}>
                      All the Faculty Members in the ECE Dept. are Members in BOS
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-semibold text-[#B22222] mb-4">Board of Studies Meeting Minutes:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Minutes of 8th meeting of Board of Studies, dated on 19-07-2025 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/Minutes of ECE-8th BOS Meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 7th meeting of Board of Studies, dated on 16.07.2024 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/Minutes of 7th BOS meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 3rd Joint meeting of Board of Studies, dated on 05.10.2023 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/Annexure%20-%20B%20new.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 6th meeting of the Board of Studies, dated 25.07.2022 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/6th%20BOS%20minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 5th meeting of the Board of Studies, dated 03.9.2021 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/5th%20BOS%20minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 4th meeting of the Board of Studies, dated 28.12.2020 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/4th%20BOS%20Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 3rd meeting of the Board of Studies, dated 10.6.2020 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/3rd%20BOS%20Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 2nd meeting of the Board of Studies, dated 13.4.2019 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/2nd%20BOS%20Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 1st meeting of the Board of Studies, dated 02-06-2018 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/1st%20BOS%20Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </ul>
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
            <h1 className="text-3xl md:text-4xl font-bold">Electronics & Communication Engineering</h1>
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
        title="ECE Department"
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

export default ECEDepartment;
