import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Brain, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon } from 'lucide-react';
import FixedSidebar from './FixedSidebar';
import { useOptimizedTabLoader } from '../hooks/useOptimizedTabLoader';

// Memoized sub-components to prevent unnecessary re-renders
const DepartmentOverview = memo(({ dept }: { dept: string }) => (
  <div className="mb-10">
    <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Overview</h2>
    <p className="text-gray-700 leading-relaxed">
      The Department of {dept} was established with a vision to provide cutting-edge education 
      and research opportunities in the field of {dept}.
    </p>
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
  <div className="mb-6">
    {/* Single line navigation for desktop, responsive for mobile */}
    <div className="flex flex-nowrap justify-center gap-1 lg:gap-2 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          disabled={isTransitioning}
          className={`px-2 lg:px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-sm lg:text-base ${
            activeTab === tab
              ? 'bg-[#B22222] text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } ${isTransitioning ? 'pointer-events-none opacity-50' : ''}`}
        >
          {tab === 'SalientFeatures' ? 'Salient Features' : tab}
        </button>
      ))}
    </div>
  </div>
));

// Optimized department component template
const OptimizedDepartmentTemplate: React.FC<{
  departmentName: string;
  departmentCode: string;
  hodName: string;
  hodImage: string;
  hodEmail: string;
  hodPhone: string;
}> = memo(({ 
  departmentName, 
  departmentCode, 
  hodName, 
  hodImage, 
  hodEmail, 
  hodPhone 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('Department Profile');

  // Use optimized tab loader for instant switching
  const {
    activeTab: activeDeptTab,
    isTransitioning,
    switchTab: switchDeptTab
  } = useOptimizedTabLoader('Department', { animationDuration: 150 });

  // Memoized static data to prevent recreation
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
        return <DepartmentOverview dept={departmentName} />;
      case 'Vision':
        return (
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Vision</h2>
            <p className="text-gray-700 leading-relaxed text-center italic text-lg">
              To become a center of excellence in {departmentName} education and research.
            </p>
          </div>
        );
      case 'Mission':
        return (
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Mission</h2>
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="text-[#B22222] mr-2">•</span>
                To provide quality education in {departmentName}.
              </li>
              <li className="flex items-start">
                <span className="text-[#B22222] mr-2">•</span>
                To promote research and innovation.
              </li>
              <li className="flex items-start">
                <span className="text-[#B22222] mr-2">•</span>
                To develop industry-ready professionals.
              </li>
            </ul>
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
  }, [activeDeptTab, departmentName]);

  // Memoized main content renderer
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
                    src={hodImage}
                    alt={hodName}
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{hodName}</h3>
                    <p className="text-lg text-[#B22222] font-semibold mb-4">
                      Head of Department
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> {hodEmail}</p>
                      <p><strong>Phone:</strong> {hodPhone}</p>
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
                <div className={`transition-all duration-200 ${
                  isTransitioning ? 'opacity-50' : 'opacity-100'
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
            <p className="text-gray-700 text-center">Faculty information will be displayed here.</p>
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
  }, [activeContent, activeDeptTab, departmentTabs, switchDeptTab, isTransitioning, renderDeptTabContent, hodName, hodImage, hodEmail, hodPhone]);

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
        title={`${departmentCode} Department`}
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

OptimizedDepartmentTemplate.displayName = 'OptimizedDepartmentTemplate';

export default OptimizedDepartmentTemplate;