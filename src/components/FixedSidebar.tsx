import React from 'react';
import { Menu, X, BookOpen, ChevronRight } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
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
}

const FixedSidebar: React.FC<FixedSidebarProps> = ({
  isOpen,
  onToggle,
  onClose,
  items,
  activeItem,
  onItemClick,
  title,
  buttonLabel = "Menu"
}) => {
  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    onClose();
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
      {/* Fixed Menu Toggle Button */}
      <div className="fixed top-28 left-4 z-50">
        <button
          onClick={onToggle}
          className="bg-primary text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
        >
          <Menu className="w-5 h-5" />
          <span className="hidden sm:inline">{buttonLabel}</span>
        </button>
      </div>

      {/* Fixed Sidebar */}
      {isOpen && (
        <div className="fixed top-24 left-4 w-80 h-[calc(100vh-7rem)] z-40 transition-all duration-300">
          <div className="bg-white rounded-lg shadow-xl h-full overflow-y-auto border border-gray-200">
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 border-b bg-primary/5 sticky top-0 z-10">
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
            <nav className="p-4 space-y-1">
              {items.map((item) => {
                const isActive = activeItem === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 hover:shadow-sm ${
                      isActive
                        ? 'bg-primary text-white font-medium shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon || getDefaultIcon(item.label)}
                    <span className="text-sm flex-1">{item.label}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default FixedSidebar;
