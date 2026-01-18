
"use client";
import React, { useEffect, useState, useRef } from 'react';
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
  const [placementCarouselData, setPlacementCarouselData] = useState<any[]>([]);
  const [mouLogos, setMouLogos] = useState<any[]>([]);
  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const testimoniesCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const dbContent = await getHomePageContent();
        // Ensure that if dbContent is fetched but its arrays are empty, we still have fallbacks.
        if (dbContent && dbContent.stats.length > 0) {
          setHomeContent(dbContent);
        }
      } catch (error) {
        console.error("Could not fetch from database, using local content.", error);
      }
    }
    loadContent();
  }, []);

  useEffect(() => {
    async function fetchNoticeboardItems() {
      try {
        const response = await fetch('/api/exam-section/noticeboard?t=' + Date.now());
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          // Sort by posted_date in descending order
          const sorted = result.data.sort((a: NoticeboardItem, b: NoticeboardItem) => 
            new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
          );
          setNoticeboardItems(sorted);
        } else {
          console.warn('No noticeboard data returned from API');
        }
      } catch (error) {
        console.error('Error fetching noticeboard items:', error);
      }
    }
    fetchNoticeboardItems();
  }, []);

  useEffect(() => {
    async function fetchPlacementNotices() {
      try {
        const response = await fetch('/api/placement/noticeboard?t=' + Date.now());
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
          console.warn('No placement noticeboard data returned from API');
        }
      } catch (error) {
        console.error('Error fetching placement notices:', error);
      }
    }
    fetchPlacementNotices();
  }, []);

  useEffect(() => {
    async function fetchPlacementEvents() {
      try {
        const response = await fetch('/api/placement/events?t=' + Date.now());
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setPlacementEvents(result.data);
        } else {
          console.warn('No placement events data returned from API');
        }
      } catch (error) {
        console.error('Error fetching placement events:', error);
      }
    }
    fetchPlacementEvents();
  }, []);

  useEffect(() => {
    async function fetchPlacementCarousel() {
      try {
        const response = await fetch('/api/placement/carousel?t=' + Date.now());
        const result = await response.json();
        if (Array.isArray(result)) {
          setPlacementCarouselData(result);
        } else {
          console.warn('No placement carousel data returned from API');
        }
      } catch (error) {
        console.error('Error fetching placement carousel:', error);
      }
    }
    fetchPlacementCarousel();
  }, []);

  // Fetch MOUs/Company Logos
  useEffect(() => {
    async function fetchMOUs() {
      try {
        const response = await fetch('/api/admin/placement-mous?t=' + Date.now());
        const result = await response.json();
        if (Array.isArray(result)) {
          setMouLogos(result);
        } else {
          console.warn('No MOUs data returned from API');
        }
      } catch (error) {
        console.error('Error fetching MOUs:', error);
      }
    }
    fetchMOUs();
  }, []);

  // Fetch Testimonies
  useEffect(() => {
    async function fetchTestimonies() {
      try {
        const response = await fetch('/api/admin/placement-testimonies?t=' + Date.now());
        const result = await response.json();
        if (Array.isArray(result)) {
          setTestimonies(result);
        } else {
          console.warn('No testimonies data returned from API');
        }
      } catch (error) {
        console.error('Error fetching testimonies:', error);
      }
    }
    fetchTestimonies();
  }, []);

  // Mouse wheel scrolling for testimonies carousel
  useEffect(() => {
    const container = testimoniesCarouselRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? 100 : -100;
      container.scrollLeft += scrollAmount;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Auto-scroll carousel images
  useEffect(() => {
    if (placementCarouselData.length <= 1) return;

    const interval = setInterval(() => {
      setActiveCarouselIndex((prev) => (prev + 1) % placementCarouselData.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [placementCarouselData]);

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

      {/* Placements Scrolling Carousel */}
      <AnimatedSection animation="fadeInUp" className="py-8 md:py-16 bg-transparent">
        <div className="container mx-auto px-2 md:px-4">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-primary">Our Placements</h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              Celebrating our students' success stories and placement achievements
            </p>
          </div>
          
          {/* Carousel Container */}
          <div className="w-full md:max-w-5xl md:mx-auto relative group px-2 md:px-4">
            {/* Carousel Content - Fixed Frame */}
            <div 
              id="placementCarousel"
              className="relative w-full rounded-none md:rounded-none overflow-hidden shadow-none bg-transparent border-0 flex items-center justify-center"
              style={{ aspectRatio: '16/9', minHeight: '220px', maxHeight: '600px' }}
            >
              {placementCarouselData.length > 0 ? (
                <div className="relative w-full h-full flex items-center justify-center bg-transparent overflow-hidden">
                  <img
                    src={placementCarouselData[activeCarouselIndex]?.image_url}
                    alt={placementCarouselData[activeCarouselIndex]?.alt_text || 'Placement'}
                    className="w-full h-full object-contain block transition-opacity duration-700 ease-in-out"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <p className="text-gray-500 text-lg">No carousel images available</p>
                </div>
              )}
                {placementCarouselData.map((item: any) => (
                  <img
                    key={item.id}
                    src={item.image_url}
                    alt={item.alt_text}
                    className="hidden"
                  />
                ))}
            </div>

            {/* Indicators */}
            {placementCarouselData.length > 0 && (
              <div className="flex justify-center mt-3 md:mt-6 space-x-2 md:space-x-3 bg-transparent py-3 md:py-0">
                {placementCarouselData.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeCarouselIndex ? 'bg-[#B22222] scale-125' : 'bg-gray-300 hover:bg-[#B22222]/50'
                    }`}
                    onClick={() => setActiveCarouselIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Scroll Animation */}
          <style>{`
            @keyframes scrollCarousel {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-100% - 2rem));
              }
            }
            
            #placementCarousel:hover > div {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </AnimatedSection>

      {/* MOUs / Company Logos Section */}
      <AnimatedSection animation="fadeInUp" className="py-8 md:py-16 bg-transparent relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-2 md:px-4 relative z-10">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-primary">Our MOUs</h2>
            <p className="text-sm md:text-lg text-muted-foreground">
              Strategic partnerships with leading organizations
            </p>
          </div>

          {mouLogos.length > 0 ? (
            <div className="relative w-full mx-auto group">
              {/* Scrolling Container */}
              <div 
                className="relative overflow-hidden rounded-xl backdrop-blur-sm border border-primary/10 bg-white/50"
              >
                <div className="flex animate-scroll hover:pause" style={{
                  animation: 'scrollLogos 30s linear infinite',
                }}>
                  {/* Display each logo once, duplicated for infinite scroll */}
                  {[...mouLogos, ...mouLogos].map((logo: any, index: number) => (
                    <div
                      key={`${index}`}
                      className="flex-shrink-0 w-48 md:w-56 h-48 md:h-56 flex items-center justify-center mx-3 md:mx-6 p-6 rounded-lg bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/50 group-hover:from-white/90 group-hover:to-white/60 transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer"
                    >
                      {logo.image_url && (
                        <img
                          src={logo.image_url}
                          alt={logo.company_name || 'Company Logo'}
                          className="max-w-32 md:max-w-40 max-h-32 md:max-h-40 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Left Gradient Fade */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/100 to-white/0 z-10 pointer-events-none"></div>
                
                {/* Right Gradient Fade */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/100 to-white/0 z-10 pointer-events-none"></div>
              </div>

              {/* Scroll Animation */}
              <style>{`
                @keyframes scrollLogos {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(calc(-50% - 1rem));
                  }
                }
                
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
              `}</style>
            </div>
          ) : (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10">
              <p className="text-gray-500 text-lg">No MOUs available at the moment</p>
            </div>
          )}

         
        </div>
      </AnimatedSection>

      {/* Testimonies / Student Feedback Section */}
      <AnimatedSection animation="fadeInUp" className="py-8 md:py-20 bg-gradient-to-b from-transparent via-primary/3 to-transparent relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-32 -top-32 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-primary/0 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] bg-gradient-to-tl from-primary/10 to-primary/0 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-2 md:px-4 relative z-10">
          <div className="mb-8 md:mb-16 text-center space-y-4">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 text-primary text-xs md:text-sm font-semibold rounded-full">
                ✨ Student Voices
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Student Testimonies
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear directly from our graduates and current students about their experiences at SVEC
            </p>
          </div>

          {testimonies.length > 0 ? (
            <div className="relative w-full mx-auto group">
              {/* Scrolling Container */}
              <div 
                className="relative overflow-hidden"
              >
                <div className="flex animate-scroll hover:pause gap-6" style={{
                  animation: 'scrollTestimonies 25s linear infinite',
                }}>
                  {/* Display each testimony once, duplicated for infinite scroll */}
                  {[...testimonies, ...testimonies].map((testimony: any, index: number) => (
                    <div
                      key={`${index}`}
                      className="flex-shrink-0 w-64 md:w-80 flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-primary/5 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl hover:border-white/60 transition-all duration-300 group-hover:from-white/98 group-hover:to-primary/8 hover:scale-105 cursor-pointer overflow-hidden relative"
                      style={{ transform: "perspective(1000px)" }}
                      onMouseMove={(e) => {
                        const card = e.currentTarget;
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = (y - centerY) / 25;
                        const rotateY = (centerX - x) / 25;
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `perspective(1000px)`;
                      }}
                    >
                      {/* Decorative top border accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                      
                      {/* Profile Image */}
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-lg"></div>
                        {testimony.image_url ? (
                          <img
                            src={testimony.image_url}
                            alt={testimony.author_name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-primary/40 shadow-xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg relative z-10"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full border-4 border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg relative z-10">
                            <svg className="w-12 h-12 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Quote Icon */}
                      <svg className="w-10 h-10 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.5-1.5-4.5-1.5H7c0-1 .5-4 4-4 3.5 0 4 2.5 4 4v7c0 1-1 2-2 2s-1.5-.5-1.5-2V7c0-.5.5-1 1-1s1 .5 1 1v4c0 1-1 2-2 2s-1.5-.5-1.5-2V5c0-1.25-4.5-1.5-4.5-1.5H7c0-1 .5-4 4-4 3.5 0 4 2.5 4 4v7c0 1-1 2-2 2s-1.5-.5-1.5-2V7c0-.5.5-1 1-1s1 .5 1 1v4c0 1-1 2-2 2s-1.5-.5-1.5-2V5" />
                      </svg>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 mb-6 italic leading-relaxed text-justify text-sm md:text-base break-words whitespace-normal font-light">
                        "{testimony.testimonial_text}"
                      </p>

                      {/* Author Info */}
                      <div className="text-center mt-auto w-full pt-4 border-t border-primary/10">
                        <p className="font-bold text-gray-900 text-lg">{testimony.author_name}</p>
                        {testimony.author_title && (
                          <p className="text-xs md:text-sm text-primary font-semibold mt-2 bg-primary/5 px-3 py-1 rounded-full inline-block">{testimony.author_title}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Left Gradient Fade */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/100 to-white/0 z-10 pointer-events-none"></div>
                
                {/* Right Gradient Fade */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/100 to-white/0 z-10 pointer-events-none"></div>
              </div>

              {/* Scroll Animation */}
              <style>{`
                @keyframes scrollTestimonies {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(calc(-50% - 4rem));
                  }
                }
                
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
              `}</style>
            </div>
          ) : (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10">
              <p className="text-gray-500 text-lg">No testimonies available at the moment</p>
            </div>
          )}
        </div>
      </AnimatedSection>

      
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
