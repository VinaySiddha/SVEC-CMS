"use client";
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeInScale';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  const animationClasses = {
    fadeInUp: 'animate-fade-in-up',
    fadeInLeft: 'animate-fade-in-left',
    fadeInRight: 'animate-fade-in-right',
    fadeInScale: 'animate-fade-in-scale',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? `opacity-100 translate-y-0 translate-x-0 scale-100 ${animationClasses[animation]}`
          : 'opacity-0 translate-y-8 scale-95'
      } ${className}`}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
