import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  center?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md", 
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full"
};

const paddingClasses = {
  none: "",
  sm: "px-4 sm:px-6",
  md: "px-6 sm:px-8",
  lg: "px-8 sm:px-12",
  xl: "px-12 sm:px-16"
};

export default function MaxWidthWrapper({
  children,
  className,
  maxWidth = "7xl",
  padding = "md",
  center = true
}: MaxWidthWrapperProps) {
  return (
    <div className={cn(
      "w-full",
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      center && "mx-auto",
      className
    )}>
      {children}
    </div>
  );
} 