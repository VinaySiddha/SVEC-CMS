import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Cpu } from 'lucide-react';

const CSEAIDepartment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Department');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tab items
  const tabs = [
    'Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'Salient Features'
  ];

  // Sidebar navigation items
  const sidebarItems = [
    'Department Profile',
    'Faculty Profiles', 
    'Board of Studies',
    'Syllabus',
    'Physical Facilities',
    'Department Library',
    'MoUs',
    'Faculty Development Programs',
    'Faculty Achievements',
    'Workshops',
    'Student Achievements',
    'Placements',
    'Merit Scholarship/Academic Toppers',
    'Technical Association',
    'Training Activities',
    'Newsletters',
    'Extra-Curricular Activities',
    'Hackthons',
    'e-Resources',
    'Handbooks',
    'Contact'
  ];

  const faculty = [
    {
      name: 'Dr. Anil Kumar',
      position: 'Head of Department',
      qualification: 'Ph.D in Artificial Intelligence, M.Tech CSE',
      experience: '22+ years',
      specialization: 'Artificial Intelligence, Deep Learning',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Dr. Sneha Rani',
      position: 'Professor',
      qualification: 'Ph.D in Machine Learning, M.Tech CSE',
      experience: '18+ years',
      specialization: 'Machine Learning, Neural Networks',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Prof. Kiran Reddy',
      position: 'Associate Professor',
      qualification: 'M.Tech AI, B.Tech CSE',
      experience: '14+ years',
      specialization: 'Computer Vision, NLP',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Dr. Meera Sharma',
      position: 'Assistant Professor',
      qualification: 'Ph.D pursuing, M.Tech CSE',
      experience: '10+ years',
      specialization: 'Robotics, Intelligent Systems',
      image: 'https://images.pexels.com/photos/3760055/pexels-photo-3760055.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  // Function to render tab content
  function renderTabContent() {
    switch (activeTab) {
      case 'Department':
        return (
          <div>
            {/* HOD Message */}
            <section className="py-16 bg-[#FFF8F0]">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Head of Department's Message</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      <div className="relative">
                        <img 
                          src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300" 
                          alt="Dr. Anil Kumar"
                          className="w-full h-80 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute -bottom-4 -right-4 bg-[#B22222] text-white px-3 py-2 rounded-lg shadow-lg">
                          <p className="font-bold text-sm">22+ Years</p>
                          <p className="text-xs">Experience</p>
                        </div>
                      </div>
                      <div className="lg:col-span-2 space-y-4">
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. Anil Kumar</h3>
                          <p className="text-lg text-[#8B0000] font-medium mb-2">Head of Department, CSE(AI)</p>
                          <p className="text-gray-600">Ph.D in Artificial Intelligence, M.Tech CSE</p>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          "Welcome to the Department of Computer Science & Engineering (Artificial Intelligence) at Sri Vasavi Engineering College. 
                          Our department specializes in cutting-edge AI technologies, machine learning algorithms, and intelligent systems 
                          that are shaping the future of technology."
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                          "We are committed to nurturing the next generation of AI specialists and researchers who will lead innovations 
                          in artificial intelligence, deep learning, and cognitive computing. Our curriculum integrates theoretical 
                          foundations with practical AI applications across various domains."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Faculty Section */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Our Faculty</h2>
                  <p className="text-xl text-gray-600">AI specialists and researchers</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {faculty.map((member, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group">
                      <div className="relative mb-6">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute -bottom-4 -right-4 bg-[#B22222] text-white px-3 py-2 rounded-lg shadow-lg">
                          <p className="font-bold text-sm">{member.experience}</p>
                          <p className="text-xs">Experience</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-[#B22222]">{member.name}</h3>
                        <p className="text-[#8B0000] font-medium">{member.position}</p>
                        <div className="text-sm text-gray-600 space-y-2">
                          <p><strong className="text-[#B22222]">Education:</strong> {member.qualification}</p>
                          <p><strong className="text-[#B22222]">Specialization:</strong> {member.specialization}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );

      case 'Vision':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Vision</h3>
            <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white p-8 rounded-xl">
              <p className="text-lg leading-relaxed">
                "To be a globally recognized department of Computer Science & Engineering (AI) that produces competent 
                professionals with expertise in artificial intelligence, machine learning, and intelligent systems to serve 
                society and contribute to technological advancement in the AI era."
              </p>
            </div>
          </div>
        );

      case 'Mission':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Mission</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <h4 className="font-bold text-[#B22222] mb-3">M1: AI Education Excellence</h4>
                <p className="text-gray-700">
                  To provide cutting-edge education in artificial intelligence through innovative 
                  teaching methodologies and industry-relevant AI curriculum.
                </p>
              </div>
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <h4 className="font-bold text-[#B22222] mb-3">M2: AI Research & Innovation</h4>
                <p className="text-gray-700">
                  To promote research and innovation in emerging areas of AI and machine learning 
                  and encourage students to develop intelligent solutions for real-world problems.
                </p>
              </div>
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <h4 className="font-bold text-[#B22222] mb-3">M3: Industry Collaboration</h4>
                <p className="text-gray-700">
                  To establish strong partnerships with AI industry leaders and provide students with 
                  practical exposure through internships and AI project development.
                </p>
              </div>
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <h4 className="font-bold text-[#B22222] mb-3">M4: Ethical AI Development</h4>
                <p className="text-gray-700">
                  To develop students' understanding of ethical AI principles and responsible AI development 
                  for positive societal impact.
                </p>
              </div>
            </div>
          </div>
        );

      case 'PEOs':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-[#B22222] pl-6 py-4">
                <h4 className="font-bold text-[#B22222] mb-2">PEO1: AI Professional Excellence</h4>
                <p className="text-gray-700">
                  Graduates will demonstrate professional excellence in AI and machine learning 
                  through successful careers in AI industry, research, or AI-driven entrepreneurship.
                </p>
              </div>
              <div className="border-l-4 border-[#0097A7] pl-6 py-4">
                <h4 className="font-bold text-[#B22222] mb-2">PEO2: Continuous AI Learning</h4>
                <p className="text-gray-700">
                  Graduates will engage in lifelong learning to stay current with rapidly evolving 
                  AI technologies and contribute to AI research and development.
                </p>
              </div>
              <div className="border-l-4 border-[#B22222] pl-6 py-4">
                <h4 className="font-bold text-[#B22222] mb-2">PEO3: Ethical AI Leadership</h4>
                <p className="text-gray-700">
                  Graduates will demonstrate leadership skills and ethical behavior in AI development 
                  and deployment for positive societal impact.
                </p>
              </div>
            </div>
          </div>
        );

      case 'POs':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Engineering knowledge: Apply knowledge of mathematics, science, and AI fundamentals.",
                "Problem analysis: Identify, formulate, and analyze complex AI problems.",
                "Design/development: Design AI solutions for complex problems.",
                "Conduct investigations: Use research-based knowledge and AI methods.",
                "Modern tool usage: Create, select, and apply appropriate AI techniques and tools.",
                "Engineer and society: Apply AI reasoning informed by contextual knowledge.",
                "Environment and sustainability: Understand impact of AI solutions on society.",
                "Ethics: Apply ethical principles in AI development and deployment.",
                "Individual and team work: Function effectively in AI development teams.",
                "Communication: Communicate effectively on complex AI activities.",
                "Project management: Demonstrate knowledge of AI project management.",
                "Life-long learning: Recognize the need for continuous AI learning."
              ].map((po, index) => (
                <div key={index} className="bg-[#FFF8F0] p-4 rounded-lg">
                  <h4 className="font-bold text-[#B22222] mb-2">PO{index + 1}</h4>
                  <p className="text-sm text-gray-700">{po}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'PSOs':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#B22222]/10 to-[#0097A7]/10 p-6 rounded-xl">
                <h4 className="font-bold text-[#B22222] mb-3">PSO1: AI Technical Proficiency</h4>
                <p className="text-gray-700">
                  Apply knowledge of artificial intelligence, machine learning algorithms, and deep learning 
                  frameworks to solve real-world AI problems.
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#0097A7]/10 to-[#B22222]/10 p-6 rounded-xl">
                <h4 className="font-bold text-[#B22222] mb-3">PSO2: AI Innovation & Research</h4>
                <p className="text-gray-700">
                  Demonstrate ability to innovate and conduct research in emerging AI areas including 
                  computer vision, natural language processing, and intelligent robotics.
                </p>
              </div>
              <div className="bg-gradient-to-r from-[#B22222]/10 to-[#0097A7]/10 p-6 rounded-xl">
                <h4 className="font-bold text-[#B22222] mb-3">PSO3: AI Professional Skills</h4>
                <p className="text-gray-700">
                  Exhibit professional competency in AI development, ethical AI practices, and teamwork 
                  required for successful careers in the AI industry.
                </p>
              </div>
            </div>
          </div>
        );

      case 'COs':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
            <div className="bg-[#FFF8F0] p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                Course Outcomes are specific to individual subjects and define what students 
                should know and be able to do at the end of each AI course.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-[#B22222] mb-2">Core AI Courses</h4>
                  <p className="text-sm text-gray-600">Machine Learning, Deep Learning, Neural Networks</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-[#B22222] mb-2">Advanced AI Courses</h4>
                  <p className="text-sm text-gray-600">Computer Vision, NLP, Reinforcement Learning</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-bold text-[#B22222] mb-2">AI Electives</h4>
                  <p className="text-sm text-gray-600">Robotics, AI Ethics, Intelligent Systems</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Salient Features':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Award className="w-12 h-12 text-[#B22222] mb-4" />
                <h4 className="font-bold text-[#B22222] mb-3">NAAC A+ Accredited</h4>
                <p className="text-gray-700">Department accredited by NAAC with A+ grade</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <BookOpen className="w-12 h-12 text-[#B22222] mb-4" />
                <h4 className="font-bold text-[#B22222] mb-3">AI-Focused Curriculum</h4>
                <p className="text-gray-700">Specialized curriculum designed for AI and ML expertise</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Cpu className="w-12 h-12 text-[#B22222] mb-4" />
                <h4 className="font-bold text-[#B22222] mb-3">AI Research Labs</h4>
                <p className="text-gray-700">State-of-the-art AI laboratories with GPU clusters</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <ExternalLink className="w-12 h-12 text-[#B22222] mb-4" />
                <h4 className="font-bold text-[#B22222] mb-3">Industry AI Partnerships</h4>
                <p className="text-gray-700">Strong partnerships with AI companies and tech giants</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">Content for {activeTab} coming soon...</h3>
          </div>
        );
    }
  }

  return (
    <div className="pt-44">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Cpu className="w-16 h-16 text-[#FFF8F0] mr-4" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Computer Science</h1>
                  <p className="text-xl text-gray-200">& Engineering (AI)</p>
                </div>
              </div>
              <p className="text-xl leading-relaxed mb-8">
                Leading the AI revolution with cutting-edge artificial intelligence, machine learning, 
                and intelligent systems for the future of technology.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#FFF8F0]">20+</div>
                  <div className="text-sm">AI Specialists</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FFF8F0]">240</div>
                  <div className="text-sm">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FFF8F0]">6</div>
                  <div className="text-sm">AI Labs</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="CSE AI Department"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs and Content */}
      <div className="relative">
        {/* Details Button - Only show when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-44 left-4 z-50 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-2 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white/20"
          >
            <Menu className="w-4 h-4" />
            <span className="font-medium">Details</span>
          </button>
        )}

        {/* Sidebar */}
        <div className={`fixed top-44 left-4 h-[calc(100vh-12rem)] w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-40 transform transition-all duration-500 ease-in-out rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10 ${
          sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}>
          <div className="p-6 h-full flex flex-col relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/5 to-[#0097A7]/5 rounded-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B22222]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0097A7]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <h3 className="text-xl font-bold text-center flex-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Department Details</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
              
              <style dangerouslySetInnerHTML={{
                __html: `
                  .sidebar-scroll {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    scroll-behavior: smooth;
                  }
                  .sidebar-scroll::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                  }
                  .sidebar-item {
                    position: relative;
                    overflow: hidden;
                  }
                  .sidebar-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: left 0.6s ease;
                  }
                  .sidebar-item:hover::before {
                    left: 100%;
                  }
                  /* Custom scrollbar track for better touch scrolling */
                  .sidebar-scroll {
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                  }
                `
              }} />
              
              <div 
                className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden space-y-3 pr-2 max-h-full"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
                onWheel={(e) => {
                  // Smooth scrolling on wheel
                  e.currentTarget.scrollBy({
                    top: e.deltaY,
                    behavior: 'smooth'
                  });
                }}
              >
                {sidebarItems.map((item, index) => (
                  <button
                    key={index}
                    className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm"
                    onClick={() => {
                      // Handle navigation to specific page
                      console.log(`Navigate to ${item}`);
                      setSidebarOpen(false); // Close sidebar when item is clicked
                    }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">{item}</span>
                    <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                  </button>
                ))}
              </div>
              
              {/* Scroll indicator */}
              <div className="flex-shrink-0 mt-4 flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <h2 className="text-3xl font-bold text-gray-600 mb-4 text-center">CSE (AI) Department</h2>
            <div className="flex flex-wrap justify-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium text-sm rounded-t-lg border border-b-0 transition-colors ${
                    activeTab === tab
                      ? 'bg-white text-[#B22222] border-[#B22222] border-b-white'
                      : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSEAIDepartment;

