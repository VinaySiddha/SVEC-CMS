"use client";
import React from 'react';
import Link from 'next/link';
import { Cpu, Zap, Cog, Building2, ArrowRight, Users, BookOpen, Award } from 'lucide-react';

const Departments: React.FC = () => {
  const departments = [
    {
      id: 'cse',
      name: 'Computer Science & Engineering',
      icon: Cpu,
      description: 'Leading the digital revolution with cutting-edge computing technologies, AI, and software development.',
      faculty: '25+',
      students: '480',
      labs: '8',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Artificial Intelligence', 'Data Science', 'Cyber Security', 'Software Engineering']
    },
    {
      id: 'ece',
      name: 'Electronics & Communications',
      icon: Zap,
      description: 'Pioneering innovations in electronics, communications, and embedded systems technology.',
      faculty: '18+',
      students: '240',
      labs: '6',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['VLSI Design', 'Embedded Systems', 'Signal Processing', 'Communications']
    },
    {
      id: 'mech',
      name: 'Mechanical Engineering',
      icon: Cog,
      description: 'Engineering the future with advanced manufacturing, robotics, and thermal systems.',
      faculty: '20+',
      students: '240',
      labs: '7',
      image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Manufacturing', 'Thermal Engineering', 'Robotics', 'Automobile Engineering']
    },
    {
      id: 'civil',
      name: 'Civil Engineering',
      icon: Building2,
      description: 'Building tomorrow\'s infrastructure with sustainable and innovative construction technologies.',
      faculty: '15+',
      students: '240',
      labs: '5',
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Structural Engineering', 'Environmental Engineering', 'Transportation', 'Construction Management']
    },
    {
      id: 'eee',
      name: 'Electrical & Electronics',
      icon: Zap,
      description: 'Powering the future with electrical systems, renewable energy, and smart grid technologies.',
      faculty: '16+',
      students: '240',
      labs: '6',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Power Systems', 'Control Systems', 'Renewable Energy', 'Power Electronics']
    }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Departments</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our diverse engineering departments, each committed to excellence in education and research
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={dept.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src={dept.image} 
                    alt={dept.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <dept.icon className="w-12 h-12 text-[#B22222]" />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-4">{dept.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{dept.description}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-[#FFF8F0] rounded-lg">
                      <Users className="w-6 h-6 text-[#B22222] mx-auto mb-1" />
                      <div className="text-lg font-bold text-[#B22222]">{dept.faculty}</div>
                      <div className="text-xs text-gray-600">Faculty</div>
                    </div>
                    <div className="text-center p-3 bg-[#FFF8F0] rounded-lg">
                      <BookOpen className="w-6 h-6 text-[#B22222] mx-auto mb-1" />
                      <div className="text-lg font-bold text-[#B22222]">{dept.students}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="text-center p-3 bg-[#FFF8F0] rounded-lg">
                      <Award className="w-6 h-6 text-[#B22222] mx-auto mb-1" />
                      <div className="text-lg font-bold text-[#B22222]">{dept.labs}</div>
                      <div className="text-xs text-gray-600">Labs</div>
                    </div>
                  </div>
                  
                  {/* Specializations */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#B22222] mb-3">Key Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dept.specializations.map((spec, idx) => (
                        <span key={idx} className="bg-[#0097A7] text-white px-3 py-1 rounded-full text-sm">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    href={`/departments/${dept.id}`}
                    className="inline-flex items-center bg-[#003366] text-white px-6 py-3 rounded-lg hover:bg-[#004080] transition-all transform hover:scale-105"
                  >
                    Learn More <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Features */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">
              What Makes Our Departments Special
            </h2>
            <p className="text-xl text-gray-600">Excellence in every aspect of engineering education</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <Users className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-2">Expert Faculty</h3>
              <p className="text-gray-600">PhD qualified professors with industry experience</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <BookOpen className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-2">Modern Labs</h3>
              <p className="text-gray-600">State-of-the-art laboratories with latest equipment</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <Award className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-2">Research Focus</h3>
              <p className="text-gray-600">Active research projects and publications</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
              <Building2 className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#B22222] mb-2">Industry Connect</h3>
              <p className="text-gray-600">Strong partnerships with leading companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Engineering Path</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover which department aligns with your passion and career goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admissions" 
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all"
            >
              Apply Now
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Get Guidance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Departments;
