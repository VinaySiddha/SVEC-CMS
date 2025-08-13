import React, { useState } from 'react';
import { BookOpen, Users, Award, Clock, Cpu, Cog, Building2, Zap, ChevronRight, Calendar, FileText, BookOpen as Book, Book as BookIcon } from 'lucide-react';
import content from '../content/academics.json';

const Academics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calendars');

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
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive engineering programs designed to meet industry demands and foster innovation
          </p>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#B22222]">UG Academic Calendars</h3>
                    <div className="bg-gray-100 p-1 rounded-md">
                      <Calendar className="w-5 h-5 text-[#B22222]" />
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-[#B22222]/10 p-1 rounded-md">
                        <span className="w-2 h-2 bg-[#B22222] rounded-full block"></span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-[#222222]">B.Tech II Year Academic Calendar</span>
                          <span className="ml-2 text-xs bg-[#B22222]/10 text-[#B22222] px-2 py-0.5 rounded-full">New</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Released: July 26, 2023</div>
                        <a href="https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechIIYear-IIIandIVsemestersAcademicCalendar.pdf" target="_blank" className="text-blue-600 text-sm hover:underline mt-1 inline-block">View PDF</a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-[#B22222]/10 p-1 rounded-md">
                        <span className="w-2 h-2 bg-[#B22222] rounded-full block"></span>
                      </div>
                      <div>
                        <div className="font-medium text-[#222222]">III B.Tech Academic Calendar 2023-2024</div>
                        <div className="text-sm text-gray-500 mt-1">Released: July 15, 2023</div>
                        <a href="https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechVamdVIsemestersAcademicCalendar.pdf" target="_blank" className="text-blue-600 text-sm hover:underline mt-1 inline-block">View PDF</a>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-[#B22222]/10 p-1 rounded-md">
                        <span className="w-2 h-2 bg-[#B22222] rounded-full block"></span>
                      </div>
                      <div>
                        <div className="font-medium text-[#222222]">IV B.Tech Academic Calendar</div>
                        <div className="text-sm text-gray-500 mt-1">Released: June 8, 2023</div>
                        <a href="https://srivasaviengg.ac.in/uploads/ac_calender/ug/2023-24-A-7-8-AcademicCalendar-BTechIVYear.pdf" target="_blank" className="text-blue-600 text-sm hover:underline mt-1 inline-block">View PDF</a>
                      </div>
                    </li>
                  </ul>

                  {/* Original HTML content preserved as comment for reference
                  <!-- 
                  <div class="nav-content">
                     <ul style="margin-top: 20px">
                       <li>
                         2023-07-26:  B.Tech II Year-III and IV semesters Academic Calendar<a class="profile-link"
                           href="https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechIIYear-IIIandIVsemestersAcademicCalendar.pdf"
                           target="_blank"
                           id="pdfDOWNLOADER11"
                           style="margin-left: 5px"
                           >- View</a
                         >
                       </li>
                       <li>
                         2023-07-15:  Academic Year 2023-2024 III B Tech Academic Calendar<a class="profile-link"
                           href="https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechVamdVIsemestersAcademicCalendar.pdf"
                           target="_blank"
                           id="pdfDOWNLOADER11"
                           style="margin-left: 5px"
                           >- View</a
                         >
                       </li>
                       <li>
                         2023-07-14:  uytuytuytuyu<a class="profile-link"
                           href="https://srivasaviengg.ac.in/uploads/modelpaper/ug/org.png"
                           target="_blank"
                           id="pdfDOWNLOADER11"
                           style="margin-left: 5px"
                           >- View</a
                         >
                       </li>
                       <li>
                         2023-06-08:  IV B Tech Academic Calendar<a class="profile-link"
                           href="https://srivasaviengg.ac.in/uploads/ac_calender/ug/2023-24-A-7-8-AcademicCalendar-BTechIVYear.pdf"
                           target="_blank"
                           id="pdfDOWNLOADER11"
                           style="margin-left: 5px"
                           >- View</a
                         >
                       </li>
                     </ul>
                   </div>
                   -->
                  */}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#B22222]">PG Academic Calendars</h3>
                    <div className="bg-gray-100 p-1 rounded-md">
                      <Calendar className="w-5 h-5 text-[#B22222]" />
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-[#B22222]/10 p-1 rounded-md">
                        <span className="w-2 h-2 bg-[#B22222] rounded-full block"></span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-[#222222]">M.Tech 1st Year Academic Calendar</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Released: August 5, 2023</div>
                        <a href="#" className="text-blue-600 text-sm hover:underline mt-1 inline-block">Download PDF</a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 bg-[#B22222]/10 p-1 rounded-md">
                        <span className="w-2 h-2 bg-[#B22222] rounded-full block"></span>
                      </div>
                      <div>
                        <div className="font-medium text-[#222222]">MBA Academic Calendar 2023-2024</div>
                        <div className="text-sm text-gray-500 mt-1">Released: July 28, 2023</div>
                        <a href="#" className="text-blue-600 text-sm hover:underline mt-1 inline-block">Download PDF</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#FFF8F0] p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-[#B22222] mr-2" />
                  <h3 className="text-lg font-bold text-[#B22222]">Key Academic Dates 2023-2024</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-medium text-[#B22222]">Odd Semester</h4>
                    <p className="text-sm text-gray-600 mt-2">July 15, 2023 - November 30, 2023</p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Classes Begin:</span>
                        <span className="font-medium">Jul 15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mid-Term Exams:</span>
                        <span className="font-medium">Sep 10-15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Semester:</span>
                        <span className="font-medium">Nov 20-30</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-medium text-[#B22222]">Even Semester</h4>
                    <p className="text-sm text-gray-600 mt-2">December 15, 2023 - April 30, 2024</p>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Classes Begin:</span>
                        <span className="font-medium">Dec 15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mid-Term Exams:</span>
                        <span className="font-medium">Feb 10-15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Semester:</span>
                        <span className="font-medium">Apr 20-30</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-medium text-[#B22222]">Holidays & Breaks</h4>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Dussehra Break:</span>
                        <span className="font-medium">Oct 12-15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Winter Break:</span>
                        <span className="font-medium">Dec 1-14</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Summer Vacation:</span>
                        <span className="font-medium">May 1-Jul 14</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Syllabus Tab Content */}
          {activeTab === 'syllabus' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">Program Syllabus</h3>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-[#222222] mb-4">UG Syllabus</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <a
                      href="https://srivasaviengg.ac.in/uploads/autonomous_syllabus/ug/V23%20Regulations%20and%20Syllabus.pdf"
                      target="_blank"
                      className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
                    >
                      <FileText className="w-6 h-6 text-[#B22222] mr-3" />
                      <div>
                        <h5 className="font-medium text-[#222222]">B.Tech V23 Syllabus</h5>
                        <p className="text-sm text-gray-600 mt-1">Complete syllabus for all B.Tech programs</p>
                      </div>
                      <span className="ml-auto text-sm text-[#B22222] font-medium">View PDF</span>
                    </a>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-[#222222] mb-4">PG Syllabus</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-center p-6 border border-dashed border-gray-300 rounded-md bg-gray-50">
                      <p className="text-gray-500">PG Syllabus content will be added soon</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center text-gray-600 mb-2">
                    <BookIcon className="w-5 h-5 mr-2 text-[#B22222]" />
                    <h5 className="font-medium">Department-specific syllabi</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-white transition-all bg-white/80">
                      <FileText className="w-5 h-5 text-[#B22222] mr-2" />
                      <span>Computer Science & Engineering</span>
                    </a>
                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-white transition-all bg-white/80">
                      <FileText className="w-5 h-5 text-[#B22222] mr-2" />
                      <span>Electronics & Communication</span>
                    </a>
                    <a href="#" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-white transition-all bg-white/80">
                      <FileText className="w-5 h-5 text-[#B22222] mr-2" />
                      <span>Electrical & Electronics</span>
                    </a>
                  </div>
                </div>

                {/* Preserving original HTML as comment for reference */}
                {/* 
                <div class="tab-pane fade p-3" id="nav-vision" role="tabpanel" aria-labelledby="nav-vision-tab">
                  <h2 style="margin-top: 10px">Syllabus</h2>
                  <div class="nav-content mt-5 mb-5">
                    <details open>
                      <summary>UG Syllabus</summary>
                      <div class="tab4-table" style="display: flex; align-items: center">
                        <div class="nav-content">
                          <ul style="margin-top: 20px">
                            <li>
                              B.Tech V23 Syllabus<a
                                class="profile-link"
                                href="https://srivasaviengg.ac.in/uploads/autonomous_syllabus/ug/V23%20Regulations%20and%20Syllabus.pdf"
                                target="_blank"
                                id="pdfDOWNLOADER11"
                                style="margin-left: 5px"
                                >- View</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                  <div class="nav-content mt-5 mb-5">
                    <details>
                      <summary>PG Syllabus</summary>
                      <div class="tab4-table" style="display: flex; align-items: center">
                      </div>
                    </details>
                  </div>
                </div>
                */}
              </div>
            </div>
          )}

          {/* Regulations Tab Content */}
          {activeTab === 'regulations' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">Academic Regulations</h3>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-[#222222] mb-4">UG Regulations</h4>
                  <div className="space-y-4">
                    <a
                      href="https://srivasaviengg.ac.in/uploads/regulations/ug/V23%20Regulation.pdf"
                      target="_blank"
                      className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
                    >
                      <BookIcon className="w-6 h-6 text-[#B22222] mr-3" />
                      <div>
                        <h4 className="font-medium text-[#222222]">B.Tech V23 Regulations</h4>
                        <p className="text-sm text-gray-600">Latest academic regulations for B.Tech programs</p>
                      </div>
                      <span className="ml-auto text-sm text-[#B22222] font-medium">View PDF</span>
                    </a>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/regulations/ug/V20-Common-Guidelines-Autonomous-Colleges-R20-2020-21_15.04.2021.pdf"
                      target="_blank"
                      className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
                    >
                      <BookIcon className="w-6 h-6 text-[#B22222] mr-3" />
                      <div>
                        <h4 className="font-medium text-[#222222]">B.Tech V20 Regulations</h4>
                        <p className="text-sm text-gray-600">Academic regulations for students admitted from 2020-21</p>
                      </div>
                      <span className="ml-auto text-sm text-[#B22222] font-medium">View PDF</span>
                    </a>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/regulations/ug/B%20Tech%20V18%20Regulations.pdf"
                      target="_blank"
                      className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
                    >
                      <BookIcon className="w-6 h-6 text-[#B22222] mr-3" />
                      <div>
                        <h4 className="font-medium text-[#222222]">B.Tech V18 Regulations</h4>
                        <p className="text-sm text-gray-600">Academic regulations for students admitted from 2018-19</p>
                      </div>
                      <span className="ml-auto text-sm text-[#B22222] font-medium">View PDF</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-[#222222] mb-4">PG Regulations</h4>
                  <div className="space-y-4">
                    <a
                      href="https://srivasaviengg.ac.in/uploads/regulations/pg/M%20Tech%20V21%20Regulations.pdf"
                      target="_blank"
                      className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
                    >
                      <BookIcon className="w-6 h-6 text-[#B22222] mr-3" />
                      <div>
                        <h4 className="font-medium text-[#222222]">M.Tech V21 Regulations</h4>
                        <p className="text-sm text-gray-600">Latest academic regulations for M.Tech programs</p>
                      </div>
                      <span className="ml-auto text-sm text-[#B22222] font-medium">View PDF</span>
                    </a>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/regulations/pg/MBA%20V21%20Regulations.pdf"
                      target="_blank"
                      className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
                    >
                      <BookIcon className="w-6 h-6 text-[#B22222] mr-3" />
                      <div>
                        <h4 className="font-medium text-[#222222]">MBA V21 Regulations</h4>
                        <p className="text-sm text-gray-600">Latest academic regulations for MBA program</p>
                      </div>
                      <span className="ml-auto text-sm text-[#B22222] font-medium">View PDF</span>
                    </a>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/regulations/pg/MBA%20V18%20Regulations.pdf"
                      target="_blank"
                      className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
                    >
                      <BookIcon className="w-6 h-6 text-[#B22222] mr-3" />
                      <div>
                        <h4 className="font-medium text-[#222222]">MBA V18 Regulations</h4>
                        <p className="text-sm text-gray-600">Academic regulations for MBA students admitted from 2018-19</p>
                      </div>
                      <span className="ml-auto text-sm text-[#B22222] font-medium">View PDF</span>
                    </a>
                    <a
                      href="https://srivasaviengg.ac.in/uploads/regulations/pg/M%20Tech%20V18%20Regulations.pdf"
                      target="_blank"
                      className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
                    >
                      <BookIcon className="w-6 h-6 text-[#B22222] mr-3" />
                      <div>
                        <h4 className="font-medium text-[#222222]">M.Tech V18 Regulations</h4>
                        <p className="text-sm text-gray-600">Academic regulations for M.Tech students admitted from 2018-19</p>
                      </div>
                      <span className="ml-auto text-sm text-[#B22222] font-medium">View PDF</span>
                    </a>
                  </div>
                </div>

                {/* Preserving original HTML as comment for reference */}
                {/* 
                <div class="tab-pane fade p-3" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                  <h2 style="margin-top: 10px" class="text-center">Regulations</h2>
                  <div class="nav-content mt-5 mb-5">
                    <details open>
                      <summary>UG Regulations</summary>
                      <div class="tab4-table" style="display: flex; align-items: center">
                        <div class="nav-content">
                          <ul style="margin-top: 20px">
                            <li>
                              B.Tech V23 Regulations<a
                                class="profile-link"
                                href="https://srivasaviengg.ac.in/uploads/regulations/ug/V23%20Regulation.pdf"
                                target="_blank"
                                id="pdfDOWNLOADER11"
                                style="margin-left: 5px"
                                >- View</a>
                            </li>
                            <li>
                              B.Tech V20 Regulations<a
                                class="profile-link"
                                href="https://srivasaviengg.ac.in/uploads/regulations/ug/V20-Common-Guidelines-Autonomous-Colleges-R20-2020-21_15.04.2021.pdf"
                                target="_blank"
                                id="pdfDOWNLOADER11"
                                style="margin-left: 5px"
                                >- View</a>
                            </li>
                            <li>
                              B.Tech V18 Regulations<a
                                class="profile-link"
                                href="https://srivasaviengg.ac.in/uploads/regulations/ug/B%20Tech%20V18%20Regulations.pdf"
                                target="_blank"
                                id="pdfDOWNLOADER11"
                                style="margin-left: 5px"
                                >- View</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                  <div class="nav-content mt-5 mb-5">
                    <details>
                      <summary>PG Regulations</summary>
                      <div class="tab4-table" style="display: flex; align-items: center">
                        <div class="nav-content">
                          <ul style="margin-top: 20px">
                            <li>
                              M.Tech V21 Regulations<a
                                class="profile-link"
                                href="https://srivasaviengg.ac.in/uploads/regulations/pg/M%20Tech%20V21%20Regulations.pdf"
                                target="_blank"
                                id="pdfDOWNLOADER11"
                                style="margin-left: 5px"
                                >- View</a>
                            </li>
                            <li>
                              MBA V21 Regulations<a
                                class="profile-link"
                                href="https://srivasaviengg.ac.in/uploads/regulations/pg/MBA%20V21%20Regulations.pdf"
                                target="_blank"
                                id="pdfDOWNLOADER11"
                                style="margin-left: 5px"
                                >- View</a>
                            </li>
                            <li>
                              MBA V18 Regulations<a
                                class="profile-link"
                                href="https://srivasaviengg.ac.in/uploads/regulations/pg/MBA%20V18%20Regulations.pdf"
                                target="_blank"
                                id="pdfDOWNLOADER11"
                                style="margin-left: 5px"
                                >- View</a>
                            </li>
                            <li>
                              M.Tech V18 Regulations<a
                                class="profile-link"
                                href="https://srivasaviengg.ac.in/uploads/regulations/pg/M%20Tech%20V18%20Regulations.pdf"
                                target="_blank"
                                id="pdfDOWNLOADER11"
                                style="margin-left: 5px"
                                >- View</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
                */}
              </div>
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
                      src="/images/controller-of-examination.jpg"
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

                {/* Examination Rules Section */}
                <div className="mb-8">
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-xl font-semibold text-[#B22222] mb-2">Examination Rules</h4>
                  </div>

                  <ul className="space-y-3 ml-4">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#B22222] mr-3"></div>
                      <span className="text-gray-700">Instructions to Candidates</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/inst_to_can.pdf"
                        target="_blank"
                        className="ml-2 text-[#B22222] hover:underline"
                      >
                        - View
                      </a>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#B22222] mr-3"></div>
                      <span className="text-gray-700">Malpractices and Punishments</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mal_pract.pdf"
                        target="_blank"
                        className="ml-2 text-[#B22222] hover:underline"
                      >
                        - View
                      </a>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#B22222] mr-3"></div>
                      <span className="text-gray-700">Instructions to Invigilators</span>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba_auto_reg.pdf"
                        target="_blank"
                        className="ml-2 text-[#B22222] hover:underline"
                      >
                        - View
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Notifications Section */}
                <div className="mb-8">
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-xl font-semibold text-[#B22222] mb-2">Notifications</h4>
                  </div>

                  <div className="mb-6">
                    <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Fee Notification</h5>
                    <ul className="space-y-4">
                      <li className="flex flex-col">
                        <span className="text-gray-700 font-medium">2024-04-25: Examination Fee Notification for B.Tech II Semester (V23,V20 & V18) Regular & Supplementary, May-2024</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_fee_notification/ug/B.TechIISemester(V23,V20&V18)Regular&Supplementary,May-2024ExaminationFeeNotification.pdf"
                          target="_blank"
                          className="text-[#B22222] hover:underline text-sm mt-1"
                        >
                          View PDF
                        </a>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-gray-700 font-medium">2024-04-25: Exam fee notification for B.Tech I Semester (V20&V18) Supplementary examinations-MAY-2024 reg.</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_fee_notification/ug/B.TechISemester(V20)Supply,(V18)SupplyFeeNotification-MAY-2024.pdf"
                          target="_blank"
                          className="text-[#B22222] hover:underline text-sm mt-1"
                        >
                          View PDF
                        </a>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-gray-700 font-medium">2024-04-25: B.Tech III Semester (V20& V18) Supplementary Fee Notification-May-2024-Reg.</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_fee_notification/ug/B.TechIIISemester(V20&V18)SupplementaryFeeNotification-May-2024.pdf"
                          target="_blank"
                          className="text-[#B22222] hover:underline text-sm mt-1"
                        >
                          View PDF
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Fee Notification</h5>
                    <ul className="space-y-4">
                      <li className="flex flex-col">
                        <span className="text-gray-700 font-medium">M.Tech II Semester (V21) Regular & Supplementary and M.Tech II Semester (V18) Supplementary Examinations-August-2023</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_fee_notification/pg/M.TechIISemester(V21&V18)RegularandSupplementary,August-2023ExaminationFeeNotification.pdf"
                          target="_blank"
                          className="text-[#B22222] hover:underline text-sm mt-1"
                        >
                          View PDF
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Time Tables Section */}
                <div className="mb-8">
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-xl font-semibold text-[#B22222] mb-2">Time Tables</h4>
                  </div>

                  <div className="mb-6">
                    <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Time Table</h5>
                    <ul className="space-y-3">
                      <li>
                        <span className="text-gray-600 font-medium">2024-04-08:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/B%20Tech%20V%20Sem(V18)%20Suppleemntary%20Examinations%20May%202024.pdf"
                          target="_blank"
                          className="ml-2 text-[#B22222] hover:underline"
                        >
                          Time Table for B.Tech V Semester (V18) Supplementary Examinations May 2024
                        </a>
                      </li>
                      <li>
                        <span className="text-gray-600 font-medium">2024-04-08:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/B%20Tech%20V%20Sem(V20)%20Suppleemntary%20Examinations%20May%202024.pdf"
                          target="_blank"
                          className="ml-2 text-[#B22222] hover:underline"
                        >
                          Time Table for B.Tech V Semester (V20) Supplementary Examinations May 2024
                        </a>
                      </li>
                      <li>
                        <span className="text-gray-600 font-medium">2024-04-08:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/B%20Tech%20VI%20Sem(V18)%20Supplemntary%20Examinations%20May%202024.pdf"
                          target="_blank"
                          className="ml-2 text-[#B22222] hover:underline"
                        >
                          Time Table for B.Tech VI Semester (V18) Supplementary Examinations May 2024
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Time Table</h5>
                    <ul className="space-y-3">
                      <li>
                        <span className="text-gray-600 font-medium">2024-03-04:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/pg/MBA_I_Semester(V18)__supply_Exam_Time_Table,%20FEB-2024.pdf"
                          target="_blank"
                          className="ml-2 text-[#B22222] hover:underline"
                        >
                          Time Table for MBA -III Semester (V18) –Supplementary Examinations-FEB-2024
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Results Section */}
                <div className="mb-8">
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-xl font-semibold text-[#B22222] mb-2">Results</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Results</h5>
                      <p className="text-gray-500 italic">No results available at this time.</p>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Results</h5>
                      <p className="text-gray-500 italic">No results available at this time.</p>
                    </div>
                  </div>
                </div>

                {/* Revaluation Results Section */}
                <div>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-xl font-semibold text-[#B22222] mb-2">Revaluation Results</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">UG Revaluation Results</h5>
                      <ul className="space-y-3">
                        <li>
                          <span className="text-gray-600 font-medium">2023-06-09:</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/autonomous_revalution_result/ug/02-Revaluation%20Result-B.Tech%20VIII%20Sem-April-2023.pdf"
                            target="_blank"
                            className="ml-2 text-[#B22222] hover:underline"
                          >
                            B.Tech VIII Sem-April-2023-Revaluation Results
                          </a>
                        </li>
                        <li>
                          <span className="text-gray-600 font-medium">2023-06-09:</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/autonomous_revalution_result/ug/02-Revaluation%20Process%20Sheet-B.Tech%20VI%20Sem-April-2023.pdf"
                            target="_blank"
                            className="ml-2 text-[#B22222] hover:underline"
                          >
                            B.Tech VI Sem-April-2023-Revaluation Results
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">PG Revaluation Results</h5>
                      <ul className="space-y-3">
                        <li>
                          <span className="text-gray-600 font-medium">2023-06-09:</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/autonomous_revalution_result/ug/02-Revaluation%20Result-B.Tech%20VIII%20Sem-April-2023.pdf"
                            target="_blank"
                            className="ml-2 text-[#B22222] hover:underline"
                          >
                            B.Tech VIII Sem-April-2023-Revaluation Results
                          </a>
                        </li>
                        <li>
                          <span className="text-gray-600 font-medium">2023-06-09:</span>
                          <a
                            href="https://srivasaviengg.ac.in/uploads/autonomous_revalution_result/ug/02-Revaluation%20Process%20Sheet-B.Tech%20VI%20Sem-April-2023.pdf"
                            target="_blank"
                            className="ml-2 text-[#B22222] hover:underline"
                          >
                            B.Tech VI Sem-April-2023-Revaluation Results
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* JNTUK Tab Content */}
          {activeTab === 'jntuk' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-[#B22222] mb-6">JNTUK Links</h3>

                <p className="text-gray-700 mb-6">
                  Important links and documents related to Jawaharlal Nehru Technological University Kakinada (JNTUK).
                </p>

                <div className="mb-8">
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-xl font-semibold text-[#B22222] mb-2">University Exam Time Tables</h4>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2023-11-29:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/Timetable for Jntuk, B.Tech 2-1 R16 Supply Dec 2023.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Timetable for II B.TECH - I SEMESTER (R16 REGULATIONS) SUPPLEMENTARY EXAMINATIONS, DECEMBER2023
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2023-11-29:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/Timetable for Jntuk, B.Tech 2-2 R16 Supply Dec-2023.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Timetable for II B.TECH - II SEMESTER (R16 REGULATIONS) SUPPLEMENTARY EXAMINATIONS, DECEMBER2023
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2023-11-29:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/Timetable for Jntuk, B.Tech 3-1 R16 Supple December-2023.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Timetable for III B.TECH - I SEMESTER (R16 REGULATIONS) SUPPLEMENTARY EXAMINATIONS, DECEMBER2023
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2023-11-29:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/Timetable for Jntuk, B.Tech 3-2 R16 Supply December-2023.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Timetable for III B.TECH - II SEMESTER (R16 REGULATIONS) SUPPLEMENTARY EXAMINATIONS, DECEMBER2023
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2023-09-25:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/B.TechVIISem(V18)SupplementaryEndExaminationsTimeTableOCT-2023.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          B.Tech VII Sem (V18) Supplementary End Examinations Time Table OCT-2023
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2023-09-25:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/B.TechVIISem(V20)EndExaminationTimeTableOCT-2023.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          B.Tech VII Sem (V20) Regular End Examination Time Table OCT-2023
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2022-09-02:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/III B.Tech I Sem Special Supple Exams, Sep2022.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Timetable for III B.Tech I Semester (R13, R10, RR, NR, R05, R07) Special Supplementary Examinations, Sep-2022
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2022-09-02:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/III B.Tech II Sem Special Supple Exams, Sep2022.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Timetable for III B.Tech II Semester (R13, R10, RR, NR, R05, R07) Special Supplementary Examinations, Sep-2022
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2022-09-02:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/IV B.Tech I Sem Special Supple Exams, Sep2022.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Timetable for IV B.Tech I Semester (R13, R10, OR, RR, NR, R05, R07) Special Supplementary Examinations, Sep-2022
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2022-09-02:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/IV BTech II Sem Special Supple Exams, Sep2022.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Timetable for IV B.Tech II Semester (R13, R10, OR, RR, NR, R05, R07) Special Supplementary Examinations, Sep-2022
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2019-10-12:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/university_exam_timetable/ug/21_bt_r10.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Time Table for II B.TECH I SEMESTER (R10 REGULATIONS) SUPPLEMENTARY EXAMINATIONS – OCT/NOV, 2019- Reg.
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 mb-8">
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-xl font-semibold text-[#B22222] mb-2">JNTUK Exam Results</h4>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2024-04-08:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/exam_results/ug/I B Tech II Sem January 2024.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Results of I B.Tech II Semester (R16/R19/R20) Supplementary Examinations, Jan-2024, Last Date to apply for Recounting/Revaluation/Challenge Revaluation is: 15-04-2024
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2024-04-08:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/exam_results/ug/I B Tech I Sem January 2024.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          Results of I B.Tech I Semester (R16/R19/R20/R23) Regular / Supplementary Examinations, Jan-2024
                        </a>
                      </div>
                    </li>
                    <li className="flex flex-col">
                      <div className="flex items-start">
                        <span className="text-gray-600 font-medium min-w-[100px]">2024-01-31:</span>
                        <a
                          href="https://srivasaviengg.ac.in/uploads/exam_results/ug/JNTUK Results of IV B.Tech I Semester (R16) Regular, Supplementary Examinations, Jan2024.pdf"
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          JNTUK Results of IV B.Tech I Semester (R16) Regular, Supplementary Examinations, Jan2024
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="text-xl font-semibold text-[#B22222] mb-2">JNTUK Important Links</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="https://jntuk.edu.in" target="_blank" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                      <FileText className="w-6 h-6 text-[#B22222] mr-3" />
                      <span>JNTUK Official Website</span>
                    </a>
                    <a href="https://jntuk.edu.in/academic-calendar/" target="_blank" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                      <Calendar className="w-6 h-6 text-[#B22222] mr-3" />
                      <span>JNTUK Academic Calendar</span>
                    </a>
                    <a href="https://jntuk.edu.in/examination-notifications/" target="_blank" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                      <FileText className="w-6 h-6 text-[#B22222] mr-3" />
                      <span>JNTUK Examination Notifications</span>
                    </a>
                    <a href="https://jntukresults.edu.in/" target="_blank" className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                      <FileText className="w-6 h-6 text-[#B22222] mr-3" />
                      <span>JNTUK Results Portal</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Academic Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#B22222] mb-4">Academic Features</h2>
            <p className="text-lg text-gray-600">Excellence in education through modern pedagogy and industry-aligned curriculum</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              return (
                <div key={index} className="text-center p-5 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all">
                  <Icon className="w-12 h-12 text-[#B22222] mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-[#222222] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#B22222] mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-gray-600">Comprehensive academic programs designed to shape future leaders</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-[#B22222] mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                B.Tech Programs
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Computer Science & Engineering
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Electronics & Communication
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Electrical & Electronics
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Mechanical Engineering
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Civil Engineering
                </li>
              </ul>
              <div className="mt-4 text-sm">
                <p>Duration: <span className="font-medium">4 Years</span></p>
                <p>Degree: <span className="font-medium">Bachelor of Technology</span></p>
              </div>
              <a href="/admissions" className="block mt-4 text-[#B22222] hover:underline text-sm font-medium">
                Learn more about B.Tech programs →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-[#B22222] mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                M.Tech Programs
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Computer Science
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Power Electronics
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Structural Engineering
                </li>
              </ul>
              <div className="mt-4 text-sm">
                <p>Duration: <span className="font-medium">2 Years</span></p>
                <p>Degree: <span className="font-medium">Master of Technology</span></p>
              </div>
              <a href="/admissions" className="block mt-4 text-[#B22222] hover:underline text-sm font-medium">
                Learn more about M.Tech programs →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-[#B22222] mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                MBA Program
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Master of Business Administration
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-[#B22222] rounded-full mr-2"></span>
                  Multiple specializations available
                </li>
              </ul>
              <div className="mt-4 text-sm">
                <p>Duration: <span className="font-medium">2 Years</span></p>
                <p>Degree: <span className="font-medium">Master of Business Administration</span></p>
              </div>
              <a href="/admissions" className="block mt-4 text-[#B22222] hover:underline text-sm font-medium">
                Learn more about MBA program →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#B22222] to-[#0097A7] text-white relative overflow-hidden isolate">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Engineering Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us and be part of the next generation of innovative engineers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admissions"
              className="bg-[#FFC107] text-[#B22222] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
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
