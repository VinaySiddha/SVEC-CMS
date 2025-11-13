"use client";
import React from 'react';
import { Mail, Phone, MapPin, Users, BookOpen, Calendar, Target } from 'lucide-react';
import '../../../components/Carousel.css';

const Principal: React.FC = () => {
  const principalInfo = {
    name: "Dr. Guduru VNSR Ratnakara Rao",
    designation: "Principal",
    qualifications: "Ph.D in Mechanical Engineering, M.E, B.E",
    experience: "22+ Years",
    email: "principal@srivasaviengg.ac.in",
    phone: "+91-866-2461556",
    office: "Principal's Office, Administrative Block",
    image: "/principal.jpg"
  };

  const initiatives = [
    {
      icon: Target,
      title: "Academic Excellence",
      description: "Implementing innovative teaching methodologies and curriculum updates",
      achievements: ["90%+ Pass Rate", "Industry-Aligned Curriculum", "Modern Labs"]
    },
    {
      icon: Users,
      title: "Student Development",
      description: "Fostering holistic development through various co-curricular activities",
      achievements: ["Career Guidance", "Skill Development", "Leadership Programs"]
    },
    {
      icon: BookOpen,
      title: "Research Promotion",
      description: "Encouraging faculty and student research across all departments",
      achievements: ["Research Publications", "Patent Filing", "Innovation Labs"]
    },
    {
      icon: Calendar,
      title: "Industry Connect",
      description: "Building strong relationships with industry partners",
      achievements: ["Placement Support", "Industry Visits", "Guest Lectures"]
    }
  ];

  const officeHours = [
    { day: "Monday - Saturday", time: "9:00 AM - 5:00 PM" },
    { day: "Sunday", time: "Closed" }
  ];

  const recentActivities = [
    {
      activityDate: "2025-01-20",
      title: "Academic Council Meeting",
      description: "Reviewed curriculum updates and student performance"
    },
    {
      activityDate: "2025-01-18",
      title: "Industry Partnership Agreement",
      description: "Signed MoU with leading tech companies for placements"
    },
    {
      activityDate: "2025-01-15",
      title: "Faculty Development Program",
      description: "Organized workshop on modern teaching methodologies"
    },
    {
      activityDate: "2025-01-12",
      title: "Research Symposium",
      description: "Presided over annual research presentation by faculty"
    }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-animate">
            Principal's Desk
          </h1>
        </div>
      </section>

      {/* Principal Profile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Principal Image and Contact */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-8">
                <img
                  src={principalInfo.image}
                  alt={principalInfo.name}
                  className="w-96 h-64 object-cover rounded-xl shadow-lg mx-auto stat-card"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#B22222] text-white p-4 rounded-xl shadow-lg">
                  <p className="font-bold text-lg">{principalInfo.experience}</p>
                  <p className="text-sm">Experience</p>
                </div>
              </div>

              {/* Principal Information */}
              <div className="text-animate mb-4">
                <h2 className="text-3xl font-bold text-[#B22222] mb-2">{principalInfo.name}</h2>
                <p className="text-xl text-gray-600 mb-4">{principalInfo.designation}</p>
                <p className="text-lg text-gray-700 mb-6">{principalInfo.qualifications}</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 text-animate mb-4" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#B22222]" />
                  <a href={`mailto:${principalInfo.email}`} className="text-gray-700 hover:text-[#B22222]">
                    {principalInfo.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#B22222]" />
                  <span className="text-gray-700">{principalInfo.office}</span>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-[#FFF8F0] p-6 rounded-xl border text-animate" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-lg font-semibold text-[#B22222] mb-4">Office Hours</h3>
                <div className="space-y-2">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="font-medium text-[#B22222]">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Principal Information */}
            <div className="space-y-6">

              {/* Principal's Message */}
              <div className="bg-[#FFF8F0] p-6 rounded-xl border-l-4 border-[#B22222] text-animate" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-lg font-semibold text-[#B22222] mb-3">Message from Principal</h3>
                <p className="text-gray-700 italic mb-4 text-justify">
                  Dr. Guduru VNSR Ratnakara Rao holds a Master’s degree in Mechanical Engineering from Gulbarga University and a Doctorate from JNTU Hyderabad. He began his teaching career in Chennai and went on to serve BVC Engineering College, Odalarevu, Andhra Pradesh, for nearly a decade, rising through the ranks from Assistant Professor to Professor.<br /><br />
                  Between 2011 and 2013, he held the position of Principal at both the Praveenya Institute of Marine Engineering and Maritime Studies, Visakhapatnam, and the Bhimavaram Institute of Engineering Technology, Bhimavaram.<br /><br />
                  In 2013, Dr. Ratnakara Rao joined Sri Vasavi Engineering College, Tadepalligudem, as Professor and Head of the Department of Mechanical Engineering. Since 2015, he has served as Dean of Academic Affairs, playing a key role in shaping the college’s academic and administrative landscape. A dedicated academician and researcher, he is a member of prestigious professional bodies like ISTE and IE, and has contributed scholarly work to internationally reputed journals.<br /><br />
                  As the NBA Accreditation Coordinator, Dr. Ratnakara Rao was instrumental in achieving accreditation for the institution. He pioneered the adoption of Outcome-Based Education (OBE) at the college and has been a driving force in its successful implementation.<br /><br />
                  In June 2018, he was appointed Principal of Sri Vasavi Engineering College, and under his visionary leadership, the college continues its pursuit of academic distinction and holistic development.<br /><br />
                  For professional correspondence, Dr. Ratnakara Rao can be contacted at principal@srivasaviengg.ac.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#B22222] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Schedule a Meeting</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Connect with the Principal for academic discussions, student concerns, or institutional matters
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${principalInfo.email}?subject=Meeting Request`}
              className="btn-dynamic bg-white text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#f9e8e8] transition-all"
            >
              Request Meeting
            </a>
            <a
              href={`tel:${principalInfo.phone}`}
              className="btn-dynamic border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all"
            >
              Call Office
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Principal;
