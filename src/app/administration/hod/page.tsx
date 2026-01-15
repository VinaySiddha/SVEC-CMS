"use client";
import React from 'react';
import { Mail, Phone, MapPin, Users, Award, BookOpen, Briefcase } from 'lucide-react';
import '../../../components/Carousel.css';

const HeadOfDepartments: React.FC = () => {
  const hods = [
    {
      name: "Dr. D. Jaya Kumari",
      designation: "Head of the Department of",
      department: "Computer Science Engineering & Computer Science and Technology",
      shortDept: "CSE & CST",
      qualifications: "B.Tech.,M.Tech.,Ph.D",
      experience: "20+ Yrs",
      email: "hod_cse@srivasaviengg.ac.in",
      office: "CSE Dept",
      image: "/cse_hod1.jpeg",
      achievements: ["50+ Publications", "Industry Projects", "Patent Filed"],
      
    },

    {
      name: "Dr. G. Loshma",
      designation: "Head of the Department of",
      department: "Artificial Intelligence and Machine Learning, CSE-Artificial Intelligence, CSE-Data Science",
      shortDept: "CSE-AI, AIML, CSE-DS",
      qualifications: "BE.,ME.,Ph.D",
      experience: "20+ Yrs",
      email: "hod_aiml@srivasaviengg.ac.in",
      phone: "",
      office: "AIML Dept",
      image: "/aihod.jpg",
      achievements: ["40+ Publications", "Research Grants", "Industry Collaboration"],
      
    },
    {
      name: "Dr. E. Kusuma Kumari",
      designation: "Head of Departments",
      department: "Electronics and Communication Engineering & Electronics and Communication Technology",
      shortDept: "ECE & ECT",
      qualifications: "B.Tech.,M.Tech.,Ph.D",
      experience: "15+ Yrs",
      email: "hod_ece@srivasaviengg.ac.in",
      image: "/ecehod.jpg",
      achievements: ["35+ Publications", "Consultancy Projects", "Tech Transfer"],
      
    },
    {
      name: "Dr. G. Radhakrishnan",
      designation: "Head of Department",
      department: "CIVIL",
      shortDept: "CIVIL",
      qualifications: "B.Tech.,M.E.,Ph.D",
      experience: "30+ Yrs",
      email: "hod_civil@srivasaviengg.ac.in",
      office: "CIVIL Dept",
      image: "/civilhod.png",
      achievements: ["30+ Publications", "Government Projects", "Infrastructure Design"],
      
    },
    {
      name: "Dr. Sudha Rani Donpeudi",
      designation: "Head of Department",
      department: "Electrical and Electronics Engineering",
      shortDept: "EEE",
      qualifications: "B.Tech.,M.E.,Ph.D",
      experience: "17+ Yrs",
      email: "hod_eee@srivasaviengg.ac.in",
      office: "EEE Dept",
      image: "/eeehod.jpg",
      achievements: ["45+ Publications", "Energy Projects", "Smart Grid Research"],
      
    },
    {
      name: "Dr. M. V. Ramesh",
      designation: "Head of Department",
      department: "Mechanical Engineering",
      shortDept: "ME",
      qualifications: "B.Tech.,M.Tech.,Ph.D",
      experience: "17+ Yrs",
      email: "hod_mech@srivasaviengg.ac.in",
      office: "ME Dept",
      image: "/mechhod.jpg",
      achievements: ["45+ Publications", "Energy Projects", "Smart Grid Research"],
      
    },
    {
      name: " Mr. N. Raja Sekhar",
      designation: "Head of the Department of",
      department: "Basic Sciences and Humanities",
      shortDept: "BSH",
      qualifications: "B.Sc.,M.Sc.,M.Phil",
      experience: "30+ Yrs",
      email: "hod_bsh@srivasaviengg.ac.in",
      phone: "08818-284355(O), Ext: 393",
      office: "BSH Dept",
      image: "/bshhod.jpg",
      achievements: ["25+ Publications", "Textbooks", "Educational Innovations"],
      
    },
    {
      name: "Mr. D. Naveen Kumar",
      designation: "Head of the Department of",
      department: "Master of Business Administration",
      shortDept: "MBA",
      office: "MBA Dept",
      image: "/mbaHosd1.jpeg",
      
      achievements: ["28+ Publications", "Corporate Training", "Management Consulting"],
      
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
      {/* HODs Profiles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborative Framework */}
      

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
