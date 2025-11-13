import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Clock, Cpu, Cog, Building2, Zap, ChevronRight, Calendar, FileText, BookOpen as Book, Book as BookIcon, Loader } from 'lucide-react';
import content from '../content/academics.json';

// Canonical typeOptions array for exam section dropdowns (matches autonomous/page.tsx)
const typeOptions = [
  { value: 'Regular', label: 'Regular Examination' },
  { value: 'Supply', label: 'Supplementary Examination' },
  { value: 'revaluation_results', label: 'Revaluation Results' },
  { value: 'Fee Notification', label: 'Fee Notification' },
  { value: 'Circular', label: 'Circular' },
  { value: 'Timetable', label: 'Timetable' },
  { value: 'Rules', label: 'Examination Rules' }
];

interface AcademicCalendar {
  id: number;
  date: string;
  type: 'UG' | 'PG';
  title: string;
  description: string | null;
  document_url: string;
  created_at: string;
  updated_at: string;
}

interface RsacItem {
  id: number;
  date: string;
  content: string;
  link: string;
  degree: 'UG' | 'PG';
  type: 'syllabus' | 'regulations' | 'academic-calendar';
  posted_date: string;
}

interface AutonomousExamSection {
  id: number;
  type: string;
  degree: 'UG' | 'PG';
  title: string;
  content: string;
  link: string | null;
  posted_date: string;
}

const Academics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calendars');
  const [ugCalendars, setUgCalendars] = useState<(AcademicCalendar | RsacItem)[]>([]);
  const [pgCalendars, setPgCalendars] = useState<(AcademicCalendar | RsacItem)[]>([]);
  const [ugSyllabus, setUgSyllabus] = useState<RsacItem[]>([]);
  const [pgSyllabus, setPgSyllabus] = useState<RsacItem[]>([]);
  const [ugRegulations, setUgRegulations] = useState<RsacItem[]>([]);
  const [pgRegulations, setPgRegulations] = useState<RsacItem[]>([]);
  
  // Autonomous exam section data organized by degree and type
  const [ugAutonomousData, setUgAutonomousData] = useState<{ [key: string]: AutonomousExamSection[] }>({});
  const [pgAutonomousData, setPgAutonomousData] = useState<{ [key: string]: AutonomousExamSection[] }>({});
  
  // JNTUK exam section timetables
  interface JNTUKTimetable {
    sno: number;
    date: string;
    content: string;
    degree: 'UG' | 'PG';
    type: string;
    link: string | null;
    posteddate: string;
  }
  const [ugJNTUKTimetables, setUgJNTUKTimetables] = useState<JNTUKTimetable[]>([]);
  const [pgJNTUKTimetables, setPgJNTUKTimetables] = useState<JNTUKTimetable[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dropdown states for autonomous section
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    regular: false,
    supply: false,
    rules: false,
    notifications: false,
    timeTables: false,
    results: false,
    revaluation: false,
    jntukTimeTables: false,
    jntukResults: false,
    jntukLinks: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Fetch academic data from both sources on component mount
  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [
          calendarResponse,
          rsacCalendarResponse,
          rsacSyllabusResponse,
          rsacRegulationsResponse,
          autonomousResponse,
          jntukTimetablesResponse
        ] = await Promise.all([
          fetch('/api/academics/calendars'),
          fetch('/api/academics/rsac?type=academic-calendar'),
          fetch('/api/academics/rsac?type=syllabus'),
          fetch('/api/academics/rsac?type=regulations'),
          fetch('/api/academics/autonomous'),
          fetch('/api/exam-section/jntuk-exam-section?type=timetable')
        ]);

        async function safeJson(res, fallback) {
          try {
            if (!res.ok) return fallback;
            const text = await res.text();
            // Try to parse as JSON, fallback if not
            return JSON.parse(text);
          } catch (e) {
            console.error('Failed to parse JSON for', res.url, e);
            return fallback;
          }
        }

        const [
          calendarData,
          rsacCalendarData,
          rsacSyllabusData,
          rsacRegulationsData,
          autonomousData,
          jntukTimetablesData
        ] = await Promise.all([
          safeJson(calendarResponse, { ug: [], pg: [] }),
          safeJson(rsacCalendarResponse, { ug: [], pg: [] }),
          safeJson(rsacSyllabusResponse, { ug: [], pg: [] }),
          safeJson(rsacRegulationsResponse, { ug: [], pg: [] }),
          safeJson(autonomousResponse, { data: { UG: {}, PG: {} } }),
          safeJson(jntukTimetablesResponse, [])
        ]);

        // Combine calendars - RSAC items first, then academic_calendars
        const combinedUgCalendars = [...(rsacCalendarData.ug || []), ...(calendarData.ug || [])];
        const combinedPgCalendars = [...(rsacCalendarData.pg || []), ...(calendarData.pg || [])];

        setUgCalendars(combinedUgCalendars);
        setPgCalendars(combinedPgCalendars);

        // Set syllabus data
        setUgSyllabus(rsacSyllabusData.ug || []);
        setPgSyllabus(rsacSyllabusData.pg || []);

        // Set regulations data
        setUgRegulations(rsacRegulationsData.ug || []);
        setPgRegulations(rsacRegulationsData.pg || []);

        // Set autonomous exam section data
        setUgAutonomousData(autonomousData.data?.UG || {});
        setPgAutonomousData(autonomousData.data?.PG || {});

        // Filter JNTUK timetables by degree
        const ugTimetables = jntukTimetablesData.filter((item: JNTUKTimetable) => item.degree === 'UG');
        const pgTimetables = jntukTimetablesData.filter((item: JNTUKTimetable) => item.degree === 'PG');
        setUgJNTUKTimetables(ugTimetables);
        setPgJNTUKTimetables(pgTimetables);
      } catch (err) {
        console.error('Error fetching academic data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicData();
  }, []);

  const iconMap: { [key: string]: React.ElementType } = {
    Cpu,
    Zap,
    Cog,
    Building2,
    BookOpen,
    Users,
    Award,
    Clock,
  };

  return (
    <div className="pt-24 bg-white text-[#222222]">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 relative overflow-hidden isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academics</h1>
          
        </div>

        {/* Subtle background shapes */}
        <div className="absolute right-0 top-0 h-32 w-32 md:h-40 md:w-40 bg-secondary/30 rounded-full opacity-70 shadow-sm z-0"></div>
        <div className="absolute left-0 bottom-0 h-24 w-24 md:h-36 md:w-36 bg-secondary/20 rounded-full opacity-70 shadow-sm z-0"></div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-300">
            <nav className="-mb-px flex flex-wrap" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('calendars')}
                className={`py-3 px-4 sm:px-6 border-b-2 font-medium text-sm ${activeTab === 'calendars'
                  ? 'border-[#B22222] text-[#B22222]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Academic Calendars
                </span>
              </button>
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`py-3 px-4 sm:px-6 border-b-2 font-medium text-sm ${activeTab === 'syllabus'
                  ? 'border-[#B22222] text-[#B22222]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <span className="flex items-center">
                  <BookIcon className="w-4 h-4 mr-2" />
                  Syllabus
                </span>
              </button>
              <button
                onClick={() => setActiveTab('regulations')}
                className={`py-3 px-4 sm:px-6 border-b-2 font-medium text-sm ${activeTab === 'regulations'
                  ? 'border-[#B22222] text-[#B22222]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <span className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Regulations
                </span>
              </button>

              <button
                onClick={() => setActiveTab('autonomous')}
                className={`py-3 px-4 sm:px-6 border-b-2 font-medium text-sm ${activeTab === 'autonomous'
                  ? 'border-[#B22222] text-[#B22222]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <span className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Autonomous Section
                </span>
              </button>
              <button
                onClick={() => setActiveTab('jntuk')}
                className={`py-3 px-4 sm:px-6 border-b-2 font-medium text-sm ${activeTab === 'jntuk'
                  ? 'border-[#B22222] text-[#B22222]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <span className="flex items-center">
                  <Book className="w-4 h-4 mr-2" />
                  JNTUK
                </span>
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Calendar Tab Content */}
          {activeTab === 'calendars' && (
            <div className="max-w-6xl mx-auto">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-[#B22222] mr-2" />
                  <span className="text-gray-600">Loading academic calendars...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                  <p className="text-red-700">Error: {error}</p>
                </div>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* UG Calendars */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222] mb-6">UG Academic Calendars</h3>
                    {ugCalendars.length === 0 ? (
                      <p className="text-gray-500 italic">No UG academic calendars available.</p>
                    ) : (
                      <ul className="space-y-3">
                        {ugCalendars.map((calendar) => {
                          const isRsacItem = 'content' in calendar;
                          const title = isRsacItem ? calendar.content : calendar.title;
                          const url = isRsacItem ? calendar.link : calendar.document_url;
                          
                          return (
                            <li key={calendar.id} className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2 flex-1">
                                <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                <span className="text-gray-700 text-sm">{title}</span>
                              </div>
                              {url && (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                >
                                  View
                                </a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* PG Calendars */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222] mb-6">PG Academic Calendars</h3>
                    {pgCalendars.length === 0 ? (
                      <p className="text-gray-500 italic">No PG academic calendars available.</p>
                    ) : (
                      <ul className="space-y-3">
                        {pgCalendars.map((calendar) => {
                          const isRsacItem = 'content' in calendar;
                          const title = isRsacItem ? calendar.content : calendar.title;
                          const url = isRsacItem ? calendar.link : calendar.document_url;
                          
                          return (
                            <li key={calendar.id} className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2 flex-1">
                                <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                <span className="text-gray-700 text-sm">{title}</span>
                              </div>
                              {url && (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                >
                                  View
                                </a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              
            </div>
          )}

          {/* Syllabus Tab Content */}
          {activeTab === 'syllabus' && (
            <div className="max-w-6xl mx-auto">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-[#B22222] mr-2" />
                  <span className="text-gray-600">Loading syllabus documents...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                  <p className="text-red-700">Error: {error}</p>
                </div>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* UG Syllabus */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222] mb-6">UG Syllabus</h3>
                    {ugSyllabus.length === 0 ? (
                      <p className="text-gray-500 italic">No UG syllabus available.</p>
                    ) : (
                      <ul className="space-y-3">
                        {ugSyllabus.map((item) => (
                          <li key={item.id} className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2 flex-1">
                              <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{item.content}</span>
                            </div>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                              >
                                View
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* PG Syllabus */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222] mb-6">PG Syllabus</h3>
                    {pgSyllabus.length === 0 ? (
                      <p className="text-gray-500 italic">No PG syllabus available.</p>
                    ) : (
                      <ul className="space-y-3">
                        {pgSyllabus.map((item) => (
                          <li key={item.id} className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2 flex-1">
                              <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{item.content}</span>
                            </div>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                              >
                                View
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Regulations Tab Content */}
          {activeTab === 'regulations' && (
            <div className="max-w-6xl mx-auto">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-[#B22222] mr-2" />
                  <span className="text-gray-600">Loading regulations documents...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                  <p className="text-red-700">Error: {error}</p>
                </div>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* UG Regulations */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222] mb-6">UG Regulations</h3>
                    {ugRegulations.length === 0 ? (
                      <p className="text-gray-500 italic">No UG regulations available.</p>
                    ) : (
                      <ul className="space-y-3">
                        {ugRegulations.map((item) => (
                          <li key={item.id} className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2 flex-1">
                              <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{item.content}</span>
                            </div>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                              >
                                View
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* PG Regulations */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#B22222] mb-6">PG Regulations</h3>
                    {pgRegulations.length === 0 ? (
                      <p className="text-gray-500 italic">No PG regulations available.</p>
                    ) : (
                      <ul className="space-y-3">
                        {pgRegulations.map((item) => (
                          <li key={item.id} className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2 flex-1">
                              <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{item.content}</span>
                            </div>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                              >
                                View
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Model Papers Tab Content */}
          {activeTab === 'papers' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">Model Question Papers</h3>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-[#222222] mb-4">B.Tech</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="#" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                      <FileText className="w-6 h-6 text-[#B22222] mr-3" />
                      <span>I Year - I Semester</span>
                    </a>
                    <a href="#" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                      <FileText className="w-6 h-6 text-[#B22222] mr-3" />
                      <span>I Year - II Semester</span>
                    </a>
                    <a href="#" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                      <FileText className="w-6 h-6 text-[#B22222] mr-3" />
                      <span>II Year - I Semester</span>
                    </a>
                    <a href="#" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                      <FileText className="w-6 h-6 text-[#B22222] mr-3" />
                      <span>II Year - II Semester</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Autonomous Section Tab Content */}
          {activeTab === 'autonomous' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">Autonomous Section</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <img
                      className="w-full rounded-lg"
                      src="/coe.jpg"
                      alt="Controller of Examination"
                      style={{ border: '0px solid #3c7593', aspectRatio: '16/9' }}
                    />
                  </div>
                  <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
                    <h4 className="text-xl font-semibold">Ch.V.S.R Gopala Krishna</h4>
                    <p className="text-gray-600 mb-1">Sr.Asst.Professor</p>
                    <p className="text-gray-600 mb-4">Controller of Examinations</p>
                    <a
                      href="https://srivasaviengg.ac.in/faculty_profile/Ch.V%20S%20R%20G%20Krishna6Ch.V.S.R.%20Gopal%20Krishna.pdf"
                      target="_blank"
                      className="text-[#B22222] hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </div>

                {/* Regular Examination Section - Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('regular')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">{typeOptions.find(o => o.value === 'Regular')?.label || 'Regular Examination'}</h4>
                    <span className={`transform transition-transform ${expandedSections.regular ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.regular && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Regular Examinations</h5>
                          {ugAutonomousData['Regular'] && ugAutonomousData['Regular'].length > 0 ? (
                            <ul className="space-y-3">
                              {ugAutonomousData['Regular'].map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.title || item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No regular examination data available for UG.</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Regular Examinations</h5>
                          {pgAutonomousData['Regular'] && pgAutonomousData['Regular'].length > 0 ? (
                            <ul className="space-y-3">
                              {pgAutonomousData['Regular'].map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.title || item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No regular examination data available for PG.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Supplementary Examination Section - Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('supply')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">{typeOptions.find(o => o.value === 'Supply')?.label || 'Supplementary Examination'}</h4>
                    <span className={`transform transition-transform ${expandedSections.supply ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.supply && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Supplementary Examinations</h5>
                          {ugAutonomousData['Supply'] && ugAutonomousData['Supply'].length > 0 ? (
                            <ul className="space-y-3">
                              {ugAutonomousData['Supply'].map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.title || item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No supplementary examination data available for UG.</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Supplementary Examinations</h5>
                          {pgAutonomousData['Supply'] && pgAutonomousData['Supply'].length > 0 ? (
                            <ul className="space-y-3">
                              {pgAutonomousData['Supply'].map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.title || item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No supplementary examination data available for PG.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Examination Rules Section - Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('rules')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">{typeOptions.find(o => o.value === 'Rules')?.label || 'Rules'}</h4>
                    <span className={`transform transition-transform ${expandedSections.rules ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.rules && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Examination Rules</h5>
                          {ugAutonomousData['examination_rules'] && ugAutonomousData['examination_rules'].length > 0 ? (
                            <ul className="space-y-3">
                              {ugAutonomousData['examination_rules'].map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No examination rules available for UG.</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Examination Rules</h5>
                          {pgAutonomousData['examination_rules'] && pgAutonomousData['examination_rules'].length > 0 ? (
                            <ul className="space-y-3">
                              {pgAutonomousData['examination_rules'].map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No examination rules available for PG.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications Section - Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('notifications')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">{typeOptions.find(o => o.value === 'Notification')?.label || 'Notifications'}</h4>
                    <span className={`transform transition-transform ${expandedSections.notifications ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {expandedSections.notifications && (
                    <div className="p-4 bg-white">
                      <div className="mb-6">
                        <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Fee Notification</h5>
                        {ugAutonomousData['Fee Notification'] && ugAutonomousData['Fee Notification'].length > 0 ? (
                          <ul className="space-y-4">
                            {ugAutonomousData['Fee Notification'].map((item) => (
                              <li key={item.id} className="flex flex-col">
                                <span className="text-gray-700 font-medium">{item.title || item.content}</span>
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    className="text-[#B22222] hover:underline text-sm mt-1"
                                  >
                                    View PDF
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No fee notifications available for UG.</p>
                        )}
                      </div>

                      <div>
                        <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Fee Notification</h5>
                        {pgAutonomousData['Fee Notification'] && pgAutonomousData['Fee Notification'].length > 0 ? (
                          <ul className="space-y-4">
                            {pgAutonomousData['Fee Notification'].map((item) => (
                              <li key={item.id} className="flex flex-col">
                                <span className="text-gray-700 font-medium">{item.title || item.content}</span>
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    className="text-[#B22222] hover:underline text-sm mt-1"
                                  >
                                    View PDF
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No fee notifications available for PG.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Time Tables Section - Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('timeTables')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">{typeOptions.find(o => o.value === 'Timetable')?.label || 'Time Tables'}</h4>
                    <span className={`transform transition-transform ${expandedSections.timeTables ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {expandedSections.timeTables && (
                    <div className="p-4 bg-white">
                      <div className="mb-6">
                        <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Time Table</h5>
                        {ugAutonomousData['Timetable'] && ugAutonomousData['Timetable'].length > 0 ? (
                          <ul className="space-y-3">
                            {ugAutonomousData['Timetable'].map((item) => (
                              <li key={item.id} className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2 flex-1">
                                  <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                  <span className="text-gray-700 text-sm">{item.title || item.content}</span>
                                </div>
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                  >
                                    View
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No time table data available for UG.</p>
                        )}
                      </div>

                      <div>
                        <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Time Table</h5>
                        {pgAutonomousData['Timetable'] && pgAutonomousData['Timetable'].length > 0 ? (
                          <ul className="space-y-3">
                            {pgAutonomousData['Timetable'].map((item) => (
                              <li key={item.id} className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-2 flex-1">
                                  <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                  <span className="text-gray-700 text-sm">{item.title || item.content}</span>
                                </div>
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                  >
                                    View
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No time table data available for PG.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Revaluation Results Section - Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('revaluation')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">{typeOptions.find(o => o.value === 'revaluation_results')?.label || 'Revaluation Results'}</h4>
                    <span className={`transform transition-transform ${expandedSections.revaluation ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {expandedSections.revaluation && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Revaluation Results</h5>
                          {ugAutonomousData['revaluation_results'] && ugAutonomousData['revaluation_results'].length > 0 ? (
                            <ul className="space-y-3">
                              {ugAutonomousData['revaluation_results'].map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No revaluation results available for UG.</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Revaluation Results</h5>
                          {pgAutonomousData['revaluation_results'] && pgAutonomousData['revaluation_results'].length > 0 ? (
                            <ul className="space-y-3">
                              {pgAutonomousData['revaluation_results'].map((item) => (
                                <li key={item.id} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No revaluation results available for PG.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* JNTUK Tab Content */}
          {activeTab === 'jntuk' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">JNTUK Section</h3>

                {/* Timetables Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('jntukTimeTables')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">Timetables</h4>
                    <span className={`transform transition-transform ${expandedSections.jntukTimeTables ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.jntukTimeTables && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Timetables</h5>
                          {ugJNTUKTimetables.length > 0 ? (
                            <ul className="space-y-3">
                              {ugJNTUKTimetables.map((item) => (
                                <li key={item.sno} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No UG timetables available.</p>
                          )}
                        </div>
                        <div>
                          <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Timetables</h5>
                          {pgJNTUKTimetables.length > 0 ? (
                            <ul className="space-y-3">
                              {pgJNTUKTimetables.map((item) => (
                                <li key={item.sno} className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-2 flex-1">
                                    <div className="w-2 h-2 rounded-full bg-[#B22222] mt-1.5 flex-shrink-0"></div>
                                    <span className="text-gray-700 text-sm">{item.content}</span>
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-[#B22222] hover:underline text-sm font-medium whitespace-nowrap flex-shrink-0"
                                    >
                                      View
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">No PG timetables available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Results Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('jntukResults')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">Results</h4>
                    <span className={`transform transition-transform ${expandedSections.jntukResults ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.jntukResults && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-500 italic">No results available.</p>
                    </div>
                  )}
                </div>

                {/* Revaluation Results Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('jntukRevaluation')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">Revaluation Results</h4>
                    <span className={`transform transition-transform ${expandedSections.jntukRevaluation ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.jntukRevaluation && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-500 italic">No revaluation results available.</p>
                    </div>
                  )}
                </div>

                {/* Fee Notifications Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('jntukFeeNotifications')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">Fee Notifications</h4>
                    <span className={`transform transition-transform ${expandedSections.jntukFeeNotifications ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.jntukFeeNotifications && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-500 italic">No fee notifications available.</p>
                    </div>
                  )}
                </div>

                {/* Downloads Dropdown */}
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('jntukDownloads')}
                    className="w-full bg-[#B22222] text-white px-4 py-3 flex items-center justify-between hover:bg-[#9a1a1a] transition-colors"
                  >
                    <h4 className="text-lg font-semibold">Downloads</h4>
                    <span className={`transform transition-transform ${expandedSections.jntukDownloads ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.jntukDownloads && (
                    <div className="p-4 bg-white">
                      <p className="text-gray-500 italic">No downloads available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-white rounded-none w-full overflow-hidden relative isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Engineering Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us and be part of the next generation of innovative engineers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admissions"
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#B22222] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm hover:border-secondary transition-all transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Get Information</span>
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
            </a>
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-secondary/20 -translate-y-1/4 translate-x-1/4 opacity-70 shadow-sm z-0"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-secondary/15 translate-y-1/4 -translate-x-1/4 opacity-70 shadow-sm z-0"></div>
      </section>
    </div>
  );
};

export default Academics;
