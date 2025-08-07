"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check scroll position on initial load
    return () => window.removeEventListener('scroll', handleScroll);
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
    }, 300);
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
    { name: 'UGC Item 1', path: '/ugc/item-1' },
    { name: 'UGC Item 2', path: '/ugc/item-2' }
  ];

  // NIRF dropdown items
  const nirfDropdownItems = [
    { name: 'SVEC-Overall Category NIRF', path: '/nirf/overall' },
    { name: 'SVEC-Engineering Category NIRF', path: '/nirf/engineering' }
  ];

  // Other Links dropdown items
  const otherLinksDropdownItems = [
    { name: 'Faculty Achievements', path: '/other-links/faculty-achievements' },
    { name: 'Anti Ragging Committee', path: '/other-links/anti-ragging' },
    { name: 'Internal Complaints Committee', path: '/other-links/internal-complaints' },
    { name: 'SC/ST Welfare Committee', path: '/other-links/scst-welfare' },
    { name: 'Institute Industry Cell', path: '/other-links/industry-cell' },
    { name: 'Other Important Committee', path: '/other-links/important-committees' },
    { name: 'Alumni Engagement', path: '/other-links/alumni' },
    { name: 'Entrepreneurial Quest', path: '/other-links/entrepreneurial' }
  ];

  // More dropdown items based on the screenshot
  const moreDropdownItems = [
    { name: 'V Grievance', path: '/grievance' },
    { name: 'NAAC', path: '/naac' },
    { name: 'R & D', path: '/r-and-d' },
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
    { name: 'About Us', path: '/about-us' },
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

            <div className="relative">
              <button
                className={`flex items-center ${textColorClass} hover:text-primary transition-colors`}
                onClick={() => activeDropdown === 'admin' ? setActiveDropdown(null) : setActiveDropdown('admin')}
                onMouseEnter={() => handleMouseEnter('admin')}
              >
                Administration <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === 'admin' && (
                <div
                  className="absolute top-full -left-4 mt-2 w-56 bg-background rounded-md shadow-lg border py-1 z-50"
                  onMouseEnter={() => setActiveDropdown('admin')}
                  onMouseLeave={(e) => {
                    // Only close if moving outside the entire dropdown area
                    const relatedTarget = e.relatedTarget as Node;
                    const currentTarget = e.currentTarget as Node;
                    if (!currentTarget.contains(relatedTarget)) {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 300);
                    }
                  }}
                >
                  {administrationItems.map(item => (
                    <Link key={item.path} href={item.path} className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`flex items-center ${textColorClass} hover:text-primary transition-colors`}
                onClick={() => activeDropdown === 'more' ? setActiveDropdown(null) : setActiveDropdown('more')}
                onMouseEnter={() => handleMouseEnter('more')}
              >
                More <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === 'more' && (
                <div
                  className="absolute top-full -left-4 mt-2 w-64 bg-background rounded-md shadow-lg border py-1 z-50"
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
                    const containsOrIs = currentTarget.contains(relatedTarget) ||
                      (relatedTarget && relatedTarget.textContent?.includes('UGC')) ||
                      (relatedTarget && relatedTarget.textContent?.includes('NIRF')) ||
                      (relatedTarget && relatedTarget.textContent?.includes('Other Links'));

                    // Don't close if moving to a child or submenu element
                    if (containsOrIs) {
                      return;
                    }

                    dropdownTimeoutRef.current = setTimeout(() => {
                      setActiveDropdown(null);
                    }, 300);
                  }}
                >
                  {moreDropdownItems.map((item, idx) => (
                    item.hasDropdown ? (
                      <div
                        key={idx}
                        className="group relative py-2"
                        onMouseEnter={() => {
                          setActiveDropdown(`more-${item.name}`);
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                            dropdownTimeoutRef.current = null;
                          }
                        }}
                      >
                        <div
                          className="flex items-center justify-between px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                          onClick={() => activeDropdown === `more-${item.name}` ? setActiveDropdown('more') : setActiveDropdown(`more-${item.name}`)}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="w-3 h-3 ml-2" />
                        </div>
                        {activeDropdown === `more-${item.name}` && (
                          <div
                            className="absolute left-full top-0 w-56 bg-background rounded-md shadow-lg border py-1 z-50"
                            onMouseEnter={() => {
                              setActiveDropdown(`more-${item.name}`);
                              if (dropdownTimeoutRef.current) {
                                clearTimeout(dropdownTimeoutRef.current);
                                dropdownTimeoutRef.current = null;
                              }
                            }}
                          >
                            {item.dropdownItems?.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                href={subItem.path}
                                className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={idx}
                        href={item.path}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`flex items-center ${textColorClass} hover:text-primary transition-colors`}
                onClick={() => activeDropdown === 'depts' ? setActiveDropdown(null) : setActiveDropdown('depts')}
                onMouseEnter={() => handleMouseEnter('depts')}
              >
                Departments <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {activeDropdown === 'depts' && (
                <div
                  className="absolute top-full -right-4 mt-2 w-64 bg-background rounded-md shadow-lg border py-1 max-h-96 overflow-y-auto z-50"
                  onMouseEnter={() => setActiveDropdown('depts')}
                  onMouseLeave={(e) => {
                    // Only close if moving outside the entire dropdown area
                    const relatedTarget = e.relatedTarget as Node;
                    const currentTarget = e.currentTarget as Node;
                    if (!currentTarget.contains(relatedTarget)) {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 300);
                    }
                  }}
                >
                  {departments.map(item => (
                    <Link key={item.path} href={item.path} className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary">
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
          <nav className="py-4 px-4 space-y-2 text-base font-medium">
            {mainNavLinks.map(link => (
              <Link key={link.path} href={link.path} className="block py-2 text-foreground/80 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <div>
              <p className="py-2 font-semibold text-primary">Administration</p>
              <div className="pl-4 border-l-2 border-border">
                {administrationItems.map(item => (
                  <Link key={item.path} href={item.path} className="block py-2 text-sm text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="py-2 font-semibold text-primary">Departments</p>
              <div className="pl-4 border-l-2 border-border max-h-48 overflow-y-auto">
                {departments.map(item => (
                  <Link key={item.path} href={item.path} className="block py-2 text-sm text-foreground/70 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* More Menu for Mobile */}
            <div>
              <p className="py-2 font-semibold text-primary">More</p>
              <div className="pl-4 border-l-2 border-border">
                {moreDropdownItems.map((item, idx) => (
                  item.hasDropdown ? (
                    <div key={idx} className="mb-2">
                      <p className="py-1.5 font-medium text-primary/90 flex items-center">
                        {item.name}
                      </p>
                      <div className="pl-3 border-l border-primary/10">
                        {item.dropdownItems?.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            href={subItem.path}
                            className="block py-1.5 text-sm text-foreground/70 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="inline-block w-1 h-1 bg-foreground/30 rounded-full mr-2"></span>
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={idx}
                      href={item.path}
                      className="block py-1.5 text-sm text-foreground/70 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
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
