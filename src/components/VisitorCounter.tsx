"use client";
import React, { useState, useEffect } from 'react';
import { Eye, Users, Globe, TrendingUp } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    // Get current visitor count
    let totalCount = Number(localStorage.getItem('totalVisitors') || '0');
    
    // Get today's count
    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    let dailyCount = Number(localStorage.getItem('todayVisitors') || '0');
    
    // Reset daily count if it's a new day
    if (lastVisitDate !== today) {
      dailyCount = 0;
      localStorage.setItem('lastVisitDate', today);
    }
    
    // Increment counts
    totalCount += 1;
    dailyCount += 1;
    
    // Store updated counts
    localStorage.setItem('totalVisitors', totalCount.toString());
    localStorage.setItem('todayVisitors', dailyCount.toString());
    
    // Animate the counter
    setIsAnimating(true);
    setTimeout(() => {
      setVisitorCount(totalCount);
      setTodayCount(dailyCount);
      setIsAnimating(false);
    }, 500);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl shadow-xl">
      <div className="bg-gray-900 rounded-2xl p-6">
        <div className="text-center mb-4">
          <h3 className="text-white font-bold text-lg mb-2 flex items-center justify-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            Website Analytics
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Total Visitors */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-white transition-all duration-500 ${isAnimating ? 'scale-110 text-blue-400' : ''}`}>
                {formatNumber(visitorCount)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Total Visitors</div>
            </div>
          </div>
          
          {/* Today's Visitors */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-white transition-all duration-500 ${isAnimating ? 'scale-110 text-green-400' : ''}`}>
                {todayCount}
              </div>
              <div className="text-xs text-gray-400 mt-1">Today</div>
            </div>
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="flex items-center justify-center mt-4 gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Live</span>
        </div>
        
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-75 animate-pulse -z-10"></div>
      </div>
    </div>
  );
};

export default VisitorCounter;
