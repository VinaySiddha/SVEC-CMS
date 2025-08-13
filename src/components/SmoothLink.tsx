"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

interface SmoothLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  [key: string]: any;
}

const SmoothLink: React.FC<SmoothLinkProps> = ({
  href,
  children,
  className = '',
  onClick,
  style,
  ...props
}) => {
  const router = useRouter();
  const { setLoading, setLoadingText } = useLoading();

  const handleClick = (e: React.MouseEvent) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick();
    }

    // For external links, let the default behavior happen
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
      return;
    }

    // For internal links, add immediate visual feedback and quick navigation
    e.preventDefault();

    // Add immediate visual feedback to the clicked element
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(0.96)';
    target.style.opacity = '0.7';

    // Reset the visual feedback quickly
    setTimeout(() => {
      target.style.transform = '';
      target.style.opacity = '';
    }, 100);

    // Show quick loading indicator immediately
    setLoading(true);
    setLoadingText('Loading page...');

    // Navigate immediately for fast page opening
    setTimeout(() => {
      router.push(href);
    }, 50);
  };

  return (
    <Link
      href={href}
      className={`transition-all duration-100 hover:scale-105 active:scale-95 ${className}`}
      onClick={handleClick}
      style={style}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SmoothLink;
