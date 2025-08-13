import React, { useState } from 'react';
import { Building, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const CivilDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'R&D', label: 'R&D', icon: <Search className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Research Projects', label: 'Research Projects', icon: <Search className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Consultancy', label: 'Consultancy', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const faculty = [
    { name: "Dr.G.Radhakrishnan", qualification: "ME,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_G%20RADHAKRISHNAN%20PROFILE.pdf" },
    { name: "Mr. V.L.D Prasad Reddy", qualification: "M.E.", designation: "Assistant Professor & ACE", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_V%20L%20D%20Prasad%20Reddy.pdf" },
    { name: "Mr. J.Vijaya Chandra", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_VIJAYA%20CHANDRA%20PROFILE.pdf" },
    { name: "Mr. B.HemaSundar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_B%20HEMASUNDAR.pdf" },
    { name: "Mr. M.Prem Kumar Raju", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_M%20PREM%20KUMAR%20RAJU%20PROFILE.pdf" },
    { name: "Mr. K.Gowtham Kumar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Gowtham%20Kumar.pdf" },
    { name: "Mr. E Hanuman Sai Gupta", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CE_E%20Hanuman%20Sai%20Gupta.pdf" },
    { name: "Ms. B.Rohitha", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_ROHITHA%20PROFILE.pdf" },
    { name: "Ms. Ch.Sumaja", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_CH%20Sumaja.pdf" },
    { name: "Mr. K.J.Ganapathi", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Kaigala%20J%20Ganapathi.pdf" }
  ];

  const nonTeachingFaculty = [
    { name: "Mr. A.N.V.Ravi Kumar", designation: "Lab Technician" },
    { name: "Mr. P.V.S.Krishna Prasad", designation: "Lab Technician" },
    { name: "Mr. M.Abraham Lincoln", designation: "Lab Technician" },
    { name: "Mr. M.Sasi Kumar", designation: "Lab Technician" },
    { name: "Mr. T.V.V.Satyanarayana", designation: "DEO" },
    { name: "Ms. B.M.G.A.Bhargav", designation: "Attender" }
  ];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div>
            {/* Head of Department's Message */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="relative">
                  <img
                    src="/images/departments/ce/civilhod.png"
                    alt="Dr. G. Radhakrishnan"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Radhakrishnan</h3>
                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, Civil</p>
                    <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                    <p className="text-gray-600">Fax No: 08818-284322</p>
                    <p className="text-gray-600">Email: <a href="mailto:hod_civil@srivasaviengg.ac.in" className="text-primary hover:underline">hod_civil@srivasaviengg.ac.in</a></p>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Department of Civil Engineering was established in the year 2011 with a vision to strive towards quality education, research and consultancy. Civil Engineering is one of the oldest and broadest engineering disciplines which has been an aspect of life since the beginning of human civilization. Our department has grown significantly and continues to maintain its reputation for excellence in teaching and research.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The department is equipped with state-of-the-art laboratories including Strength of Materials Lab, CAD & GIS Lab, Concrete Technology Lab, Engineering Geology Lab, Surveying Lab, and others. Our faculty members are highly qualified and experienced, actively engaged in research and consultancy activities.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We focus on providing a strong foundation in civil engineering principles while keeping our students updated with modern technological advancements. Our students regularly participate in industrial visits, workshops, and internships to gain practical exposure. The department has also established valuable industry connections through consultancy services and collaborative projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Department Overview Section */}
            <div className="border-t pt-10 mt-10">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Department of Civil Engineering was established in 2011 with an intake of 60 students. The department offers undergraduate program in Civil Engineering with an intake of 60 students.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The department has state-of-the-art infrastructure and computing equipment supported by advanced laboratory facilities.
              </p>

              <h4 className="text-xl font-bold text-[#B22222] mb-4">Courses Offered</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 mb-4">
                  <thead className="text-xs bg-gray-50 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">S.No</th>
                      <th scope="col" className="px-6 py-3">Name of the Course</th>
                      <th scope="col" className="px-6 py-3">Eligibility Criteria</th>
                      <th scope="col" className="px-6 py-3">Duration</th>
                      <th scope="col" className="px-6 py-3">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">B.Tech-Civil Engineering</td>
                      <td className="px-6 py-4">AP EAPCET</td>
                      <td className="px-6 py-4">4 Years</td>
                      <td className="px-6 py-4">60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To evolve into a center of excellence in Civil Engineering education and research, producing professionally competent and socially responsible engineers.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To impart quality education through effective teaching-learning processes.</li>
              <li>To provide excellent infrastructure and environment conducive for research.</li>
              <li>To enhance industry-institute interaction to make students industry-ready.</li>
              <li>To develop entrepreneurship skills and ethical values among students.</li>
              <li>To engage in consultancy services for the benefit of society.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and civil engineering principles.</li>
              <li>Analyze real-life problems and design socially responsible and environmentally sustainable civil engineering solutions.</li>
              <li>Adapt to evolving technologies through continuous learning.</li>
              <li>Lead a successful career as a team member or as a team leader with strong professional ethics and communication skills.</li>
            </ul>
          </div>
        );
      case 'POs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Engineering Knowledge:</strong> Apply knowledge of mathematics, science, engineering fundamentals, and civil engineering principles to solve complex engineering problems.</li>
              <li><strong>Problem Analysis:</strong> Identify, formulate, research literature, and analyze complex engineering problems to arrive at substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences.</li>
              <li><strong>Design/Development of Solutions:</strong> Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.</li>
              <li><strong>Modern Tool Usage:</strong> Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools for complex engineering activities with an understanding of the limitations.</li>
            </ul>
          </div>
        );
      case 'PSOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Apply standard practices and strategies in construction management using modern surveying tools to deliver quality infrastructure.</li>
              <li>Apply the fundamentals of civil engineering to solve engineering problems in interdisciplinary domains.</li>
              <li>Develop sustainable solutions for real-world problems in structural engineering, geotechnical engineering, transportation engineering, and water resources engineering.</li>
            </ul>
          </div>
        );
      case 'COs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 leading-relaxed">
              The course outcomes are defined for each course and are aligned with the Program Outcomes and Program Specific Outcomes. The course outcomes are assessed through direct and indirect assessment tools.
            </p>
            <p className="mt-4 text-gray-700">
              <a href="https://srivasaviengg.ac.in/uploads/civil/COs.pdf" className="text-[#B22222] hover:underline">Download Course Outcomes Document</a>
            </p>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Experienced and dedicated faculty members with specializations in various domains</li>
              <li>State-of-the-art laboratories with modern equipment and tools</li>
              <li>Strong industry-institute interaction through consultancy services</li>
              <li>Research culture fostering innovation and intellectual growth</li>
              <li>Active student technical association (IEI Students Chapter)</li>
              <li>Regular workshops, field visits, and training programs</li>
              <li>Focus on practical learning through field visits and site experiences</li>
              <li>Consultancy services in material testing and structural design</li>
            </ul>
          </div>
        );
      case 'Department Library':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Library</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Image on the left */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/images/departments/ce/cse-lib.jpg"
                  alt="Department Library"
                  className="rounded-lg shadow-lg mb-4 max-h-96 object-contain"
                />
              </div>
              {/* Paragraph content on the right */}
              <div className="md:w-1/2">
                <p className="text-lg">
                  Department Library offers a variety of books related to Civil Engineering. Reference books of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are issued to students and staff. Students can access the Library facility according to their convenience any time round-the-clock.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white rounded-lg shadow border">
                    <div className="bg-[#850209] text-white rounded-t-lg py-2">
                      <h5 className="mb-0 text-center text-lg font-semibold">No. of Titles</h5>
                    </div>
                    <div className="py-4">
                      <p className="text-red-600 font-bold text-center text-xl">244</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow border">
                    <div className="bg-green-600 text-white rounded-t-lg py-2">
                      <h5 className="mb-0 text-center text-lg font-semibold">No. of Volumes</h5>
                    </div>
                    <div className="py-4">
                      <p className="text-green-600 font-bold text-center text-xl">352</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Faculty Incharge Details */}
            <div className="flex flex-col items-center mt-8">
              <h3 className="text-xl font-bold text-center">Faculty Incharge</h3>
              <p className="mt-4 text-lg">Mr. M.Prem Kumar Raju, Asst. Professor</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              The Department of Civil Engineering was established in 2011. The department offers undergraduate program in Civil Engineering with an intake of 60 students.
            </p>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Placements</h2>
            <div className="space-y-8">
              <details open>
                <summary className="font-semibold text-lg mb-2">Placements</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Placements for Batch 2019-2023 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/placements_2022-23.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Placements for Batch 2018-2022 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/placements_2021-22.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Placements for Batch 2017-2021 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/placements_2020-21.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Placements for Batch 2016-2020 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/placements_2019-20.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Placements for Batch 2015-2019 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/placements_2018-19.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
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
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Student Achievements</h2>
            <div className="space-y-8">
              <details open>
                <summary className="font-semibold text-lg mb-2">Internships</summary>
                <div className="ml-4">
                  <ol className="list-decimal ml-6 space-y-2">
                    <li>
                      Internships during the Academic Year 2022-23 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Internships%20during%20the%202022-2023.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2021-22 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Internships%20during%20the%202021-2022.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2020-21 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Internships%20during%20the%202020-2021.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2019-20 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Internships%20during%20the%202019-2020.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2018-19 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Internships%20during%20the%202018-2019.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2016-17 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Internships%20during%20the%202016-2017.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2015-16 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Internships%20during%20the%202015-2016.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Internships during the Academic Year 2014-15 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Internships%20during%20the%202014-2015.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ol>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Research Projects</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      B.Tech VIII Sem Project Details for the A.Y 2022-2023 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/B.Tech%20VIII%20Sem%20Project%20Details%202022-23%20(2019%20Batch.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                    <li>
                      B.Tech VIII Sem Project Details for the A.Y 2021-2022 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/B.Tech%20VIII%20Sem%20Project%20Details%202021-2022%20(2018-2022%20Batch).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                    <li>
                      B.Tech VIII Sem Project Details for the A.Y 2020-2021 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/B.Tech%20%20VIII%20Sem%20Project%20Details%20%202020-21(batch%202017-21).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                    <li>
                      B.Tech VIII Sem Project Details for the A.Y 2019-2020 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/B.Tech%20%20VIII%20Sem%20Project%20Details%20%202019-20(batch%202016-20)%20-%20Copy.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                    <li>
                      B.Tech VIII Sem Project Details for the A.Y 2018-2019 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/B.Tech%20%20VIII%20Sem%20Project%20Details%20%202018-19%20(Batch%202015-19).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Community Service Project</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      III Sem Community Service Project Guides Allocation for the A.Y 2022-23 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/III%20SEM%20Community%20Service%20Project%20Guide%20Allocation%202022-23.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      V Sem Community Service Project Guides Allocation for the A.Y 2022-23 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/V%20SEM%20Community%20Service%20Project%20Guide%20Allocation%202022-23.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Awards</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">NPTEL/Other Certifications</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Certifications during the A.Y 2019-20 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/NPTEL19CE41S613904189.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Certifications during the A.Y 2018-19 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Swayam%202018-19.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">HEI</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      HEI during the A. Y 2022-23 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/civil%2022-23%20heis%20students%20list,attendance,circulars.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      HEI during the A. Y 2021-22 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/civil%2021-22%20heis%20dtudents%20list,attendance,circulars.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      HEI during the A. Y 2020-21 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/civil%2020-21%20heis%20students%20list,attendance,circulars.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      HEI during the A. Y 2019-20 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/civil%2019-20%20heis%20students%20list,attendance,circulars.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      HEI during the A. Y 2018-19 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/civil%2018-19%20heis%20students%20list,%20attendance,%20circulars.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Roll Of Honour</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Roll of Honour List 2011-2019 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/ROLL%20OF%20HONOUR%20LIST%202011-2019.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Other Programmes</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      SPECTRA 2K24 Celebrations -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/SPECTRA%202K24%20celebraions_3&4April23_CE%20dept.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      CADathon on Building Planning and Drawing using AUTO CAD -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/CADAthon_EVENT_14March24_CE%20dept.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Fresher's day celebration during the A. Y 2023-24 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Fresher's%20day%20celebraions_18Oct23_CE%20dept.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Engineer's day celebration during the A. Y 2023-24 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Engineers%20day%20celebraions_15Sep23_CE%20dept.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Teachers day celebration during the A. Y 2022-23 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Teachers%20day%20celebraions_05Sep23_CE%20dept.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
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
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Faculty Achievements</h2>
            <div className="space-y-8">
              <details open>
                <summary className="font-semibold text-lg mb-2">Conferences</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm text-left border mb-4 table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2">SNo</th>
                        <th className="px-4 py-2">Name of the Faculty</th>
                        <th className="px-4 py-2">Title of the Paper</th>
                        <th className="px-4 py-2">Name of the Conference</th>
                        <th className="px-4 py-2">Venue</th>
                        <th className="px-4 py-2">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">Simplified model of existing intercity public transportation</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                      <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">L.Vyshnavi Sai</td><td className="px-4 py-2">Simplified model of existing intercity public transportation</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                      <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">Silty soil stabilization using bituminous emulsion</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                      <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">Stabilization of black cotton soil using jindal global road stabilizer</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                      <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">Integrated landuse transportation over view</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                      <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">A study of speed breakers and vehicle operating cost</td><td className="px-4 py-2">Recent research advances in civil engineering</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">8-NOV-2014</td></tr>
                      <tr><td className="px-4 py-2">7</td><td className="px-4 py-2">T.Yeswanth Sai</td><td className="px-4 py-2">Retempering of concrete structures</td><td className="px-4 py-2">ICBCCE(TROI)</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">6-DEC-2015</td></tr>
                      <tr><td className="px-4 py-2">8</td><td className="px-4 py-2">S.Sriram pradeep</td><td className="px-4 py-2">Mechanical properties of coconut shell concrete using quarry dust</td><td className="px-4 py-2">Internationsl Of Earth Sciences And Engineering</td><td className="px-4 py-2">Tamil Nadu</td><td className="px-4 py-2">24-MAR-2015</td></tr>
                      <tr><td className="px-4 py-2">9</td><td className="px-4 py-2">G.Radha krishnan</td><td className="px-4 py-2">Model Study on cyclic loading responses of lexible Pavement System laid on Expansive Subgrade</td><td className="px-4 py-2">IIT Madras</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">2016</td></tr>
                    </tbody>
                  </table>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">International Conferences</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm text-left border mb-4 table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2">SNo</th>
                        <th className="px-4 py-2">Name of the Faculty</th>
                        <th className="px-4 py-2">Title of the Paper</th>
                        <th className="px-4 py-2">Name of the Conference</th>
                        <th className="px-4 py-2">Venue</th>
                        <th className="px-4 py-2">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">M.Sambasivarao</td><td className="px-4 py-2">Retempering of concrete structures</td><td className="px-4 py-2">ICBCCE(TROI)</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">6-DEC-2015</td></tr>
                      <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">T.Yeswanthi</td><td className="px-4 py-2">Retempering of concrete structures</td><td className="px-4 py-2">ICBCCE(TROI)</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">6-DEC-2015</td></tr>
                      <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">A.Venkata Krishna</td><td className="px-4 py-2">An Experiment Analysis Of Using Melt Processed Plastic Pellet In Porous Concrete By Partially replacing Fine Aggregates</td><td className="px-4 py-2">ICBCCE</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">22-01-2017</td></tr>
                      <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">A.Venkata Krishna</td><td className="px-4 py-2">A Methodical Literature Review on Nano Applications in Civil Engineering</td><td className="px-4 py-2">ICNM</td><td className="px-4 py-2">Kerala</td><td className="px-4 py-2">10-02-1017</td></tr>
                      <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">Dr.V.V.V.Prabhakara Rao</td><td className="px-4 py-2">A Methodical Literature Review on Nano Applications in Civil Engineering</td><td className="px-4 py-2">ICNM</td><td className="px-4 py-2">Kerala</td><td className="px-4 py-2">10-02-1017</td></tr>
                      <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">M.Sambasiva Rao</td><td className="px-4 py-2">A Methodical Literature Review on Nano Applications in Civil Engineering</td><td className="px-4 py-2">ICNM</td><td className="px-4 py-2">Kerala</td><td className="px-4 py-2">10-02-1017</td></tr>
                      <tr><td className="px-4 py-2">7</td><td className="px-4 py-2">K.Chandrika</td><td className="px-4 py-2">An Experimental Analysis on usage potential of lateritic soils as part/Full Replacement for fine aggregates in Concrete</td><td className="px-4 py-2">ICBCCE</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">22-01-2017</td></tr>
                      <tr><td className="px-4 py-2">8</td><td className="px-4 py-2">T.Yeswanthi Sai</td><td className="px-4 py-2">An Experimental Analysis Of Using Melt Processed Plastic Pellets In Porous Concrete By Partially Replacing Fine Aggregates</td><td className="px-4 py-2">ICBCCE</td><td className="px-4 py-2">Hyderabad</td><td className="px-4 py-2">22-01-2017</td></tr>
                      <tr><td className="px-4 py-2">9</td><td className="px-4 py-2">G.V.L.N.Murthy</td><td className="px-4 py-2">An Experimental Analysis on usage potential of lateritic soils as part/Full Replacement for fine aggregates in Concrete</td><td className="px-4 py-2">IIT Madras</td><td className="px-4 py-2">Osmania University Hyderabad</td><td className="px-4 py-2">22-01-2017</td></tr>
                    </tbody>
                  </table>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">International Journals</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Patents</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Awards</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Memberships</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">NPTEL</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Faculty Outreach</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Funded Projects,FDP's</summary>
                <div className="text-gray-500 italic p-4">No data available.</div>
              </details>
            </div>
          </div>
        );
      case 'Department Library':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">LIBRARY</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Image on the left */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/images/departments/ce/cse-lib.jpg"
                  alt="Faculty Incharge"
                  className="rounded-lg shadow-lg mb-4 max-h-96 object-contain"
                  style={{ height: '100%' }}
                />
              </div>
              {/* Paragraph content on the right */}
              <div className="md:w-1/2">
                <p className="text-lg font-sans">
                  Department Library offers a variety of books related to Civil Engineering. Reference books of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are issued to students and staff. Students can access the Library facility according to their convenience any time round-the-clock.
                </p>
              </div>
            </div>
            {/* Table below the image and paragraph content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow border">
                <div className="bg-[#850209] text-white rounded-t-lg py-2">
                  <h5 className="mb-0 text-center text-lg font-semibold">No. of Titles</h5>
                </div>
                <div className="py-4">
                  <p className="text-red-600 font-bold text-center text-xl">244</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow border">
                <div className="bg-green-600 text-white rounded-t-lg py-2">
                  <h5 className="mb-0 text-center text-lg font-semibold">No. of Volumes</h5>
                </div>
                <div className="py-4">
                  <p className="text-green-600 font-bold text-center text-xl">352</p>
                </div>
              </div>
            </div>
            {/* Faculty Incharge Details */}
            <div className="flex flex-col items-center mt-8">
              <h3 className="text-xl font-bold text-center">Faculty Incharge</h3>
              <p className="mt-4 text-lg">Mr. M.Prem Kumar Raju, Asst. Professor</p>
            </div>
          </div>
        );
      case 'R&D':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">R&amp;D</h2>
            <p className="text-lg p-4">
              Science and Engineering Research Board, Department of Science &amp; Technology, Government of India, New Delhi Sponsored A Two Day National Workshop on "Nano Applications in Civil Engineering" on 12th &amp; 13th April, 2017
            </p>
          </div>
        );
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            {/* Desktop Navigation Tabs */}
            <div className="hidden md:block relative mb-8">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveDeptTab(section)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeDeptTab === section
                        ? 'bg-[#B22222] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {section === 'SalientFeatures' ? 'Salient Features' : section}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Section Display */}
            <div className="md:hidden relative mb-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Current Section: <span className="text-[#B22222]">{activeDeptTab === 'SalientFeatures' ? 'Salient Features' : activeDeptTab}</span>
                </h3>
                <p className="text-sm text-gray-600 mt-2">Use the floating settings button to navigate between sections</p>
              </div>
            </div>

            {/* Game-Style Right Side Settings Panel */}
            {settingsPanelOpen && (
              <div className="fixed inset-0 z-50">
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
                  onClick={() => setSettingsPanelOpen(false)}
                ></div>

                {/* Settings Panel */}
                <div className="fixed right-0 top-0 h-full w-full sm:w-80 md:w-96 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl transform transition-transform duration-500 ease-out">
                  {/* Panel Header */}
                  <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">Department Navigation</h3>
                          <p className="text-white/70 text-sm">Select a section to explore</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSettingsPanelOpen(false)}
                        className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Panel Content */}
                  <div className="p-6 h-full overflow-y-auto">
                    <div className="space-y-3">
                      {sections.map((section, index) => {
                        const isActive = section === activeDeptTab;
                        return (
                          <button
                            key={section}
                            onClick={() => {
                              setActiveDeptTab(section);
                              setSettingsPanelOpen(false);
                            }}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${isActive
                                ? 'bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white shadow-lg scale-105'
                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isActive ? 'bg-white/20' : 'bg-gray-600'
                                }`}>
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {section === 'SalientFeatures' ? 'Salient Features' : section}
                                </div>
                                <div className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                                  {section === 'Department' && 'Overview & HOD Profile'}
                                  {section === 'Vision' && 'Department Vision Statement'}
                                  {section === 'Mission' && 'Department Mission Statement'}
                                  {section === 'PEOs' && 'Program Educational Objectives'}
                                  {section === 'POs' && 'Program Outcomes'}
                                  {section === 'PSOs' && 'Program Specific Outcomes'}
                                  {section === 'COs' && 'Course Outcomes'}
                                  {section === 'SalientFeatures' && 'Key Highlights & Features'}
                                </div>
                              </div>
                              {isActive && (
                                <div className="ml-auto">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Panel Footer */}
                    <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                      <div className="text-center">
                        <div className="text-white/70 text-sm mb-2">Quick Navigation</div>
                        <div className="text-white/50 text-xs">
                          Click any section above to navigate instantly
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Settings Button - Mobile Only */}
            <button
              onClick={() => setSettingsPanelOpen(true)}
              className="md:hidden fixed right-3 bottom-6 z-40 w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
              title="Department Navigation"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              {/* Mobile Label */}
              <div className="absolute bottom-14 right-0 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Menu
                <div className="absolute top-full right-2 w-0 h-0 border-t-4 border-t-gray-900 border-l-2 border-r-2 border-l-transparent border-r-transparent"></div>
              </div>
            </button>

            {/* Content Area that changes completely based on selected tab */}
            {renderDeptTabContent()}
          </div>
        );
      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Members</h2>
            <div className="overflow-x-auto mb-10">
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
      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            <details open>
              <summary className="font-semibold text-lg mb-2">Board Of Studies</summary>
              <div className="mt-4">
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Minutes of 6th meeting of the Board of Studies, dated 20.07.2024 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/6TH BOS Meeting Minutes & Notes V23 Civil Engg, SVEC.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Minutes of 5th meeting of the Board of Studies, dated 20.08.2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/FIFTH%20BOS%20NOTES.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Minutes of 4th meeting of the Board of Studies, dated 30.08.2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/FOURTH%20BOS%20NOTES.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Minutes of 3rd meeting of the Board of Studies, dated 30.06.2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/THIRD%20BOS%20NOTES.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Minutes of 2nd meeting of the Board of Studies, dated 20.04.2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/SECONED%20BOS%20NOTES.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Minutes of 1st meeting of the Board of Studies, dated 06.06.2018 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/FIRST%20BOS%20NOTES.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        );
      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>
            <div className="space-y-6">
              <details open>
                <summary className="font-semibold text-lg mb-2">Class Time Tables</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Civil_Master Timetable_A.Y for Sem-VIII 2022-23 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20VIII%20SEM(V18)%20TIMETABLE%20%20W.E.F%20-%2026.12.2022.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Civil_Master Timetable_A.Y for Sem-VI 2022-23 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20VI%20SEM(V20)%20TIMETABLE%20%20W.E.F%20-%2027.02.2023.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                  <li>
                    Civil_Master Timetable_A.Y for Sem-II 2021-22 -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20IV%20SEM(V20)%20TIMETABLE%20%20W.E.F%2027.02.2023.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Class Rooms</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Class Rooms with ICT Enabled Facilities -{' '}
                    <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/CE_Classrooms.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Laboratories</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Strength of Materials Lab</li>
                  <li>CAD & GSI Lab</li>
                  <li>Concrete Technology Lab</li>
                  <li>Engineering Geology Lab</li>
                  <li>Surveying Lab</li>
                  <li>Fluid Mechanics and Hydraulic Machinery Lab</li>
                  <li>Water and Waste Water Engineering Lab</li>
                  <li>Advanced Structural Engineering Lab</li>
                  <li>Geotechnical Engineering Lab</li>
                  <li>Transportation Engineering Lab</li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <img src="/images/departments/ce/civil_adslab.jpg" alt="Strength of Materials Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Strength of Materials Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_cadlab.jpg" alt="CAD & GIS Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">CAD & GIS Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_ctlab.jpg" alt="Concrete Technology Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Concrete Technology Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_gtlab.jpg" alt="Engineering Geology Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Engineering Geology Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_sllab.jpg" alt="Surveying Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Surveying Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_fmlab.jpg" alt="Fluid Mechanics & Hydraulic Machinery Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Fluid Mechanics & Hydraulic Machinery Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_waterlab.jpg" alt="Waste Water Engineering Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Waste Water Engineering Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_adslab.jpg" alt="Advanced Structural Engineering Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Advanced Structural Engineering Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_geolab.jpg" alt="Geotechnical Engineering Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Geotechnical Engineering Lab</h4>
                  </div>
                  <div>
                    <img src="/images/departments/ce/civil_telab.jpg" alt="Transportation Engineering Lab" className="w-full rounded-lg shadow" />
                    <h4 className="text-center my-3 text-success">Transportation Engineering Lab</h4>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Workshops':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Workshops / Guest Lectures / Field Visits</h2>
            <div className="space-y-6">
              <details open>
                <summary className="font-semibold text-lg mb-2">Workshops</summary>
                <div className="ml-4">
                  <ol className="list-decimal ml-6 space-y-2">
                    <li>
                      Workshops organized during the Academic Year 2023-2024 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202023-24.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2022-2023 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202022-2023.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2021-2022 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202021-2022.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2019-2020 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202019-2020.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2018-2019 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202018-2019.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2017-2018 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202017-2018.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2016-2017 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202016-2017.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2015-2016 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202015-2016.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Workshops organized during the Academic Year 2014-2015 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202014-2015.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ol>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Guest Lectures</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Guest Lecture organized during the Academic Year 2023-2024 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Guest%20Lecture%20organized%20during%20the%20Academic%20year%202023-2024.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Guest Lecture organized during the Academic Year 2020-2021 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Guest%20Lecture%20organized%20during%20the%20Academic%20Year%202020-2021.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Guest Lecture organized during the Academic Year 2019-2020 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Guest%20Lecture%20organized%20during%20the%20Academic%20Year%202019-2020.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Guest Lecture organized during the Academic Year 2018-2019 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Guest%20Lecture%20organized%20during%20the%20Academic%20Year%202018-2019.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Guest Lecture organized during the Academic Year 2017-2018 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Guest%20Lecture%20organized%20during%20the%20Academic%20Year%202017-2018.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Guest Lecture organized during the Academic Year 2016-2017 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Guest%20Lecture%20organized%20during%20the%20Academic%20Year%202016-2017.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Guest Lecture organized during the Academic Year 2015-2016 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Guest%20Lecture%20organized%20during%20the%20Academic%20Year%202015-2016.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Guest Lecture organized during the Academic Year 2014-2015 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Guest%20Lecture%20organized%20during%20the%20Academic%20Year%202014-2015.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Field Visits</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      Field Visits during the A. Y 2023-24 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Field%20visits%20during%20the%20Academic%20Year%202023-2024.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Field Visits during the A. Y 2022-23 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Field%20visits%202019-2020.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Field Visits during the A. Y 2019-20 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Field%20visits%202022-2023.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Field Visits during the A. Y 2018-19 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Field%20visits%202018-2019.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Field Visits during the A. Y 2017-18 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Field%20visits%202017-2018.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Field Visits during the A. Y 2016-17 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Field%20visits%202016-2017.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Field Visits during the A. Y 2015-16 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Field%20visits%202015-2016.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                    <li>
                      Field Visits during the A. Y 2014-15 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Field%20visits%202014-2015.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">SOC</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      SOC conducted during the A. Y 2023-24 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/civil/Skill%20Oriented%20Course.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Technical Association</h2>
            <div className="space-y-8">
              <p className="text-lg mb-4">
                In this institution, INSTITUTION OF ENGINEERING (INDIA) students' chapter was opened in Civil Engineering Department in the year 2017 with 117 student members. It is promoting co-operation amongst students and faculty for advancement and dissemination of knowledge in the field of Civil Engineering. The IE students' chapter committee constitutes the following members:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border mb-4 table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 w-1/3">Designation</th>
                      <th className="px-4 py-2">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">Members</td>
                      <td className="px-4 py-2">
                        1. K.J.Ganapathi<br />
                        2. N.G.Lokesh<br />
                        3. T.Teja<br />
                        4. Y.Harika
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
                <img
                  src="/images/departments/ce/civil_ie_img2.jpg"
                  alt="IEI Event 1"
                  className="rounded-lg shadow-lg mb-4 max-w-xs object-contain"
                  style={{ height: '100%' }}
                />
                <img
                  src="/images/departments/ce/civil_ie_img3.jpg"
                  alt="IEI Event 2"
                  className="rounded-lg shadow-lg mb-4 max-w-xs object-contain"
                  style={{ height: '100%' }}
                />
              </div>
            </div>
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Newsletters</h2>
            <div className="space-y-6">
              <details open>
                <summary className="font-semibold text-lg mb-2">Newsletter Issue December 2022</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Newsletter Issue December 2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/DECEMBER%202022.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Newsletter Issue June 2022</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Newsletter Issue June 2022 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/JUNE%202022.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Newsletter Issue December 2021</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Newsletter Issue December 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/DECEMBER%202021.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Newsletter Issue June 2021</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Newsletter Issue June 2021 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/JUNE%202021.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Newsletter Issue December 2020</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Newsletter Issue December 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/DECEMBER%202020.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Newsletter Issue June 2020</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Newsletter Issue June 2020 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/JUNE%202020.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Newsletter Issue December 2019</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Newsletter Issue December 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/DECEMBER%202019.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">Newsletter Issue June 2019</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Newsletter Issue June 2019 -{' '}
                    <a href="https://srivasaviengg.ac.in/uploads/civil/JUNE%202019.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
            </div>
            <h2 className="text-3xl font-bold text-[#850209] mt-12 mb-6 text-center">Technical Magazines</h2>
            <div className="space-y-6">
              <details open>
                <summary className="font-semibold text-lg mb-2">Technical Magazine</summary>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Technical Magazine -{' '}
                    <a href="#" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Extra-Curricular Activities</h2>
            <div className="space-y-6">
              <ul className="list-disc ml-6 space-y-4 text-center">
                <li>
                  Extracurricular activities during the Year 2018-19 -{' '}
                  <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/Extra_curricular_activities.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                </li>
                <li>
                  Extracurricular activities during the Year 2017-18 -{' '}
                  <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/ENGINEERS%20DAY(2017-2018).pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View More</a>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'Consultancy':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Consultancy</h2>
            <div className="space-y-6">
              <ul className="list-disc ml-6 space-y-4">
                <li>
                  Consultancy Details for the Academic year 2022-2023 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202022-2023.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2021-2022 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202021-2022.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2020-2021 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202020-2021.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2019-2020 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202019-2020.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2018-2019 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202018-2019.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2017-2018 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202017-2018.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2016-2017 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202016-2017.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2015-2016 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202015-2016.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2014-2015 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202014-2015.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
                <li>
                  Consultancy Details for the Academic year 2013-2014 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202013-2014.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Syllabus</h2>
            <div className="space-y-8">
              <details open>
                <summary className="font-semibold text-lg mb-2">B.Tech</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      B.Tech - V20 Syllabus -{' '}
                      <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V20%20B.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                    <li>
                      B.Tech - V18 Syllabus -{' '}
                      <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V18%20B.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
              <details>
                <summary className="font-semibold text-lg mb-2">M.TECH(CS)</summary>
                <div className="ml-4">
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      M.Tech - V21 Syllabus -{' '}
                      <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V21%20M.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                    <li>
                      M.Tech - V18 Syllabus -{' '}
                      <a href="https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V18%20M.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">View</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  };


  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Civil Engineering</h1>
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
        title="Civil Department"
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

export default CivilDepartment;
