import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Building, Users, Award, Target, Briefcase, Star, CheckCircle, ChevronRight, Phone, Mail, ExternalLink, Loader } from 'lucide-react';
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

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  bio?: string;
  photo_url?: string;
}

const Placements: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // State for API data
  const [statistics, setStatistics] = useState<PlacementStatistics[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchPlacementData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/placements');
        
        if (!response.ok) {
          throw new Error('Failed to fetch placement data');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setStatistics(result.data.statistics || []);
          setCompanies(result.data.companies || []);
          setTeam(result.data.team || []);
        } else {
          setError(result.error || 'Failed to load data');
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

  // Placement images from carousel
  const placementImages = [
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
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const interval = setInterval(() => {
      const activeSlide = carousel.querySelector('.carousel-item.active');
      const nextSlide = activeSlide?.nextElementSibling || carousel.querySelector('.carousel-item:first-child');
      
      if (activeSlide && nextSlide) {
        activeSlide.classList.remove('active');
        nextSlide.classList.add('active');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Placement data for charts (from HTML)
  const placementData = {
    years: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    departments: ["CE", "ME", "EEE", "ECE", "ECT", "CSE", "CST", "AIM", "CAI", "MBA"],
    data: [
      [8, 45, 33, 46, 0, 70, 0, 0, 0, 5], // Year 2017
      [22, 58, 41, 86, 0, 187, 0, 0, 0, 41], // Year 2018
      [11, 40, 43, 116, 0, 228, 0, 0, 0, 16], // Year 2019
      [9, 39, 83, 182, 0, 318, 0, 0, 0, 19], // Year 2020
      [47, 121, 199, 360, 0, 599, 72, 0, 0, 0], // Year 2021
      [48, 119, 207, 362, 0, 603, 0, 0, 0, 104], // Year 2022
      [39, 69, 84, 173, 38, 228, 37, 0, 0, 23], // Year 2023
      [34, 92, 72, 61, 31, 165, 29, 0, 0, 66], // Year 2024
      [23, 58, 98, 97, 35, 181, 38, 56, 41, 66], // Year 2025
    ]
  };

  // Prepare data for charts
  const yearlyTotalData = placementData.years.map((year, index) => ({
    year,
    total: placementData.data[index].reduce((sum, value) => sum + value, 0),
    CSE: placementData.data[index][5] || 0,
    ECE: placementData.data[index][3] || 0,
    ME: placementData.data[index][1] || 0,
    EEE: placementData.data[index][2] || 0,
    CE: placementData.data[index][0] || 0,
    MBA: placementData.data[index][9] || 0,
  }));

  // Department-wise data for pie chart (latest year)
  const latestYearIndex = placementData.years.length - 1;
  const departmentData = placementData.departments.map((dept, index) => ({
    name: dept,
    value: placementData.data[latestYearIndex][index],
    color: [
      '#0088FE', // CE - Blue
      '#FF6961', // ME - Light Coral
      '#B22222', // EEE - Firebrick
      '#FF00FF', // ECE - Magenta
      '#FF4500', // ECT - Orange Red
      '#A9A9A9', // CSE - Dark Gray
      '#2C2C2C', // CST - Dark Charcoal
      '#FFFF00', // AIM - Yellow
      '#E9967A', // CAI - Dark Salmon
      '#FFC0CB', // MBA - Pink
    ][index]
  })).filter(dept => dept.value > 0);

  // Top performing departments
  const topDepartments = [...departmentData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Colors for charts
  const chartColors = {
    primary: '#B22222',
    secondary: '#0097A7',
    accent: '#FFC107',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
  };

  // Placement team members
  const placementTeam = [
    {
      name: "Dr. P N V GOPALA KRISHNA",
      designation: "Associate Professor (Mechanical) & Head - Placements",
      phone: "9849511367",
      office: "08818-284355 (Ext:319)",
      email: "gopalakrishna.pnv@srivasaviengg.ac.in",
      image: "../images/placement/placement-head.jpeg",
      department: "Mechanical Engineering"
    }
  ];

  // Company logos for the scrolling section
  const companyLogos = Array.from({ length: 30 }, (_, i) => `../company_icons/${i + 1}.png`);


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
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#850209]">Placements</h1>
              <p className="text-xl max-w-3xl mx-auto text-[darkred]">
                At our college, we don't just prepare students for careers; we ignite their passions and propel them towards success. 
                Our placement program is more than a bridge to the professional world; it's a launchpad for dreams and aspirations.
              </p>
            </div>

            {/* Subtle background shapes */}
            <div className="absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full opacity-70 shadow-sm z-0"></div>
            <div className="absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full opacity-70 shadow-sm z-0"></div>
          </section>

      {/* Placement Images Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div ref={carouselRef} className="relative">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-96">
                  {placementImages.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-item absolute inset-0 transition-opacity duration-500 ${
                        index === 0 ? 'active opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Placement ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carousel indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {placementImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === 0 ? 'bg-[#B22222]' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      const carousel = carouselRef.current;
                      if (carousel) {
                        const activeSlide = carousel.querySelector('.carousel-item.active');
                        const targetSlide = carousel.querySelectorAll('.carousel-item')[index];
                        if (activeSlide && targetSlide) {
                          activeSlide.classList.remove('active', 'opacity-100');
                          activeSlide.classList.add('opacity-0');
                          targetSlide.classList.remove('opacity-0');
                          targetSlide.classList.add('active', 'opacity-100');
                        }
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-lg mx-auto md:mx-0 mb-4 object-cover border-4 border-[#0097A7]"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-[#B22222] mb-2">{member.name}</h3>
                  <p className="text-lg text-gray-700 mb-2">{member.designation}</p>
                  <p className="text-gray-600 mb-4">Sri Vasavi Engineering College</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone className="w-4 h-4 text-[#B22222]" />
                      <span className="text-gray-700">Mobile: {member.phone}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone className="w-4 h-4 text-[#B22222]" />
                      <span className="text-gray-700">Office: {member.office}</span>
                    </div>
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

          {/* Interactive Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Year-wise Placement Trend */}
            <div className="bg-[#FFF8F0] p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">
                Placement Trends (2017-2025)
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={yearlyTotalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#666"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#666"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #B22222',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke={chartColors.primary}
                    strokeWidth={3}
                    dot={{ fill: chartColors.primary, strokeWidth: 2, r: 6 }}
                    name="Total Placements"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Department-wise Distribution (Pie Chart) */}
            <div className="bg-[#FFF8F0] p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">
                Department-wise Placements (2025)
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
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
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department-wise Bar Chart */}
          <div className="bg-[#FFF8F0] p-6 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">
              Department-wise Placement Comparison (Last 5 Years)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={yearlyTotalData.slice(-5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #B22222',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="CSE" fill="#A9A9A9" name="Computer Science" />
                <Bar dataKey="ECE" fill="#FF00FF" name="Electronics & Communication" />
                <Bar dataKey="ME" fill="#FF6961" name="Mechanical" />
                <Bar dataKey="EEE" fill="#B22222" name="Electrical & Electronics" />
                <Bar dataKey="CE" fill="#0088FE" name="Civil" />
                <Bar dataKey="MBA" fill="#FFC0CB" name="MBA" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performing Departments */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">
              Top Performing Departments (2025)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topDepartments.map((dept, index) => (
                <div key={dept.name} className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    ></div>
                    <span className="font-semibold text-gray-800">{dept.name}</span>
                  </div>
                  <span className="text-lg font-bold text-[#B22222]">{dept.value}</span>
                </div>
              ))}
            </div>
          </div>
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
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    src={logo}
                    alt={`Company ${index + 1}`}
                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Our Top Recruiters</h2>
            <p className="text-xl text-gray-600">Leading companies that trust our talent</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.topRecruiters.map((company, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{company.logo}</div>
                  <h3 className="text-xl font-bold text-[#B22222]">{company.name}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Range:</span>
                    <span className="font-semibold text-[#B22222]">{company.packages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students Hired:</span>
                    <span className="font-semibold text-[#B22222]">{company.hired}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Placement Process</h2>
            <p className="text-xl text-gray-600">Our systematic approach to ensure successful placements</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {content.placementProcess.map((process, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#0097A7] text-white rounded-full flex items-center justify-center text-xl font-bold mr-6">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#FFF8F0] p-6 rounded-xl">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-[#B22222]">{process.title}</h3>
                        <span className="bg-[#FFC107] text-[#B22222] px-3 py-1 rounded-full text-sm font-medium">
                          {process.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{process.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our successfully placed students</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="text-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#0097A7]"
                  />
                  <h3 className="text-xl font-bold text-[#B22222]">{testimonial.name}</h3>
                  <p className="text-[#B22222] font-medium">{testimonial.company}</p>
                  <div className="flex justify-center items-center gap-4 mt-2 text-sm">
                    <span className="bg-[#FFC107] text-[#B22222] px-2 py-1 rounded-full">
                      {testimonial.package}
                    </span>
                    <span className="text-gray-600">{testimonial.branch}</span>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic text-center leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center mt-4 text-sm text-gray-500">
                  - Batch of {testimonial.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive support for your career journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-[#FFF8F0] hover:shadow-lg transition-all">
                  <Icon className="w-16 h-16 text-[#B22222] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#B22222] mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Department-wise Placements */}
      <section className="py-16 bg-[#FFF8F0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Department-wise Placements</h2>
            <p className="text-xl text-gray-600">Placement statistics across all departments</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Computer Science & Engineering</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹6.5 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹25 LPA</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Electronics & Communications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹5.8 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹18 LPA</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Mechanical Engineering</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹5.2 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹15 LPA</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Electrical & Electronics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">90%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹5.5 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹16 LPA</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">Civil Engineering</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹4.8 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹12 LPA</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-[#B22222] mb-4">MBA</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Placement Rate:</span>
                    <span className="font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Package:</span>
                    <span className="font-bold text-[#B22222]">₹5.0 LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Package:</span>
                    <span className="font-bold text-[#B22222]">₹14 LPA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Details & Reports */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B22222] mb-4">Placement Details & Reports</h2>
            <p className="text-xl text-gray-600">Download detailed placement reports and college profile</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {/* College Profile */}
            <details className="bg-[#FFF8F0] rounded-lg p-6">
              <summary className="text-xl font-bold text-[#B22222] cursor-pointer hover:text-[#850209] transition-colors">
                College Profile
              </summary>
              <div className="mt-4 pl-4">
                <a
                  href="https://srivasaviengg.ac.in/uploads/placement_College_Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#B22222] hover:text-[#850209] font-semibold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View College Profile
                </a>
              </div>
            </details>

            {/* Placement Details by Year */}
            {[
              { year: "2024-25", file: "2025 BATCH PLACEMENTS DATA.pdf" },
              { year: "2023-24", file: "2024 BATCH PLACEMENTS DATA.pdf" },
              { year: "2022-23", file: "place_2022-23.pdf" },
              { year: "2021-22", file: "place_2021-22.pdf" },
              { year: "2020-21", file: "place_2020-21.pdf" },
              { year: "2019-20", file: "place_2019-20.pdf" },
              { year: "2018-19", file: "place_2018-19.pdf" },
              { year: "2017-18", file: "place_2017-18.pdf" },
              { year: "2016-17", file: "place_2016-17.pdf" },
              { year: "2015-16", file: "place_2015-16.pdf" }
            ].map((item, index) => (
              <details key={index} className="bg-[#FFF8F0] rounded-lg p-6">
                <summary className="text-xl font-bold text-[#B22222] cursor-pointer hover:text-[#850209] transition-colors">
                  Placement Details of {item.year}
                </summary>
                <div className="mt-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700">View or download the placement report:</span>
                      <a
                        href={`https://srivasaviengg.ac.in/uploads/${item.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#B22222] text-white px-4 py-2 rounded-lg hover:bg-[#850209] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Download PDF
                      </a>
                    </div>
                    <div className="border rounded-lg overflow-hidden" style={{ height: '500px' }}>
                      <object
                        data={`https://srivasaviengg.ac.in/uploads/${item.file}`}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                      >
                        <p className="p-4 text-center text-gray-600">
                          Unable to display PDF file. 
                          <a
                            href={`https://srivasaviengg.ac.in/uploads/${item.file}`}
                            className="text-[#B22222] hover:underline ml-1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a> instead.
                        </p>
                      </object>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
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
