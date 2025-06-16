import Image from "next/image";
import { useState } from "react";

interface SocialIconProps {
  name: string;
  src: string;
  href: string;
  width?: number;
  height?: number;
}

export default function SocialIcon({
  name,
  src,
  href,
  width = 28,
  height = 28,
}: SocialIconProps) {
  // Track when the image is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex" // Ensure consistent block size
      style={{
        width: width,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div
        style={{
          width: width,
          height: height,
          position: "relative",
          display: "flex",
        }}>
        <Image
          src={src || "/placeholder.svg"}
          alt={name}
          width={width}
          height={height}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onLoad={() => setIsLoaded(true)}
          priority={true} // Load social icons with priority since they're small
        />
      </div>
    </a>
  );
}
