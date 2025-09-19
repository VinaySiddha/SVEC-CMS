"use client";
import React from "react";
import Link from "next/link";
import { useLoading } from "@/contexts/LoadingContext";

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
  className = "",
  onClick,
  style,
  ...props
}) => {
  const { setLoading, setLoadingText } = useLoading();

  const handleClick = () => {
    if (onClick) onClick();

    if (!href.startsWith("http") && !href.startsWith("mailto") && !href.startsWith("tel")) {
      setLoading(true);
      setLoadingText("Loading page...");
    }
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
