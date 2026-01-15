import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, Bus, Train, Plane, ChevronRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SmoothLink from '../components/SmoothLink';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Addresses',
      details: [

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
        'Monday -Saturday: 9:30 AM - 5:00 PM',
        
        'Sunday: Closed',
        'Holidays: As per academic calendar'
      ]
    }
  ];

  const departments = [
    { name: 'Principal Office', ext: '304', email: 'principal@srivasaviengg.ac.in' },
    { name: 'Academic Office', ext: '309', email: 'academics@srivasaviengg.ac.in' },
    { name: 'Examination Cell', ext: '323', email: 'exams@srivasaviengg.ac.in' },
    { name: 'Placement Cell', ext: '319', email: 'placements@srivasaviengg.ac.in' },
    { name: 'Library', ext: '301', email: 'library@srivasaviengg.ac.in' }
    
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
      <section className="bg-primary text-white py-16 relative overflow-hidden isolate">
       <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-[#FFF8F0] p-8 rounded-xl hover:shadow-lg transition-all text-center border border-[#B22222]/10 hover:-translate-y-1 duration-300 h-full flex flex-col items-center group">
                <div className="p-4 bg-white rounded-full shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-10 h-10 text-[#B22222]" />
                </div>
                <h3 className="text-xl font-bold text-[#222222] mb-4">{info.title}</h3>
                <div className="space-y-2 flex-grow">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm font-medium">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Department Contacts</h2>
              <p className="text-xl text-gray-600">Direct lines to key departments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-[#B22222] hover:-translate-y-1 duration-300 group">
                  <h3 className="text-xl font-bold text-[#B22222] mb-4 group-hover:text-[#0097A7] transition-colors">{dept.name}</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#FFF8F0] rounded-full text-[#B22222]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="font-medium">+08818-284322 <span className="text-gray-400">|</span> Ext: {dept.ext}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#FFF8F0] rounded-full text-[#B22222]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-sm break-all">{dept.email}</span>
                    </div>
                  </div>
                </div>
              ))}
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
              <div className="mb-8">
                <iframe
                  title="Sri Vasavi Engineering College Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.5867034820935!2d81.52134507489354!3d16.821945201853764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37b0e9c1234567%3A0x1234567890abcdef!2sSri%20Vasavi%20Engineering%20College%2C%20Pedatadepalli%2C%20Tadepalligudem%2C%20Andhra%20Pradesh%20534101!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: '0.75rem' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full rounded-lg shadow-md"
                ></iframe>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#B22222] mb-4">Sri Vasavi Engineering College</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Pedatadepalli, Tadepalligudem, West Godavari District, Andhra Pradesh - 534101
                </p>
                <a
                  href="https://maps.app.goo.gl/rKKEKEHXzj5NjSTx8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0097A7] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#007A86] transition-all inline-block"
                >
                  View on Google Maps
                </a>
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

      
    </div>
  );
};

export default Contact;
