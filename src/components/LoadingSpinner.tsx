"use client";
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large' | 'lg' | 'sm';
  className?: string;
  variant?: 'default' | 'quick';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  className = '',
  variant = 'default',
  text
}) => {
  const sizeClasses = {
    small: 'w-14 h-14',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
    lg: 'w-20 h-20',
    sm: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="/vasavi_logo.png"
              alt="SVEC Logo"
              className={`${sizeClasses[size]} object-contain`}
            />
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="text-2xl font-bold text-primary">Sri Vasavi</h1>
            <p className="text-sm font-medium text-foreground/70">Engineering College</p>
          </div>
        </div>

        {/* Rotating red dots */}
        <div className="mt-5 flex flex-col items-center">
          <div className="relative w-12 h-12" aria-hidden="true">
            <span className="orbit-dot bg-red-600" style={{ animationDelay: '0ms' }} />
            <span className="orbit-dot bg-red-600" style={{ animationDelay: '-260ms' }} />
            <span className="orbit-dot bg-red-600" style={{ animationDelay: '-520ms' }} />
          </div>

          {text && (
            <p className="mt-4 text-sm font-medium text-foreground/60 animate-pulse">
              {text}
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translate(18px);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translate(18px);
          }
        }

        .orbit-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          animation: orbit 780ms linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
