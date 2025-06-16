import React from "react";
import { cn } from "../../lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "" }) => {
  return (
    <section
      className={cn(
        "w-full max-w-screen-xl md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl mx-auto px-6 lg:px-16 py-6 sm:py-8",
        className
      )}>
      {children}
    </section>
  );
};

export default Section;
