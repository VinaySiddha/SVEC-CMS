"use client";
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48', 
    large: 'w-64 h-64'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <img
          src="/vasavi_logo.png"
          alt="SVEC Logo"
          className={`${sizeClasses[size]} object-contain animate-fade-pulse`}
        />
      </div>
      
      <style jsx>{`
        @keyframes fade-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-pulse {
          animation: fade-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
