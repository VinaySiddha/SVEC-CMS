
import React, { useEffect, useState } from 'react';
import { Radio, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon, Settings } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';

interface BoardOfStudiesMember {
  name: string;
  designation: string;
  organization: string;
  position: string;
}

interface Faculty {
  name: string;
  qualification: string;
  designation: string;
  profile_url: string;
}

interface NonTeachingFaculty {
  name: string;
  designation: string;
}

interface BoardOfStudiesMember {
  member_name: string;
  designation: string;
  organization: string;
  role: string;
}

interface BosMinutes {
  meeting_title: string;
  meeting_number: string;
  meeting_date: string;
  document_url: string;
  academic_year: string;
}

interface Syllabus {
  program: string;
  title: string;
  academic_year: string;
  url: string;
  year: string;
}
interface PhysicalFacility {
  type: string; 
  title: string;
  url: string;
  year: string;
  titles: string;
  volumes: string;
  phone: string;
  email: string;
}
interface Clubs{
  club: string; 
  event: string;
  description: string;
  url: string;
}
interface Mous{
  organisation: string; 
  date: string;
  status: string;
  purpose: string;
  document_url:string;
  type:string;
}
interface Fdp{
  type: string; 
  year: string;
  title: string;
  url: string;
}
interface FacultyAchievement{
  type: string;
  year: string;
  title: string;
  url: string;
  details: string;
}
interface Workshop_gl{
  type: string;
  year: string;
  title: string;
  url: string;
}
interface Placement{
  year: string;
  url: string;
}
interface ScholarshipTopper{
  type: string;
  year: string;
  title: string;
  url: string;
  based_on: string;
  students: string;
  amount: string;
}
interface TechnicalAssociationActivity{
  type: string;
  year: string;
  title: string;
  url: string;
}
interface Newsletter{
  title: string;
  url: string;
}
interface ExtraCurricularActivity{
  type: string;
  label: string;
  year: string;
  url: string;
}
interface FacultyInnovation{
  category: string;
  title: string;
  description: string;
  items: string[];
  links: {label: string; url: string}[];
}
interface Handbook{
  year: string;
  title: string;
  url: string;
}

const ECEDepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);


  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [facultyLoading, setFacultyLoading] = useState(false);
  const [nonTeachingFaculty, setNonTeachingFaculty] = useState<NonTeachingFaculty[]>([]);
  const [nonTeachingLoading, setNonTeachingLoading] = useState(false);
  const [boardOfStudies, setBoardOfStudies] = useState<BoardOfStudiesMember[]>([]);
  const [boardOfStudiesLoading, setBoardOfStudiesLoading] = useState(false);
  const [bosminutes, setBosMinutes] = useState<BosMinutes[]>([]);
  const [BosMinutesLoading, setBosMinutesLoading] = useState(false);
  const [syllabus, setSyllabus] = useState<Syllabus[]>([]);
  const [SyllabusLoading, setSyllabusLoading] = useState(false);
  const [physicalfacilities, setPhysicalFacilities] = useState<PhysicalFacility[]>([]);
  const [PhysicalFacilitiesLoading, setPhysicalFacilitiesLoading] = useState(false);
  const [clubs, setClubs] = useState<Clubs[]>([]);
  const [ClubsLoading, setClubsLoading] = useState(false);
  const [mous, setMous] = useState<Mous[]>([]);
  const [MousLoading, setMousLoading] = useState(false);
  const [fdp, setFdp] = useState<Fdp[]>([]);
  const [FdpLoading, setFdpLoading] = useState(false);
  const [journalPublications, setJournalPublications] = useState<FacultyAchievement[]>([]);
  const [conferencePublications, setConferencePublications] = useState<FacultyAchievement[]>([]);
  const [bookPublications, setBookPublications] = useState<FacultyAchievement[]>([]);
  const [certifications, setCertifications] = useState<FacultyAchievement[]>([]);
  const [patents, setPatents] = useState<FacultyAchievement[]>([]);
  const [awards, setAwards] = useState<FacultyAchievement[]>([]);
  const [memberships, setMemberships] = useState<FacultyAchievement[]>([]);
  const [facultyOutreach, setFacultyOutreach] = useState<FacultyAchievement[]>([]);
  const [facultyPromotionsIncentives, setFacultyPromotionsIncentives] = useState<FacultyAchievement[]>([]);
  const [galleryItems, setGalleryItems] = useState<FacultyAchievement[]>([]);
  const [FacultyAchievementsLoading, setFacultyAchievementsLoading] = useState(false);
  const [workshop_gl, setWorkshop_gl] = useState<Workshop_gl[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [scholarshipToppers, setScholarshipToppers] = useState<ScholarshipTopper[]>([]);
  const [ScholarshipToppersLoading, setScholarshipToppersLoading] = useState(false);
  const [technicalAssociationActivities, setTechnicalAssociationActivities] = useState<TechnicalAssociationActivity[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [newslettersLoading, setNewslettersLoading] = useState(false);
  const [extraCurricularActivities, setExtraCurricularActivities] = useState<ExtraCurricularActivity[]>([]);
  const [facultyInnovations, setFacultyInnovations] = useState<FacultyInnovation[]>([]);
  const [handbooks, setHandbooks] = useState<Handbook[]>([]);
  const [handbooksLoading, setHandbooksLoading] = useState(false);

  const renderFacultyAchievements = () => {
    if (FacultyAchievementsLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        {/* Journal Publications */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Journal Publications</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {journalPublications.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Conference Publications */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Conference Publications</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {conferencePublications.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Book Publications */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Book Publications</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {bookPublications.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Certifications</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {certifications.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Patents */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Patents</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {patents.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Awards */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Awards</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {awards.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Memberships */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Memberships</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {memberships.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Faculty Out-Reach */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Faculty Out-Reach</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {facultyOutreach.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Faculty Promotions/Incentives */}
        <div className="mb-6">
          <details>
            <summary className="text-xl font-semibold cursor-pointer">Faculty Promotions/Incentives</summary>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {facultyPromotionsIncentives.map((item, index) => (
                <li key={index}>
                  {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">For more Details</a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Gallery */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryItems.map((item, index) => (
              <img key={index} src={item.url} alt={item.title} className="rounded-lg shadow-md w-full h-auto object-cover" />
            ))}
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
      //1
      fetch('/api/ece/faculty-data')
        .then(res => res.json())
        .then(data => setFaculty(data))
      fetch('/api/ece/nonteaching-faculty')
        .then(res => res.json())
        .then(data => setNonTeachingFaculty(data))
    
      //2
      fetch('/api/ece/board-of-studies')
        .then(res => res.json())
        .then(data => setBoardOfStudies(data))
      fetch('/api/ece/bos-meeting-minutes')
        .then(res => res.json())
        .then(data => setBosMinutes(data))
    
      //3
      fetch('/api/ece/syllabus')
        .then(res => res.json())
        .then(data => setSyllabus(data))
    
      //4
      fetch('/api/ece/physical_facilities')
        .then(res => res.json())
        .then(data => setPhysicalFacilities(data))
    
      //5
      fetch('/api/ece/clubs')
        .then(res => res.json())
        .then(data => {
          setClubs(data);
        })
      //6
      fetch('/api/ece/mous')
        .then(res => res.json())
        .then(data => {
          setMous(data);
        })
      //7
      fetch('/api/ece/fdp')
        .then(res => res.json())
        .then(data => {
          setFdp(data);
        })
    
      //8
      fetch('/api/ece/faculty-achievements')
        .then(res => res.json())
        .then(data => {
          const journal = data.filter((item: FacultyAchievement) => item.type === 'journal_publication');
          const conference = data.filter((item: FacultyAchievement) => item.type === 'conference_publication');
          const book = data.filter((item: FacultyAchievement) => item.type === 'book_publication');
          const certification = data.filter((item: FacultyAchievement) => item.type === 'certification');
          const patent = data.filter((item: FacultyAchievement) => item.type === 'patent');
          const award = data.filter((item: FacultyAchievement) => item.type === 'award');
          const membership = data.filter((item: FacultyAchievement) => item.type === 'membership');
          const outreach = data.filter((item: FacultyAchievement) => item.type === 'outreach');
          const promotion = data.filter((item: FacultyAchievement) => item.type === 'promotion_incentive');
          const gallery = data.filter((item: FacultyAchievement) => item.type === 'gallery');

          setJournalPublications(journal);
          setConferencePublications(conference);
          setBookPublications(book);
          setCertifications(certification);
          setPatents(patent);
          setAwards(award);
          setMemberships(membership);
          setFacultyOutreach(outreach);
          setFacultyPromotionsIncentives(promotion);
          setGalleryItems(gallery);
        })
    
      //9
      fetch('/api/ece/workshops-gl')
        .then(res => res.json())
        .then(data => {
          setWorkshop_gl(data);
        })
    
      //10
      fetch('/api/ece/placements')
        .then(res => res.json())
        .then(data => setPlacements(data));
    
      //11
      fetch('/api/ece/scholarships-toppers')
        .then(res => res.json())
        .then(data => setScholarshipToppers(data))
      //12
      fetch('/api/ece/technicalassociation-activities')
        .then(res => res.json())
        .then(data => setTechnicalAssociationActivities(data));
    
      //13
      fetch('/api/ece/newsletters')
        .then(res => res.json())
        .then(data => setNewsletters(data))
    
      //14
      fetch('/api/ece/extracurricularactivities')
        .then(res => res.json())
        .then(data => setExtraCurricularActivities(data))
    
      //15
      fetch('/api/ece/facultyinnovations')
        .then(res => res.json())
        .then(data => setFacultyInnovations(data))
    
      //16
      fetch('/api/ece/handbooks')
        .then(res => res.json())
        .then(data => setHandbooks(data))
    
    
  }, [activeContent]);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Clubs', label: 'Clubs', icon: <Activity className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops/SOC/Guest Lecturers', label: 'Workshops/SOC/Guest Lecturers', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Merit Scholarship/Academic Toppers', label: 'Merit Scholarship/Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Settings className="w-4 h-4" /> },
    { id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <FileText className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Faculty Innovations in Teaching & Learning', label: 'Faculty Innovations in Teaching & Learning', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div>
            {/* Head of Department's Message */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Head of Department's Message</h2>
              <div className="flex flex-wrap gap-8">
              <div className="flex-shrink-0 w-full sm:w-64 md:w-72 lg:w-80 rounded-lg overflow-hidden">
                  <img
                    src="/ecehod.jpg"
                    alt="Dr. E. Kusuma Kumari"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex-1 min-w-[280px] space-y-4">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. E. Kusuma Kumari</h3>
                    <p className="text-lg text-[#8B0000] font-medium mb-2">Professor & Head of Department, ECE</p>
                    <p className="text-gray-600">Ph.D, M.Tech</p>
                    <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-377)</p>
                    <p className="text-gray-600">Fax No: 08818-284322</p>
                    <p className="text-gray-600">Email: <a href="mailto:hod_ece@srivasaviengg.ac.in" className="text-primary hover:underline">hod_ece@srivasaviengg.ac.in</a></p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to the Department of Electronics and Communication Engineering at Sri Vasavi Engineering College. Our department is committed to providing high-quality education in electronics and communication engineering, fostering innovation, and preparing our students for successful careers in the rapidly evolving technology sector.
                    <br /><br />
                    Our state-of-the-art laboratories and dedicated faculty members ensure that our students receive both theoretical knowledge and practical experience. We focus on:
                    <br />
                    • Industry-relevant curriculum with regular updates<br />
                    • Hands-on training with modern equipment and software<br />
                    • Research opportunities and innovative projects<br />
                    • Industry collaborations and internships<br />
                    • Professional development through workshops and seminars<br />
                    <br />
                    Our department takes pride in our achievements, including:
                    <br />
                    • Successful placement records<br />
                    • Research publications in prestigious journals<br />
                    • Faculty with extensive industry and academic experience<br />
                    • Strong industry connections<br />
                    • Active student technical associations
                    <br /><br />
                    We invite you to explore the opportunities our department offers and join us in shaping the future of electronics and communication technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Department Overview Section */}
            <div className="border-t pt-10 mt-10">
              <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Department of Electronics and Communication Engineering was established in the year 2001 with an initial intake of 60 students. Over the years, it has grown significantly with a current intake of 120 students. The department has well-equipped laboratories, qualified faculty, and modern facilities.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The Department offers a B.Tech program in Electronics and Communication Engineering, providing students with comprehensive knowledge in the fields of communication systems, signal processing, VLSI design, embedded systems, and more.
              </p>

              <h4 className="text-xl font-bold text-[#B22222] mb-4">Courses Offered</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 mb-4">
                  <thead className="text-xs bg-gray-50 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">S.No</th>
                      <th scope="col" className="px-6 py-3">Name of the Course</th>
                      <th scope="col" className="px-6 py-3">Eligibility Criteria</th>
                      <th scope="col" className="px-6 py-3">Duration</th>
                      <th scope="col" className="px-6 py-3">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">B.Tech-Electronics and Communication Engineering</td>
                      <td className="px-6 py-4">AP EAPCET</td>
                      <td className="px-6 py-4">4 Years</td>
                      <td className="px-6 py-4">120</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To evolve into a center of excellence in Electronics and Communication Engineering education and research, producing professionally competent and socially responsible engineers.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Mission</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To impart quality education through effective teaching-learning processes.</li>
              <li>To provide excellent infrastructure and environment conducive for research.</li>
              <li>To enhance industry-institute interaction to make students industry-ready.</li>
              <li>To develop entrepreneurship skills and ethical values among students.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">The graduates will:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and electronics & communication engineering principles.</li>
              <li>Analyze real-life problems and design socially responsible and environmentally sustainable electronics-based solutions.</li>
              <li>Adapt to evolving technologies through continuous learning.</li>
              <li>Lead a successful career as a team member or as a team leader with strong professional ethics and communication skills.</li>
            </ul>
          </div>
        );
      case 'POs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Outcomes (POs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Engineering Knowledge:</strong> Apply knowledge of mathematics, science, engineering fundamentals, and electronics & communication engineering principles to solve complex engineering problems.</li>
              <li><strong>Problem Analysis:</strong> Identify, formulate, research literature, and analyze complex engineering problems to arrive at substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences.</li>
              <li><strong>Design/Development of Solutions:</strong> Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.</li>
              <li><strong>Modern Tool Usage:</strong> Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools for complex engineering activities with an understanding of the limitations.</li>
            </ul>
          </div>
        );
      case 'PSOs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Apply the knowledge of electronics devices and circuits for the design of systems in the field of communications.</li>
              <li>Apply engineering techniques to design, analyze and implement signal processing systems.</li>
              <li>Develop applications using embedded systems and VLSI technology for real-world problems.</li>
            </ul>
          </div>
        );
      case 'COs':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 leading-relaxed">
              The course outcomes are defined for each course and are aligned with the Program Outcomes and Program Specific Outcomes. The course outcomes are assessed through direct and indirect assessment tools.
            </p>
            <p className="mt-4 text-gray-700">
              <a href="https://srivasaviengg.ac.in/uploads/ece/COs.pdf" className="text-[#B22222] hover:underline">Download Course Outcomes Document</a>
            </p>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="py-6">
            <h3 className="text-2xl font-bold text-[#B22222] mb-4">Salient Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Experienced and dedicated faculty members with specializations in various domains</li>
              <li>State-of-the-art laboratories with modern equipment</li>
              <li>Strong industry-institute interaction through internships, projects, and expert lectures</li>
              <li>Research culture fostering innovation and intellectual growth</li>
              <li>Active student chapters and technical clubs</li>
              <li>Regular workshops, seminars, and training programs on emerging technologies</li>
              <li>Excellent placement record in reputed companies</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {

    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            {/* Desktop Navigation Tabs */}
            <div className="hidden md:block relative mb-8">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveDeptTab(section)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeDeptTab === section
                        ? 'bg-[#B22222] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {section === 'SalientFeatures' ? 'Salient Features' : section}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Section Display */}
            <div className="md:hidden relative mb-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Current Section: <span className="text-[#B22222]">{activeDeptTab === 'SalientFeatures' ? 'Salient Features' : activeDeptTab}</span>
                </h3>
                <p className="text-sm text-gray-600 mt-2">Use the floating settings button to navigate between sections</p>
              </div>
            </div>

            {/* Game-Style Right Side Settings Panel */}
            {settingsPanelOpen && (
              <div className="fixed inset-0 z-50">
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
                  onClick={() => setSettingsPanelOpen(false)}
                ></div>

                {/* Settings Panel */}
                <div className="fixed right-0 top-0 h-full w-full sm:w-80 md:w-96 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl transform transition-transform duration-500 ease-out">
                  {/* Panel Header */}
                  <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">Department Navigation</h3>
                          <p className="text-white/70 text-sm">Select a section to explore</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSettingsPanelOpen(false)}
                        className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Panel Content */}
                  <div className="p-6 h-full overflow-y-auto">
                    <div className="space-y-3">
                      {sections.map((section, index) => {
                        const isActive = section === activeDeptTab;
                        return (
                          <button
                            key={section}
                            onClick={() => {
                              setActiveDeptTab(section);
                              setSettingsPanelOpen(false);
                            }}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${isActive
                                ? 'bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white shadow-lg scale-105'
                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isActive ? 'bg-white/20' : 'bg-gray-600'
                                }`}>
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {section === 'SalientFeatures' ? 'Salient Features' : section}
                                </div>
                                <div className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                                  {section === 'Department' && 'Overview & HOD Profile'}
                                  {section === 'Vision' && 'Department Vision Statement'}
                                  {section === 'Mission' && 'Department Mission Statement'}
                                  {section === 'PEOs' && 'Program Educational Objectives'}
                                  {section === 'POs' && 'Program Outcomes'}
                                  {section === 'PSOs' && 'Program Specific Outcomes'}
                                  {section === 'COs' && 'Course Outcomes'}
                                  {section === 'SalientFeatures' && 'Key Highlights & Features'}
                                </div>
                              </div>
                              {isActive && (
                                <div className="ml-auto">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Panel Footer */}
                    <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                      <div className="text-center">
                        <div className="text-white/70 text-sm mb-2">Quick Navigation</div>
                        <div className="text-white/50 text-xs">
                          Click any section above to navigate instantly
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Settings Button - Mobile Only */}
            <button
              onClick={() => setSettingsPanelOpen(true)}
              className="md:hidden fixed right-3 bottom-6 z-40 w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
              title="Department Navigation"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              {/* Mobile Label */}
              <div className="absolute bottom-14 right-0 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Menu
                <div className="absolute top-full right-2 w-0 h-0 border-t-4 border-t-gray-900 border-l-2 border-r-2 border-l-transparent border-r-transparent"></div>
              </div>
            </button>

            {/* Content Area that changes completely based on selected tab */}
            {renderDeptTabContent()}
          </div>
        );

      case 'Physical Facilities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Physical Facilities</h2>
            {PhysicalFacilitiesLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-8">
                {/* Class Rooms & Time Tables */}
                <details className="border rounded-lg">
                  <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Class Rooms & Class Time Tables</summary>
                  <div className="p-4 space-y-6">
                    <div>
                      <h5 className="font-semibold mb-2">Class Rooms</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        {physicalfacilities
                          .filter(item => item.type === 'class_room')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title} -{' '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#850209] font-semibold hover:underline"
                              >
                                View
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Class Time Tables</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        {physicalfacilities
                          .filter(item => item.type === 'class_time_table')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title} -{' '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#850209] font-semibold hover:underline"
                              >
                                View
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </details>
                {/* Laboratories */}
                <details className="border rounded-lg">
                  <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Laboratories</summary>
                  <div className="p-4 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Major Equipment Available</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        {physicalfacilities
                          .filter(item => item.type === 'lab_equipment')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Major Software Available</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        {physicalfacilities
                          .filter(item => item.type === 'lab_software')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Laboratory Facilities</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {physicalfacilities
                          .filter(item => item.type === 'lab_image')
                          .map((item, index) => (
                            <img
                              key={index}
                              src={item.url}
                              alt={`Lab Image ${index + 1}`}
                              className="rounded-lg shadow-md w-full h-auto object-cover"
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </details>
                {/* Department Library */}
                <details className="border rounded-lg">
                  <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Department Library</summary>
                  <div className="p-4 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                      {physicalfacilities
                        .filter(item => item.type === 'library_image')
                        .map((item, index) => (
                          <img
                            key={index}
                            src={item.url}
                            alt={`Library ${index + 1}`}
                            className="rounded-lg shadow-md w-full h-auto object-cover"
                          />
                        ))}
                    </div>
                    <h5 className="text-center font-semibold">The department runs an exclusive department Library to the benefit of Faculty as well as students.</h5>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm mt-4">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2">S.No.</th>
                            <th className="px-4 py-2">Academic Year</th>
                            <th className="px-4 py-2">No. of Titles</th>
                            <th className="px-4 py-2">No. of Volumes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {physicalfacilities
                            .filter(item => item.type === 'library_stat')
                            .map((item, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{item.year}</td>
                                <td className="px-4 py-2">{item.titles}</td>
                                <td className="px-4 py-2">{item.volumes}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center mt-4">
                      <h2 className="text-lg font-semibold">Faculty Incharge</h2>
                      {physicalfacilities
                        .filter(item => item.type === 'library_incharge')
                        .map((item, index) => (
                          <div key={index}>
                            <p>
                              <b>Phone:</b> {item.phone}
                            </p>
                            <p>
                              <b>Email:</b> {item.email}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      case 'Syllabus':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Syllabus</h2>
            <div className="container mx-auto">
              {SyllabusLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-6">
                  {Array.isArray(syllabus) ? (
                    syllabus.map((item, index) => (
                      <details key={index} className="border rounded-lg">
                        <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">
                          {item.program} ({item.academic_year})
                        </summary>
                        <div className="p-4">
                          <ul className="list-disc pl-6 space-y-2">
                            <li>
                              {item.title} -{' '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#850209] font-semibold hover:underline"
                              >
                                View
                              </a>
                            </li>
                          </ul>
                        </div>
                      </details>
                    ))
                  ) : (
                    <div className="text-center py-8">Syllabus data is not available.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case 'Faculty Innovations in Teaching & Learning':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Innovations in Teaching & Learning</h2>
            <div className="space-y-4">
              {facultyInnovations
                .filter(item => item.title !== 'Question Banks')
                .map((innovation, index) => (
                  <details key={index} className="border rounded-md">
                    <summary className="font-semibold px-4 py-2 cursor-pointer">{innovation.title}</summary>
                    <div className="p-4">
                      {innovation.description && (
                        <>
                          <h3 className="text-xl text-center text-[#850209] font-semibold mb-2">e-Resources</h3>
                          <p>{innovation.description}</p>
                          <p className="mt-2">
                            <b>Some of the methods adopted by the faculty members in Teaching & Learning are:</b>
                          </p>
                        </>
                      )}
                      {innovation.items && innovation.items.length > 0 && (
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          {innovation.links && innovation.links.length > 0 ? (
                            innovation.items.map((item, idx) => (
                              <li key={idx}>
                                {item} - <a href={innovation.links[idx]?.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a>
                              </li>
                            ))
                          ) : (
                            innovation.items.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))
                          )}
                        </ul>
                      )}
                    </div>
                  </details>
                ))}
              {(() => {
                const questionBanks = facultyInnovations.filter(item => item.title === 'Question Banks');
                if (questionBanks.length > 0) {
                  return (
                    <details className="border rounded-md">
                      <summary className="font-semibold px-4 py-2 cursor-pointer">Question Banks</summary>
                      <div className="p-4">
                        {questionBanks.map((qb, idx) => (
                          <div key={idx}>
                            <h3 className="text-xl text-center text-[#850209] font-semibold mb-2">{qb.description}</h3>
                            <ul className="list-disc pl-6 space-y-1">
                              {qb.items.map((item, i) => (
                                <li key={i}>
                                  {item} - <a href={qb.links[i]?.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">View More</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        );
      case 'Handbooks':
        if (handbooksLoading) {
          return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
              <div className="text-center py-8">Loading...</div>
            </div>
          );
        }
        const groupedHandbooks = handbooks.reduce((acc: Record<string, Handbook[]>, item) => {
          if (!acc[item.year]) acc[item.year] = [];
          acc[item.year].push(item);
          return acc;
        }, {});
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Academic HandBooks</h2>
            <div className="space-y-6">
              {Object.entries(groupedHandbooks).sort(([a], [b]) => b.localeCompare(a)).map(([year, items]) => (
                <details key={year} className="border rounded-lg">
                  <summary className="font-semibold text-lg px-4 py-2 cursor-pointer">Academic year {year}</summary>
                  {year === '2018-19' ? (
                    <>
                      <ul className="pt-3 list-disc pl-6 space-y-2">
                        {items.filter(item => item.title.includes('II-Sem')).map((item, idx) => (
                          <li key={idx}>
                            {item.title} -{' '}
                            <a
                              href={item.url}
                              className="text-[#850209] font-semibold hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </li>
                        ))}
                      </ul>
                      <ul className="list-disc pl-6 space-y-2 mt-4">
                        {items.filter(item => item.title.includes('I-Sem')).map((item, idx) => (
                          <li key={idx}>
                            {item.title} -{' '}
                            <a
                              href={item.url}
                              className="text-[#850209] font-semibold hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <ul className="pt-3 list-disc pl-6 space-y-2">
                      {items.map((item, idx) => (
                        <li key={idx}>
                          {item.title} -{' '}
                          <a
                            href={item.url}
                            className="text-[#850209] font-semibold hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Extra-Curricular Activities</h2>
            {extraCurricularActivities.length === 0 ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                {/* Extracurricular Activities List */}
                <div className="mb-8 max-w-4xl mx-auto">
                  <ul className="list-disc pl-8 space-y-3 text-left">
                    {extraCurricularActivities
                      .filter(item => item.type === 'yearly_activity')
                      .map((item, idx) => (
                        <li key={idx} className="activity-item">
                          {item.label} -{' '}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#850209] font-semibold hover:underline"
                          >
                            View More
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Departmental Sports Meet */}
                <h2 className="text-2xl font-bold mb-4 text-center">Departmental Sports Meet-2k17</h2>
                <div className="mb-8 max-w-4xl mx-auto">
                  <ul className="list-disc pl-8 space-y-3 text-left">
                    {extraCurricularActivities
                      .filter(item => item.type === 'sports_meet')
                      .map((item, idx) => (
                        <li key={idx} className="activity-item">
                          {item.label} -{' '}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#850209] font-semibold hover:underline"
                          >
                            View More
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Departmental Cultural Meet */}
                {extraCurricularActivities
                  .filter(item => item.type === 'cultural_meet')
                  .map((item, idx) => (
                    <h2 key={idx} className="text-2xl font-bold mb-4 text-center">
                      {item.label} -{' '}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] font-semibold hover:underline"
                      >
                        View More
                      </a>
                    </h2>
                  ))}
                {/* Industrial Visit */}
                <h2 className="text-2xl font-bold mb-4 text-center">Industrial Visit</h2>
                <div className="mb-8 max-w-4xl mx-auto">
                  <ul className="list-disc pl-8 space-y-3 text-left">
                    {extraCurricularActivities
                      .filter(item => item.type === 'industrial_visit')
                      .map((item, idx) => (
                        <li key={idx} className="activity-item">
                          {item.label} -{' '}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#850209] font-semibold hover:underline"
                          >
                            View More
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
                {/* Blood Donation Camp */}
                {extraCurricularActivities
                  .filter(item => item.type === 'blood_donation_camp')
                  .map((item, idx) => (
                    <h2 key={idx} className="text-2xl font-bold mb-4 text-center">
                      {item.label} -{' '}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] font-semibold hover:underline"
                      >
                        View More
                      </a>
                    </h2>
                  ))}
                {/* YUVA Section */}
                <h2 className="text-2xl font-bold mb-4 text-center">YUVA</h2>
                <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
                  <h3 className="text-xl font-semibold mb-2">Social Services</h3>
                  <p className="mb-2">
                    There are many people who like to donate things to the poor and needy because they are blessed with every comfort and know that others are struggling,. It is everyone's courtesy to help poor children who are less fortunate, though. If you are helping someone in their need, then you are doing the right thing by providing them with the essentials. In this world it is a fact that whatever seed you sow, that's the sort of fruit you'll get.So, if we are ready to help people then we'll also get someone to help in our hour of need. Things change with the passage of time, bringing new situations to everyone's lives.
                  </p>
                  <p className="mb-4">
                    With this motto the Department of ECE of Sri Vasavi Engineering College has started in <b>"YUVA"</b> Program with the caption of <b>"The Society Needs You"</b> on the occasion of Engineer's Day in 2016-17.. Under this program students are involving voluntarily and identify the poor and needy people and help them. This program will be carried out once in a semester continuously. In this regard the College Management has encouraged the students by extending their heartful support.
                  </p>
                  <hr className="my-4" />
                  <h3 className="text-lg font-semibold mb-2">LIST OF YUVA EVENTS CONDUCTED YEAR WISE</h3>
                  <ul className="list-disc pl-8 space-y-3 text-left">
                    {extraCurricularActivities
                      .filter(item => item.type === 'yuva_event')
                      .map((item, idx) => (
                        <li key={idx}>
                          {item.label} -{' '}
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#850209] font-semibold hover:underline"
                          >
                            For more details
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Newsletters</h2>
            {newslettersLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-4">
                {newsletters.map((item, idx) => (
                  <details key={idx} className="border rounded-lg">
                    <summary className="text-lg font-semibold cursor-pointer px-4 py-2">{item.title}</summary>
                    <div className="text-center p-3">
                      {item.title} -{' '}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] text-lg font-semibold hover:underline"
                      >
                        View
                      </a>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        );
      case 'Training Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Training Activities</h2>
            <div className="space-y-6">
              {technicalAssociationActivities
                .filter(item => item.type === 'training_activity')
                .map((item, idx) => (
                  <details key={idx} className="border rounded-lg">
                    <summary className="text-lg font-semibold cursor-pointer px-4 py-2">{item.title}</summary>
                    <div className="text-center p-3">
                      {item.title} -{' '}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#850209] text-lg font-semibold hover:underline"
                      >
                        View
                      </a>
                    </div>
                  </details>
                ))}
            </div>
          </div>
        );
      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Technical Association</h2>
            <div className="mb-8">
              <details className="mb-6">
                <summary className="text-xl font-semibold cursor-pointer">Celebrations Under Veda</summary>
                <p className="py-2">
                  Victorious Electronics with Dynamic Aspirants is the departmental student association. The main intention of VEDA is to provide effective communication among the students of ECE department and share their ideas and improve their technical skills. The Department also conducts various Activities under the banner of IETE Student Chapter.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  {technicalAssociationActivities
                    .filter(item => item.type === 'technical_association_event')
                    .map((item, idx) => (
                      <li key={idx}>
                        {item.title} -{' '}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View More
                        </a>
                      </li>
                    ))}
                </ul>
              </details>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-center">Images</h3>
              {/* TECKVEDA-2K19 Gallery */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-center mb-4">TECKVEDA-2K19</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {technicalAssociationActivities
                    .filter(item => item.type === 'gallery_2k19')
                    .map((item, idx) => (
                      <img
                        key={idx}
                        src={item.url}
                        alt={item.title}
                        className="rounded-lg shadow-md w-full h-auto object-cover"
                      />
                    ))}
                </div>
              </div>
              {/* TECKVEDA-2K18 Gallery */}
              <div>
                <h4 className="text-xl font-bold text-center mb-4">TECKVEDA-2K18</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {technicalAssociationActivities
                    .filter(item => item.type === 'gallery_2k18')
                    .map((item, idx) => (
                      <img
                        key={idx}
                        src={item.url}
                        alt={item.title}
                        className="rounded-lg shadow-md w-full h-auto object-cover"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Merit Scholarships and Academic Toppers</h2>
            {ScholarshipToppersLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="mb-8">
                <details className="mb-6">
                  <summary className="text-xl font-semibold cursor-pointer">Merit Scholarships Year Wise</summary>
                  <p className="py-2">The college management is very much interested to encourage the students by giving merit scholarships and incentives to the best EAMCET Rankers and semester wise class topper. With this every year some students are receiving the scholarships and get benefitted and motivated. The details are listed below:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    {scholarshipToppers
                      .filter(item => item.type === 'merit_scholarship')
                      .map((item, index) => (
                        <li key={index}>
                          {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View More</a>
                        </li>
                      ))}
                  </ul>
                </details>
                <details>
                  <summary className="text-xl font-semibold cursor-pointer">Cash Award's and Scholarship's given by College Management</summary>
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-2 px-4 border-b">S.No</th>
                          <th className="py-2 px-4 border-b">Academic Year</th>
                          <th className="py-2 px-4 border-b">Based on</th>
                          <th className="py-2 px-4 border-b">No. of Students Benefited</th>
                          <th className="py-2 px-4 border-b">Scholarship Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scholarshipToppers
                          .filter(item => item.type === 'cash_award')
                          .map((item, index) => {
                            const isEAMCET = item.based_on === 'EAMCET Rank';
                            return (
                              <React.Fragment key={index}>
                                <tr>
                                  <td className="py-2 px-4 border-b">{index + 1}</td>
                                  <td className="py-2 px-4 border-b">{item.year}</td>
                                  <td className="py-2 px-4 border-b">{item.based_on}</td>
                                  <td className="py-2 px-4 border-b">{item.students}</td>
                                  <td className="py-2 px-4 border-b">{item.amount}</td>
                                </tr>
                                {isEAMCET && (
                                  <tr>
                                    <td className="py-2 px-4 border-b"></td>
                                    <td className="py-2 px-4 border-b"></td>
                                    <td className="py-2 px-4 border-b">EAMCET Rank</td>
                                    <td className="py-2 px-4 border-b">{item.students}</td>
                                    <td className="py-2 px-4 border-b">{item.amount}</td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </details>
              </div>
            )}
            <h3 className="text-2xl font-semibold mb-4 text-center mt-8">Image Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                1, 2, 3, 6, 5, 7, 8, 9, 9, 10, 11, 12, 13, 14
              ].map((num, idx) => (
                <img
                  key={idx}
                  src={`https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Merit_Scholars${num}.jpg`}
                  alt={`Merit Scholar ${num}`}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
              ))}
            </div>
          </div>
        );
      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            Content for Student Achievements coming soon...
          </div>
        );
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Placements</h2>
            <div className="space-y-4">
              {placements.map((placement, idx) => (
                <details key={placement.year} className="border rounded-lg">
                  <summary className="text-lg font-semibold cursor-pointer px-4 py-2">Placements during the Academic Year {placement.year}</summary>
                  <div className="text-center p-3">
                    Placements during the Academic Year {placement.year} -{' '}
                    <a
                      href={placement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#850209] text-lg font-semibold hover:underline"
                    >
                      View
                    </a>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      // ...existing cases...
    }

    switch (activeContent) {
      case 'Workshops/SOC/Guest Lecturers':
        return (
          <div>
            {/* Placeholder for dynamic data */}
            {workshop_gl.length > 0 ? (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Workshops/SOC/Seminars/Guest Lectures</h2>
                {/* Workshops/SOC */}
                <div className="mb-8">
                  <details className="mb-6">
                    <summary className="text-xl font-semibold cursor-pointer">Workshops/SOC</summary>
                    <div className="mt-4">
                      <ol className="list-decimal pl-6 space-y-2">
                        {workshop_gl
                          .filter((item) => item.type === 'workshop_soc')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title} {item.year ? `(${item.year})` : ''} -{' '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View More
                              </a>
                            </li>
                          ))}
                      </ol>
                    </div>
                  </details>
                </div>
                {/* Guest Lectures */}
                <div className="mb-8">
                  <details>
                    <summary className="text-xl font-semibold cursor-pointer">Guest Lectures</summary>
                    <div className="mt-4">
                      <ol className="list-decimal pl-6 space-y-2">
                        {workshop_gl
                          .filter((item) => item.type === 'guest_lecture')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title} {item.year ? `(${item.year})` : ''} -{' '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View More
                              </a>
                            </li>
                          ))}
                      </ol>
                    </div>
                  </details>
                </div>
                 {/* Workshops/SOC Gallery */}
                 <div className="text-center mt-8">
                  <h3 className="text-2xl font-semibold mb-4">Workshops/SOC Gallery PICS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {workshop_gl
                      .filter((item) => item.type === 'gallery')
                      .map((item, index) => (
                        <img
                          key={index}
                          src={item.url}
                          alt={item.title}
                          className="rounded-lg shadow-md w-full h-auto object-cover"
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading Workshops/SOC/Guest Lecturers data...</div>
            )}
          </div>
        );
            // ...existing cases...
      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Faculty Development Programs</h2>
            {FdpLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                <div className="mb-8">
                  <details className="mb-6">
                    <summary className="text-xl font-semibold cursor-pointer">FDP Attended</summary>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      {fdp
                        .filter((item) => item.type === 'attended')
                        .map((item, index) => (
                          <li key={index} className="fdp-item">
                            {item.title} {item.year ? `(${item.year})` : ''} -{' '}
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View
                            </a>
                          </li>
                        ))}
                    </ul>
                  </details>
                </div>
                <div>
                  <details>
                    <summary className="text-xl font-semibold cursor-pointer">FDPs/ Workshops/ Training Programmes Conducted</summary>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      {fdp
                        .filter((item) => item.type === 'conducted')
                        .map((item, index) => (
                          <li key={index} className="fdp-item">
                            {item.title} {item.year ? `(${item.year})` : ''} -{' '}
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View
                            </a>
                          </li>
                        ))}
                    </ul>
                  </details>
                </div>
              </>
            )}
          </div>
        );
      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-6 text-center">MoUs</h2>
            <h3 className="text-2xl font-semibold text-center mb-4">A. MOUs with Industries</h3>
            <div className="overflow-x-auto mb-8">
              {MousLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : mous.length === 0 ? (
                <div className="text-center py-8">No MoUs found.</div>
              ) : (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b">S.No</th>
                      <th className="py-2 px-4 border-b">Organization Name</th>
                      <th className="py-2 px-4 border-b">Date</th>
                      <th className="py-2 px-4 border-b">Status</th>
                      <th className="py-2 px-4 border-b">Purpose</th>
                      <th className="py-2 px-4 border-b">Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mous.map((mou, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{mou.organisation}</td>
                        <td className="py-2 px-4 border-b">{mou.date}</td>
                        <td className="py-2 px-4 border-b">{mou.status}</td>
                        <td className="py-2 px-4 border-b">{mou.purpose}</td>
                        <td className="py-2 px-4 border-b">
                          <a
                            href={mou.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <h3 className="text-2xl font-semibold mb-4">B. Interaction with the Industry</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Making MOU with Electro-Pro e-Waste Management, Visakapatnam to establish Electro Pro e-Waste in Campus -{' '}
                <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Electro%20Pro%20Management.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
              </li>
              <li>
                Making MOU with Thing tronics company, Banglore to establish IOT lab in Campus -{' '}
                <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
              </li>
            </ul>
          </div>
        );
      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            {renderFacultyAchievements()}
          </div>
        );
      // ...existing cases...
    }
    switch (activeContent) {
      // ...existing cases...
      case 'Clubs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            {ClubsLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div>
                {/* SPACE CLUB_AICTE-SPICES */}
                <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">SPACE CLUB_AICTE-SPICES</h2>
                <div className="mb-10">
                  <details className="mb-6">
                    <summary className="text-xl font-semibold cursor-pointer">SPACE CLUB_AICTE-SPICES</summary>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      {clubs
                        .filter((clubItem) => clubItem.club === 'SPACE CLUB_AICTE-SPICES')
                        .map((clubItem, index) => (
                          <li key={index} className="fdp-item">
                            {clubItem.event} -{' '}
                            <a
                              href={clubItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View
                            </a>
                          </li>
                        ))}
                    </ul>
                  </details>
                </div>

                {/* E- Waste Management Refurbishing club */}
                <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">E- Waste Management Refurbishing club</h2>
                <div>
                  <details>
                    <summary className="text-xl font-semibold cursor-pointer">E- Waste Management Refurbishing club</summary>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      {clubs
                        .filter((clubItem) => clubItem.club === 'E- Waste Management Refurbishing club')
                        .map((clubItem, index) => (
                          <li key={index} className="fdp-item">
                            {clubItem.event} -{' '}
                            <a
                              href={clubItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View
                            </a>
                          </li>
                        ))}
                    </ul>
                  </details>
                </div>
              </div>
            )}
          </div>
        );
case 'Faculty Profiles':
      return (
        <div className="space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Teaching Faculty</h2>
            {facultyLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">S.No.</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Qualification</th>
                      <th className="px-6 py-3">Designation</th>
                      <th className="px-6 py-3">Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculty.map((member: Faculty, idx) => (
                      <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{idx + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4">{member.qualification}</td>
                        <td className="px-6 py-4">{member.designation}</td>
                        <td className="px-6 py-4">
                          {member.profile_url && (
                            <a
                              href={member.profile_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline"
                            >
                              View
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#850209] mb-8 text-center">Non-Teaching Staff</h2>
            {nonTeachingLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">S.No.</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonTeachingFaculty.map((member: NonTeachingFaculty, idx) => (
                      <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{idx + 1}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                        <td className="px-6 py-4">{member.designation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      );

      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">S.No</th>
                    <th className="px-4 py-3">Name of the BOS Member</th>
                    <th className="px-4 py-3">Designation</th>
                    <th className="px-4 py-3">Organization</th>
                    <th className="px-4 py-3">Position in JOB</th>
                  </tr>
                </thead>
                <tbody>
                  {boardOfStudiesLoading ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-3 text-center">Loading...</td>
                    </tr>
                  ) : (
                    boardOfStudies.map((member: BoardOfStudiesMember, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{member.member_name}</td>
                        <td className="px-4 py-3">{member.designation}</td>
                        <td className="px-4 py-3">{member.organization}</td>
                        <td className="px-4 py-3">{member.role}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-semibold text-[#B22222] mb-4">Board of Studies Meeting Minutes:</h4>
              <ul className="list-disc pl-6 space-y-2">
                {BosMinutesLoading ? (
                  <li>Loading...</li>
                ) : (
                  // meeting_title, meeting_number, meeting_date, document_url, academic_year
                  bosminutes.map((minute: BosMinutes, index) => (
                    <li key={index}>
                      {minute.meeting_title} - {minute.meeting_number} ({minute.meeting_date}) [{minute.academic_year}] -{' '}
                      <a
                        href={minute.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        );

      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  return (
    <div className="pt-24 bg-gray-100">
      <section className="bg-[#8B1919] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Electronics & Communication Engineering</h1>
          </div>
        </div>
      </section>

      {/* Fixed Sidebar Component */}
      <FixedSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        title="ECE Department"
        buttonLabel="Department Menu"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ECEDepartment;
