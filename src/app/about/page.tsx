"use client";
import React, { useState } from 'react';
import { Award, Users, BookOpen, Globe, Target, Eye, Heart, ArrowRight, Menu, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import content from '../../content/about.json';

const About: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    'Mission & Vision',
    'Board of Governance',
    'Sri Vasavi Society',
    'AQAR',
    'IQAC',
    'Contact Us'
  ];

  const iconMap: { [key: string]: React.ElementType } = {
    Award,
    Users,
    BookOpen,
    Globe,
  };

  return (
    <div className="bg-background text-foreground pt-20">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About SVEC</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Committed to excellence in engineering education and fostering innovation for over two decades.
          </p>
        </div>
      </section>

      <div className="relative">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-24 left-4 z-30 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        <div className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">About SVEC</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium bg-gray-800/50 hover:bg-primary/80 transition-colors group flex items-center justify-between"
                  onClick={() => {
                    if (item === 'Contact Us') window.location.href = '/contact';
                    setSidebarOpen(false);
                  }}
                >
                  <span>{item}</span>
                  <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </nav>
          </div>
        </div>

        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="container mx-auto px-4 py-16">
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.achievements.map((achievement, index) => {
                const Icon = iconMap[achievement.icon];
                return (
                  <div key={index} className="text-center p-6 rounded-lg bg-card border shadow-sm">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground text-sm">{achievement.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Established in 1999, Sri Vasavi Engineering College has been at the forefront of engineering education in Andhra Pradesh. Located in the serene town of Tadepalligudem, our institution has grown to become a premier engineering college.
                  </p>
                  <p>
                    We are committed to providing quality education that combines theoretical knowledge with practical applications. Our state-of-the-art infrastructure, experienced faculty, and industry partnerships ensure our students are well-prepared for the modern engineering world.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="College Campus" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </section>

          <section className="mb-16">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-lg bg-card border">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-2">Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be a globally recognized institution for excellence in engineering education, research, and innovation.
                  </p>
                </div>
                <div className="text-center p-8 rounded-lg bg-primary text-primary-foreground">
                  <Target className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Mission</h3>
                  <p className="leading-relaxed text-primary-foreground/90">
                    To provide quality engineering education, foster a research culture, and maintain strong industry partnerships.
                  </p>
                </div>
                <div className="text-center p-8 rounded-lg bg-card border">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-2">Values</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Integrity, Excellence, Innovation, Inclusivity, and Social Responsibility guide our approach.
                  </p>
                </div>
              </div>
          </section>

          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Leadership</h2>
              <p className="text-muted-foreground mb-4">Meet our experienced leadership team</p>
              <Link href="/administration/deans" className="text-primary font-semibold hover:underline">
                View Full Administration Team <ArrowRight className="inline w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {content.leadership.map((leader, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center space-x-6">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{leader.name}</h3>
                      <p className="text-primary font-semibold">{leader.position}</p>
                      <p className="text-sm text-muted-foreground mt-2">{leader.experience}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
