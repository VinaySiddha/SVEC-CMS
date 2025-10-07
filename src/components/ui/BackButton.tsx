'use client';

import { useNavigation } from '@/contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  showText?: boolean;
  customText?: string;
}

export function BackButton({ 
  className = "flex items-center text-gray-600 hover:text-gray-800 transition-colors", 
  showText = true, 
  customText = "Back" 
}: BackButtonProps) {
  const { goBack, canGoBack } = useNavigation();
  
  if (!canGoBack) {
    return null;
  }
  
  return (
    <button
      onClick={goBack}
      className={className}
      type="button"
      title="Go back"
    >
      <ArrowLeft className="w-5 h-5 mr-1" />
      {showText && <span>{customText}</span>}
    </button>
  );
}