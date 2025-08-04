import React from 'react';
import { BookOpen, Users, Award, Clock, Cpu, Cog, Building2, Zap } from 'lucide-react';
import content from '../content/academics.json';

const Academics: React.FC = () => {

  const iconMap: { [key: string]: React.ElementType } = {
    Cpu,
    Zap,
    Cog,
    Building2,
    BookOpen,
    Users,
    Award,
    Clock,
  };

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Academics</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive engineering programs designed to meet industry demands and foster innovation
          </p>
        </div>
      </section>

      {/* Academic Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
              <div key={index} className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
                <Icon className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#222222] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">
              Undergraduate Programs
            </h2>
            <p className="text-xl text-gray-600">Choose from our comprehensive engineering disciplines</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.programs.map((program, index) => {
              const Icon = iconMap[program.icon];
              return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Icon className="w-16 h-16 text-[#B22222] mb-6" />
                <h3 className="text-xl font-bold text-[#222222] mb-4">{program.title}</h3>
                <div className="flex justify-between mb-4 text-sm">
                  <span className="bg-[#B22222] text-white px-3 py-1 rounded-full">
                    {program.duration}
                  </span>
                  <span className="bg-[#FFF8F0] text-[#B22222] border border-[#B22222] px-3 py-1 rounded-full">
                    Intake: {program.intake}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <button className="w-full bg-[#B22222] text-white py-2 rounded-lg hover:bg-[#8B0000] transition-colors">
                  Learn More
                </button>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#B22222] mb-6">Academic Calendar 2024-25</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-[#B22222] pl-6 py-4">
                  <h3 className="font-semibold text-[#222222] mb-1">Odd Semester</h3>
                  <p className="text-gray-600">July 2024 - December 2024</p>
                  <p className="text-sm text-gray-500">Classes, Mid-terms, End-semester exams</p>
                </div>
                <div className="border-l-4 border-[#FFC107] pl-6 py-4">
                  <h3 className="font-semibold text-[#B22222] mb-1">Even Semester</h3>
                  <p className="text-gray-600">January 2025 - June 2025</p>
                  <p className="text-sm text-gray-500">Classes, Mid-terms, End-semester exams</p>
                </div>
                <div className="border-l-4 border-[#003366] pl-6 py-4">
                  <h3 className="font-semibold text-[#B22222] mb-1">Summer Vacation</h3>
                  <p className="text-gray-600">May 2025 - June 2025</p>
                  <p className="text-sm text-gray-500">Industrial training, Project work</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#B22222] mb-6">Assessment Pattern</h2>
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-[#B22222]">Internal Assessment</span>
                    <span className="font-bold text-[#B22222]">30%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-[#B22222]">End Semester Exam</span>
                    <span className="font-bold text-[#B22222]">70%</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-4">
                    <p><strong>Internal Assessment includes:</strong></p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Two Mid-term examinations</li>
                      <li>Assignments and seminars</li>
                      <li>Laboratory work and projects</li>
                      <li>Attendance and participation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Requirements */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">
              Admission Requirements
            </h2>
            <p className="text-xl text-gray-600">Join our community of future engineers</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#B22222] mb-4">Eligibility</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0097A7] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Completed 10+2 with Physics, Chemistry, and Mathematics
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0097A7] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Minimum 45% aggregate marks (40% for reserved categories)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0097A7] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Valid JEE Main or AP EAMCET score
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#0097A7] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Age limit: 17-25 years as on December 31st
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#B22222] mb-4">Application Process</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#FFC107] text-[#B22222] rounded-full text-sm font-bold flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    Fill online application form with required details
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#FFC107] text-[#B22222] rounded-full text-sm font-bold flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    Upload documents and pay application fee
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#FFC107] text-[#B22222] rounded-full text-sm font-bold flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    Participate in counseling process
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#FFC107] text-[#B22222] rounded-full text-sm font-bold flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    Complete admission formalities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Engineering Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us and be part of the next generation of innovative engineers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/admissions" 
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all"
            >
              Apply Now
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Get Information
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
