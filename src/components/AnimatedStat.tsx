import React, { useEffect, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedStatProps {
  iconName: keyof typeof Icons;
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

  const Icon = useMemo(() => Icons[iconName] || Icons.HelpCircle, [iconName]);

  return (
    <div 
      ref={ref}
      className="text-center p-6 bg-card rounded-lg border shadow-sm"
    >
      <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
      <h3 className="text-3xl font-bold text-foreground">
        {isVisible ? count : 0}{suffix}
      </h3>
      <p className="text-muted-foreground mt-1">{label}</p>
    </div>
  );
};
