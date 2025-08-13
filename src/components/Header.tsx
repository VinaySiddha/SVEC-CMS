"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

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
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [mobileNestedSubmenu, setMobileNestedSubmenu] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ top: number, left: number } | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      // Don't close if moving to a child element
      if (currentTarget.contains(relatedTarget)) {
        return;
      }
    }

    // Add a delay before closing to prevent accidental closures
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
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
    { name: 'Master of Business Administration', path: '/departments/mba' },
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
    { name: 'Grievance Portal', path: '/grievance' },
    { name: 'NAAC Accreditation', path: '/naac' },
    { name: 'Research & Development', path: '/r-and-d' },
    { name: 'Campus Life', path: '/campus-life' },
    { name: 'Student Activities', path: '/student-activities' },
    { name: 'Sports & Recreation', path: '/sports' },
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/vasavi_logo.png"
              alt="SVEC Logo"
              className="w-14 h-14 object-contain"
            />
            <div className={textColorClass}>
              <h1 className="text-xl font-bold leading-tight">Sri Vasavi</h1>
              <p className="text-xs leading-tight">Engineering College</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {mainNavLinks.map(link => (
              <Link key={link.path} href={link.path} className={`${textColorClass} hover:text-primary transition-colors ${pathname === link.path ? 'text-primary font-semibold' : ''}`}>
                {link.name}
              </Link>
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
                  className="absolute top-full -left-4 mt-2 w-56 bg-background rounded-md shadow-lg border py-1 z-50"
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
                  {administrationItems.map(item => (
                    <Link 
                      key={item.path} 
                      href={item.path} 
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
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
                  className="absolute top-full -left-4 mt-2 w-64 bg-background rounded-md shadow-lg border py-1 z-50 max-h-96 overflow-y-auto"
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
                    // Only close if moving outside the entire dropdown area
                    const relatedTarget = e.relatedTarget as Node;
                    const currentTarget = e.currentTarget as Node;

                    // Don't close if moving to a child element within the dropdown
                    if (currentTarget.contains(relatedTarget)) {
                      return;
                    }

                    // Add delay to prevent accidental closure and close submenu
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setActiveDropdown(null);
                      setActiveSubmenu(null);
                      setSubmenuPosition(null);
                    }, 200);
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
                      </div>
                    ) : (
                      <Link
                        key={idx}
                        href={item.path}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
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
                  className="fixed bg-background shadow-lg border z-[60] max-h-96 overflow-y-auto
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
                  className="absolute top-full -right-4 mt-2 w-64 bg-background rounded-md shadow-lg border py-1 max-h-96 overflow-y-auto z-50"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => {
                    setActiveDropdown('depts');
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const relatedTarget = e.relatedTarget as Element;
                    const dropdown = document.querySelector('[data-dropdown="depts"]');
                    if (dropdown && !dropdown.contains(relatedTarget)) {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 200);
                    }
                  }}
                >
                  {departments.map(item => (
                    <Link 
                      key={item.path} 
                      href={item.path} 
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
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
              className={`lg:hidden ${textColorClass}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t">
          <style jsx>{`
            .mobile-nav-scroll {
              scrollbar-width: none;
              -ms-overflow-style: none;
              -webkit-overflow-scrolling: touch;
            }
            .mobile-nav-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <nav className="py-4 px-4 space-y-4 text-base font-medium mobile-nav-scroll max-h-[calc(100vh-5rem)] overflow-y-auto">
            {mainNavLinks.map(link => (
              <Link key={link.path} href={link.path} className="block py-2.5 px-4 text-foreground/80 hover:text-primary hover:bg-secondary/20 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            {/* Administration Section */}
            <div className="mb-4">
              <button 
                onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === 'admin' ? null : 'admin')}
                className="w-full py-3 px-4 flex items-center justify-between text-base font-semibold text-foreground hover:bg-secondary/30 rounded-lg transition-all duration-200"
              >
                <span>Administration</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileActiveSubmenu === 'admin' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileActiveSubmenu === 'admin' ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="p-2 space-y-1 bg-secondary/5 rounded-lg mx-2">
                  {administrationItems.map(item => (
                    <Link 
                      key={item.path} 
                      href={item.path} 
                      className="block py-2.5 px-4 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/20 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Departments Section */}
            <div className="mb-4">
              <button 
                onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === 'depts' ? null : 'depts')}
                className="w-full py-3 px-4 flex items-center justify-between text-base font-semibold text-foreground hover:bg-secondary/30 rounded-lg transition-all duration-200"
              >
                <span>Departments</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileActiveSubmenu === 'depts' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileActiveSubmenu === 'depts' ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="p-2 space-y-1 bg-secondary/5 rounded-lg mx-2">
                  {departments.map(item => (
                    <Link 
                      key={item.path} 
                      href={item.path} 
                      className="block py-2.5 px-4 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/20 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* More Menu Section */}
            <div className="mb-4">
              <button 
                onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === 'more' ? null : 'more')}
                className="w-full py-3 px-4 flex items-center justify-between text-base font-semibold text-foreground hover:bg-secondary/30 rounded-lg transition-all duration-200"
              >
                <span>More</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileActiveSubmenu === 'more' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileActiveSubmenu === 'more' ? 'max-h-[1200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="p-2 space-y-2 bg-secondary/5 rounded-lg mx-2">
                  {moreDropdownItems.map((item, idx) => (
                    item.hasDropdown ? (
                      <div key={idx} className="mb-2">
                        <div 
                          className="w-full py-2.5 px-4 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/20 rounded-lg transition-colors duration-200 flex items-center justify-between cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            setMobileNestedSubmenu(mobileNestedSubmenu === `more-${idx}` ? null : `more-${idx}`);
                          }}
                        >
                          <span className="font-medium">{item.name}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${mobileNestedSubmenu === `more-${idx}` ? 'rotate-90' : ''}`} />
                        </div>
                        <div className={`mt-1 pl-4 space-y-1 bg-secondary/10 rounded-lg overflow-hidden transition-all duration-300 ${
                          mobileNestedSubmenu === `more-${idx}` ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
                        }`}>
                          {item.dropdownItems?.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              href={subItem.path}
                              className="block py-2.5 px-4 text-sm text-foreground/60 hover:text-primary hover:bg-secondary/20 rounded-lg transition-colors duration-200"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                setIsMenuOpen(false);
                                setMobileActiveSubmenu(null);
                                setMobileNestedSubmenu(null);
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-primary/40 rounded-full" />
                                <span>{subItem.name}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={idx}
                        href={item.path}
                        className="block py-2.5 px-4 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/20 rounded-lg transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          setIsMenuOpen(false);
                          setMobileActiveSubmenu(null);
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>

            <a
              href="https://sves.org.in/ecap/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-primary text-primary-foreground px-4 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors mt-4"
            >
              E-CAP
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;
