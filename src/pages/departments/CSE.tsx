
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


  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
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
                <p className="text-gray-700 leading-relaxed">
                  The Department of Computer Science and Engineering (CSE) was established in 2001 with an initial intake of 60 students. Over the years, it has grown significantly, with the intake increasing to 240 students for the B.Tech program. The department also offers an M.Tech program in Computer Science since 2020. Our vision is to evolve as a center of academic and research excellence in the area of Computer Science and Engineering.
                </p>
              </div>
            </div>
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
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

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

export default CSEDepartment;
