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
                <h3 className="text-xl font-boCIA Mcclure. CSTW Polls Highlights. Celia and. CBSE. MI, legend of TNT. Small black static if API fails at a. CSCA. Le. Ed. SRI. Web technology. Review. Telecommunications. ld text-center flex-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">About SVEC</h3>
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
                          </ul>``
                        <p>Delhi cyber attacks. At apartment meets the Lambda Jasper D2 and tamarind Mahanati ratios HSSC Belgium Kathleen, Kathleen go after Marathi Wagholi. Inductors multiple. Two bit. PSG, Galaxy CMK. I. Aadhaar AB. A opinion. 
                          Our strength lies in our highly qualified faculty, robust placement cell, and strong industry connections, ensuring excellent career opportunities 
                          for our students in leading MNCs. The institution's commitment to holistic development is reflected through active NSS units, 
                          research initiatives, and eco-friendly projects including solar power generation and green transportation solutions.
                        </p>
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
              <section className="py-12 bg-gradient-to-br from-card to-card/90 rounded-lg overflow-hidden shadow-lg">
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
            <section className="py-16 bg-background">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Board of Governance</h2>
                <p className="mb-6 text-muted-foreground text-lg">Board of governance is a deciding component of organizational effectiveness and a crucial part of the functioning of an organization. Good governance ensures that objectives are realized, resources are well managed, and the interests of stakeholders are protected and reflected in key decisions.</p>
                <p className="mb-6 text-muted-foreground text-lg">The following is the Board of Governors (BOG) of Sri Vasavi Engineering College:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-primary rounded-xl shadow-md">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Designation</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground">
                      <tr><td>1</td><td>Sri O. P. Goenka</td><td>Technical Director, FFF Ltd., TPG.</td><td>Chairperson</td><td>9848023102</td></tr>
                      <tr><td>2</td><td>Sri Grandhi Satyanarayana</td><td>President of the College</td><td>Member (Management)</td><td>9848105097</td></tr>
                      <tr><td>3</td><td>Sri Ch.V.V.Subba Rao</td><td>Secretary & Correspondent</td><td>Member (Management)</td><td>9848144836</td></tr>
                      <tr><td>4</td><td>Sri Pabolu Venkateswara Rao</td><td>Joint Secretary of the College</td><td>Member (Management)</td><td>9440182237</td></tr>
                      <tr><td>5</td><td>Sri Peruri Bala Kasaiah</td><td>Treasurer of the College</td><td>Member (Management)</td><td>9490110934</td></tr>
                      <tr><td>6</td><td>Sri N. Rajasekhar</td><td>Assoc. Professor & HOD, Dept. of BSH</td><td>Member (Faculty Representation)</td><td>9885739808</td></tr>
                      <tr><td>7</td><td>Dr. D. Jaya Kumari</td><td>Professor & HOD Dept. of CSE</td><td>Member (Faculty Representation)</td><td>9885066229</td></tr>
                      <tr><td>8</td><td>The Regional Officer</td><td>AICTE,SCRO, Hyderabad</td><td>Member, AICTE Nominee</td><td>-</td></tr>
                      <tr><td>9</td><td>Prof.(Dr.) Upendra D. Patel</td><td>Professor & Head, Civil Engineering Dept., The M S University of Baroda, Vadodara</td><td>Member, UGC Nominee</td><td>9687961022</td></tr>
                      <tr><td>10</td><td>The Regional Joint Director</td><td>Technical Edn., Kakinada.</td><td>Member, State Govt. Nominee</td><td>-</td></tr>
                      <tr><td>11</td><td>Dr. K. V. Ramana</td><td>Professor of CSE UCEK, JNTUK, Kakinada</td><td>Member</td><td>9177780000</td></tr>
                      <tr><td>12</td><td>The Principal</td><td>Govt. Polytechnic, Tadepalligudem</td><td>Member, SBTET Nominee-State Govt.</td><td>9010222178</td></tr>
                      <tr><td>13</td><td>Sri V. Rajanna</td><td>Vice President & Regional Head, Tata Consultancy Services, Hyderabad.</td><td>Member (Industry Representation)</td><td>-</td></tr>
                      <tr><td>14</td><td>Dr.T. Ramesh</td><td>Retd. Professor of CSE, NIT Warangal</td><td>Member</td><td>9490455118</td></tr>
                      <tr><td>15</td><td>Sri Ch. Apparao</td><td>Technical Director</td><td>Invited Member</td><td>9705288855</td></tr>
                      <tr><td>16</td><td>Dr. Ch. Rambabu</td><td>Professor & Dean (Student Affairs)</td><td>Invited Member</td><td>9441447199</td></tr>
                      <tr><td>17</td><td>Dr. G V N S R Ratnakara Rao</td><td>Principal</td><td>Principal of the college & Member Secretary</td><td>9490799102, 7893799102</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

{activeSidebarItem === 'Financial Statements' && (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Financial Statements</h2>
      <p className="mb-6 text-muted-foreground text-lg">
        Tap on an academic year to view/download the Financial Statement PDF.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { year: '2021-2022', url: 'https://srivasaviengg.ac.in/uploads/Financial%20Reports%202021-22.pdf' },
          { year: '2020-2021', url: 'https://srivasaviengg.ac.in/uploads/Financial%20Reports%202020-21.pdf' },
          { year: '2019-2020', url: 'https://srivasaviengg.ac.in/uploads/Financial%20Reports%202019-20.pdf' },
          { year: '2018-2019', url: 'https://srivasaviengg.ac.in/uploads/Financial%20Reports%202018-19.pdf' },
          { year: '2017-2018', url: 'https://srivasaviengg.ac.in/uploads/Financial%20Reports%202017-18.pdf' },
          { year: '2016-2017', url: 'https://srivasaviengg.ac.in/uploads/Financial%20Reports%202016-17.pdf' },
          { year: '2015-2016', url: 'https://srivasaviengg.ac.in/uploads/Financial%20Reports%202015-16.pdf' },
          { year: '2014-2015', url: 'https://srivasaviengg.ac.in/uploads/Financial%20Reports%202014-15.pdf' },
        ].map(({ year, url }) => (
          <a
            key={year}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-card border border-primary/20 rounded-xl p-6 text-center shadow hover:shadow-lg hover:bg-primary/10 transition-all duration-300 cursor-pointer group"
          >
            <span className="text-xl font-semibold text-primary group-hover:underline">{year}</span>
            <div className="mt-2 text-muted-foreground text-sm">View PDF</div>
          </a>
        ))}
      </div>
    </div>
  </section>
)}


{activeSidebarItem === 'IETE' && (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">IETE - Institution of Electronics and Telecommunication Engineers</h2>
      <div className="mb-8 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img src="image/ieteMain.gif" alt="IETE Logo" className="w-36 h-36 rounded-xl shadow-lg mb-4 border-2 border-black" />
        </div>
        <div>
          <p className="text-muted-foreground mb-4">
            The Institution of Electronics and Telecommunication Engineers (IETE) is India's leading professional society devoted to the advancement of Science and Technology of Electronics, Telecommunication & IT. Founded in 1953, it serves more than 70,000 members through 62 centres across India and abroad.
          </p>
          <p className="text-muted-foreground mb-4">
            Recognized as a Scientific and Industrial Research Organization (SIRO) and notified as an educational institution of national eminence, IETE provides leadership in scientific and technical areas of national importance. It conducts and sponsors technical meetings, conferences, symposia, and exhibitions, publishes technical journals, and offers continuing education and career advancement opportunities to its members.
          </p>
        </div>
      </div>

      {/* IETE Objectives */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">IETE Objectives</h3>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>The IETE Students' Forum (ISF) started in our college in 2008 with 1000 student members, supported by senior faculty and the regional IETE Centre.</li>
          <li>To plan and organize technical programmes and activities such as lectures, workshops, seminars, symposia, exhibitions for student members.</li>
          <li>To provide a platform for students to exchange ideas and information on curriculum, employment, higher education, emerging trends, and new developments.</li>
          <li>To facilitate technical visits, practical training, project work, and employment opportunities for student members in R&D labs, industries, and academic institutions.</li>
          <li>To encourage teamwork and self-reliance among student members.</li>
          <li>To serve as a focal point for professional development of student members.</li>
        </ul>
      </div>

      {/* Activities */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Activities</h3>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>
            Workshop on Arduino-Device Interfacing (22nd & 23rd Feb 2017) for II B.Tech ECE Students - 
            <a href="eceguest_worksemfdpfiles/Workshop on Arduino Device Interfacing for IInd Years.pdf" target="_blank" className="text-primary underline ml-2">View More</a>
          </li>
          <li>
            Workshop on ROBOTICS and IOT (6th & 7th Feb 2017) for III B.Tech ECE Students - 
            <a href="eceguest_worksemfdpfiles/Workshop on IOT & Robotics for  III rd Years.pdf" target="_blank" className="text-primary underline ml-2">View More</a>
          </li>
          <li>
            Guest Lectures Conducted in ECE Department for last 5 Academic Years under IETE Student Forum - 
            <a href="eceguest_worksemfdpfiles/Guest Lectures Conducted in ECE Department for last 5 Academic Years under IETE Student Forum.pdf" target="_blank" className="text-primary underline ml-2">View More</a>
          </li>
        </ul>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-primary rounded-xl shadow-md">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2">Sno</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Name of The Program</th>
                <th className="px-4 py-2">Resource Person</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr>
                <td>1</td>
                <td>22-09-2014 to 26-09-2014</td>
                <td>ASIC Design Flow Using MENTOR GRAPHICS Back-End Tool</td>
                <td>K. S. S. Kiran, Asst. Prof.<br />P. Murali Krishna, Asst. Prof.<br />SVEC, Tadepalligudem</td>
              </tr>
              <tr>
                <td>2</td>
                <td>15-09-2014</td>
                <td>Engineers Day</td>
                <td>Dr. J. Srihari Rao, Principal, SVEC</td>
              </tr>
              <tr>
                <td>3</td>
                <td>19-07-2014</td>
                <td>Aero Space Vehicles</td>
                <td>Dr. J Srihari Rao, Principal, SVEC</td>
              </tr>
              <tr>
                <td>4</td>
                <td>27-06-2014</td>
                <td>Career Planning for Engineers</td>
                <td>Mr. Sathish Alldaboina, Sr. Divisional Engineer, S.C. Railway, Guntur</td>
              </tr>
              <tr>
                <td>5</td>
                <td>14-11-2013</td>
                <td>Wavelets and Multi Signal Processing</td>
                <td>Dr. M. Venugopala Rao, Professor, K. L. University, Vijayawada</td>
              </tr>
              <tr>
                <td>6</td>
                <td>27-09-2012</td>
                <td>Low Power VLSI Design and Trends</td>
                <td>Dr. M. Kamaraju, Professor, Gudlavalleru Engineering College</td>
              </tr>
              <tr>
                <td>7</td>
                <td>15-09-2012</td>
                <td>Communication Systems</td>
                <td>Prof. M.V. Raghunadh, Professor, NIT Warangal</td>
              </tr>
              <tr>
                <td>8</td>
                <td>15-03-2012</td>
                <td>Multi Signal Processing And Wavelets</td>
                <td>Dr. Venugopala Rao, HOD, ECE, Narsaraopet Engineering College</td>
              </tr>
              <tr>
                <td>9</td>
                <td>12-03-2012</td>
                <td>Demand for Mobile Applications in Software Industry & Job Prospects</td>
                <td>Mr. Dileep, Director, Dilven Info Solutions Pvt Ltd, Hyderabad</td>
              </tr>
              <tr>
                <td>10</td>
                <td>15-09-2011</td>
                <td>Modern Trends in Communications</td>
                <td>Sri. G. Anantharam, GM, BSNL, W.G.Dist.</td>
              </tr>
              <tr>
                <td>11</td>
                <td>19-02-2011</td>
                <td>VLSI Design and Embedded System</td>
                <td>Dr. N.S. Murthy, Professor, NIT Warangal</td>
              </tr>
              <tr>
                <td>12</td>
                <td>24-02-2011</td>
                <td>Digital Signal Processing</td>
                <td>Prof. N.V. Seshagiri Rao, HOD, Sri Potti Sriramulu College of Engineering, Vijayawada</td>
              </tr>
              <tr>
                <td>13</td>
                <td>26-03-2010</td>
                <td>RF Engineering</td>
                <td>Dr. J. Srihari Rao, Principal, GIET Rajahmundry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Contact</h3>
        <ul className="list-none pl-0 text-muted-foreground">
          <li><b>Sri K. Santosh Surya Kiran</b>, Assistant Professor</li>
          <li>Department of ECE</li>
          <li>Co-ordinator</li>
          <li>Mobile: 9491446949</li>
          <li>Fax: 08818-284322</li>
          <li>Email: <a href="mailto:kiran2708@gmail.com" className="text-primary underline">kiran2708@gmail.com</a></li>
        </ul>
      </div>
    </div>
  </section>
)}


{activeSidebarItem === 'CSI' && (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">CSI - Computer Society of India</h2>
      <div className="mb-8 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img src="image/CSI_logo.jpg" alt="CSI Logo" className="w-32 h-32 rounded-xl shadow-lg mb-4" />
        </div>
        <div>
          <p className="text-muted-foreground mb-4">
            Formed in 1965, the Computer Society of India (CSI) has been instrumental in guiding the Indian IT industry since its formative years. Today, CSI has 70 chapters, 418 student branches, and more than 90,000 members, including India's most famous IT leaders, scientists, and academicians.
          </p>
          <p className="text-muted-foreground mb-4">
            The mission of CSI is to facilitate research, knowledge sharing, learning, and career enhancement for all categories of IT professionals, while inspiring and nurturing new entrants into the industry. CSI works closely with other industry associations, government bodies, and academia to ensure IT advancement benefits every citizen of India.
          </p>
        </div>
      </div>

      {/* CSI Membership */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">CSI Membership</h3>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>Membership is open to all IT professionals.</li>
          <li>Categories: Individual (Fellow, Senior, Member, Associate, Student) and Institutional.</li>
          <li>Life membership available for professionals.</li>
          <li>Fellowship awarded for contributions to CSI and IT promotion.</li>
        </ul>
      </div>

      {/* CSI MOUs */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">CSI MOUs</h3>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>IEEE</li>
          <li>MIEL</li>
          <li>BCS</li>
          <li>PMI Project Management Institute</li>
          <li>C-DAC</li>
          <li>eWIT (empowering women in IT)</li>
          <li>Microsoft</li>
          <li>IIT Bombay</li>
        </ul>
      </div>

      {/* Membership Benefits */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Membership Benefits</h3>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>Join a large community of professionals, corporates, and institutions</li>
          <li>Free CSI Communications</li>
          <li>CSI Journal, R&D Grant</li>
          <li>Concession in Events Participation</li>
          <li>Opportunity to be Office Bearer</li>
          <li>Organize and participate in events</li>
          <li>Concession in joining IEEE</li>
          <li>CSI Examinations/Certifications</li>
        </ul>
      </div>

      {/* Activities */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Activities</h3>
        <p className="mb-4 text-muted-foreground">
          The CSI Student Branch actively conducts workshops, guest lectures, and seminars for student enrichment.
        </p>
        <ul className="list-disc pl-6 mb-4 text-muted-foreground">
          <li>
            Life Membership of Faculty Members - <a href="uploads/csifaculty-17-18.pdf" target="_blank" className="text-primary underline">View</a>
          </li>
          <li>
            CSI Registered Students List - <a href="Gallery/csi-student.pdf" target="_blank" className="text-primary underline">View</a>
          </li>
        </ul>
        {/* Example: Academic Year Table */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-primary rounded-xl shadow-md">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2">Academic Year</th>
                <th className="px-4 py-2">Registered Members</th>
                <th className="px-4 py-2">CSI Committee Members</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr>
                <td>2017-18</td>
                <td>Under Progress</td>
                <td>President: Majety<br />Secretary: Rallapalli Mounica<br />Treasurer: K N Krishnaveni</td>
              </tr>
              <tr>
                <td>2016-17</td>
                <td>CSE:146</td>
                <td>President: Yeggina Ramya<br />Secretary: S R Sesha Reddy<br />Treasurer: K N Krishnaveni</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Contact</h3>
        <ul className="list-none pl-0 text-muted-foreground">
          <li><b>Sri G. Nataraj</b>, Assistant Professor</li>
          <li>Department of CSE</li>
          <li>Phone: 08818-284355 (O)</li>
          <li>Mobile: 9989808906</li>
          <li>Fax: 08818-284322</li>
          <li>Email: <a href="mailto:nfornataraj@gmail.com" className="text-primary underline">nfornataraj@gmail.com</a></li>
        </ul>
      </div>
    </div>
  </section>
)}


{activeSidebarItem === 'NSS' && (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">NSS - National Service Scheme</h2>
      <ul className="list-disc pl-6 mb-6 text-muted-foreground">
        <li>Register to events: <a href="https://docs.google.com/forms/d/e/1FAIpQLSdMuvjGnUaW81JqwgQupOvf7_NYMxDAH9NDs670W6treQKoIg/viewform" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>Blood Donation Camp Registration Form: <a href="https://docs.google.com/forms/d/e/1FAIpQLScoWt9vDkjkidEgnWzpf6wl2wawDMsgTlgRJtHgs2YF9qWWKw/viewform" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>Community Service Activities Conducted During 2019 to till date: <a href="uploads/Community Service Activities Conducted During 2019 to till date.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>Details about NSS: <a href="uploads/nss.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>Registration Link for NSS Enrollment Form during the A.Y 2024-25: <a href="https://docs.google.com/forms/d/e/1FAIpQLSf4x-7XTlBRhCGK-RcSn_CFkOVEtg5AcgftFZihg_k3P6J3hw/viewform" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>A Preliminary Report on PSSC: <a href="uploads/Nss_Report PSSC_1.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>Action Taken Report on the 7th International Yoga Day 2021: <a href="uploads/SVEC Action Taken Report on International Yoga Day 2021.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>Minutes of the Meeting of Board of Studies on NSS/SPORTS held on 28-11-2023: <a href="uploads/Minutes of meetings BOS,NSS&SPORTS.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Annual Reports Unit-II 2022-2023: <a href="uploads/NSS Anual Report 2022-2023 Unit-II.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Annual Reports Unit-I 2022-2023: <a href="uploads/NSS Anual Report 2022-2023 Unit-I.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Annual Reports 2021-2022: <a href="uploads/NSS Anual Report 2021-2022.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Annual Reports 2020-2021: <a href="uploads/NSS Anual Report 2020-2021.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Minutes of Meetings 2022-2023 unit 2: <a href="uploads/NSS MINUTES OF MEETING 2022-23 unit 2.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Minutes of Meetings 2022-2023 unit 1: <a href="uploads/NSS MINUTES OF MEETING 2022-23 unit 1.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Minutes of Meetings 2021-2022: <a href="uploads/NSS MINUTES OF MEETING 2021-22.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Minutes of Meetings 2020-2021: <a href="uploads/NSS MINUTES OF MEETING 2020-21.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Minutes of Meetings 2019-2020: <a href="uploads/NSS MINUTES OF MEETINGS( 2019-20).pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Annual Reports 2019-2020: <a href="uploads/NSS_REPORT_2019-2020.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>A Final Report on Psycho-Social Support Cell: <a href="uploads/A Final Report on Psycho-Social Support Cell.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>Students shortlisted for final selection of NSS Volunteer: <a href="uploads/nss_sel_list.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Volunteers Final Selection List Unit-II for 2023-2025: <a href="uploads/List of NSS Volunteers of Unit-II.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Volunteers Final Selection List Unit-I for 2023-2025: <a href="uploads/List of NSS Volunteers of Unit-I.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Volunteer Final Selection List-2019: <a href="uploads/nss_final_sel_list.pdf" target="_blank" className="text-primary underline">Click Here</a></li>
        <li>NSS Volunteer Registration Form JNTUK: <a href="uploads/JNTUK_NSS_VolunteerRegistration.pdf" target="_blank" className="text-primary underline">Download</a></li>
      </ul>
      <div className="mt-8 text-lg text-blue-700">
        If students have any queries about NSS send a mail to <span className="font-bold text-orange-700">nss@srivasaviengg.ac.in</span>
      </div>
    </div>
  </section>
)}


{activeSidebarItem === 'AQAR' && (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Annual Quality Assurance Report (AQAR)</h2>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">Student Satisfaction Survey (SSS)</h3>
        <ul className="list-disc pl-6 mb-6 text-muted-foreground">
          <li>SSS Survey Report 2021-22 - <a href="IQAC/NAAC SSS 2021-22.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>SSS Survey Report 2020-21 - <a href="IQAC/NAAC SSS 2020-21.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>SSS Survey Report 2019-20 - <a href="IQAC/NAAC SSS 2019-20.pdf" target="_blank" className="text-primary underline">View</a></li>
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary mb-4">AQAR Reports</h3>
        <ul className="list-disc pl-6 mb-6 text-muted-foreground">
          <li>AQAR 2021-22 - <a href="IQAC/SVEC-AQAR-2021-22.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>AQAR 2020-21 - <a href="IQAC/SVEC-AQAR-2020-21.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>AQAR 2019-20 - <a href="IQAC/SVEC-AQAR-2019-20.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>AQAR 2018-19 - <a href="IQAC/SVEC-AQAR-2018-19.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>AQAR 2017-18 - <a href="IQAC/SVEC-AQAR-2017-18.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>AQAR 2016-17 - <a href="IQAC/SVEC-AQAR-2016-17.pdf" target="_blank" className="text-primary underline">View</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-primary mb-4">Academic Calendars</h3>
        <ul className="list-disc pl-6 mb-6 text-muted-foreground">
          <li>Academic Calendar 2022-23 - <a href="IQAC/Academic-2022-23.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>Academic Calendar 2021-22 - <a href="IQAC/Academic-2021-22.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>Academic Calendar 2020-21 - <a href="IQAC/Academic-2020-21.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>Academic Calendar 2019-20 - <a href="IQAC/Academic-2019-20.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>Academic Calendar 2018-19 - <a href="IQAC/Academic-2018-19.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>Academic Calendar 2017-18 - <a href="IQAC/Academic-2017-18.pdf" target="_blank" className="text-primary underline">View</a></li>
          <li>Academic Calendar 2016-17 - <a href="uploads/Academic-2016-17.pdf" target="_blank" className="text-primary underline">View</a></li>
        </ul>
      </div>
    </div>
  </section>
)}

{activeSidebarItem === 'IQAC' && (
  <section className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">IQAC - Internal Quality Assurance Cell</h2>
      <ul className="list-disc pl-6 mb-6 text-muted-foreground">
        <li>As per the guidelines of National Assessment & Accreditation Council (NAAC), every accredited institution should establish an Internal Quality Assurance Cell (IQAC), as a post accreditation quality sustenance measure.</li>
        <li>The prime task of the IQAC is to develop a system for conscious, consistent and catalytic improvement in the overall performance of the institution. For this during the post accreditation period, it will channelize all efforts and measures of the institution towards promoting its holistic academic excellence.</li>
        <li>It will be a facilitative and participative unit of the institution which has the potential to become a vehicle for assuring in quality enhancement by working out planned interventionist strategies to remove deficiencies and enhance quality like the "quality circles" in industries.</li>
        <li>In addition to ensuring the implementations of quality checks and measures it has to prepare the <b>Annual Quality Assurance Report (AQAR)</b> as per guidelines and parameters of NAAC, to be submitted to NAAC every year.</li>
        <li>The cell acts as a nodal agency of the college for coordinating quality related activities, including adopting and dissemination of good practices.</li>
      </ul>
      <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">Reconstituted IQAC (effective from 03-07-2023)</h3>
      <table className="min-w-full bg-white border border-primary rounded-xl shadow-md mb-8">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody className="text-foreground">
          <tr>
            <td>Chairperson</td>
            <td>Dr. Guduru VNSR Ratnakara Rao, Principal</td>
          </tr>
          <tr>
            <td>Co-Ordinator</td>
            <td>Dr. G Loshma, Professor & Head, AIM</td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">IQAC Members</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-primary rounded-xl shadow-md">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2">SNo</th>
              <th className="px-4 py-2">Name of the Member</th>
              <th className="px-4 py-2">Designation</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            <tr><td>1</td><td>Dr. T. Ramesh, Adjunct Professor, NIT Warangal</td><td>External Peer Review Member</td></tr>
            <tr><td>2</td><td>Dr. G. Ravi Kiran Sastry, Professor, NIT-AP</td><td>External Peer Review Member</td></tr>
            <tr><td>3</td><td>Dean Student Affairs-Dr. Ch. Rambabu, Professor, EEE</td><td>Member</td></tr>
            <tr><td>4</td><td>Dean R&D-Dr. V. S. Naresh, Professor, CSE</td><td>Member</td></tr>
            <tr><td>5</td><td>HOD CE-Dr. G. Radhakrishnan, Professor, CE</td><td>Member</td></tr>
            <tr><td>6</td><td>HOD EEE-Dr. D. Sudha Rani, Professor, EEE</td><td>Member</td></tr>
            <tr><td>7</td><td>HOD ME-Dr. M.V. Ramesh, Professor, ME</td><td>Member</td></tr>
            <tr><td>8</td><td>HOD ECE-Dr. E. Kusuma Kumari, Professor, ECE</td><td>Member</td></tr>
            <tr><td>9</td><td>HOD CSE-Dr. D. Jaya Kumari, Professor, CSE</td><td>Member</td></tr>
            <tr><td>10</td><td>HOD BS&H-Sri. N. Raja Sekhar, Assoc. Professor, BS&H</td><td>Member</td></tr>
            <tr><td>11</td><td>HOD MBA-Sri. D. Naveen Kumar, Asst. Professor, MBA</td><td>Member</td></tr>
            <tr><td>12</td><td>Head, Placements-Dr. P.N.V. Gopala Krishna, Assoc. Professor, ME</td><td>Member</td></tr>
            <tr><td>13</td><td>Section Head, English-Mr. M. Venkata Ramana, Asst. Professor, BS&H</td><td>Member</td></tr>
            <tr><td>14</td><td>Section Head, Mathematics, Sri Sk. Dhana Prasad, Asst. Professor, BS&H</td><td>Member</td></tr>
            <tr><td>15</td><td>Section Head, Physics, Sri. P.Sita Rama Raju, Assoc. Professor, BS&H</td><td>Member</td></tr>
            <tr><td>16</td><td>Section Head, Chemistry-Ms. S.S.V Suma Latha, Asst. Professor, BS&H</td><td>Member</td></tr>
            <tr><td>17</td><td>Dr. K. N. H Srinivas, Assoc. Professor, ECE</td><td>Member</td></tr>
            <tr><td>18</td><td>Controller of Examinations-Sri. Ch.V.S.R. Gopala Krishna, Sr.Asst.Prof, EEE</td><td>Member</td></tr>
            <tr><td>19</td><td>Sri. Ch. Apparao, Director Technical-Management Representative</td><td>Member</td></tr>
            <tr><td>20</td><td>Mr. Ch. Narayana Rao, Administrative Officer</td><td>Member</td></tr>
            <tr><td>21</td><td>Mr. Ganesh Somisetti, Head of HR, Capitech Solutions</td><td>Member</td></tr>
            <tr><td>22</td><td>Mr. Eedala Rambabu, Specialist, Technical Lead at Amadeus Labs, Bangalore</td><td>Member</td></tr>
            <tr><td>23</td><td>Mr. M. Mahesh-Retd. Principal, Govt. Polytechnic, Tadepalligudem</td><td>Member</td></tr>
            <tr><td>24</td><td>Mr. Siddha Vinay Kumar- 22A81A4359- Dept. of CSE(AI)</td><td>Member</td></tr>
          </tbody>
        </table>
      </div>
      <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">IQAC Minutes of Meetings</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-primary rounded-xl shadow-md">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2">Academic Year</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody className="text-foreground">
            <tr>
              <td>2024-25</td>
              <td>
                1. Minutes of Meeting held on 17-06-2025 - <a href="IQAC/IQAC Minutes of the meeting 19-06-2025.pdf" target="_blank" className="text-primary underline">View</a>
              </td>
            </tr>
            <tr>
              <td>2023-24</td>
              <td>
                1. Minutes of Meeting held on 17-08-2023 - <a href="IQAC/Minutes of the meeting 17-08-2023_1.pdf" target="_blank" className="text-primary underline">View</a>
              </td>
            </tr>
            <tr>
              <td>2022-23</td>
              <td>
                1. Minutes of Meeting held on 10-01-2023 - <a href="IQAC/Minutes of the meeting 10-01-2023_1.pdf" target="_blank" className="text-primary underline">View</a><br />
                2. Minutes of Meeting held on 04-05-2023 - <a href="IQAC/Minutes of the meeting 4-05-2023_2.pdf" target="_blank" className="text-primary underline">View</a>
              </td>
            </tr>
            <tr>
              <td>2021-22</td>
              <td>
                1. Minutes of Meeting held on 23-04-2022 - <a href="IQAC/Minutes of the meeting 23-04-2022.pdf" target="_blank" className="text-primary underline">View</a><br />
                2. Minutes of Meeting held on 10-05-2022 - <a href="IQAC/Minutes of the meeting 10-05-2022_2.pdf" target="_blank" className="text-primary underline">View</a>
              </td>
            </tr>
            <tr>
              <td>2020-21</td>
              <td>
                1. Minutes of Meeting held on 04-01-2021 - <a href="IQAC/Minutes of the meeting 04-01-2021_1.pdf" target="_blank" className="text-primary underline">View</a><br />
                2. Minutes of Meeting held on 24-04-2021 - <a href="IQAC/Minutes of the meeting 24-04-2021_2.pdf" target="_blank" className="text-primary underline">View</a>
              </td>
            </tr>
            <tr>
              <td>2019-20</td>
              <td>
                1. Minutes of Meeting held on 16-10-2019 - <a href="IQAC/Minutes of the meeting 16-10-2019_1.pdf" target="_blank" className="text-primary underline">View</a><br />
                2. Minutes of Meeting held on 18-04-2020 - <a href="IQAC/Minutes of the meeting 18-04-2020_2.pdf" target="_blank" className="text-primary underline">View</a>
              </td>
            </tr>
            <tr>
              <td>2018-19</td>
              <td>
                1. Minutes of Meeting held on 30-11-2018 - <a href="IQAC/Minutes of Meeting_30-11-2018_1.pdf" target="_blank" className="text-primary underline">View</a><br />
                2. Minutes of Meeting held on 25-04-2019 - <a href="IQAC/Minutes of Meeting_25-04-2019_2.pdf" target="_blank" className="text-primary underline">View</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
)}


          {activeSidebarItem === 'Sri Vasavi Society' && (
            <section className="py-16 bg-background">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Sri Vasavi Society</h2>
                <p className="mb-6 text-muted-foreground text-lg">
                  Sri Vasavi Educational Society was established in 2001 by a group of philanthropists and visionaries with the objective of providing quality technical education in the region. The society is registered under the Societies Registration Act XXI of 1860 and has been instrumental in the growth and development of Sri Vasavi Engineering College.
                </p>
                <p className="mb-6 text-muted-foreground text-lg">
                  The society is committed to imparting value-based education and fostering an environment of academic excellence, innovation, and social responsibility. It is governed by a Board of Management comprising eminent personalities from various fields, who guide the institution in its mission to nurture competent professionals.
                </p>
                <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">Objectives of the Society</h3>
                <ul className="list-disc pl-6 mb-6 text-muted-foreground">
                  <li>To establish and manage educational institutions for imparting quality education in engineering and technology.</li>
                  <li>To promote research and development activities in various disciplines.</li>
                  <li>To encourage co-curricular and extra-curricular activities for the holistic development of students.</li>
                  <li>To provide scholarships and financial assistance to deserving students.</li>
                  <li>To foster industry-institute interaction for better employability and skill development.</li>
                </ul>
                <h3 className="text-2xl font-semibold text-primary mt-8 mb-4">Society Members</h3>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full bg-white border border-primary rounded-xl shadow-md">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-4 py-2">SNo</th>
                        <th className="px-4 py-2">Members</th>
                        <th className="px-4 py-2">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground">
                      <tr><td>1</td><td>Sri K. V. Ramakrishna Rao</td><td>Vice President</td></tr>
                      <tr><td>2</td><td>Sri Pabolu Venkateswara Rao</td><td>Joint Secretary</td></tr>
                      <tr><td>3</td><td>Sri P. Bala Kasaiah</td><td>Treasurer</td></tr>
                      <tr><td>4</td><td>Sri Ch. V. R. K Subbarao</td><td>Member</td></tr>
                      <tr><td>5</td><td>Smt. Grandhi Ratnavathi</td><td>Member</td></tr>
                      <tr><td>6</td><td>Sri Ch.Sai Lakshmana Rao</td><td>Member</td></tr>
                      <tr><td>7</td><td>Sri Ch. V. R Ramana Murthy</td><td>Member</td></tr>
                      <tr><td>8</td><td>Sri Juluri Neelakanteswara Rao</td><td>Member</td></tr>
                      <tr><td>9</td><td>Sri P.Rama Krishna Rao</td><td>Member</td></tr>
                      <tr><td>10</td><td>Sri Kanamarlapudi L.N.Prasad</td><td>Member</td></tr>
                      <tr><td>11</td><td>Sri Maddali Mohan Babu</td><td>Member</td></tr>
                      <tr><td>12</td><td>Sri Kotla Venkata Rama Krishna Rao</td><td>Member</td></tr>
                      <tr><td>13</td><td>Sri Nunna Lakshmi Narayana</td><td>Member</td></tr>
                      <tr><td>14</td><td>Sri P.Chenchu Subbarao</td><td>Member</td></tr>
                      <tr><td>15</td><td>Smt. Kolla Parvathi Devi</td><td>Member</td></tr>
                      <tr><td>16</td><td>Smt. N.Sreedevi</td><td>Member</td></tr>
                    </tbody>
                  </table>
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
