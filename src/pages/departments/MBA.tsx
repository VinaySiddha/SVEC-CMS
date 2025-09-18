
import React, { useState } from 'react';
import { Briefcase, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';
import { useEffect } from 'react';
const MBADepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [faculty, setFaculty] = React.useState<any[]>([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = React.useState<any[]>([]);
  const [boardOfStudies, setboardOfStudies] = React.useState<any[]>([]);
  const [bosMeetings, setbosMeetings] = React.useState<any[]>([]);
  const [syllabus, setSyllabus] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [facultyDev, setFacultyDev] = React.useState<any[]>([]);
  const [facultyAch, setFacultyAch] = React.useState<any[]>([]);
  const [placement, setPlacement] = React.useState<any[]>([]);
  const [StudentAch, setStudentAch] = React.useState<any[]>([]);
  useEffect(() => {
    fetch('/api/mba-student-achivements?dept=mba') // backend API URL
      .then((res) => res.json())
      .then((data) => setPlacement(data)) // assuming your API returns { placements: [...] }
      .catch((err) => console.error("Error fetching MBA Placements:", err));
  }, []);
  useEffect(() => {
    fetch('/api/mba-placement?dept=mba') // backend API URL
      .then((res) => res.json())
      .then((data) => setPlacement(data)) // assuming your API returns { placements: [...] }
      .catch((err) => console.error("Error fetching MBA Placements:", err));
  }, []);
  const groupedData = facultyAch.reduce((acc: any, curr) => {
    if (!acc[curr.type]) acc[curr.type] = [];
    acc[curr.type].push(curr);
    return acc;
  }, {})
  useEffect(() => {
    fetch('/api/mba-faculty-profiles?dept=mba') // backend API URL
      .then((res) => res.json())
      .then((data) => setFaculty(data))
      .catch((err) => console.error("Error fetching Faculty Profiles:", err));
  }, []);
  useEffect(() => {
    fetch('/api/mba-faculty-achivements?dept=mba') // backend API URL
      .then((res) => res.json())
      .then((data) => setFacultyAch(data))
      .catch((err) => console.error("Error fetching FAculty Achivements:", err));
  }, []);


  useEffect(() => {
    fetch('/api/mba-faculty-dev?dept=mba') // backend API URL
      .then((res) => res.json())
      .then((data) => setFacultyDev(data))
      .catch((err) => console.error("Error fetching MOUs:", err));
  }, []);
  React.useEffect(() => {
    fetch("/api/syllabus?dept=mba")
      .then((res) => res.json())
      .then((data) => {
        setSyllabus(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  useEffect(() => {
    fetch('/api/mba-bos-meetings?dept=mba') // backend API URL
      .then((res) => res.json())
      .then((data) => setbosMeetings(data))
      .catch((err) => console.error("Error fetching bos:", err));
  }, []);
  React.useEffect(() => {
    fetch("/api/mba-non-teaching-staff?dept=mba")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setNonTeachingFaculty(data.nonTeaching || []);
      });
  }, []);
  React.useEffect(() => {
    fetch("/api/mba-board-of-studies?dept=mba")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setboardOfStudies(data || []);
      });
  }, []);
  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Merit Scholarship/Academic Toppers', label: 'Merit Scholarship/Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Activity className="w-4 h-4" /> },
    { id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Activity className="w-4 h-4" /> },
    { id: 'e-Resources', label: 'e-Resources', icon: <Wifi className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 mb-3">
              The Department of Business Administration was established in the year 2006. The Master of Business Administration (MBA) program is designed to meet the challenge of full-filling the needs of the society under resource constraints.
            </p>
          </div>
        );
      case 'Vision':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To nurture young leaders to be global business executives with high ethical values.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To prepare business leaders by providing quality education with a strong foundation of knowledge and skills.</li>
              <li>To enhance analytical skills and decision making capabilities.</li>
              <li>To promote research and publication.</li>
              <li>To develop professionally competent and socially responsible business leaders with ethical values.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">After 3-5 years of graduation, the graduates will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Excel in business, management and leadership roles by applying management knowledge and skills.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Demonstrate ethical practices, social responsibility and professional conduct in the dynamic business environment.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Pursue higher education, research and lifelong learning to continuously upgrade knowledge and skills.</p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-4">After the completion of MBA, the graduates will be able to:</p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO1: Business Knowledge</h4>
                <p className="text-gray-700">Apply knowledge of management theories and practices to solve business problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Strategic Thinking</h4>
                <p className="text-gray-700">Foster analytical and strategic thinking abilities for decision-making.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Critical Thinking</h4>
                <p className="text-gray-700">Analyze business problems in unpredictable environments to formulate strategies.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO4: Communication Skills</h4>
                <p className="text-gray-700">Demonstrate effective oral and written communication skills in presenting business issues.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO5: Leadership and Teamwork</h4>
                <p className="text-gray-700">Demonstrate leadership and team membership skills in business scenarios.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO6: Global Perspective</h4>
                <p className="text-gray-700">Recognize global business issues and practices in an ethical, legal and professional context.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO7: Ethical Practices</h4>
                <p className="text-gray-700">Apply ethical principles to business situations and demonstrate responsible citizenship.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO8: IT Skills</h4>
                <p className="text-gray-700">Utilize appropriate technology and tools for solving business problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO9: Lifelong Learning</h4>
                <p className="text-gray-700">Recognize the need for and engage in continuous professional development.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <p className="text-gray-700 mb-4">After the completion of MBA, the graduates will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 1</h4>
                <p className="text-gray-700">Apply functional area knowledge and managerial skills to solve real-world business problems.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 2</h4>
                <p className="text-gray-700">Demonstrate entrepreneurial competencies with a global outlook on business environment.</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the MBA department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/mba/COs.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 items-center"
              >
                <Download className="w-4 h-4 mr-2" /> Download Course Outcomes
              </a>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Highly qualified and experienced faculty</li>
              <li>Well-established MoU with Star Health and Allied Insurance Company Ltd</li>
              <li>Active Technical Association (RAYS)</li>
              <li>Regular industrial visits and guest lectures</li>
              <li>Focus on practical learning through case studies</li>
              <li>Regular workshops and seminars on current business trends</li>
              <li>Good placement record in various sectors</li>
              <li>Strong alumni network in diverse industries</li>
              <li>Focus on entrepreneurship development</li>
              <li>Comprehensive training programs for skill development</li>
              <li>Regular faculty development programs</li>
            </ul>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
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

            {/* Department Profile Tab Navigation */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-[#B22222] mb-6">Department Profile</h3>

              {/* Department Profile Navigation - Grid Layout */}
              <div className="mb-8">
                {/* Row 1: Department, Vision */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={() => setActiveDeptTab('Department')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Department'
                        ? 'bg-[#B22222] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Department
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('Vision')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Vision'
                        ? 'bg-[#B22222] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Vision
                  </button>
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

                {/* Row 3: PSOs, COs */}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={() => setActiveDeptTab('PSOs')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PSOs'
                        ? 'bg-[#B22222] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    PSOs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('COs')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'COs'
                        ? 'bg-[#B22222] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    COs
                  </button>
                </div>

                {/* Row 4: Salient Features (centered) */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setActiveDeptTab('SalientFeatures')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'SalientFeatures'
                        ? 'bg-[#B22222] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Salient Features
                  </button>
                </div>
              </div>

              <div className="mt-4">
                {renderDeptTabContent()}
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
                          <a href={member.profile_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View</a>
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
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Board of Studies Members
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">S.No</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Designation</th>
                    <th scope="col" className="px-6 py-3">Organization</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {boardOfStudies.map((member: any, index: number) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4">{member.designation}</td>
                      <td className="px-6 py-4">{member.organization}</td>
                      <td className="px-6 py-4">{member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#B22222] mb-4">
                Board of Studies Meeting Minutes
              </h3>

              {bosMeetings.length === 0 ? (
                <p className="text-gray-600">No meeting minutes available.</p>
              ) : (
                <ul className="space-y-3">
                  {bosMeetings.map((meeting) => (
                    <li key={meeting.id} className="flex items-start">
                      <span className="mr-2">•</span>
                      <div>
                        Minutes of {meeting.meeting_number}
                        <sup>
                          {meeting.meeting_number === "1"
                            ? "st"
                            : meeting.meeting_number === "2"
                              ? "nd"
                              : meeting.meeting_number === "3"
                                ? "rd"
                                : "th"}
                        </sup>{" "}
                        meeting of the Board of Studies, dated{" "}
                        {new Date(meeting.meeting_date).toLocaleDateString("en-GB")}
                        <a
                          href={meeting.document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          - View
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );

      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Memorandums of Understanding (MoUs)</h2>

            <div className="space-y-6">
              {/* Star Health MOU */}
              <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Star Health and Allied Insurance Company Ltd</h3>
                    <p className="text-gray-600 mt-2">A leading health insurance provider offering comprehensive insurance solutions.</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mba/22%20Star%20Health%2020230717180414256.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Document
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Key Benefits</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Industry exposure through internships and training programs</li>
                    <li>Guest lectures by industry professionals</li>
                    <li>Career opportunities for students in the insurance sector</li>
                    <li>Research collaboration opportunities</li>
                    <li>Enhanced understanding of insurance practices and risk management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="text-lg font-semibold text-blue-800 flex items-center">
                <Handshake className="h-5 w-5 mr-2" />
                Benefits to Students
              </h4>
              <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-700">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Practical industry exposure
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Internship opportunities
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Career placement assistance
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Professional skills development
                </li>
              </ul>
            </div>
          </div>
        );

      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Faculty Development Programs
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-4 bg-gray-100 p-3 rounded-lg">
                  FDPs Attended
                </h3>
                <ul className="space-y-3 pl-4">
                  {facultyDev.length > 0 ? (
                    facultyDev.map((item: any, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-gray-600">•</span>
                        <div>
                          FDPs attended during the Academic Year {item.academic_year}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            View
                          </a>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No data available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );


      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Faculty Achievements
            </h2>

            <div className="space-y-6">
              {Object.keys(groupedData).map((type) => (
                <div key={type}>
                  <details open={type === "Patents"}>
                    <summary className="text-xl font-semibold p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                      {type}
                    </summary>
                    <div className="mt-4 pl-4">
                      <ul className="space-y-3">
                        {groupedData[type].map((item: any, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 text-gray-600">•</span>
                            <div>
                              {item.title}
                              <a
                                href={item.proof_url}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                View
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        );


      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>

            <div className="space-y-4">
              {placement?.length > 0 ? (
                placement
                  .sort((a, b) => b.academic_year.localeCompare(a.academic_year)) // optional: sort by year descending
                  .map((item, index) => (
                    <details key={index} open={index === 0}>
                      <summary className="text-xl font-semibold p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                        Placement Year {item.academic_year}
                      </summary>
                      <div className="mt-3 ml-4">
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2 text-gray-600">•</span>
                            <div>
                              <p>
                                Placements during the Academic Year {item.academic_year}
                                <a
                                  href={item.report_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                                >
                                  <FileText className="h-4 w-4 mr-1" />
                                  View
                                </a>
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </details>
                  ))
              ) : (
                <p className="text-center text-gray-500">No placement data available.</p>
              )}
            </div>
          </div>
        );
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>

            <div className="space-y-4">
              <details open>
                <summary className="text-xl font-semibold p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                  Internships
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Internships during the Academic Year 2020-22
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
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Internships during the Academic Year 2019-21
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
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Internships during the Academic Year 2018-20
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
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Internships during the Academic Year 2017-19
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
              </details>

              <details>
                <summary className="text-xl font-semibold p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                  NPTEL
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        NPTEL Certifications during Academic Year 2021-2022
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba%2021-22%20nptel.pdf"
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
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        NPTEL Certifications during Academic Year 2020-2021
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba%2020-21%20nptel.pdf"
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
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        NPTEL Certifications during Academic Year 2019-2020
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba%2019-20%20pdf.pdf"
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
              </details>

              <details>
                <summary className="text-xl font-semibold p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                  Industrial Visits
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Industrial Visits during 2012-2014 to 2022-2023
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/Industrial%20Visit.pdf"
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
              </details>
            </div>
          </div>
        );

      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>

            <div className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-gray-700">
                  The Department of Business Administration has its own Association called RAYS (Reflective Altitude Yander in
                  Serenity). RAYS is the Association name of Department of MBA of Sri Vasavi Engineering College, Pedatadepalli. The
                  association was formed during the academic year 2011-12. The formation function of the association took place on
                  31-March-2012.
                </p>

                <div className="mt-4 text-center">
                  <a
                    href="https://www.mediafire.com/download/8qh1qg6d3ws7hk3/SAADHANA+-+1ST+COPY.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#B22222] text-white rounded-md hover:bg-[#8B0000] transition-colors"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Download SAADHANA NEWS Letter
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-4">RAYS Objectives</h3>
                <ul className="space-y-4 list-disc pl-6 text-gray-700">
                  <li>Create a Flora where future managers create a dias for caringly sharing their knowledge.</li>
                  <li>To initiate a culture of togetherness in achieving synergistic results.</li>
                  <li>To implant a strong urge in everyone to rise to every opportunity and stand to the requirements of Industry.</li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-4">President's Message</h3>
                <div className="flex justify-center">
                  <img
                    src="/images/departments/mba/president.png"
                    alt="President's Message"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Secretary and Correspondent's Message</h3>
                <div className="flex justify-center">
                  <img
                    src="/images/departments/mba/secretary.png"
                    alt="Secretary and Correspondent's Message"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Newsletters</h2>
            <details open>
              <summary className="cursor-pointer font-semibold text-lg bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors">
                News Letter 2016
              </summary>
              <ul className="mt-4 space-y-3 pl-6">
                <li className="flex items-start">
                  <FileText className="h-5 w-5 mr-2 text-[#B22222] mt-0.5" />
                  <a
                    href="https://srivasaviengg.ac.in/uploads/mba/MBA%20Newsletter.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Newsletter PDF
                  </a>
                </li>
              </ul>
            </details>
          </div>
        );
      case 'Department Alumni':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Alumni</h2>
            <div className="mt-5">
              <details open>
                <summary className="cursor-pointer font-semibold text-lg bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors">
                  Core Committee 2022-2023
                </summary>
                <div className="mt-4">
                  <div className="flex justify-center items-center">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 text-[#B22222] mt-0.5" />
                        SVEC-MBA Alumni List
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/MBA%20ALUMNI%20list.pdf"
                          // ...existing code...
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
            <div className="flex justify-center items-center">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-sm text-left text-gray-500 border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="text-center py-3 px-2 font-medium text-gray-700" colSpan={7}>
                        DETAIL OF INDUSTRIAL VISITS(Total No: 01)
                      </th>
                    </tr>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="py-3 px-2 font-medium text-gray-700">S.No.</th>
                      <th className="py-3 px-2 font-medium text-gray-700">Date Of Visit</th>
                      <th className="py-3 px-2 font-medium text-gray-700">Batch</th>
                      <th className="py-3 px-2 font-medium text-gray-700 text-center">Companies Visited</th>
                      <th className="py-3 px-2 font-medium text-gray-700 text-center">Place Of Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-2 px-2">1</td>
                      <td className="py-2 px-2">08-11-2011</td>
                      <td className="py-2 px-2">2010-12</td>
                      <td className="py-2 px-2">
                        Sarvaraya Bottling Unit AP Paper Mills Limited
                      </td>
                      <td className="py-2 px-2">Rajahmundry</td>
                    </tr>
                    <tr className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-2 px-2">2</td>
                      <td className="py-2 px-2">06-03-2011</td>
                      <td className="py-2 px-2">2009-11</td>
                      <td className="py-2 px-2">
                        Delta Paper Mills Limited Meena Biscuits Limited
                      </td>
                      <td className="py-2 px-2">Bhimavaram</td>
                    </tr>
                    <tr className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-2 px-2">3</td>
                      <td className="py-2 px-2">27-10-2017</td>
                      <td className="py-2 px-2">2016-18</td>
                      <td className="py-2 px-2">
                        M/s DELTA PAPER MILLS LTD., & M/s MEENA BISCUITS, BHIMAVARAM
                      </td>
                      <td className="py-2 px-2">
                        Dr.S.KRISHNA MURTHY NAIDU <br />Mr.R.V.RAJA SEKHAR<br />
                        Ms.V.SARANYA<br />Mr.U.BHARGAVA <br />Ms.K.V.MALLESWARI
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-2 px-2">4</td>
                      <td className="py-2 px-2">20-02-2017</td>
                      <td className="py-2 px-2">2015-2017</td>
                      <td className="py-2 px-2">
                        HINDUSTAN COCACOLA BEVERAGES PVT,LTD. ATMAKUR, VIJAYAWADA
                      </td>
                      <td className="py-2 px-2">
                        V.KIRAN KUMAR <br />R.V.RAJA SEKHAR <br />Ms.V.SARANYA<br />Ms.K.V.MALLESWARI
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-2 px-2">5</td>
                      <td className="py-2 px-2">09-01-2016</td>
                      <td className="py-2 px-2">2014-2016</td>
                      <td className="py-2 px-2">MEENA BISCUITS, BHIMAVARAM</td>
                      <td className="py-2 px-2">
                        Dr.S.KRISHNA MURTHY NAIDU,<br />
                        Ms.G.NEELIMA
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-2 px-2">6</td>
                      <td className="py-2 px-2">12-03-2015</td>
                      <td className="py-2 px-2">2013-2015</td>
                      <td className="py-2 px-2">
                        HINDUSTAN COCA COLA BEVARAGES PVT., LTD., ATMAKUR, VIJAYAWADA
                      </td>
                      <td className="py-2 px-2">
                        Dr.S.KRISHNA MURTHY NAIDU, <br />Ms.V.SARANYA
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300 hover:bg-gray-50">
                      <td className="py-2 px-2">7</td>
                      <td className="py-2 px-2">26-10-2013</td>
                      <td className="py-2 px-2">2012-2014</td>
                      <td className="py-2 px-2">
                        HINDUSTAN COCA COLA BEVERAGES PVT., LTD., ATMAKUR, VIJAYAWADA
                      </td>
                      <td className="py-2 px-2">
                        Dr.S.KRISHNA MURTHY NAIDU,<br />
                        Mr.D.NAVEEN KUMAR
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>

            {loading ? (
              <p className="text-center text-gray-600">Loading syllabus...</p>
            ) : syllabus.length === 0 ? (
              <p className="text-center text-gray-600">No syllabus available.</p>
            ) : (
              <div className="container mt-5">
                <div className="grid grid-cols-1 gap-6">
                  {syllabus.map((item, index) => (
                    <div key={index} className="text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.year} - {item.title}
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                        >
                          <FileText className="h-5 w-5 mr-1" />
                          View
                        </a>
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            <h1 className="text-3xl md:text-4xl font-bold">Master of Business Administration</h1>
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
        title="MBA Department"
        buttonLabel="Department Menu"
      >
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </FixedSidebar>
    </div>
  );
};

export default MBADepartment;
