import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Users, BookOpen, Globe, Target, Eye, Heart, ArrowRight, Menu, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import content from '../content/about.json';

const About: React.FC = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('About SVEC');

  // Sidebar navigation items from the image
  const sidebarItems = [
    'About SVEC',
    'Board of Governance',
    'Sri Vasavi Society',
    'AQAR',
    'IQAC',
    'NSS',
    'CSI',
    'IETE',
    'Financial Statements',
    'Contact Us'
  ];

  const iconMap: { [key: string]: React.ElementType } = {
    Award,
    Users,
    BookOpen,
    Globe,
  };

  return (
    <div className="pt-24 bg-white text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-20 w-full rounded-none mb-12 overflow-hidden relative isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 relative inline-block">
            About SVEC
            <span className="text-white ml-2 text-xl md:text-2xl font-normal opacity-80">
              Est. 2001
            </span>
          </h1>
          
          
          {/* About SVEC Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white/20 mx-auto mt-4"
          >
            <Menu className="w-5 h-5" />
            <span className="font-medium">Explore About SVEC</span>
          </button>
        </div>

        {/* Subtle background shapes */}
        <div className="absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full opacity-70 shadow-sm z-0"></div>
        <div className="absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full opacity-70 shadow-sm z-0"></div>
      </section>

      {/* Navigation and Content */}
      <div className="relative">

        {/* Sidebar */}
        <div className={`fixed top-44 left-4 h-[calc(100vh-12rem)] w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-40 transform transition-all duration-500 ease-in-out rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10 ${sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}>
          <div className="p-6 h-full flex flex-col relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/5 to-[#0097A7]/5 rounded-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B22222]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0097A7]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <h3 className="text-xl font-bold text-center flex-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">About SVEC</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable navigation list */}
              <div
                className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden space-y-3 pr-2 max-h-full"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#0097A7 #222',
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
                    className={`sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm ${activeSidebarItem === item ? 'bg-primary/30 text-white font-semibold' : ''}`}
                    onClick={() => {
                      if (item === 'Contact Us') {
                        router.push('/contact');
                      } else {
                        setActiveSidebarItem(item);
                      }
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">{item}</span>
                    <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                  </button>
                ))}
              </div>

              {/* Custom scrollbar styling */}
              <style dangerouslySetInnerHTML={{
                __html: `
                  .sidebar-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #0097A7 #222;
                  }
                  .sidebar-scroll::-webkit-scrollbar {
                    width: 8px;
                    background: #222;
                  }
                  .sidebar-scroll::-webkit-scrollbar-thumb {
                    background: linear-gradient(90deg, #B22222 0%, #0097A7 100%);
                    border-radius: 8px;
                  }
                  .sidebar-scroll::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(90deg, #B22222 0%, #0097A7 100%);
                    opacity: 0.8;
                  }
                  .sidebar-scroll::-webkit-scrollbar-track {
                    background: #222;
                    border-radius: 8px;
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
                `
              }} />

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

        {/* Main Content - CASES */}
        <div>
          {activeSidebarItem === 'About SVEC' && (
            <>
              {/* Achievements */}
              <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:gWhen CSPS. And CSPS CSCS. Without CSTN on. rid-cols-2 lg:grid-cols-4 gap-8">
                    {content.achievements.map((achievement, index) => {
                      const Icon = iconMap[achievement.icon];
                      return (
                        <div key={index} className="text-center p-6 rounded-xl bg-card hover:shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02] border border-primary/10">
                          <Icon className="w-16 h-16 text-primary mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-foreground mb-2">{achievement.title}</h3>
                          <p className="text-muted-foreground">{achievement.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* About Content */}
              <section className="py-16 bg-card/50">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                        Our Story
                      </h2>
                      <div className="space-y-6 text-muted-foreground leading-relaxed text-justify">
                        <p>
                       
                      "Sri Vasavi Engineering College", considered one of the best engineering colleges in Andhra Pradesh, started its journey in the year 2001. Since its inception, the college has been striving to provide quality technical education to its students and making them industry ready. Sri Vasavi Engineering College exemplifies quality in various fields ranging from Engineering, Pharmacy to Business Administration courses and is rated as one among the top 10 engineering colleges in Andhra Pradesh. The world class laboratories, the mammoth library which radiates knowledge, audio visual classrooms with plug and play ambience, state-of-the art sports complex, Indoor stadium, seminar halls, auditorium, lawns and gardens and parking facilities make Sri Vasavi stand out among the multitude of engineering colleges in the state today.
                        </p>
                        <p>
                        Highly qualified Faculty always contributes to the knowledge levels of students and facilitate their placement in top most MNCs every year. NBA & NAAC accreditations bear testimony to top notch facilities available in the campus.SVEC became an autonomous engineering college in 2018 and is fine tuning its course curricula to suit the ever growing industry needs.
                        </p>
                        <p>SVEC started new engineering courses CST and ECT which are highly prospective in the present job scenario besides offering the best engineering courses like ECE, CSE, EEE, Mechanical and Civil. The college has an MBA wing which always strives to transform students into entrepreneurs.</p>
                        <p>The MBA wing functions like one of the best MBA colleges in A.P by infusing the students with requisite business skills. The placements division always strives hard to entice prime global and Multi-national companies to visit the SVEC campus for conducting placement drives. The NSS unit helps students to inculcate discipline and civic sense among themselves to make them responsible citizens of this nation.</p>                        
                        <p>Research and Development activities in the college represent a large and rapidly growing effort put forth by the stakeholders which creates new and improved technology that surely gives an edge over. The Eco-Friendly projects undertaken by the college started producing results in the form of awards and accolades.</p>
                        <p>The RTA approved pollution checkup center, Power generation using solar panels, Battery Vehicles designed by students, Technical exhibitions and trade shows will surely give students a practical exposure in the campus itself.</p>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src="./CollegeBuilding.jpg"
                        alt="College Campus"
                        className="rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]"
                      />
                      <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <h3 className="font-bold text-lg">25+ Years</h3>
                        <p className="text-sm">of Excellence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Vision Mission Values */}
              <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Vision */}
                    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                      <div className="p-4 bg-primary/5 rounded-full mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                        <Eye className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-foreground">Vision</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
                        To be a premier technological institute striving for excellence with global perspective and commitment to the Nation.
                      </p>
                    </div>

                    {/* Mission */}
                    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                      <div className="p-4 bg-primary/5 rounded-full mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                        <Target className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-foreground">Mission</h3>
                      <div className="text-muted-foreground leading-relaxed space-y-3 text-left w-full">
                        <div className="flex gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <p>To produce Engineering graduates of professional quality and global perspective through Learner Centric Education.</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <p>To establish linkages with government, industry and Research laboratories to promote R&D activities and to disseminate innovations.</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <p>To create an eco-system in the institute that leads to holistic development and ability for life- long learning.</p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </section>

              {/* Leadership */}
              <section className="py-12 bg-gradient-to-br from-card to-card/90 rounded-lg overflow-hidden shadow-lg">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Leadership Team</h2>
                    <p className="text-muted-foreground text-lg">Meet our distinguished leaders who guide the institution towards excellence</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Hon's President */}
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-primary/10">
                      <div className="flex flex-col items-center h-full">
                        <div className="mb-6">
                          <img
                            src="./YNS.jpg"
                            alt="Sri Yeerra Narayana Swamy"
                            className="w-88 h-64 rounded-lg object-cover object-top border-4 border-primary transform transition-all duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="text-center flex-1 flex flex-col justify-between">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-foreground mb-2">Sri Yeerra Narayana Swamy</h3>
                            <p className="text-primary font-semibold mb-3">Hon's President</p>
                            <p className="text-muted-foreground text-sm mb-2"><strong>Education:</strong> M.A., LLB., Ex. M.L.A.</p>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed text-justify">Sri Yeerra Narayana Swamy M.A., LLB., Ex. M.L.A., Tadepalligudem, who took exceptional care in moulding the college into a model institution. He is the Honorary President of the institution.</p>
                        </div>
                      </div>
                    </div>

                    {/* President */}
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-primary/10">
                      <div className="flex flex-col items-center h-full">
                        <div className="mb-6">
                          <img
                            src="./president.jpeg"
                            alt="Sri Grandhi Satyanarayana"
                            className="w-88 h-64 rounded-lg object-cover object-top border-4 border-primary transform transition-all duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="text-center flex-1 flex flex-col justify-between">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-foreground mb-2">Sri Grandhi Satyanarayana</h3>
                            <p className="text-primary font-semibold mb-3">President</p>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed text-justify">Our President, Sri Grandhi Satyanarayana has good experience in education field. He has been running a  school,colleges and degree colleges in the name of GMR Educational Institutions for the last 16 years.</p>
                        </div>
                      </div>
                    </div>

                    {/* Secretary & Correspondent */}
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-primary/10">
                      <div className="flex flex-col items-center h-full">
                        <div className="mb-6">
                          <img
                            src="./secretary.jpeg"
                            alt="Sri Ch. V. V Subba Rao"
                            className="w-88 h-64 rounded-lg object-cover object-top border-4 border-primary transform transition-all duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="text-center flex-1 flex flex-col justify-between">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-foreground mb-2">Sri Ch. V. V Subba Rao</h3>
                            <p className="text-primary font-semibold mb-3">Secretary & Correspondent</p>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed text-justify">Our Secretary & Correspondent, <b>Sri Chalamcharla V.V.Subba Rao</b>  is a personality with an enhanced caliber of leadership and assertive skills. These qualities contribute to the elevation of the institution in a big way. He revels in shaping the career of the students with his unparalleled vision and mission. He also has plans to extend his vision and goals across the man made barriers and wish to earn global reputation.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-8 md:py-12 bg-primary text-white rounded-none w-full overflow-hidden relative isolate">
                <div className="container mx-auto px-4 text-center relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Legacy</h2>
                  <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Be part of an institution that has been shaping engineers and leaders for over 25 years
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/admissions"
                      className="bg-gradient-to-r from-white to-white/90 text-primary px-8 py-4 rounded-md font-semibold hover:bg-secondary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <span>Apply Now</span>
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                    </a>
                    <a
                      href="/contact"
                      className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white/10 backdrop-blur-sm hover:border-secondary transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                      <span>Contact Us</span>
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-secondary/20 -translate-y-1/4 translate-x-1/4 opacity-70 shadow-sm z-0"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-secondary/15 translate-y-1/4 -translate-x-1/4 opacity-70 shadow-sm z-0"></div>
              </section>
            </>
          )}

          {activeSidebarItem === 'Board of Governance' && (
            <section className="py-16 bg-gradient-to-br from-background to-card/30">
              <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent">
                    Board of Governance
                  </h2>
                  <div className="max-w-4xl mx-auto">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-justify">
                      Board of governance is a deciding component of organizational effectiveness and a crucial part of the functioning of an organization. Good governance ensures that objectives are realized, resources are well managed, and the interests of stakeholders are protected and reflected in key decisions.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#0097A7] mx-auto rounded-full"></div>
                  </div>
                </div>

                {/* Introduction Card */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 mb-12 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#B22222] to-[#0097A7] rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary">Board of Governors (BOG)</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    The following distinguished members constitute the Board of Governors of Sri Vasavi Engineering College, bringing together expertise from academia, industry, and governance to guide the institution's strategic direction.
                  </p>
                </div>

                {/* Modern Table Container */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-primary/10">
                  {/* Table Header with Gradient */}
                  <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-6">
                    <h3 className="text-2xl font-bold text-white text-center">Board Members</h3>
                  </div>
                  
                  {/* Responsive Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Sr. No.</th>
                          <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Name</th>
                          <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Designation</th>
                          <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Role</th>
                          <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Contact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">1</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Sri O. P. Goenka</td>
                          <td className="px-6 py-4 text-muted-foreground">Technical Director, FFF Ltd., TPG.</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#B22222]/10 to-[#0097A7]/10 text-primary border border-primary/20">
                              Chairperson
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9848023102</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">2</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Sri Grandhi Satyanarayana</td>
                          <td className="px-6 py-4 text-muted-foreground">President of the College</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200">
                              Member (Management)
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9848105097</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">3</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Sri Ch.V.V.Subba Rao</td>
                          <td className="px-6 py-4 text-muted-foreground">Secretary & Correspondent</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200">
                              Member (Management)
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9848144836</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">4</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Sri Pabolu Venkateswara Rao</td>
                          <td className="px-6 py-4 text-muted-foreground">Joint Secretary of the College</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200">
                              Member (Management)
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9440182237</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">5</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Sri Peruri Bala Kasaiah</td>
                          <td className="px-6 py-4 text-muted-foreground">Treasurer of the College</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200">
                              Member (Management)
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9490110934</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">6</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Sri N. Rajasekhar</td>
                          <td className="px-6 py-4 text-muted-foreground">Assoc. Professor & HOD, Dept. of BSH</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200">
                              Member (Faculty)
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9885739808</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">7</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Dr. D. Jaya Kumari</td>
                          <td className="px-6 py-4 text-muted-foreground">Professor & HOD Dept. of CSE</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200">
                              Member (Faculty)
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9885066229</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">8</td>
                          <td className="px-6 py-4 font-semibold text-foreground">The Regional Officer</td>
                          <td className="px-6 py-4 text-muted-foreground">AICTE,SCRO, Hyderabad</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border border-purple-200">
                              AICTE Nominee
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">-</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">9</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Prof.(Dr.) Upendra D. Patel</td>
                          <td className="px-6 py-4 text-muted-foreground">Professor & Head, Civil Engineering Dept., The M S University of Baroda, Vadodara</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border border-orange-200">
                              UGC Nominee
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9687961022</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">10</td>
                          <td className="px-6 py-4 font-semibold text-foreground">The Regional Joint Director</td>
                          <td className="px-6 py-4 text-muted-foreground">Technical Edn., Kakinada.</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200">
                              State Govt. Nominee
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">-</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">11</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Dr. K. V. Ramana</td>
                          <td className="px-6 py-4 text-muted-foreground">Professor of CSE UCEK, JNTUK, Kakinada</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200">
                              Member
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9177780000</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">12</td>
                          <td className="px-6 py-4 font-semibold text-foreground">The Principal</td>
                          <td className="px-6 py-4 text-muted-foreground">Govt. Polytechnic, Tadepalligudem</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200">
                              SBTET Nominee
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9010222178</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">13</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Sri V. Rajanna</td>
                          <td className="px-6 py-4 text-muted-foreground">Vice President & Regional Head, Tata Consultancy Services, Hyderabad.</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700 border border-indigo-200">
                              Industry Representative
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">-</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">14</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Dr.T. Ramesh</td>
                          <td className="px-6 py-4 text-muted-foreground">Retd. Professor of CSE, NIT Warangal</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200">
                              Member
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9490455118</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">15</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Sri Ch. Apparao</td>
                          <td className="px-6 py-4 text-muted-foreground">Technical Director</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-teal-100 to-teal-50 text-teal-700 border border-teal-200">
                              Invited Member
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9705288855</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">16</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Dr. Ch. Rambabu</td>
                          <td className="px-6 py-4 text-muted-foreground">Professor & Dean (Student Affairs)</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-teal-100 to-teal-50 text-teal-700 border border-teal-200">
                              Invited Member
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9441447199</td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 group">
                          <td className="px-6 py-4 font-semibold text-primary group-hover:scale-105 transition-transform">17</td>
                          <td className="px-6 py-4 font-semibold text-foreground">Dr. G V N S R Ratnakara Rao</td>
                          <td className="px-6 py-4 text-muted-foreground">Principal</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#B22222]/10 to-[#0097A7]/10 text-primary border border-primary/20">
                              Member Secretary
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground font-mono">9490799102, 7893799102</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 text-center border border-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#B22222] to-[#0097A7] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">17</h3>
                    <p className="text-muted-foreground">Total Members</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-6 text-center border border-secondary/20 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0097A7] to-[#B22222] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">6</h3>
                    <p className="text-muted-foreground">Nominee Categories</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">25+</h3>
                    <p className="text-muted-foreground">Years of Governance</p>
                  </div>
                </div>
              </div>
            </section>
          )}

{activeSidebarItem === 'Financial Statements' && (
  <section className="py-16 bg-gradient-to-br from-background to-card/30">
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent">
          Financial Statements
        </h2>
        
      </div>

      {/* Financial Reports Section */}
      <div className="mb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { year: '2021-2022', url: './aboutus/Financial%20Reports%202021-22.pdf' },
            { year: '2020-2021', url: './aboutus/Financial%20Reports%202020-21.pdf' },
            { year: '2019-2020', url: './aboutus/Financial%20Reports%202019-20.pdf' },
            { year: '2018-2019', url: './aboutus/Financial%20Reports%202018-19.pdf' },
            { year: '2017-2018', url: './aboutus/Financial%20Reports%202017-18.pdf' },
            { year: '2016-2017', url: './aboutus/Financial%20Reports%202016-17.pdf' },
            { year: '2015-2016', url: './aboutus/Financial%20Reports%202015-16.pdf' },
            { year: '2014-2015', url: './aboutus/Financial%20Reports%202014-15.pdf' },
          ].map(({ year, url }) => (
            <a
              key={year}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border-2 border-primary/10 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-500 cursor-pointer group relative overflow-hidden transform hover:scale-105"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* PDF Icon */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 mb-2">{year}</h3>
                <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">Financial Report</p>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B22222] to-[#0097A7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </a>
          ))}
        </div>
      </div>

     
    </div>
  </section>
)}


{activeSidebarItem === 'IETE' && (
  <section className="py-16 bg-gradient-to-br from-background to-card/30">
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent">
          IETE
        </h2>
        <h3 className="text-xl text-muted-foreground mb-6 font-semibold">
          Institution of Electronics and Telecommunication Engineers
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#0097A7] mx-auto rounded-full"></div>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-primary/10 mb-12">
        <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-6">
          <h3 className="text-2xl font-bold text-white text-center">About IETE</h3>
        </div>
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="relative">
                <img src="./aboutus/ieteMain.gif" alt="IETE Logo" className="w-48 h-48 rounded-2xl shadow-xl border-4 border-primary/20 transform hover:scale-105 transition-transform duration-300" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1953</span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                The Institution of Electronics and Telecommunication Engineers (IETE) is India's leading professional society devoted to the advancement of Science and Technology of Electronics, Telecommunication & IT. Founded in 1953, it serves more than 70,000 members through 62 centres across India and abroad.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                Recognized as a Scientific and Industrial Research Organization (SIRO) and notified as an educational institution of national eminence, IETE provides leadership in scientific and technical areas of national importance. It conducts and sponsors technical meetings, conferences, symposia, and exhibitions, publishes technical journals, and offers continuing education and career advancement opportunities to its members.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">70K+</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl border border-secondary/20">
                  <div className="text-2xl font-bold text-primary">62</div>
                  <div className="text-sm text-muted-foreground">Centres</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">70+</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IETE Objectives */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-primary/10">
            <h3 className="text-2xl font-bold text-primary flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#B22222] to-[#0097A7] rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              IETE Objectives
            </h3>
          </div>
          <div className="p-8">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 mb-8 border border-blue-200">
              <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                The IETE Students' Forum started in our college in 2008 with 1000 student members, with the assistance and involvement of senior faculty members of the Institution. The IETE Centre in the region shall provide support and coordination in the establishment and the working of the forum.
              </p>
            </div>

            {/* Objectives Header */}
            <div className="mb-6">
              <h4 className="text-xl font-bold text-primary mb-4 border-b border-primary/20 pb-2">
                The IETE Students Forum shall have the following broad objectives:
              </h4>
            </div>

            {/* Main Objectives */}
            <div className="space-y-4">
              {[
                "To plan and organize technical programmes and activities such as special lectures, workshops, seminars, symposia, exhibitions etc. for the benefit of student members on a regular basis.",
                "To provide a common platform for the student members to exchange ideas and information on the topics of their interest e.g. curriculum, employment, higher educational opportunities, emerging trends, new development etc.",
                "To facilitate technical visits, practical training, project work, employment, of the student members in R&D laboratories, industries, academic institutions etc.",
                "To encourage team work and the spirit of self-reliance among the student members.",
                "To serve as a focal point at the institution on all aspects of professional development of the student members.",
                "To meet these objectives, the IETE students forum shall arrange frequent meetings of the student members together with experts of academics, R&D, industries' leaders as well as IETE centers' executive members. Programmes of common interest may also be arranged involving students forum at many institutions in the city, region etc."
              ].map((objective, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#B22222] to-[#0097A7] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-justify">{objective}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-6 border-b border-primary/10">
            <h3 className="text-2xl font-bold text-primary flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#0097A7] to-[#B22222] rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Activities & Workshops
            </h3>
          </div>
          <div className="p-8">
            <div className="space-y-6 mb-8">
              {[
                { title: "Workshop on Arduino-Device Interfacing (22nd & 23rd Feb 2017)", audience: "II B.Tech ECE Students", link: "eceguest_worksemfdpfiles/Workshop on Arduino Device Interfacing for IInd Years.pdf" },
                { title: "Workshop on ROBOTICS and IOT (6th & 7th Feb 2017)", audience: "III B.Tech ECE Students", link: "eceguest_worksemfdpfiles/Workshop on IOT & Robotics for  III rd Years.pdf" },
                { title: "Guest Lectures Conducted in ECE Department", audience: "Last 5 Academic Years under IETE Student Forum", link: "eceguest_worksemfdpfiles/Guest Lectures Conducted in ECE Department for last 5 Academic Years under IETE Student Forum.pdf" }
              ].map((activity, index) => (
                <div key={index} className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10 hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-semibold text-foreground mb-2">{activity.title}</h4>
                  <p className="text-muted-foreground mb-3">{activity.audience}</p>
                  <a href={activity.link} target="_blank" className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-200 font-medium">
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
            
            {/* Modern Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-primary/10">
              <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-4">
                <h4 className="text-xl font-bold text-white text-center">Guest Lectures & Programs</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">S.No</th>
                      <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Date</th>
                      <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Program</th>
                      <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Resource Person</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">1</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">22-09-2014 to 26-09-2014</td>
                      <td className="px-6 py-4 font-medium text-foreground">ASIC Design Flow Using MENTOR GRAPHICS Back-End Tool</td>
                      <td className="px-6 py-4 text-muted-foreground">K. S. S. Kiran, Asst. Prof.<br />P. Murali Krishna, Asst. Prof.<br />SVEC, Tadepalligudem</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">2</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">15-09-2014</td>
                      <td className="px-6 py-4 font-medium text-foreground">Engineers Day</td>
                      <td className="px-6 py-4 text-muted-foreground">Dr. J. Srihari Rao, Principal, SVEC</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">3</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">19-07-2014</td>
                      <td className="px-6 py-4 font-medium text-foreground">Aero Space Vehicles</td>
                      <td className="px-6 py-4 text-muted-foreground">Dr. J Srihari Rao, Principal, SVEC</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">4</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">27-06-2014</td>
                      <td className="px-6 py-4 font-medium text-foreground">Career Planning for Engineers</td>
                      <td className="px-6 py-4 text-muted-foreground">Mr. Sathish Alldaboina, Sr. Divisional Engineer, S.C. Railway, Guntur</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">5</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">14-11-2013</td>
                      <td className="px-6 py-4 font-medium text-foreground">Wavelets and Multi Signal Processing</td>
                      <td className="px-6 py-4 text-muted-foreground">Dr. M. Venugopala Rao, Professor, K. L. University, Vijayawada</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">6</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">27-09-2012</td>
                      <td className="px-6 py-4 font-medium text-foreground">Low Power VLSI Design and Trends</td>
                      <td className="px-6 py-4 text-muted-foreground">Dr. M. Kamaraju, Professor, Gudlavalleru Engineering College</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">7</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">15-09-2012</td>
                      <td className="px-6 py-4 font-medium text-foreground">Communication Systems</td>
                      <td className="px-6 py-4 text-muted-foreground">Prof. M.V. Raghunadh, Professor, NIT Warangal</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">8</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">15-03-2012</td>
                      <td className="px-6 py-4 font-medium text-foreground">Multi Signal Processing And Wavelets</td>
                      <td className="px-6 py-4 text-muted-foreground">Dr. Venugopala Rao, HOD, ECE, Narsaraopet Engineering College</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">9</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">12-03-2012</td>
                      <td className="px-6 py-4 font-medium text-foreground">Demand for Mobile Applications in Software Industry & Job Prospects</td>
                      <td className="px-6 py-4 text-muted-foreground">Mr. Dileep, Director, Dilven Info Solutions Pvt Ltd, Hyderabad</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">10</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">15-09-2011</td>
                      <td className="px-6 py-4 font-medium text-foreground">Modern Trends in Communications</td>
                      <td className="px-6 py-4 text-muted-foreground">Sri. G. Anantharam, GM, BSNL, W.G.Dist.</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">11</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">19-02-2011</td>
                      <td className="px-6 py-4 font-medium text-foreground">VLSI Design and Embedded System</td>
                      <td className="px-6 py-4 text-muted-foreground">Dr. N.S. Murthy, Professor, NIT Warangal</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">12</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">24-02-2011</td>
                      <td className="px-6 py-4 font-medium text-foreground">Digital Signal Processing</td>
                      <td className="px-6 py-4 text-muted-foreground">Prof. N.V. Seshagiri Rao, HOD, Sri Potti Sriramulu College of Engineering, Vijayawada</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-primary">13</td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">26-03-2010</td>
                      <td className="px-6 py-4 font-medium text-foreground">RF Engineering</td>
                      <td className="px-6 py-4 text-muted-foreground">Dr. J. Srihari Rao, Principal, GIET Rajahmundry</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-[#B22222] to-[#0097A7] rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-primary">Contact Information</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-primary/10">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-semibold text-foreground">Sri K. Santosh Surya Kiran</span>
              <span className="text-muted-foreground">- Assistant Professor, Department of ECE</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-muted-foreground">Co-ordinator</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-mono text-foreground">9491446949</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <span className="font-mono text-muted-foreground">Fax: 08818-284322</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a href="mailto:kiran2708@gmail.com" className="text-primary hover:text-secondary transition-colors duration-200 font-medium underline">kiran2708@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}


{activeSidebarItem === 'CSI' && (
  <section className="py-16 bg-gradient-to-br from-background to-card/30">
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent">
          CSI
        </h2>
        <h3 className="text-xl text-muted-foreground mb-6 font-semibold">
          Computer Society of India
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#0097A7] mx-auto rounded-full"></div>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-primary/10 mb-12">
        <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-6">
          <h3 className="text-2xl font-bold text-white text-center">About CSI</h3>
        </div>
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="relative">
                <img src="./aboutus/csu.png" alt="CSI Logo" className="w-48 h-48 rounded-2xl shadow-xl border-4 border-primary/20 transform hover:scale-105 transition-transform duration-300" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1965</span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                Formed in 1965, the Computer Society of India (CSI) has been instrumental in guiding the Indian IT industry since its formative years. Today, CSI has 70 chapters, 418 student branches, and more than 90,000 members, including India's most famous IT leaders, scientists, and academicians.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                The mission of CSI is to facilitate research, knowledge sharing, learning, and career enhancement for all categories of IT professionals, while inspiring and nurturing new entrants into the industry. CSI works closely with other industry associations, government bodies, and academia to ensure IT advancement benefits every citizen of India.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">90K+</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl border border-secondary/20">
                  <div className="text-2xl font-bold text-primary">70</div>
                  <div className="text-sm text-muted-foreground">Chapters</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">418</div>
                  <div className="text-sm text-muted-foreground">Student Branches</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* CSI Membership */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-6 border-b border-primary/10">
            <h3 className="text-xl font-bold text-primary flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              CSI Membership
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {[
                "Membership is open to all IT professionals.",
                "Categories: Individual (Fellow, Senior, Member, Associate, Student) and Institutional.",
                "Life membership available for professionals.",
                "Fellowship awarded for contributions to CSI and IT promotion."
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-muted-foreground text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSI MOUs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-6 border-b border-primary/10">
            <h3 className="text-xl font-bold text-primary flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              CSI MOUs
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                "IEEE", "MIEL", "BCS", "PMI Project Management Institute",
                "C-DAC", "eWIT (empowering women in IT)", "Microsoft", "IIT Bombay"
              ].map((mou, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100 text-center hover:shadow-md transition-all duration-300">
                  <span className="text-sm font-medium text-foreground">{mou}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Membership Benefits & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Membership Benefits */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-6 border-b border-primary/10">
            <h3 className="text-xl font-bold text-primary flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              Membership Benefits
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {[
                "Join a large community of professionals, corporates, and institutions",
                "Free CSI Communications",
                "CSI Journal, R&D Grant",
                "Concession in Events Participation",
                "Opportunity to be Office Bearer",
                "Organize and participate in events",
                "Concession in joining IEEE",
                "CSI Examinations/Certifications"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-100">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                    ★
                  </div>
                  <p className="text-muted-foreground text-sm">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 p-6 border-b border-primary/10">
            <h3 className="text-xl font-bold text-primary flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              Activities & Resources
            </h3>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground mb-6 text-justify">
              The CSI Student Branch actively conducts workshops, guest lectures, and seminars for student enrichment.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-foreground mb-2">Faculty Resources</h4>
                <a href="./aboutus/csifaculty-17-18.pdf" target="_blank" className="text-primary hover:text-secondary transition-colors duration-200 font-medium underline">
                  Life Membership of Faculty Members
                </a>
              </div>
              <div className="p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100">
                <h4 className="font-semibold text-foreground mb-2">Student Resources</h4>
                <a href="./aboutus/csi-student.pdf" target="_blank" className="text-primary hover:text-secondary transition-colors duration-200 font-medium underline">
                  CSI Registered Students List
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Year Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10 mb-12">
        <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-6">
          <h3 className="text-2xl font-bold text-white text-center">Academic Year Registrations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Academic Year</th>
                <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Registered Members</th>
                <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">CSI Committee Members</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2017-18</td>
                <td className="px-6 py-4 text-muted-foreground">Under Progress</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> Majety</div>
                    <div><strong>Secretary:</strong> Rallapalli Mounica</div>
                    <div><strong>Treasurer:</strong> K N Krishnaveni</div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2016-17</td>
                <td className="px-6 py-4 text-muted-foreground">CSE: 146</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> Yeggina Ramya</div>
                    <div><strong>Secretary:</strong> S R Sesha Reddy</div>
                    <div><strong>Treasurer:</strong> K N Krishnaveni</div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2015-16</td>
                <td className="px-6 py-4 text-muted-foreground">-</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> B S Srivalli</div>
                    <div><strong>Secretary:</strong> G Anusha</div>
                    <div><strong>Treasurer:</strong> I S Harshitha</div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2014-15</td>
                <td className="px-6 py-4 text-muted-foreground">CSE: 25</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> N Sreeja</div>
                    <div><strong>Secretary:</strong> Eswar Durga Prasad</div>
                    <div><strong>Treasurer:</strong> M Hema Latha</div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2013-14</td>
                <td className="px-6 py-4 text-muted-foreground">CSE: 77<br />IT: 39</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> Satti Yogendra Reddy</div>
                    <div><strong>Secretary:</strong> Vemana Vidya</div>
                    <div><strong>Treasurer:</strong> Maka Naveen Kumar</div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2012-13</td>
                <td className="px-6 py-4 text-muted-foreground">CSE: 54<br />IT: 45<br />MCA: 20</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> Mullapudi Mounica</div>
                    <div><strong>Secretary:</strong> N Teja Ram</div>
                    <div><strong>Treasurer:</strong> S J V Kishore</div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2011-12</td>
                <td className="px-6 py-4 text-muted-foreground">CSE: 11<br />IT: 03<br />MCA: 01</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> B Deepthi</div>
                    <div><strong>Secretary:</strong> Ch N V Vijay Krishna</div>
                    <div><strong>Treasurer:</strong> V V N S S S Chandra Sekhar</div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2010-11</td>
                <td className="px-6 py-4 text-muted-foreground">CSE: 42<br />IT: 32<br />MCA: 01</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> B Ramesh Reddy</div>
                    <div><strong>Secretary:</strong> Narayana Swamy</div>
                    <div><strong>Treasurer:</strong> Suresh K</div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">2009-10</td>
                <td className="px-6 py-4 text-muted-foreground">CSE: 70<br />IT: 33<br />MCA: 43<br />EEE: 3<br />ECE: 31</td>
                <td className="px-6 py-4 text-muted-foreground">
                  <div className="space-y-1">
                    <div><strong>President:</strong> Sandeep</div>
                    <div><strong>Secretary:</strong> nitya Sai</div>
                    <div><strong>Treasurer:</strong> Ramesh Babu</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conducted Events Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10 mb-12">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
          <h3 className="text-2xl font-bold text-white text-center">Conducted Events (Year Wise)</h3>
        </div>
        <div className="p-8 space-y-12">
          
          {/* 2017-18 Events */}
          <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-6 border border-green-200">
            <h4 className="text-xl font-bold text-green-700 mb-6 text-center border-b border-green-200 pb-2">2017-18</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-green-100 to-green-50">
                    <th className="px-4 py-3 text-left font-bold text-green-700 border-b border-green-200">SNo</th>
                    <th className="px-4 py-3 text-left font-bold text-green-700 border-b border-green-200">Event Name</th>
                    <th className="px-4 py-3 text-left font-bold text-green-700 border-b border-green-200">Speaker/Institute</th>
                    <th className="px-4 py-3 text-left font-bold text-green-700 border-b border-green-200">Date</th>
                    <th className="px-4 py-3 text-left font-bold text-green-700 border-b border-green-200">Audience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-100">
                  <tr className="hover:bg-green-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-green-600">1</td>
                    <td className="px-4 py-3 text-foreground">CSI One day Workshop on Swift Programming</td>
                    <td className="px-4 py-3 text-muted-foreground">Mr Hemanth Alluri, iOS Instructor, SRM University Chennai</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">26-07-2017</td>
                    <td className="px-4 py-3 text-muted-foreground">III yr CSE – B&D</td>
                  </tr>
                  <tr className="hover:bg-green-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-green-600">2</td>
                    <td className="px-4 py-3 text-foreground">CSI One day Workshop on Swift Programming</td>
                    <td className="px-4 py-3 text-muted-foreground">Mr Hemanth Alluri, iOS Instructor, SRM University Chennai</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">25-07-2017</td>
                    <td className="px-4 py-3 text-muted-foreground">III yr CSE –A&C</td>
                  </tr>
                  <tr className="hover:bg-green-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-green-600">3</td>
                    <td className="px-4 py-3 text-foreground">Guest Lecture on Microservices, Cyber Security and Serverless computing using AWS Lambda</td>
                    <td className="px-4 py-3 text-muted-foreground">Mr. Boppana Bhanu Prakash, Software Developer at Cloudfabrix, Hyderabad</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">17-03-2018</td>
                    <td className="px-4 py-3 text-muted-foreground">I, II, III & IV yr. CSE Students</td>
                  </tr>
                  <tr className="hover:bg-green-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-green-600">4</td>
                    <td className="px-4 py-3 text-foreground">Engineer's Day Celebrations</td>
                    <td className="px-4 py-3 text-muted-foreground">-</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">15-09-2017</td>
                    <td className="px-4 py-3 text-muted-foreground">CSE Students</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2016-17 Events */}
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 border border-blue-200">
            <h4 className="text-xl font-bold text-blue-700 mb-6 text-center border-b border-blue-200 pb-2">2016-17</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100 to-blue-50">
                    <th className="px-4 py-3 text-left font-bold text-blue-700 border-b border-blue-200">SNo</th>
                    <th className="px-4 py-3 text-left font-bold text-blue-700 border-b border-blue-200">Event Name</th>
                    <th className="px-4 py-3 text-left font-bold text-blue-700 border-b border-blue-200">Speaker/Institute</th>
                    <th className="px-4 py-3 text-left font-bold text-blue-700 border-b border-blue-200">Date</th>
                    <th className="px-4 py-3 text-left font-bold text-blue-700 border-b border-blue-200">Audience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  <tr className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-blue-600">1</td>
                    <td className="px-4 py-3 text-foreground">Guest Lecture on Emerging Trends In Computer Science</td>
                    <td className="px-4 py-3 text-muted-foreground">Dr. M M Naidu Dean, Veltech University, Chennai</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">24-12-2016</td>
                    <td className="px-4 py-3 text-muted-foreground">III yr CSE</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-blue-600">2</td>
                    <td className="px-4 py-3 text-foreground">Guest Lecture on Landscape of Wireless Communications</td>
                    <td className="px-4 py-3 text-muted-foreground">Mr. A Radha Krishna, Co-founder, thingTronics, Bengalore</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">15-07-2016</td>
                    <td className="px-4 py-3 text-muted-foreground">Final year CSE</td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-blue-600">3</td>
                    <td className="px-4 py-3 text-foreground">Guest Lecture on Internet of Things</td>
                    <td className="px-4 py-3 text-muted-foreground">Mr. Lovelesh Patel, Co-founder, thingTronics, Bengalore</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">15-07-2016</td>
                    <td className="px-4 py-3 text-muted-foreground">III yr CSE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Continue with other years in similar format */}
          {/* 2015-16 Events */}
          <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border border-purple-200">
            <h4 className="text-xl font-bold text-purple-700 mb-6 text-center border-b border-purple-200 pb-2">2015-16</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-100 to-purple-50">
                    <th className="px-4 py-3 text-left font-bold text-purple-700 border-b border-purple-200">SNo</th>
                    <th className="px-4 py-3 text-left font-bold text-purple-700 border-b border-purple-200">Event Name</th>
                    <th className="px-4 py-3 text-left font-bold text-purple-700 border-b border-purple-200">Speaker/Institute</th>
                    <th className="px-4 py-3 text-left font-bold text-purple-700 border-b border-purple-200">Date</th>
                    <th className="px-4 py-3 text-left font-bold text-purple-700 border-b border-purple-200">Audience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100">
                  <tr className="hover:bg-purple-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-purple-600">1</td>
                    <td className="px-4 py-3 text-foreground">Guest Lecture on Shell Scripting</td>
                    <td className="px-4 py-3 text-muted-foreground">Mr Ch Vijay Krishna, Software Engineering JDA Software Pvt Ltd. Hyderabad</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">17-08-2015</td>
                    <td className="px-4 py-3 text-muted-foreground">Final year CSE</td>
                  </tr>
                  <tr className="hover:bg-purple-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-purple-600">2</td>
                    <td className="px-4 py-3 text-foreground">Engineers Day</td>
                    <td className="px-4 py-3 text-muted-foreground">College Level Symposium</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">15-09-2015</td>
                    <td className="px-4 py-3 text-muted-foreground">III and IV year Students</td>
                  </tr>
                  <tr className="hover:bg-purple-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-purple-600">3</td>
                    <td className="px-4 py-3 text-foreground">Two Day Workshop on TECH I/O</td>
                    <td className="px-4 py-3 text-muted-foreground">Mr. G Vidya Sagar, CEO, inn Data Analytics Pvt Ltd, Vijayawada</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">04-08-2015</td>
                    <td className="px-4 py-3 text-muted-foreground">Final year IT and CSE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2014-15 Events */}
          <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-6 border border-red-200">
            <h4 className="text-xl font-bold text-red-700 mb-6 text-center border-b border-red-200 pb-2">2014-15</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-red-100 to-red-50">
                    <th className="px-4 py-3 text-left font-bold text-red-700 border-b border-red-200">SNo</th>
                    <th className="px-4 py-3 text-left font-bold text-red-700 border-b border-red-200">Event Name</th>
                    <th className="px-4 py-3 text-left font-bold text-red-700 border-b border-red-200">Speaker/Institute</th>
                    <th className="px-4 py-3 text-left font-bold text-red-700 border-b border-red-200">Date</th>
                    <th className="px-4 py-3 text-left font-bold text-red-700 border-b border-red-200">Audience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-100">
                  <tr className="hover:bg-red-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-red-600">1</td>
                    <td className="px-4 py-3 text-foreground">Guest Lecture on An Insight to Cloud Computing</td>
                    <td className="px-4 py-3 text-muted-foreground">Dr. Y S S R Murthy, Dean Academics and CSE HOD, Sri Vishnu Engg College for Women</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">30-06-2014</td>
                    <td className="px-4 py-3 text-muted-foreground">Final year IT and CSE</td>
                  </tr>
                  <tr className="hover:bg-red-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-red-600">2</td>
                    <td className="px-4 py-3 text-foreground">UML and Design Patterns using IBM Rational Tools</td>
                    <td className="px-4 py-3 text-muted-foreground">Mr. Venu Thadiparthi</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">16-09-2014</td>
                    <td className="px-4 py-3 text-muted-foreground">CSE, IT Students</td>
                  </tr>
                  <tr className="hover:bg-red-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-red-600">3</td>
                    <td className="px-4 py-3 text-foreground">Spirituality in Computer Era</td>
                    <td className="px-4 py-3 text-muted-foreground">Dr Garikipati Narasimha Rao, Spiritual Orator Hyderabad</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">11-10-2014</td>
                    <td className="px-4 py-3 text-muted-foreground">CSE and IT Students</td>
                  </tr>
                  <tr className="hover:bg-red-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-red-600">4</td>
                    <td className="px-4 py-3 text-foreground">One day Workshop on Apple iOS</td>
                    <td className="px-4 py-3 text-muted-foreground">Hemath Alluri, Apple iOS Instructor, SRM University, Chennai</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">07-03-2015</td>
                    <td className="px-4 py-3 text-muted-foreground">CSE and IT Students</td>
                  </tr>
                  <tr className="hover:bg-red-50 transition-colors duration-200">
                    <td className="px-4 py-3 font-semibold text-red-600">5</td>
                    <td className="px-4 py-3 text-foreground">Opportunities and How to Acquire the Required Skills to Grab Them</td>
                    <td className="px-4 py-3 text-muted-foreground">Sita Ram Srinivas PV, Co-Founder and Managing partner, Talent Cafe Technologies Pvt. Ltd.</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">01-09-2014</td>
                    <td className="px-4 py-3 text-muted-foreground">CSE and IT Students</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Continuing with remaining years in condensed format for brevity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 2013-14 */}
            <div className="bg-gradient-to-r from-yellow-50 to-white rounded-xl p-6 border border-yellow-200">
              <h4 className="text-xl font-bold text-yellow-700 mb-4 text-center border-b border-yellow-200 pb-2">2013-14</h4>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h5 className="font-semibold text-yellow-700 mb-1">CSI Student Convention @ AU Campus</h5>
                  <p className="text-sm text-muted-foreground">15-16 Dec 2013 - Industrial Visit</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h5 className="font-semibold text-yellow-700 mb-1">CSI Fest 2K14</h5>
                  <p className="text-sm text-muted-foreground">08 Feb 2014 - Inter college event with 10 Events</p>
                </div>
              </div>
            </div>

            {/* 2012-13 */}
            <div className="bg-gradient-to-r from-indigo-50 to-white rounded-xl p-6 border border-indigo-200">
              <h4 className="text-xl font-bold text-indigo-700 mb-4 text-center border-b border-indigo-200 pb-2">2012-13</h4>
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h5 className="font-semibold text-indigo-700 mb-1">Human Machine Interaction</h5>
                  <p className="text-sm text-muted-foreground">21 Sep 2012 - Microsoft Speech API</p>
                  <p className="text-xs text-muted-foreground">Speaker: J. Nagababu, Wipro Technologies</p>
                </div>
              </div>
            </div>

            {/* 2011-12 */}
            <div className="bg-gradient-to-r from-teal-50 to-white rounded-xl p-6 border border-teal-200">
              <h4 className="text-xl font-bold text-teal-700 mb-4 text-center border-b border-teal-200 pb-2">2011-12</h4>
              <div className="space-y-3">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h5 className="font-semibold text-teal-700 mb-1">Workshop on Ethical Hacking</h5>
                  <p className="text-sm text-muted-foreground">16 Dec 2011 - Cyber Forensics</p>
                  <p className="text-xs text-muted-foreground">CYBER CURE SOLUTIONS, DELHI</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <h5 className="font-semibold text-teal-700 mb-1">Classic Problems & New Technologies</h5>
                  <p className="text-sm text-muted-foreground">08 Aug 2011</p>
                  <p className="text-xs text-muted-foreground">Dr. Suresh Chandra Satapathy</p>
                </div>
              </div>
            </div>

            {/* 2010-11 */}
            <div className="bg-gradient-to-r from-pink-50 to-white rounded-xl p-6 border border-pink-200">
              <h4 className="text-xl font-bold text-pink-700 mb-4 text-center border-b border-pink-200 pb-2">2010-11</h4>
              <div className="space-y-3">
                <div className="p-3 bg-pink-50 rounded-lg">
                  <h5 className="font-semibold text-pink-700 mb-1">EXPO-2010</h5>
                  <p className="text-sm text-muted-foreground">13 Sep 2010</p>
                  <p className="text-xs text-muted-foreground">By CSI student team SVEC</p>
                </div>
              </div>
            </div>

            {/* 2009-10 */}
            <div className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-6 border border-orange-200 md:col-span-2">
              <h4 className="text-xl font-bold text-orange-700 mb-4 text-center border-b border-orange-200 pb-2">2009-10</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h5 className="font-semibold text-orange-700 mb-1">Tree Plantation Program</h5>
                  <p className="text-sm text-muted-foreground">30 Jun 2009</p>
                  <p className="text-xs text-muted-foreground">N Ramanadhan, Director CSI (Education)</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h5 className="font-semibold text-orange-700 mb-1">Effective Teaching Methodologies</h5>
                  <p className="text-sm text-muted-foreground">30 Jun 2009</p>
                  <p className="text-xs text-muted-foreground">N Ramanadhan, Director CSI (Education)</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h5 className="font-semibold text-orange-700 mb-1">Workshop on Technology Tool Kit</h5>
                  <p className="text-sm text-muted-foreground">25 Feb 2009</p>
                  <p className="text-xs text-muted-foreground">ENHANCE-EDU IIIT-HYDERABAD</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h5 className="font-semibold text-orange-700 mb-1">Trends in Data Mining</h5>
                  <p className="text-sm text-muted-foreground">08 Aug 2009</p>
                  <p className="text-xs text-muted-foreground">Dr. R B V SUBRAMANYAM, NIT WARANGAL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-[#B22222] to-[#0097A7] rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-primary">Contact Information</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-primary/10">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-semibold text-foreground">Mr. G. Nataraj</span>
              <span className="text-muted-foreground">- Sr. Assistant Professor, Department of CSE</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-mono text-foreground">08818-284355 (O)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-mono text-foreground">9989808906</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <span className="font-mono text-muted-foreground">Fax: 08818-284322</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a href="mailto:nfornataraj@gmail.com" className="text-primary hover:text-secondary transition-colors duration-200 font-medium underline">nfornataraj@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}



{activeSidebarItem === 'NSS' && (
  <section className="py-16 bg-gradient-to-br from-background to-card/30">
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent">
          NSS
        </h2>
        <h3 className="text-xl text-muted-foreground mb-6 font-semibold">
          National Service Scheme
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#0097A7] mx-auto rounded-full"></div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-green-700">Event Registration</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">Register for upcoming NSS events and activities</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdMuvjGnUaW81JqwgQupOvf7_NYMxDAH9NDs670W6treQKoIg/viewform" target="_blank" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
            Register Now
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-red-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-red-700">Blood Donation</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">Join our blood donation campaigns</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScoWt9vDkjkidEgnWzpf6wl2wawDMsgTlgRJtHgs2YF9qWWKw/viewform" target="_blank" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium">
            Register for Donation
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-blue-700">NSS Enrollment</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">Enroll for NSS 2024-25 academic year</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf4x-7XTlBRhCGK-RcSn_CFkOVEtg5AcgftFZihg_k3P6J3hw/viewform" target="_blank" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            Enroll Now
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* NSS Resources & Documents */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10 mb-12">
        <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-6">
          <h3 className="text-2xl font-bold text-white text-center">NSS Resources & Reports</h3>
        </div>
        <div className="p-8">
          {/* Registration and Forms Section */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-primary mb-4 border-b border-primary/20 pb-2">Registration & Forms</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300">
                <h5 className="text-lg font-semibold text-blue-700 mb-2">NSS Enrollment 2024-25</h5>
                <p className="text-blue-600 text-sm mb-3">Register for NSS during Academic Year 2024-25</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSf4x-7XTlBRhCGK-RcSn_CFkOVEtg5AcgftFZihg_k3P6J3hw/viewform" target="_blank" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Click Here
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="p-4 rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all duration-300">
                <h5 className="text-lg font-semibold text-orange-700 mb-2">JNTUK Registration Form</h5>
                <p className="text-orange-600 text-sm mb-3">NSS Volunteer Registration Form</p>
                <a href="./aboutus/JNTUK_NSS_VolunteerRegistration.pdf" target="_blank" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium">
                  Download
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Annual Reports Section */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-primary mb-4 border-b border-primary/20 pb-2">Annual Reports</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { year: "2022-2023 Unit-II", link: "./aboutus/NSS Anual Report 2022-2023 Unit-II.pdf", color: "green" },
                { year: "2022-2023 Unit-I", link: "./aboutus/NSS Anual Report 2022-2023 Unit-I.pdf", color: "green" },
                { year: "2021-2022", link: "./aboutus/NSS Anual Report 2021-2022.pdf", color: "green" },
                { year: "2020-2021", link: "./aboutus/NSS Anual Report 2020-2021.pdf", color: "green" },
                
              ].map((report, index) => (
                <div key={index} className="p-4 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300">
                  <h5 className="text-lg font-semibold text-green-700 mb-2">NSS Annual Report</h5>
                  <p className="text-green-600 text-sm mb-3">{report.year}</p>
                  <a href={report.link} target="_blank" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                    Click Here
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting Minutes Section */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-primary mb-4 border-b border-primary/20 pb-2 flex items-center">
              Meeting Minutes 
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <img src="background/new.gif" alt="new" className="w-4 h-4 mr-1" />
                New
              </span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { year: "2022-2023 Unit 2", link: "./aboutus/NSS MINUTES OF MEETING 2022-23 unit 2.pdf", isNew: true },
                { year: "2022-2023 Unit 1", link: "./aboutus/NSS MINUTES OF MEETING 2022-23 unit 1.pdf", isNew: true },
                { year: "2021-2022", link: "./aboutus/NSS MINUTES OF MEETING 2021-22.pdf", isNew: true },
                { year: "2020-2021", link: "./aboutus/NSS MINUTES OF MEETING 2020-21.pdf", isNew: true },
                { year: "2019-2020", link: "./aboutus/NSS MINUTES OF MEETINGS( 2019-20).pdf", isNew: false },
                { year: "Board of Studies 28-11-2023", link: "./aboutus/Minutes of meetings BOS,NSS&SPORTS.pdf", isNew: false }
              ].map((meeting, index) => (
                <div key={index} className="p-4 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="text-lg font-semibold text-purple-700">NSS Minutes</h5>
                    {meeting.isNew && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <img src="background/new.gif" alt="new" className="w-3 h-3 mr-1" />
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-purple-600 text-sm mb-3">{meeting.year}</p>
                  <a href={meeting.link} target="_blank" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                    Click Here
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Special Reports Section */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-primary mb-4 border-b border-primary/20 pb-2">Special Reports & Activities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "PSSC Preliminary Report", link: "./aboutus/Nss_Report PSSC_1.pdf", color: "indigo" },
                { title: "International Yoga Day 2021", subtitle: "Action Taken Report", link: "./aboutus/SVEC Action Taken Report on International Yoga Day 2021.pdf", color: "yellow" },
                { title: "Psycho-Social Support Cell", subtitle: "Final Report", link: "./aboutus/A Final Report on Psycho-Social Support Cell.pdf", color: "pink" }
              ].map((report, index) => (
                <div key={index} className={`p-4 rounded-xl border border-${report.color}-200 bg-gradient-to-br from-${report.color}-50 to-white hover:shadow-lg transition-all duration-300`}>
                  <h5 className={`text-lg font-semibold text-${report.color}-700 mb-2`}>{report.title}</h5>
                  {report.subtitle && <p className={`text-${report.color}-600 text-sm mb-3`}>{report.subtitle}</p>}
                  <a href={report.link} target="_blank" className={`inline-flex items-center text-${report.color}-600 hover:text-${report.color}-700 font-medium`}>
                    Click Here
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Selection Lists Section */}
          <div className="mb-6">
            <h4 className="text-xl font-bold text-primary mb-4 border-b border-primary/20 pb-2">Volunteer Selection Lists</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Shortlisted Students", subtitle: "Final Selection", link: "./aboutus/nss_sel_list.pdf", color: "teal" },
                { title: "NSS Volunteers Unit-II", subtitle: "2023-2025", link: "./aboutus/List of NSS Volunteers of Unit-II.pdf", color: "teal" },
                { title: "NSS Volunteers Unit-I", subtitle: "2023-2025", link: "./aboutus/List of NSS Volunteers of Unit-I.pdf", color: "teal" },
                { title: "Final Selection List", subtitle: "2019", link: "./aboutus/nss_final_sel_list.pdf", color: "teal" }
              ].map((list, index) => (
                <div key={index} className="p-4 rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white hover:shadow-lg transition-all duration-300">
                  <h5 className="text-lg font-semibold text-teal-700 mb-2">{list.title}</h5>
                  <p className="text-teal-600 text-sm mb-3">{list.subtitle}</p>
                  <a href={list.link} target="_blank" className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium">
                    Click Here
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">NSS Queries</h3>
          <p className="text-muted-foreground mb-6">
            <span className="text-blue-600 font-medium">If students have any queries about NSS send a mail to </span>
            <span className="text-[#bd3c00] font-medium text-lg">hod_bsh@srivasaviengg.ac.in</span>
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white rounded-lg hover:shadow-lg transition-all duration-300">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:hod_bsh@srivasaviengg.ac.in" className="font-semibold">hod_bsh@srivasaviengg.ac.in</a>
          </div>
        </div>
      </div>
    </div>
  </section>
)}


{activeSidebarItem === 'AQAR' && (
  <section className="py-16 bg-gradient-to-br from-background to-card/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent">
          AQAR
        </h2>
        <h3 className="text-xl text-muted-foreground mb-6 font-semibold">
          Annual Quality Assurance Report
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#0097A7] mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Student Satisfaction Survey */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-6">
            <h3 className="text-2xl font-bold text-primary text-center">Student Satisfaction Survey</h3>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {[
                { year: "2021-22", link: "./aboutus/NAAC SSS 2021-22.pdf" },
                { year: "2020-21", link: "./aboutus/NAAC SSS 2020-21.pdf" },
                { year: "2019-20", link: "./aboutus/NAAC SSS 2019-20.pdf" }
              ].map((survey, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100 flex justify-between items-center hover:shadow-md transition-all duration-300">
                  <span className="font-medium text-foreground">SSS Report {survey.year}</span>
                  <a href={survey.link} target="_blank" className="text-blue-600 hover:text-blue-700 font-medium">
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AQAR Reports */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-6">
            <h3 className="text-2xl font-bold text-primary text-center">AQAR Reports</h3>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {[
                { year: "2021-22", link: "./aboutus/SVEC-AQAR-2021-22.pdf" },
                { year: "2020-21", link: "./aboutus/SVEC-AQAR-2020-21.pdf" },
                { year: "2019-20", link: "./aboutus/SVEC-AQAR-2019-20.pdf" },
                { year: "2018-19", link: "./aboutus/SVEC-AQAR-2018-19.pdf" },
                { year: "2017-18", link: "./aboutus/SVEC-AQAR-2017-18.pdf" },
                { year: "2016-17", link: "./aboutus/SVEC-AQAR-2016-17.pdf" }
              ].map((report, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100 flex justify-between items-center hover:shadow-md transition-all duration-300">
                  <span className="font-medium text-foreground">AQAR {report.year}</span>
                  <a href={report.link} target="_blank" className="text-green-600 hover:text-green-700 font-medium">
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Calendars */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10 mt-12">
        <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-6">
          <h3 className="text-2xl font-bold text-white text-center">Academic Calendars</h3>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { year: "2022-23", link: "./aboutus/Academic-2022-23.pdf" },
              { year: "2021-22", link: "./aboutus/Academic-2021-22.pdf" },
              { year: "2020-21", link: "./aboutus/Academic-2020-21.pdf" },
              { year: "2019-20", link: "./aboutus/Academic-2019-20.pdf" },
              { year: "2018-19", link: "./aboutus/Academic-2018-19.pdf" },
              { year: "2017-18", link: "./aboutus/Academic-2017-18.pdf" },
              { year: "2016-17", link: "./aboutus/Academic-2016-17.pdf" }
            ].map((calendar, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-purple-700 mb-2">{calendar.year}</h4>
                <a href={calendar.link} target="_blank" className="text-purple-600 hover:text-purple-700 font-medium underline">
                  View Calendar
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)}{activeSidebarItem === 'IQAC' && (
  <section className="py-16 bg-gradient-to-br from-background to-card/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent">
          IQAC
        </h2>
        <h3 className="text-xl text-muted-foreground mb-6 font-semibold">
          Internal Quality Assurance Cell
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#0097A7] mx-auto rounded-full"></div>
      </div>

      {/* About IQAC */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10 mb-12">
        <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-6">
          <h3 className="text-2xl font-bold text-white text-center">About IQAC</h3>
        </div>
        <div className="p-8">
          <div className="space-y-6 text-muted-foreground leading-relaxed text-justify">
            <p>As per the guidelines of National Assessment & Accreditation Council (NAAC), every accredited institution should establish an Internal Quality Assurance Cell (IQAC), as a post accreditation quality sustenance measure.</p>
            <p>The prime task of the IQAC is to develop a system for conscious, consistent and catalytic improvement in the overall performance of the institution. For this during the post accreditation period, it will channelize all efforts and measures of the institution towards promoting its holistic academic excellence.</p>
            <p>It will be a facilitative and participative unit of the institution which has the potential to become a vehicle for assuring in quality enhancement by working out planned interventionist strategies to remove deficiencies and enhance quality like the "quality circles" in industries.</p>
            <p>In addition to ensuring the implementations of quality checks and measures it has to prepare the <strong>Annual Quality Assurance Report (AQAR)</strong> as per guidelines and parameters of NAAC, to be submitted to NAAC every year.</p>
            <p>The cell acts as a nodal agency of the college for coordinating quality related activities, including adopting and dissemination of good practices.</p>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">Reconstituted IQAC (effective from 03-07-2023)</h3>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-primary/10 mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Role</th>
                <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">Chairperson</td>
                <td className="px-6 py-4 font-medium text-foreground">Dr. Guduru VNSR Ratnakara Rao, Principal</td>
              </tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                <td className="px-6 py-4 font-semibold text-primary">Co-Ordinator</td>
                <td className="px-6 py-4 font-medium text-foreground">Dr. G Loshma, Professor & Head, AIM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">IQAC Members</h3>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-primary/10 mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">SNo</th>
                <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Name of the Member</th>
                <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Designation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">1</td><td className="px-6 py-4 font-medium text-foreground">Dr. T. Ramesh, Adjunct Professor, NIT Warangal</td><td className="px-6 py-4 text-muted-foreground">External Peer Review Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">2</td><td className="px-6 py-4 font-medium text-foreground">Dr. G. Ravi Kiran Sastry, Professor, NIT-AP</td><td className="px-6 py-4 text-muted-foreground">External Peer Review Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">3</td><td className="px-6 py-4 font-medium text-foreground">Dean Student Affairs-Dr. Ch. Rambabu, Professor, EEE</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">4</td><td className="px-6 py-4 font-medium text-foreground">Dean R&D-Dr. V. S. Naresh, Professor, CSE</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">5</td><td className="px-6 py-4 font-medium text-foreground">HOD CE-Dr. G. Radhakrishnan, Professor, CE</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">6</td><td className="px-6 py-4 font-medium text-foreground">HOD EEE-Dr. D. Sudha Rani, Professor, EEE</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">7</td><td className="px-6 py-4 font-medium text-foreground">HOD ME-Dr. M.V. Ramesh, Professor, ME</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">8</td><td className="px-6 py-4 font-medium text-foreground">HOD ECE-Dr. E. Kusuma Kumari, Professor, ECE</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">9</td><td className="px-6 py-4 font-medium text-foreground">HOD CSE-Dr. D. Jaya Kumari, Professor, CSE</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">10</td><td className="px-6 py-4 font-medium text-foreground">HOD BS&H-Sri. N. Raja Sekhar, Assoc. Professor, BS&H</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">11</td><td className="px-6 py-4 font-medium text-foreground">HOD MBA-Sri. D. Naveen Kumar, Asst. Professor, MBA</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">12</td><td className="px-6 py-4 font-medium text-foreground">Head, Placements-Dr. P.N.V. Gopala Krishna, Assoc. Professor, ME</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">13</td><td className="px-6 py-4 font-medium text-foreground">Section Head, English-Mr. M. Venkata Ramana, Asst. Professor, BS&H</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">14</td><td className="px-6 py-4 font-medium text-foreground">Section Head, Mathematics, Sri Sk. Dhana Prasad, Asst. Professor, BS&H</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">15</td><td className="px-6 py-4 font-medium text-foreground">Section Head, Physics, Sri. P.Sita Rama Raju, Assoc. Professor, BS&H</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">16</td><td className="px-6 py-4 font-medium text-foreground">Section Head, Chemistry-Ms. S.S.V Suma Latha, Asst. Professor, BS&H</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">17</td><td className="px-6 py-4 font-medium text-foreground">Dr. K. N. H Srinivas, Assoc. Professor, ECE</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">18</td><td className="px-6 py-4 font-medium text-foreground">Controller of Examinations-Sri. Ch.V.S.R. Gopala Krishna, Sr.Asst.Prof, EEE</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">19</td><td className="px-6 py-4 font-medium text-foreground">Sri. Ch. Apparao, Director Technical-Management Representative</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">20</td><td className="px-6 py-4 font-medium text-foreground">Mr. Ch. Narayana Rao, Administrative Officer</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">21</td><td className="px-6 py-4 font-medium text-foreground">Mr. Ganesh Somisetti, Head of HR, Capitech Solutions</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">22</td><td className="px-6 py-4 font-medium text-foreground">Mr. Eedala Rambabu, Specialist, Technical Lead at Amadeus Labs, Bangalore</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">23</td><td className="px-6 py-4 font-medium text-foreground">Mr. M. Mahesh-Retd. Principal, Govt. Polytechnic, Tadepalligudem</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
              <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">24</td><td className="px-6 py-4 font-medium text-foreground">Mr. Siddha Vinay Kumar- 22A81A4359- Dept. of CSE(AI)</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* IQAC Minutes */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-6">
            <h3 className="text-2xl font-bold text-primary text-center">IQAC Minutes of Meetings</h3>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {[
                { year: "2024-25", meetings: [{ date: "17-09-2025", link: "./aboutus/IQAC Minutes of the meeting 19-06-2025.pdf" }] },
                { year: "2023-24", meetings: [{ date: "17-08-2023", link: "./aboutus/Minutes of the meeting 17-08-2023_1.pdf" }] },
                { year: "2022-23", meetings: [
                  { date: "10-01-2023", link: "./aboutus/Minutes of the meeting 10-01-2023_1.pdf" },
                  { date: "04-05-2023", link: "./aboutus/Minutes of the meeting 4-05-2023_2.pdf" }
                ]},
                { year: "2021-22", meetings: [
                  { date: "23-04-2022", link: "./aboutus/Minutes of the meeting 23-04-2022.pdf" },
                  { date: "10-05-2022", link: "./aboutus/Minutes of the meeting 10-05-2022_2.pdf" }
                ]},
                { year: "2020-21", meetings: [
                  { date: "04-01-2021", link: "./aboutus/Minutes of the meeting 04-01-2021_1.pdf" },
                  { date: "24-04-2021", link: "./aboutus/Minutes of the meeting 24-04-2021_2.pdf" }
                ]},
                { year: "2019-20", meetings: [
                  { date: "16-10-2019", link: "./aboutus/Minutes of the meeting 16-10-2019_1.pdf" },
                  { date: "18-04-2020", link: "./aboutus/Minutes of the meeting 18-04-2020_2.pdf" }
                ]},
                { year: "2018-19", meetings: [
                  { date: "30-11-2018", link: "./aboutus/Minutes of Meeting_30-11-2018_1.pdf" },
                  { date: "25-04-2019", link: "./aboutus/Minutes of Meeting_25-04-2019_2.pdf" }
                ]}
              ].map((yearData, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-100 hover:shadow-md transition-all duration-300">
                  <div className="font-semibold text-foreground mb-2">Academic Year {yearData.year}</div>
                  <div className="space-y-2">
                    {yearData.meetings.map((meeting, meetingIndex) => (
                      <div key={meetingIndex} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Meeting {meeting.date}</span>
                        <a href={meeting.link} target="_blank" className="text-purple-600 hover:text-purple-700 font-medium">
                          View PDF
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AQAR Reports */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10">
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-6">
            <h3 className="text-2xl font-bold text-primary text-center">AQAR Reports</h3>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {[
                { year: "2021-22", link: "./mandates/SVEC-AQAR-2021-22.pdf" },
                { year: "2020-21", link: "./mandates/SVEC-AQAR-2020-21.pdf" },
                { year: "2019-20", link: "./mandates/SVEC-AQAR-2019-20.pdf" },
                { year: "2018-19", link: "./mandates/SVEC-AQAR-2018-19.pdf" },
                { year: "2017-18", link: "./mandates/SVEC-AQAR-2017-18.pdf" },
                { year: "2016-17", link: "./mandates/SVEC-AQAR-2016-17.pdf" }
              ].map((report, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100 flex justify-between items-center hover:shadow-md transition-all duration-300">
                  <span className="font-medium text-foreground">AQAR {report.year}</span>
                  <a href={report.link} target="_blank" className="text-green-600 hover:text-green-700 font-medium">
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}


          {activeSidebarItem === 'Sri Vasavi Society' && (
            <section className="py-16 bg-gradient-to-br from-background to-card/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 bg-gradient-to-r from-[#B22222] to-[#0097A7] bg-clip-text text-transparent">
                    Sri Vasavi Society
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#0097A7] mx-auto rounded-full"></div>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10 mb-12">
                  <div className="bg-gradient-to-r from-[#B22222] to-[#0097A7] p-6">
                    <h3 className="text-2xl font-bold text-white text-center">About Sri Vasavi Educational Society</h3>
                  </div>
                  <div className="p-8">
                    <div className="space-y-6 text-muted-foreground leading-relaxed text-justify">
                      <p>Sri Vasavi Educational Society was established in 2001 by a group of philanthropists and visionaries with the objective of providing quality technical education in the region. The society is registered under the Societies Registration Act XXI of 1860 and has been instrumental in the growth and development of Sri Vasavi Engineering College.</p>
                      <p>The society is committed to imparting value-based education and fostering an environment of academic excellence, innovation, and social responsibility. It is governed by a Board of Management comprising eminent personalities from various fields, who guide the institution in its mission to nurture competent professionals.</p>
                      
                      {/* Key Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                        <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                          <div className="text-2xl font-bold text-primary">2001</div>
                          <div className="text-sm text-muted-foreground">Established</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl border border-secondary/20">
                          <div className="text-2xl font-bold text-primary">23+</div>
                          <div className="text-sm text-muted-foreground">Years of Service</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                          <div className="text-2xl font-bold text-green-600">16</div>
                          <div className="text-sm text-muted-foreground">Society Members</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-primary/10 mb-12">
                  <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-6 border-b border-primary/10">
                    <h3 className="text-2xl font-bold text-primary flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Objectives of the Society
                    </h3>
                  </div>
                  <div className="p-8">
                    <div className="space-y-4">
                      {[
                        "To establish and manage educational institutions for imparting quality education in engineering and technology.",
                        "To promote research and development activities in various disciplines.",
                        "To encourage co-curricular and extra-curricular activities for the holistic development of students.",
                        "To provide scholarships and financial assistance to deserving students.",
                        "To foster industry-institute interaction for better employability and skill development."
                      ].map((objective, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-justify">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">Society Members</h3>
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-primary/10 mb-8">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">SNo</th>
                          <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Members</th>
                          <th className="px-6 py-4 text-left font-bold text-primary border-b border-primary/20">Designation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">1</td><td className="px-6 py-4 font-medium text-foreground">Sri K. V. Ramakrishna Rao</td><td className="px-6 py-4 text-muted-foreground">Vice President</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">2</td><td className="px-6 py-4 font-medium text-foreground">Sri Pabolu Venkateswara Rao</td><td className="px-6 py-4 text-muted-foreground">Joint Secretary</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">3</td><td className="px-6 py-4 font-medium text-foreground">Sri P. Bala Kasaiah</td><td className="px-6 py-4 text-muted-foreground">Treasurer</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">4</td><td className="px-6 py-4 font-medium text-foreground">Sri Ch. V. R. K Subbarao</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">5</td><td className="px-6 py-4 font-medium text-foreground">Smt. Grandhi Ratnavathi</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">6</td><td className="px-6 py-4 font-medium text-foreground">Sri Ch.Sai Lakshmana Rao</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">7</td><td className="px-6 py-4 font-medium text-foreground">Sri Ch. V. R Ramana Murthy</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">8</td><td className="px-6 py-4 font-medium text-foreground">Sri Juluri Neelakanteswara Rao</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">9</td><td className="px-6 py-4 font-medium text-foreground">Sri P.Rama Krishna Rao</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">10</td><td className="px-6 py-4 font-medium text-foreground">Sri Kanamarlapudi L.N.Prasad</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">11</td><td className="px-6 py-4 font-medium text-foreground">Sri Maddali Mohan Babu</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">12</td><td className="px-6 py-4 font-medium text-foreground">Sri Kotla Venkata Rama Krishna Rao</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">13</td><td className="px-6 py-4 font-medium text-foreground">Sri Nunna Lakshmi Narayana</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">14</td><td className="px-6 py-4 font-medium text-foreground">Sri P.Chenchu Subbarao</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">15</td><td className="px-6 py-4 font-medium text-foreground">Smt. Kolla Parvathi Devi</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                        <tr className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-300"><td className="px-6 py-4 font-semibold text-primary">16</td><td className="px-6 py-4 font-medium text-foreground">Smt. N.Sreedevi</td><td className="px-6 py-4 text-muted-foreground">Member</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">Contact</h3>
                <p className="mb-2 text-muted-foreground">
                  Sri Vasavi Educational Society,<br />
                  Sri Vasavi Engineering College Campus,<br />
                  Pedatadepalli, Tadepalligudem - 534101,<br />
                  West Godavari District, Andhra Pradesh, India.<br />
                  Phone: 08818-284355, 284344
                </p>
              </div>
            </section>
          )}

          {/* Add similar cases for other sidebar items if needed */}
        </div>
      </div>
    </div>
  );
};

export default About;
