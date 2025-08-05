
import React, { useState } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll } from 'lucide-react';

const CSEDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Physical Facilities', 'Department Library', 'MoUs', 'Faculty Development Programs', 'Faculty Achievements', 'Workshops', 'Student Achievements', 'Placements', 'Merit Scholarship/Academic Toppers', 'Technical Association', 'Training Activities', 'Newsletters', 'Extra-Curricular Activities', 'Hackathons', 'e-Resources', 'Handbooks', 'Contact'
  ];

  const faculty = [
    { name: "Dr. D.Jaya Kumari", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr%20D.Jaya%20Kumari-Web%20Profile.pdf" },
    { name: "Dr. V.Venkateswara Rao", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20Venkateswara%20Rao%20Web%20Profile.pdf" },
    { name: "Dr. V.S.Naresh", qualification: "M.Tech.,Ph.D", designation: "Professor & Dean(R&D)", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.V.S.Naresh.pdf" },
    { name: "Dr. K.Shirin Bhanu", qualification: "M.Tech.,Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.Shirin%20Bhanu%20Koduri.pdf" },
    { name: "Dr. E Nagarjuna", qualification: "M.Tech.,Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20E%20Nagarjuna.pdf" },
    { name: "Dr. K Venkata Ramana", qualification: "M.Tech.,Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20K%20Venkata%20Ramana.pdf" },
    { name: "Dr. G Sivaraman", qualification: "M.Tech.,Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20G%20Sivaraman.pdf" },
    { name: "Mrs. A.Leelavathi", qualification: "M.Tech,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_A.%20Leelavathi.pdf" },
    { name: "Mrs. D.Anjani Suputri Devi", qualification: "M.Tech,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Anjani%20SuputriDeviD.pdf" },
    { name: "Mr. G.Nataraj", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Nataraj%20G.pdf" },
    { name: "Ms. D.Sasi Rekha", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Sasi%20Rekha.pdf" },
    { name: "Mrs. B.Sri Ramya", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_B.Sriramya-%20Web%20profile.pdf" },
    { name: "Mr. G.Sriram Ganesh", qualification: "M.Tech,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_GSRIRAMGANESH.pdf" },
    { name: "Mr. N.V.Murali Krishna Raja", qualification: "M.Tech,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_%20N%20V%20MURALIKRISHNA%20RAJA.pdf" },
    { name: "Mrs. N.Hiranmayee", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Hiranmayee.pdf" },
    { name: "Mr. A.Rajesh", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_A.Rajesh-Web%20Profile.pdf" },
    { name: "Mr. M.Nageswara Rao", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_MNRAO.pdf" },
    { name: "Mrs. Y.Divya Vani", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Y%20Divya%20Vani.pdf" },
    { name: "Mr. K.Lakshminarayana", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_K.%20Lakshmi%20Narayana-%20Web%20profile.pdf" },
    { name: "Ms. A.Kiranmai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_A.kiranmai-%20Web%20profile.pdf" },
    { name: "Ms. G.SiriVenkata Bhanu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_G.s.v.%20Bhanu%20-%20Web%20profile.pdf" },
    { name: "Mrs. D.S.L Manikanteswari", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_D%20S%20L%20Manikanteswrai.pdf" },
    { name: "Mr. M.V.V Krishna", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_M.V.V.KRISHNA.pdf" },
    { name: "Mr. P.Uma Sankar", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20P.%20Uma%20Sankar.pdf" },
    { name: "Mr. M.S.KumarReddy", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/S.KumarReddy%20MallidiMS%20Kumar%20Reddy%20Web%20Profile.pdf" },
    { name: "Mr. P.Rajesh", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_P.%20Rajesh.pdf" },
    { name: "Ms. M.Santhi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_MSANTHI_WEB_PROFILE.pdf" },
    { name: "Mrs. A.Nagajyothi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_A.Nagajyothi-%20Web%20profile.pdf" },
    { name: "Mrs. G.Prasanthi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_G.Prasanthi_web_profile.pdf" },
    { name: "Mr. K. Praveen Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Praveen_Webprofile.pdf" },
    { name: "Ms. G. Nagavallika", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_G.Nagavallika_WebProfile.pdf" },
    { name: "Mr. G. N V Ratnakishor", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_G.N%20V%20Ratnakishor.pdf" },
    { name: "Mrs. M. N. V Surekha", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_surekha_profile_WEB.pdf" },
    { name: "Mr. P. Ramamohan Rao", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_P.RamamohanRao.pdf" },
    { name: "Mr. E. Vimalraj", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20E.%20Vimalraj.pdf" },
    { name: "Mr. M V V G Krishna Murthy", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.MVVGKrishnaMurthy.pdf" },
    { name: "Mr. G. Mahesh", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.G.Mahesh.pdf" },
    { name: "Mr. V. Gajendra Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20V.%20Gajendra%20Kumar.pdf" },
    { name: "Mrs. J. Kanimozhi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20J.%20Kanimozhi.pdf" },
    { name: "Mr. U. Jagadeesan", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20U.%20Jagadeesan.pdf" },
    { name: "Mrs. V. Nandini", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20V.%20Nandini.pdf" },
    { name: "Mr. Krishna", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20Krishna.pdf" },
    { name: "Mr. J.Dhandapani", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20J.Dhandapani.pdf" },
    { name: "Mrs. T. Anu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20T.%20Anu.pdf" },
    { name: "Mr. T. Anil Kumar Reddy", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20T.Anil%20Kumar%20Reddy.pdf" },
    { name: "Mr. P. Rishikesh Sritanay", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.T.Pagadala%20Rishikesh%20Sri%20Tanay.pdf" },
    { name: "Mrs. Shaik Apsaruneesa", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20Shaik%20Apsaruneesa.pdf" },
    { name: "Mrs. K. Sri Durga Achuta", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20K.%20Sri%20Durga%20Achuta.pdf" },
    { name: "Mr. V Venugopal", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20V.%20Venugopal.pdf" },
    { name: "Mr. L. Atri Datta Ravi Tez", qualification: "M.Tech", designation: "Asst. Professor & Web Developer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_L.A.D%20RAVITEZ.pdf" },
    { name: "Mr. Md. Sadik", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Sadik.pdf" },
    { name: "Ms. R. Nava Lavanya", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20R.%20Nava%20Lavanya.pdf" },
    { name: "Dr. G. Tej Varma", qualification: "M.Tech.,Ph.D", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20G.%20Tej%20Varma.pdf" },
    { name: "Ms. M. Pravallika", qualification: "M.C.A", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20M.%20Pravallika.pdf" },
    { name: "Mrs. M. Sai Durga Lakshmi", qualification: "M.C.A", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20M.%20Sai%20Durga%20Lakshmi.pdf" },
    { name: "Ms. V Pavani Siva Prathyusha", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.Prathyusha.pdf" },
    { name: "Ms. T. Pranusha", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_MS.T.Pranusha.pdf" },
    { name: "Mr.P. Gopinath", qualification: "M.C.A", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.P.Gopinath.pdf" },
    { name: "Ms. N. Sri Sai Sindhu", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20N.%20Sri%20Sai%20Sindhu.pdf" },
    { name: "Ms. Y. Sabitha Yali", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20Y.%20Sabitha%20Yali.pdf" },
    { name: "Ms. M. Vineela", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20M.%20Vineela.pdf" },
    { name: "Ms. K. Ramya", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20K.%20Ramya.pdf" },
    { name: "Mr. K. Phanindra Brahmaji", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20K.%20Phanindra%20Brahmaji.pdf" }
  ];

  const nonTeachingFaculty = [
    { name: "Ms. U.Devi Lakshmi", designation: "DEO" },
    { name: "Mrs. K. Bhagya Sri", designation: "DEO" },
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
    { name: "Mr. N Lokesh Babu", designation: "Lab Assistant" },
    { name: "Mr. D.Srinivasa Rao", designation: "Attender" },
    { name: "Mr. M.Siva Krishna", designation: "Attender" },
    { name: "Mrs. A.Sri Karuna Kumari", designation: "Attender" },
    { name: "Mr. V. Venkateswara Rao", designation: "Attender" }
  ];


  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Department of Computer Science & Engineering was established in 2001. The department offers undergraduate program in Computer Science & Engineering with an intake of 180 students and has grown into one of the most sought-after destinations for quality education in this region. The department has state-of-the-art infrastructure and computing equipment supported by high-speed internet facility.
            </p>
          </div>
        );
      case 'Vision':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To evolve into a center of excellence in Computer Science & Engineering education and research, producing professionally competent and socially responsible engineers.
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
              <li>Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and computer science & engineering principles.</li>
              <li>Analyze real-life problems and design socially responsible and environmentally sustainable computer-based solutions.</li>
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
              <li><strong>Engineering Knowledge:</strong> Apply knowledge of mathematics, science, engineering fundamentals, and computer science & engineering principles to solve complex engineering problems.</li>
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
              <li>Apply standard practices and strategies in software development using open-ended programming environments to deliver quality software solutions.</li>
              <li>Apply the fundamentals of computer science & engineering to solve engineering problems in interdisciplinary domains.</li>
              <li>Develop applications using emerging technologies to provide innovative solutions for real-world problems.</li>
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
              <a href="#" className="text-[#B22222] hover:underline">Download Course Outcomes Document</a>
            </p>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
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
      default:
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              The Department of Computer Science & Engineering was established in 2001. The department offers undergraduate program in Computer Science & Engineering with an intake of 180 students.
            </p>
          </div>
        );
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
                  src="/images/departments/cse/cse_hod1.jpeg"
                  alt="Dr. D. Jaya Kumari"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="female professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. D. Jaya Kumari</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, CSE</p>
                  <p className="text-gray-600">Ph.D in Computer Science, M.Tech CSE</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_cse@srivasaviengg.ac.in" className="text-primary hover:underline">hod_cse@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Computer Science and Engineering (CSE) was established in 2001 with an initial intake of 60 students. Over the years, it has grown significantly, with the intake increasing to 240 students for the B.Tech program. The department also offers an M.Tech program in Computer Science since 2020. Our vision is to evolve as a center of academic and research excellence in the area of Computer Science and Engineering.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
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

            <h2 className="text-3xl font-bold text-[#B22222] mb-6 mt-12 text-center">Non-Teaching Staff</h2>
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
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  const [activeDeptTab, setActiveDeptTab] = useState('Department');

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Computer Science & Engineering</h1>
          </div>
        </div>
      </section>
      <div className="bg-white border-b shadow">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <nav className="flex flex-nowrap whitespace-nowrap py-2">
              <button
                onClick={() => setActiveDeptTab('Department')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'Department' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
              >
                Department
              </button>
              <button
                onClick={() => setActiveDeptTab('Vision')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'Vision' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
              >
                Vision
              </button>
              <button
                onClick={() => setActiveDeptTab('Mission')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'Mission' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
              >
                Mission
              </button>
              <button
                onClick={() => setActiveDeptTab('PEOs')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'PEOs' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
              >
                PEOs
              </button>
              <button
                onClick={() => setActiveDeptTab('POs')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'POs' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
              >
                POs
              </button>
              <button
                onClick={() => setActiveDeptTab('PSOs')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'PSOs' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
              >
                PSOs
              </button>
              <button
                onClick={() => setActiveDeptTab('COs')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200 mr-2 
                  ${activeDeptTab === 'COs' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
              >
                COs
              </button>
              <button
                onClick={() => setActiveDeptTab('SalientFeatures')}
                className={`px-4 py-2 font-medium text-sm transition-colors duration-200
                  ${activeDeptTab === 'SalientFeatures' ? 'text-[#B22222] border-b-2 border-[#B22222] font-bold' : 'text-gray-700 hover:text-[#B22222]'}`}
              >
                Salient Features
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow mb-8">
          {renderDeptTabContent()}
        </div>
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
                          setSidebarOpen(false);
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

export default CSEDepartment;
