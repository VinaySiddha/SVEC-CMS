
import React, { useState } from 'react';
import { Radio, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon, Settings } from 'lucide-react';

const ECEDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Physical Facilities', 'Clubs', 'MoUs', 'Faculty Development Programs', 'Faculty Achievements', 'Workshops', 'Student Achievements', 'Placements', 'Merit Scholarship/Academic Toppers', 'Technical Association', 'Training Activities', 'Newsletters', 'Extra-Curricular Activities', 'Faculty Innovations in Teaching & Learning', 'Handbooks', 'Contact'
  ];

  const faculty = [
    { name: "Dr.E.Kusuma Kumari", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ece_Dr.%20E.%20Kusuma%20Kumari.pdf" },
    { name: "Dr.M.Thamari", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_M.Thamarai.pdf" },
    { name: "Dr.M.Koteswara Rao", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20M.Koteswara%20Rao.pdf" },
    { name: "Dr.Purnima K.Sharma", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20Purnima.pdf" },
    { name: "Mr.K.N.H Srinivas", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.K.N.H%20Srinivas.pdf" },
    { name: "Mr.Tota Sreenivas", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20Thota.%20Srinivas.pdf" },
    { name: "Mr.G.Shankara Bhaskara Rao", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20Shankar%20Bhaskar%20Rao.pdf" },
    { name: "Dr.T.D.N.S.S.Sarveswararao", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.T.D.N.S.S.RAO.pdf" },
    { name: "Dr.T.V.N.L.Aswini", qualification: "M.Tech;,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.T.N.L.Ashwini.pdf" },
    { name: "Mrs.Y.Sujatha", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.Y.Sujatha.pdf" },
    { name: "Mr.D.R.Sandeep", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.D.R%20Sandeep.pdf" },
    { name: "Mr.T.Sreenivasu", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.T.Sreenivasu.pdf" },
    { name: "Mr.M.Subba Rao", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.Subba%20Rao.pdf" },
    { name: "Mr.P.Gopala Reddy", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.P.Gopal%20Reddy.pdf" },
    { name: "Mr.P.V.V.Satyanarayana", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.P.V.V%20Satyanarayana.pdf" },
    { name: "Mr.R.Ramprasad", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20R.%20RAMPRASAD%20.pdff" },
    { name: "Mr.G.V.Subrahmanyam", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.G.V.Subrahmanyam.pdf" },
    { name: "Mr.J.Rajendra", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.J.Rajendra.pdf" },
    { name: "Dr. S.V.V.Satyanarayana", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.S.V.V%20Satyanarayana.pdf" },
    { name: "Mrs.V.Radha", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.V.Radha.pdf" },
    { name: "Mr.R.L.R Lokesh Babu", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.R.L.R%20Lokesh%20Babu.pdf" },
    { name: "Mr.M.Vinod Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.M.Vinod%20Kumar.pdf" },
    { name: "Mr.S.Kamesh", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.S.Kamesh.pdf" },
    { name: "Mr.M.Venkata Suman", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.Venkata%20Suman.pdf" },
    { name: "Ms.K.Durga Saranya", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.K.Durga%20Saranya.pdf" },
    { name: "Mr.B.Murali Krishna", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.B.Murali%20Krishna.pdf" },
    { name: "Ms.V.Anil Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20V.%20Anil%20Kumar.pdf" },
    { name: "Mr.D.Venkanna Babu", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20D.%20Venkanna%20Babu.pdf" },
    { name: "Mr.B.Ashok Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20B.%20Ashok%20Kumar.pdf" },
    { name: "Ms.L.Bharani", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20L.%20Bharani.pdf" },
    { name: "Mr.M.pitchaiah", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.%20Pitchaiah.pdf" },
    { name: "Dr. V Jaya Prakash", qualification: "M.Tech.,Ph.D", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.i%20V.%20Jaya%20Prakash.pdf" },
    { name: "Ms.V.V.Naga Lakshmi", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20V.%20V.%20Nagalakshmi.pdf" },
    { name: "Ms.P.Harshini", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20P.%20Harshini.pdf" },
    { name: "Mrs. K. Indira Priya Darshini", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20K.%20INDIRA%20PRIYADARSHINI.pdf" },
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
                  alt="Dr.E.Kusuma Kumari"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="female professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr.E.Kusuma Kumari</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, ECE</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                  <p className="text-gray-600">Fax No: 08818-284322</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_ece@srivasaviengg.ac.in" className="text-primary hover:underline">hod_ece@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Electronics & Communication Engineering was established in the year 2001. It is one of the most significant branches of engineering which has always been in demand. The department aims primarily at excellence not only in theoretical but also in Experimental Research in Microwaves, Antennas, VLSI, Signal Processing, Communications, Embedded Systems etc.
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
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Electronics & Communication Engineering</h1>
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

export default ECEDepartment;
