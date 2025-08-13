
import React, { useState } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';

const CSTDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Physical Facilities', 'Department Library', 'MoUs', 'Faculty Development Programs', 'Faculty Achievements', 'Workshops', 'Student Achievements', 'Placements', 'Merit Scholarship/Academic Toppers', 'Technical Association', 'Training Activities', 'Newsletters', 'Extra-Curricular Activities', 'Hackathons', 'e-Resources', 'Handbooks', 'Contact'
  ];

  const faculty = [
    { name: "Mr. T. Sai Mahesh", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Sai%20Mahesh.pdf" },
    { name: "Mr. D. Yatesh Ramkumar", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Yatish%20Ramkumar.pdf" },
    { name: "Mrs. S. Shanthi Rupa", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_SANTHI%20RUPA.pdf" },
    { name: "Ms.Ch N.S.Sireesha Lakshmi", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Ms.N.S.Sireesha%20Lakshmi.pdf" },
    { name: "Mr. G. Sankar", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Mr.G.Sankar.pdf" },
    { name: "Mr. B. Jayachandran", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Mr.B%20Jayachandran.pdf" },
    { name: "Mr. P. Prabhakaran", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Mr.P%20Prabhakaran.pdf" },
    { name: "Mr. M. Raju", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Mr.M.Raju.pdf" },
    { name: "Mr. U. U. Veerendra", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Mr.U.U.Veerendra.pdf" },
    { name: "Ms. M. Suneetha", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Ms.%20M.%20Sunnetha.pdf" },
    { name: "Ms. V. VenkataLakshmi", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Ms.%20V.%20VenkataLakshmi.pdf" },
    { name: "Mr. A. Niranjana Rao", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CST_Mr.%20A.%20Niranjana%20Rao.pdf" },
    { name: "Mrs. Ch. Naga Padma Latha", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CST_Mrs.%20Ch.%20N.%20P.%20Latha.pdf" },
    { name: "Mr. B. Murali krishna", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CST_Mr. B. Murali Krishna.pdf" },
    { name: "Mr. K. Sai Ektha Kumar Naidu", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CST_Mr. Kottagulli Sai Ektha Kumar Naidu_Faculty Web Profile.pdf" },
  ];

  const TechnicalFaculty = [
    { name: "Mr. K.N. Suresh", designation: "System Admin" },
    { name: "Ms. BNG Lakshmi Durga", designation: "Programmer" },
    { name: "Mr. K.V Srinivasa Rao", designation: "Hardware Technician" },
    { name: "Mr. G.Bhanu Prakash", designation: "Hardware Technician" },
    { name: "Mr. P.Manikanta Gupta", designation: "Lab Assistant" },
    { name: "Mr. Md.Arriff", designation: "Computer Lab Assistant" },
    { name: "Mr. P.Lokesh Reddy", designation: "Lab Technician" },
    { name: "Ms. M. Naga Harika", designation: "Lab Technician" },
    { name: "Mr. B. Abaddalu", designation: "Lab Technician" },
    { name: "Mr. S. Nagaraju", designation: "Programmer" },
    { name: "Mr. N Lokesh Babu", designation: "Lab Technician" },
  ];

  const nonTeachingFaculty = [
    { name: "Ms. U.Devi Lakshmi", designation: "DEO" },
    { name: "Mrs. K. Bhagya Sri", designation: "DEO" },

    { name: "Mr. D.Srinivasa Rao", designation: "Attender" },
    { name: "Mr. M.Siva Krishna", designation: "Attender" },
    { name: "Mrs. A.Sri Karuna Kumari", designation: "Attender" },
    { name: "Mr. V. Venkateswara Rao", designation: "Attender" },

  ];


  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-6">
              <div className="relative">
                <img
                  src="/images/departments/cse/cse_hod1.jpeg"
                  alt="Dr. D. Jaya Kumari"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. D. Jaya Kumari</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Head of Department, CST</p>
                  <p className="text-gray-600">Ph.D in Computer Science, M.Tech CSE</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_cst@srivasaviengg.ac.in" className="text-primary hover:underline">hod_cst@srivasaviengg.ac.in</a></p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              	CST Department came into inception from 2019 onwards with an intake of 60 seats in B.Tech
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
                    <td className="px-6 py-4">B.Tech - Computer Science & Technology</td>
                    <td className="px-6 py-4">AP EAPCET</td>
                    <td className="px-6 py-4">4 Years</td>
                    <td className="px-6 py-4">60</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To evolve as a center of excellence in Computer Science & Technology education, producing professionally competent and socially responsible technologists.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To impart quality education through effective teaching-learning processes with emphasis on emerging technologies.</li>
              <li>To provide excellent infrastructure and environment conducive for research and innovation.</li>
              <li>To enhance industry-institute interaction to make students technology-ready.</li>
              <li>To develop leadership skills and ethical values among students.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and computer science & technology principles.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Analyze real-life problems and design socially responsible and environmentally sustainable technology-based solutions.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Adapt to evolving technologies through continuous learning and professional development.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 4</h4>
                <p className="text-gray-700">Lead a successful career as a team member or leader with strong professional ethics and communication skills.</p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes (POs)</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO1: Engineering Knowledge</h4>
                <p className="text-gray-700">Apply knowledge of mathematics, science, engineering fundamentals, and computer science & technology principles to solve complex engineering problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, research literature, and analyze complex engineering problems using principles of mathematics, natural sciences, and engineering sciences.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Design/Development of Solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and system components that meet specified needs with appropriate consideration for public health, safety, and environmental concerns.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO4: Modern Tool Usage</h4>
                <p className="text-gray-700">Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools for complex engineering activities.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO5: The Engineer and Society</h4>
                <p className="text-gray-700">Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal and cultural issues relevant to professional engineering practice.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 1</h4>
                <p className="text-gray-700">Apply knowledge of computer science & technology principles to design and develop efficient software solutions.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 2</h4>
                <p className="text-gray-700">Demonstrate proficiency in emerging technologies and adapt to technological changes in the computing field.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 3</h4>
                <p className="text-gray-700">Work effectively in multidisciplinary teams and communicate technical concepts clearly to diverse audiences.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed">
             	CST Department came into inception from 2019 onwards with an intake of 60 seats in B.Tech
            </p>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-8">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveDeptTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm transition-all ${
                      activeDeptTab === tab
                        ? 'bg-[#B22222] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div>
                {renderDeptTabContent()}
              </div>
            </div>
          </div>
        );
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Student Achievements</h2>
            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Internships</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    Internships during the Academic Year 2024-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST_Internships during the 2024-25(prints).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Internships during the Academic Year 2023-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/Internships during the 2023-24.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Internships during the Academic Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/Internships during the 2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Internships during the Academic Year 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/Internships during the 2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Conference Publications</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    Student Journal Publications during the Academic Year 2023-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST_Student_Journal publications 2023-24.docx.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Conferences during the Academic Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST -conferences (22-23).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Roll of Honour</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Awards</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>GATE</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>GIF</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>NPTEL/Other Certifications</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    NPTEL &amp; Other Certifications during the Academic Year 2024-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/NPTEL & other certifications_CST_2024-25.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    NPTEL &amp; Other Certifications during the Academic Year 2023-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/cst  nptel 2023-24.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    NPTEL &amp; Other Certifications during the Academic Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST_Nptel during & other certifications2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    NPTEL Certified Student List Jan–Apr 2019 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/NPTEL Certified Student List Jan_Apr_2019.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Community Service Project</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Student Research Projects</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>
              </div>
            </div>
          </div>
        );

      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Syllabus</h2>
            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>B.Tech (CSE & CST)</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    B.Tech V23 Syllabus -
                    {' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/V23%20Syllabus%20Book_CSE%20&%20CST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    B.Tech V20 Syllabus -
                    {' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/B.Tech%20CST%20V20.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    B.Tech V18 Syllabus -
                    {' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/B.Tech%20CST%20V18.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>

              <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>SOC Syllabus</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    SOC Syllabus during the Academic Year 2024-25 -
                    {' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/uploads/cst/SOC_CST_2024-25.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    SOC Syllabus during the Academic Year 2023-24 -
                    {' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/SOC_CST_2023-24.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    SOC Syllabus during the Academic Year 2022-23 -
                    {' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/SOC_CST_2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    SOC Syllabus during the Academic Year 2021-21 -
                    {' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/SOC_CST_2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
            </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Teaching Faculty</h2>
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
                        <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                          <td className="px-6 py-4">{member.qualification}</td>
                          <td className="px-6 py-4">{member.designation}</td>
                          <td className="px-6 py-4">
                            <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline transition-colors duration-200">View</a>
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

              <div>
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Non-Teaching Staff</h2>
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
            </div>
          </div>
        );
        
      case 'e-Resources':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
                e-Resources
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Innovations by the Faculty in Teaching and Learning. Activities of
                the department towards improvement in teaching-learning are
                indicated in the office records as well as on the college website.
                They are open for reproduction, further improvement, and review.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Some of the methods adopted by the faculty members in Teaching &
                Learning are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Presentations using PPT, wherever necessary.</li>
                <li>Technical videos for demonstration of certain concepts.</li>
                <li>
                  Usage of Software's like Rational Rose, R Software to
                  demonstrate the concepts practically.
                </li>
              <li>
                Use of E-Learning Resources like NPTEL lectures, Online
                journals, and Online lectures like QEEE & MOOCS for effective
                learning.
              </li>
              <li>
                Providing Question bank with short answer questions and quiz
                questions.
              </li>
              <li>Student paper and poster presentations.</li>
              <li>Student seminars.</li>
              <li>
                Conducting peer group learning to encourage the slow learners.
              </li>
              <li>
                Student participation in skill tests and technical events.
              </li>
              <li>
                To incorporate real-time problem-solving skills, we are using
                online tools like EBOX, EDYST etc.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-[#850209] mb-4">(i) Innovations in Teaching and Learning</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Project Based Learning</li>
              <li>Z TO A Approach</li>
              <li>NPTEL Web and Video Courses</li>
              <li>PPTs</li>
              <li>Question Banks</li>
              <li>Mind Map</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#850209] mb-4">(ii) Tools used in Teaching and Learning</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
              <li>LMS</li>
              <li>Conduira</li>
              <li>PEARSON MePro</li>
              <li>EBox</li>
              <li>Edyst</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">V20- Subjects</h3>
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
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">I</td>
                    <td className="py-3 px-4 border-b">Problem Solving through C-Programming</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/PCPS-V20.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">III</td>
                    <td className="py-3 px-4 border-b">Data Structures</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DS_V20.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">3</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">III</td>
                    <td className="py-3 px-4 border-b">Computer Organization and Architecture</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/COA_notes_V20.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">4</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">III</td>
                    <td className="py-3 px-4 border-b">OOP's through C++</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/OOPS.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">5</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">III</td>
                    <td className="py-3 px-4 border-b">Managerial Economics and Financial Analysis</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/MEFA.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">6</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">III</td>
                    <td className="py-3 px-4 border-b">Mathematical Foundation Of Computer Science</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/MFCS V20 material.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">7</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Design Analysis of Algorithms</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DAA Material.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">8</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Java Programming</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/Java V20 all units content.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">9</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Software Engineering</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/SE NOTES.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">10</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Statistical Visualization using R Lab</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/SVR LAB.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">11</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">V</td>
                    <td className="py-3 px-4 border-b">Artificial Intelligence</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/AI.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">12</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">V</td>
                    <td className="py-3 px-4 border-b">Data Mining</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DATA MINING.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">13</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">V</td>
                    <td className="py-3 px-4 border-b">Web Technologies</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/Web_Technologies.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">14</td>
                    <td className="py-3 px-4 border-b">V20</td>
                    <td className="py-3 px-4 border-b">VI</td>
                    <td className="py-3 px-4 border-b">Unified Modeling Language Lab</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V20/UML LAB.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">V18- Subjects</h3>
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
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">I/II</td>
                    <td className="py-3 px-4 border-b">Programming in C for Problem Solving</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/cprogrammingppts.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">III</td>
                    <td className="py-3 px-4 border-b">Object Oriented Programming for Problem Solving</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/ADSPPTS.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">4</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">III</td>
                    <td className="py-3 px-4 border-b">Digital Electronics</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/DE_Cse_II_Sem.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">5</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">III</td>
                    <td className="py-3 px-4 border-b">Data Mining</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/III_Sem_DM MATERIAL.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">6</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Computer Organization</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/Computer Organization.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">7</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Software Engineering</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/SEPPTs.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">8</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Python Programming</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">9</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Java Programming</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/Java Materials.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">10</td>
                    <td className="py-3 px-4 border-b">V18</td>
                    <td className="py-3 px-4 border-b">IV</td>
                    <td className="py-3 px-4 border-b">Formal Languages and Automata Theory</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/V18/FLATPPTS.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

            
      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
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

        
      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
                Board of Studies
              </h2>
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
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200">1</td>
                      <td className="py-3 px-4 border-b border-gray-200">Dr. D Jaya Kumari</td>
                      <td className="py-3 px-4 border-b border-gray-200">Professor & HOD</td>
                      <td className="py-3 px-4 border-b border-gray-200">Dept of CSE, SVEC</td>
                      <td className="py-3 px-4 border-b border-gray-200">Chairperson</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200">2</td>
                      <td className="py-3 px-4 border-b border-gray-200">Dr. A Krishna Mohan</td>
                      <td className="py-3 px-4 border-b border-gray-200">Professor of CSE</td>
                      <td className="py-3 px-4 border-b border-gray-200">JNTUK, Kakinada</td>
                      <td className="py-3 px-4 border-b border-gray-200">University Nominee</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200">3</td>
                      <td className="py-3 px-4 border-b border-gray-200">Dr. R.B.V Subramaanyam</td>
                      <td className="py-3 px-4 border-b border-gray-200">Professor of CSE</td>
                      <td className="py-3 px-4 border-b border-gray-200">NITW</td>
                      <td className="py-3 px-4 border-b border-gray-200">Academic Expert</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200">4</td>
                      <td className="py-3 px-4 border-b border-gray-200">Dr. S Pallam Setty</td>
                      <td className="py-3 px-4 border-b border-gray-200">Professor of CSE</td>
                      <td className="py-3 px-4 border-b border-gray-200">Andhra University</td>
                      <td className="py-3 px-4 border-b border-gray-200">Academic Expert</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200">5</td>
                      <td className="py-3 px-4 border-b border-gray-200">Mr. SrinivasaRaju Vuppalapati</td>
                      <td className="py-3 px-4 border-b border-gray-200">Senior Consultant</td>
                      <td className="py-3 px-4 border-b border-gray-200">MSR IT Services LLP</td>
                      <td className="py-3 px-4 border-b border-gray-200">Industry Expert</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200">6</td>
                      <td className="py-3 px-4 border-b border-gray-200">Mr. Eedala Rambabu</td>
                      <td className="py-3 px-4 border-b border-gray-200">Member of Technical Staff2</td>
                      <td className="py-3 px-4 border-b border-gray-200">Amadeus, Bangalore</td>
                      <td className="py-3 px-4 border-b border-gray-200">Alumni CSE Dept</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b border-gray-200">7</td>
                      <td className="py-3 px-4 border-b border-gray-200" colSpan={2}>
                        All the Faculty Members in the CSE Dept.
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200" colSpan={2}>Members in BOS</td>
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
                
              </ul>
            </div>
          </div>
        );
      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Physical Facilities</h2>

            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Class Rooms</summary>
                <div className="mt-3 space-y-3">
                  <div>
                    <h5 className="text-md font-semibold mb-2">Class Rooms</h5>
                    <ul className="list-disc pl-6 my-2">
                      <li>
                        Class Rooms with ICT Enabled Facilities -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-md font-semibold mb-2">Class Time Tables</h5>
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      <li>
                        Master Timetable A.Y for Sem-I 2025-26 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2025-26_ III, V, VII SEM _CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-II 2024-25 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Time%20Table_2024-25_%20II%20SEM%20_CST%20(1).pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2024-25 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Timetable_A.Y%20for%20Sem-I%202024-25.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-II 2023-24 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Time%20Table_2023-24_%20II%20SEM%20_CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2023-24 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2022-23_ III, V, VII SEM _CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2022-23 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2022-23_ III, V, VII SEM _CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-II 2023-24 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/uploads/cst/CST_Master Time Table_2022-23_ II SEM _CST.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2022-23 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/CST_Master Time Table_A.Y. 2022-23_ I SEM.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-II 2021-22 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table _CST_II SEM_A.Y 2021-22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                      <li>
                        Master Timetable A.Y for Sem-I 2021-22 -{' '}
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cst/Master Time Table _CST_I SEM_A.Y 2021-22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Seminar Halls</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    Seminar halls with ICT Enabled Facilities -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Laboratories</summary>
                <div className="space-y-4">
                  <p className="mt-3 text-gray-700">
                    The Department has well equipped labs with the latest Configuration. Total 9 Computer Labs for UG, PG and one research lab consisting a total of 674 systems. The various servers in the server room include Oracle 11g Database Server, Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation Server, A-Mail Server, ECAP Server, LMS Server.
                  </p>
                  <p className="text-gray-700">
                    The college has high speed internet connectivity throughout the campus through a leased line from BSNL with 1Gbps, 500Mbps from Blueifi.
                  </p>
                  <p className="text-gray-700">The following Laboratories are available in the department:</p>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold my-2">James Gosling Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b" rowSpan={3}>James Gosling Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: HP Pro Tower 280 G9<br />
                                Processor: Intel® Core™ i5-13500 CPU @ 2.50 GHz<br />
                                16.00GB RAM, 500GB SSD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 21.5” LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model: ASUS VIVO AIO V222 GAR_V333GA<br />
                                Processor: Intel® Pentium® Silver J5040<br />
                                8.00 GB RAM, 256.00 GB SSD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 21.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">EF Codd Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b" rowSpan={2}>EF Codd Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: HP Pro Tower 280 G9<br />
                                Processor: Intel® Core™ i5-12400 CPU @ 2.50 GHz<br />
                                16.00 GB RAM, 500.00 GB SSD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 19.5” LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">68</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model: Dell Optiplex 3020<br />
                                Processor: Intel® Core™ i3-9100 CPU @ 3.60 GHz<br />
                                8.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">06</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Linus Torvalds Lab</h3>
                      <div className="overflow-x-auto">
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
                                Model: HP Pro Tower 280 G9<br />
                                Processor: Intel core TM i3-10100 CPU @ 3.64 GHz<br />
                                8.00 GB RAM, 500.00 GB SSD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 19.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">PGCP Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b" rowSpan={2}>PGCP Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: Acer Vertion Desktop System<br />
                                Processor: Intel® Core™ i3-8100 CPU @ 2.65 GHz<br />
                                8.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 21.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">71</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model: Acer Vertion Desktop System<br />
                                Processor: Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 19.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">02</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">R&D Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b" rowSpan={2}>R&amp;D Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: Acer Vertion Desktop System<br />
                                Processor: Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64 – based Processor<br />
                                Monitor: 17.5" LED Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">03</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4 border-b">2</td>
                              <td className="py-3 px-4 border-b">
                                Model: Dell 7D49KQR<br />
                                Processor: Intel® Core™ i5-7400 CPU @ 3.00 GHz<br />
                                4.00 GB RAM, 1.00 TB HDD<br />
                                System type: x64-based processor<br />
                                Monitor: 21.5” LED Monitor<br />
                                Keyboard: Multimedia keyboard<br />
                                Mouse: Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">07</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Yellow Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b">Yellow Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Pink Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b">Pink Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Orange Lab</h3>
                      <div className="overflow-x-auto">
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
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Green Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b">Green Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">Brown Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b">Brown Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: DELL OPTI PLEX 3070<br />
                                Processor: Intel Core i3, 9th Gen<br />
                                8.00 GB RAM, 1 TB Hard Disk<br />
                                System type: x64 – based Processor<br />
                                Monitor: 20.5” TFT Monitor<br />
                                Keyboard: Multimedia Keyboard<br />
                                Mouse: Optical Scroll Mouse
                              </td>
                              <td className="py-3 px-4 border-b">Placements and Training</td>
                              <td className="py-3 px-4 border-b">72</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">PG CP Lab</h3>
                      <div className="overflow-x-auto">
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
                              <td className="py-3 px-4 border-b">PG CP Lab</td>
                              <td className="py-3 px-4 border-b">
                                Model: Acer Vertion I3 Desktop System<br />
                                Processor: Intel Core i3 -8100, 8th Gen<br />
                                8 GB DDR4 RAM, 1 TB Hard Disk Drive<br />
                                Monitor: 21.5” LED Monitor<br />
                                Keyboard: USB Keyboard<br />
                                Mouse: USB Optical Mouse
                              </td>
                              <td className="py-3 px-4 border-b">AJWT, OOPS through C++ Lab</td>
                              <td className="py-3 px-4 border-b">70</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold my-2">R&amp;D Lab</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="py-3 px-4 border-b text-left">S.No</th>
                              <th className="py-3 px-4 border-b text-left">Name of the Lab</th>
                              <th className="py-3 px-4 border-b text-left">Location</th>
                              <th className="py-3 px-4 border-b text-left">Usage</th>
                              <th className="py-3 px-4 border-b text-left">No. of Systems</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-4 border-b">1</td>
                              <td className="py-3 px-4 border-b">R&amp;D Lab</td>
                              <td className="py-3 px-4 border-b">B-Block, First Floor</td>
                              <td className="py-3 px-4 border-b">To Carryout Research Activities by Students and Faculty Members</td>
                              <td className="py-3 px-4 border-b">30</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
              </div>
            </div>
          </div>
        );
      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg" style={{ borderWidth: 2 }}>
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Development Programs</h2>

            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>FDP Attended</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    FDPs attended by the Faculty 2024-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST%20FDP's%20A.Y%202024-2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    FDPs attended by the Faculty 2023-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST%20FDPs%20in%20A.Y%202023-2024.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    FDPs attended by the Faculty 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202021-2022_CST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>FDP Conducted</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    FDPs conducted by the Department to the Faculty -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20faculty.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>FDPs/ Workshops/ Training Programmes Conducted</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    FDPs conducted by the Department to the Faculty -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20facultys.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-09-13-16.jpg" alt="Image 1" className="w-full h-auto rounded-lg shadow" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-09-13.jpg" alt="Image 2" className="w-full h-auto rounded-lg shadow" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-10-01-17.jpg" alt="Image 3" className="w-full h-auto rounded-lg shadow" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/FDP-2022100117.jpg" alt="Image 4" className="w-full h-auto rounded-lg shadow" />
                </div>
              </details>
            </div>
          </div>
          </div>
        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Achievements</h2>

           <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Journal Publications</summary>
                <ul className="list-disc pl-6 my-2"></ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Conferences</summary>
                <ul className="list-disc pl-6 my-2"></ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Book Publications</summary>
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Certifications</summary>
                <ul className="list-disc pl-6 my-2 space-y-2">
                  <li>
                    Certifications done by the faculty during the A.Y. 2024-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/CST%20Certifications%20A.Y%202024-2025.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      For more Details
                    </a>
                  </li>
                  <li>
                    Certifications done by the faculty during the A.Y. 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/Certifications%202021-2022_CST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      For more Details
                    </a>
                  </li>
                  <li>
                    Certifications done by the faculty during the A.Y. 2020-21 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/certifications%202020-2021_CST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      For more Details
                    </a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Patents</summary>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Research Supervisors</summary>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Faculty Out-Reach</summary>
              </details>
              
            </div>
          </div>
        );
      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Merit Scholarships and Academic Toppers</h2>

            <h3 className="text-xl font-semibold text-center mb-4">Merit Scholarships / Academic Toppers</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
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
                    <td className="py-3 px-4 border-b">2023-24</td>
                    <td className="py-3 px-4 border-b">Academic Toppers</td>
                    <td className="py-3 px-4 border-b">21</td>
                    <td className="py-3 px-4 border-b">30750</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">2022-23</td>
                    <td className="py-3 px-4 border-b">Academic Toppers</td>
                    <td className="py-3 px-4 border-b">7</td>
                    <td className="py-3 px-4 border-b">7500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">3</td>
                    <td className="py-3 px-4 border-b">2021-22</td>
                    <td className="py-3 px-4 border-b">Academic Toppers</td>
                    <td className="py-3 px-4 border-b">15</td>
                    <td className="py-3 px-4 border-b">16250</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-center mb-4">Image Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <img
                src="https://srivasaviengg.ac.in/uploads/cst/20231014_123258PM_ByGPSMapCamera.jpg"
                alt="Merit Scholarship Event 1"
                className="w-full h-auto rounded-lg shadow object-cover"
              />
              <img
                src="https://srivasaviengg.ac.in/uploads/cst/20231014_123634pm_ByGPSMapCamera.jpg"
                alt="Merit Scholarship Event 2"
                className="w-full h-auto rounded-lg shadow object-cover"
              />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat1.jpeg" alt="Merit Scholarships 1" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat2.jpeg" alt="Merit Scholarships 2" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat3.jpeg" alt="Merit Scholarships 3" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat4.jpeg" alt="Merit Scholarships 4" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat5.jpeg" alt="Merit Scholarships 5" className="w-full h-auto rounded-lg shadow object-cover" />
              <img src="https://srivasaviengg.ac.in/images/departments/cst/cstat6.jpeg" alt="Merit Scholarships 6" className="w-full h-auto rounded-lg shadow object-cover" />
            </div>
          </div>
        );
        case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Extra-Curricular Activities</h2>

            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Extra-Curricular Activities</summary>
                <ul className="my-2 list-none text-center space-y-2">
                  <li>
                    Extracurricular activities during the Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202021-2022.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202019-2020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202018-2019.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2017-18 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202017-2018.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Sahaya</summary>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Social Services</h3>
                    <p className="text-gray-700 text-justify">
                      We come across many heart-rending incidents and pathetic conditions of people in the society every day.
                      We may not be in a position to give an immediate reaction though we want to. But the Computer Science
                      and Technology Students of Sri Vasavi Engineering College extended their hands to help the needy. These
                      helping activities are going on under the name of "SAHAYA" with the slogan 'The Helping Hands,' which
                      aptly suits its purpose.
                    </p>
                    <p className="text-gray-700 text-justify">
                      SAHAYA is not a one-man army; rather, it is the brainchild of '07 batch students and is being carried
                      on by the subsequent batch students, which sounds the real meaning of teamwork. SAHAYA, from its first day,
                      was engaged in performing its activities. It was started with the event "CHEYUTHA" in the memory of SVEC
                      Academic Director LATE Dr. B. Janardhan Reddy at ZP High school, Pedatadepalli by providing the fee for
                      needy students and their necessities for study like compass boxes, books, etc., and thereafter, the journey
                      of helping the needy continued uninterruptedly till date.
                    </p>
                    <p className="text-gray-700 text-justify">
                      Students may have many thoughts in mind, but the seeds of thought have sprouted to grow with great confidence
                      by the magnanimous support of the Management. The Management of Sri Vasavi Engineering College always infuses
                      confidence in the students by extending their heartfelt cooperation. "SAHAYA" is aptly serving its motto and
                      contributing its little part to society. A drop may be small, but many drops together form an ocean. So, one
                      hand may seem weak, but joining the hands together makes many changes to step into a brighter world.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold">Faculty Coordinator:</h4>
                    <p className="font-semibold">Mr. P. Ramamohan Rao<br />Assistant Professor</p>
                  </div>

                  <div>
                    <h3 className="text-center text-xl font-semibold">LIST OF SAHAYA EVENTS CONDUCTED YEAR WISE</h3>
                    <ul className="my-2 list-none text-center space-y-2">
                      <li>
                        2022-2023 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2021-2022 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2020-2021 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2019-2020 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2018-2019 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2017-2018 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2017-18.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2016-2017 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2016-17.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2015-2016 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2015-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2014-2015 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2014-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2013-2014 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2013-14.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2012-2013 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2012-13.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>

              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/ec.jpeg" alt="Extra-Curricular Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/ec1.jpg" alt="Extra-Curricular Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/ec2.jpeg" alt="Extra-Curricular Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/e3.jpeg" alt="Extra-Curricular Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/e4.jpg" alt="Extra-Curricular Image 5" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/e5.jpg" alt="Extra-Curricular Image 6" className="w-full h-auto rounded-lg shadow object-cover" />
                </div>
              </details>
            </div>
          </div>
        );
      
      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Technical Association</h2>
            <p className="text-gray-700 mb-6 text-justify">
              Department Association - Society of Computers for Ultimate Diligence (SCUD) was started in the year 2002.
              SCUD team conducts regularly technical fests, workshops, and guest lectures for the benefit of students.
            </p>

            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>SCUD Activities during the year 2022-23</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    SCUD Activities during the year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/SCUD%20summary_22-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>SCUD Activities during the year 2021-22</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    SCUD Activities during the year 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/SCUD%20summary_%2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>
              </div>

            <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Gallery</summary>
                <div className="space-y-10 mt-4">
                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">TECHFEST 2K23</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/t.jpeg" alt="TECHFEST 2K23 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/t1.jpeg" alt="TECHFEST 2K23 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">HACKOVERFLOW 2K23</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/t.jpeg" alt="HACKOVERFLOW 2K23 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/t1.jpeg" alt="HACKOVERFLOW 2K23 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">FRESHER'S 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/f.jpeg" alt="Freshers 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/f1.jpeg" alt="Freshers 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/f2.jpeg" alt="Freshers 2K22 Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/f3.jpeg" alt="Freshers 2K22 Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">ENGINEER'S DAY 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/ed.jpeg" alt="Engineer's Day 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/ed1.jpeg" alt="Engineer's Day 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">FAREWELL 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_1.jpeg" alt="Farewell 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_2.jpeg" alt="Farewell 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_3.jpeg" alt="Farewell 2K22 Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_4.jpeg" alt="Farewell 2K22 Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_5.jpeg" alt="Farewell 2K22 Image 5" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_6.jpeg" alt="Farewell 2K22 Image 6" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">HACKOVERFLOW 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/h.jpeg" alt="Hackoverflow 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/h1.jpeg" alt="Hackoverflow 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center mb-4">SCUD VERVE 2K22</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/scud1.jpeg" alt="SCUD VERVE 2K22 Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/scud2.jpeg" alt="SCUD VERVE 2K22 Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/scud3.jpeg" alt="SCUD VERVE 2K22 Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                      <img src="https://srivasaviengg.ac.in/images/departments/cst/scud4.jpeg" alt="SCUD VERVE 2K22 Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                    </div>
                  </div>
                </div>
              </details>
              </div>
            </div>
          </div>
        );
        case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Newsletters</h2>
            <div className="space-y-4">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Newsletter Volume 12 Issue 4 2022</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 12 Issue 4 2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue%204%202022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>

              <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 12 Issue 3 2022</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 12 Issue 3 2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue3%202022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 12 Issue 2 2021</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 12 Issue 2 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue2%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 12 Issue 1 2021</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 12 Issue 1 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue1%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 11 Issue 4 2021</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 11 Issue 4 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue4%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 11 Issue 3 2021</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 11 Issue 3 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue3%202021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 11 Issue 2 2020</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 11 Issue 2 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue2%202020.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 11 Issue 1 2020</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 11 Issue 1 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue1%202020.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 10 Issue 4 2020</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 10 Issue 4 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_4_%202020.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 10 Issue 3 2020</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 10 Issue 3 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_3_%202019.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 10 Issue 2 2019</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 10 Issue 2 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_2_%202019.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 10 Issue 1 2019</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 10 Issue 1 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010%20_Issue_1_%202019.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 9 Issue 4 2019</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 9 Issue 4 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/vol%209%20issue%204.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
            </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 9 Issue 3 2019</summary>
                <ul className="list-none pl-0 my-2">
                  <li className="p-2">
                    Newsletter Volume 9 Issue 3 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/vol%209%20issue%203.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a>
                  </li>
                </ul>
              </details>
            </div>
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Extra-Curricular Activities</h2>

            <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Extra-Curricular Activities</summary>
                <ul className="my-2 list-none text-center space-y-2">
                  <li>
                    Extracurricular activities during the Year 2022-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2021-22 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202021-2022.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202019-2020.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202018-2019.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                  <li>
                    Extracurricular activities during the Year 2017-18 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202017-2018.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

             <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Sahaya</summary>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">Social Services</h3>
                    <p className="text-gray-700 text-justify">
                      We come across many heart-rending incidents and pathetic conditions of people in the society every day.
                      We may not be in a position to give an immediate reaction though we want to. But the Computer Science
                      and Technology Students of Sri Vasavi Engineering College extended their hands to help the needy. These
                      helping activities are going on under the name of "SAHAYA" with the slogan 'The Helping Hands,' which
                      aptly suits its purpose.
                    </p>
                    <p className="text-gray-700 text-justify">
                      SAHAYA is not a one-man army; rather, it is the brainchild of '07 batch students and is being carried
                      on by the subsequent batch students, which sounds the real meaning of teamwork. SAHAYA, from its first day,
                      was engaged in performing its activities. It was started with the event "CHEYUTHA" in the memory of SVEC
                      Academic Director LATE Dr. B. Janardhan Reddy at ZP High school, Pedatadepalli by providing the fee for
                      needy students and their necessities for study like compass boxes, books, etc., and thereafter, the journey
                      of helping the needy continued uninterruptedly till date.
                    </p>
                    <p className="text-gray-700 text-justify">
                      Students may have many thoughts in mind, but the seeds of thought have sprouted to grow with great confidence
                      by the magnanimous support of the Management. The Management of Sri Vasavi Engineering College always infuses
                      confidence in the students by extending their heartfelt cooperation. "SAHAYA" is aptly serving its motto and
                      contributing its little part to society. A drop may be small, but many drops together form an ocean. So, one
                      hand may seem weak, but joining the hands together makes many changes to step into a brighter world.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold">Faculty Coordinator:</h4>
                    <p className="font-semibold">Mr. P. Ramamohan Rao<br />Assistant Professor</p>
                  </div>

                  <div>
                    <h3 className="text-center text-xl font-semibold">LIST OF SAHAYA EVENTS CONDUCTED YEAR WISE</h3>
                    <ul className="my-2 list-none text-center space-y-2">
                      <li>
                        2022-2023 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2021-2022 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2020-2021 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2019-2020 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2018-2019 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/Sahaya_2018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2017-2018 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2017-18.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2016-2017 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2016-17.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2015-2016 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2015-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2014-2015 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2014-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2013-2014 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2013-14.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                      <li>
                        2012-2013 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/sahaya2012-13.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">For more details</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  <img src="/images/departments/cst/ec.jpeg" alt="Extra-Curricular Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/ec1.jpg" alt="Extra-Curricular Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/ec2.jpeg" alt="Extra-Curricular Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/e3.jpeg" alt="Extra-Curricular Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/e4.jpg" alt="Extra-Curricular Image 5" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="/images/departments/cst/e5.jpg" alt="Extra-Curricular Image 6" className="w-full h-auto rounded-lg shadow object-cover" />
                </div>
              </details>
              </div>
            </div>
          </div>
        );
      case 'Hackathons':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Hackathons</h2>
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed">
                  A 24-hour student hackathon is an event where students come together to collaborate, innovate, and
                  create projects within a short time frame. These hackathons have gained immense popularity in recent years,
                  and they hold significant importance for students for several reasons:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
                  <li>
                    <span className="font-medium">Hands-on learning:</span> Hackathons provide students a unique opportunity to engage in hands-on learning by
                    applying knowledge and skills to real-world problems and challenges.
                  </li>
                  <li>
                    <span className="font-medium">Collaboration and teamwork:</span> Teams form with diverse backgrounds, enabling effective communication and
                    leveraging strengths to tackle complex problems collectively.
                  </li>
                  <li>
                    <span className="font-medium">Innovation and creativity:</span> Time constraints encourage novel solutions and exploration of unconventional ideas,
                    leading to unique projects.
                  </li>
                  <li>
                    <span className="font-medium">Networking and industry exposure:</span> Participants, mentors, and judges from industry provide excellent networking
                    opportunities that can lead to internships, jobs, or collaborations.
                  </li>
                  <li>
                    <span className="font-medium">Skill development:</span> Students learn new technologies, languages, and tools to complete their projects and broaden
                    their skillsets.
                  </li>
                  <li>
                    <span className="font-medium">Resume/portfolio enhancement:</span> Demonstrates passion, problem-solving, teamwork, and ability to work under pressure.
                  </li>
                  <li>
                    <span className="font-medium">Recognition and awards:</span> Many hackathons offer prizes and recognition, boosting confidence and opening doors to further
                    opportunities.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  In conclusion, student hackathons promote hands-on learning, collaboration, innovation, networking, skill development,
                  resume enhancement, and recognition. They serve as a platform for students to showcase abilities, learn from peers,
                  and gain valuable experience in a short period.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-[#850209] text-white">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">Academic Year</th>
                      <th className="py-3 px-4 border-b text-left">For Brochure</th>
                      <th className="py-3 px-4 border-b text-left">For Winners List</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2022-23</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackoverflow%20banner_2022_23.png"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2022-23.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2021-22</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/broacher_2021_22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2021-22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2019-20</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Brouchure.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2019-20.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2018-19</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/City%20Digi%20@Hack%202K18.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20winners_2018-19.pdf"
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

              <div>
                <h3 className="text-2xl font-semibold text-center mb-2">Gallery</h3>
                <div className="text-center text-lg font-medium mb-4">Hackathon 2022</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cst/Hackthon_2022_23%20(1).jpg"
                      alt="Hackathon 2022 Image 1"
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cst/Hackthon%202021_22%20(1).jpeg"
                      alt="Hackathon 2021-22 Image 1"
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cst/Hackthon%202021_22%20(1).jpeg"
                      alt="Hackathon 2021-22 Image 2"
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                    <img
                      src="https://srivasaviengg.ac.in/images/departments/cst/Hackthon_2022_23%20(2)%20(1).jpg"
                      alt="Hackathon 2022 Image 2"
                      className="w-full h-auto rounded-lg shadow object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'Training Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Training Activities</h2>

            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Training Activities during the Academic Year 2022-2023</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    Training Activities during the Academic Year 2022-2023 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/tt_2022-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Training Activities during the Academic Year 2021-2022</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>
                    Training Activities during the Academic Year 2021-2022 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/tt_2021-22.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>
              </div>
              <div className="pt-3 space-y-4"></div>
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Gallery</summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/g.jpg" alt="Training Activity Image 1" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/g1.jpg" alt="Training Activity Image 2" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/g2.jpg" alt="Training Activity Image 3" className="w-full h-auto rounded-lg shadow object-cover" />
                  <img src="https://srivasaviengg.ac.in/images/departments/cst/g3.jpg" alt="Training Activity Image 4" className="w-full h-auto rounded-lg shadow object-cover" />
                </div>
              </details>
            </div>
          </div>
        );
      case 'Handbooks':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Academic HandBooks</h2>
            <div className="space-y-6">
              <details open className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2025-26: I-Sem HandBooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>III Sem V23 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/CST_III SEM Handbook (1).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>V Sem V23 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/CST_V SEM Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VII Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/CST_VII SEM Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2024-25: II-Sem HandBooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>IV Sem V23 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/2024-25_IV SEM Hand Book_CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VI Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CST_VI Semester Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2024-25: I-Sem HandBooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>III Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/III  SEM (Autonomous) Handbook - CSTs.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>V Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/V SEM  Handbook_2024-25-CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VII Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/VII SEM  Handbook_2024-25-CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2023-24: II-Sem HandBooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>IV Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/2023-24_IV SEM Hand Book_CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VI Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/VI Semester Handbook - CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2023-24: I-Sem HandBooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>III Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/III  SEM (Autonomous) Handbook - CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>V Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/V SEM Handbook_V20 Regulation_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VII Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/VII SEM V20 Regulation HandBook_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2022-23: II-Sem Handbooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>IV Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/IV Sem V20 Regulation Handbook_CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VI Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/VI Sem V20 Regulation Handbook_CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VIII Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/VIII Sem V20 Regulation Handbook_CST.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2022-23: I-Sem Handbooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>III Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/III SEM V20 Regulation Handbook (CST).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>V Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/V SEM CST V20(Autonomous) Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VII Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/VII SEM CST V18(Autonomous) Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2021-22: II-Sem Handbooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>IV Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/IV Semester.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>VI Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/VI Semester Handbook 13-04-2022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2021-22: I-Sem Handbooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>III Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/III SEM CST V20 Regulation Handbook_2021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                  <li>V Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/V Sem Handbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2020-21: II-Sem Handbooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>IV Sem V20 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst/IV SEM V18 Regulation HandBook_2020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
              <details className="border rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">Academic year 2020-21: I-Sem Handbooks</summary>
                <ul className="list-disc pl-6 my-2">
                  <li>III Sem V18 Regulation Handbook - <a href="https://srivasaviengg.ac.in/uploads/cst//III SEM V18 Regulation HandBook_2020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View</a></li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Placements</h2>
            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Placements for Batch 2021-25</summary>
                <ul className="list-none my-2 text-center">
                  <li className="font-medium">
                    Placements for Batch 2021-25 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/2024-25 CST PLACEMENTSS.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>
              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Placements for Batch 2020-24</summary>
                <ul className="list-none my-2 text-center">
                  <li className="font-medium">
                    Placements for Batch 2020-24 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/2020-24 CST PLACEMENTS DATA -23.7.2023.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Placements for Batch 2019-23</summary>
                <ul className="list-none my-2 text-center">
                  <li className="font-medium">
                    Placements for Batch 2019-23 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/cst/2019-23 CST PLACEMENTS DATA.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] hover:underline"
                    >
                      View More
                    </a>
                  </li>
                </ul>
              </details>
              </div>

              <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Gallery</summary>
                <div className="space-y-6 mt-4">
                  <div>
                    <h3 className="text-xl font-semibold text-center text-[#850209] mb-4">2021-24</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <img
                        src="https://srivasaviengg.ac.in/images/placement/WhatsApp%20Image%202025-07-16%20at%2011.02.08%20AM.jpeg"
                        alt="Placements 2021-24"
                        className="w-full h-auto rounded-lg shadow object-cover"
                        style={{ aspectRatio: '16/9' }}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-center text-[#850209] mb-4">2019-23</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <img
                          src="https://srivasaviengg.ac.in/uploads/cst/pilla.jpeg"
                          alt="IBM 12 LPA - P. Jahnavi Sri Naidu"
                          className="w-full h-auto rounded-lg shadow object-cover"
                          style={{ aspectRatio: '16/9' }}
                        />
                        <div className="text-center my-3 text-green-600">
                          Roll No: 19A81A0650<br />
                          Name: P. Jahnavi Sri Naidu<br />
                          Company: IBM<br />
                          Package: 12 LPA
                        </div>
                      </div>
                      <div>
                        <img
                          src="https://srivasaviengg.ac.in/images/departments/cst/cst placement.jpg"
                          alt="CST Placement - IBM"
                          className="w-full h-auto rounded-lg shadow object-cover"
                        />
                        <div className="text-center my-3 text-green-600">
                          <strong>Roll No:</strong> 19A81A0650<br />
                          <strong>Name:</strong> P. Jahnavi Sri Naidu<br />
                          <strong>Company:</strong> IBM<br />
                          <strong>Package:</strong> 12 LPA
                        </div>
                      </div>
                      <div>
                        <img
                          src="https://srivasaviengg.ac.in/images/departments/cst/cst placement.jpg"
                          alt="CST Placement - TCS CodeVita"
                          className="w-full h-auto rounded-lg shadow object-cover"
                        />
                        <div className="text-center my-3 text-green-600">
                          <strong>Roll No:</strong> 19A81A0650<br />
                          <strong>Name:</strong> P. Jahnavi Sri Naidu<br />
                          <strong>Company:</strong> TCS CODEVITA<br />
                          <strong>Package:</strong> 7 LPA
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
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
            <h1 className="text-3xl md:text-4xl font-bold">Computer Science & Technology</h1>
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
                    <li key={item}>
                      <button
                        className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 text-sm ${activeContent === item ? 'bg-primary text-white font-semibold shadow-md' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                          setActiveContent(item);
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                      >
                        <ChevronRight className={`w-4 h-4 mr-2 transition-transform ${activeContent === item ? 'rotate-90' : ''}`} />
                        <span>{item}</span>
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

export default CSTDepartment;

