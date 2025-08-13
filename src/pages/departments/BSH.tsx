import React, { useState } from 'react';
import { Book, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const CSEDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');

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

  const facultyData = {
    mathematics: [
      { name: "Mr.N.Rajasekhar", qualification: "M.Sc.M.Phil", designation: "Assoc.Professor&HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/bsh_N.Rajasekhar_webprofile.pdf" },
      { name: "Mr.Sk.Dhana Prasad", qualification: "M.Sc,B.Ed", designation: "Asst. Professor &section Head", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Sk.Dhana%20PrasadSk.Dhana%20Prasad.pdf" },
      { name: "Mrs. B.Adi Lakshmi", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/B.Adi%20LakshmiAdi%20Lakshmi%20(Maths).pdf" },
      { name: "Mrs. G.S.Prasanthi", qualification: "M.Sc.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/G.PrasanthiG.S.Prasanthi.pdf" },
      { name: "Mr. V.Srinivas", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20V.%20Srinivas.pdf" },
      { name: "Mrs. B.V.D.Santhi lakshmi", qualification: "M.Sc.,B.Ed.,M.Phil,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/B.V.D.%20Santhi%20Lakshmisanthi(Maths).pdf" },
      { name: "Ms. S. Sirisha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20S.%20Sirisha.pdf" },
      { name: "Ms. T. Satya Surya Praba", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20T.Satya%20Surya%20Prabha.pdf" },
      { name: "Mr. T.D.Rama Krishna", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20T.%20D%20Rama%20Krishna.pdf" },
      { name: "Mr. S. Veeresh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20S.%20Veeresh.pdf" },
      { name: "Mr. M. Satya Suresh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20M.%20Satya%20Suresh.pdf" },
      { name: "Ms. P. Sravani", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20P.Sravani.pdf" },
      { name: "Mr. J.N.V Somayajulu", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "" },
      { name: "Ms. P. Sravani", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "" }
    ],
    chemistry: [
      { name: "Mrs. S.S.V.Suma Latha", qualification: "M.Sc.,B.Ed.,(Ph.D)", designation: "Asst. Professor & Section head", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/S.S.V.Suma%20Lathassvsuma%20Latha.pdf" },
      { name: "Mr. J. Chandara Rao", qualification: "M.Sc.,M.Phil.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/J.Chandara%20Raochandara%20rao%20resume.pdf" },
      { name: "Mrs. P. Durga Devi", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/P.Durga%20DeviDurga%20devi.pdf" },
      { name: "Ms. A. Anusha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.A.Anusha.pdf" },
      { name: "Ms. S. Lavanya", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.S.Lavanya.pdf" },
      { name: "Mrs. P. Silpa", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20P.Silpa.pdf" },
      { name: "Ms. Md. Syed Yasmin", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.Md.%20Syed%20Yasmin.pdf" },
      { name: "Dr. B. Rama Krishna", qualification: "M.Sc.,Ph.D", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20B.%20Rama%20Krishna.pdf" }
    ],
    english: [
      { name: "Dr.T.Sujani", qualification: "M.A.,M.Phil.,Ph.D", designation: "Assoc. Professor & Section Head", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20T.SujaniSujani%20Tata.pdf" },
      { name: "Dr.K. Venkata Rao", qualification: "M.A.,B.Ed.,M.Phil.,Ph.D", designation: "Assoc. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Dr.K.%20Venkata%20Rao.pdf" },
      { name: "Dr.B.Anada Rao", qualification: "M.A.,M.Phil.,Ph.D", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20B.%20Ananda%20Rao.pdf" },
      { name: "Mr. K.V.Rama Rao", qualification: "M.A.,B.Ed.,(Ph.D)", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.K%20V%20Rama%20Rao.pdf" },
      { name: "Mrs. K. Radha Madhavi", qualification: "M.A.,B.Ed.,M.Phil", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20K.Radha%20Madhavi.pdf" },
      { name: "Mrs. Ch. Tanuja", qualification: "M.A., M.Phil.,B.Ed.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.Ch.%20Tanuja.pdf" },
      { name: "Mrs. U. Aparanjani", qualification: "M.A.,B.Ed.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.Aparanjani.pdf" },
      { name: "Mr. G. Srinivas Rao", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20G.%20Srinivasa%20Rao.pdf" },
      { name: "Mr. M. Venkata Ramana", qualification: "M.A., B.Ed.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20M.%20Venkata%20Ramana.pdf" },
      { name: "Ms. A.Kiranmayee", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20A.Kiranmayee.pdf" },
      { name: "Ms. P.V.Padmavathi", qualification: "M.A.,B.Ed,", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20P.V.Padmavathi.pdf" },
      { name: "Mrs. Ch. Manjeera", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20Ch.%20Manjeera.pdf" },
      { name: "Mr. Ch. Mutyala Rao", qualification: "M.A., B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20Ch.%20Mutyala%20Rao.pdf" }
    ],
    physics: [
      { name: "Mr. P. Sita Rama Raju", qualification: "M.Sc.,M.Phil.,(Ph.D)", designation: "Assoc. Professor & Section Head", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/P.Sita%20Rama%20RajuPSR%20Raju%20Profile.pdf" },
      { name: "Dr. K. Jagadeesh", qualification: "M.Sc.,Ph.D", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.K.Jagadeesh.pdf" },
      { name: "Mr. B. Sasi Bhushan", qualification: "M.Sc.,M.tech", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/Sasi%20Bhushan%20BhimavarapuSasi%20Bhushan%20Bhimavarapu.pdf" },
      { name: "Mrs. G.Ramadevi", qualification: "M.Sc.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/GAJULA%20RAMADEVI.pdf" },
      { name: "Mr. P. Naga Ramesh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20P%20Naga%20Ramesh.pdf" },
      { name: "Mrs. B. Sudha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20B.%20Sudha.pdf" },
      { name: "Mr. P. Vinay", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20P%20%20Vinay.pdf" },
      { name: "Mr. K. Nagavamsi Sai Dileep", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "" }
    ],
    library: [
      { name: "Dr.G.CH.S Madhusudhan Rao", qualification: "M.Sc.,M.Phil.,Ph.D", designation: "Assoc.Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/S.S.V.Suma%20Lathassvsuma%20Latha.pdf" }
    ],
    physicalEducation: [
      { name: "Mr. S. Satish", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_S.SATEESH%20Resume%20-%202023.pdf" },
      { name: "Ms. K. Lavanya", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_Mr.K.%20Lavanya.pdf" },
      { name: "Ms. U. Jyothi", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_U.%20Jyothi.pdf" }
    ],
  };

  const nonTeachingFaculty = [
    { name: "Ms. U.Devi Lakshmi", designation: "DEO" },
    { name: "Mrs. K. Bhagya Sri", designation: "DEO" },
    { name: "Mr. D.Srinivasa Rao", designation: "Attender" },
    { name: "Mr. M.Siva Krishna", designation: "Attender" },
    { name: "Mrs. A.Sri Karuna Kumari", designation: "Attender" },
    { name: "Mr. V. Venkateswara Rao", designation: "Attender" }
  ];


  const TechnicalFaculty = [
    { name: "Mr. K.N. Suresh", designation: "System Admin" },
    { name: "Ms. BNG Lakshmi Durga", designation: "Programmer" },
    { name: "Mr. S. Nagaraju", designation: "Programmer" },
    { name: "Mrs. G. Uma Parvathi", designation: "Programmer" },
    { name: "Mr. P.Lokesh Reddy", designation: "Lab Technician" },
    { name: "Ms. M. Naga Harika", designation: "Lab Technician" },
    { name: "Mr. B. Abaddalu", designation: "Lab Technician" },
    { name: "Mr. Md.Arriff", designation: "Computer Lab Assistant" },
    { name: "Mr. P.Manikanta Gupta", designation: "Lab Assistant" },
    { name: "Mr. N Lokesh Babu", designation: "Lab Assistant" },
    { name: "Mr. K.V Srinivasa Rao", designation: "Hardware Technician" },
    { name: "Mr. G.Bhanu Prakash", designation: "Hardware Technician" },
    
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
                  src="/bshhod.jpg"
                  alt="N. Raja Shekar"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  style={{ aspectRatio: '4/3' }}
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">N. Raja Shekar</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, BSH</p>
                  <p className="text-gray-600">M. Phil</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_bsh@srivasaviengg.ac.in" className="text-primary hover:underline">hod_bsh@srivasaviengg.ac.in</a></p>
                </div>
              </div>
            </div>
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

            {/* Internships */}
            <div className="tab4 mt-4">
              <details open className="border rounded-lg p-4">
                 
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Internships</summary>
                <div className="nav-content">
                  <ol className="list-decimal mt-5 pl-6 space-y-2">
                    <li>
                      Internships during the Academic Year 2024-25 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/cse_awards/CSE_Internships%20during%20the%202024-25.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2023-24 -{' '}
                      <a href="https://www.srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2022-23 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2021-22 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2020-21 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2019-20 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2018-19 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2017-18 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202017-18.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2016-17 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202016-17.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2015-16 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202015-16.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2014-15 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Internships%20during%20the%202014-15.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                  </ol>
                </div>
              </details>
            </div>

            {/* Conference Publications */}
            <div className="tab4 mt-4">
              <details className="border rounded-lg p-4">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Conference Publications</summary>
                <div className="m-3 space-y-2">
                  <p>
                    Conferences during the Academic Year 2023-24 -{' '}
                    <a href="https://www.srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_STUDENT_conferences_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View More</a>
                  </p>
                  <p>
                    Conferences during the Academic Year 2022-23 -{' '}
                    <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE-conferences%20(22-23).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View More</a>
                  </p>
                </div>
              </details>
            </div>

            {/* Journal Publications */}
           <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Journal Publications</summary>
                <div className="m-3">
                  <p>
                    Journal during the Academic Year 2023-24 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_STUDENT_Journals_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] font-semibold hover:underline">View More</a>
                  </p>
                </div>
              </details>
            </div>

            {/* Roll of Honour */}
            <div className="tab4 mt-4">
              <details className="border rounded-lg p-4">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Roll of Honour</summary>
                <div className="flex justify-center items-center">
                  <div className="overflow-x-auto w-full">
                   <table className="min-w-full bg-white border border-gray-200">
  <thead className="bg-gray-100">
    <tr>
      <th className="py-3 px-4 border-b text-left">S.No</th>
      <th className="py-3 px-4 border-b text-left">Batch</th>
      <th className="py-3 px-4 border-b text-left">Roll Number</th>
      <th className="py-3 px-4 border-b text-left">Name of the Student</th>
      
      <th className="py-3 px-4 border-b text-left">CGPA / Aggregate</th>
    </tr>
  </thead>
  <tbody>
    {rollOfHonour.map((student, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="py-3 px-4 border-b">{index + 1}</td>
        <td className="py-3 px-4 border-b">{student.batch}</td>
        <td className="py-3 px-4 border-b">{student.rollNumber}</td>
        <td className="py-3 px-4 border-b">{student.name}</td>
        <td className="py-3 px-4 border-b">{student.cgpa}</td>
      </tr>
    ))}
  </tbody>
</table>

                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center">Image Gallery</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <img src="https://srivasaviengg.ac.in/images/departments/cse/rofh.jpg" alt="Roll of Honour 1" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '16/9' }} />
                  <img src="https://srivasaviengg.ac.in/images/departments/cse/RofH1.jpg" alt="Roll of Honour 2" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '16/9' }} />
                  <img src="https://srivasaviengg.ac.in/images/departments/cse/RofH2.jpg" alt="Roll of Honour 3" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '16/9' }} />
                  <img src="https://srivasaviengg.ac.in/images/departments/cse/rofh3.jpg" alt="Roll of Honour 4" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '16/9' }} />
                </div>
              </details>
            </div>

            {/* Awards */}
           <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Awards</summary>
                <div className="nav-content">
                  <ol className="list-decimal mt-5 pl-6 space-y-2">
                    <li>
                      Awards during the Academic Year 2021-22 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/cse_awards_2021-2022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Awards during the Academic Year 2016-17 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/cse_awards_2016-2017.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Awards during the Academic Year 2015-16 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/cse_awards_2015-2016.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Awards during the Academic Year 2008-10 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/cse_awards_2009-2010.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                  </ol>
                </div>
              </details>
            </div>

            {/* GATE */}
             <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>GATE</summary>
                <div className="overflow-x-auto">
                 <table className="min-w-full bg-white border border-gray-200">
  <thead className="bg-gray-100">
    <tr>
      <th className="py-3 px-4 border-b text-left">S.No</th>
      <th className="py-3 px-4 border-b text-left">Roll No</th>
      <th className="py-3 px-4 border-b text-left">Name</th>
      <th className="py-3 px-4 border-b text-left">Score</th>
      <th className="py-3 px-4 border-b text-left">Year</th>
    </tr>
  </thead>
  <tbody>
    {gate.map((student, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="py-3 px-4 border-b">{index + 1}</td>
        <td className="py-3 px-4 border-b">{student.rollNo}</td>
        <td className="py-3 px-4 border-b">{student.name}</td>
        <td className="py-3 px-4 border-b">{student.score}</td>
        <td className="py-3 px-4 border-b">{student.year}</td>
      </tr>
    ))}
  </tbody>
</table>

                </div>
                <div className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <img src="https://srivasaviengg.ac.in/images/departments/cse/Gate List.jpg" alt="GATE List" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '16/9' }} />
                    <img src="https://srivasaviengg.ac.in/images/departments/cse/Gate 2024 copy.jpg" alt="GATE 2024" className="w-full h-auto rounded-lg shadow-md object-cover" style={{ aspectRatio: '16/9' }} />
                  </div>
                </div>
              </details>
            </div>

            {/* GRE */}
             <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>GRE</summary>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 text-center">
                     <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b text-left">S.No</th>
            <th className="py-3 px-4 border-b text-left">Roll No</th>
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Course</th>
            <th className="py-3 px-4 border-b text-left">GRE</th>
            <th className="py-3 px-4 border-b text-left">TOEFL</th>
            <th className="py-3 px-4 border-b text-left"  >IELTS</th>
          </tr>
        </thead>
        <tbody>
          {gre.map((student, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{index + 1}</td>
              <td className="py-3 px-4 border-b">{student.rollNo}</td>
              <td className="py-3 px-4 border-b">{student.name}</td>
              <td className="py-3 px-4 border-b">{student.course}</td>
              <td className="py-3 px-4 border-b">{student.gre}</td>
              <td className="py-3 px-4 border-b">{student.toefl}</td>
              <td className="py-3 px-4 border-b">{student.ielts}</td>
            </tr>
          ))}
        </tbody>
        </table>
                </div>
              </details>
            </div>

            {/* UIF */}
           <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>UIF</summary>
                <div className="nav-content">
                  <ol className="list-decimal mt-5 pl-6 space-y-2">
                    <li>
                      Student Achievements during the Academic Year 2018-19 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse_awards/Stu_Ach_2018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                  </ol>
                </div>
              </details>
            </div>

            {/* NPTEL/Other Certifications */}
             <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>NPTEL/Other Certifications</summary>
                <div className="nav-content">
                  <ol className="list-decimal mt-5 pl-6 space-y-2">
                    <li>
                      Certifications during the A.Y 2024-25 -{' '}
                      <a href="https://www.srivasaviengg.ac.in/uploads/Nptel and Global 2024-25 (CSE).pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Certifications during the A.Y 2023-24 -{' '}
                      <a href="https://www.srivasaviengg.ac.in/uploads/Certifications%20during%20the%20A.Y%202023-24_CSE.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Certifications during the A.Y 2022-23 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/CSE_Nptel%20&%20Others%20during%202022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Certifications during the A.Y 2021-22 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/Certifications%20during%20the%20A.Y%202021-22_CSE.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Certifications during the A.Y 2020-21 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/Certifications%20during%20the%20A.Y%202020-21_CSE.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Certifications during the A.Y 2019-20 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/Certifications%20during%20the%20A.Y%202019-20_CSE.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Certifications during the A.Y 2018-19 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/NPTEL%20Certified%20Student%20List%20Jan_Apr_2019.pdf" target ="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                  </ol>
                </div>
              </details>
            </div>

            {/* Community Service Project */}
           <div className="pt-3 space-y-4">
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Community Service Project</summary>
                <div className="nav-content">
                  <ol className="list-decimal mt-5 pl-6 space-y-2">
                    <li>
                      List of CSP Projects done by 2022-26 Batch Students -{' '}
                      <a href="https://www.srivasaviengg.ac.in/uploads/cse-csp/List%20of%20CSP%20Projects%20done%20by%202022-26%20Batch%20Students.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      List of CSP Projects done by 2021-25 Batch Students -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/List%20of%20CSP%20Projects%20done%20by%202021-25%20Batch%20Students.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      List of CSP Projects done by 2020-24 Batch Students -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/List%20of%20CSP%20Projects%20done%20by%202020-24%20Batch%20Students.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                  </ol>
                </div>
              </details>
            </div>

            {/* Student Research Projects */}
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Student Research Projects</summary>
           
                <div className="nav-content">
                  <h3 className="my-2 font-semibold">B.Tech</h3>
                  <ol className="list-decimal mt-5 pl-6 space-y-2">
                    <li>
                      Projects during the A.Y - 2024-25 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/CSE Best Main Projects_ A.Y 24-25.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2023-24 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/CSE Best Main Projects_ A.Y 23-24.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2022-23 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/Projects%20during%20the%202022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2021-22 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/Projects%20during%20the%202021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2020-21 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/Projects%20during%20the%202020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2019-20 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/Projects%20during%20the%202019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2018-19 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/Projects%20during%20the%20A.Y%202018-19.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                  </ol>

                  <h3 className="my-2 font-semibold">M.Tech</h3>
                  <ol className="list-decimal mt-5 pl-6 space-y-2">
                    <li>
                      Projects during the A.Y - 2021-23 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/M.%20Tech%20(CS)%202021-23%20Batch%20Projects.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2020-22 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/M.%20Tech%20(CSE)%202020-22%20Batch%20Projects.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2019-21 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/M.%20Tech%20(CSE)%202019-21%20Batch%20Projects.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2018-20 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/M.%20Tech%20(CSE)%202018-20%20Batch%20Projects.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                    <li>
                      Projects during the A.Y - 2017-19 -{' '}
                      <a href="http://srivasaviengg.ac.in/uploads/cse-csp/M.%20Tech%20(CSE)%202017-19%20Batch%20Projects.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">View More</a>
                    </li>
                  </ol>
                </div>
              </details>
            </div>
          </div>
        );
     
      case 'Hackathons':
        console.log("Rendering Hackathons section");
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
              <li className="text-gray-700">
                <span className="font-medium">Networking and industry exposure:</span> Student hackathons often
                attract participants, mentors, and judges from various
                industries and organizations. This provides an excellent
                networking opportunity for students to connect with
                professionals, potential employers, and like-minded peers.
                Building connections during a hackathon can lead to future
                internships, job opportunities, or collaborations on other
                projects.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Skill development:</span> Hackathons offer a platform for students to
                enhance their existing skills and acquire new ones. During the
                event, participants may have to learn and use new technologies,
                programming languages, or tools to complete their projects. This
                process helps broaden their skillset, exposes them to different
                technologies, and allows them to experiment with cutting-edge
                tools and platforms.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Resume/portfolio enhancement:</span> Participating in hackathons adds
                value to a student's resume or portfolio. It demonstrates their
                passion for learning, problem-solving ability, teamwork skills,
                and ability to work under pressure. Employers and educational
                institutions often consider hackathon experience as a strong
                indicator of a student's practical skills and motivation.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Recognition and awards:</span> Many hackathons offer prizes,
                recognition, or opportunities for participants to showcase their
                projects to a wider audience. Winning or being recognized in a
                hackathon can boost a student's confidence, provide validation
                for their work, and open doors to further opportunities.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-8">
              In conclusion, 24-hour student hackathons are important because
              they promote hands-on learning, foster collaboration, encourage
              innovation, provide networking opportunities, facilitate skill
              development, enhance resumes/portfolios, and offer recognition for
              participants. They serve as a platform for students to showcase
              their abilities, learn from their peers, and gain valuable
              experience in a short period.
            </p>

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
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">2022-23</td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackoverflow%20banner_2022_23.png"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2022-23.pdf"
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
                          href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/broacher_2021_22.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2021-22.pdf"
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
                          href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Brouchure.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2019-20.pdf"
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
                          href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/City%20Digi%20@Hack%202K18.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#850209] hover:underline"
                        >
                          Click Here
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20winners_2018-19.pdf"
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

            {/* Gallery Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">Gallery</h3>
              <h4 className="text-xl font-medium text-center mb-6">Hackathon 2022</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-6">
                  <img
                    src="https://srivasaviengg.ac.in/images/departments/cse/Hackthon_2022_23 (1).jpg"
                    alt="Hackathon 2022 Image 1"
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    style={{aspectRatio: "16/9"}}
                  />
                  <img
                    src="https://srivasaviengg.ac.in/images/departments/cse/Hackthon 2021_22 (1).jpeg"
                    alt="Hackathon 2021 Image 1"
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    style={{aspectRatio: "16/9"}}
                  />
                </div>
                <div className="flex flex-col space-y-6">
                  <img
                    src="https://srivasaviengg.ac.in/images/departments/cse/Hackthon 2021_22 (1).jpeg"
                    alt="Hackathon 2021 Image 2"
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    style={{aspectRatio: "16/9"}}
                  />
                  <img
                    src="https://srivasaviengg.ac.in/images/departments/cse/Hackthon_2022_23 (2) (1).jpg"
                    alt="Hackathon 2022 Image 2"
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    style={{aspectRatio: "16/9"}}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              The Department of Computer Science & Engineering was established in 2001. The department offers undergraduate program in Computer Science & Engineering with an intake of 180 students.
            </p>
          </div>
        );

         case 'e-Resources':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              e-Resources
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Innovations by the Faculty in Teaching and Learning. Activities of
              the department towards improvement in teaching-learning are
              indicated in the office records as well as on the college website.
              They are open for reproduction, further improvement, and review.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Some of the methods adopted by the faculty members in Teaching &
              Learning are:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
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

            <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">R16- Subjects</h3>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">S.No</th>
                    <th className="py-3 px-4 border-b text-left">Regulation</th>
                    <th className="py-3 px-4 border-b text-left">Year</th>
                    <th className="py-3 px-4 border-b text-left">Subject</th>
                    <th className="py-3 px-4 border-b text-left">PPT</th>
                    <th className="py-3 px-4 border-b text-left">QBank</th>
                    <th className="py-3 px-4 border-b text-left">OldQP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">R16</td>
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">Computer Programming</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/cprogrammingppts.zip" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QB/ComputerProgrammingQuestionBank.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QP/oldquestionpapers.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">R16</td>
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">Data Structures through C++</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/DSPPT.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QB/DSQuestionBank.docx" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QP/DSQuestionPapers.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">3</td>
                    <td className="py-3 px-4 border-b">R16</td>
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">Advanced Data Structures</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/ADSPPTS.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QB/ADSQuestionBank.docx" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QP/ADSQuestionPapers.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-[#850209] mb-6 text-center">R13- Subjects</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">S.No</th>
                    <th className="py-3 px-4 border-b text-left">Regulation</th>
                    <th className="py-3 px-4 border-b text-left">Year</th>
                    <th className="py-3 px-4 border-b text-left">Subject</th>
                    <th className="py-3 px-4 border-b text-left">PPT</th>
                    <th className="py-3 px-4 border-b text-left">QBank</th>
                    <th className="py-3 px-4 border-b text-left">OldQP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">R13</td>
                    <td className="py-3 px-4 border-b">3</td>
                    <td className="py-3 px-4 border-b">Software Engineering</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/SEPPTs.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QB/SEQB.doc" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QP/SEOQP.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">2</td>
                    <td className="py-3 px-4 border-b">R13</td>
                    <td className="py-3 px-4 border-b">3</td>
                    <td className="py-3 px-4 border-b">Database Management Systems</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/DBMSPPTs.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QB/DBMSQB(R13).doc" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QP/DBMSOldQP.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">3</td>
                    <td className="py-3 px-4 border-b">R13</td>
                    <td className="py-3 px-4 border-b">4</td>
                    <td className="py-3 px-4 border-b">Distributed Systems</td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/PPT/DS-NOTES.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QB/DSQB.docx" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a href="https://srivasaviengg.ac.in/uploads/materials/QP/DSQP.rar" target="_blank" rel="noopener noreferrer" className="text-[#850209] hover:underline">Download</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
        
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
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'SalientFeatures'].map((tab) => (
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
                          <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View</a>
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
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Journal Publications</summary>
           
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
            
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Conferences</summary>
           
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
            
          <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Book Publications</summary>
           
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
            
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Certifications</summary>
           
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
            
                        <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Patents</summary>
      
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
            
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Research Supervisors</summary>
           
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
            
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Awards</summary>
           
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
            
           <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Faculty Out-Research</summary>
           
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
                <details open className="bg-white border rounded-lg overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Seminar Halls</summary>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "90px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "90px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "90px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "90px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "90px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "120px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "120px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "120px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "120px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "120px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                              <th className="py-2 px-4 border text-left" style={{minWidth: "90px"}}>Name of the Lab</th>
                              <th className="py-2 px-4 border text-left" style={{minWidth: "300px"}}>Configuration</th>
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
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/James Gosling Lab.jpg" alt="JG Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">James Gosling Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/E F Codd LAb.jpg" alt="EF Codd Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">EF Codd Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Linus Torvalds Lab.jpg" alt="Linus Torvalds Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Linus Torvalds Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/pgcplab.jpg" alt="PG CP Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">PG CP Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Sartaj Sahni Lab.jpg" alt="R & D Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">R & D Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Yellow Lab.jpg" alt="Yellow Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Yellow Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Pink Lab.jpg" alt="Pink Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Pink Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Orange Lab.jpg" alt="Orange Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Orange Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Green Lab.jpg" alt="Green Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
                        <h4 className="text-lg font-medium text-center mt-3 text-green-700">Green Lab</h4>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="https://srivasaviengg.ac.in/images/departments/cse/Brown Lab.jpg" alt="Brown Lab" className="w-full h-auto rounded-lg shadow-md object-cover" style={{aspectRatio: "16/9"}} />
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
    {organizations.map((org, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="py-3 px-4 border-b">{index + 1}</td>
        <td className="py-3 px-4 border-b">{org.name}</td>
        <td className="py-3 px-4 border-b">{org.from}</td>
        <td className="py-3 px-4 border-b">{org.to}</td>
        <td className="py-3 px-4 border-b">
          <a
            className="text-[#850209] hover:underline"
            href={org.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        </td>
      </tr>
    ))}
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
            <div className="pt-3 space-y-4">
              <details open  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Workshops/SOC</summary>
           
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
           
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Guest Lecturers/Seminars</summary>
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
                          style={{aspectRatio: "16/9"}}
                        />
                      </div>
                      <div className="w-full lg:w-5/12 m-3">
                        <img
                          src="http://srivasaviengg.ac.in/images/departments/cse/GL-PIC 2.jpg"
                          alt="Guest Lecture Image 2"
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          style={{aspectRatio: "16/9"}}
                        />
                      </div>
                      <div className="w-full lg:w-5/12 m-3">
                        <img
                          src="http://srivasaviengg.ac.in/images/departments/cse/GL-PIC 3.jpg"
                          alt="Guest Lecture Image 3"
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          style={{aspectRatio: "16/9"}}
                        />
                      </div>
                      <div className="w-full lg:w-5/12 m-3">
                        <img
                          src="http://srivasaviengg.ac.in/images/departments/cse/GL-PIC 4.jpg"
                          alt="Guest Lecture Image 4"
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          style={{aspectRatio: "16/9"}}
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
 <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              <br/>
              <details>
                 <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              <br/>
              <details>
                 <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              <br/>
              <details>
                 <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              <br/>
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              <br/>
              <details>
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                      style={{aspectRatio: "16/9"}}
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/g1.jpg"
                      alt="Training Activity Image 2"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      style={{aspectRatio: "16/9"}}
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/g2.jpg"
                      alt="Training Activity Image 3"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      style={{aspectRatio: "16/9"}}
                    />
                  </div>
                  <div className="w-full lg:w-5/12 m-3">
                    <img
                      src="http://srivasaviengg.ac.in/images/departments/cse/g3.jpg"
                      alt="Training Activity Image 4"
                      className="w-full h-auto rounded-lg shadow-md object-cover"
                      style={{aspectRatio: "16/9"}}
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>    Placements for Batch 2012-16
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>    Placements for Batch 2011-15
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
            </div>
          </div>
        );
        
      case 'Handbooks':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              Academic HandBooks
            </h2>
            <div className="space-y-4">
              <details open className="bg-white border rounded-lg overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2025-26: I Sem HandBooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      III Sem V23 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_III  SEM Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      V Sem V23 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_V SEM Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VII Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_VII SEM Handbook.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2024-25: II Sem HandBooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      IV Sem V23 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/2024-25_IV%20SEM%20Hand%20Book_CSE.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VI Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_VI%20Semester%20Handbook.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2024-25: I Sem HandBooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      III Sem V23 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/III%20%20SEM%20(Autonomous)%20Handbook%20-%20CSE%20.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      V Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/V%20SEM%20CSE%20Handbook_2024-25.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VII Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/VII%20SEM%20V20%20Regulation%20Handbook_CSE.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2023-24: II Sem HandBooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      III Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/III%20SEM%20CSE%20V20%20Regulation%20Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      IV Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/III%20SEM%20CSE%20V20%20Regulation%20Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VI Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/VI%20SEM%20_CSE_Handbook.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2023-24: I Sem HandBooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      III Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/III%20%20SEM%20(Autonomous)%20Handbook%20-%20CSE.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      V Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/V%20SEM%20Handbook_V20%20Regulation_2023-24.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VII Sem V20 Regulation Handbook - 
                      <a 
                        href="https://srivasaviengg.ac.in/uploads/VII%20SEM%20Handbook_V20%20Regulation_2023-24.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2022-23: II Sem Handbooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      IV Sem V20 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/IV%20Sem%20V20%20Regulation%20Handbook_CSE.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VI Sem V20 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/VI%20Sem%20V20%20Regulation%20Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VIII Sem V18 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/VIII%20Sem%20%20V20%20Regulation%20Handbook.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2022-23: I Sem Handbooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      III Sem V20 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/III%20SEM%20V20%20Regulation%20Handbook%20(CSE).pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      V Sem V20 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/V%20SEM%20CSE%20%20V20%20Regulation%20Handbook%2022_23.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VII Sem V18 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/VII%20SEM%20CSE%20V18%20Regulation%20Handbook%2022_23.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2021-22: II Sem Handbooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      IV Sem V20 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/IV%20Semester%20Handbook%20_V20%20Regulation.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VI Sem V18 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/VI%20Semester%20Handbook_22.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VIII Sem V18 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/VIII%20SEM%20CSE%20V18%20Regulation%20Handbook.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2021-22: I Sem Handbooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      III Sem V20 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/III%20SEM%20CSE%20&%20CST%20V20%20Regulation%20Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      V Sem V18 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/V%20SEM%20CSE%20&%20CST%20V18%20Regulation%20Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VII Sem V18 Regulation Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/VII%20SEM%20CSE%20V18%20Regulation%20Handbook.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2020-21: II Sem Handbooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      IV Sem V18(Autonomous) Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/B.Tech(CSE)%20IV%20Semester%20V18(Autonomous).pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      VI Sem V18(Autonomous) Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/B.Tech(CSE)%20VI%20Semester%20V18(Autonomous).pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      IV Year II Sem R16 Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/B.Tech(CSE)%20IV%20Yr.%20II%20Semester%20R16%20Regulation.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic Year 2020-21: I Sem Handbooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      III Sem V18(Autonomous) Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/CSE_III_SEM_Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      V Sem V18(Autonomous) Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/CSE_V_SEM_Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      IV Year I Sem R16 Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/CSE_IVYr_I_SEM_Handbook.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic year 2019-20: II Sem Handbooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      IV Sem V18(Autonomous) Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/II-II_Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      III Year II Sem R16 Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/III-II_Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      IV Year II Sem R16 Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/IV-II_Handbook.pdf" 
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
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
                  Academic year 2019-20: I Sem Handbooks
                </summary>
                <div className="px-4 py-3">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      III Sem V18(Autonomous) Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/II-I_Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      III Year I Sem R16 Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/III-I_Handbook.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#850209] hover:underline ml-2"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      IV Year I Sem R16 Handbook - 
                      <a 
                        href="http://srivasaviengg.ac.in/uploads/IV-I_Handbook.pdf" 
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
                <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                  <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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

                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
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
            <div className="pt-3 space-y-4">
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>

              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
              
              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>    Newsletter Volume 13 Issue 1 2022
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
              </details></div>
              
              <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>

            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>

            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>

            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>

            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>

            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>

            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
           
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
              </div>
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
           
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
              </div>
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
           
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
              </div>
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
           
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
              </div>
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              </div>
             <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
           Newsletter Volume 7 Issue 2 2016</summary>
              <li className="p-3">
                Newsletter Volume 7 Issue 2 2016 -
                <a
                  href="http://srivasaviengg.ac.in/uploads/Jul-16.pdf"
                  target="_blank"
                  id="pdfDOWNLOADER11"
                  >View</a
                >
              </li>

            </details>
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 7 Issue 1 2016</summary>
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
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
              Newsletter Volume 6 Issue 4 2016</summary>
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
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 6 Issue 3 2015</summary>
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
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 6 Issue 2 2015</summary>
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
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 6 Issue 1 2015</summary>
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
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 5 Issue 4 2015</summary>
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
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 5 Issue 3 2014</summary>
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
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>Newsletter Volume 5 Issue 2 2014</summary>
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
            </div>
            <div className="pt-3 space-y-4">
              <details  className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
              <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
            <div className="pt-3 space-y-4">
              <details   open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
           
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
              
                <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
            
               <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">
            
                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              <details open className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
              
              <details className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm">

                <summary className="px-4 py-3 cursor-pointer text-lg font-semibold text-white" style={{backgroundColor: 'rgba(136,25,25,1)'}}>
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
            <h1 className="text-3xl md:text-4xl font-bold">Basic Sciences and Humanities</h1>
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

export default CSEDepartment;
