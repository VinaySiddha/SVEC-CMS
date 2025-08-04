"use client";
import React from 'react';
import { BookOpen, Clock, Wifi, Users, Search, Download, Globe, Award } from 'lucide-react';

const Library: React.FC = () => {
  const facilities = [
    { icon: BookOpen, title: 'Books Collection', value: '50,000+', desc: 'Technical and general books' },
    { icon: Globe, title: 'Digital Resources', value: '10,000+', desc: 'E-books and online journals' },
    { icon: Users, title: 'Seating Capacity', value: '300', desc: 'Reading and study spaces' },
    { icon: Clock, title: 'Operating Hours', value: '12 hrs', desc: 'Daily service hours' }
  ];

  const services = [
    {
      icon: Search,
      title: 'Catalog Search',
      description: 'Advanced search system to find books and resources quickly',
      features: ['Online catalog', 'Author/Title search', 'Subject classification', 'Availability status']
    },
    {
      icon: Download,
      title: 'Digital Library',
      description: 'Access to vast collection of e-books and digital resources',
      features: ['E-book collection', 'Research papers', 'Online journals', 'Video lectures']
    },
    {
      icon: Wifi,
      title: 'Internet Access',
      description: 'High-speed internet connectivity for research and study',
      features: ['Free WiFi', 'Computer terminals', 'Printing services', 'Online databases']
    },
    {
      icon: Users,
      title: 'Study Spaces',
      description: 'Comfortable and quiet environment for individual and group study',
      features: ['Reading halls', 'Discussion rooms', 'Silent zones', 'AC facility']
    }
  ];

  const collections = [
    {
      category: 'Engineering & Technology',
      books: '15,000+',
      description: 'Comprehensive collection covering all engineering disciplines',
      subjects: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical']
    },
    {
      category: 'Reference Books',
      books: '8,000+',
      description: 'Standard reference materials and handbooks',
      subjects: ['Encyclopedias', 'Dictionaries', 'Handbooks', 'Standards', 'Manuals']
    },
    {
      category: 'General Literature',
      books: '12,000+',
      description: 'Fiction, non-fiction, and general knowledge books',
      subjects: ['Novels', 'Biographies', 'History', 'Philosophy', 'Arts']
    },
    {
      category: 'Journals & Magazines',
      books: '200+',
      description: 'Current periodicals and research journals',
      subjects: ['IEEE Journals', 'Research Publications', 'Tech Magazines', 'News Journals']
    }
  ];

  const digitalResources = [
    { name: 'IEEE Digital Library', access: 'Full Access', description: 'Complete IEEE journal and conference papers' },
    { name: 'SpringerLink', access: 'Full Access', description: 'Scientific and technical literature' },
    { name: 'ScienceDirect', access: 'Full Access', description: 'Elsevier scientific database' },
    { name: 'NPTEL Video Lectures', access: 'Free Access', description: 'Educational video content from IITs' },
    { name: 'DELNET Consortium', access: 'Member Access', description: 'Resource sharing network' },
    { name: 'ProQuest Database', access: 'Full Access', description: 'Research and academic resources' }
  ];

  const rules = [
    'Valid ID card is mandatory for library access',
    'Maintain silence in reading areas',
    'Books can be issued for 14 days (renewable)',
    'Maximum 3 books can be issued per student',
    'Late return penalty: ₹2 per day per book',
    'Handle books and materials with care',
    'Mobile phones should be in silent mode',
    'Food and beverages are not allowed inside'
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Central Library</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Gateway to knowledge with extensive collections, digital resources, and modern facilities
          </p>
        </div>
      </section>

      {/* Library Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
                <facility.icon className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-[#B22222] mb-2">{facility.value}</h3>
                <p className="text-lg font-semibold text-gray-700 mb-1">{facility.title}</p>
                <p className="text-gray-600 text-sm">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Services */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Library Services</h2>
            <p className="text-xl text-gray-600">Comprehensive services to support your academic journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start mb-6">
                  <service.icon className="w-12 h-12 text-[#B22222] mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222] mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-[#FFC107] rounded-full mr-2"></span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Library Collections</h2>
            <p className="text-xl text-gray-600">Diverse collection covering all academic disciplines</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <div key={index} className="bg-[#FFF8F0] p-8 rounded-xl hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#B22222]">{collection.category}</h3>
                  <span className="bg-[#0097A7] text-white px-4 py-2 rounded-full font-bold">
                    {collection.books}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{collection.description}</p>
                <div className="flex flex-wrap gap-2">
                  {collection.subjects.map((subject, idx) => (
                    <span key={idx} className="bg-[#FFC107] text-[#B22222] px-3 py-1 rounded-full text-sm font-medium">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Resources */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Digital Resources</h2>
            <p className="text-xl text-gray-600">Access to world-class online databases and journals</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {digitalResources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-[#B22222]">{resource.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      resource.access === 'Full Access' 
                        ? 'bg-green-100 text-green-800' 
                        : resource.access === 'Free Access'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-[#FFC107] text-[#B22222]'
                    }`}>
                      {resource.access}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Library Hours & Rules */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Opening Hours */}
            <div>
              <h2 className="text-3xl font-bold text-[#B22222] mb-8">Opening Hours</h2>
              <div className="bg-[#FFF8F0] p-8 rounded-xl">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-[#B22222]">Monday - Friday</span>
                    <span className="font-bold text-[#B22222]">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-[#B22222]">Saturday</span>
                    <span className="font-bold text-[#B22222]">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-[#B22222]">Sunday</span>
                    <span className="font-bold text-red-600">Closed</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-[#B22222]">Exam Period</span>
                    <span className="font-bold text-[#B22222]">Extended Hours</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#0097A7] bg-opacity-10 rounded-lg">
                  <p className="text-sm text-[#B22222]">
                    <strong>Note:</strong> During examination periods, the library extends its hours 
                    to support students with additional study time.
                  </p>
                </div>
              </div>
            </div>

            {/* Library Rules */}
            <div>
              <h2 className="text-3xl font-bold text-[#B22222] mb-8">Library Rules</h2>
              <div className="bg-[#FFF8F0] p-8 rounded-xl">
                <div className="space-y-4">
                  {rules.map((rule, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="w-5 h-5 text-[#B22222] mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm leading-relaxed">{rule}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-[#FFC107] bg-opacity-20 rounded-lg">
                  <p className="text-sm text-[#B22222]">
                    <strong>Important:</strong> All library users are expected to follow these rules 
                    to maintain a conducive learning environment for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Visit Our Library</h2>
            <p className="text-xl text-gray-600">Located at the heart of our campus</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#B22222] mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      <strong>Librarian:</strong> Dr. K. Srinivasa Rao
                    </p>
                    <p className="text-gray-600">
                      <strong>Phone:</strong> +91-866-2461555 (Ext: 301)
                    </p>
                    <p className="text-gray-600">
                      <strong>Email:</strong> library@srivasaviengg.ac.in
                    </p>
                    <p className="text-gray-600">
                      <strong>Location:</strong> Ground Floor, Academic Block A
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#B22222] mb-4">Quick Access</h3>
                  <div className="space-y-3">
                    <div>
                      <a href="#" className="text-[#B22222] hover:text-[#B22222] transition-colors">
                        📚 Online Catalog Search
                      </a>
                    </div>
                    <div>
                      <a href="#" className="text-[#B22222] hover:text-[#B22222] transition-colors">
                        📖 Digital Library Access
                      </a>
                    </div>
                    <div>
                      <a href="#" className="text-[#B22222] hover:text-[#B22222] transition-colors">
                        📋 Book Renewal Portal
                      </a>
                    </div>
                    <div>
                      <a href="#" className="text-[#B22222] hover:text-[#B22222] transition-colors">
                        📄 Library Membership Form
                      </a>
                    </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Library Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover a world of knowledge and resources to support your academic success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all"
            >
              Visit Library
            </a>
            <a 
              href="mailto:library@srivasaviengg.ac.in" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Contact Librarian
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Library;
