import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  BookOpen,
  Building,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import '../components/Carousel.css';
import { AnimatedStat } from '../components/AnimatedStat';
import heroVideo from '../assets/enng-bg.mp4';
import content from '../content/home.json';

const Home: React.FC = () => {

  const quickLinksIcons: {[key: string]: React.ElementType} = {
    BookOpen: BookOpen,
    Users: Users,
    TrendingUp: TrendingUp,
    Award: Award
  };

  return (
    <div className="bg-[#FFF8F0] text-[#222222]">

      {/* VIDEO HERO BANNER */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden -mt-4">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            style={{ 
              minWidth: '100%', 
              minHeight: '100%',
              width: 'auto',
              height: 'auto'
            }}
          >
            <source src={heroVideo} type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop&crop=center"
              alt="Engineering Campus"
              className="w-full h-full object-cover"
            />
          </video>
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Hero Content */}
        <div className="container relative z-20 px-4 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 md:py-16 lg:py-20">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white animate-slide-in-up hover:scale-105 transition-transform duration-300 cursor-default" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.3)', opacity: 1 }}>
                Excellence in <br />
                <span className="text-yellow-300 animate-text-glow">Engineering Education</span>
              </h1>
              <p className="text-lg md:text-xl text-white max-w-2xl animate-slide-in-right" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)', opacity: 1, animationDelay: '0.3s' }}>
                Shaping the future through innovation, research, and strong industry connect since 1999.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 animate-slide-in-up" style={{ opacity: 1, animationDelay: '0.6s' }}>
                <Link
                  to="/admissions"
                  className="bg-white text-[#B22222] px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-[#f9e8e8] transition-all transform hover:scale-105 shadow-lg text-center animate-bounce-in"
                  style={{ opacity: 1, animationDelay: '0.8s' }}
                >
                  Apply Now
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-white hover:text-[#B22222] transition-all transform hover:scale-105 shadow-lg text-center animate-bounce-in"
                  style={{ opacity: 1, animationDelay: '1s' }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce animate-slide-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center animate-pulse-slow">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce-slow"></div>
          </div>
        </div>
      </section>

      {/* 🎯 Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                iconName={stat.icon}
                label={stat.label}
                value={stat.value}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 🔗 Quick Links */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#B22222]">Explore Our Campus</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover world-class facilities, innovative programs, and endless opportunities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.quickLinks.map((link, index) => {
              const Icon = quickLinksIcons[link.icon as keyof typeof quickLinksIcons];
              return (
              <Link
                key={index}
                to={link.link}
                className="quick-link bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Icon className="w-10 h-10 text-[#B22222] mb-4 group-hover:scale-110 transition-transform icon-bounce" />
                <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{link.desc}</p>
                <div className="text-[#B22222] font-medium flex items-center gap-1">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )})}
          </div>
        </div>
      </section>

      {/* 📰 News & Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[#B22222]">Latest News</h2>
              <Link to="/news" className="text-sm text-[#B22222] hover:underline">View All</Link>
            </div>
            <div className="space-y-6">
              {content.news.map((item, index) => (
                <div 
                  key={index} 
                  className="news-item border-l-4 border-[#B22222] pl-4 py-3 hover:bg-[#FFF8F0] rounded-r transition-all cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-1">
                    <span className="font-medium text-[#B22222]">{item.category}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold hover:text-[#8B0000] cursor-pointer transition-colors">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[#B22222]">Upcoming Events</h2>
              <Link to="/events" className="text-sm text-[#B22222] hover:underline">View All</Link>
            </div>
            <div className="space-y-4 bg-[#FFF8F0] p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-[#B22222] text-white p-3 rounded-md text-center w-16">
                  <div className="text-sm">JAN</div>
                  <div className="text-xl font-bold">25</div>
                </div>
                <div>
                  <h3 className="font-semibold text-[#B22222] mb-1">Tech Fest 2025</h3>
                  <p className="text-gray-600 text-sm">Annual technical symposium with competitions and workshops</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#B22222]/80 text-white p-3 rounded-md text-center w-16">
                  <div className="text-sm">FEB</div>
                  <div className="text-xl font-bold">15</div>
                </div>
                <div>
                  <h3 className="font-semibold text-[#B22222] mb-1">Industry Seminar</h3>
                  <p className="text-gray-600 text-sm">Insights from tech leaders on future trends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#B22222] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shape Your Future with Us</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Be a part of Sri Vasavi Engineering College's legacy of excellence in technical education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/admissions" 
              className="btn-dynamic bg-white text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#f9e8e8] transition-all transform hover:scale-105 shadow-lg"
            >
              Apply Now
            </Link>
            <Link 
              to="/contact" 
              className="btn-dynamic border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#B22222] transition-all transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
