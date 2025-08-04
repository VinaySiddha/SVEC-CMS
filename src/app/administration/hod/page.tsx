"use client";
import React from 'react';
import { Mail, Phone, MapPin, Users, Award, BookOpen, Briefcase } from 'lucide-react';
import '../../../components/Carousel.css';

const HeadOfDepartments: React.FC = () => {
  const hods = [
    {
      name: "Dr. D. Jaya Kumari",
      designation: "Head of Department",
      department: "Computer Science & Engineering",
      qualifications: "Ph.D in Computer Science, M.Tech, B.Tech",
      experience: "15+ Years",
      email: "hod.cse@srivasaviengg.ac.in",
      office: "CSE Department, Block B",
      image: "/cse_hod1.jpeg",
      specialization: "Data Structures, Algorithms, Software Engineering",
      achievements: ["50+ Publications", "Industry Projects", "Patent Filed"],
      departmentStats: {
        faculty: 60,
        students: 1200,
        labs: 4,
        projects: 45
      }
    },
    {
      name: "Dr. G. Loshma",
      designation: "Head of Department",
      department: "Electronics & Communication Engineering",
      qualifications: "Ph.D in Electronics, M.E, B.E",
      experience: "14+ Years",
      email: "hod.ece@srivasaviengg.ac.in",
      phone: "+91-866-2461561",
      office: "ECE Department, Block B",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop&crop=face",
      specialization: "Digital Signal Processing, Communication Systems",
      achievements: ["40+ Publications", "Research Grants", "Industry Collaboration"],
      departmentStats: {
        faculty: 20,
        students: 600,
        labs: 6,
        projects: 35
      }
    },
    {
      name: "Dr. M. Venkata Reddy",
      designation: "Head of Department",
      department: "Mechanical Engineering",
      qualifications: "Ph.D in Mechanical Engineering, M.Tech, B.Tech",
      experience: "16+ Years",
      email: "hod.mech@srivasaviengg.ac.in",
      phone: "+91-866-2461562",
      office: "Mechanical Department, Block C",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
      specialization: "Thermal Engineering, Manufacturing Technology",
      achievements: ["35+ Publications", "Consultancy Projects", "Technology Transfer"],
      departmentStats: {
        faculty: 18,
        students: 500,
        labs: 7,
        projects: 30
      }
    },
    {
      name: "Dr. K. Madhavi",
      designation: "Head of Department",
      department: "Civil Engineering",
      qualifications: "Ph.D in Civil Engineering, M.Tech, B.Tech",
      experience: "13+ Years",
      email: "hod.civil@srivasaviengg.ac.in",
      phone: "+91-866-2461563",
      office: "Civil Department, Block D",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
      specialization: "Structural Engineering, Construction Management",
      achievements: ["30+ Publications", "Government Projects", "Infrastructure Design"],
      departmentStats: {
        faculty: 15,
        students: 400,
        labs: 5,
        projects: 25
      }
    },
    {
      name: "Dr. S. Rajesh",
      designation: "Head of Department",
      department: "Electrical & Electronics Engineering",
      qualifications: "Ph.D in Electrical Engineering, M.Tech, B.Tech",
      experience: "17+ Years",
      email: "hod.eee@srivasaviengg.ac.in",
      phone: "+91-866-2461564",
      office: "EEE Department, Block E",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
      specialization: "Power Systems, Renewable Energy, Control Systems",
      achievements: ["45+ Publications", "Energy Projects", "Smart Grid Research"],
      departmentStats: {
        faculty: 22,
        students: 650,
        labs: 7,
        projects: 40
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
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-animate">
            Head of Departments
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-animate" style={{ animationDelay: '0.3s' }}>
            Departmental leaders driving academic excellence and innovation across all engineering disciplines
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { label: "Departments", value: "5", icon: "🏢" },
              { label: "Faculty Members", value: "100+", icon: "👨‍🏫" },
              { label: "Students", value: "2950+", icon: "🎓" },
              { label: "Research Labs", value: "33", icon: "🔬" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="stat-card text-center p-6 rounded-xl bg-[#FFF8F0] border hover:shadow transition-all"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-[#B22222] mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
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

          <div className="space-y-20">
            {hods.map((hod, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* HOD Profile */}
                <div className="lg:col-span-1">
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <img
                        src={hod.image}
                        alt={hod.name}
                        className="w-64 h-80 object-cover rounded-xl shadow-lg mx-auto stat-card"
                      />
                      <div className="absolute -bottom-4 -right-4 bg-[#B22222] text-white p-3 rounded-lg shadow-lg">
                        <p className="font-bold text-sm">{hod.experience}</p>
                      </div>
                    </div>
                    
                    <div className="text-animate" style={{ animationDelay: `${index * 0.3 + 0.2}s` }}>
                      <h3 className="text-2xl font-bold text-[#B22222] mb-2">{hod.name}</h3>
                      <p className="text-lg text-gray-600 mb-2">{hod.designation}</p>
                      <p className="text-[#B22222] font-semibold mb-4">{hod.department}</p>
                      
                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4 text-[#B22222]" />
                          <a href={`mailto:${hod.email}`} className="text-gray-600 hover:text-[#B22222]">
                            {hod.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4 text-[#B22222]" />
                          <a href={`tel:${hod.phone}`} className="text-gray-600 hover:text-[#B22222]">
                            {hod.phone}
                          </a>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="w-4 h-4 text-[#B22222]" />
                          <span className="text-gray-600">{hod.office}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details and Stats */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Qualifications and Specialization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#FFF8F0] p-6 rounded-xl border text-animate" style={{ animationDelay: `${index * 0.3 + 0.4}s` }}>
                      <h4 className="text-lg font-semibold text-[#B22222] mb-3">Qualifications</h4>
                      <p className="text-gray-700 mb-4">{hod.qualifications}</p>
                      <h5 className="font-semibold text-[#B22222] mb-2">Specialization</h5>
                      <p className="text-gray-600">{hod.specialization}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border shadow text-animate" style={{ animationDelay: `${index * 0.3 + 0.6}s` }}>
                      <h4 className="text-lg font-semibold text-[#B22222] mb-3">Achievements</h4>
                      <ul className="space-y-2">
                        {hod.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#B22222]" />
                            <span className="text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Department Statistics */}
                  <div className="bg-gradient-to-r from-[#FFF8F0] to-white p-6 rounded-xl border text-animate" style={{ animationDelay: `${index * 0.3 + 0.8}s` }}>
                    <h4 className="text-lg font-semibold text-[#B22222] mb-4">Department Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#B22222]">{hod.departmentStats.faculty}</div>
                        <div className="text-sm text-gray-600">Faculty</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#B22222]">{hod.departmentStats.students}</div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#B22222]">{hod.departmentStats.labs}</div>
                        <div className="text-sm text-gray-600">Labs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#B22222]">{hod.departmentStats.projects}</div>
                        <div className="text-sm text-gray-600">Projects</div>
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
      <section className="py-16 bg-[#B22222] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect with Department Heads</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Reach out to the respective HODs for academic programs, research collaborations, or departmental matters
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {hods.map((hod, index) => (
              <a
                key={index}
                href={`mailto:${hod.email}`}
                className="btn-dynamic bg-white text-[#B22222] px-4 py-3 rounded-lg font-semibold hover:bg-[#f9e8e8] transition-all block text-sm"
              >
                {hod.department.split(' ')[0]} Dept.
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeadOfDepartments;
