import React from 'react';

export default function ExamSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      {/* Exam Section Layout Wrapper */}
      {children}
    </div>
  );
}
