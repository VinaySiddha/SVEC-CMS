import React from 'react';
import { Mail, Phone, MapPin, Award, Users, BookOpen } from 'lucide-react';
import '../../components/Carousel.css';

const DirectorTechnical: React.FC = () => {
  const directorInfo = {
    name: "Sri. Chekka. Apparao",
    designation: "Technical Director",
    qualifications: "B.Tech, M.S. (Computer Science)",
    experience: "25+ Years",
    email: "chekkaapparao@srivasaviengg.ac.in",
    phone: "+91-866-2461555",
    office: "Director's Office, Administrative Block",
    image: "/tech_director.jpg"
  };

  const responsibilities = [
    "Strong implementer with the ability to oversee the execution of strategic plans and initiatives.",
    "Excellent networking capabilities, capable of fostering significant partnerships and collaborations.",
    "Passionate about advancing computing education and research, with a focus on promoting an inclusive and dynamic academic community.",
    "Strategic thinker with a robust approach to problem-solving and innovation.",
    "Experienced leader with a strong foundation in academia and/or industry.",
    "Effective communicator with a proven ability to enhance the college profile and outreach.",

  ];

  const achievements = [
    {
      icon: Award,
      title: "Industry Experience",
      description: "8+ years of IT industry experience in the United States with expertise in project management and system architecture"
    },
    {
      icon: Users,
      title: "Entrepreneurial Leadership",
      description: "9 years of successful entrepreneurship owning multiple retail franchise businesses in the United States"
    },
    {
      icon: BookOpen,
      title: "Institutional Development",
      description: "Leading strategic initiatives and policy changes since 2016 for college growth and modernization"
    }
  ];

  return (
    <div className="pt-44 bg-[#FFF8F0] min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-animate">
            Director - Technical
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-animate" style={{ animationDelay: '0.3s' }}>
            Leading Sri Vasavi Engineering College towards excellence in technical education and innovation
          </p>
        </div>
      </section>

      {/* Director Profile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Director Image */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block w-full max-w-lg mx-auto lg:mx-0">
                <img
                  src={directorInfo.image}
                  alt={directorInfo.name}
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 object-cover rounded-xl shadow-lg stat-card"
                />
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-[#B22222] text-white p-3 sm:p-4 rounded-xl shadow-lg">
                  <p className="font-bold text-base sm:text-lg">{directorInfo.experience}</p>
                  <p className="text-xs sm:text-sm">Experience</p>
                </div>
              </div>
            </div>

            {/* Director Information */}
            <div className="space-y-6">
              <div className="text-animate">
                <h2 className="text-3xl font-bold text-[#B22222] mb-2">{directorInfo.name}</h2>
                <p className="text-xl text-gray-600 mb-4">{directorInfo.designation}</p>
                <p className="text-lg text-gray-700 mb-6">{directorInfo.qualifications}</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 text-animate" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#B22222]" />
                  <a href={`mailto:${directorInfo.email}`} className="text-gray-700 hover:text-[#B22222]">
                    {directorInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#B22222]" />
                  <a href={`tel:${directorInfo.phone}`} className="text-gray-700 hover:text-[#B22222]">
                    {directorInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#B22222]" />
                  <span className="text-gray-700">{directorInfo.office}</span>
                </div>
              </div>

              {/* Message */}
              <div className="bg-[#FFF8F0] p-6 rounded-xl border-l-4 border-[#B22222] text-animate" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-lg font-semibold text-[#B22222] mb-3">Technical Director Profile</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sri Chekka Apparao is the son of our society member Sri Ch.V.R. Ramana Murthy. He completed his B.Tech in Computer Science and Systems Engineering from GITAM, Visakhapatnam, and pursued his Master's Degree in Computer Science in the United States.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  He has worked in the IT industry for 8 years in various positions including Project Manager, Architect, System Administrator, and HR Manager in the US. He then became an entrepreneur and owned several retail franchised businesses for 9 years in the United States.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Having extensive experience in the technological field and administration, he took charge as Director (Technical) of Sri Vasavi Engineering College in 2016. Since then, he has been involved in day-to-day activities and is an integral part of policy changes and streamlining processes for the growth of the college.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#B22222] mb-4">Key Responsibilities</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Leading the institution with vision, dedication, and commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((responsibility, index) => (
              <div
                key={index}
                className="quick-link bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-[#B22222] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 font-medium">{responsibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default DirectorTechnical;
