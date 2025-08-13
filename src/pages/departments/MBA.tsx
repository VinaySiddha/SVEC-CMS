
import React, { useState } from 'react';
import { Briefcase, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const MBADepartment: React.FC = () => {
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

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-6">
              <div className="relative">
                <img
                  src="/mbaHosd1.jpeg"
                  alt="Mr. D. Naveen Kumar"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
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
              </div>
            </div>
            <p className="text-gray-700 mb-3">
              The Department of Business Administration was established in the year 2006. The Master of Business Administration (MBA) program is designed to meet the challenge of full-filling the needs of the society under resource constraints by providing new dimensions in the body of knowledge needed for managerial development.
            </p>
            <p className="text-gray-700 mb-3">
              The department has well qualified and dedicated faculty with diverse specializations. The department regularly conducts industrial visits, guest lectures, and workshops to enhance practical knowledge of students.
            </p>
            <p className="text-gray-700">
              The department has its own Technical Association called RAYS (Reflective Altitude Yander in Serenity) which organizes various events to develop managerial and leadership skills among students.
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
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 flex items-center"
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

            {/* Tab Content */}
            <div className="mt-6">
              {renderDeptTabContent()}
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

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#B22222] mb-4">Board of Studies Meeting Minutes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 8<sup>th</sup> meeting of the Board of Studies, dated 02.07.2025
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mba/Minutes of the Meeting - 8th BOS.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      - View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 7<sup>th</sup> meeting of the Board of Studies, dated 02.09.2024
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mba/Minutes of the Meeting - 7th BOS.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      - View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 5<sup>th</sup> meeting of the Board of Studies, dated 29.07.2022
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mba/5th%20BOS%20-%20Minutes%20of%20the%20Meeting.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      - View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 4<sup>th</sup> meeting of the Board of Studies, dated 01.09.2021
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mba/4th%20BOS%20minutes%20of%20meeting.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      - View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 3<sup>rd</sup> meeting of the Board of Studies, dated 06.06.2020
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mba/3rd%20BOS%20Minutes%20of%20meeting-1.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      - View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 2<sup>nd</sup> meeting of the Board of Studies, dated 16.04.2019
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mba/2nd%20BOS%20minutes%20of%20meeting%2016-4-2019.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      - View
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    Minutes of 1<sup>st</sup> meeting of the Board of Studies, dated 02.06.2018
                    <a
                      href="https://srivasaviengg.ac.in/uploads/mba/1ST%20BOS%20minutes%20of%20meeting%20final.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      - View
                    </a>
                  </div>
                </li>
              </ul>
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
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-4 bg-gray-100 p-3 rounded-lg">FDPs Attended</h3>
                <ul className="space-y-3 pl-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-600">•</span>
                    <div>
                      FDPs attended during the Academic Year 2022-23
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202022-23.pdf"
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
                      FDPs attended during the Academic Year 2021-22
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202021-22.pdf"
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
                      FDPs attended during the Academic Year 2020-21
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202020-21.pdf"
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
                      FDPs attended during the Academic Year 2019-20
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202019-20.pdf"
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
                      FDPs attended during the Academic Year 2018-19
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202018-19.pdf"
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
                      FDPs attended during the Academic Year 2017-18
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202017-18.pdf"
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
                      FDPs attended during the Academic Year 2016-17
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202016-17.pdf"
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
                      FDPs attended during the Academic Year 2015-16
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202015-16.pdf"
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
                      FDPs attended during the Academic Year 2014-15
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202014-15.pdf"
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
                      FDPs attended during the Academic Year 2013-14
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/FDP%202013-14.pdf"
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
          </div>
        );

      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>

            <div className="space-y-6">
              <div>
                <details open>
                  <summary className="text-xl font-semibold p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">Patents</summary>
                  <div className="mt-4 pl-4">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 text-gray-600">•</span>
                        <div>
                          Patents during the Academic Year 2021-22
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/PATENTS%201.pdf"
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

              <div>
                <details>
                  <summary className="text-xl font-semibold p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">Publications</summary>
                  <div className="mt-4 pl-4">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 text-gray-600">•</span>
                        <div>
                          Publications during the Academic Year 2022-23
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2022-23.pdf"
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
                          Publications during the Academic Year 2021-22
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2021-22.pdf"
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
                          Publications during the Academic Year 2020-21
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2020-21.pdf"
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
                          Publications during the Academic Year 2019-20
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2019-20.pdf"
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
                          Publications during the Academic Year 2018-19
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2018-19.pdf"
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
                          Publications during the Academic Year 2017-18
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2017-18.pdf"
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
                          Publications during the Academic Year 2016-17
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2016-17.pdf"
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
                          Publications during the Academic Year 2015-16
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2015-16.pdf"
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
                          Publications during the Academic Year 2014-15
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2014-15.pdf"
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
                          Publications during the Academic Year 2013-14
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2013-14.pdf"
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
                          Publications during the Academic Year 2012-13
                          <a
                            href="https://srivasaviengg.ac.in/uploads/mba/2012-13.pdf"
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
          </div>
        );

      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>

            <div className="space-y-4">
              <details open>
                <summary className="text-xl font-semibold p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                  Placement Year 2022-23
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Placements during the Academic Year 2022-23
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba_Placements%202022-23.pdf"
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
                  Placement Year 2021-22
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Placements during the Academic Year 2021-22
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba_Placements%202020-21.pdf"
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
                  Placement Year 2020-21
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Placements during the Academic Year 2020-21
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba_Placements%202020-21.pdf"
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
                  Placement Year 2019-20
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Placements during the Academic Year 2019-20
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba_Placements%202019-20.pdf"
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
                  Placement Year 2018-19
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Placements during the Academic Year 2018-19
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba_Placements%202018-19.pdf"
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
                  Placement Year 2016-17
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Placements during the Academic Year 2016-17
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba_Placements%202016-17.pdf"
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
                  Placement Year 2015-16
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Placements during the Academic Year 2015-16
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba_Placements%202015-16.pdf"
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
                  Placement Year 2014-15
                </summary>
                <div className="mt-3 ml-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-gray-600">•</span>
                      <div>
                        Placements during the Academic Year 2014-15
                        <a
                          href="https://srivasaviengg.ac.in/uploads/mba/mba_Placements%202014-15.pdf"
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
                          id="pdfDownloader8"
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
            <div className="container mt-5">
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    V21 Regulation- I Sem
                    <a
                      href="https://srivasaviengg.ac.in/uploads/autonomous_syllabus/pg/MBA%20Syllabus(V21)%20-%20I%20semester.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View
                    </a>
                  </h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    V21 Regulation - II Sem
                    <a
                      href="https://srivasaviengg.ac.in/uploads/autonomous_syllabus/pg/MBA%20Syllabus(V21)%20-%20II%20Semester.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View
                    </a>
                  </h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    V21 Regulation - III Sem
                    <a
                      href="https://srivasaviengg.ac.in/uploads/autonomous_syllabus/pg/MBA%20Syllabus(V21)%20-%20II%20Semester.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View
                    </a>
                  </h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    V21 Regulation - IV Sem
                    <a
                      href="https://srivasaviengg.ac.in/uploads/autonomous_syllabus/pg/MBA%20Syllabus(V21)%20-%20IV%20Semester.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View
                    </a>
                  </h3>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    V18 Regulation
                    <a
                      href="https://srivasaviengg.ac.in/uploads/autonomous_syllabus/pg/V18%20MBA%20SYLLABUS%20&%20COURSE%20STRUCTURE.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-600 hover:underline inline-flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      View
                    </a>
                  </h3>
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

export default MBADepartment;
