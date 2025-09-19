"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  text?: string;
  duration?: number; // Animation duration in seconds
}

/**
 * Logo loader component that shows the college logo with smooth animations
 * Used during tab switches and content loading to provide visual feedback
 */
export const LogoLoader: React.FC<LogoLoaderProps> = ({
  size = 'md',
  className = '',
  showText = true,
  text = 'Loading...',
  duration = 1.5
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center space-y-2 animate-pulse",
        className
      )}
      style={{
        animation: `logoFadeIn 0.2s ease-out, logoPulse ${duration}s ease-in-out infinite`
      }}
    >
      {/* College Logo */}
      <div 
        className={cn(
          "relative rounded-full bg-gradient-to-br from-primary/10 to-primary/30 p-2 shadow-lg",
          sizeClasses[size]
        )}
        style={{
          animation: `logoSpin ${duration * 2}s linear infinite`
        }}
      >
        {/* Logo Image - Replace with your actual logo */}
        <div 
          className="w-full h-full bg-primary rounded-full flex items-center justify-center text-white font-bold"
          style={{
            fontSize: size === 'sm' ? '8px' : size === 'md' ? '10px' : size === 'lg' ? '12px' : '16px'
          }}
        >
          SVEC
        </div>
        
        {/* Animated ring around logo */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          style={{
            animation: `logoRing ${duration}s ease-in-out infinite alternate`
          }}
        />
      </div>

      {/* Loading text */}
      {showText && (
        <span 
          className={cn(
            "text-primary/80 font-medium animate-pulse",
            textSizeClasses[size]
          )}
          style={{
            animation: `textFade ${duration}s ease-in-out infinite alternate`
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default LogoLoader;