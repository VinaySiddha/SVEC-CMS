import * as React from "react";

interface PopoverProps {
  children: React.ReactNode;
}

interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface PopoverContentProps {
  className?: string;
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}

const PopoverRoot: React.FC<PopoverProps> = ({ children }) => {
  return <div className="relative inline-block">{children}</div>;
};

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children, asChild = false }) => {
  return <div className="inline-block">{children}</div>;
};

const PopoverContent: React.FC<PopoverContentProps> = ({ className = "", align = "center", children }) => {
  return (
    <div 
      className={`absolute mt-1 z-50 rounded-md border border-gray-200 bg-white p-4 shadow-md ${className}`}
      style={{ 
        left: align === "start" ? "0" : align === "end" ? "auto" : "50%",
        right: align === "end" ? "0" : "auto",
        transform: align === "center" ? "translateX(-50%)" : "none"
      }}
    >
      {children}
    </div>
  );
};

const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});

export { Popover };
