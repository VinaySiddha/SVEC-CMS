import React, { useEffect } from 'react';
import { Users, BookOpen, Building, TrendingUp, Award, HelpCircle } from 'lucide-react';
import type * as LucideIcons from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedStatProps {
  iconName: keyof typeof LucideIcons;
  label: string;
  value: string;
  index: number;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({ iconName, label, value, index }) => {
  const { ref, isVisible } = useIntersectionObserver(0.3);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  const { count, setIsVisible: setCountUpIsVisible } = useCountUp(numericValue, 2500);

  useEffect(() => {
    if (isVisible) {
      setCountUpIsVisible(true);
    }
  }, [isVisible, setCountUpIsVisible]);

  // If no label is provided, render only the animated number
  if (!label) {
    return (
      <span ref={ref}>
        {isVisible ? count : 0}{suffix}
      </span>
    );
  }

  // Render the appropriate icon based on iconName
  const renderIcon = () => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-12 h-12 text-primary mx-auto mb-4" />;
      case 'BookOpen':
        return <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />;
      case 'Building':
        return <Building className="w-12 h-12 text-primary mx-auto mb-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />;
      case 'Award':
        return <Award className="w-12 h-12 text-primary mx-auto mb-4" />;
      default:
        return <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />;
    }
  };

  // For the default stat cards
  return (
    <div
      ref={ref}
      className="text-center p-6 bg-card rounded-lg border shadow-sm"
    >
      {renderIcon()}
      <h3 className="text-3xl font-bold text-foreground">
        {isVisible ? count : 0}{suffix}
      </h3>
      <p className="text-muted-foreground mt-1">{label}</p>
    </div>
  );
};
