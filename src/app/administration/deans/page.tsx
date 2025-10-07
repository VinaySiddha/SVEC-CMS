"use client";
import React from 'react';
import { Mail, Phone, Users, BookOpen, Award } from 'lucide-react';
import '../../../components/Carousel.css';

const Deans: React.FC = () => {
  const deans = [

    {
      name: "Dr. Ch. Rambabu",
      designation: "Dean - Student Affairs & Academics",
      department: "Electronics & Electrical Engineering",
      qualifications: "M.Tech.,Ph.D",
      experience: "20+ Years",
      email: "dean.student@srivasaviengg.ac.in",
      phone: "+91-9441447199",
      image: "/rambabu.jpg",
      specialization: "VLSI Design, Embedded Systems",
      responsibilities: [
        "Student welfare and development programs",
        "Co-curricular and extracurricular activities",
        "Student counseling and support services",
        "Disciplinary matters and grievance handling"
      ]
    },
    {
      name: "Dr. V. S Naresh",
      designation: "Dean - Research & Development",
      department: "Computer Science & Engineering",
      qualifications: "M.Tech., Ph.D",
      experience: "20+ Years",
      email: "deanrnd@srivasaviengg.ac.in",
      phone: "+91-9491556014",
      image: "/naresh.jpeg",
      specialization: "Cyber Security",
      responsibilities: [
        "Research project coordination and management",
        "Industry collaboration and consultancy",
        "Patent filing and intellectual property",
        "Research funding and grant applications"
      ]
    }
  ];

  const officeStructure = [

    {
      icon: Users,
      title: "Student Affairs",
      description: "Student welfare, activities, and support services",
      contact: "dean.student@srivasaviengg.ac.in"
    },
    {
      icon: Award,
      title: "Research & Development",
      description: "Research initiatives, innovation, and industry partnerships",
      contact: "deanrnd@srivasaviengg.ac.in"
    }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-animate">
            Office of the Deans
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-animate" style={{ animationDelay: '0.3s' }}>
            Leading specialized functions in academics, student affairs, and research development
          </p>
        </div>
      </section>

      {/* Office Structure Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#B22222] mb-4">Dean Offices</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Specialized leadership roles ensuring excellence across all institutional functions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-16 max-w-5xl mx-auto">
            {officeStructure.map((office, index) => (
              <div
                key={index}
                className="stat-card text-center p-8 rounded-xl bg-[#FFF8F0] border hover:shadow-lg transition-all w-full md:w-[340px]"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <office.icon className="w-16 h-16 text-[#B22222] mx-auto mb-4 icon-bounce" />
                <h3 className="text-xl font-bold text-[#B22222] mb-3">{office.title}</h3>
                <p className="text-gray-600 mb-4">{office.description}</p>
                <a
                  href={`mailto:${office.contact}`}
                  className="text-[#B22222] hover:underline font-medium"
                >
                  {office.contact}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deans Profiles */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#B22222] mb-4">Meet Our Deans</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Experienced leaders driving excellence in their respective domains
            </p>
          </div>

          <div className="space-y-24">
            {deans.map((dean, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  } grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}
              >
                {/* Dean Image */}
                <div className={`text-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative inline-block w-full max-w-md">
                    <img
                      src={dean.image}
                      alt={dean.name}
                      className="w-full aspect-[4/3] object-cover object-center rounded-xl shadow-lg mx-auto stat-card"
                    />
                    <div className="absolute -bottom-5 -right-5 bg-[#B22222] text-white p-3 rounded-xl shadow-lg">
                      <p className="font-bold text-lg">{dean.experience}</p>
                      <p className="text-sm">Experience</p>
                    </div>
                  </div>
                </div>

                {/* Dean Information */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="text-animate bg-gradient-to-r from-[#FFF8F0] to-white p-5 rounded-xl shadow-sm" style={{ animationDelay: `${index * 0.3 + 0.2}s` }}>
                    <h3 className="text-3xl font-bold text-[#B22222] mb-3">{dean.name}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="px-3 py-1 bg-[#B22222] text-white rounded-full text-sm font-medium">{dean.designation}</span>
                      <span className="px-3 py-1 bg-[#0097A7] bg-opacity-10 text-[#0097A7] rounded-full text-sm font-medium">{dean.department}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-700 flex items-center">
                        <span className="w-5 h-5 rounded-full bg-[#B22222] bg-opacity-10 flex items-center justify-center text-[#B22222] mr-2 text-xs">●</span>
                        <span className="font-medium mr-2">Qualifications:</span> {dean.qualifications}
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <BookOpen className="w-4 h-4 text-[#B22222] mr-2" />
                        <span className="font-medium mr-2">Specialization:</span> {dean.specialization}
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="flex flex-wrap gap-5 text-animate my-5" style={{ animationDelay: `${index * 0.3 + 0.4}s` }}>
                    <div className="flex items-center gap-3 bg-[#FFF8F0] p-3 rounded-lg shadow-sm">
                      <Mail className="w-5 h-5 text-[#B22222]" />
                      <a href={`mailto:${dean.email}`} className="text-gray-700 hover:text-[#B22222]">
                        {dean.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 bg-[#FFF8F0] p-3 rounded-lg shadow-sm">
                      <Phone className="w-5 h-5 text-[#B22222]" />
                      <a href={`tel:${dean.phone}`} className="text-gray-700 hover:text-[#B22222]">
                        {dean.phone}
                      </a>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="bg-[#FFF8F0] p-6 rounded-xl text-animate" style={{ animationDelay: `${index * 0.3 + 0.6}s` }}>
                    <h4 className="text-lg font-semibold text-[#B22222] mb-4 flex items-center">
                      <Award className="w-5 h-5 text-[#B22222] mr-2" />
                      Key Responsibilities
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {dean.responsibilities.map((responsibility, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                          <div className="w-2 h-2 bg-[#B22222] rounded-full mt-2"></div>
                          <span className="text-gray-700">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborative Initiatives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#B22222] mb-4">Collaborative Initiatives</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Joint efforts by all dean offices to enhance institutional excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Quality Enhancement",
                description: "Continuous improvement in academic delivery and student experience",
                icon: "🎯"
              },
              {
                title: "Innovation Hub",
                description: "Fostering research culture and innovative thinking across disciplines",
                icon: "💡"
              },
              {
                title: "Industry Connect",
                description: "Building strong partnerships with industry leaders and organizations",
                icon: "🤝"
              },
              {
                title: "Global Outreach",
                description: "International collaborations and exchange programs",
                icon: "🌍"
              }
            ].map((initiative, index) => (
              <div
                key={index}
                className="quick-link bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl bg-[#FFF8F0] p-4 rounded-xl w-16 h-16 flex items-center justify-center">{initiative.icon}</div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-[#B22222] mb-2">{initiative.title}</h3>
                  <p className="text-gray-600">{initiative.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#B22222] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect with Our Deans</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Reach out to the respective dean offices for academic, student, or research-related matters
          </p>
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center max-w-3xl mx-auto">
            {deans.map((dean, index) => (
              <a
                key={index}
                href={`mailto:${dean.email}`}
                className="btn-dynamic bg-white text-[#B22222] px-8 py-4 rounded-lg font-semibold hover:bg-[#f9e8e8] transition-all w-full md:w-auto text-center"
              >
                Contact {dean.designation.split(' - ')[1]}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deans;
