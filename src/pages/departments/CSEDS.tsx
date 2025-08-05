
import React, { useState } from 'react';
import { Database, BookOpen, Award, ExternalLink, Menu, ChevronRight } from 'lucide-react';

const CSEDSDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const navItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Placements', 'Student Achievements'
  ];

  const faculty = [
    { name: 'Dr. Rahul Sharma', position: 'Head of Department', qualification: 'Ph.D in Data Science, M.Tech CSE', experience: '21+ years', specialization: 'Data Science, Big Data Analytics', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Dr. Pooja Gupta', position: 'Professor', qualification: 'Ph.D in Data Mining, M.Tech CSE', experience: '17+ years', specialization: 'Data Mining, Statistical Analysis', image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Prof. Arjun Patel', position: 'Associate Professor', qualification: 'M.Tech Data Science, B.Tech CSE', experience: '13+ years', specialization: 'Machine Learning, Data Visualization', image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Dr. Divya Singh', position: 'Assistant Professor', qualification: 'Ph.D pursuing, M.Tech CSE', experience: '9+ years', specialization: 'Business Intelligence, Cloud Analytics', image: 'https://images.pexels.com/photos/3760055/pexels-photo-3760055.jpeg?auto=compress&cs=tinysrgb&w=300' }
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
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Dr. Rahul Sharma"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. Rahul Sharma</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Head of Department, CSE(DS)</p>
                  <p className="text-gray-600">Ph.D in Data Science, M.Tech CSE</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Welcome to the Department of Computer Science & Engineering (Data Science). Our department focuses on extracting meaningful insights from vast amounts of data using advanced analytics, machine learning, and statistical methods."
                </p>
              </div>
            </div>
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
  };

  return (
    <div className="pt-32 lg:pt-44 bg-gray-100">
      <div className="container mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white shadow-md z-40">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Database className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-primary">CSE (DS) Department</span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)}></div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className={`fixed top-0 left-0 h-full w-72 bg-gray-800 text-white p-6 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 lg:h-auto lg:rounded-2xl lg:shadow-lg lg:sticky lg:top-28`}>
            <div className="flex justify-between items-center lg:justify-center mb-6">
              <h3 className="text-xl font-bold text-center text-white">Department Menu</h3>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 text-sm font-medium ${activeContent === item ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-700'}`}
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
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 lg:pt-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CSEDSDepartment;
