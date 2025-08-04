import React, { useEffect, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedStatProps {
  iconName: string;
  label: string;
  value: string;
  index: number;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({ iconName, label, value, index }) => {
  const { ref, isVisible } = useIntersectionObserver(0.3);
  
  // Extract number from value string (e.g., "3000+" -> 3000)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  
  const { count, setIsVisible } = useCountUp(numericValue, 2500);

  useEffect(() => {
    if (isVisible) {
      setIsVisible(true);
    }
  }, [isVisible, setIsVisible]);

  const Icon = useMemo(() => (Icons as any)[iconName] || Icons.HelpCircle, [iconName]);

  return (
    <div 
      ref={ref}
      className="stat-card text-center p-6 rounded-xl bg-[#FFF8F0] border hover:shadow transition-all"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <Icon className="w-12 h-12 text-[#B22222] mx-auto mb-4 icon-bounce" />
      <h3 className="text-3xl font-bold stat-counter">
        {isVisible ? count : 0}{suffix}
      </h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};
