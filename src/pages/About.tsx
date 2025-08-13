import React, { useState } from 'react';
import { Award, Users, BookOpen, Globe, Target, Eye, Heart, ArrowRight, Menu, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import content from '../content/about.json';
import AnimatedSection from '../components/AnimatedSection';
import SmoothLink from '../components/SmoothLink';

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
    <div className="pt-24 bg-background text-foreground">
      {/* Hero Section */}
      <AnimatedSection animation="fadeInUp" className="bg-primary text-white py-16 md:py-20 w-full rounded-none mb-12 overflow-hidden relative isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection animation="fadeInUp" delay={200}>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 relative inline-block">
              About SVEC
              <span className="text-white ml-2 text-xl md:text-2xl font-normal opacity-80">
                Est. 1999
              </span>
            </h1>
          </AnimatedSection>

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
      </AnimatedSection>

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
                      setSidebarOpen(false); // Close sidebar when item is clicked
                      // Handle navigation to specific page
                      if (item === 'Contact Us') {
                        // Use router for smooth navigation
                        setTimeout(() => {
                          window.location.href = '/contact';
                        }, 100);
                      } else {
                        // Handle other navigation items
                        console.log(`Navigate to ${item}`);
                      }
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
          <AnimatedSection animation="fadeInUp" className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.achievements.map((achievement, index) => {
                  const Icon = iconMap[achievement.icon];
                  return (
                    <AnimatedSection key={index} animation="fadeInUp" delay={index * 100} className="text-center p-6 rounded-xl bg-card hover:shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02] border border-primary/10">
                      <Icon className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-foreground mb-2">{achievement.title}</h3>
                      <p className="text-muted-foreground">{achievement.desc}</p>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* About Content */}
          <AnimatedSection animation="fadeInLeft" className="py-16 bg-card/50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection animation="fadeInLeft" delay={200}>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-6 text-muted-foreground leading-relaxed text-justify">
                    <p>
                      Sri Vasavi Engineering College, established in 2001, stands as one of the premier engineering institutions in Andhra Pradesh.
                      Affiliated with JNTUK and approved by AICTE, we have consistently maintained our position among the top 10 engineering colleges in the state,
                      offering excellence in Engineering, Technology, and Business Administration.
                    </p>
                    <p>
                      Our journey towards excellence was marked by achieving autonomy in 2018, enabling us to design industry-aligned curricula.
                      The institution has earned prestigious NBA & NAAC accreditations, reflecting our commitment to quality education.
                      We've expanded our horizons by introducing cutting-edge programs like CST and ECT, alongside traditional engineering disciplines.
                    </p>
                    <p>
                      The campus boasts state-of-the-art facilities including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li>Modern laboratories and audio-visual classrooms</li>
                      <li>Extensive library and research facilities</li>
                      <li>Sports complex with indoor stadium</li>
                      <li>Well-equipped seminar halls and auditorium</li>
                      <li>Green campus with beautiful gardens</li>
                    </ul>
                    <p>
                      Our strength lies in our highly qualified faculty, robust placement cell, and strong industry connections, ensuring excellent career opportunities
                      for our students in leading MNCs. The institution's commitment to holistic development is reflected through active NSS units,
                      research initiatives, and eco-friendly projects including solar power generation and green transportation solutions.
                    </p>
                  </div>
                </AnimatedSection>
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
          </AnimatedSection>
          <AnimatedSection animation="fadeInRight" delay={400} className="relative">
            <img
              src="./CollegeBuilding.jpg"
              alt="College Campus"
              className="rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-bold text-lg">25+ Years</h3>
              <p className="text-sm">of Excellence</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
      {/* </AnimatedSection> */}

      {/* Vision Mission Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-card border-2 border-primary text-foreground transform transition-all duration-300 hover:scale-[1.02] shadow-lg">
              <Eye className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="leading-relaxed">
                To be a globally recognized institution for excellence in engineering education,
                research, and innovation, producing competent engineers who contribute to society's betterment.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-card border-2 border-primary text-foreground transform transition-all duration-300 hover:scale-[1.02] shadow-lg">
              <Target className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="leading-relaxed">
                To provide quality engineering education through innovative teaching methods,
                foster research culture, and maintain strong industry partnerships for holistic development.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-card border-2 border-primary text-foreground transform transition-all duration-300 hover:scale-[1.02] shadow-lg">
              <Heart className="w-16 h-16 mx-auto mb-6 text-primary" />
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
      <section className="py-16 bg-gradient-to-br from-card to-card/90 rounded-lg overflow-hidden shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Leadership</h2>
            <p className="text-xl text-muted-foreground mb-6">Meet our experienced leadership team</p>
            <Link
              href="/administration/deans"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg group border-2 border-primary hover:bg-primary/90"
            >
              View Full Administration Team
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Hon's President */}
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-primary/10">
              <div className="text-center mb-6">
                <img
                  src="./YNS.jpg"
                  alt="Sri Yeerra Narayana Swamy"
                  className="w-40 h-48 rounded-lg mx-auto mb-4 object-cover object-top border-4 border-primary transform transition-all duration-300 hover:scale-105"
                />
                <h3 className="text-2xl font-bold text-foreground">Sri Yeerra Narayana Swamy</h3>
                <p className="text-primary font-semibold">Hon's President</p>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-muted-foreground"><strong>Education:</strong> M.A., LLB., Ex. M.L.A.</p>
                <p className="text-muted-foreground text-sm">The main source of inspiration and guidance, who took exceptional care in moulding the college into a model institution.</p>
              </div>
            </div>

            {/* President */}
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-primary/10">
              <div className="text-center mb-6">
                <img
                  src="./presi.jpg"
                  alt="Sri Grandhi Satyanarayana"
                  className="w-40 h-48 rounded-lg mx-auto mb-4 object-cover object-top border-4 border-primary transform transition-all duration-300 hover:scale-105"
                />
                <h3 className="text-2xl font-bold text-foreground">Sri Grandhi Satyanarayana</h3>
                <p className="text-primary font-semibold">President</p>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-muted-foreground text-sm">Has good experience in education field with 16+ years of running GMR Educational Institutions including schools, colleges and degree colleges.</p>
              </div>
            </div>

            {/* Secretary & Correspondent */}
            <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-primary/10">
              <div className="text-center mb-6">
                <img
                  src="./scre.jpg"
                  alt="Sri Chalamcharla V.V.Subba Rao"
                  className="w-40 h-48 rounded-lg mx-auto mb-4 object-cover object-top border-4 border-primary transform transition-all duration-300 hover:scale-105"
                />
                <h3 className="text-2xl font-bold text-foreground">Sri Chalamcharla V.V.Subba Rao</h3>
                <p className="text-primary font-semibold">Secretary & Correspondent</p>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-muted-foreground text-sm">A personality with enhanced caliber of leadership and assertive skills, contributing to the elevation of the institution with unparalleled vision and mission.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-white rounded-none w-full overflow-hidden relative isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Legacy</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of an institution that has been shaping engineers and leaders for over 25 years
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SmoothLink
              href="/admissions"
              className="bg-gradient-to-r from-white to-white/90 text-primary px-8 py-4 rounded-md font-semibold hover:bg-secondary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </SmoothLink>
            <SmoothLink
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white/10 backdrop-blur-sm hover:border-secondary transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </SmoothLink>
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-secondary/20 -translate-y-1/4 translate-x-1/4 opacity-70 shadow-sm z-0"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-secondary/15 translate-y-1/4 -translate-x-1/4 opacity-70 shadow-sm z-0"></div>
      </section>
    </div>
  );
};

export default About;
