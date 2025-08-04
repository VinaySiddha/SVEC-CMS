import React from 'react';
import { Building, Wifi, Car, Utensils, Heart, BookOpen, Cpu, FlaskConical } from 'lucide-react';

const Infrastructure: React.FC = () => {
  const facilities = [
    {
      icon: Building,
      title: 'Academic Buildings',
      description: 'Modern classrooms with smart boards, AC facilities, and state-of-the-art infrastructure',
      features: ['40+ Smart Classrooms', 'Central AC', 'Audio-Visual Equipment', 'High-Speed Internet'],
      image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: FlaskConical,
      title: 'Laboratory Complex',
      description: 'Advanced laboratories equipped with latest instruments and technology',
      features: ['30+ Specialized Labs', 'Modern Equipment', 'Research Facilities', 'Safety Systems'],
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: BookOpen,
      title: 'Central Library',
      description: 'Comprehensive collection of books, journals, and digital resources',
      features: ['50,000+ Books', 'Digital Library', 'Research Journals', 'Study Spaces'],
      image: 'https://images.pexels.com/photos/481988/pexels-photo-481988.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Cpu,
      title: 'Computer Centers',
      description: 'High-performance computing facilities with latest software and hardware',
      features: ['500+ Computers', 'Latest Software', '24/7 Access', 'High-Speed Network'],
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Utensils,
      title: 'Cafeteria & Dining',
      description: 'Hygienic dining facilities serving nutritious and delicious meals',
      features: ['Multiple Dining Halls', 'Vegetarian & Non-Veg', 'Hygienic Kitchen', 'Affordable Rates'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Heart,
      title: 'Medical Center',
      description: 'On-campus healthcare facility with qualified medical professionals',
      features: ['24/7 Medical Care', 'Qualified Doctors', 'Emergency Services', 'Health Checkups'],
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const amenities = [
    { icon: Wifi, title: 'Campus-wide WiFi', desc: 'High-speed internet connectivity across the entire campus' },
    { icon: Car, title: 'Transportation', desc: 'Bus services connecting to major cities and towns' },
    { icon: Building, title: 'Hostels', desc: 'Separate accommodation facilities for boys and girls' },
    { icon: Heart, title: 'Sports Complex', desc: 'Indoor and outdoor sports facilities for various games' }
  ];

  const stats = [
    { label: 'Total Campus Area', value: '25 Acres' },
    { label: 'Academic Buildings', value: '8' },
    { label: 'Laboratories', value: '30+' },
    { label: 'Library Capacity', value: '50,000 Books' }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Infrastructure</h1>
          <p className="text-xl max-w-3xl mx-auto">
            World-class facilities designed to provide an exceptional learning environment
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
                <h3 className="text-3xl font-bold text-[#B22222] mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Campus Facilities</h2>
            <p className="text-xl text-gray-600">Comprehensive infrastructure supporting academic excellence</p>
          </div>
          
          <div className="space-y-16">
            {facilities.map((facility, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <facility.icon className="w-12 h-12 text-[#B22222] mr-4" />
                    <h3 className="text-3xl font-bold text-[#B22222]">{facility.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{facility.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {facility.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-[#FFC107] rounded-full mr-3"></span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <img 
                    src={facility.image} 
                    alt={facility.title}
                    className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Additional Amenities</h2>
            <p className="text-xl text-gray-600">Supporting services for student comfort and convenience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
                <amenity.icon className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#B22222] mb-3">{amenity.title}</h3>
                <p className="text-gray-600">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Tour */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Virtual Campus Tour</h2>
            <p className="text-xl text-gray-600">Explore our beautiful campus from anywhere</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative h-96">
                <img 
                  src="https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Campus Overview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Building className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Experience Our Campus</h3>
                    <p className="mb-6">Take a virtual tour of our state-of-the-art facilities</p>
                    <button className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all">
                      Start Virtual Tour
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-[#B22222] mb-2">360° Views</h4>
                    <p className="text-sm text-gray-600">Interactive panoramic views of all facilities</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-[#B22222] mb-2">Detailed Information</h4>
                    <p className="text-sm text-gray-600">Comprehensive details about each facility</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-[#B22222] mb-2">Easy Navigation</h4>
                    <p className="text-sm text-gray-600">User-friendly interface for seamless exploration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Safety & Security</h2>
            <p className="text-xl text-gray-600">Comprehensive safety measures for a secure campus environment</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#FFF8F0] p-6 rounded-xl text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-[#0097A7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-bold text-[#B22222] mb-2">24/7 Security</h3>
                <p className="text-gray-600 text-sm">Round-the-clock security personnel and surveillance systems</p>
              </div>
              <div className="bg-[#FFF8F0] p-6 rounded-xl text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-[#0097A7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📹</span>
                </div>
                <h3 className="text-lg font-bold text-[#B22222] mb-2">CCTV Monitoring</h3>
                <p className="text-gray-600 text-sm">Comprehensive CCTV coverage across the entire campus</p>
              </div>
              <div className="bg-[#FFF8F0] p-6 rounded-xl text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-[#0097A7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚨</span>
                </div>
                <h3 className="text-lg font-bold text-[#B22222] mb-2">Emergency Response</h3>
                <p className="text-gray-600 text-sm">Quick response emergency systems and trained personnel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Campus</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience our world-class infrastructure firsthand. Schedule a campus visit today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all"
            >
              Schedule Visit
            </a>
            <a 
              href="tel:+918662461555" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Infrastructure;
