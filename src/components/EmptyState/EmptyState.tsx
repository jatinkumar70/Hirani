"use client";

import { motion } from "framer-motion";
import { Search, Home, MapPin, Calendar, RefreshCw } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { cn } from "../../lib/utils";

interface EmptyStateProps {
  icon?: "search" | "home" | "map" | "calendar" | "refresh";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const icons = {
  search: Search,
  home: Home,
  map: MapPin,
  calendar: Calendar,
  refresh: RefreshCw,
};

const sizeConfig = {
  sm: {
    container: "py-8",
    icon: "w-12 h-12",
    title: "text-lg",
    description: "text-sm",
  },
  md: {
    container: "py-28",
    icon: "w-16 h-16",
    title: "text-xl",
    description: "text-base",
  },
  lg: {
    container: "py-20",
    icon: "w-20 h-20",
    title: "text-2xl",
    description: "text-lg",
  },
};

export function EmptyState({
  icon = "search",
  title = "No Properties Found",
  description = "We couldn't find any properties matching your criteria. Try adjusting your search filters or check back later.",
  actionLabel,
  onAction,
  className,
  size = "md",
}: EmptyStateProps) {
  const IconComponent = icons[icon];
  const config = sizeConfig[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center justify-center text-center max-w-md mx-auto",
        config.container,
        className
      )}>
      {/* Icon with Float Animation */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full bg-gray-200 text-black p-4",
          config.icon
        )}>
        <IconComponent className="w-full h-full" />
      </motion.div>

      {/* Animated Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className={cn("font-semibold text-foreground mb-2", config.title)}>
        {title}
      </motion.h3>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className={cn(
          "text-muted-foreground leading-relaxed mb-6",
          config.description
        )}>
        {description}
      </motion.p>

      {/* Animated Action Button */}
      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}>
          <Button
            onClick={onAction}
            variant="outline"
            className="group relative overflow-hidden">
            <motion.span
              className="relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}>
              {actionLabel}
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-primary/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
