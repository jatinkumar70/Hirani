import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export const LogoIcon: React.FC<{
  width?: number;
  height?: number;
  text?: string;
  src: string;
}> = (props) => {
  const router = useRouter();
  const { width, height, text, src } = props;
  return (
    <Image
      title={text}
      src={src}
      alt={text || "Logo"}
      width={width}
      height={height}
      priority={true}
      className="cursor-pointer "
      onClick={() => router.push("/")}
    />
  );
};
