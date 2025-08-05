
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
    { name: "Mr. N Lokesh Babu", designation: "Lab Technician" },
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
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">S.No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Qualification</th>
                    <th className="px-4 py-2">Designation</th>
                    <th className="px-4 py-2">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty.map((member, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{member.name}</td>
                      <td className="px-4 py-2">{member.qualification}</td>
                      <td className="px-4 py-2">{member.designation}</td>
                      <td className="px-4 py-2">
                        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold text-[#B22222] mt-12 mb-6 text-center">Non-Teaching Staff</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">S.No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {nonTeachingFaculty.map((member, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{member.name}</td>
                      <td className="px-4 py-2">{member.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-32 lg:pt-44 bg-gray-100">
      <div className="container mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white shadow-md z-40">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Cpu className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-primary">CST Department</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className={`fixed top-0 left-0 h-full w-72 bg-gray-800 text-white p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 lg:h-auto lg:rounded-2xl lg:shadow-lg lg:sticky lg:top-28`}>
            <div className="flex justify-between items-center lg:justify-center mb-6">
              <h3 className="text-xl font-bold text-center text-white">Department Menu</h3>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item}>
                  <button
                    className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 text-sm font-medium ${activeContent === item ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-700'}`}
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
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 lg:pt-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CSTDepartment;
