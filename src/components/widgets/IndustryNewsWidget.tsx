"use client";

import { IndustryNewsfeed } from '@/components/industry-news';
import { useState, useEffect } from 'react';
import { IndustryNews } from '@/utils/industry-news-utils';

export default function IndustryNewsfeedWidget({ limit = 3 }) {
  const [loading, setLoading] = useState<boolean>(true);
  
  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded mb-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Latest Industry Updates</h3>
      <IndustryNewsfeed limit={limit} showViewAllLink={true} />
    </div>
  );
}
