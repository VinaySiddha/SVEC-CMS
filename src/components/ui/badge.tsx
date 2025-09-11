import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "bg-primary hover:bg-primary/80 text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    destructive: "bg-destructive hover:bg-destructive/80 text-destructive-foreground",
    outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
    success: "bg-green-500 hover:bg-green-600 text-white"
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantClasses[variant]} ${className || ""}`}
      {...props}
    />
  );
}

export { Badge };
