
import React, { useState } from 'react';
import { Book, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText } from 'lucide-react';

const BSHDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'FDPs/Guest lectures Organized', 'FDPs/Workshops Participated', 'Faculty Paper Presentations', 'Laboratories', 'Faculty Achievements', 'Student Achievements', 'Department Achievements', 'Activities', 'Syllabus', 'Results', 'Contact'
  ];

  const facultyData = {
    mathematics: [
      { name: "Mr.N.Rajasekhar", qualification: "M.Sc.M.Phil", designation: "Assoc.Professor&HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/bsh_N.Rajasekhar_webprofile.pdf" },
      { name: "Mr.Sk.Dhana Prasad", qualification: "M.Sc,B.Ed", designation: "Asst. Professor &section Head", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Sk.Dhana%20PrasadSk.Dhana%20Prasad.pdf" },
      { name: "Mrs. B.Adi Lakshmi", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/B.Adi%20LakshmiAdi%20Lakshmi%20(Maths).pdf" },
      { name: "Mrs. G.S.Prasanthi", qualification: "M.Sc.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/G.PrasanthiG.S.Prasanthi.pdf" },
      { name: "Mr. V.Srinivas", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20V.%20Srinivas.pdf" },
      { name: "Mrs. B.V.D.Santhi lakshmi", qualification: "M.Sc.,B.Ed.,M.Phil,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/B.V.D.%20Santhi%20Lakshmisanthi(Maths).pdf" },
      { name: "Ms. S. Sirisha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20S.%20Sirisha.pdf" },
      { name: "Ms. T. Satya Surya Praba", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20T.Satya%20Surya%20Prabha.pdf" },
      { name: "Mr. T.D.Rama Krishna", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20T.%20D%20Rama%20Krishna.pdf" },
      { name: "Mr. S. Veeresh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20S.%20Veeresh.pdf" },
      { name: "Mr. M. Satya Suresh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20M.%20Satya%20Suresh.pdf" },
      { name: "Ms. P. Sravani", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20P.Sravani.pdf" },
      { name: "Mr. J.N.V Somayajulu", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "" },
      { name: "Ms. P. Sravani", qualification: "M.Sc", designation: "Asst. Professor", profileUrl: "" }
    ],
    chemistry: [
      { name: "Mrs. S.S.V.Suma Latha", qualification: "M.Sc.,B.Ed.,(Ph.D)", designation: "Asst. Professor & Section head", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/S.S.V.Suma%20Lathassvsuma%20Latha.pdf" },
      { name: "Mr. J. Chandara Rao", qualification: "M.Sc.,M.Phil.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/J.Chandara%20Raochandara%20rao%20resume.pdf" },
      { name: "Mrs. P. Durga Devi", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/P.Durga%20DeviDurga%20devi.pdf" },
      { name: "Ms. A. Anusha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.A.Anusha.pdf" },
      { name: "Ms. S. Lavanya", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.S.Lavanya.pdf" },
      { name: "Mrs. P. Silpa", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20P.Silpa.pdf" },
      { name: "Ms. Md. Syed Yasmin", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.Md.%20Syed%20Yasmin.pdf" },
      { name: "Dr. B. Rama Krishna", qualification: "M.Sc.,Ph.D", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20B.%20Rama%20Krishna.pdf" }
    ],
    english: [
        { name: "Dr.T.Sujani", qualification: "M.A.,M.Phil.,Ph.D", designation: "Assoc. Professor & Section Head", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20T.SujaniSujani%20Tata.pdf" },
        { name: "Dr.K. Venkata Rao", qualification: "M.A.,B.Ed.,M.Phil.,Ph.D", designation: "Assoc. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/BSH_Dr.K.%20Venkata%20Rao.pdf" },
        { name: "Dr.B.Anada Rao", qualification: "M.A.,M.Phil.,Ph.D", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.%20B.%20Ananda%20Rao.pdf" },
        { name: "Mr. K.V.Rama Rao", qualification: "M.A.,B.Ed.,(Ph.D)", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.K%20V%20Rama%20Rao.pdf" },
        { name: "Mrs. K. Radha Madhavi", qualification: "M.A.,B.Ed.,M.Phil", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20K.Radha%20Madhavi.pdf" },
        { name: "Mrs. Ch. Tanuja", qualification: "M.A., M.Phil.,B.Ed.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.Ch.%20Tanuja.pdf" },
        { name: "Mrs. U. Aparanjani", qualification: "M.A.,B.Ed.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.Aparanjani.pdf" },
        { name: "Mr. G. Srinivas Rao", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20G.%20Srinivasa%20Rao.pdf" },
        { name: "Mr. M. Venkata Ramana", qualification: "M.A., B.Ed.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20M.%20Venkata%20Ramana.pdf" },
        { name: "Ms. A.Kiranmayee", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20A.Kiranmayee.pdf" },
        { name: "Ms. P.V.Padmavathi", qualification: "M.A.,B.Ed,", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Ms.%20P.V.Padmavathi.pdf" },
        { name: "Mrs. Ch. Manjeera", qualification: "M.A.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20Ch.%20Manjeera.pdf" },
        { name: "Mr. Ch. Mutyala Rao", qualification: "M.A., B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20Ch.%20Mutyala%20Rao.pdf" }
    ],
    physics: [
        { name: "Mr. P. Sita Rama Raju", qualification: "M.Sc.,M.Phil.,(Ph.D)", designation: "Assoc. Professor & Section Head", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/P.Sita%20Rama%20RajuPSR%20Raju%20Profile.pdf" },
        { name: "Dr. K. Jagadeesh", qualification: "M.Sc.,Ph.D", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Dr.K.Jagadeesh.pdf" },
        { name: "Mr. B. Sasi Bhushan", qualification: "M.Sc.,M.tech", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/Sasi%20Bhushan%20BhimavarapuSasi%20Bhushan%20Bhimavarapu.pdf" },
        { name: "Mrs. G.Ramadevi", qualification: "M.Sc.", designation: "Sr.Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/GAJULA%20RAMADEVI.pdf" },
        { name: "Mr. P. Naga Ramesh", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20P%20Naga%20Ramesh.pdf" },
        { name: "Mrs. B. Sudha", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mrs.%20B.%20Sudha.pdf" },
        { name: "Mr. P. Vinay", qualification: "M.Sc.,B.Ed", designation: "Asst. Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/BSH_Mr.%20P%20%20Vinay.pdf" },
        { name: "Mr. K. Nagavamsi Sai Dileep", qualification: "M.Sc.", designation: "Asst. Professor", profileUrl: "" }
    ],
    library: [
        { name: "Dr.G.CH.S Madhusudhan Rao", qualification: "M.Sc.,M.Phil.,Ph.D", designation: "Assoc.Professor", profileUrl: "http://www.srivasaviengg.ac.in/faculty_profile/S.S.V.Suma%20Lathassvsuma%20Latha.pdf" }
    ],
    physicalEducation: [
        { name: "Mr. S. Satish", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_S.SATEESH%20Resume%20-%202023.pdf" },
        { name: "Ms. K. Lavanya", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_Mr.K.%20Lavanya.pdf" },
        { name: "Ms. U. Jyothi", qualification: "M.P.Ed", designation: "PET", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/PD_U.%20Jyothi.pdf" }
    ],
  };

  const nonTeachingFaculty = [
    { name: "Mr. T. Sushma", designation: "Physics Lab Technician" },
    { name: "Mr. V. sekhar Babu", designation: "Chemistry Lab Technician" },
    { name: "Mr.P. Peda Venkata Rao", designation: "Chemistry Lab Technician" },
    { name: "Ms. A. V. V Naga Lakshmi", designation: "DEO" },
    { name: "Mrs. L. Gouthami", designation: "DEO" },
    { name: "Mr. G. Srinivas Rao", designation: "Attender" },
    { name: "Ms. A. V. V Lakshmi", designation: "Attender" },
    { name: "Mr. O. Prabhakara Rao", designation: "Attender" },
    { name: "Mr. P. Siva Sundaram", designation: "Attender" }
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
                  src="/images/departments/bsh/bsh-hod.png" 
                  alt="Sri N. Raja Sekhar"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Sri N. Raja Sekhar</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Head of the Department</p>
                  <p className="text-gray-600">Mobile No: 9885739808</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                   <p className="text-gray-600">Email: <a href="mailto:hod_bsh@srivasaviengg.ac.in" className="text-primary hover:underline">hod_bsh@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Basic Science and Humanities started at the inception of the college. The Department is fundamental to Engineering and devoted to fostering the basic principles and understanding of science to enhance the students’ basic knowledge of Engineering. Its objective is to provide value-based education for budding Scientists and Engineers. The Department offers various courses of study namely Mathematics, Physics ,Chemistry, Environmental Studies, and English.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            {Object.entries(facultyData).map(([subject, members]) => (
              <div key={subject} className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4 capitalize border-b-2 border-primary pb-2">{subject}</h3>
                <div className="overflow-x-auto">
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
                      {members.map((member, index) => (
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
              </div>
            ))}
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

export default BSHDepartment;
