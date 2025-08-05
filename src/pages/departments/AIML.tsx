
import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText } from 'lucide-react';

const AIMLDepartment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Department');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    'Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'Salient Features'
  ];

  const sidebarItems = [
    { name: 'Department Profile', href: '#department-profile' },
    { name: 'Faculty Profiles', href: '#faculty-profiles' },
    { name: 'Board of Studies', href: '#board-of-studies' },
    { name: 'Physical Facilities', href: '#physical-facilities' },
    { name: 'Department Library', href: '#department-library' },
    { name: 'MoUs', href: '#mous' },
    { name: 'Faculty Development Programs', href: '#fdp' },
    { name: 'Faculty Achievements', href: '#faculty-achievements' },
    { name: 'Workshops', href: '#workshops' },
    { name: 'Student Achievements', href: '#student-achievements' },
    { name: 'Placements', href: '#placements' },
    { name: 'Merit Scholarship', href: '#scholarships' },
    { name: 'Technical Association', href: '#tech-association' },
    { name: 'Extra-Curricular Activities', href: '#extra-curricular' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Syllabus', href: '#syllabus' },
    { name: 'Handbooks', href: '#handbooks' },
    { name: 'Contact', href: '#contact' },
  ];

  const faculty = [
    { name: "Dr. G. Loshma", qualification: "B.E, M.Tech, Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CAI_Dr.G.Loshma.pdf" },
    { name: "Dr. K. Srinivasa Rao", qualification: "M.Tech, Ph.D", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Dr.%20KSR.pdf" },
    { name: "Mr. M.Y. Sekharam", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_M.%20Y.%20SEKHARAM.pdf" },
    { name: "Mr. P. Kalyan Babu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Mr.P.%20Kalyan%20Babu.pdf" },
    { name: "Ms. G Kalyani", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Ms.%20G%20Kalyani.pdf" },
    { name: "Ms. Prathyusha Ch", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Ms.%20Prathyusha%20Ch.pdf" },
    { name: "Dr. Jagadish Kumar KB", qualification: "M.Tech.,Ph.D", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Dr.%20Jagadish%20Kumar%20KB.pdf" },
    { name: "Mr. Jaganathan.R", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Mr.%20Jaganathan.R.pdf" },
    { name: "Mr. Y Prakash", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Mr.%20Y%20Prakash.pdf" },
    { name: "Mr. S.Sadeesh Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Mr.%20S.Sadeesh%20Kumar.pdf" },
    { name: "Ms. G. Vandhana", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Ms.%20G.%20Vandhana.pdf" },
    { name: "Ms. K. Mounica", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/AIM_Ms.%20K.%20Mounica.pdf" }
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
    { name: "Mr.D.Srinivasa Rao", designation: "Attender" },
    { name: "Mr.M.Siva Krishna", designation: "Attender" },
    { name: "Mrs.A.Sri Karuna Kumari", designation: "Attender" },
    { name: "Mr.V.Venkateswara Rao", designation: "Attender" }
  ];
  
  const boardOfStudies = [
    { name: "Dr. G. Loshma", designation: "Professor & HOD", organization: "SVEC", position: "Chairperson" },
    { name: "Dr. D. Haritha", designation: "Professor & HOD of CSE", organization: "UCEK,JNTUK", position: "University Nominee" },
    { name: "Dr. Nagesh Bhattu Sristy", designation: "Assistant Professor,Department of CSE", organization: "NIT-AP", position: "Academic Expert" },
    { name: "Dr. K.Venkata Rao", designation: "Professor,Department of CS&SE", organization: "AU College of Engineering,Visakhapatnam", position: "Academic Expert" },
    { name: "Mr. Seshagiri Telkapalli", designation: "Enterprise Architect", organization: "Tata Consultancy Services, Hyderbad", position: "Industry Expert" },
    { name: "Mr.Vinay Kumar", designation: "Director", organization: "XpertBridge,Hyderabad", position: "Industry Expert" },
    { name: "Mr.M jana Surya Prakasha Rao", designation: "BI Technical Consultant", organization: "Pragmasyns consulting LLP, Gurgaon", position: "Alumni" },
    { name: "All the Faculty Members in the AIML Dept.", designation: "Members in BOS", organization: "", position: "" },
  ];
  
  const labs = [
    { name: "James Gosling Lab", config: "Model: HCL Infinity MA380Pro/True\nProcessor: Core i3 3rd gen 3.22GHZ\n4.00 GB RAM, 500 GB Hard Disk\nSystem type: x64 – based Processor\nMonitor: 18.5” LED Monitor\nKeyboard: Multimedia Keyboard\nMouse: Optical Scroll Mouse", usage: "DBMS, OS&LP, DS Lab", systems: 70, image: "../../images/departments/cai/James Gosling Lab.jpg" },
    { name: "EF Codd Lab", config: "Model: HCL Infinity MA380Pro/True\nProcessor: Core i3 3rd gen 3.22GHZ\n4.00 GB RAM, 500 GB Hard Disk\nSystem type: x64 – based Processor\nMonitor: 18.5” LED Monitor\nKeyboard: Multimedia Keyboard\nMouse: Optical Scroll Mouse", usage: "DBMS, OS&LP, DS Lab", systems: 70, image: "../../images/departments/cai/E F Codd LAb.jpg" },
    { name: "Linus Torvalds Lab", config: "Model: HP Desktops\nProcessor: I3 Processor, 8 GB RAM, 256 SSD\nMonitor: 19.5\" LED Monitor\nKeyboard: Multimedia\nMouse: Optical Mouse", usage: "Stat-R, DBMS", systems: 72, image: "../../images/departments/cai/Linus Torvalds Lab.jpg" },
    { name: "Yellow Lab", config: "Model: DELL OPTI PLEX 3070\nProcessor: Intel Core i3, 9th Gen\n8.00 GB RAM, 1 TB Hard Disk\nSystem type: x64 – based Processor\nMonitor: 20.5” TFT Monitor\nKeyboard: Multimedia Keyboard\nMouse: Optical Scroll Mouse", usage: "Placements and Training", systems: 72, image: "../../images/departments/cai/Yellow Lab.jpg" },
    { name: "Pink Lab", config: "Model: DELL OPTI PLEX 3070\nProcessor: Intel Core i3, 9th Gen\n8.00 GB RAM, 1 TB Hard Disk\nSystem type: x64 – based Processor\nMonitor: 20.5” TFT Monitor\nKeyboard: Multimedia Keyboard\nMouse: Optical Scroll Mouse", usage: "Placements and Training", systems: 72, image: "../../images/departments/cai/Pink Lab.jpg" },
    { name: "Orange Lab", config: "Model: DELL OPTI PLEX 3070\nProcessor: Intel Core i3, 9th Gen\n8.00 GB RAM, 1 TB Hard Disk\nSystem type: x64 – based Processor\nMonitor: 20.5” TFT Monitor\nKeyboard: Multimedia Keyboard\nMouse: Optical Scroll Mouse", usage: "Placements and Training", systems: 72, image: "../../images/departments/cai/Orange Lab.jpg" },
    { name: "Green Lab", config: "Model: DELL OPTI PLEX 3070\nProcessor: Intel Core i3, 9th Gen\n8.00 GB RAM, 1 TB Hard Disk\nSystem type: x64 – based Processor\nMonitor: 20.5” TFT Monitor\nKeyboard: Multimedia Keyboard\nMouse: Optical Scroll Mouse", usage: "Placements and Training", systems: 72, image: "../../images/departments/cai/Green Lab.jpg" },
    { name: "Brown Lab", config: "Model: DELL OPTI PLEX 3070\nProcessor: Intel Core i3, 9th Gen\n8.00 GB RAM, 1 TB Hard Disk\nSystem type: x64 – based Processor\nMonitor: 20.5” TFT Monitor\nKeyboard: Multimedia Keyboard\nMouse: Optical Scroll Mouse", usage: "Placements and Training", systems: 72, image: "../../images/departments/cai/Brown Lab.jpg" },
    { name: "PG CP Lab", config: "Model: Acer Vertion I3 Desktop System\nProcessor: Intel Core i3 -8100, 8th Gen\n8 GB DDR4 RAM, 1 TB Hard Disk Drive\nMonitor: 21.5” LED Monitor\nKeyboard: USB Keyboard\nMouse: USB Optical Mouse", usage: "AJWT, OOPS through \nC++ Lab", systems: 70, image: "../../images/departments/cai/pgcplab.jpg" },
    { name: "R&D Lab", location: "B-Block, First Floor", usage: "To Carryout Research Activities by Students and Faculty Members", systems: 30, image: "../../images/departments/cai/Sartaj Sahni Lab.jpg" },
  ];
  
  const renderTabContent = () => {
    // This is a placeholder. You would have different content for each tab.
    return <p>Content for {activeTab}</p>;
  };

  return (
    <div className="pt-44">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Brain className="w-16 h-16 text-[#FFF8F0] mr-4" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Artificial Intelligence</h1>
                  <p className="text-xl text-gray-200">& Machine Learning</p>
                </div>
              </div>
              <p className="text-xl leading-relaxed mb-8">
                Pioneering the future of intelligence with advanced AI research, machine learning innovation, 
                and intelligent system development.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#FFF8F0]">12+</div>
                  <div className="text-sm">AI Researchers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FFF8F0]">180</div>
                  <div className="text-sm">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FFF8F0]">4</div>
                  <div className="text-sm">Research Labs</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="AIML Department"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation and Content */}
      <div className="relative">
        {/* Details Button - Only show when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-44 left-4 z-50 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-2 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white/20"
          >
            <Menu className="w-4 h-4" />
            <span className="font-medium">Details</span>
          </button>
        )}

        {/* Sidebar */}
        <div className={`fixed top-44 left-4 h-[calc(100vh-12rem)] w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-40 transform transition-all duration-500 ease-in-out rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10 ${
          sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
          <div className="p-6 h-full flex flex-col relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/5 to-[#0097A7]/5 rounded-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B22222]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0097A7]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <h3 className="text-xl font-bold text-center flex-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Department Details</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
              
              <div className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden space-y-3 pr-2 max-h-full">
                {sidebarItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">{item.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 space-y-16">
          <section id="department-profile">
            <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Department Profile</h2>
             <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="relative">
                        <img 
                          src="/images/departments/cai/aihod.jpg"
                          alt="Dr. G. Loshma"
                          className="w-full h-80 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                          <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of the Department</p>
                          <p>Phone No: 08818-284355(O)-(Ext.-377)</p>
                          <p>Fax No: 08818-284322</p>
                          <p>Email: <a href="mailto:hod_aim@srivasaviengg.ac.in" className="text-primary hover:underline">hod_aim@srivasaviengg.ac.in</a></p>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          Department of Computer Science and Artificial Intelligence came into inception from 2021 onwards with an intake of 60 seats in B.Tech. From 2022 onwards the intake was increased to 120 seats.
                        </p>
                    </div>
                </div>
            </div>
          </section>

          <section id="faculty-profiles">
             <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Faculty Profiles</h2>
             <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
                 <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                         <tr>
                             <th scope="col" className="px-6 py-3">S.No.</th>
                             <th scope="col" className="px-6 py-3">Name of the Faculty</th>
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
          </section>
          
           <section id="non-teaching-profiles">
             <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Non-Teaching Profiles</h2>
             <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
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
          </section>

          <section id="board-of-studies">
             <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Board of Studies</h2>
             <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
                 <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                         <tr>
                             <th scope="col" className="px-6 py-3">S.No</th>
                             <th scope="col" className="px-6 py-3">Name of the BOS Member</th>
                             <th scope="col" className="px-6 py-3">Designation</th>
                             <th scope="col" className="px-6 py-3">Organization</th>
                             <th scope="col" className="px-6 py-3">Position in JOB</th>
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
             <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
                <h4 className="font-bold text-[#B22222] mb-3 text-center">Board of Studies Meeting Minutes:</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li>Minutes of 3rd meeting of the Board of Studies, dated 26.07.2023 <a href="http://srivasaviengg.ac.in/uploads/cai/Minutes%20of%203rd%20BOS_B.Tech%20in%20CAI%20and%20AI&ML.pdf" className="text-primary hover:underline">- View</a></li>
                    <li>Minutes of 2nd meeting of the Board of Studies, dated 25.07.2022 <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%20Second%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2025.07.2022%20AI%20&%20ML.pdf" className="text-primary hover:underline">- View</a></li>
                    <li>Minutes of 1st meeting of the Board of Studies, dated 31.12.2021 <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%20First%20BOS%20-%20CSE(AI)%20and%20AI%20&%20ML.pdf" className="text-primary hover:underline">- View</a></li>
                </ul>
             </div>
          </section>

          <section id="physical-facilities">
              <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Physical Facilities</h2>
               <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Class Rooms</h3>
                    <ul className="list-disc list-inside space-y-2 mb-6">
                        <li>Class Rooms with ICT Enabled Facilities - <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf" className="text-primary hover:underline">View</a></li>
                    </ul>
                     <h3 className="text-xl font-bold text-gray-800 mb-4">Class Time Tables</h3>
                     <ul className="list-disc list-inside space-y-2 mb-6">
                        <li>Master Timetable_A.Y for Sem-II 2022-23 - <a href="http://srivasaviengg.ac.in/uploads/aiml/AI%20_ML_Master%20Time%20Table_2022-23_%20II%20SEM%20_AIML.pdf" className="text-primary hover:underline">View</a></li>
                        <li>Master Timetable_A.Y for Sem-I 2022-23 - <a href="http://srivasaviengg.ac.in/uploads/aiml/AIM_Master%20Time%20Table_A.Y%202022-23_%20I%20SEM.pdf" className="text-primary hover:underline">View</a></li>
                    </ul>
                     <h3 className="text-xl font-bold text-gray-800 mb-4">Seminar Halls</h3>
                     <ul className="list-disc list-inside space-y-2 mb-6">
                        <li>Seminar halls with ICT Enabled Facilities - <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf" className="text-primary hover:underline">View</a></li>
                    </ul>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Laboratories</h3>
                    <p className="text-gray-600 mb-4">The Department has well equipped labs with the latest Configuration. Total 9 Computer Labs for UG, PG and one research lab consisting a total of 674 systems. The various servers in the server room include Oracle 11g Database Server, Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation Server, A-Mail Server, ECAP Server. The college has high-speed internet connectivity throughout the campus through a leased line from BSNL with 200Mbps, 400Mbps from Jio, and 40 Mbps (Broadband).</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labs.map((lab, index) => (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <img src={lab.image} alt={lab.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h4 className="font-bold text-lg text-gray-800">{lab.name}</h4>
                            </div>
                        ))}
                    </div>
               </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AIMLDepartment;
