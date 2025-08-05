
import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText } from 'lucide-react';

const AIMLDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile',
    'Faculty Profiles',
    'Board of Studies',
    'Physical Facilities',
    'Placements',
    'Student Achievements',
    'Technical Association',
    'Syllabus',
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
          <div id="department-profile">
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
          </div>
        );
      case 'Faculty Profiles':
        return (
          <div id="faculty-profiles">
             <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Faculty Profiles</h2>
             <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg mb-8">
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
          </div>
        );
      case 'Board of Studies':
        return (
          <div id="board-of-studies">
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
          </div>
        );
      case 'Physical Facilities':
        return (
          <div id="physical-facilities">
              <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Physical Facilities</h2>
               <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Class Rooms & Seminar Halls</h3>
                    <ul className="list-disc list-inside space-y-2 mb-6">
                        <li>Class Rooms with ICT Enabled Facilities - <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf" className="text-primary hover:underline">View</a></li>
                        <li>Seminar halls with ICT Enabled Facilities - <a href="http://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf" className="text-primary hover:underline">View</a></li>
                    </ul>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Laboratories</h3>
                    <p className="text-gray-600 mb-4">The Department has 9 well-equipped labs for UG, PG, and research, with 674 systems. We have various servers and high-speed internet (200Mbps BSNL, 400Mbps Jio, 40Mbps Broadband).</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labs.map((lab, index) => (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <img src={lab.image} alt={lab.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h4 className="font-bold text-lg text-gray-800">{lab.name}</h4>
                            </div>
                        ))}
                    </div>
               </div>
          </div>
        );
      case 'Syllabus':
        return (
            <div id="syllabus">
                <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Syllabus</h2>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <ul className="list-disc list-inside space-y-2">
                        <li>B.Tech - V20 Syllabus - <a href="http://srivasaviengg.ac.in/uploads/syllabus/V20%20AI%20and%20AI&ML%20CS%20&%20Syllabus_%20I%20&%20II%20SEM.pdf" className="text-primary hover:underline">View</a></li>
                        <li>SOC Syllabus during the Academic Year 2022-23 - <a href="http://srivasaviengg.ac.in/uploads/aiml/SOC_AIM_2022-23.pdf" className="text-primary hover:underline">View</a></li>
                    </ul>
                </div>
            </div>
        );
      default:
        return <p>Content for {activeContent} will be updated soon.</p>;
    }
  };

  return (
    <div className="pt-44 bg-gray-50">
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
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="AIML Department"
                className="rounded-2xl shadow-2xl"
                data-ai-hint="artificial intelligence technology"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation and Content */}
      <div className="relative">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-44 left-4 z-50 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-2 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white/20 lg:hidden"
          >
            <Menu className="w-4 h-4" />
            <span className="font-medium">Details</span>
          </button>
        )}

        {/* Sidebar */}
        <div className={`fixed lg:sticky top-44 left-0 h-screen lg:h-auto w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:flex lg:flex-col`}>
           <div className="p-6 h-full flex flex-col relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/5 to-[#0097A7]/5 rounded-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B22222]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0097A7]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <h3 className="text-xl font-bold text-center flex-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Department Details</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0 lg:hidden"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 pr-2 max-h-full">
                {sidebarItems.map((item) => (
                  <button
                    key={item}
                    className={`sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm ${activeContent === item ? 'bg-gradient-to-r from-[#B22222]/80 to-[#0097A7]/80' : 'bg-white/5'}`}
                    onClick={() => {
                      setActiveContent(item);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">{item}</span>
                    <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className="lg:ml-72">
          <main className="container mx-auto px-4 py-8 space-y-16">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AIMLDepartment;
