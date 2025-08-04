import React from 'react';
import { TrendingUp, Building, Users, Award, Target, Briefcase, Star, CheckCircle } from 'lucide-react';

const Placements: React.FC = () => {
  const placementStats = [
    { icon: TrendingUp, label: 'Placement Rate', value: '92%', color: 'text-green-600' },
    { icon: Users, label: 'Students Placed', value: '850+', color: 'text-[#B22222]' },
    { icon: Building, label: 'Recruiting Companies', value: '120+', color: 'text-[#B22222]' },
    { icon: Award, label: 'Highest Package', value: '₹25 LPA', color: 'text-[#B22222]' }
  ];

  const topRecruiters = [
    { name: 'Infosys', logo: '🔷', packages: '₹4-8 LPA', hired: '45+' },
    { name: 'TCS', logo: '🔶', packages: '₹3.5-7 LPA', hired: '65+' },
    { name: 'Wipro', logo: '🔸', packages: '₹4-9 LPA', hired: '35+' },
    { name: 'Cognizant', logo: '🔹', packages: '₹4.5-8 LPA', hired: '40+' },
    { name: 'Accenture', logo: '⭐', packages: '₹5-10 LPA', hired: '30+' },
    { name: 'Microsoft', logo: '🔷', packages: '₹15-25 LPA', hired: '8+' },
    { name: 'Amazon', logo: '🟠', packages: '₹12-20 LPA', hired: '12+' },
    { name: 'Google', logo: '🔴', packages: '₹18-25 LPA', hired: '5+' }
  ];

  const placementProcess = [
    {
      step: '1',
      title: 'Pre-Placement Training',
      description: 'Comprehensive training on aptitude, technical skills, communication, and interview preparation',
      duration: '6 months'
    },
    {
      step: '2',
      title: 'Company Registration',
      description: 'Companies register through our placement portal and schedule recruitment drives',
      duration: 'Ongoing'
    },
    {
      step: '3',
      title: 'Student Application',
      description: 'Students apply to companies based on eligibility criteria and career interests',
      duration: '2 weeks'
    },
    {
      step: '4',
      title: 'Selection Process',
      description: 'Multi-round selection including aptitude test, technical interview, and HR round',
      duration: '1 week'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Microsoft',
      package: '₹22 LPA',
      branch: 'Computer Science',
      year: '2024',
      quote: 'The placement cell at Sri Vasavi provided excellent guidance and training that helped me secure my dream job at Microsoft.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Priya Sharma',
      company: 'Amazon',
      package: '₹18 LPA',
      branch: 'Electronics & Communication',
      year: '2024',
      quote: 'The technical training and mock interviews prepared me well for the competitive selection process at Amazon.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Vikram Reddy',
      company: 'Infosys',
      package: '₹7 LPA',
      branch: 'Mechanical Engineering',
      year: '2024',
      quote: 'Thanks to the placement cell, I was able to transition from mechanical to IT and start my career in software development.',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const services = [
    { icon: Target, title: 'Career Counseling', desc: 'Personalized guidance for career planning and goal setting' },
    { icon: Briefcase, title: 'Resume Building', desc: 'Professional resume writing and portfolio development' },
    { icon: Star, title: 'Skill Development', desc: 'Technical and soft skills training programs' },
    { icon: CheckCircle, title: 'Interview Preparation', desc: 'Mock interviews and group discussion sessions' }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Placements</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Bridging the gap between academic excellence and industry success
          </p>
        </div>
      </section>

      {/* Placement Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Placement Highlights 2024</h2>
            <p className="text-xl text-gray-600">Outstanding placement achievements this year</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {placementStats.map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all transform hover:scale-105">
                <stat.icon className="w-16 h-16 mx-auto mb-4 text-[#B22222]" />
                <h3 className="text-4xl font-bold mb-2 text-[#B22222]">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Our Top Recruiters</h2>
            <p className="text-xl text-gray-600">Leading companies that trust our talent</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRecruiters.map((company, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{company.logo}</div>
                  <h3 className="text-xl font-bold text-[#B22222]">{company.name}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Range:</span>
                    <span className="font-semibold text-[#B22222]">{company.packages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students Hired:</span>
                    <span className="font-semibold text-[#B22222]">{company.hired}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Placement Process</h2>
            <p className="text-xl text-gray-600">Our systematic approach to ensure successful placements</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {placementProcess.map((process, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0097A7] text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#FFF8F0] p-6 rounded-xl">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-[#B22222]">{process.title}</h3>
                        <span className="bg-[#FFC107] text-[#B22222] px-3 py-1 rounded-full text-sm font-medium">
                          {process.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{process.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our successfully placed students</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="text-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#0097A7]"
                  />
                  <h3 className="text-xl font-bold text-[#B22222]">{testimonial.name}</h3>
                  <p className="text-[#B22222] font-medium">{testimonial.company}</p>
                  <div className="flex justify-center items-center gap-4 mt-2 text-sm">
                    <span className="bg-[#FFC107] text-[#B22222] px-2 py-1 rounded-full">
                      {testimonial.package}
                    </span>
                    <span className="text-gray-600">{testimonial.branch}</span>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic text-center leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center mt-4 text-sm text-gray-500">
                  - Batch of {testimonial.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive support for your career journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
                <service.icon className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#B22222] mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department-wise Placements */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Department-wise Placements</h2>
            <p className="text-xl text-gray-600">Placement statistics across all departments</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Computer Science & Engineering</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹6.5 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹25 LPA</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Electronics & Communications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹5.8 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹18 LPA</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Mechanical Engineering</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹5.2 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹15 LPA</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Electrical & Electronics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">90%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹5.5 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹16 LPA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our successful placement program and take the first step towards your dream career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/admissions" 
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all"
            >
              Apply Now
            </a>
            <a 
              href="mailto:placements@srivasaviengg.ac.in" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Contact Placement Cell
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placements;
