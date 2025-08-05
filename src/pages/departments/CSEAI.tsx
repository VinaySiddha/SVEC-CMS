
import React, { useState } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Cpu } from 'lucide-react';

const CSEAIDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Placements', 'Student Achievements'
  ];

  const faculty = [
    { name: 'Dr. Anil Kumar', position: 'Head of Department', qualification: 'Ph.D in Artificial Intelligence, M.Tech CSE', experience: '22+ years', specialization: 'Artificial Intelligence, Deep Learning', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Dr. Sneha Rani', position: 'Professor', qualification: 'Ph.D in Machine Learning, M.Tech CSE', experience: '18+ years', specialization: 'Machine Learning, Neural Networks', image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Prof. Kiran Reddy', position: 'Associate Professor', qualification: 'M.Tech AI, B.Tech CSE', experience: '14+ years', specialization: 'Computer Vision, NLP', image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Dr. Meera Sharma', position: 'Assistant Professor', qualification: 'Ph.D pursuing, M.Tech CSE', experience: '10+ years', specialization: 'Robotics, Intelligent Systems', image: 'https://images.pexels.com/photos/3760055/pexels-photo-3760055.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <section className="py-8 bg-[#FFF8F0]">
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
                        data-ai-hint="male professor"
                      />
                    </div>
                    <div className="lg:col-span-2 space-y-4">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. Anil Kumar</h3>
                        <p className="text-lg text-[#8B0000] font-medium mb-2">Head of Department, CSE(AI)</p>
                        <p className="text-gray-600">Ph.D in Artificial Intelligence, M.Tech CSE</p>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        "Welcome to the Department of Computer Science & Engineering (Artificial Intelligence). Our department specializes in cutting-edge AI technologies, machine learning algorithms, and intelligent systems that are shaping the future of technology."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'Faculty Profiles':
        return (
          <section className="py-8 bg-white">
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
                        data-ai-hint="professional portrait"
                      />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-[#B22222]">{member.name}</h3>
                      <p className="text-[#8B0000] font-medium">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      default:
        return <div className="text-center py-12"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-44 bg-gray-50">
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
              <p className="text-xl leading-relaxed">
                Leading the AI revolution with cutting-edge artificial intelligence, machine learning, and intelligent systems.
              </p>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="CSE AI Department"
                className="rounded-2xl shadow-2xl"
                data-ai-hint="programming code"
              />
            </div>
          </div>
        </div>
      </section>
      
      <div className="flex">
         <div className={`fixed lg:sticky top-44 left-0 h-screen lg:h-auto w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:flex lg:flex-col`}>
           <div className="p-6 h-full flex flex-col relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <h3 className="text-xl font-bold text-center flex-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Department Details</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0 lg:hidden"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 pr-2 max-h-full">
                {sidebarItems.map((item) => (
                  <button
                    key={item}
                    className={`sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm ${activeContent === item ? 'bg-gradient-to-r from-[#B22222]/80 to-[#0097A7]/80' : 'bg-white/5'}`}
                    onClick={() => {
                      setActiveContent(item);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className="flex-1">
          <main className="container mx-auto px-4 py-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CSEAIDepartment;
