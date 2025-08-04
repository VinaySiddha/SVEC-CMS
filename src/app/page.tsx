
"use client";
import React from 'react';
import Link from 'next/link';
import {
  Users,
  Award,
  BookOpen,
  Building,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import type * as LucideIcons from 'lucide-react';
import { AnimatedStat } from '@/components/AnimatedStat';
import content from '@/content/home.json';

const Home: React.FC = () => {

  const quickLinksIcons: {[key: string]: React.ElementType} = {
    BookOpen: BookOpen,
    Users: Users,
    TrendingUp: TrendingUp,
    Award: Award
  };

  return (
    <div className="bg-background text-foreground">

      {/* VIDEO HERO BANNER */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden -mt-4">
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
            <source src="/enng-bg.mp4" type="video/mp4" />
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop&crop=center"
              alt="Engineering Campus"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="container relative z-10 px-4 text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              Excellence in <span className="text-primary">Engineering Education</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Shaping the future through innovation, research, and strong industry connect since 1999.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admissions"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-transform transform hover:scale-105"
              >
                Apply Now
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Learn More
              </Link>
            </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                iconName={stat.icon as keyof typeof LucideIcons}
                label={stat.label}
                value={stat.value}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Explore Our Campus</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover world-class facilities, innovative programs, and endless opportunities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.quickLinks.map((link, index) => {
              const Icon = quickLinksIcons[link.icon as keyof typeof quickLinksIcons];
              return (
              <Link
                key={index}
                href={link.link}
                className="bg-card p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow group border"
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{link.desc}</p>
                <div className="text-primary font-medium flex items-center gap-1">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )})}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Latest News</h2>
              <Link href="/news" className="text-sm text-primary hover:underline font-medium">View All</Link>
            </div>
            <div className="space-y-4">
              {content.news.map((item, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-primary pl-4 py-3 hover:bg-secondary/50 rounded-r transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{item.category}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-semibold hover:text-primary cursor-pointer transition-colors">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Link href="/events" className="text-sm text-primary hover:underline font-medium">View All</Link>
            </div>
            <div className="space-y-4 bg-secondary/50 p-6 rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-md text-center w-16">
                  <div className="text-sm">JAN</div>
                  <div className="text-xl font-bold">25</div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Tech Fest 2025</h3>
                  <p className="text-muted-foreground text-sm">Annual technical symposium with competitions and workshops</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/80 text-primary-foreground p-3 rounded-md text-center w-16">
                  <div className="text-sm">FEB</div>
                  <div className="text-xl font-bold">15</div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Industry Seminar</h3>
                  <p className="text-muted-foreground text-sm">Insights from tech leaders on future trends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shape Your Future with Us</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto text-primary-foreground/90">
            Be a part of Sri Vasavi Engineering College's legacy of excellence in technical education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admissions" 
              className="bg-primary-foreground text-primary px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground/90 transition-transform transform hover:scale-105"
            >
              Apply Now
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground hover:text-primary transition-colors"
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
