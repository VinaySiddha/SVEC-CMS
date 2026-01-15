"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedLoaderProps {
  onLoadingComplete: () => void;
}

const OptimizedLoader: React.FC<OptimizedLoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Faster progress simulation with realistic timing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerate near the end for better UX
        const increment = prev > 80 ? 20 : prev > 50 ? 15 : 10;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    // Complete after 2 seconds
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setIsComplete(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 400);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-busy={!isComplete}
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-yellow-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with clean animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <Image
              src="/vasavi_logo.png"
              alt="SVEC Logo"
              width={120}
              height={120}
              priority
              className="animate-[scaleIn_0.5s_ease-out]"
              style={{
                animation: 'scaleIn 0.5s ease-out forwards',
                willChange: 'transform'
              }}
            />
          </div>
        </div>

        {/* College name */}
        <div className="text-center space-y-2 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-yellow-600 to-blue-600 bg-clip-text text-transparent">
            Sri Vasavi
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Engineering College
          </p>
        </div>

        {/* Modern progress bar */}
        <div className="w-64 md:w-80 space-y-3 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[slideRight_1s_infinite]" />
            </div>
          </div>

          {/* Progress percentage */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="font-medium">Loading...</span>
            <span className="font-semibold tabular-nums">{progress}%</span>
          </div>
        </div>

        {/* Status text */}
        <p className="text-sm text-gray-500 animate-pulse">
          Preparing your experience
        </p>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedLoader;
