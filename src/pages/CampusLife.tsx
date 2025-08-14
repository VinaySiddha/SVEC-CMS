import React from 'react';
import { Users, Calendar, Award, Heart, Camera, Music, Gamepad2, BookOpen, Star, Trophy, Palette, Mic, Coffee } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '../components/AnimatedSection';
import SmoothLink from '../components/SmoothLink';

const CampusLife: React.FC = () => {

  const activities = [
    {
      icon: Music,
      title: "Cultural Events",
      description: "Annual festivals, concerts, dance competitions, and cultural celebrations throughout the year",
      color: "bg-purple-50 border-purple-200 text-purple-800",
      image: "/cultural-events.jpg"
    },
    {
      icon: Trophy,
      title: "Sports & Athletics",
      description: "Inter-college tournaments, fitness centers, outdoor courts, and recreational activities",
      color: "bg-green-50 border-green-200 text-green-800",
      image: "/sports.jpg"
    },
    {
      icon: Users,
      title: "Clubs & Societies",
      description: "Technical clubs, hobby groups, community service, and professional development societies",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      image: "/clubs.jpg"
    },
    {
      icon: Camera,
      title: "Photography Club",
      description: "Capture memories, learn photography skills, and showcase artistic talents",
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
      image: "/photography.jpg"
    }
  ];

  const facilities = [
    {
      icon: Coffee,
      title: "Food Courts",
      description: "Multiple dining options with diverse cuisines and healthy meal choices"
    },
    {
      icon: BookOpen,
      title: "Library",
      description: "24/7 study spaces, digital resources, and quiet reading areas"
    },
    {
      icon: Gamepad2,
      title: "Recreation Center",
      description: "Gaming zones, entertainment areas, and relaxation spaces"
    },
    {
      icon: Heart,
      title: "Health Center",
      description: "Medical facilities, counseling services, and wellness programs"
    }
  ];

  const events = [
    {
      title: "SVEC Fest 2024",
      date: "March 15-17, 2024",
      description: "Annual cultural festival featuring music, dance, drama, and competitions",
      category: "Cultural",
      featured: true
    },
    {
      title: "Tech Symposium",
      date: "April 10-12, 2024",
      description: "Technical exhibitions, hackathons, and innovation showcase",
      category: "Technical",
      featured: true
    },
    {
      title: "Sports Week",
      date: "February 20-26, 2024",
      description: "Inter-departmental sports competitions and tournaments",
      category: "Sports",
      featured: false
    },
    {
      title: "Cultural Night",
      date: "Monthly",
      description: "Regular cultural performances and talent showcases",
      category: "Cultural",
      featured: false
    }
  ];

  const achievements = [
    {
      title: "Best Cultural Event",
      description: "Won state-level cultural competition 2023",
      icon: Star
    },
    {
      title: "Sports Excellence",
      description: "Multiple gold medals in inter-college sports",
      icon: Trophy
    },
    {
      title: "Innovation Award",
      description: "Recognition for student innovation projects",
      icon: Award
    }
  ];

  return (
    <div className="pt-24 bg-background text-foreground">
      {/* Hero Section */}
      <AnimatedSection animation="fadeInUp" className="bg-primary text-white py-16 md:py-20 w-full rounded-none mb-12 overflow-hidden relative isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection animation="fadeInUp" delay={200}>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 relative inline-block">
              Campus Life
              <span className="text-white ml-2 text-xl md:text-2xl font-normal opacity-80">
                Live, Learn, Thrive
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={400}>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed opacity-90">
              Experience a vibrant campus community where academics meets creativity, sports, and lifelong friendships
            </p>
          </AnimatedSection>
        </div>

        {/* Subtle background shapes */}
        <div className="absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full opacity-70 shadow-sm z-0"></div>
        <div className="absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full opacity-70 shadow-sm z-0"></div>
      </AnimatedSection>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Student Activities */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Student Activities</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Diverse opportunities to explore your interests, develop skills, and create lasting memories
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activities.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className={`p-8 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${activity.color} relative overflow-hidden`}>
                      <div className="relative z-10">
                        <IconComponent className="w-12 h-12 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">{activity.title}</h3>
                        <p className="text-sm leading-relaxed">{activity.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Upcoming Events */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Upcoming Events</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Don't miss out on exciting events and activities happening on campus
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <AnimatedSection key={index} animation="fadeInUp" delay={index * 150}>
                  <div className={`bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-primary/10 ${event.featured ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
                    {event.featured && (
                      <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
                        Featured Event
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                      <span className="bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {event.category}
                      </span>
                    </div>
                    <p className="text-primary font-semibold mb-3">{event.date}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Campus Facilities */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Campus Facilities</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Modern amenities and facilities to support your academic and personal growth
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {facilities.map((facility, index) => {
                const IconComponent = facility.icon;
                return (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-primary/10 text-center">
                      <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-bold mb-3 text-foreground">{facility.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{facility.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Achievements */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Achievements</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Celebrating excellence in various fields of student activities and competitions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                    <div className="bg-secondary/30 p-8 rounded-xl text-center hover:scale-[1.02] transition-all duration-300">
                      <IconComponent className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-3 text-foreground">{achievement.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Student Testimonials */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Student Voices</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Hear what our students say about their campus life experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection animation="fadeInUp" delay={200}>
                <div className="bg-card p-8 rounded-xl shadow-lg border border-primary/10">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "The campus life at SVEC has been incredible. From cultural events to technical clubs, there's always something happening that helps us grow both personally and professionally."
                  </p>
                  <div>
                    <h4 className="font-bold text-foreground">Priya Sharma</h4>
                    <p className="text-sm text-muted-foreground">CSE Final Year</p>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fadeInUp" delay={400}>
                <div className="bg-card p-8 rounded-xl shadow-lg border border-primary/10">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "The sports facilities and recreational activities have made my college experience memorable. The support from faculty and peers in all activities is amazing."
                  </p>
                  <div>
                    <h4 className="font-bold text-foreground">Arjun Reddy</h4>
                    <p className="text-sm text-muted-foreground">ECE Third Year</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection animation="fadeInUp" className="text-center">
            <div className="bg-primary text-white rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
              <p className="text-xl mb-8 opacity-90">
                Become part of a vibrant campus life filled with opportunities and experiences
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SmoothLink
                  href="/admissions"
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg group border-2 border-white hover:bg-white/90 no-underline"
                >
                  Apply Now
                </SmoothLink>
                <SmoothLink
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 no-underline"
                >
                  Visit Campus
                </SmoothLink>
              </div>
            </div>
          </AnimatedSection>
        </div>
    </div>
  );
};

export default CampusLife;
