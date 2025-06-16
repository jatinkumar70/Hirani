import React from 'react';
import Image from 'next/image';
import { cn } from '../../../lib/utils';

interface FeatureCardProps {
  icon?: string;
  image?: string;
  title: React.ReactNode;
  className?: string;
  alt?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, className, image ,alt = "feature" }) => {
  return (
    <div
      className={cn(
        "feature-card flex flex-col items-center text-center rounded-xl border border-gray-200 bg-white shadow-md p-6 w-82 h-64 transition-transform transform hover:scale-105 hover:shadow-xl duration-300",
        className
      )}
    >
      <div className="mb-4 flex justify-center items-center h-[80px] w-full relative">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-contain scale-75"
            sizes="(max-width: 768px) 80px, 120px"
            priority
          />
        ) : icon && (
          <Image
            src={icon}
            alt={alt}
            fill
            className="object-contain scale-75"
            sizes="(max-width: 768px) 80px, 120px"
            priority
          />
        )}
      </div>
      <div>
        <p className="mt-2 text-lg text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
