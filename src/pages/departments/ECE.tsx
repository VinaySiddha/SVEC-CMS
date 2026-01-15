
import React, { useEffect, useState } from 'react';
import { Radio, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon, Settings } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';


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
  date_of_joining?: string;
}

// Designation priority mapping for sorting
const getDesignationPriority = (designation: string): number => {
  const designationLower = designation.toLowerCase().trim();

  if (designationLower.includes('professor') && designationLower.includes('head')) return 1;
  if (designationLower === 'professor') return 2;
  if (designationLower.includes('associate professor')) return 3;
  if (designationLower.includes('sr') && designationLower.includes('asst')) return 4;
  if (designationLower.includes('sr') && designationLower.includes('assistant')) return 4;
  if (designationLower.includes('asst. professor')) return 5;
  if (designationLower.includes('assistant professor')) return 5;
  if (designationLower.includes('lecturer')) return 6;

  return 999; // Unknown designations go to end
};

// Sort faculty by designation priority (ascending) then by date_of_joining (ascending)
const sortFacultyByDesignationAndDOJ = (facultyList: Faculty[]): Faculty[] => {
  // Safety check: return empty array if input is not an array
  if (!Array.isArray(facultyList)) {
    console.error('sortFacultyByDesignationAndDOJ: Input is not an array', facultyList);
    return [];
  }
  return [...facultyList].sort((a, b) => {
    const priorityA = getDesignationPriority(a.designation);
    const priorityB = getDesignationPriority(b.designation);

    // First sort by designation priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // If same designation, sort by date_of_joining (ascending - oldest first)
    const dateA = a.date_of_joining ? new Date(a.date_of_joining).getTime() : Infinity;
    const dateB = b.date_of_joining ? new Date(b.date_of_joining).getTime() : Infinity;

    return dateA - dateB;
  });
};

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
  id: number;
  meeting_no: string;
  meeting_date: string;
  file_url: string;
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
interface Clubs {
  club: string;
  event: string;
  description: string;
  url: string;
}
interface Mous {
  organisation: string;
  date: string;
  status: string;
  purpose: string;
  document_url: string;
  type: string;
}
interface Fdp {
  type: string;
  year: string;
  title: string;
  url: string;
}
interface FacultyAchievement {
  id?: number;
  category: string;
  title: string;
  file_url?: string;
  year?: string;
}
interface Workshop_gl {
  type: string;
  year: string;
  title: string;
  url: string;
}
interface Placement {
  year: string;
  url: string;
}
interface ScholarshipTopper {
  type: string;
  year: string;
  title: string;
  url: string;
  based_on: string;
  students: string;
  amount: string;
}
interface TechnicalAssociationActivity {
  type: string;
  year: string;
  title: string;
  url: string;
}
interface Newsletter {
  title: string;
  url: string;
}
interface ExtraCurricularActivity {
  type: string;
  label: string;
  year: string;
  url: string;
}
interface FacultyInnovation {
  category: string;
  title: string;
  description: string;
  items: string[];
  links: { label: string; url: string }[];
}
interface Handbook {
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
  const [studentAchievements, setStudentAchievements] = useState<any[]>([]);
  const [studentAchievementsLoading, setStudentAchievementsLoading] = useState(false);
  const [scholarshipToppers, setScholarshipToppers] = useState<ScholarshipTopper[]>([]);
  const [ScholarshipToppersLoading, setScholarshipToppersLoading] = useState(false);
  const [technicalAssociationActivities, setTechnicalAssociationActivities] = useState<TechnicalAssociationActivity[]>([]);
  const [hackathonsGallery, setHackathonsGallery] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [newslettersLoading, setNewslettersLoading] = useState(false);
  const [extraCurricularActivities, setExtraCurricularActivities] = useState<ExtraCurricularActivity[]>([]);
  const [facultyInnovations, setFacultyInnovations] = useState<FacultyInnovation[]>([]);
  const [handbooks, setHandbooks] = useState<Handbook[]>([]);
  const [handbooksLoading, setHandbooksLoading] = useState(false);
  const [extraCurricularGallery, setExtraCurricularGallery] = useState<any[]>([]);
  const [technicalAssociationGallery, setTechnicalAssociationGallery] = useState<any[]>([]);
  const [trainingActivitiesGallery, setTrainingActivitiesGallery] = useState<any[]>([]);
  const [meritScholarshipsGallery, setMeritScholarshipsGallery] = useState<any[]>([]);
  const [placementsGallery, setPlacementsGallery] = useState<any[]>([]);
  const [workshopsGallery, setWorkshopsGallery] = useState<any[]>([]);
  const [facultyDevelopmentGallery, setFacultyDevelopmentGallery] = useState<any[]>([]);
  const [labsGalleryData, setLabsGalleryData] = useState<any[]>([]);
  const [classroomsGalleryData, setClassroomsGalleryData] = useState<any[]>([]);

  const renderFacultyAchievements = () => {
    if (FacultyAchievementsLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Achievements</h2>
        <div className="space-y-6">
          {/* Journal Publications */}
          <details open className="cst-dropdown">
            <summary>Journal Publications</summary>
            <div className="cst-dropdown-content">
              {journalPublications.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {journalPublications.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>

          {/* Conference Publications */}
          <details className="cst-dropdown">
            <summary>Conference Publications</summary>
            <div className="cst-dropdown-content">
              {conferencePublications.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {conferencePublications.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>

          {/* Book Publications */}
          <details className="cst-dropdown">
            <summary>Book Publications</summary>
            <div className="cst-dropdown-content">
              {bookPublications.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {bookPublications.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>

          {/* Certifications */}
          <details className="cst-dropdown">
            <summary>Certifications</summary>
            <div className="cst-dropdown-content">
              {certifications.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {certifications.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>

          {/* Patents */}
          <details className="cst-dropdown">
            <summary>Patents</summary>
            <div className="cst-dropdown-content">
              {patents.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {patents.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>

          {/* Awards */}
          <details className="cst-dropdown">
            <summary>Awards</summary>
            <div className="cst-dropdown-content">
              {awards.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {awards.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>
        </div>

        {/* Memberships */}
        <div className="space-y-6 mt-6">
          <details className="cst-dropdown">
            <summary>Memberships</summary>
            <div className="cst-dropdown-content">
              {memberships.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {memberships.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>

          {/* Faculty Out-Reach */}
          <details className="cst-dropdown">
            <summary>Faculty Out-Reach</summary>
            <div className="cst-dropdown-content">
              {facultyOutreach.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {facultyOutreach.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>

          {/* Faculty Promotions/Incentives */}
          <details className="cst-dropdown">
            <summary>Faculty Promotions/Incentives</summary>
            <div className="cst-dropdown-content">
              {facultyPromotionsIncentives.length > 0 ? (
                <ul className="list-disc pl-6 my-2 space-y-2">
                  {facultyPromotionsIncentives.map((item, index) => (
                    <li key={index}>
                      {item.title}
                      {item.year && <> <span className="text-gray-600">[{item.year}]</span></>}
                      {item.file_url && (
                        <>
                          {' - '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
              )}
            </div>
          </details>
        </div>

        {/* Gallery */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryItems.map((item, index) => (
              <img key={index} src={item.file_url} alt={item.title} className="rounded-lg shadow-md w-full h-auto object-cover" />
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
      .then(data => {
        if (Array.isArray(data)) {
          setFaculty(sortFacultyByDesignationAndDOJ(data));
        } else {
          console.error('Faculty data is not an array:', data);
          setFaculty([]);
        }
      })
      .catch(err => {
        console.error('Error fetching faculty data:', err);
        setFaculty([]);
      });

    fetch('/api/ece/nonteaching-faculty')
      .then(res => res.json())
      .then(data => setNonTeachingFaculty(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching non-teaching faculty:', err);
        setNonTeachingFaculty([]);
      });

    //2
    fetch('/api/ece/board-of-studies')
      .then(res => res.json())
      .then(data => setBoardOfStudies(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching board of studies:', err);
        setBoardOfStudies([]);
      });

    fetch('/api/ece/bos-meeting-minutes')
      .then(res => res.json())
      .then(data => setBosMinutes(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching BOS minutes:', err);
        setBosMinutes([]);
      });

    //3
    fetch('/api/ece/syllabus')
      .then(res => res.json())
      .then(data => setSyllabus(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching syllabus:', err);
        setSyllabus([]);
      });

    //4
    fetch('/api/ece/physical_facilities')
      .then(res => res.json())
      .then(data => setPhysicalFacilities(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching physical facilities:', err);
        setPhysicalFacilities([]);
      });

    //5
    fetch('/api/ece/clubs')
      .then(res => res.json())
      .then(data => setClubs(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching clubs:', err);
        setClubs([]);
      });

    //6
    fetch('/api/ece/mous')
      .then(res => res.json())
      .then(data => setMous(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching mous:', err);
        setMous([]);
      });

    //7
    fetch('/api/ece/fdp')
      .then(res => res.json())
      .then(data => setFdp(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching fdp:', err);
        setFdp([]);
      });

    //8
    setFacultyAchievementsLoading(true);
    fetch('/api/ece/faculty-achievements')
      .then(res => res.json())
      .then(data => {
        console.log('Raw faculty achievements response:', data, 'Type:', typeof data, 'IsArray:', Array.isArray(data));
        
        if (!Array.isArray(data)) {
          console.error('Faculty achievements data is not an array:', data);
          data = [];
        }
        
        console.log('Processing faculty achievements, count:', data.length);
        
        const journal = data.filter((item: FacultyAchievement) => item.category === 'Journal Publications');
        const conference = data.filter((item: FacultyAchievement) => item.category === 'Conferences');
        const book = data.filter((item: FacultyAchievement) => item.category === 'Book Publications');
        const certification = data.filter((item: FacultyAchievement) => item.category === 'Certifications');
        const patent = data.filter((item: FacultyAchievement) => item.category === 'Patents');
        const award = data.filter((item: FacultyAchievement) => item.category === 'Awards');
        const membership = data.filter((item: FacultyAchievement) => item.category === 'Memberships');
        const outreach = data.filter((item: FacultyAchievement) => item.category === 'Faculty Out-Reach');
        const promotion = data.filter((item: FacultyAchievement) => item.category === 'Promotions/Incentives');
        const gallery = data.filter((item: FacultyAchievement) => item.category === 'Gallery');

        console.log('Faculty achievements breakdown:', { journal: journal.length, conference: conference.length, book: book.length, certification: certification.length, patent: patent.length, award: award.length, membership: membership.length, outreach: outreach.length, promotion: promotion.length, gallery: gallery.length });

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
        setFacultyAchievementsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching faculty achievements:', err);
        setJournalPublications([]);
        setConferencePublications([]);
        setBookPublications([]);
        setCertifications([]);
        setPatents([]);
        setAwards([]);
        setMemberships([]);
        setFacultyOutreach([]);
        setFacultyPromotionsIncentives([]);
        setGalleryItems([]);
        setFacultyAchievementsLoading(false);
      });

    //9
    fetch('/api/ece/workshops-gl')
      .then(res => res.json())
      .then(data => setWorkshop_gl(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching workshops:', err);
        setWorkshop_gl([]);
      });

    //10
    fetch('/api/ece/placements')
      .then(res => res.json())
      .then(data => setPlacements(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching placements:', err);
        setPlacements([]);
      });

    //11
    setStudentAchievementsLoading(true);
    fetch('/api/ece/student-achievements')
      .then(res => {
        if (!res.ok) {
          throw new Error(`API responded with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setStudentAchievements(Array.isArray(data) ? data : []);
        setStudentAchievementsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching student achievements:', err);
        setStudentAchievements([]);
        setStudentAchievementsLoading(false);
      });

    //12
    fetch('/api/ece/scholarships-toppers')
      .then(res => res.json())
      .then(data => setScholarshipToppers(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching scholarships/toppers:', err);
        setScholarshipToppers([]);
      });

    //12
    fetch('/api/ece/technicalassociation-activities')
      .then(res => res.json())
      .then(data => setTechnicalAssociationActivities(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching technical association activities:', err);
        setTechnicalAssociationActivities([]);
      });

    //12b - Hackathons Gallery for Technical Association
    fetch('/api/ece/hackathons-gallery?category=technical%20association')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setHackathonsGallery(data.data);
        }
      })
      .catch(err => {
        console.error('Error fetching hackathons gallery:', err);
        setHackathonsGallery([]);
      });

    //12c - Extra Curricular Gallery
    fetch('/api/ece/ece-extra-curricular-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setExtraCurricularGallery(Array.isArray(data) ? data : []))
      .catch(() => setExtraCurricularGallery([]));

    //12d - Technical Association Gallery
    fetch('/api/ece/ece-technical-association-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setTechnicalAssociationGallery(Array.isArray(data) ? data : []))
      .catch(() => setTechnicalAssociationGallery([]));

    //12e - Training Activities Gallery
    fetch('/api/ece/ece-training-activities-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setTrainingActivitiesGallery(Array.isArray(data) ? data : []))
      .catch(() => setTrainingActivitiesGallery([]));

    //12f - Merit Scholarships Gallery
    fetch('/api/ece/ece-merit-scholarships-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setMeritScholarshipsGallery(Array.isArray(data) ? data : []))
      .catch(() => setMeritScholarshipsGallery([]));

    //12g - Placements Gallery
    fetch('/api/ece/ece-placements-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setPlacementsGallery(Array.isArray(data) ? data : []))
      .catch(() => setPlacementsGallery([]));

    //12h - Workshops Gallery
    fetch('/api/ece/ece-workshops-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setWorkshopsGallery(Array.isArray(data) ? data : []))
      .catch(() => setWorkshopsGallery([]));

    //12i - Faculty Development Gallery
    fetch('/api/ece/ece-faculty-development-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setFacultyDevelopmentGallery(Array.isArray(data) ? data : []))
      .catch(() => setFacultyDevelopmentGallery([]));

    //12j - Labs Gallery
    fetch('/api/ece/ece-labs-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setLabsGalleryData(Array.isArray(data) ? data : []))
      .catch(() => setLabsGalleryData([]));

    //12k - Classrooms Gallery
    fetch('/api/ece/ece-classrooms-gallery')
      .then(res => res.ok ? res.json() : Promise.resolve([]))
      .then(data => setClassroomsGalleryData(Array.isArray(data) ? data : []))
      .catch(() => setClassroomsGalleryData([]));

    //13
    fetch('/api/ece/newsletters')
      .then(res => res.json())
      .then(data => setNewsletters(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching newsletters:', err);
        setNewsletters([]);
      });

    //14
    fetch('/api/ece/extracurricularactivities')
      .then(res => res.json())
      .then(data => setExtraCurricularActivities(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching extracurricular activities:', err);
        setExtraCurricularActivities([]);
      });

    //15
    fetch('/api/ece/facultyinnovations')
      .then(res => res.json())
      .then(data => setFacultyInnovations(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching faculty innovations:', err);
        setFacultyInnovations([]);
      });

    //16
    fetch('/api/ece/handbooks')
      .then(res => res.json())
      .then(data => setHandbooks(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching handbooks:', err);
        setHandbooks([]);
      });


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
    //{ id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];



  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div className="animate-fade-in">
            {/* Department Overview Section */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Department Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4 text-justify" >
                The Department of Electronics & Communication Engineering was established in the year 2001,to offer four year UG programme with an intake of 60 . The intake was enhanced to 120 in the year 2005 and subsequently to 180 from 2013.The Department also offers PG programme with Embedded Systems & VLSI (ES & VLSI) specialization having an intake of 6.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                It is one of the most significant branches of engineering which has always been in demand. The department is known for its efficacy and holds a strong reputation. The department aims primarily at excellence not only in theoretical but also in Experimental Research in Microwaves, Antennas, VLSI, Signal Processing, Communications, Embedded Systems etc. This department has well qualified and proficient faculty members with a wide range of experience in academics and industry as well.
              </p>
              <div className="mt-8">
                <h4 className="text-xl font-bold text-[#B22222] mb-4 text-center">Courses</h4>



                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-green-700 text-white">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sl.No</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Name of the Course</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Eligibility Criteria</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Duration</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Intake</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 text-center">1</td>
                        <td className="border border-gray-300 px-4 py-3">B.Tech-Electronics and Communication Engineering</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">AP EAPCET</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">4 Years</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">240</td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                        <td className="border border-gray-300 px-4 py-3 text-center">2</td>
                        <td className="border border-gray-300 px-4 py-3">M.Tech-Embedded Systems &amp; VLSI</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">GATE / PGCET</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">2 Years</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">6</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <h4 className="text-xl font-bold text-[#B22222] mb-4">Courses Offered</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 mb-4 border border-gray-200 rounded-lg">
                  <thead className="text-xs bg-gray-50 uppercase text-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No</th>
                      <th scope="col" className="px-6 py-3 border-b border-gray-200">Name of the Course</th>
                      <th scope="col" className="px-6 py-3 border-b border-gray-200">Eligibility Criteria</th>
                      <th scope="col" className="px-6 py-3 border-b border-gray-200">Duration</th>
                      <th scope="col" className="px-6 py-3 border-b border-gray-200">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">B.Tech-Electronics and Communication Engineering</td>
                      <td className="px-6 py-4">AP EAPCET</td>
                      <td className="px-6 py-4">4 Years</td>
                      <td className="px-6 py-4">120</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To develop the department into a centre of excellence and produce high quality, technically competent and responsible Electronics and communication engineers.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To create a learner centric environment that promotes the intellectual growth of the students.</li>
              <li>To develop linkages with R & D organizations and educational institutions for excellence in teaching, learning and consultancy practices.</li>
              <li>To build the student community with high ethical standards.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">ECE Graduates of this programme will be able to :</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Have successful career in the field of Electronics & Communication Engineering.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Design products for societal needs.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Demonstrate their abilities to support service activities with due consideration for ethics and human values.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 4</h4>
                <p className="text-gray-700">Lead a successful career as a team member or as a team leader with strong professional ethics and communication skills.</p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-6 font-semibold">Electronics & Communication Engineering Graduates are able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">1. Engineering Knowledge [K3]</h4>
                <p className="text-gray-700">Apply the knowledge of mathematics, science, engineering fundamentals, and concepts of Electronics & Communication engineering to solve the complex engineering problems.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">2. Problem Analysis [K4]</h4>
                <p className="text-gray-700">Identify, formulate, research literature, and analyze complex engineering problems reaching substantiated conclusions using mathematics, natural sciences, and electronics and communication engineering principles.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">3. Design/Development of Solutions [K5]</h4>
                <p className="text-gray-700">Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">4. Conduct Investigations of Complex Problems [K5]</h4>
                <p className="text-gray-700">Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">5. Modern Tool Usage [K3]</h4>
                <p className="text-gray-700">Create, select, and apply appropriate techniques, resources, and Electronics Design Automation tools including prediction and modeling to complex engineering activities with an understanding of the limitations.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">6. The Engineer and Society [K3]</h4>
                <p className="text-gray-700">Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal, and cultural issues and the consequent responsibilities relevant to the professional engineering practice.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">7. Environment and Sustainability [K3]</h4>
                <p className="text-gray-700">Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for the sustainable development.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">8. Ethics [K3]</h4>
                <p className="text-gray-700">Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">9. Individual and Team Work [K6]</h4>
                <p className="text-gray-700">Function effectively as an individual, and as a member or leader in diverse teams and in multidisciplinary settings.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">10. Communication [K2]</h4>
                <p className="text-gray-700">Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">11. Project Management and Finance [K6]</h4>
                <p className="text-gray-700">Demonstrate knowledge and understanding of the engineering and management principles and apply these to ones own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-800 mb-2">12. Life-long Learning [K1]</h4>
                <p className="text-gray-700">Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 1</h4>
                <p className="text-gray-700">PSOs
                  A graduate of the Electronics and Communication Engineering Program will be able to:</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 2</h4>
                <p className="text-gray-700">PSO1:Use modern tools to design subsystems for simple applications in Embedded Systems and VLSI. [K3]</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-green-800">PSO 3</h4>
                <p className="text-gray-700">Apply engineering concepts to find solutions in the fields of Communications, Signal/ Image Processing. [K3]</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Course Outcomes (COs)</h3>

            {/* UG COs Section */}
            <div className="mb-12">
              <h4 className="text-xl font-bold text-[#B22222] mb-6 text-center">UG COs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* V20 Regulation */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-700 font-semibold mb-4">Course Outcomes (V20 Regulation)</p>
                  <a
                    href="/uploads/CO/ece/V20 Regulation Course Outcomes.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-2 bg-[#B22222] text-white font-semibold rounded hover:bg-[#a01a1a] transition-colors duration-300 items-center"
                  >
                    View PDF
                  </a>
                </div>

                {/* V18 Regulation */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-700 font-semibold mb-4">Course Outcomes (V18 Regulation)</p>
                  <a
                    href="/uploads/CO/ece/M. Tech Course Outcomes -V18 Regulation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-2 bg-[#B22222] text-white font-semibold rounded hover:bg-[#a01a1a] transition-colors duration-300 items-center"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </div>

            {/* PG COs Section */}
            <div>
              <h4 className="text-xl font-bold text-[#B22222] mb-6 text-center">PG COs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* V20 Regulation */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-700 font-semibold mb-4">Course Outcomes (V21 Regulation)</p>
                  <a
                    href="/uploads/CO/ece/M. Tech Course Outcomes -V21 Regulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-2 bg-[#B22222] text-white font-semibold rounded hover:bg-[#a01a1a] transition-colors duration-300 items-center"
                  >
                    View PDF
                  </a>
                </div>

                {/* V18 Regulation */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                  <p className="text-gray-700 font-semibold mb-4">Course Outcomes (V18 Regulation)</p>
                  <a
                    href="/uploads/ece/pg-cos-v18.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-2 bg-[#B22222] text-white font-semibold rounded hover:bg-[#a01a1a] transition-colors duration-300 items-center"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>100% students Admissions in ECE, every year</li>
              <li>Accredited by NBA in 2012, 2019, 2022</li>
              <li>From the Academic Year 2019-20 to 2022-23 the Department was recognized as research center by JNTUK</li>
              <li>All Class Rooms are ICT enabled & Established one Digital Seminar Hall with capacity of 150</li>
              <li>Good Faculty Retention & More than 15% of faculty are Doctorates</li>
              <li>Patents & Books Publications by our faculty</li>
              <li>Good Faculty Outreach Programs</li>
              <li>Good Students Placements</li>
              <li>Signed MOU with M/s thing Tronics Pvt.Ltd, Bangalore and established IoT Lab</li>
              <li>Signed MOU with E&ICT of NIT Warangal, IIT Madras. Electro Pro, Visakhapatnam</li>
              <li>Established Electro Pro E-waste Refurbishing Club for E-waste Management</li>
              <li>Professional Society Memberships in ISTE, IETE</li>
              <li>"YUVA" a Social service Activity organized by ECE Students to help the Poor & Needy People with the support of faculty and College Management</li>
              <li>Introduced the B.Tech(Honors) and B.Tech(Minors) from 2018 onwards</li>
              <li>Our Student has received "Pratibha Award" from State Govt. of Andhra Pradesh</li>
              <li>Organizing Sponsored/ Funded Projects & FDPs</li>
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
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <div className="space-y-8">
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

              {/* Department Overview (HOD Profile - Only shown on Department tab) */}
              {activeDeptTab === 'Department' && (
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-fade-in">
                  <div className="md:w-1/3">
                    <img
                      src="/ecehod.jpg"
                      alt="Dr. E. Kusuma Kumari"
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold text-[#B22222] mb-2">Dr. E. Kusuma Kumari</h3>
                    <p className="text-gray-700 mb-2">Professor & Head of Department, ECE</p>
                    <p className="text-gray-700 mb-2">Ph.D, M.Tech</p>
                    <p className="text-gray-700 mb-2">Phone No: 08818-284355(O)-(Ext.-364)</p>
                    <p className="text-gray-700 mb-2">Fax No: 08818-284322</p>
                    <p className="text-gray-700 mb-2">
                      <a href="mailto:hod_ece@srivasaviengg.ac.in" className="text-[#B22222] hover:underline">hod_ece@srivasaviengg.ac.in</a>
                    </p>
                  </div>
                </div>
              )}

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
                    <div className="bg-gradient-to-r from-[#B22222] to-[#B22222] p-4 border-b border-gray-700">
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
                              className={`w-full p-4 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white shadow-lg shadow-[#B22222]/50'
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gray-700/50'
                                  }`}>
                                  <span className="text-lg font-bold">{index + 1}</span>
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="font-semibold">{section === 'SalientFeatures' ? 'Salient Features' : section}</div>
                                  {isActive && <div className="text-xs text-white/70 mt-1">Currently viewing</div>}
                                </div>
                                {isActive && (
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Settings Button (Mobile Only) */}
              <button
                onClick={() => setSettingsPanelOpen(true)}
                className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-[#B22222] to-[#8B0000] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="Open Department Navigation"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Tab Content */}
              <div className="mt-8">
                {renderDeptTabContent()}
              </div>
            </div>
          </div>
        );

      case 'Physical Facilities': {
        // Group facilities by category
        const classRooms = physicalfacilities.filter((f: any) => f.category === 'Class Rooms');
        const classTimetables = physicalfacilities.filter((f: any) => f.category === 'Timetables');
        const seminarHalls = physicalfacilities.filter((f: any) => f.category === 'Seminar Halls');
        const laboratories = physicalfacilities.filter((f: any) => f.category === 'Laboratories');
        const libraryItems = physicalfacilities.filter((f: any) => f.category === 'Library');

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>
            {PhysicalFacilitiesLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : (
              <div className="space-y-6">
                {/* Class Rooms & Class Time Tables Section */}
                <details open className="cst-dropdown">
                  <summary>Class Rooms & Class Time Tables</summary>
                  <div className="cst-dropdown-content">
                    {classRooms.length > 0 ? (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-[#B22222] mb-2">Class Rooms</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {classRooms.map((item: any, idx: number) => (
                            <li key={idx}>
                              {item.title}
                              {item.description && <span className="text-gray-600"> - {item.description}</span>}
                              {item.file_url && (
                                <>
                                  {' '}
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-2">No class rooms added yet</p>
                    )}
                    {classTimetables.length > 0 ? (
                      <div>
                        <h4 className="text-lg font-semibold text-[#B22222] mb-2">Class Time Tables</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {classTimetables.map((item: any, idx: number) => (
                            <li key={idx}>
                              {item.title}
                              {item.description && <span className="text-gray-600"> - {item.description}</span>}
                              {item.file_url && (
                                <>
                                  {' '}
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-2">No class time tables added yet</p>
                    )}
                  </div>
                </details>

                {/* Seminar Halls Section */}
                <details className="cst-dropdown">
                  <summary>Seminar Halls</summary>
                  <div className="cst-dropdown-content">
                    {seminarHalls.length > 0 ? (
                      <div>
                        <h4 className="text-lg font-semibold text-[#B22222] mb-2">Seminar Halls</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {seminarHalls.map((item: any, idx: number) => (
                            <li key={idx}>
                              {item.title}
                              {item.description && <span className="text-gray-600"> - {item.description}</span>}
                              {item.file_url && (
                                <>
                                  {' '}
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-2">No seminar halls added yet</p>
                    )}
                  </div>
                </details>

                {/* Laboratories Section */}
                <details className="cst-dropdown">
                  <summary>Laboratories</summary>
                  <div className="cst-dropdown-content">
                    {laboratories.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-[#B22222] mb-2">Laboratory Details</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {laboratories.map((item: any, idx: number) => (
                            <li key={idx}>
                              {item.title}
                              {item.url && (
                                <>
                                  {' - '}
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Laboratory Facilities Images Gallery */}
                    {labsGalleryData && labsGalleryData.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-xl font-semibold text-[#B22222] mb-4">Laboratory Facility Images</h3>
                        {(() => {
                          const allLabImages: string[] = [];
                          labsGalleryData.forEach(item => {
                            if (item.gallery) {
                              const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                              allLabImages.push(...imageUrls);
                            }
                          });

                          return allLabImages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {allLabImages.map((imageUrl: string, i: number) => (
                                <img
                                  key={i}
                                  src={imageUrl}
                                  alt={`Lab Facility Image ${i + 1}`}
                                  className="w-full rounded-lg shadow-md object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              ))}
                            </div>
                          ) : null;
                        })()}
                      </div>
                    )}
                  </div>
                </details>

                {/* Classrooms Images Section */}
                <details className="cst-dropdown">
                  <summary>Classrooms Images</summary>
                  <div className="cst-dropdown-content">
                    {classroomsGalleryData && classroomsGalleryData.length > 0 ? (
                      (() => {
                        const allClassroomImages: string[] = [];
                        classroomsGalleryData.forEach(item => {
                          if (item.gallery) {
                            const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                            allClassroomImages.push(...imageUrls);
                          }
                        });

                        return allClassroomImages.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {allClassroomImages.map((imageUrl: string, i: number) => (
                              <img
                                key={i}
                                src={imageUrl}
                                alt={`Classroom Image ${i + 1}`}
                                className="w-full rounded-lg shadow-md object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">No classroom images available</p>
                        );
                      })()
                    ) : (
                      <p className="text-gray-500 text-center py-4">No classroom images available</p>
                    )}
                  </div>
                </details>

                {/* Department Library Section */}
                {libraryItems.length > 0 && (
                  <details open className="cst-dropdown">
                    <summary>Department Library</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 space-y-2">
                        {libraryItems.map((item: any, idx: number) => (
                          <li key={idx}>
                            {item.title}
                            {item.url && (
                              <>
                                {' - '}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-medium"
                                >
                                  View
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                )}
              </div>
            )}
          </div>
        );
      }
      case 'Syllabus':
        // Group syllabus by type (B.Tech, M.Tech, etc.) or program
        const syllabusTypes = Array.from(new Set(syllabus.map((s: any) => s.type || s.program || 'Other')));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            {SyllabusLoading ? (
              <div className="text-center py-8 text-gray-500">Loading syllabus...</div>
            ) : Array.isArray(syllabus) && syllabus.length > 0 ? (
              <div className="space-y-6">
                {syllabusTypes.map((type, index) => (
                  <details key={type} open={index === 0} className="cst-dropdown">
                    <summary>{type}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {syllabus
                          .filter((s: any) => (s.type || s.program || 'Other') === type)
                          .map((item: any, idx: number) => (
                            <li key={idx}>
                              {item.title}
                              {item.academic_year && <span className="text-gray-600"> ({item.academic_year})</span>}
                              {item.url && (
                                <>
                                  {' - '}
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No syllabus data available.</div>
            )}
          </div>
        );
      case 'Faculty Innovations in Teaching & Learning':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Innovations in Teaching & Learning</h2>
            <div className="space-y-4">
              {facultyInnovations
                .filter(item => item.title !== 'Question Banks')
                .map((innovation, index) => (
                  <details key={index} open={index === 0} className="cst-dropdown">
                    <summary>{innovation.title}</summary>
                    <div className="cst-dropdown-content">
                      {innovation.description && (
                        <>
                          <h3 className="text-xl text-center text-[#B22222] font-semibold mb-2">e-Resources</h3>
                          <p className="text-gray-700">{innovation.description}</p>
                          <p className="mt-2 text-gray-700">
                            <b>Some of the methods adopted by the faculty members in Teaching & Learning are:</b>
                          </p>
                        </>
                      )}
                      {innovation.items && innovation.items.length > 0 && (
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                          {innovation.links && innovation.links.length > 0 ? (
                            innovation.items.map((item, idx) => (
                              <li key={idx}>
                                {item} - <a href={innovation.links[idx]?.url} className="text-[#B22222] hover:underline" target="_blank" rel="noopener noreferrer">View</a>
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
                    <details className="cst-dropdown">
                      <summary>Question Banks</summary>
                      <div className="cst-dropdown-content">
                        {questionBanks.map((qb, idx) => (
                          <div key={idx}>
                            <h3 className="text-xl text-center text-[#B22222] font-semibold mb-2">{qb.description}</h3>
                            <ul className="list-disc pl-6 space-y-1">
                              {qb.items.map((item, i) => (
                                <li key={i}>
                                  {item} - <a href={qb.links[i]?.url} className="text-[#B22222] hover:underline" target="_blank" rel="noopener noreferrer">View</a>
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
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Academic HandBooks</h2>
            <div className="space-y-4">
              {Object.entries(groupedHandbooks).sort(([a], [b]) => b.localeCompare(a)).map(([year, items], idx) => (
                <details key={year} open={idx === 0} className="cst-dropdown">
                  <summary>Academic year {year}</summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          {item.title}
                          {item.url && (
                            <>
                              {' - '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View
                              </a>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
            {extraCurricularActivities.length === 0 ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-6">
                <details open className="cst-dropdown">
                  <summary>Extra-Curricular Activities</summary>
                  <div className="cst-dropdown-content">
                    {/* Extracurricular Activities List */}
                    {extraCurricularActivities.filter(item => item.type === 'yearly_activity').length > 0 && (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {extraCurricularActivities
                          .filter(item => item.type === 'yearly_activity')
                          .map((item, idx) => (
                            <li key={idx}>
                              {item.label} -{' '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View More
                              </a>
                            </li>
                          ))}
                      </ul>
                    )}

                    {/* Departmental Sports Meet */}
                    {extraCurricularActivities.filter(item => item.type === 'sports_meet').length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="text-lg font-bold text-[#B22222] mb-3">Departmental Sports Meet-2k17</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {extraCurricularActivities
                            .filter(item => item.type === 'sports_meet')
                            .map((item, idx) => (
                              <li key={idx}>
                                {item.label} -{' '}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View More
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {/* Departmental Cultural Meet */}
                    {extraCurricularActivities.filter(item => item.type === 'cultural_meet').length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="text-lg font-bold text-[#B22222] mb-3">Departmental Cultural Meet</h4>
                        {extraCurricularActivities
                          .filter(item => item.type === 'cultural_meet')
                          .map((item, idx) => (
                            <div key={idx} className="mb-2">
                              {item.label} -{' '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View More
                              </a>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Industrial Visit */}
                    {extraCurricularActivities.filter(item => item.type === 'industrial_visit').length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="text-lg font-bold text-[#B22222] mb-3">Industrial Visit</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {extraCurricularActivities
                            .filter(item => item.type === 'industrial_visit')
                            .map((item, idx) => (
                              <li key={idx}>
                                {item.label} -{' '}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View More
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {/* Blood Donation Camp */}
                    {extraCurricularActivities.filter(item => item.type === 'blood_donation_camp').length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h4 className="text-lg font-bold text-[#B22222] mb-3">Blood Donation Camp</h4>
                        {extraCurricularActivities
                          .filter(item => item.type === 'blood_donation_camp')
                          .map((item, idx) => (
                            <div key={idx} className="mb-2">
                              {item.label} -{' '}
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View More
                              </a>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </details>

                {/* YUVA Events */}
                <details className="cst-dropdown">
                  <summary>YUVA - The Society Needs You</summary>
                  <div className="cst-dropdown-content">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#B22222] mb-3">Social Services</h3>
                        <p className="text-gray-700 text-justify mb-3">
                          There are many people who like to donate things to the poor and needy because they are blessed with every comfort and know that others are struggling. It is everyone's courtesy to help poor children who are less fortunate, though. If you are helping someone in their need, then you are doing the right thing by providing them with the essentials. In this world it is a fact that whatever seed you sow, that's the sort of fruit you'll get. So, if we are ready to help people then we'll also get someone to help in our hour of need. Things change with the passage of time, bringing new situations to everyone's lives.
                        </p>
                        <p className="text-gray-700 text-justify mb-3">
                          With this motto the Department of ECE of Sri Vasavi Engineering College has started in <b>"YUVA"</b> Program with the caption of <b>"The Society Needs You"</b> on the occasion of Engineer's Day in 2016-17. Under this program students are involving voluntarily and identify the poor and needy people and help them. This program will be carried out once in a semester continuously. In this regard the College Management has encouraged the students by extending their heartful support.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-lg font-bold text-[#B22222] mb-3">LIST OF YUVA EVENTS CONDUCTED YEAR WISE</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {extraCurricularActivities
                            .filter(item => item.type === 'yuva_event')
                            .map((item, idx) => (
                              <li key={idx}>
                                {item.label} -{' '}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  For more details
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </details>

                {/* Gallery Section */}
                <details className="cst-dropdown">
                  <summary>Image Gallery</summary>
                  <div className="cst-dropdown-content">
                    {extraCurricularGallery.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {extraCurricularGallery.flatMap(item => {
                          if (item.gallery) {
                            const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                            return imageUrls.map((imageUrl: string, index: number) => ({
                              url: imageUrl,
                              year: item.academic_year,
                              key: `${item.id}-${index}`
                            }));
                          }
                          return [];
                        }).map((img: any) => (
                          <img
                            key={img.key}
                            src={img.url}
                            alt={`Extra-Curricular ${img.year} Image`}
                            className="w-full rounded-lg shadow-md object-cover"
                            style={{ height: '300px', width: '400px' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                    )}
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      case 'Newsletters':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Newsletters</h2>
            {newslettersLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : newsletters.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No newsletters available.</div>
            ) : (
              <div className="space-y-4">
                {newsletters.map((item, idx) => (
                  <details key={idx} open={idx === 0} className="cst-dropdown">
                    <summary>{item.title}</summary>
                    <div className="cst-dropdown-content">
                      <p className="p-2">
                        {item.title} -{' '}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B22222] hover:underline"
                        >
                          View
                        </a>
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        );
      case 'Training Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Training Activities</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Training Activities</summary>
                <div className="cst-dropdown-content">
                  {technicalAssociationActivities.filter(item => item.type === 'training_activity').length > 0 ? (
                    <ul className="list-disc pl-6 my-2 space-y-2">
                      {technicalAssociationActivities
                        .filter(item => item.type === 'training_activity')
                        .map((item, idx) => (
                          <li key={idx}>
                            {item.title}
                            {item.url && (
                              <>
                                {' - '}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline"
                                >
                                  View
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <div className="text-gray-600 text-sm mt-2">No training activities available currently.</div>
                  )}
                </div>
              </details>

              {/* Gallery Section */}
              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {trainingActivitiesGallery.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {trainingActivitiesGallery.flatMap(item => {
                        if (item.gallery) {
                          const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                          return imageUrls.map((imageUrl: string, index: number) => ({
                            url: imageUrl,
                            year: item.academic_year,
                            key: `${item.id}-${index}`
                          }));
                        }
                        return [];
                      }).map((img: any) => (
                        <img
                          key={img.key}
                          src={img.url}
                          alt={`Training Activities ${img.year} Image`}
                          className="w-full rounded-lg shadow-md object-cover"
                          style={{ height: '300px', width: '400px' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>
            <p className="text-gray-700 mb-6 text-justify">
              Victorious Electronics with Dynamic Aspirants is the departmental student association. The main intention of VEDA is to provide effective communication among the students of ECE department and share their ideas and improve their technical skills. The Department also conducts various Activities under the banner of IETE Student Chapter.
            </p>

            <div className="space-y-4">
              <details open className="cst-dropdown">
                <summary>Celebrations Under VEDA</summary>
                <div className="cst-dropdown-content">
                  {technicalAssociationActivities.filter(item => item.type === 'technical_association_event').length > 0 ? (
                    <ul className="list-disc pl-6 my-4 space-y-2">
                      {technicalAssociationActivities
                        .filter(item => item.type === 'technical_association_event')
                        .map((item, idx) => (
                          <li key={idx}>
                            <span className="text-gray-800">{item.title}</span>
                            {item.url && (
                              <>
                                {' - '}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#B22222] hover:underline font-medium"
                                >
                                  View More
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <div className="text-gray-600 text-sm mt-2">No activities available currently.</div>
                  )}
                </div>
              </details>

              <details className="cst-dropdown">
                <summary>Image Gallery</summary>
                <div className="cst-dropdown-content">
                  {technicalAssociationGallery.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {technicalAssociationGallery.flatMap(item => {
                        if (item.gallery) {
                          const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                          return imageUrls.map((imageUrl: string, index: number) => ({
                            url: imageUrl,
                            year: item.academic_year,
                            key: `${item.id}-${index}`
                          }));
                        }
                        return [];
                      }).map((img: any) => (
                        <img
                          key={img.key}
                          src={img.url}
                          alt={`Technical Association ${img.year} Image`}
                          className="w-full rounded-lg shadow-md object-cover"
                          style={{ height: '300px', width: '400px' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                  )}
                </div>
              </details>
            </div>
          </div>
        );
      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Merit Scholarships and Academic Toppers</h2>
            {ScholarshipToppersLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-6">
                <details open className="cst-dropdown">
                  <summary>Merit Scholarships Year Wise</summary>
                  <div className="cst-dropdown-content">
                    <p className="py-2">The college management is very much interested to encourage the students by giving merit scholarships and incentives to the best EAMCET Rankers and semester wise class topper. With this every year some students are receiving the scholarships and get benefitted and motivated. The details are listed below:</p>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                      {scholarshipToppers
                        .filter(item => item.type === 'merit_scholarship')
                        .map((item, index) => (
                          <li key={index}>
                            {item.title} ({item.year}) - <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">View More</a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </details>
                <details className="cst-dropdown">
                  <summary>Cash Award's and Scholarship's given by College Management</summary>
                  <div className="cst-dropdown-content">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-3 px-4 border-b text-left">S.No</th>
                            <th className="py-3 px-4 border-b text-left">Academic Year</th>
                            <th className="py-3 px-4 border-b text-left">Based on</th>
                            <th className="py-3 px-4 border-b text-left">No. of Students Benefited</th>
                            <th className="py-3 px-4 border-b text-left">Scholarship Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scholarshipToppers
                            .filter(item => item.type === 'cash_award')
                            .map((item, index) => {
                              const isEAMCET = item.based_on === 'EAMCET Rank';
                              return (
                                <React.Fragment key={index}>
                                  <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">{item.year}</td>
                                    <td className="py-3 px-4 border-b">{item.based_on}</td>
                                    <td className="py-3 px-4 border-b">{item.students}</td>
                                    <td className="py-3 px-4 border-b">{item.amount}</td>
                                  </tr>
                                  {isEAMCET && (
                                    <tr className="hover:bg-gray-50">
                                      <td className="py-3 px-4 border-b"></td>
                                      <td className="py-3 px-4 border-b"></td>
                                      <td className="py-3 px-4 border-b">EAMCET Rank</td>
                                      <td className="py-3 px-4 border-b">{item.students}</td>
                                      <td className="py-3 px-4 border-b">{item.amount}</td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </details>

                <details className="cst-dropdown">
                  <summary>Image Gallery</summary>
                  <div className="cst-dropdown-content">
                    {meritScholarshipsGallery.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {meritScholarshipsGallery.flatMap(item => {
                          if (item.gallery) {
                            const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                            return imageUrls.map((imageUrl: string, index: number) => ({
                              url: imageUrl,
                              year: item.academic_year,
                              key: `${item.id}-${index}`
                            }));
                          }
                          return [];
                        }).map((img: any) => (
                          <img
                            key={img.key}
                            src={img.url}
                            alt={`Merit Scholarship ${img.year} Image`}
                            className="w-full rounded-lg shadow-md object-cover"
                            style={{ height: '300px', width: '400px' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                    )}
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      case 'Student Achievements':
        const achievementDropdowns = [
          { name: 'Awards', id: 'awards', tableNames: ['ece_awards'] },
          { name: 'Community Service Projects', id: 'community-service', tableNames: ['ece_csp'] },
          { name: 'GATE/GRE', id: 'gate-gre', tableNames: ['ece_gate', 'ece_gre', 'ece_icet'] },
          { name: 'NPTEL/Other Certifications', id: 'nptel-other-certifications', tableNames: ['ece_nptel'] },
         // { name: 'Projects', id: 'projects', tableNames: ['ece_projects'] },
          { name: 'Publications', id: 'publications', tableNames: ['ece_publications'] },
          { name: 'Roll of Honour', id: 'roll-of-honour', tableNames: ['ece_roll_of_honour'] },
          { name: 'Student Research Projects', id: 'student-research-projects', tableNames: ['ece_research_projects'] },
          { name: 'Workshops, Internships, Seminars & Webinars', id: 'workshops-internships-seminars-webinars', tableNames: ['ece_workshops_internships'] },
        ];

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
            {studentAchievementsLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : studentAchievements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No student achievements available.</div>
            ) : (
              <div className="space-y-6">
                {achievementDropdowns.map((dropdown, index) => {
                  const dropdownAchievements = studentAchievements.filter((achievement: any) => 
                    dropdown.tableNames.some((tableName: string) => 
                      achievement.table === tableName || 
                      achievement.category === dropdown.id || 
                      achievement.type === dropdown.id
                    )
                  );

                  return (
                    <details key={dropdown.id} open={index === 0} className="cst-dropdown group">
                      <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                        <span>{dropdown.name}</span>
                        <ChevronRight className="w-5 h-5" />
                      </summary>
                      <div className="cst-dropdown-content">
                        {dropdownAchievements.length > 0 ? (
                          <>
                            {/* Table format for GATE/GRE */}
                            {dropdown.id === 'gate-gre' ? (
                              <div className="space-y-8 mt-4">
                                {/* GATE Table */}
                                {dropdownAchievements.filter((a: any) => a.table === 'ece_gate').length > 0 && (
                                  <div>
                                    <h4 className="text-lg font-bold text-[#B22222] mb-3">GATE</h4>
                                    <div className="overflow-x-auto">
                                      <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                          <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Year</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Rank No.</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Name of the Student</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Remarks</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Qualified Year</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {dropdownAchievements.filter((a: any) => a.table === 'ece_gate').map((achievement: any, idx: number) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.year || achievement.batch || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.rank_no || achievement.rank || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm font-medium">{achievement.student_name || achievement.name || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.remarks || achievement.description || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.qualified_year || '-'}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}

                                {/* GRE, TOEFL, IELTS, DULINGO Table */}
                                {dropdownAchievements.filter((a: any) => a.table === 'ece_gre').length > 0 && (
                                  <div>
                                    <h4 className="text-lg font-bold text-[#B22222] mb-3">GRE, TOEFL, IELTS, DULINGO</h4>
                                    <div className="overflow-x-auto">
                                      <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                          <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">S.No</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Regd No.</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Name of the Student</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Course</th>
                                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold">TOEFL</th>
                                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold">GRE</th>
                                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold">IELTS</th>
                                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold">DULINGO</th>
                                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold">PTE</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {dropdownAchievements.filter((a: any) => a.table === 'ece_gre').map((achievement: any, idx: number) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{idx + 1}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                                <a href="#" className="text-[#B22222] hover:underline">{achievement.regd_no || achievement.regdno || '-'}</a>
                                              </td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm font-medium">{achievement.student_name || achievement.name || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.course || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">{achievement.TOEFL || achievement.toefl || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">{achievement.GRE || achievement.gre || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">{achievement.IELTS || achievement.ielts || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">{achievement.DULINGO || achievement.duolingo || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">{achievement.PTE || achievement.pte || '-'}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}

                                {/* ICET, PGCET Table */}
                                {dropdownAchievements.filter((a: any) => a.table === 'ece_icet').length > 0 && (
                                  <div>
                                    <h4 className="text-lg font-bold text-[#B22222] mb-3">ICET, PGCET</h4>
                                    <div className="overflow-x-auto">
                                      <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                          <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">S.No</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Regd No.</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Name of the Student</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Name of the Exam</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Higher Education Program</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {dropdownAchievements.filter((a: any) => a.table === 'ece_icet').map((achievement: any, idx: number) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{idx + 1}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                                <a href="#" className="text-[#B22222] hover:underline">{achievement.regd_no || achievement.regdno || '-'}</a>
                                              </td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm font-medium">{achievement.student_name || achievement.name || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.exam_name || achievement.exam || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.higher_education_program || achievement.program || '-'}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : dropdown.id === 'awards' ? (
                              /* Table format for Awards */
                              <div className="overflow-x-auto mt-4">
                                <table className="w-full border-collapse border border-gray-300">
                                  <thead>
                                    <tr className="bg-gray-200">
                                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Academic Year</th>
                                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Name of the Student</th>
                                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Roll Number</th>
                                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Name of the Award Received</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dropdownAchievements.map((achievement: any, idx: number) => (
                                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.academic_year || achievement.year || achievement.batch || '-'}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-sm font-medium">{achievement.student_name || achievement.name || '-'}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-sm">
                                          <a href="#" className="text-[#B22222] hover:underline">{achievement.roll_number || achievement.regd_no || achievement.regdno || '-'}</a>
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.award_name || achievement.title || achievement.description || '-'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : dropdown.id === 'roll-of-honour' ? (
                              /* Table and gallery format for Roll of Honour */
                              <div className="mt-4 space-y-8">
                                {/* Roll of Honour Table */}
                                {dropdownAchievements.filter((a: any) => a.category === 'roll-of-honour').length > 0 && (
                                  <div>
                                    <h4 className="text-lg font-bold text-[#B22222] mb-3">Roll of Honour</h4>
                                    <div className="overflow-x-auto">
                                      <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                          <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Sno</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Batch</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Roll Number</th>
                                            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Name of the Student</th>
                                            <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold">Percentage</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {dropdownAchievements.filter((a: any) => a.category === 'roll-of-honour').map((achievement: any, idx: number) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{idx + 1}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">{achievement.batch || achievement.year || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm">
                                                <a href="#" className="text-[#B22222] hover:underline">{achievement.roll_number || achievement.regd_no || achievement.regdno || '-'}</a>
                                              </td>
                                              <td className="border border-gray-300 px-3 py-2 text-sm font-medium">{achievement.student_name || achievement.name || '-'}</td>
                                              <td className="border border-gray-300 px-3 py-2 text-center text-sm">{achievement.percentage || achievement.cgpa || '-'}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Roll of Honour Gallery */}
                                {(() => {
                                  const galleryData = dropdownAchievements.filter((a: any) => a.category === 'honour');
                                  console.log('All achievements:', dropdownAchievements);
                                  console.log('Gallery data filtered:', galleryData);
                                  console.log('Gallery categories in achievements:', dropdownAchievements.map((a: any) => a.category).filter((c: any, i: number, arr: any[]) => arr.indexOf(c) === i));
                                  return galleryData.length > 0 ? (
                                    <div>
                                      <h4 className="text-lg font-bold text-[#B22222] mb-3">Gallery</h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {galleryData.map((achievement: any, idx: number) => {
                                          const imageUrl = achievement.image_url || achievement.image || achievement.file_url || achievement.gallery;
                                          console.log(`Image ${idx}:`, { imageUrl, achievement });
                                          return (
                                            <div key={idx} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                              {imageUrl ? (
                                                <img
                                                  src={imageUrl}
                                                  alt={achievement.title || achievement.name || `Image ${idx + 1}`}
                                                  className="w-full h-48 object-cover"
                                                  onError={(e) => {
                                                    console.error('Image failed to load:', imageUrl);
                                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%239ca3af%22%3EImage not found%3C/text%3E%3C/svg%3E';
                                                  }}
                                                />
                                              ) : (
                                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                  <span className="text-gray-500">No Image URL</span>
                                                </div>
                                              )}
                                              <div className="p-3 bg-white">
                                                <h5 className="font-semibold text-sm text-gray-800">{achievement.title || achievement.name || '-'}</h5>
                                                {achievement.description && (
                                                  <p className="text-xs text-gray-600 mt-1">{achievement.description.substring(0, 80)}{achievement.description.length > 80 ? '...' : ''}</p>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center py-4 text-gray-500">No gallery images available</div>
                                  );
                                })()}
                                
                              </div>
                            ) : dropdown.id === 'workshops-internships-seminars-webinars' ? (
                              /* Sectioned list format for Workshops/Internships */
                              <div className="space-y-6 mt-4">
                                {/* Webinars Section */}
                                {dropdownAchievements.filter((a: any) => a.program === 'webinars' || a.type === 'webinars').length > 0 && (
                                  <div>
                                    <h4 className="text-lg font-bold text-center text-[#B22222] mb-3">Webinars</h4>
                                    <ul className="list-disc pl-6 space-y-2">
                                      {dropdownAchievements.filter((a: any) => a.program === 'webinars' || a.type === 'webinars').map((achievement: any, idx: number) => (
                                        <li key={idx}>
                                          <span className="font-medium">{achievement.title || achievement.name || '-'}</span>
                                          {achievement.academic_year && <> <span className="text-gray-600">[{achievement.academic_year}]</span></>}
                                          {achievement.url && (
                                            <>
                                              {' - '}
                                              <a href={achievement.url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline font-medium">View More</a>
                                            </>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Seminars Section */}
                                {dropdownAchievements.filter((a: any) => a.program === 'seminars' || a.type === 'seminars').length > 0 && (
                                  <div>
                                    <h4 className="text-lg font-bold text-center text-[#B22222] mb-3">Seminars</h4>
                                    <ul className="list-disc pl-6 space-y-2">
                                      {dropdownAchievements.filter((a: any) => a.program === 'seminars' || a.type === 'seminars').map((achievement: any, idx: number) => (
                                        <li key={idx}>
                                          <span className="font-medium">{achievement.title || achievement.name || '-'}</span>
                                          {achievement.academic_year && <> <span className="text-gray-600">[{achievement.academic_year}]</span></>}
                                          {achievement.url && (
                                            <>
                                              {' - '}
                                              <a href={achievement.url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline font-medium">View More</a>
                                            </>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Workshops Section */}
                                {dropdownAchievements.filter((a: any) => a.program === 'workshops' || a.type === 'workshops').length > 0 && (
                                  <div>
                                    <h4 className="text-lg font-bold text-center text-[#B22222] mb-3">Workshops</h4>
                                    <ul className="list-disc pl-6 space-y-2">
                                      {dropdownAchievements.filter((a: any) => a.program === 'workshops' || a.type === 'workshops').map((achievement: any, idx: number) => (
                                        <li key={idx}>
                                          <span className="font-medium">{achievement.title || achievement.name || '-'}</span>
                                          {achievement.academic_year && <> <span className="text-gray-600">[{achievement.academic_year}]</span></>}
                                          {achievement.url && (
                                            <>
                                              {' - '}
                                              <a href={achievement.url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline font-medium">View More</a>
                                            </>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Internships Section */}
                                {dropdownAchievements.filter((a: any) => a.program === 'internships' || a.type === 'internships').length > 0 && (
                                  <div>
                                    <h4 className="text-lg font-bold text-center text-[#B22222] mb-3">Internships</h4>
                                    <ul className="list-disc pl-6 space-y-2">
                                      {dropdownAchievements.filter((a: any) => a.program === 'internships' || a.type === 'internships').map((achievement: any, idx: number) => (
                                        <li key={idx}>
                                          <span className="font-medium">{achievement.title || achievement.name || '-'}</span>
                                          {achievement.academic_year && <> <span className="text-gray-600">[{achievement.academic_year}]</span></>}
                                          {achievement.url && (
                                            <>
                                              {' - '}
                                              <a href={achievement.url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline font-medium">View More</a>
                                            </>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ) : dropdown.id === 'community-service' ? (
                              /* Numbered list format for Community Service Project */
                              <ol className="list-decimal pl-6 my-2 space-y-2">
                                {dropdownAchievements.map((achievement: any, idx: number) => (
                                  <li key={idx}>
                                    <span className="font-medium">{achievement.title || 'List of CSP Projects done by'} {achievement.batch || achievement.year || ''} {achievement.batch || achievement.year ? 'Batch Students' : ''}</span>
                                    {achievement.file_url && (
                                      <>
                                        {' - '}
                                        <a href={achievement.file_url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline font-medium">View More</a>
                                      </>
                                    )}
                                  </li>
                                ))}
                              </ol>
                            ) : dropdown.id === 'nptel-other-certifications' ? (
                              /* Numbered list format for NPTEL/Other Certifications */
                              <ol className="list-decimal pl-6 my-2 space-y-2">
                                {dropdownAchievements.map((achievement: any, idx: number) => (
                                  <li key={idx}>
                                    <span className="font-medium">{achievement.title || achievement.name || 'Certifications'}</span>
                                    {achievement.academic_year && <> <span className="text-gray-600">during the AY {achievement.academic_year}</span></>}
                                    {achievement.file_url && (
                                      <>
                                        {' - '}
                                        <a href={achievement.file_url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline font-medium">View More</a>
                                      </>
                                    )}
                                  </li>
                                ))}
                              </ol>
                            ) : dropdown.id === 'student-research-projects' ? (
                              /* Grouped format for Student Research Projects */
                              <div className="space-y-6 mt-4">
                                {(() => {
                                  // Group achievements by degree/program
                                  const groupedByDegree: Record<string, any[]> = {};
                                  dropdownAchievements.forEach((achievement: any) => {
                                    // Map type to degree, or use degree, or fall back to program or 'General'
                                    let degree = 'General';
                                    if (achievement.degree) {
                                      degree = achievement.degree;
                                    } else if (achievement.type) {
                                      // Map btech/mtech to B.Tech/M.Tech
                                      degree = achievement.type.toLowerCase() === 'btech' ? 'B.Tech' : 
                                               achievement.type.toLowerCase() === 'mtech' ? 'M.Tech' : 
                                               achievement.type;
                                    } else if (achievement.program) {
                                      degree = achievement.program;
                                    }
                                    
                                    if (!groupedByDegree[degree]) {
                                      groupedByDegree[degree] = [];
                                    }
                                    groupedByDegree[degree].push(achievement);
                                  });

                                  return Object.entries(groupedByDegree).map(([degree, items]) => (
                                    <div key={degree}>
                                      <h4 className="text-lg font-bold text-[#B22222] mb-3">{degree}</h4>
                                      <ol className="list-decimal pl-6 space-y-2">
                                        {items.map((achievement: any, idx: number) => (
                                          <li key={idx}>
                                            <span className="font-medium">{achievement.title || 'Projects during the AY'} {achievement.academic_year || achievement.year || achievement.batch || ''}</span>
                                            {achievement.fileUrl && (
                                              <>
                                                {' - '}
                                                <a href={achievement.fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline font-medium">View More</a>
                                              </>
                                            )}
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                  ));
                                })()}
                              </div>
                            ) : (
                              /* List format for other categories */
                              <ul className="list-disc pl-6 my-2 space-y-2">
                                {dropdownAchievements.map((achievement: any, idx: number) => {
                                  // Determine what to display - try title first, then name, then other fields
                                  const displayName = achievement.title || achievement.name || achievement.student_name || achievement.faculty_name || `Record ${achievement.id}`;
                                  const displayYear = achievement.year || achievement.batch || achievement.academic_year;
                                  const displayUrl = achievement.file_url || achievement.url;
                                  
                                  return (
                                    <li key={idx}>
                                      <span className="font-medium">{displayName}</span>
                                      {displayYear && <> <span className="text-gray-600">[{displayYear}]</span></>}
                                      {achievement.description && <> - <span className="text-gray-700">{achievement.description.substring(0, 100)}{achievement.description.length > 100 ? '...' : ''}</span></>}
                                      {displayUrl && (
                                        <>
                                          {' - '}
                                          <a
                                            href={displayUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#B22222] hover:underline font-medium"
                                          >
                                            View
                                          </a>
                                        </>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </>
                        ) : (
                          <p className="text-gray-500 text-center py-2">No achievements in this category</p>
                        )}
                      </div>
                    </details>
                  );
                })}
              </div>
            )}
          </div>
        );
      case 'Placements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>
            {placements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No placement details available.</div>
            ) : (
              <div className="space-y-6">
                {placements.map((placement, idx) => (
                  <details key={placement.year} open={idx === 0} className="cst-dropdown group">
                    <summary className="bg-[#B22222] text-white p-4 rounded-lg font-bold text-lg cursor-pointer flex justify-between items-center hover:bg-[#a01a1a] transition-colors shadow-md">
                      <span>Academic Year {placement.year}</span>
                      <ChevronRight className="w-5 h-5" />
                    </summary>
                    <div className="cst-dropdown-content">
                      <div className="p-4">
                        <p className="font-medium text-gray-700">
                          Placements during the Academic Year {placement.year}
                          {placement.url && (
                            <>
                              {' - '}
                              <a
                                href={placement.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                View More
                              </a>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}

                {/* Gallery Section */}
                <details className="cst-dropdown">
                  <summary>Image Gallery</summary>
                  <div className="cst-dropdown-content">
                    {placementsGallery.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {placementsGallery.flatMap(item => {
                          if (item.gallery) {
                            const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                            return imageUrls.map((imageUrl: string, index: number) => ({
                              url: imageUrl,
                              year: item.academic_year,
                              key: `${item.id}-${index}`
                            }));
                          }
                          return [];
                        }).map((img: any) => (
                          <img
                            key={img.key}
                            src={img.url}
                            alt={`Placement ${img.year} Image`}
                            className="w-full rounded-lg shadow-md object-cover"
                            style={{ height: '300px', width: '400px' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                    )}
                  </div>
                </details>
              </div>
            )}
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
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in space-y-6">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops/SOC/Seminars/Guest Lectures</h2>
                {/* Workshops/SOC */}
                <details open className="cst-dropdown">
                  <summary>Workshops/SOC</summary>
                  <div className="cst-dropdown-content">
                    {workshop_gl.filter((item) => item.type === 'workshop_soc').length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {workshop_gl
                          .filter((item) => item.type === 'workshop_soc')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title}
                              {item.year && <> ({item.year})</>}
                              {item.url && (
                                <>
                                  {' - '}
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
                    )}
                  </div>
                </details>

                {/* Guest Lectures */}
                <details className="cst-dropdown">
                  <summary>Guest Lectures</summary>
                  <div className="cst-dropdown-content">
                    {workshop_gl.filter((item) => item.type === 'guest_lecture').length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {workshop_gl
                          .filter((item) => item.type === 'guest_lecture')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title}
                              {item.year && <> ({item.year})</>}
                              {item.url && (
                                <>
                                  {' - '}
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 text-sm mt-2">No entries available currently.</div>
                    )}
                  </div>
                </details>

                {/* Gallery */}
                <details className="cst-dropdown">
                  <summary>Gallery</summary>
                  <div className="cst-dropdown-content">
                    {workshop_gl.filter((item) => item.type === 'gallery').length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {workshop_gl
                          .filter((item) => item.type === 'gallery')
                          .map((item, index) => (
                            <img
                              key={index}
                              src={item.url}
                              alt={item.title}
                              className="w-full rounded-lg shadow-md object-cover"
                              style={{ height: '300px', width: '400px' }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No gallery images available yet</p>
                    )}
                  </div>
                </details>

                {/* Workshops Gallery Image Collection */}
                <details className="cst-dropdown">
                  <summary>Image Gallery</summary>
                  <div className="cst-dropdown-content">
                    {workshopsGallery.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {workshopsGallery.flatMap(item => {
                          if (item.gallery) {
                            const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                            return imageUrls.map((imageUrl: string, index: number) => ({
                              url: imageUrl,
                              year: item.academic_year,
                              key: `${item.id}-${index}`
                            }));
                          }
                          return [];
                        }).map((img: any) => (
                          <img
                            key={img.key}
                            src={img.url}
                            alt={`Workshop ${img.year} Image`}
                            className="w-full rounded-lg shadow-md object-cover"
                            style={{ height: '300px', width: '400px' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                    )}
                  </div>
                </details>
              </div>
            ) : (
              <div>Loading Workshops/SOC/Guest Lecturers data...</div>
            )}
          </div>
        );
      // ...existing cases...
      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg" style={{ borderWidth: 2 }}>
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Development Programs</h2>
            {FdpLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-6">
                <details open className="cst-dropdown">
                  <summary>FDP Attended</summary>
                  <div className="cst-dropdown-content">
                    {fdp.filter((item) => item.type === 'attended').length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {fdp
                          .filter((item) => item.type === 'attended')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title}
                              {item.year && <> ({item.year})</>}
                              {item.url && (
                                <>
                                  {' - '}
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : null}
                  </div>
                </details>

                <details className="cst-dropdown">
                  <summary>FDPs/ Workshops/ Training Programmes Conducted</summary>
                  <div className="cst-dropdown-content">
                    {fdp.filter((item) => item.type === 'conducted').length > 0 ? (
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {fdp
                          .filter((item) => item.type === 'conducted')
                          .map((item, index) => (
                            <li key={index}>
                              {item.title}
                              {item.year && <> ({item.year})</>}
                              {item.url && (
                                <>
                                  {' - '}
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                      </ul>
                    ) : null}
                  </div>
                </details>

                {/* Gallery Section */}
                <details className="cst-dropdown">
                  <summary>Image Gallery</summary>
                  <div className="cst-dropdown-content">
                    {facultyDevelopmentGallery.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {facultyDevelopmentGallery.flatMap(item => {
                          if (item.gallery) {
                            const imageUrls = item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
                            return imageUrls.map((imageUrl: string, index: number) => ({
                              url: imageUrl,
                              year: item.academic_year,
                              key: `${item.id}-${index}`
                            }));
                          }
                          return [];
                        }).map((img: any) => (
                          <img
                            key={img.key}
                            src={img.url}
                            alt={`Faculty Development ${img.year} Image`}
                            className="w-full rounded-lg shadow-md object-cover"
                            style={{ height: '300px', width: '400px' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No gallery images added yet</p>
                    )}
                  </div>
                </details>
              </div>
            )}
          </div>
        );
      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">MoUs</h2>
            <h3 className="text-xl font-semibold text-[#B22222] mb-4 text-center">A. MOUs with Industries</h3>
            <div className="overflow-x-auto mb-8">
              {MousLoading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : mous.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No MoUs found.</div>
              ) : (
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">S.No</th>
                      <th className="py-3 px-4 border-b text-left">Organization Name</th>
                      <th className="py-3 px-4 border-b text-left">Date</th>
                      <th className="py-3 px-4 border-b text-left">Purpose</th>
                      <th className="py-3 px-4 border-b text-left">Status</th>
                      <th className="py-3 px-4 border-b text-left">Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mous.map((mou: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">{index + 1}</td>
                        <td className="py-3 px-4 border-b">{mou.organization || mou.organisation || mou.organization_name}</td>
                        <td className="py-3 px-4 border-b">{mou.date || mou.signed_date || mou.from_date}</td>
                        <td className="py-3 px-4 border-b">{mou.purpose}</td>
                        <td className="py-3 px-4 border-b">{mou.status || 'Active'}</td>
                        <td className="py-3 px-4 border-b">
                          {mou.document_url ? (
                            <a
                              href={mou.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#B22222] hover:underline"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-gray-400">No document</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <h3 className="text-xl font-semibold text-[#B22222] mb-4">B. Interaction with the Industry</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Making MOU with Electro-Pro e-Waste Management, Visakapatnam to establish Electro Pro e-Waste in Campus -{' '}
                <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Electro%20Pro%20Management.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">View</a>
              </li>
              <li>
                Making MOU with Thing tronics company, Banglore to establish IOT lab in Campus -{' '}
                <a href="https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf" target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">View</a>
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
        // Group clubs by club name
        const clubNames = Array.from(new Set(clubs.map((c: any) => c.club)));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Clubs</h2>
            {ClubsLoading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : clubs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No clubs data available.</div>
            ) : (
              <div className="space-y-6">
                {clubNames.map((clubName, index) => (
                  <details key={clubName} open={index === 0} className="cst-dropdown">
                    <summary>{clubName}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {clubs
                          .filter((clubItem: any) => clubItem.club === clubName)
                          .map((clubItem: any, idx: number) => (
                            <li key={idx}>
                              {clubItem.event}
                              {clubItem.url && (
                                <>
                                  {' - '}
                                  <a
                                    href={clubItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline font-medium"
                                  >
                                    View
                                  </a>
                                </>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        );
      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Faculty Profiles</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Teaching Faculty</summary>
                <div className="cst-dropdown-content">
                  {facultyLoading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">Loading teaching faculty...</div>
                    </div>
                  ) : faculty && faculty.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No.</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Name</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Qualification</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Designation</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Profile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faculty.map((member: Faculty, idx) => (
                            <tr key={idx} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4">{idx + 1}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.qualification || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                              <td className="px-6 py-4">
                                {member.profile_url ? (
                                  <a
                                    href={member.profile_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-200 text-sm font-medium inline-block"
                                  >
                                    View Profile
                                  </a>
                                ) : (
                                  <span className="text-gray-400 text-sm">No Profile</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">No teaching faculty data available.</div>
                    </div>
                  )}
                </div>
              </details>

              <details className="cst-dropdown">
                <summary>Non-Teaching Staff</summary>
                <div className="cst-dropdown-content">
                  {nonTeachingLoading ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500">Loading non-teaching staff...</div>
                    </div>
                  ) : nonTeachingFaculty && nonTeachingFaculty.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No.</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Name</th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-200">Designation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nonTeachingFaculty.map((member: NonTeachingFaculty, idx) => (
                            <tr key={idx} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4">{idx + 1}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">No non-teaching staff data available.</div>
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );

      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
            <div className="space-y-6">
              <details open className="cst-dropdown">
                <summary>Board of Studies Members</summary>
                <div className="cst-dropdown-content">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">S.No</th>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">Name of the BOS Member</th>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">Designation</th>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">Organization</th>
                          <th className="py-3 px-4 border-b border-gray-200 text-left">Position in JOB</th>
                        </tr>
                      </thead>
                      <tbody>
                        {boardOfStudiesLoading ? (
                          <tr>
                            <td colSpan={5} className="px-4 py-3 text-center text-gray-500">Loading...</td>
                          </tr>
                        ) : boardOfStudies && boardOfStudies.length > 0 ? (
                          boardOfStudies.map((member: BoardOfStudiesMember, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-3 px-4 border-b border-gray-200">{index + 1}</td>
                              <td className="py-3 px-4 border-b border-gray-200">{member.member_name}</td>
                              <td className="py-3 px-4 border-b border-gray-200">{member.designation || ''}</td>
                              <td className="py-3 px-4 border-b border-gray-200">{member.organization || ''}</td>
                              <td className="py-3 px-4 border-b border-gray-200">{member.role}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-3 text-center text-gray-500">No data available.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>

              <details className="cst-dropdown">
                <summary>Board of Studies Meeting Minutes</summary>
                <div className="cst-dropdown-content">
                  {BosMinutesLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : bosminutes && bosminutes.length > 0 ? (
                    <div className="space-y-3">
                      {bosminutes.map((minute: BosMinutes, index: number) => {
                        const formatDate = (dateStr: string) => {
                          const dateOnly = dateStr?.split('T')[0];
                          if (!dateOnly) return dateStr;
                          const [year, month, day] = dateOnly.split('-');
                          return `${day}-${month}-${year}`;
                        };
                        const formattedDate = formatDate(minute.meeting_date);

                        return (
                          <div key={minute.id || index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border">
                            <span className="text-gray-700">
                              Minutes of {minute.meeting_no} meeting of the Board of Studies, dated {formattedDate}
                            </span>

                            {minute.file_url && minute.file_url.trim() !== '' ? (
                              <a
                                href={minute.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline hover:bg-gray-100 ml-4 px-3 py-1 rounded cursor-pointer bg-transparent border border-[#B22222] font-medium focus:outline-none transition-colors duration-200"
                              >
                                View
                              </a>
                            ) : (
                              <span className="text-gray-400 ml-4">No file available</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No meeting minutes available.</div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );

      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

  // return (
  //   <div className="pt-24 bg-gray-100">
  //     <section className="bg-[#8B1919] text-white py-12">
  //       <div className="container mx-auto px-4">
  //         <div className="text-center">
  //           <h1 className="text-3xl md:text-4xl font-bold">Electronics & Communication Engineering</h1>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Fixed Sidebar Component */}
  //     <FixedSidebar
  //       isOpen={sidebarOpen}
  //       onToggle={() => setSidebarOpen(!sidebarOpen)}
  //       onClose={() => setSidebarOpen(false)}
  //       items={sidebarItems}
  //       activeItem={activeContent}
  //       onItemClick={setActiveContent}
  //       title="Electronics & Communication Engineering Department"
  //       buttonLabel="Department Menu"
  //     >
  //       {/* Main Content */}
  //       <div className="container mx-auto px-4 py-8">
  //         <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
  //           {renderContent()}
  //         </div>
  //       </div>
  //     </FixedSidebar>
  //   </div>
  // );
  const renderContentWithTitle = () => {
    // Just return the content without adding another title, since it's already included in content sections
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px]">
        {renderContent()}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DepartmentSidebar
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        title="ECE Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default ECEDepartment;
