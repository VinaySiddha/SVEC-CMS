import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Bus, Train, Plane, ChevronRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SmoothLink from '../components/SmoothLink';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        '+91-866-2461555 (Main Office)',
        '+91-866-2461556 (Admissions)',
        '+91-866-2461557 (Academics)',
        '+91-9876543210 (Emergency)'
      ]
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [
        'info@srivasaviengg.ac.in',
        'admissions@srivasaviengg.ac.in',
        'principal@srivasaviengg.ac.in',
        'placements@srivasaviengg.ac.in'
      ]
    },
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'Sri Vasavi Engineering College',
        'Pedatadepalli, Tadepalligudem',
        'West Godavari District',
        'Andhra Pradesh - 534101'
      ]
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 9:00 AM - 5:00 PM',
        'Saturday: 9:00 AM - 1:00 PM',
        'Sunday: Closed',
        'Holidays: As per academic calendar'
      ]
    }
  ];

  const departments = [
    { name: 'Principal Office', ext: '101', email: 'principal@srivasaviengg.ac.in' },
    { name: 'Admissions Office', ext: '102', email: 'admissions@srivasaviengg.ac.in' },
    { name: 'Academic Office', ext: '103', email: 'academics@srivasaviengg.ac.in' },
    { name: 'Examination Cell', ext: '104', email: 'exams@srivasaviengg.ac.in' },
    { name: 'Placement Cell', ext: '105', email: 'placements@srivasaviengg.ac.in' },
    { name: 'Library', ext: '301', email: 'library@srivasaviengg.ac.in' },
    { name: 'Accounts Office', ext: '106', email: 'accounts@srivasaviengg.ac.in' },
    { name: 'Hostel Office', ext: '401', email: 'hostel@srivasaviengg.ac.in' }
  ];

  const transportOptions = [
    {
      icon: Car,
      title: 'By Car',
      description: 'College is easily accessible by road from major cities',
      details: [
        'From Vijayawada: 75 km (1.5 hours)',
        'From Rajahmundry: 45 km (1 hour)',
        'From Bhimavaram: 35 km (45 minutes)',
        'Ample parking available on campus'
      ]
    },
    {
      icon: Bus,
      title: 'By Bus',
      description: 'Regular bus services from nearby cities and towns',
      details: [
        'APSRTC buses from Vijayawada, Rajahmundry',
        'Private buses from Hyderabad, Chennai',
        'Local buses from Tadepalligudem bus station',
        'College bus service available'
      ]
    },
    {
      icon: Train,
      title: 'By Train',
      description: 'Nearest railway station is Tadepalligudem',
      details: [
        'Tadepalligudem Railway Station: 8 km',
        'Regular trains from Vijayawada, Chennai',
        'Auto-rickshaws and taxis available',
        'College transport can be arranged'
      ]
    },
    {
      icon: Plane,
      title: 'By Air',
      description: 'Nearest airport is Rajahmundry',
      details: [
        'Rajahmundry Airport: 50 km',
        'Vijayawada Airport: 80 km',
        'Taxi services available from airports',
        'College can arrange airport pickup'
      ]
    }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#B22222] to-[#0097A7] text-white py-20 relative overflow-hidden isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with us for admissions, information, or any queries
          </p>
        </div>

        {/* Subtle background shapes */}
        <div className="absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full opacity-70 shadow-sm z-0"></div>
        <div className="absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full opacity-70 shadow-sm z-0"></div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Contact Information</h2>
            <p className="text-xl text-gray-600">Multiple ways to reach us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-[#FFF8F0] p-8 rounded-xl hover:shadow-lg transition-all">
                <info.icon className="w-12 h-12 text-[#B22222] mb-6" />
                <h3 className="text-xl font-bold text-[#222222] mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-[#B22222] mb-8">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent">
                      <option>Select a subject</option>
                      <option>Admission Inquiry</option>
                      <option>Academic Information</option>
                      <option>Placement Inquiry</option>
                      <option>General Information</option>
                      <option>Technical Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent"
                      placeholder="Enter your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0097A7] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#007A86] transition-all transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Department Contacts */}
              <div>
                <h2 className="text-3xl font-bold text-[#B22222] mb-8">Department Contacts</h2>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                      <h3 className="text-lg font-bold text-[#B22222] mb-2">{dept.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
                        <span className="mb-1 sm:mb-0">📞 +91-866-2461555 (Ext: {dept.ext})</span>
                        <span>📧 {dept.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Our Location</h2>
            <p className="text-xl text-gray-600">Find us on the map</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#FFF8F0] p-8 rounded-xl">
              <div className="aspect-w-16 aspect-h-9 mb-8">
                <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                    <p className="text-lg font-semibold text-[#B22222]">Interactive Map</p>
                    <p className="text-gray-600">Click to view location on Google Maps</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#B22222] mb-4">Sri Vasavi Engineering College</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Pedatadepalli, Tadepalligudem, West Godavari District, Andhra Pradesh - 534101
                </p>
                <button className="bg-[#0097A7] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#007A86] transition-all">
                  View on Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">How to Reach</h2>
            <p className="text-xl text-gray-600">Multiple transportation options available</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {transportOptions.map((transport, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-6">
                  <transport.icon className="w-12 h-12 text-[#B22222] mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222]">{transport.title}</h3>
                    <p className="text-gray-600">{transport.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {transport.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-[#FFC107] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <p className="text-gray-700 text-sm">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common queries</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <h3 className="text-lg font-bold text-[#B22222] mb-2">What are the college timings?</h3>
                <p className="text-gray-600">Regular classes are from 9:00 AM to 4:00 PM, Monday to Friday. Saturday classes are from 9:00 AM to 1:00 PM.</p>
              </div>
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <h3 className="text-lg font-bold text-[#B22222] mb-2">How can I apply for admission?</h3>
                <p className="text-gray-600">You can apply online through our website or visit the admissions office. Applications are processed based on entrance exam scores and merit.</p>
              </div>
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <h3 className="text-lg font-bol text-[#B22222] mb-2">Is hostel accommodation available?</h3>
                <p className="text-gray-600">Yes, we provide separate hostel facilities for boys and girls with all necessary amenities and 24/7 security.</p>
              </div>
              <div className="bg-[#FFF8F0] p-6 rounded-xl">
                <h3 className="text-lg font-bold text-[#B22222] mb-2">What is the placement record?</h3>
                <p className="text-gray-600">We maintain an excellent placement record with 92% of students getting placed in reputed companies with competitive packages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white relative overflow-hidden isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team is here to help you with any queries or concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918662461555"
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Call Us Now</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </a>
            <a
              href="mailto:info@srivasaviengg.ac.in"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm hover:border-secondary transition-all transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Email Us</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </a>
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-secondary/20 -translate-y-1/4 translate-x-1/4 opacity-70 shadow-sm z-0"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-secondary/15 translate-y-1/4 -translate-x-1/4 opacity-70 shadow-sm z-0"></div>
      </section>
    </div>
  );
};

export default Contact;
