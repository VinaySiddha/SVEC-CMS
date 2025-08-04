"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{[key: string]: boolean}>({
    administration: false,
    departments: false
  });
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [moreDropdowns, setMoreDropdowns] = useState<{[key: string]: boolean}>({
    ugc: false,
    otherLinks: false
  });
  const morePanelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isMoreOpen) {
      // Reset More panel dropdowns when the panel is closed
      setMoreDropdowns({
        ugc: false,
        otherLinks: false
      });
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMoreOpen(false);
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (morePanelRef.current && !morePanelRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isMoreOpen]);

  const toggleMobileDropdown = (dropdown: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const toggleMoreDropdown = (dropdown: string) => {
    setMoreDropdowns(prev => {
      // Close other dropdowns when opening a new one
      const newState = {
        ugc: false,
        otherLinks: false
      };
      // Toggle the clicked dropdown
      newState[dropdown as keyof typeof newState] = !prev[dropdown as keyof typeof prev];
      return newState;
    });
  };

  const closeMoreDropdowns = () => {
    setMoreDropdowns({
      ugc: false,
      otherLinks: false
    });
  };

  const handleLinkClick = () => {
    closeMoreDropdowns();
    setIsMoreOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const departments = [
    { name: 'Computer Science & Engineering', path: '/departments/cse' },
    { name: 'Computer Science & Technology', path: '/departments/cst' },
    { name: 'Computer Science & Engineering(AI)', path: '/departments/cse-ai' },
    { name: 'Computer Science & Engineering(DS)', path: '/departments/cse-ds' },
    { name: 'Artificial Intelligence & Machine Learning', path: '/departments/aiml' },
    { name: 'Electronics & Communication Engineering', path: '/departments/ece' },
    { name: 'Electronics & Communication Technology', path: '/departments/ect' },
    { name: 'Electrical & Electronic Engineering', path: '/departments/eee' },
    { name: 'Mechanical Engineering', path: '/departments/mech' },
    { name: 'Civil Engineering', path: '/departments/civil' },
    { name: 'Basic Science & Humanities', path: '/departments/bsh' },
    { name: 'Masters in Business Administration', path: '/departments/mba' },
  ];

  const administrationItems = [
    { name: 'Director-Technical', path: '/administration/director-technical' },
    { name: 'Principal', path: '/administration/principal' },
    { name: 'Deans', path: '/administration/deans' },
    { name: 'Head of the Departments', path: '/administration/hod' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
  isScrolled ? 'bg-[#FFF8F0] shadow-lg' : 'bg-[#FFF8F0]/95 backdrop-blur-sm'
}`}>

  {/* Top bar */}
  <div className="bg-[#DC143C] text-white py-2 px-4 text-sm">
    <div className="container mx-auto flex justify-between items-center">
      <div>📧 info@srivasaviengg.ac.in | 📞 +91-866-2461555</div>
      <div className="hidden md:block">Accredited by NAAC | Approved by AICTE</div>
    </div>
  </div>

  {/* Main navigation */}
  <nav className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      {/* Logo - Left End */}
      <Link href="/" className="flex items-center space-x-6">
        <img 
          src="/vasavi_logo.png"
          alt="Sri Vasavi Engineering College Logo" 
          className="w-20 h-20 object-contain"
        />
        <div>
          <h1 className="text-4xl font-bold text-[#DC143C] leading-tight">Sri Vasavi</h1>
          <p className="text-xl text-[#B22222] leading-tight">Engineering College</p>
        </div>
      </Link>

      {/* Desktop navigation - Right End */}
      <div className="hidden lg:flex items-center space-x-6 text-[#222222]">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'text-[#DC143C] font-semibold' : 'hover:text-[#B22222]'}`}>
          Home
        </Link>
        
        <Link href="/about" className={`nav-link ${pathname === '/about' ? 'text-[#DC143C] font-semibold' : 'hover:text-[#B22222]'}`}>
          About Us
        </Link>
        
        {/* Administration dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => setActiveDropdown('administration')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button className="nav-link flex items-center hover:text-[#B22222]">
            Administration <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {activeDropdown === 'administration' && (
            <div className="absolute top-full left-0 bg-white shadow-lg border border-[#DDD6CE] rounded-lg py-2 w-56 z-50">
              {administrationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block px-4 py-2 text-sm text-[#222222] hover:bg-[#FFF8F0] hover:text-[#B22222]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/admissions" className={`nav-link ${pathname === '/admissions' ? 'text-[#DC143C] font-semibold' : 'hover:text-[#B22222]'}`}>
          Admissions
        </Link>

        {/* Departments dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => setActiveDropdown('departments')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button className="nav-link flex items-center hover:text-[#B22222]">
            Departments <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {activeDropdown === 'departments' && (
            <div className="absolute top-full left-0 bg-white shadow-lg border border-[#DDD6CE] rounded-lg py-2 w-64 z-50">
              {departments.map((dept) => (
                <Link
                  key={dept.path}
                  href={dept.path}
                  className="block px-4 py-2 text-sm text-[#222222] hover:bg-[#FFF8F0] hover:text-[#B22222]"
                >
                  {dept.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/academics" className={`nav-link ${pathname === '/academics' ? 'text-[#DC143C] font-semibold' : 'hover:text-[#B22222]'}`}>
          Academics
        </Link>
        <Link href="/placements" className={`nav-link ${pathname === '/placements' ? 'text-[#DC143C] font-semibold' : 'hover:text-[#B22222]'}`}>
          Placements
        </Link>
        <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'text-[#DC143C] font-semibold' : 'hover:text-[#B22222]'}`}>
          Contact
        </Link>

        <a 
          href="https://sves.org.in/ecap/" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FFD700] text-[#222222] px-4 py-2 rounded-lg font-semibold hover:bg-[#DC143C] hover:text-white transition-colors"
        >
          E-CAP
        </a>
      {/* More Button */}
      <button
        id="moreNavBtn"
        className="ml-2 bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-2 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white/20 font-medium relative"
        aria-haspopup="true"
        aria-expanded={isMoreOpen}
        onClick={() => setIsMoreOpen((v) => !v)}
        tabIndex={0}
      >
        <span>More</span>
        <svg className={`w-4 h-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
      </button>
      </div>

      {/* Mobile menu button */}
      <button
        className="lg:hidden text-[#222222]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      {/* More Panel Dropdown (Desktop/Tablet/Mobile) */}
      {isMoreOpen && (
        <div
          ref={morePanelRef}
          className="absolute top-full right-0 mt-2 w-80 lg:w-80 md:w-72 sm:w-64 max-w-[90vw] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white z-50 transition-all duration-300 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10 max-h-[70vh] overflow-y-auto"
          tabIndex={-1}
        >
          <div className="p-6 h-full flex flex-col relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/5 to-[#0097A7]/5 rounded-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B22222]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0097A7]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <h3 className="text-xl font-bold text-center flex-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">More Links</h3>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-3">
                <a href="#" onClick={handleLinkClick} className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm block">
                  <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">V Grievance</span>
                  <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" onClick={handleLinkClick} className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm block">
                  <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">NAAC</span>
                  <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" onClick={handleLinkClick} className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm block">
                  <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">R & D</span>
                  <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" onClick={handleLinkClick} className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm block">
                  <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">Mandates</span>
                  <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" onClick={handleLinkClick} className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm block">
                  <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">Category B</span>
                  <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" onClick={handleLinkClick} className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm block">
                  <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">Campus Life</span>
                  <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                </a>
                
                {/* UGC Dropdown */}
                <div className="sidebar-item relative">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMoreDropdown('ugc');
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm touch-manipulation"
                  >
                    <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">UGC</span>
                    <ChevronDown className={`w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform ${moreDropdowns.ugc ? 'rotate-180' : ''} text-gray-400 group-hover:text-white`} />
                  </button>
                  
                  {/* Desktop/Tablet UGC items */}
                  {moreDropdowns.ugc && (
                    <div className="hidden lg:block mt-2 ml-4 space-y-1 animate-slide-up">
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Regulations</a>
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Scholarships</a>
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Journals</a>
                    </div>
                  )}
                  
                  {/* Mobile UGC items */}
                  {moreDropdowns.ugc && (
                    <div className="lg:hidden mt-2 ml-4 space-y-1 animate-slide-up">
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Regulations</a>
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Scholarships</a>
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Journals</a>
                    </div>
                  )}
                </div>
                
                <a href="#" onClick={handleLinkClick} className="sidebar-item w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm block">
                  <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">NIRF</span>
                  <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:scale-110 text-gray-400 group-hover:text-white" />
                </a>
                
                {/* Other Links Dropdown */}
                <div className="sidebar-item relative">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMoreDropdown('otherLinks');
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#B22222]/80 hover:to-[#0097A7]/80 transition-all duration-300 group flex items-center justify-between transform hover:translate-x-2 hover:scale-[1.02] hover:shadow-lg border border-white/5 hover:border-white/20 backdrop-blur-sm touch-manipulation"
                  >
                    <span className="group-hover:text-white transition-colors duration-300 font-medium text-gray-200 group-hover:font-semibold">Other Links</span>
                    <ChevronDown className={`w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 transform ${moreDropdowns.otherLinks ? 'rotate-180' : ''} text-gray-400 group-hover:text-white`} />
                  </button>
                  
                  {/* Desktop/Tablet Other Links items */}
                  {moreDropdowns.otherLinks && (
                    <div className="hidden lg:block mt-2 ml-4 space-y-1 animate-slide-up">
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Events</a>
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">MOUs</a>
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Alumni</a>
                    </div>
                  )}
                  
                  {/* Mobile Other Links items */}
                  {moreDropdowns.otherLinks && (
                    <div className="lg:hidden mt-2 ml-4 space-y-1 animate-slide-up">
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Events</a>
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">MOUs</a>
                      <a href="#" onClick={handleLinkClick} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#B22222]/40 rounded transition-colors">Alumni</a>
                    </div>
                  )}
                </div>
                
              </nav>
            </div>
          </div>
        </div>
      )}
  
    </div>

    {/* Mobile menu */}
    {isMenuOpen && (
      <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-[#DDD6CE] max-h-[80vh] overflow-y-auto">
        <div className="py-4 px-4 space-y-3 text-[#222222]">
          <Link href="/" className="block py-2 hover:text-[#B22222] transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" className="block py-2 hover:text-[#B22222] transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          
          {/* Administration Dropdown */}
          <div className="border-l-2 border-[#DC143C] pl-4">
            <button 
              onClick={() => toggleMobileDropdown('administration')}
              className="w-full flex items-center justify-between font-semibold text-[#B22222] py-2 hover:text-[#DC143C] transition-colors"
            >
              Administration 
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdowns.administration ? 'rotate-180' : ''}`} />
            </button>
            {mobileDropdowns.administration && (
              <div className="ml-2 mt-2 space-y-1">
                {administrationItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block py-2 text-sm text-[#666] hover:text-[#B22222] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/admissions" className="block py-2 hover:text-[#B22222] transition-colors" onClick={() => setIsMenuOpen(false)}>Admissions</Link>

          {/* Departments Dropdown */}
          <div className="border-l-2 border-[#DC143C] pl-4">
            <button 
              onClick={() => toggleMobileDropdown('departments')}
              className="w-full flex items-center justify-between font-semibold text-[#B22222] py-2 hover:text-[#DC143C] transition-colors"
            >
              Departments 
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdowns.departments ? 'rotate-180' : ''}`} />
            </button>
            {mobileDropdowns.departments && (
              <div className="ml-2 mt-2 space-y-1 max-h-64 overflow-y-auto">
                {departments.map((dept) => (
                  <Link
                    key={dept.path}
                    href={dept.path}
                    className="block py-2 text-sm text-[#666] hover:text-[#B22222] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {dept.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/academics" className="block py-2 hover:text-[#B22222] transition-colors" onClick={() => setIsMenuOpen(false)}>Academics</Link>
          <Link href="/placements" className="block py-2 hover:text-[#B22222] transition-colors" onClick={() => setIsMenuOpen(false)}>Placements</Link>
          <Link href="/contact" className="block py-2 hover:text-[#B22222] transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>

          <a 
            href="https://sves.org.in/ecap/" 
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#FFD700] text-[#222222] px-4 py-3 rounded-lg font-semibold text-center hover:bg-[#DC143C] hover:text-white transition-colors mt-4"
          >
            E-CAP
          </a>

          {/* Mobile More Button */}
          <button
            className="block w-full bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-4 py-3 rounded-xl font-medium text-center hover:shadow-xl hover:scale-105 transition-all duration-300 mt-2 backdrop-blur-sm border border-white/20"
            onClick={() => {
              setIsMoreOpen(!isMoreOpen);
              setIsMenuOpen(false);
            }}
          >
            More Links
          </button>
        </div>
      </div>
    )}
  </nav>

  {/* Animated EAPCET Announcement Bar */}
  <div 
    className="bg-gradient-to-r from-[#FFF8F0] via-[#FFF4E8] to-[#FFF8F0] border-t border-[#DDD6CE]/30 overflow-hidden shadow-sm relative"
    role="status" 
    aria-label="Important admission code announcement"
  >
    {/* Desktop version */}
    <div className="hidden md:block relative py-2">
      {/* Animated scrolling content */}
      <div className="flex items-center animate-scroll-left whitespace-nowrap">
        {/* First instance */}
        <div className="flex items-center space-x-3 mx-12">
          <span className="text-lg animate-bounce">📢</span>
          <span className="text-sm font-semibold text-[#444444] tracking-wide">
            EAPCET / ECET / ICET / PGCET / POLYCET Code:
          </span>
          <span className="text-lg font-bold text-[#DC143C] px-3 py-1 bg-white rounded-md shadow-md animate-pulse-glow tracking-wider border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-lg animate-pulse">→</span>
          <span className="text-gray-400 mx-4">•••</span>
        </div>

        {/* Second instance */}
        <div className="flex items-center space-x-3 mx-12">
          <span className="text-lg animate-bounce" style={{ animationDelay: '0.3s' }}>📢</span>
          <span className="text-sm font-semibold text-[#444444] tracking-wide">
            EAPCET / ECET / ICET / PGCET / POLYCET Code:
          </span>
          <span className="text-lg font-bold text-[#DC143C] px-3 py-1 bg-white rounded-md shadow-md animate-pulse-glow tracking-wider border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-lg animate-pulse">→</span>
          <span className="text-gray-400 mx-4">•••</span>
        </div>

        {/* Third instance */}
        <div className="flex items-center space-x-3 mx-12">
          <span className="text-lg animate-bounce" style={{ animationDelay: '0.6s' }}>📢</span>
          <span className="text-sm font-semibold text-[#444444] tracking-wide">
            EAPCET / ECET / ICET / PGCET / POLYCET Code:
          </span>
          <span className="text-lg font-bold text-[#DC143C] px-3 py-1 bg-white rounded-md shadow-md animate-pulse-glow tracking-wider border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-lg animate-pulse">→</span>
          <span className="text-gray-400 mx-4">•••</span>
        </div>

        {/* Fourth instance */}
        <div className="flex items-center space-x-3 mx-12">
          <span className="text-lg animate-bounce" style={{ animationDelay: '0.9s' }}>📢</span>
          <span className="text-sm font-semibold text-[#444444] tracking-wide">
            EAPCET / ECET / ICET / PGCET / POLYCET Code:
          </span>
          <span className="text-lg font-bold text-[#DC143C] px-3 py-1 bg-white rounded-md shadow-md animate-pulse-glow tracking-wider border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-lg animate-pulse">→</span>
          <span className="text-gray-400 mx-4">•••</span>
        </div>

        {/* Fifth instance */}
        <div className="flex items-center space-x-3 mx-12">
          <span className="text-lg animate-bounce" style={{ animationDelay: '1.2s' }}>📢</span>
          <span className="text-sm font-semibold text-[#444444] tracking-wide">
            EAPCET / ECET / ICET / PGCET / POLYCET Code:
          </span>
          <span className="text-lg font-bold text-[#DC143C] px-3 py-1 bg-white rounded-md shadow-md animate-pulse-glow tracking-wider border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-lg animate-pulse">→</span>
          <span className="text-gray-400 mx-4">•••</span>
        </div>

        {/* Sixth instance */}
        <div className="flex items-center space-x-3 mx-12">
          <span className="text-lg animate-bounce" style={{ animationDelay: '1.5s' }}>📢</span>
          <span className="text-sm font-semibold text-[#444444] tracking-wide">
            EAPCET / ECET / ICET / PGCET / POLYCET Code:
          </span>
          <span className="text-lg font-bold text-[#DC143C] px-3 py-1 bg-white rounded-md shadow-md animate-pulse-glow tracking-wider border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-lg animate-pulse">→</span>
          <span className="text-gray-400 mx-4">•••</span>
        </div>

        {/* Seventh instance */}
        <div className="flex items-center space-x-3 mx-12">
          <span className="text-lg animate-bounce" style={{ animationDelay: '1.8s' }}>📢</span>
          <span className="text-sm font-semibold text-[#444444] tracking-wide">
            EAPCET / ECET / ICET / PGCET / POLYCET Code:
          </span>
          <span className="text-lg font-bold text-[#DC143C] px-3 py-1 bg-white rounded-md shadow-md animate-pulse-glow tracking-wider border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-lg animate-pulse">→</span>
          <span className="text-gray-400 mx-4">•••</span>
        </div>

        {/* Eighth instance */}
        <div className="flex items-center space-x-3 mx-12">
          <span className="text-lg animate-bounce" style={{ animationDelay: '2.1s' }}>📢</span>
          <span className="text-sm font-semibold text-[#444444] tracking-wide">
            EAPCET / ECET / ICET / PGCET / POLYCET Code:
          </span>
          <span className="text-lg font-bold text-[#DC143C] px-3 py-1 bg-white rounded-md shadow-md animate-pulse-glow tracking-wider border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-lg animate-pulse">→</span>
          <span className="text-gray-400 mx-4">•••</span>
        </div>
      </div>

      {/* Hover pause overlay */}
      <div className="absolute inset-0 hover:animate-pause-scroll cursor-pointer group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>

    {/* Mobile version with continuous scroll */}
    <div className="md:hidden py-2 relative overflow-hidden">
      <div className="flex items-center animate-scroll-left whitespace-nowrap">
        {/* Mobile instance 1 */}
        <div className="flex items-center space-x-2 mx-8">
          <span className="text-sm animate-bounce">📢</span>
          <span className="text-xs font-semibold text-[#444444]">EAPCET / ECET / ICET / PGCET / POLYCET Code:</span>
          <span className="text-sm font-bold text-[#DC143C] px-2 py-1 bg-white rounded-md shadow-sm animate-pulse-glow border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-sm animate-pulse">→</span>
          <span className="text-gray-400 mx-3">••</span>
        </div>

        {/* Mobile instance 2 */}
        <div className="flex items-center space-x-2 mx-8">
          <span className="text-sm animate-bounce" style={{ animationDelay: '0.3s' }}>📢</span>
          <span className="text-xs font-semibold text-[#444444]">EAPCET / ECET / ICET / PGCET / POLYCET Code:</span>
          <span className="text-sm font-bold text-[#DC143C] px-2 py-1 bg-white rounded-md shadow-sm animate-pulse-glow border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-sm animate-pulse">→</span>
          <span className="text-gray-400 mx-3">••</span>
        </div>

        {/* Mobile instance 3 */}
        <div className="flex items-center space-x-2 mx-8">
          <span className="text-sm animate-bounce" style={{ animationDelay: '0.6s' }}>📢</span>
          <span className="text-xs font-semibold text-[#444444]">EAPCET / ECET / ICET / PGCET / POLYCET Code:</span>
          <span className="text-sm font-bold text-[#DC143C] px-2 py-1 bg-white rounded-md shadow-sm animate-pulse-glow border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-sm animate-pulse">→</span>
          <span className="text-gray-400 mx-3">••</span>
        </div>

        {/* Mobile instance 4 */}
        <div className="flex items-center space-x-2 mx-8">
          <span className="text-sm animate-bounce" style={{ animationDelay: '0.9s' }}>📢</span>
          <span className="text-xs font-semibold text-[#444444]">EAPCET Code:</span>
          <span className="text-sm font-bold text-[#DC143C] px-2 py-1 bg-white rounded-md shadow-sm animate-pulse-glow border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-sm animate-pulse">→</span>
          <span className="text-gray-400 mx-3">••</span>
        </div>

        {/* Mobile instance 5 */}
        <div className="flex items-center space-x-2 mx-8">
          <span className="text-sm animate-bounce" style={{ animationDelay: '1.2s' }}>📢</span>
          <span className="text-xs font-semibold text-[#444444]">EAPCET Code:</span>
          <span className="text-sm font-bold text-[#DC143C] px-2 py-1 bg-white rounded-md shadow-sm animate-pulse-glow border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-sm animate-pulse">→</span>
          <span className="text-gray-400 mx-3">••</span>
        </div>

        {/* Mobile instance 6 */}
        <div className="flex items-center space-x-2 mx-8">
          <span className="text-sm animate-bounce" style={{ animationDelay: '1.5s' }}>📢</span>
          <span className="text-xs font-semibold text-[#444444]">EAPCET Code:</span>
          <span className="text-sm font-bold text-[#DC143C] px-2 py-1 bg-white rounded-md shadow-sm animate-pulse-glow border border-[#DC143C]/20">
            VSVT
          </span>
          <span className="text-[#DC143C] text-sm animate-pulse">→</span>
          <span className="text-gray-400 mx-3">••</span>
        </div>
      </div>
    </div>
  </div>
</header>
  );
};

export default Header;
