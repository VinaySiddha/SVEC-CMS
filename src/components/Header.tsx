"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import SmoothLink from './SmoothLink';

// Type definitions for better TypeScript support
interface DropdownItem {
  name: string;
  path: string;
  icon?: string;
}

interface MenuItemWithDropdown {
  name: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  icon?: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ top: number, left: number } | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mobileSection, setMobileSection] = useState<'admin' | 'depts' | 'more' | null>(null);


  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Close dropdown if clicking outside of any dropdown
      if (!target.closest('[data-dropdown]') && !target.closest('button[aria-expanded]')) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    handleScroll(); // Check scroll position on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = (e?: React.MouseEvent) => {
    // If we have event data, check if we're moving to a child element
    if (e) {
      const relatedTarget = e.relatedTarget as Node;
      const currentTarget = e.currentTarget as Node;

      // Check if we're moving to a related dropdown element
      const dropdownId = (currentTarget as Element).closest('[data-dropdown]')?.getAttribute('data-dropdown');
      const dropdown = dropdownId && document.querySelector(`[data-dropdown="${dropdownId}"]`);
      const dropdownMenu = dropdownId && document.querySelector(`[data-dropdown="${dropdownId}-menu"]`);

      // Don't close if moving to the dropdown content or child element
      if ((dropdown && dropdown.contains(relatedTarget)) ||
        (dropdownMenu && dropdownMenu.contains(relatedTarget)) ||
        (currentTarget.contains(relatedTarget))) {
        return;
      }
    }

    // Add a delay before closing to prevent accidental closures
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // Increased timeout for better user experience
  };

  const departments = [
    { name: 'Computer Science & Engineering', path: '/departments/cse' },
    { name: 'Computer Science & Technology', path: '/departments/cst' },
    { name: 'CSE (AI)', path: '/departments/cse-ai' },
    { name: 'CSE (Data Science)', path: '/departments/cse-ds' },
    { name: 'AI & Machine Learning', path: '/departments/aiml' },
    { name: 'Electronics & Communication', path: '/departments/ece' },
    { name: 'Electronics & Comm. Technology', path: '/departments/ect' },
    { name: 'Electrical & Electronics', path: '/departments/eee' },
    { name: 'Mechanical Engineering', path: '/departments/mech' },
    { name: 'Civil Engineering', path: '/departments/civil' },
    { name: 'Basic Science & Humanities', path: '/departments/bsh' },
    { name: 'MBA', path: '/departments/mba' },
  ];

  const administrationItems = [
    { name: 'Director-Technical', path: '/administration/director-technical' },
    { name: 'Principal', path: '/administration/principal' },
    { name: 'Deans', path: '/administration/deans' },
    { name: 'Head of Departments', path: '/administration/hod' },
  ];

  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Academics', path: '/academics' },
    { name: 'Placements', path: '/placements' },
    { name: 'Contact', path: '/contact' },
  ];

  // UGC dropdown items
  const ugcDropdownItems = [
    { name: 'Academic Council', path: '#' },
    { name: 'Board of Studies', path: 'http://srivasaviengg.ac.in/uploads/List%20of%20Board%20of%20Studies_2021_22.pdf' },
    { name: 'Finance Committee', path: 'http://srivasaviengg.ac.in/Finance_Committee_2021_2022.png' },
    { name: 'IQAC', path: 'http://srivasaviengg.ac.in/uploads/iqac_members_2021_2022.png' },
    { name: 'Non Statutory Committee', path: 'http://srivasaviengg.ac.in/uploads/College%20Level%20Committees%202021-22.pdf' },
    { name: 'Fee Structure', path: 'http://srivasaviengg.ac.in/uploads/fee.png' },
    { name: 'Undertaking', path: 'http://srivasaviengg.ac.in/uploads/Undertaking_2021_2022.jpg' }
  ];

  // NIRF dropdown items
  const nirfDropdownItems = [
    { name: 'SVEC-Overall Category NIRF', path: '#' },
    { name: 'SVEC-Engineering Category NIRF', path: '#' }
  ];

  // Other Links dropdown items
  const otherLinksDropdownItems = [
    { name: 'Anti Ragging Committee', path: 'https://srivasaviengg.ac.in/uploads/Anti%20Ragging%20Committee%202023-4.pdf' },
    { name: 'Internal Complaints Committee', path: 'https://srivasaviengg.ac.in/uploads/Internal%20Compliants%20Committee%202023-24.pdf' },
    { name: 'SC/ST Welfare Committee', path: 'https://srivasaviengg.ac.in/uploads/SC%20ST%20Welfare%20Committee%202023-24.pdf' },
    { name: 'Institute Industry Cell', path: 'https://srivasaviengg.ac.in/uploads/INSTITUTION-INDUSTRY%20CELL%202023-24.pdf' },
    { name: 'Other Important Committee', path: 'https://srivasaviengg.ac.in/uploads/College%20Level%20Committees%20Details.pdf' },
    { name: 'Alumni Engagement', path: './alumni_engagement.html' },
    { name: 'Entrepreneurial Quest', path: 'https://entrepreneurialquest.netlify.app' }
  ];

  // More dropdown items - organized and consistent with other dropdowns
  const moreDropdownItems = [
    { name: 'V Grievance', path: '/v-grievance' },
    { name: 'NAAC', path: '/naac' },
    { name: 'R & D', path: '/rd-innovation' },
    { name: 'Mandates', path: '/mandates' },
    { name: 'Category B', path: '/category-b' },
    { name: 'Campus Life', path: '/campus-life' },
    {
      name: 'UGC',
      path: '/ugc',
      hasDropdown: true,
      dropdownItems: ugcDropdownItems
    },
    {
      name: 'NIRF',
      path: '/nirf',
      hasDropdown: true,
      dropdownItems: nirfDropdownItems
    },
    {
      name: 'Other Links',
      path: '/other-links',
      hasDropdown: true,
      dropdownItems: otherLinksDropdownItems
    },
  ];

  const headerClass = isScrolled || !isHomePage
    ? 'bg-background/95 shadow-md backdrop-blur-sm'
    : 'bg-transparent';

  const textColorClass = isScrolled || !isHomePage
    ? 'text-foreground'
    : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group no-underline">
            <div className="relative">
              <img
                src="/vasavi_logo.png"
                alt="SVEC Logo"
                className="w-14 h-14 object-contain transition-transform group-hover:scale-105"
              />
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <div className={textColorClass}>
              <h1 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">Sri Vasavi</h1>
              <p className="text-xs leading-tight opacity-80">Engineering College</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {mainNavLinks.map((link, index) => (
              <SmoothLink
                key={link.path}
                href={link.path}
                className={`${textColorClass} hover:text-primary transition-all duration-300 hover:scale-105 nav-underline ${pathname === link.path ? 'text-primary font-semibold' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </SmoothLink>
            ))}

            <div className="relative" data-dropdown="admin">
              <button
                className={`flex items-center ${textColorClass} hover:text-primary transition-colors`}
                aria-expanded={activeDropdown === 'admin'}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'admin' ? null : 'admin');
                }}
                onMouseEnter={() => handleMouseEnter('admin')}
                onMouseLeave={(e) => {
                  const relatedTarget = e.relatedTarget as Element;
                  const dropdown = document.querySelector('[data-dropdown="admin"]');
                  if (dropdown && !dropdown.contains(relatedTarget)) {
                    handleMouseLeave(e);
                  }
                }}
              >
                Administration <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === 'admin' && (
                <div
                  className="absolute top-full -left-4 mt-2 w-56 bg-background rounded-md shadow-lg border py-1 z-50 animate-in slide-in-from-top-2 duration-200"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => {
                    setActiveDropdown('admin');
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const relatedTarget = e.relatedTarget as Element;
                    const dropdown = document.querySelector('[data-dropdown="admin"]');
                    if (dropdown && !dropdown.contains(relatedTarget)) {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 200);
                    }
                  }}
                >
                  {administrationItems.map((item, index) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary transition-all duration-200 hover:translate-x-1"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onMouseEnter={() => {
                        if (dropdownTimeoutRef.current) {
                          clearTimeout(dropdownTimeoutRef.current);
                          dropdownTimeoutRef.current = null;
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`flex items-center ${textColorClass} hover:text-primary transition-colors`}
                aria-expanded={activeDropdown === 'more'}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'more' ? null : 'more');
                }}
                onMouseEnter={() => handleMouseEnter('more')}
                onMouseLeave={handleMouseLeave}
              >
                More <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === 'more' && (
                <div
                  className="absolute top-full -left-4 mt-2 w-64 bg-background rounded-md shadow-lg border py-1 z-50 max-h-[70vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
                  data-dropdown="more"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => {
                    setActiveDropdown('more');
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Only close if moving outside the entire dropdown/submenu area
                    const relatedTarget = e.relatedTarget as Node;
                    const currentTarget = e.currentTarget as Node;

                    // Don't close if moving to a child element within the dropdown
                    if (currentTarget.contains(relatedTarget)) return;

                    // Don't close if moving into the submenu panel
                    const submenuEl = document.querySelector('[data-submenu="more"]');
                    if (submenuEl && submenuEl.contains(relatedTarget)) return;

                    // Add delay to prevent accidental closure and close submenu
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setActiveDropdown(null);
                      setActiveSubmenu(null);
                      setSubmenuPosition(null);
                    }, 400);
                  }}
                >
                  {moreDropdownItems.map((item, idx) => (
                    item.hasDropdown ? (
                      <div
                        key={idx}
                        className="group relative"
                      >
                        <div
                          className="flex items-center justify-between px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary cursor-pointer w-full"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (activeSubmenu === item.name) {
                              setActiveSubmenu(null);
                              setSubmenuPosition(null);
                            } else {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setSubmenuPosition({
                                top: rect.top,
                                left: rect.right - 20
                              });
                              setActiveSubmenu(item.name);
                            }
                          }}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${activeSubmenu === item.name ? 'rotate-90' : ''}`} />
                        </div>
                        {/* Open submenu on hover for desktop */}
                        <div
                          className="absolute inset-0"
                          onMouseEnter={(e) => {
                            const target = (e.currentTarget.parentElement as HTMLElement);
                            const rect = target.getBoundingClientRect();
                            setSubmenuPosition({ top: rect.top, left: rect.right - 20 });
                            setActiveSubmenu(item.name);
                          }}
                        />
                      </div>
                    ) : (
                      <Link
                        key={idx}
                        href={item.path}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary transition-all duration-200 hover:translate-x-1"
                        style={{ animationDelay: `${idx * 30}ms` }}
                        onMouseEnter={() => {
                          // Clear any pending timeout to keep dropdown open
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                            dropdownTimeoutRef.current = null;
                          }
                        }}
                        onClick={() => {
                          setActiveDropdown(null);
                        }}
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </div>
              )}

              {/* Sub-dropdown rendered outside main dropdown */}
              {activeDropdown === 'more' && activeSubmenu && submenuPosition && (
                <div
                  data-submenu="more"
                  className="fixed bg-background shadow-lg border z-[60] max-h-[70vh] overflow-y-auto
                           md:rounded-md md:py-1 md:w-56
                           w-full h-full top-0 left-0 md:top-auto md:left-auto md:h-auto
                           flex flex-col md:block"
                  style={{
                    top: window.innerWidth >= 768 ? `${submenuPosition.top}px` : '0',
                    left: window.innerWidth >= 768 ? `${Math.min(submenuPosition.left, window.innerWidth - 240)}px` : '0'
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => {
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const relatedTarget = e.relatedTarget as Element;
                    const parentDropdown = document.querySelector('[data-dropdown="more"]');
                    if (parentDropdown && parentDropdown.contains(relatedTarget)) {
                      return;
                    }
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setActiveSubmenu(null);
                      setSubmenuPosition(null);
                    }, 300);
                  }}
                >
                  {/* Mobile close button */}
                  <button
                    onClick={() => {
                      setActiveSubmenu(null);
                      setSubmenuPosition(null);
                    }}
                    className="md:hidden absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Content */}
                  <div className="md:p-0 p-4 pt-12 md:pt-0 flex-1 overflow-y-auto">
                    {moreDropdownItems
                      .find(item => item.name === activeSubmenu)
                      ?.dropdownItems?.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subItem.path}
                          className="block px-4 py-3 md:py-2 text-base md:text-sm text-foreground/80 hover:bg-secondary hover:text-primary
                                   md:rounded-none rounded-lg mb-2 md:mb-0 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(null);
                            setActiveSubmenu(null);
                            setSubmenuPosition(null);
                          }}
                          onMouseEnter={() => {
                            if (dropdownTimeoutRef.current) {
                              clearTimeout(dropdownTimeoutRef.current);
                              dropdownTimeoutRef.current = null;
                            }
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" data-dropdown="depts">
              <button
                className={`flex items-center ${textColorClass} hover:text-primary transition-colors`}
                aria-expanded={activeDropdown === 'depts'}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'depts' ? null : 'depts');
                }}
                onMouseEnter={() => handleMouseEnter('depts')}
                onMouseLeave={(e) => {
                  const relatedTarget = e.relatedTarget as Element;
                  const dropdown = document.querySelector('[data-dropdown="depts"]');
                  if (dropdown && !dropdown.contains(relatedTarget)) {
                    handleMouseLeave(e);
                  }
                }}
              >
                Departments <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === 'depts' && (
                <div
                  className="absolute top-full -right-4 mt-2 w-64 bg-background rounded-md shadow-lg border py-1 max-h-96 overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200"
                  data-dropdown="depts-menu"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => {
                    setActiveDropdown('depts');
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Only close if moving outside the entire dropdown area
                    const relatedTarget = e.relatedTarget as Element;
                    const dropdown = document.querySelector('[data-dropdown="depts"]');
                    if (dropdown && !dropdown.contains(relatedTarget)) {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 200);
                    }
                  }}
                >
                  {departments.map((item, index) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary transition-all duration-200 hover:translate-x-1"
                      style={{ animationDelay: `${index * 25}ms` }}
                      onMouseEnter={() => {
                        // Clear any pending timeout to keep dropdown open
                        if (dropdownTimeoutRef.current) {
                          clearTimeout(dropdownTimeoutRef.current);
                          dropdownTimeoutRef.current = null;
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://sves.org.in/ecap/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              E-CAP
            </a>
            <button
              className={`lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-all duration-200 no-underline ${textColorClass} ${isMenuOpen ? 'bg-secondary/30' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="w-6 h-6 transition-transform rotate-90" />
                ) : (
                  <Menu className="w-6 h-6 transition-transform hover:scale-110" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] lg:hidden z-[55]"
            onClick={() => {
              setIsMenuOpen(false);
              setMobileSection(null);
            }}
          />

          {/* Right-side mobile drawer */}
          <aside
            role="dialog"
            aria-modal="true"
            className="fixed right-0 top-0 h-screen w-[88vw] max-w-sm bg-background border-l z-[60] shadow-xl lg:hidden transform transition-all duration-300 ease-out animate-in slide-in-from-right"
          >
            {/* Drawer header with gradient */}
            <div className="flex items-center justify-between px-4 h-16 border-b bg-gradient-to-r from-primary/5 via-background to-primary/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/vasavi_logo.png" alt="SVEC Logo" className="w-10 h-10 object-contain" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-sm -z-10" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Sri Vasavi</p>
                  <p className="text-[11px] text-foreground/60 leading-tight">Engineering College</p>
                </div>
              </div>
              <button
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-secondary/50 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  setMobileSection(null);
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer content */}
            <nav className="overflow-y-auto h-[calc(100vh-4rem-4.25rem)] px-2 py-3">
              {/* Main navigation */}
              <div className="mb-3">
                <p className="px-2 pb-2 text-[11px] uppercase tracking-wide text-foreground/50">Navigation</p>
                {mainNavLinks.map((link, index) => (
                  <SmoothLink
                    key={link.path}
                    href={link.path}
                    className="flex items-center justify-between px-3 py-3 rounded-lg text-foreground/90 hover:bg-secondary transition-all duration-200 hover:translate-x-1 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-foreground/50 transition-transform group-hover:translate-x-1" />
                  </SmoothLink>
                ))}
              </div>

              {/* Accordions */}
              <div className="rounded-lg border border-border/60 overflow-hidden">
                {/* Administration */}
                <button
                  className="w-full flex items-center justify-between px-3 py-3 font-semibold text-primary/90 bg-secondary/40"
                  onClick={() => setMobileSection(mobileSection === 'admin' ? null : 'admin')}
                  aria-expanded={mobileSection === 'admin'}
                >
                  <span>Administration</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileSection === 'admin' ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileSection === 'admin' && (
                  <div className="bg-secondary/10 border-b border-border">
                    <div className="px-2 py-1">
                      {administrationItems.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className="block px-2 py-2 rounded-md text-sm text-foreground/70 hover:bg-secondary transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setMobileSection(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Departments */}
                <button
                  className="w-full flex items-center justify-between px-3 py-3 font-semibold text-primary/90 bg-secondary/40 border-t border-border"
                  onClick={() => setMobileSection(mobileSection === 'depts' ? null : 'depts')}
                  aria-expanded={mobileSection === 'depts'}
                >
                  <span>Departments</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileSection === 'depts' ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileSection === 'depts' && (
                  <div className="bg-secondary/10 border-b border-border">
                    <div className="px-2 py-1 max-h-64 overflow-y-auto">
                      {departments.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className="block px-2 py-2 rounded-md text-sm text-foreground/70 hover:bg-secondary transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setMobileSection(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* More */}
                <button
                  className="w-full flex items-center justify-between px-3 py-3 font-semibold text-primary/90 bg-secondary/40 border-t border-border"
                  onClick={() => setMobileSection(mobileSection === 'more' ? null : 'more')}
                  aria-expanded={mobileSection === 'more'}
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileSection === 'more' ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileSection === 'more' && (
                  <div className="bg-secondary/10">
                    <div className="px-2 py-1 max-h-80 overflow-y-auto">
                      {moreDropdownItems.map((item, idx) => (
                        item.hasDropdown ? (
                          <div key={idx} className="mb-1">
                            <p className="px-2 py-2 text-[13px] font-medium text-primary/90">{item.name}</p>
                            <div className="ml-2 border-l border-primary/10 pl-2">
                              {item.dropdownItems?.map((subItem, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={subItem.path}
                                  className="block py-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setMobileSection(null);
                                  }}
                                >
                                  <span className="inline-block w-1 h-1 bg-foreground/30 rounded-full mr-2" />
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            key={idx}
                            href={item.path}
                            className="block px-2 py-2 rounded-md text-sm text-foreground/70 hover:bg-secondary transition-colors"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setMobileSection(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Drawer footer */}
            <div className="h-[4.25rem] p-3 border-t flex items-center">
              <a
                href="https://sves.org.in/ecap/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground rounded-md py-3 font-semibold hover:bg-primary/90 transition-colors"
              >
                E-CAP
              </a>
            </div>
          </aside>
        </>
      )}
    </header>
  );
};
export default Header;
