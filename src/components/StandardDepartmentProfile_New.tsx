import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface StandardDepartmentProfileProps {
  hodInfo: {
    name: string;
    designation: string;
    education: string;
    email: string;
    imageUrl: string;
  };
  departmentContent: {
    Department: JSX.Element;
    Vision: JSX.Element;
    Mission: JSX.Element;
    PEOs: JSX.Element;
    POs: JSX.Element;
    PSOs: JSX.Element;
    COs: JSX.Element;
    "Salient Features": JSX.Element;
  };
}

const StandardDepartmentProfile: React.FC<StandardDepartmentProfileProps> = ({
  hodInfo,
  departmentContent
}) => {
  const [activeDeptTab, setActiveDeptTab] = useState('Department');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  
  const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'Salient Features'];

  const renderDeptTabContent = () => {
    if (activeDeptTab === 'Salient Features') {
      return departmentContent["Salient Features"];
    }
    return departmentContent[activeDeptTab as keyof typeof departmentContent];
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>

      {/* HOD Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-[#B22222] mb-6 text-center">Head of Department</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={hodInfo.imageUrl}
                alt={hodInfo.name}
                className="w-48 h-48 object-cover rounded-xl shadow-md"
                style={{ aspectRatio: '1/1' }}
              />
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h4 className="text-xl font-bold text-gray-800 mb-2">{hodInfo.name}</h4>
            <p className="text-gray-600 mb-4">{hodInfo.designation}</p>
            <p className="text-gray-700 leading-relaxed mb-2">{hodInfo.education}</p>
            <p className="text-gray-700 leading-relaxed">
              Email: <a href={`mailto:${hodInfo.email}`} className="text-[#B22222] hover:underline">{hodInfo.email}</a>
            </p>
          </div>
        </div>
      </div>

      {/* Department Profile Navigation - Single Line */}
      <div className="mb-8 mt-12">
        <div className="dept-tab-navigation">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveDeptTab(section)}
              className={`dept-tab-button ${
                activeDeptTab === section
                  ? 'bg-[#B22222] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section === 'Salient Features' ? 'Salient Features' : section}
            </button>
          ))}
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
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white shadow-lg scale-105'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isActive ? 'bg-white/20' : 'bg-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {section === 'Salient Features' ? 'Salient Features' : section}
                          </div>
                          <div className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                            {section === 'Department' && 'Overview & HOD Profile'}
                            {section === 'Vision' && 'Department Vision Statement'}
                            {section === 'Mission' && 'Department Mission Statement'}
                            {section === 'PEOs' && 'Program Educational Objectives'}
                            {section === 'POs' && 'Program Outcomes'}
                            {section === 'PSOs' && 'Program Specific Outcomes'}
                            {section === 'COs' && 'Course Outcomes'}
                            {section === 'Salient Features' && 'Key Highlights & Features'}
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
        className="fixed right-3 bottom-6 z-40 w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#8B0000] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center group md:hidden"
        title="Department Navigation"
      >
        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.50 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        {/* Mobile Label */}
        <div className="absolute bottom-14 right-0 bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Menu
          <div className="absolute top-full right-2 w-0 h-0 border-t-4 border-t-gray-900 border-l-2 border-r-2 border-l-transparent border-r-transparent"></div>
        </div>
      </button>

      {/* Tab Content */}
      <div className="mt-6">
        {renderDeptTabContent()}
      </div>
    </div>
  );
};

export default StandardDepartmentProfile;