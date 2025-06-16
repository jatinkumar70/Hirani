import { MapPin, Star, Heart } from "lucide-react";
import { Card } from "../../../components/ui/Card/Card";
import { Button } from "../../../components/ui/Button/Button";
import { Badge } from "../../../components/ui/Badge/Badge";

interface FavoriteHotelRowProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
}

export function FavoriteHotelRow({
  id,
  name,
  location,
  price,
  rating,
}: FavoriteHotelRowProps) {
  return (
    <Card className="p-4  border rounded-lg border-primary-gold hover:border-dark-gold transition-colors duration-300">
      <div className="flex justify-between items-center">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-indigo-900">{name}</h3>
          <div className="flex items-center text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center mt-2">
            <Star className="h-4 w-4 text-amber-400 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Badge className="bg-amber-200 text-indigo-900 mb-2">
            ${price}/night
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100">
              <Heart className="h-5 w-5 fill-current" />
            </Button>
            <Button
              size="sm"
              className="bg-dark-gold hover:bg-primary-gold text-white">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
