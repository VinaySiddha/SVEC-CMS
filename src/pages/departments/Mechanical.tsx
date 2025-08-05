
import React, { useState } from 'react';
import { Cog, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library } from 'lucide-react';

const MechanicalDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Laboratories', 'Department Library', 'MoUs', 'Faculty T&L methods', 'Faculty Achievements', 'Student Achievements', 'Placements', 'Workshops', 'Technical Association', 'Project Research', 'Newsletters', 'Magazines', 'Extra-Curricular Activities', 'Green Initiative', 'Product Development', 'Syllabus', 'Handbooks', 'Contact'
  ];
  
  const faculty = [
    { name: "Dr.G.V.N.S.R.Ratnakara Rao", qualification: "M.E.,Ph.D", designation: "Professor & Principal", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Dr.%20G.V.N.S.R.%20Ratnakara%20RaoDr.Ratnakar_Ph.D%20profile.pdf" },
    { name: "Dr.M.V.Ramesh", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.Dr.M.V.RameshResume%20OCT%202017.pdf" },
    { name: "Mr.K.S.B.S.V.S.Sastry", qualification: "M.Tech.,(Ph.D)", designation: "Associate Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20K.S.B.S.V.S.%20SastryMr.%20K.S.B.S.V.S.Sastry_Profile.pdf" },
    { name: "Mr.P.N.V.Gopala Krishna", qualification: "M.E,M.B.A,M.Tech,(Ph.D)", designation: "Associate Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MECH_Dr.Shirin%20Bhanu%20Koduri.pdf" },
    { name: "Dr.K.Dorathi", qualification: "M.Tech,Ph.D", designation: "Associate Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mrs.%20K.%20DorathiMrs.%20K.Dorathi_Profile.pdf" },
    { name: "Mr.K.Sri Rama Murthy", qualification: "M.Tech,(Ph.D)", designation: "Sr. Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20K.%20Sri%20Rama%20MurthyMr.%20K.%20Sri%20Rama%20Murthy_Profile.pdf" },
    { name: "Mr. G.Rama Prasad", qualification: "M.Tech,(Ph.D)", designation: "Sr. Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20G.%20Rama%20PrasadMr.%20G.%20Rama%20Prasad_Profile.pdf" },
    { name: "Mr.B.N.V.Srinivas", qualification: "M.Tech,(Ph.D)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/B.N.V%20Srinivas%20BNV%20SRINIVAS%20(1).pdf" },
    { name: "Mr.T.S.S.R.Krishna", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20T.S.S.R.%20KrishnaMr.%20T.S.S.R.%20Krishna_Profile.pdf" },
    { name: "Mr. S.Chandrasekhar", qualification: "M.Tech,(Ph.D)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20S.%20ChandrasekharMr.%20S.%20Chandraskehar_Profile.pdf" },
    { name: "Mr. K.C.S.Vyasa Krishnaji", qualification: "M.Tech,(Ph.D)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20K.C.S.%20Vyasa%20KrishnajiFaculty_profile%20Format%20KCS%20VYASA%20KRISHNAJI.docx.pdf" },
    { name: "Mr.G.Prasanth", qualification: "M.E,(Ph.D)(Study Leave)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20G.%20Prasanth%20prasanth%20faculty%20profile%20format.pdf" },
    { name: "Mr.D.V.N.Prabhakar", qualification: "M.E(Ph.D)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr%20D%20V%20N%20Prabhakar25-%20dvn%20prabhakar.pdf" },
    { name: "Mr. T.Atama Ramadu", qualification: "M.Tech(Ph.D)(Study Leave)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MECH_MNRAO.pdf" },
    { name: "Mr. D.Ayyappa", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/mech_Ayyappa%20Resume.pdf" },
    { name: "Mr. M.D.Nagedra Prasad", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/mech_M.D.Nagendra_Prasad_CV.pdf" },
    { name: "Mr. M.Venkatesh", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/me_Venkatesh.M.pdf" },
    { name: "Mr. M.Chaitanya", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/me_Chaitanya.M.pdf" },
    { name: "Mr. Sk.Arief", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/me_Sk.Arief-Resume.pdf" },
    { name: "Mr. V.Ravi Kumar", qualification: "M.Tech(Ph.D)", designation: "Assistant Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/ME_%20Resume_%20Ravi.pdf" },
    { name: "Dr.S.Subbarama Kousik", qualification: "M.Tech,(Ph.D)(Study Leave)", designation: "Assistant Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/mech_Dr.%20SSR%20Kousik.pdf" },
    { name: "Mr. M. V. S. S. D. S Surya Pavan", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/mech_Mr.%20Mallampalli%20V%20S%20S%20%20D%20S%20Surya%20Pavan.pdf" },
    { name: "Mr. M.S.N.Murthy", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/mech_MSN%20Murthy%20Resume.pdf" },
    { name: "Mr. P.Mohankrishna", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/mech_Mohan.pdf" },
    { name: "Mr .K. Suchendra Kumar", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/mech_Mr.%20K.%20Suchendra%20Kumar.pdf" },
    { name: "Ms.Y.Sampurna", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/mech_Ms.%20Y.%20Sampurna.pdf" }
  ];

  const nonTeachingFaculty = [
    { name: "Mr.A.Bala Balaji", designation: "Lab Technician" },
    { name: "Mr.K.V.V.Durga Rao", designation: "Lab Technician" },
    { name: "Mr. P.Rama Krishna", designation: "Lab Technician" },
    { name: "Mr. Y. Narasimha Rao", designation: "Lab Technician" },
    { name: "Mr. Ch. Naga Babu", designation: "Lab Technician" },
    { name: "Mr. K Ravi Kiran", designation: "Lab Technician" },
    { name: "Mr. G.Kiran", designation: "Attender" },
    { name: "Mr. K. Srinivasa Rao", designation: "Attender" }
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
                  src="/images/departments/me/mechhod.jpg" 
                  alt="Dr. M. V. Ramesh"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. M. V. Ramesh</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, Mechanical</p>
                  <p className="text-gray-600">Email: <a href="mailto:hod_mech@srivasaviengg.ac.in" className="text-primary hover:underline">hod_mech@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Mechanical Engineering was established in 2010. Since its inception, the department has been progressing towards academic and research excellence. The department is enriched with experienced and qualified faculty and well-established lab facilities. The faculty members are striving towards imparting quality education by practicing innovative teaching and learning methods.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            <div className="overflow-x-auto mb-10">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 capitalize border-b-2 border-primary pb-2">Teaching Faculty</h3>
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
            <div className="overflow-x-auto">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 capitalize border-b-2 border-primary pb-2">Non-Teaching Staff</h3>
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
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Cog className="w-16 h-16 text-white mr-4" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Mechanical Engineering</h1>
                </div>
              </div>
              <p className="text-xl leading-relaxed">
                Engineering the future with innovative mechanical systems, advanced manufacturing, and sustainable design solutions.
              </p>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Mechanical Department"
                className="rounded-2xl shadow-2xl"
                data-ai-hint="gears machine"
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

export default MechanicalDepartment;
