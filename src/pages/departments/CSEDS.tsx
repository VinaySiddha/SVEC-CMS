
import React, { useState } from 'react';
import { Database, BookOpen, Award, ExternalLink, Menu, ChevronRight, FileText, Users, Briefcase, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

const CSEDSDepartment: React.FC = () => {
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDeptTab, setActiveDeptTab] = useState('Department');

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> }
  ];

  const faculty = [
    { name: 'Dr. G. Loshma', position: 'Professor & Head of Department', qualification: 'Ph.D, M.Tech', specialization: 'Computer Science & Engineering', email: 'hod_ds@srivasaviengg.ac.in', image: '/images/departments/cai/aihod.jpg' }
  ];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Department Overview</h3>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                The Department of Computer Science and Engineering (Data Science) came into inception from 2024 onwards with an intake of 60 seats in B.Tech.
              </p>
              <p className="mb-4">
                Data Science is a multidisciplinary field that combines mathematics, statistics, and computer science to extract knowledge and insights from structured and unstructured data. Our department focuses on providing students with the necessary skills to analyze complex data sets, develop machine learning models, and make data-driven decisions.
              </p>
              <p className="mb-4">
                The department has well-qualified faculty members with expertise in various domains like Machine Learning, Artificial Intelligence, Big Data Analytics, Data Visualization, and Statistical Analysis.
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
                "To evolve as a centre for academic and research excellence in the area of Data Science."
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
                  To utilize innovative learning methods for academic improvement.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  To encourage higher studies and research to meet the futuristic requirements of Data Science.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#B22222] shadow-sm">
                <p className="text-gray-700">
                  To inculcate Ethics and Human values for developing students with good character.
                </p>
              </div>
            </div>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 1:</h4>
                <p className="text-gray-700">
                  Adapt to evolving technology.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 2:</h4>
                <p className="text-gray-700">
                  Provide optimal solutions to real time problems.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PEO 3:</h4>
                <p className="text-gray-700">
                  Demonstrate his/her abilities to support service activities with due consideration for Professional and Ethical Values.
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
                <h4 className="font-semibold text-gray-800">PO 1: Engineering knowledge</h4>
                <p className="text-gray-700">Apply the knowledge of Mathematics, Science, Engineering Fundamentals, and Concepts of Computer Science Engineering(DS) to the solution of complex Engineering problems.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 2: Problem Analysis</h4>
                <p className="text-gray-700">Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of Mathematics, Natural Sciences, and Computer Science.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 3: Design/development of solutions</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and design system components or processes that meet the specific needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental considerations.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 4: Conduct investigations of complex problems</h4>
                <p className="text-gray-700">Use research-based knowledge and research methods, including the design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PO 5: Modern tool usage</h4>
                <p className="text-gray-700">Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modeling, to complex Engineering activities with an understanding of the limitations.</p>
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
                  Apply knowledge of data science concepts, tools, and technologies to solve real-world problems across various domains.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PSO 2:</h4>
                <p className="text-gray-700">
                  Design and implement data-driven solutions using machine learning algorithms, statistical analysis, and data visualization techniques.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800">PSO 3:</h4>
                <p className="text-gray-700">
                  Develop skills in emerging areas such as big data analytics, natural language processing, and deep learning to meet industry requirements.
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
              Each course in the CSE(DS) curriculum has specific Course Outcomes that align with the Program Outcomes and Program Specific Outcomes. These Course Outcomes are measurable and ensure that students acquire the intended knowledge and skills from each course.
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
              <li>Curriculum designed in consultation with industry experts focusing on data science skills</li>
              <li>State-of-the-art computing facilities with high-performance computing resources</li>
              <li>Specialized labs for Big Data Analytics, Machine Learning, and Data Visualization</li>
              <li>Industry partnerships for internships and project opportunities</li>
              <li>Regular workshops and guest lectures by data science professionals</li>
              <li>Focus on hands-on learning through real-world projects</li>
              <li>Research opportunities in emerging data science domains</li>
              <li>Professional development through certification programs</li>
              <li>Career guidance and placement assistance in data science roles</li>
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

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>

            {/* Tab Navigation - Similar to MBA.tsx */}
            <div className="bg-white mb-8">
              <div className="overflow-x-auto">
                <nav className="flex flex-nowrap whitespace-nowrap py-2 justify-center">
                  <button
                    onClick={() => setActiveDeptTab('Department')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'Department' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    Department
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('Vision')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'Vision' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    Vision
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('Mission')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'Mission' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('PEOs')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'PEOs' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    PEOs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('POs')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'POs' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    POs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('PSOs')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'PSOs' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    PSOs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('COs')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'COs' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    COs
                  </button>
                  <button
                    onClick={() => setActiveDeptTab('SalientFeatures')}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 mx-1 rounded-none border-b-2 
                      ${activeDeptTab === 'SalientFeatures' ? 'text-[#B22222] border-[#B22222] font-semibold' : 'text-gray-600 border-transparent hover:text-[#B22222]'}`}
                  >
                    Salient Features
                  </button>
                </nav>
              </div>
            </div>

            {/* HOD Information - Always show at the top of Department Profile */}
            {activeDeptTab === 'Department' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
                <div className="relative">
                  <img
                    src="/images/departments/cai/aihod.jpg"
                    alt="Dr. G. Loshma"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, CSE(DS)</p>
                    <p className="text-gray-600">Phone: 08818-284355 (O)-(Ext.-377)</p>
                    <p className="text-gray-600">Email: <a href="mailto:hod_ds@srivasaviengg.ac.in" className="text-primary hover:underline">hod_ds@srivasaviengg.ac.in</a></p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    "Welcome to the Department of Computer Science & Engineering (Data Science). The department came into inception from 2024 onwards with an intake of 60 seats in B.Tech. We focus on providing students with strong foundations in data science through our state-of-the-art facilities and experienced faculty."
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
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Our Faculty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faculty.map((member, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all group">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#B22222]"
                      data-ai-hint="professional portrait"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold text-[#B22222]">{member.name}</h3>
                      <p className="text-[#8B0000] font-medium">{member.position}</p>
                      <p className="text-sm text-gray-600 mt-1">{member.qualification}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center animate-fade-in"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">CSE - Data Science</h1>
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
        title="CSE-DS Department"
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

export default CSEDSDepartment;
