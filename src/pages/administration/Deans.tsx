import React from 'react';
import { Mail, Phone, Users, BookOpen, Award } from 'lucide-react';
import '../../components/Carousel.css';

const Deans: React.FC = () => {
  const deans = [
    
    {
      name: "Dr. Ch. Rambabu",
      designation: "Dean - Student Affairs",
      department: "Electronics & Electrical Engineering",
      qualifications: "M.Tech.,Ph.D",
      experience: "20+ Years",
      email: "dean.student@srivasaviengg.ac.in",
      phone: "+91-866-2461558",
      image: "/rambabu.jpeg",
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {officeStructure.map((office, index) => (
              <div 
                key={index}
                className="stat-card text-center p-8 rounded-xl bg-[#FFF8F0] border hover:shadow-lg transition-all"
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

          <div className="space-y-16">
            {deans.map((dean, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Dean Image */}
                <div className={`text-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative inline-block">
                    <img
                      src={dean.image}
                      alt={dean.name}
                      className="w-80 h-96 object-cover rounded-xl shadow-lg mx-auto stat-card"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-[#B22222] text-white p-4 rounded-xl shadow-lg">
                      <p className="font-bold text-lg">{dean.experience}</p>
                      <p className="text-sm">Experience</p>
                    </div>
                  </div>
                </div>

                {/* Dean Information */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="text-animate" style={{ animationDelay: `${index * 0.3 + 0.2}s` }}>
                    <h3 className="text-3xl font-bold text-[#B22222] mb-2">{dean.name}</h3>
                    <p className="text-xl text-gray-600 mb-2">{dean.designation}</p>
                    <p className="text-lg text-[#B22222] mb-4">{dean.department}</p>
                    <p className="text-gray-700 mb-4">{dean.qualifications}</p>
                    <p className="text-gray-600">
                      <strong>Specialization:</strong> {dean.specialization}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3 text-animate" style={{ animationDelay: `${index * 0.3 + 0.4}s` }}>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#B22222]" />
                      <a href={`mailto:${dean.email}`} className="text-gray-700 hover:text-[#B22222]">
                        {dean.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#B22222]" />
                      <a href={`tel:${dean.phone}`} className="text-gray-700 hover:text-[#B22222]">
                        {dean.phone}
                      </a>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="bg-white p-6 rounded-xl shadow border text-animate" style={{ animationDelay: `${index * 0.3 + 0.6}s` }}>
                    <h4 className="text-lg font-semibold text-[#B22222] mb-4">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {dean.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#B22222] rounded-full mt-2"></div>
                          <span className="text-gray-700">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="quick-link bg-[#FFF8F0] p-6 rounded-xl border hover:shadow-lg transition-all text-center"
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

      {/* Contact Section */}
      <section className="py-16 bg-[#B22222] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect with Our Deans</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Reach out to the respective dean offices for academic, student, or research-related matters
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {deans.map((dean, index) => (
              <a
                key={index}
                href={`mailto:${dean.email}`}
                className="btn-dynamic bg-white text-[#B22222] px-6 py-3 rounded-lg font-semibold hover:bg-[#f9e8e8] transition-all block"
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
