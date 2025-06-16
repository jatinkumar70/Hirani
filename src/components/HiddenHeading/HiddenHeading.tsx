// components/HiddenHeading.tsx
import React from "react";

interface HiddenHeadingProps {
  text: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const HiddenHeading: React.FC<HiddenHeadingProps> = ({
  text,
  level = "h1",
}) => {
  const HeadingTag = level as keyof JSX.IntrinsicElements;

  return <HeadingTag className="hidden">{text}</HeadingTag>;
};

export default HiddenHeading;
