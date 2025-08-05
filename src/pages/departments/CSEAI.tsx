
import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Cpu, Users, Briefcase, FileText, Building, Library, Link as LinkIcon, Activity, Trophy, Newspaper, Handshake, Calendar, GraduationCap, Phone } from 'lucide-react';

const CSEAIDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Physical Facilities', 'Department Library', 'MoUs', 'Faculty Development Programs', 'Faculty Achievements', 'Workshops', 'Student Achievements', 'Placements', 'Merit Scholarship/Academic Toppers', 'Technical Association', 'Newsletters', 'Extra-Curricular Activities', 'Hackathons', 'Handbooks', 'Contact'
  ];

  const faculty = [
      { name: "Dr. G .Loshma", qualification: "B.E,M.Tech,ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Dr.G.Loshma.pdf" },
      { name: "Mr. R.L.Phani Kumar", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_R.L.%20Phani%20Kumar.pdf" },
      { name: "Mrs. P. Ujwala Sai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_P.%20Ujwala.pdf" },
      { name: "Ms. M. Kiranmai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Ms.%20M.%20Kiranmai.pdf" },
      { name: "Mr .V. Thinakaran", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr%20.V.%20Thinakaran.pdf" },
      { name: "Mr. P Seshu Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20P%20Seshu%20Kumar.pdf" },
      { name: "Mr. Reddy Chaitanya A", qualification: "M.Tech.,Ph.D", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20Reddy%20Chaitanya%20A.pdf" },
      { name: "Mr.E. Elumalai M", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.E.%20Elumalai%20M.pdf" },
      { name: "Mr. Kasilingam N", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20Kasilingam%20N.pdf" },
      { name: "Mr.Nisanth N S", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.Nisanth%20N%20S.pdf" },
      { name: "Mr. M.Sreenivasulu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20M.Sreenivasulu.pdf" },
      { name: "Mr. S.Sridhar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20S.Sridhar.pdf" },
      { name: "Mr. V. Jayaramakrishna", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Mr.%20V.%20Jayaramakrishna.pdf" }
  ];

  const nonTeachingFaculty = [
      { name: "Mr. K.N. Suresh", designation: "System Admin" },
      { name: "Mr. K.V Srinivasa Rao", designation: "Hardware Technician" },
      { name: "Mr. G.Bhanu Prakash", designation: "Hardware Technician" },
      { name: "Mr. N.RajaseKhar", designation: "Junior Assistant" },
      { name: "Mr. P.Manikanta Gupta", designation: "Lab Assistant" },
      { name: "Mrs. P.Harika", designation: "Computer Lab Assistant" },
      { name: "Mr.Md.Arriff", designation: "Computer Lab Assistant" },
      { name: "Mr. P.Lokesh Reddy", designation: "Lab Technician" },
      { name: "Ms. M.Naga Harika", designation: "Lab Technician" },
      { name: "Mr.S.Nagaraju", designation: "Programmer" },
      { name: "Ms. BNG Lakshmi Durga", designation: "Programmer" }
  ];

  const boardOfStudies = [
      { name: "Dr.G.Loshma", designation: "Professor & HOD", organization: "SVEC", position: "Chairperson" },
      { name: "Dr. D Haritha", designation: "Professor & HOD of CSE", organization: "UCEK,JNTUK", position: "University Nominee" },
      { name: "Dr. Nagesh Bhattu Sristy", designation: "Assistant Professor,Department of CSE", organization: "NIT-AP", position: "Academic Expert" },
      { name: "Dr. K.Venkata Rao", designation: "Professor,Department of CS&SE", organization: "AU College of Engineering,Visakhapatnam", position: "Academic Expert" },
      { name: "Mbm Raju", designation: "Head,Strategic Initiatives and Isu/Branch Operations", organization: "Tata Consultancy Services", position: "Industry Expert" },
      { name: "Mr.Vinay Kumar", designation: "Director", organization: "XpertBridge,Hyderabad", position: "Industry Expert" },
      { name: "Mr.M jana Surya Prakasha Rao", designation: "BI Technical Consultant", organization: "Pragmasyns consulting LLP Gurgaon", position: "Alumni" },
      { name: "All the Faculty Members in the CSE(AI) Dept.", designation: "Members in BOS", organization: "", position: "" }
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
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="relative">
                <img 
                  src="/images/departments/cai/aihod.jpg" 
                  alt="Dr. G. Loshma"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="female professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, CSE (AI)</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                  <p className="text-gray-600">Fax No: 08818-284322</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_aim@srivasaviengg.ac.in" className="text-primary hover:underline">hod_aim@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Welcome to the Department of Computer Science & Engineering (Artificial Intelligence). Our department specializes in cutting-edge AI technologies, machine learning algorithms, and intelligent systems that are shaping the future of technology."
                </p>
              </div>
            </div>
             <div className="mt-8">
              <h3 className="text-2xl font-bold text-center text-[#B22222] mb-4">Courses Offered</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border">S.No</th>
                      <th className="px-4 py-2 border">Name of the Course</th>
                      <th className="px-4 py-2 border">Eligibility Criteria</th>
                      <th className="px-4 py-2 border">Duration</th>
                      <th className="px-4 py-2 border">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 border">1</td>
                      <td className="px-4 py-2 border">B.Tech-Artificial Intelligence</td>
                      <td className="px-4 py-2 border">AP EAPCET</td>
                      <td className="px-4 py-2 border">4 Years</td>
                      <td className="px-4 py-2 border">120</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                                        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View Profile</a>
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
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies Members</h2>
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
                    <li>Minutes of 3rd meeting of the Board of Studies, dated 26.07.2023 <a href="http://srivasaviengg.ac.in/uploads/cai/Minutes%20of%203rd%20BOS_B.Tech%20in%20CAI%20and%20AI&ML.pdf" className="text-primary hover:underline ml-2">View</a></li>
                    <li>Minutes of 2nd meeting of the Board of Studies, dated 25.07.2022 <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%20Second%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2025.07.2022%20AI%20&%20ML.pdf" className="text-primary hover:underline ml-2">View</a></li>
                    <li>Minutes of 1st meeting of the Board of Studies, dated 31.12.2021 <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%20First%20BOS%20-%20CSE(AI)%20and%20AI%20&%20ML.pdf" className="text-primary hover:underline ml-2">View</a></li>
                </ul>
            </div>
          </div>
        );
        
      case 'Physical Facilities':
        return (
          <div id="physical-facilities" className="space-y-8">
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
            <div id="syllabus" className="space-y-8">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
                    <ul className="list-disc list-inside space-y-2 text-center">
                        <li>B.Tech - V20 Syllabus - <a href="http://srivasaviengg.ac.in/uploads/syllabus/V20%20AI%20and%20AI&ML%20CS%20&%20Syllabus_%20I%20&%20II%20SEM.pdf" className="text-primary hover:underline ml-2">View</a></li>
                        <li>SOC Syllabus during the Academic Year 2022-23 - <a href="http://srivasaviengg.ac.in/uploads/cai/SOC_CAI_2022-23.pdf" className="text-primary hover:underline ml-2">View</a></li>
                    </ul>
                </div>
            </div>
        );

      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} will be updated soon.</h3></div>;
    }
  };

  return (
    <div className="pt-24 bg-gray-100">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Cpu className="w-6 h-6 text-primary" />
                    <span className="font-bold text-lg">CSE (AI)</span>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
        
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Main Content */}
        <div className="container mx-auto pt-16 lg:pt-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 lg:h-auto lg:rounded-2xl lg:sticky lg:top-28`}>
                    <div className="flex justify-between items-center lg:justify-center mb-6">
                      <h3 className="text-xl font-bold text-center">Department Menu</h3>
                      <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
                          <Menu className="w-6 h-6" />
                      </button>
                    </div>
                    <ul className="space-y-2">
                        {sidebarItems.map((item) => (
                        <li key={item}>
                            <button
                            className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 ${activeContent === item ? 'bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white font-semibold' : 'hover:bg-white/10'}`}
                            onClick={() => {
                                setActiveContent(item);
                                if (sidebarOpen) setSidebarOpen(false);
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

export default CSEAIDepartment;

    