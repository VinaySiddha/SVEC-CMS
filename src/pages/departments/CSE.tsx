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
          <div>
            {/* Head of Department's Message */}
            <div className="mb-10">
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
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Department of Computer Science and Engineering (CSE) was established in 2001 with an initial intake of 60 students. Over the years, it has grown significantly, with the intake increasing to 120 seats in 2006, to 180 seats in 2013, to 240 seats in 2015, and now to 300 seats in 2024 for the B.Tech program. The department also offers an M.Tech program in Computer Science since 2020 with an intake of 12 seats.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our vision is to evolve as a center of academic and research excellence in Computer Science and Engineering. The department has state-of-the-art infrastructure and computing facilities supported by high-speed internet connectivity. Our faculty members are highly qualified and experienced in various domains of computer science, actively engaged in research and publications.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We focus on providing quality education through effective teaching-learning processes, practical exposure through industry collaborations, and fostering innovation through research activities. Our students are encouraged to participate in various technical events, workshops, and internships to enhance their skills and stay updated with the latest technological advancements.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Department Overview Section */}
            <div className="border-t pt-10 mt-10">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Department of Computer Science & Engineering was established in 2001 with an intake of 60 seats in B.Tech. From 2006 onwards the intake was increased to 120 seats. From 2013 onwards the intake was increased to 180 seats. From 2015 onwards intake was increased to 240 seats. From 2024 onwards intake was increased to 300 seats.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                CSE Department is offering M.Tech (CS) program from 2020 onwards with a present intake of 12 seats. The department has state-of-the-art infrastructure and computing equipment supported by high-speed internet facility.
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
                      <td className="px-6 py-4">B.Tech-Computer Science and Engineering</td>
                      <td className="px-6 py-4">AP EAPCET</td>
                      <td className="px-6 py-4">4 Years</td>
                      <td className="px-6 py-4">300</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">2</td>
                      <td className="px-6 py-4">M.Tech-Computer Science</td>
                      <td className="px-6 py-4">GATE / PGECET</td>
                      <td className="px-6 py-4">2 Years</td>
                      <td className="px-6 py-4">12</td>
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
      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">
              LIBRARY
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              {/* Image on the left */}
              <div className="md:w-1/2">
                <img
                  src="/images/departments/cse/cse-lib.jpg"
                  alt="Faculty Incharge"
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
            {/* Navigation Tab - Moved Here */}
            <div className="bg-white mb-8">
              <div className="overflow-x-auto">
                <nav className="flex flex-nowrap whitespace-nowrap py-2 justify-center">
                  <button
                    onClick={() => setActiveDeptTab('Department')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'Department' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    Department
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('Vision')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'Vision' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    Vision
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('Mission')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'Mission' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('PEOs')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'PEOs' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    PEOs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('POs')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'POs' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    POs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('PSOs')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'PSOs' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    PSOs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('COs')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'COs' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    COs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('SalientFeatures')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'SalientFeatures' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    Salient Features
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Content Area that changes completely based on selected tab */}
            {renderDeptTabContent()}
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


      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>
            <div className="section mb-6">
              <details open>
                <summary className="text-lg font-semibold text-[#B22222]">FDP Attended</summary>
                <ul className="my-2 space-y-2">
                  <li className="fdp-item">FDPs attended by the Faculty 2024-25 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_FDPs%20in%20A.Y%202024-2025.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2023-24 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202023-2024.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2022-23 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202022-2023.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2021-22 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202021-2022.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2020-21 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPS%20Attended%20by%20the%20faculty%202020-21.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2019-20 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPS%20Attended%20by%20the%20faculty%202019-20.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2018-19 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse%202018-2019%20fdp's.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2017-18 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/fdp-2017-2018.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2016-17 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/fdp-2016-2017.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2015-16 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/fdp-2015-2016.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2014-15 - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/fdp-2014-2015.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
            <div className="nav-content mb-6">
              <details>
                <summary className="text-lg font-semibold text-[#B22222]">FDPs/ Workshops/ Training Programmes Conducted</summary>
                <ul className="my-2 space-y-2">
                  <li className="fdp-item">FDPs conducted by the Department to the Faculty - <a href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20facultys.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
            <div className="nav-content mt-8">
              <details>
                <summary className="text-lg font-semibold text-[#B22222]">Gallery</summary>
                <div className="container mx-auto">
                  <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="/images/departments/cse/fdp_25_26.jpg" alt="FDP 2024-25" className="rounded-lg shadow-md w-full h-auto" />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="/images/departments/cse/FDP-2022-09-13-16.jpg" alt="FDP 2022-09-13-16" className="rounded-lg shadow-md w-full h-auto" />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="/images/departments/cse/FDP-2022-09-13.jpg" alt="FDP 2022-09-13" className="rounded-lg shadow-md w-full h-auto" />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="/images/departments/cse/FDP-2022-10-01-17.jpg" alt="FDP 2022-10-01-17" className="rounded-lg shadow-md w-full h-auto" />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <img src="/images/departments/cse/FDP-2022100117.jpg" alt="FDP 2022100117" className="rounded-lg shadow-md w-full h-auto" />
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
        
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
            
            {/* Research Publications */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Research Publications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                  <h5 className="text-lg font-semibold text-center text-[#B22222] mb-2">International Journals</h5>
                  <p className="text-2xl font-bold text-red-600 text-center">120+</p>
                </div>
                <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                  <h5 className="text-lg font-semibold text-center text-[#B22222] mb-2">International Conferences</h5>
                  <p className="text-2xl font-bold text-red-600 text-center">85+</p>
                </div>
              </div>
              
              <details>
                <summary className="text-lg font-semibold text-[#B22222] cursor-pointer">Journal Publications</summary>
                <ul className="my-2 space-y-2">
                  <li>Journal Publications 2024-25 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li>Journal Publications 2023-24 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li>Journal Publications 2022-23 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li>Journal Publications 2021-22 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li>Journal Publications 2020-21 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
              
              <details className="mt-4">
                <summary className="text-lg font-semibold text-[#B22222] cursor-pointer">Conference Publications</summary>
                <ul className="my-2 space-y-2">
                  <li>Conference Publications 2024-25 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li>Conference Publications 2023-24 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li>Conference Publications 2022-23 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li>Conference Publications 2021-22 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li>Conference Publications 2020-21 - <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
            
            {/* Books Published */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Books Published</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border">S.No</th>
                      <th className="py-3 px-4 border">Title of the Book</th>
                      <th className="py-3 px-4 border">Author(s)</th>
                      <th className="py-3 px-4 border">Publisher</th>
                      <th className="py-3 px-4 border">Year</th>
                      <th className="py-3 px-4 border">ISBN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border">1</td>
                      <td className="py-3 px-4 border">Advanced Machine Learning Algorithms</td>
                      <td className="py-3 px-4 border">Dr. V.S. Naresh</td>
                      <td className="py-3 px-4 border">Springer</td>
                      <td className="py-3 px-4 border">2024</td>
                      <td className="py-3 px-4 border">978-3-XXX-XXXXX-X</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border">2</td>
                      <td className="py-3 px-4 border">Cloud Computing: Principles and Practices</td>
                      <td className="py-3 px-4 border">Dr. K. Venkata Ramana, Dr. D. Jaya Kumari</td>
                      <td className="py-3 px-4 border">CRC Press</td>
                      <td className="py-3 px-4 border">2023</td>
                      <td className="py-3 px-4 border">978-1-XXX-XXXXX-X</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border">3</td>
                      <td className="py-3 px-4 border">Introduction to Deep Learning</td>
                      <td className="py-3 px-4 border">Dr. K. Shirin Bhanu</td>
                      <td className="py-3 px-4 border">Wiley</td>
                      <td className="py-3 px-4 border">2023</td>
                      <td className="py-3 px-4 border">978-0-XXX-XXXXX-X</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Patents */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Patents</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border">S.No</th>
                      <th className="py-3 px-4 border">Title of the Patent</th>
                      <th className="py-3 px-4 border">Inventor(s)</th>
                      <th className="py-3 px-4 border">Patent Number</th>
                      <th className="py-3 px-4 border">Status</th>
                      <th className="py-3 px-4 border">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border">1</td>
                      <td className="py-3 px-4 border">A Method for Secure Data Transmission in IoT Networks</td>
                      <td className="py-3 px-4 border">Dr. V.S. Naresh, Dr. E. Nagarjuna</td>
                      <td className="py-3 px-4 border">IN202341012345</td>
                      <td className="py-3 px-4 border">Published</td>
                      <td className="py-3 px-4 border">2023</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border">2</td>
                      <td className="py-3 px-4 border">Smart Traffic Management System Using AI</td>
                      <td className="py-3 px-4 border">Dr. D. Jaya Kumari, Dr. G. Sivaraman</td>
                      <td className="py-3 px-4 border">IN202441054321</td>
                      <td className="py-3 px-4 border">Filed</td>
                      <td className="py-3 px-4 border">2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Awards and Recognitions */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Awards and Recognitions</h3>
              
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Dr. V.S. Naresh received the "Outstanding Researcher Award" from the Computer Society of India, 2024.</li>
                <li>Dr. D. Jaya Kumari was recognized as "Best Teacher" by the Institution of Engineers, 2023.</li>
                <li>Dr. K. Shirin Bhanu received the "Young Scientist Award" from the Department of Science and Technology, 2023.</li>
                <li>Dr. G. Sivaraman was selected as a reviewer for IEEE Transactions on Cloud Computing, 2022.</li>
                <li>Dr. E. Nagarjuna received research funding of ₹25 Lakhs from DST for project on "AI-based Healthcare Solutions", 2024.</li>
              </ul>
            </div>
            
            {/* Faculty Expertise */}
            <div>
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Faculty Expertise Areas</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg shadow p-4">
                  <h4 className="font-medium text-[#B22222] mb-2">Artificial Intelligence & Machine Learning</h4>
                  <p className="text-gray-700 text-sm">10 Faculty Members</p>
                </div>
                <div className="bg-white border rounded-lg shadow p-4">
                  <h4 className="font-medium text-[#B22222] mb-2">Data Science & Big Data</h4>
                  <p className="text-gray-700 text-sm">8 Faculty Members</p>
                </div>
                <div className="bg-white border rounded-lg shadow p-4">
                  <h4 className="font-medium text-[#B22222] mb-2">Cloud Computing</h4>
                  <p className="text-gray-700 text-sm">6 Faculty Members</p>
                </div>
                <div className="bg-white border rounded-lg shadow p-4">
                  <h4 className="font-medium text-[#B22222] mb-2">Cybersecurity</h4>
                  <p className="text-gray-700 text-sm">5 Faculty Members</p>
                </div>
                <div className="bg-white border rounded-lg shadow p-4">
                  <h4 className="font-medium text-[#B22222] mb-2">Internet of Things</h4>
                  <p className="text-gray-700 text-sm">7 Faculty Members</p>
                </div>
                <div className="bg-white border rounded-lg shadow p-4">
                  <h4 className="font-medium text-[#B22222] mb-2">Software Engineering</h4>
                  <p className="text-gray-700 text-sm">12 Faculty Members</p>
                </div>
              </div>
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
                <details open>
                  <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">B.Tech (CSE & CST)</summary>
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
                  <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">M.TECH(CS)</summary>
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
                  <summary className="text-lg font-semibold text-[#850209] p-2 bg-gray-50 rounded cursor-pointer">SOC Syllabus</summary>
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
      <div className="container mx-auto px-4 py-8">
        {/* The navigation has been moved inside the Department Profile content */}
        {/* Removing the renderDeptTabContent call since we've combined it with Department Profile */}
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
