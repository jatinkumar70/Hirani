import Section from "../../../../common/Section/Section";
import { PropertyCard } from "../../../../components/PropertyCard/PropertyCard";
import { properties } from "../../../../data/property";

export const PropertyDetails = () => {
  return (
    <Section>
      <div className="space-y-16">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            title={property.title}
            description={property.description}
            imageUrl={property.imageUrl}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </Section>
  );
}
