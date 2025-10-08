import React, { useState, useEffect } from 'react';
import { Database, BookOpen, Award, ExternalLink, Menu, ChevronRight, Users, Briefcase, FileText, Activity, Shield, Rss, Calendar, Phone, HardHat, Microscope, Search, Download, Wifi, TrendingUp, Presentation, Trophy, Handshake, Scroll, Building, Library, Link as LinkIcon, Settings } from 'lucide-react';
import { DepartmentSidebar } from '@/components/DepartmentSidebar';

// Types for API responses
interface Faculty {
    name: string;
    qualification: string;
    designation: string;
    profile_url: string;
    email?: string;
    phone?: string;
    is_hod: boolean;
    status: string;
}

interface NonTeachingStaff {
    name: string;
    designation: string;
    status: string;
}

interface BoardOfStudiesMember {
    name: string;
    designation: string;
    organization: string;
    position: string;
    status: string;
}

interface DepartmentProfileSection {
    section_name: string;
    title: string;
    content: string | string[];
    is_list: boolean;
    status: string;
}

interface PhysicalFacility {
    category: string;
    title: string;
    description: string;
    document_url: string;
    status: string;
}

interface BOSMeetingMinute {
    meeting_number: string;
    meeting_date: string;
    title: string;
    description: string;
    document_url: string;
    status: string;
}

const DSDepartment: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Department Profile');
    const [activeDeptTab, setActiveDeptTab] = useState('Department');
    const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

    // Dynamic data states
    const [sidebarItems, setSidebarItems] = useState<string[]>([]);
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [nonTeachingFaculty, setNonTeachingFaculty] = useState<NonTeachingStaff[]>([]);
    const [boardOfStudies, setBoardOfStudies] = useState<BoardOfStudiesMember[]>([]);
    const [departmentProfile, setDepartmentProfile] = useState<DepartmentProfileSection[]>([]);
    const [physicalFacilities, setPhysicalFacilities] = useState<PhysicalFacility[]>([]);
    const [bosMeetingMinutes, setBosMeetingMinutes] = useState<BOSMeetingMinute[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const sections = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];

    useEffect(() => {
        // Set page title
        document.title = "DS Department - SVEC";

        // Scroll to top on component mount
        window.scrollTo(0, 0);

        // Load dynamic data
        loadAllData();
    }, []);

    const loadAllData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Load all necessary data
            await Promise.all([
                loadSidebarItems(),
                loadFacultyData(),
                loadNonTeachingStaff(),
                loadBoardOfStudies(),
                loadDepartmentProfile(),
                loadPhysicalFacilities(),
                loadBosMeetingMinutes()
            ]);
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load department data');
        } finally {
            setLoading(false);
        }
    };

    const loadSidebarItems = async () => {
        try {
            const response = await fetch('/api/ds/sidebar-items');
            if (!response.ok) throw new Error('Failed to fetch sidebar items');
            const data = await response.json();
            setSidebarItems(data);
        } catch (err) {
            console.error('Error loading sidebar items:', err);
        }
    };

    const loadFacultyData = async () => {
        try {
            const response = await fetch('/api/ds/faculty');
            if (!response.ok) throw new Error('Failed to fetch faculty data');
            const data = await response.json();
            setFaculty(data);
        } catch (err) {
            console.error('Error loading faculty data:', err);
        }
    };

    const loadNonTeachingStaff = async () => {
        try {
            const response = await fetch('/api/ds/non-teaching-staff');
            if (!response.ok) throw new Error('Failed to fetch non-teaching staff');
            const data = await response.json();
            setNonTeachingFaculty(data);
        } catch (err) {
            console.error('Error loading non-teaching staff:', err);
        }
    };

    const loadBoardOfStudies = async () => {
        try {
            const response = await fetch('/api/ds/board-of-studies');
            if (!response.ok) throw new Error('Failed to fetch board of studies');
            const data = await response.json();
            setBoardOfStudies(data);
        } catch (err) {
            console.error('Error loading board of studies:', err);
        }
    };

    const loadDepartmentProfile = async () => {
        try {
            const response = await fetch('/api/ds/department-profile');
            if (!response.ok) throw new Error('Failed to fetch department profile');
            const data = await response.json();
            setDepartmentProfile(data);
        } catch (err) {
            console.error('Error loading department profile:', err);
        }
    };

    const loadPhysicalFacilities = async () => {
        try {
            const response = await fetch('/api/ds/physical-facilities');
            if (!response.ok) throw new Error('Failed to fetch physical facilities');
            const data = await response.json();
            setPhysicalFacilities(data);
        } catch (err) {
            console.error('Error loading physical facilities:', err);
        }
    };

    const loadBosMeetingMinutes = async () => {
        try {
            const response = await fetch('/api/ds/bos-meeting-minutes');
            if (!response.ok) throw new Error('Failed to fetch BOS meeting minutes');
            const data = await response.json();
            setBosMeetingMinutes(data);
        } catch (err) {
            console.error('Error loading BOS meeting minutes:', err);
        }
    };

    // Get current profile section data
    const getCurrentProfileSection = () => {
        return departmentProfile.find(section => section.section_name === activeDeptTab);
    };

    // Get HOD information from faculty
    const getHODInfo = () => {
        return faculty.find(member => member.is_hod);
    };

    const renderDeptTabContent = () => {
        const currentSection = getCurrentProfileSection();
        
        if (!currentSection) {
            return (
                <div className="py-6">
                    <h3 className="text-2xl font-bold text-[#B22222] mb-4">Loading...</h3>
                </div>
            );
        }

        return (
            <div className="py-6">
                <h3 className="text-2xl font-bold text-[#B22222] mb-4">{currentSection.title}</h3>
                {currentSection.is_list && Array.isArray(currentSection.content) ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {currentSection.content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700 leading-relaxed">{currentSection.content}</p>
                )}
            </div>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Department Profile':
                return (
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Department Profile</h2>

                        {/* HOD Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
                            <div className="relative">
                                <img
                                    src="/images/departments/ds/dshod.jpg"
                                    alt="Dr. G. Loshma"
                                    className="w-full h-80 object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-[#B22222] mb-2">Dr. G. Loshma</h3>
                                    <p className="text-lg text-[#B22222] font-medium mb-2">Professor & Head of Department, CSE(Data Science)</p>
                                    <p className="text-gray-600">Mobile No: 7672082130</p>
                                    <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-442)</p>
                                    <p className="text-gray-600">Email: <a href="mailto:hod_ds@srivasaviengg.ac.in" className="text-primary hover:underline">hod_ds@srivasaviengg.ac.in</a></p>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    The Department of Computer Science and Engineering(Data Science) came into inception from 2024 onwards with an intake of 60 seats in B.Tech. We aim to prepare students for the emerging field of data science and analytics, equipping them with the necessary skills to succeed in this rapidly growing domain.
                                </p>
                            </div>
                        </div>

                        {/* Department Profile Navigation - Grid Layout */}
                        <div className="mb-8 mt-12">
                            {/* Row 1: Department, Vision */}
                            <div className="flex justify-center gap-4 mb-4">
                                <button
                                    onClick={() => setActiveDeptTab('Department')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Department'
                                        ? 'bg-[#B22222] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Department
                                </button>
                                <button
                                    onClick={() => setActiveDeptTab('Vision')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Vision'
                                        ? 'bg-[#B22222] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Vision
                                </button>
                            </div>

                            {/* Row 2: Mission, PEOs, POs */}
                            <div className="flex justify-center gap-4 mb-4">
                                <button
                                    onClick={() => setActiveDeptTab('Mission')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'Mission'
                                        ? 'bg-[#B22222] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Mission
                                </button>
                                <button
                                    onClick={() => setActiveDeptTab('PEOs')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PEOs'
                                        ? 'bg-[#B22222] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    PEOs
                                </button>
                                <button
                                    onClick={() => setActiveDeptTab('POs')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'POs'
                                        ? 'bg-[#B22222] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    POs
                                </button>
                            </div>

                            {/* Row 3: PSOs, COs */}
                            <div className="flex justify-center gap-4 mb-4">
                                <button
                                    onClick={() => setActiveDeptTab('PSOs')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'PSOs'
                                        ? 'bg-[#B22222] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    PSOs
                                </button>
                                <button
                                    onClick={() => setActiveDeptTab('COs')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'COs'
                                        ? 'bg-[#B22222] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    COs
                                </button>
                            </div>

                            {/* Row 4: Salient Features (centered) */}
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setActiveDeptTab('SalientFeatures')}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeDeptTab === 'SalientFeatures'
                                        ? 'bg-[#B22222] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Salient Features
                                </button>
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

                        {/* HOD Information */}
                        {activeDeptTab === 'Department' && !loading && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
                                <div className="relative">
                                    <img
                                        src="/images/departments/ds/dshod.jpg"
                                        alt="HOD"
                                        className="w-full h-80 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                                <div className="lg:col-span-2 space-y-4">
                                    {(() => {
                                        const hodInfo = getHODInfo();
                                        return hodInfo ? (
                                            <div className="mb-4">
                                                <h3 className="text-2xl font-bold text-[#B22222] mb-2">{hodInfo.name}</h3>
                                                <p className="text-lg text-[#B22222] font-medium mb-2">{hodInfo.designation}, CSE(Data Science)</p>
                                                {hodInfo.phone && <p className="text-gray-600">Mobile No: {hodInfo.phone}</p>}
                                                <p className="text-gray-600">Phone No: 08818-284355(O)-(Ext.-442)</p>
                                                {hodInfo.email && (
                                                    <p className="text-gray-600">
                                                        Email: <a href={`mailto:${hodInfo.email}`} className="text-primary hover:underline">{hodInfo.email}</a>
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="mb-4">
                                                <h3 className="text-2xl font-bold text-[#B22222] mb-2">HOD Information</h3>
                                                <p className="text-gray-600">Loading HOD information...</p>
                                            </div>
                                        );
                                    })()}
                                    <p className="text-gray-700 leading-relaxed">
                                        The Department of Computer Science and Engineering(Data Science) came into inception from 2024 onwards with an intake of 60 seats in B.Tech. We aim to prepare students for the emerging field of data science and analytics, equipping them with the necessary skills to succeed in this rapidly growing domain.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Content Area that changes based on selected tab */}
                        {renderDeptTabContent()}
                    </div>
                );

            case 'Faculty Profiles':
                return (
                    <div className="space-y-8">
                        {loading ? (
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B22222] mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Loading faculty data...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                                <div className="text-center">
                                    <p className="text-red-600">Error: {error}</p>
                                    <button 
                                        onClick={loadAllData}
                                        className="mt-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#B22222]"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Teaching Faculty</h2>
                                    {faculty.length > 0 ? (
                                        <div className="overflow-x-auto">
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
                                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                            <td className="px-6 py-4">{index + 1}</td>
                                                            <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                                                            <td className="px-6 py-4">{member.qualification}</td>
                                                            <td className="px-6 py-4">{member.designation}</td>
                                                            <td className="px-6 py-4">
                                                                {member.profile_url ? (
                                                                    <a href={member.profile_url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">View Profile</a>
                                                                ) : (
                                                                    <span className="text-gray-400">N/A</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-600">No faculty data available</p>
                                    )}
                                </div>
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Non-Teaching Staff</h2>
                                    {nonTeachingFaculty.length > 0 ? (
                                        <div className="overflow-x-auto">
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
                                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                            <td className="px-6 py-4">{index + 1}</td>
                                                            <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                                                            <td className="px-6 py-4">{member.designation}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-600">No non-teaching staff data available</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                );

            case 'Board of Studies':
                return (
                    <div className="space-y-8">
                        {loading ? (
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B22222] mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Loading board of studies data...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                                <div className="text-center">
                                    <p className="text-red-600">Error: {error}</p>
                                    <button 
                                        onClick={loadAllData}
                                        className="mt-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#B22222]"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                                    <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Board of Studies</h2>
                                    {boardOfStudies.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left text-gray-500">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">S.No.</th>
                                                        <th scope="col" className="px-6 py-3">Name</th>
                                                        <th scope="col" className="px-6 py-3">Designation</th>
                                                        <th scope="col" className="px-6 py-3">Organization</th>
                                                        <th scope="col" className="px-6 py-3">Position</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {boardOfStudies.map((member, index) => (
                                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                            <td className="px-6 py-4">{index + 1}</td>
                                                            <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                                                            <td className="px-6 py-4">{member.designation}</td>
                                                            <td className="px-6 py-4">{member.organization}</td>
                                                            <td className="px-6 py-4">{member.position}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-600">No board of studies data available</p>
                                    )}
                                </div>
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                                    <h4 className="text-2xl font-bold text-[#B22222] mb-4 text-center">Board of Studies Meeting Minutes</h4>
                                    {bosMeetingMinutes.length > 0 ? (
                                        <ul className="list-disc list-inside space-y-2 text-center">
                                            {bosMeetingMinutes.map((minute, index) => (
                                                <li key={index}>
                                                    {minute.title} - {new Date(minute.meeting_date).toLocaleDateString()}
                                                    {minute.document_url && (
                                                        <a href={minute.document_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">View</a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-gray-600">No meeting minutes available</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                );

            case 'Physical Facilities':
                return (
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Physical Facilities</h2>
                        {loading ? (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B22222] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading physical facilities data...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center">
                                <p className="text-red-600">Error: {error}</p>
                                <button 
                                    onClick={loadAllData}
                                    className="mt-4 px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#B22222]"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {physicalFacilities.length > 0 ? (
                                    (() => {
                                        // Group facilities by category
                                        const groupedFacilities = physicalFacilities.reduce((groups, facility) => {
                                            const category = facility.category || 'Other';
                                            if (!groups[category]) groups[category] = [];
                                            groups[category].push(facility);
                                            return groups;
                                        }, {} as Record<string, PhysicalFacility[]>);

                                        return Object.entries(groupedFacilities).map(([category, facilities]) => (
                                            <div key={category}>
                                                <h3 className="text-xl font-bold text-gray-800 mb-3">{category}</h3>
                                                <ul className="list-disc list-inside space-y-2">
                                                    {facilities.map((facility, index) => (
                                                        <li key={index}>
                                                            {facility.title}
                                                            {facility.description && ` - ${facility.description}`}
                                                            {facility.document_url && (
                                                                <> - <a href={facility.document_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a></>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ));
                                    })()
                                ) : (
                                    <p className="text-center text-gray-600">No physical facilities data available</p>
                                )}
                            </div>
                        )}
                    </div>
                );

            default:
                return (
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-600 mb-4">
                            {activeTab}
                        </h3>
                        {loading ? (
                            <div>
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B22222] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading {activeTab.toLowerCase()} data...</p>
                            </div>
                        ) : error ? (
                            <div>
                                <p className="text-red-600 mb-4">Error: {error}</p>
                                <button 
                                    onClick={loadAllData}
                                    className="px-4 py-2 bg-[#B22222] text-white rounded hover:bg-[#B22222]"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-500 mb-4">Content for {activeTab} coming soon...</p>
                                <p className="text-sm text-gray-400">This section will be populated with dynamic data from the database.</p>
                            </div>
                        )}
                    </div>
                );
        }
    };

    // return (
    //     <div className="pt-24 bg-gray-100">
    //         <section className="bg-[#8B1919] text-white py-12">
    //             <div className="container mx-auto px-4">
    //                 <div className="text-center">
    //                     <h1 className="text-3xl md:text-4xl font-bold">CSE(Data Science)</h1>
    //                 </div>
    //             </div>
    //         </section>

    //         <div className="container mx-auto px-4 py-8">
    //             <div className="flex flex-col lg:flex-row gap-8">
    //                 <aside className="w-full lg:w-80 lg:flex-shrink-0">
    //                     <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
    //                         <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-full flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-4">
    //                             <span className="font-bold">Department Menu</span>
    //                             <Menu className="w-6 h-6" />
    //                         </button>
    //                         <nav className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
    //                             <h3 className="text-xl font-bold text-primary mb-4 hidden lg:block">Department Menu</h3>
    //                             {loading ? (
    //                                 <div className="flex items-center justify-center py-8">
    //                                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B22222]"></div>
    //                                     <span className="ml-2 text-gray-600">Loading menu...</span>
    //                                 </div>
    //                             ) : sidebarItems.length > 0 ? (
    //                                 <ul className="space-y-2">
    //                                     {sidebarItems.map((item) => (
    //                                         <li key={item}>
    //                                             <button
    //                                                 className={`w-full text-left flex items-center p-3 rounded-lg transition-all duration-300 text-sm ${activeTab === item ? 'bg-primary text-white font-semibold shadow-md' : 'hover:bg-gray-100'}`}
    //                                                 onClick={() => {
    //                                                     setActiveTab(item);
    //                                                     setSidebarOpen(false);
    //                                                 }}
    //                                             >
    //                                                 <ChevronRight className={`w-4 h-4 mr-2 transition-transform ${activeTab === item ? 'rotate-90' : ''}`} />
    //                                                 <span>{item}</span>
    //                                             </button>
    //                                         </li>
    //                                     ))}
    //                                 </ul>
    //                             ) : (
    //                                 <p className="text-gray-500 text-sm">No menu items available</p>
    //                             )}
    //                         </nav>
    //                     </div>
    //                 </aside>
    //                 <main className="flex-1 min-w-0">
    //                     {renderContent()}
    //                 </main>
    //             </div>
    //         </div>
    //     </div>
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
        title="CSE-DS Department"
      >
        {renderContentWithTitle()}
      </DepartmentSidebar>
      {/* Footer is only shown when scrolling the main content area, not the sidebar */}
    </div>
  );
};

export default DSDepartment;
