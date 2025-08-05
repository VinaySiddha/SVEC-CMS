
import React, { useState } from 'react';
import { Zap, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library } from 'lucide-react';

const EEEDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Labaratories', 'Department Library', 'Faculty Achievements', 'Faculty Innovations in T & L', 'Research Center', 'Student Achievements', 'Placements', 'Technical Association', 'Technical Magazines, Handbooks and Course Materials', 'Newsletters', 'Product Development', 'Departmental Activities', 'Extra-Curricular Activities', 'Green Initiative', 'Contact'
  ];

  const faculty = [
    { name: "Dr.Ch.Rambabu", qualification: "Ph.D", designation: "Professor & Dean(Student Affairs)", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/Dr.Ch.Rambabu206-rambabusir.pdf" },
    { name: "Dr. D. Sudha Rani", qualification: "Ph.D", designation: "Professor & HOD", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Dr.%20Sudha%20Rani%20Donepudi.pdf" },
    { name: "Dr. Chappa Anil Kumar", qualification: "Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Ch.Anil%20Kumar.pdf" },
    { name: "Mr. U. Chandra Rao", qualification: "M.Tech.,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Chandra%20Rao.pdf" },
    { name: "Mr. N. Sri Harish", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_N.SriharishHarish.pdf" },
    { name: "Mr. Ch.V S R Gopala Krishna", qualification: "M.Tech(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/Ch.V%20S%20R%20G%20Krishna6Ch.V.S.R.%20Gopal%20Krishna.pdf" },
    { name: "Mr. K.Ramesh Babu", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.Ramesh%20Babu.pdf" },
    { name: "Mr. K.Suresh", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.Suresh.pdf" },
    { name: "Mr. M.T.V.L. Ravi Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_M.T.V.L.%20Ravi%20Kumar.pdf" },
    { name: "Mr. V. Rama Narayana", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_V.%20Rama%20Narayana.pdf" },
    { name: "Mr. G. Chandra Babu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Chandra%20Babu.pdf" },
    { name: "Mr. G. Madhu Sagar Babu", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_G.%20Madhu%20Sagar%20Babu.pdf" },
    { name: "Mr. G. Govardhan", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Govardhan.pdf" },
    { name: "Mr. A. Uma Siva Naga Prasad", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_A.Uma%20Siva%20Naga%20Prasad.pdf" },
    { name: "Mrs. A. Ratna Kumari", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_A%20Ratna%20Kumari2.pdf" },
    { name: "Mr. N. Madhusudhan Reddy", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_N%20Madhusudhan%20reddy.pdf" },
    { name: "Mr. V.S. Aditya", qualification: "M.E.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_V%20SUBRAHMANYA%20ADITYA.pdf" },
    { name: "Mr. S. Krishna", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Krishna.pdf" },
    { name: "Mr. M. M. Swami Naidu", qualification: "M.Tech(Study Leave)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_MM%20SWAMY%20NAIDU.pdf" },
    { name: "Mr. Durga R Ch. Nookesh", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Nookesh.pdf" },
    { name: "Mrs. Jaji Sudha", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_jaji%20sudha.pdf" },
    { name: "Mr. N. Sankar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_N.%20Sankar.pdf" },
    { name: "Mr. Shaik Moulali", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Moulali.pdf" },
    { name: "Dr. E. Naga Venkata Durga Vara Prasad", qualification: "Ph.D", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_dr.e.n.v.d%20vara%20prasad.pdf" },
    { name: "Mr. D. Dhana Prasad", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_d.dhanaprasad.pdf" },
    { name: "Ms. B. Rajitha", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_b.rajitha.pdf" },
    { name: "Mr. Y. Suresh Babu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Y%20SURESH%20BABU.pdf" },
    { name: "Ms. T.H V S Suryakantha", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_H%20V%20S%20SURYAKANTHA%20TANUKU.pdf" },
    { name: "Ms. S.Jaya Sri Lalitha", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_S.Jaya%20Sri%20Lalitha.pdf" },
    { name: "Mr. K. Pavan Sai", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.%20Pavan%20Sai.pdf" },
  ];

  const nonTeachingFaculty = [
    { name: "Mr. M.V.S.Bangar Raju", designation: "Lab Technician" },
    { name: "Mr. K.V.Subramanyam", designation: "Lab Technician" },
    { name: "Ms. A.Jhansi Lakshmi", designation: "Lab Technician" },
    { name: "Mr. K.Bhuvan Prasad", designation: "Lab Technician" },
    { name: "Mr. K Sai Krishna", designation: "Lab Technician" },
    { name: "Mrs. A.Ratna Kumari", designation: "DEO" },
    { name: "Mr. L.Prakash", designation: "Attender" },
    { name: "Mr. J.Venkateswara Rao", designation: "Attender" },
    { name: "Mrs. M.Satya Devi", designation: "Attender" },
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
                  src="/images/departments/eee/eeehod.jpg"
                  alt="Dr. D. Sudha Rani"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="female professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. D. Sudha Rani</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, EEE</p>
                  <p className="text-gray-600">Mobile: 9949043389</p>
                  <p className="text-gray-600">Phone No: 08818-284355</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department was established in the year 2002 with an intake of 60 seats in UG- B.Tech. Programme. From 2011 onwards the intake was increased to 120 seats and later it was reduced to 90 seats in 2022. The three "E" s stand for Excellence, Expertise and Efficiency of this department. The cardinal priority is to give the students real time experience and help them learn the true functional elements of ELECTRICAL & ELECTRON ICS. In its journey of 21 years, it has put many assiduous efforts in providing such training to the students. Although Electrical Engineering is a field of engineering that generally deals with the study and application of electricity, electronics, and electromagnetism, our department has made enormous efforts to give an extra mileage to the students by training them on software design and hardware-software integration so as to create more space for them in the job market.
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
            <h1 className="text-3xl md:text-4xl font-bold">Electrical & Electronics Engineering</h1>
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

export default EEEDepartment;
