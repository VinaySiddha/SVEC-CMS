import React from "react";

interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  return <div className="relative z-50">{children}</div>;
};

interface AlertDialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({ asChild = false, children }) => {
  return <div className="inline-block">{children}</div>;
};

interface AlertDialogContentProps {
  className?: string;
  children: React.ReactNode;
}

export const AlertDialogContent: React.FC<AlertDialogContentProps> = ({ className, children }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-in fade-in-0 duration-200">
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 ${className || ''}`}>
        {children}
      </div>
    </div>
  );
};

interface AlertDialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({ className, children }) => {
  return <div className={`mb-4 ${className || ''}`}>{children}</div>;
};

interface AlertDialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({ className, children }) => {
  return <h2 className={`text-xl font-semibold ${className || ''}`}>{children}</h2>;
};

interface AlertDialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({ className, children }) => {
  return <p className={`text-gray-500 mt-2 ${className || ''}`}>{children}</p>;
};

interface AlertDialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({ className, children }) => {
  return <div className={`mt-6 flex justify-end gap-3 ${className || ''}`}>{children}</div>;
};

interface AlertDialogActionProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const AlertDialogAction: React.FC<AlertDialogActionProps> = ({ className, onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`}
    >
      {children}
    </button>
  );
};

interface AlertDialogCancelProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({ className, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 ${className || ''}`}
    >
      {children}
    </button>
  );
};
