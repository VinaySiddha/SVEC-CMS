"use client";

import React, { Suspense } from 'react';
import AchievementsList from '@/components/achievement/AchievementsList';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ManageFacultyAchievementsPage() {
  return (
    <div className="container py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <AchievementsList isAdmin={true} />
      </Suspense>
    </div>
  );
}
