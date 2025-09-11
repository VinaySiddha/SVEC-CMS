import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  className?: string;
  defaultValue?: string;
  collapsible?: boolean;
}

const Accordion = ({ children, className }: AccordionProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
};

interface AccordionItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const AccordionItem = ({ children, className }: AccordionItemProps) => {
  return (
    <div className={cn("border-b", className)}>
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const AccordionTrigger = ({ children, className, onClick }: AccordionTriggerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline",
        className
      )}
      onClick={handleClick}
    >
      {children}
      <ChevronDown 
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )} 
      />
    </div>
  );
};

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps) => {
  return (
    <div className={cn("pb-4 pt-0", className)}>
      {children}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
