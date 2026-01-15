
import React, { useState } from 'react';
import { Briefcase, BookOpen, Award, ExternalLink, Menu, ChevronRight, ChevronDown, Users, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';
import { useEffect } from 'react';
import { useAutoRefresh } from '@/hooks/useAutoRefresh';

const AccordionSection: React.FC<{ title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => (
  <div className="border border-[#B22222] rounded-xl overflow-hidden">
    <button
      className="w-full flex items-center justify-between bg-[#B22222] text-white px-4 py-3"
      onClick={onToggle}
    >
      <span className="font-semibold tracking-wide">{title}</span>
      <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="overflow-x-auto animate-fade-in border-t border-[#B22222]/40 bg-white px-4 pb-4">{children}</div>
    )}
  </div>
);

const MBADepartment: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [faculty, setFaculty] = React.useState<any[]>([]);
  const [nonTeachingFaculty, setNonTeachingFaculty] = React.useState<any[]>([]);
  const [boardOfStudies, setboardOfStudies] = React.useState<any[]>([]);
  const [bosMeetings, setbosMeetings] = React.useState<any[]>([]);
  const [syllabus, setSyllabus] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [facultyDev, setFacultyDev] = React.useState<any[]>([]);
  const [facultyAch, setFacultyAch] = React.useState<any[]>([]);
  const [placement, setPlacement] = React.useState<any[]>([]);
  const [StudentAch, setStudentAch] = React.useState<Record<string, any[]>>({});
  const [workshops, setWorkshops] = React.useState<Record<string, any[]>>({});
  const [handbooks, setHandbooks] = React.useState<any[]>([]);
  const [meritScholarships, setMeritScholarships] = React.useState<any[]>([]);
  const [mous, setMous] = React.useState<any[]>([]);
  const [newsletters, setNewsletters] = React.useState<any[]>([]);
  const [physicalFacilities, setPhysicalFacilities] = React.useState<any[]>([]);
  const [departmentLibrary, setDepartmentLibrary] = React.useState<any>(null);
  const [expandedFdpYears, setExpandedFdpYears] = React.useState<Record<string, boolean>>({});
  const [industrialVisits, setIndustrialVisits] = React.useState<any[]>([]);
  const [accordionOpenState, setAccordionOpenState] = React.useState<Record<string, boolean>>({
    teaching: true,
    nonTeaching: false,
    boardMembers: true,
    boardMeetings: false,
    syllabus: true,
    mous: true,
    fdp: true,
    handbooks: true,
  });
  useEffect(() => {
    fetch('/api/mba/student-achievements') // backend API URL
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('MBA Student Achievements Data:', data);
        setStudentAch(data || {});
      })
      .catch((err) => console.error("Error fetching MBA Student Achievements:", err));
  }, []);

  useEffect(() => {
    fetch('/api/mba/workshops')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('MBA Workshops Data:', data);
        setWorkshops(data || {});
      })
      .catch((err) => console.error("Error fetching MBA Workshops:", err));
  }, []);
  useEffect(() => {
    fetch('/api/mba/placements') // backend API URL
      .then((res) => res.json())
      .then((data) => setPlacement(data)) // assuming your API returns { placements: [...] }
      .catch((err) => console.error("Error fetching MBA Placements:", err));
  }, []);
  useEffect(() => {
    fetch('/api/mba/faculty-profiles') // backend API URL
      .then((res) => res.json())
      .then((data) => {
        // Sort faculty by designation priority
        const sortedFaculty = Array.isArray(data) ? [...data].sort((a, b) => {
          const getDesignationPriority = (member: any) => {
            const des = member.designation?.toLowerCase() || '';
            const qual = member.qualification?.toLowerCase() || '';
            const hasPhD = qual.includes('ph.d') || qual.includes('phd') || qual.includes('ph d');

            if (des.includes('hod') || des.includes('head')) return 1;
            if (des.includes('professor') && !des.includes('assistant') && !des.includes('associate') && hasPhD) return 2;
            if (des.includes('professor') && !des.includes('assistant') && !des.includes('associate')) return 3;
            if (des.includes('associate') && hasPhD) return 4;
            if (des.includes('associate')) return 5;
            if (des.includes('assistant') && hasPhD) return 6;
            if (des.includes('assistant') && des.includes('sr')) return 7;
            if (des.includes('assistant')) return 8;
            return 9;
          };

          const priorityA = getDesignationPriority(a);
          const priorityB = getDesignationPriority(b);

          // If same priority, sort by name alphabetically
          if (priorityA === priorityB) {
            return (a.name || '').localeCompare(b.name || '');
          }

          return priorityA - priorityB;
        }) : data;

        setFaculty(sortedFaculty);
      })
      .catch((err) => console.error("Error fetching Faculty Profiles:", err));
  }, []);
  useEffect(() => {
    fetch('/api/mba/faculty-achievements') // backend API URL
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setFacultyAch(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching Faculty Achievements:", err);
        setFacultyAch([]);
      });
  }, []);

  const groupedData = React.useMemo(() => {
    if (!Array.isArray(facultyAch)) return {};
    return facultyAch.reduce((acc: any, curr) => {
      if (!acc[curr.category]) acc[curr.category] = [];
      acc[curr.category].push(curr);
      return acc;
    }, {});
  }, [facultyAch]);


  useEffect(() => {
    fetch('/api/mba/faculty-development') // backend API URL
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setFacultyDev(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching Faculty Development:", err);
        setFacultyDev([]);
      });
  }, []);

  useEffect(() => {
    fetch('/api/mba/industrial-visits') // backend API URL
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setIndustrialVisits(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching Industrial Visits:", err);
        setIndustrialVisits([]);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/mba/syllabus')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setSyllabus(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Syllabus:", err);
        setSyllabus([]);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch('/api/mba/bos-meetings') // backend API URL
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setbosMeetings(data))
      .catch((err) => {
        console.error("Error fetching BOS meetings:", err);
        setbosMeetings([]);
      });
  }, []);
  React.useEffect(() => {
    fetch("/api/mba/non-teaching-staff")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setNonTeachingFaculty(data.nonTeaching || []);
      })
      .catch((err) => {
        console.error("Error fetching Non-Teaching Staff:", err);
        setNonTeachingFaculty([]);
      });
  }, []);
  React.useEffect(() => {
    fetch("/api/mba/board-of-studies")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setboardOfStudies(data || []);
      })
      .catch((err) => {
        console.error("Error fetching Board of Studies:", err);
        setboardOfStudies([]);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/mba/handbook')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setHandbooks(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching MBA Handbooks:", err);
        setHandbooks([]);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/mba/merit-scholarships')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setMeritScholarships(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching MBA Merit Scholarships:", err);
        setMeritScholarships([]);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/mba/mous')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setMous(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching MBA MoUs:", err);
        setMous([]);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/mba/newsletters')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setNewsletters(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching MBA Newsletters:", err);
        setNewsletters([]);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/mba/physical-facilities')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setPhysicalFacilities(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error fetching MBA Physical Facilities:", err);
        setPhysicalFacilities([]);
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/mba/department-library')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDepartmentLibrary(data[0]); // Get the first record
        }
      })
      .catch((err) => {
        console.error("Error fetching MBA Department Library:", err);
        setDepartmentLibrary(null);
      });
  }, []);

  // Consolidated function to fetch all data - used by both initial load and auto-refresh
  const fetchAllData = React.useCallback(async () => {
    try {
      // Fetch all data in parallel
      const [
        studentAchRes,
        workshopsRes,
        placementsRes,
        facultyRes,
        facultyAchRes,
        facultyDevRes,
        industrialVisitsRes,
        syllabusRes,
        bosMeetingsRes,
        nonTeachingRes,
        bosRes,
        handbookRes,
        scholarshipsRes,
        mousRes,
        newslettersRes,
        facilitiesRes,
        libraryRes
      ] = await Promise.all([
        fetch('/api/mba/student-achievements'),
        fetch('/api/mba/workshops'),
        fetch('/api/mba/placements'),
        fetch('/api/mba/faculty-profiles'),
        fetch('/api/mba/faculty-achievements'),
        fetch('/api/mba/faculty-development'),
        fetch('/api/mba/industrial-visits'),
        fetch('/api/mba/syllabus'),
        fetch('/api/mba/bos-meetings'),
        fetch('/api/mba/non-teaching-staff'),
        fetch('/api/mba/board-of-studies'),
        fetch('/api/mba/handbook'),
        fetch('/api/mba/merit-scholarships'),
        fetch('/api/mba/mous'),
        fetch('/api/mba/newsletters'),
        fetch('/api/mba/physical-facilities'),
        fetch('/api/mba/department-library')
      ]);

      // Process responses
      const [studentAch, workshops, placements, faculty, facultyAch, facultyDev, industrialVisits, syllabus, bosMeetings, nonTeaching, bos, handbooks, scholarships, mous, newsletters, facilities, library] = await Promise.all([
        studentAchRes.json(),
        workshopsRes.json(),
        placementsRes.json(),
        facultyRes.json(),
        facultyAchRes.json(),
        facultyDevRes.json(),
        industrialVisitsRes.json(),
        syllabusRes.json(),
        bosMeetingsRes.json(),
        nonTeachingRes.json(),
        bosRes.json(),
        handbookRes.json(),
        scholarshipsRes.json(),
        mousRes.json(),
        newslettersRes.json(),
        facilitiesRes.json(),
        libraryRes.json()
      ]);

      // Sort faculty by designation priority
      const sortedFaculty = Array.isArray(faculty) ? [...faculty].sort((a, b) => {
        const getDesignationPriority = (member: any) => {
          const des = member.designation?.toLowerCase() || '';
          const qual = member.qualification?.toLowerCase() || '';
          const hasPhD = qual.includes('ph.d') || qual.includes('phd') || qual.includes('ph d');

          if (des.includes('hod') || des.includes('head')) return 1;
          if (des.includes('professor') && !des.includes('assistant') && !des.includes('associate') && hasPhD) return 2;
          if (des.includes('professor') && !des.includes('assistant') && !des.includes('associate')) return 3;
          if (des.includes('associate') && hasPhD) return 4;
          if (des.includes('associate')) return 5;
          if (des.includes('assistant') && hasPhD) return 6;
          if (des.includes('assistant') && des.includes('sr')) return 7;
          if (des.includes('assistant')) return 8;
          return 9;
        };

        const priorityA = getDesignationPriority(a);
        const priorityB = getDesignationPriority(b);

        if (priorityA === priorityB) {
          return (a.name || '').localeCompare(b.name || '');
        }

        return priorityA - priorityB;
      }) : faculty;

      // Update all state
      setStudentAch(studentAch || {});
      setWorkshops(workshops || {});
      setPlacement(placements || []);
      setFaculty(sortedFaculty);
      setFacultyAch(Array.isArray(facultyAch) ? facultyAch : []);
      setFacultyDev(Array.isArray(facultyDev) ? facultyDev : []);
      setIndustrialVisits(Array.isArray(industrialVisits) ? industrialVisits : []);
      setSyllabus(Array.isArray(syllabus) ? syllabus : []);
      setbosMeetings(Array.isArray(bosMeetings) ? bosMeetings : []);
      setNonTeachingFaculty(nonTeaching.nonTeaching || []);
      setboardOfStudies(bos || []);
      setHandbooks(Array.isArray(handbooks) ? handbooks : []);
      setMeritScholarships(Array.isArray(scholarships) ? scholarships : []);
      setMous(Array.isArray(mous) ? mous : []);
      setNewsletters(Array.isArray(newsletters) ? newsletters : []);
      setPhysicalFacilities(Array.isArray(facilities) ? facilities : []);
      if (Array.isArray(library) && library.length > 0) {
        setDepartmentLibrary(library[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching MBA data:', err);
      setLoading(false);
    }
  }, []);

  // Set up auto-refresh with department-specific settings
  useAutoRefresh(fetchAllData, {
    interval: 30000, // Refresh every 30 seconds
    enabled: true,
    onRefresh: () => console.log('✨ Auto-refresh triggered for MBA department'),
    department: 'mba' // Department code for filtering updates
  });

  // Initial data load
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const sidebarItems = [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
    { id: 'Syllabus', label: 'Syllabus', icon: <BookOpen className="w-4 h-4" /> },
    //{ id: 'Physical Facilities', label: 'Physical Facilities', icon: <HardHat className="w-4 h-4" /> },
    //{ id: 'Department Library', label: 'Department Library', icon: <Library className="w-4 h-4" /> },
    { id: 'MoUs', label: 'MoUs', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Faculty Development Programs', label: 'Faculty Development Programs', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Faculty Achievements', label: 'Faculty Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Presentation className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Merit Scholarship/Academic Toppers', label: 'Merit Scholarship/Academic Toppers', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Technical Association', label: 'Technical Association', icon: <Activity className="w-4 h-4" /> },
    { id: 'Training Activities', label: 'Training Activities', icon: <Activity className="w-4 h-4" /> },
    { id: 'Newsletters', label: 'Newsletters', icon: <Rss className="w-4 h-4" /> },
    { id: 'Extra-Curricular Activities', label: 'Extra-Curricular Activities', icon: <Activity className="w-4 h-4" /> },
    //{ id: 'Hackathons', label: 'Hackathons', icon: <Activity className="w-4 h-4" /> },
    // { id: 'e-Resources', label: 'e-Resources', icon: <Wifi className="w-4 h-4" /> },
    //{ id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> }
  ];

  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

  const toggleAccordion = (key: string) => {
    setAccordionOpenState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const facultyAccordionSections = [
    {
      key: 'teaching',
      title: 'Teaching Faculty',
      content: (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">S.No.</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Qualification</th>
              <th scope="col" className="px-6 py-3">Designation</th>
              <th scope="col" className="px-6 py-3">Profile</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((member, index) => (
              <tr key={index} className="bg-white border-b last:border-b-0 border-gray-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                <td className="px-6 py-4">{member.qualification}</td>
                <td className="px-6 py-4">{member.designation}</td>
                <td className="px-6 py-4">
                  <a
                    href={member.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#B22222] hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      key: 'nonTeaching',
      title: 'Non-Teaching Staff',
      content: (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">S.No.</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Designation</th>
            </tr>
          </thead>
          <tbody>
            {nonTeachingFaculty.map((member, index) => (
              <tr key={index} className="bg-white border-b last:border-b-0 border-gray-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                <td className="px-6 py-4">{member.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  const renderDeptTabContent = () => {
    switch (activeDeptTab) {
      case 'Department':
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 mb-3 text-justify">
              The Department of Business Administraiton have it's own
              Assocaiton called RAYS (Reflective Altitutde Yander in
              Serenity). RAYS is the Association name of Department of
              MBA of Sri Vasavi Engineering College, Pedatadepalli. The
              association is formed during the academic year 2011-12.
              The formation function of the assocation took on
              31-March-2012.
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
                      <td className="border border-gray-300 px-4 py-3">Master of Business Administration</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">AP ICET</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">2 Years</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">120</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Vision':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
            <p className="text-gray-700">
              To nurture young leaders to be global business executives with high ethical values.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To prepare business leaders by providing quality education with a strong foundation of knowledge and skills.</li>
              <li>To enhance analytical skills and decision making capabilities.</li>
              <li>To promote research and publication.</li>
              <li>To develop professionally competent and socially responsible business leaders with ethical values.</li>
            </ul>
          </div>
        );
      case 'PEOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Educational Objectives (PEOs)</h3>
            <p className="text-gray-700 mb-4">After 3-5 years of graduation, the graduates will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 1</h4>
                <p className="text-gray-700">Excel in business, management and leadership roles by applying management knowledge and skills.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 2</h4>
                <p className="text-gray-700">Demonstrate ethical practices, social responsibility and professional conduct in the dynamic business environment.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PEO 3</h4>
                <p className="text-gray-700">Pursue higher education, research and lifelong learning to continuously upgrade knowledge and skills.</p>
              </div>
            </div>
          </div>
        );
      case 'POs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes (POs)</h3>
            <p className="text-gray-700 mb-4">After the completion of MBA, the graduates will be able to:</p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO1: Business Knowledge</h4>
                <p className="text-gray-700">Apply knowledge of management theories and practices to solve business problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO2: Strategic Thinking</h4>
                <p className="text-gray-700">Foster analytical and strategic thinking abilities for decision-making.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO3: Critical Thinking</h4>
                <p className="text-gray-700">Analyze business problems in unpredictable environments to formulate strategies.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO4: Communication Skills</h4>
                <p className="text-gray-700">Demonstrate effective oral and written communication skills in presenting business issues.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO5: Leadership and Teamwork</h4>
                <p className="text-gray-700">Demonstrate leadership and team membership skills in business scenarios.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO6: Global Perspective</h4>
                <p className="text-gray-700">Recognize global business issues and practices in an ethical, legal and professional context.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO7: Ethical Practices</h4>
                <p className="text-gray-700">Apply ethical principles to business situations and demonstrate responsible citizenship.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO8: IT Skills</h4>
                <p className="text-gray-700">Utilize appropriate technology and tools for solving business problems.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-blue-800">PO9: Lifelong Learning</h4>
                <p className="text-gray-700">Recognize the need for and engage in continuous professional development.</p>
              </div>
            </div>
          </div>
        );
      case 'PSOs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Specific Outcomes (PSOs)</h3>
            <p className="text-gray-700 mb-4">After the completion of MBA, the graduates will be able to:</p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 1</h4>
                <p className="text-gray-700">Apply functional area knowledge and managerial skills to solve real-world business problems.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-blue-800">PSO 2</h4>
                <p className="text-gray-700">Demonstrate entrepreneurial competencies with a global outlook on business environment.</p>
              </div>
            </div>
          </div>
        );
      case 'COs':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Outcomes (COs)</h3>
            <p className="text-gray-700 mb-4">
              The course outcomes for all courses offered by the MBA department are designed to align with program outcomes and educational objectives.
            </p>
            <div className="mb-4">
              <a
                href="https://srivasaviengg.ac.in/uploads/mba/COs.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 items-center"
              >
                <Download className="w-4 h-4 mr-2" /> Download Course Outcomes
              </a>
            </div>
          </div>
        );
      case 'SalientFeatures':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Salient Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Highly qualified and experienced faculty</li>
              <li>Well-established MoU with Star Health and Allied Insurance Company Ltd</li>
              <li>Active Technical Association (RAYS)</li>
              <li>Regular industrial visits and guest lectures</li>
              <li>Focus on practical learning through case studies</li>
              <li>Regular workshops and seminars on current business trends</li>
              <li>Good placement record in various sectors</li>
              <li>Strong alumni network in diverse industries</li>
              <li>Focus on entrepreneurship development</li>
              <li>Comprehensive training programs for skill development</li>
              <li>Regular faculty development programs</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Department Overview</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              The Master of Business Administration (MBA) program at Sri Vasavi Engineering College provides
              comprehensive business education designed to develop future leaders and managers. The program combines
              theoretical knowledge with practical applications, preparing students for leadership roles in various
              sectors of the business world.
            </p>
            <div className="mt-8">
              <h4 className="text-xl font-bold text-[#B22222] mb-4 text-center">Course Details</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-green-700 text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sl.No</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Program</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Eligibility</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Duration</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Intake</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="border border-gray-300 px-4 py-3 text-center">1</td>
                      <td className="border border-gray-300 px-4 py-3">MBA</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">Graduation + ICET</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">2 Years</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
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
                  ))}                </div>
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

              {/* HOD Information (Static for now) */}
              {activeDeptTab === 'Department' && (
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8 animate-fade-in">
                  <div className="md:w-1/3">
                    <img
                      src="/mbaHosd1.jpeg"
                      alt="Mr. D. Naveen Kumar"
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold text-[#B22222] mb-2">Mr. D. Naveen Kumar</h3>
                    <p className="text-gray-700 mb-2">Sr.Asst.Professor & Head of Department, MBA</p>
                    <p className="text-gray-700 mb-2">Phone No: 08818-284355(O)-(Ext.-364)</p>
                    <p className="text-gray-700 mb-2">Fax No: 08818-284322</p>
                    <p className="text-gray-700 mb-2">
                      <a href="mailto:hod_mba@srivasaviengg.ac.in" className="text-[#B22222] hover:underline">hod_mba@srivasaviengg.ac.in</a>
                    </p>
                    <p className="text-gray-700 text-lg text-justify">
                      The Department of Business Administration has its own Association called RAYS (Reflective Altitude Yander in
                      Serenity). RAYS is the Association name of Department of MBA of Sri Vasavi Engineering College, Pedatadepalli. The
                      association was formed during the academic year 2011-12. The formation function of the association took place on
                      31-March-2012.
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
                              className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${isActive
                                ? 'bg-gradient-to-r from-[#B22222] to-[#B22222] text-white shadow-lg scale-105'
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
                                    {section === 'Department' && 'Overview and Course Details'}
                                    {section === 'Vision' && 'Department Vision Statement'}
                                    {section === 'Mission' && 'Department Mission Statement'}
                                    {section === 'PEOs' && 'Program Educational Objectives'}
                                    {section === 'POs' && 'Program Outcomes'}
                                    {section === 'PSOs' && 'Program Specific Outcomes'}
                                    {section === 'COs' && 'Course Outcomes'}
                                    {section === 'SalientFeatures' && 'Key Highlights'}
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
                className="md:hidden fixed right-3 bottom-6 z-40 w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#B22222] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
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

              {/* Tab Content */}
              <div>
                {renderDeptTabContent()}
              </div>
            </div>
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
                  {faculty && faculty.length > 0 ? (
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
                          {faculty.map((member, index) => (
                            <tr key={member.id || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.qualification || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                              <td className="px-6 py-4">
                                {(member.profile_url || member.profileUrl) ? (
                                  <a
                                    href={member.profile_url || member.profileUrl}
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
                      <div className="text-gray-500">
                        {faculty ? 'No teaching faculty data available.' : 'Loading teaching faculty...'}
                      </div>
                    </div>
                  )}
                </div>
              </details>

              <details className="cst-dropdown">
                <summary>Non-Teaching Staff</summary>
                <div className="cst-dropdown-content">
                  {nonTeachingFaculty && nonTeachingFaculty.length > 0 ? (
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
                          {nonTeachingFaculty.map((member, index) => (
                            <tr key={member.id || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4">{index + 1}</td>
                              <td className="px-6 py-4 font-medium text-gray-900">{member.name || 'N/A'}</td>
                              <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">
                        {nonTeachingFaculty ? 'No non-teaching staff data available.' : 'Loading non-teaching staff...'}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        );

      case 'Board of Studies':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>

            <div className="space-y-6">
              <AccordionSection
                title="Board of Studies Members"
                isOpen={accordionOpenState.boardMembers}
                onToggle={() => toggleAccordion('boardMembers')}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">S.No</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Designation</th>
                        <th scope="col" className="px-6 py-3">Organization</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Array.isArray(boardOfStudies) ? boardOfStudies : []).map((member: any, index: number) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{member.name || '-'}</td>
                          <td className="px-6 py-4">{member.designation || '-'}</td>
                          <td className="px-6 py-4">{member.organization || '-'}</td>
                          <td className="px-6 py-4">{member.position_in_job || '-'}</td>
                        </tr>
                      ))}
                      {(!Array.isArray(boardOfStudies) || boardOfStudies.length === 0) && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                            No board of studies members available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </AccordionSection>

              <AccordionSection
                title="Board of Studies Meeting Minutes"
                isOpen={accordionOpenState.boardMeetings}
                onToggle={() => toggleAccordion('boardMeetings')}
              >
                {Array.isArray(bosMeetings) && bosMeetings.length > 0 ? (
                  <ul className="space-y-3">
                    {bosMeetings.map((meeting: any) => (
                      <li key={meeting.id ?? meeting.meeting_number} className="flex items-start">
                        <span className="mr-2">•</span>
                        <div>
                          Minutes of {meeting.meeting_number || "-"}
                          <sup>
                            {meeting.meeting_number === "1"
                              ? "st"
                              : meeting.meeting_number === "2"
                                ? "nd"
                                : meeting.meeting_number === "3"
                                  ? "rd"
                                  : "th"}
                          </sup>{" "}
                          meeting of the Board of Studies, dated{" "}
                          {meeting.meeting_date
                            ? new Date(meeting.meeting_date).toLocaleDateString("en-GB")
                            : "-"}
                          {meeting.document_url && (
                            <a
                              href={meeting.document_url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-blue-600 hover:underline"
                            >
                              - View
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No meeting minutes available.</p>
                )}
              </AccordionSection>
            </div>
          </div>
        );

      case 'MoUs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Memorandums of Understanding (MoUs)</h2>

            <div className="space-y-4">
              <details open className="cst-dropdown">
                <summary>MoU Details</summary>
                <div className="cst-dropdown-content">
                  <div className="space-y-6">
                    {/* Hardcoded Star Health MoU */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold text-gray-800">Star Health and Allied Insurance Company Ltd</h3>
                      <p className="text-gray-600 mt-2">A leading health insurance provider offering comprehensive insurance solutions.</p>
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/22%20Star%20Health%2020230717180414256.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center mt-3 text-[#B22222] hover:underline"
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View Details
                      </a>
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Key Benefits</h4>
                        <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                          <li>Industry exposure through internships and training programs</li>
                          <li>Guest lectures by industry professionals</li>
                          <li>Career opportunities for students in the insurance sector</li>
                          <li>Research collaboration opportunities</li>
                        </ul>
                      </div>
                    </div>

                    {/* Dynamic MoUs from database */}
                    {mous.map((mou, index) => (
                      <div key={mou.id || index} className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-800">{mou.mou_with}</h3>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">From:</span> {mou.from_date}</p>
                          <p><span className="font-medium">To:</span> {mou.to_date}</p>
                          <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">{mou.status}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            </div>
          </div>
        );

      case 'Faculty Development Programs':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Faculty Development Programs
            </h2>

            <div className="space-y-4">
              <details open className="cst-dropdown">
                <summary>Faculty Development Programs</summary>
                <div className="cst-dropdown-content">
                  <div className="space-y-3">
                    {facultyDev.length > 0 ? (
                      // Group by year
                      Object.entries(
                        facultyDev.reduce((acc: Record<string, any[]>, item: any) => {
                          const year = item.year || 'Unknown Year';
                          if (!acc[year]) acc[year] = [];
                          acc[year].push(item);
                          return acc;
                        }, {})
                      )
                        .sort(([yearA], [yearB]) => {
                          // Sort years in descending order
                          return yearB.localeCompare(yearA);
                        })
                        .map(([year, items]: [string, any[]]) => {
                          const isExpanded = expandedFdpYears[year] || false;
                          return (
                            <div key={year}>
                              <button
                                onClick={() => {
                                  setExpandedFdpYears(prev => ({
                                    ...prev,
                                    [year]: !prev[year]
                                  }));
                                }}
                                className="text-[#B22222] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
                              >
                                FDPs attended during the Academic Year {year}
                                <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                              </button>
                              {isExpanded && (
                                <ul className="list-disc pl-6 mt-2 space-y-1 ml-4">
                                  {items.map((item: any, idx: number) => (
                                    <li key={idx} className="text-gray-700">
                                      <span className="font-medium">{item.title || item.program_title}</span>
                                      {item.type && <span className="text-sm text-gray-600"> - {item.type}</span>}
                                      {item.file_url && (
                                        <a
                                          href={item.file_url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="ml-2 text-[#B22222] hover:underline inline-flex items-center"
                                        >
                                          <FileText className="h-4 w-4 mr-1" />
                                          View
                                        </a>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })
                    ) : (
                      <p className="text-gray-500">No data available</p>
                    )}
                  </div>
                </div>
              </details>
            </div>
          </div>
        );


      case 'Faculty Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">
              Faculty Achievements
            </h2>

            {Object.keys(groupedData).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No faculty achievements data available.</p>
                <p className="text-gray-400 text-sm mt-2">Please check the console for any errors.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.keys(groupedData).map((type) => (
                  <details key={type} open={type === "Patents"} className="cst-dropdown">
                    <summary>{type}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        {groupedData[type].map((item: any, idx: number) => (
                          <li key={idx}>
                            {item.title}
                            {item.file_url && (
                              <a
                                href={item.file_url}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-2 text-[#B22222] hover:underline inline-flex items-center"
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                View Details
                              </a>
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


      case 'Placements': {
        const sortedPlacements = Array.isArray(placement)
          ? [...placement].sort((a, b) => (b.batch || '').localeCompare(a.batch || ''))
          : [];

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Placements</h2>

            <div className="space-y-4">
              {sortedPlacements.length > 0 ? (
                sortedPlacements.map((item: any, index: number) => (
                  <details key={item.id || index} open={index === 0} className="cst-dropdown">
                    <summary>{item.batch ? `Placement Batch ${item.batch}` : 'Placement Details'}</summary>
                    <div className="cst-dropdown-content">
                      <ul className="list-disc pl-6 my-2 space-y-2">
                        <li className="text-gray-700">
                          <span>{item.title || 'Placement report'}</span>
                          {item.file_url && (
                            <a
                              href={item.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-[#B22222] hover:underline inline-flex items-center"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View Details
                            </a>
                          )}
                        </li>
                      </ul>
                    </div>
                  </details>
                ))
              ) : (
                <p className="text-center text-gray-500">No placement data available.</p>
              )}
            </div>
          </div>
        );
      }

      case 'Workshops':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops</h2>

            <div className="space-y-4">
              {workshops && Object.keys(workshops).length > 0 ? (
                Object.entries(workshops).map(([category, items]: [string, any[]]) => (
                  <details key={category} open className="cst-dropdown">
                    <summary>{category}</summary>
                    <div className="cst-dropdown-content">
                      {items && items.length > 0 ? (
                        <ul className="list-disc pl-6 my-2 space-y-2">
                          {items.map((item: any) => (
                            <li key={item.id}>
                              {item.title}
                              {item.year && ` (${item.year})`}
                              {item.file_url && (
                                <>
                                  {' - '}
                                  <a
                                    href={item.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline inline-flex items-center gap-1"
                                  >
                                    <FileText className="w-4 h-4" />
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
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No workshops available.</p>
              )}
            </div>
          </div>
        );

      case 'Student Achievements':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>

            <div className="space-y-4">
              {StudentAch && Object.keys(StudentAch).length > 0 ? (
                Object.entries(StudentAch).map(([category, achievements]: [string, any[]]) => (
                  <details key={category} open className="cst-dropdown">
                    <summary>{category}</summary>
                    <div className="cst-dropdown-content">
                      {achievements && achievements.length > 0 ? (
                        <ul className="list-disc pl-6 my-2 space-y-2">
                          {achievements.map((achievement: any) => (
                            <li key={achievement.id}>
                              {achievement.title}
                              {achievement.year && ` (${achievement.year})`}
                              {achievement.file_url && (
                                <>
                                  {' - '}
                                  <a
                                    href={achievement.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#B22222] hover:underline inline-flex items-center gap-1"
                                  >
                                    <FileText className="w-4 h-4" />
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
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No student achievements available.</p>
              )}
            </div>
          </div>
        );

      case 'Technical Association':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Technical Association</h2>

            <div className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-gray-700">
                  The Department of Business Administration has its own Association called RAYS (Reflective Altitude Yander in
                  Serenity). RAYS is the Association name of Department of MBA of Sri Vasavi Engineering College, Pedatadepalli. The
                  association was formed during the academic year 2011-12. The formation function of the association took place on
                  31-March-2012.
                </p>

                <div className="mt-4 text-center">
                  <a
                    href="https://www.mediafire.com/download/8qh1qg6d3ws7hk3/SAADHANA+-+1ST+COPY.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#B22222] text-white rounded-md hover:bg-[#B22222] transition-colors"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Download SAADHANA NEWS Letter
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-4">RAYS Objectives</h3>
                <ul className="space-y-4 list-disc pl-6 text-gray-700">
                  <li>Create a Flora where future managers create a dias for caringly sharing their knowledge.</li>
                  <li>To initiate a culture of togetherness in achieving synergistic results.</li>
                  <li>To implant a strong urge in everyone to rise to every opportunity and stand to the requirements of Industry.</li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-4">President's Message</h3>
                <div className="flex justify-center">
                  <img
                    src="/images/departments/mba/president.png"
                    alt="President's Message"
                    className="w-full h-auto object-cover rounded-lg shadow-md max-w-xl"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-[#B22222] mb-4">Secretary and Correspondent's Message</h3>
                <div className="flex justify-center">
                  <img
                    src="/images/departments/mba/secretary.png"
                    alt="Secretary and Correspondent's Message"
                    className="w-full h-auto object-cover rounded-lg shadow-md max-w-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'Physical Facilities': {
        // Group by facility_type
        const types = Array.from(new Set(physicalFacilities.map(f => f.facility_type || 'Other')));
        const grouped = types.map(type => ({
          type: type,
          items: physicalFacilities.filter(f => (f.facility_type || 'Other') === type)
        }));

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>
            {physicalFacilities.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No physical facilities data available.</p>
            ) : (
              <div className="space-y-4">
                {grouped.map((group, index) => (
                  <details key={group.type} open={index === 0} className="cst-dropdown">
                    <summary>{group.type}</summary>
                    <div className="cst-dropdown-content">
                      <div className="space-y-4">
                        {group.items.map((facility, idx) => (
                          <div key={facility.id || idx} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <h4 className="text-lg font-semibold text-[#B22222] mb-2">{facility.facility_name}</h4>
                            {facility.capacity && (
                              <p className="text-gray-700 mb-1">
                                <span className="font-semibold">Capacity:</span> {facility.capacity}
                              </p>
                            )}
                            {facility.location && (
                              <p className="text-gray-700 mb-1">
                                <span className="font-semibold">Location:</span> {facility.location}
                              </p>
                            )}
                            {facility.description && (
                              <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Description:</span> {facility.description}
                              </p>
                            )}
                            {facility.equipment_details && (
                              <p className="text-gray-700 mb-1">
                                <span className="font-semibold">Equipment:</span> {facility.equipment_details}
                              </p>
                            )}
                            {facility.status && (
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${facility.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' :
                                facility.status.toLowerCase() === 'inactive' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                {facility.status}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        );
      }

      case 'Department Library': {
        if (!departmentLibrary) {
          return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center">Loading...</div>;
        }
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Library</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="md:w-1/2">
                {departmentLibrary.image_url && (
                  <img
                    src={departmentLibrary.image_url}
                    alt="MBA Department Library"
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                )}
              </div>
              <div className="md:w-1/2">
                <p className="text-gray-700 text-lg text-justify">
                  {departmentLibrary.description || 'No description available.'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                <h5 className="text-lg font-semibold text-center text-[#B22222] mb-2">No. of Titles</h5>
                <p className="text-2xl font-bold text-red-600 text-center">{departmentLibrary.titles}</p>
              </div>
              <div className="bg-white border rounded-lg shadow p-6 flex flex-col items-center">
                <h5 className="text-lg font-semibold text-center text-green-700 mb-2">No. of Volumes</h5>
                <p className="text-2xl font-bold text-green-600 text-center">{departmentLibrary.volumes}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-[#B22222] mb-4">Faculty Incharge</h3>
              <ul className="text-center space-y-2 list-none">
                <li className="text-lg font-medium">{departmentLibrary.faculty_incharge}</li>
                {departmentLibrary.phone && <li className="text-lg">Phone: {departmentLibrary.phone}</li>}
                {departmentLibrary.email && (
                  <li className="text-lg">
                    E-mail: <a href={`mailto:${departmentLibrary.email}`} className="text-[#B22222] hover:underline">{departmentLibrary.email}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        );
      }

      case 'Newsletters': {
        // Group newsletters by year for better UX
        const grouped = newsletters.reduce((acc, n) => {
          const year = n.year || 'Unknown';
          if (!acc[year]) acc[year] = [];
          acc[year].push(n);
          return acc;
        }, {} as Record<string, any[]>);

        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Newsletters</h2>
            <div className="space-y-4">
              {Object.entries(grouped).sort(([yearA], [yearB]) => yearB.localeCompare(yearA)).map(([year, items], index) => (
                <details key={year} open={index === 0} className="cst-dropdown">
                  <summary>{year} Newsletters</summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-none pl-0 my-2">
                      {(items as any[]).map((item: any) => (
                        <li key={item.id} className="p-2">
                          {item.title} -{' '}
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B22222] hover:underline"
                          >
                            View
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        );
      }
      case 'Department Alumni':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Alumni</h2>
            <div className="space-y-4">
              <details open className="cst-dropdown">
                <summary>Core Committee 2022-2023</summary>
                <div className="cst-dropdown-content">
                  <ul className="list-disc pl-6 my-2 space-y-2">
                    <li>
                      SVEC-MBA Alumni List
                      <a
                        href="https://srivasaviengg.ac.in/uploads/mba/MBA%20ALUMNI%20list.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-[#B22222] hover:underline inline-flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View Details
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        );
      case 'Extra-Curricular Activities':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Extra-Curricular Activities</h2>
            <div className="flex justify-center items-center">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-sm text-left text-gray-500 border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="text-center py-3 px-2 font-medium text-gray-700" colSpan={5}>
                        DETAIL OF INDUSTRIAL VISITS(Total No: {industrialVisits.length})
                      </th>
                    </tr>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="py-3 px-2 font-medium text-gray-700">S.No.</th>
                      <th className="py-3 px-2 font-medium text-gray-700">Date Of Visit</th>
                      <th className="py-3 px-2 font-medium text-gray-700">Batch</th>
                      <th className="py-3 px-2 font-medium text-gray-700 text-center">Companies Visited</th>
                      <th className="py-3 px-2 font-medium text-gray-700 text-center">Place Of Company / Faculty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industrialVisits.length > 0 ? (
                      industrialVisits.map((visit: any, index: number) => (
                        <tr key={visit.id || index} className="border-b border-gray-300 hover:bg-gray-50">
                          <td className="py-2 px-2">{visit.sno || index + 1}</td>
                          <td className="py-2 px-2">
                            {visit.date_of_visit ? new Date(visit.date_of_visit).toLocaleDateString('en-GB') : 'N/A'}
                          </td>
                          <td className="py-2 px-2">{visit.batch || 'N/A'}</td>
                          <td className="py-2 px-2">
                            {visit.companies_visited || 'N/A'}
                          </td>
                          <td className="py-2 px-2">
                            <div className="text-sm">
                              <div className="font-medium">{visit.place_of_company || 'N/A'}</div>
                              {visit.coordinating_faculty && (
                                <div className="text-gray-600 mt-1 whitespace-pre-line text-xs">
                                  {visit.coordinating_faculty}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-4 px-2 text-center text-gray-500">
                          No industrial visit data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Syllabus': {
        // Group syllabus by type or year
        const types = Array.from(new Set(syllabus.map(s => s.type || s.year || 'MBA Syllabus')));
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Syllabus</h2>
            <div className="space-y-6">
              {types.map((type, index) => (
                <details key={type} open={index === 0} className="cst-dropdown">
                  <summary>{type}</summary>
                  <div className="cst-dropdown-content">
                    <ul className="list-disc pl-6 my-2">
                      {syllabus.filter(s => (s.type || s.year || 'MBA Syllabus') === type).map((item, idx) => (
                        <li key={idx}>
                          {item.title || item.subject || `${item.year} Syllabus`}
                          {(item.pdf_url || item.file_url || item.fileUrl) && (
                            <>
                              {' '}
                              <a
                                href={item.pdf_url || item.file_url || item.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#B22222] hover:underline"
                              >
                                - View
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
      }

      case 'Handbooks':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Handbooks</h2>

            <AccordionSection
              title="MBA Handbooks"
              isOpen={accordionOpenState.handbooks}
              onToggle={() => toggleAccordion('handbooks')}
            >
              {handbooks.length === 0 ? (
                <p className="text-center text-gray-600">No handbooks available.</p>
              ) : (
                <div className="space-y-4">
                  {handbooks.map((handbook, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">{handbook.title}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center">
                              <span className="font-medium mr-1">Academic Year:</span>
                              {handbook.academic_year}
                            </span>
                            {handbook.semester && (
                              <span className="flex items-center">
                                <span className="font-medium mr-1">Semester:</span>
                                {handbook.semester}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <a
                            href={handbook.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Handbook
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AccordionSection>
          </div>
        );

      case 'Merit Scholarship/Academic Toppers':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Merit Scholarship/Academic Toppers</h2>

            {meritScholarships.length === 0 ? (
              <p className="text-center text-gray-600">No merit scholarship data available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 border-collapse">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 border border-gray-300">S.No</th>
                      <th scope="col" className="px-6 py-3 border border-gray-300">Academic Year</th>
                      <th scope="col" className="px-6 py-3 border border-gray-300">Particulars</th>
                      <th scope="col" className="px-6 py-3 border border-gray-300">Students Benefited</th>
                      <th scope="col" className="px-6 py-3 border border-gray-300">Scholarship Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meritScholarships.map((scholarship, index) => (
                      <tr key={scholarship.id || index} className="bg-white border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border border-gray-300 text-center">{index + 1}</td>
                        <td className="px-6 py-4 border border-gray-300 font-medium text-gray-900">{scholarship.academic_year}</td>
                        <td className="px-6 py-4 border border-gray-300">{scholarship.particulars}</td>
                        <td className="px-6 py-4 border border-gray-300 text-center">{scholarship.students_benefited}</td>
                        <td className="px-6 py-4 border border-gray-300 text-right font-medium">
                          ₹{parseInt(scholarship.scholarship_amount || '0').toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 font-semibold">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 border border-gray-300 text-right">Total:</td>
                      <td className="px-6 py-4 border border-gray-300 text-center">
                        {meritScholarships.reduce((sum, s) => sum + parseInt(s.students_benefited || '0'), 0)}
                      </td>
                      <td className="px-6 py-4 border border-gray-300 text-right text-[#B22222]">
                        ₹{meritScholarships.reduce((sum, s) => sum + parseInt(s.scholarship_amount || '0'), 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        );

      default:
        return <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center"><h3 className="text-xl font-semibold text-gray-600">Content for {activeContent} coming soon...</h3></div>;
    }
  }

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
        title="MBA Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );

};

export default MBADepartment;

