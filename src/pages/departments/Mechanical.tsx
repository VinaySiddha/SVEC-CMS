
import React, { useState } from 'react';
import { Cog, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Book, Database, User } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const MechanicalDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Laboratories', label: 'Laboratories', icon: <Microscope className="w-4 h-4" /> },
    { id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty T&L methods', label: 'Faculty T&L methods', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Activity className="w-4 h-4" /> },
    { id: 'Project Research', label: 'Project Research', icon: <Search className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Magazines', label: 'Magazines', icon: <FileText className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
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

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="mt-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The Department of Mechanical Engineering was established in 2010. Since its inception, the department has been progressing towards academic and research excellence. The department is enriched with experienced and qualified faculty and well-established lab facilities. The faculty members are striving towards imparting quality education by practicing innovative teaching and learning methods.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The department offers B.Tech in Mechanical Engineering and M.Tech in Thermal Engineering. The department has 6 Ph.D. qualified faculty and 2 faculty pursuing Ph.D. The department offers quality education through the dedicated team of faculty members having high academic standards and rich industry experience. The department has modern, state-of-the-art laboratories for providing quality education.
            </p>
          </div>
        );
      case 'Vision':
        return (
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">
              To evolve into a center of excellence in mechanical engineering education by imparting quality education and to produce competent engineers with professional ethics to meet the global challenges.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="mt-6">
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                To provide quality education through effective teaching-learning methods.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To establish strong industry-institute interaction to enhance the practical knowledge of the students.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To facilitate the students with required skills and knowledge to enhance their career opportunities.
              </li>
              <li className="text-gray-700 leading-relaxed">
                To inculcate professional and ethical values among the students to serve the society.
              </li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4 italic">Graduates of Mechanical Engineering Program will be able to:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO1:</strong> Develop successful careers in mechanical engineering and allied industries.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO2:</strong> Pursue higher education and research to contribute to the development of the mechanical engineering field.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PEO3:</strong> Exhibit professional and ethical practices with effective communication skills.
              </li>
            </ul>
          </div>
        );
      case 'POs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-4 italic">Engineering Graduates will be able to:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li className="text-gray-700 leading-relaxed">
                <strong>PO1: Engineering knowledge:</strong> Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO2: Problem analysis:</strong> Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO3: Design/development of solutions:</strong> Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO4: Conduct investigations of complex problems:</strong> Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO5: Modern tool usage:</strong> Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO6: The engineer and society:</strong> Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO7: Environment and sustainability:</strong> Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO8: Ethics:</strong> Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO9: Individual and team work:</strong> Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO10: Communication:</strong> Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO11: Project management and finance:</strong> Demonstrate knowledge and understanding of the engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PO12: Life-long learning:</strong> Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.
              </li>
            </ul>
          </div>
        );
      case 'PSOs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO1:</strong> Apply the fundamentals of mathematics, science and engineering to solve problems in the fields of design, thermal and manufacturing.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO2:</strong> Utilize modern engineering tools for analysis, design, development, and manufacturing to provide solutions for real-world mechanical engineering problems.
              </li>
              <li className="text-gray-700 leading-relaxed">
                <strong>PSO3:</strong> Apply the gained knowledge to address the industrial and societal needs with professional ethics and social concerns.
              </li>
            </ul>
          </div>
        );
      case 'COs':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              Course Outcomes (COs) describe what students are expected to know and be able to do at the end of a course. They help guide teaching, learning, and assessment to ensure students reach the intended learning objectives for each course.
            </p>
            <div className="mt-4">
              <p className="text-gray-700">
                For detailed Course Outcomes for each subject, please refer to the course curriculum documents available in the department.
              </p>
              <a
                href="https://srivasaviengg.ac.in/uploads/syllabus/V23_B.Tech.III&IV_Syllabus.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center text-blue-600 hover:underline"
              >
                <FileText className="h-4 w-4 mr-1" />
                View Syllabus with Course Outcomes
              </a>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li className="text-gray-700 leading-relaxed">
                Well-qualified and dedicated faculty members with rich teaching and industry experience
              </li>
              <li className="text-gray-700 leading-relaxed">
                State-of-the-art laboratories with modern equipment and software
              </li>
              <li className="text-gray-700 leading-relaxed">
                Industry-institute interaction through industrial visits, internships, and guest lectures
              </li>
              <li className="text-gray-700 leading-relaxed">
                Active student association FAME (Fabulous Association of Mechanical Engineers)
              </li>
              <li className="text-gray-700 leading-relaxed">
                Research facilities for faculty and students to pursue innovative projects
              </li>
              <li className="text-gray-700 leading-relaxed">
                Regular workshops, seminars, and conferences for exposure to emerging technologies
              </li>
              <li className="text-gray-700 leading-relaxed">
                Emphasis on practical learning through hands-on training and project work
              </li>
              <li className="text-gray-700 leading-relaxed">
                Strong placement record with reputed companies
              </li>
              <li className="text-gray-700 leading-relaxed">
                Well-equipped departmental library with reference books and journals
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

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

            {/* Department Profile Tab Navigation */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-[#B22222] mb-6">Department Profile</h3>
              <div className="overflow-x-auto">
                <div className="border-b border-gray-200 mb-4">
                  <div className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    {['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveDeptTab(tab)}
                        className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${activeDeptTab === tab
                          ? 'text-[#B22222] border-[#B22222]'
                          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                {renderDeptTabContent()}
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
      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">S.No</th>
                    <th className="px-4 py-2">Name of the BOS Member</th>
                    <th className="px-4 py-2">Designation</th>
                    <th className="px-4 py-2">Organization</th>
                    <th className="px-4 py-2">Position in JOB</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">Dr.M.V.Ramesh</td>
                    <td className="px-4 py-2">Professor & HOD</td>
                    <td className="px-4 py-2">Dept.of ME, SVEC</td>
                    <td className="px-4 py-2">Chairperson</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">Dr.N.MohanaRao</td>
                    <td className="px-4 py-2">Professor & Director (IIIPT & SDC)</td>
                    <td className="px-4 py-2">Dept.of ME,JNTUK, Kakinada</td>
                    <td className="px-4 py-2">University Nominee</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">Dr.R.V.Chalam</td>
                    <td className="px-4 py-2">Professor</td>
                    <td className="px-4 py-2">Dept.of ME,NIT,Warangal</td>
                    <td className="px-4 py-2">Academic Expert</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">4</td>
                    <td className="px-4 py-2">Dr.A.Krishnaiahh</td>
                    <td className="px-4 py-2">Professor</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">Academic Expert</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">5</td>
                    <td className="px-4 py-2">Sri S.S.Subrahmanya Sastry</td>
                    <td className="px-4 py-2">Head of Parctice QMS</td>
                    <td className="px-4 py-2">Veave Technologies Bangalore,India</td>
                    <td className="px-4 py-2">Industry Expert</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">6</td>
                    <td className="px-4 py-2">Mr.A.Sai Krishna</td>
                    <td className="px-4 py-2">CAE Engineer</td>
                    <td className="px-4 py-2"></td>
                    <td className="px-4 py-2">Alumni</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Board of Studies Meeting Minutes</h3>
              <ul className="space-y-3 pl-4">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 7th meeting of the Board of Studies
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mech/7th BOS MOM of ME Dept.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 6th meeting of the Board of Studies
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 5th meeting of the Board of Studies
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 4th meeting of the Board of Studies
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 3rd meeting of the Board of Studies
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 2nd meeting of the Board of Studies
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 1st meeting of the Board of Studies
                    <a
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'Laboratories':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Laboratories</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Available Laboratories</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <HardHat className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Workshop</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Cog className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Production Technology Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Cog className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Machine Tools Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Microscope className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Metrology Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Cog className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">CAD/CAM Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Cog className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Thermal Engineering Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Cog className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Mechanics of Solids Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Microscope className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Metallurgy Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Cog className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Instrumentation Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Microscope className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Fuels & Lubricants Lab</span>
                </li>
                <li className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Cog className="h-5 w-5 mr-2 text-[#B22222]" />
                  <span className="font-medium">Mechanics of Fluids Lab</span>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-6">Laboratory Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/NoaAk3gNNU0"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Thermal Engineering Lab"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">Thermal Engineering Lab</h4>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/Du1edQHATEY"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Metrology Lab"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">Metrology Lab</h4>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/VUr4WV_K7qM"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Machine Lab"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">Machine Lab</h4>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/hXXZAbU6jHk"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Instrumentation Lab"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">Instrumentation Lab</h4>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/wikbcmBvEQc"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Heat Transfer Lab"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">Heat Transfer Lab</h4>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/-YBCecMTlSc"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Fuels Lab"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">Fuels Lab</h4>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/Gqx3E5zMyxA"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Fluid Mechanics Lab"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">Fluid Mechanics Lab</h4>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/ktDAGVv0Csg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Drawing Hall"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">Drawing Hall</h4>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/LnXTVI7q_QQ"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="CAD Lab"
                    ></iframe>
                  </div>
                  <h4 className="text-xl font-medium mt-3 text-center">CAD Lab</h4>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Library</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
              {/* Library Image */}
              <div className="relative">
                <img
                  src="https://img.freepik.com/free-photo/friends-learning-study-group_23-2149257209.jpg"
                  alt="Department Library"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Library Description */}
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed text-justify">
                  The Department of Mechanical Engineering maintains a comprehensive library that serves as an essential resource for students and faculty. Our collection includes textbooks, reference materials, journals, and digital resources covering all aspects of mechanical engineering disciplines.
                </p>
                <p className="text-gray-700 leading-relaxed text-justify">
                  The library provides a quiet environment for study and research, with ample seating and workspaces. Students can access technical manuals, design handbooks, engineering standards, and the latest research publications in the field.
                </p>
                <p className="text-gray-700 leading-relaxed text-justify  ">
                  Digital resources include subscriptions to leading engineering journals, e-books, and access to engineering databases, enabling students to stay updated with the latest advancements in mechanical engineering.
                </p>
              </div>
            </div>

            {/* Library Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-[#B22222] mb-4">Library Resources</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Book className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Total Books: 1,500+</span>
                  </li>
                  <li className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Journals & Periodicals: 25+</span>
                  </li>
                  <li className="flex items-center">
                    <Library className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Digital Resources: 500+</span>
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Project Reports Archive</span>
                  </li>
                  <li className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Technical Standards Collection</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-[#B22222] mb-4">Library Services</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Search className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Reference & Research Support</span>
                  </li>
                  <li className="flex items-center">
                    <Download className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Digital Resource Access</span>
                  </li>
                  <li className="flex items-center">
                    <Wifi className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Free Wi-Fi Access</span>
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>New Acquisitions Updates</span>
                  </li>
                  <li className="flex items-center">
                    <Presentation className="h-5 w-5 mr-2 text-[#B22222]" />
                    <span>Presentation & Seminar Resources</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Faculty Incharge */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-4 text-center">Faculty In-charge</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow max-w-md mx-auto">
                <div className="text-center">
                  <div className="mb-3">
                    <User className="h-16 w-16 mx-auto text-[#B22222]" />
                  </div>
                  <h4 className="text-lg font-semibold">Mr. K. Sri Rama Murthy</h4>
                  <p className="text-gray-600">Sr. Assistant Professor</p>
                  <p className="text-gray-600">Department of Mechanical Engineering</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Memorandums of Understanding (MoUs)</h2>

            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-6 text-center">MoUs with Industries</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3">S.No</th>
                      <th className="px-4 py-3">Organization</th>
                      <th className="px-4 py-3">Industry Type</th>
                      <th className="px-4 py-3">Date of MoU</th>
                      <th className="px-4 py-3">Validity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3 font-medium">National Institute of Technology, Andhra Pradesh (NITAP)</td>
                      <td className="px-4 py-3">Educational Institution</td>
                      <td className="px-4 py-3">15 Jun 2022</td>
                      <td className="px-4 py-3">3 Years</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">2</td>
                      <td className="px-4 py-3 font-medium">EduSkills Foundation</td>
                      <td className="px-4 py-3">Training & Skill Development</td>
                      <td className="px-4 py-3">10 Aug 2022</td>
                      <td className="px-4 py-3">2 Years</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">3</td>
                      <td className="px-4 py-3 font-medium">Andhra Pradesh State Skill Development Corporation (APSSDC)</td>
                      <td className="px-4 py-3">Government Skill Development</td>
                      <td className="px-4 py-3">05 Jan 2022</td>
                      <td className="px-4 py-3">3 Years</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">4</td>
                      <td className="px-4 py-3 font-medium">SVR Technologies</td>
                      <td className="px-4 py-3">Technology Solutions</td>
                      <td className="px-4 py-3">20 Nov 2021</td>
                      <td className="px-4 py-3">2 Years</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">5</td>
                      <td className="px-4 py-3 font-medium">Siemens Centre of Excellence</td>
                      <td className="px-4 py-3">Industrial Automation</td>
                      <td className="px-4 py-3">12 Feb 2021</td>
                      <td className="px-4 py-3">5 Years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-6">Activities Under MoUs</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <Handshake className="h-6 w-6 mr-2 text-[#B22222]" />
                    NITAP Collaboration
                  </h4>
                  <ul className="space-y-3 ml-8">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        Various activities organized / conducted under MoU of NITAP AY: 2022-23
                        <a
                          href="#"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Joint Research Projects: 2 ongoing faculty research collaborations</div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Faculty Development Programs: 3 FDPs conducted</div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Student Exchange Programs: 15 students participated in technical workshops</div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <Trophy className="h-6 w-6 mr-2 text-[#B22222]" />
                    EduSkills Foundation Programs
                  </h4>
                  <ul className="space-y-3 ml-8">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        Various activities organized / conducted under MoU of Eduskills AY: 2022-23
                        <a
                          href="#"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Skill Development Programs: 120+ students trained in advanced CAD/CAM tools</div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Certification Courses: 85 students received industry-recognized certifications</div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Industry Connect Programs: 4 industry experts conducted specialized training sessions</div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <Activity className="h-6 w-6 mr-2 text-[#B22222]" />
                    APSSDC Initiatives
                  </h4>
                  <ul className="space-y-3 ml-8">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        Various activities organized / conducted under MoU of APSSDC AY: 2022-23
                        <a
                          href="#"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        Various activities organized / conducted under MoU of APSSDC AY: 2020-21
                        <a
                          href="#"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Technical Workshops: 6 workshops on emerging technologies</div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Entrepreneurship Development Programs: 2 EDPs conducted</div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <Briefcase className="h-6 w-6 mr-2 text-[#B22222]" />
                    Industry Internships & Training
                  </h4>
                  <ul className="space-y-3 ml-8">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>SVR Technologies: 18 students completed industry internships</div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Siemens Centre of Excellence: 45 students received specialized training</div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Guest Lectures: 8 industry experts delivered specialized talks</div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>Industry Visits: 3 industrial visits organized for practical exposure</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-6 text-center">Benefits of MoUs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
                  <div className="mb-3">
                    <Briefcase className="h-10 w-10 mx-auto text-[#B22222]" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Enhanced Employability</h4>
                  <p className="text-gray-700">Increases job prospects through industry-relevant training</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
                  <div className="mb-3">
                    <Scroll className="h-10 w-10 mx-auto text-[#B22222]" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Certifications</h4>
                  <p className="text-gray-700">Industry-recognized certifications for career advancement</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
                  <div className="mb-3">
                    <Building className="h-10 w-10 mx-auto text-[#B22222]" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Industry Exposure</h4>
                  <p className="text-gray-700">Practical knowledge through industry interactions</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
                  <div className="mb-3">
                    <Users className="h-10 w-10 mx-auto text-[#B22222]" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Networking</h4>
                  <p className="text-gray-700">Connections with industry professionals</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
                  <div className="mb-3">
                    <Shield className="h-10 w-10 mx-auto text-[#B22222]" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Quality Assurance</h4>
                  <p className="text-gray-700">Ensures education meets industry standards</p>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg shadow text-center">
                  <div className="mb-3">
                    <Rss className="h-10 w-10 mx-auto text-[#B22222]" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Research Opportunities</h4>
                  <p className="text-gray-700">Collaborative research projects with industry</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            <div className="container mt-5">
              <div className="space-y-8">
                {/* B.Tech (MECH) Section */}
                <div>
                  <details open className="border border-gray-300 rounded-lg">
                    <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                      B.Tech (MECH)
                    </summary>
                    <div className="p-4">
                      <ul className="space-y-4 list-disc list-inside ml-4">
                        <li className="flex items-center">
                          <span>B.Tech - V23 Syllabus</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/syllabus/V23_B.Tech.III&IV_Syllabus.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                          >
                            <FileText className="h-5 w-5 mr-1" />
                            View
                          </a>
                        </li>
                        <li className="flex items-center">
                          <span>B.Tech - V20 Syllabus</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/syllabus/V20_Course_Structure&Syllabus.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                          >
                            <FileText className="h-5 w-5 mr-1" />
                            View
                          </a>
                        </li>
                        <li className="flex items-center">
                          <span>B.Tech - V18 Syllabus</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/syllabus/V18_Course_Structure&Syllabus.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                          >
                            <FileText className="h-5 w-5 mr-1" />
                            View
                          </a>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>

                {/* M.TECH(MECH) Section */}
                <div>
                  <details className="border border-gray-300 rounded-lg">
                    <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                      M.TECH (MECH)
                    </summary>
                    <div className="p-4">
                      <ul className="space-y-4 list-disc list-inside ml-4">
                        <li className="flex items-center">
                          <span>M.Tech - V21 Syllabus</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/V21_M.Tech._TE_Course_Structure&Syllabus.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                          >
                            <FileText className="h-5 w-5 mr-1" />
                            View
                          </a>
                        </li>
                        <li className="flex items-center">
                          <span>M.Tech - V18 Syllabus</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/M.Tech.Machine%20Design_Course%20structure&Syllabi_V18.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                          >
                            <FileText className="h-5 w-5 mr-1" />
                            View
                          </a>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Faculty T&L methods':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Teaching & Learning Methods</h2>

            <div className="mb-8">
              <details open className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Faculty Innovation in Teaching and Learning
                </summary>
                <div className="p-4">
                  <ul className="space-y-4 list-disc list-inside ml-4">
                    <li className="flex items-start">
                      <span className="mt-1">Presentations using PPT, wherever necessary</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/student_participations.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Technical videos for Demonstration</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/mech_t&l/technical%20videos.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Power point Presentations for various subjects</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/mech_t&l/ppts.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Usage of Tools like AUTOCAD, SOLIDWORKS, FEMAP</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/mech_t&l/tools.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Use of e-learning resources like NPTEL lectures, QEEE, & MOOCS</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/mech_t&l/e-learning_resources.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Student Seminars</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/ME_Minutes%20of%20First%20BOS%20Meeting.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Providing Question bank with short answer questions and quiz questions</span>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>

            <div className="mb-8">
              <details open className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Faculty Publications
                </summary>
                <div className="p-4">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2022-2023</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Faculty_Publications_AY-2022-23.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2021-2022</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Faculty_Publications_AY-2021-22.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2020-2021</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Publications_2020-21-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2019-2020</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Publications_2019-20-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2018-2019</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Publications_2018-19-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2017-2018</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/FACULTY%20PUBLICATIONS%20AC%202017-18.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2016-2017</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/FACULTY%20PUBLICATIONS%20AC%202016-17.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2015-2016</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/FACULTY%20PUBLICATIONS%20AC%202015-16.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Faculty Publication during the Academic Year 2014-2015</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/FACULTY%20PUBLICATIONS%20AC%202014-2015.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        For more Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Conferences & Workshops
                </summary>
                <div className="p-4">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2022-23</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Workshop's-FDPs-AY-2022-23-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2021-22</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Workshop's-FDPs-AY-2021-22-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2020-21</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Workshop's-FDPs-2020-21-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2019-20</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Workshop's-FDPs-2019-20-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2018-19</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Workshop's-FDPs-2018-19-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2017-18</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Workshop's-FDPs-2017-18-ME.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2016-17</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/fdps_wrkshps_2016-17.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2015-16</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/fdps_wrkshps_2015-16.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2014-15</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/fdps_wrkshps_2014-15.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2013-14</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/fdps_wrkshps_2013-14.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>

            <div className="mb-8">
              <details open className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Internships
                </summary>
                <div className="p-4">
                  <ul className="space-y-4 list-disc list-inside ml-4">
                    <li className="flex items-start">
                      <span className="mt-1">Internships during the Academic Year 2022-23</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2022-23.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Internships during the Academic Year 2021-22</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2021-22.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Internships during the Academic Year 2020-21</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2020-21.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Internships during the Academic Year 2019-20</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2019-20.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Internships during the Academic Year 2018-19</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2018-19.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Internships during the Academic Year 2017-18</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2017-18.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Internships during the Academic Year 2016-17</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2016-17.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Internships during the Academic Year 2015-16</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2015-16.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  NPTEL/Other Certifications
                </summary>
                <div className="p-4">
                  <ul className="space-y-4 list-disc list-inside ml-4">
                    <li className="flex items-start">
                      <span className="mt-1">Certifications during the A.Y 2020-21</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/nptel%2020-21%20mech.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Certifications during the A.Y 2018-19</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/nptel%202018-19%20mech.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Achievements/Participations in Co-curricular/Extra-Curricular Activities
                </summary>
                <div className="p-4">
                  <ul className="space-y-4 list-disc list-inside ml-4">
                    <li className="flex items-start">
                      <span className="mt-1">Extracurricular activities during the Year 2023-24</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY23-24_ME_Student activities.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Extracurricular activities during the Year 2022-23</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY22-23_ME_Student activities.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Extracurricular activities during the Year 2021-22</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY21-22_ME_Student activities.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Extracurricular activities during the Year 2020-21</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY20-21_ME_Student activities.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Extracurricular activities during the Year 2019-20</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY19-20_ME_Student activities.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Extracurricular activities during the Year 2018-19</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Stu_Ach-AY_2018-19.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                  </ul>

                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-lg mb-3">Notable Individual Achievements</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>Mr. A. Saikumar (10a81a0302) has Presented Paper on "W.E", conducted by Jntuk.</li>
                      <li>Mr. S.Suresh (10a81a0352) has Presented Paper on "W.E", conducted by Jntuk.</li>
                      <li>Mr. S.Suresh (10a81a0352) has Presented Paper On "Nano Robots" conducted by Koneru Lakshmayya University, Vijayawada.</li>
                      <li>Mr. Y Sri Ganesh Babu (10a81a0359) has Presented Paper on "Nano Robots" conducted by Koneru Lakshmayya University, Vijayawada.</li>
                      <li>Mr. V.Venkatesh (10a81a0357) has Presented Paper on "Nano Robots" conducted by Koneru Lakshmayya University, Vijayawada.</li>
                      <li>Mr. N. Raviteja (10a81a0341) has Presented Paper on "I Robot Arm" conducted by Anits, Vizag.</li>
                      <li>Mr. K. Durga Prasad (10a81a0324) has Presented Paper on "I Robot Arm" conducted by Anits, Vizag.</li>
                      <li>Ms. N. Monica (10a81a0340) has Presented Paper on "I Robot Arm" conducted by Anits, Vizag.</li>
                      <li>Mr. M.Ramakrishna (10a81a0337) has Participated in the Paper Presentation held on 8-3-2013 conducted by Githam Engineering College Vishakapatnam.</li>
                      <li>Mr. Shaik Sultan Salamuddin(10a81a0351) has Participated in the Poster Presentation, conducted by Koneru Lakshmayya University, Vijayawada.</li>
                      <li>Mr. T.Chalapathi (12a85a0307) bagged First Prize in the Technical Quiz Competition held at V.R Siddartha Engineering College, Vijayawada.</li>
                      <li>Mr. T.Chalapathi (12a85a0307) bagged First Prize in the General Quiz Competition held at Jntu, Vijayanagarm.</li>
                      <li>Mr. M.Mahesh (12a85a0304) bagged First Prize in the General Quiz Competition held at Jntu, Vijayanagarm.</li>
                      <li>Mr. P.V.V Ranjith Kumar and his team has bagged First Place in Intramural Cricket competition held At Sri Vasavi Engineering College, Tadepalligudem on 7-7-13.</li>
                      <li>Mr. N.Surendra and his team has bagged First Place in Intramural Volleyball competition held At Sri Vasavi Engineering College, Tadepalligudem On 7-7-13.</li>
                      <li>Mr. Ch.Kiran Kumar and his team has bagged Second Place in Intramural Basketball Competition held At Sri Vasavi Engineering College, Tadepalligudem on 7-7-13.</li>
                      <li>Mr.M.Mahesh (12a85a0304) bagged First Prize in the Technical Quiz competition held at V.R Siddartha Engineering College, Vijayawada.</li>
                      <li>M. Srinivas (11a81a0332) has Presented a Paper on "Polutionless Vehicle" bagged Second Place on 8-2-13 At B.V.C.E Odalarevu.</li>
                      <li>M.Rakesh (11a81a0335) has Presented a Paper on "Continuous Variable Transmission" bagged Second Place on 8-2-13 At B.V.C.E Odalarevu.</li>
                    </ul>

                    <div className="mt-4">
                      <h4 className="font-medium text-lg mb-2">Students Participations</h4>
                      <div className="flex items-start">
                        <span className="mt-1">Students Participations in various events</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/student_participations.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-5 w-5 mr-1" />
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  UIF
                </summary>
                <div className="p-4">
                  <ul className="space-y-4 list-disc list-inside ml-4">
                    <li className="flex items-start">
                      <span className="mt-1">Student Achievements during the Academic Year 2018-19</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/Stu_Ach-AY_2018-19.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Community Service Project
                </summary>
                <div className="p-4">
                  <ul className="space-y-4 list-disc list-inside ml-4">
                    <li className="flex items-start">
                      <span className="mt-1">List of CSP Projects done by 2020-24 Batch Students</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse-csp/List%20of%20CSP%20Projects%20done%20by%202020-24%20Batch%20Students.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">List of CSP Projects done by 2021-25 Batch Students</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/cse-csp/List%20of%20CSP%20Projects%20done%20by%202021-25%20Batch%20Students.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Projects
                </summary>
                <div className="p-4">
                  <ul className="space-y-4 list-disc list-inside ml-4">
                    <li className="flex items-start">
                      <span className="mt-1">Project Batches during the Academic Year 2022-23</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY_2022-23-Project-Batches-A&B.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Project Batches during the Academic Year 2021-22</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY_2021-22-Project-Batches-A&B.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Project Batches during the Academic Year 2020-21</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY_2020-21-Project-Batches-A&B.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Project Batches during the Academic Year 2019-20</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY_2019-20-Project-Batches-A&B.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="mt-1">Project Batches during the Academic Year 2018-19</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mech/AY_2018-19-Project-Batches-A&B.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                      >
                        <FileText className="h-5 w-5 mr-1" />
                        View More
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>

            <div className="mb-8">
              <details open className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Placements for Batch 2019-23
                </summary>
                <div className="p-4">
                  <div className="flex items-start ml-4">
                    <span className="mt-1">Placements for Batch 2019-23</span>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mech/Placements-2019-23-Batch.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View More
                    </a>
                  </div>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Placements for Batch 2018-22
                </summary>
                <div className="p-4">
                  <div className="flex items-start ml-4">
                    <span className="mt-1">Placements for Batch 2018-22</span>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mech/Placements-2018-22-Batch.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View More
                    </a>
                  </div>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Placements for Batch 2017-21
                </summary>
                <div className="p-4">
                  <div className="flex items-start ml-4">
                    <span className="mt-1">Placements for Batch 2017-21</span>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mech/Placements-2017-21-Batch.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View More
                    </a>
                  </div>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Placements for Batch 2016-20
                </summary>
                <div className="p-4">
                  <div className="flex items-start ml-4">
                    <span className="mt-1">Placements for Batch 2016-20</span>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mech/Placements-2016-20-Batch.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View More
                    </a>
                  </div>
                </div>
              </details>
            </div>

            <div className="mb-8">
              <details className="border border-gray-300 rounded-lg">
                <summary className="bg-gray-100 p-4 cursor-pointer text-xl font-semibold hover:bg-gray-200 transition-colors duration-200">
                  Placements for Batch 2015-19
                </summary>
                <div className="p-4">
                  <div className="flex items-start ml-4">
                    <span className="mt-1">Placements for Batch 2015-19</span>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mech/Placements-2015-19-Batch.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View More
                    </a>
                  </div>
                </div>
              </details>
            </div>

            <div className="mt-12 border-t border-gray-200 pt-6">
              <h3 className="text-2xl font-semibold text-[#B22222] mb-6 text-center">Gallery</h3>
              <div className="container mx-auto">
                <div className="flex flex-col items-center">
                  <h4 className="text-xl font-semibold mb-6">2024-2025</h4>
                  <div className="max-w-2xl mb-8">
                    <img
                      src="/images/departments/me/PlacementBroucher.jpeg"
                      alt="Placement Brochure"
                      className="w-full rounded-lg shadow-lg"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Workshops':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops/SOC/Seminars</h2>

            <div className="mb-8">
              <ol className="space-y-4 list-decimal pl-5">
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2022-23</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/AY_2022-23_Department%20activities.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2021-22</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshop's-FDPs-AY-2021-22-ME.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2020-21</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/AY_2020-21_Department%20activities.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2019-20</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshop_Guest_Lecture-2019-20-ME.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2018-19</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshop_Guest_Lecture-2018-19-ME.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2017-18</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshop's-FDPs-2017-18-ME.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2016-17</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20Organized%202016-17.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2015-16</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20Organized%202015-16.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2014-15</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20%20Organized%202014-15.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2013-14</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20%20Organized%202013-14.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="mt-1">Workshops/Guest Lectures/FDPs Organized during the Academic Year 2012-13</span>
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20Organized%202012%E2%80%9313.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FileText className="h-5 w-5 mr-1" />
                    View More
                  </a>
                </li>
              </ol>
            </div>

          </div>
        );

      case 'Technical Association':
        return (

          <div className="mb-8 mt-12">
            <h2 className="text-2xl font-bold text-[#B22222] mb-6">Technical Association</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Fabulous Association of Mechanical Engineers (FAME) :</h3>
              <p className="text-gray-700 mb-6">
                FAME is a student body which is governed by the students with the support from the department.
                Every student from Department of Mechanical Engineering is beamed to be the member of this Association.
                The Association is very active in conducting Workshops, Seminars and other Curricular activities.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">Various activities conducted by FAME are as follows:</h3>
              <ul className="space-y-3 ml-6 list-disc">
                <li className="text-gray-700">
                  Mr. S.Ravi Kumar from IIT New-Delhi has delivered a guest lecture on "Metrology And Material Science".
                </li>
                <li className="text-gray-700">
                  Mr. S.V.S.S.Srikanth from Ansys/FLUENT Technologies, Pune has delivered a guest lecture on "ANSYS"
                </li>
                <li className="text-gray-700">
                  Dr.G.V.N.S.Ratnakara Rao B.E,M.E,Ph.D. from BIET, Bhimavaram has delivered a guest lecture on "An Insight Into Combustion in I.C. engines".
                </li>
                <li className="text-gray-700">
                  Mr. Mallikarjun Rao from Steel Plant, Vizag has delivered a guest lecture on General Management And Skills
                </li>
                <li className="text-gray-700">
                  Mr. Nageswara Rao from IIT Bombay has delivered a guest lecture on "Presentation Skills".
                </li>
              </ul>
            </div>
          </div>
        );

      case 'Project Research':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Project Research & Development</h2>


            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b-2 border-primary">Research Projects Archive</h3>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#B22222]" />
                    Undergraduate Research Projects
                  </h4>
                  <ul className="space-y-3 ml-2">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <div>
                        Research Projects during academic year 2022-23
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/AY_2022-23-Research_Projects.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View More
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <div>
                        Research Projects during academic year 2021-22
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/AY_2021-22-Research_Projects.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View More
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <div>
                        Research Projects during academic year 2020-21
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/AY_2020-21-Research_Projects.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View More
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <div>
                        Research Projects during academic year 2019-20
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/AY_2019-20-Research_Projects.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View More
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <div>
                        Research Projects during academic year 2018-19
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/AY_2018-19-Research%20Projects.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View More
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#B22222]" />
                    Postgraduate Research Projects
                  </h4>
                  <ul className="space-y-3 ml-2">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <div>
                        Research Projects Details
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/M.Tech.Research_Projects.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View More
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


          </div>
        );

      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Newsletters</h2>

            <div className="mx-auto max-w-4xl">
              <p className="text-gray-700 mb-6 text-center">
                Our department regularly publishes newsletters to keep students, faculty, and alumni updated on departmental activities, achievements, and developments.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="space-y-4">
                  {/* 2017 Newsletters */}
                  <div className="border-b pb-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">2017</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 4 Issue 3 - January 2017
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">First newsletter of the year highlighting winter activities</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%204%20Issue%20%203-%20jan%202017.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 4 Issue 4 - April 2017
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Spring edition featuring end-of-semester projects</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%204%20Issue%20%204-%20apr%202017.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 5 Issue 1 - September 2017
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Fall semester kickoff with new student orientation details</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%205%20Issue%20%201-%20sep%202017.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 5 Issue 2 - November 2017
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Winter preparation and mid-year project updates</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%205%20Issue%20%202-%20nov%202017.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 2016 Newsletters */}
                  <div className="border-b pb-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">2016</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 3 Issue 3 - January 2016
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">New year edition featuring department goals</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%203%20Issue%20%203-%20jan%202016.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 3 Issue 4 - April 2016
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Spring highlights and research progress</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%203%20Issue%20%204-%20apr%202016.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 4 Issue 1 - September 2016
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">New academic year with faculty updates</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%204%20Issue%20%201-%20sep%202016.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 4 Issue 2 - November 2016
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Fall semester events and workshop recaps</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%204%20Issue%20%202-%20nov%202016.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 2014-2015 Newsletters */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">2014-2015</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 2 Issue 1 - September 2014
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Department relaunch with new curriculum</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%202%20Issue%20%201-%20sep%202014.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 2 Issue 2 - November 2014
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Mid-semester achievements and guest lectures</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%202%20Issue%20%202-%20nov%202014.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 2 Issue 3 - January 2015
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">New year edition with student innovations</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%202%20Issue%20%203-%20jan%202015.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 2 Issue 4 - April 2015
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">End of academic year highlights and future plans</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%202%20Issue%20%204-%20apr%202015.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 3 Issue 1 - September 2015
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">New academic year welcome edition</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%203%20Issue%20%201-%20sep%202015.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-[#B22222] mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Volume 3 Issue 2 - November 2015
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">Fall semester activities and technical events</p>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mech/Volume%20%203%20Issue%20%202-%20nov%202015.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          View Newsletter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 italic">
                  For archived newsletters or additional information, please contact the department office.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Magazines':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Magazines</h2>

            <div className="mx-auto max-w-4xl">
              <p className="text-gray-700 mb-6 text-center">
                Mechazine is our department's biannual magazine that showcases student achievements, technical articles, and the latest developments in mechanical engineering.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 2019-2020 */}
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">2019-2020</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Mechazine Volume 6 Issue 2</p>
                            <p className="text-sm text-gray-600 mb-2">End of academic year special edition</p>
                            <a
                              href="https://srivasaviengg.ac.in/uploads/mech/MECHAZINE_2019-20_V-6 _I-2.pdf"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-blue-600 hover:underline"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Magazine
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Mechazine Volume 6 Issue 1</p>
                            <p className="text-sm text-gray-600 mb-2">Beginning of academic year edition</p>
                            <a
                              href="https://srivasaviengg.ac.in/uploads/mech/MECHAZINE_2019-20_V-6 _I-1.pdf"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-blue-600 hover:underline"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Magazine
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* 2018-2019 */}
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">2018-2019</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Mechazine Volume 5 Issue 2</p>
                            <p className="text-sm text-gray-600 mb-2">Spring semester technical showcase</p>
                            <a
                              href="https://srivasaviengg.ac.in/uploads/mech/MECHAZINE_2018-19_V-5 _I-2.pdf"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-blue-600 hover:underline"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Magazine
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Mechazine Volume 5 Issue 1</p>
                            <p className="text-sm text-gray-600 mb-2">Fall semester edition with student projects</p>
                            <a
                              href="https://srivasaviengg.ac.in/uploads/mech/MECHAZINE 2017 &amp; 18 V5I1.pdf"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-blue-600 hover:underline"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Magazine
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* 2016-2017 */}
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">2016-2017</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Mechazine Volume 4 Issue 2</p>
                            <p className="text-sm text-gray-600 mb-2">Technical innovations and research highlights</p>
                            <a
                              href="https://srivasaviengg.ac.in/uploads/mech/MECHAZINE 2016-17 V4I2.pdf"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-blue-600 hover:underline"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Magazine
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Mechazine Volume 4 Issue 1</p>
                            <p className="text-sm text-gray-600 mb-2">Fall edition with student activities</p>
                            <a
                              href="https://srivasaviengg.ac.in/uploads/mech/Mechazine Volume 4 Issue 1.pdf"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-blue-600 hover:underline"
                            >
                              <ExternalLink className="h-3.5 w-3.5 mr-1" />
                              View Magazine
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Earlier Issues */}
                  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">Earlier Issues</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Mechazine Volume 3 Issues</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <a
                                href="https://srivasaviengg.ac.in/uploads/mech/Mechazine Volume 3 Issue 1.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center text-blue-600 hover:underline text-sm"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Issue 1
                              </a>
                              <a
                                href="https://srivasaviengg.ac.in/uploads/mech/Mechazine Volume3 Issue2.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center text-blue-600 hover:underline text-sm"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Issue 2
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-[#B22222] mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Mechazine Volume 2 Issues</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <a
                                href="https://srivasaviengg.ac.in/uploads/mech/Mechazine Volume2 Issue1.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center text-blue-600 hover:underline text-sm"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Issue 1
                              </a>
                              <a
                                href="https://srivasaviengg.ac.in/uploads/mech/mechazine volume2 issue2.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center text-blue-600 hover:underline text-sm"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Issue 2
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 italic">
                  Mechazine is a biannual publication featuring technical articles, student achievements, department events, and industry insights. Students and faculty are encouraged to contribute articles for upcoming issues.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>

            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b-2 border-primary">Hackathons</h3>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  A 24-hour student hackathon is an event where students come together to collaborate, innovate, and create projects within a short time frame. These hackathons have gained immense popularity in recent years, and they hold significant importance for students for several reasons:
                </p>

                <ul className="space-y-4 text-gray-700 mb-8">
                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Hands-on learning:</span>
                    <span>Hackathons provide students with a unique opportunity to engage in hands-on learning. They encourage participants to apply their knowledge and skills to real-world problems and challenges. It allows students to go beyond theoretical knowledge and gain practical experience by working on a project from start to finish within a limited time.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Collaboration and teamwork:</span>
                    <span>Hackathons foster collaboration and teamwork among students. Participants usually form teams, bringing together individuals with diverse backgrounds and expertise. Working together, they learn to communicate effectively, leverage each other's strengths, and tackle complex problems collectively. The experience of collaborating with peers from different disciplines helps develop essential teamwork and interpersonal skills.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Innovation and creativity:</span>
                    <span>The time constraint of a 24-hour hackathon encourages participants to think innovatively and creatively. Students are often required to come up with novel solutions to problems or create something entirely new within a limited timeframe. This pressure fuels innovation and pushes participants to explore unconventional ideas, leading to the development of unique projects.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Networking and industry exposure:</span>
                    <span>Student hackathons often attract participants, mentors, and judges from various industries and organizations. This provides an excellent networking opportunity for students to connect with professionals, potential employers, and like-minded peers. Building connections during a hackathon can lead to future internships, job opportunities, or collaborations on other projects.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Skill development:</span>
                    <span>Hackathons offer a platform for students to enhance their existing skills and acquire new ones. During the event, participants may have to learn and use new technologies, programming languages, or tools to complete their projects. This process helps broaden their skillset, exposes them to different technologies, and allows them to experiment with cutting-edge tools and platforms.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Resume/portfolio enhancement:</span>
                    <span>Participating in hackathons adds value to a student's resume or portfolio. It demonstrates their passion for learning, problem-solving ability, teamwork skills, and ability to work under pressure. Employers and educational institutions often consider hackathon experience as a strong indicator of a student's practical skills and motivation.</span>
                  </li>

                  <li className="flex">
                    <span className="font-semibold text-[#B22222] mr-2">Recognition and awards:</span>
                    <span>Many hackathons offer prizes, recognition, or opportunities for participants to showcase their projects to a wider audience. Winning or being recognized in a hackathon can boost a student's confidence, provide validation for their work, and open doors to further opportunities.</span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-8">
                  In conclusion, 24-hour student hackathons are important because they promote hands-on learning, foster collaboration, encourage innovation, provide networking opportunities, facilitate skill development, enhance resumes/portfolios, and offer recognition for participants. They serve as a platform for students to showcase their abilities, learn from their peers, and gain valuable experience in a short period.
                </p>
              </div>

              <div className="mb-10">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">Hackathons Conducted</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-[#B22222] text-white">
                      <tr>
                        <th className="py-3 px-4 text-left border-b">Academic Year</th>
                        <th className="py-3 px-4 text-left border-b">For Brochure</th>
                        <th className="py-3 px-4 text-left border-b">For Winners List</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">2022-23</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackoverflow%20banner_2022_23.png"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            View Brochure
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2022-23.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Winners
                          </a>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">2021-22</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/broacher_2021_22.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Brochure
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2021-22.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Winners
                          </a>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">2019-20</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Brouchure.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Brochure
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2019-20.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Winners
                          </a>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">2018-19</td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/City%20Digi%20@Hack%202K18.jpg"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <ExternalLink className="h-3.5 w-3.5 mr-1" />
                            View Brochure
                          </a>
                        </td>
                        <td className="py-3 px-4 border-b">
                          <a
                            href="https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20winners_2018-19.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Winners
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-xl font-semibold text-gray-700 mb-6">Gallery - Hackathon 2022</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <img
                      src="/images/departments/me/Hackthon_2022_23 (1).jpg"
                      alt="Hackathon 2022-23 Photo 1"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <img
                      src="/images/departments/me/Hackthon 2021_22 (1).jpeg"
                      alt="Hackathon 2021-22 Photo 1"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <div className="space-y-6">
                    <img
                      src="/images/departments/me/Hackthon 2021_22 (1).jpeg"
                      alt="Hackathon 2021-22 Photo 2"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <img
                      src="/images/departments/me/Hackthon_2022_23 (2) (1).jpg"
                      alt="Hackathon 2022-23 Photo 2"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
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
            <h1 className="text-3xl md:text-4xl font-bold">Mechanical Engineering</h1>
          </div>
        </div>
      </section>

      {/* Fixed Sidebar Component */}
      <FixedSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        title="Mechanical Department"
        buttonLabel="Department Menu"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MechanicalDepartment;
