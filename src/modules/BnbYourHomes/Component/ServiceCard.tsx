import React from 'react';
import { cn } from '../../../lib/utils';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface ServiceCardProps {
  title: string;
  icon?: React.ReactNode;
  features: string[];
  className?: string;
  image?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon,image, features, className }) => {
  return (
    <div
      className={cn(
        "feature-card rounded-xl border border-gray-200 bg-white shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg duration-300",
        className
      )}
    >
      <div className="flex flex-col items-center p-6">
      {image && (
        <div className="mb-4 relative h-14 w-14 mx-auto lg:mx-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
        <h3 className="text-lg font-medium mb-3">{title}</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;
