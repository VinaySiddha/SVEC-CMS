import React, { useState } from 'react';
import { Award, Users, BookOpen, Globe, Target, Eye, Heart, ArrowRight, Menu, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import content from '../content/about.json';

const About: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar navigation items from the image
  const sidebarItems = [
    'Mission & Vision',
    'Board of Governance',
    'Sri Vasavi Society',
    'AQAR',
    'IQAC',
    'Contact Us'
  ];

  const iconMap: { [key: string]: React.ElementType } = {
    Award,
    Users,
    BookOpen,
    Globe,
  };

  return (
    <div className="pt-32 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20 relative overflow-hidden isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About SVEC</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Committed to excellence in engineering education and fostering innovation for over two decades
          </p>
        </div>

        {/* Subtle background shapes */}
        <div className="absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full opacity-70 shadow-sm z-0"></div>
        <div className="absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full opacity-70 shadow-sm z-0"></div>
      </section>

      {/* Navigation and Content */}
      <div className="relative">
        {/* Details Button - Only show when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-44 left-4 z-50 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-2 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white/20"
          >
            <Menu className="w-4 h-4" />
            <span className="font-medium">About SVEC</span>
          </button>
        )}

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
                      if (item === 'Contact Us') {
                        window.location.href = '/contact';
                      } else {
                        // Handle other navigation items
                        console.log(`Navigate to ${item}`);
                      }
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
        <div>
          {/* Achievements */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.achievements.map((achievement, index) => {
                  const Icon = iconMap[achievement.icon];
                  return (
                    <div key={index} className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
                      <Icon className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-[#222222] mb-2">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* About Content */}
          <section className="py-16 bg-[#FFF8F0]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Established in 1999, Sri Vasavi Engineering College has been at the forefront of
                      engineering education in Andhra Pradesh. Located in the serene town of Tadepalligudem,
                      our institution has grown from humble beginnings to become a premier engineering college.
                    </p>
                    <p>
                      We are committed to providing quality education that combines theoretical knowledge
                      with practical applications. Our state-of-the-art infrastructure, experienced faculty,
                      and industry partnerships ensure that our students are well-prepared for the challenges
                      of the modern engineering world.
                    </p>
                    <p>
                      With over 3000 students and 150+ faculty members, we offer undergraduate and postgraduate
                      programs in various engineering disciplines. Our graduates have made significant
                      contributions to industry, research, and entrepreneurship worldwide.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="College Campus"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-[#B22222] text-white p-6 rounded-xl shadow-lg">
                    <h3 className="font-bold text-lg">25+ Years</h3>
                    <p className="text-sm">of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Vision Mission Values */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-xl bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white">
                  <Eye className="w-16 h-16 mx-auto mb-6 text-white" />
                  <h3 className="text-2xl font-bold mb-4">Vision</h3>
                  <p className="leading-relaxed">
                    To be a globally recognized institution for excellence in engineering education,
                    research, and innovation, producing competent engineers who contribute to society's betterment.
                  </p>
                </div>
                <div className="text-center p-8 rounded-xl bg-gradient-to-br from-[#8B0000] to-[#B22222] text-white">
                  <Target className="w-16 h-16 mx-auto mb-6 text-white" />
                  <h3 className="text-2xl font-bold mb-4">Mission</h3>
                  <p className="leading-relaxed">
                    To provide quality engineering education through innovative teaching methods,
                    foster research culture, and maintain strong industry partnerships for holistic development.
                  </p>
                </div>
                <div className="text-center p-8 rounded-xl bg-white border-2 border-[#B22222] text-[#222222]">
                  <Heart className="w-16 h-16 mx-auto mb-6 text-[#B22222]" />
                  <h3 className="text-2xl font-bold mb-4">Values</h3>
                  <p className="leading-relaxed">
                    Integrity, Excellence, Innovation, Inclusivity, and Social Responsibility guide
                    our approach to education and research in all our endeavors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="py-16 bg-[#FFF8F0]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Leadership</h2>
                <p className="text-xl text-gray-600 mb-6">Meet our experienced leadership team</p>
                <Link
                  href="/administration/deans"
                  className="inline-flex items-center gap-2 bg-[#B22222] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all"
                >
                  View Full Administration Team
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {content.leadership.map((leader, index) => (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                    <div className="text-center mb-6">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#B22222]"
                      />
                      <h3 className="text-2xl font-bold text-[#222222]">{leader.name}</h3>
                      <p className="text-[#B22222] font-semibold">{leader.position}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600"><strong>Education:</strong> {leader.education}</p>
                      <p className="text-gray-600"><strong>Experience:</strong> {leader.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Legacy</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Be part of an institution that has been shaping engineers and leaders for over 25 years
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/admissions"
                  className="bg-white text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#f9e8e8] transition-all"
                >
                  Apply Now
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
