interface DotSpinnerProps {
  bgColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function DotSpinner({
  bgColor = "bg-white",
  size = "md",
  className = "",
}: DotSpinnerProps) {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  const containerSizes = {
    sm: "w-20 px-4 py-2",
    md: "w-28 px-6 py-3",
    lg: "w-36 px-8 py-4",
  };

  const dotSize = sizeClasses[size];
  const containerSize = containerSizes[size];

  return (
    <div
      className={`flex gap-1 items-center justify-center ${containerSize} ${className}`}>
      <span
        className={`${dotSize} rounded-full ${bgColor} animate-[fade_1s_ease-in-out_infinite]`}
      />
      <span
        className={`${dotSize} rounded-full ${bgColor} animate-[fade_1s_ease-in-out_0.33s_infinite]`}
      />
      <span
        className={`${dotSize} rounded-full ${bgColor} animate-[fade_1s_ease-in-out_0.66s_infinite]`}
      />
      <span
        className={`${dotSize} rounded-full ${bgColor} animate-[fade_1s_ease-in-out_0.99s_infinite]`}
      />
      <style jsx>{`
        @keyframes fade {
          0%,
          100% {
            opacity: 1;
          }
          60% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
