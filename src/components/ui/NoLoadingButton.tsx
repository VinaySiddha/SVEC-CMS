"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface NoLoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

/**
 * Button component that prevents global loading states from being triggered
 * Useful for tabs, toggles, and other UI interactions that shouldn't show loading indicators
 */
export const NoLoadingButton: React.FC<NoLoadingButtonProps> = ({
  children,
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <Button
      data-no-loading="true"
      className={className}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};

export default NoLoadingButton;