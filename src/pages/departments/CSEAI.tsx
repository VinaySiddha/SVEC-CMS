'use client'

import React, { useState } from 'react';
import { ChevronRight, Brain, BookOpen, Award, ExternalLink, Menu, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const CSEAIDepartment: React.FC = () => {
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    { id: 'Academic Toppers', label: 'Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Brain className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Brain className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">About the Department</h4>
                <div className="flex items-center mb-4">
                  <img
                    src="/hod_cai.jpg"
                    alt="Dr. G. Loshma"
                    className="w-24 h-24 rounded-full object-cover mr-6"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Dr. G. Loshma</h3>
                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, CSE(AI)</p>
                    <p className="text-gray-600">Ph.D in Computer Science</p>
                    <p className="text-gray-600">Email: <a href="mailto:hod_cai@srivasaviengg.ac.in" className="text-primary hover:underline">hod_cai@srivasaviengg.ac.in</a></p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Department of Computer Science and Engineering (Artificial Intelligence) was established with a vision to evolve as a center of academic excellence and research in the emerging field of Artificial Intelligence. Our department aims to produce globally competent and socially responsible computer professionals with technical excellence in the field of Artificial Intelligence.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to the Department of Computer Science & Engineering with specialization in Artificial Intelligence at Sri Vasavi Engineering College. Our department is dedicated to nurturing the next generation of AI professionals who will drive innovation and solve complex real-world problems.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our program focuses on providing students with a strong foundation in core computer science principles along with specialized knowledge in artificial intelligence, machine learning, deep learning, natural language processing, and related technologies. We have state-of-the-art infrastructure and computing facilities to support practical learning and research activities.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The department maintains strong industry connections to ensure our curriculum remains current with technological advancements and market demands. Our faculty members are highly qualified, experienced, and actively engaged in research, contributing to the growing field of artificial intelligence through publications, projects, and innovations.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <p className="text-gray-700 text-lg italic">
                "To evolve as a center of academic excellence and research in the emerging field of Artificial Intelligence, producing globally competent and socially responsible computer professionals with technical excellence."
              </p>
            </div>
          </div>
        );
      case 'Mission':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>To provide quality education in Computer Science & Engineering with specialization in Artificial Intelligence</li>
                <li>To promote research and innovation in AI technologies</li>
                <li>To develop industry-ready professionals with strong technical and ethical foundations</li>
                <li>To foster entrepreneurship and innovation in AI applications</li>
                <li>To inculcate ethical and social responsibility in students towards society</li>
              </ul>
            </div>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Excel in professional career and/or higher education by acquiring knowledge in mathematics, science, computer science & engineering principles with specialization in artificial intelligence.</li>
              <li>Analyze real-life problems and design socially responsible and environmentally sustainable AI-based solutions.</li>
              <li>Adapt to evolving AI technologies through continuous learning and research.</li>
              <li>Lead a successful career as a team member or as a team leader with strong professional ethics, communication skills, and awareness of the societal impact of AI technologies.</li>
              <li>To develop entrepreneurship skills and ethical values among students with special emphasis on responsible AI development.</li>
            </ul>
          </div>
        );
      case 'POs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Engineering Knowledge:</strong> Apply knowledge of mathematics, science, engineering fundamentals, and computer science & engineering principles to solve complex AI engineering problems.</li>
              <li><strong>Problem Analysis:</strong> Identify, formulate, research literature, and analyze complex engineering problems in the AI domain to arrive at substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences.</li>
              <li><strong>Design/Development of Solutions:</strong> Design solutions for complex AI engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.</li>
              <li><strong>Modern Tool Usage:</strong> Create, select, and apply appropriate techniques, resources, and modern AI engineering and IT tools for complex engineering activities with an understanding of the limitations.</li>
            </ul>
          </div>
        );
      case 'PSOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Apply standard practices and strategies in software development with a focus on AI algorithms, machine learning models, and neural networks to deliver quality AI solutions.</li>
              <li>Apply the fundamentals of computer science & engineering with artificial intelligence techniques to solve engineering problems in interdisciplinary domains.</li>
              <li>Develop applications using emerging AI technologies to provide innovative solutions for real-world problems while considering ethical implications and societal impact.</li>
            </ul>
          </div>
        );
      case 'COs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the Computer Science & Engineering (Artificial Intelligence) department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/cseai/COs.pdf"
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
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Specialized curriculum focusing on artificial intelligence, machine learning, deep learning, and related technologies</li>
              <li>Experienced faculty members with expertise in various domains of AI and machine learning</li>
              <li>State-of-the-art AI labs with high-performance computing systems and GPU resources</li>
              <li>Strong industry-institute interaction through AI-focused internships, projects, and expert lectures</li>
              <li>Research opportunities in cutting-edge AI technologies</li>
              <li>Regular workshops, seminars, and training programs on emerging AI tools and techniques</li>
              <li>Industry-relevant projects with real-world applications</li>
              <li>Focus on responsible AI development and ethical considerations</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-600">Content will be updated soon.</h3>
          </div>
        );
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
            <div className="border-t pt-6">
              {renderDeptTabContent()}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} will be updated soon.</h3>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">CSE - Artificial Intelligence</h1>
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
        title="CSE-AI Department"
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

export default CSEAIDepartment;
