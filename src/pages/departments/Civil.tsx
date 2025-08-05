
import React, { useState } from 'react';
import { Building, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll } from 'lucide-react';

const CivilDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Physical Facilities', 'Department Library', 'Workshops', 'R&D', 'Faculty Achievements', 'Student Achievements', 'Placements', 'Technical Association', 'Newsletters', 'Extra-Curricular Activities', 'Research Projects', 'Syllabus', 'Consultancy', 'Contact'
  ];
  
  const faculty = [
    { name: "Dr.G.Radhakrishnan", qualification: "ME,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_G%20RADHAKRISHNAN%20PROFILE.pdf" },
    { name: "Mr. V.L.D Prasad Reddy", qualification: "M.E.", designation: "Assistant Professor & ACE", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_V%20L%20D%20Prasad%20Reddy.pdf" },
    { name: "Mr. J.Vijaya Chandra", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_VIJAYA%20CHANDRA%20PROFILE.pdf" },
    { name: "Mr. B.HemaSundar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_B%20HEMASUNDAR.pdf" },
    { name: "Mr. M.Prem Kumar Raju", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_M%20PREM%20KUMAR%20RAJU%20PROFILE.pdf" },
    { name: "Mr. K.Gowtham Kumar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Gowtham%20Kumar.pdf" },
    { name: "Mr. E Hanuman Sai Gupta", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CE_E%20Hanuman%20Sai%20Gupta.pdf" },
    { name: "Ms. B.Rohitha", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_ROHITHA%20PROFILE.pdf" },
    { name: "Ms. Ch.Sumaja", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_CH%20Sumaja.pdf" },
    { name: "Mr. K.J.Ganapathi", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Kaigala%20J%20Ganapathi.pdf" }
  ];

  const nonTeachingFaculty = [
      { name: "Mr. A.N.V.Ravi Kumar", designation: "Lab Technician" },
      { name: "Mr. P.V.S.Krishna Prasad", designation: "Lab Technician" },
      { name: "Mr. M.Abraham Lincoln", designation: "Lab Technician" },
      { name: "Mr. M.Sasi Kumar", designation: "Lab Technician" },
      { name: "Mr. T.V.V.Satyanarayana", designation: "DEO" },
      { name: "Ms. B.M.G.A.Bhargav", designation: "Attender" }
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
                  src="/images/departments/ce/pujith_hod.png" 
                  alt="Dr. G. Radhakrishnan"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Radhakrishnan</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, Civil</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                  <p className="text-gray-600">Fax No: 08818-284322</p>
                   <p className="text-gray-600">Email: <a href="mailto:hod_civil@srivasaviengg.ac.in" className="text-primary hover:underline">hod_civil@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Civil Engineering was established in the year 2011 with a vision to strive towards quality education, research and consultancy. Civil Engineering is one of the oldest and broadest engineering discipline which has been an aspect of life, since the beginning of human civilization. Efforts have been made to provide high quality technical education to students with a view to make them successful professionals.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Members</h2>
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
  };


  return (
    <div className="pt-24 bg-gray-100">
      <div className="container mx-auto">
        <div className="lg:hidden p-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-primary text-white p-2 rounded-md">
                <Menu className="w-6 h-6" />
            </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 p-4">
            <aside className={`fixed lg:relative lg:translate-x-0 top-0 left-0 h-full lg:h-auto w-72 bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 lg:z-auto lg:rounded-2xl lg:sticky lg:top-28`}>
            <div className="flex justify-between items-center lg:justify-center">
              <h3 className="text-xl font-bold text-center">Department Menu</h3>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
                  <Menu className="w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-2 mt-6">
                {sidebarItems.map((item) => (
                <li key={item}>
                    <button
                    className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 ${activeContent === item ? 'bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white font-semibold' : 'hover:bg-white/10'}`}
                    onClick={() => {
                        setActiveContent(item);
                        if(sidebarOpen) setSidebarOpen(false);
                    }}
                    >
                    <ChevronRight className={`w-4 h-4 mr-2 transition-transform ${activeContent === item ? 'rotate-90' : ''}`} />
                    <span>{item}</span>
                    </button>
                </li>
                ))}
            </ul>
            </aside>

            <main className="flex-1 min-w-0">
                <div className="bg-white p-1 md:p-4 rounded-2xl shadow-lg">
                  {renderContent()}
                </div>
            </main>
        </div>
      </div>
    </div>
  );
};

export default CivilDepartment;
