
import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText } from 'lucide-react';

const AIMLDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const navItems = [
    'Department Profile',
    'Faculty Profiles',
    'Board of Studies',
    'Syllabus',
    'Physical Facilities',
    'Department Library',
    'MoUs',
    'Faculty Development Programs',
    'Faculty Achievements',
    'Workshops',
    'Student Achievements',
    'Placements',
    'Merit Scholarship/Academic Toppers',
    'Technical Association',
    'Training Activities',
    'Newsletters',
    'Extra-Curricular Activities',
    'Hackathons',
    'e-Resources',
    'Handbooks',
    'Contact'
  ];

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
    { name: "Dr. D Haritha", designation: "Professor, CSE", organization: "UCEK,JNTUK", position: "University Nominee" },
    { name: "Dr. Nagesh Bhattu Sristy", designation: "Assistant Professor,Dept. of CSE", organization: "NIT-AP", position: "Academic Expert" },
    { name: "Dr. K. Venkata Rao", designation: "Professor,Dept. of CS&SE", organization: "AU College of Engineering,Visakhapatnam", position: "Academic Expert" },
    { name: "Mr. T. Seshagiri", designation: "Enterprise Architect", organization: "TCS, Hyderabad", position: "Industry Expert" },
    { name: "Mr. Vinay Kumar", designation: "Director", organization: "XpertBridge, Hyderabad", position: "Industry Expert" },
    { name: "Mr. M Jnana Surya Prakasha Rao", designation: "Manager", organization: "BMW TechWorks India", position: "Alumni" },
    { name: "All the Faculty Members in the AIML Dept.", designation: "members in BOS", organization: "", position: "" }
  ];

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
      case 'Department Profile':
        return (
          <div id="department-profile" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
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
            </div>
          </div>
        );
      case 'Faculty Profiles':
        return (
          <div id="faculty-profiles" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
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
                          <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View Profile</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Non-Teaching Profiles</h2>
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
          <div id="board-of-studies" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
              <div className="overflow-x-auto">
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
                        <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4">{member.designation}</td>
                        <td className="px-6 py-4">{member.organization}</td>
                        <td className="px-6 py-4">{member.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Class Rooms & Seminar Halls</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Class Rooms with ICT Enabled Facilities - <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf" className="text-primary hover:underline">View</a></li>
                    <li>Seminar halls with ICT Enabled Facilities - <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf" className="text-primary hover:underline">View</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Laboratories</h3>
                  <p className="text-gray-700 mb-4">The Department has 9 well-equipped labs for UG, PG, and research, with 674 systems. We have various servers and high-speed internet (200Mbps BSNL, 400Mbps Jio, 40Mbps Broadband).</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {labs.map((lab, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center">
                        <img src={lab.image} alt={lab.name} className="w-full h-48 object-cover rounded-md mb-4" />
                        <h4 className="font-bold text-lg text-gray-800">{lab.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Syllabus':
        return (
          <div id="syllabus" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
              <ul className="list-disc list-inside space-y-2 text-center">
                <li>B.Tech - V20 Syllabus - <a href="http://srivasaviengg.ac.in/uploads/syllabus/V20%20AI%20and%20AI&ML%20CS%20&%20Syllabus_%20I%20&%20II%20SEM.pdf" className="text-primary hover:underline ml-2">View</a></li>
                <li>SOC Syllabus during the Academic Year 2022-23 - <a href="http://srivasaviengg.ac.in/uploads/aiml/SOC_AIM_2022-23.pdf" className="text-primary hover:underline ml-2">View</a></li>
              </ul>
            </div>
          </div>
        );
      case 'Workshops':
        return (
          <div id="workshops" className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops/SOC/Seminars/Guest Lectures</h2>

              <div className="section">
                <details open>
                  <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">Workshops</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Workshops/SOC organized during the Academic Year 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Workshops_2023-2024(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                  </ul>
                </details>
              </div>

              <div className="section mt-6">
                <details>
                  <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">SOC</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      SOC organized during the Academic Year 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/SOC_2023-2024(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                    <li>
                      SOC organized during the Academic Year 2022-23 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/SOC_2022-2023(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                  </ul>
                </details>
              </div>

              <div className="section mt-6">
                <details>
                  <summary className="text-xl font-bold text-gray-800 mb-2 cursor-pointer">Guest Lecturers/Seminars</summary>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Guest Lectures Organized during the Academic Year 2024-25 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Guest Lectures 2024-25.pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2023-24 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Guest%20Lectures&Alumni%20Connect_2023-2024(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                    <li>
                      Guest Lectures Organized during the Academic Year 2022-23 -
                      <a href="https://srivasaviengg.ac.in/uploads/aiml/Guest%20Lectures&Alumni%20Connect_2022-2023(AIM).pdf" target="_blank" className="text-primary hover:underline ml-2">View More</a>
                    </li>
                  </ul>
                </details>
              </div>
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
                  {navItems.map((item) => (
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

export default AIMLDepartment;