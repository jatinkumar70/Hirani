import Image, { StaticImageData } from "next/image";

interface PropertyCardProps {
  title: string;
  description: string;
  imageUrl: StaticImageData;
  isReversed?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = (props) => {
  const { title, description, imageUrl, isReversed } = props;

  return (
    <div
      className={`flex flex-col ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 items-start justify-between mb-10`}>
      <div className="w-full md:w-2/5">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="w-full mt-10 md:w-3/5 space-y-6">
        <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
