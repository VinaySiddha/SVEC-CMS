"use client"

import React, { useState, useEffect, useRef } from 'react'
import {
  Brain,
  BookOpen,
  Award,
  Users,
  Briefcase,
  FileText,
  Activity,
  Phone,
  HardHat,
  TrendingUp,
  Presentation,
  Trophy,
  Handshake,
  Building,
  ChevronRight,
  Home,
  Menu,
  X,
  ChevronRight as ChevronRightIcon,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface DepartmentSidebarProps {
  items: SidebarItem[]
  activeItem: string
  onItemClick: (itemId: string) => void
  title: string
  children: React.ReactNode
}

// Define color palette using only red and white
const COLORS = {
  PRIMARY: '#E01E26', // Vibrant red (primary) - main color
  SECONDARY: '#E01E26', // Same vibrant red
  TERTIARY: '#E01E26', // Same vibrant red
  LIGHT: '#FFFFFF', // White (background/light elements)
  TEXT_DARK: '#000000', // Black text color
  TEXT_LIGHT: '#FFFFFF' // White text color
};

const DepartmentSidebar: React.FC<DepartmentSidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  title,
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    setTooltip({ visible: false, text: '', x: 0, y: 0 });
  };
  
  // Handle tooltip display - fixed to appear outside sidebar
  const handleItemHover = (e: React.MouseEvent, text: string, show: boolean) => {
    if (!isSidebarCollapsed) return;
    
    if (show) {
      // Calculate position based on sidebar position and mouse position
      const sidebarRect = sidebarRef.current?.getBoundingClientRect();
      const rightEdge = sidebarRect ? sidebarRect.right : 64;
      setTooltip({ 
        visible: true, 
        text, 
        x: rightEdge + 12, // Position tooltip to the right of sidebar
        y: e.clientY 
      });
    } else {
      setTooltip({ visible: false, text: '', x: 0, y: 0 });
    }
  };

  return (
    <>
      {/* Global styles for scrollbars and animations */}
      <style jsx global>{`
        /* Custom Scrollbar for Sidebar */
        .department-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        
        .department-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .department-sidebar::-webkit-scrollbar-thumb {
          background: ${COLORS.PRIMARY};
          border-radius: 20px;
        }
        
        /* Custom Scrollbar for Content */
        .department-content::-webkit-scrollbar {
          width: 4px;
        }
        
        .department-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .department-content::-webkit-scrollbar-thumb {
          background: ${COLORS.PRIMARY};
          border-radius: 20px;
        }

        /* Prevent horizontal scrolling on main container */
        .department-container {
          max-width: 100vw;
          overflow-x: hidden;
        }

        /* Tooltip animations */
        @keyframes fadeInTooltip {
          from { opacity: 0; transform: translateY(-50%) translateX(-5px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        
        .tooltip-text {
          animation: fadeInTooltip 0.2s ease forwards;
        }
        
        /* No gradient animations needed anymore */
      `}</style>
      
      {/* Mobile menu toggle button - positioned in the title banner */}
      <div className="fixed top-[72px] left-4 z-[101] md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-full flex items-center justify-center h-10 w-10 shadow-lg transition-transform duration-200 hover:scale-105"
          style={{ 
            backgroundColor: COLORS.LIGHT,
            color: COLORS.PRIMARY,
            border: `2px solid ${COLORS.PRIMARY}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Floating action button for sidebar toggle on desktop */}
      <div className="fixed bottom-6 left-6 z-[100] hidden md:block">
        <button
          onClick={toggleSidebar}
          className="rounded-full flex items-center justify-center h-16 w-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          style={{ 
            background: `${COLORS.LIGHT}`,
            color: COLORS.PRIMARY,
            border: `2px solid ${COLORS.PRIMARY}`
          }}
        >
          {isSidebarCollapsed ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
        </button>
      </div>

      {/* Tooltip positioned outside of sidebar */}
      {tooltip.visible && (
        <div
          className="tooltip-text fixed px-3 py-1.5 text-xs rounded shadow-lg pointer-events-none whitespace-nowrap z-[110]"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateY(-50%)',
            background: `${COLORS.LIGHT}`,
            color: COLORS.PRIMARY,
            maxWidth: '200px',
            fontSize: '11px',
            border: `1px solid ${COLORS.PRIMARY}`,
            boxShadow: `0 2px 8px rgba(0,0,0,0.15)`
          }}
        >
          {tooltip.text}
        </div>
      )}
      
      {/* Department name head banner - visible on all screen sizes */}
      <div className="fixed left-0 right-0 top-[72px] h-16 z-[89] border-b flex items-center justify-center px-4 md:px-8"
        style={{ 
          background: `${COLORS.LIGHT}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderBottom: `1px solid ${COLORS.PRIMARY}`,
          overflow: 'visible'
        }}>
        <h1 className="font-bold text-2xl text-center px-4 whitespace-normal" style={{ color: COLORS.PRIMARY }}>{title}</h1>
      </div>
      
      <div className="department-container flex pt-[88px] h-screen overflow-hidden"> {/* Adjusted padding-top to accommodate the banner */}
        {/* Left Fixed Sidebar - Completely isolated scrolling */}
        <aside 
          ref={sidebarRef}
          className={`department-sidebar fixed left-0 top-[88px] h-[calc(100vh-88px)] ${isSidebarCollapsed ? 'w-16' : 'w-60'} border-r overflow-y-auto hidden md:block shadow-sm transition-all duration-300`}
          style={{ 
            backgroundColor: COLORS.LIGHT,
            borderColor: COLORS.PRIMARY,
            backgroundImage: 'none'
          }}
        >
          <div className="py-5 px-4">            
            <div className={`flex items-center gap-2 mb-5 px-1 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              <Home className="h-4 w-4" style={{ color: COLORS.PRIMARY }} />
              {!isSidebarCollapsed && <h3 className="text-sm font-semibold" style={{ color: COLORS.TEXT_DARK }}>Department Menu</h3>}
            </div>

            <nav className="space-y-1 px-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item.id)}
                  onMouseEnter={(e) => handleItemHover(e, item.label, true)}
                  onMouseLeave={(e) => handleItemHover(e, "", false)}
                  className={`
                    w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium
                    transition-all duration-200 hover:shadow-sm
                    ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}
                    ${activeItem === item.id ? 'transform scale-105 shadow-md' : 'hover:scale-105'}
                  `}
                  style={{
                    background: activeItem === item.id 
                      ? `${COLORS.LIGHT}` 
                      : 'transparent',
                    color: activeItem === item.id ? COLORS.PRIMARY : COLORS.TEXT_DARK,
                    borderLeft: activeItem === item.id ? `3px solid ${COLORS.PRIMARY}` : 'none',
                    boxShadow: activeItem === item.id ? '0 3px 6px rgba(0,0,0,0.15)' : 'none',
                    transform: activeItem === item.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <div className="flex-shrink-0 h-4 w-4">{item.icon}</div>
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Drawer */}
        <div
          className={`
            fixed inset-0 bg-black bg-opacity-50 z-[90] md:hidden
            ${isMobileMenuOpen ? 'block' : 'hidden'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`
            fixed top-0 left-0 h-full z-[99] w-64 transform transition-transform duration-300 ease-in-out md:hidden
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          style={{ 
            backgroundColor: COLORS.LIGHT,
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
            backgroundImage: 'none'
          }}
        >
          <div className="flex justify-between items-center p-4" 
            style={{ 
              borderBottom: `1px solid ${COLORS.PRIMARY}`,
              background: `${COLORS.LIGHT}`
            }}>
            <h2 className="font-semibold text-lg" style={{ color: COLORS.PRIMARY }}>Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-200"
              style={{ color: COLORS.TEXT_LIGHT }}
            >
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-68px)]"> {/* Add scrolling to mobile sidebar */}
            <div className="p-4">
              <nav className="space-y-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemClick(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium
                    transition-all duration-200 hover:scale-[1.02] my-1
                  `}
                  style={{
                    background: activeItem === item.id 
                      ? `${COLORS.LIGHT}`
                      : 'transparent',
                    color: activeItem === item.id ? COLORS.PRIMARY : COLORS.TEXT_DARK,
                    borderLeft: activeItem === item.id ? `3px solid ${COLORS.PRIMARY}` : 'none',
                    boxShadow: activeItem === item.id ? '0 3px 6px rgba(0,0,0,0.15)' : 'none',
                    transform: activeItem === item.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div className="flex-shrink-0 h-4 w-4">{item.icon}</div>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            </div>
          </div>
        </div>

        {/* Main Content - with its own independent scrolling */}
        <main 
          className={`department-content flex-1 overflow-y-auto pb-12 w-full transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-16' : 'md:pl-60'}`}
        >
          {children}
        </main>
      </div>
    </>
  )
}

export { DepartmentSidebar };
