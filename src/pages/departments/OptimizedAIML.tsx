import React, { memo, useMemo, useCallback } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from '../../components/FixedSidebar';
import { useOptimizedTabLoader } from '../../hooks/useOptimizedTabLoader';
import { useMemoizedQueries } from '../../hooks/useMemoizedData';

// Memoized tab content components
const DepartmentOverview = memo(() => (
  <div className="mb-10">
    <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Overview</h2>
    <p className="text-gray-700 leading-relaxed">
      The Department of Artificial Intelligence and Machine Learning was established in 2019 with the vision to create skilled professionals in the rapidly evolving field of AI and ML. The department offers undergraduate programs with an intake of 60 students, focusing on cutting-edge technology and research.
    </p>
  </div>
));

const VisionSection = memo(() => (
  <div className="mb-10">
    <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Vision</h2>
    <p className="text-gray-700 leading-relaxed text-center italic text-lg">
      To be a center of excellence in Artificial Intelligence and Machine Learning education, producing innovative professionals who can shape the future of technology.
    </p>
  </div>
));

const MissionSection = memo(() => (
  <div className="mb-10">
    <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Mission</h2>
    <ul className="text-gray-700 space-y-3">
      <li className="flex items-start">
        <span className="text-[#B22222] mr-2">•</span>
        To provide quality education in Artificial Intelligence and Machine Learning
      </li>
      <li className="flex items-start">
        <span className="text-[#B22222] mr-2">•</span>
        To foster research and innovation in AI/ML technologies
      </li>
      <li className="flex items-start">
        <span className="text-[#B22222] mr-2">•</span>
        To develop industry-ready professionals with strong technical and ethical foundations
      </li>
      <li className="flex items-start">
        <span className="text-[#B22222] mr-2">•</span>
        To promote interdisciplinary collaboration and lifelong learning
      </li>
    </ul>
  </div>
));

const TabNavigation = memo(({ 
  tabs, 
  activeTab, 
  onTabChange, 
  isTransitioning 
}: { 
  tabs: string[], 
  activeTab: string, 
  onTabChange: (tab: string) => void,
  isTransitioning: boolean 
}) => (
  <div className="space-y-4">
    {/* Row 1: Department, Vision */}
    <div className="flex justify-center gap-4 mb-4">
      {tabs.slice(0, 2).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          disabled={isTransitioning}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform ${
            activeTab === tab
              ? 'bg-[#B22222] text-white scale-105 shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
          } ${isTransitioning ? 'pointer-events-none opacity-50' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
    
    {/* Row 2: Mission, PEOs, POs */}
    <div className="flex justify-center gap-4 mb-4">
      {tabs.slice(2, 5).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          disabled={isTransitioning}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform ${
            activeTab === tab
              ? 'bg-[#B22222] text-white scale-105 shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
          } ${isTransitioning ? 'pointer-events-none opacity-50' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Row 3: PSOs, COs */}
    <div className="flex justify-center gap-4 mb-4">
      {tabs.slice(5, 7).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          disabled={isTransitioning}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform ${
            activeTab === tab
              ? 'bg-[#B22222] text-white scale-105 shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
          } ${isTransitioning ? 'pointer-events-none opacity-50' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Row 4: Salient Features */}
    <div className="flex justify-center gap-4 mb-6">
      {tabs.slice(7).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          disabled={isTransitioning}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform ${
            activeTab === tab
              ? 'bg-[#B22222] text-white scale-105 shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
          } ${isTransitioning ? 'pointer-events-none opacity-50' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
));

// Main optimized AIML component
const OptimizedAIMLDepartment: React.FC = memo(() => {
  // Optimized tab management
  const {
    activeTab: activeDeptTab,
    isTransitioning,
    switchTab: switchDeptTab
  } = useOptimizedTabLoader('Department', { animationDuration: 150 });

  // Memoized sidebar state
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeContent, setActiveContent] = React.useState('Department Profile');

  // Memoized API data fetching with caching
  const {
    faculty,
    workshops,
    studentAchievements,
    placements,
    handbooks,
    isLoading
  } = useMemoizedQueries({
    faculty: {
      key: 'aiml-faculty',
      fetcher: () => fetch('/api/aiml/faculty?dept=aiml').then(res => res.json()),
      options: { cacheTime: 10 * 60 * 1000 } // 10 minutes cache
    },
    workshops: {
      key: 'aiml-workshops',
      fetcher: () => fetch('/api/aiml/aiml-workshops?dept=aiml').then(res => res.json()),
      options: { cacheTime: 5 * 60 * 1000 } // 5 minutes cache
    },
    studentAchievements: {
      key: 'aiml-student-achievements',
      fetcher: () => fetch('/api/aiml/student-achievements?dept=aiml').then(res => res.json()),
      options: { cacheTime: 5 * 60 * 1000 }
    },
    placements: {
      key: 'aiml-placements',
      fetcher: () => fetch('/api/aiml/aiml-placements?dept=aiml').then(res => res.json()),
      options: { cacheTime: 10 * 60 * 1000 }
    },
    handbooks: {
      key: 'aiml-handbooks',
      fetcher: () => fetch('/api/aiml/aiml-handbooks?dept=aiml').then(res => res.json()),
      options: { cacheTime: 15 * 60 * 1000 } // 15 minutes cache for handbooks
    }
  });

  // Memoized static data
  const sidebarItems = useMemo(() => [
    { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'Student Achievements', label: 'Student Achievements', icon: <Award className="w-4 h-4" /> },
    { id: 'Labs and Facilities', label: 'Labs and Facilities', icon: <HardHat className="w-4 h-4" /> },
    { id: 'Research and Development', label: 'Research and Development', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'Student Life', label: 'Student Life', icon: <Activity className="w-4 h-4" /> },
    { id: 'Academic Resources', label: 'Academic Resources', icon: <Library className="w-4 h-4" /> },
    { id: 'Industry Collaborations', label: 'Industry Collaborations', icon: <Handshake className="w-4 h-4" /> },
    { id: 'Handbooks', label: 'Handbooks', icon: <FileText className="w-4 h-4" /> },
    { id: 'Contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> }
  ], []);

  const departmentTabs = useMemo(() => [
    'Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'
  ], []);

  // Memoized tab content renderer
  const renderDeptTabContent = useCallback(() => {
    switch (activeDeptTab) {
      case 'Department':
        return <DepartmentOverview />;
      case 'Vision':
        return <VisionSection />;
      case 'Mission':
        return <MissionSection />;
      case 'PEOs':
        return (
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Program Educational Objectives (PEOs)</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">PEO1: Technical Excellence</h3>
                <p className="text-gray-700">Graduates will demonstrate technical excellence in AI/ML core areas and emerging technologies.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">PEO2: Innovation & Research</h3>
                <p className="text-gray-700">Graduates will engage in innovative research and development in AI/ML applications.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">PEO3: Professional Growth</h3>
                <p className="text-gray-700">Graduates will advance in their careers through continuous learning and professional development.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">{activeDeptTab}</h2>
            <p className="text-gray-700 leading-relaxed text-center">
              Content for {activeDeptTab} will be displayed here.
            </p>
          </div>
        );
    }
  }, [activeDeptTab]);

  // Memoized content renderer
  const renderContent = useCallback(() => {
    switch (activeContent) {
      case 'Department Profile':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Department Profile</h2>

              {/* HOD Information */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
                <div className="relative">
                  <img
                    src="/aihod.jpg"
                    alt="Dr. K. Srinivasa Rao"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. K. Srinivasa Rao</h3>
                    <p className="text-lg text-[#B22222] font-semibold mb-4">
                      Head of Department
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> hod.aiml@srivasaviengg.ac.in</p>
                      <p><strong>Phone:</strong> +91-123-456-7890</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <TabNavigation 
                tabs={departmentTabs}
                activeTab={activeDeptTab}
                onTabChange={switchDeptTab}
                isTransitioning={isTransitioning}
              />

              {/* Tab Content */}
              <div className="relative min-h-[200px]">
                <div className={`transition-all duration-150 ${
                  isTransitioning ? 'opacity-70' : 'opacity-100'
                }`}>
                  {renderDeptTabContent()}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Faculty Profiles':
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">Faculty Profiles</h2>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading faculty data...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty.data?.map((member: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                    <p className="text-gray-600 mb-2">{member.designation}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-[#B22222] mb-8 text-center">{activeContent}</h2>
            <p className="text-gray-700 text-center">Content for {activeContent} will be displayed here.</p>
          </div>
        );
    }
  }, [activeContent, activeDeptTab, departmentTabs, switchDeptTab, isTransitioning, renderDeptTabContent, faculty, isLoading]);

  // Memoized sidebar toggle
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <FixedSidebar
        items={sidebarItems}
        activeItem={activeContent}
        onItemClick={setActiveContent}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
        title="AIML Department"
      >
        <div className="py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </FixedSidebar>
    </div>
  );
});

OptimizedAIMLDepartment.displayName = 'OptimizedAIMLDepartment';

export default OptimizedAIMLDepartment;