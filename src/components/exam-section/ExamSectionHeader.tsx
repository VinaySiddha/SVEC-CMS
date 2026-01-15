'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronRight, LogOut } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface ExamSectionHeaderProps {
  pageTitle: string;
  breadcrumbs: Breadcrumb[];
  onLogout?: () => void;
}

export function ExamSectionHeader({ pageTitle, breadcrumbs, onLogout }: ExamSectionHeaderProps) {
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/exam-section/auth/login';
    }
  };

  return (
    <div className="bg-white/95 border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left side: Navigation buttons and breadcrumbs */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link 
            href="/exam-section/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-blue-200 font-medium text-sm whitespace-nowrap bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <span className="text-gray-400 text-sm">—</span>

          <Link 
            href="/exam-section/dashboard"
            className="text-gray-600 hover:text-gray-800 text-sm whitespace-nowrap"
          >
            ← Previous Page
          </Link>

          <ChevronRight className="w-4 h-4 text-gray-400" />

          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 text-sm whitespace-nowrap"
          >
            Home
          </Link>

          {/* Breadcrumb items */}
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={index} className="flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {breadcrumb.href && !breadcrumb.isActive ? (
                <Link 
                  href={breadcrumb.href}
                  className="text-gray-600 hover:text-gray-800 text-sm whitespace-nowrap"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  breadcrumb.isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600'
                }`}>
                  {breadcrumb.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Right side: Logout button */}
        <div className="flex items-center gap-2 md:justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-700 text-sm whitespace-nowrap font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
