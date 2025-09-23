import React from 'react';
import Link from 'next/link';
import { 
  Cpu, Zap, Cog, Building2, ArrowRight, Users, BookOpen, Award, GraduationCap, 
  Microchip, BarChart3, BrainCircuit, Database, Beaker, Library, School, BookText
} from 'lucide-react';

const Departments: React.FC = () => {
  const departments = [
    {
      id: 'aiml',
      name: 'Artificial Intelligence & Machine Learning',
      icon: BrainCircuit,
      description: 'Exploring cutting-edge AI and ML technologies for innovative applications and solutions.',
      faculty: '30+',
      students: '240',
      labs: '6',
      image: '/images/departments/aiml/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing']
    },
    {
      id: 'bsh',
      name: 'Basic Sciences & Humanities',
      icon: Beaker,
      description: 'Building strong foundations in mathematics, physics, chemistry, and humanities for engineering education.',
      faculty: '22+',
      students: '480',
      labs: '7',
      image: '/images/departments/bsh/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Mathematics', 'Physics', 'Chemistry', 'English & Humanities']
    },
    {
      id: 'civil',
      name: 'Civil Engineering',
      icon: Building2,
      description: 'Building tomorrow\'s infrastructure with sustainable and innovative construction technologies.',
      faculty: '15+',
      students: '240',
      labs: '5',
      image: '/images/departments/civil/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Structural Engineering', 'Environmental Engineering', 'Transportation', 'Construction Management']
    },
    {
      id: 'cse-ai',
      name: 'Computer Science Engineering with AI',
      icon: BrainCircuit,
      description: 'Integrating artificial intelligence principles with computer science to create next-generation solutions.',
      faculty: '18+',
      students: '180',
      labs: '6',
      image: '/images/departments/cseai/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Machine Learning', 'AI Applications', 'Neural Networks', 'Intelligent Systems']
    },
    {
      id: 'cse-ds',
      name: 'Computer Science Engineering with Data Science',
      icon: Database,
      description: 'Specializing in data analytics, machine learning, and big data processing techniques.',
      faculty: '15+',
      students: '180',
      labs: '5',
      image: '/images/departments/cseds/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Big Data Analytics', 'Data Visualization', 'Machine Learning', 'Statistical Computing']
    },
    {
      id: 'cse',
      name: 'Computer Science & Engineering',
      icon: Cpu,
      description: 'Leading the digital revolution with cutting-edge computing technologies, AI, and software development.',
      faculty: '25+',
      students: '480',
      labs: '8',
      image: '/images/departments/cse/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Artificial Intelligence', 'Data Science', 'Cyber Security', 'Software Engineering']
    },
    {
      id: 'cst',
      name: 'Computer Science & Technology',
      icon: BarChart3,
      description: 'Comprehensive computer science education with emphasis on modern software technologies.',
      faculty: '18+',
      students: '200',
      labs: '6',
      image: '/images/departments/cst/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Software Development', 'Web Technologies', 'Database Systems', 'Cloud Computing']
    },
    {
      id: 'ece',
      name: 'Electronics & Communication Engineering',
      icon: Zap,
      description: 'Pioneering innovations in electronics, communications, and embedded systems technology.',
      faculty: '18+',
      students: '240',
      labs: '6',
      image: '/images/departments/ece/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['VLSI Design', 'Embedded Systems', 'Signal Processing', 'Communications']
    },
    {
      id: 'ect',
      name: 'Electronics & Computer Engineering',
      icon: Microchip,
      description: 'Advanced electronics and computer systems with focus on emerging technologies.',
      faculty: '14+',
      students: '180',
      labs: '5',
      image: '/images/departments/ect/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Digital Systems', 'Communication Networks', 'Embedded Systems', 'IoT']
    },
    {
      id: 'eee',
      name: 'Electrical & Electronics Engineering',
      icon: Zap,
      description: 'Powering the future with electrical systems, renewable energy, and smart grid technologies.',
      faculty: '16+',
      students: '240',
      labs: '6',
      image: '/images/departments/eee/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Power Systems', 'Control Systems', 'Renewable Energy', 'Power Electronics']
    },
    {
      id: 'mba',
      name: 'Master of Business Administration',
      icon: GraduationCap,
      description: 'Developing future business leaders with comprehensive management education and industry exposure.',
      faculty: '12+',
      students: '120',
      labs: '3',
      image: '/images/departments/mba/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Finance', 'Marketing', 'Human Resources', 'Operations']
    },
    {
      id: 'mechanical',
      name: 'Mechanical Engineering',
      icon: Cog,
      description: 'Engineering the future with advanced manufacturing, robotics, and thermal systems.',
      faculty: '20+',
      students: '240',
      labs: '7',
      image: '/images/departments/mechanical/banner.jpg',
      fallbackImage: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600',
      specializations: ['Manufacturing', 'Thermal Engineering', 'Robotics', 'Automobile Engineering']
    }
  ];

  return (
    <div className="pt-36 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section with Background Pattern */}
      <section className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white/10 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
            <span className="text-white font-medium">Academic Excellence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Academic Departments</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Explore our diverse engineering and management departments, each committed to 
            excellence in education, research, and industry collaboration.
          </p>
          <div className="w-24 h-1 bg-white/50 mx-auto"></div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {departments.map((dept, index) => (
              <Link href={`/departments/${dept.id}`} key={dept.id}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden h-full flex flex-col group">
                  <div className="relative h-48">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        // If image fails, use fallback image
                        e.currentTarget.src = dept.fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-full">
                      <dept.icon className="w-8 h-8 text-[#B22222]" />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end">
                      <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    {/* Quick Stats */}
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-[#B22222] mr-1" />
                        <span className="text-gray-600">{dept.faculty} Faculty</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-[#B22222] mr-1" />
                        <span className="text-gray-600">{dept.labs} Labs</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 flex-grow">{dept.description}</p>
                    
                    {/* Specializations - Compact Version */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {dept.specializations.slice(0, 2).map((spec, idx) => (
                          <span key={idx} className="bg-gray-100 text-[#B22222] px-2 py-1 rounded-md text-xs font-medium">
                            {spec}
                          </span>
                        ))}
                        {dept.specializations.length > 2 && (
                          <span className="bg-gray-100 text-[#B22222] px-2 py-1 rounded-md text-xs font-medium">
                            +{dept.specializations.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center text-[#B22222] font-medium group-hover:font-bold transition-all mt-auto">
                      <span>View Department</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
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
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#B22222] transition-all"
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
