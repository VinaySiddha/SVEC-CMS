import React from 'react';
import { Menu, X, BookOpen, ChevronRight } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode | (() => React.ReactNode);
}

interface FixedSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (itemId: string) => void;
  title: string;
  buttonLabel?: string;
  children: React.ReactNode;
}

const FixedSidebar: React.FC<FixedSidebarProps> = ({
  isOpen,
  onToggle,
  onClose,
  items,
  activeItem,
  onItemClick,
  title,
  buttonLabel = "Menu",
  children
}) => {
  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const getDefaultIcon = (label: string) => {
    // Provide default icons based on common department section names
    if (label.toLowerCase().includes('profile')) return <BookOpen className="w-4 h-4" />;
    if (label.toLowerCase().includes('faculty')) return <BookOpen className="w-4 h-4" />;
    if (label.toLowerCase().includes('syllabus')) return <BookOpen className="w-4 h-4" />;
    if (label.toLowerCase().includes('facilities')) return <BookOpen className="w-4 h-4" />;
    if (label.toLowerCase().includes('library')) return <BookOpen className="w-4 h-4" />;
    if (label.toLowerCase().includes('placement')) return <BookOpen className="w-4 h-4" />;
    if (label.toLowerCase().includes('achievement')) return <BookOpen className="w-4 h-4" />;
    if (label.toLowerCase().includes('workshop')) return <BookOpen className="w-4 h-4" />;
    if (label.toLowerCase().includes('training')) return <BookOpen className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
  };

  return (
    <>
      {/* Fixed Menu Toggle Button - Exact EEE Style */}
      <div 
        className={`
          fixed z-50 transition-all duration-300
          lg:top-50 lg:left-5
          top-71 left-4
        `}
      >
        <button
          onClick={onToggle}
          className="bg-[#B22222] text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-[#8B0000] transition-all shadow-lg hover:shadow-xl"
        >
          <Menu className="w-5 h-5" />
          <span className="hidden sm:inline">{buttonLabel}</span>
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Mobile Backdrop Overlay - Only for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Fixed Sidebar */}
      <div 
        className={`
          transition-all duration-300 ease-in-out
          fixed z-50 overflow-hidden
          
          lg:top-[300px] lg:left-5 lg:h-[600px]
          lg:${isOpen ? 'w-80 bg-white shadow-xl border border-gray-200 rounded-lg' : 'w-0 bg-transparent shadow-none border-none'}
          
          top-28 left-0 w-80 h-[calc(100vh-8rem)]
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${isOpen ? 'translate-x-4 bg-white shadow-xl border border-gray-200 rounded-lg' : '-translate-x-full bg-transparent shadow-none border-none'}
        `}
      >
        <div className={`h-full flex flex-col transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b bg-primary/5 sticky top-0 z-10 flex-shrink-0">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {items.map((item) => {
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 hover:shadow-sm ${isActive
                    ? 'bg-primary text-white font-medium shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {typeof item.icon === 'function' ? item.icon() : (item.icon || getDefaultIcon(item.label))}
                  <span className="text-sm flex-1">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Layout - Responsive with shifting behavior */}
      <div className="container mx-auto px-4">
        <div className="flex relative">
          {/* Main Content - Responsive margins like EEE */}
          <main 
            className={`
              w-full min-h-screen py-8 transition-all duration-300 ease-in-out
              ${isOpen ? 'lg:ml-80' : 'lg:ml-0'}
              ml-0
            `}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default FixedSidebar;
