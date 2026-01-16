
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Award,
  BookOpen,
  Building,
  TrendingUp,
  ChevronRight,
  HelpCircle,
  FileDown
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AnimatedStat } from '@/components/AnimatedStat';
import { getHomePageContent } from '@/services/contentService';
import content from '@/content/home.json';
import AnimatedSection from '@/components/AnimatedSection';
import SmoothLink from '@/components/SmoothLink';

type QuickLink = {
  title: string;
  desc: string;
  link: string;
  icon: string;
};

type Stat = {
  icon: keyof typeof LucideIcons;
  label: string;
  value: string;
};

type HomePageContent = {
  stats: Stat[];
  quickLinks: QuickLink[];
};

type NoticeboardItem = {
  id: number;
  title: string;
  category: string;
  posted_date: string;
  file_url?: string;
};

type PlacementNotice = {
  id: number;
  title: string;
  category: string;
  posted_date: string;
  content?: string;
  file_url?: string;
};

const Home: React.FC = () => {

  const [homeContent, setHomeContent] = useState<HomePageContent>(content as HomePageContent);
  const [noticeboardItems, setNoticeboardItems] = useState<NoticeboardItem[]>([]);
  const [placementNotices, setPlacementNotices] = useState<PlacementNotice[]>([]);
  const [placementEvents, setPlacementEvents] = useState<any[]>([]);

  useEffect(() => {
    async function loadContent() {
      try {
        const dbContent = await getHomePageContent();
        // Ensure that if dbContent is fetched but its arrays are empty, we still have fallbacks.
        if (dbContent && dbContent.stats.length > 0) {
          setHomeContent(dbContent);
        }
      } catch (error) {
      }
    }
    loadContent();
  }, []);

  useEffect(() => {
    async function fetchNoticeboardItems() {
      try {
        const response = await fetch('/api/exam-section/noticeboard');
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          // Sort by posted_date in descending order
          const sorted = result.data.sort((a: NoticeboardItem, b: NoticeboardItem) => 
            new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
          );
          setNoticeboardItems(sorted);
        } else {
        }
      } catch (error) {
      }
    }
    fetchNoticeboardItems();
  }, []);

  useEffect(() => {
    async function fetchPlacementNotices() {
      try {
        const response = await fetch('/api/placement/noticeboard');
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          // Sort by posted_date in descending order
          const sorted = result.data.sort((a: PlacementNotice, b: PlacementNotice) => 
            new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
          );
          setPlacementNotices(sorted);
        } else if (Array.isArray(result)) {
          // Fallback if response is just an array
          const sorted = result.sort((a: PlacementNotice, b: PlacementNotice) => 
            new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
          );
          setPlacementNotices(sorted);
        } else {
        }
      } catch (error) {
      }
    }
    fetchPlacementNotices();
  }, []);

  useEffect(() => {
    async function fetchPlacementEvents() {
      try {
        const response = await fetch('/api/placement/events');
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setPlacementEvents(result.data);
        } else {
        }
      } catch (error) {
      }
    }
    fetchPlacementEvents();
  }, []);

  const quickLinksIcons: { [key: string]: React.ElementType } = {
    BookOpen: BookOpen,
    Users: Users,
    TrendingUp: TrendingUp,
    Award: Award
  };

  return (
    <>
      {/* VIDEO HERO BANNER */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
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
            <source src="/DroneView.mp4" type="video/mp4" />
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
            <SmoothLink
              href="/admissions"
              className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-50 border-2 border-primary transition-transform transform hover:scale-105 no-underline"
            >
              Apply Now
            </SmoothLink>
            <SmoothLink
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-primary transition-colors no-underline"
            >
              Learn More
            </SmoothLink>
          </div>
        </div>
      </section>

      {/* A Meaningful College Section */}
      <AnimatedSection animation="fadeInUp" className="py-16 bg-white overflow-hidden transition-all duration-300">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeInUp" delay={200} className="text-center mb-12 relative group">
            {/* Decorative elements with animations */}
            <div className="absolute -left-20 top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700 group-hover:scale-125"></div>
            <div className="absolute -right-20 bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700 group-hover:scale-125"></div>

            {/* Rotating glow effect removed to prevent background movement */}

            {/* Floating animation elements removed to prevent background movement */}

            <div className="relative transition-transform duration-500 ease-out transform group-hover:scale-105">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-up text-primary transition-all duration-300 group-hover:text-primary/90 group-hover:-translate-y-1"
                style={{ animationDelay: '0.1s', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                A Meaningful College
                <span className="absolute -inset-1 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8 animate-fade-up transition-all duration-500 ease-out group-hover:w-32 group-hover:bg-primary/90 relative overflow-hidden"
                style={{ animationDelay: '0.2s' }}>
                {/* Slide animation removed to prevent background movement */}
              </div>
            </div>

            <div className="max-w-4xl mx-auto prose prose-lg text-foreground/80 animate-fade-up relative transition-all duration-500 ease-out transform group-hover:scale-102"
              style={{ animationDelay: '0.3s' }}>
              <p className="text-justify leading-relaxed transition-all duration-300 relative">
                <span className="text-primary font-medium transition-colors duration-300 group-hover:text-primary/90 relative">
                  Sri Vasavi Engineering College
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/30 group-hover:w-full transition-all duration-700"></span>
                </span> stands as a beacon of academic excellence and innovation in the field of engineering education. Nestled in
                a serene environment, the college is committed to nurturing future leaders who are equipped with both technical prowess and a strong
                ethical foundation, enabling them to address complex challenges and contribute meaningfully to societal advancement.
              </p>
              <p className="text-justify leading-relaxed mt-4 transition-all duration-300 relative">
                <span className="text-primary font-medium transition-colors duration-300 group-hover:text-primary/90 relative">
                  Sri Vasavi Engineering College
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/30 group-hover:w-full transition-all duration-700 delay-100"></span>
                </span> provides a conducive learning environment for students to explore, innovate, and excel. The institution's
                unwavering dedication to fostering a thriving, holistic development, coupled with a focus on research and industry collaboration, ensures that
                graduates are well-prepared to meet the challenges of the ever-evolving global landscape. As a hub of intellectual curiosity and cutting-
                edge technology, <span className="text-primary font-medium transition-colors duration-300 group-hover:text-primary/90 relative">
                  Sri Vasavi Engineering College
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/30 group-hover:w-full transition-all duration-700 delay-200"></span>
                </span> is poised to shape the future of engineering education and produce graduates who will
                make significant contributions to society.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <div className="max-w-5xl mx-auto mt-16 transition-all duration-500">
          <div className="text-center mb-10 animate-fade-up group transition-transform duration-500 hover:scale-105" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3 group-hover:-translate-y-1 transition-all duration-300">Our Accreditations & Affiliations</h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">Recognized for our commitment to quality education and excellence</p>
            <div className="w-16 h-0.5 bg-primary/50 mx-auto mt-4 group-hover:w-24 transition-all duration-500"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mt-10">
            {[
              { logo: "/a_logo/aicte.png", name: "AICTE", alt: "AICTE Logo", delay: "0.5s", subtitle: "Approved Institution" },
              { logo: "/a_logo/jntuk.png", name: "JNTUK", alt: "JNTUK Logo", delay: "0.6s", subtitle: "University Affiliated" },
              { logo: "/a_logo/nba.png", name: "NBA", alt: "NBA Logo", delay: "0.7s", subtitle: "Accredited Programs" },
              { logo: "/a_logo/naac.png", name: "NAAC A", alt: "NAAC A Grade Logo", delay: "0.8s", subtitle: "A Grade Institution" },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col items-center justify-center animate-fade-up group cursor-pointer overflow-hidden"
                style={{
                  animationDelay: item.delay,
                  transform: "perspective(1000px)"
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;

                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `perspective(1000px)`;
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:blur-lg"></div>

                {/* Moving spotlight effect removed to prevent background movement */}

                <div className="relative w-20 h-20 mb-5 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                  {/* Pulsing background circle */}
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-slow group-hover:bg-primary/20 transition-colors duration-500"></div>

                  {/* Logo container */}
                  <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                      style={{ backgroundImage: "radial-gradient(circle at center, #4338ca 1px, transparent 1px)", backgroundSize: "8px 8px" }}></div>

                    {/* Logo image */}
                    <img
                      src={item.logo}
                      alt={item.alt}
                      className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
                    />

                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>

                  {/* Animated rings on hover */}
                  <div className="absolute inset-0 border-2 border-primary/0 rounded-full group-hover:border-primary/20 group-hover:scale-110 transition-all duration-700 ease-out"></div>
                  <div className="absolute inset-0 scale-110 border border-primary/0 rounded-full group-hover:border-primary/10 group-hover:scale-125 transition-all duration-1000 ease-out"></div>
                  <div className="absolute inset-0 scale-125 border border-primary/0 rounded-full group-hover:border-primary/5 group-hover:scale-150 transition-all duration-1500 ease-out"></div>
                </div>

                <h3 className="font-bold text-center text-lg group-hover:text-primary transition-colors duration-300 relative z-10">{item.name}</h3>
                {item.subtitle && <p className="text-xs text-muted-foreground mt-1 group-hover:text-primary/70 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-500">{item.subtitle}</p>}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      {/* </AnimatedSection> */}

      {/* Stats Section */}
      <AnimatedSection animation="fadeInUp" className="py-20 bg-secondary/10 overflow-hidden relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          {/* Floating elements removed to prevent background movement */}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-up relative group">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-20 h-20 bg-primary/5 rounded-full blur-2xl opacity-50 group-hover:bg-primary/10 group-hover:w-24 transition-all duration-700"></div>
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-20 h-20 bg-primary/5 rounded-full blur-2xl opacity-50 group-hover:bg-primary/10 group-hover:w-24 transition-all duration-700"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground relative inline-block">
                Our Achievements <span className="text-primary relative">
                  in Numbers
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3C50 3 50 3 100 3C150 3 150 3 200 3" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="w-24 h-1 bg-primary mx-auto mb-6 relative overflow-hidden group-hover:w-32 transition-all duration-700">
              {/* Slide animation removed to prevent background movement */}
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto group-hover:text-foreground/70 transition-colors duration-300">
              Sri Vasavi Engineering College takes pride in its accomplishments across academics, research, and infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Academic Excellence */}
            <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-md border border-white/20 transition-all duration-500 hover:shadow-lg animate-fade-up group relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
              {/* Top corner accent */}
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-primary/10 rotate-45 transform origin-center group-hover:bg-primary/20 transition-colors duration-500"></div>

              {/* Animated stripe on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary/30 to-primary/70 group-hover:w-full transition-all duration-700 ease-out"></div>

              <div className="mb-6 flex items-center relative">
                <div className="p-3 bg-primary/10 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors duration-500">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">Academic Excellence</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {homeContent.stats
                  .filter(stat => ['Courses', 'Students', 'Faculty', 'Years of Excellence'].includes(stat.label))
                  .map((stat, index) => {
                    // We're using the original component approach but customizing the display
                    return (
                      <div key={index} className="flex items-center group relative p-3 hover:bg-primary/5 rounded-lg transition-all duration-300">
                        <div className="mr-3 p-2 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                          {stat.icon === 'Users' && <Users className="w-5 h-5 text-primary" />}
                          {stat.icon === 'BookOpen' && <BookOpen className="w-5 h-5 text-primary" />}
                          {stat.icon === 'Award' && <Award className="w-5 h-5 text-primary" />}
                          {stat.icon === 'Building' && <Building className="w-5 h-5 text-primary" />}
                          {stat.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5 text-primary" />}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary group-hover:translate-x-1 transition-transform relative">
                            <AnimatedStat
                              iconName={stat.icon as keyof typeof LucideIcons}
                              label=""
                              value={stat.value}
                              index={index}
                            />
                            {/* Subtle highlight effect on hover */}
                            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 -z-10 rounded-sm blur-sm transition-colors duration-300"></span>
                          </div>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{stat.label}</p>
                        </div>
                        {/* Subtle indicator for interaction */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="h-2 w-2 rounded-full bg-primary/30"></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Infrastructure & Facilities */}
            <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-md border border-white/20 transition-all duration-500 hover:shadow-lg animate-fade-up group relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
              {/* Top corner accent */}
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-primary/10 rotate-45 transform origin-center group-hover:bg-primary/20 transition-colors duration-500"></div>

              {/* Animated stripe on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary/30 to-primary/70 group-hover:w-full transition-all duration-700 ease-out"></div>

              <div className="mb-6 flex items-center relative">
                <div className="p-3 bg-primary/10 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors duration-500">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">Infrastructure</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {homeContent.stats
                  .filter(stat => ['Labs', 'Departments', 'Clubs', 'Events'].includes(stat.label))
                  .map((stat, index) => {
                    return (
                      <div key={index} className="flex items-center group relative p-3 hover:bg-primary/5 rounded-lg transition-all duration-300">
                        <div className="mr-3 p-2 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                          {stat.icon === 'Users' && <Users className="w-5 h-5 text-primary" />}
                          {stat.icon === 'BookOpen' && <BookOpen className="w-5 h-5 text-primary" />}
                          {stat.icon === 'Award' && <Award className="w-5 h-5 text-primary" />}
                          {stat.icon === 'Building' && <Building className="w-5 h-5 text-primary" />}
                          {stat.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5 text-primary" />}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary group-hover:translate-x-1 transition-transform relative">
                            <AnimatedStat
                              iconName={stat.icon as keyof typeof LucideIcons}
                              label=""
                              value={stat.value}
                              index={index}
                            />
                            {/* Subtle highlight effect on hover */}
                            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 -z-10 rounded-sm blur-sm transition-colors duration-300"></span>
                          </div>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{stat.label}</p>
                        </div>
                        {/* Subtle indicator for interaction */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="h-2 w-2 rounded-full bg-primary/30"></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Research & Outcomes */}
            <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-md border border-white/20 transition-all duration-500 hover:shadow-lg animate-fade-up group relative overflow-hidden" style={{ animationDelay: '0.5s' }}>
              {/* Top corner accent */}
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-primary/10 rotate-45 transform origin-center group-hover:bg-primary/20 transition-colors duration-500"></div>

              {/* Animated stripe on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary/30 to-primary/70 group-hover:w-full transition-all duration-700 ease-out"></div>

              <div className="mb-6 flex items-center relative">
                <div className="p-3 bg-primary/10 rounded-xl mr-4 group-hover:bg-primary/20 transition-colors duration-500">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">Outcomes</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {homeContent.stats
                  .filter(stat => ['Research Papers', 'Placements',  'Alumni'].includes(stat.label))
                  .map((stat, index) => {
                    return (
                      <div key={index} className="flex items-center group relative p-3 hover:bg-primary/5 rounded-lg transition-all duration-300">
                        <div className="mr-3 p-2 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                          {stat.icon === 'Users' && <Users className="w-5 h-5 text-primary" />}
                          {stat.icon === 'BookOpen' && <BookOpen className="w-5 h-5 text-primary" />}
                          {stat.icon === 'Award' && <Award className="w-5 h-5 text-primary" />}
                          {stat.icon === 'Building' && <Building className="w-5 h-5 text-primary" />}
                          {stat.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5 text-primary" />}
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary group-hover:translate-x-1 transition-transform relative">
                            <AnimatedStat
                              iconName={stat.icon as keyof typeof LucideIcons}
                              label=""
                              value={stat.value}
                              index={index}
                            />
                            {/* Subtle highlight effect on hover */}
                            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 -z-10 rounded-sm blur-sm transition-colors duration-300"></span>
                          </div>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{stat.label}</p>
                        </div>
                        {/* Subtle indicator for interaction */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="h-2 w-2 rounded-full bg-primary/30"></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center animate-fade-up" style={{ animationDelay: '0.7s' }}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors px-6 py-2 rounded-full hover:bg-primary/5 border border-transparent hover:border-primary/10"
            >
              Learn more about our achievements
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 rounded-full bg-primary/5 blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></span>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Links */}
      <AnimatedSection animation="fadeInUp" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Explore Our Campus</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover world-class facilities, innovative programs, and endless opportunities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeContent.quickLinks.map((link, index) => {
              const Icon = quickLinksIcons[link.icon as keyof typeof quickLinksIcons] || BookOpen;
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
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* News & Events */}
      <AnimatedSection animation="fadeInUp" className="py-16 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Results Updates</h2>
            </div>
            <div
              className="overflow-hidden h-80 bg-white p-6 rounded-lg border border-primary/20"
              onMouseEnter={(e) => {
                const target = e.currentTarget.querySelector('.news-scroll-content') as HTMLElement;
                if (target) target.style.animationPlayState = 'paused';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget.querySelector('.news-scroll-content') as HTMLElement;
                if (target) target.style.animationPlayState = 'running';
              }}
            >
              <div className="news-scroll-content space-y-4" style={{
                animation: 'scrollNews 20s linear infinite',
              }}>
                {/* Fetched noticeboard items from exam_section_noticeboard */}
                {noticeboardItems.length > 0 ? (
                  noticeboardItems.map((item, index) => {
                    const postedDate = new Date(item.posted_date);
                    const month = postedDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                    const day = postedDate.getDate();

                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 group"
                      >
                        {/* Date Box */}
                        <div className={`${index === 0 ? 'bg-primary/80 text-primary-foreground' : 'bg-white text-primary border border-primary'} p-3 rounded-md text-center w-16 flex-shrink-0`}>
                          <div className="text-sm font-semibold">{month}</div>
                          <div className="text-xl font-bold">{day}</div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.category}</p>
                          {item.file_url && (
                            <a
                              href={item.file_url}
                              download
                              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors group-hover:underline"
                              title="Download PDF"
                            >
                              <FileDown className="w-3 h-3" />
                              View
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Fallback to static content if no data
                  <>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/80 text-primary-foreground p-3 rounded-md text-center w-16">
                        <div className="text-sm">JAN</div>
                        <div className="text-xl font-bold">05</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Annual Cultural Fest Announced for February</h3>
                        <p className="text-muted-foreground text-sm">Events</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-white text-primary p-3 rounded-md text-center w-16 border border-primary">
                        <div className="text-sm">JAN</div>
                        <div className="text-xl font-bold">03</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Professor Dr. Sharma Receives Excellence Award</h3>
                        <p className="text-muted-foreground text-sm">Faculty</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-white text-primary p-3 rounded-md text-center w-16 border border-primary">
                        <div className="text-sm">DEC</div>
                        <div className="text-xl font-bold">28</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">New Library Wing Construction Completed</h3>
                        <p className="text-muted-foreground text-sm">Infrastructure</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

<div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Recruitment Events</h2>
            </div>
            <div
              className="overflow-hidden h-80 bg-white p-6 rounded-lg border border-primary/20"
              onMouseEnter={(e) => {
                const target = e.currentTarget.querySelector('.events-scroll-content') as HTMLElement;
                if (target) target.style.animationPlayState = 'paused';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget.querySelector('.events-scroll-content') as HTMLElement;
                if (target) target.style.animationPlayState = 'running';
              }}
            >
              <div className="events-scroll-content space-y-4" style={{
                animation: 'scrollEvents 15s linear infinite',
              }}>
                {/* Fetched placement events from placement_events table */}
                {placementEvents.length > 0 ? (
                  placementEvents.map((event, index) => {
                    return (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className={`${index === 0 ? 'bg-primary/80 text-primary-foreground' : 'bg-white text-primary border border-primary'} p-3 rounded-md text-center w-16 flex-shrink-0`}>
                          <div className="text-sm font-semibold">JOB</div>
                          <div className="text-xl font-bold">{index + 1}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                          <div className="flex gap-2 mt-2">
                            {event.circular_url && (
                              <a
                                href={event.circular_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                              >
                                <FileDown className="w-3 h-3" />
                                Circular
                              </a>
                            )}
                            {event.link && (
                              <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                              >
                                <FileDown className="w-3 h-3" />
                                Apply
                              </a>
                            )}
                            {event.guidelines_url && (
                              <a
                                href={event.guidelines_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                              >
                                <FileDown className="w-3 h-3" />
                                Guidelines
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Fallback to static content if no data
                  <>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/80 text-primary-foreground p-3 rounded-md text-center w-16">
                        <div className="text-sm">JOB</div>
                        <div className="text-xl font-bold">1</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">TCS Recruitment Drive</h3>
                        <p className="text-muted-foreground text-sm">Campus drive for engineering graduates</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-white text-primary p-3 rounded-md text-center w-16 border border-primary">
                        <div className="text-sm">JOB</div>
                        <div className="text-xl font-bold">2</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Infosys Campus Hiring</h3>
                        <p className="text-muted-foreground text-sm">Recruitment for various technical roles</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-white text-primary p-3 rounded-md text-center w-16 border border-primary">
                        <div className="text-sm">JOB</div>
                        <div className="text-xl font-bold">3</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Accenture Campus Drive</h3>
                        <p className="text-muted-foreground text-sm">Full-time opportunities for fresh graduates</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Placement News</h2>
              
            </div>
            <div
              className="overflow-hidden h-80 bg-white p-6 rounded-lg border border-primary/20"
              onMouseEnter={(e) => {
                const target = e.currentTarget.querySelector('.events-scroll-content') as HTMLElement;
                if (target) target.style.animationPlayState = 'paused';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget.querySelector('.events-scroll-content') as HTMLElement;
                if (target) target.style.animationPlayState = 'running';
              }}
            >
              <div className="events-scroll-content space-y-4" style={{
                animation: 'scrollEvents 15s linear infinite',
              }}>
                {/* Fetched placement noticeboard items */}
                {placementNotices.length > 0 ? (
                  placementNotices.map((notice, index) => {
                    const postedDate = new Date(notice.posted_date);
                    const month = postedDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                    const day = postedDate.getDate();

                    return (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className={`${index === 0 ? 'bg-primary/80 text-primary-foreground' : 'bg-white text-primary border border-primary'} p-3 rounded-md text-center w-16 flex-shrink-0`}>
                          <div className="text-sm font-semibold">{month}</div>
                          <div className="text-xl font-bold">{day}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{notice.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{notice.category}</p>
                          {notice.file_url && (
                            <a
                              href={notice.file_url}
                              download
                              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors group-hover:underline"
                              title="Download PDF"
                            >
                              <FileDown className="w-3 h-3" />
                              View
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Fallback to static content if no data
                  <>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/80 text-primary-foreground p-3 rounded-md text-center w-16">
                        <div className="text-sm">JAN</div>
                        <div className="text-xl font-bold">25</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Tech Fest 2025</h3>
                        <p className="text-muted-foreground text-sm">Annual technical symposium with competitions and workshops</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white text-primary p-3 rounded-md text-center w-16 border border-primary">
                        <div className="text-sm">FEB</div>
                        <div className="text-xl font-bold">15</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Industry Seminar</h3>
                        <p className="text-muted-foreground text-sm">Insights from tech leaders on future trends</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white text-primary p-3 rounded-md text-center w-16 border border-primary">
                        <div className="text-sm">MAR</div>
                        <div className="text-xl font-bold">10</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Career Fair 2025</h3>
                        <p className="text-muted-foreground text-sm">Meet top companies and explore job opportunities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white text-primary p-3 rounded-md text-center w-16 border border-primary">
                        <div className="text-sm">APR</div>
                        <div className="text-xl font-bold">05</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Research Symposium</h3>
                        <p className="text-muted-foreground text-sm">Showcase of innovative student and faculty research</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-white text-primary p-3 rounded-md text-center w-16 border border-primary">
                        <div className="text-sm">MAY</div>
                        <div className="text-xl font-bold">20</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Alumni Meet</h3>
                        <p className="text-muted-foreground text-sm">Annual gathering of SVEC graduates</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="fadeInUp" className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shape Your Future with Us</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto text-primary-foreground/90">
            Be a part of Sri Vasavi Engineering College's legacy of excellence in technical education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SmoothLink
              href="/admissions"
              className="bg-primary-foreground text-primary px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground/90 transition-transform transform hover:scale-105 no-underline"
            >
              Apply Now
            </SmoothLink>
            <SmoothLink
              href="/contact"
              className="border-2 border-primary-foreground text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground hover:text-primary transition-colors no-underline"
            >
              Contact Us
            </SmoothLink>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default Home;
