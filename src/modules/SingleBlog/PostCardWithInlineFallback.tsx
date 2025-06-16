"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Images } from "../../../asserts/Import/Images";
import FallbackImage from "../../common/FallBackLogo/FallBackLogo";

export function PostCardWithInlineFallback({ post }: { post: any }) {
  const [imgSrc, setImgSrc] = useState(post.image);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (post.image) {
      setImgSrc(post.image);
      setIsError(false);
      setIsLoaded(false);
    }
  }, [post.image]);
  return (
    <>
      {isError ? (
        <div className="flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300   w-full h-full aspect-[4/3]">
          <Image
            title="Fallback Logo"
            src={Images.LogoBlack}
            alt="Fallback Logo"
            width={100}
            height={100}
            priority
          />
        </div>
      ) : (
        <div className="group cursor-pointer">
          <div className="flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden">
            <Image
              src={imgSrc || "/placeholder.svg"}
              alt={post.title.replace(/&#\d+;|[^\w\s]/g, "")}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setIsError(true)}
              onLoad={() => setIsLoaded(true)}
              sizes="80px"
            />
          </div>
        </div>
      )}
    </>
  );
}
