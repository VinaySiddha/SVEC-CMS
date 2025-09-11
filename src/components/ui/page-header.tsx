import React from "react";

interface PageHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function PageHeader({
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

interface PageHeaderHeadingProps {
  className?: string;
  children: React.ReactNode;
}

export function PageHeaderHeading({
  className,
  children,
  ...props
}: PageHeaderHeadingProps) {
  return (
    <h1
      className={`text-3xl font-bold tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

interface PageHeaderDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function PageHeaderDescription({
  className,
  children,
  ...props
}: PageHeaderDescriptionProps) {
  return (
    <div
      className={`text-lg text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
