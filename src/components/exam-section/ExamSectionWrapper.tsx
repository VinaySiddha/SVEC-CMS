'use client';

import { ReactNode } from 'react';

interface ExamSectionWrapperProps {
  children: ReactNode;
}

export function ExamSectionWrapper({ children }: ExamSectionWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      {/* Exam Section Layout Wrapper */}
      {children}
    </div>
  );
}
