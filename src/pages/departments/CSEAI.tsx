'use client'

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const CSEAIDepartment: React.FC = () => {
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Physical Facilities', 'Department Library', 'MoUs', 'Faculty Development Programs', 'Faculty Achievements', 'Workshops', 'Student Achievements', 'Placements', 'Academic Toppers', 'Technical Association', 'Newsletters', 'Extra-Curricular Activities', 'Hackathons', 'Handbooks', 'Contact'
  ];

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
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'SalientFeatures'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDeptTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm transition-all ${
                    activeDeptTab === tab
                      ? 'bg-[#B22222] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

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

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              <div className="bg-[#8B1919] text-white p-6">
                <h3 className="text-xl font-bold">Department Sections</h3>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item}>
                      <button
                        className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 text-sm ${activeContent === item ? 'bg-primary text-white font-semibold shadow-md' : 'hover:bg-gray-100'}`}
                        onClick={() => {
                          setActiveContent(item);
                          if (window.innerWidth < 1024) setSidebarOpen(false);
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

export default CSEAIDepartment;
