
import React, { useState } from 'react';
import { Briefcase, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';

const MBADepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Placements', 'Student Achievements', 'Newsletters', 'Extra-Curricular Activities', 'Contact'
  ];

  const faculty = [
    { name: "Mr.D.Naveen Kumar", qualification: "MBA", designation: "Sr.Asst.Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Mr.%20D.Naveen%20Kumar.pdf" },
    { name: "Dr.G.V.Subba Raju", qualification: "MBA,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Dr.G.V.%20Subba%20Raju.pdf" },
    { name: "Dr.S.Krishnamurthy Naidu", qualification: "MBA,Ph.D", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Dr.%20S.%20Krishnamurthy%20Naidu.pdf" },
    { name: "Mr.D. Satyanarayana", qualification: "MA,M.com,MBA,ICWAI(I),SET", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Mr.%20D.Satyanarayana.pdf" },
    { name: "Dr.K.Rambabu", qualification: "MBA,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Dr.K.Rambabu.pdf" },
    { name: "Mr.T.Dileep", qualification: "MBA,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Mr.T.Dileep.pdf" },
    { name: "Mr. K.Pavan Kumar", qualification: "MBA(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Mr.%20K.Pavan%20Kumar.pdf" },
    { name: "Mr. P.Bharat Kumar", qualification: "MBA", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Mr.%20P.Bharat%20Kumar.pdf" },
    { name: "Mrs. P.Devi", qualification: "MBA", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Mrs.P.Devi.pdf" },
    { name: "Dr. K.Pulla Rao", qualification: "MBA,Ph.D", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Dr.K.Pulla%20Rao.pdf" },
    { name: "Mr. K.Lalitha Bhavani", qualification: "MBA,MHRM", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Mrs.K.Lalitha%20Bavani.pdf" },
    { name: "Mr. V.Rajasekhar Ryaly", qualification: "MBA", designation: "Sr. Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MBA_Mr.%20%20V%20Rajasekhar%20Ryaly.pdf" },
    { name: "Ms. P.Bala Jyothi", qualification: "MBA", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/MBA_" },
    { name: "Ms. V. Sandhya Chowdary", qualification: "MBA", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/MBA_" }
  ];

  const nonTeachingFaculty = [
    { name: "U.Raja Ratnam", designation: "DEO" },
    { name: "M. Satyanarayana", designation: "Attender" }
  ];
  
  const boardOfStudies = [
    { name: "Dr. G.V.Subba Raju", designation: "Professor", organization: "Dept of MBA, SVEC", position: "Chairperson" },
    { name: "Dr. B.Amarnath", designation: "Former Professor,Department of Management Studies", organization: "SV University", position: "Council Nominee" },
    { name: "Dr. Suryachandra Rao", designation: "Professor,Department of Management Studies", organization: "Krishna University", position: "University Nominee" },
    { name: "Sri. P.S. Varma", designation: "Former D G M,Coromandel International Limited", organization: "Kakinada", position: "Industry Expert" },
    { name: "Sri Satyanarayana Ruttala", designation: "Senior Manager", organization: "Ericsson India Global Services Pvt., Ltd.", position: "Alumni" },
    { name: "All Faculty Members in the MBA Dept.", designation: "are Members in BOS", organization: "", position: "" }
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
                  src="/images/departments/mba/mbaHod1.jpeg"
                  alt="Mr. D. Naveen Kumar"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Mr. D. Naveen Kumar</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Sr.Asst.Professor & Head of Department, MBA</p>
                  <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-364)</p>
                  <p className="text-gray-600">Fax No: 08818-284322</p>
                   <p className="text-gray-600">Email: <a href="mailto:hod_mba@srivasaviengg.ac.in" className="text-primary hover:underline">hod_mba@srivasaviengg.ac.in</a></p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The Department of Business Administration was established in the year 2006. The Master of Business Administration (MBA) program is designed to meet the challenge of full-filling the needs of the society under resource constraints by providing new dimensions in the body of knowledge needed for managerial development.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
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
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
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
                <Building className="w-16 h-16 text-white mr-4" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Master of</h1>
                  <p className="text-xl text-gray-200">Business Administration</p>
                </div>
              </div>
              <p className="text-xl leading-relaxed">
                Shaping tomorrow's business leaders through comprehensive management education and strategic thinking.
              </p>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="MBA Department"
                className="rounded-2xl shadow-2xl"
                data-ai-hint="business meeting"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden w-full flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-4"
              >
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
                          if(window.innerWidth < 1024) setSidebarOpen(false);
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

export default MBADepartment;
