"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative flex  h-12 items-center justify-evenly gap-1 md:gap-36 rounded-lg  p-1",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 flex items-center justify-center px-3 py-2 md:text-sm text-xs font-medium transition-all",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2 ", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const SlidingUnderline = ({ activeTab }: { activeTab: number }) => {
  return (
    <div
      className="absolute bottom-0 left-0 h-0.5 bg-primary-gold transition-transform duration-300"
      style={{
        transform: `translateX(${activeTab * 100}%)`,
        width: `${100 / 3}%`,
      }}
    />
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent, SlidingUnderline };
