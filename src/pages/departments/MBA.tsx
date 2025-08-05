
import React, { useState } from 'react';
import { Briefcase, BookOpen, Award, ExternalLink, Menu, ChevronRight, TrendingUp, Building } from 'lucide-react';

const MBADepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  const sidebarItems = [
    'Department Profile', 'Faculty Profiles', 'Board of Studies', 'Syllabus', 'Placements', 'Student Achievements'
  ];

  const faculty = [
    { name: 'Dr. Arun Krishnamurthy', position: 'Head of Department', qualification: 'Ph.D in Management, MBA Finance', experience: '28+ years', specialization: 'Strategic Management, Finance', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Dr. Deepa Nair', position: 'Professor', qualification: 'Ph.D in Marketing, MBA Marketing', experience: '22+ years', specialization: 'Digital Marketing, Consumer Behavior', image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Prof. Suresh Menon', position: 'Associate Professor', qualification: 'MBA Operations, M.Com', experience: '17+ years', specialization: 'Operations Management, Supply Chain', image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Dr. Meera Patel', position: 'Assistant Professor', qualification: 'Ph.D pursuing, MBA HR', experience: '12+ years', specialization: 'Human Resource Management, OB', image: 'https://images.pexels.com/photos/3760055/pexels-photo-3760055.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  const renderContent = () => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Dr. Arun Krishnamurthy"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  data-ai-hint="male professor"
                />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. Arun Krishnamurthy</h3>
                  <p className="text-lg text-[#8B0000] font-medium mb-2">Head of Department, MBA</p>
                  <p className="text-gray-600">Ph.D in Management, MBA Finance</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Welcome to the MBA program. Our program is designed to develop dynamic business leaders who can navigate the complexities of today's global business environment with confidence and ethical leadership."
                </p>
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
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
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-44 bg-gray-50">
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Building className="w-16 h-16 text-white mr-4" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Master of</h1>
                  <p className="text-xl text-gray-200">Business Administration</p>
                </div>
              </div>
              <p className="text-xl leading-relaxed">
                Shaping tomorrow's business leaders through comprehensive management education and strategic thinking.
              </p>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="MBA Department"
                className="rounded-2xl shadow-2xl"
                data-ai-hint="business meeting"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 lg:flex-shrink-0">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-6 sticky top-44">
                  <h3 className="text-xl font-bold mb-4 text-center">Department Menu</h3>
                  <ul className="space-y-2">
                      {sidebarItems.map((item) => (
                      <li key={item}>
                          <button
                          className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 ${activeContent === item ? 'bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white font-semibold' : 'hover:bg-white/10'}`}
                          onClick={() => setActiveContent(item)}
                          >
                          <ChevronRight className={`w-4 h-4 mr-2 transition-transform ${activeContent === item ? 'rotate-90' : ''}`} />
                          <span>{item}</span>
                          </button>
                      </li>
                      ))}
                  </ul>
              </div>
          </aside>

          <main className="flex-1">
              <div className="p-1 md:p-4">
                {renderContent()}
              </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MBADepartment;
