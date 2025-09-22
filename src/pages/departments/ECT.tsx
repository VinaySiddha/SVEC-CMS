
import React, { useState } from 'react';
import { Radio, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon, Settings } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const ECTDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Clubs', label: 'Clubs', icon: <Activity className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops/SOC/Guest Lecturers', label: 'Workshops/SOC/Guest Lecturers', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Merit Scholarship/Academic Toppers', label: 'Merit Scholarship/Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Settings className="w-4 h-4" /> },
    { id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <FileText className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Faculty Innovations in Teaching & Learning', label: 'Faculty Innovations in Teaching & Learning', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

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

  // Function to render tab content for Department Profile
  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                The Department of Electronics & Communication Technology (ECT) was established in the year 2012. The department offers B.Tech program in Electronics & Communication Technology with an intake of 60 students.
              </p>
              <p className="mb-4">
                The department has well-qualified and experienced faculty with diverse specializations in Communication Systems, Signal Processing, Embedded Systems, VLSI Design, and IoT applications. The department boasts state-of-the-art laboratories equipped with advanced software and hardware tools to provide hands-on experience to students.
              </p>
              <p className="mb-4">
                The ECT department regularly conducts workshops, seminars, and guest lectures by industry experts to keep students updated with the latest technological trends. Faculty members are actively engaged in research and have published papers in reputed national and international journals.
              </p>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#B22222] shadow-md">
              <p className="text-gray-700 italic">
                "To emerge as a center of excellence in Electronics & Communication Technology education producing competent professionals with research orientation and ethical values to serve the needs of industry and society."
              </p>
            </div>
          </div>
        );
      case 'Mission':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  M1: To impart quality education in Electronics & Communication Technology through innovative teaching-learning methodologies.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  M2: To provide state-of-the-art infrastructure for practical exposure in emerging technologies.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  M3: To foster industry-academia collaboration for knowledge exchange and career advancement.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  M4: To promote research culture, ethical values, and lifelong learning among students and faculty.
                </p>
              </div>
            </div>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 1:</h4>
                <p className="text-gray-700">
                  Graduates will have strong foundation in Electronics & Communication Technology to pursue higher education, research or technical employment.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 2:</h4>
                <p className="text-gray-700">
                  Graduates will be equipped with practical skills and knowledge to design, develop and implement innovative solutions to real-world problems.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 3:</h4>
                <p className="text-gray-700">
                  Graduates will possess professional ethics, communication skills, teamwork and leadership qualities required for successful career.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 4:</h4>
                <p className="text-gray-700">
                  Graduates will engage in lifelong learning to adapt to rapidly evolving technological landscape.
                </p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 1: Engineering Knowledge</h4>
                <p className="text-gray-700">Apply knowledge of mathematics, science, and engineering fundamentals to solve complex engineering problems.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, research literature and analyze complex engineering problems to arrive at substantiated conclusions.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 3: Design/Development of Solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and design system components or processes that meet specified needs.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 4: Investigation</h4>
                <p className="text-gray-700">Use research-based knowledge and methods to design experiments, analyze and interpret data.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 5: Modern Tool Usage</h4>
                <p className="text-gray-700">Apply appropriate techniques and modern engineering tools necessary for engineering practice.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 6: The Engineer and Society</h4>
                <p className="text-gray-700">Apply reasoning to assess societal, health, safety, legal and cultural issues and the consequent responsibilities.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 7: Environment and Sustainability</h4>
                <p className="text-gray-700">Understand the impact of engineering solutions in a societal context and demonstrate knowledge of sustainable development.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 8: Ethics</h4>
                <p className="text-gray-700">Apply ethical principles and commit to professional ethics and responsibilities.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 9: Individual and Team Work</h4>
                <p className="text-gray-700">Function effectively as an individual, and as a member or leader in diverse teams.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 10: Communication</h4>
                <p className="text-gray-700">Communicate effectively on complex engineering activities with the engineering community and society.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 11: Project Management</h4>
                <p className="text-gray-700">Demonstrate knowledge and understanding of management principles and apply these to one's own work.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 12: Life-long Learning</h4>
                <p className="text-gray-700">Recognize the need for, and have the preparation and ability to engage in independent and life-long learning.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PSO 1:</h4>
                <p className="text-gray-700">
                  Apply knowledge of analog and digital electronics, signal processing, communication systems, and embedded systems to solve real-world engineering problems.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PSO 2:</h4>
                <p className="text-gray-700">
                  Design and implement electronic circuits, communication systems, and IoT solutions using industry-standard tools and technologies.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PSO 3:</h4>
                <p className="text-gray-700">
                  Develop skills in emerging areas such as wireless communications, VLSI design, and embedded systems to meet industry requirements.
                </p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              Each course in the ECT curriculum has specific Course Outcomes that align with the Program Outcomes and Program Specific Outcomes. These Course Outcomes are measurable and ensure that students acquire the intended knowledge and skills from each course.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">
                For detailed Course Outcomes of each subject, please refer to the course syllabi available in the Syllabus section.
              </p>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Experienced and dedicated faculty members with specializations in various domains</li>
              <li>State-of-the-art laboratories with modern equipment and software tools</li>
              <li>Regular workshops, seminars, and guest lectures by industry experts</li>
              <li>Strong industry-institute interaction through internships and projects</li>
              <li>Focus on research and innovation in emerging technologies</li>
              <li>Active student chapter for technical activities and competitions</li>
              <li>Excellent placement record in reputed companies</li>
              <li>Professional skills development through value-added courses</li>
              <li>Well-equipped department library with reference materials</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="py-6">
            <p className="text-center text-gray-500">Select a tab to view content</p>
          </div>
        );
    }
  };

  // Move the switch statement into a function
  function renderContent() {
    switch (activeContent) {

      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Achievements</h2>
            {/* Journal Publications */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Journal Publications</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Faculty Publication Details 2022-2023 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-Journals-2022-2023.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2021-2022 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_Journals%20%20%202021-22.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2020-2021 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Journals%20%202020-21.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2019-2020 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Journals%20%202019-20.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2018-2019 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2018-2019.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2017-2018 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2017-2018.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2016-2017 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2016-2017.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2015-2016 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2015-2016.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2014-2015 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2014-2015.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication Details 2013-2014 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2013-2014.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publication in National / International Journals - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Faculty%20Publications%20in%20National_%20International%20Journals.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Publications in International Conferences */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Publications in International Conferences</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Faculty Conferences Details 2022-2023 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-%20Conferences%20-2022-2023.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2021-2022 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-%20Conferences%202021-2022.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2020-2021 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece_conference%20index%202020-21.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2019-2020 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece_conference%20index%202019-20.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2018-2019 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE_2018.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2017-2018 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE_2017.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2016-2017 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_internationalconference_latest.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Conferences Details 2013-2016 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>Faculty Publications in National/International Conferences - <a target="_blank" href="#" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Book Publications */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Book Publications</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Name of the Faculty</th>
                        <th className="py-2 px-4 border-b">Title of the Book</th>
                        <th className="py-2 px-4 border-b">Publisher</th>
                        <th className="py-2 px-4 border-b">Year Of Publication</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">1</td>
                        <td className="py-2 px-4 border-b">Purnima K Sharma , E. Kusuma Kumari</td>
                        <td className="py-2 px-4 border-b">Dual Strip Flag Microstrip Patch Antenna For Millimeter Wave Applications.</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI:</td>
                        <td className="py-2 px-4 border-b">2022</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">2</td>
                        <td className="py-2 px-4 border-b">T V N L Aswini</td>
                        <td className="py-2 px-4 border-b">Narrow Band Spectrum Sensing of Cognitive Radio for Wireless Services.</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI: 10.1007/978-981-15-9647-6_80</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">3</td>
                        <td className="py-2 px-4 border-b">S. Murugan,E. Kusuma Kumari</td>
                        <td className="py-2 px-4 border-b">Microstrip line feed Rectangular Split Ring Resonator Antenna for Millimeter Wave Applications</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI: 10.1007/978-981-16-3246-4_37</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">4</td>
                        <td className="py-2 px-4 border-b">E. Kusuma Kumari, M. Vinod Kumar, Purnima K. Sharma, S. Murugan</td>
                        <td className="py-2 px-4 border-b">Double-Sided Split Ring Resonator-Based Probe Feed Patch Antenna with Enhanced Bandwidth for 5G and Ku Band Applications</td>
                        <td className="py-2 px-4 border-b">SPRINGER Print ISBN: 978-981-16-1088-2 Electronic ISBN: 978-981-16-1089-9</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">5</td>
                        <td className="py-2 px-4 border-b">E. Kusuma Kumari, Purnima K. Sharma, S. Murugan, and D. Rama Devi</td>
                        <td className="py-2 px-4 border-b">Compact Multiband CPW Feed Microstrip Fractal Antenna for X, Ku Band satellite Applications</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI: 10.1007/978-981-16-3246-4_74</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">6</td>
                        <td className="py-2 px-4 border-b">Dr. E. Kusuma Kumari, Dr. Purnima K. Sharma, Dr. S. Murugan, Mr. M. Vinod Kumar</td>
                        <td className="py-2 px-4 border-b">Book Chapter : Double sided Split Ring Resonator based Probe feed patch Antenna for 5G and Ku band Applications</td>
                        <td className="py-2 px-4 border-b">SPRINGER DOI 978-981-16-1089-9_37, ©2021</td>
                        <td className="py-2 px-4 border-b">2021</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">7</td>
                        <td className="py-2 px-4 border-b">Dr. Purnima K. Sharma (Co-Author)</td>
                        <td className="py-2 px-4 border-b">"Signal Loss Calculation at 900 MHz & 2.4 GHz in WBAN"</td>
                        <td className="py-2 px-4 border-b">LAMBERT Academic Publishing</td>
                        <td className="py-2 px-4 border-b">2018</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">8</td>
                        <td className="py-2 px-4 border-b">Dr. Purnima K. Sharma (Co-Author)</td>
                        <td className="py-2 px-4 border-b">"Development of Field Propagation Model for Urban Area"</td>
                        <td className="py-2 px-4 border-b">Anchor Academic Publication, Hamburg Germany in 2017, ISBN-13: 978-3-96067-626-3.</td>
                        <td className="py-2 px-4 border-b">2017</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">9</td>
                        <td className="py-2 px-4 border-b">Dr. Dinesh Sharma</td>
                        <td className="py-2 px-4 border-b">"Development of Field Propagation Model for Urban Area"</td>
                        <td className="py-2 px-4 border-b">Anchor Academic Publication, Hamburg Germany in 2017, ISBN-13: 978-3-96067-626-3.</td>
                        <td className="py-2 px-4 border-b">2017</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">10</td>
                        <td className="py-2 px-4 border-b">Dinesh Sharma, Purnima K Sharma & R.K.Singh</td>
                        <td className="py-2 px-4 border-b">"QoS in Fixed Wireless Access Networks"</td>
                        <td className="py-2 px-4 border-b">LA ISBN-10: 365995490X, ISBN-13: 978-3659954900.P, Germany</td>
                        <td className="py-2 px-4 border-b">2016</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
            {/* Certifications */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Certifications</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>NPTEL Certified Faculty List 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/Faculty%20Certification%20courses%20in%20%202022-2023.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_21-22.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List 2020-21 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_20-21.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_19-20.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List Jan-Apr-2020 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_NPTEL_19-20.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List Jul-Oct-2019 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jul-Oct-2019.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List Jan-Apr-2019 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jan-Apr-2019.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                  <li>NPTEL Certified Faculty List Jun-Oct-2018 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jun-Oct-2018.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Patents */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Patents</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Patents Published by Faculty - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/List%20of%20Patents%20published%20by%20Faculty.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Awards */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Awards</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Dr.Purnima K Sharma, has received the "State Best Teacher Award" on 5th September 2023 from APSCHE, Govt.of Andhra Pradesh.</li>
                  <li>Dr.E. Kusuma Kumari, Dr. Purnima K Sharma, Dr. S Murugan received the best session award for 3rd International conference on communication and computational technologies ICCCT-2021 during 27th and 28th February,2021 organized by Rajasthan Technical University.</li>
                  <li>Smt. KNVS Vijaya Lakshmi received best paper award from International conference on Wireless Data Networks 2021 during 26th & 27th February ,2021 entitled " RT – Gate: Concept of Micro level Polarization in QCA</li>
                  <li>Dr. E. Kusuma Kumari has received Best Academician Award in Feb 1, 2019 by CSERD.</li>
                  <li>Dr. M. Thamarai, Professor of ECE Department has received Senior Researcher award by GECL</li>
                  <li>Dr. Purnima K. Sharma, Assoc. Prof of ECE Department has received Young Researcher by GECL</li>
                  <li>Dr Purnima K. Sharma, Assoc. Prof of ECE Department has received Young women award in March 03, 2018 by Venus International Foundation.</li>
                  <li>Dr. M. Thamarai, Professor of ECE Department "Best Academician award" received from Combined Society for Educational Research and Development, Dehradun, Dated on 10.03.2018.</li>
                  <li>Dr. E. Kusuma Kumari has received Best paper award for presenting the paper on " Wideband High Gain Circularly polarized planar Antenna array for L Band Radar" , 2017 IEEE International Conference on Computational Intelligence and Computing Research, Tamilnadu college of engineering, Coimbatore.</li>
                  <li>Dr. E. Kusuma Kumari has received Best teacher award for 2011-2012 academic Year in Gayatri Institute of Engineering And Technology.</li>
                  <li>Dr. E. Kusuma Kumari has received Best teacher award for 2001-2002 academic Year in Sri YVS & BRM Polytechnic college.</li>
                </ul>
              </details>
            </div>
            {/* Memberships */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Memberships</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Name of the Faculty</th>
                        <th className="py-2 px-4 border-b">Number Of Faculty Posses the membership</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">1</td>
                        <td className="py-2 px-4 border-b">IEEE <br />Institute of Electrical & Electronics Engineers</td>
                        <td className="py-2 px-4 border-b">3</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">2</td>
                        <td className="py-2 px-4 border-b">ISTE <br />Indian Society For Technical Education</td>
                        <td className="py-2 px-4 border-b">20</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">3</td>
                        <td className="py-2 px-4 border-b">IETE <br />Institution of Electronics and Telecommunication Engineers</td>
                        <td className="py-2 px-4 border-b">7</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">4</td>
                        <td className="py-2 px-4 border-b">ISRD <br />International Society for Research and Development.</td>
                        <td className="py-2 px-4 border-b">4</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">5</td>
                        <td className="py-2 px-4 border-b">IAENG <br />International Association of Engineers</td>
                        <td className="py-2 px-4 border-b">5</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">6</td>
                        <td className="py-2 px-4 border-b">IRED <br />Institute of Research Engineers and Doctors</td>
                        <td className="py-2 px-4 border-b">4</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">7</td>
                        <td className="py-2 px-4 border-b">ISC <br />Indian Science Congress</td>
                        <td className="py-2 px-4 border-b">1</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">8</td>
                        <td className="py-2 px-4 border-b">SEMIC <br />Semantic Interoperability Community</td>
                        <td className="py-2 px-4 border-b">1</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">9</td>
                        <td className="py-2 px-4 border-b">GRDS <br />Global Research & Development Services</td>
                        <td className="py-2 px-4 border-b">2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
            {/* Faculty Out-Reach */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Faculty Out-Reach</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Faculty Out Reach - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Faculty%20Out%20Reach.pdf" className="text-blue-600 hover:underline">For more Details</a></li>
                </ul>
              </details>
            </div>
            {/* Faculty Promotions/Incentives */}
            <div className="mb-6">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Faculty Promotions/Incentives</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Academic Year</th>
                        <th className="py-2 px-4 border-b">Number Of Faculty</th>
                        <th className="py-2 px-4 border-b">Promotion</th>
                        <th className="py-2 px-4 border-b">Received Incentives for SCI/SCOPUS Paper, Book Chapter, Publications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border-b">1</td>
                        <td className="py-2 px-4 border-b">2022-2023</td>
                        <td className="py-2 px-4 border-b">Dr. T.V.N.L. Aswini</td>
                        <td className="py-2 px-4 border-b">Associate Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">2</td>
                        <td className="py-2 px-4 border-b">2022-2023</td>
                        <td className="py-2 px-4 border-b">Sri P. Gopala Reddy</td>
                        <td className="py-2 px-4 border-b">Sr.Assistant Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">3</td>
                        <td className="py-2 px-4 border-b">2022-2023</td>
                        <td className="py-2 px-4 border-b">Sri B.Murali Krishna</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.15,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">4</td>
                        <td className="py-2 px-4 border-b">2022-2023</td>
                        <td className="py-2 px-4 border-b">Dr.M. Thamarai</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.15,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">5</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.M.Satish Kumar</td>
                        <td className="py-2 px-4 border-b">Associate Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">6</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Sri G. V. Subrahmanyam</td>
                        <td className="py-2 px-4 border-b">Deputy Controller of Exams (DCE)</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">7</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.E.Kusuma Kumari</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.5,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">8</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.P.Ashok Kumar</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.7,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">9</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">DrPurnima K Sharma</td>
                        <td className="py-2 px-4 border-b">Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">10</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.P.Ashok Kumar</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.7,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">11</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.S.V.V Satyanarayana</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.4,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">12</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.T.V.N.L. Aswini</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.5,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">13</td>
                        <td className="py-2 px-4 border-b">2021-2022</td>
                        <td className="py-2 px-4 border-b">Dr.TDNSS Sarveswara Rao</td>
                        <td className="py-2 px-4 border-b">Associate Professor</td>
                        <td className="py-2 px-4 border-b">Rs.5,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">14</td>
                        <td className="py-2 px-4 border-b">2020-21</td>
                        <td className="py-2 px-4 border-b">Dr.M.Koteswara Rao</td>
                        <td className="py-2 px-4 border-b">Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">15</td>
                        <td className="py-2 px-4 border-b">2020-21</td>
                        <td className="py-2 px-4 border-b">Dr.S.V.V.Satyanarayana</td>
                        <td className="py-2 px-4 border-b">-</td>
                        <td className="py-2 px-4 border-b">Rs.7,000/-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">16</td>
                        <td className="py-2 px-4 border-b">2018-19</td>
                        <td className="py-2 px-4 border-b">Dr.S.V.V.Satyanarayana</td>
                        <td className="py-2 px-4 border-b">Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">17</td>
                        <td className="py-2 px-4 border-b">2018-19</td>
                        <td className="py-2 px-4 border-b">Sri M.Sathish Kumar</td>
                        <td className="py-2 px-4 border-b">Sr. Assistant Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">18</td>
                        <td className="py-2 px-4 border-b">2018-19</td>
                        <td className="py-2 px-4 border-b">Sri T.Sreenivasu</td>
                        <td className="py-2 px-4 border-b">Sr. Assistant Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border-b">19</td>
                        <td className="py-2 px-4 border-b">2018-19</td>
                        <td className="py-2 px-4 border-b">Sri D.R.Sandeep</td>
                        <td className="py-2 px-4 border-b">Sr. Assistant Professor</td>
                        <td className="py-2 px-4 border-b">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
            {/* Gallery */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 10, 14, 12, 13, 15, 16, 20].map((num) => (
                  <img key={num} src={`https://srivasaviengg.ac.in/uploads/facul_achievements/${num}.jpg`} alt={`Image ${num}`} className="rounded-lg shadow-md w-full h-auto object-cover" />
                ))}
              </div>
            </div>
          </div>
        );


      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Placements</h2>
            <div className="space-y-4">
              {[{
                year: '2022-23',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECT_Placements_2022-23.pdf'
              }, {
                year: '2021-22',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2021-22.pdf'
              }, {
                year: '2020-21',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2020-21.pdf'
              }, {
                year: '2019-20',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2019-20.pdf'
              }, {
                year: '2018-19',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2018-19.pdf'
              }, {
                year: '2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2017-18.pdf'
              }, {
                year: '2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2016-17.pdf'
              }, {
                year: '2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2015-16.pdf'
              }, {
                year: '2014-15',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2014-15.pdf'
              }].map((placement, idx) => (
                <details key={placement.year} className="border rounded-lg">
                  <summary className="text-lg font-semibold cursor-pointer px-4 py-2">Placements during the Academic Year {placement.year}</summary>
                  <div className="text-center p-3">
                    Placements during the Academic Year {placement.year} -{' '}
                    <a
                      href={placement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] text-lg font-semibold hover:underline"
                    >
                      View
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Merit Scholarships and Academic Toppers</h2>
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Merit Scholarships Year Wise</summary>
                <p className="py-2">The college management is very much interested to encourage the students by giving merit scholarships and incentives to the best EAMCET Rankers and semester wise class topper. With this every year some students are receiving the scholarships and get benefitted and motivated. The details are listed below:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Merit Scholarships-2019 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2019.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2018 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20181.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>M.Tech Merit Scholarships-2017 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/M.Tech%20Merit%20Scholarships-20171.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2017 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20171.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2016 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20161.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2015 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20151.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2014 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2014.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Merit Scholarships-2013 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2013.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                </ul>
              </details>
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Cash Award's and Scholarship's given by College Management</summary>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Academic Year</th>
                        <th className="py-2 px-4 border-b">Based on</th>
                        <th className="py-2 px-4 border-b">No. of Students Benefited</th>
                        <th className="py-2 px-4 border-b">Scholarship Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="py-2 px-4 border-b">1</td><td className="py-2 px-4 border-b">2022-23</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">121</td><td className="py-2 px-4 border-b">1,32,000</td></tr>
                      <tr><td className="py-2 px-4 border-b">2</td><td className="py-2 px-4 border-b">2021-22</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">18</td><td className="py-2 px-4 border-b">13,000</td></tr>
                      <tr><td className="py-2 px-4 border-b">3</td><td className="py-2 px-4 border-b">2020-21</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">36</td><td className="py-2 px-4 border-b">32,500</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>4</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2019-20</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">52</td><td className="py-2 px-4 border-b">48,500</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">49</td><td className="py-2 px-4 border-b">7,95,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>5</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2018-19</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">34</td><td className="py-2 px-4 border-b">68,000</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">63</td><td className="py-2 px-4 border-b">7,15,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>6</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2017-18</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">50</td><td className="py-2 px-4 border-b">36,500</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">63</td><td className="py-2 px-4 border-b">9,25,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>7</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2016-17</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">65</td><td className="py-2 px-4 border-b">48,750</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">8</td><td className="py-2 px-4 border-b">1,45,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>8</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2015-16</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">62</td><td className="py-2 px-4 border-b">46,000</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">36</td><td className="py-2 px-4 border-b">5,30,000</td></tr>
                      <tr><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>9</td><td className="py-2 px-4 border-b" rowSpan={2} style={{ verticalAlign: 'middle' }}>2014-15</td><td className="py-2 px-4 border-b">Academic Toppers</td><td className="py-2 px-4 border-b">37</td><td className="py-2 px-4 border-b">27,500</td></tr>
                      <tr><td className="py-2 px-4 border-b">EAMCET Rank</td><td className="py-2 px-4 border-b">8</td><td className="py-2 px-4 border-b">1,40,000</td></tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center mt-8">Image Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
              {[
                1, 2, 3, 6, 5, 7, 8, 9, 9, 10, 11, 12, 13, 14
              ].map((num, idx) => (
                <img
                  key={idx}
                  src={`https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Merit_Scholars${num}.jpg`}
                  alt={`Merit Scholar ${num}`}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              ))}
            </div>
          </div>
        );
      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Technical Association</h2>
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Celebrations Under Veda</summary>
                <p className="py-2">
                  Victorious Electronics with Dynamic Aspirants is the departmental student association. The main intention of VEDA is to provide effective communication among the students of ECE department and share their ideas and improve their technical skills. The Department also conducts various Activities under the banner of IETE Student Chapter.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Engineer's Day Celebrations 2K22 - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%204%20details%20Merged%20PDF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Tech Veda 2K22 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Techveda2k22.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Tech Veda 2K19 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Tech%20Veda_2k19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Engineers Day celebrations 2K18 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Engineers%20Day%20celebrations.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>Tech Veda 2K17 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/b.Tech%20Veda%202K17.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>TechEuphoria 2K19 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/TECHEUPHORIA%202K19.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                  <li>TechEuphoria 2K18 - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/TECHEUPHORIA%202K18.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a></li>
                </ul>
              </details>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-center">Images</h3>
              {/* TECKVEDA-2K19 Gallery */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-center mb-4">TECKVEDA-2K19</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
                  {[
                    { src: "tech_veda%20poster.jpg", alt: "Image 1" },
                    { src: "tech_veda1.jpg", alt: "Image 2" },
                    { src: "tech_veda2.jpg", alt: "Image 2" },
                    { src: "tech_veda3.jpg", alt: "Image 2" },
                    { src: "tech_veda4.jpg", alt: "Image 2" },
                    { src: "tech_veda%20pick&speak1.jpg", alt: "Image 2" },
                    { src: "tech_veda%20pick&speak2.jpg", alt: "Image 2" },
                    { src: "tech_veda%20tech1.jpg", alt: "Image 2" },
                    { src: "tech_veda%20tech2.jpg", alt: "Image 2" },
                    { src: "tech_veda%20proexpo1.jpg", alt: "Image 2" },
                    { src: "tech_veda%20proexpo2.jpg", alt: "Image 2" },
                    { src: "tech_veda%20proexpo3.jpg", alt: "Image 2" },
                    { src: "tech_veda%20proexpo4.jpg", alt: "Image 2" },
                    { src: "tech_veda%20paperpren1.jpg", alt: "Image 2" },
                    { src: "tech_veda%20paperpren2.jpg", alt: "Image 2" },
                  ].map((img, idx) => (
                    <img
                      key={idx}
                      src={`https://srivasaviengg.ac.in/uploads/ece_meritscholarships/${img.src}`}
                      alt={img.alt}
                      className="rounded-lg shadow-md w-full h-auto object-cover"
                    />
                  ))}
                </div>
              </div>
              {/* TECKVEDA-2K18 Gallery */}
              <div>
                <h4 className="text-xl font-bold text-center mb-4">TECKVEDA-2K18</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
                  {[
                    { src: "techf%20(1).jpg", alt: "Image 1" },
                    { src: "techf%20(2).jpg", alt: "Image 2" },
                    { src: "techf%20(3).jpg", alt: "Image 2" },
                    { src: "techf%20(4).jpg", alt: "Image 2" },
                    { src: "techf_1.jpg", alt: "Image 2" },
                    { src: "techf_4.jpg", alt: "Image 2" },
                    { src: "tecassoc%20(17).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(18).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(19).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(20).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(21).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(22).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(23).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(4).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(5).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(6).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(7).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(8).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(9).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(10).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(11).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(14).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(15).jpg", alt: "Image 2" },
                    { src: "tecassoc%20(16).jpg", alt: "Image 2" },
                  ].map((img, idx) => (
                    <img
                      key={idx}
                      src={`https://srivasaviengg.ac.in/uploads/ece_meritscholarships/${img.src}`}
                      alt={img.alt}
                      className="rounded-lg shadow-md w-full h-auto object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Newsletters</h2>
            <div className="space-y-4">
              {[{
                title: 'News Letter Volume10 Issue1 2023-24',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_Sep-Nov_2023.pdf'
              }, {
                title: 'News Letter Volume10 Issue2 2023-24',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_June-Aug_2023(original).pdf'
              }, {
                title: 'News Letter Volume9 Issue2 2022-23',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%209%20ISSUE2%20f.pdf'
              }, {
                title: 'News Letter Volume9 Issue1 2022-23',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_June-Aug_2023(original).pdf'
              }, {
                title: 'Newsletter Volume 8 Issue 2 2021-22',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%208%20ISSUE2%20.pdf'
              }, {
                title: 'Newsletter Volume 8 Issue 1 2021-22',
                url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%208%20ISSUE%201.pdf'
              }, {
                title: 'Newsletter Volume 7 Issue 2 2020-21',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%207%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 7 Issue 1 2020-21',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%207%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 6 Issue 3 2019-20',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 6 Issue 2 2019-20',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 6 Issue 1 2019-20',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 5 Issue 3 2018-19',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 5 Issue 2 2018-19',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 5 Issue 1 2018-19',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 4 Issue 4 2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%204.pdf'
              }, {
                title: 'Newsletter Volume 4 Issue 3 2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 4 Issue 2 2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 4 Issue 1 2017-18',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 3 Issue 1 2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 3 Issue 2 2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 3 Issue 3 2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 3 Issue 4 2016-17',
                url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%204.pdf'
              }, {
                title: 'Newsletter Volume 2 Issue 1 2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20Letter%202015-16%20Vol%202%20Issue%201.pdf'
              }, {
                title: 'Newsletter Volume 2 Issue 2 2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20letter%202015-16%20Vol%202%20Issue%202.pdf'
              }, {
                title: 'Newsletter Volume 2 Issue 3 2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20letter%202015-16%20Vol%202%20Issue%203.pdf'
              }, {
                title: 'Newsletter Volume 2 Issue 4 2015-16',
                url: 'https://srivasaviengg.ac.in/uploads/ece/ece_Newsletter%202015-16%20Vol%202%20Issue%204.pdf'
              }].map((item, idx) => (
                <details key={idx} className="border rounded-lg">
                  <summary className="text-lg font-semibold cursor-pointer px-4 py-2">{item.title}</summary>
                  <div className="text-center p-3">
                    {item.title} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] text-lg font-semibold hover:underline"
                    >
                      View
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      case 'Faculty Innovations in Teaching & Learning':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Innovations in Teaching & Learning</h2>
            <div className="space-y-4">
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">Faculty Innovations in Teaching & Learning</summary>
                <div className="p-4">
                  <h3 className="text-xl text-center text-[#850209] font-semibold mb-2">e-Resources</h3>
                  <p>
                    Activities of the department towards improvement in teaching-learning are indicated in the office records as well as on college website. They are open for reproduction or for further improvement or for review or critique..
                  </p>
                  <p className="mt-2">
                    <b>Some of the methods adopted by the faculty members in Teaching &amp; Learning are:</b>
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Making use of Power Point Presentation, wherever necessary</li>
                    <li>Technical Videos for demonstration of certain concepts or functioning of the devices.</li>
                    <li>Usage of Tools like MATLAB, Mentor Graphics etc, to demonstrate concepts, through simulation.</li>
                    <li>Use of E-Learning Resources like NPTEL lectures, on-line journals and on-line lectures like QEEE &amp; MOOCS for effective learning.</li>
                    <li>Providing Question bank with short answer questions and quiz questions.</li>
                    <li>Hands-on practice in the laboratories for better understanding of the concepts taught in the theory classes.</li>
                    <li>Visits to nearby industries for exposure.</li>
                    <li>Project exhibitions and poster presentations.</li>
                    <li>Student seminars.</li>
                    <li>
                      <span>Z to A Teaching Learning Method</span>
                    </li>
                  </ul>
                </div>
              </details>
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">e-Learning</summary>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    E-learning -{' '}
                    <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                  <li>
                    NPTEL videos -{' '}
                    <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a>
                  </li>
                </ul>
              </details>
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">PPT's</summary>
                <div className="p-4">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Antennas and Wave Propagation - <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Biomedical Engineering - <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Antennas and Wave Propagation - <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital Communications- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital IC Applications- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital Image Processing- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital Signal Processing- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Micro Processors &amp; Micro Controllers- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Optical Communications- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Radar Systems- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Radar Systems- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Satellite Communications- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>VLSI- <a href="https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                  </ul>
                </div>
              </details>
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">Technical Videos</summary>
                <div className="p-4">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Fourier Transform- <a href="https://www.youtube.com/watch?v=r18Gi8lSkfM" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Circuits and electronics - <a href="https://www.youtube.com/watch?v=AfQxyVuLeCs&list=PL9F74AFA03AA06A11" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Signals and Systems - <a href="https://www.youtube.com/watch?v=KJnAy6hzetw&list=PLLNp7XoiSLQYygYw8Mzt763zZCQdzCZcd" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>DigitalSignal processing <a href="https://www.youtube.com/watch?v=rkvEM5Y3N60&list=PL8157CA8884571BA2" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Electronic circuits <a href="https://www.youtube.com/watch?v=yQDfVJzEymI&list=PL7qUW0KPfsIIOPOKL84wK_Qj9N7gvJX6v" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital communications <a href="https://www.youtube.com/watch?v=KXFF8m4uGDc&list=PL2AD004D035C24F21" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                  </ul>
                </div>
              </details>
              <details className="border rounded-md">
                <summary className="font-semibold px-4 py-2 cursor-pointer">Question Banks</summary>
                <div className="p-4">
                  <h3 className="text-xl text-center text-[#850209] font-semibold mb-2">R16</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>EDC- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/EDC.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Signals and Systems - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/Signals%20and%20Systems.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                  </ul>
                  <h3 className="text-xl text-center text-[#850209] font-semibold mt-4 mb-2">R13</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>BME- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/BME.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Digital Communication - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/Digital%20Communication.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>DSD &amp; Digital IC Applications- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/DSD&DICA.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Linear Ic Applications- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/LICA%20Unitwise%20QB%20OBE%202016-17%2005-02-2018.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Low Power IC Design - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/LPICD.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Microprocessor &amp; Microcontrollers - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/MPMC.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Random Variables &amp; Stochastic Processes - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/RVSP.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>Randar Systems - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/RS.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>STLD- <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/STLD.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                    <li>VLSI DESIGN - <a href="https://srivasaviengg.ac.in/uploads/ece/questionbank/VLSI.pdf" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a></li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Handbooks':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Academic HandBooks</h2>
            <div className="space-y-6">
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Academic year 2020-21</summary>
                <ul className="pt-3 list-disc pl-6 space-y-2">
                  <li>
                    III-Sem 2020-21 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/ece_Academic%20Handbook%20III%20Sem%202020-21.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV B.Tech I-sem 2020-21 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/ece_Academic%20Handbook%20IV%20B.Tech%20I%20Sem%202020-21.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Academic year 2019-20</summary>
                <ul className="pt-3 list-disc pl-6 space-y-2">
                  <li>
                    II-B.Tech II-Sem V18(Autonomous) 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20II%20Sem%20(%20Autonomous)%20%20Hand%20book%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    III-B.Tech II-Sem R16 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20II%20Sem%20Hand%20book%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV-B.Tech II-Sem R16 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20II%20Sem%20Hand%20Book%20%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    II-B.Tech I-Sem V18(Autonomous) 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20I%20Sem%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    III-B.Tech I-Sem R16 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20I%20Sem%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV-B.Tech I-Sem R16 2019-20 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20I%20Sem%202019-20.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
              <details className="border rounded-lg">
                <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Academic year 2018-19</summary>
                <ul className="pt-3 list-disc pl-6 space-y-2">
                  <li>
                    II-B.Tech II-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20II%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    III-B.Tech II-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20II%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV-B.Tech II-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20II%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>
                    II-B.Tech I-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20Ist%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    III-B.Tech I-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20Ist%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                  <li>
                    IV-B.Tech I-Sem 2018-19 -{' '}
                    <a
                      href="https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20Ist%20Sem%202018-19.pdf"
                      className="text-[#850209] font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'Training Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Training Activities</h2>
            <div className="space-y-6">
              <details className="border rounded-lg">
                <summary className="text-lg font-semibold cursor-pointer px-4 py-2">List of Training Activities conducted in 2022-23</summary>
                <div className="text-center p-3">
                  List of Training Activities conducted in 2022-23 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/ece/training%20Activities%20in%202022-23.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] text-lg font-semibold hover:underline"
                  >
                    View
                  </a>
                </div>
              </details>
              <details className="border rounded-lg">
                <summary className="text-lg font-semibold cursor-pointer px-4 py-2">List of Training Activities conducted in 2021-22</summary>
                <div className="text-center p-3">
                  List of Training Activities conducted in 2021-22 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/ece/Traning%20Activities%20during%20A.Y.2021-2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] text-lg font-semibold hover:underline"
                  >
                    View
                  </a>
                </div>
              </details>
              <details className="border rounded-lg">
                <summary className="text-lg font-semibold cursor-pointer px-4 py-2">List of Training Activities conducted in 2020-21</summary>
                <div className="text-center p-3">
                  List of Training Activities conducted in 2020-21 -{' '}
                  <a
                    href="https://srivasaviengg.ac.in/uploads/ece/Traning%20Activities%20during%20A.Y.%202020-2021%20update.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#850209] text-lg font-semibold hover:underline"
                  >
                    View
                  </a>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Workshops/SOC/Guest Lecturers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Workshops/SOC/Seminars/Guest Lectures</h2>
            {/* Workshops/SOC */}
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Workshops/SOC</summary>
                <div className="mt-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Workshops/SOC organized during the Academic Year 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20conducted%20in%20%202022-23%20(1).pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops/SOC organized during the Academic Year 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20conducted%20in%202021-22%20(1).pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20Conducted%20in%20_2019-20.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2018-19 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20Conducted%20in%202018-19.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2017-18 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202017-18.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2016-17 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202016-17.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2015-16 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202015-16.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2014-15 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202014-15.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2012-13 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202012-13.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshops organized during the Academic Year 2011-12 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202011-12.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>APSSDC- Workshop on web development using DJANGO- <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/APSSDC-%20Workshop%20on%20web%20development%20using%20DJANGO.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>APSSDC -Web designing using react JS- <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/APSSDC%20-Web%20designing%20using%20react%20JS.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Two Day -Workshop on Design and Analysis of Antenna using CST microwave studio software tool - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20-Workshop%20on%20Design%20and%20Analysis%20of%20Antenna%20using%20CST%20microwave%20studio%20software%20tool.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>One week SOC on Basic Digital Circuit Design with VHDL and QuestaSim Tool SEC-C- - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20-Workshop%20on%20Design%20and%20Analysis%20of%20Antenna%20using%20CST%20microwave%20studio%20software%20tool.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Three-day Hands-on workshop Embedded System Design - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Three-day%20Hands-on%20workshop%20Embedded%20System%20Design.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>One week workshop on Arduino with scratch - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/One%20week%20workshop%20on%20Arduino%20with%20scratch.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>One-week Skill Oriented program on sensor interfacing and cloud computing - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/One-week%20Skill%20Oriented%20program%20on%20sensor%20interfacing%20and%20cloud%20computing%20(1).pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshop on "SCILAB- Applications in Engineering & Technology", in association with Andhra Pradesh State Skill Development Corporation (APSSDC) under IETE Students Forum (ISF), 21st to 23rd Dec-2017 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/SCI_LAB_Workshop_2017.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshop on "Design and Simulation of Antennas & Microwave Devices using HFSS" , 6th & 7th Dec-2017 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/HFSS_Workshop_2017.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshop on Arduino-Device Interfacing Conducted on 22nd & 23rd February 2017 for II B. Tech ECE Students Under IETE Student Forum (ISF) - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Workshop%20on%20Arduino%20Device%20Interfacing%20for%20IInd%20Years.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Workshop on ROBOTICS and IOT Conducted on 6th & 7th February 2017 for III B. Tech ECE Students Under IETE Student Forum (ISF) - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Workshop%20on%20IOT%20&%20Robotics%20for%20%20III%20rd%20Years.pdf" className="text-blue-600 hover:underline">View More</a></li>
                  </ol>
                </div>
                <div className="text-center mt-8">
                  <h3 className="text-2xl font-semibold mb-4">Workshops/SOC Gallery PICS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
                    {[
                      "guestlecture_img1.jpg",
                      "guestlecture_img2.jpg",
                      "guestlecture_img3.jpg",
                      "guestlecture_img4.jpg",
                      "fdp_1.jpg",
                      "fdp_2.jpg",
                      "fdp_3.jpg",
                      "fdp_4.jpg",
                      "IOEA_1.jpg",
                      "IOEA_2.jpg",
                      "IOEA_3.jpg",
                      "IOEA_4.jpg"
                    ].map((img, idx) => (
                      <img key={idx} src={`https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/${img}`} alt={`Gallery ${idx + 1}`} className="rounded-lg shadow-md w-full h-auto object-cover" />
                    ))}
                  </div>
                </div>
              </details>
            </div>
            {/* Guest Lectures */}
            <div className="mb-8">
              <details>
                <summary className="text-xl font-semibold cursor-pointer">Guest Lectures</summary>
                <div className="mt-4">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Guest Lectures Organized during the Academic Year 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest%20Lectures%20conducted%20%20in%202021-22.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2019-20.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest%20Lectures%20Conducted_2018-19.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2018-19 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2017-18.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2017-18 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2016-17.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2016-17 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2015-16.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2015-16 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2014-15.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2014-15 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2012-13.pdf" className="text-blue-600 hover:underline">View More</a></li>
                    <li>Guest Lectures Organized during the Academic Year 2013-14 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2011-12.pdf" className="text-blue-600 hover:underline">View More</a></li>
                  </ol>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Development Programs</h2>
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">FDP Attended</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li className="fdp-item">FDPs attended by the Faculty 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_22-23.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_21-22.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2020-21 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_faculty_certificatons_20-21.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_19-20.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2018-19 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2018-19%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2017-18 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2017-18%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2016-17 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2016-17%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2015-16 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2015-16%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2014-15 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2014-15FDP%20Attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2013-14 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2013-2014%20FDP%20Attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2012-13 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2012-13%20FDP%20Attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">FDPs attended by the Faculty 2011-12 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2011-12%20FDP%20attended.pdf" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
              <details>
                <summary className="text-xl font-semibold cursor-pointer">FDPs/ Workshops/ Training Programmes Conducted</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li className="fdp-item">Two Day FDP on Open source software tools for online teaching - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20FDP%20on%20Open%20source%20software%20tools%20for%20online%20teaching.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>Three Day FDP on Software tools for Research publications and patent filing - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/three%20Day%20FDP%20on%20Software%20tools%20for%20Research%20publications%20and%20patent%20filing.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>A Three Day National Level Online FDP on Research Trends in Signal Processing, Antennae, VLSI and IoT - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/A%20Three%20Day%20National%20Level%20Online%20FDP%20on%20Research%20Trends%20in%20Signal%20Processing,%20Antennae,%20VLSI%20and%20IoT.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>Two Day FEP on Antenna &amp; wireless Communications - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/two%20%20Day%20FEP%20on%20Antenna%20&%20wireless%20Communications.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>Five Day FDP on IoT and Applications - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Faculty%20Enablement%20Program%20%20on%20Signal%20and%20Image%20processing.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>Faculty Enablement Program on Signal and Image processing - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/Faculty%20Enablement%20Program%20%20on%20Signal%20and%20Image%20processing.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP on Research Challenges and Opportunities post COVID19 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/FDP%20on%20Research%20Challenges%20and%20Opportunities%20post%20COVID19.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-ATAL sponsored FDP on RF Energy harvesting Antenna Design for wirless body area network - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-ATAL%20sponsored%20FDP%20on%20RF%20Energy%20harvesting%20Antenna%20Design%20for%20wirless%20body%20area%20networks.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-1 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20Phase-1.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-2 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20%20Phase-2.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-3 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-%20on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20%20Phase%20-3.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-4 - <a target="_blank" href="https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP%20on%20Research%20area%20in%20Bio%20medical%20singal%20processing%20phase-4.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP's Conducted by the Faculty during the A.Y 2022-23 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202022-23.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP's Conducted by the Faculty during the A.Y 2021-22 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202021-22.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP's Conducted by the Faculty during the A.Y 2020-21 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202020-21.pdf" className="text-blue-600 hover:underline">View</a></li>
                  <li>FDP's Conducted by the Faculty during the A.Y 2019-20 - <a target="_blank" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202019-20.pdf" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
          </div>
        );
      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">MoUs</h2>
            <h3 className="text-xl font-semibold text-center mb-6">A. MOUs with Industries</h3>
            <div className="flex justify-center items-center mb-8">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full border text-sm text-gray-700 bg-white rounded-lg shadow">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border">S.No</th>
                      <th className="px-4 py-2 border">Organization Name</th>
                      <th className="px-4 py-2 border">Date</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border">Purpose</th>
                      <th className="px-4 py-2 border">Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">1</td>
                      <td className="px-4 py-2 border">Tessolve Semiconductor Test Engineering Lab for STE-SDC Course- Bangalore</td>
                      <td className="px-4 py-2 border">04-12-2023</td>
                      <td className="px-4 py-2 border">On going</td>
                      <td className="px-4 py-2 border">1. To Support Skill Oriented Training in the field of Semiconductor Test and Measurement for ECE /EEE UG Students<br />2. To offer Skill Development Certification Course on Semi Conductor Test Engineering <br />3. To Provide Placement Assistance</td>
                      <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">2</td>
                      <td className="px-4 py-2 border">NIT Andhra Pradesh</td>
                      <td className="px-4 py-2 border">09-02-2023</td>
                      <td className="px-4 py-2 border">On going</td>
                      <td className="px-4 py-2 border">1.Supports research activities, proposal writing <br />2.Colloborative research work <br />3.Faculty exchange <br />4.Conducting expert lectures and workshops for students</td>
                      <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/uploads/ece/2.%20NIT%20AP%20MOU.pdf" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">3</td>
                      <td className="px-4 py-2 border">Edu Skills</td>
                      <td className="px-4 py-2 border">22-11-2022</td>
                      <td className="px-4 py-2 border">On going</td>
                      <td className="px-4 py-2 border">To provide training for faculty and students on Advanced technologies</td>
                      <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">4</td>
                      <td className="px-4 py-2 border">Electro-Pro E-waste Management</td>
                      <td className="px-4 py-2 border">08-06-2022</td>
                      <td className="px-4 py-2 border">On going</td>
                      <td className="px-4 py-2 border">1.Electro pro supports students of SVEC in designing and development of products from E-Waste. <br />2.Also provides training on robotics and Embedded systems for students.</td>
                      <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">5</td>
                      <td className="px-4 py-2 border">EFY-Certified Electronics Skill development center</td>
                      <td className="px-4 py-2 border">13-6-2019</td>
                      <td className="px-4 py-2 border">Completed</td>
                      <td className="px-4 py-2 border">1.EFY provided 50 subscription of Electronics for you magazine for one year. <br />2.EFY provided DIY Kits, self learning Kits, development boards, electronic components for the students to do projects. <br />3.EFY provided access to 10 students for monthly EFY webinars on different topics</td>
                      <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/uploads/ece/5.%20EFy%20MOU.pdf" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">6</td>
                      <td className="px-4 py-2 border">E&ICT Academy NITW</td>
                      <td className="px-4 py-2 border">20-09-2017</td>
                      <td className="px-4 py-2 border">Completed</td>
                      <td className="px-4 py-2 border">To conduct FDPs and improve teaching learning process</td>
                      <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="#" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">7</td>
                      <td className="px-4 py-2 border">thingTronics Pvt Ltd Bengaluru</td>
                      <td className="px-4 py-2 border">20-08-2016</td>
                      <td className="px-4 py-2 border">Ongoing</td>
                      <td className="px-4 py-2 border">To motivate and create skills and methods in Internet of Things (IoT) through Interdisciplinary project works.</td>
                      <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/uploads/ece/6.%20MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">8</td>
                      <td className="px-4 py-2 border">IIT Madras</td>
                      <td className="px-4 py-2 border">01-03-2015</td>
                      <td className="px-4 py-2 border">Completed</td>
                      <td className="px-4 py-2 border">To enhance learning capabilities among students through QEEE Programme.</td>
                      <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="#" target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-left mt-10 mb-4">B. Interaction with the Industry</h3>
            <div className="flex justify-center">
              <ul className="list-disc pl-6 space-y-2 flex flex-col items-start">
                <li>
                  Making MOU with Electro-Pro e-Waste Management, Visakapatnam to establish Electro Pro e-Waste in Campus -{' '}
                  <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Electro%20Pro%20Management.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Making MOU with Thing tronics company, Banglore to establish IOT lab in Campus -{' '}
                  <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Syllabus</h2>
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">B.Tech </summary>
                <div className="mt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      B.Tech - V23 Syllabus -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/syllabus/ECE B.Tech- V23 Syllabus.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                    </li>
                    <li>
                      B.Tech V20 Syllabus -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/syllabus/B.%20Tech%20ECE%20-Autonomous%20(V%2020%20-%20Reg)%20syllabus.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                    </li>
                    <li>
                      B.Tech V18 Syllabus -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/syllabus/B.%20Tech%20ECE%20-Autonomous%20(V18-%20Reg)%20Syllabus.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                    </li>
                  </ul>
                </div>
              </details>

              <details>
                <summary className="text-xl font-semibold cursor-pointer">SOC Syllabus</summary>
                <div className="mt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      SOC Syllabus during the Academic Year 2023-24 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2023-24.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                    </li>
                    <li>
                      SOC Syllabus during the Academic Year 2022-23 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                    </li>
                    <li>
                      SOC Syllabus during the Academic Year 2021-22 -{' '}
                      <a href="https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2021-22.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">Board of Studies</h2>
            <div className="flex justify-center items-center mb-8">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full border text-sm text-gray-700 bg-white rounded-lg shadow">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border">S.No</th>
                      <th className="px-4 py-2 border">Name of the BOS Member</th>
                      <th className="px-4 py-2 border">Designation</th>
                      <th className="px-4 py-2 border">Organization</th>
                      <th className="px-4 py-2 border">Position in JOB</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">1</td>
                      <td className="px-4 py-2 border">Dr. E. Kusuma Kumari</td>
                      <td className="px-4 py-2 border">Professor &amp; HOD</td>
                      <td className="px-4 py-2 border">Dept of ECE,SVEC</td>
                      <td className="px-4 py-2 border">Chairperson</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">2</td>
                      <td className="px-4 py-2 border">Dr. B. T Krishna</td>
                      <td className="px-4 py-2 border">Professor of ECE</td>
                      <td className="px-4 py-2 border">University College Of Engineering. JNTUK</td>
                      <td className="px-4 py-2 border">University Nominee</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">3</td>
                      <td className="px-4 py-2 border">Prof. NVSN Sarma</td>
                      <td className="px-4 py-2 border">Director</td>
                      <td className="px-4 py-2 border">IIIT, Trichy Tamilnadu</td>
                      <td className="px-4 py-2 border">Academic Expert</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">4</td>
                      <td className="px-4 py-2 border">Dr. M. Venu Gopala Rao</td>
                      <td className="px-4 py-2 border">Professor of ECE</td>
                      <td className="px-4 py-2 border">K. L. University, Vijayawada</td>
                      <td className="px-4 py-2 border">Academic Expert</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">5</td>
                      <td className="px-4 py-2 border">Dr. M. Chakravarthy</td>
                      <td className="px-4 py-2 border">Scientist-'G'</td>
                      <td className="px-4 py-2 border">Additional Director, Directorate of Antenna Technologies, DLRL,Hyderabad</td>
                      <td className="px-4 py-2 border">Industry Nominee</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">6</td>
                      <td className="px-4 py-2 border">Mr. S. Siva Kumar</td>
                      <td className="px-4 py-2 border">Senior Engineer</td>
                      <td className="px-4 py-2 border">Qualcomm Bhagmani tech Park,Banglore</td>
                      <td className="px-4 py-2 border">Almuni Member</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">7</td>
                      <td className="px-4 py-2 border text-center" colSpan={4}>
                        All the Faculty Members in the ECT Dept. are Members in BOS
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <h4 className="text-xl font-semibold text-[#850209] mb-4">Board of Studies Meeting Minutes:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Minutes of 7th meeting of Board of Studies, dated on 16.07.2024 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/Minutes of 7th BOS meeting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 6th meeting of the Board of Studies, dated 25.07.2022 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/6th%20BOS%20minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 5th meeting of the Board of Studies, dated 02.09.2021 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/6th%20BOS%20minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 4th meeting of the Board of Studies, dated 29.12.2020 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/4th%20BOS%20Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 3rd meeting of the Board of Studies, dated 31.05.2020 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/3rd%20BOS%20Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 2nd meeting of the Board of Studies, dated 20.04.2019 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/3rd%20BOS%20Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
                <li>
                  Minutes of 1st meeting of the Board of Studies, dated 02.06.2018 -{' '}
                  <a href="https://srivasaviengg.ac.in/uploads/ece/bos/1st%20BOS%20Minutes.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'Clubs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">SPACE CLUB_AICTE-SPICES</h2>
            <div className="mb-10">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">SPACE CLUB_AICTE-SPICES</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li className="fdp-item">Space Club: - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/SPICES%20Information.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 1: One Week Hands on Workshop on IoT Use Cases &amp; Development <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/One%20Week%20Hands%20on%20Workshop%20on%20IoT%20Use%20Cases%20&%20Development.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 2: 8th International YOGA DAY celebrations - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%202%20details%20-merged%20PDF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 3: One Week Handson Workshop on IoT &amp; its Applications - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event-3%20Merged%20PDF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 4: Engineer's Day Celebrations 2K22 - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%204%20details%20Merged%20PDF.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 5: IOT Hackathon Program 2K23 - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/IoT2HACK-2K23.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 6: under AICTE- SPICES - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Event%20-5%20under%20AICTE-%20SPICES.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 7: One week Boot Camp Program on “Sensor Interfacing and Cloud Computing” - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/EVENT-7%20%20Bootcamp%20program%20on%20Sensor%20Interfacing%20&%20Cloud%20Computing.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                  <li className="fdp-item">Event 8: SOC Program on VHDL &amp; Digital Questa Sim - <a href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Event-8%20%20SOC%20Program%20on%20VHDL%20&%20Digital%20Questa%20Sim.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">E- Waste Management Refurbishing club</h2>
            <div>
              <details>
                <summary className="text-xl font-semibold cursor-pointer">E- Waste Management Refurbishing club</summary>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li className="fdp-item">E-Waste Refurbishing Club - <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/E-Waste%20Refurbishing%20Club.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></li>
                </ul>
              </details>
            </div>
          </div>
        );

      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Extra-Curricular Activities</h2>
            {/* Extracurricular Activities List */}
            <div className="mb-8">
              <ul className="list-disc pl-6 space-y-2 text-center">
                {[{
                  year: '2022-23',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202022-23.pdf'
                }, {
                  year: '2021-22',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202021-22.pdf'
                }, {
                  year: '2019-20',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities19-20.pdf'
                }, {
                  year: '2018-19',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities18-19.pdf'
                }, {
                  year: '2017-18',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities17-18.pdf'
                }, {
                  year: '2016-17',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities16-17.pdf'
                }, {
                  year: '2015-16',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities15-16.pdf'
                }].map((item, idx) => (
                  <li key={idx} className="activity-item">
                    Extracurricular activities during the Year {item.year} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] font-semibold hover:underline"
                    >
                      View More
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Departmental Sports Meet */}
            <h2 className="text-2xl font-bold mb-4 text-center">Departmental Sports Meet-2k17</h2>
            <div className="mb-8">
              <ul className="list-disc pl-6 space-y-2 text-center">
                {[{
                  label: 'Prize Distribution to Kabaddi winners and runners',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Prize%20Distribution%20to%20Kabaddi%20winners%20and%20runners.pdf'
                }, {
                  label: 'Prize Distribution to Cricket winners and runners',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Prize%20Distribution%20to%20Cricket%20winners%20and%20runners.pdf'
                }].map((item, idx) => (
                  <li key={idx} className="activity-item">
                    {item.label} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] font-semibold hover:underline"
                    >
                      View More
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Departmental Cultural Meet */}
            <h2 className="text-2xl font-bold mb-4 text-center">
              Departmental Cultural Meet-2k17 -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Departmental%20Cultural%20Meet2k17.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#850209] font-semibold hover:underline"
              >
                View More
              </a>
            </h2>
            {/* Industrial Visit */}
            <h2 className="text-2xl font-bold mb-4 text-center">Industrial Visit</h2>
            <div className="mb-8">
              <ul className="list-disc pl-6 space-y-2 text-center">
                {[{
                  label: 'Industrial Visit On 13th & 14th Dec 18 to RADAR Weather station and PrasaraBharathi Vizag',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/industrial%20visit_19.pdf'
                }, {
                  label: 'Industrial Visit On 18th & 20th Nov 18 to SrihariKota',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Industrial%20Visit%20RADAR%20photos.pdf'
                }, {
                  label: 'Industrial Visit On 6th & 7th Oct 17 to RADAR Weather station and PrasaraBharathi Vizag',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202021-22.pdf'
                }, {
                  label: 'Industrial Visit On 2nd & 3rd Sep 16 to Steel Plant Vizag',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/industrial%20visit.pdf'
                }].map((item, idx) => (
                  <li key={idx} className="activity-item">
                    {item.label} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] font-semibold hover:underline"
                    >
                      View More
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Blood Donation Camp */}
            <h2 className="text-2xl font-bold mb-4 text-center">
              Blood Donation Camp -{' '}
              <a
                href="https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Blood%20Donation%20Camp3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#850209] font-semibold hover:underline"
              >
                View More
              </a>
            </h2>
            {/* YUVA Section */}
            <h2 className="text-2xl font-bold mb-4 text-center">YUVA</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-2">Social Services</h3>
              <p className="mb-2">
                There are many people who like to donate things to the poor and needy because they are blessed with every comfort and know that others are struggling,. It is everyone's courtesy to help poor children who are less fortunate, though. If you are helping someone in their need, then you are doing the right thing by providing them with the essentials. In this world it is a fact that whatever seed you sow, that's the sort of fruit you'll get.So, if we are ready to help people then we'll also get someone to help in our hour of need. Things change with the passage of time, bringing new situations to everyone's lives.
              </p>
              <p className="mb-4">
                With this motto the Department of ECE of Sri Vasavi Engineering College has started in <b>"YUVA"</b> Program with the caption of <b>"The Society Needs You"</b> on the occasion of Engineer's Day in 2016-17.. Under this program students are involving voluntarily and identify the poor and needy people and help them. This program will be carried out once in a semester continuously. In this regard the College Management has encouraged the students by extending their heartful support.
              </p>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold mb-2">LIST OF YUVA EVENTS CONDUCTED YEAR WISE</h3>
              <ul className="list-disc pl-6 space-y-2">
                {[{
                  label: '2018-2019 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva_2019.pdf'
                }, {
                  label: '2017-2018 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva_2018.pdf'
                }, {
                  label: '2017-2018 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva.pdf'
                }, {
                  label: '2016-2017 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva%20-2016-17-2nd%20Sem.pdf'
                }, {
                  label: '2016-2017 2nd Sem',
                  url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/ece_Social%20Service%20Activities.pdf'
                }].map((item, idx) => (
                  <li key={idx}>
                    {item.label} -{' '}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] font-semibold hover:underline"
                    >
                      For more details
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>

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

            {/* HOD Information - Always show at the top of Department Profile */}
            {activeDeptTab === 'Department' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
                <div className="relative">
                  <img
                    src="/ecehod.jpg"
                    alt="Dr. E.Kusuma Kumari"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
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
            )}

            {/* Content Area that changes completely based on selected tab */}
            {renderDeptTabContent()}
          </div>
        );
      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Profiles</h2>
            <div className="mb-8">
              <details open className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Faculty Profile</summary>
                <div className="overflow-x-auto mt-4 flex justify-center">
                  <table className="min-w-full border text-sm text-gray-700 bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">S.No.</th>
                        <th className="px-4 py-2 border">Name of the Faculty</th>
                        <th className="px-4 py-2 border">Qualification</th>
                        <th className="px-4 py-2 border">Designation</th>
                        <th className="px-4 py-2 border">Profile</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border">1</td>
                        <td className="px-4 py-2 border">Dr.E.Kusuma Kumari</td>
                        <td className="px-4 py-2 border">M.Tech.,Ph.D</td>
                        <td className="px-4 py-2 border">Professor &amp; HOD</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ece_Dr.%20E.%20Kusuma%20Kumari.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">2</td>
                        <td className="px-4 py-2 border">Mr. P. Nagaraju</td>
                        <td className="px-4 py-2 border">M.Tech.,(Ph.D)</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Mr.P.Nagaraju.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">3</td>
                        <td className="px-4 py-2 border">Mr. P. V. V Rajesh</td>
                        <td className="px-4 py-2 border">M.Tech.,(Ph.D)</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Mr.%20P.V.V.Rajesh.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">4</td>
                        <td className="px-4 py-2 border">Mr. K. Pasipalana Rao</td>
                        <td className="px-4 py-2 border">M.Tech.,(Ph.D)</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Mr.%20K.Pasipalana%20Rao.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">5</td>
                        <td className="px-4 py-2 border">Ms. M. Neelima</td>
                        <td className="px-4 py-2 border">M.Tech</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Ms.%20M.%20Neelima.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">6</td>
                        <td className="px-4 py-2 border">Mr. Ch. Kavya</td>
                        <td className="px-4 py-2 border">M.Tech</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Ms.%20Ch.%20Kavya.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">7</td>
                        <td className="px-4 py-2 border">Dr. Ch. V. Naga Bhaskar</td>
                        <td className="px-4 py-2 border">M.Tech.,Ph.D</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Dr.%20Ch.%20V.%20Naga%20Bhaskar.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">8</td>
                        <td className="px-4 py-2 border">Mr. S. N. Dattatreyachari</td>
                        <td className="px-4 py-2 border">M.Tech</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Mr. S. N. Dattatreyachari.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">9</td>
                        <td className="px-4 py-2 border">Mr. A. Suresh</td>
                        <td className="px-4 py-2 border">M.Tech</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Mr. A. Suresh.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">10</td>
                        <td className="px-4 py-2 border">Mr. N. Saidulu</td>
                        <td className="px-4 py-2 border">M.Tech.,(Ph.D)</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Mr. N. Saidulu.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">11</td>
                        <td className="px-4 py-2 border">Mrs. Q. Ayn</td>
                        <td className="px-4 py-2 border">M.Tech.,(Ph.D)</td>
                        <td className="px-4 py-2 border">Asst. Professor</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Mrs. Q. Ayn.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">12</td>
                        <td className="px-4 py-2 border">Ms. M. Tejeswari</td>
                        <td className="px-4 py-2 border">B.Tech</td>
                        <td className="px-4 py-2 border">Lecturer</td>
                        <td className="px-4 py-2 border"><a className="text-blue-600 hover:underline" href="https://srivasaviengg.ac.in/faculty_profile/ECT_Ms. M. Tejeswari.pdf" target="_blank" rel="noopener noreferrer">View Profile</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Non-Teaching Profiles</summary>
                <div className="overflow-x-auto mt-4 flex justify-center">
                  <table className="min-w-full border text-sm text-gray-700 bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">S.No</th>
                        <th className="px-4 py-2 border">Name of the Faculty</th>
                        <th className="px-4 py-2 border">Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-4 py-2 border">1</td><td className="px-4 py-2 border">Mr. M. V. V Satyanarayana</td><td className="px-4 py-2 border">Lab Technician</td></tr>
                      <tr><td className="px-4 py-2 border">2</td><td className="px-4 py-2 border">Mr. Sk. Mastan Vali(Shabbir)</td><td className="px-4 py-2 border">Lab Technician</td></tr>
                      <tr><td className="px-4 py-2 border">3</td><td className="px-4 py-2 border">Mr. Y. Narasimha Rao</td><td className="px-4 py-2 border">Lab Technician</td></tr>
                      <tr><td className="px-4 py-2 border">4</td><td className="px-4 py-2 border">Mr. G. Jani Babu</td><td className="px-4 py-2 border">Lab Technician</td></tr>
                      <tr><td className="px-4 py-2 border">5</td><td className="px-4 py-2 border">Mr. M. Naga Kavya</td><td className="px-4 py-2 border">Lab Tech.</td></tr>
                      <tr><td className="px-4 py-2 border">6</td><td className="px-4 py-2 border">Mr. P. Naresh</td><td className="px-4 py-2 border">Lab Tech.</td></tr>
                      <tr><td className="px-4 py-2 border">7</td><td className="px-4 py-2 border">Mr. G. S. C. V Padmakar</td><td className="px-4 py-2 border">D.E.O</td></tr>
                      <tr><td className="px-4 py-2 border">8</td><td className="px-4 py-2 border">Ms. G. Kalyani Durga</td><td className="px-4 py-2 border">D.E.O</td></tr>
                      <tr><td className="px-4 py-2 border">9</td><td className="px-4 py-2 border">Mr. M. Sai Naveen Kumar</td><td className="px-4 py-2 border">Attender</td></tr>
                      <tr><td className="px-4 py-2 border">10</td><td className="px-4 py-2 border">Mr. B. Srinivisa Rao</td><td className="px-4 py-2 border">Attender</td></tr>
                      <tr><td className="px-4 py-2 border">11</td><td className="px-4 py-2 border">Mr. L. Phani Pallavi</td><td className="px-4 py-2 border">Attender</td></tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Physical Facilities</h2>
            <div className="space-y-8">
              {/* Class Rooms & Class Time Tables */}
              <div>
                <details className="border rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer text-[#850209]">Class Rooms &amp; Class Time Tables</summary>
                  <div className="mt-4">
                    <h5 className="font-semibold mb-2">Class Rooms</h5>
                    <ul className="list-disc list-inside ml-4">
                      <li>
                        Class Rooms with ICT Enabled Facilities -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/Class%20Rooms%20Photos.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] underline hover:text-red-700">View</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-semibold mb-2">Class Time Tables</h5>
                    <ul className="list-disc list-inside ml-4">
                      <li>
                        ECE Master Timetable A.Y for II Sem 2022-23 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%202nd%20SEM%20%20MasterTime%20Tables.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] underline hover:text-red-700">View</a>
                      </li>
                      <li>
                        ECE Master Timetable A.Y for I Sem 2022-23 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%201st%20SEM%20%20MasterTime%20Tables.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] underline hover:text-red-700">View</a>
                      </li>
                      <li>
                        ECE Master Timetable A.Y for II Sem 2021-22 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2021-22%202nd%20SEM%20%20Master%20Time%20Tables.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] underline hover:text-red-700">View</a>
                      </li>
                      <li>
                        ECE Master Timetable A.Y for I Sem 2021-22 -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2021-22%201st%20SEM%20%20MasterTime%20Tables.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] underline hover:text-red-700">View</a>
                      </li>
                      <li>
                        B.Tech IV Semester Timetable 2020-21 wef(21-03-2022) -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/IV%20Semester%20Time%20Table%202020-21wef%2021-03-2022.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] underline hover:text-red-700">View</a>
                      </li>
                      <li>
                        B.Tech VII Semester Timetable A.Y for I 2021-22 wef(04-10-2021) -{' '}
                        <a href="https://srivasaviengg.ac.in/uploads/ece/VII%20Semester%20Time%20Table%202020-21wef%2004-10-2021.pdf" target="_blank" rel="noopener noreferrer" className="text-[#850209] underline hover:text-red-700">View</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.37%20AM.jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.38%20AM%20(1).jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.42%20AM.jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.41%20AM%20(1).jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.41%20AM.jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.40%20AM%20(1).jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.40%20AM.jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.39%20AM%20(1).jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.39%20AM.jpeg",
                      "https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.38%20AM%20(2).jpeg"
                    ].map((src, idx) => (
                      <img key={idx} src={src} alt={`Physical Facility ${idx + 1}`} className="rounded-lg shadow-md object-cover w-full h-64" />
                    ))}
                  </div>
                </details>
              </div>
              {/* Laboratories */}
              <div>
                <details className="border rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer text-[#850209]">Laboratories</summary>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Major Equipment Available</h3>
                    <ul className="list-disc list-inside ml-4">
                      <li>Xilinx University CPLD Boards, Spartan-3E FPGA Boards - <a href="#" className="text-[#850209] underline hover:text-red-700">View</a></li>
                      <li>Embedded System ATMEL ARM 9 Boards, HAWK Boards (ARM 9 &amp; OMAP L138)</li>
                      <li>Analog &amp; Digital Communication Kits</li>
                      <li>Digital Storage Oscilloscopes GDS 1102U</li>
                      <li>Microwave Benches (X-Band)</li>
                      <li>Optical Communication Trainer Kits</li>
                      <li>Texas Instrumentation DSP Starter Kits (DSK) TMS320C6713</li>
                      <li>MicroController Trainer and Development Boards</li>
                      <li>Universal IC Tester</li>
                      <li>Antenna Trainer Kit</li>
                      <li>RIGO Spectrum Analyzer With Tracking Generator</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Major Software Available</h3>
                    <ul className="list-disc list-inside ml-4">
                      <li>Mentor Graphic's Higher Education Programme 1 (HEP 1) @ 75 User</li>
                      <li>MATLAB R2018b version with Different Tool Boxes @ 100 User</li>
                      <li>Labtek Spice Simulation Software @ Unlimited User</li>
                      <li>Code Composer Studio Software 3.0 @ Unlimited User</li>
                      <li>Xilinx System Edition Software 12.2i @ 25 User</li>
                      <li>HFSS Antenna tool @ 1 User research version and 5 Users Academic version</li>
                    </ul>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "https://srivasaviengg.ac.in/image/ece%20images/Electronic%20devices%20and%20Circuits%20Lab%204.JPG",
                      "https://srivasaviengg.ac.in/image/ece%20images/Electronic%20devices%20and%20Circuits%20Lab%205.JPG",
                      "https://srivasaviengg.ac.in/image/ece%20images/Digita-Communications-Lab-1.gif",
                      "https://srivasaviengg.ac.in/image/ece%20images/Digita-Communications-Lab--.gif",
                      "https://srivasaviengg.ac.in/image/ece%20images/Microprocessor-and-interfac3.jpg",
                      "https://srivasaviengg.ac.in/image/ece%20images/Microprocessor-and-interfac4.jpg",
                      "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm.gif",
                      "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm7.gif",
                      "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm6.gif",
                      "https://srivasaviengg.ac.in/image/ece%20images/ECAD-Lab-3.gif",
                      "https://srivasaviengg.ac.in/image/ece%20images/IOT%20LAB.jpg",
                      "https://srivasaviengg.ac.in/image/ece%20images/ECAD-Lab-4.gif",
                      "https://srivasaviengg.ac.in/image/ece%20images/Isaac%20Asimov%20Space%20Centre.jpg",
                      "https://srivasaviengg.ac.in/image/ece%20images/SPLab.jpg"
                    ].map((src, idx) => (
                      <img key={idx} src={src} alt={`Lab Facility ${idx + 1}`} className="rounded-lg shadow-md object-cover w-full h-64" />
                    ))}
                  </div>
                </details>
              </div>
              {/* Department Library */}
              <div>
                <details className="border rounded-lg p-4">
                  <summary className="font-semibold cursor-pointer text-[#850209]">Department Library</summary>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img src="https://srivasaviengg.ac.in/image/ecelibrary/Deprtmnt%20Lib.JPG" alt="Department Library 1" className="rounded-lg shadow-md object-cover w-full h-64" />
                    <img src="https://srivasaviengg.ac.in/image/ecelibrary/Deprtmnt%20Lib1.JPG" alt="Department Library 2" className="rounded-lg shadow-md object-cover w-full h-64" />
                  </div>
                  <h5 className="text-center mt-4">The department runs an exclusive department Library to the benefit of Faculty as well as students.</h5>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left text-gray-500 border rounded-lg">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-2">S.No</th>
                          <th className="px-4 py-2">Academic Year</th>
                          <th className="px-4 py-2">No. of Titles</th>
                          <th className="px-4 py-2">No. of Volumes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">2018-2019</td><td className="px-4 py-2">454</td><td className="px-4 py-2">594</td></tr>
                        <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">2017-2018</td><td className="px-4 py-2">454</td><td className="px-4 py-2">594</td></tr>
                        <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">2016-2017</td><td className="px-4 py-2">437</td><td className="px-4 py-2">585</td></tr>
                        <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">2015-2016</td><td className="px-4 py-2">329</td><td className="px-4 py-2">532</td></tr>
                        <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">2014-2015</td><td className="px-4 py-2">248</td><td className="px-4 py-2">532</td></tr>
                        <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">2013-2014</td><td className="px-4 py-2">203</td><td className="px-4 py-2">498</td></tr>
                        <tr><td className="px-4 py-2">7</td><td className="px-4 py-2">2012-2013</td><td className="px-4 py-2">167</td><td className="px-4 py-2">477</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <h3 className="text-center mt-6 text-lg font-semibold">Faculty Incharge</h3>
                  <p className="text-center"><b>Phone:</b> 9010146496</p>
                  <p className="text-center"><b>Email: hyma_369@yahoo.co.in</b></p>
                </details>
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
            <h1 className="text-3xl md:text-4xl font-bold">Electronics & Communication Technology</h1>
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
        title="ECT Department"
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

export default ECTDepartment;
