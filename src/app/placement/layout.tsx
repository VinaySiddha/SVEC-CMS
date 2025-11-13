'use client';

import '@/styles/placement-layout.css';

export default function PlacementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="placement-dashboard-layout">
      {children}
    </div>
  );
}
