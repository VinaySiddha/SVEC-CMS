"use client";
import React from 'react';
import { Mail, Phone, MapPin, Users, Award, BookOpen, Briefcase } from 'lucide-react';
import '../../../components/Carousel.css';

const HeadOfDepartments: React.FC = () => {
  const hods = [
    {
      name: "Dr. D. Jaya Kumari",
      designation: "Head of Departments",
      department: "Computer Science Engineering & Computer Science and Technology",
      shortDept: "CSE & CST",
      qualifications: "Ph.D, M.Tech, B.Tech",
      experience: "20+ Yrs",
      email: "hod.cse@srivasaviengg.ac.in",
      phone: "",
      office: "CSE Dept",
      image: "/cse_hod1.jpeg",
      achievements: ["50+ Publications", "Industry Projects", "Patent Filed"],
      departmentStats: {
        faculty: "90+",
        students: "1200+",
        labs: "4",
        projects: "45"
      }
    },

    {
      name: "Dr. G. Loshma",
      designation: "Head of Departments",
      department: "Artificial Intelligence and Machine Learning, CSE-Artificial Intelligence, CSE-Data Science",
      shortDept: "CSE-AI, AIML, CSE-DS",
      qualifications: "Ph.D, M.E, B.E",
      experience: "20+ Yrs",
      email: "hod.aiml@srivasaviengg.ac.in",
      phone: "",
      office: "AIML Dept",
      image: "/aihod.jpg",
      achievements: ["40+ Publications", "Research Grants", "Industry Collaboration"],
      departmentStats: {
        faculty: 20,
        students: 600,
        labs: 3,
        projects: 35
      }
    },
    {
      name: "Dr. E. Kusuma Kumari",
      designation: "Head of Departments",
      department: "Electronics and Communication Engineering & Electronics and Communication Technology",
      shortDept: "ECE & ECT",
      qualifications: "Ph.D, M.Tech, B.Tech",
      experience: "15+ Yrs",
      email: "hod.ece@srivasaviengg.ac.in",
      phone: "",
      office: "ECE Dept, Block A",
      image: "/ecehod.jpg",
      achievements: ["35+ Publications", "Consultancy Projects", "Tech Transfer"],
      departmentStats: {
        faculty: 18,
        students: 500,
        labs: 7,
        projects: 30
      }
    },
    {
      name: "Dr.G.Radhakrishnan",
      designation: "Head of Department",
      department: "CIVIL",
      shortDept: "CIVIL",
      qualifications: "Ph.D, M.E, B.Tech",
      experience: "30+ Yrs",
      email: "hod.civil@srivasaviengg.ac.in",
      phone: "",
      office: "CIVIL Dept",
      image: "/civilhod.png",
      achievements: ["30+ Publications", "Government Projects", "Infrastructure Design"],
      departmentStats: {
        faculty: 15,
        students: 400,
        labs: 5,
        projects: 25
      }
    },
    {
      name: "Dr. Sudha Rani Donpeudi",
      designation: "Head of Department",
      department: "Electrical and Electronics Engineering",
      shortDept: "EEE",
      qualifications: "Ph.D, M.E, B.Tech",
      experience: "17+ Yrs",
      email: "hod.eee@srivasaviengg.ac.in",
      phone: "",
      office: "EEE Dept",
      image: "/eeehod.jpg",
      achievements: ["45+ Publications", "Energy Projects", "Smart Grid Research"],
      departmentStats: {
        faculty: 22,
        students: 650,
        labs: 7,
        projects: 40
      }
    },
    {
      name: "Dr. M. V. Ramesh",
      designation: "Head of Department",
      department: "Mechanical Engineering",
      shortDept: "ME",
      qualifications: "Ph.D, M.Tech, B.Tech",
      experience: "17+ Yrs",
      email: "hod.me@srivasaviengg.ac.in",
      phone: "",
      office: "ME Dept",
      image: "/mechhod.jpg",
      achievements: ["45+ Publications", "Energy Projects", "Smart Grid Research"],
      departmentStats: {
        faculty: 22,
        students: 650,
        labs: 7,
        projects: 40
      }
    },
    {
      name: " Sri N. Raja Sekhar",
      designation: "Head of Department",
      department: "Basic Sciences and Humanities",
      shortDept: "BSH",
      qualifications: "M.Phil, M.Sc, B.Sc",
      experience: "20+ Yrs",
      email: "hod.bsh@srivasaviengg.ac.in",
      phone: "",
      office: "BSH Dept",
      image: "/bshhod.jpg",
      achievements: ["25+ Publications", "Textbooks", "Educational Innovations"],
      departmentStats: {
        faculty: 40,
        students: 1800,
        labs: 8,
        projects: 15
      }
    },
    {
      name: "Mr. D. Naveen Kumar",
      designation: "Head of Department",
      department: "Master of Business Administration",
      shortDept: "MBA",
      qualifications: "Ph.D, MBA, B.Sc",
      experience: "17+ Yrs",
      email: "hod.mba@srivasaviengg.ac.in",
      phone: "",
      office: "MBA Dept",
      image: "/mbaHosd1.jpeg",
      specialization: "Finance, HR Management",
      achievements: ["28+ Publications", "Corporate Training", "Management Consulting"],
      departmentStats: {
        faculty: 16,
        students: 240,
        labs: 2,
        projects: 30
      }
    }
  ];

  const departmentServices = [
    {
      icon: BookOpen,
      title: "Academic Programs",
      description: "Undergraduate and postgraduate programs with industry-relevant curriculum"
    },
    {
      icon: Users,
      title: "Faculty Development",
      description: "Continuous training and skill enhancement for teaching staff"
    },
    {
      icon: Award,
      title: "Research & Innovation",
      description: "Active research projects and patent filing initiatives"
    },
    {
      icon: Briefcase,
      title: "Industry Connect",
      description: "Strong partnerships with industry for placements and projects"
    }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-animate">
            Heads of Departments
          </h1>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
            {[
              { label: "Depts", value: "12", icon: "🏢" },
              { label: "Faculty", value: "310+", icon: "👨‍🏫" },
              { label: "Students", value: "7370+", icon: "🎓" },
              { label: "Labs", value: "58+", icon: "🔬" }
            ].map((stat, index) => (
              <div
                key={index}
                className="stat-card text-center p-3 sm:p-4 rounded-lg bg-[#FFF8F0] border hover:shadow transition-all"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#B22222] mb-0.5 sm:mb-1">{stat.value}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Services */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#B22222] mb-4">Department Services</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Comprehensive services provided by each department for student and faculty development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentServices.map((service, index) => (
              <div
                key={index}
                className="quick-link bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all text-center"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <service.icon className="w-12 h-12 text-[#B22222] mx-auto mb-4 icon-bounce" />
                <h3 className="text-lg font-bold text-[#B22222] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HODs Profiles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#B22222] mb-4">Department Heads</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Meet the experienced leaders guiding our engineering departments
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {[...hods].sort((a, b) => a.department.localeCompare(b.department)).map((hod, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
                {/* HOD Profile - Photo and Details side by side */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:grid-rows-[auto]">
                    {/* HOD Photo */}
                    <div className="text-center md:col-span-1">
                      <div className="relative inline-block transition-transform hover:-translate-y-1 duration-300 h-full w-full flex items-center justify-center">
                        <div className="relative w-full">
                          <img
                            src={hod.image}
                            alt={hod.name}
                            className="w-full h-[200px] md:h-[240px] object-cover rounded-xl shadow-lg"
                            style={{ animation: "slideInUp 0.6s ease-out", objectPosition: "center 20%" }}
                          />
                          <div className="absolute -bottom-4 -right-4 bg-[#B22222] text-white p-3 rounded-lg shadow-lg transform rotate-3">
                            <p className="font-bold text-sm">{hod.experience}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* HOD Details - Blush Colored Card */}
                    <div className="md:col-span-1 flex">
                      <div className="bg-gradient-to-br from-[#FFF8F0] to-white p-4 sm:p-6 rounded-xl border shadow-sm text-center md:text-left w-full flex flex-col justify-center text-animate" style={{ animationDelay: `${index * 0.3 + 0.2}s` }}>
                        <h3 className="text-2xl font-bold text-[#B22222] mb-1">{hod.name}</h3>
                        <p className="text-sm text-gray-700 mb-3">{hod.qualifications}</p>
                        <p className="text-lg text-gray-600 mb-2">{hod.designation}</p>
                        <div className="text-[#B22222] font-semibold mb-4 text-sm md:text-base">
                          {hod.department.split(/[,&]/).map((dept, i) => (
                            <p key={i} className="mb-0.5 leading-tight">{dept.trim()}</p>
                          ))}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <Mail className="w-4 h-4 text-[#B22222] flex-shrink-0" />
                            <a href={`mailto:${hod.email}`} className="text-gray-600 hover:text-[#B22222] transition-colors truncate">
                              {hod.email}
                            </a>
                          </div>
                          {hod.phone && (
                            <div className="flex items-center justify-center md:justify-start gap-2">
                              <Phone className="w-4 h-4 text-[#B22222]" />
                              <a href={`tel:${hod.phone}`} className="text-gray-600 hover:text-[#B22222] transition-colors">
                                {hod.phone}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <MapPin className="w-4 h-4 text-[#B22222]" />
                            <span className="text-gray-600">{hod.office}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="md:col-span-1 flex">
                      <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow w-full flex flex-col justify-center text-animate" style={{ animationDelay: `${index * 0.3 + 0.6}s` }}>
                        <h4 className="text-lg font-semibold text-[#B22222] mb-3">Key Achievements</h4>
                        <ul className="space-y-3 md:pl-0 pl-1">
                          {hod.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-[#B22222] mt-1 flex-shrink-0" />
                              <span className="text-gray-700 text-sm md:text-base">{achievement}</span>
                            </li>
                          ))}
                          {hod.specialization && (
                            <li className="flex items-start gap-2 mt-4 pt-2 border-t border-gray-100">
                              <BookOpen className="w-4 h-4 text-[#B22222] mt-1 flex-shrink-0" />
                              <span className="text-gray-700 text-sm md:text-base">
                                <span className="font-medium">Specialization:</span> {hod.specialization}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Statistics - Full Width */}
                <div className="lg:col-span-3 mt-6">
                  <div className="bg-gradient-to-r from-[#FFF8F0] to-white p-4 sm:p-6 rounded-xl border shadow-sm text-animate" style={{ animationDelay: `${index * 0.3 + 0.8}s` }}>
                    <h4 className="text-lg font-semibold text-[#B22222] mb-3 sm:mb-4 flex items-center">
                      <span className="mr-2">📊</span>
                      Department Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                      <div className="p-2 sm:p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex items-center">
                          <div className="bg-[#FFF0E6] p-1 sm:p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-2 sm:mr-3">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#B22222]" />
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-bold text-[#B22222]">{hod.departmentStats.faculty}</div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium">Faculty</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex items-center">
                          <div className="bg-[#FFF0E6] p-1 sm:p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-2 sm:mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-[#B22222]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-bold text-[#B22222]">{hod.departmentStats.students}</div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium">Students</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex items-center">
                          <div className="bg-[#FFF0E6] p-1 sm:p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-2 sm:mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-[#B22222]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10 2v7.31"></path>
                              <path d="M14 9.3V1.99"></path>
                              <path d="M8.5 2h7"></path>
                              <path d="M14 7.99H6.06L2 12.99v6c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-6l-4.06-5H14z"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-bold text-[#B22222]">{hod.departmentStats.labs}</div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium">Labs</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                        <div className="flex items-center">
                          <div className="bg-[#FFF0E6] p-1 sm:p-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-2 sm:mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-[#B22222]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 9a3 3 0 0 1 0-6h12a3 3 0 0 1 0 6h-3"></path>
                              <path d="M16 20a3 3 0 0 0 0-6H4a3 3 0 0 0 0 6h8"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl font-bold text-[#B22222]">{hod.departmentStats.projects}</div>
                            <div className="text-xs sm:text-sm text-gray-600 font-medium">Projects</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborative Framework */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#B22222] mb-4">Inter-Departmental Collaboration</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Fostering cross-disciplinary research and knowledge sharing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Joint Research Projects",
                description: "Collaborative research initiatives spanning multiple departments",
                icon: "🔬"
              },
              {
                title: "Interdisciplinary Courses",
                description: "Cross-departmental electives and specialized programs",
                icon: "📚"
              },
              {
                title: "Shared Resources",
                description: "Common labs, equipment, and research facilities",
                icon: "🏭"
              },
              {
                title: "Faculty Exchange",
                description: "Knowledge sharing through guest lectures and workshops",
                icon: "👥"
              },
              {
                title: "Student Projects",
                description: "Multi-disciplinary capstone and research projects",
                icon: "🎯"
              },
              {
                title: "Industry Partnerships",
                description: "Joint industry collaborations and consultancy projects",
                icon: "🤝"
              }
            ].map((initiative, index) => (
              <div
                key={index}
                className="quick-link bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{initiative.icon}</div>
                <h3 className="text-lg font-bold text-[#B22222] mb-3">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-8 sm:py-12 bg-[#B22222] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Connect with HODs</h2>
          <p className="text-sm sm:text-base mb-4 sm:mb-6 max-w-xl mx-auto">
            Reach out for academic programs, research collaborations, or departmental matters
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 max-w-6xl mx-auto">
            {[...hods].sort((a, b) => a.department.localeCompare(b.department)).map((hod, index) => (
              <a
                key={index}
                href={`mailto:${hod.email}`}
                className="btn-dynamic bg-white text-[#B22222] px-2 sm:px-3 py-2 rounded-lg font-medium text-xs sm:text-sm hover:bg-[#f9e8e8] transition-all block truncate whitespace-nowrap overflow-hidden text-ellipsis"
                title={`${hod.shortDept} - ${hod.name}`}
              >
                {hod.shortDept}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeadOfDepartments;
