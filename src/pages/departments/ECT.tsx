
import React, { useState } from 'react';
import { Radio, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon, Settings } from 'lucide-react';

const ECTDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Physical Facilities', 'Clubs', 'MoUs', 'Faculty Development Programs', 'Faculty Achievements', 'Workshops', 'Student Achievements', 'Placements', 'Merit Scholarship/Academic Toppers', 'Technical Association', 'Training Activities', 'Newsletters', 'Extra-Curricular Activities', 'Faculty Innovations in Teaching & Learning', 'Handbooks', 'Contact'
  ];
  
  const faculty = [
    { name: "Dr.E.Kusuma Kumari", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ece_Dr.%20E.%20Kusuma%20Kumari.pdf" },
    { name: "Mr. P. Nagaraju", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Mr.P.Nagaraju.pdf" },
    { name: "Mr. P.V.V.Rajesh", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Mr.%20P.V.V.Rajesh.pdf" },
    { name: "Mr. K.Pasipalana Rao", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Mr.%20K.Pasipalana%20Rao.pdf" },
    { name: "Ms. M. Neelima", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Ms.%20M.%20Neelima.pdf" },
    { name: "Mr. B. V. V Bhargav", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Mr.%20V%20VBhargavBikkani.pdf" }
  ];

  const nonTeachingFaculty = [
    { name: "Mr.M.V.V.Satyanarayana", designation: "Lab Tech." },
    { name: "Mr.Sk.Mastan Vali(Shabbir)", designation: "Lab Tech." },
    { name: "Mr.Y.Narasimha Rao", designation: "Lab Tech." },
    { name: "Mr.G.Jani Babu", designation: "Lab Tech." },
    { name: "Mr.M.Naga Kavya", designation: "Lab Tech." },
    { name: "Mr.P.Naresh", designation: "Lab Tech." },
    { name: "Mr.G.S.C.V.Padmakar", designation: "D.E.O" },
    { name: "Ms.G.Kalyani Durga", designation: "D.E.O" },
    { name: "Mr.M.Sai Naveen Kumar", designation: "Attender" },
    { name: "Mr.B.Srinivisa Rao", designation: "Attender" },
    { name: "Mr.L.Phani Pallavi", designation: "Attender" },
  ];

  const boardOfStudies = [
    { name: "Dr.E. Kusuma Kumari", designation: "Professor & HOD", organization: "Dept of ECE,SVEC", position: "Chairperson" },
    { name: "Dr.B.T Krishna", designation: "Professor of ECE", organization: "University College Of Engineering. JNTUK, Kakinada", position: "University Nominee" },
    { name: "Prof.NVSN.Sarma", designation: "Director", organization: "IIIT,Trichy Tamilnadu", position: "Academic Expert" },
    { name: "Dr.M.Venu Gopala Rao", designation: "Professor of CSE", organization: "Andhra University", position: "Academic Expert" },
    { name: "Dr.M.Chakravarthy", designation: "Scientist-'G'", organization: "Additional Director, Directorate of Antenna Technologies, DLRL,Hyderabad", position: "Industry Nominee" },
    { name: "Sri.S.Siva Kumar", designation: "Sr.Engineer", organization: "Qualcomm Bhagmani tech Park,Banglore", position: "Almuni Member" },
    { name: "All the Faculty Members in the ECE Dept.", designation: "Members in BOS", organization: "", position: "" }
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
                  src="/images/departments/ece/ecehod.jpg" 
                  alt="Dr. E.Kusuma Kumari"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="female professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. E.Kusuma Kumari</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, ECT</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                  <p className="text-gray-600">Fax No: 08818-284322</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_ece@srivasaviengg.ac.in" className="text-primary hover:underline">hod_ece@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Electronics & Communication Technology came into inception from 2019 onwards with an intake of 60 seats in B.Tech. It is one of the most significant branches of engineering which has always been in demand. The department aims primarily at excellence not only in theoretical but also in Experimental Research in various domains.
                </p>
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
                                        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View</a>
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
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Radio className="w-16 h-16 text-white mr-4" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Electronics &</h1>
                  <p className="text-xl text-gray-200">Communication Technology</p>
                </div>
              </div>
              <p className="text-xl leading-relaxed">
                Advancing the frontiers of electronics and communication through innovative research and cutting-edge curriculum.
              </p>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/159279/printed-circuit-board-print-plate-via-159279.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="ECT Department"
                className="rounded-2xl shadow-2xl"
                data-ai-hint="circuit board"
              />
            </div>
          </div>
        </div>
      </section>
      
      <div className="flex flex-col lg:flex-row gap-8 container mx-auto p-4">
          <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
                  <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-full flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-4">
                      <span className="font-bold">Department Menu</span>
                      <Menu className="w-6 h-6" />
                  </button>
                  <nav className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                      <h3 className="text-xl font-bold text-primary mb-4 hidden lg:block">Department Menu</h3>
                      <ul className="space-y-1">
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
  );
};

export default ECTDepartment;
