'use client';

import Link from 'next/link';
import { Database, ArrowLeft } from 'lucide-react';

interface ExamSectionTopHeaderProps {
  showNavigation?: boolean;
}

export function ExamSectionTopHeader({ showNavigation = true }: ExamSectionTopHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 sticky top-0 z-40 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left side: Section branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Exam Section</h2>
              <p className="text-blue-100 text-sm">Department Management Dashboard</p>
            </div>
          </div>

          {/* Right side: Navigation links */}
          {showNavigation && (
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/exam-section/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 text-white font-medium text-sm whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 text-white font-medium text-sm whitespace-nowrap"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
