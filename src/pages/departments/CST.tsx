
import React, { useState } from 'react';
import { Cpu, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';

const CSTDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

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


  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
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
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Head of Department, CST</p>
                  <p className="text-gray-600">Ph.D in Computer Science, M.Tech CSE</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Welcome to the Department of Computer Science & Technology. We are committed to providing comprehensive education in computer science with a strong emphasis on emerging technologies and practical applications. The department came into inception from 2019 onwards with an intake of 60 seats in B.Tech."
                </p>
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
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

            <h2 className="text-3xl font-bold text-[#B22222] mb-6 mt-12 text-center">Technical Staff</h2>
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

export default CSTDepartment;

