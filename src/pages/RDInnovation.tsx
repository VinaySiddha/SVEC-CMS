import React from 'react';
import { Award, BookOpen, Users, TrendingUp, Lightbulb, FileText, Microscope, Rocket } from 'lucide-react';

const RDInnovation: React.FC = () => {
  const researchAreas = [
    {
      icon: Lightbulb,
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Advanced AI algorithms, deep learning, and intelligent systems research',
      projects: 8,
      funding: '₹45 Lakhs'
    },
    {
      icon: Microscope,
      title: 'Renewable Energy Systems',
      description: 'Solar energy, wind power, and sustainable energy solutions',
      projects: 6,
      funding: '₹35 Lakhs'
    },
    {
      icon: Rocket,
      title: 'IoT & Embedded Systems',
      description: 'Internet of Things, smart devices, and embedded system design',
      projects: 10,
      funding: '₹25 Lakhs'
    },
    {
      icon: Award,
      title: 'VLSI & Semiconductor Design',
      description: 'Chip design, digital circuits, and semiconductor technology',
      projects: 5,
      funding: '₹40 Lakhs'
    }
  ];

  const publications = [
    {
      title: 'Machine Learning Approaches for Predictive Maintenance in Industrial Systems',
      authors: 'Dr. Rajesh Kumar, Dr. Priya Sharma',
      journal: 'IEEE Transactions on Industrial Informatics',
      year: '2024',
      impact: '8.2'
    },
    {
      title: 'Optimization of Solar Panel Efficiency using AI-Based Tracking Systems',
      authors: 'Dr. Prakash Rao, Dr. Lakshmi Prasad',
      journal: 'Renewable Energy International',
      year: '2024',
      impact: '6.8'
    },
    {
      title: 'Smart Grid Implementation Using IoT and Big Data Analytics',
      authors: 'Dr. Venkatesh Kumar, Dr. Manjula Devi',
      journal: 'Smart Grid and Renewable Energy',
      year: '2023',
      impact: '5.4'
    },
    {
      title: 'Advanced VLSI Design Techniques for Low Power Applications',
      authors: 'Dr. Suresh Babu, Prof. Ramesh Kumar',
      journal: 'VLSI Design International',
      year: '2023',
      impact: '7.1'
    }
  ];

  const innovations = [
    {
      title: 'Smart Agriculture Monitoring System',
      description: 'IoT-based system for crop monitoring and automated irrigation',
      team: 'CSE & ECE Departments',
      status: 'Patent Filed',
      impact: 'Adopted by 50+ farmers in the region'
    },
    {
      title: 'Energy Efficient Building Management',
      description: 'AI-powered system for optimizing energy consumption in buildings',
      team: 'EEE & Civil Departments',
      status: 'Commercialized',
      impact: '30% energy savings demonstrated'
    },
    {
      title: 'Waste-to-Energy Conversion Unit',
      description: 'Innovative technology for converting organic waste to biogas',
      team: 'Mechanical & Civil Departments',
      status: 'Prototype Ready',
      impact: 'Reduces waste by 80% while generating energy'
    }
  ];

  const fundingAgencies = [
    { name: 'DST (Department of Science & Technology)', projects: 12, amount: '₹85 Lakhs' },
    { name: 'DRDO (Defence Research Organization)', projects: 6, amount: '₹65 Lakhs' },
    { name: 'AICTE (All India Council for Technical Education)', projects: 8, amount: '₹45 Lakhs' },
    { name: 'Industry Partnerships', projects: 15, amount: '₹1.2 Crores' }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Research & Innovation</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Driving technological advancement through cutting-edge research and innovative solutions
          </p>
        </div>
      </section>

      {/* Research Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
              <FileText className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[#B22222] mb-2">150+</h3>
              <p className="text-gray-600">Research Publications</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
              <Award className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[#B22222] mb-2">25+</h3>
              <p className="text-gray-600">Patents Filed</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
              <TrendingUp className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[#B22222] mb-2">₹2.5 Cr</h3>
              <p className="text-gray-600">Research Funding</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
              <Users className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[#B22222] mb-2">40+</h3>
              <p className="text-gray-600">Active Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Key Research Areas</h2>
            <p className="text-xl text-gray-600">Exploring frontiers of technology and innovation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start mb-6">
                  <area.icon className="w-16 h-16 text-[#B22222] mr-6 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222] mb-3">{area.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{area.description}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-[#0097A7] text-white px-3 py-1 rounded-full">
                    {area.projects} Active Projects
                  </span>
                  <span className="bg-[#FFC107] text-[#B22222] px-3 py-1 rounded-full font-semibold">
                    {area.funding} Funding
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Recent Publications</h2>
            <p className="text-xl text-gray-600">Latest research contributions to scientific community</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <div key={index} className="bg-[#FFF8F0] p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <h3 className="text-xl font-bold text-[#B22222] mb-2">{pub.title}</h3>
                      <p className="text-[#B22222] font-medium mb-1">{pub.authors}</p>
                      <p className="text-gray-600">{pub.journal} • {pub.year}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-[#003366] text-white px-4 py-2 rounded-lg font-semibold">
                        Impact Factor: {pub.impact}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Showcase */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Innovation Showcase</h2>
            <p className="text-xl text-gray-600">Breakthrough innovations with real-world impact</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {innovations.map((innovation, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#B22222] mb-3">{innovation.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{innovation.description}</p>
                  <div className="space-y-2 text-sm">
                    <p><strong className="text-[#B22222]">Team:</strong> {innovation.team}</p>
                    <p><strong className="text-[#B22222]">Status:</strong> 
                      <span className="ml-2 bg-[#FFC107] text-[#B22222] px-2 py-1 rounded-full">
                        {innovation.status}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Impact:</strong> {innovation.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Sources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Research Funding</h2>
            <p className="text-xl text-gray-600">Supported by leading government and industry partners</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fundingAgencies.map((agency, index) => (
                <div key={index} className="bg-[#FFF8F0] p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-[#B22222] flex-1">{agency.name}</h3>
                    <span className="bg-[#0097A7] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {agency.projects} Projects
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#B22222]">{agency.amount}</span>
                    <p className="text-sm text-gray-600">Total Funding</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Centers */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Research Centers</h2>
            <p className="text-xl text-gray-600">Specialized facilities for advanced research</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <Lightbulb className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-3">AI Research Center</h3>
              <p className="text-gray-600">Advanced computing, machine learning, and AI applications</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <Microscope className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-3">Clean Energy Lab</h3>
              <p className="text-gray-600">Renewable energy systems and sustainable technologies</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <Rocket className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-3">Innovation Hub</h3>
              <p className="text-gray-600">Entrepreneurship, startups, and technology commercialization</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Research Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Collaborate with us on cutting-edge research projects and innovations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all"
            >
              Collaborate With Us
            </a>
            <a 
              href="mailto:research@srivasaviengg.ac.in" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Email Research Cell
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RDInnovation;
