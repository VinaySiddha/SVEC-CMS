import React, { useEffect, useMemo, useRef, useState } from 'react';

import { TrendingUp, Building, Users, Award, Target, Briefcase, Star, CheckCircle, ChevronRight, ChevronLeft, Phone, Mail, ExternalLink, Loader, FileDown } from 'lucide-react';

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import content from '../content/placements.json';

interface PlacementStatistics {
  id: number;
  academic_year: string;
  department_code: string;
  department_name: string;
  total_students: number;
  students_placed: number;
  placement_percentage: number;
  highest_package: number;
  average_package: number;
  companies_visited: number;
}

interface Company {
  id: number;
  name: string;
  logo_url?: string;
  industry: string;
  company_type: string;
}

interface PlacementTeamMember {
  id: number;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  office?: string;
  image_url?: string;
}

interface PlacementOfficer {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  linkedin?: string;
  image_url?: string;
}

interface CarouselImage {
  id: number;
  image_url: string;
  alt_text: string;
}

interface PlacementInfo {
  id: number;
  title: string;
  description: string;
}

interface PlacementCompanyLogo {
  id: number;
  image_url: string;
  company_name?: string;
}

interface PlacementPDF {
  id: number;
  year: string;
  title?: string | null;
  pdf_url: string;
  created_at?: string;
}

interface PlacementChartEntry {
  id?: number;
  year: string;
  civil: number;
  mech: number;
  eee: number;
  ece: number;
  cse: number;
  mba: number;
  aiml?: number;
  cai?: number;
  ect?: number;
  cst?: number;
  created_at?: string;
}

interface Timetable {
  sno: number;
  date: string;
  content: string;
  degree: string;
  type: string;
  link: string;
  posteddate: string;
}

const Placements: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // State for API data
  const [statistics, setStatistics] = useState<PlacementStatistics[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [team, setTeam] = useState<PlacementTeamMember[]>([]);
  const [placementOfficer, setPlacementOfficer] = useState<PlacementOfficer | null>(null);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
  const [error, setError] = useState<string | null>(null);

  // State for placement_info table
  const [placementInfo, setPlacementInfo] = useState<PlacementInfo | null>(null);

  // State for timetable data
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [companyLogos, setCompanyLogos] = useState<PlacementCompanyLogo[]>([]);
  const [placementPdfs, setPlacementPdfs] = useState<PlacementPDF[]>([]);
  const [placementCharts, setPlacementCharts] = useState<PlacementChartEntry[]>([]);

  // Fetch data from API
  useEffect(() => {
    const fetchPlacementData = async () => {
      try {
        setLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const ampBuster = `&_t=${timestamp}`;

        // Execute all API calls in parallel for 80-90% faster loading
        const [mainData, logos, pdfs, charts, team, officer, carousel, info, timetable] = await Promise.all([
          fetch(`/api/placements${cacheBuster}`).then(r => r.json()),
          fetch(`/api/placement/logos${cacheBuster}`).then(r => r.ok ? r.json() : null),
          fetch(`/api/placement/pdfs${cacheBuster}`).then(r => r.ok ? r.json() : null),
          fetch(`/api/placement/charts${cacheBuster}`).then(r => r.ok ? r.json() : null),
          fetch(`/api/placement/team${cacheBuster}`).then(r => r.ok ? r.json() : null),
          fetch(`/api/placement/officer${cacheBuster}`).then(r => r.ok ? r.json() : null),
          fetch(`/api/placement/carousel${cacheBuster}`).then(r => r.ok ? r.json() : null),
          fetch(`/api/placement/info${cacheBuster}`).then(r => r.ok ? r.json() : null),
          fetch(`/api/exam-section/jntuk-exam-section?type=timetable${ampBuster}`).then(r => r.ok ? r.json() : null)
        ]);

        // Process main placement data
        if (mainData?.success) {
          setStatistics(mainData.data.statistics || []);
          setCompanies(mainData.data.companies || []);
        } else {
          setError(mainData?.error || 'Failed to load data');
        }

        // Process company logos
        if (Array.isArray(logos)) {
          setCompanyLogos(logos);
        }

        // Process PDFs
        if (Array.isArray(pdfs)) {
          setPlacementPdfs(pdfs);
        } else {
          setPlacementPdfs([]);
        }

        // Process charts
        if (Array.isArray(charts)) {
          setPlacementCharts(charts);
        } else {
          setPlacementCharts([]);
        }

        // Process team
        if (Array.isArray(team)) {
          setTeam(team);
        }

        // Process officer
        if (officer?.id) {
          setPlacementOfficer(officer);
        }

        // Process carousel
        if (Array.isArray(carousel)) {
          setCarouselImages(carousel);
        } else {
          // Fallback to static images if carousel data fails
          const fallbackImages = [
            "../images/placement/veeva.jpeg",
            "../images/placement/tcs1.jpg",
            "../images/placement/tcs2.jpg",
            "../images/placement/infosys1.jpeg",
            "../images/placement/infosys2.jpeg",
            "../images/placement/wipro.jpeg",
            "../images/placement/cognizant.jpeg",
            "../images/placement/accenture.jpeg",
            "../images/placement/microsoft.jpeg",
            "../images/placement/amazon.jpeg",
            "../images/placement/google.jpeg",
            "../images/placement/ibm.jpeg",
            "../images/placement/oracle.jpeg",
            "../images/placement/zoho.jpeg",
            "../images/placement/hcl.jpeg",
            "../images/placement/techMahindra.jpeg"
          ].map((url, index) => ({
            id: index + 1,
            image_url: url,
            alt_text: `Placement ${index + 1}`
          }));
          setCarouselImages(fallbackImages);
        }

        // Process info
        if (Array.isArray(info) && info.length > 0) {
          setPlacementInfo(info[0]);
        } else if (info?.title) {
          setPlacementInfo(info);
        }

        // Process timetable
        if (Array.isArray(timetable)) {
          setTimetables(timetable);
        } else {
          setTimetables([]);
        }
      } catch (err) {
        console.error('Error fetching placement data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPlacementData();
  }, []);

  const iconMap: { [key: string]: React.ElementType } = {
    TrendingUp,
    Building,
    Users,
    Award,
    Target,
    Briefcase,
    Star,
    CheckCircle,
  };

  // Auto-scroll carousel - Updated to use activeSlide state for smooth transitions
  useEffect(() => {
    if (carouselImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages]);

  const fallbackChartEntries: PlacementChartEntry[] = [
    { year: '2017', civil: 8, mech: 45, eee: 33, ece: 46, ect: 0, cse: 70, cst: 0, aiml: 0, cai: 0, mba: 5 },
    { year: '2018', civil: 22, mech: 58, eee: 41, ece: 86, ect: 0, cse: 187, cst: 0, aiml: 0, cai: 0, mba: 41 },
    { year: '2019', civil: 11, mech: 40, eee: 43, ece: 116, ect: 0, cse: 228, cst: 0, aiml: 0, cai: 0, mba: 16 },
    { year: '2020', civil: 9, mech: 39, eee: 83, ece: 182, ect: 0, cse: 318, cst: 0, aiml: 0, cai: 0, mba: 19 },
    { year: '2021', civil: 47, mech: 121, eee: 199, ece: 360, ect: 0, cse: 599, cst: 72, aiml: 0, cai: 0, mba: 0 },
    { year: '2022', civil: 48, mech: 119, eee: 207, ece: 362, ect: 0, cse: 603, cst: 0, aiml: 0, cai: 0, mba: 104 },
    { year: '2023', civil: 39, mech: 69, eee: 84, ece: 173, ect: 38, cse: 228, cst: 37, aiml: 0, cai: 0, mba: 23 },
    { year: '2024', civil: 34, mech: 92, eee: 72, ece: 61, ect: 31, cse: 165, cst: 29, aiml: 0, cai: 0, mba: 66 },
    { year: '2025', civil: 23, mech: 58, eee: 98, ece: 97, ect: 35, cse: 181, cst: 38, aiml: 56, cai: 41, mba: 66 },
  ];

  const orderedCharts = useMemo(() => {
    // Only use actual data from database, no fallback
    if (placementCharts.length === 0) return [];
    // Sort by year descending (most recent first)
    return [...placementCharts].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, [placementCharts]);

  const yearlyTotalData = orderedCharts.map((entry) => ({
    year: entry.year,
    total: (entry.civil || 0) + (entry.mech || 0) + (entry.eee || 0) + (entry.ece || 0) + (entry.cse || 0) + (entry.mba || 0) + (entry.ect || 0) + (entry.cst || 0) + (entry.aiml || 0) + (entry.cai || 0),
    CSE: entry.cse || 0,
    ECE: entry.ece || 0,
    ME: entry.mech || 0,
    EEE: entry.eee || 0,
    CE: entry.civil || 0,
    MBA: entry.mba || 0,
  }));

  const departmentOrder = [
    { name: 'CE', key: 'civil', color: '#0088FE' },
    { name: 'ME', key: 'mech', color: '#FF6961' },
    { name: 'EEE', key: 'eee', color: '#B22222' },
    { name: 'ECE', key: 'ece', color: '#FF00FF' },
    { name: 'ECT', key: 'ect', color: '#FF4500' },
    { name: 'CSE', key: 'cse', color: '#A9A9A9' },
    { name: 'CST', key: 'cst', color: '#2C2C2C' },
    { name: 'AIML', key: 'aiml', color: '#FFFF00' },
    { name: 'CAI', key: 'cai', color: '#E9967A' },
    { name: 'MBA', key: 'mba', color: '#FFC0CB' },
  ] as const;

  const preferredYear = '2025';
  const [selectedChartYear, setSelectedChartYear] = useState<string | null>(null);
  
  const latestDepartmentEntry = useMemo(() => {
    if (orderedCharts.length === 0) return null;
    // If a year is selected, use that; otherwise use preferred year or latest available
    if (selectedChartYear) {
      return orderedCharts.find((entry) => entry.year === selectedChartYear) || orderedCharts[orderedCharts.length - 1];
    }
    return orderedCharts.find((entry) => entry.year === preferredYear) || orderedCharts[orderedCharts.length - 1];
  }, [orderedCharts, selectedChartYear]);

  const departmentData = latestDepartmentEntry
    ? departmentOrder
        .map(({ name, key, color }) => ({
          name,
          value: (latestDepartmentEntry as any)[key] || 0,
          color,
        }))
        .filter((dept) => dept.value > 0)
    : [];

  const topDepartments = departmentData.slice().sort((a, b) => b.value - a.value).slice(0, 6);

  // Colors for charts
  const chartColors = {
    primary: '#B22222',
    secondary: '#0097A7',
    accent: '#FFC107',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
  };

  // Company logos for the scrolling section
  const fallbackCompanyLogos = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    image_url: `../company_icons/${i + 1}.png`,
    company_name: `Company ${i + 1}`
  }));

  const visibleCompanyLogos = companyLogos.length > 0 ? companyLogos : fallbackCompanyLogos;

  return (
    <div className="pt-44 bg-[#FFF8F0] text-[#222222]">
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-16 h-16 animate-spin text-[#B22222] mx-auto mb-4" />
            <p className="text-xl text-gray-600">Loading placement data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Only show when not loading and no error */}
      {!loading && !error && (
        <>
          {/* Hero Section */}
          <section className="bg-primary text-white py-20 relative overflow-hidden isolate">
            <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#850209]">
                {placementInfo?.title || 'Placements'}
              </h1>

            </div>

            {/* Subtle background shapes */}
            <div className="absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full opacity-70 shadow-sm z-0"></div>
            <div className="absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full opacity-70 shadow-sm z-0"></div>
          </section>

          {/* Placement Images Carousel */}
          <section className="py-4 md:py-6 bg-transparent">
            <div className="container mx-auto px-2 md:px-4">
              <div className="max-w-5xl mx-auto relative px-2 md:px-12 group">
                
                {/* Main Image Container */}
                <div className="relative rounded-none md:rounded-xl overflow-hidden shadow-none md:shadow-2xl bg-transparent border-0">
                  {carouselImages.length > 0 ? (
                    <div className="relative w-full bg-transparent">
                      <img
                        src={carouselImages[activeSlide].image_url}
                        alt={carouselImages[activeSlide].alt_text}
                        className="w-full h-auto object-contain block transition-opacity duration-500 ease-in-out"
                        style={{ maxHeight: '80vh', minHeight: '220px' }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-gray-200">
                      <p className="text-gray-500 text-lg">No carousel images available</p>
                    </div>
                  )}
                </div>

                {/* Indicators */}
                {carouselImages.length > 0 && (
                  <div className="flex justify-center mt-3 md:mt-6 space-x-2 md:space-x-3">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          index === activeSlide ? 'bg-[#B22222] scale-125' : 'bg-gray-300 hover:bg-[#B22222]/50'
                        }`}
                        onClick={() => setActiveSlide(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Placement Info Content Above Team */}
          {placementInfo && (
            <section className="py-8 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">{placementInfo.title}</h2>
                  <p className="text-xl text-gray-700">{placementInfo.description}</p>
                </div>
              </div>
            </section>
          )}

          {/* JTNUK Timetables Section */}
          {timetables.length > 0 && (
            <section className="py-16 bg-[#FFF8F0]">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">JTNUK Exam Timetables</h2>
                  <p className="text-xl text-gray-600">Latest JNTU Kakinada examination timetables</p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {timetables.map((timetable) => (
                      <div key={timetable.sno} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-[#B22222]">
                        <div className="mb-4">
                          <span className="inline-block bg-[#B22222] text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {timetable.degree === 'UG' ? 'Undergraduate' : 'Postgraduate'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#B22222] mb-3">{timetable.content}</h3>
                        <div className="space-y-3 text-gray-700 mb-4">
                          {timetable.date && (
                            <div className="flex items-center">
                              <span className="font-semibold text-sm">Exam Date:</span>
                              <span className="ml-2">{new Date(timetable.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                          )}
                          {timetable.posteddate && (
                            <div className="flex items-center">
                              <span className="font-semibold text-sm">Posted:</span>
                              <span className="ml-2">{new Date(timetable.posteddate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                          )}
                        </div>
                        {timetable.link && (
                          <a
                            href={timetable.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#B22222] text-white px-4 py-2 rounded-lg hover:bg-[#850209] transition-colors font-semibold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Download Timetable
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Placement Officer */}
          {placementOfficer && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Placement Officer</h2>
                  <p className="text-xl text-gray-600">Meet our dedicated placement officer</p>
                </div>

                <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex justify-center lg:justify-start">
                      <div className="relative">
                        <img
                          src={placementOfficer.image_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="320"%3E%3Crect width="320" height="320" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E'}
                          alt={placementOfficer.name}
                          className="w-80 h-80 rounded-2xl object-cover shadow-2xl border-4 border-white"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="320"%3E%3Crect width="320" height="320" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <div className="absolute -bottom-4 -right-4 bg-[#B22222] text-white p-3 rounded-full shadow-lg">
                          <Phone className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center lg:text-left space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-[#B22222] mb-3">{placementOfficer.name}</h3>
                        <p className="text-xl text-gray-800 font-semibold mb-2">{placementOfficer.designation}</p>
                        <p className="text-lg text-gray-600 mb-6">Sri Vasavi Engineering College</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="bg-[#B22222] p-2 rounded-full">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 block">Mobile</span>
                            <span className="text-lg font-semibold text-gray-800">{placementOfficer.phone}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="bg-[#B22222] p-2 rounded-full">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 block">Email</span>
                            <a
                              href={`mailto:${placementOfficer.email}`}
                              className="text-lg font-semibold text-[#B22222] hover:underline"
                            >
                              {placementOfficer.email}
                            </a>
                          </div>
                        </div>

                        {placementOfficer.linkedin && (
                          <div className="flex items-center justify-center lg:justify-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                            <div className="bg-blue-600 p-2 rounded-full">
                              <ExternalLink className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <span className="text-sm text-gray-500 block">LinkedIn Profile</span>
                              <a
                                href={placementOfficer.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-blue-600 hover:underline"
                              >
                                See Profile
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Placement Team */}
          <section className="py-16 bg-[#FFF8F0]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Our Team</h2>
                <p className="text-xl text-gray-600">Meet our dedicated placement team</p>
              </div>
              {team.length > 0 ? team.map((member) => (
                <div key={member.id} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                      <img
                        src={member.image_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="192" height="192"%3E%3Crect width="192" height="192" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E'}
                        alt={member.name}
                        className="w-48 h-48 rounded-lg mx-auto md:mx-0 mb-4 object-cover border-4 border-[#0097A7]"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="192" height="192"%3E%3Crect width="192" height="192" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" fill="%239ca3af"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-[#B22222] mb-2">{member.name}</h3>
                      <p className="text-lg text-gray-700 mb-2">{member.designation}</p>
                      <p className="text-gray-600 mb-4">Sri Vasavi Engineering College</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <Mail className="w-4 h-4 text-[#B22222]" />
                          <a
                            href={`mailto:${member.email}`}
                            className="text-[#B22222] hover:underline"
                          >
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No team members found.</p>
                </div>
              )}
            </div>
          </section>

          {/* Placement Statistics */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Placement Statistics</h2>
                <p className="text-xl text-gray-600">Our track record of successful placements</p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {content.placementStats.map((stat, index) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <div key={index} className="text-center p-8 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all transform hover:scale-105">
                      <Icon className="w-16 h-16 mx-auto mb-4 text-[#B22222]" />
                      <h3 className="text-4xl font-bold mb-2 text-[#B22222]">{stat.value}</h3>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Year-wise Placement Table */}
              {orderedCharts.length > 0 && (
                <div className="mb-12 overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
                    <thead>
                      <tr className="bg-[#3a3a3a] text-white">
                        <th className="px-6 py-4 text-center font-bold border-r border-gray-600">Year</th>
                        <th className="px-6 py-4 text-center font-bold border-r border-gray-600">UG</th>
                        <th className="px-6 py-4 text-center font-bold border-r border-gray-600">PG</th>
                        <th className="px-6 py-4 text-center font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderedCharts.map((entry, index) => {
                        const ugTotal = (entry.civil || 0) + (entry.mech || 0) + (entry.eee || 0) + 
                                       (entry.ece || 0) + (entry.cse || 0) + (entry.ect || 0) + 
                                       (entry.cst || 0) + (entry.aiml || 0) + (entry.cai || 0);
                        const pgTotal = entry.mba || 0;
                        const total = ugTotal + pgTotal;
                        return (
                          <tr key={entry.year} className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            <td className="px-6 py-4 text-center font-semibold text-[#B22222] border-r border-gray-200">
                              {entry.year}
                            </td>
                            <td className="px-6 py-4 text-center text-gray-800 border-r border-gray-200">
                              {ugTotal}
                            </td>
                            <td className="px-6 py-4 text-center text-gray-800 border-r border-gray-200">
                              {pgTotal}
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-[#B22222]">
                              {total}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Interactive Charts - Department-wise Distribution for each year */}
              {orderedCharts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {orderedCharts.map((chartEntry) => {
                    const yearDepartmentData = departmentOrder
                      .map(({ name, key, color }) => ({
                        name,
                        value: (chartEntry as any)[key] || 0,
                        color,
                      }))
                      .filter((dept) => dept.value > 0);
                    
                    return (
                      <div key={chartEntry.year} className="bg-[#FFF8F0] p-6 rounded-xl">
                        <h3 className="text-2xl font-bold text-[#B22222] mb-4 text-center">
                          Department-wise Placements ({chartEntry.year})
                        </h3>
                        {yearDepartmentData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                              <Pie
                                data={yearDepartmentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                              >
                                {yearDepartmentData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: '#fff',
                                  border: '1px solid #B22222',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                                formatter={(value: number, name: string) => [`${value} students`, name]}
                              />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-[350px] text-gray-500">
                            <p>No data for this year</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-gray-500 bg-[#FFF8F0] rounded-xl">
                  <p>No placement chart data available</p>
                </div>
              )}
            </div>
          </section>

          {/* Companies that Visited */}
          <section className="py-16 bg-[#FFF8F0]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Companies that Visited</h2>
                <p className="text-xl text-gray-600">Leading organizations that recruit from our campus</p>
              </div>

              {/* Scrolling Company Logos */}
              <div className="relative overflow-hidden">
                <div className="flex animate-scroll space-x-8">
                  {[...visibleCompanyLogos, ...visibleCompanyLogos].map((logo, index) => (
                    <div key={`${logo.id}-${index}`} className="flex-shrink-0 p-4 bg-transparent">
                      <img
                        src={logo.image_url}
                        alt={logo.company_name || `Company ${index + 1}`}
                        className="h-16 w-auto object-contain hover:scale-110 transition-all duration-300 bg-transparent"
                        onError={(e) => {
                          e.currentTarget.src = '../company_icons/placeholder.png';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Placement PDFs */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Placement Details & Reports</h2>
                <p className="text-xl text-gray-600">Download detailed placement reports and college profile</p>
              
              </div>

              {placementPdfs.length === 0 ? (
                <div className="text-center bg-[#FFF8F0] border border-dashed border-[#B22222]/40 rounded-2xl py-16 px-6">
                  <p className="text-gray-600 text-lg">Reports will appear here once uploaded.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {placementPdfs.map((pdf) => (
                    <div key={pdf.id} className="bg-[#FFF8F0] border border-[#B22222]/10 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-[#B22222]/10 text-[#B22222] p-3 rounded-full">
                            <FileDown className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm uppercase tracking-wide text-gray-500">{pdf.year}</p>
                            <h3 className="text-xl font-semibold text-[#B22222]">{pdf.title || `Placement Report ${pdf.year}`}</h3>
                          </div>
                        </div>
                        {pdf.created_at && (
                          <p className="text-sm text-gray-500">Uploaded on {new Date(pdf.created_at).toLocaleDateString()}</p>
                        )}
                      </div>
                      <a
                        href={pdf.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center justify-center gap-2 bg-[#B22222] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#850209] transition-colors"
                      >
                        <FileDown className="w-4 h-4" />
                        Download PDF
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-primary text-white relative overflow-hidden isolate">
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Career?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join our successful placement program and take the first step towards your dream career
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/admissions"
                  className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#B22222] hover:text-white transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>Apply Now</span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                </a>
                <a
                  href="mailto:placements@srivasaviengg.ac.in"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm hover:border-secondary transition-all transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>Contact Placement Cell</span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-secondary/20 -translate-y-1/4 translate-x-1/4 opacity-70 shadow-sm z-0"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-secondary/15 translate-y-1/4 -translate-x-1/4 opacity-70 shadow-sm z-0"></div>
          </section>
        </>
      )}
    </div>
  );
};

export default Placements;
